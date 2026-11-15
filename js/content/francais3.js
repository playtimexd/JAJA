// Petit Hibou — français écrit à la main (type `hand`) : dictée, réponse écrite, phrases, petits textes.
// Niveaux : 1 = fin de 2e année, 2 = 3e année, 3 = 3e forte / début de 4e. Textes originaux, orthographe du Québec.

const FR = 'fr-CA';
const hand = (o) => ({ type: 'hand', lang: 'fr', ...o });

/* ------------------------------------------------------------------ */
/*  f15 — La dictée                                                    */
/* ------------------------------------------------------------------ */
const DICT = {
  1: [
    'le chat', 'la maison', 'un bonbon', 'une fenêtre', 'l’école', 'mon ami', 'la neige', 'le soleil', 'une pomme', 'le café',
    'un cheval', 'la forêt', 'un livre', 'une banane', 'une carotte', 'l’été', 'une fée', 'le chapeau', 'la campagne', 'un canard',
    'Le chat dort.', 'Papa lit un livre.', 'Je mange une pomme.', 'Le chien dort sur mon lit.', 'Maman a un joli sac.',
    'Nous allons à l’école.', 'Il neige sur la ville.', 'Le soleil se lève.', 'Léa joue dans la cour.', 'J’aime mon petit frère.',
    'La fille chante une chanson.', 'Un oiseau vole.', 'Tu as une bonne idée.', 'Le bébé a peur.', 'La lune est jaune.',
    'Mon ami a un vélo.', 'Le garçon mange du pain.', 'Il fait froid aujourd’hui.', 'Ma sœur lit une histoire.', 'Le lapin est dans le jardin.',
    'Julie a mis son chapeau.', 'Nous jouons avec mon frère.', 'L’auto est rouge.', 'Il y a un oiseau dans l’arbre.', 'Le poisson nage dans l’eau.',
    'Je prends mon sac.', 'Elle ouvre la porte.', 'Le train arrive à midi.', 'Les enfants jouent.', 'J’ai une belle robe.',
    'Ma tante est dans la ville.', 'Le roi est très fort.', 'Il fait froid ce matin.', 'Tu veux du pain?', 'Où est ma robe?',
    'Voici ma maison.', 'La banane est jaune.', 'Je vais dans ma chambre.', 'Le canard est sur l’étang.', 'Papa fait du café.',
    'Mon chien est grand.', 'Les fleurs sont jolies.',
    'Ma sœur a un an.', 'Viens ici, mon chat.', 'Il est là.', 'Je n’ai ni sac ni livre.', 'Aujourd’hui, il neige.', 'Nous partons parce que la nuit tombe.', 'Mon chat est à côté de moi.',
  ],
  2: [
    'Les enfants jouent dans la cour.', 'Mes amis ont de beaux vélos.', 'Les petits oiseaux chantent le matin.', 'Ma grand-mère prépare des tartes aux pommes.',
    'Les chevaux courent dans le grand champ.', 'Nous avons mangé des fraises sucrées.', 'Mon frère porte de gros souliers noirs.', 'Les élèves lisent des histoires amusantes.',
    'Cet hiver, il y a beaucoup de neige.', 'Le professeur parle aux élèves.', 'Les poules restent dans la cour.', 'Mon père ferme la vieille porte.',
    'Les grands bateaux arrivent bientôt.', 'Ma cousine a des yeux verts.', 'Les enfants arrivent avant midi.', 'Samedi, nous irons au parc avec nos voisins.',
    'Les petites filles portent des chapeaux rouges.', 'Le gentil voisin apporte un cadeau.', 'Tous les soirs, je brosse mes dents.', 'Les nuages gris cachent le soleil.',
    'Mes parents achètent du pain frais.', 'Les souris se cachent dans le trou.', 'Ma sœur a perdu ses gants bleus.', 'Dans la forêt, les arbres sont très hauts.',
    'Les musiciens jouent une belle chanson.', 'Mon oncle prépare un café chaud.', 'Nous mettons nos bottes dans le couloir.', 'Les oiseaux volent autour de la maison.',
    'Mon ami Samuel aime les animaux.', 'Les pompiers arrivent très vite sur place.', 'La neige tombe sur les maisons.', 'J’ai reçu deux beaux cadeaux pour ma fête.',
    'Les lapins mangent des carottes fraîches.', 'Ce soir, nous regardons un film en famille.', 'Les vieux livres sentent bon le papier.', 'Les feuilles tombent des grands érables.',
    'Mes cousins habitent dans une ferme.', 'La petite fille a mangé toute sa soupe.', 'Les enfants cherchent le vieux château.', 'Le soir, les étoiles brillent dans le ciel.',
    'Les gentils chiens jouent avec les enfants.', 'Ma mère met la table pour le souper.', 'Les patineurs glissent sur la glace.', 'Deux chats courent dans la cour.',
    'Les petits canards suivent leur maman.', 'Mon voisin a trouvé un chat jaune.', 'Les élèves attendent l’autobus devant l’école.', 'Les fruits sont bons en été.',
    'Hier, nous avons fait un bonhomme de neige.', 'Les hiboux dorment le jour dans l’arbre.', 'La directrice parle aux nouveaux élèves.', 'Les grandes montagnes sont couvertes de neige.',
    'Nos voisins ont acheté deux autos.', 'Mes parents mangent des légumes verts.', 'Mon petit frère aime son nouveau vélo.', 'Au printemps, les arbres ont de nouvelles feuilles.',
    'Le bateau avance lentement.', 'Les gens écoutent une belle chanson.', 'La rivière traverse les champs de blé.', 'Mes amies dessinent de jolis animaux.',
    'Les enfants cachent les cadeaux.', 'Ils ont pris leurs chandails chauds.', 'Les fleurs du jardin sentent bon.', 'Chaque jour, nous lisons vingt minutes.',
  ],
  3: [
    'Ma sœur a mangé une pomme et elle est allée à la patinoire avec ses amis.',
    'Mon frère et moi, nous sommes allés à la bibliothèque pour emprunter des livres.',
    'Les enfants sont contents, car leur père a promis de les emmener au cinéma.',
    'Samedi dernier, nous avons skié sur la montagne et nous avons bu du chocolat chaud.',
    'Elle a oublié son manteau à l’école, alors elle est retournée le chercher.',
    'Mes cousins sont arrivés hier soir et ils ont dormi dans le salon.',
    'Quand il pleut, mon chat reste sur son coussin et il regarde par la fenêtre.',
    'Les élèves ont écouté l’histoire que la bibliothécaire leur a racontée.',
    'Son chien a aboyé toute la nuit, ce qui a réveillé tous les voisins.',
    'Nous avons choisi une belle pomme rouge et nous l’avons coupée en quatre morceaux.',
    'Le docteur se lève chaque matin pour aider les gens malades.',
    'Mes parents sont partis au marché et ils ont rapporté des légumes de la ferme.',
    'Ils sont heureux, car leur équipe a gagné la partie de hockey ce matin.',
    'Léa a donné son cadeau à son amie et elles ont joué ensemble toute la journée.',
    'Sur le chemin de l’école, j’ai vu un écureuil qui cachait des noisettes.',
    'Mon grand-père apporte de belles roses à ma grand-mère chaque été.',
    'Les musiciens ont joué une chanson que tout le monde connaissait par cœur.',
    'Elle est allée chez le dentiste, et il a dit que ses dents sont en santé.',
    'Les skieurs sont montés en haut de la piste avant que le soleil se couche.',
    'Mon voisin a trouvé un chaton perdu et il l’a ramené à la maison.',
    'Les garçons jouent au ballon pendant que les filles chantent dans la cour.',
    'Nous avons fait un bonhomme de neige avec une carotte pour le nez.',
    'Il a mis sa tuque et ses mitaines parce qu’il fait très froid dehors.',
    'Les enfants sont rentrés tout mouillés, mais ils avaient glissé toute l’après-midi.',
    'Ma mère a préparé une soupe aux légumes que mon père a trouvée délicieuse.',
    'Quand les feuilles tombent, mon frère et moi, nous ramassons des tas de feuilles rouges.',
    'Le professeur a posé une question et les élèves ont répondu ensemble.',
    'Elles ont écrit une lettre à leur grand-mère et elles l’ont apportée lundi.',
    'Ce matin, il neige et les enfants sont déjà sortis dehors.',
    'Mon ami a perdu son sac à dos, mais un élève l’a retrouvé dans la cour.',
    'La voisine a offert des biscuits à tous les enfants qui ont sonné.',
    'Nous sommes allés dans un hôpital où les docteurs sont très gentils.',
    'Les chasseurs marchent lentement pour ne pas faire de bruit.',
    'Mon petit cousin a peur du noir, alors sa mère laisse une veilleuse allumée.',
    'Les adultes ont regardé le ciel et ils ont vu un avion passer.',
    'Il a plu pendant une semaine, mais le soleil est revenu dimanche matin.',
    'Mes amis et moi, nous avons trouvé une boîte dans le jardin.',
    'Le professeur a changé de place et les élèves ont commencé leur lecture.',
    'Vous avez couru si vite que vous êtes arrivés avant tous les autres.',
    'Au dîner, mon père a raconté une blague qui a fait rire toute la famille.',
    'Mon oncle a attrapé un gros poisson et il l’a apporté à la maison.',
    'Tu as mis tes bottes dans le garage parce qu’elles étaient pleines de boue.',
    'Mon oncle est docteur, il aide les gens et il soigne les enfants.',
    'Ils ont installé une mangeoire pour que les oiseaux viennent manger en hiver.',
    'Sa grand-mère a acheté des bas chauds que ses enfants portent en hiver.',
    'Ma tante a pris des œufs et elle a préparé du pain pour toute la famille.',
    'Nous sommes allés au cinéma avec nos cousins et nous avons bien ri.',
    'La classe a gagné le concours, alors la directrice leur a offert une journée de jeux.',
    'Ce soir, mes parents sont sortis, mais mes grands-parents viennent nous garder.',
    'Il est tombé de son vélo, mais il s’est relevé et il a continué sa route.',
    'Les enfants ont couru dans la cour et tout le monde a bien ri.',
    'Elle a pris son vélo et elle est arrivée avant tout le monde.',
    'Mes voisins ont une piscine, et nous y allons quand il fait très chaud.',
    'On a entendu un grand bruit, puis le ciel est devenu tout noir.',
    'Le petit garçon a cherché ses lunettes partout, et elles étaient sur son nez.',
    'Les élèves de ma classe sont partis à midi et ils sont revenus avant la nuit.',
    'Mon père et ma mère ont décidé de peindre ma chambre en bleu clair.',
    'Elle a fermé la porte doucement, car son petit frère dormait encore.',
    'Mes chandails sont dans le tiroir, et mes pantalons sont sur la chaise.',
    'Les enfants sont montés dans l’autobus et ils ont chanté pendant tout le voyage.',
    'Il a mangé tous ses légumes, puis il a demandé un deuxième morceau de tarte.',
  ],
};

