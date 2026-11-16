// Petit Hibou — Français 2e année : unités ciblées, une notion par unité (f80 → f119).
// Suit la « Progression des apprentissages au primaire – Français, langue d’enseignement » (MEQ), 1er cycle, 2e année :
// grammaire de la phrase et du groupe du nom, conjugaison au présent, homophones, vocabulaire, stratégies de lecture.
// Facile = reconnaître ; Moyen = choisir / transformer ; Difficile = fin de 2e – début de 3e (phrases longues, écrire à la main).
// Chaque question porte un `tip` : une explication courte et gentille (champ facultatif, ignoré si l’interface ne l’affiche pas).
// Textes, phrases et poèmes : originaux. Français du Québec (déjeuner / dîner / souper, tuque, mitaines, dépanneur…).
import { makeRng } from '../util.js';
import { g1, g2 } from './meq-liste.js';

const FR = 'fr-CA';
const FIXED = new Set();                                   // textes fixes (pour allSay → enregistrement ElevenLabs)
const fx = (text) => { FIXED.add(text); return { text, lang: FR }; };
const sy = (text) => ({ text, lang: FR });                // phrase générée (lue par la voix de l’appareil)
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const lab = (o) => `${o.text ?? ''}|${o.emoji ?? ''}`;
const opt = (x) => (typeof x === 'object' ? x : { text: x });
const BL = '___';
const blankSay = (s) => s.replace(/_{3}/g, '…');

/* ---------------------------- fabriques de questions ---------------------------- */
function ch(key, prompt, right, wrongs, o = {}) {
  const r = opt(right), seen = new Set([lab(r)]), ws = [];
  for (const w of wrongs) { const x = opt(w); if (!seen.has(lab(x))) { seen.add(lab(x)); ws.push(x); } }
  const n = o.n ?? 3;
  const q = { type: 'choice', key, prompt, say: o.say ?? fx(prompt), options: [r, ...ws.slice(0, n - 1)], answer: 0 };
  if (o.stimulus) q.stimulus = o.stimulus;
  if (o.cols) q.cols = o.cols;
  if (o.fixedOrder) q.fixedOrder = true;
  if (o.tip) q.tip = o.tip;
  return q;
}
const srt = (key, prompt, bins, items, tip) => ({ type: 'sort', key, prompt, say: fx(prompt), bins: bins.map(opt), items, tip });
const ord = (key, prompt, tiles, o = {}) => ({ type: 'order', key, prompt, say: o.say ?? fx(prompt), tiles, joiner: o.joiner ?? ' ', ...(o.extra ? { extra: o.extra } : {}), ...(o.stimulus ? { stimulus: o.stimulus } : {}), tip: o.tip });
const hd = (key, prompt, text, answerKey, tip, lines = 1) => ({ type: 'hand', key, lang: 'fr', mode: 'answer', prompt, say: fx(prompt), stimulus: { text }, answerKey, lines, tip });
const dict = (key, sentence, tip) => ({ type: 'hand', key, lang: 'fr', mode: 'dictation', prompt: 'Écris la phrase que tu entends.', say: fx(sentence), expected: sentence, lines: 2, tip });

// table { 1: [gen, …], 2: […], 3: […] } — répéter un générateur dans la liste = lui donner plus de poids
const run = (t) => (level, R) => R.pick(t[level])(R, level);

function collectFixed(u) {
  const out = new Map();
  const take = (s) => { if (s && typeof s.text === 'string' && FIXED.has(s.text)) out.set(s.text, { text: s.text, lang: FR }); };
  for (const level of [1, 2, 3]) {
    const R = makeRng(4242 + level);
    for (let i = 0; i < 1200; i++) {
      const qs = u.session && i % 4 === 0 ? u.session(level, R) : [u.generate(level, R)];
      for (const q of qs) { take(q.say); for (const o of q.options || []) take(o.say); for (const it of q.items || []) take(it.say); }
    }
  }
  return [...out.values()];
}
const unit = (id, icon, fr, en, pfeq, table, extra = {}) => ({
  id, icon, title: { fr, en }, pfeq, generate: run(table), allSay() { return collectFixed(this); }, ...extra,
});

/* ------------------------------- données communes ------------------------------- */
const NF = ['Léa', 'Emma', 'Zoé', 'Chloé', 'Alice', 'Rosalie', 'Maya', 'Florence', 'Juliette', 'Camille', 'Mia', 'Laurence', 'Béatrice', 'Charlotte'];
const NM = ['Léo', 'Noah', 'Félix', 'Thomas', 'William', 'Liam', 'Jacob', 'Samuel', 'Nathan', 'Émile', 'Arthur', 'Louis', 'Édouard', 'Olivier'];
const CITIES = ['Québec', 'Montréal', 'Laval', 'Gatineau', 'Sherbrooke', 'Rimouski', 'Trois-Rivières', 'Saguenay', 'Longueuil', 'Granby'];
const PETS = ['Pompon', 'Biscuit', 'Caramel', 'Moka', 'Flocon', 'Réglisse', 'Noisette', 'Patate'];
const H_ASP = new Set(['hibou', 'hockey', 'hamac', 'héron', 'homard', 'haricot']);
const VOW = (w) => /^[aeiouyéèêâîôœh]/i.test(w) && !H_ASP.has(w.split(' ')[0].toLowerCase());

// [singulier, genre, pluriel, emoji]
const NOUNS = [
  ['chat', 'm', 'chats', '🐱'], ['chien', 'm', 'chiens', '🐶'], ['ballon', 'm', 'ballons', '⚽'], ['livre', 'm', 'livres', '📖'],
  ['vélo', 'm', 'vélos', '🚲'], ['gâteau', 'm', 'gâteaux', '🎂'], ['chapeau', 'm', 'chapeaux', '🎩'], ['oiseau', 'm', 'oiseaux', '🐦'],
  ['bateau', 'm', 'bateaux', '⛵'], ['camion', 'm', 'camions', '🚚'], ['arbre', 'm', 'arbres', '🌳'], ['crayon', 'm', 'crayons', '✏️'],
  ['lapin', 'm', 'lapins', '🐰'], ['cheval', 'm', 'chevaux', '🐴'], ['château', 'm', 'châteaux', '🏰'], ['cadeau', 'm', 'cadeaux', '🎁'],
  ['manteau', 'm', 'manteaux', '🧥'], ['hibou', 'm', 'hiboux', '🦉'], ['ours', 'm', 'ours', '🐻'], ['poisson', 'm', 'poissons', '🐟'],
  ['train', 'm', 'trains', '🚂'], ['avion', 'm', 'avions', '✈️'], ['sapin', 'm', 'sapins', '🌲'], ['nuage', 'm', 'nuages', '☁️'],
  ['œuf', 'm', 'œufs', '🥚'], ['lit', 'm', 'lits', '🛏️'], ['ordinateur', 'm', 'ordinateurs', '💻'], ['éléphant', 'm', 'éléphants', '🐘'],
  ['écureuil', 'm', 'écureuils', '🐿️'], ['jeu', 'm', 'jeux', '🎲'], ['soleil', 'm', 'soleils', '☀️'], ['bonbon', 'm', 'bonbons', '🍬'],
  ['maison', 'f', 'maisons', '🏠'], ['pomme', 'f', 'pommes', '🍎'], ['fleur', 'f', 'fleurs', '🌸'], ['souris', 'f', 'souris', '🐭'],
  ['tortue', 'f', 'tortues', '🐢'], ['voiture', 'f', 'voitures', '🚗'], ['étoile', 'f', 'étoiles', '⭐'], ['banane', 'f', 'bananes', '🍌'],
  ['fourmi', 'f', 'fourmis', '🐜'], ['poule', 'f', 'poules', '🐔'], ['vache', 'f', 'vaches', '🐮'], ['abeille', 'f', 'abeilles', '🐝'],
  ['robe', 'f', 'robes', '👗'], ['lune', 'f', 'lunes', '🌙'], ['chaise', 'f', 'chaises', '🪑'], ['clé', 'f', 'clés', '🔑'],
  ['carotte', 'f', 'carottes', '🥕'], ['fraise', 'f', 'fraises', '🍓'], ['tasse', 'f', 'tasses', '☕'], ['guitare', 'f', 'guitares', '🎸'],
  ['baleine', 'f', 'baleines', '🐳'], ['grenouille', 'f', 'grenouilles', '🐸'], ['mitaine', 'f', 'mitaines', '🧤'], ['orange', 'f', 'oranges', '🍊'],
  ['école', 'f', 'écoles', '🏫'], ['araignée', 'f', 'araignées', '🕷️'], ['girafe', 'f', 'girafes', '🦒'], ['poire', 'f', 'poires', '🍐'],
  ['montagne', 'f', 'montagnes', '⛰️'], ['horloge', 'f', 'horloges', '🕰️'], ['île', 'f', 'îles', '🏝️'], ['auto', 'f', 'autos', '🚙'],
].map(([s, g, p, e]) => ({ s, g, p, e }));
const NOUN = Object.fromEntries(NOUNS.map((n) => [n.s, n]));

// adjectifs : [masc, fém, masc. pluriel, place a = avant le nom / p = après]
const ADJS = [
  ['petit', 'petite', 'petits', 'a'], ['grand', 'grande', 'grands', 'a'], ['gros', 'grosse', 'gros', 'a'], ['joli', 'jolie', 'jolis', 'a'],
  ['beau', 'belle', 'beaux', 'a'], ['nouveau', 'nouvelle', 'nouveaux', 'a'], ['gentil', 'gentille', 'gentils', 'a'], ['bon', 'bonne', 'bons', 'a'],
  ['noir', 'noire', 'noirs', 'p'], ['blanc', 'blanche', 'blancs', 'p'], ['vert', 'verte', 'verts', 'p'], ['bleu', 'bleue', 'bleus', 'p'],
  ['rouge', 'rouge', 'rouges', 'p'], ['rond', 'ronde', 'ronds', 'p'], ['jaune', 'jaune', 'jaunes', 'p'], ['gris', 'grise', 'gris', 'p'],
  ['brun', 'brune', 'bruns', 'p'], ['lourd', 'lourde', 'lourds', 'p'], ['léger', 'légère', 'légers', 'p'], ['doux', 'douce', 'doux', 'p'],
  ['curieux', 'curieuse', 'curieux', 'p'], ['joyeux', 'joyeuse', 'joyeux', 'p'], ['peureux', 'peureuse', 'peureux', 'p'], ['chaud', 'chaude', 'chauds', 'p'],
].map(([m, f, mp, pos]) => ({ m, f, mp, fp: f + 's', pos }));
const adjForm = (a, g, pl) => (g === 'f' ? (pl ? a.fp : a.f) : pl ? a.mp : a.m);
// le / la / l’ ; un / une ; les / des
const defArt = (g, next, pl) => (pl ? 'les' : VOW(next) ? 'l’' : g === 'f' ? 'la' : 'le');
const indArt = (g, pl) => (pl ? 'des' : g === 'f' ? 'une' : 'un');
const glue = (d, w) => (d.endsWith('’') ? d + w : `${d} ${w}`);
// groupe du nom défini : déterminant + (adj) + nom + (adj)
function gn(n, a, pl = false) {
  const noun = pl ? n.p : n.s;
  if (!a) return glue(defArt(n.g, noun, pl), noun);
  const af = adjForm(a, n.g, pl);
  if (a.pos === 'a') return glue(defArt(n.g, af, pl), `${af} ${noun}`);
  return glue(defArt(n.g, noun, pl), `${noun} ${af}`);
}
// nom + adjectif qui vont bien ensemble (évite « bel / nouvel » et les paires bizarres)
const ANIMALS = new Set(['chat', 'chien', 'oiseau', 'lapin', 'cheval', 'hibou', 'ours', 'poisson', 'éléphant', 'écureuil', 'souris', 'tortue', 'fourmi', 'poule', 'vache', 'abeille', 'baleine', 'grenouille', 'araignée', 'girafe']);
const FOOD = new Set(['gâteau', 'pomme', 'fraise', 'banane', 'poire', 'orange', 'bonbon', 'carotte', 'œuf']);
function okPair(n, a) {
  if (a.pos === 'a' && VOW(n.s) && (a.m === 'beau' || a.m === 'nouveau')) return false;
  if (a.m === 'bon') return FOOD.has(n.s) || ['livre', 'jeu'].includes(n.s);
  if (['curieux', 'joyeux', 'peureux', 'gentil'].includes(a.m)) return ANIMALS.has(n.s);
  if (a.m === 'chaud') return ['manteau', 'soleil', 'gâteau', 'mitaine', 'tasse', 'lit'].includes(n.s);
  if (['soleil', 'lune', 'étoile', 'nuage', 'montagne', 'île', 'école'].includes(n.s)) return ['petit', 'grand', 'gros', 'joli', 'beau', 'blanc', 'gris', 'jaune', 'rond', 'nouveau'].includes(a.m);
  return true;
}
const pairs = NOUNS.flatMap((n) => ADJS.filter((a) => okPair(n, a)).map((a) => [n, a]));

/* ------------------------------- conjugaison ------------------------------- */
const PRON = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'];
const PIDX = { je: 0, tu: 1, il: 2, elle: 2, on: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
const IRR = {
  être: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
  avoir: ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
  aller: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'],
  faire: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'],
  dire: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'],
  prendre: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'],
  vouloir: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'],
  pouvoir: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'],
  venir: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'],
  voir: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'],
  finir: ['finis', 'finis', 'finit', 'finissons', 'finissez', 'finissent'],
  lire: ['lis', 'lis', 'lit', 'lisons', 'lisez', 'lisent'],
  écrire: ['écris', 'écris', 'écrit', 'écrivons', 'écrivez', 'écrivent'],
  mettre: ['mets', 'mets', 'met', 'mettons', 'mettez', 'mettent'],
  dormir: ['dors', 'dors', 'dort', 'dormons', 'dormez', 'dorment'],
  boire: ['bois', 'bois', 'boit', 'buvons', 'buvez', 'boivent'],
  courir: ['cours', 'cours', 'court', 'courons', 'courez', 'courent'],
  partir: ['pars', 'pars', 'part', 'partons', 'partez', 'partent'],
};
const ER_END = ['e', 'es', 'e', 'ons', 'ez', 'ent'];
function conj(inf, i) {
  if (IRR[inf]) return IRR[inf][i];
  const st = inf.slice(0, -2);
  if (i === 3 && st.endsWith('g')) return st + 'eons';
  return st + ER_END[i];
}
const withP = (p, form) => (p === 'je' && VOW(form) ? `j’${form}` : `${p} ${form}`);
// compléments naturels par verbe (invariables : jamais d’accord avec le sujet)
const COMP = {
  aimer: ['les pommes', 'la neige', 'le chocolat', 'les chats', 'la musique', 'les histoires'],
  jouer: ['au ballon', 'aux cartes', 'dans la neige', 'avec le chien', 'au hockey', 'dehors'],
  manger: ['une pomme', 'des crêpes', 'une soupe', 'du fromage', 'des bleuets'],
  parler: ['à voix basse', 'très fort', 'au téléphone', 'avec la voisine'],
  chanter: ['une chanson', 'très fort', 'dans la chorale', 'sous la douche'],
  danser: ['dans le salon', 'avec grand-papa', 'sur la musique'],
  regarder: ['les étoiles', 'un film', 'par la fenêtre', 'les oiseaux'],
  écouter: ['une histoire', 'la musique', 'l’enseignante', 'la pluie'],
  marcher: ['jusqu’à l’école', 'dans la forêt', 'très vite', 'sur le trottoir'],
  dessiner: ['un dragon', 'une maison', 'des fleurs', 'un arc-en-ciel'],
  nager: ['dans le lac', 'à la piscine', 'comme un poisson'],
  arriver: ['à l’école', 'en retard', 'à la maison', 'au chalet'],
  chercher: ['les mitaines', 'le chat', 'un crayon', 'la tuque bleue'],
  donner: ['un cadeau', 'du pain aux canards', 'un câlin', 'des bonbons'],
  patiner: ['sur le lac', 'à l’aréna', 'dans la cour'],
  glisser: ['sur la butte', 'en traîneau', 'sur la glace'],
  habiter: ['à Québec', 'près du parc', 'dans une grande maison'],
  ramasser: ['les feuilles', 'les jouets', 'des coquillages', 'des cocottes'],
  laver: ['la vaisselle', 'le chien', 'la voiture'],
  porter: ['une tuque', 'des bottes', 'un gros sac'],
  fermer: ['la porte', 'la fenêtre', 'le livre'],
  sauter: ['à la corde', 'dans les flaques', 'très haut'],
  être: ['à l’école', 'dans la cour', 'en retard', 'au parc', 'chez grand-maman', 'dans la cuisine'],
  avoir: ['un chien', 'faim', 'froid', 'sept ans', 'une nouvelle tuque', 'de la chance'],
  aller: ['à l’école', 'au parc', 'à la piscine', 'chez le dentiste', 'au dépanneur', 'à la cabane à sucre'],
  faire: ['un casse-tête', 'du vélo', 'un bonhomme de neige', 'un gâteau', 'la vaisselle', 'du ski'],
  dire: ['bonjour', 'merci', 'la vérité', 'une blague', 'bonne nuit'],
  prendre: ['l’autobus', 'une collation', 'une photo', 'le train', 'un bain'],
  vouloir: ['un chiot', 'jouer dehors', 'des crêpes', 'aller au parc', 'une collation'],
  pouvoir: ['venir jouer', 'nager sans aide', 'lire ce livre', 'aider papa', 'patiner vite'],
  venir: ['chez moi', 'à la fête', 'de l’école'],
  voir: ['un arc-en-ciel', 'un chevreuil', 'la mer'],
  finir: ['le dessin', 'les devoirs', 'la soupe'],
  lire: ['un livre', 'une bande dessinée', 'une affiche'],
  écrire: ['une lettre', 'une histoire', 'un poème'],
  mettre: ['des bottes', 'la table', 'une tuque'],
  dormir: ['dans la chambre', 'sous la tente', 'très tard'],
  boire: ['un verre de lait', 'du jus', 'de l’eau'],
  courir: ['dans la cour', 'très vite', 'après le ballon'],
  partir: ['en voyage', 'à l’école', 'au chalet'],
};
const ER = ['aimer', 'jouer', 'manger', 'parler', 'chanter', 'danser', 'regarder', 'écouter', 'marcher', 'dessiner', 'nager', 'arriver', 'chercher', 'donner', 'patiner', 'glisser', 'habiter', 'ramasser', 'laver', 'porter', 'fermer', 'sauter'];
// sujets groupes du nom → pronom
const SUBJ = [
  ['Le chat', 'il'], ['Mon frère', 'il'], ['Grand-papa', 'il'], ['Le chien de Félix', 'il'], ['Mon ami Noah', 'il'], ['Le petit garçon', 'il'],
  ['L’enseignante', 'elle'], ['Ma sœur', 'elle'], ['Grand-maman', 'elle'], ['Ma cousine Zoé', 'elle'], ['La petite fille', 'elle'], ['Mon amie Alice', 'elle'],
  ['Les enfants', 'ils'], ['Les oiseaux', 'ils'], ['Mes cousins', 'ils'], ['Léo et Mia', 'ils'], ['Papa et maman', 'ils'], ['Les élèves', 'ils'],
  ['Mes amies', 'elles'], ['Les filles', 'elles'], ['Zoé et Léa', 'elles'], ['Les poules', 'elles'], ['Mes tantes', 'elles'], ['Rosalie et Emma', 'elles'],
].map(([t, p]) => ({ t, p }));
// sujets « humains » seulement (pour les verbes qui ne vont pas avec un animal)
const HUMAN = SUBJ.filter((s) => !/chat|chien|oiseaux|poules/.test(s.t));

/* ------------------------------- phrases simples ------------------------------- */
const low = (S) => (/^(L’|(Le|La|Les|Mon|Ma|Mes|Grand|Toi|Ta)(?=[\s-]))/.test(S) ? S[0].toLowerCase() + S.slice(1) : S);
const deN = (N) => (VOW(N) ? `d’${N}` : `de ${N}`);
const NO_INDEF = (c) => !/^(un|une|des|du|de l’|de la) /.test(c);
// { S: sujet, p: pronom, inf, form, comp, text }
function simple(R, o = {}) {
  const kind = o.kind ?? R.pick(['name', 'gn', 'gn']);
  let S, p;
  if (kind === 'name') { const f = R.chance(0.5); S = R.pick(f ? NF : NM); p = f ? 'elle' : 'il'; }
  else if (kind === 'pron') { p = R.pick(o.prons ?? PRON); S = p; }
  else { const s = R.pick(o.pool ?? HUMAN); S = s.t; p = s.p; }
  const inf = o.inf ?? R.pick(o.verbs ?? ER);
  let comps = COMP[inf];
  if (o.noIndef) comps = comps.filter(NO_INDEF);
  const comp = R.pick(comps);
  const form = conj(inf, PIDX[p]);
  const head = kind === 'pron' ? withP(p, form) : `${S} ${form}`;
  return { S, p, inf, form, comp, kind, text: `${cap(head)} ${comp}.` };
}

/* ================================================================== */
/*  f80 — Nom commun ou nom propre                                    */
/* ================================================================== */
const PROPRES = [...NF, ...NM, ...CITIES, ...PETS, 'Canada', 'Noël', 'Saint-Laurent'];
const COMMUNS = [...NOUNS.map((n) => n.s), 'ville', 'rivière', 'pays', 'garçon', 'fille', 'enseignante', 'voisin', 'tuque', 'neige', 'fête'];
const NOT_NOUNS = ['mange', 'joli', 'court', 'petit', 'chante', 'bleu', 'vite', 'dort', 'grande', 'saute', 'doux', 'joue', 'rouge', 'lentement'];
const T80 = 'Un nom propre nomme une personne, un animal ou un lieu précis. Il commence toujours par une majuscule.';
const f80Sent = (R) => {
  const f = R.chance(0.5), N = R.pick(f ? NF : NM);
  const n = R.pick(NOUNS.filter((x) => !VOW(x.s)));
  return R.pick([
    () => ({ s: `${N} regarde ${gn(n)}.`, prop: N, com: n.s, verb: 'regarde' }),
    () => ({ s: `${N} dessine ${gn(n)}.`, prop: N, com: n.s, verb: 'dessine' }),
    () => ({ s: `Le ${R.pick(['chien', 'chat', 'lapin'])} ${deN(N)} dort.`, prop: N, com: null, verb: 'dort' }),
    () => ({ s: `${cap(gn(n))} est à ${N}.`, prop: N, com: n.s, verb: 'est' }),
    () => { const c = R.pick(CITIES); return { s: `Nous visitons la ville de ${c}.`, prop: c, com: 'ville', verb: 'visitons' }; },
    () => { const p = R.pick(PETS); return { s: `Mon chat s’appelle ${p}.`, prop: p, com: 'chat', verb: 'appelle' }; },
    () => { const c = R.pick(CITIES); return { s: `Ma tante habite à ${c}.`, prop: c, com: 'tante', verb: 'habite' }; },
  ])();
};
const f80 = unit('f80', '🏷️', 'Nom commun ou nom propre', 'Common or proper noun',
  'Grammaire — le nom : nom commun et nom propre (majuscule) (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const w = R.chance(0.5) ? R.pick(PROPRES) : R.pick(COMMUNS); const pr = PROPRES.includes(w);
        return ch(`f80-a-${w}`, 'Ce mot est-il un nom propre ou un nom commun?', pr ? 'un nom propre' : 'un nom commun', [pr ? 'un nom commun' : 'un nom propre'], { stimulus: { text: w }, fixedOrder: true, tip: T80 }); },
      (R) => { const r = R.pick(PROPRES), w = R.sample(COMMUNS, 2);
        return ch(`f80-b-${r}-${w.join()}`, 'Quel mot est un nom propre?', r, w, { tip: T80 }); },
      (R) => { const r = R.pick(COMMUNS), w = R.sample(PROPRES, 2);
        return ch(`f80-c-${r}-${w.join()}`, 'Quel mot est un nom commun?', r, w, { tip: 'Un nom commun nomme une chose, un animal ou une personne en général. On peut mettre « un » ou « une » devant.' }); },
      (R) => { const p = R.sample(PROPRES, 3), c = R.sample(COMMUNS, 3);
        return srt(`f80-s-${[...p, ...c].sort().join()}`, 'Classe les mots.', ['Nom propre', 'Nom commun'], R.shuffle([...p.map((text) => ({ text, bin: 0 })), ...c.map((text) => ({ text, bin: 1 }))]), T80); },
    ],
    2: [
      (R) => { const x = f80Sent(R); const others = x.s.replace(/[.]/g, '').split(' ').filter((w) => w !== x.prop && w.length > 2 && !x.prop.includes(w) && !w.includes(x.prop));
        return ch(`f80-d-${x.s}`, 'Trouve le nom propre dans la phrase.', x.prop, R.sample(others, 2), { stimulus: { text: x.s }, tip: T80 }); },
      (R) => { let x; do x = f80Sent(R); while (!x.com);
        return ch(`f80-e-${x.s}`, 'Trouve le nom commun dans la phrase.', x.com, [x.prop, x.verb], { stimulus: { text: x.s }, tip: 'Le nom commun est souvent juste après un déterminant (le, la, un, une…).' }); },
      (R) => { const f = R.chance(0.5), N = R.pick(f ? NF : NM), c = R.pick(CITIES), lowN = N.toLowerCase(), lowC = c.toLowerCase();
        const which = R.chance(0.5);
        const s = which ? `Mon ami ${lowN} joue au parc.` : `L’été, nous allons à ${lowC}.`;
        return ch(`f80-f-${s}`, 'Quel mot devrait commencer par une majuscule?', which ? lowN : lowC, which ? ['ami', 'parc'] : ['été', 'nous'], { stimulus: { text: s }, tip: 'Les prénoms et les noms de villes prennent toujours une majuscule.' }); },
    ],
    3: [
      (R) => { const p = R.sample(PROPRES, 2), c = R.sample(COMMUNS, 2), x = R.sample(NOT_NOUNS, 2);
        return srt(`f80-g-${[...p, ...c, ...x].sort().join()}`, 'Classe les mots.', ['Nom propre', 'Nom commun', 'Pas un nom'], R.shuffle([...p.map((text) => ({ text, bin: 0 })), ...c.map((text) => ({ text, bin: 1 })), ...x.map((text) => ({ text, bin: 2 }))]), 'Un verbe (mange) ou un adjectif (joli) n’est pas un nom.'); },
      (R) => { const N = R.pick([...NF, ...NM]), c = R.pick(CITIES), m = R.pick(['Hier', 'Samedi', 'Demain']);
        const good = `${m}, ${N} ${m === 'Demain' ? 'ira' : 'est allé' + (NF.includes(N) ? 'e' : '')} à ${c}.`;
        return hd(`f80-h-${good}`, 'Recopie la phrase avec les bonnes majuscules.', good.charAt(0).toLowerCase() + good.slice(1).replace(N, N.toLowerCase()).replace(c, c.toLowerCase()), good, 'Majuscule au début de la phrase, au prénom et à la ville.', 2); },
      (R) => { const A = R.pick(NF), B = R.pick(NM), n = R.pick(NOUNS.filter((x) => !VOW(x.s) && x.s !== 'souris' && x.s !== 'ours'));
        const t = R.pick([[`${A} donne ${gn(n)} à ${B}.`, 3], [`${A} et ${B} cherchent ${gn(n)}.`, 3], [`${B} regarde ${gn(n)}.`, 2], [`Le chien ${deN(A)} mange ${gn(n)}.`, 3]]);
        return { type: 'keypad', key: `f80-i-${t[0]}`, prompt: 'Combien de noms (communs et propres) dans la phrase?', say: fx('Combien de noms (communs et propres) dans la phrase?'), stimulus: { text: t[0] }, answer: t[1], tip: 'Compte les prénoms et les mots qui ont un déterminant devant.' }; },
      (R) => { const x = R.pick(NOT_NOUNS), w = [...R.sample(PROPRES, 1), ...R.sample(COMMUNS, 2)];
        return ch(`f80-j-${x}-${w.join()}`, 'Quel mot n’est pas un nom?', x, w, { n: 4, tip: 'Essaie « un » ou « une » devant : « un mange », ça ne marche pas!' }); },
    ],
  });

/* ================================================================== */
/*  f81 — Le déterminant                                              */
/* ================================================================== */
const T81 = 'Le déterminant est le petit mot devant le nom. Il montre si le nom est masculin ou féminin, singulier ou pluriel.';
const NOVAR = (n) => n.s !== n.p;           // pluriel différent du singulier
const DEM = (n, pl) => (pl ? 'ces' : n.g === 'f' ? 'cette' : VOW(n.s) ? 'cet' : 'ce');
const POS = { je: ['mon', 'ma', 'mes'], tu: ['ton', 'ta', 'tes'], il: ['son', 'sa', 'ses'] };
const posDet = (who, n, pl) => (pl ? POS[who][2] : n.g === 'm' || VOW(n.s) ? POS[who][0] : POS[who][1]);
const f81 = unit('f81', '🔤', 'Le déterminant', 'Determiners',
  'Grammaire — le déterminant (un, une, le, la, l’, les, des, mon, ton, son, ce, cet, cette, ces) (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const n = R.pick(NOUNS.filter((x) => x.e)); const r = `${indArt(n.g)} ${n.s}`, w = `${indArt(n.g === 'f' ? 'm' : 'f')} ${n.s}`;
        return ch(`f81-a-${n.s}`, 'Choisis le bon déterminant : un ou une?', r, [w], { stimulus: { emoji: n.e }, tip: 'On dit « un » devant un nom masculin et « une » devant un nom féminin.' }); },
      (R) => { const n = R.pick(NOUNS.filter((x) => x.e && !VOW(x.s))); const r = `${n.g === 'f' ? 'la' : 'le'} ${n.s}`, w = `${n.g === 'f' ? 'le' : 'la'} ${n.s}`;
        return ch(`f81-b-${n.s}`, 'Choisis le bon déterminant : le ou la?', r, [w], { stimulus: { emoji: n.e }, tip: '« Le » va avec un nom masculin, « la » avec un nom féminin.' }); },
      (R) => { const n = R.pick(NOUNS.filter(NOVAR)); const pl = R.chance(0.5);
        return ch(`f81-c-${n.s}-${pl}`, 'Un seul ou plusieurs? Choisis le déterminant.', pl ? 'les' : n.g === 'f' ? 'la' : (VOW(n.s) ? 'l’' : 'le'), pl ? [VOW(n.s) ? 'l’' : n.g === 'f' ? 'la' : 'le'] : ['les'], { stimulus: { text: `${BL} ${pl ? n.p : n.s}` }, tip: '« Les » veut dire plusieurs. Le nom au pluriel finit souvent par s ou x.' }); },
    ],
    2: [
      (R) => { const n = R.pick(NOUNS.filter(NOVAR)); const pl = R.chance(0.35), w = pl ? n.p : n.s;
        return ch(`f81-d-${w}`, 'Choisis le bon déterminant.', defArt(n.g, w, pl), ['le', 'la', 'l’', 'les'], { n: 4, cols: 4, stimulus: { text: `${BL} ${w}` }, tip: 'Devant une voyelle ou un h muet, « le » et « la » deviennent « l’ ».' }); },
      (R) => { const n = R.pick(NOUNS.filter(NOVAR)); const pl = R.chance(0.4), w = pl ? n.p : n.s;
        return ch(`f81-e-${w}`, 'Choisis le bon déterminant.', indArt(n.g, pl), ['un', 'une', 'des'], { n: 3, cols: 3, stimulus: { text: `${BL} ${w}` }, tip: '« Un » = masculin, « une » = féminin, « des » = plusieurs.' }); },
      (R) => { const n = R.pick(NOUNS.filter((x) => NOVAR(x) && !(x.g === 'f' && VOW(x.s)))); const pl = R.chance(0.35), w = pl ? n.p : n.s;
        return ch(`f81-f-${w}`, 'C’est à moi! Choisis le bon déterminant.', posDet('je', n, pl), ['mon', 'ma', 'mes'], { cols: 3, stimulus: { text: `${BL} ${w}` }, tip: '« Mon » pour un nom masculin, « ma » pour un nom féminin, « mes » pour plusieurs.' }); },
      (R) => { const n = R.pick(NOUNS.filter((x) => x.e && NOVAR(x))); const k = R.int(2, 6);
        return ch(`f81-g-${n.s}-${k}`, 'Quel groupe de mots va avec l’image?', `des ${n.p}`, [`${indArt(n.g)} ${n.s}`, `${indArt(n.g)} ${n.p}`], { stimulus: { emojis: n.e, count: k }, tip: 'Il y en a plusieurs : on écrit « des » et le nom prend un s ou un x.' }); },
    ],
    3: [
      (R) => { const n = R.pick(NOUNS.filter(NOVAR)); const pl = R.chance(0.3), w = pl ? n.p : n.s;
        return ch(`f81-h-${w}`, 'Choisis : ce, cet, cette ou ces?', DEM(n, pl), ['ce', 'cet', 'cette', 'ces'], { n: 4, cols: 4, stimulus: { text: `${BL} ${w}` }, tip: '« Cet » va devant un nom masculin qui commence par une voyelle : cet arbre, cet oiseau.' }); },
      (R) => { const n = R.pick(NOUNS.filter(NOVAR)); const pl = R.chance(0.35), w = pl ? n.p : n.s;
        const who = R.pick([['tu', 'C’est à toi!'], ['il', R.pick(NM) + ' a…'], ['il', R.pick(NF) + ' a…']]);
        const all = POS[who[0]];
        return ch(`f81-i-${who[1]}-${w}`, 'Choisis le bon déterminant.', posDet(who[0], n, pl), all, { cols: 3, stimulus: { text: `${who[1]}  ${BL} ${w}` }, tip: 'Devant un nom féminin qui commence par une voyelle, on dit « mon, ton, son » : mon école, son orange.' }); },
      (R) => { const n = R.pick(NOUNS.filter((x) => NOVAR(x) && x.s !== 'ours')); const pl = R.chance(0.4);
        const d = R.pick([defArt(n.g, pl ? n.p : n.s, pl), indArt(n.g, pl), posDet(R.pick(['je', 'tu', 'il']), n, pl), DEM(n, pl)]);
        const s = `${cap(glue(d, pl ? n.p : n.s))} ${pl ? 'sont' : 'est'} ${R.pick(['ici', 'là-bas', 'sur la table', 'dehors'])}.`;
        return ch(`f81-j-${s}`, 'Trouve le déterminant dans la phrase.', cap(d.replace('’', '’')), [pl ? n.p : n.s, pl ? 'sont' : 'est'], { stimulus: { text: s }, tip: T81 }); },
      (R) => { const n = R.pick(NOUNS.filter((x) => NOVAR(x) && x.g === 'f' && VOW(x.s)));
        return ch(`f81-k-${n.s}`, 'Quel groupe de mots est bien écrit?', `mon ${n.s}`, [`ma ${n.s}`, `m’${n.s}`], { tip: 'Devant une voyelle, « ma » devient « mon » : mon amie, mon école. C’est plus doux à l’oreille.' }); },
    ],
  });

