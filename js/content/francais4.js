// Petit Hibou — « Mes mots de la semaine » : le cahier « Semaines » de la classe (2e année, Québec).
// Un bloc = 3 semaines : mots de chaque semaine (⛓ = mot « menotté » à apprendre par cœur, * = orthographe spéciale),
// une règle d'orthographe, un verbe au présent et 3 « sons à l'étude » (mots extraterrestres, vrais mots, phrases).
// Semaines 1 à 26 : transcrites des photos du cahier. Semaines 27 à 35 : proposées (`proposed: true`), mots tirés de la
// liste orthographique du MEQ (2e année) pas encore vus. Sons non photographiés : choisis (`inferred: true`).
// Phrases, dictées et mots extraterrestres : originaux (pas copiés du cahier).
// Unités f19 → f30 (une par bloc). Facile = lire/reconnaître, Moyen = écrire/règle/verbe, Difficile = dictée + « écris 2 autres mots ».
import { MEQ } from './meq-liste.js';

const FR = 'fr-CA';
const say = (text) => ({ text, lang: FR });
const hand = (o) => ({ type: 'hand', lang: 'fr', ...o });

/* ------------------------------------------------------------------ */
/*  Les verbes au présent                                              */
/* ------------------------------------------------------------------ */
const VERBS = {
  avoir: ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
  être: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
  aimer: ['aime', 'aimes', 'aime', 'aimons', 'aimez', 'aiment'],
  aller: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'],
  dire: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'],
  faire: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'],
  prendre: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'],
  vouloir: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'],
  pouvoir: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'],
};
const PRONOUNS = [['je', 0], ['tu', 1], ['il', 2], ['elle', 2], ['nous', 3], ['vous', 4], ['ils', 5], ['elles', 5]];
const pron = (p, form) => (p === 'je' && /^[aeiouéèêh]/.test(form) ? 'j’' : `${p} `);
export const verbTable = (v) => PRONOUNS.filter(([p]) => p !== 'elle' && p !== 'elles').map(([p, i]) => `${pron(p, VERBS[v][i])}${VERBS[v][i]}`);

