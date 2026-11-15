// Petit Hibou — « Je lis des histoires » : lecture de textes variés (fin 2e – 3e année, Québec).
// Banque de textes originaux ; chaque question = un choix à partir du texte affiché.
// t(niveau, type, titre, texte, [[question, bonne réponse, mauvaise1, mauvaise2, mauvaise3], …])

const FR = 'fr-CA';
const T = [];
const t = (l, type, title, text, qs) => T.push({ l, type, title, text, qs });

/* ============================ NIVEAU 1 (fin de 2e) ============================ */

t(1, 'récit', 'Les patins de Léa',
`Samedi matin, Léa et son grand frère Samuel vont à la patinoire du parc. Il fait très froid, mais le soleil brille. Léa a de nouveaux patins blancs, un cadeau de sa tante.

Dès qu’elle met un pied sur la glace, ses jambes se mettent à trembler. Elle s’accroche à la bande.

— Je vais tomber, dit-elle.
— Pas si tu me donnes la main, répond Samuel. Regarde devant toi, pas tes pieds.

Léa prend la main de son frère. Pas à pas, elle avance. Elle glisse un peu, puis encore un peu. Soudain, elle se rend compte que Samuel l’a lâchée depuis longtemps!

— Je patine toute seule! crie-t-elle, folle de joie.

À midi, ses joues sont rouges et ses orteils sont gelés, mais elle a un grand sourire. Elle a hâte de revenir dimanche.`,
[
 ['Qui a offert les patins à Léa?', 'Sa tante', 'Son frère', 'Sa grand-mère', 'Sa mère'],
 ['Pourquoi Léa s’accroche-t-elle à la bande?', 'Elle a peur de tomber.', 'Elle est fatiguée.', 'Elle veut jouer au hockey.', 'Elle a perdu ses gants.'],
 ['Quel conseil Samuel donne-t-il à Léa?', 'Regarder devant elle', 'Regarder ses pieds', 'Aller très vite', 'Fermer les yeux'],
 ['Que fait Léa juste après avoir pris la main de son frère?', 'Elle avance pas à pas.', 'Elle tombe sur la glace.', 'Elle rentre à la maison.', 'Elle enlève ses patins.'],
 ['Pourquoi Léa est-elle surprise?', 'Samuel ne la tient plus par la main.', 'Il commence à neiger.', 'Sa tante arrive au parc.', 'Ses patins sont trop petits.'],
 ['Dans le texte, « folle de joie » veut dire…', 'très contente', 'très fâchée', 'très fatiguée', 'très gênée'],
 ['Comment sait-on que Léa a aimé sa journée?', 'Elle a un grand sourire et veut revenir dimanche.', 'Elle a les joues rouges.', 'Elle a froid aux orteils.', 'Elle patine avec son frère.'],
]);

t(1, 'informatif', 'Le castor',
`Le castor est l’animal symbole du Canada. Il vit près des lacs et des rivières, dans nos forêts.

Le castor a quatre grandes dents très solides. Avec elles, il coupe des arbres. Il mange l’écorce et les petites branches. Avec le reste du bois, il construit un barrage. Ce mur d’arbres et de boue arrête l’eau de la rivière. Derrière le barrage, il se forme un petit lac.

Au milieu du lac, le castor bâtit sa hutte. L’entrée de sa maison est cachée sous l’eau. Ainsi, les loups et les ours ne peuvent pas entrer facilement.

Le castor est un très bon nageur. Sa queue large et plate lui sert de gouvernail dans l’eau. Quand il est en danger, il frappe l’eau avec sa queue. Splash! Le bruit avertit les autres castors.

En hiver, le castor reste dans sa hutte. Il mange les branches qu’il a gardées sous l’eau.`,
[
 ['Où vit le castor?', 'Près des lacs et des rivières', 'Dans le désert', 'Au sommet des montagnes', 'Dans les villes'],
 ['À quoi servent les grandes dents du castor?', 'À couper des arbres', 'À creuser la glace', 'À attraper des poissons', 'À faire du bruit'],
 ['Que fait le barrage du castor?', 'Il arrête l’eau de la rivière.', 'Il sert de pont pour les loups.', 'Il garde le bois au sec.', 'Il fait fuir les ours.'],
 ['Pourquoi l’entrée de la hutte est-elle sous l’eau?', 'Pour que les ennemis ne puissent pas entrer facilement', 'Pour que le castor mange du poisson', 'Pour avoir plus de lumière', 'Pour garder la hutte chaude'],
 ['À quoi sert la queue du castor?', 'À nager et à avertir les autres', 'À couper l’écorce', 'À transporter la boue', 'À se cacher'],
 ['Dans le texte, le mot « gouvernail » est…', 'ce qui aide à diriger dans l’eau', 'un outil pour couper', 'un abri sous l’eau', 'un cri d’alerte'],
 ['Quelle est l’idée principale du texte?', 'Il présente la vie et le travail du castor.', 'Il raconte une chasse au castor.', 'Il explique comment pêcher.', 'Il parle du climat du Canada.'],
]);

t(1, 'lettre', 'Une lettre pour grand-maman',
`Montréal, le 12 mars

Chère grand-maman,

Comment vas-tu? Moi, je vais très bien. Je t’écris pour te remercier de ton beau cadeau. J’adore la tuque rouge que tu as tricotée! Je la porte tous les jours à l’école. Mon ami Noé trouve qu’elle est la plus belle de la classe.

À l’école, nous préparons un spectacle pour la fin de l’année. Je vais jouer le rôle d’un renard rusé. Mon costume est orange avec une grande queue en laine. Ma mère va le coudre cette fin de semaine.

Est-ce que tu viendras me voir? Le spectacle aura lieu le 20 juin, à 14 h, dans le gymnase. Papa dit qu’il ira te chercher en auto.

Je t’aime très fort. J’ai hâte de te faire un gros câlin.

Ta petite-fille,
Camille`,
[
 ['Pourquoi Camille écrit-elle à sa grand-mère?', 'Pour la remercier de son cadeau', 'Pour lui demander de l’argent', 'Pour lui dire qu’elle déménage', 'Pour s’excuser'],
 ['Quel cadeau Camille a-t-elle reçu?', 'Une tuque rouge', 'Un costume de renard', 'Un livre de contes', 'Des mitaines orange'],
 ['Quel rôle Camille va-t-elle jouer dans le spectacle?', 'Un renard rusé', 'Un loup affamé', 'Un castor travailleur', 'Un hibou savant'],
 ['Qui va coudre le costume?', 'La mère de Camille', 'La grand-mère', 'Noé', 'Le professeur'],
 ['Quand aura lieu le spectacle?', 'Le 20 juin à 14 h', 'Le 12 mars à 14 h', 'Le 20 mars à 12 h', 'Le 12 juin à 20 h'],
 ['Comment sait-on que Camille aime sa tuque?', 'Elle la porte tous les jours.', 'Elle la prête à Noé.', 'Elle la range dans un tiroir.', 'Elle l’a choisie au magasin.'],
 ['Qui ira chercher grand-maman en auto?', 'Papa', 'Maman', 'Noé', 'Camille'],
]);

t(1, 'recette', 'Les crêpes du dimanche',
`Recette : les crêpes du dimanche

Ingrédients (pour 8 crêpes) :
• 1 tasse de farine
• 2 œufs
• 1 tasse de lait
• 1 pincée de sel
• un peu de beurre pour la poêle

Étapes :
1. Verse la farine dans un grand bol. Fais un petit creux au milieu.
2. Casse les œufs dans le creux et ajoute le sel.
3. Verse le lait peu à peu en remuant avec un fouet. Il ne doit pas rester de grumeaux.
4. Laisse reposer la pâte pendant 15 minutes.
5. Fais fondre un peu de beurre dans une poêle chaude.
6. Verse une louche de pâte. Quand le dessous est doré, retourne la crêpe.
7. Mange-la avec du sirop d’érable. Miam!

Attention : demande à un adulte de t’aider avec la poêle chaude.`,
[
 ['Combien de crêpes peut-on faire avec cette recette?', '8', '2', '15', '12'],
 ['Quel ingrédient n’est PAS dans la recette?', 'Le sucre', 'La farine', 'Le lait', 'Les œufs'],
 ['Que faut-il faire juste après avoir cassé les œufs dans le creux?', 'Ajouter le sel', 'Laisser reposer la pâte', 'Faire fondre le beurre', 'Retourner la crêpe'],
 ['Pourquoi remue-t-on avec un fouet?', 'Pour qu’il n’y ait pas de grumeaux', 'Pour refroidir le lait', 'Pour casser les œufs', 'Pour faire dorer la pâte'],
 ['Combien de temps la pâte doit-elle reposer?', '15 minutes', '5 minutes', '1 heure', '50 minutes'],
 ['Quand retourne-t-on la crêpe?', 'Quand le dessous est doré', 'Quand la pâte est froide', 'Quand le beurre est dur', 'Quand le sirop est chaud'],
 ['Pourquoi doit-on demander l’aide d’un adulte?', 'La poêle est chaude.', 'Le lait est trop lourd.', 'Les œufs sont dangereux.', 'La farine est difficile à verser.'],
]);

t(1, 'récit', 'Le chien qui aimait les bottes',
`Biscuit est un petit chien brun avec une grande langue. Il vit chez la famille Tremblay, à Trois-Rivières. Biscuit adore les bottes. Il ne les mange pas. Il les vole!

Lundi, la botte de papa a disparu. Mardi, c’est celle de maman qui est partie. Mercredi, Éloïse n’a plus retrouvé sa botte rose.

— Quelqu’un prend nos bottes, dit papa en fronçant les sourcils.

Jeudi matin, Éloïse décide de surveiller la maison. Elle se cache derrière le canapé. Bientôt, elle entend de petits pas. Clic, clic, clic. Biscuit entre dans le salon avec une botte dans la gueule. Il la porte dans son panier et se couche dessus, très fier.

Éloïse éclate de rire. Dans le panier, il y a trois bottes bien rangées!

— Voilà notre voleur! s’écrie-t-elle.

Depuis ce jour, la famille garde les bottes en haut, sur une étagère. Biscuit, lui, a reçu un jouet en caoutchouc… en forme de botte.`,
[
 ['Où habite la famille Tremblay?', 'À Trois-Rivières', 'À Québec', 'À Gatineau', 'À Sherbrooke'],
 ['Que fait Biscuit avec les bottes?', 'Il les vole.', 'Il les mange.', 'Il les enterre dans le jardin.', 'Il les déchire.'],
 ['Que se passe-t-il le mercredi?', 'La botte rose d’Éloïse disparaît.', 'La botte de papa disparaît.', 'Biscuit est attrapé.', 'La famille achète un jouet.'],
 ['Pourquoi Éloïse se cache-t-elle derrière le canapé?', 'Pour surveiller la maison', 'Pour jouer à cache-cache', 'Pour dormir', 'Pour faire peur à papa'],
 ['Qu’est-ce qu’Éloïse trouve dans le panier de Biscuit?', 'Trois bottes', 'Une seule botte', 'Des biscuits', 'Un jouet en caoutchouc'],
 ['Comment sait-on que Biscuit est content de lui?', 'Il se couche sur les bottes, très fier.', 'Il aboie très fort.', 'Il se cache sous la table.', 'Il court dans le jardin.'],
 ['Que fait la famille pour régler le problème?', 'Elle range les bottes en haut, sur une étagère.', 'Elle donne Biscuit à des voisins.', 'Elle achète de nouvelles bottes.', 'Elle ferme la porte du salon.'],
 ['Pourquoi cette histoire est-elle drôle?', 'Le voleur de bottes est un petit chien.', 'Il y a une grosse tempête.', 'Papa a perdu ses clés.', 'Éloïse a peur du noir.'],
]);

t(1, 'affiche', 'Fête de la lecture',
`GRANDE FÊTE DE LA LECTURE
à la bibliothèque Les Trois Pommiers

Samedi 4 octobre, de 10 h à 15 h

Au programme :
• 10 h : Heure du conte avec Mme Lucie, la conteuse (pour les 5 à 8 ans)
• 11 h : Atelier de bricolage — fabrique ton signet!
• 12 h : Pique-nique dans le parc (apporte ton lunch)
• 13 h : Vente de livres usagés, à partir de 1 $
• 14 h : Spectacle de marionnettes « Le loup qui avait peur »

Entrée gratuite!
Les enfants de moins de 6 ans doivent venir avec un adulte.

Pour t’inscrire à l’atelier de bricolage, passe au comptoir de prêt ou téléphone au 418 555-0142.

Les places sont limitées : inscris-toi vite!`,
[
 ['Quand a lieu la fête de la lecture?', 'Le samedi 4 octobre', 'Le dimanche 4 octobre', 'Le samedi 14 octobre', 'Le vendredi 4 octobre'],
 ['À quelle heure commence l’heure du conte?', '10 h', '11 h', '12 h', '14 h'],
 ['Que fait-on à 11 h?', 'On fabrique un signet.', 'On regarde un spectacle.', 'On achète des livres.', 'On pique-nique.'],
 ['À quoi sert cette affiche?', 'À inviter les gens à une activité', 'À raconter une histoire', 'À expliquer une recette', 'À vendre un livre'],
 ['Combien coûte l’entrée?', 'Rien, c’est gratuit.', '1 $', '5 $', '10 $'],
 ['Que doit apporter un enfant pour le pique-nique?', 'Son lunch', 'Un livre', 'Un signet', 'Une marionnette'],
 ['Pourquoi faut-il s’inscrire vite à l’atelier?', 'Les places sont limitées.', 'L’atelier est payant.', 'L’atelier est à l’extérieur.', 'Il commence très tôt.'],
]);

t(1, 'informatif', 'L’automne',
`En automne, tout change autour de nous. Les journées raccourcissent et l’air devient plus frais. On sort les manteaux et les bottes.

Les feuilles des érables changent de couleur. Elles deviennent jaunes, orange et rouges. C’est très beau! Puis, elles tombent et couvrent le sol. Les enfants adorent sauter dans les tas de feuilles.

Les animaux se préparent pour l’hiver. L’écureuil cache des noix dans les arbres. L’ours mange beaucoup pour faire des réserves de gras. Il dormira dans sa tanière pendant les mois froids. Les outardes, elles, s’envolent vers le sud en formant un grand V dans le ciel. Elles cherchent un endroit plus chaud.

C’est aussi le temps des récoltes. Les agriculteurs cueillent les pommes, les citrouilles et les courges. Fin octobre, on fête l’Halloween. On sculpte des citrouilles et on se déguise.

L’automne commence en septembre et se termine en décembre.`,
[
 ['Quelles couleurs prennent les feuilles des érables?', 'Jaune, orange et rouge', 'Bleu, vert et noir', 'Rose, violet et gris', 'Blanc, brun et bleu'],
 ['Que fait l’écureuil en automne?', 'Il cache des noix.', 'Il dort dans une tanière.', 'Il s’envole vers le sud.', 'Il construit un barrage.'],
 ['Pourquoi l’ours mange-t-il beaucoup?', 'Pour faire des réserves avant l’hiver', 'Parce qu’il a froid', 'Parce qu’il aime les citrouilles', 'Pour grandir plus vite'],
 ['Que font les outardes en automne?', 'Elles partent vers le sud.', 'Elles restent au Québec.', 'Elles se cachent dans les arbres.', 'Elles dorment dans le sol.'],
 ['Dans le texte, « les récoltes » veut dire…', 'cueillir ce qui a poussé', 'planter des graines', 'ramasser des feuilles mortes', 'préparer la neige'],
 ['Quelle fête a lieu à la fin d’octobre?', 'L’Halloween', 'Noël', 'Pâques', 'La Saint-Jean'],
 ['Quelle est l’idée principale du texte?', 'L’automne change la nature et la vie des animaux.', 'L’automne est la saison la plus froide.', 'Les enfants adorent les citrouilles.', 'Les érables donnent du sirop.'],
]);

t(1, 'récit', 'Un dimanche à la cabane à sucre',
`Dimanche, la classe de Noémie visite une cabane à sucre dans les Laurentides. Dans l’autobus, tout le monde chante. Il y a encore de la neige sur le sol, mais le soleil de mars est déjà chaud.

À la cabane, un monsieur à la grosse moustache les accueille. Il s’appelle monsieur Gilbert.

— Venez voir comment on fait le sirop! dit-il.

Il montre un grand arbre avec un petit seau accroché au tronc. L’eau d’érable coule goutte à goutte, ploc, ploc. Elle est presque transparente.

— Il faut faire bouillir cette eau pendant des heures, explique monsieur Gilbert. Elle devient épaisse et sucrée.

Puis, il verse du sirop chaud sur la neige. Cela forme de la tire! Chaque enfant en prend un bâtonnet. Noémie lèche la sienne avec bonheur.

— C’est la meilleure chose que j’ai mangée de ma vie! dit-elle.

Au dîner, il y a des crêpes, des saucisses et des oreilles de crisse. Ensuite, on danse au son du violon.`,
[
 ['Où la classe de Noémie va-t-elle?', 'À une cabane à sucre', 'À une ferme', 'À une patinoire', 'Au zoo'],
 ['Quelle saison est-ce?', 'La fin de l’hiver, au printemps qui arrive', 'L’automne', 'L’été', 'Le début de l’hiver'],
 ['Comment est l’eau d’érable au début?', 'Presque transparente', 'Épaisse et brune', 'Rouge', 'Très salée'],
 ['Que faut-il faire pour obtenir du sirop?', 'Faire bouillir l’eau d’érable pendant des heures', 'Mélanger l’eau avec de la farine', 'Laisser l’eau geler', 'Couper l’arbre'],
 ['Que se passe-t-il quand le sirop chaud est versé sur la neige?', 'Il forme de la tire.', 'Il disparaît.', 'Il devient transparent.', 'Il fait fondre la neige.'],
 ['Comment sait-on que Noémie aime la tire?', 'Elle dit que c’est la meilleure chose qu’elle a mangée.', 'Elle en donne à monsieur Gilbert.', 'Elle en met dans son sac.', 'Elle en mange trois bâtonnets.'],
 ['Que fait-on après le dîner?', 'On danse au son du violon.', 'On retourne à l’école.', 'On visite l’érablière.', 'On chante dans l’autobus.'],
]);