/* ------------------------------------------------------------------ */
/*  f17 — J’écris des phrases                                          */
/* ------------------------------------------------------------------ */
// L1 : [mot, emoji]
const S1 = [
  ['chat', '🐱'], ['chien', '🐶'], ['soleil', '☀️'], ['neige', '❄️'], ['pomme', '🍎'], ['maison', '🏠'], ['ballon', '⚽'], ['auto', '🚗'], ['livre', '📖'], ['fleur', '🌸'],
  ['arbre', '🌳'], ['poisson', '🐟'], ['oiseau', '🐦'], ['lune', '🌙'], ['étoile', '⭐'], ['gâteau', '🎂'], ['vélo', '🚲'], ['train', '🚂'], ['bateau', '⛵'], ['avion', '✈️'],
  ['lapin', '🐰'], ['cheval', '🐴'], ['vache', '🐮'], ['cochon', '🐷'], ['grenouille', '🐸'], ['papillon', '🦋'], ['escargot', '🐌'], ['tortue', '🐢'], ['ours', '🐻'], ['renard', '🦊'],
  ['hibou', '🦉'], ['canard', '🦆'], ['souris', '🐭'], ['fraise', '🍓'], ['banane', '🍌'], ['carotte', '🥕'], ['fromage', '🧀'], ['pain', '🍞'], ['biscuit', '🍪'], ['crème glacée', '🍦'],
  ['parapluie', '☂️'], ['nuage', '☁️'], ['arc-en-ciel', '🌈'], ['montagne', '⛰️'], ['plage', '🏖️'], ['château', '🏰'], ['cadeau', '🎁'], ['ballon de plage', '🏐'], ['guitare', '🎸'], ['crayon', '✏️'],
  ['horloge', '⏰'], ['clé', '🔑'], ['lunettes', '👓'], ['chapeau', '🎩'], ['botte', '👢'], ['tracteur', '🚜'], ['camion de pompier', '🚒'], ['robot', '🤖'], ['dinosaure', '🦖'], ['hockey', '🏒'],
  ['patin', '⛸️'], ['ski', '🎿'],
];
// L2 : [mot1, mot2, emojis]
const S2 = [
  ['chat', 'dormir', '🐱💤'], ['neige', 'glisser', '❄️🛷'], ['soleil', 'plage', '☀️🏖️'], ['pomme', 'manger', '🍎😋'], ['ballon', 'jouer', '⚽🧒'],
  ['pluie', 'parapluie', '🌧️☂️'], ['vélo', 'rouler', '🚲💨'], ['livre', 'lire', '📖👧'], ['gâteau', 'fête', '🎂🎉'], ['poisson', 'nager', '🐟🌊'],
  ['oiseau', 'nid', '🐦🪺'], ['lune', 'étoiles', '🌙⭐'], ['train', 'gare', '🚂🚉'], ['bateau', 'lac', '⛵🏞️'], ['avion', 'nuages', '✈️☁️'],
  ['lapin', 'carotte', '🐰🥕'], ['abeille', 'fleur', '🐝🌼'], ['tortue', 'lentement', '🐢🐌'], ['hibou', 'nuit', '🦉🌙'], ['renard', 'forêt', '🦊🌲'],
  ['hockey', 'patinoire', '🏒⛸️'], ['ski', 'montagne', '🎿⛰️'], ['bonhomme de neige', 'carotte', '⛄🥕'], ['cadeau', 'ruban', '🎁🎀'], ['château', 'roi', '🏰👑'],
  ['pirate', 'trésor', '🏴‍☠️💰'], ['robot', 'aider', '🤖🤝'], ['dinosaure', 'grand', '🦖🌿'], ['astronaute', 'fusée', '👩‍🚀🚀'], ['pompier', 'échelle', '🧑‍🚒🪜'],
  ['jardin', 'arroser', '🌻💧'], ['pique-nique', 'panier', '🧺🥪'], ['tente', 'feu', '⛺🔥'], ['piscine', 'plonger', '🏊💦'], ['musique', 'chanter', '🎵🎤'],
  ['dessin', 'crayons', '🖍️🖼️'], ['école', 'cahier', '🏫📓'], ['boulangerie', 'baguette', '🥖🧁'], ['marché', 'légumes', '🧺🥦'], ['cuisine', 'soupe', '🍲👩‍🍳'],
  ['tracteur', 'ferme', '🚜🐄'], ['sirop', 'érable', '🍁🍯'], ['hiver', 'tuque', '🧣🧢'], ['automne', 'feuilles', '🍂🍁'], ['printemps', 'fleurs', '🌷🐛'],
  ['été', 'chaleur', '🌞🍉'], ['orage', 'tonnerre', '⛈️⚡'], ['arc-en-ciel', 'pluie', '🌈🌦️'], ['souris', 'fromage', '🐭🧀'], ['chien', 'os', '🐕🦴'],
  ['canard', 'mare', '🦆💧'], ['grenouille', 'sauter', '🐸🌿'], ['escargot', 'feuille', '🐌🍃'], ['papillon', 'ailes', '🦋🌈'], ['vache', 'herbe', '🐮🌾'],
  ['ours', 'miel', '🐻🍯'], ['baleine', 'océan', '🐋🌊'], ['pingouin', 'glace', '🐧🧊'], ['singe', 'banane', '🐒🍌'], ['girafe', 'cou', '🦒🌳'],
];
// L3 : scènes d’emojis
const S3 = [
  '🏒⛸️❄️', '🏖️☀️🏄', '🌧️☂️🐸', '🎂🎈🎁', '🏕️🔥🌲', '🚒🔥🏠', '🛷❄️⛄', '🍎🌳🧺', '🐝🌻🍯', '🚜🌾🐄',
  '🏫📚✏️', '🎡🎠🍭', '🐶🦴🏡', '🚀🌙⭐', '🏊💦☀️', '🍕🍟🥤', '🎻🎶🎭', '🌈☔🌳', '⛵🌊🐬', '🏔️🎿🧣',
  '🦆🌊🍞', '🐢🐇🏁', '🎨🖌️🖼️', '🍁🍂🧒', '🌽🧑‍🌾🚜', '🐋🌊🚢', '🏰👑🐉', '🔦🌙🦉', '⚽🥅🏃', '🚲🌳💨',
  '🛒🥕🍎', '🎄🎁⛄', '🎃🌙🕯️', '🐧🧊❄️', '📖🛋️🧸', '🍳🥞☕', '🦕🌋🌿', '🧁🎂🍰', '🦊🍂🌲', '🌻🐝🌞',
  '🛝🧒🌳', '🚌🏫🎒', '🔬🧪👩‍🔬', '🎣🐟🏞️', '🧺🥪🌳', '🏀🏃🏟️', '🐿️🌰🍂', '🎬🍿🎥', '🐮🥛🌾', '🚁🏔️☁️',
  '🏡🌳🌷', '🐱🧶🛋️', '🐶🚿🧼', '🧑‍🍳🍲🔥', '🍓🥧🌸', '🎤🎸👏', '🌙🛏️😴', '🌬️🪁🏞️', '🌊🐚🦀', '🧣❄️🏒',
];