/* ------------------------------------------------------------------ */
/*  Les sons à l'étude                                                 */
/*  pseudo : mots extraterrestres, le son entre crochets ; near : sons voisins pour les faux choix          */
/*  has(w) : le mot contient-il ce son? (sert à choisir des intrus sûrs)                                 */
/* ------------------------------------------------------------------ */
const V = 'aeiouyéèêâîôûàù';
const reHas = (re) => (w) => re.test(w.toLowerCase());
const strip = (w, re) => w.toLowerCase().replace(re, '_');
export const SOUNDS = {
  un: { label: 'un', ex: 'parfum', has: (w) => /u[nm](?![aeiouyéèên])/.test(strip(w, /[qg]u/g)),
    words: ['lundi', 'cajun', 'aucun', 'brun', 'quelqu’un', 'jungle'],
    pseudo: ['b[un]tal', 'l[un]sa', 'm[un]or', 't[un]cri', 'd[un]ipo', 'f[un]da'], near: ['on', 'an'],
    sentences: [['Lundi, je vais au parc.', 'Lundi'], ['Mon chien est tout brun.', 'brun'], ['Aucun ami ne dort.', 'Aucun']],
    accept: ['un', 'lundi', 'brun', 'aucun', 'chacun', 'parfum', 'quelqu’un', 'emprunter', 'humble', 'défunt'] },
  oi: { label: 'oi', ex: 'roi', has: (w) => /oi(?!n)|oy/.test(w.toLowerCase()),
    words: ['voiture', 'poire', 'froid', 'doigt', 'noir', 'étoile'],
    pseudo: ['t[oi]ba', 'm[oi]lu', 'f[oi]ri', 'z[oi]pa', 'l[oi]set', 'ch[oi]mi'], near: ['o', 'ou'],
    sentences: [['Le roi a un chat noir.', 'noir'], ['Il fait froid ce matin.', 'froid'], ['Je mange une poire.', 'poire']],
    accept: ['roi', 'moi', 'toi', 'soir', 'boire', 'poisson', 'oiseau', 'mois', 'bois', 'voir', 'trois', 'soif', 'armoire', 'histoire', 'noix', 'voix', 'toit', 'quoi', 'pourquoi', 'mouchoir', 'miroir', 'patinoire', 'framboise', 'joie', 'oie', 'étoile', 'poire', 'noir', 'froid', 'doigt', 'voiture'] },
  oin: { label: 'oin', ex: 'témoin', has: reHas(/oin|ouin/),
    words: ['loin', 'coin', 'foin', 'point', 'besoin', 'soin'],
    pseudo: ['m[oin]da', 't[oin]li', 'b[oin]lu', 'l[oin]ré', 'ch[oin]ba', 'v[oin]sé'], near: ['oi', 'on'],
    sentences: [['Le chat dort dans le coin.', 'coin'], ['La forêt est loin.', 'loin'], ['Le cheval mange du foin.', 'foin']],
    accept: ['loin', 'coin', 'foin', 'point', 'besoin', 'soin', 'pingouin', 'moins', 'poing', 'témoin', 'rejoindre', 'joindre', 'pointu', 'coincé', 'marsouin', 'lointain', 'shampoing'] },
  in: { label: 'in', ex: 'sapin', has: (w) => /i[nm](?![aeiouyéèên])/.test(strip(w, /[aeo]i[nm]/g)),
    words: ['timbre', 'pince', 'simple', 'raisin', 'lapin', 'prince'],
    pseudo: ['p[in]da', 'r[in]tu', 'f[in]lo', 'm[im]pa', 's[im]po', 'v[in]tal'], near: ['an', 'on'],
    sentences: [['Le lapin mange une carotte.', 'lapin'], ['Le prince a un chapeau.', 'prince'], ['J’aime le jus de raisin.', 'raisin']],
    accept: ['vin', 'fin', 'matin', 'sapin', 'jardin', 'chemin', 'moulin', 'singe', 'linge', 'cinq', 'quinze', 'dinde', 'dessin', 'cousin', 'voisin', 'requin', 'lapin', 'prince', 'timbre', 'simple', 'pince', 'raisin', 'impossible', 'important', 'imprimer', 'mince', 'lutin', 'patin'] },
  ain: { label: 'ain', ex: 'main', inferred: true, has: reHas(/a[in][nm](?![aeiouyéèên])|aim(?![aeiouyéèên])/),
    words: ['pain', 'train', 'demain', 'bain', 'faim', 'copain'],
    pseudo: ['s[ain]do', 'm[ain]po', 't[ain]lu', 'fr[ain]é', 'g[ain]di', 'v[aim]bo'], near: ['an', 'on'],
    sentences: [['Je mange du pain.', 'pain'], ['Le train arrive.', 'train'], ['Mon copain joue avec moi.', 'copain']],
    accept: ['main', 'pain', 'train', 'bain', 'faim', 'demain', 'copain', 'grain', 'nain', 'terrain', 'maintenant', 'humain', 'parrain', 'refrain', 'vilain', 'poulain', 'essaim', 'certain', 'prochain', 'craindre'] },
  ein: { label: 'ein', ex: 'rein', inferred: true, has: reHas(/e[i][nm](?![aeiouyéèên])/),
    words: ['plein', 'peinture', 'frein', 'ceinture', 'peintre', 'éteindre'],
    pseudo: ['t[ein]do', 'b[ein]la', 'm[ein]su', 'l[ein]du', 'f[ein]ta', 'z[ein]or'], near: ['an', 'on'],
    sentences: [['Mon sac est plein.', 'plein'], ['Le peintre a un chapeau.', 'peintre'], ['J’aime la peinture.', 'peinture']],
    accept: ['plein', 'frein', 'rein', 'peintre', 'peinture', 'ceinture', 'éteindre', 'atteindre', 'teindre', 'teinture', 'serein', 'feinte', 'peindre', 'empreinte'] },
  eu: { label: 'eu', ex: 'jeu', has: (w) => /eu(?!r|il)|œu(?!r)/.test(w.toLowerCase()),
    words: ['yeux', 'cheveux', 'feu', 'pneu', 'bleu', 'queue'],
    pseudo: ['d[eu]lo', 'm[eu]pa', 'f[eu]ti', 's[eu]va', 'r[eu]bi', 'n[eu]zo'], near: ['ou', 'o'],
    sentences: [['Le ciel est bleu.', 'bleu'], ['Papa fait un feu.', 'feu'], ['Le chien remue la queue.', 'queue']],
    accept: ['jeu', 'deux', 'peu', 'feu', 'bleu', 'cheveu', 'neveu', 'lieu', 'jeudi', 'heureux', 'joyeux', 'curieux', 'creux', 'vieux', 'mieux', 'peut', 'veut', 'yeux', 'pneu', 'queue', 'eux', 'nœud', 'vœu', 'Dieu', 'milieu'] },
  eur: { label: 'eur', ex: 'peur', inferred: true, has: reHas(/eur|œur/),
    words: ['fleur', 'couleur', 'chanteur', 'moteur', 'heure', 'beurre'],
    pseudo: ['t[eur]pa', 'm[eur]do', 'z[eur]li', 'b[eur]la', 'p[eur]to', 'g[eur]sa'], near: ['our', 'or'],
    sentences: [['Maman a une fleur.', 'fleur'], ['Il est quelle heure?', 'heure'], ['Je mets du beurre sur le pain.', 'beurre']],
    accept: ['peur', 'sœur', 'cœur', 'fleur', 'heure', 'beurre', 'chaleur', 'docteur', 'coiffeur', 'facteur', 'pêcheur', 'odeur', 'malheur', 'bonheur', 'meilleur', 'leur', 'plusieurs', 'couleur', 'chanteur', 'moteur', 'danseur', 'professeur', 'ordinateur'] },
  œu: { label: 'œu', ex: 'œuf', inferred: true, has: reHas(/œu/),
    words: ['sœur', 'cœur', 'nœud', 'bœuf', 'vœu', 'œuvre'],
    pseudo: ['m[œu]ta', 'd[œu]li', 'f[œu]ro', 'l[œu]pa', 's[œu]bi', 't[œu]na'], near: ['ou', 'o'],
    sentences: [['Ma sœur lit un livre.', 'sœur'], ['Je mange un œuf.', 'œuf'], ['Elle a un nœud dans les cheveux.', 'nœud']],
    accept: ['sœur', 'cœur', 'œuf', 'bœuf', 'nœud', 'vœu', 'œuvre', 'chœur', 'écœurant', 'rancœur'] },
  ou: { label: 'ou', ex: 'chou', inferred: true, has: (w) => /ou(?!i[ln])|où|oû/.test(w.toLowerCase()),
    words: ['loup', 'roue', 'poule', 'hibou', 'genou', 'soupe'],
    pseudo: ['t[ou]mi', 'b[ou]la', 'p[ou]ré', 'm[ou]ti', 'z[ou]ba', 'f[ou]li'], near: ['o', 'u'],
    sentences: [['Le loup court dans la forêt.', 'loup'], ['La poule a un œuf.', 'poule'], ['Je mange de la soupe.', 'soupe']],
    accept: ['tout', 'nous', 'vous', 'sous', 'jour', 'four', 'cou', 'bouche', 'mouton', 'souris', 'rouge', 'poupée', 'chou', 'trou', 'fou', 'doux', 'roux', 'toujours', 'souvent', 'beaucoup', 'loup', 'roue', 'poule', 'hibou', 'genou', 'soupe', 'boule', 'route', 'cour'] },
  on: { label: 'on', ex: 'ballon', inferred: true, has: (w) => /o[n](?![aeiouyéèên])|om(?=[pb])/.test(strip(w, /oin/g)),
    words: ['bonbon', 'mouton', 'pompier', 'ombre', 'maison', 'crayon'],
    pseudo: ['t[on]da', 'l[on]si', 'm[om]pa', 'b[on]ti', 'r[on]fé', 's[on]du'], near: ['an', 'ou'],
    sentences: [['Le pompier a un camion.', 'pompier'], ['Le mouton mange.', 'mouton'], ['J’ai un crayon rouge.', 'crayon']],
    accept: ['bon', 'son', 'mon', 'ton', 'rond', 'pont', 'long', 'avion', 'lion', 'savon', 'mouton', 'garçon', 'poisson', 'maison', 'monde', 'nombre', 'compter', 'tomber', 'ombre', 'montagne', 'oncle', 'pompon', 'citron', 'cochon', 'melon', 'bonbon', 'pompier', 'crayon', 'ballon', 'chanson'] },
  an: { label: 'an', ex: 'éléphant', inferred: true, has: (w) => /[ae]n(?![aeiouyéèên])|[ae]m(?=[pb])/.test(strip(w, /ien|[aeo]in|[aeo]im/g)),
    words: ['maman', 'enfant', 'vent', 'chambre', 'lampe', 'dent'],
    pseudo: ['t[an]do', 'l[am]pi', 'b[en]ta', 'm[an]ru', 's[en]du', 'd[am]pa'], near: ['on', 'ou'],
    sentences: [['Le vent souffle fort.', 'vent'], ['Maman lit dans le salon.', 'Maman'], ['Ma chambre est jolie.', 'chambre']],
    accept: ['an', 'blanc', 'banc', 'grand', 'dans', 'quand', 'gant', 'pantalon', 'éléphant', 'enfant', 'dent', 'vent', 'encore', 'ensemble', 'temps', 'jambe', 'lampe', 'chambre', 'champ', 'tempête', 'novembre', 'décembre', 'maman', 'orange', 'manger', 'chanter', 'tante', 'trente', 'cent', 'pendant'] },
  ill: { label: 'ill', ex: 'fille', inferred: true, has: (w) => /ill/.test(w.toLowerCase()) && !/^(ville|mille|tranquille|village|million|milliard)/.test(w.toLowerCase()),
    words: ['bille', 'famille', 'chenille', 'papillon', 'coquille', 'quille'],
    pseudo: ['t[ill]o', 'p[ill]u', 'r[ill]é', 'n[ill]a', 'd[ill]on', 'fip[ill]e'], near: ['il', 'ir'],
    sentences: [['Le papillon vole.', 'papillon'], ['Ma famille est grande.', 'famille'], ['Je joue aux billes.', 'billes']],
    accept: ['fille', 'bille', 'famille', 'chenille', 'papillon', 'coquille', 'quille', 'gentille', 'cheville', 'aiguille', 'brindille', 'grillon', 'vanille', 'pastille', 'myrtille', 'béquille'] },
  ail: { label: 'ail', ex: 'éventail', inferred: true, has: reHas(/ail/),
    words: ['chandail', 'paille', 'médaille', 'caillou', 'travail', 'bataille'],
    pseudo: ['t[ail]o', 'm[aill]u', 'd[ail]pé', 's[aill]o', 'f[ail]da', 'r[aill]é'], near: ['al', 'oi'],
    sentences: [['Mon chandail est bleu.', 'chandail'], ['Je bois avec une paille.', 'paille'], ['Il y a un caillou dans mon soulier.', 'caillou']],
    accept: ['ail', 'rail', 'corail', 'travail', 'détail', 'éventail', 'épouvantail', 'portail', 'chandail', 'paille', 'taille', 'caille', 'médaille', 'bataille', 'volaille', 'caillou', 'maillot', 'écaille'] },
  eil: { label: 'eil', ex: 'sommeil', inferred: true, has: reHas(/eil/),
    words: ['soleil', 'abeille', 'oreille', 'bouteille', 'réveil', 'orteil'],
    pseudo: ['t[eil]o', 'm[eill]u', 'b[eil]pa', 'r[eill]é', 's[eil]da', 'n[eill]o'], near: ['el', 'al'],
    sentences: [['Le soleil est chaud.', 'soleil'], ['Une abeille vole sur la fleur.', 'abeille'], ['Mon réveil sonne à sept heures.', 'réveil']],
    accept: ['soleil', 'sommeil', 'réveil', 'orteil', 'conseil', 'appareil', 'pareil', 'oreille', 'abeille', 'bouteille', 'corbeille', 'groseille', 'merveille', 'veille', 'vieille', 'corneille', 'oseille'] },
  euil: { label: 'euil', ex: 'feuille', inferred: true, has: reHas(/euil|ueil|œil/),
    words: ['écureuil', 'fauteuil', 'chevreuil', 'portefeuille', 'seuil', 'feuillage'],
    pseudo: ['t[euill]o', 'm[euil]pa', 'r[euill]é', 's[euil]da', 'n[euill]o', 'fl[euil]ou'], near: ['eil', 'oul'],
    sentences: [['La feuille tombe de l’arbre.', 'feuille'], ['Un écureuil mange une noix.', 'écureuil'], ['Papi dort dans son fauteuil.', 'fauteuil']],
    accept: ['feuille', 'écureuil', 'fauteuil', 'chevreuil', 'portefeuille', 'seuil', 'deuil', 'cerfeuil', 'recueil', 'accueil', 'orgueil', 'œil', 'bouvreuil', 'feuillage', 'millefeuille'] },
  ouil: { label: 'ouil', ex: 'grenouille', inferred: true, has: reHas(/ouil/),
    words: ['citrouille', 'nouille', 'brouillard', 'fenouil', 'chatouille', 'rouille'],
    pseudo: ['m[ouill]o', 't[ouil]pa', 'r[ouill]é', 'z[ouill]a', 'b[ouil]da', 'p[ouill]u'], near: ['oul', 'eil'],
    sentences: [['La grenouille saute dans l’eau.', 'grenouille'], ['Il y a une grosse citrouille.', 'citrouille'], ['J’aime la soupe aux nouilles.', 'nouilles']],
    accept: ['grenouille', 'citrouille', 'nouille', 'fenouil', 'brouillard', 'chatouille', 'bouillir', 'bouilloire', 'rouille', 'mouiller', 'gribouiller', 'patrouille', 'fouiller', 'chatouiller', 'bouillon', 'débrouiller', 'quenouille', 'grenouillère'] },
  sz: { label: 'z (écrit s)', ex: 'rose', inferred: true, has: (w) => new RegExp(`[${V}]s[${V}]`).test(w.toLowerCase()) || /z/.test(w.toLowerCase()),
    words: ['maison', 'oiseau', 'cousin', 'chemise', 'valise', 'raisin'],
    pseudo: ['ti[s]a', 'mo[s]o', 'bi[s]é', 'lu[s]i', 'pa[s]ou', 'vo[s]é'], near: ['ss', 'ch'],
    sentences: [['L’oiseau chante.', 'oiseau'], ['Mon cousin a une valise.', 'cousin'], ['Ma chemise est rose.', 'chemise']],
    accept: ['rose', 'maison', 'oiseau', 'cousin', 'cousine', 'chemise', 'valise', 'musique', 'ciseaux', 'raisin', 'voisin', 'vase', 'prison', 'saison', 'église', 'fraise', 'framboise', 'chaise', 'bise', 'cerise', 'phrase', 'amuser', 'plaisir', 'joyeuse', 'heureuse', 'télévision', 'désert', 'case', 'arroser', 'rasoir'] },
  gn: { label: 'gn', ex: 'campagne', has: reHas(/gn/),
    words: ['montagne', 'champignon', 'araignée', 'ligne', 'cygne', 'peigne'],
    pseudo: ['ti[gn]o', 'pa[gn]é', 'mi[gn]u', 'ra[gn]ol', 'bo[gn]i', '[gn]apo'], near: ['n', 'g'],
    sentences: [['La montagne est très haute.', 'montagne'], ['Une araignée monte au mur.', 'araignée'], ['Je trouve un champignon.', 'champignon']],
    accept: ['montagne', 'campagne', 'champignon', 'araignée', 'ligne', 'cygne', 'signe', 'peigne', 'agneau', 'mignon', 'gagner', 'soigner', 'baignoire', 'oignon', 'poignée', 'compagnon', 'châtaigne', 'grognon', 'Espagne', 'signal'] },
  ch: { label: 'ch', ex: 'chat', inferred: true, has: reHas(/ch(?!r)/),
    words: ['cheval', 'chou', 'niche', 'vache', 'chemin', 'mouche'],
    pseudo: ['[ch]alo', 'mi[ch]u', '[ch]éba', 'ta[ch]o', '[ch]ipou', 'rou[ch]a'], near: ['s', 'j'],
    sentences: [['Le chien dort dans sa niche.', 'niche'], ['La vache mange de l’herbe.', 'vache'], ['Le cheval court vite.', 'cheval']],
    accept: ['chat', 'chien', 'chaise', 'chaud', 'chambre', 'chanter', 'chapeau', 'chocolat', 'chou', 'cheval', 'chemin', 'cheveu', 'vache', 'niche', 'mouche', 'bouche', 'poche', 'riche', 'marché', 'chercher', 'dimanche', 'blanche', 'cochon', 'chemise', 'chaussure', 'chandail', 'branche', 'tache', 'ruche', 'cloche'] },
  ph: { label: 'ph', ex: 'photo', inferred: true, has: reHas(/ph|f/),
    words: ['phoque', 'éléphant', 'dauphin', 'téléphone', 'pharmacie', 'alphabet'],
    pseudo: ['[ph]alo', 'ti[ph]u', '[ph]éri', 'mor[ph]a', '[ph]oudi', 'lu[ph]é'], near: ['p', 'ch'],
    sentences: [['Le dauphin saute dans la mer.', 'dauphin'], ['L’éléphant a une trompe.', 'éléphant'], ['Le téléphone sonne.', 'téléphone']],
    accept: ['photo', 'phrase', 'phoque', 'éléphant', 'dauphin', 'téléphone', 'pharmacie', 'alphabet', 'phare', 'orphelin', 'saphir', 'photographe', 'paragraphe', 'géographie', 'pharmacien', 'typhon', 'Sophie', 'Philippe'] },
  è: { label: 'è', ex: 'frère', has: (w) => /è|ê|ai(?!l|[nm](?![aeiouy]))|ei(?!l|n(?![aeiouy]))|e(tt|ll|ss|rr|nn)|est$|et$/.test(w.toLowerCase()),
    words: ['mère', 'fête', 'neige', 'lait', 'forêt', 'rivière'],
    pseudo: ['m[è]to', 'f[ê]li', 't[ai]po', 'n[ei]va', 'l[è]bu', 'b[ai]zo'], near: ['a', 'o'],
    sentences: [['Ma mère boit du lait.', 'mère'], ['Il neige sur la forêt.', 'neige'], ['C’est ma fête demain.', 'fête']],
    accept: ['mère', 'père', 'frère', 'fête', 'tête', 'forêt', 'neige', 'reine', 'lait', 'fraise', 'chaise', 'balai', 'vrai', 'jamais', 'élève', 'rivière', 'chèvre', 'crème', 'zèbre', 'bête', 'fenêtre', 'pêche', 'treize', 'seize', 'baleine', 'laine', 'maison', 'mai'] },
  é: { label: 'é', ex: 'café', inferred: true, has: (w) => /é|er$|ez$|^et$|ed$/.test(w.toLowerCase()),
    words: ['école', 'bébé', 'nez', 'assez', 'rocher', 'fée'],
    pseudo: ['t[é]bo', 'l[é]mi', 'p[é]ru', 'ch[é]li', 'z[é]pa', 'b[é]to'], near: ['a', 'o'],
    sentences: [['Le bébé dort.', 'bébé'], ['Mon nez est froid.', 'nez'], ['La fée a une baguette.', 'fée']],
    accept: ['été', 'école', 'bébé', 'café', 'fée', 'épée', 'clé', 'nez', 'assez', 'chez', 'rocher', 'panier', 'cahier', 'boulanger', 'manger', 'jouer', 'aller', 'léger', 'étoile', 'éléphant', 'télé', 'souper', 'dîner', 'déjeuner', 'pied', 'blé', 'écureuil', 'télévision'] },
  ien: { label: 'ien', ex: 'combien', inferred: true, has: reHas(/ien(?!n)/),
    words: ['chien', 'bien', 'rien', 'gardien', 'magicien', 'musicien'],
    pseudo: ['t[ien]lo', 'r[ien]da', 'm[ien]so', 'l[ien]ti', 'z[ien]fa', 'v[ien]gu'], near: ['ion', 'i'],
    sentences: [['Mon chien est gentil.', 'chien'], ['Le magicien a un lapin.', 'magicien'], ['Je vais très bien.', 'bien']],
    accept: ['chien', 'bien', 'rien', 'mien', 'tien', 'sien', 'lien', 'gardien', 'magicien', 'musicien', 'pharmacien', 'comédien', 'ancien', 'combien', 'viens', 'tiens', 'vient', 'indien', 'mécanicien', 'électricien', 'Julien'] },
  cs: { label: 's (écrit c ou ç)', ex: 'merci', inferred: true, has: reHas(/c[eiy]|ç/),
    words: ['ciel', 'cerise', 'glaçon', 'leçon', 'citron', 'garçon'],
    pseudo: ['[c]ipa', '[c]eru', 'ta[ç]ou', 'mo[c]iba', '[ç]adi', 'ru[c]ela'], near: ['k', 'ch'],
    sentences: [['Le ciel est gris.', 'ciel'], ['Le garçon mange une cerise.', 'garçon'], ['Il y a un glaçon dans mon jus.', 'glaçon']],
    accept: ['ciel', 'cerise', 'glaçon', 'leçon', 'citron', 'garçon', 'cinq', 'cent', 'ici', 'face', 'place', 'glace', 'merci', 'pouce', 'douce', 'cirque', 'cinéma', 'ça', 'façon', 'maçon', 'reçu', 'français', 'cygne', 'bicyclette', 'princesse', 'police', 'pièce', 'décembre'] },
  gj: { label: 'j (écrit g)', ex: 'rouge', inferred: true, has: reHas(/g[eiyéèê]/),
    words: ['girafe', 'genou', 'plage', 'nuage', 'magie', 'gilet'],
    pseudo: ['[g]ilo', '[g]epa', 'ma[g]i', 'ru[g]ita', '[g]élu', 'pa[g]eon'], near: ['gu', 'ch'],
    sentences: [['La girafe a un long cou.', 'girafe'], ['Il y a un nuage gris.', 'nuage'], ['Nous allons à la plage.', 'plage']],
    accept: ['girafe', 'genou', 'gilet', 'magie', 'plage', 'nuage', 'page', 'image', 'orange', 'rouge', 'sage', 'neige', 'singe', 'linge', 'manger', 'nager', 'bouger', 'géant', 'gentil', 'bougie', 'aubergine', 'genou', 'fromage', 'cage', 'gymnase', 'gigot', 'large', 'visage'] },
  gu: { label: 'gu', ex: 'baguette', inferred: true, has: (w) => /gu[eiéèêy]/.test(w.toLowerCase()) || /g[aâouô]|g[lr]/.test(w.toLowerCase()),
    words: ['guitare', 'bague', 'vague', 'guêpe', 'figue', 'langue'],
    pseudo: ['[gu]épa', 'ba[gu]ito', '[gu]idou', 'lo[gu]e', 'fi[gu]eli', '[gu]erpo'], near: ['g', 'k'],
    sentences: [['Papa joue de la guitare.', 'guitare'], ['Une guêpe vole.', 'guêpe'], ['La vague est haute.', 'vague']],
    accept: ['guitare', 'bague', 'vague', 'guêpe', 'figue', 'langue', 'fatigue', 'guirlande', 'guidon', 'guerre', 'longue', 'blague', 'baguette', 'déguiser', 'guenon', 'mangue', 'Guy', 'gâteau', 'garçon', 'gomme', 'goûter', 'légume', 'glace', 'grand', 'gros', 'gris'] },
  au: { label: 'o (au, eau)', ex: 'bateau', inferred: true, has: (w) => /au|o(?![nmiu])|ô/.test(strip(w, /oin|oi|ou|on(?![aeiouy])|om(?=[pb])/g)),
    words: ['chapeau', 'gâteau', 'auto', 'jaune', 'cadeau', 'château'],
    pseudo: ['b[eau]ti', 'm[au]pi', 't[eau]ra', 'l[au]di', 'f[eau]su', '[au]pli'], near: ['ou', 'a'],
    sentences: [['Mon chapeau est jaune.', 'chapeau'], ['Le gâteau est au chocolat.', 'gâteau'], ['Le roi vit dans un château.', 'château']],
    accept: ['eau', 'beau', 'peau', 'veau', 'seau', 'oiseau', 'chapeau', 'bateau', 'gâteau', 'cadeau', 'château', 'tableau', 'rideau', 'manteau', 'couteau', 'bureau', 'auto', 'jaune', 'chaud', 'haut', 'pauvre', 'sauter', 'autobus', 'aussi', 'automne', 'épaule', 'dinosaure', 'restaurant', 'chaussure', 'pot', 'vélo', 'moto', 'photo', 'dos'] },
  x: { label: 'x', ex: 'boxeur', inferred: true, has: reHas(/x(?!$)|xt/),
    words: ['taxi', 'boxe', 'saxophone', 'exemple', 'exercice', 'xylophone'],
    pseudo: ['ta[x]o', 'bo[x]i', 'mi[x]a', 'lu[x]é', 'fi[x]ou', 're[x]a'], near: ['s', 'ch'],
    sentences: [['Le taxi est jaune.', 'taxi'], ['Je joue du xylophone.', 'xylophone'], ['Voici un exemple.', 'exemple']],
    accept: ['taxi', 'boxe', 'saxophone', 'xylophone', 'exemple', 'exercice', 'examen', 'exact', 'luxe', 'fixe', 'texte', 'extraterrestre', 'explorer', 'expliquer', 'excuse', 'excellent', 'axe', 'Alexandre', 'Maxime', 'boxeur', 'relaxer', 'oxygène'] },
  ui: { label: 'ui', ex: 'nuit', inferred: true, has: (w) => /ui/.test(strip(w, /[qg]ui/g)),
    words: ['fruit', 'pluie', 'huit', 'cuisine', 'biscuit', 'minuit'],
    pseudo: ['t[ui]mo', 'l[ui]pa', 'b[ui]ra', 'f[ui]lé', 's[ui]to', 'm[ui]da'], near: ['u', 'ou'],
    sentences: [['Il y a de la pluie.', 'pluie'], ['Je mange un biscuit.', 'biscuit'], ['Papa est dans la cuisine.', 'cuisine']],
    accept: ['fruit', 'nuit', 'pluie', 'huit', 'cuisine', 'biscuit', 'puis', 'depuis', 'suis', 'lui', 'aujourd’hui', 'bruit', 'cuir', 'juin', 'juillet', 'minuit', 'parapluie', 'huile', 'ensuite', 'suivre', 'cuillère', 'truie', 'puits', 'tuile', 'luire'] },
  tion: { label: 'tion', ex: 'attention', inferred: true, has: reHas(/tion/),
    words: ['récréation', 'punition', 'opération', 'collation', 'addition', 'invitation'],
    pseudo: ['ri[tion]', 'pu[tion]', 'dé[tion]', 'fo[tion]', 'mi[tion]', 'lu[tion]'], near: ['ton', 'chon'],
    sentences: [['C’est la récréation!', 'récréation'], ['Je fais une addition.', 'addition'], ['Ma collation est une pomme.', 'collation']],
    accept: ['attention', 'récréation', 'punition', 'opération', 'collation', 'addition', 'soustraction', 'multiplication', 'invitation', 'émotion', 'station', 'natation', 'lotion', 'potion', 'portion', 'solution', 'direction', 'information', 'position', 'imagination', 'explication', 'éducation', 'nation', 'récitation'] },
  oy: { label: 'oy, ay', ex: 'tuyau', inferred: true, has: reHas(/[aou]y/),
    words: ['crayon', 'noyau', 'voyage', 'payer', 'joyeux', 'rayon'],
    pseudo: ['t[oy]a', 'm[ay]é', 'l[oy]u', 'f[ay]i', 'b[oy]é', 's[ay]a'], near: ['o', 'i'],
    sentences: [['J’ai un crayon rouge.', 'crayon'], ['Nous partons en voyage.', 'voyage'], ['La pêche a un gros noyau.', 'noyau']],
    accept: ['crayon', 'noyau', 'voyage', 'tuyau', 'payer', 'joyeux', 'rayon', 'moyen', 'nettoyer', 'essayer', 'balayer', 'aboyer', 'envoyer', 'noyer', 'royal', 'loyal', 'citoyen', 'effrayé', 'frayeur', 'joyeuse', 'voyageur'] },
  ier: { label: 'ier, ière', ex: 'pompier', inferred: true, has: reHas(/ier|ière/),
    words: ['panier', 'cahier', 'escalier', 'rivière', 'lumière', 'première'],
    pseudo: ['tal[ier]', 'mor[ière]', 'fon[ier]', 'pal[ière]', 'gor[ier]', 'sab[ière]'], near: ['er', 'ar'],
    sentences: [['Mon cahier est bleu.', 'cahier'], ['Je monte l’escalier.', 'escalier'], ['La lumière est allumée.', 'lumière']],
    accept: ['panier', 'cahier', 'escalier', 'pommier', 'fermier', 'policier', 'premier', 'dernier', 'hier', 'papier', 'sentier', 'rivière', 'lumière', 'première', 'dernière', 'prière', 'cuisinière', 'sorcière', 'barrière', 'fermière', 'derrière', 'pompier', 'cuisinier', 'pâtissier'] },
  ette: { label: 'è (ette, elle, esse)', ex: 'lunettes', inferred: true, has: reHas(/e(tt|ll|ss|rr|nn)/),
    words: ['chouette', 'assiette', 'bicyclette', 'échelle', 'poubelle', 'princesse'],
    pseudo: ['mor[ette]', 'tab[elle]', 'lou[esse]', 'pir[ette]', 'cab[esse]', 'lub[elle]'], near: [(g) => 'a' + g.slice(1), (g) => 'ou' + g.slice(1)],
    sentences: [['La chouette vole la nuit.', 'chouette'], ['Je monte dans l’échelle.', 'échelle'], ['La princesse a une robe.', 'princesse']],
    accept: ['chouette', 'assiette', 'bicyclette', 'fourchette', 'lunettes', 'trompette', 'baguette', 'échelle', 'poubelle', 'vaisselle', 'belle', 'elle', 'ficelle', 'princesse', 'maîtresse', 'tresse', 'vitesse', 'caresse', 'terre', 'verre', 'pierre', 'guerre', 'antenne', 'cette', 'noisette', 'chaussette', 'casquette', 'sauterelle', 'hirondelle'] },
  inr: { label: 'in (in, im, ain, ein)', ex: 'jardin', inferred: true, has: (w) => /[aeo]?i[nm](?![aeiouyéèên])/.test(strip(w, /oin/g)),
    words: ['matin', 'sapin', 'main', 'peinture', 'timbre', 'train'],
    pseudo: ['l[ain]du', 't[in]so', 'b[ein]ra', 'f[in]da', 'r[ain]to', 's[ein]lu'], near: ['an', 'on'],
    sentences: [['Ce matin, il neige.', 'matin'], ['Le train part à huit heures.', 'train'], ['Il y a un sapin dans le jardin.', 'sapin']],
    accept: ['vin', 'fin', 'matin', 'sapin', 'jardin', 'chemin', 'lapin', 'cinq', 'quinze', 'main', 'pain', 'train', 'bain', 'faim', 'demain', 'copain', 'plein', 'peinture', 'ceinture', 'frein', 'timbre', 'simple', 'impossible', 'important', 'dessin', 'cousin', 'voisin'] },
  k: { label: 'k (k, qu, c)', ex: 'kayak', inferred: true, has: (w) => /k|q|c(?![eiyhç])/.test(w.toLowerCase()),
    words: ['kangourou', 'koala', 'kiwi', 'quille', 'coq', 'requin'],
    pseudo: ['[k]ilu', '[qu]ana', 'to[k]a', 'mi[k]o', '[k]oupa', 'ra[qu]é'], near: ['g', 't'],
    sentences: [['Le kangourou saute.', 'kangourou'], ['Le requin nage vite.', 'requin'], ['Le coq chante le matin.', 'coq']],
    accept: ['kangourou', 'koala', 'kiwi', 'kilo', 'kayak', 'ski', 'quille', 'quatre', 'quand', 'qui', 'requin', 'coq', 'cinq', 'sac', 'lac', 'avec', 'carotte', 'café', 'canard', 'école', 'bouquet', 'musique', 'banque', 'coquille', 'bicyclette', 'cube', 'camion', 'cochon', 'képi', 'karaté'] },
};
const SEEN_NOT_TRANSCRIBED = new Set(['gn', 'è']);    // pages vues sur les photos, contenu écrit par nous

