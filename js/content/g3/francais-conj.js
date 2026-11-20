// Petit Hibou — Français 3e année : conjugaison (g3f26 → g3f32).
// Présent (-er, -ir comme finir, être, avoir, aller, faire, dire, prendre, pouvoir, vouloir, venir, voir), imparfait,
// futur simple, passé composé (avoir / être, introduction), infinitif / temps / personne.
// Facile = pronom + verbe; Moyen = phrases avec un groupe du nom sujet, -ger / -cer, irréguliers;
// Difficile = sujet éloigné du verbe, transformer une phrase, choisir la phrase bien écrite, écrire à la main.
import { ch, srt, ord, ans, dict, unit, cap, fx, sy } from './francais-lib.js';

/* ============================== moteur de conjugaison ============================== */
const PRES_IRR = {
  être: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
  avoir: ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
  aller: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'],
  faire: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'],
  dire: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'],
  prendre: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'],
  pouvoir: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'],
  vouloir: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'],
  venir: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'],
  voir: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'],
};
for (const [d, b] of [['apprendre', 'prendre'], ['comprendre', 'prendre'], ['revenir', 'venir'], ['devenir', 'venir']]) PRES_IRR[d] = PRES_IRR[b].map((f) => d.slice(0, d.length - b.length) + f);
const IR = new Set(['finir', 'choisir', 'remplir', 'réussir', 'nourrir', 'grandir', 'obéir', 'bâtir', 'rougir']);
const ER_SP = { acheter: 'achèt', jeter: 'jett', promener: 'promèn' };
const FUT_IRR = { être: 'ser', avoir: 'aur', aller: 'ir', faire: 'fer', pouvoir: 'pourr', vouloir: 'voudr', venir: 'viendr', revenir: 'reviendr', devenir: 'deviendr', voir: 'verr', acheter: 'achèter', jeter: 'jetter', promener: 'promèner' };
const PP_IRR = { être: 'été', avoir: 'eu', faire: 'fait', dire: 'dit', prendre: 'pris', apprendre: 'appris', comprendre: 'compris', pouvoir: 'pu', vouloir: 'voulu',
  venir: 'venu', revenir: 'revenu', devenir: 'devenu', voir: 'vu', naître: 'né', mourir: 'mort', descendre: 'descendu', partir: 'parti', sortir: 'sorti' };
const ETRE_V = new Set(['aller', 'venir', 'revenir', 'devenir', 'arriver', 'partir', 'entrer', 'sortir', 'tomber', 'rester', 'naître', 'mourir', 'descendre', 'monter', 'retourner']);

function present(inf, p) {
  if (PRES_IRR[inf]) return PRES_IRR[inf][p];
  if (IR.has(inf)) return inf.slice(0, -2) + ['is', 'is', 'it', 'issons', 'issez', 'issent'][p];
  let s = inf.slice(0, -2);
  if (p === 3 && s.endsWith('g')) return s + 'eons';
  if (p === 3 && s.endsWith('c')) return s.slice(0, -1) + 'çons';
  if ([0, 1, 2, 5].includes(p) && ER_SP[inf]) s = ER_SP[inf];
  return s + ['e', 'es', 'e', 'ons', 'ez', 'ent'][p];
}
function imparfait(inf, p) {
  let st = inf === 'être' ? 'ét' : present(inf, 3).slice(0, -3);
  const end = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'][p];
  if (end[0] === 'i') { if (st.endsWith('ge')) st = st.slice(0, -1); if (st.endsWith('ç')) st = st.slice(0, -1) + 'c'; }
  return st + end;
}
function futur(inf, p) {
  const st = FUT_IRR[inf] || (inf.endsWith('re') ? inf.slice(0, -1) : inf);
  return st + ['ai', 'as', 'a', 'ons', 'ez', 'ont'][p];
}
const pp = (inf) => PP_IRR[inf] || (inf.endsWith('er') ? inf.slice(0, -2) + 'é' : inf.slice(0, -2) + 'i');
const ppAgree = (inf, g, plural) => pp(inf) + (ETRE_V.has(inf) ? (g === 'f' ? 'e' : '') + (plural ? 's' : '') : '');
function pc(inf, p, g = 'm') { const aux = ETRE_V.has(inf) ? 'être' : 'avoir'; return `${present(aux, p)} ${ppAgree(inf, g, p >= 3)}`; }
export const conj = (T, inf, p, g) => (T === 'pres' ? present(inf, p) : T === 'imp' ? imparfait(inf, p) : T === 'fut' ? futur(inf, p) : pc(inf, p, g));

const lbl = (T, inf) => (T === 'pres' ? inf : `${inf}, ${TNAME[T]}`);
const VOW = /^[aeiouéèêâîôh]/i;
const join = (subj, verb) => (subj === 'je' && VOW.test(verb) ? `j’${verb}` : `${subj} ${verb}`);
const blankWith = (subj, right) => (subj === 'je' ? (VOW.test(right) ? 'j’___' : 'je ___') : `${subj} ___`);

// fautes « sosies » d’une forme conjuguée
const SOS = [[/(?<!i)ent$/, 'e'], [/(?<!i)ent$/, 'es'], [/e$/, 'es'], [/es$/, 'e'], [/([^n])t$/, '$1s'], [/([^é])s$/, '$1t'], [/x$/, 't'], [/ons$/, 'ont'], [/ont$/, 'ons'], [/ez$/, 'er'], [/ez$/, 'é'],
  [/ais$/, 'ait'], [/ait$/, 'ais'], [/aient$/, 'ait'], [/aient$/, 'ais'], [/ions$/, 'ont'], [/a$/, 'as'], [/as$/, 'a'], [/ai$/, 'ait'], [/é$/, 'er'], [/é$/, 'ez'], [/i$/, 'it'],
  [/i$/, 'is'], [/is$/, 'it'], [/it$/, 'is'], [/u$/, 'ut'], [/eons$/, 'ons'], [/çons$/, 'cons'], [/çais$/, 'cais'], [/geais$/, 'gais'], [/ée?s?$/, 'é'], [/é$/, 'ée'], [/é$/, 'és']];
const SOS_SP = { faites: ['faisez'], dites: ['disez'], font: ['faisent'], prennent: ['prenent', 'prendent'], viennent: ['venent', 'vienent'], voient: ['voyent'],
  peuvent: ['pouvent', 'peuve'], veulent: ['voulent', 'veule'], vont: ['allent', 'vons'], sont: ['sons'], ont: ['on'], peux: ['peut', 'peu'], veux: ['veut', 'veu'],
  iront: ['allerons', 'iron'], irons: ['allerons', 'irrons'], ferons: ['faierons', 'feront'], verrons: ['voirons', 'verons'], pourrons: ['pouvons', 'pourons'],
  serons: ['êtrons', 'serrons'], aurons: ['avoirons', 'aurrons'], viendrons: ['venirons', 'viendront'], voudrons: ['vouloirons', 'voudront'], pris: ['prit', 'prendu'], fait: ['fais', 'faisé'],
  dit: ['dis', 'disé'], vu: ['vus', 'voyé'], pu: ['pus', 'pouvé'], voulu: ['voulus', 'voulé'], eu: ['eut', 'avé'], été: ['êté', 'étai'] };