/* ------------------------------------------------------------------ */
/*  f18 — Petits textes (compositions) : [consigne, aide]              */
/* ------------------------------------------------------------------ */
const C1 = [
  ['Raconte ta fin de semaine.', 'Utilise : d’abord, ensuite, finalement.'],
  ['Décris ton animal préféré.', 'Dis comment il est, ce qu’il mange et pourquoi tu l’aimes.'],
  ['Écris une lettre à ton ami pour l’inviter à ta fête.', 'Dis quand, où et ce que vous ferez.'],
  ['Parle de ta journée à l’école.', 'Utilise : le matin, à midi, l’après-midi.'],
  ['Décris ta chambre.', 'Dis ce qu’il y a dedans et ce que tu aimes le plus.'],
  ['Raconte ta plus belle journée de neige.', 'Dis où tu étais, avec qui et ce que tu as fait.'],
  ['Écris ce que tu aimerais faire cet été.', 'Utilise : j’aimerais, parce que.'],
  ['Parle de ton meilleur ami ou de ta meilleure amie.', 'Dis comment il ou elle est et à quoi vous jouez.'],
  ['Décris ton repas préféré.', 'Dis ce qu’il y a dedans, qui le prépare et quand tu le manges.'],
  ['Raconte une sortie au parc.', 'Utilise : d’abord, ensuite, finalement.'],
  ['Écris une lettre à ta grand-mère pour la remercier.', 'Commence par « Chère grand-maman, » et finis par « Je t’embrasse. »'],
  ['Raconte comment tu as perdu une dent.', 'Dis ce qui s’est passé et ce que tu as ressenti.'],
  ['Décris ta maison.', 'Dis combien il y a de pièces et ta pièce préférée.'],
  ['Parle de ton jeu préféré.', 'Dis comment on joue et pourquoi tu l’aimes.'],
  ['Écris sur une journée à la plage.', 'Utilise : le matin, ensuite, le soir.'],
  ['Raconte un jour où tu as eu peur.', 'Dis ce qui s’est passé et comment ça s’est terminé.'],
  ['Décris ton enseignante ou ton enseignant.', 'Dis ce que tu aimes chez cette personne.'],
  ['Écris une lettre au père Noël.', 'Dis ce que tu demandes et pourquoi tu as été sage.'],
  ['Raconte une promenade avec ton chien ou ton chat.', 'Si tu n’en as pas, imagine-en un!'],
  ['Parle de ton sport préféré.', 'Dis où tu y joues et avec qui.'],
  ['Écris la suite : « Un matin, j’ai trouvé une petite boîte devant ma porte… »', 'Dis ce qu’il y avait dedans.'],
  ['Écris la suite : « Le chat a sauté par la fenêtre et… »', 'Utilise : d’abord, ensuite, finalement.'],
  ['Écris la suite : « Il neigeait si fort que l’autobus est resté bloqué… »', 'Dis ce que les enfants ont fait.'],
  ['Décris ton jouet préféré.', 'Dis sa couleur, sa grandeur et ce qu’il fait.'],
  ['Raconte ce que tu fais le soir avant de dormir.', 'Utilise : d’abord, ensuite, enfin.'],
  ['Écris une lettre à un ami qui déménage.', 'Dis que tu vas t’ennuyer et propose de lui écrire.'],
  ['Imagine que tu es un oiseau. Raconte ta journée.', 'Dis où tu voles et ce que tu vois.'],
  ['Parle de ta saison préférée.', 'Dis ce qu’on fait et ce qu’on porte.'],
  ['Raconte ta visite chez le médecin ou chez le dentiste.', 'Utilise : d’abord, ensuite, finalement.'],
  ['Écris la suite : « Dans la forêt, j’ai entendu un petit bruit… »', 'Dis ce que tu as découvert.'],
];
const C2 = [
  ['Raconte la plus belle sortie que tu as faite avec ta famille.', 'Utilise : d’abord, ensuite, après, finalement.'],
  ['Écris une lettre à ton ami pour l’inviter à passer une fin de semaine chez toi.', 'Dis quand, ce que vous ferez et ce qu’il doit apporter.'],
  ['Décris un animal que tu trouves extraordinaire.', 'Dis où il vit, ce qu’il mange et pourquoi il est spécial.'],
  ['Écris la suite : « La porte de la vieille maison s’est ouverte toute seule… »', 'Raconte ce qui s’est passé, avec un début, un milieu et une fin.'],
  ['Raconte ta première journée à l’école cette année.', 'Dis comment tu te sentais et ce qui s’est passé.'],
  ['Décris ton endroit préféré au monde.', 'Dis ce qu’on y voit, ce qu’on y entend et ce qu’on y ressent.'],
  ['Écris une lettre à ton enseignante pour lui raconter tes vacances.', 'Commence par « Chère madame » et finis par « Bonne journée ».'],
  ['Raconte un match ou une activité sportive que tu as vécue.', 'Utilise : au début, puis, à la fin.'],
  ['Si tu pouvais avoir un pouvoir magique, lequel choisirais-tu?', 'Explique pourquoi et dis ce que tu ferais avec.'],
  ['Écris la suite : « Quand j’ai ouvert le coffre au trésor, j’ai vu… »', 'Raconte ce qui s’est passé ensuite.'],
  ['Décris ta journée idéale.', 'Utilise : le matin, l’après-midi, le soir.'],
  ['Raconte un moment où tu as aidé quelqu’un.', 'Dis ce qui s’est passé et comment la personne a réagi.'],
  ['Écris un texte pour expliquer comment faire ton dessert préféré.', 'Utilise : d’abord, ensuite, enfin, et les ingrédients.'],
  ['Décris un personnage de film ou de livre que tu aimes.', 'Dis comment il est et ce qu’il fait de bien.'],
  ['Écris une lettre à ton futur toi dans dix ans.', 'Dis ce que tu espères et ce que tu aimes maintenant.'],
  ['Raconte une journée de tempête de neige.', 'Dis ce que tu as fait et ce que tu as ressenti.'],
  ['Imagine que tu découvres une nouvelle planète.', 'Décris-la : les couleurs, les habitants, ce qu’on y mange.'],
  ['Écris la suite : « Mon chien a disparu pendant la nuit… »', 'Raconte comment on l’a retrouvé.'],
  ['Parle d’une fête que tu as aimée.', 'Dis qui était là, ce que vous avez fait et mangé.'],
  ['Écris une lettre pour remercier quelqu’un qui t’a fait un cadeau.', 'Dis ce que tu as aimé et pourquoi.'],
  ['Décris ton école comme si tu la faisais visiter à un nouvel élève.', 'Dis où se trouvent les endroits importants.'],
  ['Raconte un rêve que tu as fait, vrai ou inventé.', 'Utilise : d’abord, puis, soudain, enfin.'],
  ['Si tu étais le directeur de l’école pour une journée, que ferais-tu?', 'Dis au moins trois choses et explique pourquoi.'],
  ['Écris sur ce que tu fais pour protéger l’environnement.', 'Donne des exemples et dis pourquoi c’est important.'],
  ['Raconte une aventure dans la neige ou dans la forêt.', 'Utilise : au début, ensuite, à la fin.'],
  ['Écris une lettre à un ami pour lui raconter ton nouveau passe-temps.', 'Explique ce que tu fais et pourquoi tu aimes ça.'],
  ['Décris un objet magique que tu inventes.', 'Dis son nom, son aspect et ce qu’il peut faire.'],
  ['Écris la suite : « Le robot s’est réveillé et il m’a dit… »', 'Raconte votre conversation et ce qui s’est passé.'],
  ['Raconte un voyage que tu as fait, ou que tu aimerais faire.', 'Dis où, avec qui et ce que tu veux voir.'],
  ['Écris sur un défi que tu as réussi.', 'Dis ce qui était difficile et comment tu as réussi.'],
];
const C3 = [
  ['Raconte un souvenir de vacances que tu n’oublieras jamais.', 'Utilise : d’abord, ensuite, puis, finalement. Décris aussi ce que tu ressentais.'],
  ['Écris une lettre à un ami qui vit dans un autre pays pour lui décrire la vie au Québec.', 'Parle des saisons, de la nourriture et de ce que tu aimes.'],
  ['Écris la suite : « Au fond du grenier, derrière un vieux miroir, il y avait une petite porte… »', 'Ton texte doit avoir un début, un problème et une fin.'],
  ['Décris un animal imaginaire que tu inventes.', 'Dis comment il est, où il vit, ce qu’il mange et quel est son secret.'],
  ['Raconte une journée où tout a mal commencé, mais s’est bien terminée.', 'Utilise : au début, mais, heureusement, à la fin.'],
  ['Pour ou contre : les enfants devraient avoir moins de devoirs?', 'Donne ton opinion et au moins deux raisons : parce que, de plus.'],
  ['Écris une lettre au maire de ta ville pour lui proposer une idée qui améliorerait le parc.', 'Commence par « Monsieur le maire, » et explique ton idée.'],
  ['Imagine que tu es perdu sur une île déserte pendant une semaine.', 'Raconte ce que tu fais pour manger, dormir et être retrouvé.'],
  ['Décris une personne que tu admires.', 'Dis qui elle est, ce qu’elle fait et ce que tu apprends d’elle.'],
  ['Écris la suite : « Quand la cloche a sonné, tous les élèves ont découvert que l’école était vide… »', 'Raconte l’enquête et la solution.'],
  ['Raconte comment tu as appris quelque chose de difficile.', 'Dis les étapes : d’abord, puis, après, enfin.'],
  ['Écris un dialogue entre deux amis qui préparent une surprise.', 'Utilise des tirets et des verbes comme « dit », « répond », « chuchote ».'],
  ['Si tu pouvais inviter une personne célèbre à souper, qui choisirais-tu?', 'Explique pourquoi et dis ce que vous feriez.'],
  ['Écris un texte pour convaincre ta famille d’adopter un animal.', 'Donne trois raisons : premièrement, deuxièmement, enfin.'],
  ['Raconte la visite d’un endroit spécial : musée, ferme, cabane à sucre, aquarium…', 'Décris ce que tu as vu, entendu et goûté.'],
  ['Décris une tempête vue de ta fenêtre.', 'Utilise tes cinq sens et des comparaisons : « comme », « on dirait ».'],
  ['Écris la suite : « Mon ami et moi, nous avons suivi les traces mystérieuses dans la neige… »', 'Raconte ce que vous avez trouvé au bout.'],
  ['Écris une lettre d’excuses à quelqu’un que tu as fâché.', 'Explique ce qui s’est passé, dis que tu regrettes et propose de réparer.'],
  ['Imagine ta ville dans cent ans.', 'Décris les maisons, les transports et la vie des enfants.'],
  ['Raconte ce qui se passe quand un objet de ta maison devient vivant la nuit.', 'Choisis l’objet et invente une aventure.'],
  ['Décris le plus beau paysage que tu aies vu.', 'Dis où tu étais et ce qui t’a le plus plu.'],
  ['Écris un article pour le journal de l’école sur un événement récent.', 'Réponds à : quoi, qui, où, quand, pourquoi.'],
  ['Raconte comment un animal a sauvé la journée.', 'Invente l’animal, le problème et la solution.'],
  ['Écris un texte sur ce que tu feras quand tu seras grand.', 'Dis ton métier de rêve et pourquoi tu l’as choisi.'],
  ['Écris la suite : « Le matin du grand concours, Maya s’est rendu compte qu’elle avait perdu… »', 'Dis comment elle règle son problème.'],
  ['Décris ton objet le plus précieux.', 'Dis d’où il vient, pourquoi il compte pour toi et ce que tu ressens en le voyant.'],
  ['Raconte une partie de hockey, de soccer ou de jeu qui s’est jouée jusqu’à la dernière minute.', 'Fais sentir le suspense : soudain, tout à coup.'],
  ['Écris une lettre à un auteur que tu aimes pour lui dire pourquoi tu apprécies ses livres.', 'Donne des exemples précis.'],
  ['Explique comment on prépare un bonhomme de neige parfait.', 'Utilise : premièrement, ensuite, enfin, et des mots de liaison.'],
  ['Imagine une rencontre avec un extraterrestre gentil.', 'Raconte où vous vous rencontrez, ce que vous faites et comment vous vous quittez.'],
];