/* ------------------------------------------------------------------ */
/*  Les règles                                                         */
/* ------------------------------------------------------------------ */
// kind: 'gap' (petits mots), 'end' / 'start' / 'mid' (variantes d'une graphie), 'cecet', 'mute' (lettre muette)
const R_GE = { text: 'Si j’entends le son [j] à la fin d’un mot, j’écris le plus souvent « ge ».', short: '[j] à la fin → « ge »', kind: 'swap',
  words: ['sage', 'page', 'large', 'image', 'orange', 'visage', 'rouge', 'neige', 'plage', 'nuage', 'fromage', 'singe', 'linge', 'cage'],
  fake: (w) => [w.replace(/ge$/, 'j'), w.replace(/ge$/, 'je'), w.replace(/ge$/, 'jhe')] };
const R_S = { text: 'Si j’entends le son [s] au début d’un mot, j’écris le plus souvent « s ».', short: '[s] au début → « s »', kind: 'swap',
  words: ['sur', 'sans', 'sous', 'sortir', 'soixante', 'savoir', 'suivre', 'souvent', 'surtout', 'semaine', 'seul', 'soleil', 'souris', 'sapin', 'samedi', 'soir'],
  fake: (w) => { const r = w.slice(1); return [(/^[eiy]/.test(r) ? 'c' : 'ç') + r, 'ss' + r]; } };
