// Petit Hibou — Français 3e année : grammaire (g3f20 → g3f25).
// Classes de mots, groupe du nom et accords, accord sujet-verbe, phrase de base (sujet + prédicat + complément de phrase),
// types et formes de phrases, ponctuation. Phrases originales, français du Québec.
import { ch, srt, ord, dict, ans, fx, cap, BL, blankSay, unit, NF, NM } from './francais-lib.js';

const lc = (s) => (/^(Léa|Félix|Zoé|Noah)/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));
const end = (s) => s.replace(/\s+([.!?])$/, '$1');

/* =============================================================================================
 *  g3f20 : les classes de mots
 * ============================================================================================= */
const CLS = { d: 'déterminant', n: 'nom', a: 'adjectif', v: 'verbe', p: 'pronom' };
const CTIP = {
  d: (w) => `« ${w} » est un déterminant : il est placé devant le nom et l’annonce.`,
  n: (w) => `« ${w} » est un nom : il désigne une personne, un animal, une chose ou un lieu.`,
  a: (w) => `« ${w} » est un adjectif : il dit comment est le nom.`,
  v: (w) => `« ${w} » est un verbe : on peut l’encadrer par « ne… pas ».`,
  p: (w) => `« ${w} » est un pronom : il remplace un nom (il, elle, nous…).`,
};
const TAGGED = [
  'Le/d petit/a chat/n noir/a dort/v sous la/d table/n.', 'Ma/d sœur/n mange/v une/d pomme/n rouge/a.', 'Nous/p jouons/v dans le/d grand/a parc/n.',
  'Ils/p regardent/v les/d étoiles/n brillantes/a.', 'Ce/d vieux/a renard/n rusé/a chasse/v les/d poules/n.', 'Elle/p porte/v une/d tuque/n bleue/a.',
  'Mon/d frère/n lance/v la/d balle/n.', 'Les/d enfants/n joyeux/a chantent/v une/d chanson/n.', 'Tu/p lis/v un/d livre/n amusant/a.',
  'Cette/d jolie/a fleur/n pousse/v près de la/d clôture/n.', 'Le/d chien/n affamé/a avale/v son/d repas/n.', 'Vous/p traversez/v la/d rue/n calme/a.',
  'Mes/d parents/n achètent/v une/d nouvelle/a voiture/n.', 'Il/p construit/v une/d cabane/n solide/a.', 'La/d neige/n blanche/a couvre/v les/d sapins/n.',
  'Je/p range/v mes/d crayons/n neufs/a.', 'Notre/d voisin/n gentil/a arrose/v ses/d tomates/n.', 'Elles/p dansent/v sur la/d grande/a scène/n.',
  'Un/d hibou/n curieux/a observe/v la/d forêt/n.', 'Le/d vent/n froid/a secoue/v les/d branches/n.', 'Ton/d ami/n timide/a raconte/v une/d histoire/n.',
  'On/p prépare/v un/d gâteau/n délicieux/a.', 'Les/d oiseaux/n migrateurs/a quittent/v le/d pays/n.', 'Ma/d grand-mère/n tricote/v des/d mitaines/n chaudes/a.',
  'Il/p boit/v un/d chocolat/n chaud/a.', 'Le/d lièvre/n rapide/a traverse/v le/d champ/n.', 'Nous/p visitons/v un/d château/n ancien/a.',
  'Cette/d petite/a souris/n grise/a grignote/v le/d fromage/n.', 'Ils/p gagnent/v la/d partie/n facilement.', 'Le/d docteur/n soigne/v mon/d genou/n blessé/a.',
  'Elle/p cache/v un/d trésor/n précieux/a.', 'Les/d grosses/a vagues/n frappent/v le/d bateau/n.', 'Ce/d camion/n rouge/a transporte/v du/d bois/n.',
  'Tu/p choisis/v un/d beau/a cadeau/n.', 'La/d rivière/n glacée/a brille/v sous le/d soleil/n.', 'Mon/d chat/n paresseux/a dort/v sur le/d sofa/n.',
  'Vous/p écrivez/v une/d longue/a lettre/n.', 'Le/d boulanger/n prépare/v du/d pain/n frais/a.', 'Je/p cherche/v ma/d mitaine/n perdue/a.',
  'Les/d élèves/n attentifs/a écoutent/v la/d directrice/n.', 'Il/p promène/v son/d chien/n fidèle/a.', 'Ces/d belles/a feuilles/n tombent/v doucement.',
  'Elle/p dessine/v un/d dragon/n vert/a.', 'Le/d petit/a poussin/n suit/v sa/d mère/n.', 'Nous/p mangeons/v une/d soupe/n chaude/a.',
  'Les/d pompiers/n courageux/a éteignent/v le/d feu/n.', 'Mon/d oncle/n répare/v sa/d vieille/a bicyclette/n.', 'Elles/p cueillent/v des/d fraises/n sucrées/a.',
];
const PARSED = TAGGED.map((s) => {
  const toks = s.split(' ').map((t) => { const m = t.match(/^(.+?)\/([dnavp])([.,!?]*)$/); return m ? { w: m[1], c: m[2], p: m[3] } : { w: t.replace(/[.,!?]$/, ''), c: null, p: (t.match(/[.,!?]$/) || [''])[0] }; });
  return { toks, text: toks.map((t) => t.w + t.p).join(' ') };
});
function classUnit() {
  const id = 'g3f20';
  const qClass = (R, level) => {
    const si = R.int(0, PARSED.length - 1), S = PARSED[si];
    const pool = S.toks.filter((t) => t.c && (level > 1 || t.c !== 'p'));
    const t = R.pick(pool);
    const others = Object.keys(CLS).filter((c) => c !== t.c && (level > 1 || c !== 'p'));
    return ch(`${id}-c-${si}-${t.w}`, `Dans cette phrase, quelle est la classe du mot « ${t.w} »?`, CLS[t.c], R.shuffle(others).map((c) => CLS[c]),
      { n: level === 1 ? 3 : 4, stimulus: S.text, say: fx(`Quelle est la classe du mot ${t.w}?`), tip: CTIP[t.c](t.w) });
  };
  const qFind = (R, level) => {
    const si = R.int(0, PARSED.length - 1), S = PARSED[si];
    const cs = [...new Set(S.toks.filter((t) => t.c).map((t) => t.c))].filter((c) => level > 1 || c !== 'p');
    const c = R.pick(cs);
    const right = R.pick(S.toks.filter((t) => t.c === c));
    const wr = R.shuffle(S.toks.filter((t) => t.c && t.c !== c).map((t) => t.w));
    const art = { d: 'un déterminant', n: 'un nom', a: 'un adjectif', v: 'le verbe', p: 'le pronom' }[c];
    return ch(`${id}-f-${si}-${c}`, `Touche ${art} de la phrase.`, right.w, wr, { n: 4, stimulus: S.text, tip: CTIP[c](right.w) });
  };
  const qSort = (R) => {
    const si = R.int(0, PARSED.length - 1), S = PARSED[si];
    const bins = R.pick([['n', 'a', 'v'], ['d', 'n', 'v'], ['d', 'n', 'a']]).filter((c) => S.toks.some((t) => t.c === c));
    const items = [...new Map(S.toks.filter((t) => bins.includes(t.c)).map((t) => [t.w, { text: t.w, bin: bins.indexOf(t.c) }])).values()];
    if (bins.length < 2 || items.length < 3) return qFind(R, 3);
    return srt(`${id}-s-${si}-${bins.join('')}`, 'Classe les mots de la phrase.', bins.map((c) => CLS[c]), R.shuffle(items),
      'Déterminant devant le nom; adjectif = comment est le nom; verbe = ne… pas.', { stimulus: { text: S.text } });
  };
  const qCount = (R) => {
    const si = R.int(0, PARSED.length - 1), S = PARSED[si];
    const c = R.pick(['n', 'a', 'd']);
    const k = S.toks.filter((t) => t.c === c).length;
    const label = { n: 'noms', a: 'adjectifs', d: 'déterminants' }[c];
    return { type: 'keypad', key: `${id}-k-${si}-${c}`, prompt: `Combien y a-t-il de ${label} dans cette phrase?`, say: fx(`Combien y a-t-il de ${label} dans cette phrase?`), stimulus: { text: S.text }, answer: k,
      tip: `Il y en a ${k} : ${S.toks.filter((t) => t.c === c).map((t) => t.w).join(', ') || 'aucun'}.` };
  };
  return unit(id, '🏷️', 'Les classes de mots', 'Word classes', 'Grammaire — classes de mots : nom, déterminant, adjectif, verbe, pronom',
    { 1: [qClass, qClass, qFind], 2: [qFind, qFind, qClass, qSort], 3: [qSort, qSort, qCount, qFind] });
}