t(1, 'mode d’emploi', 'Planter une graine de haricot',
`Mode d’emploi : planter un haricot

Tu as besoin de :
• un pot en plastique
• de la terre
• un haricot sec
• un arrosoir ou un verre d’eau

Étapes :
1. Remplis le pot de terre jusqu’à 2 cm du bord.
2. Avec ton doigt, fais un petit trou de 3 cm au milieu.
3. Mets le haricot dans le trou. Recouvre-le de terre.
4. Arrose doucement. La terre doit être humide, mais pas trempée.
5. Place le pot près d’une fenêtre. Le haricot a besoin de lumière.
6. Arrose un peu chaque jour.

Après une semaine, une petite pousse verte sort de la terre. Dans un mois, ta plante aura plusieurs feuilles. Si tu veux, plante-la dehors au mois de juin.

Conseil : si la plante est penchée, tourne le pot de temps en temps!`,
[
 ['De quoi a-t-on besoin pour planter le haricot?', 'D’un pot, de terre, d’un haricot et d’eau', 'D’un jardin et d’une pelle', 'D’un pot et de sable', 'De graines de tomates'],
 ['Que fait-on juste après avoir rempli le pot de terre?', 'On fait un petit trou au milieu.', 'On arrose le pot.', 'On place le pot près d’une fenêtre.', 'On met le haricot sur la terre.'],
 ['Quelle profondeur doit avoir le trou?', '3 cm', '2 cm', '10 cm', '1 cm'],
 ['Pourquoi place-t-on le pot près d’une fenêtre?', 'Le haricot a besoin de lumière.', 'La terre doit sécher.', 'Il faut que le pot soit au chaud.', 'Il faut surveiller le voisin.'],
 ['Quand une petite pousse verte apparaît-elle?', 'Après une semaine', 'Le jour même', 'Après un an', 'Après deux jours'],
 ['Dans le texte, « trempée » veut dire…', 'très mouillée', 'très chaude', 'très sale', 'très sèche'],
 ['Que peut-on faire en juin?', 'Planter la plante dehors', 'Couper le haricot', 'Arrêter d’arroser', 'Acheter un autre pot'],
]);

t(1, 'poème', 'Quand vient la neige',
`Quand vient la neige

Un petit flocon blanc
Danse au bout de mon nez.
Un autre flocon blanc
Me chatouille le menton.

Bientôt le toit est blanc,
Les arbres ont un grand manteau.
Le chat regarde par la fenêtre,
Il n’ose pas mettre une patte dehors.

Vite, vite, mes mitaines!
Dehors, je roule une boule,
Puis une autre, encore plus grosse.
Ça y est, voici mon bonhomme!

Il a deux cailloux pour les yeux,
Une carotte pour le nez.
Quand le soleil reviendra,
Je lui dirai : « À l’an prochain! »`,
[
 ['Où le premier flocon danse-t-il?', 'Au bout du nez', 'Sur le toit', 'Sur la fenêtre', 'Dans la main'],
 ['Que fait le chat?', 'Il regarde par la fenêtre.', 'Il joue dans la neige.', 'Il dort sur le toit.', 'Il roule une boule.'],
 ['Que fait l’enfant du poème?', 'Il fabrique un bonhomme de neige.', 'Il fait du ski.', 'Il rentre à la maison.', 'Il lance des boules au chat.'],
 ['Avec quoi l’enfant fait-il le nez du bonhomme?', 'Une carotte', 'Un caillou', 'Une mitaine', 'Une branche'],
 ['Dans le poème, « un grand manteau » pour les arbres veut dire…', 'une couche de neige', 'un vêtement pour l’hiver', 'un nid d’oiseau', 'de la glace sur l’eau'],
 ['Pourquoi l’enfant dit-il « À l’an prochain! »?', 'Le bonhomme de neige fondra au soleil.', 'Il part en voyage.', 'Il change d’école.', 'Il a perdu ses mitaines.'],
]);

t(1, 'récit', 'Le vélo de Mathis',
`Pour son anniversaire, Mathis reçoit un grand vélo bleu. Il est neuf, brillant, avec une sonnette. Mais il y a un problème : il est un peu trop grand pour lui.

— Tu vas grandir, dit papa. Essaie-le.

Mathis monte sur le siège. Ses pieds ne touchent pas bien le sol. Il a peur. Il ne veut pas tomber devant ses amis, qui l’attendent dans la ruelle.

— Je ne suis pas capable, murmure-t-il.

Sa voisine Zoé s’approche. Elle a huit ans, comme lui.

— Moi aussi, j’avais peur quand j’ai appris, dit-elle. Je vais te tenir le siège.

Zoé court derrière Mathis. Il pédale fort. Le vélo tremble, puis il roule droit. Après quelques minutes, Mathis fait le tour de la ruelle tout seul. Les amis applaudissent.

— Tu vois? dit Zoé. Ce n’était pas si difficile!

Le soir, Mathis dit à papa :
— Demain, je veux apprendre à freiner dans les côtes!`,
[
 ['Qu’est-ce que Mathis reçoit pour son anniversaire?', 'Un grand vélo bleu', 'Un casque rouge', 'Une trottinette', 'Un ballon'],
 ['Quel est le problème avec le vélo?', 'Il est un peu trop grand.', 'Il est cassé.', 'Il est trop lourd.', 'Il est de la mauvaise couleur.'],
 ['Pourquoi Mathis a-t-il peur?', 'Il ne veut pas tomber devant ses amis.', 'Il n’aime pas la couleur du vélo.', 'Il a perdu sa sonnette.', 'Il est malade.'],
 ['Comment Zoé aide-t-elle Mathis?', 'Elle lui tient le siège.', 'Elle lui prête son casque.', 'Elle lui donne son vélo.', 'Elle appelle son père.'],
 ['Que se passe-t-il juste après que Mathis pédale fort?', 'Le vélo roule droit.', 'Mathis tombe.', 'Les amis s’en vont.', 'Zoé le dépasse.'],
 ['Comment Mathis se sent-il à la fin?', 'Fier et plein de courage', 'Triste et fâché', 'Fatigué et ennuyé', 'Jaloux de Zoé'],
 ['Que veut dire « je ne suis pas capable »?', 'Je pense que je n’y arriverai pas.', 'Je suis trop petit pour sortir.', 'Je n’ai pas envie de jouer.', 'Je suis très fort.'],
]);

t(1, 'informatif', 'Le cœur',
`Pose ta main sur ta poitrine. Tu sens quelque chose qui bat? C’est ton cœur!

Le cœur est un muscle. Il est à peu près gros comme ton poing. Il se trouve au milieu de ta poitrine, un peu vers la gauche.

Le cœur fonctionne comme une pompe. Il envoie le sang dans tout ton corps, par de petits tuyaux appelés vaisseaux. Le sang transporte l’air et la nourriture dont ton corps a besoin pour travailler. Le sang revient ensuite vers le cœur, et le voyage recommence.

Ton cœur ne se repose jamais. Il bat jour et nuit, même quand tu dors. Quand tu es calme, il bat doucement. Quand tu cours, il bat plus vite, car tes muscles ont besoin de plus de sang.

Pour avoir un cœur en santé, il faut bouger, bien manger et bien dormir. Joue dehors tous les jours!`,
[
 ['Quelle est la grosseur du cœur?', 'À peu près comme un poing', 'Comme un ballon', 'Comme une noix', 'Comme une assiette'],
 ['Où se trouve le cœur?', 'Au milieu de la poitrine, un peu vers la gauche', 'Dans le ventre', 'Dans la tête', 'Dans le bras gauche'],
 ['À quoi le cœur est-il comparé dans le texte?', 'À une pompe', 'À un ballon', 'À une horloge', 'À un moteur d’auto'],
 ['Que transporte le sang dans le corps?', 'L’air et la nourriture dont le corps a besoin', 'Seulement de l’eau', 'Des os', 'Des idées'],
 ['Pourquoi le cœur bat-il plus vite quand on court?', 'Les muscles ont besoin de plus de sang.', 'Le cœur a froid.', 'Le cœur est fatigué.', 'On respire moins.'],
 ['Que fait le cœur pendant que tu dors?', 'Il continue de battre.', 'Il s’arrête.', 'Il bat plus fort.', 'Il se repose un peu.'],
 ['Quel conseil le texte donne-t-il pour un cœur en santé?', 'Bouger, bien manger et bien dormir', 'Rester couché', 'Manger beaucoup de bonbons', 'Courir sans arrêt'],
]);

t(1, 'récit', 'La panne d’électricité',
`Un soir d’hiver, une grosse tempête de neige frappe la ville. Le vent souffle fort. Tout à coup, clac! Toutes les lumières s’éteignent. C’est la panne d’électricité.

— Je n’aime pas le noir, dit Anaïs, sept ans, en serrant son toutou.

— Pas de panique, répond sa mère. On va faire une soirée spéciale.

Maman sort des chandelles du tiroir. Papa allume le foyer. Bientôt, une lumière douce et chaude remplit le salon. Les ombres dansent sur les murs.

Toute la famille s’installe sous des couvertures. Papa fait griller des guimauves au bout de bâtons. Anaïs adore ça. Ensuite, grand frère Louis fait des ombres chinoises avec une lampe de poche : un lapin, un oiseau, un grand loup.

— Encore! demande Anaïs.

Vers neuf heures, la lumière revient d’un seul coup. Tout le monde pousse un « Oh! » de déception.

— Déjà? soupire Anaïs. Moi, je voulais rester dans le noir!`,
[
 ['Pourquoi les lumières s’éteignent-elles?', 'Il y a une tempête de neige.', 'Papa a coupé le courant.', 'Il est l’heure de dormir.', 'Les ampoules sont brûlées.'],
 ['Comment Anaïs se sent-elle au début de la panne?', 'Elle a peur du noir.', 'Elle est très contente.', 'Elle est fâchée.', 'Elle s’ennuie.'],
 ['Qu’est-ce que la mère sort du tiroir?', 'Des chandelles', 'Des lampes de poche', 'Des guimauves', 'Des couvertures'],
 ['Qu’est-ce que Papa fait griller?', 'Des guimauves', 'Des saucisses', 'Du pain', 'Des biscuits'],
 ['Que fait Louis avec la lampe de poche?', 'Il fait des ombres chinoises.', 'Il lit un livre.', 'Il cherche les chandelles.', 'Il fait peur à Anaïs.'],
 ['Comment sait-on que la famille aime cette soirée?', 'Tout le monde est déçu quand la lumière revient.', 'Tout le monde dort tôt.', 'Papa téléphone à Hydro-Québec.', 'Anaïs pleure.'],
 ['Dans le texte, « pas de panique » veut dire…', 'ne t’inquiète pas', 'cours vite', 'ferme la porte', 'crie fort'],
]);

t(1, 'informatif', 'Un métier : la boulangère',
`Mélanie est boulangère à Saguenay. Elle se lève à trois heures du matin, bien avant le soleil! Pourquoi si tôt? Parce que les clients veulent du pain frais pour le déjeuner.

D’abord, Mélanie prépare la pâte. Elle mélange de la farine, de l’eau, du sel et de la levure. La levure est une poudre magique : elle fait gonfler la pâte. Ensuite, elle pétrit la pâte avec ses mains. Elle la laisse reposer pendant une heure.

Puis, elle coupe la pâte en morceaux et leur donne des formes : des baguettes, des miches rondes, des petits pains. Elle les place dans un grand four très chaud.

Pendant que le pain cuit, toute la boulangerie sent bon. À sept heures, la porte ouvre. Les clients arrivent un à un. Ils achètent du pain, des croissants et des brioches.

Mélanie aime son métier. Elle dit : « Je rends les gens heureux avec mon pain! »`,
[
 ['À quelle heure Mélanie se lève-t-elle?', 'À trois heures du matin', 'À sept heures', 'À midi', 'À minuit'],
 ['Pourquoi doit-elle se lever si tôt?', 'Les clients veulent du pain frais pour le déjeuner.', 'Elle n’aime pas dormir.', 'Le four est long à chauffer.', 'Elle doit aller au marché.'],
 ['À quoi sert la levure?', 'À faire gonfler la pâte', 'À donner de la couleur', 'À rendre le pain salé', 'À nettoyer le four'],
 ['Que fait Mélanie juste après avoir préparé la pâte?', 'Elle la pétrit et la laisse reposer.', 'Elle ouvre la porte aux clients.', 'Elle met le pain au four.', 'Elle vend des croissants.'],
 ['Quels pains Mélanie fabrique-t-elle?', 'Des baguettes, des miches et des petits pains', 'Seulement des baguettes', 'Des gâteaux et des tartes', 'Des pizzas'],
 ['Dans le texte, « pétrir » veut dire…', 'travailler la pâte avec les mains', 'faire cuire au four', 'couper en morceaux', 'mélanger avec une cuillère'],
 ['Comment sait-on que Mélanie aime son métier?', 'Elle dit qu’elle rend les gens heureux.', 'Elle se lève très tôt.', 'Elle a une grande boulangerie.', 'Elle vend beaucoup de pain.'],
]);

t(1, 'récit', 'Le chat de la voisine',
`Un matin, madame Pelletier frappe à la porte des Gagnon. Elle a les yeux rouges.

— Mon chat Minou a disparu depuis hier, dit-elle. Vous ne l’auriez pas vu?

Nathan, huit ans, veut aider. Il prend son manteau et sort dans la cour. Il regarde sous la galerie, derrière le cabanon, dans la haie. Rien.

— Minou! Minou! appelle-t-il.

Soudain, il entend un petit miaulement. Miaou… Le bruit vient d’en haut. Nathan lève la tête. Dans le grand érable, sur une branche, un chat gris tremble de peur.

— Je l’ai trouvé! crie Nathan.

Son père sort l’échelle. Il monte lentement et attrape le chat. Minou se blottit contre lui en ronronnant.

Madame Pelletier pleure de joie. Elle serre Nathan dans ses bras et lui donne une boîte de chocolats.

— Merci, mon grand! Tu es un vrai héros!

Nathan rougit. Il est fier, mais il partage les chocolats avec toute la famille.`,
[
 ['Qui a perdu son chat?', 'Madame Pelletier', 'Nathan', 'Les Gagnon', 'Le père de Nathan'],
 ['Où Nathan cherche-t-il d’abord le chat?', 'Sous la galerie, derrière le cabanon et dans la haie', 'Dans la maison de madame Pelletier', 'Au parc', 'Dans la cuisine'],
 ['Où se trouve Minou?', 'Dans un grand érable', 'Dans le cabanon', 'Sous la galerie', 'Dans la haie'],
 ['Comment Nathan trouve-t-il le chat?', 'Il entend un miaulement.', 'Il voit des traces dans la neige.', 'Madame Pelletier le lui dit.', 'Le chat saute dans ses bras.'],
 ['Qui va chercher le chat dans l’arbre?', 'Le père de Nathan', 'Nathan', 'Madame Pelletier', 'Un pompier'],
 ['Pourquoi madame Pelletier dit-elle que Nathan est un héros?', 'Il a aidé à retrouver son chat.', 'Il a grimpé dans l’arbre.', 'Il a acheté des chocolats.', 'Il a sauvé la maison.'],
 ['Comment sait-on que Nathan est généreux?', 'Il partage les chocolats avec sa famille.', 'Il cherche dans la cour.', 'Il prend son manteau.', 'Il appelle le chat.'],
]);

