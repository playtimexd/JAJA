import { el, makeRng, wait } from './util.js';
import { store, save, today, levelStats, recordSession, frWeek, setFrWeek } from './store.js';
import { t, tr, lang, STRINGS, setZone, getZone, zh } from './i18n.js';
import { speak, stopSpeech, sfx, unlockAudio, setContentLang } from './audio.js';
import { runQuestion, face, setText } from './widgets.js';
import { app, screen, backBtn, starsTxt, wallet, streakPill, refreshWallet, sheet } from './ui.js';
import {
  COIN, bump, maxStat, addCoins, touchStreak, missions, progress, claim, BADGES, checkBadges, showBadges,
  SHOP, SLOTS, buy, toggleWear, dressedOwl, confetti, floatText, toast,
} from './game.js';
import { wordPairs, mathPairs } from './content/pairs.js';
import { planCard, markPlan, upcoming } from './plan.js';
import { blockForWeek } from './content/francais4.js';
import { GROUPS as F6_GROUPS } from './content/francais6.js';

const SUBJECTS = [
  { id: 'francais', icon: '📖', color: 'pink', mods: ['./content/francais.js', './content/francais2.js', './content/francais3.js', './content/francais4.js', './content/francais5.js', './content/francais6.js'], speech: 'fr-CA', praise: 'fr' },
  { id: 'math', icon: '🧮', color: 'blue', mods: ['./content/math.js'], speech: null, praise: null },
  { id: 'anglais', icon: '🍁', color: 'green', mods: ['./content/anglais-catch.js', './content/anglais.js', './content/anglais2.js', './content/anglais3.js'], speech: 'en-CA', praise: 'en' },
  { id: 'chinois', icon: '🐼', color: 'red', mods: ['./content/chinois.js', './content/chinois2.js', './content/chinois3.js'], speech: 'zh-CN', praise: 'zh' },
];
// 3e année: one module per subject in js/content/g3/<subject>.js exporting `units` (ids g3f…, g3m…, g3e…, g3c…) and `SECTIONS`.
// The child switches 2e / 3e freely on the home screen (store.settings.grade); progress is kept per unit id, so nothing is lost.
const G3 = { francais: './content/g3/francais.js', math: './content/g3/math.js', anglais: './content/g3/anglais.js', chinois: './content/g3/chinois.js' };
const grade = () => (store.settings.grade === 3 ? 3 : 2);
const perSession = () => store.settings.perSession || 8;
const STICKERS = '🦊🐻🐼🐨🐯🦁🐸🐵🐧🐦🦉🦄🐝🦋🐢🐙🦀🐬🐳🦭🦫🦌🐿️🦔🐞🍁🌻🌈⭐🌙☀️❄️⛄🍓🍉🍩🧁🍭🎈🎨🚀🚲🛷🏒🎸🎁🏆👑💎🦕🦖🐲'.match(/\p{Extended_Pictographic}(️)?/gu);
const DIFF_COL = ['', 'green', 'orange', 'red'];

const units = {}; // subjectId -> units[] of the CURRENT grade
const allUnits = {}; // subjectId -> { 2: units[], 3: units[] }
const SECTIONS3 = {}; // subjectId -> sections of 3e année
async function loadSubjects() {
  await Promise.all(SUBJECTS.map(async (s) => {
    const g2 = [], g3 = [];
    for (const m of s.mods) {
      try { g2.push(...(await import(m)).units); } catch (e) { console.warn('missing content', m, e.message); }
    }
    try { const m3 = await import(G3[s.id]); g3.push(...m3.units); SECTIONS3[s.id] = m3.SECTIONS || []; } catch (e) { SECTIONS3[s.id] = []; }
    for (const u of g2) { u.subject = s; u.grade ??= 2; }
    for (const u of g3) { u.subject = s; u.grade = 3; }
    allUnits[s.id] = { 2: g2, 3: g3 };
  }));
  applyGrade();
}
function applyGrade() { for (const s of SUBJECTS) units[s.id] = allUnits[s.id]?.[grade()] || []; }
export function setGrade(g) { store.settings.grade = g; save(); applyGrade(); }
const unitById = (id) => SUBJECTS.flatMap((s) => [...(allUnits[s.id]?.[2] || []), ...(allUnits[s.id]?.[3] || [])]).find((u) => u.id === id);
const owl = (cls = '') => dressedOwl(cls);
// « English zone » / « Chinese zone »: everything inside the anglais subject is shown and spoken in English, everything
// inside the chinois subject in Chinese with pinyin (js/i18n.js setZone).
const ZONES = { anglais: 'en', chinois: 'zh' };
const zoneOf = (s) => setZone(ZONES[s?.id] || null);
// text in the app's own language even inside a zone (labels shown later on the home screen)
const appLang = (fn) => { const z = getZone(); setZone(null); try { return fn(); } finally { setZone(z); } };
const SEC = { fr: ' s', en: ' s', zh: zh('秒', 'miǎo') };   // seconds unit
const zonePool = (list) => { const ids = new Set(list.map((u) => u?.subject?.id)); zoneOf(ids.size === 1 ? list[0].subject : null); };

// ---------------- Sections (two-level navigation: subject → section → units) ----------------
const range = (p, a, b) => Array.from({ length: b - a + 1 }, (_, i) => `${p}${a + i}`);
const SECTIONS = {
  math: [
    { id: 'nombres', icon: '🔢', t: { fr: 'Les nombres', en: 'Numbers' }, ids: ['m1', 'm2', 'm3', 'm4', 'm8'], boss: '🐲' },
    { id: 'calcul', icon: '➕', t: { fr: 'Addition, soustraction et calcul mental', en: 'Adding, subtracting, mental math' }, ids: ['m5', 'm6', 'm14'], boss: '🦖' },
    { id: 'multi', icon: '✖️', t: { fr: 'Multiplication, division et fractions', en: 'Multiplication, division, fractions' }, ids: ['m13', 'm9'], boss: '🐙' },
    { id: 'geo', icon: '📐', t: { fr: 'Géométrie, mesure et argent', en: 'Geometry, measurement, money' }, ids: ['m10', 'm16', 'm11', 'm15'], boss: '🦁' },
    { id: 'stats', icon: '📊', t: { fr: 'Statistique et probabilité', en: 'Data and probability' }, ids: ['m12'], boss: '🐯' },
    { id: 'probl', icon: '🕵️', t: { fr: 'Je résous des problèmes', en: 'Problem solving' }, ids: ['m7', 'm17', 'm18', 'm19'], boss: '🐉' },
  ],
  francais: [
    // cahier « Semaines » de la classe ; le bloc de la semaine courante (frWeek) est mis en avant
    { id: 'semaine', icon: '📅', t: { fr: 'Mes mots de la semaine', en: 'This week’s words' }, ids: range('f', 19, 30), boss: '🐺', week: true },
    { id: 'lect', icon: '🔤', t: { fr: 'Lecture et sons', en: 'Reading & sounds' }, ids: ['f1', 'f2', 'f8', 'f14'], boss: '🐉' },
    { id: 'sons', icon: '🔊', t: { fr: 'Tous les sons', en: 'All the sounds' }, ids: range('f', 40, 77), boss: '🦜' },
    ...F6_GROUPS.map((g, i) => ({ id: g.id, icon: g.icon, t: g.title, ids: g.ids, boss: ['🦁', '🐊', '🦅', '🐘', '🐳'][i % 5] })),
    { id: 'mots', icon: '📝', t: { fr: 'Mots et orthographe', en: 'Words & spelling' }, ids: ['f3', 'f9', 'f10', 'f12', 'f13'], boss: '🦈' },
    { id: 'gram', icon: '✏️', t: { fr: 'Grammaire', en: 'Grammar' }, ids: ['f4', 'f5', 'f6'], boss: '🦖' },
    { id: 'phr', icon: '💬', t: { fr: 'Phrases et ponctuation', en: 'Sentences & punctuation' }, ids: ['f7', 'f11'], boss: '🐙' },
    { id: 'ecrire', icon: '✍️', t: { fr: 'J’écris', en: 'Writing' }, ids: ['f15', 'f16', 'f17', 'f18'], boss: '🦉' },
    { id: 'livres', icon: '📚', t: { fr: 'Mes livres', en: 'My books' }, ids: [], books: true },
  ],
  anglais: [
    { id: 'catch', icon: '📗', t: { fr: 'Catch · 2e année', en: 'Catch · Grade 2' }, ids: range('k', 0, 9), boss: '🦊' },
    { id: 'read', icon: '📖', t: { fr: 'Lire et répéter', en: 'Read & repeat' }, ids: ['e20', 'e19', 'e34'], boss: '🐉' },
    { id: 'words', icon: '🔤', t: { fr: 'Les mots', en: 'Words' }, ids: ['e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e13', 'e14', 'e15', 'e16', 'e17', 'e18'], boss: '🦖' },
    { id: 'gram', icon: '✍️', t: { fr: 'Phrases et grammaire', en: 'Sentences & grammar' }, ids: [...range('e', 21, 33)], boss: '🐙' },
    { id: 'write', icon: '✍️', t: { fr: 'Écrire en anglais', en: 'Writing' }, ids: ['e35', 'e36', 'e37', 'e38'], boss: '🦉' },
    { id: 'talk', icon: '💬', t: { fr: 'Parler', en: 'Speaking' }, ids: ['e1', 'e12'], boss: '🦈', talk: true },
    { id: 'livres', icon: '📚', t: { fr: 'Livres en anglais', en: 'Storybooks' }, ids: [], books: true, lang: 'en' },
  ],
  chinois: [
    { id: 'py', icon: '🔤', t: { fr: 'Pinyin et tons', en: 'Pinyin & tones', zh: zh('拼音和声调', 'pīn yīn hé shēng diào') }, ids: range('c', 1, 5), boss: '🐉' },
    { id: 'sz', icon: '🀄', t: { fr: 'Caractères', en: 'Characters', zh: zh('识字', 'shí zì') }, ids: range('c', 6, 14), boss: '🦁' },
    { id: 'xz', icon: '🖌️', t: { fr: 'Écrire', en: 'Writing', zh: zh('写字', 'xiě zì') }, ids: [...range('c', 15, 18), 'c22', 'c23', 'c24'], boss: '🐯' },
    { id: 'yd', icon: '📜', t: { fr: 'Comptines et poèmes', en: 'Rhymes & poems', zh: zh('儿歌和古诗', 'ér gē hé gǔ shī') }, ids: range('c', 19, 21), boss: '🐲' },
    { id: 'livres', icon: '📚', t: { fr: 'Histoires 故事书', en: 'Storybooks 故事书', zh: zh('故事书', 'gù shì shū') }, ids: [], books: true, lang: 'zh' },
  ],
};
function sectionsOf(s) {
  const list = units[s.id];
  const defs = grade() === 3 ? (SECTIONS3[s.id] || []) : SECTIONS[s.id];
  if (!defs.length) return list.length ? [{ id: 'all', icon: s.icon, t: { fr: 'Tout', en: 'All', zh: zh('全部', 'quán bù') }, ids: list.map((u) => u.id), subject: s, units: list, boss: '🐲' }] : [];
  const secs = defs.map((x) => ({ ...x, subject: s, units: x.ids.map((id) => list.find((u) => u.id === id)).filter(Boolean) }));
  const used = new Set(secs.flatMap((x) => x.ids));
  const rest = list.filter((u) => !used.has(u.id));
  if (rest.length) secs[secs.length - 1].units.push(...rest);   // never lose a unit
  return secs.filter((x) => x.units.length || x.talk || x.books);
}
const unitStars = (u) => [1, 2, 3].reduce((b, l) => b + (levelStats(u.id, l)?.stars ?? 0), 0);
const subjectStars = (s) => units[s.id].reduce((a, u) => a + unitStars(u), 0);
const record = (key) => store.records[key] || 0;