/* =============================================================================================
 *  g3f21 : le groupe du nom et les accords
 * ============================================================================================= */
// [sg, pl, genre, animé?]
const NOUNS = [['chat', 'chats', 'm', 1], ['chatte', 'chattes', 'f', 1], ['chien', 'chiens', 'm', 1], ['souris', 'souris', 'f', 1], ['cheval', 'chevaux', 'm', 1], ['vache', 'vaches', 'f', 1],
  ['garçon', 'garçons', 'm', 1], ['fille', 'filles', 'f', 1], ['voisin', 'voisins', 'm', 1], ['voisine', 'voisines', 'f', 1], ['lapin', 'lapins', 'm', 1], ['poule', 'poules', 'f', 1],
  ['ballon', 'ballons', 'm', 0], ['maison', 'maisons', 'f', 0], ['livre', 'livres', 'm', 0], ['tuque', 'tuques', 'f', 0], ['bateau', 'bateaux', 'm', 0], ['voiture', 'voitures', 'f', 0],
  ['chandail', 'chandails', 'm', 0], ['robe', 'robes', 'f', 0], ['jardin', 'jardins', 'm', 0], ['fleur', 'fleurs', 'f', 0], ['crayon', 'crayons', 'm', 0], ['boîte', 'boîtes', 'f', 0],
  ['manteau', 'manteaux', 'm', 0], ['chaise', 'chaises', 'f', 0], ['vélo', 'vélos', 'm', 0], ['table', 'tables', 'f', 0], ['soulier', 'souliers', 'm', 0], ['mitaine', 'mitaines', 'f', 0]];
// [ms, fs, mp, fp, place: 'av' | 'ap', pour: 0 tout / 1 animé seulement]
const ADJS = [
  ['rouge', 'rouge', 'rouges', 'rouges', 'ap', 0], ['vert', 'verte', 'verts', 'vertes', 'ap', 0], ['bleu', 'bleue', 'bleus', 'bleues', 'ap', 0], ['noir', 'noire', 'noirs', 'noires', 'ap', 0],
  ['blanc', 'blanche', 'blancs', 'blanches', 'ap', 0], ['gris', 'grise', 'gris', 'grises', 'ap', 0], ['brun', 'brune', 'bruns', 'brunes', 'ap', 0], ['rond', 'ronde', 'ronds', 'rondes', 'ap', 0],
  ['lourd', 'lourde', 'lourds', 'lourdes', 'ap', 0], ['léger', 'légère', 'légers', 'légères', 'ap', 0], ['neuf', 'neuve', 'neufs', 'neuves', 'ap', 0], ['doux', 'douce', 'doux', 'douces', 'ap', 0],
  ['mouillé', 'mouillée', 'mouillés', 'mouillées', 'ap', 0], ['propre', 'propre', 'propres', 'propres', 'ap', 0],
  ['joyeux', 'joyeuse', 'joyeux', 'joyeuses', 'ap', 1], ['gentil', 'gentille', 'gentils', 'gentilles', 'ap', 1], ['peureux', 'peureuse', 'peureux', 'peureuses', 'ap', 1], ['curieux', 'curieuse', 'curieux', 'curieuses', 'ap', 1],
  ['fatigué', 'fatiguée', 'fatigués', 'fatiguées', 'ap', 1], ['sportif', 'sportive', 'sportifs', 'sportives', 'ap', 1],
  ['petit', 'petite', 'petits', 'petites', 'av', 0], ['grand', 'grande', 'grands', 'grandes', 'av', 0], ['gros', 'grosse', 'gros', 'grosses', 'av', 0], ['joli', 'jolie', 'jolis', 'jolies', 'av', 0],
  ['beau', 'belle', 'beaux', 'belles', 'av', 0], ['nouveau', 'nouvelle', 'nouveaux', 'nouvelles', 'av', 0], ['vieux', 'vieille', 'vieux', 'vieilles', 'av', 0]];