/* ------------------------------------------------------------------ */
/*  f16 — Je réponds par écrit : [niveau, texte, [[question, clé], …]]  */
/* ------------------------------------------------------------------ */
const A = [];
const a = (l, text, qs) => A.push({ l, text, qs });

/* ---------- Niveau 1 (40–70 mots) ---------- */
a(1, `Le samedi, Zoé va à la patinoire avec son père. Elle met ses patins blancs et son casque. Au début, elle glisse lentement parce qu’elle a un peu peur. Puis, elle prend de la vitesse. À la fin, elle rit très fort. Son père lui offre un chocolat chaud pour la féliciter.`, [
  ['Où Zoé va-t-elle le samedi?', 'Elle va à la patinoire avec son père.'],
  ['Pourquoi Zoé glisse-t-elle lentement au début?', 'Parce qu’elle a un peu peur.'],
  ['Qu’est-ce que le père de Zoé lui offre à la fin?', 'Un chocolat chaud.'],
  ['Comment Zoé se sent-elle à la fin? Explique.', 'Elle est contente et fière, parce qu’elle rit très fort.'],
]);
a(1, `Dans le jardin de mamie, il y a un grand pommier. En automne, les pommes sont rouges et sucrées. Hugo et sa sœur Alice ramassent les pommes dans un panier. Ensuite, mamie prépare une tarte. Toute la maison sent bon la cannelle. Les enfants ont très hâte de la goûter.`, [
  ['Qu’y a-t-il dans le jardin de mamie?', 'Un grand pommier.'],
  ['Que font Hugo et Alice avec les pommes?', 'Ils les ramassent dans un panier.'],
  ['Que prépare mamie avec les pommes?', 'Une tarte aux pommes.'],
  ['Pourquoi les enfants ont-ils hâte?', 'Parce qu’ils veulent goûter la tarte qui sent bon.'],
]);
a(1, `Le petit chat Minou est perdu. Il ne retrouve plus sa maison. Il pleut et il a très froid. Un garçon le voit sous un banc. Il le prend dans ses bras et regarde son collier. Une adresse est écrite dessus! Le garçon ramène Minou chez son enseignante.`, [
  ['Pourquoi Minou a-t-il froid?', 'Parce qu’il pleut et qu’il est perdu dehors.'],
  ['Où le garçon trouve-t-il le chat?', 'Sous un banc.'],
  ['Comment le garçon sait-il où habite Minou?', 'Il y a une adresse écrite sur le collier.'],
  ['Que fait le garçon à la fin?', 'Il ramène Minou chez son enseignante.'],
]);
a(1, `Ce matin, il a neigé toute la nuit. Les enfants sortent dans la cour avec leurs tuques et leurs mitaines. Ils roulent trois grosses boules de neige. Ils les mettent l’une sur l’autre. Max ajoute un nez en carotte et deux yeux en charbon. Le bonhomme de neige a l’air content!`, [
  ['Qu’est-ce qui est tombé pendant la nuit?', 'De la neige.'],
  ['Que portent les enfants pour sortir?', 'Des tuques et des mitaines.'],
  ['Qu’est-ce que Max ajoute au bonhomme de neige?', 'Un nez en carotte et deux yeux en charbon.'],
  ['Comment construit-on le bonhomme de neige dans le texte?', 'On roule trois boules de neige et on les met l’une sur l’autre.'],
]);
a(1, `La grenouille vit près de la mare. Le jour, elle se repose sur une grande feuille. Le soir, elle chasse les mouches avec sa longue langue. Quand elle a peur, elle fait un grand saut dans l’eau. Plouf! Elle se cache sous les roseaux jusqu’au retour du calme.`, [
  ['Où vit la grenouille?', 'Près de la mare.'],
  ['Que mange la grenouille?', 'Des mouches.'],
  ['Que fait la grenouille quand elle a peur?', 'Elle saute dans l’eau et se cache sous les roseaux.'],
  ['À quel moment de la journée la grenouille chasse-t-elle?', 'Le soir.'],
]);
a(1, `Lundi, c’est l’anniversaire de Nathan. Il a sept ans. Sa mère a préparé un gâteau au chocolat avec sept bougies. Ses amis arrivent avec des cadeaux. Ils jouent à cache-cache et chantent une chanson. Nathan souffle les bougies et fait un vœu. Il est très heureux.`, [
  ['Quel âge Nathan a-t-il?', 'Il a sept ans.'],
  ['Que contient le gâteau de Nathan?', 'Il est au chocolat et il a sept bougies.'],
  ['À quoi les amis jouent-ils?', 'À cache-cache.'],
  ['Que fait Nathan avant de manger le gâteau?', 'Il souffle les bougies et fait un vœu.'],
]);
a(1, `Dans la classe de madame Claire, il y a un petit poisson rouge. Il s’appelle Bulle. Chaque matin, un élève lui donne à manger. Aujourd’hui, c’est le tour de Lina. Elle met trois petites graines dans l’eau. Bulle monte tout de suite à la surface pour les manger.`, [
  ['Comment s’appelle le poisson de la classe?', 'Bulle.'],
  ['Qui donne à manger au poisson?', 'Un élève différent chaque matin.'],
  ['Qu’est-ce que Lina met dans l’eau?', 'Trois petites graines.'],
  ['Pourquoi Bulle monte-t-il à la surface?', 'Parce qu’il veut manger les graines.'],
]);
a(1, `Pour aller à l’école, Emma prend l’autobus jaune. Il passe devant sa maison à huit heures. Elle s’assoit près de la fenêtre avec son amie Rosalie. Elles regardent les maisons et les arbres. Quand l’autobus arrête devant l’école, elles disent merci au chauffeur et descendent.`, [
  ['Comment Emma va-t-elle à l’école?', 'Elle prend l’autobus.'],
  ['À quelle heure l’autobus passe-t-il?', 'À huit heures.'],
  ['Avec qui Emma s’assoit-elle?', 'Avec son amie Rosalie.'],
  ['Que disent les filles au chauffeur?', 'Elles lui disent merci.'],
]);
a(1, `Le hibou dort le jour dans un grand arbre creux. La nuit, il se réveille et il vole sans faire de bruit. Ses gros yeux jaunes voient très bien dans le noir. Il attrape des souris dans les champs. Quand il a fini, il retourne dans son arbre avant le lever du soleil.`, [
  ['Où le hibou dort-il le jour?', 'Dans un grand arbre creux.'],
  ['Pourquoi le hibou voit-il bien la nuit?', 'Parce qu’il a de gros yeux qui voient très bien dans le noir.'],
  ['Que mange le hibou?', 'Des souris.'],
  ['Quand le hibou retourne-t-il dans son arbre?', 'Avant le lever du soleil.'],
]);
a(1, `Samedi, la famille de Jules fait un pique-nique au bord du lac. Papa étend une couverture sur l’herbe. Maman sort des sandwichs, des fraises et du jus. Jules lance des cailloux dans l’eau. Soudain, un canard s’approche pour demander du pain. Jules lui en donne un petit morceau.`, [
  ['Où la famille de Jules fait-elle un pique-nique?', 'Au bord du lac.'],
  ['Qu’est-ce que maman sort du panier?', 'Des sandwichs, des fraises et du jus.'],
  ['Que fait Jules pendant que ses parents installent le repas?', 'Il lance des cailloux dans l’eau.'],
  ['Qui s’approche de Jules et que fait-il?', 'Un canard s’approche et Jules lui donne du pain.'],
]);

