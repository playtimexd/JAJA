// "Parle avec Hibou": real spoken conversation (English, French or Mandarin) with an AI owl (OpenAI Realtime over WebRTC).
// The iPad never sees the OpenAI key: the parents' voice server (worker/index.js) hands out a 2-minute key.
import { el } from './util.js';
import { VOICE_URL } from './config.js';
import { store, save, today } from './store.js';
import { tr, lang, setZone, getZone, zh } from './i18n.js';
import { setText } from './widgets.js';
import { sfx, stopSpeech, playSrc } from './audio.js';
import { screen, backBtn, wallet, sheet } from './ui.js';
import { COIN, addCoins, bump, progress, checkBadges, showBadges, confetti, touchStreak, dressedOwl } from './game.js';

export const TALK_LANGS = {
  en: { flag: '🍁', name: 'English', t: { fr: 'Anglais', en: 'English', zh: zh('英语', 'yīng yǔ') }, code: 'en',
    who: 'practise speaking English. The child lives in Québec, goes to a French-speaking school, and is in grade 2 (English as a second language).',
    speak: 'Speak slowly and clearly in Canadian English.',
    help: 'If the child answers in French or gets stuck, give the English words and invite them to repeat. Never speak French: the whole conversation stays in English. To help, use very simple English words, examples, choices ("Is it big or small?") or describe things.',
    praise: 'Great!' },
  fr: { flag: '⚜️', name: 'Français', t: { fr: 'Français', en: 'French', zh: zh('法语', 'fǎ yǔ') }, code: 'fr',
    who: 'practise speaking French. The child lives in Québec and is in 2e année at a French-speaking school; help them speak in full, correct sentences and learn new words.',
    speak: 'Speak ONLY in French, slowly and clearly, with a warm Québec French accent and Québec vocabulary (ex. « déjeuner » for breakfast, « dîner » for lunch, « souper » for dinner, « auto », « chandail », « bas », « tuque », « mitaines », « fin de semaine », « dépanneur »); never use France-only words (« voiture », « pull », « chaussettes », « week-end », « petit-déjeuner »).',
    help: 'If the child answers in English or Chinese or gets stuck, give the French words and invite them to repeat. Gently model correct gender, verb forms and liaisons.',
    praise: 'Bravo!' },
  zh: { flag: '🐼', name: '中文', t: { fr: 'Chinois', en: 'Chinese', zh: zh('中文', 'zhōng wén') }, code: 'zh',
    who: 'practise speaking Mandarin Chinese. The child is 7, lives in Québec (French school, learns English), and speaks some Chinese at home; help them speak more and learn new words.',
    speak: 'Speak ONLY in Mandarin Chinese (Putonghua), slowly and clearly, standard pronunciation, simple everyday words a 7-year-old knows. Never say a single word of French or English, not even in parentheses: the whole conversation stays in Chinese. The activity below is written in English for you only: do it entirely in Chinese, with Chinese examples (e.g. “Once upon a time” → “从前”).',
    help: 'If the child answers in French or English or gets stuck, say the Chinese words and invite them to repeat. Never translate into French or English. To help, use even simpler Chinese words, give examples, offer two choices (“是大的还是小的？”), describe the thing, or say the first word of the sentence for them. Help gently with tones of difficult words.',
    praise: '真棒!' },
};
const MAX_SESSION = 6 * 60;                  // seconds per conversation
export const dailyLimit = () => store.settings.talkLimit ?? 15;   // minutes per day (parents)
const usedToday = () => (store.talk?.date === today() ? store.talk.sec : 0);

