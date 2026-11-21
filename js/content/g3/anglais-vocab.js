// Grade 3 ESL — Vocabulary themes g3e6…g3e16 (11 units, ~32 words each).
// Entries: 'word|emoji|français|group'. An empty emoji means "no safe picture": the word is then used only in text questions.
// « English zone »: nothing French reaches the child — the French gloss (3rd field) is kept for the parents' reference only.
import { say, mc, mkUnit, sortQ, P, PF, COMP_INT, rest, split } from './anglais-core.js';

const CTIP = { fr: 'Lis toute la phrase, puis choisis le mot qui a du sens.', en: 'Read the whole sentence, then pick the word that makes sense.' };
const ALPHA = 'abcdefghijklmnopqrstuvwxyz'.split('');

// An emoji used by two words of the same unit would make picture questions ambiguous: such emoji are dropped.
function parse(rows) {
  const W = rows.map((r) => { const [w, e, f, g] = split(r); return { w, e, f, g: +g }; });
  const n = {}; for (const x of W) if (x.e) n[x.e] = (n[x.e] || 0) + 1;
  return W.map((x) => (x.e && n[x.e] > 1 ? { ...x, e: '' } : x));
}

// plausible misspellings of a word
function misspell(R, w) {
  const out = new Set();
  const tryAdd = (x) => { if (x !== w && x.length > 1) out.add(x); };
  for (let i = 0; i < 12 && out.size < 3; i++) {
    const k = R.int(0, 3), p = R.int(1, w.length - 2);
    if (k === 0 && w.length > 3) tryAdd(w.slice(0, p) + w[p + 1] + w[p] + w.slice(p + 2));
    else if (k === 1) tryAdd(w.slice(0, p) + w[p] + w.slice(p));
    else if (k === 2 && w.length > 4) tryAdd(w.slice(0, p) + w.slice(p + 1));
    else { const v = 'aeiou'; const j = [...w].findIndex((c, ix) => ix > 0 && v.includes(c)); if (j > 0) tryAdd(w.slice(0, j) + R.pick(rest(v.split(''), w[j])) + w.slice(j + 1)); }
  }
  let n = 0;
  while (out.size < 3 && n++ < 20) tryAdd(w + R.pick(['e', 's', 'h']));
  return [...out].slice(0, 3);
}

function vocab(id, icon, title, themeFr, bins, rows, cloze, clues) {
  const W = parse(rows), PIC = W.filter((x) => x.e), SINGLE = W.filter((x) => /^[a-z]+$/.test(x.w) && x.w.length <= 9);
  const grp = (g) => W.filter((x) => x.g === g);
  const GIDX = [...new Set(W.map((x) => x.g))];
  // English-only hint: the picture, else the word's group (« “desk” goes in the box: in the classroom 🏫 »)
  const tip = (x) => (x.e ? `${x.w} = ${x.e}` : `“${x.w}” goes in the box: ${bins[x.g].text} ${bins[x.g].emoji || ''}`.trim());
  const inGroup = (g) => new Set(grp(g).map((y) => y.w));
  const same = (R, x, n) => R.sample(W.filter((y) => y.g === x.g && y.w !== x.w), n);
  const lowerClue = (s) => s;
  const cz = cloze.map((c) => { const [s, a, ...w] = split(c); return { s, a, w }; });
  const cl = clues.map((c) => { const [s, a, ...w] = split(c); return { s, a, w }; });
  const gens = {
    1: [
      (R) => { const x = R.pick(PIC); const o = R.sample(PIC.filter((y) => y.w !== x.w && y.e !== x.e), 2); return mc(`${id}:a1:${x.w}`, P.pic, x.w, o.map((y) => y.w), { stimulus: { emoji: x.e }, tip: tip(x) }); },
      (R) => { const x = R.pick(PIC); const o = R.sample(PIC.filter((y) => y.w !== x.w && y.e !== x.e), 2); return mc(`${id}:b1:${x.w}`, P.listenPic, x.e, o.map((y) => y.e), { say: say(x.w), emoji: true, tip: tip(x) }); },
      (R) => { const x = R.pick(PIC); const o = R.sample(PIC.filter((y) => y.w !== x.w && y.e !== x.e), 2); return mc(`${id}:c1:${x.w}`, P.readPic, x.e, o.map((y) => y.e), { stimulus: { text: x.w }, emoji: true, tip: tip(x) }); },
      (R) => { const x = R.pick(W), mine = inGroup(x.g); const o = R.sample(W.filter((y) => y.g !== x.g && !mine.has(y.w)), 2);
        return mc(`${id}:d1:${x.w}`, P.listenWord, x.w, o.map((y) => y.w), { say: say(x.w), stimulus: { emoji: '🎧' }, tip: tip(x) }); },
    ],
    2: [
      (R) => { const x = R.pick(W); const o = [...same(R, x, 2), ...R.sample(W.filter((y) => y.g !== x.g), 1)]; return mc(`${id}:a2:${x.w}`, P.listenWord, x.w, o.map((y) => y.w), { say: say(x.w), cols: 2, tip: tip(x) }); },
      (R) => { const x = R.pick(SINGLE); const extra = R.sample(ALPHA.filter((c) => !x.w.includes(c)), 2);
        return { type: 'order', key: `${id}:b2:${x.w}`, prompt: P.spell, say: say(x.w), stimulus: { emoji: x.e || '🎧' }, tiles: x.w.split(''), extra, joiner: '', tip: tip(x) }; },
      // listening discrimination: distractors look alike (same first letter when possible)
      (R) => { const x = R.pick(W), near = W.filter((y) => y.w !== x.w && y.w[0] === x.w[0]); const o = [...R.sample(near, Math.min(3, near.length))]; o.push(...R.sample(W.filter((y) => y.w !== x.w && !o.includes(y)), 3 - o.length));
        return mc(`${id}:c2:${x.w}`, P.listenWord, x.w, o.map((y) => y.w), { say: say(x.w), stimulus: { emoji: '🎧' }, cols: 2, tip: tip(x) }); },
      (R) => { const [a, b] = R.sample(GIDX, 2); const ga = R.sample(grp(a), 3).map((x) => x.w), gb = R.sample(grp(b), 3).map((x) => x.w);
        return sortQ(`${id}:d2:${[...ga, ...gb].sort().join(',')}`, P.sortW, [bins[a], bins[b]], [ga, gb], { speak: true }); },
      (R) => { const c = R.pick(cz); return mc(`${id}:e2:${c.s}`, P.fill, c.a, R.sample(c.w, Math.min(2, c.w.length)), { stimulus: { text: c.s }, cols: 3, tip: CTIP }); },
    ],
    3: [
      (R) => { const x = R.pick(SINGLE); const extra = R.sample(ALPHA.filter((c) => !x.w.includes(c)), 3);
        return { type: 'order', key: `${id}:a3:${x.w}`, prompt: P.spell, say: say(x.w), tiles: x.w.split(''), extra, joiner: '', tip: tip(x) }; },
      (R) => { const [a, b] = R.sample(GIDX, 2); const three = R.sample(grp(a), 3), odd = R.pick(grp(b));
        return mc(`${id}:b3:${[...three.map((x) => x.w), odd.w].sort().join(',')}`, P.odd, odd.w, three.map((x) => x.w), { cols: 2, tip: { fr: `« ${odd.w} » n’est pas du même groupe.`, en: `“${odd.w}” does not belong to the same group.` } }); },
      (R) => { const c = R.pick(cl); return mc(`${id}:c3:${c.s}`, P.clue, c.a, c.w, { stimulus: { text: c.s }, say: say(c.s), cols: 2, tip: { fr: 'Pense à ce que fait ou à ce qu’est chaque chose de l’indice.', en: 'Think about what the clue says the thing does or is.' } }); },
      (R) => { const c = R.pick(cz); return mc(`${id}:d3:${c.s}`, P.fill, c.a, c.w, { stimulus: { text: c.s }, cols: 2, tip: CTIP }); },
      (R) => { const x = R.pick(SINGLE); return mc(`${id}:e3:${x.w}:${R.int(0, 2)}`, { fr: 'Quelle est la bonne orthographe?', en: 'Which spelling is correct?' }, x.w, misspell(R, x.w), { stimulus: { emoji: x.e || '🎧' }, say: say(x.w), cols: 2, tip: tip(x) }); },
      (R) => { const idx = R.sample(GIDX, 3); const grps = idx.map((g) => R.sample(grp(g), 2).map((x) => x.w));
        return sortQ(`${id}:f3:${grps.flat().sort().join(',')}`, P.sortW, idx.map((g) => bins[g]), grps); },
    ],
  };
  return mkUnit(id, icon, title, PF + `${COMP_INT} — vocabulaire : ${themeFr}`, gens);
}