// ---------------- Home ----------------
function home() {
  setZone(null);
  const name = store.settings.name;
  const dailyDone = store.daily.date === today() && store.daily.done;
  const greet = `${t('hello')}${name ? ', ' + name : ''}!`;
  const ms = missions();
  const cards = [
    ...SUBJECTS.map((s) => {
      const got = subjectStars(s), max = units[s.id].length * 9;
      return el('button', { class: `subject ${s.color}`, onclick: () => { sfx('tap'); subject(s); } },
        el('span', { class: 'sub-icon' }, s.icon),
        el('span', { class: 'sub-name' }, t(s.id)),
        el('span', { class: 'sub-bar' }, el('span', { style: { width: `${max ? (got / max) * 100 : 0}%` } })),
        el('span', { class: 'sub-stars' }, `★ ${got}`));
    }),
    el('button', { class: 'subject teal', onclick: async () => { sfx('tap'); (await import('./why.js')).whyHome(home, play); } },
      el('span', { class: 'sub-icon' }, '🔭'),
      el('span', { class: 'sub-name' }, t('why')),
      el('span', { class: 'sub-stars' }, `✔ ${Object.keys(store.why || {}).length}`)),
    el('button', { class: 'subject purple', onclick: async () => { sfx('tap'); (await import('./arts.js')).artsHome(home); } },
      el('span', { class: 'sub-icon' }, '🎨'),
      el('span', { class: 'sub-name' }, t('arts')),
      el('span', { class: 'sub-stars' }, `✔ ${Object.keys(store.arts.done).length}`)),
  ];
  screen('home',
    el('header', { class: 'home-top' },
      el('button', { class: 'owl-btn', onclick: () => { sfx('tap'); shop(); } }, owl('big bob')),
      el('div', { class: 'bubble' }, el('div', { class: 'greet' }, greet), el('div', {}, t('pickSubject'))),
      el('div', { class: 'grade-switch', role: 'group' }, [2, 3].map((g) => el('button', { class: grade() === g ? 'on' : '', onclick: () => { if (grade() === g) return; sfx('tap'); setGrade(g); home(); } }, tr({ fr: `${g}e année`, en: `Grade ${g}` })))),
      el('div', { class: 'hud' }, wallet(), streakPill()),
    ),
    planCard(openPlanBlock, planUnitTitle),
    resumeCard(),
    (() => { const n = dueMistakes().length, all = mistakes().length; return all ? el('button', { class: `review-card ${n ? '' : 'calm'}`, onclick: () => { sfx('tap'); n ? play({ mode: 'review' }) : sheet(el('p', { class: 'hub-intro' }, t('reviewNone'))); } },
      el('span', { class: 'resume-i' }, '📕'), el('span', { class: 'resume-t' }, el('b', {}, t('review'), n ? ` · ${n}` : ''), el('small', {}, n ? t('reviewSub') : `${all} ${t('reviewLater')}`))) : null; })(),
    el('div', { class: 'subjects five' }, cards),
    el('div', { class: 'home-row' },
      el('div', { class: 'missions mcard-box' },
        el('h3', {}, '🎯 ', t('missions')),
        ms.map((m) => {
          const done = m.p >= m.goal;
          return el('div', { class: `mission ${done ? 'done' : ''} ${m.claimed ? 'claimed' : ''}` },
            el('span', { class: 'm-i' }, m.icon),
            el('div', { class: 'm-body' }, el('div', { class: 'm-t' }, tr(m.t)), el('div', { class: 'm-bar' }, el('span', { style: { width: `${(m.p / m.goal) * 100}%` } }))),
            m.claimed ? el('span', { class: 'm-ok' }, '✔')
              : done ? el('button', { class: 'btn claim', onclick: (e) => { const n = claim(m.id); sfx('win'); confetti(30, { x: e.clientX, y: e.clientY }); floatText(`+${n} ${COIN}`, e.clientX, e.clientY, 'gold'); setTimeout(home, 900); } }, `+${m.reward} ${COIN}`)
                : el('span', { class: 'm-n' }, `${m.p}/${m.goal}`));
        })),
      el('div', { class: 'home-col' },
        el('button', { class: `wide daily ${dailyDone ? 'done' : ''}`, onclick: () => { sfx('tap'); play({ mode: 'daily' }); } },
          el('span', { class: 'big-emoji' }, dailyDone ? '✅' : '🌞'), dailyDone ? t('dailyDone') : t('daily')),
        el('div', { class: 'mini-row' },
          el('button', { class: 'wide small', onclick: async () => { sfx('tap'); (await import('./talk.js')).talkHome(home); } }, el('span', { class: 'big-emoji' }, '🎙️'), t('talkShort')),
          el('button', { class: 'wide small', onclick: () => { sfx('tap'); shop(); } }, el('span', { class: 'big-emoji' }, '🛍️'), t('shop')),
          el('button', { class: 'wide small', onclick: () => { sfx('tap'); badges(); } }, el('span', { class: 'big-emoji' }, '🏅'), `${store.badges.length}/${BADGES.length}`),
          el('button', { class: 'wide small', onclick: () => { sfx('tap'); album(); } }, el('span', { class: 'big-emoji' }, '📒'), `${new Set(store.stickers).size}/${STICKERS.length}`)),
      ),
    ),
    el('footer', { class: 'home-foot' },
      el('span', { class: 'grade' }, t('grade')),
      el('button', { class: 'lang-toggle', onclick: () => { store.settings.lang = lang() === 'fr' ? 'en' : 'fr'; save(); home(); } }, lang() === 'fr' ? 'EN' : 'FR'),
      el('button', { class: 'parent-btn', onclick: () => parentGate() }, '⚙️ ', t('parents')),
    ),
  );
  speak({ text: { fr: greet, en: greet } });
}