t(1, 'récit', 'Le premier jour d’Anouk',
`Aujourd’hui, Anouk entre dans une nouvelle école. Elle vient de déménager de Gaspé à Laval. Son ventre fait des nœuds. Elle ne connaît personne.

L’enseignante, madame Josée, la présente à la classe.

— Voici Anouk. Elle vient de la Gaspésie, près de la mer.

Anouk baisse les yeux. Elle s’assoit au dernier pupitre. À la récréation, elle reste seule près de la clôture.

Tout à coup, un garçon aux cheveux frisés s’approche avec un ballon.

— Salut! Moi, c’est Karim. Tu veux jouer avec nous?

— Je ne sais pas trop, répond Anouk.

— C’est facile : on lance le ballon et on essaie de ne pas le laisser tomber!

Anouk hésite, puis elle sourit. Elle rejoint le groupe. Elle attrape le ballon trois fois de suite. On l’applaudit!

À la fin de la journée, Anouk raconte à sa mère :
— Maman, j’ai déjà un nouvel ami. Et demain, j’apporterai des coquillages de la Gaspésie pour les montrer à la classe!`,
[
 ['D’où vient Anouk?', 'De Gaspé', 'De Laval', 'De Québec', 'De Montréal'],
 ['Pourquoi le ventre d’Anouk fait-il des nœuds?', 'Elle est nerveuse, car elle ne connaît personne.', 'Elle a faim.', 'Elle est malade.', 'Elle n’aime pas l’enseignante.'],
 ['Où Anouk reste-t-elle pendant la récréation, au début?', 'Seule, près de la clôture', 'Avec Karim', 'Dans la classe', 'Au gymnase'],
 ['Que propose Karim à Anouk?', 'De jouer au ballon avec eux', 'De lui prêter un crayon', 'De manger avec lui', 'De visiter l’école'],
 ['Que se passe-t-il juste après qu’Anouk hésite?', 'Elle sourit et rejoint le groupe.', 'Elle retourne à la classe.', 'Elle laisse tomber le ballon.', 'Elle appelle sa mère.'],
 ['Comment Anouk se sent-elle à la fin de la journée?', 'Contente et pleine d’énergie', 'Triste et seule', 'Fâchée contre Karim', 'Très fatiguée'],
 ['Que veut apporter Anouk demain?', 'Des coquillages de la Gaspésie', 'Un ballon', 'Un dessin de la mer', 'Une photo de sa maison'],
]);

/* ============================ NIVEAU 2 (3e année) ============================ */

t(2, 'récit', 'Le hockey de ruelle',
`Tous les samedis après-midi, les enfants de la rue des Peupliers se retrouvent dans la ruelle pour jouer au hockey. Ils placent deux gros bacs de recyclage pour faire les buts et tracent une ligne à la craie au milieu.

Ce jour-là, Rémi, le plus petit du groupe, arrive avec un air triste. Il traîne son bâton, trop long pour lui.

— Qu’est-ce qui ne va pas? demande Jade, la capitaine.
— Personne ne me passe jamais la rondelle, marmonne Rémi. Je suis trop lent.

Jade réfléchit un moment. Puis elle sourit.

— Aujourd’hui, tu seras notre gardien de but. Un bon gardien est rapide avec ses mains, pas avec ses pieds.

Rémi n’est pas certain, mais il se place devant le bac. Le jeu commence. Pan! Un tir de Maxime file vers le coin. Rémi plonge et arrête la rondelle du bout de son gant. Les autres sont bouche bée.

— Wow! s’exclame Maxime. Je ne pensais pas que tu pouvais l’attraper!

Le match se termine 5 à 4. Rémi a arrêté douze tirs. À la fin, tout le monde veut l’avoir dans son équipe.

En rentrant, Rémi laisse son bâton à la maison. Il garde seulement son gant, qu’il porte toute la soirée avec fierté.`,
[
 ['Où les enfants jouent-ils au hockey?', 'Dans la ruelle', 'Dans un aréna', 'Dans le parc', 'Sur un lac gelé'],
 ['Comment les enfants fabriquent-ils les buts?', 'Avec deux gros bacs de recyclage', 'Avec des bâtons de hockey', 'Avec des boîtes de carton', 'Avec des filets neufs'],
 ['Pourquoi Rémi est-il triste au début?', 'Personne ne lui passe jamais la rondelle.', 'Il a perdu son bâton.', 'Il n’a pas été invité.', 'Son gant est déchiré.'],
 ['Que propose Jade à Rémi?', 'Devenir gardien de but', 'Devenir capitaine', 'Arbitrer le match', 'Changer d’équipe'],
 ['Que se passe-t-il juste après le tir de Maxime?', 'Rémi arrête la rondelle.', 'Maxime marque un but.', 'Le jeu s’arrête.', 'Rémi tombe et pleure.'],
 ['Dans le texte, « bouche bée » veut dire…', 'très surpris', 'très fâché', 'très fatigué', 'très content de gagner'],
 ['Comment sait-on que Rémi est fier de lui à la fin?', 'Il porte son gant toute la soirée.', 'Il laisse son bâton à la maison.', 'Il rentre souper.', 'Il parle à Jade.'],
 ['Quelle leçon peut-on retenir de cette histoire?', 'Chacun a des talents différents qui peuvent aider l’équipe.', 'Il faut toujours gagner.', 'Le plus grand joueur est le meilleur.', 'Il ne faut pas jouer dans la ruelle.'],
]);

t(2, 'informatif', 'L’orignal, roi de la forêt',
`L’orignal est le plus grand cerf du monde. Un mâle adulte peut mesurer plus de deux mètres de haut et peser autant qu’une petite auto. On le trouve dans les forêts du Québec, surtout près des lacs et des marécages.

Ses longues pattes lui permettent de marcher dans la neige épaisse et dans l’eau. Il est d’ailleurs un excellent nageur : il traverse des lacs entiers pour se nourrir ou pour échapper à un danger. En été, il mange des plantes aquatiques, parfois en plongeant la tête sous l’eau. En hiver, il se nourrit de branches, de bourgeons et d’écorce.

Seul le mâle porte des bois. Ces grandes cornes en forme de pelle peuvent mesurer près de deux mètres d’un bout à l’autre. Chaque automne, après la période des amours, les bois tombent. Au printemps, de nouveaux bois commencent à pousser. Ils sont d’abord recouverts d’une peau douce, appelée velours.

La femelle s’appelle l’orignale. Elle met au monde un ou deux petits, appelés veaux, au début de l’été. Elle les protège avec beaucoup de courage, car les loups et les ours aiment bien les attaquer.

Si tu croises un orignal sur la route, ralentis! Sa grande taille et ses yeux qui brillent la nuit en font un voisin dangereux pour les automobilistes.`,
[
 ['Quel animal est l’orignal?', 'Le plus grand cerf du monde', 'Un très gros ours', 'Un cheval sauvage', 'Un animal marin'],
 ['Que mange l’orignal en hiver?', 'Des branches, des bourgeons et de l’écorce', 'Des plantes aquatiques', 'Du poisson', 'Des petits animaux'],
 ['Qui porte des bois?', 'Seulement le mâle', 'La femelle et le mâle', 'Seulement les veaux', 'Personne, ce sont des cornes qui ne tombent pas'],
 ['Que se passe-t-il avec les bois chaque automne?', 'Ils tombent.', 'Ils deviennent plus gros.', 'Ils se cassent en deux.', 'Ils sont recouverts de velours.'],
 ['Dans le texte, le mot « velours » désigne…', 'la peau douce qui couvre les bois qui poussent', 'un bruit de l’orignal', 'la couleur de son pelage', 'une plante qu’il mange'],
 ['Pourquoi l’orignal est-il un bon nageur et marcheur?', 'Il a de longues pattes.', 'Il a des bois pointus.', 'Il est très léger.', 'Il vit toujours dans l’eau.'],
 ['Pourquoi doit-on ralentir si l’on croise un orignal?', 'Il est très grand et peut causer un accident.', 'Il est timide et se sauve.', 'Il est protégé par la loi.', 'Il pourrait manger l’auto.'],
 ['Quelle phrase résume le mieux le texte?', 'Il décrit le corps, la nourriture et la vie de l’orignal.', 'Il explique comment chasser l’orignal.', 'Il raconte l’histoire d’un orignal perdu.', 'Il compare l’orignal et le loup.'],
]);

t(2, 'récit', 'Le trésor du grenier',
`Pendant les vacances d’été, Zacharie et sa cousine Élodie visitent la vieille maison de leur arrière-grand-père, à Rimouski. La maison sent le bois et la poussière. Le grenier, surtout, les attire : c’est un royaume de coffres, de chapeaux et de boîtes mystérieuses.

— Regarde! s’écrie Élodie en tirant sur un tiroir coincé. Il y a un vieux livre!

C’est un carnet à la couverture de cuir usée. À la première page, une écriture tremblante annonce : « Le trésor de Rose-des-Vents, caché par Antoine Dubé en 1953. »

— Un trésor! chuchote Zacharie, les yeux brillants. Mais où?

Ils lisent l’énigme : « Sous la plus vieille des pommettes, regarde où midi se couche. »

— Une pommette, c’est un petit pommier, dit Élodie. Il y en a un au fond du jardin!

Ils courent dehors. L’arbre, noueux et très âgé, jette une ombre étroite sur l’herbe. Zacharie mesure l’ombre avec ses pas. Il plante la pelle à l’endroit où la pointe de l’ombre touche le sol.

Clong! La pelle heurte quelque chose de dur : une boîte en fer rouillée. À l’intérieur, il n’y a ni or ni bijoux. Seulement une photo d’un petit garçon avec un chien, et une note : « Mon plus beau trésor : mon ami Rose. »

Zacharie et Élodie se regardent. Ce trésor-là, ils le montreront à leur arrière-grand-père. Ils sont sûrs que ses yeux vont briller.`,
[
 ['Où se trouvent les enfants pendant leurs vacances?', 'Dans la vieille maison de leur arrière-grand-père', 'Dans un camping', 'Chez leur grand-mère à Montréal', 'Dans une école'],
 ['Qu’est-ce qu’Élodie trouve dans le grenier?', 'Un vieux carnet en cuir', 'Une boîte en fer', 'Un chapeau', 'Une carte au trésor'],
 ['Que signifie le mot « pommette » dans l’énigme?', 'Un petit pommier', 'Une petite pomme rouge', 'Une partie du visage', 'Un genre de cachette'],
 ['Pourquoi Zacharie mesure-t-il l’ombre de l’arbre?', 'Pour trouver l’endroit où creuser', 'Pour savoir quelle heure il est', 'Pour calculer la hauteur de l’arbre', 'Pour couper une branche'],
 ['Que trouvent les enfants dans la boîte?', 'Une photo et une note', 'De l’or et des bijoux', 'Une clé rouillée', 'Une carte de la maison'],
 ['Que se passe-t-il juste après que la pelle heurte quelque chose de dur?', 'Les enfants découvrent une boîte rouillée.', 'Ils appellent leur arrière-grand-père.', 'La pelle se casse.', 'Ils retournent au grenier.'],
 ['Qui est probablement « Rose » dans la note?', 'Le chien d’Antoine', 'La cousine d’Élodie', 'La voisine d’Antoine', 'La maison de Rimouski'],
 ['Comment sait-on que le « vrai trésor » n’est pas de l’argent?', 'La boîte contient une photo et une note sur l’amitié.', 'La boîte est très vieille.', 'Les enfants ne creusent pas assez.', 'Le carnet est écrit en 1953.'],
]);

t(2, 'recette', 'La soupe aux légumes d’automne',
`Soupe aux légumes d’automne

Temps de préparation : 20 minutes
Temps de cuisson : 35 minutes
Portions : 6

Ingrédients :
• 2 carottes
• 1 pomme de terre
• 1 petit oignon
• 2 branches de céleri
• 1 courgette
• 4 tasses de bouillon de légumes
• 1 c. à soupe d’huile d’olive
• sel, poivre et un peu de persil frais

Préparation :
1. Lave tous les légumes. Avec l’aide d’un adulte, épluche les carottes et la pomme de terre, puis coupe tous les légumes en petits dés.
2. Dans une grande casserole, fais chauffer l’huile à feu moyen. Ajoute l’oignon et fais-le cuire 3 minutes, jusqu’à ce qu’il soit transparent.
3. Ajoute les autres légumes, mélange bien et fais cuire encore 5 minutes en remuant.
4. Verse le bouillon. Quand la soupe bout, baisse le feu, couvre à moitié et laisse mijoter 25 minutes.
5. Goûte la soupe. Ajoute du sel et du poivre au besoin.
6. Sers-la chaude, avec un peu de persil haché sur le dessus.

Astuce : cette soupe se conserve trois jours au frigo. Elle est encore meilleure le lendemain!`,
[
 ['Combien de portions cette recette donne-t-elle?', '6', '4', '3', '8'],
 ['Combien de temps dure la cuisson?', '35 minutes', '20 minutes', '25 minutes', '5 minutes'],
 ['Quel légume cuit-on en premier?', 'L’oignon', 'La courgette', 'La pomme de terre', 'Le céleri'],
 ['Que fait-on juste après avoir ajouté le bouillon?', 'On attend que la soupe bout, puis on baisse le feu.', 'On ajoute le sel et le poivre.', 'On sert la soupe.', 'On épluche les carottes.'],
 ['Dans cette recette, « mijoter » veut dire…', 'cuire doucement à petit feu', 'faire bouillir très fort', 'refroidir la soupe', 'mélanger sans arrêt'],
 ['Pourquoi doit-on demander l’aide d’un adulte à l’étape 1?', 'Il faut utiliser un couteau.', 'Les légumes sont lourds.', 'Le bouillon est chaud.', 'La casserole est grande.'],
 ['Quand ajoute-t-on le persil?', 'À la fin, sur la soupe servie', 'Avec l’oignon', 'Avec le bouillon', 'Avant la cuisson'],
 ['Que dit l’astuce de la fin?', 'La soupe se garde trois jours au frigo.', 'La soupe se congèle un an.', 'La soupe doit être mangée tout de suite.', 'La soupe est meilleure froide.'],
]);

t(2, 'récit', 'Le verglas',
`Le matin du 5 janvier, Camille est réveillée par un bruit étrange : crac! suivi d’un grondement sourd. Elle court à la fenêtre. Tout est glacé. Chaque branche, chaque fil, chaque toit est couvert d’une épaisse couche de glace. Dehors, le monde ressemble à un palais de cristal.

— Maman, il y a eu du verglas pendant la nuit! s’écrie-t-elle.

Mais bientôt, la joie de Camille fait place à l’inquiétude : les lumières ne s’allument pas, et la maison devient de plus en plus froide. La panne dure toute la journée, puis encore une nuit.

Papa allume le poêle à bois dans le salon. Toute la famille s’installe devant : on dort sur des matelas, on cuisine sur un petit réchaud de camping. Camille se sent comme une exploratrice.

Le lendemain, les voisins arrivent un à un. Madame Roy, qui vit seule, n’a plus de chauffage. Papa lui offre de venir se réchauffer chez eux. Monsieur Ali apporte des chandelles. Les enfants partagent leurs jeux de société. On rit, on mange de la soupe chaude, on raconte des histoires.

Au bout de cinq jours, la lumière revient enfin. Camille est contente de retrouver sa chambre, mais elle garde un étrange souvenir de ces journées.

— C’était difficile, dit-elle à sa mère, mais ça m’a fait voir à quel point les gens s’entraident.`,
[
 ['Qu’est-ce qui réveille Camille?', 'Un craquement venant de dehors', 'Le téléphone', 'Le cri de sa mère', 'L’alarme de l’horloge'],
 ['Qu’est-ce qui a causé le paysage glacé?', 'Le verglas de la nuit', 'Une grosse chute de neige', 'Un froid sans pluie', 'Un tuyau brisé'],
 ['Comment la famille se réchauffe-t-elle?', 'Avec un poêle à bois', 'Avec un foyer électrique', 'Avec des couvertures chauffantes', 'En allant à l’hôtel'],
 ['Pourquoi la joie de Camille fait-elle place à l’inquiétude?', 'Il n’y a plus d’électricité et la maison se refroidit.', 'Elle ne peut plus aller à l’école.', 'Elle a perdu son chat.', 'Sa mère est malade.'],
 ['Que fait le père de Camille pour madame Roy?', 'Il l’invite à se réchauffer chez eux.', 'Il lui prête son poêle.', 'Il lui apporte des chandelles.', 'Il lui téléphone.'],
 ['Dans le texte, « s’entraident » veut dire…', 'se donnent un coup de main', 'se parlent', 'se disputent', 'se partagent des jeux'],
 ['Combien de temps la panne a-t-elle duré?', 'Cinq jours', 'Une nuit', 'Une journée', 'Deux semaines'],
 ['Quelle leçon Camille retient-elle de cette épreuve?', 'Dans les moments difficiles, les gens s’entraident.', 'Il faut avoir un poêle à bois.', 'Il vaut mieux déménager.', 'Le verglas est dangereux.'],
]);