/* ---------- g3e6 School ---------- */
const school = vocab('g3e6', '🎒', { fr: 'L’école', en: 'School' }, 'matières scolaires et matériel', [{ text: 'school subjects', emoji: '📚' }, { text: 'school supplies', emoji: '🎒' }, { text: 'in the classroom', emoji: '🏫' }], [
  'math|➗|mathématiques|0', 'science|🔬|sciences|0', 'art|🎨|arts plastiques|0', 'music|🎵|musique|0', 'gym|🤸|éducation physique|0', 'French|🇫🇷|français|0', 'English|🔤|anglais|0', 'reading|📖|lecture|0',
  'writing|✍️|écriture|0', 'history|🏛️|histoire|0', 'geography|🌍|géographie|0', 'drama|🎭|art dramatique|0',
  'pencil|✏️|crayon à mine|1', 'pen|🖊️|stylo|1', 'ruler|📏|règle|1', 'scissors|✂️|ciseaux|1', 'glue||colle|1', 'notebook|📓|cahier|1', 'backpack|🎒|sac à dos|1', 'markers|🖍️|crayons-feutres|1', 'eraser||efface|1', 'paper|📄|papier|1',
  'lunch box|🍱|boîte à lunch|1', 'paintbrush|🖌️|pinceau|1',
  'desk||pupitre|2', 'chair|🪑|chaise|2', 'clock|🕒|horloge|2', 'globe|🌐|globe|2', 'map|🗺️|carte|2', 'computer|💻|ordinateur|2', 'board||tableau|2', 'teacher|👩‍🏫|enseignante|2', 'student|🧒|élève|2', 'library|📚|bibliothèque|2',
], [
  'I write with a ___.|pencil|ruler|backpack|chair', 'I cut paper with ___.|scissors|glue|markers|paper', 'In ___ class, we sing and play instruments.|music|math|gym|history', 'In ___ class, we do experiments.|science|music|art|drama',
  'I carry my books in my ___.|backpack|desk|globe|clock', 'I draw a straight line with a ___.|ruler|glue|pencil case|chair', 'We play sports in ___ class.|gym|math|reading|geography', 'My ___ helps me learn new things.|teacher|computer|eraser|map',
  'I look at the ___ to see the time.|clock|globe|ruler|notebook', 'I sit on a ___ in class.|chair|clock|notebook|scissors', 'We find countries on a ___.|map|pen|glue|lunch box', 'I eat my sandwich from my ___.|lunch box|paintbrush|notebook|ruler',
], [
  'You use it to measure a line.|ruler|glue|eraser|pencil', 'You paint with it.|paintbrush|scissors|ruler|marker', 'This is where you borrow books.|library|gym|desk|clock', 'It shows the whole Earth.|globe|desk|clock|chair',
  'You write on it with a marker.|board|backpack|globe|desk', 'You use it to take away a mistake.|eraser|glue|ruler|paper', 'In this class you learn about numbers.|math|music|art|gym', 'In this class you learn about plants and animals.|science|drama|history|reading',
]);

