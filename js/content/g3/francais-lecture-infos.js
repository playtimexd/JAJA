// Petit Hibou — 3e année, lecture : textes informatifs (u: 'i', avec intertitres → secs) et poèmes (u: 'p'). Textes originaux.
// Mêmes champs que francais-lecture-recits.js ; secs = [intertitre, [faits de cette partie]] ; pour un poème, ev = vers dans l’ordre.
export const INFOS = [
{ u: 'i', title: 'Le castor, ingénieur de la forêt',
text: `Le castor est le plus gros rongeur du Canada. On le voit même sur nos pièces de cinq cents!

Son corps
Le castor peut peser plus de 20 kilogrammes. Sa queue large et plate lui sert de gouvernail quand il nage. Ses grandes dents orange ne s’arrêtent jamais de pousser. Il doit donc ronger du bois tous les jours pour les user.

Sa maison
Le castor construit une hutte avec des branches et de la boue. L’entrée est sous l’eau, ce qui le protège du loup et du lynx. Pour garder l’eau assez profonde, il bâtit aussi un barrage sur la rivière.

Son hiver
Le castor n’hiberne pas. À l’automne, il entrepose des branches au fond de l’eau, près de sa hutte. L’hiver, sous la glace, il nage jusqu’à cette réserve et mange l’écorce. Il reste au chaud avec sa famille dans la hutte.`,
e: [['Quel est le plus gros rongeur du Canada?', 'Le castor', 'L’écureuil', 'Le rat musqué', 'La marmotte'],
 ['De quelle couleur sont les dents du castor?', 'Orange', 'Blanches', 'Jaunes', 'Grises'],
 ['Avec quoi le castor construit-il sa hutte?', 'Des branches et de la boue', 'Des pierres et du sable', 'Des feuilles et de la neige', 'Des os et de l’herbe'],
 ['Où se trouve l’entrée de la hutte?', 'Sous l’eau', 'Sur le toit', 'Dans un arbre', 'Sous la neige'],
 ['Que mange le castor l’hiver?', 'L’écorce des branches', 'Des poissons', 'Des insectes', 'Des fraises']],
i: [['Pourquoi le castor doit-il ronger du bois tous les jours?', 'Ses dents poussent sans arrêt.', 'Il a toujours faim.', 'Il veut couper tous les arbres.', 'Il s’ennuie.'],
 ['Pourquoi l’entrée sous l’eau protège-t-elle le castor?', 'Le loup et le lynx ne peuvent pas entrer par là.', 'L’eau est chaude.', 'Les poissons montent la garde.', 'La boue sent mauvais.'],
 ['Pourquoi le castor fait-il des réserves à l’automne?', 'Pour avoir à manger sous la glace l’hiver', 'Pour décorer sa hutte', 'Pour les vendre', 'Pour construire un bateau']],
v: [['Dans le texte, « un rongeur » est…', 'un animal qui grignote avec ses grandes dents', 'un animal qui vole', 'un poisson', 'un insecte'],
 ['Dans le texte, « entreposer » veut dire…', 'mettre en réserve pour plus tard', 'jeter', 'manger tout de suite', 'cacher dans un arbre']],
f: [['Pourquoi dit-on que le castor est un « ingénieur »?', 'Il construit des huttes et des barrages.', 'Il travaille dans un bureau.', 'Il répare des autos.', 'Il dessine des plans sur du papier.'],
 ['Que se passerait-il si le castor ne bâtissait pas de barrage?', 'L’eau pourrait devenir trop basse pour cacher l’entrée.', 'Il aurait trop chaud.', 'Ses dents arrêteraient de pousser.', 'Il deviendrait orange.'],
 ['Pourquoi le castor est-il sur la pièce de cinq cents?', 'C’est un animal important du Canada.', 'Il a inventé la monnaie.', 'Il mange des pièces.', 'Il est très rare.']],
o: [['Quelle information sur le castor trouves-tu la plus étonnante? Explique pourquoi.', 'Un fait tiré du texte (dents qui poussent toujours, entrée sous l’eau, réserve sous la glace…) avec une raison personnelle.']],
vf: [['Le castor n’hiberne pas.', 1], ['La queue du castor est ronde et poilue.', 0], ['Le castor construit des barrages.', 1], ['Les dents du castor arrêtent de pousser à un an.', 0],
 ['Le castor peut peser plus de 20 kg.', 1], ['L’entrée de la hutte est sur le toit.', 0], ['Le castor mange de l’écorce l’hiver.', 1], ['La queue sert de gouvernail.', 1]],
nd: ['Le castor vit environ dix ans.', 'Le castor a peur des orages.', 'Les bébés castors s’appellent des castorins.'],
secs: [['Son corps', ['Queue large et plate', 'Dents orange', 'Plus de 20 kilogrammes']], ['Sa maison', ['Hutte de branches et de boue', 'Entrée sous l’eau', 'Barrage sur la rivière']], ['Son hiver', ['Réserve de branches', 'Nage sous la glace', 'Reste au chaud en famille']]],
res: ['Le castor est un gros rongeur qui construit sa maison et se prépare pour l’hiver.', 'Le castor est un oiseau qui migre vers le sud.', 'Le castor mange des poissons dans la mer.', 'Le castor dort tout l’hiver dans un arbre.'] },

{ u: 'i', title: 'Le Saint-Laurent, un fleuve géant',
text: `Le Saint-Laurent est le grand fleuve du Québec. Il relie les Grands Lacs à l’océan Atlantique.

Un fleuve très long
Le Saint-Laurent mesure environ 1 200 kilomètres. Il passe devant Montréal, Trois-Rivières et Québec. Près de son embouchure, il est si large qu’on ne voit plus l’autre rive!

De l’eau douce et de l’eau salée
Près de Montréal, l’eau du fleuve est douce. Plus on va vers l’est, plus l’eau devient salée, car elle se mélange avec l’eau de la mer. À certains endroits, on sent même les marées : l’eau monte et descend deux fois par jour.

Des habitants étonnants
Le fleuve abrite des poissons comme l’esturgeon et le bar rayé. Dans l’estuaire, on peut observer des baleines et des bélugas, ces baleines blanches qui vivent ici toute l’année. Des milliers d’oies blanches s’y arrêtent aussi au printemps et à l’automne.`,
e: [['Que relie le Saint-Laurent?', 'Les Grands Lacs et l’océan Atlantique', 'Montréal et Toronto', 'Deux montagnes', 'Le Québec et les États-Unis'],
 ['Combien mesure environ le fleuve?', '1 200 kilomètres', '12 kilomètres', '120 kilomètres', '12 000 kilomètres'],
 ['Quelles villes sont nommées dans le texte?', 'Montréal, Trois-Rivières et Québec', 'Gatineau, Laval et Granby', 'Toronto et Ottawa', 'Rimouski et Sherbrooke'],
 ['Combien de fois par jour l’eau monte-t-elle et descend-elle?', 'Deux fois', 'Une fois', 'Quatre fois', 'Dix fois'],
 ['Quelle baleine blanche vit dans le fleuve toute l’année?', 'Le béluga', 'Le requin', 'Le dauphin', 'Le phoque']],
i: [['Pourquoi l’eau devient-elle salée vers l’est?', 'Elle se mélange à l’eau de la mer.', 'On y met du sel.', 'Les poissons la salent.', 'Il fait plus chaud.'],
 ['Pourquoi ne voit-on plus l’autre rive près de l’embouchure?', 'Le fleuve est très, très large.', 'Il y a du brouillard tout le temps.', 'Il fait toujours nuit.', 'Les arbres sont trop hauts.'],
 ['Quand peut-on voir beaucoup d’oies blanches?', 'Au printemps et à l’automne', 'Seulement l’hiver', 'Seulement la nuit', 'Jamais']],
v: [['Dans le texte, « l’embouchure » est…', 'l’endroit où le fleuve arrive à la mer', 'la source du fleuve', 'un pont', 'un poisson'],
 ['Dans le texte, « la rive » est…', 'le bord du fleuve', 'le fond du fleuve', 'une vague', 'un bateau']],
f: [['Pourquoi le texte a-t-il des intertitres?', 'Pour séparer les informations par sujet', 'Pour faire joli seulement', 'Pour raconter une histoire', 'Pour poser des devinettes'],
 ['Où a-t-on le plus de chances de voir un béluga?', 'Dans l’estuaire, vers l’est', 'Près de Montréal, dans l’eau douce', 'Dans les Grands Lacs', 'Dans une rivière de forêt'],
 ['Pourquoi dit-on que le Saint-Laurent est un « géant »?', 'Il est très long et très large.', 'Il fait peur.', 'Il est très vieux.', 'Il a des bras.']],
o: [['Aimerais-tu faire une excursion sur le Saint-Laurent? Explique pourquoi avec une information du texte.', 'Une opinion claire et une information du texte (voir les baleines, les bélugas, les oies blanches, les marées…).']],
vf: [['Le fleuve passe devant Québec.', 1], ['L’eau est salée près de Montréal.', 0], ['On peut voir des baleines dans l’estuaire.', 1], ['Le fleuve relie deux montagnes.', 0],
 ['Les bélugas sont des baleines blanches.', 1], ['Il y a des marées dans le fleuve.', 1], ['Le fleuve mesure environ 50 kilomètres.', 0], ['Des oies blanches s’arrêtent au bord du fleuve.', 1]],
nd: ['Le fleuve gèle complètement chaque hiver.', 'Il y a cent ponts sur le fleuve.', 'Les bélugas mangent des oies.'],
secs: [['Un fleuve très long', ['Environ 1 200 kilomètres', 'Passe devant Québec', 'Très large à l’embouchure']], ['De l’eau douce et de l’eau salée', ['Eau douce près de Montréal', 'Eau mélangée à la mer', 'Marées deux fois par jour']], ['Des habitants étonnants', ['Esturgeon et bar rayé', 'Bélugas toute l’année', 'Oies blanches en migration']]],
res: ['Le Saint-Laurent est un très long fleuve, d’eau douce puis salée, où vivent beaucoup d’animaux.', 'Le Saint-Laurent est un petit lac de montagne.', 'Le Saint-Laurent est une ville près de la mer.', 'Le Saint-Laurent est une baleine blanche.'] },

{ u: 'i', title: 'Comment dorment les animaux l’hiver?',
text: `L’hiver québécois est long et froid. Les animaux ont trouvé différentes façons de passer à travers.

Les dormeurs
La marmotte hiberne. Elle dort dans un terrier sous la terre pendant presque cinq mois. Son cœur bat très lentement et sa température baisse beaucoup. Elle vit grâce à la graisse qu’elle a accumulée l’été.

Les endormis légers
L’ours noir dort aussi tout l’hiver dans sa tanière, mais son sommeil est plus léger. S’il est dérangé, il peut se réveiller. La mère ourse donne même naissance à ses petits en plein hiver!

Les éveillés
D’autres animaux restent actifs. Le lièvre d’Amérique change de pelage : il devient blanc pour se cacher dans la neige. La mésange se gonfle de plumes pour garder sa chaleur. Le renard, lui, écoute les souris qui bougent sous la neige, puis il saute pour les attraper.`,
e: [['Combien de temps la marmotte dort-elle?', 'Presque cinq mois', 'Une semaine', 'Deux jours', 'Toute l’année'],
 ['Où l’ours noir dort-il?', 'Dans sa tanière', 'Dans un arbre', 'Dans un lac', 'Dans un terrier de lapin'],
 ['De quelle couleur devient le lièvre l’hiver?', 'Blanc', 'Brun', 'Gris', 'Noir'],
 ['Que fait la mésange pour garder sa chaleur?', 'Elle gonfle ses plumes.', 'Elle part vers le sud.', 'Elle dort sous la terre.', 'Elle mange de la neige.'],
 ['Qu’est-ce que le renard écoute sous la neige?', 'Les souris', 'Les ours', 'Les oiseaux', 'Le vent']],
i: [['Pourquoi la marmotte mange-t-elle beaucoup l’été?', 'Pour avoir assez de graisse pour l’hiver', 'Pour devenir blanche', 'Pour pouvoir sauter', 'Pour réchauffer son terrier']],
v: [['Dans le texte, « hiberner » veut dire…', 'dormir profondément tout l’hiver', 'voyager vers le sud', 'changer de couleur', 'chasser la nuit'],
 ['Dans le texte, « le pelage » est…', 'les poils d’un animal', 'la maison d’un animal', 'la nourriture d’un animal', 'les pattes d’un animal'],
 ['Dans le texte, « actifs » veut dire…', 'qui bougent et cherchent à manger', 'qui dorment', 'qui sont malades', 'qui sont très gros']],
f: [['Pourquoi le lièvre blanc est-il plus en sécurité l’hiver?', 'Ses ennemis le voient moins dans la neige.', 'Il court plus vite quand il est blanc.', 'Il a moins froid.', 'Il peut voler.'],
 ['Dans quelle partie placerais-tu un animal qui dort, mais se réveille facilement?', 'Les endormis légers', 'Les dormeurs', 'Les éveillés', 'Aucune partie'],
 ['Pourquoi le renard saute-t-il dans la neige?', 'Pour attraper une souris qu’il a entendue', 'Pour jouer', 'Pour se réchauffer', 'Pour faire peur au lièvre']],
o: [['Si tu étais un animal, comment aimerais-tu passer l’hiver? Explique ton choix.', 'Un choix d’animal ou de façon (dormir, rester éveillé…) avec une raison et un lien avec le texte.']],
vf: [['La marmotte hiberne dans un terrier.', 1], ['L’ours noir ne peut jamais se réveiller l’hiver.', 0], ['La mère ourse a ses petits l’hiver.', 1], ['Le lièvre devient brun l’hiver.', 0],
 ['Le cœur de la marmotte bat lentement en hiver.', 1], ['Le renard chasse des souris sous la neige.', 1], ['La mésange part vers le sud.', 0], ['L’hiver québécois est court et chaud.', 0]],
nd: ['Le renard vit en groupe de dix.', 'La marmotte ronfle en dormant.', 'Les mésanges mangent des graines de tournesol.'],
secs: [['Les dormeurs', ['La marmotte dort cinq mois', 'Le cœur bat lentement', 'Elle vit de sa graisse']], ['Les endormis légers', ['L’ours dort dans sa tanière', 'Il peut se réveiller', 'Les oursons naissent l’hiver']], ['Les éveillés', ['Le lièvre devient blanc', 'La mésange gonfle ses plumes', 'Le renard chasse les souris']]],
res: ['Pour passer l’hiver, certains animaux dorment et d’autres restent actifs de façons différentes.', 'Tous les animaux partent vers le sud l’hiver.', 'Le renard est le seul animal qui aime l’hiver.', 'Les animaux n’ont pas besoin de se préparer pour l’hiver.'] },

{ u: 'i', title: 'La patinoire de quartier',
text: `Dans plusieurs villes du Québec, des bénévoles fabriquent des patinoires extérieures dans les parcs. Voici comment on s’y prend.

Avant le grand froid
Il faut d’abord installer les bandes, ces murets de bois qui entourent la glace. Ensuite, on attend que le sol soit bien gelé. Si on arrose trop tôt, l’eau s’infiltre dans la terre.

L’arrosage
On arrose la nuit, quand il fait le plus froid. On met de minces couches d’eau, l’une après l’autre. Chaque couche doit geler avant la suivante. Il faut parfois une dizaine de nuits pour obtenir une glace épaisse et solide.

L’entretien
Après une bordée de neige, on déneige la patinoire avec de grosses pelles. On arrose de nouveau pour boucher les trous et les fentes. Une bonne patinoire bien entretenue peut durer de décembre jusqu’à mars, si la température reste sous zéro.`,
e: [['Qui fabrique les patinoires dans les parcs?', 'Des bénévoles', 'Des pompiers', 'Des enfants seulement', 'Des castors'],
 ['Comment s’appellent les murets de bois autour de la glace?', 'Les bandes', 'Les barrages', 'Les clôtures de fer', 'Les bancs'],
 ['Quand arrose-t-on la patinoire?', 'La nuit', 'Le midi', 'Pendant qu’il pleut', 'Le matin, au soleil'],
 ['Combien de nuits faut-il parfois?', 'Une dizaine', 'Une seule', 'Cent', 'Deux'],
 ['Jusqu’à quand peut durer une bonne patinoire?', 'Jusqu’à mars', 'Jusqu’à juin', 'Jusqu’à octobre', 'Une seule semaine']],
i: [['Pourquoi faut-il attendre que le sol soit gelé?', 'Sinon l’eau entre dans la terre au lieu de geler.', 'Pour que les enfants soient en vacances.', 'Pour que les bandes sèchent.', 'Pour voir les étoiles.'],
 ['Pourquoi met-on de minces couches d’eau?', 'Elles gèlent mieux et plus vite.', 'Pour économiser du savon.', 'Pour faire des vagues.', 'Parce que les tuyaux sont petits.'],
 ['Pourquoi arrose-t-on encore après une tempête?', 'Pour boucher les trous et les fentes', 'Pour faire fondre la glace', 'Pour laver les bandes', 'Pour arroser les arbres']],
v: [['Dans le texte, « un bénévole » est…', 'une personne qui aide sans être payée', 'un joueur de hockey', 'un patineur professionnel', 'un vendeur'],
 ['Dans le texte, « une bordée de neige » est…', 'une grosse chute de neige', 'un bonhomme de neige', 'une pelle', 'un flocon']],
f: [['Que se passera-t-il s’il fait chaud en février?', 'La glace risque de fondre.', 'La patinoire va grandir.', 'Les bandes vont tomber.', 'Il faudra plus de bénévoles.'],
 ['Pourquoi ce texte est-il un texte informatif?', 'Il explique comment faire une patinoire.', 'Il raconte une aventure imaginaire.', 'Il rime comme un poème.', 'Il ne contient que des dialogues.'],
 ['Que montre le travail des bénévoles?', 'Ils donnent de leur temps pour le quartier.', 'Ils aiment se lever tard.', 'Ils veulent devenir riches.', 'Ils n’aiment pas l’hiver.']],
o: [['Aimerais-tu aider à faire une patinoire de quartier? Explique pourquoi.', 'Oui ou non avec une raison claire (aider les autres, patiner, ou trouver cela trop froid la nuit…).']],
vf: [['On installe les bandes en premier.', 1], ['On arrose quand il fait chaud.', 0], ['Chaque couche doit geler avant la suivante.', 1], ['On déneige avec de grosses pelles.', 1],
 ['Une patinoire peut durer jusqu’en juillet.', 0], ['Les bénévoles sont payés très cher.', 0], ['On arrose la nuit.', 1], ['Il faut que la température reste sous zéro.', 1]],
nd: ['On joue au hockey le samedi.', 'La patinoire a des lumières de Noël.', 'Les bénévoles boivent du chocolat chaud.'],
secs: [['Avant le grand froid', ['Installer les bandes', 'Attendre le sol gelé', 'Ne pas arroser trop tôt']], ['L’arrosage', ['Arroser la nuit', 'Minces couches d’eau', 'Une dizaine de nuits']], ['L’entretien', ['Déneiger avec des pelles', 'Boucher les fentes', 'Durer jusqu’en mars']]],
res: ['Le texte explique comment des bénévoles préparent, arrosent et entretiennent une patinoire.', 'Le texte raconte un match de hockey.', 'Le texte explique comment faire un bonhomme de neige.', 'Le texte présente un champion de patin.'] },

{ u: 'i', title: 'Le monarque, un grand voyageur',
text: `Le monarque est un papillon orange aux ailes bordées de noir. Chaque année, il fait un voyage incroyable.

Sa nourriture
La chenille du monarque mange seulement les feuilles d’une plante : l’asclépiade. Cette plante contient un poison qui ne fait pas de mal à la chenille. Grâce à ce poison, les oiseaux évitent de la manger, car elle a mauvais goût!

Sa transformation
La chenille grossit pendant environ deux semaines. Puis elle s’accroche sous une feuille et fabrique une chrysalide verte, comme une petite boîte. Dix jours plus tard, un papillon en sort.

Son voyage
À la fin de l’été, les monarques du Québec s’envolent vers le Mexique. Ils parcourent plus de 4 000 kilomètres! Là-bas, des millions de papillons se reposent ensemble dans les sapins des montagnes. Au printemps, leurs petits-enfants reviendront chez nous.`,
e: [['De quelle couleur est le monarque?', 'Orange, bordé de noir', 'Bleu et blanc', 'Jaune et vert', 'Rouge et brun'],
 ['Quelle plante mange la chenille?', 'L’asclépiade', 'Le pissenlit', 'Le trèfle', 'L’érable'],
 ['De quelle couleur est la chrysalide?', 'Verte', 'Orange', 'Noire', 'Blanche'],
 ['Vers quel pays partent les monarques?', 'Le Mexique', 'La France', 'Le Brésil', 'La Chine'],
 ['Combien de kilomètres parcourent-ils?', 'Plus de 4 000', 'Environ 40', 'Environ 400', 'Exactement 10']],
i: [['Pourquoi les oiseaux ne mangent-ils pas la chenille?', 'Elle a mauvais goût à cause du poison.', 'Elle est trop rapide.', 'Elle se cache dans l’eau.', 'Elle est trop grosse.'],
 ['Combien de temps environ faut-il de la chenille au papillon?', 'Environ trois semaines et demie', 'Une journée', 'Un an', 'Deux mois']],
v: [['Dans le texte, « une chrysalide » est…', 'l’enveloppe où la chenille devient papillon', 'une fleur', 'un nid d’oiseau', 'un œuf de poule'],
 ['Dans le texte, « parcourir » veut dire…', 'faire un trajet', 'manger', 'dormir', 'se cacher'],
 ['Dans le texte, « éviter » veut dire…', 'ne pas toucher, rester loin de', 'chercher', 'aimer', 'attraper']],
f: [['Pourquoi les monarques partent-ils à la fin de l’été?', 'Pour fuir le froid de l’hiver', 'Pour trouver de la neige', 'Pour visiter des amis', 'Parce qu’ils sont perdus'],
 ['Pourquoi est-ce important de protéger l’asclépiade?', 'Sans elle, les chenilles n’auraient rien à manger.', 'Elle sent bon.', 'Elle sert à faire des sapins.', 'Les oiseaux la mangent.'],
 ['Que veut dire « leurs petits-enfants reviendront »?', 'Ce sont de nouvelles générations de papillons qui reviennent.', 'Les mêmes papillons reviennent.', 'Les enfants du Mexique viennent ici.', 'Les papillons ne reviennent jamais.']],
o: [['Selon toi, pourquoi dit-on que le monarque est « un grand voyageur »? Donne une preuve du texte.', 'Une explication avec une preuve : il vole plus de 4 000 km jusqu’au Mexique.']],
vf: [['La chenille mange seulement l’asclépiade.', 1], ['Le poison rend la chenille malade.', 0], ['La chrysalide est verte.', 1], ['Le papillon sort après dix jours.', 1],
 ['Les monarques passent l’hiver au Québec.', 0], ['Les monarques se reposent dans des sapins au Mexique.', 1], ['Le monarque est bleu.', 0], ['Les oiseaux adorent manger les chenilles de monarque.', 0]],
nd: ['Le monarque vole à 100 km/h.', 'Les enfants du Mexique nourrissent les papillons.', 'Le monarque vit dix ans.'],
secs: [['Sa nourriture', ['Feuilles d’asclépiade', 'Un poison sans danger pour elle', 'Mauvais goût pour les oiseaux']], ['Sa transformation', ['Deux semaines de croissance', 'Une chrysalide verte', 'Un papillon après dix jours']], ['Son voyage', ['Départ à la fin de l’été', 'Plus de 4 000 kilomètres', 'Repos dans les sapins du Mexique']]],
res: ['Le monarque est un papillon qui se transforme et fait un très long voyage jusqu’au Mexique.', 'Le monarque est un oiseau qui mange des chenilles.', 'Le monarque reste toute sa vie dans le même jardin.', 'Le monarque est une plante qui contient du poison.'] },
];