t(2, 'informatif', 'Les os et le squelette',
`Si tu touches ton bras, tu sens quelque chose de dur sous ta peau : ce sont tes os. Ensemble, ils forment ton squelette. Un adulte en possède 206, mais un bébé en a plus de 300! Avec le temps, plusieurs petits os du bébé se soudent pour n’en former qu’un seul.

Le squelette remplit trois rôles importants. D’abord, il soutient ton corps. Sans lui, tu serais mou comme une chenille. Ensuite, il protège tes organes : le crâne protège le cerveau, et les côtes forment une cage autour du cœur et des poumons. Enfin, il permet de bouger. Les muscles sont attachés aux os, et quand ils se contractent, ils tirent sur les os comme des ficelles sur une marionnette.

Un os, ce n’est pas du caillou mort! À l’intérieur de certains os, il y a la moelle, une matière molle qui fabrique le sang. L’os est vivant : il grandit pendant l’enfance et se répare tout seul quand il se casse. Un bras cassé guérit en six à huit semaines, car l’os fabrique de nouvelles cellules pour combler la fracture.

Pour avoir des os solides, il faut du calcium, que l’on trouve dans le lait, le fromage et le yogourt. Il faut aussi bouger : courir, sauter et jouer dehors rendent les os plus forts.`,
[
 ['Combien d’os un adulte a-t-il?', '206', '300', '106', '60'],
 ['Pourquoi un bébé a-t-il plus d’os qu’un adulte?', 'Plusieurs de ses petits os se soudent en grandissant.', 'Les os des bébés sont plus petits.', 'Il en perd en vieillissant.', 'Les adultes ont des os plus gros.'],
 ['Quel est le rôle du crâne?', 'Il protège le cerveau.', 'Il fabrique le sang.', 'Il soutient les bras.', 'Il aide à respirer.'],
 ['À quoi les muscles sont-ils comparés?', 'À des ficelles de marionnette', 'À des élastiques', 'À des ressorts', 'À des câbles'],
 ['Que fait la moelle à l’intérieur de certains os?', 'Elle fabrique le sang.', 'Elle rend l’os dur.', 'Elle répare les muscles.', 'Elle garde le calcium.'],
 ['Comment sait-on que l’os est vivant?', 'Il grandit et se répare tout seul.', 'Il est dur comme un caillou.', 'Il est blanc.', 'Il se trouve sous la peau.'],
 ['Dans le texte, « se contractent » veut dire…', 'se resserrent', 'se cassent', 'se reposent', 'grandissent'],
 ['Que faut-il faire pour avoir des os solides?', 'Manger du calcium et bouger', 'Dormir plus longtemps', 'Boire beaucoup de jus', 'Éviter de sauter'],
]);

t(2, 'lettre', 'Une lettre au maire',
`Sherbrooke, le 3 mai

Monsieur le maire,

Je m’appelle Charlotte Bouchard et j’ai huit ans. Je suis en troisième année à l’école Sainte-Marguerite. Je vous écris au nom de ma classe, parce que nous avons un problème.

Chaque jour, pour aller à l’école, nous traversons la rue des Lilas. Les autos y roulent très vite, même s’il y a une zone scolaire. L’an dernier, un camion a presque frappé Lucas, un élève de ma classe. Maintenant, nous avons tous peur de traverser.

Nous aimerions que la ville installe des dos d’âne et une brigadière à cet endroit. Nous avons aussi pensé à des panneaux de papier fabriqués par nos soins : « Ralentis, des enfants jouent! » Nous pourrions les placer sur les clôtures.

Nous avons recueilli 87 signatures de voisins qui sont d’accord avec nous. Je les joins à cette lettre.

Pourriez-vous venir visiter notre école pour voir le problème? Nous vous préparerons une petite visite, avec un goûter fait par les élèves.

Merci d’avance de lire ma lettre. J’espère de tout cœur que vous allez nous aider.

Avec mes salutations respectueuses,
Charlotte Bouchard
et les élèves de 3e A`,
[
 ['Pourquoi Charlotte écrit-elle au maire?', 'Pour lui demander de rendre la rue plus sécuritaire', 'Pour l’inviter à un spectacle', 'Pour se plaindre du bruit', 'Pour demander un parc'],
 ['Quel est le problème de la rue des Lilas?', 'Les autos roulent trop vite.', 'Il y a trop de neige.', 'La rue est trop étroite.', 'Il n’y a pas de trottoir.'],
 ['Que s’est-il passé l’an dernier?', 'Un camion a presque frappé Lucas.', 'Une auto a frappé une brigadière.', 'Un enfant s’est perdu.', 'Un élève a été blessé à vélo.'],
 ['Que demande la classe à la ville?', 'Des dos d’âne et une brigadière', 'Un nouveau trottoir', 'Des feux de circulation', 'Un autobus scolaire'],
 ['Qu’ont fait les élèves pour appuyer leur demande?', 'Ils ont recueilli 87 signatures.', 'Ils ont fait une manifestation.', 'Ils ont écrit au journal.', 'Ils ont filmé la rue.'],
 ['Dans le texte, « au nom de ma classe » veut dire…', 'de la part de toute la classe', 'avec le nom de la classe', 'à la place de l’enseignante', 'pour gagner un prix'],
 ['Pourquoi Charlotte invite-t-elle le maire à l’école?', 'Pour qu’il voie le problème de ses propres yeux', 'Pour lui offrir un cadeau', 'Pour lui présenter les profs', 'Pour fêter la fin de l’année'],
 ['Comment sait-on que la lettre est polie?', 'Elle commence par « Monsieur le maire » et finit par des salutations respectueuses.', 'Elle est écrite à la main.', 'Elle contient des signatures.', 'Elle est très courte.'],
]);

t(2, 'récit', 'Le monstre du sous-sol',
`Depuis trois nuits, Félix entend un bruit étrange venant du sous-sol : « Grrr… frottement… bang! » Il en est sûr, c’est un monstre.

— Mais non, Félix, dit sa grande sœur Mélodie en roulant les yeux. Les monstres n’existent pas.

— Alors pourquoi la porte du sous-sol est-elle ouverte tous les matins?

Mélodie hausse les épaules. Pourtant, ce soir, elle est un peu moins sûre d’elle. À minuit, on entend encore : « Grrr… bang! »

Les deux enfants se faufilent dans l’escalier, une lampe de poche à la main. Félix tient son hockey comme une épée. Un pas, puis un autre. Leur cœur bat à toute vitesse.

Soudain, quelque chose bouge dans l’ombre. Deux yeux brillent!

— Aaaah! hurlent-ils.

Un petit visage poilu sort de derrière la sécheuse. C’est Pistache, le chat de la voisine, qui est entré par la fenêtre cassée. Dans sa gueule, il tient un vieux gant de baseball.

— Un monstre, hein? ricane Mélodie, soulagée.

— Il fait du bruit en traînant le gant, comprend Félix. Mais il est quand même effrayant : il a presque attrapé ma pantoufle!

Le lendemain, papa répare la fenêtre. Le soir, Félix dort comme un loir. Sauf que depuis ce jour, quand il entend un bruit dans la maison, il demande toujours : « Pistache, c’est toi? »`,
[
 ['Qui fait peur à Félix?', 'Un bruit étrange au sous-sol', 'Un chien dans la rue', 'Un film d’horreur', 'Sa sœur Mélodie'],
 ['Pourquoi Félix pense-t-il que c’est un monstre?', 'La porte du sous-sol est ouverte tous les matins.', 'Il a vu un monstre dans un livre.', 'Il a aperçu une ombre derrière la vitre.', 'Mélodie lui a raconté une histoire.'],
 ['Que prend Félix pour descendre l’escalier?', 'Un bâton de hockey', 'Une épée en bois', 'Un gant de baseball', 'Une lampe de poche seulement'],
 ['Que se passe-t-il juste avant que les enfants crient?', 'Deux yeux brillent dans l’ombre.', 'La porte se ferme.', 'Papa éteint la lumière.', 'Un objet tombe.'],
 ['Qui était le « monstre »?', 'Pistache, le chat de la voisine', 'Le chat de Félix', 'Un raton laveur', 'Un chien perdu'],
 ['Comment le chat est-il entré dans la maison?', 'Par une fenêtre cassée', 'Par la porte du sous-sol', 'Par la cheminée', 'Par la chatière'],
 ['Dans le texte, « soulagée » veut dire…', 'contente que la peur soit passée', 'très fâchée', 'un peu triste', 'toujours inquiète'],
 ['Pourquoi cette histoire est-elle drôle?', 'Le « monstre » est un petit chat qui traîne un gant.', 'Mélodie raconte une blague.', 'Félix attrape une souris.', 'Papa a peur des chats.'],
]);

t(2, 'mode d’emploi', 'Fabriquer une mangeoire à oiseaux',
`Fabriquer une mangeoire à oiseaux avec une bouteille

En hiver, les oiseaux ont du mal à trouver de la nourriture. Avec ce bricolage, tu les aideras tout en les observant de ta fenêtre.

Matériel :
• 1 bouteille de plastique propre (1 litre)
• 2 cuillères de bois
• des ciseaux ou un couteau d’artisanat (avec l’aide d’un adulte)
• de la ficelle
• des graines pour oiseaux (tournesol, millet)

Étapes :
1. Demande à un adulte de percer, à environ 5 cm du fond de la bouteille, deux trous face à face, assez larges pour glisser le manche d’une cuillère.
2. Fais passer une première cuillère dans les trous, la partie creuse vers l’extérieur. Place la seconde cuillère de la même façon, 3 cm plus haut, à un angle différent.
3. Fais, avec un adulte, deux petits trous sous les cuillères, pour que l’eau de pluie puisse s’écouler.
4. Remplis la bouteille de graines.
5. Attache une ficelle solide autour du goulot et suspends la mangeoire à une branche, loin des chats.

Conseils : place la mangeoire près d’un arbre pour que les oiseaux puissent se cacher en cas de danger. Garde-la toujours remplie en hiver.`,
[
 ['À quoi sert cette mangeoire?', 'À nourrir les oiseaux en hiver', 'À attraper les écureuils', 'À décorer la maison', 'À faire de la musique'],
 ['Pourquoi les cuillères sont-elles placées dans les trous?', 'Pour que les oiseaux puissent y manger', 'Pour boucher les trous', 'Pour décorer la bouteille', 'Pour attacher la ficelle'],
 ['Qui doit percer les trous de la bouteille?', 'Un adulte', 'L’enfant seul', 'Le voisin', 'Un oiseau'],
 ['Que doit-on faire juste après avoir installé les cuillères?', 'Percer de petits trous pour l’écoulement de l’eau', 'Accrocher la mangeoire', 'Verser les graines', 'Peindre la bouteille'],
 ['Où doit-on suspendre la mangeoire?', 'À une branche, loin des chats', 'Au sol près de la maison', 'Sur la galerie', 'Dans la cuisine'],
 ['Pourquoi faut-il placer la mangeoire près d’un arbre?', 'Les oiseaux peuvent s’y cacher en cas de danger.', 'Le vent la fera tomber.', 'Les graines seront plus fraîches.', 'La neige fondra plus vite.'],
 ['Dans le texte, « goulot » désigne…', 'le haut étroit de la bouteille', 'le fond de la bouteille', 'le bouchon', 'un petit trou'],
 ['Pourquoi dit-on de la garder remplie en hiver?', 'Les oiseaux comptent sur elle pour se nourrir.', 'Elle sera plus lourde.', 'Elle pourrait geler.', 'Elle est moins jolie vide.'],
]);

t(2, 'affiche', 'Règlements de la piscine',
`PISCINE MUNICIPALE DE LA RIVIÈRE
Règlements et horaire — saison estivale

Heures d’ouverture :
• Lundi au vendredi : 10 h à 20 h
• Samedi et dimanche : 9 h à 18 h
• Fermée en cas d’orage

Pour la sécurité de tous :
1. Prends une douche savonnée avant d’entrer dans l’eau.
2. Ne cours jamais sur le bord de la piscine : le sol est glissant.
3. Les enfants de moins de 8 ans doivent être accompagnés d’un adulte dans l’eau.
4. Il est défendu de plonger dans la partie peu profonde (moins de 1,2 mètre).
5. Écoute toujours les consignes du sauveteur : il est là pour ta sécurité.
6. La gomme à mâcher et la nourriture sont interdites autour du bassin.

Pour ton plaisir :
• Les bouées et les ballons mous sont permis, les planches de surf ne le sont pas.
• Les cours de natation commencent le 3 juillet. Inscription à l’accueil, au coût de 45 $ pour 8 leçons.

Passe un bel été avec nous! Pour toute question, parle à un membre du personnel.`,
[
 ['À quelle heure la piscine ouvre-t-elle le samedi?', '9 h', '10 h', '8 h', '20 h'],
 ['Que se passe-t-il en cas d’orage?', 'La piscine ferme.', 'La piscine reste ouverte.', 'On peut nager seulement dans l’eau peu profonde.', 'On doit rentrer seul.'],
 ['Pourquoi ne faut-il pas courir sur le bord?', 'Le sol est glissant.', 'Le sauveteur ne le veut pas.', 'On pourrait déranger les nageurs.', 'Il y a trop de monde.'],
 ['Qui doit être accompagné d’un adulte dans l’eau?', 'Les enfants de moins de 8 ans', 'Tous les enfants de moins de 12 ans', 'Les enfants qui ne savent pas nager', 'Les adultes seulement'],
 ['Dans quel cas est-il interdit de plonger?', 'Dans la partie peu profonde', 'Du côté du sauveteur', 'Dans la partie profonde', 'Près des bouées'],
 ['Combien coûtent huit leçons de natation?', '45 $', '8 $', '3 $', '10 $'],
 ['Dans le texte, « consignes » veut dire…', 'les instructions à suivre', 'les jeux permis', 'les heures d’ouverture', 'les prix'],
 ['Pourquoi cet écrit est-il une affiche et non une histoire?', 'Il donne des informations et des règles aux gens.', 'Il raconte une aventure.', 'Il décrit un animal.', 'Il présente une recette.'],
]);

t(2, 'informatif', 'Le printemps au Québec',
`Après un long hiver, le printemps arrive enfin au Québec. Vers la fin de mars, le soleil monte plus haut dans le ciel et les journées s’allongent. La neige fond lentement et l’eau court dans les fossés. C’est la saison de la boue! Les bottes de caoutchouc sont de sortie.

Dans les forêts, les érables laissent couler leur sève. Les acériculteurs la recueillent pour en faire du sirop d’érable. Cette récolte ne dure que quelques semaines : elle a besoin de nuits froides et de jours doux, sinon la sève ne coule pas.

Les animaux se réveillent. L’ours sort de sa tanière, un peu maigre et très affamé. Les marmottes quittent aussi leur terrier. Les oiseaux migrateurs reviennent du sud : les outardes, les carouges à épaulettes et, un peu plus tard, les rouges-gorges. Leur chant annonce la belle saison.

Les plantes, elles aussi, se mettent au travail. Les premiers bourgeons éclatent. Dans les jardins, les perce-neige et les crocus sont parmi les premières fleurs à apparaître. Plus tard, en mai, les arbres se couvrent de feuilles vertes.

Les gens aussi retrouvent l’énergie : on ressort les vélos, on fait le grand ménage du printemps et on prépare le potager. Au Québec, on dit qu’on ne plante pas les tomates avant la fin de mai, à cause du risque de gel tardif.`,
[
 ['Comment le printemps commence-t-il, selon le texte?', 'Le soleil monte plus haut et les journées s’allongent.', 'Les feuilles tombent des arbres.', 'Il se met à geler la nuit.', 'Les rivières gèlent.'],
 ['Pourquoi appelle-t-on le printemps « la saison de la boue »?', 'La neige fond et le sol devient détrempé.', 'Il pleut tout le temps.', 'Les gens font de la peinture.', 'Les rivières débordent chaque jour.'],
 ['De quoi les érables ont-ils besoin pour que la sève coule?', 'De nuits froides et de jours doux', 'De beaucoup de pluie', 'De chaleur toute la journée', 'De neige épaisse'],
 ['Pourquoi l’ours est-il « maigre et affamé » à sa sortie?', 'Il n’a pas mangé de tout l’hiver.', 'Il est malade.', 'Il est trop vieux.', 'Il a perdu sa tanière.'],
 ['Quels oiseaux reviennent du sud?', 'Les outardes et les carouges à épaulettes', 'Les ours et les marmottes', 'Les perce-neige et les crocus', 'Les écureuils et les rouges-gorges'],
 ['Pourquoi attend-on la fin de mai pour planter les tomates?', 'Pour éviter le gel tardif', 'Parce que le sol est trop sec', 'Parce que la sève coule encore', 'Parce que les oiseaux les mangeraient'],
 ['Dans le texte, « acériculteurs » désigne…', 'les gens qui produisent le sirop d’érable', 'les gens qui plantent des arbres', 'les gens qui étudient les oiseaux', 'les gens qui cultivent des fleurs'],
 ['Quelle est l’idée principale du texte?', 'Le printemps réveille la nature et les gens.', 'Le printemps est la saison la plus froide.', 'Le sirop d’érable est délicieux.', 'Les oiseaux migrent tous les ans.'],
]);