/* ---------- g3e7 Family & feelings ---------- */
const family = vocab('g3e7', '👪', { fr: 'La famille et les émotions', en: 'Family & feelings' }, 'famille et émotions', [{ text: 'family', emoji: '👪' }, { text: 'good feelings', emoji: '😀' }, { text: 'hard feelings', emoji: '😢' }], [
  'mother|👩|mère|0', 'father|👨|père|0', 'grandmother|👵|grand-mère|0', 'grandfather|👴|grand-père|0', 'sister|👧|sœur|0', 'brother|👦|frère|0', 'baby|👶|bébé|0', 'aunt||tante|0', 'uncle||oncle|0', 'cousin||cousin ou cousine|0', 'parents|👪|parents|0', 'twins|👯|jumeaux|0',
  'happy|😀|content|1', 'excited|🤩|excité|1', 'proud||fier|1', 'calm|😌|calme|1', 'silly|🤪|drôle ou bête|1', 'surprised|😲|surpris|1', 'kind||gentil|1', 'brave||courageux|1', 'friendly||amical|1', 'thankful||reconnaissant|1',
  'sad|😢|triste|2', 'angry|😠|fâché|2', 'scared|😨|effrayé|2', 'tired|😴|fatigué|2', 'sick|🤒|malade|2', 'bored|🥱|ennuyé|2', 'nervous||nerveux|2', 'worried|😟|inquiet|2', 'lonely||seul|2', 'shy||timide|2', 'hungry||affamé|2',
], [
  'My mother’s mother is my ___.|grandmother|sister|aunt|cousin', 'My father’s brother is my ___.|uncle|cousin|brother|grandfather', 'My aunt’s son is my ___.|cousin|brother|baby|father', 'I feel ___ when I win a game.|happy|sick|bored|lonely',
  'I feel ___ when I lose my toy.|sad|proud|calm|excited', 'I feel ___ when I do not sleep.|tired|excited|brave|friendly', 'A ___ is a very young child.|baby|uncle|cousin|twin', 'I feel ___ before a big test.|nervous|silly|thankful|proud',
  'When I hear a loud noise in the dark, I feel ___.|scared|proud|happy|kind', 'We say “thank you” when we feel ___.|thankful|angry|bored|sick', 'I feel ___ when there is nothing to do.|bored|excited|proud|thankful', 'He is ___ because he does not feel well.|sick|brave|silly|calm',
], [
  'Your mother and father together are your ___.|parents|twins|cousins|babies', 'Two children born on the same day to the same mother.|twins|cousins|uncles|aunts', 'You feel this way when someone takes your favourite toy.|angry|calm|thankful|proud', 'You feel this way when you win a medal.|proud|bored|sick|lonely',
  'You feel this way when you need a nap.|tired|excited|brave|silly', 'You feel this way when you are alone and want friends.|lonely|proud|calm|surprised', 'You feel this way when you get a surprise gift.|surprised|bored|tired|worried', 'You feel this way when you do not want to talk to new people.|shy|silly|friendly|brave',
]);

/* ---------- g3e8 Food & meals ---------- */
const food = vocab('g3e8', '🍽️', { fr: 'La nourriture et les repas', en: 'Food & meals' }, 'aliments, repas et boissons', [{ text: 'fruits & vegetables', emoji: '🍎' }, { text: 'drinks & meals', emoji: '🍽️' }, { text: 'other foods', emoji: '🧀' }], [
  'apple|🍎|pomme|0', 'banana|🍌|banane|0', 'grapes|🍇|raisins|0', 'strawberry|🍓|fraise|0', 'orange|🍊|orange|0', 'watermelon|🍉|melon d’eau|0', 'carrot|🥕|carotte|0', 'potato|🥔|pomme de terre|0', 'tomato|🍅|tomate|0', 'corn|🌽|maïs|0', 'broccoli|🥦|brocoli|0', 'cucumber|🥒|concombre|0', 'lemon|🍋|citron|0', 'pear|🍐|poire|0',
  'breakfast|🍳|déjeuner|1', 'lunch|🥪|dîner|1', 'dinner|🍽️|souper|1', 'snack|🍿|collation|1', 'juice|🧃|jus|1', 'milk|🥛|lait|1', 'water|💧|eau|1', 'dessert|🍰|dessert|1', 'hot chocolate|☕|chocolat chaud|1', 'tea|🍵|thé|1',
  'cheese|🧀|fromage|2', 'bread|🍞|pain|2', 'egg|🥚|œuf|2', 'rice|🍚|riz|2', 'pasta|🍝|pâtes|2', 'soup|🍲|soupe|2', 'pizza|🍕|pizza|2', 'sandwich|🥪|sandwich|2', 'cereal|🥣|céréales|2', 'salad|🥗|salade|2', 'cookie|🍪|biscuit|2', 'ice cream|🍦|crème glacée|2',
], [
  'I drink ___ with my cereal.|milk|bread|cheese|rice', 'We eat ___ in the morning.|breakfast|dinner|dessert|a snack at night', 'A ___ is a long orange vegetable.|carrot|banana|lemon|grape', 'Ice cream is my favourite ___.|dessert|breakfast|vegetable|drink',
  'I put ___ on my sandwich.|cheese|juice|milk|soup', 'She eats a bowl of hot ___ on a cold day.|soup|ice cream|juice|salad', 'A ___ is a sweet red fruit.|strawberry|potato|broccoli|egg', 'I eat a ___ between lunch and dinner.|snack|breakfast|salad|pasta',
  'Spaghetti is a kind of ___.|pasta|fruit|juice|cereal', 'You can make toast with ___.|bread|water|soup|corn', 'Lemons are sour and ___.|yellow|blue|purple|black', 'My dad cooks ___ with tomato sauce.|pasta|milk|juice|cereal',
], [
  'It is yellow, long and you peel it.|banana|lemon|pear|corn', 'It is green and looks like a little tree.|broccoli|cucumber|pear|lemon', 'It is cold and sweet, and you eat it on a cone.|ice cream|soup|cheese|rice', 'You get it from a hen.|egg|milk|rice|pasta',
  'It is red, round and you put it in a salad.|tomato|potato|carrot|banana', 'It is a big green fruit with red inside.|watermelon|grapes|corn|pear', 'This meal is in the middle of the day.|lunch|breakfast|dinner|dessert', 'It is hot, liquid and you eat it with a spoon.|soup|salad|cookie|bread',
]);

