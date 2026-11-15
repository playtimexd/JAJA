// English as a Second Language (Cycle One, core program) for Petit Hibou.
// Listening / oral comprehension first: nearly every question is spoken (TTS en-CA)
// and answered with emoji pictures. Units e1..e18, 3 levels each.
// Instructions are {fr, en}; the English targets are plain strings spoken with `say` (en-CA).

const EN = 'en-CA';
const say = (text) => ({ text, lang: EN });

// ---------- instructions (bilingual) ----------
const P = {
  tap: { fr: 'Écoute. Touche la bonne image.', en: 'Listen. Tap the right picture.' },
  word: { fr: 'Qu\'est-ce que c\'est? Touche le mot.', en: 'What is this? Tap the word.' },
  yn: { fr: 'Écoute. Oui ou non?', en: 'Listen. Yes or no?' },
  tf: { fr: 'Écoute. Est-ce que ça va avec l\'image?', en: 'Listen. Does it match the picture?' },
  order: { fr: 'Écoute. Remets les mots dans l\'ordre.', en: 'Listen. Put the words in order.' },
  odd: { fr: 'Laquelle est différente?', en: 'Which one is different?' },
  not: { fr: 'Laquelle n\'est PAS comme les autres?', en: 'Which one is NOT like the others?' },
  ans: { fr: 'Écoute. Choisis la bonne réponse.', en: 'Listen. Choose the right answer.' },
  sort: { fr: 'Écoute. Place chaque image dans la bonne boîte.', en: 'Listen. Put each picture in the right box.' },
  sortW: { fr: 'Écoute. Place chaque mot dans la bonne boîte.', en: 'Listen. Put each word in the right box.' },
  num: { fr: 'Écoute. Touche le bon nombre.', en: 'Listen. Tap the right number.' },
  count: { fr: 'Compte. Combien y en a-t-il?', en: 'Count. How many?' },
  day: { fr: 'Écoute. Touche le bon jour.', en: 'Listen. Tap the right day.' },
  month: { fr: 'Écoute. Touche le bon mois.', en: 'Listen. Tap the right month.' },
  say: { fr: 'Que dis-tu?', en: 'What do you say?' },
  reply: { fr: 'Écoute. Que réponds-tu?', en: 'Listen. What do you answer?' },
  phrase: { fr: 'Écoute. Construis la phrase.', en: 'Listen. Build the phrase.' },
  clock: { fr: 'Écoute. Touche la bonne horloge.', en: 'Listen. Tap the right clock.' },
  where: { fr: 'Où est-ce? Touche la bonne réponse.', en: 'Where is it? Tap the answer.' },
};

// ---------- helpers ----------
// Row: [word, emoji, altEmoji?, flag?, kind?]   flag: 'p' plural, 'x' no article (mass noun)
const V = (rows) => rows.map(([w, e, alt, f, k]) => ({ w, e, alt: alt || undefined, f: f || '', k: k || '' }));
const clash = (excl, a, b) => a === b || excl.some((g) => g.includes(a) && g.includes(b));
const dist = (R, pool, target, n, excl) =>
  R.sample(pool.filter((x) => !clash(excl, x.e, target.e)), n);