const DETS = [['le', 'la', 'les'], ['un', 'une', 'des'], ['mon', 'ma', 'mes'], ['ce', 'cette', 'ces'], ['ton', 'ta', 'tes'], ['son', 'sa', 'ses']];
const fitAdj = (n, a) => !a[5] || n[3];
const af = (a, g, pl) => a[(pl ? 2 : 0) + (g === 'f' ? 1 : 0)];
const gn = (det, n, adjs, pl) => {
  const d = det[pl ? 2 : n[2] === 'f' ? 1 : 0];
  const av = adjs.filter((a) => a[4] === 'av').map((a) => af(a, n[2], pl)), ap = adjs.filter((a) => a[4] === 'ap').map((a) => af(a, n[2], pl));
  return [d, ...av, pl ? n[1] : n[0], ...ap].join(' ');
};
const GTIP = (n, pl) => `« ${pl ? n[1] : n[0]} » est ${n[2] === 'f' ? 'féminin' : 'masculin'} ${pl ? 'pluriel' : 'singulier'} : le déterminant et l’adjectif font pareil.`;
const aTip = (a, n, pl) => `${GTIP(n, pl)} « ${a[0]} » devient « ${af(a, n[2], pl)} ».`;
function gnUnit() {
  const id = 'g3f21';
  const qDet = (R) => {
    const n = R.pick(NOUNS), d = R.pick(DETS), pl = R.chance(0.4);
    const right = d[pl ? 2 : n[2] === 'f' ? 1 : 0];
    return ch(`${id}-d-${d[0]}-${n[0]}-${pl}`, 'Choisis le bon déterminant.', right, d.filter((x) => x !== right), { n: 3, stimulus: `${BL} ${pl ? n[1] : n[0]}`, say: fx('Choisis le bon déterminant.'),
      tip: `« ${pl ? n[1] : n[0]} » est ${n[2] === 'f' ? 'féminin' : 'masculin'} ${pl ? 'pluriel' : 'singulier'} : on écrit « ${right} ».`, fixedOrder: true });
  };
  const qAdj = (R, level) => {
    const n = R.pick(NOUNS), a = R.pick(ADJS.filter((x) => fitAdj(n, x))), d = R.pick(level === 1 ? [DETS[0], DETS[2]] : DETS.filter((x) => x[0] !== 'un' || a[4] === 'ap'));
    const pl = level === 1 ? R.chance(0.3) : R.chance(0.6);
    const right = af(a, n[2], pl);
    const forms = [...new Set(a.slice(0, 4))].filter((x) => x !== right);
    const shown = gn(d, n, [a], pl).replace(new RegExp(`(^| )${right}( |$)`), `$1${BL}$2`);
    return ch(`${id}-a${level}-${d[0]}-${n[0]}-${a[0]}-${pl}`, `Accorde l’adjectif « ${a[0]} ».`, right, forms, { n: level === 1 ? 3 : 4, stimulus: shown, say: fx(`Accorde l’adjectif ${a[0]}.`), tip: aTip(a, n, pl) });
  };
  const qNoyau = (R) => {
    const n = R.pick(NOUNS), d = R.pick(DETS.filter((x) => x[0] !== 'un'));
    const as = [R.pick(ADJS.filter((x) => x[4] === 'av')), R.pick(ADJS.filter((x) => x[4] === 'ap' && fitAdj(n, x)))];
    const pl = R.chance(0.5), g = gn(d, n, as, pl), words = g.split(' ');
    const noyau = pl ? n[1] : n[0];
    return ch(`${id}-y-${g}`, 'Quel est le nom noyau de ce groupe du nom?', noyau, words.filter((w) => w !== noyau), { n: 4, stimulus: g, say: fx('Quel est le nom noyau de ce groupe du nom?'),
      tip: `Le noyau est le nom « ${noyau} » : les autres mots s’accordent avec lui.` });
  };
  const qTwo = (R) => {
    const n = R.pick(NOUNS), d = R.pick(DETS.filter((x) => x[0] !== 'un'));
    const a1 = R.pick(ADJS.filter((x) => x[4] === 'av')), a2 = R.pick(ADJS.filter((x) => x[4] === 'ap' && fitAdj(n, x) && x[0] !== x[1]));
    const pl = R.chance(0.6), right = gn(d, n, [a1, a2], pl);
    const g2 = n[2] === 'f' ? 'm' : 'f';
    const wr = [
      gn(d, n, [a1], pl).replace(/$/, ` ${a2[0]}`),
      [d[pl ? 2 : n[2] === 'f' ? 1 : 0], af(a1, g2, pl), pl ? n[1] : n[0], af(a2, n[2], pl)].join(' '),
      [d[pl ? 2 : n[2] === 'f' ? 1 : 0], af(a1, n[2], !pl), pl ? n[1] : n[0], af(a2, n[2], !pl)].join(' '),
      [d[pl ? 2 : n[2] === 'f' ? 1 : 0], af(a1, n[2], pl), pl ? n[1] : n[0], af(a2, g2, pl)].join(' '),
    ].filter((x) => x !== right);
    return ch(`${id}-t-${right}`, 'Quel groupe du nom est bien accordé?', right, R.shuffle(wr), { n: 3, tip: `${GTIP(n, pl)} Les DEUX adjectifs s’accordent : ${af(a1, n[2], pl)}, ${af(a2, n[2], pl)}.` });
  };
  const qHand = (R) => {
    const n = R.pick(NOUNS), d = R.pick([DETS[0], DETS[2], DETS[3]]);
    const a1 = R.pick(ADJS.filter((x) => x[4] === 'av')), a2 = R.pick(ADJS.filter((x) => x[4] === 'ap' && fitAdj(n, x)));
    const sg = gn(d, n, [a1, a2], false), pl = gn(d, n, [a1, a2], true);
    return ans(`${id}-h-${sg}`, 'Récris ce groupe du nom au pluriel.', sg, `« ${pl} » (déterminant, nom et adjectifs au pluriel).`, `Tout se met au pluriel : ${pl}.`, 1);
  };
  return unit(id, '📦', 'Le groupe du nom et ses accords', 'Noun groups and agreement', 'Grammaire — groupe du nom (dét. + nom + adj.), noyau, accord en genre et en nombre avec un ou plusieurs adjectifs',
    { 1: [qDet, qDet, qAdj], 2: [qAdj, qAdj, qNoyau, qDet], 3: [qTwo, qTwo, qHand, qAdj] });
}

/* =============================================================================================
 *  g3f22 : l’accord du verbe avec le sujet
 * ============================================================================================= */