const R_TE = { text: 'Si j’entends le son [t] à la fin d’un mot, j’écris le plus souvent « te ».', short: '[t] à la fin → « te »', kind: 'swap',
  words: ['vite', 'patte', 'ensuite', 'forte', 'toute', 'tante', 'patate', 'carotte', 'quarante', 'cinquante', 'haute', 'route', 'petite', 'chatte'],
  fake: (w) => { const b = w.replace(/t+e$/, ''); return [b + 't', b + 'tt', b + 'the', w.endsWith('tte') ? b + 'te' : b + 'tte']; } };
const R_C = { text: 'Si j’entends le son [k] au début d’un mot, j’écris le plus souvent « c ».', short: '[k] au début → « c »', kind: 'swap',
  words: ['coq', 'café', 'cour', 'comme', 'campagne', 'canard', 'cane', 'côté', 'comment', 'cochon', 'carotte', 'cuisine', 'couleur', 'camion', 'cadeau'],
  fake: (w) => { const r = w.slice(1); return ['k' + r, ...(r[0] === 'u' ? [] : ['qu' + r]), 'ck' + r]; } };
const R_Z = { text: 'Si j’entends le son [z] à l’intérieur d’un mot, j’écris le plus souvent « s ».', short: '[z] dans le mot → « s »', kind: 'swap',
  words: ['rose', 'plaisir', 'phrase', 'maison', 'amuser', 'joyeuse', 'cousin', 'cousine', 'oiseau', 'chemise', 'valise', 'fraise', 'raisin', 'chaise', 'voisin', 'musique'],
  fake: (w) => { const m = w.match(new RegExp(`^(.*[${V}])s([${V}].*)$`)); return m ? [`${m[1]}z${m[2]}`, `${m[1]}zz${m[2]}`] : []; } };