t(2, 'récit', 'Le concours de dessin',
`À l’école, madame Hélène annonce un concours de dessin. Le thème est « Mon héros ». Le gagnant verra son œuvre affichée à la bibliothèque municipale.

— Moi, je vais dessiner un hockeyeur, dit Antoine.
— Et moi, une princesse guerrière, ajoute Fatou.

Gabrielle, elle, ne dit rien. Elle adore dessiner, mais elle n’aime pas qu’on regarde ses dessins. Quand elle montre son travail, elle se sent toujours petite.

À la maison, elle essaie plusieurs idées. Elle dessine un pompier, puis un astronaute. Chaque fois, elle froisse la feuille.

— Qu’est-ce qui ne va pas? demande sa grand-mère, qui tricote dans la cuisine.

— Je ne trouve pas de héros, soupire Gabrielle.

Sa grand-mère sourit.
— Un héros, ce n’est pas toujours quelqu’un qui sauve le monde. Tu en connais sûrement un petit, tout près de toi.

Gabrielle regarde ses mains qui tiennent le crayon. Puis, elle dessine sa grand-mère, avec ses lunettes, son tricot, et son grand sourire.

Le jour du concours, la classe regarde tous les dessins. Gabrielle n’obtient pas le premier prix. Fatou le gagne avec sa princesse. Mais madame Hélène s’arrête devant le dessin de Gabrielle.

— Voici un héros du quotidien, dit-elle. Il me touche beaucoup.

Gabrielle rougit. Pour une fois, elle n’a pas envie de se cacher.`,
[
 ['Quel est le thème du concours?', 'Mon héros', 'Mon animal préféré', 'Ma famille', 'Mon sport'],
 ['Que gagnera le gagnant du concours?', 'Son dessin sera affiché à la bibliothèque.', 'Un voyage', 'Un livre de dessins', 'Un trophée'],
 ['Pourquoi Gabrielle froisse-t-elle ses feuilles?', 'Elle n’est pas satisfaite de ses idées.', 'Elle est fâchée contre Fatou.', 'Elle manque de papier.', 'Elle a peur de sa grand-mère.'],
 ['Que dit la grand-mère au sujet des héros?', 'Un héros n’est pas toujours quelqu’un qui sauve le monde.', 'Un héros doit être courageux.', 'Il faut copier un héros connu.', 'Un héros est toujours un adulte.'],
 ['Qui Gabrielle dessine-t-elle?', 'Sa grand-mère', 'Un pompier', 'Fatou', 'Madame Hélène'],
 ['Qui gagne le premier prix?', 'Fatou', 'Antoine', 'Gabrielle', 'On ne le dit pas'],
 ['Dans le texte, « un héros du quotidien » veut dire…', 'quelqu’un de bien dans la vie de tous les jours', 'un héros de bande dessinée', 'un héros qui vit seul', 'un héros très fort'],
 ['Pourquoi Gabrielle n’a-t-elle « pas envie de se cacher » à la fin?', 'L’enseignante a aimé son dessin.', 'Elle a gagné le concours.', 'Tout le monde l’applaudit.', 'Elle a reçu un cadeau.'],
]);

t(2, 'poème', 'Le fleuve et le voyageur',
`Le fleuve et le voyageur

Le grand fleuve s’éveille avant le matin,
Brume légère sur son dos argenté.
Il porte les bateaux, les oiseaux, les grains
De sable endormis dans ses profondeurs.

Un voyageur assis au bord de l’eau
Écoute son long chant de mille ruisseaux.
« D’où viens-tu, vieux fleuve, d’où viens-tu? »
« Des montagnes lointaines où la neige fond.

Je vais vers la mer, où tout se mélange,
Où l’eau douce rencontre le sel des vagues.
Je ne m’arrête jamais, mon ami,
Car arrêter, c’est cesser de vivre. »

Le voyageur sourit, ramasse son sac,
Et suit la rive en marchant à petits pas.
Un jour lui aussi sera comme le fleuve :
Toujours en route, jamais fatigué du chemin.`,
[
 ['Quand le fleuve s’éveille-t-il, selon le poème?', 'Avant le matin', 'À midi', 'Le soir', 'Pendant la nuit noire'],
 ['Que porte le fleuve?', 'Les bateaux, les oiseaux et le sable', 'Des poissons géants', 'Des voyageurs fatigués', 'Des pierres précieuses'],
 ['Que demande le voyageur au fleuve?', 'D’où il vient', 'Où il va dormir', 'Comment il s’appelle', 'Pourquoi il est si long'],
 ['D’où vient le fleuve, selon sa réponse?', 'Des montagnes lointaines où la neige fond', 'D’un grand lac gelé', 'D’une ville au bord de la mer', 'D’un nuage'],
 ['Que veut dire « arrêter, c’est cesser de vivre »?', 'Le fleuve doit toujours avancer pour exister.', 'Le fleuve est fatigué.', 'Le fleuve est dangereux.', 'Le fleuve veut mourir.'],
 ['Dans le poème, « un long chant de mille ruisseaux » parle…', 'du bruit de l’eau qui coule', 'd’une chanson de voyageur', 'du chant des oiseaux', 'd’un orchestre'],
 ['Comment le voyageur se sent-il après avoir parlé au fleuve?', 'Inspiré et content', 'Triste et seul', 'Fâché', 'Épuisé'],
 ['À quoi le voyageur compare-t-il son avenir?', 'Au fleuve toujours en route', 'À un oiseau migrateur', 'À une montagne', 'À un bateau amarré'],
]);

t(2, 'récit', 'Le canot sur le lac',
`C’est la première fois que Léo part en canot avec son oncle Marc, sur le lac Saint-Jean. Le soleil se lève et une brume blanche flotte sur l’eau. Léo, qui a neuf ans, porte son gilet de sauvetage orange.

— Tu pagaies à l’avant, moi à l’arrière, explique oncle Marc. Il faut ramer ensemble, du même côté, au même rythme.

Au début, le canot tourne en rond. Léo rame trop fort et leur fait faire un grand cercle. Oncle Marc éclate de rire.

— Respire, mon grand. Regarde l’horizon et plonge ta pagaie doucement, sans éclabousser.

Léo se calme. Peu à peu, le canot file droit. Il entend le clapotis de l’eau et le chant d’un huard au loin.

— Silence, murmure oncle Marc. Regarde à gauche.

Sur la rive, un orignal boit dans les roseaux. Il lève la tête, les regarde un instant, puis disparaît dans la forêt. Léo retient son souffle.

Au retour, ses bras sont fatigués, mais son cœur est léger. Il dit à son oncle :

— C’est la plus belle journée de ma vie. Quand est-ce qu’on y retourne?

— Le mois prochain, promet l’oncle. Cette fois, on dormira sous la tente!`,
[
 ['Avec qui Léo part-il en canot?', 'Avec son oncle Marc', 'Avec son père', 'Avec un ami', 'Avec son grand-père'],
 ['Qu’est-ce qui flotte sur l’eau au lever du soleil?', 'Une brume blanche', 'Des feuilles mortes', 'Des canards', 'Des bouées'],
 ['Pourquoi le canot tourne-t-il en rond au début?', 'Léo rame trop fort.', 'Le vent est trop fort.', 'L’oncle ne rame pas.', 'Le canot est percé.'],
 ['Quel conseil l’oncle Marc donne-t-il à Léo?', 'Respirer et plonger la pagaie doucement', 'Ramer plus vite', 'Fermer les yeux', 'Changer de côté sans arrêt'],
 ['Qu’aperçoit Léo sur la rive?', 'Un orignal', 'Un ours', 'Un castor', 'Un huard'],
 ['Que se passe-t-il juste après que l’orignal les regarde?', 'Il disparaît dans la forêt.', 'Il entre dans l’eau.', 'Il s’approche du canot.', 'Il se met à courir vers eux.'],
 ['Dans le texte, « son cœur est léger » veut dire…', 'il est heureux', 'il est fatigué', 'il est inquiet', 'il a faim'],
 ['Que promet l’oncle à la fin?', 'D’y retourner le mois prochain pour dormir sous la tente', 'De lui acheter un canot', 'De l’emmener à la pêche demain', 'De lui apprendre à nager'],
]);

t(2, 'informatif', 'Les abeilles, ouvrières de la nature',
`Dans une ruche, vivent près de 50 000 abeilles. Elles forment une grande famille organisée, où chacune a un travail précis. Au centre de la ruche règne la reine. C’est la seule abeille qui pond des œufs : jusqu’à 2 000 par jour! Les ouvrières, elles, sont toutes des femelles. Quant aux faux-bourdons, ce sont les mâles. Ils ne travaillent pas, mais s’occupent de la reproduction.

Chez les ouvrières, le travail change avec l’âge. Les plus jeunes nettoient la ruche et nourrissent les larves. Puis elles fabriquent la cire pour bâtir de nouvelles alvéoles, ces petites cases en forme d’hexagone. Les plus âgées deviennent butineuses : elles volent de fleur en fleur pour récolter le nectar et le pollen.

Comment les butineuses informent-elles les autres où se trouvent les fleurs? Elles dansent! Si la fleur est tout près, elles tournent en rond. Si elle est loin, elles font une danse en forme de huit, et l’angle de leur danse indique la direction du soleil.

Avec le nectar, les abeilles produisent du miel. Il leur sert de réserve pour l’hiver. Elles ont besoin d’environ deux millions de fleurs pour faire un seul pot de miel!

Mais le plus grand rôle des abeilles est la pollinisation. En se posant sur les fleurs, elles transportent le pollen d’une fleur à l’autre, ce qui permet aux plantes de faire des fruits et des graines. Sans abeilles, nous n’aurions presque plus de pommes, de bleuets ni de citrouilles.`,
[
 ['Combien d’abeilles peut-il y avoir dans une ruche?', 'Près de 50 000', 'Environ 500', 'Environ 2 000', 'Plus d’un million'],
 ['Quel est le rôle de la reine?', 'Pondre des œufs', 'Butiner les fleurs', 'Fabriquer la cire', 'Défendre la ruche'],
 ['Que font les jeunes ouvrières?', 'Elles nettoient la ruche et nourrissent les larves.', 'Elles butinent les fleurs.', 'Elles pondent des œufs.', 'Elles gardent l’entrée.'],
 ['Comment les butineuses indiquent-elles où sont les fleurs?', 'Par une danse', 'Par un bourdonnement', 'En laissant une odeur', 'En traçant un chemin'],
 ['Pourquoi les abeilles fabriquent-elles du miel?', 'Pour avoir des réserves pour l’hiver', 'Pour nourrir les fleurs', 'Pour attirer des oiseaux', 'Pour construire la ruche'],
 ['Dans le texte, « butineuses » désigne…', 'les abeilles qui récoltent le nectar et le pollen', 'les abeilles qui gardent la reine', 'les abeilles qui fabriquent la cire', 'les abeilles qui nettoient'],
 ['Pourquoi les abeilles sont-elles si importantes pour nous?', 'Elles permettent aux plantes de faire des fruits et des graines.', 'Elles fabriquent des meubles.', 'Elles éloignent les insectes.', 'Elles nettoient les jardins.'],
 ['Que veut-on montrer avec « deux millions de fleurs pour un pot de miel »?', 'Le miel demande énormément de travail aux abeilles.', 'Les fleurs sont très petites.', 'Le miel coûte cher.', 'Il y a beaucoup de miel dans le monde.'],
]);

t(2, 'récit', 'Le déménagement de Sam',
`Samedi, Sam, 8 ans, quitte son quartier de Longueuil. Le camion de déménagement est devant la maison, les boîtes empilées jusqu’au plafond. Sam serre son ourson contre lui. Il n’a pas envie de partir.

— Pourquoi on ne peut pas rester? demande-t-il.

— Parce que maman a obtenu un nouvel emploi à Rouyn-Noranda, explique papa. Ce sera une belle aventure.

Sam n’est pas convaincu. À Longueuil, il a son meilleur ami Hugo, sa chambre bleue, la ruelle où il joue au ballon. À Rouyn-Noranda, il ne connaît personne.

Pendant le long voyage en auto, il regarde par la vitre. Les villes laissent peu à peu la place aux forêts et aux lacs. Il compte les orignaux sur les panneaux. Il en trouve douze.

Quand ils arrivent, Sam descend lentement. La nouvelle maison est jaune, avec un grand érable dans la cour. Dans sa chambre, il y a une fenêtre qui donne sur un lac. Il ouvre la fenêtre : un huard crie dans le lointain.

Papa dépose une enveloppe sur son lit. C’est une lettre d’Hugo, glissée dans une boîte avant le départ : « Appelle-moi ce soir! Je veux voir ta nouvelle chambre. »

Sam sourit pour la première fois depuis longtemps. Il grimpe sur son lit, regarde le lac et murmure :
— Peut-être que ça ira, finalement.`,
[
 ['Pourquoi la famille de Sam déménage-t-elle?', 'Maman a un nouvel emploi.', 'Papa a perdu son travail.', 'La maison est trop petite.', 'Sam a changé d’école.'],
 ['Comment Sam se sent-il au début?', 'Triste et réticent', 'Très content', 'Fâché contre Hugo', 'Curieux et pressé'],
 ['Qu’est-ce que Sam compte pendant le voyage?', 'Les orignaux sur les panneaux', 'Les lacs', 'Les autos rouges', 'Les maisons jaunes'],
 ['Comment est la nouvelle maison?', 'Jaune, avec un grand érable dans la cour', 'Bleue, avec un jardin', 'Rouge, près d’une rivière', 'Blanche, sur une colline'],
 ['Que voit Sam par la fenêtre de sa chambre?', 'Un lac', 'Une ruelle', 'Un parc', 'Une forêt de pins'],
 ['Qui a écrit la lettre?', 'Hugo', 'Papa', 'Maman', 'Un voisin'],
 ['Que se passe-t-il juste avant que Sam sourise?', 'Papa lui remet l’enveloppe d’Hugo.', 'Il appelle son ami.', 'Il rencontre un voisin.', 'Il ouvre la fenêtre pour la première fois.'],
 ['Comment sait-on que Sam commence à aimer sa nouvelle maison?', 'Il sourit et dit « Peut-être que ça ira ».', 'Il range ses boîtes.', 'Il joue avec son ourson.', 'Il explore la cour.'],
]);

t(2, 'récit', 'Le dragon de l’école',
`Le lundi matin, tout le monde à l’école Saint-Louis parle du même sujet. Un énorme bruit a été entendu dans la nuit, et une gigantesque patte verte est apparue dans la cour.

— C’est un dragon! affirme Théo, la bouche pleine de céréales.

— Impossible, dit Inès. Les dragons n’existent pas.

— Alors regarde, répond Théo en pointant le sol. Des traces de griffes!

Il a raison : de grandes marques sont creusées dans le sable, jusqu’à la porte du gymnase. Le directeur, monsieur Bastien, arrive en courant. Il est pâle.

— Les enfants, restez calmes, dit-il d’une voix tremblante. Nous avons un… un petit problème.

On décide d’enquêter. Théo, Inès et leur ami Malik suivent les traces. Elles vont jusqu’au gymnase. Ils poussent doucement la porte. Au milieu de la salle, une énorme créature verte dort en ronflant, la tête sur un ballon.

— C’est un… un… commence Malik.

— Un camion de poubelles? propose Inès.

Ils s’approchent. En fait, c’est le costume de dragon de la pièce de théâtre de la classe de madame Carole, laissé dans le gymnase par le concierge, qui l’a tiré sur le sol en le traînant. Le gros ronflement venait du système de chauffage.

Quand les élèves racontent leur découverte, tout le monde rit. Même le directeur.

— Je suppose, dit-il en s’épongeant le front, que j’ai besoin de lunettes.

Théo, lui, reste un peu déçu. Un vrai dragon aurait été beaucoup plus intéressant!`,
[
 ['De quoi tout le monde parle-t-il à l’école ce lundi?', 'D’un bruit entendu dans la nuit et d’une patte verte', 'D’un vol dans l’école', 'D’un spectacle de magie', 'D’un nouveau directeur'],
 ['Qu’est-ce qui fait croire à Théo qu’un dragon est venu?', 'Il a vu de grandes traces de griffes dans le sable.', 'Il a entendu un rugissement.', 'Il a vu de la fumée.', 'Il a lu un livre sur les dragons.'],
 ['Comment le directeur réagit-il?', 'Il est pâle et inquiet.', 'Il rit.', 'Il appelle la police.', 'Il se met en colère.'],
 ['Où mènent les traces?', 'Au gymnase', 'À la cafétéria', 'À la bibliothèque', 'Au bureau du directeur'],
 ['Que trouvent les enfants dans le gymnase?', 'Un costume de dragon', 'Un vrai dragon', 'Un camion', 'Un chien géant'],
 ['D’où venait le gros ronflement?', 'Du système de chauffage', 'Du dragon', 'Du directeur', 'Du concierge'],
 ['Dans le texte, « s’épongeant le front » montre que le directeur…', 'avait chaud et se sentait gêné', 'avait faim', 'se préparait à partir', 'riait aux larmes'],
 ['Pourquoi Théo est-il un peu déçu à la fin?', 'Il aurait préféré un vrai dragon.', 'Il a perdu son pari.', 'Il a raté son cours.', 'Il a peur des costumes.'],
]);

/* ============================ NIVEAU 3 (3e année forte) ============================ */

