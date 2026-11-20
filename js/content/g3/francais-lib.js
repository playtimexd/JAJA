// Petit Hibou — Français 3e année : outils communs aux fichiers js/content/g3/francais-*.js.
// (Copiés / adaptés de francais4.js et francais6.js — rien n’est importé de la 2e année pour éviter les collisions d’ids.)
import { makeRng } from '../../util.js';
import { MEQ } from '../meq-liste.js';

export const FR = 'fr-CA';
const FIXED = new Set();                                    // textes fixes (pour allSay → enregistrement ElevenLabs)
export const fx = (text) => { FIXED.add(text); return { text, lang: FR }; };   // texte fixe (banque, consigne)
export const sy = (text) => ({ text, lang: FR });           // texte généré (lu par la voix de l’appareil)
export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
export const BL = '___';
export const blankSay = (s) => s.replace(/_{3}/g, '…');
const lab = (o) => `${o.text ?? ''}|${o.emoji ?? ''}`;
export const opt = (x) => (typeof x === 'object' ? x : { text: x });

/* ---------------------------- fabriques de questions ---------------------------- */
// ch(key, prompt, right, wrongs, { n = 3, say, stimulus, cols, fixedOrder, tip })
export function ch(key, prompt, right, wrongs, o = {}) {
  const r = opt(right), seen = new Set([lab(r)]), ws = [];
  for (const w of wrongs) { const x = opt(w); if (!seen.has(lab(x))) { seen.add(lab(x)); ws.push(x); } }
  const n = o.n ?? 3;
  const q = { type: 'choice', key, prompt, say: o.say === undefined ? fx(prompt) : o.say, options: [r, ...ws.slice(0, n - 1)], answer: 0 };
  if (!q.say) delete q.say;
  if (o.stimulus) q.stimulus = typeof o.stimulus === 'string' ? { text: o.stimulus } : o.stimulus;
  if (o.cols) q.cols = o.cols;
  if (o.fixedOrder) q.fixedOrder = true;
  if (o.tip) q.tip = o.tip;
  return q;
}
// tri : items = [{ text, bin }]
export const srt = (key, prompt, bins, items, tip, o = {}) => ({ type: 'sort', key, prompt, say: o.say ?? fx(prompt), bins: bins.map(opt), items, tip, ...(o.stimulus ? { stimulus: o.stimulus } : {}) });
// tuiles dans le BON ordre
export const ord = (key, prompt, tiles, o = {}) => ({ type: 'order', key, prompt, say: o.say ?? fx(prompt), tiles, joiner: o.joiner ?? ' ', ...(o.extra ? { extra: o.extra } : {}), ...(o.stimulus ? { stimulus: typeof o.stimulus === 'string' ? { text: o.stimulus } : o.stimulus } : {}), tip: o.tip });
// écrit à la main
export const hand = (o) => ({ type: 'hand', lang: 'fr', ...o });
export const ans = (key, prompt, text, answerKey, tip, lines = 2) => hand({ key, mode: 'answer', prompt, say: fx(prompt), stimulus: { text }, answerKey, lines, tip });
export const dict = (key, sentence, tip, prompt = 'Écoute et écris la phrase.') => hand({ key, mode: 'dictation', prompt, say: fx(sentence), expected: sentence, lines: sentence.length > 34 ? 2 : 1, tip });
export const dictWord = (key, word, tip, prompt = 'Écoute le mot et écris-le.') => hand({ key, mode: 'dictation', prompt, say: fx(word), expected: word, lines: 1, tip });
export const sentence = (key, prompt, o) => hand({ key, mode: 'sentence', prompt, say: fx(prompt), lines: 2, ...o });
export const compo = (key, prompt, o) => hand({ key, mode: 'composition', prompt, say: o.say ?? sy(prompt), lines: 6, ...o });

// table { 1: [gen, …], 2: […], 3: […] } — répéter un générateur dans la liste = lui donner plus de poids
export const run = (t) => (level, R) => R.pick(t[level] || t[2])(R, level);

function collectFixed(u) {
  const out = new Map();
  const take = (s) => { if (s && typeof s.text === 'string' && FIXED.has(s.text)) out.set(s.text, { text: s.text, lang: FR }); };
  for (const level of [1, 2, 3]) {
    const R = makeRng(4242 + level);
    for (let i = 0; i < 1500; i++) {
      const qs = u.session && i % 4 === 0 ? u.session(level, R) : [u.generate(level, R)];
      for (const q of qs) { take(q.say); for (const o of q.options || []) take(o.say); for (const it of q.items || []) take(it.say); }
    }
  }
  return [...out.values()];
}
const PF = 'PFEQ 2e cycle, 3e année';
// unit(id, icon, fr, en, pfeq, table, extra) — pfeq reçoit automatiquement « (PFEQ 2e cycle, 3e année) »
export const unit = (id, icon, fr, en, pfeq, table, extra = {}) => ({
  id, icon, title: { fr, en }, pfeq: `${pfeq} (${PF})`, generate: run(table), allSay() { return collectFixed(this); }, ...extra,
});