const R_MPB = { text: 'Quand je vois un n devant un p ou un b, je transforme le plus souvent le n en m.', short: 'devant p ou b → « m »', kind: 'swap',
  words: ['temps', 'tomber', 'combien', 'chambre', 'printemps', 'décembre', 'lampe', 'jambe', 'pompier', 'ombre', 'simple', 'timbre', 'novembre', 'trompette', 'champ'],
  fake: (w) => [w.replace(/m(?=[pb])/, 'n'), w.replace(/([aeio])(?=m[pb])/, (v) => ({ a: 'e', e: 'a', i: 'ai', o: 'au' })[v])] };
const R_MUTE = { text: 'À la fin d’un mot, il y a parfois une lettre muette. Pour la trouver, je pense au féminin ou à un mot de la même famille.', short: 'lettre muette → je pense au féminin', kind: 'mute',
  pairs: [['froid', 'froide'], ['chaud', 'chaude'], ['laid', 'laide'], ['bas', 'basse'], ['haut', 'haute'], ['fort', 'forte'], ['petit', 'petite'], ['grand', 'grande'],
    ['gris', 'grise'], ['gros', 'grosse'], ['tard', 'tarder'], ['blanc', 'blanche'], ['long', 'longue'], ['rond', 'ronde'], ['mauvais', 'mauvaise'], ['lait', 'laitier'], ['bois', 'boiser'], ['tout', 'toute']] };
const R_QUE = { text: 'Si j’entends le son [k] à la fin d’un mot, j’écris le plus souvent « que ».', short: '[k] à la fin → « que »', kind: 'swap',
  words: ['musique', 'masque', 'chaque', 'banque', 'plaque', 'brique', 'cirque', 'casque', 'magique', 'élastique', 'barque', 'risque', 'moustique'],
  fake: (w) => { const b = w.replace(/que$/, ''); return [b + 'k', b + 'c', b + 'q', b + 'ck']; } };
const R_EAU = { text: 'Si j’entends le son [o] à la fin d’un mot, j’écris souvent « eau ».', short: '[o] à la fin → souvent « eau »', kind: 'swap',
  words: ['tableau', 'nouveau', 'chapeau', 'bateau', 'cadeau', 'oiseau', 'gâteau', 'château', 'rideau', 'manteau', 'morceau', 'couteau', 'agneau', 'ruisseau'],
  fake: (w) => { const b = w.replace(/eau$/, ''); return [b + 'o', b + 'au', b + 'ot', b + 'aut']; } };
const R_CED = { text: 'Le c fait [s] devant e et i. Devant a, o, u, j’ajoute une cédille pour garder le son [s] : ç.', short: 'c devant e, i ; ç devant a, o, u', kind: 'swap',
  words: ['leçon', 'garçon', 'glaçon', 'façon', 'maçon', 'reçu', 'face', 'ici', 'prince', 'princesse', 'cerise', 'ciel', 'merci', 'place', 'glace', 'citron'],
  fake: (w) => (w.includes('ç') ? [w.replace('ç', 'c'), w.replace('ç', 'ss'), w.replace('ç', 's')] : [w.replace(/c(?=[eiy])/, 's'), w.replace(/c(?=[eiy])/, 'ss'), w.replace(/c(?=[eiy])/, 'sc')]) };
const R_SS = { text: 'Entre deux voyelles, le s fait [z]. Pour garder le son [s] entre deux voyelles, j’écris « ss ».', short: '[s] entre deux voyelles → « ss »', kind: 'swap',
  words: ['passer', 'glisser', 'pousser', 'poussin', 'assez', 'classe', 'aussi', 'princesse', 'poisson', 'tasse', 'caisse', 'brosse', 'mousse', 'laisser', 'dessin', 'aussitôt'],
  fake: (w) => [w.replace('ss', 's'), w.replace('ss', 'ç'), w.replace('ss', 'sc')] };
const R_FREQ = { text: 'Voici une liste de mots fréquents. Ils se retrouvent souvent dans mes phrases. Je dois les lire et les écrire rapidement.', short: 'les mots fréquents', kind: 'gap',
  gaps: [['C’est ___ maison.', 'ma', ['mon', 'mes']], ['Je joue avec ___ amis.', 'mes', ['ma', 'mon']], ['___ chat dort.', 'Le', ['La', 'Les']],
    ['Il y a ___ pomme.', 'une', ['un', 'des']], ['Il y a ___ pommes.', 'des', ['une', 'un']], ['Papa ___ maman dansent.', 'et', ['en', 'ni']],
    ['Le chat est ___ la maison.', 'dans', ['de', 'du']], ['Je mange ___ pain.', 'du', ['de', 'des']], ['Je ___ dors pas.', 'ne', ['ni', 'me']],
    ['Elle va ___ parc.', 'au', ['aux', 'à le']], ['Léa joue avec ___ balle.', 'sa', ['son', 'ses']], ['Il met ___ bottes.', 'ses', ['son', 'sa']],
    ['Nous aimons ___ école.', 'notre', ['nos', 'ma']], ['Tu viens avec ___?', 'moi', ['me', 'mon']], ['Je vais ___ jardin.', 'au', ['aux', 'à le']],
    ['C’est ___ chien.', 'mon', ['ma', 'mes']]] };
const CECET = { text: '« ce » devant un nom masculin, « cet » devant un nom masculin qui commence par une voyelle ou un h muet, « cette » devant un nom féminin.',
  items: [['garçon', 'ce'], ['chat', 'ce'], ['livre', 'ce'], ['lapin', 'ce'], ['vélo', 'ce'], ['jardin', 'ce'], ['ami', 'cet'], ['arbre', 'cet'], ['oiseau', 'cet'], ['ouvrage', 'cet'],
    ['agent', 'cet'], ['hiver', 'cet'], ['homme', 'cet'], ['été', 'cet'], ['fille', 'cette'], ['maison', 'cette'], ['pomme', 'cette'], ['école', 'cette'], ['étoile', 'cette'], ['semaine', 'cette']] };