t(3, 'récit', 'La tempête au chalet',
`Chaque été, la famille de Justine passe une semaine dans un chalet au bord d’un lac, en Mauricie. Cette année, Justine, onze ans, a enfin la permission d’aller seule en kayak jusqu’à la petite île, à cinq minutes du quai.

Un après-midi, elle pagaie tranquillement quand le ciel se couvre. Au loin, un grondement roule comme un tambour. Les nuages noirs avancent à toute vitesse. Un vent frais ride soudain la surface de l’eau.

« Je dois rentrer tout de suite », pense Justine. Mais le vent souffle contre elle, et chaque coup de pagaie la fait à peine avancer. Les premières gouttes commencent à tomber. Son cœur tape dans sa poitrine.

Elle se rappelle alors les paroles de son père : « Quand tu as peur, ralentis. Cherche l’abri le plus proche. » Plutôt que de lutter, Justine vire vers l’île. Elle tire son kayak sur la plage de galets et se glisse sous un gros pin, juste au moment où l’orage éclate. Des éclairs zèbrent le ciel. Elle compte les secondes entre l’éclair et le tonnerre, comme on le lui a enseigné : trois, deux, une… Il est tout près!

Pendant une demi-heure, elle reste là, recroquevillée, grelottante. Puis, comme par magie, le vent tombe. Le soleil perce les nuages et un arc-en-ciel apparaît au-dessus du lac.

Quand elle rentre, son père l’attend sur le quai, très inquiet. Justine lui raconte tout. Il la serre dans ses bras.

— Tu as pris la bonne décision, dit-il. Le courage, ce n’est pas de ne pas avoir peur : c’est de savoir quoi faire quand on a peur.`,
[
 ['Où se déroule l’histoire?', 'Dans un chalet au bord d’un lac, en Mauricie', 'Dans une ville au bord du fleuve', 'Dans un camping en Gaspésie', 'Sur une île du Saguenay'],
 ['Qu’est-ce que Justine a de nouveau cette année?', 'La permission d’aller seule en kayak jusqu’à l’île', 'Un nouveau kayak', 'Un chalet plus grand', 'Une amie à qui parler'],
 ['Quel signe annonce l’orage?', 'Le ciel se couvre et un grondement roule au loin.', 'Les oiseaux se taisent.', 'L’eau devient chaude.', 'Un éclair frappe le lac.'],
 ['Pourquoi Justine ne peut-elle pas rentrer directement au quai?', 'Le vent souffle contre elle.', 'Sa pagaie est cassée.', 'Le kayak prend l’eau.', 'Elle ne voit plus le quai.'],
 ['Que décide Justine de faire?', 'Aller se mettre à l’abri sur l’île', 'Continuer vers le quai', 'Appeler son père', 'Rester au milieu du lac'],
 ['Dans le texte, « recroquevillée » veut dire…', 'repliée sur elle-même', 'couchée par terre', 'mouillée de la tête aux pieds', 'cachée derrière un arbre'],
 ['Pourquoi Justine compte-t-elle les secondes entre l’éclair et le tonnerre?', 'Pour savoir à quelle distance est l’orage', 'Pour se calmer', 'Pour savoir quand rentrer', 'Pour mesurer la vitesse du vent'],
 ['Que veut dire le père par « le courage, c’est de savoir quoi faire quand on a peur »?', 'Être courageux, c’est bien agir même quand on a peur.', 'Il ne faut jamais avoir peur.', 'Il faut toujours rester calme.', 'Il faut éviter les orages.'],
]);

t(3, 'informatif', 'Les aurores boréales',
`Certaines nuits d’hiver, surtout dans le nord du Québec, de grands rubans verts dansent dans le ciel. On les appelle les aurores boréales, ou « aurores polaires ». Ce phénomène spectaculaire fascine les humains depuis des milliers d’années. Les peuples du Nord racontaient que c’étaient des esprits qui dansaient ou les torches de ceux qui avaient quitté ce monde.

Aujourd’hui, les scientifiques connaissent leur secret. Le Soleil envoie sans cesse dans l’espace une pluie de minuscules particules, qu’on appelle « vent solaire ». Quand ces particules arrivent près de la Terre, elles sont attirées par le magnétisme de notre planète, qui agit comme un grand aimant. Elles glissent le long de ses lignes invisibles et plongent vers les pôles Nord et Sud.

En entrant dans l’atmosphère, ces particules entrent en collision avec des gaz comme l’oxygène et l’azote. Chaque collision produit un petit éclair de lumière, un peu comme dans une lampe fluorescente. Des millions de collisions créent alors un immense rideau lumineux. Quand les particules touchent l’oxygène, la lumière est verte, la couleur la plus courante. Avec l’azote, elle peut être rouge, rose ou violette.

Pour voir une aurore, il faut un ciel très noir, loin des lumières de la ville, et une nuit sans nuages. Les meilleurs endroits au Québec sont l’Abitibi, la Côte-Nord et le Nunavik. Mieux vaut s’habiller très chaudement : l’attente est parfois longue!

Les aurores boréales nous rappellent que, même loin de nous, le Soleil agit sur notre planète. Et elles offrent l’un des plus beaux spectacles de la nature.`,
[
 ['Où voit-on surtout les aurores boréales au Québec?', 'Dans le nord de la province', 'Près des grandes villes', 'Sur le fleuve Saint-Laurent', 'Dans les Cantons-de-l’Est'],
 ['Comment les peuples du Nord expliquaient-ils les aurores?', 'Comme des esprits qui dansaient', 'Comme des feux de forêt', 'Comme des éclairs sans orage', 'Comme des étoiles filantes'],
 ['Qu’est-ce que le « vent solaire »?', 'Des particules envoyées par le Soleil dans l’espace', 'Un vent chaud venant du sud', 'La lumière du Soleil', 'Un nuage de poussière'],
 ['Pourquoi les particules se dirigent-elles vers les pôles?', 'Elles sont attirées par le magnétisme de la Terre.', 'Il y fait plus froid.', 'Elles suivent les nuages.', 'Elles sont trop lourdes.'],
 ['Quelle couleur est la plus courante?', 'Le vert', 'Le rouge', 'Le rose', 'Le violet'],
 ['Que se passe-t-il quand les particules rencontrent l’oxygène?', 'Une lumière verte apparaît.', 'Une lumière rouge apparaît.', 'Il se forme un nuage.', 'Il y a un éclair très fort.'],
 ['Dans le texte, « phénomène spectaculaire » désigne…', 'un événement de la nature impressionnant à regarder', 'une fête traditionnelle', 'un appareil de scientifique', 'un type de ciel noir'],
 ['Quelles conditions faut-il pour voir une aurore?', 'Un ciel noir, loin des lumières, sans nuages', 'Un ciel nuageux et doux', 'La pleine lune au-dessus de la ville', 'Un temps chaud et humide'],
]);

t(3, 'récit', 'Le robot de grand-papa',
`Grand-papa Armand a une passion : bricoler. Dans son garage de Granby, il y a des boîtes de vis, de vieilles radios et des fils emmêlés. Un jour, il annonce à sa petite-fille Maëlle, dix ans :

— J’ai construit un robot!

Maëlle est sceptique. Le robot, qu’il appelle Boulon, ressemble à une poubelle avec deux bras de tuyau et une passoire sur la tête. Il a l’air de tout, sauf d’une machine moderne.

— Boulon, dit grand-papa, salue Maëlle.

Le robot lève un bras, puis le laisse tomber lourdement sur l’établi, faisant sauter des vis dans tous les sens. Maëlle pouffe de rire.

— Il est un peu maladroit, avoue grand-papa. Mais il a bon cœur.

Au cours de l’été, Boulon devient une vedette du quartier. Il arrose le jardin… et la voisine. Il apporte le journal… en miettes. Il tente de préparer des crêpes et fait voler la pâte au plafond. À chaque bêtise, grand-papa soupire, puis éclate de rire, et ses yeux plissés se remplissent de petites étoiles.

À la fin des vacances, Maëlle comprend quelque chose : Boulon n’est pas le meilleur robot du monde, mais grand-papa n’a jamais été aussi heureux. Ses mains, autrefois tremblantes, ont retrouvé leur adresse. Sa voix, trop silencieuse depuis la mort de grand-maman, s’est remplie d’éclats de rire.

Le dernier jour, Maëlle écrit une pancarte et l’accroche au cou du robot : « Boulon, le plus extraordinaire des inventeurs. Il a inventé un grand-papa heureux. »`,
[
 ['Quelle est la passion de grand-papa Armand?', 'Bricoler', 'Cuisiner', 'Jardiner', 'Lire'],
 ['Comment est le robot Boulon?', 'Il ressemble à une poubelle avec une passoire sur la tête.', 'Il est brillant et très moderne.', 'Il ressemble à un chien.', 'Il est petit comme un jouet.'],
 ['Comment Maëlle réagit-elle d’abord quand elle voit Boulon?', 'Elle est sceptique, puis elle rit.', 'Elle a peur.', 'Elle est très impressionnée.', 'Elle se met en colère.'],
 ['Que veut dire « il a bon cœur »?', 'Il est gentil, même s’il fait des erreurs.', 'Il est fort.', 'Il est en bonne santé.', 'Il est très intelligent.'],
 ['Quelle bêtise Boulon fait-il en voulant préparer des crêpes?', 'Il fait voler la pâte au plafond.', 'Il brûle la poêle.', 'Il casse les œufs par terre.', 'Il oublie le sirop.'],
 ['Dans le texte, « sceptique » veut dire…', 'qui doute de quelque chose', 'qui s’amuse beaucoup', 'qui a très peur', 'qui est en colère'],
 ['Que comprend Maëlle à la fin de l’été?', 'Boulon rend grand-papa heureux.', 'Boulon est un robot parfait.', 'Grand-papa doit vendre son garage.', 'Boulon doit être réparé.'],
 ['Comment sait-on que grand-papa était triste avant Boulon?', 'Sa voix était silencieuse depuis la mort de grand-maman.', 'Il ne bricolait plus du tout.', 'Il n’avait jamais de visites.', 'Il habitait seul à la campagne.'],
]);

t(3, 'informatif', 'Le loup gris du Québec',
`Le loup est l’un des animaux les plus craints, mais aussi les plus mal connus. Au Québec, on croise surtout le loup gris, qui vit dans les forêts du nord et de l’Abitibi. Il est plus grand qu’un chien de berger et pèse jusqu’à 50 kilos.

Contrairement à ce que racontent les vieux contes, le loup ne cherche pas à manger les humains. Il évite les gens et préfère chasser des cerfs, des orignaux ou des lièvres. Il est un prédateur important : en éliminant les bêtes malades ou faibles, il garde les troupeaux de cerfs en bonne santé.

Les loups vivent en meute, une petite famille de cinq à dix individus, dirigée par un couple de loups, souvent appelés « alpha ». Chaque membre a un rôle. Les plus jeunes aident à surveiller les louveteaux, tandis que les adultes partent chasser ensemble. La meute coopère : l’un pousse la proie, un autre la bloque, un troisième l’attaque. Ainsi, ils peuvent attraper un animal bien plus gros qu’eux.

Les loups ne hurlent pas à la lune. Ils hurlent pour se retrouver quand ils sont séparés, pour avertir les étrangers de ne pas entrer sur leur territoire ou tout simplement pour renforcer les liens dans la meute. Un hurlement peut s’entendre à plus de dix kilomètres!

Autrefois chassé, le loup a failli disparaître de certaines régions. Aujourd’hui, on comprend mieux son rôle dans l’équilibre de la nature, et il est protégé dans plusieurs parcs.

Si un jour tu entends un hurlement dans la nuit, n’aie pas peur : c’est le chant d’une famille qui se parle.`,
[
 ['Où vit surtout le loup gris au Québec?', 'Dans les forêts du nord et de l’Abitibi', 'Près des grandes villes', 'Sur les îles du Saint-Laurent', 'Dans les montagnes de l’Estrie'],
 ['Quelle idée fausse le texte corrige-t-il?', 'Le loup ne cherche pas à manger les humains.', 'Le loup ne vit qu’en groupe.', 'Le loup est un animal rare.', 'Le loup ne sait pas courir.'],
 ['Pourquoi le loup est-il utile dans la nature?', 'Il garde les troupeaux de cerfs en bonne santé.', 'Il plante des arbres.', 'Il nettoie les forêts.', 'Il protège les orignaux.'],
 ['Comment s’appelle un groupe de loups?', 'Une meute', 'Un troupeau', 'Un nid', 'Une horde'],
 ['Comment les loups font-ils pour attraper un gros animal?', 'Ils chassent en équipe.', 'Ils attaquent chacun de leur côté.', 'Ils attendent la nuit.', 'Ils le poursuivent pendant des heures.'],
 ['Dans le texte, « prédateur » veut dire…', 'un animal qui en chasse d’autres pour se nourrir', 'un animal qui vit en groupe', 'un animal qui chasse la nuit', 'un animal rapide'],
 ['Pourquoi les loups hurlent-ils?', 'Pour communiquer entre eux', 'Pour saluer la lune', 'Pour attirer les proies', 'Pour faire peur aux humains'],
 ['Quel est le but de la dernière phrase?', 'Rassurer le lecteur sur les hurlements', 'Inviter à chasser le loup', 'Décrire une nuit d’hiver', 'Faire peur au lecteur'],
]);

t(3, 'récit', 'La Saint-Jean à Percé',
`Le 23 juin au soir, tout le village de Percé est sur la plage. Un énorme bûcher de bois flotté, haut comme une maison, attend d’être allumé. C’est la veille de la fête nationale du Québec, et l’air sent déjà le feu de joie.

Noé, neuf ans, est excité. Pour la première fois, il a le droit de rester debout tard. Il tient dans sa main un petit drapeau bleu et blanc. À ses côtés, sa grand-mère Odette, qui a vu plus de soixante feux de la Saint-Jean, lui explique :

— Autrefois, on allumait des feux pour célébrer l’été et pour se réunir. Aujourd’hui, c’est une façon de dire que nous sommes fiers de notre langue et de notre histoire.

Un homme au violon commence à jouer. Les gens tapent des mains. Une fille chante : « Gens du pays, c’est votre tour de vous laisser parler d’amour… » Peu à peu, tout le monde reprend en chœur.

Quand le maire allume le bûcher, les flammes montent jusqu’au ciel. Des étincelles virevoltent comme des lucioles dans la nuit. Noé sent la chaleur sur ses joues. Il est ému, mais il ne sait pas trop pourquoi.

— C’est beau, dit-il simplement.

— Oui, dit grand-maman. Ce qui est beau, ce n’est pas seulement le feu. C’est qu’on soit tous ensemble pour le voir.

Plus tard, en rentrant, Noé s’arrête et regarde le rocher Percé, éclairé par la lune. Il lève son petit drapeau, comme pour saluer le monde.`,
[
 ['Où se déroule l’histoire?', 'Sur la plage de Percé', 'À Montréal', 'Dans un parc de Québec', 'Au bord du lac Saint-Jean'],
 ['Quel événement célèbre-t-on?', 'La veille de la fête nationale du Québec', 'La fête du Canada', 'Le Nouvel An', 'Une fête de village'],
 ['Qu’est-ce que Noé a le droit de faire pour la première fois?', 'Rester debout tard', 'Allumer le bûcher', 'Jouer du violon', 'Chanter sur scène'],
 ['Qu’explique grand-maman Odette sur les feux de la Saint-Jean?', 'Ils servaient à réunir les gens et aujourd’hui à célébrer la fierté.', 'Ils servaient à chasser les loups.', 'Ils servaient à cuisiner.', 'Ils servaient à envoyer des messages.'],
 ['Que se passe-t-il juste après que le violoniste commence à jouer?', 'Les gens tapent des mains et une fille chante.', 'Le maire allume le feu.', 'Noé s’endort.', 'Il se met à pleuvoir.'],
 ['Dans le texte, « virevoltent » veut dire…', 'tournoient en l’air', 'tombent rapidement', 'font du bruit', 'montent tout droit'],
 ['Pourquoi Noé est-il ému sans savoir pourquoi?', 'Il ressent la fierté d’être avec tout le monde.', 'Il a froid.', 'Il est triste de partir.', 'Il a peur du feu.'],
 ['Que veut dire grand-maman par « ce qui est beau, c’est qu’on soit tous ensemble »?', 'Le plus important est le fait de partager le moment.', 'Le feu est moins beau que la musique.', 'Il faut regarder le feu avec attention.', 'Tout le village est invité.'],
]);

t(3, 'lettre', 'Un courriel d’excuses',
`Objet : Mes excuses pour la vitre cassée

De : Antoine Lessard
À : Madame Rose Tessier
Date : le 14 octobre

Chère madame Tessier,

Je m’appelle Antoine, j’habite au 34, rue des Cèdres, juste en face de chez vous. Je vous écris pour vous dire que je suis désolé. Hier après-midi, en jouant au baseball avec mes amis, j’ai frappé la balle trop fort et elle a brisé la vitre de votre cuisine.

Sur le moment, j’ai eu très peur. Nous nous sommes sauvés en courant. Mais toute la soirée, j’ai pensé à vous. Je me suis dit que vous deviez être fâchée et que j’avais mal agi en m’enfuyant. J’aurais dû frapper à votre porte tout de suite pour m’excuser.

Mes parents m’ont expliqué que, lorsqu’on commet une erreur, on doit la reconnaître et essayer de la réparer. J’ai donc parlé avec eux. Papa va appeler un vitrier pour remplacer la vitre cette semaine. Quant à moi, je propose de payer une partie de la facture avec l’argent de mon cochon-tirelire, et de ramasser vos feuilles mortes chaque samedi jusqu’à la fin de l’automne.

Je comprends si vous êtes encore en colère. Je voulais seulement que vous sachiez que je n’ai pas fait exprès et que je prends mes responsabilités.

J’espère que vous accepterez mes excuses.

Respectueusement,
Antoine Lessard (9 ans)`,
[
 ['Pourquoi Antoine écrit-il à madame Tessier?', 'Pour s’excuser d’avoir brisé sa vitre', 'Pour l’inviter à jouer au baseball', 'Pour se plaindre du bruit', 'Pour lui offrir un cadeau'],
 ['Comment la vitre s’est-elle brisée?', 'Antoine a frappé la balle trop fort.', 'Un oiseau l’a frappée.', 'Un ami l’a lancée par erreur.', 'Il y a eu un orage.'],
 ['Qu’a fait Antoine juste après avoir brisé la vitre?', 'Il s’est sauvé en courant.', 'Il a frappé à la porte.', 'Il a appelé ses parents.', 'Il a ramassé les morceaux.'],
 ['Pourquoi Antoine dit-il avoir « mal agi »?', 'Il aurait dû s’excuser tout de suite.', 'Il a joué trop tard.', 'Il n’a pas demandé la permission.', 'Il a lancé la balle exprès.'],
 ['Qu’est-ce qu’Antoine propose pour réparer son erreur?', 'Payer une partie de la facture et ramasser les feuilles', 'Faire un dessin', 'Lui donner sa balle', 'Peindre sa maison'],
 ['Dans le texte, « prendre ses responsabilités » veut dire…', 'accepter les conséquences de ses actes', 'faire le travail des autres', 'se cacher quand on a tort', 'demander l’aide de ses parents'],
 ['Comment sait-on qu’Antoine regrette son geste?', 'Il a pensé à elle toute la soirée et propose de réparer.', 'Il parle de baseball.', 'Il écrit au nom de ses amis.', 'Il habite en face de chez elle.'],
 ['Comment le courriel est-il organisé?', 'Objet, destinataire, date, formule d’appel, paragraphes, salutation', 'En vers avec des rimes', 'Sous forme de dialogue', 'En liste numérotée'],
]);