const V = {
  jouer: [['joue', 'joues', 'joue', 'jouons', 'jouez', 'jouent'], ['dans la cour', 'au hockey', 'avec le ballon', 'aux cartes']],
  chanter: [['chante', 'chantes', 'chante', 'chantons', 'chantez', 'chantent'], ['une chanson', 'très fort', 'sous la douche', 'pour grand-maman']],
  manger: [['mange', 'manges', 'mange', 'mangeons', 'mangez', 'mangent'], ['une pomme', 'au restaurant', 'des crêpes', 'à midi']],
  regarder: [['regarde', 'regardes', 'regarde', 'regardons', 'regardez', 'regardent'], ['les étoiles', 'un film', 'par la fenêtre', 'les oiseaux']],
  finir: [['finis', 'finis', 'finit', 'finissons', 'finissez', 'finissent'], ['le casse-tête', 'le travail', 'la course', 'le repas']],
  être: [['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], ['contents', 'en retard', 'dans le jardin', 'très fatigués']],
  avoir: [['ai', 'as', 'a', 'avons', 'avez', 'ont'], ['faim', 'un nouveau jeu', 'froid', 'une bonne idée']],
  aller: [['vais', 'vas', 'va', 'allons', 'allez', 'vont'], ['à l’école', 'au parc', 'à la piscine', 'chez grand-papa']],
  faire: [['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], ['un dessin', 'du vélo', 'un gâteau', 'leurs devoirs']],
  courir: [['cours', 'cours', 'court', 'courons', 'courez', 'courent'], ['vite', 'dans le champ', 'jusqu’au parc', 'après le ballon']],
  lire: [['lis', 'lis', 'lit', 'lisons', 'lisez', 'lisent'], ['une histoire', 'le journal', 'en silence', 'une bande dessinée']],
  dormir: [['dors', 'dors', 'dort', 'dormons', 'dormez', 'dorment'], ['profondément', 'sous la tente', 'dans le hamac', 'tard']],
  prendre: [['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'], ['l’autobus', 'une collation', 'des photos', 'le train']],
};
const VR = ['jouer', 'chanter', 'manger', 'regarder', 'finir'];
const PRON = [['Je', 0], ['Tu', 1], ['Il', 2], ['Elle', 2], ['On', 2], ['Nous', 3], ['Vous', 4], ['Ils', 5], ['Elles', 5]];
const PNAME = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
const SUBJ2 = [['Le chat', 2, 'il'], ['Les chats', 5, 'ils'], ['Ma sœur', 2, 'elle'], ['Mes amis', 5, 'ils'], ['Léa', 2, 'elle'], ['Léa et Noah', 5, 'ils'], ['Toi et moi', 3, 'nous'],
  ['Mon frère et moi', 3, 'nous'], ['Toi et ton ami', 4, 'vous'], ['Les élèves', 5, 'ils'], ['Le professeur', 2, 'il'], ['Mes cousines', 5, 'elles'], ['Grand-maman', 2, 'elle'],
  ['Les jumelles', 5, 'elles'], ['Ton équipe', 2, 'elle'], ['Félix', 2, 'il'], ['Zoé et sa mère', 5, 'elles'], ['Papa et toi', 4, 'vous']];
const SUBJ3 = [['Le chien de mes voisins', 2, 'il'], ['Les amis de Léa', 5, 'ils'], ['La maman des petits canards', 2, 'elle'], ['Les fleurs du jardin', 5, 'elles'],
  ['Le frère de mes cousines', 2, 'il'], ['Les bottes de mon frère', 5, 'elles'], ['Le professeur des élèves', 2, 'il'], ['Les enfants de la classe', 5, 'ils'],
  ['La voisine de mes parents', 2, 'elle'], ['Les joueurs de l’équipe', 5, 'ils'], ['Le capitaine des pirates', 2, 'il'], ['Les chats de ma tante', 5, 'ils'],
  ['Mon amie et moi', 3, 'nous'], ['Ton frère et toi', 4, 'vous'], ['Chaque matin, les oiseaux', 5, 'ils'], ['Dans la forêt, le hibou', 2, 'il']];
const OBJ = ['les', 'la', 'le', 'leur'];
const SVTIP = (subj, p, pron, form) => `Le sujet « ${subj} » = « ${pron} » : on écrit « ${pron} ${form} ».`;
function svUnit() {
  const id = 'g3f22';
  const opts = (forms, k) => [...new Set(forms)].filter((f) => f !== forms[k]);
  const qPron = (R) => {
    const v = R.pick(VR), [p, k] = R.pick(PRON);
    const [forms, rest] = V[v], r = R.pick(rest);
    return ch(`${id}-p-${v}-${p}-${r}`, `Choisis le verbe « ${v} » bien accordé.`, forms[k], opts(forms, k), { n: 3, stimulus: `${p} ${BL} ${r}.`, say: fx(`Choisis le verbe ${v} bien accordé.`),
      tip: k === 3 ? 'Avec « nous », le verbe finit par -ons.' : k === 4 ? 'Avec « vous », le verbe finit par -ez.' : k === 5 ? 'Avec « ils » ou « elles », le verbe finit par -ent.' : k === 1 ? 'Avec « tu », le verbe finit par -s.' : `Avec « ${p.toLowerCase()} », on écrit « ${forms[k]} ».` });
  };
  const qGN = (R, level) => {
    const v = R.pick(Object.keys(V)), [s, k, pron] = R.pick(level === 3 ? SUBJ3 : SUBJ2);
    const [forms, rest] = V[v];
    const r = v === 'être' ? (k === 2 ? R.pick(['en retard', 'dans le jardin']) : R.pick(rest)) : R.pick(rest);
    return ch(`${id}-g${level}-${v}-${s}-${r}`, `Accorde le verbe « ${v} » avec le sujet.`, forms[k], opts(forms, k), { n: 4, stimulus: `${s} ${BL} ${r}.`, say: fx(`Accorde le verbe ${v} avec le sujet.`),
      tip: SVTIP(s.replace(/^(Chaque matin|Dans la forêt), /, ''), k, pron, forms[k]) });
  };
  const qSubj = (R) => {
    const [s, k, pron] = R.pick([...SUBJ2, ...SUBJ3.filter((x) => !x[0].includes(','))]);
    const v = R.pick(Object.keys(V).filter((x) => x !== 'être')), [forms, rest] = V[v], r = R.pick(rest);
    const sentence = `${s} ${forms[k]} ${r}.`;
    const parts = s.split(' ');
    const wr = [r, parts.slice(-1)[0] === s ? r : parts.slice(-2).join(' '), `${forms[k]} ${r}`].filter((x) => x !== s);
    return ch(`${id}-s-${s}-${v}-${r}`, 'Quel est le sujet du verbe?', s, R.shuffle(wr), { n: 3, stimulus: sentence, say: fx('Quel est le sujet du verbe?'),
      tip: `On peut dire « C’est ${s.toLowerCase()} qui ${forms[2] === forms[k] ? forms[k] : '…'} » : le sujet est « ${s} » (= ${pron}).` });
  };
  const qObj = (R) => {
    const v = R.pick(['regarder', 'manger', 'finir', 'prendre', 'lire', 'chanter']), [p, k] = R.pick(PRON.filter(([, k]) => k !== 0)), o = R.pick(OBJ);
    const [forms] = V[v];
    const st = `${p} ${o} ${BL} ${v === 'regarder' ? 'avec attention' : 'lentement'}.`;
    return ch(`${id}-o-${v}-${p}-${o}`, `Attention au piège! Accorde « ${v} » avec le vrai sujet.`, forms[k], opts(forms, k), { n: 4, stimulus: st, say: fx(`Accorde ${v} avec le vrai sujet.`),
      tip: `« ${o} » n’est pas le sujet. Le sujet est « ${p} » : ${p.toLowerCase()} ${forms[k]}.` });
  };
  const qWrong = (R) => {
    const v = R.pick(Object.keys(V)), [s, k, pron] = R.pick(SUBJ3), [forms, rest] = V[v];
    const r = v === 'être' ? R.pick(['en retard', 'dans le jardin']) : R.pick(rest);
    const badK = k === 2 ? 5 : 2;
    const good = `${s} ${forms[k]} ${r}.`, bad = `${s} ${forms[badK]} ${r}.`;
    const other = SUBJ2.find((x) => x[1] === k && x[0] !== s) || SUBJ2[0];
    return ch(`${id}-w-${v}-${s}-${r}`, 'Quelle phrase a une ERREUR d’accord?', bad, [good, `${other[0]} ${forms[other[1]]} ${r}.`], { n: 3,
      tip: `Dans « ${s} », le noyau commande le verbe : ${pron} ${forms[k]}.` });
  };
  return unit(id, '🔗', 'L’accord du verbe avec le sujet', 'Subject-verb agreement', 'Grammaire — accord du verbe avec le sujet (pronom, GN, sujets multiples, sujet éloigné du verbe, pronom complément entre le sujet et le verbe)',
    { 1: [qPron, qPron, qGN], 2: [qGN, qGN, qSubj, qPron], 3: [qGN, qObj, qWrong, qSubj] });
}

/* =============================================================================================
 *  g3f23 : la phrase de base (sujet + prédicat + complément de phrase)
 * ============================================================================================= */
// [sujet, prédicat, complément de phrase | null, pronom du sujet]
const PB = [
  ['Mon frère', 'mange une pomme', 'Ce matin', 'il'], ['Les élèves', 'écoutent une histoire', 'Après la récréation', 'ils'], ['Le chat', 'attrape une souris', 'Dans la grange', 'il'],
  ['Ma grand-mère', 'prépare des crêpes', 'Le dimanche', 'elle'], ['Nous', 'construisons un fort', 'Pendant l’hiver', 'nous'], ['Les canards', 'quittent le lac', 'En automne', 'ils'],
  ['Léa', 'range sa chambre', 'Avant le souper', 'elle'], ['Le renard', 'cherche de la nourriture', 'La nuit', 'il'], ['Mes cousins', 'visitent le zoo', 'Samedi', 'ils'],
  ['Le facteur', 'apporte une lettre', 'Chaque matin', 'il'], ['Les enfants', 'font un bonhomme de neige', 'Dans la cour', 'ils'], ['Papa', 'lit le journal', 'Au déjeuner', 'il'],
  ['Tu', 'brosses tes dents', 'Le soir', 'tu'], ['Le petit ours', 'mange du miel', 'Au printemps', 'il'], ['Les pompiers', 'ont éteint le feu', 'Hier soir', 'ils'],
  ['Le professeur', 'explique la leçon', 'En classe', 'il'], ['Mon chien', 'creuse un trou', 'Derrière la maison', 'il'], ['Mes amis', 'jouent au hockey', 'Sur le lac gelé', 'ils'],
  ['Les abeilles', 'fabriquent du miel', 'Tout l’été', 'elles'], ['Maman', 'plante des fleurs', 'Au mois de mai', 'elle'], ['Nous', 'mangeons de la tire', 'À la cabane à sucre', 'nous'],
  ['Le hibou', 'chasse les souris', 'Pendant la nuit', 'il'], ['Mon amie Zoé', 'prend l’autobus', 'Tous les matins', 'elle'], ['Les feuilles', 'changent de couleur', 'En octobre', 'elles'],
  ['Le boulanger', 'cuit du pain frais', 'Très tôt le matin', 'il'], ['Vous', 'regardez un film', 'Ce soir', 'vous'], ['Grand-papa', 'raconte des histoires de pêche', 'Au chalet', 'il'],
  ['La neige', 'recouvre les toits', 'Depuis hier', 'elle'], ['Les astronautes', 'observent la Terre', 'Dans la station spatiale', 'ils'], ['Un écureuil', 'cache des noisettes', 'Sous le grand chêne', 'il'],
  ['Je', 'fais mes devoirs', 'Après l’école', 'je'], ['Les musiciens', 'jouent une belle chanson', 'Sur la scène', 'ils'], ['Mon oncle', 'répare son vélo', 'Dans le garage', 'il'],
  ['La directrice', 'parle aux parents', 'Ce soir', 'elle'], ['Les vaches', 'broutent l’herbe', 'Dans le pré', 'elles'], ['Notre équipe', 'a gagné le match', 'Hier', 'elle'],
  ['Félix', 'apprend à nager', 'Cet été', 'il'], ['Les étoiles', 'brillent', 'Dans le ciel', 'elles'], ['Ma tante', 'cueille des bleuets', 'En août', 'elle'],
  ['Les joueuses', 'enfilent leurs patins', 'Avant la partie', 'elles'],
  ['La tortue', 'dort dans sa carapace', null, 'elle'], ['Mes parents', 'achètent une maison', null, 'ils'], ['Les joueurs', 'gagnent la partie', null, 'ils'],
  ['Le vent', 'souffle fort', null, 'il'], ['Ma sœur', 'aime les chiens', null, 'elle'], ['Les lions', 'dorment au soleil', null, 'ils'], ['Ce gâteau', 'sent très bon', null, 'il'],
  ['Les filles', 'chantent une chanson', null, 'elles'],
];
const sOf = (e, cpFirst) => (e[2] ? (cpFirst ? `${e[2]}, ${lc(e[0])} ${e[1]}.` : `${e[0]} ${e[1]} ${lc(e[2])}.`) : `${e[0]} ${e[1]}.`);
const STIP = 'Le sujet, c’est de qui ou de quoi on parle : « C’est… qui ».';
const PTIP = 'Le prédicat dit ce que fait le sujet : il contient le verbe.';
const CPTIP = 'Le complément de phrase dit où, quand ou pourquoi; on peut l’effacer ou le déplacer.';
function pbUnit() {
  const id = 'g3f23';
  const disp = (e, cpFirst, part) => (part === 0 ? (cpFirst && e[2] ? lc(e[0]) : e[0]) : part === 2 ? (cpFirst ? e[2] : lc(e[2])) : e[1]);
  const qSP = (R, level) => {
    const i = R.int(0, PB.length - 1), e = PB[i], cpFirst = !!e[2] && R.chance(0.5);
    const want = level === 1 ? R.pick([0, 1]) : R.pick([0, 1, 2].filter((k) => e[k]));
    const others = [0, 1, 2].filter((k) => k !== want && e[k]).map((k) => disp(e, cpFirst, k));
    if (others.length < 2) others.push(e[1].split(' ').slice(1).join(' ') || e[1] + ' ' + (e[3]));
    const P = ['Quel est le sujet de la phrase?', 'Quel est le prédicat de la phrase?', 'Quel est le complément de phrase?'][want];
    return ch(`${id}-q${want}-${i}-${cpFirst}`, P, disp(e, cpFirst, want), others, { n: 3, stimulus: sOf(e, cpFirst), tip: [STIP, PTIP, CPTIP][want] });
  };
  const qHasCP = (R) => {
    const i = R.int(0, PB.length - 1), e = PB[i], cpFirst = R.chance(0.5);
    return ch(`${id}-y-${i}-${cpFirst}`, 'Cette phrase a-t-elle un complément de phrase?', e[2] ? 'Oui' : 'Non', [e[2] ? 'Non' : 'Oui'], { n: 2, stimulus: sOf(e, cpFirst), fixedOrder: true,
      tip: e[2] ? `Oui : « ${e[2]} » peut être déplacé ou effacé.` : 'Non : on ne peut rien effacer sans briser la phrase; il y a seulement le sujet et le prédicat.' });
  };
  const qOrder = (R) => {
    const i = R.int(0, PB.length - 1), e = PB.filter((x) => x[2])[i % 40];
    return ord(`${id}-o-${e[0]}`, 'Remets la phrase en ordre. Commence par le complément de phrase.', [`${e[2]},`, lc(e[0]), `${e[1]}.`], { tip: `${e[2]}, ${lc(e[0])} ${e[1]}. ${CPTIP}` });
  };
  const qMove = (R) => {
    const list = PB.filter((x) => x[2]), i = R.int(0, list.length - 1), e = list[i];
    const right = `${e[2]}, ${lc(e[0])} ${e[1]}.`;
    const wr = [`${e[2]} ${lc(e[0])} ${e[1]}.`, `${e[2]}, ${lc(e[0])}, ${e[1]}.`, `${lc(e[2])}, ${lc(e[0])} ${e[1]}.`];
    return ch(`${id}-m-${i}`, 'On déplace le complément de phrase au début. Quelle phrase est bien écrite?', right, wr, { n: 3, stimulus: `${e[0]} ${e[1]} ${lc(e[2])}.`,
      tip: 'Au début de la phrase, le complément de phrase est suivi d’une virgule, et il prend la majuscule.' });
  };
  const qSort = (R) => {
    const list = PB.filter((x) => x[2]), [a, b] = R.sample(list, 2);
    const items = [a, b].flatMap((e) => [{ text: e[0], bin: 0 }, { text: e[1], bin: 1 }, { text: e[2], bin: 2 }]);
    return srt(`${id}-s-${[a[0], b[0]].sort().join('|')}`, 'Classe les morceaux de ces deux phrases.', ['sujet', 'prédicat', 'complément de phrase'], R.shuffle(items),
      `${STIP} ${CPTIP}`, { stimulus: { text: `${sOf(a, false)}\n${sOf(b, true)}` } });
  };
  const qPron = (R) => {
    const i = R.int(0, PB.length - 1), e = PB[i];
    if (['je', 'tu', 'nous', 'vous'].includes(e[3])) return qMove(R);
    const p = e[3];
    return ch(`${id}-p-${i}`, `Par quel pronom peut-on remplacer le sujet « ${e[0]} »?`, p, ['il', 'elle', 'ils', 'elles'].filter((x) => x !== p), { n: 4, stimulus: sOf(e, false), fixedOrder: true,
      say: fx('Par quel pronom peut-on remplacer le sujet?'), tip: `« ${e[0]} » → « ${p} ». Un sujet peut être remplacé par un pronom.` });
  };
  return unit(id, '🏗️', 'La phrase de base', 'The basic sentence', 'Grammaire — phrase de base : sujet + prédicat + complément de phrase (repérer, effacer, déplacer avec la virgule, remplacer le sujet par un pronom)',
    { 1: [qSP, qSP, qHasCP], 2: [qSP, qHasCP, qOrder, qPron], 3: [qMove, qSort, qSP, qPron] });
}

/* =============================================================================================
 *  g3f24 : types et formes de phrases
 * ============================================================================================= */
const TYPES = {
  D: ['Le chat dort sur le divan.', 'Nous partons en vacances demain.', 'Mon frère a neuf ans.', 'La neige tombe doucement.', 'J’aime les livres d’aventures.', 'Le magasin ferme à six heures.',
    'Les ours dorment tout l’hiver.', 'Ma tante habite à Rimouski.', 'Il pleut depuis ce matin.', 'Les élèves rangent leurs cahiers.', 'Le soleil se couche tôt en décembre.', 'Grand-papa répare la clôture.',
    'Le hockey est mon sport préféré.', 'Elle a perdu sa mitaine.', 'Nous mangeons du poisson le vendredi.', 'Mon chien n’aime pas les chats.'],
  I: ['As-tu vu mon chat?', 'Où est la bibliothèque?', 'Est-ce que tu viens jouer?', 'Quand partons-nous?', 'Pourquoi le ciel est-il bleu?', 'Qui a mangé la dernière pomme?',
    'Combien coûte ce livre?', 'Aimes-tu la tire d’érable?', 'Est-ce qu’il neige dehors?', 'Comment s’appelle ton chien?', 'Veux-tu venir au parc?', 'À quelle heure commence le film?',
    'Est-ce que les ours hibernent?', 'Qu’est-ce que tu dessines?', 'Avez-vous fini vos devoirs?', 'Pourquoi pleures-tu?'],
  E: ['Quelle belle journée!', 'Comme ce gâteau est bon!', 'Wow, il a tellement neigé!', 'Que tu es grand!', 'Quel beau dessin tu as fait!', 'Comme il fait froid!',
    'Ce film était tellement drôle!', 'Bravo, tu as gagné!', 'Quelle surprise!', 'Oh, le joli papillon!', 'Comme les étoiles brillent ce soir!', 'Que ce chiot est mignon!',
    'Quel bruit dans la classe!', 'Ouf, nous sommes arrivés à temps!', 'Quelle chance nous avons!', 'Comme tu cours vite!'],
  M: ['Range ta chambre.', 'Ferme la porte, s’il te plaît.', 'Mets ta tuque.', 'Écoutez bien la consigne.', 'Lave tes mains avant de manger.', 'Prenons l’autobus.',
    'Ne cours pas dans le corridor.', 'Attachez votre ceinture.', 'Lis cette histoire à ton frère.', 'Donne-moi ce crayon.', 'Allons au parc.', 'Choisis une couleur.',
    'Ouvre la fenêtre.', 'Écris ton nom en haut de la feuille.', 'Range tes bottes sur le tapis.', 'Partageons les biscuits.'],
};
const TNAME = { D: 'déclarative', I: 'interrogative', E: 'exclamative', M: 'impérative' };
const TTIP = {
  D: 'Une phrase déclarative donne une information. Elle finit par un point.',
  I: 'Une phrase interrogative pose une question. Elle finit par un point d’interrogation.',
  E: 'Une phrase exclamative exprime une émotion forte. Elle finit par un point d’exclamation.',
  M: 'Une phrase impérative donne un ordre ou un conseil. Elle n’a pas de sujet.',
};
// [pronom, verbe, suite] — compléments choisis pour que « ne… pas » soit naturel
const ST = [['il', 'mange', 'la soupe'], ['elle', 'aime', 'le chocolat'], ['tu', 'joues', 'dehors'], ['nous', 'partons', 'demain'], ['vous', 'aimez', 'les bananes'], ['ils', 'regardent', 'la télévision'],
  ['elles', 'chantent', 'la chanson'], ['il', 'va', 'au parc'], ['elle', 'fait', 'ses devoirs'], ['tu', 'prends', 'l’autobus'], ['nous', 'lisons', 'le journal'], ['ils', 'finissent', 'leur repas'],
  ['elle', 'porte', 'sa tuque'], ['il', 'arrive', 'à l’heure'], ['tu', 'connais', 'la réponse'], ['vous', 'écoutez', 'la radio'], ['elles', 'vont', 'à la piscine'], ['on', 'mange', 'au restaurant'],
  ['il', 'écrit', 'la lettre'], ['tu', 'aimes', 'les épinards'], ['nous', 'sommes', 'en retard'], ['elle', 'est', 'fatiguée'], ['ils', 'sont', 'contents'], ['il', 'a', 'froid'], ['tu', 'as', 'faim'],
  ['vous', 'êtes', 'prêts'], ['elle', 'habite', 'à Québec'], ['il', 'joue', 'au soccer'], ['nous', 'allons', 'à la plage'], ['tu', 'dors', 'bien'], ['elles', 'dansent', 'le samedi'], ['il', 'neige', 'beaucoup']];
const VOW = /^[aeiouéèêàh]/;
const neg = ([p, v, r], w = 'pas') => `${cap(p)} ${VOW.test(v) ? 'n’' : 'ne '}${v} ${w} ${r}.`;
const pos = ([p, v, r]) => `${cap(p)} ${v} ${r}.`;
const esq = ([p, v, r]) => `Est-ce ${VOW.test(p) ? 'qu’' : 'que '}${p} ${v} ${r}?`;
const inv = ([p, v, r]) => `${cap(v)}-${/[ea]$/.test(v) && ['il', 'elle', 'on'].includes(p) ? 't-' : ''}${p} ${r}?`;
function typeUnit() {
  const id = 'g3f24';
  const qType = (R, level) => {
    const ks = level === 1 ? ['D', 'I', 'E'] : ['D', 'I', 'E', 'M'];
    const k = R.pick(ks), s = R.pick(TYPES[k]);
    return ch(`${id}-t-${s}`, 'De quel type est cette phrase?', TNAME[k], ks.filter((x) => x !== k).map((x) => TNAME[x]), { n: ks.length, stimulus: s, say: fx(s), fixedOrder: true, tip: TTIP[k] });
  };
  const qNeg = (R, level) => {
    const i = R.int(0, ST.length - 1), e = ST[i];
    const w = level === 3 ? R.pick(['jamais', 'plus']) : 'pas';
    const right = neg(e, w);
    const wr = [`${cap(e[0])} ${e[1]} ${w} ${e[2]}.`, `${cap(e[0])} ne ${w} ${e[1]} ${e[2]}.`, `${cap(e[0])} ${VOW.test(e[1]) ? 'n’' : 'ne '}${e[1]} ${e[2]} ${w}.`, VOW.test(e[1]) ? `${cap(e[0])} ne ${e[1]} ${w} ${e[2]}.` : `${cap(e[0])} n’${e[1]} ${w} ${e[2]}.`];
    return ch(`${id}-n${w}-${i}`, `Mets la phrase à la forme négative avec « ne… ${w} ».`, right, R.shuffle(wr), { n: level === 1 ? 3 : 4, stimulus: pos(e),
      tip: `Le verbe est encadré : ${VOW.test(e[1]) ? 'n’' : 'ne '}${e[1]} ${w}. Devant une voyelle, « ne » devient « n’ ».` });
  };
  const qForm = (R) => {
    const i = R.int(0, ST.length - 1), e = ST[i], isNeg = R.chance(0.5);
    const s = isNeg ? neg(e, R.pick(['pas', 'jamais', 'plus'])) : pos(e);
    return ch(`${id}-f-${s}`, 'Cette phrase est-elle positive ou négative?', isNeg ? 'négative' : 'positive', [isNeg ? 'positive' : 'négative'], { n: 2, stimulus: s, fixedOrder: true,
      tip: isNeg ? 'Elle est négative : on voit « ne… pas », « ne… jamais » ou « ne… plus » autour du verbe.' : 'Elle est positive : il n’y a pas de « ne… pas ».' });
  };
  const qEsq = (R) => {
    const i = R.int(0, ST.length - 1), e = ST[i], right = esq(e);
    const wr = [`Est-ce que ${e[0]} ${e[1]} ${e[2]}?`, `${esq(e).slice(0, -1)}.`, `Est-ce ${VOW.test(e[0]) ? 'qu’' : 'que '}${e[1]}-${e[0]} ${e[2]}?`].filter((x) => x !== right);
    return ch(`${id}-e-${i}`, 'Transforme en question avec « est-ce que ». Quelle phrase est bien écrite?', right, R.shuffle(wr), { n: 3, stimulus: pos(e),
      tip: `On ajoute « Est-ce que » au début et un point d’interrogation. Devant une voyelle : « est-ce qu’ ».` });
  };
  const qInv = (R) => {
    const list = ST.filter((x) => x[0] !== 'je'), i = R.int(0, list.length - 1), e = list[i], right = inv(e);
    const t = /[ea]$/.test(e[1]) && ['il', 'elle', 'on'].includes(e[0]);
    const wr = [t ? `${cap(e[1])}-${e[0]} ${e[2]}?` : `${cap(e[1])}-t-${e[0]} ${e[2]}?`, `${cap(e[1])} ${t ? 't ' : ''}${e[0]} ${e[2]}?`, `${cap(e[0])}-${e[1]} ${e[2]}?`, `${right.slice(0, -1)}.`];
    return ch(`${id}-i-${i}`, 'Transforme en question en inversant le sujet. Quelle phrase est bien écrite?', right, R.shuffle(wr), { n: 4, stimulus: pos(e),
      tip: t ? 'Le pronom passe après le verbe, avec un trait d’union. On ajoute « -t- » entre deux voyelles : mange-t-il?' : 'Le pronom passe après le verbe, avec un trait d’union : aimes-tu?' });
  };
  const qHand = (R) => {
    const i = R.int(0, ST.length - 1), e = ST[i];
    return ans(`${id}-h-${i}`, 'Récris cette phrase à la forme négative.', pos(e), `« ${neg(e)} » (ou avec « ne… jamais / ne… plus »). Le « ne » (ou « n’ » devant une voyelle) et le « pas » encadrent le verbe.`,
      `Encadre le verbe : ${neg(e)}`, 1);
  };
  return unit(id, '❓', 'Types et formes de phrases', 'Sentence types and forms', 'Grammaire — types de phrases (déclarative, interrogative, exclamative, impérative) et formes (positive / négative); interrogation avec est-ce que et par inversion',
    { 1: [qType, qType, qNeg, qForm], 2: [qType, qNeg, qEsq, qForm], 3: [qInv, qInv, qNeg, qHand, qEsq] });
}

/* =============================================================================================
 *  g3f25 : la ponctuation
 * ============================================================================================= */
const ENUM_FR = [
  ['Dans mon sac, il y a', ['un cahier', 'une gomme', 'des crayons', 'une règle', 'un livre', 'ma boîte à lunch']],
  ['Au marché, nous achetons', ['des pommes', 'des carottes', 'du fromage', 'des fraises', 'du pain', 'des tomates']],
  ['Pour ma fête, j’invite', ['Léa', 'Noah', 'Zoé', 'Félix', 'Maya', 'Samuel']],
  ['Au zoo, nous avons vu', ['un lion', 'des girafes', 'un ours', 'des singes', 'un zèbre', 'des pingouins']],
  ['Dans ma boîte à lunch, il y a', ['un sandwich', 'une pomme', 'des biscuits', 'du jus', 'un yogourt', 'des raisins']],
  ['Pour faire la tarte, il faut', ['de la farine', 'du beurre', 'des œufs', 'du sucre', 'des bleuets', 'du lait']],
  ['L’hiver, je porte', ['ma tuque', 'mes mitaines', 'mon foulard', 'mes bottes', 'mon manteau', 'mon cache-cou']],
  ['Dans la forêt, on entend', ['les oiseaux', 'le vent', 'les écureuils', 'le ruisseau', 'les feuilles', 'un pic-bois']],
];
const SPEECH = {
  '.': ['Il fait beau aujourd’hui', 'Le souper est prêt', 'Mon chien s’appelle Moka', 'J’ai oublié mon lunch', 'La cloche va sonner', 'Je préfère le chocolat'],
  '?': ['Veux-tu jouer avec moi?', 'Où est mon soulier?', 'As-tu fini ton dessin?', 'Quelle heure est-il?', 'Est-ce qu’on peut sortir?', 'Qui a pris mon crayon?'],
  '!': ['Attention à la flaque!', 'J’ai gagné!', 'Quelle belle surprise!', 'Vite, l’autobus arrive!', 'Bravo, c’est réussi!', 'Regarde le gros orignal!'],
};
const SVERB = { '.': ['dit', 'répond', 'chuchote', 'explique'], '?': ['demande'], '!': ['crie', 's’exclame'] };
const ENUM_DICT = ['J’ai mis des pommes, des poires et des bananes dans le panier.', 'Léa, Noah et Zoé jouent dans la cour.', 'Au parc, il y a des balançoires, un module et une glissoire.',
  'Je mets ma tuque, mon foulard et mes mitaines.', 'Le drapeau est bleu, blanc et rouge.', 'Nous avons vu un renard, un lièvre et deux chevreuils.',
  'Après l’école, je mange une collation, je fais mes devoirs et je joue dehors.', 'Grand-maman achète du lait, du pain et du fromage.',
  'Ce matin, il pleut.', 'Le soir, je lis une histoire avec papa.', '« Viens jouer! » crie Léa.', '« Où vas-tu? » demande Noah.'];
const enumOf = (xs) => `${xs.slice(0, -1).join(', ')} et ${xs[xs.length - 1]}`;
function ponctUnit() {
  const id = 'g3f25';
  const qEnd = (R) => {
    const k = R.pick(['D', 'I', 'E']), s = R.pick(TYPES[k]), body = s.slice(0, -1);
    const right = s.slice(-1), other = k === 'D' ? '?' : k === 'I' ? '.' : '?';
    return ch(`${id}-p-${s}`, 'Quel signe va à la fin de la phrase?', right, [other], { n: 2, stimulus: `${body} ☐`, say: fx('Quel signe va à la fin de la phrase?'), tip: TTIP[k] });
  };
  const qEnum = (R, level) => {
    const [fr, list] = R.pick(ENUM_FR), xs = R.sample(list, level === 2 ? 3 : 4);
    const right = `${fr} ${enumOf(xs)}.`;
    const wr = [`${fr} ${xs.slice(0, -1).join(', ')}, et ${xs[xs.length - 1]}.`, `${fr} ${xs.slice(0, -1).join(' ')} et ${xs[xs.length - 1]}.`, `${fr} ${xs.slice(0, -1).join(' et ')}, ${xs[xs.length - 1]}.`];
    return ch(`${id}-e-${right}`, 'Quelle phrase a les virgules bien placées?', right, R.shuffle(wr), { n: level === 2 ? 3 : 4,
      tip: 'Dans une énumération, on met une virgule entre les éléments, mais pas devant le dernier « et ».' });
  };
  const qCP = (R) => {
    const list = PB.filter((x) => x[2]), i = R.int(0, list.length - 1), e = list[i];
    const right = `${e[2]}, ${lc(e[0])} ${e[1]}.`;
    return ch(`${id}-c-${i}`, 'Où faut-il mettre la virgule?', right, [`${e[2]} ${lc(e[0])}, ${e[1]}.`, `${e[2]} ${lc(e[0])} ${e[1]}.`], { n: 3,
      tip: `Le complément de phrase « ${e[2]} » est au début : on met une virgule juste après.` });
  };
  const qDial = (R) => {
    const k = R.pick(['.', '?', '!']), sp = R.pick(SPEECH[k]), who = R.pick([...NF, ...NM]), v = R.pick(SVERB[k]);
    const right = k === '.' ? `« ${sp} », ${v} ${who}.` : `« ${sp} » ${v} ${who}.`;
    const bare = k === '.' ? sp : sp.slice(0, -1);
    const wr = [k === '.' ? `${sp}, ${v} ${who}.` : `${sp} ${v} ${who}.`, `« ${bare}${k === '.' ? '' : k} ${v} ${who}. »`, k === '.' ? `« ${sp}. » ${v} ${who}.` : `« ${sp} », ${v} ${who}.`];
    return ch(`${id}-d-${sp}-${who}-${v}`, 'Quelle phrase de dialogue est bien ponctuée?', right, R.shuffle(wr), { n: 3,
      tip: 'Les paroles du personnage vont entre les guillemets « ». Qui parle (dit Léa) est à l’extérieur.' });
  };
  const qTiret = (R) => {
    const who = R.sample([...NF, ...NM], 2), a = R.pick(SPEECH['?']), b = R.pick(SPEECH['.']);
    const txt = `${who[0]} demande :\n— ${a}\n— ${b}, répond ${who[1]}.`;
    return ch(`${id}-t-${a}-${b}-${who.join('')}`, 'Dans ce dialogue, quel signe montre qu’un personnage commence à parler?', 'le tiret (—)', ['la virgule (,)', 'le point (.)', 'les deux-points (:)'],
      { n: 3, stimulus: txt, say: fx('Quel signe montre qu’un personnage commence à parler?'), tip: 'Dans un dialogue, chaque réplique commence par un tiret, à la ligne.' });
  };
  const qDict = (R) => { const k = R.int(0, ENUM_DICT.length - 1); return dict(`${id}-x-${k}`, ENUM_DICT[k], 'Écoute les pauses : elles te disent où mettre les virgules et les guillemets.'); };
  return unit(id, '❗', 'La ponctuation', 'Punctuation', 'Grammaire — ponctuation : point, point d’interrogation, point d’exclamation; virgule dans une énumération et après un complément de phrase au début; guillemets et tiret du dialogue',
    { 1: [qEnd, qEnd, qCP], 2: [qEnum, qEnum, qCP, qEnd], 3: [qDial, qDial, qTiret, qEnum, qDict] });
}

/* ============================================================================================= */
export const units = [classUnit(), gnUnit(), svUnit(), pbUnit(), typeUnit(), ponctUnit()];
