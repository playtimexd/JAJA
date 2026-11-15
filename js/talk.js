// "Parle avec Hibou": real spoken English conversation with an AI owl (OpenAI Realtime over WebRTC).
// The iPad never sees the OpenAI key: the parents' voice server (worker/index.js) hands out a 2-minute key.
import { el } from './util.js';
import { store, save, today } from './store.js';
import { tr, lang } from './i18n.js';
import { sfx, stopSpeech } from './audio.js';
import { screen, backBtn, wallet, sheet } from './ui.js';
import { COIN, addCoins, bump, progress, checkBadges, showBadges, confetti, touchStreak, dressedOwl } from './game.js';

const MAX_SESSION = 6 * 60;                  // seconds per conversation
export const dailyLimit = () => store.settings.talkLimit ?? 15;   // minutes per day (parents)
const usedToday = () => (store.talk?.date === today() ? store.talk.sec : 0);

const L = {
  title: { fr: 'Parle avec Hibou', en: 'Talk with Owl' },
  pick: { fr: 'Choisis une conversation. Hibou parle anglais avec toi!', en: 'Pick a conversation. Owl talks English with you!' },
  start: { fr: 'Touche pour commencer', en: 'Tap to start' },
  connecting: { fr: 'Hibou arrive…', en: 'Owl is coming…' },
  listening: { fr: 'Hibou t’écoute… parle!', en: 'Owl is listening… talk!' },
  speaking: { fr: 'Hibou parle…', en: 'Owl is talking…' },
  stop: { fr: 'Terminer', en: 'Finish' },
  noServer: { fr: 'La voix de Hibou n’est pas encore installée. Demande à un parent (⚙️ Parents → Serveur de voix).', en: 'Owl’s voice is not set up yet. Ask a parent (⚙️ Parents → Voice server).' },
  noMic: { fr: 'Le micro est bloqué. Autorise le micro pour ce site dans Réglages.', en: 'The microphone is blocked. Allow the microphone for this site in Settings.' },
  needHttps: { fr: 'Le micro marche seulement sur la version en ligne (https).', en: 'The microphone only works on the online (https) version.' },
  limit: { fr: 'C’est assez pour aujourd’hui! Reviens demain.', en: 'That’s enough for today! Come back tomorrow.' },
  error: { fr: 'Oups, Hibou n’a pas pu venir. Réessaie plus tard.', en: 'Oops, Owl could not come. Try again later.' },
  left: { fr: 'min restantes aujourd’hui', en: 'min left today' },
  bravo: { fr: 'Super conversation!', en: 'Great conversation!' },
  you: { fr: 'Toi', en: 'You' },
};

const BASE = (level) => `You are "Hoo", a warm, playful owl who helps a 7-year-old child practise speaking English.
The child lives in Québec, goes to a French-speaking school, and is in grade 2 (English as a second language).
Rules:
- Speak slowly and clearly in Canadian English. ${['', 'Use very simple words and 3–6 word sentences.', 'Use simple words and short sentences.', 'Use simple but natural sentences; you may use a few new words and explain them.'][level]}
- Say at most 2 short sentences, then ask ONE easy question and wait. Never give long speeches.
- If the child answers in French or gets stuck, give the English words and invite them to repeat. You may say one short French word to help, but keep the conversation in English.
- When the child makes a mistake, repeat the sentence correctly in a natural way ("Oh, you have a dog! Me too!") instead of saying "wrong".
- Praise effort often and be enthusiastic. Laugh softly when something is funny.
- Keep everything child-safe and kind. If the child talks about something unsafe or sad, be gentle and suggest talking to a parent.
- Never ask for or repeat personal details (last name, address, school name, phone, passwords). If the child shares them, don't repeat them.
- Stay on the activity below; if the child drifts, follow briefly then bring it back playfully.
- Start right away by greeting the child and beginning the activity.`;