/* ---------- g3e9 House ---------- */
const house = vocab('g3e9', '🏠', { fr: 'La maison', en: 'House & rooms' }, 'pièces, meubles et parties de la maison', [{ text: 'rooms', emoji: '🚪' }, { text: 'things in a house', emoji: '🛋️' }, { text: 'parts of a house', emoji: '🏠' }], [
  'kitchen|🍳|cuisine|0', 'bathroom|🛁|salle de bain|0', 'bedroom|🛏️|chambre|0', 'living room|🛋️|salon|0', 'dining room|🍽️|salle à manger|0', 'garage|🚗|garage|0', 'basement||sous-sol|0', 'attic||grenier|0', 'hall||corridor|0', 'laundry room||salle de lavage|0',
  'bed|🛏️|lit|1', 'sofa|🛋️|divan|1', 'table||table|1', 'lamp|💡|lampe|1', 'TV|📺|télévision|1', 'mirror|🪞|miroir|1', 'bathtub|🛁|baignoire|1', 'toilet|🚽|toilette|1', 'shower|🚿|douche|1', 'plant|🪴|plante|1', 'key|🔑|clé|1', 'fridge||réfrigérateur|1', 'stove||cuisinière|1', 'carpet||tapis|1', 'curtains||rideaux|1', 'shelf||étagère|1',
  'door|🚪|porte|2', 'window|🪟|fenêtre|2', 'roof||toit|2', 'floor||plancher|2', 'wall||mur|2', 'ceiling||plafond|2', 'stairs||escalier|2', 'fence||clôture|2', 'garden|🌷|jardin|2', 'yard||cour|2', 'mailbox|📫|boîte aux lettres|2', 'balcony||balcon|2',
], [
  'I sleep in my ___.|bedroom|kitchen|garage|bathroom', 'We cook dinner in the ___.|kitchen|bedroom|attic|hall', 'I take a shower in the ___.|bathroom|living room|garage|basement', 'We park the car in the ___.|garage|bathroom|kitchen|bedroom',
  'I watch TV on the ___.|sofa|stove|shower|fence', 'I turn on the ___ when it is dark.|lamp|fridge|mirror|key', 'We keep milk in the ___.|fridge|stove|carpet|shelf', 'The ___ is on top of the house.|roof|floor|carpet|shower',
  'I look at myself in the ___.|mirror|stove|fence|stairs', 'I open the ___ to enter the house.|door|ceiling|wall|plant', 'Mom puts a letter in the ___.|mailbox|bathtub|carpet|stove', 'We climb the ___ to go to the second floor.|stairs|curtains|fridge|lamp',
], [
  'You sleep here.|bedroom|kitchen|garage|hall', 'You cook here.|kitchen|bedroom|bathroom|attic', 'You open it to let in fresh air.|window|wall|carpet|ceiling', 'It is under your feet inside the house.|floor|roof|ceiling|window',
  'It protects the house from the rain.|roof|carpet|mirror|lamp', 'It is a dark room under the house.|basement|attic|garage|hall', 'It goes around the yard.|fence|stairs|curtains|stove', 'You use it to open and lock a door.|key|lamp|plant|shelf',
]);