/* ---------- Niveau 2 (70–110 mots) ---------- */
a(2, `Depuis septembre, Samuel rêve de faire partie de l’équipe de hockey de l’école. Il s’entraîne tous les soirs dans la cour avec son père. Au début, il manque presque tous ses tirs. Il se fâche et jette son bâton dans la neige. Son père lui dit : « Ce n’est pas grave, Samuel. Les meilleurs joueurs ont tous commencé comme toi. » Alors, Samuel respire à fond et essaie encore. Deux semaines plus tard, il réussit trois buts de suite!`, [
  ['Quel est le rêve de Samuel?', 'Faire partie de l’équipe de hockey de l’école.'],
  ['Pourquoi Samuel jette-t-il son bâton?', 'Parce qu’il se fâche d’avoir manqué ses tirs.'],
  ['Que lui répond son père?', 'Que ce n’est pas grave et que les meilleurs joueurs ont commencé comme lui.'],
  ['Qu’est-ce que cette histoire t’apprend?', 'Qu’il faut pratiquer et ne pas abandonner pour réussir.'],
]);
a(2, `La cabane à sucre de monsieur Tremblay est ouverte de mars à avril. Quand l’eau d’érable commence à couler, il la fait bouillir pendant des heures dans une grande bassine. Petit à petit, elle devient épaisse et dorée : c’est le sirop d’érable. Les visiteurs arrivent en traîneau et mangent des crêpes, du jambon et des œufs. À la fin du repas, tout le monde reçoit de la tire sur la neige. Les enfants adorent ce dessert collant!`, [
  ['Pendant quels mois la cabane à sucre est-elle ouverte?', 'De mars à avril.'],
  ['Comment devient-on du sirop avec l’eau d’érable?', 'On la fait bouillir longtemps jusqu’à ce qu’elle devienne épaisse et dorée.'],
  ['Que mangent les visiteurs?', 'Des crêpes, du jambon et des œufs, puis de la tire sur la neige.'],
  ['Pourquoi les enfants aiment-ils le dessert?', 'Parce que la tire sur la neige est sucrée et collante.'],
]);
a(2, `Chloé a trouvé un oisillon tombé de son nid sous l’érable. Il ne bouge presque pas. Elle l’enveloppe dans un chiffon doux et le met dans une boîte à chaussures. Sa mère téléphone à un centre de soins pour les animaux. « Ne lui donne rien à manger, dit la dame au téléphone. Nous allons venir le chercher. » Une heure plus tard, une vétérinaire emporte la boîte. Chloé espère que l’oisillon va guérir.`, [
  ['Où Chloé a-t-elle trouvé l’oisillon?', 'Par terre, sous l’érable, tombé de son nid.'],
  ['Que fait Chloé pour protéger l’oisillon?', 'Elle l’enveloppe dans un chiffon et le met dans une boîte.'],
  ['Pourquoi la dame au téléphone dit-elle de ne rien lui donner?', 'Parce que les spécialistes vont venir le chercher et savent quoi faire.'],
  ['Comment Chloé se sent-elle à la fin?', 'Elle est inquiète, mais elle espère qu’il va guérir.'],
]);
a(2, `Le monarque est un papillon orange et noir qui vit au Canada en été. En automne, il fait un voyage incroyable : il vole jusqu’au Mexique, à plus de quatre mille kilomètres! Là-bas, des millions de monarques se reposent dans les arbres pendant l’hiver. Au printemps, ils repartent vers le nord. Ce sont leurs petits-enfants qui reviennent chez nous, car les monarques vivent seulement quelques semaines. Le lait de la plante asclépiade est leur seule nourriture pour grandir.`, [
  ['De quelle couleur est le monarque?', 'Orange et noir.'],
  ['Où le monarque va-t-il en automne et pourquoi?', 'Au Mexique, pour passer l’hiver au chaud.'],
  ['Pourquoi ce ne sont pas les mêmes monarques qui reviennent au printemps?', 'Parce qu’ils vivent seulement quelques semaines : ce sont leurs descendants qui reviennent.'],
  ['Pourquoi ce voyage est-il impressionnant?', 'Parce que le papillon est petit et vole à plus de quatre mille kilomètres.'],
]);
a(2, `Chaque vendredi, la classe de madame Sophie fait un grand ménage de la cour d’école. Les élèves enfilent des gants et ramassent les papiers, les bouteilles et les sacs de plastique. Aujourd’hui, Karim a trouvé une bouteille qui n’était pas dans le bon bac. Il l’a mise dans le bac de recyclage. « Si on ne jette pas les déchets par terre, les animaux seront en santé », dit-il. Tout le monde a applaudi son idée.`, [
  ['Quand la classe nettoie-t-elle la cour?', 'Chaque vendredi.'],
  ['Que ramassent les élèves?', 'Des papiers, des bouteilles et des sacs de plastique.'],
  ['Que fait Karim avec la bouteille?', 'Il la met dans le bac de recyclage.'],
  ['Selon Karim, pourquoi ne faut-il pas jeter les déchets par terre?', 'Parce que cela rend les animaux malades; on protège leur santé.'],
]);
a(2, `La boulangerie de monsieur Antoine s’éveille à quatre heures du matin. Il pétrit la pâte à pain, la laisse lever, puis la glisse au four. Vers six heures, l’odeur des baguettes chaudes remplit la rue. Les premiers clients arrivent : un facteur, une infirmière et une dame qui promène son chien. Monsieur Antoine connaît tout le monde par son prénom. Il leur dit toujours : « Bonne journée! » avec un grand sourire.`, [
  ['À quelle heure monsieur Antoine commence-t-il à travailler?', 'À quatre heures du matin.'],
  ['Que fait-il avec la pâte avant de la mettre au four?', 'Il la pétrit et la laisse lever.'],
  ['Qui sont les premiers clients?', 'Un facteur, une infirmière et une dame avec son chien.'],
  ['Comment sait-on que monsieur Antoine est gentil?', 'Il connaît ses clients par leur prénom et leur sourit en leur souhaitant bonne journée.'],
]);
a(2, `Pendant la tempête de verglas, la ville de Lucas a perdu l’électricité pendant trois jours. La famille s’est installée dans le salon, près du poêle à bois. Ils ont allumé des bougies, joué aux cartes et mangé du pain grillé sur le feu. Lucas a trouvé ça amusant, mais il avait un peu peur du bruit des branches qui craquaient dehors. Quand la lumière est revenue, tout le monde a poussé un cri de joie.`, [
  ['Combien de temps la ville est-elle restée sans électricité?', 'Trois jours.'],
  ['Où la famille de Lucas s’est-elle installée?', 'Dans le salon, près du poêle à bois.'],
  ['Qu’est-ce que Lucas a trouvé amusant et qu’est-ce qui lui faisait peur?', 'Il trouvait ça amusant de jouer aux cartes, mais il avait peur du bruit des branches.'],
  ['Pourquoi tout le monde a-t-il crié de joie à la fin?', 'Parce que l’électricité était revenue.'],
]);
a(2, `La bibliothèque du quartier organise un club de lecture pour les enfants. Tous les mercredis, une bibliothécaire lit une histoire à voix haute. Ensuite, les enfants dessinent leur scène préférée. Ceux qui ont lu cinq livres reçoivent un autocollant spécial. Mia en a déjà quatre! Cette semaine, elle emprunte un roman d’aventures. Elle espère qu’elle le finira avant mercredi prochain pour recevoir son prix. Sa mère lui a promis de l’emmener à la bibliothèque dès samedi pour choisir ensemble le prochain livre.`, [
  ['Quel jour le club de lecture a-t-il lieu?', 'Le mercredi.'],
  ['Que font les enfants après l’histoire?', 'Ils dessinent leur scène préférée.'],
  ['Que faut-il faire pour avoir un autocollant spécial?', 'Lire cinq livres.'],
  ['Pourquoi Mia emprunte-t-elle un roman cette semaine?', 'Parce qu’il lui manque un livre pour gagner l’autocollant.'],
]);
a(2, `Le loup gris vit en groupe, qu’on appelle une meute. Chaque loup a un rôle : certains chassent, d’autres gardent les louveteaux. Pour se parler, les loups hurlent, grognent et font des gestes avec leur queue. Le hurlement s’entend à des kilomètres. Il sert à dire aux autres loups où l’on se trouve. Contrairement à ce que racontent les vieux contes, le loup a rarement peur des humains. Il les évite plutôt, car il préfère la tranquillité de la forêt.`, [
  ['Comment s’appelle un groupe de loups?', 'Une meute.'],
  ['À quoi sert le hurlement du loup?', 'À dire aux autres loups où l’on se trouve.'],
  ['Que font les loups de la meute?', 'Certains chassent et d’autres gardent les louveteaux.'],
  ['Que pense le texte des histoires dans les contes?', 'Il dit qu’elles se trompent : le loup évite les humains au lieu de les attaquer.'],
]);
a(2, `Ce samedi, Anaïs a décidé de préparer des crêpes pour toute la famille. Elle mélange la farine, les œufs et le lait dans un grand bol. Sa mère l’aide à chauffer la poêle. La première crêpe est ratée : elle colle et se déchire. Anaïs ne se décourage pas. À la deuxième, elle ajoute un peu de beurre dans la poêle. Cette fois, la crêpe est dorée et parfaite. Toute la famille la félicite en mangeant avec du sirop d’érable.`, [
  ['Quels ingrédients Anaïs mélange-t-elle?', 'De la farine, des œufs et du lait.'],
  ['Pourquoi la première crêpe est-elle ratée?', 'Parce qu’elle colle à la poêle et se déchire (il n’y avait pas de beurre).'],
  ['Qu’est-ce qu’Anaïs fait de différent pour la deuxième?', 'Elle met un peu de beurre dans la poêle.'],
  ['Quelle qualité Anaïs montre-t-elle?', 'Elle est persévérante : elle ne se décourage pas et essaie encore.'],
]);