/* ------------------------------------------------------------------ */
/*  Les blocs du cahier « Semaines »                                   */
/*  Mots : '!' à la fin = menotté ⛓ ; '*' = orthographe spéciale.        */
/* ------------------------------------------------------------------ */
const B = (o) => o;
const RAW = [
  B({ from: 1, to: 2, weeks: [
    ['an', 'lui*', 'moi', 'mon', 'mes', 'me', 'm’', 'ma', 'son', 'sa', 'ses', 'de', 'du', 'et', 'en', 'dans', 'ni', 'ne', 'pas'],
    ['il y a', 'au', 'aux', 'oui', 'non', 'le', 'la', 'les', 'notre', 'nos', 'un', 'une', 'des']],
    rule: R_FREQ, verb: 'avoir', sounds: ['un', 'oi', 'oin'],
    dictee: ['Il y a un chat dans la maison.', 'J’ai un chien et une poule.', 'Mon ami a un vélo brun.', 'Ma sœur a des bonbons.', 'Le chat de ma mère ne dort pas.',
      'Il y a une étoile dans le ciel.', 'Nous avons un jardin au coin de la rue.', 'Mes amis ont un chat noir.', 'Lundi, papa a une voiture noire.', 'Le roi a une voiture.'] }),
  B({ from: 3, to: 5, weeks: [
    ['sage', 'page', 'large', 'image', 'orange', 'visage'],
    ['rouge', 'ménage*', 'message*', 'je/j’!', 'alors', 'après'],
    ['très', 'chez', 'avant', 'votre/vos', 'leur/leurs', 'ton/ta/tes']],
    rule: R_GE, verb: 'être', sounds: ['in', 'ain', 'ein'],
    dictee: ['Je suis très sage.', 'Ton visage est rouge.', 'Le lapin est chez moi.', 'Nous sommes chez ta mère.', 'Après l’école, je mange du pain.',
      'Il y a une image à la page six.', 'Votre orange est très grosse.', 'Mes amis sont dans le train.', 'Alors, tu es dans ta chambre?', 'Leur maison est très large.'] }),
  B({ from: 6, to: 8, weeks: [
    ['se/s’', 'si', 'sur', 'sans', 'sous', 'sortir', 'soixante'],
    ['soi*', 'savoir', 'suivre', 'souvent', 'surtout', 'semaine', 'seul/seule'],
    ['cent!', 'certains!', 'certaines!', 'celui/celle!', 'ceux!', 'cet/cette!', 'ce/ces!']],
    rule: R_S, verb: 'aimer', sounds: ['eu', 'eur', 'œu'],
    dictee: ['J’aime cette fleur bleue.', 'Ce chat dort sous la table.', 'Nous aimons souvent sortir le soir.', 'Il est seul sur le chemin.', 'Cette semaine, je suis chez mon père.',
      'Elle aime surtout les bonbons.', 'Mon cœur est plein de joie.', 'Cet oiseau vole dans le ciel.', 'Il y a cent fleurs dans ce jardin.', 'Sans mon ami, je suis seul.'] }),
  B({ from: 9, to: 11, weeks: [
    ['vite', 'patte', 'ensuite', 'te/t’/toi', 'forte/fort', 'toute/toutes', 'tout/tous'],
    ['tante', 'patate', 'carotte', 'quarante', 'cinquante', 'haute/haut'],
    ['sept!', 'huit!', 'trente', 'monter', 'arrêter', 'écouter*']],
    rule: R_TE, verb: 'aller', sounds: ['ou', 'on', 'an'],
    dictee: ['Ma tante va vite à l’école.', 'Le chat lève la patte.', 'Je vais monter tout en haut.', 'Nous allons manger des carottes.', 'Le loup est très fort.',
      'Tu vas écouter une histoire.', 'Ensuite, ils vont à la maison.', 'Il y a sept patates sur la table.', 'Elle a trente bonbons.', 'Toute la famille va au jardin.'] }),
  B({ from: 12, to: 14, weeks: [
    ['coq', 'café', 'cour', 'comme', 'campagne', 'canard/cane'],
    ['côté', 'comment', 'quinze!', 'quand!', 'qui/que!', 'quelque!'],
    ['quatorze!', 'trop', 'toujours', 'vraiment', 'pourquoi', 'tellement']],
    rule: R_C, verb: 'dire', sounds: ['ill', 'ail', 'eil'],
    dictee: ['Le coq chante à la campagne.', 'Papa aime toujours son café.', 'Le canard joue dans la cour.', 'Elle dit que tu es vraiment sage.', 'Il y a quinze canards.',
      'Comment va ta tante?', 'Ma fille a quatorze ans.', 'Mon chat est tellement beau.', 'Le soleil est trop chaud.', 'Nous disons merci à papa.'] }),
  B({ from: 15, to: 17, weeks: [
    ['rose', 'plaisir', 'phrase', 'maison', 'amuser', 'joyeuse/joyeux', 'cousin/cousine'],
    ['onze!', 'seize!', 'douze!', 'treize!', 'deuxième!', 'zéro', 'déjà'],
    ['auto', 'autre', 'autour', 'depuis', 'banane', 'automne']],
    rule: R_Z, verb: 'faire', sounds: ['euil', 'ouil', 'sz'],
    dictee: ['Ma cousine fait une phrase.', 'Il fait froid en automne.', 'Nous mangeons une banane.', 'Mon cousin a onze ans.', 'L’auto de papa est rose.',
      'Le jeu est un plaisir.', 'Elle est joyeuse depuis lundi.', 'Il y a douze feuilles autour de l’arbre.', 'Les enfants s’amusent dans la maison.', 'Ma sœur a une autre robe.'] }),
  B({ from: 18, to: 20, weeks: [
    ['temps', 'tomber', 'combien*', 'chambre', 'printemps', 'décembre*', 'bonbon!'],
    ['brebis', 'marier', 'mettre', 'arriver', 'appeler', 'attendre', 'répondre'],
    ['venir', 'reine', 'trouver', 'dernier', 'derrière', 'dernière', 'entendre']],
    rule: R_MPB, verb: 'avoir', sounds: ['gn', 'ch', 'ph'],
    dictee: ['Au printemps, il fait beau.', 'Combien de bonbons as-tu?', 'La reine va arriver en décembre.', 'Je vais mettre mon chapeau.', 'Le chat est derrière la porte.',
      'Tu peux venir dans ma chambre.', 'Nous allons attendre le train.', 'Elle va tomber dans la neige.', 'Mon père va répondre à la lettre.', 'J’entends la pluie depuis le matin.'] }),
  B({ from: 21, to: 23, weeks: [
    ['bois', 'bout', 'bruit', 'bas/basse', 'laid/laide', 'froid/froide', 'chaud/chaude'],
    ['fruit', 'porc', 'tard', 'vingt', 'parent', 'devant', 'moment'],
    ['jamais!', 'été', 'fée', 'enfin', 'entre', 'élève', 'fantôme']],
    rule: R_MUTE, verb: 'être', sounds: ['è', 'é', 'ien'],
    dictee: ['Il fait froid dans le bois.', 'Mon café est très chaud.', 'La fée est devant la porte.', 'Il est tard, je vais au lit.', 'L’élève aime les fruits.',
      'Il y a vingt élèves dans ma classe.', 'Le fantôme fait du bruit.', 'Enfin, c’est l’été!', 'Mes parents sont dans le jardin.', 'Je ne suis jamais seul.'] }),
  B({ from: 24, to: 26, weeks: [
    ['musique', 'masque*', 'lorsqu’', 'lorsque', 'chaque', 'parce qu’', 'parce que'],
    ['cinq!', 'avec!', 'donc!', 'là', 'mal', 'loin', 'idée'],
    ['mieux', 'moins', 'malade', 'femme', 'jument', 'fille/fils', 'maintenant']],
    rule: R_QUE, verb: 'aimer', sounds: ['cs', 'gj', 'gu'],
    dictee: ['J’aime la musique.', 'Chaque matin, je mange une pomme.', 'La jument est malade.', 'Il a mal parce qu’il a froid.', 'Ma fille joue avec cinq amis.',
      'Maintenant, je vais mieux.', 'Tu as une bonne idée.', 'La femme a un masque rouge.', 'Le fils de ma tante est là.', 'Lorsque je suis malade, je dors.'] }),
  // ---- proposés (pas encore dans le cahier) : liste du MEQ, 2e année ----
  B({ from: 27, to: 29, proposed: true, weeks: [
    ['tableau', 'nouveau', 'peau', 'aujourd’hui*', 'aussi', 'faux*', 'vrai'],
    ['hiver', 'homme*', 'oncle', 'madame', 'monsieur!', 'grand-mère', 'grand-père'],
    ['voici', 'voilà', 'voix*', 'encore', 'vieux', 'partout', 'parfois']],
    rule: R_EAU, verb: 'prendre', sounds: ['au', 'x', 'ui'],
    dictee: ['Aujourd’hui, je prends mon chapeau.', 'Mon oncle a un nouveau vélo.', 'Voici le tableau de ma classe.', 'Il fait froid en hiver.', 'Ma grand-mère prend du café.',
      'Nous prenons aussi des fruits.', 'Ce monsieur a une grosse voix.', 'Voilà mon grand-père!', 'Il y a de la neige partout.', 'C’est vrai ou c’est faux?'] }),
  B({ from: 30, to: 32, proposed: true, weeks: [
    ['leçon', 'face', 'ici', 'prince', 'princesse', 'figure', 'nature'],
    ['lecture', 'légume', 'même', 'peine', 'prière', 'paire', 'propre'],
    ['monstre', 'chanson', 'tant', 'vers', 'par', 'pour', 'pendant']],
    rule: R_CED, verb: 'vouloir', sounds: ['tion', 'oy', 'ier'],
    dictee: ['Je veux chanter une chanson.', 'La princesse est ici.', 'Le prince veut un cheval.', 'Nous voulons faire la lecture.', 'Le monstre a une grosse figure.',
      'Mes mains sont propres.', 'Tu veux des légumes?', 'Elle est en face de moi.', 'Pendant la leçon, je lis.', 'Ils veulent aller vers la forêt.'] }),
  B({ from: 33, to: 35, proposed: true, weeks: [
    ['passer', 'rester', 'penser', 'peut-être', 'puis', 'près', 'peu'],
    ['peur', 'tourner', 'truie', 'grand-maman', 'grand-papa', 'à côté de', 'y!'],
    ['glisser', 'pousser', 'poussin', 'assez', 'classe', 'aussitôt']],
    rule: R_SS, verb: 'pouvoir', sounds: ['ette', 'inr', 'k'],
    dictee: ['Je peux rester à côté de toi.', 'Le poussin a peur.', 'Grand-maman pense à nous.', 'Nous pouvons glisser sur la neige.', 'Il y a assez de pain.',
      'Tu peux passer près de moi.', 'La truie mange un peu.', 'Peut-être qu’il fait froid.', 'Ils peuvent pousser la porte.', 'Grand-papa mange, puis il dort.'] }),
];