// ---------------- Plan du jour ----------------
function planUnitTitle(target, subj) {
  if (target === 'BOOK') return tr({ fr: 'Un livre de « Mes livres »', en: 'A book from “My books”' });
  if (target === 'TALK') return tr({ fr: 'Parle avec Hibou (anglais)', en: 'Talk with Owl (English)' });
  if (target === 'WHY') return tr({ fr: 'Un « Pourquoi? » en chinois', en: 'A “Why?” in Chinese' });
  const u = unitById(target);
  return u ? tr(u.title) : target;
}
async function openPlanBlock(b) {
  sfx('tap');
  if (b.target === 'BOOK') return (await import('./livres.js')).libraryHome(home);
  if (b.target === 'TALK') return (await import('./talk.js')).talkHome(home, 'en');
  if (b.target === 'WHY') { store.settings.whyLang = 'zh'; store.settings.whyLangUi = store.settings.lang === 'en' ? 'en' : 'fr'; save(); return (await import('./why.js')).whyHome(home, play); }
  const u = unitById(b.target);
  if (u) play({ mode: 'practice', unit: u, level: b.level ?? Math.min(b.cap ?? 3, suggestedLevel(u)), back: home });
}
export function planDone(target, level) {
  const r = markPlan(target, level);
  if (r?.all) { addCoins(20); save(); setTimeout(() => { toast('📅', t('planAll')); confetti(70); }, 900); }
  else if (r) setTimeout(() => toast('✅', `${t('planBlock')} · ${tr(r.block.label)}`), 900);
}
window.__planDone = planDone;

// ▶ Continuer: picks up the last book page, craft step, « Pourquoi? » topic or exercise.
function resumeCard() {
  const r = store.resume;
  if (!r) return null;
  const go = async () => {
    sfx('tap');
    if (r.t === 'book') return (await import('./livres.js')).openBook(r.id, home, r.i);
    if (r.t === 'art') return (await import('./arts.js')).openArt(r.id, home, r.i);
    if (r.t === 'why') return (await import('./why.js')).openWhy(r.id, home, play, r.i);
    const u = unitById(r.unit);
    if (u) return play({ mode: r.mode, unit: u, level: r.level, back: () => subject(u.subject) });
  };
  return el('button', { class: 'resume', onclick: go }, el('span', { class: 'resume-i' }, r.icon || '▶'),
    el('span', { class: 'resume-t' }, el('b', {}, '▶ ', t('continue')), el('small', {}, r.label || '')));
}

// ---------------- Subject: big section tiles ----------------
function subject(s) {
  zoneOf(s);
  const secs = sectionsOf(s);
  const tile = (icon, title, sub, cls, fn) => el('button', { class: `sec-tile ${cls}`, onclick: () => { sfx('tap'); fn(); } },
    el('span', { class: 'sec-icon' }, icon), el('span', { class: 'sec-name' }, title), sub ? el('span', { class: 'sec-sub' }, sub) : null);
  screen(`subj-screen ${s.color}`,
    el('header', { class: 'bar' }, backBtn(home), el('h1', {}, s.icon, ' ', t(s.id)), wallet()),
    el('div', { class: 'sec-grid' },
      secs.map((x) => {
        if (x.books) { const pre = { en: 'en-', zh: 'zh-' }[x.lang]; const done = Object.keys(store.books || {}).filter((k) => (pre ? k.startsWith(pre) : !/^(en|zh)-/.test(k))).length; return tile(x.icon, tr(x.t), `${done} ✔ · 📖`, 'books', async () => (await import('./livres.js')).libraryHome(() => subject(s), x.lang || 'fr')); }
        const got = x.units.reduce((a, u) => a + unitStars(u), 0), max = x.units.length * 9;
        const troph = store.trophies[`${s.id}-${x.id}`];
        if (x.week) { const cur = x.units.find((u) => u.id === blockForWeek(frWeek()).id); return tile(x.icon, tr(x.t), `⭐ ${tr({ fr: 'Cette semaine', en: 'This week' })} : ${cur ? tr(cur.title) : ''}`, 'weekly', () => section(s, x.id)); }
        return tile(x.icon, tr(x.t), [`${x.units.length} `, t('games'), ` · ★ ${got}/${max}${troph ? ' · 🏆' : ''}`], '', () => section(s, x.id));
      }),
      tile('⚡', t('quiz'), t('quizSub'), 'quiz', () => quizHub(s)),
      tile('🎮', t('gamesHub'), t('gamesSub'), 'games', () => gamesHub(s)),
    ),
  );
}

// ---------------- Section: adventure path ----------------
function section(s, secId) {
  zoneOf(s);
  const sec = sectionsOf(s).find((x) => x.id === secId);
  const lastId = [...store.log].reverse().find((x) => sec.units.some((u) => u.id === x.unit))?.unit;
  const curId = sec.week ? blockForWeek(frWeek()).id : null;
  const here = curId ? sec.units.findIndex((u) => u.id === curId) : sec.units.findIndex((u) => u.id === lastId);
  const nodes = [];
  const path = el('div', { class: 'path' });
  sec.units.forEach((u, i) => {
    const lv = [1, 2, 3].map((l) => levelStats(u.id, l)?.stars ?? 0);
    const node = el('button', { class: `node pos${i % 4} ${unitStars(u) ? 'played' : ''} ${u.id === curId ? 'current' : ''}`, onclick: () => { sfx('tap'); openUnit(u, sec); } },
      u.id === curId ? el('span', { class: 'node-badge' }, '⭐ ', tr({ fr: 'Cette semaine', en: 'This week' })) : null,
      el('span', { class: 'node-icon' }, u.icon),
      el('span', { class: 'node-medals' }, lv.map((st, k) => el('i', { class: st ? DIFF_COL[k + 1] : '' }))),
      el('span', { class: 'node-title' }, tr(u.title)),
      i === (here < 0 ? 0 : here) ? el('span', { class: 'node-owl' }, owl('mini')) : null);
    nodes.push(node);
    path.append(node);
  });
  if (sec.talk) {
    const tn = el('button', { class: `node pos${sec.units.length % 4} talk`, onclick: () => { sfx('tap'); talkInfo(); } },
      el('span', { class: 'node-icon' }, '🎙️'), el('span', { class: 'node-title' }, t('talkAi')));
    nodes.push(tn); path.append(tn);
  }
  const bossKey = `${s.id}-${sec.id}`;
  const boss = el('button', { class: `node boss pos${nodes.length % 4} ${store.trophies[bossKey] ? 'beaten' : ''}`, onclick: () => { sfx('tap'); openBoss(s, sec); } },
    el('span', { class: 'node-icon' }, sec.boss), el('span', { class: 'node-title' }, t('guardian')),
    store.trophies[bossKey] ? el('span', { class: 'node-trophy' }, '🏆') : null);
  nodes.push(boss); path.append(boss);
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.classList.add('path-line');
  path.prepend(svg);
  screen(`section-screen ${s.color}`,
    el('header', { class: 'bar' }, backBtn(() => subject(s)), el('h1', {}, sec.icon, ' ', tr(sec.t)), wallet()),
    curId ? weekCard(blockForWeek(frWeek()), sec.units.find((u) => u.id === curId), sec) : null,
    path);
  // dotted trail between the nodes
  requestAnimationFrame(() => {
    const box = path.getBoundingClientRect();
    const pts = nodes.map((n) => { const r = n.querySelector('.node-icon').getBoundingClientRect(); return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top]; });
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    svg.style.height = `${box.height}px`;
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; const my = (y0 + y1) / 2; d += ` C${x0} ${my} ${x1} ${my} ${x1} ${y1}`; }
    svg.innerHTML = `<path d="${d}" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 22"/>`;
  });
}

