// English Language Arts, Grade 2 (English-Canadian progression, e.g. Ontario Language curriculum)
// for Petit Hibou. Units e21..e34: phonics, grammar, conventions, vocabulary, reading.
// Instructions are {fr, en}; the English material is plain strings (spoken with `say`, en-CA).

const EN = 'en-CA';
const say = (text) => ({ text, lang: EN });
const rest = (arr, x) => arr.filter((y) => y !== x);
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const PF = 'Langue — programme d\'anglais langue première, 2e année (progression canadienne anglaise, ex. Ontario) : ';

// Multiple-choice builder: first option is the right one (engine shuffles).
function mc(key, prompt, right, wrong, o = {}) {
  const w = [...new Set(wrong)].filter((x) => x !== right);
  const { speak, ...extra } = o;
  const mk = (t) => (speak ? { text: t, say: say(t) } : { text: t });
  return { type: 'choice', key, prompt, options: [right, ...w].map(mk), answer: 0, ...extra };
}
const wordSort = (key, prompt, bins, groups, o = {}) => ({
  type: 'sort', key, prompt, bins,
  items: groups.flatMap((g, i) => g.map((t) => ({ text: t, bin: i, ...(o.speak ? { say: say(t) } : {}) }))),
});
const mkUnit = (id, icon, title, pfeq, gens) => ({
  id, icon, title, pfeq: PF + pfeq,
  generate(level, R) { return R.pick(gens[level])(R); },
});
const P = {
  vowel: { fr: 'Écoute le mot. Quelle voyelle entends-tu au milieu?', en: 'Listen to the word. Which vowel do you hear in the middle?' },
  pic: { fr: 'Quel mot va avec l\'image?', en: 'Which word matches the picture?' },
  sortV: { fr: 'Place chaque mot dans la bonne boîte selon sa voyelle.', en: 'Put each word in the box with its vowel sound.' },
  missing: { fr: 'Écoute le mot. Quelle lettre manque?', en: 'Listen to the word. Which letter is missing?' },
  build: { fr: 'Écoute. Place les lettres pour écrire le mot.', en: 'Listen. Tap the letters to spell the word.' },
  heard: { fr: 'Écoute. Quel mot as-tu entendu?', en: 'Listen. Which word did you hear?' },
  fill: { fr: 'Choisis le mot qui complète la phrase.', en: 'Choose the word that fits the sentence.' },
  start: { fr: 'Par quelles lettres le mot commence-t-il?', en: 'Which letters does the word start with?' },
  ends: { fr: 'Par quelles lettres le mot se termine-t-il?', en: 'Which letters does the word end with?' },
  correct: { fr: 'Quelle phrase est bien écrite?', en: 'Which sentence is written correctly?' },
  read: { fr: 'Lis le texte. Choisis la bonne réponse.', en: 'Read the text. Choose the right answer.' },
};

// ---------- e21 Short vowels & CVC words ----------
const VOW = {
  a: 'cat hat bat map jam ham can pan man fan bag tag mad sad bad dad lap nap cap van ram rat mat sat tap'.split(' '),
  e: 'pen hen ten net wet jet bed red leg peg web pet set vet men beg get'.split(' '),
  i: 'pin bin fin win sit hit kit lip zip dig big pig wig six mix lid kid rip tip dip fix'.split(' '),
  o: 'dog log fog hop mop top pot hot dot box fox job nod rod cob sob'.split(' '),
  u: 'sun bun run fun cup pup bus mud bug rug hug jug tub cub nut cut hut gum mug bud'.split(' '),
};
const VOWS = Object.keys(VOW);
const CVC = Object.entries(VOW).flatMap(([v, ws]) => ws.map((w) => [w, v]));
const EMO21 = { cat: '🐱', hat: '🎩', bat: '🦇', van: '🚐', rat: '🐀', pig: '🐷', dog: '🐶', sun: '☀️', bus: '🚌', bed: '🛏️', pen: '🖊️', hen: '🐔', web: '🕸️', fox: '🦊', box: '📦', bug: '🐛', pin: '📌', log: '🪵', nut: '🥜', leg: '🦵', hut: '🛖', map: '🗺️' };
const VBIN = { a: { text: 'a (cat)', emoji: '🐱' }, e: { text: 'e (bed)', emoji: '🛏️' }, i: { text: 'i (pig)', emoji: '🐷' }, o: { text: 'o (dog)', emoji: '🐶' }, u: { text: 'u (sun)', emoji: '☀️' } };
const FAM = [['bat', 'bet', 'bit', 'but'], ['hat', 'hit', 'hot', 'hut'], ['bag', 'beg', 'big', 'bug'], ['pan', 'pen', 'pin', 'pun'],
  ['cap', 'cup', 'cop'], ['sat', 'set', 'sit'], ['tap', 'tip', 'top'], ['fan', 'fin', 'fun'], ['pet', 'pit', 'pot', 'pat'],
  ['red', 'rid', 'rod'], ['dig', 'dog', 'dug'], ['bad', 'bed', 'bid', 'bud'], ['lid', 'led', 'lad'], ['sack', 'sick', 'sock', 'suck'],
  ['pack', 'peck', 'pick', 'puck'], ['cat', 'cot', 'cut'], ['rat', 'rot', 'rut'], ['fix', 'fox'], ['not', 'nut', 'net']];
const FAMPIC = [['bat', 0], ['hat', 1], ['bug', 2], ['pen', 3], ['bed', 11], ['dog', 10], ['cat', 15], ['rat', 16], ['nut', 18], ['fox', 17]];
const vlabel = (v) => ({ fr: `Quel mot n'a PAS le son court « ${v} »?`, en: `Which word does NOT have the short “${v}” sound?` });
const vowOf = (w) => CVC.find((x) => x[0] === w)[1];
const e21Gens = {
  1: [
    (R) => { const [w, v] = R.pick(CVC); return mc('v1:' + w, P.vowel, v, R.sample(rest(VOWS, v), 2), { say: say(w), stimulus: { text: w }, cols: 3 }); },
    (R) => { const w = R.pick(Object.keys(EMO21)); const v = vowOf(w);
      return mc('pic1:' + w, P.pic, w, R.sample(CVC.filter(([x, y]) => y !== v && x !== 'pup').map((x) => x[0]), 2), { stimulus: { emoji: EMO21[w] }, cols: 3 }); },
    (R) => { const [va, vb] = R.sample(VOWS, 2); const a = R.sample(VOW[va], 2), b = R.sample(VOW[vb], 2);
      return wordSort('s1:' + [...a, ...b].sort().join('|'), P.sortV, [VBIN[va], VBIN[vb]], [a, b], { speak: true }); },
    (R) => { const [w, v] = R.pick(CVC); return mc('mm1:' + w, P.missing, v, R.sample(rest(VOWS, v), 2), { say: say(w), stimulus: { text: w[0] + ' _ ' + w[2] }, cols: 3 }); },
  ],
  2: [
    (R) => { const [w, v] = R.pick(CVC); return mc('m2:' + w, P.missing, v, R.sample(rest(VOWS, v), 3), { say: say(w), stimulus: { text: w[0] + ' _ ' + w[2] }, cols: 4 }); },
    (R) => { const v = R.pick(VOWS); const same = R.sample(VOW[v], 3); const odd = R.pick(VOW[R.pick(rest(VOWS, v))]);
      return mc('odd2:' + [...same, odd].sort().join('|'), vlabel(v), odd, same, { speak: true, cols: 2 }); },
    (R) => { const [w] = R.pick(CVC); const e = EMO21[w];
      return { type: 'order', key: 'o2:' + w, prompt: P.build, say: say(w), ...(e ? { stimulus: { emoji: e } } : {}), tiles: w.split('') }; },
    (R) => { const [va, vb, vc] = R.sample(VOWS, 3); const g = [va, vb, vc].map((v) => R.sample(VOW[v], 2));
      return wordSort('s2:' + g.flat().sort().join('|'), P.sortV, [VBIN[va], VBIN[vb], VBIN[vc]], g, { speak: true }); },
  ],
  3: [
    (R) => { const f = R.pick(FAM); const w = R.pick(f); return mc('h3:' + w, P.heard, w, rest(f, w), { say: say(w), cols: 2 }); },
    (R) => { const [w, i] = R.pick(FAMPIC); return mc('hp3:' + w, P.pic, w, rest(FAM[i], w), { stimulus: { emoji: EMO21[w] }, cols: 2 }); },
    (R) => { const [va, vb, vc] = R.sample(VOWS, 3); const g = [va, vb, vc].map((v) => R.sample(VOW[v], 2));
      return wordSort('s3:' + g.flat().sort().join('|'), P.sortV, [VBIN[va], VBIN[vb], VBIN[vc]], g); },
    (R) => { const v = R.pick(VOWS); const same = R.sample(VOW[v], 3); const odd = R.pick(VOW[R.pick(rest(VOWS, v))]);
      return mc('odd3:' + [...same, odd].sort().join('|'), vlabel(v), odd, same, { cols: 2 }); },
  ],
};

// ---------- e22 Long vowels & silent e ----------
// [short, long, sentence for long, sentence for short]
const SE = [
  ['cap', 'cape', 'The hero has a red ___ on her back.', 'Dad wears a ball ___ on his head.'],
  ['tap', 'tape', 'Put ___ on the box to close it.', 'Turn the ___ to get water.'],
  ['can', 'cane', 'Grandpa walks with a ___.', 'I open a ___ of soup.'],
  ['pin', 'pine', 'A ___ tree stays green in winter.', 'I stick a ___ in the board.'],
  ['kit', 'kite', 'I fly my ___ on a windy day.', 'Mom has a first-aid ___.'],
  ['rob', 'robe', 'I wear a soft ___ after my bath.', 'A bad guy wants to ___ the bank.'],
  ['hop', 'hope', 'I ___ it snows tomorrow.', 'A bunny can ___ fast.'],
  ['not', 'note', 'I wrote a ___ for my teacher.', 'I did ___ eat my lunch.'],
  ['cub', 'cube', 'An ice ___ is cold.', 'A bear ___ is a baby bear.'],
  ['cut', 'cute', 'The puppy is so ___!', 'Use scissors to ___ the paper.'],
  ['plan', 'plane', 'The ___ flies in the sky.', 'We make a ___ for the trip.'],
  ['fin', 'fine', 'I feel ___ today.', 'A fish swims with its ___.'],
  ['bit', 'bite', 'Do not ___ your nails.', 'My dog is a ___ scared.'],
  ['mad', 'made', 'Mom ___ me a sandwich.', 'He was ___ when he lost.'],
  ['tub', 'tube', 'The toothpaste comes in a ___.', 'I take a bath in the ___.'],
  ['slid', 'slide', 'I go down the ___ at the park.', 'She ___ on the ice.'],
  ['hid', 'hide', 'Let\'s play ___ and seek.', 'The cat ___ under the bed.'],
  ['rip', 'ripe', 'The banana is yellow and ___.', 'Do not ___ the paper.'],
  ['dim', 'dime', 'I found a ___ in my pocket.', 'The light is ___.'],
  ['man', 'mane', 'The lion has a big ___.', 'The ___ is walking his dog.'],
  ['hug', 'huge', 'The elephant is ___.', 'I give Mom a big ___.'],
  ['rod', 'rode', 'We ___ our bikes to school.', 'He holds a fishing ___.'],
  ['pal', 'pale', 'The ghost is ___.', 'Max is my ___.'],
  ['at', 'ate', 'I ___ my lunch.', 'Meet me ___ the park.'],
  ['us', 'use', 'I ___ a pencil to write.', 'Come with ___.'],
];
const LV = {
  a: 'rain play cake day tail make paint gate snail train wave tray'.split(' '),
  e: 'tree bee eat seat feet team sheep green beach leaf jeep sweet dream'.split(' '),
  i: 'kite time five bike ride light night pie slide nine smile mice'.split(' '),
  o: 'boat coat snow home nose bone road toe rope goat phone'.split(' '),
  u: 'cube tube flute blue rule glue June cute mule'.split(' '),
};
const LVW = Object.entries(LV).flatMap(([v, ws]) => ws.map((w) => [w, v]));
const SHORTW = CVC.map((x) => x[0]);
const longQ = (v) => ({ fr: `Quel mot a le son long « ${v} » (le nom de la lettre)?`, en: `Which word has the long “${v}” sound (the letter's name)?` });
const e22Gens = {
  1: [
    (R) => { const p = R.pick(SE); const t = R.pick([p[0], p[1]]); return mc('hr1:' + t, P.heard, t, [t === p[0] ? p[1] : p[0]], { say: say(t), cols: 2 }); },
    (R) => { const p = R.pick(SE); const t = R.pick([p[0], p[1]]); return { type: 'order', key: 'ob1:' + t, prompt: P.build, say: say(t), tiles: t.split('') }; },
    (R) => { const p = R.pick(SE);
      return mc('lg1:' + p[1], { fr: 'Quel mot a un « e muet » et une voyelle LONGUE?', en: 'Which word has a silent e and a LONG vowel?' }, p[1], [p[0], R.pick(SHORTW)], { speak: true, cols: 3 }); },
  ],
  2: [
    (R) => { const p = R.pick(SE); return mc('fl2:' + p[1], P.fill, p[1], [p[0]], { stimulus: { text: p[2] }, cols: 2 }); },
    (R) => { const p = R.pick(SE); return mc('fs2:' + p[0], P.fill, p[0], [p[1]], { stimulus: { text: p[3] }, cols: 2 }); },
    (R) => { const p = R.pick(SE); const s = R.sample(SE.filter((x) => x !== p), 2).map((x) => x[0]); return mc('lg2:' + p[1], longQ(p[1][p[1].length - 3]), p[1], s, { speak: true, cols: 3 }); },
    (R) => { const a = R.sample(SE, 3); return wordSort('ss2:' + a.map((x) => x[1]).sort().join('|'), { fr: 'Voyelle courte ou longue?', en: 'Short vowel or long vowel?' },
      [{ text: 'Short vowel', emoji: '🔸' }, { text: 'Long vowel (silent e)', emoji: '🔹' }], [a.map((x) => x[0]), a.map((x) => x[1])]); },
  ],
  3: [
    (R) => { const [w, v] = R.pick(LVW); const others = LVW.filter((x) => x[1] !== v).map((x) => x[0]);
      return mc('lv3:' + w, longQ(v), w, [R.pick(others), R.pick(others), R.pick(SHORTW)], { speak: true, cols: 2 }); },
    (R) => { const [w, v] = R.pick(LVW); return mc('lv3s:' + w, { fr: 'Écoute. Quel son de voyelle entends-tu?', en: 'Listen. Which vowel sound do you hear?' },
      'long ' + v, R.sample(rest(VOWS, v), 3).map((x) => 'long ' + x), { say: say(w), stimulus: { text: w }, cols: 2 }); },
    (R) => { const [va, vb] = R.sample(VOWS, 2); const a = R.sample(LV[va], 3), b = R.sample(LV[vb], 3);
      return wordSort('sl3:' + [...a, ...b].sort().join('|'), P.sortV, [{ text: 'long ' + va }, { text: 'long ' + vb }], [a, b], { speak: true }); },
    (R) => { const p = R.pick(SE); return mc('fl3:' + p[1], P.fill, p[1], [p[0]], { stimulus: { text: p[2] }, cols: 2 }); },
  ],
};