export const SCENARIOS = [
  { id: 'hello', icon: '👋', t: { fr: 'Faisons connaissance', en: 'Let’s meet' }, task: 'Introduce yourself (you are an owl living in a maple tree in Montréal). Ask the child’s first name only, age, favourite colour, favourite food, and what they like to play.' },
  { id: 'repeat', icon: '🦜', t: { fr: 'Répète après moi', en: 'Repeat after me' }, task: 'Read-and-repeat (pronunciation) game. Say one short grade-2 sentence (themes: animals, food, family, school, weather, toys). Ask the child to repeat it. Listen to how they said it: praise what was good and help with at most ONE sound or word that was hard ("Let’s say “three” together: th-ree"). Then give the next sentence, slightly harder after 3 good ones. Count the stars out loud: one star per good repeat.' },
  { id: 'icecream', icon: '🍦', t: { fr: 'Au comptoir de crème glacée', en: 'At the ice cream shop' }, task: 'Role-play: you work at an ice cream shop. Greet the customer, ask what flavour, cone or cup, how many scoops, toppings. Say the price in dollars and loonies; let the child pay and say thank you. Then swap roles once.' },
  { id: 'animals', icon: '🦊', t: { fr: 'Devine l’animal', en: 'Guess the animal' }, task: 'Guessing game: describe an animal with 3 simple clues (colour, size, where it lives, sound) and let the child guess; then ask the child to describe one for you to guess. Use Canadian animals sometimes (moose, beaver, raccoon, loon).' },
  { id: 'weather', icon: '⛄', t: { fr: 'Météo et vêtements', en: 'Weather and clothes' }, task: 'Talk about today’s weather and the season in Québec, and what to wear (toque, mittens, boots, snow pants, raincoat, shorts). Play “What do I wear when it’s…?”' },
  { id: 'school', icon: '🎒', t: { fr: 'Ma journée à l’école', en: 'My school day' }, task: 'Ask about the child’s day: what they did at school, recess games, lunch, favourite subject, who they played with (first names only). React with interest and model full sentences.' },
  { id: 'store', icon: '🧸', t: { fr: 'Au magasin de jouets', en: 'At the toy store' }, task: 'Role-play a toy store. The child is the customer: they ask for a toy, colour, size; you say the price; count money together with small numbers.' },
  { id: 'story', icon: '📖', t: { fr: 'Inventons une histoire', en: 'Let’s make a story' }, task: 'Build a funny short story together, one sentence each. Start with “Once upon a time, there was a…”. Ask the child what happens next with choices if they are stuck. End the story after about 8 turns and retell it in 3 sentences.' },
  { id: 'ispy', icon: '🔎', t: { fr: 'Je vois, je vois', en: 'I spy' }, task: 'Play “I spy with my little eye something that is…(colour)” using things found in a house or classroom; give more clues if needed; then let the child be the spy.' },
  { id: 'hockey', icon: '🏒', t: { fr: 'Sports et jeux', en: 'Sports and games' }, task: 'Talk about sports and games: hockey, skating, soccer, swimming, tag. Ask what the child likes, can do, and teach action verbs (skate, kick, throw, jump) with “Can you…?” questions.' },
  { id: 'feelings', icon: '😊', t: { fr: 'Mes émotions', en: 'My feelings' }, task: 'Talk about feelings (happy, sad, angry, tired, excited, scared) with simple situations: “How do you feel when it’s your birthday?” Teach “I feel … because …”.' },
  { id: 'free', icon: '🌟', t: { fr: 'On jase!', en: 'Free chat' }, task: 'Free friendly chat about whatever the child wants (pets, games, cartoons, food, family). Keep it simple and fun.' },
];

let live = null;   // current session

export function talkHome(back) {
  const left = Math.max(0, dailyLimit() * 60 - usedToday());
  const ok = !!(store.settings.voiceUrl && store.settings.voiceCode);
  let level = store.pick.talk || 1;
  const seg = el('div', { class: 'diff-seg' });
  const drawSeg = () => {
    seg.innerHTML = '';
    for (const l of [1, 2, 3]) seg.append(el('button', { class: `${['', 'green', 'orange', 'red'][l]} ${l === level ? 'on' : ''}`, onclick: () => { sfx('tap'); level = l; store.pick.talk = l; save(); drawSeg(); } }, tr({ fr: ['', 'Facile', 'Moyen', 'Difficile'][l], en: ['', 'Easy', 'Medium', 'Hard'][l] })));
  };
  drawSeg();
  screen('talk-screen green',
    el('header', { class: 'bar' }, backBtn(back), el('h1', {}, '🎙️ ', tr(L.title)), wallet()),
    el('p', { class: 'hub-intro' }, tr(L.pick), ' · ', `⏱️ ${Math.ceil(left / 60)} ${tr(L.left)}`),
    !ok ? el('div', { class: 'talk-warn' }, '⚙️ ', tr(L.noServer)) : null,
    seg,
    el('div', { class: 'talk-grid' }, SCENARIOS.map((s) => el('button', { class: 'talk-card', onclick: () => { sfx('tap'); start(s, level, back); } },
      el('span', { class: 'tc-i' }, s.icon), el('span', { class: 'tc-t' }, tr(s.t))))),
  );
}

function stage(s, back) {
  const status = el('div', { class: 'talk-status' }, tr(L.connecting));
  const log = el('div', { class: 'talk-log' });
  const timer = el('span', { class: 'score' }, '0:00');
  const owlBox = el('div', { class: 'talk-owl' }, dressedOwl('big'), el('div', { class: 'talk-ring' }));
  screen('talk-live green',
    el('header', { class: 'bar' }, el('button', { class: 'round back', onclick: () => end(true) }, '✕'), el('h1', {}, s.icon, ' ', tr(s.t)), timer),
    el('div', { class: 'talk-body' }, owlBox, el('div', { class: 'talk-side' }, status, log,
      el('button', { class: 'btn primary', onclick: () => end(false) }, '✔ ', tr(L.stop)))),
  );
  return { status, log, timer, owlBox, back };
}

