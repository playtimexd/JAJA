// Petit Hibou voice backend — a Cloudflare Worker (free plan is enough).
// Keeps the OpenAI API key off the iPad. Endpoints (all need header X-Family-Code):
//   POST /realtime  { scenario, instructions }  → { value: "ek_…" }  short-lived key for a WebRTC voice chat
//   POST /tts       { text, lang, rate }        → audio/mpeg           natural reading voice
// Secrets (wrangler secret put …): OPENAI_API_KEY, FAMILY_CODE
// Vars (wrangler.toml): ALLOWED_ORIGINS, REALTIME_MODEL, REALTIME_VOICE, TTS_MODEL, TTS_VOICE_EN, TTS_VOICE_FR

const json = (obj, status, cors) => new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...cors } });

export default {
  async fetch(req, env) {
    const origin = req.headers.get('origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean);
    const okOrigin = allowed.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+)(:\d+)?$/.test(origin);
    const cors = okOrigin ? { 'access-control-allow-origin': origin, 'access-control-allow-headers': 'content-type, x-family-code', 'access-control-allow-methods': 'POST, GET, OPTIONS', vary: 'origin' } : {};
    if (req.method === 'OPTIONS') return new Response(null, { status: okOrigin ? 204 : 403, headers: cors });
    const url = new URL(req.url);
    if (url.pathname === '/health') return json({ ok: true }, 200, cors);
    if (!okOrigin) return json({ error: 'origin' }, 403, cors);
    if (!env.FAMILY_CODE || req.headers.get('x-family-code') !== env.FAMILY_CODE) return json({ error: 'code' }, 401, cors);
    if (req.method !== 'POST') return json({ error: 'method' }, 405, cors);
    const body = await req.json().catch(() => ({}));

    if (url.pathname === '/realtime') {
      const instructions = String(body.instructions || '').slice(0, 6000);
      const r = await fetch('https://api.openai.com/v1/realtime/client_secrets', {
        method: 'POST',
        headers: { authorization: `Bearer ${env.OPENAI_API_KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          expires_after: { anchor: 'created_at', seconds: 120 },
          session: {
            type: 'realtime',
            model: env.REALTIME_MODEL || 'gpt-realtime-2.1-mini',
            instructions,
            audio: {
              input: { transcription: { model: 'gpt-4o-mini-transcribe', language: body.lang === 'fr' ? 'fr' : 'en' }, turn_detection: { type: 'semantic_vad', eagerness: 'low' } },
              output: { voice: env.REALTIME_VOICE || 'marin' },
            },
          },
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) return json({ error: 'openai', status: r.status, detail: data?.error?.message }, 502, cors);
      return json({ value: data.value, expires_at: data.expires_at, model: env.REALTIME_MODEL || 'gpt-realtime-2.1-mini' }, 200, cors);
    }

    if (url.pathname === '/tts') {
      const text = String(body.text || '').slice(0, 1500);
      if (!text) return json({ error: 'text' }, 400, cors);
      const fr = body.lang === 'fr-CA';
      const r = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: { authorization: `Bearer ${env.OPENAI_API_KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          model: env.TTS_MODEL || 'gpt-4o-mini-tts',
          voice: fr ? env.TTS_VOICE_FR || 'coral' : env.TTS_VOICE_EN || 'marin',
          input: text,
          instructions: fr
            ? 'Parle en français québécois, chaleureux et clair, comme une enseignante de 2e année qui lit à un enfant de 7 ans.'
            : 'Speak Canadian English, warm and clear, like a grade 2 teacher reading to a 7-year-old.',
          speed: Math.max(0.7, Math.min(1.2, Number(body.rate) || 1)),
          response_format: 'mp3',
        }),
      });
      if (!r.ok) return json({ error: 'openai', status: r.status }, 502, cors);
      return new Response(r.body, { headers: { 'content-type': 'audio/mpeg', 'cache-control': 'public, max-age=31536000', ...cors } });
    }
    return json({ error: 'not found' }, 404, cors);
  },
};
