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
    // One-time voice-over recording from the family PC (tools/eleven.mjs --via-worker): ElevenLabs key stays in Cloudflare.
    if (url.pathname.startsWith('/eleven/')) {
      if (!env.LOCAL_SECRET || req.headers.get('x-local-secret') !== env.LOCAL_SECRET) return json({ error: 'secret' }, 401, {});
      if (!env.ELEVENLABS_API_KEY) return json({ error: 'no ELEVENLABS_API_KEY secret' }, 503, {});
      const target = 'https://api.elevenlabs.io/v1/' + url.pathname.slice('/eleven/'.length) + url.search;
      if (!/^https:\/\/api\.elevenlabs\.io\/v1\/(user\/subscription|voices|shared-voices|text-to-speech\/[A-Za-z0-9]+)(\?|$)/.test(target)) return json({ error: 'path' }, 400, {});
      const r = await fetch(target, { method: req.method, headers: { 'xi-api-key': env.ELEVENLABS_API_KEY, 'content-type': 'application/json', accept: req.headers.get('accept') || '*/*' }, body: req.method === 'POST' ? await req.text() : undefined });
      return new Response(r.body, { status: r.status, headers: { 'content-type': r.headers.get('content-type') || 'application/octet-stream' } });
    }
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

    // ---- Handwriting: transcribe the child's writing (image) and grade it. Free Workers AI first, OpenAI as backup. ----
    if (url.pathname === '/ai/write') {
      const lang = ['en', 'zh'].includes(body.lang) ? body.lang : 'fr';
      const mode = ['dictation', 'answer', 'sentence', 'composition'].includes(body.mode) ? body.mode : 'sentence';
      const img = String(body.image || '').replace(/^data:image\/\w+;base64,/, '');
      const typed = String(body.typed || '').slice(0, 2000);
      if (!typed && (!img || img.length > 1_500_000)) return json({ error: 'image' }, 400, cors);
      const L = lang === 'fr' ? 'French (Québec)' : lang === 'zh' ? 'Simplified Chinese (Mandarin; feedback in simple Chinese)' : 'English';
      const clip = (x, n) => String(x || '').slice(0, n);
      const task = mode === 'dictation' ? `The child was dictated: «${clip(body.expected, 300)}».`
        : mode === 'answer' ? `Text the child read: «${clip(body.text, 1500)}»\nQuestion: ${clip(body.question, 300)}\nGist of a correct answer: ${clip(body.answerKey, 300)}`
        : mode === 'sentence' ? `Instruction: ${clip(body.question, 300)}. Words that must be used: ${(body.words || []).join(', ')}. Minimum words: ${Number(body.minWords) || 3}.`
        : `Writing prompt: ${clip(body.question, 400)}. Minimum words: ${Number(body.minWords) || 20}.`;
      const okRule = mode === 'answer' ? 'the meaning answers the question correctly (spelling mistakes do not make it wrong)'
        : mode === 'dictation' ? 'the text matches the dictation exactly (accents and plural endings count)'
          : 'the instruction is followed (required words used, enough words, real sentences)';
      const grade = `You are a kind ${L} teacher for a 7-8 year old (grade 2-3). ${task}
Return ONLY compact JSON: {"ok":true|false,"score":0..1,"feedback":"2 short encouraging sentences in ${L} for the child: one thing done well, one thing to fix","corrections":[{"wrong":"...","right":"..."}]}.
ok = ${okRule}. corrections = at most 6 spelling/grammar fixes, child's word -> correct word. Be gentle; never mock.`;
      const readPrompt = `Transcribe exactly the handwritten ${L} text of a young child in this image. Keep their spelling mistakes; do not correct anything. Output only the text.`;
      let text = '', result = null, via = '';
      // 1) free: Workers AI vision + Qwen (skipped for Chinese handwriting when OpenAI is available: much better at hanzi)
      if (!(lang === 'zh' && !typed && env.OPENAI_API_KEY)) try {
        if (typed) text = typed;
        else {
        if (env.HIBOU_KV && !(await env.HIBOU_KV.get('llama-vision-agreed'))) {   // Meta license: one-time « agree » request
          try { await env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', { prompt: 'agree' }); } catch {}
          await env.HIBOU_KV.put('llama-vision-agreed', '1');
        }
        const bytes = Uint8Array.from(atob(img), (c) => c.charCodeAt(0));
        let v;
        try { v = await env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', { messages: [{ role: 'user', content: [{ type: 'text', text: readPrompt }, { type: 'image_url', image_url: { url: `data:image/png;base64,${img}` } }] }], max_tokens: 300 }); }
        catch { v = await env.AI.run('@cf/meta/llama-3.2-11b-vision-instruct', { prompt: readPrompt, image: [...bytes], max_tokens: 300 }); }
        if (!v?.response) body._cfErr = 'vision empty: ' + JSON.stringify(v).slice(0, 200);
        text = String(v?.response || '').trim().replace(/^["“«]\s*|\s*["”»]$/g, '');
        if (/(image|handwrit|transcri|text reads|appears)/i.test(text)) { const m = text.match(/["“«]([^"”»]{2,})["”»]/); if (m) text = m[1].trim(); }
        }
        if (text) {
          const g = await env.AI.run(env.AI_LLM || '@cf/qwen/qwen3-30b-a3b-fp8', { messages: [{ role: 'system', content: `${grade} /no_think` }, { role: 'user', content: `Child's writing: «${text}»` }], max_tokens: 900, temperature: 0.2 });
          const resp = g?.response ?? g?.choices?.[0]?.message?.content ?? '';
          if (resp && typeof resp === 'object') result = resp;
          else {
            const raw = String(resp).replace(/<think>[\s\S]*?<\/think>/g, '');
            if (!raw.includes('{')) body._cfErr = 'grader: ' + JSON.stringify(g).slice(0, 220);
            result = JSON.parse(raw.slice(raw.indexOf('{'), raw.lastIndexOf('}') + 1));
          }
          via = 'cloudflare';
        }
      } catch (e) { result = null; body._cfErr = (body._cfErr ? body._cfErr + ' | ' : '') + String(e?.message || e).slice(0, 160); }
      // 2) backup: OpenAI (one call reads and grades)
      if (!result && env.OPENAI_API_KEY) {
        try {
          const sys = grade.replace('Return ONLY compact JSON: {', 'Return ONLY compact JSON: {"text":"exact transcription of the handwriting, mistakes kept",');
          const r = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST', headers: { authorization: `Bearer ${env.OPENAI_API_KEY}`, 'content-type': 'application/json' },
            body: JSON.stringify({ model: env.WRITE_MODEL || 'gpt-4o-mini', response_format: { type: 'json_object' }, max_tokens: 500, temperature: 0.2,
              messages: [{ role: 'system', content: sys }, (typed ? { role: 'user', content: `The child typed: «${typed}». Use it as the transcription.` } : { role: 'user', content: [{ type: 'text', text: readPrompt }, { type: 'image_url', image_url: { url: `data:image/png;base64,${img}`, detail: 'high' } }] })] }),
          });
          const j = await r.json();
          result = JSON.parse(j.choices[0].message.content);
          text = String(result.text || text);
          via = 'openai';
        } catch (e) { return json({ error: 'write', detail: String(e?.message || e).slice(0, 160) }, 502, cors); }
      }
      if (!result) return json({ error: 'write' }, 502, cors);
      return json({ text, via, cfErr: via === 'openai' ? (body._cfErr || 'no text') : undefined, ok: !!result.ok, score: Math.max(0, Math.min(1, Number(result.score) || 0)), feedback: String(result.feedback || ''), corrections: Array.isArray(result.corrections) ? result.corrections.slice(0, 6) : [] }, 200, cors);
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
