// Petit Hibou — Français 3e année : VOCABULAIRE (g3f33 → g3f38).
// Familles de mots, préfixes et suffixes, synonymes / antonymes nuancés, sens propre / figuré,
// expressions québécoises, ordre alphabétique et dictionnaire. Phrases originales, français du Québec.
import { ch, srt, ord, ans, unit, fx, G3, isReal } from './francais-lib.js';
import { MEQ } from '../meq-liste.js';

const q3 = (s) => `« ${s} »`;
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/* =============================================================================
   g3f33 — Familles de mots
   ============================================================================= */
// r = racine commune, m = mots de la famille (m[0] = mot de base), x = sosies (même début, autre famille)
const FAM = [
  { r: 'chant', m: ['chant', 'chanter', 'chanteur', 'chanteuse', 'chanson'], x: ['champ', 'chameau', 'chandail'] },
  { r: 'dans', m: ['danse', 'danser', 'danseur', 'danseuse'], x: ['dent', 'dans', 'dame'] },
  { r: 'fleur', m: ['fleur', 'fleurir', 'fleuriste', 'fleuri'], x: ['fleuve', 'flûte', 'flamme'] },
  { r: 'lum', m: ['lumière', 'lumineux', 'allumer', 'allumette'], x: ['plume', 'légume', 'allonger'] },
  { r: 'terr', m: ['terre', 'terrain', 'enterrer', 'terrasse', 'souterrain', 'atterrir'], x: ['terrible', 'tête', 'tirer'] },
  { r: 'nourri', m: ['nourrir', 'nourriture', 'nourrissant'], x: ['nouveau', 'nounours', 'noyau'] },
  { r: 'chass', m: ['chasse', 'chasser', 'chasseur', 'chasseuse'], x: ['chaise', 'chaussure', 'château'] },
  { r: 'jardin', m: ['jardin', 'jardiner', 'jardinier', 'jardinière', 'jardinage'], x: ['jaune', 'jambe', 'janvier'] },
  { r: 'dent', m: ['dent', 'dentiste', 'dentifrice', 'dentaire'], x: ['danse', 'dans', 'devant'] },
  { r: 'lait', m: ['lait', 'laitier', 'laitière', 'allaiter'], x: ['laid', 'laine', 'laisser'] },
  { r: 'glac', m: ['glace', 'glacé', 'glacier', 'glaçon', 'glacière'], x: ['glisser', 'grâce', 'gland'] },
  { r: 'neig', m: ['neige', 'neiger', 'enneigé', 'neigeux'], x: ['neuf', 'nez', 'neveu'] },
  { r: 'mar / mer', m: ['mer', 'marin', 'marine', 'marée'], x: ['mère', 'mardi', 'marché'] },
  { r: 'école / scol', m: ['école', 'écolier', 'écolière', 'scolaire'], x: ['écorce', 'échelle', 'écureuil'] },
  { r: 'jour', m: ['jour', 'journée', 'journal', 'journaliste'], x: ['joue', 'jouet', 'jupe'] },
  { r: 'jeu / jou', m: ['jeu', 'jouer', 'joueur', 'joueuse', 'jouet'], x: ['jeune', 'jeudi', 'genou'] },
  { r: 'dessin', m: ['dessin', 'dessiner', 'dessinateur', 'dessinatrice'], x: ['dessert', 'dessous', 'désert'] },
  { r: 'vent', m: ['vent', 'venteux', 'venter', 'éventail'], x: ['ventre', 'vendre', 'venir'] },
  { r: 'froid', m: ['froid', 'refroidir', 'froidement', 'froideur'], x: ['front', 'fromage', 'fruit'] },
  { r: 'chau / chal', m: ['chaud', 'chaleur', 'chauffer', 'réchauffer', 'chauffage'], x: ['chaussure', 'chou', 'chaussette'] },
  { r: 'long', m: ['long', 'longueur', 'allonger', 'longuement', 'rallonge'], x: ['loup', 'lent', 'lion'] },
  { r: 'grand', m: ['grand', 'grandir', 'grandeur', 'agrandir'], x: ['grange', 'gras', 'grain'] },
  { r: 'blanc', m: ['blanc', 'blanche', 'blanchir', 'blancheur'], x: ['banc', 'blé', 'bleu'] },
  { r: 'noir', m: ['noir', 'noircir', 'noirceur', 'noirâtre'], x: ['noix', 'noisette', 'nord'] },
  { r: 'roug', m: ['rouge', 'rougir', 'rougeur', 'rougeâtre'], x: ['route', 'roue', 'rouleau'] },
  { r: 'vol', m: ['vol', 'voler', 'envoler', 'envolée'], x: ['vélo', 'volcan', 'violon'] },
  { r: 'nag', m: ['nage', 'nager', 'nageur', 'nageuse'], x: ['neige', 'nuage', 'naître'] },
  { r: 'patin', m: ['patin', 'patiner', 'patineur', 'patineuse', 'patinoire', 'patinage'], x: ['patate', 'patte', 'papillon'] },
  { r: 'lire / lect', m: ['lire', 'lecture', 'lecteur', 'lectrice', 'relire'], x: ['lit', 'lion', 'ligne'] },
  { r: 'écri', m: ['écrire', 'écriture', 'écrivain', 'réécrire'], x: ['écureuil', 'écran', 'écraser'] },
  { r: 'sel / sal', m: ['sel', 'salé', 'saler', 'salière'], x: ['selle', 'sale', 'salon'] },
  { r: 'sucr', m: ['sucre', 'sucré', 'sucrer', 'sucrier', 'sucrerie'], x: ['succès', 'sucette', 'suçon'] },
  { r: 'dorm', m: ['dormir', 'dortoir', 'endormir', 'dormeur', 'endormi'], x: ['dorer', 'dos', 'domino'] },
  { r: 'cour', m: ['courir', 'coureur', 'coureuse', 'course', 'parcourir'], x: ['courage', 'couronne', 'coussin'] },
  { r: 'mont', m: ['mont', 'montagne', 'montagneux', 'montagnard'], x: ['montre', 'mouton', 'monstre'] },
  { r: 'coiff', m: ['coiffer', 'coiffure', 'coiffeur', 'coiffeuse'], x: ['coffre', 'coin', 'coquille'] },
  { r: 'cuisin', m: ['cuisine', 'cuisiner', 'cuisinier', 'cuisinière'], x: ['cuisse', 'cuir', 'cuillère'] },
  { r: 'plu / pleu', m: ['pluie', 'pleuvoir', 'pluvieux', 'parapluie'], x: ['plume', 'pelle', 'plage'] },
  { r: 'sol', m: ['soleil', 'ensoleillé', 'solaire'], x: ['sol', 'sommeil', 'soldat'] },
  { r: 'ami', m: ['ami', 'amie', 'amitié', 'amical'], x: ['amande', 'amener', 'ampoule'] },
  { r: 'peur', m: ['peur', 'peureux', 'apeuré'], x: ['peu', 'père', 'perle'] },
  { r: 'joie / joy', m: ['joie', 'joyeux', 'joyeuse', 'réjouir'], x: ['joue', 'jouet', 'joli'] },
  { r: 'boulang', m: ['boulanger', 'boulangère', 'boulangerie'], x: ['bouton', 'boucle', 'bouleau'] },
  { r: 'couleur / color', m: ['couleur', 'colorier', 'coloriage', 'décolorer'], x: ['collier', 'colle', 'colline'] },
  { r: 'roi / roy', m: ['roi', 'royal', 'royaume', 'royauté'], x: ['roue', 'rocher', 'ruban'] },
];
const famOf = (w) => FAM.filter((f) => f.m.includes(w));
const others = (f) => FAM.filter((g) => g !== f && !g.m.some((w) => f.m.includes(w)));

function famSame(R, level) {
  const f = R.pick(FAM), [x, y] = R.sample(f.m, 2);
  const trap = level === 3;
  const wr = trap ? R.sample(f.x, 2) : R.sample(others(f), 2).map((g) => R.pick(g.m));
  const p = `Quel mot est de la même famille que ${q3(x)}?`;
  return ch(`f33-${trap ? 't' : 's'}-${x}-${y}`, p, y, wr, { stimulus: x, n: 3,
    tip: trap ? `Attention aux sosies! ${q3(y)} et ${q3(x)} parlent de la même idée; ${q3(wr[0])} commence pareil, mais n’a pas le même sens.`
      : `${q3(x)} et ${q3(y)} ont la même racine (${f.r}) : ils parlent de la même idée.` });
}
function famIntrus(R) {
  const f = R.pick(FAM), mem = R.sample(f.m, 3), bad = R.pick(f.x);
  return ch(`f33-i-${mem.slice().sort().join(',')}-${bad}`, 'Quel mot n’est PAS de la même famille que les autres?', bad, mem, { n: 4,
    tip: `${q3(bad)} ressemble aux autres, mais il ne parle pas de la même idée. Les autres viennent de ${q3(f.m[0])}.` });
}
function famSort2(R) {
  const [a, b] = R.sample(FAM.filter((f) => f.m.length >= 3), 2);
  if (a.m.some((w) => b.m.includes(w))) return famSort2(R);
  const ia = R.sample(a.m.slice(1), 2), ib = R.sample(b.m.slice(1), 2);
  const items = R.shuffle([...ia.map((t) => ({ text: t, bin: 0 })), ...ib.map((t) => ({ text: t, bin: 1 }))]);
  return srt(`f33-o-${a.m[0]}-${b.m[0]}-${[...ia, ...ib].sort().join(',')}`, 'Range chaque mot dans sa famille.', [`Famille de ${q3(a.m[0])}`, `Famille de ${q3(b.m[0])}`], items,
    'Cherche le mot de base caché dans chaque mot.');
}
function famSort3(R) {
  const [a, b] = R.sample(FAM, 2);
  if (a.m.some((w) => b.m.includes(w))) return famSort3(R);
  const ia = R.sample(a.m.slice(1), 2), ib = R.sample(b.m.slice(1), 2);
  const ix = [R.pick(a.x), R.pick(b.x)].filter((w, i, arr) => arr.indexOf(w) === i && !a.m.includes(w) && !b.m.includes(w));
  const items = R.shuffle([...ia.map((t) => ({ text: t, bin: 0 })), ...ib.map((t) => ({ text: t, bin: 1 })), ...ix.map((t) => ({ text: t, bin: 2 }))]);
  return srt(`f33-p-${a.m[0]}-${b.m[0]}-${[...ia, ...ib, ...ix].sort().join(',')}`, 'Range les mots. Attention aux sosies!',
    [`Famille de ${q3(a.m[0])}`, `Famille de ${q3(b.m[0])}`, 'Aucune des deux'], items,
    'Un mot de la famille garde le même sens. Un sosie commence pareil, mais parle d’autre chose.');
}
function famBase(R) {
  const f = R.pick(FAM), w = R.pick(f.m.slice(1));
  const p = `Quel est le mot de base de ${q3(w)}?`;
  return ch(`f33-b-${w}`, p, f.m[0], R.sample(f.x, 2), { stimulus: w, n: 3,
    tip: `${q3(w)} est formé à partir de ${q3(f.m[0])}. Les autres mots se ressemblent seulement.` });
}
function famHand(R) {
  const f = R.pick(FAM), x = R.pick(f.m), rest = f.m.filter((w) => w !== x);
  return ans(`f33-h-${x}`, `Écris 2 mots de la même famille que ${q3(x)}.`, `Mot : ${x}`,
    `Deux vrais mots français de la même famille que « ${x} » (même racine « ${f.r} », même idée). Exemples acceptés : ${rest.join(', ')}. `
    + `Tout autre vrai mot de cette famille est bon. Les sosies (${f.x.join(', ')}) ne sont pas acceptés. L’orthographe exacte compte peu.`,
    `Exemples : ${rest.slice(0, 3).join(', ')}.`, 1);
}