const L = {
  title: { fr: 'Parle avec Hibou', en: 'Talk with Owl', zh: zh('和猫头鹰说话', 'hé māo tóu yīng shuō huà') },
  pick: { fr: 'Choisis une langue et une conversation. Hibou parle avec toi!', en: 'Pick a language and a conversation. Owl talks with you!', zh: zh('选一种语言和一个话题。猫头鹰和你聊天！', 'xuǎn yì zhǒng yǔ yán hé yí gè huà tí māo tóu yīng hé nǐ liáo tiān') },
  start: { fr: 'Touche pour commencer', en: 'Tap to start', zh: zh('点一下开始', 'diǎn yí xià kāi shǐ') },
  connecting: { fr: 'Hibou arrive…', en: 'Owl is coming…', zh: zh('猫头鹰来了……', 'māo tóu yīng lái le') },
  listening: { fr: 'Hibou t’écoute… parle!', en: 'Owl is listening… talk!', zh: zh('猫头鹰在听……说吧！', 'māo tóu yīng zài tīng shuō ba') },
  speaking: { fr: 'Hibou parle…', en: 'Owl is talking…', zh: zh('猫头鹰在说话……', 'māo tóu yīng zài shuō huà') },
  stop: { fr: 'Terminer', en: 'Finish', zh: zh('结束', 'jié shù') },
  noServer: { fr: 'La voix de Hibou n’est pas encore installée. Demande à un parent.', en: 'Owl’s voice is not set up yet. Ask a parent.', zh: zh('猫头鹰的声音还没有装好。请问爸爸妈妈。', 'māo tóu yīng de shēng yīn hái méi yǒu zhuāng hǎo qǐng wèn bà ba mā ma') },
  noMic: { fr: 'Le micro est bloqué. Autorise le micro pour ce site dans Réglages.', en: 'The microphone is blocked. Allow the microphone for this site in Settings.', zh: zh('麦克风被关了。请爸爸妈妈在设置里打开。', 'mài kè fēng bèi guān le qǐng bà ba mā ma zài shè zhì lǐ dǎ kāi') },
  needHttps: { fr: 'Le micro marche seulement sur la version en ligne (https).', en: 'The microphone only works on the online (https) version.', zh: zh('麦克风只能在网上的版本用。', 'mài kè fēng zhǐ néng zài wǎng shàng de bǎn běn yòng') },
  badCode: { fr: 'Le code familial n’est pas bon. Un parent peut l’entrer ici :', en: 'The family code is wrong. A parent can enter it here:', zh: zh('家庭密码不对。请爸爸妈妈在这里输入：', 'jiā tíng mì mǎ bú duì qǐng bà ba mā ma zài zhè lǐ shū rù') },
  needCode: { fr: 'Avant la première conversation, un parent entre le code familial :', en: 'Before the first talk, a parent enters the family code:', zh: zh('第一次聊天以前，请爸爸妈妈输入家庭密码：', 'dì yī cì liáo tiān yǐ qián qǐng bà ba mā ma shū rù jiā tíng mì mǎ') },
  codeLabel: { fr: 'Code familial', en: 'Family code', zh: zh('家庭密码', 'jiā tíng mì mǎ') },
  ok: { fr: 'OK', en: 'OK', zh: zh('好', 'hǎo') },
  limit: { fr: 'C’est assez pour aujourd’hui! Reviens demain.', en: 'That’s enough for today! Come back tomorrow.', zh: zh('今天说够了！明天再来吧。', 'jīn tiān shuō gòu le míng tiān zài lái ba') },
  error: { fr: 'Oups, Hibou n’a pas pu venir. Réessaie plus tard.', en: 'Oops, Owl could not come. Try again later.', zh: zh('哎呀，猫头鹰来不了。等一下再试试。', 'āi yā māo tóu yīng lái bu liǎo děng yí xià zài shì shi') },
  left: { fr: 'min restantes aujourd’hui', en: 'min left today', zh: zh('分钟：今天还可以说', 'fēn zhōng jīn tiān hái kě yǐ shuō') },
  bravo: { fr: 'Super conversation!', en: 'Great conversation!', zh: zh('聊得真好！', 'liáo de zhēn hǎo') },
  you: { fr: 'Toi', en: 'You', zh: zh('你', 'nǐ') },
  owl: { fr: 'Hoo', en: 'Hoo', zh: zh('猫头鹰', 'māo tóu yīng') },
  tapTalk: { fr: 'Touche et parle', en: 'Tap and talk', zh: zh('点一下，说话', 'diǎn yí xià shuō huà') },
  tapSend: { fr: 'Touche quand tu as fini', en: 'Tap when you are done', zh: zh('说完了点一下', 'shuō wán le diǎn yí xià') },
  thinking: { fr: 'Hibou réfléchit…', en: 'Owl is thinking…', zh: zh('猫头鹰在想……', 'māo tóu yīng zài xiǎng') },
  yourTurn: { fr: 'À toi! Touche le micro.', en: 'Your turn! Tap the mic.', zh: zh('轮到你了！点一下麦克风。', 'lún dào nǐ le diǎn yí xià mài kè fēng') },
  diff: [null, { fr: 'Facile', en: 'Easy', zh: zh('简单', 'jiǎn dān') }, { fr: 'Moyen', en: 'Medium', zh: zh('中等', 'zhōng děng') }, { fr: 'Difficile', en: 'Hard', zh: zh('难', 'nán') }],
};

