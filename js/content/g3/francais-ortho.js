// Petit Hibou — Français 3e année : orthographe (g3f7 → g3f19).
// g3f7–g3f12 : mots de la « Liste orthographique » du MEQ, 3e année, regroupés par thème (dictées et jeux d’orthographe).
// g3f13–g3f15 : homophones ; g3f16 : accents ; g3f17 : consonnes doubles ; g3f18–g3f19 : pluriels et féminins irréguliers.
// Phrases originales, français du Québec.
import { ch, srt, ord, dict, dictWord, ans, fx, cap, BL, blankSay, unit, G3W, fakesOf, isReal, addKnown } from './francais-lib.js';
import { MEQ } from '../meq-liste.js';

/* =============================================================================================
 *  Outils
 * ============================================================================================= */
const EXC_MUTE = new Set(['mars', 'ours', 'but', 'août', 'autobus', 'jus', 'sens', 'fils', 'tous', 'plus', 'bus', 'zoo', 'cinq', 'sept', 'huit', 'neuf', 'dix', 'net', 'sec', 'ouest', 'est', 'sud', 'fer', 'mer']);
const spellTip = (w) => {
  const t = [];
  const d = w.match(/([bcdfglmnprst])\1/);
  if (d) t.push(`deux « ${d[1]} »`);
  const a = w.match(/[éèêëàâîïôûùç]/g);
  if (a) t.push([...new Set(a)].map((x) => `« ${x} »`).join(' et '));
  if (/eau/.test(w)) t.push('« eau »');
  else if (/au/.test(w)) t.push('« au »');
  const m = w.match(/(ps|ds|ts|gt|ct|[dtsxpg])$/);
  if (m && !EXC_MUTE.has(w)) t.push(`une lettre muette à la fin (« ${m[1]} »)`);
  return t.length ? `« ${w} » s’écrit avec ${t.join(', ')}.` : `Épelle-le lentement : ${[...w].join('-')}.`;
};
const tileable = (w) => /^[a-zàâçéèêëîïôûùüœ]{3,10}$/.test(w);
const LETTERS = 'abcdefgilmnoprstuvéè';
const words = (s) => s.split(/[\s’']+/).map((x) => x.replace(/^[«(—-]+|[.,!?;:»)]+$/g, '')).filter(Boolean);
const capIf = (s, first) => (first ? cap(s) : s);

/* =============================================================================================
 *  g3f7 → g3f12 : les mots de la liste par thèmes
 * ============================================================================================= */
const THEMES = [
  {
    id: 'g3f7', icon: '🫀', fr: 'Le corps, la santé et les repas', en: 'Body, health and meals',
    words: ['corps', 'doigt', 'dos', 'genou', 'gorge', 'jambe', 'joue', 'langue', 'lèvre', 'poil', 'sourcil', 'ventre', 'barbe', 'santé', 'maladie', 'docteur', 'hôpital', 'soin', 'soigner',
      'avaler', 'boire', 'faim', 'repas', 'souper', 'nourriture', 'nourrir', 'viande', 'sucre', 'crème', 'fraise', 'jus', 'vinaigre', 'cuisine', 'verre', 'bouteille', 'bouchon', 'pot', 'morceau',
      'moitié', 'poids', 'taille', 'âge', 'adulte', 'jeune', 'pâle', 'vivre', 'naissance', 'sentir', 'rire', 'cri', 'murmure', 'bain', 'baigner', 'restaurant', 'préparer', 'servir', 'museau'],
    dict: ['Mon doigt est coincé dans la porte.', 'Le docteur soigne mon genou.', 'J’ai mal à la gorge depuis ce matin.', 'Au souper, nous mangeons de la viande et des légumes.',
      'Ma sœur boit un grand verre de jus.', 'Papa a une barbe toute douce.', 'Le bébé avale sa crème aux fraises.', 'Mon ventre gargouille, car j’ai faim.',
      'Grand-maman prépare le repas dans la cuisine.', 'Il met du vinaigre dans la salade.', 'Je garde la moitié de mon morceau de gâteau.', 'Après le bain, je brosse mes dents.',
      'La santé, c’est important pour bien vivre.', 'Le bouchon de la bouteille est tombé.', 'Le chien a le poil doux et le museau froid.', 'Elle lève les sourcils et se met à rire.'],
  },
  {
    id: 'g3f8', icon: '📅', fr: 'Le temps, les fêtes et les loisirs', en: 'Time, celebrations and fun',
    words: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre', 'année', 'saison', 'mois', 'date', 'minute', 'minuit',
      'soirée', 'après-midi', 'avant-midi', 'lendemain', 'demain', 'bientôt', 'aussitôt', 'longtemps', 'retard', 'congé', 'vacances', 'prochain', 'troisième', 'lentement', 'vitesse', 'souvenir',
      'terminer', 'commencer', 'continuer', 'bonjour', 'bonsoir', 'salut', 'spectacle', 'cinéma', 'film', 'danse', 'danser', 'chant', 'course', 'patin', 'jouet', 'ballon', 'balle', 'bâton',
      'gagner', 'conte', 'raconter', 'photo', 'radio', 'télévision', 'visite', 'voyage', 'invitation', 'cadeau'],
    dict: ['En juillet, nous partons en vacances au bord de la mer.', 'Demain, nous irons au cinéma voir un film.', 'Le spectacle commence dans dix minutes.', 'En avril, la neige fond lentement.',
      'Le lendemain, il était encore en retard.', 'Cette année, l’été a duré longtemps.', 'Nous avons congé au début de septembre.', 'À minuit, tout le monde dort.',
      'Bientôt, ce sera la saison du patin.', 'Grand-papa me raconte un conte le soir.', 'Je gagne la course grâce à ma vitesse.', 'Nous faisons une visite au zoo en mai.',
      'J’ai reçu une invitation pour la soirée de danse.', 'Le mois prochain, je vais faire un voyage.', 'Elle range son bâton et sa balle.', 'Cette photo est un beau souvenir de février.'],
  },
  {
    id: 'g3f9', icon: '🏙️', fr: 'La maison, la ville et les objets', en: 'Home, town and things',
    words: ['appartement', 'bureau', 'chaise', 'salle', 'boîte', 'clé', 'ampoule', 'téléphone', 'machine', 'plastique', 'fer', 'métal', 'pile', 'autobus', 'camion', 'voiture', 'avion',
      'bateau', 'trottoir', 'usine', 'magasin', 'marché', 'église', 'village', 'parc', 'zoo', 'mur', 'coin', 'pièce', 'costume', 'pantalon', 'soulier', 'botte', 'vêtement', 'poche', 'bas',
      'fil', 'soie', 'or', 'argent', 'prix', 'payer', 'acheter', 'ménage', 'voisin', 'lumière', 'ligne', 'chiffre', 'nombre', 'million', 'mille', 'journal', 'métier', 'professeur', 'château', 'bouteille', 'plan'],
    dict: ['La clé de l’appartement est dans ma poche.', 'L’autobus s’arrête au coin de la rue.', 'Le camion traverse le village.', 'Papa change l’ampoule de la salle de bain.',
      'Ma boîte à lunch est en plastique.', 'Le voisin achète du pain au marché.', 'J’ai trouvé une pièce sur le trottoir.', 'Le téléphone sonne sur le bureau.',
      'Mon pantalon a un trou dans la poche.', 'Nous faisons le ménage avant la visite.', 'L’avion vole au-dessus de l’usine.', 'Le professeur écrit des chiffres au tableau.',
      'Range tes souliers et tes bottes près de la porte.', 'Ce vêtement est en soie.', 'Il faut payer le prix avant de partir.', 'Le bateau de métal flotte près du château.'],
  },
  {
    id: 'g3f10', icon: '🌲', fr: 'La nature et les animaux', en: 'Nature and animals',
    words: ['agneau', 'branche', 'champ', 'étoile', 'fleuve', 'herbe', 'lièvre', 'lion', 'nid', 'nuage', 'ombre', 'ours', 'pierre', 'pin', 'poussin', 'rat', 'renard', 'rivière', 'ruisseau',
      'sabot', 'sapin', 'sentier', 'terrain', 'mer', 'glace', 'goutte', 'poudre', 'ferme', 'pleuvoir', 'chasse', 'chasseur', 'chasser', 'bête', 'surface', 'fond', 'bord', 'courant', 'rond',
      'sec', 'épais', 'frais', 'clair', 'hauteur', 'haut', 'milieu', 'lieu', 'rayon', 'trou', 'attraper', 'cacher', 'protéger', 'sauver', 'dehors', 'environ', 'droite', 'gauche', 'abri'],
    dict: ['Le renard se cache dans l’ombre du sapin.', 'Un petit poussin sort de son nid.', 'Le lièvre court dans le champ.', 'Il va pleuvoir sur la rivière.',
      'Le chasseur marche sur le sentier.', 'Une goutte d’eau tombe de la branche.', 'L’ours pêche au bord du ruisseau.', 'Le cheval frappe le sol avec son sabot.',
      'La nuit, les étoiles brillent au-dessus de la mer.', 'L’agneau mange de l’herbe fraîche.', 'Le rat creuse un trou sous la pierre.', 'Le lion protège ses petits.',
      'La glace est épaisse sur le lac.', 'Au milieu du terrain, il y a un grand pin.', 'Un rayon de soleil traverse les nuages.', 'Le courant du fleuve est très fort.'],
  },
  {
    id: 'g3f11', icon: '🏃', fr: 'Les verbes d’action', en: 'Action verbs',
    words: ['aider', 'apporter', 'apprendre', 'approcher', 'avancer', 'battre', 'changer', 'choisir', 'comprendre', 'compter', 'consoler', 'coucher', 'courir', 'crier', 'croire', 'découvrir',
      'déposer', 'descendre', 'diriger', 'écouter', 'écrire', 'embrasser', 'entrer', 'espérer', 'fermer', 'frapper', 'garder', 'glisser', 'habiter', 'jeter', 'laisser', 'lancer', 'manquer',
      'marcher', 'mener', 'montrer', 'occuper', 'offrir', 'oublier', 'pencher', 'perdre', 'permettre', 'porter', 'poser', 'pousser', 'préférer', 'présenter', 'promener', 'promettre',
      'rappeler', 'recevoir', 'rejoindre', 'remarquer', 'remplir', 'rencontrer', 'rendre', 'retrouver', 'réussir', 'réveiller', 'revenir', 'rêver', 'rouler', 'secouer', 'sembler',
      'souhaiter', 'tirer', 'toucher', 'travailler', 'traverser', 'verser'],
    dict: ['Je dois apprendre ma leçon avant le souper.', 'Elle aime courir et glisser sur la neige.', 'Peux-tu m’aider à porter ce sac?', 'Il faut fermer la porte pour garder la chaleur.',
      'Nous allons traverser la rue avec prudence.', 'Mon frère veut lancer la balle très loin.', 'N’oublie pas de remplir ta gourde.', 'Viens écouter cette belle chanson!',
      'Le chat aime se coucher au soleil.', 'J’espère recevoir une lettre de mon ami.', 'Tu peux choisir un livre à la bibliothèque.', 'Il faut pousser fort pour ouvrir la porte.',
      'Nous devons consoler notre petite sœur.', 'Je vais rêver de dragons cette nuit.', 'Je vais rencontrer mes amis au parc.', 'Mon chien aime rouler dans l’herbe.'],
  },
  {
    id: 'g3f12', icon: '💛', fr: 'Sentiments, qualités et petits mots', en: 'Feelings, qualities and little words',
    words: ['amour', 'amoureux', 'bonheur', 'chagrin', 'malheur', 'fier', 'gentil', 'méchant', 'timide', 'triste', 'tranquille', 'horrible', 'important', 'facile', 'libre', 'riche',
      'possible', 'certain', 'juste', 'mauvais', 'meilleur', 'fou', 'dur', 'court', 'neuf', 'ouvert', 'allure', 'attention', 'affaire', 'exemple', 'faute', 'question', 'réaction',
      'recherche', 'enquête', 'danger', 'genre', 'sorte', 'suite', 'moyen', 'partie', 'assez', 'presque', 'ensemble', 'combien', 'car', 'contre', 'dedans', 'plusieurs', 'chacun',
      'rien', 'bien', 'mal', 'quel', 'longtemps', 'trésor', 'secouer'],
    dict: ['Je suis fier de mon dessin.', 'Ma voisine est très gentille avec moi.', 'Le petit chat timide se cache.', 'Mon frère a du chagrin, car il a perdu son jouet.',
      'C’est facile, mais il faut faire attention.', 'Le loup méchant fait une grimace horrible.', 'Il est presque midi, nous avons assez joué.', 'Chacun range ses affaires.',
      'Quelqu’un frappe à la porte.', 'Il n’y a rien dans la boîte.', 'Plusieurs amis jouent ensemble dans la cour.', 'Combien de bonbons as-tu?',
      'Ce livre est meilleur que le film.', 'Le bonheur, c’est d’être libre.', 'Ce n’est pas grave de faire une faute.', 'Mon ami a une question importante.'],
  },
];
const LISTE = new Set(G3W);

function themeUnit(th) {
  const W = th.words.filter((w) => LISTE.has(w));
  const id = th.id;
  const fk = (w) => fakesOf(w);
  const withFakes = W.filter((w) => fk(w).length >= 2);
  const tilesW = W.filter(tileable);
  const P = {
    listen: 'Écoute le mot. Touche le mot bien écrit.',
    wrong: 'Un de ces mots est mal écrit. Lequel?',
    tiles: 'Écoute le mot. Écris-le avec les lettres.',
    err: 'Lis la phrase. Quel mot est mal écrit?',
    gap: 'Écoute la phrase. Choisis le mot bien écrit qui manque.',
  };
  const qListen = (R, level) => {
    const w = R.pick(withFakes), n = level === 1 ? 3 : 4;
    return ch(`${id}-l${n}-${w}`, P.listen, w, R.shuffle(fk(w)), { n, say: fx(w), tip: spellTip(w) });
  };
  const qWrong = (R) => {
    const w = R.pick(withFakes), bad = R.pick(fk(w));
    const good = R.sample(W.filter((x) => x !== w), 2);
    return ch(`${id}-m-${bad}`, P.wrong, bad, good, { tip: `On écrit « ${w} ». ${spellTip(w)}` });
  };
  const qTiles = (R) => {
    const w = R.pick(tilesW), letters = [...w];
    const extra = R.sample([...LETTERS].filter((c) => !letters.includes(c)), 2);
    return ord(`${id}-t-${w}`, P.tiles, letters, { joiner: '', extra, say: fx(w), tip: spellTip(w) });
  };
  const qWord = (R) => { const w = R.pick(W); return dictWord(`${id}-w-${w}`, w, spellTip(w)); };
  // phrase de dictée avec un mot de la liste à choisir (3 graphies)
  const gaps = [];
  th.dict.forEach((s, si) => { for (const w of new Set(words(s))) if (LISTE.has(w.toLowerCase()) && fk(w.toLowerCase()).length >= 2 && w.length >= 3) gaps.push([si, w]); });
  const qGap = (R) => {
    const [si, w] = R.pick(gaps), s = th.dict[si];
    const re = new RegExp(`(^|[\\s’'])${w}(?=[\\s.,!?;:]|$)`);
    const st = s.replace(re, `$1${BL}`);
    return ch(`${id}-g-${si}-${w}`, P.gap, w, R.shuffle(fk(w.toLowerCase())).map((x) => (w[0] === w[0].toUpperCase() ? cap(x) : x)), { n: 3, stimulus: st, say: fx(s), tip: spellTip(w.toLowerCase()) });
  };
  const errs = [];
  th.dict.forEach((s, si) => { for (const w of new Set(words(s))) if (w.length >= 4 && fk(w.toLowerCase()).length >= 1 && w === w.toLowerCase()) errs.push([si, w]); });
  const qErr = (R) => {
    const [si, w] = R.pick(errs), s = th.dict[si];
    const bad = R.pick(fk(w));
    const re = new RegExp(`(^|[\\s’'])${w}(?=[\\s.,!?;:]|$)`);
    const st = s.replace(re, `$1${bad}`);
    const others = [...new Set(words(s).filter((x) => x !== w && x.length >= 3 && x.toLowerCase() !== bad))];
    return ch(`${id}-e-${si}-${w}`, P.err, bad, R.sample(others, 3), { n: 4, stimulus: st, tip: `Il fallait écrire « ${w} ». ${spellTip(w)}` });
  };
  const qDict = (R) => { const k = R.int(0, th.dict.length - 1); return dict(`${id}-d-${k}`, th.dict[k], 'Écoute chaque mot, puis relis-toi : majuscule, accents et point!'); };
  return unit(id, th.icon, th.fr, th.en,
    `Orthographe d’usage — mots de la Liste orthographique du MEQ, 3e année, thème « ${th.fr} » (${W.length} mots)`,
    { 1: [qListen, qListen, qWrong, qWrong, qGap], 2: [qTiles, qTiles, qWord, qListen, qGap, qGap], 3: [qDict, qDict, qErr, qErr, qWord] },
    { words: W });
}

/* =============================================================================================
 *  g3f13 → g3f15 : homophones
 * ============================================================================================= */
const HTIP = {
  a: '« a » est le verbe avoir : on peut dire « avait ».',
  à: '« à » avec un accent : on ne peut pas dire « avait ».',
  est: '« est » est le verbe être : on peut dire « était ».',
  et: '« et » relie deux mots : on peut dire « et puis ».',
  son: '« son » est devant un nom : on peut dire « mon ».',
  sont: '« sont » est le verbe être : on peut dire « étaient ».',
  on: '« on » remplace une personne : on peut dire « il ».',
  ont: '« ont » est le verbe avoir : on peut dire « avaient ».',
  ou: '« ou » sans accent veut dire « ou bien ».',
  où: '« où » avec un accent parle d’un lieu.',
  ces: '« ces » montre des choses : « ces… -là ».',
  ses: '« ses » veut dire « les siens » : on peut dire « mes ».',
  'c’est': '« c’est » veut dire « cela est » : on peut dire « c’était ».',
  's’est': '« s’est » est devant un verbe : il s’est lavé → je me suis lavé.',
  ce: '« ce » est devant un nom : « ce… -là ».',
  se: '« se » est devant un verbe : il se lave → je me lave.',
  leur: '« leur » : un seul objet, ou devant un verbe (= à eux). Pas de s!',
  leurs: '« leurs » avec un s : ils ont PLUSIEURS objets.',
  peu: '« peu » veut dire « pas beaucoup ».',
  peut: '« il peut » vient du verbe pouvoir : on peut dire « pouvait ».',
  peux: 'Avec « je » et « tu » : je peux, tu peux.',
  sans: '« sans » est le contraire de « avec ».',
  's’en': '« s’en » est devant un verbe : il s’en va → je m’en vais.',
  cent: '« cent » est un nombre : 100.',
  quand: '« quand » parle du temps : à quel moment?',
  'qu’en': '« qu’en » = « que » + « en » : ne… qu’en hiver.',
  mes: '« mes » veut dire « à moi » : plusieurs choses.',
  mais: '« mais » montre une opposition : on peut dire « pourtant ».',
  met: '« met » vient du verbe mettre : on peut dire « mettait ».',
};
const H13 = {
  pairs: [['a', 'à'], ['et', 'est'], ['son', 'sont'], ['on', 'ont'], ['ou', 'où']],
  S: [
    ['Léo ___ un nouveau vélo.', 'a'], ['Nous allons ___ la piscine.', 'à'], ['Elle ___ perdu sa tuque.', 'a'], ['Je vais ___ l’école à pied.', 'à'], ['Mon chien ___ faim.', 'a'],
    ['Il joue ___ la balle.', 'à'], ['Maya ___ trois frères.', 'a'], ['On mange ___ midi.', 'à'], ['Le chat ___ attrapé une souris.', 'a'], ['C’est une tarte ___ la citrouille.', 'à'],
    ['Ma tante ___ un grand jardin.', 'a'], ['Il pense ___ ses vacances.', 'à'], ['Qui ___ fermé la fenêtre?', 'a'], ['Je donne un dessin ___ mon père.', 'à'],
    ['Le ciel ___ bleu.', 'est'], ['J’aime les pommes ___ les poires.', 'et'], ['Ma sœur ___ malade aujourd’hui.', 'est'], ['Félix ___ Noah jouent au hockey.', 'et'], ['Le chien ___ dans sa niche.', 'est'],
    ['Il fait froid ___ il neige.', 'et'], ['Où ___ ma mitaine?', 'est'], ['Je lis ___ je dessine.', 'et'], ['Cette soupe ___ trop chaude.', 'est'], ['Prends ton sac ___ ta boîte à lunch.', 'et'],
    ['Le magasin ___ fermé le dimanche.', 'est'], ['Elle rit ___ elle chante.', 'et'], ['Mon ami ___ très drôle.', 'est'], ['Le chat ___ le chien dorment ensemble.', 'et'],
    ['Léa range ___ sac.', 'son'], ['Les enfants ___ dans la cour.', 'sont'], ['Il a perdu ___ crayon.', 'son'], ['Mes bottes ___ mouillées.', 'sont'], ['Le chat dort sur ___ coussin.', 'son'],
    ['Les fraises ___ bien mûres.', 'sont'], ['Mon frère promène ___ chien.', 'son'], ['Où ___ mes mitaines?', 'sont'], ['Elle aime ___ nouveau vélo.', 'son'], ['Les oiseaux ___ revenus au printemps.', 'sont'],
    ['Papa cherche ___ téléphone.', 'son'], ['Nos voisins ___ très gentils.', 'sont'], ['Chaque élève prend ___ cahier.', 'son'], ['Ils ___ partis tôt ce matin.', 'sont'],
    ['Mes amis ___ un chiot.', 'ont'], ['___ joue dehors après l’école.', 'on'], ['Les élèves ___ fini leur travail.', 'ont'], ['Ce soir, ___ mange de la pizza.', 'on'], ['Mes parents ___ acheté une auto.', 'ont'],
    ['___ va au parc avec grand-maman.', 'on'], ['Les chats ___ peur de l’eau.', 'ont'], ['Quand il pleut, ___ reste à la maison.', 'on'], ['Les arbres ___ perdu leurs feuilles.', 'ont'],
    ['Mes cousines ___ dix ans.', 'ont'], ['___ entend la pluie sur le toit.', 'on'], ['Ils ___ gagné la partie.', 'ont'], ['Demain, ___ ira à la cabane à sucre.', 'on'],
    ['Veux-tu du lait ___ du jus?', 'ou'], ['___ est ton manteau?', 'où'], ['Je ne sais pas ___ est mon livre.', 'où'], ['Tu préfères le rouge ___ le bleu?', 'ou'], ['La maison ___ j’habite est jaune.', 'où'],
    ['Viens ce soir ___ demain.', 'ou'], ['___ vas-tu cet été?', 'où'], ['On joue aux cartes ___ aux dés?', 'ou'], ['Le parc ___ on joue est grand.', 'où'], ['Dis-moi ___ tu caches le trésor.', 'où'],
    ['Il arrive à midi ___ à une heure.', 'ou'], ['C’est l’endroit ___ j’ai trouvé la clé.', 'où'], ['Prends une pomme ___ une poire.', 'ou'],
  ],
};
const H14 = {
  pairs: [['ces', 'ses'], ['c’est', 's’est'], ['ce', 'se']],
  groups: [['ces', 'ses', 'c’est', 's’est'], ['ce', 'se', 'ces', 'ses']],
  S: [
    ['Regarde ___ beaux nuages!', 'ces'], ['___ souliers sont trop petits pour moi.', 'ces'], ['J’aime ___ fleurs-là.', 'ces'], ['Qui a laissé ___ crayons sur la table?', 'ces'],
    ['___ enfants-là jouent au soccer.', 'ces'], ['Tu vois ___ oiseaux sur le fil?', 'ces'], ['___ biscuits sentent bon!', 'ces'], ['Je veux lire tous ___ livres-là.', 'ces'],
    ['___ montagnes sont couvertes de neige.', 'ces'], ['Range ___ jouets, s’il te plaît.', 'ces'], ['Il faut arroser ___ plantes-là.', 'ces'], ['Où as-tu acheté ___ mitaines?', 'ces'],
    ['___ chiens-là aboient toute la nuit.', 'ces'], ['Écoute ___ cris dans la forêt!', 'ces'],
    ['Léo met ___ bottes.', 'ses'], ['Ma sœur range ___ livres.', 'ses'], ['Le chat lèche ___ pattes.', 'ses'], ['Grand-papa cherche ___ lunettes.', 'ses'], ['Elle invite tous ___ amis.', 'ses'],
    ['Le roi compte ___ pièces d’or.', 'ses'], ['Noah a perdu ___ gants.', 'ses'], ['L’oiseau nourrit ___ petits.', 'ses'], ['Mon voisin lave ___ fenêtres.', 'ses'], ['Zoé brosse ___ cheveux.', 'ses'],
    ['Le chien enterre ___ os.', 'ses'], ['Maman arrose ___ fleurs.', 'ses'], ['Il prête ___ crayons à Liam.', 'ses'], ['La poule protège ___ poussins.', 'ses'], ['Chloé montre ___ dessins à la classe.', 'ses'],
    ['___ mon ami Félix.', 'c’est'], ['___ l’heure de dîner!', 'c’est'], ['Regarde, ___ un arc-en-ciel!', 'c’est'], ['___ trop difficile pour moi.', 'c’est'], ['___ la fête de ma mère demain.', 'c’est'],
    ['Ce gâteau, ___ moi qui l’ai fait.', 'c’est'], ['___ un beau cadeau.', 'c’est'], ['Je crois que ___ ton tour.', 'c’est'], ['___ amusant de glisser.', 'c’est'], ['Écoute, ___ une belle chanson.', 'c’est'],
    ['___ le chat du voisin.', 'c’est'], ['Oui, ___ vrai!', 'c’est'], ['Quel bruit! ___ le tonnerre.', 'c’est'], ['Demain, ___ congé!', 'c’est'],
    ['Le chat ___ caché sous le lit.', 's’est'], ['Léa ___ levée tôt.', 's’est'], ['Mon frère ___ fait mal au genou.', 's’est'], ['Le chien ___ roulé dans la boue.', 's’est'], ['Elle ___ endormie dans l’autobus.', 's’est'],
    ['Il ___ lavé les mains.', 's’est'], ['La neige ___ mise à tomber.', 's’est'], ['L’oiseau ___ posé sur la branche.', 's’est'], ['Grand-maman ___ assise près du feu.', 's’est'],
    ['Mon ami ___ trompé de chemin.', 's’est'], ['Le bébé ___ réveillé en pleurant.', 's’est'], ['La porte ___ fermée toute seule.', 's’est'], ['Le renard ___ sauvé dans la forêt.', 's’est'], ['Elle ___ amusée toute la journée.', 's’est'],
    ['___ matin, il fait beau.', 'ce'], ['Je veux ___ livre-là.', 'ce'], ['___ chien est très gentil.', 'ce'], ['Regarde ___ château!', 'ce'], ['___ soir, on regarde un film.', 'ce'], ['Tu aimes ___ jeu?', 'ce'],
    ['___ gâteau est délicieux.', 'ce'], ['Prends ___ crayon bleu.', 'ce'],
    ['Le chat ___ lave.', 'se'], ['Les enfants ___ cachent.', 'se'], ['Il ___ brosse les dents.', 'se'], ['Elle ___ couche tôt.', 'se'], ['Ils ___ parlent au téléphone.', 'se'],
    ['La chenille ___ transforme en papillon.', 'se'], ['Mon frère ___ fâche vite.', 'se'], ['Le soleil ___ lève à l’est.', 'se'],
  ],
};
const H15 = {
  pairs: [['leur', 'leurs'], ['peu', 'peut', 'peux'], ['sans', 's’en', 'cent'], ['quand', 'qu’en'], ['mes', 'mais', 'met']],
  S: [
    ['Les oiseaux construisent ___ nid.', 'leur'], ['Mes cousins promènent ___ chien.', 'leur'], ['Les enfants mangent ___ collation.', 'leur'], ['Mes parents lavent ___ auto.', 'leur'],
    ['Je ___ donne des biscuits.', 'leur'], ['Maman ___ raconte une histoire.', 'leur'], ['Le professeur ___ parle.', 'leur'], ['Je ___ écris une lettre.', 'leur'],
    ['Les enfants rangent ___ jouets.', 'leurs'], ['Mes voisins lavent ___ fenêtres.', 'leurs'], ['Les chats aiment ___ croquettes.', 'leurs'], ['Les filles prennent ___ patins.', 'leurs'],
    ['Ils cherchent ___ mitaines.', 'leurs'], ['Les joueurs enfilent ___ casques.', 'leurs'],
    ['Le chat ___ sauter très haut.', 'peut'], ['Léa ___ venir avec nous.', 'peut'], ['Il ___ pleuvoir demain.', 'peut'], ['Mon frère ___ porter le sac.', 'peut'], ['Elle ___ courir vite.', 'peut'],
    ['Je ___ t’aider.', 'peux'], ['Tu ___ prendre mon crayon.', 'peux'], ['Est-ce que je ___ sortir?', 'peux'], ['Tu ___ venir chez moi.', 'peux'],
    ['Il reste un ___ de lait.', 'peu'], ['J’ai un ___ froid.', 'peu'], ['Mange un ___ de soupe.', 'peu'], ['Il parle très ___.', 'peu'], ['Attends un ___!', 'peu'],
    ['Il sort ___ sa tuque.', 'sans'], ['Je bois mon chocolat ___ sucre.', 'sans'], ['Elle part ___ dire au revoir.', 'sans'], ['Ne traverse pas ___ regarder.', 'sans'], ['Un été ___ soleil, c’est triste.', 'sans'],
    ['Il ___ va à la maison.', 's’en'], ['Elle ___ souvient très bien.', 's’en'], ['Le loup ___ va en courant.', 's’en'], ['Mon ami ___ occupe très bien.', 's’en'],
    ['Il y a ___ élèves dans l’école.', 'cent'], ['Ce livre a ___ pages.', 'cent'], ['Mon arrière-grand-mère a presque ___ ans.', 'cent'], ['J’ai compté jusqu’à ___.', 'cent'],
    ['___ il neige, je fais un bonhomme.', 'quand'], ['Je rentre ___ la cloche sonne.', 'quand'], ['___ partons-nous?', 'quand'], ['Mon chien jappe ___ il a faim.', 'quand'],
    ['Dis-moi ___ tu arrives.', 'quand'], ['___ j’étais petit, j’avais peur du noir.', 'quand'], ['Je mets ma tuque ___ il fait froid.', 'quand'],
    ['Je ne fais du ski ___ hiver.', 'qu’en'], ['Il ne parle ___ chuchotant.', 'qu’en'], ['On ne voit ce papillon ___ été.', 'qu’en'], ['Elle ne dessine ___ noir.', 'qu’en'], ['On ne cueille des fraises ___ juin.', 'qu’en'],
    ['J’ai perdu ___ clés.', 'mes'], ['___ amis sont gentils.', 'mes'], ['Je range ___ souliers.', 'mes'], ['___ parents travaillent.', 'mes'], ['Je lave ___ mains.', 'mes'],
    ['Il fait froid, ___ c’est beau.', 'mais'], ['Je veux jouer, ___ je suis fatigué.', 'mais'], ['Elle est petite, ___ très forte.', 'mais'], ['C’est bon, ___ c’est chaud!', 'mais'],
    ['Papa ___ la table.', 'met'], ['Elle ___ son manteau.', 'met'], ['Il ___ du sel dans la soupe.', 'met'], ['Léo ___ ses bottes.', 'met'],
  ],
};
// options « faciles » (2) pour chaque réponse
const PARTNER = { a: ['à'], à: ['a'], et: ['est'], est: ['et'], son: ['sont'], sont: ['son'], on: ['ont'], ont: ['on'], ou: ['où'], où: ['ou'],
  ces: ['ses'], ses: ['ces'], 'c’est': ['s’est'], 's’est': ['c’est'], ce: ['se'], se: ['ce'], leur: ['leurs'], leurs: ['leur'], peu: ['peut'], peut: ['peu'], peux: ['peu'],
  sans: ['s’en'], 's’en': ['sans'], cent: ['sans'], quand: ['qu’en'], 'qu’en': ['quand'], mes: ['mais'], mais: ['mes'], met: ['mais'] };
const fill = (s, w) => { const first = s.startsWith(BL); return s.replace(BL, capIf(w, first)); };

function homoUnit(id, icon, fr, en, pfeq, H) {
  const groupOf = (a) => (H.groups || H.pairs).find((g) => g.includes(a)) || H.pairs.find((g) => g.includes(a));
  const cOpts = (s, arr) => arr.map((x) => capIf(x, s.startsWith(BL)));
  const P1 = 'Choisis le bon mot pour compléter la phrase.';
  const qPair = (R) => {
    const [s, a] = R.pick(H.S);
    return ch(`${id}-1-${s}`, P1, ...[cOpts(s, [a])[0], cOpts(s, PARTNER[a])], { n: 2, stimulus: s, say: fx(blankSay(s)), tip: HTIP[a] });
  };
  const qGroup = (R) => {
    const [s, a] = R.pick(H.S);
    let others = groupOf(a).filter((x) => x !== a);
    if (others.length < 2) { const g2 = R.pick(H.pairs.filter((g) => !g.includes(a))); others = [...others, ...g2]; }
    return ch(`${id}-2-${s}`, P1, cOpts(s, [a])[0], cOpts(s, others), { n: Math.min(4, others.length + 1), stimulus: s, say: fx(blankSay(s)), tip: HTIP[a] });
  };
  const qSort = (R) => {
    const pair = R.pick(H.pairs).slice(0, 3);
    const pool = H.S.filter(([, a]) => pair.includes(a));
    const pick = [];
    for (const w of pair) { const c = pool.filter(([, a]) => a === w); if (c.length) pick.push(...R.sample(c, pair.length === 2 ? 2 : 1)); }
    while (pick.length < 4) { const x = R.pick(pool); if (!pick.includes(x)) pick.push(x); }
    const bins = pair.filter((w) => pick.some(([, a]) => a === w));
    const items = R.shuffle(pick).map(([s, a]) => ({ text: s.replace(BL, '…'), bin: bins.indexOf(a) }));
    return srt(`${id}-s-${pick.map(([s]) => s).sort().join('|')}`, 'Quel mot manque? Place chaque phrase dans la bonne boîte.', bins, items,
      bins.map((b) => HTIP[b]).join(' '));
  };
  const qRight = (R) => {
    const [s, a] = R.pick(H.S);
    let others = groupOf(a).filter((x) => x !== a);
    if (others.length < 2) others = [...others, ...R.pick(H.pairs.filter((g) => !g.includes(a)))];
    return ch(`${id}-3-${s}`, 'Quelle phrase est bien écrite?', fill(s, a), R.sample(others, 2).map((x) => fill(s, x)), { n: 3, tip: HTIP[a] });
  };
  const qDict = (R) => { const [s, a] = R.pick(H.S); return dict(`${id}-d-${s}`, fill(s, a), `Attention au mot « ${a} » : ${HTIP[a]}`); };
  return unit(id, icon, fr, en, pfeq,
    { 1: [qPair], 2: [qGroup, qGroup, qSort], 3: [qRight, qRight, qDict] });
}

/* =============================================================================================
 *  g3f16 : les accents
 * ============================================================================================= */
const ALLW = [...new Set(['g1', 'g2', 'g3'].flatMap((g) => MEQ[g].filter((x) => x.c === 'n' || x.c === 'v' || x.c === 'adj' || (Array.isArray(x.c) && x.c.includes('n'))).map((x) => x.w)))]
  .filter((w) => /^[a-zàâçéèêëîïôûùœ]+$/.test(w) && w.length >= 3);
const ACC = ALLW.filter((w) => /[éèêàâîôûùç]/.test(w));
const ACC_TIP = (w, c) => ({
  é: /é$/.test(w) ? `À la fin d’un mot, le son [é] s’écrit souvent « é » : ${w}.` : `On entend [é] fermé : « é », accent aigu.`,
  è: `On entend [è] ouvert devant une syllabe muette : « è », accent grave (${w}).`,
  ê: `L’accent circonflexe « ê » remplace souvent un ancien s (forêt → forestier).`,
  à: `« à » avec accent grave : ${w}.`, â: `« â » : le a est long, avec un chapeau (${w}).`, î: `« î » : le i porte un chapeau (${w}).`,
  ô: `« ô » : le o porte un chapeau (${w}).`, û: `« û » : le u porte un chapeau (${w}).`, ù: `« ù » : on le voit presque seulement dans « où ».`,
  ç: `« ç » garde le son [s] devant a, o, u (${w}).`,
})[c] || spellTip(w);
const ACC_ALT = { é: ['e', 'è', 'ê'], è: ['e', 'é', 'ê'], ê: ['e', 'é', 'è'], à: ['a', 'â'], â: ['a', 'à'], î: ['i', 'ï'], ô: ['o', 'ö'], û: ['u', 'ù'], ù: ['u', 'û'], ç: ['c', 's'] };
const ACC_HOM = [
  ['Mon chat est assis ___ le divan.', 'sur', ['sûr']], ['Es-tu ___ de vouloir partir?', 'sûr', ['sur']], ['Le chien saute ___ le mur.', 'sur', ['sûr']], ['Je suis ___ que tu vas gagner.', 'sûr', ['sur']],
  ['Le chat grimpe sur le ___ du jardin.', 'mur', ['mûr']], ['Ce fruit n’est pas encore ___.', 'mûr', ['mur']], ['Les bleuets sont bien ___.', 'mûrs', ['murs']], ['Les ___ de ma chambre sont verts.', 'murs', ['mûrs']],
  ['Ton livre est ___, sur la table.', 'là', ['la']], ['Ferme ___ porte, s’il te plaît.', 'la', ['là']], ['Reste ___, je reviens!', 'là', ['la']], ['Je chante ___ chanson.', 'la', ['là']],
  ['Je bois ___ lait au déjeuner.', 'du', ['dû']], ['Il a ___ partir plus tôt.', 'dû', ['du']], ['Elle mange ___ pain.', 'du', ['dû']], ['Nous avons ___ marcher sous la pluie.', 'dû', ['du']],
  ['Le chat ___ faim.', 'a', ['à']], ['On va ___ la plage.', 'à', ['a']], ['Je vais ___ l’épicerie.', 'à', ['a']], ['Ma mère ___ un vélo bleu.', 'a', ['à']],
  ['___ es-tu caché?', 'Où', ['Ou']], ['Du chocolat ___ de la vanille?', 'ou', ['où']], ['La ville ___ je suis né est loin.', 'où', ['ou']], ['Vert ___ jaune?', 'ou', ['où']],
  ['La ___ du chat est douce.', 'tâche', ['tache']], ['Il y a une ___ de jus sur ma chemise.', 'tache', ['tâche']], ['Range ta chambre : c’est ta ___.', 'tâche', ['tache']],
  ['Le chien ronge un ___.', 'os', ['ôs']], ['Il fait chaud, on va à la ___.', 'plage', ['plâge']],
].filter((x) => !['La ___ du chat est douce.', 'Le chien ronge un ___.', 'Il fait chaud, on va à la ___.'].includes(x[0]));
const ACC_HTIP = { sur: '« sur » sans accent = dessus.', sûr: '« sûr » avec accent = certain.', mur: '« mur » sans accent = la paroi.', mûr: '« mûr » avec accent = prêt à manger.',
  mûrs: '« mûrs » avec accent = prêts à manger.', murs: '« murs » sans accent : les parois.', là: '« là » avec accent = à cet endroit.', la: '« la » sans accent est devant un nom.',
  du: '« du » sans accent est devant un nom.', dû: '« dû » avec accent vient du verbe devoir.', a: HTIP.a, à: HTIP.à, Où: HTIP.où, où: HTIP.où, ou: HTIP.ou,
  tâche: '« tâche » avec un chapeau = un travail.', tache: '« tache » sans chapeau = une saleté.' };
function accentUnit() {
  const id = 'g3f16';
  const fakeAcc = (w) => {
    const out = new Set();
    [...w].forEach((c, i) => { for (const r of ACC_ALT[c] || []) { const f = w.slice(0, i) + r + w.slice(i + 1); if (!isReal(f)) out.add(f); } });
    return [...out];
  };
  const W1 = ACC.filter((w) => fakeAcc(w).length >= 2);
  const qPick = (R, level) => {
    const w = R.pick(W1), n = level === 1 ? 3 : 4;
    const c = [...w].find((x) => ACC_ALT[x]);
    return ch(`${id}-p${n}-${w}`, 'Écoute. Quel mot a les bons accents?', w, R.shuffle(fakeAcc(w)), { n, say: fx(w), tip: ACC_TIP(w, c) });
  };
  const qWhich = (R) => {
    const w = R.pick(W1.filter((x) => /[éèê]/.test(x)));
    const i = [...w].findIndex((x) => 'éèê'.includes(x)), c = w[i];
    const st = w.slice(0, i) + '_' + w.slice(i + 1);
    return ch(`${id}-w-${w}`, 'Quel e manque dans le mot?', c, ['é', 'è', 'ê', 'e'].filter((x) => x !== c && !isReal(w.slice(0, i) + x + w.slice(i + 1))),
      { n: 4, stimulus: st, say: fx(w), fixedOrder: true, tip: ACC_TIP(w, c) });
  };
  const qSort = (R) => {
    const pools = ['é', 'è', 'ê'].map((c) => ACC.filter((w) => w.includes(c) && ![...'éèê'].some((d) => d !== c && w.includes(d))));
    const pick = pools.flatMap((p) => R.sample(p, 2));
    return srt(`${id}-s-${pick.slice().sort().join('|')}`, 'Classe les mots selon leur accent.', ['é', 'è', 'ê'],
      R.shuffle(pick).map((w) => ({ text: w, bin: ['é', 'è', 'ê'].findIndex((c) => w.includes(c)) })), 'é = accent aigu, è = accent grave, ê = accent circonflexe.');
  };
  const qHom = (R) => {
    const [s, a, wr] = R.pick(ACC_HOM);
    return ch(`${id}-h-${s}`, 'Avec ou sans accent? Choisis le bon mot.', a, wr, { n: 2, stimulus: s, say: fx(blankSay(s.replace(BL, a))), tip: ACC_HTIP[a] });
  };
  const qWord = (R) => { const w = R.pick(ACC); const c = [...w].find((x) => ACC_ALT[x]); return dictWord(`${id}-d-${w}`, w, `N’oublie pas l’accent! ${ACC_TIP(w, c)}`); };
  return unit(id, '🎩', 'Les accents', 'Accents', 'Orthographe d’usage — les accents (é, è, ê, à, â, î, ô, û, ç) et les homophones avec ou sans accent (sur/sûr, la/là, du/dû)',
    { 1: [qPick, qPick, qWhich], 2: [qWhich, qSort, qPick, qHom], 3: [qWord, qWord, qHom, qPick] });
}

/* =============================================================================================
 *  g3f17 : consonnes doubles
 * ============================================================================================= */
const DBL = ALLW.filter((w) => /([lmnprtfc])|ss/.test(w));
const SGL = ALLW.filter((w) => /[aeiouéèêâ][lmnprtf][aeiouéèê]/.test(w) && !/([lmnprtfsc])\1/.test(w));
const FEM_DBL = [['bon', 'bonne'], ['gentil', 'gentille'], ['chat', 'chatte'], ['chien', 'chienne'], ['lion', 'lionne'], ['gros', 'grosse'], ['épais', 'épaisse'], ['bas', 'basse'],
  ['gardien', 'gardienne'], ['musicien', 'musicienne'], ['mignon', 'mignonne'], ['cruel', 'cruelle'], ['naturel', 'naturelle'], ['muet', 'muette'], ['ancien', 'ancienne'], ['pareil', 'pareille'],
  ['champion', 'championne'], ['magicien', 'magicienne'], ['coquet', 'coquette'], ['canadien', 'canadienne'], ['italien', 'italienne'], ['vieil', 'vieille'], ['nul', 'nulle'], ['fol', 'folle'], ['sot', 'sotte']];
const dblOf = (w) => w.match(/([lmnprtfc])\1|ss/);
function doubleUnit() {
  const id = 'g3f17';
  const fakesD = (w) => {
    const m = dblOf(w); if (!m) return [];
    const i = m.index, d = m[0];
    const single = w.slice(0, i) + d[0] + w.slice(i + 2);
    const out = [single];
    // doubler une autre consonne (en gardant ou non le bon double)
    for (const base of [single, w]) for (let k = 1; k < base.length - 1; k++) {
      const c = base[k];
      if (/[lmnprt]/.test(c) && /[aeiouéèêâ]/.test(base[k - 1]) && /[aeiouéèê]/.test(base[k + 1])) out.push(base.slice(0, k) + c + base.slice(k));
    }
    return [...new Set(out)].filter((x) => x !== w && !isReal(x));
  };
  const fakeSingle = (w) => [...w].map((c, k) => (/[lmnprt]/.test(c) && /[aeiouéèêâ]/.test(w[k - 1] || '') && /[aeiouéèê]/.test(w[k + 1] || '') ? w.slice(0, k) + c + w.slice(k) : null)).filter((x) => x && !isReal(x));
  const D1 = DBL.filter((w) => fakesD(w).length >= 1 && dblOf(w));
  const S1 = SGL.filter((w) => fakeSingle(w).length >= 1);
  const tipD = (w) => { const m = dblOf(w); return `« ${w} » s’écrit avec deux « ${m[0][0]} ».`; };
  const qPick = (R, level) => {
    if (R.chance(0.3)) { const w = R.pick(S1); return ch(`${id}-s${level}-${w}`, 'Écoute. Quel mot est bien écrit?', w, R.shuffle(fakeSingle(w)), { n: 2, say: fx(w), tip: `« ${w} » s’écrit avec une seule consonne.` }); }
    const w = R.pick(D1), n = level === 1 ? 2 : 3;
    const f = [...fakesD(w), ...fakesOf(w).filter((x) => dblOf(x))];
    return ch(`${id}-p${n}-${w}`, 'Écoute. Quel mot est bien écrit?', w, f, { n, say: fx(w), tip: tipD(w) });
  };
  const qOneTwo = (R) => {
    const isD = R.chance(0.6);
    const w = isD ? R.pick(D1) : R.pick(S1);
    let st, a, b;
    if (isD) { const m = dblOf(w); st = w.slice(0, m.index) + '_' + w.slice(m.index + 2); a = m[0]; b = m[0][0]; }
    else { const k = [...w].findIndex((c, i) => /[lmnprt]/.test(c) && /[aeiouéèêâ]/.test(w[i - 1] || '') && /[aeiouéèê]/.test(w[i + 1] || '')); st = w.slice(0, k) + '_' + w.slice(k + 1); a = w[k]; b = w[k] + w[k]; }
    return ch(`${id}-o-${w}`, 'Une ou deux consonnes?', a, [b], { n: 2, stimulus: st, say: fx(w), fixedOrder: false, tip: isD ? tipD(w) : `« ${w} » s’écrit avec une seule consonne.` });
  };
  const qSortD = (R) => {
    const d = R.sample(D1, 3), s = R.sample(S1, 3);
    return srt(`${id}-t-${[...d, ...s].sort().join('|')}`, 'Classe les mots : une consonne ou deux consonnes pareilles?', ['une consonne', 'deux consonnes'],
      R.shuffle([...d.map((text) => ({ text, bin: 1 })), ...s.map((text) => ({ text, bin: 0 }))]), 'Cherche deux lettres pareilles collées : ll, tt, nn, mm, rr, pp, ff, ss.');
  };
  const qFem = (R) => {
    const [m, f] = R.pick(FEM_DBL);
    const wrong = [f.replace(/([lnts])\1e$/, '$1e'), f.replace(/([lnts])\1e$/, '$1$1')].filter((x) => x !== f);
    return ch(`${id}-f-${m}`, `Écris « ${m} » au féminin.`, f, wrong, { n: 3, stimulus: `${m} → ?`, tip: `Au féminin, on double souvent la consonne : ${m} → ${f}.` });
  };
  const qWord = (R) => { const w = R.pick(D1); return dictWord(`${id}-d-${w}`, w, tipD(w)); };
  return unit(id, '👯', 'Les consonnes doubles', 'Double consonants', 'Orthographe d’usage — consonnes doubles (ll, tt, nn, mm, rr, pp, ff, ss) et féminins qui doublent la consonne (bon → bonne)',
    { 1: [qPick, qPick, qOneTwo], 2: [qOneTwo, qSortD, qPick, qFem], 3: [qWord, qWord, qFem, qPick] });
}

/* =============================================================================================
 *  g3f18 : pluriels spéciaux
 * ============================================================================================= */
// [singulier, pluriel, règle]
const PLU = [
  ...['animal', 'cheval', 'journal', 'hôpital', 'métal', 'bocal', 'signal', 'canal', 'mal', 'local', 'cristal', 'tribunal', 'général', 'arsenal'].map((s) => [s, s.replace(/al$/, 'aux'), 'al']),
  ...['festival', 'carnaval', 'bal', 'chacal', 'récital'].map((s) => [s, s + 's', 'als']),
  ...['bateau', 'cadeau', 'château', 'morceau', 'museau', 'agneau', 'ruisseau', 'bureau', 'chapeau', 'oiseau', 'gâteau', 'couteau', 'manteau', 'rideau', 'pinceau', 'drapeau', 'seau', 'chameau', 'tuyau', 'noyau', 'boyau'].map((s) => [s, s + 'x', 'eau']),
  ...['cheveu', 'jeu', 'feu', 'neveu', 'lieu', 'milieu', 'aveu'].map((s) => [s, s + 'x', 'eu']),
  ...['pneu', 'bleu'].map((s) => [s, s + 's', 'eus']),
  ...['bijou', 'caillou', 'chou', 'genou', 'hibou', 'joujou', 'pou'].map((s) => [s, s + 'x', 'oux']),
  ...['trou', 'cou', 'clou', 'sou', 'bisou', 'kangourou', 'verrou', 'matou', 'toutou', 'coucou'].map((s) => [s, s + 's', 'ous']),
  ...['travail', 'vitrail', 'corail', 'émail'].map((s) => [s, s.replace(/ail$/, 'aux'), 'ail']),
  ...['chandail', 'détail', 'éventail', 'rail', 'portail', 'gouvernail'].map((s) => [s, s + 's', 'ails']),
  ...['bras', 'dos', 'nez', 'prix', 'choix', 'corps', 'repas', 'bois', 'souris', 'voix', 'fois', 'pays', 'gaz', 'jus', 'poids', 'mois', 'ours', 'tapis', 'autobus', 'radis'].map((s) => [s, s, 'sxz']),
  ['œil', 'yeux', 'irr'], ['ciel', 'cieux', 'irr'], ['bonhomme', 'bonshommes', 'irr'], ['monsieur', 'messieurs', 'irr'], ['madame', 'mesdames', 'irr'],
];
addKnown(PLU.flatMap((x) => [x[0], x[1]]));
const PRULE = {
  al: 'Les noms en -al font -aux au pluriel : un cheval, des chevaux.',
  als: 'Exception! bal, carnaval, festival, chacal, récital prennent un s.',
  eau: 'Les noms en -eau prennent un x : des bateaux.',
  eu: 'Les noms en -eu prennent un x : des jeux.',
  eus: 'Exception! pneu et bleu prennent un s.',
  oux: 'Retiens les 7 en -ou avec x : bijou, caillou, chou, genou, hibou, joujou, pou.',
  ous: 'Les autres noms en -ou prennent un s : des trous.',
  ail: 'Quelques noms en -ail font -aux : un travail, des travaux.',
  ails: 'La plupart des noms en -ail prennent un s : des chandails.',
  sxz: 'Un nom qui finit déjà par s, x ou z ne change pas au pluriel.',
  irr: 'Ce pluriel est très spécial : il faut le retenir par cœur!',
};
const plFakes = (s, p) => [...new Set([s + 's', s + 'x', s.replace(/al$/, 'aux'), s.replace(/al$/, 'als'), s.replace(/ail$/, 'aux'), s + 'es', s.replace(/s$|x$|z$/, '') + 'x', s.replace(/s$|x$|z$/, 's') + 's', s])].filter((x) => x !== p && x !== s + 's' + 's' && !/ees$/.test(x));
const PART = { œil: 'un œil', ciel: 'le ciel', monsieur: 'monsieur', madame: 'madame' };
const sgOf = (s) => PART[s] || (/^[aeiouéèêhœ]/.test(s) ? `un ${s}` : `un ${s}`);
const PLU_ADJ = [['brutal', 'brutaux'], ['normal', 'normaux'], ['spécial', 'spéciaux'], ['génial', 'géniaux'], ['amical', 'amicaux'], ['original', 'originaux'], ['royal', 'royaux'], ['beau', 'beaux'],
  ['nouveau', 'nouveaux'], ['jumeau', 'jumeaux'], ['gros', 'gros'], ['heureux', 'heureux'], ['vieux', 'vieux'], ['mauvais', 'mauvais'], ['gris', 'gris'], ['doux', 'doux'], ['épais', 'épais']];
const PLU_FR = ['Il y a deux ___ dans l’image.', 'Nous avons vu trois ___.', 'J’ai compté cinq ___.', 'Mes ___ sont là.', 'Les ___ sont nombreux.'];
function pluralUnit() {
  const id = 'g3f18';
  const N = PLU.filter(([s]) => !['monsieur', 'madame'].includes(s));
  const qPl = (R, level) => {
    const [s, p, r] = R.pick(level === 1 ? N.filter((x) => x[2] !== 'irr') : PLU), n = level === 1 ? 3 : 4;
    return ch(`${id}-p${n}-${s}`, `Quel est le pluriel de « ${s} »?`, p, R.shuffle(plFakes(s, p)), { n, stimulus: `${sgOf(s)} → ${['monsieur', 'madame'].includes(s) ? '?' : 'des ?'}`, tip: PRULE[r] });
  };
  const qSort = (R) => {
    const kinds = [['s', ['als', 'eus', 'ous', 'ails']], ['x', ['eau', 'eu', 'oux']], ['ne change pas', ['sxz']]];
    const pick = kinds.flatMap(([, rs]) => R.sample(N.filter((x) => rs.includes(x[2])), 2));
    return srt(`${id}-s-${pick.map((x) => x[0]).sort().join('|')}`, 'Au pluriel, ce nom prend…', ['un s', 'un x', 'rien (il ne change pas)'],
      R.shuffle(pick).map(([s, , r]) => ({ text: s, bin: kinds.findIndex(([, rs]) => rs.includes(r)) })), 'eau, eu → x ; 7 mots en -ou → x ; s, x, z à la fin → ne change pas.');
  };
  const qAux = (R) => {
    const [s, p, r] = R.pick(N.filter((x) => ['al', 'als', 'ail', 'ails', 'oux', 'ous'].includes(x[2])));
    const fr = R.pick(PLU_FR);
    return ch(`${id}-a-${s}-${fr}`, `Complète avec le pluriel de « ${s} ».`, p, R.shuffle(plFakes(s, p)), { n: 3, stimulus: fr, say: fx(`Complète avec le pluriel de ${s}.`), tip: PRULE[r] });
  };
  const GNS = [['un cadeau original', 'des cadeaux originaux'], ['le château royal', 'les châteaux royaux'], ['ce jeu amical', 'ces jeux amicaux'], ['mon nouveau bateau', 'mes nouveaux bateaux'],
    ['le beau chapeau', 'les beaux chapeaux'], ['ce gros caillou', 'ces gros cailloux'], ['le vieux hibou', 'les vieux hiboux'], ['mon genou blessé', 'mes genoux blessés'],
    ['le nouveau journal', 'les nouveaux journaux'], ['un animal génial', 'des animaux géniaux'], ['le cheval brutal', 'les chevaux brutaux'], ['ce gâteau spécial', 'ces gâteaux spéciaux'],
    ['un travail original', 'des travaux originaux'], ['mon chandail bleu', 'mes chandails bleus'], ['le pneu neuf', 'les pneus neufs'], ['l’oiseau bleu', 'les oiseaux bleus'],
    ['le bijou précieux', 'les bijoux précieux'], ['ce trou profond', 'ces trous profonds'], ['mon cheveu gris', 'mes cheveux gris'], ['le jumeau joyeux', 'les jumeaux joyeux'],
    ['le nez rouge', 'les nez rouges'], ['ce prix spécial', 'ces prix spéciaux'], ['le carnaval amusant', 'les carnavals amusants'], ['le festival musical', 'les festivals musicaux'],
    ['le chou frais', 'les choux frais'], ['un repas normal', 'des repas normaux'], ['le bocal plein', 'les bocaux pleins'], ['un hôpital moderne', 'des hôpitaux modernes'],
    ['le manteau chaud', 'les manteaux chauds'], ['un clou rouillé', 'des clous rouillés'], ['le kangourou curieux', 'les kangourous curieux'], ['ce morceau épais', 'ces morceaux épais'],
    ['le signal lumineux', 'les signaux lumineux'], ['ton bras musclé', 'tes bras musclés'], ['le corail rose', 'les coraux roses'], ['un tapis doux', 'des tapis doux']];
  const naive = (w) => (/[sxz]$/.test(w) ? w : w + 's');
  const qGN = (R) => {
    const [sg, pl] = R.pick(GNS);
    const a = sg.replace('’', '’ ').split(' '), b = pl.split(' ');
    const ai = a.length === b.length + 1 ? a.slice(1) : a.slice(1), bi = b.slice(1);   // sans le déterminant
    const det = b[0];
    const tries = [ai.map(naive), [bi[0], ...ai.slice(1).map(naive)], [naive(ai[0]), ...bi.slice(1)], [bi[0], ...ai.slice(1)], [ai[0], ...bi.slice(1)], [ai[0] + 'x', ...bi.slice(1)], [bi[0], ...bi.slice(1).map((w) => (/s$/.test(w) ? w.slice(0, -1) : w + 's'))]]
      .map((t) => `${det} ${t.join(' ')}`).filter((x) => x !== pl);
    const noun = ai.find((w) => PLU.some((x) => x[0] === w)) || ai[0];
    const rule = (PLU.find((x) => x[0] === noun) || [])[2];
    return ch(`${id}-g-${sg}`, 'Écris ce groupe du nom au pluriel.', pl, R.shuffle(tries), { n: 3, stimulus: `${sg} → ?`, tip: `${rule ? PRULE[rule] + ' ' : ''}Accorde aussi l’adjectif : ${pl}.` });
  };
  const qHand = (R) => {
    const [s, p, r] = R.pick(N);
    return ans(`${id}-h-${s}`, 'Écris ce nom au pluriel.', `un ${s} → des…`, `« des ${p} » (le mot « ${p} », bien orthographié). ${PRULE[r]}`, PRULE[r], 1);
  };
  return unit(id, '🐎', 'Les pluriels spéciaux', 'Special plurals', 'Orthographe grammaticale — pluriels en -aux, -eaux, -eux, -oux, -ails ; noms en s, x, z invariables ; accord dans le groupe du nom',
    { 1: [qPl, qPl, qSort], 2: [qPl, qAux, qSort, qAux], 3: [qGN, qGN, qHand, qPl] });
}

/* =============================================================================================
 *  g3f19 : féminins spéciaux
 * ============================================================================================= */
// [masculin, féminin, règle, nom(n)/adjectif(a)]
const FEM = [
  ...[['chanteur', 'chanteuse'], ['danseur', 'danseuse'], ['chasseur', 'chasseuse'], ['vendeur', 'vendeuse'], ['coiffeur', 'coiffeuse'], ['nageur', 'nageuse'], ['joueur', 'joueuse'], ['menteur', 'menteuse'], ['patineur', 'patineuse'], ['skieur', 'skieuse'], ['voleur', 'voleuse']].map(([m, f]) => [m, f, 'euse', 'n']),
  ...[['acteur', 'actrice'], ['directeur', 'directrice'], ['moniteur', 'monitrice'], ['conducteur', 'conductrice'], ['animateur', 'animatrice'], ['explorateur', 'exploratrice'], ['lecteur', 'lectrice'], ['instituteur', 'institutrice']].map(([m, f]) => [m, f, 'trice', 'n']),
  ...[['docteur', 'docteure'], ['professeur', 'professeure'], ['ingénieur', 'ingénieure']].map(([m, f]) => [m, f, 'eure', 'n']),
  ...[['boulanger', 'boulangère'], ['fermier', 'fermière'], ['pâtissier', 'pâtissière'], ['cuisinier', 'cuisinière'], ['écolier', 'écolière'], ['policier', 'policière'], ['épicier', 'épicière']].map(([m, f]) => [m, f, 'ère', 'n']),
  ...[['premier', 'première'], ['cher', 'chère'], ['fier', 'fière'], ['léger', 'légère'], ['dernier', 'dernière'], ['entier', 'entière']].map(([m, f]) => [m, f, 'ère', 'a']),
  ...[['neuf', 'neuve'], ['sportif', 'sportive'], ['vif', 'vive'], ['actif', 'active'], ['naïf', 'naïve'], ['attentif', 'attentive'], ['créatif', 'créative']].map(([m, f]) => [m, f, 've', 'a']),
  ...[['heureux', 'heureuse'], ['amoureux', 'amoureuse'], ['joyeux', 'joyeuse'], ['peureux', 'peureuse'], ['curieux', 'curieuse'], ['paresseux', 'paresseuse'], ['jaloux', 'jalouse'], ['courageux', 'courageuse'], ['délicieux', 'délicieuse']].map(([m, f]) => [m, f, 'se', 'a']),
  ...[['gardien', 'gardienne'], ['musicien', 'musicienne'], ['magicien', 'magicienne'], ['mécanicien', 'mécanicienne'], ['comédien', 'comédienne'], ['chien', 'chienne']].map(([m, f]) => [m, f, 'enne', 'n']),
  ...[['ancien', 'ancienne'], ['canadien', 'canadienne']].map(([m, f]) => [m, f, 'enne', 'a']),
  ...[['lion', 'lionne'], ['champion', 'championne'], ['patron', 'patronne'], ['espion', 'espionne']].map(([m, f]) => [m, f, 'onne', 'n']),
  ...[['bon', 'bonne'], ['mignon', 'mignonne']].map(([m, f]) => [m, f, 'onne', 'a']),
  ...[['cruel', 'cruelle'], ['naturel', 'naturelle'], ['réel', 'réelle'], ['gentil', 'gentille'], ['pareil', 'pareille']].map(([m, f]) => [m, f, 'lle', 'a']),
  ...[['muet', 'muette'], ['coquet', 'coquette']].map(([m, f]) => [m, f, 'ette', 'a']),
  ...[['complet', 'complète'], ['inquiet', 'inquiète'], ['secret', 'secrète']].map(([m, f]) => [m, f, 'ète', 'a']),
  ...[['gros', 'grosse'], ['bas', 'basse'], ['épais', 'épaisse'], ['gras', 'grasse']].map(([m, f]) => [m, f, 'sse', 'a']),
  ...[['beau', 'belle'], ['nouveau', 'nouvelle'], ['vieux', 'vieille'], ['fou', 'folle'], ['blanc', 'blanche'], ['sec', 'sèche'], ['frais', 'fraîche'], ['long', 'longue'], ['doux', 'douce'], ['roux', 'rousse'], ['faux', 'fausse']].map(([m, f]) => [m, f, 'irr', 'a']),
  ...[['roi', 'reine'], ['homme', 'femme'], ['garçon', 'fille'], ['oncle', 'tante'], ['père', 'mère'], ['frère', 'sœur'], ['coq', 'poule'], ['cheval', 'jument'], ['taureau', 'vache'], ['neveu', 'nièce'], ['parrain', 'marraine'], ['héros', 'héroïne'], ['prince', 'princesse'], ['maître', 'maîtresse']].map(([m, f]) => [m, f, 'mot', 'n']),
];
addKnown(FEM.flatMap((x) => [x[0], x[1]]));
const FRULE = {
  euse: '-eur devient souvent -euse : un danseur, une danseuse.',
  trice: '-teur devient souvent -trice : un acteur, une actrice.',
  eure: 'Au Québec, on dit une docteure, une professeure : on ajoute un e.',
  ère: '-er devient -ère, avec un accent grave : fier → fière.',
  ve: '-f devient -ve : neuf → neuve.',
  se: '-eux devient -euse : heureux → heureuse.',
  enne: '-ien devient -ienne : on double le n.',
  onne: '-on devient -onne : on double le n.',
  lle: '-el et -il deviennent -elle, -ille : on double le l.',
  ette: '-et devient souvent -ette : muet → muette.',
  ète: 'Attention! complet, inquiet, secret font -ète, avec un accent.',
  sse: 'Ici, on double le s : gros → grosse.',
  irr: 'Ce féminin est spécial : il faut le retenir par cœur!',
  mot: 'Ici, le féminin est un mot complètement différent.',
};
const IRRF = { beau: ['beaue', 'bele'], nouveau: ['nouveaue', 'nouvele'], vieux: ['vieuse', 'vieuxe'], fou: ['foue', 'foule'], blanc: ['blance', 'blanque'], sec: ['sece', 'sèque'],
  frais: ['fraise', 'fraiche'], long: ['longe', 'lonque'], doux: ['douse', 'douxe'], roux: ['rouse', 'rousse'], faux: ['fause', 'fauxe'] };
const femFakes = (m, f) => {
  const c = [m + 'e', ...(IRRF[m] || [])];
  const rep = [[/teur$/, 'trice'], [/teur$/, 'teuse'], [/eur$/, 'euse'], [/eur$/, 'eure'], [/eur$/, 'euze'], [/er$/, 'ère'], [/er$/, 'ere'], [/er$/, 'aire'], [/f$/, 've'], [/f$/, 'fe'],
    [/x$/, 'se'], [/x$/, 'sse'], [/x$/, 'ce'], [/n$/, 'ne'], [/n$/, 'nne'], [/l$/, 'le'], [/l$/, 'lle'], [/t$/, 'te'], [/t$/, 'tte'], [/et$/, 'ète'], [/s$/, 'se'], [/s$/, 'sse']];
  for (const [re, r] of rep) if (re.test(m)) c.push(m.replace(re, r));
  return [...new Set(c)].filter((x) => x !== f && x !== m);
};
const ART = (n, f) => (/^[aeiouéèêh]/i.test(f) ? 'l’' : 'la ');
function femUnit() {
  const id = 'g3f19';
  const RUL = FEM.filter((x) => femFakes(x[0], x[1]).length >= 2 || x[2] === 'mot');
  const fakesFor = (m, f, r, R) => (r === 'mot' ? R.sample(FEM.filter((x) => x[2] === 'mot' && x[1] !== f).map((x) => x[1]), 3) : R.shuffle(femFakes(m, f)));
  const qF = (R, level) => {
    const [m, f, r, k] = R.pick(level === 1 ? RUL.filter((x) => !['irr', 'ète', 'eure'].includes(x[2])) : RUL), n = level === 1 ? 3 : 4;
    return ch(`${id}-f${n}-${m}`, `Quel est le féminin de « ${m} »?`, f, fakesFor(m, f, r, R), { n, stimulus: k === 'n' ? `un ${m} → une ?` : `il est ${m} → elle est ?`, tip: FRULE[r] });
  };
  const qSort = (R) => {
    const B = [['-euse', ['euse', 'se']], ['-trice', ['trice']], ['-ère', ['ère']]];
    const pick = B.flatMap(([, rs]) => R.sample(FEM.filter((x) => rs.includes(x[2]) && /(eur|eux|er|ier)$/.test(x[0])), 2));
    return srt(`${id}-s-${pick.map((x) => x[0]).sort().join('|')}`, 'Comment se termine le féminin?', B.map((b) => b[0]),
      R.shuffle(pick).map(([m, , r]) => ({ text: m, bin: B.findIndex(([, rs]) => rs.includes(r)) })), 'chanteur → chanteuse ; acteur → actrice ; fermier → fermière ; heureux → heureuse.');
  };
  const FR2 = ['Ma voisine est une ___ très connue.', 'Hier, j’ai rencontré une ___.', 'Cette ___ travaille fort.', 'Dans l’histoire, il y a une ___.'];
  const qSent = (R) => {
    const [m, f, r] = R.pick(FEM.filter((x) => x[3] === 'n' && x[2] !== 'mot' && x[0] !== 'chien' && x[0] !== 'lion'));
    const fr = R.pick(FR2);
    return ch(`${id}-n-${m}-${fr}`, `Complète avec le féminin de « ${m} ».`, f, R.shuffle(femFakes(m, f)), { n: 4, stimulus: fr, say: fx(`Complète avec le féminin de ${m}.`), tip: FRULE[r] });
  };
  const GNN = [['chat', 'chatte'], ['chien', 'chienne'], ['lion', 'lionne'], ['voisin', 'voisine'], ['ami', 'amie'], ['cousin', 'cousine'], ['ours', 'ourse'], ['renard', 'renarde'], ['danseur', 'danseuse'], ['joueur', 'joueuse'], ['musicien', 'musicienne'], ['champion', 'championne']];
  const GNA = FEM.filter((x) => x[3] === 'a' && !['premier', 'dernier', 'entier', 'réel', 'complet', 'secret', 'pareil', 'ancien', 'canadien', 'muet', 'coquet', 'cher', 'naturel', 'faux', 'beau', 'nouveau', 'vieux', 'long', 'bas', 'gras', 'gros', 'bon', 'mignon', 'délicieux', 'sec', 'frais', 'blanc', 'épais', 'naïf', 'neuf'].includes(x[0]));
  const qGN = (R) => {
    const [nm, nf] = R.pick(GNN), [am, af, r] = R.pick(GNA);
    const elid = /^[aeiouéèêh]/i.test(nm);
    const sg = `${elid ? 'l’' : 'le '}${nm} ${am}`, fe = `${elid ? 'l’' : 'la '}${nf} ${af}`;
    const wr = [`${elid ? 'l’' : 'la '}${nf} ${am}`, `${elid ? 'l’' : 'la '}${nf} ${am}e`, `${elid ? 'l’' : 'la '}${nm} ${af}`].filter((x) => x !== fe);
    return ch(`${id}-g-${nm}-${am}`, 'Écris ce groupe du nom au féminin.', fe, R.shuffle(wr), { n: 3, stimulus: `${sg} → ?`, tip: `Le nom ET l’adjectif changent. ${FRULE[r]}` });
  };
  const qHand = (R) => {
    const [m, f, r, k] = R.pick(FEM);
    return ans(`${id}-h-${m}`, 'Écris le féminin.', k === 'n' ? `un ${m} → une…` : `il est ${m} → elle est…`, `« ${f} », bien orthographié. ${FRULE[r]}`, FRULE[r], 1);
  };
  return unit(id, '👑', 'Les féminins spéciaux', 'Special feminine forms', 'Orthographe grammaticale — féminin des noms et des adjectifs (-euse, -trice, -ère, -ve, -euse, -enne, -onne, -elle, féminins irréguliers ; docteure, professeure)',
    { 1: [qF, qF, qSort], 2: [qF, qSent, qSort, qSent], 3: [qGN, qGN, qHand, qF] });
}

/* ============================================================================================= */
export const units = [
  ...THEMES.map(themeUnit),
  homoUnit('g3f13', '🎯', 'Homophones : a/à, et/est, son/sont, on/ont, ou/où', 'Homophones (review)', 'Orthographe grammaticale — homophones : a/à, et/est, son/sont, on/ont, ou/où (révision et application)', H13),
  homoUnit('g3f14', '🪞', 'Homophones : ces/ses, c’est/s’est, ce/se', 'Homophones: ces/ses, c’est/s’est', 'Orthographe grammaticale — homophones : ces/ses, c’est/s’est, ce/se', H14),
  homoUnit('g3f15', '🧲', 'Homophones : leur/leurs, peu/peut, sans/s’en, quand/qu’en, mes/mais', 'Homophones: leur, peu, sans, quand, mes', 'Orthographe grammaticale — homophones : leur/leurs, peu/peut/peux, sans/s’en/cent, quand/qu’en, mes/mais/met', H15),
  accentUnit(),
  doubleUnit(),
  pluralUnit(),
  femUnit(),
];