export const POEMES = [
{ u: 'p', title: 'Premier flocon',
text: `Un flocon tout petit,
Tombé du ciel gris,
Se pose sur mon nez
Et me fait éternuer.

Il est blanc comme le lait,
Léger comme un secret.
Je voudrais le garder,
Mais il a déjà fondu, tant pis!

Demain, ses mille amis
Couvriront le pays,
Et moi, avec mes mitaines,
J’en ferai une montagne.`,
e: [['Où se pose le flocon?', 'Sur mon nez', 'Sur ma main', 'Sur le toit', 'Sur ma tuque'],
 ['Combien de strophes compte ce poème?', 'Trois', 'Deux', 'Quatre', 'Une'],
 ['À quoi le flocon est-il comparé pour sa couleur?', 'Au lait', 'À la neige', 'Au sucre', 'À la lune'],
 ['Quel mot rime avec « petit »?', 'gris', 'nez', 'lait', 'mitaines'],
 ['Que fera l’enfant avec les flocons demain?', 'Une montagne', 'Un château de sable', 'Un gâteau', 'Une boule de cristal']],
i: [['En quelle saison se passe ce poème?', 'Au début de l’hiver', 'En plein été', 'Au printemps', 'À l’automne, sans neige'],
 ['Pourquoi l’enfant ne peut-il pas garder le flocon?', 'Le flocon fond très vite.', 'Le vent l’emporte.', 'Un oiseau le mange.', 'Il le donne à un ami.'],
 ['Qui sont « ses mille amis »?', 'Les autres flocons', 'Les enfants du quartier', 'Les nuages', 'Les oiseaux']],
v: [['Dans le poème, « éternuer » veut dire…', 'faire « atchoum! »', 'rire', 'tousser', 'pleurer'],
 ['Dans le poème, « léger comme un secret » veut dire que le flocon est…', 'très léger et délicat', 'très lourd', 'très bruyant', 'très froid']],
f: [['Quel sentiment l’enfant éprouve-t-il devant le premier flocon?', 'De l’émerveillement', 'De la colère', 'De l’ennui', 'De la peur'],
 ['Pourquoi le poète écrit-il « tant pis! »?', 'L’enfant accepte que le flocon soit fondu.', 'L’enfant est très fâché.', 'L’enfant a gagné un jeu.', 'L’enfant a froid aux pieds.'],
 ['Que veut dire « couvriront le pays »?', 'Il va neiger partout.', 'On va mettre des couvertures.', 'Les flocons vont partir.', 'Il va pleuvoir.']],
o: [['Quel vers de ce poème préfères-tu? Explique pourquoi.', 'Un vers recopié ou nommé avec une raison personnelle (image amusante, rime, souvenir…).']],
vf: [['Le flocon fait éternuer l’enfant.', 1], ['Le ciel est bleu.', 0], ['Le flocon est comparé au lait.', 1], ['L’enfant garde le flocon dans sa poche.', 0],
 ['Le poème parle de mitaines.', 1], ['Le flocon fond.', 1], ['Le poème a cinq strophes.', 0], ['Le poème parle d’une plage.', 0]],
nd: ['L’enfant s’appelle Émile.', 'Il fait −20 degrés.', 'L’enfant habite à Québec.'],
ev: ['Un flocon tout petit,', 'Tombé du ciel gris,', 'Se pose sur mon nez', 'Et me fait éternuer.'],
res: ['Un enfant voit le premier flocon de l’hiver, qui fond, et rêve à la neige de demain.', 'Un enfant fait un château de sable à la plage.', 'Un flocon raconte son voyage en avion.', 'Un enfant a peur de la tempête.'] },

{ u: 'p', title: 'La ruelle en été',
text: `Dans la ruelle, en été,
On entend les enfants crier,
Les vélos qui font « dring »,
Et la balle qui fait « bing »!

Madame Lucie, à sa fenêtre,
Arrose ses fleurs et ses fines herbes.
Le chat Moka, sur la clôture,
Rêve de souris et d’aventure.

Quand le soleil va se coucher,
Tout le monde rentre souper.
La ruelle, enfin, se repose,
Et sent la menthe et la rose.`,
e: [['Que fait madame Lucie?', 'Elle arrose ses fleurs.', 'Elle fait du vélo.', 'Elle joue à la balle.', 'Elle prépare le souper.'],
 ['Comment s’appelle le chat?', 'Moka', 'Caramel', 'Pompon', 'Flocon'],
 ['Quel bruit font les vélos?', '« dring »', '« bing »', '« miaou »', '« boum »'],
 ['Où est le chat?', 'Sur la clôture', 'Sous le vélo', 'Dans la fenêtre', 'Dans l’arbre'],
 ['Quel mot rime avec « clôture »?', 'aventure', 'fenêtre', 'souris', 'herbes']],
i: [['À quel moment de la journée la ruelle se repose-t-elle?', 'Le soir, au coucher du soleil', 'Le matin', 'Le midi', 'À la récréation'],
 ['Pourquoi la ruelle sent-elle la menthe et la rose?', 'À cause des plantes de madame Lucie', 'Parce qu’on y vend des bonbons', 'Parce que le chat se parfume', 'Parce qu’il pleut'],
 ['Pourquoi tout le monde rentre-t-il?', 'C’est l’heure du souper.', 'Il pleut.', 'Le chat est fâché.', 'Il fait trop froid.']],
v: [['Dans le poème, une « ruelle » est…', 'une petite rue derrière les maisons', 'une grande autoroute', 'une rivière', 'un magasin'],
 ['Dans le poème, « les fines herbes » sont…', 'des plantes pour cuisiner', 'de l’herbe à couper', 'des fleurs en papier', 'des légumes géants']],
f: [['Quelle ambiance décrit la première strophe?', 'Joyeuse et bruyante', 'Triste et silencieuse', 'Effrayante', 'Froide et grise'],
 ['Que veut dire « la ruelle se repose »?', 'La ruelle devient calme.', 'La ruelle dort dans un lit.', 'La ruelle disparaît.', 'La ruelle fait du bruit.'],
 ['Pourquoi le poète écrit-il des mots comme « dring » et « bing »?', 'Pour faire entendre les bruits de la ruelle', 'Parce qu’il ne connaît pas d’autres mots', 'Pour donner des noms aux enfants', 'Pour faire peur']],
o: [['Aimerais-tu jouer dans cette ruelle? Explique pourquoi avec un détail du poème.', 'Une opinion avec un détail du poème (les vélos, la balle, le chat, les fleurs…).']],
vf: [['Le poème se passe en été.', 1], ['Madame Lucie fait du vélo.', 0], ['Le chat rêve de souris.', 1], ['La ruelle sent la menthe et la rose.', 1],
 ['Les enfants rentrent pour le dîner du midi.', 0], ['On entend une balle.', 1], ['Le chat s’appelle Biscuit.', 0], ['Le poème a trois strophes.', 1]],
nd: ['Madame Lucie a quatre-vingts ans.', 'Les enfants jouent au hockey.', 'Le chat Moka attrape une souris.'],
ev: ['Dans la ruelle, en été,', 'On entend les enfants crier,', 'Les vélos qui font « dring »,', 'Et la balle qui fait « bing »!'],
res: ['Le poème décrit une ruelle animée l’été, qui devient calme le soir.', 'Le poème raconte une tempête de neige.', 'Le poème parle d’un chat perdu en forêt.', 'Le poème décrit une école un jour de pluie.'] },

{ u: 'p', title: 'Si j’étais un arbre',
text: `Si j’étais un arbre,
Je serais un érable,
Planté au bord du chemin,
Tendant les bras le matin.

Au printemps, je donnerais
Mon eau sucrée en secret.
En été, mon ombre fraîche
Abriterait ta sieste.

En automne, je mettrais
Ma robe rouge et dorée,
Puis l’hiver, sans un mot,
Je dormirais sous mon manteau.`,
e: [['Quel arbre le poète voudrait-il être?', 'Un érable', 'Un sapin', 'Un bouleau', 'Un pommier'],
 ['Où l’arbre serait-il planté?', 'Au bord du chemin', 'Au milieu du lac', 'Dans une cour d’école', 'Sur une montagne'],
 ['Que donnerait l’arbre au printemps?', 'Son eau sucrée', 'Ses pommes', 'Ses fleurs bleues', 'Ses aiguilles'],
 ['De quelles couleurs est la « robe » d’automne?', 'Rouge et dorée', 'Verte et bleue', 'Blanche et grise', 'Noire et brune'],
 ['Quel mot rime avec « mettrais »?', 'dorée', 'mot', 'chemin', 'arbre']],
i: [['Que représente « la robe rouge et dorée »?', 'Les feuilles colorées de l’automne', 'Un vrai vêtement', 'Le coucher de soleil', 'Des fleurs']],
v: [['Dans le poème, « l’ombre fraîche » est…', 'un endroit frais à l’abri du soleil', 'un fantôme', 'un orage', 'une boisson froide'],
 ['Dans le poème, « abriter » veut dire…', 'protéger, mettre à l’abri', 'réveiller', 'arroser', 'couper'],
 ['Dans le poème, « tendre les bras » veut dire, pour un arbre…', 'étendre ses branches', 'dormir', 'tomber', 'pousser sous la terre']],
f: [['Comment le poème est-il organisé?', 'Chaque partie parle d’une saison.', 'Il raconte une journée d’école.', 'Il explique comment couper un arbre.', 'Il présente plusieurs animaux.'],
 ['Que représente « mon manteau » l’hiver?', 'La neige qui couvre l’arbre', 'Un vrai manteau d’hiver', 'Les feuilles vertes', 'L’écorce brûlée'],
 ['Pourquoi l’arbre donne-t-il son eau « en secret »?', 'L’eau d’érable coule à l’intérieur de l’arbre, sans qu’on la voie.', 'Il ne veut pas la partager.', 'Il la cache dans un coffre.', 'Il a honte.'],
 ['Quel genre de personnage serait cet arbre?', 'Généreux, il donne et protège.', 'Égoïste', 'Peureux', 'Méchant']],
o: [['Si tu étais un arbre, lequel serais-tu? Explique pourquoi.', 'Un arbre nommé (érable, sapin, pommier…) avec une raison personnelle.']],
vf: [['Le poète voudrait être un érable.', 1], ['L’arbre donne de l’eau sucrée au printemps.', 1], ['En été, l’arbre perd toutes ses feuilles.', 0], ['L’arbre dort l’hiver.', 1],
 ['L’arbre est planté dans un lac.', 0], ['La robe d’automne est rouge et dorée.', 1], ['Le poème parle des quatre saisons.', 1], ['L’arbre chante l’hiver.', 0]],
nd: ['L’arbre a cent ans.', 'Un écureuil vit dans l’arbre.', 'Le chemin mène à l’école.'],
ev: ['Si j’étais un arbre,', 'Je serais un érable,', 'Planté au bord du chemin,', 'Tendant les bras le matin.'],
res: ['Le poète imagine qu’il est un érable et décrit ce qu’il ferait à chaque saison.', 'Le poète coupe un érable pour faire du bois.', 'Un arbre déménage en ville.', 'Le poème raconte une cabane à sucre qui brûle.'] },

{ u: 'p', title: 'Mon chien Patate',
text: `Mon chien s’appelle Patate,
Il a quatre grosses pattes,
Une queue en hélice
Et un nez de saucisse.

Quand je rentre de l’école,
Il saute et il s’envole,
Il me lèche les joues,
Il se roule à mes genoux.

Il mange mes souliers,
Il dort sur l’oreiller,
Mais quand j’ai du chagrin,
C’est lui, mon meilleur copain.`,
e: [['Comment s’appelle le chien?', 'Patate', 'Moka', 'Caramel', 'Biscuit'],
 ['Combien de pattes a le chien?', 'Quatre', 'Trois', 'Deux', 'Six'],
 ['Que mange le chien qu’il ne devrait pas?', 'Les souliers', 'Les crayons', 'Les fleurs', 'Les livres'],
 ['Où dort le chien?', 'Sur l’oreiller', 'Dans le garage', 'Sous la table', 'Dans sa niche'],
 ['Quel mot rime avec « hélice »?', 'saucisse', 'pattes', 'école', 'joues']],
i: [['Comment se sent le chien quand l’enfant rentre?', 'Très content', 'Fâché', 'Endormi', 'Malade'],
 ['Pourquoi dit-on que la queue est « en hélice »?', 'Elle tourne très vite.', 'Elle est très longue.', 'Elle est cassée.', 'Elle est en métal.'],
 ['Le chien est-il toujours sage?', 'Non, il fait aussi des bêtises.', 'Oui, toujours.', 'Il ne bouge jamais.', 'Le poème ne parle que de ses bêtises.']],
v: [['Dans le poème, « le chagrin » veut dire…', 'la tristesse', 'la faim', 'la joie', 'la fatigue'],
 ['Dans le poème, « un copain » est…', 'un ami', 'un voisin fâché', 'un jouet', 'un professeur']],
f: [['Pourquoi le chien est-il le meilleur copain de l’enfant?', 'Il le console quand il est triste.', 'Il mange ses souliers.', 'Il dort beaucoup.', 'Il a un nez de saucisse.'],
 ['Quel est le ton de ce poème?', 'Drôle et tendre', 'Triste et sombre', 'Fâché', 'Effrayant'],
 ['Que veut dire « il s’envole »?', 'Il saute très haut de joie.', 'Il prend l’avion.', 'Il a des ailes.', 'Il s’enfuit.']],
o: [['Aimerais-tu avoir un chien comme Patate? Explique pourquoi.', 'Oui ou non, avec une raison tirée du poème (il est affectueux, il console, mais il mange les souliers…).']],
vf: [['Le chien s’appelle Patate.', 1], ['Le chien a un nez de saucisse.', 1], ['Le chien dort dans sa niche.', 0], ['Le chien mange les souliers.', 1],
 ['Le chien lèche les joues de l’enfant.', 1], ['Le chien mord l’enfant.', 0], ['L’enfant n’aime pas son chien.', 0], ['Le poème a trois strophes.', 1]],
nd: ['Patate est un caniche.', 'Patate a cinq ans.', 'L’enfant a aussi un chat.'],
ev: ['Mon chien s’appelle Patate,', 'Il a quatre grosses pattes,', 'Une queue en hélice', 'Et un nez de saucisse.'],
res: ['Un enfant décrit son chien Patate, coquin mais très affectueux.', 'Un enfant cherche son chien perdu.', 'Un chien raconte sa journée à l’école.', 'Un enfant a peur des gros chiens.'] },

{ u: 'p', title: 'La nuit au camping',
text: `Sous la tente, il fait noir,
J’entends le vent dans le boisé.
Est-ce un ours? Est-ce un loup?
Non, c’est papa qui ronfle un coup!

Les grenouilles chantent au lac,
Le feu fait des petits « crac ».
Une chouette, perchée là-haut,
Dit « hou-hou » à ses oiseaux.

Je compte les étoiles par milliers,
Ma lampe de poche à mes pieds.
Mes yeux se ferment tout doucement…
Bonne nuit, la forêt, à tantôt!`,
e: [['Où dort l’enfant?', 'Sous la tente', 'Dans un chalet', 'Dans sa chambre', 'Dans l’auto'],
 ['Qui fait le bruit qui fait peur?', 'Papa qui ronfle', 'Un ours', 'Un loup', 'Le vent']],
i: [['Pourquoi l’enfant pense-t-il à un ours ou à un loup?', 'Il entend un bruit dans le noir et il a un peu peur.', 'Il voit un ours.', 'Il lit un livre sur les loups.', 'Papa lui fait une blague.'],
 ['À quel moment se passe le poème?', 'La nuit', 'Le matin', 'Le midi', 'L’après-midi'],
 ['Comment se sent l’enfant à la fin?', 'Calme et endormi', 'Terrifié', 'Fâché', 'Affamé']],
v: [['Dans le poème, « un boisé » est…', 'un petit bois', 'une boîte', 'un bateau', 'une grande ville'],
 ['Dans le poème, « perchée » veut dire…', 'posée en hauteur', 'cachée sous l’eau', 'couchée par terre', 'perdue']],
f: [['Pourquoi le poème est-il drôle à la fin de la première strophe?', 'Le bruit effrayant n’est que papa qui ronfle.', 'Un ours danse.', 'Le loup chante.', 'La tente s’envole.'],
 ['Avec quel sens l’enfant découvre-t-il surtout la nuit?', 'L’ouïe : il entend beaucoup de bruits.', 'Le goût', 'L’odorat seulement', 'Le toucher seulement'],
 ['Que veut dire « à tantôt »?', 'À plus tard', 'Adieu pour toujours', 'Bonjour', 'Merci']],
e2: [],
o: [['Aimerais-tu dormir sous la tente en forêt? Explique pourquoi.', 'Oui ou non avec une raison (les étoiles, les bruits de la nature, ou la peur du noir…).']],
vf: [['Les grenouilles chantent au lac.', 1], ['Une chouette dit « hou-hou ».', 1], ['L’enfant voit un vrai loup.', 0], ['Le feu fait des petits « crac ».', 1],
 ['La lampe de poche est aux pieds de l’enfant.', 1], ['Il pleut très fort.', 0], ['L’enfant dort à l’hôtel.', 0], ['L’enfant compte les étoiles.', 1]],
nd: ['Le camping est au bord de la mer.', 'Maman fait cuire des guimauves.', 'L’enfant a un frère.'],
ev: ['Sous la tente, il fait noir,', 'J’entends le vent dans le boisé.', 'Est-ce un ours? Est-ce un loup?', 'Non, c’est papa qui ronfle un coup!'],
res: ['La nuit au camping, un enfant écoute les bruits de la forêt avant de s’endormir.', 'Un enfant rencontre un ours au camping.', 'La famille fait un feu de camp en plein jour.', 'Papa se perd dans la forêt.'] },
];
// Questions explicites supplémentaires pour « La nuit au camping »
POEMES[4].e.push(['Qui chante au lac?', 'Les grenouilles', 'Les canards', 'Les enfants', 'Les loups'],
  ['Que dit la chouette?', '« hou-hou »', '« crac »', '« dring »', '« coin-coin »'],
  ['Que compte l’enfant?', 'Les étoiles', 'Les moutons', 'Les arbres', 'Les grenouilles']);
delete POEMES[4].e2;
