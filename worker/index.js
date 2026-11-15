// Petit Hibou voice backend — a Cloudflare Worker (free plan is enough).
// Keeps the OpenAI API key off the iPad. Only pages from ALLOWED_ORIGINS may call it.
// FAMILY_CODE is optional: if set, requests must send it in header X-Family-Code. Endpoints:
//   POST /realtime  { scenario, instructions }  → { value: "ek_…" }  short-lived key for a WebRTC voice chat
//   POST /tts       { text, lang, rate }        → audio/mpeg           natural reading voice
// Secrets (wrangler secret put …): OPENAI_API_KEY, FAMILY_CODE (optional), LOCAL_SECRET (lets the family PC register its tunnel)
// KV binding HIBOU_KV: remembers the PC's current tunnel address (GET /local).
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
    // The family PC (localvoice/start.ps1) registers its HTTPS tunnel address here.
    if (url.pathname === '/local-register' && req.method === 'POST') {
      if (!env.LOCAL_SECRET || req.headers.get('x-local-secret') !== env.LOCAL_SECRET) return json({ error: 'secret' }, 401, {});
      const b = await req.json().catch(() => ({}));
      if (!/^https:\/\/[a-z0-9-]+\.trycloudflare\.com$/.test(b.url || '')) return json({ error: 'url' }, 400, {});
      await env.HIBOU_KV.put('local', JSON.stringify({ url: b.url, at: Date.now() }));
      return json({ ok: true }, 200, {});
    }
    if (!okOrigin) return json({ error: 'origin' }, 403, cors);
    if (env.FAMILY_CODE && req.headers.get('x-family-code') !== env.FAMILY_CODE) return json({ error: 'code' }, 401, cors);
    // One-time voice-over recording from the family PC (tools/eleven.mjs --via-worker): ElevenLabs key stays in Cloudflare.
    if (url.pathname.startsWith('/eleven/')) {
      if (!env.LOCAL_SECRET || req.headers.get('x-local-secret') !== env.LOCAL_SECRET) return json({ error: 'secret' }, 401, {});
      if (!env.ELEVENLABS_API_KEY) return json({ error: 'no ELEVENLABS_API_KEY secret' }, 503, {});
      const target = 'https://api.elevenlabs.io/v1/' + url.pathname.slice('/eleven/'.length) + url.search;
      if (!/^https:\/\/api\.elevenlabs\.io\/v1\/(user\/subscription|voices|text-to-speech\/[A-Za-z0-9]+)(\?|$)/.test(target)) return json({ error: 'path' }, 400, {});
      const r = await fetch(target, { method: req.method, headers: { 'xi-api-key': env.ELEVENLABS_API_KEY, 'content-type': 'application/json', accept: req.headers.get('accept') || '*/*' }, body: req.method === 'POST' ? await req.text() : undefined });
      return new Response(r.body, { status: r.status, headers: { 'content-type': r.headers.get('content-type') || 'application/octet-stream' } });
    }
    if (url.pathname === '/local') {
      const v = env.HIBOU_KV ? await env.HIBOU_KV.get('local') : null;
      return json(v ? JSON.parse(v) : {}, 200, cors);
    }
    if (req.method !== 'POST') return json({ error: 'method' }, 405, cors);
    const body = url.pathname === '/ai/talk' ? {} : await req.json().catch(() => ({}));

    // ---- Free path (Cloudflare Workers AI daily allowance): same API as the family PC (localvoice/server.py) ----
    if (url.pathname === '/ai/start' || url.pathname === '/ai/talk') {
      if (!env.AI) return json({ error: 'no ai binding' }, 503, cors);
      try {
        let lang = 'en', instructions = '', history = [], heard = '';
        if (url.pathname === '/ai/start') {
          const b = body;
          lang = ['en', 'fr', 'zh'].includes(b.lang) ? b.lang : 'en'; instructions = String(b.instructions || '').slice(0, 6000);
        } else {
          const fd = await req.formData();
          const meta = JSON.parse(fd.get('meta') || '{}');
          lang = ['en', 'fr', 'zh'].includes(meta.lang) ? meta.lang : 'en'; instructions = String(meta.instructions || '').slice(0, 6000);
          history = Array.isArray(meta.history) ? meta.history.slice(-16) : [];
          const audio = fd.get('audio');
          const buf = new Uint8Array(await audio.arrayBuffer());
          if (buf.length > 3_000_000) return json({ error: 'too long' }, 413, cors);
          let bin = ''; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
          const stt = await env.AI.run('@cf/openai/whisper-large-v3-turbo', { audio: btoa(bin), language: lang, vad_filter: true });
          heard = String(stt?.text || '').trim();
          if (heard) history.push({ role: 'user', content: heard });
        }
        let reply;
        if (url.pathname === '/ai/talk' && !heard) {
          reply = { en: "Sorry, I didn't hear you. Can you say it again?", fr: 'Oups, je ne t’ai pas entendu. Peux-tu répéter?', zh: '我没听清楚，你能再说一遍吗？' }[lang];
        } else {
          const msgs = [{ role: 'system', content: `${instructions}\n\nThis is a SPOKEN conversation: answer in 1–2 short sentences plus one question, no lists, no emoji, no markdown. /no_think` }];
          for (const m of history) if ((m.role === 'user' || m.role === 'assistant') && m.content) msgs.push({ role: m.role, content: String(m.content).slice(0, 600) });
          if (msgs.length === 1) msgs.push({ role: 'user', content: { en: '(The child just arrived. Greet them and start.)', fr: '(L’enfant vient d’arriver. Salue-le et commence.)', zh: '（孩子刚来。跟孩子打招呼，开始活动。）' }[lang] });
          const out = await env.AI.run(env.AI_LLM || '@cf/qwen/qwen3-30b-a3b-fp8', { messages: msgs, max_tokens: 200, temperature: 0.7 });
          const raw = out?.response ?? out?.choices?.[0]?.message?.content ?? '';
          reply = String(raw).replace(/<think>[\s\S]*?<\/think>/g, '').replace(/[*_#`]+/g, '').trim();
        }
        const tts = await env.AI.run('@cf/myshell-ai/melotts', { prompt: reply, lang });
        return json({ heard, reply, audio: tts?.audio || '', mime: 'audio/mpeg' }, 200, cors);
      } catch (e) {
        return json({ error: 'ai', detail: String(e?.message || e).slice(0, 200) }, 429, cors);
      }
    }

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
              input: { transcription: { model: 'gpt-4o-mini-transcribe', language: ['fr', 'zh', 'en'].includes(body.lang) ? body.lang : 'en' }, turn_detection: { type: 'semantic_vad', eagerness: 'low' } },
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
      const fr = body.lang === 'fr-CA', zh = body.lang === 'zh-CN';
      const r = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: { authorization: `Bearer ${env.OPENAI_API_KEY}`, 'content-type': 'application/json' },
        body: JSON.stringify({
          model: env.TTS_MODEL || 'gpt-4o-mini-tts',
          voice: zh ? env.TTS_VOICE_ZH || 'coral' : fr ? env.TTS_VOICE_FR || 'coral' : env.TTS_VOICE_EN || 'marin',
          input: text,
          instructions: zh
            ? '用标准普通话，温柔清楚、语速稍慢，像一年级语文老师给 7 岁孩子读字和课文。每个字的声调要准确。'
            : fr
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
