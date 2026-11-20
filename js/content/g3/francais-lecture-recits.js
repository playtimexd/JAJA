// Petit Hibou — 3e année, lecture : récits (u: 'r') et bandes dessinées / dialogues (u: 'b'). Textes originaux.
// Champs : e = explicite, i = implicite, v = vocabulaire en contexte, f = inférence ([question, bonne, fausse×3]);
// o = opinion justifiée ([question, corrigé]); vf = [énoncé, vrai?]; nd = énoncés dont le texte ne parle pas;
// ev = événements dans l’ordre; res = [bon résumé, faux×3].
export const RECITS = [
{ u: 'r', title: 'La tuque de Félix',
text: `Ce matin-là, il faisait très froid à Rimouski. Félix a enfilé ses mitaines, son manteau et sa tuque rouge, celle que sa grand-mère avait tricotée pour lui.

À la récréation, Félix a joué au ballon dans la neige. Il avait chaud, alors il a retiré sa tuque et l’a déposée sur un banc. Quand la cloche a sonné, il est rentré en courant… sans sa tuque.

Le soir, Félix a cherché partout : dans son sac, dans ses poches, sous son lit. Rien! Il avait le cœur gros. Il pensait à sa grand-mère et à toutes les heures qu’elle avait passées à tricoter.

Le lendemain, en arrivant à l’école, il a vu le concierge, monsieur Gagnon, qui tenait une tuque rouge couverte de neige.
— Elle est à toi, je crois? a-t-il demandé avec un sourire.
Félix a sauté de joie. Depuis ce jour, il range toujours sa tuque dans sa poche de manteau.`,
e: [['De quelle couleur est la tuque de Félix?', 'Rouge', 'Bleue', 'Verte', 'Jaune'],
 ['Qui a tricoté la tuque?', 'Sa grand-mère', 'Sa mère', 'Son voisin', 'Le concierge'],
 ['Où Félix a-t-il déposé sa tuque?', 'Sur un banc', 'Dans son sac', 'Sous son lit', 'Dans la neige'],
 ['Qui a retrouvé la tuque?', 'Monsieur Gagnon, le concierge', 'L’enseignante', 'Sa grand-mère', 'Son ami Liam'],
 ['Dans quelle ville se passe l’histoire?', 'À Rimouski', 'À Montréal', 'À Gatineau', 'À Laval']],
i: [['Pourquoi Félix a-t-il retiré sa tuque?', 'Parce qu’il avait chaud en jouant', 'Parce qu’elle était mouillée', 'Parce qu’elle était trop petite', 'Parce que la cloche a sonné'],
 ['Pourquoi Félix a-t-il oublié sa tuque?', 'Il est rentré en courant quand la cloche a sonné.', 'Il l’a donnée à un ami.', 'Il ne l’aimait pas.', 'Le vent l’a emportée.'],
 ['Comment se sent Félix le soir?', 'Triste', 'Fier', 'Fâché contre son ami', 'Amusé']],
v: [['Dans le texte, « avoir le cœur gros » veut dire…', 'être triste', 'être malade', 'être en colère', 'avoir faim'],
 ['Dans le texte, « enfiler » sa tuque veut dire…', 'la mettre', 'la laver', 'la perdre', 'la tricoter']],
f: [['Pourquoi la tuque est-elle si importante pour Félix?', 'Sa grand-mère l’a faite pour lui avec amour.', 'Elle coûte très cher.', 'C’est la seule tuque du magasin.', 'Elle est magique.'],
 ['Pourquoi la tuque est-elle couverte de neige le lendemain?', 'Elle est restée dehors toute la nuit.', 'Le concierge l’a lancée dans la neige.', 'Félix l’a cachée dans la neige.', 'Il a neigé dans l’école.'],
 ['Qu’a appris Félix dans cette histoire?', 'À faire attention à ses affaires', 'À tricoter', 'À jouer au ballon', 'À parler au concierge']],
o: [['Est-ce que Félix a bien fait de ranger sa tuque dans sa poche? Explique pourquoi.', 'Oui (ou une opinion claire), avec une raison : par exemple, il ne la perdra plus, car elle sera toujours avec lui.']],
vf: [['Félix habite à Rimouski.', 1], ['Félix joue au ballon à la récréation.', 1], ['La tuque de Félix est bleue.', 0], ['Félix trouve sa tuque sous son lit.', 0],
 ['Le concierge rapporte la tuque.', 1], ['Félix est content à la fin.', 1], ['La grand-mère a acheté la tuque au magasin.', 0], ['Félix cherche sa tuque le soir.', 1]],
nd: ['Félix a une sœur.', 'Monsieur Gagnon a un chien.', 'Félix aime les mathématiques.'],
ev: ['Félix met sa tuque rouge.', 'Il joue au ballon dans la neige.', 'Il dépose sa tuque sur un banc.', 'Il rentre sans sa tuque.', 'Il cherche partout le soir.', 'Le concierge lui rend sa tuque.'],
res: ['Félix oublie sa tuque à la récréation, puis le concierge la lui rend le lendemain.', 'Félix tricote une tuque avec sa grand-mère.', 'Félix joue au ballon toute la journée.', 'Le concierge perd sa tuque dans la neige.'] },

{ u: 'r', title: 'Le potager de Maya',
text: `Au printemps, Maya a reçu un petit coin de terre dans la cour de ses parents. « Ce sera ton potager », a dit son père.

Maya a semé des graines de carottes, de radis et de haricots. Chaque jour, après l’école, elle arrosait ses rangs avec un vieil arrosoir vert. Mais au bout d’une semaine, rien ne sortait de la terre. Maya était découragée.
— Mes graines sont peut-être brisées, soupira-t-elle.
— Sois patiente, répondit sa mère. Les plantes poussent d’abord sous la terre.

Quelques jours plus tard, de minuscules feuilles vertes sont apparues. Maya a crié si fort que le chat du voisin s’est sauvé sous la galerie!

En juillet, les radis étaient rouges et croquants. En août, Maya a récolté un panier plein de haricots. Pour le souper, elle a préparé une salade avec ses propres légumes. Toute la famille l’a trouvée délicieuse.
— C’est la meilleure salade du monde! a dit son petit frère, la bouche pleine.`,
e: [['Qui a donné un coin de terre à Maya?', 'Son père', 'Sa grand-mère', 'Le voisin', 'Son enseignante'],
 ['Quels légumes Maya a-t-elle semés?', 'Des carottes, des radis et des haricots', 'Des tomates et des concombres', 'Des patates et du maïs', 'Des pois et des citrouilles'],
 ['De quelle couleur est l’arrosoir?', 'Vert', 'Rouge', 'Bleu', 'Jaune'],
 ['Quand Maya arrosait-elle ses rangs?', 'Chaque jour, après l’école', 'Le dimanche seulement', 'Le matin, avant le déjeuner', 'Une fois par mois'],
 ['Qu’a préparé Maya pour le souper?', 'Une salade', 'Une soupe', 'Une tarte', 'Des biscuits']],
i: [['Pourquoi Maya était-elle découragée?', 'Rien ne poussait après une semaine.', 'Son arrosoir était brisé.', 'Le chat avait mangé ses graines.', 'Il pleuvait trop.'],
 ['Pourquoi Maya a-t-elle crié?', 'Elle était très contente de voir les premières feuilles.', 'Elle avait peur du chat.', 'Elle s’était fait mal.', 'Elle avait perdu ses graines.'],
 ['Que pense le petit frère de la salade?', 'Il l’adore.', 'Il la trouve trop salée.', 'Il ne veut pas y goûter.', 'Il préfère la soupe.']],
v: [['Dans le texte, « récolter » veut dire…', 'cueillir les légumes mûrs', 'planter des graines', 'arroser la terre', 'acheter des légumes'],
 ['Dans le texte, « minuscules » veut dire…', 'très petites', 'très grandes', 'très vertes', 'très molles']],
f: [['Que veut dire la mère quand elle dit « Les plantes poussent d’abord sous la terre »?', 'Les graines travaillent même si on ne voit rien encore.', 'Les plantes ne sortent jamais de la terre.', 'Il faut creuser pour voir les plantes.', 'Les graines sont brisées.'],
 ['Comment Maya se sent-elle à la fin de l’histoire?', 'Fière de son travail', 'Fâchée contre son frère', 'Fatiguée de jardiner', 'Déçue de ses légumes'],
 ['Quelle qualité Maya a-t-elle dû apprendre?', 'La patience', 'La vitesse', 'La force', 'Le courage devant un danger']],
o: [['Aimerais-tu avoir un potager comme Maya? Explique pourquoi.', 'Oui ou non, avec une raison claire (par exemple : manger ses propres légumes, aimer jardiner, ou trouver cela trop long).']],
vf: [['Maya a un potager dans la cour.', 1], ['Maya a semé des radis.', 1], ['Les feuilles sortent dès le premier jour.', 0], ['Le chat du voisin se sauve.', 1],
 ['Les radis sont prêts en juillet.', 1], ['La famille n’aime pas la salade.', 0], ['Maya arrose avec un boyau d’arrosage.', 0], ['Maya récolte des haricots en août.', 1]],
nd: ['Maya a dix ans.', 'Le voisin cultive des fraises.', 'Maya vend ses légumes au marché.'],
ev: ['Maya reçoit un coin de terre.', 'Elle sème des graines.', 'Elle arrose chaque jour.', 'Elle est découragée.', 'Les premières feuilles sortent.', 'Elle prépare une salade.'],
res: ['Maya fait pousser un potager avec patience et prépare une salade pour sa famille.', 'Maya achète des légumes au marché.', 'Le chat du voisin mange le potager de Maya.', 'Maya n’aime pas jardiner.'] },

{ u: 'r', title: 'Le grand spectacle',
text: `Dans la classe de madame Hélène, les élèves préparaient un spectacle pour la fin de l’année. Émile devait chanter une chanson tout seul, devant toute l’école.

Pendant des semaines, il a répété dans sa chambre, devant son miroir et même devant son poisson rouge. Il connaissait chaque mot par cœur.

Le soir du spectacle, la salle était pleine. Émile voyait des centaines de visages. Ses jambes tremblaient comme de la gélatine. Quand la musique a commencé, aucun son n’est sorti de sa bouche. Le silence était terrible.

Alors, Rosalie, sa meilleure amie, s’est avancée sans bruit. Elle s’est placée à côté de lui et a commencé à chanter doucement. Émile a pris une grande respiration. Au deuxième couplet, sa voix est revenue, forte et claire.

À la fin, toute la salle s’est levée pour applaudir. Émile a serré la main de Rosalie.
— Merci, a-t-il chuchoté. Sans toi, je serais encore muet comme une carpe!`,
e: [['Comment s’appelle l’enseignante?', 'Madame Hélène', 'Madame Rosalie', 'Madame Gagnon', 'Madame Lise'],
 ['Que devait faire Émile au spectacle?', 'Chanter une chanson tout seul', 'Jouer du piano', 'Danser avec sa classe', 'Lire un poème'],
 ['Devant qui Émile a-t-il répété?', 'Devant son miroir et son poisson rouge', 'Devant son chien', 'Devant sa classe', 'Devant le directeur'],
 ['Qui vient aider Émile?', 'Rosalie, sa meilleure amie', 'Madame Hélène', 'Sa mère', 'Le concierge'],
 ['Quand la voix d’Émile revient-elle?', 'Au deuxième couplet', 'Avant la musique', 'À la toute fin', 'Le lendemain']],
i: [['Pourquoi aucun son ne sort-il de la bouche d’Émile?', 'Il a très peur devant tant de monde.', 'Il a oublié les paroles.', 'Il a mal à la gorge.', 'La musique est trop forte.'],
 ['Pourquoi Rosalie s’avance-t-elle sans bruit?', 'Pour aider Émile sans attirer l’attention', 'Pour faire une blague', 'Pour quitter la scène', 'Pour chanter à sa place toute la chanson'],
 ['Que montre la salle qui se lève pour applaudir?', 'Le public a beaucoup aimé la chanson.', 'Le spectacle est trop long.', 'Les gens veulent partir.', 'Il y a un problème.']],
v: [['Dans le texte, « muet comme une carpe » veut dire…', 'qui ne dit pas un mot', 'qui nage très bien', 'qui chante faux', 'qui a faim'],
 ['Dans le texte, « chuchoter » veut dire…', 'parler très bas', 'crier fort', 'chanter vite', 'pleurer']],
f: [['Pourquoi Émile a-t-il répété pendant des semaines?', 'Il voulait que son spectacle soit réussi.', 'Son poisson le lui demandait.', 'Il n’avait rien d’autre à faire.', 'Il voulait chanter faux.'],
 ['Quelle sorte d’amie est Rosalie?', 'Une amie fidèle qui aide dans les moments difficiles', 'Une amie jalouse', 'Une amie qui se moque', 'Une amie timide qui ne bouge pas'],
 ['Que signifie « ses jambes tremblaient comme de la gélatine »?', 'Il était très nerveux.', 'Il avait mangé de la gélatine.', 'Il dansait.', 'Il avait froid aux pieds.']],
o: [['Qu’aurais-tu fait à la place de Rosalie? Explique pourquoi.', 'Une action claire (aider, encourager, attendre…) avec une raison (par exemple : parce qu’un ami doit aider son ami quand il a peur).']],
vf: [['Émile doit chanter seul.', 1], ['La salle est presque vide.', 0], ['Rosalie chante avec Émile.', 1], ['Émile a répété devant son chat.', 0],
 ['Le public applaudit à la fin.', 1], ['Émile remercie Rosalie.', 1], ['Émile oublie les paroles de la chanson.', 0], ['Le spectacle a lieu le soir.', 1]],
nd: ['Émile a un frère plus âgé.', 'La chanson parle de la mer.', 'Rosalie joue du violon.'],
ev: ['La classe prépare un spectacle.', 'Émile répète devant son miroir.', 'La salle est pleine.', 'Émile reste muet.', 'Rosalie chante avec lui.', 'Le public applaudit.'],
res: ['Émile a le trac pendant le spectacle, mais son amie Rosalie l’aide à chanter.', 'Émile refuse de chanter au spectacle.', 'Rosalie chante seule toute la soirée.', 'Le poisson rouge d’Émile chante au spectacle.'] },

{ u: 'r', title: 'La cabane dans l’érablière',
text: `Chaque printemps, la famille de Jacob se rend à la cabane à sucre de son oncle Marcel, près de Saint-Georges. Cette année, Jacob avait enfin le droit d’aider à la récolte de l’eau d’érable.

Avec son oncle, il a marché entre les érables. La neige fondait et l’air sentait la terre mouillée. Des seaux de métal étaient accrochés aux arbres. Goutte à goutte, l’eau d’érable tombait dedans.
— Il faut environ quarante seaux d’eau pour faire un seul seau de sirop, expliqua l’oncle Marcel.

Jacob versait l’eau dans un grand bac sur un traîneau. Le travail était dur et ses bras devenaient lourds. Mais il ne se plaignait pas.

Ensuite, dans la cabane, l’eau bouillait pendant des heures dans l’évaporateur. Une vapeur sucrée remplissait la pièce. Le soir, la tante de Jacob a versé du sirop chaud sur la neige. Jacob a enroulé la tire autour d’un bâton et l’a goûtée.
— C’est la meilleure tire de ma vie, dit-il. Parce que c’est moi qui l’ai faite!`,
e: [['Où va la famille de Jacob chaque printemps?', 'À la cabane à sucre de l’oncle Marcel', 'Au chalet de sa grand-mère', 'À la plage', 'Au zoo'],
 ['Près de quelle ville est la cabane?', 'Saint-Georges', 'Sherbrooke', 'Rimouski', 'Granby'],
 ['Dans quoi tombe l’eau d’érable?', 'Dans des seaux de métal', 'Dans des bouteilles', 'Dans des boîtes', 'Dans la rivière'],
 ['Combien de seaux d’eau faut-il pour un seau de sirop?', 'Environ quarante', 'Environ deux', 'Environ dix', 'Environ cent'],
 ['Qui verse le sirop sur la neige?', 'La tante de Jacob', 'L’oncle Marcel', 'Jacob', 'Le père de Jacob']],
i: [['Pourquoi Jacob est-il content cette année?', 'Il a enfin le droit d’aider à la récolte.', 'Il ne va pas à l’école.', 'Il reçoit un traîneau.', 'Il voit la neige pour la première fois.'],
 ['Pourquoi les bras de Jacob deviennent-ils lourds?', 'Il transporte beaucoup d’eau.', 'Il a froid.', 'Il est malade.', 'Il a mangé trop de tire.'],
 ['En quelle saison se passe l’histoire?', 'Au printemps, quand la neige fond', 'En plein été', 'À l’automne', 'En plein hiver, quand il gèle fort']],
v: [['Dans le texte, « l’évaporateur » sert à…', 'faire bouillir l’eau d’érable', 'transporter les seaux', 'couper les arbres', 'faire de la neige'],
 ['Dans le texte, « se plaindre » veut dire…', 'dire qu’on n’est pas content', 'chanter de joie', 'se reposer', 'se cacher']],
f: [['Pourquoi la tire est-elle « la meilleure » pour Jacob?', 'Il a travaillé fort pour la faire.', 'Elle est plus sucrée que d’habitude.', 'Il n’en a jamais mangé.', 'Son oncle l’a achetée.'],
 ['Quel trait de caractère montre Jacob?', 'Il est travaillant et courageux.', 'Il est paresseux.', 'Il est peureux.', 'Il est impoli.'],
 ['Pourquoi faut-il faire bouillir l’eau longtemps?', 'Pour la transformer en sirop épais', 'Pour la refroidir', 'Pour la rendre salée', 'Pour la colorer en vert']],
o: [['Selon toi, est-ce difficile de faire du sirop d’érable? Explique ta réponse avec un indice du texte.', 'Oui (ou non) avec une raison tirée du texte : il faut 40 seaux d’eau pour un seau de sirop, le travail est dur, l’eau bout pendant des heures.']],
vf: [['L’oncle s’appelle Marcel.', 1], ['L’eau d’érable coule goutte à goutte.', 1], ['Jacob se plaint tout le temps.', 0], ['L’eau bout pendant des heures.', 1],
 ['La tire est faite avec du sirop chaud versé sur la neige.', 1], ['Les seaux sont en plastique.', 0], ['Jacob n’aime pas la tire.', 0], ['L’histoire se passe en été.', 0]],
nd: ['L’oncle Marcel a trois chevaux.', 'Jacob a une sœur jumelle.', 'La cabane a été construite il y a cent ans.'],
ev: ['La famille va à la cabane.', 'Jacob marche entre les érables.', 'Il verse l’eau dans le bac.', 'L’eau bout dans l’évaporateur.', 'La tante verse le sirop sur la neige.', 'Jacob goûte la tire.'],
res: ['Jacob aide son oncle à récolter l’eau d’érable et goûte sa propre tire.', 'Jacob plante des érables avec son oncle.', 'La tante de Jacob vend du sirop au marché.', 'Jacob se perd dans la forêt d’érables.'] },

{ u: 'r', title: 'Le mystère du biscuit disparu',
text: `Dimanche après-midi, grand-papa Louis avait cuit douze biscuits à l’avoine. Il les avait posés sur le comptoir pour qu’ils refroidissent. Quand il est revenu, il n’en restait que onze!

Zoé, sa petite-fille, a décidé de mener l’enquête. Elle a sorti une loupe et un carnet.
D’abord, elle a interrogé son cousin Nathan. Il jouait aux blocs depuis une heure dans le salon et ses mains étaient propres. Ensuite, elle a observé le chien, Caramel. Il dormait dans son panier, loin de la cuisine.

Puis Zoé a remarqué de petites miettes sur le plancher. Elles formaient une ligne jusqu’à la fenêtre ouverte. Sur le bord de la fenêtre, il y avait des traces de petites pattes.

Zoé s’est penchée dehors. Dans l’arbre, un écureuil gris grignotait quelque chose de brun.
— Voilà notre voleur! a-t-elle annoncé.
Grand-papa a ri.
— Bravo, détective! Pour ta récompense, tu auras deux biscuits. Mais d’abord, fermons cette fenêtre!`,
e: [['Combien de biscuits grand-papa avait-il cuits?', 'Douze', 'Onze', 'Dix', 'Vingt'],
 ['Quel objet Zoé sort-elle pour son enquête?', 'Une loupe et un carnet', 'Une lampe de poche', 'Un téléphone', 'Une carte'],
 ['Que faisait Nathan dans le salon?', 'Il jouait aux blocs.', 'Il dormait.', 'Il mangeait.', 'Il lisait.'],
 ['Comment s’appelle le chien?', 'Caramel', 'Biscuit', 'Moka', 'Flocon'],
 ['Qui est le voleur?', 'Un écureuil gris', 'Le chien', 'Nathan', 'Un chat']],
i: [['Pourquoi Zoé pense-t-elle que Nathan est innocent?', 'Ses mains étaient propres et il jouait depuis une heure.', 'Il a dit qu’il n’avait pas faim.', 'Il était parti au parc.', 'Il n’aime pas les biscuits.'],
 ['Par où le voleur est-il entré?', 'Par la fenêtre ouverte', 'Par la porte d’entrée', 'Par la cheminée', 'Par le sous-sol'],
 ['Que mange l’écureuil dans l’arbre?', 'Le biscuit disparu', 'Une noix', 'Une pomme', 'Une feuille']],
v: [['Dans le texte, « mener l’enquête » veut dire…', 'chercher des indices pour trouver la vérité', 'faire des biscuits', 'jouer aux blocs', 'aller dehors'],
 ['Dans le texte, « grignoter » veut dire…', 'manger par petits morceaux', 'courir vite', 'dormir', 'crier']],
f: [['Pourquoi grand-papa veut-il fermer la fenêtre?', 'Pour que l’écureuil ne vole pas d’autres biscuits', 'Parce qu’il pleut', 'Parce qu’il y a du bruit', 'Pour garder la chaleur du four'],
 ['Quels indices ont aidé Zoé à trouver le voleur?', 'Les miettes et les traces de pattes près de la fenêtre', 'Les mains de Nathan', 'Le bruit du chien', 'Le carnet de grand-papa'],
 ['Comment Zoé a-t-elle mené son enquête?', 'Elle a observé et éliminé les suspects un par un.', 'Elle a deviné au hasard.', 'Elle a demandé à l’écureuil.', 'Elle a accusé tout le monde.']],
o: [['Est-ce que Zoé mérite sa récompense? Explique pourquoi.', 'Une opinion claire avec une raison : par exemple, oui, parce qu’elle a bien observé les indices et trouvé le vrai voleur.']],
vf: [['Il manque un biscuit.', 1], ['Le chien dormait dans son panier.', 1], ['Les miettes mènent à la porte.', 0], ['Nathan a mangé le biscuit.', 0],
 ['L’écureuil est gris.', 1], ['Zoé reçoit deux biscuits.', 1], ['Les biscuits sont au chocolat.', 0], ['Grand-papa se fâche contre Zoé.', 0]],
nd: ['Zoé veut devenir policière plus tard.', 'Grand-papa Louis habite à Laval.', 'L’écureuil vit avec sa famille.'],
ev: ['Grand-papa cuit douze biscuits.', 'Un biscuit disparaît.', 'Zoé interroge Nathan.', 'Elle observe le chien.', 'Elle suit les miettes.', 'Elle voit l’écureuil dans l’arbre.'],
res: ['Zoé enquête sur un biscuit disparu et découvre qu’un écureuil l’a volé.', 'Nathan mange tous les biscuits de grand-papa.', 'Le chien Caramel vole un biscuit.', 'Zoé apprend à cuire des biscuits.'] },

{ u: 'r', title: 'La tempête au chalet',
text: `Pendant les vacances de Noël, Chloé et ses parents étaient au chalet, au bord d’un lac gelé. Un après-midi, le ciel est devenu gris foncé. Le vent s’est levé et la neige s’est mise à tomber si fort qu’on ne voyait plus les arbres.

Soudain, toutes les lumières se sont éteintes. Le réfrigérateur s’est tu. Plus de courant!
— Pas de panique, dit papa. Nous sommes prêts.
Il a allumé un feu dans le poêle à bois. Maman a sorti des chandelles et des couvertures. Chloé, elle, a trouvé la vieille radio à piles. On y annonçait que la tempête durerait jusqu’au lendemain.

Le soir, la famille a soupé de soupe réchauffée sur le poêle. Ensuite, ils ont joué aux cartes à la lueur des chandelles. Papa racontait des histoires de loups-garous et Chloé faisait semblant d’avoir peur.

Le matin, le soleil brillait sur une neige toute neuve. Le courant était revenu. Pourtant, Chloé était un peu déçue.
— On pourrait éteindre les lumières encore ce soir? demanda-t-elle.`,
e: [['Où est la famille de Chloé?', 'Dans un chalet au bord d’un lac gelé', 'Dans un hôtel en ville', 'Chez sa grand-mère', 'Dans une tente'],
 ['Qu’allume papa pour se chauffer?', 'Un feu dans le poêle à bois', 'Une chaufferette électrique', 'Le four', 'Une lampe'],
 ['Qu’est-ce que Chloé trouve?', 'Une vieille radio à piles', 'Une lampe de poche', 'Un jeu vidéo', 'Une carte'],
 ['Qu’est-ce que la famille mange au souper?', 'De la soupe', 'De la pizza', 'Du pâté chinois', 'Des crêpes'],
 ['Quel temps fait-il le matin?', 'Le soleil brille.', 'Il pleut.', 'Il neige encore fort.', 'Il y a du brouillard.']],
i: [['Pourquoi les lumières s’éteignent-elles?', 'La tempête a coupé le courant.', 'Papa a éteint les lumières.', 'Les ampoules sont brisées.', 'C’est la nuit.'],
 ['Que veut dire papa par « Nous sommes prêts »?', 'La famille a ce qu’il faut pour une panne.', 'Ils sont prêts à partir.', 'Ils ont fini de souper.', 'Ils vont jouer dehors.'],
 ['Pourquoi joue-t-on aux cartes à la lueur des chandelles?', 'Il n’y a pas d’électricité.', 'C’est plus joli.', 'Les chandelles sont parfumées.', 'Papa n’aime pas les lampes.']],
v: [['Dans le texte, « le courant » veut dire…', 'l’électricité', 'l’eau du lac qui bouge', 'une course', 'le vent'],
 ['Dans le texte, « la lueur » veut dire…', 'une faible lumière', 'un grand bruit', 'une odeur', 'une ombre']],
f: [['Pourquoi Chloé est-elle déçue le matin?', 'Elle a aimé la soirée sans électricité.', 'Elle a eu très peur des loups-garous.', 'Il n’y a plus de soupe.', 'Elle doit rentrer à l’école.'],
 ['Pourquoi Chloé fait-elle semblant d’avoir peur?', 'Pour jouer et s’amuser avec son père', 'Parce qu’elle est malade', 'Parce que le feu s’éteint', 'Pour aller se coucher'],
 ['Que nous apprend la radio?', 'Combien de temps la tempête va durer', 'L’heure du souper', 'Le nom du lac', 'La recette de la soupe']],
o: [['Aimerais-tu passer une soirée sans électricité comme Chloé? Explique pourquoi.', 'Oui ou non avec une raison claire (jouer en famille, les chandelles, ou avoir froid, ne pas voir…).']],
vf: [['L’histoire se passe pendant les vacances de Noël.', 1], ['Le lac est gelé.', 1], ['Maman sort des chandelles.', 1], ['La radio fonctionne avec des piles.', 1],
 ['La famille quitte le chalet pendant la tempête.', 0], ['Papa raconte des histoires de fantômes de pirates.', 0], ['Le courant revient le matin.', 1], ['Chloé est contente que la lumière revienne.', 0]],
nd: ['Le chalet a trois chambres.', 'Chloé a un chien au chalet.', 'Maman fait du ski de fond le matin.'],
ev: ['Le ciel devient gris foncé.', 'Les lumières s’éteignent.', 'Papa allume un feu.', 'Chloé écoute la radio.', 'La famille joue aux cartes.', 'Le soleil brille le matin.'],
res: ['Pendant une tempête, la famille de Chloé passe une belle soirée sans électricité au chalet.', 'Chloé se perd dans la tempête.', 'La famille quitte le chalet à cause du froid.', 'Papa répare la radio du chalet.'] },
];