/* =============================================================================
   g3f34 — Préfixes et suffixes
   ============================================================================= */
// a = affixe, s = découpage [partie, partie], x = mot de base pour le sens
const AFF = {
  re: { lab: 're-', kind: 'p', mean: (x) => `${x} de nouveau`, wrong: (x) => [`ne pas ${x}`, `${x} très vite`, `${x} pour la première fois`], tip: '« re- » au début d’un verbe veut souvent dire « de nouveau ».' },
  dé: { lab: 'dé-', kind: 'p', mean: (x) => `le contraire de ${q3(x)}`, wrong: (x) => [`${x} de nouveau`, `${x} avec soin`, `${x} très fort`], tip: '« dé- » (ou « dés- ») veut dire le contraire : défaire, c’est le contraire de faire.' },
  in: { lab: 'in- / im-', kind: 'p', mean: (x) => `pas ${x}`, wrong: (x) => [`très ${x}`, `presque ${x}`, `${x} de nouveau`], tip: '« in- » ou « im- » veut dire « pas » : impossible = pas possible. On écrit « im » devant p, b et m.' },
  eur: { lab: '-eur / -euse', kind: 's', mean: ([v]) => `une personne qui ${v}`, wrong: ([v, inf]) => [`un endroit où l’on ${v}`, `l’action de ${inf}`, `un objet pour ${inf}`], tip: '« -eur » ou « -euse » à la fin d’un mot nomme souvent une personne qui fait l’action.' },
  ette: { lab: '-ette / -et', kind: 's', mean: ([n, g]) => (g === 'f' ? `une petite ${n}` : `un petit ${n}`), wrong: ([n, g]) => [g === 'f' ? `une grande ${n}` : `un grand ${n}`, `une personne qui fabrique des ${n}s`, `beaucoup de ${n}s`], tip: '« -ette » ou « -et » à la fin d’un nom veut souvent dire « petit ».' },
  arbre: { lab: '-ier', kind: 's', mean: (x) => `l’arbre qui donne des ${x}`, wrong: (x) => [`la personne qui vend des ${x}`, `un panier pour les ${x}`, `une recette de ${x}`], tip: '« -ier » à la fin d’un nom de fruit donne souvent le nom de l’arbre : pomme → pommier.' },
  pot: { lab: '-ier / -ière', kind: 's', mean: (x) => `le contenant pour ${x}`, wrong: (x) => [`l’arbre qui donne ${x}`, `la personne qui vend ${x}`, `une recette avec ${x}`], tip: '« -ier » ou « -ière » peut nommer l’objet qui contient quelque chose : sucre → sucrier.' },
  métier: { lab: '-ier / -ière', kind: 's', tip: '« -ier » ou « -ière » peut nommer un métier : ferme → fermier.' },
  able: { lab: '-able', kind: 's', mean: (x) => `qu’on peut ${x}`, wrong: (x) => [`qu’on ne peut pas ${x}`, `qui aime ${x}`, `qui doit ${x} tous les jours`], tip: '« -able » veut dire « qu’on peut… » : lavable = qu’on peut laver.' },
  ment: { lab: '-ment', kind: 's', mean: (x) => `de façon ${x}`, wrong: (x) => [`pas ${x}`, `une chose ${x}`, `presque ${x}`], tip: '« -ment » transforme un adjectif en adverbe : lente → lentement = de façon lente.' },
};
const AW = [
  ['relire', 're', ['re', 'lire'], 'lire'], ['refaire', 're', ['re', 'faire'], 'faire'], ['repartir', 're', ['re', 'partir'], 'partir'], ['revenir', 're', ['re', 'venir'], 'venir'],
  ['remonter', 're', ['re', 'monter'], 'monter'], ['reprendre', 're', ['re', 'prendre'], 'prendre'], ['redire', 're', ['re', 'dire'], 'dire'], ['revoir', 're', ['re', 'voir'], 'voir'],
  ['réécrire', 're', ['ré', 'écrire'], 'écrire'], ['recommencer', 're', ['re', 'commencer'], 'commencer'], ['remettre', 're', ['re', 'mettre'], 'mettre'], ['recoller', 're', ['re', 'coller'], 'coller'],
  ['relancer', 're', ['re', 'lancer'], 'lancer'], ['recompter', 're', ['re', 'compter'], 'compter'], ['réchauffer', 're', ['ré', 'chauffer'], 'chauffer'], ['remplir', 're', ['rem', 'plir'], null],
  ['défaire', 'dé', ['dé', 'faire'], 'faire'], ['découdre', 'dé', ['dé', 'coudre'], 'coudre'], ['déplier', 'dé', ['dé', 'plier'], 'plier'], ['débrancher', 'dé', ['dé', 'brancher'], 'brancher'],
  ['décoller', 'dé', ['dé', 'coller'], 'coller'], ['démonter', 'dé', ['dé', 'monter'], 'monter'], ['déboutonner', 'dé', ['dé', 'boutonner'], 'boutonner'], ['désobéir', 'dé', ['dés', 'obéir'], 'obéir'],
  ['déranger', 'dé', ['dé', 'ranger'], 'ranger'], ['décongeler', 'dé', ['dé', 'congeler'], 'congeler'], ['déshabiller', 'dé', ['dés', 'habiller'], 'habiller'], ['décharger', 'dé', ['dé', 'charger'], 'charger'],
  ['dévisser', 'dé', ['dé', 'visser'], 'visser'], ['dégonfler', 'dé', ['dé', 'gonfler'], 'gonfler'], ['déboucher', 'dé', ['dé', 'boucher'], 'boucher'],
  ['impossible', 'in', ['im', 'possible'], 'possible'], ['inconnu', 'in', ['in', 'connu'], 'connu'], ['invisible', 'in', ['in', 'visible'], 'visible'], ['incapable', 'in', ['in', 'capable'], 'capable'],
  ['imprudent', 'in', ['im', 'prudent'], 'prudent'], ['impoli', 'in', ['im', 'poli'], 'poli'], ['inutile', 'in', ['in', 'utile'], 'utile'], ['injuste', 'in', ['in', 'juste'], 'juste'],
  ['impatient', 'in', ['im', 'patient'], 'patient'], ['immobile', 'in', ['im', 'mobile'], 'mobile'], ['incorrect', 'in', ['in', 'correct'], 'correct'], ['inégal', 'in', ['in', 'égal'], 'égal'],
  ['incomplet', 'in', ['in', 'complet'], 'complet'], ['imbuvable', 'in', ['im', 'buvable'], 'buvable'],
  ['chanteur', 'eur', ['chant', 'eur'], ['chante', 'chanter']], ['danseur', 'eur', ['dans', 'eur'], ['danse', 'danser']], ['nageur', 'eur', ['nag', 'eur'], ['nage', 'nager']],
  ['joueur', 'eur', ['jou', 'eur'], ['joue', 'jouer']], ['coureur', 'eur', ['cour', 'eur'], ['court', 'courir']], ['skieur', 'eur', ['ski', 'eur'], ['skie', 'skier']],
  ['patineur', 'eur', ['patin', 'eur'], ['patine', 'patiner']], ['vendeur', 'eur', ['vend', 'eur'], ['vend', 'vendre']], ['pêcheur', 'eur', ['pêch', 'eur'], ['pêche', 'pêcher']],
  ['voyageur', 'eur', ['voyag', 'eur'], ['voyage', 'voyager']], ['chanteuse', 'eur', ['chant', 'euse'], ['chante', 'chanter']], ['danseuse', 'eur', ['dans', 'euse'], ['danse', 'danser']],
  ['nageuse', 'eur', ['nag', 'euse'], ['nage', 'nager']], ['coiffeuse', 'eur', ['coiff', 'euse'], ['coiffe', 'coiffer']], ['conteur', 'eur', ['cont', 'eur'], ['raconte des contes', 'conter']],
  ['dormeur', 'eur', ['dorm', 'eur'], ['dort', 'dormir']], ['grimpeuse', 'eur', ['grimp', 'euse'], ['grimpe', 'grimper']],
  ['fillette', 'ette', ['fill', 'ette'], ['fille', 'f']], ['maisonnette', 'ette', ['maisonn', 'ette'], ['maison', 'f']], ['camionnette', 'ette', ['camionn', 'ette'], ['camion', 'm']],
  ['clochette', 'ette', ['cloch', 'ette'], ['cloche', 'f']], ['chaînette', 'ette', ['chaîn', 'ette'], ['chaîne', 'f']], ['statuette', 'ette', ['statu', 'ette'], ['statue', 'f']],
  ['planchette', 'ette', ['planch', 'ette'], ['planche', 'f']], ['tartelette', 'ette', ['tartel', 'ette'], ['tarte', 'f']], ['pochette', 'ette', ['poch', 'ette'], ['poche', 'f']],
  ['garçonnet', 'ette', ['garçonn', 'et'], ['garçon', 'm']], ['jardinet', 'ette', ['jardin', 'et'], ['jardin', 'm']], ['livret', 'ette', ['livr', 'et'], ['livre', 'm']], ['coffret', 'ette', ['coffr', 'et'], ['coffre', 'm']],
  ['pommier', 'arbre', ['pomm', 'ier'], 'pommes'], ['poirier', 'arbre', ['poir', 'ier'], 'poires'], ['cerisier', 'arbre', ['ceris', 'ier'], 'cerises'], ['prunier', 'arbre', ['prun', 'ier'], 'prunes'],
  ['citronnier', 'arbre', ['citronn', 'ier'], 'citrons'], ['noisetier', 'arbre', ['noiset', 'ier'], 'noisettes'], ['bananier', 'arbre', ['banan', 'ier'], 'bananes'], ['abricotier', 'arbre', ['abricot', 'ier'], 'abricots'],
  ['sucrier', 'pot', ['sucr', 'ier'], 'le sucre'], ['salière', 'pot', ['sal', 'ière'], 'le sel'], ['théière', 'pot', ['thé', 'ière'], 'le thé'], ['beurrier', 'pot', ['beurr', 'ier'], 'le beurre'],
  ['poivrier', 'pot', ['poivr', 'ier'], 'le poivre'], ['cafetière', 'pot', ['cafet', 'ière'], 'le café'],
  ['fermier', 'métier', ['ferm', 'ier'], ['la personne qui travaille sur une ferme', 'une petite ferme', 'l’arbre qui pousse à la ferme']],
  ['jardinier', 'métier', ['jardin', 'ier'], ['la personne qui s’occupe d’un jardin', 'un petit jardin', 'un outil pour creuser']],
  ['pâtissier', 'métier', ['pâtiss', 'ier'], ['la personne qui fait des pâtisseries', 'un gâteau très sucré', 'la boîte à gâteaux']],
  ['épicier', 'métier', ['épic', 'ier'], ['la personne qui tient une épicerie', 'une épice très forte', 'une petite épicerie']],
  ['pompier', 'métier', ['pomp', 'ier'], ['la personne qui éteint les incendies', 'une petite pompe', 'un camion rouge']],
  ['lavable', 'able', ['lav', 'able'], 'laver'], ['mangeable', 'able', ['mange', 'able'], 'manger'], ['buvable', 'able', ['buv', 'able'], 'boire'], ['jetable', 'able', ['jet', 'able'], 'jeter'],
  ['pliable', 'able', ['pli', 'able'], 'plier'], ['réparable', 'able', ['répar', 'able'], 'réparer'], ['transportable', 'able', ['transport', 'able'], 'transporter'], ['habitable', 'able', ['habit', 'able'], 'habiter'],
  ['recyclable', 'able', ['recycl', 'able'], 'recycler'], ['cassable', 'able', ['cass', 'able'], 'casser'], ['faisable', 'able', ['fais', 'able'], 'faire'],
  ['lentement', 'ment', ['lente', 'ment'], 'lente'], ['doucement', 'ment', ['douce', 'ment'], 'douce'], ['rapidement', 'ment', ['rapide', 'ment'], 'rapide'], ['joyeusement', 'ment', ['joyeuse', 'ment'], 'joyeuse'],
  ['tristement', 'ment', ['triste', 'ment'], 'triste'], ['fièrement', 'ment', ['fière', 'ment'], 'fière'], ['calmement', 'ment', ['calme', 'ment'], 'calme'], ['poliment', 'ment', ['poli', 'ment'], 'polie'],
  ['sagement', 'ment', ['sage', 'ment'], 'sage'], ['fortement', 'ment', ['forte', 'ment'], 'forte'], ['légèrement', 'ment', ['légère', 'ment'], 'légère'], ['clairement', 'ment', ['claire', 'ment'], 'claire'],
  ['facilement', 'ment', ['facile', 'ment'], 'facile'],
].filter((e) => e[3] !== null).map(([w, a, s, x]) => ({ w, a, s, x }));
const meanOf = (e) => (e.a === 'métier' ? e.x[0] : AFF[e.a].mean(e.x));
const wrongOf = (e) => (e.a === 'métier' ? e.x.slice(1) : AFF[e.a].wrong(e.x));
const PREFIXED = AW.filter((e) => AFF[e.a].kind === 'p');
const LOOK = { re: ['reine', 'renard', 'requin', 'renne'], dé: ['décembre', 'délicieux', 'déjà'], in: ['insecte', 'image', 'imiter', 'instrument'] };
const PMEAN = { re: '« de nouveau »', dé: '« le contraire »', in: '« pas »' };
const COUNTER = { eur: ['eur', 'euse'], ette: ['ette', 'et'], arbre: ['ier', 'ière'], pot: ['ier', 'ière'], métier: ['ier', 'ière'] };

