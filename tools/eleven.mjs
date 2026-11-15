// One-time ElevenLabs recording of the fixed sentences (see tools/voice-texts.mjs) into audio/vo/<key>.mp3.
// The game then plays these files first (free, offline). Never prints the key.
//
//   node tools/eleven.mjs [--key-file <path>] [--sets books,why,prompts] [--dry] [--limit N]   (default: via the Cloudflare worker)
//   voices (optional): --fr <voiceId> --en <voiceId> --zh <voiceId>   (default: auto-pick from your ElevenLabs voices)
import fs from 'node:fs';
import path from 'node:path';
import { collect } from './voice-texts.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const has = (k) => process.argv.includes(`--${k}`);
// Two ways to reach ElevenLabs: --via-worker (key stored as Cloudflare secret ELEVENLABS_API_KEY; default) or --key-file <path>.
let API, H;
if (has('key-file')) {
  const raw = fs.readFileSync(arg('key-file'), 'utf8').trim();
  let KEY = raw;
  try { const j = JSON.parse(raw); KEY = j.key || j.apiKey || j.api_key || j.ELEVENLABS_API_KEY || raw; } catch {}
  const m = raw.match(/(?:ELEVEN(?:LABS)?_API_KEY\s*=\s*)?["']?(sk_[A-Za-z0-9]+|[a-f0-9]{32})["']?/);
  if (m) KEY = m[1];
  API = 'https://api.elevenlabs.io/v1'; H = { 'xi-api-key': KEY };
} else {
  const cfg = fs.readFileSync(path.resolve('js/config.js'), 'utf8').match(/VOICE_URL = '([^']+)'/)[1];
  API = `${cfg}/eleven`; H = { 'x-local-secret': fs.readFileSync(path.resolve('.secrets/local-secret.txt'), 'utf8').trim() };
}
const MODEL = arg('model', 'eleven_multilingual_v2');
const out = path.resolve('audio/vo');
fs.mkdirSync(out, { recursive: true });

const sub = await (await fetch(`${API}/user/subscription`, { headers: H })).json();
if (sub.error) { console.log('Worker:', sub.error); process.exit(1); }
if (sub.detail) { console.log('ElevenLabs refused the key:', sub.detail.status || sub.detail.message || sub.detail); process.exit(1); }
const left = sub.character_limit - sub.character_count;
console.log(`ElevenLabs plan: ${sub.tier} · used ${sub.character_count} / ${sub.character_limit} characters · left ${left}`);

const sets = arg('sets', 'books,why,prompts').split(',');
const items = [...(await collect({ sets })).entries()].filter(([k]) => !fs.existsSync(path.join(out, `${k}.mp3`)));
const chars = items.reduce((a, [, v]) => a + v.text.length, 0);
console.log(`to record: ${items.length} clips, ${chars} characters (${sets.join(', ')})`);

// pick voices
const { voices = [] } = await (await fetch(`${API}/voices`, { headers: H })).json();
const pick = (lang, prefer) => arg(lang.slice(0, 2), null) || (voices.find((v) => prefer.some((p) => v.name.toLowerCase().includes(p))) || voices.find((v) => /female/i.test(v.labels?.gender || '')) || voices[0])?.voice_id;
const VOICE = {
  'fr-CA': pick('fr-CA', ['charlotte', 'jade', 'claire', 'french']),
  'en-CA': pick('en-CA', ['sarah', 'matilda', 'lily', 'jessica']),
  'zh-CN': pick('zh-CN', ['chinese', 'mandarin', 'xiao', 'mei']),
};
console.log('voices:', Object.fromEntries(Object.entries(VOICE).map(([l, id]) => [l, voices.find((v) => v.voice_id === id)?.name || id])));
if (has('dry')) process.exit(0);
if (chars > left) { console.log(`Not enough characters left (${left}). Use --sets to record a part first.`); process.exit(1); }

const limit = Number(arg('limit', items.length));
const manifestFile = path.join(out, 'index.json');
const manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : {};
let done = 0, failed = 0;
const queue = items.slice(0, limit);
async function worker() {
  while (queue.length) {
    const [k, v] = queue.shift();
    const lang = v.lang;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const r = await fetch(`${API}/text-to-speech/${VOICE[lang]}?output_format=mp3_44100_64`, {
          method: 'POST', headers: { ...H, 'content-type': 'application/json', accept: 'audio/mpeg' },
          body: JSON.stringify({ text: v.text, model_id: MODEL, language_code: lang.slice(0, 2), voice_settings: { stability: 0.55, similarity_boost: 0.75, style: 0.25, speed: lang === 'zh-CN' ? 0.9 : 0.95 } }),
        });
        if (r.status === 429) { await new Promise((s) => setTimeout(s, 4000)); continue; }
        if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 120)}`);
        fs.writeFileSync(path.join(out, `${k}.mp3`), Buffer.from(await r.arrayBuffer()));
        manifest[k] = 1; done++;
        if (done % 50 === 0) { fs.writeFileSync(manifestFile, JSON.stringify(manifest)); console.log(`${done}/${limit}`); }
        break;
      } catch (e) { if (attempt === 2) { failed++; console.log('failed', lang, v.text.slice(0, 40), e.message); } }
    }
  }
}
await Promise.all([worker(), worker(), worker()]);
fs.writeFileSync(manifestFile, JSON.stringify(manifest));
console.log(`done ${done}, failed ${failed}, manifest ${Object.keys(manifest).length} clips`);