// ---------- e23 Digraphs & blends ----------
const DG = {
  sh: 'ship shop shell sheep shirt shoe shark shed shin shut'.split(' '),
  ch: 'chin chip chair cheese chick chop check chest cherry chain'.split(' '),
  th: 'thin thick thumb three think thank thorn thing'.split(' '),
  wh: 'whale wheel white whisker whistle wheat when where which'.split(' '),
};
const DGW = Object.entries(DG).flatMap(([d, ws]) => ws.map((w) => [w, d]));
const DGEMO = { ship: '🚢', shell: '🐚', sheep: '🐑', shirt: '👕', shoe: '👟', shark: '🦈', chair: '🪑', cheese: '🧀', chick: '🐥', cherry: '🍒', chain: '⛓️', thumb: '👍', whale: '🐳', wheel: '🛞' };
const BL = {
  bl: 'black blue block blow blanket'.split(' '), cl: 'clap clock clam cloud clown'.split(' '), fl: 'flag flower flat fly flip'.split(' '),
  gl: 'glad glass globe glue'.split(' '), pl: 'plant plate plane plum plug'.split(' '), sl: 'slide sleep slow slug sled'.split(' '),
  br: 'brush brick bread brown bridge'.split(' '), cr: 'crab crayon crown cry crib'.split(' '), dr: 'drum dress drip drop drink'.split(' '),
  fr: 'frog fruit fry frame'.split(' '), gr: 'grass grape green grin grow'.split(' '), tr: 'tree truck train trip track'.split(' '),
  sk: 'skate skunk skirt sky skip'.split(' '), sm: 'smile smell smoke small'.split(' '), sn: 'snow snake snail snap sneeze'.split(' '),
  sp: 'spoon spider spin spot spell'.split(' '), st: 'star stop stick stamp stone'.split(' '), sw: 'swim swing swan sweet'.split(' '),
};
const BLW = Object.entries(BL).flatMap(([d, ws]) => ws.map((w) => [w, d]));
const BLK = Object.keys(BL);
const ENDS = {
  ck: 'duck sock clock black truck brick chick stick neck pack'.split(' '), ng: 'king ring sing swing long song wing spring'.split(' '),
  nk: 'bank pink skunk drink sink trunk think thank'.split(' '), nt: 'tent ant plant paint went mint hunt'.split(' '), nd: 'hand sand pond wind land'.split(' '),
};
const ENDW = Object.entries(ENDS).flatMap(([d, ws]) => ws.map((w) => [w, d]));
const SF23 = [
  ['A ___ says ribbit.', 'frog', ['fog', 'log']], ['The ___ is shining in the night sky.', 'star', ['scar', 'jar']],
  ['We ___ in the pool.', 'swim', ['skim', 'slim']], ['Please ___ the window. It is cold.', 'shut', ['cut', 'hut']],
  ['I sit on a ___.', 'chair', ['hair', 'fair']], ['A ___ is a baby bird.', 'chick', ['sick', 'kick']],
  ['I like ___ on my pizza.', 'cheese', ['please', 'freeze']], ['A ___ is a very big animal in the sea.', 'whale', ['tale', 'pale']],
  ['Let\'s ___ for the singer.', 'clap', ['lap', 'cap']], ['A ___ tells the time.', 'clock', ['lock', 'sock']],
  ['The farmer grows ___ and corn.', 'wheat', ['heat', 'eat']], ['We go down the ___ at the park.', 'slide', ['side', 'hide']],
  ['A ___ drives on the road.', 'truck', ['duck', 'luck']], ['I eat soup with a ___.', 'spoon', ['moon', 'soon']],
  ['I paint with a ___.', 'brush', ['rush', 'crush']], ['A ___ has eight legs and makes a web.', 'spider', ['cider', 'slider']],
  ['It is cold, so I put on my ___.', 'scarf', ['scar', 'sharp']], ['A ___ lives in a shell and moves slowly.', 'snail', ['nail', 'trail']],
  ['I like to ___ on the ice.', 'skate', ['gate', 'state']], ['The ___ is on the letter. It costs money.', 'stamp', ['lamp', 'camp']],
  ['I drink a glass of ___.', 'milk', ['silk', 'mill']], ['The ___ is in the garden and has petals.', 'flower', ['power', 'tower']],
  ['We ___ in the snow. It is a sled ride.', 'sled', ['led', 'bled']], ['A ___ is red and lives on the beach.', 'crab', ['cab', 'drab']],
  ['The king wears a ___.', 'crown', ['clown', 'brown']], ['The ___ is red, white and blue.', 'flag', ['bag', 'slag']],
  ['Dad cooks ___ on the grill.', 'steak', ['stake', 'steam']], ['The little ___ is a baby fish? No, it is a baby frog. We call it a ___.', 'tadpole', ['pole', 'toad']],
].filter((x) => x[1] !== 'milk' && x[1] !== 'steak' && x[1] !== 'tadpole' && x[1] !== 'sled');
const bq = (b) => ({ fr: `Quel mot commence par « ${b} »?`, en: `Which word starts with “${b}”?` });
const e23Gens = {
  1: [
    (R) => { const [w, d] = R.pick(DGW); return mc('dg1:' + w, P.start, d, R.sample(rest(Object.keys(DG), d), 2), { say: say(w), stimulus: { text: w }, cols: 3 }); },
    (R) => { const [w, d] = R.pick(DGW); return mc('dgw1:' + w, bq(d), w, R.sample(DGW.filter((x) => x[1] !== d).map((x) => x[0]), 2), { speak: true, cols: 3 }); },
    (R) => { const w = R.pick(Object.keys(DGEMO)); const d = DGW.find((x) => x[0] === w)[1];
      return mc('dgp1:' + w, P.start, d, R.sample(rest(Object.keys(DG), d), 2), { say: say(w), stimulus: { emoji: DGEMO[w] }, cols: 3 }); },
  ],
  2: [
    (R) => { const [w, d] = R.pick(BLW); return mc('bl2:' + w, P.start, d, R.sample(rest(BLK, d), 3), { say: say(w), stimulus: { text: w }, cols: 4 }); },
    (R) => { const [w, d] = R.pick(BLW); return { type: 'order', key: 'bo2:' + w, prompt: { fr: 'Écoute. Place les sons pour écrire le mot.', en: 'Listen. Tap the sounds to spell the word.' }, say: say(w), tiles: [d, ...w.slice(2).split('')] }; },
    (R) => { const [w, d] = R.pick(DGW); return { type: 'order', key: 'do2:' + w, prompt: { fr: 'Écoute. Place les sons pour écrire le mot.', en: 'Listen. Tap the sounds to spell the word.' }, say: say(w), tiles: [d, ...w.slice(2).split('')] }; },
    (R) => { const [w, d] = R.pick(BLW); return mc('blw2:' + w, bq(d), w, R.sample(BLW.filter((x) => x[1] !== d).map((x) => x[0]), 2), { speak: true, cols: 3 }); },
  ],
  3: [
    (R) => { const [w, d] = R.pick(ENDW); return mc('end3:' + w, P.ends, d, R.sample(rest(Object.keys(ENDS), d), 3), { say: say(w), stimulus: { text: w }, cols: 4 }); },
    (R) => { const [w, d] = R.pick(ENDW); return mc('endw3:' + w, { fr: `Quel mot se termine par « ${d} »?`, en: `Which word ends with “${d}”?` }, w, R.sample(ENDW.filter((x) => x[1] !== d).map((x) => x[0]), 2), { speak: true, cols: 3 }); },
    (R) => { const s = R.pick(SF23); return mc('sf3:' + s[1], P.fill, s[1], s[2], { stimulus: { text: s[0] }, cols: 3 }); },
    (R) => { const ds = R.sample(Object.keys(DG), 3); const g = ds.map((d) => R.sample(DG[d], 2));
      return wordSort('sd3:' + g.flat().sort().join('|'), { fr: 'Place chaque mot selon son début.', en: 'Sort each word by how it starts.' }, ds.map((d) => ({ text: d })), g, { speak: true }); },
    (R) => { const ds = R.sample(BLK, 3); const g = ds.map((d) => R.sample(BL[d], 2));
      return wordSort('sb3:' + g.flat().sort().join('|'), { fr: 'Place chaque mot selon son début.', en: 'Sort each word by how it starts.' }, ds.map((d) => ({ text: d })), g); },
  ],
};

// ---------- e24 Nouns ----------
const NOUN = {
  person: ['teacher', 'doctor', 'farmer', 'baker', 'girl', 'boy', 'mom', 'dad', 'nurse', 'coach', 'firefighter', 'goalie', 'singer', 'friend', 'baby', 'chef'],
  animal: ['dog', 'moose', 'beaver', 'goose', 'cat', 'fish', 'horse', 'duck', 'owl', 'bear', 'rabbit', 'frog', 'deer', 'squirrel', 'cow'],
  place: ['school', 'park', 'store', 'barn', 'beach', 'library', 'arena', 'kitchen', 'farm', 'zoo', 'lake', 'hospital', 'playground', 'forest'],
  thing: ['toque', 'book', 'spoon', 'chair', 'ball', 'pencil', 'puck', 'sled', 'boot', 'cup', 'maple leaf', 'backpack', 'loonie', 'hockey stick', 'bike'],
};
const NCAT = { person: { text: 'person', emoji: '🧑' }, animal: { text: 'animal', emoji: '🐾' }, place: { text: 'place', emoji: '📍' }, thing: { text: 'thing', emoji: '📦' } };
const NW = Object.entries(NOUN).flatMap(([c, ws]) => ws.map((w) => [w, c]));
// proper nouns with the common noun they name
const PROP = [
  ['Emma', 'girl'], ['Noah', 'boy'], ['Mia', 'girl'], ['Liam', 'boy'], ['Montreal', 'city'], ['Toronto', 'city'], ['Ottawa', 'city'], ['Halifax', 'city'],
  ['Vancouver', 'city'], ['Calgary', 'city'], ['Canada', 'country'], ['Monday', 'day'], ['Friday', 'day'], ['Sunday', 'day'], ['July', 'month'], ['January', 'month'],
  ['Lake Ontario', 'lake'], ['Maple Street', 'street'], ['Canada Day', 'holiday'], ['Buddy', 'dog'], ['Luna', 'cat'], ['Ms. Brown', 'teacher'], ['Mr. Roy', 'teacher'],
  ['Oak School', 'school'], ['Niagara Falls', 'waterfall'], ['Alberta', 'province'], ['Manitoba', 'province'], ['Atlantic Ocean', 'ocean'],
];
const PSENT = [ // sentence with [Proper] and a common word to wrongly capitalise
  ['[Emma] lives in a small house.', 'house'], ['We visit [Ottawa] in the summer.', 'summer'], ['My teacher is [Ms. Brown].', 'teacher'],
  ['I play hockey on [Saturday].', 'hockey'], ['[Buddy] is my dog.', 'dog'], ['We went to [Toronto] by train.', 'train'],
  ['My birthday is in [March].', 'birthday'], ['[Noah] has a red toque.', 'toque'], ['We swim in [Lake Ontario].', 'swim'],
  ['She lives in [Canada].', 'lives'], ['[Luna] drinks milk.', 'milk'], ['There is no school on [Monday].', 'school'],
  ['My cousin is from [Halifax].', 'cousin'], ['[Mia] and I like to skate.', 'skate'], ['We eat pancakes on [Sunday].', 'pancakes'],
  ['Dad drove to [Vancouver].', 'drove'], ['In [July] it is hot.', 'hot'], ['[Liam] has a new bike.', 'bike'],
  ['We learn at [Oak School].', 'learn'], ['The moose lives in [Alberta].', 'moose'], ['I saw a beaver at [Maple Street Park].', 'beaver'],
  ['We sing on [Canada Day].', 'sing'], ['[Mr. Roy] reads us a book.', 'book'], ['The boat sails on the [Atlantic Ocean].', 'boat'],
  ['My friend [Zoe] is nice.', 'friend'], ['I see my grandma on [Friday].', 'grandma'], ['[Calgary] is a big city.', 'big'],
  ['We saw a bear in [Manitoba].', 'bear'],
];
const lowerP = (s) => s.replace(/\[([^\]]+)\]/g, (m, p) => p.toLowerCase());
const plainP = (s) => s.replace(/\[([^\]]+)\]/g, '$1');
const e24Gens = {
  1: [
    (R) => { const [w, c] = R.pick(NW); return mc('n1:' + w, { fr: 'Ce mot nomme quoi?', en: 'What does this word name?' }, c, R.sample(rest(Object.keys(NOUN), c), 2),
      { say: say(w), stimulus: { text: w }, cols: 3 }); },
    (R) => { const [a, b] = R.sample(Object.keys(NOUN), 2); const ga = R.sample(NOUN[a], 3), gb = R.sample(NOUN[b], 3);
      return wordSort('ns1:' + [...ga, ...gb].sort().join('|'), { fr: 'Place chaque nom dans la bonne boîte.', en: 'Put each noun in the right box.' }, [NCAT[a], NCAT[b]], [ga, gb]); },
    (R) => { const [w, c] = R.pick(NW); const o = R.sample(NW.filter((x) => x[1] !== c).map((x) => x[0]), 2);
      return mc('nw1:' + w, { fr: `Quel mot nomme un(e) ${{ person: 'personne', animal: 'animal', place: 'lieu', thing: 'objet' }[c]}?`, en: `Which word names a ${c}?` }, w, o, { speak: true, cols: 3 }); },
  ],
  2: [
    (R) => { const [p, c] = R.pick(PROP); const o = R.sample(NW.map((x) => x[0]).filter((w) => w !== c), 2);
      return mc('pn2:' + p, { fr: 'Quel mot est un NOM PROPRE (il prend une majuscule)?', en: 'Which word is a PROPER noun (it needs a capital letter)?' }, p.toLowerCase(), [c, ...o].slice(0, 2).concat([]), { cols: 3 }); },
    (R) => { const s = R.pick(PSENT); const [, c] = [0, s[1]]; const wrongCap = plainP(s[0]).replace(new RegExp('\\b' + s[1] + '\\b'), cap(s[1]));
      return mc('ps2:' + s[0], P.correct, plainP(s[0]), [lowerP(s[0]), wrongCap === plainP(s[0]) ? lowerP(s[0]).toLowerCase() : wrongCap], { cols: 1 }); },
    (R) => { const a = R.sample(PROP, 3), b = R.sample(NW.map((x) => x[0]), 3);
      return wordSort('pc2:' + [...a.map((x) => x[0]), ...b].sort().join('|'), { fr: 'Nom commun ou nom propre?', en: 'Common noun or proper noun?' },
        [{ text: 'Common noun', emoji: '🔤' }, { text: 'Proper noun', emoji: '🔠' }], [b, a.map((x) => x[0])]); },
  ],
  3: [
    (R) => { const s = R.pick(PSENT.filter((x) => !x[0].startsWith('['))); const m = s[0].match(/\[([^\]]+)\]/)[1]; const text = lowerP(s[0]).replace(/^./, (c) => c.toUpperCase()).replace(/\.$/, '.');
      const w = text.replace(/[.!?]$/, '').split(' '); const target = m.toLowerCase().split(' ')[0];
      const others = w.slice(1).filter((x) => x !== target && !m.toLowerCase().split(' ').includes(x));
      return mc('cw3:' + s[0], { fr: 'Quel mot doit avoir une majuscule? (pas le premier mot)', en: 'Which word needs a capital letter? (not the first word)' }, target,
        R.sample(others.length > 2 ? others : [...others, 'the', 'a'], 3), { stimulus: { text }, cols: 2 }); },
    (R) => { const s = R.pick(PSENT); return mc('ps3:' + s[0], P.correct, plainP(s[0]), [lowerP(s[0]).replace(/^./, (c) => c.toUpperCase()), plainP(s[0]).replace(new RegExp('\\b' + s[1] + '\\b'), cap(s[1])), lowerP(s[0])]
      .filter((x) => x !== plainP(s[0])), { cols: 1 }); },
    (R) => { const d = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'january', 'february', 'march', 'april', 'june', 'july', 'august', 'september', 'october', 'november', 'december', 'canada'];
      const w = R.pick(d); return mc('day3:' + w, { fr: 'Quel mot est bien écrit?', en: 'Which word is written correctly?' }, cap(w), [w, w.toUpperCase().replace(/^(.)(.*)$/, (m, a, b) => a + b.slice(0, 1).toUpperCase() + b.slice(1).toLowerCase())], { say: say(cap(w)), cols: 3 }); },
    (R) => { const [p, c] = R.pick(PROP); return mc('pc3:' + p, { fr: `« ${p} » est quel genre de mot?`, en: `What kind of noun is “${p}”?` }, 'proper noun', ['common noun', 'verb'], { cols: 3 }); },
  ],
};

// ---------- e25 Plurals ----------
// [singular, plural, type, emoji?]  type: s | es | ies | ves | irr
const PL = [
  ['cat', 'cats', 's', '🐱'], ['dog', 'dogs', 's', '🐶'], ['book', 'books', 's', '📚'], ['hat', 'hats', 's', '🎩'], ['tree', 'trees', 's', '🌳'],
  ['star', 'stars', 's', '⭐'], ['boot', 'boots', 's', '🥾'], ['duck', 'ducks', 's', '🦆'], ['apple', 'apples', 's', '🍎'], ['ball', 'balls', 's', '⚽'],
  ['bike', 'bikes', 's', '🚲'], ['pig', 'pigs', 's', '🐷'], ['egg', 'eggs', 's', '🥚'], ['pencil', 'pencils', 's'], ['truck', 'trucks', 's', '🚚'],
  ['toque', 'toques', 's'], ['puck', 'pucks', 's'], ['sled', 'sleds', 's'], ['bird', 'birds', 's', '🐦'], ['moon', 'moons', 's'],
  ['box', 'boxes', 'es', '📦'], ['bus', 'buses', 'es', '🚌'], ['dish', 'dishes', 'es', '🍽️'], ['watch', 'watches', 'es', '⌚'], ['fox', 'foxes', 'es', '🦊'],
  ['glass', 'glasses', 'es'], ['brush', 'brushes', 'es'], ['dress', 'dresses', 'es', '👗'], ['wish', 'wishes', 'es'], ['bench', 'benches', 'es'],
  ['church', 'churches', 'es', '⛪'], ['peach', 'peaches', 'es', '🍑'], ['sandwich', 'sandwiches', 'es', '🥪'], ['class', 'classes', 'es'], ['kiss', 'kisses', 'es'],
  ['baby', 'babies', 'ies', '👶'], ['puppy', 'puppies', 'ies'], ['cherry', 'cherries', 'ies', '🍒'], ['berry', 'berries', 'ies'], ['city', 'cities', 'ies'],
  ['fly', 'flies', 'ies', '🪰'], ['story', 'stories', 'ies'], ['bunny', 'bunnies', 'ies', '🐰'], ['lady', 'ladies', 'ies'], ['party', 'parties', 'ies', '🎉'], ['pony', 'ponies', 'ies'],
  ['leaf', 'leaves', 'ves', '🍃'], ['wolf', 'wolves', 'ves', '🐺'], ['shelf', 'shelves', 'ves'], ['knife', 'knives', 'ves'], ['loaf', 'loaves', 'ves', '🍞'], ['calf', 'calves', 'ves'],
  ['child', 'children', 'irr'], ['mouse', 'mice', 'irr', '🐭'], ['foot', 'feet', 'irr', '🦶'], ['tooth', 'teeth', 'irr', '🦷'], ['man', 'men', 'irr'], ['woman', 'women', 'irr'],
  ['goose', 'geese', 'irr'], ['sheep', 'sheep', 'irr', '🐑'], ['fish', 'fish', 'irr', '🐟'], ['deer', 'deer', 'irr', '🦌'], ['moose', 'moose', 'irr'],
];
const IRRW = { child: ['childs', 'childes'], mouse: ['mouses', 'mices'], foot: ['foots', 'feets'], tooth: ['tooths', 'teeths'], man: ['mans', 'manes'], woman: ['womans', 'womens'],
  goose: ['gooses', 'geeses'], sheep: ['sheeps', 'sheepes'], fish: ['fishs', 'fishies'], deer: ['deers', 'deeres'], moose: ['mooses', 'meese'] };
function badPl(s, p, t) {
  if (t === 'irr') return IRRW[s];
  return [...new Set([s + 's', s + 'es', s.replace(/y$/, 'ies'), s.replace(/y$/, 'ys'), s.replace(/fe?$/, 'ves'), s.replace(/fe?$/, 'fs'), s + 's' + 's'])]
    .filter((x) => x !== p && x !== s && x !== s + 'ss');
}
const PLR = PL.filter((x) => x[2] !== 'irr');
const PLIRR = PL.filter((x) => x[2] === 'irr');
const RULE = { s: 'add -s', es: 'add -es', ies: 'change y to i, add -es', ves: 'change f to v, add -es' };
const nword = (n) => ['', 'one', 'two', 'three', 'four', 'five'][n];
const e25Gens = {
  1: [
    (R) => { const x = R.pick(PL.filter((y) => y[3] && y[2] !== 'irr' && y[2] !== 'ves')); const n = R.int(2, 5);
      return mc('p1e:' + x[1] + n, { fr: `Regarde. Complète : « Je vois ${n} ___. »`, en: `Look. Complete: “I see ${nword(n)} ___.”` }, x[1], [x[0], ...R.sample(badPl(...x.slice(0, 3)), 1)],
        { stimulus: { emojis: x[3], count: n }, cols: 3 }); },
    (R) => { const x = R.pick(PL); const o = R.sample(PL.filter((y) => y[0] !== x[0] && y[0] !== y[1]), 2).map((y) => y[0]);
      return mc('p1m:' + x[1], { fr: 'Quel mot veut dire PLUS D\'UN?', en: 'Which word means MORE THAN ONE?' }, x[1], o, { say: say(x[1]), cols: 3 }); },
    (R) => { const a = R.sample(PLR, 3); return wordSort('p1s:' + a.map((x) => x[0]).sort().join('|'), { fr: 'Un ou plusieurs?', en: 'One or many?' },
      [{ text: 'One', emoji: '1️⃣' }, { text: 'Many', emoji: '🔢' }], [a.map((x) => x[0]), a.map((x) => x[1])], { speak: true }); },
  ],
  2: [
    (R) => { const x = R.pick(PLR); return mc('p2f:' + x[0], { fr: 'Complète la phrase.', en: 'Complete the sentence.' }, x[1], [x[0], ...R.sample(badPl(...x.slice(0, 3)), 2)],
      { stimulus: { text: `I see ${R.pick(['two', 'three', 'four', 'five'])} ___. (${x[0]})` }, cols: 2 }); },
    (R) => { const x = R.pick(PLR); return mc('p2r:' + x[0], { fr: `Comment fait-on le pluriel de « ${x[0]} »?`, en: `How do we make the plural of “${x[0]}”?` }, RULE[x[2]],
      rest(Object.values(RULE), RULE[x[2]]), { stimulus: { text: x[0] }, cols: 2 }); },
    (R) => { const x = R.pick(PLR); return mc('p2c:' + x[0], P.correct, `Two ${x[1]} are here.`, [`Two ${badPl(...x.slice(0, 3))[0]} are here.`, `Two ${x[0]} are here.`], { cols: 1 }); },
  ],
  3: [
    (R) => { const x = R.pick(PL); return mc('p3s:' + x[0], { fr: `Quel est le pluriel de « ${x[0]} »?`, en: `What is the plural of “${x[0]}”?` }, x[1], badPl(...x.slice(0, 3)).concat(x[2] === 'irr' ? [] : [x[0]]), { say: say(x[0]), stimulus: { text: x[0] }, cols: 2 }); },
    (R) => { const x = R.pick(PL); const pl = R.chance(0.5); const w = pl ? x[1] : x[0]; const n = pl ? R.pick(['two', 'three', 'four']) : 'one';
      return mc('p3v:' + w + n, { fr: 'Choisis is ou are.', en: 'Choose is or are.' }, pl ? 'are' : 'is', [pl ? 'is' : 'are'], { stimulus: { text: `There ___ ${n} ${w} here.` }, cols: 2 }); },
    (R) => { const x = R.pick(PLIRR); return mc('p3i:' + x[0], { fr: 'Choisis le bon mot.', en: 'Choose the right word.' }, x[1], IRRW[x[0]].concat([x[0] + 's']), { stimulus: { text: `I see two ___. (${x[0]})` }, cols: 2 }); },
    (R) => { const x = R.pick(PLR); return mc('p3c:' + x[0], P.correct, `The ${x[1]} are on the table.`, [`The ${badPl(...x.slice(0, 3))[0]} are on the table.`, `The ${x[1]} is on the table.`, `The ${x[0]} are on the table.`], { cols: 1 }); },
  ],
};