// « Mes mots de la semaine » : la page du cahier de la semaine courante (mots ⛓ / *, règle, verbe, sons).
function weekCard(b, u, sec) {
  const wk = frWeek();
  const word = (x) => el('span', { class: `wk-word ${x.menotte ? 'men' : ''} ${b.weeks.find((w) => w.n === wk)?.words.includes(x) ? 'now' : ''}` }, x.text, x.menotte ? ' ⛓' : '', x.special ? ' *' : '');
  return el('section', { class: 'week-card' },
    el('div', { class: 'wc-head' }, el('b', {}, '⭐ ', tr({ fr: `Semaine ${wk} · ${tr(u.title)}`, en: `Week ${wk} · ${tr(u.title)}` })),
      b.proposed ? el('small', { class: 'wc-prop' }, tr({ fr: 'proposé', en: 'proposed' })) : null,
      el('button', { class: 'btn primary small', onclick: () => { sfx('tap'); openUnit(u, sec); } }, '▶ ', tr({ fr: 'Jouer', en: 'Play' }))),
    el('div', { class: 'wc-weeks' }, b.weeks.map((w) => el('div', { class: `wc-week ${w.n === wk ? 'now' : ''}` }, el('small', {}, tr({ fr: `Semaine ${w.n}`, en: `Week ${w.n}` })), el('div', { class: 'wc-words' }, w.words.map(word))))),
    el('p', { class: 'wc-rule' }, '💡 ', b.rule),
    el('div', { class: 'wc-foot' },
      el('span', {}, '🔤 ', tr({ fr: 'Sons', en: 'Sounds' }), ' : ', b.sounds.map((x) => `« ${x.label} »`).join(' · ')),
      el('span', {}, '🏃 ', tr({ fr: 'Verbe', en: 'Verb' }), ` « ${b.verb} » : `, b.conj.join(', '))),
  );
}

