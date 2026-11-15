// English as a Second Language — companion to the school textbook "Catch, Grade 2" (Chenelière, 2nd ed.).
// Units k0 (Pre-Unit) … k8 (Unit 8) + k9 (Farewell review). All questions are original.
// Every unit is data-driven (vocabulary, sentence templates, dialogues, short readings) and built by build().
import { makeRng } from '../util.js';

const EN = 'en-CA';
const say = (text) => ({ text, lang: EN });

// ---------- instructions (bilingual) ----------
const P = {
  tap: { fr: 'Écoute. Touche la bonne image.', en: 'Listen. Tap the right picture.' },
  seeword: { fr: 'Lis le mot. Touche la bonne image.', en: 'Read the word. Tap the right picture.' },
  word: { fr: 'Qu\'est-ce que c\'est? Touche le mot.', en: 'What is this? Tap the word.' },
  yn: { fr: 'Écoute. Oui ou non?', en: 'Listen. Yes or no?' },
  order: { fr: 'Écoute. Remets les mots dans l\'ordre.', en: 'Listen. Put the words in order.' },
  spell: { fr: 'Écoute. Remets les lettres dans l\'ordre.', en: 'Listen. Put the letters in order.' },
  spell2: { fr: 'Écoute. Quelle est la bonne orthographe?', en: 'Listen. Which spelling is correct?' },
  match: { fr: 'Quelle phrase va avec l\'image?', en: 'Which sentence matches the picture?' },
  reply: { fr: 'Écoute. Que réponds-tu?', en: 'Listen. What do you say?' },
  ans: { fr: 'Écoute. Choisis la bonne réponse.', en: 'Listen. Choose the right answer.' },
  count: { fr: 'Compte. Combien y en a-t-il?', en: 'Count. How many?' },
  num: { fr: 'Écoute. Touche le bon nombre.', en: 'Listen. Tap the right number.' },
  colour: { fr: 'Écoute. Touche la bonne couleur.', en: 'Listen. Tap the right colour.' },
  colourW: { fr: 'Quelle est cette couleur? Touche le mot.', en: 'What colour is this? Tap the word.' },
  day: { fr: 'Écoute. Touche le bon jour.', en: 'Listen. Tap the right day.' },
  days: { fr: 'Remets les jours dans l\'ordre.', en: 'Put the days in order.' },
  dir: { fr: 'Écoute. Touche la bonne flèche.', en: 'Listen. Tap the right arrow.' },
};