// ---------- e26 Verbs & present-tense agreement ----------
// [base, third person, tail]
const VB = [
  ['run', 'runs', 'fast'], ['jump', 'jumps', 'high'], ['play', 'plays', 'hockey'], ['eat', 'eats', 'pancakes'], ['read', 'reads', 'a book'],
  ['sing', 'sings', 'a song'], ['swim', 'swims', 'in the lake'], ['walk', 'walks', 'to school'], ['draw', 'draws', 'a moose'], ['skate', 'skates', 'on the ice'],
  ['write', 'writes', 'a story'], ['help', 'helps', 'at home'], ['sleep', 'sleeps', 'all night'], ['look', 'looks', 'at the stars'], ['clap', 'claps', 'loudly'],
  ['wash', 'washes', 'the dishes'], ['catch', 'catches', 'the puck'], ['watch', 'watches', 'a movie'], ['go', 'goes', 'to the park'], ['do', 'does', 'homework'],
  ['fly', 'flies', 'a kite'], ['try', 'tries', 'hard'], ['carry', 'carries', 'a bag'], ['push', 'pushes', 'the sled'], ['kiss', 'kisses', 'the baby'],
];
const SUB1 = ['He', 'She', 'The dog', 'My sister', 'Dad', 'Mia', 'The teacher', 'Our goalie', 'My cat', 'Grandpa'];
const SUBP = ['They', 'We', 'You', 'I', 'The dogs', 'My friends', 'Mia and Max', 'The kids', 'Mom and Dad', 'The players'];
const SUB3 = [
  ['The goalie with the new skates', 1], ['The girls in my class', 0], ['My dog and my cat', 0], ['Each player', 1], ['The puppy next door', 1], ['My brother and sister', 0],
  ['The boy with the red toque', 1], ['The children at the park', 0], ['My friend and I', 0], ['The teacher and the students', 0], ['Everyone in the room', 1], ['The little mice', 0],
  ['Max and his dad', 0], ['The bird in the tree', 1], ['The ducks on the pond', 0], ['My grandma', 1], ['Our neighbours', 0], ['The farmer and his cow', 0],
];
const NONV = ['table', 'red', 'happy', 'snow', 'big', 'chair', 'blue', 'school', 'soft', 'moose', 'tall', 'cold', 'window', 'green', 'toque', 'house', 'tiny', 'apple', 'lake', 'yellow'];
const ISARE = [['I', 'am'], ['He', 'is'], ['She', 'is'], ['It', 'is'], ['We', 'are'], ['You', 'are'], ['They', 'are'], ['The dog', 'is'], ['The dogs', 'are'], ['My sister', 'is'], ['My friends', 'are'], ['Mia and I', 'are'], ['The teacher', 'is'], ['The kids', 'are']];
const HASHAVE = [['I', 'have'], ['He', 'has'], ['She', 'has'], ['We', 'have'], ['They', 'have'], ['You', 'have'], ['The dog', 'has'], ['The kids', 'have'], ['My sister', 'has'], ['Mia and Max', 'have'], ['Dad', 'has'], ['The players', 'have']];
const isAdj = ['happy', 'tired', 'hungry', 'ready', 'cold', 'late', 'brave', 'kind'];
const hhTail = ['a new toque', 'a red bike', 'two skates', 'a big smile', 'a loonie', 'a cold', 'a sled', 'a good book'];
const e26Gens = {
  1: [
    (R) => { const v = R.pick(VB); return mc('av1:' + v[0], { fr: 'Quel mot dit ce qu\'on FAIT (un verbe)?', en: 'Which word is an action word (a verb)?' }, v[0], R.sample(NONV, 2), { speak: true, cols: 3 }); },
    (R) => { const v = R.pick(VB.slice(0, 18)); const s = R.pick(SUB1); const text = `${s} ${v[1]} ${v[2]}.`;
      return mc('av1s:' + text, { fr: 'Touche le verbe (l\'action) dans la phrase.', en: 'Tap the action word (the verb) in the sentence.' }, v[1], [s.split(' ').pop(), v[2].split(' ').pop(), 'the'].filter((w) => w !== v[1]), { stimulus: { text }, say: say(text), cols: 2 }); },
    (R) => { const a = R.sample(VB, 3).map((x) => x[0]), b = R.sample(NONV, 3);
      return wordSort('av1o:' + [...a, ...b].sort().join('|'), { fr: 'Action ou autre mot?', en: 'Action word or not?' }, [{ text: 'Action words', emoji: '🏃' }, { text: 'Not action words', emoji: '🏷️' }], [a, b]); },
    (R) => { const v = R.pick(VB.slice(0, 18)); const one = R.chance(0.5); const s = one ? R.pick(SUB1.slice(0, 7)) : R.pick(SUBP.slice(0, 6));
      return mc('ag1:' + s + v[0], { fr: 'Choisis le bon verbe.', en: 'Choose the right verb.' }, one ? v[1] : v[0], [one ? v[0] : v[1]], { stimulus: { text: `${s} ___ ${v[2]}.` }, say: say(`${s} ${one ? v[1] : v[0]} ${v[2]}.`), cols: 2 }); },
  ],
  2: [
    (R) => { const v = R.pick(VB); const one = R.chance(0.5); const s = one ? R.pick(SUB1) : R.pick(SUBP);
      return mc('ag2:' + s + v[0], { fr: 'Choisis le bon verbe.', en: 'Choose the right verb.' }, one ? v[1] : v[0], [one ? v[0] : v[1], v[0] + 'ing'], { stimulus: { text: `${s} ___ ${v[2]}.` }, cols: 3 }); },
    (R) => { const [s, w] = R.pick(ISARE); const adj = R.pick(isAdj); return mc('ia2:' + s + adj, { fr: 'Choisis am, is ou are.', en: 'Choose am, is or are.' }, w, rest(['am', 'is', 'are'], w), { stimulus: { text: `${s} ___ ${adj}.` }, cols: 3 }); },
    (R) => { const [s, w] = R.pick(HASHAVE); const t = R.pick(hhTail); return mc('hh2:' + s + t, { fr: 'Choisis has ou have.', en: 'Choose has or have.' }, w, rest(['has', 'have'], w), { stimulus: { text: `${s} ___ ${t}.` }, cols: 2 }); },
    (R) => { const v = R.pick(VB.slice(0, 18)); const one = R.chance(0.5); const s = one ? R.pick(['My sister', 'Dad', 'Mia', 'The dog']) : R.pick(['My friends', 'The kids', 'Mia and Max', 'The dogs']);
      const tiles = [...s.split(' '), one ? v[1] : v[0], ...v[2].split(' ')]; tiles[tiles.length - 1] += '.';
      return { type: 'order', key: 'ao2:' + s + v[0], prompt: { fr: 'Remets les mots dans l\'ordre.', en: 'Put the words in order.' }, tiles, extra: [one ? v[0] : v[1]], joiner: ' ' }; },
  ],
  3: [
    (R) => { const [s, one] = R.pick(SUB3); const v = R.pick(VB); return mc('ag3:' + s + v[0], { fr: 'Choisis le bon verbe.', en: 'Choose the right verb.' }, one ? v[1] : v[0], [one ? v[0] : v[1]], { stimulus: { text: `${s} ___ ${v[2]}.` }, cols: 2 }); },
    (R) => { const [s, one] = R.pick(SUB3); const v = R.pick(VB); const ok = `${s} ${one ? v[1] : v[0]} ${v[2]}.`; const bad = `${s} ${one ? v[0] : v[1]} ${v[2]}.`;
      return mc('ac3:' + s + v[0], P.correct, ok, [bad], { cols: 1 }); },
    (R) => { const [s, one] = R.pick(SUB3); const adj = R.pick(isAdj); return mc('ia3:' + s + adj, { fr: 'Choisis is ou are.', en: 'Choose is or are.' }, one ? 'is' : 'are', [one ? 'are' : 'is'], { stimulus: { text: `${s} ___ ${adj}.` }, cols: 2 }); },
    (R) => { const [s, one] = R.pick(SUB3); const t = R.pick(hhTail); return mc('hh3:' + s + t, { fr: 'Choisis has ou have.', en: 'Choose has or have.' }, one ? 'has' : 'have', [one ? 'have' : 'has'], { stimulus: { text: `${s} ___ ${t}.` }, cols: 2 }); },
  ],
};

// ---------- e27 Past tense ----------
// [base, past, tail, kind]
const PA = [
  ['walk', 'walked', 'to school', 'r'], ['jump', 'jumped', 'over a puddle', 'r'], ['play', 'played', 'hockey', 'r'], ['help', 'helped', 'my mom', 'r'], ['look', 'looked', 'at the stars', 'r'],
  ['want', 'wanted', 'a cookie', 'r'], ['cook', 'cooked', 'pasta', 'r'], ['clean', 'cleaned', 'my room', 'r'], ['open', 'opened', 'the door', 'r'], ['stop', 'stopped', 'at the corner', 'r'],
  ['hop', 'hopped', 'on one foot', 'r'], ['clap', 'clapped', 'for the band', 'r'], ['hug', 'hugged', 'my grandma', 'r'], ['skip', 'skipped', 'down the street', 'r'], ['plan', 'planned', 'a party', 'r'],
  ['like', 'liked', 'the movie', 'r'], ['bake', 'baked', 'cookies', 'r'], ['dance', 'danced', 'in the kitchen', 'r'], ['smile', 'smiled', 'at me', 'r'], ['use', 'used', 'a red crayon', 'r'],
  ['cry', 'cried', 'a little', 'r'], ['try', 'tried', 'again', 'r'], ['carry', 'carried', 'the bag', 'r'], ['hurry', 'hurried', 'to the bus', 'r'], ['worry', 'worried', 'about the test', 'r'],
  ['go', 'went', 'to the park', 'i'], ['see', 'saw', 'a moose', 'i'], ['eat', 'ate', 'pancakes', 'i'], ['run', 'ran', 'to the bus', 'i'], ['make', 'made', 'a snowman', 'i'],
  ['come', 'came', 'home', 'i'], ['give', 'gave', 'me a card', 'i'], ['take', 'took', 'a photo', 'i'], ['sit', 'sat', 'on the bench', 'i'], ['get', 'got', 'a new toque', 'i'],
  ['have', 'had', 'a snack', 'i'], ['say', 'said', 'hello', 'i'], ['write', 'wrote', 'a story', 'i'], ['draw', 'drew', 'a picture', 'i'], ['swim', 'swam', 'in the lake', 'i'],
  ['sing', 'sang', 'a song', 'i'], ['fall', 'fell', 'on the ice', 'i'], ['find', 'found', 'a loonie', 'i'], ['buy', 'bought', 'a book', 'i'], ['bring', 'brought', 'my skates', 'i'],
  ['know', 'knew', 'the answer', 'i'], ['ride', 'rode', 'my bike', 'i'], ['drink', 'drank', 'hot chocolate', 'i'], ['fly', 'flew', 'a kite', 'i'], ['grow', 'grew', 'tall', 'i'],
  ['tell', 'told', 'a joke', 'i'], ['win', 'won', 'the game', 'i'], ['hide', 'hid', 'behind the door', 'i'],
];
const PAR = PA.filter((x) => x[3] === 'r'), PAI = PA.filter((x) => x[3] === 'i');
const badPast = (b, p) => [...new Set([b, b + 'ed', b + 'd', b.replace(/y$/, 'yed'), b + b[b.length - 1] + 'ed', b + 'ing'])].filter((x) => x !== p);
const PASTM = ['yesterday', 'last night', 'last week', 'two days ago'];
const PRESM = ['today', 'every day', 'every Saturday', 'every morning'];
const WW = ['at the rink', 'at school', 'in the park', 'very happy', 'tired', 'at home', 'late', 'cold'];
const SUBWAS = ['I', 'He', 'She', 'It', 'The dog', 'My sister', 'My dad'], SUBWERE = ['We', 'You', 'They', 'The dogs', 'My friends', 'The kids', 'Mom and Dad'];
const e27Gens = {
  1: [
    (R) => { const x = R.pick(PAR); const m = R.pick(PASTM), n = R.pick(PRESM), s = R.pick(['I', 'We', 'They', 'You']);
      return mc('pt1:' + x[0] + s + m + n, { fr: 'Quelle phrase parle du PASSÉ (c’est déjà arrivé)?', en: 'Which sentence is about the PAST (it already happened)?' },
        `${s} ${x[1]} ${x[2]} ${m}.`, [`${s} ${x[0]} ${x[2]} ${n}.`, `${s} will ${x[0]} ${x[2]} tomorrow.`], { cols: 1 }); },
    (R) => { const was = R.chance(0.5); const s = R.pick(was ? SUBWAS : SUBWERE); const t = R.pick(WW);
      return mc('ww1:' + s + t, { fr: 'Choisis was ou were.', en: 'Choose was or were.' }, was ? 'was' : 'were', [was ? 'were' : 'was'], { stimulus: { text: `${s} ___ ${t} yesterday.` }, cols: 2 }); },
    (R) => { const x = R.pick(PA); return mc('pb1:' + x[0], { fr: 'Quel mot parle du passé?', en: 'Which word is about the past?' }, x[1], [x[0]], { speak: true, cols: 2 }); },
    (R) => { const a = R.sample(PA, 3); return wordSort('ps1:' + a.map((x) => x[0]).sort().join('|'), { fr: 'Maintenant ou avant?', en: 'Now or before?' },
      [{ text: 'Now (present)', emoji: '▶️' }, { text: 'Before (past)', emoji: '⏪' }], [a.map((x) => x[0]), a.map((x) => x[1])]); },
  ],
  2: [
    (R) => { const x = R.pick(PA); const m = R.pick(PASTM); return mc('pf2:' + x[0] + m, P.fill, x[1], badPast(x[0], x[1]).slice(0, 3), { stimulus: { text: `We ___ ${x[2]} ${m}.` }, cols: 2 }); },
    (R) => { const x = R.pick(PAR); return mc('pr2:' + x[0], { fr: 'Quelle orthographe est correcte?', en: 'Which spelling is correct?' }, x[1], [...new Set([x[0] + 'ed', x[0] + 'd', x[0].replace(/y$/, 'yed'), x[0] + x[0][x[0].length - 1] + 'ed', x[0].slice(0, -1) + 'ed'])].filter((w) => w !== x[1]).slice(0, 3), { say: say(x[1]), stimulus: { text: `${x[0]} → ?` }, cols: 2 }); },
    (R) => { const x = R.pick(PA); const m = R.pick(PASTM), n = R.pick(PRESM);
      return mc('pw2:' + x[0] + m + n, { fr: 'Quelle phrase parle du passé?', en: 'Which sentence is about the past?' }, `We ${x[1]} ${x[2]} ${m}.`, [`We ${x[0]} ${x[2]} ${n}.`], { cols: 1 }); },
    (R) => { const was = R.chance(0.5); const s = R.pick(was ? SUBWAS : SUBWERE); const t = R.pick(WW);
      return mc('ww2:' + s + t, { fr: 'Choisis was ou were.', en: 'Choose was or were.' }, was ? 'was' : 'were', [was ? 'were' : 'was'], { stimulus: { text: `${s} ___ ${t} last night.` }, cols: 2 }); },
  ],
  3: [
    (R) => { const x = R.pick(PAI); const m = R.pick(PASTM); return mc('pi3:' + x[0] + m, P.fill, x[1], badPast(x[0], x[1]).slice(0, 3), { stimulus: { text: `I ___ ${x[2]} ${m}.` }, cols: 2 }); },
    (R) => { const x = R.pick(PA); const m = R.pick(PASTM);
      const tiles = ['We', x[1], ...x[2].split(' '), ...m.split(' ')]; tiles[tiles.length - 1] += '.';
      return { type: 'order', key: 'po3:' + x[0] + m, prompt: { fr: 'Remets les mots dans l\'ordre.', en: 'Put the words in order.' }, tiles, extra: [x[0]], joiner: ' ' }; },
    (R) => { const x = R.pick(PA); return mc('pc3:' + x[0], P.correct, `Yesterday I ${x[1]} ${x[2]}.`, [`Yesterday I ${badPast(x[0], x[1])[0]} ${x[2]}.`, `Yesterday I ${x[0]} ${x[2]}.`], { cols: 1 }); },
    (R) => { const x = R.pick(PA); return mc('pq3:' + x[0], { fr: `Quel est le passé de « ${x[0]} »?`, en: `What is the past tense of “${x[0]}”?` }, x[1], badPast(x[0], x[1]).slice(0, 3), { say: say(x[0]), stimulus: { text: x[0] }, cols: 2 }); },
  ],
};