/* ================================================================== */
/*  f82 — L’adjectif                                                  */
/* ================================================================== */
const T82 = 'L’adjectif décrit le nom : il dit comment est la chose (petit, rouge, doux…).';
const f82Gn = (R) => { const [n, a] = R.pick(pairs); const pl = R.chance(0.3) && NOVAR(n); return { n, a, pl, t: gn(n, a, pl), af: adjForm(a, n.g, pl), nf: pl ? n.p : n.s }; };
const f82 = unit('f82', '🎨', 'L’adjectif', 'Adjectives',
  'Grammaire — l’adjectif : trouver l’adjectif dans le groupe du nom (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const a = R.pick(ADJS), n = R.pick(NOUNS), v = conj(R.pick(ER), 2);
        return ch(`f82-a-${a.m}-${n.s}-${v}`, 'Quel mot est un adjectif?', a.m, [n.s, v], { tip: T82 }); },
      (R) => { const g = f82Gn(R); if (!g.n.e) return null;
        return ch(`f82-b-${g.t}`, 'Quel mot décrit le nom?', g.af, [g.nf, g.t.startsWith('l’') ? 'l’' : g.t.split(' ')[0]], { stimulus: { text: g.t }, tip: T82 }); },
    ].map((f) => (R) => { let q; do q = f(R); while (!q); return q; }),
    2: [
      (R) => { const g = f82Gn(R); const s = `${cap(g.t)} ${g.pl ? 'sont' : 'est'} ${R.pick(['ici', 'là-bas', 'dans la cour', 'sur la table'])}.`;
        return ch(`f82-c-${s}`, 'Trouve l’adjectif dans la phrase.', g.af, [g.nf, g.pl ? 'sont' : 'est'], { stimulus: { text: s }, tip: T82 }); },
      (R) => { const [n, a] = R.pick(pairs.filter(([, x]) => x.pos === 'a' && x.m !== 'bon'));
        const other = R.pick(NOUNS.filter((x) => x.g === n.g && x !== n)), v = conj(R.pick(ER), 2);
        const s = `${cap(glue(defArt(n.g, adjForm(a, n.g), false), BL))} ${n.s} ${R.pick(ANIMALS.has(n.s) ? ['dort', 'mange'] : ['est ici', 'est à moi'])}.`;
        return ch(`f82-d-${s}-${a.m}`, 'Quel mot peut compléter? Choisis l’adjectif.', adjForm(a, n.g), [other.s, v], { stimulus: { text: s }, tip: 'Il faut un mot qui décrit le nom.' }); },
      (R) => { const a = R.sample(ADJS, 1)[0], n = R.sample(NOUNS, 2), v = conj(R.pick(ER), R.pick([2, 5]));
        return ch(`f82-e-${a.f}-${n.map((x) => x.s).join()}-${v}`, 'Quel mot est un adjectif?', a.f, [n[0].s, n[1].p, v], { n: 4, tip: T82 }); },
    ],
    3: [
      (R) => { const as = R.sample(ADJS, 2), ns = R.sample(NOUNS, 2), vs = R.sample(ER, 2).map((v) => conj(v, 2));
        const items = [...ns.map((n) => ({ text: n.s, bin: 0 })), ...as.map((a) => ({ text: a.m, bin: 1 })), ...vs.map((text) => ({ text, bin: 2 }))];
        return srt(`f82-f-${items.map((i) => i.text).sort().join()}`, 'Classe les mots.', ['Nom', 'Adjectif', 'Verbe'], R.shuffle(items), 'Nom : on peut dire « un » devant. Adjectif : il décrit. Verbe : il dit ce qu’on fait.'); },
      (R) => { const n = R.pick(NOUNS.filter(NOVAR)); const A = R.pick(ADJS.filter((x) => x.pos === 'a' && okPair(n, x))), P = R.pick(ADJS.filter((x) => x.pos === 'p' && okPair(n, x)));
        if (!A || !P) return null; const pl = R.chance(0.4);
        const t = `${cap(glue(defArt(n.g, adjForm(A, n.g, pl), pl), `${adjForm(A, n.g, pl)} ${pl ? n.p : n.s} ${adjForm(P, n.g, pl)}`))} ${pl ? 'sont' : 'est'} ${R.pick(['ici', 'là-bas', 'dehors'])}.`;
        const a1 = adjForm(A, n.g, pl), a2 = adjForm(P, n.g, pl), nn = pl ? n.p : n.s;
        return ch(`f82-g-${t}`, 'Trouve les deux adjectifs.', `${a1} et ${a2}`, [`${a1} et ${nn}`, `${nn} et ${a2}`, `${a2} et ${pl ? 'sont' : 'est'}`], { n: 4, stimulus: { text: t }, tip: 'Un adjectif peut être avant le nom et un autre après.' }); },
      (R) => { const n = R.pick(NOUNS.filter((x) => !VOW(x.s)));
        const t = `${indArt(n.g)} ${n.s}`;
        return hd(`f82-h-${n.s}`, 'Écris un adjectif qui décrit bien ce nom.', t, `un adjectif qui va avec « ${t} »${n.g === 'f' ? ', écrit au féminin' : ''} (ex. : ${(ADJS.filter((a) => okPair(n, a)).slice(0, 3).map((a) => adjForm(a, n.g)).join(', ')) || 'joli'})`, 'L’adjectif s’accorde avec le nom.'); },
    ].map((f) => (R) => { let q; do q = f(R); while (!q); return q; }),
  });

/* ================================================================== */
/*  f83 — Le genre : masculin ou féminin                              */
/* ================================================================== */
const T83 = 'Truc : essaie « un » ou « une » devant le nom. « Une pomme » → féminin. « Un chat » → masculin.';
const PERS_E = [['ami', 'amie'], ['voisin', 'voisine'], ['cousin', 'cousine'], ['enseignant', 'enseignante'], ['gagnant', 'gagnante'], ['marchand', 'marchande'],
  ['lapin', 'lapine'], ['ours', 'ourse'], ['client', 'cliente'], ['avocat', 'avocate'], ['candidat', 'candidate'], ['étudiant', 'étudiante']];
const PERS_X = [['chat', 'chatte'], ['chien', 'chienne'], ['lion', 'lionne'], ['champion', 'championne'], ['musicien', 'musicienne'], ['gardien', 'gardienne'],
  ['boulanger', 'boulangère'], ['fermier', 'fermière'], ['épicier', 'épicière'], ['infirmier', 'infirmière'], ['pâtissier', 'pâtissière'], ['policier', 'policière'],
  ['danseur', 'danseuse'], ['chanteur', 'chanteuse'], ['vendeur', 'vendeuse'], ['coiffeur', 'coiffeuse'], ['nageur', 'nageuse'], ['skieur', 'skieuse'],
  ['loup', 'louve'], ['sportif', 'sportive'], ['prince', 'princesse'], ['roi', 'reine'], ['coq', 'poule'], ['oncle', 'tante'], ['garçon', 'fille'], ['grand-père', 'grand-mère']];
const ADJ_E = ['petit', 'grand', 'gris', 'vert', 'brun', 'joli', 'lourd', 'chaud', 'rond', 'bleu', 'noir', 'content', 'fort', 'méchant', 'amusant', 'prudent', 'haut', 'froid', 'court', 'lent', 'mauvais', 'gourmand', 'blond', 'poli'];
const ADJ_X = [['heureux', 'heureuse'], ['peureux', 'peureuse'], ['curieux', 'curieuse'], ['joyeux', 'joyeuse'], ['paresseux', 'paresseuse'], ['courageux', 'courageuse'],
  ['dangereux', 'dangereuse'], ['chanceux', 'chanceuse'], ['généreux', 'généreuse'], ['léger', 'légère'], ['fier', 'fière'], ['premier', 'première'], ['dernier', 'dernière'],
  ['cher', 'chère'], ['sportif', 'sportive'], ['neuf', 'neuve'], ['vif', 'vive'], ['bon', 'bonne'], ['mignon', 'mignonne'], ['gentil', 'gentille'], ['ancien', 'ancienne'],
  ['blanc', 'blanche'], ['beau', 'belle'], ['nouveau', 'nouvelle'], ['doux', 'douce'], ['gros', 'grosse'], ['long', 'longue'], ['roux', 'rousse'], ['actif', 'active']];
const ADJ_XS = ADJ_X.filter(([m]) => !['neuf', 'ancien', 'cher', 'vif'].includes(m));
const SHE = ['Ma sœur', 'Grand-maman', 'Mon amie Zoé', 'La chatte', 'Ma voisine', 'L’enseignante', 'Ma cousine', 'Rosalie'];
const femWrongs = (m, f) => [m, m + 'e', f.endsWith('se') ? f.replace(/se$/, 'ze') : m + 's'].filter((w) => w !== f);
const f83 = unit('f83', '⚧️', 'Masculin ou féminin', 'Masculine or feminine',
  'Grammaire — le genre des noms et des adjectifs (petit / petite, -eux / -euse, -er / -ère) (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const n = R.pick(NOUNS.filter((x) => !VOW(x.s))); const d = R.chance(0.5) ? indArt(n.g) : n.g === 'f' ? 'la' : 'le';
        return ch(`f83-a-${d}-${n.s}`, 'Ce nom est-il masculin ou féminin?', n.g === 'f' ? 'féminin' : 'masculin', [n.g === 'f' ? 'masculin' : 'féminin'], { stimulus: { text: `${d} ${n.s} ${n.e}` }, fixedOrder: true, tip: '« Un » et « le » vont avec le masculin. « Une » et « la » vont avec le féminin.' }); },
      (R) => { const g = R.pick(['m', 'f']); const r = R.pick(NOUNS.filter((x) => x.g === g)), w = R.sample(NOUNS.filter((x) => x.g !== g), 2);
        return ch(`f83-b-${g}-${r.s}-${w.map((x) => x.s).join()}`, g === 'f' ? 'Quel nom est féminin?' : 'Quel nom est masculin?', r.s, w.map((x) => x.s), { tip: T83 }); },
      (R) => { const [m, f] = R.pick(PERS_E.slice(0, 7));
        return ch(`f83-c-${m}`, 'Écris au féminin. Choisis le bon mot.', f, [m, m + 's'], { stimulus: { text: `un ${m} → une ${BL}` }, tip: 'Souvent, on ajoute un e pour écrire le féminin.' }); },
    ],
    2: [
      (R) => { const [m, f] = R.pick(PERS_E);
        return ch(`f83-d-${m}`, 'Écris au féminin. Choisis le bon mot.', f, [m, m + 's', m + 'ne'], { stimulus: { text: `${VOW(m) ? 'un' : 'le'} ${m} → ${VOW(m) ? 'une' : 'la'} ${BL}` }, tip: 'Pour plusieurs noms, on ajoute simplement un e : ami → amie.' }); },
      (R) => { const m = R.pick(ADJ_E);
        return ch(`f83-e-${m}`, 'Quel est le féminin de cet adjectif?', m + 'e', [m, m + 's'], { stimulus: { text: m }, tip: 'Petit → petite : on ajoute un e.' }); },
      (R) => { const m = R.pick(ADJ_E), S = R.pick(SHE);
        return ch(`f83-f-${S}-${m}`, 'Complète la phrase.', m + 'e', [m], { stimulus: { text: `${S} est ${BL}.` }, tip: 'Le sujet est féminin, alors l’adjectif prend un e.' }); },
      (R) => { const [m, f] = R.pick(PERS_X.slice(0, 6));
        return ch(`f83-g-${m}`, 'Écris au féminin. Choisis le bon mot.', f, [m + 'e', m], { stimulus: { text: `un ${m} → une ${BL}` }, tip: 'Certains mots doublent leur dernière lettre : chien → chienne, lion → lionne.' }); },
    ],
    3: [
      (R) => { const [m, f] = R.pick(ADJ_X);
        return ch(`f83-h-${m}`, 'Quel est le féminin de cet adjectif?', f, femWrongs(m, f), { stimulus: { text: m }, tip: '-eux devient -euse, -er devient -ère, -f devient -ve.' }); },
      (R) => { const [m, f] = R.pick(PERS_X);
        return ch(`f83-i-${m}`, 'Écris au féminin. Choisis le bon mot.', f, femWrongs(m, f), { stimulus: { text: `${VOW(m) ? 'l’' : 'le'} ${m} → ${VOW(f) ? 'l’' : 'la'} ${BL}` }, tip: '-er devient -ère, -eur devient souvent -euse. Et certains mots changent complètement : roi → reine.' }); },
      (R) => { const [m, f] = R.pick(ADJ_XS), S = R.pick(SHE);
        return ch(`f83-j-${S}-${m}`, 'Complète la phrase.', f, femWrongs(m, f), { stimulus: { text: `${S} est ${BL}.` }, tip: 'Le sujet est féminin : l’adjectif s’écrit au féminin.' }); },
      (R) => { const [m, f] = R.pick([...ADJ_X, ...PERS_X.slice(6, 18)]);
        return hd(`f83-k-${m}`, 'Écris ce mot au féminin.', `${m} → ?`, f, '-eux → -euse, -er → -ère, -f → -ve.'); },
    ],
  });

/* ================================================================== */
/*  f84 — Le nombre : singulier ou pluriel                            */
/* ================================================================== */
const PL_S = NOUNS.filter((n) => n.p === n.s + 's');
const PL_X = [['gâteau', 'gâteaux'], ['chapeau', 'chapeaux'], ['oiseau', 'oiseaux'], ['bateau', 'bateaux'], ['château', 'châteaux'], ['cadeau', 'cadeaux'],
  ['manteau', 'manteaux'], ['couteau', 'couteaux'], ['seau', 'seaux'], ['rideau', 'rideaux'], ['jeu', 'jeux'], ['cheveu', 'cheveux'], ['feu', 'feux'],
  ['neveu', 'neveux'], ['hibou', 'hiboux'], ['bijou', 'bijoux'], ['caillou', 'cailloux'], ['chou', 'choux'], ['genou', 'genoux'], ['joujou', 'joujoux'], ['pou', 'poux'],
  ['tuyau', 'tuyaux'], ['noyau', 'noyaux'], ['morceau', 'morceaux'], ['pinceau', 'pinceaux'], ['chameau', 'chameaux']];
const PL_OU = [['clou', 'clous'], ['trou', 'trous'], ['sou', 'sous'], ['kangourou', 'kangourous'], ['bisou', 'bisous'], ['matou', 'matous'], ['toutou', 'toutous']];
const PL_INV = ['souris', 'ours', 'nez', 'bras', 'prix', 'autobus', 'bois', 'tapis', 'noix', 'croix', 'repas', 'pays', 'radis', 'colis'];
const PL_AL = [['cheval', 'chevaux'], ['journal', 'journaux'], ['animal', 'animaux'], ['hôpital', 'hôpitaux'], ['canal', 'canaux'], ['bocal', 'bocaux'],
  ['signal', 'signaux'], ['métal', 'métaux'], ['local', 'locaux'], ['cristal', 'cristaux'], ['général', 'généraux'], ['mal', 'maux']];
const GEN = { souris: 'f', noix: 'f', croix: 'f', clou: 'm' };
const art1 = (w) => (GEN[w] === 'f' ? 'une' : 'un');
const xWrong = (s, p) => (p.endsWith('x') ? s + 's' : s + 'x');
const T84 = 'Au pluriel, on ajoute souvent un s. Les mots en -eau et -eu prennent un x.';
const f84 = unit('f84', '🔢', 'Singulier ou pluriel', 'Singular or plural',
  'Grammaire — le nombre : pluriel en -s, en -x, mots en -al → -aux (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const n = R.pick(NOUNS.filter(NOVAR)); const pl = R.chance(0.5); const d = pl ? R.pick(['les', 'des']) : (R.chance(0.5) ? indArt(n.g) : defArt(n.g, n.s));
        const t = glue(d, pl ? n.p : n.s);
        return ch(`f84-a-${t}`, 'Singulier ou pluriel?', pl ? 'pluriel (plusieurs)' : 'singulier (un seul)', [pl ? 'singulier (un seul)' : 'pluriel (plusieurs)'], { stimulus: { text: t }, fixedOrder: true, tip: '« Les » et « des » annoncent le pluriel.' }); },
      (R) => { const n = R.pick(PL_S); const d = R.pick([[indArt(n.g), 'des'], [defArt(n.g, n.s), 'les']]);
        return ch(`f84-b-${n.s}-${d[1]}`, 'Écris au pluriel. Choisis le bon mot.', n.p, [n.s, n.s + 'x'], { stimulus: { text: `${glue(d[0], n.s)} → ${d[1]} ${BL}` }, tip: 'La plupart des noms prennent un s au pluriel.' }); },
      (R) => { const n = R.pick(NOUNS.filter(NOVAR)); const k = R.int(2, 7);
        return ch(`f84-c-${n.s}-${k}`, 'Quel groupe de mots va avec l’image?', `des ${n.p}`, [`${indArt(n.g)} ${n.s}`, `des ${n.s}`], { stimulus: { emojis: n.e, count: k }, tip: 'Plusieurs : « des » et un s ou un x à la fin du nom.' }); },
    ],
    2: [
      (R) => { const [s, p] = R.pick([...PL_X, ...PL_X, ...PL_OU]);
        return ch(`f84-d-${s}`, 'Écris au pluriel. Choisis le bon mot.', p, [xWrong(s, p), s], { stimulus: { text: `un ${s} → des ${BL}` }, tip: '-eau et -eu prennent un x. Sept mots en -ou aussi : bijou, caillou, chou, genou, hibou, joujou, pou.' }); },
      (R) => { const w = R.pick(PL_INV);
        return ch(`f84-e-${w}`, 'Écris au pluriel. Choisis le bon mot.', w, [w + 's', w.replace(/[sxz]$/, '') + 'x'].filter((x) => x !== w), { stimulus: { text: `${art1(w)} ${w} → des ${BL}` }, tip: 'Un mot qui finit déjà par s, x ou z ne change pas au pluriel.' }); },
      (R) => { const xs = R.sample(PL_X, 3), ss = R.sample([...PL_S.map((n) => [n.s, n.p]), ...PL_OU], 3);
        return srt(`f84-f-${[...xs, ...ss].map((x) => x[0]).sort().join()}`, 'Au pluriel, ce mot prend un s ou un x?', ['+ s', '+ x'], R.shuffle([...ss.map(([s]) => ({ text: s, bin: 0 })), ...xs.map(([s]) => ({ text: s, bin: 1 }))]), T84); },
      (R) => { const n = R.pick(NOUNS.filter(NOVAR)); const pl = R.chance(0.5);
        const r = pl ? `les ${n.p}` : glue(defArt(n.g, n.s), n.s), w1 = pl ? glue(defArt(n.g, n.s), n.p) : `les ${n.s}`;
        return ch(`f84-g-${r}`, 'Quel groupe de mots est bien écrit?', r, [w1], { tip: 'Le déterminant et le nom vont ensemble : « les » avec un nom au pluriel.' }); },
    ],
    3: [
      (R) => { const [s, p] = R.pick([...PL_AL, ...PL_AL, ...PL_X]);
        return ch(`f84-h-${s}`, 'Écris au pluriel. Choisis le bon mot.', p, [s + 's', s + 'x', s.endsWith('al') ? s.slice(0, -2) + 'aus' : s + 'es'].filter((x) => x !== p), { stimulus: { text: `${GEN[s] === 'f' ? 'une' : 'un'} ${s} → des ${BL}` }, tip: 'Les mots en -al deviennent -aux : un cheval, des chevaux.' }); },
      (R) => { const [s, p] = R.pick([...PL_AL, ...PL_X, ...PL_OU, ...PL_INV.map((w) => [w, w])]);
        return hd(`f84-i-${s}`, 'Écris ce mot au pluriel.', `${GEN[s] === 'f' ? 'une' : 'un'} ${s} → des ?`, p, 'Pense à la règle : -s, -x, -aux, ou pas de changement.'); },
      (R) => { const [n, a] = R.pick(pairs.filter(([n]) => NOVAR(n))); const g = gn(n, a, true);
        const af = adjForm(a, n.g, true), ad = adjForm(a, n.g, false);
        const bad1 = g.replace(af, ad), bad2 = g.replace(n.p, n.s);
        return ch(`f84-j-${g}`, 'Écris au pluriel. Choisis le bon groupe.', g, [bad1, bad2, glue(defArt(n.g, a.pos === 'a' ? ad : n.s), a.pos === 'a' ? `${ad} ${n.s}` : `${n.s} ${ad}`)], { stimulus: { text: `${gn(n, a)} → ?` }, tip: 'Au pluriel, le nom et l’adjectif changent tous les deux.' }); },
      (R) => { const [s, p] = R.pick([['œil', 'yeux'], ['ciel', 'cieux'], ['travail', 'travaux'], ['vitrail', 'vitraux']]);
        return ch(`f84-k-${s}`, 'Un mot spécial! Choisis le pluriel.', p, [s + 's', s + 'x'], { stimulus: { text: `un ${s} → des ${BL}` }, tip: 'Quelques mots sont très spéciaux : un œil, des yeux!' }); },
    ],
  });

/* ================================================================== */
/*  f85 — L’accord dans le groupe du nom                              */
/* ================================================================== */
const DIFF = pairs.filter(([n, a]) => a.f !== a.m && NOVAR(n));
const gnBlank = (n, a, pl) => { const noun = pl ? n.p : n.s; return a.pos === 'a' ? `${pl ? 'les' : n.g === 'f' ? 'la' : 'le'} ${BL} ${noun}` : `${glue(defArt(n.g, noun, pl), noun)} ${BL}`; };
const T85 = 'Dans le groupe du nom, le déterminant, le nom et l’adjectif sont une équipe : ils ont le même genre et le même nombre.';
const f85 = unit('f85', '🤝', 'L’accord dans le groupe du nom', 'Agreement in the noun group',
  'Grammaire — accord dans le groupe du nom : déterminant + nom + adjectif (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const [n, a] = R.pick(DIFF);
        return ch(`f85-a-${n.s}-${a.m}`, 'Choisis l’adjectif bien accordé.', adjForm(a, n.g), [adjForm(a, n.g === 'f' ? 'm' : 'f')], { stimulus: { text: gnBlank(n, a, false) }, cols: 2, tip: 'Nom féminin → adjectif au féminin. Nom masculin → adjectif au masculin.' }); },
      (R) => { const [n, a] = R.pick(DIFF); const g = gn(n, a);
        return ch(`f85-b-${g}`, 'Quel groupe du nom est bien accordé?', g, [g.replace(adjForm(a, n.g), adjForm(a, n.g === 'f' ? 'm' : 'f'))], { tip: T85 }); },
    ],
    2: [
      (R) => { const [n, a] = R.pick(pairs.filter(([n]) => NOVAR(n))); const pl = true;
        return ch(`f85-c-${n.p}-${a.m}`, 'Choisis l’adjectif bien accordé.', adjForm(a, n.g, pl), [adjForm(a, n.g, false), adjForm(a, n.g === 'f' ? 'm' : 'f', true), adjForm(a, n.g === 'f' ? 'm' : 'f', false)], { stimulus: { text: gnBlank(n, a, pl) }, cols: 3, tip: 'Le nom est au pluriel : l’adjectif prend aussi un s (ou un x).' }); },
      (R) => { const [n, a] = R.pick(DIFF); const pl = R.chance(0.6); const g = gn(n, a, pl), af = adjForm(a, n.g, pl);
        const w1 = g.replace(af, adjForm(a, n.g === 'f' ? 'm' : 'f', pl)), w2 = g.replace(af, adjForm(a, n.g, !pl));
        return ch(`f85-d-${g}`, 'Quel groupe du nom est bien accordé?', g, [w1, w2], { tip: T85 }); },
    ],
    3: [
      (R) => { const [n, a] = R.pick(DIFF); const pl = R.chance(0.7); const g = gn(n, a, pl), af = adjForm(a, n.g, pl), nn = pl ? n.p : n.s;
        const w = [g.replace(af, adjForm(a, n.g === 'f' ? 'm' : 'f', pl)), g.replace(af, adjForm(a, n.g, !pl)), pl ? g.replace(n.p, n.s) : g.replace(n.s, n.p)];
        return ch(`f85-e-${g}`, 'Quel groupe du nom est bien accordé?', g, w, { n: 4, tip: T85 }); },
      (R) => { const [n, a] = R.pick(DIFF); const g = gn(n, a, true);
        return hd(`f85-f-${g}`, 'Écris ce groupe du nom au pluriel.', `${gn(n, a)} → ?`, g, 'Le déterminant devient « les », et le nom et l’adjectif prennent un s ou un x.'); },
      (R) => { const [n, a] = R.pick(DIFF.filter(([n]) => n.p.endsWith('s') || n.p.endsWith('x'))); const g = gn(n, a, true), af = adjForm(a, n.g, true);
        const badNoun = R.chance(0.5) && n.p !== n.s; const bad = badNoun ? g.replace(n.p, n.s) : g.replace(af, adjForm(a, n.g, false));
        if (bad === g) return ch(`f85-e2-${g}`, 'Quel groupe du nom est bien accordé?', g, [g.replace(af, adjForm(a, n.g, false)), g.replace(n.p, n.s)], { tip: T85 });
        const s = `${cap(bad)} sont ${R.pick(['ici', 'dans la cour', 'là-bas'])}.`;
        return ch(`f85-g-${s}`, 'Un mot est mal écrit. Lequel?', badNoun ? n.s : adjForm(a, n.g, false), ['Les', badNoun ? af : n.p, 'sont'], { n: 3, stimulus: { text: s }, tip: 'Vérifie que le nom et l’adjectif ont la marque du pluriel.' }); },
    ],
  });

/* ================================================================== */
/*  f86 — Le sujet : qui fait l’action? (il, elle, ils, elles)        */
/* ================================================================== */
const T86 = 'Truc : demande « Qui est-ce qui… ? ». La réponse est le sujet.';
const OPEN = ['Ce matin', 'Dans la cour', 'Après l’école', 'Le samedi', 'En hiver', 'Au chalet', 'Tous les jours', 'Ce soir'];
const f86 = unit('f86', '👤', 'Le sujet de la phrase', 'The subject',
  'Grammaire — le sujet (qui fait l’action?) et son remplacement par il, elle, ils, elles (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const x = simple(R, { kind: R.pick(['name', 'gn']) });
        return ch(`f86-a-${x.text}`, 'Qui fait l’action? Trouve le sujet.', x.S, [x.form, x.comp], { stimulus: { text: x.text }, tip: T86 }); },
      (R) => { const x = simple(R, { kind: 'name' });
        return ch(`f86-b-${x.text}`, 'Remplace le prénom par il ou elle.', cap(x.p), [x.p === 'il' ? 'Elle' : 'Il'], { stimulus: { text: x.text }, fixedOrder: true, cols: 2, tip: 'Un garçon → il. Une fille → elle.' }); },
    ],
    2: [
      (R) => { const x = simple(R, { kind: 'gn', pool: SUBJ.filter((s) => !/chat|chien|oiseaux|poules/.test(s.t)) });
        return ch(`f86-c-${x.text}`, 'Par quel pronom peux-tu remplacer le sujet?', cap(x.p), ['Il', 'Elle', 'Ils', 'Elles'], { stimulus: { text: x.text }, fixedOrder: false, n: 4, cols: 4, tip: 'Plusieurs filles → elles. Plusieurs garçons, ou des garçons et des filles → ils.' }); },
      (R) => { const x = simple(R, { kind: 'gn' });
        return ch(`f86-d-${x.text}`, 'Trouve le sujet de la phrase.', x.S, [x.form, x.comp, x.S.split(' ').slice(-1)[0]].filter((w) => w !== x.S), { stimulus: { text: x.text }, tip: 'Le sujet peut avoir plusieurs mots : « Mon ami Noah ».' }); },
      (R) => { const s = R.pick(HUMAN), inf = R.pick(ER), f = conj(inf, PIDX[s.p]);
        const t = `${s.t} ${f} ${R.pick(COMP[inf])}.`;
        return ch(`f86-e-${t}`, 'Quelle phrase veut dire la même chose?', `${cap(s.p)} ${f} ${t.split(' ').slice(s.t.split(' ').length + 1).join(' ')}`, ['Il', 'Elle', 'Ils', 'Elles'].filter((p) => p.toLowerCase() !== s.p).map((p) => `${p} ${f} ${t.split(' ').slice(s.t.split(' ').length + 1).join(' ')}`), { stimulus: { text: t }, tip: T86 }); },
    ],
    3: [
      (R) => { const x = simple(R, { kind: R.pick(['name', 'gn']) }); const o = R.pick(OPEN); const t = `${o}, ${low(x.S)} ${x.form} ${x.comp}.`;
        return ch(`f86-f-${t}`, 'Trouve le sujet de la phrase.', low(x.S), [o, x.comp, x.form], { n: 4, stimulus: { text: t }, tip: 'Attention : le sujet n’est pas toujours au début! Demande « Qui est-ce qui… ? ».' }); },
      (R) => { const x = simple(R, { kind: R.pick(['name', 'gn']) }); const o = R.pick(OPEN); const t = R.chance(0.5) ? `${o}, ${low(x.S)} ${x.form} ${x.comp}.` : x.text;
        return ch(`f86-g-${t}`, 'Trouve le verbe conjugué.', x.form, [R.chance(0.5) ? low(x.S) : x.comp, x.comp.split(' ').slice(-1)[0]], { stimulus: { text: t }, tip: 'Le verbe dit ce que fait le sujet. Truc : il change si on dit « hier » ou « demain ».' }); },
      (R) => { const s = R.pick(SUBJ.filter((x) => x.p.endsWith('s'))), inf = R.pick(ER), form = conj(inf, 5);
        const t = `${BL} ${form} ${R.pick(COMP[inf])}.`;
        const sing = R.pick(SUBJ.filter((x) => !x.p.endsWith('s')));
        return ch(`f86-h-${t}-${s.t}`, 'Quel sujet va avec ce verbe?', s.t, [sing.t, R.pick(['Je', 'Tu'])], { stimulus: { text: t }, tip: 'Le verbe finit par -ent : le sujet est au pluriel (ils, elles).' }); },
      (R) => { const x = simple(R, { kind: 'gn' }); const rest = x.text.slice(x.S.length);
        return hd(`f86-i-${x.text}`, 'Remplace le sujet par il, elle, ils ou elles. Écris la phrase.', x.text, `${cap(x.p)}${rest}`, 'Garde le verbe pareil : seul le sujet change.', 2); },
    ],
  });

/* ================================================================== */
/*  f87 — La phrase négative                                          */
/* ================================================================== */
const neg = (p, form, comp, w = 'pas') => `${cap(p === 'je' && VOW(form) ? 'je' : p)} ${VOW(form) ? `n’${form}` : `ne ${form}`} ${w} ${comp}.`;
const posS = (p, form, comp) => `${cap(withP(p, form))} ${comp}.`;
const NEGV = ['aimer', 'jouer', 'regarder', 'écouter', 'chercher', 'habiter', 'arriver', 'patiner', 'avoir', 'aller', 'être', 'vouloir', 'pouvoir', 'dire', 'fermer', 'laver', 'ramasser', 'aimer', 'glisser'];
function negItem(R) {
  const p = R.pick(PRON), inf = R.pick(NEGV), form = conj(inf, PIDX[p]);
  let comps = COMP[inf].filter(NO_INDEF); if (!comps.length) comps = ['aujourd’hui'];
  const comp = R.pick(comps);
  return { p, inf, form, comp, pos: posS(p, form, comp), neg: neg(p, form, comp) };
}
const T87 = 'La phrase négative a deux petits mots autour du verbe : ne … pas. Devant une voyelle, « ne » devient « n’ ».';
const f87 = unit('f87', '🚫', 'La phrase négative', 'Negative sentences',
  'Grammaire — la phrase négative : ne… pas, n’… pas (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const x = negItem(R); const isNeg = R.chance(0.5);
        return ch(`f87-a-${isNeg ? x.neg : x.pos}`, 'Cette phrase est-elle positive ou négative?', isNeg ? 'négative' : 'positive', [isNeg ? 'positive' : 'négative'], { stimulus: { text: isNeg ? x.neg : x.pos }, fixedOrder: true, cols: 2, tip: T87 }); },
      (R) => { const a = negItem(R), b = negItem(R); if (a.pos === b.pos) return ch(`f87-b1-${a.neg}`, 'Quelle phrase est négative?', a.neg, [a.pos], { tip: T87 });
        return ch(`f87-b-${a.neg}-${b.pos}`, 'Quelle phrase est négative?', a.neg, [a.pos, b.pos], { tip: T87 }); },
    ],
    2: [
      (R) => { const x = negItem(R); const nn = VOW(x.form) ? `n’${x.form}` : `ne ${x.form}`; const P = cap(x.p);
        return ch(`f87-c-${x.pos}`, 'Écris la phrase à la forme négative.', x.neg, [`${cap(withP(x.p, x.form))} pas ${x.comp}.`, `${P} ${nn} ${x.comp}.`, `${P} pas ${VOW(x.form) ? `n’${x.form}` : `ne ${x.form}`} ${x.comp}.`], { stimulus: { text: x.pos }, n: 3, tip: T87 }); },
      (R) => { let x; do x = negItem(R); while (!VOW(x.form));
        return ch(`f87-d-${x.neg}`, 'Complète la phrase négative.', 'n’', ['ne', 'non'], { stimulus: { text: `${cap(x.p === 'je' ? 'je' : x.p)} ${BL}${x.form} pas ${x.comp}.` }, cols: 3, tip: 'Devant une voyelle (a, e, i, o, u), « ne » devient « n’ ».' }); },
      (R) => { let x; do x = negItem(R); while (VOW(x.form));
        return ch(`f87-e-${x.neg}`, 'Complète la phrase négative.', 'ne', ['n’', 'pas'], { stimulus: { text: `${cap(x.p)} ${BL} ${x.form} pas ${x.comp}.` }, cols: 3, tip: 'Devant une consonne, on écrit « ne ».' }); },
    ],
    3: [
      (R) => { const x = negItem(R); const words = x.neg.split(' ');
        return ord(`f87-f-${x.neg}`, 'Place les mots pour faire une phrase négative.', words, { tip: T87 }); },
      (R) => { const x = negItem(R);
        return hd(`f87-g-${x.pos}`, 'Écris cette phrase à la forme négative.', x.pos, x.neg, 'Mets « ne » (ou « n’ ») avant le verbe et « pas » après.', 2); },
      (R) => { const x = negItem(R); const w = R.pick(['jamais', 'plus']); const t = neg(x.p, x.form, x.comp, w);
        return ch(`f87-h-${t}`, 'Quels mots font la négation dans cette phrase?', `ne … ${w}`.replace('ne', VOW(x.form) ? 'n’' : 'ne'), [`${x.p} … ${x.form}`, `${x.form} … ${x.comp.split(' ')[0]}`], { stimulus: { text: t }, tip: 'On peut aussi dire « ne … jamais » ou « ne … plus ».' }); },
      (R) => { const x = negItem(R); const P = cap(x.p);
        return ch(`f87-i-${x.neg}`, 'Quelle phrase négative est bien écrite?', x.neg, [`${P} ${VOW(x.form) ? `ne ${x.form}` : `n’${x.form}`} pas ${x.comp}.`, `${cap(withP(x.p, x.form))} pas ${x.comp}.`, `${P} ne pas ${x.form} ${x.comp}.`], { n: 4, tip: T87 }); },
    ],
  });

/* ================================================================== */
/*  f88 — Les types de phrases (. ? !)                                */
/* ================================================================== */
const INTER = ['Où est mon chandail', 'Qui a mangé ma collation', 'Quand part l’autobus', 'Comment s’appelle ton chat', 'Pourquoi le ciel est-il bleu',
  'Aimes-tu les crêpes', 'As-tu vu mes mitaines', 'Veux-tu une pomme', 'Combien de dents as-tu', 'Quelle heure est-il', 'Peux-tu m’aider',
  'Qu’est-ce que tu dessines', 'Où vont les oiseaux en hiver', 'Qui veut jouer au hockey', 'Quel est ton animal préféré', 'Où habites-tu',
  'Avec qui joues-tu à la récréation', 'Combien coûte cette tuque', 'Pourquoi pleures-tu', 'Quand arrive grand-maman', 'Qui a fermé la porte'];
const EXCL = ['Quelle belle journée', 'Que la neige est blanche', 'Comme tu cours vite', 'Wow, quel beau château', 'Attention, la route glisse',
  'Bravo, tu as gagné', 'Oh non, j’ai oublié ma tuque', 'Youpi, c’est les vacances', 'Aïe, je me suis cogné', 'Que ce gâteau est bon', 'Quelle surprise',
  'Comme il fait froid', 'Ouf, nous sommes arrivés', 'Hourra, il neige', 'Zut, il pleut encore', 'Comme ton dessin est beau', 'Ah, que c’est drôle',
  'Oh, une étoile filante', 'Quel gros orignal', 'Bonne fête, grand-papa', 'Au secours'];