function affMeaning(R, level) {
  const e = R.pick(AW), n = level === 3 ? 4 : 3;
  const p = `Que veut dire ${q3(e.w)}?`;
  return ch(`f34-m${n}-${e.w}`, p, meanOf(e), R.shuffle(wrongOf(e)), { stimulus: `${e.s[0]} + ${e.s[1]}`, n, tip: AFF[e.a].tip });
}
function affLabel(R) {
  const e = R.pick(AW), right = AFF[e.a].lab;
  const pool = [...new Set(Object.values(AFF).map((a) => a.lab))].filter((l) => l !== right);
  return ch(`f34-l-${e.w}`, `Quel préfixe ou suffixe trouve-t-on dans ${q3(e.w)}?`, right, R.sample(pool, 2), { stimulus: e.w, n: 3,
    tip: `${q3(e.w)} = ${e.s[0]} + ${e.s[1]}. ${AFF[e.a].tip}` });
}
function affBuild(R) {
  const e = R.pick(AW);
  const ex = AFF[e.a].kind === 'p' ? R.pick(['re', 'dé', 'in', 'im'].filter((x) => x !== e.s[0] && !(e.a === 'in' && ['in', 'im'].includes(x)) && !(e.a === 're' && x === 're') && !(e.a === 'dé' && x === 'dé')))
    : R.pick(['eur', 'ette', 'able', 'ment', 'ier'].filter((x) => !(COUNTER[e.a] || [e.s[1]]).includes(x) && x !== e.s[1]));
  return ord(`f34-b-${e.w}`, `Forme le mot qui veut dire : ${meanOf(e)}.`, e.s, { joiner: '', extra: [ex], tip: `${e.s[0]} + ${e.s[1]} = ${e.w}. ${AFF[e.a].tip}`, say: fx(`Forme le mot qui veut dire : ${meanOf(e)}.`) });
}
function affPick(R) {
  const e = R.pick(AW), pre = AFF[e.a].kind === 'p';
  const right = pre ? `${e.s[0]}-` : `-${e.s[1]}`;
  const block = pre ? (e.a === 'in' ? ['in', 'im'] : e.a === 're' ? ['re', 'ré'] : ['dé', 'dés']) : (COUNTER[e.a] || [e.s[1]]);
  const pool = pre ? ['re', 'dé', 'in', 'im'].filter((x) => !block.includes(x)).map((x) => `${x}-`) : ['eur', 'ette', 'able', 'ment', 'ier', 'eux'].filter((x) => !block.includes(x)).map((x) => `-${x}`);
  const p = `Quelle partie manque pour dire : ${meanOf(e)}?`;
  return ch(`f34-k-${e.w}`, p, right, R.sample(pool, 2), { stimulus: pre ? `___${e.s[1]}` : `${e.s[0]}___`, n: 3, tip: `${e.w} = ${e.s[0]} + ${e.s[1]}. ${AFF[e.a].tip}` });
}
function affTrue(R) {
  const e = R.pick(PREFIXED), k = e.a;
  const p = `Dans quel mot le début veut-il dire ${PMEAN[k]}?`;
  return ch(`f34-x-${e.w}`, p, e.w, R.sample(LOOK[k], 2), { n: 3,
    tip: `Enlève le début de ${q3(e.w)} : il reste ${q3(e.s[1])}, un vrai mot! Dans ${q3(LOOK[k][0])}, il ne reste pas de mot de base.` });
}
function affSort(R) {
  const yes = R.sample(PREFIXED, 3), no = R.sample(Object.values(LOOK).flat(), 3);
  const items = R.shuffle([...yes.map((e) => ({ text: e.w, bin: 0 })), ...no.map((t) => ({ text: t, bin: 1 }))]);
  return srt(`f34-s-${[...yes.map((e) => e.w), ...no].sort().join(',')}`, 'Ce mot a-t-il un vrai préfixe?', ['Oui, un préfixe', 'Non, pas de préfixe'], items,
    'Un vrai préfixe s’enlève et il reste un mot de base : re-lire → lire. Mais « reine » sans « re » ne veut rien dire!');
}
function affIm(R) {
  const e = R.pick(AW.filter((x) => x.a === 'in'));
  const wrong = e.s[0] === 'im' ? `in${e.s[1]}` : `im${e.s[1]}`;
  return ch(`f34-im-${e.w}`, 'Quel mot est bien écrit?', e.w, [wrong, `${e.s[0]}${e.s[0].slice(-1)}${e.s[1]}`].filter((w) => !isReal(w)), { n: 3, say: fx(`Quel mot est bien écrit : ${e.w}?`),
    tip: 'On écrit « im » devant b, m et p (impossible, immobile, imbuvable). Ailleurs, on écrit « in ».' });
}

/* =============================================================================
   g3f35 — Synonymes et antonymes nuancés
   ============================================================================= */
const SYN = [
  ['Ce gâteau aux fraises est « délicieux ».', 'délicieux', 'savoureux', 'dégoûtant', 'salé', 'brûlé'],
  ['Mon chien court très « vite ».', 'vite', 'rapidement', 'lentement', 'souvent', 'tard'],
  ['La maison de ma tante est « immense ».', 'immense', 'énorme', 'minuscule', 'ancienne', 'jaune'],
  ['Zoé a « débuté » son dessin.', 'débuté', 'commencé', 'terminé', 'effacé', 'déchiré'],
  ['Le bébé « pleure » dans son lit.', 'pleure', 'sanglote', 'rit', 'chante', 'mange'],
  ['Mon frère est « content » de son cadeau.', 'content', 'heureux', 'déçu', 'fâché', 'surpris'],
  ['Les enfants « regardent » les étoiles.', 'regardent', 'observent', 'écoutent', 'oublient', 'comptent'],
  ['La soupe est « brûlante ».', 'brûlante', 'très chaude', 'tiède', 'froide', 'salée'],
  ['Ce film est vraiment « drôle ».', 'drôle', 'amusant', 'triste', 'long', 'effrayant'],
  ['Félix a « trouvé » un vieux trésor dans le grenier.', 'trouvé', 'découvert', 'perdu', 'lavé', 'caché'],
  ['La voisine « habite » au deuxième étage.', 'habite', 'demeure', 'travaille', 'dort', 'mange'],
  ['Mon arrière-grand-père est très « vieux ».', 'vieux', 'âgé', 'jeune', 'grand', 'fatigué'],
  ['Le lion « attrape » une gazelle.', 'attrape', 'capture', 'libère', 'regarde', 'suit'],
  ['Ce problème de maths est « facile ».', 'facile', 'simple', 'difficile', 'long', 'nouveau'],
  ['Mon chandail est « sale ».', 'sale', 'malpropre', 'propre', 'neuf', 'mouillé'],
  ['Emma est une fille « gentille ».', 'gentille', 'aimable', 'méchante', 'grande', 'pressée'],
  ['Le chevalier est très « courageux ».', 'courageux', 'brave', 'peureux', 'fatigué', 'riche'],
  ['La rivière est « calme » ce matin.', 'calme', 'tranquille', 'agitée', 'profonde', 'froide'],
  ['Nous allons « bâtir » une cabane dans l’arbre.', 'bâtir', 'construire', 'détruire', 'peindre', 'visiter'],
  ['Mia « répare » son vélo.', 'répare', 'arrange', 'brise', 'lave', 'vend'],
  ['Le pompier « sauve » le chat.', 'sauve', 'secourt', 'perd', 'chasse', 'oublie'],
  ['Cette histoire de fantômes est « effrayante ».', 'effrayante', 'épeurante', 'amusante', 'courte', 'vraie'],
  ['Le renard est un animal « rusé ».', 'rusé', 'malin', 'naïf', 'lent', 'gros'],
  ['La bibliothèque est « silencieuse ».', 'silencieuse', 'tranquille', 'bruyante', 'grande', 'fermée'],
  ['Le géant a une voix « forte ».', 'forte', 'puissante', 'faible', 'douce', 'aiguë'],
  ['Ce sac d’épicerie est très « lourd ».', 'lourd', 'pesant', 'léger', 'petit', 'vide'],
  ['Il « lance » la balle à son ami.', 'lance', 'jette', 'attrape', 'garde', 'cache'],
  ['Je « pense » qu’il va neiger demain.', 'pense', 'crois', 'oublie', 'refuse', 'cache'],
  ['Le spectacle « commence » à sept heures.', 'commence', 'débute', 'finit', 'coûte', 'dure'],
  ['Le ciel est « sombre » ce soir.', 'sombre', 'obscur', 'clair', 'bleu', 'chaud'],
  ['Le chat « grimpe » dans l’érable.', 'grimpe', 'monte', 'descend', 'dort', 'saute'],
  ['Les élèves « bavardent » pendant la récréation.', 'bavardent', 'jasent', 'se taisent', 'courent', 'mangent'],
  ['Ce dessin est « magnifique ».', 'magnifique', 'splendide', 'affreux', 'petit', 'fini'],
  ['Il est « fâché » contre son frère.', 'fâché', 'en colère', 'content', 'gentil', 'fatigué'],
  ['Thomas « termine » son devoir.', 'termine', 'finit', 'commence', 'oublie', 'déchire'],
  ['Charlotte est une élève « attentive ».', 'attentive', 'concentrée', 'distraite', 'bruyante', 'pressée'],
  ['Le castor a les dents « pointues ».', 'pointues', 'aiguisées', 'arrondies', 'blanches', 'molles'],
  ['Sa chambre est bien « rangée ».', 'rangée', 'en ordre', 'en désordre', 'petite', 'peinte'],
  ['Le petit chiot est « peureux ».', 'peureux', 'craintif', 'brave', 'gros', 'sale'],
  ['Ce chemin est « dangereux » en hiver.', 'dangereux', 'risqué', 'sûr', 'joli', 'court'],
];
const ANT = [['grand', 'petit'], ['chaud', 'froid'], ['long', 'court'], ['lourd', 'léger'], ['plein', 'vide'], ['ouvert', 'fermé'], ['propre', 'sale'], ['jeune', 'vieux'],
  ['rapide', 'lent'], ['haut', 'bas'], ['gentil', 'méchant'], ['facile', 'difficile'], ['gagner', 'perdre'], ['entrer', 'sortir'], ['monter', 'descendre'], ['allumer', 'éteindre'],
  ['toujours', 'jamais'], ['dedans', 'dehors'], ['avant', 'après'], ['jour', 'nuit'], ['riche', 'pauvre'], ['sec', 'mouillé'], ['dur', 'mou'], ['joyeux', 'triste'],
  ['fort', 'faible'], ['beau', 'laid'], ['rire', 'pleurer'], ['premier', 'dernier'], ['commencer', 'finir'], ['acheter', 'vendre'], ['ami', 'ennemi'], ['tôt', 'tard'],
  ['large', 'étroit'], ['épais', 'mince'], ['poli', 'impoli'], ['devant', 'derrière'], ['sous', 'sur'], ['bruyant', 'silencieux'], ['donner', 'recevoir'], ['lever', 'coucher'], ['courageux', 'peureux']];