/* ---------- g3e10 Sports & hobbies ---------- */
const sport = vocab('g3e10', '⚽', { fr: 'Sports et passe-temps', en: 'Sports & hobbies' }, 'sports et loisirs', [{ text: 'ball & team sports', emoji: '⚽' }, { text: 'other sports', emoji: '🏊' }, { text: 'hobbies', emoji: '🎨' }], [
  'soccer|⚽|soccer|0', 'hockey|🏒|hockey|0', 'basketball|🏀|basketball|0', 'baseball|⚾|baseball|0', 'volleyball|🏐|volleyball|0', 'football|🏈|football|0', 'tennis|🎾|tennis|0', 'rugby|🏉|rugby|0',
  'swimming|🏊|natation|1', 'skiing|🎿|ski|1', 'skating|⛸️|patin|1', 'gymnastics|🤸|gymnastique|1', 'cycling|🚴|vélo|1', 'karate|🥋|karaté|1', 'running|🏃|course|1', 'fishing|🎣|pêche|1', 'sledding|🛷|glissade|1', 'surfing|🏄|surf|1', 'golf|⛳|golf|1', 'archery|🏹|tir à l’arc|1',
  'painting|🎨|peinture|2', 'reading|📖|lecture|2', 'singing|🎤|chant|2', 'dancing|💃|danse|2', 'cooking|🍳|cuisine|2', 'gardening|🌱|jardinage|2', 'chess|♟️|échecs|2', 'guitar|🎸|guitare|2', 'piano|🎹|piano|2', 'video games|🎮|jeux vidéo|2', 'board games|🎲|jeux de société|2', 'photography|📷|photographie|2', 'puzzles|🧩|casse-têtes|2', 'camping|⛺|camping|2', 'knitting|🧶|tricot|2', 'drums|🥁|batterie|2',
], [
  'I play ___ on ice with a stick.|hockey|tennis|golf|soccer', 'We kick the ball in ___.|soccer|swimming|chess|skiing', 'I go ___ in the pool.|swimming|skiing|golf|camping', 'In winter, we go ___ down the snowy hill.|skiing|surfing|fishing|cycling',
  'My hobby is ___ pictures with colours.|painting|running|hockey|rugby', 'He plays ___ with black and white keys.|piano|guitar|drums|chess', 'We use a racket to play ___.|tennis|rugby|karate|hockey', 'She wears a white uniform for ___.|karate|golf|soccer|baseball',
  'I like ___ in my garden.|gardening|swimming|skating|photography', 'We sleep in a tent when we go ___.|camping|fishing|dancing|surfing', 'The players throw the ball into a hoop in ___.|basketball|football|baseball|volleyball', 'I read a story. Reading is my ___.|hobby|team|uniform|field',
], [
  'You use a bat and a ball. You run to the bases.|baseball|basketball|tennis|rugby', 'You wear skates on your feet.|skating|swimming|running|cycling', 'You catch a fish with a rod.|fishing|archery|camping|golf', 'You pedal on two wheels.|cycling|skiing|swimming|running',
  'You play music and press the strings.|guitar|piano|drums|singing', 'You move your body to music.|dancing|knitting|cooking|reading', 'You play it on a board with a king and a queen.|chess|puzzles|golf|karate', 'You take pictures with a camera.|photography|painting|knitting|gardening',
]);

/* ---------- g3e11 Weather & seasons ---------- */
const weather = vocab('g3e11', '⛅', { fr: 'La météo et les saisons', en: 'Weather & seasons' }, 'météo, saisons et vêtements de saison', [{ text: 'weather', emoji: '⛅' }, { text: 'seasons', emoji: '🍁' }, { text: 'things we see or wear', emoji: '🧣' }], [
  'sunny|☀️|ensoleillé|0', 'rainy|🌧️|pluvieux|0', 'snowy|❄️|neigeux|0', 'windy|💨|venteux|0', 'cloudy|☁️|nuageux|0', 'foggy|🌫️|brumeux|0', 'stormy|⛈️|orageux|0', 'hot|🥵|chaud|0', 'cold|🥶|froid|0', 'warm||tiède ou doux|0', 'freezing||glacial|0', 'lightning|⚡|éclair|0', 'rainbow|🌈|arc-en-ciel|0',
  'spring|🌸|printemps|1', 'summer|☀️|été|1', 'fall|🍂|automne|1', 'winter|⛄|hiver|1', 'season||saison|1', 'month||mois|1', 'weather||météo|1', 'temperature|🌡️|température|1', 'forecast||prévisions|1', 'January||janvier|1', 'July||juillet|1', 'October||octobre|1',
  'umbrella|☂️|parapluie|2', 'boots|🥾|bottes|2', 'mittens|🧤|mitaines|2', 'scarf|🧣|foulard|2', 'sunglasses|🕶️|lunettes de soleil|2', 'snowman|⛄|bonhomme de neige|2', 'kite|🪁|cerf-volant|2', 'puddle||flaque d’eau|2', 'leaves|🍂|feuilles|2', 'flowers|🌸|fleurs|2', 'sled|🛷|traîneau|2', 'beach|🏖️|plage|2',
], [
  'I need an ___ when it rains.|umbrella|scarf|kite|sled', 'It is ___ today. I need my sunglasses.|sunny|foggy|snowy|stormy', 'We make a snowman in ___.|winter|summer|spring|July', 'Leaves turn red and orange in ___.|fall|spring|summer|winter',
  'We swim at the beach in ___.|summer|winter|fall|January', 'Flowers grow in ___.|spring|winter|fall|snow', 'It is ___. I can hardly see the street.|foggy|sunny|warm|hot', 'I wear ___ on my hands in the cold.|mittens|sunglasses|sandals|a kite',
  'We hear thunder and see ___ in a storm.|lightning|a rainbow|a snowman|leaves', 'A ___ shows when it is hot or cold.|temperature|forecast|puddle|season', 'You see a ___ after the rain and the sun.|rainbow|snowman|puddle|sled', 'There are four ___ in a year.|seasons|forecasts|rainbows|puddles',
], [
  'It is the coldest season of the year.|winter|summer|spring|fall', 'You fly it in the wind.|kite|sled|umbrella|scarf', 'It is the season when flowers open.|spring|fall|winter|summer', 'It is water on the ground after the rain.|puddle|rainbow|forecast|temperature',
  'It tells you what the weather will be tomorrow.|forecast|season|puddle|rainbow', 'You wear it around your neck in winter.|scarf|sunglasses|umbrella|kite', 'The sky is full of grey clouds.|cloudy|sunny|hot|warm', 'It has seven colours in the sky.|rainbow|lightning|forecast|puddle',
]);