// ---------- e28 Adjectives ----------
const ADJK = {
  colour: 'red blue green yellow purple orange pink brown black white grey gold'.split(' '),
  size: 'big small tiny huge tall short long little giant wide'.split(' '),
  feeling: 'happy sad angry scared excited tired proud nervous lonely brave'.split(' '),
  touch: 'soft hard rough smooth sticky wet dry fluffy sharp bumpy'.split(' '),
};
const ADJKW = Object.entries(ADJK).flatMap(([k, ws]) => ws.map((w) => [w, k]));
const KBIN = { colour: { text: 'Colour', emoji: '🎨' }, size: { text: 'Size', emoji: '📏' }, feeling: { text: 'Feeling', emoji: '😊' }, touch: { text: 'Touch', emoji: '✋' } };
const KFR = { colour: 'la COULEUR', size: 'la TAILLE', feeling: 'un SENTIMENT', touch: 'le TOUCHER' };
const KEN = { colour: 'the COLOUR', size: 'the SIZE', feeling: 'a FEELING', touch: 'how it FEELS to touch' };
// [adjective, noun, rest of sentence] one adjective
const AS1 = [
  ['fluffy', 'cat', 'sleeps on the sofa'], ['tall', 'tree', 'grows by the lake'], ['happy', 'girl', 'sings a song'], ['red', 'toque', 'keeps me warm'],
  ['tiny', 'bug', 'crawls on the leaf'], ['cold', 'snow', 'falls on the roof'], ['yellow', 'bus', 'stops at school'], ['hungry', 'moose', 'eats the grass'],
  ['soft', 'blanket', 'is on my bed'], ['big', 'dog', 'barks at the mailman'], ['sleepy', 'baby', 'yawns'], ['sweet', 'cookie', 'is in the jar'],
  ['loud', 'drum', 'bangs all day'], ['brave', 'firefighter', 'climbs the ladder'], ['shiny', 'loonie', 'is in my pocket'], ['little', 'duck', 'swims in the pond'],
  ['sour', 'lemon', 'is on the table'], ['dark', 'cave', 'is near the hill'], ['juicy', 'peach', 'tastes great'], ['kind', 'teacher', 'helps us read'],
  ['green', 'frog', 'jumps in the pond'], ['hot', 'soup', 'is in the bowl'], ['quiet', 'mouse', 'hides in the wall'], ['wet', 'dog', 'shakes the water off'],
  ['funny', 'clown', 'makes us laugh'], ['strong', 'bear', 'catches a fish'], ['round', 'ball', 'rolls down the hill'], ['spicy', 'chili', 'burns my tongue'],
  ['proud', 'boy', 'holds his medal'], ['warm', 'mitten', 'covers my hand'],
];
// [adj1, kind of adj1, adj2 (colour), noun, rest]
const AS2 = [
  ['big', 'size', 'brown', 'dog', 'barks at the mailman'], ['tiny', 'size', 'green', 'frog', 'sits on a leaf'], ['tall', 'size', 'white', 'snowman', 'stands in the yard'],
  ['happy', 'feeling', 'yellow', 'duck', 'swims in the pond'], ['little', 'size', 'red', 'toque', 'keeps me warm'], ['huge', 'size', 'grey', 'moose', 'walks in the forest'],
  ['sleepy', 'feeling', 'black', 'cat', 'naps by the fire'], ['small', 'size', 'orange', 'pumpkin', 'sits on the porch'], ['long', 'size', 'blue', 'scarf', 'hangs on the hook'],
  ['soft', 'touch', 'pink', 'blanket', 'is on my bed'], ['fluffy', 'touch', 'white', 'rabbit', 'hops in the garden'], ['scared', 'feeling', 'brown', 'puppy', 'hides under the bed'],
  ['tall', 'size', 'green', 'tree', 'grows by the lake'], ['rough', 'touch', 'grey', 'rock', 'sits by the river'], ['sad', 'feeling', 'blue', 'bird', 'sits on the fence'],
  ['giant', 'size', 'orange', 'pumpkin', 'grows on the farm'], ['sticky', 'touch', 'pink', 'candy', 'is in my hand'], ['excited', 'feeling', 'little', 'girl', 'opens her gift'],
  ['smooth', 'touch', 'white', 'pebble', 'is in my pocket'], ['angry', 'feeling', 'black', 'goose', 'honks at us'],
].filter((x) => ADJK.colour.includes(x[2]));
// [base, comparative, superlative, frame for -er, frame for -est]
const CMP = [
  ['tall', 'taller', 'tallest', 'A giraffe is ___ than a horse.', 'The giraffe is the ___ animal at the zoo.'],
  ['short', 'shorter', 'shortest', 'A mouse is ___ than a dog.', 'The ant is the ___ bug in the garden.'],
  ['long', 'longer', 'longest', 'A snake is ___ than a worm.', 'The giraffe has the ___ neck.'],
  ['big', 'bigger', 'biggest', 'An elephant is ___ than a cat.', 'The whale is the ___ animal in the sea.'],
  ['small', 'smaller', 'smallest', 'A mouse is ___ than a moose.', 'The ant is the ___ animal in our story.'],
  ['fast', 'faster', 'fastest', 'A car is ___ than a bike.', 'The cheetah is the ___ animal on land.'],
  ['slow', 'slower', 'slowest', 'A snail is ___ than a rabbit.', 'The snail came last. It is the ___ animal.'],
  ['cold', 'colder', 'coldest', 'Winter is ___ than fall.', 'January is the ___ month in Canada.'],
  ['hot', 'hotter', 'hottest', 'Summer is ___ than spring.', 'July is the ___ month of the year.'],
  ['happy', 'happier', 'happiest', 'I am ___ today than yesterday.', 'This is the ___ day of my life!'],
  ['strong', 'stronger', 'strongest', 'A bear is ___ than a rabbit.', 'The bear is the ___ animal in the forest.'],
  ['old', 'older', 'oldest', 'My dad is ___ than me.', 'Grandpa is the ___ person in our family.'],
  ['young', 'younger', 'youngest', 'My sister is ___ than me.', 'The baby is the ___ child in our family.'],
  ['soft', 'softer', 'softest', 'A pillow is ___ than a rock.', 'The kitten has the ___ fur.'],
  ['loud', 'louder', 'loudest', 'A drum is ___ than a flute.', 'The thunder was the ___ sound of the night.'],
  ['quiet', 'quieter', 'quietest', 'A library is ___ than a hockey rink.', 'The mouse is the ___ animal in the house.'],
  ['heavy', 'heavier', 'heaviest', 'A truck is ___ than a bike.', 'The elephant is the ___ animal at the zoo.'],
  ['tiny', 'tinier', 'tiniest', 'A bug is ___ than a bird.', 'The ant is the ___ animal in the garden.'],
  ['funny', 'funnier', 'funniest', 'This joke is ___ than that one.', 'That was the ___ movie ever!'],
  ['warm', 'warmer', 'warmest', 'The sun is ___ than the shade.', 'The kitchen is the ___ room in the house.'],
  ['high', 'higher', 'highest', 'A plane flies ___ than a bird.', 'Mount Logan is the ___ mountain in Canada.'],
  ['dark', 'darker', 'darkest', 'Night is ___ than evening.', 'Midnight is the ___ time of the night.'],
  ['good', 'better', 'best', 'This book is ___ than that one.', 'She is the ___ skater on the team.'],
  ['bad', 'worse', 'worst', 'A cold day is ___ than a warm day for a picnic.', 'That was the ___ storm of the year.'],
];
const cmpWrong = (c, right) => [c[0], c[1], c[2], 'more ' + c[0], 'most ' + c[0], c[0] + 'er', c[0] + 'est', c[0] + 'r', c[0] + 'st']
  .filter((x) => x !== right && x !== c[1] + 'x');
const cmpPick = (R, c, right, n, ok) => { const w = cmpWrong(c, right).filter((x) => !ok.includes(x)); return R.sample([...new Set(w)], n); };
const e28Gens = {
  1: [
    (R) => { const s = R.pick(AS1); const text = `The ${s[0]} ${s[1]} ${s[2]}.`;
      return mc('a1:' + s[0] + s[1], { fr: 'Quel mot DÉCRIT le nom?', en: 'Which word DESCRIBES the noun?' }, s[0], [s[1], s[2].split(' ')[0], 'The'], { stimulus: { text }, say: say(text), cols: 2 }); },
    (R) => { const [w, k] = R.pick(ADJKW); return mc('ak1:' + w, { fr: 'Ce mot décrit quoi?', en: 'What does this word tell about?' }, k, R.sample(rest(['colour', 'size', 'feeling'], k), 2),
      { say: say(w), stimulus: { text: w }, cols: 3 }); },
    (R) => { const ks = R.sample(['colour', 'size', 'feeling'], 2); const g = ks.map((k) => R.sample(ADJK[k], 3));
      return wordSort('as1:' + g.flat().sort().join('|'), { fr: 'Place chaque mot dans la bonne boîte.', en: 'Put each describing word in the right box.' }, ks.map((k) => KBIN[k]), g); },
  ],
  2: [
    (R) => { const s = R.pick(AS2); const text = `The ${s[0]}, ${s[2]} ${s[3]} ${s[4]}.`.replace(', ', ' ');
      const colour = R.chance(0.5); const a = colour ? s[2] : s[0];
      return mc('a2:' + s[0] + s[3] + colour, { fr: `Quel mot dit ${colour ? 'la COULEUR' : KFR[s[1]]}?`, en: `Which word tells ${colour ? 'the COLOUR' : KEN[s[1]]}?` }, a, [colour ? s[0] : s[2], s[3], s[4].split(' ')[0]], { stimulus: { text }, say: say(text), cols: 2 }); },
    (R) => { const c = R.pick(CMP); return mc('c2:' + c[0], P.fill, c[1], cmpPick(R, c, c[1], 2, [c[2]]).concat([c[2]]).slice(0, 3), { stimulus: { text: c[3] }, cols: 2 }); },
    (R) => { const [a, ka] = R.pick(ADJKW); const o = R.sample(ADJKW.filter((x) => x[1] !== ka), 2).map((x) => x[0]);
      return mc('ak2:' + a, { fr: `Quel mot dit ${KFR[ka]}?`, en: `Which word tells ${KEN[ka]}?` }, a, o, { speak: true, cols: 3 }); },
    (R) => { const s = R.pick(AS2); const tiles = ['The', s[0], s[2], s[3], ...s[4].split(' ')]; tiles[tiles.length - 1] += '.';
      return { type: 'order', key: 'ao2:' + s[0] + s[2] + s[3], prompt: { fr: 'Remets les mots dans l\'ordre.', en: 'Put the words in order.' }, tiles, joiner: ' ' }; },
  ],
  3: [
    (R) => { const c = R.pick(CMP); return mc('c3:' + c[0], P.fill, c[2], [c[1], c[0], 'more ' + c[0], 'most ' + c[0]], { stimulus: { text: c[4] }, cols: 2 }); },
    (R) => { const c = R.pick(CMP); return mc('c3e:' + c[0], P.fill, c[1], [c[2], c[0], 'more ' + c[0], c[0] + 'er'].filter((x) => x !== c[1]), { stimulus: { text: c[3] }, cols: 2 }); },
    (R) => { const c = R.pick(CMP); const sup = R.chance(0.5); const right = sup ? c[2] : c[1];
      return mc('c3w:' + c[0] + sup, { fr: `Quel mot est bien écrit? (${sup ? 'le plus' : 'plus que'})`, en: `Which is spelled correctly? (${sup ? 'the most' : 'more than'})` }, right,
        cmpPick(R, c, right, 3, [sup ? c[1] : c[2]]), { stimulus: { text: c[0] + (sup ? '  →  -est' : '  →  -er') }, cols: 2 }); },
    (R) => { const s = R.pick(AS2); const text = `The ${s[0]} ${s[2]} ${s[3]} ${s[4]}.`; const ws = [s[0], s[2]];
      return mc('a3:' + s[0] + s[3], { fr: 'Combien de mots décrivent le nom?', en: 'How many describing words are in the sentence?' }, '2', ['1', '3', '0'], { stimulus: { text }, cols: 4 }); },
  ],
};

// ---------- e29 Pronouns ----------
// [noun phrase, subject pronoun, object pronoun, possessive]
const PN = [
  ['Max', 'he', 'him', 'his'], ['Mia', 'she', 'her', 'her'], ['The dog', 'it', 'it', 'its'], ['The kids', 'they', 'them', 'their'], ['Mia and Max', 'they', 'them', 'their'],
  ['Mom', 'she', 'her', 'her'], ['Dad', 'he', 'him', 'his'], ['My cats', 'they', 'them', 'their'], ['Grandpa', 'he', 'him', 'his'], ['Ms. Lee', 'she', 'her', 'her'],
  ['My brother', 'he', 'him', 'his'], ['The ducks', 'they', 'them', 'their'], ['Grandma', 'she', 'her', 'her'], ['The snow', 'it', 'it', 'its'], ['Mr. Roy', 'he', 'him', 'his'],
];
const SUBJF = ['___ arrived late.', '___ won the game.', '___ ate lunch.', '___ went home.', '___ left early.', '___ laughed a lot.'];
const OBJF = ['I saw ___ at the park.', 'Mom called ___ last night.', 'The teacher helped ___.', 'Please give the book to ___.', 'We waited for ___.', 'I sat next to ___.'];
const POSF = ['This is ___ backpack.', 'That is ___ toque.', 'I found ___ red mitten.', 'I like ___ new bike.'];
const mid = (f, n) => f.replace('___', f.startsWith('___') ? n : /^(The|My) /.test(n) ? n[0].toLowerCase() + n.slice(1) : n);
const posName = (n) => (n.endsWith('s') ? n + '\'' : n + '\'s');
const PEM = [['👧', 'she'], ['👦', 'he'], ['🐶', 'it'], ['👩', 'she'], ['👨', 'he'], ['👵', 'she'], ['👴', 'he'], ['🐟', 'it'], ['👨‍👩‍👧', 'they'], ['🚗', 'it'], ['🌞', 'it'], ['👭', 'they'], ['🐱', 'it'], ['🦆', 'it']];
const PRO_S = ['he', 'she', 'it', 'they'], PRO_O = ['him', 'her', 'it', 'them'], PRO_P = ['his', 'her', 'its', 'their'];
// wrong pronouns of the right family that cannot refer to this noun
const wrongPro = (R, p, pool, n, extra = []) => {
  const bad = p[1] === 'it' ? ['he', 'she', 'him', 'her', 'his'] : p[1] === 'they' ? ['it', 'its'] : ['it', 'its'];
  const okp = [...pool, ...extra].filter((x) => x !== p[1] && x !== p[2] && x !== p[3] && !bad.includes(x));
  return R.sample([...new Set(okp)], Math.min(n, new Set(okp).size));
};
const IME = [
  ['Max and ___ went skating.', 'I', 'me'], ['Mom gave ___ a hug.', 'me', 'I'], ['Dad drove Mia and ___ to school.', 'me', 'I'], ['Emma and ___ built a snowman.', 'I', 'me'],
  ['The teacher helped Noah and ___.', 'me', 'I'], ['Ben and ___ love pizza.', 'I', 'me'], ['Grandma called ___ on Sunday.', 'me', 'I'], ['___ am seven years old.', 'I', 'Me'],
  ['Come with ___ to the park.', 'me', 'I'], ['My sister and ___ share a room.', 'I', 'me'], ['Mia sat next to ___.', 'me', 'I'], ['Zoe and ___ are in grade two.', 'I', 'me'],
  ['Dad took Max and ___ to the rink.', 'me', 'I'], ['Liam and ___ made a fort.', 'I', 'me'], ['The coach cheered for Sam and ___.', 'me', 'I'], ['Noah and ___ rode our bikes.', 'I', 'me'],
];
const repl = (n) => ({ fr: `Quel mot peut remplacer « ${n} »?`, en: `Which word can take the place of “${n}”?` });
const e29Gens = {
  1: [
    (R) => { const p = R.pick(PN); const f = R.pick(SUBJF); const text = mid(f, p[0]);
      return mc('pn1:' + p[0] + f, repl(p[0]), cap(p[1]), wrongPro(R, p, PRO_S, 2).map(cap), { stimulus: { text }, say: say(text), cols: 3 }); },
    (R) => { const [e, w] = R.pick(PEM); const pp = { they: ['he', 'she', 'it'], it: ['he', 'she', 'they'], she: ['he', 'it', 'they'], he: ['she', 'it', 'they'] };
      return mc('pe1:' + e, { fr: 'Regarde. Quel mot peut nommer l\'image?', en: 'Look. Which word can name the picture?' }, w, R.sample(pp[w], 2), { stimulus: { emoji: e }, cols: 3 }); },
  ],
  2: [
    (R) => { const p = R.pick(PN); const f = R.pick(OBJF); const text = mid(f, p[0]);
      return mc('po2:' + p[0] + f, repl(p[0]), p[2], wrongPro(R, p, PRO_O, 2, [p[1]]), { stimulus: { text }, cols: 3 }); },
    (R) => { const p = R.pick(PN); const f = R.pick(SUBJF); const text = mid(f, p[0]);
      return mc('ps2:' + p[0] + f, repl(p[0]), cap(p[1]), [cap(p[2]), ...wrongPro(R, p, PRO_S, 1).map(cap)].filter((x) => x !== cap(p[1])), { stimulus: { text }, cols: 3 }); },
    (R) => { const p = R.pick(PN); const f = R.pick(POSF); const text = mid(f, posName(p[0]));
      return mc('pp2:' + p[0] + f, repl(posName(p[0])), p[3], wrongPro(R, p, PRO_P, 2), { stimulus: { text }, cols: 3 }); },
  ],
  3: [
    (R) => { const s = R.pick(IME); return mc('im3:' + s[0], P.fill, s[1], [s[2]], { stimulus: { text: s[0] }, cols: 2 }); },
    (R) => { const s = R.pick(IME); const right = s[0].replace('___', s[1]); return mc('imc3:' + s[0], P.correct, right, [s[0].replace('___', s[2])], { cols: 1 }); },
    (R) => { const p = R.pick(PN); const f = R.pick(OBJF); const text = mid(f, p[0]);
      return mc('po3:' + p[0] + f, repl(p[0]), p[2], wrongPro(R, p, [...PRO_O, ...PRO_P], 3, [p[1]]), { stimulus: { text }, cols: 2 }); },
    (R) => { const p = R.pick(PN); const f = R.pick(POSF); const text = mid(f, posName(p[0]));
      return mc('pp3:' + p[0] + f, repl(posName(p[0])), p[3], wrongPro(R, p, [...PRO_P, ...PRO_O], 3, [p[1]]), { stimulus: { text }, cols: 2 }); },
  ],
};

// ---------- e30 Build a sentence ----------
const BS1 = ['The dog barks.', 'I like pizza.', 'Birds can fly.', 'We play outside.', 'The sun is hot.', 'My cat sleeps.', 'I see a moose.', 'The snow is cold.',
  'Dad makes pancakes.', 'We eat lunch.', 'The baby smiles.', 'She reads a book.', 'He kicks the ball.', 'I wear a toque.', 'Frogs jump high.', 'The bus is yellow.',
  'Mom drives the car.', 'I love hockey.', 'The boy runs fast.', 'My friend sings.', 'The moon is bright.', 'We skate on ice.', 'The cow says moo.', 'I draw a flower.',
  'Ducks swim in water.', 'The cake is sweet.', 'I have a sled.', 'The bear is big.', 'We go home.', 'My dad is tall.', 'The bird sings.', 'I drink milk.',
  'Rain falls down.', 'The girl laughs.', 'I ride my bike.', 'It is snowing.', 'Fish live in water.', 'I like maple syrup.', 'The lake is frozen.', 'Our teacher is kind.', 'The sky is blue.', 'Snow is white.', 'We read books.', 'My toque is warm.', 'The owl hoots at night.'];