const TYPES = ['déclarative ( . )', 'interrogative ( ? )', 'exclamative ( ! )'];
const T88 = 'Phrase déclarative : elle dit quelque chose (.). Interrogative : elle pose une question (?). Exclamative : elle montre une émotion (!).';
const estCe = (s) => (VOW(s) ? `Est-ce qu’${s}` : `Est-ce que ${s}`);
function phraseOf(R, type) {
  if (type === 0) return simple(R).text.slice(0, -1);
  if (type === 1) {
    if (R.chance(0.45)) return R.pick(INTER);
    const x = simple(R, { kind: R.chance(0.5) ? 'pron' : 'gn', prons: ['tu', 'il', 'elle', 'vous', 'ils', 'elles'] });
    return estCe(x.text.charAt(0).toLowerCase() + x.text.slice(1, -1));
  }
  if (R.chance(0.45)) return R.pick(EXCL);
  if (R.chance(0.5)) { const [n, a] = R.pick(pairs.filter(([, x]) => x.pos === 'a')); return `${n.g === 'f' ? 'Quelle' : 'Quel'} ${adjForm(a, n.g)} ${n.s}`; }
  const [n, a] = R.pick(pairs.filter(([, x]) => x.pos === 'p')); return `Comme ${gn(n)} est ${adjForm(a, n.g)}`;
}
const END = ['.', '?', '!'];
const f88 = unit('f88', '❓', 'Les types de phrases', 'Types of sentences',
  'Grammaire — types de phrases : déclarative, interrogative, exclamative; ponctuation finale (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const t = R.int(0, 2), s = phraseOf(R, t);
        return ch(`f88-a-${s}`, 'Quel signe faut-il à la fin de la phrase?', END[t], END.filter((_, i) => i !== t), { stimulus: { text: `${s} ${BL}` }, fixedOrder: true, cols: 3, tip: 'Une question finit par « ? ». Une émotion forte finit par « ! ». Sinon, on met un point.' }); },
    ],
    2: [
      (R) => { const t = R.int(0, 2), s = phraseOf(R, t);
        return ch(`f88-b-${s}`, 'Quel type de phrase est-ce?', TYPES[t], TYPES.filter((_, i) => i !== t), { stimulus: { text: s + (t === 0 ? '.' : t === 1 ? '?' : '!') }, fixedOrder: true, tip: T88 }); },
      (R) => { const ts = R.shuffle([0, 0, 1, 1, 2, 2]); const items = ts.map((t) => ({ text: phraseOf(R, t), bin: t }));
        if (new Set(items.map((i) => i.text)).size < items.length) items.pop();
        return srt(`f88-c-${items.map((i) => i.text).sort().join('|')}`, 'Classe les phrases (la ponctuation est cachée).', ['Déclarative .', 'Interrogative ?', 'Exclamative !'], items, T88); },
    ],
    3: [
      (R) => { const x = simple(R, { kind: 'pron', prons: ['tu', 'il', 'elle', 'vous', 'ils', 'elles'] }); const body = x.text.charAt(0).toLowerCase() + x.text.slice(1, -1);
        return ch(`f88-d-${x.text}`, 'Transforme en question. Quelle phrase est bien écrite?', `${estCe(body)}?`, [`${estCe(body)}.`, `${x.text.slice(0, -1)}!`, `${VOW(body) ? 'Est-ce que ' : 'Est-ce qu’'}${body}?`], { n: 3, stimulus: { text: x.text }, tip: 'On ajoute « Est-ce que » au début et un point d’interrogation à la fin. Devant une voyelle : « Est-ce qu’ ».' }); },
      (R) => { const x = simple(R, { kind: 'pron', prons: ['tu', 'vous'] }); const rest = x.text.slice(withP(x.p, x.form).length, -1);
        return ch(`f88-e-${x.text}`, 'Transforme en question. Quelle phrase est bien écrite?', `${cap(x.form)}-${x.p}${rest}?`, [`${cap(x.form)} ${x.p}${rest}?`, `${cap(x.p)}-${x.form}${rest}?`, `${cap(x.form)}-${x.p}${rest}.`], { n: 3, stimulus: { text: x.text }, tip: 'On peut inverser le verbe et le sujet, avec un trait d’union : « Aimes-tu… ? ».' }); },
      (R) => { const ts = R.sample([0, 1, 2], 3); const ss = ts.map((t) => phraseOf(R, t));
        const good = ss[0] + (ts[0] === 0 ? '.' : ts[0] === 1 ? '?' : '!'), wrongEnd = (t) => (t === 0 ? '?' : '.');
        return ch(`f88-f-${good}-${ss[1]}-${ss[2]}`, 'Quelle phrase a la bonne ponctuation?', good, [ss[1] + wrongEnd(ts[1]), ss[2] + wrongEnd(ts[2])], { tip: T88 }); },
      (R) => { const [what, key] = R.pick([['s’il aime la neige', 'Est-ce que tu aimes la neige? / Aimes-tu la neige?'], ['où il habite', 'Où habites-tu? / Où est-ce que tu habites?'],
        ['quel âge il a', 'Quel âge as-tu?'], ['s’il veut jouer au ballon', 'Veux-tu jouer au ballon? / Est-ce que tu veux jouer au ballon?'], ['quel est son animal préféré', 'Quel est ton animal préféré?'],
        ['s’il a un chat', 'As-tu un chat? / Est-ce que tu as un chat?'], ['quand est sa fête', 'Quand est ta fête?'], ['comment s’appelle son frère', 'Comment s’appelle ton frère?']]);
        return hd(`f88-g-${what}`, 'Écris la question à poser à ton ami.', `Tu veux savoir ${what}.`, `${key} (avec un point d’interrogation)`, 'N’oublie pas la majuscule et le point d’interrogation!', 2); },
    ],
  });

/* ================================================================== */
/*  f89 — La phrase bien construite et bien ponctuée                  */
/* ================================================================== */
const T89 = 'Une phrase commence par une majuscule et finit par un point. Elle dit qui fait quoi : un sujet et un verbe.';
const lowFirst = (t, S) => (S && /^[A-ZÉÈ]/.test(S) && !/^(L’|(Le|La|Les|Mon|Ma|Mes|Grand|Toi|Ta|Papa)(?=[\s-]))/.test(S) ? t : t.charAt(0).toLowerCase() + t.slice(1));
const ordSimple = (R) => { let x; do x = simple(R, { kind: R.pick(['name', 'gn']) }); while (/ et /.test(x.S)); return x; };
const f89 = unit('f89', '✍️', 'La phrase bien construite', 'Well-built sentences',
  'Grammaire — phrase bien construite (ordre des mots) et bien ponctuée (majuscule, point) (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const x = simple(R); const t = x.text;
        return ch(`f89-a-${t}`, 'Quelle phrase est bien écrite?', t, [t.charAt(0).toLowerCase() + t.slice(1), t.slice(0, -1)], { tip: T89 }); },
      (R) => { const x = ordSimple(R); const S = x.S, rest = x.comp;
        return ch(`f89-b-${x.text}`, 'Quelle phrase est bien construite?', x.text, [`${cap(x.form)} ${low(S)} ${rest}.`, `${cap(x.form)} ${rest} ${low(S)}.`], { tip: 'Dans une phrase, on dit d’abord qui (le sujet), puis ce qu’il fait (le verbe).' }); },
    ],
    2: [
      (R) => { const x = ordSimple(R); const w = x.text.split(' ');
        return ord(`f89-c-${x.text}`, 'Place les mots pour faire une phrase.', w, { tip: 'Cherche le mot avec la majuscule pour commencer, et le mot avec le point pour finir.' }); },
      (R) => { const k = R.int(0, 2); let t, ok;
        if (k === 0) { t = simple(R).text; ok = true; }
        else if (k === 1) { const [n, a] = R.pick(pairs); t = cap(gn(n, a)) + '.'; ok = false; }
        else { const x = simple(R, { kind: R.pick(['name', 'gn']) }); t = `${x.S} ${x.comp}.`; ok = false; }
        return ch(`f89-d-${t}`, 'Est-ce une phrase complète?', ok ? 'Oui, c’est une phrase.' : 'Non, il manque quelque chose.', [ok ? 'Non, il manque quelque chose.' : 'Oui, c’est une phrase.'], { stimulus: { text: t }, fixedOrder: true, tip: 'Une phrase complète dit de qui on parle (sujet) et ce qu’il fait (verbe).' }); },
    ],
    3: [
      (R) => { const k = R.int(2, 4); const xs = Array.from({ length: k }, () => simple(R));
        const t = xs.map((x) => lowFirst(x.text, x.S).slice(0, -1)).join(' ');
        return { type: 'keypad', key: `f89-e-${t}`, prompt: 'Les points ont disparu! Combien de phrases y a-t-il?', say: fx('Les points ont disparu! Combien de phrases y a-t-il?'), stimulus: { text: t }, answer: k, tip: 'Cherche chaque fois un nouveau sujet avec son verbe.' }; },
      (R) => { const a = simple(R), b = simple(R); if (a.text === b.text) return ch(`f89-a-${a.text}`, 'Quelle phrase est bien écrite?', a.text, [a.text.slice(0, -1)], { tip: T89 });
        const good = `${a.text} ${b.text}`;
        return ch(`f89-f-${good}`, 'Quel texte est bien ponctué?', good, [`${a.text.slice(0, -1)} ${lowFirst(b.text, b.S)}`, `${a.text} ${lowFirst(b.text, b.S)}`, `${a.text.slice(0, -1)}, ${lowFirst(b.text, b.S)}`].filter((x) => x !== good), { tip: T89 }); },
      (R) => { const a = simple(R), b = simple(R); const good = `${a.text} ${b.text}`;
        return hd(`f89-g-${good}`, 'Recopie le texte avec les majuscules et les points.', `${lowFirst(a.text, a.S).slice(0, -1)} ${lowFirst(b.text, b.S).slice(0, -1)}`, good, 'Deux phrases : deux majuscules et deux points.', 3); },
    ],
  });

/* ================================================================== */
/*  Conjugaison au présent — moteur commun                            */
/* ================================================================== */
const TRAPS = {
  faire: { 3: ['faisont'], 4: ['faisez'], 5: ['faisent'] }, dire: { 4: ['disez'], 5: ['disent'] }, prendre: { 0: ['prend'], 2: ['prends'], 5: ['prenent', 'prendent'] },
  aller: { 0: ['vas'], 5: ['allent', 'vonts'] }, vouloir: { 0: ['veut'], 5: ['voulent'] }, pouvoir: { 0: ['peut'], 5: ['pouvent'] },
  avoir: { 5: ['avent', 'sont'], 0: ['a'] }, être: { 5: ['ont', 'sons'], 3: ['êtons', 'avons'] },
};
function conjWrongs(R, inf, i) {
  const right = conj(inf, i);
  const others = [...new Set([0, 1, 2, 3, 4, 5].map((k) => conj(inf, k)))].filter((f) => f !== right);
  const traps = (TRAPS[inf]?.[i] || []).filter((f) => f !== right);
  if (!IRR[inf]) { const st = inf.slice(0, -2); traps.push(i === 5 ? st + 'es' : i === 3 ? st + 'ont' : i === 4 ? st + 'er' : st + 'ent'); }
  return [...R.shuffle(traps).slice(0, 1), ...R.shuffle(others)].filter((f) => f !== right);
}
// sujets : pronoms, prénoms ou groupes du nom
function subjFor(R, mode) {
  if (mode === 'sing') { if (R.chance(0.4)) { const f = R.chance(0.5); return { disp: R.pick(f ? NF : NM), p: f ? 'elle' : 'il' }; } const p = R.pick(['je', 'tu', 'il', 'elle']); return { disp: p, p }; }
  if (mode === 'pron') { const p = R.pick(PRON); return { disp: p, p }; }
  if (R.chance(0.3)) { const f = R.chance(0.5); return { disp: R.pick(f ? NF : NM), p: f ? 'elle' : 'il' }; }
  if (R.chance(0.15)) return R.pick([{ disp: `${R.pick(NM)} et moi`, p: 'nous' }, { disp: `Toi et ${R.pick(NF)}`, p: 'vous' }, { disp: 'Mon frère et moi', p: 'nous' }, { disp: 'Ta sœur et toi', p: 'vous' }]);
  if (R.chance(0.25)) { const p = R.pick(PRON); return { disp: p, p }; }
  const s = R.pick(HUMAN); return { disp: s.t, p: s.p };
}
// « Je ___ (aimer) les pommes. »
function conjQ(R, uid, inf, mode, o = {}) {
  const s = subjFor(R, mode), i = PIDX[s.p], right = conj(inf, i);
  const comp = R.pick(COMP[inf]);
  const head = s.p === 'je' && s.disp === 'je' && VOW(right) ? 'J’' : cap(s.disp) + ' ';
  const st = `${head}${BL} (${inf}) ${comp}.`;
  return ch(`${uid}-${o.tag ?? 'c'}-${s.disp}-${inf}-${comp}`, o.prompt ?? 'Conjugue le verbe au présent.', right, conjWrongs(R, inf, i), { n: o.n ?? 3, cols: o.n === 4 ? 2 : undefined, stimulus: { text: st }, tip: o.tip });
}
const conjHand = (R, uid, inf, tip) => { const p = R.pick(PRON), f = conj(inf, PIDX[p]);
  return hd(`${uid}-h-${p}-${inf}`, 'Conjugue le verbe au présent. Écris le pronom et le verbe.', `${p} (${inf}) → ?`, withP(p, f), tip); };
const conjTable = (R, uid, inf, tip) => { const i = R.int(0, 5), p = ['je', 'tu', R.pick(['il', 'elle']), 'nous', 'vous', R.pick(['ils', 'elles'])][i];
  return ch(`${uid}-t-${p}-${inf}`, `Quelle est la bonne forme du verbe ${inf}?`, withP(p, conj(inf, i)), conjWrongs(R, inf, i).slice(0, 3).map((f) => withP(p, f)), { n: 4, tip }); };
// trouve l’erreur dans une phrase
const conjError = (R, uid, inf, tip) => { const s = subjFor(R, 'gn'), i = PIDX[s.p], right = conj(inf, i); const bad = conjWrongs(R, inf, i)[0];
  const comp = R.pick(COMP[inf]); const good = `${cap(s.p === 'je' && VOW(right) ? 'j’' + right : s.disp + ' ' + right)} ${comp}.`;
  const badS = `${cap(s.p === 'je' && VOW(bad) ? 'j’' + bad : s.disp + ' ' + bad)} ${comp}.`;
  return ch(`${uid}-e-${good}`, 'Quelle phrase est bien écrite?', good, [badS], { tip }); };

/* ================================================================== */
/*  f90 — Les verbes en -er au présent                                */
/* ================================================================== */
const T90 = 'Verbes en -er : je -e, tu -es, il/elle -e, nous -ons, vous -ez, ils/elles -ent. Le -ent ne se prononce pas!';
const endingQ = (R, mode) => {
  const p = mode === 'sing' ? R.pick(['je', 'tu', 'il', 'elle']) : R.pick(PRON); const inf = R.pick(ER.filter((v) => v !== 'manger' && v !== 'nager')), i = PIDX[p];
  const st = inf.slice(0, -2), comp = R.pick(COMP[inf]);
  const head = p === 'je' && VOW(st) ? `J’${st}` : `${cap(p)} ${st}`;
  return ch(`f90-t-${p}-${inf}-${comp}`, 'Quelle est la bonne terminaison?', ER_END[i], [...new Set(ER_END)].filter((e) => e !== ER_END[i]), { n: mode === 'sing' ? 3 : 4, cols: mode === 'sing' ? 3 : 4, stimulus: { text: `${head}${BL} ${comp}.` }, tip: T90 });
};
const f90 = unit('f90', '🎤', 'Les verbes en -er', 'Verbs ending in -er',
  'Conjugaison — présent de l’indicatif des verbes en -er (aimer, jouer, manger, parler…) (Progression MEQ, 1er cycle)', {
    1: [(R) => conjQ(R, 'f90', R.pick(ER), 'sing', { tip: T90 }), (R) => endingQ(R, 'sing')],
    2: [(R) => conjQ(R, 'f90', R.pick(ER), 'pron', { n: 4, tip: T90 }), (R) => endingQ(R, 'all'), (R) => conjTable(R, 'f90', R.pick(ER), T90),
      (R) => { const inf = R.pick(['manger', 'nager']);
        return ch(`f90-g-${inf}`, 'Attention! Quelle est la bonne forme avec « nous »?', `nous ${inf.slice(0, -2)}eons`, [`nous ${inf.slice(0, -2)}ons`, `nous ${inf.slice(0, -2)}ont`], { tip: 'Avec manger et nager, on garde un e : nous mangeons, nous nageons. Sinon, on lirait « mangons »!' }); }],
    3: [(R) => conjQ(R, 'f90', R.pick(ER), 'gn', { n: 4, tip: 'Trouve le sujet, puis remplace-le par un pronom : « Mes amies » → elles → -ent.' }), (R) => conjQ(R, 'f90', R.pick(ER), 'gn', { n: 4, tag: 'c2', tip: T90 }),
      (R) => conjError(R, 'f90', R.pick(ER), T90), (R) => conjHand(R, 'f90', R.pick(ER), T90)],
  });

/* ================================================================== */
/*  f91 — Être et avoir                                               */
/* ================================================================== */
const T91 = 'Être : je suis, tu es, il est, nous sommes, vous êtes, ils sont. Avoir : j’ai, tu as, il a, nous avons, vous avez, ils ont.';
const EA_COMP = { être: ['à l’école', 'dans la cour', 'en retard', 'au parc', 'chez grand-maman', 'en 2e année', 'au chalet'], avoir: ['faim', 'froid', 'sept ans', 'un chien', 'une nouvelle tuque', 'de la chance', 'soif', 'peur du noir'] };
const eaMix = (R, mode) => {
  const inf = R.pick(['être', 'avoir']), other = inf === 'être' ? 'avoir' : 'être';
  const s = subjFor(R, mode === 'gn' ? 'gn' : 'pron'); if (s.p === 'je') return eaMix(R, mode);
  const i = PIDX[s.p], comp = R.pick(EA_COMP[inf]);
  return ch(`f91-m-${s.disp}-${comp}`, 'Être ou avoir? Choisis le bon verbe.', conj(inf, i), [conj(other, i), conj(inf, (i + 3) % 6), conj(other, (i + 3) % 6)], { n: mode === 'gn' ? 4 : 3, stimulus: { text: `${cap(s.disp)} ${BL} ${comp}.` }, tip: 'On « a » faim, froid, sept ans. On « est » à l’école, en retard.' });
};
const f91 = unit('f91', '⭐', 'Être et avoir', 'To be and to have',
  'Conjugaison — présent de l’indicatif des verbes être et avoir (Progression MEQ, 1er cycle)', {
    1: [(R) => conjQ(R, 'f91', 'être', 'sing', { tip: T91 }), (R) => conjQ(R, 'f91', 'avoir', 'sing', { tip: T91 })],
    2: [(R) => conjQ(R, 'f91', R.pick(['être', 'avoir']), 'pron', { n: 4, tip: T91 }), (R) => eaMix(R, 'pron'), (R) => conjTable(R, 'f91', R.pick(['être', 'avoir']), T91)],
    3: [(R) => conjQ(R, 'f91', R.pick(['être', 'avoir']), 'gn', { n: 4, tip: T91 }), (R) => eaMix(R, 'gn'), (R) => conjError(R, 'f91', R.pick(['être', 'avoir']), T91),
      (R) => conjHand(R, 'f91', R.pick(['être', 'avoir']), T91)],
  });

/* ================================================================== */
/*  f92 — Aller et le futur proche                                    */
/* ================================================================== */
const T92 = 'Aller : je vais, tu vas, il va, nous allons, vous allez, ils vont. Futur proche : aller + un verbe à l’infinitif (je vais jouer).';
const FUT_V = ['jouer', 'manger', 'chanter', 'danser', 'regarder', 'dessiner', 'nager', 'patiner', 'glisser', 'faire', 'dire', 'prendre', 'lire', 'écrire', 'dormir', 'voir', 'finir', 'boire', 'partir'];
const f92 = unit('f92', '🚀', 'Aller et le futur proche', 'To go and the near future',
  'Conjugaison — présent du verbe aller; futur proche : aller + infinitif (Progression MEQ, 1er cycle)', {
    1: [(R) => conjQ(R, 'f92', 'aller', 'sing', { tip: T92 }),
      (R) => { const p = R.pick(['je', 'tu', 'il', 'elle']), inf = R.pick(FUT_V), i = PIDX[p], comp = R.pick(COMP[inf]);
        const fut = `${cap(withP(p, conj('aller', i)))} ${inf} ${comp}.`, pres = `${cap(withP(p, conj(inf, i)))} ${comp}.`;
        return ch(`f92-a-${fut}`, 'Quelle phrase parle de ce qui va arriver bientôt?', fut, [pres], { tip: '« Je vais jouer » : ça va arriver bientôt. C’est le futur proche.' }); }],
    2: [(R) => conjQ(R, 'f92', 'aller', 'pron', { n: 4, tip: T92 }), (R) => conjTable(R, 'f92', 'aller', T92),
      (R) => { const s = subjFor(R, 'pron'), inf = R.pick(FUT_V), i = PIDX[s.p], comp = R.pick(COMP[inf]); const right = conj('aller', i);
        return ch(`f92-b-${s.disp}-${inf}-${comp}`, 'Complète au futur proche.', right, conjWrongs(R, 'aller', i), { n: 3, stimulus: { text: `Demain, ${s.disp} ${BL} ${inf} ${comp}.` }, tip: T92 }); }],
    3: [
      (R) => { const s = subjFor(R, 'gn'), inf = R.pick(FUT_V.filter((v) => v.endsWith('er'))), i = PIDX[s.p], comp = R.pick(COMP[inf]);
        const al = conj('aller', i), pres = conj(inf, i), st = inf.slice(0, -2);
        const head = s.p === 'je' && s.disp === 'je' && VOW(pres) ? `J’${pres}` : `${cap(s.disp)} ${pres}`;
        return ch(`f92-c-${s.disp}-${inf}-${comp}`, 'Écris la phrase au futur proche.', `${al} ${inf}`, [`${al} ${st}é`, `${conj('aller', (i + 3) % 6)} ${inf}`, `${al} ${pres}`], { n: 4, stimulus: { text: `${head} ${comp}. → Demain, ${s.disp === 'je' ? 'je' : low(s.disp)} ${BL} ${comp}.` }, tip: 'Après « aller », le verbe reste à l’infinitif : je vais manger (pas « mangé »).' }); },
      (R) => conjQ(R, 'f92', 'aller', 'gn', { n: 4, tip: T92 }),
      (R) => { const p = R.pick(PRON), inf = R.pick(FUT_V), comp = R.pick(COMP[inf]);
        return hd(`f92-h-${p}-${inf}-${comp}`, 'Écris au futur proche.', `${p} (${inf}) ${comp}`, `${withP(p, conj('aller', PIDX[p]))} ${inf} ${comp}`, T92, 2); },
    ],
  });

/* ================================================================== */
/*  f93 — Faire et dire                                               */
/* ================================================================== */
const T93 = 'Faire : je fais, tu fais, il fait, nous faisons, vous faites, ils font. Dire : je dis, tu dis, il dit, nous disons, vous dites, ils disent.';
const f93 = unit('f93', '🗣️', 'Faire et dire', 'To do and to say',
  'Conjugaison — présent des verbes faire et dire (Progression MEQ, 1er cycle)', {
    1: [(R) => conjQ(R, 'f93', 'faire', 'sing', { tip: T93 }), (R) => conjQ(R, 'f93', 'dire', 'sing', { tip: T93 })],
    2: [(R) => conjQ(R, 'f93', R.pick(['faire', 'dire']), 'pron', { n: 4, tip: T93 }), (R) => conjTable(R, 'f93', R.pick(['faire', 'dire']), T93),
      (R) => { const inf = R.pick(['faire', 'dire']);
        return ch(`f93-v-${inf}`, 'Attention, verbe spécial! Complète avec « vous ».', `vous ${inf === 'faire' ? 'faites' : 'dites'}`, [`vous ${inf === 'faire' ? 'faisez' : 'disez'}`, `vous ${inf === 'faire' ? 'faisons' : 'disons'}`], { tip: 'Vous faites, vous dites : comme vous êtes, ça finit par -tes!' }); }],
    3: [(R) => conjQ(R, 'f93', R.pick(['faire', 'dire']), 'gn', { n: 4, tip: T93 }), (R) => conjError(R, 'f93', R.pick(['faire', 'dire']), T93),
      (R) => conjHand(R, 'f93', R.pick(['faire', 'dire']), T93), (R) => conjQ(R, 'f93', R.pick(['faire', 'dire']), 'gn', { n: 4, tag: 'c2', tip: T93 })],
  });

/* ================================================================== */
/*  f94 — Prendre, vouloir, pouvoir                                   */
/* ================================================================== */
const PVP = ['prendre', 'vouloir', 'pouvoir'];
const T94 = 'Je prends, je veux, je peux : avec je et tu, ça finit par s ou x. Avec il/elle : il prend, il veut, il peut.';
const f94 = unit('f94', '🎒', 'Prendre, vouloir, pouvoir', 'To take, to want, can',
  'Conjugaison — présent des verbes prendre, vouloir, pouvoir (révision de fin d’année) (Progression MEQ, 1er cycle)', {
    1: [(R) => conjQ(R, 'f94', R.pick(PVP), 'sing', { tip: T94 })],
    2: [(R) => conjQ(R, 'f94', R.pick(PVP), 'pron', { n: 4, tip: T94 }), (R) => conjTable(R, 'f94', R.pick(PVP), T94),
      (R) => { const inf = R.pick(PVP);
        return ch(`f94-p-${inf}`, 'Complète avec « ils ».', `ils ${conj(inf, 5)}`, (TRAPS[inf][5] || []).map((f) => `ils ${f}`).concat([`ils ${conj(inf, 2)}`]), { tip: 'Ils prennent (deux n), ils veulent, ils peuvent.' }); }],
    3: [(R) => conjQ(R, 'f94', R.pick(PVP), 'gn', { n: 4, tip: T94 }), (R) => conjError(R, 'f94', R.pick(PVP), T94), (R) => conjHand(R, 'f94', R.pick(PVP), T94),
      (R) => { const inf = R.pick(['être', 'avoir', 'aller', 'faire', 'dire', ...PVP]); return conjQ(R, 'f94', inf, 'gn', { n: 4, tag: 'r', prompt: 'Révision : conjugue le verbe au présent.', tip: 'Trouve le sujet et pense au pronom qui le remplace.' }); }],
  });

/* ================================================================== */
/*  f95 — Le verbe conjugué et son infinitif                          */
/* ================================================================== */
const T95 = 'L’infinitif est le nom du verbe, comme dans le dictionnaire : manger, être, faire. Truc : « Il faut… manger ».';
const ALLV = [...ER, ...Object.keys(IRR)];
const pp = (inf) => (inf.endsWith('er') ? inf.slice(0, -2) + 'é' : inf.slice(0, -1));
const f95 = unit('f95', '🔎', 'Le verbe et son infinitif', 'The verb and its infinitive',
  'Conjugaison — trouver le verbe conjugué et son infinitif (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const inf = R.pick(ER), p = R.pick(PRON), f = conj(inf, PIDX[p]);
        return ch(`f95-a-${p}-${inf}`, 'Quel est l’infinitif de ce verbe?', inf, [f, pp(inf)].filter((x) => x !== inf), { stimulus: { text: withP(p, f) }, tip: T95 }); },
      (R) => { const x = simple(R, { kind: R.pick(['name', 'gn']) });
        return ch(`f95-b-${x.text}`, 'Trouve le verbe dans la phrase.', x.form, [x.S.split(' ').slice(-1)[0], x.comp.split(' ').slice(-1)[0]], { stimulus: { text: x.text }, tip: 'Le verbe dit ce que fait le sujet.' }); },
    ],
    2: [
      (R) => { const inf = R.pick(['être', 'avoir', 'aller', 'faire', 'dire', 'prendre', 'vouloir', 'pouvoir', 'venir', 'voir', 'lire', 'finir']), i = R.int(0, 5), p = ['je', 'tu', 'il', 'nous', 'vous', 'ils'][i], f = conj(inf, i);
        const near = { être: 'avoir', avoir: 'être', aller: 'vouloir', faire: 'dire', dire: 'faire', prendre: 'pouvoir', vouloir: 'pouvoir', pouvoir: 'vouloir', venir: 'voir', voir: 'venir', lire: 'dire', finir: 'faire' };
        return ch(`f95-c-${p}-${inf}`, 'Quel est l’infinitif de ce verbe?', inf, [near[inf], f], { stimulus: { text: withP(p, f) }, tip: 'Les verbes spéciaux changent beaucoup! « Ils vont » vient de aller.' }); },
      (R) => { const o = R.pick(OPEN); const x = simple(R, { kind: R.pick(['name', 'gn']), verbs: [...ER, 'aller', 'faire', 'prendre', 'vouloir'] }); const t = `${o}, ${low(x.S)} ${x.form} ${x.comp}.`;
        return ch(`f95-d-${t}`, 'Trouve le verbe conjugué dans la phrase.', x.form, [x.comp.split(' ').slice(-1)[0], low(x.S).split(' ').slice(-1)[0], o.split(' ').slice(-1)[0]], { n: 4, stimulus: { text: t }, tip: 'Truc : le verbe change si on ajoute « hier » ou « demain ».' }); },
    ],
    3: [
      (R) => { const inf = R.pick(ALLV); const x = simple(R, { kind: R.pick(['name', 'gn', 'pron']), inf });
        const others = R.sample(ALLV.filter((v) => v !== inf), 2);
        return ch(`f95-e-${x.text}`, 'Quel est l’infinitif du verbe de cette phrase?', inf, [x.form, ...others], { n: 4, stimulus: { text: x.text }, tip: T95 }); },
      (R) => { const inf = R.pick(ALLV), p = R.pick(PRON), f = conj(inf, PIDX[p]);
        return hd(`f95-h-${p}-${inf}`, 'Écris l’infinitif de ce verbe.', withP(p, f), inf, T95); },
      (R) => { const er = R.sample(ER, 3), ot = R.sample(Object.keys(IRR).filter((v) => v !== 'aller'), 3);
        const items = [...er.map((v) => ({ v, bin: 0 })), ...ot.map((v) => ({ v, bin: 1 }))].map(({ v, bin }) => { const p = R.pick(PRON); return { text: withP(p, conj(v, PIDX[p])), bin }; });
        return srt(`f95-f-${items.map((i) => i.text).sort().join()}`, 'L’infinitif finit-il par -er?', ['Infinitif en -er', 'Autre infinitif'], R.shuffle(items), 'Trouve l’infinitif dans ta tête : « elle chante » → chanter (-er); « il lit » → lire.'); },
    ],
  });

/* ================================================================== */
/*  Homophones — moteur commun (f96 → f103)                           */
/* ================================================================== */
const fill = (s, ...ws) => { let i = 0; return s.replace(/_{3}/g, () => ws[i++]); };
const capIf = (w, model) => (model.charAt(0) === model.charAt(0).toUpperCase() && model.charAt(0) !== model.charAt(0).toLowerCase() ? cap(w) : w);
const nm = (R) => R.pick([...NF, ...NM]);
const nf = (R) => R.pick(NF);
const nmm = (R) => R.pick(NM);
// cfg : { id, forms, forms1, sub: {forme: substitut}, easy: [R → [phrase, rép]], hard: [...], two: [R → [phrase, [r1, r2]]], dictees: [...], tip }
function homoUnit(c) {
  const forms1 = c.forms1 ?? c.forms;
  const gen = (list, R) => R.pick(list)(R);
  const fillQ = (R, list, forms, tag) => { const [s, a] = gen(list, R); const full = fill(s, a);
    return ch(`${c.id}-${tag}-${s}-${a}`, `Complète avec ${forms.map((f) => `« ${f} »`).join(forms.length > 2 ? ', ' : ' ou ').replace(/, (?=[^,]*$)/, ' ou ')}.`, a, forms.filter((f) => f.toLowerCase() !== a.toLowerCase()).map((f) => capIf(f, a)),
      { n: forms.length, cols: forms.length, stimulus: { text: s }, say: sy(full), tip: c.tip }); };
  const subQ = (R, list) => { const [s, a] = gen(list, R); const key = c.forms.find((f) => f.toLowerCase() === a.toLowerCase());
    const withSub = c.forms.filter((f) => c.sub[f]);
    if (withSub.length === c.forms.length) {
      return ch(`${c.id}-s-${s}-${a}`, 'Quel mot peut remplacer le trou? Utilise le truc!', `${c.sub[key]} → ${a}`, c.forms.filter((f) => f !== key).map((f) => `${c.sub[f]} → ${capIf(f, a)}`), { n: c.forms.length, stimulus: { text: s }, tip: c.tip }); }
    const f0 = withSub[0], other = c.forms.find((f) => f !== f0);
    const yes = `Oui → j’écris « ${capIf(f0, a)} »`, no = `Non → j’écris « ${capIf(other, a)} »`;
    return ch(`${c.id}-s-${s}-${a}`, `Truc : peux-tu dire « ${c.sub[f0]} » à la place du trou?`, key === f0 ? yes : no, [key === f0 ? no : yes], { stimulus: { text: s }, fixedOrder: true, tip: c.tip }); };
  const pickQ = (R, list, forms = c.forms) => { const [s, a] = gen(list, R); const bad = capIf(R.pick(forms.filter((f) => f.toLowerCase() !== a.toLowerCase())), a);
    return ch(`${c.id}-p-${s}-${a}`, 'Quelle phrase est bien écrite?', fill(s, a), [fill(s, bad)], { tip: c.tip }); };
  const twoQ = (R) => { const [s, ans] = gen(c.two, R);
    const combos = []; for (const x of c.forms) for (const y of c.forms) combos.push([capIf(x, ans[0]), capIf(y, ans[1])]);
    const lab2 = ([x, y]) => `${x} … ${y}`;
    return ch(`${c.id}-d-${s}`, 'Deux trous! Choisis la bonne paire.', lab2(ans), R.shuffle(combos.filter(([x, y]) => !(x === ans[0] && y === ans[1]))).map(lab2), { n: 4, cols: 2, stimulus: { text: s }, say: sy(fill(s, ...ans)), tip: c.tip }); };
  const dictQ = (R) => { const s = R.pick(c.dictees); return dict(`${c.id}-w-${s}`, s, c.tip); };
  return unit(c.id, c.icon, c.fr, c.en, c.pfeq, {
    1: [(R) => fillQ(R, c.easy1 ?? c.easy, forms1, 'a'), (R) => fillQ(R, c.easy1 ?? c.easy, forms1, 'a'), (R) => pickQ(R, c.easy1 ?? c.easy, forms1)],
    2: [(R) => fillQ(R, [...c.easy, ...c.hard], c.forms, 'b'), (R) => subQ(R, [...c.easy, ...c.hard]), (R) => subQ(R, [...c.easy, ...c.hard]), (R) => pickQ(R, c.hard)],
    3: [(R) => fillQ(R, c.hard, c.forms, 'c'), (R) => twoQ(R), (R) => twoQ(R), (R) => pickQ(R, c.hard), (R) => dictQ(R)],
  });
}
const OBJ_A = ['un vélo rouge', 'une tuque neuve', 'un petit chien', 'sept ans', 'faim', 'froid', 'mal au ventre', 'une grande sœur', 'un nouveau sac', 'les yeux bleus', 'un gros rhume', 'de la chance', 'peur des araignées', 'un hamster', 'une dent qui branle'];
const PLACES = ['l’école', 'la piscine', 'la bibliothèque', 'la plage', 'la cabane à sucre', 'Montréal', 'Québec', 'la patinoire', 'la maison', 'l’aréna', 'la ferme', 'la pharmacie'];
const GAMES = ['la cachette', 'la marelle', 'la corde à danser', 'la poupée', 'la balle', 'la tague'];
const HOURS = ['huit heures', 'neuf heures', 'midi', 'trois heures', 'quatre heures'];
const THINGS_A = ['une brosse à dents', 'un sac à dos', 'une boîte à lunch', 'une corde à danser', 'un moulin à vent', 'une machine à laver'];

const f96 = homoUnit({
  id: 'f96', icon: '🅰️', fr: 'a ou à', en: 'a or à', forms: ['a', 'à'], sub: { a: 'avait' },
  pfeq: 'Orthographe — homophones a / à (substitution par « avait ») (Progression MEQ, 1er cycle)',
  tip: 'Truc : si tu peux dire « avait », écris a (sans accent). Sinon, écris à.',
  easy: [
    (R) => [`${nm(R)} ${BL} ${R.pick(OBJ_A)}.`, 'a'], (R) => [`Mon ${R.pick(['frère', 'chat', 'voisin', 'oncle'])} ${BL} ${R.pick(OBJ_A)}.`, 'a'],
    (R) => [`${nm(R)} va ${BL} ${R.pick(PLACES)}.`, 'à'], (R) => [`Nous jouons ${BL} ${R.pick(GAMES)}.`, 'à'], (R) => [`L’école commence ${BL} ${R.pick(HOURS)}.`, 'à'],
  ],
  hard: [
    (R) => [`Hier, ${nm(R)} ${BL} ${R.pick(['mangé', 'dessiné', 'gagné', 'trouvé', 'perdu'])} ${R.pick(['un ballon', 'une pomme', 'un trésor', 'un crayon'])}.`, 'a'],
    (R) => [`${nm(R)} ${BL} donné un bisou à sa ${R.pick(['mère', 'sœur', 'tante'])}.`, 'a'],
    (R) => [`J’ai acheté ${R.pick(THINGS_A).replace(' à ', ` ${BL} `)}.`, 'à'],
    (R) => [`${cap(R.pick(['papa', 'maman', 'grand-papa']))} pense ${BL} ${R.pick(['ses vacances', 'son travail', 'notre fête'])}.`, 'à'],
    (R) => [`Le chat ${deN(nm(R))} ${BL} ${R.pick(['attrapé une souris', 'griffé le divan', 'dormi toute la journée'])}.`, 'a'],
    (R) => [`${nm(R)} parle ${BL} ${R.pick(['son ami', 'sa voisine', 'l’enseignante', 'son chien'])}.`, 'à'],
    (R) => [`Il y ${BL} ${R.pick(['de la neige', 'un arc-en-ciel', 'trois chats', 'du soleil'])} ${R.pick(['dehors', 'ce matin', 'aujourd’hui'])}.`, 'a'],
  ],
  two: [
    (R) => [`${nm(R)} ${BL} un nouveau sac ${BL} dos.`, ['a', 'à']], (R) => [`${nm(R)} ${BL} mal ${BL} la tête.`, ['a', 'à']],
    (R) => [`${nm(R)} va ${BL} ${R.pick(PLACES)} et ${BL} hâte de voir ses amis.`, ['à', 'a']],
    (R) => [`Grand-papa ${BL} une maison ${BL} la campagne.`, ['a', 'à']], (R) => [`${nm(R)} ${BL} rendez-vous ${BL} ${R.pick(HOURS)}.`, ['a', 'à']],
    (R) => [`${nm(R)} ${BL} donné un bisou ${BL} sa ${R.pick(['mère', 'sœur', 'tante'])}.`, ['a', 'à']],
    (R) => [`${BL} ${R.pick(HOURS)}, ${nm(R)} ${BL} ${R.pick(['faim', 'sommeil', 'soif'])}.`, ['À', 'a']],
  ],
  dictees: ['Léa a un vélo et elle va à l’école.', 'Mon chien a faim à midi.', 'Il a mal à la tête.', 'Noah a une brosse à dents bleue.', 'Ma sœur a joué à la cachette.', 'Papa a mis la tarte au four à trois heures.'],
});