t(3, 'récit', 'Les souliers de Malik',
`Malik, dix ans, joue dans l’équipe de soccer de son quartier. Dimanche prochain, c’est la finale du tournoi, mais il a un problème : ses souliers à crampons sont trop petits. Ses orteils sont écrasés et il a des ampoules aux talons. Pourtant, il n’ose pas en parler. Il sait que sa famille a eu des mois difficiles depuis que papa a perdu son emploi.

— Ça va, Malik? demande l’entraîneur, monsieur Philippe, en le voyant boiter à l’entraînement.

— Oui, oui, répond Malik avec un sourire forcé.

Mais monsieur Philippe n’est pas dupe. Après la pratique, il prend Malik à part.

— Tes souliers te font mal, n’est-ce pas?

Malik baisse les yeux, honteux.

— Je ne veux pas que mes parents dépensent de l’argent pour ça, avoue-t-il. Je peux jouer comme ça.

L’entraîneur s’accroupit pour être à sa hauteur.

— Écoute, Malik. Le club a une boîte de souliers donnés par d’anciens joueurs. Ce n’est pas de la charité : c’est du partage. L’an dernier, j’ai moi-même pris une paire pour mon fils. Viens voir.

Dans le coffre de l’auto, il y a vingt paires de souliers. Malik en essaie une presque neuve, noire et jaune. Elle lui va comme un gant.

— Merci, murmure-t-il, la gorge serrée.

Le dimanche, malgré une défaite de justesse 2 à 1, Malik marque le but de son équipe. Dans le vestiaire, il ressent une grande fierté, non seulement pour son but, mais pour avoir osé parler de son problème. Il se promet qu’un jour, il donnera lui aussi ses souliers à un autre enfant.`,
[
 ['Quel est le problème de Malik?', 'Ses souliers à crampons sont trop petits.', 'Il a perdu ses souliers.', 'Il s’est blessé à une jambe.', 'Il n’aime pas le soccer.'],
 ['Pourquoi Malik ne veut-il pas en parler?', 'Il sait que sa famille a des problèmes d’argent.', 'Il a peur de l’entraîneur.', 'Il est trop timide pour parler à sa mère.', 'Il pense que ce n’est pas grave.'],
 ['Comment l’entraîneur sait-il que Malik a mal?', 'Il le voit boiter à l’entraînement.', 'Malik le lui dit.', 'Un ami de Malik le lui apprend.', 'Il voit les ampoules de Malik.'],
 ['Dans le texte, « ce n’est pas de la charité : c’est du partage » veut dire…', 'on s’entraide entre membres du club, sans honte', 'il faut payer les souliers', 'les souliers sont un cadeau spécial', 'seuls les pauvres peuvent en prendre'],
 ['Où l’entraîneur garde-t-il les souliers donnés?', 'Dans le coffre de son auto', 'Au vestiaire', 'Dans un entrepôt', 'Chez Malik'],
 ['Dans le texte, « n’est pas dupe » veut dire…', 'il comprend ce qui se passe', 'il est très fâché', 'il ne regarde pas', 'il doute de Malik'],
 ['Quel est le résultat de la finale?', 'L’équipe de Malik perd 2 à 1.', 'L’équipe de Malik gagne 2 à 1.', 'Le match est annulé.', 'Les deux équipes font match nul.'],
 ['Pourquoi Malik ressent-il de la fierté?', 'Il a marqué un but et osé demander de l’aide.', 'Il a gagné le tournoi.', 'Il a reçu des souliers neufs.', 'Il est devenu capitaine.'],
]);

t(3, 'informatif', 'Le cycle de l’eau',
`L’eau qui coule de ton robinet est vieille de plusieurs milliards d’années! Elle a déjà été un nuage, un glacier, une rivière, et peut-être même une partie d’un dinosaure. En fait, il n’y a pas de « nouvelle » eau sur Terre : la même eau voyage sans cesse. Ce voyage s’appelle le cycle de l’eau.

Tout commence avec le Soleil. Sa chaleur fait évaporer l’eau des mers, des lacs et des rivières. Elle se transforme alors en vapeur d’eau, un gaz invisible qui monte dans l’air. Les plantes contribuent aussi : elles rejettent de la vapeur par leurs feuilles, un phénomène qu’on appelle la transpiration.

En montant, la vapeur se refroidit. Elle se transforme en minuscules gouttelettes, qui se rassemblent et forment des nuages. On appelle cette étape la condensation. Tu peux la voir chez toi : quand tu prends une douche chaude, de la buée se forme sur le miroir.

Quand les gouttelettes deviennent trop lourdes, elles tombent. Ce sont les précipitations : pluie, grêle, neige ou verglas, selon la température. Une partie de l’eau coule sur le sol et rejoint les ruisseaux, puis les rivières. Une autre s’infiltre dans la terre et devient eau souterraine. Une autre encore s’accumule sous forme de glace dans les glaciers et la neige.

Finalement, toute cette eau retourne vers la mer, et le cycle recommence. Au Québec, une grande partie de l’eau douce provient des précipitations de l’hiver, qui fondent au printemps.

Comprendre ce cycle nous aide à mieux protéger l’eau : si on la pollue à un endroit, elle voyage et touche tout le reste.`,
[
 ['Que veut dire l’expression « il n’y a pas de nouvelle eau sur Terre »?', 'C’est toujours la même eau qui voyage.', 'On ne peut plus fabriquer d’eau.', 'L’eau est de plus en plus vieille.', 'L’eau disparaît lentement.'],
 ['Quel est le point de départ du cycle de l’eau?', 'La chaleur du Soleil', 'La pluie', 'Les nuages', 'Les rivières'],
 ['Qu’est-ce que la vapeur d’eau?', 'De l’eau sous forme de gaz invisible', 'Une petite goutte d’eau', 'Un nuage épais', 'De la glace fondue'],
 ['Que se passe-t-il quand la vapeur se refroidit?', 'Elle se transforme en gouttelettes et forme des nuages.', 'Elle disparaît dans l’air.', 'Elle tombe en pluie immédiatement.', 'Elle devient de la glace.'],
 ['Quel exemple le texte donne-t-il pour la condensation?', 'La buée sur le miroir après une douche chaude', 'La pluie sur la fenêtre', 'La rosée du matin', 'Un lac gelé'],
 ['Dans le texte, « précipitations » désigne…', 'l’eau qui tombe du ciel', 'l’eau qui s’évapore', 'l’eau qui coule dans les rivières', 'l’eau qui gèle'],
 ['Où va l’eau qui s’infiltre dans la terre?', 'Elle devient de l’eau souterraine.', 'Elle remonte aussitôt en vapeur.', 'Elle retourne aux nuages.', 'Elle disparaît.'],
 ['Pourquoi est-il important de comprendre le cycle de l’eau?', 'Parce que la pollution à un endroit peut se déplacer ailleurs', 'Parce que l’eau est rare', 'Parce que la pluie est dangereuse', 'Parce que l’eau est vieille'],
]);

t(3, 'récit', 'Le secret de la bibliothèque',
`Chaque jeudi après l’école, Camille se rend à la bibliothèque de son quartier. Ce n’est pas seulement pour lire : c’est pour retrouver monsieur Gaston, le vieux bibliothécaire aux lunettes rondes. Il connaît tous les livres par cœur et il a toujours l’histoire parfaite pour chaque enfant.

— Cette semaine, j’ai quelque chose de spécial, annonce-t-il en baissant la voix. Suis-moi.

Il l’entraîne tout au fond, derrière la section des encyclopédies. Là, une petite porte de bois est cachée par une tenture. Monsieur Gaston tourne une clé et la porte grince.

La pièce est minuscule. Elle sent le papier ancien. Sur des étagères, des livres si vieux que leurs couvertures sont craquelées. Au centre, un pupitre éclairé par une petite lampe verte.

— C’est la salle des livres rares, explique-t-il. Il y a un livre ici qui date de 1783. Il a été imprimé à Québec, il y a plus de deux cents ans. Je voulais que quelqu’un de ta génération le voie.

Camille s’approche avec précaution. Elle effleure la page du bout du doigt. Les lettres sont d’une forme ancienne : les « s » ressemblent à des « f ». Elle déchiffre lentement : « Histoire des animaux du Canada ».

— Deux siècles! chuchote-t-elle. Et on y parle encore des mêmes animaux!

— Exactement. Les livres sont comme des fenêtres sur le passé, dit monsieur Gaston. Ils nous permettent de rencontrer des gens qui ne sont plus là.

Camille décide ce jour-là qu’elle deviendra, un jour, gardienne de livres elle aussi. Avant de partir, elle serre la main de monsieur Gaston avec un grand sérieux, comme si elle venait de recevoir un secret.`,
[
 ['Pourquoi Camille va-t-elle à la bibliothèque chaque jeudi?', 'Pour lire et retrouver monsieur Gaston', 'Pour faire ses devoirs', 'Pour emprunter des films', 'Pour rencontrer des amis'],
 ['Où se trouve la porte secrète?', 'Au fond de la bibliothèque, derrière la section des encyclopédies', 'Dans le bureau de monsieur Gaston', 'Au sous-sol', 'À côté de l’entrée'],
 ['Comment est la pièce secrète?', 'Minuscule et remplie de livres très anciens', 'Grande et lumineuse', 'Vide et sombre', 'Remplie de jouets'],
 ['De quand date le livre que Camille regarde?', 'De 1783', 'De 1983', 'De 1693', 'De 1883'],
 ['Pourquoi les lettres du livre semblent-elles étranges?', 'Les « s » ressemblent à des « f ».', 'Elles sont écrites à l’envers.', 'Le livre est écrit en anglais.', 'Elles sont trop petites.'],
 ['Dans le texte, « les livres sont comme des fenêtres sur le passé » signifie que…', 'les livres permettent de connaître les gens et les choses d’autrefois', 'les livres sont transparents', 'les livres sont rangés près des fenêtres', 'les livres sont toujours anciens'],
 ['Dans le texte, « avec précaution » veut dire…', 'avec beaucoup de soin', 'avec impatience', 'avec peur', 'avec rapidité'],
 ['Que décide Camille à la fin?', 'Devenir gardienne de livres', 'Écrire un livre', 'Vendre le livre ancien', 'Quitter la bibliothèque'],
]);

t(3, 'informatif', 'Un métier : la vétérinaire',
`Dre Sophie Lacasse est vétérinaire dans une clinique de Drummondville. Depuis qu’elle est toute petite, elle rêve de soigner les animaux. Aujourd’hui, elle accueille chaque jour des chats, des chiens, des lapins et même, parfois, des oiseaux ou des tortues.

Sa journée commence par les consultations de routine. Elle pèse les animaux, écoute leur cœur avec un stéthoscope et vérifie leurs dents. Elle fait aussi les vaccins pour les protéger des maladies. Entre deux rendez-vous, elle répond aux urgences : un chiot qui a avalé un objet, un chat blessé dans une bagarre.

Pour devenir vétérinaire, il faut étudier longtemps. Après le cégep, Sophie a suivi cinq ans d’études universitaires à Saint-Hyacinthe, au seul endroit au Québec où l’on peut faire ce programme. Elle a appris l’anatomie, la chirurgie, la biologie et la médecine, mais aussi à parler avec les gens. En effet, les animaux ne parlent pas : c’est leur propriétaire qui décrit les symptômes.

« Le plus difficile, c’est quand je ne peux pas sauver un animal, confie-t-elle. Je dois alors consoler la famille, qui est en peine. Mais le plus beau, c’est de voir un animal guéri sauter de joie! »

Sophie rappelle aussi que les animaux ont besoin de soins tout au long de leur vie : une bonne alimentation, de l’exercice, des visites régulières chez le vétérinaire. Un animal n’est pas un jouet : c’est un membre de la famille qui compte sur nous.

Si tu aimes la science, les animaux et le contact avec les gens, ce métier est peut-être fait pour toi!`,
[
 ['Où travaille Dre Sophie Lacasse?', 'Dans une clinique vétérinaire à Drummondville', 'Dans un zoo', 'Dans une ferme', 'Dans un refuge à Québec'],
 ['Qu’est-ce que Sophie fait pendant une consultation de routine?', 'Elle pèse l’animal, écoute son cœur et vérifie ses dents.', 'Elle fait de la chirurgie.', 'Elle prépare des médicaments.', 'Elle dresse l’animal.'],
 ['À quoi servent les vaccins?', 'À protéger les animaux de certaines maladies', 'À les rendre plus forts', 'À les calmer', 'À les faire grandir'],
 ['Combien d’années d’études universitaires faut-il après le cégep?', 'Cinq ans', 'Deux ans', 'Un an', 'Dix ans'],
 ['Pourquoi doit-elle savoir bien parler aux gens?', 'Les animaux ne parlent pas, ce sont les propriétaires qui décrivent les symptômes.', 'Elle doit faire de la publicité.', 'Elle doit enseigner.', 'Elle travaille avec des interprètes.'],
 ['Dans le texte, « les urgences » désigne…', 'les cas qui demandent des soins tout de suite', 'les rendez-vous annulés', 'les visites de routine', 'les examens de fin d’année'],
 ['Qu’est-ce qui est le plus difficile pour Sophie?', 'Quand elle ne peut pas sauver un animal', 'Étudier longtemps', 'Travailler la fin de semaine', 'Faire des vaccins'],
 ['Que veut dire « un animal n’est pas un jouet »?', 'Il faut en prendre soin toute sa vie.', 'Il ne faut pas jouer avec lui.', 'Il est toujours fragile.', 'On peut le ranger quand on veut.'],
]);

t(3, 'récit', 'Le grand défi de Rosalie',
`Rosalie a onze ans et un rêve : devenir championne de natation. Tous les matins, elle se lève à cinq heures et demie pour aller s’entraîner à la piscine de Laval. Elle nage jusqu’à ce que ses bras tremblent, puis elle file à l’école, les cheveux encore mouillés.

À la compétition régionale de mars, elle se classe quatrième au 100 mètres papillon. Un peu partout autour d’elle, les gens applaudissent, mais Rosalie, elle, serre les dents. Elle voulait le podium.

— Quatrième sur trente nageuses, c’est excellent! la console sa mère.
— Ce n’est pas assez, répond Rosalie.

Pendant des semaines, elle devient grincheuse. Elle ne rit plus. Elle ne joue plus avec sa petite sœur Léa. Un jour, Léa dessine un trophée géant avec « Rosalie la championne » écrit en lettres de toutes les couleurs.

— Pourquoi tu dessines ça? demande Rosalie, la voix cassée.
— Parce que moi, je te trouve championne, même si tu n’as pas de médaille, dit Léa en haussant les épaules.

Rosalie sent un nœud dans sa gorge. Elle comprend soudain qu’elle s’est enfermée dans son désir de gagner et qu’elle a oublié ce qui lui plaisait dans la natation : la sensation de glisser dans l’eau, comme un poisson.

Le lendemain, elle retourne à la piscine. Cette fois, elle nage pour le plaisir. Et, quelques semaines plus tard, à la compétition suivante, elle gagne la médaille de bronze. Mais la plus grande victoire, elle la sait déjà : retrouver la joie de nager.`,
[
 ['Quel est le rêve de Rosalie?', 'Devenir championne de natation', 'Devenir médecin', 'Gagner un concours de dessin', 'Voyager en Europe'],
 ['À quelle heure Rosalie se lève-t-elle pour s’entraîner?', 'À cinq heures et demie', 'À sept heures', 'À quatre heures', 'À six heures et demie'],
 ['Quel est son classement à la compétition régionale?', 'Quatrième sur trente nageuses', 'Première', 'Troisième sur dix nageuses', 'Dernière'],
 ['Pourquoi Rosalie serre-t-elle les dents malgré les applaudissements?', 'Elle est déçue de ne pas avoir le podium.', 'Elle a mal aux bras.', 'Elle est fâchée contre sa mère.', 'Elle a froid.'],
 ['Que fait Léa pour consoler sa sœur?', 'Elle dessine un trophée géant.', 'Elle lui apporte un gâteau.', 'Elle lui chante une chanson.', 'Elle lui prête sa médaille.'],
 ['Dans le texte, « grincheuse » veut dire…', 'de mauvaise humeur', 'très fatiguée', 'très triste', 'très timide'],
 ['Que comprend Rosalie grâce à Léa?', 'Elle a oublié le plaisir de nager.', 'Elle doit changer de sport.', 'Elle doit s’entraîner plus fort.', 'Elle ne gagnera jamais.'],
 ['Quelle est « la plus grande victoire » de Rosalie?', 'Retrouver la joie de nager', 'Gagner la médaille de bronze', 'Battre les autres nageuses', 'Devenir célèbre'],
]);