/* ---------- Niveau 3 (110–160 mots) ---------- */
a(3, `Le lac Saint-Jean gèle chaque hiver et, pendant quelques semaines, il devient un grand terrain de jeux. Les pêcheurs installent de petites cabanes sur la glace et percent des trous pour attraper des poissons. Les familles viennent patiner, faire de la motoneige ou glisser en traîneau. Mais la glace peut être dangereuse : elle doit mesurer au moins dix centimètres d’épaisseur pour qu’on puisse marcher dessus. C’est pourquoi des spécialistes vérifient régulièrement sa solidité. Quand le printemps arrive, la glace fond et le lac redevient un grand miroir bleu. Les oiseaux migrateurs reviennent alors se poser sur ses rives, et les villages reprennent vie. Chaque saison offre ainsi un paysage différent, que les gens de la région aiment partager avec les visiteurs venus de loin.`, [
  ['Que font les pêcheurs sur le lac gelé?', 'Ils installent des cabanes sur la glace et percent des trous pour pêcher.'],
  ['Pourquoi des spécialistes vérifient-ils la glace?', 'Parce qu’elle doit être assez épaisse (dix centimètres) pour être sécuritaire.'],
  ['Que se passe-t-il au printemps?', 'La glace fond, le lac redevient bleu et les oiseaux migrateurs reviennent.'],
  ['Comment le lac change-t-il la vie des gens en hiver?', 'Il devient un lieu d’activités : pêche, patin, motoneige, traîneau.'],
]);
a(3, `Quand Rafaël est arrivé de Colombie, il ne parlait presque pas français. Les premiers jours à l’école, il se tenait seul dans un coin de la cour. Un jour, une élève nommée Camille s’est approchée avec un ballon. Elle n’a rien dit : elle a simplement fait une passe. Rafaël a souri et a renvoyé le ballon. Ils ont joué toute la récréation sans prononcer un mot. Le lendemain, Camille lui a appris le mot « ami ». Depuis, Rafaël apprend un nouveau mot chaque jour, et il a maintenant plusieurs amis dans sa classe. Il dit souvent que ce premier ballon a été son premier vrai mot de français.`, [
  ['Pourquoi Rafaël restait-il seul au début?', 'Parce qu’il venait d’arriver et ne parlait presque pas français.'],
  ['Comment Camille a-t-elle commencé à devenir son amie?', 'Elle lui a fait une passe avec son ballon, sans parler.'],
  ['Qu’est-ce que cette histoire montre sur l’amitié?', 'Qu’on peut devenir amis avec des gestes, même sans parler la même langue.'],
  ['Comment Rafaël a-t-il changé à la fin?', 'Il apprend du français chaque jour et il a plusieurs amis.'],
]);
a(3, `Les abeilles sont indispensables à notre alimentation. En allant de fleur en fleur pour récolter le nectar, elles transportent le pollen, ce qui permet aux plantes de produire des fruits. Sans elles, nous aurions beaucoup moins de pommes, de fraises ou de courges. Malheureusement, les abeilles sont menacées par les produits chimiques utilisés dans certains champs et par la disparition des fleurs sauvages. Pour les aider, on peut planter des fleurs dans son jardin, éviter les pesticides et installer un petit abri pour les insectes. Un geste simple peut donc avoir un grand effet sur la nature. Si chaque famille plantait seulement quelques fleurs, les abeilles trouveraient plus de nourriture et seraient plus nombreuses.`, [
  ['Comment les abeilles aident-elles les plantes?', 'Elles transportent le pollen de fleur en fleur, ce qui permet de produire des fruits.'],
  ['Qu’est-ce qui menace les abeilles?', 'Les produits chimiques et la disparition des fleurs sauvages.'],
  ['Nomme deux gestes pour aider les abeilles.', 'Planter des fleurs, éviter les pesticides ou installer un abri pour insectes.'],
  ['Pourquoi les abeilles sont-elles importantes pour nous?', 'Parce que sans elles nous aurions moins de fruits et de légumes à manger.'],
]);
a(3, `Au dernier jour de classe, madame Julie a demandé à ses élèves d’écrire une lettre à l’élève qui occuperait leur pupitre l’année suivante. Louis a réfléchi longtemps. Il a écrit : « Bonjour, je m’appelle Louis. Ce pupitre est un peu bancal, mais il porte chance. Ne te décourage pas devant les divisions : avec de la patience, elles deviennent faciles. Choisis un bon livre pour les jours de pluie. J’espère que tu auras une belle année! » Louis a glissé la lettre sous le couvercle, puis il est sorti en souriant, un peu triste de quitter sa classe. Il a pensé que l’élève suivant sourirait peut-être en découvrant ces mots, et cette idée l’a rendu heureux pour tout l’été.`, [
  ['Qu’est-ce que madame Julie demande à ses élèves?', 'D’écrire une lettre à l’élève qui aura leur pupitre l’année suivante.'],
  ['Quels conseils Louis donne-t-il dans sa lettre?', 'Ne pas se décourager devant les divisions et choisir un bon livre pour les jours de pluie.'],
  ['Pourquoi Louis est-il « un peu triste » à la fin?', 'Parce qu’il quitte sa classe et son année scolaire est terminée.'],
  ['Quel genre de personne est Louis? Justifie ta réponse.', 'Il est gentil et attentionné : il pense au futur élève et l’encourage.'],
]);
a(3, `Les castors sont de véritables ingénieurs. Avec leurs grandes dents, ils coupent des arbres et construisent des barrages dans les rivières. Derrière le mur de branches et de boue, l’eau monte et forme un étang. Au milieu, le castor bâtit sa hutte, dont l’entrée est cachée sous l’eau pour éloigner les prédateurs. Ce travail change tout le paysage : l’étang attire des canards, des grenouilles et des poissons, et de nouvelles plantes poussent sur ses rives. On dit parfois que le castor « fabrique » un milieu de vie pour des dizaines d’autres espèces. Quand un barrage est abandonné, l’étang devient parfois un grand pré fertile où poussent des herbes hautes.`, [
  ['Pourquoi dit-on que les castors sont des ingénieurs?', 'Parce qu’ils construisent des barrages et des huttes avec des branches et de la boue.'],
  ['Pourquoi l’entrée de la hutte est-elle sous l’eau?', 'Pour éloigner les prédateurs.'],
  ['Quel effet le barrage a-t-il sur la nature autour?', 'Il crée un étang qui attire canards, grenouilles et poissons et fait pousser des plantes.'],
  ['Que veut dire « fabriquer un milieu de vie »?', 'Créer un endroit où plusieurs animaux et plantes peuvent vivre.'],
]);
a(3, `La veille du grand spectacle de l’école, Inès a une boule dans l’estomac. Elle doit chanter seule devant tous les parents. Elle répète dans sa chambre, mais sa voix tremble. Sa grande sœur Yasmine entre et lui dit : « Imagine que tu chantes pour ton chat. Il t’écoute toujours sans te juger. » Inès éclate de rire et recommence. Le lendemain, sur la scène, ses mains tremblent encore, mais elle pense à son chat et chante jusqu’au bout. À la fin, la salle l’applaudit pendant une longue minute, et Yasmine lui fait un clin d’œil depuis le fond. Ce soir-là, Inès a compris que la peur diminue quand on trouve une façon d’en rire et qu’on se sent soutenue.`, [
  ['Pourquoi Inès est-elle stressée?', 'Parce qu’elle doit chanter seule devant tous les parents.'],
  ['Quel conseil sa sœur lui donne-t-elle?', 'D’imaginer qu’elle chante pour son chat qui l’écoute sans la juger.'],
  ['Comment Inès réussit-elle à chanter?', 'Elle pense à son chat et continue malgré ses mains qui tremblent.'],
  ['Comment sait-on que le spectacle a été un succès?', 'La salle l’applaudit pendant une longue minute.'],
]);
a(3, `Il y a longtemps, les Autochtones du Québec voyageaient sur les rivières en canot d’écorce de bouleau. Ces canots étaient très légers : deux personnes pouvaient les porter sur leur dos pour contourner les rapides. Pour les construire, on cousait l’écorce avec des racines d’épinette et on couvrait les coutures de gomme de sapin afin que l’eau n’entre pas. Aujourd’hui encore, certains artisans fabriquent des canots de la même façon. Leur savoir passe de génération en génération, et il nous rappelle l’ingéniosité des peuples qui ont su utiliser ce que la forêt leur offrait. Les enfants qui visitent aujourd’hui les musées peuvent admirer ces canots et imaginer les longs voyages d’autrefois.`, [
  ['De quoi les canots étaient-ils faits?', 'D’écorce de bouleau cousue avec des racines d’épinette.'],
  ['Pourquoi les canots devaient-ils être légers?', 'Pour que deux personnes puissent les porter autour des rapides.'],
  ['À quoi servait la gomme de sapin?', 'À couvrir les coutures pour que l’eau n’entre pas.'],
  ['Pourquoi le texte parle-t-il de l’ingéniosité des peuples autochtones?', 'Parce qu’ils utilisaient les ressources de la forêt de façon intelligente pour voyager.'],
]);
a(3, `Mathis déteste ranger sa chambre. Le dimanche soir, c’est toujours la même histoire : des vêtements sur le plancher, des cartes sous le lit et des crayons partout. Cette semaine, son père lui propose un défi : ranger en vingt minutes avec de la musique. Mathis accepte, curieux. Il commence par les livres, puis les vêtements, et il termine par le bureau. Quand le chronomètre sonne, la chambre est impeccable! Mathis est surpris : « Je pensais que ce serait beaucoup plus long. » Depuis ce jour, il range sa chambre en chantant, et il trouve ça presque amusant. Son père sourit en voyant que le simple fait de changer sa façon de faire a rendu la tâche beaucoup plus agréable pour toute la famille.`, [
  ['Pourquoi Mathis n’aime-t-il pas ranger?', 'Parce que sa chambre est très en désordre et que ça lui semble long.'],
  ['Quel défi son père lui propose-t-il?', 'Ranger sa chambre en vingt minutes avec de la musique.'],
  ['Qu’est-ce qui surprend Mathis?', 'Il a fini beaucoup plus vite qu’il le pensait.'],
  ['Qu’est-ce que cette histoire t’apprend?', 'Qu’un défi et de la musique peuvent rendre une tâche ennuyeuse plus facile.'],
]);
a(3, `Les baleines à bosse chantent des chansons longues et compliquées qu’on peut entendre à des kilomètres sous l’eau. Seuls les mâles chantent, surtout pendant la saison de reproduction. Les chercheurs ont remarqué que tous les mâles d’un même océan chantent la même chanson, qui change un peu chaque année, comme une mode. Personne ne sait exactement pourquoi elles chantent. Certains scientifiques pensent que c’est pour attirer les femelles; d’autres croient que c’est pour communiquer avec leur groupe. Une chose est certaine : ces chants figurent parmi les plus beaux sons de la nature. Quand on les écoute sur un enregistrement, on a l’impression d’entendre une très grande flûte sous la mer.`, [
  ['Quelles baleines chantent selon le texte?', 'Seulement les mâles.'],
  ['Qu’est-ce que les chercheurs ont remarqué sur les chansons?', 'Tous les mâles d’un même océan chantent la même chanson, qui change chaque année.'],
  ['Pourquoi les baleines chantent-elles?', 'On ne le sait pas exactement : pour attirer les femelles ou communiquer.'],
  ['Pourquoi dit-on que la chanson est « comme une mode »?', 'Parce qu’elle change chaque année et que tout le groupe l’adopte.'],
]);
a(3, `Au centre-ville, une vieille usine abandonnée allait être démolie. Les enfants du quartier se sont réunis et ont écrit une pétition pour demander qu’on la transforme en jardin communautaire. Ils ont recueilli deux cents signatures en une semaine. Lors de la réunion du conseil municipal, une fillette de neuf ans a lu leur lettre avec courage. Les conseillers ont été touchés. Un mois plus tard, on a annoncé que l’usine serait remplacée par un jardin et un petit marché. Cette victoire montre que même les enfants peuvent changer leur quartier. Aujourd’hui, des familles viennent chaque samedi y planter des légumes, et les enfants y arrosent fièrement leur petit coin de terre.`, [
  ['Que devait-il arriver à la vieille usine?', 'Elle devait être démolie.'],
  ['Que les enfants ont-ils fait pour changer les choses?', 'Ils ont écrit une pétition et recueilli des signatures.'],
  ['Qui a lu la lettre au conseil municipal?', 'Une fillette de neuf ans.'],
  ['Qu’est-ce que cette histoire montre?', 'Que même des enfants peuvent changer leur quartier en agissant ensemble.'],
]);