const BASE = (level, T) => `You are "Hoo" (in Chinese: 小猫头鹰 Hoo, in French: Hibou), a warm, playful owl who helps a 7-year-old child ${T.who}
Rules:
- ${T.speak} ${['', 'Use very simple words and 3–6 word sentences.', 'Use simple words and short sentences.', 'Use simple but natural sentences; you may use a few new words and explain them.'][level]}
- Say at most 2 short sentences, then ask ONE easy question and wait. Never give long speeches.
- ${T.help}
- When the child makes a mistake, repeat the sentence correctly in a natural way ("Oh, you have a dog! Me too!") instead of saying "wrong".
- Praise effort often and be enthusiastic. Laugh softly when something is funny.
- Keep everything child-safe and kind. If the child talks about something unsafe or sad, be gentle and suggest talking to a parent.
- Never ask for or repeat personal details (last name, address, school name, phone, passwords). If the child shares them, don't repeat them.
- Adapt the activity below to this language and culture (prices in dollars are fine).
- Stay on the activity below; if the child drifts, follow briefly then bring it back playfully.
- Start right away by greeting the child and beginning the activity.`;

export const SCENARIOS = [
  { id: 'hello', icon: '👋', t: { fr: 'Faisons connaissance', en: 'Let’s meet', zh: zh('认识一下', 'rèn shí yí xià') }, task: 'Introduce yourself (you are an owl living in a maple tree in Montréal). Ask the child’s first name only, age, favourite colour, favourite food, and what they like to play.' },
  { id: 'repeat', icon: '🦜', t: { fr: 'Répète après moi', en: 'Repeat after me', zh: zh('跟我说', 'gēn wǒ shuō') }, task: 'Read-and-repeat (pronunciation) game. Say one short grade-2 sentence (themes: animals, food, family, school, weather, toys). Ask the child to repeat it. Listen to how they said it: praise what was good and help with at most ONE sound or word that was hard ("Let’s say “three” together: th-ree"). Then give the next sentence, slightly harder after 3 good ones. Count the stars out loud: one star per good repeat.' },
  { id: 'icecream', icon: '🍦', t: { fr: 'Au comptoir de crème glacée', en: 'At the ice cream shop', zh: zh('冰淇淋店', 'bīng qí lín diàn') }, task: 'Role-play: you work at an ice cream shop. Greet the customer, ask what flavour, cone or cup, how many scoops, toppings. Say the price in dollars and loonies; let the child pay and say thank you. Then swap roles once.' },
  { id: 'animals', icon: '🦊', t: { fr: 'Devine l’animal', en: 'Guess the animal', zh: zh('猜猜是什么动物', 'cāi cai shì shén me dòng wù') }, task: 'Guessing game: describe an animal with 3 simple clues (colour, size, where it lives, sound) and let the child guess; then ask the child to describe one for you to guess. Use Canadian animals sometimes (moose, beaver, raccoon, loon).' },
  { id: 'weather', icon: '⛄', t: { fr: 'Météo et vêtements', en: 'Weather and clothes', zh: zh('天气和衣服', 'tiān qì hé yī fu') }, task: 'Talk about today’s weather and the season in Québec, and what to wear (toque, mittens, boots, snow pants, raincoat, shorts). Play “What do I wear when it’s…?”' },
  { id: 'school', icon: '🎒', t: { fr: 'Ma journée à l’école', en: 'My school day', zh: zh('我在学校的一天', 'wǒ zài xué xiào de yì tiān') }, task: 'Ask about the child’s day: what they did at school, recess games, lunch, favourite subject, who they played with (first names only). React with interest and model full sentences.' },
  { id: 'store', icon: '🧸', t: { fr: 'Au magasin de jouets', en: 'At the toy store', zh: zh('玩具店', 'wán jù diàn') }, task: 'Role-play a toy store. The child is the customer: they ask for a toy, colour, size; you say the price; count money together with small numbers.' },
  { id: 'story', icon: '📖', t: { fr: 'Inventons une histoire', en: 'Let’s make a story', zh: zh('一起编故事', 'yì qǐ biān gù shì') }, task: 'Build a funny short story together, one sentence each. Start with “Once upon a time, there was a…”. Ask the child what happens next with choices if they are stuck. End the story after about 8 turns and retell it in 3 sentences.' },
  { id: 'ispy', icon: '🔎', t: { fr: 'Je vois, je vois', en: 'I spy', zh: zh('我看见了什么', 'wǒ kàn jiàn le shén me') }, task: 'Play “I spy with my little eye something that is…(colour)” using things found in a house or classroom; give more clues if needed; then let the child be the spy.' },
  { id: 'hockey', icon: '🏒', t: { fr: 'Sports et jeux', en: 'Sports and games', zh: zh('运动和游戏', 'yùn dòng hé yóu xì') }, task: 'Talk about sports and games: hockey, skating, soccer, swimming, tag. Ask what the child likes, can do, and teach action verbs (skate, kick, throw, jump) with “Can you…?” questions.' },
  { id: 'feelings', icon: '😊', t: { fr: 'Mes émotions', en: 'My feelings', zh: zh('我的心情', 'wǒ de xīn qíng') }, task: 'Talk about feelings (happy, sad, angry, tired, excited, scared) with simple situations: “How do you feel when it’s your birthday?” Teach “I feel … because …”.' },
  { id: 'free', icon: '🌟', t: { fr: 'On jase!', en: 'Free chat', zh: zh('随便聊聊', 'suí biàn liáo liao') }, task: 'Free friendly chat about whatever the child wants (pets, games, cartoons, food, family). Keep it simple and fun.' },
];