const INV_ADJ = ['drôle', 'sage', 'calme', 'rapide', 'timide', 'malade', 'gourmand', 'en retard', 'à l’école', 'dans la cour', 'dehors', 'au parc'];
const INV2 = ['drôle', 'sage', 'calme', 'rapide', 'timide', 'malade', 'aimable', 'habile', 'brave', 'tranquille'];
const FRUITS_PL = ['pommes', 'poires', 'bananes', 'fraises', 'bleuets', 'oranges', 'framboises', 'cerises'];
const f97 = homoUnit({
  id: 'f97', icon: '➕', fr: 'et ou est', en: 'et or est', forms: ['et', 'est'], sub: { est: 'était', et: 'et puis' },
  pfeq: 'Orthographe — homophones et / est (substitution par « était » / « et puis ») (Progression MEQ, 1er cycle)',
  tip: 'Truc : si tu peux dire « était », écris est. Si tu peux dire « et puis », écris et.',
  easy: [
    (R) => [`${nm(R)} ${BL} ${R.pick(INV_ADJ)}.`, 'est'], (R) => { const [n, a] = R.pick(pairs.filter(([, x]) => x.pos === 'p')); return [`${cap(gn(n))} ${BL} ${adjForm(a, n.g)}.`, 'est']; },
    (R) => { const [a, b] = R.sample([...NF, ...NM], 2); return [`${a} ${BL} ${b} jouent ensemble.`, 'et']; },
    (R) => { const [a, b] = R.sample(FRUITS_PL, 2); return [`J’aime les ${a} ${BL} les ${b}.`, 'et']; },
  ],
  hard: [
    (R) => [`${nm(R)} prend son sac ${BL} ${R.pick(['part à l’école', 'sort dehors', 'monte dans l’autobus'])}.`, 'et'],
    (R) => [`Le ciel ${BL} ${R.pick(['gris', 'bleu', 'tout noir', 'plein d’étoiles'])} ce soir.`, 'est'],
    (R) => { const [n, a] = R.pick(pairs.filter(([, x]) => x.pos === 'p' && x.f !== x.m)); const b = R.pick(ADJS.filter((x) => x.pos === 'p' && x !== a && okPair(n, x))) ?? ADJS.find((x) => x.m === 'gris'); return [`${cap(gn(n))} ${adjForm(a, n.g)} ${BL} ${adjForm(b, n.g)} ${R.pick(['dort', 'est ici', 'est à moi'])}.`, 'et']; },
    (R) => [`${R.pick(['Où', 'Quand'])} ${BL} ${R.pick(['ta fête', 'le spectacle', 'ton cours de natation', 'la sortie au musée'])}?`, 'est'],
    (R) => [`Ma ${R.pick(['mitaine', 'tuque', 'botte'])} ${BL} ${R.pick(['mouillée', 'trouée', 'perdue', 'sous le banc'])}.`, 'est'],
  ],
  two: [
    (R) => { const [a, b] = R.sample(INV2, 2); return [`${nm(R)} ${BL} ${a} ${BL} ${b}.`, ['est', 'et']]; },
    (R) => [`Le ciel ${BL} gris ${BL} il pleut.`, ['est', 'et']], (R) => [`${nf(R)} ${BL} ${nmm(R)} vont au parc, qui ${BL} tout près.`, ['et', 'est']],
    (R) => { const [a, b] = R.sample(FRUITS_PL, 2); return [`La tarte aux ${a} ${BL} aux ${b} ${BL} délicieuse.`, ['et', 'est']]; },
    (R) => { const N = nm(R); return [`${N} ${BL} ${NF.includes(N) ? 'contente' : 'content'} ${BL} ${NF.includes(N) ? 'elle' : 'il'} saute de joie.`, ['est', 'et']]; },
  ],
  dictees: ['Mon chat est noir et blanc.', 'Léo et Zoé sont dans la cour.', 'La neige est froide et douce.', 'Papa est grand et fort.', 'Le parc est loin et il pleut.', 'Ma tuque est rouge et bleue.'],
});

const MASC_OBJ = ['ballon', 'chapeau', 'vélo', 'crayon', 'livre', 'manteau', 'chien', 'chat', 'sac', 'chandail', 'gâteau', 'dessin', 'lit', 'casque'];
const PL_SUBJ = ['Les enfants', 'Mes amis', 'Les oiseaux', 'Mes cousines', 'Les élèves', 'Ses parents', 'Les chats', 'Mes bottes'];
const f98 = homoUnit({
  id: 'f98', icon: '🎵', fr: 'son ou sont', en: 'son or sont', forms: ['son', 'sont'], sub: { son: 'mon', sont: 'étaient' },
  pfeq: 'Orthographe — homophones son / sont (substitution par « mon » / « étaient ») (Progression MEQ, 1er cycle)',
  tip: 'Truc : si tu peux dire « mon », écris son. Si tu peux dire « étaient », écris sont.',
  easy: [
    (R) => [`${nm(R)} cherche ${BL} ${R.pick(MASC_OBJ)}.`, 'son'], (R) => [`${nm(R)} lave ${BL} ${R.pick(['vélo', 'chien', 'bol', 'visage'])}.`, 'son'],
    (R) => [`${R.pick(PL_SUBJ)} ${BL} ${R.pick(['dans la cour', 'au parc', 'dehors', 'à la maison', 'dans le jardin'])}.`, 'sont'],
    (R) => { const [n, a] = R.pick(pairs.filter(([n, x]) => x.pos === 'p' && NOVAR(n))); return [`${cap(gn(n, null, true))} ${BL} ${adjForm(a, n.g, true)}.`, 'sont']; },
  ],
  hard: [
    (R) => [`${nm(R)} ${R.pick(['prête', 'donne', 'montre'])} ${BL} ${R.pick(MASC_OBJ)} à ${R.pick(['sa sœur', 'son ami', 'sa voisine'])}.`, 'son'],
    (R) => [`Où ${BL} ${R.pick(['mes mitaines', 'les ciseaux', 'tes bottes', 'les crayons'])}?`, 'sont'],
    (R) => [`${nm(R)} et ${BL} ${R.pick(['frère', 'père', 'chien', 'oncle'])} ${R.pick(['jouent au hockey', 'marchent dans le bois', 'font du vélo'])}.`, 'son'],
    (R) => [`Les amis ${deN(nm(R))} ${BL} ${R.pick(['venus à la fête', 'partis en voyage', 'très gentils'])}.`, 'sont'],
    (R) => [`${nf(R)} attend ${BL} amie ${R.pick(['Zoé', 'Alice', 'Mia', 'Rosalie'])}.`, 'son'],
  ],
  two: [
    (R) => [`${nm(R)} et ${BL} frère ${BL} au parc.`, ['son', 'sont']], (R) => [`Les amis ${deN(nm(R))} ${BL} venus voir ${BL} spectacle.`, ['sont', 'son']],
    (R) => [`${nm(R)} cherche ${BL} ${R.pick(MASC_OBJ)}. Ses bottes ${BL} près de la porte.`, ['son', 'sont']],
    (R) => [`Ses parents ${BL} fiers de ${BL} dessin.`, ['sont', 'son']], (R) => [`Où ${BL} les clés de ${BL} auto?`, ['sont', 'son']],
  ],
  dictees: ['Les enfants sont dans la cour.', 'Léo cherche son ballon.', 'Ses amis sont gentils.', 'Zoé et son chien sont au parc.', 'Mes bottes sont près de son sac.', 'Les pommes sont dans son panier.'],
});

const PL_SUBJ2 = ['Les enfants', 'Mes amis', 'Mes parents', 'Les élèves', 'Les loups', 'Mes voisins', 'Les filles'];
const f99 = homoUnit({
  id: 'f99', icon: '🙋', fr: 'on ou ont', en: 'on or ont', forms: ['on', 'ont'], sub: { on: 'il', ont: 'avaient' },
  pfeq: 'Orthographe — homophones on / ont (substitution par « il » / « avaient ») (Progression MEQ, 1er cycle)',
  tip: 'Truc : si tu peux dire « il », écris on. Si tu peux dire « avaient », écris ont.',
  easy: [
    (R) => { const v = R.pick(['jouer', 'manger', 'chanter', 'danser', 'patiner', 'regarder', 'dessiner', 'glisser']); return [`${BL} ${conj(v, 2)} ${R.pick(COMP[v])}.`, 'On']; },
    (R) => [`${R.pick(PL_SUBJ2)} ${BL} ${R.pick(['faim', 'froid', 'un chien', 'de la chance', 'soif', 'congé demain', 'une nouvelle maison'])}.`, 'ont'],
    (R) => [`Ce soir, ${BL} ${R.pick(['mange de la soupe', 'regarde un film', 'joue aux cartes', 'va au cinéma'])}.`, 'on'],
  ],
  hard: [
    (R) => [`Mes ${R.pick(['cousins', 'amies', 'voisins'])} ${BL} ${R.pick(['gagné la partie', 'construit un fort', 'trouvé un trésor', 'fini leur dessin'])}.`, 'ont'],
    (R) => [`Demain, ${BL} va ${R.pick(PLACES.map((p) => (p.startsWith('l') ? 'à ' + p : 'à ' + p)))}.`, 'on'],
    (R) => [`Les ${R.pick(['chats', 'chiens', 'oiseaux', 'poules'])} ${BL} ${R.pick(['peur de l’orage', 'faim le matin', 'des plumes', 'besoin d’eau'])}.`.replace('chats ___ des plumes', 'chats ___ des moustaches').replace('chiens ___ des plumes', 'chiens ___ quatre pattes'), 'ont'],
    (R) => [`Quand il pleut, ${BL} ${R.pick(['reste à l’intérieur', 'saute dans les flaques', 'met ses bottes'])}.`, 'on'],
    (R) => [`Est-ce qu’${BL} peut ${R.pick(['jouer dehors', 'manger une collation', 'aller au parc'])}?`, 'on'],
  ],
  two: [
    (R) => [`Mes amis ${BL} faim, alors ${BL} mange une collation.`, ['ont', 'on']], (R) => [`${BL} dit que les loups ${BL} peur du feu.`, ['On', 'ont']],
    (R) => [`Les élèves ${BL} congé, alors ${BL} va glisser.`, ['ont', 'on']], (R) => [`Quand ${BL} arrive, mes cousins ${BL} déjà fini.`, ['on', 'ont']],
    (R) => [`${BL} sait que ${R.pick(['les ours', 'les castors', 'les écureuils'])} ${BL} besoin de dormir l’hiver.`.replace('les castors ___ besoin de dormir', 'les castors ___ besoin de bois'), ['On', 'ont']],
  ],
  dictees: ['On joue dehors avec mes amis.', 'Les enfants ont faim.', 'On sait que les chats ont des moustaches.', 'Mes parents ont un chalet.', 'Ce soir, on mange de la soupe.', 'Les élèves ont congé demain.'],
});

const f100 = homoUnit({
  id: 'f100', icon: '📍', fr: 'ou ou où', en: 'ou or où', forms: ['ou', 'où'], sub: { ou: 'ou bien' },
  pfeq: 'Orthographe — homophones ou / où (ou bien; où = le lieu) (Progression MEQ, 1er cycle)',
  tip: 'Truc : si tu peux dire « ou bien », écris ou. Si on parle d’un endroit, écris où (avec un accent).',
  easy: [
    (R) => { const [a, b] = R.pick([['des pommes', 'des poires'], ['du lait', 'du jus'], ['le rouge', 'le bleu'], ['une crêpe', 'une gaufre'], ['un chat', 'un chien'], ['la piscine', 'la plage']]); return [`Veux-tu ${a} ${BL} ${b}?`, 'ou']; },
    (R) => [`${BL} est ${R.pick(['mon chandail', 'ta tuque', 'le chat', 'la clé', 'ma mitaine', 'le ballon'])}?`, 'Où'],
    (R) => { const [a, b] = R.sample([...NF, ...NM], 2); return [`${a} ${BL} ${b} va gagner la course.`, 'ou']; },
    (R) => [`${BL} vas-tu ${R.pick(['ce soir', 'après l’école', 'demain', 'cet été'])}?`, 'Où'],
  ],
  hard: [
    (R) => [`Je sais ${BL} ${nm(R)} ${R.pick(['habite', 'cache ses bonbons', 'range son vélo'])}.`, 'où'],
    (R) => [`La ville ${BL} ${nm(R)} habite s’appelle ${R.pick(CITIES)}.`, 'où'],
    (R) => [`On ira au parc ${R.pick(['samedi', 'ce soir', 'demain'])} ${BL} ${R.pick(['dimanche', 'lundi', 'plus tard'])}.`, 'ou'],
    (R) => [`Dis-moi ${BL} tu as mis ${R.pick(['mes bottes', 'la colle', 'mon livre'])}.`, 'où'],
    (R) => [`Tu peux dessiner un ${R.pick(['dragon', 'bateau', 'château'])} ${BL} un ${R.pick(['robot', 'arbre', 'oiseau'])}.`, 'ou'],
  ],
  two: [
    (R) => [`${BL} as-tu mis ta tuque ${BL} tes mitaines?`, ['Où', 'ou']], (R) => [`Je ne sais pas ${BL} aller : au parc ${BL} à la piscine?`, ['où', 'ou']],
    (R) => [`Veux-tu jouer ici ${BL} là ${BL} il y a de l’ombre?`, ['ou', 'où']], (R) => [`${BL} est le chat? Dans la cuisine ${BL} dans le salon?`, ['Où', 'ou']],
  ],
  dictees: ['Où est mon chat?', 'Veux-tu du lait ou du jus?', 'Je sais où tu habites.', 'Où vas-tu, à la plage ou au parc?', 'Le parc où je joue est grand.'],
});

const PRON_V = [['lave', 'lavé'], ['cache', 'caché'], ['lève', 'levé'], ['repose', 'reposé'], ['promène', 'promené'], ['couche', 'couché'], ['dépêche', 'dépêché'], ['baigne', 'baigné'], ['fâche', 'fâché'], ['sauve', 'sauvé'], ['brosse les dents', 'brossé les dents']];
const f101 = homoUnit({
  id: 'f101', icon: '🪞', fr: 'ce ou se (c’est, s’est)', en: 'ce or se (c’est, s’est)', forms: ['ce', 'se'], sub: { ce: 'un', se: 'me' },
  pfeq: 'Orthographe — homophones ce / se, c’est / s’est (Progression MEQ, 1er cycle)',
  tip: 'Truc : « ce » est devant un nom (ce chien → un chien). « se » est devant un verbe (il se lave → je me lave).',
  easy: [
    (R) => { const n = R.pick(NOUNS.filter((x) => x.g === 'm' && !VOW(x.s))); return [`${BL} ${n.s} est ${R.pick(['à moi', 'très beau', 'tout neuf', 'à Léo'])}.`, 'Ce']; },
    (R) => [`${nm(R)} ${BL} ${R.pick(PRON_V)[0]} ${R.pick(['vite', 'le matin', 'tous les jours', 'avant le souper'])}.`, 'se'],
    (R) => [`${BL} ${R.pick(['matin', 'soir'])}, il neige.`, 'Ce'],
  ],
  hard: [
    (R) => [`Le chat ${BL} ${R.pick(['cache sous le lit', 'lave les pattes', 'couche au soleil'])}.`, 'se'],
    (R) => [`Les enfants ${BL} ${R.pick(['baignent dans le lac', 'cachent derrière l’arbre', 'promènent au parc'])}.`, 'se'],
    (R) => [`J’aime ${BL} ${R.pick(['livre', 'gâteau', 'jeu', 'film', 'dessin'])}.`, 'ce'],
    (R) => [`${BL} ${R.pick(['sapin', 'castor', 'bonhomme de neige', 'château'])} est ${R.pick(['immense', 'magnifique', 'tout petit'])}.`, 'Ce'],
  ],
  forms1: ['ce', 'se'],
  two: [
    (R) => [`${BL} soir, ${nm(R)} ${BL} couche tôt.`, ['Ce', 'se']], (R) => [`${BL} chat ${BL} cache sous le lit.`, ['Ce', 'se']],
    (R) => [`${nm(R)} ${BL} lave les mains avant ${BL} repas.`, ['se', 'ce']], (R) => [`Les oiseaux ${BL} posent sur ${BL} grand arbre.`, ['se', 'ce']],
  ],
  dictees: ['Ce chat se cache sous le lit.', 'Ce matin, Léa se lave les mains.', 'C’est mon ami Noah.', 'Le chien s’est sauvé.', 'Ce soir, on se couche tôt.'],
});
// c’est / s’est : les phrases « hard » qui finissent par c’est / s’est utilisent ces deux formes
{
  const base = f101.generate;
  f101.generate = (level, R) => {
    if (level === 3 && R.chance(0.3)) {
      const N = nm(R), f = NF.includes(N); const v = R.pick(PRON_V.slice(0, 10));
      const it = R.pick([[`Hier, ${N} ${BL} ${v[1]}${f ? 'e' : ''}.`, 's’est'], [`${BL} ${R.pick(['mon ami', 'ma tuque', 'l’heure du dîner', 'une belle journée', 'mon tour', 'la fête de Mia'])}.`, 'C’est'],
        [`Le chat ${BL} caché sous le lit.`, 's’est'], [`Regarde, ${BL} un arc-en-ciel!`, 'c’est']]);
      const okForm = it[1];
      return ch(`f101-x-${it[0]}`, 'Complète avec « c’est » ou « s’est ».', okForm, ['c’est', 's’est'].filter((x) => x !== okForm.toLowerCase()).map((x) => capIf(x, okForm)), { cols: 2, stimulus: { text: it[0] }, say: sy(fill(it[0], okForm)), tip: 'C’est = cela est (c’est mon ami). S’est = devant un verbe, quand on parle de soi-même (il s’est levé → je me suis levé).' });
    }
    return base(level, R);
  };
}

const f102 = homoUnit({
  id: 'f102', icon: '🧺', fr: 'mes, mais ou met', en: 'mes, mais or met', forms: ['mes', 'mais', 'met'], sub: { mes: 'tes', mais: 'pourtant', met: 'mettait' },
  pfeq: 'Orthographe — homophones mes / mais / met (Progression MEQ, 1er cycle)',
  tip: 'Mes = à moi (mes jouets → tes jouets). Mais = pourtant. Met = le verbe mettre (il met → il mettait).',
  easy: [
    (R) => [`Je range ${BL} ${R.pick(['jouets', 'crayons', 'livres', 'bottes', 'mitaines', 'cartes'])}.`, 'mes'],
    (R) => [`${nm(R)} ${BL} ${R.pick(['sa tuque', 'ses bottes', 'la table', 'son manteau', 'ses mitaines', 'du sel dans la soupe'])}.`, 'met'],
    (R) => [`Il fait froid, ${BL} il fait soleil.`, 'mais'],
    (R) => { const [a, b] = R.sample(FRUITS_PL, 2); return [`J’aime les ${a}, ${BL} je n’aime pas les ${b}.`, 'mais']; },
  ],
  hard: [
    (R) => [`Je voudrais jouer, ${BL} je suis ${R.pick(['fatigué', 'malade', 'en retard'])}.`, 'mais'],
    (R) => [`${cap(R.pick(['papa', 'maman', 'grand-maman', 'mon frère']))} ${BL} ${R.pick(['le gâteau au four', 'la tarte sur la table', 'les assiettes dans l’armoire'])}.`, 'met'],
    (R) => [`${R.pick(['Hier', 'Ce matin', 'Samedi'])}, j’ai invité ${BL} ${R.pick(['amis', 'cousins', 'voisins'])}.`, 'mes'],
    (R) => [`Le chat ${BL} sa patte sur le ballon.`, 'met'],
    (R) => [`Il neige, ${BL} l’autobus passe quand même.`, 'mais'],
  ],
  two: [
    (R) => [`Papa ${BL} mes bottes au soleil, ${BL} elles sont encore mouillées.`, ['met', 'mais']], (R) => [`J’ai mis ${BL} mitaines, ${BL} j’ai encore froid.`, ['mes', 'mais']],
    (R) => [`${nm(R)} ${BL} son manteau, ${BL} il oublie sa tuque.`, ['met', 'mais']], (R) => [`Je prête ${BL} crayons à ${nm(R)}, qui les ${BL} dans son coffre.`, ['mes', 'met']],
  ],
  dictees: ['Je range mes jouets.', 'Léo met sa tuque, mais il a froid.', 'Mes amis sont gentils.', 'Maman met la table.', 'Il pleut, mais je joue dehors.'],
});

const f103 = homoUnit({
  id: 'f103', icon: '👉', fr: 'la, là ou l’a', en: 'la, là or l’a', forms: ['la', 'là', 'l’a'], forms1: ['la', 'là'], sub: { la: 'une', là: 'ici', 'l’a': 'l’avait' },
  pfeq: 'Orthographe — homophones la / là / l’a (Progression MEQ, 1er cycle)',
  tip: 'Là (avec un accent) = un endroit : on peut dire « ici ». La = devant un nom (la pomme). L’a = l’avait.',
  easy1: [
    (R) => { const n = R.pick(NOUNS.filter((x) => x.g === 'f' && !VOW(x.s))); return [`${nm(R)} ${R.pick(['regarde', 'dessine', 'cherche'])} ${BL} ${n.s}.`, 'la']; },
    (R) => [`${R.pick(['Le chat', 'Ton sac', 'Grand-maman', 'Le ballon'])} est ${BL}.`, 'là'], (R) => [`Pose ta tuque ${BL}, sur le banc.`, 'là'],
    (R) => [`Qui est ${BL}?`, 'là'],
  ],
  easy: [
    (R) => { const n = R.pick(NOUNS.filter((x) => x.g === 'f' && !VOW(x.s))); return [`${nm(R)} ${R.pick(['regarde', 'dessine', 'cherche'])} ${BL} ${n.s}.`, 'la']; },
    (R) => [`${R.pick(['Le chat', 'Ton sac', 'Grand-maman', 'Le ballon'])} est ${BL}.`, 'là'], (R) => [`Pose ta tuque ${BL}, sur le banc.`, 'là'],
    (R) => [`Le ballon? ${nm(R)} ${BL} ${R.pick(['lancé', 'trouvé', 'caché', 'pris'])}.`, 'l’a'],
  ],
  hard: [
    (R) => [`Mon dessin? ${cap(R.pick(['maman', 'papa', 'l’enseignante']))} ${BL} ${R.pick(['aimé', 'affiché', 'gardé'])}.`, 'l’a'],
    (R) => [`Ce chandail-${BL} est trop petit.`, 'là'], (R) => [`${nm(R)} a mangé ${BL} ${R.pick(['soupe', 'tarte', 'banane', 'pomme'])}.`, 'la'],
    (R) => [`Le chien? ${nm(R)} ${BL} promené ce matin.`, 'l’a'], (R) => [`Je t’attends ${BL}, près de ${R.pick(['la porte', 'la clôture', 'la fontaine'])}.`, 'là'],
  ],
  two: [
    (R) => [`${nm(R)} cherche ${BL} clé. Elle est ${BL}, sur la table!`, ['la', 'là']], (R) => [`Mets ${BL} boîte ${BL}, dans le coin.`, ['la', 'là']],
    (R) => [`Le ballon est ${BL}? Oui, ${nm(R)} ${BL} lancé ici.`, ['là', 'l’a']], (R) => [`${BL} tuque de Léo? Il ${BL} oubliée à l’école.`, ['La', 'l’a']],
  ],
  dictees: ['Le chat est là.', 'Zoé mange la pomme.', 'Ma tuque est là, sur la chaise.', 'Le ballon? Léo l’a lancé.'],
});

/* ================================================================== */
/*  f104 — Les synonymes                                              */
/* ================================================================== */
const SYN = {
  1: [['content', 'heureux'], ['joli', 'beau'], ['petit', 'minuscule'], ['gros', 'énorme'], ['vélo', 'bicyclette'], ['auto', 'voiture'], ['soulier', 'chaussure'],
    ['cadeau', 'présent'], ['finir', 'terminer'], ['commencer', 'débuter'], ['ami', 'copain'], ['rire', 'rigoler'], ['sauter', 'bondir'], ['lancer', 'jeter'],
    ['drôle', 'amusant'], ['crier', 'hurler'], ['fatigué', 'épuisé'], ['chemin', 'sentier'], ['bateau', 'navire'], ['peur', 'frayeur'], ['docteur', 'médecin'], ['gentil', 'aimable']],
  2: [['regarder', 'observer'], ['malade', 'souffrant'], ['calme', 'tranquille'], ['triste', 'malheureux'], ['bavarder', 'jaser'], ['magasin', 'boutique'], ['donner', 'offrir'],
    ['courageux', 'brave'], ['peureux', 'craintif'], ['joyeux', 'gai'], ['immense', 'gigantesque'], ['réparer', 'arranger'], ['trouver', 'découvrir'], ['casser', 'briser'],
    ['timide', 'gêné'], ['vite', 'rapidement'], ['parler', 'dire'], ['grimper', 'escalader'], ['dormir', 'sommeiller'], ['rapide', 'vif'], ['maison', 'demeure']],
  3: [['brillant', 'étincelant'], ['examiner', 'inspecter'], ['effrayé', 'terrifié'], ['délicieux', 'savoureux'], ['bâtir', 'construire'], ['murmurer', 'chuchoter'],
    ['apercevoir', 'voir'], ['choisir', 'sélectionner'], ['ancien', 'vieux'], ['cesser', 'arrêter'], ['sale', 'malpropre'], ['affreux', 'épouvantable'], ['habile', 'adroit'],
    ['soudain', 'tout à coup'], ['tranquille', 'paisible'], ['furieux', 'enragé'], ['se dépêcher', 'se presser'], ['aider', 'secourir'], ['bizarre', 'étrange'], ['fâché', 'en colère']],
};
// phrases de contexte : [phrase avec « mot », mot, synonyme, faux choix]
const SYN_CTX = [
  ['Le lion est très « fort ».', 'fort', 'puissant', ['bruyant', 'faible']], ['Ce gâteau est « délicieux ».', 'délicieux', 'savoureux', ['sucré', 'dégoûtant']],
  ['Le bébé « dort » dans son lit.', 'dort', 'sommeille', ['pleure', 'mange']], ['Léo « regarde » les étoiles.', 'regarde', 'observe', ['dessine', 'cache']],
  ['La maison est « immense ».', 'immense', 'gigantesque', ['petite', 'colorée']], ['Zoé est « triste » ce matin.', 'triste', 'malheureuse', ['joyeuse', 'pressée']],
  ['Le renard « se cache » dans le bois.', 'se cache', 'se dissimule', ['se montre', 'se lave']], ['Il « commence » à neiger.', 'commence', 'débute', ['finit', 'cesse']],
  ['Mon frère est « gêné » devant les grands.', 'gêné', 'timide', ['fâché', 'bavard']], ['Le chien « bondit » sur le ballon.', 'bondit', 'saute', ['dort', 'aboie']],
  ['Grand-papa « répare » mon vélo.', 'répare', 'arrange', ['casse', 'lave']], ['Ce film est « amusant ».', 'amusant', 'drôle', ['ennuyant', 'long']],
  ['La rivière est « calme » ce soir.', 'calme', 'tranquille', ['agitée', 'froide']], ['Les enfants « bavardent » dans l’autobus.', 'bavardent', 'jasent', ['dorment', 'chantent']],
  ['Il y a un bruit « étrange » dans le grenier.', 'étrange', 'bizarre', ['joli', 'normal']], ['Papa est « furieux » : le chien a mangé ses bottes!', 'furieux', 'en colère', ['content', 'calme']],
  ['Le pompier « secourt » le chat.', 'secourt', 'aide', ['attrape', 'regarde']], ['Je « termine » mon dessin.', 'termine', 'finis', ['commence', 'colorie']],
];
const pairList = (lv) => SYN[lv].flatMap(([a, b]) => [[a, b], [b, a]]);
const allSynWords = Object.values(SYN).flat(2);
const T104 = 'Des synonymes sont des mots qui veulent presque dire la même chose : content et heureux.';
const f104 = unit('f104', '🟰', 'Les synonymes', 'Synonyms',
  'Vocabulaire — les synonymes (Progression MEQ, 1er cycle)', {
    1: [(R) => { const [a, b] = R.pick(pairList(1)); const w = R.sample(SYN[1].flat().filter((x) => x !== a && x !== b), 2);
      return ch(`f104-a-${a}-${b}-${w.join()}`, 'Quel mot veut dire la même chose?', b, w, { stimulus: { text: a }, tip: T104 }); }],
    2: [
      (R) => { const [a, b] = R.pick(pairList(2)); const w = R.sample(Object.values(SYN).flat(2).filter((x) => x !== a && x !== b), 2);
        return ch(`f104-b-${a}-${b}-${w.join()}`, 'Quel mot veut dire la même chose?', b, w, { stimulus: { text: a }, tip: T104 }); },
      (R) => { const [a, b] = R.pick([...SYN[1], ...SYN[2]]); const [c, d] = R.pick(SYN[2].filter(([x]) => x !== a)); const [e] = R.pick(SYN[1].filter(([x]) => x !== a && x !== c));
        return ch(`f104-c-${a}-${c}-${e}`, 'Quelle paire est faite de synonymes?', `${a} – ${b}`, [`${a} – ${d}`, `${c} – ${e}`], { tip: T104 }); },
    ],
    3: [
      (R) => { const [s, w, r, ws] = R.pick(SYN_CTX);
        return ch(`f104-d-${s}`, 'Quel mot peut remplacer le mot entre « »?', r, ws, { stimulus: { text: s }, tip: 'Remplace le mot dans la phrase : si le sens ne change pas, c’est un synonyme.' }); },
      (R) => { const [a, b] = R.pick(pairList(3)); const w = R.sample(allSynWords.filter((x) => x !== a && x !== b), 3);
        return ch(`f104-e-${a}-${b}-${w.join()}`, 'Quel mot veut dire la même chose?', b, w, { n: 4, stimulus: { text: a }, tip: T104 }); },
      (R) => { const [a, b] = R.pick([...SYN[2], ...SYN[3]]);
        return hd(`f104-f-${a}`, 'Écris un synonyme de ce mot.', a, `un synonyme de « ${a} » (ex. : ${b})`, T104); },
    ],
  });

/* ================================================================== */
/*  f105 — Les antonymes (contraires)                                 */
/* ================================================================== */
const ANT = {
  1: [['grand', 'petit'], ['chaud', 'froid'], ['jour', 'nuit'], ['haut', 'bas'], ['ouvert', 'fermé'], ['plein', 'vide'], ['vite', 'lentement'], ['gros', 'mince'],
    ['jeune', 'vieux'], ['entrer', 'sortir'], ['monter', 'descendre'], ['rire', 'pleurer'], ['devant', 'derrière'], ['dessus', 'dessous'], ['blanc', 'noir'],
    ['propre', 'sale'], ['long', 'court'], ['lourd', 'léger'], ['dur', 'mou'], ['content', 'triste'], ['allumer', 'éteindre'], ['gagner', 'perdre']],
  2: [['avant', 'après'], ['matin', 'soir'], ['été', 'hiver'], ['donner', 'prendre'], ['facile', 'difficile'], ['bruit', 'silence'], ['riche', 'pauvre'],
    ['gentil', 'méchant'], ['clair', 'foncé'], ['arriver', 'partir'], ['acheter', 'vendre'], ['commencer', 'finir'], ['cacher', 'montrer'], ['pousser', 'tirer'],
    ['avancer', 'reculer'], ['sucré', 'salé'], ['courageux', 'peureux'], ['toujours', 'jamais'], ['beaucoup', 'peu'], ['premier', 'dernier'], ['loin', 'près'], ['vrai', 'faux']],
  3: [['possible', 'impossible'], ['heureux', 'malheureux'], ['faire', 'défaire'], ['content', 'mécontent'], ['poli', 'impoli'], ['connu', 'inconnu'],
    ['visible', 'invisible'], ['coller', 'décoller'], ['boutonner', 'déboutonner'], ['habiller', 'déshabiller'], ['plier', 'déplier'], ['couvrir', 'découvrir'],
    ['patient', 'impatient'], ['agréable', 'désagréable'], ['prudent', 'imprudent'], ['honnête', 'malhonnête'], ['adroit', 'maladroit'], ['ranger', 'déranger'],
    ['construire', 'détruire'], ['remplir', 'vider'], ['étroit', 'large'], ['ancien', 'moderne']],
};
// phrases à compléter avec le contraire
const ANT_CTX = [
  ['Le jour, il fait clair. La nuit, il fait ___.', 'noir', ['beau', 'chaud']], ['L’été est chaud. L’hiver est ___.', 'froid', ['long', 'blanc']],
  ['La girafe est grande. La souris est ___.', 'petite', ['grise', 'rapide']], ['Le lièvre court vite. La tortue marche ___.', 'lentement', ['vite', 'loin']],
  ['Mon verre était plein. Maintenant, il est ___.', 'vide', ['cassé', 'rempli']], ['Je monte l’escalier, puis je le ___.', 'descends', ['lave', 'monte']],
  ['Le matin, je me lève. Le soir, je me ___.', 'couche', ['lave', 'lève']], ['Une plume est légère. Une roche est ___.', 'lourde', ['grise', 'petite']],
  ['Hier, Léo a gagné. Aujourd’hui, il a ___.', 'perdu', ['joué', 'couru']], ['Le bébé pleure, puis il ___.', 'rit', ['dort', 'crie']],
  ['La porte est ouverte. Peux-tu la ___?', 'fermer', ['ouvrir', 'peindre']], ['Le gâteau est sucré. Les croustilles sont ___.', 'salées', ['bonnes', 'sucrées']],
  ['Ce casse-tête est facile. Celui-là est ___.', 'difficile', ['amusant', 'petit']], ['Ma grand-mère est vieille. Mon cousin est ___.', 'jeune', ['grand', 'vieux']],
  ['Le chat est dessus la boîte? Non, il est ___.', 'dessous', ['dedans', 'dessus']],
];
const T105 = 'Des antonymes sont des contraires : chaud ↔ froid. On peut aussi ajouter in-, im-, dé- ou mal- : possible ↔ impossible.';
const antPairs = (lv) => ANT[lv].flatMap(([a, b]) => [[a, b], [b, a]]);
const allAnt = Object.values(ANT).flat(2);
const f105 = unit('f105', '↔️', 'Les antonymes (contraires)', 'Antonyms (opposites)',
  'Vocabulaire — les antonymes (Progression MEQ, 1er cycle)', {
    1: [(R) => { const [a, b] = R.pick(antPairs(1)); const w = R.sample(ANT[1].flat().filter((x) => x !== a && x !== b), 2);
      return ch(`f105-a-${a}-${b}-${w.join()}`, 'Quel est le contraire de ce mot?', b, w, { stimulus: { text: a }, tip: T105 }); }],
    2: [
      (R) => { const [a, b] = R.pick(antPairs(2)); const w = R.sample(allAnt.filter((x) => x !== a && x !== b), 2);
        return ch(`f105-b-${a}-${b}-${w.join()}`, 'Quel est le contraire de ce mot?', b, w, { stimulus: { text: a }, tip: T105 }); },
      (R) => { const [a, b] = R.pick([...ANT[1], ...ANT[2]]); const [c] = R.pick(SYN[1].filter(([x]) => x !== a)); const [s1, s2] = R.pick(SYN[1].filter(([x]) => x !== c));
        return ch(`f105-c-${a}-${c}-${s1}`, 'Quelle paire est faite de contraires?', `${a} – ${b}`, [`${s1} – ${s2}`, `${a} – ${R.pick(allAnt.filter((x) => x !== a && x !== b))}`], { tip: T105 }); },
      (R) => { const [s, r, ws] = R.pick(ANT_CTX); return ch(`f105-d-${s}`, 'Complète avec le contraire.', r, ws, { stimulus: { text: s }, tip: T105 }); },
    ],
    3: [
      (R) => { const [a, b] = R.pick(ANT[3]); const pre = b.replace(a, ''); const alts = ['in', 'im', 'dé', 'mal', 'mé', 'dés'].filter((x) => x !== pre).map((x) => x + a);
        return ch(`f105-e-${a}`, 'Quel est le contraire de ce mot?', b, R.sample(alts, 2), { stimulus: { text: a }, tip: 'On peut ajouter un petit morceau au début du mot : in-, im-, dé-, mal-.' }); },
      (R) => { const [a, b] = R.pick(antPairs(3)); const w = R.sample(allAnt.filter((x) => x !== a && x !== b), 3);
        return ch(`f105-f-${a}-${b}-${w.join()}`, 'Quel est le contraire de ce mot?', b, w, { n: 4, stimulus: { text: a }, tip: T105 }); },
      (R) => { const [a, b] = R.pick([...ANT[2], ...ANT[3]]); return hd(`f105-g-${a}`, 'Écris le contraire de ce mot.', a, `le contraire de « ${a} » (ex. : ${b})`, T105); },
    ],
  });