function sosies(form) {
  const words = form.split(' '), last = words.pop(), pre = words.length ? words.join(' ') + ' ' : '';
  return [...new Set([...SOS.map(([re, r]) => last.replace(re, r)), ...(SOS_SP[last] || [])])].filter((x) => x !== last && x.length > 1).map((x) => pre + x);
}

/* ============================== banques ============================== */
// verbes en -er de la liste (et quelques verbes très courants), avec des compléments neutres (sans possessif)
const ER = [
  ['aider', ['la voisine à pelleter', 'le concierge de l’école']], ['apporter', ['un cadeau à la fête', 'des biscuits pour la classe']],
  ['attraper', ['le ballon', 'un papillon dans le champ']], ['cacher', ['le trésor sous le lit', 'les bonbons dans une boîte']],
  ['compter', ['les étoiles', 'jusqu’à mille']], ['continuer', ['la course', 'le dessin']], ['crier', ['très fort dans le parc', 'de joie']],
  ['danser', ['dans le salon', 'au spectacle de fin d’année']], ['écouter', ['la radio', 'une histoire de pirates']], ['fermer', ['la fenêtre', 'la porte du garage']],
  ['gagner', ['la course', 'un prix au concours']], ['garder', ['le chat du voisin', 'un secret']], ['glisser', ['sur la glace', 'dans la grosse butte']],
  ['habiter', ['près du fleuve', 'dans un appartement']], ['marcher', ['jusqu’au parc', 'sur le trottoir']], ['montrer', ['le dessin à la classe', 'le chemin aux visiteurs']],
  ['oublier', ['la tuque à l’école', 'le lunch sur la table']], ['porter', ['un gros sac', 'des bottes de pluie']], ['pousser', ['la porte', 'le traîneau']],
  ['préparer', ['le souper', 'une surprise']], ['raconter', ['une blague', 'une histoire de fantômes']], ['rêver', ['de vacances', 'd’un voyage en avion']],
  ['rouler', ['à vélo', 'sur la piste cyclable']], ['sauver', ['un petit oiseau', 'le chaton du voisin']], ['tirer', ['la corde', 'le traîneau dans la neige']],
  ['toucher', ['le museau du poney', 'la neige fraîche']], ['travailler', ['au bureau', 'dans le jardin']], ['traverser', ['la rue', 'le pont']],
  ['verser', ['du jus dans un verre', 'du lait dans le bol']], ['chanter', ['une chanson', 'dans la chorale']], ['jouer', ['au hockey', 'aux cartes']],
  ['regarder', ['un film', 'les nuages']], ['frapper', ['à la porte', 'la balle']], ['écouter', ['la musique', 'les consignes']],
].filter((x, i, a) => a.findIndex((y) => y[0] === x[0]) === i);
const ER_GC = [
  ['manger', ['une pomme', 'du spaghetti au souper']], ['nager', ['dans la rivière', 'à la piscine']], ['changer', ['de chandail', 'la pile de la lampe']],
  ['ranger', ['la chambre', 'les jouets']], ['plonger', ['dans le lac', 'du quai']], ['bouger', ['beaucoup', 'au rythme de la musique']],
  ['commencer', ['les devoirs', 'la partie de soccer']], ['avancer', ['lentement sur la glace', 'vers la porte']], ['lancer', ['la balle', 'une boule de neige']],
  ['placer', ['les chaises en cercle', 'les livres sur la tablette']],
];
const ER_SPV = [['acheter', ['du pain au dépanneur', 'des pommes au marché']], ['jeter', ['les papiers à la poubelle', 'la balle au chien']], ['promener', ['le chien', 'le bébé en poussette']]];
const IRV = [['finir', ['les devoirs', 'le casse-tête']], ['choisir', ['un livre', 'une couleur']], ['remplir', ['la bouteille', 'le seau d’eau']],
  ['réussir', ['le test', 'un tour de magie']], ['nourrir', ['les poules', 'les canards']], ['grandir', ['vite', 'chaque année']], ['obéir', ['au gardien', 'aux consignes']]];
const ETRE_AVOIR = [['être', ['à l’école', 'en retard', 'dans la cour']], ['avoir', ['un vélo rouge', 'faim', 'un rhume']]];
const ALLER_FAIRE = [['aller', ['au parc', 'à la piscine', 'chez le dentiste']], ['faire', ['un gâteau', 'du ski', 'un casse-tête']]];
const IRR2A = [['dire', ['bonjour', 'la vérité', 'merci']], ['prendre', ['l’autobus', 'une photo', 'une collation']], ['voir', ['un orignal', 'la mer', 'un arc-en-ciel']],
  ['venir', ['à la fête', 'de Québec', 'au spectacle']]];
const IRR2B = [['pouvoir', ['jouer dehors', 'venir ce soir']], ['vouloir', ['un chien', 'jouer au hockey', 'une crème glacée']], ['apprendre', ['une chanson', 'à nager']],
  ['comprendre', ['la question', 'la consigne']], ['revenir', ['de l’école', 'du marché']]];
const ETRE_PC = [['aller', ['au parc', 'à la piscine', 'au cinéma']], ['venir', ['à la fête', 'au spectacle']], ['arriver', ['en retard', 'à l’école']],
  ['partir', ['en voyage', 'très tôt']], ['entrer', ['dans la classe', 'dans la cuisine']], ['sortir', ['dans la cour', 'sous la pluie']], ['tomber', ['dans la neige', 'de la balançoire']],
  ['rester', ['à la maison', 'au chalet']], ['descendre', ['au sous-sol', 'de l’autobus']], ['monter', ['au grenier', 'dans l’autobus']], ['retourner', ['à la plage', 'au zoo']],
  ['naître', ['en hiver', 'à Rimouski']]];