let live = null;   // current session
// Family code box shown right where it is needed (also on ⚙️ Parents → Serveur de voix).
function codeBox(onSaved) {
  const i = el('input', { class: 'name-in code-in', type: 'password', inputmode: 'numeric', placeholder: '••••••', autocomplete: 'off', value: store.settings.voiceCode || '' });
  const ok = () => { store.settings.voiceCode = i.value.trim(); save(); sfx('tap'); onSaved?.(); };
  i.addEventListener('keydown', (e) => e.key === 'Enter' && ok());
  return el('div', { class: 'code-box' }, el('span', {}, '🔑 ', tr(L.codeLabel)), i, el('button', { class: 'btn primary', onclick: ok }, tr(L.ok)));
}
function badCode() {
  if (!live) return;
  const back = live.ui.back, tl = live.tl;
  setText(live.ui.status, tr(L.badCode));
  live.ui.status.after(codeBox(() => { end(true); talkHome(back, tl); }));
}
const voiceUrl = () => (store.settings.voiceUrl || VOICE_URL).replace(/\/$/, '');

export function talkHome(back, langArg) {
  let tl = langArg || store.pick.talkLang || 'en';
  if (!TALK_LANGS[tl]) tl = 'en';
  store.pick.talkLang = tl;
  setZone(tl === 'en' || tl === 'zh' ? tl : null);   // Talk in English / Chinese = « English zone » / « Chinese zone »: the whole screen reads in that language
  const left = Math.max(0, dailyLimit() * 60 - usedToday());
  const ok = !!voiceUrl();
  let level = store.pick.talk || 1;
  const seg = el('div', { class: 'diff-seg' });
  const drawSeg = () => {
    seg.innerHTML = '';
    for (const l of [1, 2, 3]) seg.append(el('button', { class: `${['', 'green', 'orange', 'red'][l]} ${l === level ? 'on' : ''}`, onclick: () => { sfx('tap'); level = l; store.pick.talk = l; save(); drawSeg(); } }, tr(L.diff[l])));
  };
  drawSeg();
  screen('talk-screen green',
    el('header', { class: 'bar' }, backBtn(back), el('h1', {}, '🎙️ ', tr(L.title)), wallet()),
    el('div', { class: 'talk-langs' }, Object.entries(TALK_LANGS).map(([k, T]) => el('button', { class: `talk-lang ${k === tl ? 'on' : ''}`, onclick: () => { sfx('tap'); store.pick.talkLang = k; save(); talkHome(back, k); } }, el('span', {}, T.flag), getZone() ? tr(T.t) : T.name))),
    el('p', { class: 'hub-intro' }, tr(L.pick), ' · ', `⏱️ ${Math.ceil(left / 60)} `, tr(L.left)),
    !ok ? el('div', { class: 'talk-warn' }, '⚙️ ', tr(L.noServer)) : null,
    ok && !store.settings.voiceCode ? el('div', { class: 'talk-warn' }, tr(L.needCode), codeBox(() => talkHome(back, tl))) : null,
    seg,
    el('div', { class: 'talk-grid' }, SCENARIOS.map((s) => el('button', { class: 'talk-card', onclick: () => { sfx('tap'); start(s, level, back, tl); } },
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

async function start(s, level, back, tl = 'en') {
  const T = TALK_LANGS[tl];
  if (!voiceUrl()) { sheet(el('p', { class: 'talk-warn' }, tr(L.noServer))); return; }
  if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) { sheet(el('p', { class: 'talk-warn' }, tr(L.needHttps))); return; }
  if (usedToday() >= dailyLimit() * 60) { sheet(el('p', { class: 'talk-warn' }, tr(L.limit))); return; }
  stopSpeech();
  const ui = stage(s, back);
  live = { ui, s, level, tl, t0: 0, turns: 0, pc: null, mic: null, tick: null, ended: false };
  try {
    const mic = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    live.mic = mic;
    const local = await findLocal();
    const instr = `${BASE(level, T)}\n\nActivity: ${s.task}`;
    if (local && await localSession(local, instr, T.code, 'pc')) return;
    if (live && await localSession(`${voiceUrl()}/ai`, instr, T.code, 'cloud')) return;
    if (!live) return;
    const r = await fetch(`${voiceUrl()}/realtime`, {
      method: 'POST', headers: { 'content-type': 'application/json', ...(store.settings.voiceCode ? { 'x-family-code': store.settings.voiceCode } : {}) },
      body: JSON.stringify({ scenario: s.id, lang: T.code, instructions: `${BASE(level, T)}\n\nActivity: ${s.task}` }),
    });
    if (r.status === 401) { cleanup(); badCode(); return; }
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
    setText(ui.status, tr(blocked ? L.noMic : L.error));
    cleanup();
  }
}

// ---------- Local mode: the family PC (localvoice/) does Whisper + qwen3 + Kokoro, free ----------
const codeHdr = () => (store.settings.voiceCode ? { 'x-family-code': store.settings.voiceCode } : {});
async function findLocal() {
  try {
    const info = await (await fetch(`${voiceUrl()}/local`, { headers: codeHdr(), signal: AbortSignal.timeout(3000) })).json();
    if (!info.url || Date.now() - info.at > 3 * 864e5) return null;
    const h = await fetch(`${info.url}/health`, { signal: AbortSignal.timeout(3000) });
    return h.ok ? info.url : null;
  } catch { return null; }
}
const audioUrl = (b64, mime = 'audio/wav') => URL.createObjectURL(new Blob([Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))], { type: mime }));
// Returns true when the conversation ran (or failed for a reason that a fallback cannot fix), false to try the next voice.
async function localSession(base, instructions, code, kind) {
  const ui = live.ui;
  live.local = true;
  const history = [];
  const mic = live.mic;
  const type = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm'].find((t) => window.MediaRecorder?.isTypeSupported?.(t)) || '';
  const btn = el('button', { class: 'btn talk-mic', disabled: true }, '🎤 ', tr(L.tapTalk));
  const say = async (b64, mime) => { setState('speaking'); try { if (b64) await playSrc(audioUrl(b64, mime)); } catch {} if (live) setState('ready'); };
  const call = async (path, opts) => {
    const r = await fetch(`${base}${path}`, { ...opts, headers: { ...(opts.headers || {}), ...codeHdr() } });
    if (r.status === 401) throw Object.assign(new Error('code'), { code: 401 });
    if (!r.ok) throw new Error(path + ' ' + r.status);
    return r.json();
  };
  try {
    setText(ui.status, tr(L.connecting));
    const first = await call('/start', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ lang: code, instructions }) });
    if (!live) return;
    live.t0 = Date.now(); live.tick = setInterval(tick, 500);
    ui.log.after(btn);
    ui.log.before(el('div', { class: 'talk-via' }, kind === 'pc' ? '🖥️' : '☁️', getZone() === 'zh' ? '' : kind === 'pc' ? ' PC' : ' Cloudflare'));
    addLine('owl', first.reply); history.push({ role: 'assistant', content: first.reply });
    await say(first.audio, first.mime);
  } catch (e) {
    if (!live) return true;
    if (e.code === 401) { badCode(); return true; }
    console.warn('voice', kind, e);
    clearInterval(live.tick); live.t0 = 0;
    return false;
  }
  if (!live) return true;
  btn.disabled = false;
  let rec = null, chunks = [];
  btn.onclick = async () => {
    if (!live) return;
    if (!rec) {                                   // start recording
      stopSpeech();
      chunks = [];
      rec = new MediaRecorder(mic, type ? { mimeType: type } : undefined);
      rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
      rec.start();
      btn.replaceChildren('⏹ ', el('span', {}, tr(L.tapSend))); btn.classList.add('rec'); setState('listening');
      live.recTimer = setTimeout(() => rec && btn.onclick(), 20000);
      return;
    }
    clearTimeout(live.recTimer);                  // stop + send
    const r = rec; rec = null;
    await new Promise((res) => { r.onstop = res; r.stop(); });
    btn.disabled = true; btn.classList.remove('rec'); btn.textContent = '⏳ …';
    setText(ui.status, tr(L.thinking)); ui.owlBox.className = 'talk-owl thinking';
    try {
      const blob = new Blob(chunks, { type: r.mimeType || 'audio/webm' });
      const fd = new FormData();
      fd.append('audio', blob, (r.mimeType || '').includes('mp4') ? 'talk.mp4' : 'talk.webm');
      fd.append('meta', JSON.stringify({ lang: code, instructions, history }));
      const res = await call('/talk', { method: 'POST', body: fd });
      if (!live) return;
      if (res.heard) { addLine('me', res.heard); history.push({ role: 'user', content: res.heard }); live.turns++; sfx('tap'); }
      addLine('owl', res.reply); history.push({ role: 'assistant', content: res.reply });
      await say(res.audio, res.mime);
    } catch (e) { if (e.code === 401) badCode(); else if (live) setText(ui.status, tr(L.error)); }
    if (live) { btn.disabled = false; btn.replaceChildren('🎤 ', el('span', {}, tr(L.tapTalk))); }
  };
  return true;
}