/* ---------- g3e12 Animals ---------- */
const animals = vocab('g3e12', '🦊', { fr: 'Les animaux et leurs habitats', en: 'Animals & habitats' }, 'animaux de la ferme, sauvages et habitats', [{ text: 'pets & farm animals', emoji: '🐄' }, { text: 'wild animals', emoji: '🦁' }, { text: 'habitats', emoji: '🌲' }], [
  'dog|🐶|chien|0', 'cat|🐱|chat|0', 'rabbit|🐰|lapin|0', 'hamster|🐹|hamster|0', 'horse|🐴|cheval|0', 'cow|🐄|vache|0', 'pig|🐖|cochon|0', 'sheep|🐑|mouton|0', 'chicken|🐔|poule|0', 'duck|🦆|canard|0', 'goat|🐐|chèvre|0', 'turkey|🦃|dinde|0',
  'bear|🐻|ours|1', 'wolf|🐺|loup|1', 'fox|🦊|renard|1', 'deer|🦌|cerf|1', 'owl|🦉|hibou|1', 'beaver|🦫|castor|1', 'squirrel|🐿️|écureuil|1', 'whale|🐋|baleine|1', 'shark|🦈|requin|1', 'penguin|🐧|pingouin|1', 'lion|🦁|lion|1', 'elephant|🐘|éléphant|1', 'monkey|🐒|singe|1', 'giraffe|🦒|girafe|1', 'snake|🐍|serpent|1', 'frog|🐸|grenouille|1', 'butterfly|🦋|papillon|1', 'bee|🐝|abeille|1', 'moose||orignal|1',
  'forest|🌲|forêt|2', 'ocean|🌊|océan|2', 'desert|🏜️|désert|2', 'farm|🚜|ferme|2', 'lake|🏞️|lac|2', 'mountain|⛰️|montagne|2', 'jungle|🌴|jungle|2', 'nest|🪺|nid|2', 'cave||grotte|2', 'pond||étang|2', 'river||rivière|2', 'Arctic||Arctique|2',
], [
  'A ___ gives us milk on the farm.|cow|wolf|shark|bee', 'A ___ lives in the ocean and is very big.|whale|rabbit|owl|fox', 'A ___ builds dams in rivers.|beaver|penguin|lion|giraffe', 'An ___ is awake at night and says “hoot”.|owl|elephant|goat|duck',
  'A ___ has a very long neck.|giraffe|snake|hamster|squirrel', 'A ___ makes honey.|bee|pig|frog|horse', 'A ___ lives in cold places and cannot fly.|penguin|butterfly|owl|duck', 'A ___ hops and lives near a pond.|frog|whale|cow|bear',
  'Birds lay eggs in a ___.|nest|cave|pond|desert', 'Camels live in the ___.|desert|ocean|pond|nest', 'Fish live in a ___ or in the ocean.|lake|nest|farm|cave', 'A bear sleeps in a ___ in winter.|cave|pond|lake|farm',
], [
  'It says “moo”.|cow|pig|sheep|duck', 'It has a trunk and big ears.|elephant|giraffe|bear|lion', 'It is the king of the jungle.|lion|wolf|fox|deer', 'It has colourful wings and flies from flower to flower.|butterfly|bee|owl|duck',
  'It has no legs and slides on the ground.|snake|frog|rabbit|hamster', 'It is a pet that likes to chase mice.|cat|dog|goat|turkey', 'It is a very big, quiet animal with antlers in Canada.|moose|monkey|shark|penguin', 'It is a place with lots of trees and animals.|forest|desert|ocean|farm',
]);

/* ---------- g3e13 Jobs & community ---------- */
const jobs = vocab('g3e13', '🧑‍🚒', { fr: 'Les métiers et la communauté', en: 'Jobs & community' }, 'métiers et lieux de la communauté', [{ text: 'jobs', emoji: '🧑‍🚒' }, { text: 'places in town', emoji: '🏫' }, { text: 'helpers & tools', emoji: '🔧' }], [
  'teacher|👩‍🏫|enseignant|0', 'doctor|🧑‍⚕️|médecin|0', 'firefighter|🧑‍🚒|pompier|0', 'police officer|👮|policier|0', 'farmer|🧑‍🌾|agriculteur|0', 'cook|🧑‍🍳|cuisinier|0', 'pilot|🧑‍✈️|pilote|0', 'artist|🧑‍🎨|artiste|0', 'scientist|🧑‍🔬|scientifique|0', 'mechanic|🧑‍🔧|mécanicien|0', 'astronaut|🧑‍🚀|astronaute|0', 'builder|👷|ouvrier de la construction|0', 'dentist|🦷|dentiste|0', 'librarian||bibliothécaire|0',
  'hospital|🏥|hôpital|1', 'school|🏫|école|1', 'fire station||caserne de pompiers|1', 'police station|🚓|poste de police|1', 'library|📚|bibliothèque|1', 'bakery|🥖|boulangerie|1', 'post office|🏤|bureau de poste|1', 'bank|🏦|banque|1', 'restaurant|🍴|restaurant|1', 'park|🌳|parc|1', 'airport|✈️|aéroport|1', 'grocery store|🛒|épicerie|1', 'pharmacy|💊|pharmacie|1', 'hotel|🏨|hôtel|1',
  'bus driver|🚌|chauffeur d’autobus|2', 'mail carrier|📮|facteur|2', 'nurse||infirmière|2', 'cashier||caissier|2', 'waiter||serveur|2', 'vet|🐾|vétérinaire|2', 'ambulance|🚑|ambulance|2', 'uniform||uniforme|2', 'helmet|⛑️|casque|2', 'stethoscope||stéthoscope|2', 'hammer|🔨|marteau|2', 'wrench|🔧|clé à molette|2',
], [
  'A ___ puts out fires.|firefighter|dentist|artist|cook', 'A ___ takes care of sick people.|doctor|pilot|farmer|builder', 'A ___ flies a plane.|pilot|mechanic|cook|teacher', 'A ___ grows food on a farm.|farmer|scientist|librarian|astronaut',
  'We buy bread at the ___.|bakery|bank|hospital|airport', 'We borrow books at the ___.|library|pharmacy|hotel|police station', 'A ___ brings letters to our homes.|mail carrier|dentist|waiter|vet', 'A ___ looks after sick animals.|vet|cook|pilot|cashier',
  'A ___ fixes cars.|mechanic|artist|nurse|astronaut', 'We take money out at the ___.|bank|bakery|park|library', 'You wear a ___ on your head to stay safe.|helmet|uniform|stethoscope|hammer', 'A ___ travels to space.|astronaut|waiter|dentist|farmer',
], [
  'This person teaches children at school.|teacher|doctor|cook|pilot', 'This person helps you if you are lost or in danger.|police officer|artist|cook|mechanic', 'This person looks at your teeth.|dentist|doctor|farmer|builder', 'This person makes meals in a restaurant.|cook|waiter|pilot|artist',
  'This place is where you take a plane.|airport|bank|library|park', 'This place is where you get medicine.|pharmacy|bakery|hotel|school', 'This vehicle takes sick people to the hospital.|ambulance|bus|train|truck', 'This person paints pictures.|artist|mechanic|scientist|nurse',
]);