export const BD = [
{ u: 'b', title: 'Le chiot de la ruelle',
text: `Case 1 — Dans la ruelle, Léo et Mia entendent un petit bruit derrière une poubelle.
LÉO : — Tu entends? On dirait un bébé qui pleure!
MIA : — Chut! Approche doucement…

Case 2 — Derrière la poubelle, un chiot brun tremble.
MIA : — Oh! Il est tout maigre. Il a peut-être faim.
LÉO : — Il n’a pas de collier.

Case 3 — À la maison, la mère de Léo croise les bras.
MAMAN : — Un chien? Ici? Qui va le promener matin et soir?
LÉO : — Moi! Je te le promets!

Case 4 — Maman téléphone au refuge pour animaux.
MAMAN : — Bonjour. Personne n’a perdu un chiot brun? … Non? D’accord.

Case 5 — Le chiot lèche la main de maman. Elle sourit.
MAMAN : — Bon… S’il reste avec nous, il lui faut un nom.
MIA ET LÉO : — Ruelle!`,
e: [['Où Léo et Mia trouvent-ils le chiot?', 'Derrière une poubelle, dans la ruelle', 'Dans le parc', 'Devant l’école', 'Dans un magasin'],
 ['De quelle couleur est le chiot?', 'Brun', 'Blanc', 'Noir', 'Gris'],
 ['Qui dit : « Il n’a pas de collier »?', 'Léo', 'Mia', 'Maman', 'Le refuge'],
 ['À qui maman téléphone-t-elle?', 'Au refuge pour animaux', 'À la police', 'Au vétérinaire', 'À grand-maman'],
 ['Quel nom les enfants donnent-ils au chiot?', 'Ruelle', 'Brun', 'Biscuit', 'Caramel']],
i: [['Pourquoi Mia dit-elle « Chut! »?', 'Pour ne pas effrayer l’animal', 'Parce que Léo chante', 'Parce qu’il est tard', 'Pour jouer à cache-cache'],
 ['Pourquoi maman croise-t-elle les bras?', 'Elle n’est pas sûre de vouloir un chien.', 'Elle a froid.', 'Elle est très contente.', 'Elle attend l’autobus.'],
 ['Pourquoi maman téléphone-t-elle au refuge?', 'Pour savoir si quelqu’un a perdu le chiot', 'Pour donner le chiot', 'Pour acheter de la nourriture', 'Pour réserver un toiletteur']],
v: [['Dans la BD, « un refuge » est…', 'un endroit qui accueille les animaux perdus', 'un magasin de jouets', 'une école', 'un restaurant'],
 ['Dans la BD, « maigre » veut dire…', 'très mince, pas assez nourri', 'très gros', 'très propre', 'très vieux']],
f: [['Pourquoi maman change-t-elle d’idée à la fin?', 'Le chiot est attachant et personne ne l’a perdu.', 'Léo pleure.', 'Le refuge l’oblige.', 'Elle a toujours voulu un chat.'],
 ['Pourquoi les enfants choisissent-ils le nom « Ruelle »?', 'Ils l’ont trouvé dans la ruelle.', 'C’est le nom de leur rue.', 'Le chiot aime les poubelles.', 'C’est le nom du refuge.'],
 ['Que montre la promesse de Léo?', 'Il est prêt à s’occuper du chien.', 'Il veut un chat.', 'Il n’aime pas marcher.', 'Il veut garder le chien une journée.']],
o: [['Penses-tu que Léo tiendra sa promesse? Explique pourquoi.', 'Une opinion claire (oui ou non) avec une raison, par exemple : oui, parce qu’il aime déjà beaucoup le chiot et qu’il l’a promis.']],
vf: [['Le chiot tremble.', 1], ['Le chiot a un collier rouge.', 0], ['Mia pense que le chiot a faim.', 1], ['Maman téléphone à la police.', 0],
 ['Le chiot lèche la main de maman.', 1], ['Léo promet de promener le chien.', 1], ['Personne n’a perdu le chiot au refuge.', 1], ['Maman se fâche et met le chiot dehors.', 0]],
nd: ['Mia est la sœur de Léo.', 'Le chiot a trois mois.', 'Le refuge est loin de la maison.'],
ev: ['Les enfants entendent un bruit.', 'Ils trouvent un chiot brun.', 'Maman croise les bras.', 'Léo fait une promesse.', 'Maman téléphone au refuge.', 'Le chiot reçoit un nom.'],
res: ['Léo et Mia trouvent un chiot perdu et convainquent maman de le garder.', 'Léo et Mia vont acheter un chiot au magasin.', 'Maman trouve un chat dans la ruelle.', 'Le chiot retourne chez ses maîtres.'] },

{ u: 'b', title: 'Panique à la bibliothèque',
text: `Case 1 — À la bibliothèque de l’école, Samuel cherche partout.
SAMUEL : — Mon livre sur les dinosaures… Il est disparu!
MADAME LISE (la bibliothécaire) : — Tu dois le rendre aujourd’hui, Samuel.

Case 2 — Samuel vide son sac à dos sur une table : une pomme, des crayons, une mitaine…
SAMUEL : — Pas là non plus!
FLORENCE : — Où l’as-tu lu pour la dernière fois?

Case 3 — Samuel se gratte la tête.
SAMUEL : — Hier soir… dans mon lit… avec ma lampe de poche.
FLORENCE : — Et ce matin, tu as fait ton lit?
SAMUEL : — Euh… non.

Case 4 — Le soir, Samuel soulève son oreiller. Le livre est là!
SAMUEL : — Te voilà, Tyrannosaure!

Case 5 — Le lendemain, à la bibliothèque.
MADAME LISE : — Tu as un jour de retard, mais je suis contente de le revoir.
SAMUEL : — Promis, je ferai mon lit tous les matins!`,
e: [['Quel livre Samuel cherche-t-il?', 'Un livre sur les dinosaures', 'Un livre de recettes', 'Une bande dessinée de pirates', 'Un dictionnaire'],
 ['Qui est madame Lise?', 'La bibliothécaire', 'L’enseignante d’éducation physique', 'La mère de Samuel', 'La directrice'],
 ['Que trouve-t-on dans le sac de Samuel?', 'Une pomme, des crayons, une mitaine', 'Un ballon et des bottes', 'Son livre', 'Une lampe de poche'],
 ['Où était le livre?', 'Sous l’oreiller de Samuel', 'Dans son pupitre', 'Dans la cuisine', 'Dans l’autobus'],
 ['Qui aide Samuel à réfléchir?', 'Florence', 'Madame Lise', 'Son père', 'Le concierge']],
i: [['Pourquoi Samuel est-il pressé?', 'Il doit rendre le livre aujourd’hui.', 'Il a faim.', 'L’autobus va partir.', 'Il veut aller jouer.'],
 ['Pourquoi Florence demande-t-elle s’il a fait son lit?', 'Elle pense que le livre est resté dans le lit.', 'Elle veut savoir s’il est propre.', 'Elle veut l’inviter à dormir.', 'Elle se moque de lui.'],
 ['Pourquoi Samuel lit-il avec une lampe de poche?', 'Il lit dans son lit, dans le noir.', 'La lampe du salon est brisée.', 'Il est dehors.', 'Il joue à l’explorateur.']],
v: [['Dans la BD, « rendre » un livre veut dire…', 'le rapporter à la bibliothèque', 'le déchirer', 'l’acheter', 'le lire deux fois'],
 ['Dans la BD, « avoir un jour de retard » veut dire…', 'arriver un jour après la date prévue', 'arriver un jour trop tôt', 'partir en vacances', 'dormir toute la journée']],
f: [['Pourquoi Samuel appelle-t-il son livre « Tyrannosaure »?', 'Pour s’amuser, car le livre parle de dinosaures', 'C’est le nom de l’auteur', 'Il a peur du livre', 'C’est le nom de son chien'],
 ['Qu’est-ce que Samuel a appris?', 'Être plus ordonné l’aide à ne pas perdre ses affaires.', 'Il ne faut jamais lire.', 'Les dinosaures existent encore.', 'Il faut acheter ses livres.'],
 ['Comment se sent madame Lise à la fin?', 'Soulagée et contente', 'Très fâchée', 'Triste', 'Fatiguée']],
o: [['Est-ce une bonne idée de lire au lit avec une lampe de poche? Explique ta réponse.', 'Une opinion claire avec une raison : par exemple, oui, c’est agréable, mais il faut ranger son livre ensuite pour ne pas le perdre.']],
vf: [['Samuel a perdu un livre sur les dinosaures.', 1], ['Le livre était dans son sac.', 0], ['Samuel a lu le livre au lit.', 1], ['Samuel avait fait son lit.', 0],
 ['Samuel trouve le livre sous son oreiller.', 1], ['Madame Lise est la directrice.', 0], ['Samuel rapporte le livre en retard.', 1], ['Samuel promet de faire son lit.', 1]],
nd: ['Samuel a un frère qui aime les dinosaures.', 'Florence lit trois livres par semaine.', 'La bibliothèque ferme à midi.'],
ev: ['Samuel cherche son livre.', 'Il vide son sac.', 'Florence lui pose une question.', 'Samuel se rappelle sa lecture au lit.', 'Il trouve le livre sous l’oreiller.', 'Il rapporte le livre.'],
res: ['Samuel perd son livre de bibliothèque, puis le retrouve dans son lit grâce à Florence.', 'Samuel achète un nouveau livre sur les dinosaures.', 'Madame Lise perd tous les livres.', 'Florence vole le livre de Samuel.'] },

{ u: 'b', title: 'La course de boîtes à savon',
text: `Case 1 — Dans le garage, Thomas et sa grand-mère construisent un bolide avec une vieille caisse de bois.
GRAND-MAMAN JEANNE : — Passe-moi le marteau, mon pilote!
THOMAS : — Il nous faut encore quatre roues!

Case 2 — Ils prennent les roues d’une vieille poussette.
THOMAS : — Bleu ou rouge pour la peinture?
GRAND-MAMAN JEANNE : — Les deux! Comme les couleurs de notre équipe.

Case 3 — Le jour de la course, en haut de la côte.
ARBITRE : — À vos marques… prêts… partez!

Case 4 — Le bolide de Thomas file, mais une roue commence à branler.
THOMAS : — Oh non! Tiens bon, petite roue!

Case 5 — Thomas passe la ligne d’arrivée en troisième place. La roue roule toute seule à côté de lui.
GRAND-MAMAN JEANNE : — Troisième, avec trois roues! Bravo, champion!
THOMAS : — L’an prochain, on visse les roues deux fois!`,
e: [['Avec quoi Thomas et sa grand-mère construisent-ils le bolide?', 'Une vieille caisse de bois', 'Une boîte de carton', 'Un vieux vélo', 'Une baignoire'],
 ['D’où viennent les roues?', 'D’une vieille poussette', 'D’une auto', 'D’un vélo', 'D’un chariot d’épicerie'],
 ['Quelles couleurs choisissent-ils?', 'Bleu et rouge', 'Vert et jaune', 'Noir et blanc', 'Rose et mauve'],
 ['Qui donne le départ de la course?', 'L’arbitre', 'Grand-maman Jeanne', 'Thomas', 'Le maire'],
 ['À quelle place Thomas termine-t-il?', 'Troisième', 'Première', 'Deuxième', 'Dernière']],
i: [['Pourquoi la grand-mère appelle-t-elle Thomas « mon pilote »?', 'C’est lui qui va conduire le bolide.', 'Il pilote des avions.', 'Il a un casque de pilote.', 'C’est son surnom à l’école.'],
 ['Que se passe-t-il avec la roue pendant la course?', 'Elle se détache.', 'Elle change de couleur.', 'Elle devient plus grosse.', 'Elle s’arrête de tourner.'],
 ['Où se fait la course?', 'Dans une côte', 'Sur un lac gelé', 'Dans un gymnase', 'Sur une piste de patin']],
v: [['Dans la BD, « un bolide » est…', 'un véhicule qui va très vite', 'une sorte de gâteau', 'un outil', 'un oiseau'],
 ['Dans la BD, « branler » veut dire…', 'bouger parce que c’est mal fixé', 'briller', 'grossir', 'chanter']],
f: [['Pourquoi Thomas veut-il visser les roues deux fois l’an prochain?', 'Pour ne plus perdre de roue pendant la course', 'Pour aller moins vite', 'Pour changer de couleur', 'Parce qu’il aime visser'],
 ['Comment se sent grand-maman Jeanne à la fin?', 'Fière de Thomas', 'Déçue', 'Fâchée contre l’arbitre', 'Inquiète pour la poussette'],
 ['Que montre la dernière phrase de Thomas?', 'Il veut recommencer et s’améliorer.', 'Il ne veut plus jamais faire de course.', 'Il est fâché contre sa grand-mère.', 'Il veut vendre son bolide.']],
o: [['Est-ce que Thomas a bien réussi sa course? Explique pourquoi.', 'Une opinion claire avec une raison : par exemple, oui, il est arrivé troisième même avec une roue en moins.']],
vf: [['Thomas construit le bolide avec sa grand-mère.', 1], ['Le bolide a des roues de vélo.', 0], ['La course a lieu dans une côte.', 1], ['Une roue se détache.', 1],
 ['Thomas gagne la première place.', 0], ['Grand-maman s’appelle Jeanne.', 1], ['Le bolide est peint en vert.', 0], ['Thomas veut refaire la course l’an prochain.', 1]],
nd: ['Thomas a déjà gagné une course.', 'La grand-mère a été pilote d’avion.', 'Il y a vingt bolides dans la course.'],
ev: ['Ils construisent le bolide.', 'Ils prennent des roues de poussette.', 'Ils peignent le bolide.', 'L’arbitre donne le départ.', 'Une roue branle.', 'Thomas arrive troisième.'],
res: ['Thomas et sa grand-mère fabriquent un bolide et Thomas finit troisième malgré une roue perdue.', 'Thomas gagne une course de vélo.', 'Grand-maman Jeanne conduit le bolide.', 'Le bolide se brise avant la course.'] },

{ u: 'b', title: 'Le nouveau de la classe',
text: `Case 1 — Un lundi matin, un garçon entre dans la classe avec son père.
MADAME SYLVIE : — Je vous présente Karim. Il arrive du Maroc.
KARIM (tout bas) : — Bonjour…

Case 2 — À la récréation, Karim reste seul près de la clôture.
ALICE : — Il ne joue avec personne.
WILLIAM : — Il ne parle peut-être pas français?
ALICE : — Au Maroc, beaucoup de gens parlent français!

Case 3 — Alice et William s’approchent.
ALICE : — Veux-tu jouer au soccer avec nous?
KARIM : — Oui! Chez moi, je jouais tous les jours!

Case 4 — Karim compte trois buts de suite. Les élèves l’applaudissent.
WILLIAM : — Wow! Où as-tu appris ça?
KARIM : — Avec mon grand frère, dans la rue de mon quartier.

Case 5 — Le soir, Karim raconte sa journée à son père.
KARIM : — Papa, j’ai deux amis. Et demain, je leur apprends un jeu de chez nous!`,
e: [['D’où arrive Karim?', 'Du Maroc', 'Du Mexique', 'De la France', 'De Gaspé'],
 ['Qui présente Karim à la classe?', 'Madame Sylvie', 'Alice', 'Son père', 'William'],
 ['Où reste Karim à la récréation?', 'Seul près de la clôture', 'Dans la classe', 'Au gymnase', 'Avec les plus grands'],
 ['À quel jeu Alice invite-t-elle Karim?', 'Au soccer', 'Au hockey', 'À la marelle', 'Au ballon-chasseur'],
 ['Combien de buts Karim compte-t-il?', 'Trois', 'Un', 'Deux', 'Cinq']],
i: [['Pourquoi Karim dit-il bonjour tout bas?', 'Il est gêné d’arriver dans une nouvelle classe.', 'Il a mal à la gorge.', 'Il ne connaît pas le mot.', 'Il veut faire une blague.'],
 ['Pourquoi William pense-t-il que Karim ne parle pas français?', 'Karim ne joue avec personne et parle peu.', 'Karim parle anglais.', 'Karim l’a dit.', 'Madame Sylvie l’a dit.'],
 ['Pourquoi les élèves applaudissent-ils Karim?', 'Il joue très bien au soccer.', 'Il chante une chanson.', 'Il gagne un concours de lecture.', 'Il apporte des biscuits.']],
v: [['Dans la BD, « de suite » veut dire…', 'l’un après l’autre, sans arrêt', 'très lentement', 'plus tard', 'en se trompant'],
 ['Dans la BD, « son quartier » est…', 'la partie de la ville où il habitait', 'sa chambre', 'son école', 'son équipe']],
f: [['Comment Karim se sent-il le soir?', 'Heureux, parce qu’il s’est fait des amis', 'Seul et triste', 'Fâché contre Alice', 'Fatigué de l’école'],
 ['Que montre le geste d’Alice et de William?', 'Ils sont accueillants et gentils.', 'Ils veulent gagner à tout prix.', 'Ils se moquent de Karim.', 'Ils obéissent à l’enseignante.'],
 ['Pourquoi Karim veut-il apprendre un jeu de chez lui à ses amis?', 'Pour partager quelque chose de son pays', 'Pour gagner encore', 'Parce qu’il n’aime pas le soccer', 'Parce que son père l’oblige']],
o: [['Comment pourrais-tu aider un nouvel élève dans ta classe? Explique.', 'Une idée claire (l’inviter à jouer, lui montrer l’école, s’asseoir avec lui…) avec une raison, par exemple pour qu’il ne se sente pas seul.']],
vf: [['Karim arrive un lundi matin.', 1], ['Karim vient du Maroc.', 1], ['Karim refuse de jouer au soccer.', 0], ['Karim a appris le soccer avec son grand frère.', 1],
 ['Alice et William s’approchent de Karim.', 1], ['Karim compte cinq buts.', 0], ['Le soir, Karim parle à sa mère.', 0], ['Karim dit qu’il a deux amis.', 1]],
nd: ['Karim a une petite sœur.', 'Alice est la capitaine de l’équipe.', 'Il neige ce jour-là.'],
ev: ['Madame Sylvie présente Karim.', 'Karim reste seul à la récréation.', 'Alice l’invite à jouer.', 'Karim compte trois buts.', 'Les élèves l’applaudissent.', 'Karim raconte sa journée à son père.'],
res: ['Karim, nouvel élève venu du Maroc, se fait des amis grâce au soccer.', 'Karim déménage au Maroc avec sa famille.', 'Alice apprend à Karim à jouer au soccer.', 'William ne veut pas jouer avec Karim.'] },

{ u: 'b', title: 'Le pique-nique et la pluie',
text: `Case 1 — Samedi matin, Charlotte prépare un panier.
CHARLOTTE : — Des sandwichs, des raisins, de la limonade… Le pique-nique sera parfait!
PAPA : — As-tu regardé la météo?
CHARLOTTE : — Pas besoin, il fait soleil!

Case 2 — Au parc, la famille s’installe sur une grande couverture. Au loin, un nuage noir approche.
PAPA : — Hum… Ce nuage-là ne me dit rien de bon.

Case 3 — BOUM! Le tonnerre gronde. De grosses gouttes tombent.
CHARLOTTE : — Vite! Les sandwichs vont être tout détrempés!

Case 4 — Toute la famille court se cacher sous le kiosque du parc.
PAPA (en riant) : — Pas besoin de regarder la météo, hein?

Case 5 — Sous le kiosque, ils mangent en écoutant la pluie. Un arc-en-ciel apparaît.
CHARLOTTE : — Finalement, c’est le plus beau pique-nique de l’année!`,
e: [['Que met Charlotte dans le panier?', 'Des sandwichs, des raisins et de la limonade', 'Des crêpes et du jus', 'De la pizza et des biscuits', 'Une soupe et du pain'],
 ['Où va la famille?', 'Au parc', 'À la plage', 'Au chalet', 'Au zoo'],
 ['Qu’est-ce qui approche au loin?', 'Un nuage noir', 'Un chien', 'Un orage de neige', 'Un avion'],
 ['Où la famille se cache-t-elle?', 'Sous le kiosque du parc', 'Dans l’auto', 'Sous un arbre', 'Dans un restaurant'],
 ['Qu’apparaît-il à la fin?', 'Un arc-en-ciel', 'Un écureuil', 'La lune', 'Un ballon']],
i: [['Pourquoi papa demande-t-il si Charlotte a regardé la météo?', 'Il pense qu’il pourrait pleuvoir.', 'Il veut savoir l’heure.', 'Il cherche son téléphone.', 'Il veut aller à la plage.'],
 ['Que veut dire papa par « Ce nuage-là ne me dit rien de bon »?', 'Il pense qu’il va pleuvoir.', 'Le nuage fait du bruit.', 'Il n’aime pas les nuages blancs.', 'Il a faim.'],
 ['Pourquoi papa rit-il sous le kiosque?', 'Il taquine Charlotte qui n’a pas regardé la météo.', 'Il a perdu son chapeau.', 'Il trouve la pluie froide.', 'Il a gagné un jeu.']],
v: [['Dans la BD, « détrempés » veut dire…', 'tout mouillés', 'tout secs', 'tout chauds', 'tout écrasés'],
 ['Dans la BD, « le tonnerre gronde » veut dire…', 'le tonnerre fait un grand bruit', 'le tonnerre se tait', 'il neige', 'le soleil brille']],
f: [['Pourquoi Charlotte trouve-t-elle quand même que c’est le plus beau pique-nique?', 'La pluie et l’arc-en-ciel l’ont rendu spécial.', 'Il n’a pas plu.', 'Elle a mangé seule.', 'Les sandwichs étaient mouillés.'],
 ['Qu’est-ce que Charlotte pourrait apprendre?', 'C’est utile de regarder la météo avant de sortir.', 'Il ne faut jamais pique-niquer.', 'Les kiosques sont dangereux.', 'Les raisins attirent la pluie.'],
 ['Comment est l’attitude de Charlotte à la fin?', 'Positive, elle voit le bon côté', 'Fâchée', 'Triste', 'Peureuse']],
o: [['Préfères-tu un pique-nique au soleil ou sous la pluie comme Charlotte? Explique pourquoi.', 'Un choix clair avec une raison (par exemple : sous la pluie, c’est une aventure; au soleil, on peut jouer dehors).']],
vf: [['Le pique-nique a lieu un samedi.', 1], ['Charlotte a regardé la météo.', 0], ['Un nuage noir approche.', 1], ['La famille rentre à la maison en courant.', 0],
 ['Papa rit sous le kiosque.', 1], ['Un arc-en-ciel apparaît.', 1], ['Charlotte apporte du jus d’orange.', 0], ['Le tonnerre gronde.', 1]],
nd: ['Charlotte a un frère qui s’appelle Noah.', 'Le parc a une grande piscine.', 'Maman a fait les sandwichs.'],
ev: ['Charlotte prépare un panier.', 'La famille s’installe au parc.', 'Un nuage noir approche.', 'Le tonnerre gronde.', 'Tout le monde court au kiosque.', 'Un arc-en-ciel apparaît.'],
res: ['Un orage surprend le pique-nique de Charlotte, mais la famille s’amuse quand même sous le kiosque.', 'Charlotte annule son pique-nique à cause de la pluie.', 'Papa oublie le panier à la maison.', 'Charlotte fait un pique-nique au bord de la mer.'] },
];