const BS2 = ['My friend has a red bike.', 'We go to the park after school.', 'The little bird sings in the tree.', 'I put on my warm boots.', 'Mom bakes cookies on Sunday.',
  'The farmer feeds his cows.', 'My sister plays hockey every Saturday.', 'We saw a big moose near Lake Louise.', 'The snow fell all night long.', 'I brush my teeth before bed.',
  'The kids build a snowman outside.', 'Grandma knits a warm toque for me.', 'Our class visits the library today.', 'The puppy chews on a small stick.', 'I keep my loonie safe.',
  'The sun rises over the hills.', 'My brother reads a funny story.', 'We eat pancakes with maple syrup.', 'The duck swims across the pond.', 'Dad drives us to school.',
  'The boy kicks the ball very far.', 'A beaver builds a dam.', 'I like to skate on the rink.', 'The red bus stops at my corner.', 'She wears a yellow raincoat.',
  'My cat sleeps on the soft blanket.', 'We plant seeds in the garden.', 'The teacher reads us a story.', 'He shoots the puck into the net.', 'I help Dad shovel the snow.',
  'The leaves turn red in the fall.', 'Our dog waits at the door.', 'My friend lives on Maple Street.', 'The baby laughs at the funny face.', 'We watch the stars at night.',
  'I draw pictures for Mom.', 'The goalie stops the puck.', 'The wind blows the leaves away.', 'A squirrel hides nuts in the grass.', 'We sing a song at school.', 'The turtle walks very slowly.', 'My mom bakes bread on Sunday.', 'I hear the bell ring.', 'The goalie wears big pads.', 'The firefighters ride in a big truck.'];
const BS3 = ['Can we play hockey at recess?', 'What is your favourite colour?', 'Where did you put my toque?', 'The children ran across the snowy field.', 'My neighbour has a fluffy cat.',
  'Do you want to build a snowman with me?', 'After school we skate on the frozen pond.', 'The brave firefighter climbed up the tall ladder.', 'Why is the sky red at sunset?',
  'How many loonies are in the jar?', 'We found a tiny frog under rocks.', 'On Canada Day we watch the fireworks.', 'Please put your boots away.', 'Last summer we swam in the lake every day.',
  'Wow, that is the biggest moose I have ever seen!', 'My grandma makes the best maple pancakes.', 'When does the bus come to school?', 'The little girl hugged her puppy tightly.',
  'I can see my breath in cold air.', 'Our class is going to the museum on Friday.', 'The hungry bear walked slowly through the forest.', 'Who left mittens on the bench?',
  'We drink hot chocolate after we shovel snow.', 'The teacher gave us a new book to read.', 'Look at the beautiful rainbow!', 'My brother and I are making a fort.',
  'The tired puppy fell asleep on the sofa.', 'Is it going to snow tomorrow?', 'The farmer drives his tractor across fields.', 'I like to read before I go to sleep.',
  'There is a snow day, so we can sleep in!', 'Can you help me find my other boot?', 'The squirrel climbed up the tall maple tree.', 'We cheered loudly when our team scored.',
  'My mom packs a healthy snack for recess.', 'The ice on the pond is thick enough to skate.', 'Which animal is the fastest runner?', 'He carefully carried the full glass of milk.',
  'The geese fly south when it gets cold.', 'We are lucky to live in a beautiful country!', 'Is your lunch ready yet?', 'I am happy to see you!', 'The loud bell rings at noon.', 'Can I borrow your pencil, please?'];
const wrongSent = (s) => { const end = s.slice(-1); const body = s.slice(0, -1);
  return [s[0].toLowerCase() + s.slice(1), body, s[0].toLowerCase() + body.slice(1)]; };
const bsOrder = (id, pool, prompt) => (R) => { const s = R.pick(pool); const tiles = s.split(' ');
  return { type: 'order', key: id + s, prompt, say: say(s), tiles, joiner: ' ' }; };
const POR = { fr: 'Écoute. Remets les mots dans l\'ordre pour faire une phrase.', en: 'Listen. Put the words in order to make a sentence.' };
const bsCorrect = (id, pool) => (R) => { const s = R.pick(pool); return mc(id + s, { fr: 'Quelle phrase est bien écrite? (majuscule et ponctuation)', en: 'Which sentence is written correctly? (capital letter and end mark)' }, s, wrongSent(s), { cols: 1 }); };
const e30Gens = {
  1: [bsOrder('b1:', BS1, POR), bsCorrect('bc1:', BS1)],
  2: [bsOrder('b2:', BS2, POR), bsCorrect('bc2:', BS2)],
  3: [bsOrder('b3:', BS3, POR), bsCorrect('bc3:', BS3)],
};

// ---------- e31 Telling, asking, exclaiming; sentence vs fragment ----------
const TELL = ['I like soup', 'The dog is brown', 'We play hockey on Saturday', 'My mom works at the library', 'The bus comes at eight', 'It is snowing outside',
  'Dad makes pancakes', 'The moose lives in the forest', 'I have a new toque', 'Our teacher reads a story', 'The lake is frozen', 'My sister is seven',
  'We eat lunch at noon', 'The baby sleeps in her crib', 'I walk to school', 'The sun is yellow', 'Grandma lives in Halifax', 'The cat drinks milk', 'We have gym on Tuesday',
  'The leaves fall in autumn', 'I brush my teeth every night', 'Beavers build dams', 'My boots are by the door', 'The store opens at nine', 'He has a red bike'];
const ASKS = ['Do you like soup', 'Where is my toque', 'What time is it', 'Can I have a cookie', 'Who is at the door', 'Why is the sky blue', 'How old are you', 'Is it snowing',
  'Are we going skating', 'When does the bus come', 'Which book do you like', 'Can you help me', 'Where do you live', 'What is your name', 'Do you have a pencil', 'How many loonies do you have',
  'Is this your mitten', 'Who wants a snack', 'What did you eat for lunch', 'Will it rain tomorrow', 'Can we play outside', 'Where are my boots', 'Did you see the moose', 'Is your sister home', 'Why are you laughing'];
const EXCL = ['Wow, that is huge', 'What a big snowman', 'Look out', 'Happy birthday', 'Hurray, it is a snow day',
  'Ouch, that hurts', 'What a beautiful rainbow', 'Watch out for the ice', 'Oh no, I dropped my ice cream', 'Great job', 'What a loud noise', 'Yay, we scored a goal'];
const FRAG = [ // [complete, fragment]
  ['The dog barks loudly.', 'The big brown dog.'], ['My friend plays hockey.', 'My friend and her'], ['I eat lunch at noon.', 'Lunch at noon.'], ['The bird sings a song.', 'The little bird in the tree.'],
  ['We go to the park.', 'To the park.'], ['Mom drives the bus.', 'Drives the bus.'], ['The snow is cold.', 'The cold white snow.'], ['I like to skate.', 'Like to skate.'],
  ['The cat sleeps all day.', 'The fluffy cat.'], ['Dad cooks dinner.', 'Dad and my uncle.'], ['The boy kicks the ball.', 'The boy with the red hat.'], ['She reads a book.', 'Reads a book at night.'],
  ['The moose walks slowly.', 'Walks slowly through the forest.'], ['We build a snowman.', 'Because we build'], ['The baby laughs.', 'The baby in the blue blanket.'], ['I wear my toque.', 'My warm toque.'],
  ['Our class visits the zoo.', 'Our class at the zoo.'], ['The frog jumps in the pond.', 'In the pond.'], ['Grandpa tells a funny joke.', 'A funny joke.'], ['The teacher helps us.', 'The kind teacher.'],
  ['My brother has a new sled.', 'A new sled for my brother.'], ['The sun shines.', 'The warm, bright sun.'], ['We sing a song.', 'A song about winter.'], ['I see a moose.', 'A big moose.'],
  ['The firefighters save the cat.', 'The cat on the roof.'],
];
const KIND = { '.': 'telling sentence', '?': 'asking sentence', '!': 'exclaiming sentence' };
const KINDF = { '.': 'phrase qui RACONTE', '?': 'phrase qui DEMANDE', '!': 'phrase qui EXCLAME' };
const ALLS = [...TELL.map((s) => [s, '.']), ...ASKS.map((s) => [s, '?']), ...EXCL.map((s) => [s, '!'])];
const QW = ['Who', 'What', 'Where', 'When', 'Why', 'How', 'Which', 'Do', 'Can', 'Is', 'Are', 'Did', 'Will'];
const e31Gens = {
  1: [
    (R) => { const [s, m] = R.pick(ALLS); return mc('m1:' + s, { fr: 'Quel signe termine la phrase?', en: 'Which end mark finishes the sentence?' }, m, rest(['.', '?', '!'], m), { stimulus: { text: s + ' ___' }, say: say(s), cols: 3 }); },
    (R) => { const [s, m] = R.pick(ALLS); return mc('mk1:' + s, { fr: 'Cette phrase est… ?', en: 'This sentence is…?' }, m === '.' ? 'telling' : m === '?' ? 'asking' : 'exclaiming', rest(['telling', 'asking', 'exclaiming'], m === '.' ? 'telling' : m === '?' ? 'asking' : 'exclaiming'), { stimulus: { text: s + m }, say: say(s + m), cols: 3 }); },
    (R) => { const t = R.pick(TELL), a = R.pick(ASKS); return mc('q1:' + a, { fr: 'Quelle phrase POSE UNE QUESTION?', en: 'Which sentence ASKS a question?' }, a + '?', [t + '.', R.pick(EXCL) + '!'], { cols: 1 }); },
  ],
  2: [
    (R) => { const f = R.pick(FRAG); const g = R.pick(FRAG); return mc('f2:' + f[0], { fr: 'Quelle est une phrase COMPLÈTE?', en: 'Which one is a COMPLETE sentence?' }, f[0], [f[1], g[1]], { cols: 1 }); },
    (R) => { const f = R.pick(FRAG); return mc('f2n:' + f[1], { fr: 'Est-ce une phrase complète?', en: 'Is this a complete sentence?' }, 'No, it is a fragment', ['Yes, it is a sentence'], { stimulus: { text: f[1] }, cols: 1 }); },
    (R) => { const [s, m] = R.pick(ALLS); const k = KIND[m];
      return mc('k2:' + s, { fr: 'Quel genre de phrase est-ce?', en: 'What kind of sentence is this?' }, k, rest(Object.values(KIND), k), { stimulus: { text: s + m }, say: say(s + m), cols: 1 }); },
    (R) => { const [s, m] = R.pick(ALLS); return mc('m2:' + s, { fr: 'Quel signe termine la phrase?', en: 'Which end mark finishes the sentence?' }, m, rest(['.', '?', '!', ','], m), { stimulus: { text: s + ' ___' }, cols: 4 }); },
  ],
  3: [
    (R) => { const a = R.pick(ASKS); return mc('q3:' + a, { fr: 'Quelle phrase POSE UNE QUESTION?', en: 'Which sentence ASKS a question?' }, a, [R.pick(TELL), R.pick(EXCL)], { cols: 1 }); },
    (R) => { const a = R.pick(ASKS); const w = a.split(' ')[0]; return mc('qw3:' + a, { fr: 'Quel mot commence cette question?', en: 'Which word starts this question?' }, w, R.sample(rest(QW, w), 3), { stimulus: { text: a + '?' }, cols: 4 }); },
    (R) => { const g = [R.sample(TELL, 2), R.sample(ASKS, 2), R.sample(EXCL, 2)];
      return { type: 'sort', key: 'k3:' + g.flat().sort().join('|'), prompt: { fr: 'Place chaque phrase dans la bonne boîte.', en: 'Put each sentence in the right box.' },
        bins: [{ text: 'Telling .', emoji: '💬' }, { text: 'Asking ?', emoji: '❓' }, { text: 'Exclaiming !', emoji: '❗' }],
        items: g.flatMap((a, i) => a.map((s) => ({ text: s + ['.', '?', '!'][i], bin: i }))) }; },
    (R) => { const e = R.pick(EXCL); return mc('x3:' + e, { fr: 'Quelle phrase EXCLAME (forte émotion)?', en: 'Which sentence EXCLAIMS (a strong feeling)?' }, e + '!', [R.pick(TELL) + '.', R.pick(ASKS) + '?'], { cols: 1 }); },
    (R) => { const [s, m] = R.pick(ALLS); const g = R.sample(FRAG, 2);
      return mc('fr3:' + s, { fr: 'Quel groupe de mots est une phrase complète?', en: 'Which group of words is a complete sentence?' }, s + m, g.map((x) => x[1]), { cols: 1 }); },
  ],
};

// ---------- e32 Contractions & compound words ----------
// [two words, contraction, sentence with blank]
const CT = [
  ['can not', 'can\'t', 'I ___ reach the top shelf.'], ['do not', 'don\'t', 'We ___ have school on Saturday.'], ['does not', 'doesn\'t', 'My dog ___ like baths.'],
  ['is not', 'isn\'t', 'The soup ___ hot.'], ['are not', 'aren\'t', 'The boots ___ dry.'], ['was not', 'wasn\'t', 'He ___ home yesterday.'], ['were not', 'weren\'t', 'The kids ___ late.'],
  ['will not', 'won\'t', 'I ___ forget my toque.'], ['did not', 'didn\'t', 'She ___ see the moose.'], ['it is', 'it\'s', 'I think ___ going to snow.'], ['he is', 'he\'s', 'I think ___ at the rink.'],
  ['she is', 'she\'s', 'Mia says ___ ready.'], ['that is', 'that\'s', 'I know ___ a moose.'], ['I am', 'I\'m', 'Today ___ seven years old.'], ['I will', 'I\'ll', 'Tomorrow ___ bring my skates.'],
  ['you are', 'you\'re', 'Mom says ___ my best friend.'], ['we are', 'we\'re', 'Today ___ going skating.'], ['they are', 'they\'re', 'I think ___ at the park.'], ['let us', 'let\'s', 'Come on, ___ play outside!'],
  ['I have', 'I\'ve', 'Look what ___ got!'], ['we will', 'we\'ll', 'Later ___ eat dinner.'], ['what is', 'what\'s', 'Tell me ___ in the box.'], ['there is', 'there\'s', 'I see ___ a moose by the lake.'],
  ['have not', 'haven\'t', 'We ___ finished our snack.'], ['could not', 'couldn\'t', 'I ___ find my mitten.'], ['would not', 'wouldn\'t', 'The cat ___ come down.'],
  ['should not', 'shouldn\'t', 'You ___ run on the ice.'], ['you will', 'you\'ll', 'I think ___ love this game.'], ['we have', 'we\'ve', 'I think ___ made a mess.'],
  ['who is', 'who\'s', 'Do you know ___ at the door?'], ['here is', 'here\'s', 'Look, ___ my new toque.'], ['has not', 'hasn\'t', 'Dad ___ come home yet.'], ['they will', 'they\'ll', 'I hope ___ come to my party.'],
];
const CTFULL = CT.map((x) => x[0]);
const badCt = (c) => { const i = c.indexOf('\''); const no = c.replace('\'', ''); return [...new Set([no, c.slice(0, i - 1) + '\'' + c[i - 1] + c.slice(i + 1), no + '\''])]; };
// [compound, part 1, part 2, emoji?]
const CW = [
  ['sunflower', 'sun', 'flower', '🌻'], ['rainbow', 'rain', 'bow', '🌈'], ['snowman', 'snow', 'man', '⛄'], ['football', 'foot', 'ball', '🏈'], ['basketball', 'basket', 'ball', '🏀'],
  ['baseball', 'base', 'ball', '⚾'], ['cupcake', 'cup', 'cake', '🧁'], ['pancake', 'pan', 'cake', '🥞'], ['butterfly', 'butter', 'fly', '🦋'], ['doorbell', 'door', 'bell', '🔔'],
  ['playground', 'play', 'ground', '🛝'], ['notebook', 'note', 'book', '📓'], ['backpack', 'back', 'pack', '🎒'], ['popcorn', 'pop', 'corn', '🍿'], ['goldfish', 'gold', 'fish', '🐠'],
  ['sailboat', 'sail', 'boat', '⛵'], ['airplane', 'air', 'plane', '✈️'], ['mailbox', 'mail', 'box', '📫'], ['toothbrush', 'tooth', 'brush', '🪥'], ['lunchbox', 'lunch', 'box', '🍱'],
  ['snowflake', 'snow', 'flake', '❄️'], ['sunglasses', 'sun', 'glasses', '🕶️'], ['seashell', 'sea', 'shell', '🐚'], ['cowboy', 'cow', 'boy', '🤠'], ['ladybug', 'lady', 'bug', '🐞'],
  ['honeybee', 'honey', 'bee', '🐝'], ['bathtub', 'bath', 'tub', '🛁'],
  ['bedroom', 'bed', 'room'], ['bathroom', 'bath', 'room'], ['birthday', 'birth', 'day'], ['homework', 'home', 'work'], ['sandbox', 'sand', 'box'], ['snowshoe', 'snow', 'shoe'],
  ['starfish', 'star', 'fish'], ['haircut', 'hair', 'cut'], ['outside', 'out', 'side'], ['inside', 'in', 'side'], ['sidewalk', 'side', 'walk'], ['raincoat', 'rain', 'coat'],
  ['moonlight', 'moon', 'light'], ['sunshine', 'sun', 'shine'], ['bedtime', 'bed', 'time'], ['playtime', 'play', 'time'], ['firefly', 'fire', 'fly'], ['hotdog', 'hot', 'dog'],
  ['keyboard', 'key', 'board'], ['classroom', 'class', 'room'], ['bluebird', 'blue', 'bird'], ['upstairs', 'up', 'stairs'], ['fishbowl', 'fish', 'bowl'], ['jellyfish', 'jelly', 'fish'],
  ['snowball', 'snow', 'ball'], ['bookshelf', 'book', 'shelf'], ['grandmother', 'grand', 'mother'], ['weekend', 'week', 'end'], ['daytime', 'day', 'time'],
];
const NC = 'happy apple table tiger river lemon candy cookie garden monkey bottle jacket kitten pillow butter paper sugar pizza orange banana tomato soccer hockey ticket school'.split(' ');
const CWE = CW.filter((x) => x[3]);
const cmpMC = (R, c, n) => { const o = R.sample(CW.filter((x) => x !== c), 8); const w = [];
  for (const x of o) { w.push(R.chance(0.5) ? `${c[1]} + ${x[2]}` : `${x[1]} + ${c[2]}`); }
  return [...new Set(w)].filter((x) => x !== `${c[1]} + ${c[2]}`).slice(0, n); };