/* ================================================================== */
/*  f106 — Les familles de mots                                       */
/* ================================================================== */
// [mot de base, famille, faux amis (ressemblent mais pas de la famille)]
const FAMS = [
  ['dent', ['dentiste', 'dentifrice', 'dentier', 'édenté'], ['dentelle']], ['fleur', ['fleuriste', 'fleurir', 'fleuri'], ['fleuve']],
  ['terre', ['terrain', 'enterrer', 'atterrir', 'souterrain'], ['terrible']], ['jardin', ['jardinier', 'jardiner', 'jardinage'], ['jaune']],
  ['lait', ['laitier', 'laiterie', 'allaiter'], ['laitue', 'laid']], ['chant', ['chanter', 'chanteur', 'chanson', 'chantonner'], ['champ', 'chandail']],
  ['neige', ['neiger', 'enneigé', 'neigeux'], ['nez', 'neuf']], ['nage', ['nager', 'nageur', 'nageoire'], ['nuage', 'neige']],
  ['dessin', ['dessiner', 'dessinateur'], ['dessert', 'dessous']], ['jour', ['journée', 'journal', 'bonjour', 'aujourd’hui'], ['jouer', 'joue']],
  ['glace', ['glacer', 'glacier', 'glaçon', 'glacial'], ['glisser', 'glaïeul']], ['poisson', ['poissonnerie', 'poissonnier'], ['poison']],
  ['mont', ['montagne', 'montagnard', 'monter'], ['montre']], ['école', ['écolier', 'écolière'], ['écorce', 'écouter']],
  ['froid', ['refroidir', 'froidure'], ['frotter', 'fromage']], ['chaud', ['chaleur', 'chauffer', 'réchauffer'], ['chaussette', 'chausson']],
  ['peur', ['peureux', 'apeuré'], ['peu', 'peuple']], ['jouer', ['jouet', 'joueur'], ['joue', 'jour']], ['lire', ['lecture', 'lecteur', 'relire'], ['lit', 'lion']],
  ['sel', ['salière', 'saler', 'salé'], ['selle']], ['dormir', ['dortoir', 'endormir', 'dormeur'], ['dorer']], ['long', ['longueur', 'allonger', 'longtemps'], ['loin']],
  ['vent', ['venteux', 'éventail'], ['ventre', 'vendre']], ['pomme', ['pommier'], ['pommade']], ['roi', ['royaume', 'royal'], ['roche']],
  ['mer', ['marin', 'marée'], ['merci', 'merle']], ['bois', ['boisé', 'déboiser'], ['boire', 'boîte']], ['porte', ['portière', 'portail'], ['porc', 'port']],
  ['pluie', ['pluvieux', 'parapluie'], ['plume']], ['soleil', ['ensoleillé', 'parasol'], ['sole', 'solide']],
];
const T106 = 'Les mots d’une même famille partagent un morceau (la racine) et parlent de la même idée : dent, dentiste, dentifrice.';
const FAMW = FAMS.flatMap(([b, f]) => [b, ...f]);
const f106 = unit('f106', '👪', 'Les familles de mots', 'Word families',
  'Vocabulaire — les familles de mots (Progression MEQ, 1er cycle)', {
    1: [(R) => { const [b, f] = R.pick(FAMS); const r = R.pick(f); const w = R.sample(FAMS.filter(([x]) => x !== b).map(([x]) => x), 2);
      return ch(`f106-a-${b}-${r}-${w.join()}`, 'Quel mot est de la même famille?', r, w, { stimulus: { text: b }, tip: T106 }); }],
    2: [
      (R) => { const [b, f, faux] = R.pick(FAMS); const r = R.pick(f); const w = [R.pick(faux), R.pick(FAMS.filter(([x]) => x !== b))[0]];
        return ch(`f106-b-${b}-${r}-${w.join()}`, 'Quel mot est de la même famille? Attention aux pièges!', r, w, { stimulus: { text: b }, tip: 'Un mot peut ressembler sans être de la famille : « dentelle » ne parle pas des dents!' }); },
      (R) => { const [b, f] = R.pick(FAMS.filter(([, f]) => f.length >= 2)); const r = R.pick(f); const w = R.sample(FAMS.filter(([x]) => x !== b).map(([x]) => x), 2);
        return ch(`f106-c-${r}-${w.join()}`, 'Quel est le mot de base de ce mot?', b, w, { stimulus: { text: r }, tip: T106 }); },
    ],
    3: [
      (R) => { const [b, f, faux] = R.pick(FAMS.filter(([, f]) => f.length >= 3)); const fam = R.sample([b, ...f], 3), x = R.pick(faux);
        return ch(`f106-d-${fam.join()}-${x}`, 'Trouve l’intrus : quel mot n’est pas de la même famille?', x, fam, { n: 4, tip: T106 }); },
      (R) => { const [A, B] = R.sample(FAMS.filter(([, f]) => f.length >= 2), 2); const a = R.sample([A[0], ...A[1]], 3), b = R.sample([B[0], ...B[1]], 3);
        return srt(`f106-e-${[...a, ...b].sort().join()}`, 'Classe les mots par famille.', [`famille de « ${A[0]} »`, `famille de « ${B[0]} »`], R.shuffle([...a.map((text) => ({ text, bin: 0 })), ...b.map((text) => ({ text, bin: 1 }))]), T106); },
      (R) => { const [b, f] = R.pick(FAMS.filter(([, f]) => f.length >= 2));
        return hd(`f106-f-${b}`, 'Écris un mot de la même famille.', b, `un mot de la famille de « ${b} » (ex. : ${f.join(', ')})`, T106); },
    ],
  });

/* ================================================================== */
/*  f107 — Les mots-étiquettes (catégories)                           */
/* ================================================================== */
const CATS = {
  'des fruits': ['pomme', 'poire', 'banane', 'fraise', 'orange', 'raisin', 'cerise', 'bleuet', 'ananas', 'citron'],
  'des légumes': ['carotte', 'brocoli', 'laitue', 'navet', 'concombre', 'poivron', 'céleri', 'chou', 'radis', 'épinard'],
  'des meubles': ['table', 'chaise', 'lit', 'commode', 'divan', 'bureau', 'armoire', 'bibliothèque', 'tabouret'],
  'des vêtements': ['chandail', 'pantalon', 'robe', 'jupe', 'manteau', 'chemise', 'tuque', 'foulard', 'bas'],
  'des instruments de musique': ['piano', 'guitare', 'violon', 'flûte', 'tambour', 'trompette', 'harpe', 'xylophone'],
  'des moyens de transport': ['autobus', 'train', 'avion', 'vélo', 'bateau', 'métro', 'camion', 'motoneige', 'traversier'],
  'des couleurs': ['rouge', 'bleu', 'vert', 'jaune', 'mauve', 'orange ', 'rose', 'brun', 'gris'],
  'des sports': ['hockey', 'soccer', 'natation', 'ski', 'basketball', 'tennis', 'patinage', 'baseball', 'judo'],
  'des outils': ['marteau', 'scie', 'tournevis', 'pelle', 'râteau', 'clé anglaise', 'perceuse', 'pinceau'],
  'des oiseaux': ['merle', 'corneille', 'hibou', 'canard', 'goéland', 'mésange', 'geai bleu', 'harfang', 'pic'],
  'des insectes': ['fourmi', 'abeille', 'mouche', 'papillon', 'coccinelle', 'sauterelle', 'maringouin', 'libellule', 'guêpe'],
  'des poissons': ['truite', 'saumon', 'requin', 'thon', 'morue', 'doré', 'perchaude', 'brochet'],
  'des fleurs': ['rose', 'tulipe', 'marguerite', 'pissenlit', 'tournesol', 'lys', 'jonquille', 'iris'],
  'des parties du corps': ['bras', 'jambe', 'tête', 'pied', 'main', 'genou', 'coude', 'épaule', 'oreille'],
  'des boissons': ['lait', 'jus', 'eau', 'chocolat chaud', 'limonade', 'tisane'],
  'des desserts': ['gâteau', 'tarte', 'biscuit', 'crème glacée', 'pouding chômeur', 'beigne', 'muffin', 'carré aux dattes'],
  'des saisons': ['printemps', 'été', 'automne', 'hiver'],
  'des jours de la semaine': ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
  'des métiers': ['pompier', 'boulanger', 'policière', 'médecin', 'enseignante', 'plombier', 'fermière', 'dentiste', 'facteur'],
  'des formes': ['cercle', 'carré', 'triangle', 'rectangle', 'losange'],
};
const CATK = Object.keys(CATS);
const SUPER = [['des animaux', ['des oiseaux', 'des insectes', 'des poissons']], ['des aliments', ['des fruits', 'des légumes', 'des desserts']], ['des choses de la maison', ['des meubles']]];
const inCat = (w) => CATK.filter((k) => CATS[k].includes(w));
const T107 = 'Un mot-étiquette est un mot qui regroupe d’autres mots : pomme, poire et banane sont des fruits.';
const f107 = unit('f107', '🗂️', 'Les mots-étiquettes', 'Category words',
  'Vocabulaire — mots-étiquettes (génériques) et catégories (Progression MEQ, 1er cycle)', {
    1: [(R) => { const k = R.pick(CATK.filter((x) => CATS[x].length >= 4)); const ws = R.sample(CATS[k], 3); const w = R.sample(CATK.filter((x) => x !== k), 2);
      return ch(`f107-a-${ws.join()}`, 'Quel mot-étiquette va avec ces mots?', cap(k.replace(/^des /, '')), w.map((x) => cap(x.replace(/^des /, ''))), { stimulus: { text: ws.join(', ') }, tip: T107 }); }],
    2: [
      (R) => { const k = R.pick(CATK.filter((x) => CATS[x].length >= 4)); const ws = R.sample(CATS[k], 3); let x; do x = R.pick(CATS[R.pick(CATK.filter((y) => y !== k))]); while (inCat(x).includes(k));
        return ch(`f107-b-${ws.join()}-${x}`, 'Trouve l’intrus : quel mot ne va pas avec les autres?', x, ws, { n: 4, tip: T107 }); },
      (R) => { const k = R.pick(CATK); const r = R.pick(CATS[k]); const w = R.sample(CATK.filter((x) => x !== k).map((x) => R.pick(CATS[x])).filter((x) => !inCat(x).includes(k)), 2);
        return ch(`f107-c-${k}-${r}-${w.join()}`, `Lequel de ces mots fait partie ${k}?`, r, w, { tip: T107 }); },
    ],
    3: [
      (R) => { const ks = R.sample(CATK.filter((x) => CATS[x].length >= 5), 3); const items = ks.flatMap((k, bin) => R.sample(CATS[k].filter((w) => inCat(w).length === 1), 2).map((text) => ({ text, bin })));
        return srt(`f107-d-${items.map((i) => i.text).sort().join()}`, 'Classe les mots sous le bon mot-étiquette.', ks.map((k) => cap(k.replace(/^des /, ''))), R.shuffle(items), T107); },
      (R) => { const [sup, subs] = R.pick(SUPER.filter(([, s]) => s.length >= 2)); const ws = subs.map((s) => R.pick(CATS[s]));
        const w = R.sample(SUPER.map(([s]) => s).filter((s) => s !== sup), 1).concat(R.pick(subs));
        return ch(`f107-e-${ws.join()}`, 'Quel mot-étiquette est le plus grand? Il regroupe tous ces mots.', cap(sup.replace(/^des /, '')), w.map((x) => cap(x.replace(/^des /, ''))), { stimulus: { text: ws.join(', ') }, tip: 'Un hibou est un oiseau, et un oiseau est un animal : « animaux » est l’étiquette la plus grande.' }); },
      (R) => { const k = R.pick(CATK.filter((x) => CATS[x].length >= 6)); const ws = R.sample(CATS[k], 3);
        return hd(`f107-f-${k}-${ws.join()}`, 'Écris un autre mot qui va dans ce groupe.', `${cap(k.replace(/^des /, ''))} : ${ws.join(', ')}, …`, `un autre mot de la catégorie « ${k.replace(/^des /, '')} » (ex. : ${CATS[k].filter((w) => !ws.includes(w)).slice(0, 3).join(', ')})`, T107); },
    ],
  });

/* ================================================================== */
/*  f108 — L’ordre alphabétique (2e et 3e lettre)                     */
/* ================================================================== */
const AW = [...new Set([...g1, ...g2].map((x) => x.w).filter((x) => /^[a-z]+$/.test(x) && x.length >= 3))];
const BYL = {}; for (const w of AW) (BYL[w[0]] ??= []).push(w);
const LETTERS = Object.keys(BYL).filter((k) => BYL[k].length >= 6);
const cmp = (a, b) => a.localeCompare(b, 'fr');
const T108 = 'Si la 1re lettre est pareille, regarde la 2e lettre. Si elle est pareille aussi, regarde la 3e!';
const pickDiff = (R, k, depth) => { // mots qui ont la même 1re lettre (et 2e si depth 3), mais diffèrent à la position depth
  for (let t = 0; t < 50; t++) {
    const L = R.pick(LETTERS); const pool = depth === 3 ? (() => { const g = {}; for (const w of BYL[L]) (g[w.slice(0, 2)] ??= []).push(w); const ok = Object.values(g).filter((v) => v.length >= k); return ok.length ? R.pick(ok) : []; })() : BYL[L];
    if (pool.length < k) continue;
    const s = R.sample(pool, k); if (new Set(s.map((w) => w[depth - 1])).size === k) return s;
  }
  return ['chat', 'chien', 'cheval'].slice(0, k);
};
const f108 = unit('f108', '🔠', 'L’ordre alphabétique', 'Alphabetical order',
  'Vocabulaire / dictionnaire — ordre alphabétique à la 2e lettre (et 3e lettre) (Progression MEQ, 1er cycle)', {
    1: [(R) => { const s = pickDiff(R, 2, 2); const o = [...s].sort(cmp);
      return ch(`f108-a-${o.join()}`, 'Quel mot vient en premier dans le dictionnaire?', o[0], [o[1]], { cols: 2, tip: T108 }); },
    (R) => { const s = pickDiff(R, 3, 2); const o = [...s].sort(cmp);
      return ch(`f108-b-${o.join()}`, 'Quel mot vient en premier dans le dictionnaire?', o[0], o.slice(1), { cols: 3, tip: T108 }); }],
    2: [
      (R) => { const s = pickDiff(R, R.int(3, 4), 2); const o = [...s].sort(cmp);
        return ord(`f108-c-${o.join()}`, 'Place les mots dans l’ordre alphabétique.', o, { joiner: ' · ', tip: T108 }); },
      (R) => { const s = pickDiff(R, 3, 2); const o = [...s].sort(cmp);
        return ch(`f108-d-${o.join()}`, 'Quel mot vient en dernier dans le dictionnaire?', o[2], o.slice(0, 2), { cols: 3, tip: T108 }); },
    ],
    3: [
      (R) => { const s = pickDiff(R, 3, 3); const o = [...s].sort(cmp);
        return ord(`f108-e-${o.join()}`, 'Place les mots dans l’ordre alphabétique (regarde la 3e lettre!).', o, { joiner: ' · ', tip: T108 }); },
      (R) => { const s = R.sample(AW, 5); const o = [...s].sort(cmp);
        return ord(`f108-f-${o.join()}`, 'Place les mots dans l’ordre alphabétique.', o, { joiner: ' · ', tip: T108 }); },
      (R) => { const L = R.pick(LETTERS); const o = [...BYL[L]].sort(cmp); const i = R.int(1, o.length - 2); const w = o[i];
        const right = `entre « ${o[i - 1]} » et « ${o[i + 1]} »`; const j = (i + 3) % o.length, k2 = (i + Math.floor(o.length / 2)) % o.length;
        const wr = [[o[Math.min(j, o.length - 2)], o[Math.min(j, o.length - 2) + 1]], [o[Math.max(k2 - 1, 0)], o[Math.max(k2 - 1, 0) + 1]]].filter(([a, b]) => !(cmp(a, w) < 0 && cmp(w, b) < 0)).map(([a, b]) => `entre « ${a} » et « ${b} »`);
        if (!wr.length) wr.push(`avant « ${o[0]} »`);
        return ch(`f108-g-${w}`, 'Dans le dictionnaire, où se trouve ce mot?', right, wr, { stimulus: { text: w }, tip: T108 }); },
    ],
  });

/* ================================================================== */
/*  f109 — Mots composés et petits mots dans les grands               */
/* ================================================================== */
// [mot composé, morceaux, sens]
const COMPOSES = [
  ['arc-en-ciel', ['arc', 'en', 'ciel'], 'les couleurs dans le ciel après la pluie'], ['chou-fleur', ['chou', 'fleur'], 'un légume blanc'],
  ['grand-mère', ['grand', 'mère'], 'la mère de ton père ou de ta mère'], ['grand-père', ['grand', 'père'], 'le père de ton père ou de ta mère'],
  ['chauve-souris', ['chauve', 'souris'], 'un animal qui vole la nuit'], ['pomme de terre', ['pomme', 'de', 'terre'], 'une patate'],
  ['porte-monnaie', ['porte', 'monnaie'], 'un petit sac pour l’argent'], ['taille-crayon', ['taille', 'crayon'], 'un objet pour tailler les crayons'],
  ['cerf-volant', ['cerf', 'volant'], 'un jouet qui vole au bout d’une ficelle'], ['chasse-neige', ['chasse', 'neige'], 'un camion qui enlève la neige'],
  ['essuie-glace', ['essuie', 'glace'], 'ce qui essuie la vitre de l’auto'], ['casse-tête', ['casse', 'tête'], 'un jeu de pièces à assembler'],
  ['rouge-gorge', ['rouge', 'gorge'], 'un oiseau à la poitrine rouge'], ['coffre-fort', ['coffre', 'fort'], 'une boîte solide pour cacher des trésors'],
  ['après-midi', ['après', 'midi'], 'le temps entre le dîner et le souper'], ['lave-vaisselle', ['lave', 'vaisselle'], 'une machine qui lave la vaisselle'],
  ['sèche-cheveux', ['sèche', 'cheveux'], 'un appareil pour sécher les cheveux'], ['porte-clés', ['porte', 'clés'], 'un anneau pour garder ses clés'],
  ['gratte-ciel', ['gratte', 'ciel'], 'un immeuble très, très haut'], ['sac à dos', ['sac', 'à', 'dos'], 'un sac qu’on porte sur le dos'],
  ['boîte aux lettres', ['boîte', 'aux', 'lettres'], 'là où le facteur dépose le courrier'], ['brosse à dents', ['brosse', 'à', 'dents'], 'pour se laver les dents'],
  ['pique-nique', ['pique', 'nique'], 'un repas dehors, sur l’herbe'], ['ouvre-boîte', ['ouvre', 'boîte'], 'un outil pour ouvrir les conserves'],
  ['bonhomme de neige', ['bonhomme', 'de', 'neige'], 'un personnage fait de boules de neige'], ['crème glacée', ['crème', 'glacée'], 'un dessert froid'],
  ['presse-citron', ['presse', 'citron'], 'un outil pour faire du jus de citron'], ['garde-robe', ['garde', 'robe'], 'une armoire pour les vêtements'],
];
const PETITS = [['chaton', 'chat'], ['chapeau', 'peau'], ['cartable', 'table'], ['pantalon', 'talon'], ['bonjour', 'jour'], ['champignon', 'champ'], ['oiseau', 'seau'],
  ['fourmi', 'four'], ['lapin', 'pin'], ['sapin', 'pin'], ['bateau', 'eau'], ['dentiste', 'dent'], ['poisson', 'pois'], ['journal', 'jour'], ['lunettes', 'lune'],
  ['parapluie', 'pluie'], ['pommier', 'pomme'], ['bouton', 'bout'], ['ballon', 'bal'], ['montagne', 'mont'], ['ourson', 'ours'], ['framboise', 'bois'], ['pirate', 'rat'],
  ['camion', 'ami'], ['tablette', 'table'], ['couteau', 'cou'], ['cheminée', 'chemin'], ['château', 'chat'], ['marteau', 'art'], ['anniversaire', 'vers'], ['maison', 'mais'],
  ['citrouille', 'trou'], ['ordinateur', 'or'], ['chocolat', 'col'], ['parachute', 'chute'], ['hiver', 'ver'], ['caramel', 'rame'], ['fourchette', 'four'], ['casquette', 'casque'],
  ['pouce', 'pou'], ['épicerie', 'épi'], ['soulier', 'sou'], ['mouton', 'mou'], ['bonbon', 'bon'], ['toupie', 'pie'], ['salami', 'ami']].filter(([b, s]) => b.includes(s));
const SMALLW = [...new Set(PETITS.map(([, s]) => s))];
const T109 = 'Un mot composé est fait de plusieurs mots collés ensemble, souvent avec un trait d’union : arc-en-ciel.';
const f109 = unit('f109', '🧩', 'Mots composés et petits mots', 'Compound words and hidden words',
  'Vocabulaire — mots composés; petits mots dans les grands (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const [w, p] = R.pick(COMPOSES); const o = R.sample(COMPOSES.filter(([x]) => x !== w), 2).map(([x]) => x);
        return ch(`f109-a-${w}-${o.join()}`, 'Quel mot composé forme-t-on avec ces mots?', w, o, { stimulus: { text: p.join(' + ') }, tip: T109 }); },
      (R) => { const [big, small] = R.pick(PETITS); const w = R.sample(SMALLW.filter((x) => !big.includes(x)), 2);
        return ch(`f109-b-${big}-${w.join()}`, 'Quel petit mot se cache dans ce mot?', small, w, { stimulus: { text: big }, tip: 'Regarde bien les lettres du grand mot : un petit mot se cache dedans!' }); },
    ],
    2: [
      (R) => { const [w, p] = R.pick(COMPOSES); const ex = R.pick(COMPOSES.filter(([x]) => x !== w))[1][0];
        return ord(`f109-c-${w}`, 'Construis le mot composé.', p, { joiner: w.includes('-') ? '-' : ' ', extra: p.includes(ex) ? undefined : [ex], tip: T109 }); },
      (R) => { const [w, , s] = R.pick(COMPOSES); const o = R.sample(COMPOSES.filter(([x]) => x !== w), 2).map(([, , x]) => x);
        return ch(`f109-d-${w}-${o.join()}`, 'Que veut dire ce mot composé?', s, o, { stimulus: { text: w }, tip: 'Les morceaux du mot composé aident souvent à deviner son sens : un taille-crayon taille les crayons.' }); },
      (R) => { const [big, small] = R.pick(PETITS); const w = R.sample(SMALLW.filter((x) => !big.includes(x)), 3);
        return ch(`f109-e-${big}-${w.join()}`, 'Quel petit mot se cache dans ce mot?', small, w, { n: 4, stimulus: { text: big }, tip: 'Cache le début ou la fin du mot avec ton doigt.' }); },
    ],
    3: [
      (R) => { const small = R.pick(SMALLW.filter((s) => PETITS.filter(([, x]) => x === s).length >= 1)); const withIt = PETITS.filter(([b]) => b.includes(small)).map(([b]) => b);
        const without = R.pick(PETITS.map(([b]) => b).filter((b) => !b.includes(small))); const yes = R.sample(withIt.length >= 2 ? withIt : [...withIt, ...PETITS.map(([b]) => b).filter((b) => b.includes(small))], Math.min(2, withIt.length));
        return ch(`f109-f-${small}-${without}-${yes.join()}`, `Quel mot ne contient pas le petit mot « ${small} »?`, without, yes, { tip: 'Cherche le petit mot lettre par lettre dans chaque grand mot.' }); },
      (R) => { const [a, b] = R.sample(COMPOSES, 2); const right = a[0]; const fake = `${a[1][0]}-${b[1][b[1].length - 1]}`;
        return ch(`f109-g-${a[0]}-${b[0]}`, 'Lequel est un vrai mot composé?', right, [fake, `${b[1][b[1].length - 1]}-${a[1][0]}`].filter((x) => !COMPOSES.some(([c]) => c === x)), { tip: T109 }); },
      (R) => { const [w, p] = R.pick(COMPOSES.filter(([w]) => w.includes('-')));
        return hd(`f109-h-${w}`, 'Écris le mot composé avec ses traits d’union.', p.join(' + '), w, 'N’oublie pas les traits d’union (-) entre les morceaux.'); },
    ],
  });

/* ================================================================== */
/*  f110 — Le sens des mots en contexte                               */
/* ================================================================== */
// [mot, [phrase, sens, emoji], …]
const POLY = [
  ['souris', ['La souris mange du fromage.', 'un petit animal', '🐭'], ['Je clique avec la souris de l’ordinateur.', 'un objet pour l’ordinateur', '🖱️']],
  ['feuille', ['La feuille rouge tombe de l’arbre.', 'une partie d’un arbre', '🍁'], ['J’écris mon nom sur une feuille.', 'un papier', '📄']],
  ['glace', ['Nous patinons sur la glace.', 'de l’eau gelée', '🧊'], ['Je me regarde dans la glace.', 'un miroir', '🪞']],
  ['carte', ['Papa regarde la carte pour trouver la route.', 'un plan', '🗺️'], ['J’envoie une carte de fête à grand-maman.', 'une carte de souhaits', '💌'], ['Nous jouons aux cartes.', 'une carte à jouer', '🃏']],
  ['avocat', ['Je mange un avocat dans ma salade.', 'un fruit vert', '🥑'], ['L’avocat défend son client au tribunal.', 'un métier', '⚖️']],
  ['queue', ['Le chien remue la queue.', 'une partie d’un animal', '🐕'], ['Nous faisons la queue pour le manège.', 'une file d’attente', '🚶']],
  ['lettre', ['J’écris une lettre à mon ami.', 'un message', '✉️'], ['A est la première lettre de l’alphabet.', 'un signe de l’alphabet', '🔤']],
  ['pièce', ['J’ai une pièce de monnaie.', 'de l’argent', '🪙'], ['Ma maison a six pièces.', 'une salle', '🏠'], ['Il manque une pièce au casse-tête.', 'un morceau', '🧩']],
  ['bouton', ['Mon manteau a cinq boutons.', 'pour fermer un vêtement', '🧥'], ['Appuie sur le bouton pour allumer.', 'pour faire marcher une machine', '🔘'], ['J’ai un bouton sur le nez.', 'une petite bosse sur la peau', '🤕']],
  ['voler', ['L’oiseau vole dans le ciel.', 'se déplacer dans l’air', '🐦'], ['Le renard veut voler une poule.', 'prendre ce qui n’est pas à soi', '🦊']],
  ['pied', ['Je me suis fait mal au pied.', 'une partie du corps', '🦶'], ['Le pied de la table est cassé.', 'ce qui tient la table', '🪑']],
  ['marche', ['Attention à la marche de l’escalier!', 'une partie de l’escalier', '🪜'], ['Nous faisons une marche en forêt.', 'une promenade', '🥾']],
  ['verre', ['Je bois un verre de lait.', 'un récipient pour boire', '🥛'], ['La fenêtre est en verre.', 'une matière transparente', '🪟']],
  ['livre', ['Je lis un livre de contes.', 'un objet pour lire', '📖'], ['Ce sac de patates pèse cinq livres.', 'une mesure de poids', '⚖️']],
  ['bois', ['La table est en bois.', 'la matière des arbres', '🪵'], ['Nous marchons dans le bois.', 'une petite forêt', '🌲'], ['Je bois de l’eau.', 'le verbe boire', '🥤']],
  ['temps', ['Quel temps fait-il dehors?', 'la météo', '⛅'], ['Je n’ai pas le temps de jouer.', 'la durée', '⏰']],
  ['tour', ['C’est ton tour de lancer le dé.', 'le moment de jouer', '🎲'], ['Le roi habite dans une tour.', 'une construction haute', '🏰']],
  ['vers', ['Le poète écrit des vers.', 'une ligne de poème', '📜'], ['Le pêcheur met des vers sur son hameçon.', 'de petits animaux', '🪱']],
  ['mousse', ['La mousse pousse sur la roche.', 'une petite plante', '🌿'], ['Il y a de la mousse dans mon bain.', 'des bulles', '🛁']],
  ['orange', ['Je mange une orange juteuse.', 'un fruit', '🍊'], ['Mon chandail est orange.', 'une couleur', '🟠']],
  ['chou', ['Le lapin mange un chou.', 'un légume', '🥬'], ['Viens ici, mon petit chou!', 'un mot doux pour un enfant', '🥰']],
  ['bouchon', ['Je mets le bouchon sur la bouteille.', 'ce qui ferme une bouteille', '🍾'], ['Il y a un bouchon sur l’autoroute.', 'beaucoup d’autos arrêtées', '🚗']],
  ['raquette', ['Je frappe la balle avec ma raquette.', 'pour jouer au tennis', '🎾'], ['On marche dans la neige avec des raquettes.', 'pour marcher sur la neige', '❄️']],
  ['canne', ['Grand-papa marche avec une canne.', 'un bâton pour marcher', '🦯'], ['Une canne de bonbon pend dans le sapin.', 'un bonbon de Noël', '🍬']],
  ['pêche', ['Je mange une pêche bien mûre.', 'un fruit', '🍑'], ['Nous partons à la pêche au lac.', 'attraper des poissons', '🎣']],
  ['lit', ['Je dors dans mon lit.', 'un meuble pour dormir', '🛏️'], ['Ma sœur lit un livre.', 'le verbe lire', '📖']],
  ['ferme', ['Les vaches vivent à la ferme.', 'un endroit avec des animaux', '🚜'], ['Papa ferme la porte.', 'le verbe fermer', '🚪']],
  ['manche', ['La manche de mon chandail est trop longue.', 'une partie d’un vêtement', '👕'], ['Le manche du balai est cassé.', 'ce qu’on tient dans la main', '🧹']],
  ['plume', ['L’oiseau perd une plume.', 'ce qui couvre l’oiseau', '🪶'], ['J’écris avec une plume et de l’encre.', 'un objet pour écrire', '✒️']],
  ['tableau', ['L’enseignante écrit au tableau.', 'là où on écrit en classe', '🏫'], ['Un beau tableau est accroché au musée.', 'une peinture', '🖼️']],
];
const POLYQ = POLY.flatMap(([w, ...s]) => s.map((x, i) => ({ w, s: x[0], m: x[1], e: x[2], others: s.filter((_, j) => j !== i) })));
// expressions imagées : [expression, sens, faux sens]
const EXPR = [
  ['Il pleut à boire debout.', 'Il pleut très fort.', ['On a soif.', 'Il fait beau.']], ['Léo est dans la lune.', 'Il est distrait, il rêve.', ['Il est astronaute.', 'Il dort dehors.']],
  ['J’ai un chat dans la gorge.', 'J’ai la voix enrouée.', ['J’ai avalé un chat.', 'J’ai faim.']], ['Je donne ma langue au chat.', 'Je ne trouve pas la réponse.', ['Je nourris mon chat.', 'Je tire la langue.']],
  ['Ce jouet coûte les yeux de la tête.', 'Il coûte très cher.', ['Il fait peur.', 'Il est gratuit.']], ['J’ai des fourmis dans les jambes.', 'J’ai envie de bouger.', ['J’ai des insectes sur moi.', 'J’ai mal aux jambes.']],
  ['Papa s’est levé du mauvais pied.', 'Il est de mauvaise humeur.', ['Il s’est fait mal.', 'Il s’est levé tôt.']], ['Il fait un froid de canard.', 'Il fait très froid.', ['Les canards ont froid.', 'Il fait chaud.']],
  ['Viens mettre la main à la pâte!', 'Viens aider.', ['Viens faire du pain.', 'Viens te laver les mains.']], ['J’ai une faim de loup.', 'J’ai très faim.', ['J’ai peur des loups.', 'Je n’ai pas faim.']],
  ['Ma tante a le cœur sur la main.', 'Elle est généreuse.', ['Elle a mal au cœur.', 'Elle porte un bijou.']], ['Je dors sur mes deux oreilles.', 'Je dors tranquille, sans m’inquiéter.', ['Je dors mal.', 'J’ai mal aux oreilles.']],
  ['Elle a la tête dans les nuages.', 'Elle rêve.', ['Elle est très grande.', 'Elle est en avion.']], ['Ce n’est pas la mer à boire.', 'Ce n’est pas si difficile.', ['L’eau est salée.', 'Il ne faut pas boire.']],
  ['Il est rusé comme un renard.', 'Il est très malin.', ['Il est roux.', 'Il court vite.']], ['Mon frère est têtu comme une mule.', 'Il ne change jamais d’idée.', ['Il est fort.', 'Il aime les animaux.']],
];
// mot inconnu deviné grâce au contexte : [phrase, mot, sens, faux sens]
const GUESS = [
  ['Le bambin, qui n’a que deux ans, fait une sieste.', 'bambin', 'un jeune enfant', ['un vieil homme', 'un animal']], ['Le lac est si froid qu’il est glacial.', 'glacial', 'très froid', ['très chaud', 'très profond']],
  ['Affamé, le loup dévore tout le repas en une minute.', 'dévore', 'mange très vite', ['regarde', 'cuisine']], ['Le chiot est minuscule : il tient dans ma main.', 'minuscule', 'très petit', ['très lourd', 'très gentil']],
  ['Après la course, Zoé est épuisée et s’assoit.', 'épuisée', 'très fatiguée', ['très contente', 'très rapide']], ['Le vieux pont est fragile : il pourrait casser.', 'fragile', 'qui se brise facilement', ['très solide', 'très long']],
  ['Le chat, curieux, renifle chaque boîte.', 'renifle', 'sent avec son nez', ['lance', 'mange']], ['La soupe est brûlante : attends avant de la boire!', 'brûlante', 'très chaude', ['très salée', 'froide']],
  ['Le ciel s’assombrit : un orage approche.', 's’assombrit', 'devient sombre', ['devient bleu', 'devient chaud']], ['Les élèves chuchotent pour ne pas réveiller le bébé.', 'chuchotent', 'parlent tout bas', ['crient', 'chantent']],
  ['Le géant est colossal, plus haut qu’une maison.', 'colossal', 'immense', ['minuscule', 'gentil']], ['L’écureuil grignote une noisette.', 'grignote', 'mange par petits morceaux', ['lance', 'cache']],
];
const T110 = 'Un mot peut avoir plusieurs sens. Lis toute la phrase pour trouver le bon!';
const f110 = unit('f110', '💡', 'Le sens des mots', 'Word meaning in context',
  'Vocabulaire — sens des mots selon le contexte; expressions (Progression MEQ, 1er cycle)', {
    1: [(R) => { const q = R.pick(POLYQ);
      return ch(`f110-i-${q.s}`, `Quelle image montre le sens de « ${q.w} » dans cette phrase?`, { emoji: q.e }, q.others.map((o) => ({ emoji: o[2] })), { n: 3, cols: 3, stimulus: { text: q.s }, say: sy(q.s), tip: T110 }); },
      (R) => { const q = R.pick(POLYQ);
      return ch(`f110-a-${q.s}`, `Dans cette phrase, que veut dire « ${q.w} »?`, { text: q.m, emoji: q.e }, q.others.map((o) => ({ text: o[1], emoji: o[2] })), { n: 3, stimulus: { text: q.s }, say: sy(q.s), tip: T110 }); }],
    2: [
      (R) => { const q = R.pick(POLYQ); const extra = R.pick(POLYQ.filter((x) => x.w !== q.w));
        return ch(`f110-b-${q.s}-${extra.m}`, `Dans cette phrase, que veut dire « ${q.w} »?`, q.m, [...q.others.map((o) => o[1]), extra.m], { n: 3, stimulus: { text: q.s }, tip: T110 }); },
      (R) => { const [s, w, m, ws] = R.pick(GUESS);
        return ch(`f110-c-${s}`, `Devine le sens du mot « ${w} » grâce à la phrase.`, m, ws, { stimulus: { text: s }, tip: 'Les autres mots de la phrase sont des indices!' }); },
    ],
    3: [
      (R) => { const [e, m, ws] = R.pick(EXPR);
        return ch(`f110-d-${e}`, 'Que veut dire cette expression?', m, ws, { stimulus: { text: e }, tip: 'Une expression ne veut pas dire exactement ce que disent les mots. C’est une image!' }); },
      (R) => { const [w, a, b] = R.pick(POLY); const [x, y] = R.sample([a, b], 2);
        return ch(`f110-e-${w}-${x[0]}`, `Dans quelle phrase « ${w} » veut dire « ${x[1]} »?`, x[0], [y[0]], { tip: T110 }); },
      (R) => { const [s, w, m, ws] = R.pick(GUESS); return ch(`f110-f-${s}`, `Quel mot pourrait remplacer « ${w} »?`, m, ws, { stimulus: { text: s }, tip: 'Essaie chaque réponse dans la phrase.' }); },
    ],
  });

