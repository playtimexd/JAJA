// Text-to-speech: neural voice served by the PC when available, else Web Speech API (offline on iPad) + small synthesized sound effects.
import { store } from './store.js';
import { lang } from './i18n.js';

let voices = [];
const loadVoices = () => { voices = window.speechSynthesis?.getVoices?.() ?? []; };
if ('speechSynthesis' in window) {
  loadVoices();
  speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
}

function voiceFor(l) {
  if (!voices.length) loadVoices();
  const base = l.slice(0, 2);
  const prefs = l === 'fr-CA'
    ? ['fr-CA', 'fr-FR', 'fr']
    : ['en-CA', 'en-US', 'en-GB', 'en'];
  for (const p of prefs) {
    const list = voices.filter((v) => v.lang.replace('_', '-').startsWith(p));
    // prefer enhanced / premium voices when the iPad has them
    const good = list.find((v) => /premium|enhanced|amélie|amelie|samantha/i.test(v.name));
    if (good || list[0]) return good || list[0];
  }
  return voices.find((v) => v.lang.startsWith(base)) || null;
}

// Language used for plain-string text without an explicit lang (set per question by the subject).
let contentLang = null;
export const setContentLang = (l) => { contentLang = l; };

// ---------- Neural voice from the PC (tools/serve.mjs → Azure Speech), else the iPad's own voice ----------
let neural = false;
fetch('/tts/status', { cache: 'no-store' }).then((r) => r.json()).then((j) => { neural = !!j.neural; }).catch(() => {});
let player = null;            // one reused <audio>: iPad only lets an element play after a first tap
let token = 0;                // cancels speech that was replaced by newer speech

// 0.05 s of silence as a WAV data URI, played on the first tap to unlock the <audio> element on iPad.
const SILENT = (() => {
  const n = 1200, b = new Uint8Array(44 + n * 2), v = new DataView(b.buffer);
  const w = (o, str) => [...str].forEach((c, k) => (b[o + k] = c.charCodeAt(0)));
  w(0, 'RIFF'); v.setUint32(4, 36 + n * 2, true); w(8, 'WAVEfmt '); v.setUint32(16, 16, true); v.setUint16(20, 1, true);
  v.setUint16(22, 1, true); v.setUint32(24, 24000, true); v.setUint32(28, 48000, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true);
  w(36, 'data'); v.setUint32(40, n * 2, true);
  return 'data:audio/wav;base64,' + btoa(String.fromCharCode(...b));
})();
let finishCurrent = null;     // resolves the utterance that is playing (used when it is stopped)
export function primeVoice() {
  if (player) return;
  player = new Audio();
  player.src = SILENT;
  player.play().catch(() => {});
}

function speakNeural(text, l) {
  return new Promise((resolve, reject) => {
    const ratePct = Math.round((store.settings.rate - 1) * 100);   // 🐢 -25%  🙂 -10%  🐇 +5%
    player ??= new Audio();
    player.src = `/tts?lang=${l}&rate=${ratePct}&text=${encodeURIComponent(text)}`;
    let started = false;
    finishCurrent = resolve;
    player.onplaying = () => { started = true; };
    player.onended = () => resolve();
    player.onerror = () => (started ? resolve() : reject(new Error('neural tts failed')));
    player.play().catch(reject);
    setTimeout(() => (started ? null : reject(new Error('neural tts slow'))), 6000);
  });
}