const e32Gens = {
  1: [
    (R) => { const c = R.pick(CT); return mc('c1:' + c[0], { fr: `Quelle contraction veut dire « ${c[0]} »?`, en: `Which short word means “${c[0]}”?` }, c[1], R.sample(CT.filter((x) => x !== c).map((x) => x[1]), 2), { say: say(c[0]), speak: true, cols: 3 }); },
    (R) => { const c = R.pick(CT); return mc('c1r:' + c[1], { fr: `« ${c[1]} » veut dire quoi?`, en: `What two words make “${c[1]}”?` }, c[0], R.sample(CT.filter((x) => x !== c).map((x) => x[0]), 2), { say: say(c[1]), stimulus: { text: c[1] }, cols: 3 }); },
    (R) => { const c = R.pick(CWE); return { type: 'order', key: 'w1:' + c[0], prompt: { fr: 'Assemble les deux mots pour faire un nouveau mot.', en: 'Put the two words together to make a new word.' }, say: say(c[0]), stimulus: { emoji: c[3] }, tiles: [c[1], c[2]], joiner: '' }; },
    (R) => { const c = R.pick(CW); return mc('wc1:' + c[0], { fr: 'Quel mot est un MOT COMPOSÉ (deux petits mots)?', en: 'Which word is a COMPOUND word (two small words)?' }, c[0], R.sample(NC, 2), { speak: true, cols: 3 }); },
  ],
  2: [
    (R) => { const c = R.pick(CT); return mc('f2:' + c[0], P.fill, c[1], badCt(c[1]).slice(0, 2), { stimulus: { text: c[2] }, cols: 3 }); },
    (R) => { const c = R.pick(CW); return mc('s2:' + c[0], { fr: `Quels deux mots forment « ${c[0]} »?`, en: `Which two words make “${c[0]}”?` }, `${c[1]} + ${c[2]}`, cmpMC(R, c, 2), { say: say(c[0]), ...(c[3] ? { stimulus: { emoji: c[3] } } : {}), cols: 1 }); },
    (R) => { const a = R.sample(CW, 3).map((x) => x[0]), b = R.sample(NC, 3);
      return wordSort('sc2:' + [...a, ...b].sort().join('|'), { fr: 'Mot composé ou non?', en: 'Compound word or not?' }, [{ text: 'Compound word', emoji: '🧩' }, { text: 'Not a compound word', emoji: '🔤' }], [a, b]); },
    (R) => { const c = R.pick(CT); return mc('c2r:' + c[1], { fr: `« ${c[1]} » veut dire quoi?`, en: `What two words make “${c[1]}”?` }, c[0], R.sample(CTFULL.filter((x) => x !== c[0] && x.split(' ')[1] === c[0].split(' ')[1]).concat(R.sample(CTFULL, 3)).filter((x) => x !== c[0]), 2), { stimulus: { text: c[1] }, cols: 3 }); },
  ],
  3: [
    (R) => { const c = R.pick(CT); return mc('f3:' + c[0], P.fill, c[1], badCt(c[1]).concat([c[0].replace(' ', '')]).slice(0, 3), { stimulus: { text: c[2] }, cols: 2 }); },
    (R) => { const c = R.pick(CT); const pool = CTFULL.filter((x) => x !== c[0]); const sim = pool.filter((x) => x.split(' ')[1] === c[0].split(' ')[1] || x.split(' ')[0] === c[0].split(' ')[0]);
      return mc('c3r:' + c[1], { fr: `« ${c[1]} » veut dire quoi?`, en: `What two words make “${c[1]}”?` }, c[0], R.sample([...new Set([...sim, ...R.sample(pool, 3)])], 3), { stimulus: { text: c[1] }, cols: 2 }); },
    (R) => { const g = R.sample(CW, 3).map((x) => x[0]); const n = R.pick(NC); return mc('wn3:' + [...g, n].sort().join('|'), { fr: 'Quel mot N\'est PAS un mot composé?', en: 'Which word is NOT a compound word?' }, n, g, { speak: true, cols: 2 }); },
    (R) => { const a = R.sample(CT, 3).map((x) => x[1]), b = R.sample(CW, 3).map((x) => x[0]);
      return wordSort('sm3:' + [...a, ...b].sort().join('|'), { fr: 'Contraction ou mot composé?', en: 'Contraction or compound word?' }, [{ text: 'Contraction', emoji: '✂️' }, { text: 'Compound word', emoji: '🧩' }], [a, b]); },
    (R) => { const items = [['The dog wagged ___ tail.', 'its', ['it\'s']], ['I think ___ going to rain.', 'it\'s', ['its']], ['Mom says ___ my best friend.', 'you\'re', ['your']], ['Is this ___ toque?', 'your', ['you\'re']],
      ['I know ___ a good team.', 'they\'re', ['their', 'there']], ['The kids lost ___ mittens.', 'their', ['there', 'they\'re']], ['Put the box over ___.', 'there', ['their', 'they\'re']], ['The cat licked ___ paw.', 'its', ['it\'s']],
      ['I hope ___ coming to my party.', 'you\'re', ['your']], ['Is ___ any milk left?', 'there', ['their', 'they\'re']]]; const x = R.pick(items);
      return mc('tb3:' + x[0], P.fill, x[1], x[2], { stimulus: { text: x[0] }, cols: 3 }); },
  ],
};

// ---------- e33 Synonyms, antonyms & homophones ----------
const SYN = [['big', 'large'], ['small', 'tiny'], ['happy', 'glad'], ['sad', 'unhappy'], ['fast', 'quick'], ['begin', 'start'], ['end', 'finish'], ['pretty', 'beautiful'], ['mad', 'angry'],
  ['rock', 'stone'], ['hard', 'difficult'], ['smart', 'clever'], ['loud', 'noisy'], ['shout', 'yell'], ['kid', 'child'], ['tired', 'sleepy'], ['cold', 'chilly'], ['jump', 'leap'],
  ['house', 'home'], ['sofa', 'couch'], ['pal', 'friend'], ['bike', 'bicycle'], ['huge', 'giant'], ['glad', 'pleased']].filter((x, i, a) => true);
const ANT = [['hot', 'cold'], ['up', 'down'], ['big', 'small'], ['fast', 'slow'], ['happy', 'sad'], ['day', 'night'], ['open', 'close'], ['full', 'empty'], ['hard', 'soft'], ['old', 'new'],
  ['wet', 'dry'], ['light', 'dark'], ['in', 'out'], ['push', 'pull'], ['loud', 'quiet'], ['clean', 'dirty'], ['early', 'late'], ['near', 'far'], ['tall', 'short'], ['thick', 'thin'],
  ['give', 'take'], ['laugh', 'cry'], ['come', 'go'], ['first', 'last'], ['wide', 'narrow'], ['top', 'bottom'], ['love', 'hate'], ['win', 'lose'], ['buy', 'sell'], ['asleep', 'awake'], ['sunny', 'cloudy'], ['young', 'old2']]
  .filter((x) => x[1] !== 'old2');
const DIS = 'apple door blue table sing cloud book spoon tree snow pencil window farm river soup cookie mitten banana truck'.split(' ');
const GROUPS = [['big', 'large', 'huge', 'giant'], ['small', 'tiny', 'little', 'mini'], ['happy', 'glad', 'pleased', 'joyful'], ['fast', 'quick', 'speedy', 'rapid'],
  ['mad', 'angry', 'upset', 'furious'], ['smart', 'clever', 'bright', 'wise'], ['loud', 'noisy', 'booming', 'thunderous'], ['pretty', 'beautiful', 'lovely', 'gorgeous']];
const HOM = [
  ['I can ___ the moose across the lake.', 'see', ['sea']], ['We swim in the ___.', 'sea', ['see']], ['I have ___ pencils.', 'two', ['to', 'too']], ['I want a cookie ___.', 'too', ['to', 'two']],
  ['We go ___ the park.', 'to', ['too', 'two']], ['She ___ the answer.', 'knows', ['nose']], ['There is ___ school on Sunday.', 'no', ['know']], ['We ___ the hockey game!', 'won', ['one']],
  ['I have ___ sister.', 'one', ['won']], ['A ___ makes honey.', 'bee', ['be']], ['I want to ___ a firefighter.', 'be', ['bee']], ['I can ___ the birds singing.', 'hear', ['here']],
  ['Come ___ and sit by me.', 'here', ['hear']], ['The kids put ___ boots by the door.', 'their', ['there', 'they\'re']], ['Look over ___!', 'there', ['their', 'they\'re']],
  ['I ___ my name on the paper.', 'write', ['right']], ['Turn ___ at the corner.', 'right', ['write']], ['I ___ a big sandwich.', 'ate', ['eight']], ['My cousin is ___ years old.', 'eight', ['ate']],
  ['The sky is ___.', 'blue', ['blew']], ['The wind ___ my hat away.', 'blew', ['blue']], ['I want to ___ a new toque.', 'buy', ['by']], ['The house is ___ the lake.', 'by', ['buy']],
  ['This gift is ___ you.', 'for', ['four']], ['I see ___ ducks.', 'four', ['for']], ['The kite is ___ in the sky.', 'high', ['hi']], ['I said ___ to my friend.', 'hi', ['high']],
  ['I have a ___ toque.', 'new', ['knew']], ['She ___ the song by heart.', 'knew', ['new']], ['I like to eat ___.', 'meat', ['meet']], ['Nice to ___ you.', 'meet', ['meat']],
  ['I ate a juicy ___.', 'pear', ['pair']], ['I need a ___ of mittens.', 'pair', ['pear']], ['I fill the ___ with sand.', 'pail', ['pale']], ['The ghost is ___.', 'pale', ['pail']],
  ['The ___ flies high.', 'plane', ['plain']], ['I eat ___ toast.', 'plain', ['plane']], ['My toque is ___.', 'red', ['read']], ['I ___ a book every night.', 'read', ['red']],
  ['We ___ the boat on the lake.', 'sail', ['sale']], ['The store has a toque ___.', 'sale', ['sail']], ['The ___ is hot.', 'sun', ['son']], ['Mr. Roy has one ___.', 'son', ['sun']],
  ['The dog wags its ___.', 'tail', ['tale']], ['Grandma tells a fairy ___.', 'tale', ['tail']], ['Please ___ for me.', 'wait', ['weight']], ['The ___ of the box is heavy.', 'weight', ['wait']],
  ['There are seven days in a ___.', 'week', ['weak']], ['The baby bird is ___.', 'weak', ['week']], ['The table is made of ___.', 'wood', ['would']], ['I ___ like some milk.', 'would', ['wood']],
  ['A ___ sleeps in winter.', 'bear', ['bare']], ['I walk with ___ feet.', 'bare', ['bear']], ['A ___ eats grass.', 'deer', ['dear']], ['My ___ friend is nice.', 'dear', ['deer']],
  ['A ___ grows in the garden.', 'flower', ['flour']], ['We bake with ___.', 'flour', ['flower']], ['I brush my ___.', 'hair', ['hare']], ['A ___ is like a big rabbit.', 'hare', ['hair']],
  ['One ___ has sixty minutes.', 'hour', ['our']], ['This is ___ house.', 'our', ['hour']], ['The moon shines at ___.', 'night', ['knight']], ['The ___ wears a metal suit.', 'knight', ['night']],
  ['I smell with my ___.', 'nose', ['knows']], ['Do not ___ at people.', 'stare', ['stair']], ['I walk up one ___.', 'stair', ['stare']], ['I hurt my big ___.', 'toe', ['tow']],
  ['Mom ___ a cake.', 'made', ['maid']], ['My ___ lives in Calgary.', 'aunt', ['ant']], ['An ___ is a tiny bug.', 'ant', ['aunt']], ['I am ___ today.', 'bored', ['board']],
  ['Write on the ___.', 'board', ['bored']], ['I dug a ___ in the sand.', 'hole', ['whole']], ['I ate the ___ pizza.', 'whole', ['hole']], ['I want a ___ of cake.', 'piece', ['peace']],
  ['We wish for world ___.', 'peace', ['piece']], ['The dog has four ___.', 'paws', ['pause']], ['We drove on the ___.', 'road', ['rode']], ['I ___ my bike.', 'rode', ['road']],
  ['Can I have ___ water?', 'some', ['sum']], ['I ___ a toque in winter.', 'wear', ['where']], ['The ___ rides a broom.', 'witch', ['which']], ['I eat a red ___.', 'beet', ['beat']],
  ['We ___ the other team.', 'beat', ['beet']], ['I eat a bun and a dinner ___.', 'roll', ['role']],
];
const synOf = (w) => { const r = []; for (const [a, b] of SYN) { if (a === w) r.push(b); if (b === w) r.push(a); } return r; };
const antOf = (w) => { const r = []; for (const [a, b] of ANT) { if (a === w) r.push(b); if (b === w) r.push(a); } return r; };
const SYNQ = SYN.flatMap(([a, b]) => [[a, b], [b, a]]);
const ANTQ = ANT.flatMap(([a, b]) => [[a, b], [b, a]]);
const e33Gens = {
  1: [
    (R) => { const [w, r] = R.pick(SYNQ); return mc('y1:' + w + r, { fr: `Quel mot veut dire la MÊME chose que « ${w} »?`, en: `Which word means the SAME as “${w}”?` }, r, R.sample(DIS, 2), { say: say(w), stimulus: { text: w }, speak: true, cols: 3 }); },
    (R) => { const [w, r] = R.pick(ANTQ); return mc('n1:' + w + r, { fr: `Quel mot est le CONTRAIRE de « ${w} »?`, en: `Which word is the OPPOSITE of “${w}”?` }, r, R.sample(DIS, 2), { say: say(w), stimulus: { text: w }, speak: true, cols: 3 }); },
  ],
  2: [
    (R) => { const h = R.pick(HOM); return mc('h2:' + h[0], P.fill, h[1], h[2], { stimulus: { text: h[0] }, cols: 3 }); },
    (R) => { const same = R.chance(0.5); const [a, b] = same ? R.pick(SYNQ) : R.pick(ANTQ);
      return mc('so2:' + a + b + same, { fr: 'Ces mots veulent dire la même chose ou le contraire?', en: 'Do these words mean the same or the opposite?' }, same ? 'Same' : 'Opposite', [same ? 'Opposite' : 'Same'], { stimulus: { text: `${a}  —  ${b}` }, cols: 2 }); },
    (R) => { const [w, r] = R.pick(SYNQ); const t = antOf(w).filter((x) => x !== r); return mc('y2:' + w + r, { fr: `Quel mot veut dire la MÊME chose que « ${w} »?`, en: `Which word means the SAME as “${w}”?` }, r, [...t.slice(0, 1), ...R.sample(DIS, 2)], { stimulus: { text: w }, speak: true, cols: 3 }); },
    (R) => { const [w, r] = R.pick(ANTQ); const t = synOf(w).filter((x) => x !== r); return mc('n2:' + w + r, { fr: `Quel mot est le CONTRAIRE de « ${w} »?`, en: `Which word is the OPPOSITE of “${w}”?` }, r, [...t.slice(0, 1), ...R.sample(DIS, 2)], { stimulus: { text: w }, speak: true, cols: 3 }); },
  ],
  3: [
    (R) => { const h = R.pick(HOM); const ok = h[0].replace('___', h[1]); return mc('hc3:' + h[0], P.correct, ok, h[2].map((x) => h[0].replace('___', x)), { cols: 1 }); },
    (R) => { const g = R.pick(GROUPS); const three = R.sample(g, 3); const intr = R.pick(R.pick(GROUPS.filter((x) => x !== g)));
      return mc('od3:' + [...three, intr].sort().join('|'), { fr: 'Quel mot n\'a PAS le même sens que les autres?', en: 'Which word does NOT mean the same as the others?' }, intr, three, { speak: true, cols: 2 }); },
    (R) => { const [w, r] = R.pick(SYNQ); const t = antOf(w).filter((x) => x !== r); const others = R.sample(DIS, 3); return mc('y3:' + w + r, { fr: `Quel mot veut dire la MÊME chose que « ${w} »?`, en: `Which word means the SAME as “${w}”?` }, r, [...t.slice(0, 1), ...others].slice(0, 3), { stimulus: { text: w }, cols: 2 }); },
    (R) => { const [w, r] = R.pick(ANTQ); const t = ANTQ.filter(([a]) => a !== w && a !== r).map((x) => x[0]); return mc('n3:' + w + r, { fr: `Quel mot est le CONTRAIRE de « ${w} »?`, en: `Which word is the OPPOSITE of “${w}”?` }, r, R.sample(t, 3), { stimulus: { text: w }, cols: 2 }); },
  ],
};