// ---------------- Mes erreurs: wrong answers come back after 1, 3, 7, 14 days ----------------
const GAPS = [1, 3, 7, 14];
const dayPlus = (n) => { const d = new Date(Date.now() + n * 864e5); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const mistakes = () => (store.mistakes ??= []);
const dueMistakes = () => mistakes().filter((m) => m.due <= today() && unitById(m.unit));
function noteMistake(q, u, level) {
  if (!u || !q?.key || !units[u.subject.id]?.includes(u)) return;
  const list = mistakes();
  const old = list.find((m) => m.unit === u.id && m.q.key === q.key);
  if (old) { old.box = 0; old.due = dayPlus(1); old.q = q; return; }
  list.push({ unit: u.id, level, q, box: 0, due: dayPlus(1), added: today() });
  if (list.length > 250) list.splice(0, list.length - 250);
}
function reviewDone(m, s) {
  const list = mistakes();
  if (s >= 1) {
    m.box++;
    if (m.box >= GAPS.length) { list.splice(list.indexOf(m), 1); bump('mastered'); return 'learned'; }
    m.due = dayPlus(GAPS[m.box]);
  } else { m.box = 0; m.due = dayPlus(1); }
  return null;
}
// Suggested level for a unit: the next level once the current one has ≥ 2 stars.
function suggestedLevel(u) {
  let l = 1;
  while (l < 3 && (levelStats(u.id, l)?.stars ?? 0) >= 2) l++;
  return l;
}

// Difficulty picker used by sheets.
function diffPicker(key, onChange, suggest = 0) {
  let cur = store.pick[key] || suggest || 1;
  const seg = el('div', { class: 'diff-seg' });
  const draw = () => {
    seg.innerHTML = '';
    for (const l of [1, 2, 3]) seg.append(el('button', { class: `${DIFF_COL[l]} ${cur === l ? 'on' : ''}`, onclick: () => { sfx('tap'); cur = l; store.pick[key] = l; save(); draw(); onChange?.(l); } }, t('diff' + l), suggest === l ? el('small', { class: 'sugg' }, '⭐ ', t('suggested')) : null));
  };
  draw();
  return { node: seg, get: () => cur };
}

function modeCard(icon, title, sub, cls, fn) {
  return el('button', { class: `mode-card ${cls}`, onclick: () => { sfx('tap'); fn(); } },
    el('span', { class: 'mode-i' }, icon), el('span', { class: 'mode-t' }, title), el('span', { class: 'mode-s' }, sub));
}

function openUnit(u, sec) {
  zoneOf(u.subject);
  const box = el('div', { class: 'modes' });
  let sh;
  const fill = (l) => {
    box.innerHTML = '';
    const st = levelStats(u.id, l);
    const back = () => section(u.subject, sec.id);
    box.append(
      modeCard('📝', t('practice'), [`${perSession()} `, t('questions'), ` · ${starsTxt(st?.stars ?? 0)}`], 'practice', () => { sh.close(); play({ mode: 'practice', unit: u, level: l, back }); }),
      modeCard('⚡', t('eclair'), ['60', tr(SEC), ' · ', t('record'), ` ${record(`${u.id}|${l}|eclair`)}`], 'eclair', () => { sh.close(); play({ mode: 'eclair', unit: u, level: l, back }); }),
      modeCard('🎈', t('ballons'), ['❤️❤️❤️ · ', t('record'), ` ${record(`${u.id}|${l}|ballons`)}`], 'ballons', () => { sh.close(); play({ mode: 'ballons', unit: u, level: l, back }); }),
    );
  };
  const dp = diffPicker(u.id, fill, suggestedLevel(u));
  sh = sheet(
    el('div', { class: 'sheet-head' }, el('span', { class: 'sheet-icon' }, u.icon), el('div', {}, el('h2', {}, tr(u.title)), el('small', {}, ZONES[u.subject.id] ? '' : u.pfeq || ''))),
    dp.node, box);
  fill(dp.get());
}

function openBoss(s, sec) {
  zoneOf(s);
  const key = `${s.id}-${sec.id}`;
  const dp = diffPicker(key);
  const sh = sheet(
    el('div', { class: 'sheet-head' }, el('span', { class: 'sheet-icon boss-big' }, sec.boss), el('div', {}, el('h2', {}, t('guardian'), ' · ', tr(sec.t)), el('small', {}, t('bossRule')))),
    dp.node,
    el('div', { class: 'modes one' }, modeCard('⚔️', t('fight'), store.trophies[key] ? ['🏆 ', t('diff' + store.trophies[key])] : t('bossSub'), 'boss',
      () => { sh.close(); play({ mode: 'boss', pool: sec.units, level: dp.get(), sec, back: () => section(s, sec.id) }); })),
  );
}

function quizHub(s) {
  zoneOf(s);
  const key = `${s.id}-mix`;
  const box = el('div', { class: 'modes' });
  const back = () => quizHub(s);
  const fill = (l) => {
    box.innerHTML = '';
    box.append(
      modeCard('⚡', t('eclairMix'), ['60', tr(SEC), ' · ', t('record'), ` ${record(`${key}|${l}|eclair`)}`], 'eclair', () => play({ mode: 'eclair', pool: units[s.id], level: l, key, back })),
      modeCard('⏱️', t('marathon'), [t('marathonSub'), ' · ', t('record'), ` ${record(`${key}|${l}|marathon`)}`], 'practice', () => play({ mode: 'marathon', pool: units[s.id], level: l, key, back })),
      ...sectionsOf(s).filter((x) => x.units.length).map((x) => modeCard(x.icon, ['⚡ ', tr(x.t)], ['60', tr(SEC), ' · ', t('record'), ` ${record(`${s.id}-${x.id}|${l}|eclair`)}`], 'eclair',
        () => play({ mode: 'eclair', pool: x.units, level: l, key: `${s.id}-${x.id}`, back }))),
    );
  };
  const dp = diffPicker(key, fill);
  screen(`hub ${s.color}`,
    el('header', { class: 'bar' }, backBtn(() => subject(s)), el('h1', {}, '⚡ ', t('quiz'), ' · ', t(s.id)), wallet()),
    el('p', { class: 'hub-intro' }, t('quizIntro')), dp.node, box);
  fill(dp.get());
}

function gamesHub(s) {
  zoneOf(s);
  const key = `${s.id}-mix`;
  const box = el('div', { class: 'modes' });
  const back = () => gamesHub(s);
  const fill = (l) => {
    box.innerHTML = '';
    box.append(
      modeCard('🎈', t('ballons'), ['❤️❤️❤️ · ', t('record'), ` ${record(`${key}|${l}|ballons`)}`], 'ballons', () => play({ mode: 'ballons', pool: units[s.id], level: l, key, back })),
      modeCard('🃏', t('memory'), [t('memorySub'), ' · ', t('record'), ' ', ...(record(`${s.id}|${l}|memory`) ? [String(record(`${s.id}|${l}|memory`)), tr(SEC)] : ['–'])], 'memory', () => memory(s, l, back)),
    );
  };
  const dp = diffPicker(key, fill);
  screen(`hub ${s.color}`,
    el('header', { class: 'bar' }, backBtn(() => subject(s)), el('h1', {}, '🎮 ', t('gamesHub'), ' · ', t(s.id)), wallet()),
    dp.node, box);
  fill(dp.get());
}

async function talkInfo() {
  const s = SUBJECTS.find((x) => x.id === 'anglais');
  (await import('./talk.js')).talkHome(() => section(s, 'talk'), 'en');
}

// ---------------- Play: practice · daily · eclair · ballons · marathon · boss ----------------
// opts: { mode, unit?, pool?, level, key?, sec?, back }
async function play(opts) {
  unlockAudio();
  const { mode } = opts;
  if (opts.unit && mode !== 'daily') { store.resume = { t: 'play', mode, unit: opts.unit.id, level: opts.level || 1, label: appLang(() => `${tr(opts.unit.title)} · ${t('diff' + (opts.level || 1))}`), icon: opts.unit.icon }; save(); }
  const R = makeRng();
  let level = opts.level || 1;
  const pool = opts.pool || (opts.unit ? [opts.unit] : []);
  const recKey = opts.key ? `${opts.key}|${level}|${mode}` : opts.unit ? `${opts.unit.id}|${level}|${mode}` : null;
  const back = opts.back || home;
  // mixed sessions (« Mes erreurs », défi du jour) switch language per question; the others stay in their subject's zone
  const mixed = mode === 'review' || mode === 'daily';
  if (mixed) setZone(null); else zonePool(pool);

  // question supply
  let fixed = null;
  if (mode === 'practice') fixed = opts.unit.session ? opts.unit.session(level, R).map((q) => ({ q, unit: opts.unit })) : buildFixed([{ unit: opts.unit, level, n: perSession() }], R);
  let reviewItems = null;
  if (mode === 'review') {
    reviewItems = R.shuffle(dueMistakes()).slice(0, Math.max(perSession(), 8));
    fixed = reviewItems.map((m) => ({ q: m.q, unit: unitById(m.unit), m }));
    if (!fixed.length) return home();
  }
  if (mode === 'daily') {
    const plan = SUBJECTS.flatMap((s) => R.sample(units[s.id], Math.min(3, units[s.id].length)).map((u) => ({ unit: u, level: Math.max(1, ...[1, 2, 3].filter((l) => (levelStats(u.id, l - 1)?.stars ?? (l === 1 ? 3 : 0)) >= 2)), n: 1 })));
    fixed = buildFixed(R.shuffle(plan), R);
  }
  if (mode === 'boss') fixed = buildFixed(R.shuffle(pool.map((u) => ({ unit: u, level, n: 1 }))).concat(R.shuffle(pool.map((u) => ({ unit: u, level, n: 1 })))).slice(0, 12).concat(pool.map((u) => ({ unit: u, level, n: 1 }))).slice(0, Math.max(12, pool.length)), R);
  if (mode === 'marathon') fixed = buildFixed(R.shuffle(pool).slice(0, 20).map((u) => ({ unit: u, level, n: 1 })).concat(Array.from({ length: Math.max(0, 20 - pool.length) }, () => ({ unit: R.pick(pool), level, n: 1 }))), R);
  const recent = [];
  const nextQ = (i) => {
    if (fixed) return fixed[i] || null;
    const u = R.pick(pool);
    let q, tries = 0;
    do { q = u.generate(level, R); } while (recent.includes(q.key) && ++tries < 30);
    recent.push(q.key); if (recent.length > 40) recent.shift();
    return { q, unit: u };
  };

  const accent = mode === 'daily' || mode === 'review' ? 'orange' : (opts.unit || pool[0])?.subject.color || 'blue';
  const qRoot = el('div', { class: 'q' });
  const bubble = el('div', { class: 'owl-bubble' });
  const nextBtn = el('button', { class: 'btn next hidden' }, el('span', {}, t('next')), ' ➜');
  const owlNode = owl('mini');
  const hud = el('div', { class: 'game-hud' });
  let quit = false;
  const titleOf = () => mode === 'review' ? ['📕 ', t('review')] : mode === 'daily' ? ['🌞 ', t('daily')] : mode === 'boss' ? [`${opts.sec.boss} `, t('guardian')] : [`${opts.unit ? opts.unit.icon : { eclair: '⚡', ballons: '🎈', marathon: '⏱️' }[mode]} `, t('diff' + level)];
  const barTitle = el('span', { class: 'bar-title' }, titleOf());
  screen(`session ${accent} mode-${mode}`,
    el('header', { class: 'bar' },
      el('button', { class: 'round back', onclick: () => { quit = true; clearInterval(timer); stopSpeech(); back(); } }, '✕'),
      hud,
      barTitle),
    qRoot,
    el('div', { class: 'owl-corner' }, bubble, owlNode),
    el('div', { class: 'next-wrap' }, nextBtn),
  );
  const say = (txt, cls) => {
    setText(bubble, txt); bubble.className = `owl-bubble show ${cls}`;
    owlNode.classList.remove('hop', 'tilt'); void owlNode.offsetWidth;
    owlNode.classList.add(cls === 'good' ? 'hop' : 'tilt');
  };

  // --- HUD per mode ---
  let combo = 0, bestCombo = 0, score = 0, correct = 0, answered = 0, lives = 3, hp = 100, timeLeft = 60, timer = null, api = null;
  const comboEl = el('span', { class: 'combo' });
  const showCombo = () => { comboEl.textContent = combo >= 2 ? `🔥 ×${combo}` : ''; comboEl.classList.remove('bump'); void comboEl.offsetWidth; if (combo >= 2) comboEl.classList.add('bump'); };
  let dots, scoreEl, timeBar, livesEl, hpBar;
  const rec = recKey ? record(recKey) : 0;
  if (fixed && mode !== 'boss') {
    dots = el('div', { class: 'dots' }, fixed.map(() => el('span', { class: 'dot' })));
    hud.append(dots, comboEl);
  } else if (mode === 'eclair') {
    scoreEl = el('span', { class: 'score' }, '0');
    timeBar = el('div', { class: 'time-bar' }, el('span'));
    hud.append(el('div', { class: 'hud-col' }, timeBar, el('div', { class: 'hud-row' }, el('span', { class: 'lbl' }, '⚡'), scoreEl, el('span', { class: 'rec' }, `🏆 ${rec}`), comboEl)));
  } else if (mode === 'ballons') {
    scoreEl = el('span', { class: 'score' }, '0');
    livesEl = el('span', { class: 'lives' }, '❤️❤️❤️');
    timeBar = el('div', { class: 'time-bar fuse' }, el('span'));
    hud.append(el('div', { class: 'hud-col' }, timeBar, el('div', { class: 'hud-row' }, livesEl, el('span', { class: 'lbl' }, '🎈'), scoreEl, el('span', { class: 'rec' }, `🏆 ${rec}`), comboEl)));
  } else if (mode === 'boss') {
    hpBar = el('div', { class: 'hp-bar' }, el('span'));
    livesEl = el('span', { class: 'lives' }, '❤️❤️❤️');
    hud.append(el('div', { class: 'hud-col' }, el('div', { class: 'hud-row' }, el('span', { class: 'boss-mini' }, opts.sec.boss), hpBar), el('div', { class: 'hud-row' }, livesEl, comboEl)));
  }
  const setLives = () => { livesEl.textContent = '❤️'.repeat(lives) + '🤍'.repeat(3 - lives); };

  const t0 = Date.now();
  let ended = false;
  if (mode === 'eclair') {
    const end = Date.now() + 60000;
    timer = setInterval(() => {
      timeLeft = Math.max(0, (end - Date.now()) / 1000);
      timeBar.firstChild.style.width = `${(timeLeft / 60) * 100}%`;
      timeBar.classList.toggle('low', timeLeft < 10);
      if (timeLeft <= 0) { clearInterval(timer); ended = true; api?.fail(); }
    }, 100);
  }

  for (let i = 0; !quit && !ended; i++) {
    const item = nextQ(i);
    if (!item) break;
    const { q, unit: u } = item;
    setContentLang(u.subject.speech);
    if (mixed) { zoneOf(u.subject); barTitle.replaceChildren(el('span', {}, titleOf())); nextBtn.firstChild.replaceChildren(el('span', {}, t('next'))); }
    dots?.children[i]?.classList.add('now');
    bubble.className = 'owl-bubble';
    const praiseLang = u.subject.praise || lang();
    let fuse = null;
    if (mode === 'ballons') {
      const secs = [0, 15, 13, 11][level] + (String(tr(q.stimulus?.text ?? '')).length > 60 ? 12 : 0) + (q.type !== 'choice' ? 6 : 0);
      const stop = Date.now() + secs * 1000;
      timeBar.classList.remove('low');
      fuse = setInterval(() => {
        const left = Math.max(0, (stop - Date.now()) / 1000);
        timeBar.firstChild.style.width = `${(left / secs) * 100}%`;
        timeBar.classList.toggle('low', left < 4);
        if (left <= 0) { clearInterval(fuse); api?.fail(); }
      }, 100);
    }
    const quick = mode === 'eclair' || mode === 'ballons';
    const s = await runQuestion(q, qRoot, R, {
      tries: quick ? 1 : 2,
      fast: quick,
      style: mode === 'ballons' ? 'balloons' : undefined,
      bind: (a) => { api = a; },
      praise: () => { const p = STRINGS.great[praiseLang]; const w = p[R.int(0, p.length - 1)]; say(w, 'good'); if (!quick) speak({ text: w, lang: { fr: 'fr-CA', en: 'en-CA', zh: 'zh-CN' }[praiseLang] || 'en-CA' }); },
      retry: () => say(t('tryAgain'), 'bad'),
      reveal: () => say(t('answerWas'), 'bad'),
      waitNext: (cb) => {
        if (quick) { setTimeout(cb, 1100); return; }
        nextBtn.classList.remove('hidden'); nextBtn.onclick = () => { sfx('tap'); nextBtn.classList.add('hidden'); cb(); };
      },
    });
    clearInterval(fuse);
    api = null;
    if (quit) return;
    answered++;
    // --- mistakes notebook ---
    if (mode === 'review') { if (reviewDone(fixed[i].m, s) === 'learned') toast('📗', t('learnedIt')); }
    else if (s < 1) noteMistake(q, u, level);
    // --- scoring ---
    const where = qRoot.querySelector('.q-prompt')?.getBoundingClientRect() || { left: innerWidth / 2, top: 120, width: 0 };
    const fx = where.left + where.width / 2, fy = where.top + 30;
    if (s >= 1) { combo++; correct++; } else if (s > 0) { combo = 0; correct += 0.5; } else combo = 0;
    bestCombo = Math.max(bestCombo, combo);
    showCombo();
    if (s >= 1 && combo > 0 && combo % 5 === 0) { confetti(36, { x: fx, y: fy }); sfx('star'); }
    if (fixed && mode !== 'boss') {
      score += s;
      dots.children[i]?.classList.remove('now');
      dots.children[i]?.classList.add(s === 1 ? 'good' : s > 0 ? 'half' : 'bad');
      if (s >= 0.5) floatText(`+1 ${COIN}`, fx, fy, 'gold');
    } else if (mode === 'eclair') {
      if (s >= 1) {
        const mult = Math.min(4, 1 + Math.floor((combo - 1) / 3));
        const pts = 10 * mult + [0, 0, 2, 5][level];
        score += pts;
        floatText(`+${pts}${mult > 1 ? ` ×${mult}` : ''}`, fx, fy, mult > 1 ? 'hot' : '');
        scoreEl.textContent = score;
        if (rec && score > rec && score - pts <= rec) { toast('🏆', t('newRecord')); }
      }
    } else if (mode === 'ballons') {
      if (s >= 1) { score++; scoreEl.textContent = score; floatText('🎈 +1', fx, fy); }
      else { lives--; setLives(); owlNode.classList.add('tilt'); if (lives <= 0) break; }
    } else if (mode === 'boss') {
      if (s > 0) {
        const dmg = s >= 1 ? 100 / Math.max(8, Math.round(fixed.length * 0.7)) : 4;
        hp = Math.max(0, hp - dmg);
        hpBar.firstChild.style.width = `${hp}%`;
        hud.querySelector('.boss-mini').classList.remove('hit'); void hud.offsetWidth; hud.querySelector('.boss-mini').classList.add('hit');
        floatText(`💥 −${Math.round(dmg)}`, fx, fy, 'hot');
        if (hp <= 0) break;
      } else { lives--; setLives(); if (lives <= 0) break; }
      score += s;
    }
  }
  clearInterval(timer);
  if (quit) return;
  if (mixed) setZone(null);
  finishGame({ ...opts, level, mode, recKey, score, correct, answered, total: fixed ? fixed.length : answered, bestCombo, ms: Date.now() - t0, won: mode === 'boss' ? hp <= 0 : null, R });
}

function buildFixed(plan, R) {
  const out = [];
  for (const p of plan) {
    const seen = new Set();
    for (let i = 0; i < p.n; i++) {
      let q, tries = 0;
      do { q = p.unit.generate(p.level, R); } while (seen.has(q.key) && ++tries < 40);
      seen.add(q.key);
      out.push({ q, unit: p.unit });
    }
  }
  return out;
}

// Bookkeeping shared by every mode, then the results screen.
function finishGame(g) {
  const { mode, level, recKey, score, correct, answered, total, bestCombo, ms, won } = g;
  let coins = 0, stars = 0, newRecord = false, sticker = null;
  touchStreak();
  bump('games');
  bump('correct', Math.floor(correct));
  maxStat('bestCombo', bestCombo);
  progress('correct', Math.floor(correct));
  progress('combo', bestCombo, { set: true });
  const subj = (g.unit || g.pool?.[0])?.subject;
  if (subj) progress(subj.id);
  if (mode === 'practice' && g.unit) planDone(g.unit.id, level);
  if (mode === 'review') {
    store.log.push({ d: today(), unit: 'review', level: 0, mode, score, total, ms });
    coins = Math.floor(correct) * 2;
    progress('stars', 0);
  } else if (mode === 'practice' || mode === 'daily') {
    stars = recordSession(mode === 'daily' ? null : g.unit.id, mode === 'daily' ? 0 : level, score, total, ms);
    coins = Math.floor(correct) + stars * 2;
    progress('stars', stars);
    if (stars === 3) bump('perfect');
    if (stars >= 1 && level === 3) bump('hardWins');
    if (stars >= 1 || mode === 'daily') {
      const owned = new Set(store.stickers);
      const fresh = STICKERS.filter((x) => !owned.has(x));
      sticker = (g.R).pick(fresh.length ? fresh : STICKERS);
      store.stickers.push(sticker);
    }
    if (mode === 'daily') { store.daily = { date: today(), done: true }; coins += 10; }
  } else {
    store.log.push({ d: today(), unit: g.unit?.id || g.key || 'mix', level, mode, score, total, ms });
    if (mode === 'eclair') { coins = Math.round(score / 10); maxStat('bestEclair', score); progress('eclair'); }
    if (mode === 'ballons') { coins = score; maxStat('bestBallons', score); progress('ballons'); }
    if (mode === 'marathon') { coins = Math.floor(correct) + 5; stars = correct / total >= 0.9 ? 3 : correct / total >= 0.7 ? 2 : correct / total >= 0.5 ? 1 : 0; progress('stars', stars); }
    if (mode === 'boss') {
      const key = `${g.sec.subject.id}-${g.sec.id}`;
      if (won) { coins = 30 + level * 10; bump('bossWins'); store.trophies[key] = Math.max(store.trophies[key] || 0, level); stars = 3; }
      else coins = 5;
    }
  }
  const recScore = mode === 'marathon' ? Math.floor(correct) : score;
  if (recKey && ['eclair', 'ballons', 'marathon'].includes(mode) && recScore > 0) {
    const old = store.records[recKey] || 0;
    if (recScore > old) { store.records[recKey] = recScore; if (old > 0) { newRecord = true; coins += 10; bump('records'); progress('record'); } }
  }
  // 3 subjects played today
  const todays = new Set(store.log.filter((x) => x.d === today()).map((x) => unitById(x.unit)?.subject.id).filter(Boolean));
  if (todays.size >= 3) maxStat('allSubjectsDay', 1);
  addCoins(coins);
  const fresh = checkBadges();
  save();
  results({ ...g, coins, stars, newRecord, sticker, fresh, recScore });
}

// ---------------- Results ----------------
async function results(g) {
  const { mode, level, stars, coins, newRecord, sticker, fresh, score, total, correct, bestCombo, won, recScore } = g;
  const accent = mode === 'daily' ? 'orange' : (g.unit || g.pool?.[0])?.subject.color || 'blue';
  const starRow = el('div', { class: 'res-stars' }, [0, 1, 2].map(() => el('span', { class: 'rs' }, '★')));
  let head, big;
  if (mode === 'eclair') { head = newRecord ? t('newRecord') : tr(STRINGS.endMsg[score >= 100 ? 3 : score >= 50 ? 2 : 1]); big = el('div', { class: 'res-score' }, `⚡ ${score}`); }
  else if (mode === 'ballons') { head = newRecord ? t('newRecord') : tr(STRINGS.endMsg[score >= 10 ? 3 : score >= 5 ? 2 : 1]); big = el('div', { class: 'res-score' }, `🎈 ${score}`); }
  else if (mode === 'boss') { head = won ? t('bossWon') : t('bossLost'); big = el('div', { class: `res-boss ${won ? 'won' : ''}` }, g.sec.boss, won ? ' 🏆' : ''); }
  else if (mode === 'review') { const r = total ? correct / total : 0; head = tr(STRINGS.endMsg[r >= 0.9 ? 3 : r >= 0.6 ? 2 : 1]); big = el('div', { class: 'res-score' }, `📕 ${Math.floor(correct)} / ${total}`); }
  else { head = tr(STRINGS.endMsg[mode === 'daily' ? 3 : stars]); big = mode === 'daily' ? el('div', { class: 'res-score' }, `${Math.round(score * 10) / 10} / ${total}`) : starRow; }
  const coinEl = el('div', { class: 'res-coins' }, `+0 ${COIN}`);
  const canHarder = mode === 'practice' && level < 3;
  const tip = mode === 'practice' && stars === 3 && level < 3 ? t('tipUp') : mode === 'practice' && stars === 0 && level > 1 ? t('tipDown') : null;
  const canEasier = mode === 'practice' && stars === 0 && level > 1;
  const dueN = dueMistakes().length;
  screen(`results ${accent}`,
    owl('big hop-loop'),
    el('h1', {}, head),
    big,
    newRecord ? el('div', { class: 'res-record' }, '🏆 ', t('record'), ` : ${recScore}`) : null,
    el('div', { class: 'res-row' }, coinEl, bestCombo >= 3 ? el('div', { class: 'res-combo' }, `🔥 ×${bestCombo}`) : null),
    sticker ? el('div', { class: 'sticker-reveal' }, el('div', { class: 'sticker-big' }, sticker), el('div', {}, t('newSticker'))) : null,
    tip ? el('div', { class: 'res-tip' }, tip) : null,
    el('div', { class: 'res-btns' },
      el('button', { class: 'btn ghost', onclick: () => (g.back || home)() }, '‹ ', t('back')),
      mode !== 'daily' ? el('button', { class: 'btn', onclick: () => play(g) }, '↻ ', t('replay')) : null,
      canEasier ? el('button', { class: 'btn primary', onclick: () => play({ ...g, level: level - 1 }) }, '⬇ ', t('easier')) : null,
      canHarder && !canEasier ? el('button', { class: `btn primary ${stars === 3 ? 'pulse' : ''}`, onclick: () => play({ ...g, level: level + 1 }) }, t('nextLevel'), ' ➜') : null,
      mode === 'review' && dueN ? el('button', { class: 'btn primary', onclick: () => play({ mode: 'review' }) }, `📕 ${dueN}`, ' ➜') : null,
    ),
  );
  speak({ text: { fr: head, en: head } });
  if (newRecord || won || stars === 3) setTimeout(() => confetti(60), 300);
  for (let i = 0; i < 3 && mode === 'practice'; i++) {
    await wait(350);
    if (i < stars) { starRow.children[i]?.classList.add('on'); sfx('star'); }
  }
  for (let k = 1; k <= coins; k += Math.max(1, Math.ceil(coins / 20))) { coinEl.textContent = `+${k} ${COIN}`; await wait(40); }
  coinEl.textContent = `+${coins} ${COIN}`;
  if (sticker) { await wait(300); sfx('win'); }
  showBadges(fresh);
}

// ---------------- Memory (flip cards) ----------------
function memory(s, level, back) {
  zoneOf(s);
  unlockAudio();
  const R = makeRng();
  const n = [0, 6, 8, 10][level];
  const pairs = s.id === 'math' ? mathPairs(level, n, R) : wordPairs({ anglais: 'en', chinois: 'zh' }[s.id] || 'fr', n, R);
  const cards = R.shuffle(pairs.flatMap((p, i) => [{ i, f: p.a, say: p.say }, { i, f: p.b, say: p.say }]));
  let open = [], found = 0, flips = 0, lock = false;
  const t0 = Date.now();
  const sec = String(tr(SEC));
  const clock = el('span', { class: 'score' }, `0${sec}`);
  const timer = setInterval(() => { clock.textContent = `${Math.round((Date.now() - t0) / 1000)}${sec}`; }, 500);
  const grid = el('div', { class: `memory n${cards.length}` });
  for (const c of cards) {
    const b = el('button', { class: 'mcard' }, el('span', { class: 'm-back' }, '🦉'), el('span', { class: 'm-front' }, face(c.f)));
    b.onclick = async () => {
      if (lock || b.classList.contains('up')) return;
      sfx('tap');
      b.classList.add('up');
      if (c.say && (c.f.text || c.f.hz)) speak(c.say);
      open.push({ b, c });
      if (open.length < 2) return;
      flips++;
      const [x, y] = open; open = [];
      if (x.c.i === y.c.i) {
        found++; sfx('good');
        x.b.classList.add('got'); y.b.classList.add('got');
        if (x.c.say) speak(x.c.say);
        const r = y.b.getBoundingClientRect(); confetti(14, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
        if (found === pairs.length) {
          clearInterval(timer);
          const secs = Math.round((Date.now() - t0) / 1000);
          await wait(700);
          const key = `${s.id}|${level}|memory`, old = store.records[key];
          const newRecord = !old || secs < old;
          if (newRecord) store.records[key] = secs;
          if (newRecord && old) { bump('records'); progress('record'); addCoins(10); }
          touchStreak(); bump('games'); progress(s.id); progress('correct', pairs.length);
          addCoins(pairs.length);
          const fresh = checkBadges(); save();
          const sh = sheet(el('div', { class: 'memory-done' }, owl('big hop-loop'), el('h2', {}, newRecord && old ? t('newRecord') : t('bravoAll')),
            el('div', { class: 'res-score' }, `⏱️ ${secs}`, tr(SEC), ` · ${flips} `, t('tries')), el('div', { class: 'res-coins' }, `+${pairs.length + (newRecord && old ? 10 : 0)} ${COIN}`),
            el('div', { class: 'res-btns' }, el('button', { class: 'btn ghost', onclick: () => { sh.close(); back(); } }, '‹ ', t('back')), el('button', { class: 'btn primary', onclick: () => { sh.close(); memory(s, level, back); } }, '↻ ', t('replay')))));
          confetti(50); sfx('win'); showBadges(fresh);
        }
      } else {
        lock = true; sfx('bad');
        await wait(900);
        x.b.classList.remove('up'); y.b.classList.remove('up');
        lock = false;
      }
    };
    grid.append(b);
  }
  screen(`memory-screen ${s.color}`,
    el('header', { class: 'bar' }, el('button', { class: 'round back', onclick: () => { clearInterval(timer); back(); } }, '✕'),
      el('h1', {}, '🃏 ', t('memory')), clock),
    grid);
}

// ---------------- Shop ----------------
function shop(preview = null) {
  const owlBox = el('div', { class: 'shop-owl' }, dressedOwl('big bob', preview ? { [preview.slot]: preview.id } : {}));
  screen('shop',
    el('header', { class: 'bar' }, backBtn(home), el('h1', {}, '🛍️ ', t('shop')), wallet()),
    el('div', { class: 'shop-body' },
      owlBox,
      el('div', { class: 'shop-list' }, Object.entries(SLOTS).map(([slot, name]) => el('section', {},
        el('h3', {}, tr(name)),
        el('div', { class: 'shop-items' }, SHOP.filter((x) => x.slot === slot).map((it) => {
          const own = store.owned.includes(it.id), worn = store.wear[slot] === it.id, can = store.coins >= it.price;
          return el('button', {
            class: `item ${own ? 'own' : ''} ${worn ? 'worn' : ''} ${!own && !can ? 'poor' : ''}`,
            onclick: (e) => {
              if (own) { sfx('tap'); toggleWear(it.id); shop(); return; }
              if (!can) { sfx('bad'); shop(it); return; }
              buy(it.id); sfx('win'); confetti(30, { x: e.clientX, y: e.clientY }); checkBadges(); save(); shop();
            },
          }, el('span', { class: 'item-e' }, it.e), el('span', { class: 'item-p' }, own ? (worn ? '✔' : t('wear')) : `${it.price} ${COIN}`));
        })))))),
  );
}

// ---------------- Badges ----------------
function badges() {
  screen('badges-screen',
    el('header', { class: 'bar' }, backBtn(home), el('h1', {}, '🏅 ', t('badges')), el('span', { class: 'bar-stars' }, `${store.badges.length} / ${BADGES.length}`)),
    el('div', { class: 'badge-grid' }, BADGES.map((b) => {
      const got = store.badges.includes(b.id);
      return el('div', { class: `badge ${got ? 'got' : ''}` }, el('span', { class: 'badge-i' }, b.icon), el('b', {}, tr(b.t)), el('small', {}, tr(b.d)));
    })),
  );
}

// ---------------- Album ----------------
function album() {
  const counts = {};
  for (const s of store.stickers) counts[s] = (counts[s] || 0) + 1;
  screen('album',
    el('header', { class: 'bar' }, backBtn(home), el('h1', {}, '📒 ', t('album')), el('span', { class: 'bar-stars' }, `${Object.keys(counts).length} / ${STICKERS.length}`)),
    el('div', { class: 'stickers' }, STICKERS.map((s) => el('div', { class: `stk ${counts[s] ? 'have' : ''}` },
      counts[s] ? s : '?', counts[s] > 1 ? el('span', { class: 'stk-n' }, `×${counts[s]}`) : null))),
  );
}

// ---------------- Parents ----------------
function parentGate() {
  const a = 6 + Math.floor(Math.random() * 4), b = 6 + Math.floor(Math.random() * 4);
  const input = el('input', { type: 'number', inputmode: 'numeric', class: 'gate-in' });
  const msg = el('p', { class: 'gate-msg' });
  const go = () => { if (Number(input.value) === a * b) parents(); else { msg.textContent = `✗ ${input.value} — ${t('gate')} ${a} × ${b}?`; input.value = ''; input.classList.remove('shake'); void input.offsetWidth; input.classList.add('shake'); input.focus(); } };
  screen('gate',
    el('header', { class: 'bar' }, backBtn(home), el('h1', {}, '⚙️ ', t('parents'))),
    el('div', { class: 'gate-box' }, el('p', {}, `${t('gate')} ${a} × ${b}?`), input, el('button', { class: 'btn primary', onclick: go }, 'OK'), msg),
  );
  input.addEventListener('keydown', (e) => e.key === 'Enter' && go());
  input.focus();
}

function parents() {
  const mins = (d) => Math.round(store.log.filter((x) => x.d === d).reduce((a, x) => a + (x.ms || 0), 0) / 60000);
  const week = [...Array(7)].map((_, i) => { const d = new Date(Date.now() - (6 - i) * 864e5); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; });
  const toggle = (k) => el('button', { class: `tog ${store.settings[k] ? 'on' : ''}`, onclick: () => { store.settings[k] = !store.settings[k]; save(); parents(); } }, store.settings[k] ? t('on') : t('off'));
  const nameIn = el('input', { value: store.settings.name, class: 'name-in', maxlength: 20 });
  nameIn.addEventListener('change', () => { store.settings.name = nameIn.value.trim(); save(); });
  screen('parents',
    el('header', { class: 'bar' }, backBtn(home), el('h1', {}, '⚙️ ', t('parents'))),
    el('section', { class: 'card-p' },
      el('h2', {}, t('settings')),
      el('label', { class: 'row' }, el('span', {}, t('childName')), nameIn),
      el('div', { class: 'row' }, el('span', {}, t('uiLang')),
        el('div', { class: 'seg' }, ['fr', 'en'].map((l) => el('button', { class: lang() === l ? 'on' : '', onclick: () => { store.settings.lang = l; save(); parents(); } }, l === 'fr' ? 'Français' : 'English')))),
      el('div', { class: 'row' }, el('span', {}, t('voice')), toggle('voice')),
      el('div', { class: 'row' }, el('span', {}, t('speed')),
        el('div', { class: 'seg' }, [[0.75, '🐢'], [0.9, '🙂'], [1.05, '🐇']].map(([r, ic]) => el('button', { class: store.settings.rate === r ? 'on' : '', onclick: () => { store.settings.rate = r; save(); speak({ text: { fr: 'Bonjour!', en: 'Hello!' } }); parents(); } }, ic)))),
      el('div', { class: 'row' }, el('span', {}, t('perSession')),
        el('div', { class: 'seg' }, [8, 12, 16].map((n) => el('button', { class: perSession() === n ? 'on' : '', onclick: () => { store.settings.perSession = n; save(); parents(); } }, String(n))))),
      el('div', { class: 'row' }, el('span', {}, t('sound')), toggle('sound')),
      el('div', { class: 'row' }, el('span', {}, '🐼 ', t('pinyin')), (() => { if (store.settings.pinyin === undefined) store.settings.pinyin = true; return toggle('pinyin'); })()),
      el('div', { class: 'row' }, el('span', {}, `${COIN} ${t('coinsP')}`), el('b', {}, String(store.coins))),
      el('div', { class: 'row' }, el('span', {}, '📅 ', tr({ fr: 'Semaine de la classe (cahier « Semaines »)', en: 'Class week (“Semaines” booklet)' }), el('br'),
        el('small', { class: 'hint' }, tr(units.francais.find((u) => u.id === blockForWeek(frWeek()).id)?.title ?? ''), ' · ', tr({ fr: '+1 chaque lundi', en: '+1 every Monday' }))),
        el('div', { class: 'seg' },
          el('button', { onclick: () => { setFrWeek(frWeek() - 1); parents(); } }, '−'),
          el('button', { class: 'on' }, String(frWeek())),
          el('button', { onclick: () => { setFrWeek(frWeek() + 1); parents(); } }, '+'))),
    ),
    el('section', { class: 'card-p' },
      el('h2', {}, '🎙️ ', t('voiceServer')),
      el('p', { class: 'hint' }, t('voiceServerHint')),
      el('label', { class: 'row' }, el('span', {}, 'URL'), (() => { const i = el('input', { class: 'name-in wide-in', value: store.settings.voiceUrl || '', placeholder: 'https://petithibou-voice.….workers.dev', autocapitalize: 'off', spellcheck: 'false' }); i.addEventListener('change', () => { store.settings.voiceUrl = i.value.trim(); save(); }); return i; })()),
      el('label', { class: 'row' }, el('span', {}, t('familyCode')), (() => { const i = el('input', { class: 'name-in', type: 'password', value: store.settings.voiceCode || '', autocapitalize: 'off', autocomplete: 'off' }); i.addEventListener('change', () => { store.settings.voiceCode = i.value.trim(); save(); }); return i; })()),
      el('div', { class: 'row' }, el('span', {}, t('talkLimit')),
        el('div', { class: 'seg' }, [10, 15, 20, 30].map((n) => el('button', { class: (store.settings.talkLimit ?? 15) === n ? 'on' : '', onclick: () => { store.settings.talkLimit = n; save(); parents(); } }, `${n}′`)))),
      el('div', { class: 'row' }, el('span', {}, t('readVoice')), toggle('cloudVoice')),
      el('p', { class: 'hint' }, t('installHint')),
    ),
    el('section', { class: 'card-p' },
      el('h2', {}, '📅 ', t('planTitle')),
      el('table', { class: 'prog plan-table' }, upcoming(14).map((p) => el('tr', { class: p.date === today() ? 'today' : '' },
        el('td', { class: 'pu' }, el('div', {}, new Date(`${p.date}T12:00`).toLocaleDateString(lang() === 'fr' ? 'fr-CA' : 'en-CA', { weekday: 'short', day: 'numeric', month: 'short' })), el('small', {}, `${p.icon} ${tr(p.t)} · ${p.done}/${p.blocks.length}`)),
        el('td', {}, p.blocks.map((b) => el('div', { class: 'plan-row' }, b.icon, ' ', planUnitTitle(b.target, p.subject), ` · ${b.min}′`))))))),
    el('section', { class: 'card-p' },
      el('h2', {}, t('progress'), ' · ', `${mins(today())} ${t('minutes')}`),
      el('div', { class: 'week' }, week.map((d) => { const m = mins(d); return el('div', { class: 'wk' }, el('div', { class: 'wk-bar', style: { height: `${Math.min(100, m * 3)}%` } }), el('span', {}, `${m}′`), el('small', {}, d.slice(8))); })),
      SUBJECTS.map((s) => el('div', { class: 'prog-subj' },
        el('h3', {}, s.icon, ' ', t(s.id)),
        el('table', { class: 'prog' }, units[s.id].map((u) => {
          const cells = [1, 2, 3].map((l) => {
            const st = levelStats(u.id, l);
            return el('td', { class: 'pc' }, st ? `${starsTxt(st.stars)} ${Math.round((st.correct / st.total) * 100)}%` : '–');
          });
          return el('tr', {}, el('td', { class: 'pu' }, el('div', {}, u.icon, ' ', tr(u.title)), el('small', {}, u.pfeq)), ...cells);
        })))),
    ),
    el('section', { class: 'card-p' },
      el('button', { class: 'btn danger', onclick: () => { if (confirm(t('resetConfirm'))) { import('./store.js').then((m) => { m.resetAll(); parents(); }); } } }, t('reset'))),
  );
}

// ---------------- boot ----------------
document.addEventListener('pointerdown', unlockAudio, { once: true });
document.addEventListener('gesturestart', (e) => e.preventDefault());
await loadSubjects();
if (store.daily.date !== today()) store.daily = { date: today(), done: false };
home();

if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('./sw.js');

// test hooks (used by tools/shot.mjs captures)
window.__hibou = { units, play, home, subject, section, parents, quizHub, gamesHub, memory, shop, badges, store, SUBJECTS, sectionsOf, openUnit, openBoss, refreshWallet };