// Same idea through the parents' voice server (worker/index.js → OpenAI TTS) when the app is hosted online.
const cloudCache = new Map();   // text|lang|rate -> object URL (kept for the session)
const cloudOn = () => store.settings.cloudVoice !== false && !!store.settings.voiceUrl && !!store.settings.voiceCode;
async function speakCloud(text, l, my) {
  const rate = store.settings.rate;
  const k = `${l}|${rate}|${text}`;
  let src = cloudCache.get(k);
  if (!src) {
    const r = await fetch(`${store.settings.voiceUrl.replace(/\/$/, '')}/tts`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-family-code': store.settings.voiceCode },
      body: JSON.stringify({ text, lang: l, rate }), signal: AbortSignal.timeout(8000),
    });
    if (!r.ok) throw new Error('cloud tts ' + r.status);
    src = URL.createObjectURL(await r.blob());
    if (cloudCache.size > 300) cloudCache.delete(cloudCache.keys().next().value);
    cloudCache.set(k, src);
  }
  if (my !== token) return;
  return playSrc(src);
}
function playSrc(src) {
  return new Promise((resolve, reject) => {
    player ??= new Audio();
    player.src = src;
    let started = false;
    finishCurrent = resolve;
    player.onplaying = () => { started = true; };
    player.onended = () => resolve();
    player.onerror = () => (started ? resolve() : reject(new Error('play failed')));
    player.play().catch(reject);
    setTimeout(() => (started ? null : reject(new Error('slow'))), 6000);
  });
}

function speakDevice(text, l) {
  if (!('speechSynthesis' in window)) return Promise.resolve();
  return new Promise((resolve) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = l;
    const v = voiceFor(l);
    if (v) u.voice = v;
    u.rate = store.settings.rate;
    u.pitch = 1.05;
    u.onend = u.onerror = () => resolve();
    speechSynthesis.speak(u);
    setTimeout(resolve, 12000);
  });
}

// say: { text: string | {fr,en}, lang?: 'fr-CA' | 'en-CA' }
export async function speak(say, { interrupt = true } = {}) {
  if (!say || !store.settings.voice) return;
  let text = say.text, l = say.lang;
  if (text && typeof text === 'object') { text = text[lang()] ?? text.fr; l = l || (lang() === 'fr' ? 'fr-CA' : 'en-CA'); }
  if (!l) l = contentLang || (lang() === 'fr' ? 'fr-CA' : 'en-CA');
  if (!text) return;
  text = String(text).replace(/☐/g, '').replace(/_{2,}/g, ' … ');
  if (interrupt) stopSpeech();
  const my = ++token;
  if (neural) {
    try { await speakNeural(text, l); return; }
    catch { if (my !== token) return; if (player) player.pause(); }   // fall back to the iPad voice
  }
  if (!neural && cloudOn()) {
    try { await speakCloud(text, l, my); return; }
    catch { if (my !== token) return; if (player) player.pause(); }
  }
  if (my === token) await speakDevice(text, l);
}
export function stopSpeech() {
  token++;
  window.speechSynthesis?.cancel();
  if (player && !player.paused) player.pause();
  if (finishCurrent) { finishCurrent(); finishCurrent = null; }
}

// ---------- SFX ----------
let ctx;
export function unlockAudio() {
  primeVoice();
  try {
    ctx ??= new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
  } catch { /* no audio */ }
}

function tone(freq, start, dur, type = 'sine', gain = 0.18) {
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, ctx.currentTime + start);
  g.gain.setValueAtTime(0, ctx.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
  o.connect(g).connect(ctx.destination);
  o.start(ctx.currentTime + start);
  o.stop(ctx.currentTime + start + dur + 0.05);
}

export function sfx(name) {
  if (!store.settings.sound) return;
  unlockAudio();
  if (!ctx) return;
  switch (name) {
    case 'tap': tone(660, 0, 0.06, 'triangle', 0.08); break;
    case 'good': tone(784, 0, 0.14, 'triangle'); tone(1047, 0.1, 0.25, 'triangle'); break;
    case 'bad': tone(220, 0, 0.18, 'sine', 0.12); tone(196, 0.12, 0.22, 'sine', 0.1); break;
    case 'place': tone(523, 0, 0.08, 'triangle', 0.1); break;
    case 'star': [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.3, 'triangle', 0.14)); break;
    case 'win': [523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.12, 0.28, 'triangle', 0.14)); break;
  }
}