/* ================================================================== */
/*  f111 — Les mots et expressions du Québec                          */
/* ================================================================== */
// [mot québécois, sens, emoji, mot de France]
const QC = [
  ['une tuque', 'un bonnet chaud pour l’hiver', '🧶', 'un bonnet'], ['des mitaines', 'des gants sans doigts séparés', '🧤', 'des moufles'],
  ['un dépanneur', 'un petit magasin du coin', '🏪', 'une épicerie de quartier'], ['un chandail', 'un vêtement pour le haut du corps', '👕', 'un pull'],
  ['des espadrilles', 'des souliers de sport', '👟', 'des baskets'], ['des bas', 'ce qu’on met dans ses souliers', '🧦', 'des chaussettes'],
  ['des gougounes', 'des sandales de plage', '🩴', 'des tongs'], ['un bleuet', 'un petit fruit bleu', '🫐', 'une myrtille'],
  ['du blé d’Inde', 'un épi jaune qu’on mange l’été', '🌽', 'du maïs'], ['un traîneau', 'pour glisser dans la neige', '🛷', 'une luge'],
  ['un courriel', 'un message envoyé par Internet', '📧', 'un e-mail'], ['la fin de semaine', 'le samedi et le dimanche', '📅', 'le week-end'],
  ['magasiner', 'aller dans les magasins', '🛍️', 'faire du shopping'], ['un toutou', 'un animal en peluche', '🧸', 'une peluche'],
  ['un cellulaire', 'un téléphone qu’on apporte partout', '📱', 'un portable'], ['un foulard', 'ce qu’on met autour du cou', '🧣', 'une écharpe'],
  ['une débarbouillette', 'une petite serviette pour se laver', '🧼', 'un gant de toilette'], ['jaser', 'parler avec quelqu’un', '💬', 'bavarder'],
  ['un stationnement', 'un endroit où on gare les autos', '🅿️', 'un parking'], ['une suce', 'ce que le bébé met dans sa bouche', '👶', 'une tétine'],
  ['la poudrerie', 'de la neige soulevée par le vent', '🌨️', 'la neige qui tourbillonne'], ['un banc de neige', 'un gros tas de neige', '⛄', 'un tas de neige'],
  ['une patate', 'un légume qui pousse dans la terre', '🥔', 'une pomme de terre'], ['une sacoche', 'un sac à main', '👜', 'un sac à main'],
];
const MEALS = [['le matin', 'le déjeuner'], ['le midi', 'le dîner'], ['le soir', 'le souper']];
const QC_EXPR = [
  ['Attache ta tuque avec de la broche!', 'Prépare-toi, ça va aller vite!', ['Il fait froid dehors.', 'Ta tuque est trop grande.']],
  ['Je suis aux oiseaux!', 'Je suis très content.', ['Je suis dans un arbre.', 'J’ai peur des oiseaux.']],
  ['Lâche pas la patate!', 'Continue, n’abandonne pas!', ['Ne mange pas trop de patates.', 'Tiens bien ta collation.']],
  ['C’est de valeur.', 'C’est dommage.', ['C’est très cher.', 'C’est un trésor.']],
  ['Il est vite sur ses patins.', 'Il comprend et réagit vite.', ['Il patine très vite.', 'Il a de nouveaux patins.']],
  ['J’ai de la misère avec mes devoirs.', 'J’ai de la difficulté.', ['Je n’ai pas de devoirs.', 'Je fais mes devoirs vite.']],
  ['Ma sœur fait la baboune.', 'Elle boude.', ['Elle fait une grimace de singe.', 'Elle rit.']],
  ['Tire-toi une bûche!', 'Prends une chaise et assieds-toi.', ['Va chercher du bois.', 'Fais un feu.']],
  ['Papa est en beau fusil.', 'Il est très fâché.', ['Il va à la chasse.', 'Il est très beau.']],
  ['On va prendre une marche.', 'On va faire une promenade.', ['On va monter l’escalier.', 'On va courir.']],
  ['J’ai les yeux dans la graisse de bines.', 'Je suis très fatigué.', ['J’ai mangé des fèves.', 'J’ai mal aux yeux.']],
  ['Il s’est fait passer un sapin.', 'Il s’est fait tromper.', ['Il a reçu un arbre de Noël.', 'Il est tombé dans la forêt.']],
  ['Ça me tente!', 'J’en ai envie.', ['Ça me fait peur.', 'Je suis fatigué.']],
];
const T111 = 'Au Québec, on a nos propres mots et expressions! Le matin, on déjeune; le midi, on dîne; le soir, on soupe.';
const f111 = unit('f111', '⚜️', 'Mots du Québec', 'Québec words',
  'Vocabulaire — mots et expressions du français québécois (déjeuner, dîner, souper, tuque, mitaines, dépanneur…) (Progression MEQ, 1er cycle)', {
    1: [
      (R) => { const [w, m, e] = R.pick(QC); const o = R.sample(QC.filter(([x]) => x !== w), 2);
        return ch(`f111-a-${w}-${o.map((x) => x[0]).join()}`, `Au Québec, ${w.replace(/^(un|une|des|du|la|le) /, (d) => d)}, c’est…`, { text: m, emoji: e }, o.map(([, mm, ee]) => ({ text: mm, emoji: ee })), { tip: T111 }); },
      (R) => { const [when, meal] = R.pick(MEALS); const N = nm(R);
        return ch(`f111-b-${N}-${when}`, `Au Québec, quel repas ${N} mange-t-il ${when}?`.replace(/mange-t-il/, NF.includes(N) ? 'mange-t-elle' : 'mange-t-il'), meal, MEALS.map(([, m]) => m).filter((m) => m !== meal), { fixedOrder: false, tip: T111 }); },
    ],
    2: [
      (R) => { const [w, , e, f] = R.pick(QC); const o = R.sample(QC.filter(([x]) => x !== w), 2).map(([x]) => x);
        return ch(`f111-c-${w}-${o.join()}`, `En France, on dit « ${f} ». Au Québec, on dit…`, w, o, { stimulus: { emoji: e }, tip: T111 }); },
      (R) => { const [w, m] = R.pick(QC); const o = R.sample(QC.filter(([x]) => x !== w), 3).map(([, x]) => x);
        return ch(`f111-d-${w}-${o.join()}`, 'Que veut dire ce mot du Québec?', m, o, { n: 4, stimulus: { text: w }, tip: T111 }); },
      (R) => { const k = R.int(0, 2), h = [['7 h', '8 h'], ['midi', '12 h 30'], ['18 h', '17 h 30']][k]; const N = nm(R); const t = R.pick(h);
        const food = [['des céréales', 'des rôties', 'une crêpe'], ['un sandwich', 'une soupe', 'des restes'], ['du spaghetti', 'du pâté chinois', 'de la tourtière']][k];
        return ch(`f111-e-${N}-${t}-${k}`, 'Quel repas est-ce?', MEALS[k][1], MEALS.map(([, m]) => m).filter((_, i) => i !== k), { stimulus: { text: `À ${t}, ${N} mange ${R.pick(food)}.` }, tip: T111 }); },
    ],
    3: [
      (R) => { const [e, m, ws] = R.pick(QC_EXPR); return ch(`f111-f-${e}`, 'Que veut dire cette expression québécoise?', m, ws, { stimulus: { text: e }, tip: 'Les expressions du Québec sont pleines d’images. Pense au sens, pas aux mots un par un!' }); },
      (R) => { const [w, , , f] = R.pick(QC); const [w2, , , f2] = R.pick(QC.filter(([x]) => x !== w));
        return ch(`f111-g-${w}-${w2}`, 'Quelle paire va ensemble? (Québec – France)', `${w} – ${f}`, [`${w} – ${f2}`, `${w2} – ${f}`], { tip: T111 }); },
      (R) => { const [e, m, ws] = R.pick(QC_EXPR); const o = R.pick(EXPR);
        return ch(`f111-h-${e}-${o[0]}`, `Quelle phrase veut dire « ${m.replace(/[.!]$/, '').toLowerCase()} »?`, e, [o[0], R.pick(QC_EXPR.filter(([x]) => x !== e))[0]], { tip: T111 }); },
    ],
  });

/* ================================================================== */
/*  Lecture — moteur commun (un texte par partie, via session)        */
/* ================================================================== */
// gt : remplace {N} (prénom), {Il}/{il}, {lui}, {e}, et {masc|fém} selon le genre du personnage
const queN = (N) => (VOW(N) ? `qu’${N}` : `que ${N}`);
const gt = (s, N, f) => s.replace(/(^|[^a-zà-ÿ’])de \{N\}/g, (m0, pre) => pre + deN(N)).replace(/(^|[^a-zà-ÿ’])que \{N\}/g, (m0, pre) => pre + (VOW(N) ? `qu’${N}` : `que ${N}`)).replace(/\{N\}/g, N).replace(/\{Il\}/g, f ? 'Elle' : 'Il').replace(/\{il\}/g, f ? 'elle' : 'il').replace(/\{lui\}/g, f ? 'elle' : 'lui')
  .replace(/\{e\}/g, f ? 'e' : '').replace(/\{([^{}|]*)\|([^{}]*)\}/g, (_, m, w) => (f ? w : m));
const hero = (R) => { const f = R.chance(0.5); return { N: R.pick(f ? NF : NM), f }; };
// Q de lecture : { key, prompt, right, wrongs, n? , keypad? }
function readQ(uid, level, tx, q, first) {
  const body = q.stimText ?? tx.text;
  const stim = { text: tx.title ? `${tx.title}\n\n${body}` : body };
  const sayIt = level === 1 && first ? sy(`${tx.text} ${q.prompt}`) : (q.fixedSay ? fx(q.prompt) : sy(q.prompt));
  if (q.keypad != null) return { type: 'keypad', key: `${uid}-${q.key}`, prompt: q.prompt, say: sayIt, stimulus: stim, answer: q.keypad, tip: q.tip };
  if (q.tiles) return ord(`${uid}-${q.key}`, q.prompt, q.tiles, { joiner: ' → ', stimulus: stim, say: sayIt, tip: q.tip });
  return ch(`${uid}-${q.key}`, q.prompt, q.right, q.wrongs, { n: q.n ?? (level === 1 ? 3 : 4), stimulus: stim, say: sayIt, tip: q.tip });
}
// make(level, R) → { title?, text, key, qs: [...] }
const readUnit = (id, icon, fr, en, pfeq, make, nq = 5) => {
  const one = (level, R) => { const tx = make(level, R); const qs = tx.qs.map((q) => ({ ...q, key: `${tx.key}-${q.key}` })); return { tx, qs }; };
  return {
    id, icon, title: { fr, en }, pfeq,
    generate(level, R) { const { tx, qs } = one(level, R); return readQ(id, level, tx, R.pick(qs), true); },
    // une partie = UN texte, ses questions dans l’ordre
    session(level, R) { const { tx, qs } = one(level, R); return qs.slice(0, nq).map((q, i) => readQ(id, level, tx, q, i === 0)); },
    allSay() { return collectFixed(this); },
  };
};

/* ================================================================== */
/*  f112 — Personnages, lieu et temps                                 */
/* ================================================================== */
const SCENES = [
  { id: 'pat', lieu: 'à la patinoire du parc', court: 'à la patinoire', s: ['hiver'], act: ['patine en faisant des huit', 'joue au hockey', 'fait des tours de patinoire'], clue: 'Les lames des patins glissent sur la glace, et de la musique joue dans les haut-parleurs.' },
  { id: 'pla', lieu: 'à la plage du lac', court: 'à la plage', s: ['été'], act: ['bâtit un château de sable', 'ramasse des coquillages', 'nage près du quai'], clue: 'Le sable chaud brûle les pieds, et les vagues viennent mouiller les orteils.' },
  { id: 'cab', lieu: 'à la cabane à sucre', court: 'à la cabane à sucre', s: ['printemps'], act: ['mange de la tire sur la neige', 'fait une promenade en carriole', 'goûte au sirop d’érable'], clue: 'Ça sent bon le sirop qui bout, et on verse de la tire sur la neige.' },
  { id: 'bib', lieu: 'à la bibliothèque', court: 'à la bibliothèque', s: ['hiver', 'printemps', 'automne'], act: ['choisit trois livres', 'écoute l’heure du conte', 'lit une bande dessinée'], clue: 'Il y a des étagères pleines de livres, et tout le monde parle à voix basse.' },
  { id: 'ver', lieu: 'dans un verger', court: 'dans un verger', s: ['automne'], act: ['cueille des pommes', 'monte dans une petite échelle', 'remplit un grand panier'], clue: 'Des rangées d’arbres sont pleines de pommes rouges, et on remplit des paniers.' },
  { id: 'fer', lieu: 'à la ferme de son oncle', court: 'à la ferme', s: ['été', 'automne', 'printemps'], act: ['nourrit les poules', 'flatte les veaux', 'ramasse les œufs'], clue: 'Les poules caquettent, les vaches meuglent et ça sent le foin.' },
  { id: 'zoo', lieu: 'au zoo de Granby', court: 'au zoo', s: ['été'], act: ['regarde les girafes', 'donne à manger aux chèvres', 'observe les singes'], clue: 'Derrière les clôtures, les girafes mangent des feuilles et les lions dorment.' },
  { id: 'but', lieu: 'sur la butte derrière l’école', court: 'sur la butte', s: ['hiver'], act: ['glisse en traîneau', 'fait un bonhomme de neige', 'construit un fort'], clue: 'Les traîneaux descendent la pente à toute vitesse dans la neige.' },
  { id: 'for', lieu: 'dans la forêt', court: 'dans la forêt', s: ['automne', 'été'], act: ['cherche des champignons', 'observe un écureuil', 'suit un petit sentier'], clue: 'Il y a de grands arbres partout, et un écureuil saute de branche en branche.' },
  { id: 'cam', lieu: 'au camping', court: 'au camping', s: ['été'], act: ['fait griller des guimauves', 'monte la tente', 'regarde les étoiles'], clue: 'La tente est montée, et le feu de camp crépite.' },
  { id: 'pis', lieu: 'à la piscine municipale', court: 'à la piscine', s: ['été', 'hiver'], act: ['saute du tremplin', 'nage avec une planche', 'plonge pour chercher des anneaux'], clue: 'Ça sent le chlore, et le sauveteur surveille les nageurs.' },
];
const WHEN = {
  hiver: ['Un samedi de janvier', 'Pendant les vacances de Noël', 'Un matin de février', 'Pendant la semaine de relâche'],
  été: ['Un dimanche de juillet', 'Pendant les vacances d’été', 'Un après-midi d’août', 'Au début de juillet'],
  printemps: ['Un samedi d’avril', 'Au début du printemps', 'Un dimanche de mars'],
  automne: ['Un samedi d’octobre', 'La fin de semaine de l’Action de grâce', 'Un après-midi de septembre'],
};
const SEASON_CLUE = {
  hiver: 'Dehors, il fait si froid que les fenêtres sont couvertes de givre.', été: 'Le soleil tape fort, et tout le monde porte des gougounes.',
  printemps: 'La neige fond, et les premiers bourgeons apparaissent.', automne: 'Les feuilles rouges et orange tombent des arbres.',
};
const MOMENT = [['le matin', 'Le soleil se lève à peine, et on sent l’odeur des rôties du déjeuner.'], ['l’après-midi', 'Après le dîner, le soleil est haut dans le ciel.'], ['le soir', 'Le soleil se couche, et le ciel devient tout rose.']];
const COMPS = [['son grand-père Gilles', 'm'], ['sa grand-mère Louise', 'f'], ['son cousin Marc', 'm'], ['sa tante Julie', 'f'], ['son amie Rosalie', 'f'], ['son ami Hugo', 'm'], ['sa sœur Anaïs', 'f'], ['son père', 'm']];
const OTHERS = ['la voisine, madame Tremblay', 'le facteur', 'monsieur Côté, le concierge', 'une gardienne d’enfants', 'monsieur Roy, le vétérinaire'];
const T112 = 'Pour comprendre une histoire, cherche QUI (les personnages), OÙ (le lieu) et QUAND (le temps).';
const f112 = readUnit('f112', '🧭', 'Personnages, lieu et temps', 'Characters, place and time',
  'Lecture — repérer les personnages, le lieu et le temps d’un récit (Progression MEQ, 1er cycle)', (level, R) => {
    const h = hero(R), sc = R.pick(SCENES), season = R.pick(sc.s), when = R.pick(WHEN[season]);
    const [comp, cg] = R.pick(COMPS); const compName = /^[A-ZÉ]/.test(comp.split(' ').slice(-1)[0]) ? comp.split(' ').slice(-1)[0] : R.pick(NM.filter((x) => x !== h.N)); const C = cap(comp);
    const [a1, a2] = R.sample(sc.act, 2); const they = !h.f || cg === 'm' ? 'Ils' : 'Elles';
    const otherSc = R.sample(SCENES.filter((x) => x !== sc), 3), otherW = R.sample(Object.values(WHEN).flat().filter((w) => w !== when && !WHEN[season].includes(w)), 3);
    const otherNames = R.sample((h.f ? NF : NM).filter((x) => x !== h.N), 3);
    const key = `${level}-${h.N}-${sc.id}-${when}-${comp}-${a1}`;
    const qWho = { key: 'qui', prompt: 'Qui est le personnage principal?', right: h.N, wrongs: [compName, ...otherNames], tip: T112 };
    const qWith = { key: 'avec', prompt: `Avec qui ${h.N} passe-t-${h.f ? 'elle' : 'il'} la journée?`, right: cap(comp), wrongs: R.sample(COMPS.filter(([c]) => c !== comp), 3).map(([c]) => cap(c)), tip: T112 };
    const qWhat = { key: 'quoi', prompt: `Que fait ${h.N} en premier?`, right: a1, wrongs: [a2, ...otherSc.map((x) => x.act[0])], tip: 'Relis le texte : l’action est écrite juste après le nom du personnage.' };
    if (level === 1) {
      const text = `${when}, ${h.N} va ${sc.lieu} avec ${comp}. ${h.N} ${a1}. ${C} ${a2}. ${they} passent une belle journée!`;
      return { key, text, qs: [qWho,
        { key: 'ou', prompt: 'Où se passe l’histoire?', right: cap(sc.court), wrongs: otherSc.map((x) => cap(x.court)), tip: T112 },
        { key: 'quand', prompt: 'Quand se passe l’histoire?', right: when, wrongs: otherW, tip: T112 }, qWith, qWhat] };
    }
    if (level === 2) {
      const other = R.pick(OTHERS), stop = R.pick(['au dépanneur pour acheter des collations', 'chez grand-maman pour prendre une thermos de chocolat chaud', 'à la pharmacie pour acheter de la crème solaire']);
      const text = `${when}, ${h.N} et ${comp} partent tôt de la maison. En chemin, ${they.toLowerCase()} s’arrêtent ${stop}.\n\nEnsuite, ${they.toLowerCase()} arrivent enfin ${sc.lieu}. ${h.N} ${a1}, pendant que ${comp} ${a2}. Un peu plus tard, ${they.toLowerCase()} croisent ${other}, qui les salue de la main.\n\nLe soir, ${h.N} est fatigué${h.f ? 'e' : ''}, mais ${h.f ? 'elle' : 'il'} a déjà hâte de revenir.`;
      return { key: `${key}-${other}-${stop}`, text, qs: [qWho, qWith,
        { key: 'ou', prompt: 'Où se passe la plus grande partie de l’histoire?', right: cap(sc.court), wrongs: [cap(stop.split(' pour')[0]), ...otherSc.slice(0, 2).map((x) => cap(x.court))], tip: 'Attention : le personnage s’arrête ailleurs en chemin, mais la plus grande partie se passe à un autre endroit.' },
        { key: 'saison', prompt: 'En quelle saison se passe l’histoire?', right: `en ${season === 'été' ? 'été' : season === 'automne' ? 'automne' : season === 'hiver' ? 'hiver' : 'printemps'}`.replace('en printemps', 'au printemps'), wrongs: ['hiver', 'été', 'automne', 'printemps'].filter((x) => x !== season).map((x) => (x === 'printemps' ? 'au printemps' : `en ${x}`)), tip: 'Le mois t’aide : janvier et février, c’est l’hiver; juillet et août, c’est l’été.' },
        { key: 'qui2', prompt: `Qui ${they.toLowerCase()} croisent-${they.toLowerCase()} là-bas?`, right: cap(other), wrongs: R.sample(OTHERS.filter((x) => x !== other), 3).map(cap), tip: T112 }] };
    }
    const [mom, momClue] = R.pick(MOMENT);
    const text = `${SEASON_CLUE[season]} ${momClue}\n\n${h.N} ${R.pick(['sautille d’impatience', 'sourit jusqu’aux oreilles', 'court devant tout le monde'])}. ${sc.clue} ${h.N} ${a1}, et ${comp} ${a2}.\n\n— Quelle belle journée! dit ${h.N}.`;
    const seasons = ['l’hiver', 'l’été', 'l’automne', 'le printemps']; const sz = season === 'hiver' ? 'l’hiver' : season === 'été' ? 'l’été' : season === 'automne' ? 'l’automne' : 'le printemps';
    return { key: `${key}-${mom}`, text, qs: [
      { key: 'ou', prompt: 'Où sont les personnages? Le lieu n’est pas écrit : cherche les indices!', right: cap(sc.court), wrongs: otherSc.map((x) => cap(x.court)), tip: 'Les indices (ce qu’on voit, entend, sent) t’aident à deviner le lieu.' },
      { key: 'saison', prompt: 'En quelle saison se passe l’histoire?', right: sz, wrongs: seasons.filter((x) => x !== sz), tip: 'Relis la première phrase : elle décrit le temps qu’il fait.' },
      { key: 'moment', prompt: 'À quel moment de la journée?', right: mom, wrongs: MOMENT.map(([m]) => m).filter((m) => m !== mom), n: 3, tip: 'Regarde le soleil dans le texte : il se lève, il est haut ou il se couche?' },
      { key: 'indice', prompt: 'Quelle phrase t’aide à trouver le lieu?', right: sc.clue, wrongs: [SEASON_CLUE[season], momClue, R.pick(otherSc).clue], tip: 'Cherche la phrase qui décrit ce qu’il y a autour des personnages.' },
      qWith] };
  });

/* ================================================================== */
/*  f113 — L’ordre des événements                                     */
/* ================================================================== */
// étapes au présent, sans sujet (le sujet est ajouté) ; animal: true = le sujet est l’animal
const SCRIPTS = [
  { t: 'Le bonhomme de neige', e: ['roule une grosse boule de neige', 'roule une boule moyenne et la pose dessus', 'ajoute une petite boule pour la tête', 'plante une carotte pour le nez', 'met sa tuque sur le bonhomme'] },
  { t: 'Le matin d’école', e: ['se réveille au son du réveil', 's’habille', 'mange ses céréales au déjeuner', 'se brosse les dents', 'prend l’autobus jaune'] },
  { t: 'La petite graine', e: ['remplit un pot de terre', 'fait un trou avec son doigt', 'dépose la graine dans le trou', 'arrose la terre', 'place le pot au soleil'] },
  { t: 'Les biscuits', e: ['se lave les mains', 'mélange la farine, le beurre et le sucre', 'forme de petites boules de pâte', 'fait cuire les biscuits au four', 'laisse refroidir les biscuits et les goûte'] },
  { t: 'La fête', e: ['envoie les invitations', 'décore le salon avec des ballons', 'accueille ses amis à la porte', 'souffle les bougies du gâteau', 'ouvre ses cadeaux'] },
  { t: 'La lettre', e: ['écrit une lettre à sa grand-mère', 'plie la lettre et la met dans une enveloppe', 'colle un timbre sur l’enveloppe', 'glisse l’enveloppe dans la boîte aux lettres', 'attend la réponse avec impatience'] },
  { t: 'Le bain du chien', e: ['remplit la baignoire d’eau tiède', 'fait entrer le chien dans l’eau', 'savonne le chien', 'rince le chien', 'sèche le chien avec une grande serviette'] },
  { t: 'La pêche', e: ['prépare sa canne à pêche', 'accroche un ver à l’hameçon', 'lance sa ligne dans le lac', 'attend sans bouger', 'attrape une belle truite'] },
  { t: 'Le fort de neige', e: ['pellette la neige en un gros tas', 'tape la neige pour la rendre dure', 'creuse une entrée', 'fait un toit avec des blocs de neige', 'invite ses amis dans le fort'] },
  { t: 'Le dessin', e: ['sort une feuille blanche', 'trace le contour au crayon', 'colorie avec des crayons de bois', 'écrit son nom en bas', 'colle son dessin sur le frigo'] },
  { t: 'La collation', e: ['lave une pomme', 'coupe la pomme en tranches', 'met les tranches dans une assiette', 'ajoute du fromage', 'partage la collation avec son frère'] },
  { t: 'Le vélo', e: ['met son casque', 'vérifie les pneus', 'monte sur son vélo', 'pédale jusqu’au parc', 'range son vélo et l’attache'] },
];
const CONN = { 1: ['D’abord', 'Ensuite', 'Puis', 'Enfin'], 2: ['D’abord', 'Ensuite', 'Après', 'Puis', 'Finalement'], 3: ['D’abord', 'Ensuite', 'Après', 'Puis', 'Finalement'] };
const T113 = 'Les mots « d’abord, ensuite, puis, enfin » t’aident à suivre l’ordre des événements.';
const f113 = readUnit('f113', '🔢', 'L’ordre des événements', 'Order of events',
  'Lecture — ordre chronologique des événements d’un récit (Progression MEQ, 1er cycle)', (level, R) => {
    const h = hero(R), sc = R.pick(SCRIPTS);
    const ev = level === 1 ? [sc.e[0], sc.e[1], sc.e[3], sc.e[4]] : sc.e;
    const key = `${level}-${h.N}-${sc.t}`;
    const sent = (c, e) => `${c}, ${h.N} ${e}.`;
    let text;
    if (level < 3) text = ev.map((e, i) => sent(CONN[level][i], e)).join(' ');
    else text = `${h.N} est très fi${h.f ? 'ère' : 'er'} : ${h.f ? 'elle' : 'il'} ${ev[ev.length - 1]}! Mais comment tout a commencé?\n\nPlus tôt, ${h.N} ${ev[0]}. Après, ${h.f ? 'elle' : 'il'} ${ev[1]}. Puis, ${h.f ? 'elle' : 'il'} ${ev[2]}. Juste avant la fin, ${h.f ? 'elle' : 'il'} ${ev[3]}.`;
    const i = R.int(0, ev.length - 2);
    const qs = [
      { key: 'premier', prompt: `Que fait ${h.N} en premier?`, right: cap(ev[0]), wrongs: ev.slice(1).map(cap), tip: level === 3 ? 'Attention : le texte commence par la fin! Cherche « plus tôt ».' : T113 },
      { key: `apres${i}`, prompt: `Que fait ${h.N} juste après cette action : « ${ev[i]} »?`, right: cap(ev[i + 1]), wrongs: ev.filter((_, j) => j !== i + 1 && j !== i).map(cap), tip: T113 },
      { key: 'dernier', prompt: `Que fait ${h.N} en dernier?`, right: cap(ev[ev.length - 1]), wrongs: ev.slice(0, -1).map(cap), tip: level === 3 ? 'La fin est racontée au début du texte!' : T113 },
    ];
    if (level >= 2) { const j = R.int(1, ev.length - 1); qs.push({ key: `avant${j}`, prompt: `Que fait ${h.N} juste avant cette action : « ${ev[j]} »?`, right: cap(ev[j - 1]), wrongs: ev.filter((_, k) => k !== j - 1 && k !== j).map(cap), tip: T113 }); }
    const k = level === 1 ? 3 : level === 2 ? 4 : 5; const start = level === 2 ? R.int(0, 1) : 0;
    qs.push({ key: `ordre${start}`, prompt: 'Place les événements dans l’ordre.', tiles: ev.slice(start, start + k).map(cap), tip: T113 });
    return { key, title: sc.t, text, qs };
  });