const parseWord = (s) => {
  const menotte = s.endsWith('!'), special = s.endsWith('*');
  const text = s.replace(/[!*]$/, '');
  return { text, menotte, special, forms: text.split('/').map((x) => x.trim()) };
};
export const FIRST_ID = 19;
export const BLOCKS = RAW.map((b, i) => ({
  id: `f${FIRST_ID + i}`, from: b.from, to: b.to, proposed: !!b.proposed,
  weeks: b.weeks.map((ws, k) => ({ n: b.from + k, words: ws.map(parseWord) })),
  rule: b.rule.text, ruleShort: b.rule.short, verb: b.verb, conj: verbTable(b.verb),
  sounds: b.sounds.map((id) => ({ id, label: SOUNDS[id].label, ex: SOUNDS[id].ex, words: SOUNDS[id].words, pseudo: SOUNDS[id].pseudo.map((p) => p.replace(/[[\]]/g, '')),
    sentences: SOUNDS[id].sentences.map((x) => x[0]), inferred: !!SOUNDS[id].inferred, seen: SEEN_NOT_TRANSCRIBED.has(id) })),
  dictee: b.dictee,
}));
export const blockForWeek = (w) => BLOCKS.find((b) => w >= b.from && w <= b.to) ?? (w < 1 ? BLOCKS[0] : BLOCKS[BLOCKS.length - 1]);
export const unitForWeek = (w) => blockForWeek(w).id;
const titleOf = (b) => (b.to - b.from === 1 ? { fr: `Semaines ${b.from} et ${b.to}`, en: `Weeks ${b.from} & ${b.to}` } : { fr: `Semaines ${b.from} à ${b.to}`, en: `Weeks ${b.from}–${b.to}` });

/* ------------------------------------------------------------------ */
/*  Mots connus (pour éviter qu'un faux choix soit un vrai mot)        */
/* ------------------------------------------------------------------ */
const KNOWN = new Set(['poison', 'vit', 'pic', 'sot', 'saut', 'pot', 'ci', 'cou', 'coup', 'mer', 'maire', 'vert', 'verre', 'ver', 'sang', 'cent', 'sans', 'dé', 'la', 'là', 'ou', 'où',
  'pain', 'pin', 'poids', 'pois', 'sel', 'selle', 'cette', 'sept', 'set', 'mais', 'mes', 'mai', 'met', 'mets', 'ces', 'ses', 'pâte', 'bat', 'toux', 'laie', 'tare', 'lais', 'bac', 'sac', 'lac', 'parc', 'choc', 'cane', 'canne',
  'chant', 'champ', 'temps', 'tant', 'tend', 'quand', 'camp', 'quant', 'po', 'peau', 'eau', 'haut', 'au', 'os', 'auto', 'rose', 'roses', 'cours', 'court', 'cour', 'basse', 'base', 'face', 'fasse',
  'pousse', 'pouce', 'glace', 'casse', 'cache', 'sire', 'cire', 'si', 'scie', 'soi', 'soie', 'toi', 'toit', 'mot', 'maux', 'faux', 'faut', 'vin', 'vingt', 'vain', 'vint', 'fin', 'faim', 'sain', 'saint', 'sein', 'cinq',
  'bon', 'bond', 'son', 'sont', 'ton', 'thon', 'mon', 'mont', 'conte', 'compte', 'comte', 'cote', 'côte', 'côté', 'cotée', 'sur', 'sûr', 'dessin', 'dessein', 'plaine', 'pleine', 'lettre', 'laitier', 'aime', 'mais']);