const PRON = [['je', 0], ['tu', 1], ['il', 2], ['elle', 2], ['nous', 3], ['vous', 4], ['ils', 5], ['elles', 5]];
const PNAME = ['1re personne du singulier', '2e personne du singulier', '3e personne du singulier', '1re personne du pluriel', '2e personne du pluriel', '3e personne du pluriel'];
// sujets groupes du nom (Moyen) — t en minuscules sauf les prénoms
const SUBJ2 = [
  { t: 'Léa', p: 2, g: 'f' }, { t: 'Noah', p: 2, g: 'm' }, { t: 'mon oncle', p: 2, g: 'm' }, { t: 'ma voisine', p: 2, g: 'f' }, { t: 'le facteur', p: 2, g: 'm' },
  { t: 'la directrice', p: 2, g: 'f' }, { t: 'mes cousins', p: 5, g: 'm' }, { t: 'les jumelles', p: 5, g: 'f' }, { t: 'les élèves', p: 5, g: 'm' },
  { t: 'mes grands-parents', p: 5, g: 'm' }, { t: 'ma sœur et moi', p: 3 }, { t: 'Félix et moi', p: 3 }, { t: 'ton frère et toi', p: 4 }, { t: 'Zoé et Camille', p: 5, g: 'f' },
  { t: 'Léo et Samuel', p: 5, g: 'm' }, { t: 'la gardienne', p: 2, g: 'f' }, { t: 'grand-papa', p: 2, g: 'm' }, { t: 'les filles', p: 5, g: 'f' },
];
// sujets éloignés du verbe (Difficile)
const SUBJ3 = [
  { t: 'la sœur de mes amis', p: 2, g: 'f' }, { t: 'le gardien de but de notre équipe', p: 2, g: 'm' }, { t: 'les parents de Noah', p: 5, g: 'm' },
  { t: 'les enfants de la classe de madame Lise', p: 5, g: 'm' }, { t: 'le chauffeur des autobus scolaires', p: 2, g: 'm' }, { t: 'les amies de ma cousine', p: 5, g: 'f' },
  { t: 'mon voisin, un vieux monsieur très gentil,', p: 2, g: 'm' }, { t: 'les joueuses de l’équipe de soccer', p: 5, g: 'f' }, { t: 'la gardienne de mes petits frères', p: 2, g: 'f' },
  { t: 'Alice, la meilleure amie de ma sœur,', p: 2, g: 'f' }, { t: 'mes cousins de Rimouski', p: 5, g: 'm' }, { t: 'le professeur de musique', p: 2, g: 'm' },
  { t: 'mon frère et toi', p: 4 }, { t: 'mes amis et moi', p: 3 }, { t: 'la petite fille aux tresses', p: 2, g: 'f' }, { t: 'les voisins d’en face', p: 5, g: 'm' },
];
const MARK = {
  pres: ['Aujourd’hui,', 'En ce moment,', 'Maintenant,'],
  imp: ['Autrefois,', 'Avant,', 'À cette époque,', 'Quand grand-maman était petite,', 'Dans le temps,'],
  fut: ['Demain,', 'Plus tard,', 'L’été prochain,', 'La semaine prochaine,', 'Dans deux jours,', 'Samedi prochain,'],
  pc: ['Hier,', 'Hier soir,', 'La semaine dernière,', 'Samedi dernier,', 'L’an passé,'],
};
const TNAME = { pres: 'présent', imp: 'imparfait', fut: 'futur simple', pc: 'passé composé' };
const TAU = { pres: 'au présent', imp: 'à l’imparfait', fut: 'au futur simple', pc: 'au passé composé' };
const TFRAME = { pres: 'présent', imp: 'passé', fut: 'futur', pc: 'passé' };

const ENDTIP = {
  pres: ['Avec je, le verbe en -er finit par -e.', 'Avec tu, le verbe finit par -s.', 'Avec il ou elle, le verbe en -er finit par -e.', 'Avec nous, le verbe finit par -ons.',
    'Avec vous, le verbe finit souvent par -ez.', 'Avec ils ou elles, le verbe finit par -nt, qu’on n’entend pas.'],
  imp: ['À l’imparfait, avec je : -ais.', 'À l’imparfait, avec tu : -ais.', 'À l’imparfait, avec il ou elle : -ait.', 'À l’imparfait, avec nous : -ions.', 'À l’imparfait, avec vous : -iez.', 'À l’imparfait, avec ils ou elles : -aient.'],
  fut: ['Au futur, avec je : -ai.', 'Au futur, avec tu : -as.', 'Au futur, avec il ou elle : -a.', 'Au futur, avec nous : -ons.', 'Au futur, avec vous : -ez.', 'Au futur, avec ils ou elles : -ont.'],
  pc: ['Avec je : j’ai… ou je suis…', 'Avec tu : tu as… ou tu es…', 'Avec il ou elle : a… ou est…', 'Avec nous : avons… ou sommes…', 'Avec vous : avez… ou êtes…', 'Avec ils ou elles : ont… ou sont…'],
};
function tipFor(T, inf, p, written) {
  let extra = ENDTIP[T][p];
  if (T === 'pres' && IR.has(inf)) extra = ['Finir : je finis.', 'Finir : tu finis.', 'Finir : il finit, avec un t.', 'Comme finir : nous finissons, avec -iss-.', 'Comme finir : vous finissez, avec -iss-.', 'Comme finir : ils finissent, avec -iss-.'][p];
  else if (T === 'pres' && PRES_IRR[inf]) extra = `« ${inf} » est un verbe irrégulier : il s’apprend par cœur.`;
  else if (T === 'pres' && p === 3 && /[gc]er$/.test(inf)) extra = inf.endsWith('ger') ? 'On garde le e après le g : nous mangeons, pour faire le son « j ».' : 'On met une cédille : nous commençons, pour faire le son « s ».';
  else if (T === 'fut' && FUT_IRR[inf]) extra = `Au futur, « ${inf} » change : ${FUT_IRR[inf]}-. Ensuite : -ai, -as, -a, -ons, -ez, -ont.`;
  else if (T === 'imp' && inf === 'être') extra = 'À l’imparfait, être devient « ét- » : j’étais, nous étions.';
  else if (T === 'pc' && ETRE_V.has(inf)) extra = `« ${inf} » se conjugue avec être : le participe s’accorde avec le sujet.`;
  else if (T === 'pc' && PP_IRR[inf]) extra = `Le participe passé de « ${inf} » est « ${pp(inf)} ».`;
  return `On écrit « ${written} ». ${extra}`;
}

/* ============================== générateurs ============================== */
const vpick = (R, list) => { const [inf, comps] = R.pick(list); const ci = R.int(0, comps.length - 1); return { inf, comp: comps[ci], ci }; };
const lc = (t) => t;
const sentenceOf = (mk, subj, verbText, comp) => {
  const body = join(subj, verbText) + (comp ? ` ${comp}` : '') + '.';
  return mk ? `${mk} ${body}` : cap(body);
};
// formes fausses pour une personne donnée
function wrongForms(T, inf, p, right, o = {}) {
  const pool = [];
  for (let q = 0; q < 6; q++) pool.push(conj(T, inf, q, o.g));
  if (o.sos) pool.push(...sosies(right));
  if (o.inf) pool.push(T === 'pc' ? `${present(ETRE_V.has(inf) ? 'être' : 'avoir', p)} ${inf}` : inf);
  if (o.other) for (const U of o.other) pool.push(conj(U, inf, p, o.g));
  if (T === 'pc' && o.aux) { const aux2 = ETRE_V.has(inf) ? 'avoir' : 'être'; pool.push(`${present(aux2, p)} ${pp(inf)}`); if (ETRE_V.has(inf)) for (const s of ['e', 's', 'es', '']) pool.push(`${present('être', p)} ${pp(inf)}${s}`); }
  let w = [...new Set(pool)].filter((x) => x !== right);
  if (o.subj === 'je') w = w.filter((x) => VOW.test(x) === VOW.test(right));
  return w;
}