const ANTC = [
  ['Le pain du boulanger est « frais ».', 'frais', 'sec', 'chaud', 'mou'],
  ['L’eau du lac est « fraîche » ce matin.', 'fraîche', 'chaude', 'sèche', 'sale'],
  ['Mon voisin est très « vieux ».', 'vieux', 'jeune', 'neuf', 'petit'],
  ['Mon vélo est « vieux ».', 'vieux', 'neuf', 'jeune', 'rapide'],
  ['Ce sac à dos est « léger ».', 'léger', 'lourd', 'fort', 'plein'],
  ['Ce matin, le vent est « léger ».', 'léger', 'fort', 'lourd', 'froid'],
  ['La peau du bébé est « douce ».', 'douce', 'rugueuse', 'amère', 'chaude'],
  ['Ce bonbon est « doux ».', 'doux', 'amer', 'rugueux', 'froid'],
  ['Aujourd’hui, il fait « doux ».', 'doux', 'froid', 'amer', 'rugueux'],
  ['Ce vieux biscuit est « dur ».', 'dur', 'mou', 'facile', 'sucré'],
  ['Cet exercice est « dur ».', 'dur', 'facile', 'mou', 'long'],
  ['Mon chandail est bleu « clair ».', 'clair', 'foncé', 'vide', 'court'],
  ['Mon père est très « fort ».', 'fort', 'faible', 'léger', 'lent'],
  ['Elle a les cheveux « courts ».', 'courts', 'longs', 'hauts', 'larges'],
  ['La tortue avance d’un pas « lent ».', 'lent', 'rapide', 'court', 'léger'],
  ['Ce fil de laine est très « fin ».', 'fin', 'épais', 'début', 'lourd'],
  ['C’est la « fin » de l’histoire.', 'fin', 'début', 'épais', 'milieu'],
  ['Il se lève très « tôt ».', 'tôt', 'tard', 'vite', 'bas'],
  ['Parle à voix « basse » dans la bibliothèque.', 'basse', 'haute', 'grande', 'longue'],
  ['Le verre de lait est « plein ».', 'plein', 'vide', 'ouvert', 'sec'],
  ['Ma chambre est « propre ».', 'propre', 'sale', 'vide', 'sombre'],
  ['La porte du garage est « ouverte ».', 'ouverte', 'fermée', 'cachée', 'basse'],
  ['La soupe est « chaude ».', 'chaude', 'froide', 'douce', 'sèche'],
  ['Le chemin est « large ».', 'large', 'étroit', 'court', 'bas'],
  ['Les feuilles mortes sont « sèches ».', 'sèches', 'mouillées', 'sales', 'basses'],
  ['Le chien du voisin est « gentil ».', 'gentil', 'méchant', 'petit', 'calme'],
  ['Félix « entre » dans la classe.', 'entre', 'sort', 'arrive', 'marche'],
  ['Le chat « monte » sur le toit.', 'monte', 'descend', 'entre', 'court'],
  ['Maya « allume » la lampe.', 'allume', 'éteint', 'casse', 'achète'],
  ['Mon équipe a « gagné » la partie.', 'gagné', 'perdu', 'joué', 'fini'],
  ['J’ai « trouvé » mes mitaines.', 'trouvé', 'perdu', 'lavé', 'mis'],
  ['Le dépanneur « ouvre » à huit heures.', 'ouvre', 'ferme', 'commence', 'vend'],
  ['La rue est « bruyante » le samedi.', 'bruyante', 'silencieuse', 'sale', 'étroite'],
  ['Mon chat est « gros ».', 'gros', 'maigre', 'court', 'jeune'],
  ['Ce chemin est « dangereux ».', 'dangereux', 'sûr', 'joli', 'long'],
];
const SCALES = [['tiède', 'chaud', 'brûlant'], ['frais', 'froid', 'glacial'], ['humide', 'mouillé', 'trempé'], ['grand', 'immense', 'gigantesque'],
  ['petit', 'minuscule', 'microscopique'], ['content', 'joyeux', 'fou de joie'], ['mécontent', 'fâché', 'furieux'], ['inquiet', 'effrayé', 'terrifié'],
  ['triste', 'malheureux', 'désespéré'], ['mangeable', 'bon', 'délicieux'], ['chuchoter', 'parler', 'crier'], ['joli', 'beau', 'magnifique'],
  ['apprécier', 'aimer', 'adorer'], ['grignoter', 'manger', 'dévorer'], ['sourire', 'rire', 'éclater de rire'], ['brise', 'vent', 'tempête'],
  ['bruine', 'pluie', 'déluge'], ['butte', 'colline', 'montagne'], ['ruisseau', 'rivière', 'fleuve'], ['murmure', 'bruit', 'vacarme'], ['fatigué', 'très fatigué', 'épuisé'],
  ['marcher', 'courir', 'foncer'], ['tiède', 'chaud', 'bouillant']];
const NUANCE = [
  ['Après le marathon, Léo est ___ : il ne peut plus faire un seul pas.', 'épuisé', 'fatigué', 'reposé'],
  ['L’eau du bain est ___ : elle n’est ni froide ni chaude.', 'tiède', 'brûlante', 'glacée'],
  ['Attention! La poêle sort du four, elle est ___!', 'brûlante', 'tiède', 'fraîche'],
  ['Il pleut si fort que je suis ___ jusqu’aux os.', 'trempé', 'humide', 'sec'],
  ['La fourmi est ___ à côté de l’éléphant.', 'minuscule', 'grande', 'gigantesque'],
  ['La baleine bleue est un animal ___.', 'gigantesque', 'petit', 'minuscule'],
  ['Chut! Le bébé dort, il faut ___.', 'chuchoter', 'crier', 'hurler'],
  ['Quand Zoé a vu l’ours, elle était ___ : elle tremblait de peur.', 'terrifiée', 'inquiète', 'calme'],
  ['Mon frère est ___ : il claque la porte et crie très fort.', 'furieux', 'mécontent', 'content'],
  ['Je suis un peu ___ : j’aurais préféré un autre dessert.', 'déçu', 'désespéré', 'ravi'],
  ['Ce n’est qu’une petite ___, les feuilles bougent à peine.', 'brise', 'tornade', 'tempête'],
  ['Le ___ de la foule était si fort qu’on ne s’entendait plus.', 'vacarme', 'murmure', 'silence'],
  ['Une petite ___ tombe : pas besoin de parapluie.', 'bruine', 'averse', 'déluge'],
  ['Ce dessin est ___ : c’est le plus beau que j’aie jamais vu!', 'magnifique', 'correct', 'laid'],
  ['L’oiseau a ___ quelques graines, sans avoir très faim.', 'grignoté', 'dévoré', 'englouti'],
  ['Le loup affamé a ___ tout le repas en une minute.', 'dévoré', 'grignoté', 'goûté'],
  ['Jacob ___ sa grand-mère : il l’aime plus que tout.', 'adore', 'apprécie', 'déteste'],
  ['Cette blague est si drôle que toute la classe ___.', 'éclate de rire', 'sourit', 'pleure'],
  ['Il fait ___ : mets ta tuque, ton foulard et tes mitaines!', 'glacial', 'frais', 'chaud'],
  ['En septembre, le matin est ___ : une petite veste suffit.', 'frais', 'glacial', 'brûlant'],
  ['Le géant a une voix ___ qui fait trembler les murs.', 'puissante', 'faible', 'douce'],
  ['Mia saute partout en criant : elle est ___!', 'folle de joie', 'contente', 'triste'],
  ['Je suis ___ de mon résultat, sans plus.', 'content', 'fou de joie', 'furieux'],
  ['Avant sa présentation orale, Noah est un peu ___.', 'inquiet', 'terrifié', 'joyeux'],
  ['À midi, en juillet, le soleil est ___ : mets ta casquette.', 'brûlant', 'tiède', 'frais'],
  ['Ce n’est pas une montagne, c’est une petite ___.', 'butte', 'falaise', 'chaîne de montagnes'],
  ['Le Saint-Laurent n’est pas une rivière : c’est un ___.', 'fleuve', 'ruisseau', 'étang'],
  ['On peut sauter par-dessus ce ___ sans se mouiller les pieds.', 'ruisseau', 'fleuve', 'lac'],
  ['Le bébé ___ quand papa fait des grimaces.', 'sourit', 'hurle', 'sanglote'],
  ['Mon lit est ___ : j’ai renversé un verre d’eau, mais juste une goutte.', 'humide', 'trempé', 'inondé'],
  ['Le lion a ___ si fort que tous les animaux ont sursauté.', 'rugi', 'murmuré', 'chuchoté'],
  ['Ce gâteau n’est pas très bon, il est juste ___.', 'mangeable', 'délicieux', 'exquis'],
];
function synCtx(R, level) {
  const [s, w, r, ...wr] = R.pick(SYN), n = level === 1 ? 3 : 4;
  return ch(`f35-s${n}-${w}-${s.length}`, `Quel mot peut remplacer ${q3(w)} dans la phrase?`, r, R.shuffle(wr), { stimulus: s, n, say: fx(s),
    tip: `Un synonyme veut dire presque la même chose : ${q3(w)} ≈ ${q3(r)}.` });
}
function antPair(R) {
  const [a, b] = R.pick(ANT), [x, y] = R.chance(0.5) ? [a, b] : [b, a];
  const wr = R.sample(ANT.filter((p) => !p.includes(x) && !p.includes(y)), 2).map((p) => R.pick(p));
  return ch(`f35-a-${x}`, `Quel est le contraire de ${q3(x)}?`, y, wr, { stimulus: x, n: 3, tip: `Un antonyme veut dire le contraire : ${x} ↔ ${y}.` });
}
function antCtx(R) {
  const [s, w, r, ...wr] = R.pick(ANTC);
  return ch(`f35-c-${s}`, `Dans cette phrase, quel est le contraire de ${q3(w)}?`, r, wr, { stimulus: s, n: 4, say: fx(s),
    tip: `Le contraire dépend du sens dans la phrase. Ici, le contraire de ${q3(w)}, c’est ${q3(r)}.` });
}
function scaleOrder(R, level) {
  const sc = R.pick(SCALES);
  const extra = level === 3 ? [R.pick(R.pick(SCALES.filter((x) => !x.some((w) => sc.includes(w)))))] : undefined;
  return ord(`f35-o${level}-${sc.join(',')}`, level === 3 ? 'Place les mots du plus faible au plus fort. Un mot ne va pas avec les autres!' : 'Place les mots du plus faible au plus fort.', sc,
    { extra, tip: `Du plus faible au plus fort : ${sc.join(' → ')}.` });
}
function scaleMost(R, level) {
  const sc = R.pick(SCALES), weak = level === 3 && R.chance(0.5);
  const right = weak ? sc[0] : sc[2];
  return ch(`f35-${weak ? 'w' : 'f'}-${sc.join(',')}`, weak ? 'Quel mot est le plus FAIBLE?' : 'Quel mot est le plus FORT?', right, weak ? sc.slice(1) : sc.slice(0, 2), { n: 3,
    tip: `Du plus faible au plus fort : ${sc.join(' → ')}.` });
}
function nuance(R) {
  const [s, r, ...wr] = R.pick(NUANCE);
  return ch(`f35-n-${s}`, 'Choisis le mot le plus juste.', r, wr, { stimulus: s, n: 3, say: fx(s.replace('___', '…')),
    tip: `Lis tous les indices de la phrase : ${q3(r)} est le mot le plus précis ici.` });
}