// ---------- e34 Read & answer ----------
// Passage = [title, text, [[question, right answer, 'wrong|wrong|wrong'], ...]]
const PAS1 = [
  ['Max and Buddy', `Max has a big brown dog. The dog's name is Buddy. Every day, Max and Buddy go to the park. They play with a red ball. Then they go home for a snack.`, [
    ['Who has a dog?', 'Max', 'Mia|Dad|Buddy'], ['What is the dog\'s name?', 'Buddy', 'Max|Ball|Brownie'], ['What colour is the dog?', 'brown', 'red|black|white'],
    ['Where do they go every day?', 'to the park', 'to school|to the store|to the lake'], ['What do they play with?', 'a red ball', 'a blue frisbee|a stick|a big sled'],
    ['What do they do last?', 'go home for a snack', 'play with the ball|go to the park|take a nap']]],
  ['Snow Day', `It is a snow day! There is no school today. Mia puts on her boots and her red toque. She goes outside with her brother. They build a big snowman.`, [
    ['Why is there no school?', 'It is a snow day.', 'It is Sunday.|The teacher is sick.|It is summer.'], ['What does Mia wear on her head?', 'a red toque', 'a blue hat|a scarf|a helmet'],
    ['Who goes outside with Mia?', 'her brother', 'her mom|her dog|her teacher'], ['What do they build?', 'a snowman', 'a fort|a sled|a house'],
    ['What is the weather like?', 'snowy', 'sunny|rainy|hot'], ['How many children play outside?', 'two', 'one|three|four']]],
  ['At the Farm', `Farmer Joe lives on a farm. He has two cows, three pigs and ten hens. Every morning, he feeds the animals. The hens lay eggs. Joe puts the eggs in a basket.`, [
    ['Who lives on the farm?', 'Farmer Joe', 'Max|Grandma|a cow'], ['How many cows does he have?', 'two', 'three|ten|four'], ['How many pigs does he have?', 'three', 'two|ten|one'],
    ['What do the hens lay?', 'eggs', 'milk|apples|wool'], ['When does Joe feed the animals?', 'every morning', 'at night|every Sunday|after lunch'], ['Where does Joe put the eggs?', 'in a basket', 'in a box|in the barn|in the fridge']]],
  ['Mia\'s Lunch', `Mia opens her lunch box at school. She has a cheese sandwich, an apple and a juice box. She shares her apple with her friend Zoe. Zoe gives Mia a cookie. They both smile.`, [
    ['Where does Mia open her lunch box?', 'at school', 'at home|at the park|at the rink'], ['What kind of sandwich does Mia have?', 'cheese', 'jam|ham|egg'],
    ['Who gets part of Mia\'s apple?', 'Zoe', 'Max|the teacher|Mom'], ['What does Zoe give Mia?', 'a cookie', 'a juice box|an apple|a sandwich'],
    ['How do the girls feel at the end?', 'happy', 'angry|sad|sleepy'], ['What does Mia have to drink?', 'juice', 'milk|water|hot chocolate']]],
  ['The Lost Mitten', `Noah lost his blue mitten. He looked under his bed. He looked in the car. At last, he found it in his boot. Noah was so happy.`, [
    ['What did Noah lose?', 'a blue mitten', 'a red toque|a yellow boot|a green scarf'], ['Where did Noah look first?', 'under his bed', 'in the car|in his boot|in the snow'],
    ['Where did he find it?', 'in his boot', 'under his bed|in the car|in the snow'], ['How did Noah feel at the end?', 'happy', 'sad|angry|scared'],
    ['What colour was the mitten?', 'blue', 'red|green|yellow'], ['What did Noah do last?', 'He found the mitten.', 'He looked under his bed.|He looked in the car.|He lost his boot.']]],
  ['Hockey Practice', `Emma has hockey practice on Saturday. She puts on her skates and her helmet. The coach teaches the team to pass the puck. Emma scores one goal. After practice, the team drinks hot chocolate.`, [
    ['What day is practice?', 'Saturday', 'Monday|Friday|Sunday'], ['What does Emma put on her head?', 'a helmet', 'a scarf|a crown|a bag'], ['Who teaches the team?', 'the coach', 'the teacher|Dad|the goalie'],
    ['How many goals does Emma score?', 'one', 'two|three|none'], ['What does the team drink?', 'hot chocolate', 'juice|milk|water'], ['What do the players learn to do?', 'pass the puck', 'catch the ball|dance on ice|build a fort']]],
  ['Pancake Sunday', `On Sunday, Dad makes pancakes. Mom cuts the fruit. Lily pours the maple syrup. The pancakes are warm and sweet. The whole family eats breakfast together.`, [
    ['Who makes the pancakes?', 'Dad', 'Mom|Lily|Grandma'], ['Who cuts the fruit?', 'Mom', 'Dad|Lily|the baby'], ['What does Lily pour?', 'maple syrup', 'milk|juice|honey'],
    ['When do they eat pancakes?', 'on Sunday', 'on Monday|on Friday|on Wednesday'], ['How are the pancakes?', 'warm and sweet', 'cold and sour|hard and salty|burnt and black'], ['Who eats breakfast?', 'the whole family', 'only Dad|only Lily|the dog']]],
  ['The Beaver', `A beaver lives by the river. It has big orange teeth and a flat tail. The beaver cuts down trees. It builds a dam with the wood. The dam makes a pond.`, [
    ['Where does the beaver live?', 'by the river', 'in the desert|on a farm|in a cave'], ['What colour are its teeth?', 'orange', 'white|yellow|black'], ['What does the beaver cut down?', 'trees', 'grass|houses|rocks'],
    ['What does the beaver build?', 'a dam', 'a nest|a boat|a barn'], ['What does the dam make?', 'a pond', 'a road|a hill|a snowman'], ['What is the beaver\'s tail like?', 'flat', 'round|fluffy|long and thin']]],
  ['Rainy Day', `It is raining today. Sam puts on his yellow raincoat and his red boots. He goes outside with his umbrella. He jumps in a big puddle. Splash! Sam laughs.`, [
    ['What is the weather?', 'rainy', 'snowy|sunny|windy'], ['What colour is Sam\'s raincoat?', 'yellow', 'red|blue|green'], ['What colour are his boots?', 'red', 'yellow|black|blue'],
    ['What does Sam jump in?', 'a puddle', 'a pile of leaves|a snowbank|a pool'], ['What does Sam do at the end?', 'He laughs.', 'He cries.|He goes to sleep.|He eats lunch.'], ['What does Sam carry?', 'an umbrella', 'a sled|a kite|a ball']]],
  ['Grandma\'s Visit', `Grandma comes to visit on Friday. She brings a gift for Ben. The gift is a green puzzle. Ben and Grandma do the puzzle together. It takes one hour.`, [
    ['Who comes to visit?', 'Grandma', 'Grandpa|Aunt Sue|Mom'], ['On what day does she come?', 'Friday', 'Monday|Sunday|Tuesday'], ['What is the gift?', 'a puzzle', 'a book|a ball|a toque'],
    ['What colour is the puzzle?', 'green', 'red|blue|yellow'], ['Who does the puzzle with Grandma?', 'Ben', 'Dad|Mia|the dog'], ['How long does it take?', 'one hour', 'one minute|two days|all night']]],
  ['The Library', `Zoe goes to the library with her mom. She picks three books. One book is about frogs. One is about space. One is a funny story. Zoe reads the frog book first.`, [
    ['Who goes with Zoe?', 'her mom', 'her dad|her teacher|her brother'], ['How many books does Zoe pick?', 'three', 'two|one|five'], ['What is one book about?', 'frogs', 'dogs|trains|cars'],
    ['Which book does she read first?', 'the frog book', 'the space book|the funny story|the dog book'], ['Where does Zoe go?', 'the library', 'the zoo|the store|the rink'], ['What kind of story is the third book?', 'funny', 'scary|sad|long']]],
  ['Birthday Cake', `Today is Leo's birthday. He is seven years old. Mom bakes a chocolate cake. There are seven candles on top. Leo makes a wish and blows them out.`, [
    ['How old is Leo?', 'seven', 'six|eight|five'], ['What kind of cake does Mom bake?', 'chocolate', 'vanilla|lemon|carrot'], ['How many candles are on the cake?', 'seven', 'six|ten|one'],
    ['Who bakes the cake?', 'Mom', 'Dad|Leo|Grandma'], ['What does Leo blow out?', 'the candles', 'the lights|a whistle|a balloon'], ['What does Leo make?', 'a wish', 'a card|a mess|a song']]],
  ['Bike Ride', `Ava rides her bike to the park. She wears a pink helmet. Her friend Jo rides next to her. They stop to drink water. Then they ride home.`, [
    ['Where does Ava ride?', 'to the park', 'to school|to the lake|to the store'], ['What colour is her helmet?', 'pink', 'blue|red|green'], ['Who rides with Ava?', 'Jo', 'Mia|Max|Mom'],
    ['What do they drink?', 'water', 'juice|milk|soda'], ['What do they do last?', 'ride home', 'go to the park|drink water|put on helmets'], ['What does Ava ride?', 'a bike', 'a sled|a scooter|a horse']]],
  ['The Moose', `A big moose walks in the forest. It has long legs and large antlers. The moose eats leaves and twigs. It goes to the lake for a drink. A little bird watches from a tree.`, [
    ['Where does the moose walk?', 'in the forest', 'on the ice|in a barn|in the city'], ['What does the moose have on its head?', 'antlers', 'feathers|a hat|wings'], ['What does it eat?', 'leaves and twigs', 'fish and eggs|pizza and soup|bread and cheese'],
    ['Where does the moose go to drink?', 'the lake', 'the barn|the school|the store'], ['Who watches the moose?', 'a little bird', 'a bear|a boy|a wolf'], ['What are its legs like?', 'long', 'short|small|fat']]],
  ['Bedtime', `It is bedtime for Nora. She brushes her teeth. She puts on her soft pyjamas. Dad reads her a story about a sleepy owl. Nora closes her eyes and falls asleep.`, [
    ['What does Nora brush?', 'her teeth', 'her hair|her boots|her dog'], ['What does she put on?', 'pyjamas', 'a toque|boots|a raincoat'], ['Who reads the story?', 'Dad', 'Mom|Nora|Grandpa'],
    ['What is the story about?', 'a sleepy owl', 'a big moose|a funny frog|a fast car'], ['What does Nora do at the end?', 'falls asleep', 'eats a snack|goes outside|plays a game'], ['What time of day is it?', 'bedtime', 'lunch time|recess|morning']]],
];

const PAS2 = [
  ['Canada Day', `Canada Day is on July first. Tom's family goes downtown for the parade. Tom waves a small red and white flag. After the parade, they eat hot dogs in the park. At night, they watch the fireworks. The sky is full of colours.`, [
    ['When is Canada Day?', 'July first', 'January first|December twenty-fifth|March first'], ['What does Tom wave?', 'a flag', 'a sign|a scarf|a balloon'], ['What colours is the flag?', 'red and white', 'blue and yellow|green and white|red and black'],
    ['What do they eat in the park?', 'hot dogs', 'pizza|pancakes|sandwiches'], ['What happens last?', 'They watch the fireworks.', 'They watch the parade.|They eat hot dogs.|They go downtown.'], ['Why is the sky full of colours?', 'because of the fireworks', 'because of the flags|because of the hot dogs|because of the rain']]],
  ['The New Puppy', `Dad brings home a new puppy. It is small and white with brown spots. Maya names her Cookie. At first, Cookie is shy and hides under the table. Maya sits quietly and holds out a treat. Soon, Cookie comes out and licks her hand.`, [
    ['Who brings home the puppy?', 'Dad', 'Mom|Maya|Grandpa'], ['What does the puppy look like?', 'small and white with brown spots', 'big and black|all brown|grey with a long tail'], ['What is the puppy\'s name?', 'Cookie', 'Maya|Spot|Buddy'],
    ['Why does Cookie hide under the table?', 'She is shy.', 'She is hungry.|She is sleepy.|She is angry.'], ['How does Maya help Cookie?', 'She holds out a treat.', 'She shouts at Cookie.|She runs away.|She turns off the light.'], ['What does Cookie do at the end?', 'She licks Maya\'s hand.', 'She hides again.|She barks loudly.|She falls asleep.']]],
  ['A Trip to the Lake', `On Saturday, Ben's family drives to the lake. It takes one hour. First, they put up the tent. Then Ben swims with his sister. For lunch, they cook sausages on a fire. In the evening, they see a loon on the water.`, [
    ['How long is the drive?', 'one hour', 'ten minutes|three hours|all day'], ['What do they do first?', 'put up the tent', 'swim|cook lunch|see a loon'], ['Who swims with Ben?', 'his sister', 'his dad|his friend|his dog'],
    ['What do they cook for lunch?', 'sausages', 'pancakes|fish|soup'], ['What do they see in the evening?', 'a loon', 'a moose|a bear|a beaver'], ['Where do they cook lunch?', 'on a fire', 'in the kitchen|in the car|on a stove']]],
  ['Planting Seeds', `Ms. Lee's class plants sunflower seeds. Each child fills a small pot with soil. Then they push a seed into the soil and add water. The pots go near the window so the seeds get sunlight. After ten days, small green plants appear.`, [
    ['What seeds does the class plant?', 'sunflower seeds', 'bean seeds|apple seeds|corn seeds'], ['What goes into the pot first?', 'soil', 'water|a seed|sunlight'], ['Why do the pots go near the window?', 'The seeds need sunlight.', 'The pots are heavy.|The teacher likes windows.|The seeds need snow.'],
    ['What do the children add after the seed?', 'water', 'more soil|a toy|paint'], ['What appears after ten days?', 'small green plants', 'big yellow flowers|red apples|nothing'], ['Who is the teacher?', 'Ms. Lee', 'Mr. Roy|Ms. Brown|Mrs. Tremblay']]],
  ['The School Play', `Our class puts on a play about a hungry bear. Jada is the bear. Luc is a tall tree. Ms. Brown helps us make costumes from paper. On Friday, our parents come to watch. Everyone claps at the end, and Jada takes a big bow.`, [
    ['What is the play about?', 'a hungry bear', 'a lost puppy|a snow day|a brave firefighter'], ['Who is the bear?', 'Jada', 'Luc|Ms. Brown|the narrator'], ['What is Luc in the play?', 'a tree', 'a bear|a teacher|a rock'],
    ['What are the costumes made from?', 'paper', 'cloth|wood|plastic'], ['Who comes to watch on Friday?', 'the parents', 'the firefighters|the bears|nobody'], ['What does Jada do at the end?', 'takes a bow', 'runs away|cries|sings a song']]],
  ['Maple Syrup', `In early spring, farmers collect sap from maple trees. They drill a small hole and hang a bucket on the tree. The sap drips slowly into the bucket. Then the farmers boil the sap for many hours. It turns into sweet, brown syrup. Many Canadians pour it on pancakes.`, [
    ['When do farmers collect sap?', 'in early spring', 'in summer|in fall|at midnight only'], ['What do farmers hang on the tree?', 'a bucket', 'a bell|a toque|a sign'], ['What do the farmers do with the sap?', 'They boil it.', 'They freeze it.|They paint with it.|They plant it.'],
    ['What does the sap turn into?', 'syrup', 'juice|milk|honey'], ['What is the syrup like?', 'sweet and brown', 'sour and green|salty and white|hot and red'], ['Where do many Canadians pour it?', 'on pancakes', 'on salad|on pizza|on soup']]],
  ['The Lost Loonie', `Anya has a shiny loonie from her grandpa. She wants to buy a small toy at the store. But when she checks her pocket, the loonie is gone! She walks back along the sidewalk and looks carefully. At last, she sees it near a crack in the road. Anya smiles and holds the loonie tight.`, [
    ['Who gave Anya the loonie?', 'her grandpa', 'her mom|her teacher|her brother'], ['What does she want to buy?', 'a small toy', 'a snack|a book|a hat'], ['What happens when she checks her pocket?', 'The loonie is gone.', 'She finds a second loonie.|The toy falls out.|She finds a ticket.'],
    ['Where does she find the loonie?', 'near a crack in the road', 'in her boot|at the store|under her bed'], ['How does Anya feel at the end?', 'happy', 'angry|bored|scared'], ['What does she do after she finds it?', 'She holds it tight.', 'She throws it away.|She gives it to a friend.|She puts it in a boot.']]],
  ['Skating for the First Time', `Today Eli goes skating for the first time. His legs feel wobbly on the ice. He holds onto the wall with both hands. His mom shows him how to bend his knees. Slowly, Eli lets go and glides across the rink. He is so proud that he cannot stop smiling.`, [
    ['What does Eli do for the first time?', 'skate', 'swim|ride a bike|ski'], ['How do his legs feel?', 'wobbly', 'strong|cold|sleepy'], ['What does he hold onto?', 'the wall', 'his dad|a chair|a net'],
    ['Who shows him how to bend his knees?', 'his mom', 'his coach|his sister|his dad'], ['What happens after he lets go?', 'He glides across the rink.', 'He falls asleep.|He goes home.|He drinks hot chocolate.'], ['Why can\'t Eli stop smiling?', 'He is proud.', 'He is cold.|He is lost.|He is tired.']]],
  ['The Goose Family', `A goose family lives by our school pond. There are one mother, one father and six babies. The babies are fuzzy and yellow. Every morning, the mother leads them to the water in a straight line. The father walks at the back and watches for danger. Kids at school love to watch them.`, [
    ['Where does the goose family live?', 'by the school pond', 'on a farm|in a barn|at the zoo'], ['How many babies are there?', 'six', 'five|one|eight'], ['What are the babies like?', 'fuzzy and yellow', 'big and grey|tall and black|loud and red'],
    ['Who leads the babies to the water?', 'the mother', 'the father|a kid|a dog'], ['Why does the father walk at the back?', 'to watch for danger', 'to eat the grass|to take a nap|to play a game'], ['Who loves to watch the geese?', 'kids at school', 'farmers|bears|nobody']]],
  ['Sam\'s Science Project', `Sam wants to find out which paper airplane flies farthest. He makes three planes: one long, one short and one wide. He throws each plane three times in the gym. His friend Dev measures how far each plane goes. The long plane flies the farthest, so Sam wins first prize.`, [
    ['What does Sam want to find out?', 'which plane flies farthest', 'which plane is the prettiest|which plane is the heaviest|which plane is the cheapest'], ['How many planes does he make?', 'three', 'two|four|ten'], ['Where does he throw the planes?', 'in the gym', 'at the lake|in the kitchen|outside in the snow'],
    ['Who measures how far they go?', 'Dev', 'Sam|the teacher|Mom'], ['Which plane flies the farthest?', 'the long one', 'the short one|the wide one|all the same'], ['What does Sam win?', 'first prize', 'a trip|a dog|a new bike']]],
  ['Winter Morning', `Jake wakes up and looks out the window. Everything is white! Snow fell all night. He eats breakfast quickly and puts on his snow pants, boots, toque and mittens. Then he helps Dad shovel the driveway. When they finish, Mom brings them hot chocolate.`, [
    ['What does Jake see outside?', 'snow', 'rain|flowers|a rainbow'], ['When did the snow fall?', 'all night', 'at lunch|this afternoon|last summer'], ['What does Jake put on?', 'snow pants, boots, toque and mittens', 'a raincoat and sandals|shorts and a T-shirt|a helmet and skates'],
    ['Who does Jake help?', 'Dad', 'Mom|his sister|a neighbour'], ['What do Jake and Dad shovel?', 'the driveway', 'the roof|the lake|the barn'], ['What does Mom bring?', 'hot chocolate', 'hot soup|cold juice|pancakes']]],
  ['The Bake Sale', `Our school has a bake sale to raise money for new library books. Priya brings oatmeal cookies. Marcus brings banana muffins. Each treat costs one loonie. By lunch, the table is almost empty. The class raises forty loonies in all.`, [
    ['Why does the school have a bake sale?', 'to buy new library books', 'to buy new skates|to build a rink|to pay the teacher'], ['What does Priya bring?', 'oatmeal cookies', 'banana muffins|pancakes|brownies'], ['What does Marcus bring?', 'banana muffins', 'oatmeal cookies|apple pie|cupcakes'],
    ['How much does each treat cost?', 'one loonie', 'two loonies|one toonie|a dime'], ['What happens by lunch?', 'The table is almost empty.', 'It begins to rain.|The school closes.|The treats are burnt.'], ['How much money does the class raise?', 'forty loonies', 'four loonies|ten loonies|a hundred loonies']]],
  ['A Night in the Tent', `Last weekend, Rosa slept in a tent in her backyard. Her dad brought a flashlight and two sleeping bags. They counted stars until Rosa got sleepy. Late at night, they heard a strange noise. It was only a raccoon looking for food. In the morning, Rosa told her mom everything over breakfast.`, [
    ['Where did Rosa sleep?', 'in a tent in her backyard', 'in a cabin|at the lake|in her classroom'], ['Who slept in the tent with her?', 'her dad', 'her mom|her brother|her friend'], ['What did they count?', 'stars', 'tents|clouds|trees'],
    ['What made the strange noise?', 'a raccoon', 'a bear|Dad|a moose'], ['What was the raccoon looking for?', 'food', 'a friend|a flashlight|a tent'], ['When did Rosa tell her mom everything?', 'at breakfast', 'at night|at lunch|at school']]],
  ['Pet Fish', `Kai has two goldfish named Bubble and Splash. Every morning, he sprinkles a pinch of food into the tank. Once a week, he helps his dad clean the glass. Bubble is orange and Splash is orange with a white spot. Kai likes to watch them swim in circles before bed.`, [
    ['What pets does Kai have?', 'two goldfish', 'two cats|a dog|a hamster'], ['When does he feed them?', 'every morning', 'every night|once a week|every Sunday'], ['How often does he clean the glass?', 'once a week', 'every day|once a year|never'],
    ['Which fish has a white spot?', 'Splash', 'Bubble|Kai|both'], ['What does Kai like to watch before bed?', 'the fish swim in circles', 'a movie|the stars|the news'], ['Who helps Kai clean the glass?', 'his dad', 'his mom|his sister|his teacher']]],
  ['Recess Surprise', `At recess, Dana saw a new girl sitting alone by the fence. The girl looked sad and held a small stuffed rabbit. Dana walked over and asked, "Do you want to play tag?" The girl's face lit up. Her name was Hana, and she had just moved from Vancouver. By the bell, the two girls were laughing together.`, [
    ['Where was the new girl sitting?', 'by the fence', 'on the slide|in the gym|under a tree'], ['What was she holding?', 'a stuffed rabbit', 'a ball|a book|a lunch box'], ['What game did Dana ask about?', 'tag', 'hide and seek|soccer|hopscotch'],
    ['What was the new girl\'s name?', 'Hana', 'Dana|Maya|Jada'], ['Where did Hana move from?', 'Vancouver', 'Toronto|Halifax|Calgary'], ['How did the girls feel by the bell?', 'happy', 'bored|angry|scared']]],
];