function setState(st) {
  if (!live) return;
  setText(live.ui.status, tr(st === 'listening' ? L.listening : st === 'ready' ? L.yourTurn : L.speaking));
  live.ui.owlBox.className = `talk-owl ${st}`;
}
function addLine(who, text) {
  if (!live || !text?.trim()) return;
  const n = el('div', { class: `tl ${who}` }, el('b', {}, who === 'me' ? '🧒 ' : '🦉 ', tr(who === 'me' ? L.you : L.owl)), ' ', text.trim());
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
  clearInterval(live.tick); clearTimeout(live.recTimer);
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
  const back = live.ui.back, turns = live.turns, s = live.s, tl = live.tl;
  live = null;
  if (turns >= 2) {
    const coins = Math.min(30, turns * 2);
    if (tl === 'en') window.__planDone?.('TALK');
    addCoins(coins); touchStreak(); bump('talks'); bump('games'); progress(tl === 'fr' ? 'francais' : tl === 'en' ? 'anglais' : 'chinois'); progress('correct', turns);
    store.log.push({ d: today(), unit: 'talk', level: 0, mode: 'talk', score: turns, total: turns, ms: sec * 1000 });
    const fresh = checkBadges(); save();
    if (!quit) {
      confetti(50); sfx('win');
      const sh = sheet(el('div', { class: 'memory-done' }, dressedOwl('big hop-loop'), el('h2', {}, tr(L.bravo)),
        el('div', { class: 'res-score' }, `${s.icon} 🗣️ × ${turns}`), el('div', { class: 'res-coins' }, `+${coins} ${COIN}`),
        el('div', { class: 'res-btns' }, el('button', { class: 'btn primary', onclick: () => { sh.close(); talkHome(back, tl); } }, '➜'))));
      showBadges(fresh);
      return;
    }
  }
  save();
  talkHome(back, tl);
}