/* =============================================================================
   g3f36 — Sens propre et sens figuré
   ============================================================================= */
// [mot-clé, phrase au sens figuré, vrai sens, faux sens (souvent le sens propre), autre faux sens]
const FIG = [
  ['cœur', 'Mon grand-père a un cœur d’or.', 'Il est très généreux.', 'Son cœur est fait en or.', 'Il est très riche.'],
  ['pierre', 'Le géant de l’histoire a un cœur de pierre.', 'Il n’a aucune pitié.', 'Il a avalé une pierre.', 'Il est très fort.'],
  ['pommes', 'Il faisait si chaud qu’il est tombé dans les pommes.', 'Il s’est évanoui.', 'Il est tombé dans un panier de pommes.', 'Il a mangé trop de pommes.'],
  ['lune', 'Pendant la dictée, Zoé était dans la lune.', 'Elle était distraite.', 'Elle était sur la lune.', 'Elle dormait dehors.'],
  ['cordes', 'Prends ton imperméable : il pleut des cordes!', 'Il pleut très fort.', 'Des cordes tombent du ciel.', 'Il va pleuvoir demain.'],
  ['main', 'Peux-tu me donner un coup de main pour ranger?', 'M’aider', 'Me frapper avec ta main', 'Me serrer la main'],
  ['loup', 'Après le hockey, j’ai une faim de loup!', 'J’ai très faim.', 'Je veux manger un loup.', 'J’ai peur des loups.'],
  ['poisson', 'Ma sœur nage comme un poisson.', 'Elle nage très bien.', 'Elle a des nageoires.', 'Elle vit dans un aquarium.'],
  ['oreilles', 'Parle tout bas : les murs ont des oreilles.', 'Quelqu’un pourrait nous entendre.', 'Les murs ont de vraies oreilles.', 'Il faut peindre les murs.'],
  ['nuages', 'Léo a toujours la tête dans les nuages.', 'Il rêvasse souvent.', 'Sa tête touche les nuages.', 'Il est très grand.'],
  ['pied', 'Ce matin, elle s’est levée du mauvais pied.', 'Elle est de mauvaise humeur.', 'Elle s’est fait mal au pied.', 'Elle s’est levée trop tôt.'],
  ['langue', 'Je ne trouve pas la réponse : je donne ma langue au chat.', 'J’abandonne, dis-moi la réponse.', 'Je nourris mon chat.', 'Je ne parle plus.'],
  ['chat', 'J’ai un chat dans la gorge.', 'J’ai la voix enrouée.', 'J’ai avalé un chat.', 'J’ai envie d’un chat.'],
  ['dents', 'Tu auras un dragon quand les poules auront des dents!', 'Jamais.', 'Bientôt.', 'Quand les poules iront chez le dentiste.'],
  ['œil', 'Je n’ai pas fermé l’œil de la nuit.', 'Je n’ai pas dormi.', 'J’avais un œil blessé.', 'J’ai dormi les yeux ouverts.'],
  ['yeux', 'Ce vélo coûte les yeux de la tête.', 'Il coûte très cher.', 'On le paie avec ses yeux.', 'Il n’est pas cher.'],
  ['dos', 'Ce bruit dans le noir m’a donné froid dans le dos.', 'Il m’a fait peur.', 'J’avais froid au dos.', 'Il m’a fait mal au dos.'],
  ['bras', 'Il est resté les bras croisés pendant le ménage.', 'Il n’a rien fait pour aider.', 'Il avait mal aux bras.', 'Il a travaillé très fort.'],
  ['nez', 'Ma petite sœur me mène par le bout du nez.', 'Elle me fait faire tout ce qu’elle veut.', 'Elle me tire le nez.', 'Elle me montre le chemin.'],
  ['mouton', 'Mon cousin est un vrai mouton : il fait tout comme les autres.', 'Il imite les autres.', 'Il a de la laine.', 'Il mange de l’herbe.'],
  ['ours', 'Le vieux pêcheur est un ours : il n’aime pas parler aux gens.', 'Il est peu sociable.', 'Il est couvert de poils.', 'Il dort tout l’hiver.'],
  ['lait', 'Mon oncle est soupe au lait.', 'Il se fâche très vite.', 'Il aime la soupe au lait.', 'Il boit beaucoup de lait.'],
  ['glace', 'Pour briser la glace, Mia a raconté une blague.', 'Pour mettre tout le monde à l’aise', 'Pour casser un glaçon', 'Pour faire peur aux gens'],
  ['feu', 'Julie est tout feu tout flamme pour son projet.', 'Elle est très enthousiaste.', 'Elle a de la fièvre.', 'Elle joue avec des allumettes.'],
  ['mouche', 'Quelle mouche t’a piqué?', 'Pourquoi te fâches-tu tout à coup?', 'Où est la mouche?', 'As-tu une piqûre de mouche?'],
  ['éléphant', 'Ma grand-mère a une mémoire d’éléphant.', 'Elle se souvient de tout.', 'Elle a une trompe.', 'Elle oublie tout.'],
  ['fourmis', 'Après le long voyage en auto, j’ai des fourmis dans les jambes.', 'Mes jambes picotent.', 'Des fourmis marchent sur mes jambes.', 'J’ai couru très vite.'],
  ['cloches', 'Il s’est fait sonner les cloches par le directeur.', 'Il s’est fait gronder.', 'Il a sonné les cloches de l’église.', 'Il a reçu un prix.'],
  ['étoile', 'Mia gagne toujours : elle est née sous une bonne étoile.', 'Elle a de la chance.', 'Elle est née dehors la nuit.', 'Elle aime regarder le ciel.'],
  ['pains', 'Les billets du spectacle se vendent comme des petits pains.', 'Ils se vendent très vite.', 'On les vend à la boulangerie.', 'Ils coûtent très cher.'],
  ['gouttes', 'Mon frère et moi, nous nous ressemblons comme deux gouttes d’eau.', 'Nous nous ressemblons beaucoup.', 'Nous sommes mouillés.', 'Nous aimons nager.'],
  ['papillons', 'J’ai des papillons dans l’estomac avant mon spectacle.', 'Je suis nerveux.', 'J’ai avalé des papillons.', 'J’ai très faim.'],
  ['tortue', 'Avance un peu, tu es une vraie tortue!', 'Tu es très lent.', 'Tu as une carapace.', 'Tu es très vieux.'],
  ['plume', 'Ce sac de couchage est léger comme une plume.', 'Il est très léger.', 'Il est rempli de plumes.', 'Il est très doux.'],
  ['larmes', 'Elle a pleuré toutes les larmes de son corps.', 'Elle a beaucoup pleuré.', 'Elle n’a plus de corps.', 'Elle a pleuré un tout petit peu.'],
  ['sel', 'Cette histoire manque de sel.', 'Elle n’est pas assez amusante.', 'Il faut ajouter du sel.', 'Elle est trop longue.'],
  ['tempête', 'Une tempête de rires a éclaté dans la classe.', 'Toute la classe a ri très fort.', 'Il a neigé dans la classe.', 'La classe a eu peur.'],
  ['montagne', 'Il fait une montagne de rien du tout.', 'Il exagère un petit problème.', 'Il construit une montagne.', 'Il aime l’escalade.'],
  ['debout', 'Ton histoire de licorne au dépanneur est à dormir debout.', 'Elle est difficile à croire.', 'Elle se lit debout.', 'Elle donne sommeil.'],
  ['clé', 'La clé du succès, c’est de pratiquer chaque jour.', 'Le secret pour réussir', 'Une clé en métal', 'La porte du gymnase'],
];
const PROP = [
  ['cœur', 'La docteure écoute le cœur de Léo avec son stéthoscope.'], ['pierre', 'Noah lance une pierre dans le lac.'], ['pommes', 'Nous cueillons des pommes au verger.'],
  ['lune', 'Ce soir, la lune est pleine et ronde.'], ['cordes', 'Les cordes de ma guitare sont neuves.'], ['main', 'Lave-toi les mains avant le dîner.'],
  ['loup', 'Le loup hurle dans la forêt.'], ['poisson', 'Le poisson rouge nage dans son bocal.'], ['oreilles', 'Le lapin a de longues oreilles.'],
  ['nuages', 'Les nuages gris annoncent la pluie.'], ['pied', 'Aïe! Je me suis cogné le pied sur la table.'], ['langue', 'Le chien tire la langue quand il a chaud.'],
  ['chat', 'Le chat dort sur le divan.'], ['dents', 'Je me brosse les dents après le souper.'], ['œil', 'Un grain de sable m’est entré dans l’œil.'],
  ['yeux', 'Mia a les yeux bleus comme sa mère.'], ['dos', 'Papa a mal au dos après avoir pelleté.'], ['bras', 'Elle porte son petit frère dans ses bras.'],
  ['nez', 'Le clown a un gros nez rouge.'], ['mouton', 'Le mouton broute l’herbe dans le pré.'], ['ours', 'L’ours dort tout l’hiver dans sa tanière.'],
  ['lait', 'Je bois un verre de lait au déjeuner.'], ['glace', 'Les enfants patinent sur la glace de la patinoire.'], ['feu', 'Grand-papa allume un feu de camp.'],
  ['mouche', 'Une mouche vole autour de la lampe.'], ['éléphant', 'L’éléphant boit avec sa trompe.'], ['fourmis', 'Les fourmis transportent des miettes de pain.'],
  ['cloches', 'Les cloches de l’église sonnent à midi.'], ['étoile', 'Une étoile filante traverse le ciel.'], ['pains', 'Le boulanger sort les pains du four.'],
  ['gouttes', 'Des gouttes de pluie coulent sur la fenêtre.'], ['papillons', 'Des papillons volent au-dessus des fleurs.'], ['tortue', 'La tortue rentre la tête dans sa carapace.'],
  ['plume', 'Une plume d’oiseau est tombée du nid.'], ['larmes', 'Des larmes coulent sur les joues du bébé.'], ['sel', 'Ajoute une pincée de sel dans la soupe.'],
  ['tempête', 'La tempête de neige a fermé les écoles.'], ['montagne', 'Nous avons grimpé jusqu’au sommet de la montagne.'], ['debout', 'Dans l’autobus, je suis resté debout.'],
  ['clé', 'Maman cherche la clé de la maison.'],
];
const SENT_PF = [...FIG.map((f) => ({ s: f[1], fig: true, kw: f[0] })), ...PROP.map((p) => ({ s: p[1], fig: false, kw: p[0] }))];
function pfWhich(R) {
  const e = R.pick(SENT_PF), opts = ['Sens propre', 'Sens figuré'];
  return { type: 'choice', key: `f36-w-${e.s}`, prompt: `Le mot ${q3(e.kw)} est-il employé au sens propre ou au sens figuré?`, say: fx(e.s), stimulus: { text: e.s }, fixedOrder: true,
    options: opts.map((text) => ({ text })), answer: e.fig ? 1 : 0,
    tip: e.fig ? 'Sens figuré : on ne parle pas de la vraie chose, c’est une image pour dire autre chose.' : 'Sens propre : le mot veut dire exactement la vraie chose.' };
}
function figMean(R, level) {
  const f = R.pick(FIG), n = level === 3 ? 4 : 3;
  const wr = level === 3 ? [f[3], f[4], R.pick(FIG.filter((g) => g !== f))[2]] : [f[3], f[4]];
  return ch(`f36-m${n}-${f[0]}`, 'Que veut dire cette phrase?', f[2], wr, { stimulus: f[1], n, say: fx(f[1]),
    tip: `C’est une expression au sens figuré : il ne faut pas la prendre mot à mot. Elle veut dire : ${f[2].replace(/\.$/, '')}.` });
}
function pfSort(R) {
  const fs = R.sample(FIG, 2), ps = R.sample(PROP.filter((p) => !fs.some((f) => f[0] === p[0])), 2);
  const items = R.shuffle([...ps.map((p) => ({ text: p[1], bin: 0 })), ...fs.map((f) => ({ text: f[1], bin: 1 }))]);
  return srt(`f36-s-${[...fs.map((f) => f[0]), ...ps.map((p) => p[0])].join(',')}`, 'Sens propre ou sens figuré? Range les phrases.', ['Sens propre', 'Sens figuré'], items,
    'Demande-toi : est-ce que ça peut arriver pour vrai, mot à mot? Si non, c’est une image : sens figuré.');
}
function figFind(R) {
  const f = R.pick(FIG), p = PROP.find((x) => x[0] === f[0]);
  const other = R.pick(PROP.filter((x) => x !== p));
  return ch(`f36-f-${f[0]}`, `Dans quelle phrase ${q3(f[0])} est-il au sens figuré?`, f[1], [p[1], other[1]], { n: 3,
    tip: `Dans « ${f[1]} », on ne parle pas d’un vrai ${f[0]} : c’est une image.` });
}
function figReverse(R) {
  const f = R.pick(FIG), wr = R.sample(FIG.filter((g) => g !== f), 2).map((g) => g[1]);
  return ch(`f36-r-${f[0]}`, `Quelle phrase veut dire : ${f[2].replace(/\.$/, '')}?`, f[1], wr, { n: 3,
    tip: `« ${f[1]} » veut dire : ${f[2]}` });
}