/* ------------------------------------------------------------------ */
/*  Fabrication des questions                                          */
/* ------------------------------------------------------------------ */
const dictQ = (l, i) => ({ key: `f15-l${l}-${i}`, text: DICT[l][i] });
const DICT_Q = { 1: [], 2: [], 3: [] };
for (const l of [1, 2, 3]) DICT[l].forEach((_, i) => DICT_Q[l].push(dictQ(l, i)));
const DICT_LINES = { 1: 1, 2: 2, 3: 3 };
const dictToQ = (e, level) => hand({
  mode: 'dictation', key: e.key,
  prompt: { fr: 'Écoute et écris la phrase.', en: 'Listen and write the sentence.' },
  say: { text: e.text, lang: FR }, expected: e.text, lines: DICT_LINES[level],
});

const ANS_Q = { 1: [], 2: [], 3: [] };
A.forEach((tx, ti) => tx.qs.forEach((q, qi) => ANS_Q[tx.l].push({ key: `f16-l${tx.l}-t${ti}-q${qi}`, text: tx.text, q: q[0], k: q[1] })));
const ANS_LINES = { 1: 2, 2: 2, 3: 3 };
const ansToQ = (e, level) => hand({
  mode: 'answer', key: e.key, prompt: e.q, say: { text: e.q, lang: FR },
  stimulus: { text: e.text }, answerKey: e.k, lines: ANS_LINES[level],
});