/* ---------- g3e14 Clothes ---------- */
const clothes = vocab('g3e14', '👕', { fr: 'Les vêtements', en: 'Clothes' }, 'vêtements de tous les jours, d’hiver et d’été', [{ text: 'everyday clothes', emoji: '👕' }, { text: 'winter clothes', emoji: '🧤' }, { text: 'summer & extras', emoji: '🩴' }], [
  'shirt|👕|chandail ou chemise|0', 'pants|👖|pantalon|0', 'dress|👗|robe|0', 'skirt||jupe|0', 'shorts|🩳|short|0', 'socks|🧦|chaussettes|0', 'shoes|👟|souliers|0', 'sweater||chandail de laine|0', 'jeans|👖|jeans|0', 'pyjamas||pyjama|0', 'T-shirt|👕|t-shirt|0', 'jacket|🧥|veste|0', 'uniform||uniforme|0',
  'coat|🧥|manteau|1', 'boots|🥾|bottes|1', 'mittens|🧤|mitaines|1', 'scarf|🧣|foulard|1', 'toque|🧢|tuque|1', 'snow pants||pantalon de neige|1', 'gloves|🧤|gants|1', 'raincoat||imperméable|1', 'rain boots||bottes de pluie|1', 'snowsuit||habit de neige|1', 'winter hat||chapeau d’hiver|1',
  'swimsuit|🩱|maillot de bain|2', 'sandals|🩴|sandales|2', 'sunglasses|🕶️|lunettes de soleil|2', 'cap|🧢|casquette|2', 'umbrella|☂️|parapluie|2', 'backpack|🎒|sac à dos|2', 'glasses|👓|lunettes|2', 'watch|⌚|montre|2', 'tie|👔|cravate|2', 'belt||ceinture|2', 'ring|💍|bague|2', 'bag|👜|sac à main|2',
], [
  'I wear ___ on my feet inside my shoes.|socks|gloves|a scarf|a tie', 'In winter, I wear ___ on my hands.|mittens|sandals|shorts|a swimsuit', 'I wear a ___ to swim.|swimsuit|coat|sweater|scarf', 'I wear ___ on my feet at the beach.|sandals|boots|socks|jeans',
  'My ___ keeps my neck warm.|scarf|belt|watch|tie', 'I wear a ___ when it rains.|raincoat|swimsuit|T-shirt|cap', 'I wear ___ at night to sleep.|pyjamas|boots|a uniform|sunglasses', 'I put on ___ to protect my eyes from the sun.|sunglasses|mittens|a belt|a toque',
  'It is cold, so I put on my ___.|coat|shorts|sandals|swimsuit', 'A ___ keeps my pants up.|belt|ring|tie|watch', 'On a hot day, I wear ___.|shorts|snow pants|a snowsuit|a coat', 'A ___ is a warm hat from Canada.|toque|cap|tie|watch',
], [
  'You wear it on your head to keep warm in winter.|toque|belt|tie|watch', 'You wear it around your waist.|belt|scarf|tie|glasses', 'You wear it on your wrist to see the time.|watch|ring|belt|bag', 'You wear it with a shirt for a fancy outfit.|tie|boots|cap|sandals',
  'You wear them to see better.|glasses|mittens|socks|sandals', 'You carry it on your back to school.|backpack|scarf|coat|dress', 'You wear it over a shirt when it is cool.|jacket|swimsuit|sandals|shorts', 'You wear them in the snow on your feet.|boots|sandals|socks|sunglasses',
]);