/* =============================================================================
   g3f37 — Expressions et mots du Québec
   ============================================================================= */
// [mot ou expression, sens, faux sens, faux sens, phrase d’exemple, expression? (1)]
const QC = [
  ['une tuque', 'un bonnet chaud pour l’hiver', 'un gros manteau', 'une sorte de soupe', 'Mets ta tuque, il fait froid!'],
  ['des mitaines', 'des moufles pour garder les mains au chaud', 'des bottes d’hiver', 'des bas de laine', 'J’ai perdu une de mes mitaines dans la neige.'],
  ['un dépanneur', 'un petit magasin du coin', 'un garage pour les autos', 'un médecin', 'Va chercher du lait au dépanneur, s’il te plaît.'],
  ['le déjeuner', 'le repas du matin', 'le repas du midi', 'le repas du soir', 'Au déjeuner, je mange des céréales.'],
  ['le dîner', 'le repas du midi', 'le repas du matin', 'le repas du soir', 'À l’école, je mange mon dîner à midi.'],
  ['le souper', 'le repas du soir', 'le repas du matin', 'une collation', 'Ce soir, nous mangeons du spaghetti au souper.'],
  ['des bas', 'des chaussettes', 'des pantalons', 'des souliers', 'Mes bas sont mouillés à cause de la neige.'],
  ['des espadrilles', 'des souliers de sport', 'des sandales', 'des bottes de pluie', 'Mets tes espadrilles pour l’éducation physique.'],
  ['des gougounes', 'des sandales de plage', 'des bottes', 'des pantoufles', 'J’ai mis mes gougounes pour aller à la plage.'],
  ['un chandail', 'un gilet, un pull', 'une jupe', 'un chapeau', 'Ce chandail de laine est très chaud.'],
  ['une débarbouillette', 'une petite serviette pour se laver', 'un savon', 'une brosse à dents', 'Lave ton visage avec la débarbouillette.'],
  ['un breuvage', 'une boisson', 'un dessert', 'un légume', 'Quel breuvage veux-tu avec ton repas?'],
  ['du blé d’Inde', 'du maïs', 'du riz', 'des haricots', 'En août, on mange du blé d’Inde avec du beurre.'],
  ['une patate', 'une pomme de terre', 'une carotte', 'une pomme', 'Grand-maman fait de la purée de patates.'],
  ['un suçon', 'une sucette', 'un biscuit', 'un jouet', 'La dentiste m’a donné un suçon sans sucre.'],
  ['la poudrerie', 'de la neige soulevée par le vent', 'de la pluie très forte', 'du sable chaud', 'Avec la poudrerie, on ne voit plus la route.'],
  ['un banc de neige', 'un gros tas de neige', 'une chaise en neige', 'un bonhomme de neige', 'Les enfants glissent sur le banc de neige.'],
  ['de la sloche', 'de la neige fondante et sale', 'de la glace bien lisse', 'de la neige toute neuve', 'Mes bottes sont pleines de sloche.'],
  ['une efface', 'une gomme à effacer', 'un crayon', 'une règle', 'J’ai fait une erreur : passe-moi ton efface.'],
  ['un aiguisoir', 'un taille-crayon', 'une paire de ciseaux', 'une agrafeuse', 'Mon crayon est usé : où est l’aiguisoir?'],
  ['un cartable', 'un classeur à anneaux', 'un sac d’école', 'un cahier de dessin', 'Range tes feuilles dans ton cartable.'],
  ['un toutou', 'un animal en peluche', 'un vrai chien', 'une poupée', 'Mon petit frère dort avec son toutou.'],
  ['un minou', 'un chat', 'un loup', 'un oiseau', 'Le minou ronronne sur mes genoux.'],
  ['un char', 'une auto (mot familier)', 'un cheval', 'un train', 'Papa lave son char dans l’entrée.'],
  ['une piasse', 'un dollar', 'un sou', 'un billet de cent dollars', 'Ce crayon coûte une piasse.'],
  ['une cenne', 'un sou, un cent', 'un dollar', 'un billet', 'Je n’ai plus une cenne dans ma tirelire.'],
  ['magasiner', 'faire les magasins', 'faire le ménage', 'faire la cuisine', 'Samedi, nous allons magasiner des bottes.'],
  ['placoter', 'bavarder', 'pleurer', 'courir', 'Les voisines placotent sur le balcon.'],
  ['jaser', 'discuter, parler', 'manger', 'dormir', 'Nous avons jasé toute la soirée.'],
  ['niaiser', 'taquiner, faire des niaiseries', 'travailler fort', 'se dépêcher', 'Arrête de niaiser ton frère!'],
  ['achaler', 'déranger, agacer', 'aider', 'consoler', 'Ce maringouin n’arrête pas de m’achaler.'],
  ['un maringouin', 'un moustique', 'un oiseau', 'un papillon', 'Un maringouin m’a piqué au bras.'],
  ['garrocher', 'lancer, jeter', 'attraper', 'cacher', 'Ne garroche pas tes souliers dans l’entrée!'],
  ['se tirailler', 'se chamailler pour jouer', 'se coiffer', 's’endormir', 'Les chiots se tiraillent dans le gazon.'],
  ['capoter', 'être très excité ou énervé', 'être très calme', 'être fatigué', 'Quand elle a vu son cadeau, Mia a capoté!'],
  ['écornifler', 'regarder par curiosité, espionner', 'nettoyer', 'chanter', 'Arrête d’écornifler dans mon journal intime!'],
  ['une collation', 'un petit goûter entre les repas', 'un gros repas', 'un dessert de fête', 'À la récré, je mange une pomme pour ma collation.'],
  ['un bleuet', 'une petite baie bleue (myrtille)', 'un oiseau bleu', 'une fleur bleue', 'Au Lac-Saint-Jean, on cueille des bleuets.'],
  ['une sacoche', 'un sac à main', 'une poche de pantalon', 'un sac de couchage', 'Grand-maman cherche ses clés dans sa sacoche.'],
  ['s’enfarger', 'trébucher', 's’habiller', 'se fâcher', 'Je me suis enfargé dans mes lacets.'],
  ['être fin', 'être gentil', 'être mince', 'être fini', 'Merci, tu es bien fin de m’aider!', 1],
  ['c’est plate', 'c’est ennuyeux', 'c’est plat comme une crêpe', 'c’est très drôle', 'Il pleut et on ne peut pas sortir : c’est plate!', 1],
  ['être tanné', 'en avoir assez', 'être bronzé', 'être très content', 'Je suis tanné de ranger ma chambre!', 1],
  ['il fait frette', 'il fait très froid', 'il fait très chaud', 'il pleut', 'Mets tes mitaines, il fait frette dehors!', 1],
  ['avoir de la misère', 'avoir de la difficulté', 'être très pauvre', 'avoir faim', 'J’ai de la misère avec mes problèmes de maths.', 1],
  ['avoir la chienne', 'avoir peur', 'avoir un chien', 'avoir froid', 'J’ai eu la chienne quand la porte a claqué.', 1],
  ['attache ta tuque', 'prépare-toi, ça va aller vite', 'mets ton chapeau', 'il fait froid', 'Attache ta tuque : la glissade est très rapide!', 1],
  ['se faire passer un sapin', 'se faire tromper', 'recevoir un arbre de Noël', 'se perdre dans la forêt', 'On m’a vendu un jouet brisé : je me suis fait passer un sapin!', 1],
  ['cogner des clous', 's’endormir assis', 'planter des clous', 'travailler fort', 'Après le souper, grand-papa cogne des clous devant la télé.', 1],
  ['être aux oiseaux', 'être très content', 'regarder les oiseaux', 'avoir peur des oiseaux', 'Le jour de sa fête, Léa était aux oiseaux.', 1],
  ['lâche pas!', 'continue, n’abandonne pas!', 'laisse tomber!', 'arrête tout!', 'Lâche pas, tu vas réussir ton saut!', 1],
  ['c’est de valeur', 'c’est dommage', 'ça coûte cher', 'c’est précieux', 'Tu ne peux pas venir à la fête? C’est de valeur!', 1],
  ['être dans les patates', 'se tromper complètement', 'cuisiner des patates', 'être au jardin', 'Ta réponse est dans les patates : relis la question!', 1],
  ['il pleut à boire debout', 'il pleut très fort', 'il fait très soif', 'il pleut un peu', 'Prends ton parapluie, il pleut à boire debout!', 1],
  ['faire la baboune', 'bouder', 'faire des grimaces drôles', 'chanter', 'Ne fais pas la baboune, on jouera demain!', 1],
  ['se tirer une bûche', 's’asseoir', 'aller chercher du bois', 'partir vite', 'Bonjour! Entre et tire-toi une bûche.', 1],
  ['en avoir plein son casque', 'en avoir assez', 'porter un casque', 'être très content', 'Après trois heures de route, j’en avais plein mon casque.', 1],
  ['ça a pas d’allure', 'ça n’a pas de sens', 'ça va trop vite', 'c’est très beau', 'Mettre des sandales dans la neige, ça a pas d’allure!', 1],
  ['être vite sur ses patins', 'réagir rapidement', 'patiner vite', 'être en retard', 'Le gardien de but est vite sur ses patins.', 1],
  ['tiguidou', 'parfait, d’accord', 'au revoir', 'attention', 'On se retrouve au parc à deux heures? Tiguidou!', 1],
  ['prendre une marche', 'faire une promenade', 'monter un escalier', 'acheter quelque chose', 'Après le souper, on prend une marche dans le quartier.', 1],
  ['il mouille', 'il pleut', 'il neige', 'il fait soleil', 'Prends tes bottes de pluie, il mouille!', 1],
  ['être en beau fusil', 'être très fâché', 'avoir un beau jouet', 'être très content', 'Maman était en beau fusil quand elle a vu le dégât.', 1],
];
const QW = QC.filter((x) => !x[5]);
function qcMean(R) {
  const e = R.pick(QW);
  return ch(`f37-m-${e[0]}`, `Au Québec, que veut dire ${q3(e[0])}?`, e[1], [e[2], e[3]], { n: 3, stimulus: e[0], tip: `${cap(e[0])}, au Québec, c’est ${e[1]}.` });
}
function qcReverse(R) {
  const e = R.pick(QW), wr = R.sample(QW.filter((x) => x !== e && x[1] !== e[1]), 2).map((x) => x[0]);
  return ch(`f37-r-${e[0]}`, `Quel mot d’ici veut dire : ${e[1]}?`, e[0], wr, { n: 3, tip: `${cap(e[1])}, au Québec, on dit souvent ${q3(e[0])}.` });
}
function qcCtx(R, level) {
  const e = R.pick(QC), n = level === 3 ? 4 : 3;
  const wr = level === 3 ? [e[2], e[3], R.pick(QC.filter((x) => x !== e && x[1] !== e[1]))[1]] : [e[2], e[3]];
  return ch(`f37-c${n}-${e[0]}`, `Dans cette phrase, que veut dire ${q3(e[0])}?`, e[1], wr, { stimulus: e[4], n, say: fx(e[4]),
    tip: `Lis toute la phrase pour deviner le sens. Ici, ${q3(e[0])} veut dire : ${e[1]}.` });
}
function qcHand(R) {
  const e = R.pick(QC.filter((x) => x[5]));
  return ans(`f37-h-${e[0]}`, `Explique avec tes mots ce que veut dire ${q3(e[0])}.`, e[4],
    `L’enfant explique le sens de l’expression québécoise « ${e[0]} » : ${e[1]}. Toute formulation équivalente est bonne (une phrase courte suffit). L’orthographe compte peu.`,
    `${cap(e[0])} veut dire : ${e[1]}.`, 1);
}