const SENT_Q = { 1: [], 2: [], 3: [] };
S1.forEach(([w, em], i) => SENT_Q[1].push({
  key: `f17-l1-${i}`, prompt: `Écris une phrase avec le mot « ${w} ».`, emoji: em, words: [w], minWords: 4, lines: 2,
}));
S2.forEach(([w1, w2, em], i) => SENT_Q[2].push({
  key: `f17-l2-${i}`, prompt: `Écris une phrase avec les mots « ${w1} » et « ${w2} ».`, emoji: em, words: [w1, w2], minWords: 7, lines: 3,
}));
S3.forEach((em, i) => SENT_Q[3].push({
  key: `f17-l3-${i}`, prompt: 'Regarde l’image. Décris la scène en deux ou trois phrases.', emoji: em, minWords: 15, lines: 4,
}));
const sentToQ = (e) => hand({
  mode: 'sentence', key: e.key, prompt: e.prompt, say: { text: e.prompt, lang: FR },
  stimulus: { emoji: e.emoji }, ...(e.words ? { words: e.words } : {}), minWords: e.minWords, lines: e.lines,
});

const COMP = { 1: C1, 2: C2, 3: C3 };
const COMP_SPEC = { 1: { minWords: 20, lines: 4 }, 2: { minWords: 40, lines: 6 }, 3: { minWords: 60, lines: 8 } };
const compPrompt = (c) => `${c[0]} ${c[1]}`;
const compToQ = (level, i) => hand({
  mode: 'composition', key: `f18-l${level}-${i}`, prompt: compPrompt(COMP[level][i]),
  say: { text: compPrompt(COMP[level][i]), lang: FR }, ...COMP_SPEC[level],
});

const pickLevel = (level) => ([1, 2, 3].includes(level) ? level : 2);
const uniq = (arr) => [...new Map(arr.map((x) => [x.text, x])).values()];

export const units = [
  {
    id: 'f15',
    icon: '✍️',
    title: { fr: 'La dictée', en: 'Dictation' },
    pfeq: 'Écriture — dictée de mots et de phrases écrits à la main (orthographe d’usage, accords, homophones); mots de la liste orthographique du MEQ (2e/3e année)',
    generate(level, R) { const l = pickLevel(level); return dictToQ(R.pick(DICT_Q[l]), l); },
    allSay() { return [1, 2, 3].flatMap((l) => DICT[l].map((text) => ({ text, lang: FR }))); },
  },
  {
    id: 'f16',
    icon: '📝',
    title: { fr: 'Je réponds par écrit', en: 'I answer in writing' },
    pfeq: 'Lecture et écriture — répondre par écrit à une question sur un court texte, en phrase complète',
    generate(level, R) { const l = pickLevel(level); return ansToQ(R.pick(ANS_Q[l]), l); },
    // Un tour = un texte, toutes ses questions.
    session(level, R) {
      const l = pickLevel(level);
      const pool = ANS_Q[l], texts = [...new Set(pool.map((e) => e.text))];
      const t = R.pick(texts);
      return pool.filter((e) => e.text === t).map((e) => ansToQ(e, l));
    },
    allSay() { return [1, 2, 3].flatMap((l) => ANS_Q[l].map((e) => ({ text: e.q, lang: FR }))); },
  },
  {
    id: 'f17',
    icon: '🖼️',
    title: { fr: 'J’écris des phrases', en: 'I write sentences' },
    pfeq: 'Écriture — écrire une phrase complète (majuscule, point, accords) à partir d’un ou de deux mots, ou d’une image',
    generate(level, R) { const l = pickLevel(level); return sentToQ(R.pick(SENT_Q[l])); },
    allSay() { return [1, 2, 3].flatMap((l) => SENT_Q[l].map((e) => ({ text: e.prompt, lang: FR }))); },
  },
  {
    id: 'f18',
    icon: '📮',
    title: { fr: 'Petits textes', en: 'Little texts' },
    pfeq: 'Écriture — petits textes : raconter, décrire, écrire une lettre, inventer la suite d’une histoire',
    generate(level, R) { const l = pickLevel(level); return compToQ(l, R.int(0, COMP[l].length - 1)); },
    allSay() { return [1, 2, 3].flatMap((l) => COMP[l].map((c) => ({ text: compPrompt(c), lang: FR }))); },
  },
];