t(3, 'mode d’emploi', 'Les règles du jeu des pirates',
`Le trésor du capitaine Barbe-Rouge — règles du jeu
Pour 2 à 4 joueurs, à partir de 7 ans. Durée : environ 20 minutes.

Contenu de la boîte :
• 1 plateau de jeu (une carte de l’île)
• 4 pions de pirates (rouge, bleu, vert, jaune)
• 1 dé
• 30 pièces d’or
• 12 cartes « Défi »

But du jeu :
Être le premier pirate à atteindre la case « Grotte », où se cache le trésor, avec au moins 10 pièces d’or.

Préparation :
Chaque joueur place son pion sur la case « Plage ». Les pièces d’or sont placées au centre de la table. Mélange les cartes « Défi » et pose-les en pile, face cachée.

Déroulement :
1. Le plus jeune joueur commence, puis on joue dans le sens des aiguilles d’une montre.
2. À son tour, le joueur lance le dé et avance son pion du nombre de cases indiqué.
3. Si le pion arrive sur une case dorée, le joueur prend une pièce d’or.
4. S’il arrive sur une case à point d’interrogation, il pige une carte « Défi » et la lit à haute voix. Il obéit à la consigne (par exemple « Perds un tour » ou « Vole une pièce au joueur de ton choix »).
5. Si le dé indique un nombre plus grand que la distance qui le sépare de la Grotte, le joueur doit reculer d’autant de cases.

Fin de la partie :
Le premier pirate qui arrive à la Grotte avec 10 pièces ou plus remporte le trésor. S’il n’a pas assez de pièces, il doit retourner à la Plage!`,
[
 ['Combien de joueurs peuvent jouer?', 'De 2 à 4', 'De 1 à 3', 'De 4 à 6', 'Seulement 2'],
 ['Quel est le but du jeu?', 'Atteindre la Grotte avec au moins 10 pièces d’or', 'Avoir le plus de cartes', 'Faire le tour de l’île', 'Voler toutes les pièces'],
 ['Sur quelle case chaque pion commence-t-il?', 'La Plage', 'La Grotte', 'Le Coffre', 'Le Bateau'],
 ['Qui commence la partie?', 'Le plus jeune joueur', 'Le plus vieux joueur', 'Celui qui a le dé', 'Le joueur au pion rouge'],
 ['Que se passe-t-il si un pion arrive sur une case à point d’interrogation?', 'Le joueur pige une carte « Défi » et obéit à la consigne.', 'Il gagne une pièce d’or.', 'Il lance le dé encore une fois.', 'Il retourne à la Plage.'],
 ['Que doit faire un joueur qui arrive à la Grotte avec moins de 10 pièces?', 'Retourner à la Plage', 'Attendre un tour', 'Voler des pièces', 'Perdre la partie'],
 ['Dans le texte, « dans le sens des aiguilles d’une montre » veut dire…', 'dans le même sens que tourne l’horloge', 'de droite à gauche', 'en partant du plus vieux', 'un joueur sur deux'],
 ['Que se passe-t-il si le dé indique un nombre trop grand pour la Grotte?', 'Le joueur recule d’autant de cases.', 'Le joueur gagne la partie.', 'Le joueur passe son tour.', 'Le joueur relance le dé.'],
]);

t(3, 'affiche', 'Camp de jour Aventure-Nature',
`CAMP DE JOUR AVENTURE-NATURE
Été — Parc des Trois-Ruisseaux

Pour les 6 à 12 ans
Du 29 juin au 21 août, du lundi au vendredi, de 8 h 30 à 16 h 30
(Service de garde disponible dès 7 h et jusqu’à 17 h 30)

Au programme chaque semaine : une thématique!
• Semaine 1 : « Détectives de la forêt » — apprends à reconnaître les traces d’animaux.
• Semaine 2 : « Chefs en plein air » — cuisine sur feu de camp.
• Semaine 3 : « Explorateurs aquatiques » — kayak, canot et baignade surveillée.
• Semaine 4 : « Astronomes en herbe » — observation des étoiles (soirée spéciale jeudi).
• Semaine 5 : « Artistes de la nature » — bricolages avec des matériaux naturels.

Tarifs :
• 120 $ par semaine (lunch non inclus)
• Rabais de 10 % pour un deuxième enfant de la même famille
• Service de garde : 15 $ par semaine

À apporter chaque jour : crème solaire, chapeau, bouteille d’eau, vêtements de rechange, lunch froid et chaussures fermées.

Inscriptions du 1er au 30 avril sur le site de la Ville ou à l’hôtel de ville. Les places sont limitées à 80 enfants.`,
[
 ['À quel âge s’adresse le camp de jour?', '6 à 12 ans', '4 à 8 ans', '10 à 15 ans', '8 à 14 ans'],
 ['Pendant quelle semaine fait-on du kayak?', 'La semaine 3', 'La semaine 1', 'La semaine 4', 'La semaine 5'],
 ['Que fait-on lors de la semaine « Astronomes en herbe »?', 'On observe les étoiles.', 'On cuisine sur le feu.', 'On suit des traces d’animaux.', 'On nage.'],
 ['Combien coûte une semaine de camp?', '120 $', '15 $', '80 $', '10 $'],
 ['Quel rabais obtient-on pour un deuxième enfant?', '10 %', '15 $', '120 $', 'Aucun'],
 ['Qu’est-ce que l’enfant NE doit PAS apporter, d’après l’affiche?', 'Un lunch chaud', 'Une crème solaire', 'Un chapeau', 'Des vêtements de rechange'],
 ['Dans le texte, « service de garde » veut dire…', 'un service qui accueille les enfants avant et après le camp', 'une garderie permanente', 'un surveillant dans le parc', 'un cours spécial'],
 ['Pourquoi les parents doivent-ils s’inscrire rapidement?', 'Il y a seulement 80 places.', 'Le camp commence en avril.', 'Les tarifs augmentent.', 'La météo est incertaine.'],
]);

t(3, 'poème', 'Brouillard d’octobre',
`Brouillard d’octobre

Ce matin, le monde a disparu.
Une grande couverture grise
S’est posée sur la ville entière,
Effaçant les clochers et les toits.

Le lampadaire n’est plus qu’une lune
Qui flotte au-dessus du trottoir.
Le chat noir du voisin marche, souple,
Et sa queue disparaît la première.

J’avance, les mains tendues,
Comme un aveugle dans un conte.
Chaque pas résonne dans le vide.
Où sont passés les arbres, les passants?

Mais voilà qu’au bout de la rue
Un rayon doré perce la brume.
Les feuilles rouges se mettent à luire,
Comme des braises sous la cendre.

Le monde revient doucement,
Pièce par pièce, comme un puzzle.
Et je me dis que, parfois,
Il faut se perdre pour mieux voir.`,
[
 ['Quelle saison est évoquée dans le poème?', 'L’automne', 'L’hiver', 'Le printemps', 'L’été'],
 ['À quoi le brouillard est-il comparé au début du poème?', 'À une grande couverture grise', 'À un nuage de fumée', 'À une toile d’araignée', 'À un voile blanc'],
 ['Pourquoi dit-on que le lampadaire est « une lune »?', 'Sa lumière est floue et semble flotter dans la brume.', 'Il est rond.', 'Il est très haut.', 'Il éclaire tout le quartier.'],
 ['Que veut dire « sa queue disparaît la première »?', 'Le chat s’éloigne dans le brouillard.', 'Le chat est sans queue.', 'Le chat est malade.', 'Le chat joue.'],
 ['Quelle impression le poète donne-t-il en marchant « les mains tendues »?', 'Il avance prudemment, comme s’il ne voyait rien.', 'Il joue avec la brume.', 'Il essaie d’attraper la lune.', 'Il est très pressé.'],
 ['À quoi les feuilles rouges sont-elles comparées?', 'À des braises sous la cendre', 'À des bonbons', 'À des lanternes', 'À des fleurs'],
 ['Comment le monde revient-il à la fin?', 'Doucement, pièce par pièce, comme un puzzle', 'D’un seul coup', 'Avec du vent', 'Dans le bruit'],
 ['Que veut dire le dernier vers « il faut se perdre pour mieux voir »?', 'Parfois, ce qu’on ne voit plus nous apprend à regarder.', 'Il faut toujours chercher son chemin.', 'Le brouillard est dangereux.', 'Il ne faut pas sortir quand il fait gris.'],
]);

t(3, 'recette', 'La tarte au sucre de grand-maman',
`La tarte au sucre de grand-maman Lucille

Temps de préparation : 30 minutes
Temps de cuisson : 40 minutes
Portions : 8
Difficulté : moyenne (demande l’aide d’un adulte pour le four)

Ingrédients :
• 1 abaisse de pâte à tarte (maison ou du commerce)
• 1 ½ tasse de cassonade
• ¾ tasse de crème 35 %
• 3 c. à soupe de farine
• 2 c. à soupe de beurre mou
• 1 c. à thé de vanille
• 1 pincée de sel

Préparation :
1. Préchauffe le four à 190 °C (375 °F).
2. Étends la pâte dans une assiette à tarte d’environ 23 cm. Pique-la avec une fourchette en plusieurs endroits, pour éviter qu’elle gonfle.
3. Dans un grand bol, mélange la cassonade, la farine et le sel.
4. Ajoute la crème, le beurre et la vanille. Remue avec une cuillère de bois, sans trop travailler la préparation.
5. Verse doucement la garniture dans la croûte.
6. Fais cuire au centre du four pendant 40 minutes, jusqu’à ce que la garniture soit dorée et qu’elle bouillonne légèrement.
7. Sors la tarte du four avec des mitaines. Laisse-la refroidir complètement (au moins 2 heures) avant de la couper, sinon la garniture coulera.

Servir avec de la crème glacée à la vanille ou de la crème fouettée.

Conseil de grand-maman : « Ne goûte pas la garniture crue avec trop d’enthousiasme! Il faut garder de la place pour la tarte! »`,
[
 ['Combien de portions cette recette permet-elle?', '8', '4', '12', '6'],
 ['À quelle température doit-on préchauffer le four?', '190 °C', '100 °C', '250 °C', '90 °C'],
 ['Pourquoi pique-t-on la pâte avec une fourchette?', 'Pour qu’elle ne gonfle pas', 'Pour qu’elle absorbe le sucre', 'Pour la décorer', 'Pour qu’elle cuise plus vite'],
 ['Que fait-on juste après avoir mélangé la cassonade, la farine et le sel?', 'On ajoute la crème, le beurre et la vanille.', 'On verse la garniture dans la croûte.', 'On met la tarte au four.', 'On étend la pâte.'],
 ['Comment sait-on que la tarte est cuite?', 'La garniture est dorée et bouillonne légèrement.', 'La croûte est blanche.', 'La tarte ne bouge plus.', 'Il s’est écoulé une heure.'],
 ['Pourquoi doit-on laisser refroidir la tarte avant de la couper?', 'Sinon la garniture coulera.', 'Pour qu’elle soit plus sucrée.', 'Pour qu’elle ait meilleur goût.', 'Pour ne pas se brûler les doigts.'],
 ['Dans cette recette, « la garniture » veut dire…', 'le mélange sucré qui remplit la croûte', 'la croûte de la tarte', 'la crème glacée', 'la décoration'],
 ['Pourquoi la dernière phrase de grand-maman est-elle drôle?', 'Elle dit de ne pas trop goûter, pour garder de la place pour la tarte.', 'Elle explique comment cuire.', 'Elle prévient d’un danger.', 'Elle propose de la manger crue.'],
]);

t(3, 'récit', 'Léon et le renard',
`L’hiver est rude dans la forêt de Charlevoix. La neige couvre le sol de plus d’un mètre et le vent mord les joues. Léon, un garçon de dix ans, marche vers la cabane de son grand-père pour lui apporter des provisions. Il porte un gros sac à dos et chaque pas s’enfonce dans la neige molle.

À mi-chemin, il aperçoit, sur le côté du sentier, une tache orange. C’est un renard roux, couché à demi dans la neige. Une de ses pattes est prise dans un vieux piège rouillé.

Léon s’arrête, le cœur battant. L’animal le regarde avec de grands yeux jaunes pleins de peur et de douleur. Léon sait qu’on lui a toujours dit de ne jamais toucher aux animaux sauvages, car ils peuvent mordre. Mais il sait aussi que le renard va mourir de froid si personne ne l’aide.

Il enlève lentement son manteau et le pose doucement sur la tête du renard, pour le calmer en lui cachant la vue. Puis, de ses doigts engourdis, il écarte les mâchoires du piège. Clic! Le piège s’ouvre. Le renard, d’abord immobile, s’éloigne en boitant, puis disparaît entre les sapins.

Léon, essoufflé, ramasse son manteau et reprend sa route. Quand il arrive à la cabane, son grand-père s’inquiète :

— Tu es en retard! Et tu as l’air tout bouleversé.

Léon raconte l’histoire. Le vieil homme hoche la tête, un sourire dans les yeux.

— Les animaux comprennent plus qu’on le croit. Je suis certain qu’il te remerciera à sa façon.

Le lendemain matin, sur le seuil de la cabane, Léon trouve des traces de petites pattes dans la neige. Et au milieu, une plume de perdrix : un cadeau du renard.`,
[
 ['Où se passe l’histoire?', 'Dans la forêt de Charlevoix, en hiver', 'Dans un parc de la ville', 'Sur une montagne en été', 'Au bord du fleuve'],
 ['Pourquoi Léon marche-t-il dans la forêt?', 'Pour apporter des provisions à son grand-père', 'Pour chasser', 'Pour chercher un renard', 'Pour faire du ski'],
 ['Que voit Léon sur le côté du sentier?', 'Un renard roux pris dans un piège', 'Un orignal blessé', 'Un chasseur', 'Un nid d’oiseau'],
 ['Pourquoi Léon hésite-t-il à aider le renard?', 'On lui a toujours dit de ne pas toucher aux animaux sauvages.', 'Il a peur du froid.', 'Il pense que le renard est mort.', 'Il est pressé d’arriver.'],
 ['Pourquoi Léon met-il son manteau sur la tête du renard?', 'Pour le calmer en lui cachant la vue', 'Pour le réchauffer', 'Pour l’attraper', 'Pour le porter'],
 ['Que se passe-t-il juste après que le piège s’ouvre?', 'Le renard s’éloigne en boitant.', 'Léon repart en courant.', 'Le renard mord Léon.', 'Le grand-père arrive.'],
 ['Dans le texte, « bouleversé » veut dire…', 'très ému', 'très fâché', 'très fatigué', 'très surpris'],
 ['Que signifie le cadeau trouvé le lendemain?', 'Le renard remercie Léon à sa façon.', 'Le renard veut manger.', 'Le renard a perdu quelque chose.', 'Un chasseur est passé.'],
]);

/* ------------------------------------------------------------------ */
/*  Banque de questions par niveau                                     */
/* ------------------------------------------------------------------ */
const POOL = { 1: [], 2: [], 3: [] };
const TEXTS = { 1: [], 2: [], 3: [] };   // level -> [ [question entries of one text] ]
T.forEach((tx, ti) => {
  const one = tx.qs.map((q, qi) => ({ key: `f14-l${tx.l}-t${ti}-q${qi}`, text: tx.text, prompt: q[0], right: q[1], wrong: q.slice(2) }));
  POOL[tx.l].push(...one);
  TEXTS[tx.l].push(one);
});
const toQ = (e, level) => {
  const n = level === 1 ? 3 : 4;
  return {
    type: 'choice', key: e.key, prompt: e.prompt, say: { text: e.prompt, lang: FR }, stimulus: { text: e.text },
    options: [e.right, ...e.wrong.slice(0, n - 1)].map((text) => ({ text })), answer: 0,
  };
};

export const units = [
  {
    id: 'f14',
    icon: '📗',
    title: { fr: 'Je lis des histoires', en: 'Reading stories' },
    pfeq: 'Lecture — compréhension de textes variés (fin 2e – 3e année)',
    generate(level, R) { return toQ(R.pick(POOL[level] || POOL[2]), level); },
    // A practice round = ONE text, all its questions in order (the child reads it once, then answers).
    session(level, R) { return R.pick(TEXTS[level] || TEXTS[2]).map((e) => toQ(e, level)); },
  },
];