// (A) pronom + verbe à compléter
const gPron = (id, T, list, n, o = {}) => (R) => {
  const { inf, comp, ci } = vpick(R, list);
  let [pr, p] = R.pick(PRON);
  if (T === 'pc' && ETRE_V.has(inf)) [pr, p] = R.pick(PRON.filter(([x]) => ['il', 'elle', 'ils', 'elles'].includes(x)));
  const g = pr.startsWith('elle') ? 'f' : 'm';
  const right = conj(T, inf, p, g);
  const mk = o.mark ? R.pick(MARK[T]) : '';
  const body = `${blankWith(pr, right)} ${comp}.`;
  const stim = mk ? `${mk} ${body}` : cap(body);
  const wr = R.shuffle(wrongForms(T, inf, p, right, { ...o, g, subj: pr }));
  return ch(`${id}-a-${T}-${inf}-${pr}-${ci}-${mk}`, 'Choisis le verbe bien conjugué.', right, wr, { n, stimulus: `${stim}  (${lbl(T, inf)})`, tip: tipFor(T, inf, p, join(pr, right)) });
};
// (B) quel pronom va avec ce verbe?
const gWho = (id, T, list) => (R) => {
  const { inf, comp, ci } = vpick(R, list);
  const [pr, p] = R.pick(PRON.filter(([x]) => x !== 'elle' && x !== 'elles'));
  const right = conj(T, inf, p);
  const lab = (x, f) => (x === 'je' && VOW.test(f) ? 'j’' : x);
  const wrongs = R.shuffle(PRON.filter(([x, q]) => conj(T, inf, q) !== right).map(([x, q]) => lab(x, right)));
  return ch(`${id}-b-${T}-${inf}-${p}-${ci}`, 'Quel pronom va avec ce verbe?', lab(pr, right), wrongs, { n: 3, stimulus: `___ ${right} ${comp}.`, tip: tipFor(T, inf, p, join(pr, right)) });
};
// (C) quelle terminaison?
const ENDS = { pres: ['e', 'es', 'e', 'ons', 'ez', 'ent'], imp: ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'], fut: ['ai', 'as', 'a', 'ons', 'ez', 'ont'] };
const gEnd = (id, T, list) => (R) => {
  const { inf, comp, ci } = vpick(R, list);
  const [pr, p] = R.pick(PRON);
  const right = conj(T, inf, p), e = ENDS[T][p];
  if (!right.endsWith(e)) return gPron(id, T, list, 3)(R);
  const stem = right.slice(0, -e.length);
  const others = R.shuffle([...new Set([...ENDS[T], ...(T === 'pres' ? ['s', 'ent'] : [])])].filter((x) => x !== e));
  return ch(`${id}-c-${T}-${inf}-${pr}`, 'Choisis la bonne terminaison.', `-${e}`, others.map((x) => `-${x}`), { n: 3, stimulus: `${cap(join(pr, stem + '___').replace('j’', 'j’'))} ${comp}.`, tip: tipFor(T, inf, p, join(pr, right)) });
};
// (D) groupe du nom sujet (+ marqueur de temps)
const gSubj = (id, T, list, subs, n, o = {}) => (R) => {
  const { inf, comp, ci } = vpick(R, list);
  let pool = subs;
  if (T === 'pc' && ETRE_V.has(inf)) pool = subs.filter((s) => s.g);
  const si = subs.indexOf(R.pick(pool)), s = subs[si];
  const right = conj(T, inf, s.p, s.g);
  const mk = o.mark ? R.pick(MARK[T]) : '';
  const stim = (mk ? `${mk} ${s.t}` : cap(s.t)) + ` ___ ${comp}.`;
  const wr = R.shuffle(wrongForms(T, inf, s.p, right, { ...o, g: s.g }));
  return ch(`${id}-d-${T}-${inf}-${si}-${ci}-${mk}`, o.prompt || 'Choisis le verbe bien conjugué.', right, wr, { n, stimulus: `${stim}  (${lbl(T, inf)})`,
    tip: `Le sujet « ${s.t.replace(/,$/, '')} » = ${['je', 'tu', 'il ou elle', 'nous', 'vous', 'ils ou elles'][s.p]}. ` + tipFor(T, inf, s.p, right).replace(/^On écrit « .*? »\. /, '') });
};
// (E) remettre la phrase en ordre (un intrus : une forme fausse)
const gOrder = (id, T, list, subs, o = {}) => (R) => {
  const { inf, comp, ci } = vpick(R, list);
  let pool = subs; if (T === 'pc' && ETRE_V.has(inf)) pool = subs.filter((s) => s.g);
  const si = subs.indexOf(R.pick(pool)), s = subs[si];
  const right = conj(T, inf, s.p, s.g);
  const mk = o.mark ? R.pick(MARK[T]) : '';
  const text = sentenceOf(mk, mk ? s.t : cap(s.t), right, comp);
  const tiles = text.split(' ');
  const bad = R.shuffle(wrongForms(T, inf, s.p, right, { g: s.g, sos: true }).map((x) => x.split(' ').pop()).filter((x) => !tiles.includes(x) && !tiles.includes(x + '.')))[0];
  return ord(`${id}-e-${T}-${inf}-${si}-${ci}-${mk}`, 'Remets les mots en ordre. Attention à l’intrus!', tiles, { extra: bad ? [bad] : undefined, tip: `La phrase : « ${text} »` });
};
// (F) la phrase bien écrite
const gRight = (id, T, list, subs, o = {}) => (R) => {
  const { inf, comp, ci } = vpick(R, list);
  let pool = subs; if (T === 'pc' && ETRE_V.has(inf)) pool = subs.filter((s) => s.g);
  const si = subs.indexOf(R.pick(pool)), s = subs[si];
  const right = conj(T, inf, s.p, s.g);
  const mk = o.mark ? R.pick(MARK[T]) : '';
  const mkS = (v) => sentenceOf(mk, mk ? s.t : cap(s.t), v, comp);
  const wr = R.shuffle(wrongForms(T, inf, s.p, right, { g: s.g, sos: true, aux: true })).slice(0, 3).map(mkS);
  return ch(`${id}-f-${T}-${inf}-${si}-${ci}-${mk}`, 'Quelle phrase est bien écrite?', mkS(right), wr, { n: 3,
    tip: `Le verbe s’accorde avec le sujet « ${s.t.replace(/,$/, '')} » (${['je', 'tu', 'il ou elle', 'nous', 'vous', 'ils ou elles'][s.p]}) : ${right}.` });
};
// (G) transformer une phrase (présent → temps T)
const gTrans = (id, T, list, subs) => (R) => {
  const { inf, comp, ci } = vpick(R, list);
  let pool = subs; if (T === 'pc' && ETRE_V.has(inf)) pool = subs.filter((s) => s.g);
  const si = subs.indexOf(R.pick(pool)), s = subs[si];
  const src = sentenceOf('', cap(s.t), present(inf, s.p), comp);
  const right = conj(T, inf, s.p, s.g);
  const mkS = (v) => sentenceOf('', cap(s.t), v, comp);
  const other = { imp: ['fut'], fut: ['imp', 'pc'], pc: ['fut'], pres: [] }[T];
  const wr = R.shuffle([...other.map((U) => conj(U, inf, s.p, s.g)), ...wrongForms(T, inf, s.p, right, { g: s.g, sos: true })].filter((x) => x !== right && x !== present(inf, s.p)));
  return ch(`${id}-g-${T}-${inf}-${si}-${ci}`, `Récris la phrase ${TAU[T]}.`, mkS(right), wr.slice(0, 3).map(mkS), { n: 3, stimulus: src,
    tip: `${cap(TAU[T])} : « ${right} ». ${ENDTIP[T][s.p]}` });
};
// (H) écrire deux formes à la main
const PAIRS = [['nous', 'elles'], ['je', 'vous'], ['tu', 'ils'], ['il', 'nous'], ['vous', 'elles'], ['je', 'ils']];
const gHand = (id, T, list) => (R) => {
  const { inf } = vpick(R, list);
  const pi = R.int(0, PAIRS.length - 1), [a, b] = PAIRS[pi];
  const pa = PRON.find((x) => x[0] === a)[1], pb = PRON.find((x) => x[0] === b)[1];
  if (T === 'pc' && ETRE_V.has(inf)) return gHand(id, T, list.filter(([v]) => !ETRE_V.has(v)))(R);
  const fa = join(a, conj(T, inf, pa)), fb = join(b, conj(T, inf, pb, b === 'elles' ? 'f' : 'm'));
  return ans(`${id}-h-${T}-${inf}-${pi}`, 'Écris le verbe conjugué avec chaque pronom.', `${inf} — ${TNAME[T]}\n${a === 'je' ? 'je / j’' : a} … \n${b} …`,
    `${fa}; ${fb}. L’orthographe de la terminaison compte.`, `Réponse : ${fa}, ${fb}. ` + tipFor(T, inf, pa, fa).replace(/^On écrit « .*? ». /, ''), 2);
};
const gDict = (id, bank) => (R) => { const k = R.int(0, bank.length - 1); return dict(`${id}-x-${k}`, bank[k], `Relis ton verbe : qui fait l’action? La terminaison va avec le sujet.`); };

/* ============================== unités ============================== */
const ER_ALL = [...ER, ...ER_GC, ...ER_SPV];
const pfeqC = (s) => `Conjugaison — ${s}`;

// --- g3f26 Présent des verbes en -er
const D26 = ['Nous mangeons des crêpes au sirop d’érable.', 'Mes amis jouent au hockey sur la patinoire.', 'Tu traverses la rue avec prudence.', 'Les enfants glissent sur la grosse butte.',
  'Vous commencez vos devoirs après le souper.', 'Ma sœur rêve de devenir pilote.', 'Je cache mes bonbons dans ma tuque.', 'Nous avançons lentement dans la tempête.',
  'Mon père prépare une soupe aux légumes.', 'Les jumelles dansent au spectacle.'];
const U26 = unit('g3f26', '🟢', 'Le présent des verbes en -er', 'Present tense: -er verbs', pfeqC('présent de l’indicatif des verbes en -er (-e, -es, -e, -ons, -ez, -ent), verbes en -ger et -cer'), {
  1: [gPron('g3f26', 'pres', ER, 3, { inf: true }), gPron('g3f26', 'pres', ER, 3, { inf: true }), gWho('g3f26', 'pres', ER), gEnd('g3f26', 'pres', ER), gEnd('g3f26', 'pres', ER)],
  2: [gSubj('g3f26', 'pres', ER_ALL, SUBJ2, 4, { inf: true, sos: true }), gSubj('g3f26', 'pres', ER_ALL, SUBJ2, 4, { inf: true, sos: true }), gPron('g3f26', 'pres', [...ER_GC, ...ER_SPV], 4, { sos: true }),
    gOrder('g3f26', 'pres', ER_ALL, SUBJ2)],
  3: [gSubj('g3f26', 'pres', ER_ALL, SUBJ3, 4, { inf: true, sos: true }), gRight('g3f26', 'pres', ER_ALL, SUBJ3), gRight('g3f26', 'pres', ER_ALL, SUBJ3), gHand('g3f26', 'pres', ER_ALL), gDict('g3f26', D26)],
});

// --- g3f27 Présent : finir + être, avoir, aller, faire
const D27 = ['Nous finissons notre casse-tête.', 'Les élèves choisissent un livre à la bibliothèque.', 'Vous êtes en retard pour l’autobus.', 'Mes parents ont une nouvelle voiture.',
  'Ils vont à la cabane à sucre en avril.', 'Vous faites un bonhomme de neige.', 'Je remplis ma gourde d’eau fraîche.', 'Elles font du ski avec leur oncle.', 'Tu as un beau chandail.', 'Nous sommes contents de te voir.'];
const V27 = [...IRV, ...ETRE_AVOIR, ...ALLER_FAIRE];
const U27 = unit('g3f27', '🔵', 'Présent : finir, être, avoir, aller, faire', 'Present: finir, être, avoir, aller, faire', pfeqC('présent des verbes comme finir (-iss-) et des verbes être, avoir, aller, faire'), {
  1: [gPron('g3f27', 'pres', [...IRV, ...ETRE_AVOIR], 3, { inf: true }), gPron('g3f27', 'pres', [...IRV, ...ETRE_AVOIR], 3, { inf: true }), gWho('g3f27', 'pres', [...IRV, ...ETRE_AVOIR])],
  2: [gPron('g3f27', 'pres', ALLER_FAIRE, 4, { sos: true }), gSubj('g3f27', 'pres', V27, SUBJ2, 4, { sos: true }), gSubj('g3f27', 'pres', V27, SUBJ2, 4, { sos: true }), gOrder('g3f27', 'pres', V27, SUBJ2)],
  3: [gSubj('g3f27', 'pres', V27, SUBJ3, 4, { sos: true, inf: true }), gRight('g3f27', 'pres', V27, SUBJ3), gRight('g3f27', 'pres', V27, SUBJ3), gHand('g3f27', 'pres', V27), gDict('g3f27', D27)],
});

// --- g3f28 Présent : dire, prendre, pouvoir, vouloir, venir, voir
const D28 = ['Nous prenons l’autobus pour aller au musée.', 'Ils veulent un chien pour Noël.', 'Vous dites toujours la vérité.', 'Les oiseaux reviennent au printemps.',
  'Je peux t’aider à ranger ta chambre.', 'Nous voyons des étoiles filantes.', 'Mes cousins viennent souper ce soir.', 'Tu comprends la consigne du jeu.', 'Elle apprend à jouer du piano.', 'Vous pouvez entrer.'];
const V28 = [...IRR2A, ...IRR2B];
const U28 = unit('g3f28', '🟣', 'Présent : dire, prendre, pouvoir, vouloir, venir, voir', 'Present: dire, prendre, pouvoir, vouloir, venir, voir', pfeqC('présent des verbes irréguliers dire, prendre, pouvoir, vouloir, venir, voir (et apprendre, comprendre, revenir)'), {
  1: [gPron('g3f28', 'pres', IRR2A, 3, { inf: true }), gPron('g3f28', 'pres', IRR2A, 3, { inf: true }), gWho('g3f28', 'pres', IRR2A)],
  2: [gPron('g3f28', 'pres', V28, 4, { sos: true }), gSubj('g3f28', 'pres', V28, SUBJ2, 4, { sos: true }), gSubj('g3f28', 'pres', V28, SUBJ2, 4, { sos: true }), gOrder('g3f28', 'pres', V28, SUBJ2)],
  3: [gSubj('g3f28', 'pres', V28, SUBJ3, 4, { sos: true, inf: true }), gRight('g3f28', 'pres', V28, SUBJ3), gRight('g3f28', 'pres', V28, SUBJ3), gHand('g3f28', 'pres', V28), gDict('g3f28', D28)],
});

// --- g3f29 Imparfait
const D29 = ['Autrefois, les enfants allaient à l’école à pied.', 'Quand j’étais petit, je dormais avec mon ourson.', 'Avant, nous habitions près du fleuve.',
  'Mon grand-père avait un cheval qui s’appelait Tonnerre.', 'À cette époque, les gens écrivaient des lettres.', 'Vous mangiez des tartes aux bleuets chaque été.',
  'Les maisons étaient chauffées au bois.', 'Tu jouais dehors jusqu’au souper.', 'Dans le temps, ma grand-mère faisait son pain.', 'Nous patinions sur la rivière gelée.'];
const V29a = [...ER, ...ETRE_AVOIR], V29b = [...ER, ...ER_GC, ...IRV, ...ETRE_AVOIR, ...ALLER_FAIRE], V29c = [...V29b, ...ER_SPV, ...IRR2A, ...IRR2B];
const U29 = unit('g3f29', '🟠', 'L’imparfait', 'Imperfect tense', pfeqC('imparfait de l’indicatif (-ais, -ais, -ait, -ions, -iez, -aient), marqueurs de temps du passé'), {
  1: [gPron('g3f29', 'imp', V29a, 3, { inf: true }), gPron('g3f29', 'imp', V29a, 3, { other: ['pres'] }), gEnd('g3f29', 'imp', ER), gEnd('g3f29', 'imp', ER), gWho('g3f29', 'imp', V29a)],
  2: [gSubj('g3f29', 'imp', V29b, SUBJ2, 4, { mark: true, other: ['pres', 'fut'], sos: true }), gSubj('g3f29', 'imp', V29b, SUBJ2, 4, { mark: true, other: ['pres', 'fut'], sos: true }),
    gPron('g3f29', 'imp', ER_GC, 4, { mark: true, sos: true }), gOrder('g3f29', 'imp', V29b, SUBJ2, { mark: true })],
  3: [gSubj('g3f29', 'imp', V29c, SUBJ3, 4, { mark: true, other: ['pres', 'fut'], sos: true }), gTrans('g3f29', 'imp', V29c, SUBJ2), gTrans('g3f29', 'imp', V29c, SUBJ3),
    gRight('g3f29', 'imp', V29c, SUBJ3, { mark: true }), gHand('g3f29', 'imp', V29c), gDict('g3f29', D29)],
});

// --- g3f30 Futur simple
const D30 = ['Demain, nous irons à la plage.', 'L’été prochain, je verrai la mer.', 'Plus tard, tu seras vétérinaire.', 'Samedi prochain, ils feront un pique-nique.',
  'Mes cousins viendront à ma fête.', 'Vous aurez une surprise ce soir.', 'Nous pourrons patiner sur le lac gelé.', 'Elle voudra un gâteau au chocolat.', 'Demain, je finirai mon livre.', 'Tu chanteras avec la chorale.'];
const V30a = [...ER, ...IRV], V30b = [...ER, ...IRV, ...ETRE_AVOIR, ...ALLER_FAIRE], V30c = [...V30b, ...IRR2A, ...IRR2B, ...ER_SPV, ...ER_GC];
const U30 = unit('g3f30', '🔴', 'Le futur simple', 'Simple future', pfeqC('futur simple (-ai, -as, -a, -ons, -ez, -ont), futurs irréguliers : serai, aurai, irai, ferai, pourrai, voudrai, viendrai, verrai'), {
  1: [gPron('g3f30', 'fut', V30a, 3, { inf: true }), gPron('g3f30', 'fut', V30a, 3, { other: ['imp'] }), gEnd('g3f30', 'fut', V30a), gEnd('g3f30', 'fut', V30a), gWho('g3f30', 'fut', V30a)],
  2: [gPron('g3f30', 'fut', [...ETRE_AVOIR, ...ALLER_FAIRE], 4, { mark: true, sos: true, other: ['imp'] }), gSubj('g3f30', 'fut', V30b, SUBJ2, 4, { mark: true, other: ['imp', 'pc'], sos: true }),
    gSubj('g3f30', 'fut', V30b, SUBJ2, 4, { mark: true, other: ['imp', 'pc'], sos: true }), gOrder('g3f30', 'fut', V30b, SUBJ2, { mark: true })],
  3: [gSubj('g3f30', 'fut', V30c, SUBJ3, 4, { mark: true, other: ['imp', 'pc'], sos: true }), gPron('g3f30', 'fut', [...IRR2A, ...IRR2B], 4, { mark: true, sos: true, other: ['imp'] }),
    gTrans('g3f30', 'fut', V30c, SUBJ3), gRight('g3f30', 'fut', V30c, SUBJ3, { mark: true }), gHand('g3f30', 'fut', V30c), gDict('g3f30', D30)],
});

// --- g3f31 Passé composé (introduction)
const D31 = ['Hier, nous avons mangé une pizza.', 'Ma sœur est allée à la bibliothèque.', 'Les élèves ont fini leur projet.', 'Mes cousins sont arrivés en retard.',
  'Samedi dernier, j’ai vu un orignal.', 'Elles sont tombées dans la neige.', 'Tu as pris une belle photo.', 'Nous avons fait un château de sable.', 'Hier soir, Léo est resté à la maison.', 'Vous avez dit merci.'];
const AV_REG = [...ER, ...IRV], AV_IRR = [...ETRE_AVOIR, ['faire', ['un gâteau', 'du ski']], ['dire', ['bonjour', 'la vérité']], ['prendre', ['l’autobus', 'une photo']], ['voir', ['un orignal', 'la mer']],
  ['vouloir', ['un chien', 'une crème glacée']], ['apprendre', ['une chanson', 'à nager']], ['comprendre', ['la question', 'la consigne']]];
// (I) choisir l’auxiliaire
const gAux = (id) => (R) => {
  const useEtre = R.chance(0.35);
  const { inf, comp, ci } = vpick(R, useEtre ? ETRE_PC : AV_REG);
  const opts = useEtre ? PRON.filter(([x]) => ['il', 'elle', 'ils', 'elles'].includes(x)) : PRON;
  const [pr, p] = R.pick(opts);
  const g = pr.startsWith('elle') ? 'f' : 'm';
  const aux = present(useEtre ? 'être' : 'avoir', p), part = ppAgree(inf, g, p >= 3);
  const wr = R.shuffle([...new Set([...[0, 1, 2, 3, 4, 5].map((q) => present('avoir', q)), ...[0, 1, 2, 3, 4, 5].map((q) => present('être', q))])].filter((x) => x !== aux));
  const stim = `${cap(pr === 'je' && VOW.test(aux) ? 'j’___' : pr + ' ___')} ${part} ${comp}.`;
  return ch(`${id}-i-${inf}-${pr}-${ci}`, 'Choisis l’auxiliaire.', aux, wr, { n: 3, stimulus: stim,
    tip: `${useEtre ? `« ${inf} » se conjugue avec être` : `« ${inf} » se conjugue avec avoir`} : ${join(pr, aux)} ${part}.` });
};
// (J) choisir le participe passé
const gPP = (id, list, subs) => (R) => {
  const { inf, comp, ci } = vpick(R, list);
  let s;
  if (subs) s = R.pick(ETRE_V.has(inf) ? subs.filter((x) => x.g) : subs);
  else { const [pr, p] = R.pick(ETRE_V.has(inf) ? PRON.filter(([x]) => ['il', 'elle', 'ils', 'elles'].includes(x)) : PRON); s = { t: pr, p, g: pr.startsWith('elle') ? 'f' : 'm' }; }
  const aux = present(ETRE_V.has(inf) ? 'être' : 'avoir', s.p), part = ppAgree(inf, s.g, s.p >= 3);
  const b = pp(inf), more = b.endsWith('é') ? [b.slice(0, -1) + 'ez', b.slice(0, -1) + 'er'] : b.endsWith('i') ? [b + 't', b + 's'] : (SOS_SP[b] || []);
  const wr = R.shuffle([...new Set([...more, inf, b + 's', b + 'e', b + 'es', b])]).filter((x) => x !== part);
  const subj = subs ? cap(s.t) : cap(join(s.t, aux).split(' ')[0]);
  const stim = subs ? `${cap(s.t)} ${aux} ___ ${comp}.` : `${cap(join(s.t, aux))} ___ ${comp}.`;
  return ch(`${id}-j-${inf}-${s.t}-${ci}`, 'Choisis le participe passé.', part, wr, { n: subs ? 4 : 3, stimulus: `${stim}  (${inf})`,
    tip: ETRE_V.has(inf) ? `Avec être, le participe s’accorde avec le sujet : ${part}.` : `Avec avoir, pas d’accord avec le sujet. ${pp(inf) === part ? '' : ''}Le participe de « ${inf} » : ${part}.` });
};
const PC_SUBJ2 = SUBJ2, PC_ALL2 = [...AV_REG, ...AV_IRR, ...ETRE_PC];
const U31 = unit('g3f31', '🟤', 'Le passé composé', 'Past tense (passé composé)', pfeqC('passé composé avec avoir et être (introduction) : auxiliaire + participe passé, accord avec être'), {
  1: [gAux('g3f31'), gAux('g3f31'), gPP('g3f31', AV_REG), gPron('g3f31', 'pc', AV_REG, 3, { inf: true }), gPron('g3f31', 'pc', AV_REG, 3, { inf: true })],
  2: [gPP('g3f31', [...AV_IRR, ...ETRE_PC], PC_SUBJ2), gSubj('g3f31', 'pc', PC_ALL2, PC_SUBJ2, 4, { mark: true, aux: true, sos: true, other: ['fut'] }),
    gSubj('g3f31', 'pc', ETRE_PC, PC_SUBJ2, 4, { mark: true, aux: true }), gOrder('g3f31', 'pc', PC_ALL2, PC_SUBJ2, { mark: true })],
  3: [gPP('g3f31', [...AV_IRR, ...ETRE_PC], SUBJ3), gSubj('g3f31', 'pc', PC_ALL2, SUBJ3, 4, { mark: true, aux: true, sos: true }), gTrans('g3f31', 'pc', PC_ALL2, SUBJ2),
    gRight('g3f31', 'pc', PC_ALL2, SUBJ3, { mark: true }), gHand('g3f31', 'pc', [...AV_REG, ...AV_IRR]), gDict('g3f31', D31)],
});

/* --------------------------- g3f32 Infinitif, temps et personne --------------------------- */
const ALLV = [...ER, ...ER_GC, ...IRV, ...ETRE_AVOIR, ...ALLER_FAIRE, ...IRR2A, ...IRR2B];
const INFS = [...new Set(ALLV.map((x) => x[0]))];
const fakeInf = (inf) => {
  const root = inf.replace(/(er|ir|re|oir)$/, '');
  return [root + 'er', root + 'ir', root + 're', root + 'oir'].filter((x) => x !== inf && x.length > 3 && !INFS.includes(x));
};
const g32Inf = (hard) => (R) => {
  const list = hard ? [...IRR2A, ...IRR2B, ...ETRE_AVOIR, ...ALLER_FAIRE] : [...ER, ...IRV];
  const { inf } = vpick(R, list);
  const T = hard ? R.pick(['pres', 'imp', 'fut', 'pc']) : R.pick(['pres', 'pres', 'imp', 'fut']);
  const [pr, p] = R.pick(PRON);
  if (T === 'pc' && ETRE_V.has(inf) && !['il', 'ils'].includes(pr)) return g32Inf(hard)(R);
  const form = join(pr, conj(T, inf, p));
  const wr = R.shuffle([...fakeInf(inf), ...R.sample(INFS.filter((x) => x !== inf), 2)]);
  return ch(`g3f32-a-${inf}-${T}-${pr}`, 'Quel est l’infinitif de ce verbe?', inf, wr, { n: hard ? 4 : 3, stimulus: form,
    tip: `« ${form} » vient du verbe « ${inf} ». L’infinitif, c’est le nom du verbe : on peut dire « il faut ${inf} ».` });
};
const g32Pers = (subjects) => (R) => {
  const { inf, comp, ci } = vpick(R, [...ER, ...IRV, ...ETRE_AVOIR]);
  const T = R.pick(['pres', 'imp', 'fut']);
  let text, p, k;
  if (subjects) { const si = R.int(0, SUBJ2.length - 1), s = SUBJ2[si]; p = s.p; text = sentenceOf('', cap(s.t), conj(T, inf, p), comp); k = `s${si}`; }
  else { const [pr, q] = R.pick(PRON); p = q; text = cap(join(pr, conj(T, inf, p))); k = pr; }
  const wr = R.shuffle(PNAME.filter((_, i) => i !== p));
  return ch(`g3f32-b-${inf}-${T}-${k}-${subjects ? ci : ''}`, 'À quelle personne est le verbe?', PNAME[p], wr, { n: subjects ? 4 : 3, stimulus: text,
    tip: `On remplace le sujet par un pronom : ${['je', 'tu', 'il ou elle', 'nous', 'vous', 'ils ou elles'][p]} = ${PNAME[p]}.` });
};
const TB = [{ text: 'Passé', emoji: '⏪' }, { text: 'Présent', emoji: '▶️' }, { text: 'Futur', emoji: '⏩' }];
const binOf = (T) => ({ imp: 0, pc: 0, pres: 1, fut: 2 })[T];
const g32Tense = (hard) => (R) => {
  const T = R.pick(hard ? ['pres', 'imp', 'fut', 'pc'] : ['pres', 'imp', 'fut']);
  const { inf, comp, ci } = vpick(R, hard ? ALLV : [...ER, ...IRV, ...ETRE_AVOIR]);
  let pool = SUBJ2; if (T === 'pc' && ETRE_V.has(inf)) pool = SUBJ2.filter((s) => s.g);
  const si = SUBJ2.indexOf(R.pick(pool)), s = SUBJ2[si];
  const text = sentenceOf('', cap(s.t), conj(T, inf, s.p, s.g), comp);
  return ch(`g3f32-c-${inf}-${T}-${si}-${ci}`, 'Cette phrase est au passé, au présent ou au futur?', ['au passé', 'au présent', 'au futur'][binOf(T)],
    ['au passé', 'au présent', 'au futur'], { n: 3, fixedOrder: true, stimulus: text, say: fx('Cette phrase est au passé, au présent ou au futur?'),
      tip: `Le verbe « ${conj(T, inf, s.p, s.g)} » est ${TAU[T]}. Truc : ajoute « hier », « aujourd’hui » ou « demain » et écoute ce qui sonne bien.` });
};
// Correct order of options must be preserved — ch() puts the right one first; rebuild with fixedOrder
const fixTense = (q) => { const labs = ['au passé', 'au présent', 'au futur']; const r = q.options[0].text; q.options = labs.map((text) => ({ text })); q.answer = labs.indexOf(r); return q; };
const g32Sort = (hard) => (R) => {
  const items = [], seen = new Set();
  const Ts = hard ? ['pres', 'imp', 'fut', 'pc'] : ['pres', 'imp', 'fut'];
  for (let i = 0; items.length < 6 && i < 40; i++) {
    const T = Ts[items.length % Ts.length] === undefined ? R.pick(Ts) : (items.length < Ts.length ? Ts[items.length] : R.pick(Ts));
    const { inf } = vpick(R, hard ? ALLV : [...ER, ...IRV, ...ETRE_AVOIR]);
    let [pr, p] = R.pick(PRON);
    if (T === 'pc' && ETRE_V.has(inf)) [pr, p] = ['il', 2];
    const text = join(pr, conj(T, inf, p, 'm'));
    if (seen.has(text)) continue; seen.add(text);
    items.push({ text, bin: binOf(T) });
  }
  return srt(`g3f32-d-${items.map((x) => x.text).sort().join('|')}`, 'Classe chaque verbe : passé, présent ou futur?', TB, R.shuffle(items),
    'Passé : imparfait (-ais, -ait…) et passé composé (ai mangé, est allé). Futur : -rai, -ras, -ra… Présent : ce qui se passe maintenant.');
};
const g32Find = (R) => {
  const T = R.pick(['pres', 'imp', 'fut']);
  const list = [...ER, ...IRV, ...ETRE_AVOIR, ...ALLER_FAIRE].filter(([, c]) => true);
  const { inf, comp, ci } = vpick(R, list);
  const si = R.int(0, SUBJ3.length - 1), s = SUBJ3[si];
  const v = conj(T, inf, s.p);
  const text = sentenceOf('', cap(s.t), v, comp);
  const words = [...new Set(text.replace(/[.,]/g, '').split(' ').map((w) => w.replace(/^[ldj]’/, '')).filter((w) => w.length > 3 && w !== v))];
  return ch(`g3f32-e-${inf}-${T}-${si}-${ci}`, 'Trouve le verbe conjugué dans la phrase.', v, R.shuffle(words), { n: 4, stimulus: text,
    tip: `Le verbe conjugué change avec le temps : « ${v} ». On peut l’encadrer par « ne… pas ».` });
};
const g32Mark = (R) => {
  const T = R.pick(['pres', 'imp', 'fut', 'pc']);
  const { inf, comp, ci } = vpick(R, [...ER, ...IRV, ...ALLER_FAIRE]);
  let pool = SUBJ2; if (T === 'pc' && ETRE_V.has(inf)) pool = SUBJ2.filter((s) => s.g);
  const si = SUBJ2.indexOf(R.pick(pool)), s = SUBJ2[si];
  const v = conj(T, inf, s.p, s.g);
  const right = R.pick(T === 'pres' ? ['En ce moment,', 'Maintenant,'] : MARK[T]);
  const wrongs = T === 'pres' ? [R.pick(MARK.pc), R.pick(MARK.imp)] : T === 'fut' ? [R.pick(MARK.pc), R.pick(MARK.imp), 'En ce moment,'] : [R.pick(MARK.fut), 'En ce moment,'];
  return ch(`g3f32-f-${inf}-${T}-${si}-${ci}`, 'Quel mot de temps va bien au début de la phrase?', right.replace(/,$/, ''), R.shuffle(wrongs).map((x) => x.replace(/,$/, '')),
    { n: 3, stimulus: `___, ${join(s.t, v)} ${comp}.`, tip: `« ${v} » est ${TAU[T]} : il faut un mot qui parle du ${TFRAME[T]}.` });
};
const g32Hand = (R) => {
  const a = vpick(R, [...IRR2A, ...IRR2B, ...ALLER_FAIRE]), b = vpick(R, [...ER, ...IRV, ...ETRE_AVOIR]);
  const Ta = R.pick(['fut', 'pres', 'imp']), Tb = R.pick(['pc', 'imp', 'fut']);
  const fa = join('nous', conj(Ta, a.inf, 3)), fb = join('elle', conj(Tb, b.inf, 2, 'f'));
  return ans(`g3f32-h-${a.inf}-${Ta}-${b.inf}-${Tb}`, 'Écris l’infinitif de chaque verbe.', `1) ${fa}\n2) ${fb}`, `1) ${a.inf}  2) ${b.inf}`,
    `1) ${a.inf}  2) ${b.inf}. L’infinitif finit souvent par -er, -ir, -re ou -oir.`, 1);
};
const U32 = unit('g3f32', '🕰️', 'Infinitif, temps et personne', 'Infinitive, tense and person', pfeqC('reconnaître l’infinitif, la personne (1re, 2e, 3e; singulier, pluriel) et le temps du verbe (passé, présent, futur)'), {
  1: [g32Inf(false), g32Inf(false), g32Pers(false), g32Pers(false), (R) => fixTense(g32Tense(false)(R))],
  2: [g32Pers(true), (R) => fixTense(g32Tense(false)(R)), g32Sort(false), g32Find, g32Inf(true)],
  3: [g32Inf(true), (R) => fixTense(g32Tense(true)(R)), g32Sort(true), g32Mark, g32Mark, g32Find, g32Hand],
});

export const units = [U26, U27, U28, U29, U30, U31, U32];