/* =============================================================================
   g3f38 — Ordre alphabétique et dictionnaire
   ============================================================================= */
const nrm = (w) => w.normalize('NFD').replace(/\p{M}/gu, '').replace(/œ/g, 'oe').replace(/[’'\- ]/g, '').toLowerCase();
const cmp = (a, b) => (nrm(a) < nrm(b) ? -1 : nrm(a) > nrm(b) ? 1 : 0);
const simple = (w) => /^[a-zàâçéèêëîïôûùüœ]{3,}$/.test(w);
const POOL3 = [...new Set(G3.map((x) => x.w).filter(simple))];
const POOLALL = [...new Set(['g1', 'g2', 'g3'].flatMap((g) => MEQ[g].map((x) => x.w)).filter(simple))];
const uniqBy = (arr, f) => { const m = new Map(); for (const w of arr) if (!m.has(f(w))) m.set(f(w), w); return [...m.values()]; };
const groupBy = (arr, f) => { const m = new Map(); for (const w of arr) { const k = f(w); if (!m.has(k)) m.set(k, []); m.get(k).push(w); } return m; };
const G1L = groupBy(POOL3, (w) => nrm(w)[0]);
const G2L = [...groupBy(POOLALL, (w) => nrm(w)[0]).values()].filter((g) => new Set(g.map((w) => nrm(w)[1])).size >= 4);
const G3L = [...groupBy(POOLALL, (w) => nrm(w).slice(0, 2)).values()].filter((g) => new Set(g.map((w) => nrm(w)[2])).size >= 3);
const ORD_P = { 1: 'Place les mots dans l’ordre alphabétique (regarde la 1re lettre).', 2: 'Place les mots dans l’ordre alphabétique (regarde la 2e lettre).', 3: 'Place les mots dans l’ordre alphabétique (regarde la 3e lettre).' };
function alphaOrder(R, level) {
  let ws;
  if (level === 1) ws = R.sample([...G1L.keys()], 4).map((k) => R.pick(G1L.get(k)));
  else if (level === 2) ws = R.sample(uniqBy(R.shuffle(R.pick(G2L)), (w) => nrm(w)[1]), 4);
  else { const g = uniqBy(R.shuffle(R.pick(G3L)), (w) => nrm(w)[2]); ws = R.sample(g, Math.min(4, g.length)); }
  const sorted = ws.slice().sort(cmp);
  const k = level;
  return ord(`f38-o${level}-${sorted.join(',')}`, ORD_P[level], sorted, {
    tip: k === 1 ? 'Regarde la 1re lettre de chaque mot et suis l’alphabet : a, b, c, d…' : `Les mots commencent pareil : compare la ${k}e lettre. Ordre : ${sorted.join(', ')}.` });
}
function alphaFirst(R) {
  const ws = R.sample([...G1L.keys()], 3).map((k) => R.pick(G1L.get(k))), last = R.chance(0.4);
  const s = ws.slice().sort(cmp), right = last ? s[2] : s[0];
  return ch(`f38-p${last ? 'z' : 'a'}-${s.join(',')}`, last ? 'Quel mot vient en DERNIER dans le dictionnaire?' : 'Quel mot vient en PREMIER dans le dictionnaire?', right, ws.filter((w) => w !== right), { n: 3,
    tip: `Compare la 1re lettre : ${s.map((w) => `${w[0]} (${w})`).join(', ')}.` });
}
// classes : n. m. / n. f. / v. / adj. / adv.
const ABR = { 'n.m': 'n. m.', 'n.f': 'n. f.', v: 'v.', adj: 'adj.', adv: 'adv.' };
const ABR_LONG = { 'n. m.': 'nom masculin', 'n. f.': 'nom féminin', 'v.': 'verbe', 'adj.': 'adjectif', 'adv.': 'adverbe' };
const CLASSED = G3.filter((x) => typeof x.c === 'string' && simple(x.w)).map((x) => ({ w: x.w, a: x.c === 'n' ? (x.g === 'm' ? 'n. m.' : x.g === 'f' ? 'n. f.' : null) : ABR[x.c] || null })).filter((x) => x.a);
// mots qui ont plusieurs classes courantes (ex. « ferme » nom et adjectif) : exclus, pour qu’une seule réponse soit bonne
const MULTI = new Set(['ferme', 'droit', 'droite', 'bas', 'haut', 'mal', 'bien', 'tour', 'moyen', 'souper', 'son', 'rond', 'sec', 'riche', 'jeune', 'court', 'clair', 'or',
  'ensemble', 'demain', 'dehors', 'dedans', 'méchant', 'neuf', 'certain', 'meilleur', 'fixe', 'salut', 'fou', 'cours', 'rire', 'pile', 'bonjour', 'bonsoir', 'part', 'mine', 'devoir']);
const CLW = CLASSED.filter((x) => !MULTI.has(x.w) && G3.filter((y) => y.w === x.w).length === 1);
function abbr(R, level) {
  const e = R.pick(CLW), n = level === 1 ? 3 : 4;
  const wr = R.shuffle(Object.keys(ABR_LONG).filter((a) => a !== e.a));
  return ch(`f38-a${n}-${e.w}`, `Dans le dictionnaire, quelle abréviation suit le mot ${q3(e.w)}?`, e.a, wr, { stimulus: e.w, n,
    tip: `${q3(e.w)} est un ${ABR_LONG[e.a]} : on écrit « ${e.a} ». (n. = nom, m. = masculin, f. = féminin, v. = verbe, adj. = adjectif, adv. = adverbe)` });
}
// mot-vedette : [forme, mot à chercher, faux]
const MV2 = [['chevaux', 'cheval', 'chevau'], ['journaux', 'journal', 'journau'], ['animaux', 'animal', 'animau'], ['hôpitaux', 'hôpital', 'hôpitau'], ['yeux', 'œil', 'yeu'],
  ['belles', 'beau', 'belle'], ['genoux', 'genou', 'genous'], ['bijoux', 'bijou', 'bijous'], ['gentilles', 'gentil', 'gentille'],
  ['fières', 'fier', 'fière'], ['sèches', 'sec', 'sèche'], ['douces', 'doux', 'douce'], ['grosses', 'gros', 'grosse'],
  ['vieilles', 'vieux', 'vieille'], ['folle', 'fou', 'foll'], ['neuves', 'neuf', 'neuve'], ['ouvertes', 'ouvert', 'ouverte'], ['meilleures', 'meilleur', 'meilleure'],
  ['épaisses', 'épais', 'épaisse'], ['brutaux', 'brutal', 'brutau'], ['travaux', 'travail', 'travau'], ['bonshommes', 'bonhomme', 'bonshomme'], ['morceaux', 'morceau', 'morceaus'],
  ['voisines', 'voisin', 'voisine'], ['chasseuses', 'chasseur', 'chasseuse'], ['amoureuses', 'amoureux', 'amoureuse'], ['certaines', 'certain', 'certaine'],
  ['fraîches', 'frais', 'fraîche'], ['prochaines', 'prochain', 'prochaine'], ['courtes', 'court', 'courte'], ['mauvaises', 'mauvais', 'mauvaise'], ['métaux', 'métal', 'métau'],
  ['cadeaux', 'cadeau', 'cadeaus'], ['ruisseaux', 'ruisseau', 'ruisseaus'], ['agneaux', 'agneau', 'agneaus'], ['châteaux', 'château', 'châteaus'], ['clés', 'clé', 'clés'],
];
const MV3 = [['finissons', 'finir', 'finisser'], ['mangeait', 'manger', 'mangeai'], ['allons', 'aller', 'allonner'], ['sont', 'être', 'sonter'], ['vont', 'aller', 'vonter'],
  ['disent', 'dire', 'disenter'], ['prenaient', 'prendre', 'prener'], ['peut', 'pouvoir', 'peuvoir'], ['veulent', 'vouloir', 'veuler'],
  ['viendra', 'venir', 'viendre'], ['voyais', 'voir', 'voyer'], ['courons', 'courir', 'courer'], ['écrivait', 'écrire', 'écriver'], ['ai', 'avoir', 'aier'],
  ['es', 'être', 'eser'], ['irons', 'aller', 'irer'], ['serons', 'être', 'serer'], ['aurons', 'avoir', 'aurer'], ['choisissent', 'choisir', 'choisisser'],
  ['grandissait', 'grandir', 'grandisser'], ['boivent', 'boire', 'boiver'], ['croyait', 'croire', 'croyer'], ['descendra', 'descendre', 'descender'], ['apprennent', 'apprendre', 'apprenner'],
  ['reçoit', 'recevoir', 'reçoire'], ['pleut', 'pleuvoir', 'pleuter'], ['meurt', 'mourir', 'meurer'], ['offrons', 'offrir', 'offrer'], ['sentait', 'sentir', 'senter'],
  ['jette', 'jeter', 'jetter'], ['achète', 'acheter', 'achèter'], ['préfère', 'préférer', 'préfèrer'], ['rappelle', 'rappeler', 'rappeller'], ['comprenez', 'comprendre', 'comprener'],
  ['remplissait', 'remplir', 'remplisser'], ['vivons', 'vivre', 'viver'], ['battent', 'battre', 'batter'], ['découvrent', 'découvrir', 'découvrer'], ['tiennent', 'tenir', 'tiendre'],
];
function vedette(R, level) {
  const [f, b, x] = R.pick(level === 3 ? MV3 : MV2);
  const wr = [f, x].filter((w) => w !== b);
  return ch(`f38-v-${f}`, `Pour trouver ${q3(f)} dans le dictionnaire, quel mot cherches-tu?`, b, wr, { stimulus: f, n: 3,
    tip: level === 3 ? `Un verbe se cherche à l’infinitif : ${q3(f)} → ${q3(b)}.` : `On cherche la forme de base (masculin singulier) : ${q3(f)} → ${q3(b)}.` });
}
const REP = ['Sur une page avant', 'Sur cette page', 'Sur une page après'];
function reperes(R, level) {
  let pick;
  if (level === 3) { const g = uniqBy(R.shuffle(R.pick(G2L)), (w) => nrm(w).slice(0, 3)); pick = R.sample(g, 3); }
  else pick = R.sample(uniqBy(POOL3, (w) => nrm(w).slice(0, 2)), 3);
  const s = pick.sort(cmp), c = R.int(0, 2);
  const [A, B, X] = c === 1 ? [s[0], s[2], s[1]] : c === 0 ? [s[1], s[2], s[0]] : [s[0], s[1], s[2]];
  return { type: 'choice', key: `f38-r-${A}-${B}-${X}`, prompt: `Les mots-repères de la page sont ${q3(A)} et ${q3(B)}. Où se trouve le mot ${q3(X)}?`,
    say: fx(`Les mots-repères de la page sont « ${A} » et « ${B} ». Où se trouve le mot « ${X} »?`), stimulus: { text: `${A}  …  ${B}\n\n🔎 ${X}` },
    fixedOrder: true, options: REP.map((text) => ({ text })), answer: c,
    tip: `Les mots-repères montrent le premier et le dernier mot de la page. Dans l’ordre : ${s.join(', ')}.` };
}
// articles de dictionnaire : [mot, classe, [sens…], [[phrase, sens]…]]
const DEF = [
  ['glace', 'n. f.', ['eau gelée et dure', 'miroir'], [['Les enfants patinent sur la glace du lac.', 0], ['La princesse se regarde dans la glace.', 1], ['Attention, il y a de la glace sur le trottoir!', 0]]],
  ['feuille', 'n. f.', ['partie plate et verte d’une plante', 'morceau de papier'], [['En automne, les feuilles tombent des érables.', 0], ['Écris ton nom en haut de la feuille.', 1], ['La chenille grignote une feuille de chou.', 0]]],
  ['pièce', 'n. f.', ['partie d’une maison', 'morceau de métal qui sert d’argent', 'morceau d’un casse-tête'], [['Notre appartement a cinq pièces.', 0], ['J’ai trouvé une pièce de deux dollars.', 1], ['Il manque une pièce à mon casse-tête.', 2]]],
  ['tour', 'n. m.', ['moment où c’est à quelqu’un de jouer', 'promenade autour d’un endroit'], [['C’est ton tour de lancer le dé.', 0], ['Nous avons fait le tour du lac à vélo.', 1], ['Attends ton tour avant de parler.', 0]]],
  ['fil', 'n. m.', ['brin très mince pour coudre', 'câble qui transporte l’électricité'], [['Grand-maman coud un bouton avec du fil.', 0], ['Ne tire pas sur le fil de la lampe!', 1]]],
  ['pile', 'n. f.', ['tas d’objets les uns sur les autres', 'petit objet qui donne de l’électricité'], [['Une pile de livres est sur mon bureau.', 0], ['Ma lampe de poche a besoin d’une pile neuve.', 1], ['Range la pile de chandails dans le tiroir.', 0]]],
  ['point', 'n. m.', ['signe qui termine une phrase', 'unité pour compter le score'], [['N’oublie pas le point à la fin de ta phrase.', 0], ['Notre équipe a gagné par un point.', 1]]],
  ['cours', 'n. m.', ['leçon donnée par un enseignant', 'chemin que suit une rivière'], [['Le cours de musique a lieu le mardi.', 0], ['Le canot suit le cours de la rivière.', 1]]],
  ['bas', 'n. m.', ['chaussette (au Québec)', 'partie la plus basse d’une chose'], [['Mets des bas de laine dans tes bottes.', 0], ['Le chat dort en bas de l’escalier.', 1], ['Mes bas sont troués.', 0]]],
  ['carte', 'n. f.', ['dessin d’un pays ou d’une région', 'petit carton pour jouer', 'carton illustré qu’on envoie pour une fête'], [['Regarde la carte du Québec.', 0], ['On joue aux cartes avec grand-papa.', 1], ['J’ai écrit une carte de fête à mon amie.', 2]]],
  ['lettre', 'n. f.', ['signe de l’alphabet', 'message écrit envoyé à quelqu’un'], [['Le mot « chat » a quatre lettres.', 0], ['J’ai reçu une lettre de ma cousine.', 1]]],
  ['rayon', 'n. m.', ['ligne de lumière', 'étagère dans un magasin'], [['Un rayon de soleil entre par la fenêtre.', 0], ['Les céréales sont dans le rayon trois.', 1]]],
  ['bureau', 'n. m.', ['table de travail', 'endroit où l’on travaille'], [['Mon bureau est plein de crayons.', 0], ['Maman part au bureau à huit heures.', 1]]],
  ['souris', 'n. f.', ['petit rongeur', 'objet qui fait bouger la flèche d’un ordinateur'], [['Le chat court après une souris.', 0], ['Clique avec la souris pour ouvrir le jeu.', 1]]],
  ['note', 'n. f.', ['son de musique', 'résultat d’un travail', 'petit message écrit'], [['Le piano joue une note aiguë.', 0], ['J’ai eu une bonne note en dictée.', 1], ['Papa m’a laissé une note sur le frigo.', 2]]],
  ['règle', 'n. f.', ['outil pour tracer des lignes droites', 'ce qu’on doit respecter dans un jeu'], [['Trace une ligne avec ta règle.', 0], ['Explique-moi les règles du jeu.', 1]]],
  ['queue', 'n. f.', ['partie au bout du corps d’un animal', 'file de personnes qui attendent'], [['Le chien remue la queue.', 0], ['Il y a une longue queue devant le cinéma.', 1]]],
  ['vol', 'n. m.', ['déplacement dans les airs', 'action de prendre ce qui n’est pas à soi'], [['Le vol des oies dans le ciel annonce l’automne.', 0], ['Le policier enquête sur le vol d’un vélo.', 1]]],
  ['table', 'n. f.', ['meuble avec un dessus plat et des pattes', 'liste de calculs à apprendre'], [['Mets les assiettes sur la table.', 0], ['J’apprends la table de multiplication de 2.', 1]]],
  ['chaîne', 'n. f.', ['suite d’anneaux de métal', 'poste de télévision'], [['La chaîne de mon vélo a déraillé.', 0], ['Sur quelle chaîne passe ton émission?', 1]]],
  ['mine', 'n. f.', ['partie du crayon qui écrit', 'air du visage'], [['La mine de mon crayon est cassée.', 0], ['Tu as bonne mine après tes vacances!', 1]]],
  ['droit', 'n. m.', ['permission de faire quelque chose', 'études pour devenir avocat'], [['Tu as le droit de jouer après tes devoirs.', 0], ['Ma cousine étudie le droit à l’université.', 1]]],
  ['part', 'n. f.', ['morceau d’une chose qu’on partage', 'au nom de quelqu’un (de la part de)'], [['Veux-tu une part de gâteau?', 0], ['Dis bonjour à ta mère de ma part.', 1]]],
  ['avocat', 'n. m.', ['fruit vert à la chair tendre', 'personne qui défend les gens devant le juge'], [['Papa coupe un avocat pour le guacamole.', 0], ['L’avocat parle au juge.', 1]]],
  ['classe', 'n. f.', ['groupe d’élèves', 'salle où les élèves apprennent'], [['Toute la classe est allée au musée.', 0], ['La classe sent la peinture fraîche.', 1]]],
  ['patte', 'n. f.', ['jambe d’un animal', 'pied d’un meuble'], [['Le chien s’est blessé à la patte.', 0], ['Une patte de la chaise est cassée.', 1]]],
];
const DEFQ = DEF.flatMap(([w, c, d, ss]) => ss.map(([s, k]) => ({ w, c, d, s, k })));
function defCtx(R) {
  const e = R.pick(DEFQ);
  const art = `${e.w} ${e.c}\n${e.d.map((x, i) => `${i + 1}. ${x}`).join('\n')}\n\n« ${e.s} »`;
  return ch(`f38-d-${e.s}`, `Lis l’article du dictionnaire. Quel sens a ${q3(e.w)} dans la phrase?`, e.d[e.k], e.d.filter((_, i) => i !== e.k), { stimulus: art, n: 3, say: fx(e.s),
    tip: `Essaie chaque sens dans la phrase : seul « ${e.d[e.k]} » a du sens ici.` });
}

/* =============================================================================
   Unités
   ============================================================================= */
export const units = [
  unit('g3f33', '🌳', 'Les familles de mots', 'Word families',
    'Vocabulaire — familles de mots : reconnaître les mots de même famille, trouver le mot de base, distinguer les sosies',
    { 1: [famSame, famSame, famSort2], 2: [famIntrus, famIntrus, famSort3, famSame], 3: [famBase, famSame, famHand, famBase] }),
  unit('g3f34', '🧱', 'Préfixes et suffixes', 'Prefixes and suffixes',
    'Vocabulaire — formation des mots : préfixes (re-, dé-, in-/im-) et suffixes (-eur/-euse, -ette, -ier/-ière, -able, -ment)',
    { 1: [affMeaning, affMeaning, affLabel], 2: [affBuild, affBuild, affPick, affPick], 3: [affTrue, affSort, affMeaning, affIm, affPick] }),
  unit('g3f35', '⚖️', 'Synonymes et antonymes', 'Synonyms and antonyms',
    'Vocabulaire — synonymes et antonymes en contexte, intensité des mots (nuances)',
    { 1: [synCtx, antPair, antPair], 2: [synCtx, antCtx, scaleOrder, scaleMost], 3: [nuance, nuance, scaleOrder, scaleMost, antCtx] }),
  unit('g3f36', '🎭', 'Sens propre, sens figuré', 'Literal and figurative meaning',
    'Vocabulaire — sens propre et sens figuré, expressions imagées',
    { 1: [pfWhich], 2: [figMean, figMean, pfSort, pfWhich], 3: [figFind, figReverse, figMean] }),
  unit('g3f37', '🍁', 'Mots et expressions du Québec', 'Québec words and expressions',
    'Vocabulaire — variétés de langue : mots et expressions québécoises, registre familier et courant',
    { 1: [qcMean, qcReverse], 2: [qcCtx, qcCtx, qcReverse], 3: [qcCtx, qcHand] }),
  unit('g3f38', '📕', 'Ordre alphabétique et dictionnaire', 'Alphabetical order and dictionary',
    'Vocabulaire — utilisation du dictionnaire : ordre alphabétique, mot-vedette, mots-repères, abréviations, choix du sens',
    { 1: [alphaOrder, alphaOrder, alphaFirst, abbr], 2: [alphaOrder, alphaOrder, vedette, reperes, abbr], 3: [alphaOrder, vedette, reperes, defCtx, defCtx] }),
];
