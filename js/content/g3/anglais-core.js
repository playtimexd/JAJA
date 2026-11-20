// Grade 3 ESL (Québec, PFEQ cycle 2 year 1) — shared helpers. Original content, Canadian English.
import { makeRng } from '../../util.js';

export const EN = 'en-CA';
export const say = (text) => ({ text, lang: EN });
export const rest = (a, x) => a.filter((y) => y !== x);
export const cap = (s) => s[0].toUpperCase() + s.slice(1);
export const art = (w) => (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w;
export const PF = 'Anglais langue seconde (PFEQ, 2e cycle, 1re année) — ';
export const COMP_INT = 'interagir oralement en anglais';
export const COMP_READ = 'réinvestir sa compréhension de textes';
export const COMP_WRITE = 'écrire des textes';
export const split = (s) => s.split('|');

// Instructions shared by many units.
export const P = {
  fill: { fr: 'Choisis le mot qui complète la phrase.', en: 'Choose the word that fits the sentence.' },
  correct: { fr: 'Quelle phrase est bien écrite?', en: 'Which sentence is correct?' },
  order: { fr: 'Remets les mots dans l’ordre pour faire une phrase.', en: 'Put the words in order to make a sentence.' },
  spell: { fr: 'Écoute. Remets les lettres dans l’ordre.', en: 'Listen. Put the letters in order.' },
  pic: { fr: 'Quel mot va avec l’image?', en: 'Which word goes with the picture?' },
  listenPic: { fr: 'Écoute. Touche la bonne image.', en: 'Listen. Tap the right picture.' },
  readPic: { fr: 'Lis le mot. Touche la bonne image.', en: 'Read the word. Tap the right picture.' },
  listenWord: { fr: 'Écoute. Quel mot as-tu entendu?', en: 'Listen. Which word did you hear?' },
  fr2en: { fr: 'Comment dit-on ce mot en anglais?', en: 'How do you say this word in English?' },
  en2fr: { fr: 'Que veut dire ce mot en français?', en: 'What does this word mean in French?' },
  odd: { fr: 'Quel mot n’est PAS comme les autres?', en: 'Which word does NOT belong?' },
  clue: { fr: 'Lis l’indice. Quel est le mot?', en: 'Read the clue. Which word is it?' },
  reply: { fr: 'Écoute. Quelle est la meilleure réponse?', en: 'Listen. What is the best reply?' },
  sortW: { fr: 'Place chaque mot dans la bonne boîte.', en: 'Put each word in the right box.' },
};

// Multiple choice: the first option is right (the engine shuffles). `wrong` may be an array or 'a|b|c'.
export function mc(key, prompt, right, wrong, o = {}) {
  const w = (Array.isArray(wrong) ? wrong : split(wrong)).filter((x, i, a) => x !== right && a.indexOf(x) === i);
  const { speak, emoji, ...extra } = o;
  const mk = (t) => {
    const base = emoji ? { emoji: t } : { text: t };
    return speak ? { ...base, say: say(t) } : base;
  };
  return { type: 'choice', key, prompt, options: [right, ...w].map(mk), answer: 0, ...extra };
}

// Sentence with a blank (shown big) + options.
export function blank(key, sentence, right, wrong, o = {}) {
  const longest = Math.max(right.length, ...(Array.isArray(wrong) ? wrong : split(wrong)).map((x) => x.length));
  return mc(key, o.prompt || P.fill, right, wrong, { stimulus: { text: sentence }, cols: longest > 14 ? 1 : undefined, ...(o.tip ? { tip: o.tip } : {}), ...(o.say ? { say: o.say } : {}) });
}
// Which sentence is correct? (options are full sentences)
export function which(key, right, wrong, o = {}) {
  return mc(key, o.prompt || P.correct, right, wrong, { cols: 1, ...(o.tip ? { tip: o.tip } : {}), ...(o.say ? { say: o.say } : {}) });
}
// Words → sentence.
export function build(key, sentence, o = {}) {
  const tiles = sentence.split(' ');
  return { type: 'order', key, prompt: o.prompt || P.order, ...(o.say ? { say: o.say } : {}), ...(o.stimulus ? { stimulus: o.stimulus } : {}), tiles, extra: o.extra, joiner: ' ', ...(o.tip ? { tip: o.tip } : {}) };
}
// Sort: groups = [ [words...], [words...] ], bins = [{text, emoji?}, ...]
export function sortQ(key, prompt, bins, groups, o = {}) {
  return {
    type: 'sort', key, prompt, bins, ...(o.tip ? { tip: o.tip } : {}),
    items: groups.flatMap((g, i) => g.map((t) => ({ text: t, bin: i, ...(o.speak ? { say: say(t) } : {}) }))),
  };
}
// Pick n distinct elements of `arr` that are not `x`.
export const others = (R, arr, x, n) => R.sample(rest(arr, x), n);

export const hand = (o) => ({ type: 'hand', lang: 'en', ...o });

// Build a unit. gens = { 1: [fn,...], 2: [...], 3: [...] }, fn(R) => question.
export function mkUnit(id, icon, title, pfeq, gens, extra = {}) {
  const unit = {
    id, icon, title, pfeq,
    generate(level, R) { const g = gens[level] || gens[2]; return R.pick(g)(R); },
    allSay() { return collectSay(unit); },
    ...extra,
  };
  return unit;
}

// Collect every fixed `say` of a unit by sampling many questions (deterministic seed).
export function collectSay(unit, draws = 1500) {
  const R = makeRng(4242), seen = new Map();
  const add = (s) => { if (s && s.text && s.lang) seen.set(s.text, s); };
  for (const L of [1, 2, 3]) {
    for (let i = 0; i < draws; i++) {
      let q;
      try { q = unit.generate(L, R); } catch (e) { break; }
      add(q.say);
      for (const o of q.options || []) add(o.say);
      for (const o of q.items || []) add(o.say);
    }
  }
  return [...seen.values()];
}

// ---------- slot-set stories (used by reading, listening and writing-answer units) ----------
// rows: 'a|b|c' strings, keys: 'n p pl'
export const slots = (keys, rows) => rows.map((r) => Object.fromEntries(split(r).map((v, i) => [keys.split(' ')[i], v])));
// Values of key k from the other sets (rotated so the pick varies with si), distinct and different from the current one.
export function oth(sets, si, k, n = 3) {
  const cur = sets[si][k], out = [];
  for (let j = 1; j < sets.length && out.length < n; j++) {
    const v = sets[(si + j) % sets.length][k];
    if (v !== cur && !out.includes(v)) out.push(v);
  }
  return out;
}
// def: { id, sets, text(s), qs: [ (s, O) => [question, right, wrongs[], kind] | { seq: [..], q } ] }
// returns entries [{ key, text, q, a, w, seq, kind }]
export function storyEntries(unitId, level, defs) {
  const out = [];
  defs.forEach((d, di) => d.sets.forEach((s, si) => {
    const text = d.text(s);
    d.qs.forEach((f, qi) => {
      const r = f(s, (k, n = 3) => oth(d.sets, si, k, n));
      const e = Array.isArray(r) ? { q: r[0], a: r[1], w: r[2], kind: r[3] || 'lit', tip: r[4] } : { ...r, kind: 'seq' };
      out.push({ key: `${unitId}:l${level}:${d.id || di}:${si}:${qi}`, text, textId: `${d.id || di}:${si}`, ...e });
    });
  }));
  return out;
}
export const spokenText = (t, o = {}) => (o.strip ? t.replace(/^[A-Z][\w.’ ]{0,14}: /gm, '') : t);
const KIND_TIP = {
  lit: { fr: 'La réponse est écrite dans le texte. Relis-le.', en: 'The answer is in the text. Read it again.' },
  inf: { fr: 'Le texte ne le dit pas directement. Cherche des indices.', en: 'The text does not say it directly. Look for clues.' },
  voc: { fr: 'Relis la phrase autour du mot pour deviner son sens.', en: 'Read the sentence around the word to guess its meaning.' },
  seq: { fr: 'Cherche first, next, then, finally, yesterday, today…', en: 'Look for first, next, then, finally, yesterday, today…' },
};
export function storyQ(e, o = {}) {
  const stimulus = o.listen ? { emoji: '🎧' } : { text: e.text };
  const spoken = spokenText(e.text, o);
  const listenSay = o.listen ? { say: say(`${spoken} ... ${e.q}`) } : o.say ? { say: say(`${spoken} ${e.q}`) } : {};
  if (e.seq) {
    return { type: 'order', key: e.key, prompt: e.q, stimulus, ...listenSay, tiles: e.seq, joiner: ' ', tip: e.tip || KIND_TIP.seq };
  }
  const long = Math.max(e.a.length, ...e.w.map((x) => x.length)) > 24;
  const q = mc(e.key, e.q, e.a, e.w, { stimulus, ...listenSay, cols: long ? 1 : undefined, tip: e.tip || KIND_TIP[e.kind] || KIND_TIP.lit });
  if (o.speakOpts) q.options.forEach((op) => { op.say = say(op.text); });
  return q;
}
// Unit made of story entries. session = one text with all its questions.
export function storyUnit(id, icon, title, pfeq, defsByLevel, o = {}) {
  const pools = {};
  for (const l of [1, 2, 3]) pools[l] = storyEntries(id, l, defsByLevel[l]);
  const qOpts = (l) => ({ ...(o.strip ? { strip: true } : {}), ...(o.listen ? { listen: true } : {}), ...(o.sayLevels?.includes(l) ? { say: true } : {}) });
  const unit = {
    id, icon, title, pfeq,
    generate(level, R) { const l = pools[level] ? level : 2; return storyQ(R.pick(pools[l]), qOpts(l)); },
    session(level, R) {
      const l = pools[level] ? level : 2;
      const ids = [...new Set(pools[l].map((e) => e.textId))];
      const t = R.pick(ids);
      return pools[l].filter((e) => e.textId === t).map((e) => storyQ(e, qOpts(l)));
    },
    allSay() {
      const seen = new Map();
      for (const l of [1, 2, 3]) {
        if (!(o.listen || o.sayLevels?.includes(l))) continue;
        for (const e of pools[l]) { const sp = spokenText(e.text, o); const s = say(o.listen ? `${sp} ... ${e.q}` : `${sp} ${e.q}`); seen.set(s.text, s); }
      }
      return [...seen.values()];
    },
    pools,
  };
  return unit;
}