for (const g of Object.values(MEQ)) for (const e of g) {
  for (const x of [e.w, ...(e.f || []), ...(e.alt ? [e.alt] : [])]) KNOWN.add(String(x).toLowerCase());
  for (const v of e.v || []) for (const t of v.split(/[\s/’']+/)) if (t) KNOWN.add(t.toLowerCase());
}
for (const b of BLOCKS) for (const w of b.weeks) for (const x of w.words) for (const f of x.forms) KNOWN.add(f.toLowerCase());
for (const s of Object.values(SOUNDS)) for (const w of [...s.words, ...s.accept]) KNOWN.add(w.toLowerCase());
for (const forms of Object.values(VERBS)) for (const f of forms) KNOWN.add(f);
const isReal = (w) => KNOWN.has(w.toLowerCase());

// Look-alike misspellings of a word (sounds the same or almost; never a real word).
const SUBS = [[/ge$/, 'je'], [/ge$/, 'j'], [/^c(?=[aouô])/, 'k'], [/^c(?=[aouô])/, 'qu'], [/^qu/, 'k'], [/^qu/, 'c'], [/que$/, 'k'], [/que$/, 'c'], [/tte$/, 'te'],
  [/([^t])te$/, '$1tte'], [/([aeiouéè])s([aeiouéè])/, '$1z$2'], [/z/, 's'], [/m(?=[pb])/, 'n'], [/an/, 'en'], [/en/, 'an'], [/eau/, 'o'], [/au/, 'o'], [/é$/, 'er'], [/é$/, 'ez'], [/é/, 'è'],
  [/è/, 'ai'], [/ai/, 'è'], [/ê/, 'è'], [/([bcdfglmnprt])\1/, '$1'], [/([aeiou])([lmnprt])([aeiouéè])/, '$1$2$2$3'], [/[dtsx]$/, ''], [/d$/, 't'], [/t$/, 'd'], [/s$/, 'x'], [/ph/, 'f'],
  [/f/, 'ph'], [/ain/, 'in'], [/ein/, 'in'], [/in(?![aeiouy])/, 'ain'], [/oi/, 'oa'], [/gn/, 'ni'], [/ill/, 'y'], [/ç/, 'ss'], [/^h/, ''], [/ss/, 's'], [/c(?=[eiy])/, 's'], [/o(?![iun])/, 'au'], [/k/, 'c'],
  [/^s/, 'c'], [/qu/, 'k'], [/eu/, 'e']];
const fakesOf = (w) => [...new Set(SUBS.map(([re, r]) => w.replace(re, r)))].filter((x) => x !== w && x.length >= 2 && !isReal(x));

/* ------------------------------------------------------------------ */
/*  Fabrication des questions                                          */
/* ------------------------------------------------------------------ */
const near = (s, g, n) => (typeof n === 'function' ? n(g) : n);
const pseudoSplit = (p) => { const m = p.match(/^(.*)\[(.+)\](.*)$/); return { a: m[1], g: m[2], b: m[3], text: m[1] + m[2] + m[3] }; };
const pseudoChoices = (sid, p) => { const s = SOUNDS[sid], x = pseudoSplit(p); return [x.text, ...s.near.map((n) => x.a + near(s, x.g, n) + x.b)]; };
const PROMPT = {
  listen: 'Écoute le mot. Touche le mot bien écrit.',
  pseudo: 'Lis le mot extraterrestre. Écoute les 3 choix et touche le bon.',
  tiles: 'Écoute le mot. Écris-le avec les lettres.',
  word: 'Écoute le mot et écris-le.',
  dict: 'Écoute et écris la phrase.',
  cecet: 'Choisis le bon mot : ce, cet ou cette.',
};
const soundPrompt = (s) => `Quel mot a le son « ${s.label} », comme dans « ${s.ex} »?`;
const readPrompt = (s) => `Lis la phrase. Touche le mot qui a le son « ${s.label} ».`;
const twoPrompt = (s) => `Écris 2 autres mots avec le son « ${s.label} », comme dans « ${s.ex} ».`;
const twoSay = (s) => `Écris deux autres mots avec le son « ${s.label} », comme dans « ${s.ex} ».`;
const verbPrompt = (v) => `Conjugue le verbe « ${v} » au présent.`;
const rulePrompt = 'Écoute. Quel mot est bien écrit? Pense à la règle!';
const mutePrompt = (fem) => `Pense à « ${fem} ». Quel mot est bien écrit?`;
const gapSay = (g) => g[0].replace('___', g[1]);

const cleanWord = (w) => w.replace(/^[«(]+|[.,!?;:»)]+$/g, '');
const tileable = (w) => /^[a-zàâçéèêëîïôûùüœ]{3,9}$/.test(w);
const LETTERS = 'abcdefgilmnoprstuvéè';
const POOL_ALL = () => [...new Set([...BLOCKS.flatMap((b) => b.weeks.flatMap((w) => w.words.flatMap((x) => x.forms))), ...Object.values(SOUNDS).flatMap((s) => s.words)])]
  .filter((w) => !/[’'\s-]/.test(w) && w.length >= 3);
let POOL = null;

function makeUnit(b, i) {
  const raw = RAW[i];
  const forms = [...new Set(b.weeks.flatMap((w) => w.words.flatMap((x) => x.forms)))];
  const spoken = forms.filter((f) => !/’$/.test(f));                 // m’, j’, lorsqu’… ne se disent pas seuls
  const tilesW = spoken.filter(tileable);
  const sids = raw.sounds;
  const rule = raw.rule;
  const ruleWords = rule.kind === 'swap' ? rule.words.filter((w) => rule.fake(w).filter((f) => f && f !== w && !isReal(f)).length >= 2) : [];
  const id = b.id;

  const qListen = (R) => {
    const w = R.pick(spoken);
    let opts = R.shuffle(fakesOf(w)).slice(0, 2);
    const others = R.shuffle(spoken.filter((x) => x !== w && !opts.includes(x)));
    while (opts.length < 3 && others.length) opts.push(others.pop());
    return { type: 'choice', key: `${id}-l-${w}`, prompt: PROMPT.listen, say: say(w), options: [w, ...opts].map((text) => ({ text })), answer: 0 };
  };
  const qPseudo = (R) => {
    const sid = R.pick(sids), p = R.pick(SOUNDS[sid].pseudo);
    const ch = pseudoChoices(sid, p);
    const order = R.shuffle([0, 1, 2]);
    return { type: 'choice', key: `${id}-p-${p}`, prompt: PROMPT.pseudo, say: say(PROMPT.pseudo), stimulus: { text: `👽 ${ch[0]}` }, fixedOrder: true,
      options: order.map((k, n) => ({ text: String(n + 1), emoji: '🔊', say: say(ch[k]) })), answer: order.indexOf(0) };
  };
  const qFind = (R) => {
    const sid = R.pick(sids), s = SOUNDS[sid];
    const w = R.pick(s.words);
    POOL ??= POOL_ALL();
    const bad = R.sample(POOL.filter((x) => !s.has(x) && x !== s.ex), 3);
    return { type: 'choice', key: `${id}-s-${sid}-${w}`, prompt: soundPrompt(s), say: say(soundPrompt(s)), options: [w, ...bad].map((text) => ({ text })), answer: 0 };
  };
  const qRead = (R) => {
    const sid = R.pick(sids), s = SOUNDS[sid];
    const [sent, target] = R.pick(s.sentences);
    const words = [...new Map(sent.split(/\s+/).map(cleanWord).filter((x) => x && x !== target && x.length >= 2 && !s.has(x) && !/’/.test(x)).map((x) => [x.toLowerCase(), x])).values()]
      .filter((x) => x.toLowerCase() !== target.toLowerCase());
    const opts = R.sample(words, Math.min(3, words.length));
    return { type: 'choice', key: `${id}-r-${sent}`, prompt: readPrompt(s), say: say(readPrompt(s)), stimulus: { text: sent }, options: [target, ...opts].map((text) => ({ text })), answer: 0 };
  };
  const qTiles = (R) => {
    const w = R.pick(tilesW);
    const letters = [...w];
    const extra = R.sample([...LETTERS].filter((c) => !letters.includes(c)), 2);
    return { type: 'order', key: `${id}-t-${w}`, prompt: PROMPT.tiles, say: say(w), tiles: letters, extra, joiner: '' };
  };
  const qWord = (R) => {
    const w = R.pick(spoken);
    return hand({ mode: 'dictation', key: `${id}-w-${w}`, prompt: { fr: PROMPT.word, en: 'Listen and write the word.' }, say: say(w), expected: w, lines: 1 });
  };
  const qVerb = (R) => {
    const [p, k] = R.pick(PRONOUNS);
    const all = VERBS[raw.verb], right = all[k];
    const wrong = R.sample([...new Set(all.filter((f) => f !== right))], 3);
    return { type: 'choice', key: `${id}-v-${p}`, prompt: verbPrompt(raw.verb), say: say(verbPrompt(raw.verb)), stimulus: { text: `${pron(p, right)}___`.replace('’___', '’ ___') },
      options: [right, ...wrong].map((text) => ({ text })), answer: 0 };
  };
  const qRule = (R) => {
    if (rule.kind === 'gap') {
      const g = R.pick(rule.gaps);
      return { type: 'choice', key: `${id}-g-${g[0]}`, prompt: 'Écoute la phrase. Choisis le petit mot qui manque.', say: say(gapSay(g)), stimulus: { text: g[0] },
        options: [g[1], ...g[2]].map((text) => ({ text })), answer: 0 };
    }
    if (rule.kind === 'mute') {
      const [m, fem] = R.pick(rule.pairs);
      const base = m.slice(0, -1);
      const fakes = R.shuffle(['d', 't', 's', 'x', 'c'].map((c) => base + c).filter((x) => x !== m && !isReal(x))).slice(0, 2);
      return { type: 'choice', key: `${id}-m-${m}`, prompt: mutePrompt(fem), say: say(mutePrompt(fem)), stimulus: { text: `${base}… ?` },
        options: [m, ...fakes].map((text) => ({ text })), answer: 0 };
    }
    if (rule === R_S && R.chance(0.5)) {
      const [n, a] = R.pick(CECET.items);
      return { type: 'choice', key: `${id}-c-${n}`, prompt: PROMPT.cecet, say: say(PROMPT.cecet), stimulus: { text: `___ ${n}` }, fixedOrder: true,
        options: ['ce', 'cet', 'cette'].map((text) => ({ text })), answer: ['ce', 'cet', 'cette'].indexOf(a) };
    }
    const w = R.pick(ruleWords);
    const [first, ...rest] = [...new Set(rule.fake(w))].filter((f) => f && f !== w && !isReal(f));   // the first fake = the typical mistake
    const fakes = [first, R.pick(rest)];
    return { type: 'choice', key: `${id}-k-${w}`, prompt: `${rulePrompt} (${rule.short})`, say: say(w), options: [w, ...fakes].map((text) => ({ text })), answer: 0 };
  };
  const qDict = (R) => {
    const k = R.int(0, raw.dictee.length - 1), text = raw.dictee[k];
    return hand({ mode: 'dictation', key: `${id}-d-${k}`, prompt: { fr: PROMPT.dict, en: 'Listen and write the sentence.' }, say: say(text), expected: text, lines: text.length > 30 ? 2 : 1 });
  };
  const qTwo = (R) => {
    const sid = R.pick(sids), s = SOUNDS[sid];
    const others = s.accept.filter((w) => !s.words.includes(w) && w !== s.ex);
    return hand({ mode: 'answer', key: `${id}-x-${sid}`, prompt: twoPrompt(s), say: say(twoSay(s)),
      stimulus: { text: `Son « ${s.label} » — déjà vus : ${s.words.join(', ')}. Trouve 2 AUTRES mots.` },
      answerKey: `Deux vrais mots français, différents de « ${[...s.words, s.ex].join(', ')} », où l’on entend le son « ${s.label} » (comme dans « ${s.ex} »). `
        + `Exemples acceptés : ${others.join(', ')}. Tout autre vrai mot avec ce son est bon; l’orthographe exacte compte peu en 2e année.`,
      lines: 1 });
  };

  const MIX = {
    1: [[qListen, 35], [qPseudo, 25], [qFind, 25], [qRead, 15]],
    2: [[qTiles, 30], [qWord, 15], [qRule, 30], [qVerb, 25]],
    3: [[qDict, 50], [qWord, 20], [qTwo, 30]],
  };
  const pickGen = (level, R) => { const m = MIX[level] || MIX[2], tot = m.reduce((a, x) => a + x[1], 0); let r = R.int(1, tot); for (const [f, w] of m) if ((r -= w) <= 0) return f; return m[0][0]; };

  return {
    id, icon: b.proposed ? '🗓️' : '📅', title: titleOf(b), block: b, week: true,
    pfeq: `Orthographe d’usage — cahier « Semaines » de la classe, semaines ${b.from} à ${b.to}${b.proposed ? ' (proposé, liste du MEQ 2e année)' : ''} : mots de la semaine, règle « ${rule.short} », verbe « ${raw.verb} » au présent, sons ${sids.map((x) => `« ${SOUNDS[x].label} »`).join(', ')}`,
    generate(level, R) { return pickGen(level, R)(R); },
    allSay() {
      const out = [];
      const add = (t) => out.push(say(t));
      spoken.forEach(add);
      for (const sid of sids) {
        const s = SOUNDS[sid];
        s.words.forEach(add); s.sentences.forEach((x) => add(x[0]));
        for (const p of s.pseudo) pseudoChoices(sid, p).forEach(add);
        add(soundPrompt(s)); add(readPrompt(s)); add(twoSay(s));
      }
      [PROMPT.pseudo, verbPrompt(raw.verb)].forEach(add);
      if (rule.kind === 'gap') rule.gaps.forEach((g) => add(gapSay(g)));
      if (rule.kind === 'mute') rule.pairs.forEach(([, fem]) => add(mutePrompt(fem)));
      if (rule.kind === 'swap') ruleWords.forEach(add);
      if (rule === R_S) add(PROMPT.cecet);
      raw.dictee.forEach(add);
      return [...new Map(out.map((x) => [x.text, x])).values()];
    },
  };
}

export const units = BLOCKS.map(makeUnit);