/* ---------- g3e15 Town & directions ---------- */
const town = vocab('g3e15', '🗺️', { fr: 'La ville et les directions', en: 'Town & directions' }, 'lieux de la ville, directions et transports', [{ text: 'places', emoji: '🏙️' }, { text: 'directions', emoji: '🧭' }, { text: 'transportation', emoji: '🚌' }], [
  'bakery|🥖|boulangerie|0', 'library|📚|bibliothèque|0', 'school|🏫|école|0', 'hospital|🏥|hôpital|0', 'park|🌳|parc|0', 'bridge|🌉|pont|0', 'street|🛣️|rue|0', 'store|🏪|magasin|0', 'museum|🏛️|musée|0', 'cinema|🎬|cinéma|0', 'bus stop|🚏|arrêt d’autobus|0', 'traffic light|🚦|feu de circulation|0', 'train station|🚉|gare|0', 'crosswalk|🚸|passage pour piétons|0', 'corner||coin de rue|0',
  'left|⬅️|à gauche|1', 'right|➡️|à droite|1', 'straight ahead|⬆️|tout droit|1', 'behind||derrière|1', 'next to||à côté de|1', 'near||près de|1', 'far||loin|1', 'across from||en face de|1', 'between||entre|1', 'north|🧭|nord|1', 'south||sud|1', 'east||est|1', 'west||ouest|1', 'stop|🛑|arrêt|1',
  'bus|🚌|autobus|2', 'car|🚗|auto|2', 'bike|🚲|vélo|2', 'train|🚆|train|2', 'taxi|🚕|taxi|2', 'truck|🚚|camion|2', 'subway|🚇|métro|2', 'plane|✈️|avion|2', 'boat|⛵|bateau|2', 'ambulance|🚑|ambulance|2', 'helicopter|🚁|hélicoptère|2', 'scooter|🛴|trottinette|2',
], [
  'We cross the street at the ___.|crosswalk|museum|bakery|bridge', 'You can see old paintings in the ___.|museum|bus stop|corner|bridge', 'We wait for the bus at the ___.|bus stop|library|hospital|cinema', 'Turn ___ at the corner. (the opposite of right)|left|near|far|behind',
  'The school is ___ the park. They are side by side.|next to|between|far|behind', 'Go ___ for two blocks. Do not turn.|straight ahead|left|behind|north', 'A ___ goes over a river.|bridge|bakery|corner|crosswalk', 'We watch a movie at the ___.|cinema|park|hospital|bus stop',
  'When the light is red, we must ___.|stop|turn|fly|swim', 'The sun rises in the ___.|east|west|north|south', 'You take a ___ to travel under the city.|subway|boat|bike|taxi', 'A ___ flies over the town.|helicopter|truck|scooter|train',
], [
  'It takes you across water on a road.|bridge|corner|street|museum', 'It shows red, yellow and green.|traffic light|bus stop|crosswalk|park', 'It is the place where trains stop.|train station|library|bakery|school', 'You ride it with two wheels and pedals.|bike|car|truck|bus',
  'It is the opposite of “near”.|far|behind|between|left', 'It is the opposite of “in front of”.|behind|near|north|left', 'It is a yellow car you pay to ride in.|taxi|bus|bike|subway', 'You can borrow books here.|library|bakery|cinema|bridge',
]);

/* ---------- g3e16 Time & routine ---------- */
const time = vocab('g3e16', '⏰', { fr: 'L’heure et la routine', en: 'Time & daily routine' }, 'routine quotidienne, moments de la journée et mesure du temps', [{ text: 'my day', emoji: '🌞' }, { text: 'times of day', emoji: '🌅' }, { text: 'clocks & calendars', emoji: '🗓️' }], [
  'get up|⏰|se lever|0', 'brush my teeth|🪥|me brosser les dents|0', 'eat breakfast|🥣|prendre le déjeuner|0', 'get dressed|👕|m’habiller|0', 'go to school|🏫|aller à l’école|0', 'do homework|📝|faire mes devoirs|0', 'play outside|⚽|jouer dehors|0', 'eat dinner|🍽️|prendre le souper|0', 'take a bath|🛁|prendre un bain|0', 'go to bed|🛌|aller au lit|0', 'watch TV|📺|regarder la télé|0', 'read a book|📖|lire un livre|0', 'wash my face||me laver le visage|0', 'pack my bag||préparer mon sac|0',
  'morning|🌅|matin|1', 'afternoon|☀️|après-midi|1', 'evening|🌆|soir|1', 'night|🌙|nuit|1', 'noon|🕛|midi|1', 'midnight||minuit|1', 'today||aujourd’hui|1', 'tomorrow||demain|1', 'yesterday||hier|1', 'early||tôt|1', 'late||tard|1', 'always||toujours|1', 'never||jamais|1', 'sometimes||parfois|1',
  'o’clock|🕐|heure pile|2', 'half past|🕧|et demie|2', 'quarter past||et quart|2', 'clock|⏰|horloge|2', 'watch|⌚|montre|2', 'calendar|📆|calendrier|2', 'week|📅|semaine|2', 'weekend||fin de semaine|2', 'hour||heure|2', 'minute||minute|2', 'Monday||lundi|2', 'Sunday||dimanche|2', 'birthday|🎂|anniversaire|2',
], [
  'I ___ at seven o’clock in the morning.|get up|go to bed|watch TV|take a bath', 'I ___ before I go to bed.|brush my teeth|eat breakfast|go to school|get up', 'I eat ___ in the morning.|breakfast|dinner|a bath|homework', 'I go to school in the ___.|morning|night|midnight|evening',
  'The sun is high at ___.|noon|midnight|night|evening', 'I do my ___ after school.|homework|breakfast|midnight|clock', 'Stars come out at ___.|night|noon|morning|afternoon', 'It is two ___. The short hand is on the two.|o’clock|weekends|calendars|Mondays',
  'Saturday and Sunday are the ___.|weekend|week|hour|minute', 'There are seven days in a ___.|week|hour|minute|birthday', 'I check the ___ to know the date.|calendar|midnight|weekend|noon', 'I ___ brush my teeth after every meal. It is a good habit.|always|never|late|noon',
], [
  'It comes after Sunday.|Monday|weekend|week|clock', 'It is the time between noon and evening.|afternoon|morning|midnight|night', 'It is the opposite of “early”.|late|noon|today|always', 'It is the day before today.|yesterday|tomorrow|morning|Sunday',
  'You do this when you wake up.|get up|go to bed|take a bath|watch TV', 'It shows all the days of the month.|calendar|watch|clock|week', 'It is the middle of the night.|midnight|noon|morning|afternoon', 'It is the day after today.|tomorrow|yesterday|weekend|Monday',
]);

export const vocabUnits = [school, family, food, house, sport, weather, animals, jobs, clothes, town, time];