const PAS3 = [
  ['The Thunderstorm', `Isla heard a loud boom and covered her ears. Dark clouds filled the sky, and rain pounded on the roof. Her little brother hid under a blanket. Isla remembered what her mom said: thunder is only a big noise and cannot hurt you. She sat beside him and counted the seconds between each flash and boom. By the time she reached ten, the thunder was farther away. Soon the storm passed, and a rainbow appeared.`, [
    ['What is this story mostly about?', 'Isla helps her brother during a storm.', 'Isla sees a rainbow at school.|Isla\'s mom is afraid of thunder.|Isla builds a blanket fort.'], ['Why did Isla cover her ears?', 'The thunder was loud.', 'She was cold.|She was sleepy.|She was playing a game.'],
    ['How did Isla\'s brother feel?', 'scared', 'bored|silly|proud'], ['Why did Isla count the seconds?', 'to see how far away the storm was', 'to win a race|to fall asleep|to bake a cake'],
    ['What happened last?', 'A rainbow appeared.', 'Thunder boomed.|Isla counted.|Her brother hid.'], ['What does “pounded” mean?', 'hit hard', 'fell softly|stopped|smelled bad']]],
  ['Ava Learns to Swim', `Ava was nervous about swimming lessons because the water was deep. On the first day, she only dipped her toes in. Her teacher, Mr. Chen, said, "Take it one step at a time." Each week, Ava went a little farther. She blew bubbles, kicked her legs and floated on her back. By the last lesson, she jumped in with a big splash and swam across the pool.`, [
    ['How did Ava feel at first?', 'nervous', 'excited|bored|proud'], ['Why was she nervous?', 'The water was deep.', 'The pool was cold.|Her goggles were lost.|Mr. Chen was angry.'],
    ['What did Mr. Chen mean by “one step at a time”?', 'Do a little bit each time.', 'Run as fast as you can.|Never get in the water.|Wait for a friend.'], ['What did Ava do on the first day?', 'She dipped her toes in.', 'She swam across the pool.|She jumped in.|She floated on her back.'],
    ['What is the main idea?', 'Ava gets braver by trying a little each week.', 'Ava hates the water forever.|Mr. Chen buys a new pool.|Ava wins a race.'], ['What did Ava do at the last lesson?', 'She swam across the pool.', 'She dipped her toes in.|She blew bubbles.|She stayed on the edge.']]],
  ['The Tidy Room', `Ben's room was a mess. Toys covered the floor, and dirty socks hung from the lamp. "I can't find my hockey card!" he groaned. Mom did not shout. She said, "Let's make a plan." First, they put the toys in a bin. Next, Ben dropped the socks in the laundry basket. Last, they swept the floor. Under a pile of books, Ben found his hockey card.`, [
    ['What was Ben looking for?', 'a hockey card', 'a sock|a lamp|a book'], ['How did Mom act?', 'calm', 'angry|sleepy|sad'], ['What did they do second?', 'Ben put the socks in the basket.', 'They swept the floor.|They put toys in a bin.|Ben found the card.'],
    ['What does “mess” mean in the story?', 'untidy', 'clean|tiny|loud'], ['Where did Ben find the card?', 'under a pile of books', 'in the laundry basket|under the bed|in the bin'], ['What is a good lesson from the story?', 'A plan makes a big job easier.', 'Never lose a card.|Socks belong on lamps.|Mom is always right.']]],
  ['The Sleepy Bear', `When the weather turns cold, a black bear eats as much food as it can. It eats berries, fish and roots all fall long. This gives the bear thick fat for the winter. Then the bear finds a cozy den and falls into a deep sleep called hibernation. While it sleeps, its heart beats slowly and it does not need to eat. In spring, the hungry bear wakes up and goes looking for food.`, [
    ['Why does a bear eat so much in the fall?', 'to get fat for the winter', 'to stay cool|to feed its cubs only|to make a den'], ['What is a den?', 'a cozy home for sleeping', 'a kind of fish|a berry bush|a cold river'],
    ['What is hibernation?', 'a deep winter sleep', 'a long walk|a fall snack|a fast run'], ['What happens to the bear\'s heart while it sleeps?', 'It beats slowly.', 'It stops forever.|It beats very fast.|It turns black.'],
    ['How does the bear feel in spring?', 'hungry', 'sleepy|scared|cold'], ['What is the main idea?', 'Bears get ready for winter and sleep through it.', 'Bears love fishing.|Bears are black.|Berries are healthy.']]],
  ['Cooper\'s Lemonade Stand', `Cooper wanted to buy a new soccer ball, but he did not have enough money. So he set up a lemonade stand on his street. At first, nobody stopped. Cooper made a bright sign with the words "Cold Lemonade". Soon a line of thirsty neighbours formed. By the end of the afternoon, he had enough money for the ball and a little extra to share with his sister.`, [
    ['Why did Cooper make a lemonade stand?', 'to earn money for a ball', 'to give lemons away|because he was thirsty|to win a prize'], ['What did Cooper do when nobody stopped?', 'He made a bright sign.', 'He went home.|He cried.|He gave away the ball.'],
    ['What does “thirsty” mean?', 'wanting a drink', 'wanting a nap|wanting a hug|wanting a game'], ['What did he do with the extra money?', 'He shared some with his sister.', 'He bought a bike.|He gave it all to the neighbours.|He lost it.'],
    ['How do you think Cooper felt at the end?', 'proud', 'jealous|bored|scared'], ['What happened after he made the sign?', 'A line of neighbours formed.', 'It started to snow.|His sister took the stand.|The lemonade ran out right away.']]],
  ['The Broken Kite', `On a windy Saturday, Mia and her grandpa took her new kite to the field. The kite soared high above the trees, dancing in the sky. Suddenly, a gust of wind snapped the string, and the kite crashed into a tall tree. Mia's smile disappeared. Grandpa patted her shoulder and said, "Do not worry, we can fix it." They tied a new string, and the kite flew again by sunset.`, [
    ['What made the kite crash?', 'A gust of wind snapped the string.', 'Mia let go on purpose.|It rained hard.|Grandpa dropped it.'], ['How did Mia feel when the kite crashed?', 'sad', 'excited|sleepy|silly'],
    ['What does “soared” mean?', 'flew high', 'fell down|hid|sat still'], ['How did Grandpa help?', 'He helped fix the kite.', 'He bought a new kite.|He climbed the tree.|He went home.'],
    ['When did the kite fly again?', 'by sunset', 'at lunch|the next week|in the morning'], ['Who went to the field with Mia?', 'her grandpa', 'her dad|her teacher|her sister']]],
  ['Butterfly Journey', `Every fall, millions of monarch butterflies leave Canada and fly south to Mexico. The trip is very long, about four thousand kilometres. Each butterfly is tiny, but it can fly all that way. They rest on trees at night and drink sweet nectar from flowers. In the spring, new butterflies fly north again. These are the grandchildren of the ones that left.`, [
    ['Where do monarchs fly in the fall?', 'to Mexico', 'to Alaska|to the sea|to Toronto'], ['About how far is the trip?', 'four thousand kilometres', 'four kilometres|forty kilometres|four hundred kilometres'], ['What do monarchs drink?', 'nectar', 'milk|soda|lake water'],
    ['Where do they rest at night?', 'on trees', 'in nests|in caves|in houses'], ['What is surprising about the butterflies that come back in spring?', 'They are the grandchildren of the ones that left.', 'They are the same butterflies.|They are birds.|They are very big.'],
    ['What is the main idea?', 'Monarchs make an amazing long trip each year.', 'Butterflies like nectar.|Mexico is warm.|Trees are tall.']]],
  ['The New Neighbour', `A new family moved in next door. Lena saw a boy about her age carrying boxes into the house. He looked shy and kept looking at his shoes. Lena baked cookies with her mom and walked over to say hello. "Welcome to the street! I'm Lena," she said. The boy's eyes lit up. "I'm Omar," he whispered. Soon they discovered they both loved hockey and planned to play on Saturday.`, [
    ['What did Lena do to be kind?', 'She brought cookies and said hello.', 'She ignored him.|She gave him a hockey stick.|She moved away.'], ['How did Omar feel at first?', 'shy', 'angry|proud|sleepy'],
    ['How do you know Omar was happy to meet Lena?', 'His eyes lit up.', 'He ran away.|He ate all the cookies.|He closed the door.'], ['What do Lena and Omar both love?', 'hockey', 'soccer|swimming|reading'],
    ['What will they do on Saturday?', 'play hockey', 'bake cookies|move boxes|go to school'], ['What does “discovered” mean?', 'found out', 'forgot|lost|hid']]],
  ['The Class Hamster', `Our class has a hamster named Peanut. Each week, a different student takes Peanut home for the weekend. This week it is my turn! I must fill his water bottle, give him seeds and clean his cage. Peanut sleeps all day, but at night he runs on his wheel. The noise kept me awake for a while, but I did not mind. I think Peanut is the best class pet ever.`, [
    ['Who is Peanut?', 'the class hamster', 'a dog|a student|a teacher'], ['Who takes Peanut home?', 'a different student each week', 'the teacher every week|the same student|nobody'],
    ['What must the student do for Peanut?', 'fill the water, give seeds and clean the cage', 'teach him tricks|give him a bath|take him swimming'], ['When does Peanut run on his wheel?', 'at night', 'at lunch|in the morning|all day'],
    ['Why was the writer awake for a while?', 'The wheel was noisy.', 'Peanut was crying.|A storm was loud.|The cage was empty.'], ['How does the writer feel about Peanut?', 'fond of him', 'angry at him|bored with him|afraid of him']]],
  ['Ice Fishing', `On a freezing morning in January, Uncle Pierre took Hugo ice fishing. They drove a snowmobile onto the frozen lake. Pierre drilled a round hole in the thick ice. Then they sat on small stools and dropped their lines into the dark water. For a long time nothing happened. Suddenly, Hugo's line jerked, and he pulled up a shiny silver fish. "Patience pays off," laughed his uncle.`, [
    ['What did they use to get to the lake?', 'a snowmobile', 'a boat|a bike|a horse'], ['Why did Pierre drill a hole?', 'to fish through the ice', 'to plant a tree|to hide a treasure|to make a pond'],
    ['What happened when Hugo\'s line jerked?', 'He pulled up a fish.', 'He fell in the lake.|The ice melted.|The hole closed.'], ['What does “Patience pays off” mean?', 'Waiting calmly can bring a reward.', 'Fish are expensive.|You must run fast.|Never go fishing.'],
    ['When did this happen?', 'in January', 'in July|in May|in October'], ['What did the fish look like?', 'shiny and silver', 'red and small|black and furry|green and big']]],
  ['The Art Contest', `Nina worked for days on her painting of a moose in the snow. She wanted to win the school art contest. On the day of the contest, she saw Jules's painting of a rocket. It was amazing! Nina felt her stomach drop. But when the results came, the teacher announced a tie: Nina and Jules shared first prize. Nina smiled and shook Jules's hand. "Your rocket is great," she said.`, [
    ['What did Nina paint?', 'a moose in the snow', 'a rocket|a lake|a hockey game'], ['How did Nina feel when she saw Jules\'s painting?', 'worried', 'bored|sleepy|silly'], ['What was the result of the contest?', 'a tie', 'Nina won alone|Jules won alone|nobody won'],
    ['What does this show about Nina?', 'She is a good sport.', 'She is rude.|She is lazy.|She is jealous.'], ['What did Jules paint?', 'a rocket', 'a moose|a castle|a boat'], ['What does “announced” mean?', 'told everyone', 'hid|forgot|painted']]],
  ['The Library Book', `Theo borrowed a book about dinosaurs from the school library. He read it every night and kept it in his backpack. One rainy day, his backpack got wet, and the book's cover curled up. Theo felt terrible. He told his teacher the truth instead of hiding it. Ms. Kim said, "Thank you for being honest. Accidents happen." She showed him how to flatten the pages under heavy books, and the book looked almost new again.`, [
    ['What was the book about?', 'dinosaurs', 'space|dogs|hockey'], ['What went wrong?', 'The book got wet.', 'Theo lost it.|A dog ate it.|The pages were blank.'], ['What did Theo do?', 'He told the teacher the truth.', 'He hid the book.|He blamed a friend.|He threw it away.'],
    ['What does “honest” mean?', 'telling the truth', 'being funny|being fast|being quiet'], ['How did Ms. Kim fix the book?', 'She flattened it under heavy books.', 'She glued a new cover.|She bought a new copy.|She used a hair dryer.'], ['What is the lesson?', 'It is best to tell the truth.', 'Never borrow books.|Rain is bad.|Dinosaurs are big.']]],
  ['Garden Helpers', `Many people think bees are scary, but bees are very helpful. When a bee lands on a flower, yellow dust called pollen sticks to its legs. The bee then flies to another flower, and some pollen falls off. This helps the plants make fruit and seeds. Without bees, we would have fewer apples, strawberries and pumpkins. That is why we should plant flowers and be gentle with bees.`, [
    ['What is pollen?', 'yellow dust from flowers', 'a kind of honey|a bee\'s nest|a type of fruit'], ['How does pollen move to other flowers?', 'It sticks to a bee\'s legs.', 'Farmers carry it.|Rain washes it.|Birds drop it.'],
    ['Why are bees helpful?', 'They help plants make fruit and seeds.', 'They make loud noises.|They eat weeds.|They scare birds.'], ['What would happen without bees?', 'We would have fewer fruits.', 'We would have more apples.|Flowers would sing.|Nothing would change.'],
    ['What should we do for bees?', 'plant flowers and be gentle', 'chase them away|cut all the flowers|spray them with water'], ['What is the main idea?', 'Bees are helpful to plants and people.', 'Bees are scary.|Pumpkins are orange.|Flowers are yellow.']]],
  ['First Day at a New School', `Sofia felt butterflies in her stomach as she walked into her new classroom. She did not know anyone. The teacher, Mr. Singh, smiled and showed her a desk by the window. At recess, Sofia stood alone near the swings. A girl named Chloe came over with a skipping rope and asked, "Want to jump with us?" Sofia nodded. By the end of the day, she had made two new friends and could not wait for tomorrow.`, [
    ['What does “butterflies in her stomach” mean?', 'She felt nervous.', 'She was hungry.|She ate bugs.|She felt sick from lunch.'], ['Where was Sofia\'s desk?', 'by the window', 'near the door|at the back|next to Chloe'], ['What did Sofia do at recess at first?', 'She stood alone near the swings.', 'She skipped with Chloe.|She read a book.|She went home.'],
    ['Who invited Sofia to play?', 'Chloe', 'Mr. Singh|Mia|Sofia\'s mom'], ['How did Sofia feel at the end of the day?', 'excited', 'bored|angry|lonely'], ['What is the main idea?', 'A kind invitation can turn a nervous day into a good one.', 'Swings are fun.|Skipping ropes are long.|Mr. Singh is tall.']]],
  ['Hoot the Owl', `Hoot is a small owl who sleeps all day and wakes up at night. His eyes are large, so he can see in the dark. His feathers are soft, so he flies without a sound. One night, Hoot hears a tiny squeak in the grass. He tilts his head and listens carefully. Then he glides down and catches a mouse for supper. Owls like Hoot are called nocturnal because they are awake at night.`, [
    ['When is Hoot awake?', 'at night', 'in the morning|at noon|all day'], ['Why can Hoot see in the dark?', 'His eyes are large.', 'He wears glasses.|His beak is sharp.|He is very small.'], ['Why does Hoot fly without a sound?', 'His feathers are soft.', 'His eyes are large.|He is hungry.|He is asleep.'],
    ['What did Hoot hear?', 'a squeak in the grass', 'a loud song|a barking dog|a falling tree'], ['What does “nocturnal” mean?', 'awake at night', 'awake all day|very small|good at flying'], ['What did Hoot catch?', 'a mouse', 'a fish|a frog|a worm']]],
];
const PASS = { 1: PAS1, 2: PAS2, 3: PAS3 };
const readGen = (level) => (R) => {
  const pi = R.int(0, PASS[level].length - 1); const [title, text, qs] = PASS[level][pi]; const qi = R.int(0, qs.length - 1);
  const [q, right, wrong] = qs[qi];
  const opts = [right, ...wrong.split('|')].map((t) => ({ text: t, say: say(t) }));
  return { type: 'choice', key: `r${level}:${title}:${qi}`, prompt: q, say: say(`${text} ${q}`), stimulus: { text }, options: opts, answer: 0, cols: level === 3 ? 1 : opts.length > 3 ? 2 : opts.length };
};
const e34Gens = { 1: [readGen(1)], 2: [readGen(2)], 3: [readGen(3)] };

export const units = [
  mkUnit('e21', '🔤', { fr: 'Sons courts : a e i o u', en: 'Short vowels & CVC words' }, 'sons des voyelles courtes et mots de 3 lettres (cat, pen, pig)', e21Gens),
  mkUnit('e22', '✨', { fr: 'Voyelles longues et le « e » muet', en: 'Long vowels & silent e' }, 'voyelles longues, e muet (cap → cape) et équipes de voyelles (rain, boat)', e22Gens),
  mkUnit('e23', '🗣️', { fr: 'Sons ensemble : sh ch th wh, bl st tr…', en: 'Digraphs & blends' }, 'digraphes (sh, ch, th, wh), groupes de consonnes (bl, st, tr…) et finales (ck, ng, nk)', e23Gens),
  mkUnit('e24', '🏷️', { fr: 'Les noms et les majuscules', en: 'Nouns & capital letters' }, 'noms communs et propres, majuscules (noms, lieux, jours, mois)', e24Gens),
  mkUnit('e25', '🐭', { fr: 'Pluriels : -s, -es, mice, feet…', en: 'Plurals' }, 'pluriels réguliers (-s, -es, -ies, -ves) et irréguliers (children, mice, feet)', e25Gens),
  mkUnit('e26', '🏃', { fr: 'Verbes et accord au présent', en: 'Verbs & present tense' }, 'verbes d\'action, accord sujet-verbe au présent (he runs / they run, is/are, has/have)', e26Gens),
  mkUnit('e27', '⏪', { fr: 'Le passé : -ed, was/were, went, saw', en: 'Past tense' }, 'temps du passé : verbes réguliers (-ed), irréguliers (went, saw, ate), was/were', e27Gens),
  mkUnit('e28', '🎨', { fr: 'Les adjectifs : big, bigger, biggest', en: 'Adjectives' }, 'adjectifs (couleur, taille, sentiment) et comparatifs / superlatifs (-er, -est)', e28Gens),
  mkUnit('e29', '👤', { fr: 'Les pronoms : I, he, she, they, me, him…', en: 'Pronouns' }, 'pronoms sujets et compléments (he/him), possessifs, « Max and I »', e29Gens),
  mkUnit('e30', '🧱', { fr: 'Je construis une phrase', en: 'Build a sentence' }, 'construction de phrases : ordre des mots, majuscule et ponctuation finale', e30Gens),
  mkUnit('e31', '❓', { fr: 'Dire, demander, s\'écrier . ? !', en: 'Telling, asking & exclaiming' }, 'types de phrases (. ? !) et phrase complète ou fragment', e31Gens),
  mkUnit('e32', '✂️', { fr: 'Contractions et mots composés', en: 'Contractions & compound words' }, 'contractions (can\'t, it\'s, don\'t) et mots composés (sun + flower)', e32Gens),
  mkUnit('e33', '🔁', { fr: 'Synonymes, contraires et homophones', en: 'Synonyms, antonyms & homophones' }, 'vocabulaire : mots de même sens, contraires et homophones (to/two, see/sea)', e33Gens),
  mkUnit('e34', '📖', { fr: 'Je lis et je réponds', en: 'Read & answer' }, 'compréhension de lecture : qui, quoi, où, pourquoi, ordre des événements, idée principale', e34Gens),
];