/* ================================================================== */
/*  f114 — L’inférence : deviner ce qui n’est pas écrit               */
/* ================================================================== */
// [texte, question, bonne réponse, faux choix] — {N}, {Il}, {il}, {lui}, {e}, {masc|fém}
const INF = {
  1: [
    ['{N} met sa tuque, ses mitaines et son gros manteau. Dehors, tout est blanc.', 'En quelle saison sommes-nous?', 'en hiver', ['en été', 'au printemps']],
    ['{N} a les yeux pleins d’eau. Son cornet de crème glacée vient de tomber par terre.', 'Comment se sent {N}?', '{Il} est triste.', ['{Il} est content{e}.', '{Il} est fâché{e} contre son ami.']],
    ['{N} ouvre son parapluie et met ses bottes de pluie avant de sortir.', 'Quel temps fait-il?', 'Il pleut.', ['Il fait soleil.', 'Il neige.']],
    ['Le réveil sonne. {N} bâille, s’étire et sort lentement de son lit.', 'À quel moment de la journée sommes-nous?', 'le matin', ['le soir', 'le midi']],
    ['{N} souffle les huit bougies du gâteau. Toute la famille chante.', 'Que fête-t-on?', 'l’anniversaire de {N}', ['Noël', 'l’Halloween']],
    ['Il y a de la farine sur le comptoir, et une bonne odeur sort du four.', 'Que se passe-t-il dans la cuisine?', 'Quelqu’un fait cuire quelque chose.', ['Quelqu’un fait le ménage.', 'Quelqu’un dort.']],
    ['{N} enfile son maillot et ses lunettes de nage, puis saute dans l’eau.', 'Où est {N}?', 'à la piscine', ['à la bibliothèque', 'à l’épicerie']],
    ['Le chien jappe de joie et court vers la porte en remuant la queue.', 'Qui arrive probablement?', 'Quelqu’un que le chien aime.', ['Personne.', 'Un orage.']],
    ['{N} se bouche les oreilles quand le camion de pompiers passe.', 'Pourquoi {N} se bouche-t-{il} les oreilles?', 'La sirène fait beaucoup de bruit.', ['{Il} a froid aux oreilles.', '{Il} ne veut pas écouter sa mère.']],
    ['{N} a de la sauce tomate sur le menton. Devant {lui}, l’assiette est vide.', 'Qu’est-ce que {N} a mangé?', 'des spaghettis', ['des céréales', 'une pomme']],
    ['Les feuilles des arbres sont rouges et orange. {N} en ramasse pour son bricolage.', 'En quelle saison sommes-nous?', 'en automne', ['en hiver', 'en été']],
    ['{N} regarde sous le lit, dans le placard et derrière le divan.', 'Que fait {N}?', '{Il} cherche quelque chose.', ['{Il} fait de l’exercice.', '{Il} joue à la marelle.']],
    ['Toute la classe crie « Surprise! » quand l’enseignante entre. Elle met la main sur sa bouche.', 'Comment se sent l’enseignante?', 'surprise', ['fâchée', 'endormie']],
    ['{N} tousse, a le nez qui coule et reste au lit toute la journée.', 'Pourquoi {N} reste-t-{il} au lit?', '{Il} est malade.', ['{Il} est en vacances.', '{Il} attend ses amis.']],
    ['Les oiseaux reviennent, la neige fond et les bourgeons apparaissent.', 'En quelle saison sommes-nous?', 'au printemps', ['en automne', 'en hiver']],
    ['{N} porte un sarrau blanc et écoute le cœur d’un chat avec un stéthoscope.', 'Quel est le métier de {N}?', 'vétérinaire', ['pilote', 'dentiste']],
  ],
  2: [
    ['{N} serre son toutou très fort. Dehors, le tonnerre gronde et les éclairs illuminent la chambre.', 'Comment se sent {N}?', '{Il} a peur.', ['{Il} s’ennuie.', '{Il} est fâché{e}.']],
    ['Quand {N} rentre, ses bottes sont pleines de boue et son pantalon est tout mouillé.', 'Qu’est-ce que {N} a fait dehors?', '{Il} a sauté dans les flaques.', ['{Il} a lu un livre.', '{Il} a fait du ski.']],
    ['Le chat est assis devant son bol vide. Il miaule sans arrêt en regardant {N}.', 'Que veut le chat?', 'manger', ['dormir', 'jouer dehors']],
    ['{N} regarde l’horloge toutes les deux minutes. {Il} a déjà mis ses souliers et son manteau.', 'Pourquoi {N} regarde-t-{il} l’horloge?', '{Il} a hâte de partir.', ['{Il} est fatigué{e}.', '{Il} apprend à lire l’heure.']],
    ['Sur la table, il y a un gâteau, des ballons et un paquet avec un gros ruban.', 'Que prépare-t-on?', 'une fête', ['un déménagement', 'un examen']],
    ['{N} a les joues rouges et les cheveux mouillés de sueur. {Il} boit trois verres d’eau.', 'Qu’est-ce que {N} vient de faire?', 'du sport', ['une sieste', 'ses devoirs']],
    ['Le pot de biscuits est ouvert, et il y a des miettes sur le chandail de {N}.', 'Qui a probablement pris des biscuits?', '{N}', ['le chat', 'personne']],
    ['Les élèves rangent leurs crayons. Certains mettent déjà leur manteau. La cloche va sonner.', 'Quel moment de la journée est-ce?', 'la fin de la journée d’école', ['le début de la journée', 'l’heure du dîner']],
    ['{N} n’arrive pas à lire le tableau. {Il} plisse les yeux et s’approche.', 'De quoi {N} a-t-{il} peut-être besoin?', 'de lunettes', ['d’un crayon', 'd’une collation']],
    ['Le bonhomme de neige n’a plus de nez et il penche. Il y a de l’eau tout autour.', 'Que se passe-t-il?', 'Il fait plus chaud et la neige fond.', ['Il neige encore.', 'Un enfant l’a décoré.']],
    ['{N} parle tout bas et marche sur la pointe des pieds. Son petit frère fait la sieste.', 'Pourquoi {N} fait-{il} si attention?', 'pour ne pas réveiller son petit frère', ['parce qu’{il} a mal aux pieds', 'pour jouer à la cachette']],
    ['Papa met des sacs de couchage et une glacière dans l’auto. Il y a une tente sur le toit.', 'Où va la famille?', 'en camping', ['à l’épicerie', 'au cinéma']],
    ['{N} a un sourire jusqu’aux oreilles. {Il} montre sa copie : il y a une étoile dorée en haut.', 'Pourquoi {N} sourit-{il}?', '{Il} a bien réussi son travail.', ['{Il} a perdu sa copie.', '{Il} a reçu un cadeau.']],
    ['Il n’y a plus de feuilles dans les arbres. Les outardes volent vers le sud.', 'En quelle saison sommes-nous?', 'à la fin de l’automne', ['au début de l’été', 'au printemps']],
    ['{N} met ses lunettes de soleil, de la crème solaire et prend sa serviette de plage.', 'Quel temps fait-il?', 'Il fait beau et chaud.', ['Il pleut.', 'Il fait très froid.']],
  ],
  3: [
    ['{N} partage sa collation avec le nouvel élève, qui n’a rien apporté. Puis, {il} l’invite à jouer au ballon.', 'Quel mot décrit le mieux {N}?', '{généreux|généreuse}', ['{paresseux|paresseuse}', '{peureux|peureuse}', '{impoli|impolie}']],
    ['Pour la troisième fois, la tour de blocs de {N} s’écroule. {Il} respire profondément et recommence.', 'Quel mot décrit le mieux {N}?', '{persévérant|persévérante}', ['{paresseux|paresseuse}', '{méchant|méchante}', '{distrait|distraite}']],
    ['« Encore des épinards! » soupire {N} en repoussant son assiette.', 'Que pense {N} des épinards?', '{Il} ne les aime pas.', ['C’est son plat préféré.', '{Il} veut en manger plus.', '{Il} ne les a jamais goûtés.']],
    ['Grand-maman regarde une vieille photo de grand-papa. Elle sourit, mais une larme coule sur sa joue.', 'Que ressent grand-maman?', 'Elle s’ennuie de grand-papa.', ['Elle est fâchée.', 'Elle a peur.', 'Elle a mal aux yeux.']],
    ['Le soir, le voisin laisse ses poubelles au bord de la rue. Le matin, elles sont renversées, et on voit des traces de petites pattes à cinq doigts.', 'Qui a probablement renversé les poubelles?', 'un raton laveur', ['le facteur', 'un oiseau', 'le voisin']],
    ['{N} reçoit un chandail beaucoup trop grand. {Il} dit quand même : « Merci, grand-maman, il est très beau! »', 'Pourquoi {N} dit-{il} merci?', '{Il} ne veut pas faire de peine à sa grand-mère.', ['{Il} adore les chandails trop grands.', '{Il} veut un autre cadeau.', '{Il} n’a pas regardé le chandail.']],
    ['Dès qu’il voit sa laisse et la cage de transport, le chien se cache sous le lit. C’est le jour du rendez-vous chez le vétérinaire.', 'Pourquoi le chien se cache-t-il?', 'Il n’aime pas aller chez le vétérinaire.', ['Il veut jouer.', 'Il a froid.', 'Il cherche un os.']],
    ['{N} lève la main, puis la baisse tout de suite. {Il} rougit et regarde ses souliers.', 'Comment se sent {N}?', '{gêné|gênée}', ['{fâché|fâchée}', '{endormi|endormie}', '{fier|fière}']],
    ['Le lac est gelé, mais un panneau dit « Glace mince : danger ». {N} reste sur le bord avec ses patins.', 'Pourquoi {N} reste-t-{il} sur le bord?', '{Il} sait que la glace pourrait casser.', ['{Il} n’a pas de patins.', '{Il} a peur des poissons.', '{Il} attend l’autobus.']],
    ['Monsieur Gagnon répare les vélos de tous les enfants du quartier sans demander d’argent.', 'Quel mot décrit le mieux monsieur Gagnon?', 'serviable', ['pressé', 'paresseux', 'gourmand']],
    ['Quand {N} arrive, ses amis arrêtent de parler et cachent vite un paquet derrière leur dos.', 'Que préparent probablement ses amis?', 'une surprise pour {N}', ['un mauvais coup', 'leurs devoirs', 'un pique-nique']],
    ['Les fenêtres sont couvertes de givre, et la neige crisse sous les bottes. Le thermomètre indique moins vingt-cinq.', 'Quel temps fait-il?', 'Il fait très froid.', ['Il fait doux.', 'Il fait chaud.', 'Il pleut.']],
    ['{N} a perdu une dent. Le soir, {il} la glisse sous son oreiller avec un grand sourire.', 'Qu’espère {N}?', 'que la fée des dents passe pendant la nuit', ['dormir plus longtemps', 'retrouver sa dent le lendemain', 'avoir mal aux dents']],
    ['Les lumières de l’école sont éteintes, la porte est fermée à clé et la cour est vide. {N} est pourtant venu{e} avec son sac.', 'Que s’est-il probablement passé?', '{N} a oublié que c’était un jour de congé.', ['L’école a déménagé.', '{N} est arrivé{e} trop tard.', 'Les élèves jouent à la cachette.']],
    ['Papa revient de l’épicerie. Il cherche ses clés partout… Elles sont encore dans la serrure, à l’extérieur!', 'Qu’est-il arrivé aux clés?', 'Papa les a oubliées dans la porte.', ['Quelqu’un les a volées.', 'Le chat les a cachées.', 'Elles sont dans l’auto.']],
  ],
};
const T114 = 'Le texte ne le dit pas directement. Utilise les indices et ce que tu sais déjà pour deviner.';
const vignetteUnit = (id, icon, fr, en, pfeq, BANK, tip, nq = 5) => {
  const mk = (level, R, e) => { const h = hero(R); const [t, q, r, ws, clueR, clueW] = e; const i = BANK[level].indexOf(e);
    const nk = /\{/.test([t, q, r, ...ws].join('')) ? `-${h.N}` : '';
    const qs = [{ key: `${level}-${i}${nk}`, text: gt(t, h.N, h.f), prompt: gt(q, h.N, h.f), right: gt(r, h.N, h.f), wrongs: ws.map((w) => gt(w, h.N, h.f)) }];
    if (clueR) qs.push({ key: `${level}-${i}${nk}-indice`, text: gt(t, h.N, h.f), prompt: 'Quel indice t’aide à le deviner?', right: gt(clueR, h.N, h.f), wrongs: clueW.map((w) => gt(w, h.N, h.f)) });
    return qs; };
  const toQ = (level, x, first) => ch(`${id}-${x.key}`, x.prompt, x.right, x.wrongs, { n: level === 1 ? 3 : 4, stimulus: { text: x.text }, say: sy(level === 1 || first ? `${x.text} ${x.prompt}` : x.prompt), tip });
  return {
    id, icon, title: { fr, en }, pfeq,
    generate(level, R) { const qs = mk(level, R, R.pick(BANK[level])); return toQ(level, R.pick(qs), true); },
    // une partie = quelques petits textes (chacun avec sa question)
    session(level, R) { return R.sample(BANK[level], nq).flatMap((e) => mk(level, R, e)).slice(0, 6).map((x) => toQ(level, x, true)); },
    allSay() { return collectFixed(this); },
  };
};
const f114 = vignetteUnit('f114', '🕵️', 'L’inférence : deviner', 'Inference: reading between the lines',
  'Lecture — inférer une information implicite à partir d’indices (Progression MEQ, 1er cycle)', INF, T114);

/* ================================================================== */
/*  f115 — Prédire la suite                                           */
/* ================================================================== */
const PRED = {
  1: [
    ['{N} lance la balle beaucoup trop fort. La balle file droit vers la fenêtre du voisin…', 'Que va-t-il probablement arriver?', 'La balle va frapper la fenêtre.', ['La balle va revenir toute seule.', 'Le voisin va partir en vacances.']],
    ['Le verre de lait est tout au bord de la table. Le chat saute sur la table…', 'Que va-t-il probablement arriver?', 'Le verre va tomber.', ['Le chat va boire du jus.', 'Le verre va voler.']],
    ['Il commence à pleuvoir très fort. {N} joue au parc, sans parapluie.', 'Que va probablement faire {N}?', '{Il} va courir se mettre à l’abri.', ['{Il} va mettre sa crème solaire.', '{Il} va faire un bonhomme de neige.']],
    ['{N} a très faim. Papa sort une pizza chaude du four et l’apporte sur la table.', 'Que va probablement faire {N}?', '{Il} va manger de la pizza.', ['{Il} va aller se coucher.', '{Il} va jouer dehors.']],
    ['La cloche de la récréation sonne.', 'Que vont faire les élèves?', 'Ils vont sortir jouer dehors.', ['Ils vont faire une dictée.', 'Ils vont rentrer chez eux pour dormir.']],
    ['{N} laisse son cornet de crème glacée au soleil et part jouer.', 'Que va-t-il arriver au cornet?', 'La crème glacée va fondre.', ['La crème glacée va geler.', 'Le cornet va grandir.']],
    ['Le bébé est fatigué. Il se frotte les yeux et bâille.', 'Que va probablement faire le bébé?', 'Il va s’endormir.', ['Il va courir.', 'Il va chanter.']],
    ['{N} plante une graine, l’arrose chaque jour et met le pot au soleil.', 'Que va-t-il probablement arriver?', 'Une plante va pousser.', ['La graine va disparaître.', 'Le pot va fondre.']],
    ['Le chien voit un écureuil dans la cour.', 'Que va probablement faire le chien?', 'Il va courir après l’écureuil.', ['Il va lire un livre.', 'Il va faire la sieste.']],
    ['{N} a oublié de fermer la porte de la cage du lapin.', 'Que va-t-il probablement arriver?', 'Le lapin va sortir de sa cage.', ['Le lapin va fermer la porte.', 'Le lapin va devenir un chat.']],
    ['Il neige depuis le matin. Toute la cour d’école est blanche.', 'Que vont faire les enfants à la récréation?', 'Ils vont jouer dans la neige.', ['Ils vont se baigner.', 'Ils vont cueillir des fleurs.']],
    ['La tour de blocs de {N} est très, très haute. Elle commence à pencher…', 'Que va-t-il probablement arriver?', 'La tour va tomber.', ['La tour va grandir.', 'La tour va se redresser toute seule.']],
    ['{N} entend la musique du camion de crème glacée dans la rue.', 'Que va probablement faire {N}?', '{Il} va courir acheter une crème glacée.', ['{Il} va se boucher les oreilles.', '{Il} va faire ses devoirs.']],
    ['Maman met ses bottes de pluie et prend son parapluie.', 'Que va probablement faire maman?', 'Elle va sortir sous la pluie.', ['Elle va se coucher.', 'Elle va se baigner.']],
  ],
  2: [
    ['C’est bientôt la fête des Mères. {N} sort du papier de couleur, de la colle et des brillants.', 'Que va probablement faire {N}?', '{Il} va fabriquer une carte pour sa mère.', ['{Il} va faire ses devoirs.', '{Il} va ranger sa chambre.', '{Il} va jouer au hockey.']],
    ['Le lac est gelé depuis des semaines. Papa sort la pelle et les patins du garage.', 'Que va probablement faire la famille?', 'Elle va patiner sur le lac.', ['Elle va se baigner dans le lac.', 'Elle va faire du vélo.', 'Elle va planter des fleurs.']],
    ['{N} a perdu son toutou préféré au parc. Le soir, {il} n’arrive pas à dormir.', 'Que va probablement faire {N} le lendemain?', 'Retourner chercher son toutou au parc.', ['Acheter un vélo.', 'Oublier son toutou.', 'Aller à la plage.']],
    ['La boîte de céréales est vide. Maman écrit « céréales » sur la liste d’épicerie.', 'Que va probablement faire maman?', 'Elle va acheter des céréales.', ['Elle va jeter la liste.', 'Elle va faire un gâteau.', 'Elle va manger la boîte.']],
    ['La chenille mange des feuilles pendant des jours. Puis, elle s’enferme dans un cocon.', 'Que va-t-il arriver ensuite?', 'Elle va devenir un papillon.', ['Elle va devenir un oiseau.', 'Elle va rapetisser.', 'Elle va devenir une feuille.']],
    ['{N} pratique son piano tous les jours. Le spectacle de l’école a lieu dans une semaine.', 'Que va probablement faire {N} au spectacle?', '{Il} va jouer du piano.', ['{Il} va chanter faux.', '{Il} va rester à la maison.', '{Il} va danser le ballet.']],
    ['Le renard s’approche du poulailler sans faire de bruit. Mais le chien de la ferme dresse les oreilles…', 'Que va probablement faire le chien?', 'Il va japper et faire fuir le renard.', ['Il va dormir.', 'Il va jouer avec le renard.', 'Il va manger les poules.']],
    ['Les nuages deviennent noirs et on entend le tonnerre. La famille pique-nique au parc.', 'Que va probablement faire la famille?', 'Ranger le pique-nique et rentrer.', ['Commencer une partie de soccer.', 'Mettre de la crème solaire.', 'Faire un feu de camp.']],
    ['{N} a une dictée demain. Ce soir, {il} révise ses mots avec papa.', 'Que va-t-il probablement arriver demain?', '{N} va bien réussir sa dictée.', ['{N} va oublier tous ses mots.', 'La dictée va être annulée.', '{N} va rester au lit.']],
    ['Le ballon de {N} est coincé dans un arbre. {Il} va chercher son grand frère, qui est très grand.', 'Que va-t-il probablement arriver?', 'Le grand frère va décrocher le ballon.', ['L’arbre va tomber.', 'Le ballon va crever.', '{N} va acheter un autre ballon.']],
    ['C’est le dernier jour d’école. L’enseignante dit : « Bon été, tout le monde! »', 'Que va-t-il commencer?', 'les vacances d’été', ['l’hiver', 'une nouvelle journée d’école', 'la semaine de relâche']],
    ['La cane marche vers l’étang. Ses cinq canetons la suivent en file.', 'Que vont probablement faire les canetons?', 'Ils vont aller dans l’eau avec leur mère.', ['Ils vont rentrer à la maison.', 'Ils vont s’envoler vers la lune.', 'Ils vont manger un gâteau.']],
    ['{N} entend un petit miaulement sous le perron. {Il} s’approche avec une lampe de poche.', 'Que va probablement trouver {N}?', 'un chaton', ['un trésor', 'un ours', 'un téléphone']],
    ['{N} met ses bottes, sa tuque et ses mitaines. {Il} prend son traîneau.', 'Que va probablement faire {N}?', '{Il} va aller glisser.', ['{Il} va aller nager.', '{Il} va faire la sieste.', '{Il} va cueillir des pommes.']],
  ],
  3: [
    ['Depuis des semaines, {N} met ses sous dans sa tirelire. Chaque jour, {il} regarde un cerf-volant rouge dans la vitrine du magasin.', 'Que va probablement faire {N}?', '{Il} va acheter le cerf-volant.', ['{Il} va casser la vitrine.', '{Il} va donner ses sous au magasin pour rien.', '{Il} va oublier le cerf-volant.'], '{Il} regarde le cerf-volant chaque jour et ramasse ses sous.', ['Le magasin a une vitrine.', 'Le cerf-volant est rouge.', 'C’est une tirelire.']],
    ['Le loup souffle sur la maison de briques, mais rien ne bouge. Il lève alors les yeux vers la cheminée…', 'Que va probablement essayer le loup?', 'Entrer par la cheminée.', ['Rentrer chez lui dormir.', 'Construire sa propre maison.', 'Souffler encore plus fort sur la porte.'], 'Il lève les yeux vers la cheminée.', ['La maison est en briques.', 'Le loup souffle.', 'Rien ne bouge.']],
    ['{N} n’a pas étudié ses mots de vocabulaire. Le lendemain, l’enseignante annonce une dictée surprise.', 'Que va-t-il probablement arriver?', '{N} va trouver la dictée difficile.', ['{N} va avoir toutes les réponses.', 'La dictée va être en anglais.', 'L’enseignante va partir.'], '{Il} n’a pas étudié ses mots.', ['C’est le lendemain.', 'L’enseignante parle.', 'C’est une surprise.']],
    ['Chaque jour, l’écureuil cache des noisettes sous les feuilles. Les journées raccourcissent et il fait de plus en plus froid.', 'Que va faire l’écureuil plus tard?', 'Manger ses noisettes pendant l’hiver.', ['Planter des fleurs.', 'Partir vers le sud en avion.', 'Jeter ses noisettes.'], 'Il cache des noisettes et l’hiver approche.', ['Il y a des feuilles.', 'L’écureuil est petit.', 'C’est le jour.']],
    ['Sur le trottoir, {N} trouve un portefeuille. Dedans, il y a une carte avec le nom et l’adresse du propriétaire. {N} est une personne très honnête.', 'Que va probablement faire {N}?', 'Rapporter le portefeuille à son propriétaire.', ['Garder l’argent.', 'Jeter le portefeuille.', 'Cacher le portefeuille.'], '{N} est une personne très honnête.', ['Le portefeuille est sur le trottoir.', 'Il y a une carte.', 'C’est un portefeuille.']],
    ['Depuis le matin, le petit oiseau bat des ailes au bord du nid. Sa mère chante sur une branche voisine pour l’encourager.', 'Que va probablement faire le petit oiseau?', 'S’envoler pour la première fois.', ['Construire un autre nid.', 'Tomber endormi.', 'Manger sa mère.'], 'Il bat des ailes au bord du nid.', ['Sa mère chante.', 'C’est le matin.', 'Il y a une branche.']],
    ['{N} a promis d’arroser les plantes de la voisine pendant ses vacances. Mais {il} part au camping toute la semaine sans en parler à personne.', 'Que va-t-il probablement arriver aux plantes?', 'Elles vont manquer d’eau et sécher.', ['Elles vont pousser très vite.', 'Elles vont partir au camping.', 'Elles vont changer de couleur.'], '{Il} part toute la semaine sans en parler à personne.', ['La voisine est en vacances.', 'Ce sont des plantes.', '{Il} a fait une promesse.']],
    ['Il neige depuis deux jours. À la radio, on annonce encore trente centimètres pour la nuit. Les autobus ont déjà de la difficulté à rouler.', 'Que va-t-il probablement arriver demain matin?', 'L’école va être fermée.', ['Il va faire très chaud.', 'Les élèves vont aller à la plage.', 'La neige va disparaître.'], 'Les autobus ont de la difficulté à rouler.', ['Il y a une radio.', 'C’est la nuit.', 'Il neige depuis deux jours seulement.']],
    ['{N} rêve d’avoir un chien depuis toujours. Ce matin, papa revient de chez un ami fermier avec une grosse boîte percée de petits trous. La boîte bouge un peu.', 'Que va probablement découvrir {N}?', 'un chiot dans la boîte', ['des souliers neufs', 'un gâteau', 'un casse-tête'], 'La boîte est percée de trous et elle bouge.', ['Papa revient le matin.', 'L’ami est fermier.', 'La boîte est grosse.']],
    ['Le roi promet un trésor à qui retrouvera sa couronne perdue. La petite souris, qui se faufile partout, a justement vu quelque chose briller sous le grand escalier…', 'Que va-t-il probablement arriver?', 'La souris va retrouver la couronne.', ['Le roi va perdre son château.', 'La souris va se cacher pour toujours.', 'L’escalier va tomber.'], 'Elle a vu quelque chose briller sous l’escalier.', ['Le roi a un château.', 'La souris est petite.', 'Il y a un trésor.']],
    ['Les pommes de l’arbre sont rouges et bien mûres. Le vent souffle de plus en plus fort.', 'Que va-t-il probablement arriver?', 'Des pommes vont tomber de l’arbre.', ['Les pommes vont redevenir vertes.', 'L’arbre va s’envoler.', 'Il va neiger des pommes.'], 'Le vent souffle fort et les pommes sont mûres.', ['L’arbre est grand.', 'Les pommes sont rouges.', 'C’est un pommier.']],
    ['Pendant la course, le cousin de {N} tombe et s’écorche le genou. {N} est {premier|première}, mais {il} s’arrête et revient en arrière.', 'Que va probablement faire {N}?', 'Aider son cousin à se relever.', ['Finir la course en riant.', 'Rentrer chez {lui} sans rien dire.', 'Gronder son cousin.'], '{Il} s’arrête et revient en arrière.', ['C’est une course.', '{Il} est {premier|première}.', 'Le cousin a un genou.']],
  ],
};
const f115 = vignetteUnit('f115', '🔮', 'Prédire la suite', 'Predicting what happens next',
  'Lecture — prédire la suite à partir des indices du texte (Progression MEQ, 1er cycle)', PRED, 'Pour prédire, utilise les indices du texte et ce que tu sais du monde.');

/* ================================================================== */
/*  f116 — Le texte informatif : trouver une information              */
/* ================================================================== */
// animaux du Québec : nom, genre, habitat, nourriture, corps, petit (ou null), hiver, fait, emoji
const FAUNE = [
  { n: 'le castor', g: 'm', e: '🦫', hab: 'près des lacs et des rivières', mange: 'l’écorce et les petites branches des arbres', corps: 'de grandes dents orange et une queue plate', petit: 'le castoreau', hiver: 'reste dans sa hutte et mange les branches gardées sous l’eau', fait: 'il construit des barrages avec des branches et de la boue' },
  { n: 'l’orignal', g: 'm', e: '🫎', hab: 'dans les forêts et près des marais', mange: 'des plantes d’eau, des feuilles et des branches', corps: 'de très longues pattes et, chez le mâle, de grands bois plats', petit: 'le veau', hiver: 'marche dans la neige profonde grâce à ses longues pattes', fait: 'c’est le plus grand membre de la famille des cerfs' },
  { n: 'l’ours noir', g: 'm', e: '🐻', hab: 'dans les grandes forêts', mange: 'des petits fruits, des noix, des insectes et du poisson', corps: 'une épaisse fourrure noire et des griffes solides', petit: 'l’ourson', hiver: 'dort dans une tanière', fait: 'il grimpe très bien aux arbres' },
  { n: 'le renard roux', g: 'm', e: '🦊', hab: 'dans les champs et au bord des forêts', mange: 'des souris, des lièvres et des petits fruits', corps: 'une fourrure rousse et une queue touffue au bout blanc', petit: 'le renardeau', hiver: 'saute dans la neige pour attraper les souris cachées dessous', fait: 'il entend une souris bouger sous la neige' },
  { n: 'le harfang des neiges', g: 'm', e: '🦉', hab: 'dans la toundra, tout au nord', mange: 'des lemmings et d’autres petits animaux', corps: 'des plumes blanches et de grands yeux jaunes', petit: null, hiver: 'descend parfois vers le sud du Québec pour trouver à manger', fait: 'c’est l’oiseau emblème du Québec' },
  { n: 'le béluga', g: 'm', e: '🐳', hab: 'dans le fleuve Saint-Laurent et les eaux froides du Nord', mange: 'des poissons, des vers et des crevettes', corps: 'une peau toute blanche et une grosse tête ronde', petit: 'le baleineau', hiver: 'nage sous la glace et cherche des trous pour respirer', fait: 'on l’appelle le « canari des mers », car il siffle et chante' },
  { n: 'le tamia rayé', g: 'm', e: '🐿️', hab: 'dans les bois et les jardins', mange: 'des graines, des noix et des petits fruits', corps: 'des rayures sur le dos et des joues qui servent de poches', petit: null, hiver: 'dort dans son terrier et se réveille parfois pour manger ses réserves', fait: 'au Québec, on l’appelle souvent un « suisse »' },
  { n: 'le grand héron', g: 'm', e: '🪶', hab: 'près des marais et des rivières', mange: 'des poissons et des grenouilles', corps: 'de très longues pattes, un long cou et un bec pointu', petit: 'le héronneau', hiver: 'part vers le sud, où il fait plus chaud', fait: 'il reste immobile longtemps avant d’attraper un poisson' },
  { n: 'le monarque', g: 'm', e: '🦋', hab: 'dans les champs fleuris', mange: 'le nectar des fleurs', corps: 'des ailes orange avec des lignes noires', petit: 'la chenille', hiver: 'fait un immense voyage jusqu’au Mexique', fait: 'sa chenille mange seulement des feuilles d’asclépiade' },
  { n: 'le loup gris', g: 'm', e: '🐺', hab: 'dans les grandes forêts du Nord', mange: 'des cerfs, des orignaux et des lièvres', corps: 'une épaisse fourrure grise et de longues pattes', petit: 'le louveteau', hiver: 'chasse en groupe dans la neige', fait: 'il vit en famille, qu’on appelle une meute' },
  { n: 'le porc-épic', g: 'm', e: '🦔', hab: 'dans les forêts', mange: 'l’écorce des arbres et des feuilles', corps: 'des milliers de piquants', petit: null, hiver: 'grignote l’écorce des arbres', fait: 'ses piquants se détachent quand on le touche' },
  { n: 'la mouffette rayée', g: 'f', e: '🦨', hab: 'dans les champs, les bois et même en ville', mange: 'des insectes, des œufs et des fruits', corps: 'une fourrure noire avec deux bandes blanches', petit: null, hiver: 'dort beaucoup dans un terrier', fait: 'elle lance un liquide qui sent très mauvais pour se défendre' },
  { n: 'le huard', g: 'm', e: '🦆', hab: 'sur les lacs calmes', mange: 'des poissons', corps: 'une tête noire, des yeux rouges et un dos tacheté de blanc', petit: null, hiver: 'part vers la mer, plus au sud', fait: 'on le voit sur la pièce de un dollar canadien' },
  { n: 'le lièvre d’Amérique', g: 'm', e: '🐇', hab: 'dans les forêts', mange: 'de l’herbe, des feuilles et de l’écorce', corps: 'de grandes oreilles et de grandes pattes arrière', petit: 'le levraut', hiver: 'change de couleur : sa fourrure brune devient blanche', fait: 'ses grandes pattes l’empêchent de s’enfoncer dans la neige' },
  { n: 'l’écureuil roux', g: 'm', e: '🐿️', hab: 'dans les forêts de sapins et d’épinettes', mange: 'des graines de cocottes et des noix', corps: 'une fourrure rousse et une queue en panache', petit: null, hiver: 'reste actif et mange les réserves qu’il a cachées', fait: 'il peut cacher des centaines de cocottes' },
  { n: 'la tortue peinte', g: 'f', e: '🐢', hab: 'dans les étangs et les lacs calmes', mange: 'des plantes, des insectes et de petits poissons', corps: 'une carapace foncée avec des lignes rouges et jaunes', petit: null, hiver: 'dort au fond de l’étang, sous la glace', fait: 'elle aime se chauffer au soleil sur une bûche' },
  { n: 'le raton laveur', g: 'm', e: '🦝', hab: 'dans les bois, mais aussi en ville', mange: 'presque tout : des fruits, des œufs, des insectes et nos restes', corps: 'un masque noir autour des yeux et une queue rayée', petit: null, hiver: 'dort beaucoup dans un abri, sans vraiment hiberner', fait: 'il tâte sa nourriture avec ses pattes avant, souvent dans l’eau' },
];
const NOINFO = ['combien il pèse', 'combien de temps il vit', 'quelle est sa couleur préférée', 'combien il y en a au Québec', 'à quelle vitesse il court'];
const deArt = (n) => n.replace(/^le /, 'du ').replace(/^la /, 'de la ').replace(/^l’/, 'de l’');
const T116 = 'Un texte informatif donne des faits. Les intertitles (petits titres) t’aident à trouver vite une information.'.replace('intertitles', 'intertitres');
const f116 = readUnit('f116', '📰', 'Le texte informatif', 'Informational texts',
  'Lecture — texte informatif : repérer une information, intertitres (Progression MEQ, 1er cycle)', (level, R) => {
    const a = R.pick(FAUNE), others = R.sample(FAUNE.filter((x) => x !== a), 3);
    const P = a.g === 'f' ? 'Elle' : 'Il', p = a.g === 'f' ? 'elle' : 'il', N = cap(a.n);
    const title = `${a.e} ${N}`;
    const q = (k, prompt, field, tip = T116) => ({ key: k, prompt, right: cap(a[field]), wrongs: others.map((o) => cap(o[field])), tip });
    const qHab = q('hab', `Où vit ${a.n}?`, 'hab'), qMange = q('mange', `Que mange ${a.n}?`, 'mange'), qCorps = q('corps', `Qu’est-ce qui aide à reconnaître ${a.n}?`, 'corps');
    const tf = R.pick(['hab', 'mange', 'corps']); const o = R.pick(others); const lie = R.chance(0.5);
    const verb = { hab: `${N} vit ${lie ? o.hab : a.hab}.`, mange: `${N} mange ${lie ? o.mange : a.mange}.`, corps: `${N} a ${lie ? o.corps : a.corps}.` }[tf];
    const qTF = { key: `vf-${tf}-${lie ? o.n : 'v'}`, prompt: 'Vrai ou faux, selon le texte?', right: lie ? 'Faux' : 'Vrai', wrongs: [lie ? 'Vrai' : 'Faux'], n: 2, tip: 'Retourne dans le texte pour vérifier.' };
    const qTFs = { ...qTF, prompt: `Vrai ou faux? « ${verb} »` };
    if (level === 1) {
      const text = `${N} vit ${a.hab}. ${P} mange ${a.mange}. ${P} a ${a.corps}.`;
      return { key: `1-${a.n}`, title, text, qs: [{ key: 'sujet', prompt: 'De quel animal parle ce texte?', right: N, wrongs: others.map((x) => cap(x.n)), tip: 'Le titre dit souvent de quoi parle le texte.' }, qHab, qMange, qCorps, qTFs] };
    }
    if (level === 2) {
      const text = `Son habitat\n${N} vit ${a.hab}.\n\nSon alimentation\n${P} mange ${a.mange}.\n\nSon apparence\n${P} a ${a.corps}.${a.petit ? `\n\nSes petits\nLe petit ${deArt(a.n)} s’appelle ${a.petit}.` : ''}`;
      const qs = [qHab, qMange,
        { key: 'inter', prompt: `Sous quel intertitre trouves-tu ce que mange ${a.n}?`, right: 'Son alimentation', wrongs: ['Son habitat', 'Son apparence', 'Ses petits'], tip: 'L’alimentation, c’est ce qu’on mange.' },
        qCorps, qTFs];
      if (a.petit) qs.splice(3, 0, { key: 'petit', prompt: `Comment s’appelle le petit ${deArt(a.n)}?`, right: cap(a.petit), wrongs: R.sample(FAUNE.filter((x) => x.petit && x.petit !== a.petit), 3).map((x) => cap(x.petit)), tip: T116 });
      return { key: `2-${a.n}`, title, text, qs };
    }
    const text = `${N} est un animal ${a.g === 'f' ? 'qu’on peut observer' : 'qu’on peut observer'} au Québec.\n\nOù vit-${p}?\n${P} vit ${a.hab}.\n\nQue mange-t-${p}?\n${P} mange ${a.mange}.\n\nComment le reconnaître?\n${P} a ${a.corps}.\n\nEt l’hiver?\nL’hiver, ${N.charAt(0).toLowerCase() + N.slice(1)} ${a.hiver}.\n\nLe savais-tu?\nIncroyable : ${a.fait}!`;
    const missing = R.pick(NOINFO);
    return { key: `3-${a.n}`, title, text, qs: [
      q('hiver', `Que fait ${a.n} l’hiver?`, 'hiver'), q('fait', 'Quel fait étonnant apprends-tu dans la partie « Le savais-tu? »?', 'fait'),
      { key: `manque-${missing}`, prompt: 'Quelle information ne se trouve PAS dans le texte?', right: cap(missing), wrongs: ['Où il vit', 'Ce qu’il mange', 'Ce qu’il fait l’hiver'], tip: 'Vérifie chaque intertitre. Ce qui n’est nulle part n’est pas dans le texte.' },
      { key: 'inter3', prompt: `Sous quel intertitre apprends-tu ce que fait ${a.n} quand il fait froid?`, right: 'Et l’hiver?', wrongs: ['Où vit-' + p + '?', 'Que mange-t-' + p + '?', 'Le savais-tu?'], tip: 'Pense au sens de chaque intertitre.' },
      qTFs] };
  }, 5);

/* ================================================================== */
/*  f117 — La recette et le mode d’emploi : suivre des consignes      */
/* ================================================================== */
// { t: titre, k: genre, mat: matériel, ing: [[quantité, ingrédient]], st: étapes, why: [[question, bonne, faux]], num: [[question, réponse]] }
const PROC = {
  1: [
    { t: 'Se laver les mains', k: 'mode', mat: ['du savon', 'une serviette'], st: ['Mouille tes mains.', 'Mets du savon.', 'Frotte tes mains longtemps.', 'Rince et essuie tes mains.'] },
    { t: 'Faire un sandwich', k: 'recette', mat: ['du pain', 'du beurre', 'du fromage', 'un couteau à beurre'], st: ['Prends deux tranches de pain.', 'Étends du beurre sur le pain.', 'Ajoute une tranche de fromage.', 'Ferme le sandwich.'] },
    { t: 'Planter une graine', k: 'mode', mat: ['un pot', 'de la terre', 'une graine', 'un arrosoir'], st: ['Remplis le pot de terre.', 'Fais un trou avec ton doigt.', 'Mets la graine dans le trou.', 'Arrose un peu.'] },
    { t: 'Préparer son sac d’école', k: 'mode', mat: ['un sac à dos', 'un coffre à crayons', 'une boîte à lunch'], st: ['Ouvre ton sac à dos.', 'Mets ton coffre à crayons.', 'Ajoute ta boîte à lunch.', 'Ferme ton sac.'] },
    { t: 'Faire un avion en papier', k: 'mode', mat: ['une feuille de papier'], st: ['Plie la feuille en deux.', 'Plie les coins du haut.', 'Plie les ailes.', 'Lance ton avion.'] },
    { t: 'Nourrir le poisson rouge', k: 'mode', mat: ['de la nourriture pour poisson'], st: ['Ouvre le pot de nourriture.', 'Mets une petite pincée dans l’eau.', 'Regarde le poisson manger.', 'Referme le pot.'] },
    { t: 'Se brosser les dents', k: 'mode', mat: ['une brosse à dents', 'du dentifrice', 'un verre d’eau'], st: ['Mets du dentifrice sur ta brosse.', 'Brosse toutes tes dents.', 'Crache dans le lavabo.', 'Rince ta bouche.'] },
    { t: 'Faire un lait au chocolat', k: 'recette', mat: ['du lait', 'de la poudre de chocolat', 'un verre', 'une cuillère'], st: ['Verse le lait dans le verre.', 'Ajoute la poudre de chocolat.', 'Brasse avec la cuillère.', 'Bois ton lait au chocolat!'] },
    { t: 'Mettre son habit de neige', k: 'mode', mat: ['un pantalon de neige', 'des bottes', 'un manteau', 'des mitaines'], st: ['Enfile ton pantalon de neige.', 'Mets tes bottes.', 'Mets ton manteau et ta tuque.', 'Mets tes mitaines.'] },
    { t: 'Jouer à « Jean dit »', k: 'règles', mat: ['des amis'], st: ['Choisis un meneur.', 'Le meneur donne un ordre.', 'On obéit seulement s’il dit « Jean dit ».', 'Celui qui se trompe sort du jeu.'] },
  ],
  2: [
    { t: 'Smoothie aux fraises', k: 'recette', mat: ['un mélangeur', 'un couteau', 'deux verres'], ing: [[2, 'tasses de fraises'], [1, 'banane'], [1, 'tasse de yogourt'], [1, 'tasse de lait']],
      st: ['Lave les fraises et enlève les queues.', 'Épluche la banane et coupe-la en morceaux.', 'Mets tous les ingrédients dans le mélangeur.', 'Mélange jusqu’à ce que ce soit lisse.', 'Verse dans deux verres.'] },
    { t: 'Crêpes du dimanche', k: 'recette', mat: ['un grand bol', 'un fouet', 'une poêle'], ing: [[2, 'tasses de farine'], [3, 'œufs'], [2, 'tasses de lait'], [1, 'pincée de sel'], [2, 'cuillères à soupe de beurre fondu']],
      st: ['Mets la farine et le sel dans un grand bol.', 'Ajoute les œufs et mélange.', 'Verse le lait petit à petit en brassant.', 'Ajoute le beurre fondu.', 'Fais cuire les crêpes dans une poêle, avec un adulte.'] },
    { t: 'Salade de fruits', k: 'recette', mat: ['un couteau', 'une planche à découper', 'un grand bol'], ing: [[2, 'pommes'], [1, 'orange'], [1, 'tasse de raisins'], [3, 'kiwis']],
      st: ['Lave les fruits.', 'Coupe les pommes et les kiwis en dés, avec un adulte.', 'Épluche l’orange et sépare les quartiers.', 'Mets tous les fruits dans le bol.', 'Mélange doucement et sers bien frais.'] },
    { t: 'Biscuits à l’avoine', k: 'recette', mat: ['un bol', 'une cuillère de bois', 'une plaque à biscuits'], ing: [[1, 'tasse de beurre mou'], [1, 'tasse de cassonade'], [2, 'œufs'], [2, 'tasses de flocons d’avoine'], [1, 'tasse de farine']],
      st: ['Fais chauffer le four, avec un adulte.', 'Mélange le beurre et la cassonade.', 'Ajoute les œufs, puis l’avoine et la farine.', 'Forme des boules et place-les sur la plaque.', 'Fais cuire 12 minutes.'], num: [['Combien de minutes faut-il faire cuire les biscuits?', 12]] },
    { t: 'Trempette aux légumes', k: 'recette', mat: ['un bol', 'une cuillère', 'un couteau'], ing: [[1, 'tasse de crème sure'], [2, 'cuillères à soupe de mayonnaise'], [1, 'pincée de sel'], [3, 'carottes'], [1, 'concombre']],
      st: ['Mélange la crème sure et la mayonnaise.', 'Ajoute le sel.', 'Lave et coupe les légumes en bâtonnets.', 'Mets la trempette au frigo 30 minutes.', 'Trempe les légumes et régale-toi!'], num: [['Combien de minutes la trempette reste-t-elle au frigo?', 30]] },
    { t: 'Pâte à modeler maison', k: 'mode', mat: ['un grand bol', 'une cuillère'], ing: [[2, 'tasses de farine'], [1, 'tasse de sel'], [1, 'tasse d’eau'], [2, 'cuillères à soupe d’huile'], [3, 'gouttes de colorant']],
      st: ['Mets la farine et le sel dans le bol.', 'Ajoute l’huile.', 'Verse l’eau petit à petit en mélangeant.', 'Ajoute le colorant.', 'Pétris la pâte avec tes mains.'] },
    { t: 'Muffins aux bleuets', k: 'recette', mat: ['un bol', 'un moule à muffins', 'une cuillère'], ing: [[2, 'tasses de farine'], [1, 'tasse de sucre'], [2, 'œufs'], [1, 'tasse de lait'], [1, 'tasse de bleuets']],
      st: ['Fais chauffer le four, avec un adulte.', 'Mélange la farine et le sucre.', 'Ajoute les œufs et le lait.', 'Ajoute les bleuets doucement.', 'Remplis le moule et fais cuire 20 minutes.'], num: [['Combien de minutes faut-il faire cuire les muffins?', 20]] },
  ],
  3: [
    { t: 'Une mangeoire d’oiseaux', k: 'mode', mat: ['un carton de lait vide', 'des ciseaux', 'un bâton', 'de la ficelle', 'des graines d’oiseaux'],
      st: ['Lave et sèche le carton de lait.', 'Avec un adulte, découpe une fenêtre sur deux côtés du carton.', 'Perce un trou sous chaque fenêtre et passe le bâton dedans.', 'Remplis le fond du carton de graines.', 'Attache la mangeoire à une branche avec la ficelle.'],
      why: [['Pourquoi faut-il laver le carton d’abord?', 'Pour enlever le lait qui sentirait mauvais.', ['Pour le rendre plus lourd.', 'Pour changer sa couleur.', 'Pour que les oiseaux puissent le boire.']],
        ['À quoi sert le bâton?', 'Les oiseaux peuvent s’y poser pour manger.', ['Il ferme la mangeoire.', 'Il fait peur aux oiseaux.', 'Il sert à remplir les graines.']]] },
    { t: 'La tire sur la neige', k: 'recette', mat: ['une casserole', 'un grand plat', 'des bâtonnets'], ing: [[1, 'tasse de sirop d’érable'], [1, 'grand plat de neige propre']],
      st: ['Remplis un grand plat de neige propre et tasse-la bien.', 'Avec un adulte, fais bouillir le sirop dans une casserole.', 'Laisse bouillir environ 10 minutes, jusqu’à ce que le sirop épaississe.', 'Verse le sirop chaud en bandes sur la neige.', 'Attends quelques secondes, puis enroule la tire sur un bâtonnet.'],
      why: [['Pourquoi faut-il être avec un adulte?', 'Le sirop bouillant peut brûler.', ['Le sirop coûte cher.', 'La neige est lourde.', 'Les bâtonnets sont pointus.']],
        ['Pourquoi attendre quelques secondes avant d’enrouler la tire?', 'La neige refroidit le sirop et le rend plus dur.', ['Pour que la neige fonde.', 'Pour que le sirop devienne liquide.', 'Pour laisser le sirop s’envoler.']]],
      num: [['Environ combien de minutes fait-on bouillir le sirop?', 10]] },
    { t: 'La chaise musicale', k: 'règles', mat: ['des chaises', 'de la musique'],
      st: ['Place les chaises en cercle, une de moins que le nombre de joueurs.', 'Les joueurs marchent autour des chaises pendant la musique.', 'Quand la musique s’arrête, chacun s’assoit vite.', 'Le joueur qui reste debout sort du jeu.', 'On enlève une chaise et on recommence.'],
      why: [['Pourquoi y a-t-il une chaise de moins que de joueurs?', 'Pour qu’un joueur reste debout à chaque tour.', ['Pour que tout le monde soit assis.', 'Parce qu’une chaise est brisée.', 'Pour faire plus de bruit.']],
        ['Qui gagne la partie?', 'Le dernier joueur assis sur la dernière chaise.', ['Le premier joueur debout.', 'Celui qui chante le mieux.', 'Celui qui met la musique.']]],
      num: [['S’il y a 8 joueurs, combien de chaises faut-il au début?', 7]] },
    { t: 'Le volcan en éruption', k: 'expérience', mat: ['une bouteille vide', 'un grand plateau', 'une cuillère'], ing: [[3, 'cuillères à soupe de bicarbonate de soude'], [1, 'tasse de vinaigre'], [5, 'gouttes de colorant rouge'], [1, 'cuillère à thé de savon à vaisselle']],
      st: ['Place la bouteille au centre du plateau.', 'Mets le bicarbonate de soude dans la bouteille.', 'Ajoute le colorant et le savon à vaisselle.', 'Verse le vinaigre d’un seul coup.', 'Recule et regarde la lave mousser!'],
      why: [['Pourquoi met-on la bouteille sur un plateau?', 'Pour que la mousse ne salisse pas la table.', ['Pour que la bouteille soit plus haute.', 'Pour faire du bruit.', 'Pour garder le vinaigre froid.']],
        ['Que se passe-t-il quand le vinaigre touche le bicarbonate?', 'Ça fait beaucoup de mousse et de bulles.', ['Rien du tout.', 'Le mélange devient dur comme de la roche.', 'La bouteille devient froide comme de la glace.']]] },
    { t: 'Le pouding chômeur', k: 'recette', mat: ['un bol', 'un plat allant au four', 'une casserole'], ing: [[1, 'tasse de farine'], [2, 'cuillères à thé de poudre à pâte'], [1, 'œuf'], [1, 'tasse de lait'], [2, 'tasses de sirop d’érable'], [1, 'tasse d’eau']],
      st: ['Fais chauffer le four, avec un adulte.', 'Mélange la farine, la poudre à pâte, l’œuf et le lait.', 'Étends la pâte dans le plat.', 'Fais chauffer le sirop et l’eau, puis verse-les sur la pâte.', 'Fais cuire 40 minutes : la pâte monte et le sirop fait une sauce dessous.'],
      why: [['Pourquoi verse-t-on le sirop sur la pâte?', 'Pour faire une sauce sucrée au fond du plat.', ['Pour laver le plat.', 'Pour refroidir la pâte.', 'Pour que la pâte devienne verte.']]],
      num: [['Combien de minutes faut-il faire cuire le pouding?', 40]] },
    { t: 'Semer des radis', k: 'mode', mat: ['des graines de radis', 'un râteau', 'un arrosoir'],
      st: ['Choisis un coin ensoleillé du jardin.', 'Ameublis la terre avec le râteau.', 'Trace un petit sillon dans la terre.', 'Sème les graines à 3 centimètres l’une de l’autre et recouvre-les.', 'Arrose doucement chaque jour : tu récolteras tes radis dans environ 25 jours.'],
      why: [['Pourquoi faut-il espacer les graines?', 'Pour que chaque radis ait de la place pour grossir.', ['Pour utiliser moins de terre.', 'Pour que les oiseaux les trouvent.', 'Pour que le jardin soit plus joli.']],
        ['Pourquoi choisir un coin ensoleillé?', 'Les plantes ont besoin de lumière pour pousser.', ['Pour ne pas avoir froid.', 'Parce que les radis aiment la nuit.', 'Pour que la terre soit mouillée.']]],
      num: [['Dans combien de jours environ pourra-t-on récolter les radis?', 25], ['À combien de centimètres l’une de l’autre faut-il semer les graines?', 3]] },
  ],
};
const KIND = { recette: 'expliquer comment préparer quelque chose à manger', mode: 'expliquer comment faire quelque chose, étape par étape', règles: 'expliquer les règles d’un jeu', expérience: 'expliquer comment faire une expérience' };
const T117 = 'Dans une recette ou un mode d’emploi, on lit d’abord le matériel, puis on suit les étapes dans l’ordre.';
const f117 = readUnit('f117', '🥣', 'La recette et le mode d’emploi', 'Recipes and instructions',
  'Lecture — textes qui disent comment faire (recette, mode d’emploi, règles de jeu) : suivre des consignes (Progression MEQ, 1er cycle)', (level, R) => {
    const p = R.pick(PROC[level]); const all = Object.values(PROC).flat().filter((x) => x !== p);
    const steps = p.st;
    const head = p.ing ? `Ingrédients :\n${p.ing.map(([q, x]) => `• ${q} ${x}`).join('\n')}\n\nMatériel :\n${p.mat.map((x) => `• ${x}`).join('\n')}` : `Matériel :\n${p.mat.map((x) => `• ${x}`).join('\n')}`;
    const text = `${head}\n\nÉtapes :\n${steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    const qs = [];
    const i = R.int(0, steps.length - 2);
    qs.push({ key: 'premier', prompt: 'Que faut-il faire en premier?', right: steps[0], wrongs: steps.slice(1), tip: T117 });
    qs.push({ key: `apres${i}`, prompt: `Que faut-il faire juste après l’étape ${i + 1}?`, right: steps[i + 1], wrongs: steps.filter((_, j) => j !== i + 1 && j !== i), tip: 'Trouve l’étape dans la liste, puis lis la suivante.' });
    if (p.ing) { const [qq, x] = R.pick(p.ing); qs.push({ key: `qte-${x}`, prompt: `Combien de « ${x} » faut-il?`, keypad: qq, tip: 'Les nombres devant les ingrédients sont les quantités.' }); }
    const otherMat = R.pick(all.filter((x) => x.mat.every((m) => !p.mat.includes(m))));
    qs.push({ key: 'mat', prompt: 'De quoi as-tu besoin?', right: cap(R.pick(p.mat)), wrongs: R.sample(all.flatMap((x) => x.mat).filter((m) => !p.mat.includes(m) && !(p.ing || []).some(([, x]) => x.includes(m.replace(/^(un|une|des|du|de la|de l’) /, '')))), 3).map(cap), tip: 'Regarde la liste du matériel.' });
    if (level >= 2) qs.push({ key: 'ordre', prompt: 'Place les étapes dans l’ordre.', tiles: steps.slice(0, 3).map((s) => s.replace(/[.!]$/, '')), tip: T117 });
    if (level === 1) qs.push({ key: 'dernier', prompt: 'Quelle est la dernière étape?', right: steps[steps.length - 1], wrongs: steps.slice(0, -1), tip: T117 });
    if (level === 1 || level === 3) qs.push({ key: 'but', prompt: 'À quoi sert ce texte?', right: cap(KIND[p.k]), wrongs: ['Raconter une histoire inventée', 'Donner des nouvelles à un ami', ...Object.values(KIND).filter((k) => k !== KIND[p.k]).map(cap)], tip: 'Ce texte dit comment faire : il donne des consignes.' });
    if (level >= 2 && p.ing) { const x = R.pick(all.filter((y) => y.ing).flatMap((y) => y.ing.map(([q2, z]) => `${q2} ${z}`)).filter((z) => !p.ing.some(([q2, w]) => `${q2} ${w}`.split(' ').slice(-1)[0] === z.split(' ').slice(-1)[0]))); qs.push({ key: `pas-${x}`, prompt: 'Quel ingrédient n’est PAS dans la recette?', right: x, wrongs: R.sample(p.ing.map(([q2, z]) => `${q2} ${z}`), 3), tip: 'Compare avec la liste des ingrédients.' }); }
    for (const [k, [qq, r, w]] of (p.why || []).entries()) qs.push({ key: `why${k}`, prompt: qq, right: r, wrongs: w, tip: 'La réponse n’est pas toujours écrite : réfléchis à ce qui arriverait autrement.' });
    for (const [k, [qq, r]] of (p.num || []).entries()) qs.push({ key: `num${k}`, prompt: qq, keypad: r, tip: 'Cherche le nombre dans les étapes.' });
    if (level === 3) { const j = R.int(1, steps.length - 1); qs.push({ key: `avant${j}`, prompt: `Quelle étape vient juste avant l’étape ${j + 1}?`, right: steps[j - 1], wrongs: steps.filter((_, k) => k !== j - 1 && k !== j), tip: T117 }); }
    return { key: `${level}-${p.t}`, title: p.t, text, qs: level === 3 ? [qs[0], ...R.shuffle(qs.slice(1))] : qs };
  }, 6);

/* ================================================================== */
/*  f118 — Le poème et la comptine (rimes)                            */
/* ================================================================== */
// { t: titre, th: [thème, faux thèmes], v: vers (strophes séparées par ''), r: [[mot, rime]] }
const POEMS = {
  1: [
    { t: 'Mon chat Pompon', th: ['un chat qui dort et qui rêve', ['un chien qui court', 'une souris qui mange du riz']], v: ['Mon chat Pompon', 'dort sur le balcon.', 'Il rêve d’une souris', 'qui danse sur le tapis.'], r: [['Pompon', 'balcon'], ['souris', 'tapis']] },
    { t: 'La neige', th: ['la neige qui tombe', ['la pluie d’été', 'un bonhomme qui fond']], v: ['Petits flocons tout blancs,', 'vous tombez doucement.', 'Sur ma tuque et sur mon nez,', 'vous venez vous poser.'], r: [['blancs', 'doucement'], ['nez', 'poser']] },
    { t: 'Les pommes', th: ['la cueillette des pommes', ['un pique-nique à la plage', 'un gâteau aux carottes']], v: ['Une pomme rouge, une pomme verte,', 'la porte du verger est ouverte.', 'Je croque, je croque, miam, c’est bon!', 'J’en garde une pour mon ami Simon.'], r: [['verte', 'ouverte'], ['bon', 'Simon']] },
    { t: 'Au bord du lac', th: ['des animaux au bord du lac', ['un voyage en avion', 'une journée d’école']], v: ['Au bord du lac, la grenouille', 'fait des bulles et se mouille.', 'Le canard fait coin-coin,', 'le soleil brille au loin.'], r: [['grenouille', 'mouille'], ['coin', 'loin']] },
  ],
  2: [
    { t: 'L’automne', th: ['l’automne et ses feuilles', ['la fête de Noël', 'les vacances à la mer']], v: ['Les feuilles tombent en tournant,', 'rouges et jaunes, dans le vent.', 'L’écureuil fait ses provisions,', 'il cache des noix dans sa maison.', '', 'Les outardes partent en voyage,', 'en V, très haut, sous les nuages.', 'Moi, je saute dans un gros tas,', 'et je ris aux éclats!'], r: [['tournant', 'vent'], ['provisions', 'maison'], ['voyage', 'nuages'], ['tas', 'éclats']] },
    { t: 'Ma tuque', th: ['une tuque chaude et douce', ['un chapeau de soleil', 'des bottes de pluie']], v: ['J’ai une tuque à pompon,', 'tricotée par ma tante Manon.', 'Elle est rouge comme une cerise', 'et douce comme une brise.', '', 'Quand le vent souffle sur la ville,', 'ma tuque reste bien tranquille.', 'Elle garde mes oreilles au chaud,', 'du matin jusqu’au dodo.'], r: [['pompon', 'Manon'], ['cerise', 'brise'], ['ville', 'tranquille'], ['chaud', 'dodo']] },
    { t: 'Le dragon gourmand', th: ['un dragon gentil et gourmand', ['un dragon méchant qui crache du feu', 'un chevalier qui part en guerre']], v: ['Dans une grotte au fond des bois', 'vit un dragon qui n’a pas froid.', 'Il ne crache pas de feu, non, non :', 'il fait griller des guimauves et des bonbons!', '', 'Le soir, les enfants du village', 'viennent le voir, calmes et sages.', 'Ils partagent un grand festin,', 'puis vont dormir jusqu’au matin.'], r: [['bois', 'froid'], ['non', 'bonbons'], ['village', 'sages'], ['festin', 'matin']] },
    { t: 'La cabane à sucre', th: ['une sortie à la cabane à sucre', ['une journée à la plage', 'la rentrée scolaire']], v: ['Au printemps, quand la neige fond,', 'on part en famille, en chanson.', 'À la cabane, ça sent l’érable,', 'des crêpes chaudes sur la table!', '', 'On verse la tire sur la neige,', 'on la roule : quel beau manège!', 'Grand-papa danse un rigodon,', 'et moi, je lèche mon bâton.'], r: [['fond', 'chanson'], ['érable', 'table'], ['neige', 'manège'], ['rigodon', 'bâton']] },
  ],
  3: [
    { t: 'La nuit d’hiver', th: ['une nuit d’hiver calme et magique', ['une tempête en plein été', 'une journée de pluie à l’école']], v: ['La lune ronde et argentée', 'veille sur la ville gelée.', 'Les étoiles, comme des diamants,', 'clignent des yeux au firmament.', '', 'Dans la forêt, le grand hibou', 'ouvre les yeux et guette partout.', 'Le renard trotte sans un bruit :', 'c’est lui le maître de la nuit.', '', 'Moi, bien au chaud sous ma couette,', 'j’écoute le vent faire des pirouettes,', 'et je m’endors en souriant,', 'bercé par la chanson du vent.'], r: [['argentée', 'gelée'], ['diamants', 'firmament'], ['hibou', 'partout'], ['bruit', 'nuit'], ['couette', 'pirouettes']] },
    { t: 'Le train des saisons', th: ['les quatre saisons qui passent', ['un voyage en avion', 'une course de chevaux']], v: ['Le train des saisons part en voyage,', 'il traverse villes et villages.', 'Au printemps, il sème des fleurs', 'de toutes les formes, de toutes les couleurs.', '', 'En été, il roule au soleil,', 'ses wagons pleins de fruits vermeils.', 'En automne, il ramasse les noix', 'et cueille les pommes au fond des bois.', '', 'En hiver, couvert de flocons,', 'il siffle un air de chanson.', 'Puis il attend, sous la neige blanche,', 'que le printemps revienne un dimanche.'], r: [['voyage', 'villages'], ['fleurs', 'couleurs'], ['soleil', 'vermeils'], ['noix', 'bois'], ['flocons', 'chanson'], ['blanche', 'dimanche']] },
    { t: 'Le béluga', th: ['un béluga qui vit dans le fleuve', ['un requin dans la mer', 'un poisson rouge dans un bocal']], v: ['Dans le grand fleuve Saint-Laurent', 'nage un béluga tout blanc.', 'Il siffle, il chante sous les vagues,', 'et fait aux phoques mille blagues.', '', 'Les marins l’appellent « canari »,', 'car sa chanson est si jolie.', 'Il plonge au fond, puis il remonte', 'respirer l’air, comme dans un conte.', '', 'Prenons bien soin du fleuve bleu,', 'pour qu’il y nage encore, heureux.', 'Gardons ses eaux propres et claires :', 'c’est sa maison, c’est notre affaire!'], r: [['Saint-Laurent', 'blanc'], ['vagues', 'blagues'], ['canari', 'jolie'], ['remonte', 'conte'], ['bleu', 'heureux'], ['claires', 'affaire']] },
    { t: 'Les mots magiques', th: ['les mots gentils qui font du bien', ['les mots difficiles d’une dictée', 'un magicien qui fait des tours']], v: ['Il existe des mots magiques', 'plus doux qu’une boîte à musique :', '« Merci », « s’il te plaît », « pardon »,', 'ils réchauffent toute la maison.', '', 'Quand ma sœur pleure de chagrin,', 'je lui tends doucement la main.', '« Ne t’en fais pas, je suis là »,', 'et son sourire revient déjà.', '', 'Ces mots-là ne coûtent rien,', 'mais ils font tellement de bien.', 'Sème-les partout où tu vas :', 'ils pousseront, tu verras!'], r: [['magiques', 'musique'], ['pardon', 'maison'], ['chagrin', 'main'], ['là', 'déjà'], ['rien', 'bien'], ['vas', 'verras']] },
  ],
};
const RHY = {
  on: ['ballon', 'bonbon', 'mouton', 'crayon', 'camion', 'citron', 'poisson', 'savon', 'cochon', 'pantalon'], eau: ['bateau', 'gâteau', 'chapeau', 'oiseau', 'manteau', 'château', 'râteau', 'pinceau'],
  é: ['café', 'bébé', 'été', 'épée', 'fée', 'thé', 'clé', 'dé'], i: ['souris', 'tapis', 'lit', 'ami', 'radis', 'fourmi', 'pissenlit', 'colibri'],
  ou: ['hibou', 'chou', 'loup', 'genou', 'bijou', 'caillou', 'kangourou', 'bisou'], an: ['éléphant', 'enfant', 'serpent', 'vent', 'dent', 'maman', 'pélican', 'ruban'],
  in: ['lapin', 'sapin', 'matin', 'jardin', 'pain', 'main', 'train', 'copain'], ette: ['chaussette', 'fourchette', 'trompette', 'bicyclette', 'casquette', 'galette', 'clochette', 'allumette'],
  ille: ['fille', 'chenille', 'coquille', 'bille', 'quille', 'grille', 'brindille'], eur: ['fleur', 'cœur', 'peur', 'couleur', 'chanteur', 'facteur', 'moteur'],
};
const RK = Object.keys(RHY);
const sound = (w) => w.toLowerCase().replace(/[sxtd]$/, '').replace(/e?n$/, 'an').replace(/(er|ez|ée?)$/, 'é').slice(-2);
const T118 = 'Des mots riment quand ils finissent par le même son : bateau, gâteau. Un vers, c’est une ligne du poème; une strophe, c’est un paquet de vers.';
function rhymeQ(level, R) {
  const k = R.pick(RK), [w, r] = R.sample(RHY[k], 2); const others = R.sample(RK.filter((x) => x !== k), 3).map((x) => R.pick(RHY[x]));
  if (level === 3) { const fam = R.sample(RHY[k], 3); return { key: `intrus-${fam.join()}-${others[0]}`, prompt: 'Quel mot ne rime pas avec les autres?', right: others[0], wrongs: fam, tip: T118 }; }
  return { key: `rime-${w}-${r}-${others.join()}`, prompt: `Quel mot rime avec « ${w} »?`, right: r, wrongs: others.slice(0, level === 1 ? 2 : 3), tip: T118 };
}
const f118 = readUnit('f118', '🎶', 'Le poème et la comptine', 'Poems and rhymes',
  'Lecture — poème et comptine : rimes, vers, strophes (Progression MEQ, 1er cycle)', (level, R) => {
    const p = R.pick(POEMS[level]); const text = p.v.join('\n').replace(/\n\n/g, '\n\n');
    const lines = p.v.filter((x) => x), strophes = p.v.join('\n').split('\n\n').length;
    const ends = p.r.flat(); const qs = [];
    const [w, r] = R.pick(p.r); const flip = R.chance(0.5);
    const a = flip ? r : w, b = flip ? w : r;
    qs.push({ key: `rime-${a}`, prompt: `Dans le poème, quel mot rime avec « ${a} »?`, right: b, wrongs: R.sample(ends.filter((x) => x !== a && x !== b && sound(x) !== sound(a) && sound(x) !== sound(b)), level === 1 ? 2 : 3), tip: T118 });
    qs.push({ key: 'theme', prompt: 'De quoi parle ce poème?', right: cap(p.th[0]), wrongs: p.th[1].map(cap), tip: 'Pense à l’idée de tout le poème, pas juste à un mot.' });
    qs.push({ key: 'titre', prompt: 'Quel est le titre du poème?', right: p.t, wrongs: R.sample(Object.values(POEMS).flat().filter((x) => x !== p).map((x) => x.t), level === 1 ? 2 : 3), tip: 'Le titre est écrit en haut, au-dessus du poème.' });
    if (level >= 2) qs.push({ key: 'vers', prompt: 'Combien de vers (lignes) a ce poème?', keypad: lines.length, tip: 'Compte chaque ligne écrite. Les lignes vides ne comptent pas.' });
    if (level === 3) {
      qs.push({ key: 'strophes', prompt: 'Combien de strophes a ce poème?', keypad: strophes, tip: 'Une strophe est un groupe de vers séparé par une ligne vide.' });
      const li2 = R.pick(lines.map((l, k) => k).filter((k) => p.r.some(([, x]) => lines[k].replace(/[.,!:;»?]+$/, '').endsWith(x))));
      const line2 = lines[li2]; const [m2, n2] = p.r.find(([, x]) => line2.replace(/[.,!:;»?]+$/, '').endsWith(x));
      const fam2 = RK.map((k) => RHY[k]).find((f) => f.includes(n2)) || [];
      qs.push({ key: `complete-${li2}`, prompt: `Un mot manque dans le poème. Lequel? Il rime avec « ${m2} ».`, right: n2, wrongs: R.sample(ends.filter((x) => x !== n2 && x !== m2 && !fam2.includes(x) && sound(x) !== sound(n2) && sound(x) !== sound(m2)), 3), tip: T118,
        stimText: text.replace(line2, line2.replace(new RegExp(`${n2}([.,!:;»?]*)$`), `${BL}$1`)) });
    }
    qs.push(rhymeQ(level, R));
    return { key: `${level}-${p.t}`, title: p.t, text, qs };
  }, 6);

/* ================================================================== */
/*  f119 — La lettre et le message : qui écrit à qui?                 */
/* ================================================================== */
const KIN = [['Maman', 'sa mère'], ['Papa', 'son père'], ['Grand-maman', 'sa grand-mère'], ['Grand-papa', 'son grand-père']];
const FOODS = ['du lait', 'du pain', 'des œufs', 'des bananes', 'du beurre'];
const SICK = [['la grippe', 'malade'], ['un rendez-vous chez le dentiste', 'un rendez-vous'], ['une otite', 'malade'], ['de la fièvre', 'malade']];
const DAYS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const EVENTS = [
  ['sa fête d’anniversaire', 'ton maillot de bain', 'à la piscine du quartier'], ['un pique-nique', 'une collation à partager', 'au parc des Érables'],
  ['une soirée pyjama', 'ton sac de couchage', 'chez moi, au 12, rue des Pins'], ['une partie de hockey', 'tes patins et ton casque', 'à l’aréna'],
  ['un spectacle de marionnettes', 'tes parents', 'au sous-sol de la bibliothèque'], ['une chasse aux cocos de Pâques', 'un panier', 'dans la cour de grand-maman'],
];
const GIFTS = [['la tuque rouge', 'Je l’adore.', 'Je la porte tous les jours.'], ['le casse-tête de 100 morceaux', 'Je l’adore.', 'Je l’ai déjà fait deux fois.'], ['le livre sur les dinosaures', 'Je l’adore.', 'Je le lis tous les soirs.'], ['les crayons de couleur', 'Je les adore.', 'Je les utilise tous les jours.'], ['le toutou en forme de castor', 'Je l’adore.', 'Il dort avec moi chaque nuit.']];
const NEWS = [['J’ai perdu ma première dent!', 'Il a perdu une dent.'], ['Nous avons adopté un chiot qui s’appelle Biscuit.', 'Sa famille a adopté un chiot.'], ['J’ai appris à nager sans ma veste.', 'Il a appris à nager.'], ['J’ai gagné une médaille au soccer.', 'Il a gagné une médaille.'], ['Ma petite sœur marche maintenant toute seule.', 'Sa petite sœur marche.']];
const RELS = [['Chère grand-maman', 'à sa grand-mère', 'Ton petit-fils|Ta petite-fille'], ['Cher oncle Paul', 'à son oncle', 'Ton neveu|Ta nièce'], ['Chère cousine Rosalie', 'à sa cousine', 'Ton cousin|Ta cousine'], ['Cher grand-papa', 'à son grand-père', 'Ton petit-fils|Ta petite-fille'], ['Chère tante Julie', 'à sa tante', 'Ton neveu|Ta nièce']];
const PARTS = ['la formule d’appel', 'la formule de salutation', 'la signature', 'le lieu et la date'];
const T119 = 'Dans une lettre ou un message, cherche qui écrit (la signature, en bas), à qui (en haut) et pourquoi.';
const f119 = readUnit('f119', '✉️', 'La lettre et le message', 'Letters and messages',
  'Lecture — lettre, message, invitation : qui écrit à qui, et pourquoi? (Progression MEQ, 1er cycle)', (level, R) => {
    const h = hero(R), il = h.f ? 'elle' : 'il';
    if (level === 1) {
      const [to] = R.pick(KIN); const kind = R.int(0, 2);
      if (kind === 0) { const fr = R.pick((h.f ? NF : NM).filter((x) => x !== h.N)); const hr = R.int(4, 6);
        const text = `${to},\n\nJe suis chez ${fr} pour jouer. Je reviens à ${hr} h pour le souper.\n\nBisous!\n${h.N}`;
        return { key: `1a-${h.N}-${to}-${fr}-${hr}`, title: '📝 Un message', text, qs: [
          { key: 'qui', prompt: 'Qui a écrit ce message?', right: h.N, wrongs: [fr, to], tip: 'La personne qui écrit signe en bas.' },
          { key: 'aqui', prompt: 'À qui est écrit ce message?', right: to, wrongs: [fr, h.N], tip: 'La personne à qui on écrit est nommée en haut.' },
          { key: 'ou', prompt: `Où est ${h.N}?`, right: `chez ${fr}`, wrongs: ['à l’école', 'au parc'], tip: T119 },
          { key: 'heure', prompt: `À quelle heure ${h.N} revient-${il}?`, keypad: hr, tip: 'Cherche le nombre suivi de « h ».' },
          { key: 'repas', prompt: `Pour quel repas ${h.N} revient-${il}?`, right: 'le souper', wrongs: ['le déjeuner', 'le dîner'], tip: 'Au Québec, le repas du soir s’appelle le souper.' }] };
      }
      if (kind === 1) { const fd = R.pick(FOODS);
        const text = `${to},\n\nPeux-tu acheter ${fd} au dépanneur? Il n’y en a plus dans le frigo.\n\nMerci!\n${h.N}`;
        return { key: `1b-${h.N}-${to}-${fd}`, title: '📝 Un message', text, qs: [
          { key: 'qui', prompt: 'Qui a écrit ce message?', right: h.N, wrongs: [to, R.pick(NF.filter((x) => x !== h.N))], tip: 'La signature est en bas.' },
          { key: 'aqui', prompt: 'À qui est écrit ce message?', right: to, wrongs: KIN.map(([k]) => k).filter((k) => k !== to).slice(0, 2), tip: T119 },
          { key: 'quoi', prompt: `Qu’est-ce ${queN(h.N)} demande?`, right: `d’acheter ${fd}`, wrongs: FOODS.filter((x) => x !== fd).slice(0, 2).map((x) => `d’acheter ${x}`), tip: T119 },
          { key: 'ou', prompt: 'Où faut-il aller?', right: 'au dépanneur', wrongs: ['à la bibliothèque', 'à la pharmacie'], tip: T119 },
          { key: 'pourquoi', prompt: 'Pourquoi faut-il en acheter?', right: 'Il n’y en a plus dans le frigo.', wrongs: [`C’est la fête ${deN(h.N)}.`, 'Le dépanneur ferme.'], tip: T119 }] };
      }
      const [why, state] = R.pick(SICK); const d = R.pick(DAYS.slice(0, 5)); const [par, parRel] = R.pick([['Nathalie', 'sa mère'], ['Martin', 'son père']]);
      const text = `Bonjour madame Lemieux,\n\n${h.N} ne pourra pas aller à l’école ${d}, car ${il} a ${why}.\n\nMerci et bonne journée,\n${par}, ${parRel === 'sa mère' ? 'la mère' : 'le père'} ${deN(h.N)}`;
      return { key: `1c-${h.N}-${why}-${d}-${par}`, title: '📝 Un message pour l’école', text, qs: [
        { key: 'qui', prompt: 'Qui a écrit ce message?', right: `${parRel === 'sa mère' ? 'La mère' : 'Le père'} ${deN(h.N)}`, wrongs: [h.N, 'Madame Lemieux'], tip: 'Lis la signature au complet.' },
        { key: 'aqui', prompt: 'À qui est écrit ce message?', right: 'à madame Lemieux, l’enseignante', wrongs: [`à ${h.N}`, 'au directeur'], tip: T119 },
        { key: 'quand', prompt: `Quel jour ${h.N} va-t-${il} manquer l’école?`, right: d, wrongs: R.sample(DAYS.filter((x) => x !== d), 2), tip: T119 },
        { key: 'pourquoi', prompt: `Pourquoi ${h.N} va-t-${il} manquer l’école?`, right: `${cap(il)} a ${why}.`, wrongs: SICK.filter(([x]) => x !== why).slice(0, 2).map(([x]) => `${cap(il)} a ${x}.`), tip: T119 }] };
    }
    if (level === 2) {
      const [ev, bring, place] = R.pick(EVENTS); const d = R.pick(DAYS.slice(5)); const day = R.int(2, 28); const mo = R.pick(MONTHS.slice(3, 9)); const hr = R.int(10, 15); const rsvp = R.pick(['mercredi', 'jeudi', 'vendredi']);
      const evText = ev.replace(/^sa /, h.f ? 'sa ' : 'sa ');
      const text = `🎉 Invitation 🎉\n\n${h.N} t’invite à ${evText}!\n\nQuand : ${d} ${day} ${mo}, à ${hr} h\nOù : ${place}\nApporte : ${bring}\n\nRéponds-moi avant ${rsvp}.\n${h.N}`;
      const otherEv = R.sample(EVENTS.filter(([x]) => x !== ev), 3);
      return { key: `2-${h.N}-${ev}-${d}-${day}-${mo}-${hr}`, title: 'Une invitation', text, qs: [
        { key: 'qui', prompt: 'Qui envoie cette invitation?', right: h.N, wrongs: R.sample([...NF, ...NM].filter((x) => x !== h.N), 3), tip: T119 },
        { key: 'quoi', prompt: 'À quoi es-tu invité?', right: cap(evText), wrongs: otherEv.map(([x]) => cap(x)), tip: T119 },
        { key: 'jour', prompt: 'Quel jour a lieu l’événement?', right: `${d} ${day} ${mo}`, wrongs: [`${d === 'samedi' ? 'dimanche' : 'samedi'} ${day} ${mo}`, `${d} ${day === 28 ? 27 : day + 1} ${mo}`, `${rsvp} ${day} ${mo}`], tip: 'Regarde la ligne « Quand ».' },
        { key: 'heure', prompt: 'À quelle heure commence l’événement?', keypad: hr, tip: 'Regarde la ligne « Quand ».' },
        { key: 'ou', prompt: 'Où a lieu l’événement?', right: cap(place), wrongs: otherEv.map(([, , x]) => cap(x)), tip: 'Regarde la ligne « Où ».' },
        { key: 'apporte', prompt: 'Qu’est-ce que tu dois apporter?', right: cap(bring), wrongs: otherEv.map(([, x]) => cap(x)), tip: 'Regarde la ligne « Apporte ».' }] };
    }
    const [appel, toWhom, signT] = R.pick(RELS); const city = R.pick(CITIES); const day = R.int(1, 28); const mo = R.pick(MONTHS); const [gift, love, use] = R.pick(GIFTS); const [news, newsSum] = R.pick(NEWS);
    const sign = gt(`{${signT}}`, h.N, h.f); const close = R.pick(['Je t’embrasse fort', 'Gros câlins', 'À bientôt']);
    const text = `${city}, le ${day} ${mo}\n\n${appel},\n\nMerci beaucoup pour ${gift}! ${love} ${use}\n\nJ’ai aussi une grande nouvelle : ${news.charAt(0).toLowerCase() + news.slice(1)} ${R.pick(['Je suis tellement content' + (h.f ? 'e' : '') + '!', 'Tu vas voir quand tu viendras!', 'Maman a pris une photo.'])}\n\nEst-ce que tu viendras nous visiter cet été?\n\n${close},\n${sign}, ${h.N}`;
    const relWrong = RELS.filter(([x]) => x !== appel).map(([, x]) => cap(x));
    const partQ = R.pick([[`« ${appel}, »`, 'la formule d’appel'], [`« ${close}, »`, 'la formule de salutation'], [`« ${sign}, ${h.N} »`, 'la signature'], [`« ${city}, le ${day} ${mo} »`, 'le lieu et la date']]);
    return { key: `3-${h.N}-${appel}-${city}-${day}-${mo}-${gift}-${news}`, title: 'Une lettre', text, qs: [
      { key: 'qui', prompt: 'Qui a écrit cette lettre?', right: h.N, wrongs: [appel.replace(/^Ch(er|ère) /, ''), ...R.sample([...NF, ...NM].filter((x) => x !== h.N), 2)].map(cap), tip: 'La signature est à la fin de la lettre.' },
      { key: 'aqui', prompt: `À qui ${h.N} écrit-${il}?`, right: cap(toWhom), wrongs: R.sample(relWrong, 3), tip: 'La formule d’appel, au début, dit à qui on écrit.' },
      { key: 'pourquoi', prompt: `Pourquoi ${h.N} écrit-${il} surtout?`, right: `Pour dire merci pour ${gift}`, wrongs: ['Pour s’excuser d’une bêtise', 'Pour demander un cadeau', 'Pour raconter un cauchemar'], tip: 'Le but est souvent dit au début de la lettre.' },
      { key: 'nouvelle', prompt: 'Quelle nouvelle annonce-t-il?'.replace('il?', `${il}?`), right: gt(newsSum.replace(/^Il /, '{Il} '), h.N, h.f), wrongs: R.sample(NEWS.filter(([n]) => n !== news), 3).map(([, s]) => gt(s.replace(/^Il /, '{Il} '), h.N, h.f)), tip: T119 },
      { key: 'lieu', prompt: 'De quelle ville la lettre a-t-elle été écrite?', right: city, wrongs: R.sample(CITIES.filter((x) => x !== city), 3), tip: 'Le lieu et la date sont écrits en haut de la lettre.' },
      { key: `partie-${partQ[1]}`, prompt: `Comment s’appelle cette partie de la lettre : ${partQ[0]}?`, right: cap(partQ[1]), wrongs: PARTS.filter((x) => x !== partQ[1]).map(cap), tip: 'Une lettre a : le lieu et la date, la formule d’appel, le message, la formule de salutation et la signature.' }] };
  }, 6);

/* ================================================================== */
/*  Exports                                                           */
/* ================================================================== */
export const units = [
  f80, f81, f82, f83, f84, f85, f86, f87, f88, f89,
  f90, f91, f92, f93, f94, f95,
  f96, f97, f98, f99, f100, f101, f102, f103,
  f104, f105, f106, f107, f108, f109, f110, f111,
  f112, f113, f114, f115, f116, f117, f118, f119,
];
// Sections suggérées pour la page Français (main.js)
export const GROUPS = [
  { id: 'gram2', icon: '🧱', title: { fr: 'Grammaire', en: 'Grammar' }, ids: ['f80', 'f81', 'f82', 'f83', 'f84', 'f85', 'f86', 'f87', 'f88', 'f89'] },
  { id: 'conj2', icon: '🎤', title: { fr: 'Conjugaison', en: 'Verbs' }, ids: ['f90', 'f91', 'f92', 'f93', 'f94', 'f95'] },
  { id: 'homo2', icon: '👂', title: { fr: 'Homophones', en: 'Sound-alike words' }, ids: ['f96', 'f97', 'f98', 'f99', 'f100', 'f101', 'f102', 'f103'] },
  { id: 'vocab2', icon: '💬', title: { fr: 'Vocabulaire', en: 'Vocabulary' }, ids: ['f104', 'f105', 'f106', 'f107', 'f108', 'f109', 'f110', 'f111'] },
  { id: 'lect2', icon: '📚', title: { fr: 'Stratégies de lecture', en: 'Reading strategies' }, ids: ['f112', 'f113', 'f114', 'f115', 'f116', 'f117', 'f118', 'f119'] },
];