// ---------- helpers ----------
const art = (w) => (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w;
const np = (x) => (x.f ? x.w : art(x.w)); // f: 'p' plural, 'x' mass noun, 'v' verb/adjective/other (no article)
const pic = (x) => (x.svg ? { svg: x.svg('#3b82f6') } : { emoji: x.e });
const TRUE = { text: 'True', emoji: '✅' };
const FALSE = { text: 'False', emoji: '❌' };
const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const COLS = [
  { w: 'red', e: '🔴', hex: '#d63031' }, { w: 'orange', e: '🟠', hex: '#e67e22' },
  { w: 'yellow', e: '🟡', hex: '#f1c40f' }, { w: 'green', e: '🟢', hex: '#27ae60' },
  { w: 'blue', e: '🔵', hex: '#2e86de' }, { w: 'purple', e: '🟣', hex: '#8e44ad' },
  { w: 'brown', e: '🟤', hex: '#8d5a2b' }, { w: 'black', e: '⚫', hex: '#2d3436' },
  { w: 'white', e: '⚪', hex: '#f5f6fa' }, { w: 'pink', e: '🩷', hex: '#fd79a8' },
];
const COUNTABLES = [['🍎', 'apples'], ['⭐', 'stars'], ['🐟', 'fish'], ['🎈', 'balloons'], ['🍪', 'cookies'], ['🌳', 'trees']];
// Wrong replies that fit no real question (only used when a dialogue has no explicit wrong answers).
const NEUTRAL = ['I am five years old.', 'My name is Sam.', 'It is a pencil.', 'He is a doctor.', 'The door is open.'];

// Classroom language shared by every unit: { s: what you hear, a: correct reply, w: wrong replies }
const COMMON = [
  { s: 'Thank you!', a: 'No problem.', w: ['Excuse me.', 'Hurry up!'] },
  { s: 'You want to ask your teacher a question. What do you say?', a: 'Excuse me!', w: ['Hurry up!', 'Goodbye!'] },
  { s: "Let's play a game!", a: 'Good idea!', w: ['Goodbye!', 'Excuse me!'] },
  { s: 'Are you finished?', a: 'Yes, I am finished.', w: ['It is a book.', 'Goodbye.'] },
  { s: 'Wait a minute, please.', a: 'OK, no problem.', w: ['Hooray!', 'Hello!'] },
  { s: 'Hurry up! It is time to go.', a: "I'm ready!", w: ['Hello, I am Sam.', 'It is a pencil.'] },
  { s: 'Can I have a turn, please?', a: 'Yes. Here you are.', w: ['I am five years old.', 'It is a pencil.'] },
  { s: 'Come here, please.', a: "OK, I'm coming!", w: ['Goodbye!', 'It is red.'] },
  { s: 'Good morning!', a: 'Good morning!', w: ['Good night!', 'Goodbye!'] },
  { s: 'Goodbye! See you tomorrow.', a: 'Goodbye!', w: ['Hello!', 'Good morning!'] },
  { s: 'You win! Hooray!', a: 'Thank you! Good game!', w: ['Excuse me.', 'Wait a minute.'] },
  { s: 'You do not know the answer. What can you do?', a: 'I ask for help.', w: ['I run away.', 'I say goodbye.'] },
  { s: 'Here is your pencil.', a: 'Thank you!', w: ['Goodbye!', 'Wait a minute.'] },
  { s: "I'm sorry. I broke your pencil.", a: 'No problem.', w: ['Hooray!', 'Excuse me.'] },
];

// Letter-level mistakes for "choose the correct spelling"
function misspell(w, R) {
  const L = w.split('');
  const c = new Set();
  for (let i = 0; i < L.length - 1; i++) {
    if (L[i] !== L[i + 1]) { const a = L.slice(); [a[i], a[i + 1]] = [a[i + 1], a[i]]; c.add(a.join('')); }
  }
  for (let i = 1; i < L.length; i++) c.add(L.slice(0, i).concat(L.slice(i + 1)).join(''));
  for (let i = 1; i < L.length; i++) c.add(L.slice(0, i + 1).concat(L[i], L.slice(i + 1)).join(''));
  const V = 'aeiou';
  L.forEach((ch, i) => {
    if (V.includes(ch.toLowerCase())) {
      const o = V[(V.indexOf(ch.toLowerCase()) + 1 + (i % 4)) % 5];
      c.add(L.slice(0, i).join('') + o + L.slice(i + 1).join(''));
    }
  });
  c.delete(w);
  return R.sample([...c], 2);
}

const hasDupWord = (tiles) => {
  const k = tiles.map((t) => t.toLowerCase().replace(/[^a-z']/g, ''));
  return new Set(k).size !== k.length;
};

// ---------- the generic unit builder ----------
function build(cfg) {
  const id = cfg.id;
  const K = (s) => id + ':' + s;
  const rows = cfg.vocab.map(([w, e, f, k]) => ({
    w, e: typeof e === 'object' ? 'svg:' + w : e, svg: typeof e === 'object' ? e.svg : null, f: f || '', k: k || '',
  }));
  const excl = cfg.excl || [];
  const clash = (a, b) => a === b || excl.some((g) => g.includes(a) && g.includes(b));
  const dist = (R, pool, t, n) => R.sample(pool.filter((x) => !clash(x.e, t.e)), n);
  const tpls = cfg.tpls.map((t) => (typeof t === 'function' ? { f: t, k: '' } : t));
  const ofKind = (k) => (k ? rows.filter((r) => r.k === k) : rows);
  const spell = rows.filter((r) => /^[A-Za-z]{3,9}$/.test(r.w))
    .concat((cfg.spell || []).map(([w, e]) => ({ w, e, f: '', k: '' })));
  const pairRows = !cfg.pair ? [] : cfg.pairWords ? rows.filter((r) => cfg.pairWords.includes(r.w)) : rows.filter((r) => !cfg.pairKinds || cfg.pairKinds.includes(r.k));
  const pairPic = (x, c) => (x.svg ? { svg: x.svg(c.hex) } : { emoji: x.e + c.e });
  const dlgs = (cfg.dlg || []).concat(COMMON);
  const qas = cfg.qa || [];
  const reads = cfg.reads || [];

  const sentence = (R) => {
    const t = R.pick(tpls);
    const x = R.pick(ofKind(t.k));
    return { t, x, s: t.f(x) };
  };
  const find = (R, x) => (x.f === 'v'
    ? R.pick([`Show me: ${x.w}.`, `Which one is "${x.w}"?`])
    : R.pick([`Find the ${x.w}.`, `Touch the ${x.w}.`, ...(x.f === 'p' ? [] : [`Where is the ${x.w}?`])]));

  // ----- level 1 -----
  const g1a = (R) => {
    const t = R.pick(rows);
    const o = [t, ...dist(R, rows, t, 2)].map(pic);
    return { type: 'choice', key: K('l1a:' + t.w), prompt: P.tap, say: say(t.w), options: o, answer: 0, cols: 3 };
  };
  const g1w = (R) => {
    const t = R.pick(rows);
    const o = [t, ...dist(R, rows, t, 2)].map(pic);
    return { type: 'choice', key: K('l1w:' + t.w), prompt: P.seeword, stimulus: { text: t.w }, options: o, answer: 0, cols: 3 };
  };
  const g1f = (R) => {
    const t = R.pick(rows);
    const s = find(R, t);
    const o = [t, ...dist(R, rows, t, 2)].map(pic);
    return { type: 'choice', key: K('l1f:' + s), prompt: P.tap, say: say(s), options: o, answer: 0, cols: 3 };
  };
  const g1y = (R) => {
    const t = R.pick(rows);
    const truth = R.chance(0.5);
    const shown = truth ? t : R.pick(rows.filter((v) => !clash(t.e, v.e)));
    const s = t.f === 'v' ? `Is this "${t.w}"?` : t.f === 'p' ? `Are these ${t.w}?` : `Is this ${np(t)}?`;
    return {
      type: 'choice', key: K('l1y:' + s + ':' + shown.e), prompt: P.yn, say: say(s), stimulus: pic(shown),
      options: [{ text: 'Yes', emoji: '✅', say: say('Yes') }, { text: 'No', emoji: '❌', say: say('No') }],
      answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
    };
  };
  const g1c = (R) => {
    const [c, ...o] = R.sample(COLS, 3);
    return { type: 'choice', key: K('l1c:' + c.w), prompt: P.colour, say: say(c.w), options: [c, ...o].map((x) => ({ emoji: x.e })), answer: 0, cols: 3 };
  };
  const g1n = (R) => {
    const [e] = R.pick(COUNTABLES);
    const n = R.int(1, 10);
    const others = R.sample([...Array(10).keys()].map((i) => i + 1).filter((v) => v !== n), 2);
    return {
      type: 'choice', key: K(`l1n:${e}:${n}`), prompt: P.count, say: say('How many?'),
      stimulus: { emojis: e, count: n }, options: [n, ...others].map((v) => ({ text: String(v) })), answer: 0, cols: 3,
    };
  };

  // ----- level 2 -----
  const g2a = (R) => {
    const t = R.pick(rows);
    const o = [t, ...dist(R, rows, t, 3)].map(pic);
    return { type: 'choice', key: K('l2a:' + t.w), prompt: P.tap, say: say(t.w), options: o, answer: 0, cols: 2 };
  };
  const g2b = (R) => {
    const t = R.pick(rows);
    const o = [t, ...dist(R, rows, t, 2)].map((x) => ({ text: x.w, say: say(x.w) }));
    return { type: 'choice', key: K('l2b:' + t.w), prompt: P.word, say: say('What is this?'), stimulus: pic(t), options: o, answer: 0, cols: 3 };
  };
  const g2t = (R) => {
    const { x, s } = sentence(R);
    const o = [x, ...dist(R, ofKind(x.k).length >= 4 ? ofKind(x.k) : rows, x, 3)].map(pic);
    return { type: 'choice', key: K('l2t:' + s), prompt: P.tap, say: say(s), options: o, answer: 0, cols: 2 };
  };
  const g2sp = (R) => {
    const t = R.pick(spell);
    return { type: 'order', key: K('l2sp:' + t.w), prompt: P.spell, say: say(t.w), stimulus: pic(t), tiles: t.w.split(''), joiner: '' };
  };
  const g2sc = (R) => {
    const t = R.pick(spell);
    const o = [t.w, ...misspell(t.w, R)].map((w) => ({ text: w }));
    return { type: 'choice', key: K('l2sc:' + t.w), prompt: P.spell2, say: say(t.w), stimulus: pic(t), options: o, answer: 0, cols: 3 };
  };
  const g2d = (R) => {
    const d = R.pick(dlgs);
    const w = d.w || R.sample(NEUTRAL, 2);
    return { type: 'choice', key: K('l2d:' + d.s), prompt: P.reply, say: say(d.s), stimulus: { text: d.s }, options: [d.a, ...w].map((text) => ({ text })), answer: 0, cols: 1 };
  };
  const g2q = (R) => {
    const q = R.pick(qas);
    return { type: 'choice', key: K('l2q:' + q.q), prompt: P.ans, say: say(q.q), stimulus: { text: q.q }, options: [q.a, ...q.w].map((text) => ({ text })), answer: 0, cols: 1 };
  };
  const g2c = (R) => {
    const t = R.pick(pairRows);
    const [c, c2] = R.sample(COLS, 2);
    const y = R.pick(pairRows.filter((v) => v.w !== t.w));
    const s = cfg.pair(t, c);
    return {
      type: 'choice', key: K('l2c:' + s), prompt: P.match, stimulus: pairPic(t, c),
      options: [s, cfg.pair(t, c2), cfg.pair(y, c)].map((text) => ({ text })), answer: 0, cols: 1,
    };
  };
  const g2cw = (R) => {
    const [c, ...o] = R.sample(COLS, 3);
    return { type: 'choice', key: K('l2cw:' + c.w), prompt: P.colourW, say: say('What colour is this?'), stimulus: { emoji: c.e }, options: [c, ...o].map((x) => ({ text: x.w, say: say(x.w) })), answer: 0, cols: 3 };
  };
  const g2n = (R) => {
    const [e] = R.pick(COUNTABLES);
    const n = R.int(1, 10);
    const others = R.sample([...Array(10).keys()].map((i) => i + 1).filter((v) => v !== n), 2);
    return {
      type: 'choice', key: K(`l2n:${e}:${n}`), prompt: P.count, say: say('How many?'),
      stimulus: { emojis: e, count: n }, options: [n, ...others].map((v) => ({ text: NUM[v], say: say(NUM[v]) })), answer: 0, cols: 3,
    };
  };
  const g2nw = (R) => {
    const n = R.int(1, 12);
    const others = R.sample([...Array(12).keys()].map((i) => i + 1).filter((v) => v !== n), 2);
    return { type: 'choice', key: K('l2nw:' + n), prompt: P.num, say: say(NUM[n]), options: [n, ...others].map((v) => ({ text: String(v) })), answer: 0, cols: 3 };
  };

  // ----- level 3 -----
  const g3o = (R) => {
    let r;
    for (let i = 0; i < 12; i++) { r = sentence(R); if (!hasDupWord(r.s.split(' '))) break; }
    return { type: 'order', key: K('l3o:' + r.s), prompt: P.order, say: say(r.s), stimulus: pic(r.x), tiles: r.s.split(' '), joiner: ' ' };
  };
  const g3t = (R) => {
    const { t, x, s } = sentence(R);
    const truth = R.chance(0.5);
    const pool = ofKind(t.k).filter((v) => v.w !== x.w && !clash(v.e, x.e));
    const shown = truth || !pool.length ? x : R.pick(pool);
    return {
      type: 'choice', key: K('l3t:' + s + ':' + shown.e),
      prompt: { fr: 'Vrai ou faux? ' + s, en: 'True or false? ' + s }, say: say(s), stimulus: pic(shown),
      options: [TRUE, FALSE], answer: shown === x ? 0 : 1, fixedOrder: true, cols: 2,
    };
  };
  const g3r = (R) => {
    const r = R.pick(reads);
    const i = R.int(0, r.qs.length - 1);
    const q = r.qs[i];
    return {
      type: 'choice', key: K(`l3r:${r.id}:${i}`), prompt: q.q, say: say(r.text), stimulus: { text: r.text },
      options: [q.a, ...q.w].map((text) => ({ text })), answer: 0, cols: 1,
    };
  };
  const g3q = (R) => {
    const q = R.pick(qas);
    return { type: 'choice', key: K('l3q:' + q.q), prompt: P.ans, say: say(q.q), stimulus: { text: q.q }, options: [q.a, ...q.w].map((text) => ({ text })), answer: 0, cols: 1 };
  };
  const g3p = (R) => {
    let t, c, s;
    for (let i = 0; i < 12; i++) { t = R.pick(pairRows); c = R.pick(COLS); s = cfg.pair(t, c); if (!hasDupWord(s.split(' '))) break; }
    return { type: 'order', key: K('l3p:' + s), prompt: P.order, say: say(s), stimulus: pairPic(t, c), tiles: s.split(' '), joiner: ' ' };
  };
  const g3pt = (R) => {
    const t = R.pick(pairRows);
    const [c, c2] = R.sample(COLS, 2);
    const truth = R.chance(0.5);
    const s = cfg.pair(t, truth ? c : c2);
    return {
      type: 'choice', key: K('l3pt:' + s + ':' + c.w + t.w), prompt: { fr: 'Vrai ou faux? ' + s, en: 'True or false? ' + s },
      say: say(s), stimulus: pairPic(t, c), options: [TRUE, FALSE], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
    };
  };
  const g3n = (R) => {
    const [e, plural] = R.pick(COUNTABLES);
    const n = R.int(2, 12);
    const s = `I see ${NUM[n]} ${plural}.`;
    return { type: 'order', key: K(`l3n:${e}:${n}`), prompt: P.order, say: say(s), stimulus: { emojis: e, count: n }, tiles: s.split(' '), joiner: ' ' };
  };

  const ex = cfg.extra || {};
  const pool = {
    1: [g1a, g1a, g1w, g1w, g1f, g1y, ...(cfg.pair ? [g1c, g1c] : []), ...(cfg.count ? [g1n, g1n] : []), ...(ex[1] || [])],
    2: [g2a, g2b, g2t, g2t, g2sp, g2sc, g2d, g2d, ...(qas.length ? [g2q, g2q] : []),
      ...(cfg.pair ? [g2c, g2c, g2cw] : []), ...(cfg.count ? [g2n, g2nw] : []), ...(ex[2] || [])],
    3: [g3o, g3o, g3t, g3t, ...(reads.length ? [g3r, g3r, g3r] : []), ...(qas.length ? [g3q, g3q] : []),
      ...(cfg.pair ? [g3p, g3pt] : []), ...(cfg.count ? [g3n] : []), ...(ex[3] || [])],
  };

  const unit = {
    id, icon: cfg.icon, title: cfg.title, pfeq: cfg.pfeq,
    generate(level, R) { return R.pick(pool[level] || pool[1])(R); },
    allSay() {
      const R = makeRng(2024), seen = new Map();
      const add = (s) => { if (s && s.text) seen.set(s.text, s); };
      for (const L of [1, 2, 3]) {
        for (let i = 0; i < 1500; i++) {
          const q = unit.generate(L, R);
          add(q.say);
          for (const o of q.options || []) add(o.say);
        }
      }
      return [...seen.values()];
    },
  };
  return unit;
}

const T = (n, en) => ({ fr: `Catch · ${n} — ${en}`, en: `Catch · ${n} — ${en}` });
const PF = (n, rest) => `Anglais — Catch 2e année, ${n} (${rest})`;

// =====================================================================
// k0 — Pre-Unit "Catch Is Back": greetings, family, body, school bag
// =====================================================================
const k0 = build({
  id: 'k0', icon: '👋', title: T('Pre-Unit', 'Catch Is Back'),
  pfeq: PF('préunité', 'famille, parties du corps, matériel scolaire'),
  vocab: [
    ['mother', '👩', '', 'f'], ['father', '👨', '', 'f'], ['grandmother', '👵', '', 'f'], ['grandfather', '👴', '', 'f'],
    ['brother', '👦', '', 'f'], ['sister', '👧', '', 'f'], ['baby', '👶', '', 'f'],
    ['eye', '👁️', '', 'b'], ['ear', '👂', '', 'b'], ['nose', '👃', '', 'b'], ['mouth', '👄', '', 'b'],
    ['hand', '✋', '', 'b'], ['foot', '🦶', '', 'b'], ['leg', '🦵', '', 'b'],
    ['pencil', '✏️', '', 's'], ['scissors', '✂️', 'p', 's'], ['ruler', '📏', '', 's'], ['book', '📖', '', 's'], ['crayon', '🖍️', '', 's'],
  ],
  tpls: [
    { k: 'f', f: (x) => `This is my ${x.w}.` }, { k: 'f', f: (x) => `I love my ${x.w}.` },
    { k: 'b', f: (x) => `I touch my ${x.w}.` }, { k: 'b', f: (x) => `Show me your ${x.w}.` },
    { k: 's', f: (x) => `I have ${np(x)}.` }, { k: 's', f: (x) => `Take out your ${x.w}.` },
  ],
  dlg: [
    { s: 'Hello! What is your name?', a: 'My name is Sam.', w: ["I'm fine, thank you.", 'It is a pencil.'] },
    { s: 'How are you?', a: "I'm fine, thank you.", w: ['My name is Sam.', 'Goodbye!'] },
    { s: 'How old are you?', a: 'I am seven.', w: ['My name is Sam.', 'It is red.'] },
    { s: 'Nice to meet you!', a: 'Nice to meet you, too.', w: ['Goodbye.', 'It is a book.'] },
    { s: 'Hello, Sam!', a: 'Hello!', w: ['Good night.', 'Goodbye.'] },
    { s: 'This is my father.', a: 'Nice to meet you!', w: ['It is a pencil.', 'I am five years old.'] },
  ],
  qa: [
    { q: "Your mother's sister is your ...", a: 'aunt', w: ['uncle', 'cousin'] },
    { q: "Your father's brother is your ...", a: 'uncle', w: ['aunt', 'grandfather'] },
    { q: "Your aunt's son is your ...", a: 'cousin', w: ['brother', 'uncle'] },
    { q: "Your mother's mother is your ...", a: 'grandmother', w: ['aunt', 'sister'] },
    { q: "Your father's father is your ...", a: 'grandfather', w: ['uncle', 'brother'] },
    { q: 'A girl with the same parents as you is your ...', a: 'sister', w: ['cousin', 'aunt'] },
    { q: 'A boy with the same parents as you is your ...', a: 'brother', w: ['cousin', 'uncle'] },
    { q: 'A person you play with at school is your ...', a: 'friend', w: ['aunt', 'grandmother'] },
    { q: 'You see with your ...', a: 'eyes', w: ['ears', 'nose'] },
    { q: 'You hear with your ...', a: 'ears', w: ['eyes', 'hands'] },
    { q: 'You smell with your ...', a: 'nose', w: ['mouth', 'feet'] },
    { q: 'You walk with your ...', a: 'legs and feet', w: ['hands', 'ears'] },
    { q: 'You draw with a ...', a: 'crayon', w: ['book', 'scissors'] },
    { q: 'You cut paper with ...', a: 'scissors', w: ['a ruler', 'a crayon'] },
  ],
  reads: [
    { id: 'a', text: 'My name is Mia. I am seven. This is my family. This is my mother and this is my father. I have a brother. His name is Leo.',
      qs: [{ q: 'How old is Mia?', a: 'Seven', w: ['Six', 'Eight'] }, { q: 'Who is Leo?', a: 'Her brother', w: ['Her cousin', 'Her father'] }, { q: "What is Mia's brother's name?", a: 'Leo', w: ['Sam', 'Max'] }] },
    { id: 'b', text: 'Sam has a school bag. In the bag there is a pencil, a ruler and two books. There are no scissors.',
      qs: [{ q: 'How many books are in the bag?', a: 'Two', w: ['One', 'Three'] }, { q: 'What is in the bag?', a: 'A ruler', w: ['Scissors', 'A crayon'] }, { q: 'What is NOT in the bag?', a: 'Scissors', w: ['A pencil', 'A ruler'] }] },
    { id: 'c', text: 'Hello! I am Max. This is my grandmother. She is kind. She has a big smile. I love my grandmother.',
      qs: [{ q: 'Who is kind?', a: 'His grandmother', w: ['His brother', 'His teacher'] }, { q: 'What does she have?', a: 'A big smile', w: ['A big dog', 'Two books'] }] },
  ],
});

// =====================================================================
// k1 — Unit 1 "Back to School"
// =====================================================================
const k1 = build({
  id: 'k1', icon: '🎒', title: T('Unit 1', 'Back to School'),
  pfeq: PF('unité 1', 'matériel scolaire, lieux de l\'école, émotions, couleurs, nombres'),
  vocab: [
    ['pencil', '✏️', '', 'n'], ['book', '📖', '', 'n'], ['notebook', '📓', '', 'n'], ['backpack', '🎒', '', 'n'],
    ['scissors', '✂️', 'p', 'n'], ['ruler', '📏', '', 'n'], ['crayon', '🖍️', '', 'n'],
    ['school', '🏫', '', 'p'], ['library', '📚', '', 'p'], ['playground', '🛝', '', 'p'], ['gym', '🏀', '', 'p'], ['cafeteria', '🍽️', '', 'p'],
    ['happy', '😀', 'v', 'f'], ['sad', '😢', 'v', 'f'], ['angry', '😠', 'v', 'f'], ['scared', '😨', 'v', 'f'],
    ['tired', '😴', 'v', 'f'], ['sick', '🤒', 'v', 'f'], ['surprised', '😮', 'v', 'f'],
  ],
  excl: [['😨', '😮']],
  tpls: [
    { k: 'n', f: (x) => `I have ${np(x)}.` }, { k: 'n', f: (x) => `Take out your ${x.w}, please.` },
    { k: 'p', f: (x) => `I am in the ${x.w}.` }, { k: 'p', f: (x) => `Let's go to the ${x.w}.` },
    { k: 'f', f: (x) => `I am ${x.w}.` }, { k: 'f', f: (x) => `She is ${x.w} today.` },
  ],
  pair: (x, c) => (x.f === 'p' ? `I have ${c.w} ${x.w}.` : `I have ${art(c.w + ' ' + x.w)}.`), pairKinds: ['n'],
  count: true,
  dlg: [
    { s: 'Good morning, class!', a: 'Good morning!', w: ['Good night!', 'Goodbye!'] },
    { s: 'How do you feel today?', a: 'I am happy.', w: ['It is blue.', 'I am a pencil.'] },
    { s: 'Can I borrow a pencil, please?', a: 'Sure! Here you are.', w: ['I am sad.', 'It is a book.'] },
    { s: 'Are you sad?', a: "No, I'm happy.", w: ['Yes, it is a book.', 'It is blue.'] },
    { s: 'What colour is your backpack?', a: 'It is blue.', w: ['I am blue.', 'It is a book.'] },
    { s: 'Where is the library?', a: 'It is next to the gym.', w: ['It is a pencil.', 'I am in the gym.'] },
    { s: 'What do you need?', a: 'I need a ruler.', w: ['I am a ruler.', 'Hooray!'] },
  ],
  qa: [
    { q: 'Where do you read books at school?', a: 'In the library', w: ['In the gym', 'On the playground'] },
    { q: 'Where do you play at recess?', a: 'On the playground', w: ['In the library', 'In the cafeteria'] },
    { q: 'Where do you eat lunch at school?', a: 'In the cafeteria', w: ['In the gym', 'In the library'] },
    { q: 'What do you use to measure?', a: 'A ruler', w: ['Scissors', 'A crayon'] },
    { q: 'What do you use to colour?', a: 'A crayon', w: ['A ruler', 'A backpack'] },
    { q: 'What do you use to cut paper?', a: 'Scissors', w: ['A ruler', 'A book'] },
    { q: 'Where do you carry your books?', a: 'In a backpack', w: ['In a pencil', 'In a crayon'] },
    { q: 'You have a fever. How do you feel?', a: 'Sick', w: ['Happy', 'Surprised'] },
    { q: 'It is bedtime. How do you feel?', a: 'Tired', w: ['Angry', 'Surprised'] },
    { q: 'You get a gift. How do you feel?', a: 'Happy', w: ['Sad', 'Sick'] },
    { q: 'What colour do you get with blue and yellow?', a: 'Green', w: ['Red', 'Brown'] },
    { q: 'What number comes after nine?', a: 'Ten', w: ['Eight', 'Eleven'] },
  ],
  reads: [
    { id: 'a', text: 'It is Monday. Mia is at school. She has a red pencil and a blue notebook. Today she is happy. She is in the library with her friend.',
      qs: [{ q: 'Where is Mia?', a: 'At school', w: ['At home', 'At the park'] }, { q: 'What colour is the pencil?', a: 'Red', w: ['Blue', 'Green'] }, { q: 'How is Mia today?', a: 'Happy', w: ['Sad', 'Tired'] }] },
    { id: 'b', text: "Max cannot find his ruler. He is sad. He asks for help. His friend says, 'Here is your ruler!' Now Max is happy.",
      qs: [{ q: 'What does Max lose?', a: 'His ruler', w: ['His backpack', 'His pencil'] }, { q: 'How is Max at the end?', a: 'Happy', w: ['Angry', 'Sad'] }, { q: 'What does Max do?', a: 'He asks for help', w: ['He runs away', 'He sleeps'] }] },
    { id: 'c', text: 'Today is the first day of school. Lea is a little scared. She has a new backpack. In it there are two books, three crayons and a ruler. Her teacher smiles. Now Lea is not scared.',
      qs: [{ q: 'How is Lea in the morning?', a: 'A little scared', w: ['Very angry', 'Sick'] }, { q: 'How many crayons are in her backpack?', a: 'Three', w: ['Two', 'Four'] }, { q: 'Who smiles?', a: 'The teacher', w: ['The ruler', 'The principal'] }] },
  ],
});

// =====================================================================
// k2 — Unit 2 "My Clothes"
// =====================================================================
const SKIRT = (c) => `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M22 12h20l14 42H8z" fill="${c}" stroke="#333" stroke-width="2.5" stroke-linejoin="round"/><path d="M22 12h20v6H22z" fill="${c}" stroke="#333" stroke-width="2.5"/></svg>`;
const SWEATER = (c) => `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M22 10l-16 12 6 11 7-5v26h26V28l7 5 6-11-16-12-6 6h-8z" fill="${c}" stroke="#333" stroke-width="2.5" stroke-linejoin="round"/><path d="M22 10q10 12 20 0" fill="none" stroke="#333" stroke-width="2.5"/></svg>`;
const k2 = build({
  id: 'k2', icon: '🧥', title: T('Unit 2', 'My Clothes'),
  pfeq: PF('unité 2', 'vêtements, couleurs, nombres'),
  vocab: [
    ['boots', '👢', 'p'], ['dress', '👗'], ['hat', '🧢'], ['jacket', '🧥'], ['mittens', '🧤', 'p'], ['pants', '👖', 'p'],
    ['scarf', '🧣'], ['shirt', '👕'], ['shoes', '👟', 'p'], ['skirt', { svg: SKIRT }], ['socks', '🧦', 'p'],
    ['sweater', { svg: SWEATER }], ['shorts', '🩳', 'p'],
  ],
  tpls: [
    (x) => `I am wearing ${np(x)}.`, (x) => `Put on your ${x.w}.`, (x) => `I like my ${x.w}.`,
  ],
  pair: (x, c) => (x.f === 'p' ? `I am wearing ${c.w} ${x.w}.` : `I am wearing ${art(c.w + ' ' + x.w)}.`),
  count: true,
  dlg: [
    { s: 'What are you wearing today?', a: 'I am wearing a red sweater.', w: ['I am five years old.', 'It is cold.'] },
    { s: 'Are you cold?', a: 'Yes. I need my scarf.', w: ['No, it is a dress.', 'Yes, it is Monday.'] },
    { s: 'Is this your hat?', a: 'Yes, it is mine.', w: ['I am a hat.', 'They are blue.'] },
    { s: 'Where are my boots?', a: 'They are by the door.', w: ['It is by the door.', 'He is by the door.'] },
    { s: 'Whose jacket is this?', a: 'It is mine. Thank you!', w: ['They are blue.', 'My name is Sam.'] },
  ],
  qa: [
    { q: 'What do you wear on your feet in winter?', a: 'Boots', w: ['A scarf', 'A skirt'] },
    { q: 'What do you wear on your hands when it is cold?', a: 'Mittens', w: ['Socks', 'A hat'] },
    { q: 'What do you wear around your neck?', a: 'A scarf', w: ['A hat', 'Shoes'] },
    { q: 'What do you wear on your head?', a: 'A hat', w: ['Socks', 'Pants'] },
    { q: 'What do you wear inside your shoes?', a: 'Socks', w: ['A scarf', 'A dress'] },
    { q: 'You go to the beach. What do you wear?', a: 'Shorts', w: ['Boots', 'Mittens'] },
    { q: 'What colour is snow?', a: 'White', w: ['Red', 'Black'] },
    { q: 'How many socks are in one pair?', a: 'Two', w: ['One', 'Three'] },
    { q: 'You wear it on your legs. It has two legs.', a: 'Pants', w: ['A dress', 'A scarf'] },
  ],
  reads: [
    { id: 'a', text: 'It is a cold day. Lily puts on her red jacket. She puts on blue boots. She wears a yellow scarf. Her mittens are green.',
      qs: [{ q: 'What colour is the jacket?', a: 'Red', w: ['Blue', 'Green'] }, { q: 'What does Lily wear on her hands?', a: 'Mittens', w: ['Socks', 'Shoes'] }, { q: 'What colour is her scarf?', a: 'Yellow', w: ['Green', 'Blue'] }] },
    { id: 'b', text: 'Today is hot. Tom wears a white shirt and blue shorts. He does not wear a jacket. He wears a hat. Tom goes to the park.',
      qs: [{ q: 'What does Tom wear on his head?', a: 'A hat', w: ['A scarf', 'Boots'] }, { q: 'What colour are his shorts?', a: 'Blue', w: ['White', 'Red'] }, { q: 'Why no jacket?', a: 'It is hot', w: ['It is cold', 'It is snowing'] }] },
    { id: 'c', text: 'Zoe has a pink dress. She has white socks and black shoes. Her sister has an orange sweater and a brown skirt. They are ready for the party.',
      qs: [{ q: "What colour is Zoe's dress?", a: 'Pink', w: ['Orange', 'Brown'] }, { q: 'What does her sister wear?', a: 'A sweater and a skirt', w: ['A dress and boots', 'Pants and a hat'] }, { q: 'What colour are the shoes?', a: 'Black', w: ['White', 'Pink'] }] },
  ],
});

// =====================================================================
// k3 — Unit 3 "Forest Animals"
// =====================================================================
const k3 = build({
  id: 'k3', icon: '🦊', title: T('Unit 3', 'Forest Animals'),
  pfeq: PF('unité 3', 'animaux de la forêt, vêtements, couleurs, nombres'),
  vocab: [
    ['bear', '🐻'], ['fox', '🦊'], ['wolf', '🐺'], ['deer', '🦌'], ['rabbit', '🐰'], ['squirrel', '🐿️'], ['owl', '🦉'],
    ['raccoon', '🦝'], ['skunk', '🦨'], ['beaver', '🦫'], ['frog', '🐸'], ['bat', '🦇'], ['mouse', '🐭'], ['turtle', '🐢'], ['bird', '🐦'],
  ],
  excl: [['🦉', '🐦', '🦇']],
  tpls: [
    (x) => `I see ${np(x)}.`, (x) => `Look at the ${x.w}!`, (x) => `The ${x.w} lives in the forest.`,
  ],
  pair: (x, c) => `I see ${art(c.w + ' ' + x.w)}.`,
  count: true,
  dlg: [
    { s: 'Look at the owl!', a: 'Wow! It is beautiful.', w: ['I am five years old.', 'My name is Sam.'] },
    { s: 'What animal do you see?', a: 'I see a rabbit.', w: ['I am a rabbit.', 'My name is Sam.'] },
    { s: 'Shh! Be quiet. There is a bear.', a: 'OK. Let us go back.', w: ['Hooray! Hello!', 'It is a pencil.'] },
    { s: 'Is the fox big or small?', a: 'It is small.', w: ['It is a pencil.', 'He is a doctor.'] },
    { s: 'Can the squirrel climb the tree?', a: 'Yes, it can.', w: ['No, it is a tree.', 'Yes, I am a tree.'] },
  ],
  qa: [
    { q: 'Which animal says "Hoo, hoo!" at night?', a: 'An owl', w: ['A frog', 'A rabbit'] },
    { q: 'Which animal has a big bushy tail and climbs trees?', a: 'A squirrel', w: ['A turtle', 'A frog'] },
    { q: 'Which animal jumps and eats carrots?', a: 'A rabbit', w: ['A bear', 'A beaver'] },
    { q: 'Which animal sleeps all winter?', a: 'A bear', w: ['A bird', 'A mouse'] },
    { q: 'Which animal builds a dam in the water?', a: 'A beaver', w: ['A fox', 'A deer'] },
    { q: 'Which animal flies at night?', a: 'A bat', w: ['A frog', 'A turtle'] },
    { q: 'Which animal makes a very bad smell?', a: 'A skunk', w: ['A rabbit', 'A deer'] },
    { q: 'Which animal says "ribbit"?', a: 'A frog', w: ['A wolf', 'An owl'] },
    { q: 'Which animal is orange with a bushy tail?', a: 'A fox', w: ['A frog', 'A bat'] },
    { q: 'Which animal has a hard shell?', a: 'A turtle', w: ['A fox', 'A squirrel'] },
  ],
  reads: [
    { id: 'a', text: 'Mia is in the forest. She sees a brown bear. The bear is big and it is hungry. Then she sees a small rabbit. The rabbit is white. It jumps and runs away.',
      qs: [{ q: 'What colour is the bear?', a: 'Brown', w: ['White', 'Green'] }, { q: 'What does the rabbit do?', a: 'It runs away', w: ['It sleeps', 'It sings'] }, { q: 'Who is hungry?', a: 'The bear', w: ['The rabbit', 'Mia'] }] },
    { id: 'b', text: "It is night. An owl sits in a tree. A fox walks in the forest. A squirrel is sleeping. The owl says, 'Hoo, hoo!'",
      qs: [{ q: 'Where is the owl?', a: 'In a tree', w: ['In a house', 'In the water'] }, { q: 'Who is sleeping?', a: 'The squirrel', w: ['The fox', 'The owl'] }, { q: 'When is it?', a: 'Night', w: ['Morning', 'Lunch time'] }] },
    { id: 'c', text: 'The beaver works all day. It cuts trees with its teeth. It builds a home in the water. The frog watches. The frog is green and it likes the water.',
      qs: [{ q: 'What does the beaver build?', a: 'A home in the water', w: ['A bed in a tree', 'A school'] }, { q: 'What colour is the frog?', a: 'Green', w: ['Red', 'Black'] }, { q: 'Who watches?', a: 'The frog', w: ['The bear', 'The owl'] }] },
  ],
});

// =====================================================================
// k4 — Unit 4 "At Home"
// =====================================================================
const k4 = build({
  id: 'k4', icon: '🏠', title: T('Unit 4', 'At Home'),
  pfeq: PF('unité 4', 'pièces de la maison, meubles, couleurs, nombres'),
  vocab: [
    ['kitchen', '🍳', '', 'r'], ['bathroom', '🚿', '', 'r'], ['bedroom', '🛌', '', 'r'], ['garden', '🌷', '', 'r'], ['garage', '🚗', '', 'r'],
    ['bed', '🛏️', '', 'f'], ['chair', '🪑', '', 'f'], ['sofa', '🛋️', '', 'f'], ['lamp', '💡', '', 'f'], ['TV', '📺', '', 'f'],
    ['door', '🚪', '', 'f'], ['window', '🪟', '', 'f'], ['mirror', '🪞', '', 'f'], ['toilet', '🚽', '', 'f'],
  ],
  excl: [['🛌', '🛏️', '🚿', '🚽']],
  tpls: [
    { k: 'r', f: (x) => `I am in the ${x.w}.` }, { k: 'r', f: (x) => `Let's go to the ${x.w}.` },
    { k: 'f', f: (x) => `I see ${np(x)}.` }, { k: 'f', f: (x) => `Look at the ${x.w}.` },
  ],
  pair: (x, c) => `The ${x.w} is ${c.w}.`, pairKinds: ['f'],
  count: true,
  dlg: [
    { s: 'Where are you?', a: 'I am in the bedroom.', w: ['I am five years old.', 'It is a bed.'] },
    { s: 'Hurry up! Dinner is ready.', a: "I'm ready!", w: ['Good night.', 'My name is Sam.'] },
    { s: 'Welcome to my house!', a: 'Thank you! It is nice.', w: ['Goodbye!', 'It is a pencil.'] },
    { s: 'Where is the toilet, please?', a: 'It is in the bathroom.', w: ['It is in the garden.', 'It is a lamp.'] },
    { s: 'Can I sit on the sofa?', a: 'Yes, of course.', w: ['No, I am a sofa.', 'It is blue.'] },
    { s: 'Where is Dad?', a: 'He is in the kitchen.', w: ['He is a kitchen.', 'It is in the kitchen.'] },
  ],
  qa: [
    { q: 'Where do you sleep?', a: 'In the bedroom', w: ['In the kitchen', 'In the garage'] },
    { q: 'Where do you cook?', a: 'In the kitchen', w: ['In the bedroom', 'In the garden'] },
    { q: 'Where do you take a shower?', a: 'In the bathroom', w: ['In the garden', 'In the garage'] },
    { q: 'Where do flowers grow?', a: 'In the garden', w: ['In the bathroom', 'In the kitchen'] },
    { q: 'Where is the car?', a: 'In the garage', w: ['In the bedroom', 'In the bathroom'] },
    { q: 'What do you sit on to watch TV?', a: 'A sofa', w: ['A lamp', 'A door'] },
    { q: 'What do you open to go outside?', a: 'The door', w: ['The lamp', 'The bed'] },
    { q: 'What do you look through to see outside?', a: 'The window', w: ['The mirror', 'The TV'] },
    { q: 'What gives you light at night?', a: 'A lamp', w: ['A chair', 'A door'] },
    { q: 'What do you look at to see your face?', a: 'A mirror', w: ['A door', 'A chair'] },
  ],
  reads: [
    { id: 'a', text: 'This is my house. It has a kitchen, a bathroom and two bedrooms. My bed is blue. There is a lamp next to my bed. I love my room.',
      qs: [{ q: 'How many bedrooms are there?', a: 'Two', w: ['One', 'Three'] }, { q: 'What colour is the bed?', a: 'Blue', w: ['Red', 'Green'] }, { q: 'What is next to the bed?', a: 'A lamp', w: ['A sofa', 'A TV'] }] },
    { id: 'b', text: 'Mom is in the kitchen. Dad is in the garden. My brother is in the living room. He is on the sofa. He watches TV. I am in my bedroom.',
      qs: [{ q: 'Where is Dad?', a: 'In the garden', w: ['In the kitchen', 'In the garage'] }, { q: 'What does the brother do?', a: 'He watches TV', w: ['He cooks', 'He plays in the garden'] }, { q: 'Who is in the kitchen?', a: 'Mom', w: ['Dad', 'My brother'] }] },
    { id: 'c', text: "Welcome to Sam's house! The door is red. The window is big. In the living room there is a green sofa and a TV. There are three chairs in the kitchen.",
      qs: [{ q: 'What colour is the door?', a: 'Red', w: ['Green', 'Blue'] }, { q: 'How many chairs are in the kitchen?', a: 'Three', w: ['Two', 'Five'] }, { q: 'What is green?', a: 'The sofa', w: ['The door', 'The TV'] }] },
  ],
});

// =====================================================================
// k5 — Unit 5 "Game Time"
// =====================================================================
const k5 = build({
  id: 'k5', icon: '⚽', title: T('Unit 5', 'Game Time'),
  pfeq: PF('unité 5', 'jeux, verbes d\'action'),
  vocab: [
    ['soccer', '⚽', 'x', 'g'], ['basketball', '🏀', 'x', 'g'], ['hockey', '🏒', 'x', 'g'], ['baseball', '⚾', 'x', 'g'],
    ['tennis', '🎾', 'x', 'g'], ['bowling', '🎳', 'x', 'g'], ['cards', '🃏', 'x', 'g'], ['chess', '♟️', 'x', 'g'],
    ['ping-pong', '🏓', 'x', 'g'], ['video games', '🎮', 'x', 'g'],
    ['run', '🏃', 'v', 'a'], ['clap', '👏', 'v', 'a'], ['dance', '💃', 'v', 'a'], ['sing', '🎤', 'v', 'a'],
    ['swim', '🏊', 'v', 'a'], ['skate', '⛸️', 'v', 'a'], ['ski', '🎿', 'v', 'a'], ['climb', '🧗', 'v', 'a'],
  ],
  excl: [['⚽', '🏀', '⚾', '🎾', '🏓']],
  tpls: [
    { k: 'g', f: (x) => `Let's play ${x.w}!` }, { k: 'g', f: (x) => `I like to play ${x.w}.` },
    { k: 'a', f: (x) => `I can ${x.w}.` }, { k: 'a', f: (x) => `Can you ${x.w}?` }, { k: 'a', f: (x) => `Let's ${x.w}!` },
  ],
  dlg: [
    { s: "Let's play soccer!", a: 'Good idea!', w: ['Goodbye!', 'I am a ball.'] },
    { s: 'Can I play too?', a: 'Yes, come here!', w: ['No, it is a ball.', 'It is a pencil.'] },
    { s: 'It is your turn!', a: 'Thank you! My turn.', w: ['Goodbye!', 'It is a card.'] },
    { s: 'I win!', a: 'Good game!', w: ['Excuse me.', 'It is a pencil.'] },
    { s: 'Wait a minute! I am not ready.', a: 'OK. Tell me when you are ready.', w: ['Hooray!', 'It is a pencil.'] },
    { s: 'Throw me the ball, please!', a: 'Here you are! Catch!', w: ['It is a card.', 'I am five years old.'] },
    { s: 'Do you want to play cards?', a: 'Yes, please!', w: ['It is a card.', 'Goodbye.'] },
  ],
  qa: [
    { q: 'You play this game on ice with sticks.', a: 'Hockey', w: ['Tennis', 'Chess'] },
    { q: 'You play it with a racket and a yellow ball.', a: 'Tennis', w: ['Hockey', 'Cards'] },
    { q: 'You throw the ball into a basket.', a: 'Basketball', w: ['Bowling', 'Chess'] },
    { q: 'You hit pins with a heavy ball.', a: 'Bowling', w: ['Chess', 'Soccer'] },
    { q: 'You kick the ball into a net.', a: 'Soccer', w: ['Cards', 'Chess'] },
    { q: 'You do this with music and your feet.', a: 'Dance', w: ['Swim', 'Climb'] },
    { q: 'You do this in the snow on two long boards.', a: 'Ski', w: ['Swim', 'Skate'] },
    { q: 'You do this in the water.', a: 'Swim', w: ['Ski', 'Run'] },
    { q: 'You wear these on your feet to go on the ice.', a: 'Skates', w: ['Mittens', 'A hat'] },
    { q: 'You do this with your hands to say "bravo".', a: 'Clap', w: ['Run', 'Skate'] },
  ],
  reads: [
    { id: 'a', text: "At recess Leo and Mia play soccer. Mia kicks the ball. Leo runs. Then it is Leo's turn. He scores a goal! Leo says, 'Hooray!'",
      qs: [{ q: 'What do they play?', a: 'Soccer', w: ['Hockey', 'Tennis'] }, { q: 'Who kicks the ball first?', a: 'Mia', w: ['Leo', 'The teacher'] }, { q: 'What does Leo say?', a: 'Hooray!', w: ['Goodbye!', 'Excuse me!'] }] },
    { id: 'b', text: "It is raining. We cannot go outside. We play cards in the classroom. Ava wins. Her friend says, 'Good game!' Then we sing and dance.",
      qs: [{ q: 'Why do they stay inside?', a: 'It is raining', w: ['It is hot', 'It is Monday'] }, { q: 'What do they play?', a: 'Cards', w: ['Hockey', 'Tennis'] }, { q: 'Who wins?', a: 'Ava', w: ['Sam', 'Leo'] }] },
    { id: 'c', text: 'Max likes sports. He can run, swim and skate. In winter he plays hockey. In summer he plays tennis. He cannot ski. He asks for help to learn.',
      qs: [{ q: 'What can Max do?', a: 'Skate', w: ['Ski', 'Climb'] }, { q: 'What does he play in winter?', a: 'Hockey', w: ['Tennis', 'Bowling'] }, { q: 'What does Max do to learn to ski?', a: 'He asks for help', w: ['He runs away', 'He sings'] }] },
  ],
});

// =====================================================================
// k6 — Unit 6 "I'm Hungry"
// =====================================================================
const some = (x) => (x.f === 'x' ? `some ${x.w}` : art(x.w));
const k6 = build({
  id: 'k6', icon: '🍎', title: T('Unit 6', "I'm Hungry"),
  pfeq: PF('unité 6', 'aliments, boissons, chaud et froid, couleurs'),
  vocab: [
    ['apple', '🍎', '', 'f'], ['banana', '🍌', '', 'f'], ['bread', '🍞', 'x', 'f'], ['cheese', '🧀', 'x', 'f'], ['egg', '🥚', '', 'f'],
    ['pizza', '🍕', 'x', 'f'], ['soup', '🍲', 'x', 'f'], ['cookie', '🍪', '', 'f'], ['carrot', '🥕', '', 'f'], ['pear', '🍐', '', 'f'],
    ['sandwich', '🥪', '', 'f'], ['rice', '🍚', 'x', 'f'], ['ice cream', '🍦', 'x', 'f'],
    ['milk', '🥛', 'x', 'd'], ['juice', '🧃', 'x', 'd'], ['water', '💧', 'x', 'd'],
    ['hot', '🥵', 'v', 't'], ['cold', '🥶', 'v', 't'],
  ],
  tpls: [
    { k: 'f', f: (x) => `Can I have ${some(x)}, please?` }, { k: 'f', f: (x) => `I am hungry. I want ${some(x)}.` },
    { k: 'd', f: (x) => `I am thirsty. Can I have some ${x.w}, please?` }, { k: 'd', f: (x) => `Here is your ${x.w}.` },
    { k: 't', f: (x) => `I am ${x.w}.` }, { k: 't', f: (x) => `It is ${x.w} today.` },
  ],
  pair: (x, c) => `I want ${art(c.w + ' ' + x.w)}.`, pairWords: ['apple', 'banana', 'pear', 'carrot', 'cookie', 'sandwich'],
  dlg: [
    { s: 'Are you hungry?', a: 'Yes, I am. Can I have a sandwich, please?', w: ['It is a sandwich.', 'My name is Sam.'] },
    { s: 'Here is your juice.', a: 'Thank you!', w: ['Goodbye!', 'Wait a minute.'] },
    { s: 'Would you like some milk?', a: 'Yes, please.', w: ['It is a cookie.', 'Hooray!'] },
    { s: 'Excuse me, can I have some water?', a: 'Sure! Here you are.', w: ['It is a pencil.', 'I am five years old.'] },
    { s: 'The soup is hot!', a: 'Wait a minute. It is too hot.', w: ['Goodbye, soup.', 'It is a pencil.'] },
    { s: 'Is your juice cold?', a: 'Yes, it is cold.', w: ['No, it is a pencil.', 'Yes, I am juice.'] },
    { s: 'What is your favourite food?', a: 'My favourite food is pizza.', w: ['I am five years old.', 'It is a pencil.'] },
  ],
  qa: [
    { q: 'You are thirsty. What do you drink?', a: 'Water', w: ['Bread', 'Cheese'] },
    { q: 'Which food is cold and sweet?', a: 'Ice cream', w: ['Soup', 'Rice'] },
    { q: 'Which food is hot?', a: 'Soup', w: ['Ice cream', 'An apple'] },
    { q: 'Which one is a fruit?', a: 'A pear', w: ['Cheese', 'Bread'] },
    { q: 'Which one is a vegetable?', a: 'A carrot', w: ['A cookie', 'An egg'] },
    { q: 'Which one is a drink?', a: 'Juice', w: ['Rice', 'Pizza'] },
    { q: 'A hen lays this.', a: 'An egg', w: ['A pear', 'Cheese'] },
    { q: 'A cow gives us this.', a: 'Milk', w: ['Bread', 'Juice'] },
    { q: 'You make a sandwich with ...', a: 'Bread', w: ['Juice', 'Soup'] },
    { q: 'It is snowing. You are cold. What do you want?', a: 'Hot soup', w: ['Ice cream', 'Cold juice'] },
  ],
  reads: [
    { id: 'a', text: "Lily is hungry. She wants a sandwich and an apple. She also wants some juice. 'Can I have some juice, please?' she asks. Her mom says, 'Here you are.' Lily says, 'Thank you!'",
      qs: [{ q: 'What does Lily want to drink?', a: 'Juice', w: ['Milk', 'Water'] }, { q: 'What does Lily say at the end?', a: 'Thank you!', w: ['Goodbye!', 'Hooray!'] }, { q: 'What does she want to eat?', a: 'A sandwich and an apple', w: ['Soup and a pear', 'Pizza and cheese'] }] },
    { id: 'b', text: "It is cold outside. Tom has hot soup. His sister has cold milk. They both have bread. The soup is good. 'I love soup!' says Tom.",
      qs: [{ q: 'What is hot?', a: 'The soup', w: ['The milk', 'The bread'] }, { q: "What does Tom's sister drink?", a: 'Milk', w: ['Juice', 'Water'] }, { q: 'Who loves soup?', a: 'Tom', w: ['His sister', 'His mom'] }] },
    { id: 'c', text: 'At the party there is pizza, ice cream and cookies. Sam is very hungry. He eats two pieces of pizza. Then he has a big ice cream. Now he is full and happy.',
      qs: [{ q: 'What does Sam eat first?', a: 'Pizza', w: ['Cookies', 'Ice cream'] }, { q: 'How many pieces of pizza does he eat?', a: 'Two', w: ['One', 'Four'] }, { q: 'How is Sam at the end?', a: 'Full and happy', w: ['Hungry and sad', 'Cold and tired'] }] },
  ],
});

// =====================================================================
// k7 — Unit 7 "People Around Me": jobs, places, directions
// =====================================================================
const ARR = { left: '⬅️', right: '➡️', straight: '⬆️' };
const DIRS = ['left', 'right', 'straight'];
const dirSay = (d) => (d === 'straight' ? 'Go straight.' : `Turn ${d}.`);
const PLACES7 = [['bank', '🏦'], ['library', '📚'], ['park', '🌳'], ['school', '🏫'], ['store', '🏪'], ['bakery', '🥖'], ['hospital', '🏥']];
const k7 = build({
  id: 'k7', icon: '🏘️', title: T('Unit 7', 'People Around Me'),
  pfeq: PF('unité 7', 'métiers, lieux du quartier, directions, nombres'),
  vocab: [
    ['firefighter', '🧑‍🚒', '', 'j'], ['police officer', '👮', '', 'j'], ['doctor', '🧑‍⚕️', '', 'j'], ['teacher', '🧑‍🏫', '', 'j'],
    ['farmer', '🧑‍🌾', '', 'j'], ['cook', '🧑‍🍳', '', 'j'],
    ['hospital', '🏥', '', 'p'], ['bank', '🏦', '', 'p'], ['park', '🌳', '', 'p'], ['store', '🏪', '', 'p'],
    ['post office', '📮', '', 'p'], ['bakery', '🥖', '', 'p'], ['library', '📚', '', 'p'], ['school', '🏫', '', 'p'], ['fire station', '🚒', '', 'p'],
    ['left', '⬅️', 'v', 'd'], ['right', '➡️', 'v', 'd'], ['straight', '⬆️', 'v', 'd'],
  ],
  excl: [['🧑‍🚒', '🚒'], ['🧑‍⚕️', '🏥'], ['🧑‍🏫', '🏫']],
  tpls: [
    { k: 'j', f: (x) => `I see ${np(x)}.` }, { k: 'j', f: (x) => `The ${x.w} helps people.` }, { k: 'j', f: (x) => `I want to be ${np(x)}.` },
    { k: 'p', f: (x) => `Let's go to the ${x.w}.` }, { k: 'p', f: (x) => `Turn left at the ${x.w}.` }, { k: 'p', f: (x) => `The ${x.w} is on the right.` },
    { k: 'd', f: (x) => (x.w === 'straight' ? 'Go straight.' : `Turn ${x.w}.`) },
  ],
  count: true,
  dlg: [
    { s: 'Excuse me! Where is the bank?', a: 'It is next to the school.', w: ['It is a bank.', 'I am five years old.'] },
    { s: 'Excuse me, where is the library?', a: 'Turn left at the park.', w: ['It is a pencil.', 'I am a library.'] },
    { s: 'Thank you for your help!', a: 'No problem.', w: ['Goodbye, doctor.', 'It is a pencil.'] },
    { s: 'Where is the post office?', a: 'Go straight and turn right.', w: ['It is a post.', 'He is a farmer.'] },
    { s: 'Is the bakery on the left?', a: 'No, it is on the right.', w: ['Yes, it is a bakery.', 'No, it is a pencil.'] },
    { s: 'I am lost. Can you help me?', a: 'Yes. Where do you want to go?', w: ['It is a pencil.', 'My name is Sam.'] },
  ],
  qa: [
    { q: 'Who puts out fires?', a: 'A firefighter', w: ['A farmer', 'A cook'] },
    { q: 'Who helps sick people?', a: 'A doctor', w: ['A farmer', 'A police officer'] },
    { q: 'Who helps you learn at school?', a: 'A teacher', w: ['A cook', 'A firefighter'] },
    { q: 'Who grows food on a farm?', a: 'A farmer', w: ['A doctor', 'A teacher'] },
    { q: 'Who makes food in a restaurant?', a: 'A cook', w: ['A farmer', 'A police officer'] },
    { q: 'Who keeps us safe in the street?', a: 'A police officer', w: ['A cook', 'A teacher'] },
    { q: 'Where do you buy bread?', a: 'At the bakery', w: ['At the bank', 'At the hospital'] },
    { q: 'Where do you borrow books?', a: 'At the library', w: ['At the bakery', 'At the bank'] },
    { q: 'Where do you send a letter?', a: 'At the post office', w: ['At the park', 'At the bakery'] },
    { q: 'Where do you go when you are sick?', a: 'To the hospital', w: ['To the bakery', 'To the park'] },
    { q: 'The bank is next to the school. Where is the bank?', a: 'Next to the school', w: ['Next to the hospital', 'In the park'] },
  ],
  reads: [
    { id: 'a', text: "Sam wants to buy bread. He goes to the bakery. He turns left at the bank. The baker is kind. She gives Sam a big loaf of bread. 'Thank you!' says Sam. 'No problem,' says the baker.",
      qs: [{ q: 'Where does Sam go?', a: 'To the bakery', w: ['To the hospital', 'To the library'] }, { q: 'Where does he turn left?', a: 'At the bank', w: ['At the park', 'At the school'] }, { q: 'What does the baker say?', a: 'No problem', w: ['Goodbye', 'Excuse me'] }] },
    { id: 'b', text: "Ava is lost. She sees a police officer. 'Excuse me, where is the park?' she asks. 'Go straight. Turn right at the school,' says the police officer. Ava finds the park. She is happy.",
      qs: [{ q: 'Who helps Ava?', a: 'A police officer', w: ['A doctor', 'A farmer'] }, { q: 'Where does she turn right?', a: 'At the school', w: ['At the bank', 'At the library'] }, { q: 'How does Ava feel at the end?', a: 'Happy', w: ['Lost', 'Sad'] }] },
    { id: 'c', text: 'My neighbourhood has a hospital, a library and a store. The doctor works at the hospital. My mom works at the library. She helps children find books. The store is next to the library. I love my neighbourhood!',
      qs: [{ q: 'Where does the doctor work?', a: 'At the hospital', w: ['At the store', 'At the library'] }, { q: 'What is next to the library?', a: 'The store', w: ['The bank', 'The park'] }, { q: 'Who works at the library?', a: 'My mom', w: ['My dad', 'The doctor'] }] },
  ],
  extra: {
    1: [(R) => {
      const d = R.pick(DIRS);
      return { type: 'choice', key: 'k7:l1d:' + d, prompt: P.dir, say: say(dirSay(d)), options: DIRS.map((x) => ({ emoji: ARR[x] })), answer: DIRS.indexOf(d), cols: 3 };
    }],
    2: [(R) => {
      const d = R.pick(['left', 'right']);
      const [p, e] = R.pick(PLACES7);
      const s = `Turn ${d} at the ${p}.`;
      return { type: 'choice', key: 'k7:l2d:' + s, prompt: P.dir, say: say(s), stimulus: { emoji: e }, options: DIRS.map((x) => ({ emoji: ARR[x] })), answer: DIRS.indexOf(d), cols: 3 };
    }],
    3: [(R) => {
      const d = R.pick(['left', 'right']);
      const [p, e] = R.pick(PLACES7);
      const s = `Go straight. Turn ${d} at the ${p}.`;
      return { type: 'order', key: 'k7:l3d:' + s, prompt: P.order, say: say(s), stimulus: { emoji: ARR[d] + e }, tiles: s.split(' '), joiner: ' ' };
    }, (R) => {
      const d = R.pick(['left', 'right']);
      const o = d === 'left' ? 'right' : 'left';
      const truth = R.chance(0.5);
      const [p, e] = R.pick(PLACES7);
      const s = `Turn ${d} at the ${p}.`;
      return {
        type: 'choice', key: `k7:l3dt:${s}:${truth}`, prompt: { fr: 'Vrai ou faux? ' + s, en: 'True or false? ' + s }, say: say(s),
        stimulus: { emoji: ARR[truth ? d : o] + e }, options: [TRUE, FALSE], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    }],
  },
});

// =====================================================================
// k8 — Unit 8 "Summer Days": summer activities, days of the week
// =====================================================================
const k8 = build({
  id: 'k8', icon: '☀️', title: T('Unit 8', 'Summer Days'),
  pfeq: PF('unité 8', 'activités de l\'été, jours de la semaine'),
  vocab: [
    ['swim', '🏊', 'v'], ['ride a bike', '🚴', 'v'], ['play at the beach', '🏖️', 'v'], ['eat ice cream', '🍦', 'v'],
    ['go camping', '🏕️', 'v'], ['go fishing', '🎣', 'v'], ['fly a kite', '🪁', 'v'], ['go hiking', '🥾', 'v'],
    ['have a picnic', '🧺', 'v'], ['sail a boat', '⛵', 'v'], ['watch fireworks', '🎆', 'v'], ['pick berries', '🍓', 'v'],
  ],
  spell: [['sun', '☀️'], ['tent', '⛺'], ['shell', '🐚'], ['crab', '🦀'], ['fish', '🐟'], ['bike', '🚲'], ['flower', '🌻'], ['beach', '🏝️']],
  tpls: [
    (x) => `In summer, I ${x.w}.`, (x) => `Let's ${x.w}!`, (x) => `We ${x.w} in July.`,
  ],
  dlg: [
    { s: 'What do you do in summer?', a: 'I swim and ride my bike.', w: ['It is a pencil.', 'I am five years old.'] },
    { s: 'What day is it today?', a: 'It is Friday.', w: ['It is red.', 'I am five years old.'] },
    { s: 'Do you want to go to the beach?', a: 'Good idea!', w: ['Goodbye.', 'It is a pencil.'] },
    { s: 'It is hot! Do you want some ice cream?', a: 'Yes, please!', w: ['No, it is a kite.', 'My name is Sam.'] },
    { s: 'Are you ready for camping?', a: "Yes, I'm ready!", w: ['It is a tent.', 'Goodbye, camping.'] },
    { s: 'Hurry up! The fireworks start now.', a: 'Wow! I am coming!', w: ['It is a pencil.', 'My name is Sam.'] },
  ],
  qa: [
    { q: 'Which season has hot days and no school?', a: 'Summer', w: ['Winter', 'Fall'] },
    { q: 'What do you wear at the beach?', a: 'Shorts', w: ['Boots', 'Mittens'] },
    { q: 'What do you eat on a hot day?', a: 'Ice cream', w: ['Hot soup', 'Mittens'] },
    { q: 'Where do you swim?', a: 'In the water', w: ['In the snow', 'In a book'] },
    { q: 'What do you fly on a windy day?', a: 'A kite', w: ['A boat', 'A tent'] },
    { q: 'Where do you sleep when you go camping?', a: 'In a tent', w: ['In a bank', 'In a library'] },
    { q: 'What do you watch at night on Canada Day?', a: 'Fireworks', w: ['A kite', 'A boat'] },
    { q: 'You use a rod to catch a fish. What do you do?', a: 'Go fishing', w: ['Fly a kite', 'Go hiking'] },
    { q: 'You walk in the woods with good boots.', a: 'Go hiking', w: ['Sail a boat', 'Eat ice cream'] },
  ],
  reads: [
    { id: 'a', text: 'It is summer. On Saturday, Max and his dad go camping. They sleep in a tent. On Sunday they go fishing. Max catches a small fish. He is very happy.',
      qs: [{ q: 'What do they do on Saturday?', a: 'They go camping', w: ['They go fishing', 'They fly a kite'] }, { q: 'Where do they sleep?', a: 'In a tent', w: ['In a house', 'In a boat'] }, { q: 'What does Max catch?', a: 'A small fish', w: ['A big boat', 'A kite'] }] },
    { id: 'b', text: 'It is hot today. Mia and Zoe go to the beach. They swim in the water. Then they eat ice cream. Zoe wears a big hat. Mia has a blue towel.',
      qs: [{ q: 'Where do they go?', a: 'To the beach', w: ['To the library', 'To the bank'] }, { q: 'What do they eat?', a: 'Ice cream', w: ['Soup', 'Cheese'] }, { q: 'Who wears a hat?', a: 'Zoe', w: ['Mia', 'Mom'] }] },
    { id: 'c', text: 'My summer calendar. On Monday I ride my bike. On Wednesday I have a picnic. On Friday I go hiking. On Sunday I watch fireworks with my family.',
      qs: [{ q: 'What does the child do on Wednesday?', a: 'Has a picnic', w: ['Goes hiking', 'Rides a bike'] }, { q: 'When does the child go hiking?', a: 'On Friday', w: ['On Monday', 'On Sunday'] }, { q: 'What does the child do on Sunday?', a: 'Watches fireworks', w: ['Swims', 'Has a picnic'] }] },
  ],
  extra: {
    1: [(R) => {
      const i = R.int(0, 6);
      const o = R.sample(DAYS.filter((_, j) => j !== i), 2);
      return { type: 'choice', key: 'k8:l1d:' + DAYS[i], prompt: P.day, say: say(DAYS[i]), options: [DAYS[i], ...o].map((d) => ({ text: d, say: say(d) })), answer: 0, cols: 3 };
    }],
    2: [(R) => {
      const i = R.int(0, 6);
      const after = R.chance(0.5);
      const t = DAYS[(i + (after ? 1 : 6)) % 7];
      const q = after ? `What day comes after ${DAYS[i]}?` : `What day comes before ${DAYS[i]}?`;
      const o = R.sample(DAYS.filter((d) => d !== t && d !== DAYS[i]), 2);
      return { type: 'choice', key: 'k8:l2d:' + q, prompt: P.day, say: say(q), stimulus: { text: q }, options: [t, ...o].map((d) => ({ text: d })), answer: 0, cols: 3 };
    }, (R) => {
      const d = R.pick(DAYS);
      return { type: 'choice', key: 'k8:l2ds:' + d, prompt: P.spell2, say: say(d), options: [d, ...misspell(d, R)].map((text) => ({ text })), answer: 0, cols: 3 };
    }, (R) => {
      const d = R.pick(DAYS);
      return { type: 'order', key: 'k8:l2do:' + d, prompt: P.spell, say: say(d), tiles: d.split(''), joiner: '' };
    }],
    3: [(R) => {
      const i = R.int(0, 6);
      const tiles = [0, 1, 2].map((k) => DAYS[(i + k) % 7]);
      return { type: 'order', key: 'k8:l3do:' + tiles[0], prompt: P.days, stimulus: { text: `${tiles[0]} comes first.` }, tiles, joiner: ', ' };
    }, (R) => {
      const i = R.int(0, 6);
      const tomorrow = R.chance(0.5);
      const t = DAYS[(i + (tomorrow ? 1 : 6)) % 7];
      const q = tomorrow ? `Today is ${DAYS[i]}. Tomorrow is ...` : `Today is ${DAYS[i]}. Yesterday was ...`;
      const o = R.sample(DAYS.filter((d) => d !== t && d !== DAYS[i]), 2);
      return { type: 'choice', key: 'k8:l3dq:' + q, prompt: P.day, say: say(q), stimulus: { text: q }, options: [t, ...o].map((d) => ({ text: d })), answer: 0, cols: 3 };
    }, (R) => {
      const i = R.int(0, 6);
      const truth = R.chance(0.5);
      const next = truth ? DAYS[(i + 1) % 7] : R.pick(DAYS.filter((_, j) => j !== (i + 1) % 7 && j !== i));
      const s = `${next} comes after ${DAYS[i]}.`;
      return { type: 'choice', key: 'k8:l3dt:' + s, prompt: { fr: 'Vrai ou faux? ' + s, en: 'True or false? ' + s }, say: say(s), options: [TRUE, FALSE], answer: truth ? 0 : 1, fixedOrder: true, cols: 2 };
    }],
  },
});

// =====================================================================
// k9 — Farewell "Have Fun, Catch!" — review of everything
// =====================================================================
const UNITS = [k0, k1, k2, k3, k4, k5, k6, k7, k8];
const k9 = {
  id: 'k9', icon: '🎉', title: T('Farewell', 'Have Fun, Catch!'),
  pfeq: PF('adieux — révision', 'révision de la 2e année : vocabulaire et langage de la classe'),
  generate(level, R) {
    if (R.chance(0.2)) {
      const d = R.pick(COMMON);
      return { type: 'choice', key: 'k9:l' + level + 'd:' + d.s, prompt: P.reply, say: say(d.s), stimulus: { text: d.s }, options: [d.a, ...d.w].map((text) => ({ text })), answer: 0, cols: 1 };
    }
    return R.pick(UNITS).generate(level, R);
  },
  allSay() {
    const seen = new Map();
    for (const u of UNITS) for (const s of u.allSay()) seen.set(s.text, s);
    for (const d of COMMON) seen.set(d.s, say(d.s));
    return [...seen.values()];
  },
};

export const units = [k0, k1, k2, k3, k4, k5, k6, k7, k8, k9];