/* ------------------------------- données communes ------------------------------- */
export const NF = ['Léa', 'Emma', 'Zoé', 'Chloé', 'Alice', 'Rosalie', 'Maya', 'Florence', 'Juliette', 'Camille', 'Mia', 'Laurence', 'Béatrice', 'Charlotte'];
export const NM = ['Léo', 'Noah', 'Félix', 'Thomas', 'William', 'Liam', 'Jacob', 'Samuel', 'Nathan', 'Émile', 'Arthur', 'Louis', 'Édouard', 'Olivier'];
export const CITIES = ['Québec', 'Montréal', 'Laval', 'Gatineau', 'Sherbrooke', 'Rimouski', 'Trois-Rivières', 'Saguenay', 'Longueuil', 'Granby'];

/* ------------------------- liste orthographique du MEQ ------------------------- */
export const G3 = MEQ.g3;
export const G3W = [...new Set(G3.map((x) => x.w))];
const KNOWN = new Set();
for (const g of ['g1', 'g2', 'g3']) for (const x of MEQ[g]) {
  KNOWN.add(x.w.toLowerCase());
  for (const f of x.f || []) KNOWN.add(String(f).toLowerCase());
  if (x.alt) KNOWN.add(x.alt.toLowerCase());
}
export const addKnown = (...ws) => ws.flat().forEach((w) => KNOWN.add(w.toLowerCase()));
addKnown('sait', 'sais', 'c’est', 'ces', 'ses', 'ce', 'se', 'leur', 'leurs', 'peu', 'peut', 'peux', 'sans', 'sang', 'cent', 'mai', 'mais', 'mes', 'met', 'mets', 'fois', 'foie', 'foi',
  'vert', 'vers', 'verre', 'ver', 'mer', 'mère', 'maire', 'cou', 'coup', 'coût', 'pain', 'pin', 'peint', 'sel', 'selle', 'celle', 'cour', 'court', 'cours', 'course', 'chant', 'champ',
  'son', 'sont', 'on', 'ont', 'ou', 'où', 'a', 'à', 'et', 'est', 'dont', 'don', 'dans', 'dent', 'tant', 'temps', 'tend', 'taon', 'pois', 'poids', 'poil', 'poêle', 'bas', 'bat', 'bât',
  'dos', 'do', 'mur', 'mûr', 'mûre', 'sur', 'sûr', 'fin', 'faim', 'feint', 'or', 'hors', 'lait', 'laid', 'les', 'haut', 'eau', 'oh', 'pot', 'peau', 'mot', 'maux', 'veau', 'vaut', 'vos');
export const isReal = (w) => KNOWN.has(String(w).toLowerCase());

// Fautes « sosies » d’un mot (se prononcent pareil ou presque; jamais un vrai mot connu).
const SUBS = [[/ge$/, 'je'], [/^c(?=[aouô])/, 'k'], [/^c(?=[aouô])/, 'qu'], [/^qu/, 'k'], [/que$/, 'k'], [/que$/, 'c'], [/tte$/, 'te'],
  [/([^t])te$/, '$1tte'], [/([aeiouéè])s([aeiouéè])/, '$1z$2'], [/m(?=[pb])/, 'n'], [/an/, 'en'], [/en/, 'an'], [/eau/, 'o'], [/au/, 'o'], [/é/, 'è'], [/é/, 'e'],
  [/è/, 'ai'], [/ai/, 'è'], [/ê/, 'è'], [/ê/, 'e'], [/â/, 'a'], [/ô/, 'o'], [/î/, 'i'], [/([bcdfglmnprst])\1/, '$1'], [/([aeiou])([lmnprt])([aeiouéè])/, '$1$2$2$3'], [/[dtsx]$/, ''], [/d$/, 't'], [/t$/, 'd'], [/s$/, 'x'],
  [/ph/, 'f'], [/ain/, 'in'], [/ein/, 'in'], [/in(?![aeiouy])/, 'ain'], [/oi/, 'oa'], [/gn/, 'ni'], [/ill/, 'y'], [/ç/, 'ss'], [/^h/, ''], [/ss/, 's'], [/c(?=[eiy])/, 's'], [/o(?![iun])/, 'au'],
  [/qu/, 'k'], [/eu/, 'e'], [/eur$/, 'eure'], [/ou/, 'oo'], [/g(?=[ei])/, 'j'], [/x$/, 's'], [/ille$/, 'ie']];
export const fakesOf = (w) => [...new Set(SUBS.map(([re, r]) => w.replace(re, r)))].filter((x) => x !== w && x.length >= 2 && !isReal(x));