async function start(s, level, back) {
  if (!store.settings.voiceUrl || !store.settings.voiceCode) { sheet(el('p', { class: 'talk-warn' }, tr(L.noServer))); return; }
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) { sheet(el('p', { class: 'talk-warn' }, tr(L.needHttps))); return; }
  if (usedToday() >= dailyLimit() * 60) { sheet(el('p', { class: 'talk-warn' }, tr(L.limit))); return; }
  stopSpeech();
  const ui = stage(s, back);
  live = { ui, s, level, t0: 0, turns: 0, pc: null, mic: null, tick: null, ended: false };
  try {
    const mic = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    live.mic = mic;
    const r = await fetch(`${store.settings.voiceUrl.replace(/\/$/, '')}/realtime`, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-family-code': store.settings.voiceCode },
      body: JSON.stringify({ scenario: s.id, lang: lang(), instructions: `${BASE(level)}\n\nActivity: ${s.task}` }),
    });
    if (!r.ok) throw new Error(`server ${r.status}`);
    const { value } = await r.json();
    const pc = new RTCPeerConnection();
    live.pc = pc;
    const out = new Audio(); out.autoplay = true;
    pc.ontrack = (e) => { out.srcObject = e.streams[0]; };
    live.out = out;
    pc.addTrack(mic.getTracks()[0], mic);
    const dc = pc.createDataChannel('oai-events');
    dc.onmessage = (m) => onEvent(JSON.parse(m.data));
    dc.onopen = () => {
      live.t0 = Date.now();
      setState('speaking');
      dc.send(JSON.stringify({ type: 'response.create' }));
      live.tick = setInterval(tick, 500);
    };
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    const ans = await fetch('https://api.openai.com/v1/realtime/calls', { method: 'POST', body: offer.sdp, headers: { authorization: `Bearer ${value}`, 'content-type': 'application/sdp' } });
    if (!ans.ok) throw new Error(`openai ${ans.status}`);
    await pc.setRemoteDescription({ type: 'answer', sdp: await ans.text() });
  } catch (e) {
    console.warn('talk', e);
    const blocked = /NotAllowed|Permission/i.test(e?.name + e?.message);
    ui.status.textContent = tr(blocked ? L.noMic : L.error);
    cleanup();
  }
}

function setState(st) {
  if (!live) return;
  live.ui.status.textContent = tr(st === 'listening' ? L.listening : L.speaking);
  live.ui.owlBox.className = `talk-owl ${st}`;
}
function addLine(who, text) {
  if (!live || !text?.trim()) return;
  const n = el('div', { class: `tl ${who}` }, el('b', {}, who === 'me' ? `🧒 ${tr(L.you)}` : '🦉 Hoo'), ' ', text.trim());
  live.ui.log.append(n);
  live.ui.log.scrollTop = live.ui.log.scrollHeight;
}
function onEvent(ev) {
  switch (ev.type) {
    case 'input_audio_buffer.speech_started': setState('listening'); break;
    case 'response.created': setState('speaking'); break;
    case 'response.done': setTimeout(() => setState('listening'), 400); break;
    case 'response.output_audio_transcript.done': addLine('owl', ev.transcript); break;
    case 'conversation.item.input_audio_transcription.completed': addLine('me', ev.transcript); live.turns++; sfx('tap'); break;
    case 'error': console.warn('realtime error', ev.error); break;
  }
}
function tick() {
  if (!live?.t0) return;
  const sec = Math.round((Date.now() - live.t0) / 1000);
  live.ui.timer.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;
  if (sec >= MAX_SESSION || usedToday() + sec >= dailyLimit() * 60) end(false);
}
function cleanup() {
  if (!live) return;
  clearInterval(live.tick);
  try { live.pc?.close(); } catch {}
  live.mic?.getTracks().forEach((t) => t.stop());
  if (live.out) live.out.srcObject = null;
}
function end(quit) {
  if (!live || live.ended) return;
  live.ended = true;
  cleanup();
  const sec = live.t0 ? Math.round((Date.now() - live.t0) / 1000) : 0;
  store.talk = { date: today(), sec: usedToday() + sec };
  const back = live.ui.back, turns = live.turns, s = live.s;
  live = null;
  if (turns >= 2) {
    const coins = Math.min(30, turns * 2);
    addCoins(coins); touchStreak(); bump('talks'); bump('games'); progress('anglais'); progress('correct', turns);
    store.log.push({ d: today(), unit: 'talk', level: 0, mode: 'talk', score: turns, total: turns, ms: sec * 1000 });
    const fresh = checkBadges(); save();
    if (!quit) {
      confetti(50); sfx('win');
      const sh = sheet(el('div', { class: 'memory-done' }, dressedOwl('big hop-loop'), el('h2', {}, tr(L.bravo)),
        el('div', { class: 'res-score' }, `${s.icon} 🗣️ × ${turns}`), el('div', { class: 'res-coins' }, `+${coins} ${COIN}`),
        el('div', { class: 'res-btns' }, el('button', { class: 'btn primary', onclick: () => { sh.close(); talkHome(back); } }, '➜'))));
      showBadges(fresh);
      return;
    }
  }
  save();
  talkHome(back);
}
