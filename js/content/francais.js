// Petit Hibou — cours de français (PFEQ, français langue d'enseignement, 1er cycle, 2e année).
// Aucun import : tout le hasard passe par le helper `R` reçu par generate().

const FR = 'fr-CA';
const say = (text) => ({ text, lang: FR });

/* ------------------------------------------------------------------ */
/*  Banque de mots                                                     */
/*  texte | emoji | genre | syllabes | catégorie | sons | fautes       */
/* ------------------------------------------------------------------ */
const RAW = `
chat|🐱|m|chat|animal|ch|cha,chatt
chien|🐶|m|chien|animal|ch in|chiain,chein
lapin|🐰|m|la-pin|animal|in|lapain,lappin
cheval|🐴|m|che-val|animal|ch|cheveal,chéval
vache|🐮|f|va-che|animal|ch|vash,vach
cochon|🐷|m|co-chon|animal|ch on|cochont,cauchon
mouton|🐑|m|mou-ton|animal|ou on|mouthon,moutont
canard|🦆|m|ca-nard|animal|an|canar,kanard
loup|🐺|m|loup|animal|ou|lou,loux
ours|🐻|m|ours|animal|ou|oursse,ourss
lion|🦁|m|li-on|animal|on|liont,liom
tigre|🐯|m|ti-gre|animal||tygre,tighre
singe|🐵|m|sin-ge|animal|in|sinje,cinge
zèbre|🦓|m|zè-bre|animal|e|zébre,zaibre
éléphant|🐘|m|é-lé-phant|animal|e an|éléfant,élephan
girafe|🦒|f|gi-ra-fe|animal||jirafe,girrafe
souris|🐭|f|sou-ris|animal|ou|sourri,souriss
grenouille|🐸|f|gre-nouille|animal|ou|grenouile,grenouill
tortue|🐢|f|tor-tue|animal||tortu,tortuh
escargot|🐌|m|es-car-got|animal||escargo,escarcot
papillon|🦋|m|pa-pil-lon|animal|on|papilon,papillion
abeille|🐝|f|a-beil-le|animal||abeile,abaille
poisson|🐟|m|pois-son|animal|oi on|poiçon,poisso
oiseau|🐦|m|oi-seau|animal|oi eau|oizeau,oiso
lézard|🦎|m|lé-zard|animal|e|lésard,lézar
araignée|🕷️|f|a-rai-gnée|animal|gn e|aragnée,araigné
hibou|🦉|m|hi-bou|animal|ou|hibout,ibou
requin|🦈|m|re-quin|animal|in|requain,rekin
baleine|🐳|f|ba-lei-ne|animal||balène,baleinne
dauphin|🐬|m|dau-phin|animal|eau in|dophin,dauphain
crocodile|🐊|m|cro-co-dile|animal||crocodil,crocodille
serpent|🐍|m|ser-pent|animal|an|serpan,cerpent
coq|🐓|m|coq|animal||coc,cok
renard|🦊|m|re-nard|animal||renar,renare
hérisson|🦔|m|hé-ris-son|animal|e on|hérison,hérissont
kangourou|🦘|m|kan-gou-rou|animal|an ou|kanguerou,cangourou
fourmi|🐜|f|four-mi|animal|ou|fourmie,fourmy
coccinelle|🐞|f|coc-ci-nel-le|animal||cocinelle,coxinelle
dinosaure|🦕|m|di-no-sau-re|animal|eau|dinausore,dinosore
pomme|🍎|f|pom-me|fruit||pome,pomm
banane|🍌|f|ba-na-ne|fruit||banan,bananne
fraise|🍓|f|frai-se|fruit||frèse,fraize
cerise|🍒|f|ce-ri-se|fruit||serise,cerize
citron|🍋|m|ci-tron|fruit|on|sitron,citront
orange|🍊|f|o-ran-ge|fruit|an|oranje,orrange
poire|🍐|f|poi-re|fruit|oi|poir,poare
raisin|🍇|m|rai-sin|fruit|in|raisain,rèsin
melon|🍈|m|me-lon|fruit|on|melont,mellon
pêche|🍑|f|pê-che|fruit|ch|pèche,paiche
ananas|🍍|m|a-na-nas|fruit||ananat,annanas
kiwi|🥝|m|ki-wi|fruit||kiwie,quiwi
carotte|🥕|f|ca-rot-te|legume||carote,carrotte
tomate|🍅|f|to-ma-te|legume||tomatte,thomate
maïs|🌽|m|ma-ïs|legume||maiss,maiz
brocoli|🥦|m|bro-co-li|legume||brocolie,brocoly
patate|🥔|f|pa-ta-te|legume||patatte,patat
oignon|🧅|m|oi-gnon|legume|gn on|oignion,oinon
champignon|🍄|m|cham-pi-gnon|legume|ch an gn on|champignion,champinion
aubergine|🍆|f|au-ber-gi-ne|legume|eau|obergine,aubèrgine
poivron|🫑|m|poi-vron|legume|oi on|poiveron,poivront
concombre|🥒|m|con-com-bre|legume|on|concombe,conconbre
salade|🥬|f|sa-la-de|legume||saladde,sallade
pain|🍞|m|pain|food|in|pein,painn
fromage|🧀|m|fro-ma-ge|food||fromaje,froumage
lait|🥛|m|lait|food||laict,laitt
gâteau|🎂|m|gâ-teau|food|eau|gâtau,gâteo
biscuit|🍪|m|bis-cuit|food||biscuis,biscui
bonbon|🍬|m|bon-bon|food|on|bonbont,bombon
crêpe|🥞|f|crê-pe|food||crepe,crêppe
pizza|🍕|f|piz-za|food||pitza,pizzah
miel|🍯|m|miel|food||myel,mièl
beurre|🧈|m|beurre|food||beure,beurr
chocolat|🍫|m|cho-co-lat|food|ch|chocola,shocolat
jus|🧃|m|jus|food||juss,ju
manteau|🧥|m|man-teau|vet|an eau|mantau,manto
bas|🧦|m|bas|vet||ba,bass
gant|🧤|m|gant|vet|an|gan,gend
écharpe|🧣|f|é-char-pe|vet|e ch|écharp,éscharpe
robe|👗|f|ro-be|vet||rob,robbe
pantalon|👖|m|pan-ta-lon|vet|an on|pentalon,pantalont
casquette|🧢|f|cas-quet-te|vet||casket,casquete
chapeau|🎩|m|cha-peau|vet|ch eau|chapo,chapau
parapluie|☂️|m|pa-ra-pluie|vet||parapluis,parapuie
auto|🚗|f|au-to|trans|eau|otto,autto
autobus|🚌|m|au-to-bus|trans|eau|otobus,autobuss
train|🚆|m|train|trans|in|trin,trein
avion|✈️|m|a-vi-on|trans|on|avionn,avian
bateau|⛵|m|ba-teau|trans|eau|bato,batau
vélo|🚲|m|vé-lo|trans|e|vélau,véllo
camion|🚚|m|ca-mi-on|trans|on|camionn,camyon
tracteur|🚜|m|trac-teur|trans||tracteure,tracter
fusée|🚀|f|fu-sée|trans|e|fuzée,fusé
hélicoptère|🚁|m|hé-li-cop-tè-re|trans|e|hélicoptaire,élicoptère
ambulance|🚑|f|am-bu-lan-ce|trans|an|ambulence,ambulanse
taxi|🚕|m|ta-xi|trans||taksi,tacksi
livre|📕|m|li-vre|ecole||livr,lyvre
crayon|✏️|m|cra-yon|ecole|on|crayont,craillon
règle|📏|f|rè-gle|ecole|e|raigle,regle
cloche|🔔|f|clo-che|ecole|ch|cloch,clôche
ordinateur|💻|m|or-di-na-teur|ecole||ordinateure,ordinatteur
stylo|🖊️|m|sty-lo|ecole||stilo,stylau
école|🏫|f|é-co-le|ecole|e|écol,ékole
dé|🎲|m|dé|ecole|e|dée,dè
tambour|🥁|m|tam-bour|musique|an ou|tanbour,tambor
guitare|🎸|f|gui-ta-re|musique||guitar,guitarre
piano|🎹|m|pia-no|musique||pianno,piyano
ballon|⚽|m|bal-lon|jeu|on|balon,ballont
hockey|🏒|m|ho-ckey|jeu||hokey,hockei
patin|⛸️|m|pa-tin|jeu|in|patain,pattin
luge|🛷|f|lu-ge|jeu||luje,lugue
ski|🎿|m|ski|jeu||squi,skie
cadeau|🎁|m|ca-deau|objet|eau|cado,cadau
bague|💍|f|ba-gue|objet||bage,bagg
couronne|👑|f|cou-ron-ne|objet|ou|courone,cauronne
fantôme|👻|m|fan-tô-me|fantaisie|an|fantome,fantaume
robot|🤖|m|ro-bot|fantaisie||robo,robeau
dragon|🐉|m|dra-gon|fantaisie|on|dragont,dragan
licorne|🦄|f|li-cor-ne|fantaisie||licorn,likorne
fée|🧚|f|fée|fantaisie|e|fé,feé
maison|🏠|f|mai-son|maison|on|maizon,maisson
château|🏰|m|châ-teau|maison|ch eau|châtau,chatô
tente|⛺|f|ten-te|maison|an|tent,tenthe
porte|🚪|f|por-te|maison||port,portte
lit|🛏️|m|lit|maison||lite,litt
chaise|🪑|f|chai-se|maison|ch|chèse,chaize
clé|🔑|f|clé|maison|e|clée,cler
ampoule|💡|f|am-pou-le|maison|an ou|anpoule,ampoul
télévision|📺|f|té-lé-vi-si-on|maison|e on|télévizion,télévisson
téléphone|📞|m|té-lé-pho-ne|maison|e|téléfone,télephone
douche|🚿|f|dou-che|maison|ou ch|douch,dousche
savon|🧼|m|sa-von|maison|on|savont,savan
main|✋|f|main|corps|in|min,mainn
nez|👃|m|nez|corps||nès,néz
bouche|👄|f|bou-che|corps|ou ch|bouch,bousche
oreille|👂|f|o-reil-le|corps||oreile,orèye
dent|🦷|f|dent|corps|an|dan,dend
langue|👅|f|lan-gue|corps|an|lange,lanque
pied|🦶|m|pied|corps||pié,piet
os|🦴|m|os|corps||oss,ot
cerveau|🧠|m|cer-veau|corps|eau|cervo,cervau
soleil|☀️|m|so-leil|nature||soleille,solèy
lune|🌙|f|lu-ne|nature||lun,lunne
étoile|⭐|f|é-toi-le|nature|e oi|étoal,étoille
nuage|☁️|m|nua-ge|nature||nuaje,nuagge
arbre|🌳|m|ar-bre|nature||arbe,arbr
fleur|🌼|f|fleur|nature||fleure,fleurre
flocon|❄️|m|flo-con|nature|on|floquon,flocont
pluie|🌧️|f|pluie|nature||plui,pluit
montagne|⛰️|f|mon-ta-gne|nature|on gn|montagn,montane
volcan|🌋|m|vol-can|nature|an|volcant,volkan
île|🏝️|f|î-le|nature||ile,ille
vague|🌊|f|va-gue|nature||vag,vaque
cactus|🌵|m|cac-tus|nature||kactus,cactuss
feu|🔥|m|feu|nature||feut,feue
érable|🍁|m|é-ra-ble|nature|e|érabe,érrable
maman|👩|f|ma-man|famille|an|mamant,mamman
papa|👨|m|pa-pa|famille||pappa,papat
bébé|👶|m|bé-bé|famille|e|bébée,bebé
mamie|👵|f|ma-mie|famille||mammie,mamit
papi|👴|m|pa-pi|famille||pappi,papie
fille|👧|f|fil-le|famille||filie,fiile
garçon|👦|m|gar-çon|famille|on|garson,garçont
princesse|👸|f|prin-ces-se|famille|in|prinsesse,princese
castor|🦫|m|cas-tor|animal||castore,kastor
écureuil|🐿️|m|é-cu-reuil|animal|e|écureuille,écureil
mouche|🪰|f|mou-che|animal|ou ch|mouch,mousche
moustique|🦟|m|mous-tique|animal|ou|moustic,mousticque
perroquet|🦜|m|per-ro-quet|animal||peroquet,perrokè
cygne|🦢|m|cy-gne|animal|gn|cigne,cynge
pingouin|🐧|m|pin-gouin|animal|in|pinguoin,pingouain
chameau|🐪|m|cha-meau|animal|ch eau|chamo,chamau
rhinocéros|🦏|m|rhi-no-cé-ros|animal|e|rinocéros,rhinocéro
hippopotame|🦛|m|hip-po-po-ta-me|animal||hipopotame,hippopotam
gorille|🦍|m|go-ril-le|animal||gorile,gorrille
panda|🐼|m|pan-da|animal|an|pannda,penda
koala|🐨|m|ko-a-la|animal||coala,koalla
cerf|🦌|m|cerf|animal||cer,cerfe
chèvre|🐐|f|chè-vre|animal|e|chevre,chèvr
poule|🐔|f|pou-le|animal|ou|poul,poulle
poussin|🐤|m|pous-sin|animal|ou in|poucin,poussain
pieuvre|🐙|f|pieu-vre|animal||pieuve,pieuvr
crabe|🦀|m|cra-be|animal||crab,crabbe
homard|🦞|m|ho-mard|animal||omard,homar
crevette|🦐|f|cre-vet-te|animal||crevete,crevète
aigle|🦅|m|ai-gle|animal||aigl,aygle
colombe|🕊️|f|co-lom-be|animal|on|colonbe,collombe
rat|🐀|m|rat|animal||ra,rate
chenille|🐛|f|che-nil-le|animal|ch|chenile,chénille
raton|🦝|m|ra-ton|animal|on|ratont,rathon
mouffette|🦨|f|mouf-fet-te|animal|ou|moufette,mouffète
dindon|🦃|m|din-don|animal|in on|dindont,daindon
lama|🦙|m|la-ma|animal||lamma,llama
hamster|🐹|m|ham-ster|animal||amster,hamstère
léopard|🐆|m|lé-o-pard|animal|e|léopar,léopare
grillon|🦗|m|gril-lon|animal|on|grilon,grillont
scorpion|🦂|m|scor-pi-on|animal|on|scorpiont,skorpion
tyrannosaure|🦖|m|ty-ran-no-sau-re|animal|an eau|tyranosaure,tiranosaure
bleuet|🫐|m|bleu-et|fruit||bleuè,bleuaie
pastèque|🍉|f|pas-tè-que|fruit|e|pasteque,pastèk
mangue|🥭|f|man-gue|fruit|an|mange,mangu
piment|🌶️|m|pi-ment|legume|an|piman,pimant
soupe|🍲|f|sou-pe|food|ou|soup,soupp
sandwich|🥪|m|sand-wich|food||sandwitch,sandouiche
hamburger|🍔|m|ham-bur-ger|food||amburger,hamburguer
frite|🍟|f|fri-te|food||frit,fritte
œuf|🥚|m|œuf|food||euf,heuf
riz|🍚|m|riz|food||ryz,riss
spaghetti|🍝|m|spa-ghet-ti|food||spagetti,spaguetti
croissant|🥐|m|crois-sant|food|oi an|croissan,croisant
baguette|🥖|f|ba-guet-te|food||baguète,baguete
beigne|🍩|m|beigne|food|gn|beine,beignne
sucette|🍭|f|su-cet-te|food||sucète,sucete
tarte|🥧|f|tar-te|food||tart,tarthe
bacon|🥓|m|ba-con|food|on|bacone,baccon
viande|🍖|f|vian-de|food|an|viand,vyande
poulet|🍗|m|pou-let|food|ou|poulai,poulè
thé|🍵|m|thé|food|e|thée,thè
café|☕|m|ca-fé|food|e|caffé,cafè
sel|🧂|m|sel|food||cel,sèl
gaufre|🧇|f|gau-fre|food|eau|gofre,gaufr
arachide|🥜|f|a-ra-chi-de|food|ch|arachid,arrachide
avocat|🥑|m|a-vo-cat|food||avocas,avokat
botte|🥾|f|bot-te|vet||bote,bott
sandale|👡|f|san-da-le|vet|an|sandal,sandalle
chandail|👕|m|chan-dail|vet|ch an|chandaille,chendail
chaussure|👟|f|chaus-su-re|vet|ch eau|chosure,chaussur
moto|🏍️|f|mo-to|trans||motto,mauto
métro|🚇|m|mé-tro|trans|e|méthro,métrau
trottinette|🛴|f|trot-ti-net-te|trans||trotinette,trottinete
navire|🚢|m|na-vi-re|trans||navir,navyre
canot|🛶|m|ca-not|trans||canau,canoh
wagon|🚃|m|wa-gon|trans|on|vagon,wagont
sac|🎒|m|sac|ecole||sacque,saque
cahier|📓|m|ca-hier|ecole||cayer,cahié
carte|🗺️|f|car-te|ecole||cart,carthe
calendrier|📅|m|ca-len-drier|ecole|an|calandrier,calendrié
enveloppe|✉️|f|en-ve-lop-pe|ecole|an|anveloppe,envelope
journal|📰|m|jour-nal|ecole|ou|jurnal,journale
télescope|🔭|m|té-les-co-pe|ecole|e|téléscope,télescop
microscope|🔬|m|mi-cros-co-pe|ecole||microscop,microscôpe
clavier|⌨️|m|cla-vier|ecole||clavié,claviet
imprimante|🖨️|f|im-pri-man-te|ecole|in an|inprimante,imprimant
dictionnaire|📖|m|dic-tion-nai-re|ecole|on|dictionaire,dictionnère
papier|📄|m|pa-pier|ecole||papié,papiér
étiquette|🏷️|f|é-ti-quet-te|ecole|e|étiquete,éthiquette
trompette|🎺|f|trom-pet-te|musique|on|trompète,trompete
violon|🎻|m|vio-lon|musique|on|violont,viollon
saxophone|🎷|m|sa-xo-pho-ne|musique||saxofone,saksophone
radio|📻|f|ra-dio|musique||radiau,radyo
casque|🎧|m|casque|musique||cask,kasque
micro|🎤|m|mi-cro|musique||mikro,micrau
cible|🎯|f|ci-ble|jeu||sible,cibl
manège|🎠|m|ma-nè-ge|jeu|e|manege,manaige
cirque|🎪|m|cir-que|jeu||cirk,sirque
clown|🤡|m|clown|jeu|ou|cloune,clonne
golf|⛳|m|golf|jeu||gol,golff
boxe|🥊|f|bo-xe|jeu||boks,bocse
danse|💃|f|dan-se|jeu|an|dence,danze
football|🏈|m|foot-ball|jeu|ou|fotbal,footbal
basketball|🏀|m|bas-ket-ball|jeu||basketbal,baskettball
tennis|🎾|m|ten-nis|jeu||tenis,tennys
quille|🎳|f|quil-le|jeu||quile,kille
montre|⌚|f|mon-tre|objet|on|monthe,montr
valise|🧳|f|va-li-se|objet||valize,vallise
boussole|🧭|f|bous-so-le|objet|ou|bousole,boussol
marteau|🔨|m|mar-teau|objet|eau|martau,marto
bougie|🕯️|f|bou-gie|objet|ou|bougi,bouji
pinceau|🖌️|m|pin-ceau|objet|in eau|pinsau,pincau
palette|🎨|f|pa-let-te|objet||palète,palete
caméra|🎥|f|ca-mé-ra|objet|e|camera,kaméra
pile|🔋|f|pi-le|objet||pil,pyle
aimant|🧲|m|ai-mant|objet|an|emant,aimen
diamant|💎|m|dia-mant|objet|an|diaman,diamand
ruban|🎀|m|ru-ban|objet|an|rubant,rubanne
médaille|🏅|f|mé-dail-le|objet|e|médaile,médaye
trophée|🏆|m|tro-phée|objet|e|trofée,trophé
satellite|🛰️|m|sa-tel-li-te|objet||satélite,satellit
ancre|⚓|f|an-cre|objet|an|ankre,ancr
lanterne|🏮|f|lan-ter-ne|objet|an|lenterne,lantern
panier|🧺|m|pa-nier|maison||panié,pagnier
poubelle|🗑️|f|pou-bel-le|maison|ou|poubele,poubèle
fenêtre|🪟|f|fe-nê-tre|maison||fenètre,fenaitre
balai|🧹|m|ba-lai|maison|e|balè,balay
canapé|🛋️|m|ca-na-pé|maison|e|canapée,canappé
baignoire|🛁|f|bai-gnoi-re|maison|gn oi|bainoire,baignoir
toilette|🚽|f|toi-let-te|maison|oi|toilete,toilète
horloge|🕰️|f|hor-lo-ge|maison||orloge,horloje
cuillère|🥄|f|cuil-lè-re|maison|e|cuilère,cuillaire
bol|🥣|m|bol|maison||bolle,bolt
biberon|🍼|m|bi-be-ron|maison|on|bibron,biberont
hôpital|🏥|m|hô-pi-tal|lieu||hopital,opital
banque|🏦|f|ban-que|lieu|an|bank,banqe
dépanneur|🏪|m|dé-pan-neur|lieu|e an|dépaneur,dépanneure
église|⛪|f|é-gli-se|lieu|e|eglise,églize
pont|🌉|m|pont|lieu|on|pon,pomt
stade|🏟️|m|sta-de|lieu||stad,stadde
usine|🏭|f|u-si-ne|lieu||usin,uzine
hôtel|🏨|m|hô-tel|lieu||hotel,otel
désert|🏜️|m|dé-sert|nature|e|dézert,desert
orage|⛈️|m|o-ra-ge|nature||orrage,oraje
glaçon|🧊|m|gla-çon|nature|on|glason,glaçont
tornade|🌪️|f|tor-na-de|nature||tornad,tornnade
planète|🪐|f|pla-nè-te|nature|e|planette,planaite
terre|🌍|f|ter-re|nature||tère,terr
comète|☄️|f|co-mè-te|nature|e|comette,comaite
feuille|🍂|f|feuil-le|nature||feuile,feuye
herbe|🌿|f|her-be|nature||erbe,herb
coquillage|🐚|m|co-quil-la-ge|nature||cokillage,coquilage
goutte|💧|f|gout-te|nature|ou|goute,gouthe
brouillard|🌫️|m|brouil-lard|nature|ou|brouillar,broullard
bras|💪|m|bras|corps||bra,brat
jambe|🦵|f|jam-be|corps|an|janbe,jamb
cœur|❤️|m|cœur|corps||keur,cœure
doigt|☝️|m|doigt|corps|oi|doig,doigth
pouce|👍|m|pou-ce|corps|ou|pous,pouse
pompier|🧑‍🚒|m|pom-pier|metier|on|ponpier,pompié
policier|👮|m|po-li-cier|metier||polisier,policié
médecin|🧑‍⚕️|m|mé-de-cin|metier|e in|médecain,médesin
cuisinier|🧑‍🍳|m|cui-si-nier|metier||cuisinié,cuizinier
pilote|🧑‍✈️|m|pi-lo-te|metier||pilot,pillote
astronaute|🧑‍🚀|m|as-tro-nau-te|metier|eau|astronote,astronaut
fermier|🧑‍🌾|m|fer-mier|metier||fermié,fermmier
artiste|🧑‍🎨|m|ar-tis-te|metier||artist,artisste
enseignante|🧑‍🏫|f|en-sei-gnan-te|metier|an gn|ensegnante,enseignent
sirène|🧜|f|si-rè-ne|fantaisie|e|sirenne,cirène
sorcière|🧙|f|sor-cière|fantaisie|e|sorsière,sorcièr
monstre|👾|m|mons-tre|fantaisie|on|monstr,monstrre
ange|👼|m|an-ge|fantaisie|an|anje,angue
génie|🧞|m|gé-nie|fantaisie|e|jénie,génit
pirate|🏴‍☠️|m|pi-ra-te|fantaisie||pirat,pirrate
enfant|🧒|m|en-fant|famille|an|enfan,anfant
éclair|⚡|m|é-clair|nature|e|éclaire,éclère
bouquet|💐|m|bou-quet|nature|ou|bouquè,boukè
tulipe|🌷|f|tu-li-pe|nature||tulip,tullipe
trèfle|🍀|m|trè-fle|nature|e|trèfl,trefle
sapin|🎄|m|sa-pin|nature|in|sapain,sappin
sablier|⏳|m|sa-blier|objet||sablié,sabblier
phoque|🦭|m|phoque|animal||phock,phoc
bison|🦬|m|bi-son|animal|on|bizon,bisont
loutre|🦦|f|lou-tre|animal|ou|loutr,loutrre
miroir|🪞|m|mi-roir|maison|oi|mirois,miroire
échelle|🪜|f|é-chel-le|maison|e ch|éshelle,échèle
ascenseur|🛗|m|as-cen-seur|lieu||ascenceur,acenseur
`;

export const wordBank = RAW.trim()
  .split('\n')
  .map((line) => {
    const [text, emoji, g, syl, cat, snd, bad] = line.split('|');
    return {
      text,
      emoji,
      g,
      syl: syl.split('-'),
      cat,
      snd: snd ? snd.split(' ') : [],
      bad: bad ? bad.split(',') : [],
    };
  });
const W = wordBank;

/* ---------------- listes pour l'orthographe (f3) ---------------- */
const extra = (arr, mapper) => arr.map((l) => mapper(l.split('|')));
const F3_COLORS = extra(
  [
    'rouge|🔴|rouje,rougue',
    'bleu|🔵|bleuh,blue',
    'vert|🟢|verd,vèr',
    'jaune|🟡|jône,jaunne',
    'violet|🟣|viollet,violè',
    'noir|⚫|noar,nouar',
    'blanc|⚪|blan,blant',
    'brun|🟤|brein,brunn',
  ],
  ([text, emoji, bad]) => ({ text, emoji, bad: bad.split(',') }),
);
const F3_NUMS = extra(
  [
    '1|un|ein,hun',
    '2|deux|deu,deus',
    '3|trois|troi,troa',
    '4|quatre|catre,quatr',
    '5|cinq|cinc,sinq',
    '6|six|sis,sic',
    '7|sept|sepp,cept',
    '8|huit|uit,huite',
    '9|neuf|neuff,neuph',
    '10|dix|dics,dixx',
    '11|onze|onse,honze',
    '12|douze|douse,douz',
    '13|treize|trèze,treise',
    '14|quatorze|catorze,quatorse',
    '15|quinze|quinse,kinze',
    '16|seize|sèze,seise',
    '17|dix-sept|dix-set,dix-cept',
    '18|dix-huit|dix-uit,dis-huit',
    '19|dix-neuf|dix-neuff,dis-neuf',
    '20|vingt|vaint,vinq',
  ],
  ([digit, text, bad]) => ({ text, digit, bad: bad.split(',') }),
);
const F3_DAYS = extra(
  [
    'lundi|lundie,landi',
    'mardi|mardy,mardie',
    'mercredi|mercrédi,mercredie',
    'jeudi|jeudie,jeudy',
    'vendredi|vandredi,vendredie',
    'samedi|samdi,samedie',
    'dimanche|dimanch,dimenche',
  ],
  ([text, bad]) => ({ text, bad: bad.split(',') }),
);
const F3_TOOLS = extra(
  [
    'avec|avek,avecq',
    'dans|dan,dens',
    'pour|pur,pourr',
    'sur|surr,syr',
    'aussi|ausi,osi',
    'beaucoup|beaucou,bocoup',
    'toujours|toujour,toujous',
    'maintenant|maintenan,mintenant',
    'jamais|jamè,jammais',
    'mais|mèe,maiss',
    'très|trè,tres',
    'quand|quan,cand',
    'comme|com,comm',
    'ici|issi,icit',
    'chez|chè,chaiz',
    'encore|encor,ancore',
    'souvent|souvan,souvend',
    'ensemble|ansemble,ensenble',
  ],
  ([text, bad]) => ({ text, bad: bad.split(',') }),
);
const F3_POOL = [
  ...W.map((w) => ({ text: w.text, emoji: w.emoji, bad: w.bad })),
  ...F3_COLORS,
  ...F3_NUMS,
  ...F3_DAYS,
  ...F3_TOOLS,
];

/* ---------------- petits outils ---------------- */
const byCat = (c) => W.filter((w) => w.cat === c);
// Groupes de mots dont les images se ressemblent ou dont le sens se chevauche :
// on ne les met jamais ensemble comme choix d'une même question image-mot.
const CONF = [
  ['oiseau', 'aigle', 'colombe', 'cygne', 'perroquet', 'poule', 'poussin', 'coq', 'canard', 'hibou', 'dindon', 'pingouin'],
  ['poisson', 'requin', 'dauphin', 'baleine', 'phoque'],
  ['souris', 'rat'], ['mouche', 'moustique'], ['ours', 'koala', 'panda'], ['singe', 'gorille'],
  ['auto', 'taxi', 'ambulance', 'camion'], ['bateau', 'navire', 'canot'], ['train', 'métro', 'wagon'],
  ['pain', 'baguette', 'croissant'], ['viande', 'poulet', 'bacon'], ['sucette', 'bonbon'], ['gâteau', 'tarte', 'beigne', 'biscuit'],
  ['livre', 'cahier', 'dictionnaire', 'journal'], ['ordinateur', 'clavier', 'imprimante', 'télévision'],
  ['montre', 'horloge'], ['médaille', 'trophée', 'couronne'], ['diamant', 'bague'], ['bougie', 'feu'], ['cadeau', 'ruban'],
  ['pinceau', 'palette', 'crayon', 'stylo'], ['lanterne', 'ampoule'],
  ['main', 'doigt', 'pouce', 'bras', 'gant'], ['jambe', 'pied'],
  ['baignoire', 'douche', 'toilette'], ['canapé', 'chaise', 'lit'], ['cuillère', 'bol'],
  ['enfant', 'garçon', 'fille', 'bébé', 'ange'], ['sorcière', 'fée'], ['cirque', 'clown'],
  ['ballon', 'football', 'basketball', 'tennis'],
  ['terre', 'planète', 'étoile'], ['orage', 'pluie', 'nuage', 'brouillard', 'éclair'], ['herbe', 'feuille', 'fleur', 'érable', 'arbre', 'tulipe', 'bouquet', 'trèfle', 'sapin'],
  ['hôpital', 'hôtel', 'banque', 'usine', 'dépanneur', 'église', 'stade', 'école', 'maison', 'château'],
  ['trompette', 'saxophone'], ['sac', 'valise'], ['soleil', 'étoile', 'lune'],
];
const CONF_OF = new Map();
CONF.forEach((g, i) => g.forEach((t) => CONF_OF.set(t, [...(CONF_OF.get(t) || []), i])));
const compat = (a, b) => !(CONF_OF.get(a.text) || []).some((i) => (CONF_OF.get(b.text) || []).includes(i));
const H_MUET = new Set(['hélicoptère', 'hôpital', 'hôtel', 'horloge', 'herbe', 'hippopotame']);
const isElided = (w) => /^[aeiouéèêâîôûœ]/i.test(w.text) || H_MUET.has(w.text);
const unOf = (w) => (w.g === 'm' ? 'un' : 'une');
const leOf = (w) => (w.g === 'm' ? 'le' : 'la');
const withLe = (w) => (isElided(w) ? `l'${w.text}` : `${leOf(w)} ${w.text}`);
// Mots qu'on ne compte pas bien (pas de « des laits » pour un enfant de 7 ans).
const MASS = new Set(['lait', 'miel', 'beurre', 'jus', 'riz', 'sel', 'bacon', 'viande', 'herbe', 'brouillard', 'papier', 'thé', 'café', 'sandwich', 'feu']);
const pluralOk = (w) => !/[sxz]$/.test(w.text) && !MASS.has(w.text);
const pluralOf = (t) => {
  if (t === 'hibou') return 'hiboux';
  if (t === 'feu') return 'feux';
  if (/eau$/.test(t)) return t + 'x';
  if (/al$/.test(t)) return t.slice(0, -2) + 'aux';
  return t + 's';
};
const opt = (w) => ({ emoji: w.emoji, say: say(w.text) });
const uniq = (arr) => [...new Set(arr)];
const sortedKey = (arr) => arr.slice().sort().join('|');

function mkChoice(R, key, prompt, correct, wrongs, extraProps = {}) {
  const opts = R.shuffle([correct, ...wrongs]);
  return { type: 'choice', key, prompt, ...extraProps, options: opts, answer: opts.indexOf(correct) };
}
function mkSort(R, key, prompt, bins, groups, extraProps = {}) {
  // groups[i] = list of items belonging to bin i
  const items = [];
  groups.forEach((g, i) => g.forEach((it) => items.push({ ...it, bin: i })));
  return { type: 'sort', key, prompt, ...extraProps, bins, items: R.shuffle(items) };
}
const run = (table) => (level, R) => R.pick(table[level])(R);

/* ================================================================== */
/*  f1 — Les sons                                                      */
/* ================================================================== */
const SOUNDS = [
  { id: 'ou', label: 'ou', say: 'ou', pats: ['ou'], gr: ['ou'], fam: 'v' },
  { id: 'on', label: 'on', say: 'on', pats: ['on', 'om'], gr: ['on'], fam: 'n' },
  { id: 'an', label: 'an / en', say: 'an', pats: ['an', 'en', 'am', 'em'], gr: ['an', 'en', 'am', 'em'], fam: 'n' },
  { id: 'in', label: 'in / ain', say: 'in', pats: ['in', 'ain', 'ein', 'im'], rx: /ien/, gr: ['ain', 'ein', 'in'], fam: 'n' },
  { id: 'oi', label: 'oi', say: 'oi', pats: ['oi'], gr: ['oi'], fam: 'v' },
  { id: 'eau', label: 'eau / au', say: 'o', pats: ['eau', 'au'], rx: /ô|(o|ot|os)$/, gr: ['eau', 'au'], fam: 'v' },
  { id: 'ch', label: 'ch', say: 'che', pats: ['ch'], gr: ['ch'], fam: 'c' },
  { id: 'gn', label: 'gn', say: 'gné', pats: ['gn'], gr: ['gn'], fam: 'c' },
  { id: 'e', label: 'é / è', say: 'é', pats: ['é', 'è', 'ê', 'ai', 'ei'], rx: /(er|ez|et|ed)$|e(rr|ll|tt|ss|rt|rb|rf|rm|rc|l$|s$)/, gr: ['é', 'è'], fam: 'v' },
];
const FAM = { n: ['on', 'an', 'in'], v: ['ou', 'oi', 'eau', 'e'], c: ['ch', 'gn'] };
const hasS = (w, s) => w.snd.includes(s.id);
const hitS = (w, s) => s.pats.some((p) => w.text.includes(p)) || (s.rx ? s.rx.test(w.text) : false);
const lackS = (w, s) => !hasS(w, s) && !hitS(w, s);
const W1 = W.filter((w) => w.snd.length);

function f1Listen(R, n) {
  const w = R.pick(W1);
  const wrong = R.sample(
    W.filter((x) => x.emoji !== w.emoji && compat(w, x) && !x.snd.some((t) => w.snd.includes(t))),
    n - 1,
  );
  return mkChoice(R, `f1-a-${w.text}`, 'Écoute le mot. Touche la bonne image.', opt(w), wrong.map(opt), {
    say: say(w.text),
    cols: n === 3 ? 3 : 2,
  });
}
function f1Contains(R, n, withEmoji, fam) {
  const s = R.pick(SOUNDS);
  const w = R.pick(W.filter((x) => hasS(x, s)));
  let pool = W.filter((x) => lackS(x, s));
  if (fam) {
    const f = pool.filter((x) => x.snd.some((t) => t !== s.id && FAM[s.fam].includes(t)));
    if (f.length >= n - 1) pool = f;
  }
  const o = (x) => ({ text: x.text, ...(withEmoji ? { emoji: x.emoji } : {}), say: say(x.text) });
  return mkChoice(R, `f1-b-${s.id}-${w.text}`, `Touche le mot où tu entends le son « ${s.label} ».`, o(w), R.sample(pool, n - 1).map(o), {
    say: say(`Touche le mot où tu entends le son ${s.say}.`),
    stimulus: { text: s.label },
    cols: n === 3 ? 3 : 2,
  });
}
function f1Sort(R, nb, counts, withEmoji) {
  let ss = null;
  let cands = null;
  for (let t = 0; t < 80 && !ss; t++) {
    const pick = R.sample(SOUNDS, nb);
    const c = pick.map((s) =>
      W.filter((w) => hasS(w, s) && pick.every((o) => o === s || (!hasS(w, o) && !hitS(w, o)))),
    );
    if (c.every((arr, i) => arr.length >= counts[i])) {
      ss = pick;
      cands = c;
    }
  }
  if (!ss) {
    ss = [SOUNDS[0], SOUNDS[6]];
    cands = ss.map((s) => W.filter((w) => hasS(w, s) && ss.every((o) => o === s || (!hasS(w, o) && !hitS(w, o)))));
  }
  const groups = ss.map((s, i) =>
    R.sample(cands[i], counts[i] || 2).map((w) => ({
      text: w.text,
      ...(withEmoji ? { emoji: w.emoji } : {}),
      say: say(w.text),
    })),
  );
  const names = groups.flat().map((x) => x.text);
  return mkSort(
    R,
    `f1-c-${ss.map((s) => s.id).join('+')}-${sortedKey(names)}`,
    'Classe chaque mot selon le son que tu entends.',
    ss.map((s) => ({ text: s.label })),
    groups,
    { say: say('Classe chaque mot selon le son que tu entends.') },
  );
}
function f1Fill(R, restrictFam) {
  for (let t = 0; t < 50; t++) {
    const w = R.pick(W1);
    const sid = R.pick(w.snd);
    const s = SOUNDS.find((x) => x.id === sid);
    const g = s.gr.find((x) => w.text.includes(x));
    if (!g) continue;
    const blanked = w.text.replace(g, '__');
    const wrongs = R.sample(
      SOUNDS.filter((x) => x.id !== s.id && (!restrictFam || FAM[s.fam].includes(x.id))).map((x) => x.gr[0]),
      3,
    );
    if (wrongs.length < 3) continue;
    return mkChoice(
      R,
      `f1-d-${w.text}-${g}`,
      `Complète le mot : ${blanked}`,
      { text: g },
      wrongs.map((x) => ({ text: x })),
      { say: say(w.text), stimulus: { emoji: w.emoji }, cols: 2 },
    );
  }
  return f1Listen(R, 3);
}
const f1 = {
  id: 'f1',
  icon: '🔤',
  title: { fr: 'Les sons', en: 'Sounds' },
  pfeq: 'Lecture / écriture — correspondances lettres-sons (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [(R) => f1Listen(R, 3), (R) => f1Contains(R, 3, true, false), (R) => f1Sort(R, 2, [2, 2], true)],
    2: [
      (R) => f1Listen(R, 4),
      (R) => f1Contains(R, 4, false, false),
      (R) => f1Sort(R, 2, [3, 3], false),
      (R) => f1Fill(R, false),
    ],
    3: [
      (R) => f1Contains(R, 4, false, true),
      (R) => f1Contains(R, 4, false, true),
      (R) => f1Sort(R, 3, R.shuffle([2, 3, 3]), false),
      (R) => f1Fill(R, true),
    ],
  }),
};

/* ================================================================== */
/*  f2 — Les syllabes                                                  */
/* ================================================================== */
// On exclut les mots dont le décompte oral est discutable (e muet final, -ion, ia, ui).
const ambiguousSyl = (t) => /[^é]e$/.test(t) || /(ion|ia|ui|io|ouin)/.test(t);
const W2 = W.filter((w) => !ambiguousSyl(w.text));
const W2build = W2.filter((w) => w.syl.length >= 2 && w.syl.length <= 4 && uniq(w.syl).length === w.syl.length);
const ALLSYL = uniq(W2.flatMap((w) => w.syl));

function f2Build(R, lo, hi, nExtra, withEmoji) {
  const w = R.pick(W2build.filter((x) => x.syl.length >= lo && x.syl.length <= hi));
  const q = {
    type: 'order',
    key: `f2-b-${w.text}`,
    prompt: 'Écoute le mot. Remets les syllabes dans l’ordre.',
    say: say(w.text),
    tiles: w.syl.slice(),
    joiner: '',
  };
  if (withEmoji) q.stimulus = { emoji: w.emoji };
  if (nExtra) q.extra = R.sample(ALLSYL.filter((s) => !w.syl.includes(s)), nExtra);
  return q;
}
function f2Count(R, maxN) {
  const w = R.pick(W2.filter((x) => x.syl.length <= maxN));
  const labels = ['1', '2', '3', '4'].slice(0, maxN);
  return {
    type: 'choice',
    key: `f2-n-${w.text}`,
    prompt: `Combien de syllabes entends-tu dans « ${w.text} »?`,
    say: say(w.text),
    stimulus: { emoji: w.emoji },
    options: labels.map((t) => ({ text: t })),
    answer: w.syl.length - 1,
    fixedOrder: true,
    cols: labels.length,
  };
}
function f2Which(R, nums) {
  const N = R.pick(nums);
  const w = R.pick(W2.filter((x) => x.syl.length === N));
  const wrong = R.sample(W2.filter((x) => x.syl.length !== N && x.syl.length <= 4), 3);
  const o = (x) => ({ text: x.text, emoji: x.emoji, say: say(x.text) });
  return mkChoice(R, `f2-w-${N}-${w.text}`, `Touche le mot qui a ${N} syllabe${N > 1 ? 's' : ''}.`, o(w), wrong.map(o), {
    say: say(`Touche le mot qui a ${N} syllabe${N > 1 ? 's' : ''}.`),
    cols: 2,
  });
}
const f2 = {
  id: 'f2',
  icon: '👏',
  title: { fr: 'Les syllabes', en: 'Syllables' },
  pfeq: 'Lecture / écriture — découpage en syllabes, assemblage de mots (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [(R) => f2Build(R, 2, 2, 0, true), (R) => f2Count(R, 3)],
    2: [(R) => f2Build(R, 2, 3, 0, true), (R) => f2Count(R, 4), (R) => f2Which(R, [1, 2, 3])],
    3: [(R) => f2Build(R, 2, 3, 2, false), (R) => f2Build(R, 3, 4, 2, false), (R) => f2Count(R, 4), (R) => f2Which(R, [2, 3])],
  }),
};

/* ================================================================== */
/*  f3 — Mes mots (orthographe)                                        */
/* ================================================================== */
const lenOk = {
  1: (t) => t.length <= 5,
  2: (t) => t.length >= 5 && t.length <= 8,
  3: (t) => t.length >= 6,
};
const LETTERS_ONLY = /^[a-zàâçéèêëîïôûùüœ]+$/;
const ALPHA = 'abcdefghijlmnoprstuvxyz'.split('');

function f3Spell(R, level) {
  const w = R.pick(F3_POOL.filter((x) => lenOk[level](x.text)));
  const q = mkChoice(
    R,
    `f3-s-${w.text}`,
    'Écoute le mot. Touche la bonne façon de l’écrire.',
    { text: w.text },
    w.bad.slice(0, 2).map((t) => ({ text: t })),
    { say: say(w.text) },
  );
  if (level === 1 && w.emoji) q.stimulus = { emoji: w.emoji };
  if (level === 1 && w.digit) q.stimulus = { text: w.digit };
  if (level === 2 && w.digit) q.stimulus = { text: w.digit };
  return q;
}
function f3Letters(R, level) {
  const range = level === 2 ? [4, 6] : [7, 10];
  const w = R.pick(F3_POOL.filter((x) => LETTERS_ONLY.test(x.text) && x.text.length >= range[0] && x.text.length <= range[1]));
  const q = {
    type: 'order',
    key: `f3-o-${w.text}`,
    prompt: 'Écoute le mot. Remets les lettres dans l’ordre.',
    say: say(w.text),
    tiles: Array.from(w.text),
    joiner: '',
  };
  if (level === 2 && w.emoji) q.stimulus = { emoji: w.emoji };
  if (level === 2 && w.digit) q.stimulus = { text: w.digit };
  if (level === 3) q.extra = R.sample(ALPHA.filter((c) => !w.text.includes(c)), 2);
  return q;
}
const f3 = {
  id: 'f3',
  icon: '✏️',
  title: { fr: 'Mes mots', en: 'My words' },
  pfeq: 'Écriture — orthographe lexicale, liste orthographique de 1re et 2e année (PFEQ 1er cycle)',
  generate: run({
    1: [(R) => f3Spell(R, 1)],
    2: [(R) => f3Spell(R, 2), (R) => f3Letters(R, 2)],
    3: [(R) => f3Spell(R, 3), (R) => f3Letters(R, 3)],
  }),
};

/* ================================================================== */
/*  f4 — Nom et déterminant                                            */
/* ================================================================== */
const NOT_NOUNS = [
  'courir', 'sauter', 'manger', 'dormir', 'chanter', 'jouer', 'rire', 'lire', 'danser', 'nager',
  'petit', 'grand', 'joli', 'gentil', 'content', 'doux', 'rapide', 'lent', 'heureux', 'beau',
];
const W_CONS = W.filter((w) => !isElided(w));
const W_VOW = W.filter((w) => isElided(w));

function f4UnUne(R, three) {
  const w = R.pick(W);
  const options = [{ text: 'un' }, { text: 'une' }];
  if (three) options.push({ text: 'des' });
  return {
    type: 'choice',
    key: `f4-${three ? 'u3' : 'u2'}-${w.text}`,
    prompt: three ? `Complète : ___ ${w.text}` : `Complète avec un ou une : ___ ${w.text}`,
    say: say(w.text),
    stimulus: { emoji: w.emoji },
    options,
    answer: w.g === 'm' ? 0 : 1,
    fixedOrder: true,
    cols: options.length,
  };
}
function f4LeLa(R, four) {
  const w = R.pick(W_CONS);
  const options = [{ text: 'le' }, { text: 'la' }];
  if (four) options.push({ text: 'les' }, { text: 'l’' });
  return {
    type: 'choice',
    key: `f4-${four ? 'l4' : 'l2'}-${w.text}`,
    prompt: four ? `Complète : ___ ${w.text}` : `Complète avec le ou la : ___ ${w.text}`,
    say: say(w.text),
    stimulus: { emoji: w.emoji },
    options,
    answer: w.g === 'm' ? 0 : 1,
    fixedOrder: true,
    cols: options.length === 4 ? 4 : 2,
  };
}
function f4Elide(R) {
  const w = R.pick(W_VOW);
  return mkChoice(
    R,
    `f4-e-${w.text}`,
    `Complète : ___ ${w.text}`,
    { text: 'l’' },
    [{ text: 'le' }, { text: 'la' }, { text: 'les' }],
    { say: say(w.text), stimulus: { emoji: w.emoji }, cols: 4 },
  );
}
function f4Plural(R) {
  const w = R.pick(W.filter((x) => pluralOk(x) && x.text !== 'eau'));
  const pl = pluralOf(w.text);
  return mkChoice(
    R,
    `f4-p-${w.text}`,
    `Il y en a plusieurs! Complète : ___ ${pl}`,
    { text: 'des' },
    [{ text: 'un' }, { text: 'une' }, { text: 'la' }],
    { say: say(pl), stimulus: { emojis: w.emoji, count: 3 }, cols: 4 },
  );
}
function f4SortNom(R, n) {
  const half = n / 2;
  const nouns = R.sample(W, half).map((w) => ({ text: w.text, say: say(w.text) }));
  const others = R.sample(NOT_NOUNS, n - half).map((t) => ({ text: t, say: say(t) }));
  return mkSort(
    R,
    `f4-s-${sortedKey([...nouns, ...others].map((x) => x.text))}`,
    'Trie les mots : est-ce un nom?',
    [
      { text: 'Un nom', emoji: '🏷️' },
      { text: 'Pas un nom', emoji: '🚫' },
    ],
    [nouns, others],
    { say: say('Trie les mots : est-ce un nom?') },
  );
}
const f4 = {
  id: 'f4',
  icon: '🏷️',
  title: { fr: 'Nom et déterminant', en: 'Nouns and determiners' },
  pfeq: 'Grammaire — le nom et le déterminant (un, une, le, la, l’, les, des) (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [(R) => f4UnUne(R, false), (R) => f4SortNom(R, 4)],
    2: [(R) => f4LeLa(R, false), (R) => f4UnUne(R, true), (R) => f4SortNom(R, 6)],
    3: [(R) => f4Plural(R), (R) => f4Elide(R), (R) => f4LeLa(R, true), (R) => f4SortNom(R, 8)],
  }),
};

/* ================================================================== */
/*  f5 — Genre et nombre                                               */
/* ================================================================== */
function f5Genre(R, n, withEmoji) {
  const nm = n === 4 ? 2 : n / 2 + R.int(-1, 1);
  const ms = R.sample(W.filter((w) => w.g === 'm'), nm);
  const fs = R.sample(W.filter((w) => w.g === 'f'), n - nm);
  const it = (w) => ({ text: w.text, ...(withEmoji ? { emoji: w.emoji } : {}), say: say(w.text) });
  return mkSort(
    R,
    `f5-g-${sortedKey([...ms, ...fs].map((w) => w.text))}`,
    'Trie les mots : masculin (un) ou féminin (une)?',
    [{ text: 'Masculin : un', emoji: '🟦' }, { text: 'Féminin : une', emoji: '🟥' }],
    [ms.map(it), fs.map(it)],
    { say: say('Trie les mots : masculin, un, ou féminin, une?') },
  );
}
function f5Plural(R, level) {
  const regular = (x) => pluralOk(x) && x.text !== 'eau' && !/(eau|al)$/.test(x.text) && x.text !== 'hibou' && x.text !== 'feu';
  const w = R.pick(W.filter((x) => pluralOk(x) && (level > 1 || regular(x))));
  const t = w.text;
  const pl = pluralOf(t);
  if (level < 3) {
    const sing = `${unOf(w)} ${t}`;
    const correct = `des ${pl}`;
    const cands = uniq([`des ${t}`, `des ${t}s`, `des ${t}x`, `des ${t}es`, `un ${pl}`, `une ${pl}`]).filter((x) => x !== correct);
    return mkChoice(R, `f5-p-${t}`, `Écris au pluriel : ${sing}`, { text: correct }, R.sample(cands, 3).map((x) => ({ text: x })), {
      say: say(sing),
      ...(level === 1 ? { stimulus: { emoji: w.emoji } } : {}),
    });
  }
  const sing = withLe(w);
  const correct = `les ${pl}`;
  const lePl = isElided(w) ? `l’${pl}` : `${leOf(w)} ${pl}`;
  const cands = uniq([`les ${t}`, lePl, `des ${t}`, `les ${t}x`, `un ${pl}`]).filter((x) => x !== correct);
  return mkChoice(R, `f5-l-${t}`, `Écris au pluriel : ${sing}`, { text: correct }, R.sample(cands, 3).map((x) => ({ text: x })), {
    say: say(sing),
  });
}
function f5SortNumber(R, level) {
  const n = [4, 6, 8][level - 1];
  const ns = n === 4 ? 2 : n / 2 + R.int(-1, 1);
  const nouns = R.sample(W.filter(pluralOk), n);
  const sing = [];
  const plur = [];
  nouns.forEach((w, i) => {
    const pl = pluralOf(w.text);
    if (i < ns) {
      const text = level === 3 && R.chance(0.5) ? withLe(w) : `${unOf(w)} ${w.text}`;
      sing.push({ text, ...(level === 1 ? { emoji: w.emoji } : {}), say: say(text) });
    } else {
      const text = level === 3 && R.chance(0.5) ? `les ${pl}` : `des ${pl}`;
      plur.push({ text, ...(level === 1 ? { emoji: w.emoji.repeat(3) } : {}), say: say(text) });
    }
  });
  return mkSort(
    R,
    `f5-n-${sortedKey([...sing, ...plur].map((x) => x.text))}`,
    'Trie : un seul ou plusieurs?',
    [{ text: 'Un seul', emoji: '☝️' }, { text: 'Plusieurs', emoji: '👐' }],
    [sing, plur],
    { say: say('Trie : un seul ou plusieurs?') },
  );
}
const f5 = {
  id: 'f5',
  icon: '🔀',
  title: { fr: 'Genre et nombre', en: 'Gender and number' },
  pfeq: 'Grammaire — le genre et le nombre du nom, marque du pluriel (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [(R) => f5Genre(R, 4, true), (R) => f5Plural(R, 1), (R) => f5SortNumber(R, 1)],
    2: [(R) => f5Genre(R, 6, true), (R) => f5Plural(R, 2), (R) => f5SortNumber(R, 2)],
    3: [(R) => f5Genre(R, 8, false), (R) => f5Plural(R, 3), (R) => f5SortNumber(R, 3)],
  }),
};

/* ================================================================== */
/*  f6 — Le verbe                                                      */
/* ================================================================== */
const SENT_V = [
  [1, 'Le chat dort.', 'dort'],
  [1, 'Léa chante fort.', 'chante'],
  [1, 'Max court vite.', 'court'],
  [1, 'Papa lit un livre.', 'lit'],
  [1, 'Le bébé rit.', 'rit'],
  [1, 'Zoé saute haut.', 'saute'],
  [1, 'Le soleil brille.', 'brille'],
  [1, 'Nous jouons dehors.', 'jouons'],
  [1, 'Les oiseaux chantent.', 'chantent'],
  [1, 'Tom dessine un chat.', 'dessine'],
  [1, 'Mia mange une pomme.', 'mange'],
  [1, 'Le chien aboie.', 'aboie'],
  [1, 'Maman lave l’auto.', 'lave'],
  [2, 'Le petit chien court dans le parc.', 'court'],
  [2, 'Ma cousine joue avec ses amis.', 'joue'],
  [2, 'Le gros ours dort dans sa grotte.', 'dort'],
  [2, 'Les enfants patinent sur la patinoire.', 'patinent'],
  [2, 'Léa met sa tuque rouge.', 'met'],
  [2, 'Papa prépare le souper ce soir.', 'prépare'],
  [2, 'Le hibou vole dans la nuit.', 'vole'],
  [2, 'Nous mangeons une crêpe au sirop.', 'mangeons'],
  [2, 'Ils regardent un film le samedi.', 'regardent'],
  [2, 'Elle ouvre la fenêtre doucement.', 'ouvre'],
  [2, 'La petite fille cueille des fleurs.', 'cueille'],
  [2, 'Mon frère range ses jouets.', 'range'],
  [3, 'Tous les matins, mon frère prend l’autobus.', 'prend'],
  [3, 'Le samedi, ma famille va au chalet.', 'va'],
  [3, 'Zoé range ses jouets dans la boîte bleue.', 'range'],
  [3, 'Mon grand frère répare son vélo rouge.', 'répare'],
  [3, 'Sam attend l’autobus devant l’école.', 'attend'],
  [3, 'Les élèves écoutent leur enseignante.', 'écoutent'],
  [3, 'Ma mère achète du pain à l’épicerie.', 'achète'],
  [3, 'Le camion de pompiers arrive très vite.', 'arrive'],
  [3, 'À midi, les enfants mangent leur sandwich.', 'mangent'],
  [3, 'Le petit garçon cherche son chat.', 'cherche'],
  [3, 'La neige tombe sur la montagne.', 'tombe'],
  [3, 'Les canetons suivent leur maman.', 'suivent'],
];
function f6FindVerb(R, level) {
  const [, s, v] = R.pick(SENT_V.filter((x) => x[0] === level));
  const tokens = s.replace(/[.,!?]/g, '').split(' ');
  const seen = new Set([v.toLowerCase()]);
  const others = [];
  for (const t of R.shuffle(tokens)) {
    const k = t.toLowerCase();
    if (!seen.has(k)) {
      seen.add(k);
      others.push(t);
    }
  }
  const n = level === 1 ? 3 : 4;
  const wrong = others.slice(0, n - 1);
  return mkChoice(R, `f6-v-${s}`, 'Touche le verbe dans la phrase.', { text: v, say: say(v) }, wrong.map((t) => ({ text: t, say: say(t) })), {
    say: say(s),
    stimulus: { text: s },
    cols: 2,
  });
}
const VERBS_INF = ['courir', 'sauter', 'manger', 'dormir', 'chanter', 'jouer', 'rire', 'lire', 'danser', 'nager', 'dessiner', 'marcher', 'écrire', 'boire'];
const VERB_FORM_NOUNS = new Set(['livre', 'porte', 'pêche', 'tente', 'règle', 'cloche', 'lit', 'vague', 'luge', 'crêpe', 'robe', 'dé', 'jus', 'main', 'pied', 'dent', 'ski', 'patin', 'fleur', 'lune', 'bague', 'danse', 'boxe', 'pile', 'mouche', 'cible', 'goutte', 'herbe', 'ancre', 'terre', 'lanterne', 'montre', 'étiquette', 'enveloppe', 'pilote', 'balai', 'bol', 'quille', 'comète']);
const SAFE_NOUNS = W.filter((w) => !VERB_FORM_NOUNS.has(w.text));
function f6SortVerb(R, n) {
  const half = n / 2;
  const verbs = R.sample(VERBS_INF, half).map((t) => ({ text: t, say: say(t) }));
  const others = R.sample(SAFE_NOUNS, n - half).map((w) => ({ text: w.text, say: say(w.text) }));
  return mkSort(
    R,
    `f6-s-${sortedKey([...verbs, ...others].map((x) => x.text))}`,
    'Trie les mots : est-ce un verbe?',
    [{ text: 'Un verbe', emoji: '🏃' }, { text: 'Pas un verbe', emoji: '🚫' }],
    [verbs, others],
    { say: say('Trie les mots : est-ce un verbe?') },
  );
}
const FORMS = {
  être: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
  avoir: ['ai', 'as', 'a', 'avons', 'avez', 'ont'],
};
const ER = [
  ['jouer', 'jou', 'dans la neige'],
  ['chanter', 'chant', 'une chanson'],
  ['danser', 'dans', 'sur la glace'],
  ['sauter', 'saut', 'très haut'],
  ['regarder', 'regard', 'la télé'],
  ['parler', 'parl', 'doucement'],
  ['marcher', 'march', 'dans le parc'],
  ['dessiner', 'dessin', 'un chat'],
  ['aimer', 'aim', 'le chocolat'],
  ['donner', 'donn', 'un cadeau'],
  ['laver', 'lav', 'la vaisselle'],
  ['porter', 'port', 'un manteau'],
  ['arriver', 'arriv', 'à l’école'],
  ['trouver', 'trouv', 'une clé'],
  ['cacher', 'cach', 'un trésor'],
];
const COMP = {
  être: ['à la maison', 'dans le parc', 'à l’école', 'en classe', 'au parc', 'dehors'],
  avoir: ['un chat', 'faim', 'froid', 'un vélo', 'des amis', 'sept ans'],
};
const SUBJ_PRON = [
  { t: 'Je', p: 0 }, { t: 'Tu', p: 1 }, { t: 'Il', p: 2 }, { t: 'Elle', p: 2 },
  { t: 'Nous', p: 3 }, { t: 'Vous', p: 4 }, { t: 'Ils', p: 5 }, { t: 'Elles', p: 5 },
];
const SUBJ_ALL = [
  ...SUBJ_PRON,
  { t: 'Léa', p: 2 }, { t: 'Papa', p: 2 }, { t: 'Maman', p: 2 }, { t: 'Le chat', p: 2 },
  { t: 'Les enfants', p: 5 }, { t: 'Mes amis', p: 5 }, { t: 'Léa et Max', p: 5 }, { t: 'Max et moi', p: 3 },
];
const vowelStart = (f) => /^[aeiouéèêh]/i.test(f);
function conjQuestion(R, verbKey, forms, comp, infin, subj) {
  const correct = forms[subj.p];
  const elide = subj.p === 0 && vowelStart(correct);
  const sentence = elide ? `J’___ ${comp}.` : `${subj.t} ___ ${comp}.`;
  const wrongs = R.sample(uniq(forms).filter((f) => f !== correct), 3);
  return mkChoice(R, `f6-c-${verbKey}-${subj.t}-${comp}`, `Complète avec le verbe « ${infin} » au présent.`, { text: correct }, wrongs.map((x) => ({ text: x })), {
    say: say(`Complète avec le verbe ${infin}, au présent.`),
    stimulus: { text: sentence },
    cols: 2,
  });
}
function f6BeHave(R, subjects) {
  const v = R.pick(['être', 'avoir']);
  return conjQuestion(R, v, FORMS[v], R.pick(COMP[v]), v, R.pick(subjects));
}
function f6ConjEr(R) {
  const [inf, stem, comp] = R.pick(ER);
  const forms = [stem + 'e', stem + 'es', stem + 'e', stem + 'ons', stem + 'ez', stem + 'ent'];
  return conjQuestion(R, inf, forms, comp, inf, R.pick(SUBJ_ALL));
}
const f6 = {
  id: 'f6',
  icon: '🏃',
  title: { fr: 'Le verbe', en: 'The verb' },
  pfeq: 'Grammaire — le verbe, présent de être, avoir et des verbes en -er (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [(R) => f6FindVerb(R, 1), (R) => f6FindVerb(R, 1), (R) => f6SortVerb(R, 4)],
    2: [(R) => f6FindVerb(R, 2), (R) => f6BeHave(R, SUBJ_PRON), (R) => f6SortVerb(R, 6)],
    3: [(R) => f6FindVerb(R, 3), (R) => f6ConjEr(R), (R) => f6ConjEr(R), (R) => f6BeHave(R, SUBJ_ALL)],
  }),
};

/* ================================================================== */
/*  f7 — La phrase                                                     */
/* ================================================================== */
const SENT = {
  1: [
    'Le chat dort.', 'Le chien court.', 'Léa lit un livre.', 'Max joue dehors.', 'Maman fait un gâteau.',
    'La lune brille.', 'Le bébé rit fort.', 'Nous aimons la neige.', 'Tom a une balle.', 'Papa conduit le camion.',
    'Zoé chante une chanson.', 'Le lapin mange une carotte.', 'Le soleil brille.', 'Mia dessine un chat.',
    'Papa lave l’auto.', 'Le hibou vole la nuit.', 'Nous mangeons une pomme.', 'Le poisson nage.',
    'Je mets mon manteau.', 'Léo saute haut.', 'La vache mange de l’herbe.', 'Il pleut ce matin.',
    'Maman lit une histoire.', 'Le canard nage dans l’eau.', 'Sam a un vélo rouge.', 'Tu joues avec moi.',
    'Les oiseaux chantent.', 'Ma sœur danse bien.', 'Le train roule vite.', 'Nous allons à l’école.',
    'Le chien aime son os.', 'Elle porte une robe.', 'Mon frère dort.', 'L’ours dort l’hiver.',
    'Ils patinent sur la glace.', 'La neige tombe.', 'Papa fait du pain.', 'Je lave mes mains.',
    'Le cheval court vite.', 'Tu as un beau ballon.', 'Noé mange du fromage.', 'Emma ouvre la porte.',
    'Le vent souffle fort.', 'Ma tante cuisine.', 'Le lait est froid.', 'L’avion vole haut.',
  ],
  2: [
    'Le petit chat boit du lait.', 'Mon frère joue au hockey.', 'Léa met sa tuque rouge.', 'Les enfants vont à l’école.',
    'Papa lit une histoire à Zoé.', 'Le gros ours dort dans sa grotte.', 'Ma tante cuisine une tarte.',
    'Le chien court après la balle.', 'Nous mangeons des fraises.', 'Elle porte un manteau bleu.', 'Max fait un bonhomme de neige.',
    'Ma sœur apprend à nager.', 'Le matin je prends mon déjeuner.', 'Les canards nagent sur le lac.',
    'Mon père répare la porte du garage.', 'Zoé met ses bottes dans l’entrée.', 'Le facteur apporte une lettre.',
    'Nous faisons du ski en hiver.', 'Ma grand-mère tricote une tuque.', 'Le petit oiseau mange des graines.',
    'Papa prépare le souper ce soir.', 'L’enseignante écrit sur le tableau.', 'Max boit un jus d’orange.',
    'Léa range ses jouets dans la boîte.', 'Le chat gris dort sur le divan.', 'Mon ami joue du piano.',
    'Les enfants courent dans la cour.', 'Maman achète du pain à l’épicerie.', 'Le lion rugit très fort.',
    'Tom prend l’autobus avec Louis.', 'Nous dînons à midi à l’école.', 'Le bateau avance sur l’eau.',
    'Ma cousine dessine une grande fleur.', 'Le fermier nourrit les poules.', 'Zoé cueille des pommes rouges.',
    'Mon chien cherche son os.', 'Les élèves lisent à la bibliothèque.', 'Le soleil se couche derrière la montagne.',
    'Léo colle une image dans son cahier.', 'Je mets mes mitaines parce qu’il fait froid.', 'Les poules dorment dans le poulailler.',
    'Ma mère coupe des carottes.', 'Les nuages noirs cachent le soleil.', 'Le camion de pompiers roule vite.',
    'Nous visitons le zoo samedi.', 'Sophie boit du chocolat chaud.',
  ],
  3: [
    'Mon grand frère répare son vélo dans le garage.', 'Les petits canards suivent leur maman sur le lac.',
    'Ma classe visite la cabane à sucre en mars.', 'Le hibou chasse une petite souris dans la forêt.',
    'Sophie dessine un arc-en-ciel avec ses crayons.', 'Nous patinons sur la grande patinoire du parc.',
    'Mon papa prépare une soupe chaude pour le souper.', 'Les élèves écoutent une belle histoire en classe.',
    'Tom met ses bottes et sa tuque pour sortir.', 'Le petit renard cherche sa maman dans la neige.',
    'Bonhomme Carnaval porte une longue ceinture fléchée.', 'Ma famille va au chalet près du lac chaque samedi.',
    'Les enfants construisent un grand fort de neige dans la cour.', 'Mon papa pêche un gros poisson avec sa nouvelle canne.',
    'Nous regardons les étoiles brillantes avant de dormir.', 'L’enseignante lit une histoire de dragon à toute la classe.',
    'Les outardes volent vers le sud quand l’automne arrive.', 'Ma petite sœur apprend à faire du vélo sans les petites roues.',
    'Mon ami Louis a perdu sa mitaine dans la grande cour.', 'Les feuilles rouges et jaunes tombent des érables en octobre.',
    'Maman met un beau gâteau avec sept bougies sur la table.', 'Le camion de pompiers arrive devant l’école avec sa sirène.',
    'Les élèves jouent au ballon dans la cour à la récré.', 'Nous mangeons de la tire d’érable sur la neige propre.',
    'Mon chien Rex court après les écureuils dans le parc.', 'La famille de Zoé prépare un grand souper pour Noël.',
    'Le lapin blanc saute dans le jardin de ma grand-mère.', 'Les élèves de deuxième année visitent le musée en autobus.',
    'Mon cousin joue de la guitare dans le salon.', 'Le facteur dépose une grosse boîte devant notre porte.',
    'Ma sœur et moi décorons le sapin avec des boules rouges.', 'Les petits poussins suivent la poule dans la grange.',
    'Nous mangeons de la pizza en famille le vendredi soir.', 'Un gros nuage gris cache le soleil depuis ce matin.',
    'Léa range ses crayons de couleur dans son étui à crayons.', 'Mon grand-père raconte une histoire de pirates à mon frère.',
    'Les enfants glissent sur la grande colline en traîneau.', 'La grenouille saute sur une feuille au bord de l’étang.',
    'Je mets mon costume de bain pour aller à la piscine.', 'Sam attend l’autobus avec sa tuque et ses mitaines.',
    'Le petit garçon pleure parce qu’il a perdu son chien.', 'Maya choisit un livre sur les dinosaures à la bibliothèque.',
    'Nous faisons un pique-nique près de la rivière.', 'Le bonhomme de neige porte une carotte à la place du nez.',
  ],
};
const ALL_SENT = [...SENT[1], ...SENT[2], ...SENT[3]];
const ASK1 = [
  'Qui est là', 'As-tu faim', 'Où vas-tu', 'Aimes-tu la neige', 'Quel âge as-tu', 'Tu veux jouer', 'Où est mon chat', 'Qui veut un gâteau',
];
const ASK = [
  'Où est mon sac', 'Quel âge as-tu', 'Aimes-tu les pommes', 'Qui est là', 'Pourquoi pleures-tu', 'Veux-tu jouer avec moi',
  'Quelle heure est-il', 'Comment t’appelles-tu', 'As-tu faim', 'Où vas-tu', 'Est-ce que tu viens', 'Qui veut du gâteau',
  'Où est ma tuque', 'Quand part l’autobus', 'As-tu vu mon chien', 'Combien de pommes veux-tu', 'Qui a pris mon crayon',
  'Peux-tu m’aider', 'Quel est ton jeu préféré', 'Aimes-tu la poutine', 'Où est la patinoire', 'Pourquoi le ciel est-il bleu',
  'Est-ce que le chat dort', 'Quel temps fait-il',
];
const EXC = [
  'Quel gros gâteau', 'Quelle belle surprise', 'Comme il fait froid', 'Bravo', 'Youpi', 'Attention', 'Au secours', 'Hourra',
  'Aïe', 'Miam', 'Bonne fête', 'Joyeux Noël', 'Quel beau dessin', 'Comme tu as grandi', 'Que ce gâteau est bon',
  'Vive les vacances', 'Quelle chance', 'Quelle belle journée', 'Quel grand château', 'Comme ce chien est drôle',
];
const ABS = [
  'La table mange une pomme.', 'Le chien conduit un avion rouge.', 'Le soleil dort dans le lit.', 'La chaise boit du lait.',
  'Le crayon court très vite.', 'Maman mange l’auto.', 'Les pommes jouent au hockey.', 'Le poisson grimpe dans l’arbre.',
  'Mon livre chante dans la douche.', 'La neige est très chaude.', 'Le gâteau lit un livre.', 'Les nuages mangent des crayons.',
  'Le bébé conduit un camion.', 'Le lit court après le ballon.', 'Papa boit la fenêtre.', 'La porte dort dans le bain.',
  'Le hibou nage dans la soupe.', 'Mon sac mange un biscuit.', 'Le feu est très froid.', 'L’auto boit du jus.',
  'La lune joue du piano.', 'L’eau est très sèche.', 'Le crayon fait du patin.', 'Mon manteau mange de la soupe.',
  'Le sapin conduit l’autobus.', 'Le ballon lit une histoire.', 'La vache vole dans le ciel.', 'Les bas mangent du fromage.',
  'Le lit boit de l’eau chaude.', 'La pomme dort dans le garage.',
];
const capFirst = (t) => t[0].toUpperCase() + t.slice(1);
function f7Order(R, level) {
  const s = R.pick(SENT[level]);
  return {
    type: 'order',
    key: `f7-o-${s}`,
    prompt: 'Écoute la phrase. Remets les mots dans l’ordre.',
    say: say(s),
    tiles: s.split(' '),
    joiner: ' ',
  };
}
function f7WellWritten(R, pool) {
  const s = R.pick(pool);
  const noCap = s[0].toLowerCase() + s.slice(1);
  const noDot = s.slice(0, -1);
  const neither = noCap.slice(0, -1);
  return mkChoice(
    R,
    `f7-w-${s}`,
    'Quelle phrase est bien écrite? (majuscule et point)',
    { text: s },
    [{ text: noCap }, { text: noDot }, { text: neither }],
    { say: say('Quelle phrase est bien écrite? Il faut une majuscule et un point.') },
  );
}
function f7Punct(R, pool, asks) {
  const isQ = R.chance(0.4);
  const base = isQ ? R.pick(asks) : R.pick(pool).slice(0, -1);
  return {
    type: 'choice',
    key: `f7-p-${base}`,
    prompt: 'Quel signe termine la phrase?',
    say: say(isQ ? `${base}?` : base),
    stimulus: { text: base },
    options: [{ text: 'Un point  ( . )' }, { text: 'Un point d’interrogation  ( ? )' }],
    answer: isQ ? 1 : 0,
    fixedOrder: true,
    cols: 2,
  };
}
function f7Type(R) {
  const k = R.pick(['d', 'd', 'q', 'e']);
  const base = k === 'd' ? R.pick(ALL_SENT).slice(0, -1) : k === 'q' ? R.pick(ASK) : R.pick(EXC);
  const end = k === 'd' ? '.' : k === 'q' ? '?' : '!';
  return {
    type: 'choice',
    key: `f7-t-${base}`,
    prompt: 'Quel signe termine la phrase?',
    say: say(`${base}${end}`),
    stimulus: { text: base },
    options: [{ text: 'Un point  ( . )' }, { text: 'Un point d’interrogation  ( ? )' }, { text: 'Un point d’exclamation  ( ! )' }],
    answer: k === 'd' ? 0 : k === 'q' ? 1 : 2,
    fixedOrder: true,
    cols: 3,
  };
}
function f7Salad(s) {
  const ws = s.slice(0, -1).split(' ').reverse();
  return capFirst(ws.join(' ').toLowerCase().replace(/(^|\s)(l’|d’|j’|qu’)/g, '$1$2')) + '.';
}
function f7Sens(R, level) {
  const oks = SENT[level];
  const bads = level === 1 ? [...ABS.slice(0, 15)] : ABS;
  const o = (t) => ({ text: t, say: say(t) });
  if (R.chance(0.65)) {
    const ok = R.pick(oks);
    const wrong = level === 1 && R.chance(0.5) ? [f7Salad(ok), R.pick(bads)] : R.sample(bads, 2);
    return mkChoice(R, `f7-s-${ok}|${sortedKey(wrong)}`, 'Quelle phrase a du sens?', o(ok), wrong.map(o), {
      say: say('Quelle phrase a du sens?'),
    });
  }
  const bad = R.pick(bads);
  const good = R.sample(oks, 2);
  return mkChoice(R, `f7-n-${bad}|${sortedKey(good)}`, 'Quelle phrase n’a pas de sens?', o(bad), good.map(o), {
    say: say('Quelle phrase n’a pas de sens?'),
  });
}
const f7 = {
  id: 'f7',
  icon: '📝',
  title: { fr: 'La phrase', en: 'The sentence' },
  pfeq: 'Écriture — la phrase : ordre des mots, sens, majuscule, ponctuation (.? !) (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [
      (R) => f7Order(R, 1),
      (R) => f7WellWritten(R, SENT[1]),
      (R) => f7Punct(R, SENT[1], ASK1),
      (R) => f7Sens(R, 1),
    ],
    2: [
      (R) => f7Order(R, 2),
      (R) => f7WellWritten(R, SENT[2]),
      (R) => f7Punct(R, [...SENT[1], ...SENT[2]], ASK),
      (R) => f7Sens(R, 2),
    ],
    3: [
      (R) => f7Order(R, 3),
      (R) => f7Order(R, 3),
      (R) => f7WellWritten(R, SENT[3]),
      (R) => f7Type(R),
      (R) => f7Sens(R, 3),
    ],
  }),
};

/* ================================================================== */
/*  f8 — Je lis                                                        */
/* ================================================================== */
// qs[0] = niveau 1 (qui/quoi), qs[1] = niveau 2 (où/quoi), qs[2] = niveau 3 (pourquoi/quand/combien)
const TEXTS = [
  {
    id: 'minou',
    t: 'Léa a un petit chat gris. Il s’appelle Minou. Minou dort sur le lit de Léa.',
    qs: [
      ['Qui dort sur le lit de Léa?', 'Minou', 'Le chien', 'Papa'],
      ['De quelle couleur est le chat?', 'Gris', 'Noir', 'Blanc'],
      ['Où dort Minou?', 'Sur le lit de Léa', 'Dans la cuisine', 'Sous la table'],
    ],
  },
  {
    id: 'bonhomme',
    t: 'Max aime l’hiver. Il met sa tuque et ses mitaines. Puis il fait un gros bonhomme de neige.',
    qs: [
      ['Qui aime l’hiver?', 'Max', 'Léa', 'Le chat'],
      ['Que fait Max avec la neige?', 'Un bonhomme de neige', 'Une tarte', 'Un avion'],
      ['Que met Max avant de faire le bonhomme de neige?', 'Sa tuque et ses mitaines', 'Ses patins', 'Son costume de bain'],
    ],
  },
  {
    id: 'cabane',
    t: 'Aujourd’hui, la classe de Zoé va à la cabane à sucre. Il y a de la tire d’érable sur la neige. Zoé trouve ça très bon. Elle veut y retourner.',
    qs: [
      ['Qui va à la cabane à sucre?', 'La classe de Zoé', 'La classe de Max', 'Le chien de Zoé'],
      ['Qu’est-ce qu’il y a sur la neige?', 'De la tire d’érable', 'Du chocolat chaud', 'Des biscuits'],
      ['Pourquoi Zoé veut-elle y retourner?', 'Parce que c’est très bon', 'Parce qu’il fait chaud', 'Parce qu’elle a perdu sa tuque'],
    ],
  },
  {
    id: 'hockey',
    t: 'Samedi, Noé joue au hockey avec son équipe. Il marque un but! Tout le monde crie de joie.',
    qs: [
      ['À quoi joue Noé?', 'Au hockey', 'Au soccer', 'Au baseball'],
      ['Que fait Noé?', 'Il marque un but', 'Il mange une pizza', 'Il perd ses patins'],
      ['Pourquoi tout le monde crie-t-il de joie?', 'Parce que Noé a marqué un but', 'Parce qu’il neige', 'Parce que Noé est tombé'],
    ],
  },
  {
    id: 'ecole',
    t: 'Il est huit heures. Les enfants entrent dans l’école. Madame Julie dit bonjour à tout le monde.',
    qs: [
      ['Qui dit bonjour?', 'Madame Julie', 'Le chien', 'Papa'],
      ['Où entrent les enfants?', 'Dans l’école', 'Dans l’autobus', 'Dans le parc'],
      ['Quelle heure est-il?', 'Huit heures', 'Midi', 'Trois heures'],
    ],
  },
  {
    id: 'automne',
    t: 'En automne, les feuilles changent de couleur. Elles deviennent rouges, jaunes et orange. Ensuite, elles tombent des arbres. Sam saute dans les tas de feuilles.',
    qs: [
      ['Qui saute dans les feuilles?', 'Sam', 'Le chat', 'Maman'],
      ['Quelles couleurs ont les feuilles?', 'Rouges, jaunes et orange', 'Bleues et roses', 'Noires et violettes'],
      ['Que font les feuilles ensuite?', 'Elles tombent des arbres', 'Elles chantent', 'Elles deviennent bleues'],
    ],
  },
  {
    id: 'rex',
    t: 'Mon chien Rex adore courir. Chaque matin, nous allons au parc. Il court après sa balle. Quand il est fatigué, il boit de l’eau.',
    qs: [
      ['Qui adore courir?', 'Rex', 'Le chat', 'Papa'],
      ['Où vont-ils chaque matin?', 'Au parc', 'À l’école', 'À la piscine'],
      ['Pourquoi Rex boit-il de l’eau?', 'Parce qu’il est fatigué', 'Parce qu’il a perdu sa balle', 'Parce qu’il neige'],
    ],
  },
  {
    id: 'gateau',
    t: 'Maman fait un gâteau pour la fête de Lou. Lou a sept ans. Il y a sept bougies sur le gâteau. Lou souffle les bougies.',
    qs: [
      ['Qui fait le gâteau?', 'Maman', 'Papa', 'Lou'],
      ['Combien y a-t-il de bougies?', 'Sept', 'Six', 'Huit'],
      ['Pourquoi y a-t-il sept bougies?', 'Parce que Lou a sept ans', 'Parce que c’est lundi', 'Parce que Maman aime ça'],
    ],
  },
  {
    id: 'piquenique',
    t: 'Il fait beau. Emma et Louis font un pique-nique près du lac. Ils mangent des sandwichs et des fraises. Un canard vient les voir.',
    qs: [
      ['Qui vient les voir?', 'Un canard', 'Un loup', 'Un lion'],
      ['Où font-ils leur pique-nique?', 'Près du lac', 'Dans l’école', 'Sur la montagne'],
      ['Que mangent Emma et Louis?', 'Des sandwichs et des fraises', 'De la soupe et du pain', 'Des crêpes et du miel'],
    ],
  },
  {
    id: 'pluie',
    t: 'Il pleut ce matin. Sophie ne peut pas aller jouer dehors. Elle prend ses crayons et dessine un arc-en-ciel sur une grande feuille.',
    qs: [
      ['Qui dessine?', 'Sophie', 'Papa', 'Le chat'],
      ['Que dessine Sophie?', 'Un arc-en-ciel', 'Un bonhomme de neige', 'Un avion'],
      ['Pourquoi Sophie ne joue-t-elle pas dehors?', 'Parce qu’il pleut', 'Parce qu’il neige', 'Parce qu’elle dort'],
    ],
  },
  {
    id: 'hibou',
    t: 'La nuit, le hibou ne dort pas. Il vole dans la forêt. Il cherche une petite souris pour son souper. Le jour, il dort dans un grand arbre.',
    qs: [
      ['Qui vole dans la forêt?', 'Le hibou', 'La souris', 'Le lapin'],
      ['Que cherche le hibou?', 'Une petite souris', 'Un poisson', 'Une pomme'],
      ['Quand le hibou dort-il?', 'Le jour', 'La nuit', 'Jamais'],
    ],
  },
  {
    id: 'biblio',
    t: 'Chaque jeudi, la classe de Mia va à la bibliothèque. Mia choisit un livre sur les dinosaures. Elle le lit dans son lit avant de dormir.',
    qs: [
      ['Qui choisit un livre?', 'Mia', 'Max', 'Le chat'],
      ['Sur quoi est le livre de Mia?', 'Les dinosaures', 'Les chats', 'Les avions'],
      ['Quand Mia lit-elle son livre?', 'Avant de dormir', 'À l’école', 'Au déjeuner'],
    ],
  },
  {
    id: 'grenouille',
    t: 'Au printemps, la neige fond. Une petite grenouille sort de l’eau. Elle saute sur une feuille et chante: Coa! Coa!',
    qs: [
      ['Qui chante?', 'La grenouille', 'L’oiseau', 'Le chat'],
      ['Où saute la grenouille?', 'Sur une feuille', 'Sur un arbre', 'Dans la maison'],
      ['Quand la neige fond-elle?', 'Au printemps', 'En hiver', 'En été'],
    ],
  },
  {
    id: 'pommes',
    t: 'Dans le verger, Théo cueille des pommes rouges. Il en met douze dans son panier. Il en donne trois à sa grand-mère. Elle fait une bonne tarte.',
    qs: [
      ['Qui cueille des pommes?', 'Théo', 'Le chat', 'Papa'],
      ['Que fait la grand-mère?', 'Une tarte', 'Du jus', 'Un gâteau'],
      ['Combien de pommes Théo donne-t-il à sa grand-mère?', 'Trois', 'Douze', 'Deux'],
    ],
  },
  {
    id: 'patinoire',
    t: 'Papa et moi allons patiner sur la patinoire. Je tombe deux fois. Papa rit, mais il me donne la main. Je suis content.',
    qs: [
      ['Qui rit?', 'Papa', 'Maman', 'Le chien'],
      ['Où vont-ils patiner?', 'Sur la patinoire', 'À la piscine', 'Dans la forêt'],
      ['Combien de fois le garçon tombe-t-il?', 'Deux fois', 'Trois fois', 'Une fois'],
    ],
  },
];
// Format : « ## niveau id » puis le texte, puis des lignes « ? question|bonne|fausse|fausse » ou « VF affirmation|V ou F ».
const NEW_TEXTS = `
## 1 tuque
Il fait froid. Zoé met sa tuque rouge. Elle met aussi ses mitaines.
? Qui met sa tuque?|Zoé|Max|Maman
? De quelle couleur est la tuque?|Rouge|Bleue|Verte
? Que met Zoé aussi?|Ses mitaines|Ses sandales|Son costume de bain
? Comment est le temps?|Il fait froid|Il fait chaud|Il pleut
VF Zoé met une tuque bleue.|F
VF Il fait chaud.|F
VF Zoé met ses mitaines.|V

## 1 dejeuner
Le matin, Tom prend son déjeuner. Il mange des céréales. Il boit du lait.
? Que prend Tom le matin?|Son déjeuner|Son souper|Sa collation du soir
? Que mange Tom?|Des céréales|Des frites|Une pizza
? Que boit Tom?|Du lait|Du jus de raisin|De l'eau
? Quand Tom prend-il son déjeuner?|Le matin|Le soir|La nuit
VF Tom mange son souper.|F
VF Tom boit du lait.|V
VF Tom mange le matin.|V

## 1 autobus
Chaque matin, Léo prend l'autobus scolaire. L'autobus est jaune. Léo s'assoit près de la fenêtre.
? Qui prend l'autobus?|Léo|Papa|Le chat
? De quelle couleur est l'autobus?|Jaune|Rouge|Bleu
? Où s'assoit Léo?|Près de la fenêtre|Sur le toit|Dans le coffre
? Quand Léo prend-il l'autobus?|Chaque matin|Chaque soir|Chaque nuit
VF L'autobus est rouge.|F
VF Léo prend l'autobus scolaire.|V
VF Léo s'assoit près de la porte.|F

## 1 recre
À la récré, les garçons jouent au ballon. Emma saute à la corde. Il fait soleil.
? Où sont les enfants?|À la récré|À la maison|Au chalet
? Que fait Emma?|Elle saute à la corde|Elle lit un livre|Elle dort
? À quoi jouent les garçons?|Au ballon|Aux cartes|Au hockey
? Quel temps fait-il?|Il fait soleil|Il neige|Il pleut
VF Emma joue au ballon.|F
VF Il fait soleil.|V
VF Les garçons jouent au ballon.|V

## 1 ferme
À la ferme, la vache donne du lait. Le coq chante le matin. Les poules mangent du grain.
? Qui donne du lait?|La vache|La poule|Le coq
? Qui chante le matin?|Le coq|Le cochon|Le mouton
? Que mangent les poules?|Du grain|Du poisson|Des frites
? Où sont les animaux?|À la ferme|À l'école|Au parc
VF La vache chante le matin.|F
VF Les poules mangent du grain.|V
VF Le coq chante le soir.|F

## 1 carnaval
C'est le Carnaval! Bonhomme a une tuque rouge et une ceinture fléchée. Les enfants sont contents.
? Qui a une ceinture fléchée?|Bonhomme|Le chat|Papa
? De quelle couleur est la tuque de Bonhomme?|Rouge|Jaune|Verte
? Comment sont les enfants?|Contents|Tristes|Fâchés
? Quelle fête est-ce?|Le Carnaval|Noël|L'Halloween
VF Bonhomme a une tuque rouge.|V
VF Bonhomme a une ceinture fléchée.|V
VF Les enfants sont tristes.|F

## 1 dodo
Il est huit heures du soir. Sam prend son bain. Puis il met son pyjama et va au lit.
? Qui prend son bain?|Sam|Papa|Léa
? Quelle heure est-il?|Huit heures du soir|Huit heures du matin|Midi
? Que fait Sam après son bain?|Il met son pyjama|Il va à l'école|Il joue dehors
? Où va Sam à la fin?|Au lit|À l'école|Au parc
VF Sam va au lit.|V
VF C'est le matin.|F

## 1 erable
Au printemps, papa entaille un érable. L'eau d'érable coule dans un seau. Plus tard, on fait du sirop.
? Qui entaille l'érable?|Papa|Maman|Le chien
? Où coule l'eau d'érable?|Dans un seau|Dans un sac|Sur le toit
? Que fait-on avec l'eau d'érable?|Du sirop|Du fromage|Du pain
? Quand papa entaille-t-il l'érable?|Au printemps|En été|En automne
VF Papa entaille un sapin.|F
VF L'eau d'érable coule dans un seau.|V

## 1 chalet
Le samedi, nous allons au chalet. Il y a un grand lac. Papa pêche un poisson.
? Où allons-nous le samedi?|Au chalet|À l'école|Au magasin
? Qu'est-ce qu'il y a près du chalet?|Un grand lac|Une patinoire|Un zoo
? Qui pêche un poisson?|Papa|Maman|Le chat
? Quand allons-nous au chalet?|Le samedi|Le lundi|Le jeudi
VF Il y a un grand lac.|V
VF On va au chalet le lundi.|F

## 1 dentiste
Mia va chez le dentiste. Il regarde ses dents. Elles sont toutes propres.
? Chez qui va Mia?|Chez le dentiste|Chez le coiffeur|Chez le boulanger
? Que regarde le dentiste?|Les dents de Mia|Les mains de Mia|Les pieds de Mia
? Comment sont les dents de Mia?|Propres|Sales|Cassées
? Qui regarde les dents?|Le dentiste|Papa|Le chien
VF Mia va chez le dentiste.|V
VF Les dents de Mia sont sales.|F

## 1 fort
Il neige beaucoup! Léo et Nico font un fort de neige. Ils ont très froid aux doigts.
? Qui fait un fort de neige?|Léo et Nico|Léa et Zoé|Papa et Maman
? Que font Léo et Nico?|Un fort de neige|Un bonhomme de sable|Un gâteau
? Où ont-ils froid?|Aux doigts|Aux oreilles|Aux genoux
? Quel temps fait-il?|Il neige|Il pleut|Il fait chaud
VF Il pleut beaucoup.|F
VF Il neige beaucoup.|V

## 1 camp
Au camp de jour, Zoé fait du canot. Elle porte un gilet de sauvetage. Elle aime ça.
? Où est Zoé?|Au camp de jour|À l'école|À l'hôpital
? Que fait Zoé?|Du canot|Du ski|Du patin
? Que porte Zoé?|Un gilet de sauvetage|Un manteau d'hiver|Une tuque
? Qui fait du canot?|Zoé|Papa|Le chat
VF Zoé fait du ski.|F
VF Zoé aime ça.|V

## 1 outardes
À l'automne, les outardes volent vers le sud. Elles font un grand V dans le ciel. Elles crient très fort.
? Qui vole vers le sud?|Les outardes|Les poules|Les chats
? Quelle forme font les outardes?|Un grand V|Un grand O|Un grand X
? Comment crient-elles?|Très fort|Très doucement|Pas du tout
? Quand volent-elles vers le sud?|À l'automne|Au printemps|En été
VF Les outardes volent vers le nord.|F
VF Elles volent dans le ciel.|V

## 1 souper
Maman prépare le souper. Il y a du poulet et du riz. Papa met la table.
? Qui prépare le souper?|Maman|Papa|Léa
? Que met papa?|La table|Un chapeau|Le chat
? Qu'est-ce qu'il y a à manger?|Du poulet et du riz|Des pâtes et du pain|De la soupe et des frites
? Quel repas prépare Maman?|Le souper|Le déjeuner|Le dîner
VF Papa prépare le souper.|F
VF Il y a du riz.|V

## 2 cabane2
Samedi, Nico et sa famille vont à la cabane à sucre. Ils mangent de la soupe aux pois, du jambon et des crêpes. Après le repas, ils dansent au son du violon. Nico est très content.
? Où vont Nico et sa famille?|À la cabane à sucre|Au chalet|À la ferme
? Quand y vont-ils?|Samedi|Lundi|Vendredi
? Qu'est-ce qu'ils mangent en premier?|De la soupe aux pois|Des spaghettis|Une pizza
? Quel instrument entend-on?|Le violon|Le piano|La guitare
? Comment est Nico?|Très content|Fâché|Fatigué
VF Ils mangent des crêpes.|V
VF Ils dansent avant le repas.|F

## 2 sapin
C'est bientôt Noël. Léa et papa décorent le sapin. Ils mettent des boules rouges et une étoile dorée tout en haut. Maman allume les lumières. Le sapin est magnifique.
? Qui décore le sapin?|Léa et papa|Max et maman|Le chat
? Où mettent-ils l'étoile?|Tout en haut|Tout en bas|Sur la table
? De quelle couleur sont les boules?|Rouges|Bleues|Vertes
? Qui allume les lumières?|Maman|Papa|Léa
VF L'étoile est dorée.|V
VF Le sapin est laid.|F

## 2 tempete
Ce matin, il y a une grosse tempête de neige. L'autobus scolaire ne passe pas. Il n'y a pas d'école aujourd'hui! Zoé et son frère construisent un igloo dans la cour. Ils boivent ensuite un chocolat chaud.
? Pourquoi n'y a-t-il pas d'école?|À cause de la tempête de neige|Parce que c'est dimanche|Parce que les élèves sont en vacances
? Que construisent Zoé et son frère?|Un igloo|Un chalet|Un pont
? Où construisent-ils l'igloo?|Dans la cour|Dans la cuisine|À l'école
? Que boivent-ils ensuite?|Un chocolat chaud|Du jus|De l'eau
VF L'autobus passe ce matin.|F
VF Il y a une tempête de neige.|V

## 2 epicerie
Après l'école, Maya va à l'épicerie avec sa maman. Elles achètent du lait, des pommes et du pain. Maya choisit une banane pour sa collation. À la caisse, la dame dit: Bonne journée!
? Où vont Maya et sa maman?|À l'épicerie|À la bibliothèque|À la piscine
? Quand vont-elles à l'épicerie?|Après l'école|Avant l'école|La nuit
? Que choisit Maya pour sa collation?|Une banane|Une orange|Un biscuit
? Qu'achètent-elles?|Du lait, des pommes et du pain|Du poisson et du riz|Du fromage et des œufs
? Qui dit Bonne journée?|La dame à la caisse|Maya|La maman
VF Elles achètent des pommes.|V
VF Maya va à l'épicerie avec son papa.|F

## 2 camping
Pendant les vacances, la famille de Théo fait du camping. Papa monte la tente près d'un lac. Le soir, ils font un feu et mangent des guimauves. Théo entend un hibou dans la forêt.
? Où monte-t-on la tente?|Près d'un lac|En ville|Sur une montagne
? Qui monte la tente?|Papa|Théo|Maman
? Que mangent-ils le soir?|Des guimauves|Des crêpes|Des fraises
? Quel animal Théo entend-il?|Un hibou|Un loup|Un chat
VF Ils font un feu.|V
VF Ils dorment dans une maison.|F

## 2 piscine
C'est l'été et il fait très chaud. Le samedi, Alex va à la piscine avec ses amis. Ils sautent dans l'eau et jouent avec un gros ballon. Après, ils mangent une crème glacée. Alex est un peu fatigué, mais très content.
? Quand Alex va-t-il à la piscine?|Le samedi|Le lundi|Le jeudi
? Avec qui va Alex?|Avec ses amis|Avec sa grand-mère|Tout seul
? Avec quoi jouent-ils?|Un gros ballon|Une corde|Des cartes
? Que mangent-ils après?|Une crème glacée|Des frites|Une soupe
VF Il fait froid.|F
VF Alex est content.|V

## 2 poutine
Après son match de hockey, Charlie a très faim. Son papa l'emmène manger une poutine. Il y a des frites, du fromage et de la sauce. Charlie mange tout. Il demande une deuxième portion!
? Pourquoi Charlie a-t-il faim?|Il vient de jouer au hockey|Il n'a pas dormi|Il a mangé trois gâteaux
? Qui l'emmène manger?|Son papa|Sa maman|Son frère
? Qu'y a-t-il dans la poutine?|Des frites, du fromage et de la sauce|Du riz et du poulet|Des carottes et du maïs
? Que mange Charlie?|Une poutine|Un hamburger|Une pizza
VF Charlie ne mange rien.|F
VF Charlie veut une deuxième portion.|V

## 2 orignal
Dans la forêt, Anna et son oncle voient un orignal. Il est très grand et il a de gros bois sur la tête. Il boit de l'eau dans la rivière. Anna ne bouge pas pour ne pas lui faire peur. Puis l'orignal repart dans les arbres.
? Qui voit un orignal?|Anna et son oncle|Anna et sa mère|Anna et son frère
? Où est l'orignal?|Dans la forêt|Dans la ville|À l'école
? Que fait l'orignal?|Il boit de l'eau|Il mange une pomme|Il dort
? Pourquoi Anna ne bouge-t-elle pas?|Pour ne pas lui faire peur|Parce qu'elle dort|Parce qu'elle a froid
VF L'orignal est petit.|F
VF Il a de gros bois sur la tête.|V

## 2 anniv
Aujourd'hui, c'est l'anniversaire de Lina. Ses amis arrivent avec des cadeaux. Lina ouvre un cadeau et trouve un beau livre. Tout le monde chante Bonne fête! Ensuite, ils mangent du gâteau au chocolat.
? Qui fête son anniversaire?|Lina|Zoé|Maman
? Que trouve Lina dans le cadeau?|Un beau livre|Une poupée|Un ballon
? Que chante tout le monde?|Bonne fête|Une berceuse|Une chanson de Noël
? Quel gâteau mangent-ils?|Un gâteau au chocolat|Un gâteau à la vanille|Un gâteau aux fraises
VF Les amis arrivent sans cadeau.|F
VF Les amis chantent.|V

## 2 halloween
Le 31 octobre, c'est l'Halloween. Noa est déguisé en pirate. Il passe de maison en maison avec son sac. Les voisins lui donnent des bonbons. Noa en a plein son sac!
? Comment Noa est-il déguisé?|En pirate|En fantôme|En robot
? Quelle date est-ce?|Le 31 octobre|Le 25 décembre|Le 1er juillet
? Qui donne des bonbons?|Les voisins|Les pompiers|Les chats
? Que fait Noa?|Il passe de maison en maison|Il va à l'école|Il dort
VF C'est l'Halloween.|V
VF Noa est déguisé en fantôme.|F

## 2 histoire
Le lundi matin, Madame Julie lit une histoire à la classe. C'est l'histoire d'un petit ours perdu. Les élèves écoutent en silence. À la fin, Mia lève la main et dit qu'elle a déjà perdu son toutou. Tout le monde rit.
? Qui lit l'histoire?|Madame Julie|Mia|Papa
? De quoi parle l'histoire?|D'un petit ours perdu|D'un loup méchant|D'un chat gris
? Qui lève la main?|Mia|Noé|Madame Julie
? Quand lit-on l'histoire?|Le lundi matin|Le vendredi soir|Le dimanche
VF Les élèves parlent fort.|F
VF Mia a déjà perdu son toutou.|V

## 2 muffins
Samedi, Léa fait des muffins avec sa grand-mère. Elle mesure la farine et casse deux œufs. Mamie met le plat dans le four. Quinze minutes plus tard, ça sent très bon. Léa a hâte de goûter!
? Avec qui Léa fait-elle des muffins?|Avec sa grand-mère|Avec son frère|Avec sa tante
? Combien d'œufs Léa casse-t-elle?|Deux|Trois|Un
? Qui met le plat dans le four?|Mamie|Léa|Papa
? Quand Léa fait-elle des muffins?|Samedi|Lundi|Mardi
VF Léa casse trois œufs.|F
VF Ça sent très bon.|V

## 2 velo
Louis apprend à faire du vélo. Papa tient le siège pour l'aider. Louis tombe une fois dans l'herbe, mais il n'a pas mal. Il recommence et il réussit! Il roule jusqu'au bout de la rue.
? Qui aide Louis?|Papa|Maman|Son grand frère
? Où tombe Louis?|Dans l'herbe|Dans l'eau|Sur la glace
? Que fait Louis à la fin?|Il roule jusqu'au bout de la rue|Il pleure|Il range son vélo
? Pourquoi Louis recommence-t-il?|Pour réussir|Parce qu'il a faim|Parce qu'il pleut
VF Louis a très mal.|F
VF Louis réussit.|V

## 2 jardin
Au printemps, Maman et Sam plantent un jardin. Ils sèment des carottes, des radis et des fleurs. Chaque jour, Sam arrose les plantes. Après un mois, les premières carottes sont prêtes!
? Qui plante le jardin?|Maman et Sam|Papa et Léa|Mamie et Tom
? Qui arrose les plantes?|Sam|Maman|Papa
? Que sèment-ils?|Des carottes, des radis et des fleurs|Des pommes et des poires|Des arbres seulement
? Quand plantent-ils le jardin?|Au printemps|En hiver|En automne
? Après combien de temps les carottes sont-elles prêtes?|Après un mois|Après un jour|Après un an
VF Sam arrose les plantes chaque jour.|V
VF Les carottes sont prêtes après une semaine.|F

## 3 carnaval3
Chaque hiver, la ville de Québec organise le Carnaval. Il y a des sculptures de glace, une grande parade et des glissades sur la neige. Bonhomme Carnaval est la mascotte de la fête. Il porte une longue ceinture fléchée rouge. Léa et son frère ont passé la journée au Carnaval. Ils avaient des mitaines chaudes et une tuque, car il faisait très froid. Le soir, ils sont rentrés fatigués mais heureux.
? Quand a lieu le Carnaval?|En hiver|En été|Au printemps
? Qui est la mascotte du Carnaval?|Bonhomme Carnaval|Le père Noël|Un ours
? Que porte Bonhomme?|Une ceinture fléchée rouge|Un chapeau jaune|Des patins
? Pourquoi Léa porte-t-elle une tuque?|Parce qu'il fait très froid|Parce qu'elle est en retard|Parce qu'elle aime le rouge
? Comment sont les enfants le soir?|Fatigués mais heureux|Tristes et fâchés|Pas fatigués du tout
? Qu'est-ce qu'on peut faire au Carnaval?|Glisser sur la neige|Nager dans un lac|Cueillir des fraises
VF Il y a des sculptures de glace.|V
VF Léa est allée au Carnaval toute seule.|F

## 3 chaletete
Pendant les vacances d'été, la famille de Jade va au chalet de sa grand-mère. Le chalet est au bord d'un grand lac, au milieu de la forêt. Le matin, Jade nage avec son cousin Louis. L'après-midi, ils font un tour de pédalo. Le soir, la famille mange un souper sur la terrasse. Quand le soleil se couche, Jade regarde les étoiles. Elle voit même une étoile filante et fait un vœu.
? À qui est le chalet?|À la grand-mère de Jade|À l'oncle de Jade|À Louis
? Où est le chalet?|Au bord d'un lac|Au centre-ville|Sur une montagne
? Avec qui Jade nage-t-elle?|Son cousin Louis|Sa sœur|Son père
? Que fait la famille le soir?|Elle mange sur la terrasse|Elle va au cinéma|Elle dort déjà
? Quand Jade regarde-t-elle les étoiles?|Quand le soleil se couche|Le matin|À midi
? Pourquoi Jade fait-elle un vœu?|Parce qu'elle voit une étoile filante|Parce que c'est son anniversaire|Parce qu'elle a perdu quelque chose
VF Jade fait un tour de pédalo l'après-midi.|V
VF Jade va au chalet en hiver.|F

## 3 diner
À l'école de Samuel, le dîner est à midi. Samuel mange dans la grande salle avec sa classe. Il a un thermos de soupe, un sandwich et une pomme dans sa boîte à lunch. Son ami Olivier a oublié sa boîte à lunch à la maison. Samuel partage son sandwich avec lui. Olivier dit: Merci, tu es un vrai ami! Après le dîner, tous les élèves vont jouer dehors à la récré.
? À quelle heure est le dîner?|À midi|À minuit|À huit heures
? Qu'est-ce que Samuel a dans sa boîte à lunch?|Une soupe, un sandwich et une pomme|Des frites et un gâteau|Une pizza et du jus
? Qui a oublié sa boîte à lunch?|Olivier|Samuel|L’enseignante
? Pourquoi Samuel partage-t-il son sandwich?|Parce qu'Olivier n'a rien à manger|Parce qu'il n'a pas faim|Parce qu'il déteste les sandwichs
? Que font les élèves après le dîner?|Ils jouent dehors|Ils font une dictée|Ils rentrent chez eux
VF Samuel mange seul.|F
VF Olivier remercie Samuel.|V

## 3 patinoire3
Dans le quartier de Zack, il y a une patinoire en plein air. Chaque hiver, les voisins arrosent la glace le soir pour qu'elle soit bien lisse. Le samedi, tous les enfants viennent jouer au hockey. Zack porte son casque, ses gants et ses patins. Aujourd'hui, il y a un gros match: les bleus contre les rouges. Les rouges gagnent quatre à deux. Zack, qui joue pour les bleus, est déçu, mais il serre la main de ses adversaires.
? Où est la patinoire?|Dans le quartier de Zack|À l'école|Au chalet
? Qui arrose la glace?|Les voisins|Les pompiers|Zack tout seul
? Pourquoi arrose-t-on la glace?|Pour qu'elle soit lisse|Pour la faire fondre|Pour la colorer
? Quelle équipe gagne?|Les rouges|Les bleus|Aucune
? Combien de buts les rouges marquent-ils?|Quatre|Deux|Six
? Pourquoi Zack est-il déçu?|Son équipe perd|Il a perdu ses patins|Il a froid
VF Zack joue pour les rouges.|F
VF Zack serre la main de ses adversaires.|V

## 3 sirop
À la fin de l'hiver, quand il fait chaud le jour et froid la nuit, l'eau des érables se met à couler. Les producteurs font des trous dans les arbres et y accrochent des seaux. L'eau d'érable est claire comme de l'eau, mais elle est un peu sucrée. On la fait bouillir longtemps pour obtenir du sirop. Il faut environ quarante bouteilles d'eau d'érable pour faire une seule bouteille de sirop! Le sirop d'érable est délicieux sur les crêpes. Les gens en mangent aussi à la cabane à sucre.
? Quand l'eau d'érable se met-elle à couler?|À la fin de l'hiver|En plein été|À Noël
? Comment est l'eau d'érable?|Claire et un peu sucrée|Rouge et salée|Noire et amère
? Que fait-on pour obtenir du sirop?|On fait bouillir l'eau d'érable|On la congèle|On la mélange avec du lait
? Combien de bouteilles d'eau faut-il pour une bouteille de sirop?|Quarante|Quatre|Quatorze
? Où accroche-t-on les seaux?|Dans les arbres|Sur le toit|Sur la table
? Sur quoi le sirop est-il délicieux?|Sur les crêpes|Sur la soupe|Sur le poisson
VF L'eau d'érable est brune.|F
VF On fait bouillir l'eau d'érable longtemps.|V

## 3 biscuit
Hier soir, le chien de Nina, Biscuit, s'est sauvé de la cour. Nina était très inquiète. Elle et son père ont marché dans tout le quartier en criant son nom. Une voisine a fini par le trouver sous sa galerie. Biscuit tremblait de froid. Nina l'a pris dans ses bras et l'a ramené à la maison. Elle lui a donné un bol d'eau et une couverture chaude. Maintenant, Biscuit dort à côté du lit de Nina.
? Comment s'appelle le chien?|Biscuit|Rex|Minou
? Qui a cherché Biscuit avec Nina?|Son père|Sa mère|Son frère
? Où a-t-on trouvé Biscuit?|Sous la galerie d'une voisine|Dans le parc|À l'école
? Pourquoi Nina était-elle inquiète?|Son chien était perdu|Elle avait un examen|Il pleuvait
? Pourquoi Biscuit tremblait-il?|Il avait froid|Il avait faim|Il avait soif
? Où dort Biscuit maintenant?|À côté du lit de Nina|Dans la cour|Sous la galerie
VF Nina a trouvé le chien toute seule.|F
VF Nina donne de l'eau à Biscuit.|V

## 3 zoo
Mercredi, la classe de deuxième année visite le zoo. Les élèves voient d'abord les girafes, qui mangent les feuilles tout en haut des arbres. Ensuite, ils vont voir les singes, qui sautent d'une branche à l'autre. Le guide explique que le lion dort presque toute la journée. À midi, tous les élèves dînent sur des tables de pique-nique. Avant de partir, Chloé achète une petite peluche de panda à la boutique. Dans l'autobus, elle s'endort avec sa peluche dans les bras.
? Quand la classe visite-t-elle le zoo?|Mercredi|Samedi|Lundi
? Que mangent les girafes?|Les feuilles en haut des arbres|Du poisson|Des carottes seulement
? Que font les singes?|Ils sautent d'une branche à l'autre|Ils dorment|Ils nagent
? Que dit le guide du lion?|Il dort presque toute la journée|Il court toute la journée|Il mange des singes
? Où les élèves dînent-ils?|Sur des tables de pique-nique|Dans l'autobus|À l'école
? Que s'achète Chloé?|Une peluche de panda|Un livre|Un ballon
? Où Chloé s'endort-elle?|Dans l'autobus|Dans le zoo|Dans la boutique
VF Les élèves voient d'abord les singes.|F

## 3 camp3
Cet été, Rosalie est inscrite au camp de jour. Chaque matin, elle prend l'autobus avec ses amis. Les moniteurs organisent des jeux, des bricolages et des baignades. Le jeudi, c'est la journée du pique-nique géant au parc. Rosalie préfère les bricolages parce qu'elle adore peindre. Cette semaine, elle a fabriqué un bateau en carton. Il flotte même dans la piscine! Elle est très fière de son bateau.
? Qui organise les jeux?|Les moniteurs|Les parents|Les élèves
? Comment Rosalie se rend-elle au camp?|En autobus|En avion|En bateau
? Quel jour est le pique-nique géant?|Le jeudi|Le lundi|Le samedi
? Pourquoi Rosalie préfère-t-elle les bricolages?|Parce qu'elle adore peindre|Parce qu'elle déteste nager|Parce que c'est facile
? Qu'a-t-elle fabriqué?|Un bateau en carton|Un avion en papier|Un chat en argile
? Où son bateau flotte-t-il?|Dans la piscine|Dans la mer|Dans le lac
? Comment se sent-elle à la fin?|Très fière|Triste|Fâchée
VF Le camp de jour a lieu en hiver.|F

## 3 noel
La veille de Noël, toute la famille de Gabriel se rassemble chez sa grand-mère. Mamie a préparé un grand souper avec de la dinde, des patates pilées et une tourtière. Les enfants mettent la table pendant que les adultes parlent dans le salon. Après le souper, Gabriel ouvre un seul cadeau, comme le veut la tradition. Il trouve de nouveaux patins à glace. À minuit, tout le monde mange du gâteau. Gabriel s'endort en rêvant de la patinoire.
? Quand la famille se réunit-elle?|La veille de Noël|Le jour de l'An|À Pâques
? Chez qui se rassemble-t-elle?|Chez Mamie|Chez la tante|Chez Gabriel
? Qu'a préparé Mamie?|Un grand souper|Un déjeuner|Une collation
? Que font les enfants?|Ils mettent la table|Ils font la vaisselle|Ils conduisent
? Que reçoit Gabriel?|De nouveaux patins à glace|Une tuque|Un vélo
? Pourquoi Gabriel rêve-t-il de la patinoire?|À cause de ses nouveaux patins|Parce qu'il n'aime pas le gâteau|Parce qu'il est au chalet
? À quelle heure mange-t-on le gâteau?|À minuit|À midi|Au déjeuner
VF Gabriel ouvre tous ses cadeaux avant le souper.|F

## 3 verger
En automne, la classe de Mathis va au verger pour cueillir des pommes. Chaque élève reçoit un grand panier. Mathis choisit des pommes rouges, mais Chloé préfère les pommes vertes parce qu'elles sont plus acides. Une abeille tourne autour du panier de Mathis. Il reste calme et ne bouge pas, alors elle s'envole. À la fin de la journée, la classe a cueilli cinquante pommes! Le fermier leur donne un pot de compote en cadeau.
? Quand la classe va-t-elle au verger?|En automne|Au printemps|En hiver
? Que reçoit chaque élève?|Un grand panier|Un sac de patates|Une échelle
? Quelles pommes préfère Chloé?|Les vertes|Les rouges|Les jaunes
? Pourquoi Chloé préfère-t-elle les vertes?|Elles sont plus acides|Elles sont plus grosses|Elles sont en bas
? Pourquoi l'abeille s'envole-t-elle?|Mathis reste calme|Mathis crie|Mathis la chasse
? Combien de pommes la classe cueille-t-elle?|Cinquante|Quinze|Cent
? Que donne le fermier?|Un pot de compote|Un sac de pommes|Une tarte
VF Mathis préfère les pommes rouges.|V

## 3 pompiers
Mardi, deux pompiers viennent visiter la classe de Madame Julie. Ils arrivent dans un grand camion rouge avec une sirène. Les élèves peuvent monter à bord et toucher le long tuyau. Un pompier explique: si le détecteur de fumée sonne, il faut sortir de la maison tout de suite et appeler le 9-1-1. Il montre aussi son habit très lourd. Quand Léo l'essaie, il a l'air d'un robot! Toute la classe éclate de rire.
? Qui visite la classe?|Deux pompiers|Deux policiers|Deux dentistes
? Dans quoi arrivent-ils?|Un grand camion rouge|Une petite auto|Un autobus jaune
? Que doit-on faire si le détecteur sonne?|Sortir de la maison et appeler le 9-1-1|Se cacher sous le lit|Éteindre le détecteur
? Qui essaie l'habit?|Léo|Madame Julie|Le pompier
? Pourquoi Léo a-t-il l'air d'un robot?|L'habit est très lourd|Il a peint son visage|Il porte un masque
? Pourquoi la classe rit-elle?|Léo est drôle dans l'habit|Le camion est tombé|Le pompier chante
VF Les élèves peuvent monter dans le camion.|V
VF Les pompiers viennent le samedi.|F

## 3 hiver
En hiver, certains animaux dorment presque tout le temps. L'ours, par exemple, passe l'hiver dans sa tanière. On dit qu'il hiberne. La marmotte dort aussi dans un trou sous la terre. Les outardes, elles, ne dorment pas: elles s'envolent vers le sud où il fait plus chaud. Le lièvre, lui, reste dehors, et son poil devient blanc comme la neige. Cela le cache de ses ennemis.
? Où l'ours passe-t-il l'hiver?|Dans sa tanière|Dans un arbre|Dans un lac
? Que font les outardes?|Elles s'envolent vers le sud|Elles hibernent|Elles creusent un trou
? De quelle couleur devient le poil du lièvre?|Blanc|Brun|Noir
? Pourquoi le poil du lièvre devient-il blanc?|Pour se cacher de ses ennemis|Pour faire joli|Pour mieux dormir
? Où dort la marmotte?|Dans un trou sous la terre|Sur une branche|Dans la maison
? Que veut dire hiberner?|Dormir tout l'hiver|Chanter tout l'hiver|Voyager tout l'hiver
VF Le lièvre s'envole vers le sud.|F
VF Les outardes ne dorment pas en hiver.|V

## 3 ferme3
Cette fin de semaine, la famille de Clara visite une ferme laitière. Le fermier explique que les vaches doivent être traites deux fois par jour, le matin et le soir. Clara touche un veau tout doux. Dans la grange, il y a aussi des poules, des cochons et un vieux cheval nommé Tonnerre. Clara donne une carotte à Tonnerre. Le cheval la mange en un clin d'œil. Clara rit parce que la langue du cheval la chatouille.
? Pourquoi trait-on les vaches?|Pour avoir leur lait|Pour avoir leur laine|Pour avoir des œufs
? Combien de fois par jour trait-on les vaches?|Deux fois|Une fois|Quatre fois
? Comment s'appelle le cheval?|Tonnerre|Éclair|Biscuit
? Que mange le cheval?|Une carotte|Une pomme|Un biscuit
? Quels autres animaux Clara voit-elle?|Des poules et des cochons|Des lions|Des dauphins
? Pourquoi Clara rit-elle?|La langue du cheval la chatouille|Le fermier fait une blague|Le veau saute
VF Clara visite une ferme laitière.|V
VF Le cheval est jeune.|F

## 3 avion
Pour la première fois, Eliot prend l'avion avec sa mère. À l'aéroport, ils font la file pour montrer leurs billets. Ils embarquent et s'assoient près d'un hublot. L'avion roule vite, puis il décolle. Eliot voit les maisons devenir toutes petites. Une agente de bord lui apporte un jus de pomme. Deux heures plus tard, l'avion se pose à Vancouver, où Eliot va voir sa tante.
? Avec qui Eliot voyage-t-il?|Sa mère|Son père|Sa tante
? Où s'assoient-ils?|Près d'un hublot|Au fond de l'avion|Dans le poste de pilotage
? Que voit Eliot par le hublot?|Les maisons toutes petites|Un dinosaure|Un bateau géant
? Pourquoi les maisons semblent-elles petites?|L'avion est haut dans le ciel|Elles rapetissent|Eliot est grand
? Que boit Eliot?|Un jus de pomme|Un lait|Un chocolat chaud
? Combien de temps dure le vol?|Deux heures|Dix minutes|Une journée
? Où va Eliot?|À Vancouver|À Montréal|À Québec
VF C'est le premier voyage en avion d'Eliot.|V

## 3 meteo
Dans la classe de Madame Julie, on note la météo chaque jour. Lundi, il fait soleil. Mardi, il pleut toute la journée. Mercredi, des nuages gris couvrent le ciel, mais il ne pleut pas. Jeudi, un vent fort fait voler les feuilles. Vendredi, le ciel est tout bleu et il fait très chaud. Les élèves dessinent un petit symbole pour chaque journée. À la fin de la semaine, ils comptent: il y a eu deux jours de soleil.
? Que note-t-on chaque jour?|La météo|Les devoirs|Les anniversaires
? Quel jour pleut-il toute la journée?|Mardi|Lundi|Jeudi
? Que fait le vent jeudi?|Il fait voler les feuilles|Il casse un arbre|Il apporte de la neige
? Comment est le ciel mercredi?|Couvert de nuages gris|Tout bleu|Plein d'étoiles
? Quel jour fait-il très chaud?|Vendredi|Mercredi|Mardi
? Combien de jours de soleil y a-t-il eu?|Deux|Quatre|Un
? Pourquoi dessine-t-on un symbole?|Pour montrer la météo du jour|Pour jouer au bingo|Pour décorer la porte
VF Mercredi, il pleut.|F
`;

const apo = (t) => t.replace(/'/g, '’');
const POOLS = { 1: [], 2: [], 3: [] };
const OLD_SHORT = new Set(['minou', 'bonhomme', 'hockey', 'ecole', 'pluie', 'biblio']);
for (const tx of TEXTS) {
  POOLS[OLD_SHORT.has(tx.id) ? 1 : 2].push({
    id: tx.id,
    t: tx.t,
    qs: tx.qs.map(([p, ok, a, b]) => ({ p, ok, w: [a, b] })),
  });
}
for (const block of NEW_TEXTS.split('\n## ').map((b, i) => (i === 0 ? b.replace(/^[\s\S]*?## /, '') : b)).filter((b) => b.trim())) {
  const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
  const [lvl, id] = lines[0].split(' ');
  const entry = { id, t: apo(lines[1]), qs: [] };
  for (const l of lines.slice(2)) {
    if (l.startsWith('VF ')) {
      const [s, v] = l.slice(3).split('|');
      entry.qs.push({ vf: true, s: apo(s), v: v === 'V' });
    } else if (l.startsWith('? ')) {
      const [p, ok, a, b] = l.slice(2).split('|');
      entry.qs.push({ p: apo(p), ok: apo(ok), w: [apo(a), apo(b)] });
    }
  }
  POOLS[Number(lvl)].push(entry);
}
function f8Read(R, level) {
  const tx = R.pick(POOLS[level]);
  const qi = R.int(0, tx.qs.length - 1);
  const q = tx.qs[qi];
  const o = (t) => ({ text: t, say: say(t) });
  if (q.vf) {
    const prompt = `Vrai ou faux? ${q.s}`;
    return {
      type: 'choice',
      key: `f8-${tx.id}-${qi}`,
      prompt,
      say: say(`${tx.t} Vrai ou faux? ${q.s}`),
      stimulus: { text: tx.t },
      options: [o('Vrai'), o('Faux')],
      answer: q.v ? 0 : 1,
      fixedOrder: true,
      cols: 2,
    };
  }
  return mkChoice(R, `f8-${tx.id}-${qi}`, q.p, o(q.ok), q.w.map(o), {
    say: say(`${tx.t} ${q.p}`),
    stimulus: { text: tx.t },
  });
}
const f8 = {
  id: 'f8',
  icon: '📖',
  title: { fr: 'Je lis', en: 'I read' },
  pfeq: 'Lecture — compréhension de courts textes (qui, quoi, où, quand, pourquoi, vrai ou faux) (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [(R) => f8Read(R, 1)],
    2: [(R) => f8Read(R, 2)],
    3: [(R) => f8Read(R, 3)],
  }),
};

/* ================================================================== */
/*  f9 — Les mots                                                      */
/* ================================================================== */
const PAIRS = [
  ['grand', 'petit', 'taille'], ['long', 'court', 'taille'], ['haut', 'bas', 'taille'], ['gros', 'mince', 'taille'],
  ['chaud', 'froid', 'temp'],
  ['jour', 'nuit', 'temps'], ['tôt', 'tard', 'temps'], ['début', 'fin', 'temps'],
  ['content', 'triste', 'emotion'], ['rire', 'pleurer', 'emotion'], ['aimer', 'détester', 'emotion'],
  ['ouvert', 'fermé', 'etat'], ['plein', 'vide', 'etat'], ['propre', 'sale', 'etat'], ['sec', 'mouillé', 'etat'],
  ['dur', 'mou', 'etat'], ['lourd', 'léger', 'etat'],
  ['monter', 'descendre', 'lieu'], ['entrer', 'sortir', 'lieu'], ['devant', 'derrière', 'lieu'],
  ['dedans', 'dehors', 'lieu'], ['gauche', 'droite', 'lieu'],
  ['beau', 'laid', 'aspect'], ['jeune', 'vieux', 'aspect'], ['noir', 'blanc', 'aspect'],
  ['vite', 'lent', 'force'], ['fort', 'faible', 'force'],
];
const ANT_ITEMS = PAIRS.flatMap(([a, b, g]) => [
  { q: a, a: b, g },
  { q: b, a: a, g },
]);
const ALL_ANT_WORDS = PAIRS.flatMap(([a, b, g]) => [
  { t: a, g },
  { t: b, g },
]);
function f9Antonym(R, n) {
  const it = R.pick(ANT_ITEMS);
  const wrong = R.sample(ALL_ANT_WORDS.filter((x) => x.g !== it.g), n - 1);
  const o = (t) => ({ text: t, say: say(t) });
  return mkChoice(R, `f9-a-${it.q}`, `Quel est le contraire de « ${it.q} »?`, o(it.a), wrong.map((x) => o(x.t)), {
    say: say(`Quel est le contraire de ${it.q}?`),
    cols: n === 3 ? 3 : 2,
  });
}
function f9AntonymLetters(R) {
  const it = R.pick(ANT_ITEMS.filter((x) => Array.from(x.a).length <= 7));
  return {
    type: 'order',
    key: `f9-al-${it.q}`,
    prompt: `Écris le contraire de « ${it.q} ».`,
    say: say(`Écris le contraire de ${it.q}.`),
    tiles: Array.from(it.a),
    extra: R.sample(ALPHA.filter((c) => !it.a.includes(c)), 2),
    joiner: '',
  };
}
const AMBIG = new Set(['tomate', 'concombre', 'aubergine', 'poivron', 'champignon', 'maïs', 'piment', 'avocat', 'tente', 'château', 'luge', 'patin', 'ski', 'érable', 'dinosaure', 'tyrannosaure', 'cœur', 'bras', 'pirate', 'dragon', 'licorne']);
const W9 = W.filter((w) => !AMBIG.has(w.text));
const CATS = [
  { id: 'animal', label: 'Les animaux', emoji: '🐾', phrase: 'un animal' },
  { id: 'fruit', label: 'Les fruits', emoji: '🍎', phrase: 'un fruit' },
  { id: 'legume', label: 'Les légumes', emoji: '🥕', phrase: 'un légume' },
  { id: 'vet', label: 'Les vêtements', emoji: '🧥', phrase: 'un vêtement' },
  { id: 'trans', label: 'Les transports', emoji: '🚗', phrase: 'un moyen de transport' },
  { id: 'nature', label: 'La nature', emoji: '🌳', phrase: 'dans la nature', wrong: ['trans', 'vet', 'ecole', 'musique', 'objet', 'maison', 'food'] },
  { id: 'maison', label: 'La maison', emoji: '🏠', phrase: 'dans la maison', wrong: ['nature', 'trans'] },
  { id: 'corps', label: 'Le corps', emoji: '🧍', phrase: 'une partie du corps' },
  { id: 'metier', label: 'Les métiers', emoji: '👷', phrase: 'un métier', wrong: ['animal', 'fruit', 'vet', 'trans', 'nature', 'objet', 'maison'] },
];
const w9ByCat = (id) => W9.filter((w) => w.cat === id);
function f9Sort(R, nb, counts, fixedIds) {
  const cats = fixedIds ? fixedIds.map((id) => CATS.find((c) => c.id === id)) : R.sample(CATS, nb);
  const groups = cats.map((c, i) =>
    R.sample(w9ByCat(c.id), counts[i]).map((w) => ({ text: w.text, emoji: w.emoji, say: say(w.text) })),
  );
  return mkSort(
    R,
    `f9-s-${cats.map((c) => c.id).join('+')}-${sortedKey(groups.flat().map((x) => x.text))}`,
    'Classe chaque mot dans le bon groupe.',
    cats.map((c) => ({ text: c.label, emoji: c.emoji })),
    groups,
    { say: say('Classe chaque mot dans le bon groupe.') },
  );
}
function f9Image(R, level) {
  let w;
  let wrong;
  if (level === 3) {
    const cat = R.pick(CATS.filter((c) => w9ByCat(c.id).length >= 4));
    const pool = w9ByCat(cat.id);
    w = R.pick(pool);
    wrong = R.sample(pool.filter((x) => x !== w && compat(w, x)), 3);
  } else {
    w = R.pick(W9);
    wrong = R.sample(W9.filter((x) => x.cat !== w.cat && compat(w, x)), level === 1 ? 2 : 3);
  }
  const o = (x) => ({ text: x.text, say: say(x.text) });
  return mkChoice(R, `f9-i-${w.text}`, 'Quel mot va avec l’image?', o(w), wrong.map(o), {
    say: say('Quel mot va avec l’image?'),
    stimulus: { emoji: w.emoji },
    cols: level === 1 ? 3 : 2,
  });
}
function f9Which(R) {
  const cat = R.pick(CATS);
  const w = R.pick(w9ByCat(cat.id));
  const wrong = R.sample(W9.filter((x) => x.cat !== cat.id && (!cat.wrong || cat.wrong.includes(x.cat)) && compat(w, x)), 3);
  const o = (x) => ({ text: x.text, emoji: x.emoji, say: say(x.text) });
  return mkChoice(R, `f9-q-${cat.id}-${w.text}`, `Lequel est ${cat.phrase}?`, o(w), wrong.map(o), {
    say: say(`Lequel est ${cat.phrase}?`),
    cols: 2,
  });
}
function f9Intruder(R) {
  const cat = R.pick(CATS.filter((c) => w9ByCat(c.id).length >= 4));
  const group = R.sample(w9ByCat(cat.id), 3);
  const odd = R.pick(W9.filter((x) => x.cat !== cat.id));
  const o = (x) => ({ text: x.text, say: say(x.text) });
  return mkChoice(R, `f9-x-${sortedKey([...group, odd].map((x) => x.text))}`, 'Quel mot ne va pas avec les autres?', o(odd), group.map(o), {
    say: say('Quel mot ne va pas avec les autres?'),
    cols: 2,
  });
}
const f9 = {
  id: 'f9',
  icon: '🧩',
  title: { fr: 'Les mots', en: 'Words' },
  pfeq: 'Lecture / écriture — vocabulaire : contraires, catégories de mots, image et mot (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [(R) => f9Antonym(R, 3), (R) => f9Sort(R, 2, [2, 2], ['animal', 'fruit']), (R) => f9Image(R, 1)],
    2: [(R) => f9Antonym(R, 4), (R) => f9Sort(R, 2, [3, 3]), (R) => f9Image(R, 2), (R) => f9Which(R)],
    3: [
      (R) => f9AntonymLetters(R),
      (R) => f9Sort(R, 3, R.shuffle([2, 3, 3])),
      (R) => f9Image(R, 3),
      (R) => f9Intruder(R),
    ],
  }),
};


/* ================================================================== */
/*  f10 — L'ordre alphabétique                                         */
/* ================================================================== */
const ABC = 'abcdefghijklmnopqrstuvwxyz'.split('');
const CAP = (c) => c.toUpperCase();
const norm = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/œ/g, 'oe').toLowerCase();
const letterOpts = (R, idxCorrect, avoid, n) => {
  let near = [];
  for (let r = 4; r <= 26 && near.length < n; r++) {
    near = ABC.map((c, i) => ({ c, i })).filter((x) => Math.abs(x.i - idxCorrect) <= r && x.i !== idxCorrect && !avoid.includes(x.i));
  }
  return R.sample(near, n).map((x) => ({ text: CAP(x.c) }));
};
function f10Neighbor(R, n, lo, hi) {
  const after = R.chance(0.5);
  const i = R.int(after ? lo : Math.max(lo, 1), after ? Math.min(hi, 24) : hi);
  const ans = after ? i + 1 : i - 1;
  const q = mkChoice(
    R,
    `f10-n-${after ? 'ap' : 'av'}-${ABC[i]}`,
    `Quelle lettre vient ${after ? 'juste après' : 'juste avant'} « ${CAP(ABC[i])} » dans l’alphabet?`,
    { text: CAP(ABC[ans]) },
    letterOpts(R, ans, [i], n - 1),
    { say: say(`Quelle lettre vient ${after ? 'juste après' : 'juste avant'} la lettre ${CAP(ABC[i])} dans l’alphabet?`), cols: n },
  );
  q.stimulus = { text: CAP(ABC[i]) };
  return q;
}
function f10Missing(R, len, hi) {
  const start = R.int(0, Math.min(hi, 26 - len));
  const seq = ABC.slice(start, start + len);
  const hole = R.int(1, len - 2);
  const ans = start + hole;
  const shown = seq.map((c, k) => (k === hole ? '＿' : CAP(c))).join('  ');
  return mkChoice(R, `f10-m-${start}-${len}-${hole}`, 'Quelle lettre manque?', { text: CAP(ABC[ans]) }, letterOpts(R, ans, seq.map((c) => ABC.indexOf(c)), 3), {
    say: say('Quelle lettre manque dans l’alphabet?'),
    stimulus: { text: shown },
    cols: 2,
  });
}
function f10Between(R) {
  const i = R.int(0, 23);
  const mid = i + 1;
  return mkChoice(R, `f10-b-${ABC[i]}`, `Quelle lettre est entre « ${CAP(ABC[i])} » et « ${CAP(ABC[i + 2])} »?`, { text: CAP(ABC[mid]) }, letterOpts(R, mid, [i, i + 2], 3), {
    say: say(`Quelle lettre est entre ${CAP(ABC[i])} et ${CAP(ABC[i + 2])}?`),
    cols: 2,
  });
}
function f10OrderLetters(R, n, lo, hi) {
  const idx = R.sample(ABC.map((_, i) => i).filter((i) => i >= lo && i <= hi), n).sort((a, b) => a - b);
  return {
    type: 'order',
    key: `f10-l-${idx.join('.')}`,
    prompt: 'Mets les lettres dans l’ordre de l’alphabet.',
    say: say('Mets les lettres dans l’ordre de l’alphabet.'),
    tiles: idx.map((i) => CAP(ABC[i])),
    joiner: ' ',
  };
}
const W10 = W.filter((w) => /^[a-zéèêô]/.test(w.text) && !/[œ ]/.test(w.text));
function f10FirstLetter(R, n) {
  const w = R.pick(W10.filter((x) => /^[a-z]/.test(x.text) && !/^(ch|h)/.test(x.text)));
  const c = w.text[0];
  const idx = ABC.indexOf(c);
  return mkChoice(R, `f10-f-${w.text}`, 'Avec quelle lettre commence ce mot?', { text: CAP(c) }, letterOpts(R, idx, [], n - 1), {
    say: say(`Avec quelle lettre commence le mot ${w.text}?`),
    stimulus: { emoji: w.emoji },
    cols: n,
  });
}
const byFirst = (() => {
  const m = {};
  for (const w of W10) (m[norm(w.text)[0]] ||= []).push(w);
  return m;
})();
// n mots à premières lettres toutes différentes
function pickDistinctFirst(R, n) {
  const letters = R.sample(Object.keys(byFirst), n);
  return letters.map((l) => R.pick(byFirst[l]));
}
// n mots qui commencent par la même lettre, deuxièmes lettres différentes
function pickSameFirst(R, n) {
  for (let t = 0; t < 100; t++) {
    const l = R.pick(Object.keys(byFirst).filter((k) => byFirst[k].length >= n));
    const seen = new Set();
    const out = [];
    for (const w of R.shuffle(byFirst[l])) {
      const s = norm(w.text)[1];
      if (!seen.has(s)) {
        seen.add(s);
        out.push(w);
      }
    }
    if (out.length >= n) return out.slice(0, n);
  }
  return pickDistinctFirst(R, n);
}
const sortW = (ws) => ws.slice().sort((a, b) => (norm(a.text) < norm(b.text) ? -1 : 1));
function f10OrderWords(R, ws, emoji) {
  const sorted = sortW(ws);
  return {
    type: 'order',
    key: `f10-w-${sorted.map((w) => w.text).join('.')}`,
    prompt: 'Range les mots dans l’ordre alphabétique, comme dans un dictionnaire.',
    say: say('Range les mots dans l’ordre alphabétique, comme dans un dictionnaire.'),
    tiles: sorted.map((w) => w.text),
    joiner: ' ',
  };
}
function f10FirstWord(R, ws) {
  const first = R.chance(0.5);
  const sorted = sortW(ws);
  const target = first ? sorted[0] : sorted[sorted.length - 1];
  const o = (w) => ({ text: w.text, say: say(w.text) });
  return mkChoice(
    R,
    `f10-x-${first ? 'p' : 'd'}-${sorted.map((w) => w.text).join('.')}`,
    first ? 'Quel mot vient en premier dans le dictionnaire?' : 'Quel mot vient en dernier dans le dictionnaire?',
    o(target),
    ws.filter((w) => w !== target).map(o),
    { say: say(first ? 'Quel mot vient en premier dans le dictionnaire?' : 'Quel mot vient en dernier dans le dictionnaire?'), cols: 2 },
  );
}
const f10 = {
  id: 'f10',
  icon: '🔠',
  title: { fr: 'L’ordre alphabétique', en: 'Alphabetical order' },
  pfeq: 'Écriture — l’ordre alphabétique : lettre avant/après, classer des mots, première et deuxième lettre (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [
      (R) => f10Neighbor(R, 3, 0, 12),
      (R) => f10Missing(R, 4, 10),
      (R) => f10OrderLetters(R, 3, 0, 12),
      (R) => f10FirstLetter(R, 3),
    ],
    2: [
      (R) => f10Neighbor(R, 4, 0, 24),
      (R) => f10Between(R),
      (R) => f10Missing(R, 5, 21),
      (R) => f10OrderLetters(R, 4, 0, 25),
      (R) => f10FirstLetter(R, 4),
      (R) => f10OrderWords(R, pickDistinctFirst(R, 3)),
      (R) => f10FirstWord(R, pickDistinctFirst(R, 3)),
    ],
    3: [
      (R) => f10OrderLetters(R, 5, 0, 25),
      (R) => f10OrderWords(R, pickDistinctFirst(R, 4)),
      (R) => f10OrderWords(R, pickSameFirst(R, 3)),
      (R) => f10OrderWords(R, pickSameFirst(R, 4)),
      (R) => f10FirstWord(R, pickSameFirst(R, 4)),
      (R) => f10FirstWord(R, pickSameFirst(R, 3)),
    ],
  }),
};

/* ================================================================== */
/*  f11 — Majuscule et ponctuation                                     */
/* ================================================================== */
const NAMES = ['Léa', 'Max', 'Zoé', 'Tom', 'Mia', 'Noé', 'Sam', 'Emma', 'Louis', 'Théo', 'Sophie', 'Lou', 'Nico', 'Jade', 'Alex', 'Chloé'];
const PLACES = ['Québec', 'Montréal', 'Gatineau', 'Laval', 'Sherbrooke', 'Rimouski', 'Saguenay', 'Drummondville'];
const DAYS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const COMMONS = ['chat', 'chien', 'école', 'ville', 'garçon', 'fille', 'lac', 'montagne', 'rue', 'pays', 'maison', 'arbre', 'livre', 'classe', 'lapin', 'tuque'];
const cap1 = (t) => t[0].toUpperCase() + t.slice(1);
const low1 = (t) => t[0].toLowerCase() + t.slice(1);
const T_DECL = [
  (n, p) => `${n} habite à ${p}.`,
  (n, p) => `${n} visite ${p} avec sa classe.`,
  (n, p) => `Nous allons à ${p} avec ${n}.`,
  (n, p) => `Mon ami ${n} vient de ${p}.`,
  (n, p) => `${n} aime beaucoup ${p}.`,
  (n, p) => `Ma cousine ${n} joue au parc de ${p}.`,
  (n) => `Ma cousine ${n} a un chat gris.`,
  (n) => `${n} et moi, nous jouons au parc.`,
  (n) => `${n} mange une pomme rouge.`,
  (n) => `Mon chien aime beaucoup ${n}.`,
];
const T_ASK = [
  (n) => `Où habite ${n}?`,
  (n, p) => `Est-ce que ${n} aime ${p}?`,
  (n) => `Quel âge a ${n}?`,
  (n, p) => `Quand va-t-on à ${p}?`,
  (n) => `As-tu vu ${n}?`,
  (n) => `Pourquoi ${n} pleure-t-il?`,
];
const T_EXC = [
  (n) => `Bravo ${n}!`,
  (n) => `Attention ${n}!`,
  (n, p) => `Quelle belle ville que ${p}!`,
  (n) => `Youpi, ${n} a gagné!`,
  (n) => `Quel beau dessin, ${n}!`,
];
const T_DAY = [
  (n, p, d) => `${n} va à l’école le ${d}.`,
  (n, p, d) => `Nous allons au chalet le ${d}.`,
  (n, p, d) => `Le ${d}, ${n} joue au hockey.`,
  (n, p, d) => `Papa travaille le ${d} à ${p}.`,
];
function f11Sentence(R, kind) {
  const n = R.pick(NAMES);
  const p = R.pick(PLACES);
  const d = R.pick(DAYS);
  let s;
  if (kind === 'decl') s = R.pick(T_DECL)(n, p);
  else if (kind === 'ask') s = R.pick(T_ASK)(n, p);
  else if (kind === 'exc') s = R.pick(T_EXC)(n, p);
  else s = R.pick(T_DAY)(n, p, d);
  const bads = [];
  if (low1(s) !== s) bads.push(low1(s));
  if (s.includes(n) && !s.startsWith(n)) bads.push(s.replace(n, low1(n)));
  else if (s.includes(p)) bads.push(s.replace(p, low1(p)));
  if (kind === 'day') bads.push(s.replace(d, cap1(d)));
  const end = s.slice(-1);
  if (end === '.' || end === '?' || end === '!') {
    const other = end === '.' ? '?' : end === '?' ? '.' : '.';
    bads.push(s.slice(0, -1) + other);
    bads.push(s.slice(0, -1));
  }
  const uniqBads = uniq(bads).filter((b) => b !== s);
  return mkChoice(R, `f11-s-${s}`, 'Quelle phrase est bien écrite?', { text: s, say: say(s) }, R.sample(uniqBads, 3).map((b) => ({ text: b, say: say(b) })), {
    say: say('Quelle phrase est bien écrite?'),
  });
}
function f11Sign(R, three) {
  const k = R.pick(three ? ['d', 'q', 'e'] : ['d', 'q']);
  const base = k === 'd' ? R.pick(ALL_SENT).slice(0, -1) : k === 'q' ? R.pick(ASK) : R.pick(EXC);
  const options = [{ text: 'Un point  ( . )' }, { text: 'Un point d’interrogation  ( ? )' }];
  if (three) options.push({ text: 'Un point d’exclamation  ( ! )' });
  return {
    type: 'choice',
    key: `f11-p-${three ? 3 : 2}-${base}`,
    prompt: 'Complète la phrase avec le bon signe.',
    say: say(`${base}${k === 'd' ? '.' : k === 'q' ? '?' : '!'}`),
    stimulus: { text: base },
    options,
    answer: k === 'd' ? 0 : k === 'q' ? 1 : 2,
    fixedOrder: true,
    cols: options.length,
  };
}
function f11Word(R) {
  const kind = R.pick(['name', 'name', 'place', 'common', 'common', 'common']);
  if (kind === 'name') {
    const n = R.pick(NAMES);
    return mkChoice(R, `f11-w-${n}`, 'C’est le prénom d’un enfant. Comment l’écrire?', { text: n, say: say(n) }, [{ text: low1(n), say: say(n) }], { say: say('C’est le prénom d’un enfant. Comment l’écrire?'), cols: 2 });
  }
  if (kind === 'place') {
    const p = R.pick(PLACES);
    return mkChoice(R, `f11-w-${p}`, 'C’est le nom d’une ville. Comment l’écrire?', { text: p, say: say(p) }, [{ text: low1(p), say: say(p) }], { say: say('C’est le nom d’une ville. Comment l’écrire?'), cols: 2 });
  }
  const w = R.pick(W.filter((x) => ['animal', 'fruit', 'vet', 'trans'].includes(x.cat)));
  const what = { animal: 'un animal', fruit: 'un fruit', vet: 'un vêtement', trans: 'un moyen de transport' }[w.cat];
  return mkChoice(R, `f11-w-${w.text}`, `C’est ${what}. Comment l’écrire?`, { text: w.text, say: say(w.text) }, [{ text: cap1(w.text), say: say(w.text) }], {
    say: say(`C’est ${what}. Comment l’écrire?`),
    stimulus: { emoji: w.emoji },
    cols: 2,
  });
}
function f11SortProper(R, n, twist) {
  const half = n / 2;
  const proper = R.sample([...NAMES, ...PLACES], half).map((t) => ({ text: low1(t), say: say(t) }));
  const pool = twist ? [...COMMONS, ...DAYS, ...MONTHS, 'français', 'anglais'] : COMMONS;
  const commons = R.sample(pool, n - half).map((t) => ({ text: t, say: say(t) }));
  return mkSort(
    R,
    `f11-t-${twist ? 3 : 2}-${sortedKey([...proper, ...commons].map((x) => x.text))}`,
    'Classe les mots : prennent-ils une majuscule?',
    [
      { text: 'Majuscule (nom propre)', emoji: '🅰️' },
      { text: 'Pas de majuscule', emoji: '🔡' },
    ],
    [proper, commons],
    { say: say('Classe les mots : prennent-ils une majuscule?') },
  );
}
function f11DayRule(R) {
  const d = R.pick([...DAYS, ...MONTHS]);
  const isDay = DAYS.includes(d);
  return mkChoice(R, `f11-d-${d}`, `Comment écrire ce ${isDay ? 'jour' : 'mois'} dans une phrase?`, { text: d, say: say(d) }, [{ text: cap1(d), say: say(d) }], {
    say: say(`Comment écrire ce ${isDay ? 'jour' : 'mois'} dans une phrase?`),
    cols: 2,
  });
}
const f11 = {
  id: 'f11',
  icon: '❗',
  title: { fr: 'Majuscule et ponctuation', en: 'Capitals and punctuation' },
  pfeq: 'Écriture — majuscule (début de phrase, noms propres), point, point d’interrogation, point d’exclamation (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [(R) => f11Sign(R, false), (R) => f11Word(R), (R) => f11Word(R), (R) => f11Sentence(R, 'decl')],
    2: [
      (R) => f11Sentence(R, 'decl'),
      (R) => f11Sentence(R, 'ask'),
      (R) => f11Sign(R, true),
      (R) => f11SortProper(R, 6, false),
      (R) => f11Word(R),
    ],
    3: [
      (R) => f11Sentence(R, 'decl'),
      (R) => f11Sentence(R, 'ask'),
      (R) => f11Sentence(R, 'exc'),
      (R) => f11Sentence(R, 'day'),
      (R) => f11SortProper(R, 8, true),
      (R) => f11DayRule(R),
    ],
  }),
};

/* ================================================================== */
/*  f12 — Les homophones                                               */
/* ================================================================== */
const HOM = {
  a: {
    forms: ['a', 'à'],
    tip: 'a ou à? (essaie avec « avait »)',
    s: [
      ['Léa ___ un chat.', 'a'], ['Max va ___ l’école.', 'à'], ['Papa ___ faim.', 'a'], ['Nous allons ___ la piscine.', 'à'],
      ['Mon frère ___ sept ans.', 'a'], ['Je donne un biscuit ___ Zoé.', 'à'], ['Le chien ___ une grosse balle.', 'a'],
      ['Elle joue ___ la poupée.', 'à'], ['Tom ___ perdu sa tuque.', 'a'], ['Ma sœur est ___ la maison.', 'à'],
      ['Le bébé ___ sommeil.', 'a'], ['Il parle ___ son ami.', 'à'], ['Maman ___ acheté du lait.', 'a'],
      ['Nous jouons ___ cache-cache.', 'à'], ['Le lapin ___ de longues oreilles.', 'a'], ['Papa pense ___ son travail.', 'à'],
      ['Zoé ___ fait un beau dessin.', 'a'], ['Je vais ___ la patinoire.', 'à'], ['Le hibou ___ de grands yeux.', 'a'],
      ['Ils arrivent ___ midi.', 'à'], ['Mon ami ___ un vélo bleu.', 'a'], ['Léo lit une histoire ___ sa sœur.', 'à'],
      ['Elle ___ chaud.', 'a'], ['Nous mangeons ___ sept heures.', 'à'], ['Cette maison ___ trois fenêtres.', 'a'],
      ['Je pense ___ mes vacances.', 'à'], ['La classe ___ une nouvelle enseignante.', 'a'], ['Il ressemble ___ son père.', 'à'],
      ['Papa ___ une grande barbe.', 'a'], ['Nous allons ___ pied.', 'à'],
    ],
  },
  e: {
    forms: ['et', 'est'],
    tip: 'et ou est? (essaie avec « était »)',
    s: [
      ['Léa ___ contente.', 'est'], ['Max ___ Zoé jouent.', 'et'], ['Le ciel ___ bleu.', 'est'], ['Papa ___ maman sont là.', 'et'],
      ['Le chat ___ gris.', 'est'], ['Je mange une pomme ___ une poire.', 'et'], ['Mon frère ___ grand.', 'est'],
      ['Tom ___ Sam sont amis.', 'et'], ['La soupe ___ chaude.', 'est'], ['Il a un chien ___ un chat.', 'et'],
      ['Le bébé ___ fatigué.', 'est'], ['Nous aimons la neige ___ le hockey.', 'et'], ['Ma sœur ___ à la maison.', 'est'],
      ['Le lait ___ froid.', 'est'], ['Léa ___ Mia chantent.', 'et'], ['Elle ___ en retard.', 'est'],
      ['Le gâteau ___ très bon.', 'est'], ['Il a des mitaines ___ une tuque.', 'et'], ['Mon papa ___ pompier.', 'est'],
      ['Le jus ___ dans le frigo.', 'est'], ['J’ai un crayon ___ une règle.', 'et'], ['La lune ___ ronde.', 'est'],
      ['Nico ___ sa mère font un gâteau.', 'et'], ['Où ___ mon sac?', 'est'], ['L’hiver ___ froid.', 'est'],
      ['Nous avons du pain ___ du fromage.', 'et'], ['La neige ___ blanche.', 'est'], ['Tu manges ___ tu bois.', 'et'],
      ['Mon chien ___ gentil.', 'est'], ['Zoé ___ Léo dessinent.', 'et'],
    ],
  },
  s: {
    forms: ['son', 'sont'],
    tip: 'son ou sont? (essaie avec « étaient »)',
    s: [
      ['Léa met ___ manteau.', 'son'], ['Les enfants ___ contents.', 'sont'], ['Max range ___ vélo.', 'son'],
      ['Mes amis ___ à l’école.', 'sont'], ['Papa lave ___ camion.', 'son'], ['Les pommes ___ rouges.', 'sont'],
      ['Le chien mange ___ os.', 'son'], ['Elles ___ en classe.', 'sont'], ['Zoé cherche ___ chat.', 'son'],
      ['Les fleurs ___ belles.', 'sont'], ['Tom prend ___ sac.', 'son'], ['Ils ___ au parc.', 'sont'],
      ['Mon frère aime ___ livre.', 'son'], ['Les oiseaux ___ dans l’arbre.', 'sont'], ['Le bébé tient ___ biberon.', 'son'],
      ['Les poissons ___ dans l’eau.', 'sont'], ['Max cherche ___ ami.', 'son'], ['Mes bottes ___ mouillées.', 'sont'],
      ['L’enseignante lit ___ histoire.', 'son'], ['Les élèves ___ dans la cour.', 'sont'], ['Sam range ___ cahier.', 'son'],
      ['Les nuages ___ gris.', 'sont'],
    ],
  },
  o: {
    forms: ['ou', 'où'],
    tip: 'ou ou où? (ou = ou bien; où = un endroit)',
    s: [
      ['Veux-tu du lait ___ du jus?', 'ou'], ['___ est mon sac?', 'Où'], ['Tu préfères le chat ___ le chien?', 'ou'],
      ['___ vas-tu?', 'Où'], ['Je prends une pomme ___ une poire.', 'ou'], ['___ habites-tu?', 'Où'],
      ['Il neige ___ il pleut?', 'ou'], ['Voici la maison ___ j’habite.', 'où'], ['Le chien dort dans le salon ___ dans la cuisine.', 'ou'],
      ['___ est la patinoire?', 'Où'], ['Veux-tu jouer au hockey ___ au ballon?', 'ou'], ['___ as-tu mis ma tuque?', 'Où'],
      ['C’est l’école ___ j’apprends à lire.', 'où'], ['Tu viens à pied ___ en autobus?', 'ou'], ['Papa, ___ es-tu?', 'où'],
      ['Prends le rouge ___ le bleu.', 'ou'], ['Le parc ___ nous jouons est beau.', 'où'], ['Du pain ___ des biscuits?', 'ou'],
      ['Dis-moi ___ tu vas.', 'où'],
    ],
  },
  n: {
    forms: ['on', 'ont'],
    tip: 'on ou ont? (essaie avec « avaient »)',
    s: [
      ['___ joue dehors.', 'On'], ['Les enfants ___ faim.', 'ont'], ['___ mange une crêpe.', 'On'], ['Ils ___ un gros chien.', 'ont'],
      ['___ va au parc ce matin.', 'On'], ['Mes amis ___ un ballon.', 'ont'], ['Les filles ___ chaud.', 'ont'], ['___ prend l’autobus.', 'On'],
      ['Elles ___ de beaux dessins.', 'ont'], ['___ dessine un bonhomme de neige.', 'On'], ['Les chats ___ soif.', 'ont'],
      ['Les élèves ___ un cahier.', 'ont'], ['___ part en vacances demain.', 'On'], ['Ils ___ gagné le match.', 'ont'],
      ['Mes parents ___ une grande maison.', 'ont'], ['___ danse dans la cuisine.', 'On'], ['Les oiseaux ___ des plumes.', 'ont'],
      ['Samedi, ___ va au chalet.', 'on'], ['Elles ___ perdu leurs mitaines.', 'ont'],
    ],
  },
};
const fillIn = (s, w) => s.replace('___', w);
function f12Fill(R, groups) {
  const gk = R.pick(groups);
  const g = HOM[gk];
  const [s, ok] = R.pick(g.s);
  const bad = g.forms.find((f) => f.toLowerCase() !== ok.toLowerCase());
  const badCased = ok[0] === ok[0].toUpperCase() ? cap1(bad) : bad;
  return mkChoice(R, `f12-f-${s}`, `Complète : ${g.tip}`, { text: ok }, [{ text: badCased }], {
    say: say(fillIn(s, ok)),
    stimulus: { text: s },
    cols: 2,
  });
}
function f12Sentence(R, groups) {
  const gk = R.pick(groups);
  const g = HOM[gk];
  const [s, ok] = R.pick(g.s);
  const bad = g.forms.find((f) => f.toLowerCase() !== ok.toLowerCase());
  const badCased = ok[0] === ok[0].toUpperCase() ? cap1(bad) : bad;
  const good = fillIn(s, ok);
  return mkChoice(R, `f12-p-${s}`, 'Quelle phrase est bien écrite?', { text: good, say: say(good) }, [{ text: fillIn(s, badCased), say: say(fillIn(s, badCased)) }], {
    say: say('Quelle phrase est bien écrite?'),
  });
}
const f12 = {
  id: 'f12',
  icon: '👂',
  title: { fr: 'Les homophones', en: 'Sound-alike words' },
  pfeq: 'Écriture — homophones grammaticaux : a/à, et/est, son/sont, on/ont, ou/où (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [(R) => f12Fill(R, ['a', 'e']), (R) => f12Fill(R, ['a', 'e']), (R) => f12Sentence(R, ['a', 'e'])],
    2: [(R) => f12Fill(R, ['a', 'e', 's', 'o']), (R) => f12Fill(R, ['s', 'o']), (R) => f12Sentence(R, ['a', 'e', 's', 'o'])],
    3: [
      (R) => f12Fill(R, ['a', 'e', 's', 'o', 'n']),
      (R) => f12Fill(R, ['n', 's']),
      (R) => f12Sentence(R, ['a', 'e', 's', 'o', 'n']),
      (R) => f12Sentence(R, ['n', 'o', 's']),
    ],
  }),
};

/* ================================================================== */
/*  f13 — Contraires et familles de mots                               */
/* ================================================================== */
const ANT2 = [
  ['avant', 'après'], ['matin', 'soir'], ['été', 'hiver'], ['gagner', 'perdre'], ['donner', 'prendre'], ['facile', 'difficile'],
  ['bruit', 'silence'], ['riche', 'pauvre'], ['gentil', 'méchant'], ['heureux', 'malheureux'], ['clair', 'foncé'],
  ['arriver', 'partir'], ['acheter', 'vendre'], ['commencer', 'finir'], ['allumer', 'éteindre'], ['cacher', 'montrer'],
  ['pousser', 'tirer'], ['avancer', 'reculer'], ['sucré', 'salé'], ['courageux', 'peureux'], ['toujours', 'jamais'],
  ['beaucoup', 'peu'], ['premier', 'dernier'], ['dessus', 'dessous'], ['loin', 'près'], ['bon', 'mauvais'], ['vrai', 'faux'],
  ['ancien', 'nouveau'], ['mince', 'épais'], ['étroit', 'large'], ['crier', 'chuchoter'], ['laver', 'salir'],
  ['construire', 'détruire'], ['remplir', 'vider'], ['nord', 'sud'],
];
const ANT2_ITEMS = ANT2.flatMap(([a, b], i) => [{ q: a, a: b, i }, { q: b, a, i }]);
const ANT2_WORDS = ANT2.flatMap(([a, b], i) => [{ t: a, i }, { t: b, i }]);
const SYN = [
  ['content', 'heureux'], ['petit', 'minuscule'], ['beau', 'joli'], ['gros', 'énorme'], ['rapide', 'vite'], ['fatigué', 'épuisé'],
  ['peur', 'frayeur'], ['parler', 'dire'], ['bicyclette', 'vélo'], ['ami', 'camarade'], ['amusant', 'drôle'], ['silence', 'calme'],
['commencer', 'débuter'], ['finir', 'terminer'], ['sauter', 'bondir'], ['cadeau', 'présent'],
  ['chemin', 'route'], ['bateau', 'navire'], ['soulier', 'chaussure'], ['regarder', 'observer'], ['lancer', 'jeter'],
];
const SYN_ITEMS = SYN.flatMap(([a, b], i) => [{ q: a, a: b, i }, { q: b, a, i }]);
const SYN_WORDS = SYN.flatMap(([a, b], i) => [{ t: a, i }, { t: b, i }]);
// racine, mots de la même famille, mots qui ressemblent mais n'en sont pas
const FAMS = [
  ['dent', ['dentiste', 'dentier', 'dentifrice'], ['dentelle']],
  ['neige', ['neiger', 'neigeux', 'déneiger', 'enneigé'], ['nage']],
  ['lait', ['laitier', 'laiterie', 'laitage'], ['laid']],
  ['jardin', ['jardinier', 'jardiner', 'jardinage'], ['jargon']],
  ['fleur', ['fleuriste', 'fleurir', 'fleuri'], ['fleuve']],
  ['chant', ['chanter', 'chanteur', 'chanson'], ['champ']],
  ['terre', ['terrain', 'enterrer', 'atterrir', 'terrasse'], ['terrible']],
  ['pluie', ['pleuvoir', 'pluvieux', 'parapluie'], ['plume']],
  ['sport', ['sportif', 'sportive', 'sportivement'], ['porte']],
  ['lire', ['lecteur', 'lecture', 'lisible'], ['lit']],
  ['manger', ['mangeur', 'mangeoire', 'mangeable'], ['manche']],
  ['courir', ['coureur', 'course', 'parcourir'], ['courage']],
  ['danser', ['danseur', 'danseuse', 'danse'], ['danger']],
  ['chat', ['chaton', 'chatte', 'chatière'], ['château']],
  ['cheval', ['chevalier', 'chevaux', 'chevaucher'], ['cheveux']],
  ['dormir', ['dortoir', 'endormi', 'dormeur'], ['dorure']],
  ['jouer', ['joueur', 'jouet', 'jouable'], ['joyeux']],
  ['musique', ['musicien', 'musical', 'musicale'], ['muscle']],
  ['soleil', ['ensoleillé', 'solaire', 'tournesol'], ['solide']],
  ['glace', ['glacial', 'glacier', 'glacé'], ['glisser']],
  ['vent', ['venteux', 'ventilateur', 'éventail'], ['ventre']],
  ['sel', ['saler', 'salière', 'salé'], ['salon']],
  ['porte', ['portier', 'portail', 'portillon'], ['porter']],
  ['bois', ['boisé', 'boiserie', 'déboiser'], ['boisson']],
  ['pied', ['piéton', 'piétiner', 'pédale'], ['pièce']],
  ['sauter', ['sauteur', 'sautiller', 'saut'], ['saucisse']],
  ['mer', ['marin', 'marée', 'maritime'], ['merci']],
  ['arbre', ['arbuste', 'arboré', 'arbrisseau'], ['arbitre']],
  ['jour', ['journée', 'journal', 'journalier'], ['jouer']],
];
const PREFIX = [
  ['faire', 'défaire'], ['plier', 'déplier'], ['coller', 'décoller'], ['boucher', 'déboucher'], ['habiller', 'déshabiller'],
  ['content', 'mécontent'], ['heureux', 'malheureux'], ['possible', 'impossible'], ['poli', 'impoli'], ['capable', 'incapable'],
  ['visible', 'invisible'], ['juste', 'injuste'], ['patient', 'impatient'], ['lisible', 'illisible'], ['légal', 'illégal'],
  ['attacher', 'détacher'], ['connu', 'inconnu'], ['honnête', 'malhonnête'], ['prévu', 'imprévu'], ['parfait', 'imparfait'],
];
const spokenOpt = (t) => ({ text: t, say: say(t) });
function f13Ant(R, n, pool, words, label) {
  const it = R.pick(pool);
  const wrong = R.sample(words.filter((x) => x.i !== it.i), n - 1);
  return mkChoice(R, `f13-${label}-${it.q}`, label === 'a' ? `Quel est le contraire de « ${it.q} »?` : `Quel mot veut dire presque la même chose que « ${it.q} »?`, spokenOpt(it.a), wrong.map((x) => spokenOpt(x.t)), {
    say: say(label === 'a' ? `Quel est le contraire de ${it.q}?` : `Quel mot veut dire presque la même chose que ${it.q}?`),
    cols: n === 3 ? 3 : 2,
  });
}
function f13AntLetters(R) {
  const it = R.pick(ANT2_ITEMS.filter((x) => Array.from(x.a).length <= 8 && !/[ -]/.test(x.a)));
  return {
    type: 'order',
    key: `f13-al-${it.q}`,
    prompt: `Écris le contraire de « ${it.q} ».`,
    say: say(`Écris le contraire de ${it.q}.`),
    tiles: Array.from(it.a),
    extra: R.sample(ALPHA.filter((c) => !it.a.includes(c)), 2),
    joiner: '',
  };
}
function f13Family(R, trap) {
  const [root, fam, look] = R.pick(FAMS);
  const members = [root, ...fam];
  const stim = R.pick(members);
  const ok = R.pick(members.filter((m) => m !== stim));
  const others = uniq(R.sample(FAMS.filter((f) => f[0] !== root), 6).map((f) => R.pick([f[0], ...f[1]]))).filter((t) => t !== look[0]);
  const wrong = trap ? [look[0], ...others.slice(0, 2)] : others.slice(0, 3);
  return mkChoice(R, `f13-f-${stim}-${ok}`, `Quel mot est de la même famille que « ${stim} »?`, spokenOpt(ok), wrong.map(spokenOpt), {
    say: say(`Quel mot est de la même famille que ${stim}?`),
    cols: 2,
  });
}
function f13Intruder(R) {
  const [root, fam, look] = R.pick(FAMS);
  const members = R.sample([root, ...fam], 3);
  const odd = R.chance(0.6) ? look[0] : R.pick(R.pick(FAMS.filter((f) => f[0] !== root))[1]);
  return mkChoice(R, `f13-x-${sortedKey([...members, odd])}`, 'Quel mot n’est pas de la même famille que les autres?', spokenOpt(odd), members.map(spokenOpt), {
    say: say('Quel mot n’est pas de la même famille que les autres?'),
    cols: 2,
  });
}
function f13SortFam(R) {
  const [a, b] = R.sample(FAMS, 2);
  const ga = R.sample(a[1], 3);
  const gb = R.sample(b[1], 3);
  return mkSort(
    R,
    `f13-s-${a[0]}-${b[0]}-${sortedKey([...ga, ...gb])}`,
    'Classe les mots dans la bonne famille.',
    [{ text: `Famille de « ${a[0]} »`, emoji: '👪' }, { text: `Famille de « ${b[0]} »`, emoji: '👪' }],
    [ga.map((t) => ({ text: t, say: say(t) })), gb.map((t) => ({ text: t, say: say(t) }))],
    { say: say('Classe les mots dans la bonne famille.') },
  );
}
function f13Prefix(R) {
  const [base, ant] = R.pick(PREFIX);
  const wrong = R.sample(PREFIX.filter((p) => p[1] !== ant), 3).map((p) => p[1]);
  return mkChoice(R, `f13-p-${base}`, `Quel est le contraire de « ${base} »? (Il commence par un petit bout de mot.)`, spokenOpt(ant), wrong.slice(0, 2).map(spokenOpt), {
    say: say(`Quel est le contraire de ${base}?`),
    cols: 3,
  });
}
const f13 = {
  id: 'f13',
  icon: '🔁',
  title: { fr: 'Contraires et familles de mots', en: 'Opposites and word families' },
  pfeq: 'Lecture / écriture — vocabulaire : contraires, synonymes, mots de la même famille, préfixes dé-/in- (PFEQ 1er cycle, 2e année)',
  generate: run({
    1: [(R) => f13Ant(R, 3, ANT2_ITEMS, ANT2_WORDS, 'a'), (R) => f13Ant(R, 3, ANT2_ITEMS, ANT2_WORDS, 'a'), (R) => f13Ant(R, 3, SYN_ITEMS, SYN_WORDS, 's')],
    2: [
      (R) => f13Ant(R, 4, ANT2_ITEMS, ANT2_WORDS, 'a'),
      (R) => f13Ant(R, 4, SYN_ITEMS, SYN_WORDS, 's'),
      (R) => f13AntLetters(R),
      (R) => f13Family(R, false),
      (R) => f13Family(R, false),
    ],
    3: [
      (R) => f13Family(R, true),
      (R) => f13Intruder(R),
      (R) => f13Intruder(R),
      (R) => f13SortFam(R),
      (R) => f13Prefix(R),
      (R) => f13AntLetters(R),
    ],
  }),
};


/* ================================================================== */
/*  NIVEAUX RELEVÉS (v2)                                               */
/*  Facile = bonne fin de 2e année · Moyen = 3e année ·                */
/*  Difficile = 3e année forte / début de 4e année                     */
/*  Les fonctions ci-dessous remplacent les tables generate() plus haut */
/* ================================================================== */
const bag = (s) => s.trim().split(/\s+/);
const spk = (t) => ({ text: t, say: say(t) });
const nameKey = (arr) => sortedKey(arr);

/* ---------------- f1 : sons complexes ---------------- */
const NEUT = W.map((w) => w.text).filter(
  (t) => !/(gn|ion|oin|ouin|ph|ç|ss|[aeiouyéèêô]s[aeiouyéèêô]|c[eiéèêy]|qu|k|g[eiéèêy]|ill|ail|eil|euil|ouill|ay|oy|eau)/.test(t) && !/ /.test(t),
);
const Y_GROUPS = {
  ail: bag('travail détail chandail portail éventail épouvantail bétail vitrail gouvernail'),
  eil: bag('soleil abeille oreille réveil conseil sommeil vieille bouteille corbeille merveille pareil appareil'),
  euil: bag('écureuil fauteuil feuille chevreuil seuil deuil'),
  ouill: bag('grenouille citrouille brouillard patrouille rouille nouille chatouille fouille bouillon'),
  ill: bag('fille famille gentille brillant coquillage chenille papillon pastille vanille cheville béquille billet juillet'),
};
const Y_LABEL = { ail: 'ail', eil: 'eil / eille', euil: 'euil / euille', ouill: 'ouille', ill: 'ille' };
const P1 = {
  gn: {
    p: 'le son « gn » (comme dans « montagne »)',
    s: 'gné, comme dans montagne',
    good: bag('montagne signe ligne peigne champignon oignon agneau araignée gagner baignoire cygne vigne campagne'),
    bad: NEUT,
  },
  tion: {
    p: 'le son « sion » (comme dans « attention »)',
    s: 'sion, comme dans attention',
    good: bag('attention addition natation récréation invitation station solution nation fraction collection réaction conversation'),
    bad: NEUT,
  },
  oin: {
    p: 'le son « oin » (comme dans « coin »)',
    s: 'oin, comme dans coin',
    good: bag('coin besoin témoin rejoindre joindre lointain point pointe moins loin soin'),
    bad: NEUT,
  },
  ph: {
    p: 'le son « f » écrit avec « ph »',
    s: 'f, écrit avec p h',
    good: bag('photo éléphant phrase téléphone dauphin alphabet orphelin pharmacie phoque trophée géographie'),
    bad: bag('fleur fraise fromage feu fée café fenêtre fusée farine frite forêt fatigué fourmi'),
  },
  z: {
    p: 'le son « z » écrit avec la lettre « s » (comme dans « maison »)',
    s: 'z, écrit avec la lettre s, comme dans maison',
    good: bag('maison cuisine visage fusée oiseau musée chemise église usine vase blouse valise raisin framboise télévision'),
    bad: bag('classe tasse message passage mousse brosse dessin glisser soleil sirop salade soupe serpent sac sorcière sable'),
  },
  cs: {
    p: 'la lettre « c » qui fait le son « s »',
    s: 'la lettre c qui fait le son s',
    good: bag('cerise cinéma citron ceinture ciel centre cigogne recette glace place merci'),
    bad: bag('cadeau côté culotte canard couleur camarade café cahier camion cochon cube caramel cartable colline'),
  },
  k: {
    p: 'le son « k » (comme dans « canard »)',
    s: 'k, comme dans canard',
    good: bag('cadeau côté culotte canard couleur camarade cahier camion quatre quand musique banque raquette requin disque masque bouquet kiwi koala kayak karaté ski parka kilomètre'),
    bad: bag('cerise cinéma citron ceinture ciel centre cigogne recette glace garçon leçon glaçon maison poisson orange gentil photo montagne attention'),
  },
  gj: {
    p: 'la lettre « g » qui fait le son « j » (comme dans « rouge »)',
    s: 'la lettre g qui fait le son j, comme dans rouge',
    good: bag('girafe nageoire orange plage image gentil magie village manger étage rouge fromage gilet énergie nuage'),
    bad: bag('gâteau gomme guitare bague gorille langue vague glace grand gant dragon grenouille'),
  },
  y: {
    p: 'le son « ye » (comme dans « fille »)',
    s: 'ye, comme dans fille',
    good: Object.values(Y_GROUPS).flat(),
    bad: bag('chat maison tortue pomme livre bateau fleur auto banane lune nuage fusée tomate carotte lapin cochon'),
  },
};
function f1xContains(R, n, ids) {
  const id = R.pick(ids);
  const sp = P1[id];
  const good = R.pick(sp.good);
  const bad = R.sample(sp.bad.filter((t) => !sp.good.includes(t)), n - 1);
  return mkChoice(R, `f1x-c-${id}-${good}`, `Touche le mot où tu entends ${sp.p}.`, spk(good), bad.map(spk), {
    say: say(`Touche le mot où tu entends ${sp.s}.`),
    cols: 2,
  });
}
const F1_YE = [
  ['fam', 'ill', 'e'], ['chen', 'ill', 'e'], ['gent', 'ill', 'e'], ['pap', 'ill', 'on'], ['coqu', 'ill', 'age'], ['br', 'ill', 'ant'],
  ['van', 'ill', 'e'], ['chev', 'ill', 'e'], ['bout', 'eill', 'e'], ['ab', 'eill', 'e'], ['or', 'eill', 'e'], ['vi', 'eill', 'e'],
  ['corb', 'eill', 'e'], ['merv', 'eill', 'e'], ['gren', 'ouill', 'e'], ['citr', 'ouill', 'e'], ['patr', 'ouill', 'e'],
  ['br', 'ouill', 'ard'], ['b', 'ouill', 'on'], ['chat', 'ouill', 'e'],
];
const F1_YB = [
  ['trav', 'ail'], ['dét', 'ail'], ['chand', 'ail'], ['port', 'ail'], ['évent', 'ail'], ['sol', 'eil'], ['rév', 'eil'],
  ['cons', 'eil'], ['somm', 'eil'], ['écur', 'euil'], ['faut', 'euil'], ['chevr', 'euil'], ['s', 'euil'],
];
const F1_N = [
  ['c', 'oin', ''], ['bes', 'oin', ''], ['tém', 'oin', ''], ['rej', 'oin', 'dre'], ['j', 'oin', 'dre'], ['l', 'oin', 'tain'],
  ['tr', 'ain', ''], ['dem', 'ain', ''], ['b', 'ain', ''], ['m', 'ain', 'tenant'], ['vil', 'ain', ''], ['améric', 'ain', ''],
  ['p', 'ein', 'ture'], ['c', 'ein', 'ture'], ['fr', 'ein', ''], ['ét', 'ein', 'dre'], ['att', 'ein', 'dre'], ['p', 'ein', 'dre'],
  ['lap', 'in', ''], ['jard', 'in', ''], ['mat', 'in', ''], ['vois', 'in', ''], ['magas', 'in', ''], ['moul', 'in', ''],
  ['sap', 'in', ''], ['dauph', 'in', ''], ['chem', 'in', ''],
];
const F1_S = [
  ['gar', 'ç', 'on', ['ç', 'c', 's', 'ss']], ['le', 'ç', 'on', ['ç', 'c', 's', 'ss']], ['gla', 'ç', 'on', ['ç', 'c', 's', 'ss']],
  ['fa', 'ç', 'on', ['ç', 'c', 's', 'ss']], ['ma', 'ç', 'on', ['ç', 'c', 's', 'ss']], ['balan', 'ç', 'oire', ['ç', 'c', 's', 'ss']],
  ['fran', 'ç', 'ais', ['ç', 'c', 's', 'ss']], ['re', 'ç', 'u', ['ç', 'c', 's', 'ss']],
  ['chemi', 's', 'e', ['s', 'ss', 'z', 'c']], ['égli', 's', 'e', ['s', 'ss', 'z', 'c']], ['oi', 's', 'eau', ['s', 'ss', 'z', 'c']],
  ['fu', 's', 'ée', ['s', 'ss', 'z', 'c']], ['vi', 's', 'age', ['s', 'ss', 'z', 'c']], ['mai', 's', 'on', ['s', 'ss', 'z', 'c']],
  ['cui', 's', 'ine', ['s', 'ss', 'z', 'c']], ['mu', 's', 'ée', ['s', 'ss', 'z', 'c']], ['u', 's', 'ine', ['s', 'ss', 'z', 'c']],
  ['rai', 's', 'in', ['s', 'ss', 'z', 'c']], ['ceri', 's', 'e', ['s', 'ss', 'z', 'c']], ['framboi', 's', 'e', ['s', 'ss', 'z', 'c']],
  ['va', 's', 'e', ['s', 'ss', 'z', 'c']], ['blou', 's', 'e', ['s', 'ss', 'z', 'c']], ['vali', 's', 'e', ['s', 'ss', 'z', 'c']],
  ['cla', 'ss', 'e', ['ss', 's', 'z', 'c']], ['ta', 'ss', 'e', ['ss', 's', 'z', 'c']], ['me', 'ss', 'age', ['ss', 's', 'z', 'c']],
  ['pa', 'ss', 'age', ['ss', 's', 'z', 'c']], ['mou', 'ss', 'e', ['ss', 's', 'z', 'c']], ['bro', 'ss', 'e', ['ss', 's', 'z', 'c']],
  ['de', 'ss', 'in', ['ss', 's', 'z', 'c']], ['gli', 'ss', 'er', ['ss', 's', 'z', 'c']], ['pou', 'ss', 'ière', ['ss', 's', 'z', 'c']],
  ['cai', 'ss', 'e', ['ss', 's', 'z', 'c']], ['adre', 'ss', 'e', ['ss', 's', 'z', 'c']], ['gro', 'ss', 'e', ['ss', 's', 'z', 'c']],
  ['a', 'ss', 'iette', ['ss', 's', 'z', 'c']], ['pa', 'ss', 'er', ['ss', 's', 'z', 'c']],
  ['', 'c', 'erise', ['c', 's', 'ss', 'ç']], ['', 'c', 'inéma', ['c', 's', 'ss', 'ç']], ['', 'c', 'itron', ['c', 's', 'ss', 'ç']],
  ['', 'c', 'einture', ['c', 's', 'ss', 'ç']], ['', 'c', 'iel', ['c', 's', 'ss', 'ç']], ['', 'c', 'igogne', ['c', 's', 'ss', 'ç']],
  ['re', 'c', 'ette', ['c', 's', 'ss', 'ç']], ['gla', 'c', 'e', ['c', 's', 'ss', 'ç']], ['pla', 'c', 'e', ['c', 's', 'ss', 'ç']],
  ['', 'c', 'entre', ['c', 's', 'ss', 'ç']],
];
const F1_G = [
  ['ora', 'ge', ''], ['pla', 'ge', ''], ['ima', 'ge', ''], ['villa', 'ge', ''], ['froma', 'ge', ''], ['man', 'ge', 'r'],
  ['na', 'ge', 'oire'], ['', 'ge', 'ntil'], ['', 'gi', 'rafe'], ['', 'gi', 'let'], ['ba', 'gue', ''], ['va', 'gue', ''],
  ['', 'gui', 'tare'], ['', 'gui', 'rlande'], ['fati', 'gue', ''], ['ma', 'gi', 'e'],
];
function f1xFill(R, table, opts, tag) {
  const [pre, core, post = '', own] = R.pick(table);
  const word = pre + core + post;
  const options = own || opts;
  const wrong = R.sample(options.filter((o) => o !== core), 3);
  return mkChoice(R, `f1x-f${tag}-${word}`, `Complète le mot : ${pre}__${post}`, { text: core }, wrong.map((t) => ({ text: t })), {
    say: say(word),
    cols: 2,
  });
}
const f1xFillYE = (R) => f1xFill(R, F1_YE, ['ill', 'eill', 'ouill', 'euill'], 'y');
const f1xFillYB = (R) => f1xFill(R, F1_YB, ['ail', 'eil', 'euil', 'ouil'], 'b');
const f1xFillN = (R) => f1xFill(R, F1_N, ['oin', 'ain', 'ein', 'in'], 'n');
const f1xFillS = (R) => f1xFill(R, F1_S, null, 's');
const f1xFillG = (R) => f1xFill(R, F1_G, ['ge', 'gue', 'j', 'gi', 'gui'], 'g');
function f1xSortY(R, nb) {
  const ids = R.sample(Object.keys(Y_GROUPS), nb);
  const per = nb === 3 ? [2, 2, 3] : [3, 3];
  const sh = R.shuffle(per);
  const groups = ids.map((id, i) => R.sample(Y_GROUPS[id], sh[i]).map(spk));
  const names = groups.flat().map((x) => x.text);
  return mkSort(
    R,
    `f1x-sy-${ids.join('+')}-${nameKey(names)}`,
    'Écoute chaque mot. Classe-le selon la façon d’écrire le son « ye ».',
    ids.map((id) => ({ text: Y_LABEL[id] })),
    groups,
    { say: say('Écoute chaque mot. Classe-le selon la façon d’écrire le son ye.') },
  );
}
function f1xSortSound(R) {
  const defs = [
    ['gn', 'gn'], ['tion', 'tion'], ['oin', 'oin'], ['ph', 'ph'],
  ];
  const pick = R.sample(defs, 2);
  const groups = pick.map(([id]) => R.sample(P1[id].good, 3).map(spk));
  const names = groups.flat().map((x) => x.text);
  return mkSort(
    R,
    `f1x-ss-${pick.map((p) => p[0]).join('+')}-${nameKey(names)}`,
    'Classe chaque mot selon la lettre ou le groupe de lettres qu’il contient.',
    pick.map(([, lab]) => ({ text: lab })),
    groups,
    { say: say('Classe chaque mot selon le groupe de lettres qu’il contient.') },
  );
}
f1.generate = run({
  1: [
    (R) => f1Contains(R, 4, false, true),
    (R) => f1Sort(R, 3, R.shuffle([2, 3, 3]), false),
    (R) => f1Fill(R, true),
    (R) => f1xContains(R, 3, ['gn', 'tion', 'oin', 'ph', 'y']),
    (R) => f1xFillN(R),
    (R) => f1xSortSound(R),
  ],
  2: [
    (R) => f1xContains(R, 4, ['gn', 'tion', 'oin', 'ph', 'z', 'cs', 'k', 'gj', 'y']),
    (R) => f1xContains(R, 4, ['z', 'cs', 'k', 'gj', 'ph', 'tion']),
    (R) => f1xFillYE(R),
    (R) => f1xFillN(R),
    (R) => f1xFillS(R),
    (R) => f1xFillG(R),
    (R) => f1xSortY(R, 2),
  ],
  3: [
    (R) => f1xContains(R, 4, ['z', 'cs', 'k', 'gj', 'ph', 'tion', 'oin', 'gn']),
    (R) => f1xFillYE(R),
    (R) => f1xFillYB(R),
    (R) => f1xFillN(R),
    (R) => f1xFillS(R),
    (R) => f1xFillG(R),
    (R) => f1xSortY(R, 3),
    (R) => f1xSortY(R, 3),
  ],
});
f1.pfeq = 'Lecture / écriture — correspondances lettres-sons : gn, ill, ail, eil, euil, oin, tion, ç, g/ge/gu, s/ss, c/qu/k (PFEQ 1er cycle, 2e–3e année)';

/* ---------------- f2 : syllabes, mots longs ---------------- */
const NEWSYL = `
chocolat|cho-co-lat
kangourou|kan-gou-rou
canapé|ca-na-pé
animal|a-ni-mal
ordinateur|or-di-na-teur
éléphant|é-lé-phant
abricot|a-bri-cot
restaurant|res-tau-rant
alphabet|al-pha-bet
orignal|o-ri-gnal
tourbillon|tour-bil-lon
saucisson|sau-cis-son
autobus|au-to-bus
rhinocéros|rhi-no-cé-ros
parasol|pa-ra-sol
cinéma|ci-né-ma
ananas|a-na-nas
carnaval|car-na-val
carrefour|car-re-four
autocar|au-to-car
hôpital|hô-pi-tal
électricité|é-lec-tri-ci-té
municipal|mu-ni-ci-pal
merveilleux|mer-veil-leux
accélérateur|ac-cé-lé-ra-teur
inventeur|in-ven-teur
imprimeur|im-pri-meur
tabouret|ta-bou-ret
boulanger|bou-lan-ger
explorateur|ex-plo-ra-teur
montagnard|mon-ta-gnard
champignon|cham-pi-gnon
hérisson|hé-ris-son
perroquet|per-ro-quet
pantalon|pan-ta-lon
tournevis|tour-ne-vis
aéroport|a-é-ro-port
ambassadeur|am-bas-sa-deur
agriculteur|a-gri-cul-teur
moustachu|mous-ta-chu
dangereux|dan-ge-reux
courageux|cou-ra-geux
cauchemar|cau-che-mar
abandonné|a-ban-don-né
`;
const SYL2 = NEWSYL.trim().split('\n').map((l) => {
  const [text, s] = l.split('|');
  return { text, syl: s.split('-') };
});
const SYL2_TEXT = new Set([...SYL2.map((w) => w.text), ...W.map((w) => w.text)]);
const SYL2_ALL = uniq([...SYL2.flatMap((w) => w.syl), ...ALLSYL]);
function f2xBuild(R, lo, hi, nExtra) {
  const w = R.pick(SYL2.filter((x) => x.syl.length >= lo && x.syl.length <= hi && uniq(x.syl).length === x.syl.length));
  return {
    type: 'order',
    key: `f2x-b-${w.text}`,
    prompt: 'Écoute le mot. Remets les syllabes dans l’ordre.',
    say: say(w.text),
    tiles: w.syl.slice(),
    extra: R.sample(SYL2_ALL.filter((s) => !w.syl.includes(s)), nExtra),
    joiner: '',
  };
}
function f2xCount(R, lo, hi) {
  const w = R.pick(SYL2.filter((x) => x.syl.length >= lo && x.syl.length <= hi));
  const labels = ['1', '2', '3', '4', '5'].slice(0, Math.max(4, hi));
  return {
    type: 'choice',
    key: `f2x-n-${w.text}`,
    prompt: `Combien de syllabes entends-tu dans « ${w.text} »?`,
    say: say(w.text),
    options: labels.map((t) => ({ text: t })),
    answer: w.syl.length - 1,
    fixedOrder: true,
    cols: labels.length,
  };
}
function splitVariants(syl) {
  const out = new Set();
  for (let i = 0; i < syl.length - 1; i++) {
    const a = syl[i];
    const b = syl[i + 1];
    if (a.length > 1) {
      const s = syl.slice();
      s[i] = a.slice(0, -1);
      s[i + 1] = a.slice(-1) + b;
      out.add(s.join('-'));
    }
    if (b.length > 1) {
      const s = syl.slice();
      s[i] = a + b[0];
      s[i + 1] = b.slice(1);
      out.add(s.join('-'));
    }
  }
  out.delete(syl.join('-'));
  return [...out];
}
function f2xCut(R, lo, hi) {
  const w = R.pick(SYL2.filter((x) => x.syl.length >= lo && x.syl.length <= hi));
  const wrong = R.sample(splitVariants(w.syl), 3);
  return mkChoice(R, `f2x-cut-${w.text}`, `Quel est le bon découpage en syllabes de « ${w.text} »?`, { text: w.syl.join('-') }, wrong.map((t) => ({ text: t })), {
    say: say(w.text),
    cols: 2,
  });
}
function f2xMissing(R, lo, hi) {
  for (let t = 0; t < 40; t++) {
    const w = R.pick(SYL2.filter((x) => x.syl.length >= lo && x.syl.length <= hi));
    const i = R.int(0, w.syl.length - 1);
    const shown = w.syl.map((s, k) => (k === i ? '__' : s)).join('-');
    const cands = SYL2_ALL.filter((s) => s !== w.syl[i] && !SYL2_TEXT.has(w.syl.map((x, k) => (k === i ? s : x)).join('')));
    const wrong = R.sample(cands, 3);
    if (wrong.length < 3) continue;
    return mkChoice(R, `f2x-m-${w.text}-${i}`, 'Quelle syllabe manque dans le mot?', { text: w.syl[i] }, wrong.map((x) => ({ text: x })), {
      say: say(w.text),
      stimulus: { text: shown },
      cols: 2,
    });
  }
  return f2xCount(R, 3, 5);
}
function f2xWhich(R, N) {
  const w = R.pick(SYL2.filter((x) => x.syl.length === N));
  const wrong = R.sample(SYL2.filter((x) => x.syl.length !== N), 3);
  return mkChoice(R, `f2x-w-${N}-${w.text}`, `Touche le mot qui a ${N} syllabes.`, spk(w.text), wrong.map((x) => spk(x.text)), {
    say: say(`Touche le mot qui a ${N} syllabes.`),
    cols: 2,
  });
}
function f2xSort(R) {
  const lens = [3, 4, 5];
  const groups = lens.map((n, i) => R.sample(SYL2.filter((x) => x.syl.length === n), [2, 3, 2][i]).map((x) => spk(x.text)));
  return mkSort(
    R,
    `f2x-s-${nameKey(groups.flat().map((x) => x.text))}`,
    'Écoute chaque mot. Classe-le selon son nombre de syllabes.',
    lens.map((n) => ({ text: `${n} syllabes` })),
    groups,
    { say: say('Écoute chaque mot. Classe-le selon son nombre de syllabes.') },
  );
}
f2.generate = run({
  1: [
    (R) => f2Build(R, 3, 4, 2, false),
    (R) => f2xBuild(R, 3, 3, 2),
    (R) => f2Count(R, 4),
    (R) => f2xCount(R, 3, 4),
    (R) => f2Which(R, [2, 3]),
    (R) => f2xCut(R, 3, 3),
  ],
  2: [
    (R) => f2xBuild(R, 3, 4, 2),
    (R) => f2xCount(R, 3, 5),
    (R) => f2xCut(R, 3, 4),
    (R) => f2xMissing(R, 3, 4),
    (R) => f2xWhich(R, R.pick([3, 4])),
  ],
  3: [
    (R) => f2xBuild(R, 4, 5, 3),
    (R) => f2xBuild(R, 3, 5, 3),
    (R) => f2xCut(R, 4, 5),
    (R) => f2xMissing(R, 4, 5),
    (R) => f2xSort(R),
    (R) => f2xWhich(R, R.pick([4, 5])),
  ],
});
f2.pfeq = 'Lecture / écriture — découpage en syllabes de mots longs (3 à 5 syllabes), assemblage et syllabe manquante (PFEQ 1er cycle, 2e–3e année)';

/* ---------------- f3 : orthographe d’usage ---------------- */
const ORTHO_RAW = `
appartement|apartement,appartemant
attention|atention,attantion
aujourd’hui|aujourdhui,aujourd’huit
bibliothèque|bibliotèque,bibiothèque
camarade|camerade,camarad
chaussure|chossure,chausure
exercice|exercise,éxercice
gentil|gentill,jentil
histoire|histoir,istoire
hiver|hivaire,yver
jardin|jardain,jardein
lumière|lumiaire,lumièr
mélange|mélenge,méllange
musique|musik,musiqu
nettoyer|netoyer,nettoier
pharmacie|farmacie,pharmassie
problème|problême,problaime
question|quéstion,kestion
quelquefois|quelquefoit,quelcquefois
rapidement|rapidemant,rapidment
réponse|réponce,répons
semaine|semène,semaîne
tableau|tablo,tabeau
travail|travaille,travaïl
vacances|vacanses,vaccances
voyage|voiyage,voyaje
voisin|voisain,voizin
vêtement|vêtemant,vètement
magasin|magazin,magasain
mouchoir|mouchoire,mouchoar
comprendre|comprandre,compendre
anniversaire|aniversaire,anniverssaire
bouteille|boutelle,bouteile
chanson|chançon,chenson
chercher|chercer,chèrcher
classe|clase,classse
devoir|devoire,dévoir
difficile|dificile,difficille
douleur|douleure,dolleur
famille|famile,familie
fatigué|fatigé,fattigué
fleuve|fleuv,fleuvre
garage|garaje,garrage
général|jénéral,généralle
habiter|abiter,habitter
immeuble|imeuble,immeubble
inviter|enviter,invitter
janvier|janvié,jenvier
lentement|lentemant,lentment
neige|neije,nège
propre|propr,prope
raconter|racconter,raconnter
regarder|reguarder,regardder
saison|saizon,saisson
trouver|trouvere,trouvair
vraiment|vraimant,vrèment
écouter|ecouter,écoutter
électricité|électricitée,életricité
courageux|courageu,couragieux
dangereux|dangeureux,danjereux
bonheur|bonheure,bonneur
attendre|atandre,attendrre
acheter|achetter,ashéter
allumer|alumer,allummer
apporter|aporter,apportter
arrêter|arréter,arêter
bruit|brui,bruitt
chaque|chacque,chaqe
début|débu,debut
déjà|dèja,déja
depuis|depui,depuit
derrière|dérrière,deriere
dessin|desin,dessain
devant|devent,dévant
espace|éspace,espase
lettre|letre,lettr
longtemps|longtemp,lontemps
magnifique|magnifik,manifique
pendant|pandant,pendent
personne|persone,personnne
plusieurs|plusieur,plusieures
prendre|prandre,prendrre
réussir|réusir,réussire
sentir|santir,sentire
tempête|tempète,tempette
terminer|termminer,terminner
tomber|tonber,tombber
éléphant|élèphant,éléfant
orchestre|orquestre,orchestr
spectacle|spectacl,spéctacle
quartier|cartier,quartié
`;
const ORTHO = ORTHO_RAW.trim().split('\n').map((l) => {
  const [text, b] = l.split('|');
  return { text, bad: b.split(',') };
});
const ORTHO_LONG = ORTHO.filter((x) => x.text.length >= 8);
const F3_DBL = [
  ['allumer', 'a', 'umer', 'll', 'l'], ['attendre', 'a', 'endre', 'tt', 't'], ['apporter', 'a', 'orter', 'pp', 'p'],
  ['attention', 'a', 'ention', 'tt', 't'], ['classe', 'cla', 'e', 'ss', 's'], ['dessin', 'de', 'in', 'ss', 's'],
  ['lettre', 'le', 're', 'tt', 't'], ['personne', 'perso', 'e', 'nn', 'n'], ['nettoyer', 'ne', 'oyer', 'tt', 't'],
  ['appartement', 'a', 'artement', 'pp', 'p'], ['anniversaire', 'a', 'iversaire', 'nn', 'n'], ['difficile', 'di', 'icile', 'ff', 'f'],
  ['pomme', 'po', 'e', 'mm', 'm'], ['passer', 'pa', 'er', 'ss', 's'], ['grosse', 'gro', 'e', 'ss', 's'], ['assiette', 'a', 'iette', 'ss', 's'],
  ['appétit', 'a', 'étit', 'pp', 'p'], ['accident', 'a', 'ident', 'cc', 'c'], ['occupé', 'o', 'upé', 'cc', 'c'], ['ballon', 'ba', 'on', 'll', 'l'],
  ['immeuble', 'i', 'euble', 'mm', 'm'], ['commencer', 'co', 'encer', 'mm', 'm'], ['sonner', 'so', 'er', 'nn', 'n'], ['bonne', 'bo', 'e', 'nn', 'n'],
];
function f3xSpell(R, pool) {
  const w = R.pick(pool);
  return mkChoice(R, `f3x-s-${w.text}`, 'Écoute le mot. Touche la bonne façon de l’écrire.', { text: w.text }, R.sample(w.bad, 2).map((t) => ({ text: t })), {
    say: say(w.text),
  });
}
function f3xSpot(R, pool) {
  const w = R.pick(pool);
  const others = R.sample(pool.filter((x) => x !== w), 3);
  const bad = R.pick(w.bad);
  return mkChoice(R, `f3x-e-${w.text}-${bad}`, 'Un seul mot est mal écrit. Lequel?', { text: bad }, others.map((x) => ({ text: x.text })), {
    say: say('Un seul mot est mal écrit. Lequel?'),
    cols: 2,
  });
}
function f3xDouble(R, n) {
  const [word, pre, post, dbl, sgl] = R.pick(F3_DBL);
  const opts = [dbl, sgl, 'z', 'h'].slice(0, n);
  return mkChoice(R, `f3x-d-${word}`, `Complète le mot : ${pre}__${post}`, { text: dbl }, opts.slice(1).map((t) => ({ text: t })), {
    say: say(word),
    cols: 2,
  });
}
function f3xLetters(R, lo, hi, nExtra) {
  const w = R.pick(ORTHO.filter((x) => LETTERS_ONLY.test(x.text) && x.text.length >= lo && x.text.length <= hi));
  return {
    type: 'order',
    key: `f3x-o-${w.text}`,
    prompt: 'Écoute le mot. Remets les lettres dans l’ordre.',
    say: say(w.text),
    tiles: Array.from(w.text),
    extra: R.sample(ALPHA.filter((c) => !w.text.includes(c)), nExtra),
    joiner: '',
  };
}
f3.generate = run({
  1: [
    (R) => f3Spell(R, 3),
    (R) => f3Letters(R, 3),
    (R) => f3xSpell(R, ORTHO.filter((x) => x.text.length <= 8)),
    (R) => f3xSpot(R, ORTHO.filter((x) => x.text.length <= 8)),
    (R) => f3xDouble(R, 3),
  ],
  2: [
    (R) => f3xSpell(R, ORTHO),
    (R) => f3xSpell(R, ORTHO),
    (R) => f3xSpot(R, ORTHO),
    (R) => f3xDouble(R, 4),
    (R) => f3xLetters(R, 7, 9, 2),
  ],
  3: [
    (R) => f3xSpell(R, ORTHO_LONG),
    (R) => f3xSpot(R, ORTHO_LONG),
    (R) => f3xSpot(R, ORTHO),
    (R) => f3xDouble(R, 4),
    (R) => f3xLetters(R, 9, 13, 3),
  ],
});
f3.pfeq = 'Écriture — orthographe d’usage : mots fréquents de 2e et 3e année, lettres doubles, accents (PFEQ 1er cycle, 2e année – 2e cycle, 3e année)';

/* ---------------- f4 : groupe du nom, déterminants ---------------- */
const ADJ_PRE = [['petit', 'petite'], ['grand', 'grande'], ['gros', 'grosse'], ['joli', 'jolie'], ['bon', 'bonne']];
const ADJ_POST = [
  ['noir', 'noire'], ['blanc', 'blanche'], ['gris', 'grise'], ['bleu', 'bleue'], ['vert', 'verte'], ['froid', 'froide'],
  ['chaud', 'chaude'], ['sucré', 'sucrée'], ['lourd', 'lourde'], ['fort', 'forte'], ['doux', 'douce'], ['brun', 'brune'],
  ['content', 'contente'], ['fatigué', 'fatiguée'], ['rouge', 'rouge'], ['jaune', 'jaune'],
];
const NOT_ADJ_NOUN = new Set(['orange', 'violet', 'vert', 'blanc', 'noir', 'brun', 'gris', 'rose']);
const N4 = W.filter((w) => !isElided(w) && !NOT_ADJ_NOUN.has(w.text) && pluralOk(w) && w.text !== 'dé');
const detSing = (w, R) => R.pick(w.g === 'm' ? ['le', 'un', 'mon', 'son', 'ce'] : ['la', 'une', 'ma', 'sa', 'cette']);
function f4xGroup(R, size, roles) {
  const w = R.pick(N4);
  const det = detSing(w, R);
  const pre = R.pick(ADJ_PRE);
  const post = R.pick(ADJ_POST);
  const fem = w.g === 'f';
  let tokens;
  let role;
  if (size === 3) {
    const useAdj = R.chance(0.5) ? pre : post;
    const adj = fem ? useAdj[1] : useAdj[0];
    tokens = useAdj === pre ? [det, adj, w.text] : [det, w.text, adj];
    const r = R.pick(roles);
    role = r === 'nom' ? w.text : r === 'det' ? det : adj;
    if (r === 'adj') role = adj;
  } else {
    const a1 = fem ? pre[1] : pre[0];
    const a2 = fem ? post[1] : post[0];
    tokens = [det, a1, w.text, a2];
    role = R.pick(roles.filter((r) => r !== 'adj')) === 'nom' ? w.text : det;
    if (role !== w.text && role !== det) role = w.text;
  }
  const wanted = role === w.text ? 'nom' : role === det ? 'déterminant' : 'adjectif';
  const label = { nom: 'le nom', 'déterminant': 'le déterminant', adjectif: 'l’adjectif' }[wanted];
  const phrase = tokens.join(' ');
  const idx = tokens.indexOf(role);
  return {
    type: 'choice',
    key: `f4x-g-${wanted}-${phrase}`,
    prompt: `Dans « ${phrase} », quel mot est ${label}?`,
    say: say(phrase),
    options: tokens.map((t) => ({ text: t })),
    answer: idx,
    cols: 2,
  };
}
function f4xDemo(R, plural) {
  const w = R.pick(W.filter(pluralOk));
  if (plural) {
    const pl = pluralOf(w.text);
    return mkChoice(R, `f4x-d-pl-${w.text}`, `Complète : ___ ${pl}`, { text: 'ces' }, [{ text: 'ce' }, { text: 'cet' }, { text: 'cette' }], {
      say: say(`ces ${pl}`),
      cols: 4,
    });
  }
  const ok = w.g === 'f' ? 'cette' : isElided(w) ? 'cet' : 'ce';
  return {
    type: 'choice',
    key: `f4x-d-${w.text}`,
    prompt: `Complète : ___ ${w.text}`,
    say: say(`${ok} ${w.text}`),
    options: ['ce', 'cet', 'cette', 'ces'].map((t) => ({ text: t })),
    answer: ['ce', 'cet', 'cette', 'ces'].indexOf(ok),
    fixedOrder: true,
    cols: 4,
  };
}
const POSS = {
  moi: { ctx: 'C’est à moi', f: ['mon', 'ma', 'mes'] },
  toi: { ctx: 'C’est à toi', f: ['ton', 'ta', 'tes'] },
  lui: { ctx: 'C’est à Léa', f: ['son', 'sa', 'ses'] },
};
function f4xPoss(R, trap) {
  const k = R.pick(Object.keys(POSS));
  const P = POSS[k];
  const pool = trap ? W.filter((w) => w.g === 'f' && isElided(w) && pluralOk(w)) : W.filter(pluralOk);
  const w = R.pick(pool);
  const plural = !trap && R.chance(0.3);
  const text = plural ? pluralOf(w.text) : w.text;
  const ok = plural ? P.f[2] : w.g === 'm' || isElided(w) ? P.f[0] : P.f[1];
  const options = [...P.f, R.pick(['ce', 'cet', 'cette', 'ces'].filter((x) => !P.f.includes(x)))];
  return {
    type: 'choice',
    key: `f4x-p-${k}-${text}`,
    prompt: `${P.ctx} : ___ ${text}`,
    say: say(`${P.ctx}. ${ok} ${text}`),
    options: options.map((t) => ({ text: t })),
    answer: options.indexOf(ok),
    fixedOrder: true,
    cols: 4,
  };
}
const CONTR_FR = [
  ['Léa pense ___ ', 'à'], ['Léa s’intéresse ___ ', 'à'], ['Léa se souvient ___ ', 'de'], ['Léa s’occupe ___ ', 'de'],
];
function f4xContr(R, plural) {
  const [frame, kind] = R.pick(CONTR_FR);
  const w = R.pick(W.filter((x) => pluralOk(x) && !x.text.includes(' ')));
  const sets = { à: ['au', 'à la', 'à l’', 'aux'], de: ['du', 'de la', 'de l’', 'des'] };
  const set = sets[kind];
  const text = plural ? pluralOf(w.text) : w.text;
  const ok = plural ? set[3] : isElided(w) ? set[2] : w.g === 'm' ? set[0] : set[1];
  return {
    type: 'choice',
    key: `f4x-c-${kind}-${text}`,
    prompt: `Complète : ${frame}${text}.`,
    say: say(`${frame.replace('___', '')}${ok}${ok.endsWith('’') ? '' : ' '}${text}`),
    options: set.map((t) => ({ text: t })),
    answer: set.indexOf(ok),
    fixedOrder: true,
    cols: 4,
  };
}
const DET_LIST = ['le', 'la', 'les', 'un', 'une', 'des', 'mon', 'ma', 'mes', 'son', 'sa', 'ses', 'ton', 'ce', 'cet', 'cette', 'ces', 'notre', 'leur'];
const ADJ_FLAT = [...ADJ_PRE, ...ADJ_POST].flatMap((a) => a).filter((t) => t !== 'rouge' && t !== 'jaune').concat(['rouge', 'jaune']);
function f4xSort3(R, per) {
  const cnt = per === 3 ? R.shuffle([3, 3, 2]) : [2, 2, 2];
  const dets = R.sample(DET_LIST, cnt[0]);
  const nouns = R.sample(W.filter((w) => !NOT_ADJ_NOUN.has(w.text) && !DET_LIST.includes(w.text)), cnt[1]).map((w) => w.text);
  const adjs = R.sample(uniq(ADJ_FLAT), cnt[2]);
  const clash = new Set([...dets, ...nouns, ...adjs]);
  if (clash.size < cnt[0] + cnt[1] + cnt[2]) return f4xSort3(R, per);
  return mkSort(
    R,
    `f4x-s-${nameKey([...dets, ...nouns, ...adjs])}`,
    'Classe chaque mot : déterminant, nom ou adjectif?',
    [{ text: 'Déterminant', emoji: '🔹' }, { text: 'Nom', emoji: '🏷️' }, { text: 'Adjectif', emoji: '🎨' }],
    [dets.map(spk), nouns.map(spk), adjs.map(spk)],
    { say: say('Classe chaque mot : déterminant, nom ou adjectif?') },
  );
}
f4.generate = run({
  1: [
    (R) => f4Plural(R),
    (R) => f4Elide(R),
    (R) => f4LeLa(R, true),
    (R) => f4SortNom(R, 8),
    (R) => f4xGroup(R, 3, ['nom', 'det']),
    (R) => f4xDemo(R, false),
  ],
  2: [
    (R) => f4xGroup(R, 3, ['nom', 'det', 'adj']),
    (R) => f4xGroup(R, 4, ['nom', 'det']),
    (R) => f4xDemo(R, false),
    (R) => f4xPoss(R, false),
    (R) => f4xContr(R, false),
    (R) => f4xSort3(R, 2),
  ],
  3: [
    (R) => f4xGroup(R, 4, ['nom', 'det']),
    (R) => f4xDemo(R, R.chance(0.4)),
    (R) => f4xPoss(R, true),
    (R) => f4xPoss(R, false),
    (R) => f4xContr(R, R.chance(0.4)),
    (R) => f4xSort3(R, 3),
  ],
});
f4.pfeq = 'Grammaire — le groupe du nom (déterminant, nom, adjectif), ce/cet/cette/ces, mon/ma/mes, au/du (PFEQ 1er cycle, 2e année – 2e cycle, 3e année)';

/* ---------------- f5 : genre et nombre ---------------- */
// singulier | pluriel | genre | type
const PLUR_RAW = `
journal|journaux|m|AUX
animal|animaux|m|AUX
cheval|chevaux|m|AUX
hôpital|hôpitaux|m|AUX
canal|canaux|m|AUX
métal|métaux|m|AUX
signal|signaux|m|AUX
orignal|orignaux|m|AUX
rival|rivaux|m|AUX
cristal|cristaux|m|AUX
local|locaux|m|AUX
bateau|bateaux|m|XEAU
gâteau|gâteaux|m|XEAU
château|châteaux|m|XEAU
chapeau|chapeaux|m|XEAU
manteau|manteaux|m|XEAU
couteau|couteaux|m|XEAU
oiseau|oiseaux|m|XEAU
tuyau|tuyaux|m|XEAU
rideau|rideaux|m|XEAU
tableau|tableaux|m|XEAU
drapeau|drapeaux|m|XEAU
marteau|marteaux|m|XEAU
cadeau|cadeaux|m|XEAU
feu|feux|m|XEU
jeu|jeux|m|XEU
neveu|neveux|m|XEU
cheveu|cheveux|m|XEU
bijou|bijoux|m|XOU
caillou|cailloux|m|XOU
chou|choux|m|XOU
genou|genoux|m|XOU
hibou|hiboux|m|XOU
joujou|joujoux|m|XOU
chat|chats|m|S
chien|chiens|m|S
ami|amis|m|S
arbre|arbres|m|S
livre|livres|m|S
crayon|crayons|m|S
lapin|lapins|m|S
pomme|pommes|f|S
école|écoles|f|S
fleur|fleurs|f|S
maison|maisons|f|S
étoile|étoiles|f|S
auto|autos|f|S
montagne|montagnes|f|S
trou|trous|m|SPIEGE
clou|clous|m|SPIEGE
verrou|verrous|m|SPIEGE
pneu|pneus|m|SPIEGE
matou|matous|m|SPIEGE
bisou|bisous|m|SPIEGE
coucou|coucous|m|SPIEGE
kangourou|kangourous|m|SPIEGE
carnaval|carnavals|m|SPIEGE
festival|festivals|m|SPIEGE
bal|bals|m|SPIEGE
chacal|chacals|m|SPIEGE
nez|nez|m|INV
souris|souris|f|INV
bras|bras|m|INV
pays|pays|m|INV
prix|prix|m|INV
voix|voix|f|INV
fois|fois|f|INV
fils|fils|m|INV
gaz|gaz|m|INV
tapis|tapis|m|INV
repas|repas|m|INV
héros|héros|m|INV
`;
const PL = PLUR_RAW.trim().split('\n').map((l) => {
  const [s, p, g, k] = l.split('|');
  return { s, p, g, k };
});
const PL_SIMPLE = PL.filter((x) => ['AUX', 'XEAU', 'S', 'INV'].includes(x.k) && !['bras', 'prix', 'fois', 'fils', 'gaz', 'héros', 'pays'].includes(x.s));
const PL_L3 = PL;
const unOfG = (g) => (g === 'm' ? 'un' : 'une');
function plDistractors(x) {
  const c = new Set([x.s + 's', x.s + 'x', x.s + 'es']);
  if (/al$/.test(x.s)) {
    c.add(x.s.slice(0, -2) + 'aux');
    c.add(x.s + 's');
  }
  if (/eau$/.test(x.s)) c.add(x.s + 's');
  if (x.k === 'INV') c.add(x.s + 's');
  if (x.k === 'SPIEGE' && /al$/.test(x.s)) c.add(x.s.slice(0, -2) + 'aux');
  c.add(x.p + 's');
  c.delete(x.p);
  if (x.s === x.p) c.delete(x.s);
  return [...c].filter((t) => t !== x.p);
}
function f5xPlural(R, pool) {
  const x = R.pick(pool);
  const wrong = R.sample(plDistractors(x), 3);
  return mkChoice(R, `f5x-p-${x.s}`, `Écris au pluriel : ${unOfG(x.g)} ${x.s}`, { text: `des ${x.p}` }, wrong.map((t) => ({ text: `des ${t}` })), {
    say: say(`${unOfG(x.g)} ${x.s}`),
  });
}
function f5xEyes(R) {
  const wrong = R.sample(['des œils', 'des œilx', 'des yeuxs', 'des œuils'], 3);
  return mkChoice(R, 'f5x-p-œil', 'Écris au pluriel : un œil', { text: 'des yeux' }, wrong.map((t) => ({ text: t })), { say: say('un œil') });
}
const FEM_RAW = `
chanteur|chanteuse|chanteure,chantrice
acteur|actrice|acteuse,acteure
boulanger|boulangère|boulangerre,boulangeuse
danseur|danseuse|danseure,danceuse
lion|lionne|lione,lionse
chat|chatte|chate,chatse
chien|chienne|chiene,chienze
cuisinier|cuisinière|cuisiniere,cuisiniaire
pâtissier|pâtissière|pâtissiere,pâtisseuse
directeur|directrice|directeuse,directeure
voisin|voisine|voisinne,voisone
coiffeur|coiffeuse|coiffeure,coiffrice
fermier|fermière|fermiere,fermiaire
gentil|gentille|gentile,gentilh
bon|bonne|bone,bonn
blanc|blanche|blance,blanque
doux|douce|douxe,douze
long|longue|longe,longgue
vieux|vieille|vieuxe,vielle
beau|belle|beaue,bèle
heureux|heureuse|heureuxe,heureuze
sportif|sportive|sportife,sportiv
canadien|canadienne|canadiene,canadienn
premier|première|premiere,premièrre
cruel|cruelle|cruele,cruell
jaloux|jalouse|jalouxe,jalouze
naïf|naïve|naïfe,naïfve
mignon|mignonne|mignone,mignonn
secret|secrète|secrete,secrette
nouveau|nouvelle|nouveaue,nouvèle
`;
const FEM = FEM_RAW.trim().split('\n').map((l) => {
  const [m, f, b] = l.split('|');
  return { m, f, bad: b.split(',') };
});
function f5xFem(R, pool) {
  const x = R.pick(pool);
  return mkChoice(R, `f5x-f-${x.m}`, `Quel est le féminin de « ${x.m} »?`, spk(x.f), R.sample(x.bad, 3).map(spk), {
    say: say(`Quel est le féminin de ${x.m}?`),
    cols: 2,
  });
}
// ms, fs, mp, fp, niveau minimal
const ADJ4 = [
  ['petit', 'petite', 'petits', 'petites', 1], ['grand', 'grande', 'grands', 'grandes', 1], ['joli', 'jolie', 'jolis', 'jolies', 1],
  ['content', 'contente', 'contents', 'contentes', 1], ['noir', 'noire', 'noirs', 'noires', 1], ['fatigué', 'fatiguée', 'fatigués', 'fatiguées', 1],
  ['froid', 'froide', 'froids', 'froides', 1], ['lourd', 'lourde', 'lourds', 'lourdes', 1], ['blanc', 'blanche', 'blancs', 'blanches', 2],
  ['gentil', 'gentille', 'gentils', 'gentilles', 2], ['heureux', 'heureuse', 'heureux', 'heureuses', 2], ['doux', 'douce', 'doux', 'douces', 2],
  ['long', 'longue', 'longs', 'longues', 2], ['léger', 'légère', 'légers', 'légères', 2], ['sportif', 'sportive', 'sportifs', 'sportives', 3],
  ['beau', 'belle', 'beaux', 'belles', 3], ['vieux', 'vieille', 'vieux', 'vieilles', 3], ['nouveau', 'nouvelle', 'nouveaux', 'nouvelles', 3],
  ['cruel', 'cruelle', 'cruels', 'cruelles', 3], ['jaloux', 'jalouse', 'jaloux', 'jalouses', 3], ['mignon', 'mignonne', 'mignons', 'mignonnes', 3],
  ['gros', 'grosse', 'gros', 'grosses', 3],
];
const N5 = W.filter((w) => pluralOk(w) && !NOT_ADJ_NOUN.has(w.text));
function f5xAdj(R, minLv, maxLv) {
  const a = R.pick(ADJ4.filter((x) => x[4] >= minLv && x[4] <= maxLv));
  const w = R.pick(N5);
  const plural = R.chance(0.5);
  const subj = plural ? `Les ${pluralOf(w.text)} sont` : `${withLe(w).replace(/^l’/, 'L’').replace(/^l /, 'L ')} est`;
  const sentence = ((subj[0] === 'l' ? cap1(subj) : subj) + ' ___.').replace(/'/g, '’');
  const ok = a[(w.g === 'm' ? 0 : 1) + (plural ? 2 : 0)];
  const opts = uniq(a.slice(0, 4));
  return mkChoice(R, `f5x-a-${sentence}-${a[0]}`, `Accorde l’adjectif « ${a[0]} » :`, { text: ok }, opts.filter((t) => t !== ok).map((t) => ({ text: t })), {
    say: say(sentence.replace('___', a[0])),
    stimulus: { text: sentence },
    cols: 2,
  });
}
function f5xGn(R, minLv, maxLv) {
  const a = R.pick(ADJ4.filter((x) => x[4] >= minLv && x[4] <= maxLv && uniq(x.slice(0, 4)).length === 4));
  const w = R.pick(['beau', 'vieux', 'nouveau'].includes(a[0]) ? N5.filter((x) => !isElided(x)) : N5);
  const plural = R.chance(0.5);
  const noun = plural ? pluralOf(w.text) : w.text;
  const g = w.g;
  const form = (gg, pl) => a[(gg === 'm' ? 0 : 1) + (pl ? 2 : 0)];
  const pre = ['petit', 'grand', 'joli', 'beau', 'vieux', 'nouveau', 'gros', 'bon'].includes(a[0]);
  const det = (gg, pl) => (pl ? 'des' : gg === 'm' ? 'un' : 'une');
  const mk = (d, adj) => (pre ? `${d} ${adj} ${noun}` : `${d} ${noun} ${adj}`);
  const ok = mk(det(g, plural), form(g, plural));
  const og = g === 'm' ? 'f' : 'm';
  const wrongs = uniq([
    mk(det(g, plural), form(og, plural)),
    mk(det(g, plural), form(g, !plural)),
    plural ? mk(det(g, false), form(g, true)) : mk(det(og, false), form(g, false)),
  ]).filter((t) => t !== ok);
  if (wrongs.length < 3) return f5xGn(R, minLv, maxLv);
  return mkChoice(R, `f5x-g-${ok}`, 'Quel groupe du nom est bien écrit?', spk(ok), wrongs.map(spk), {
    say: say('Quel groupe du nom est bien écrit?'),
    cols: 1,
  });
}
function f5xSortPlural(R, per, hard) {
  const bins = [
    { text: 'Pluriel en -aux (comme cheval)' },
    { text: 'Pluriel en -x (comme bateau)' },
    { text: 'Pluriel en -s (comme chat)' },
  ];
  const pools = hard
    ? [PL.filter((x) => x.k === 'AUX'), PL.filter((x) => ['XEAU', 'XEU', 'XOU'].includes(x.k)), PL.filter((x) => x.k === 'S' || x.k === 'SPIEGE')]
    : [PL.filter((x) => x.k === 'AUX'), PL.filter((x) => ['XEAU', 'XEU'].includes(x.k)), PL.filter((x) => x.k === 'S')];
  const cnt = per === 3 ? R.shuffle([3, 3, 2]) : [2, 2, 2];
  const groups = pools.map((p, i) => R.sample(p, cnt[i]).map((x) => spk(x.s)));
  return mkSort(
    R,
    `f5x-sp-${hard ? 3 : 2}-${nameKey(groups.flat().map((x) => x.text))}`,
    'Au pluriel, comment se termine chaque mot? Classe-le.',
    bins,
    groups,
    { say: say('Au pluriel, comment se termine chaque mot? Classe-le.') },
  );
}
f5.generate = run({
  1: [
    (R) => f5Genre(R, 8, false),
    (R) => f5Plural(R, 3),
    (R) => f5SortNumber(R, 3),
    (R) => f5xPlural(R, PL_SIMPLE.filter((x) => x.k !== 'INV')),
    (R) => f5xAdj(R, 1, 1),
    (R) => f5xFem(R, FEM.slice(0, 13)),
  ],
  2: [
    (R) => f5xPlural(R, PL_SIMPLE),
    (R) => f5xFem(R, FEM.slice(0, 20)),
    (R) => f5xAdj(R, 1, 2),
    (R) => f5xGn(R, 1, 2),
    (R) => f5xSortPlural(R, 2, false),
  ],
  3: [
    (R) => f5xPlural(R, PL_L3),
    (R) => f5xPlural(R, PL_L3.filter((x) => ['XOU', 'SPIEGE', 'INV', 'XEU'].includes(x.k))),
    (R) => f5xEyes(R),
    (R) => f5xFem(R, FEM),
    (R) => f5xAdj(R, 2, 3),
    (R) => f5xGn(R, 2, 3),
    (R) => f5xSortPlural(R, 3, true),
  ],
});
f5.pfeq = 'Grammaire — genre et nombre du nom et de l’adjectif : féminins irréguliers, pluriels en -s, -x, -aux, accord dans le groupe du nom (PFEQ 1er cycle, 2e année – 2e cycle, 3e année)';

/* ---------------- f6 : le verbe ---------------- */
const SENT_V2 = [
  ['Chaque matin, le facteur dépose le courrier dans la boîte.', 'dépose'],
  ['Les enfants du quartier construisent un fort de neige.', 'construisent'],
  ['Ma grand-mère prépare une délicieuse tourtière pour Noël.', 'prépare'],
  ['Le vent d’automne emporte les feuilles mortes.', 'emporte'],
  ['Mon oncle répare le toit de la cabane.', 'répare'],
  ['Tous les élèves de la classe admirent le grand tableau.', 'admirent'],
  ['Le petit chaton griffe doucement le vieux fauteuil.', 'griffe'],
  ['Mes parents choisissent un nouveau tapis pour le salon.', 'choisissent'],
  ['Dans la forêt, les écureuils cachent des noisettes.', 'cachent'],
  ['La neige recouvre lentement les toits du village.', 'recouvre'],
  ['Vous écoutez la musique dans l’autobus.', 'écoutez'],
  ['Les musiciens jouent une belle mélodie au concert.', 'jouent'],
  ['Léa et sa sœur grimpent sur la haute colline.', 'grimpent'],
  ['Le boulanger vend des baguettes chaudes au village.', 'vend'],
  ['Les canards traversent la route avec leurs petits.', 'traversent'],
  ['Ma tante invente de drôles d’histoires pour les enfants.', 'invente'],
  ['Au printemps, les outardes reviennent du sud.', 'reviennent'],
  ['Le camion de livraison s’arrête devant la porte.', 's’arrête'],
];
const SENT_V3 = [
  ['Mon frère ne mange jamais de légumes verts.', 'mange'],
  ['Les élèves n’écoutent pas la musique trop forte.', 'écoutent'],
  ['Nous ne prenons plus l’autobus depuis septembre.', 'prenons'],
  ['Ma sœur ne trouve pas ses mitaines bleues.', 'trouve'],
  ['Tu ne finis jamais ton assiette de pâtes.', 'finis'],
  ['Les oiseaux ne chantent pas pendant la tempête.', 'chantent'],
  ['Vous ne regardez plus la télévision le soir.', 'regardez'],
  ['Léo n’oublie jamais son livre de lecture.', 'oublie'],
  ['La petite fille ne veut pas sa soupe chaude.', 'veut'],
  ['Il ne fait pas beau cet après-midi.', 'fait'],
  ['Mes cousins ne viennent pas à la cabane à sucre.', 'viennent'],
  ['Je ne peux pas ouvrir cette lourde porte.', 'peux'],
];
const SENT_G = [
  ['Samedi dernier, nous avons visité le musée avec la classe.', 'avons visité'],
  ['Hier soir, mon père a préparé un délicieux souper.', 'a préparé'],
  ['Les enfants ont construit un fort de neige derrière la maison.', 'ont construit'],
  ['Ma cousine a perdu sa mitaine rouge dans la cour.', 'a perdu'],
  ['Nous avons mangé des crêpes au sirop d’érable.', 'avons mangé'],
  ['Les élèves ont dessiné un grand dragon vert.', 'ont dessiné'],
  ['Tu as gagné la partie de hockey.', 'as gagné'],
  ['Vous avez fini votre dessin avant la récréation.', 'avez fini'],
  ['Demain, la classe va visiter le zoo de Granby.', 'va visiter'],
  ['Ce soir, mon frère va préparer le souper.', 'va préparer'],
  ['Nous allons patiner sur le lac gelé.', 'allons patiner'],
  ['Ils vont construire un igloo dans la cour.', 'vont construire'],
  ['Je vais choisir un livre à la bibliothèque.', 'vais choisir'],
  ['Mon oncle a réparé la clôture de la ferme.', 'a réparé'],
];
function f6xFind(R, table, group) {
  const [s, v] = R.pick(table);
  const tokens = s.replace(/[.,!?]/g, '').split(' ');
  const verbToks = v.split(' ');
  let wrong;
  if (group) {
    const pairs = [];
    for (let i = 0; i < tokens.length - 1; i++) {
      const p = `${tokens[i]} ${tokens[i + 1]}`;
      if (!verbToks.some((x) => p.split(' ').includes(x))) pairs.push(p);
    }
    wrong = R.sample(uniq(pairs), 3);
  } else {
    wrong = R.sample(uniq(tokens.filter((t) => !verbToks.includes(t) && !t.toLowerCase().includes(v.toLowerCase()))), 3);
  }
  return mkChoice(R, `f6x-v-${s}`, group ? 'Touche le groupe de mots qui forme le verbe.' : 'Touche le verbe conjugué dans la phrase.', spk(v), wrong.map(spk), {
    say: say(s),
    stimulus: { text: s },
    cols: 2,
  });
}
const PERS = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];
const VB = [
  ['aller', ['vais', 'vas', 'va', 'allons', 'allez', 'vont'], ['à l’école', 'au parc', 'au chalet'], 1],
  ['faire', ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], ['du ski', 'un gâteau', 'ses devoirs'], 1],
  ['finir', ['finis', 'finis', 'finit', 'finissons', 'finissez', 'finissent'], ['son travail', 'ses devoirs', 'le dessin'], 2],
  ['prendre', ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'], ['l’autobus', 'une collation', 'son manteau'], 2],
  ['venir', ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'], ['à la fête', 'de l’école', 'chez moi'], 2],
  ['pouvoir', ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], ['jouer dehors', 'nager', 'aider'], 3],
  ['vouloir', ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'], ['un biscuit', 'jouer', 'du chocolat chaud'], 3],
  ['dire', ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'], ['bonjour', 'la vérité', 'merci'], 3],
  ['voir', ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'], ['un orignal', 'le lac', 'un film'], 3],
  ['savoir', ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'], ['nager', 'la réponse', 'lire'], 3],
  ['manger', ['mange', 'manges', 'mange', 'mangeons', 'mangez', 'mangent'], ['une pomme', 'des crêpes', 'à midi'], 2],
  ['nager', ['nage', 'nages', 'nage', 'nageons', 'nagez', 'nagent'], ['dans le lac', 'très vite'], 2],
  ['ranger', ['range', 'ranges', 'range', 'rangeons', 'rangez', 'rangent'], ['sa chambre', 'ses jouets'], 2],
  ['commencer', ['commence', 'commences', 'commence', 'commençons', 'commencez', 'commencent'], ['la lecture', 'son dessin', 'à lire'], 3],
  ['lancer', ['lance', 'lances', 'lance', 'lançons', 'lancez', 'lancent'], ['la balle', 'un ballon'], 3],
  ['placer', ['place', 'places', 'place', 'plaçons', 'placez', 'placent'], ['les chaises', 'ses livres'], 3],
  ['appeler', ['appelle', 'appelles', 'appelle', 'appelons', 'appelez', 'appellent'], ['son ami', 'sa grand-mère'], 3],
  ['jeter', ['jette', 'jettes', 'jette', 'jetons', 'jetez', 'jettent'], ['le papier', 'une balle'], 3],
  ['acheter', ['achète', 'achètes', 'achète', 'achetons', 'achetez', 'achètent'], ['du pain', 'un cadeau', 'des fraises'], 3],
];
function f6xConj(R, pool, subjects) {
  const [inf, forms, comps] = R.pick(pool);
  return conjQuestion(R, inf, forms, R.pick(comps), inf, R.pick(subjects));
}
function f6xInf(R, pool) {
  const [inf, forms] = R.pick(pool);
  const p = R.int(0, 5);
  const form = forms[p];
  const shown = `${PERS[p] === 'je' && /^[aeiouéèh]/i.test(form) ? 'j’' : PERS[p] + ' '}${form}`.replace('j’ ', 'j’');
  const others = pool.filter((v) => v[0] !== inf && v[1][p] !== form);
  const wrong = R.sample(others, 3).map((v) => v[0]);
  return mkChoice(R, `f6x-i-${shown}`, `Quel est l’infinitif du verbe dans « ${shown} »?`, spk(inf), wrong.map(spk), {
    say: say(`Quel est l’infinitif du verbe dans ${shown}?`),
    cols: 2,
  });
}
// inf, il, ils, a+pp, ont+pp, imparfait il, imparfait ils, complément, participe
const TT = [
  ['manger', 'mange', 'mangent', 'mangé', 'mangeait', 'mangeaient', 'une pomme'],
  ['chanter', 'chante', 'chantent', 'chanté', 'chantait', 'chantaient', 'une chanson'],
  ['jouer', 'joue', 'jouent', 'joué', 'jouait', 'jouaient', 'au hockey'],
  ['regarder', 'regarde', 'regardent', 'regardé', 'regardait', 'regardaient', 'un film'],
  ['dessiner', 'dessine', 'dessinent', 'dessiné', 'dessinait', 'dessinaient', 'un chat'],
  ['finir', 'finit', 'finissent', 'fini', 'finissait', 'finissaient', 'son travail'],
  ['choisir', 'choisit', 'choisissent', 'choisi', 'choisissait', 'choisissaient', 'un livre'],
  ['prendre', 'prend', 'prennent', 'pris', 'prenait', 'prenaient', 'l’autobus'],
  ['faire', 'fait', 'font', 'fait', 'faisait', 'faisaient', 'un gâteau'],
  ['voir', 'voit', 'voient', 'vu', 'voyait', 'voyaient', 'un orignal'],
  ['dire', 'dit', 'disent', 'dit', 'disait', 'disaient', 'bonjour'],
];
const S3S = ['Léa', 'Papa', 'Mon frère', 'Le chat', 'Ma tante', 'L’enseignante'];
const S3P = ['Les enfants', 'Mes amis', 'Léa et Max', 'Les élèves', 'Mes parents'];
function tenseSentence(row, plural, subj, tense) {
  const [inf, il, ils, pp, imS, imP, comp] = row;
  const v =
    tense === 'p' ? (plural ? ils : il)
    : tense === 'f' ? `${plural ? 'vont' : 'va'} ${inf}`
    : tense === 'c' ? `${plural ? 'ont' : 'a'} ${pp}`
    : plural ? imP : imS;
  return `${subj} ${v} ${comp}.`;
}
function f6xTense(R, withImp) {
  const row = R.pick(TT);
  const plural = R.chance(0.5);
  const subj = R.pick(plural ? S3P : S3S);
  const tenses = withImp ? ['p', 'f', 'c', 'i'] : ['p', 'f', 'c'];
  const t = R.pick(tenses);
  const s = tenseSentence(row, plural, subj, t);
  const labels = { p: 'Présent', f: 'Futur proche', c: 'Passé composé', i: 'Imparfait' };
  return {
    type: 'choice',
    key: `f6x-t-${s}`,
    prompt: 'À quel temps est le verbe de cette phrase?',
    say: say(s),
    stimulus: { text: s },
    options: tenses.map((x) => ({ text: labels[x] })),
    answer: tenses.indexOf(t),
    fixedOrder: true,
    cols: tenses.length === 4 ? 2 : 3,
  };
}
function f6xPc(R) {
  const row = R.pick(TT);
  const plural = R.chance(0.5);
  const subj = R.pick(plural ? S3P : S3S);
  const [inf, il, ils, pp, , , comp] = row;
  const ok = `${plural ? 'ont' : 'a'} ${pp}`;
  const wrongs = uniq([`${plural ? 'ont' : 'a'} ${inf}`, `${plural ? 'a' : 'ont'} ${pp}`, plural ? ils : il]).filter((t) => t !== ok);
  return mkChoice(R, `f6x-pc-${subj}-${inf}`, `Complète au passé composé : « ${subj} ___ ${comp}. » (${inf})`, spk(ok), wrongs.map(spk), {
    say: say(`Complète au passé composé. ${subj} ${ok} ${comp}.`),
    cols: 2,
  });
}
function f6xImp(R) {
  const row = R.pick(TT);
  const plural = R.chance(0.5);
  const subj = R.pick(plural ? S3P : S3S);
  const [inf, il, ils, pp, imS, imP, comp] = row;
  const ok = plural ? imP : imS;
  const wrongs = uniq([plural ? ils : il, `${plural ? 'ont' : 'a'} ${pp}`, plural ? imS : imP]).filter((t) => t !== ok);
  return mkChoice(R, `f6x-im-${subj}-${inf}`, `Autrefois… Complète à l’imparfait : « ${subj} ___ ${comp}. » (${inf})`, spk(ok), wrongs.map(spk), {
    say: say(`Complète à l’imparfait. ${subj} ${ok} ${comp}.`),
    cols: 2,
  });
}
const VB_L1 = VB.filter((v) => v[3] === 1);
const VB_L2 = VB.filter((v) => v[3] <= 2);
const SUBJ6_NEW = [...SUBJ_ALL];
f6.generate = run({
  1: [
    (R) => f6FindVerb(R, 3),
    (R) => f6ConjEr(R),
    (R) => f6BeHave(R, SUBJ_ALL),
    (R) => f6SortVerb(R, 8),
    (R) => f6xConj(R, VB_L1, SUBJ_PRON),
    (R) => f6xFind(R, SENT_V2, false),
  ],
  2: [
    (R) => f6xFind(R, SENT_V2, false),
    (R) => f6xConj(R, VB_L2, SUBJ6_NEW),
    (R) => f6xConj(R, VB_L2, SUBJ6_NEW),
    (R) => f6xInf(R, VB_L2),
    (R) => f6xTense(R, false),
    (R) => f6xPc(R),
  ],
  3: [
    (R) => f6xFind(R, SENT_V3, false),
    (R) => f6xFind(R, SENT_G, true),
    (R) => f6xConj(R, VB, SUBJ6_NEW),
    (R) => f6xConj(R, VB, SUBJ6_NEW),
    (R) => f6xInf(R, VB),
    (R) => f6xTense(R, true),
    (R) => f6xPc(R),
    (R) => f6xImp(R),
  ],
});
f6.pfeq = 'Grammaire — le verbe : présent (être, avoir, aller, faire, verbes en -er et -ir, …), futur proche, passé composé, imparfait, infinitif (PFEQ 1er cycle, 2e année – 2e cycle, 3e année)';

/* ---------------- f7 : types de phrases, négation, constituants ---------------- */
const IMP7 = [
  'Range ta chambre.', 'Ferme la porte.', 'Écoute bien la consigne.', 'Mets ton manteau.', 'Viens ici.', 'Lave-toi les mains.',
  'Prends ton sac.', 'Attends-moi devant l’école.', 'Regarde le beau dessin de Léa.', 'Sors de la piscine.', 'Finis ton assiette.',
  'Pousse la porte doucement.', 'Allume la lumière.', 'Passe-moi le sel.', 'Lis cette page à voix haute.', 'Prépare ton sac pour demain.',
  'Cherche ta mitaine sous le lit.', 'Éteins la télévision.', 'Range tes crayons.', 'Mange tes légumes.', 'Arrête de crier!', 'Viens vite!',
];
const ASK7 = ASK.filter((q) => q.split(' ').length >= 3);
const EXC7 = EXC.filter((q) => q.split(' ').length >= 2);
function f7xType(R, four) {
  const kinds = four ? ['d', 'q', 'i', 'e'] : ['d', 'q', 'e'];
  const k = R.pick(four ? ['d', 'q', 'i', 'e', 'i'] : ['d', 'q', 'e']);
  let s;
  if (k === 'd') s = R.pick(SENT[3]);
  else if (k === 'q') s = R.pick(ASK7) + '?';
  else if (k === 'e') s = R.pick(EXC7) + '!';
  else s = R.pick(IMP7);
  const labels = { d: 'Déclarative', q: 'Interrogative', i: 'Impérative', e: 'Exclamative' };
  return {
    type: 'choice',
    key: `f7x-t-${s}`,
    prompt: 'Quel est le type de cette phrase?',
    say: say(s),
    stimulus: { text: s },
    options: kinds.map((x) => ({ text: labels[x] })),
    answer: kinds.indexOf(k),
    fixedOrder: true,
    cols: kinds.length === 4 ? 2 : 3,
  };
}
const NEG7 = [
  ['Léa', 'aime', 'la neige'], ['Mon frère', 'mange', 'ses légumes'], ['Max', 'joue', 'au hockey'], ['Ma sœur', 'porte', 'sa tuque'],
  ['Papa', 'conduit', 'le camion'], ['Les enfants', 'regardent', 'la télévision'], ['Nous', 'écoutons', 'la radio'], ['Tu', 'as', 'ton cahier'],
  ['Je', 'vois', 'le lac'], ['Zoé', 'ouvre', 'la fenêtre'], ['Tom', 'oublie', 'son sac'], ['Elle', 'aime', 'le chocolat'],
  ['Ils', 'finissent', 'leur dessin'], ['Vous', 'prenez', 'l’autobus'], ['Mon chien', 'mord', 'le facteur'], ['Le chat', 'boit', 'son lait'],
  ['Ma tante', 'habite', 'à Québec'], ['Les élèves', 'écoutent', 'l’enseignante'], ['Louis', 'range', 'sa chambre'], ['Nous', 'visitons', 'le musée'],
];
const vow7 = (v) => /^[aeiouéèêhâî]/i.test(v);
function f7xNeg(R) {
  const [s, v, rest] = R.pick(NEG7);
  const aff = `${s} ${v} ${rest}.`;
  const ne = vow7(v) ? `n’${v}` : `ne ${v}`;
  const ok = `${s} ${ne} pas ${rest}.`;
  const cands = uniq([
    `${s} ${v} pas ${rest}.`,
    `${s} ${ne} ${rest}.`,
    `${s} ne pas ${v} ${rest}.`,
    `${s} ${ne} ${rest} pas.`,
  ]).filter((t) => t !== ok);
  return mkChoice(R, `f7x-n-${aff}`, `Quelle est la phrase négative de « ${aff} »?`, spk(ok), R.sample(cands, 3).map(spk), {
    say: say(`Quelle est la phrase négative de ${aff}?`),
    cols: 1,
  });
}
const INTER7 = [
  ['Aimes-tu', 'la neige'], ['As-tu', 'faim'], ['Veux-tu', 'un biscuit'], ['Peux-tu', 'm’aider'], ['Prends-tu', 'l’autobus'], ['Fais-tu', 'du ski'],
  ['Vas-tu', 'à l’école'], ['Connais-tu', 'cette chanson'], ['Parles-tu', 'français'], ['Aimez-vous', 'le chocolat'], ['Avez-vous', 'un chien'],
  ['Voulez-vous', 'du gâteau'], ['Allez-vous', 'au parc'], ['Habitez-vous', 'à Québec'], ['Regardes-tu', 'ce film'], ['Joues-tu', 'au hockey'],
];
function f7xInter(R) {
  const [v, rest] = R.pick(INTER7);
  const ok = `${v} ${rest}?`;
  const wrongs = [`${v.replace('-', ' ')} ${rest}?`, `${v} ${rest}.`, `${v} ${rest}`];
  return mkChoice(R, `f7x-q-${ok}`, 'Quelle question est bien écrite?', spk(ok), wrongs.map(spk), {
    say: say('Quelle question est bien écrite?'),
    cols: 1,
  });
}
// sujet | verbe | complément du verbe | complément de phrase | place du complément de phrase
const CONST7 = [
  ['Mon grand frère', 'répare', 'son vélo', 'dans le garage', 'end'],
  ['Les élèves', 'écoutent', 'une belle histoire', 'chaque matin', 'start'],
  ['Léa', 'range', 'ses jouets', 'après le souper', 'end'],
  ['Ma tante', 'prépare', 'une tarte aux pommes', 'pour la fête', 'end'],
  ['Les oiseaux', 'construisent', 'un nid', 'au printemps', 'start'],
  ['Papa', 'lave', 'l’auto', 'le samedi', 'end'],
  ['Zoé', 'cueille', 'des fraises', 'dans le jardin', 'end'],
  ['Le facteur', 'apporte', 'une grosse boîte', 'ce matin', 'start'],
  ['Mes cousins', 'jouent', 'au hockey', 'sur la patinoire', 'end'],
  ['Les enfants', 'construisent', 'un fort de neige', 'après l’école', 'start'],
  ['Maman', 'lit', 'une histoire', 'avant le dodo', 'start'],
  ['Le chien de Max', 'mange', 'son os', 'dans la cour', 'end'],
  ['L’enseignante', 'écrit', 'la date', 'au tableau', 'end'],
  ['Nous', 'visitons', 'le musée', 'en mars', 'start'],
  ['Sam', 'attend', 'l’autobus', 'devant l’école', 'end'],
  ['Le boulanger', 'vend', 'du pain frais', 'tous les jours', 'end'],
  ['Les élèves de deuxième année', 'visitent', 'la bibliothèque', 'jeudi prochain', 'end'],
  ['Ma sœur', 'joue', 'du violon', 'le mardi soir', 'end'],
  ['Mon père', 'répare', 'la clôture', 'pendant l’été', 'start'],
  ['Le vent', 'emporte', 'les feuilles mortes', 'en octobre', 'start'],
  ['Tom', 'mange', 'une crêpe', 'au déjeuner', 'end'],
  ['Louis et Mia', 'dessinent', 'un dragon', 'pendant la récréation', 'end'],
  ['Grand-papa', 'raconte', 'une légende', 'autour du feu', 'end'],
  ['Les poules', 'pondent', 'des œufs', 'chaque jour', 'end'],
  ['Le soleil', 'éclaire', 'la vallée', 'dès l’aube', 'start'],
  ['Léo', 'porte', 'sa tuque rouge', 'quand il neige', 'end'],
];
const PROPER7 = ['Léa', 'Zoé', 'Sam', 'Tom', 'Papa', 'Maman', 'Louis', 'Léo', 'Grand-papa'];
function const7Sentence(e) {
  const [S, V, C, CP, pos] = e;
  const subj = pos === 'start' && !PROPER7.some((n) => S.startsWith(n)) ? low1(S) : S;
  return pos === 'start' ? `${cap1(CP)}, ${subj} ${V} ${C}.` : `${S} ${V} ${C} ${CP}.`;
}
function f7xConst(R, roles) {
  const e = R.pick(CONST7);
  const role = R.pick(roles);
  const [S0, V, C, CP, pos] = e;
  const S = pos === 'start' && !PROPER7.some((n) => S0.startsWith(n)) ? low1(S0) : S0;
  const s = const7Sentence(e);
  const pick = { S, V, C, CP }[role];
  const label = {
    S: 'le sujet (qui fait l’action?)',
    V: 'le verbe',
    C: 'le complément du verbe (le groupe qui suit le verbe)',
    CP: 'le complément de phrase (on peut le déplacer ou l’effacer)',
  }[role];
  const opts = uniq([S, V, C, CP]);
  return mkChoice(R, `f7x-c-${role}-${s}`, `Dans « ${s} », quel groupe de mots est ${label}?`, spk(pick), opts.filter((t) => t !== pick).map(spk), {
    say: say(`Dans la phrase ${s}, quel groupe de mots est ${label}?`),
    stimulus: { text: s },
    cols: 2,
  });
}
function f7xOrderConst(R) {
  const e = R.pick(CONST7);
  const [S, V, C] = e;
  return {
    type: 'order',
    key: `f7x-oc-${S}-${V}-${C}`,
    prompt: 'Remets les groupes de mots dans l’ordre : sujet, verbe, complément.',
    say: say(`${S} ${V} ${C}.`),
    tiles: [S, V, C],
    joiner: ' ',
  };
}
const LONG7 = [
  'Après la classe, les enfants du quartier construisent un grand fort de neige.',
  'Chaque dimanche, ma grand-mère prépare une délicieuse soupe aux pois pour toute la famille.',
  'Pendant les vacances, mon frère et moi pêchons des truites dans la rivière.',
  'Hier soir, ma cousine a lu une longue histoire de pirates à son petit frère.',
  'Au printemps, les outardes reviennent du sud et se posent sur le lac.',
  'Tous les matins, le boulanger du village sort des baguettes chaudes de son four.',
  'Samedi dernier, la classe de madame Julie a visité le musée de la civilisation.',
  'Quand il neige beaucoup, nous restons à la maison et nous jouons aux cartes.',
  'Le grand orignal s’avance lentement dans l’eau calme du petit lac.',
  'Mon père répare la vieille clôture du jardin avec des planches neuves.',
  'À la récréation, les élèves de troisième année jouent au ballon dans la cour.',
  'Hier, nous avons mangé des crêpes avec du sirop d’érable chez ma tante.',
  'Pendant la tempête, les oiseaux se cachent dans les grands sapins verts.',
  'Dans la forêt, les écureuils cachent des noisettes pour passer l’hiver.',
  'Le soir, mon grand frère me raconte des histoires de fantômes avant de dormir.',
  'Cet été, nous irons camper au bord du lac Saint-Jean avec nos cousins.',
];
function f7xOrderLong(R) {
  const s = R.pick(LONG7);
  return {
    type: 'order',
    key: `f7x-ol-${s}`,
    prompt: 'Écoute la phrase. Remets les mots dans l’ordre.',
    say: say(s),
    tiles: s.split(' '),
    joiner: ' ',
  };
}
f7.generate = run({
  1: [
    (R) => f7Order(R, 3),
    (R) => f7WellWritten(R, SENT[3]),
    (R) => f7Type(R),
    (R) => f7Sens(R, 3),
    (R) => f7xType(R, false),
    (R) => f7xOrderConst(R),
  ],
  2: [
    (R) => f7xType(R, true),
    (R) => f7xConst(R, ['S', 'V']),
    (R) => f7xConst(R, ['S', 'V', 'C']),
    (R) => f7xNeg(R),
    (R) => f7xInter(R),
    (R) => f7xOrderConst(R),
    (R) => f7xOrderLong(R),
  ],
  3: [
    (R) => f7xType(R, true),
    (R) => f7xConst(R, ['S', 'C', 'CP']),
    (R) => f7xConst(R, ['CP', 'CP', 'V', 'C']),
    (R) => f7xNeg(R),
    (R) => f7xInter(R),
    (R) => f7xOrderLong(R),
    (R) => f7xOrderLong(R),
  ],
});
f7.pfeq = 'Écriture — la phrase : types (déclarative, interrogative, impérative, exclamative), forme négative, sujet, verbe et compléments (PFEQ 1er cycle, 2e année – 2e cycle, 3e année)';

/* ---------------- f8 : textes plus longs, avec inférences ---------------- */
const NEW_TEXTS2 = `
## 2 chalet
Samedi matin, Émile et son père partent en motoneige vers le chalet de grand-papa. La route est étroite et le vent souffle fort. Quand ils arrivent, la cheminée fume déjà : grand-papa a allumé le poêle à bois pour les attendre. Émile enlève ses bottes pleines de neige et s’assoit près du feu. Il tend ses mains rouges vers la chaleur. Son père sourit et prépare un chocolat chaud avec de la crème fouettée.
? Comment Émile et son père vont-ils au chalet?|En motoneige|En autobus|En auto
? Qui a allumé le poêle à bois?|Grand-papa|Le père d’Émile|Émile
? Pourquoi la cheminée fume-t-elle déjà?|Parce que grand-papa a allumé le poêle|Parce qu’il y a un incendie|Parce que personne n’est arrivé
? Pourquoi Émile tend-il ses mains vers le feu?|Parce qu’il a froid|Parce qu’il a faim|Parce qu’il veut jouer
? Que prépare le père d’Émile à la fin?|Un chocolat chaud|Une soupe aux pois|Du café
? Que peut-on deviner sur la journée?|Qu’il fait froid dehors|Qu’il fait très chaud|Qu’il pleut beaucoup
VF Émile voyage tout seul.|F
VF Grand-papa attend Émile au chalet.|V

## 2 biblio3
Chaque jeudi, la classe de madame Lucie va à la bibliothèque de l’école. Les élèves ont le droit d’emprunter deux livres pour une semaine. Camille choisit toujours un livre sur les chevaux, mais cette fois, elle hésite devant une histoire de dragons. Son ami Hugo l’aide : il lui dit que la fin est surprenante. Camille décide de prendre les deux. Sur le chemin du retour, elle serre ses livres contre elle pour ne pas les perdre.
? Quel jour la classe va-t-elle à la bibliothèque?|Le jeudi|Le lundi|Le vendredi
? Combien de livres les élèves peuvent-ils emprunter?|Deux|Trois|Un
? Qu’est-ce que Camille choisit d’habitude?|Un livre sur les chevaux|Un livre sur les dragons|Un livre de recettes
? Pourquoi Camille hésite-t-elle?|Elle ne sait pas si elle prend les chevaux ou les dragons|Elle n’a plus de place dans son sac|Elle n’aime pas lire
? Pourquoi Camille serre-t-elle ses livres contre elle?|Pour ne pas les perdre|Pour les cacher à Hugo|Parce qu’elle a froid
? Qui aide Camille à décider?|Hugo|Madame Lucie|Son père
VF Camille prend les deux livres.|V
VF Camille laisse le livre de chevaux à la bibliothèque.|F

## 2 verglas
Ce matin, il y a eu du verglas. Les arbres brillent comme des bijoux de cristal, mais les trottoirs sont très glissants. Madame Roy marche lentement avec ses petits pas. Soudain, son chien Pitou tire sur la laisse et elle glisse sur les fesses. Un garçon qui passait court l’aider à se relever. Madame Roy rit, un peu gênée, puis elle remercie le garçon. Elle décide de rentrer et de jeter du sel devant sa porte.
? Qu’est-ce qui a recouvert les arbres?|Du verglas|De la neige poudreuse|De la rosée
? Pourquoi madame Roy marche-t-elle lentement?|Parce que les trottoirs sont glissants|Parce qu’elle est fâchée|Parce qu’elle cherche son chien
? Que fait Pitou?|Il tire sur la laisse|Il dort|Il s’enfuit dans la rue
? Qui l’aide à se relever?|Un garçon qui passait|Son mari|Un policier
? Pourquoi madame Roy est-elle un peu gênée?|Parce qu’elle est tombée devant tout le monde|Parce qu’elle a perdu son chien|Parce qu’elle a oublié son sac
? Pourquoi madame Roy jette-t-elle du sel devant sa porte?|Pour faire fondre la glace|Pour décorer l’entrée|Pour nourrir les oiseaux
VF Les arbres sont couverts de glace.|V
VF Madame Roy reste dehors toute la journée.|F

## 2 pique
Pour l’anniversaire de Mia, toute la famille fait un pique-nique près du lac. Papa étend une grande couverture à carreaux sous un érable. Maman sort les sandwichs et les fruits du panier. Pendant que les adultes jasent, Mia et son cousin Nico cherchent des cailloux plats pour les lancer sur l’eau. Tout à coup, un nuage noir cache le soleil et les premières gouttes tombent. Tout le monde ramasse les assiettes en vitesse et court vers l’auto en riant.
? Pourquoi la famille fait-elle un pique-nique?|C’est l’anniversaire de Mia|C’est la fête de Noël|C’est la fin de l’école
? Où papa étend-il la couverture?|Sous un érable|Sur le quai|Dans l’auto
? Que cherchent Mia et Nico?|Des cailloux plats|Des coquillages|Des pommes
? Pourquoi tout le monde court-il vers l’auto?|Parce qu’il commence à pleuvoir|Parce que le pique-nique est fini|Parce qu’un chien les poursuit
? Comment la famille réagit-elle quand la pluie commence?|Elle rit et se dépêche|Elle pleure|Elle reste sous la pluie
? Comment était le temps au début de la journée?|Il faisait beau|Il neigeait|Il y avait du brouillard
VF Maman sort les sandwichs du panier.|V
VF Les adultes lancent des cailloux sur l’eau.|F

## 2 ourse
Dans la forêt, une maman ourse se prépare pour l’hiver. Tout l’automne, elle mange beaucoup de baies, de poissons et de noix pour faire des réserves de gras. Quand les nuits deviennent glaciales, elle choisit une grotte sèche et y entre avec ses deux petits. Elle dort la majeure partie de la saison, mais elle ne dort pas d’un sommeil complet : si un bruit la dérange, elle ouvre un œil. Au printemps, elle sortira, maigre mais fière, avec ses oursons.
? Pourquoi l’ourse mange-t-elle beaucoup à l’automne?|Pour faire des réserves de gras|Parce qu’elle s’ennuie|Pour nourrir les loups
? Que mange l’ourse?|Des baies, des poissons et des noix|Du fromage et du pain|Des carottes
? Où dort l’ourse?|Dans une grotte sèche|Dans un arbre|Au fond d’un lac gelé
? Combien de petits l’ourse a-t-elle?|Deux|Trois|Un
? Pourquoi l’ourse sera-t-elle maigre au printemps?|Parce qu’elle aura utilisé ses réserves pendant l’hiver|Parce qu’elle n’aime pas manger|Parce qu’elle sera malade
? Que fait l’ourse si un bruit la dérange?|Elle ouvre un œil|Elle s’enfuit|Elle se met à chanter
VF L’ourse dort d’un sommeil très profond tout l’hiver.|F
VF L’ourse sort de sa grotte au printemps.|V

## 2 defi
Le défi de lecture commence lundi à l’école de Jade. Pendant un mois, chaque élève doit lire quinze minutes par soir et noter le titre de son livre sur une carte. Jade n’aime pas beaucoup lire parce qu’elle trouve ça long. Son grand frère lui prête un roman d’aventures avec des pirates. Le soir même, elle lit dix pages sans s’en rendre compte. Le lendemain, elle demande à son enseignante si elle peut emprunter la suite.
? Combien de temps dure le défi de lecture?|Un mois|Une semaine|Un an
? Combien de minutes faut-il lire chaque soir?|Quinze|Dix|Trente
? Pourquoi Jade n’aime-t-elle pas lire au début?|Elle trouve ça long|Elle ne sait pas lire|Elle a mal aux yeux
? Qui prête un livre à Jade?|Son grand frère|Son enseignante|Sa meilleure amie
? Pourquoi Jade demande-t-elle la suite du livre?|Parce qu’elle a aimé l’histoire|Parce qu’elle a perdu le premier|Parce que son frère le veut
? Que montre l’expression « sans s’en rendre compte »?|Qu’elle était très prise par l’histoire|Qu’elle était fâchée|Qu’elle dormait
VF Jade note le titre de son livre sur une carte.|V
VF Le roman parle de dragons.|F

## 2 sirene
Hier soir, la sirène des pompiers a réveillé tout le quartier. Un camion rouge a tourné au coin de la rue Beaulieu et s’est arrêté devant une maison. Heureusement, il n’y avait pas de feu : le détecteur de fumée sonnait parce que quelqu’un avait oublié une casserole sur la cuisinière. Les pompiers sont entrés, ont ouvert les fenêtres et ont tout vérifié. La famille, un peu gênée, les a remerciés. Le plus jeune des enfants a même pu s’asseoir dans le gros camion.
? Qu’est-ce qui a réveillé le quartier?|La sirène des pompiers|Un orage|Un concert
? Où le camion s’est-il arrêté?|Devant une maison de la rue Beaulieu|Devant l’école|Devant le dépanneur
? Pourquoi le détecteur de fumée sonnait-il?|Quelqu’un avait oublié une casserole sur la cuisinière|La maison brûlait|Un enfant jouait avec une allumette
? Que font les pompiers dans la maison?|Ils ouvrent les fenêtres et vérifient tout|Ils éteignent un gros feu|Ils déménagent les meubles
? Pourquoi la famille est-elle un peu gênée?|Parce que c’était une fausse alerte|Parce que la maison est sale|Parce qu’elle est en retard
? Qui a pu s’asseoir dans le camion?|Le plus jeune des enfants|Le papa|La voisine
VF Il y avait un gros incendie.|F
VF La famille remercie les pompiers.|V

## 2 monarque
Chaque automne, des millions de papillons monarques quittent le Canada et s’envolent vers le Mexique. Le voyage dure plusieurs semaines et fait plus de trois mille kilomètres. Les monarques volent le jour et se reposent la nuit, accrochés aux arbres. Ils sont si légers qu’un petit vent les pousse comme des feuilles. Au printemps, ce ne sont pas les mêmes papillons qui reviennent : ce sont leurs enfants et leurs petits-enfants! Les scientifiques les suivent en collant de minuscules étiquettes sur leurs ailes.
? Où vont les monarques à l’automne?|Au Mexique|En Alaska|En France
? Quand les monarques volent-ils?|Le jour|La nuit|Seulement quand il pleut
? Que font-ils la nuit?|Ils se reposent accrochés aux arbres|Ils chassent|Ils construisent un nid
? Pourquoi un petit vent peut-il les pousser?|Parce qu’ils sont très légers|Parce qu’ils sont très gros|Parce qu’ils sont fatigués
? Que veut dire « ce sont leurs enfants et leurs petits-enfants »?|Que ce sont de nouvelles générations|Que ce sont les mêmes papillons|Que les papillons ont adopté des enfants
? Comment les scientifiques suivent-ils les monarques?|Avec de minuscules étiquettes sur les ailes|Avec des caméras sous l’eau|En les gardant dans des cages
VF Le voyage dure quelques heures.|F
VF Les monarques reviennent au Canada au printemps.|V
`;
const NEW_TEXTS3 = `
## 3 cabane2
Au mois de mars, la classe de madame Chantal visite une cabane à sucre. Il fait encore froid, mais le soleil brille et la neige commence à fondre. Un grand monsieur à la barbe grise explique comment on recueille l’eau d’érable dans des seaux accrochés aux arbres. Ensuite, il faut la faire bouillir très longtemps pour obtenir du sirop. Léa goûte la tire sur la neige et elle fait une grimace parce que c’est collant. Son ami Noé en mange trois! À la fin de la journée, tous les élèves ont les doigts tout sucrés et ils ont hâte de raconter leur sortie à la maison.
? À quel moment de l’année a lieu la sortie?|En mars|En juillet|En octobre
? Comment recueille-t-on l’eau d’érable?|Dans des seaux accrochés aux arbres|Dans des tuyaux sous la terre|Avec des cuillères
? Pourquoi faut-il faire bouillir l’eau d’érable très longtemps?|Pour obtenir du sirop|Pour la refroidir|Pour la rendre salée
? Pourquoi Léa fait-elle une grimace?|Parce que la tire est collante|Parce qu’elle déteste le sucre|Parce qu’elle a perdu sa mitaine
? Que peut-on conclure au sujet de Noé?|Qu’il adore la tire|Qu’il a peur de la neige|Qu’il est malade
? Pourquoi les élèves ont-ils les doigts sucrés?|Parce qu’ils ont mangé de la tire collante|Parce qu’ils ont joué dans la boue|Parce qu’ils ont fait de la peinture
? Comment les élèves se sentent-ils à la fin de la journée?|Contents d’avoir vécu une belle sortie|Fâchés et ennuyés|Inquiets pour le lendemain
VF Il fait très chaud pendant la visite.|F

## 3 tempete
Hier, une grosse tempête de neige a surpris tout le monde. Les flocons tombaient si dru qu’on ne voyait plus la maison d’en face. À la radio, on annonçait la fermeture de toutes les écoles. Alice a sauté de joie, mais sa mère lui a rappelé qu’il faudrait d’abord déneiger l’entrée. Alors, malgré le vent glacial, toute la famille est sortie avec des pelles. Après une heure d’efforts, ils avaient dégagé l’auto, l’escalier et un petit sentier pour le chat. Quand ils sont rentrés, les joues rouges, un bon chocolat chaud les attendait.
? Qu’est-ce qui a surpris tout le monde?|Une grosse tempête de neige|Un orage d’été|Une panne d’électricité
? Que disait la radio?|Que toutes les écoles fermaient|Que la neige allait fondre|Que les magasins ouvraient plus tôt
? Pourquoi Alice a-t-elle sauté de joie?|Parce qu’il n’y avait pas d’école|Parce qu’elle voulait aller au cinéma|Parce que c’était son anniversaire
? Pourquoi toute la famille sort-elle avec des pelles?|Pour déneiger l’entrée|Pour jouer au hockey|Pour planter des arbres
? Que veut dire « les flocons tombaient si dru »?|Qu’ils tombaient en grande quantité|Qu’ils tombaient très lentement|Qu’ils étaient très chauds
? Pourquoi les joues de la famille sont-elles rouges?|À cause du froid et de l’effort|À cause d’un coup de soleil|Parce qu’ils ont pleuré
? Pour qui dégagent-ils un petit sentier?|Pour le chat|Pour le facteur|Pour le voisin
VF La famille a déneigé pendant dix heures.|F

## 3 camp
Pour la première fois de sa vie, Félix part en camp d’été pendant une semaine. Dans l’autobus, il serre son toutou dans son sac à dos et fait semblant de regarder par la fenêtre, mais son cœur bat très fort. À son arrivée, un moniteur nommé Simon lui montre sa cabane et son lit en haut d’une couchette. Le premier soir, autour du feu, tout le monde chante et mange des guimauves grillées. Félix oublie vite son inquiétude. Quand sa mère téléphone, il lui dit qu’il n’a pas le temps de lui parler parce qu’on l’attend pour la pêche!
? Combien de temps dure le camp?|Une semaine|Un mois|Une fin de semaine
? Que cache Félix dans son sac à dos?|Son toutou|Sa console|Un sandwich
? Pourquoi Félix regarde-t-il par la fenêtre?|Pour cacher qu’il est nerveux|Pour voir les animaux|Parce qu’il a le mal des transports
? Que veut dire « son cœur bat très fort »?|Qu’il est nerveux|Qu’il est fatigué|Qu’il est malade
? Qui lui montre sa cabane?|Un moniteur nommé Simon|Sa mère|Un autre campeur
? Que fait-on autour du feu le premier soir?|On chante et on mange des guimauves|On joue aux cartes|On dort
? Pourquoi Félix dit-il à sa mère qu’il n’a pas le temps?|Parce qu’il s’amuse et qu’on l’attend pour la pêche|Parce qu’il est fâché contre elle|Parce que son téléphone est brisé
VF Félix s’ennuie énormément à la fin du premier soir.|F

## 3 recyclage
Dans la classe de monsieur Karim, les élèves ont décidé de réduire leurs déchets. D’abord, ils ont placé trois bacs au fond de la classe : un pour le papier, un pour le plastique et un pour le compost. Ensuite, Rémi, le responsable de la semaine, vérifie que chacun trie bien. Au début, il y avait des erreurs : une pelure de banane dans le bac du papier, une bouteille dans le compost. Après trois semaines, la classe a pesé les déchets : il y en avait presque deux fois moins! Les élèves étaient très fiers et ils ont proposé le même projet à toute l’école.
? Combien de bacs y a-t-il dans la classe?|Trois|Deux|Quatre
? Qui vérifie le tri cette semaine?|Rémi|Monsieur Karim|Toute la classe en même temps
? Où la pelure de banane a-t-elle été jetée par erreur?|Dans le bac du papier|Dans le compost|Dans le bac du plastique
? Pourquoi la classe a-t-elle pesé les déchets?|Pour vérifier si le projet fonctionnait|Pour gagner un concours|Parce que la balance était neuve
? Que montre le fait qu’il y avait presque deux fois moins de déchets?|Que le projet a bien fonctionné|Que les élèves ont mangé moins|Que le tri était inutile
? Pourquoi les élèves étaient-ils fiers?|Parce que leur effort donnait des résultats|Parce qu’ils n’avaient plus de devoirs|Parce qu’ils avaient gagné un voyage
? Que proposent-ils à la fin?|Le même projet pour toute l’école|Un voyage au zoo|Un nouveau bac pour monsieur Karim
VF Après trois semaines, il y avait deux fois plus de déchets.|F

## 3 orignal
Un soir de septembre, Camille et son père attendent en silence au bord d’un petit lac. Ils ont garé leur camion plus loin pour ne pas faire de bruit. Soudain, un craquement résonne dans les bois. Un énorme orignal sort des arbres, ses bois couverts de mousse, et s’avance dans l’eau peu profonde. Camille retient son souffle. Elle voudrait prendre une photo, mais elle n’ose pas bouger. Quelques minutes plus tard, l’animal disparaît aussi doucement qu’il est apparu. « On a eu de la chance », chuchote son père. Camille rentre à la maison avec des étoiles dans les yeux.
? Où Camille et son père attendent-ils?|Au bord d’un petit lac|Dans un champ|Dans une cabane
? Pourquoi ont-ils garé leur camion plus loin?|Pour ne pas faire de bruit|Parce que la route était fermée|Parce qu’il n’avait plus d’essence
? Qu’est-ce qui annonce l’arrivée de l’orignal?|Un craquement dans les bois|Un cri dans le ciel|Une odeur de fumée
? Pourquoi Camille retient-elle son souffle?|Elle est émerveillée et ne veut pas le faire fuir|Elle est malade|Elle a peur de tomber à l’eau
? Pourquoi Camille ne prend-elle pas de photo?|Elle n’ose pas bouger|Son appareil est cassé|Il fait trop noir
? Que veut dire « des étoiles dans les yeux »?|Qu’elle est ravie|Qu’elle est endormie|Qu’elle a pleuré
? Que fait l’orignal à la fin?|Il disparaît doucement|Il charge le camion|Il nage vers eux
VF Camille prend plusieurs photos.|F

## 3 musee
Pour la sortie de fin d’année, la classe de troisième année visite le Musée de la civilisation à Québec. Dans la grande salle, un guide explique la vie des Premières Nations avant l’arrivée des Européens. Thomas écoute avec attention, mais Laurence, elle, regarde surtout une vitrine pleine de perles colorées. À midi, tout le monde mange sur la terrasse, face au fleuve. Un bateau-traversier passe lentement, et les enfants lui font de grands signes. Au retour, Laurence, qui n’avait pas écouté, demande à Thomas de lui résumer la visite. Il rit et lui répond : « Regarde dans mon cahier! »
? Où se trouve le musée?|À Québec|À Montréal|À Gatineau
? Qu’est-ce que le guide explique?|La vie des Premières Nations|Les dinosaures|Les voyages dans l’espace
? Que regarde surtout Laurence?|Une vitrine pleine de perles|Le guide|Le fleuve
? Que fait la classe à midi?|Elle mange sur la terrasse|Elle visite une autre salle|Elle retourne à l’école
? Pourquoi Laurence demande-t-elle à Thomas de lui résumer la visite?|Parce qu’elle n’avait pas écouté|Parce qu’elle est arrivée en retard|Parce qu’elle est la guide
? Que peut-on deviner au sujet de Thomas?|Qu’il a pris des notes|Qu’il s’est endormi|Qu’il n’a rien écouté
? Pourquoi les enfants font-ils des signes au bateau?|Parce qu’ils trouvent ça amusant|Parce qu’ils sont perdus|Parce qu’ils veulent monter à bord
VF Tous les élèves écoutent le guide avec attention.|F

## 3 poulailler
Chez ma grand-mère, mon travail du matin consiste à nourrir les poules. J’ouvre la porte du poulailler, je verse le grain dans les mangeoires et je remplis l’abreuvoir d’eau fraîche. Ensuite, je cherche les œufs dans la paille. Hier, j’en ai trouvé neuf, dont un tout petit, presque rond. Grand-maman dit que c’est l’œuf d’une jeune poule qui apprend son métier. Je dépose les œufs dans mon panier avec précaution, car ils se cassent facilement. À la cuisine, elle me prépare toujours une omelette avec les plus frais.
? Quel est le travail du matin du narrateur?|Nourrir les poules|Traire les vaches|Ramasser les pommes
? Que verse-t-il dans les mangeoires?|Du grain|De l’eau|De la paille
? Combien d’œufs a-t-il trouvés hier?|Neuf|Six|Douze
? Pourquoi l’un des œufs est-il tout petit?|Il vient d’une jeune poule|Il est cassé|Il vient d’un canard
? Pourquoi dépose-t-il les œufs avec précaution?|Parce qu’ils se cassent facilement|Parce qu’ils sont chauds|Parce qu’ils sont lourds
? Que prépare grand-maman avec les œufs?|Une omelette|Un gâteau|Des crêpes
? Que peut-on dire du narrateur?|Qu’il aime aider sa grand-mère|Qu’il déteste les poules|Qu’il a peur des œufs
VF Le narrateur ramasse les œufs dans la paille.|V

## 3 finale
Samedi, c’est la finale du tournoi de hockey mineur. Dans le vestiaire, l’entraîneur répète une dernière fois les consignes : « On passe la rondelle, on reste calmes et on s’amuse. » Pendant le match, l’équipe de Xavier perd 2 à 1 jusqu’à la troisième période. Puis Xavier reçoit une belle passe et marque le but égalisateur à vingt secondes de la fin. En prolongation, son ami Malik marque le but gagnant. Les joueurs lancent leurs gants en l’air et sautent sur la glace. Xavier, lui, sourit mais ne dit rien : il pense surtout à la passe qui lui a permis de marquer.
? Quelle est la consigne de l’entraîneur?|Passer la rondelle, rester calmes et s’amuser|Gagner à tout prix|Ne jamais passer la rondelle
? Quel est le pointage au début de la troisième période?|2 à 1 pour l’autre équipe|1 à 1|3 à 0 pour l’équipe de Xavier
? Que fait Xavier à vingt secondes de la fin?|Il marque le but égalisateur|Il reçoit une punition|Il blesse un joueur
? Qui marque le but gagnant?|Malik|Xavier|L’entraîneur
? Pourquoi les joueurs lancent-ils leurs gants en l’air?|Pour fêter la victoire|Pour montrer qu’ils sont fâchés|Parce qu’ils ont chaud
? Pourquoi Xavier ne dit-il rien?|Il pense à la belle passe qui l’a aidé|Il est triste d’avoir perdu|Il est blessé
? À quel moment le match se termine-t-il?|Pendant la prolongation|À la fin de la première période|Avant le début de la troisième période
VF L’équipe de Xavier perd la finale.|F
`;
const POOLS2 = { 2: [], 3: [] };
function parseTexts(src, pool) {
  for (const block of src.split('\n## ').map((b, i) => (i === 0 ? b.replace(/^[\s\S]*?## /, '') : b)).filter((b) => b.trim())) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    const [lvl, id] = lines[0].split(' ');
    const entry = { id: `x-${id}`, t: lines[1], qs: [] };
    for (const l of lines.slice(2)) {
      if (l.startsWith('VF ')) {
        const [s, v] = l.slice(3).split('|');
        entry.qs.push({ vf: true, s, v: v === 'V' });
      } else if (l.startsWith('? ')) {
        const [p, ok, a, b] = l.slice(2).split('|');
        entry.qs.push({ p, ok, w: [a, b] });
      }
    }
    pool[Number(lvl)].push(entry);
  }
}
parseTexts(NEW_TEXTS2, POOLS2);
parseTexts(NEW_TEXTS3, POOLS2);
function f8xRead(R, pool) {
  const tx = R.pick(pool);
  const qi = R.int(0, tx.qs.length - 1);
  const q = tx.qs[qi];
  const o = (t) => ({ text: t, say: say(t) });
  if (q.vf) {
    return {
      type: 'choice',
      key: `f8x-${tx.id}-${qi}`,
      prompt: `Vrai ou faux? ${q.s}`,
      say: say(`${tx.t} Vrai ou faux? ${q.s}`),
      stimulus: { text: tx.t },
      options: [o('Vrai'), o('Faux')],
      answer: q.v ? 0 : 1,
      fixedOrder: true,
      cols: 2,
    };
  }
  return mkChoice(R, `f8x-${tx.id}-${qi}`, q.p, o(q.ok), q.w.map(o), {
    say: say(`${tx.t} ${q.p}`),
    stimulus: { text: tx.t },
  });
}
const POOL8_L1 = [...POOLS[2], ...POOLS[3]];
f8.generate = run({
  1: [(R) => f8xRead(R, POOL8_L1)],
  2: [(R) => f8xRead(R, POOLS2[2])],
  3: [(R) => f8xRead(R, POOLS2[3])],
});
f8.pfeq = 'Lecture — compréhension de textes de 40 à 120 mots : informations explicites, inférences, vocabulaire en contexte, vrai ou faux (PFEQ 1er cycle, 2e année – 2e cycle, 3e année)';

/* ---------------- f9 : vocabulaire ---------------- */
// mot | définition | type | niveau minimal
const DEFS_RAW = `
minuscule|très, très petit|a|2
énorme|très, très gros|a|2
courageux|qui n’a pas peur du danger|a|2
timide|qui n’ose pas parler aux autres|a|2
généreux|qui aime donner aux autres|a|2
gourmand|qui aime beaucoup manger|a|2
paresseux|qui n’aime pas travailler|a|2
bavard|qui parle tout le temps|a|2
silencieux|qui ne fait pas de bruit|a|2
curieux|qui veut tout savoir|a|2
affamé|qui a très faim|a|2
assoiffé|qui a très soif|a|2
prudent|qui fait attention au danger|a|2
inquiet|qui a peur qu’il arrive quelque chose|a|3
apercevoir|voir un instant, de loin|v|2
construire|bâtir quelque chose|v|2
réparer|remettre en état ce qui est brisé|v|2
cueillir|ramasser des fleurs ou des fruits|v|2
hésiter|ne pas savoir quoi choisir|v|3
chuchoter|parler tout bas|v|2
se dépêcher|aller plus vite|v|2
s’échapper|réussir à s’enfuir|v|3
un sentier|un petit chemin dans la nature|n|2
un trésor|un ensemble d’objets précieux caché quelque part|n|2
une forêt|un grand terrain couvert d’arbres|n|2
un sommet|le point le plus haut d’une montagne|n|2
un volcan|une montagne qui peut cracher de la lave|n|2
une île|une terre entourée d’eau|n|2
un désert|un endroit très sec où il pleut très peu|n|3
une tempête|un très mauvais temps, avec beaucoup de vent|n|3
le verglas|une couche de glace sur le sol|n|3
une recette|des instructions pour préparer un plat|n|3
un horaire|un tableau qui indique les heures|n|3
un exploit|une action extraordinaire, très difficile|n|3
une légende|une histoire très ancienne qu’on se raconte|n|3
un moteur|une machine qui fait avancer un véhicule|n|3
un voisin|une personne qui habite près de chez nous|j|2
un dentiste|une personne qui soigne les dents|j|2
un menuisier|une personne qui travaille le bois|j|2
un facteur|une personne qui livre le courrier|j|2
un pêcheur|une personne qui attrape des poissons|j|2
un cultivateur|une personne qui cultive la terre|j|3
un inventeur|une personne qui crée un nouvel objet|j|3
un bibliothécaire|une personne qui s’occupe des livres d’une bibliothèque|j|3
`;
const DEFS = DEFS_RAW.trim().split('\n').map((l) => {
  const [w, d, t, lv] = l.split('|');
  return { w, d, t, lv: Number(lv) };
});
function f9xDef(R, level) {
  const x = R.pick(DEFS.filter((d) => d.lv <= level));
  const same = DEFS.filter((d) => d.t === x.t && d !== x);
  const wrong = R.sample(same.length >= 3 ? same : DEFS.filter((d) => d !== x), 3);
  return mkChoice(R, `f9x-d-${x.w}`, `Que veut dire « ${x.w} »?`, spk(x.d), wrong.map((d) => spk(d.d)), {
    say: say(`Que veut dire ${x.w}?`),
    cols: 1,
  });
}
const CLOZE9 = [
  ['Le dentiste soigne nos ___.', 'dents', 'yeux', 'pieds', 'oreilles'],
  ['Pour traverser la rivière, nous avons construit un ___.', 'pont', 'toit', 'puits', 'four'],
  ['Un ___ est une personne qui livre le courrier.', 'facteur', 'voisin', 'pêcheur', 'cuisinier'],
  ['J’ai très soif : je voudrais un grand verre d’___.', 'eau', 'huile', 'encre', 'essence'],
  ['Pour atteindre le sommet, il faut ___ la montagne.', 'escalader', 'descendre', 'creuser', 'nager'],
  ['Quand on est ___, on a envie de dormir.', 'fatigué', 'affamé', 'joyeux', 'pressé'],
  ['Le soleil est très fort : je mets de la crème ___.', 'solaire', 'sucrée', 'salée', 'glacée'],
  ['Mon frère est très ___ : il ne dit jamais un mot en classe.', 'timide', 'bavard', 'gourmand', 'bruyant'],
  ['Ma sœur est très ___ : elle parle sans arrêt.', 'bavarde', 'silencieuse', 'endormie', 'timide'],
  ['Le chien aboie pour ___ la famille qu’un étranger arrive.', 'avertir', 'réparer', 'cuisiner', 'peindre'],
  ['Je dois ___ ce livre à la bibliothèque avant vendredi.', 'rendre', 'planter', 'éteindre', 'cuisiner'],
  ['Avant de traverser la rue, il faut ___ des deux côtés.', 'regarder', 'chanter', 'ranger', 'écrire'],
  ['Cet exercice est très ___ : personne ne réussit à le résoudre.', 'difficile', 'facile', 'court', 'sucré'],
  ['Pour faire un gâteau, il faut suivre une ___.', 'recette', 'adresse', 'chanson', 'carte'],
  ['Le randonneur suit un ___ dans la forêt.', 'sentier', 'plafond', 'dessert', 'chapeau'],
  ['Les pompiers ont éteint ___ très rapidement.', 'l’incendie', 'la chanson', 'le sable', 'le trésor'],
  ['La mer était ___ : il n’y avait aucune vague.', 'calme', 'agitée', 'houleuse', 'bruyante'],
  ['Papa met des gants pour ___ ses mains du froid.', 'protéger', 'laver', 'couper', 'compter'],
  ['L’oiseau ___ ses ailes et s’envole.', 'déploie', 'mange', 'creuse', 'cuisine'],
  ['Le menuisier travaille le ___.', 'bois', 'courrier', 'poisson', 'sable'],
  ['Il y a eu du verglas : les trottoirs sont couverts de ___.', 'glace', 'sable', 'herbe', 'feuilles'],
  ['Pour savoir à quelle heure part l’autobus, je consulte l’___.', 'horaire', 'dessert', 'orage', 'été'],
];
function f9xCloze(R) {
  const [s, ok, ...bad] = R.pick(CLOZE9);
  return mkChoice(R, `f9x-c-${s}`, 'Quel mot complète bien la phrase?', spk(ok), R.sample(bad, 3).map(spk), {
    say: say(s.replace('___', ' … ')),
    stimulus: { text: s },
    cols: 2,
  });
}
// catégories : nom | étiquette | membres
const HYPER_RAW = `
véhicules|les véhicules|auto camion autobus vélo motoneige train bateau avion métro tracteur
instruments de musique|les instruments de musique|guitare piano violon trompette tambour flûte saxophone harmonica clarinette
outils|les outils|marteau scie tournevis pelle râteau pince perceuse hache
meubles|les meubles|table chaise lit bureau armoire canapé commode
vêtements|les vêtements|manteau pantalon chandail tuque mitaine bottes jupe foulard chemise
sports|les sports|hockey soccer tennis natation ski patinage basketball golf boxe
métiers|les métiers|pompier médecin boulanger facteur pilote dentiste plombier menuisier
insectes|les insectes|fourmi abeille papillon coccinelle moustique mouche sauterelle libellule
oiseaux|les oiseaux|hibou aigle outarde moineau cardinal pingouin perroquet colibri
arbres|les arbres|érable bouleau sapin chêne pin saule peuplier épinette
boissons|les boissons|lait jus eau thé tisane limonade cacao café
planètes|les planètes|Mars Vénus Jupiter Saturne Neptune Mercure Uranus
sentiments|les sentiments|joie colère peur tristesse surprise fierté jalousie honte
fournitures|les fournitures scolaires|crayon cartable règle cahier ciseaux colle stylo compas
fruits|les fruits|pomme poire banane fraise cerise orange raisin melon
légumes|les légumes|carotte chou brocoli oignon patate navet poireau céleri
ferme|les animaux de la ferme|vache cochon poule mouton cheval chèvre dindon âne
marins|les animaux marins|baleine requin dauphin phoque morse pieuvre crabe homard
pays|les pays|Canada France Mexique Chine Brésil Italie Japon Maroc
formes|les figures géométriques|carré triangle rectangle losange ovale hexagone cercle
`;
const HYPER = HYPER_RAW.trim().split('\n').map((l) => {
  const [id, label, m] = l.split('|');
  return { id, label, members: m.split(' ') };
});
const HYP_EASY = ['fruits', 'légumes', 'ferme', 'vêtements', 'véhicules', 'meubles', 'boissons', 'sports'];
function f9xHyper(R, n, ids) {
  const pool = ids ? HYPER.filter((h) => ids.includes(h.id)) : HYPER;
  const cat = R.pick(pool);
  const three = R.sample(cat.members, 3);
  const others = R.sample(HYPER.filter((h) => h !== cat), n - 1);
  return mkChoice(R, `f9x-h-${cat.id}-${nameKey(three)}`, 'Quel groupe contient tous ces mots?', spk(cat.label), others.map((h) => spk(h.label)), {
    say: say('Quel groupe contient tous ces mots?'),
    stimulus: { text: three.join(' · ') },
    cols: 2,
  });
}
function f9xIntruder(R, ids) {
  const pool = ids ? HYPER.filter((h) => ids.includes(h.id)) : HYPER;
  const cat = R.pick(pool);
  const three = R.sample(cat.members, 3);
  const other = R.pick(HYPER.filter((h) => h !== cat));
  const odd = R.pick(other.members);
  return mkChoice(R, `f9x-i-${cat.id}-${nameKey(three)}-${odd}`, 'Quel mot ne va pas avec les autres?', spk(odd), three.map(spk), {
    say: say('Quel mot ne va pas avec les autres?'),
    cols: 2,
  });
}
function f9xSortCat(R, nb, counts, ids) {
  const pool = ids ? HYPER.filter((h) => ids.includes(h.id)) : HYPER;
  const cats = R.sample(pool, nb);
  const groups = cats.map((c, i) => R.sample(c.members, counts[i]).map(spk));
  return mkSort(
    R,
    `f9x-s-${cats.map((c) => c.id).join('+')}-${nameKey(groups.flat().map((x) => x.text))}`,
    'Classe chaque mot dans le bon groupe.',
    cats.map((c) => ({ text: cap1(c.label) })),
    groups,
    { say: say('Classe chaque mot dans le bon groupe.') },
  );
}
function f9xWhichIs(R, ids) {
  const pool = ids ? HYPER.filter((h) => ids.includes(h.id)) : HYPER;
  const cat = R.pick(pool);
  const w = R.pick(cat.members);
  const wrong = R.sample(HYPER.filter((h) => h !== cat), 3).map((h) => R.pick(h.members));
  return mkChoice(R, `f9x-w-${cat.id}-${w}`, `Lequel de ces mots fait partie du groupe « ${cat.label} »?`, spk(w), uniq(wrong).filter((t) => t !== w).map(spk), {
    say: say(`Lequel de ces mots fait partie du groupe ${cat.label}?`),
    cols: 2,
  });
}
f9.generate = run({
  1: [
    (R) => f9AntonymLetters(R),
    (R) => f9Sort(R, 3, R.shuffle([2, 3, 3])),
    (R) => f9Image(R, 3),
    (R) => f9Intruder(R),
    (R) => f9xHyper(R, 3, HYP_EASY),
    (R) => f9xIntruder(R, HYP_EASY),
  ],
  2: [
    (R) => f9xDef(R, 2),
    (R) => f9xCloze(R),
    (R) => f9xHyper(R, 4),
    (R) => f9xIntruder(R),
    (R) => f9xWhichIs(R),
    (R) => f9xSortCat(R, 2, [3, 3]),
  ],
  3: [
    (R) => f9xDef(R, 3),
    (R) => f9xDef(R, 3),
    (R) => f9xCloze(R),
    (R) => f9xHyper(R, 4),
    (R) => f9xIntruder(R),
    (R) => f9xSortCat(R, 3, R.shuffle([3, 3, 2])),
  ],
});
f9.pfeq = 'Lecture / écriture — vocabulaire : sens des mots, mot juste en contexte, mot générique et catégories (PFEQ 1er cycle, 2e année – 2e cycle, 3e année)';

/* ---------------- f10 : ordre alphabétique, 2e et 3e lettre, mots-repères ---------------- */
const EXTRA10 = bag(`
chanson chapitre charbon chariot chasseur chaton chaleur chaîne chambre chance champion
comme commencer comprendre compter comparer commerce complet
concert conduire confiture content conte conseil continuer
parc parole parent partir partie parfum parti
passage passer passion pastille
prendre premier présent presque prince
problème projet promenade propre protéger profond
travail trace traîneau traverser tranquille
pouvoir pourquoi poumon poussière
soupir sourire sourd souvent souper
marché marin marque mardi marron marcher
merci mercredi merveille message
boulanger boulevard bouton bouteille boucle
carnaval carré carton cartable
couleur coupe couteau cousin couvert courir cour
grand grain graine grotte grenier
lundi lunettes lueur
animal anneau annonce année
bonjour bonheur bonne bottine
fabrique facile façon famille farine
jardin jambon jaune jeudi jouet journal
lapin larme laver lecture lettre
neige nettoyer niveau noisette nuit
raconter rapide rassembler ravi réponse
silence simple sirop sortie spectacle
vacances valise vendredi verglas village voyage
`);
const P10 = uniq([...W10.map((w) => w.text), ...EXTRA10]).filter((t) => /^[a-zéèêôâîûç]+$/.test(t));
const prefixMap = (k) => {
  const m = {};
  for (const t of P10) {
    const key = norm(t).slice(0, k);
    if (key.length === k) (m[key] ||= []).push(t);
  }
  for (const key of Object.keys(m)) {
    const seen = new Set();
    m[key] = m[key].filter((t) => (seen.has(norm(t)) ? false : seen.add(norm(t))));
  }
  return m;
};
const PRE1 = prefixMap(1);
const PRE2 = prefixMap(2);
const PRE3 = prefixMap(3);
const cmpW = (a, b) => (norm(a) < norm(b) ? -1 : norm(a) > norm(b) ? 1 : 0);
const sortS = (ws) => ws.slice().sort(cmpW);
function pickPre(R, pre, n) {
  const keys = Object.keys(pre).filter((k) => pre[k].length >= n);
  return R.sample(pre[R.pick(keys)], n);
}
function f10xOrder(R, pre, n) {
  const sorted = sortS(pickPre(R, pre, n));
  return {
    type: 'order',
    key: `f10x-o-${sorted.join('.')}`,
    prompt: 'Range les mots dans l’ordre alphabétique, comme dans un dictionnaire.',
    say: say('Range les mots dans l’ordre alphabétique, comme dans un dictionnaire.'),
    tiles: sorted,
    joiner: ' ',
  };
}
function f10xFirstLast(R, pre, n) {
  const ws = pickPre(R, pre, n);
  const sorted = sortS(ws);
  const first = R.chance(0.5);
  const target = first ? sorted[0] : sorted[sorted.length - 1];
  const q = first ? 'Quel mot vient en premier dans le dictionnaire?' : 'Quel mot vient en dernier dans le dictionnaire?';
  return mkChoice(R, `f10x-x-${first ? 'p' : 'd'}-${sorted.join('.')}`, q, spk(target), ws.filter((w) => w !== target).map(spk), {
    say: say(q),
    cols: 2,
  });
}
function f10xBeforeAfter(R, pre) {
  const s = sortS(pickPre(R, pre, 5));
  const after = R.chance(0.5);
  if (after) {
    const t = s[3];
    return mkChoice(R, `f10x-ap-${t}-${s.join('.')}`, `Quel mot vient après « ${t} » dans l’ordre alphabétique?`, spk(s[4]), [s[0], s[1], s[2]].map(spk), {
      say: say(`Quel mot vient après ${t} dans l’ordre alphabétique?`),
      cols: 2,
    });
  }
  const t = s[1];
  return mkChoice(R, `f10x-av-${t}-${s.join('.')}`, `Quel mot vient avant « ${t} » dans l’ordre alphabétique?`, spk(s[0]), [s[2], s[3], s[4]].map(spk), {
    say: say(`Quel mot vient avant ${t} dans l’ordre alphabétique?`),
    cols: 2,
  });
}
const ALL10 = sortS(P10);
function f10xGuide(R, same) {
  let list = ALL10;
  if (same) {
    const letters = Object.keys(PRE1).filter((l) => PRE1[l].length >= 22);
    list = sortS(PRE1[R.pick(letters)]);
  }
  const n = list.length;
  const i = R.int(8, n - 9);
  const t = list[i];
  const a = list[i - R.int(1, 3)];
  const b = list[i + R.int(1, 3)];
  const pair = (x, y) => `${x} — ${y}`;
  const wrong = [pair(list[i - 8], list[i - 5]), pair(list[i + 4], list[i + 7]), R.chance(0.5) ? pair(list[i - 6], list[i - 2]) : pair(list[i + 2], list[i + 8])];
  return mkChoice(R, `f10x-g-${t}-${a}-${b}-${wrong.join('|')}`, `Dans le dictionnaire, entre quels mots-repères trouve-t-on « ${t} »?`, { text: pair(a, b) }, wrong.map((w) => ({ text: w })), {
    say: say(`Dans le dictionnaire, entre quels mots-repères trouve-t-on ${t}?`),
    cols: 1,
  });
}
f10.generate = run({
  1: [
    (R) => f10OrderLetters(R, 5, 0, 25),
    (R) => f10OrderWords(R, pickDistinctFirst(R, 4)),
    (R) => f10OrderWords(R, pickSameFirst(R, 3)),
    (R) => f10OrderWords(R, pickSameFirst(R, 4)),
    (R) => f10FirstWord(R, pickSameFirst(R, 4)),
    (R) => f10xOrder(R, PRE2, 3),
  ],
  2: [
    (R) => f10xOrder(R, PRE2, 3),
    (R) => f10xOrder(R, PRE2, 4),
    (R) => f10xFirstLast(R, PRE2, 4),
    (R) => f10xBeforeAfter(R, PRE2),
    (R) => f10xGuide(R, false),
    (R) => f10xGuide(R, false),
  ],
  3: [
    (R) => f10xOrder(R, PRE2, 5),
    (R) => f10xOrder(R, PRE3, 4),
    (R) => f10xFirstLast(R, PRE3, 4),
    (R) => f10xBeforeAfter(R, PRE3),
    (R) => f10xBeforeAfter(R, PRE2),
    (R) => f10xGuide(R, true),
    (R) => f10xGuide(R, true),
  ],
});
f10.pfeq = 'Écriture — l’ordre alphabétique : classer des mots selon la 1re, la 2e et la 3e lettre, mots-repères du dictionnaire (PFEQ 1er cycle, 2e année – 2e cycle, 3e année)';

/* ---------------- f11 : majuscule et ponctuation ---------------- */
const ENUM11 = [
  ['J’ai acheté', ['des pommes', 'des poires', 'des bananes', 'des raisins', 'des fraises', 'des oranges']],
  ['Dans mon sac, il y a', ['un cahier', 'un crayon', 'une règle', 'une gomme à effacer', 'des ciseaux', 'un livre']],
  ['Au zoo, nous avons vu', ['un lion', 'un singe', 'une girafe', 'un zèbre', 'un éléphant', 'un tigre']],
  ['Pour le pique-nique, maman apporte', ['des sandwichs', 'du jus', 'des biscuits', 'des carottes', 'un melon']],
  ['L’hiver, je porte', ['une tuque', 'un manteau', 'des mitaines', 'des bottes', 'une écharpe']],
  ['À la ferme, on trouve', ['des vaches', 'des poules', 'des chevaux', 'des moutons', 'des cochons']],
  ['Pour mon anniversaire, j’invite', ['Léa', 'Max', 'Zoé', 'Tom', 'Mia', 'Noé']],
];
function f11Enum(R) {
  const [frame, items] = R.pick(ENUM11);
  const [a, b, c] = R.sample(items, 3);
  const ok = `${frame} ${a}, ${b} et ${c}.`;
  const wrongs = [`${frame} ${a} ${b} et ${c}.`, `${frame} ${a}, ${b}, et ${c}.`, `${frame}, ${a}, ${b} et ${c}.`];
  return mkChoice(R, `f11x-e-${frame}-${nameKey([a, b, c])}`, 'Quelle phrase est bien ponctuée?', spk(ok), wrongs.map(spk), {
    say: say('Quelle phrase est bien ponctuée?'),
    cols: 1,
  });
}
const VOC11 = ['viens ici', 'ferme la porte', 'écoute bien', 'regarde ce dessin', 'range tes jouets', 'passe-moi le sel', 'attends-moi', 'mange ta soupe'];
function f11Voc(R) {
  const n = R.pick(NAMES);
  const v = R.pick(VOC11);
  if (R.chance(0.5)) {
    const ok = `${n}, ${v}!`;
    return mkChoice(R, `f11x-v-${ok}`, 'Quelle phrase est bien écrite?', spk(ok), [`${n} ${v}!`, `${low1(n)}, ${v}!`, `${n}, ${cap1(v)}!`].map(spk), {
      say: say('Quelle phrase est bien écrite?'),
      cols: 1,
    });
  }
  const ok = `${cap1(v)}, ${n}!`;
  return mkChoice(R, `f11x-v-${ok}`, 'Quelle phrase est bien écrite?', spk(ok), [`${cap1(v)} ${n}!`, `${cap1(v)}, ${low1(n)}!`, `${v}, ${n}!`].map(spk), {
    say: say('Quelle phrase est bien écrite?'),
    cols: 1,
  });
}
function f11Two(R) {
  const [s1, s2] = R.sample(SENT[2], 2);
  const ok = `${s1} ${s2}`;
  const wrongs = [`${s1} ${low1(s2)}`, `${s1.slice(0, -1)} ${s2}`, `${s1.slice(0, -1)} ${low1(s2)}`];
  return mkChoice(R, `f11x-2-${s1}|${s2}`, 'Quel texte est bien écrit?', spk(ok), wrongs.map(spk), {
    say: say('Quel texte est bien écrit?'),
    cols: 1,
  });
}
const PLACE11 = [
  ['le lac Saint-Jean', ['le Lac Saint-Jean', 'le lac saint-jean', 'le lac Saint-jean']],
  ['le fleuve Saint-Laurent', ['le Fleuve Saint-Laurent', 'le fleuve saint-laurent', 'le fleuve Saint-laurent']],
  ['le mont Royal', ['le Mont Royal', 'le mont royal', 'le Mont royal']],
  ['la rue Sainte-Catherine', ['la Rue Sainte-Catherine', 'la rue sainte-catherine', 'la rue Sainte-catherine']],
  ['le boulevard Laurier', ['le Boulevard Laurier', 'le boulevard laurier', 'le Boulevard laurier']],
  ['l’île d’Orléans', ['l’Île d’Orléans', 'l’île d’orléans', 'l’Île d’orléans']],
  ['la ville de Québec', ['la Ville de Québec', 'la ville de québec', 'la Ville de québec']],
  ['le parc Jean-Drapeau', ['le Parc Jean-Drapeau', 'le parc jean-drapeau', 'le parc Jean-drapeau']],
  ['le pont Jacques-Cartier', ['le Pont Jacques-Cartier', 'le pont jacques-cartier', 'le pont Jacques-cartier']],
  ['la rivière Saguenay', ['la Rivière Saguenay', 'la rivière saguenay', 'la Rivière saguenay']],
  ['le Canada', ['le canada', 'Le canada']],
  ['les Laurentides', ['les laurentides', 'Les laurentides']],
  ['la Gaspésie', ['la gaspésie', 'La gaspésie']],
  ['le Nouveau-Brunswick', ['le nouveau-brunswick', 'le Nouveau-brunswick', 'le nouveau-Brunswick']],
  ['la Nouvelle-Écosse', ['la nouvelle-Écosse', 'la Nouvelle-écosse', 'la nouvelle-écosse']],
  ['la place Jacques-Cartier', ['la Place Jacques-Cartier', 'la place jacques-cartier', 'la place Jacques-cartier']],
];
function f11Place(R, pool) {
  const [ok, bad] = R.pick(pool);
  return mkChoice(R, `f11x-p-${ok}`, 'Comment faut-il écrire ce nom de lieu?', spk(ok), R.sample(bad, Math.min(3, bad.length)).map(spk), {
    say: say('Comment faut-il écrire ce nom de lieu?'),
    cols: 2,
  });
}
const LANG11 = [
  ['Mon ami parle français et anglais.', ['Mon ami parle Français et Anglais.', 'Mon ami parle Français et anglais.', 'Mon ami parle français et Anglais.']],
  ['Les Québécois adorent la poutine.', ['Les québécois adorent la poutine.', 'les Québécois adorent la poutine.', 'Les Québécois adorent la Poutine.']],
  ['Nous partons en Gaspésie en juillet.', ['Nous partons en gaspésie en juillet.', 'Nous partons en Gaspésie en Juillet.', 'nous partons en Gaspésie en juillet.']],
  ['Le lundi, la classe visite la bibliothèque.', ['Le Lundi, la classe visite la bibliothèque.', 'Le lundi, la classe visite la Bibliothèque.', 'le lundi, la classe visite la bibliothèque.']],
  ['Cette chanson québécoise est très connue.', ['Cette chanson Québécoise est très connue.', 'cette chanson québécoise est très connue.', 'Cette Chanson québécoise est très connue.']],
  ['Un Canadien a gagné la médaille d’or.', ['Un canadien a gagné la médaille d’or.', 'Un Canadien a gagné la Médaille d’or.', 'un Canadien a gagné la médaille d’or.']],
  ['En février, il neige souvent à Montréal.', ['En Février, il neige souvent à Montréal.', 'En février, il neige souvent à montréal.', 'en février, il neige souvent à Montréal.']],
  ['Ma voisine apprend l’espagnol le mardi soir.', ['Ma voisine apprend l’Espagnol le mardi soir.', 'Ma voisine apprend l’espagnol le Mardi soir.', 'ma voisine apprend l’espagnol le mardi soir.']],
  ['Le Saint-Laurent traverse la ville de Québec.', ['Le saint-laurent traverse la ville de Québec.', 'Le Saint-Laurent traverse la Ville de Québec.', 'Le Saint-Laurent traverse la ville de québec.']],
  ['Les Français et les Italiens visitent Québec en été.', ['Les français et les italiens visitent Québec en été.', 'Les Français et les Italiens visitent Québec en Été.', 'Les Français et les Italiens visitent québec en été.']],
];
function f11Lang(R) {
  const [ok, bad] = R.pick(LANG11);
  return mkChoice(R, `f11x-l-${ok}`, 'Quelle phrase est bien écrite?', spk(ok), bad.map(spk), {
    say: say('Quelle phrase est bien écrite?'),
    cols: 1,
  });
}
f11.generate = run({
  1: [
    (R) => f11Sentence(R, 'decl'),
    (R) => f11Sentence(R, 'ask'),
    (R) => f11Sentence(R, 'exc'),
    (R) => f11Sentence(R, 'day'),
    (R) => f11SortProper(R, 8, true),
    (R) => f11DayRule(R),
  ],
  2: [
    (R) => f11Enum(R),
    (R) => f11Two(R),
    (R) => f11Place(R, PLACE11.slice(0, 10)),
    (R) => f11Sentence(R, 'day'),
    (R) => f11SortProper(R, 8, true),
    (R) => f11Lang(R),
  ],
  3: [
    (R) => f11Enum(R),
    (R) => f11Voc(R),
    (R) => f11Voc(R),
    (R) => f11Place(R, PLACE11),
    (R) => f11Lang(R),
    (R) => f11Two(R),
  ],
});
f11.pfeq = 'Écriture — majuscule (début de phrase, noms propres, noms de lieux), virgule (énumération, mot qu’on interpelle), ponctuation de fin de phrase (PFEQ 1er cycle, 2e année – 2e cycle, 3e année)';

/* ---------------- f12 : homophones grammaticaux ---------------- */
const HOM2 = {
  a: {
    forms: ['a', 'à'],
    tip: 'a ou à? (essaie avec « avait » : a = avait)',
    s: [
      ['Ma grand-mère ___ préparé une tourtière pour toute la famille.', 'a'], ['Nous allons ___ la cabane à sucre samedi prochain.', 'à'],
      ['Mon frère ___ gagné la course de ski de fond.', 'a'], ['Elle pense souvent ___ ses vacances d’été.', 'à'],
      ['Le facteur ___ laissé un colis devant la porte.', 'a'], ['Les élèves jouent ___ la balle au mur.', 'à'],
      ['Zoé ___ une grande peur des araignées.', 'a'], ['Il parle ___ sa voisine par-dessus la clôture.', 'à'],
      ['Ma cousine ___ perdu ses lunettes dans la neige.', 'a'], ['Nous arrivons ___ la maison vers cinq heures.', 'à'],
    ],
  },
  e: {
    forms: ['et', 'est'],
    tip: 'et ou est? (essaie avec « était » : est = était)',
    s: [
      ['Ce matin, mon petit frère ___ très fatigué.', 'est'], ['Nous avons mangé du pain ___ du fromage au dîner.', 'et'],
      ['La soupe aux pois ___ prête depuis midi.', 'est'], ['Léa ___ sa meilleure amie jouent dans la neige.', 'et'],
      ['Le lac ___ gelé depuis le mois de décembre.', 'est'], ['Il porte une tuque rouge ___ des mitaines vertes.', 'et'],
      ['Où ___ passé le chat de la voisine?', 'est'], ['Papa lave la vaisselle ___ maman range la cuisine.', 'et'],
      ['Cette histoire ___ très drôle.', 'est'], ['Mon oncle ___ pompier depuis dix ans.', 'est'],
    ],
  },
  s: {
    forms: ['son', 'sont'],
    tip: 'son ou sont? (essaie avec « étaient » : sont = étaient)',
    s: [
      ['Mes cousins ___ arrivés hier soir.', 'sont'], ['Léa range ___ livre dans son sac.', 'son'],
      ['Les poires ___ mûres et sucrées.', 'sont'], ['Le chat mange ___ repas du soir.', 'son'],
      ['Les enfants ___ allés à la piscine.', 'sont'], ['Papa lave ___ gros camion bleu.', 'son'],
      ['Les nuages ___ très noirs ce matin.', 'sont'], ['Max a perdu ___ chandail préféré.', 'son'],
      ['Mes bottes ___ pleines de neige.', 'sont'], ['L’enseignante corrige ___ examen.', 'son'],
    ],
  },
  o: {
    forms: ['ou', 'où'],
    tip: 'ou ou où? (ou = ou bien; où = un endroit ou un moment)',
    s: [
      ['Veux-tu du riz ___ des pâtes pour le souper?', 'ou'], ['Voici le village ___ habite ma grand-mère.', 'où'],
      ['___ as-tu rangé mes patins?', 'Où'], ['Prends-tu l’autobus ___ le métro?', 'ou'],
      ['Je ne sais pas ___ est ma tuque.', 'où'], ['Il pleut ___ il neige? Je ne sais pas.', 'ou'],
      ['La ville ___ nous sommes nés est très jolie.', 'où'], ['Tu choisis le rouge ___ le jaune?', 'ou'],
      ['___ vont les outardes en hiver?', 'Où'], ['Elle hésite entre la glace ___ la tarte.', 'ou'],
    ],
  },
  n: {
    forms: ['on', 'ont'],
    tip: 'on ou ont? (essaie avec « avaient » : ont = avaient)',
    s: [
      ['___ a gagné le match de hockey hier.', 'On'], ['Les voisins ___ ramassé les feuilles mortes.', 'ont'],
      ['Hier, ils ___ visité le zoo de Granby.', 'ont'], ['Dans cette classe, ___ apprend à lire en riant.', 'on'],
      ['Les oiseaux ___ construit un nid dans l’érable.', 'ont'], ['Quand ___ a faim, on mange une collation.', 'on'],
      ['Mes parents ___ acheté un nouveau tapis.', 'ont'], ['___ ne voit plus rien dans ce brouillard.', 'On'],
      ['Les enfants ___ chanté en chœur.', 'ont'], ['Ici, ___ parle français et anglais.', 'on'],
    ],
  },
  c: {
    forms: ['ces', 'ses'],
    tip: 'ces ou ses? (ses = à lui, à elle, comme « son » ; ces = ceux-ci)',
    s: [
      ['Regarde ___ nuages noirs au-dessus de la montagne!', 'ces'], ['Léa met ___ mitaines et sa tuque avant de sortir.', 'ses'],
      ['Je n’aime pas ___ chaussures trop petites.', 'ces'], ['Le chat lèche ___ pattes après chaque repas.', 'ses'],
      ['Qui a dessiné tous ___ beaux bonshommes sur le tableau?', 'ces'], ['Max met son manteau, sa tuque et ___ bottes.', 'ses'],
      ['Pourquoi aimes-tu tant ___ vieux jouets?', 'ces'], ['La fillette serre ___ poupées contre son cœur.', 'ses'],
      ['Tous ___ enfants ont reçu un cadeau.', 'ces'], ['L’oiseau déploie ___ ailes bleues et s’envole.', 'ses'],
    ],
  },
  m: {
    forms: ['mes', 'mais'],
    tip: 'mes ou mais? (mais = pourtant; mes = à moi, comme « mon »)',
    s: [
      ['Je voulais sortir, ___ il pleut trop fort.', 'mais'], ['Où sont ___ mitaines rouges?', 'mes'],
      ['J’aime le hockey, ___ je préfère le ski.', 'mais'], ['J’ai rangé tous ___ jouets dans le coffre.', 'mes'],
      ['Elle est petite ___ très rapide.', 'mais'], ['Ce sont ___ amis du camp d’été.', 'mes'],
      ['Il est gentil, ___ il parle trop.', 'mais'], ['Je prête ___ crayons à Léa.', 'mes'],
      ['Nous voulions un chien, ___ papa est allergique.', 'mais'], ['Aide-moi à ramasser ___ billes.', 'mes'],
    ],
  },
  a3: {
    forms: ['a', 'à', 'as'],
    tip: 'a, à ou as? (as va avec « tu » ; a = avait)',
    s: [
      ['Tu ___ oublié ton sac dans l’autobus.', 'as'], ['Tu ___ raison, c’est un exercice difficile.', 'as'],
      ['Peux-tu aller ___ la bibliothèque pour moi?', 'à'], ['Papa ___ réparé le vélo de ma sœur.', 'a'],
      ['Tu ___ de beaux yeux bleus.', 'as'], ['Le chat saute ___ travers la clôture.', 'à'],
      ['Quand tu ___ faim, dis-le-moi.', 'as'], ['Le bébé ___ dormi toute la nuit.', 'a'],
      ['Nous parlons ___ la directrice demain.', 'à'], ['Tu ___ gagné la course?', 'as'],
    ],
  },
  e3: {
    forms: ['et', 'est', 'es'],
    tip: 'et, est ou es? (es va avec « tu » ; est = était)',
    s: [
      ['Tu ___ le meilleur joueur de l’équipe.', 'es'], ['Tu ___ en retard ce matin.', 'es'],
      ['Le gâteau ___ au chocolat.', 'est'], ['Mon père ___ ma mère travaillent à Québec.', 'et'],
      ['Tu ___ très gentil avec ton petit frère.', 'es'], ['Elle chante ___ elle danse.', 'et'],
      ['Où ___ ma tuque?', 'est'], ['Quand tu ___ fatigué, repose-toi.', 'es'],
      ['La neige ___ tombée toute la nuit.', 'est'], ['Le chien ___ le chat dorment ensemble.', 'et'],
    ],
  },
};
const sameCase = (ref, f) => (ref[0] === ref[0].toUpperCase() ? cap1(f) : f);
function f12xFill(R, groups) {
  const gk = R.pick(groups);
  const g = HOM2[gk];
  const [s, ok] = R.pick(g.s);
  const wrongs = g.forms.filter((f) => f.toLowerCase() !== ok.toLowerCase()).map((f) => sameCase(ok, f));
  return mkChoice(R, `f12x-f-${s}`, `Complète : ${g.tip}`, { text: ok }, wrongs.map((t) => ({ text: t })), {
    say: say(fillIn(s, ok)),
    stimulus: { text: s },
    cols: wrongs.length + 1 === 3 ? 3 : 2,
  });
}
function f12xSentence(R, groups) {
  const gk = R.pick(groups);
  const g = HOM2[gk];
  const [s, ok] = R.pick(g.s);
  const wrongs = g.forms.filter((f) => f.toLowerCase() !== ok.toLowerCase()).map((f) => fillIn(s, sameCase(ok, f)));
  const good = fillIn(s, ok);
  return mkChoice(R, `f12x-p-${s}`, 'Quelle phrase est bien écrite?', spk(good), wrongs.map(spk), {
    say: say('Quelle phrase est bien écrite?'),
    cols: 1,
  });
}
function f12xCombo(R) {
  const [g1, g2] = R.sample(['a', 'e', 's', 'o', 'n', 'c', 'm'], 2);
  const [s1, ok1] = R.pick(HOM2[g1].s);
  const [s2, ok2] = R.pick(HOM2[g2].s);
  const fm = (g, s, f) => sameCase(s.startsWith('___') ? 'A' : 'a', f);
  const combos = [];
  for (const f1 of HOM2[g1].forms) for (const f2 of HOM2[g2].forms) combos.push([f1, f2]);
  const lab = ([f1, f2]) => `${fm(g1, s1, f1)} — ${fm(g2, s2, f2)}`;
  const okLabel = lab([ok1.toLowerCase(), ok2.toLowerCase()]);
  const wrongs = combos.map(lab).filter((t) => t !== okLabel);
  return mkChoice(R, `f12x-c-${s1}|${s2}`, 'Quels mots complètent les deux phrases? (dans l’ordre)', { text: okLabel }, wrongs.map((t) => ({ text: t })), {
    say: say(`${fillIn(s1, ok1)} ${fillIn(s2, ok2)}`),
    stimulus: { text: `${s1}   ${s2}` },
    cols: 2,
  });
}
f12.generate = run({
  1: [
    (R) => f12Fill(R, ['a', 'e', 's', 'o', 'n']),
    (R) => f12Fill(R, ['n', 's']),
    (R) => f12Sentence(R, ['a', 'e', 's', 'o', 'n']),
    (R) => f12Sentence(R, ['n', 'o', 's']),
    (R) => f12xFill(R, ['a', 'e', 's', 'o', 'n']),
  ],
  2: [
    (R) => f12xFill(R, ['a', 'e', 's', 'o', 'n', 'c', 'm']),
    (R) => f12xFill(R, ['c', 'm']),
    (R) => f12xSentence(R, ['a', 'e', 's', 'o', 'n', 'c', 'm']),
    (R) => f12xSentence(R, ['c', 'm']),
    (R) => f12xFill(R, ['a', 'e', 's', 'o', 'n', 'c', 'm']),
  ],
  3: [
    (R) => f12xFill(R, ['a3', 'e3']),
    (R) => f12xFill(R, ['a3', 'e3', 'c', 'm', 'n', 's']),
    (R) => f12xSentence(R, ['a3', 'e3']),
    (R) => f12xSentence(R, ['a', 'e', 's', 'o', 'n', 'c', 'm']),
    (R) => f12xCombo(R),
    (R) => f12xCombo(R),
  ],
});
f12.pfeq = 'Écriture — homophones grammaticaux : a/à/as, et/est/es, son/sont, ces/ses, on/ont, ou/où, mes/mais (PFEQ 1er cycle, 2e année – 2e cycle, 3e année)';

/* ---------------- f13 : contraires, synonymes, familles, préfixes, suffixes ---------------- */
const ANT3 = [
  ['timide', 'audacieux'], ['généreux', 'avare'], ['rare', 'fréquent'], ['courageux', 'lâche'], ['ancien', 'moderne'], ['accepter', 'refuser'],
  ['permettre', 'interdire'], ['ajouter', 'enlever'], ['augmenter', 'diminuer'], ['approcher', 'éloigner'], ['prudent', 'imprudent'],
  ['calme', 'agité'], ['sombre', 'lumineux'], ['entrée', 'sortie'], ['accélérer', 'ralentir'], ['majorité', 'minorité'],
  ['victoire', 'défaite'], ['obéir', 'désobéir'], ['présent', 'absent'], ['réussir', 'échouer'], ['honnête', 'malhonnête'],
  ['intérieur', 'extérieur'], ['bavard', 'silencieux'], ['paresseux', 'travailleur'], ['maigre', 'gras'], ['aimable', 'désagréable'],
  ['encourager', 'décourager'], ['tristesse', 'joie'], ['mentir', 'avouer'], ['ouvert', 'fermé'], ['profond', 'superficiel'], ['humble', 'orgueilleux'],
];
const ANT3_ITEMS = ANT3.flatMap(([a, b], i) => [{ q: a, a: b, i }, { q: b, a, i }]);
const ANT3_WORDS = ANT3.flatMap(([a, b], i) => [{ t: a, i }, { t: b, i }]);
const SYN2 = [
  ['brave', 'courageux'], ['malin', 'rusé'], ['étrange', 'bizarre'], ['difficile', 'ardu'], ['tranquille', 'paisible'], ['souvent', 'fréquemment'],
  ['avertir', 'prévenir'], ['aider', 'secourir'], ['cesser', 'arrêter'], ['garder', 'conserver'], ['combat', 'bataille'], ['peur', 'crainte'],
  ['pays', 'nation'], ['habit', 'vêtement'], ['demeurer', 'habiter'], ['immense', 'gigantesque'], ['fâché', 'furieux'], ['rapide', 'prompt'],
  ['entrer', 'pénétrer'], ['voyage', 'périple'], ['maison', 'habitation'], ['joli', 'charmant'], ['dire', 'prononcer'], ['effrayant', 'terrifiant'],
];
const SYN2_ITEMS = SYN2.flatMap(([a, b], i) => [{ q: a, a: b, i }, { q: b, a, i }]);
const SYN2_WORDS = SYN2.flatMap(([a, b], i) => [{ t: a, i }, { t: b, i }]);
const FAMS2 = [
  ['main', ['manuel', 'manette', 'maniable', 'manuscrit'], ['mangue']],
  ['cœur', ['courage', 'encourager', 'courageux'], ['courir']],
  ['livre', ['librairie', 'libraire', 'livret'], ['libre']],
  ['nuit', ['minuit', 'nuitée', 'nuitamment'], ['nuire']],
  ['grand', ['grandir', 'grandeur', 'agrandir'], ['grain']],
  ['chaud', ['chaleur', 'chauffer', 'chaleureux', 'réchauffer'], ['chauve']],
  ['froid', ['froideur', 'refroidir', 'froidement'], ['frise']],
  ['vie', ['vivant', 'vivre', 'survivre'], ['vigne']],
  ['rouge', ['rougeur', 'rougir', 'rougeâtre', 'rougeole'], ['rouler']],
  ['blanc', ['blancheur', 'blanchir', 'blanchâtre'], ['blague']],
  ['noir', ['noirceur', 'noircir', 'noiraud'], ['noix']],
  ['sang', ['sanglant', 'saigner', 'ensanglanté'], ['sans']],
  ['ami', ['amitié', 'amical', 'amicalement'], ['amiral']],
  ['fer', ['ferraille', 'ferronnier', 'ferrer'], ['fermer']],
  ['lune', ['lunaire', 'alunir', 'lunatique'], ['lunch']],
  ['forêt', ['forestier', 'déforestation', 'déforester'], ['foret']],
  ['mur', ['muraille', 'emmurer', 'mural'], ['mûr']],
  ['chasse', ['chasseur', 'chasseuse', 'chasser', 'pourchasser'], ['châsse']],
  ['colle', ['coller', 'décoller', 'collant', 'collage'], ['col']],
  ['plume', ['plumage', 'plumeau', 'déplumer'], ['pluie']],
  ['pêche', ['pêcheur', 'pêcherie', 'pêcher'], ['péché']],
  ['bijou', ['bijoutier', 'bijouterie'], ['bille']],
];
function f13FamX(R, pool, trap) {
  const [root, fam, look] = R.pick(pool);
  const members = [root, ...fam];
  const stim = R.pick(members);
  const ok = R.pick(members.filter((m) => m !== stim));
  const others = uniq(R.sample(pool.filter((f) => f[0] !== root), 8).map((f) => R.pick([f[0], ...f[1]])));
  const wrong = trap ? [look[0], ...others.slice(0, 2)] : others.slice(0, 3);
  return mkChoice(R, `f13x-f-${stim}-${ok}`, `Quel mot est de la même famille que « ${stim} »?`, spk(ok), wrong.map(spk), {
    say: say(`Quel mot est de la même famille que ${stim}?`),
    cols: 2,
  });
}
function f13IntruderX(R, pool) {
  const [root, fam, look] = R.pick(pool);
  const members = R.sample([root, ...fam], 3);
  const odd = R.chance(0.65) ? look[0] : R.pick(R.pick(pool.filter((f) => f[0] !== root))[1]);
  return mkChoice(R, `f13x-x-${sortedKey([...members, odd])}`, 'Quel mot n’est pas de la même famille que les autres?', spk(odd), members.map(spk), {
    say: say('Quel mot n’est pas de la même famille que les autres?'),
    cols: 2,
  });
}
function f13SortFamX(R, pool) {
  const [a, b] = R.sample(pool, 2);
  const ga = R.sample(a[1], Math.min(3, a[1].length));
  const gb = R.sample(b[1], Math.min(3, b[1].length));
  return mkSort(
    R,
    `f13x-s-${a[0]}-${b[0]}-${sortedKey([...ga, ...gb])}`,
    'Classe les mots dans la bonne famille.',
    [{ text: `Famille de « ${a[0]} »`, emoji: '👪' }, { text: `Famille de « ${b[0]} »`, emoji: '👪' }],
    [ga.map(spk), gb.map(spk)],
    { say: say('Classe les mots dans la bonne famille.') },
  );
}
// préfixes : base | préfixe | classe (N = in/im/il/ir, D = dé, M = mal/mé)
const PREF_RAW = `
possible|im|N
poli|im|N
patient|im|N
mobile|im|N
prévu|im|N
parfait|im|N
lisible|il|N
légal|il|N
logique|il|N
réel|ir|N
régulier|ir|N
responsable|ir|N
visible|in|N
juste|in|N
connu|in|N
utile|in|N
capable|in|N
actif|in|N
complet|in|N
attentif|in|N
faire|dé|D
plier|dé|D
coller|dé|D
couvrir|dé|D
boucher|dé|D
charger|dé|D
brancher|dé|D
attacher|dé|D
heureux|mal|M
honnête|mal|M
adroit|mal|M
traité|mal|M
`;
const PREF = PREF_RAW.trim().split('\n').map((l) => {
  const [base, p, c] = l.split('|');
  return { base, p, c };
});
const PREF_OPTS = { N: ['in', 'im', 'il', 'ir'], D: ['dé', 're', 'in', 'mé'], M: ['mal', 'in', 'dé', 'im'] };
function f13xPref(R, pool) {
  const x = R.pick(pool);
  const opts = PREF_OPTS[x.c];
  return mkChoice(R, `f13x-p-${x.base}`, `Quel préfixe forme le contraire de « ${x.base} »?`, { text: `${x.p}-` }, opts.filter((o) => o !== x.p).map((o) => ({ text: `${o}-` })), {
    say: say(`Quel préfixe forme le contraire de ${x.base}?`),
    cols: 4,
  });
}
const RE_LIST = [
  ['faire', 'refaire'], ['lire', 'relire'], ['commencer', 'recommencer'], ['dire', 'redire'], ['mettre', 'remettre'], ['écrire', 'réécrire'],
  ['voir', 'revoir'], ['planter', 'replanter'], ['construire', 'reconstruire'], ['charger', 'recharger'], ['lancer', 'relancer'], ['colorier', 'recolorier'],
  ['compter', 'recompter'], ['démarrer', 'redémarrer'],
];
function f13xRe(R) {
  const [inf, ok] = R.pick(RE_LIST);
  const wrong = R.sample(RE_LIST.filter((x) => x[1] !== ok), 3).map((x) => x[1]);
  return mkChoice(R, `f13x-re-${inf}`, `Quel mot veut dire « ${inf} de nouveau »?`, spk(ok), wrong.map(spk), {
    say: say(`Quel mot veut dire ${inf} de nouveau?`),
    cols: 2,
  });
}
const AGENT = [
  ['chante', 'chanteur'], ['danse', 'danseur'], ['nage', 'nageur'], ['court', 'coureur'], ['vend', 'vendeur'], ['joue', 'joueur'],
  ['patine', 'patineur'], ['skie', 'skieur'], ['pêche', 'pêcheur'], ['lit', 'lecteur'], ['peint', 'peintre'], ['dessine', 'dessinateur'], ['livre', 'livreur'],
];
function f13xAgent(R) {
  const [v, ok] = R.pick(AGENT);
  const wrong = R.sample(AGENT.filter((x) => x[1] !== ok), 3).map((x) => x[1]);
  return mkChoice(R, `f13x-ag-${ok}`, `Comment appelle-t-on la personne qui ${v}?`, spk(ok), wrong.map(spk), {
    say: say(`Comment appelle-t-on la personne qui ${v}?`),
    cols: 2,
  });
}
const ABLE = [
  ['qui peut être lavé', 'lavable'], ['qui peut être mangé', 'mangeable'], ['qui peut être lu', 'lisible'], ['qui peut être vu', 'visible'],
  ['qui peut être plié', 'pliable'], ['qui peut être joué', 'jouable'], ['qui peut être bu', 'buvable'], ['qui peut être utilisé', 'utilisable'],
  ['qui peut être cassé', 'cassable'], ['qui peut être réparé', 'réparable'],
];
function f13xAble(R) {
  const [d, ok] = R.pick(ABLE);
  const wrong = R.sample(ABLE.filter((x) => x[1] !== ok), 3).map((x) => x[1]);
  return mkChoice(R, `f13x-ab-${ok}`, `Quel mot veut dire « ${d} »?`, spk(ok), wrong.map(spk), {
    say: say(`Quel mot veut dire ${d}?`),
    cols: 2,
  });
}
const ADV = [
  ['rapide', 'rapidement', 'rapidemment', 'rapidment', 'rapideement'],
  ['doux', 'doucement', 'douxement', 'douement', 'doucemant'],
  ['gentil', 'gentiment', 'gentillement', 'gentilment', 'gentimant'],
  ['poli', 'poliment', 'polliment', 'polimment', 'polimant'],
  ['vrai', 'vraiment', 'vraiement', 'vraisment', 'vrément'],
  ['fort', 'fortement', 'fortment', 'forttement', 'fortemant'],
  ['heureux', 'heureusement', 'heureuxement', 'heureusment', 'heureusemment'],
  ['lent', 'lentement', 'lentment', 'lentemment', 'lentemant'],
  ['simple', 'simplement', 'simplemant', 'simpelment', 'simplment'],
  ['certain', 'certainement', 'certenement', 'certainnement', 'certainemment'],
  ['sage', 'sagement', 'sagemment', 'sagment', 'sageement'],
  ['joyeux', 'joyeusement', 'joyeuxement', 'joyeusment', 'joyeusemment'],
  ['froid', 'froidement', 'froidment', 'froidemment', 'froitement'],
];
function f13xAdv(R) {
  const [adj, ok, ...bad] = R.pick(ADV);
  return mkChoice(R, `f13x-adv-${adj}`, `Quelle est la bonne façon d’écrire l’adverbe formé avec « ${adj} »?`, spk(ok), bad.map(spk), {
    say: say(`Quelle est la bonne façon d’écrire l’adverbe formé avec ${adj}?`),
    cols: 2,
  });
}
function f13xAntLetters(R) {
  const it = R.pick(ANT3_ITEMS.filter((x) => Array.from(x.a).length <= 10 && /^[a-zàâçéèêëîïôûùüœ]+$/.test(x.a)));
  return {
    type: 'order',
    key: `f13x-al-${it.q}`,
    prompt: `Écris le contraire de « ${it.q} ».`,
    say: say(`Écris le contraire de ${it.q}.`),
    tiles: Array.from(it.a),
    extra: R.sample(ALPHA.filter((c) => !it.a.includes(c)), 3),
    joiner: '',
  };
}
const FAMS_ALL = [...FAMS, ...FAMS2];
f13.generate = run({
  1: [
    (R) => f13Family(R, true),
    (R) => f13Intruder(R),
    (R) => f13SortFam(R),
    (R) => f13Prefix(R),
    (R) => f13AntLetters(R),
    (R) => f13Ant(R, 4, ANT2_ITEMS, ANT2_WORDS, 'a'),
  ],
  2: [
    (R) => f13Ant(R, 4, ANT3_ITEMS, ANT3_WORDS, 'a'),
    (R) => f13Ant(R, 4, SYN2_ITEMS, SYN2_WORDS, 's'),
    (R) => f13FamX(R, FAMS_ALL, false),
    (R) => f13FamX(R, FAMS2, true),
    (R) => f13xPref(R, PREF.filter((x) => x.c !== 'N')),
    (R) => f13xRe(R),
    (R) => f13xAgent(R),
    (R) => f13xAntLetters(R),
  ],
  3: [
    (R) => f13Ant(R, 4, ANT3_ITEMS, ANT3_WORDS, 'a'),
    (R) => f13Ant(R, 4, SYN2_ITEMS, SYN2_WORDS, 's'),
    (R) => f13FamX(R, FAMS_ALL, true),
    (R) => f13IntruderX(R, FAMS_ALL),
    (R) => f13SortFamX(R, FAMS_ALL),
    (R) => f13xPref(R, PREF),
    (R) => f13xAble(R),
    (R) => f13xAdv(R),
    (R) => f13xAgent(R),
  ],
});
f13.pfeq = 'Lecture / écriture — vocabulaire : contraires, synonymes, familles de mots, préfixes (dé-, re-, in-/im-/il-/ir-, mal-) et suffixes (-eur, -able, -ment) (PFEQ 1er cycle, 2e année – 2e cycle, 3e année)';

export const units = [f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13];