const art = (w) => (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w;
const np = (x) => (x.f ? x.w : art(x.w));
const thisIs = (x) => (x.f === 'p' ? 'These are ' : 'This is ') + np(x);
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const the = (x) => (x.f === 'n' ? x.w : 'the ' + x.w);
const km = (t, v) => !t.k || (Array.isArray(t.k) ? t.k.includes(v.k) : v.k === t.k);
const YES = { text: 'Yes', emoji: '✅', say: say('Yes') };
const NO = { text: 'No', emoji: '❌', say: say('No') };
const words = (arr) => arr.map((w) => ({ text: w, say: say(w) }));

const DEFAULT_FIND = [
  (x) => `Find the ${x.w}`, (x) => `Where is the ${x.w}?`,
  (x) => `Show me the ${x.w}`, (x) => `Touch the ${x.w}`,
];

// Standard generators built from a config:
// { vocab, excl, sorts, sentences, tpl, find, yn, qa, qaPool, asks, x1, x2, x3 }
function std(cfg) {
  const excl = cfg.excl || [];
  const vocab = cfg.vocab;
  const byWord = Object.fromEntries(vocab.map((x) => [x.w, x]));
  const finds = cfg.find || DEFAULT_FIND;
  const yn = cfg.yn || ((x) => (x.f === 'p' ? `Are these ${x.w}?` : `Is this ${np(x)}?`));
  const tpls = cfg.tpl || [];
  const sorts = cfg.sorts || [];
  const lookup = (m) => (typeof m === 'string' ? byWord[m] : { e: m[0], w: m[1] });

  // ----- level 1 -----
  const l1a = (R) => {
    const t = R.pick(vocab);
    const useAlt = !!t.alt && R.chance(0.5);
    const em = (x) => (useAlt && x.alt ? x.alt : x.e);
    const opts = [t, ...dist(R, vocab, t, R.chance(0.35) ? 1 : 2, excl)].map((x) => ({ emoji: em(x) }));
    return {
      type: 'choice', key: (useAlt ? 'l1b:' : 'l1a:') + t.w, prompt: P.tap, say: say(t.w),
      options: opts, answer: 0, cols: opts.length,
    };
  };
  const l1f = (R) => {
    const t = R.pick(vocab);
    const s = R.pick(finds)(t);
    const opts = [t, ...dist(R, vocab, t, 2, excl)].map((x) => ({ emoji: x.e }));
    return { type: 'choice', key: 'l1f:' + s, prompt: P.tap, say: say(s), options: opts, answer: 0, cols: 3 };
  };
  const l1y = (R) => {
    const t = R.pick(vocab);
    const truth = R.chance(0.5);
    const shown = truth ? t : R.pick(vocab.filter((v) => !clash(excl, v.e, t.e)));
    const s = yn(t);
    return {
      type: 'choice', key: 'l1y:' + s + ':' + shown.e, prompt: P.yn, say: say(s),
      stimulus: { emoji: shown.e }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
    };
  };

  // ----- level 2 -----
  const l2a = (R) => {
    const t = R.pick(vocab);
    const opts = [t, ...dist(R, vocab, t, 3, excl)].map((x) => ({ emoji: x.e }));
    return { type: 'choice', key: 'l2a:' + t.w, prompt: P.tap, say: say(t.w), options: opts, answer: 0, cols: 2 };
  };
  const l2b = (R) => {
    const t = R.pick(vocab);
    const opts = [t, ...dist(R, vocab, t, 2, excl)].map((x) => ({ text: x.w, say: say(x.w) }));
    return {
      type: 'choice', key: 'l2b:' + t.w, prompt: P.word, say: say('What is this?'),
      stimulus: { emoji: t.e }, options: opts, answer: 0, cols: 3,
    };
  };
  const l2f = (R) => {
    const t = R.pick(vocab);
    const s = R.pick(finds)(t);
    const opts = [t, ...dist(R, vocab, t, 3, excl)].map((x) => ({ emoji: x.e }));
    return { type: 'choice', key: 'l2f:' + s, prompt: P.tap, say: say(s), options: opts, answer: 0, cols: 2 };
  };
  const sortGen = (tag, lo, hi) => (R) => {
    const si = R.int(0, sorts.length - 1);
    const S = sorts[si];
    const items = [];
    const names = [];
    S.groups.forEach((g, bi) => {
      const n = R.int(lo, Math.min(hi, g.length));
      R.sample(g, n).forEach((m) => {
        const it = lookup(m);
        items.push({ emoji: it.e, say: say(it.w), bin: bi });
        names.push(it.w);
      });
    });
    return {
      type: 'sort', key: tag + si + ':' + names.sort().join(','),
      prompt: P.sort, say: say(S.say || 'Sort the pictures.'),
      bins: S.bins.map(({ text, emoji }) => ({ text, emoji })), items: R.shuffle(items),
    };
  };
  const l2c = sortGen('l2c:', 2, 4);
  const l3c = sortGen('l3c:', 3, 4);

  // odd one out: 3 from one group + 1 from another
  const oddSorts = sorts.filter((S) => S.groups.some((g) => g.length >= 3));
  const oddGen = (tag, useNot) => (R) => {
    const S = R.pick(oddSorts);
    const ia = R.pick(S.groups.map((g, i) => [g, i]).filter(([g]) => g.length >= 3))[1];
    const ib = R.pick(S.groups.map((g, i) => i).filter((i) => i !== ia));
    const a = R.sample(S.groups[ia], 3).map(lookup);
    const b = lookup(R.pick(S.groups[ib]));
    const not = useNot && S.bins[ia].not;
    const s = not ? `Which one is not ${not}?` : 'Which one is different?';
    return {
      type: 'choice', key: tag + [...a, b].map((x) => x.w).sort().join(','),
      prompt: not ? P.not : P.odd, say: say(s), options: [b, ...a].map((x) => ({ emoji: x.e })),
      answer: 0, cols: 2,
    };
  };
  const l2d = oddSorts.length ? oddGen('l2d:', true) : null;
  const l3n = oddSorts.length ? oddGen('l3n:', true) : null;

  // ----- level 3 -----
  const fixedPic = (cfg.sentences || []).filter((s) => s.pic);
  const pickSent = (R, needPic) => {
    const useTpl = tpls.length && (!fixedPic.length || R.chance(0.7));
    if (useTpl) {
      const t = R.pick(tpls);
      const cands = vocab.filter((v) => km(t, v));
      const x = R.pick(cands);
      return { s: t.f(x), pic: x.e, x, t, cands };
    }
    const s = needPic || R.chance(0.7) ? R.pick(fixedPic) : R.pick(cfg.sentences);
    return { s: s.s, pic: s.pic, extra: s.x };
  };
  const l3p = (R) => {
    const p = pickSent(R, true);
    const pool = p.x ? vocab : fixedPic.map((x) => ({ e: x.pic }));
    const wrong = dist(R, pool, { e: p.pic }, 2, excl);
    return {
      type: 'choice', key: 'l3p:' + p.s, prompt: P.tap, say: say(p.s),
      options: [{ emoji: p.pic }, ...wrong.map((x) => ({ emoji: x.e }))], answer: 0, cols: 3,
    };
  };
  const l3o = (R) => {
    let p = pickSent(R, false);
    for (let i = 0; i < 6 && p.s.split(' ').length < 2; i++) p = pickSent(R, false);
    const q = {
      type: 'order', key: 'l3o:' + p.s, prompt: P.order, say: say(p.s), tiles: p.s.split(' '), joiner: ' ',
    };
    if (p.pic) q.stimulus = { emoji: p.pic };
    if (p.extra) q.extra = p.extra;
    return q;
  };
  const l3tf = (R) => {
    const t = R.pick(tpls);
    const cands = vocab.filter((v) => km(t, v));
    const x = R.pick(cands);
    const alts = cands.filter((v) => !clash(excl, v.e, x.e));
    const truth = !alts.length || R.chance(0.5);
    const y = truth ? x : R.pick(alts);
    const s = t.f(y);
    return {
      type: 'choice', key: 'l3t:' + s + ':' + x.e, prompt: P.tf, say: say(s),
      stimulus: { emoji: x.e }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
    };
  };
  const qaList = cfg.qa || [];
  const l3q = (R) => {
    const [pic, q, a, wr] = R.pick(qaList);
    const pool = (wr || cfg.qaPool || []).filter((w) => w !== a);
    const opts = words([a, ...R.sample(pool, 2)]);
    const out = { type: 'choice', key: 'qa:' + q + ':' + a, prompt: P.ans, say: say(q), options: opts, answer: 0, cols: 3 };
    if (pic) out.stimulus = { emoji: pic };
    return out;
  };
  const asks = cfg.asks || [];
  const l3k = (R) => {
    const a = R.pick(asks);
    const cands = vocab.filter((v) => !a.k || v.k === a.k);
    const x = R.pick(cands);
    let wp = cands.filter((v) => !clash(excl, v.e, x.e));
    if (wp.length < 2) wp = wp.concat(vocab.filter((v) => !wp.includes(v) && !clash(excl, v.e, x.e) && v.k !== x.k));
    const wrong = R.sample(wp, 2);
    return {
      type: 'choice', key: 'ask:' + a.q + ':' + x.w, prompt: P.ans, say: say(a.q),
      stimulus: { emoji: x.e }, options: words([x.w, ...wrong.map((v) => v.w)]), answer: 0, cols: 3,
    };
  };

  const g1 = [l1a, l1f, l1y, ...(cfg.x1 || [])];
  const g2 = [l2a, l2b, ...(sorts.length ? [l2c] : []), l2f, ...(l2d ? [l2d] : []), ...(cfg.x2 || [])];
  const g3 = [l3p, l3o, ...(tpls.length ? [l3tf] : []), ...(sorts.length ? [l3c] : []),
    ...(l3n ? [l3n] : []), ...(qaList.length ? [l3q, l3q] : []), ...(asks.length ? [l3k] : []),
    ...(cfg.x3 || [])];
  return { 1: g1, 2: g2, 3: g3 };
}

function unit(id, icon, title, pfeq, gens) {
  return {
    id, icon, title, pfeq,
    generate(level, R) {
      const list = gens[level] || gens[1];
      return R.pick(list)(R);
    },
  };
}

const PFEQ = 'English as a Second Language, Cycle One (core) — ';

// shared snippets
const TOD_POOL = ['morning', 'afternoon', 'evening', 'night'];

// ---------- e1 Hello! (greetings & feelings) ----------
const e1Gens = std({
  vocab: V([
    ['hello', '👋', 0, 'x', 'g'], ['good morning', '🌅', 0, 'x', 'g'], ['good afternoon', '🌞', 0, 'x', 'g'],
    ['good evening', '🌆', 0, 'x', 'g'], ['good night', '🌙', 0, 'x', 'g'],
    ['happy', '😀', 0, '', 'f'], ['sad', '😢', 0, '', 'f'], ['tired', '😴', 0, '', 'f'],
    ['angry', '😠', 0, '', 'f'], ['scared', '😱', 0, '', 'f'], ['sick', '🤒', 0, '', 'f'],
    ['hot', '🥵', 0, '', 'f'], ['cold', '🥶', 0, '', 'f'], ['surprised', '😲', 0, '', 'f'],
    ['excited', '🤩', 0, '', 'f'], ['silly', '🤪', 0, '', 'f'], ['cool', '😎', 0, '', 'f'],
    ['worried', '😟', 0, '', 'f'], ['confused', '😕', 0, '', 'f'], ['laughing', '😂', 0, '', 'f'],
    ['crying', '😭', 0, '', 'f'], ['sneezing', '🤧', 0, '', 'f'], ['dizzy', '😵', 0, '', 'f'],
    ['embarrassed', '😳', 0, '', 'f'], ['nervous', '😬', 0, '', 'f'], ['thinking', '🤔', 0, '', 'f'],
    ['sorry', '😔', 0, '', 'f'],
  ]),
  excl: [
    ['😀', '🤩', '🤪', '😎', '😂'], ['😱', '😲', '😳', '😬', '😵', '😟'], ['🥵', '🥶', '🤒', '🤧'],
    ['😢', '😭', '😔', '😟', '😕'], ['😠', '😕'], ['😴', '😵'], ['😕', '🤔', '😟'],
  ],
  find: [
    (x) => (x.k === 'f' ? `Who is ${x.w}?` : `${cap(x.w)}!`),
    (x) => (x.k === 'f' ? `Find the ${x.w} face` : `Tap ${x.w}`),
  ],
  yn: (x) => (x.k === 'f' ? `Is he ${x.w}?` : `Is this ${x.w}?`),
  tpl: [
    { f: (x) => `I am ${x.w}`, k: 'f' }, { f: (x) => `He is ${x.w}`, k: 'f' },
    { f: (x) => `She is ${x.w}`, k: 'f' },
    { f: (x) => `${cap(x.w)}, teacher!`, k: 'g' }, { f: (x) => `Say ${x.w} to your friend`, k: 'g' },
  ],
  asks: [{ q: 'How does he feel?', k: 'f' }, { q: 'How does she feel?', k: 'f' }, { q: 'How do you feel?', k: 'f' }],
  qa: [
    ['🌅', 'What do you say in the morning?', 'good morning', ['good night', 'good evening', 'goodbye']],
    ['🌙', 'What do you say at bedtime?', 'good night', ['good morning', 'good afternoon', 'hello']],
    ['👋', 'What do you say to a friend?', 'hello', ['good night', 'sorry', 'good evening']],
    ['🌆', 'What do you say in the evening?', 'good evening', ['good morning', 'good night', 'hello']],
  ],
  sorts: [
    {
      bins: [{ text: 'Feels good', emoji: '😀', not: 'a good feeling' }, { text: 'Feels bad', emoji: '😢', not: 'a bad feeling' }],
      groups: [['happy', 'excited', 'silly', 'cool', 'laughing'], ['sad', 'angry', 'scared', 'sick', 'worried', 'crying']],
      say: 'Listen. Sort the feelings.',
    },
    {
      bins: [{ text: 'Body feelings', emoji: '🤒', not: 'a body feeling' }, { text: 'Heart feelings', emoji: '❤️', not: 'a heart feeling' }],
      groups: [['tired', 'sick', 'hot', 'cold', 'sneezing', 'dizzy'], ['happy', 'sad', 'angry', 'scared', 'excited', 'nervous']],
      say: 'Listen. Sort the feelings.',
    },
  ],
  sentences: [
    { s: 'I am happy', pic: '😀' }, { s: 'I am sad', pic: '😢' }, { s: 'I am tired', pic: '😴' },
    { s: 'I am angry', pic: '😠' }, { s: 'I am scared', pic: '😱' }, { s: 'I am sick', pic: '🤒' },
    { s: 'I am hot', pic: '🥵' }, { s: 'I am cold', pic: '🥶' }, { s: 'I am excited', pic: '🤩' },
    { s: 'Good morning', pic: '🌅' }, { s: 'Good night', pic: '🌙' },
    { s: 'Hello! How are you?' }, { s: 'I am fine, thank you' }, { s: 'Good morning, teacher' },
    { s: 'What is your name?' }, { s: 'My name is Hibou' }, { s: 'Nice to meet you' },
    { s: 'See you tomorrow' }, { s: 'How are you today?' }, { s: 'I am very happy today' },
  ],
});

// ---------- e2 Colours ----------
const SW = (c) =>
  `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" role="img"><circle cx="20" cy="20" r="17" fill="${c}" stroke="#2b2d42" stroke-width="2"/></svg>`;
const COLS = [
  { w: 'red', e: '🔴', alt: '🟥' }, { w: 'blue', e: '🔵', alt: '🟦' }, { w: 'green', e: '🟢', alt: '🟩' },
  { w: 'yellow', e: '🟡', alt: '🟨' }, { w: 'orange', e: '🟠', alt: '🟧' }, { w: 'purple', e: '🟣', alt: '🟪' },
  { w: 'brown', e: '🟤', alt: '🟫' }, { w: 'black', e: '⚫', alt: '⬛' }, { w: 'white', e: '⚪', alt: '⬜' },
  { w: 'pink', svg: SW('#ff8fb8') }, { w: 'grey', svg: SW('#9aa0a6') },
];
const cface = (c, useAlt) => (c.svg ? { svg: c.svg } : { emoji: useAlt && c.alt ? c.alt : c.e });
// [emoji, name, colour, plural?]
const OBJS = [
  ['🍎', 'apple', 'red'], ['🍓', 'strawberry', 'red'], ['🌹', 'rose', 'red'], ['🚒', 'fire truck', 'red'],
  ['🍒', 'cherries', 'red', 1], ['🍅', 'tomato', 'red'],
  ['🍌', 'banana', 'yellow'], ['🌻', 'sunflower', 'yellow'], ['🐥', 'chick', 'yellow'], ['🍋', 'lemon', 'yellow'],
  ['⭐', 'star', 'yellow'],
  ['🐳', 'whale', 'blue'], ['🫐', 'blueberries', 'blue', 1], ['👖', 'jeans', 'blue', 1], ['🌊', 'wave', 'blue'],
  ['🐸', 'frog', 'green'], ['🥦', 'broccoli', 'green'], ['🐢', 'turtle', 'green'], ['🥒', 'cucumber', 'green'], ['🌲', 'tree', 'green'],
  ['🥕', 'carrot', 'orange'], ['🍊', 'orange', 'orange'], ['🎃', 'pumpkin', 'orange'], ['🦊', 'fox', 'orange'],
  ['🍇', 'grapes', 'purple', 1], ['🍆', 'eggplant', 'purple'], ['🔮', 'crystal ball', 'purple'],
  ['🐻', 'bear', 'brown'], ['🍫', 'chocolate', 'brown'], ['🌰', 'chestnut', 'brown'], ['🥔', 'potato', 'brown'],
  ['🐈‍⬛', 'cat', 'black'], ['🕷️', 'spider', 'black'], ['🦇', 'bat', 'black'], ['🎱', 'eight ball', 'black'],
  ['☁️', 'cloud', 'white'], ['🐇', 'rabbit', 'white'], ['⛄', 'snowman', 'white'], ['🥚', 'egg', 'white'],
  ['🦢', 'swan', 'white'],
  ['🐷', 'pig', 'pink'], ['🌸', 'blossom', 'pink'], ['🦩', 'flamingo', 'pink'],
  ['🐘', 'elephant', 'grey'], ['🪨', 'rock', 'grey'], ['🐭', 'mouse', 'grey'],
].map(([e, n, c, p]) => ({ e, n, c, p: !!p }));
const colByName = Object.fromEntries(COLS.map((c) => [c.w, c]));
const objsOf = (c) => OBJS.filter((o) => o.c === c);
const be = (o) => (o.p ? 'are' : 'is');
const rich = COLS.filter((c) => objsOf(c.w).length >= 2);
const colorFacts = [
  ['red', 'yellow', 'orange'], ['blue', 'yellow', 'green'], ['red', 'blue', 'purple'],
  ['red', 'white', 'pink'], ['black', 'white', 'grey'], ['red', 'green', 'brown'],
];
const others = (R, c, n) => R.sample(COLS.filter((x) => x.w !== c.w), n);
const e2Gens = {
  1: [
    (R) => {
      const c = R.pick(COLS);
      const alt = !!c.alt && R.chance(0.5);
      const opts = [c, ...others(R, c, R.chance(0.35) ? 1 : 2)].map((x) => cface(x, alt));
      return { type: 'choice', key: 'c1a:' + c.w + (alt ? 'b' : 'a'), prompt: P.tap, say: say(c.w), options: opts, answer: 0, cols: opts.length };
    },
    (R) => {
      const c = R.pick(rich);
      const t = R.pick(objsOf(c.w));
      const wrong = R.sample(OBJS.filter((o) => o.c !== c.w), 2);
      return {
        type: 'choice', key: 'c1b:' + c.w + ':' + t.n, prompt: P.tap, say: say(R.pick([`Find something ${c.w}`, `Tap something ${c.w}`])),
        options: [t, ...wrong].map((o) => ({ emoji: o.e })), answer: 0, cols: 3,
      };
    },
    (R) => {
      const o = R.pick(OBJS);
      const truth = R.chance(0.5);
      const c = truth ? colByName[o.c] : R.pick(COLS.filter((x) => x.w !== o.c));
      const s = `${o.p ? 'Are' : 'Is'} the ${o.n} ${c.w}?`;
      return {
        type: 'choice', key: 'c1y:' + o.n + ':' + c.w, prompt: P.yn, say: say(s),
        stimulus: { emoji: o.e }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
  ],
  2: [
    (R) => {
      const c = R.pick(COLS);
      return {
        type: 'choice', key: 'c2a:' + c.w, prompt: P.tap, say: say(c.w),
        options: [c, ...others(R, c, 3)].map((x) => cface(x, false)), answer: 0, cols: 2,
      };
    },
    (R) => {
      const o = R.pick(OBJS);
      const c = colByName[o.c];
      return {
        type: 'choice', key: 'c2b:' + o.n, prompt: P.word, say: say('What colour is it?'),
        stimulus: { emoji: o.e }, options: words([c.w, ...others(R, c, 2).map((x) => x.w)]), answer: 0, cols: 3,
      };
    },
    (R) => {
      const c = R.pick(rich);
      const t = R.pick(objsOf(c.w));
      const wrong = R.sample(OBJS.filter((o) => o.c !== c.w), 3);
      return {
        type: 'choice', key: 'c2d:' + c.w + ':' + t.n, prompt: P.tap, say: say(`Tap the ${c.w} one`),
        options: [t, ...wrong].map((o) => ({ emoji: o.e })), answer: 0, cols: 2,
      };
    },
    (R) => {
      const [a, b] = R.sample(rich, 2);
      const A = R.sample(objsOf(a.w), R.int(2, Math.min(4, objsOf(a.w).length)));
      const B = R.sample(objsOf(b.w), R.int(2, Math.min(4, objsOf(b.w).length)));
      return {
        type: 'sort', key: 'c2c:' + [...A, ...B].map((o) => o.n).sort().join(','),
        prompt: P.sort, say: say('Listen. Sort by colour.'),
        bins: [{ text: a.w, emoji: a.e || '' }, { text: b.w, emoji: b.e || '' }].map((x) => (x.emoji ? x : { text: x.text })),
        items: R.shuffle([...A.map((o) => ({ emoji: o.e, say: say(o.n), bin: 0 })), ...B.map((o) => ({ emoji: o.e, say: say(o.n), bin: 1 }))]),
      };
    },
  ],
  3: [
    (R) => {
      const o = R.pick(OBJS);
      const wrong = R.sample(OBJS.filter((x) => x.c !== o.c), 2);
      const s = `The ${o.n} ${be(o)} ${o.c}`;
      return { type: 'choice', key: 'c3p:' + s, prompt: P.tap, say: say(s), options: [o, ...wrong].map((x) => ({ emoji: x.e })), answer: 0, cols: 3 };
    },
    (R) => {
      const o = R.pick(OBJS);
      const s = R.pick([`The ${o.n} ${be(o)} ${o.c}`, `I see ${o.p ? '' : (/^[aeiou]/.test(o.c) ? 'an ' : 'a ')}${o.c} ${o.n}`]);
      return { type: 'order', key: 'c3o:' + s, prompt: P.order, say: say(s), stimulus: { emoji: o.e }, tiles: s.split(' '), joiner: ' ' };
    },
    (R) => {
      const o = R.pick(OBJS);
      const q = `What colour ${be(o)} the ${o.n}?`;
      return {
        type: 'choice', key: 'c3q:' + o.n, prompt: P.ans, say: say(q), stimulus: { emoji: o.e },
        options: words([o.c, ...others(R, colByName[o.c], 2).map((x) => x.w)]), answer: 0, cols: 3,
      };
    },
    (R) => {
      const o = R.pick(OBJS);
      const truth = R.chance(0.5);
      const c = truth ? o.c : R.pick(COLS.filter((x) => x.w !== o.c)).w;
      const s = `The ${o.n} ${be(o)} ${c}`;
      return {
        type: 'choice', key: 'c3t:' + o.n + ':' + c, prompt: P.tf, say: say(s), stimulus: { emoji: o.e },
        options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
    (R) => {
      const c = R.pick(rich.filter((x) => objsOf(x.w).length >= 3));
      const A = R.sample(objsOf(c.w), 3);
      const b = R.pick(OBJS.filter((o) => o.c !== c.w));
      return {
        type: 'choice', key: 'c3n:' + c.w + ':' + [...A, b].map((o) => o.n).sort().join(','), prompt: P.not,
        say: say(`Which one is not ${c.w}?`), options: [b, ...A].map((o) => ({ emoji: o.e })), answer: 0, cols: 2,
      };
    },
    (R) => {
      const [a, b, c] = R.pick(colorFacts);
      const s = `${cap(a)} and ${b} make ${c}`;
      const wrong = R.sample(COLS.filter((x) => x.w !== c && x.w !== a && x.w !== b), 2);
      return {
        type: 'choice', key: 'c3m:' + s, prompt: P.ans, say: say(`${cap(a)} and ${b} make…`),
        stimulus: { text: `${a} + ${b}` }, options: words([c, ...wrong.map((x) => x.w)]), answer: 0, cols: 3,
      };
    },
  ],
};

// ---------- e3 Numbers 1-20 ----------
const NUMW = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen',
  'nineteen', 'twenty'];
const COUNTABLE = [
  ['⭐', 'stars'], ['🍎', 'apples'], ['🎈', 'balloons'], ['🍪', 'cookies'],
  ['🐥', 'chicks'], ['🌸', 'flowers'], ['🦋', 'butterflies'], ['⚽', 'balls'],
];
const numOpt = (n) => ({ text: String(n), say: say(NUMW[n]) });
const otherNums = (R, n, lo, hi, k) => {
  const pool = [];
  for (let i = lo; i <= hi; i++) if (i !== n) pool.push(i);
  return R.sample(pool, k);
};
const e3Gens = {
  1: [
    (R) => {
      const n = R.int(1, 20);
      const opts = [n, ...otherNums(R, n, 1, 20, R.chance(0.35) ? 1 : 2)].map(numOpt);
      return {
        type: 'choice', key: 'n1:' + n, prompt: P.num, say: say(NUMW[n]),
        options: opts.map((o) => ({ text: o.text })), answer: 0, cols: opts.length,
      };
    },
    (R) => {
      const n = R.int(1, 6);
      const [e, name] = R.pick(COUNTABLE);
      const wrong = otherNums(R, n, 1, 8, 2);
      return {
        type: 'choice', key: 'n1b:' + n + e, prompt: P.tap, say: say(NUMW[n] + ' ' + (n === 1 ? name.replace(/ies$/, 'y').replace(/s$/, '') : name)),
        options: [n, ...wrong].map((k) => ({ emoji: e.repeat(k) })), answer: 0, cols: 3,
      };
    },
    (R) => {
      const n = R.int(1, 20);
      const truth = R.chance(0.5);
      const k = truth ? n : R.pick(otherNums(R, n, 1, 20, 4));
      return {
        type: 'choice', key: 'n1y:' + n + ':' + k, prompt: P.yn, say: say(`Is this ${NUMW[n]}?`),
        stimulus: { text: String(k) }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
    (R) => {
      const n = R.int(1, 6);
      const [e] = R.pick(COUNTABLE);
      return {
        type: 'choice', key: 'n1c:' + n + e, prompt: P.count, say: say('How many?'),
        stimulus: { emojis: e, count: n }, options: [n, ...otherNums(R, n, 1, 8, 2)].map(numOpt), answer: 0, cols: 3,
      };
    },
  ],
  2: [
    (R) => {
      const n = R.int(1, 20);
      const opts = [n, ...otherNums(R, n, 1, 20, 3)].map((x) => ({ text: String(x) }));
      return { type: 'choice', key: 'n2a:' + n, prompt: P.num, say: say(NUMW[n]), options: opts, answer: 0, cols: 2 };
    },
    (R) => {
      const n = R.int(1, 12);
      const [e] = R.pick(COUNTABLE);
      const opts = [n, ...otherNums(R, n, 1, 14, 3)].map(numOpt);
      return {
        type: 'choice', key: 'n2b:' + n + e, prompt: P.count, say: say('How many?'),
        stimulus: { emojis: e, count: n }, options: opts, answer: 0, cols: 2,
      };
    },
    (R) => {
      const lo = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], R.int(2, 3));
      const hi = R.sample([11, 12, 13, 14, 15, 16, 17, 18, 19, 20], R.int(2, 3));
      const items = [
        ...lo.map((n) => ({ text: String(n), say: say(NUMW[n]), bin: 0 })),
        ...hi.map((n) => ({ text: String(n), say: say(NUMW[n]), bin: 1 })),
      ];
      return {
        type: 'sort', key: 'n2c:' + [...lo, ...hi].sort((a, b) => a - b).join(','),
        prompt: P.sortW, say: say('Listen. Sort the numbers.'),
        bins: [{ text: '1 to 10' }, { text: '11 to 20' }], items: R.shuffle(items),
      };
    },
    (R) => {
      const n = R.int(2, 19);
      const next = R.chance(0.5);
      const ans = next ? n + 1 : n - 1;
      const wrong = otherNums(R, ans, 1, 20, 6).filter((k) => k !== n).slice(0, 2);
      return {
        type: 'choice', key: 'n2d:' + n + next, prompt: P.ans,
        say: say(next ? `What number comes after ${NUMW[n]}?` : `What number comes before ${NUMW[n]}?`),
        stimulus: { text: String(n) }, options: [ans, ...wrong].map(numOpt), answer: 0, cols: 3,
      };
    },
  ],
  3: [
    (R) => {
      const n = R.int(2, 10);
      const [e, name] = R.pick(COUNTABLE);
      const wrong = otherNums(R, n, 1, 12, 2);
      return {
        type: 'choice', key: 'n3a:' + n + e, prompt: P.tap, say: say('I see ' + NUMW[n] + ' ' + name),
        options: [n, ...wrong].map((k) => ({ emoji: e.repeat(k) })), answer: 0, cols: 3,
      };
    },
    (R) => {
      const s = R.int(1, 17);
      const seq = [s, s + 1, s + 2, s + 3];
      return {
        type: 'order', key: 'n3b:' + s, prompt: P.order, say: say(seq.map((k) => NUMW[k]).join(', ')),
        tiles: seq.map(String), joiner: ' ',
      };
    },
    (R) => {
      const n = R.int(11, 20);
      const [e] = R.pick(COUNTABLE);
      return {
        type: 'keypad', key: 'n3c:' + n + e, prompt: P.count, say: say('How many?'),
        stimulus: { emojis: e, count: n }, answer: n,
      };
    },
    (R) => {
      const a = R.int(1, 9), b = R.int(1, 10);
      return {
        type: 'choice', key: 'n3d:' + a + '+' + b, prompt: P.ans, say: say(`${cap(NUMW[a])} and ${NUMW[b]} make…`),
        stimulus: { text: `${a} + ${b}` }, options: [a + b, ...otherNums(R, a + b, Math.max(1, a + b - 3), a + b + 3, 2)].map(numOpt),
        answer: 0, cols: 3,
      };
    },
    (R) => {
      const a = R.int(2, 18);
      const big = a + R.int(1, 2);
      const small = R.sample([a - 1, a - 2, a].filter((x) => x >= 1), 2);
      return {
        type: 'choice', key: 'n3e:' + a + ':' + big, prompt: P.ans, say: say(`Which number is bigger than ${NUMW[a]}?`),
        options: [big, ...small].map(numOpt), answer: 0, cols: 3,
      };
    },
  ],
};
// ---------- e4 Animals ----------
const SOUNDS = ['meow', 'woof', 'moo', 'quack', 'oink', 'baa', 'hoot', 'roar', 'cluck', 'neigh', 'ribbit', 'buzz', 'squeak', 'hiss'];
const e4Gens = std({
  vocab: V([
    ['cat', '🐱'], ['dog', '🐶'], ['bird', '🐦'], ['fish', '🐟'], ['rabbit', '🐰'],
    ['horse', '🐴'], ['cow', '🐮'], ['pig', '🐷'], ['duck', '🦆'], ['frog', '🐸'],
    ['mouse', '🐭'], ['sheep', '🐑'], ['lion', '🦁'], ['elephant', '🐘'], ['monkey', '🐵'],
    ['bear', '🐻'], ['owl', '🦉'], ['snake', '🐍'], ['turtle', '🐢'], ['butterfly', '🦋'],
    ['tiger', '🐯'], ['giraffe', '🦒'], ['zebra', '🦓'], ['penguin', '🐧'], ['chicken', '🐔'],
    ['whale', '🐳'], ['dolphin', '🐬'], ['shark', '🦈'], ['octopus', '🐙'], ['bee', '🐝'],
    ['spider', '🕷️'], ['ant', '🐜'], ['crab', '🦀'], ['fox', '🦊'], ['wolf', '🐺'],
    ['deer', '🦌'], ['kangaroo', '🦘'], ['panda', '🐼'], ['camel', '🐫'], ['goat', '🐐'],
    ['beaver', '🦫'], ['hedgehog', '🦔'],
  ]),
  excl: [['🐱', '🐯', '🦁'], ['🐶', '🐺', '🦊'], ['🐳', '🐬', '🦈'], ['🐜', '🐝', '🕷️'], ['🐻', '🐼'],
    ['🐮', '🐐', '🐑'], ['🐭', '🦫', '🦔']],
  find: [
    (x) => `Find the ${x.w}`, (x) => `Where is the ${x.w}?`, (x) => `Show me the ${x.w}`,
    (x) => `I see ${art(x.w)}`,
  ],
  tpl: [
    { f: (x) => `I see ${art(x.w)}` }, { f: (x) => `Look at the ${x.w}` }, { f: (x) => `This is ${art(x.w)}` },
    { f: (x) => `The ${x.w} is my friend` },
  ],
  qa: [
    ...[['🐱', 'cat', 'meow'], ['🐶', 'dog', 'woof'], ['🐮', 'cow', 'moo'], ['🦆', 'duck', 'quack'],
      ['🐷', 'pig', 'oink'], ['🐑', 'sheep', 'baa'], ['🦉', 'owl', 'hoot'], ['🦁', 'lion', 'roar'],
      ['🐔', 'chicken', 'cluck'], ['🐴', 'horse', 'neigh'], ['🐸', 'frog', 'ribbit'], ['🐝', 'bee', 'buzz'],
      ['🐭', 'mouse', 'squeak'], ['🐍', 'snake', 'hiss']]
      .map(([e, n, s]) => [e, `What does the ${n} say?`, s, SOUNDS]),
    ['🐟', 'Who can swim?', 'fish', ['dog', 'cat', 'cow']], ['🐦', 'Who can fly?', 'bird', ['cow', 'pig', 'turtle']],
    ['🐸', 'Who can jump?', 'frog', ['fish', 'snake', 'turtle']], ['🐧', 'Who lives in the snow?', 'penguin', ['monkey', 'camel', 'lion']],
    ['🐝', 'Who makes honey?', 'bee', ['ant', 'spider', 'bird']], ['🦒', 'Who has a long neck?', 'giraffe', ['mouse', 'pig', 'cat']],
    ['🐘', 'Who has a long nose?', 'elephant', ['rabbit', 'horse', 'duck']], ['🐰', 'Who likes carrots?', 'rabbit', ['shark', 'lion', 'owl']],
  ],
  sorts: [
    {
      bins: [{ text: 'Farm', emoji: '🚜', not: 'a farm animal' }, { text: 'Wild', emoji: '🌳', not: 'a wild animal' }],
      groups: [['cow', 'pig', 'horse', 'sheep', 'duck', 'chicken', 'goat'], ['lion', 'elephant', 'monkey', 'bear', 'snake', 'tiger', 'giraffe', 'zebra']],
      say: 'Listen. Sort the animals.',
    },
    {
      bins: [{ text: 'Pets', emoji: '🏠', not: 'a pet' }, { text: 'Farm', emoji: '🚜', not: 'a farm animal' }],
      groups: [['cat', 'dog', 'rabbit', 'fish', 'mouse'], ['cow', 'pig', 'horse', 'sheep', 'goat']],
      say: 'Listen. Sort the animals.',
    },
    {
      bins: [{ text: 'Pets', emoji: '🏠', not: 'a pet' }, { text: 'Wild', emoji: '🌳', not: 'a wild animal' }],
      groups: [['cat', 'dog', 'rabbit', 'fish', 'mouse'], ['lion', 'elephant', 'monkey', 'bear', 'owl', 'wolf', 'deer']],
      say: 'Listen. Sort the animals.',
    },
    {
      bins: [{ text: 'Fly', emoji: '☁️', not: 'an animal that flies' }, { text: 'Swim', emoji: '🌊', not: 'an animal that swims' }],
      groups: [['bird', 'owl', 'butterfly', 'bee'], ['fish', 'whale', 'dolphin', 'shark', 'octopus', 'crab']],
      say: 'Listen. Fly or swim?',
    },
    {
      bins: [{ text: 'Big', emoji: '🐘', not: 'a big animal' }, { text: 'Small', emoji: '🐜', not: 'a small animal' }],
      groups: [['elephant', 'giraffe', 'whale', 'bear', 'horse', 'camel'], ['mouse', 'ant', 'bee', 'butterfly', 'frog', 'spider']],
      say: 'Listen. Big or small?',
    },
    {
      bins: [{ text: 'On land', emoji: '🌳', not: 'a land animal' }, { text: 'In the sea', emoji: '🌊', not: 'a sea animal' }],
      groups: [['cat', 'dog', 'lion', 'elephant', 'rabbit', 'horse', 'fox'], ['whale', 'dolphin', 'shark', 'octopus', 'crab']],
      say: 'Listen. Land or sea?',
    },
  ],
  sentences: [
    { s: 'The cat says meow', pic: '🐱' }, { s: 'The dog says woof', pic: '🐶' },
    { s: 'The cow says moo', pic: '🐮' }, { s: 'The duck says quack', pic: '🦆' },
    { s: 'The pig says oink', pic: '🐷' }, { s: 'The sheep says baa', pic: '🐑' },
    { s: 'The owl says hoot', pic: '🦉' }, { s: 'The fish can swim', pic: '🐟' },
    { s: 'The bird can fly', pic: '🐦' }, { s: 'The frog can jump', pic: '🐸' },
    { s: 'The monkey likes bananas', pic: '🐵' }, { s: 'The elephant is big', pic: '🐘' },
    { s: 'The mouse is small', pic: '🐭' }, { s: 'The snake has no legs', pic: '🐍' },
    { s: 'The giraffe is tall', pic: '🦒' }, { s: 'The penguin lives in the snow', pic: '🐧' },
    { s: 'The bee makes honey', pic: '🐝' }, { s: 'The spider has eight legs', pic: '🕷️' },
    { s: 'The kangaroo can hop', pic: '🦘' }, { s: 'The dolphin lives in the sea', pic: '🐬' },
    { s: 'The beaver builds a dam', pic: '🦫' }, { s: 'The panda eats bamboo', pic: '🐼' },
    { s: 'The cat is under the table' }, { s: 'The dog is on the bed' },
    { s: 'The bird is in the tree' }, { s: 'The rabbit is behind the box' },
  ],
});

// ---------- e5 My body & health ----------
const e5Gens = std({
  vocab: V([
    ['eyes', '👀', 0, 'p', 'b'], ['ear', '👂', 0, '', 'b'], ['nose', '👃', 0, '', 'b'], ['mouth', '👄', 0, '', 'b'],
    ['hand', '✋', 0, '', 'b'], ['foot', '🦶', 0, '', 'b'], ['leg', '🦵', 0, '', 'b'], ['arm', '💪', 0, '', 'b'],
    ['tooth', '🦷', 0, '', 'b'], ['tongue', '👅', 0, '', 'b'], ['face', '🙂', 0, '', 'b'], ['thumb', '👍', 0, '', 'b'],
    ['brain', '🧠', 0, '', 'o'], ['bone', '🦴', 0, '', 'o'], ['heart', '🫀', 0, '', 'o'], ['lungs', '🫁', 0, 'p', 'o'],
    ['toothbrush', '🪥', 0, '', 'h'], ['soap', '🧼', 0, 'x', 'h'], ['shower', '🚿', 0, '', 'h'], ['bath', '🛁', 0, '', 'h'],
    ['band-aid', '🩹', 0, '', 'h'], ['doctor', '🧑‍⚕️', 0, '', 'h'], ['medicine', '💊', 0, 'x', 'h'],
    ['thermometer', '🌡️', 0, '', 'h'], ['sneeze', '🤧', 0, '', 'a'], ['yawn', '🥱', 0, '', 'a'],
  ]),
  excl: [['👄', '👅', '🦷'], ['🦵', '🦶', '🦴'], ['🙂', '👀', '👃', '👄', '👂', '👅'], ['✋', '💪', '👍'],
    ['🪥', '🧼', '🚿', '🛁'], ['🩹', '💊', '🌡️', '🧑‍⚕️'], ['🤧', '🥱']],
  find: [
    (x) => (x.k === 'b' ? `Touch your ${x.w}` : `Find the ${x.w}`),
    (x) => (x.k === 'b' ? `Show me your ${x.w}` : `Where is the ${x.w}?`),
    (x) => (x.k === 'a' ? `I ${x.w}` : `Look at the ${x.w}`),
  ],
  yn: (x) => (x.k === 'b' || x.k === 'o' ? `Is this ${x.f === 'p' ? 'your ' + x.w : 'a ' + x.w}?` : (x.k === 'a' ? `Does this show "${x.w}"?` : `Is this ${np(x)}?`)),
  tpl: [
    { f: (x) => `Touch your ${x.w}`, k: 'b' }, { f: (x) => `Show me your ${x.w}`, k: 'b' },
    { f: (x) => `This is my ${x.w}`, k: 'b' },
    { f: (x) => `I have ${np(x)}`, k: 'o' }, { f: (x) => `Look at the ${x.w}`, k: 'o' },
    { f: (x) => `I use ${np(x)}`, k: 'h' }, { f: (x) => `Look at the ${x.w}`, k: 'h' },
    { f: (x) => `Please ${x.w}`, k: 'a' }, { f: (x) => `I ${x.w}`, k: 'a' },
  ],
  qa: [
    ['👀', 'What do you see with?', 'eyes', ['ears', 'nose', 'mouth']], ['👂', 'What do you hear with?', 'ears', ['eyes', 'nose', 'hands']],
    ['👃', 'What do you smell with?', 'nose', ['eyes', 'ears', 'feet']], ['👅', 'What do you taste with?', 'tongue', ['nose', 'ears', 'hands']],
    ['🦶', 'What do you walk with?', 'feet', ['hands', 'ears', 'eyes']], ['✋', 'What do you wave with?', 'hand', ['foot', 'nose', 'ear']],
    ['🧠', 'What do you think with?', 'brain', ['hand', 'foot', 'mouth']], ['🪥', 'What do you brush your teeth with?', 'toothbrush', ['soap', 'band-aid', 'thermometer']],
    ['🧼', 'What do you wash your hands with?', 'soap', ['toothbrush', 'medicine', 'thermometer']],
    ['🧑‍⚕️', 'Who helps you when you are sick?', 'doctor', ['teacher', 'baby', 'friend']],
    ['🩹', 'What do you put on a cut?', 'band-aid', ['soap', 'toothbrush', 'shower']],
  ],
  sorts: [
    {
      bins: [{ text: 'Face', emoji: '🙂', not: 'on your face' }, { text: 'Body', emoji: '🧍', not: 'on your body' }],
      groups: [['eyes', 'ear', 'nose', 'mouth', 'tooth', 'tongue'], ['hand', 'foot', 'leg', 'arm', 'thumb']],
      say: 'Listen. Face or body?',
    },
    {
      bins: [{ text: 'Body parts', emoji: '🧍', not: 'a body part' }, { text: 'Things we use', emoji: '🧼', not: 'something we use' }],
      groups: [['eyes', 'nose', 'hand', 'foot', 'tongue', 'ear'], ['toothbrush', 'soap', 'band-aid', 'medicine', 'thermometer']],
      say: 'Listen. Sort the pictures.',
    },
    {
      bins: [{ text: 'Outside', emoji: '🧍', not: 'outside your body' }, { text: 'Inside', emoji: '🫀', not: 'inside your body' }],
      groups: [['eyes', 'hand', 'foot', 'nose', 'ear', 'arm'], ['brain', 'heart', 'bone', 'lungs']],
      say: 'Listen. Outside or inside?',
    },
  ],
  sentences: [
    { s: 'I see with my eyes', pic: '👀' }, { s: 'I hear with my ears', pic: '👂' },
    { s: 'I smell with my nose', pic: '👃' }, { s: 'I eat with my mouth', pic: '👄' },
    { s: 'I taste with my tongue', pic: '👅' }, { s: 'I brush my teeth', pic: '🦷' },
    { s: 'I walk with my feet', pic: '🦶' }, { s: 'I kick with my leg', pic: '🦵' },
    { s: 'I clap my hands', pic: '👏' }, { s: 'I think with my brain', pic: '🧠' },
    { s: 'I have strong arms', pic: '💪' }, { s: 'My heart goes boom', pic: '🫀' },
    { s: 'I use a toothbrush', pic: '🪥' }, { s: 'I wash with soap', pic: '🧼' },
    { s: 'I take a shower', pic: '🚿' }, { s: 'I take a bath', pic: '🛁' },
    { s: 'I need a band-aid', pic: '🩹' }, { s: 'The doctor helps me', pic: '🧑‍⚕️' },
    { s: 'I take my medicine', pic: '💊' }, { s: 'I have a fever', pic: '🌡️' },
    { s: 'Touch your nose' }, { s: 'Wave your hand' }, { s: 'Stamp your feet' },
    { s: 'Open your mouth' }, { s: 'Close your eyes' }, { s: 'Shake your arms' },
    { s: 'Wash your hands' }, { s: 'Brush your teeth' },
  ],
});

// ---------- e6 My family ----------
const e6Gens = std({
  vocab: V([
    ['mom', '👩', 0, '', 'p'], ['dad', '👨', 0, '', 'p'], ['baby', '👶', 0, '', 'p'], ['brother', '👦', 0, '', 'p'],
    ['sister', '👧', 0, '', 'p'], ['grandma', '👵', 0, '', 'p'], ['grandpa', '👴', 0, '', 'p'],
    ['family', '👨‍👩‍👧‍👦', 0, '', 'p'], ['friend', '🧑‍🤝‍🧑', 0, '', 'p'], ['kid', '🧒', 0, '', 'p'],
    ['pet', '🐶', 0, '', 'o'], ['home', '🏠', 0, '', 'o'], ['love', '❤️', 0, 'x', 'o'], ['hug', '🤗', 0, '', 'o'],
    ['kiss', '😘', 0, '', 'o'], ['bottle', '🍼', 0, '', 'o'], ['teddy bear', '🧸', 0, '', 'o'],
    ['gift', '🎁', 0, '', 'o'], ['photo', '📷', 0, '', 'o'], ['phone', '📱', 0, '', 'o'],
    ['car', '🚗', 0, '', 'o'], ['dinner', '🍽️', 0, 'x', 'o'], ['picnic', '🧺', 0, '', 'o'], ['story book', '📚', 0, '', 'o'],
  ]),
  excl: [
    ['👨‍👩‍👧‍👦', '👩', '👨', '👦', '👧', '👵', '👴', '👶', '🧑‍🤝‍🧑', '🧒'],
    ['👩', '👵'], ['👨', '👴'], ['❤️', '🤗', '😘'], ['👶', '👦', '👧', '🧒'], ['👦', '🧒', '👧'],
  ],
  find: [
    (x) => (x.k === 'p' ? `Where is my ${x.w}?` : `Find the ${x.w}`),
    (x) => (x.k === 'p' ? `Show me my ${x.w}` : `Show me the ${x.w}`),
    (x) => `Touch the ${x.w}`,
  ],
  yn: (x) => (x.k === 'p' ? `Is this my ${x.w}?` : `Is this ${np(x)}?`),
  tpl: [
    { f: (x) => `This is my ${x.w}`, k: 'p' }, { f: (x) => `I love my ${x.w}`, k: 'p' },
    { f: (x) => `I see my ${x.w}`, k: 'p' }, { f: (x) => `Look at the ${x.w}`, k: 'o' },
    { f: (x) => `I see ${np(x)}`, k: 'o' }, { f: (x) => thisIs(x), k: 'o' },
  ],
  asks: [{ q: 'Who is this?', k: 'p' }, { q: 'Who is in the picture?', k: 'p' }],
  qa: [
    ['👶', 'Who drinks from a bottle?', 'baby', ['grandma', 'dad', 'teacher']], ['👵', 'Who is your mom\'s mom?', 'grandma', ['sister', 'baby', 'friend']],
    ['👴', 'Who is your dad\'s dad?', 'grandpa', ['brother', 'baby', 'friend']], ['👦', 'Who is a boy in your family?', 'brother', ['sister', 'mom', 'grandma']],
    ['👧', 'Who is a girl in your family?', 'sister', ['brother', 'dad', 'grandpa']],
    ['👨‍👩‍👧‍👦', 'Who lives in your home?', 'family', ['teacher', 'doctor', 'stranger']],
    ['🍼', 'Who needs a bottle?', 'baby', ['grandpa', 'dad', 'mom']],
  ],
  sorts: [
    {
      bins: [{ text: 'Grown-ups', emoji: '🧑', not: 'a grown-up' }, { text: 'Kids', emoji: '🧒', not: 'a kid' }],
      groups: [['mom', 'dad', 'grandma', 'grandpa'], ['baby', 'brother', 'sister', 'kid']],
      say: 'Listen. Grown-ups or kids?',
    },
    {
      bins: [{ text: 'Girls and women', emoji: '👩', not: 'a girl or a woman' }, { text: 'Boys and men', emoji: '👨', not: 'a boy or a man' }],
      groups: [['mom', 'grandma', 'sister'], ['dad', 'grandpa', 'brother']],
      say: 'Listen. Sort the family.',
    },
    {
      bins: [{ text: 'People', emoji: '🧑', not: 'a person' }, { text: 'Things', emoji: '🎁', not: 'a thing' }],
      groups: [['mom', 'dad', 'baby', 'grandma', 'friend', 'brother'], ['bottle', 'gift', 'photo', 'teddy bear', 'phone', 'car']],
      say: 'Listen. People or things?',
    },
  ],
  sentences: [
    { s: 'This is my mom', pic: '👩' }, { s: 'This is my dad', pic: '👨' },
    { s: 'I see a baby', pic: '👶' }, { s: 'This is my grandma', pic: '👵' },
    { s: 'This is my grandpa', pic: '👴' }, { s: 'I have a brother', pic: '👦' },
    { s: 'I have a sister', pic: '👧' }, { s: 'This is my family', pic: '👨‍👩‍👧‍👦' },
    { s: 'I have a pet', pic: '🐶' }, { s: 'This is my friend', pic: '🧑‍🤝‍🧑' },
    { s: 'This is my home', pic: '🏠' }, { s: 'I love you', pic: '❤️' },
    { s: 'I like hugs', pic: '🤗' }, { s: 'The baby has a bottle', pic: '🍼' },
    { s: 'My family takes photos', pic: '📷' }, { s: 'We go in the car', pic: '🚗' },
    { s: 'I call my grandma', pic: '📱' }, { s: 'We eat dinner together', pic: '🍽️' },
    { s: 'I love my mom and dad' }, { s: 'My grandma is kind' }, { s: 'I have a big family' },
    { s: 'My brother is funny' }, { s: 'My sister is my friend' },
  ],
});

// ---------- e7 Food ----------
const e7Gens = std({
  vocab: V([
    ['apple', '🍎', 0, '', 'e'], ['banana', '🍌', 0, '', 'e'], ['bread', '🍞', 0, 'x', 'e'], ['milk', '🥛', 0, 'x', 'd'],
    ['cheese', '🧀', 0, 'x', 'e'], ['egg', '🥚', 0, '', 'e'], ['pizza', '🍕', 0, 'x', 'e'], ['cake', '🍰', 0, '', 'e'],
    ['cookie', '🍪', 0, '', 'e'], ['carrot', '🥕', 0, '', 'e'], ['orange', '🍊', 0, '', 'e'], ['juice', '🧃', 0, 'x', 'd'],
    ['ice cream', '🍦', 0, 'x', 'e'], ['grapes', '🍇', 0, 'p', 'e'], ['strawberry', '🍓', 0, '', 'e'],
    ['rice', '🍚', 0, 'x', 'e'], ['chicken', '🍗', 0, 'x', 'e'], ['soup', '🍲', 0, 'x', 'e'], ['broccoli', '🥦', 0, 'x', 'e'],
    ['corn', '🌽', 0, 'x', 'e'], ['water', '💧', 0, 'x', 'd'], ['pear', '🍐', 0, '', 'e'], ['peach', '🍑', 0, '', 'e'],
    ['watermelon', '🍉', 0, '', 'e'], ['lemon', '🍋', 0, '', 'e'], ['cherries', '🍒', 0, 'p', 'e'],
    ['pineapple', '🍍', 0, '', 'e'], ['blueberries', '🫐', 0, 'p', 'e'], ['potato', '🥔', 0, '', 'e'],
    ['tomato', '🍅', 0, '', 'e'], ['cucumber', '🥒', 0, '', 'e'], ['mushroom', '🍄', 0, '', 'e'], ['onion', '🧅', 0, '', 'e'],
    ['hamburger', '🍔', 0, '', 'e'], ['hot dog', '🌭', 0, '', 'e'], ['french fries', '🍟', 0, 'p', 'e'],
    ['sandwich', '🥪', 0, '', 'e'], ['spaghetti', '🍝', 0, 'x', 'e'], ['popcorn', '🍿', 0, 'x', 'e'],
    ['candy', '🍬', 0, 'x', 'e'], ['chocolate', '🍫', 0, 'x', 'e'], ['donut', '🍩', 0, '', 'e'],
    ['pancakes', '🥞', 0, 'p', 'e'], ['butter', '🧈', 0, 'x', 'e'], ['salad', '🥗', 0, '', 'e'], ['taco', '🌮', 0, '', 'e'],
    ['honey', '🍯', 0, 'x', 'e'],
  ]),
  excl: [['🍔', '🥪', '🌭'], ['🍊', '🍑', '🍋'], ['🍎', '🍅', '🍒'], ['🍰', '🍩', '🍪'], ['🥛', '🧃', '💧'],
    ['🍟', '🍿'], ['🍓', '🍒']],
  find: [
    (x) => `Find the ${x.w}`, (x) => `Where is the ${x.w}?`, (x) => `Show me the ${x.w}`,
    (x) => `I want ${np(x)}`,
  ],
  tpl: [
    { f: (x) => `I want ${np(x)}` }, { f: (x) => `This is ${np(x)}` }, { f: (x) => `I eat ${np(x)}`, k: 'e' },
    { f: (x) => `I drink ${x.w}`, k: 'd' }, { f: (x) => `Do you want ${np(x)}?` },
    { f: (x) => `Please give me ${np(x)}`, k: 'e' },
  ],
  asks: [{ q: 'What do you want?', k: 'e' }, { q: 'What is this food?', k: 'e' }, { q: 'What do you drink?', k: 'd' }],
  qa: [
    ['🌅', 'What do you eat for breakfast?', 'pancakes', ['spaghetti', 'soup', 'hamburger']],
    ['🥤', 'What do you drink?', 'milk', ['bread', 'cheese', 'rice']], ['🐔', 'Which food comes from a chicken?', 'egg', ['milk', 'bread', 'apple']],
    ['🐮', 'Which drink comes from a cow?', 'milk', ['juice', 'water', 'soup']], ['🐝', 'Which food comes from bees?', 'honey', ['cheese', 'butter', 'corn']],
    ['🍦', 'Which food is cold?', 'ice cream', ['soup', 'pancakes', 'pizza']], ['🍲', 'Which food is hot?', 'soup', ['ice cream', 'salad', 'watermelon']],
    ['🍿', 'What do we eat at the movies?', 'popcorn', ['soup', 'rice', 'broccoli']], ['🥕', 'Which food is a vegetable?', 'carrot', ['cake', 'cookie', 'candy']],
    ['🍌', 'Which food is a fruit?', 'banana', ['onion', 'potato', 'broccoli']],
  ],
  sorts: [
    {
      bins: [{ text: 'Fruit', emoji: '🍎', not: 'a fruit' }, { text: 'Sweets', emoji: '🍰', not: 'a sweet' }],
      groups: [['apple', 'banana', 'orange', 'grapes', 'strawberry', 'pear', 'peach', 'watermelon'], ['cake', 'cookie', 'ice cream', 'candy', 'chocolate', 'donut']],
      say: 'Listen. Sort the food.',
    },
    {
      bins: [{ text: 'Drinks', emoji: '🥤', not: 'a drink' }, { text: 'Food', emoji: '🍽️', not: 'food to eat' }],
      groups: [['milk', 'juice', 'water'], ['bread', 'cheese', 'egg', 'pizza', 'rice', 'chicken', 'soup', 'hamburger']],
      say: 'Listen. Sort the food.',
    },
    {
      bins: [{ text: 'Fruit', emoji: '🍎', not: 'a fruit' }, { text: 'Vegetables', emoji: '🥕', not: 'a vegetable' }],
      groups: [['apple', 'banana', 'orange', 'grapes', 'strawberry', 'pear', 'lemon', 'cherries'], ['carrot', 'broccoli', 'corn', 'potato', 'cucumber', 'onion']],
      say: 'Listen. Fruit or vegetable?',
    },
    {
      bins: [{ text: 'Healthy', emoji: '🥗', not: 'healthy food' }, { text: 'Treats', emoji: '🍬', not: 'a treat' }],
      groups: [['apple', 'carrot', 'broccoli', 'banana', 'water', 'milk', 'salad'], ['cake', 'cookie', 'candy', 'donut', 'ice cream', 'chocolate']],
      say: 'Listen. Healthy food or treats?',
    },
    {
      bins: [{ text: 'Fast food', emoji: '🍔', not: 'fast food' }, { text: 'Fresh food', emoji: '🥗', not: 'fresh food' }],
      groups: [['hamburger', 'hot dog', 'french fries', 'pizza', 'taco'], ['apple', 'carrot', 'salad', 'cucumber', 'pear', 'tomato']],
      say: 'Listen. Sort the food.',
    },
  ],
  sentences: [
    { s: 'I like red apples', pic: '🍎' }, { s: 'I want a banana', pic: '🍌' },
    { s: 'I eat bread', pic: '🍞' }, { s: 'I drink milk', pic: '🥛' },
    { s: 'I drink juice', pic: '🧃' }, { s: 'I like cheese', pic: '🧀' },
    { s: 'I have an egg', pic: '🥚' }, { s: 'I like pizza', pic: '🍕' },
    { s: 'I eat a cookie', pic: '🍪' }, { s: 'I want ice cream', pic: '🍦' },
    { s: 'I like strawberries', pic: '🍓' }, { s: 'I eat carrots', pic: '🥕' },
    { s: 'I eat chicken', pic: '🍗' }, { s: 'I love pancakes', pic: '🥞' },
    { s: 'The popcorn is hot', pic: '🍿' }, { s: 'The watermelon is big', pic: '🍉' },
    { s: 'I eat soup with a spoon', pic: '🍲' }, { s: 'Candy is sweet', pic: '🍬' },
    { s: 'I am hungry' }, { s: 'I like pizza and juice' }, { s: 'Do you like cake?' },
    { s: 'I am thirsty' }, { s: 'I want some water, please' }, { s: 'Yes, please' }, { s: 'No, thank you' },
  ],
});

// ---------- e8 Clothes ----------
const e8Gens = std({
  vocab: V([
    ['shirt', '👕', 0, '', 'w'], ['pants', '👖', 0, 'p', 'w'], ['dress', '👗', 0, '', 'w'], ['shoes', '👟', 0, 'p', 'w'],
    ['hat', '🎩', 0, '', 'w'], ['cap', '🧢', 0, '', 'w'], ['socks', '🧦', 0, 'p', 'w'], ['coat', '🧥', 0, '', 'w'],
    ['gloves', '🧤', 0, 'p', 'w'], ['scarf', '🧣', 0, '', 'w'], ['boots', '👢', 0, 'p', 'w'], ['shorts', '🩳', 0, 'p', 'w'],
    ['sandals', '🩴', 0, 'p', 'w'], ['swimsuit', '👙', 0, '', 'w'], ['sunglasses', '🕶️', 0, 'p', 'w'],
    ['glasses', '👓', 0, 'p', 'w'], ['tie', '👔', 0, '', 'w'], ['high heels', '👠', 0, 'p', 'w'],
    ['ballet shoes', '🩰', 0, 'p', 'w'], ['crown', '👑', 0, '', 'w'], ['watch', '⌚', 0, '', 'w'], ['ring', '💍', 0, '', 'w'],
    ['backpack', '🎒', 0, '', 'c'], ['bag', '👜', 0, '', 'c'], ['umbrella', '☔', 0, '', 'c'],
  ]),
  excl: [['👟', '👢', '🩴', '👠', '🩰'], ['👓', '🕶️'], ['🩳', '👖'], ['👙', '🩳'], ['🧥', '👕', '👔', '👗'],
    ['🎩', '🧢'], ['🎒', '👜'], ['⌚', '💍'], ['🧤', '🧦']],
  find: [
    (x) => `Find the ${x.w}`, (x) => `Where ${x.f === 'p' ? 'are the' : 'is the'} ${x.w}?`,
    (x) => `Show me the ${x.w}`, (x) => (x.k === 'w' ? `Put on ${x.f === 'p' ? 'your' : 'your'} ${x.w}` : `Take your ${x.w}`),
  ],
  tpl: [
    { f: (x) => `I wear ${np(x)}`, k: 'w' }, { f: (x) => `Put on your ${x.w}`, k: 'w' },
    { f: (x) => `Take off your ${x.w}`, k: 'w' }, { f: (x) => `I have ${np(x)}`, k: 'c' },
    { f: (x) => `Take your ${x.w}`, k: 'c' }, { f: (x) => thisIs(x) },
  ],
  asks: [{ q: 'What do you wear?', k: 'w' }, { q: 'What is this?', k: 'w' }],
  qa: [
    ['❄️', 'What do you wear when it is cold?', 'coat', ['shorts', 'sandals', 'swimsuit']],
    ['☀️', 'What do you wear when it is sunny?', 'sunglasses', ['gloves', 'boots', 'scarf']],
    ['🌧️', 'What do you wear when it rains?', 'boots', ['sandals', 'shorts', 'sunglasses']],
    ['🏊', 'What do you wear to swim?', 'swimsuit', ['coat', 'scarf', 'gloves']],
    ['🏫', 'What do you take to school?', 'backpack', ['swimsuit', 'sandals', 'crown']],
    ['🥶', 'What do you put on your hands?', 'gloves', ['socks', 'hat', 'shoes']],
    ['🦶', 'What do you put on your feet first?', 'socks', ['gloves', 'scarf', 'hat']],
    ['🌨️', 'What goes around your neck in winter?', 'scarf', ['socks', 'shorts', 'sandals']],
    ['👑', 'What does a king wear?', 'crown', ['boots', 'swimsuit', 'backpack']],
    ['🕒', 'What tells the time?', 'watch', ['hat', 'shirt', 'dress']],
  ],
  sorts: [
    {
      bins: [{ text: 'Winter', emoji: '❄️', not: 'winter clothes' }, { text: 'Summer', emoji: '☀️', not: 'summer clothes' }],
      groups: [['coat', 'gloves', 'scarf', 'boots'], ['shorts', 'sandals', 'swimsuit', 'sunglasses']],
      say: 'Listen. Winter or summer?',
    },
    {
      bins: [{ text: 'Head', emoji: '🙂', not: 'on your head' }, { text: 'Feet', emoji: '🦶', not: 'on your feet' }],
      groups: [['hat', 'cap', 'sunglasses', 'glasses', 'crown'], ['shoes', 'socks', 'boots', 'sandals', 'high heels', 'ballet shoes']],
      say: 'Listen. Head or feet?',
    },
    {
      bins: [{ text: 'We wear it', emoji: '👗', not: 'something we wear' }, { text: 'We carry it', emoji: '🎒', not: 'something we carry' }],
      groups: [['shirt', 'pants', 'dress', 'shoes', 'hat', 'coat'], ['backpack', 'bag', 'umbrella']],
      say: 'Listen. Wear or carry?',
    },
  ],
  sentences: [
    { s: 'I wear my shoes', pic: '👟' }, { s: 'I have a blue shirt', pic: '👕' },
    { s: 'I wear my coat', pic: '🧥' }, { s: 'I wear shorts today', pic: '🩳' },
    { s: 'She wears a dress', pic: '👗' }, { s: 'I put on my hat', pic: '🎩' },
    { s: 'My socks are warm', pic: '🧦' }, { s: 'I wear gloves', pic: '🧤' },
    { s: 'I wear a scarf', pic: '🧣' }, { s: 'I wear boots in the snow', pic: '👢' },
    { s: 'I have a backpack', pic: '🎒' }, { s: 'I wear sandals', pic: '🩴' },
    { s: 'I wear a swimsuit', pic: '👙' }, { s: 'I wear glasses', pic: '👓' },
    { s: 'Dad wears a tie', pic: '👔' }, { s: 'The king wears a crown', pic: '👑' },
    { s: 'I wear a cap', pic: '🧢' }, { s: 'I need my umbrella', pic: '☔' },
    { s: 'Put on your pants' }, { s: 'Take off your shoes' }, { s: 'It is cold today' },
    { s: 'Zip your coat' }, { s: 'I like your shirt' },
  ],
});

// ---------- e9 In the classroom ----------
const e9Gens = std({
  vocab: V([
    ['pencil', '✏️', 0, '', 's'], ['pen', '🖊️', 0, '', 's'], ['book', '📖', 0, '', 's'], ['scissors', '✂️', 0, 'p', 's'],
    ['ruler', '📏', 0, '', 's'], ['paper', '📄', 0, 'x', 's'], ['crayon', '🖍️', 0, '', 's'], ['paintbrush', '🖌️', 0, '', 's'],
    ['notebook', '📓', 0, '', 's'], ['paper clip', '📎', 0, '', 's'], ['backpack', '🎒', 0, '', 's'],
    ['chair', '🪑', 0, '', 'r'], ['computer', '💻', 0, '', 'r'], ['clock', '🕒', 0, '', 'r'], ['door', '🚪', 0, '', 'r'],
    ['window', '🪟', 0, '', 'r'], ['globe', '🌍', 0, '', 'r'], ['map', '🗺️', 0, '', 'r'], ['bell', '🔔', 0, '', 'r'],
    ['flag', '🇨🇦', 0, '', 'r'], ['trash can', '🗑️', 0, '', 'r'], ['light', '💡', 0, '', 'r'], ['calendar', '📅', 0, '', 'r'],
    ['teacher', '🧑‍🏫', 0, '', 'q'], ['student', '🧑‍🎓', 0, '', 'q'], ['school', '🏫', 0, '', 'q'], ['school bus', '🚌', 0, '', 'q'],
    ['library', '📚', 0, '', 'q'],
  ]),
  excl: [['✏️', '🖊️', '🖍️', '🖌️'], ['📖', '📓', '📚'], ['📄', '📓', '📅'], ['🌍', '🗺️'], ['🏫', '🚌'], ['🧑‍🏫', '🧑‍🎓']],
  find: [
    (x) => `Find the ${x.w}`, (x) => `Where ${x.f === 'p' ? 'are the' : 'is the'} ${x.w}?`,
    (x) => `Show me the ${x.w}`, (x) => (x.k === 's' ? `Pick up the ${x.w}` : `Look at the ${x.w}`),
  ],
  tpl: [
    { f: (x) => `Look at the ${x.w}` }, { f: (x) => `I have ${np(x)}`, k: 's' },
    { f: (x) => `Give me the ${x.w}, please`, k: 's' }, { f: (x) => `Pick up the ${x.w}`, k: 's' },
    { f: (x) => `Point to the ${x.w}`, k: 'r' }, { f: (x) => `I see the ${x.w}`, k: 'r' },
    { f: (x) => `This is the ${x.w}`, k: 'q' }, { f: (x) => `I like my ${x.w}`, k: 'q' },
  ],
  asks: [{ q: 'What is this?', k: 's' }, { q: 'What is in the classroom?', k: 'r' }],
  qa: [
    ['✂️', 'What do you cut paper with?', 'scissors', ['pencil', 'ruler', 'crayon']],
    ['✏️', 'What do you write with?', 'pencil', ['scissors', 'ruler', 'globe']],
    ['🖍️', 'What do you colour with?', 'crayon', ['scissors', 'clock', 'door']],
    ['📏', 'What do you measure with?', 'ruler', ['crayon', 'book', 'chair']],
    ['📖', 'What do you read?', 'book', ['pencil', 'scissors', 'ruler']],
    ['🕒', 'What tells the time?', 'clock', ['globe', 'chair', 'window']],
    ['🌍', 'What shows the world?', 'globe', ['clock', 'bell', 'door']],
    ['🔔', 'What rings at recess?', 'bell', ['pencil', 'paper', 'chair']],
    ['🪑', 'What do you sit on?', 'chair', ['book', 'ruler', 'flag']],
    ['🧑‍🏫', 'Who helps you learn?', 'teacher', ['bell', 'clock', 'bus']],
  ],
  sorts: [
    {
      bins: [{ text: 'School supplies', emoji: '✏️', not: 'a school supply' }, { text: 'In the room', emoji: '🏫', not: 'in the room' }],
      groups: [['pencil', 'pen', 'ruler', 'scissors', 'crayon', 'paper', 'book', 'notebook'],
        ['chair', 'door', 'window', 'clock', 'computer', 'globe', 'bell']],
      say: 'Listen. Sort the pictures.',
    },
    {
      bins: [{ text: 'People & places', emoji: '🏫', not: 'a person or a place' }, { text: 'Things', emoji: '✏️', not: 'a thing' }],
      groups: [['teacher', 'student', 'school', 'school bus', 'library'], ['pencil', 'ruler', 'chair', 'clock', 'book', 'scissors']],
      say: 'Listen. Sort the pictures.',
    },
    {
      bins: [{ text: 'Write & draw', emoji: '✏️', not: 'for writing or drawing' }, { text: 'Cut & measure', emoji: '✂️', not: 'for cutting or measuring' }],
      groups: [['pencil', 'pen', 'crayon', 'paintbrush', 'notebook'], ['scissors', 'ruler']],
      say: 'Listen. Sort the pictures.',
    },
  ],
  sentences: [
    { s: 'Open your book', pic: '📖' }, { s: 'Pick up your pencil', pic: '✏️' },
    { s: 'Cut the paper with scissors', pic: '✂️' }, { s: 'Draw with a crayon', pic: '🖍️' },
    { s: 'Sit on the chair', pic: '🪑' }, { s: 'Open the door', pic: '🚪' },
    { s: 'Look at the clock', pic: '🕒' }, { s: 'Use the computer', pic: '💻' },
    { s: 'Look at the teacher', pic: '🧑‍🏫' }, { s: 'Measure with the ruler', pic: '📏' },
    { s: 'Write with a pen', pic: '🖊️' }, { s: 'Close the window', pic: '🪟' },
    { s: 'Put it in your backpack', pic: '🎒' }, { s: 'Paint with a brush', pic: '🖌️' },
    { s: 'Find it on the map', pic: '🗺️' }, { s: 'The bell is ringing', pic: '🔔' },
    { s: 'Throw it in the trash', pic: '🗑️' }, { s: 'Turn on the light', pic: '💡' },
    { s: 'Please sit down' }, { s: 'Raise your hand' }, { s: 'Listen to the teacher' },
    { s: 'Line up, please' }, { s: 'Be quiet, please' }, { s: 'Open your notebook' }, { s: 'Stand up, please' },
  ],
});

// ---------- e10 Weather, seasons, days & months ----------
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const SEASON_OF = ['winter', 'winter', 'spring', 'spring', 'spring', 'summer', 'summer', 'summer', 'fall', 'fall', 'fall', 'winter'];
const SEASONS = ['spring', 'summer', 'fall', 'winter'];
const dayOpt = (d) => ({ text: d, say: say(d) });
const otherDays = (R, d, k) => R.sample(DAYS.filter((x) => x !== d), k);
const dayGens = {
  1: [
    (R) => {
      const d = R.pick(DAYS);
      const opts = [d, ...otherDays(R, d, R.chance(0.35) ? 1 : 2)];
      return { type: 'choice', key: 'd1:' + d, prompt: P.day, say: say(d), options: opts.map((x) => ({ text: x })), answer: 0, cols: opts.length };
    },
    (R) => {
      const d = R.pick(DAYS);
      const truth = R.chance(0.5);
      const shown = truth ? d : R.pick(DAYS.filter((x) => x !== d));
      return {
        type: 'choice', key: 'd1y:' + d + ':' + shown, prompt: P.yn, say: say(`Is this ${d}?`),
        stimulus: { text: shown }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
    (R) => {
      const d = R.pick(DAYS);
      const we = d === 'Saturday' || d === 'Sunday';
      return {
        type: 'choice', key: 'd1w:' + d, prompt: P.yn, say: say(`Is ${d} a weekend day?`),
        stimulus: { text: d }, options: [YES, NO], answer: we ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
  ],
  2: [
    (R) => {
      const d = R.pick(DAYS);
      return { type: 'choice', key: 'd2a:' + d, prompt: P.day, say: say(d), options: [d, ...otherDays(R, d, 3)].map((x) => ({ text: x })), answer: 0, cols: 2 };
    },
    (R) => {
      const i = R.int(0, 6);
      const next = DAYS[(i + 1) % 7];
      return {
        type: 'choice', key: 'd2b:' + DAYS[i], prompt: P.ans, say: say('What day comes after ' + DAYS[i] + '?'),
        stimulus: { text: DAYS[i] }, options: [next, ...R.sample(DAYS.filter((x) => x !== next && x !== DAYS[i]), 2)].map(dayOpt),
        answer: 0, cols: 3,
      };
    },
    (R) => {
      const i = R.int(0, 6);
      const prev = DAYS[(i + 6) % 7];
      return {
        type: 'choice', key: 'd2d:' + DAYS[i], prompt: P.ans, say: say('What day comes before ' + DAYS[i] + '?'),
        stimulus: { text: DAYS[i] }, options: [prev, ...R.sample(DAYS.filter((x) => x !== prev && x !== DAYS[i]), 2)].map(dayOpt),
        answer: 0, cols: 3,
      };
    },
    (R) => {
      const wk = R.sample(DAYS.slice(0, 5), R.int(2, 3));
      const we = R.chance(0.5) ? ['Saturday', 'Sunday'] : [R.pick(['Saturday', 'Sunday'])];
      const items = [...wk.map((d) => ({ text: d, say: say(d), bin: 0 })), ...we.map((d) => ({ text: d, say: say(d), bin: 1 }))];
      if (items.length < 4) items.push({ text: R.pick(DAYS.slice(0, 5).filter((d) => !wk.includes(d))), bin: 0 });
      return {
        type: 'sort', key: 'd2c:' + items.map((x) => x.text).sort().join(','), prompt: P.sortW,
        say: say('Listen. School days or weekend?'),
        bins: [{ text: 'School days', emoji: '🏫' }, { text: 'Weekend', emoji: '🎉' }], items: R.shuffle(items.map((x) => ({ ...x, say: say(x.text) }))),
      };
    },
  ],
  3: [
    (R) => {
      const i = R.int(0, 6);
      const seq = [0, 1, 2, 3].map((k) => DAYS[(i + k) % 7]);
      return { type: 'order', key: 'd3o:' + i, prompt: P.order, say: say(seq.join(', ')), tiles: seq, joiner: ' ' };
    },
    (R) => {
      const i = R.int(0, 6);
      const tomorrow = DAYS[(i + 1) % 7];
      const wrong = R.sample(DAYS.filter((x) => x !== tomorrow && x !== DAYS[i]), 2);
      return {
        type: 'choice', key: 'd3b:' + DAYS[i], prompt: P.ans, say: say('Today is ' + DAYS[i] + '. What day is tomorrow?'),
        stimulus: { text: 'Today: ' + DAYS[i] }, options: [tomorrow, ...wrong].map(dayOpt), answer: 0, cols: 3,
      };
    },
    (R) => {
      const i = R.int(0, 6);
      const yesterday = DAYS[(i + 6) % 7];
      const wrong = R.sample(DAYS.filter((x) => x !== yesterday && x !== DAYS[i]), 2);
      return {
        type: 'choice', key: 'd3y:' + DAYS[i], prompt: P.ans, say: say('Today is ' + DAYS[i] + '. What day was yesterday?'),
        stimulus: { text: 'Today: ' + DAYS[i] }, options: [yesterday, ...wrong].map(dayOpt), answer: 0, cols: 3,
      };
    },
    (R) => {
      const a = R.int(0, 6), k = R.int(2, 3);
      const d = DAYS[a], target = DAYS[(a + k) % 7];
      const q = k === 2 ? `What day is two days after ${d}?` : `What day is three days after ${d}?`;
      return {
        type: 'choice', key: 'd3k:' + d + k, prompt: P.ans, say: say(q), stimulus: { text: d },
        options: [target, ...R.sample(DAYS.filter((x) => x !== target && x !== d), 2)].map(dayOpt), answer: 0, cols: 3,
      };
    },
  ],
};
const monthGens = {
  1: [
    (R) => {
      const m = R.pick(MONTHS);
      return {
        type: 'choice', key: 'm1:' + m, prompt: P.month, say: say(m),
        options: [m, ...R.sample(MONTHS.filter((x) => x !== m), 2)].map((x) => ({ text: x })), answer: 0, cols: 3,
      };
    },
    (R) => {
      const m = R.pick(MONTHS);
      const truth = R.chance(0.5);
      const shown = truth ? m : R.pick(MONTHS.filter((x) => x !== m));
      return {
        type: 'choice', key: 'm1y:' + m + ':' + shown, prompt: P.yn, say: say(`Is this ${m}?`),
        stimulus: { text: shown }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
  ],
  2: [
    (R) => {
      const m = R.pick(MONTHS);
      return {
        type: 'choice', key: 'm2a:' + m, prompt: P.month, say: say(m),
        options: [m, ...R.sample(MONTHS.filter((x) => x !== m), 3)].map((x) => ({ text: x })), answer: 0, cols: 2,
      };
    },
    (R) => {
      const i = R.int(0, 11);
      const next = MONTHS[(i + 1) % 12];
      return {
        type: 'choice', key: 'm2b:' + MONTHS[i], prompt: P.ans, say: say('What month comes after ' + MONTHS[i] + '?'),
        stimulus: { text: MONTHS[i] }, options: [next, ...R.sample(MONTHS.filter((x) => x !== next && x !== MONTHS[i]), 2)].map(dayOpt),
        answer: 0, cols: 3,
      };
    },
  ],
  3: [
    (R) => {
      const i = R.int(0, 11);
      const seq = [0, 1, 2, 3].map((k) => MONTHS[(i + k) % 12]);
      return { type: 'order', key: 'm3o:' + i, prompt: P.order, say: say(seq.join(', ')), tiles: seq, joiner: ' ' };
    },
    (R) => {
      const i = R.int(0, 11);
      const s = SEASON_OF[i];
      return {
        type: 'choice', key: 'm3s:' + MONTHS[i], prompt: P.ans, say: say(`What season is ${MONTHS[i]}, in Quebec?`),
        stimulus: { text: MONTHS[i] }, options: [s, ...R.sample(SEASONS.filter((x) => x !== s), 2)].map(dayOpt), answer: 0, cols: 3,
      };
    },
    (R) => {
      const i = R.int(0, 11);
      const prev = MONTHS[(i + 11) % 12];
      return {
        type: 'choice', key: 'm3p:' + MONTHS[i], prompt: P.ans, say: say('What month comes before ' + MONTHS[i] + '?'),
        stimulus: { text: MONTHS[i] }, options: [prev, ...R.sample(MONTHS.filter((x) => x !== prev && x !== MONTHS[i]), 2)].map(dayOpt),
        answer: 0, cols: 3,
      };
    },
  ],
};
const wxStd = std({
  vocab: V([
    ['sunny', '☀️', 0, '', 'w'], ['rainy', '🌧️', 0, '', 'w'], ['cloudy', '☁️', 0, '', 'w'], ['windy', '💨', 0, '', 'w'],
    ['snowy', '❄️', 0, '', 'w'], ['stormy', '⛈️', 0, '', 'w'], ['foggy', '🌫️', 0, '', 'w'],
    ['spring', '🌸', 0, '', 's'], ['summer', '🏖️', 0, '', 's'], ['fall', '🍂', 0, '', 's'], ['winter', '⛄', 0, '', 's'],
    ['rainbow', '🌈', 0, '', 't'], ['umbrella', '☔', 0, '', 't'], ['sun', '🌞', 0, '', 't'], ['moon', '🌙', 0, '', 't'],
    ['star', '⭐', 0, '', 't'], ['lightning', '⚡', 0, 'x', 't'], ['thermometer', '🌡️', 0, '', 't'],
    ['maple leaf', '🍁', 0, '', 't'], ['flower', '🌷', 0, '', 't'], ['kite', '🪁', 0, '', 't'], ['sled', '🛷', 0, '', 't'],
    ['skis', '🎿', 0, 'p', 't'], ['ice skates', '⛸️', 0, 'p', 't'], ['tree', '🌳', 0, '', 't'],
  ]),
  excl: [['🌧️', '⛈️', '☔', '⚡'], ['❄️', '⛄', '🛷', '🎿', '⛸️'], ['☁️', '🌫️'], ['☀️', '🏖️', '🌞', '🌈'],
    ['🌸', '🌷'], ['🍂', '🍁'], ['🌙', '⭐'], ['⛄', '❄️']],
  find: [
    (x) => (x.k === 't' ? `Find the ${x.w}` : `Which one is ${x.k === 's' ? '' : ''}${x.w}?`),
    (x) => (x.k === 't' ? `Where is the ${x.w}?` : `It is ${x.w}`),
    (x) => (x.k === 'w' ? `Show me ${x.w} weather` : x.k === 's' ? `Show me ${x.w}` : `Show me the ${x.w}`),
  ],
  yn: (x) => (x.k === 'w' ? `Is it ${x.w}?` : x.k === 's' ? `Is this ${x.w}?` : `Is this ${np(x)}?`),
  tpl: [
    { f: (x) => `It is ${x.w}`, k: 'w' }, { f: (x) => `The weather is ${x.w}`, k: 'w' },
    { f: (x) => `Today is ${x.w}`, k: 'w' }, { f: (x) => `It is ${x.w}`, k: 's' }, { f: (x) => `I like ${x.w}`, k: 's' },
    { f: (x) => `I see ${np(x)}`, k: 't' }, { f: (x) => `Look at the ${x.w}`, k: 't' },
  ],
  asks: [{ q: 'What is the weather today?', k: 'w' }, { q: 'What season is it?', k: 's' }, { q: 'What do you see?', k: 't' }],
  qa: [
    ['🎿', 'When do we ski?', 'winter', ['summer', 'spring', 'fall']], ['⛸️', 'When do we skate on the ice?', 'winter', ['summer', 'spring', 'fall']],
    ['🛷', 'When do we use a sled?', 'winter', ['summer', 'spring', 'fall']], ['🏖️', 'When do we go to the beach?', 'summer', ['winter', 'fall', 'spring']],
    ['🍁', 'When do leaves change colour?', 'fall', ['summer', 'spring', 'winter']], ['🌷', 'When do flowers grow?', 'spring', ['winter', 'fall', 'summer']],
    ['⛄', 'When do we make a snowman?', 'winter', ['summer', 'spring', 'fall']], ['🪁', 'When is it good to fly a kite?', 'windy', ['snowy', 'foggy', 'rainy']],
    ['☔', 'What do you use when it rains?', 'umbrella', ['kite', 'sled', 'skis']], ['🌡️', 'What tells you if it is hot or cold?', 'thermometer', ['umbrella', 'rainbow', 'kite']],
  ],
  sorts: [
    {
      bins: [{ text: 'Weather', emoji: '🌦️', not: 'weather' }, { text: 'Seasons', emoji: '📅', not: 'a season' }],
      groups: [['sunny', 'rainy', 'cloudy', 'windy', 'snowy', 'foggy', 'stormy'], ['spring', 'summer', 'fall', 'winter']],
      say: 'Listen. Weather or season?',
    },
    {
      bins: [{ text: 'Winter', emoji: '⛄', not: 'for winter' }, { text: 'Summer', emoji: '🏖️', not: 'for summer' }],
      groups: [['skis', 'sled', 'ice skates', 'snowy'], ['sun', 'sunny', 'summer']],
      say: 'Listen. Winter or summer?',
    },
    {
      bins: [{ text: 'Rain', emoji: '🌧️', not: 'for rainy weather' }, { text: 'Sun', emoji: '☀️', not: 'for sunny weather' }],
      groups: [['rainy', 'umbrella', 'stormy', 'lightning'], ['sunny', 'sun', 'summer']],
      say: 'Listen. Rain or sun?',
    },
  ],
  sentences: [
    { s: 'It is sunny', pic: '☀️' }, { s: 'It is raining', pic: '🌧️' },
    { s: 'It is cloudy', pic: '☁️' }, { s: 'It is windy', pic: '💨' },
    { s: 'It is snowing', pic: '❄️' }, { s: 'It is foggy', pic: '🌫️' },
    { s: 'I see a rainbow', pic: '🌈' }, { s: 'It is spring', pic: '🌸' },
    { s: 'It is summer', pic: '🏖️' }, { s: 'It is fall', pic: '🍂' },
    { s: 'It is winter', pic: '⛄' }, { s: 'I need an umbrella', pic: '☔' },
    { s: 'I see lightning', pic: '⚡' }, { s: 'I fly my kite', pic: '🪁' },
    { s: 'I go skiing', pic: '🎿' }, { s: 'I go skating', pic: '⛸️' },
    { s: 'The moon is bright', pic: '🌙' }, { s: 'The maple leaf is red', pic: '🍁' },
    { s: 'What is the weather today?' }, { s: 'I wear boots when it rains' },
    { s: 'I like to play in the snow' }, { s: 'It is hot today' }, { s: 'It is very cold' },
  ],
});
// Weather questions weigh about 1:1 against days and months questions.
const e10Gens = {
  1: [...wxStd[1], ...wxStd[1], ...dayGens[1], ...monthGens[1]],
  2: [...wxStd[2], ...dayGens[2], ...monthGens[2]],
  3: [...wxStd[3], ...wxStd[3], ...dayGens[3], ...monthGens[3]],
};

// ---------- e11 Action words ----------
const e11Gens = std({
  vocab: V([
    ['jump', '🦘'], ['run', '🏃'], ['clap', '👏'], ['swim', '🏊'], ['sleep', '🛌'],
    ['eat', '🍽️'], ['drink', '🥤'], ['draw', '🖍️'], ['write', '✍️'], ['read', '📖'],
    ['sing', '🎤'], ['dance', '💃'], ['walk', '🚶'], ['laugh', '😂'], ['cry', '😭'],
    ['cook', '🧑‍🍳'], ['climb', '🧗'], ['listen', '👂'], ['look', '👀'],
    ['ride a bike', '🚴'], ['stand', '🧍'], ['throw', '🤾'], ['wave', '👋'], ['paint', '🎨'],
    ['play the piano', '🎹'], ['play hockey', '🏒'], ['play the guitar', '🎸'], ['ski', '🎿'], ['skate', '⛸️'],
    ['think', '🤔'], ['hug', '🤗'], ['shop', '🛒'],
  ]),
  excl: [['🖍️', '✍️', '🎨'], ['🍽️', '🥤', '🧑‍🍳'], ['🏃', '🚶'], ['😂', '😭'], ['🦘', '🧗', '🤾'],
    ['🎹', '🎸'], ['👂', '👀'], ['🚴', '⛸️', '🎿', '🏒'], ['👋', '👏']],
  find: [
    (x) => `Who can ${x.w}?`, (x) => `Show me: ${x.w}`, (x) => `Find the picture: ${x.w}`,
    (x) => `Let's ${x.w}`,
  ],
  yn: (x) => `Does this show "${x.w}"?`,
  tpl: [
    { f: (x) => `I can ${x.w}` }, { f: (x) => `Can you ${x.w}?` }, { f: (x) => `Let's ${x.w}` },
    { f: (x) => `I like to ${x.w}` }, { f: (x) => `We can ${x.w} together` },
  ],
  asks: [{ q: 'What action is this?' }, { q: 'Which action is it?' }],
  qa: [
    ['👂', 'What do you do with your ears?', 'listen', ['look', 'eat', 'run']], ['👀', 'What do you do with your eyes?', 'look', ['listen', 'sing', 'clap']],
    ['👄', 'What do you do with your mouth?', 'sing', ['jump', 'swim', 'climb']], ['🦵', 'What do you do with your legs?', 'run', ['read', 'listen', 'draw']],
    ['✋', 'What do you do with your hands?', 'clap', ['jump', 'sleep', 'walk']], ['🛏️', 'What do you do at night?', 'sleep', ['swim', 'climb', 'dance']],
    ['🌊', 'What can you do in the water?', 'swim', ['sleep', 'read', 'write']], ['🎵', 'What do you do with music?', 'dance', ['write', 'sleep', 'read']],
    ['📚', 'What do you do with a book?', 'read', ['swim', 'run', 'jump']], ['🍎', 'What do you do with food?', 'eat', ['sing', 'clap', 'jump']],
  ],
  qaPool: ['jump', 'run', 'clap', 'swim', 'sleep', 'eat', 'draw', 'sing', 'dance', 'walk'],
  sorts: [
    {
      bins: [{ text: 'Big moves', emoji: '🏃', not: 'a big move' }, { text: 'Quiet', emoji: '🤫', not: 'a quiet action' }],
      groups: [['jump', 'run', 'swim', 'walk', 'dance', 'climb', 'throw', 'skate'], ['sleep', 'read', 'draw', 'write', 'listen', 'look', 'think']],
      say: 'Listen. Big moves or quiet?',
    },
    {
      bins: [{ text: 'Food time', emoji: '🍽️', not: 'for eating or drinking' }, { text: 'Fun time', emoji: '🎉', not: 'for fun time' }],
      groups: [['eat', 'drink', 'cook'], ['jump', 'run', 'sing', 'dance', 'clap']],
      say: 'Listen. Sort the actions.',
    },
    {
      bins: [{ text: 'Outside', emoji: '🌳', not: 'an outside action' }, { text: 'Inside', emoji: '🏠', not: 'an inside action' }],
      groups: [['ride a bike', 'ski', 'skate', 'run', 'climb', 'throw'], ['read', 'sleep', 'cook', 'draw', 'play the piano', 'play the guitar']],
      say: 'Listen. Outside or inside?',
    },
  ],
  sentences: [
    { s: 'I can jump', pic: '🦘' }, { s: 'I can swim', pic: '🏊' }, { s: 'I can run', pic: '🏃' },
    { s: 'I can dance', pic: '💃' }, { s: 'I can sing', pic: '🎤' }, { s: 'I can read', pic: '📖' },
    { s: 'I can write', pic: '✍️' }, { s: 'I can climb', pic: '🧗' },
    { s: 'The baby is sleeping', pic: '🛌' }, { s: 'I am eating', pic: '🍽️' },
    { s: 'We clap our hands', pic: '👏' }, { s: 'I am drinking water', pic: '🥤' },
    { s: 'He is laughing', pic: '😂' }, { s: 'She is crying', pic: '😭' },
    { s: 'I am cooking', pic: '🧑‍🍳' }, { s: 'I ride my bike', pic: '🚴' },
    { s: 'She plays the piano', pic: '🎹' }, { s: 'I am painting', pic: '🎨' },
    { s: 'I can jump and run' }, { s: 'Can you swim?' }, { s: 'Stand up and clap' },
    { s: 'Sit down and read' }, { s: 'Run and jump' }, { s: 'I can sing and dance' },
  ],
});

// ---------- e12 Useful phrases ----------
const PH = [
  { t: 'Thank you!', pic: '🙏', sit: 'Your friend gives you a gift.' },
  { t: 'Excuse me', pic: '🙋', sit: 'You want the teacher to look at you.' },
  { t: 'Sorry!', pic: '😔', sit: 'You break your friend\'s toy.' },
  { t: 'Can I have a pencil, please?', pic: '✏️', sit: 'You need a pencil.' },
  { t: 'Can I go to the bathroom?', pic: '🚻', sit: 'You need the bathroom.' },
  { t: 'I don\'t understand', pic: '🤷', sit: 'The teacher talks too fast.' },
  { t: 'Good night', pic: '🌙', sit: 'It is bedtime.' },
  { t: 'Can I have some water?', pic: '🚰', sit: 'You are thirsty.' },
  { t: 'Can you help me, please?', pic: '🆘', sit: 'You cannot open the box.' },
  { t: 'Happy birthday!', pic: '🎂', sit: 'It is your friend\'s birthday.' },
  { t: 'Bless you!', pic: '🤧', sit: 'Your friend sneezes.' },
  { t: 'Well done!', pic: '👏', sit: 'Your friend wins the game.' },
  { t: 'Can you repeat, please?', pic: '🔁', sit: 'You did not hear the teacher.' },
  { t: 'I\'m hungry', pic: '🍽️', sit: 'Your tummy is rumbling.' },
  { t: 'Let\'s play!', pic: '⚽', sit: 'You want your friend to play with you.' },
  { t: 'I\'m late', pic: '⏰', sit: 'You arrive after the bell.' },
  { t: 'Good morning!', pic: '🌅', sit: 'You see your teacher at school.' },
  { t: 'Goodbye!', pic: '👋', sit: 'Your friend is leaving.' },
  { t: 'Be careful!', pic: '⚠️', sit: 'Your friend runs near the stairs.' },
  { t: 'Stop!', pic: '🛑', sit: 'A car is coming.' },
  { t: 'Quiet, please', pic: '🤫', sit: 'The baby is sleeping.' },
  { t: 'Sit down', pic: '🪑', sit: 'The teacher wants you to sit.' },
  { t: 'Stand up', pic: '🧍', sit: 'The teacher wants you to stand.' },
  { t: 'Good job!', pic: '👍', sit: 'Your friend draws a nice picture.' },
  { t: 'Let\'s be friends', pic: '🧑‍🤝‍🧑', sit: 'You meet a new kid.' },
  { t: 'I love you', pic: '❤️', sit: 'You hug your mom.' },
  { t: 'I\'m cold', pic: '🥶', sit: 'You forgot your coat in winter.' },
  { t: 'Look!', pic: '👀', sit: 'You see a rainbow.' },
  { t: 'Wait for me!', pic: '✋', sit: 'Your friend runs ahead.' },
  { t: 'Can we share, please?', pic: '🤝', sit: 'Your friend has all the crayons.' },
];
const PH_EXCL = [
  ['I don\'t understand', 'Can you repeat, please?', 'Can you help me, please?'],
  ['Excuse me', 'Can you help me, please?', 'Can I have a pencil, please?', 'Sorry!', 'Wait for me!'],
  ['Well done!', 'Good job!', 'Happy birthday!'],
  ['Be careful!', 'Stop!', 'Wait for me!'],
  ['I\'m hungry', 'Can I have some water?', 'I\'m cold'],
  ['Good night', 'Good morning!', 'Goodbye!'],
  ['Can I have a pencil, please?', 'Can we share, please?', 'Can you help me, please?'],
  ['Quiet, please', 'Sit down', 'Stand up'],
  ['I love you', 'Let\'s be friends', 'Thank you!'],
  ['Let\'s play!', 'Let\'s be friends'],
];
const phOk = (a, b) => a.t !== b.t && !PH_EXCL.some((g) => g.includes(a.t) && g.includes(b.t));
const phWrong = (R, t, n) => R.sample(PH.filter((x) => phOk(t, x)), n);
const phPics = (R, t, n) => [t, ...phWrong(R, t, n)].map((x) => ({ emoji: x.pic }));
const phTexts = (R, t, n) => [t, ...phWrong(R, t, n)].map((x) => ({ text: x.t, say: say(x.t) }));
const SORT_HELLO = ['Hello!', 'Good morning!', 'Good night!', 'Goodbye!', 'See you tomorrow!', 'Good afternoon!', 'See you later!'];
const SORT_POLITE = ['Thank you!', 'Excuse me', 'Sorry!', 'Please', 'You\'re welcome!', 'Pardon me'];
const DIALOGS = [
  ['How are you?', 'I am fine, thank you', ['See you tomorrow', 'You\'re welcome', 'Good night']],
  ['What is your name?', 'My name is Hibou', ['I am seven', 'I am fine', 'Good night']],
  ['How old are you?', 'I am seven', ['My name is Hibou', 'I am fine', 'See you tomorrow']],
  ['Thank you!', 'You\'re welcome', ['Excuse me', 'Good night', 'I am seven']],
  ['Happy birthday!', 'Thank you', ['You\'re welcome', 'Excuse me', 'See you tomorrow']],
  ['Good morning!', 'Good morning', ['Good night', 'Sorry', 'Excuse me']],
  ['Nice to meet you', 'Nice to meet you too', ['Good night', 'I am sorry', 'See you tomorrow']],
  ['See you tomorrow!', 'See you tomorrow', ['Nice to meet you', 'I am seven', 'Thank you']],
  ['Can I have a pencil, please?', 'Here you are', ['I am fine', 'Good night', 'Nice to meet you']],
  ['Sorry!', 'It is okay', ['Good morning', 'Nice to meet you', 'I am seven']],
  ['Bless you!', 'Thank you', ['It is okay', 'Good night', 'I am seven']],
  ['Do you want to play?', 'Yes, let\'s play', ['Good night', 'Thank you very much', 'I am seven']],
  ['Where is the bathroom?', 'It is over there', ['I am seven', 'My name is Hibou', 'Good night']],
  ['Good night!', 'Good night', ['Good morning', 'Nice to meet you', 'I am seven']],
];
const e12Gens = {
  1: [
    (R) => {
      const t = R.pick(PH);
      const opts = phPics(R, t, R.chance(0.35) ? 1 : 2);
      return { type: 'choice', key: 'p1:' + t.t, prompt: P.tap, say: say(t.t), options: opts, answer: 0, cols: opts.length };
    },
    (R) => {
      const t = R.pick(PH);
      const truth = R.chance(0.5);
      const shown = truth ? t : R.pick(PH.filter((x) => phOk(t, x)));
      return {
        type: 'choice', key: 'p1y:' + t.t + ':' + shown.pic, prompt: P.tf, say: say(t.t),
        stimulus: { emoji: shown.pic }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
  ],
  2: [
    (R) => {
      const t = R.pick(PH);
      return { type: 'choice', key: 'p2a:' + t.t, prompt: P.tap, say: say(t.t), options: phPics(R, t, 3), answer: 0, cols: 2 };
    },
    (R) => {
      const t = R.pick(PH);
      return {
        type: 'choice', key: 'p2b:' + t.t, prompt: P.say, say: say('What do you say?'),
        stimulus: { emoji: t.pic }, options: phTexts(R, t, 2), answer: 0,
      };
    },
    (R) => {
      const a = R.sample(SORT_HELLO, R.int(2, 3));
      const b = R.sample(SORT_POLITE, R.int(2, 3));
      return {
        type: 'sort', key: 'p2c:' + [...a, ...b].sort().join('|'), prompt: P.sortW, say: say('Listen. Sort the words.'),
        bins: [{ text: 'Hello and goodbye', emoji: '👋' }, { text: 'Polite words', emoji: '🙏' }],
        items: R.shuffle([...a.map((x) => ({ text: x, say: say(x), bin: 0 })), ...b.map((x) => ({ text: x, say: say(x), bin: 1 }))]),
      };
    },
    (R) => {
      const t = R.pick(PH);
      return {
        type: 'choice', key: 'p2d:' + t.t, prompt: P.say, say: say(t.sit + ' What do you say?'),
        stimulus: { emoji: t.pic }, options: phTexts(R, t, 2), answer: 0,
      };
    },
  ],
  3: [
    (R) => {
      const t = R.pick(PH);
      return {
        type: 'choice', key: 'p3s:' + t.t, prompt: P.say, say: say(t.sit + ' What do you say?'),
        options: phTexts(R, t, 2), answer: 0,
      };
    },
    (R) => {
      const t = R.pick(PH.filter((x) => x.t.split(' ').length >= 2));
      return {
        type: 'order', key: 'p3o:' + t.t, prompt: P.phrase, say: say(t.t),
        stimulus: { emoji: t.pic }, tiles: t.t.split(' '), joiner: ' ',
      };
    },
    (R) => {
      const [q, a, wr] = R.pick(DIALOGS);
      return {
        type: 'choice', key: 'p3d:' + q, prompt: P.reply, say: say(q), options: words([a, ...R.sample(wr, 2)]), answer: 0, cols: 3,
      };
    },
    (R) => {
      const t = R.pick(PH);
      const truth = R.chance(0.5);
      const used = truth ? t : R.pick(PH.filter((x) => phOk(t, x)));
      return {
        type: 'choice', key: 'p3y:' + t.t + ':' + used.t, prompt: P.yn, say: say(`${t.sit} You say: ${used.t}`),
        stimulus: { emoji: t.pic }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
  ],
};

// ---------- e13 Toys & games ----------
const e13Gens = std({
  vocab: V([
    ['soccer ball', '⚽', 0, '', 'a'], ['basketball', '🏀', 0, '', 'a'], ['football', '🏈', 0, '', 'a'],
    ['baseball', '⚾', 0, '', 'a'], ['tennis ball', '🎾', 0, '', 'a'],
    ['hockey stick', '🏒', 0, '', 'b'], ['bowling', '🎳', 0, 'x', 'b'], ['trophy', '🏆', 0, '', 'b'],
    ['teddy bear', '🧸', 0, '', 't'], ['kite', '🪁', 0, '', 't'], ['puzzle', '🧩', 0, '', 't'], ['blocks', '🧱', 0, 'p', 't'],
    ['robot', '🤖', 0, '', 't'], ['balloon', '🎈', 0, '', 't'], ['yo-yo', '🪀', 0, '', 't'], ['magic wand', '🪄', 0, '', 't'],
    ['dice', '🎲', 0, 'p', 't'], ['cards', '🃏', 0, 'p', 't'], ['video game', '🎮', 0, '', 't'], ['chess', '♟️', 0, 'x', 't'],
    ['drum', '🥁', 0, '', 'i'], ['guitar', '🎸', 0, '', 'i'], ['piano', '🎹', 0, '', 'i'], ['trumpet', '🎺', 0, '', 'i'],
    ['violin', '🎻', 0, '', 'i'],
    ['skateboard', '🛹', 0, '', 'r'], ['scooter', '🛴', 0, '', 'r'], ['roller skates', '🛼', 0, 'p', 'r'],
  ]),
  excl: [['⚽', '🏀', '🏈', '⚾', '🎾', '🎳'], ['🥁', '🎸', '🎹', '🎺', '🎻'], ['🛹', '🛴', '🛼'], ['🏒', '🏆']],
  find: [
    (x) => `Find the ${x.w}`, (x) => `Where ${x.f === 'p' ? 'are the' : 'is the'} ${x.w}?`,
    (x) => `Show me the ${x.w}`, (x) => (x.k === 'i' ? `Listen to the ${x.w}` : `I want ${np(x)}`),
  ],
  tpl: [
    { f: (x) => `Look at the ${x.w}` }, { f: (x) => thisIs(x) },
    { f: (x) => `I have ${np(x)}`, k: 't' }, { f: (x) => `I play with ${np(x)}`, k: 't' },
    { f: (x) => `Throw the ${x.w}`, k: 'a' }, { f: (x) => `I like the ${x.w}`, k: 'a' },
    { f: (x) => `I play the ${x.w}`, k: 'i' }, { f: (x) => `Listen to the ${x.w}`, k: 'i' },
    { f: (x) => `I ride ${np(x)}`, k: 'r' }, { f: (x) => `I like ${x.f === 'p' ? x.w : 'my ' + x.w}`, k: 'r' },
    { f: (x) => `I want ${np(x)}`, k: 'b' },
  ],
  asks: [{ q: 'What do you want to play with?', k: 't' }, { q: 'What is this toy?', k: 't' }, { q: 'Which ball is it?', k: 'a' }, { q: 'Which instrument is it?', k: 'i' }],
  qa: [
    ['⚽', 'What do you kick?', 'soccer ball', ['robot', 'drum', 'puzzle']], ['🪁', 'What do you fly in the wind?', 'kite', ['puzzle', 'drum', 'robot']],
    ['🧱', 'What do you build with?', 'blocks', ['kite', 'drum', 'dice']], ['🧸', 'What do you hug at night?', 'teddy bear', ['trumpet', 'scooter', 'puzzle']],
    ['🛹', 'What do you ride on the street?', 'skateboard', ['piano', 'puzzle', 'blocks']], ['🥁', 'What do you hit to make music?', 'drum', ['kite', 'dice', 'puzzle']],
    ['🎹', 'What has black and white keys?', 'piano', ['guitar', 'drum', 'violin']], ['🏒', 'What do you play in the ice rink?', 'hockey stick', ['kite', 'puzzle', 'cards']],
    ['🎈', 'What floats in the air at a party?', 'balloon', ['blocks', 'robot', 'dice']], ['🏆', 'What do you win?', 'trophy', ['kite', 'blocks', 'drum']],
    ['🧩', 'What has many small pieces?', 'puzzle', ['balloon', 'drum', 'kite']], ['🎲', 'What do you roll in a board game?', 'dice', ['kite', 'drum', 'robot']],
  ],
  sorts: [
    {
      bins: [{ text: 'Balls', emoji: '⚽', not: 'a ball' }, { text: 'Music', emoji: '🎵', not: 'a music instrument' }],
      groups: [['soccer ball', 'basketball', 'football', 'baseball', 'tennis ball'], ['drum', 'guitar', 'piano', 'trumpet', 'violin']],
      say: 'Listen. Balls or music?',
    },
    {
      bins: [{ text: 'Inside', emoji: '🏠', not: 'a toy for inside' }, { text: 'Outside', emoji: '🌳', not: 'a toy for outside' }],
      groups: [['puzzle', 'blocks', 'teddy bear', 'cards', 'dice', 'video game', 'chess'], ['kite', 'skateboard', 'scooter', 'roller skates', 'soccer ball', 'hockey stick', 'basketball']],
      say: 'Listen. Inside or outside?',
    },
    {
      bins: [{ text: 'Sports', emoji: '🏅', not: 'for sports' }, { text: 'Toys', emoji: '🧸', not: 'a toy' }],
      groups: [['soccer ball', 'basketball', 'hockey stick', 'baseball', 'bowling', 'tennis ball'], ['teddy bear', 'puzzle', 'blocks', 'robot', 'yo-yo', 'magic wand']],
      say: 'Listen. Sports or toys?',
    },
    {
      bins: [{ text: 'Wheels', emoji: '🛹', not: 'something with wheels' }, { text: 'No wheels', emoji: '🧸', not: 'something without wheels' }],
      groups: [['skateboard', 'scooter', 'roller skates'], ['teddy bear', 'puzzle', 'kite', 'drum', 'dice']],
      say: 'Listen. Wheels or no wheels?',
    },
  ],
  sentences: [
    { s: 'I kick the ball', pic: '⚽' }, { s: 'I play basketball', pic: '🏀' },
    { s: 'I fly my kite', pic: '🪁' }, { s: 'I build with blocks', pic: '🧱' },
    { s: 'I hug my teddy bear', pic: '🧸' }, { s: 'I do a puzzle', pic: '🧩' },
    { s: 'The robot is cool', pic: '🤖' }, { s: 'I like my balloon', pic: '🎈' },
    { s: 'I play the drum', pic: '🥁' }, { s: 'I play the guitar', pic: '🎸' },
    { s: 'I play the piano', pic: '🎹' }, { s: 'I ride my skateboard', pic: '🛹' },
    { s: 'I play hockey', pic: '🏒' }, { s: 'I roll the dice', pic: '🎲' },
    { s: 'I play a video game', pic: '🎮' }, { s: 'I win a trophy', pic: '🏆' },
    { s: 'Let\'s play a game' }, { s: 'It is your turn' }, { s: 'I want to play' },
    { s: 'Can I play too?' }, { s: 'You are a good player' }, { s: 'Let\'s play outside' },
  ],
});

// ---------- e14 My house ----------
const e14Gens = std({
  vocab: V([
    ['house', '🏠', 0, '', 'h'], ['garden', '🌳', 0, '', 'h'], ['mailbox', '📫', 0, '', 'h'], ['door', '🚪', 0, '', 'o'],
    ['window', '🪟', 0, '', 'o'], ['key', '🔑', 0, '', 'o'], ['bed', '🛏️', 0, '', 'o'], ['sofa', '🛋️', 0, '', 'o'],
    ['chair', '🪑', 0, '', 'o'], ['lamp', '💡', 0, '', 'o'], ['TV', '📺', 0, '', 'o'], ['phone', '☎️', 0, '', 'o'],
    ['clock', '🕒', 0, '', 'o'], ['mirror', '🪞', 0, '', 'o'], ['toilet', '🚽', 0, '', 'o'], ['shower', '🚿', 0, '', 'o'],
    ['bathtub', '🛁', 0, '', 'o'], ['sink', '🚰', 0, '', 'o'], ['fork', '🍴', 0, '', 'o'], ['spoon', '🥄', 0, '', 'o'],
    ['plate', '🍽️', 0, '', 'o'], ['pan', '🍳', 0, '', 'o'], ['broom', '🧹', 0, '', 'o'], ['plant', '🪴', 0, '', 'o'],
    ['picture', '🖼️', 0, '', 'o'], ['books', '📚', 0, 'p', 'o'], ['radio', '📻', 0, '', 'o'], ['trash can', '🗑️', 0, '', 'o'],
    ['candle', '🕯️', 0, '', 'o'], ['ladder', '🪜', 0, '', 'o'], ['bucket', '🪣', 0, '', 'o'],
  ]),
  excl: [['🛁', '🚿', '🚰'], ['🛋️', '🪑'], ['🍴', '🥄', '🍽️'], ['💡', '🕯️'], ['🏠', '📫'], ['☎️', '📻', '📺'],
    ['🪟', '🚪', '🪞']],
  find: [
    (x) => `Find the ${x.w}`, (x) => `Where ${x.f === 'p' ? 'are the' : 'is the'} ${x.w}?`,
    (x) => `Show me the ${x.w}`, (x) => `Look at the ${x.w}`,
  ],
  tpl: [
    { f: (x) => `I see ${np(x)}` }, { f: (x) => thisIs(x) },
    { f: (x) => (x.f === 'p' ? `There are ${x.w} in my house` : `There is ${np(x)} in my house`), k: 'o' },
    { f: (x) => `This is my ${x.w}`, k: 'h' }, { f: (x) => `I see my ${x.w}`, k: 'h' },
    { f: (x) => `Look at my ${x.w}`, k: 'o' },
  ],
  asks: [{ q: 'What is this?', k: 'o' }, { q: 'What is in the house?', k: 'o' }],
  qa: [
    ['🛏️', 'Where do you sleep?', 'bedroom', ['kitchen', 'bathroom', 'garden']], ['🍳', 'Where do you cook?', 'kitchen', ['bedroom', 'bathroom', 'garden']],
    ['🛁', 'Where do you take a bath?', 'bathroom', ['kitchen', 'bedroom', 'living room']], ['📺', 'Where do you watch TV?', 'living room', ['bathroom', 'kitchen', 'garage']],
    ['🌷', 'Where do flowers grow?', 'garden', ['bathroom', 'kitchen', 'bedroom']], ['🍽️', 'Where do you eat?', 'kitchen', ['bathroom', 'bedroom', 'garden']],
    ['🚿', 'Where do you take a shower?', 'bathroom', ['kitchen', 'bedroom', 'living room']], ['🛋️', 'Where is the sofa?', 'living room', ['bathroom', 'kitchen', 'garden']],
    ['🚗', 'Where do we put the car?', 'garage', ['kitchen', 'bedroom', 'bathroom']], ['🪥', 'Where do you brush your teeth?', 'bathroom', ['kitchen', 'garden', 'garage']],
    ['🔑', 'What opens the door?', 'key', ['spoon', 'lamp', 'plant']], ['🍴', 'What do you eat with?', 'fork', ['broom', 'ladder', 'mirror']],
    ['🧹', 'What do you use to clean the floor?', 'broom', ['spoon', 'lamp', 'plate']], ['🪞', 'What do you look at in the bathroom?', 'mirror', ['sink', 'toilet', 'broom']],
  ],
  sorts: [
    {
      bins: [{ text: 'Bedroom', emoji: '🛏️', not: 'in a bedroom' }, { text: 'Kitchen', emoji: '🍳', not: 'in a kitchen' }, { text: 'Bathroom', emoji: '🛁', not: 'in a bathroom' }],
      groups: [['bed', 'lamp', 'books', 'clock'], ['fork', 'spoon', 'plate', 'pan'], ['toilet', 'shower', 'bathtub', 'mirror', 'sink']],
      say: 'Listen. Which room?',
    },
    {
      bins: [{ text: 'Living room', emoji: '🛋️', not: 'in a living room' }, { text: 'Kitchen', emoji: '🍳', not: 'in a kitchen' }],
      groups: [['sofa', 'TV', 'radio', 'plant', 'picture', 'candle'], ['fork', 'spoon', 'plate', 'pan']],
      say: 'Listen. Which room?',
    },
    {
      bins: [{ text: 'Inside', emoji: '🏠', not: 'inside the house' }, { text: 'Outside', emoji: '🌳', not: 'outside the house' }],
      groups: [['bed', 'sofa', 'TV', 'lamp', 'fork', 'toilet', 'plate'], ['garden', 'mailbox']],
      say: 'Listen. Inside or outside?',
    },
    {
      bins: [{ text: 'Bedroom', emoji: '🛏️', not: 'in a bedroom' }, { text: 'Bathroom', emoji: '🛁', not: 'in a bathroom' }],
      groups: [['bed', 'lamp', 'books', 'clock', 'picture'], ['toilet', 'shower', 'bathtub', 'mirror', 'sink']],
      say: 'Listen. Which room?',
    },
  ],
  sentences: [
    { s: 'I live in a house', pic: '🏠' }, { s: 'I open the door', pic: '🚪' },
    { s: 'I look out the window', pic: '🪟' }, { s: 'I sleep in my bed', pic: '🛏️' },
    { s: 'I sit on the sofa', pic: '🛋️' }, { s: 'I watch TV', pic: '📺' },
    { s: 'I turn on the lamp', pic: '💡' }, { s: 'I take a shower', pic: '🚿' },
    { s: 'I eat with a fork', pic: '🍴' }, { s: 'I eat soup with a spoon', pic: '🥄' },
    { s: 'The plant is green', pic: '🪴' }, { s: 'Dad uses a broom', pic: '🧹' },
    { s: 'I read my books', pic: '📚' }, { s: 'Mom cooks in the pan', pic: '🍳' },
    { s: 'I look in the mirror', pic: '🪞' }, { s: 'I check the mailbox', pic: '📫' },
    { s: 'Welcome to my house' }, { s: 'Come in, please' }, { s: 'This is my room' },
    { s: 'I help at home' }, { s: 'My house is big' }, { s: 'My room is clean' },
  ],
});

// ---------- e15 Transportation ----------
const e15Gens = std({
  vocab: V([
    ['car', '🚗', 0, '', 'v'], ['bus', '🚌', 0, '', 'v'], ['taxi', '🚕', 0, '', 'v'], ['train', '🚆', 0, '', 'v'],
    ['airplane', '✈️', 0, '', 'v'], ['helicopter', '🚁', 0, '', 'v'], ['sailboat', '⛵', 0, '', 'v'], ['ship', '🚢', 0, '', 'v'],
    ['bicycle', '🚲', 0, '', 'v'], ['motorcycle', '🏍️', 0, '', 'v'], ['truck', '🚚', 0, '', 'v'],
    ['fire truck', '🚒', 0, '', 'v'], ['ambulance', '🚑', 0, '', 'v'], ['police car', '🚓', 0, '', 'v'],
    ['tractor', '🚜', 0, '', 'v'], ['subway', '🚇', 0, '', 'v'], ['rocket', '🚀', 0, '', 'v'], ['scooter', '🛴', 0, '', 'v'],
    ['canoe', '🛶', 0, '', 'v'], ['sled', '🛷', 0, '', 'v'], ['speedboat', '🚤', 0, '', 'v'], ['cable car', '🚠', 0, '', 'v'],
    ['traffic light', '🚦', 0, '', 'o'], ['stop sign', '🛑', 0, '', 'o'], ['road', '🛣️', 0, '', 'o'],
    ['gas station', '⛽', 0, '', 'o'], ['bridge', '🌉', 0, '', 'o'],
  ]),
  excl: [['🚗', '🚕', '🚓', '🚑'], ['⛵', '🚤', '🚢', '🛶'], ['🚆', '🚇', '🚠'], ['🏍️', '🚲', '🛴'], ['🚚', '🚒', '🚜'],
    ['🛑', '🚦']],
  find: [
    (x) => `Find the ${x.w}`, (x) => `Where is the ${x.w}?`, (x) => `Show me the ${x.w}`, (x) => `I see ${np(x)}`,
  ],
  tpl: [
    { f: (x) => `I see ${np(x)}` }, { f: (x) => `Look at the ${x.w}` }, { f: (x) => `This is ${np(x)}` },
    { f: (x) => `I like the ${x.w}` }, { f: (x) => `The ${x.w} is here`, k: 'v' }, { f: (x) => `The ${x.w} is coming`, k: 'v' },
    { f: (x) => `Stop at the ${x.w}`, k: 'o' },
  ],
  asks: [{ q: 'What is this?', k: 'v' }, { q: 'What do you see?', k: 'v' }],
  qa: [
    ['✈️', 'What flies in the sky?', 'airplane', ['train', 'ship', 'bicycle']], ['🌊', 'What goes on the water?', 'sailboat', ['train', 'truck', 'bicycle']],
    ['🛤️', 'What goes on rails?', 'train', ['sailboat', 'airplane', 'canoe']], ['🔥', 'Who puts out fires?', 'fire truck', ['taxi', 'tractor', 'bicycle']],
    ['🏥', 'What takes sick people to the hospital?', 'ambulance', ['tractor', 'sailboat', 'rocket']], ['🚲', 'What has two wheels and pedals?', 'bicycle', ['car', 'bus', 'train']],
    ['🌾', 'What does a farmer drive?', 'tractor', ['rocket', 'ship', 'taxi']], ['🌕', 'What goes to the moon?', 'rocket', ['bicycle', 'taxi', 'canoe']],
    ['🏫', 'What do you take to school?', 'bus', ['rocket', 'ship', 'canoe']], ['🔴', 'What do you do at a red light?', 'stop', ['go', 'jump', 'sleep']],
    ['🚦', 'What shows red, yellow and green?', 'traffic light', ['stop sign', 'bridge', 'road']], ['🚓', 'Who catches the bad guys?', 'police car', ['taxi', 'tractor', 'sled']],
  ],
  sorts: [
    {
      bins: [{ text: 'Air', emoji: '☁️', not: 'in the air' }, { text: 'Water', emoji: '🌊', not: 'on the water' }, { text: 'Road', emoji: '🛣️', not: 'on the road' }],
      groups: [['airplane', 'helicopter', 'rocket'], ['sailboat', 'ship', 'speedboat', 'canoe'], ['car', 'bus', 'truck', 'taxi', 'bicycle', 'motorcycle']],
      say: 'Listen. Air, water or road?',
    },
    {
      bins: [{ text: 'Emergency', emoji: '🚨', not: 'an emergency vehicle' }, { text: 'Other', emoji: '🚗', not: 'another vehicle' }],
      groups: [['fire truck', 'ambulance', 'police car'], ['car', 'bus', 'taxi', 'tractor', 'bicycle', 'train']],
      say: 'Listen. Emergency or other?',
    },
    {
      bins: [{ text: 'Wheels', emoji: '🚗', not: 'something with wheels' }, { text: 'No wheels', emoji: '⛵', not: 'something without wheels' }],
      groups: [['car', 'bus', 'bicycle', 'truck', 'motorcycle', 'scooter'], ['sailboat', 'ship', 'canoe', 'sled', 'rocket']],
      say: 'Listen. Wheels or no wheels?',
    },
  ],
  sentences: [
    { s: 'The bus is yellow', pic: '🚌' }, { s: 'The fire truck is red', pic: '🚒' },
    { s: 'The plane can fly', pic: '✈️' }, { s: 'The boat is on the water', pic: '⛵' },
    { s: 'The train goes choo choo', pic: '🚆' }, { s: 'Stop at the red light', pic: '🚦' },
    { s: 'The ambulance helps sick people', pic: '🚑' }, { s: 'The police car goes fast', pic: '🚓' },
    { s: 'The tractor is on the farm', pic: '🚜' }, { s: 'I ride my bike', pic: '🚲' },
    { s: 'The rocket goes to space', pic: '🚀' }, { s: 'We paddle the canoe', pic: '🛶' },
    { s: 'Fill the car with gas', pic: '⛽' }, { s: 'The helicopter is loud', pic: '🚁' },
    { s: 'We cross the bridge', pic: '🌉' }, { s: 'The taxi is waiting', pic: '🚕' },
    { s: 'I go to school by bus' }, { s: 'We go by car' }, { s: 'Let\'s take the train' },
    { s: 'Look both ways' }, { s: 'Buckle your seat belt' }, { s: 'I wear a helmet' },
  ],
});

// ---------- e16 Where is it? (in / on / under / next to) ----------
const ITEMS16 = [
  ['cat', '🐱'], ['dog', '🐶'], ['ball', '⚽'], ['bird', '🐦'], ['teddy bear', '🧸'], ['apple', '🍎'],
  ['mouse', '🐭'], ['duck', '🦆'], ['book', '📖'], ['star', '⭐'], ['rabbit', '🐰'], ['frog', '🐸'],
].map(([n, e]) => ({ n, e }));
const PREPS16 = { box: ['in', 'on', 'next to'], table: ['on', 'under', 'next to'] };
const SVG16 = (inner) =>
  `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" role="img"><rect x="0" y="120" width="200" height="6" fill="#8fd18f"/>${inner}</svg>`;
const txt16 = (e, x, y) => `<text x="${x}" y="${y}" font-size="38" text-anchor="middle">${e}</text>`;
function scene16(item, obj, prep) {
  const dx = prep === 'next to' ? (obj === 'box' ? -30 : -35) : 0;
  let body = '';
  if (obj === 'box') {
    const bx = 70 + dx;
    const back = `<rect x="${bx}" y="72" width="60" height="48" fill="#b9854a" stroke="#6b4423" stroke-width="3"/>`;
    const front = `<rect x="${bx}" y="94" width="60" height="26" fill="#d9a066" stroke="#6b4423" stroke-width="3"/>`;
    if (prep === 'in') body = back + txt16(item.e, 100, 104) + front;
    else if (prep === 'on') body = back + front + txt16(item.e, 100 + dx, 70);
    else body = back + front + txt16(item.e, 152, 118);
  } else {
    const tx = 45 + dx;
    const table = `<rect x="${tx}" y="70" width="110" height="10" fill="#c98f4d" stroke="#6b4423" stroke-width="3"/>` +
      `<rect x="${tx + 7}" y="80" width="8" height="40" fill="#c98f4d" stroke="#6b4423" stroke-width="2"/>` +
      `<rect x="${tx + 95}" y="80" width="8" height="40" fill="#c98f4d" stroke="#6b4423" stroke-width="2"/>`;
    if (prep === 'on') body = table + txt16(item.e, 100, 68);
    else if (prep === 'under') body = table + txt16(item.e, 100 + dx, 118);
    else body = table + txt16(item.e, 168, 118);
  }
  return SVG16(body);
}
const rnd16 = (R) => {
  const obj = R.pick(['box', 'table']);
  return { item: R.pick(ITEMS16), obj, prep: R.pick(PREPS16[obj]) };
};
const phrase16 = (obj, prep) => `${prep} the ${obj}`;
const sent16 = (item, obj, prep) => `The ${item.n} is ${prep} the ${obj}`;
const otherPreps = (obj, prep) => PREPS16[obj].filter((p) => p !== prep);
const e16Gens = {
  1: [
    (R) => {
      const { item, obj, prep } = rnd16(R);
      const opts = [prep, ...R.sample(otherPreps(obj, prep), R.chance(0.4) ? 1 : 2)].map((p) => ({ svg: scene16(item, obj, p) }));
      return {
        type: 'choice', key: 'w1a:' + item.n + obj + prep, prompt: P.tap, say: say(sent16(item, obj, prep)),
        options: opts, answer: 0, cols: opts.length,
      };
    },
    (R) => {
      const { item, obj, prep } = rnd16(R);
      const truth = R.chance(0.5);
      const shown = truth ? prep : R.pick(otherPreps(obj, prep));
      return {
        type: 'choice', key: 'w1y:' + item.n + obj + prep + shown, prompt: P.yn,
        say: say(`Is the ${item.n} ${prep} the ${obj}?`),
        stimulus: { svg: scene16(item, obj, shown) }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
    (R) => {
      const { item, obj, prep } = rnd16(R);
      return {
        type: 'choice', key: 'w1c:' + item.n + obj + prep, prompt: P.tap, say: say(`Where is the ${item.n}? ${cap(prep)} the ${obj}`),
        options: [prep, ...otherPreps(obj, prep)].map((p) => ({ svg: scene16(item, obj, p) })), answer: 0, cols: 3,
      };
    },
  ],
  2: [
    (R) => {
      const { item, obj, prep } = rnd16(R);
      return {
        type: 'choice', key: 'w2a:' + item.n + obj + prep, prompt: P.where, say: say(`Where is the ${item.n}?`),
        stimulus: { svg: scene16(item, obj, prep) },
        options: PREPS16[obj].map((p) => ({ text: phrase16(obj, p), say: say(phrase16(obj, p)) })),
        answer: PREPS16[obj].indexOf(prep), fixedOrder: false, cols: 3,
      };
    },
    (R) => {
      const { item, obj, prep } = rnd16(R);
      const other = R.pick(ITEMS16.filter((i) => i.n !== item.n));
      const diffs = R.sample(otherPreps(obj, prep), 2);
      const opts = [{ svg: scene16(item, obj, prep) }, { svg: scene16(other, obj, prep) },
        ...diffs.map((p) => ({ svg: scene16(item, obj, p) }))].slice(0, 4);
      return {
        type: 'choice', key: 'w2b:' + item.n + obj + prep + other.n, prompt: P.tap, say: say(sent16(item, obj, prep)),
        options: opts, answer: 0, cols: 2,
      };
    },
    (R) => {
      const { item, obj, prep } = rnd16(R);
      const opts = [prep, ...otherPreps(obj, prep)].map((p) => ({ svg: scene16(item, obj, p) }));
      const other = R.pick(ITEMS16.filter((i) => i.n !== item.n));
      opts.push({ svg: scene16(other, obj, prep) });
      return {
        type: 'choice', key: 'w2c:' + item.n + obj + prep + other.n, prompt: P.tap, say: say(`Where is the ${item.n}? ${cap(prep)} the ${obj}`),
        options: opts, answer: 0, cols: 2,
      };
    },
    (R) => {
      const { item, obj, prep } = rnd16(R);
      return {
        type: 'choice', key: 'w2d:' + item.n + obj + prep, prompt: P.where, say: say(`Look. Where is the ${item.n}?`),
        stimulus: { svg: scene16(item, obj, prep) },
        options: [prep, ...otherPreps(obj, prep)].map((p) => ({ text: cap(p), say: say(p) })), answer: 0, cols: 3,
      };
    },
  ],
  3: [
    (R) => {
      const { item, obj, prep } = rnd16(R);
      const s = sent16(item, obj, prep);
      return {
        type: 'order', key: 'w3o:' + s, prompt: P.order, say: say(s), stimulus: { svg: scene16(item, obj, prep) },
        tiles: s.split(' '), joiner: ' ',
      };
    },
    (R) => {
      const { item, obj, prep } = rnd16(R);
      const wrongs = otherPreps(obj, prep).map((p) => sent16(item, obj, p));
      return {
        type: 'choice', key: 'w3q:' + item.n + obj + prep, prompt: P.where, say: say(`Where is the ${item.n}?`),
        stimulus: { svg: scene16(item, obj, prep) },
        options: words([sent16(item, obj, prep), ...wrongs]), answer: 0, cols: 1,
      };
    },
    (R) => {
      const { item, obj, prep } = rnd16(R);
      const truth = R.chance(0.5);
      const used = truth ? prep : R.pick(otherPreps(obj, prep));
      return {
        type: 'choice', key: 'w3t:' + item.n + obj + prep + used, prompt: P.tf, say: say(sent16(item, obj, used)),
        stimulus: { svg: scene16(item, obj, prep) }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
    (R) => {
      const { item, obj, prep } = rnd16(R);
      const other = R.pick(ITEMS16.filter((i) => i.n !== item.n));
      const otherPrep = R.pick(otherPreps(obj, prep));
      const opts = [
        { svg: scene16(item, obj, prep) }, { svg: scene16(item, obj, otherPrep) }, { svg: scene16(other, obj, prep) },
      ];
      return {
        type: 'choice', key: 'w3p:' + item.n + obj + prep + other.n + otherPrep, prompt: P.tap, say: say(sent16(item, obj, prep)),
        options: opts, answer: 0, cols: 3,
      };
    },
    (R) => {
      const item = R.pick(ITEMS16);
      const obj = R.pick(['box', 'table']);
      const preps = PREPS16[obj];
      const s = R.pick(preps);
      const q = `Put the ${item.n} ${s} the ${obj}`;
      return {
        type: 'choice', key: 'w3i:' + q, prompt: P.tap, say: say(q),
        options: preps.map((p) => ({ svg: scene16(item, obj, p) })), answer: preps.indexOf(s), cols: 3,
      };
    },
  ],
};

// ---------- e17 My day ----------
const CLOCK_H = ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛'];
const CLOCK_HALF = ['🕜', '🕝', '🕞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧'];
// time = { h: 1..12, half: bool }
const allTimes = [];
for (let h = 1; h <= 12; h++) { allTimes.push({ h, half: false }); allTimes.push({ h, half: true }); }
const timeEmoji = (t) => (t.half ? CLOCK_HALF : CLOCK_H)[t.h - 1];
const timeWords = (t) => (t.half ? `half past ${NUMW[t.h]}` : `${NUMW[t.h]} o'clock`);
const timeKey = (t) => t.h + (t.half ? 'h' : 'o');
const otherTimes = (R, t, n, sameKind) =>
  R.sample(allTimes.filter((x) => timeKey(x) !== timeKey(t) && (!sameKind || x.half === t.half)), n);
const EVENTS = [
  ['wake up', [6, 7]], ['eat breakfast', [7, 8]], ['go to school', [8]], ['eat lunch', [12]],
  ['come home', [3, 4]], ['eat dinner', [5, 6]], ['take a bath', [7]], ['go to bed', [8, 9]],
];
const ACT_K = ['m', 'a', 'e', 'n'];
const e17Std = std({
  vocab: V([
    ['wake up', '⏰', 0, '', 'm'], ['get dressed', '👕', 0, '', 'm'], ['brush my teeth', '🪥', 0, '', 'm'],
    ['wash my face', '🧼', 0, '', 'm'], ['eat breakfast', '🥞', 0, '', 'm'], ['put on my coat', '🧥', 0, '', 'm'],
    ['take the bus', '🚌', 0, '', 'm'], ['go to school', '🏫', 0, '', 'm'], ['pack my bag', '🎒', 0, '', 'm'],
    ['eat lunch', '🥪', 0, '', 'a'], ['have a snack', '🍎', 0, '', 'a'], ['play with my toys', '🧸', 0, '', 'a'],
    ['do my homework', '📝', 0, '', 'a'], ['ride my bike', '🚲', 0, '', 'a'], ['read a book', '📖', 0, '', 'a'],
    ['go home', '🏠', 0, '', 'a'],
    ['eat dinner', '🍝', 0, '', 'e'], ['take a bath', '🛁', 0, '', 'e'], ['watch TV', '📺', 0, '', 'e'],
    ['clean my room', '🧹', 0, '', 'e'], ['go to bed', '🛏️', 0, '', 'n'], ['sleep', '😴', 0, '', 'n'],
    ['morning', '🌅', 0, '', 't'], ['afternoon', '🌞', 0, '', 't'], ['evening', '🌆', 0, '', 't'], ['night', '🌙', 0, '', 't'],
  ]),
  excl: [['🥞', '🥪', '🍝', '🍎'], ['🧼', '🛁', '🪥'], ['🛏️', '😴'], ['🏫', '🚌'], ['🌅', '🌞', '🌆', '🌙'],
    ['🏠', '🏫'], ['👕', '🧥'], ['📖', '📝'], ['🛁', '🛏️']],
  find: [
    (x) => (x.k === 't' ? `It is ${x.w}` : `I ${x.w}`), (x) => (x.k === 't' ? `Good ${x.w}!` : `Time to ${x.w}`),
    (x) => (x.k === 't' ? `Show me the ${x.w}` : `Let's ${x.w}`),
  ],
  yn: (x) => (x.k === 't' ? `Is it ${x.w}?` : `Does this show "${x.w}"?`),
  tpl: [
    { f: (x) => `I ${x.w}`, k: ACT_K }, { f: (x) => `Time to ${x.w}`, k: ACT_K }, { f: (x) => `Let's ${x.w}`, k: ACT_K },
    { f: (x) => `Good ${x.w}!`, k: 't' }, { f: (x) => `It is ${x.w}`, k: 't' },
  ],
  sorts: [
    {
      bins: [{ text: 'Morning', emoji: '🌅', not: 'something for the morning' }, { text: 'Evening', emoji: '🌆', not: 'something for the evening' }],
      groups: [['wake up', 'get dressed', 'eat breakfast', 'go to school', 'take the bus'], ['eat dinner', 'take a bath', 'watch TV', 'go to bed', 'clean my room']],
      say: 'Listen. Morning or evening?',
    },
    {
      bins: [{ text: 'Morning', emoji: '🌅', not: 'something for the morning' }, { text: 'Afternoon', emoji: '🌞', not: 'something for the afternoon' }],
      groups: [['wake up', 'get dressed', 'eat breakfast', 'brush my teeth', 'pack my bag'], ['eat lunch', 'have a snack', 'play with my toys', 'do my homework', 'ride my bike']],
      say: 'Listen. Morning or afternoon?',
    },
    {
      bins: [{ text: 'Day', emoji: '☀️', not: 'a daytime action' }, { text: 'Night', emoji: '🌙', not: 'a nighttime action' }],
      groups: [['go to school', 'eat lunch', 'play with my toys', 'ride my bike', 'do my homework'], ['go to bed', 'sleep', 'take a bath', 'watch TV']],
      say: 'Listen. Day or night?',
    },
  ],
  sentences: [
    { s: 'I wake up at seven', pic: '⏰' }, { s: 'I get dressed', pic: '👕' }, { s: 'I brush my teeth', pic: '🪥' },
    { s: 'I eat pancakes for breakfast', pic: '🥞' }, { s: 'I go to school', pic: '🏫' },
    { s: 'I take the bus', pic: '🚌' }, { s: 'I eat my lunch', pic: '🥪' }, { s: 'I do my homework', pic: '📝' },
    { s: 'I read before bed', pic: '📖' }, { s: 'I take a bath', pic: '🛁' }, { s: 'I go to bed', pic: '🛏️' },
    { s: 'I sleep at night', pic: '😴' }, { s: 'The sun is up in the morning', pic: '🌅' },
    { s: 'The moon is out at night', pic: '🌙' },
    { s: 'What time is it?' }, { s: 'It is time for school' }, { s: 'I have a busy day' },
    { s: 'First I wake up' }, { s: 'Then I eat breakfast' }, { s: 'Last I go to bed' },
  ],
});
const TOD_OF = { m: 'morning', a: 'afternoon', e: 'evening', n: 'night' };
const e17Vocab = [];
const e17Acts = ['wake up', 'get dressed', 'eat breakfast', 'go to school', 'eat lunch', 'play with my toys', 'do my homework',
  'eat dinner', 'take a bath', 'watch TV', 'go to bed'];
const ACT_TOD = {
  'wake up': 'morning', 'get dressed': 'morning', 'eat breakfast': 'morning', 'go to school': 'morning',
  'eat lunch': 'afternoon', 'play with my toys': 'afternoon', 'do my homework': 'afternoon',
  'eat dinner': 'evening', 'take a bath': 'evening', 'watch TV': 'evening', 'go to bed': 'night',
};
const ACT_EMO = {
  'wake up': '⏰', 'get dressed': '👕', 'eat breakfast': '🥞', 'go to school': '🏫', 'eat lunch': '🥪',
  'play with my toys': '🧸', 'do my homework': '📝', 'eat dinner': '🍝', 'take a bath': '🛁', 'watch TV': '📺', 'go to bed': '🛏️',
};
const e17Extra = {
  1: [
    (R) => {
      const t = R.pick(allTimes);
      const opts = [t, ...otherTimes(R, t, R.chance(0.4) ? 1 : 2, true)].map((x) => ({ emoji: timeEmoji(x) }));
      return { type: 'choice', key: 'k1:' + timeKey(t), prompt: P.clock, say: say(timeWords(t)), options: opts, answer: 0, cols: opts.length };
    },
    (R) => {
      const t = R.pick(allTimes);
      const truth = R.chance(0.5);
      const shown = truth ? t : R.pick(otherTimes(R, t, 5, true));
      return {
        type: 'choice', key: 'k1y:' + timeKey(t) + ':' + timeKey(shown), prompt: P.yn, say: say(`Is it ${timeWords(t)}?`),
        stimulus: { emoji: timeEmoji(shown) }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
  ],
  2: [
    (R) => {
      const t = R.pick(allTimes);
      return {
        type: 'choice', key: 'k2a:' + timeKey(t), prompt: P.clock, say: say(`It is ${timeWords(t)}`),
        options: [t, ...otherTimes(R, t, 3, false)].map((x) => ({ emoji: timeEmoji(x) })), answer: 0, cols: 2,
      };
    },
    (R) => {
      const t = R.pick(allTimes);
      return {
        type: 'choice', key: 'k2b:' + timeKey(t), prompt: P.word, say: say('What time is it?'), stimulus: { emoji: timeEmoji(t) },
        options: words([timeWords(t), ...otherTimes(R, t, 2, true).map(timeWords)]), answer: 0, cols: 3,
      };
    },
    (R) => {
      const a = R.pick(e17Acts);
      const tod = ACT_TOD[a];
      return {
        type: 'choice', key: 'k2c:' + a, prompt: P.ans, say: say(`When do you ${a}?`), stimulus: { emoji: ACT_EMO[a] },
        options: words([tod, ...R.sample(TOD_POOL.filter((x) => x !== tod), 2)]), answer: 0, cols: 3,
      };
    },
  ],
  3: [
    (R) => {
      const [a, hrs] = R.pick(EVENTS);
      const h = R.pick(hrs);
      const t = { h, half: R.chance(0.3) };
      const s = `I ${a} at ${timeWords(t)}`;
      return {
        type: 'choice', key: 'k3p:' + s, prompt: P.clock, say: say(s),
        options: [t, ...otherTimes(R, t, 2, t.half)].map((x) => ({ emoji: timeEmoji(x) })), answer: 0, cols: 3,
      };
    },
    (R) => {
      const [a, hrs] = R.pick(EVENTS);
      const t = { h: R.pick(hrs), half: R.chance(0.3) };
      const s = `I ${a} at ${timeWords(t)}`;
      return {
        type: 'order', key: 'k3o:' + s, prompt: P.order, say: say(s), stimulus: { emoji: timeEmoji(t) },
        tiles: s.split(' '), joiner: ' ',
      };
    },
    (R) => {
      const tod = R.pick(TOD_POOL.slice(0, 3));
      const right = R.pick(e17Acts.filter((a) => ACT_TOD[a] === tod));
      const wrong = R.sample(e17Acts.filter((a) => ACT_TOD[a] !== tod && !(tod === 'afternoon' && ACT_TOD[a] === 'afternoon')), 2);
      return {
        type: 'choice', key: 'k3w:' + tod + ':' + right, prompt: P.ans, say: say(`What do you do in the ${tod}?`),
        stimulus: { emoji: ({ morning: '🌅', afternoon: '🌞', evening: '🌆' })[tod] },
        options: [right, ...wrong].map((a) => ({ emoji: ACT_EMO[a], text: a, say: say(a) })), answer: 0, cols: 3,
      };
    },
    (R) => {
      const a = R.pick(e17Acts);
      const tod = ACT_TOD[a];
      const truth = R.chance(0.5);
      const used = truth ? tod : R.pick(TOD_POOL.filter((x) => x !== tod));
      return {
        type: 'choice', key: 'k3y:' + a + ':' + used, prompt: P.tf, say: say(`I ${a} in the ${used}`),
        stimulus: { emoji: ACT_EMO[a] }, options: [YES, NO], answer: truth ? 0 : 1, fixedOrder: true, cols: 2,
      };
    },
  ],
};
const e17Gens = {
  1: [...e17Std[1], ...e17Extra[1]], 2: [...e17Std[2], ...e17Extra[2]], 3: [...e17Std[3], ...e17Extra[3]],
};

// ---------- e18 Holidays & celebrations ----------
const HOL = {
  halloween: { name: 'Halloween', e: '🎃' }, christmas: { name: 'Christmas', e: '🎄' },
  valentine: { name: 'Valentine\'s Day', e: '❤️' }, easter: { name: 'Easter', e: '🐰' },
  birthday: { name: 'Birthday', e: '🎂' }, canada: { name: 'Canada Day', e: '🇨🇦' },
  stjean: { name: 'Saint-Jean', e: '⚜️' }, thanks: { name: 'Thanksgiving', e: '🦃' }
};
const HOL_ITEMS = [
  ['pumpkin', '🎃', 'halloween'], ['ghost', '👻', 'halloween'], ['witch', '🧙', 'halloween'], ['bat', '🦇', 'halloween'],
  ['spider web', '🕸️', 'halloween'], ['candy', '🍬', 'halloween', 'x'], ['skeleton', '💀', 'halloween'],
  ['Christmas tree', '🎄', 'christmas'], ['Santa', '🎅', 'christmas', 'n'],
  ['reindeer', '🦌', 'christmas'], ['snowman', '⛄', 'christmas'], ['bell', '🔔', 'christmas'], ['star', '⭐', 'christmas'],
  ['sleigh', '🛷', 'christmas'],
  ['heart', '❤️', 'valentine'], ['love letter', '💌', 'valentine'], ['rose', '🌹', 'valentine'],
  ['bunny', '🐰', 'easter'], ['egg', '🥚', 'easter'], ['chick', '🐥', 'easter'], ['tulip', '🌷', 'easter'],
  ['cake', '🎂', 'birthday'], ['balloon', '🎈', 'birthday'], ['party', '🎉', 'birthday'],
  ['maple leaf', '🍁', 'canada'], ['flag', '🇨🇦', 'canada'], ['beaver', '🦫', 'canada'],
  ['fleur-de-lis', '⚜️', 'stjean'], ['bonfire', '🔥', 'stjean'],
  ['turkey', '🦃', 'thanks'], ['pie', '🥧', 'thanks'], ['fall leaves', '🍂', 'thanks', 'p'],
];
const holByKey = (k) => HOL_ITEMS.filter((x) => x[2] === k).map((x) => x[0]);
const e18Base = std({
  vocab: V(HOL_ITEMS.map(([w, e, h, f]) => [w, e, 0, f || '', h])),
  excl: [['🎃', '👻', '🧙', '🦇', '🕸️', '💀', '🍬'], ['🎄', '🎅', '⛄', '⭐'], ['❤️', '💌', '🌹'], ['🐰', '🐥', '🥚'],
    ['🎂', '🎉', '🎈'], ['🇨🇦', '🍁', '🦫'], ['⚜️', '🔥'], ['🦃', '🥧', '🍂']],
  find: [
    (x) => `Find ${the(x)}`, (x) => `Where ${x.f === 'p' ? 'are' : 'is'} ${the(x)}?`, (x) => `Show me ${the(x)}`,
    (x) => `I see ${np(x)}`,
  ],
  tpl: [
    { f: (x) => `I see ${np(x)}` }, { f: (x) => `Look at ${the(x)}` }, { f: (x) => thisIs(x) },
    { f: (x) => `I like ${the(x)}` },
  ],
  qa: [
    ['🎂', 'What do you eat on your birthday?', 'cake', ['pumpkin', 'turkey', 'egg']],
    ['🎅', 'Who brings gifts at Christmas?', 'Santa', ['bunny', 'witch', 'ghost']],
    ['🐰', 'Who hides eggs at Easter?', 'bunny', ['Santa', 'ghost', 'turkey']],
    ['🎃', 'What do we carve at Halloween?', 'pumpkin', ['egg', 'turkey', 'balloon']],
    ['🍬', 'What do you get when you trick or treat?', 'candy', ['turkey', 'tulip', 'sleigh']],
    ['🎄', 'What do we decorate at Christmas?', 'Christmas tree', ['pumpkin', 'bunny', 'cake']],
    ['💌', 'What do you give on Valentine\'s Day?', 'love letter', ['turkey', 'pumpkin', 'egg']],
    ['🎈', 'What floats at a birthday party?', 'balloon', ['turkey', 'reindeer', 'ghost']],
    ['🦃', 'What do we eat at Thanksgiving?', 'turkey', ['candy', 'egg', 'cake']],
    ['🇨🇦', 'What is the Canadian flag?', 'flag', ['bell', 'egg', 'ghost']],
    ['🔥', 'What do we light on June twenty-fourth?', 'bonfire', ['balloon', 'egg', 'bell']],
  ],
  sentences: [
    { s: 'Happy Halloween!', pic: '🎃' }, { s: 'Merry Christmas!', pic: '🎄' },
    { s: 'Happy Valentine\'s Day!', pic: '❤️' }, { s: 'Happy Easter!', pic: '🐰' },
    { s: 'Happy birthday!', pic: '🎂' }, { s: 'Happy Canada Day!', pic: '🇨🇦' },
    { s: 'Happy Thanksgiving!', pic: '🦃' }, { s: 'Happy New Year!', pic: '🎆' },
    { s: 'Happy Saint-Jean!', pic: '⚜️' },
    { s: 'Santa brings gifts', pic: '🎅' }, { s: 'We open our gifts', pic: '🎄' }, { s: 'The ghost says boo', pic: '👻' },
    { s: 'I get a lot of candy', pic: '🍬' }, { s: 'We hunt for eggs', pic: '🥚' },
    { s: 'I make a wish and eat cake', pic: '🍰' }, { s: 'We sing around the bonfire', pic: '🔥' },
    { s: 'The maple leaf is on the flag', pic: '🍁' }, { s: 'I hang a star on the tree', pic: '⭐' },
    { s: 'Trick or treat!' }, { s: 'I open my gifts' }, { s: 'We have a party' }, { s: 'I love holidays' },
  ],
});
// holiday pairs for sorting, built from the item list
const holKeys = Object.keys(HOL).filter((k) => holByKey(k).length >= 2);
const e18Extra = {
  2: [
    (R) => {
      const [ka, kb] = R.sample(holKeys, 2);
      const A = R.sample(holByKey(ka), R.int(2, Math.min(4, holByKey(ka).length)));
      const B = R.sample(holByKey(kb), R.int(2, Math.min(4, holByKey(kb).length)));
      const em = (w) => HOL_ITEMS.find((x) => x[0] === w)[1];
      return {
        type: 'sort', key: 'h2c:' + [...A, ...B].sort().join(','), prompt: P.sort, say: say('Listen. Which holiday?'),
        bins: [{ text: HOL[ka].name, emoji: HOL[ka].e }, { text: HOL[kb].name, emoji: HOL[kb].e }],
        items: R.shuffle([...A.map((w) => ({ emoji: em(w), say: say(w), bin: 0 })), ...B.map((w) => ({ emoji: em(w), say: say(w), bin: 1 }))]),
      };
    },
    (R) => {
      const it = R.pick(HOL_ITEMS);
      const k = it[2];
      const wrong = R.sample(Object.keys(HOL).filter((x) => x !== k), 2);
      return {
        type: 'choice', key: 'h2h:' + it[0], prompt: P.ans, say: say('Which holiday is it?'), stimulus: { emoji: it[1] },
        options: words([HOL[k].name, ...wrong.map((x) => HOL[x].name)]), answer: 0, cols: 3,
      };
    },
  ],
  3: [
    (R) => {
      const it = R.pick(HOL_ITEMS);
      const k = it[2];
      const wrong = R.sample(Object.keys(HOL).filter((x) => x !== k), 2);
      return {
        type: 'choice', key: 'h3h:' + it[0], prompt: P.ans, say: say(`Look at ${it[2] && it[3] === 'n' ? it[0] : (it[3] ? it[0] : (/^[aeiou]/i.test(it[0]) ? 'an ' : 'a ') + it[0])}. Which holiday is it?`),
        stimulus: { emoji: it[1] }, options: words([HOL[k].name, ...wrong.map((x) => HOL[x].name)]), answer: 0, cols: 3,
      };
    },
    (R) => {
      const k = R.pick(holKeys);
      const right = R.pick(holByKey(k));
      const wrong = R.sample(HOL_ITEMS.filter((x) => x[2] !== k), 2);
      const em = HOL_ITEMS.find((x) => x[0] === right)[1];
      return {
        type: 'choice', key: 'h3w:' + k + ':' + right + wrong.map((x) => x[0]).join(''), prompt: P.tap,
        say: say(`Which one is for ${HOL[k].name}?`),
        options: [[right, em], ...wrong.map((x) => [x[0], x[1]])].map(([, e]) => ({ emoji: e })), answer: 0, cols: 3,
      };
    },
    (R) => {
      const k = R.pick(holKeys.filter((x) => holByKey(x).length >= 3));
      const A = R.sample(holByKey(k), 3);
      const b = R.pick(HOL_ITEMS.filter((x) => x[2] !== k));
      const em = (w) => HOL_ITEMS.find((x) => x[0] === w)[1];
      return {
        type: 'choice', key: 'h3n:' + k + ':' + [...A, b[0]].sort().join(','), prompt: P.not,
        say: say(`Which one is not for ${HOL[k].name}?`), options: [b[1], ...A.map(em)].map((e) => ({ emoji: e })), answer: 0, cols: 2,
      };
    },
  ],
};
const e18Gens = {
  1: e18Base[1], 2: [...e18Base[2], ...e18Extra[2]], 3: [...e18Base[3], ...e18Extra[3]],
};

// ===== e19 data =====
const L19 = [
  [['Sam has a red ball.', 'It is under the bed.', 'Sam looks for it.', 'He finds it.', 'He is happy.'], [
    [1, 2, 'What colour is the ball?', '🔴', ['🔵', '🟢']],
    [1, 2, 'Who has a ball?', 'Sam', ['Lily', 'Max']],
    [1, 2, 'Where is the ball?', 'under the bed', ['on the bed', 'in the box']],
    [2, 4, 'What does Sam do?', 'He finds the ball', ['He eats the ball', 'He sleeps']],
    [3, 5, 'How does Sam feel at the end?', '😀', ['😢', '😠']],
    [3, 5, 'Sam is sad.', false],
  ]],
  [['Lily has a white cat.', 'The cat is on the sofa.', 'The cat is sleepy.', 'Lily gives it some milk.', 'The cat drinks the milk.', 'Then it sleeps again.'], [
    [1, 2, 'What colour is the cat?', '⚪', ['🔵', '🟡']],
    [1, 2, 'Who has a cat?', 'Lily', ['Sam', 'Max']],
    [1, 2, 'Where is the cat?', 'on the sofa', ['in the box', 'under the table']],
    [2, 3, 'How does the cat feel?', '😴', ['😠', '😱']],
    [2, 4, 'What does Lily give the cat?', '🥛', ['🍕', '🍎']],
    [3, 6, 'What does the cat do last?', 'It sleeps', ['It drinks milk', 'It runs outside']],
    [3, 5, 'The cat drinks the milk.', true],
  ]],
  [['Max has a big brown dog.', 'The dog is in the yard.', 'The dog digs a hole.', 'Max says, "Stop, Rex!"', 'Rex stops and sits down.', 'Max gives him a bone.'], [
    [1, 2, 'What colour is the dog?', '🟤', ['⚪', '🔴']],
    [1, 2, 'Who has a dog?', 'Max', ['Emma', 'Leo']],
    [1, 2, 'Where is the dog?', 'in the yard', ['in the bed', 'at school']],
    [2, 3, 'What does the dog do?', 'It digs a hole', ['It reads a book', 'It swims']],
    [2, 4, 'What does Max say?', 'Stop, Rex!', ['Hello, Rex!', 'I am tired.']],
    [3, 6, 'What does Max give the dog?', 'a bone', ['a ball', 'milk']],
    [3, 5, 'Rex sits down.', true],
  ]],
  [['Emma sees a green frog.', 'The frog is on a log.', 'The frog jumps into the pond.', 'Splash!', 'Emma laughs.', 'She likes the frog.'], [
    [1, 2, 'What colour is the frog?', '🟢', ['🔴', '🟡']],
    [1, 2, 'Who sees a frog?', 'Emma', ['Sam', 'Noah']],
    [1, 2, 'Where is the frog?', 'on a log', ['in a house', 'in a car']],
    [2, 3, 'Where does the frog jump?', 'into the pond', ['into the car', 'into the bag']],
    [2, 4, 'What is the sound?', 'Splash!', ['Woof!', 'Beep!']],
    [3, 6, 'Why does Emma laugh?', 'She likes the frog', ['She is sick', 'She is cold']],
    [3, 5, 'Emma is scared.', false],
  ]],
  [['Leo has two rabbits.', 'One is black and one is white.', 'The rabbits eat carrots.', 'They like them a lot.', 'Leo gives them water too.'], [
    [1, 2, 'How many rabbits does Leo have?', '2', ['1', '3']],
    [1, 2, 'Who has rabbits?', 'Leo', ['Mia', 'Zoé']],
    [1, 2, 'What colour is one rabbit?', '⚫', ['🔴', '🟢']],
    [2, 3, 'What do the rabbits eat?', '🥕', ['🍕', '🍌']],
    [2, 5, 'What else does Leo give them?', 'water', ['milk', 'juice']],
    [3, 4, 'The rabbits like carrots.', true],
    [3, 5, 'The rabbits eat pizza.', false],
  ]],
  [['Zoé has a yellow bird.', 'The bird is in a cage.', 'It sings every morning.', 'Zoé opens the cage.', 'The bird flies to the window.', 'Then it comes back home.'], [
    [1, 2, 'What colour is the bird?', '🟡', ['🔵', '🟣']],
    [1, 2, 'Who has a bird?', 'Zoé', ['Sam', 'Leo']],
    [1, 2, 'Where is the bird?', 'in a cage', ['in the pool', 'in a bag']],
    [2, 3, 'When does the bird sing?', 'in the morning', ['at night', 'at lunch']],
    [2, 4, 'What does Zoé do?', 'She opens the cage', ['She closes the door', 'She eats lunch']],
    [3, 5, 'Where does the bird fly?', 'to the window', ['to the park', 'to school']],
    [3, 6, 'The bird comes back.', true],
  ]],
  [['Noah has a small fish.', 'The fish is orange.', 'It lives in a bowl.', 'Noah gives it food every day.', 'The fish swims fast.', 'Noah loves his fish.'], [
    [1, 2, 'What animal does Noah have?', '🐟', ['🐱', '🐶']],
    [1, 2, 'Who has a fish?', 'Noah', ['Emma', 'Mia']],
    [1, 2, 'Is the fish big or small?', 'small', ['big', 'tall']],
    [2, 3, 'Where does the fish live?', 'in a bowl', ['in a tree', 'in a box']],
    [2, 4, 'What does Noah give the fish?', 'food', ['a hat', 'a book']],
    [3, 5, 'How does the fish swim?', 'fast', ['slowly', 'in the sky']],
    [3, 4, 'Noah gives the fish food every day.', true],
  ]],
  [['Mia sees a pig on the farm.', 'The pig is pink and fat.', 'The pig is in the mud.', 'Mia says, "Oink, oink!"', 'The pig looks at her.', 'Mia laughs and waves.'], [
    [1, 2, 'What colour is the pig?', 'pink', ['green', 'blue']],
    [1, 2, 'Who sees a pig?', 'Mia', ['Max', 'Sam']],
    [1, 2, 'Where is the pig?', 'on the farm', ['at school', 'in a car']],
    [2, 3, 'Where is the pig now?', 'in the mud', ['in the bed', 'in the snow']],
    [2, 4, 'What does Mia say?', 'Oink, oink!', ['Moo, moo!', 'Quack, quack!']],
    [3, 6, 'What does Mia do at the end?', 'She laughs and waves', ['She cries', 'She runs home']],
    [3, 5, 'The pig looks at Mia.', true],
  ]],
  [['Sam has a blue cap.', 'It is on his head.', 'The wind is strong.', 'The cap flies away.', 'Sam runs after it.', 'He catches it.'], [
    [1, 2, 'What colour is the cap?', '🔵', ['🔴', '🟡']],
    [1, 2, 'Who has a cap?', 'Sam', ['Lily', 'Zoé']],
    [1, 2, 'Where is the cap?', 'on his head', ['on the bed', 'in the bag']],
    [2, 3, 'What is the weather?', '💨', ['☀️', '❄️']],
    [2, 4, 'What happens to the cap?', 'It flies away', ['It falls in water', 'It gets big']],
    [3, 5, 'What does Sam do?', 'He runs after it', ['He sleeps', 'He eats lunch']],
    [3, 6, 'Sam catches the cap.', true],
  ]],
  [['It is a cold winter day.', 'There is snow on the ground.', 'Lily puts on her red coat.', 'She puts on warm mittens.', 'Then she goes outside.', 'She makes a snowman.'], [
    [1, 2, 'What is the weather?', '❄️', ['☀️', '🌧️']],
    [1, 2, 'Is it hot or cold?', 'cold', ['hot', 'sunny']],
    [1, 2, 'What is on the ground?', 'snow', ['water', 'grass']],
    [2, 3, 'What colour is the coat?', '🔴', ['🔵', '🟢']],
    [2, 4, 'What does Lily put on her hands?', '🧤', ['🩳', '🕶️']],
    [3, 6, 'What does Lily make?', 'a snowman', ['a cake', 'a cat']],
    [3, 5, 'What does Lily do before she goes outside?', 'She puts on her coat', ['She makes a snowman', 'She eats lunch']],
  ]],
  [['It is a sunny day.', 'Max wears shorts and a T-shirt.', 'He goes to the park.', 'He plays with a kite.', 'The kite is yellow.', 'Max is very happy.'], [
    [1, 2, 'What is the weather?', '☀️', ['🌧️', '❄️']],
    [1, 2, 'Who wears shorts?', 'Max', ['Emma', 'Mia']],
    [1, 2, 'Is it a sunny day or a rainy day?', 'sunny', ['rainy', 'snowy']],
    [2, 3, 'Where does Max go?', 'to the park', ['to the pool', 'to the store']],
    [2, 4, 'What does Max play with?', 'a kite', ['a drum', 'a car']],
    [3, 5, 'What colour is the kite?', '🟡', ['🔴', '🟣']],
    [3, 6, 'Max is sad.', false],
  ]],
  [['It is a rainy day.', 'Emma has a green umbrella.', 'She puts on her boots.', 'She jumps in a puddle.', 'Splash! Her socks get wet.', 'Emma goes home and changes.'], [
    [1, 2, 'What is the weather?', '🌧️', ['☀️', '❄️']],
    [1, 2, 'What colour is the umbrella?', '🟢', ['🔴', '🔵']],
    [1, 2, 'Who has an umbrella?', 'Emma', ['Leo', 'Sam']],
    [2, 3, 'What does Emma put on?', '👢', ['👗', '🧣']],
    [2, 4, 'What does Emma jump in?', 'a puddle', ['a bed', 'a car']],
    [3, 5, 'What gets wet?', 'her socks', ['her hat', 'her book']],
    [3, 6, 'What does Emma do at the end?', 'She goes home', ['She goes to the park', 'She goes to school']],
  ]],
  [['Leo is hungry.', 'He wants a snack.', 'He opens the fridge.', 'He sees an apple and some cheese.', 'He eats the apple.', 'He saves the cheese for later.'], [
    [1, 2, 'How does Leo feel?', 'hungry', ['sleepy', 'sad']],
    [1, 2, 'What does Leo want?', 'a snack', ['a hat', 'a toy']],
    [1, 2, 'Who is hungry?', 'Leo', ['Noah', 'Emma']],
    [2, 4, 'What does Leo see in the fridge?', '🧀', ['🍕', '🍌']],
    [2, 3, 'What does Leo open?', 'the fridge', ['the window', 'the car']],
    [3, 5, 'What does Leo eat?', '🍎', ['🧀', '🍌']],
    [3, 6, 'Leo eats the cheese now.', false],
  ]],
  [['Zoé is at the table.', 'She has a bowl of soup.', 'She also has bread and a glass of milk.', 'The soup is hot.', 'She waits a little.', 'Then she eats it all.'], [
    [1, 2, 'Where is Zoé?', 'at the table', ['at the park', 'in the bath']],
    [1, 2, 'What does Zoé have?', 'soup', ['a cake', 'a pizza']],
    [1, 2, 'Who is at the table?', 'Zoé', ['Sam', 'Mia']],
    [2, 3, 'What does she drink?', '🥛', ['🍎', '🥕']],
    [2, 4, 'Is the soup hot or cold?', 'hot', ['cold', 'sweet']],
    [3, 5, 'Why does Zoé wait?', 'The soup is hot', ['She is tired', 'She is not hungry']],
    [3, 6, 'Zoé eats all the soup.', true],
  ]],
  [['Noah is at a birthday party.', 'There is a big cake.', 'It has five candles.', 'Noah blows out the candles.', 'Everyone sings.', 'Then they eat the cake.'], [
    [1, 2, 'Where is Noah?', 'at a party', ['at school', 'on a bus']],
    [1, 2, 'What is big?', 'the cake', ['the dog', 'the house']],
    [1, 2, 'Who is at the party?', 'Noah', ['Lily', 'Max']],
    [2, 3, 'How many candles are there?', '5', ['3', '4']],
    [2, 4, 'What does Noah blow out?', 'the candles', ['the cake', 'the wind']],
    [3, 6, 'What do they do last?', 'They eat the cake', ['They sing', 'They go home to bed']],
    [3, 5, 'Everyone sings.', true],
  ]],
  [['Mia has a pencil case.', 'It is on her desk.', 'In the case there is a pencil and a red eraser.', 'She also has two crayons.', 'She draws a house.', 'Then she shows the teacher.'], [
    [1, 2, 'Where is the pencil case?', 'on the desk', ['on the bed', 'in the car']],
    [1, 2, 'Who has a pencil case?', 'Mia', ['Max', 'Leo']],
    [1, 2, 'What does Mia have?', 'a pencil case', ['a hat', 'a dog']],
    [2, 3, 'What colour is the eraser?', '🔴', ['🔵', '🟢']],
    [2, 4, 'How many crayons does Mia have?', '2', ['1', '4']],
    [3, 5, 'What does Mia draw?', 'a house', ['a cat', 'a tree']],
    [3, 6, 'Who sees the drawing?', 'the teacher', ['the dog', 'the bus driver']],
  ]],
  [['Sam is in the classroom.', 'The teacher says, "Open your books."', 'Sam opens his book.', 'He reads a story about a bear.', 'The bear is brown.', 'Sam likes the story.'], [
    [1, 2, 'Where is Sam?', 'in the classroom', ['at the beach', 'on a train']],
    [1, 2, 'Who says, "Open your books"?', 'the teacher', ['Mom', 'Sam']],
    [1, 2, 'What do they open?', '📚', ['🎒', '✏️']],
    [2, 4, 'What is the story about?', '🐻', ['🐱', '🐟']],
    [2, 5, 'What colour is the bear?', '🟤', ['⚪', '🔵']],
    [3, 6, 'Sam likes the story.', true],
    [3, 3, 'What does Sam do first?', 'He opens his book', ['He reads a story', 'He goes home']],
  ]],
  [['Lily is at school.', 'She has a red backpack.', 'It is full of books.', 'It is heavy.', 'Her friend helps her.', 'They walk to the classroom together.'], [
    [1, 2, 'What colour is the backpack?', '🔴', ['🔵', '🟡']],
    [1, 2, 'Where is Lily?', 'at school', ['at the farm', 'at the beach']],
    [1, 2, 'Who has a backpack?', 'Lily', ['Emma', 'Noah']],
    [2, 3, 'What is in the backpack?', '📚', ['🍎', '🧸']],
    [2, 4, 'Is the backpack light or heavy?', 'heavy', ['light', 'soft']],
    [3, 5, 'Who helps Lily?', 'her friend', ['her cat', 'her teacher']],
    [3, 6, 'They walk to the classroom.', true],
  ]],
  [['Max wakes up at seven.', 'He brushes his teeth.', 'Then he has breakfast.', 'He eats toast and drinks juice.', 'He puts on his coat.', 'Then he goes to school.'], [
    [1, 2, 'What does Max do first?', 'He wakes up', ['He goes to school', 'He eats lunch']],
    [1, 2, 'What time does Max wake up?', 'at seven', ['at four', 'at ten']],
    [1, 2, 'What does Max brush?', 'his teeth', ['his shoes', 'his cat']],
    [2, 4, 'What does Max eat?', '🍞', ['🍕', '🍎']],
    [2, 3, 'What does Max have after he brushes his teeth?', 'breakfast', ['dinner', 'a bath']],
    [3, 6, 'What does Max do last?', 'He goes to school', ['He wakes up', 'He eats toast']],
    [3, 5, 'Max puts on his coat before he goes to school.', true],
  ]],
  [['Emma comes home at four.', 'She has a snack.', 'Then she does her homework.', 'After that, she plays a game.', 'At six, she has dinner.', 'At eight, she goes to bed.'], [
    [1, 2, 'When does Emma come home?', 'at four', ['at ten', 'at seven']],
    [1, 2, 'What does Emma have?', 'a snack', ['a bath', 'a hat']],
    [1, 2, 'Who comes home?', 'Emma', ['Zoé', 'Sam']],
    [2, 3, 'What does Emma do after the snack?', 'her homework', ['a puzzle', 'sleep']],
    [2, 4, 'What does she play?', 'a game', ['soccer', 'the drums']],
    [3, 5, 'What does she do at six?', 'She has dinner', ['She goes to bed', 'She plays']],
    [3, 6, 'What does Emma do last?', 'She goes to bed', ['She has dinner', 'She does homework']],
  ]],
  [['Leo is on the school bus.', 'The bus is yellow.', 'It is full of children.', 'Leo sits next to his friend.', 'They look out the window.', 'They see a big truck.'], [
    [1, 2, 'What colour is the bus?', '🟡', ['🔵', '🔴']],
    [1, 2, 'Where is Leo?', 'on the bus', ['on a plane', 'in a boat']],
    [1, 2, 'Who is on the bus?', 'Leo', ['Mia', 'Lily']],
    [2, 3, 'Who is next to Leo?', 'his friend', ['his dog', 'his mom']],
    [2, 4, 'What do they look out of?', 'the window', ['the door', 'the box']],
    [3, 5, 'What do they see?', 'a big truck', ['a big plane', 'a small cat']],
    [3, 4, 'The bus is empty.', false],
  ]],
  [['Zoé has a new bike.', 'It is purple and shiny.', 'She rides it in the park.', 'She wears a helmet.', 'She goes fast, then slow.', 'She loves her bike.'], [
    [1, 2, 'What colour is the bike?', '🟣', ['🟢', '🟠']],
    [1, 2, 'Who has a new bike?', 'Zoé', ['Max', 'Leo']],
    [1, 2, 'Is the bike old or new?', 'new', ['old', 'broken']],
    [2, 3, 'Where does Zoé ride?', 'in the park', ['in the kitchen', 'at the pool']],
    [2, 4, 'What does she wear?', 'a helmet', ['a dress', 'boots']],
    [3, 5, 'How does she go?', 'fast, then slow', ['only slow', 'only fast']],
    [3, 6, 'Zoé loves her bike.', true],
  ]],
  [['Noah and his dad go to the airport.', 'They are going on a trip.', 'They get on a plane.', 'The plane is big and white.', 'Noah sits by the window.', 'He sees the clouds.'], [
    [1, 2, 'Where do they go?', 'to the airport', ['to the beach', 'to school']],
    [1, 2, 'Who goes with Noah?', 'his dad', ['his dog', 'his teacher']],
    [1, 2, 'What do they get on?', '✈️', ['🚌', '🚲']],
    [2, 4, 'What colour is the plane?', '⚪', ['🟢', '🔴']],
    [2, 5, 'Where does Noah sit?', 'by the window', ['by the door', 'on the floor']],
    [3, 6, 'What does Noah see?', 'the clouds', ['the snow', 'a fish']],
    [3, 5, 'Noah sits by the window.', true],
  ]],
  [['Mia and her mom take the train.', 'The train is red.', 'It goes very fast.', 'Mia looks at the trees.', 'Then the train stops.', 'Grandma is at the station.'], [
    [1, 2, 'What do Mia and her mom take?', '🚂', ['🚗', '🚲']],
    [1, 2, 'What colour is the train?', '🔴', ['🟢', '🔵']],
    [1, 2, 'Who is with Mia?', 'her mom', ['her dad', 'her dog']],
    [2, 3, 'How does the train go?', 'very fast', ['very slow', 'not at all']],
    [2, 4, 'What does Mia look at?', 'the trees', ['the sea', 'a cat']],
    [3, 6, 'Who is at the station?', 'Grandma', ['Grandpa', 'the teacher']],
    [3, 5, 'The train stops.', true],
  ]],
  [['Sam is at his grandma\'s house.', 'Grandma is in the kitchen.', 'She makes cookies.', 'Sam helps her.', 'They put the cookies in the oven.', 'Soon the house smells good.'], [
    [1, 2, 'Where is Sam?', 'at his grandma\'s house', ['at school', 'at the park']],
    [1, 2, 'Where is Grandma?', 'in the kitchen', ['in the garden', 'in the bath']],
    [1, 2, 'Who is in the kitchen?', 'Grandma', ['Grandpa', 'Max']],
    [2, 3, 'What does Grandma make?', '🍪', ['🍕', '🍦']],
    [2, 4, 'Who helps Grandma?', 'Sam', ['Mia', 'the dog']],
    [3, 5, 'Where do they put the cookies?', 'in the oven', ['in the fridge', 'on the bed']],
    [3, 6, 'The house smells good.', true],
  ]],
  [['Lily is in the living room.', 'There is a big sofa and a small table.', 'A lamp is on the table.', 'Lily sits on the sofa.', 'She reads a book.', 'Her dad brings her a hot chocolate.'], [
    [1, 2, 'Where is Lily?', 'in the living room', ['in the kitchen', 'in the bathroom']],
    [1, 2, 'What is big?', 'the sofa', ['the table', 'the lamp']],
    [1, 2, 'What is small?', 'the table', ['the sofa', 'the house']],
    [2, 3, 'What is on the table?', 'a lamp', ['a cat', 'a pizza']],
    [2, 4, 'Where does Lily sit?', 'on the sofa', ['on the table', 'on the floor']],
    [3, 5, 'What does Lily do?', 'She reads a book', ['She plays soccer', 'She takes a bath']],
    [3, 6, 'Who brings the hot chocolate?', 'her dad', ['her mom', 'her friend']],
  ]],
  [['Max is in the bathroom.', 'He takes a bath.', 'There are lots of bubbles.', 'He plays with a yellow duck.', 'Then he gets out.', 'He dries his hair with a towel.'], [
    [1, 2, 'Where is Max?', 'in the bathroom', ['in the kitchen', 'in the garden']],
    [1, 2, 'What does Max take?', 'a bath', ['a bus', 'a nap']],
    [1, 2, 'Who is in the bathroom?', 'Max', ['Emma', 'Sam']],
    [2, 3, 'What is in the bath?', 'bubbles', ['fish', 'snow']],
    [2, 4, 'What colour is the duck?', '🟡', ['🔴', '🔵']],
    [3, 6, 'What does Max use to dry his hair?', 'a towel', ['a book', 'a hat']],
    [3, 5, 'Max gets out of the bath.', true],
  ]],
  [['Emma is in her bedroom.', 'She is very tired.', 'She puts on her pyjamas.', 'She gets in bed.', 'Her mom reads her a story.', 'Emma falls asleep.'], [
    [1, 2, 'Where is Emma?', 'in her bedroom', ['in the kitchen', 'at the park']],
    [1, 2, 'How does Emma feel?', '😴', ['😀', '😠']],
    [1, 2, 'Who is tired?', 'Emma', ['Leo', 'Zoé']],
    [2, 3, 'What does Emma put on?', 'her pyjamas', ['her boots', 'her coat']],
    [2, 4, 'Where does she go?', 'into her bed', ['into the car', 'into the pool']],
    [3, 5, 'Who reads her a story?', 'her mom', ['her dad', 'her teacher']],
    [3, 6, 'What does Emma do last?', 'She falls asleep', ['She gets in bed', 'She puts on pyjamas']],
  ]],
  [['It is Halloween night.', 'Leo is a ghost.', 'He wears a white sheet.', 'He goes to a house and knocks.', 'A lady gives him candy.', 'He says, "Thank you!"'], [
    [1, 2, 'What is Leo?', 'a ghost', ['a cat', 'a clown']],
    [1, 2, 'What colour is the sheet?', '⚪', ['🔴', '🟢']],
    [1, 2, 'Who is a ghost?', 'Leo', ['Lily', 'Noah']],
    [2, 3, 'What does Leo wear?', 'a white sheet', ['a red hat', 'a big coat']],
    [2, 4, 'What does he do at the house?', 'He knocks', ['He sleeps', 'He cooks']],
    [3, 5, 'What does the lady give him?', 'candy', ['a book', 'a bike']],
    [3, 6, 'What does Leo say?', 'Thank you!', ['Goodbye!', 'I am cold!']],
  ]],
  [['It is Christmas morning.', 'Mia runs to the tree.', 'There are many presents.', 'She opens a big one.', 'It is a teddy bear.', 'Mia hugs it and smiles.'], [
    [1, 2, 'What day is it?', 'Christmas', ['Halloween', 'Easter']],
    [1, 2, 'Who runs to the tree?', 'Mia', ['Sam', 'Max']],
    [1, 2, 'What time of day is it?', 'morning', ['night', 'afternoon']],
    [2, 3, 'What is under the tree?', '🎁', ['🍎', '🐶']],
    [2, 4, 'What does Mia open?', 'a big present', ['a small door', 'a window']],
    [3, 5, 'What is in the present?', '🧸', ['⚽', '🚲']],
    [3, 6, 'How does Mia feel?', '😀', ['😢', '😠']],
  ]],
  [['It is Easter.', 'Sam looks for eggs in the garden.', 'He finds a red egg under a bush.', 'He finds a blue egg near the tree.', 'He finds three eggs in all.', 'He puts them in a basket.'], [
    [1, 2, 'What does Sam look for?', 'eggs', ['balls', 'bones']],
    [1, 2, 'Where does Sam look?', 'in the garden', ['in the bath', 'at school']],
    [1, 2, 'Who looks for eggs?', 'Sam', ['Mia', 'Lily']],
    [2, 3, 'Where is the red egg?', 'under a bush', ['on a roof', 'in the sea']],
    [2, 4, 'What colour is the second egg?', '🔵', ['🔴', '🟢']],
    [3, 5, 'How many eggs does Sam find?', '3', ['2', '5']],
    [3, 6, 'Where does he put the eggs?', 'in a basket', ['in a box', 'in the bed']],
  ]],
  [['Today is Lily\'s birthday.', 'She is seven years old.', 'Her friends come to her house.', 'They bring presents.', 'They play games and eat cake.', 'Lily says, "Thank you!"'], [
    [1, 2, 'Whose birthday is it?', 'Lily\'s', ['Sam\'s', 'Max\'s']],
    [1, 2, 'How old is Lily?', '7', ['6', '9']],
    [1, 2, 'What day is it?', 'a birthday', ['Christmas', 'Halloween']],
    [2, 3, 'Who comes to the house?', 'her friends', ['her teacher', 'a dog']],
    [2, 4, 'What do the friends bring?', 'presents', ['snow', 'books']],
    [3, 5, 'What do they do?', 'They play games and eat cake', ['They go to school', 'They go to bed']],
    [3, 6, 'Lily says thank you.', true],
  ]],
  [['Noah is at the beach.', 'The sun is hot.', 'He builds a sandcastle.', 'The sandcastle is big.', 'A wave comes.', 'Splash! The sandcastle is gone.'], [
    [1, 2, 'Where is Noah?', 'at the beach', ['at school', 'at the zoo']],
    [1, 2, 'What is the weather?', '☀️', ['❄️', '🌧️']],
    [1, 2, 'Who is at the beach?', 'Noah', ['Emma', 'Zoé']],
    [2, 3, 'What does Noah build?', 'a sandcastle', ['a snowman', 'a house']],
    [2, 4, 'Is the sandcastle big or small?', 'big', ['small', 'broken']],
    [3, 5, 'What comes?', 'a wave', ['a bus', 'a bird']],
    [3, 6, 'What happens to the sandcastle?', 'It is gone', ['It grows', 'It turns red']],
  ]],
  [['Mia and Sam are at the zoo.', 'They see a tall giraffe.', 'The giraffe eats leaves from a tree.', 'Then they see a big elephant.', 'The elephant sprays water.', 'The children laugh.'], [
    [1, 2, 'Where are Mia and Sam?', 'at the zoo', ['at the beach', 'at school']],
    [1, 2, 'What do they see?', 'a tall giraffe', ['a small fish', 'a little cat']],
    [1, 2, 'Who is at the zoo?', 'Mia and Sam', ['Max and Leo', 'Emma and Zoé']],
    [2, 3, 'What does the giraffe eat?', 'leaves', ['pizza', 'fish']],
    [2, 4, 'What do they see next?', 'a big elephant', ['a pink pig', 'a green frog']],
    [3, 5, 'What does the elephant spray?', 'water', ['milk', 'sand']],
    [3, 6, 'The children laugh.', true],
  ]],
  [['Leo has a blue backpack.', 'He is going to the park.', 'In his bag there is a sandwich and an apple.', 'He sits under a big tree.', 'He eats his lunch.', 'A little squirrel comes and looks at him.'], [
    [1, 2, 'What colour is the backpack?', '🔵', ['🔴', '🟢']],
    [1, 2, 'Where is Leo going?', 'to the park', ['to the pool', 'to school']],
    [1, 2, 'Who has a backpack?', 'Leo', ['Mia', 'Sam']],
    [2, 3, 'What is in the bag?', 'a sandwich and an apple', ['a dog and a cat', 'a hat and boots']],
    [2, 4, 'Where does Leo sit?', 'under a big tree', ['on a bus', 'in a boat']],
    [3, 5, 'What does Leo do?', 'He eats his lunch', ['He goes to bed', 'He swims']],
    [3, 6, 'What comes to look at Leo?', 'a squirrel', ['a pig', 'a fish']],
  ]],
  [['Emma is sad.', 'She loses her teddy bear.', 'She looks in her room.', 'She looks under the bed.', 'The bear is in the toy box!', 'Emma is happy again.'], [
    [1, 2, 'How does Emma feel?', '😢', ['😀', '😴']],
    [1, 2, 'What does Emma lose?', 'her teddy bear', ['her hat', 'her shoe']],
    [1, 2, 'Who is sad?', 'Emma', ['Leo', 'Lily']],
    [2, 3, 'Where does Emma look first?', 'in her room', ['at school', 'in the car']],
    [2, 4, 'Where else does she look?', 'under the bed', ['in the fridge', 'in the tree']],
    [3, 5, 'Where is the bear?', 'in the toy box', ['under the bed', 'on the bus']],
    [3, 6, 'Why is Emma happy again?', 'She finds her bear', ['She eats cake', 'She goes to school']],
  ]],
  [['Max is scared of the dark.', 'It is night.', 'He is in his bed.', 'He hears a noise.', 'It is only the cat!', 'Max laughs and goes to sleep.'], [
    [1, 2, 'How does Max feel?', '😱', ['😀', '😠']],
    [1, 2, 'Is it day or night?', 'night', ['day', 'morning']],
    [1, 2, 'Who is scared?', 'Max', ['Mia', 'Noah']],
    [2, 3, 'Where is Max?', 'in his bed', ['in the car', 'in the park']],
    [2, 4, 'What does Max hear?', 'a noise', ['a song', 'a bell']],
    [3, 5, 'What makes the noise?', 'the cat', ['the dog', 'a ghost']],
    [3, 6, 'What does Max do at the end?', 'He laughs and goes to sleep', ['He cries', 'He runs outside']],
  ]],
  [['Lily and Zoé are friends.', 'They play on the swings.', 'Zoé falls down.', 'Her knee hurts.', 'Lily helps her stand up.', 'They hug and play again.'], [
    [1, 2, 'Who are friends?', 'Lily and Zoé', ['Sam and Max', 'Leo and Mia']],
    [1, 2, 'What do they play on?', 'the swings', ['a bus', 'a bike']],
    [1, 2, 'What are Lily and Zoé?', 'friends', ['teachers', 'cats']],
    [2, 3, 'Who falls down?', 'Zoé', ['Lily', 'Max']],
    [2, 4, 'What hurts?', 'her knee', ['her ear', 'her nose']],
    [3, 5, 'Who helps?', 'Lily', ['Zoé', 'the teacher']],
    [3, 6, 'Lily and Zoé play again.', true],
  ]],
  [['Noah is angry.', 'His little brother has his toy car.', 'Noah shouts.', 'Mom says, "Share, please."', 'The brother gives back the car.', 'Then they play together.'], [
    [1, 2, 'How does Noah feel?', '😠', ['😀', '😴']],
    [1, 2, 'Who has the toy car?', 'his little brother', ['his mom', 'his dad']],
    [1, 2, 'Who is angry?', 'Noah', ['Emma', 'Leo']],
    [2, 3, 'What does Noah do?', 'He shouts', ['He sleeps', 'He sings']],
    [2, 4, 'What does Mom say?', 'Share, please.', ['Go to bed.', 'Run fast.']],
    [3, 5, 'What does the brother do?', 'He gives back the car', ['He eats the car', 'He runs away']],
    [3, 6, 'They play together.', true],
  ]],
  [['Sam has a toy robot.', 'It is silver and blue.', 'It has big red eyes.', 'It walks and makes a beep sound.', 'Sam puts new batteries in it.', 'The robot walks again!'], [
    [1, 2, 'What toy does Sam have?', 'a robot', ['a doll', 'a train']],
    [2, 3, 'What colour are the eyes of the robot?', '🔴', ['🔵', '🟢']],
    [1, 2, 'What colour is the robot?', '🔵', ['🟢', '🟡']],
    [1, 2, 'Who has a robot?', 'Sam', ['Mia', 'Zoé']],
    [2, 4, 'What sound does it make?', 'beep', ['woof', 'moo']],
    [2, 4, 'What does it do?', 'It walks', ['It swims', 'It flies']],
    [3, 5, 'What does Sam put in?', 'new batteries', ['water', 'milk']],
    [3, 6, 'The robot walks again.', true],
  ]],
  [['Mia is at the farm.', 'She sees a cow and a horse.', 'The cow is black and white.', 'The horse is brown.', 'Mia gives the horse an apple.', 'The horse likes it.'], [
    [1, 2, 'Where is Mia?', 'at the farm', ['at the beach', 'at school']],
    [1, 2, 'What does she see?', '🐮', ['🐱', '🐟']],
    [1, 2, 'Who is at the farm?', 'Mia', ['Max', 'Emma']],
    [2, 3, 'What colour is the cow?', 'black and white', ['green', 'pink']],
    [2, 4, 'What colour is the horse?', '🟤', ['🟣', '🟢']],
    [3, 5, 'What does Mia give the horse?', '🍎', ['🥕', '🍕']],
    [3, 6, 'The horse likes the apple.', true],
  ]],
  [['Leo has a sore throat.', 'He is sick today.', 'He stays at home.', 'Mom gives him warm soup.', 'He drinks a lot of water.', 'He feels better by the evening.'], [
    [1, 2, 'How does Leo feel?', '🤒', ['😀', '😠']],
    [1, 2, 'What hurts?', 'his throat', ['his foot', 'his hand']],
    [1, 2, 'Who is sick?', 'Leo', ['Lily', 'Sam']],
    [2, 3, 'Where does Leo stay?', 'at home', ['at school', 'at the park']],
    [2, 4, 'What does Mom give him?', 'warm soup', ['ice cream', 'a toy']],
    [3, 5, 'What does he drink?', 'water', ['juice', 'soda']],
    [3, 6, 'When does he feel better?', 'in the evening', ['in the morning', 'at lunch']],
  ]],
  [['Emma and Dad go shopping.', 'They go to the store.', 'Dad takes a big cart.', 'Emma puts bread in it.', 'She puts bananas and milk in it too.', 'Then they pay and go home.'], [
    [1, 2, 'Where do they go?', 'to the store', ['to the zoo', 'to school']],
    [1, 2, 'Who goes with Emma?', 'Dad', ['Mom', 'Grandma']],
    [1, 2, 'What do they do?', 'They go shopping', ['They go swimming', 'They go to sleep']],
    [2, 3, 'What does Dad take?', 'a big cart', ['a big bike', 'a big hat']],
    [2, 4, 'What does Emma put in?', '🍞', ['🍕', '🍪']],
    [3, 5, 'What else goes in the cart?', 'bananas and milk', ['shoes and hats', 'dogs and cats']],
    [3, 6, 'What do they do last?', 'They go home', ['They go to the store', 'They take the cart']],
  ]],
  [['It is Saturday.', 'Zoé and Max play soccer.', 'The ball is round and white.', 'Zoé kicks it very far.', 'Max runs and catches it.', 'They both laugh.'], [
    [1, 2, 'What day is it?', 'Saturday', ['Monday', 'Friday']],
    [1, 2, 'What do they play?', 'soccer', ['hockey', 'tennis']],
    [1, 2, 'Who plays soccer?', 'Zoé and Max', ['Mia and Leo', 'Sam and Noah']],
    [2, 3, 'What colour is the ball?', '⚪', ['🔴', '🟢']],
    [2, 4, 'Who kicks the ball?', 'Zoé', ['Max', 'Noah']],
    [3, 5, 'What does Max do?', 'He catches the ball', ['He kicks it', 'He eats it']],
    [3, 6, 'They both laugh.', true],
  ]],
  [['Sam has a yellow duck.', 'The duck is in the pond.', 'It swims in circles.', 'Sam gives it some bread.', 'The duck says, "Quack, quack!"', 'Sam laughs.'], [
    [1, 2, 'What colour is the duck?', '🟡', ['🔴', '🟣']],
    [1, 2, 'Who has a duck?', 'Sam', ['Emma', 'Leo']],
    [1, 2, 'Where is the duck?', 'in the pond', ['in the bed', 'in the car']],
    [2, 3, 'How does the duck swim?', 'in circles', ['on its back', 'very high']],
    [2, 4, 'What does Sam give the duck?', '🍞', ['🍕', '🥕']],
    [3, 5, 'What does the duck say?', 'Quack, quack!', ['Moo, moo!', 'Woof, woof!']],
    [3, 6, 'Sam is sad.', false],
  ]],
  [['Lily has a purple scarf.', 'It is long and soft.', 'It is a cold day.', 'She wraps the scarf around her neck.', 'Her neck is warm now.', 'She goes out to play in the snow.'], [
    [1, 2, 'What colour is the scarf?', '🟣', ['🟢', '🔴']],
    [1, 2, 'Who has a scarf?', 'Lily', ['Sam', 'Noah']],
    [1, 2, 'Is the scarf long or short?', 'long', ['short', 'tiny']],
    [2, 3, 'What is the weather like?', 'cold', ['hot', 'sunny']],
    [2, 4, 'What does Lily wrap around her neck?', '🧣', ['🧦', '👢']],
    [3, 5, 'How is her neck?', 'warm', ['wet', 'sore']],
    [3, 6, 'Where does Lily go?', 'out to play in the snow', ['to the beach', 'to bed']],
  ]],
  [['Max has an orange cat.', 'The cat is on the chair.', 'The cat is hungry.', 'Max opens a can of tuna.', 'The cat runs to the bowl.', 'It eats everything.'], [
    [1, 2, 'Where is the cat?', 'on the chair', ['on the roof', 'in the bath']],
    [1, 2, 'Who has a cat?', 'Max', ['Mia', 'Zoé']],
    [1, 2, 'What animal does Max have?', '🐱', ['🐶', '🐰']],
    [2, 3, 'How does the cat feel?', 'hungry', ['sleepy', 'sad']],
    [2, 4, 'What does Max open?', 'a can of tuna', ['a book', 'a door']],
    [3, 5, 'Where does the cat run?', 'to the bowl', ['to the park', 'to school']],
    [3, 6, 'The cat eats everything.', true],
  ]],
  [['Emma has a pink umbrella.', 'It is raining hard.', 'She walks to school.', 'A car drives by.', 'Splash! Water hits her boots.', 'She laughs and keeps walking.'], [
    [1, 2, 'What is the weather?', '🌧️', ['☀️', '❄️']],
    [1, 2, 'Who has an umbrella?', 'Emma', ['Max', 'Leo']],
    [1, 2, 'Is the rain light or hard?', 'hard', ['light', 'there is no rain']],
    [2, 3, 'Where does Emma walk?', 'to school', ['to the zoo', 'to the pool']],
    [2, 4, 'What drives by?', 'a car', ['a plane', 'a boat']],
    [3, 5, 'What gets wet?', 'her boots', ['her hat', 'her book']],
    [3, 6, 'Emma is angry.', false],
  ]],
  [['Leo has a new pair of shoes.', 'They are blue.', 'He wants to run fast.', 'He runs around the yard.', 'He is the fastest boy!', 'He jumps and shouts, "Yes!"'], [
    [1, 2, 'What colour are the shoes?', '🔵', ['🔴', '🟢']],
    [1, 2, 'Who has new shoes?', 'Leo', ['Mia', 'Lily']],
    [1, 2, 'What does Leo have?', 'new shoes', ['a new hat', 'a new coat']],
    [2, 3, 'What does Leo want?', 'to run fast', ['to sleep', 'to swim']],
    [2, 4, 'Where does Leo run?', 'around the yard', ['around the school', 'in the kitchen']],
    [3, 5, 'What does Leo think?', 'He is the fastest boy', ['He is the slowest boy', 'He is tired']],
    [3, 6, 'What does he shout?', 'Yes!', ['No!', 'Help!']],
  ]],
  [['Zoé wakes up early.', 'It is Saturday.', 'She puts on her slippers.', 'She goes to the kitchen.', 'She makes toast with jam.', 'She eats it with a glass of juice.'], [
    [1, 2, 'What day is it?', 'Saturday', ['Monday', 'Tuesday']],
    [1, 2, 'Who wakes up early?', 'Zoé', ['Sam', 'Noah']],
    [1, 2, 'When does Zoé wake up?', 'early', ['late', 'at night']],
    [2, 3, 'What does she put on?', 'her slippers', ['her boots', 'her coat']],
    [2, 4, 'Where does she go?', 'to the kitchen', ['to the park', 'to school']],
    [3, 5, 'What does she make?', 'toast with jam', ['soup', 'a salad']],
    [3, 6, 'What does she drink?', 'juice', ['milk', 'water']],
  ]],
  [['Noah has a toy train.', 'It is red and black.', 'It goes around a track.', 'Noah puts a little man in the train.', 'The train goes into a tunnel.', 'It comes out the other side.'], [
    [1, 2, 'What toy does Noah have?', 'a train', ['a plane', 'a robot']],
    [1, 2, 'Who has a toy train?', 'Noah', ['Emma', 'Sam']],
    [1, 2, 'What colour is the train?', '🔴', ['🟢', '🟣']],
    [2, 3, 'What does the train go around?', 'a track', ['a tree', 'a lake']],
    [2, 4, 'Who is in the train?', 'a little man', ['a little dog', 'a little cat']],
    [3, 5, 'Where does the train go?', 'into a tunnel', ['into a river', 'into the sky']],
    [3, 6, 'The train comes out of the tunnel.', true],
  ]],
  [['Mia is at the park with Dad.', 'It is a nice day.', 'She plays on the slide.', 'Then she plays on the swings.', 'Dad pushes her high.', 'She is not scared.'], [
    [1, 2, 'Who is with Mia?', 'Dad', ['Mom', 'Grandma']],
    [1, 2, 'Where is Mia?', 'at the park', ['at school', 'at the zoo']],
    [1, 2, 'What kind of day is it?', 'a nice day', ['a stormy day', 'a snowy night']],
    [2, 3, 'What does Mia play on first?', 'the slide', ['the swings', 'a bike']],
    [2, 4, 'What does she play on next?', 'the swings', ['the slide', 'a bus']],
    [3, 5, 'Who pushes her?', 'Dad', ['Mom', 'a friend']],
    [3, 6, 'Mia is scared.', false],
  ]],
];

// ===== e20 data =====
const L20 = [
  [['Sam has a dog.', 'The dog is black.', 'Its name is Rex.', 'Rex likes to run in the park.', 'Sam throws a stick.', 'Rex brings it back.'], [
    [1, 2, 'What colour is the dog?', 'black', ['white', 'brown']],
    [1, 3, 'What is the dog\'s name?', 'Rex', ['Max', 'Sam']],
    [1, 1, 'Who has a dog?', 'Sam', ['Lily', 'Mia']],
    [1, 2, 'The dog is black.', true],
    [2, 4, 'Where does Rex like to run?', 'in the park', ['in the house', 'at school']],
    [2, 5, 'What does Sam throw?', 'a stick', ['a ball', 'a shoe']],
    [3, 6, 'What does Rex do with the stick?', 'He brings it back', ['He eats it', 'He hides it']],
    [3, 6, 'Rex runs away with the stick.', false],
  ]],
  [['Lily has a green hat.', 'It is a warm hat.', 'She wears it in winter.', 'One day, the wind takes her hat.', 'It lands in a tree.', 'A boy gets it and gives it back.'], [
    [1, 1, 'What colour is the hat?', 'green', ['red', 'blue']],
    [1, 3, 'When does Lily wear the hat?', 'in winter', ['in summer', 'at night']],
    [1, 2, 'Is the hat warm?', 'Yes', ['No', 'It is hot']],
    [1, 1, 'Who has a hat?', 'Lily', ['Zoé', 'Leo']],
    [2, 4, 'What takes the hat?', 'the wind', ['a dog', 'a car']],
    [2, 5, 'Where does the hat land?', 'in a tree', ['in a river', 'on a roof']],
    [3, 6, 'Who gets the hat?', 'a boy', ['a girl', 'a cat']],
    [3, 6, 'Lily gets her hat back.', true],
  ]],
  [['Max is hungry.', 'He makes a sandwich.', 'He puts cheese and a tomato in it.', 'He pours a glass of milk.', 'He sits at the table.', 'He eats his lunch.'], [
    [1, 1, 'How does Max feel?', 'hungry', ['tired', 'cold']],
    [1, 2, 'What does Max make?', 'a sandwich', ['a cake', 'a soup']],
    [1, 3, 'What goes in the sandwich?', 'cheese and a tomato', ['fish and rice', 'jam and butter']],
    [1, 2, 'Max makes a pizza.', false],
    [2, 4, 'What does Max pour?', 'milk', ['juice', 'water']],
    [2, 5, 'Where does Max sit?', 'at the table', ['on the floor', 'in the car']],
    [3, 6, 'What does Max do last?', 'He eats his lunch', ['He makes a sandwich', 'He pours milk']],
    [3, 3, 'Why does Max make a sandwich?', 'He is hungry', ['He is sad', 'He is sleepy']],
  ]],
  [['Emma goes to the library.', 'She wants a book about animals.', 'She finds a book about lions.', 'She sits on a chair and reads.', 'The lions are big and strong.', 'Emma takes the book home.'], [
    [1, 1, 'Where does Emma go?', 'to the library', ['to the zoo', 'to the beach']],
    [1, 2, 'What book does she want?', 'a book about animals', ['a book about cars', 'a book about food']],
    [1, 3, 'What is her book about?', 'lions', ['dogs', 'fish']],
    [1, 1, 'Who goes to the library?', 'Emma', ['Sam', 'Noah']],
    [2, 4, 'Where does Emma read?', 'on a chair', ['on a bike', 'in a tree']],
    [2, 5, 'The lions are big and strong.', true],
    [3, 6, 'What does Emma do at the end?', 'She takes the book home', ['She loses the book', 'She goes to bed']],
    [3, 3, 'Emma finds a book about birds.', false],
  ]],
  [['Leo is on the playground.', 'He climbs the ladder.', 'He goes down the slide.', 'It is fast and fun.', 'He goes down again and again.', 'Then he is tired and goes home.'], [
    [1, 1, 'Where is Leo?', 'on the playground', ['at school', 'in the kitchen']],
    [1, 2, 'What does Leo climb?', 'the ladder', ['a tree', 'a wall']],
    [1, 3, 'What does Leo go down?', 'the slide', ['the stairs', 'the hill']],
    [1, 3, 'Leo goes down the slide.', true],
    [2, 4, 'How is the slide?', 'fast and fun', ['slow and boring', 'small and broken']],
    [2, 5, 'How many times does Leo go down?', 'many times', ['one time', 'never']],
    [3, 6, 'Why does Leo go home?', 'He is tired', ['He is hungry', 'He is sick']],
    [3, 6, 'Leo goes home.', true],
  ]],
  [['Zoé has a pet turtle.', 'The turtle is very slow.', 'It lives in a big tank.', 'Zoé gives it lettuce to eat.', 'The turtle eats a little.', 'Then it goes to sleep in its shell.'], [
    [1, 1, 'What pet does Zoé have?', 'a turtle', ['a rabbit', 'a bird']],
    [1, 2, 'How is the turtle?', 'slow', ['fast', 'loud']],
    [1, 3, 'Where does the turtle live?', 'in a big tank', ['in a tree', 'in a bed']],
    [1, 2, 'The turtle is very fast.', false],
    [2, 4, 'What does Zoé give the turtle?', 'lettuce', ['pizza', 'ice cream']],
    [2, 5, 'How much does the turtle eat?', 'a little', ['a lot', 'nothing']],
    [3, 6, 'Where does the turtle sleep?', 'in its shell', ['in a bed', 'in a bowl']],
    [3, 6, 'What does the turtle do last?', 'It sleeps', ['It eats', 'It swims away']],
  ]],
  [['Noah is at the swimming pool.', 'The water is cold.', 'He puts one foot in.', 'Brr! He jumps back.', 'Then he gets in slowly.', 'Soon the water feels good.'], [
    [1, 1, 'Where is Noah?', 'at the swimming pool', ['at the park', 'at the farm']],
    [1, 2, 'The water is cold.', true],
    [1, 3, 'What does Noah put in the water?', 'one foot', ['his hat', 'his book']],
    [1, 1, 'Who is at the pool?', 'Noah', ['Emma', 'Max']],
    [2, 4, 'What does Noah do after "Brr!"?', 'He jumps back', ['He sings', 'He runs home']],
    [2, 5, 'How does he get in?', 'slowly', ['fast', 'with a bike']],
    [3, 4, 'Why does Noah say "Brr!"?', 'The water is cold', ['The water is hot', 'He is hungry']],
    [3, 6, 'How does the water feel at the end?', 'good', ['bad', 'hot']],
  ]],
  [['Mia has a pink dress.', 'She wears it to a party.', 'She also wears white shoes.', 'At the party, she dances.', 'Her dress gets dirty because she drops her juice.', 'Mom says, "It is OK. We can wash it."'], [
    [1, 1, 'What colour is the dress?', 'pink', ['yellow', 'black']],
    [1, 2, 'Where does she wear it?', 'to a party', ['to the pool', 'to bed']],
    [1, 3, 'What colour are the shoes?', 'white', ['red', 'blue']],
    [1, 1, 'Who has a dress?', 'Mia', ['Max', 'Sam']],
    [2, 4, 'What does Mia do at the party?', 'She dances', ['She sleeps', 'She swims']],
    [2, 5, 'Why does the dress get dirty?', 'She drops her juice', ['She plays in snow', 'She falls in mud']],
    [3, 6, 'What does Mom say?', 'We can wash it', ['Go to bed', 'It is too bad']],
    [3, 6, 'Mom is angry.', false],
  ]],
  [['Today is Monday.', 'Sam goes to school.', 'He has art class.', 'He paints a blue sun.', 'The teacher says, "Nice work!"', 'Sam smiles.'], [
    [1, 1, 'What day is it?', 'Monday', ['Friday', 'Sunday']],
    [1, 2, 'Where does Sam go?', 'to school', ['to the beach', 'to the farm']],
    [1, 3, 'What class does he have?', 'art', ['music', 'gym']],
    [1, 2, 'Sam goes to school.', true],
    [2, 4, 'What does Sam paint?', 'a blue sun', ['a red house', 'a green cat']],
    [2, 5, 'Who says "Nice work!"?', 'the teacher', ['Mom', 'a friend']],
    [3, 6, 'How does Sam feel at the end?', 'happy', ['angry', 'scared']],
    [3, 6, 'Sam is sad.', false],
  ]],
  [['Lily is at the grocery store with Mom.', 'They need apples and bread.', 'Lily carries the basket.', 'It gets heavy.', 'Mom helps her.', 'Then they go to pay.'], [
    [1, 1, 'Who is with Lily?', 'Mom', ['Dad', 'Grandma']],
    [1, 2, 'What do they need?', 'apples and bread', ['shoes and hats', 'toys and books']],
    [1, 3, 'What does Lily carry?', 'the basket', ['the cat', 'the car']],
    [1, 1, 'Where is Lily?', 'at the store', ['at the pool', 'at school']],
    [2, 4, 'What happens to the basket?', 'It gets heavy', ['It gets lost', 'It gets small']],
    [2, 5, 'Who helps Lily?', 'Mom', ['Dad', 'a dog']],
    [3, 6, 'What do they do at the end?', 'They go to pay', ['They go home to bed', 'They go swimming']],
    [3, 4, 'The basket is light.', false],
  ]],
  [['It is winter in Québec.', 'There is a lot of snow.', 'Max goes outside with his sled.', 'He pulls it up the hill.', 'Then he slides down fast.', 'His cheeks are red and cold.'], [
    [1, 1, 'What season is it?', 'winter', ['summer', 'spring']],
    [1, 2, 'What is on the ground?', 'snow', ['sand', 'grass']],
    [1, 3, 'What does Max have?', 'a sled', ['a boat', 'a kite']],
    [1, 2, 'There is a lot of snow.', true],
    [2, 4, 'Where does Max pull the sled?', 'up the hill', ['into the house', 'to school']],
    [2, 5, 'How does Max slide down?', 'fast', ['slowly', 'on a horse']],
    [3, 6, 'How are his cheeks?', 'red and cold', ['green and hot', 'blue and warm']],
    [3, 5, 'Max slides before he pulls the sled up the hill.', false],
  ]],
  [['It is a hot summer day.', 'Emma and Leo eat ice cream.', 'Emma has strawberry.', 'Leo has chocolate.', 'The ice cream melts fast.', 'They laugh and lick their hands.'], [
    [1, 1, 'What season is it?', 'summer', ['winter', 'fall']],
    [1, 2, 'What do Emma and Leo eat?', 'ice cream', ['soup', 'bread']],
    [1, 1, 'Is it hot or cold?', 'hot', ['cold', 'snowy']],
    [1, 3, 'What does Emma have?', 'strawberry', ['chocolate', 'banana']],
    [2, 4, 'What does Leo have?', 'chocolate', ['strawberry', 'lemon']],
    [2, 5, 'What happens to the ice cream?', 'It melts', ['It grows', 'It jumps']],
    [3, 5, 'Why does the ice cream melt fast?', 'It is hot', ['It is cold', 'It is night']],
    [3, 6, 'They lick their hands.', true],
  ]],
  [['Zoé is the line leader today.', 'She walks to the gym with her class.', 'They play a game with a big ball.', 'Zoé throws the ball to Noah.', 'He catches it.', 'The class cheers.'], [
    [1, 1, 'Who is the line leader?', 'Zoé', ['Noah', 'Mia']],
    [1, 2, 'Where does the class go?', 'to the gym', ['to the pool', 'to the zoo']],
    [1, 3, 'What do they play with?', 'a big ball', ['a big kite', 'a big bike']],
    [1, 2, 'Zoé walks to the gym.', true],
    [2, 4, 'Who gets the ball?', 'Noah', ['Zoé', 'Leo']],
    [2, 5, 'Does Noah catch the ball?', 'Yes', ['No', 'He eats it']],
    [3, 6, 'What does the class do?', 'It cheers', ['It cries', 'It sleeps']],
    [3, 4, 'Zoé throws the ball to Mia.', false],
  ]],
  [['Sam wants to play outside.', 'But it is raining.', 'He is sad.', 'Dad says, "Let us build a fort."', 'They use blankets and chairs.', 'Sam is happy again.'], [
    [1, 1, 'What does Sam want?', 'to play outside', ['to go to bed', 'to eat lunch']],
    [1, 2, 'What is the weather?', 'rainy', ['sunny', 'snowy']],
    [1, 3, 'How does Sam feel?', 'sad', ['excited', 'sleepy']],
    [1, 2, 'It is raining.', true],
    [2, 4, 'What does Dad say?', 'Let us build a fort.', ['Let us go to the beach.', 'Let us go to bed.']],
    [2, 5, 'What do they use?', 'blankets and chairs', ['books and pens', 'balls and bats']],
    [3, 6, 'How does Sam feel at the end?', 'happy', ['sad', 'angry']],
    [3, 3, 'Why is Sam sad?', 'He cannot play outside', ['He lost his shoe', 'He is hungry']],
  ]],
  [['Mia has a baby brother.', 'His name is Leo.', 'He is one year old.', 'He cannot walk yet.', 'Mia shakes a rattle.', 'The baby laughs.'], [
    [1, 1, 'Who has a baby brother?', 'Mia', ['Sam', 'Emma']],
    [1, 2, 'What is the baby\'s name?', 'Leo', ['Max', 'Sam']],
    [1, 3, 'How old is the baby?', 'one year old', ['five years old', 'ten years old']],
    [1, 3, 'The baby is one year old.', true],
    [2, 4, 'What can the baby not do?', 'walk', ['laugh', 'cry']],
    [2, 5, 'What does Mia shake?', 'a rattle', ['a drum', 'a bottle']],
    [3, 6, 'What does the baby do?', 'He laughs', ['He cries', 'He runs']],
    [3, 4, 'The baby can walk.', false],
  ]],
  [['Max has a loose tooth.', 'It wiggles when he eats an apple.', 'He pulls it out.', 'He puts it under his pillow.', 'In the morning, there is a coin.', 'Max is very happy.'], [
    [1, 1, 'What does Max have?', 'a loose tooth', ['a sore foot', 'a red nose']],
    [1, 2, 'When does the tooth wiggle?', 'when he eats an apple', ['when he sleeps', 'when he runs']],
    [1, 3, 'What does Max do with the tooth?', 'He pulls it out', ['He eats it', 'He throws it']],
    [1, 1, 'Who has a loose tooth?', 'Max', ['Zoé', 'Lily']],
    [2, 4, 'Where does he put the tooth?', 'under his pillow', ['in his shoe', 'in the fridge']],
    [2, 5, 'What is there in the morning?', 'a coin', ['a book', 'a cat']],
    [3, 6, 'How does Max feel?', 'happy', ['sad', 'angry']],
    [3, 3, 'Max eats the tooth.', false],
  ]],
  [['Noah and his mom bake a cake.', 'They put flour and eggs in a bowl.', 'Noah stirs it.', 'Mom puts the cake in the oven.', 'It bakes for one hour.', 'The cake is ready, and it is delicious.'], [
    [1, 1, 'What do Noah and Mom bake?', 'a cake', ['bread', 'cookies']],
    [1, 2, 'What goes in the bowl?', 'flour and eggs', ['milk and fish', 'sand and water']],
    [1, 3, 'Who stirs?', 'Noah', ['Mom', 'Dad']],
    [1, 2, 'They put flour in the bowl.', true],
    [2, 4, 'Where does Mom put the cake?', 'in the oven', ['in the fridge', 'on the bed']],
    [2, 5, 'How long does the cake bake?', 'one hour', ['one day', 'one minute']],
    [3, 6, 'How is the cake?', 'delicious', ['bad', 'cold']],
    [3, 4, 'Noah puts the cake in the oven.', false],
  ]],
  [['Emma has a new pair of boots.', 'They are red.', 'She wants to try them in the rain.', 'She goes outside and jumps in puddles.', 'Her feet stay dry.', 'She says, "I love my boots!"'], [
    [1, 1, 'What does Emma have?', 'new boots', ['new gloves', 'a new hat']],
    [1, 2, 'What colour are the boots?', 'red', ['blue', 'yellow']],
    [1, 3, 'When does she want to try them?', 'in the rain', ['in the snow', 'at night']],
    [1, 2, 'The boots are red.', true],
    [2, 4, 'What does Emma jump in?', 'puddles', ['leaves', 'snow']],
    [2, 5, 'How are her feet?', 'dry', ['wet', 'cold']],
    [3, 6, 'What does Emma say?', 'I love my boots!', ['I hate the rain!', 'I am tired!']],
    [3, 5, 'Her feet get wet.', false],
  ]],
  [['Leo is lost at the mall.', 'He cannot see Mom.', 'He is scared.', 'A kind lady asks, "Are you OK?"', 'She takes him to a worker.', 'Soon Mom comes, and Leo hugs her.'], [
    [1, 1, 'Where is Leo?', 'at the mall', ['at school', 'at the beach']],
    [1, 2, 'What can Leo not see?', 'Mom', ['a toy', 'a bus']],
    [1, 3, 'How does Leo feel?', 'scared', ['happy', 'silly']],
    [1, 3, 'Leo is scared.', true],
    [2, 4, 'Who asks, "Are you OK?"', 'a kind lady', ['a dog', 'Dad']],
    [2, 5, 'Where does she take Leo?', 'to a worker', ['to the car', 'to a zoo']],
    [3, 6, 'What does Leo do when Mom comes?', 'He hugs her', ['He runs away', 'He cries loudly']],
    [3, 6, 'Leo finds Mom.', true],
  ]],
  [['Sam, Lily and Max have a lemonade stand.', 'Lemonade costs one dollar.', 'It is a hot day.', 'Many people stop and buy a cup.', 'They sell ten cups.', 'They share the money.'], [
    [1, 1, 'What do they have?', 'a lemonade stand', ['a toy shop', 'a pizza shop']],
    [1, 2, 'How much is the lemonade?', 'one dollar', ['ten dollars', 'two dollars']],
    [1, 3, 'What is the weather?', 'hot', ['cold', 'snowy']],
    [1, 1, 'How many children have the stand?', '3', ['2', '4']],
    [2, 4, 'What do people do?', 'They buy a cup', ['They take a nap', 'They run away']],
    [2, 5, 'How many cups do they sell?', '10', ['5', '3']],
    [3, 6, 'What do they do with the money?', 'They share it', ['They lose it', 'They eat it']],
    [3, 3, 'It is a hot day.', true],
  ]],
  [['Zoé likes music.', 'She plays the piano.', 'She practises every day.', 'Today is her first show.', 'She is nervous.', 'She plays well, and everyone claps.'], [
    [1, 1, 'What does Zoé like?', 'music', ['sports', 'food']],
    [1, 2, 'What does she play?', 'the piano', ['the drum', 'the guitar']],
    [1, 3, 'When does she practise?', 'every day', ['never', 'only on Sunday']],
    [1, 2, 'Zoé plays the piano.', true],
    [2, 4, 'What is today?', 'her first show', ['her birthday', 'a school day']],
    [2, 5, 'How does she feel?', 'nervous', ['bored', 'angry']],
    [3, 6, 'What does everyone do?', 'They clap', ['They sleep', 'They leave']],
    [3, 6, 'Zoé plays badly.', false],
  ]],
  [['Noah plants a seed in a pot.', 'He puts it near the window.', 'Every day he gives it water.', 'After one week, a small green plant comes out.', 'After one month, there is a flower.', 'The flower is yellow.'], [
    [1, 1, 'What does Noah plant?', 'a seed', ['a shoe', 'an egg']],
    [1, 2, 'Where does he put the pot?', 'near the window', ['in the fridge', 'under the bed']],
    [1, 3, 'What does he give the seed?', 'water', ['milk', 'juice']],
    [1, 3, 'He gives it water every day.', true],
    [2, 4, 'What comes out after one week?', 'a small green plant', ['a big tree', 'a red flower']],
    [2, 5, 'What is there after one month?', 'a flower', ['a fruit', 'a bird']],
    [3, 6, 'What colour is the flower?', 'yellow', ['red', 'pink']],
    [3, 5, 'The flower comes before the small plant.', false],
  ]],
  [['Mia and Sam see a big spider.', 'It is on the wall.', 'Mia screams.', 'Sam is not scared.', 'He puts the spider in a cup.', 'He takes it outside.'], [
    [1, 1, 'What do they see?', 'a big spider', ['a big dog', 'a big cat']],
    [1, 2, 'Where is the spider?', 'on the wall', ['on the bed', 'in the sink']],
    [1, 3, 'Who screams?', 'Mia', ['Sam', 'the spider']],
    [1, 1, 'The spider is big.', true],
    [2, 4, 'Who is not scared?', 'Sam', ['Mia', 'Mom']],
    [2, 5, 'What does Sam use?', 'a cup', ['a shoe', 'a book']],
    [3, 6, 'Where does Sam take the spider?', 'outside', ['to bed', 'to school']],
    [3, 6, 'Sam hurts the spider.', false],
  ]],
  [['Lily and her dad go camping.', 'They sleep in a tent.', 'At night, they sit by the fire.', 'They eat marshmallows.', 'They look at the stars.', 'Lily says, "This is the best day!"'], [
    [1, 1, 'Where do Lily and her dad go?', 'camping', ['to school', 'shopping']],
    [1, 2, 'Where do they sleep?', 'in a tent', ['in a house', 'in a car']],
    [1, 3, 'Where do they sit at night?', 'by the fire', ['in the pool', 'on a bus']],
    [1, 1, 'Who goes camping with Lily?', 'her dad', ['her mom', 'her teacher']],
    [2, 4, 'What do they eat?', 'marshmallows', ['soup', 'pizza']],
    [2, 5, 'What do they look at?', 'the stars', ['the sea', 'a movie']],
    [3, 6, 'What does Lily say?', 'This is the best day!', ['I am cold!', 'I want to go home!']],
    [3, 3, 'They sit by the fire at night.', true],
  ]],
  [['Max is on a boat with Grandpa.', 'They want to catch a fish.', 'Grandpa gives Max a fishing rod.', 'Max waits and waits.', 'Then he feels a pull.', 'He catches a big fish!'], [
    [1, 1, 'Who is on the boat with Max?', 'Grandpa', ['Grandma', 'Dad']],
    [1, 2, 'What do they want to catch?', 'a fish', ['a bird', 'a frog']],
    [1, 3, 'What does Grandpa give Max?', 'a fishing rod', ['a hat', 'a cup']],
    [1, 1, 'Where is Max?', 'on a boat', ['on a bus', 'in a plane']],
    [2, 4, 'What does Max do?', 'He waits', ['He sleeps', 'He swims']],
    [2, 5, 'What does he feel?', 'a pull', ['a drop of rain', 'a cold wind']],
    [3, 6, 'What does Max catch?', 'a big fish', ['a small fish', 'a shoe']],
    [3, 6, 'Max catches a fish at the end.', true],
  ]],
  [['Emma loves to draw.', 'She draws a house and a tree.', 'She uses a lot of colours.', 'The sun is yellow.', 'The grass is green.', 'She gives the drawing to Grandma.'], [
    [1, 1, 'What does Emma love?', 'to draw', ['to run', 'to swim']],
    [1, 2, 'What does she draw?', 'a house and a tree', ['a car and a boat', 'a cat and a dog']],
    [1, 3, 'Emma uses a lot of colours.', true],
    [1, 1, 'Who loves to draw?', 'Emma', ['Noah', 'Max']],
    [2, 4, 'What colour is the sun?', 'yellow', ['blue', 'purple']],
    [2, 5, 'What colour is the grass?', 'green', ['red', 'orange']],
    [3, 6, 'Who gets the drawing?', 'Grandma', ['Grandpa', 'the teacher']],
    [3, 6, 'Emma keeps the drawing.', false],
  ]],
  [['Leo is the new boy at school.', 'He does not know anyone.', 'He feels shy.', 'At recess, Sam says, "Do you want to play?"', 'They play tag together.', 'Now Leo has a new friend.'], [
    [1, 1, 'Who is new at school?', 'Leo', ['Sam', 'Mia']],
    [1, 2, 'Does Leo know anyone?', 'No', ['Yes', 'He knows everyone']],
    [1, 3, 'How does Leo feel?', 'shy', ['angry', 'sleepy']],
    [1, 3, 'Leo is shy.', true],
    [2, 4, 'Who asks, "Do you want to play?"', 'Sam', ['Max', 'the teacher']],
    [2, 5, 'What do they play?', 'tag', ['soccer', 'cards']],
    [3, 6, 'What does Leo have now?', 'a new friend', ['a new bike', 'a new hat']],
    [3, 4, 'Sam asks Leo to play.', true],
  ]],
  [['It is Saturday morning.', 'Zoé helps her mom clean the house.', 'She puts her toys in a box.', 'She makes her bed.', 'Then she waters the plants.', 'Mom says, "Thank you for your help!"'], [
    [1, 1, 'What day is it?', 'Saturday', ['Monday', 'Wednesday']],
    [1, 2, 'Who helps Mom?', 'Zoé', ['Lily', 'Emma']],
    [1, 3, 'Where does Zoé put her toys?', 'in a box', ['on the roof', 'in the sink']],
    [1, 2, 'Zoé helps clean the house.', true],
    [2, 4, 'What does she make?', 'her bed', ['a cake', 'a boat']],
    [2, 5, 'What does she water?', 'the plants', ['the dog', 'the car']],
    [3, 6, 'What does Mom say?', 'Thank you for your help!', ['Go to school!', 'Stop it!']],
    [3, 5, 'Zoé waters the plants after she makes her bed.', true],
  ]],
  [['Noah is at the dentist.', 'He sits in a big chair.', 'The dentist looks at his teeth.', 'She says, "Your teeth are very clean!"', 'She gives him a new toothbrush.', 'Noah smiles.'], [
    [1, 1, 'Where is Noah?', 'at the dentist', ['at the zoo', 'at the pool']],
    [1, 2, 'Where does he sit?', 'in a big chair', ['on a bike', 'on the floor']],
    [1, 3, 'What does the dentist look at?', 'his teeth', ['his shoes', 'his hands']],
    [1, 1, 'Who is at the dentist?', 'Noah', ['Mia', 'Sam']],
    [2, 4, 'What does the dentist say?', 'Your teeth are very clean!', ['You have a big cavity!', 'Go home now!']],
    [2, 5, 'What does she give Noah?', 'a new toothbrush', ['a new toy', 'a new hat']],
    [3, 6, 'Noah smiles.', true],
    [3, 4, 'Noah has bad teeth.', false],
  ]],
  [['Sam has a toy car.', 'It is fast and red.', 'He pushes it across the floor.', 'The car hits a wall.', 'It stops.', 'Sam picks it up and tries again.'], [
    [1, 1, 'What toy does Sam have?', 'a toy car', ['a toy boat', 'a toy dog']],
    [1, 2, 'What colour is the car?', 'red', ['green', 'yellow']],
    [1, 3, 'Where does Sam push the car?', 'across the floor', ['into the pool', 'up a tree']],
    [1, 2, 'The car is fast.', true],
    [2, 4, 'What does the car hit?', 'a wall', ['a cat', 'a door']],
    [2, 5, 'What does the car do next?', 'It stops', ['It flies', 'It sings']],
    [3, 6, 'What does Sam do at the end?', 'He tries again', ['He goes to bed', 'He cries']],
    [3, 6, 'Sam throws the car away.', false],
  ]],
  [['Lily and Max are at the beach.', 'They build a big sandcastle.', 'Max finds a shell.', 'Lily puts it on top.', 'A wave comes and touches the castle.', 'The shell stays on top!'], [
    [1, 1, 'Where are Lily and Max?', 'at the beach', ['at school', 'at the park']],
    [1, 2, 'What do they build?', 'a sandcastle', ['a snowman', 'a tent']],
    [1, 3, 'What does Max find?', 'a shell', ['a coin', 'a toy']],
    [1, 3, 'Max finds a shell.', true],
    [2, 4, 'Who puts the shell on top?', 'Lily', ['Max', 'Mom']],
    [2, 5, 'What comes?', 'a wave', ['a bus', 'a bird']],
    [3, 6, 'What stays on top?', 'the shell', ['the flag', 'the bucket']],
    [3, 4, 'Max puts the shell on top.', false],
  ]],
  [['Emma is a good helper.', 'She sets the table for dinner.', 'She puts out four plates.', 'She puts forks and knives next to them.', 'Dad says, "Thank you!"', 'They all sit down to eat.'], [
    [1, 1, 'Who is a good helper?', 'Emma', ['Noah', 'Sam']],
    [1, 2, 'What does Emma set?', 'the table', ['the bed', 'the car']],
    [1, 3, 'How many plates does she put out?', '4', ['2', '6']],
    [1, 2, 'Emma sets the table for dinner.', true],
    [2, 4, 'What goes next to the plates?', 'forks and knives', ['hats and shoes', 'books and pens']],
    [2, 5, 'Who says thank you?', 'Dad', ['Mom', 'a dog']],
    [3, 6, 'What do they do at the end?', 'They sit down to eat', ['They go to bed', 'They go to school']],
    [3, 3, 'Emma puts out six plates.', false],
  ]],
  [['Leo has a hamster.', 'Its name is Nibbles.', 'It is small and brown.', 'It runs on a wheel at night.', 'In the day, it sleeps.', 'Leo gives it seeds every morning.'], [
    [1, 1, 'What pet does Leo have?', 'a hamster', ['a horse', 'a snake']],
    [1, 2, 'What is the name of the hamster?', 'Nibbles', ['Rex', 'Spot']],
    [1, 3, 'What colour is the hamster?', 'brown', ['white', 'black']],
    [1, 3, 'The hamster is small.', true],
    [2, 4, 'When does the hamster run on its wheel?', 'at night', ['in the morning', 'at lunch']],
    [2, 5, 'What does it do in the day?', 'It sleeps', ['It swims', 'It reads']],
    [3, 6, 'What does Leo give it?', 'seeds', ['pizza', 'milk']],
    [3, 6, 'Leo feeds the hamster in the morning.', true],
  ]],
  [['It is autumn.', 'The leaves are red, orange and yellow.', 'Zoé and Mia rake the leaves.', 'They make a big pile.', 'Then they jump in it.', 'The leaves fly everywhere!'], [
    [1, 1, 'What season is it?', 'autumn', ['spring', 'summer']],
    [1, 2, 'What colour are the leaves?', 'red, orange and yellow', ['blue and green', 'black and white']],
    [1, 3, 'What do Zoé and Mia do?', 'They rake the leaves', ['They build a snowman', 'They swim']],
    [1, 3, 'Zoé and Mia rake the leaves.', true],
    [2, 4, 'What do they make?', 'a big pile', ['a big cake', 'a big boat']],
    [2, 5, 'What do they do next?', 'They jump in it', ['They go to bed', 'They go to school']],
    [3, 6, 'What happens to the leaves?', 'They fly everywhere', ['They turn blue', 'They sing']],
    [3, 5, 'They jump in the pile.', true],
  ]],
  [['Noah is sick.', 'He has a fever.', 'Mom puts a cold cloth on his head.', 'He drinks tea with honey.', 'He sleeps for a long time.', 'The next day, he feels better.'], [
    [1, 1, 'Who is sick?', 'Noah', ['Leo', 'Mia']],
    [1, 2, 'What does he have?', 'a fever', ['a hat', 'a toy']],
    [1, 3, 'What does Mom put on his head?', 'a cold cloth', ['a hat', 'a book']],
    [1, 1, 'Noah is sick.', true],
    [2, 4, 'What does he drink?', 'tea with honey', ['cold soda', 'a milkshake']],
    [2, 5, 'What does he do for a long time?', 'He sleeps', ['He runs', 'He sings']],
    [3, 6, 'When does he feel better?', 'the next day', ['that night', 'never']],
    [3, 6, 'Noah is still sick the next day.', false],
  ]],
  [['Mia and Sam walk to school.', 'Mia has a blue backpack.', 'Sam has a red lunch box.', 'They see a big dog.', 'The dog wags its tail.', 'Mia pets it and they go on.'], [
    [1, 1, 'Who walks to school?', 'Mia and Sam', ['Leo and Max', 'Emma and Lily']],
    [1, 2, 'What colour is the backpack of Mia?', 'blue', ['red', 'green']],
    [1, 3, 'What does Sam have?', 'a red lunch box', ['a blue backpack', 'a green hat']],
    [1, 2, 'Mia has a blue backpack.', true],
    [2, 4, 'What do they see?', 'a big dog', ['a big bear', 'a big truck']],
    [2, 5, 'What does the dog do?', 'It wags its tail', ['It barks loudly', 'It runs away']],
    [3, 6, 'Who pets the dog?', 'Mia', ['Sam', 'the teacher']],
    [3, 6, 'They go on after they pet the dog.', true],
  ]],
  [['Max builds a tower with blocks.', 'It is very tall.', 'He puts a red block on top.', 'His little sister walks by.', 'She touches the tower.', 'Crash! It falls down.'], [
    [1, 1, 'What does Max build?', 'a tower', ['a bridge', 'a boat']],
    [1, 2, 'How is the tower?', 'very tall', ['very short', 'very wide']],
    [1, 3, 'What colour is the top block?', 'red', ['blue', 'green']],
    [1, 2, 'The tower is tall.', true],
    [2, 4, 'Who walks by?', 'his little sister', ['his big brother', 'his mom']],
    [2, 5, 'What does she do?', 'She touches the tower', ['She builds a tower', 'She takes a nap']],
    [3, 6, 'What happens to the tower?', 'It falls down', ['It gets taller', 'It flies']],
    [3, 4, 'Max walks by the tower.', false],
  ]],
];

// ---------- e19 / e20: short stories (listen or read, then answer) ----------
// Story = [sentences[], questions[]]. Question = [level, sentencesNeeded, prompt, right, [wrong, wrong]]
// or a true/false statement = [level, sentencesNeeded, statement, true|false].
// The text heard/shown is the first max(sentencesNeeded, cap[level]) sentences, so every answer is supported
// by the text and the story gets longer with the level.
const isEmoji = (s) => /^\p{Extended_Pictographic}/u.test(s);
const storyOpt = (s) => (isEmoji(s) ? { emoji: s } : { text: s, say: say(s) });
function storyBank(stories) {
  const byLevel = { 1: [], 2: [], 3: [] };
  stories.forEach((st, si) => st[1].forEach((q, qi) => {
    for (let lv = q[0]; lv <= 3; lv++) byLevel[lv].push({ si, qi, own: lv === q[0] });
  }));
  return byLevel;
}
function storyGen(id, stories, caps, showText, tfWords) {
  const bank = storyBank(stories);
  return (R, level) => {
    const own = bank[level].filter((x) => x.own);
    const pool = R.chance(0.45) ? own : bank[level];
    const { si, qi } = R.pick(pool);
    const [sents, qs] = stories[si];
    const q = qs[qi];
    const cap = level === 1 ? caps[0] : level === 2 ? caps[1] : sents.length;
    const text = sents.slice(0, Math.min(sents.length, Math.max(q[1], cap))).join(' ');
    const key = `${id}:${si}:${qi}`;
    const stim = showText ? { stimulus: { text } } : {};
    if (typeof q[3] === 'boolean') {
      const [yes, no] = tfWords ? [{ text: 'True', emoji: '✅', say: say('True') }, { text: 'False', emoji: '❌', say: say('False') }] : [YES, NO];
      const lead = tfWords ? 'True or false?' : 'Does it match the story?';
      return {
        type: 'choice', key, prompt: `${lead} ${q[2]}`, say: say(`${text} ${lead} ${q[2]}`), ...stim,
        options: [yes, no], answer: q[3] ? 0 : 1, fixedOrder: true, cols: 2,
      };
    }
    const opts = [q[3], ...q[4]].map(storyOpt);
    return {
      type: 'choice', key, prompt: q[2], say: say(`${text} ${q[2]}`), ...stim,
      options: opts, answer: 0, cols: opts.length,
    };
  };
}
const gen19 = storyGen('s19', L19, [2, 4], false, false);
const gen20 = storyGen('s20', L20, [3, 4], true, true);
const e19Gens = { 1: [(R) => gen19(R, 1)], 2: [(R) => gen19(R, 2)], 3: [(R) => gen19(R, 3)] };
const e20Gens = { 1: [(R) => gen20(R, 1)], 2: [(R) => gen20(R, 2)], 3: [(R) => gen20(R, 3)] };

export const units = [
  unit('e1', '👋', { fr: 'Bonjour!', en: 'Hello!' },
    PFEQ + 'comprendre des salutations et des émotions simples', e1Gens),
  unit('e2', '🎨', { fr: 'Les couleurs', en: 'Colours' },
    PFEQ + 'comprendre le vocabulaire des couleurs à l\'oral', e2Gens),
  unit('e3', '🔢', { fr: 'Les nombres 1 à 20', en: 'Numbers 1–20' },
    PFEQ + 'comprendre et utiliser les nombres de 1 à 20', e3Gens),
  unit('e4', '🐱', { fr: 'Les animaux', en: 'Animals' },
    PFEQ + 'comprendre le vocabulaire des animaux et de courtes phrases', e4Gens),
  unit('e5', '👀', { fr: 'Mon corps', en: 'My body' },
    PFEQ + 'comprendre les parties du corps et des consignes simples', e5Gens),
  unit('e6', '👪', { fr: 'Ma famille', en: 'My family' },
    PFEQ + 'comprendre le vocabulaire de la famille', e6Gens),
  unit('e7', '🍎', { fr: 'La nourriture', en: 'Food' },
    PFEQ + 'comprendre le vocabulaire des aliments et exprimer ses goûts', e7Gens),
  unit('e8', '👕', { fr: 'Les vêtements', en: 'Clothes' },
    PFEQ + 'comprendre le vocabulaire des vêtements', e8Gens),
  unit('e9', '🏫', { fr: 'Dans la classe', en: 'In the classroom' },
    PFEQ + 'comprendre le vocabulaire et les consignes de la classe', e9Gens),
  unit('e10', '🌦️', { fr: 'La météo, les saisons, les jours et les mois', en: 'Weather, seasons, days & months' },
    PFEQ + 'comprendre la météo, les saisons, les jours de la semaine et les mois', e10Gens),
  unit('e11', '🏃', { fr: 'Les verbes d\'action', en: 'Action words' },
    PFEQ + 'comprendre des verbes d\'action et de courtes phrases', e11Gens),
  unit('e12', '🗣️', { fr: 'Phrases utiles', en: 'Useful phrases' },
    PFEQ + 'comprendre et utiliser le langage de la classe et de politesse', e12Gens),
  unit('e13', '🧸', { fr: 'Jouets et jeux', en: 'Toys & games' },
    PFEQ + 'comprendre le vocabulaire des jouets, des sports et des jeux', e13Gens),
  unit('e14', '🏠', { fr: 'Ma maison', en: 'My house' },
    PFEQ + 'comprendre le vocabulaire de la maison, des pièces et des objets', e14Gens),
  unit('e15', '🚌', { fr: 'Les transports', en: 'Transportation' },
    PFEQ + 'comprendre le vocabulaire des moyens de transport', e15Gens),
  unit('e16', '📦', { fr: 'Où est-ce?', en: 'Where is it?' },
    PFEQ + 'comprendre où se trouvent les objets (in, on, under, next to)', e16Gens),
  unit('e17', '⏰', { fr: 'Ma journée', en: 'My day' },
    PFEQ + 'comprendre la routine quotidienne, les moments de la journée et l\'heure', e17Gens),
  unit('e18', '🎉', { fr: 'Fêtes et célébrations', en: 'Holidays & celebrations' },
    PFEQ + 'comprendre le vocabulaire des fêtes et des célébrations', e18Gens),
  unit('e19', '👂', { fr: "Écoute l'histoire", en: 'Listen to the story' },
    PFEQ + 'comprendre de courtes histoires entendues (qui, quoi, où, pourquoi, ordre des événements)', e19Gens),
  unit('e20', '📚', { fr: 'Je lis en anglais', en: 'Read and answer' },
    PFEQ + 'lire de courts textes en anglais et répondre à des questions de compréhension', e20Gens),
];
