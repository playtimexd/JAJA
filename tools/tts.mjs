// Neural text-to-speech for Petit Hibou, run on the Windows PC by tools/serve.mjs.
// Uses the official Microsoft Azure AI Speech REST API (free tier F0: 500 000 characters / month).
// Key file (never commit / share): .secrets/azure-speech.json  →  { "key": "...", "region": "canadacentral" }
// Results are cached on disk in .tts-cache/ so each sentence is synthesized only once.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const VOICES = { 'fr-CA': 'fr-CA-SylvieNeural', 'en-CA': 'en-CA-ClaraNeural', 'zh-CN': 'zh-CN-XiaoxiaoNeural' };
const KEY_FILE = path.join(root, '.secrets', 'azure-speech.json');

export function ttsConfig() {
  try {
    const c = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'));
    return c.key && c.region ? c : null;
  } catch { return null; }
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export async function synthesize(text, lang = 'fr-CA', ratePct = 0) {
  const cfg = ttsConfig();
  if (!cfg) throw new Error('no Azure Speech key');
  const voice = VOICES[lang] || VOICES['fr-CA'];
  const rate = `${ratePct >= 0 ? '+' : ''}${ratePct}%`;
  const ssml = `<speak version='1.0' xml:lang='${lang}'><voice name='${voice}'><prosody rate='${rate}'>${esc(text)}</prosody></voice></speak>`;
  const res = await fetch(`https://${cfg.region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': cfg.key,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'PetitHibou',
    },
    body: ssml,
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`Azure TTS ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// Cached wrapper: returns an mp3 Buffer.
const pending = new Map();
export function ttsCached(cacheDir, text, lang, ratePct) {
  const key = crypto.createHash('sha1').update(`${VOICES[lang]}|${ratePct}|${text}`).digest('hex');
  const file = path.join(cacheDir, key + '.mp3');
  if (fs.existsSync(file)) return Promise.resolve(fs.readFileSync(file));
  if (pending.has(key)) return pending.get(key);
  const p = synthesize(text, lang, ratePct)
    .then((buf) => { fs.mkdirSync(cacheDir, { recursive: true }); fs.writeFileSync(file, buf); return buf; })
    .finally(() => pending.delete(key));
  pending.set(key, p);
  return p;
}

// `node tools/tts.mjs "Bonjour!" fr-CA out.mp3` — writes a file (plays nothing) to test the key.
if (path.resolve(process.argv[1] || '') === fileURLToPath(import.meta.url)) {
  const [text = 'Bonjour! Combien de pommes y a-t-il?', lang = 'fr-CA', out = 'tts-test.mp3'] = process.argv.slice(2);
  if (!ttsConfig()) { console.log(`Pas de clé : créez ${KEY_FILE} avec {"key":"…","region":"canadacentral"}`); process.exit(1); }
  const t0 = Date.now();
  const buf = await synthesize(text, lang, -10);
  fs.writeFileSync(out, buf);
  console.log(`${out}: ${buf.length} bytes in ${Date.now() - t0} ms (${VOICES[lang]})`);
}
