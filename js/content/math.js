// Mathématique — 2e année (PFEQ, 1er cycle). All questions are generated procedurally.
import * as S from './svg.js';

const T = (fr, en) => ({ fr, en });
const SAY = (fr, en) => ({ text: { fr, en } }); // read in the UI language

// ---------- number words ----------
const FR_SMALL = 'zéro un deux trois quatre cinq six sept huit neuf dix onze douze treize quatorze quinze seize dix-sept dix-huit dix-neuf'.split(' ');
const FR_TENS = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];
export function frWords(n) {
  if (n < 20) return FR_SMALL[n];
  if (n < 100) {
    const t = Math.floor(n / 10), u = n % 10;
    if (t === 7 || t === 9) {
      const base = t === 7 ? 'soixante' : 'quatre-vingt';
      if (t === 7 && u === 1) return 'soixante et onze';
      return `${base}-${FR_SMALL[10 + u]}`;
    }
    if (t === 8) return u === 0 ? 'quatre-vingts' : `quatre-vingt-${FR_SMALL[u]}`;
    if (u === 0) return FR_TENS[t];
    if (u === 1) return `${FR_TENS[t]} et un`;
    return `${FR_TENS[t]}-${FR_SMALL[u]}`;
  }
  const h = Math.floor(n / 100), r = n % 100;
  const head = h === 1 ? 'cent' : `${FR_SMALL[h]} cent${r === 0 ? 's' : ''}`;
  return r === 0 ? head : `${head} ${frWords(r)}`;
}
const EN_SMALL = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split(' ');
const EN_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
export function enWords(n) {
  if (n < 20) return EN_SMALL[n];
  if (n < 100) return EN_TENS[Math.floor(n / 10)] + (n % 10 ? '-' + EN_SMALL[n % 10] : '');
  const h = Math.floor(n / 100), r = n % 100;
  return `${EN_SMALL[h]} hundred` + (r ? ` ${enWords(r)}` : '');
}

// distinct numeric distractors near `ans`
function near(R, ans, n, spread, min = 0, max = 1000) {
  const set = new Set([ans]);
  let guard = 0;
  while (set.size < n + 1 && guard++ < 500) {
    const d = R.int(-spread, spread);
    const v = ans + d;
    if (v >= min && v <= max) set.add(v);
  }
  return [...set].slice(1);
}
const numChoice = (ans, distract) => ({
  options: [ans, ...distract].map((v) => ({ text: String(v) })),
  answer: 0,
});

const OBJ = ['🍎', '⭐', '🐟', '🎈', '🍪', '🚗', '🌸', '🐞', '⚽', '🧁', '🦋', '🍓'];
const NAMES = ['Léa', 'Félix', 'Mia', 'Zachary', 'Florence', 'William', 'Émile', 'Rosalie', 'Noah', 'Alice', 'Jacob', 'Chloé'];
const THINGS = [
  { e: '🍎', fr: ['pomme', 'pommes'], en: ['apple', 'apples'] },
  { e: '🖍️', fr: ['crayon', 'crayons'], en: ['crayon', 'crayons'] },
  { e: '🍪', fr: ['biscuit', 'biscuits'], en: ['cookie', 'cookies'] },
  { e: '🎈', fr: ['ballon', 'ballons'], en: ['balloon', 'balloons'] },
  { e: '🐟', fr: ['poisson', 'poissons'], en: ['fish', 'fish'] },
  { e: '🃏', fr: ['carte de hockey', 'cartes de hockey'], en: ['hockey card', 'hockey cards'] },
  { e: '🧁', fr: ['petit gâteau', 'petits gâteaux'], en: ['cupcake', 'cupcakes'] },
  { e: '🍁', fr: ['feuille', 'feuilles'], en: ['leaf', 'leaves'] },
];


// ---------- shared helpers for the enriched bank ----------
const PEOPLE = [
  { n: 'Léa', g: 'f' }, { n: 'Félix', g: 'm' }, { n: 'Mia', g: 'f' }, { n: 'Zachary', g: 'm' },
  { n: 'Florence', g: 'f' }, { n: 'William', g: 'm' }, { n: 'Émile', g: 'm' }, { n: 'Rosalie', g: 'f' },
  { n: 'Noah', g: 'm' }, { n: 'Alice', g: 'f' }, { n: 'Jacob', g: 'm' }, { n: 'Chloé', g: 'f' },
];
const il = (p) => (p.g === 'f' ? 'elle' : 'il');
const Il = (p) => (p.g === 'f' ? 'Elle' : 'Il');
const he = (p) => (p.g === 'f' ? 'she' : 'he');
const He = (p) => (p.g === 'f' ? 'She' : 'He');
const her = (p) => (p.g === 'f' ? 'her' : 'his');
const vow = (n) => /^[AEIOUYÉÈÊ]/.test(n);
const dn = (n) => (vow(n) ? `d’${n}` : `de ${n}`);
const qn = (n) => (vow(n) ? `qu’${n}` : `que ${n}`);
const dd = (w) => (/^[aeiouyéèêâîôh]/i.test(w) ? 'd’' : 'de ');
// money text: cents -> {fr,en}  (no 1 ¢ coin in Canada; amounts are multiples of 5)
const moneyT = (c) => {
  if (c < 100) return T(`${c} ¢`, `${c}¢`);
  if (c % 100 === 0) return T(`${c / 100} $`, `$${c / 100}`);
  const d = Math.floor(c / 100), r = String(c % 100).padStart(2, '0');
  return T(`${d},${r} $`, `$${d}.${r}`);
};
const dollarT = (n) => T(`${n} $`, `$${n}`);
const centT = (n) => T(`${n} ¢`, `${n}¢`);
const shuf = (R, arr) => R.shuffle(arr);
// build {text} options from numbers (answer first)
const nums = (ans, others) => ({ options: [ans, ...others].map((v) => ({ text: String(v) })), answer: 0 });
// emoji row helper
const rowOf = (arr) => arr.join('  ');

// word-problem templates: (p, q, a, b, c) => [fr, en, emoji, answer?]
const WP = {
  add: [
    (p, q, a, b) => [`À la cabane à sucre, ${p.n} voit ${a} chevaux et ${b} vaches. Combien d’animaux voit-${il(p)} en tout?`, `At the sugar shack, ${p.n} sees ${a} horses and ${b} cows. How many animals does ${he(p)} see in all?`, '🐴'],
    (p, q, a, b) => [`${p.n} a marqué ${a} buts hier et ${b} buts aujourd’hui. Combien de buts ${il(p)} a marqués en tout?`, `${p.n} scored ${a} goals yesterday and ${b} goals today. How many goals did ${he(p)} score in all?`, '🏒'],
    (p, q, a, b) => [`Il y a ${a} enfants sur la patinoire. ${b} autres enfants arrivent. Combien d’enfants y a-t-il maintenant?`, `There are ${a} children on the rink. ${b} more children arrive. How many children are there now?`, '⛸️'],
    (p, q, a, b) => [`Au dépanneur, ${p.n} achète ${a} tablettes de chocolat et ${b} sacs de chips. Combien d’articles achète-t-${il(p)} en tout?`, `At the corner store, ${p.n} buys ${a} chocolate bars and ${b} bags of chips. How many items does ${he(p)} buy in all?`, '🍫'],
    (p, q, a, b) => [`Dans l’autobus scolaire, il y a ${a} élèves. ${b} autres élèves montent. Combien d’élèves y a-t-il maintenant?`, `On the school bus there are ${a} students. ${b} more students get on. How many students are on the bus now?`, '🚌'],
    (p, q, a, b) => [`À la récré, ${a} enfants jouent au ballon et ${b} enfants sautent à la corde. Combien d’enfants jouent en tout?`, `At recess, ${a} children play ball and ${b} children skip rope. How many children are playing in all?`, '⚽'],
    (p, q, a, b) => [`${p.n} fait ${a} boules de neige et ${q.n} en fait ${b}. Combien de boules de neige y a-t-il en tout?`, `${p.n} makes ${a} snowballs and ${q.n} makes ${b}. How many snowballs are there in all?`, '❄️'],
    (p, q, a, b) => [`Un érable a ${a} feuilles rouges et ${b} feuilles jaunes. Combien de feuilles a-t-il en tout?`, `A maple tree has ${a} red leaves and ${b} yellow leaves. How many leaves does it have in all?`, '🍁'],
    (p, q, a, b) => [`À la cabane à sucre, on sert ${a} crêpes à ${p.n} et ${b} crêpes à ${q.n}. Combien de crêpes sont servies en tout?`, `At the sugar shack, ${a} pancakes are served to ${p.n} and ${b} pancakes to ${q.n}. How many pancakes are served in all?`, '🥞'],
    (p, q, a, b) => [`${p.n} a ${a} cartes de hockey. ${q.n} lui en donne ${b}. Combien de cartes a-t-${il(p)} maintenant?`, `${p.n} has ${a} hockey cards. ${q.n} gives ${her(p) === 'her' ? 'her' : 'him'} ${b} more. How many cards does ${he(p)} have now?`, '🃏'],
    (p, q, a, b) => [`${p.n} a ${a} tuques et ${b} foulards. Combien de vêtements d’hiver a-t-${il(p)}?`, `${p.n} has ${a} winter hats and ${b} scarves. How many winter clothes does ${he(p)} have?`, '🧣'],
  ],
  sub: [
    (p, q, a, b) => [`${p.n} a ${a} rondelles de hockey. ${Il(p)} en perd ${b}. Combien de rondelles lui reste-t-il?`, `${p.n} has ${a} hockey pucks. ${He(p)} loses ${b}. How many pucks are left?`, '🏒'],
    (p, q, a, b) => [`Il y avait ${a} élèves dans l’autobus. ${b} élèves descendent à l’école. Combien d’élèves restent dans l’autobus?`, `There were ${a} students on the bus. ${b} students get off at school. How many students are still on the bus?`, '🚌'],
    (p, q, a, b) => [`Il y avait ${a} patineurs sur la patinoire. ${b} patineurs quittent la glace. Combien de patineurs restent?`, `There were ${a} skaters on the rink. ${b} skaters leave the ice. How many skaters are left?`, '⛸️'],
    (p, q, a, b) => [`À la cabane à sucre, il y a ${a} tartes au sucre. Les enfants en mangent ${b}. Combien en reste-t-il?`, `At the sugar shack, there are ${a} sugar pies. The children eat ${b} of them. How many pies are left?`, '🥧'],
    (p, q, a, b) => [`${p.n} a ${a} $. ${Il(p)} achète du lait à ${b} $. Combien d’argent lui reste-t-il?`, `${p.n} has $${a}. ${He(p)} buys milk for $${b}. How much money is left?`, '🥛'],
    (p, q, a, b) => [`Il y avait ${a} bonshommes de neige dans la cour. ${b} fondent au soleil. Combien de bonshommes de neige restent?`, `There were ${a} snowmen in the yard. ${b} melt in the sun. How many snowmen are left?`, '⛄'],
    (p, q, a, b) => [`${a} enfants jouent dehors à la récré. ${b} enfants rentrent dans l’école. Combien d’enfants restent dehors?`, `${a} children are playing outside at recess. ${b} children go back into the school. How many children are still outside?`, '🏫'],
    (p, q, a, b) => [`${p.n} ramasse ${a} feuilles d’érable. ${Il(p)} en donne ${b} à ${q.n}. Combien de feuilles lui reste-t-il?`, `${p.n} picks up ${a} maple leaves. ${He(p)} gives ${b} to ${q.n}. How many leaves does ${he(p)} have left?`, '🍁'],
    (p, q, a, b) => [`Au dépanneur, il y avait ${a} sacs de croustilles. On en vend ${b}. Combien de sacs reste-t-il?`, `At the corner store, there were ${a} bags of chips. ${b} are sold. How many bags are left?`, '🛒'],
  ],
  cmp: [
    (p, q, a, b) => [`${p.n} a ${a} cartes de hockey. ${q.n} en a ${b}. Combien de cartes ${p.n} a-t-${il(p)} de plus ${qn(q.n)}?`, `${p.n} has ${a} hockey cards. ${q.n} has ${b}. How many more cards does ${p.n} have than ${q.n}?`, '🃏'],
    (p, q, a, b) => [`Dans la classe, il y a ${a} filles et ${b} garçons. Combien y a-t-il de filles de plus que de garçons?`, `In the class there are ${a} girls and ${b} boys. How many more girls than boys are there?`, '🏫'],
    (p, q, a, b) => [`Il y a ${a} enfants avec des patins et ${b} enfants avec des souliers. Combien d’enfants de plus ont des patins?`, `${a} children are wearing skates and ${b} children are wearing shoes. How many more children are wearing skates?`, '⛸️'],
    (p, q, a, b) => [`Dans l’autobus ${dn(p.n)}, il y a ${a} élèves. Dans l’autobus ${dn(q.n)}, il y a ${b} élèves. Combien d’élèves de plus y a-t-il dans l’autobus ${dn(p.n)}?`, `On ${p.n}’s bus there are ${a} students. On ${q.n}’s bus there are ${b} students. How many more students are on ${p.n}’s bus?`, '🚌'],
    (p, q, a, b) => [`${p.n} a mangé ${a} crêpes. ${q.n} en a mangé ${b}. Combien de crêpes ${p.n} a-t-${il(p)} mangées de plus?`, `${p.n} ate ${a} pancakes. ${q.n} ate ${b}. How many more pancakes did ${p.n} eat?`, '🥞'],
    (p, q, a, b) => [`Dans la forêt, il y a ${a} érables. Il y a ${b} sapins. Combien y a-t-il d’érables de plus que de sapins?`, `In the forest there are ${a} maple trees and ${b} fir trees. How many more maples than firs are there?`, '🌲'],
  ],
  miss: [
    (p, q, a, b) => [`${p.n} veut ${a} pommes pour faire une tarte. ${Il(p)} en a déjà ${b}. Combien de pommes lui manque-t-il?`, `${p.n} needs ${a} apples to make a pie. ${He(p)} already has ${b}. How many more apples does ${he(p)} need?`, '🍎'],
    (p, q, a, b) => [`Il y a ${a} places dans l’autobus. ${b} places sont occupées. Combien de places sont libres?`, `There are ${a} seats on the bus. ${b} seats are taken. How many seats are free?`, '🚌'],
    (p, q, a, b) => [`${p.n} veut avoir ${a} cartes de hockey. ${Il(p)} en a ${b}. Combien de cartes doit-${il(p)} encore trouver?`, `${p.n} wants to have ${a} hockey cards. ${He(p)} has ${b}. How many more cards does ${he(p)} need to find?`, '🃏'],
    (p, q, a, b) => [`Une équipe de hockey a ${a} joueurs. ${b} joueurs sont sur la glace. Combien de joueurs sont sur le banc?`, `A hockey team has ${a} players. ${b} players are on the ice. How many players are on the bench?`, '🏒'],
    (p, q, a, b) => [`Pour la fête à la cabane à sucre, il faut ${a} assiettes. Il y en a déjà ${b}. Combien d’assiettes faut-il encore ajouter?`, `For the party at the sugar shack, we need ${a} plates. There are already ${b}. How many more plates do we need to add?`, '🍽️'],
    (p, q, a, b) => [`${p.n} veut ${a} $ pour acheter un jouet. ${Il(p)} a déjà ${b} $. Combien d’argent lui manque-t-il?`, `${p.n} wants $${a} to buy a toy. ${He(p)} already has $${b}. How much more money does ${he(p)} need?`, '🧸'],
  ],
  two: [
    (p, q, a, b, c) => [`${p.n} a ${a} autocollants. ${Il(p)} en reçoit ${b}, puis en donne ${c}. Combien d’autocollants a-t-${il(p)} maintenant?`, `${p.n} has ${a} stickers. ${He(p)} gets ${b} more, then gives away ${c}. How many stickers does ${he(p)} have now?`, '⭐'],
    (p, q, a, b, c) => [`Dans l’autobus, il y a ${a} élèves. ${b} élèves montent et ${c} élèves descendent. Combien d’élèves y a-t-il maintenant?`, `There are ${a} students on the bus. ${b} get on and ${c} get off. How many students are on the bus now?`, '🚌'],
    (p, q, a, b, c) => [`À la patinoire, ${a} garçons et ${b} filles patinent. Puis ${c} personnes partent. Combien de personnes restent sur la glace?`, `At the rink, ${a} boys and ${b} girls are skating. Then ${c} people leave. How many people are left on the ice?`, '⛸️'],
    (p, q, a, b, c) => [`${p.n} a ${a} cartes de hockey. ${Il(p)} en achète ${b}, puis en échange ${c}. Combien de cartes a-t-${il(p)} à la fin?`, `${p.n} has ${a} hockey cards. ${He(p)} buys ${b} more, then trades away ${c}. How many cards does ${he(p)} have at the end?`, '🃏'],
    (p, q, a, b, c) => [`Au dépanneur, ${p.n} a ${a} $. ${Il(p)} reçoit ${b} $ de sa grand-mère, puis dépense ${c} $. Combien d’argent lui reste-t-il?`, `At the corner store, ${p.n} has $${a}. ${He(p)} gets $${b} from ${her(p)} grandma, then spends $${c}. How much money is left?`, '💰'],
  ],
  dbl: [
    (p, q, a) => [`${p.n} a ${a} billes. ${q.n} en a le double. Combien de billes ${q.n} a-t-${il(q)}?`, `${p.n} has ${a} marbles. ${q.n} has double. How many marbles does ${q.n} have?`, '🔮', 2 * a],
    (p, q, a) => [`Au hockey, ${p.n} marque ${a} buts. ${q.n} en marque le double. Combien de buts ${q.n} marque-t-${il(q)}?`, `In hockey, ${p.n} scores ${a} goals. ${q.n} scores double. How many goals does ${q.n} score?`, '🏒', 2 * a],
    (p, q, a) => [`${p.n} a ${a} tuques. ${q.n} en a le double. Combien de tuques y a-t-il en tout?`, `${p.n} has ${a} hats. ${q.n} has double. How many hats do they have in all?`, '🧢', 3 * a],
    (p, q, a) => [`Chaque jour, ${p.n} mange ${a} biscuits. Combien de biscuits mange-t-${il(p)} en 2 jours?`, `Every day, ${p.n} eats ${a} cookies. How many cookies does ${he(p)} eat in 2 days?`, '🍪', 2 * a],
  ],
};
// ---------- units ----------
export const units = [
  {
    id: 'm1', icon: '🔢',
    title: T('Les nombres jusqu’à 1000', 'Numbers to 1000'),
    pfeq: 'Arithmétique — lire, écrire, représenter les nombres naturels < 1000',
    generate(level, R) {
      if (level === 1) {
        if (R.chance(0.5)) {
          const n = R.int(6, 20), e = R.pick(OBJ);
          return { type: 'keypad', key: `cnt${n}${e}`, prompt: T('Combien y en a-t-il?', 'How many are there?'), stimulus: { emojis: e, count: n }, answer: n };
        }
        const n = R.int(11, 99);
        return { type: 'base10', key: `b${n}`, prompt: T(`Construis le nombre ${n}.`, `Build the number ${n}.`), answer: n };
      }
      if (level === 2) {
        const n = R.int(101, 999);
        if (R.chance(0.5)) return { type: 'base10', key: `b${n}`, prompt: T(`Construis le nombre ${n}.`, `Build the number ${n}.`), answer: n };
        // which number is shown? distractors swap digits / off by ten
        const h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, u = n % 10;
        const cands = [u * 100 + t * 10 + h, h * 100 + u * 10 + t, n + 10, n - 10, n + 100, n - 1].filter((v) => v !== n && v > 0 && v < 1000);
        const d = R.sample([...new Set(cands)], 3);
        return { type: 'choice', key: `pic${n}`, prompt: T('Quel nombre est représenté?', 'Which number is shown?'), stimulus: { svg: S.base10(n) }, ...numChoice(n, d), cols: 4 };
      }
      // level 3: number words both ways, number line to 1000
      const kind = R.int(0, 2);
      if (kind === 0) {
        const n = R.int(21, 999);
        return { type: 'keypad', key: `w${n}`, prompt: T('Écris ce nombre en chiffres.', 'Write this number in digits.'), stimulus: { text: { fr: frWords(n), en: enWords(n) } }, say: SAY(frWords(n), enWords(n)), answer: n };
      }
      if (kind === 1) {
        const n = R.int(21, 999);
        const d = R.sample(near(R, n, 8, 30, 1, 999), 3);
        return {
          type: 'choice', key: `wc${n}`, prompt: T(`Comment s’écrit ${n} en lettres?`, `How do you write ${n} in words?`), cols: 2,
          options: [n, ...d].map((v) => ({ text: { fr: frWords(v), en: enWords(v) } })), answer: 0,
        };
      }
      const n = R.int(1, 9) * 100;
      return { type: 'numberline', key: `nl${n}`, prompt: T(`Touche le nombre ${n}.`, `Tap the number ${n}.`), min: 0, max: 1000, step: 100, answer: n };
    },
  },
  {
    id: 'm2', icon: '🧱',
    title: T('Unités, dizaines, centaines', 'Ones, tens, hundreds'),
    pfeq: 'Arithmétique — valeur de position, groupements par 10, décomposition',
    generate(level, R) {
      const max = level === 1 ? 99 : 999;
      const n = R.int(level === 1 ? 12 : 102, max);
      const h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, u = n % 10;
      const pos = level === 1 ? R.pick(['u', 't']) : R.pick(['u', 't', 'h']);
      const k = R.int(0, level === 3 ? 2 : 1);
      if (k === 0) {
        const name = { u: T('unités', 'ones'), t: T('dizaines', 'tens'), h: T('centaines', 'hundreds') }[pos];
        const ans = { u, t, h }[pos];
        const digits = [...new Set(String(n).split('').map(Number))];
        const pool = [...new Set([...digits, ...near(R, ans, 4, 4, 0, 9)])].filter((v) => v !== ans);
        return {
          type: 'choice', key: `pv${n}${pos}`, cols: 4,
          prompt: T(`Dans ${n}, quel est le chiffre des ${name.fr}?`, `In ${n}, which digit is in the ${name.en} place?`),
          say: SAY(`Dans ${n}, quel est le chiffre des ${name.fr}?`, `In ${n}, which digit is in the ${name.en} place?`),
          stimulus: { text: String(n) }, ...numChoice(ans, R.sample(pool, 3)),
        };
      }
      if (k === 1) {
        const fr = h ? `${h} centaines, ${t} dizaines et ${u} unités` : `${t} dizaines et ${u} unités`;
        const en = h ? `${h} hundreds, ${t} tens and ${u} ones` : `${t} tens and ${u} ones`;
        return { type: 'keypad', key: `cmp${n}`, prompt: T('Quel nombre est-ce?', 'Which number is it?'), stimulus: { text: T(fr, en) }, say: SAY(fr, en), answer: n };
      }
      // shuffled expanded form: 7 + 300 + 40
      const parts = R.shuffle([h * 100, t * 10, u].filter(Boolean));
      return { type: 'keypad', key: `exp${parts.join('+')}`, prompt: T('Calcule.', 'Work it out.'), stimulus: { text: parts.join(' + ') + ' = ?' }, answer: n };
    },
  },
  {
    id: 'm3', icon: '⚖️',
    title: T('Comparer et ordonner', 'Compare and order'),
    pfeq: 'Arithmétique — comparer, ordonner, symboles <, >, =, droite numérique',
    generate(level, R) {
      const max = [0, 50, 200, 999][level];
      const k = R.int(0, 2);
      if (k === 0) {
        const a = R.int(1, max);
        const b = R.chance(0.2) ? a : R.chance(0.5) ? R.int(1, max) : Math.max(1, Math.min(max, a + R.int(-9, 9)));
        const sym = a < b ? 0 : a > b ? 1 : 2;
        return {
          type: 'choice', key: `cmp${a}_${b}`, prompt: T('Quel signe va dans la case?', 'Which sign goes in the box?'),
          stimulus: { text: `${a}  ☐  ${b}` }, options: [{ text: '<' }, { text: '>' }, { text: '=' }], answer: sym, fixedOrder: true, cols: 3,
        };
      }
      if (k === 1) {
        const count = level === 1 ? 3 : level === 2 ? 4 : 5;
        const set = new Set();
        while (set.size < count) set.add(R.int(1, max));
        const asc = [...set].sort((x, y) => x - y);
        const up = level < 3 || R.chance(0.5);
        const tiles = (up ? asc : asc.slice().reverse()).map(String);
        return {
          type: 'order', key: `ord${tiles.join(',')}`, joiner: '  ',
          prompt: up ? T('Place les nombres du plus petit au plus grand.', 'Put the numbers from smallest to biggest.')
                     : T('Place les nombres du plus grand au plus petit.', 'Put the numbers from biggest to smallest.'),
          tiles,
        };
      }
      const conf = [null, { max: 20, step: 1 }, { max: 100, step: 10 }, { max: 100, step: 5 }][level];
      const ans = R.int(1, conf.max / conf.step - 1) * conf.step;
      return { type: 'numberline', key: `nl${conf.max}_${ans}`, prompt: T(`Touche le nombre ${ans}.`, `Tap the number ${ans}.`), min: 0, max: conf.max, step: conf.step, answer: ans };
    },
  },
  {
    id: 'm4', icon: '👫',
    title: T('Pair ou impair', 'Even or odd'),
    pfeq: 'Arithmétique — nombres pairs et impairs',
    generate(level, R) {
      const max = [0, 20, 100, 999][level];
      if (level === 1 && R.chance(0.4)) {
        const n = R.int(2, 12), e = R.pick(OBJ);
        return {
          type: 'choice', key: `pe${n}${e}`, prompt: T('Fais des paires. Ce nombre est-il pair ou impair?', 'Make pairs. Is this number even or odd?'),
          stimulus: { emojis: e, count: n }, options: [{ text: T('pair', 'even') }, { text: T('impair', 'odd') }], answer: n % 2, fixedOrder: true, cols: 2,
        };
      }
      const nums = new Set();
      while (nums.size < 6) nums.add(R.int(1, max));
      const arr = [...nums];
      if (arr.every((v) => v % 2 === arr[0] % 2)) arr[0] += 1;
      return {
        type: 'sort', key: `pi${arr.join(',')}`, prompt: T('Classe les nombres.', 'Sort the numbers.'),
        bins: [{ text: T('pair', 'even'), emoji: '👫' }, { text: T('impair', 'odd'), emoji: '🧍' }],
        items: arr.map((v) => ({ text: String(v), bin: v % 2 })),
      };
    },
  },
  {
    id: 'm5', icon: '➕',
    title: T('L’addition', 'Addition'),
    pfeq: 'Opérations — sens de l’addition, répertoire mémorisé, calcul mental',
    generate(level, R) {
      let a, b;
      if (level === 1) { a = R.int(1, 9); b = R.int(1, 10 - a); }
      else if (level === 2) { a = R.int(2, 10); b = R.int(2, 10); if (R.chance(0.3)) { a = R.int(1, 9) * 10; b = R.int(1, 9); } }
      else { a = R.int(11, 69); b = R.int(5, 29); if (R.chance(0.3)) { a = R.int(1, 5) * 100; b = R.int(1, 3) * 100 + R.int(0, 9) * 10; } }
      if (level === 1 && R.chance(0.4)) {
        const e = R.pick(OBJ);
        return { type: 'keypad', key: `pa${a}+${b}${e}`, prompt: T('Combien en tout?', 'How many altogether?'), stimulus: { text: `${e.repeat(a)} + ${e.repeat(b)}` }, answer: a + b };
      }
      if (level >= 2 && R.chance(0.3)) {
        return { type: 'choice', key: `ac${a}+${b}`, prompt: T('Calcule.', 'Work it out.'), stimulus: { text: `${a} + ${b} = ?` }, ...numChoice(a + b, near(R, a + b, 3, 10, 0)), cols: 4 };
      }
      return { type: 'keypad', key: `a${a}+${b}`, prompt: T('Calcule.', 'Work it out.'), stimulus: { text: `${a} + ${b} = ?` }, answer: a + b };
    },
  },
  {
    id: 'm6', icon: '➖',
    title: T('La soustraction', 'Subtraction'),
    pfeq: 'Opérations — sens de la soustraction, terme manquant, calcul mental',
    generate(level, R) {
      let a, b;
      if (level === 1) { a = R.int(3, 10); b = R.int(1, a - 1); }
      else if (level === 2) { a = R.int(11, 20); b = R.int(2, 9); }
      else { a = R.int(30, 99); b = R.int(5, a - 10); if (R.chance(0.3)) b = R.int(1, Math.floor((a - 10) / 10)) * 10; }
      const c = a - b;
      const kinds = level === 1 ? [0, 1, 2, 4, 5, 7] : level === 2 ? [0, 1, 2, 3, 5, 6, 7] : [0, 1, 2, 3, 6, 7, 8];
      const k = R.pick(kinds);
      if (k === 0) return { type: 'keypad', key: `s${a}-${b}`, prompt: T('Calcule.', 'Work it out.'), stimulus: { text: `${a} − ${b} = ?` }, answer: c };
      if (k === 1) return { type: 'keypad', key: `m${b}+?=${a}`, prompt: T('Quel nombre manque?', 'Which number is missing?'), stimulus: { text: `${b} + ? = ${a}` }, answer: c };
      if (k === 2) return { type: 'keypad', key: `ms${a}-?=${c}`, prompt: T('Quel nombre manque?', 'Which number is missing?'), stimulus: { text: `${a} − ? = ${c}` }, answer: b };
      if (k === 3) return { type: 'keypad', key: `mf?-${b}=${c}`, prompt: T('Quel nombre manque?', 'Which number is missing?'), stimulus: { text: `? − ${b} = ${c}` }, answer: a };
      if (k === 4) {
        const e = R.pick(OBJ);
        const fr = `Il y a ${a} ${e}. On en enlève ${b}. Combien en reste-t-il?`, en = `There are ${a} ${e}. We take away ${b}. How many are left?`;
        return { type: 'keypad', key: `ps${a}-${b}${e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { emojis: e, count: a }, answer: c };
      }
      if (k === 5) {
        return { type: 'choice', key: `sc${a}-${b}`, prompt: T('Calcule.', 'Work it out.'), stimulus: { text: `${a} − ${b} = ?` }, ...numChoice(c, near(R, c, 3, level === 1 ? 3 : 6, 0, 99)), cols: 4 };
      }
      if (k === 6) {
        // which subtraction is true?
        const wrong = near(R, c, 6, 3, 0, 99).filter((v) => v !== c);
        const opts = [c, ...R.sample(wrong, 2)].map((v) => ({ text: `${a} − ${b} = ${v}` }));
        return { type: 'choice', key: `tf${a}-${b}`, prompt: T('Quelle égalité est vraie?', 'Which equation is true?'), options: opts, answer: 0, cols: 3 };
      }
      if (k === 7) {
        // fact family
        const s = a, x = b;
        return { type: 'keypad', key: `ff${s}-${x}`, prompt: T('Utilise l’addition pour t’aider.', 'Use the addition to help you.'), stimulus: { text: `${x} + ${c} = ${s}   →   ${s} − ${x} = ?` }, answer: c };
      }
      // k === 8 : tens
      const A = R.int(3, 9) * 10 + (R.chance(0.5) ? 0 : R.int(1, 9)), B = R.int(1, 2) * 10;
      return { type: 'keypad', key: `st${A}-${B}`, prompt: T('Calcule.', 'Work it out.'), stimulus: { text: `${A} − ${B} = ?` }, answer: A - B };
    },
  },
  {
    id: 'm7', icon: '🧩',
    title: T('Petits problèmes', 'Word problems'),
    pfeq: 'Résoudre une situation-problème — ajout, retrait, réunion, comparaison',
    generate(level, R) {
      const [p, q] = R.sample(PEOPLE, 2);
      const max = [0, 10, 20, 60][level];
      const kinds = level === 1 ? ['add', 'sub', 'miss'] : level === 2 ? ['add', 'sub', 'cmp', 'miss'] : ['add', 'sub', 'cmp', 'miss', 'two', 'dbl'];
      const kind = R.pick(kinds);
      const list = WP[kind];
      const ti = R.int(0, list.length - 1);
      let a, b, c = 0, ans;
      if (kind === 'add') { a = R.int(2, max - 2); b = R.int(2, max - a); ans = a + b; }
      else if (kind === 'sub') { a = R.int(4, max); b = R.int(2, a - 1); ans = a - b; }
      else if (kind === 'cmp') { a = R.int(4, max); b = R.int(2, a - 2); ans = a - b; }
      else if (kind === 'miss') { a = R.int(5, max); b = R.int(2, a - 2); ans = a - b; }
      else if (kind === 'two') { a = R.int(10, 40); b = R.int(3, 20); c = R.int(2, Math.min(25, a + b - 1)); ans = a + b - c; }
      else { a = R.int(3, 20); b = 0; }
      const [fr, en, e, ans2] = list[ti](p, q, a, b, c);
      if (ans2 != null) ans = ans2;
      return { type: 'keypad', key: `wp${kind}${ti}${p.n}${q.n}${a}_${b}_${c}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { emoji: e }, answer: ans };
    },
  },
  {
    id: 'm8', icon: '🔁',
    title: T('Les suites', 'Patterns'),
    pfeq: 'Arithmétique — suites de nombres et régularités (par bonds)',
    generate(level, R) {
      if (level === 1 && R.chance(0.5)) {
        const [a, b, c] = R.sample(OBJ, 3);
        const motif = R.pick([[a, b], [a, a, b], [a, b, c]]);
        const seq = [];
        for (let i = 0; i < motif.length * 2 + 1; i++) seq.push(motif[i % motif.length]);
        const ans = motif[seq.length % motif.length];
        const opts = [...new Set([ans, a, b, c])];
        return {
          type: 'choice', key: `pat${seq.join('')}`, prompt: T('Qu’est-ce qui vient ensuite?', 'What comes next?'),
          stimulus: { text: seq.join(' ') + ' ❓' }, options: opts.map((e) => ({ emoji: e })), answer: 0, cols: opts.length,
        };
      }
      const steps = [null, [1, 2, 5, 10], [2, 5, 10, -2, -10], [3, 4, 25, 100, -5, -100]][level];
      const step = R.pick(steps);
      const start = step < 0 ? R.int(Math.abs(step) * 6, Math.abs(step) * 6 + 40) : R.int(0, level === 3 ? 300 : 40);
      const seq = Array.from({ length: 6 }, (_, i) => start + i * step);
      const hole = level === 3 ? R.int(1, 5) : 5;
      const shown = seq.map((v, i) => (i === hole ? '?' : v)).join(', ');
      return { type: 'keypad', key: `seq${seq.join(',')}h${hole}`, prompt: T('Quel nombre manque dans la suite?', 'Which number is missing?'), stimulus: { text: shown }, answer: seq[hole] };
    },
  },
  {
    id: 'm9', icon: '🍕',
    title: T('Les fractions', 'Fractions'),
    pfeq: 'Fractions — partage en parts égales, demi, tiers, quart',
    generate(level, R) {
      const FW = { 2: T('un demi', 'one half'), 3: T('un tiers', 'one third'), 4: T('un quart', 'one quarter') };
      const k = R.pick(level === 1 ? [0, 1, 2, 3, 4] : level === 2 ? [0, 1, 2, 3, 4, 5] : [0, 2, 3, 4, 5, 6]);
      const kind = R.pick(['rect', 'circle']);
      if (k === 0) {
        const parts = R.pick(level === 1 ? [2, 4] : [2, 3, 4]);
        const good = S.fraction(parts, 0, kind, true);
        const bad1 = S.fraction(parts, 0, kind, false);
        const bad2 = S.fraction(parts === 2 ? 3 : parts - 1, 0, kind, true);
        const name = { 2: T('2 parts égales', '2 equal parts'), 3: T('3 parts égales', '3 equal parts'), 4: T('4 parts égales', '4 equal parts') }[parts];
        return { type: 'choice', key: `fair${parts}${kind}`, prompt: T(`Quelle image montre ${name.fr}?`, `Which picture shows ${name.en}?`), say: SAY(`Quelle image montre ${name.fr}?`, `Which picture shows ${name.en}?`), options: [{ svg: good }, { svg: bad1 }, { svg: bad2 }], answer: 0, cols: 3 };
      }
      if (k === 1) {
        const parts = R.pick(level === 1 ? [2, 4] : [2, 3, 4]);
        return {
          type: 'choice', key: `frac${parts}${kind}`, prompt: T('Quelle partie est coloriée?', 'What part is coloured?'), say: SAY('Quelle partie est coloriée?', 'What part is coloured?'),
          stimulus: { svg: S.fraction(parts, 1, kind, true) },
          options: [2, 3, 4].map((p) => ({ text: T(`${FW[p].fr} (1/${p})`, `${FW[p].en} (1/${p})`) })), answer: [2, 3, 4].indexOf(parts), fixedOrder: true, cols: 3,
        };
      }
      if (k === 2) {
        const kids = level === 1 ? 2 : R.pick([2, 3, 4]), each = R.int(level === 1 ? 1 : 2, level === 1 ? 6 : 8), th = R.pick(THINGS);
        const n = kids * each;
        const fr = `On partage ${n} ${th.fr[1]} entre ${kids} amis. Combien chaque ami en reçoit-il?`;
        const en = `We share ${n} ${th.en[1]} between ${kids} friends. How many does each friend get?`;
        return { type: 'keypad', key: `share${n}/${kids}${th.e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { emojis: th.e, count: n }, answer: each };
      }
      if (k === 3) {
        // fraction of a collection
        const cfg = level === 1 ? [[2, 'Quelle est la moitié', 'half', 2, 6]] : level === 2 ? [[2, 'Quelle est la moitié', 'half', 2, 10], [3, 'Quel est le tiers', 'a third', 2, 6]] : [[2, 'Quelle est la moitié', 'half', 5, 25], [3, 'Quel est le tiers', 'a third', 4, 10], [4, 'Quel est le quart', 'a quarter', 3, 10]];
        const [d, wfr, wen, lo, hi] = R.pick(cfg);
        const each = R.int(lo, hi), n = d * each;
        const fr = `${wfr} de ${n}?`, en = `What is ${wen} of ${n}?`;
        const e = R.pick(OBJ);
        return { type: 'keypad', key: `of${d}_${n}${n <= 20 ? e : ''}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: n <= 20 ? { emojis: e, count: n } : { text: String(n) }, answer: each };
      }
      if (k === 4) {
        // which picture has the named part coloured?
        const target = R.pick(level === 1 ? [2, 4] : [2, 3, 4]);
        const opts = [2, 3, 4].map((p) => ({ svg: S.fraction(p, 1, kind, true) }));
        return { type: 'choice', key: `pic${target}${kind}`, prompt: T(`Quelle image a ${FW[target].fr} de colorié?`, `Which picture has ${FW[target].en} coloured?`), say: SAY(`Quelle image a ${FW[target].fr} de colorié?`, `Which picture has ${FW[target].en} coloured?`), options: opts, answer: target - 2, fixedOrder: true, cols: 3 };
      }
      if (k === 5) {
        const ps = R.sample([2, 3, 4, 5, 6], 3);
        const small = Math.min(...ps);
        return { type: 'choice', key: `big${ps.slice().sort().join('')}`, prompt: T('Quelle part colorée est la plus grande?', 'Which coloured part is the biggest?'), say: SAY('Quelle part colorée est la plus grande?', 'Which coloured part is the biggest?'), options: ps.map((p) => ({ svg: S.fraction(p, 1, 'rect', true) })), answer: ps.indexOf(small), fixedOrder: true, cols: 3 };
      }
      // k === 6 : k/n coloured
      const n = R.pick([3, 4, 5, 6]), sh = R.int(2, n - 1);
      const cands = [[sh + 1, n], [sh - 1, n], [sh, n + 1], [n - sh, n], [sh, n - 1]].filter(([a, b]) => a >= 1 && a < b && a * n !== sh * b);
      const uniq = [];
      for (const c of cands) if (!uniq.some((u) => u[0] * c[1] === c[0] * u[1])) uniq.push(c);
      const wrong = R.sample(uniq, 2);
      const labelOf = ([a, b]) => ({ text: `${a}/${b}` });
      return { type: 'choice', key: `frk${sh}/${n}${kind}`, prompt: T('Quelle fraction est coloriée?', 'Which fraction is coloured?'), stimulus: { svg: S.fraction(n, sh, kind, true) }, options: [[sh, n], ...wrong].map(labelOf), answer: 0, cols: 3 };
    },
  },
  {
    id: 'm10', icon: '🔷',
    title: T('Figures et solides', 'Shapes and solids'),
    pfeq: 'Géométrie — figures planes, solides, faces planes/courbes',
    generate(level, R) {
      const FIG = { carre: T('carré', 'square'), rectangle: T('rectangle', 'rectangle'), triangle: T('triangle', 'triangle'), cercle: T('cercle', 'circle'), losange: T('losange', 'rhombus'), hexagone: T('hexagone', 'hexagon'), pentagone: T('pentagone', 'pentagon') };
      const SOL = { cube: T('cube', 'cube'), prisme: T('prisme', 'prism'), pyramide: T('pyramide', 'pyramid'), sphere: T('sphère', 'sphere'), cylindre: T('cylindre', 'cylinder'), cone: T('cône', 'cone') };
      const SIDES = { carre: 4, rectangle: 4, triangle: 3, losange: 4, hexagone: 6, pentagone: 5 };
      const COL = [S.COLORS.purple, S.COLORS.blue, S.COLORS.green, S.COLORS.orange, S.COLORS.pink, S.COLORS.yellow];
      const colIdx = (n) => R.sample([0, 1, 2, 3, 4, 5], n);
      const L1F = ['carre', 'rectangle', 'triangle', 'cercle'];
      const kinds = level === 1 ? [0, 1, 2, 3, 4, 5, 8, 10] : level === 2 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11] : [1, 2, 5, 6, 7, 10, 11, 12, 4];
      const k = R.pick(kinds);
      if (k === 0) {
        const keys = level === 1 ? L1F : Object.keys(FIG);
        const ans = R.pick(keys);
        const d = R.sample(keys.filter((x) => x !== ans && !(ans === 'carre' && x === 'rectangle') && !(ans === 'rectangle' && x === 'carre')), 2);
        const ci = colIdx(3);
        return { type: 'choice', key: `fig${ans}${d.join('')}${ci.join('')}`, prompt: T(`Touche le ${FIG[ans].fr}.`, `Tap the ${FIG[ans].en}.`), say: SAY(`Touche le ${FIG[ans].fr}.`, `Tap the ${FIG[ans].en}.`), options: [ans, ...d].map((x, i) => ({ svg: S.shape(x, COL[ci[i]]) })), answer: 0, cols: 3 };
      }
      if (k === 1) {
        const keys = Object.keys(SOL);
        const ans = R.pick(keys), d = R.sample(keys.filter((x) => x !== ans), level === 1 ? 2 : 3);
        return { type: 'choice', key: `sol${ans}${d.join('')}`, prompt: T(`Touche le solide : ${SOL[ans].fr}.`, `Tap the ${SOL[ans].en}.`), say: SAY(`Touche : ${SOL[ans].fr}.`, `Tap the ${SOL[ans].en}.`), options: [ans, ...d].map((x) => ({ svg: S.solid(x) })), answer: 0, cols: d.length + 1 };
      }
      if (k === 2) {
        const keys = level === 1 ? ['carre', 'rectangle', 'triangle'] : Object.keys(SIDES);
        const f = R.pick(keys), ci = R.int(0, 5);
        return { type: 'keypad', key: `sides${f}${ci}`, prompt: T('Combien de côtés a cette figure?', 'How many sides does this shape have?'), stimulus: { svg: S.shape(f, COL[ci]) }, answer: SIDES[f] };
      }
      if (k === 3) {
        const items = R.sample(Object.keys(SOL), 5);
        const rolls = (x) => (['sphere', 'cylindre', 'cone'].includes(x) ? 0 : 1);
        if (items.every((x) => rolls(x) === rolls(items[0]))) items[0] = rolls(items[0]) ? 'sphere' : 'cube';
        return {
          type: 'sort', key: `roll${items.join()}`, prompt: T('Ce solide roule-t-il?', 'Does this solid roll?'),
          bins: [{ text: T('roule', 'rolls'), emoji: '⚽' }, { text: T('ne roule pas', 'does not roll'), emoji: '🧱' }],
          items: [...new Set(items)].map((x) => ({ svg: S.solid(x), bin: rolls(x) })),
        };
      }
      if (k === 4) {
        const REAL = [['⚽', 'sphere'], ['🏀', 'sphere'], ['🎾', 'sphere'], ['🌍', 'sphere'], ['🎲', 'cube'], ['🧊', 'cube'], ['🥫', 'cylindre'], ['🧻', 'cylindre'], ['🛢️', 'cylindre'], ['🥁', 'cylindre'], ['🔋', 'cylindre'], ['🍦', 'cone'], ['📦', 'prisme'], ['🧱', 'prisme']];
        const [e, ans] = R.pick(REAL);
        const d = R.sample(Object.keys(SOL).filter((x) => x !== ans && !(ans === 'cube' && x === 'prisme') && !(ans === 'prisme' && x === 'cube')), 2);
        return { type: 'choice', key: `real${e}${d.join('')}`, prompt: T('Cet objet ressemble à quel solide?', 'Which solid does this object look like?'), stimulus: { emoji: e }, options: [ans, ...d].map((x) => ({ svg: S.solid(x) })), answer: 0, cols: 3 };
      }
      if (k === 5) {
        if (level === 3 || (level === 2 && R.chance(0.4))) {
          const FACTS = [
            ['cube', 'Combien de faces a un cube?', 'How many faces does a cube have?', 6],
            ['cube', 'Combien de sommets (coins) a un cube?', 'How many corners does a cube have?', 8],
            ['cube', 'Combien d’arêtes a un cube?', 'How many edges does a cube have?', 12],
            ['cylindre', 'Combien de faces planes a un cylindre?', 'How many flat faces does a cylinder have?', 2],
            ['cone', 'Combien de faces planes a un cône?', 'How many flat faces does a cone have?', 1],
            ['sphere', 'Combien de faces planes a une sphère?', 'How many flat faces does a sphere have?', 0],
          ];
          const [s, fr, en, ans] = R.pick(FACTS);
          return { type: 'keypad', key: `fact${fr}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.solid(s) }, answer: ans };
        }
        const f = R.pick(['carre', 'rectangle', 'triangle']), ci = R.int(0, 5);
        return { type: 'keypad', key: `corn${f}${ci}`, prompt: T('Combien de coins a cette figure?', 'How many corners does this shape have?'), stimulus: { svg: S.shape(f, COL[ci]) }, answer: SIDES[f] };
      }
      if (k === 6) {
        const four = ['carre', 'rectangle', 'losange'], other = ['triangle', 'cercle', 'hexagone', 'pentagone'];
        const items = [...R.sample(four, R.int(2, 3)), ...R.sample(other, R.int(2, 3))].slice(0, 6);
        return {
          type: 'sort', key: `four${items.join()}`, prompt: T('Classe les figures.', 'Sort the shapes.'),
          bins: [{ text: T('4 côtés', '4 sides'), emoji: '4️⃣' }, { text: T('pas 4 côtés', 'not 4 sides'), emoji: '🚫' }],
          items: R.shuffle(items).map((x) => ({ svg: S.shape(x, COL[R.int(0, 5)]), bin: four.includes(x) ? 0 : 1 })),
        };
      }
      if (k === 7) {
        const flat = ['cube', 'prisme', 'pyramide'], curved = ['sphere', 'cylindre', 'cone'];
        const items = [...R.sample(flat, R.int(2, 3)), ...R.sample(curved, R.int(2, 3))];
        return {
          type: 'sort', key: `curve${items.join()}`, prompt: T('Ce solide a-t-il une face courbe?', 'Does this solid have a curved face?'),
          bins: [{ text: T('face courbe', 'curved face'), emoji: '🌀' }, { text: T('que des faces plates', 'only flat faces'), emoji: '⬛' }],
          items: R.shuffle(items).map((x) => ({ svg: S.solid(x), bin: curved.includes(x) ? 0 : 1 })),
        };
      }
      if (k === 8) {
        const keys = level === 1 ? L1F : Object.keys(FIG);
        const f = R.pick(keys), ci = R.int(0, 5);
        const d = R.sample(keys.filter((x) => x !== f && !(f === 'carre' && x === 'rectangle') && !(f === 'rectangle' && x === 'carre')), 2);
        return { type: 'choice', key: `name${f}${ci}${d.join('')}`, prompt: T('Comment s’appelle cette figure?', 'What is this shape called?'), say: SAY('Comment s’appelle cette figure?', 'What is this shape called?'), stimulus: { svg: S.shape(f, COL[ci]) }, options: [f, ...d].map((x) => ({ text: FIG[x] })), answer: 0, cols: 3 };
      }
      if (k === 10) {
        const E = [['🟥', 'carre'], ['🟦', 'carre'], ['🟩', 'carre'], ['🟨', 'carre'], ['🟧', 'carre'], ['🟪', 'carre'], ['🔴', 'cercle'], ['🔵', 'cercle'], ['🟢', 'cercle'], ['🟡', 'cercle'], ['🟠', 'cercle'], ['🟣', 'cercle'], ['🔺', 'triangle'], ['🔻', 'triangle'], ['🔷', 'losange'], ['🔶', 'losange']];
        const [e, ans] = R.pick(E);
        const pool = level === 1 ? L1F : ['carre', 'cercle', 'triangle', 'losange', 'rectangle'];
        const d = R.sample(pool.filter((x) => x !== ans && !(ans === 'carre' && x === 'rectangle')), 2);
        return { type: 'choice', key: `emo${e}${d.join('')}`, prompt: T('Quelle est la forme de cette image?', 'What shape is this picture?'), stimulus: { emoji: e }, options: [ans, ...d].map((x) => ({ text: FIG[x] })), answer: 0, cols: 3 };
      }
      if (k === 11) {
        const RID = [
          ['cylindre', 'J’ai 2 faces planes et une face courbe.', 'I have 2 flat faces and one curved face.'],
          ['sphere', 'Je n’ai aucune face plate. Je roule partout.', 'I have no flat face. I roll everywhere.'],
          ['cone', 'J’ai une pointe, une face plate et une face courbe.', 'I have one point, one flat face and one curved face.'],
          ['cube', 'J’ai 6 faces carrées.', 'I have 6 square faces.'],
          ['pyramide', 'J’ai une pointe en haut et des faces triangulaires.', 'I have a point at the top and triangle faces.'],
        ];
        const [ans, fr, en] = R.pick(RID);
        const d = R.sample(Object.keys(SOL).filter((x) => x !== ans && !(ans === 'cube' && x === 'prisme')), 2);
        return { type: 'choice', key: `rid${ans}${d.join('')}`, prompt: T(`Quel solide suis-je? ${fr}`, `Which solid am I? ${en}`), say: SAY(`Quel solide suis-je? ${fr}`, `Which solid am I? ${en}`), options: [ans, ...d].map((x) => ({ svg: S.solid(x) })), answer: 0, cols: 3 };
      }
      // k === 12 : count edges/faces of a flat shape from name -> number of sides of named shape
      const named = R.pick(Object.keys(SIDES));
      return { type: 'keypad', key: `nsides${named}`, prompt: T(`Combien de côtés a un ${FIG[named].fr}?`, `How many sides does a ${FIG[named].en} have?`), say: SAY(`Combien de côtés a un ${FIG[named].fr}?`, `How many sides does a ${FIG[named].en} have?`), answer: SIDES[named] };
    },
  },
  {
    id: 'm11', icon: '⏰',
    title: T('Mesure et temps', 'Measuring and time'),
    pfeq: 'Mesure — longueurs (cm, m), lecture de l’heure, jours, mois, saisons',
    generate(level, R) {
      const fmt = (h, m) => `${h} h ${m === 0 ? '00' : m}`;
      const DAYS = { fr: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'], en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] };
      const MONTHS = { fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'], en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
      const mins = () => (level === 1 ? 0 : level === 2 ? R.pick([0, 30]) : R.pick([0, 15, 30, 45]));
      const kinds = {
        1: ['clock', 'digi', 'ruler', 'unit', 'week', 'dayAfter', 'cal'],
        2: ['clock', 'digi', 'ruler', 'unit', 'timeUnit', 'season', 'dayAfter', 'monthNext', 'plusHours', 'cal'],
        3: ['clock', 'digi', 'ruler', 'unit', 'timeUnit', 'monthNext', 'plusHours', 'duration', 'lenCompare', 'cal', 'season'],
      }[level];
      const k = R.pick(kinds);
      if (k === 'clock') {
        const h = R.int(1, 12), m = mins();
        const set = new Set([fmt(h, m)]);
        const alt = [[h % 12 + 1, m], [h, (m + 30) % 60], [(h + 10) % 12 + 1, m], [m / 5 || 12, h * 5 % 60]];
        for (const [hh, mm] of R.shuffle(alt)) if (set.size < 3 && hh >= 1 && hh <= 12 && [0, 15, 30, 45].includes(mm)) set.add(fmt(hh, mm));
        while (set.size < 3) set.add(fmt(R.int(1, 12), m));
        return { type: 'choice', key: `clk${h}:${m}`, prompt: T('Quelle heure est-il?', 'What time is it?'), stimulus: { svg: S.clock(h, m) }, options: [...set].map((t) => ({ text: t })), answer: 0, cols: 3 };
      }
      if (k === 'digi') {
        const h = R.int(1, 12), m = mins();
        const wrong = [[h % 12 + 1, m], [(h + 10) % 12 + 1, m], [h, m === 0 ? 30 : m === 30 ? 0 : (m + 30) % 60]];
        const opts = [[h, m], ...R.sample(wrong, 2)].map(([hh, mm]) => ({ svg: S.clock(hh, mm) }));
        return { type: 'choice', key: `dg${h}:${m}`, prompt: T(`Quelle horloge montre ${fmt(h, m)}?`, `Which clock shows ${fmt(h, m)}?`), stimulus: { text: fmt(h, m) }, options: opts, answer: 0, cols: 3 };
      }
      if (k === 'ruler') {
        const len = R.int(3, level === 3 ? 15 : 13), e = R.pick(['🐛', '🖍️', '🔑', '🥕', '🐍', '🥖', '🧵']);
        return { type: 'keypad', key: `rul${len}${e}`, prompt: T('Combien de centimètres mesure la bande?', 'How many centimetres long is the strip?'), stimulus: { svg: S.ruler(len, e) }, answer: len };
      }
      if (k === 'unit') {
        const ITEMS = [['✏️', 0, T('un crayon', 'a pencil')], ['🐜', 0, T('une fourmi', 'an ant')], ['🔑', 0, T('une clé', 'a key')], ['🚌', 1, T('un autobus', 'a bus')], ['🏫', 1, T('une école', 'a school')], ['🏠', 1, T('une maison', 'a house')], ['🦒', 1, T('une girafe', 'a giraffe')], ['🥄', 0, T('une cuillère', 'a spoon')], ['🏒', 1, T('un bâton de hockey', 'a hockey stick')], ['🍪', 0, T('un biscuit', 'a cookie')], ['🚪', 1, T('une porte', 'a door')], ['🐌', 0, T('un escargot', 'a snail')]];
        const [e, unit, name] = R.pick(ITEMS);
        return { type: 'choice', key: `unit${e}`, prompt: T(`Pour mesurer ${name.fr}, j’utilise…`, `To measure ${name.en}, I use…`), stimulus: { emoji: e }, options: [{ text: T('des centimètres (cm)', 'centimetres (cm)') }, { text: T('des mètres (m)', 'metres (m)') }], answer: unit, fixedOrder: true, cols: 2 };
      }
      if (k === 'timeUnit') {
        const U = [T('secondes', 'seconds'), T('minutes', 'minutes'), T('heures', 'hours')];
        const ACT = [
          [T('Cligner des yeux', 'Blinking your eyes'), 0], [T('Se brosser les dents', 'Brushing your teeth'), 1], [T('Dormir la nuit', 'Sleeping at night'), 2],
          [T('Regarder un film', 'Watching a movie'), 2], [T('Dire son prénom', 'Saying your name'), 0], [T('Manger une collation', 'Eating a snack'), 1],
          [T('Une période de hockey', 'A hockey period'), 1], [T('Une journée d’école', 'A school day'), 2], [T('Taper des mains une fois', 'Clapping once'), 0],
        ];
        const [name, ans] = R.pick(level === 2 ? ACT.filter((x) => x[1] > 0) : ACT);
        const idxs = level === 2 ? [1, 2] : [0, 1, 2];
        return { type: 'choice', key: `tu${name.fr}`, prompt: T(`${name.fr} dure environ…`, `${name.en} takes about…`), options: idxs.map((i) => ({ text: U[i] })), answer: idxs.indexOf(ans), fixedOrder: true, cols: idxs.length };
      }
      if (k === 'week') {
        const F = [
          ['Combien de jours y a-t-il dans une semaine?', 'How many days are in a week?', 7],
          ['Combien de mois y a-t-il dans une année?', 'How many months are in a year?', 12],
          ['Combien de saisons y a-t-il dans une année?', 'How many seasons are in a year?', 4],
          ['Combien de jours de fin de semaine y a-t-il?', 'How many weekend days are there?', 2],
          ['Combien de jours d’école y a-t-il dans une semaine?', 'How many school days are in a week?', 5],
        ];
        const [fr, en, ans] = R.pick(F);
        return { type: 'keypad', key: `wk${ans}${fr.length}`, prompt: T(fr, en), say: SAY(fr, en), answer: ans };
      }
      if (k === 'dayAfter') {
        const i = R.int(0, 6), after = R.chance(0.5);
        const j = (i + (after ? 1 : 6)) % 7;
        const d = R.sample([...Array(7).keys()].filter((x) => x !== j && x !== i), 2);
        const fr = after ? `Quel jour vient après ${DAYS.fr[i]}?` : `Quel jour vient avant ${DAYS.fr[i]}?`;
        const en = after ? `Which day comes after ${DAYS.en[i]}?` : `Which day comes before ${DAYS.en[i]}?`;
        return { type: 'choice', key: `da${i}${after}`, prompt: T(fr, en), say: SAY(fr, en), options: [j, ...d].map((x) => ({ text: T(DAYS.fr[x], DAYS.en[x]) })), answer: 0, cols: 3 };
      }
      if (k === 'monthNext') {
        const i = R.int(0, 11), after = R.chance(0.5);
        const j = (i + (after ? 1 : 11)) % 12;
        const d = R.sample([...Array(12).keys()].filter((x) => x !== j && x !== i), 2);
        const fr = after ? `Quel mois vient après ${MONTHS.fr[i]}?` : `Quel mois vient avant ${MONTHS.fr[i]}?`;
        const en = after ? `Which month comes after ${MONTHS.en[i]}?` : `Which month comes before ${MONTHS.en[i]}?`;
        return { type: 'choice', key: `mn${i}${after}`, prompt: T(fr, en), say: SAY(fr, en), options: [j, ...d].map((x) => ({ text: T(MONTHS.fr[x], MONTHS.en[x]) })), answer: 0, cols: 3 };
      }
      if (k === 'season') {
        const SM = [[0, 3], [1, 3], [3, 0], [4, 0], [6, 1], [7, 1], [9, 2], [10, 2]]; // month index -> season (0 spring, 1 summer, 2 fall, 3 winter)
        const SN = [{ e: '🌸', t: T('printemps', 'spring') }, { e: '☀️', t: T('été', 'summer') }, { e: '🍂', t: T('automne', 'fall') }, { e: '❄️', t: T('hiver', 'winter') }];
        const [mi, si] = R.pick(SM);
        const fr = `En ${MONTHS.fr[mi]}, quelle saison est-ce au Québec?`;
        const en = `In ${MONTHS.en[mi]}, which season is it in Québec?`;
        const idx = R.sample([0, 1, 2, 3].filter((x) => x !== si), 2);
        return { type: 'choice', key: `ss${mi}`, prompt: T(fr, en), say: SAY(fr, en), options: [si, ...idx].map((x) => ({ emoji: SN[x].e, text: SN[x].t })), answer: 0, cols: 3 };
      }
      if (k === 'plusHours') {
        const h = R.int(1, 12), n = R.int(1, level === 3 ? 5 : 3);
        const ans = ((h + n - 1) % 12) + 1;
        const fr = `Il est ${h} h. Dans ${n} heure${n > 1 ? 's' : ''}, quelle heure sera-t-il?`;
        const en = `It is ${h} o’clock. What time will it be in ${n} hour${n > 1 ? 's' : ''}?`;
        return { type: 'keypad', key: `ph${h}+${n}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.clock(h, 0) }, answer: ans };
      }
      if (k === 'duration') {
        const s = R.int(1, 6), d = R.int(1, 5);
        const ev = R.pick([['Le film', 'The movie', 'commence', 'finit', 'il'], ['La partie de hockey', 'The hockey game', 'commence', 'finit', 'elle'], ['Le cours de natation', 'The swimming class', 'commence', 'finit', 'il']]);
        const fr = `${ev[0]} ${ev[2]} à ${s} h et ${ev[3]} à ${s + d} h. Combien d’heures dure-t-${ev[4]}?`;
        const en = `${ev[1]} starts at ${s} o’clock and ends at ${s + d} o’clock. How many hours does it last?`;
        return { type: 'keypad', key: `du${ev[0]}${s}+${d}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.clock(s, 0) }, answer: d };
      }
      if (k === 'lenCompare') {
        const vals = R.sample([5, 10, 20, 30, 50, 80, 120, 150, 200], 3);
        const lab = (v) => (v % 100 === 0 ? T(`${v / 100} m`, `${v / 100} m`) : T(`${v} cm`, `${v} cm`));
        const big = Math.max(...vals);
        const order = R.chance(0.5);
        const target = order ? big : Math.min(...vals);
        return { type: 'choice', key: `lc${vals.slice().sort((a, b) => a - b).join(',')}${order}`, prompt: order ? T('Quelle longueur est la plus grande? (1 m = 100 cm)', 'Which length is the longest? (1 m = 100 cm)') : T('Quelle longueur est la plus petite? (1 m = 100 cm)', 'Which length is the shortest? (1 m = 100 cm)'), options: vals.map((v) => ({ text: lab(v) })), answer: vals.indexOf(target), fixedOrder: true, cols: 3 };
      }
      // calendar order
      const list = level === 3 ? MONTHS : DAYS;
      const i = R.int(0, list.fr.length - 1), n = level === 1 ? 3 : 4;
      const idx = Array.from({ length: n }, (_, j) => (i + j) % list.fr.length);
      return {
        type: 'order', key: `cal${level}${i}`, joiner: ' → ',
        prompt: T(level === 3 ? 'Place les mois dans l’ordre.' : 'Place les jours dans l’ordre.', level === 3 ? 'Put the months in order.' : 'Put the days in order.'),
        tiles: idx.map((j) => ({ fr: list.fr[j], en: list.en[j] })),
      };
    },
  },
  {
    id: 'm12', icon: '📊',
    title: T('Diagrammes et hasard', 'Graphs and chance'),
    pfeq: 'Statistique — diagramme à bandes; Probabilité — certain, possible, impossible',
    generate(level, R) {
      if (level === 3 || (level === 2 && R.chance(0.4))) {
        const POOL = [
          [T('Demain, le soleil va se lever.', 'Tomorrow, the sun will rise.'), 0],
          [T('Il va neiger en janvier à Montréal.', 'It will snow in January in Montreal.'), 1],
          [T('Un chat va parler au téléphone.', 'A cat will talk on the phone.'), 2],
          [T('Je vais piger une bille rouge dans un sac de billes rouges.', 'I will pick a red marble from a bag of red marbles.'), 0],
          [T('Je vais obtenir 6 en lançant un dé.', 'I will roll a 6 with a die.'), 1],
          [T('Je vais obtenir 7 en lançant un dé.', 'I will roll a 7 with a die.'), 2],
          [T('Il va pleuvoir cette semaine.', 'It will rain this week.'), 1],
          [T('Un éléphant va entrer dans ma classe.', 'An elephant will walk into my class.'), 2],
          [T('Après lundi, ce sera mardi.', 'After Monday, it will be Tuesday.'), 0],
          [T('Pile ou face : j’obtiens pile.', 'Heads or tails: I get heads.'), 1],
          [T('Ma tuque va s’envoler jusqu’à la Lune.', 'My hat will fly to the Moon.'), 2],
          [T('L’hiver va revenir après l’automne.', 'Winter will come after fall.'), 0],
        ];
        const pick = R.sample(POOL, 4);
        return {
          type: 'sort', key: `prob${pick.map((p) => p[0].fr.slice(0, 6)).join()}`, prompt: T('Classe chaque phrase.', 'Sort each sentence.'),
          bins: [{ text: T('certain', 'certain'), emoji: '✅' }, { text: T('possible', 'possible'), emoji: '🤔' }, { text: T('impossible', 'impossible'), emoji: '🚫' }],
          items: pick.map(([t, bin]) => ({ text: t, say: { text: t }, bin })),
        };
      }
      const FRUITS = R.sample(['🍎', '🍌', '🍓', '🍇', '🍊', '🍉'], level === 1 ? 3 : 4);
      const vals = new Set();
      while (vals.size < FRUITS.length) vals.add(R.int(1, 10));
      const data = FRUITS.map((e, i) => ({ emoji: e, value: [...vals][i] }));
      const chart = S.barChart(data);
      const k = R.int(0, 2);
      if (k === 0) {
        const d = R.pick(data);
        return { type: 'keypad', key: `bar${data.map((x) => x.emoji + x.value).join()}_${d.emoji}`, prompt: T(`Combien d’enfants préfèrent ${d.emoji}?`, `How many children like ${d.emoji} best?`), stimulus: { svg: chart }, answer: d.value };
      }
      if (k === 1) {
        const best = data.reduce((a, b) => (b.value > a.value ? b : a));
        return { type: 'choice', key: `best${data.map((x) => x.emoji + x.value).join()}`, prompt: T('Quel fruit est le plus populaire?', 'Which fruit is the most popular?'), stimulus: { svg: chart }, options: [best, ...data.filter((x) => x !== best)].map((x) => ({ emoji: x.emoji })), answer: 0, cols: data.length };
      }
      const [a, b] = R.sample(data, 2);
      const [hi, lo] = a.value > b.value ? [a, b] : [b, a];
      return { type: 'keypad', key: `diff${data.map((x) => x.emoji + x.value).join()}_${hi.emoji}${lo.emoji}`, prompt: T(`Combien d’enfants de plus préfèrent ${hi.emoji} plutôt que ${lo.emoji}?`, `How many more children like ${hi.emoji} than ${lo.emoji}?`), stimulus: { svg: chart }, answer: hi.value - lo.value };
    },
  },
  {
    id: 'm13', icon: '✖️',
    title: T('Multiplier et partager', 'Groups and sharing'),
    pfeq: 'Opérations — sens de la multiplication et de la division (groupes égaux, tableaux, partage), nombres < 100',
    generate(level, R) {
      const CT = [
        { c: ['assiette', 'assiettes'], ce: ['plate', 'plates'], t: ['biscuit', 'biscuits'], te: ['cookie', 'cookies'], e: '🍪' },
        { c: ['boîte', 'boîtes'], ce: ['box', 'boxes'], t: ['crayon', 'crayons'], te: ['crayon', 'crayons'], e: '🖍️' },
        { c: ['sac', 'sacs'], ce: ['bag', 'bags'], t: ['pomme', 'pommes'], te: ['apple', 'apples'], e: '🍎' },
        { c: ['panier', 'paniers'], ce: ['basket', 'baskets'], t: ['fraise', 'fraises'], te: ['strawberry', 'strawberries'], e: '🍓' },
        { c: ['vase', 'vases'], ce: ['vase', 'vases'], t: ['fleur', 'fleurs'], te: ['flower', 'flowers'], e: '🌷' },
        { c: ['bocal', 'bocaux'], ce: ['jar', 'jars'], t: ['poisson', 'poissons'], te: ['fish', 'fish'], e: '🐟' },
        { c: ['étagère', 'étagères'], ce: ['shelf', 'shelves'], t: ['livre', 'livres'], te: ['book', 'books'], e: '📘' },
        { c: ['équipe', 'équipes'], ce: ['team', 'teams'], t: ['joueur', 'joueurs'], te: ['player', 'players'], e: '🏒' },
        { c: ['filet', 'filets'], ce: ['net', 'nets'], t: ['orange', 'oranges'], te: ['orange', 'oranges'], e: '🍊' },
      ];
      const RL = [
        { f: (n) => `Un joueur de hockey porte 2 patins. Combien de patins pour ${n} joueurs?`, en: (n) => `A hockey player wears 2 skates. How many skates for ${n} players?`, per: 2, e: '⛸️' },
        { f: (n) => `Une main a 5 doigts. Combien de doigts sur ${n} mains?`, en: (n) => `One hand has 5 fingers. How many fingers on ${n} hands?`, per: 5, e: '✋' },
        { f: (n) => `Une voiture a 4 roues. Combien de roues pour ${n} voitures?`, en: (n) => `A car has 4 wheels. How many wheels for ${n} cars?`, per: 4, e: '🚗' },
        { f: (n) => `Un chat a 4 pattes. Combien de pattes ont ${n} chats?`, en: (n) => `A cat has 4 paws. How many paws do ${n} cats have?`, per: 4, e: '🐱' },
        { f: (n) => `Un bonhomme de neige a 3 boules. Combien de boules pour ${n} bonshommes de neige?`, en: (n) => `A snowman has 3 balls. How many balls for ${n} snowmen?`, per: 3, e: '⛄' },
        { f: (n) => `Une paire de mitaines, c’est 2 mitaines. Combien de mitaines dans ${n} paires?`, en: (n) => `A pair of mittens is 2 mittens. How many mittens in ${n} pairs?`, per: 2, e: '🧤' },
        { f: (n) => `Un oiseau a 2 ailes. Combien d’ailes ont ${n} oiseaux?`, en: (n) => `A bird has 2 wings. How many wings do ${n} birds have?`, per: 2, e: '🐦' },
        { f: (n) => `Un vélo a 2 roues. Combien de roues ont ${n} vélos?`, en: (n) => `A bike has 2 wheels. How many wheels do ${n} bikes have?`, per: 2, e: '🚲' },
      ];
      const ks = level === 1 ? [0, 1, 2, 3, 4, 5, 6, 9] : level === 2 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : [0, 1, 2, 3, 4, 6, 7, 8, 9, 10];
      const k = R.pick(ks);
      let g, per;
      if (level === 1) { g = R.int(2, 3); per = R.int(2, 4); }
      else if (level === 2) { g = R.int(2, 5); per = R.int(2, 5); }
      else { g = R.int(2, 6); per = R.pick([2, 3, 4, 5, 6, 10]); }
      const per6 = per > 6 ? R.int(2, 6) : per; // pictures hold up to 6 per group
      const e = R.pick(OBJ);
      if (k === 0) {
        const fr = 'Combien en tout?', en = 'How many altogether?';
        return { type: 'keypad', key: `grp${g}x${per6}${e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.groups(g, per6, e) }, answer: g * per6 };
      }
      if (k === 1) {
        const rows = R.int(2, level === 1 ? 3 : level === 2 ? 4 : 5), cols = R.int(2, level === 1 ? 4 : level === 2 ? 5 : 8);
        const fr = 'Combien en tout?', en = 'How many altogether?';
        return { type: 'keypad', key: `arr${rows}x${cols}${e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.emojiGrid(rows, cols, e) }, answer: rows * cols };
      }
      if (k === 2) {
        const text = Array(g).fill(per).join(' + ') + ' = ?';
        const fr = 'Calcule l’addition répétée.', en = 'Work out the repeated addition.';
        return { type: 'keypad', key: `rep${g}x${per}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { text }, answer: g * per };
      }
      if (k === 3) {
        const each = R.int(2, level === 1 ? 4 : level === 2 ? 6 : 8), gg = level === 1 ? 2 : R.pick([2, 3, 4, 5]);
        const n = gg * each, ct = R.pick(CT);
        const fr = `On partage ${n} ${ct.t[1]} également entre ${gg} ${ct.c[1]}. Combien y en a-t-il dans chaque ${ct.c[0]}?`;
        const en = `We share ${n} ${ct.te[1]} equally among ${gg} ${ct.ce[1]}. How many are in each ${ct.ce[0]}?`;
        return { type: 'keypad', key: `shr${n}/${gg}${ct.e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { emojis: ct.e, count: n }, answer: each };
      }
      if (k === 4) {
        const n = g * per6;
        const fr = `Il y a ${n} ${e}. On fait des groupes de ${per6}. Combien de groupes y a-t-il?`, en = `There are ${n} ${e}. We make groups of ${per6}. How many groups are there?`;
        return { type: 'keypad', key: `hmg${n}/${per6}${e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { emojis: e, count: n }, answer: g };
      }
      if (k === 5) {
        const seq = (n, v) => Array(n).fill(v).join(' + ');
        const right = seq(g, per6), w1 = seq(g + 1, per6), w2 = seq(g, per6 + 1);
        const fr = 'Quelle addition va avec l’image?', en = 'Which addition goes with the picture?';
        return { type: 'choice', key: `add${g}x${per6}${e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.groups(g, per6, e) }, options: [right, w1, w2].map((t) => ({ text: t })), answer: 0, cols: 3 };
      }
      if (k === 6) {
        const p2 = per6 < 6 ? per6 + 1 : per6 - 1;
        const fr = `Quelle image montre ${g} groupes de ${per6}?`, en = `Which picture shows ${g} groups of ${per6}?`;
        return { type: 'choice', key: `pic${g}x${per6}${e}`, prompt: T(fr, en), say: SAY(fr, en), options: [S.groups(g, per6, e), S.groups(g + 1, per6, e), S.groups(g, p2, e)].map((svg) => ({ svg })), answer: 0, cols: 3 };
      }
      if (k === 7) {
        const ct = R.pick(CT);
        const fr = `Il y a ${g} ${ct.c[1]}. Chaque ${ct.c[0]} a ${per} ${ct.t[1]}. Combien ${dd(ct.t[1])}${ct.t[1]} y a-t-il en tout?`;
        const en = `There are ${g} ${ct.ce[1]}. Each ${ct.ce[0]} has ${per} ${ct.te[1]}. How many ${ct.te[1]} are there in all?`;
        return { type: 'keypad', key: `wm${g}x${per}${ct.e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { emoji: ct.e }, answer: g * per };
      }
      if (k === 8) {
        const r = R.pick(RL), n = R.int(2, level === 2 ? 5 : 6);
        return { type: 'keypad', key: `rl${r.per}${r.e}${n}`, prompt: T(r.f(n), r.en(n)), say: SAY(r.f(n), r.en(n)), stimulus: { emoji: r.e }, answer: r.per * n };
      }
      if (k === 9) {
        const rows = R.int(2, level === 1 ? 3 : 5), cols = R.int(2, level === 1 ? 4 : 6);
        const askRows = R.chance(0.5);
        const fr = askRows ? 'Combien de rangées (lignes) y a-t-il?' : 'Combien y en a-t-il dans chaque rangée?';
        const en = askRows ? 'How many rows are there?' : 'How many are in each row?';
        return { type: 'keypad', key: `rows${rows}x${cols}${askRows}${e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.emojiGrid(rows, cols, e) }, answer: askRows ? rows : cols };
      }
      // k === 10 : how many groups / sharing in words
      const ct = R.pick(CT), gg = R.int(2, 6), pp = R.pick([2, 3, 4, 5, 10]), n = gg * pp;
      const fr = `Il y a ${n} ${ct.t[1]}. On en met ${pp} dans chaque ${ct.c[0]}. Combien ${dd(ct.c[1])}${ct.c[1]} faut-il?`;
      const en = `There are ${n} ${ct.te[1]}. We put ${pp} in each ${ct.ce[0]}. How many ${ct.ce[1]} do we need?`;
      return { type: 'keypad', key: `wg${n}/${pp}${ct.e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { emojis: ct.e, count: Math.min(n, 30) }, answer: gg };
    },
  },
  {
    id: 'm14', icon: '🧠',
    title: T('Calcul mental', 'Mental math'),
    pfeq: 'Calcul mental — doubles, compléments à 10 et 100, +10/−10, comptage par bonds, estimation',
    generate(level, R) {
      const kinds = level === 1 ? ['dbl', 'near', 'c10', 'p10', 'skip', 'est'] : level === 2 ? ['dbl', 'near', 'c20', 'c100', 'p100', 'skip', 'est', 'half'] : ['dbl', 'near', 'c100', 'p100', 'skip', 'est', 'half', 'closest'];
      const k = R.pick(kinds);
      const KP = (key, prompt, stim, ans, extra = {}) => ({ type: 'keypad', key, prompt, ...(stim ? { stimulus: stim } : {}), answer: ans, ...extra });
      if (k === 'dbl') {
        const n = level === 1 ? R.int(2, 10) : level === 2 ? R.int(6, 25) : R.int(11, 49);
        const fr = `Quel est le double de ${n}?`, en = `What is double ${n}?`;
        return KP(`dbl${n}`, T(fr, en), level === 1 ? { text: `${n} + ${n}` } : undefined, 2 * n, { say: SAY(fr, en) });
      }
      if (k === 'near') {
        const n = level === 1 ? R.int(2, 9) : level === 2 ? R.int(6, 25) : R.int(20, 60), up = R.chance(0.5);
        const A = up ? n : n + 1, B = up ? n + 1 : n;
        return KP(`near${A}+${B}`, T('Calcule. Astuce : pense au double!', 'Work it out. Tip: think of the double!'), { text: `${A} + ${B} = ?` }, A + B);
      }
      if (k === 'c10') {
        const a = R.int(1, 9), flip = R.chance(0.5);
        return KP(`c10_${a}${flip}`, T('Quel nombre manque pour faire 10?', 'Which number makes 10?'), { text: flip ? `? + ${a} = 10` : `${a} + ? = 10` }, 10 - a);
      }
      if (k === 'c20') {
        const a = R.int(11, 19);
        return KP(`c20_${a}`, T('Quel nombre manque pour faire 20?', 'Which number makes 20?'), { text: `${a} + ? = 20` }, 20 - a);
      }
      if (k === 'c100') {
        const a = level === 2 ? R.int(1, 9) * 10 : R.int(1, 99);
        return KP(`c100_${a}`, T('Quel nombre manque pour faire 100?', 'Which number makes 100?'), { text: `${a} + ? = 100` }, 100 - a);
      }
      if (k === 'p10') {
        const n = R.int(10, 89), plus = R.chance(0.5);
        const m = plus ? n : n + 10;
        return KP(`p10_${m}${plus}`, plus ? T(`Quel nombre est 10 de plus que ${m}?`, `What is 10 more than ${m}?`) : T(`Quel nombre est 10 de moins que ${m}?`, `What is 10 less than ${m}?`), undefined, plus ? m + 10 : m - 10);
      }
      if (k === 'p100') {
        const plus = R.chance(0.5), ten = R.chance(level === 2 ? 0.2 : 0.5);
        const base = level === 2 ? R.int(1, 8) * 100 : R.int(110, 890);
        const n = plus ? base : base + 100;
        const step = ten ? 10 : 100;
        const m = plus ? base : base + step;
        const nm = plus ? m + step : m - step;
        const wf = ten ? '10' : '100';
        return KP(`p100_${m}${plus}${wf}`, plus ? T(`Quel nombre est ${wf} de plus que ${m}?`, `What is ${wf} more than ${m}?`) : T(`Quel nombre est ${wf} de moins que ${m}?`, `What is ${wf} less than ${m}?`), undefined, nm);
      }
      if (k === 'skip') {
        const step = level === 1 ? R.pick([2, 5, 10]) : R.pick([2, 5, 10, 25]);
        const back = level === 3 && R.chance(0.5);
        const start = back ? step * R.int(6, 10) : step * R.int(0, 6);
        const d = back ? -step : step;
        const seq = [start, start + d, start + 2 * d, start + 3 * d];
        const holeAt = level === 3 && R.chance(0.4) ? 2 : 4;
        const shown = seq.slice(0, 4).map((v, i) => (i === holeAt ? '?' : v));
        const next = start + 4 * d;
        const show = holeAt === 4 ? [...seq, '?'] : shown.concat([next]);
        const ans = holeAt === 4 ? next : seq[2];
        const fr = back ? `Compte à rebours de ${step} en ${step}. Quel nombre manque?` : `Compte de ${step} en ${step}. Quel nombre manque?`;
        const en = back ? `Count back by ${step}s. Which number is missing?` : `Count by ${step}s. Which number is missing?`;
        return KP(`skp${start}_${d}_${holeAt}`, T(fr, en), { text: show.join(', ') }, ans, { say: SAY(fr, en) });
      }
      if (k === 'half') {
        const n = level === 2 ? R.int(1, 10) * 10 : R.int(2, 50) * 2;
        return KP(`half${n}`, T(`Quelle est la moitié de ${n}?`, `What is half of ${n}?`), undefined, n / 2);
      }
      if (k === 'est') {
        if (level === 1 || level === 2) {
          const n = R.int(11, 89);
          if (n % 10 === 5) return this.generate(level, R);
          const lo = Math.floor(n / 10) * 10, hi = lo + 10, ans = n - lo < hi - n ? lo : hi, oth = ans === lo ? hi : lo;
          return { type: 'choice', key: `est${n}`, prompt: T(`${n} est plus proche de…`, `${n} is closer to…`), options: [ans, oth].map((v) => ({ text: String(v) })), answer: 0, cols: 2 };
        }
        const n3 = R.int(101, 899);
        if (n3 % 100 === 50) return this.generate(level, R);
        const lo3 = Math.floor(n3 / 100) * 100, hi3 = lo3 + 100, ans3 = n3 - lo3 < hi3 - n3 ? lo3 : hi3, oth3 = ans3 === lo3 ? hi3 : lo3;
        return { type: 'choice', key: `est${n3}`, prompt: T(`${n3} est plus proche de…`, `${n3} is closer to…`), options: [ans3, oth3].map((v) => ({ text: String(v) })), answer: 0, cols: 2 };
      }
      // k === 'closest'
      const T0 = R.pick([50, 100, 200, 500]);
      const set = new Set();
      while (set.size < 3) set.add(T0 + R.int(-Math.floor(T0 * 0.9), Math.floor(T0 * 0.9)));
      const arr = [...set].filter((v) => v > 0);
      const ds = arr.map((v) => Math.abs(v - T0)).sort((a, b) => a - b);
      if (arr.length < 3 || ds[0] === ds[1]) return this.generate(level, R);
      const best = arr.reduce((a, b) => (Math.abs(b - T0) < Math.abs(a - T0) ? b : a));
      return { type: 'choice', key: `cl${T0}_${arr.slice().sort((a, b) => a - b).join(',')}`, prompt: T(`Quel nombre est le plus proche de ${T0}?`, `Which number is closest to ${T0}?`), options: arr.map((v) => ({ text: String(v) })), answer: arr.indexOf(best), fixedOrder: true, cols: 3 };
    },
  },
  {
    id: 'm15', icon: '💰',
    title: T('L’argent', 'Money'),
    pfeq: 'Enrichissement — monnaie canadienne (pièces et billets), compter et rendre la monnaie (hors programme du 1er cycle)',
    generate(level, R) {
      const NAME = { 5: T('5 ¢', '5¢'), 10: T('10 ¢', '10¢'), 25: T('25 ¢', '25¢'), 100: T('1 $', '$1'), 200: T('2 $', '$2') };
      const sum = (a) => a.reduce((x, y) => x + y, 0);
      const desc = (a) => a.slice().sort((x, y) => y - x);
      // random combination of coins that sums exactly to v (multiple of 5)
      const combo = (v, coins) => {
        const out = [];
        let rem = v;
        while (rem > 0 && out.length < 9) {
          const opts = coins.filter((c) => c <= rem);
          out.push(R.chance(0.6) ? Math.max(...opts) : R.pick(opts));
          rem -= out[out.length - 1];
        }
        return rem === 0 ? out : null;
      };
      const kinds = level === 1 ? ['name', 'dollars', 'tap', 'more', 'nickels'] : level === 2 ? ['cents', 'make', 'howmany', 'dollars', 'more', 'equiv', 'name'] : ['mixed', 'makeMixed', 'change', 'changeD', 'total', 'compareTxt', 'cents'];
      const k = R.pick(kinds);
      if (k === 'name') {
        const v = R.pick(level === 1 ? [5, 10, 25, 100, 200] : [5, 10, 25, 100, 200]);
        const d = R.sample([5, 10, 25, 100, 200].filter((x) => x !== v), 2);
        return { type: 'choice', key: `nm${v}${d.join('')}`, prompt: T('Combien vaut cette pièce?', 'How much is this coin worth?'), stimulus: { svg: S.money([v]) }, options: [v, ...d].map((x) => ({ text: NAME[x] })), answer: 0, cols: 3 };
      }
      if (k === 'tap') {
        const v = R.pick([5, 10, 25, 100, 200]);
        const d = R.sample([5, 10, 25, 100, 200].filter((x) => x !== v), 2);
        const label = NAME[v];
        const fr = `Touche la pièce de ${label.fr}.`, en = `Tap the ${label.en} coin.`;
        return { type: 'choice', key: `tap${v}${d.join('')}`, prompt: T(fr, en), say: SAY(fr, en), options: [v, ...d].map((x) => ({ svg: S.money([x]) })), answer: 0, cols: 3 };
      }
      if (k === 'dollars') {
        const pool = level === 1 ? [100, 200, 500] : [100, 200, 500, 1000];
        let items;
        do { items = Array.from({ length: R.int(2, level === 1 ? 4 : 5) }, () => R.pick(pool)); } while (sum(items) > (level === 1 ? 1200 : 3000) || sum(items) < 300);
        const fr = 'Combien de dollars en tout?', en = 'How many dollars altogether?';
        return { type: 'keypad', key: `dol${desc(items).join('-')}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.money(desc(items)) }, answer: sum(items) / 100 };
      }
      if (k === 'nickels') {
        const c = R.pick([5, 10]), n = R.int(2, c === 5 ? 6 : 5);
        const fr = 'Combien de cents (¢) en tout?', en = 'How many cents (¢) altogether?';
        return { type: 'keypad', key: `nk${c}x${n}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.money(Array(n).fill(c)) }, answer: c * n };
      }
      if (k === 'more') {
        let A, B;
        const pool = level === 1 ? [100, 200, 500] : [5, 10, 25];
        const mk = () => desc(Array.from({ length: R.int(2, 4) }, () => R.pick(pool)));
        do { A = mk(); B = mk(); } while (sum(A) === sum(B));
        const fr = 'Quel groupe vaut le plus?', en = 'Which group is worth more?';
        const bigA = sum(A) > sum(B);
        return { type: 'choice', key: `mo${A.join('-')}|${B.join('-')}`, prompt: T(fr, en), say: SAY(fr, en), options: [{ svg: S.money(A, 330) }, { svg: S.money(B, 330) }], answer: bigA ? 0 : 1, fixedOrder: true, cols: 2 };
      }
      if (k === 'cents') {
        let items;
        do { items = Array.from({ length: R.int(3, 6) }, () => R.pick([5, 10, 25])); } while (sum(items) > 95);
        const fr = 'Combien de cents (¢) en tout?', en = 'How many cents (¢) altogether?';
        if (level === 3 && R.chance(0.5)) {
          const loon = R.pick([100, 200]);
          items = desc([loon, ...items.slice(0, 3)]);
          const total = sum(items), v = moneyT(total);
          let d = [total + 5, total - 5, total + 25, total + 10, total - 10].filter((x) => x > 0 && x !== total);
          d = R.sample(d, 2);
          return { type: 'choice', key: `cmx${items.join('-')}`, prompt: T('Quel montant est montré?', 'Which amount is shown?'), stimulus: { svg: S.money(items) }, options: [total, ...d].map((x) => ({ text: moneyT(x) })), answer: 0, cols: 3 };
        }
        return { type: 'keypad', key: `ce${desc(items).join('-')}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.money(desc(items)) }, answer: sum(items) };
      }
      if (k === 'make') {
        const t = R.int(4, 16) * 5;
        const good = combo(t, [5, 10, 25]);
        if (!good) return this.generate(level, R);
        const wrongs = [];
        for (const delta of R.shuffle([-10, -5, 5, 10, 15])) {
          if (t + delta < 10) continue;
          const w = combo(t + delta, [5, 10, 25]);
          if (w && sum(w) !== t) wrongs.push(w);
          if (wrongs.length === 2) break;
        }
        if (wrongs.length < 2) return this.generate(level, R);
        const fr = `Quel groupe fait ${t} ¢?`, en = `Which group makes ${t}¢?`;
        return { type: 'choice', key: `mk${t}${desc(good).join('')}${wrongs.map((w) => desc(w).join('')).join('|')}`, prompt: T(fr, en), say: SAY(fr, en), options: [good, ...wrongs].map((x) => ({ svg: S.money(desc(x), 330) })), answer: 0, cols: 3 };
      }
      if (k === 'makeMixed') {
        const t = R.pick([105, 110, 115, 125, 130, 135, 150, 160, 175, 185, 205, 225, 250, 275]);
        const good = combo(t, [5, 10, 25, 100, 200]);
        if (!good) return this.generate(level, R);
        const wrongs = [];
        for (const delta of R.shuffle([-25, -10, -5, 5, 10, 25])) {
          const w = combo(t + delta, [5, 10, 25, 100, 200]);
          if (w && sum(w) !== t) wrongs.push(w);
          if (wrongs.length === 2) break;
        }
        if (wrongs.length < 2) return this.generate(level, R);
        const m = moneyT(t);
        const fr = `Quel groupe fait ${m.fr}?`, en = `Which group makes ${m.en}?`;
        return { type: 'choice', key: `mm${t}${desc(good).join('')}${wrongs.map((w) => desc(w).join('')).join('|')}`, prompt: T(fr, en), say: SAY(fr, en), options: [good, ...wrongs].map((x) => ({ svg: S.money(desc(x), 330) })), answer: 0, cols: 3 };
      }
      if (k === 'mixed') {
        const loon = R.pick([100, 200]);
        const items = desc([loon, ...Array.from({ length: R.int(2, 4) }, () => R.pick([5, 10, 25]))]);
        const total = sum(items);
        let d = R.sample([total + 5, total - 5, total + 25, total - 25, total + 10, total - 10].filter((x) => x > 0), 2);
        return { type: 'choice', key: `mx${items.join('-')}`, prompt: T('Quel montant est montré?', 'Which amount is shown?'), stimulus: { svg: S.money(items) }, options: [total, ...d].map((x) => ({ text: moneyT(x) })), answer: 0, cols: 3 };
      }
      if (k === 'howmany') {
        const Q = [
          [5, 25, '5 ¢', '25 ¢', 5], [5, 50, '5 ¢', '50 ¢', 10], [10, 50, '10 ¢', '50 ¢', 5], [10, 100, '10 ¢', '1 $', 10], [25, 100, '25 ¢', '1 $', 4], [100, 200, '1 $', '2 $', 2], [25, 50, '25 ¢', '50 ¢', 2],
        ];
        const [, , cf, tf, ans] = R.pick(Q);
        const ce = cf.replace(' ', ''), te = tf.replace('1 $', '$1').replace('2 $', '$2').replace(' ', '');
        const fr = `Combien de pièces de ${cf} faut-il pour faire ${tf}?`, en = `How many ${ce} coins make ${te}?`;
        return { type: 'keypad', key: `hm${cf}${tf}`, prompt: T(fr, en), say: SAY(fr, en), answer: ans };
      }
      if (k === 'equiv') {
        const Q = [[[5, 5], 10], [[10, 10, 5], 25], [[5, 5, 5, 5, 5], 25], [[25, 25, 25, 25], 100], [[100, 100], 200], [[10, 10, 10, 10, 10, 10, 10, 10, 10, 10], 100]];
        const [items, ans] = R.pick(Q);
        const d = R.sample([5, 10, 25, 100, 200].filter((x) => x !== ans), 2);
        const fr = 'Quelle pièce vaut autant que ce groupe?', en = 'Which coin is worth the same as this group?';
        return { type: 'choice', key: `eq${items.join('-')}${d.join('')}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.money(items) }, options: [ans, ...d].map((x) => ({ svg: S.money([x]) })), answer: 0, cols: 3 };
      }
      if (k === 'change') {
        const IT = [['un jus', 'a juice', '🧃'], ['une gomme', 'a gum', '🍬'], ['un biscuit', 'a cookie', '🍪'], ['un chocolat', 'a chocolate bar', '🍫'], ['une pomme', 'an apple', '🍎'], ['un ballon', 'a balloon', '🎈']];
        const [fi, ei, e] = R.pick(IT), p = R.pick(PEOPLE);
        const price = R.int(1, 19) * 5, pay = 100;
        const fr = `${p.n} achète ${fi} à ${price} ¢. ${Il(p)} paie avec 1 $. Combien de monnaie (en ¢) reçoit-${il(p)}?`;
        const en = `${p.n} buys ${ei} for ${price}¢. ${He(p)} pays with $1. How much change (in ¢) does ${he(p)} get?`;
        return { type: 'keypad', key: `ch${fi}${price}${p.n}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { emoji: e }, answer: pay - price };
      }
      if (k === 'changeD') {
        const IT = [['un jus', 'a juice', '🧃'], ['un livre', 'a book', '📘'], ['un chandail de hockey', 'a hockey jersey', '🏒'], ['un jouet', 'a toy', '🧸'], ['un ballon', 'a ball', '⚽'], ['un sac de chips', 'a bag of chips', '🥔']];
        const [fi, ei, e] = R.pick(IT), p = R.pick(PEOPLE);
        const pay = R.pick([5, 10]), price = R.int(1, pay - 1);
        const fr = `${p.n} achète ${fi} à ${price} $. ${Il(p)} paie avec ${pay} $. Combien de monnaie (en $) reçoit-${il(p)}?`;
        const en = `${p.n} buys ${ei} for $${price}. ${He(p)} pays with $${pay}. How much change (in $) does ${he(p)} get?`;
        return { type: 'keypad', key: `cd${fi}${price}_${pay}${p.n}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { emoji: e }, answer: pay - price };
      }
      if (k === 'total') {
        const IT = [['un jus', 'a juice', '🧃'], ['une gomme', 'a gum', '🍬'], ['un biscuit', 'a cookie', '🍪'], ['un chocolat', 'a chocolate bar', '🍫'], ['un livre', 'a book', '📘'], ['un jouet', 'a toy', '🧸']];
        const [i1, i2] = R.sample(IT, 2), p = R.pick(PEOPLE);
        const x = R.int(1, 5), y = R.int(1, 5);
        const fr = `${p.n} achète ${i1[0]} à ${x} $ et ${i2[0]} à ${y} $. Combien dépense-t-${il(p)} en tout (en $)?`;
        const en = `${p.n} buys ${i1[1]} for $${x} and ${i2[1]} for $${y}. How much does ${he(p)} spend in all (in $)?`;
        return { type: 'keypad', key: `tt${i1[0]}${x}${i2[0]}${y}${p.n}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { text: `${i1[2]}  ${i2[2]}` }, answer: x + y };
      }
      // compareTxt : which is the biggest amount (mixed ¢ and $)
      const pool = [25, 50, 75, 85, 95, 100, 120, 125, 150, 175, 200, 250];
      const vals = R.sample(pool, 3);
      const top = Math.max(...vals);
      return { type: 'choice', key: `cmp${vals.slice().sort((a, b) => a - b).join(',')}`, prompt: T('Quel est le plus grand montant?', 'Which is the biggest amount?'), options: vals.map((v) => ({ text: moneyT(v) })), answer: vals.indexOf(top), fixedOrder: true, cols: 3 };
    },
  },
  {
    id: 'm16', icon: '🦋',
    title: T('Symétrie et repérage', 'Symmetry and position'),
    pfeq: 'Géométrie — axe de symétrie, repérage dans un plan quadrillé, frises et régularités',
    generate(level, R) {
      const COLS = [S.COLORS.purple, S.COLORS.blue, S.COLORS.green, S.COLORS.orange, S.COLORS.pink];
      const half = () => {
        const n = R.int(3, 4);
        const ys = R.sample([22, 36, 50, 64, 78, 92, 106, 118], n).sort((a, b) => a - b);
        return ys.map((y) => [R.int(14, 56), y]);
      };
      const mirror = (h) => h.map(([x, y]) => [140 - x, y]);
      const tweak = (m, i) => m.map(([x, y], j) => (j === i ? [x > 105 ? x - 28 : x + 28, y] : [x, y]));
      const EM = ['🐱', '🐶', '🍎', '🍌', '⭐', '🚗', '🌳', '🏠', '🎈', '🐟', '🦋', '🍓', '⚽', '🌙', '🎁', '🚲'];
      const kinds = level === 1 ? ['isSym', 'row', 'vert', 'coord', 'frise', 'mirrorRow'] : level === 2 ? ['isSym', 'complete', 'letters', 'row', 'vert', 'coord', 'frise', 'hole', 'mirrorRow'] : ['complete', 'letters', 'vert', 'coord', 'move', 'frise', 'hole', 'period', 'mirrorRow', 'isSym'];
      const k = R.pick(kinds);
      if (k === 'isSym') {
        const h = half(), sym = R.chance(0.5), col = R.pick(COLS);
        const right = sym ? mirror(h) : tweak(mirror(h), R.int(0, h.length - 1));
        return { type: 'choice', key: `is${h.join(';')}${sym}`, prompt: T('La ligne pointillée est-elle un axe de symétrie?', 'Is the dotted line an axis of symmetry?'), say: SAY('La ligne pointillée est-elle un axe de symétrie? Les deux côtés sont-ils pareils?', 'Is the dotted line an axis of symmetry? Are both sides the same?'), stimulus: { svg: S.symFigure(h, right, { color: col }) }, options: [{ text: T('oui', 'yes') }, { text: T('non', 'no') }], answer: sym ? 0 : 1, fixedOrder: true, cols: 2 };
      }
      if (k === 'complete') {
        const h = half(), col = R.pick(COLS);
        const n = h.length, i = R.int(0, n - 1), j = (i + R.int(1, n - 1)) % n;
        const m = mirror(h);
        const opts = [m, tweak(m, i), tweak(m, j)];
        return { type: 'choice', key: `cp${h.join(';')}`, prompt: T('Quelle image complète la figure avec l’axe de symétrie?', 'Which picture completes the shape using the axis of symmetry?'), say: SAY('Quelle image complète la figure? Utilise l’axe de symétrie, la ligne pointillée.', 'Which picture completes the shape? Use the axis of symmetry, the dotted line.'), stimulus: { svg: S.symFigure(h, null, { half: true, color: col }) }, options: opts.map((r) => ({ svg: S.symFigure(h, r, { color: col, axis: false }) })), answer: 0, cols: 3 };
      }
      if (k === 'letters') {
        const SYM = 'AHIMOTUVWXY'.split(''), ASY = 'FGJLPRZNS'.split('');
        const ns = R.int(2, 4), na = Math.min(6 - ns, R.int(2, 4));
        const items = [...R.sample(SYM, ns).map((l) => ({ text: l, bin: 0 })), ...R.sample(ASY, na).map((l) => ({ text: l, bin: 1 }))];
        const fr = 'Cette lettre a-t-elle un axe de symétrie vertical ( | )? Classe les lettres.', en = 'Does this letter have a vertical axis of symmetry ( | )? Sort the letters.';
        return { type: 'sort', key: `lt${items.map((x) => x.text).sort().join('')}`, prompt: T(fr, en), say: SAY(fr, en), bins: [{ text: T('axe vertical', 'vertical axis'), emoji: '✅' }, { text: T('pas d’axe vertical', 'no vertical axis'), emoji: '❌' }], items: R.shuffle(items) };
      }
      if (k === 'row') {
        const n = level === 1 ? 4 : 5;
        const row = R.sample(EM, n);
        const mode = R.pick(['left', 'right', 'between']);
        let ans, fr, en;
        if (mode === 'left') { const i = R.int(1, n - 1); ans = row[i - 1]; fr = `Qu’est-ce qui est à gauche de ${row[i]}?`; en = `What is to the left of ${row[i]}?`; }
        else if (mode === 'right') { const i = R.int(0, n - 2); ans = row[i + 1]; fr = `Qu’est-ce qui est à droite de ${row[i]}?`; en = `What is to the right of ${row[i]}?`; }
        else { const i = R.int(1, n - 2); ans = row[i]; fr = `Qu’est-ce qui est entre ${row[i - 1]} et ${row[i + 1]}?`; en = `What is between ${row[i - 1]} and ${row[i + 1]}?`; }
        const d = R.sample(row.filter((x) => x !== ans), 2);
        return { type: 'choice', key: `rw${row.join('')}${mode}${fr.length}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { text: rowOf(row) }, options: [ans, ...d].map((x) => ({ emoji: x })), answer: 0, cols: 3 };
      }
      if (k === 'vert') {
        const cols = level === 1 ? 3 : level === 2 ? 3 : 4, rows = level === 1 ? 3 : level === 2 ? 3 : 4;
        const em = R.sample(EM, cols * rows);
        const grid = [];
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) grid.push({ c, r, e: em[r * cols + c] });
        const keep = R.sample(grid, R.int(5, Math.min(8, grid.length)));
        const up = R.chance(0.5);
        const cand = keep.filter((x) => (up ? x.r > 0 : x.r < rows - 1)).filter((x) => keep.some((y) => y.c === x.c && y.r === x.r + (up ? -1 : 1)));
        if (!cand.length) return this.generate(level, R);
        const t = R.pick(cand), nb = keep.find((y) => y.c === t.c && y.r === t.r + (up ? -1 : 1));
        const d = R.sample(keep.filter((x) => x.e !== nb.e && x.e !== t.e), 2);
        const fr = up ? `Qu’est-ce qui est juste au-dessus de ${t.e}?` : `Qu’est-ce qui est juste en dessous de ${t.e}?`;
        const en = up ? `What is right above ${t.e}?` : `What is right below ${t.e}?`;
        return { type: 'choice', key: `vt${keep.map((x) => x.e + x.c + x.r).join('')}${up}${t.e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.plan(cols, rows, keep, null, false) }, options: [nb, ...d].map((x) => ({ emoji: x.e })), answer: 0, cols: 3 };
      }
      if (k === 'coord' || k === 'move') {
        const cols = level === 1 ? 3 : level === 2 ? R.pick([3, 4]) : R.pick([4, 5]), rows = level === 1 ? 3 : level === 2 ? 3 : 4;
        const pos = [];
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) pos.push({ c, r });
        const lab = (c, r) => `${'ABCDEFG'[c]}${r + 1}`;
        if (k === 'move') {
          const dirs = [['droite', 'right', 1, 0], ['gauche', 'left', -1, 0], ['en bas', 'down', 0, 1], ['en haut', 'up', 0, -1]];
          const [df, de, dx, dy] = R.pick(dirs), n = R.int(1, 2);
          const starts = pos.filter((p) => p.c + dx * n >= 0 && p.c + dx * n < cols && p.r + dy * n >= 0 && p.r + dy * n < rows);
          const st = R.pick(starts), ans = lab(st.c + dx * n, st.r + dy * n);
          const dist = pos.map((p) => lab(p.c, p.r)).filter((l) => l !== ans && l !== lab(st.c, st.r));
          const near2 = [lab(st.c + dx * (n + 1), st.r + dy * (n + 1)), lab(st.c - dx * n, st.r - dy * n)].filter((l) => dist.includes(l));
          const d = [...new Set([...near2, ...R.shuffle(dist)])].slice(0, 2);
          const fr = `Tu es en ${lab(st.c, st.r)}. Avance de ${n} case${n > 1 ? 's' : ''} vers ${df === 'droite' ? 'la droite' : df === 'gauche' ? 'la gauche' : df === 'en bas' ? 'le bas' : 'le haut'}. Où arrives-tu?`;
          const en = `You are on ${lab(st.c, st.r)}. Move ${n} square${n > 1 ? 's' : ''} ${de}. Where do you end up?`;
          return { type: 'choice', key: `mv${lab(st.c, st.r)}${df}${n}_${cols}${rows}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.plan(cols, rows, [], st) }, options: [ans, ...d].map((x) => ({ text: x })), answer: 0, cols: 3 };
        }
        const em = R.sample(EM, 5);
        const spots = R.sample(pos, 5);
        const cells = spots.map((p, i) => ({ c: p.c, r: p.r, e: em[i] }));
        const mode = R.pick(['whatAt', 'whereIs', 'yellow']);
        if (mode === 'whatAt') {
          const t = R.pick(cells), d = R.sample(cells.filter((x) => x !== t), 2);
          const fr = `Quel objet est en ${lab(t.c, t.r)}?`, en = `Which object is on ${lab(t.c, t.r)}?`;
          return { type: 'choice', key: `wa${cells.map((x) => x.e + x.c + x.r).join('')}${lab(t.c, t.r)}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.plan(cols, rows, cells) }, options: [t, ...d].map((x) => ({ emoji: x.e })), answer: 0, cols: 3 };
        }
        if (mode === 'whereIs') {
          const t = R.pick(cells), d = R.sample(cells.filter((x) => x !== t), 2);
          const fr = `Où est ${t.e}?`, en = `Where is ${t.e}?`;
          return { type: 'choice', key: `wi${cells.map((x) => x.e + x.c + x.r).join('')}${t.e}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.plan(cols, rows, cells) }, options: [t, ...d].map((x) => ({ text: lab(x.c, x.r) })), answer: 0, cols: 3 };
        }
        const t = R.pick(pos), others = R.sample(pos.filter((p) => !(p.c === t.c && p.r === t.r)), 2);
        const fr = 'Quelle est la position de la case jaune?', en = 'What is the position of the yellow square?';
        return { type: 'choice', key: `yl${cols}${rows}${lab(t.c, t.r)}${others.map((o) => lab(o.c, o.r)).join('')}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.plan(cols, rows, [], t) }, options: [t, ...others].map((x) => ({ text: lab(x.c, x.r) })), answer: 0, cols: 3 };
      }
      if (k === 'frise' || k === 'hole') {
        const SETS = [['🟥', '🟦', '🟩', '🟨', '🟧', '🟪'], ['🔴', '🔵', '🟢', '🟡'], ['🔺', '🔻'], ['⭐', '🌙', '☀️'], ['❤️', '💙', '💚'], ['🐱', '🐶', '🐟']];
        const ARROWS = ['⬆️', '➡️', '⬇️', '⬅️'];
        const style = level === 1 ? R.pick(['AB', 'AB', 'AAB']) : level === 2 ? R.pick(['AB', 'AAB', 'ABC', 'ABB']) : R.pick(['ABC', 'ABB', 'AABB', 'arrows', 'ABCD']);
        let motif;
        if (style === 'arrows') { const s0 = R.int(0, 3); motif = [0, 1, 2, 3].map((i) => ARROWS[(s0 + i) % 4]); }
        else {
          const set = R.pick(SETS.filter((s) => s.length >= new Set(style).size));
          const pc = R.sample(set, new Set(style).size);
          const map = {}; [...new Set(style)].forEach((ch, i) => { map[ch] = pc[i]; });
          motif = style.split('').map((ch) => map[ch]);
        }
        const len = motif.length * 2 + R.int(1, motif.length - 1);
        const seq = Array.from({ length: len }, (_, i) => motif[i % motif.length]);
        const alts = [...new Set(style === 'arrows' ? ARROWS : motif)];
        if (k === 'hole') {
          const h = R.int(2, len - 2), ans = seq[h];
          if (alts.length < 2) return this.generate(level, R);
          const shown = seq.map((x, i) => (i === h ? '❓' : x));
          const opts = alts.length >= 3 ? R.sample(alts, 3) : alts;
          if (!opts.includes(ans)) opts[0] = ans;
          const fr = 'Quel élément manque dans la frise?', en = 'Which piece is missing from the border pattern?';
          return { type: 'choice', key: `ho${seq.join('')}${h}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { text: shown.join(' ') }, options: [...new Set([ans, ...opts])].map((x) => ({ emoji: x })), answer: 0, cols: 3 };
        }
        const ans = motif[len % motif.length];
        const opts = [...new Set([ans, ...R.sample(alts, Math.min(3, alts.length))])];
        const fr = 'Qu’est-ce qui continue la frise?', en = 'What continues the border pattern?';
        return { type: 'choice', key: `fr${seq.join('')}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { text: seq.join(' ') + ' ❓' }, options: opts.map((x) => ({ emoji: x })), answer: 0, cols: opts.length };
      }
      if (k === 'period') {
        const set = ['🟥', '🟦', '🟩', '🟨'];
        const pl = R.int(2, 4), pc = R.sample(set, pl);
        const seq = Array.from({ length: pl * 3 }, (_, i) => pc[i % pl]);
        const fr = 'Combien d’éléments y a-t-il dans le motif qui se répète?', en = 'How many pieces are in the repeating pattern?';
        return { type: 'keypad', key: `pd${seq.join('')}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { text: seq.join(' ') }, answer: pl };
      }
      // mirrorRow
      const n = level === 1 ? 2 : R.int(3, 4);
      const left = R.sample(EM, n);
      const tiles = left.slice().reverse();
      const extra = R.sample(EM.filter((x) => !left.includes(x)), 1);
      const fr = 'Place les images de l’autre côté de la ligne pour faire un miroir.', en = 'Put the pictures on the other side of the line to make a mirror.';
      return { type: 'order', key: `mr${left.join('')}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { text: `${left.join(' ')}  |` }, tiles, extra, joiner: ' ' };
    },
  },
];

// =====================================================================================
// « Je résous » — situation problems (units m17–m19). The child reads a SITUATION (shown in
// a text card) and answers ONE question about it. Names come from PEOPLE (gender-aware).
// =====================================================================================
const FILL = (s, v) => s.replace(/\{(\w+)\}/g, (m, k) => (v[k] !== undefined ? String(v[k]) : m));
const ELID = (w) => (/^[aeiouyéèêâîôhœ]/i.test(w) ? 'd’' : 'de ');
function sv(p, q) {
  const both = p.g === 'f' && q.g === 'f';
  return {
    p: p.n, q: q.n, il: il(p), Il: Il(p), he: he(p), He: He(p), his: her(p), His: her(p) === 'her' ? 'Her' : 'His',
    him: p.g === 'f' ? 'her' : 'him', iq: il(q), Iq: Il(q), hq: he(q), Hq: He(q),
    dp: dn(p.n), dq: dn(q.n), qp: qn(p.n), qq: qn(q.n), ils: both ? 'elles' : 'ils', Ils: both ? 'Elles' : 'Ils',
  };
}
// Build a question from a situation (array of [fr, en] sentences) + one question [fr, en].
// Numeric answer -> keypad; with `opts` -> choice (ans = index before shuffling).
function mkQ(o) {
  const v = o.v;
  const fr = o.sents.map((s) => FILL(s[0], v)).join(' ');
  const en = o.sents.map((s) => FILL(s[1], v)).join(' ');
  const qf = FILL(o.q[0], v), qe = FILL(o.q[1], v);
  const base = {
    key: o.id + JSON.stringify(v) + (o.opts ? o.opts.map((x) => (typeof x.text === 'object' ? x.text.fr : x.text)).join(',') : ''),
    prompt: T(qf, qe), say: SAY(`${fr} ${qf}`, `${en} ${qe}`), stimulus: { text: T(fr, en) },
  };
  if (o.opts) return { type: 'choice', ...base, options: o.opts, answer: o.ans, cols: o.cols || (o.opts.length <= 3 ? o.opts.length : 2), fixedOrder: !!o.fixed };
  return { type: 'keypad', ...base, answer: o.ans };
}
const YESNO = [{ text: T('Oui', 'Yes') }, { text: T('Non', 'No') }];
const ynQ = (id, v, sents, q, yes) => mkQ({ id, v, sents, q, opts: YESNO, ans: yes ? 0 : 1, fixed: true, cols: 2 });
// distractor sentences (a number that is NOT needed)
const DIST = [
  ['Il y a {x} élèves dans la classe.', 'There are {x} students in the class.'],
  ['Dans la rue, il y a {x} maisons.', 'There are {x} houses on the street.'],
  ['L’école compte {x} classes.', 'The school has {x} classes.'],
  ['Il y a {x} arbres dans la cour de l’école.', 'There are {x} trees in the schoolyard.'],
  ['Le déjeuner est à {x} h.', 'Breakfast is at {x} o’clock.'],
];
function addDist(R, sents, v, used, lo = 3, hi = 40) {
  let x, g = 0;
  do x = R.int(lo, hi); while (used.includes(x) && g++ < 50);
  v.x = x;
  let d = R.pick(DIST);
  if (d === DIST[4]) { v.x = R.int(6, 9); }
  sents.push(d);
}
const nth = (n) => T(`${n}e`, `${n}th`);

// noun bank for collection stories: set = setting; gv = gain verb (3rd sg), lv = loss verb
const NB = [
  { id: 'cartes', fr: 'cartes de hockey', en: 'hockey cards', set: ['Au dépanneur,', 'At the corner store,'], gv: ['reçoit', 'gets'], lv: ['donne', 'gives away'] },
  { id: 'autoc', fr: 'autocollants', en: 'stickers', set: ['À l’école,', 'At school,'], gv: ['trouve', 'finds'], lv: ['colle', 'sticks in a notebook'] },
  { id: 'billes', fr: 'billes', en: 'marbles', set: ['À la récré,', 'At recess,'], gv: ['gagne', 'wins'], lv: ['perd', 'loses'] },
  { id: 'pommes', fr: 'pommes', en: 'apples', set: ['À l’automne,', 'In the fall,'], gv: ['cueille', 'picks'], lv: ['mange', 'eats'] },
  { id: 'bisc', fr: 'biscuits', en: 'cookies', set: ['Au camp de jour,', 'At day camp,'], gv: ['reçoit', 'gets'], lv: ['mange', 'eats'] },
  { id: 'bonbons', fr: 'bonbons', en: 'candies', set: ['À l’Halloween,', 'On Halloween,'], gv: ['reçoit', 'gets'], lv: ['mange', 'eats'] },
  { id: 'livres', fr: 'livres', en: 'books', set: ['À la bibliothèque,', 'At the library,'], gv: ['emprunte', 'borrows'], lv: ['rapporte', 'returns'] },
  { id: 'bneige', fr: 'boules de neige', en: 'snowballs', set: ['Dans la cour,', 'In the yard,'], gv: ['fait', 'makes'], lv: ['lance', 'throws'] },
  { id: 'cadeaux', fr: 'cadeaux', en: 'presents', set: ['À Noël,', 'At Christmas,'], gv: ['reçoit', 'gets'], lv: ['donne', 'gives away'] },
  { id: 'oeufs', fr: 'œufs', en: 'eggs', set: ['À la ferme,', 'On the farm,'], gv: ['ramasse', 'collects'], lv: ['casse', 'breaks'] },
  { id: 'carottes', fr: 'carottes', en: 'carrots', set: ['Au jardin,', 'In the garden,'], gv: ['récolte', 'picks'], lv: ['mange', 'eats'] },
  { id: 'rondelles', fr: 'rondelles', en: 'hockey pucks', set: ['À la patinoire,', 'At the rink,'], gv: ['trouve', 'finds'], lv: ['perd', 'loses'] },
  { id: 'crayons', fr: 'crayons', en: 'pencils', set: ['Dans la classe,', 'In the classroom,'], gv: ['reçoit', 'gets'], lv: ['perd', 'loses'] },
  { id: 'ballons', fr: 'ballons', en: 'balloons', set: ['À la fête d’anniversaire,', 'At the birthday party,'], gv: ['gonfle', 'blows up'], lv: ['fait éclater', 'pops'] },
  { id: 'citrouilles', fr: 'citrouilles', en: 'pumpkins', set: ['Dans le champ,', 'In the field,'], gv: ['cueille', 'picks'], lv: ['vend', 'sells'] },
  { id: 'tartes', fr: 'tartes au sucre', en: 'sugar pies', set: ['À la cabane à sucre,', 'At the sugar shack,'], gv: ['cuisine', 'bakes'], lv: ['mange', 'eats'] },
  { id: 'buches', fr: 'bûches', en: 'logs', set: ['Au chalet,', 'At the cottage,'], gv: ['apporte', 'brings in'], lv: ['brûle', 'burns'] },
  { id: 'dessins', fr: 'dessins', en: 'drawings', set: ['Au camp de jour,', 'At day camp,'], gv: ['fait', 'makes'], lv: ['donne', 'gives away'] },
];
function ctx(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const nb = R.pick(NB);
  const v = { ...sv(p, q), nf: nb.fr, ne: nb.en, dnf: ELID(nb.fr) + nb.fr, set: nb.set[0], sete: nb.set[1] };
  return { R, L, p, q, nb, v };
}
const HAVE = [['{set} {p} a {a} {nf}.', '{sete} {p} has {a} {ne}.']];
const M17 = [0, 20, 100, 100];

// ---------- story kinds (numbers to 100) ----------
const STORY = {
  add(c) {
    const { R, L, nb, v } = c, mx = M17[L], lo = L === 1 ? 2 : 6;
    const a = R.int(lo, mx - lo), b = R.int(lo, Math.min(mx - a, L === 1 ? 10 : 50));
    Object.assign(v, { a, b });
    const s = [[...HAVE[0]], [`{Il} en ${nb.gv[0]} {b} de plus.`, `{He} ${nb.gv[1]} {b} more.`]];
    if (L > 1) addDist(R, s, v, [a, b]);
    return mkQ({ id: 'add', v, sents: s, q: ['Combien {dnf} a-t-{il} maintenant?', 'How many {ne} does {he} have now?'], ans: a + b });
  },
  sub(c) {
    const { R, L, nb, v } = c, mx = M17[L];
    const a = R.int(L === 1 ? 6 : 20, mx - 1), b = R.int(2, Math.min(a - 2, L === 1 ? a - 2 : 60));
    Object.assign(v, { a, b });
    const s = [[...HAVE[0]], [`{Il} en ${nb.lv[0]} {b}.`, `{He} ${nb.lv[1]} {b} of them.`]];
    if (L > 1) addDist(R, s, v, [a, b]);
    return mkQ({ id: 'sub', v, sents: s, q: ['Combien {dnf} lui reste-t-il?', 'How many {ne} does {he} have left?'], ans: a - b });
  },
  cmp(c, fewer) {
    const { R, L, nb } = c, mx = M17[L];
    const hi = R.int(L === 1 ? 6 : 20, mx), lo = R.int(2, hi - 2);
    const hiFirst = R.chance(0.5);
    // p is always the person with MORE (or the one asked about when `fewer`)
    const [P, Q] = R.sample(PEOPLE, 2);
    const v = { ...sv(P, Q), nf: nb.fr, ne: nb.en, dnf: ELID(nb.fr) + nb.fr, set: nb.set[0], sete: nb.set[1] };
    // P has `hi`; Q has `lo`
    const sP = [`{set} {p} a {a} {nf}.`, `{sete} {p} has {a} {ne}.`], sQ = ['{q} en a {b}.', '{q} has {b}.'];
    Object.assign(v, { a: hi, b: lo });
    const s = hiFirst ? [sP, sQ] : [[`{set} {q} a {b} {nf}.`, `{sete} {q} has {b} {ne}.`], ['{p} en a {a}.', '{p} has {a}.']];
    if (L > 1) addDist(R, s, v, [hi, lo]);
    if (fewer) return mkQ({ id: 'cmpf', v, sents: s, q: ['Combien {dnf} {q} a-t-{iq} de moins {qp}?', 'How many fewer {ne} does {q} have than {p}?'], ans: hi - lo });
    return mkQ({ id: 'cmp', v, sents: s, q: ['Combien {dnf} {p} a-t-{il} de plus {qq}?', 'How many more {ne} does {p} have than {q}?'], ans: hi - lo });
  },
  who(c) {
    const { R, L, nb, v } = c, mx = M17[L];
    const a = R.int(3, mx), b = R.int(2, mx);
    if (a === b) return STORY.who(c);
    Object.assign(v, { a, b });
    const s = [[...HAVE[0]], ['{q} en a {b}.', '{q} has {b}.']];
    if (L > 1) addDist(R, s, v, [a, b]);
    const most = R.chance(0.7);
    const pWins = most ? a > b : a < b;
    return mkQ({
      id: most ? 'who' : 'whol', v, sents: s,
      q: most ? ['Qui a le plus {dnf}?', 'Who has more {ne}?'] : ['Qui a le moins {dnf}?', 'Who has fewer {ne}?'],
      opts: [{ text: c.p.n }, { text: c.q.n }], ans: pWins ? 0 : 1, fixed: false,
    });
  },
  miss(c) {
    const { R, L, v } = c, mx = M17[L];
    const a = R.int(L === 1 ? 6 : 20, mx), b = R.int(2, a - 2);
    Object.assign(v, { a, b });
    const s = [['{set} {p} veut avoir {a} {nf}.', '{sete} {p} wants to have {a} {ne}.'], ['{Il} en a déjà {b}.', '{He} already has {b}.']];
    if (L > 1) addDist(R, s, v, [a, b]);
    return mkQ({ id: 'miss', v, sents: s, q: ['Combien {dnf} lui manque-t-il?', 'How many more {ne} does {he} need?'], ans: a - b });
  },
  total(c) {
    const { R, L, v } = c, mx = M17[L], lo = L === 1 ? 2 : 6;
    const a = R.int(lo, mx - lo), b = R.int(lo, Math.min(mx - a, L === 1 ? 10 : 50));
    Object.assign(v, { a, b });
    const s = [[...HAVE[0]], ['{q} en a {b}.', '{q} has {b}.']];
    if (L > 1) addDist(R, s, v, [a, b]);
    return mkQ({ id: 'tot', v, sents: s, q: ['Combien {dnf} ont-{ils} en tout?', 'How many {ne} do they have altogether?'], ans: a + b });
  },
  op(c) {
    const { R, L, nb, v } = c, mx = M17[L];
    let a = R.int(6, mx), b = R.int(2, a - 2);
    while (a === b || b + b === a) b = R.int(2, a - 2);
    const addIt = R.chance(0.5);
    Object.assign(v, { a, b });
    const s = [[...HAVE[0]], addIt ? [`{Il} en ${nb.gv[0]} {b} de plus.`, `{He} ${nb.gv[1]} {b} more.`] : [`{Il} en ${nb.lv[0]} {b}.`, `{He} ${nb.lv[1]} {b} of them.`]];
    if (L > 1) addDist(R, s, v, [a, b]);
    const good = addIt ? `${a} + ${b}` : `${a} − ${b}`;
    const bad = [addIt ? `${a} − ${b}` : `${a} + ${b}`, `${a} + ${a}`];
    const opts = [good, ...bad].map((t) => ({ text: t }));
    return mkQ({ id: 'op', v: { ...v, add: addIt ? 1 : 0 }, sents: s, q: ['Quelle opération permet de trouver la réponse?', 'Which number sentence finds the answer?'], opts, ans: 0, cols: opts.length });
  },
  enough(c) {
    const { R, L, v } = c, mx = M17[L];
    const a = R.int(L === 1 ? 8 : 25, mx), b = R.int(3, a - 4), need = a - b;
    const yes = R.chance(0.5);
    const g = yes ? need + R.int(0, 3) : R.int(1, need - 1);
    Object.assign(v, { a, b, g });
    const s = [['{set} {p} veut avoir {a} {nf}.', '{sete} {p} wants to have {a} {ne}.'], ['{Il} en a {b}.', '{He} has {b}.'], ['{q} lui en donne {g}.', '{q} gives {him} {g} more.']];
    if (L > 1) addDist(R, s, v, [a, b, g]);
    return ynQ('enough', v, s, ['{p} a-t-{il} maintenant assez {dnf}?', 'Does {p} have enough {ne} now?'], b + g >= a);
  },
  two(c) {
    const { R, v, nb } = c;
    const a = R.int(15, 60), b = R.int(5, Math.min(30, 100 - a)), cc = R.int(3, Math.min(35, a + b - 5));
    Object.assign(v, { a, b, c: cc });
    const s = [[...HAVE[0]], [`{Il} en ${nb.gv[0]} {b} de plus.`, `{He} ${nb.gv[1]} {b} more.`], [`Puis, {il} en ${nb.lv[0]} {c}.`, `Then {he} ${nb.lv[1]} {c} of them.`]];
    addDist(R, s, v, [a, b, cc]);
    return mkQ({ id: 'two', v, sents: s, q: ['Combien {dnf} a-t-{il} à la fin?', 'How many {ne} does {he} have at the end?'], ans: a + b - cc });
  },
  totalMinus(c) {
    const { R, v } = c;
    const a = R.int(12, 50), b = R.int(8, Math.min(40, 100 - a)), cc = R.int(5, Math.min(30, a + b - 5));
    Object.assign(v, { a, b, c: cc });
    const s = [[...HAVE[0]], ['{q} en a {b}.', '{q} has {b}.'], ['Ensemble, ils en donnent {c} à une amie.', 'Together they give {c} of them to a friend.']];
    addDist(R, s, v, [a, b, cc]);
    return mkQ({ id: 'totm', v, sents: s, q: ['Combien {dnf} leur reste-t-il?', 'How many {ne} do they have left?'], ans: a + b - cc });
  },
  cmpAfter(c) {
    const { R, v } = c;
    const a = R.int(20, 70), b = R.int(10, a - 3), cc = R.int(5, 30);
    if (a === b + cc) return STORY.cmpAfter(c);
    Object.assign(v, { a, b, c: cc });
    const s = [[...HAVE[0]], ['{q} en a {b}.', '{q} has {b}.'], ['Puis, {q} en reçoit {c} de plus.', 'Then {q} gets {c} more.']];
    addDist(R, s, v, [a, b, cc]);
    return mkQ({ id: 'cafter', v, sents: s, q: ['Qui a le plus {dnf} maintenant?', 'Who has more {ne} now?'], opts: [{ text: c.p.n }, { text: c.q.n }], ans: a > b + cc ? 0 : 1 });
  },
  missTwo(c) {
    const { R, v } = c;
    const a = R.int(45, 95), b = R.int(6, 30), cc = R.int(4, Math.min(30, a - b - 3));
    Object.assign(v, { a, b, c: cc });
    const s = [['{set} {p} veut avoir {a} {nf}.', '{sete} {p} wants to have {a} {ne}.'], ['{Il} en a {b}.', '{He} has {b}.'], ['{q} lui en donne {c}.', '{q} gives {him} {c} more.']];
    addDist(R, s, v, [a, b, cc]);
    return mkQ({ id: 'missT', v, sents: s, q: ['Combien {dnf} lui manque-t-il encore?', 'How many more {ne} does {he} still need?'], ans: a - b - cc });
  },
};
const STORY_KINDS = [[], ['add', 'sub', 'cmp', 'who', 'miss', 'total', 'op', 'cmpf'], ['add', 'sub', 'cmp', 'cmpf', 'who', 'miss', 'total', 'enough', 'op'], ['two', 'enough', 'totalMinus', 'cmpAfter', 'missTwo', 'cmp', 'cmpf', 'two', 'totalMinus']];
function storyQ(R, L) {
  const k = R.pick(STORY_KINDS[L]), c = ctx(R, L);
  return k === 'cmpf' ? STORY.cmp(c, true) : STORY[k](c);
}

// ---------- even / odd ----------
function parityQ(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const N = L === 1 ? R.int(5, 19) : L === 2 ? R.int(11, 59) : R.int(31, 99);
  const v = { ...sv(p, q), N };
  const k = R.int(0, 6);
  const CT = [
    ['À la récré, {N} enfants veulent jouer à la corde à danser. Ils forment des équipes de 2.', 'At recess, {N} children want to play skipping games. They make teams of 2.'],
    ['Au cours d’éducation physique, {N} élèves forment des équipes de 2.', 'In gym class, {N} students make teams of 2.'],
    ['Pour la danse de Noël, {N} enfants se placent deux par deux.', 'For the Christmas dance, {N} children line up in pairs.'],
  ];
  const ci = R.int(0, 2); v.ci = ci;
  if (k <= 1) return mkQ({ id: 'par1', v, sents: [CT[ci]], q: ['Combien d’enfants n’ont pas de partenaire?', 'How many children do not have a partner?'], ans: N % 2 });
  if (k === 2) return ynQ('par2', v, [CT[ci]], ['Chaque enfant a-t-il un partenaire?', 'Does every child have a partner?'], N % 2 === 0);
  if (k === 3) {
    const s = [['Dans l’autobus scolaire, il y a {N} élèves. Chaque banquette a 2 places.', 'On the school bus there are {N} students. Each seat holds 2.']];
    if (L === 1) return mkQ({ id: 'par3', v, sents: s, q: ['Combien d’élèves seront seuls sur une banquette?', 'How many students will sit alone on a seat?'], ans: N % 2 });
    return mkQ({ id: 'par3b', v, sents: s, q: ['Combien de banquettes sont pleines?', 'How many seats are full?'], ans: Math.floor(N / 2) });
  }
  if (k === 4) {
    return mkQ({
      id: 'par4', v, sents: [['Le numéro de chandail {dp} est le {N}.', 'The number on {p}’s hockey jersey is {N}.']],
      q: ['Ce nombre est-il pair ou impair?', 'Is this number even or odd?'], opts: [{ text: T('pair', 'even') }, { text: T('impair', 'odd') }], ans: N % 2 === 0 ? 0 : 1, fixed: true, cols: 2,
    });
  }
  if (k === 5) return ynQ('par5', v, [['{p} a {N} autocollants. {Il} veut les partager également avec {q}.', '{p} has {N} stickers. {He} wants to share them equally with {q}.']], ['Peuvent-ils les partager sans en couper?', 'Can they share them with none left over?'], N % 2 === 0);
  // three house numbers
  const evenSide = R.chance(0.5);
  const mkNum = (even) => { let x = R.int(L === 1 ? 3 : 11, L === 1 ? 19 : 79); if ((x % 2 === 0) !== even) x++; return x; };
  const good = mkNum(evenSide), bad = [mkNum(!evenSide), mkNum(!evenSide)];
  const all = [good, ...bad];
  if (new Set(all).size < 3) return parityQ(R, L);
  return mkQ({
    id: 'par6', v: { ...v, evenSide: evenSide ? 1 : 0, all: all.join('-') },
    sents: [[`Dans la rue {dp}, les maisons ${evenSide ? 'du côté gauche ont des numéros pairs' : 'du côté droit ont des numéros impairs'}.`, `On {p}’s street, the houses on the ${evenSide ? 'left side have even numbers' : 'right side have odd numbers'}.`]],
    q: [evenSide ? 'Quelle maison est du côté gauche?' : 'Quelle maison est du côté droit?', evenSide ? 'Which house is on the left side?' : 'Which house is on the right side?'],
    opts: all.map((x) => ({ text: String(x) })), ans: 0, cols: 3,
  });
}

// ---------- patterns ----------
function patternQ(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const kind = R.int(0, 3);
  const v = { ...sv(p, q) };
  if (kind <= 1) { // numeric growth
    const CT = [
      ['lit', 'reads', 'pages', 'pages', 'read'], ['patine', 'skates', 'tours de patinoire', 'laps around the rink', 'skate'],
      ['dessine', 'draws', 'dessins', 'pictures', 'draw'], ['ramasse', 'collects', 'feuilles d’érable', 'maple leaves', 'collect'], ['cueille', 'picks', 'pommes', 'apples', 'pick'],
    ];
    const DAYS = [['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'], ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']];
    const [vf, ve, nf, ne, vbase] = R.pick(CT);
    const d = L === 1 ? R.int(1, 3) : R.int(2, 6), s0 = L === 1 ? R.int(2, 8) : R.int(3, 20);
    const t = [0, 1, 2, 3, 4].map((i) => s0 + i * d);
    const target = L === 3 ? 4 : 3; // 0-based: 4th or 5th day
    Object.assign(v, { s0, d, vf, nf, tg: target });
    const sents = [0, 1, 2].map((i) => [`${DAYS[0][i]}, ${i === 0 ? '{p}' : '{il}'} ${vf} ${t[i]} ${nf}.`, `On ${DAYS[1][i]}, ${i === 0 ? '{p}' : '{he}'} ${ve} ${t[i]} ${ne}.`]);
    sents.push(['{Il} continue ainsi chaque jour.', '{He} keeps going the same way every day.']);
    return mkQ({ id: 'pat1', v, sents, q: [`Combien en ${vf === 'patine' ? 'fera' : vf === 'lit' ? 'lira' : vf === 'dessine' ? 'dessinera' : vf === 'ramasse' ? 'ramassera' : 'cueillera'}-t-{il} ${DAYS[0][target].toLowerCase() === 'jeudi' ? 'jeudi' : 'vendredi'}?`, `How many ${ne} will {he} ${vbase} on ${DAYS[1][target]}?`], ans: t[target] });
  }
  if (kind === 2) { // decreasing
    const d = R.int(2, 5), s0 = 4 * d + R.int(1, 10) + (L === 3 ? 8 : 0);
    const t = [0, 1, 2, 3, 4].map((i) => s0 - i * d);
    const CT = [['il reste {t} biscuits dans la boîte.', 'there are {t} cookies left in the box.'], ['il reste {t} pages à lire dans le livre.', 'there are {t} pages left to read in the book.'], ['il reste {t} bonbons dans le sac.', 'there are {t} candies left in the bag.']];
    const ci = R.int(0, 2), target = L === 3 ? 4 : 3;
    Object.assign(v, { s0, d, ci, tg: target });
    const days = [['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'], ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']];
    const sents = [0, 1, 2].map((i) => [`${i === 0 ? 'Lundi' : i === 1 ? 'Mardi' : 'Mercredi'}, ${CT[ci][0].replace('{t}', t[i])}`, `On ${days[1][i]}, ${CT[ci][1].replace('{t}', t[i])}`]);
    sents.push(['Le nombre baisse de la même façon chaque jour.', 'The number goes down the same way every day.']);
    return mkQ({ id: 'pat2', v, sents, q: [`Combien en restera-t-il ${days[0][target]}?`, `How many will be left on ${days[1][target]}?`], ans: t[target] });
  }
  // emoji pattern
  const STY = L === 1 ? ['AB', 'AAB', 'AB'] : L === 2 ? ['AB', 'AAB', 'ABC', 'ABB'] : ['ABC', 'ABB', 'AABB', 'AAB', 'ABCC'];
  const style = R.pick(STY);
  const PAL = R.pick([['🔴', '🔵', '🟢', '🟡', '🟣', '🟠'], ['🎃', '👻', '🦇', '🕷️'], ['⭐', '🎄', '🔔', '🎁']]);
  const letters = [...new Set(style)];
  const pcs = R.sample(PAL, letters.length), mp = {};
  letters.forEach((ch, i) => { mp[ch] = pcs[i]; });
  const motif = style.split('').map((ch) => mp[ch]);
  const shown = motif.length * 2 + R.int(0, motif.length - 1);
  const seq = Array.from({ length: shown }, (_, i) => motif[i % motif.length]);
  const posn = L === 3 ? R.int(shown + 2, 14) : shown + 1;
  const ans = motif[(posn - 1) % motif.length];
  const opts = [ans, ...R.sample(PAL.filter((x) => x !== ans), 2)].map((e) => ({ emoji: e }));
  const CTX = [['{p} enfile des perles pour faire un collier. {Il} répète toujours le même motif :', '{p} strings beads to make a necklace. {He} always repeats the same pattern:'], ['{p} installe une guirlande pour Noël. Les décorations suivent un motif :', '{p} hangs a garland for the holidays. The decorations follow a pattern:'], ['{p} décore sa chambre pour l’Halloween. La guirlande suit un motif :', '{p} decorates a room for Halloween. The garland follows a pattern:']];
  const ci = R.int(0, 2);
  const sents = [[`${CTX[ci][0]} ${seq.join(' ')}`, `${CTX[ci][1]} ${seq.join(' ')}`]];
  Object.assign(v, { ci, seq: seq.join(''), posn });
  const qq = posn === shown + 1 ? ['Quel élément vient ensuite?', 'Which piece comes next?'] : [`Quel élément sera le ${posn}e?`, `Which piece will be the ${posn}th?`];
  return mkQ({ id: 'pat3', v, sents, q: qq, opts, ans: 0, cols: 3 });
}

// ---------- shapes ----------
const SH = [
  { fr: 'triangle', en: 'triangle', pf: 'triangles', pe: 'triangles', n: 3, d: ['Elle a 3 côtés et 3 coins.', 'It has 3 sides and 3 corners.'] },
  { fr: 'carré', en: 'square', pf: 'carrés', pe: 'squares', n: 4, d: ['Elle a 4 côtés égaux et 4 coins.', 'It has 4 equal sides and 4 corners.'] },
  { fr: 'rectangle', en: 'rectangle', pf: 'rectangles', pe: 'rectangles', n: 4, d: ['Elle a 4 côtés : 2 longs et 2 courts.', 'It has 4 sides: 2 long and 2 short.'] },
  { fr: 'cercle', en: 'circle', pf: 'cercles', pe: 'circles', n: 0, d: ['Elle est toute ronde, sans coin.', 'It is perfectly round, with no corners.'] },
  { fr: 'pentagone', en: 'pentagon', pf: 'pentagones', pe: 'pentagons', n: 5, d: ['Elle a 5 côtés et 5 coins.', 'It has 5 sides and 5 corners.'] },
  { fr: 'hexagone', en: 'hexagon', pf: 'hexagones', pe: 'hexagons', n: 6, d: ['Elle a 6 côtés et 6 coins.', 'It has 6 sides and 6 corners.'] },
];
function shapeQ(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const v = { ...sv(p, q) };
  const k = R.int(0, 2);
  if (k === 0) { // identify
    const pool = L === 1 ? SH.slice(0, 4) : SH;
    const sh = R.pick(pool), others = R.sample(pool.filter((x) => x !== sh), 2);
    const CT = [['{p} dessine une forme avec des crayons de couleur.', '{p} draws a shape with colored pencils.', 'dessinée', 'draws'], ['Pour son bricolage de Noël, {p} découpe une forme dans du carton.', 'For a Christmas craft, {p} cuts a shape out of cardboard.', 'découpée', 'cuts']];
    const ci = R.int(0, 1);
    Object.assign(v, { sh: sh.fr, ci });
    const opts = [sh, ...others].map((x) => ({ text: T(x.fr, x.en) }));
    return mkQ({ id: 'sh1', v, sents: [[CT[ci][0], CT[ci][1]], sh.d], q: [`Quelle forme a-t-{il} ${CT[ci][2]}?`, 'Which shape is it?'], opts, ans: 0, cols: 3 });
  }
  const pool = L === 1 ? SH.slice(0, 4) : L === 2 ? SH.filter((x) => x.n > 0 || R.chance(0.5)) : SH;
  const [A, B] = R.sample(pool, 2);
  const n = R.int(2, L === 1 ? 3 : 5), m = R.int(2, L === 1 ? 3 : 5);
  const sides = R.chance(0.5);
  Object.assign(v, { A: A.fr, B: B.fr, n, m, sides: sides ? 1 : 0 });
  const s = [[`{p} dessine ${n} ${A.pf} et ${m} ${B.pf}.`, `{p} draws ${n} ${A.pe} and ${m} ${B.pe}.`]];
  if (L === 3 && A.n && B.n) {
    const cn = R.int(2, 4); v.cn = cn; s.push([`{Il} dessine aussi ${cn} cercles.`, `{He} also draws ${cn} circles.`]);
  }
  if (k === 1) return mkQ({ id: 'sh2', v, sents: s, q: sides ? ['Combien de côtés a-t-{il} dessinés en tout?', 'How many sides did {he} draw in all?'] : ['Combien de coins a-t-{il} dessinés en tout?', 'How many corners did {he} draw in all?'], ans: n * A.n + m * B.n });
  // how many shapes with straight sides
  const sa = A.n > 0, sb = B.n > 0;
  return mkQ({ id: 'sh3', v, sents: s, q: ['Combien de formes ont des côtés droits?', 'How many of the shapes have straight sides?'], ans: (sa ? n : 0) + (sb ? m : 0) });
}

// ---------- m18 : numbers to 1000, fractions, equal groups, grid ----------
const nbOf = (ids) => NB.filter((n) => ids.includes(n.id));
const SMALLNB = nbOf(['autoc', 'billes', 'bonbons', 'bisc', 'crayons', 'cartes', 'rondelles']);
const cap = (s) => s[0].toUpperCase() + s.slice(1);
function ctxIn(R, L, pool) {
  const [p, q] = R.sample(PEOPLE, 2);
  const nb = R.pick(pool);
  const v = { ...sv(p, q), nf: nb.fr, ne: nb.en, dnf: ELID(nb.fr) + nb.fr, set: nb.set[0], sete: nb.set[1] };
  return { R, L, p, q, nb, v };
}
function pvBuild(R, L) {
  const { v, nb } = ctxIn(R, L, SMALLNB);
  const h = R.int(2, L === 1 ? 3 : 9), t = R.int(2, L === 1 ? 5 : 9), u = R.int(2, L === 1 ? 6 : 9);
  Object.assign(v, { h, t, u });
  const s = [['{set} {p} a {h} boîtes de 100 {nf}, {t} sacs de 10 {nf} et {u} autres {nf}.', '{sete} {p} has {h} boxes of 100 {ne}, {t} bags of 10 {ne} and {u} more {ne}.']];
  let ans = 100 * h + 10 * t + u;
  if (L === 3) {
    const k = R.int(2, 6); v.k = k; ans += 10 * k;
    if (ans > 999) return pvBuild(R, L);
    s.push([`Puis, {il} en ${nb.gv[0]} {k} sacs de 10 de plus.`, `Then {he} ${nb.gv[1]} {k} more bags of 10.`]);
  }
  if (L > 1) addDist(R, s, v, [h, t, u], 3, 40);
  return mkQ({ id: 'pvb', v, sents: s, q: ['Combien {dnf} a-t-{il} en tout?', 'How many {ne} does {he} have in all?'], ans });
}
function pvDigit(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const v = { ...sv(p, q) };
  let ds;
  do { ds = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3); if (L === 1) ds[0] = R.int(1, 3); } while (new Set(ds).size < 3);
  const N = ds[0] * 100 + ds[1] * 10 + ds[2];
  const CT = [['Le numéro du chalet {dp} est le {N}.', '{p}’s cottage number is {N}.'], ['{p} est à la page {N} de son livre.', '{p} is on page {N} of {his} book.'], ['L’autobus {dp} porte le numéro {N}.', '{p}’s bus has the number {N}.'], ['Le casier {dp} a le numéro {N}.', '{p}’s locker has the number {N}.']];
  const ci = R.int(0, 3);
  Object.assign(v, { N, ci });
  const kind = R.int(0, 2);
  const PL = [['des unités', 'ones'], ['des dizaines', 'tens'], ['des centaines', 'hundreds']];
  if (kind === 0) {
    const pl = R.int(0, 2); v.pl = pl;
    return mkQ({ id: 'pvd', v, sents: [CT[ci]], q: [`Quel est le chiffre ${PL[pl][0]} dans ce nombre?`, `What is the ${PL[pl][1]} digit in this number?`], ans: ds[2 - pl] });
  }
  if (kind === 1) {
    const pl = R.int(0, 2), d = ds[2 - pl]; v.pl = pl;
    return mkQ({ id: 'pvv', v, sents: [CT[ci]], q: [`Quelle est la valeur du chiffre ${d} dans ce nombre?`, `What is the value of the digit ${d} in this number?`], ans: d * [1, 10, 100][pl] });
  }
  const M = L === 1 ? R.int(12, 39) * 10 : L === 2 ? R.int(12, 99) * 10 : R.int(121, 989);
  v.M = M; delete v.N; delete v.ci;
  const s = [['{p} a {M} crayons. {Il} les range en paquets de 10.', '{p} has {M} pencils. {He} puts them in packs of 10.']];
  return mkQ({ id: 'pvt', v, sents: s, q: ['Combien de paquets complets peut-{il} faire?', 'How many full packs can {he} make?'], ans: Math.floor(M / 10) });
}
function pvMental(R, L) {
  const { v, nb } = ctxIn(R, L, SMALLNB);
  const K = L === 1 ? [10, 100] : [10, 20, 30, 40, 100, 200, 300];
  const gain = R.chance(0.5);
  let a, k = R.pick(K);
  if (L === 1) a = R.int(12, 89) * 10; else if (L === 2) a = R.int(111, 899); else a = R.int(210, 799);
  if (!gain) while (a - k < 1) k = R.pick(K);
  if (gain && a + k > 999) k = 10;
  Object.assign(v, { a, k });
  const s = [[...HAVE[0]], gain ? [`{Il} en ${nb.gv[0]} {k} de plus.`, `{He} ${nb.gv[1]} {k} more.`] : [`{Il} en ${nb.lv[0]} {k}.`, `{He} ${nb.lv[1]} {k} of them.`]];
  let ans = gain ? a + k : a - k;
  if (L === 3) {
    const g2 = R.pick([10, 20, 30, 100]); v.g2 = g2;
    s.push(!gain ? [`Puis, {il} en ${nb.gv[0]} {g2} de plus.`, `Then {he} ${nb.gv[1]} {g2} more.`] : [`Puis, {il} en ${nb.lv[0]} {g2}.`, `Then {he} ${nb.lv[1]} {g2} of them.`]);
    ans = !gain ? ans + g2 : ans - g2;
    if (ans < 1 || ans > 999) return pvMental(R, L);
  }
  if (L > 1) addDist(R, s, v, [a, k, v.g2 || 0], 3, 40);
  return mkQ({ id: 'pvm', v, sents: s, q: ['Combien {dnf} a-t-{il} maintenant?', 'How many {ne} does {he} have now?'], ans });
}
function pvNext(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const v = { ...sv(p, q) };
  const N = R.pick([R.int(101, 998), R.int(1, 9) * 100 + 99, R.int(1, 9) * 100, R.int(1, 9) * 100 + R.int(0, 9) * 10 + 9]);
  const after = R.chance(0.5);
  Object.assign(v, { N, after: after ? 1 : 0 });
  const CT = [['{p} lit un livre de la bibliothèque. {Il} est à la page {N}.', '{p} is reading a library book. {He} is on page {N}.'], ['Sur la route du chalet, {p} voit une borne avec le numéro {N}.', 'On the road to the cottage, {p} sees a marker with the number {N}.']];
  const ci = R.int(0, 1); v.ci = ci;
  return mkQ({ id: 'pvn', v, sents: [CT[ci]], q: after ? ['Quel est le nombre qui vient juste après?', 'What number comes right after?'] : ['Quel est le nombre qui vient juste avant?', 'What number comes right before?'], ans: after ? N + 1 : N - 1 });
}
function cmpThree(R, L) {
  const { v } = ctxIn(R, L, SMALLNB);
  const ps = R.sample(PEOPLE, 3);
  let nums;
  if (L === 1) nums = R.sample([110, 130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390], 3);
  else if (L === 2) { const hs = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3); nums = hs.map((h) => h * 100 + R.int(0, 9) * 10 + R.int(0, 9)); }
  else { const h = R.int(1, 9), ts = R.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3); nums = ts.map((t) => h * 100 + t * 10 + R.int(0, 9)); }
  const most = R.chance(0.5);
  const best = nums.indexOf(most ? Math.max(...nums) : Math.min(...nums));
  const vv = { nf: v.nf, ne: v.ne, set: v.set, sete: v.sete, p: ps[0].n, q: ps[1].n, r: ps[2].n, a: nums[0], b: nums[1], c: nums[2], most: most ? 1 : 0 };
  const s = [['{set} trois amis comptent leurs {nf}.', '{sete} three friends count their {ne}.'], ['{p} en a {a}.', '{p} has {a}.'], ['{q} en a {b}.', '{q} has {b}.'], ['{r} en a {c}.', '{r} has {c}.']];
  return mkQ({ id: 'cmp3', v: vv, sents: s, q: most ? ['Qui en a le plus?', 'Who has the most?'] : ['Qui en a le moins?', 'Who has the fewest?'], opts: ps.map((x) => ({ text: x.n })), ans: best, cols: 3 });
}
function cmpDiff(R, L) {
  const { v } = ctxIn(R, L, SMALLNB);
  const hi = (L === 1 ? R.int(20, 40) : R.int(30, 99)) * 10, lo = R.int(11, hi / 10 - 4) * 10;
  Object.assign(v, { a: hi, b: lo });
  const s = [[...HAVE[0]], ['{q} en a {b}.', '{q} has {b}.']];
  if (L > 1) addDist(R, s, v, [hi, lo], 3, 40);
  return mkQ({ id: 'cmpd', v, sents: s, q: ['Combien {dnf} {p} a-t-{il} de plus {qq}?', 'How many more {ne} does {p} have than {q}?'], ans: hi - lo });
}

// ---------- fractions ----------
const FW = { 2: ['la moitié (½)', 'half (½)'], 3: ['le tiers (⅓)', 'a third (⅓)'], 4: ['le quart (¼)', 'a quarter (¼)'], 34: ['les trois quarts (¾)', 'three quarters (¾)'], 23: ['les deux tiers (⅔)', 'two thirds (⅔)'] };
function fracStory(R, L) {
  const { v } = ctxIn(R, L, nbOf(['bisc', 'bonbons', 'billes', 'pommes', 'cartes', 'crayons', 'autoc', 'carottes', 'oeufs', 'ballons']));
  const d = L === 1 ? 2 : R.pick([2, 3, 4]);
  let key = d, mult = 1;
  if (L === 3 && R.chance(0.4)) { if (d === 4) { key = 34; mult = 3; } else if (d === 3) { key = 23; mult = 2; } }
  const N = d === 2 ? 2 * R.int(L === 1 ? 2 : 3, L === 1 ? 6 : L === 2 ? 20 : 30) : d === 3 ? 3 * R.int(2, L === 2 ? 8 : 10) : 4 * R.int(2, L === 2 ? 8 : 12);
  const given = (N / d) * mult;
  Object.assign(v, { N, fw: FW[key][0], fe: FW[key][1] });
  const s = [['{set} {p} a {N} {nf}.', '{sete} {p} has {N} {ne}.'], ['{Il} en donne {fw} à {q}.', '{He} gives {fe} of them to {q}.']];
  if (L > 1) addDist(R, s, v, [N, N / d], 3, 40);
  if (L >= 2 && R.chance(0.5)) return mkQ({ id: 'frl', v, sents: s, q: ['Combien {dnf} lui reste-t-il?', 'How many {ne} does {he} have left?'], ans: N - given });
  return mkQ({ id: 'frg', v, sents: s, q: ['Combien {dnf} donne-t-{il} à {q}?', 'How many {ne} does {he} give to {q}?'], ans: given });
}
const FOODS = [
  { f: 'une pizza', e: 'a pizza', of: 'de la pizza', oe: 'of the pizza', cut: 'coupée' },
  { f: 'une tarte au sucre', e: 'a sugar pie', of: 'de la tarte', oe: 'of the pie', cut: 'coupée' },
  { f: 'un gâteau d’anniversaire', e: 'a birthday cake', of: 'du gâteau', oe: 'of the cake', cut: 'coupé' },
  { f: 'une tablette de chocolat', e: 'a chocolate bar', of: 'de la tablette', oe: 'of the bar', cut: 'coupée' },
  { f: 'une tire sur la neige', e: 'a strip of maple taffy', of: 'de la tire', oe: 'of the taffy', cut: 'coupée' },
];
const FSYM = { 2: '½', 3: '⅓', 4: '¼' };
function fracFood(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const f = R.pick(FOODS), n = R.pick(L === 1 ? [2, 4] : [2, 3, 4]);
  const v = { ...sv(p, q), food: f.f, n };
  const kind = L === 1 ? 0 : R.int(0, 2);
  const s = [[`${cap(f.f)} est ${f.cut} en ${n} parts égales.`, `${cap(f.e)} is cut into ${n} equal parts.`]];
  if (kind === 0) {
    s.push(['{p} en mange 1 part.', '{p} eats 1 part.']);
    return mkQ({ id: 'ff0', v, sents: s, q: [`Quelle fraction ${f.of} {p} a-t-{il} mangée?`, `What fraction ${f.oe} did {p} eat?`], opts: [2, 3, 4].map((x) => ({ text: FSYM[x] })), ans: [2, 3, 4].indexOf(n), fixed: true, cols: 3 });
  }
  if (kind === 1) {
    const b = R.int(1, Math.max(1, n - 2)), left = n - 1 - b;
    if (left < 1) return fracFood(R, L);
    v.b = b;
    s.push([`{p} en mange 1 part. {q} en mange ${b} ${b === 1 ? 'part' : 'parts'}.`, `{p} eats 1 part. {q} eats ${b} ${b === 1 ? 'part' : 'parts'}.`]);
    return mkQ({ id: 'ff1', v, sents: s, q: ['Combien de parts reste-t-il?', 'How many parts are left?'], ans: left });
  }
  s.push(['{p} en mange 1 part.', '{p} eats 1 part.']);
  const LEFT = { 2: '½', 3: '⅔', 4: '¾' };
  const set = new Set([LEFT[n], FSYM[n]]);
  for (const x of R.shuffle(['½', '⅓', '¼', '⅔', '¾'])) if (set.size < 4) set.add(x);
  return mkQ({ id: 'ff2', v, sents: s, q: [`Quelle fraction ${f.of} reste-t-il?`, `What fraction ${f.oe} is left?`], opts: [...set].map((x) => ({ text: x })), ans: 0, cols: 2 });
}
function fracCmp(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const [x, y] = R.pick([[2, 4], [2, 3], [3, 4]]), swap = R.chance(0.5);
  const A = swap ? y : x, B = swap ? x : y;
  const v = { ...sv(p, q), A, B };
  const s = [[`{p} mange ${FSYM[A]} d’une pizza. {q} mange ${FSYM[B]} d’une pizza identique.`, `{p} eats ${FSYM[A]} of a pizza. {q} eats ${FSYM[B]} of an identical pizza.`]];
  return mkQ({ id: 'fc', v, sents: s, q: ['Qui mange le plus de pizza?', 'Who eats more pizza?'], opts: [{ text: p.n }, { text: q.n }], ans: A < B ? 0 : 1 });
}

// ---------- equal groups / sharing ----------
const GR = [
  { set: ['À l’école,', 'At school,'], gf: 'équipes', ge: 'teams', gs: 'équipe', gse: 'team', it: 'joueurs', ie: 'players', ns: [2, 3, 4, 5, 6] },
  { set: ['Dans l’autobus,', 'On the bus,'], gf: 'banquettes', ge: 'seats', gs: 'banquette', gse: 'seat', it: 'élèves', ie: 'students', ns: [2, 3] },
  { set: ['Au jardin,', 'In the garden,'], gf: 'rangs', ge: 'rows', gs: 'rang', gse: 'row', it: 'carottes', ie: 'carrots', ns: [3, 4, 5, 6, 10] },
  { set: ['À la ferme,', 'On the farm,'], gf: 'boîtes', ge: 'boxes', gs: 'boîte', gse: 'box', it: 'œufs', ie: 'eggs', ns: [4, 6] },
  { set: ['Au camp de jour,', 'At day camp,'], gf: 'tables', ge: 'tables', gs: 'table', gse: 'table', it: 'enfants', ie: 'children', ns: [2, 3, 4, 5, 6] },
  { set: ['À la fête d’anniversaire,', 'At the birthday party,'], gf: 'sacs', ge: 'bags', gs: 'sac', gse: 'bag', it: 'bonbons', ie: 'candies', ns: [2, 3, 4, 5, 10] },
  { set: ['À la patinoire,', 'At the rink,'], gf: 'groupes', ge: 'groups', gs: 'groupe', gse: 'group', it: 'patineurs', ie: 'skaters', ns: [2, 3, 4, 5, 6] },
  { set: ['À la cabane à sucre,', 'At the sugar shack,'], gf: 'plateaux', ge: 'trays', gs: 'plateau', gse: 'tray', it: 'tartes au sucre', ie: 'sugar pies', ns: [2, 3, 4, 5, 6] },
];
function grCtx(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const g = R.pick(GR);
  let ns = L === 1 ? g.ns.filter((n) => [2, 3, 5, 10].includes(n)) : g.ns;
  if (!ns.length) ns = g.ns;
  const n = R.pick(ns), cnt = L === 1 ? R.int(2, 5) : R.int(2, L === 2 ? 8 : 10);
  const v = { ...sv(p, q), set: g.set[0], sete: g.set[1], gf: g.gf, ge: g.ge, gs: g.gs, gse: g.gse, it: g.it, ie: g.ie, dit: ELID(g.it) + g.it, dgf: ELID(g.gf) + g.gf, n, g: cnt };
  return { R, L, v };
}
const GRS = [['{set} il y a {g} {gf} de {n} {it}.', '{sete} there are {g} {ge} with {n} {ie} each.']];
function grTotal(R, L) {
  const { v } = grCtx(R, L);
  const s = [[...GRS[0]]];
  if (L > 1) addDist(R, s, v, [v.g, v.n], 3, 40);
  return mkQ({ id: 'grt', v, sents: s, q: ['Combien {dit} y a-t-il en tout?', 'How many {ie} are there in all?'], ans: v.g * v.n });
}
function grHow(R, L) {
  const { v } = grCtx(R, L);
  v.a = v.g * v.n;
  const s = [['{set} il y a {a} {it}.', '{sete} there are {a} {ie}.'], ['Chaque {gs} a {n} {it}.', 'Each {gse} has {n} {ie}.']];
  if (L > 1) addDist(R, s, v, [v.a, v.n], 3, 40);
  return mkQ({ id: 'grh', v, sents: s, q: ['Combien {dgf} y a-t-il?', 'How many {ge} are there?'], ans: v.g });
}
function grShare(R, L) {
  const { v } = ctxIn(R, L, SMALLNB);
  const k = R.int(2, L === 1 ? 5 : 6), per = R.int(2, L === 1 ? 5 : 9);
  const rem = L === 3 && R.chance(0.6) ? R.int(1, k - 1) : 0;
  const a = k * per + rem;
  Object.assign(v, { a, k });
  const s = [rem ? ['{set} {p} partage {a} {nf} entre {k} amis, le plus possible chacun.', '{sete} {p} shares {a} {ne} among {k} friends, as many as possible each.'] : ['{set} {p} partage {a} {nf} également entre {k} amis.', '{sete} {p} shares {a} {ne} equally among {k} friends.']];
  if (L > 1) addDist(R, s, v, [a, k], 3, 40);
  if (rem && R.chance(0.5)) return mkQ({ id: 'gsr', v, sents: s, q: ['Combien {dnf} reste-t-il?', 'How many {ne} are left over?'], ans: rem });
  return mkQ({ id: 'gsh', v, sents: s, q: ['Combien {dnf} chaque ami reçoit-il?', 'How many {ne} does each friend get?'], ans: per });
}
function grDaily(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const CT = [['lit', 'lit-{il}', 'read', 'pages', 'pages', 'de pages', 'reads'], ['patine', 'patine-t-{il}', 'skate', 'tours de patinoire', 'laps around the rink', 'de tours de patinoire', 'skates'], ['boit', 'boit-{il}', 'drink', 'verres d’eau', 'glasses of water', 'de verres d’eau', 'drinks'], ['ramasse', 'ramasse-t-{il}', 'collect', 'feuilles d’érable', 'maple leaves', 'de feuilles d’érable', 'collects']];
  const [vf, vq, vb, nf, ne, dn2, ve] = R.pick(CT);
  const n = R.int(2, L === 1 ? 5 : 9), d = R.int(2, L === 1 ? 5 : 7);
  const v = { ...sv(p, q), vf, n, d };
  const s = [[`Chaque jour, {p} ${vf} {n} ${nf}.`, `Every day, {p} ${ve} {n} ${ne}.`]];
  if (L > 1) addDist(R, s, v, [n, d], 3, 40);
  return mkQ({ id: 'grd', v, sents: s, q: [`Combien ${dn2} ${vq} en {d} jours?`, `How many ${ne} does {he} ${vb} in {d} days?`], ans: n * d });
}
function grSeats(R, L) {
  const { v } = grCtx(R, L);
  const total = v.g * v.n;
  const yes = R.chance(0.5), seats = yes ? total + R.int(0, 6) : total - R.int(1, Math.min(6, total - 1));
  v.seats = seats;
  const s = [[...GRS[0]], ['Tout le monde doit monter dans un petit autobus qui a {seats} places.', 'Everyone has to get on a small bus that has {seats} seats.']];
  addDist(R, s, v, [v.g, v.n, seats], 3, 40);
  return ynQ('grs', v, s, ['Y a-t-il assez de places pour tous?', 'Are there enough seats for everyone?'], seats >= total);
}

// ---------- position on a grid ----------
const GTARGET = [
  { e: '🏠', f: 'la maison', n: 'the house' }, { e: '🍁', f: 'la cabane à sucre', n: 'the sugar shack' }, { e: '🏫', f: 'l’école', n: 'the school' },
  { e: '⛸️', f: 'la patinoire', n: 'the rink' }, { e: '🚌', f: 'l’arrêt d’autobus', n: 'the bus stop' }, { e: '🌳', f: 'le grand arbre', n: 'the big tree' },
];
const labC = (c, r) => 'ABCDEFG'[c] + (r + 1);
function gridQ(R, L) {
  const [p] = R.sample(PEOPLE, 1);
  const cols = L === 1 ? 4 : L === 2 ? 5 : 6, rows = L === 1 ? 3 : L === 2 ? 4 : 5;
  const tg = R.pick(GTARGET), av = p.g === 'f' ? '👧' : '👦';
  const kind = R.int(0, 2);
  const mk = (key, fr, en, qf, qe, svg, extra) => ({ key: `${key}${p.n}`, prompt: T(`${fr} ${qf}`, `${en} ${qe}`), say: SAY(`${fr} ${qf}`, `${en} ${qe}`), stimulus: { svg }, ...extra });
  if (kind === 0) {
    let sc, sr, dx, dy, tc, tr, ok = false;
    for (let g = 0; g < 200 && !ok; g++) {
      sc = R.int(0, cols - 1); sr = R.int(0, rows - 1);
      dx = L === 1 ? R.int(1, 3) : R.int(-3, 3); dy = L === 1 ? R.int(0, 2) : R.int(-2, 2);
      tc = sc + dx; tr = sr + dy;
      ok = dx !== 0 && tc >= 0 && tc < cols && tr >= 0 && tr < rows;
    }
    if (!ok) return gridQ(R, L);
    const hx = dx > 0 ? ['vers la droite', 'to the right'] : ['vers la gauche', 'to the left'];
    const hy = dy > 0 ? ['vers le bas', 'down'] : ['vers le haut', 'up'];
    const ax = Math.abs(dx), ay = Math.abs(dy);
    const fr = `${p.n} est sur la case ${labC(sc, sr)}. ${Il(p)} avance de ${ax} case${ax > 1 ? 's' : ''} ${hx[0]}${dy ? `, puis de ${ay} case${ay > 1 ? 's' : ''} ${hy[0]}` : ''}.`;
    const en = `${p.n} is on square ${labC(sc, sr)}. ${He(p)} moves ${ax} square${ax > 1 ? 's' : ''} ${hx[1]}${dy ? `, then ${ay} square${ay > 1 ? 's' : ''} ${hy[1]}` : ''}.`;
    const cells = [{ c: sc, r: sr, e: av }];
    const all = [];
    for (let r = 0; r < rows; r++) for (let c2 = 0; c2 < cols; c2++) { if (c2 === tc && r === tr) continue; all.push(labC(c2, r)); if (!(c2 === sc && r === sr) && R.chance(0.15)) cells.push({ c: c2, r, e: '🌲' }); }
    const wrong = R.sample(all.filter((x) => x !== labC(sc, sr)), 3);
    return mk(`gm${cols}${rows}${labC(sc, sr)}${dx}_${dy}${cells.length}`, fr, en, `Sur quelle case arrive-t-${il(p)}?`, `Which square does ${he(p)} land on?`, S.plan(cols, rows, cells, null), { type: 'choice', options: [labC(tc, tr), ...wrong].map((x) => ({ text: x })), answer: 0, cols: 2 });
  }
  const sc = R.int(0, cols - 2), sr = R.int(0, rows - 2), tc = R.int(sc + 1, cols - 1), tr = R.int(sr + 1, rows - 1);
  const cells = [{ c: sc, r: sr, e: av }, { c: tc, r: tr, e: tg.e }];
  const svg = S.plan(cols, rows, cells, null);
  if (kind === 1) {
    const horiz = R.chance(0.5);
    const fr = `${p.n} (${av}) veut aller à ${tg.f} (${tg.e}). ${Il(p)} avance sur la grille.`, en = `${p.n} (${av}) wants to go to ${tg.n} (${tg.e}). ${He(p)} moves on the grid.`;
    return mk(`gd${cols}${rows}${sc}${sr}${tc}${tr}${tg.e}${horiz}`, fr, en,
      horiz ? `Combien de cases doit-${il(p)} avancer vers la droite?` : `Combien de cases doit-${il(p)} avancer vers le bas?`,
      horiz ? `How many squares must ${he(p)} move to the right?` : `How many squares must ${he(p)} move down?`, svg, { type: 'keypad', answer: horiz ? tc - sc : tr - sr });
  }
  const fr = `${p.n} (${av}) regarde la carte. ${Il(p)} cherche ${tg.f} (${tg.e}).`, en = `${p.n} (${av}) looks at the map. ${He(p)} is looking for ${tg.n} (${tg.e}).`;
  const all = [];
  for (let r = 0; r < rows; r++) for (let c2 = 0; c2 < cols; c2++) if (!(r === tr && c2 === tc)) all.push(labC(c2, r));
  return mk(`gw${cols}${rows}${sc}${sr}${tc}${tr}${tg.e}`, fr, en, `Sur quelle case est ${tg.f}?`, `Which square is ${tg.n} on?`, svg, { type: 'choice', options: [labC(tc, tr), ...R.sample(all, 3)].map((x) => ({ text: x })), answer: 0, cols: 2 });
}
function m18Q(R, L) {
  const r = R.int(1, 100);
  if (r <= 26) return R.pick([pvBuild, pvDigit, pvMental, pvNext, pvBuild, pvMental])(R, L);
  if (r <= 44) return R.pick([cmpThree, cmpDiff, cmpThree])(R, L);
  if (r <= 66) return R.pick([fracStory, fracStory, fracFood, fracCmp])(R, L);
  if (r <= 92) return (L === 3 ? R.pick([grTotal, grHow, grShare, grDaily, grSeats, grShare]) : R.pick([grTotal, grHow, grShare, grDaily]))(R, L);
  return gridQ(R, L);
}

// ---------- m19 : measurement, time, money, tables, two-step ----------
const ind = (g) => (g === 'm' ? 'un' : 'une');
const LEN = [
  { s: 'ruban', pl: 'rubans', g: 'm', es: 'ribbon', epl: 'ribbons' },
  { s: 'corde', pl: 'cordes', g: 'f', es: 'rope', epl: 'ropes' },
  { s: 'bâton', pl: 'bâtons', g: 'm', es: 'stick', epl: 'sticks' },
  { s: 'branche', pl: 'branches', g: 'f', es: 'branch', epl: 'branches' },
  { s: 'écharpe', pl: 'écharpes', g: 'f', es: 'scarf', epl: 'scarves' },
  { s: 'planche', pl: 'planches', g: 'f', es: 'board', epl: 'boards' },
];
const UNITS_CM_M = [
  ['la longueur d’un crayon', 'the length of a pencil', 0], ['la longueur d’une gomme à effacer', 'the length of an eraser', 0],
  ['la largeur de la cour d’école', 'the width of the schoolyard', 1], ['la longueur d’un autobus scolaire', 'the length of a school bus', 1],
  ['la longueur d’une brosse à dents', 'the length of a toothbrush', 0], ['la longueur de la patinoire', 'the length of the rink', 1],
  ['la hauteur d’un cahier', 'the height of a notebook', 0], ['la longueur d’un terrain de soccer', 'the length of a soccer field', 1],
  ['la largeur d’une carte de hockey', 'the width of a hockey card', 0], ['la longueur de la classe', 'the length of the classroom', 1],
];
function lenQ(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const o = R.pick(LEN);
  const v = { ...sv(p, q), s: o.s };
  const g = o.g;
  const kind = R.int(0, 6);
  const mx = L === 1 ? 30 : 100;
  const has = (who, n) => [`${who} a ${ind(g)} ${o.s} de ${n} cm.`, `${who} has a ${o.es} that is ${n} cm long.`];
  if (kind === 0) {
    const a = R.int(5, mx - 8), b = R.int(5, Math.min(mx - a, L === 1 ? 20 : 60));
    Object.assign(v, { a, b });
    const s = [has('{p}', '{a}'), has('{q}', '{b}')];
    if (L > 1) addDist(R, s, v, [a, b], 3, 40);
    return mkQ({ id: 'ln0', v, sents: s, q: [`Combien de centimètres font les deux ${o.pl} bout à bout?`, `How many cm long are the two ${o.epl} end to end?`], ans: a + b });
  }
  if (kind === 1) {
    const hi = R.int(L === 1 ? 12 : 30, mx), lo = R.int(5, hi - 3);
    const [P, Q] = R.sample(PEOPLE, 2);
    const vv = { ...sv(P, Q), s: o.s, a: hi, b: lo };
    const s = [has('{p}', '{a}'), has('{q}', '{b}')];
    if (R.chance(0.5)) s.reverse();
    if (L > 1) addDist(R, s, vv, [hi, lo], 3, 40);
    return mkQ({ id: 'ln1', v: vv, sents: s, q: [`Combien de centimètres de plus mesure ${/^[aeiouyéèêâîô]/i.test(o.s) ? 'l’' : g === 'm' ? 'le ' : 'la '}${o.s} {dp} que ${g === 'm' ? 'celui' : 'celle'} {dq}?`, `How many cm longer is {p}’s ${o.es} than {q}’s?`], ans: hi - lo });
  }
  if (kind === 2 || kind === 3) {
    const a = R.int(L === 1 ? 12 : 40, mx), two = L === 3 || kind === 3 && L === 2;
    const b = R.int(3, Math.max(4, Math.floor((a - 4) / (two ? 2 : 1))));
    const c2 = two ? R.int(3, Math.max(4, a - b - 3)) : 0;
    if (a - b - c2 < 1) return lenQ(R, L);
    Object.assign(v, { a, b, c: c2 });
    const s = [has('{p}', '{a}'), two ? [`{Il} en coupe {b} cm, puis encore {c} cm.`, `{He} cuts {b} cm off, then another {c} cm.`] : [`{Il} en coupe {b} cm.`, `{He} cuts {b} cm off it.`]];
    if (L > 1) addDist(R, s, v, [a, b, c2], 3, 40);
    return mkQ({ id: 'ln2', v, sents: s, q: ['Combien de centimètres reste-t-il?', 'How many cm are left?'], ans: a - b - c2 });
  }
  if (kind === 4) {
    const m = R.int(2, L === 1 ? 5 : 9), c2 = L === 3 ? R.pick([10, 20, 30, 40, 50, 60, 70, 80, 90]) : 0;
    Object.assign(v, { m, c: c2 });
    const s = [c2 ? [`{p} a ${ind(g)} ${o.s} de {m} m et {c} cm.`, `{p} has a ${o.es} that is {m} m and {c} cm long.`] : [`{p} a ${ind(g)} ${o.s} de {m} m.`, `{p} has a ${o.es} that is {m} m long.`]];
    if (L < 3) s.push(['Rappel : 1 m = 100 cm.', 'Reminder: 1 m = 100 cm.']);
    else addDist(R, s, v, [m, c2], 3, 40);
    return mkQ({ id: 'ln4', v, sents: s, q: ['Combien de centimètres cela fait-il?', 'How many cm is that?'], ans: m * 100 + c2 });
  }
  if (kind === 5) {
    const u = R.pick(UNITS_CM_M);
    v.u = u[0];
    return mkQ({ id: 'ln5', v, sents: [[`{p} veut mesurer ${u[0]}.`, `{p} wants to measure ${u[1]}.`]], q: ['Quelle unité est la plus pratique?', 'Which unit is the most useful?'], opts: [{ text: 'cm' }, { text: 'm' }], ans: u[2], fixed: true, cols: 2 });
  }
  const a = R.int(8, mx), b = R.int(8, mx);
  if (a === b) return lenQ(R, L);
  Object.assign(v, { a, b });
  const s = [has('{p}', '{a}'), has('{q}', '{b}')];
  if (L > 1) addDist(R, s, v, [a, b], 3, 40);
  return mkQ({ id: 'ln6', v, sents: s, q: [`Qui a ${g === 'm' ? 'le plus long' : 'la plus longue'} ${o.s}?`, `Whose ${o.es} is longer?`], opts: [{ text: p.n }, { text: q.n }], ans: a > b ? 0 : 1 });
}

// ---------- time ----------
const WD = [['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'], ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']];
const MO = [['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'], ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']];
const tF = (h, half) => (half ? `${h} h 30` : `${h} h`);
const tE = (h, half) => (half ? `${h}:30` : `${h}:00`);
const tT = (h, half) => T(tF(h, half), tE(h, half));
const EVT = [
  ['Le cours de natation', 'le cours de natation', 'The swimming lesson', 'the swimming lesson'],
  ['Le match de hockey', 'le match de hockey', 'The hockey game', 'the hockey game'],
  ['Le spectacle de Noël', 'le spectacle de Noël', 'The Christmas show', 'the Christmas show'],
  ['La fête d’anniversaire', 'la fête d’anniversaire', 'The birthday party', 'the birthday party'],
  ['L’atelier de bricolage', 'l’atelier de bricolage', 'The craft workshop', 'the craft workshop'],
  ['La sortie à la cabane à sucre', 'la sortie à la cabane à sucre', 'The trip to the sugar shack', 'the trip to the sugar shack'],
  ['Le film à la bibliothèque', 'le film à la bibliothèque', 'The movie at the library', 'the movie at the library'],
];
const hrs = (k) => T(`${k} heure${k > 1 ? 's' : ''}`, `${k} hour${k > 1 ? 's' : ''}`);
function timeQ(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const v = { ...sv(p, q) };
  const kinds = L === 1 ? ['end', 'dur', 'week', 'wday', 'wday'] : L === 2 ? ['end', 'start', 'dur', 'week', 'wday', 'month', 'mins'] : ['end', 'start', 'dur', 'week2', 'wday', 'month', 'mins', 'end'];
  const kind = R.pick(kinds);
  if (kind === 'end' || kind === 'start' || kind === 'dur') {
    const ev = R.pick(EVT);
    const half = L >= 2 && R.chance(0.5);
    const k = R.int(1, 4), h = R.int(1, 8);
    const long = L === 3 && R.chance(0.5); // adds a half hour to the length
    const dh = k + (long ? 0.5 : 0);
    // end time in half-hours
    const startHalf = half ? 1 : 0;
    const startTot = h * 2 + startHalf, endTot = startTot + dh * 2;
    const eh = Math.floor(endTot / 2), ehalf = endTot % 2 === 1;
    if (eh > 12) return timeQ(R, L);
    const lenT = long ? T(`${k} heure${k > 1 ? 's' : ''} et demie`, `${k} and a half hours`) : hrs(k);
    Object.assign(v, { ev: ev[0], h, half: startHalf, k, long: long ? 1 : 0 });
    const optsT = (hh, hf) => {
      const set = new Map();
      set.set(tF(hh, hf), tT(hh, hf));
      const cand = [[hh + 1, hf], [hh - 1, hf], [hh + 2, hf], [hh, !hf], [hh + 1, !hf], [hh - 1, !hf]].filter(([x]) => x >= 1 && x <= 12);
      for (const [x, y] of R.shuffle(cand)) if (set.size < 4) set.set(tF(x, y), tT(x, y));
      return [...set.values()].map((t) => ({ text: t }));
    };
    if (kind === 'end') {
      const s = [[`${ev[0]} commence à ${tF(h, half)} et dure ${lenT.fr}.`, `${ev[2]} starts at ${tE(h, half)} and lasts ${lenT.en}.`]];
      return mkQ({ id: 'tmE', v, sents: s, q: [`À quelle heure finit ${ev[1]}?`, `What time does ${ev[3]} end?`], opts: optsT(eh, ehalf), ans: 0, cols: 2 });
    }
    if (kind === 'start') {
      const s = [[`${ev[0]} finit à ${tF(eh, ehalf)} et dure ${lenT.fr}.`, `${ev[2]} ends at ${tE(eh, ehalf)} and lasts ${lenT.en}.`]];
      return mkQ({ id: 'tmS', v, sents: s, q: [`À quelle heure commence ${ev[1]}?`, `What time does ${ev[3]} start?`], opts: optsT(h, half), ans: 0, cols: 2 });
    }
    // duration (whole hours)
    const w = { ...v, long: 0 };
    const s = [[`${ev[0]} commence à ${tF(h, half)} et finit à ${tF(h + k, half)}.`, `${ev[2]} starts at ${tE(h, half)} and ends at ${tE(h + k, half)}.`]];
    if (h + k > 12) return timeQ(R, L);
    return mkQ({ id: 'tmD', v: w, sents: s, q: [`Combien d’heures dure ${ev[1]}?`, `How many hours does ${ev[3]} last?`], ans: k });
  }
  if (kind === 'week' || kind === 'week2') {
    const w = R.int(2, L === 1 ? 4 : 9), d = kind === 'week2' ? R.int(1, 6) : 0;
    Object.assign(v, { w, d });
    const CT = [['Le camp de jour dure {w} semaines', 'Day camp lasts {w} weeks'], ['{p} part au chalet pour {w} semaines', '{p} goes to the cottage for {w} weeks'], ['La classe de neige dure {w} semaines', 'The snow class lasts {w} weeks']];
    const ci = R.int(0, 2); v.ci = ci;
    const s = [[CT[ci][0] + (d ? ` et ${d} jour${d > 1 ? 's' : ''}.` : '.'), CT[ci][1] + (d ? ` and ${d} day${d > 1 ? 's' : ''}.` : '.')]];
    if (L < 3) s.push(['Une semaine = 7 jours.', 'One week = 7 days.']);
    return mkQ({ id: 'tmW', v, sents: s, q: ['Combien de jours cela fait-il?', 'How many days is that?'], ans: w * 7 + d });
  }
  if (kind === 'wday') {
    const t = R.int(0, 6), k = L === 1 ? R.int(1, 3) : R.int(2, 6), back = L === 3 && R.chance(0.4);
    const ans = (t + (back ? -k : k) + 14) % 7;
    Object.assign(v, { t, k, back: back ? 1 : 0 });
    const ev = R.pick([['la fête d’anniversaire {dp}', '{p}’s birthday party'], ['le match de hockey', 'the hockey game'], ['la sortie de classe', 'the class trip'], ['le spectacle de Noël', 'the Christmas show']]);
    const fr = back ? `Aujourd’hui, c’est ${WD[0][t]}. ${cap(ev[0])} était il y a ${k} jours.` : `Aujourd’hui, c’est ${WD[0][t]}. ${cap(ev[0])} aura lieu dans ${k} jours.`;
    const en = back ? `Today is ${WD[1][t]}. ${cap(ev[1])} was ${k} days ago.` : `Today is ${WD[1][t]}. ${cap(ev[1])} is in ${k} days.`;
    const idxs = [ans, ...R.sample([0, 1, 2, 3, 4, 5, 6].filter((x) => x !== ans), 3)];
    return mkQ({ id: 'tmY', v: { ...v, ev: ev[1] }, sents: [[fr, en]], q: ['Quel jour est-ce?', 'What day is it?'], opts: idxs.map((i) => ({ text: T(WD[0][i], WD[1][i]) })), ans: 0, cols: 2 });
  }
  if (kind === 'month') {
    const t = R.int(0, 11), k = R.int(2, 5), back = L === 3 && R.chance(0.4);
    const ans = (t + (back ? -k : k) + 24) % 12;
    Object.assign(v, { t, k, back: back ? 1 : 0 });
    const frC = back ? `L’anniversaire ${dn(p.n)} est en ${MO[0][t]}. L’anniversaire ${dn(q.n)} est ${k} mois plus tôt.` : `L’anniversaire ${dn(p.n)} est en ${MO[0][t]}. L’anniversaire ${dn(q.n)} est ${k} mois plus tard.`;
    const enC = back ? `${p.n}’s birthday is in ${MO[1][t]}. ${q.n}’s birthday is ${k} months earlier.` : `${p.n}’s birthday is in ${MO[1][t]}. ${q.n}’s birthday is ${k} months later.`;
    const idxs = [ans, ...R.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].filter((x) => x !== ans), 3)];
    return mkQ({ id: 'tmM', v, sents: [[frC, enC]], q: [`Dans quel mois est l’anniversaire ${dn(q.n)}?`, `Which month is ${q.n}’s birthday in?`], opts: idxs.map((i) => ({ text: T(MO[0][i], MO[1][i]) })), ans: 0, cols: 2 });
  }
  // minutes
  const per = R.pick(L === 2 ? [10, 15, 20, 30] : [10, 15, 20, 25, 30]), n = R.int(2, L === 2 ? 4 : 6);
  Object.assign(v, { per, n });
  const CT = [['Un tournoi de hockey compte {n} matchs de {per} minutes.', 'A hockey tournament has {n} games of {per} minutes.'], ['{p} fait {n} tours de patinoire. Chaque tour dure {per} minutes.', '{p} skates {n} laps of the rink. Each lap takes {per} minutes.'], ['Le cours de natation a {n} activités de {per} minutes chacune.', 'The swimming lesson has {n} activities of {per} minutes each.']];
  const ci = R.int(0, 2); v.ci = ci;
  return mkQ({ id: 'tmI', v, sents: [CT[ci]], q: ['Combien de minutes cela fait-il en tout?', 'How many minutes is that in all?'], ans: per * n });
}

// ---------- money (Québec format: 1,25 $) ----------
const MI = [
  { s: 'tablette de chocolat', pl: 'tablettes de chocolat', g: 'f', es: 'chocolate bar', epl: 'chocolate bars' },
  { s: 'jus', pl: 'jus', g: 'm', es: 'juice', epl: 'juices' },
  { s: 'sac de croustilles', pl: 'sacs de croustilles', g: 'm', es: 'bag of chips', epl: 'bags of chips' },
  { s: 'crème glacée', pl: 'crèmes glacées', g: 'f', es: 'ice cream', epl: 'ice creams' },
  { s: 'livre', pl: 'livres', g: 'm', es: 'book', epl: 'books' },
  { s: 'yoyo', pl: 'yoyos', g: 'm', es: 'yo-yo', epl: 'yo-yos' },
  { s: 'casse-tête', pl: 'casse-têtes', g: 'm', es: 'puzzle', epl: 'puzzles' },
  { s: 'tuque', pl: 'tuques', g: 'f', es: 'hat', epl: 'hats' },
  { s: 'balle rebondissante', pl: 'balles rebondissantes', g: 'f', es: 'bouncy ball', epl: 'bouncy balls' },
  { s: 'hot-dog', pl: 'hot-dogs', g: 'm', es: 'hot dog', epl: 'hot dogs' },
];
const SHOPS = [['Au dépanneur,', 'At the corner store,'], ['À l’épicerie,', 'At the grocery store,'], ['Au bazar de l’école,', 'At the school bazaar,'], ['À la cabane à sucre,', 'At the sugar shack,'], ['À la patinoire,', 'At the rink,']];
const COINS = { 200: ['pièce de 2 $', 'pièces de 2 $', '2-dollar coin', '2-dollar coins'], 100: ['pièce de 1 $', 'pièces de 1 $', '1-dollar coin', '1-dollar coins'], 25: ['pièce de 25 ¢', 'pièces de 25 ¢', '25-cent coin', '25-cent coins'], 10: ['pièce de 10 ¢', 'pièces de 10 ¢', '10-cent coin', '10-cent coins'], 5: ['pièce de 5 ¢', 'pièces de 5 ¢', '5-cent coin', '5-cent coins'] };
const coinPh = (val, n) => (n === 1 ? [`une ${COINS[val][0]}`, `a ${COINS[val][2]}`] : [`${n} ${COINS[val][1]}`, `${n} ${COINS[val][3]}`]);
const joinPh = (arr, i) => {
  if (arr.length === 1) return arr[0][i];
  const word = i === 0 ? ' et ' : ' and ';
  return arr.slice(0, -1).map((x) => x[i]).join(', ') + word + arr[arr.length - 1][i];
};
function moneyQ(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const sh = R.pick(SHOPS);
  const [a1, a2] = R.sample(MI, 2);
  const v = { ...sv(p, q), set: sh[0], sete: sh[1], i1: a1.s };
  const kinds = L === 1 ? ['tot', 'tot', 'chg', 'bills', 'cents', 'coin1'] : L === 2 ? ['tot', 'chg', 'bills', 'cents', 'fmt', 'enough', 'chg2', 'coin1', 'enoughc'] : ['two', 'fmt', 'chg2', 'save', 'two', 'enough', 'enoughc', 'cents', 'fmt', 'bills'];
  const kind = R.pick(kinds);
  const P1 = L === 1 ? R.int(1, 6) : R.int(2, 12);
  if (kind === 'tot') {
    const a = P1, b = L === 1 ? R.int(1, 6) : R.int(2, 12);
    Object.assign(v, { a, b, i2: a2.s });
    return mkQ({ id: 'mo1', v, sents: [[`{set} {p} achète ${ind(a1.g)} ${a1.s} à {a} $ et ${ind(a2.g)} ${a2.s} à {b} $.`, `{sete} {p} buys a ${a1.es} for $\{a} and a ${a2.es} for $\{b}.`]], q: ['Combien d’argent dépense-t-{il} en tout?', 'How much money does {he} spend in all?'], ans: a + b });
  }
  if (kind === 'chg') {
    const B = R.pick(L === 1 ? [5, 10] : [5, 10, 20]), a = R.int(1, B - 1);
    Object.assign(v, { a, B });
    return mkQ({ id: 'mo2', v, sents: [[`{set} {p} achète ${ind(a1.g)} ${a1.s} à {a} $. {Il} donne un billet de {B} $.`, `{sete} {p} buys a ${a1.es} for $\{a}. {He} hands over a $\{B} bill.`]], q: ['Combien d’argent lui rend-on?', 'How much change does {he} get back?'], ans: B - a });
  }
  if (kind === 'bills') {
    const x = R.int(2, L === 1 ? 4 : 7), y = R.int(2, L === 1 ? 4 : 7), z = L === 3 ? R.int(2, 5) : 0;
    Object.assign(v, { x, y, z });
    const parts = [[`${x} billets de 5 $`, `${x} $5 bills`], [`${y} billets de 10 $`, `${y} $10 bills`]];
    if (z) parts.push([`${z} pièces de 2 $`, `${z} 2-dollar coins`]);
    return mkQ({ id: 'mo3', v, sents: [[`{p} a ${joinPh(parts, 0)}.`, `{p} has ${joinPh(parts, 1)}.`]], q: ['Combien de dollars a-t-{il} en tout?', 'How many dollars does {he} have in all?'], ans: 5 * x + 10 * y + 2 * z });
  }
  if (kind === 'cents' || kind === 'fmt') {
    const pool = kind === 'cents' ? (L === 1 ? [25, 10] : [25, 10, 5]) : (L === 1 ? [100, 25] : [200, 100, 25, 10, 5]);
    const ks = R.sample(pool, Math.min(pool.length, L === 3 ? 3 : 2)).sort((a, b) => b - a);
    const cnt = ks.map(() => R.int(2, L === 1 ? 3 : 4));
    if (kind === 'fmt' && R.chance(0.3)) cnt[0] = 1;
    const tot = ks.reduce((s, kv, i) => s + kv * cnt[i], 0);
    Object.assign(v, { ks: ks.join(), cnt: cnt.join() });
    const parts = ks.map((kv, i) => coinPh(kv, cnt[i]));
    if (kind === 'cents') return mkQ({ id: 'mo4', v, sents: [[`{p} a ${joinPh(parts, 0)}.`, `{p} has ${joinPh(parts, 1)}.`]], q: ['Combien de cents a-t-{il} en tout?', 'How many cents does {he} have in all?'], ans: tot });
    const set = new Set([tot]);
    const deltas = R.shuffle([5, 10, 25, 50, 100, -5, -10, -25]);
    for (const d of deltas) if (set.size < 4 && tot + d > 0) set.add(tot + d);
    return mkQ({ id: 'mo5', v, sents: [[`{p} a ${joinPh(parts, 0)}.`, `{p} has ${joinPh(parts, 1)}.`]], q: ['Combien d’argent a-t-{il} en tout?', 'How much money does {he} have in all?'], opts: [...set].map((c) => ({ text: moneyT(c) })), ans: 0, cols: 2 });
  }
  if (kind === 'coin1') {
    const C = R.pick(L === 1 ? [5, 10, 25] : [5, 10, 25]), n = R.int(2, L === 1 ? 6 : 12), P = C * n;
    if (P >= 100 && P % 100 === 0) return moneyQ(R, L);
    const A = a1; Object.assign(v, { C, P });
    const Pt = moneyT(P);
    return mkQ({ id: 'mo8', v, sents: [[`{set} ${ind(A.g)} ${A.s} coûte ${Pt.fr}. {p} paie avec des ${COINS[C][1]}.`, `{sete} a ${A.es} costs ${Pt.en}. {p} pays with ${COINS[C][3]}.`]], q: [`Combien de ${COINS[C][1]} donne-t-{il}?`, `How many ${COINS[C][3]} does {he} give?`], ans: n });
  }
  if (kind === 'enough') {
    const have = R.int(3, 20), price = R.int(3, 20);
    if (have === price) return moneyQ(R, L);
    Object.assign(v, { have, price });
    return ynQ('mo6', v, [[`{set} {p} a {have} $. ${cap(ind(a1.g))} ${a1.s} coûte {price} $.`, `{sete} {p} has $\{have}. A ${a1.es} costs $\{price}.`]], ['{p} a-t-{il} assez d’argent?', 'Does {p} have enough money?'], have >= price);
  }
  if (kind === 'enoughc') {
    const x = R.int(1, 3), y = R.int(1, 4), tot = 25 * x + 10 * y;
    const P = R.pick([25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 110, 120].filter((z) => z !== tot));
    Object.assign(v, { x, y, P });
    return ynQ('mo10', v, [[`{p} a ${joinPh([coinPh(25, x), coinPh(10, y)], 0)}. ${cap(ind(a1.g))} ${a1.s} coûte ${moneyT(P).fr}.`, `{p} has ${joinPh([coinPh(25, x), coinPh(10, y)], 1)}. A ${a1.es} costs ${moneyT(P).en}.`]], ['{p} a-t-{il} assez d’argent?', 'Does {p} have enough money?'], tot >= P);
  }
  if (kind === 'chg2') {
    const P = R.int(3, 19) * 5; // 15..95 cents
    Object.assign(v, { P });
    return mkQ({ id: 'mo11', v, sents: [[`{set} {p} achète ${ind(a1.g)} ${a1.s} à ${P} ¢. {Il} paie avec une pièce de 1 $.`, `{sete} {p} buys a ${a1.es} for ${P}¢. {He} pays with a $1 coin.`]], q: ['Combien de cents lui rend-on?', 'How many cents of change does {he} get back?'], ans: 100 - P });
  }
  if (kind === 'save') {
    const a = R.int(2, 6), w = R.int(2, 6), J = a * w + R.int(2, 12);
    Object.assign(v, { a, w, J });
    return mkQ({ id: 'mo9', v, sents: [[`{p} met {a} $ de côté chaque semaine pendant {w} semaines.`, `{p} saves $\{a} every week for {w} weeks.`], [`{Il} veut acheter un jouet qui coûte {J} $.`, `{He} wants to buy a toy that costs $\{J}.`]], q: ['Combien d’argent lui manque-t-il encore?', 'How much more money does {he} still need?'], ans: J - a * w });
  }
  // two-step shopping with change
  const n = R.int(2, 3), a = R.int(2, 4), b = R.int(2, 6), B = n * a + b < 10 ? 10 : 20;
  Object.assign(v, { n, a, b, B, i2: a2.s });
  return mkQ({ id: 'mo7', v, sents: [[`{set} {p} achète ${n} ${a1.pl} à {a} $ ${a1.g === 'f' ? 'chacune' : 'chacun'} et ${ind(a2.g)} ${a2.s} à {b} $. {Il} paie avec un billet de {B} $.`, `{sete} {p} buys ${n} ${a1.epl} at $\{a} each and a ${a2.es} for $\{b}. {He} pays with a $\{B} bill.`]], q: ['Combien d’argent lui rend-on?', 'How much change does {he} get back?'], ans: B - (n * a + b) });
}

// ---------- tables and bar charts ----------
const TB = [
  ['Au camp de jour, on compte les sacs de collation chaque jour.', 'At day camp, we count the snack bags each day.', 'sacs de collation', 'snack bags'],
  ['À la bibliothèque, on compte les livres empruntés chaque jour.', 'At the library, we count the books borrowed each day.', 'livres', 'books'],
  ['Au dépanneur, on compte les crèmes glacées vendues chaque jour.', 'At the corner store, we count the ice creams sold each day.', 'crèmes glacées', 'ice creams'],
  ['Cette semaine, on compte les buts marqués par l’équipe de hockey.', 'This week, we count the goals scored by the hockey team.', 'buts', 'goals'],
  ['À la ferme, on ramasse des œufs chaque jour.', 'On the farm, we collect eggs each day.', 'œufs', 'eggs'],
  ['Dans la cour, on compte les bonshommes de neige faits chaque jour.', 'In the yard, we count the snowmen made each day.', 'bonshommes de neige', 'snowmen'],
];
function tableQ(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const t = R.pick(TB), n = L === 1 ? 3 : L === 2 ? 4 : 5;
  const vals = R.sample(Array.from({ length: L === 1 ? 10 : 19 }, (_, i) => i + (L === 1 ? 1 : 2)), n);
  const v = { t: t[2], vals: vals.join() };
  const tab = (i) => vals.slice(0, n).map((x, j) => `${WD[i][j]} : ${x}`).join(' | ');
  const sents = [[t[0], t[1]], [`Voici le tableau : ${tab(0)}.`, `Here is the table: ${tab(1)}.`]];
  const du = ELID(t[2]) + t[2];
  const kinds = L === 1 ? ['max', 'min', 'val', 'tot'] : L === 2 ? ['tot', 'max', 'min', 'diff', 'two'] : ['tot', 'diff', 'two', 'count', 'range', 'max', 'min'];
  const kind = R.pick(kinds);
  const order = vals.map((x, j) => ({ x, j }));
  const dopts = (idx) => idx.map((j) => ({ text: T(WD[0][j], WD[1][j]) }));
  if (kind === 'max' || kind === 'min') {
    const best = order.reduce((a, b) => ((kind === 'max' ? b.x > a.x : b.x < a.x) ? b : a));
    const ids = [best.j, ...R.sample(order.filter((o) => o.j !== best.j).map((o) => o.j), Math.min(3, n - 1))];
    return mkQ({ id: 'tb' + kind, v, sents, q: kind === 'max' ? ['Quel jour y en a-t-il le plus?', 'Which day has the most?'] : ['Quel jour y en a-t-il le moins?', 'Which day has the fewest?'], opts: dopts(ids), ans: 0, cols: 2 });
  }
  if (kind === 'val') {
    const j = R.int(0, n - 1); v.j = j;
    return mkQ({ id: 'tbv', v, sents, q: [`Combien ${du} y a-t-il ${j === 0 ? 'lundi' : WD[0][j]}?`, `How many ${t[3]} are there on ${WD[1][j]}?`], ans: vals[j] });
  }
  if (kind === 'tot') return mkQ({ id: 'tbt', v, sents, q: [`Combien ${du} y a-t-il en tout?`, `How many ${t[3]} are there in all?`], ans: vals.reduce((a, b) => a + b, 0) });
  if (kind === 'diff') {
    const [x, y] = R.sample(order, 2), [hi, lo] = x.x > y.x ? [x, y] : [y, x];
    v.hi = hi.j; v.lo = lo.j;
    return mkQ({ id: 'tbd', v, sents, q: [`Combien ${du} de plus y en a-t-il ${hi.j === 0 ? '' : ''}${WD[0][hi.j]} que ${WD[0][lo.j]}?`.replace(' y en a-t-il', ' y a-t-il'), `How many more ${t[3]} are there on ${WD[1][hi.j]} than on ${WD[1][lo.j]}?`], ans: hi.x - lo.x });
  }
  if (kind === 'two') {
    const [x, y] = R.sample(order, 2).sort((a, b) => a.j - b.j);
    v.x = x.j; v.y = y.j;
    return mkQ({ id: 'tb2', v, sents, q: [`Combien ${du} y a-t-il en tout ${WD[0][x.j]} et ${WD[0][y.j]}?`, `How many ${t[3]} are there in all on ${WD[1][x.j]} and ${WD[1][y.j]}?`], ans: x.x + y.x });
  }
  if (kind === 'count') {
    const sorted = vals.slice().sort((a, b) => a - b), j = R.int(1, n - 2), k = sorted[j];
    v.k = k;
    return mkQ({ id: 'tbc', v, sents, q: [`Pendant combien de jours y en a-t-il plus de ${k}?`, `On how many days are there more than ${k}?`], ans: n - 1 - j });
  }
  return mkQ({ id: 'tbr', v, sents, q: ['Combien y en a-t-il de plus le meilleur jour que le pire jour?', 'How many more are there on the best day than on the worst day?'], ans: Math.max(...vals) - Math.min(...vals) });
}
const ACT = ['⚽', '🎨', '🏊', '🎵', '🏒'];
function barQ(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const n = L === 1 ? 3 : L === 2 ? 4 : 5;
  const em = R.sample(ACT, n), vals = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], n);
  const data = em.map((e, i) => ({ emoji: e, value: vals[i] }));
  const sit = L === 3 ? ['Au camp de jour, chaque enfant vote pour son activité préférée. Voici le diagramme.', 'At day camp, each child votes for a favourite activity. Here is the graph.'] : ['Au camp de jour, on vote pour l’activité préférée. Voici le diagramme.', 'At day camp, children vote for their favourite activity. Here is the graph.'];
  const kinds = L === 1 ? ['one', 'most'] : L === 2 ? ['one', 'most', 'diff', 'two'] : ['tot', 'diff', 'two', 'most', 'least'];
  const kind = R.pick(kinds);
  let qf, qe, o;
  const [a, b] = R.sample(data, 2);
  if (kind === 'one') { qf = `Combien d’enfants ont voté pour ${a.emoji}?`; qe = `How many children voted for ${a.emoji}?`; o = { type: 'keypad', answer: a.value }; }
  else if (kind === 'most' || kind === 'least') {
    const best = data.reduce((x, y) => ((kind === 'most' ? y.value > x.value : y.value < x.value) ? y : x));
    qf = kind === 'most' ? 'Quelle activité a le plus de votes?' : 'Quelle activité a le moins de votes?'; qe = kind === 'most' ? 'Which activity got the most votes?' : 'Which activity got the fewest votes?';
    o = { type: 'choice', options: [best, ...data.filter((x) => x !== best).slice(0, 3)].map((x) => ({ emoji: x.emoji })), answer: 0, cols: Math.min(4, n) };
  } else if (kind === 'diff') { const [hi, lo] = a.value > b.value ? [a, b] : [b, a]; qf = `Combien d’enfants de plus ont voté pour ${hi.emoji} que pour ${lo.emoji}?`; qe = `How many more children voted for ${hi.emoji} than for ${lo.emoji}?`; o = { type: 'keypad', answer: hi.value - lo.value }; }
  else if (kind === 'two') { qf = `Combien d’enfants ont voté pour ${a.emoji} ou ${b.emoji}?`; qe = `How many children voted for ${a.emoji} or ${b.emoji}?`; o = { type: 'keypad', answer: a.value + b.value }; }
  else { qf = 'Combien d’enfants ont voté en tout?'; qe = 'How many children voted in all?'; o = { type: 'keypad', answer: vals.reduce((x, y) => x + y, 0) }; }
  const fr = `${sit[0]} ${qf}`, en = `${sit[1]} ${qe}`;
  return { key: `bar${data.map((x) => x.emoji + x.value).join()}${qf}`, prompt: T(fr, en), say: SAY(fr, en), stimulus: { svg: S.barChart(data) }, ...o };
}

// ---------- two-step ----------
function twoQ(R, L) {
  const [p, q] = R.sample(PEOPLE, 2);
  const v = { ...sv(p, q) };
  const k = R.int(0, 3);
  if (k === 0) {
    const w = R.int(2, 4), d = R.int(3, 7 * w - 2);
    Object.assign(v, { w, d });
    const s = [['La classe de neige dure {w} semaines.', 'The snow class lasts {w} weeks.'], ['{p} a déjà passé {d} jours là-bas.', '{p} has already spent {d} days there.']];
    return mkQ({ id: 'tw1', v, sents: s, q: ['Combien de jours reste-t-il?', 'How many days are left?'], ans: 7 * w - d });
  }
  if (k === 1) {
    const n = R.int(2, 4), a = R.int(2, 4), B = n * a < 10 ? 10 : 20;
    Object.assign(v, { n, a, B });
    const sh = R.pick(SHOPS);
    return mkQ({ id: 'tw2', v: { ...v, set: sh[0] }, sents: [[`${sh[0]} {n} amis achètent chacun une crème glacée à {a} $. Ils paient avec un billet de {B} $.`, `${sh[1]} {n} friends each buy an ice cream for $\{a}. They pay with a $\{B} bill.`]], q: ['Combien d’argent leur rend-on?', 'How much change do they get back?'], ans: B - n * a });
  }
  if (k === 2) {
    const a = R.int(2, 4), m = R.int(2, 4), B = a * m < 10 ? 10 : 20;
    Object.assign(v, { a, m, B });
    return mkQ({ id: 'tw3', v, sents: [['À l’école, le ruban coûte {a} $ le mètre. {p} en achète {m} mètres.', 'At school, ribbon costs $\{a} a metre. {p} buys {m} metres.'], ['{Il} paie avec un billet de {B} $.', '{He} pays with a $\{B} bill.']], q: ['Combien d’argent lui rend-on?', 'How much change does {he} get back?'], ans: B - a * m });
  }
  const per = R.int(2, 5), days = R.int(3, 6), eaten = R.int(2, per * days - 3);
  Object.assign(v, { per, days, eaten });
  return mkQ({ id: 'tw4', v, sents: [['Au chalet, {p} apporte {per} bûches chaque jour pendant {days} jours.', 'At the cottage, {p} brings in {per} logs every day for {days} days.'], ['{Il} en brûle {eaten} dans le poêle.', '{He} burns {eaten} of them in the stove.']], q: ['Combien de bûches restent-elles?', 'How many logs are left?'], ans: per * days - eaten });
}
function m19Q(R, L) {
  const r = R.int(1, 100);
  if (r <= 16) return lenQ(R, L);
  if (r <= 40) return timeQ(R, L);
  if (r <= 72) return moneyQ(R, L);
  if (r <= 86) return tableQ(R, L);
  if (r <= 92) return barQ(R, L);
  return twoQ(R, L);
}

// ---------- the three units ----------
const _m17 = {
  id: 'm17', icon: '🕵️',
  title: T('Je résous — cahier A', 'Problem solving — book A'),
  pfeq: 'Résoudre une situation-problème — nombres jusqu’à 100, addition et soustraction, pair/impair, régularités, figures (Numérik 2e année, « J’apprends à résoudre »)',
  generate(level, R) {
    const r = R.int(1, 100);
    if (r <= 70) return storyQ(R, level);
    if (r <= 80) return parityQ(R, level);
    if (r <= 90) return patternQ(R, level);
    return shapeQ(R, level);
  },
};
const _m18 = {
  id: 'm18', icon: '🧠',
  title: T('Je résous — cahier B', 'Problem solving — book B'),
  pfeq: 'Résoudre une situation-problème — nombres jusqu’à 1 000, valeur de position, fractions, groupes égaux et partage, repérage dans un quadrillage (Numérik 2e année)',
  generate(level, R) { return m18Q(R, level); },
};
const _m19 = {
  id: 'm19', icon: '🏆',
  title: T('Je résous — cahier C', 'Problem solving — book C'),
  pfeq: 'Résoudre une situation-problème — mesure (cm, m), temps, argent canadien, tableaux et diagrammes, problèmes à deux étapes (Numérik 2e année)',
  generate(level, R) { return m19Q(R, level); },
};
units.push(_m17, _m18, _m19);

// =====================================================================================
// Raised difficulty (PFEQ): Facile (L1) = solid end of 2e année (the former level 3),
// Moyen (L2) = 3e année, Difficile (L3) = strong 3e / early 4e année.
// L1 re-uses each unit's original level-3 generator; L2 and L3 are written below (NEW[id]).
// =====================================================================================
const NEW = {};
const NB2 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // 12 345 (fr-CA thousands)
const NBe = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const NT = (n) => T(NB2(n), NBe(n));
const sumArr = (a) => a.reduce((x, y) => x + y, 0);
// numeric multiple-choice: answer first; distractors from `cands`, padded with neighbours that pass `valid`
function numQ(R, key, prompt, stim, ans, cands, o = {}) {
  const { say, cols = 4, fmt = NT, valid = () => true } = o;
  let d = [...new Set(cands)].filter((v) => v !== ans && v >= 0 && valid(v));
  d = R.sample(d, Math.min(3, d.length));
  for (let k = 1; d.length < 3 && k < 40; k++) for (const v of [ans + 10 * k, ans - 10 * k, ans + k, ans - k, ans + 100 * k]) if (d.length < 3 && v >= 0 && v !== ans && !d.includes(v) && valid(v)) d.push(v);
  const q = { type: 'choice', key, prompt, ...(stim ? { stimulus: stim } : {}), options: [ans, ...d].map((v) => ({ text: fmt(v) })), answer: 0, cols };
  if (say) q.say = say;
  return q;
}
const kp = (key, prompt, stim, ans, say) => ({ type: 'keypad', key, prompt, ...(stim ? { stimulus: stim } : {}), answer: ans, ...(say ? { say } : {}) });
const tx = (s) => ({ text: s });
const swaps = (n) => { const s = String(n), out = []; for (let i = 0; i < s.length - 1; i++) { const a = s.split(''); [a[i], a[i + 1]] = [a[i + 1], a[i]]; out.push(Number(a.join(''))); } return out; };
const r3 = (R) => { const m = R.int(0, 2); return m === 0 ? R.int(101, 999) : m === 1 ? R.int(1, 9) * 100 + R.int(1, 9) : R.int(1, 9) * 100 + R.int(1, 9) * 10; };
const r4 = (R) => { const m = R.int(0, 3), th = R.int(1, 9); return m === 0 ? R.int(1001, 9999) : m === 1 ? th * 1000 + R.int(1, 9) * 100 : m === 2 ? th * 1000 + R.int(1, 99) : th * 1000 + R.int(1, 9) * 100 + R.int(1, 9); };
function frW(n) { if (n < 1000) return frWords(n); const th = Math.floor(n / 1000), r = n % 1000; const head = th === 1 ? 'mille' : `${frWords(th)} mille`; return r ? `${head} ${frWords(r)}` : head; }
function enW(n) { if (n < 1000) return enWords(n); const th = Math.floor(n / 1000), r = n % 1000; return `${enWords(th)} thousand` + (r ? ` ${enWords(r)}` : ''); }
const WORDS = (n) => T(frW(n), enW(n));
const cnt = (k, f, fp, e, ep) => T(`${k} ${k > 1 ? fp : f}`, `${k} ${k === 1 ? e : ep}`);
const joinT = (parts, sepFr, sepEn) => T(parts.map((p) => p.fr).join(sepFr), parts.map((p) => p.en).join(sepEn));

// ---------- m1 ----------
NEW.m1 = (L, R) => {
  if (L === 2) {
    const k = R.int(0, 5);
    if (k === 0) { const n = R.chance(0.35) ? r4(R) : r3(R); return kp(`w${n}`, T('Écris ce nombre en chiffres.', 'Write this number in digits.'), { text: WORDS(n) }, n, SAY(frW(n), enW(n))); }
    if (k === 1) { const n = R.chance(0.35) ? r4(R) : r3(R), big = n > 999; return numQ(R, `wc${n}`, T('Comment s’écrit ce nombre en lettres?', 'How do you write this number in words?'), tx(NB2(n)), n, [...swaps(n), n + 10, n - 10, n + 100, n - 1], { fmt: WORDS, cols: 2, valid: (v) => (big ? v > 999 && v < 10000 : v > 0 && v < 1000) }); }
    if (k === 2) { const n = R.chance(0.5) ? R.int(1, 9) * 100 + R.int(1, 9) : R.int(1, 9) * 100 + R.int(1, 9) * 10; return { type: 'base10', key: `b${n}`, prompt: T(`Construis le nombre ${n}.`, `Build the number ${n}.`), answer: n }; }
    if (k === 3) {
      const b = R.int(2, 10) * 100, m = R.int(0, 2);
      if (m === 0) return kp(`aft${b}`, T(`Quel nombre vient juste après ${b - 1}?`, `Which number comes right after ${b - 1}?`), null, b);
      if (m === 1) return kp(`bef${b}`, T(`Quel nombre vient juste avant ${b}?`, `Which number comes right before ${b}?`), null, b - 1);
      const x = b + 10 * R.int(1, 9); return kp(`bef${x}`, T(`Quel nombre vient juste avant ${x}?`, `Which number comes right before ${x}?`), null, x - 1);
    }
    if (k === 4) { const n = R.int(1, 19) * 50; return { type: 'numberline', key: `nl50_${n}`, prompt: T(`Touche le nombre ${n}.`, `Tap the number ${n}.`), min: 0, max: 1000, step: 50, answer: n }; }
    const n = R.pick([R.int(101, 999), R.int(1, 9) * 100 + R.int(1, 9), R.int(1, 9) * 100 + R.int(1, 9) * 10]);
    const cands = [...swaps(n), n + 10, n - 10, n + 100, n - 1].filter((v) => v > 0 && v < 1000);
    return numQ(R, `pic${n}`, T('Quel nombre est représenté?', 'Which number is shown?'), { svg: S.base10(n) }, n, cands, { valid: (v) => v > 0 && v < 1000, fmt: String });
  }
  const k = R.int(0, 5);
  if (k <= 1) { const n = r4(R); return kp(`w${n}`, T('Écris ce nombre en chiffres.', 'Write this number in digits.'), { text: WORDS(n) }, n, SAY(frW(n), enW(n))); }
  if (k <= 3) { const n = r4(R); return numQ(R, `wc${n}`, T('Comment s’écrit ce nombre en lettres?', 'How do you write this number in words?'), tx(NB2(n)), n, [...swaps(n), n + 100, n - 100, n + 1000, n - 10], { fmt: WORDS, cols: 2, valid: (v) => v > 999 && v < 10000 }); }
  if (k === 4) {
    const x = R.pick([R.int(2, 9) * 1000, R.int(11, 99) * 100, R.int(101, 999) * 10]), after = R.chance(0.5);
    return after ? kp(`aft${x}`, T(`Quel nombre vient juste après ${NB2(x - 1)}?`, `Which number comes right after ${NBe(x - 1)}?`), null, x) : kp(`bef${x}`, T(`Quel nombre vient juste avant ${NB2(x)}?`, `Which number comes right before ${NBe(x)}?`), null, x - 1);
  }
  const big = R.chance(0.5), n = big ? R.int(1, 9) * 1000 : R.int(1, 19) * 500;
  const nn = Math.min(n, big ? 9000 : 9500);
  return { type: 'numberline', key: `nl10k_${nn}`, prompt: T(`Touche le nombre ${NB2(nn)}.`, `Tap the number ${NBe(nn)}.`), min: 0, max: 10000, step: big ? 1000 : 500, answer: nn };
};

// ---------- m2 ----------
const PLACES = [
  { n: T('unités', 'ones'), v: 1 }, { n: T('dizaines', 'tens'), v: 10 }, { n: T('centaines', 'hundreds'), v: 100 }, { n: T('milliers', 'thousands'), v: 1000 },
];
const composeT = (n) => {
  const th = Math.floor(n / 1000), h = Math.floor(n / 100) % 10, t = Math.floor(n / 10) % 10, u = n % 10;
  const parts = [];
  if (th) parts.push(cnt(th, 'millier', 'milliers', 'thousand', 'thousands'));
  parts.push(cnt(h, 'centaine', 'centaines', 'hundred', 'hundreds'), cnt(t, 'dizaine', 'dizaines', 'ten', 'tens'), cnt(u, 'unité', 'unités', 'one', 'ones'));
  return joinT(parts, ', ', ', ');
};
const expandStr = (n) => [1000, 100, 10, 1].map((v) => Math.floor(n / v) % 10 * v).filter(Boolean).join(' + ');
NEW.m2 = (L, R) => {
  const n = L === 2 ? (R.chance(0.3) ? R.int(101, 999) : R.int(1001, 9999)) : R.int(1001, 9999);
  const four = n > 999;
  const digs = String(n).split('').map(Number).reverse(); // ones first
  const k = R.int(0, L === 2 ? 3 : 5);
  if (k === 0) {
    if (L === 3) { // value of a digit (distinct digits)
      const ds = R.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
      if (ds[0] === 0) [ds[0], ds[1]] = [ds[1], ds[0]];
      const m = Number(ds.join('')), pos = R.pick([0, 1, 2, 3].filter((p) => ds[3 - p] !== 0)), d = ds[3 - pos];
      return kp(`val${m}${d}`, T(`Dans ${NB2(m)}, quelle est la valeur du chiffre ${d}?`, `In ${NBe(m)}, what is the value of the digit ${d}?`), null, d * 10 ** pos);
    }
    const pos = R.int(0, four ? 3 : 2), ans = digs[pos];
    const pool = [...new Set([...digs, ...[ans + 1, ans - 1, 0, 5].filter((v) => v >= 0 && v <= 9)])].filter((v) => v !== ans);
    const pr = T(`Dans ${NB2(n)}, quel est le chiffre des ${PLACES[pos].n.fr}?`, `In ${NBe(n)}, which digit is in the ${PLACES[pos].n.en} place?`);
    return { type: 'choice', key: `pv${n}${pos}`, prompt: pr, say: SAY(pr.fr, pr.en), stimulus: tx(NB2(n)), options: [ans, ...R.sample(pool, 3)].map((v) => ({ text: String(v) })), answer: 0, cols: 4 };
  }
  if (k === 1) {
    const c = composeT(n);
    return kp(`cmp${n}`, T('Quel nombre est-ce?', 'Which number is it?'), { text: c }, n, SAY(c.fr, c.en));
  }
  if (k === 2) {
    const parts = R.shuffle([1000, 100, 10, 1].map((v) => Math.floor(n / v) % 10 * v).filter(Boolean));
    return kp(`exp${parts.join('+')}`, T('Calcule.', 'Work it out.'), tx(parts.join(' + ') + ' = ?'), n);
  }
  if (k === 3 && L === 2) {
    const cands = [...swaps(n), n + 100, n - 100, n + 10, n - 10].filter((v) => v > 0 && v < 10000 && v !== n);
    const d = R.sample([...new Set(cands)], 3);
    return { type: 'choice', key: `ex${n}`, prompt: T(`Quelle décomposition est égale à ${NB2(n)}?`, `Which expansion equals ${NBe(n)}?`), options: [n, ...d].map((v) => ({ text: expandStr(v) })), answer: 0, cols: 2 };
  }
  if (k === 3) { // how many tens / hundreds
    const t = R.chance(0.5);
    const m = t ? R.int(11, 999) * 10 : R.int(11, 99) * 100;
    return kp(`how${m}${t}`, t ? T(`Combien de dizaines y a-t-il dans ${NB2(m)}?`, `How many tens are there in ${NBe(m)}?`) : T(`Combien de centaines y a-t-il dans ${NB2(m)}?`, `How many hundreds are there in ${NBe(m)}?`), null, t ? m / 10 : m / 100);
  }
  if (k === 4) { // regrouping
    const m = R.int(0, 2);
    if (m === 0) { const a = R.int(11, 59), u = R.int(1, 9); return kp(`rg${a}d${u}`, T('Quel nombre est-ce?', 'Which number is it?'), { text: T(`${a} dizaines et ${u} unités`, `${a} tens and ${u} ones`) }, a * 10 + u); }
    if (m === 1) { const a = R.int(11, 59), u = R.int(1, 9); return kp(`rg${a}c${u}`, T('Quel nombre est-ce?', 'Which number is it?'), { text: T(`${a} centaines et ${u} unités`, `${a} hundreds and ${u} ones`) }, a * 100 + u); }
    const a = R.int(10, 59), b = R.int(1, 9); return kp(`rg${a}c${b}t`, T('Quel nombre est-ce?', 'Which number is it?'), { text: T(`${a} centaines et ${b} dizaines`, `${a} hundreds and ${b} tens`) }, a * 100 + b * 10);
  }
  const cands = [...swaps(n), n + 1000, n - 1000, n + 100, n - 100].filter((v) => v > 999 && v < 10000 && v !== n);
  const d = R.sample([...new Set(cands)], 3);
  return { type: 'choice', key: `ex${n}`, prompt: T(`Quelle décomposition est égale à ${NB2(n)}?`, `Which expansion equals ${NBe(n)}?`), options: [n, ...d].map((v) => ({ text: expandStr(v) })), answer: 0, cols: 2 };
};

// ---------- m3 ----------
NEW.m3 = (L, R) => {
  const lo = L === 2 ? 100 : 1000, hi = L === 2 ? 4999 : 9999, span = L === 2 ? 90 : 400;
  const k = R.int(0, L === 2 ? 3 : 4);
  const near3 = () => { const a = R.int(lo, hi); const b = R.chance(0.1) ? a : R.chance(0.6) ? Math.max(lo, Math.min(hi, a + R.int(-span, span))) : R.int(lo, hi); return [a, b]; };
  if (k === 0) {
    const [a, b] = near3(), sym = a < b ? 0 : a > b ? 1 : 2;
    return { type: 'choice', key: `cmp${a}_${b}`, prompt: T('Quel signe va dans la case?', 'Which sign goes in the box?'), stimulus: tx(`${NB2(a)}  ☐  ${NB2(b)}`), options: [{ text: '<' }, { text: '>' }, { text: '=' }], answer: sym, fixedOrder: true, cols: 3 };
  }
  if (k === 1) {
    const count = L === 2 ? 4 : 5, set = new Set(), base = R.int(lo, hi - span);
    while (set.size < count) set.add(R.chance(0.7) ? base + R.int(0, span) : R.int(lo, hi));
    const asc = [...set].sort((x, y) => x - y), up = R.chance(0.5);
    const arr = up ? asc : asc.slice().reverse();
    return { type: 'order', key: `ord${arr.join(',')}`, joiner: '  ', prompt: up ? T('Place les nombres du plus petit au plus grand.', 'Put the numbers from smallest to biggest.') : T('Place les nombres du plus grand au plus petit.', 'Put the numbers from biggest to smallest.'), tiles: arr.map(NB2) };
  }
  if (k === 2) {
    const a = R.int(lo, hi - 90), b = a + R.int(30, 90), ans = R.int(a + 1, b - 1);
    return numQ(R, `btw${a}_${b}_${ans}`, T(`Quel nombre est entre ${NB2(a)} et ${NB2(b)}?`, `Which number is between ${NBe(a)} and ${NBe(b)}?`), null, ans, [a - R.int(1, 20), b + R.int(1, 20), a - 5, b + 5, a, b], { cols: 4, valid: (v) => v < a || v > b });
  }
  if (k === 3 && L === 2) {
    const set = new Set(), base = R.int(lo, hi - 120);
    while (set.size < 3) set.add(base + R.int(0, 120));
    const arr = [...set], big = R.chance(0.5), t = big ? Math.max(...arr) : Math.min(...arr);
    return { type: 'choice', key: `top${arr.slice().sort().join(',')}${big}`, prompt: big ? T('Quel est le plus grand nombre?', 'Which is the biggest number?') : T('Quel est le plus petit nombre?', 'Which is the smallest number?'), options: arr.map((v) => ({ text: NT(v) })), answer: arr.indexOf(t), fixedOrder: true, cols: 3 };
  }
  if (k === 3) {
    const set = new Set(), base = R.int(1000, 9400);
    while (set.size < 4) set.add(base + R.int(0, 500));
    const arr = [...set], big = R.chance(0.5), t = big ? Math.max(...arr) : Math.min(...arr);
    return { type: 'choice', key: `top${arr.slice().sort().join(',')}${big}`, prompt: big ? T('Quel est le plus grand nombre?', 'Which is the biggest number?') : T('Quel est le plus petit nombre?', 'Which is the smallest number?'), options: arr.map((v) => ({ text: NT(v) })), answer: arr.indexOf(t), fixedOrder: true, cols: 2 };
  }
  // k === 4 (L3): smallest digit that makes the sentence true
  const th = R.int(1, 9), h = R.int(0, 8), rest = R.int(10, 99);
  return kp(`dgt${th}${h}${rest}`, T(`Quel est le plus petit chiffre qui peut aller dans la case pour que ${th}☐${rest} > ${NB2(th * 1000 + h * 100 + rest)}?`, `What is the smallest digit that can go in the box so that ${th},☐${rest} > ${NBe(th * 1000 + h * 100 + rest)}?`), null, h + 1);
};

// ---------- m4 ----------
NEW.m4 = (L, R) => {
  const lo = L === 2 ? 100 : 1000, hi = L === 2 ? 2999 : 9999;
  const k = R.int(0, L === 2 ? 2 : 4);
  if (k === 0) {
    const set = new Set();
    while (set.size < 6) set.add(R.int(lo, hi));
    const arr = [...set];
    if (arr.every((v) => v % 2 === arr[0] % 2)) arr[0] += 1;
    return { type: 'sort', key: `pi${arr.join(',')}`, prompt: T('Classe les nombres.', 'Sort the numbers.'), bins: [{ text: T('pair', 'even'), emoji: '👫' }, { text: T('impair', 'odd'), emoji: '🧍' }], items: arr.map((v) => ({ text: NB2(v), bin: v % 2 })) };
  }
  if (k === 1) {
    const wantEven = R.chance(0.5), a = []; while (a.length < 3) { const v = R.int(lo, hi), want = a.length === 0 ? (wantEven ? 0 : 1) : (wantEven ? 1 : 0), w = v % 2 === want ? v : v + 1; if (!a.includes(w)) a.push(w); }
    return { type: 'choice', key: `wh${a.join()}${wantEven}`, prompt: wantEven ? T('Lequel de ces nombres est pair?', 'Which of these numbers is even?') : T('Lequel de ces nombres est impair?', 'Which of these numbers is odd?'), options: a.map((v) => ({ text: NT(v) })), answer: 0, cols: 3 };
  }
  if (k === 2 && L === 2) {
    const par = R.int(0, 1), x = R.int(1, 15) * 2 + par, y = x + R.int(5, 9) * 2;
    let c = 0; for (let v = x; v <= y; v++) if (v % 2 === par) c++;
    return kp(`cnt${x}_${y}`, T(`Combien de nombres ${par ? 'impairs' : 'pairs'} y a-t-il de ${x} à ${y}? (${x} et ${y} sont inclus)`, `How many ${par ? 'odd' : 'even'} numbers are there from ${x} to ${y}? (${x} and ${y} are included)`), null, c);
  }
  if (k === 2) {
    const ds = R.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const ev = ds.filter((d) => d % 2 === 0), od = ds.filter((d) => d % 2 === 1), wantEven = R.chance(0.5);
    const good = wantEven ? ev[0] : od[0], bad = (wantEven ? od : ev).slice(0, 2), pre = R.int(100, 999);
    return { type: 'choice', key: `dg${pre}${good}${bad.join('')}${wantEven}`, prompt: T(`Quel chiffre peut aller dans la case pour que ${pre}☐ soit ${wantEven ? 'pair' : 'impair'}?`, `Which digit can go in the box so that ${pre}☐ is ${wantEven ? 'even' : 'odd'}?`), options: [good, ...bad].map((v) => ({ text: String(v) })), answer: 0, cols: 3 };
  }
  if (k === 3) { // parity of a sum
    const wantEven = R.chance(0.5);
    for (let g = 0; g < 200; g++) {
      const s = [0, 1, 2].map(() => [R.int(11, 99), R.int(11, 99)]);
      const ev = s.map((p) => (p[0] + p[1]) % 2 === 0);
      if (ev.filter((x) => x === wantEven).length === 1) {
        const idx = ev.findIndex((x) => x === wantEven), order = [s[idx], ...s.filter((_, i) => i !== idx)];
        return { type: 'choice', key: `sm${order.map((p) => p.join('+')).join('|')}${wantEven}`, prompt: wantEven ? T('Quelle somme est un nombre pair?', 'Which sum is an even number?') : T('Quelle somme est un nombre impair?', 'Which sum is an odd number?'), options: order.map((p) => ({ text: `${p[0]} + ${p[1]}` })), answer: 0, cols: 3 };
      }
    }
  }
  const RULES = [
    ['pair + pair', 'even + even', 0], ['impair + impair', 'odd + odd', 0], ['pair + impair', 'even + odd', 1],
    ['impair + impair + impair', 'odd + odd + odd', 1], ['pair × impair', 'even × odd', 0], ['impair × impair', 'odd × odd', 1], ['n’importe quel nombre × 2', 'any number × 2', 0],
  ];
  const [fr, en, ans] = R.pick(RULES);
  return { type: 'choice', key: `rule${fr}`, prompt: T(`Le résultat de « ${fr} » est toujours…`, `The result of “${en}” is always…`), options: [{ text: T('pair', 'even') }, { text: T('impair', 'odd') }], answer: ans, fixedOrder: true, cols: 2 };
};

// ---------- m5 ----------
const hasCarry = (a, b) => { let x = a, y = b, c = 0; while (x > 0 || y > 0) { const s = (x % 10) + (y % 10) + c; if (s > 9) return true; c = 0; x = Math.floor(x / 10); y = Math.floor(y / 10); } return false; };
const hasBorrow = (a, b) => { let x = a, y = b; while (y > 0) { if (x % 10 < y % 10) return true; x = Math.floor(x / 10); y = Math.floor(y / 10); } return false; };
NEW.m5 = (L, R) => {
  const k = R.int(0, 4);
  let a, b;
  if (L === 2) {
    if (k === 0 || k === 3) { do { a = R.int(101, 899); b = R.int(101, 998); } while (!hasCarry(a, b) || a + b > 1500); }
    else if (k === 1) { do { a = R.int(201, 899); b = R.int(15, 98); } while (!hasCarry(a, b)); }
    else { do { a = R.int(101, 899); b = R.int(101, 899); } while (!hasCarry(a, b) || a + b > 1400); const s = a + b; return kp(`m${a}+?=${s}`, T('Quel nombre manque?', 'Which number is missing?'), tx(`${a} + ? = ${s}`), b); }
    const s = a + b;
    if (k === 3) return numQ(R, `ac${a}+${b}`, T('Calcule.', 'Work it out.'), tx(`${a} + ${b} = ?`), s, [s - 10, s - 100, s + 10, s + 100, s - 1], { fmt: String });
    return kp(`a${a}+${b}`, T('Calcule.', 'Work it out.'), tx(`${a} + ${b} = ?`), s);
  }
  if (k === 0) { do { a = R.int(1001, 8000); b = R.int(101, 999); } while (!hasCarry(a, b)); return kp(`a${a}+${b}`, T('Calcule.', 'Work it out.'), tx(`${NB2(a)} + ${b} = ?`), a + b); }
  if (k === 1) { do { a = R.int(1001, 6500); b = R.int(1001, 9999 - a); } while (!hasCarry(a, b)); return kp(`a${a}+${b}`, T('Calcule.', 'Work it out.'), tx(`${NB2(a)} + ${NB2(b)} = ?`), a + b); }
  if (k === 2) { const x = R.int(101, 999), y = R.int(101, 999), z = R.int(101, 999); return kp(`t${x}+${y}+${z}`, T('Calcule.', 'Work it out.'), tx(`${x} + ${y} + ${z} = ?`), x + y + z); }
  if (k === 3) { do { a = R.int(1001, 7000); b = R.int(1001, 9999 - a); } while (!hasCarry(a, b)); const s = a + b; return kp(`m${a}+?=${s}`, T('Quel nombre manque?', 'Which number is missing?'), tx(`${NB2(a)} + ? = ${NB2(s)}`), b); }
  do { a = R.int(1001, 8000); b = R.int(101, 1999); } while (!hasCarry(a, b));
  const s = a + b;
  return numQ(R, `ac${a}+${b}`, T('Calcule.', 'Work it out.'), tx(`${NB2(a)} + ${NB2(b)} = ?`), s, [s - 10, s - 100, s - 1000, s + 10, s + 100], { valid: (v) => v < 10000 });
};

// ---------- m6 ----------
const bugSub = (a, b) => { let r = 0, m = 1, x = a, y = b; while (x > 0 || y > 0) { r += Math.abs((x % 10) - (y % 10)) * m; m *= 10; x = Math.floor(x / 10); y = Math.floor(y / 10); } return r; };
NEW.m6 = (L, R) => {
  const k = R.int(0, 4);
  let a, b;
  if (L === 2) {
    if (k === 1) { do { a = R.int(2, 9) * 100 + R.int(0, 9); b = R.int(101, a - 1); } while (!(b % 100 > a % 100)); }
    else { do { a = R.int(300, 999); b = R.int(101, a - 1); } while (!hasBorrow(a, b)); }
    const c = a - b;
    if (k === 2) return R.chance(0.5) ? kp(`m${a}-?=${c}`, T('Quel nombre manque?', 'Which number is missing?'), tx(`${a} − ? = ${c}`), b) : kp(`mf?-${b}=${c}`, T('Quel nombre manque?', 'Which number is missing?'), tx(`? − ${b} = ${c}`), a);
    if (k === 3) return numQ(R, `sc${a}-${b}`, T('Calcule.', 'Work it out.'), tx(`${a} − ${b} = ?`), c, [bugSub(a, b), c + 10, c - 10, c + 100, c - 100], { fmt: String });
    return kp(`s${a}-${b}`, T('Calcule.', 'Work it out.'), tx(`${a} − ${b} = ?`), c);
  }
  if (k === 0) { do { a = R.int(1001, 9999); b = R.int(101, 999); } while (!hasBorrow(a, b)); return kp(`s${a}-${b}`, T('Calcule.', 'Work it out.'), tx(`${NB2(a)} − ${b} = ?`), a - b); }
  if (k === 1) { do { a = R.int(2001, 9999); b = R.int(1001, a - 100); } while (!hasBorrow(a, b)); return kp(`s${a}-${b}`, T('Calcule.', 'Work it out.'), tx(`${NB2(a)} − ${NB2(b)} = ?`), a - b); }
  if (k === 2) { a = R.int(2, 9) * 1000 + (R.chance(0.5) ? 0 : R.int(0, 9)); b = R.int(101, a - 100); return kp(`s${a}-${b}`, T('Calcule.', 'Work it out.'), tx(`${NB2(a)} − ${NB2(b)} = ?`), a - b); }
  if (k === 3) { do { a = R.int(2001, 9999); b = R.int(101, a - 1000); } while (!hasBorrow(a, b)); const c = a - b; return R.chance(0.5) ? kp(`m${a}-?=${c}`, T('Quel nombre manque?', 'Which number is missing?'), tx(`${NB2(a)} − ? = ${NB2(c)}`), b) : kp(`mf?-${b}=${c}`, T('Quel nombre manque?', 'Which number is missing?'), tx(`? − ${b} = ${NB2(c)}`), a); }
  do { a = R.int(2001, 9999); b = R.int(101, 1999); } while (!hasBorrow(a, b));
  const c = a - b;
  return numQ(R, `sc${a}-${b}`, T('Calcule.', 'Work it out.'), tx(`${NB2(a)} − ${NB2(b)} = ?`), c, [bugSub(a, b), c + 10, c - 10, c + 100, c - 1000], { valid: (v) => v < 10000 });
};

// ---------- story helpers for the harder levels ----------
// A "scene" gives the setting + noun; build sentences with {a}, {b}… and mkQ.
const SB = (R, L) => ctx(R, L);
const gainS = (nb) => [`{Il} en ${nb.gv[0]} {b} de plus.`, `{He} ${nb.gv[1]} {b} more.`];
const lossS = (nb, key = 'b') => [`{Il} en ${nb.lv[0]} {${key}}.`, `{He} ${nb.lv[1]} {${key}} of them.`];
const DISTX = (R, s, v, used, lo = 12, hi = 480) => addDist(R, s, v, used, lo, hi);
const mk3 = (id, c, s, q, ans, o = {}) => mkQ({ id, v: c.v, sents: s, q, ans, ...o });

// ---------- m7 ----------
const M7 = {
  add3(c) {
    const { R, nb, v } = c; const a = R.int(120, 650), b = R.int(110, 340); Object.assign(v, { a, b });
    const s = [[...HAVE[0]], gainS(nb)]; DISTX(R, s, v, [a, b]);
    return mk3('a3', c, s, ['Combien {dnf} a-t-{il} maintenant?', 'How many {ne} does {he} have now?'], a + b);
  },
  sub3(c) {
    const { R, nb, v } = c; const a = R.int(300, 900), b = R.int(110, a - 60); Object.assign(v, { a, b });
    const s = [[...HAVE[0]], lossS(nb)]; DISTX(R, s, v, [a, b]);
    return mk3('s3', c, s, ['Combien {dnf} lui reste-t-il?', 'How many {ne} does {he} have left?'], a - b);
  },
  cmp3(c) {
    const { R, v } = c; const hi = R.int(250, 950), lo = R.int(120, hi - 60); Object.assign(v, { a: hi, b: lo });
    const s = [['{set} {p} a {a} {nf}.', '{sete} {p} has {a} {ne}.'], ['{q} en a {b}.', '{q} has {b}.']]; DISTX(R, s, v, [hi, lo]);
    return mk3('c3', c, s, ['Combien {dnf} {p} a-t-{il} de plus {qq}?', 'How many more {ne} does {p} have than {q}?'], hi - lo);
  },
  two3(c) {
    const { R, nb, v } = c; const a = R.int(200, 600), b = R.int(100, 300), cc = R.int(60, a + b - 150); Object.assign(v, { a, b, c: cc });
    const s = [[...HAVE[0]], gainS(nb), [`Puis, {il} en ${nb.lv[0]} {c}.`, `Then {he} ${nb.lv[1]} {c} of them.`]]; DISTX(R, s, v, [a, b, cc]);
    return mk3('t3', c, s, ['Combien {dnf} a-t-{il} à la fin?', 'How many {ne} does {he} have at the end?'], a + b - cc);
  },
  grp(c) {
    const { R, v } = c; const g = R.int(3, 6), n = R.pick([2, 3, 4, 5, 10]), e = R.int(2, 9); Object.assign(v, { g, n, e });
    const s = [['{set} {p} range ses {nf} dans {g} sacs. Chaque sac en contient {n}.', '{sete} {p} puts {ne} in {g} bags. Each bag holds {n}.'], ['{Il} en a aussi {e} dans sa poche.', '{He} also has {e} in {his} pocket.']];
    return mk3('g3', c, s, ['Combien {dnf} {p} a-t-{il} en tout?', 'How many {ne} does {p} have in all?'], g * n + e);
  },
  miss3(c) {
    const { R, v } = c; const a = R.int(500, 950), b = R.int(100, 300), cc = R.int(40, a - b - 60); Object.assign(v, { a, b, c: cc });
    const s = [['{set} {p} veut avoir {a} {nf}.', '{sete} {p} wants to have {a} {ne}.'], ['{Il} en a {b}.', '{He} has {b}.'], ['{q} lui en donne {c}.', '{q} gives {him} {c} more.']]; DISTX(R, s, v, [a, b, cc]);
    return mk3('m3', c, s, ['Combien {dnf} lui manque-t-il encore?', 'How many more {ne} does {he} still need?'], a - b - cc);
  },
  // ---- Difficile ----
  two4(c) {
    const { R, nb, v } = c; const a = R.int(1200, 5000), b = R.int(300, 2500), cc = R.int(200, 1500); Object.assign(v, { a: NB2(a), b: NB2(b), c: NB2(cc) });
    const s = [[...HAVE[0]], gainS(nb), [`Puis, {il} en ${nb.lv[0]} {c}.`, `Then {he} ${nb.lv[1]} {c} of them.`]]; DISTX(R, s, v, [a, b, cc], 20, 900);
    return mk3('t4', c, s, ['Combien {dnf} a-t-{il} à la fin?', 'How many {ne} does {he} have at the end?'], a + b - cc);
  },
  after(c) {
    const { R, v } = c; const cc = R.int(10, 40), a = R.int(150, 400), b = R.int(20, a - 2 * cc - 20); Object.assign(v, { a, b, c: cc });
    const s = [['{set} {p} a {a} {nf} et {q} en a {b}.', '{sete} {p} has {a} {ne} and {q} has {b}.'], ['{p} en donne {c} à {q}.', '{p} gives {c} to {q}.']];
    return mk3('af', c, s, ['Combien {dnf} {p} a-t-{il} de plus {qq} maintenant?', 'How many more {ne} does {p} have than {q} now?'], (a - cc) - (b + cc));
  },
  start(c) {
    const { R, nb, v } = c; const b = R.int(40, 480), cc = R.int(15, 350); Object.assign(v, { b, c: cc });
    const s = [[`{set} {p} ${nb.lv[0]} {c} {nf}. Maintenant, {il} en a {b}.`, `{sete} {p} ${nb.lv[1]} {c} {ne}. Now {he} has {b}.`]];
    return mk3('st', c, s, ['Combien {dnf} {p} avait-{il} au début?', 'How many {ne} did {p} have at the start?'], b + cc);
  },
  times(c) {
    const { R, v } = c; const a = R.int(4, 18), f = R.int(3, 6); Object.assign(v, { a, f });
    const s = [['{set} {p} a {a} {nf}. {q} en a {f} fois plus que {p}.', '{sete} {p} has {a} {ne}. {q} has {f} times as many as {p}.']];
    return R.chance(0.5) ? mk3('x1', c, s, ['Combien {dnf} {q} a-t-{iq}?', 'How many {ne} does {q} have?'], a * f)
      : mk3('x2', c, s, ['Combien {dnf} ont-{ils} en tout?', 'How many {ne} do they have altogether?'], a + a * f);
  },
  rem(c) {
    const { R, v } = c; const k = R.pick([4, 5, 6, 7, 8]), n = R.int(3, 11) * k + R.int(1, k - 1); Object.assign(v, { n, k });
    const s = [['{set} {p} a {n} {nf}. {Il} veut les mettre dans des sacs de {k}.', '{sete} {p} has {n} {ne}. {He} wants to put them in bags of {k}.']];
    const full = Math.floor(n / k);
    return R.int(0, 2) === 0 ? mk3('r1', c, s, ['Combien de sacs complets peut-{il} faire?', 'How many full bags can {he} make?'], full)
      : R.chance(0.5) ? mk3('r2', c, s, ['Combien {dnf} restent-ils hors des sacs?', 'How many {ne} are left outside the bags?'], n % k)
        : mk3('r3', c, s, ['Combien de sacs faut-il pour tout ranger?', 'How many bags are needed to hold them all?'], full + 1);
  },
  budget(c) {
    const { R, v } = c; const n = R.int(2, 5), x = R.int(2, 6), y = R.int(2, 5), B = R.pick([20, 25, 30, 40, 50].filter((b) => b > n * x + y + 3));
    Object.assign(v, { n, x, y, B });
    const s = [['À la boutique, {p} a {B} $. {Il} achète {n} cahiers à {x} $ chacun et un crayon à {y} $.', 'At the shop, {p} has ${B}. {He} buys {n} notebooks at ${x} each and a pencil for ${y}.']];
    return mk3('bu', c, s, ['Combien d’argent lui reste-t-il?', 'How much money does {he} have left?'], B - n * x - y);
  },
  share(c) {
    const { R, v } = c; const k = R.pick([2, 4, 5]); let a, b; do { a = R.int(20, 90); b = R.int(20, 90); } while ((a + b) % k); Object.assign(v, { a, b, k });
    const s = [['{p} a {a} {nf} et {q} en a {b}. Ils mettent tout ensemble et partagent également entre {k} amis.', '{p} has {a} {ne} and {q} has {b}. They put them together and share equally among {k} friends.']];
    return mk3('sh', c, s, ['Combien {dnf} chaque ami reçoit-il?', 'How many {ne} does each friend get?'], (a + b) / k);
  },
};
NEW.m7 = (L, R) => {
  const c = SB(R, L);
  const kinds = L === 2 ? ['add3', 'sub3', 'cmp3', 'two3', 'grp', 'miss3', 'two3', 'cmp3'] : ['two4', 'after', 'start', 'times', 'rem', 'budget', 'share', 'two4', 'after'];
  return M7[R.pick(kinds)](c);
};

// ---------- m8 ----------
const SEQSTEPS2 = [4, 6, 8, 25, 50, 100, -25, -50, -100], SEQSTEPS3 = [75, 125, 150, 250, 500, 1000, -125, -250, -500, -1000, 35, 60];
const stepT = (s) => (s > 0 ? T(`ajouter ${s}`, `add ${s}`) : T(`soustraire ${-s}`, `subtract ${-s}`));
NEW.m8 = (L, R) => {
  const k = R.int(0, L === 2 ? 3 : 5);
  if (k === 0 || (L === 2 && k === 3)) {
    const step = R.pick(L === 2 ? SEQSTEPS2 : SEQSTEPS3), a = Math.abs(step);
    const hi = L === 2 ? 1000 : 9999;
    const start = step < 0 ? R.int(a * 6, Math.min(hi, a * 6 + (L === 2 ? 400 : 1500))) : R.int(0, Math.max(10, Math.min(hi - a * 6, L === 2 ? 500 : 3000)));
    const seq = Array.from({ length: 6 }, (_, i) => start + i * step), hole = R.int(1, 5);
    return kp(`seq${seq.join(',')}h${hole}`, T('Quel nombre manque dans la suite?', 'Which number is missing?'), tx(seq.map((v, i) => (i === hole ? '?' : NB2(v))).join(' ,  ')), seq[hole]);
  }
  if (k === 1) {
    const pool = L === 2 ? [2, 3, 4, 5, 6, 8, 10, 15, 20, 25, 30, 40, 50, 100] : [15, 25, 50, 75, 100, 125, 150, 200, 250, 500, 1000];
    const s0 = R.pick(pool), neg = R.chance(0.3), step = neg ? -s0 : s0;
    const start = neg ? s0 * 6 + R.int(0, 200) : R.int(0, 400), seq = Array.from({ length: 5 }, (_, i) => start + i * step);
    const ds = R.sample(pool.filter((x) => x !== s0), 3);
    return { type: 'choice', key: `rl${seq.join(',')}`, prompt: T('Quelle est la règle de cette suite?', 'What is the rule of this pattern?'), stimulus: tx(seq.map(NB2).join(' ,  ')), options: [step, ...ds.map((d) => (neg ? -d : d))].map((s) => ({ text: stepT(s) })), answer: 0, cols: 2 };
  }
  if (k === 2 && L === 2) {
    const step = R.pick([2, 4, 6, 10, 20, 3, 5, 7, 9, 15]), start = R.int(1, 30), seq = [0, 1, 2, 3, 4].map((i) => start + i * step);
    const even = step % 2 === 0, ans = even ? (start % 2 === 0 ? 0 : 1) : 2;
    return { type: 'choice', key: `par${seq.join(',')}`, prompt: T('Que remarques-tu sur ces nombres?', 'What do you notice about these numbers?'), stimulus: tx(seq.join(' ,  ') + ' …'), options: [{ text: T('tous pairs', 'all even') }, { text: T('tous impairs', 'all odd') }, { text: T('pair, impair, pair, impair…', 'even, odd, even, odd…') }], answer: ans, fixedOrder: true, cols: 1 };
  }
  if (k === 2) {
    const s0 = R.int(2, 12), n = R.int(0, 2) + 3, seq = Array.from({ length: 6 }, (_, i) => s0 * 2 ** i), hole = R.int(3, 5);
    return kp(`dbl${seq.join(',')}h${hole}`, T('Chaque nombre est le double du précédent. Quel nombre manque?', 'Each number is double the one before. Which number is missing?'), tx(seq.map((v, i) => (i === hole ? '?' : NB2(v))).join(' ,  ')), seq[hole]);
  }
  if (k === 3) {
    const a = R.int(1, 30), x = R.int(2, 12); let y = R.int(2, 12); if (y === x) y++;
    const seq = [a]; for (let i = 0; i < 6; i++) seq.push(seq[i] + (i % 2 === 0 ? x : y));
    return kp(`alt${seq.join(',')}`, T('La suite change de deux façons, à tour de rôle. Quel nombre suit?', 'The pattern alternates between two steps. Which number comes next?'), tx(seq.slice(0, 6).join(' ,  ') + ' ,  ?'), seq[6]);
  }
  if (k === 4) {
    const s0 = R.int(3, 9), a = R.int(2, 12), r = R.int(7, 12);
    return kp(`rk${a}_${s0}_${r}`, T(`Une suite commence par ${a} et on ajoute ${s0} chaque fois : ${a}, ${a + s0}, ${a + 2 * s0}… Quel est le ${r}e nombre?`, `A pattern starts at ${a} and adds ${s0} each time: ${a}, ${a + s0}, ${a + 2 * s0}… What is the ${r}th number?`), null, a + (r - 1) * s0);
  }
  const s0 = R.pick([25, 50, 100, 250, 500]), n = R.int(4, 16), a = R.int(0, 8) * s0 * (s0 >= 250 ? 1 : 2);
  return kp(`bd${s0}_${a}_${n}`, T(`On compte de ${s0} en ${s0}, de ${NB2(a)} à ${NB2(a + n * s0)}. Combien de bonds fait-on?`, `We count by ${s0}s from ${NBe(a)} to ${NBe(a + n * s0)}. How many jumps do we make?`), null, n);
};

// ---------- m9 ----------
const frT = (a, b) => `${a}/${b}`;
const eqFr = (a, b, c, d) => a * d === b * c;
const DENF = { 2: ['demis', 'halves'], 3: ['tiers', 'thirds'], 4: ['quarts', 'quarters'], 5: ['cinquièmes', 'fifths'], 6: ['sixièmes', 'sixths'], 8: ['huitièmes', 'eighths'], 10: ['dixièmes', 'tenths'] };
NEW.m9 = (L, R) => {
  const kind = R.pick(['rect', 'circle']);
  if (L === 2) {
    const k = R.int(0, 5);
    if (k === 0) {
      const d = R.pick([2, 3, 4, 5, 10]), each = R.int(2, d === 10 ? 8 : 9), n = d * each, nm = { 2: 'la moitié', 3: 'le tiers', 4: 'le quart', 5: 'le cinquième', 10: 'le dixième' }[d], ne = { 2: 'half', 3: 'a third', 4: 'a quarter', 5: 'a fifth', 10: 'a tenth' }[d];
      return kp(`of${d}_${n}`, T(`Quel est ${nm} de ${n}?`, `What is ${ne} of ${n}?`), n <= 20 ? { emojis: R.pick(OBJ), count: n } : tx(String(n)), each);
    }
    if (k === 1) {
      const ds = R.sample([2, 3, 4, 5, 6, 8, 10], 3), big = R.chance(0.5), t = big ? Math.min(...ds) : Math.max(...ds);
      return { type: 'choice', key: `uf${ds.slice().sort().join('')}${big}`, prompt: big ? T('Quelle fraction est la plus grande?', 'Which fraction is the biggest?') : T('Quelle fraction est la plus petite?', 'Which fraction is the smallest?'), options: ds.map((d) => ({ text: frT(1, d) })), answer: ds.indexOf(t), fixedOrder: true, cols: 3 };
    }
    if (k === 2) {
      const B = R.pick([[1, 2, [[2, 4], [3, 6], [4, 8]]], [1, 3, [[2, 6], [3, 9]]], [1, 4, [[2, 8], [3, 12]]]]), [a, b, eqs] = B, [c, d] = R.pick(eqs);
      const pool = [[1, 2], [1, 3], [1, 4], [2, 3], [3, 4], [2, 5], [1, 5], [3, 5], [1, 6], [3, 8], [5, 6], [2, 4], [3, 6]].filter(([x, y]) => !eqFr(x, y, a, b) && !(x === c && y === d));
      const w = R.sample(pool, 2);
      return { type: 'choice', key: `eq${a}/${b}_${c}/${d}${w.map((p) => p.join('/')).join('')}`, prompt: T(`Quelle fraction est équivalente à ${frT(a, b)}?`, `Which fraction is equivalent to ${frT(a, b)}?`), stimulus: { svg: S.fraction(b, a, kind, true) }, options: [[c, d], ...w].map(([x, y]) => ({ text: frT(x, y) })), answer: 0, cols: 3 };
    }
    if (k === 3) {
      const d = R.pick([3, 4, 5]), each = R.int(2, 8), n = d * each, p = R.pick(PEOPLE), th = R.pick(THINGS), eat = R.chance(0.5);
      const w = { 3: ['le tiers', 'a third'], 4: ['le quart', 'a quarter'], 5: ['le cinquième', 'a fifth'] }[d];
      const fr = `${p.n} a ${n} ${th.fr[1]}. ${Il(p)} en ${eat ? 'mange' : 'donne'} ${w[0]}. Combien ${eat ? 'en reste-t-il' : 'lui en reste-t-il'}?`, en = `${p.n} has ${n} ${th.en[1]}. ${He(p)} ${eat ? 'eats' : 'gives away'} ${w[1]}. How many are left?`;
      return kp(`fq${d}_${n}${p.n}${eat}`, T(fr, en), { emoji: th.e }, n - each, SAY(fr, en));
    }
    if (k === 4) {
      const n = R.pick([3, 4, 5, 6, 8]), sh = R.int(1, n - 1);
      const cands = [[sh + 1, n], [sh - 1, n], [sh, n + 1], [n - sh, n], [sh, n - 1]].filter(([a, b]) => a >= 1 && a < b && !eqFr(a, b, sh, n));
      const uniq = []; for (const c of cands) if (!uniq.some((u) => eqFr(u[0], u[1], c[0], c[1]))) uniq.push(c);
      const wrong = R.sample(uniq, 2);
      return { type: 'choice', key: `frk${sh}/${n}${kind}`, prompt: T('Quelle fraction est coloriée?', 'Which fraction is coloured?'), stimulus: { svg: S.fraction(n, sh, kind, true) }, options: [[sh, n], ...wrong].map(([a, b]) => ({ text: frT(a, b) })), answer: 0, cols: 3 };
    }
    const n = R.pick([3, 4, 5, 6, 8]), sh = R.int(1, n - 1);
    const cands = [[sh, n], [n - sh + 1, n], [sh, n - 1], [sh + 1, n]].filter(([a, b]) => a >= 1 && a < b && !eqFr(a, b, n - sh, n));
    const uniq = []; for (const c of cands) if (!uniq.some((u) => eqFr(u[0], u[1], c[0], c[1]))) uniq.push(c);
    return { type: 'choice', key: `frn${sh}/${n}${kind}`, prompt: T('Quelle fraction n’est PAS coloriée?', 'Which fraction is NOT coloured?'), stimulus: { svg: S.fraction(n, sh, kind, true) }, options: [[n - sh, n], ...R.sample(uniq, 2)].map(([a, b]) => ({ text: frT(a, b) })), answer: 0, cols: 3 };
  }
  const k = R.int(0, 6);
  if (k === 0) {
    const d = R.pick([3, 4, 5]), a = R.int(2, d - 1), each = R.int(2, 12), n = d * each;
    const nm = { 3: ['tiers', 'thirds'], 4: ['quarts', 'quarters'], 5: ['cinquièmes', 'fifths'] }[d];
    return kp(`fa${a}/${d}_${n}`, T(`Quelle est la valeur de ${a}/${d} de ${n}?`, `What is ${a}/${d} of ${n}?`), n <= 20 ? { emojis: R.pick(OBJ), count: n } : null, a * each);
  }
  if (k === 1) {
    const d = R.pick([2, 3, 4, 5]), a = R.int(1, d - 1), N = R.pick({ 2: [10, 20], 3: [12, 15], 4: [12, 16, 20], 5: [10, 15, 20] }[d]);
    const ans = (a * N) / d;
    return { type: 'numberline', key: `fnl${a}/${d}_${N}`, prompt: T(`Touche ${a}/${d} de ${N}.`, `Tap ${a}/${d} of ${N}.`), min: 0, max: N, step: N / d, answer: ans };
  }
  if (k === 2) {
    const d = R.pick([4, 5, 6, 8, 10]), add = R.chance(0.6);
    let a, b;
    if (add) { a = R.int(1, d - 2); b = R.int(1, d - 1 - a); } else { a = R.int(3, d - 1); b = R.int(1, a - 1); }
    return kp(`fs${a}${add ? '+' : '-'}${b}/${d}`, T('Quel nombre manque?', 'Which number is missing?'), tx(`${a}/${d} ${add ? '+' : '−'} ${b}/${d} = ?/${d}`), add ? a + b : a - b);
  }
  if (k === 3) {
    const same = R.chance(0.5), big = R.chance(0.5);
    let opts;
    if (same) { const d = R.int(5, 12), ns = R.sample([...Array(d - 1).keys()].map((x) => x + 1), 3); opts = ns.map((n) => [n, d]); const t = big ? Math.max(...ns) : Math.min(...ns); return { type: 'choice', key: `cs${d}_${ns.slice().sort().join('')}${big}`, prompt: big ? T('Quelle fraction est la plus grande?', 'Which fraction is the biggest?') : T('Quelle fraction est la plus petite?', 'Which fraction is the smallest?'), options: opts.map(([a, b]) => ({ text: frT(a, b) })), answer: ns.indexOf(t), fixedOrder: true, cols: 3 }; }
    const n0 = R.int(1, 3), ds = R.sample([4, 5, 6, 8, 10, 12].filter((d) => d > n0), 3), t = big ? Math.min(...ds) : Math.max(...ds);
    return { type: 'choice', key: `cn${n0}_${ds.slice().sort().join('')}${big}`, prompt: big ? T('Quelle fraction est la plus grande?', 'Which fraction is the biggest?') : T('Quelle fraction est la plus petite?', 'Which fraction is the smallest?'), options: ds.map((d) => ({ text: frT(n0, d) })), answer: ds.indexOf(t), fixedOrder: true, cols: 3 };
  }
  if (k === 4) {
    const d = R.pick([2, 3, 4, 5, 6, 8, 10]);
    return kp(`whole${d}`, T(`Combien de ${DENF[d][0]} faut-il pour faire un entier?`, `How many ${DENF[d][1]} make one whole?`), null, d);
  }
  if (k === 5) {
    const [a, b] = R.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5]]), m = R.int(2, 4);
    return kp(`mx${a}/${b}x${m}`, T('Quel nombre manque?', 'Which number is missing?'), tx(`${a}/${b} = ?/${b * m}`), a * m);
  }
  const d = R.pick([3, 4, 5]), a = R.int(1, d - 1), each = R.int(3, 10), n = d * each, p = R.pick(PEOPLE);
  const fr = `Dans la classe ${dn(p.n)}, il y a ${n} élèves. ${a}/${d} des élèves font du patin. Combien d’élèves ne font pas de patin?`, en = `In ${p.n}’s class there are ${n} students. ${a}/${d} of the students skate. How many students do not skate?`;
  return kp(`fst${a}/${d}_${n}`, T(fr, en), { emoji: '⛸️' }, n - a * each, SAY(fr, en));
};

// ---------- m10 ----------
const gridRows = (w, h, cut) => { const rows = []; for (let j = 0; j < h; j++) { let r = ''; for (let i = 0; i < w; i++) r += cut && i >= w - cut[0] && j >= h - cut[1] ? '.' : '#'; rows.push(r); } return rows; };
const countRows = (rows) => rows.join('').split('#').length - 1;
NEW.m10 = (L, R) => {
  const COLS = [S.COLORS.blue, S.COLORS.green, S.COLORS.orange, S.COLORS.pink, S.COLORS.purple];
  const k = R.int(0, L === 2 ? 6 : 8);
  if (L === 2) {
    if (k === 0) { const w = R.int(3, 12), h = R.int(2, w - 1 > 2 ? Math.min(w - 1, 9) : 2); return kp(`pr${w}x${h}`, T('Quel est le périmètre de ce rectangle? (en cm)', 'What is the perimeter of this rectangle? (in cm)'), { svg: S.rectSides(w, h) }, 2 * (w + h)); }
    if (k === 1) {
      const sides = R.pick([3, 4, 5]), v = Array.from({ length: sides }, () => R.int(2, 12)), nm = { 3: ['triangle', 'triangle'], 4: ['quadrilatère', 'quadrilateral'], 5: ['pentagone', 'pentagon'] }[sides];
      return kp(`pl${v.join(',')}`, T(`Un ${nm[0]} a des côtés de ${v.join(' cm, ')} cm. Quel est son périmètre (en cm)?`, `A ${nm[1]} has sides of ${v.join(' cm, ')} cm. What is its perimeter (in cm)?`), null, sumArr(v));
    }
    if (k === 2) { const w = R.int(2, 7), h = R.int(2, 5), rows = gridRows(w, h); return kp(`ar${w}x${h}`, T('Combien de carrés y a-t-il dans cette figure? (aire en carrés-unités)', 'How many squares are in this shape? (area in square units)'), { svg: S.areaGrid(rows, R.pick(COLS)) }, w * h); }
    if (k === 3) {
      const w = R.int(3, 7), h = R.int(3, 5), cw = R.int(1, 2), ch = R.int(1, 2), rows = gridRows(w, h, [cw, ch]);
      return kp(`arL${w}x${h}-${cw}x${ch}`, T('Combien de carrés y a-t-il dans cette figure?', 'How many squares are in this shape?'), { svg: S.areaGrid(rows, R.pick(COLS)) }, countRows(rows));
    }
    if (k === 4) {
      const F = [
        ['cube', 'Combien de faces a un cube?', 'How many faces does a cube have?', 6], ['cube', 'Combien d’arêtes a un cube?', 'How many edges does a cube have?', 12], ['cube', 'Combien de sommets a un cube?', 'How many vertices does a cube have?', 8],
        ['pyramide', 'Combien de faces a cette pyramide à base carrée?', 'How many faces does this square-based pyramid have?', 5], ['pyramide', 'Combien d’arêtes a cette pyramide à base carrée?', 'How many edges does this square-based pyramid have?', 8],
        ['prisme', 'Combien de faces a ce prisme à base rectangulaire?', 'How many faces does this rectangular prism have?', 6], ['prisme', 'Combien d’arêtes a ce prisme à base rectangulaire?', 'How many edges does this rectangular prism have?', 12],
      ];
      const [s, fr, en, ans] = R.pick(F);
      return kp(`fc${fr}`, T(fr, en), { svg: S.solid(s) }, ans, SAY(fr, en));
    }
    if (k === 5) {
      const Q = [
        ['Quelle figure a 4 côtés égaux et 4 angles droits?', 'Which shape has 4 equal sides and 4 right angles?', 'carre'],
        ['Quelle figure a 4 côtés, dont 2 longs et 2 courts, et 4 angles droits?', 'Which shape has 4 sides (2 long, 2 short) and 4 right angles?', 'rectangle'],
        ['Quelle figure a 3 côtés?', 'Which shape has 3 sides?', 'triangle'], ['Quelle figure a 6 côtés?', 'Which shape has 6 sides?', 'hexagone'], ['Quelle figure a 5 côtés?', 'Which shape has 5 sides?', 'pentagone'],
        ['Quelle figure a 4 côtés égaux, mais pas d’angle droit?', 'Which shape has 4 equal sides but no right angle?', 'losange'],
      ];
      const NM = { carre: T('carré', 'square'), rectangle: T('rectangle', 'rectangle'), triangle: T('triangle', 'triangle'), hexagone: T('hexagone', 'hexagon'), pentagone: T('pentagone', 'pentagon'), losange: T('losange', 'rhombus'), cercle: T('cercle', 'circle') };
      const [fr, en, ans] = R.pick(Q), d = R.sample(Object.keys(NM).filter((x) => x !== ans && !(ans === 'carre' && x === 'losange') && !(ans === 'losange' && x === 'carre') && !(ans === 'rectangle' && x === 'carre') && !(ans === 'carre' && x === 'rectangle')), 3);
      return { type: 'choice', key: `rd${ans}${d.join('')}`, prompt: T(fr, en), say: SAY(fr, en), options: [ans, ...d].map((x) => ({ text: NM[x] })), answer: 0, cols: 2 };
    }
    const P = [['un rectangle', 'a rectangle', 2], ['un carré', 'a square', 2], ['un losange', 'a rhombus', 2], ['un hexagone régulier', 'a regular hexagon', 3], ['un triangle', 'a triangle', 0]];
    const [fr, en] = R.pick([['un rectangle', 'a rectangle'], ['un carré', 'a square'], ['un losange', 'a rhombus']]);
    return kp(`par${fr}`, T(`Combien de paires de côtés parallèles a ${fr}?`, `How many pairs of parallel sides does ${en} have?`), null, 2);
  }
  if (k === 0) { const w = R.int(4, 18), h = R.int(2, 12); return kp(`pr${w}x${h}`, T('Quel est le périmètre de ce rectangle? (en cm)', 'What is the perimeter of this rectangle? (in cm)'), { svg: S.rectSides(w, h) }, 2 * (w + h)); }
  if (k === 1) { const w = R.int(3, 10), h = R.int(2, 10), P = 2 * (w + h); return kp(`pm${P}_${w}`, T(`Un rectangle a un périmètre de ${P} cm et une longueur de ${w} cm. Quelle est sa largeur (en cm)?`, `A rectangle has a perimeter of ${P} cm and a length of ${w} cm. What is its width (in cm)?`), null, h); }
  if (k === 2) { const w = R.int(3, 12), h = R.int(2, 9); return kp(`ad${w}x${h}`, T(`Un rectangle mesure ${w} cm sur ${h} cm. Quelle est son aire (en cm²)?`, `A rectangle is ${w} cm by ${h} cm. What is its area (in cm²)?`), { svg: S.rectSides(w, h) }, w * h); }
  if (k === 3) {
    const w = R.int(4, 8), h = R.int(4, 6), cw = R.int(1, w - 2), ch = R.int(1, h - 2), rows = gridRows(w, h, [cw, ch]);
    return kp(`arL${w}x${h}-${cw}x${ch}`, T('Quelle est l’aire de cette figure? (en carrés-unités)', 'What is the area of this shape? (in square units)'), { svg: S.areaGrid(rows, R.pick(COLS)) }, countRows(rows));
  }
  if (k === 4) { const s = R.int(3, 25); return kp(`psq${s}`, T(`Un carré a des côtés de ${s} cm. Quel est son périmètre (en cm)?`, `A square has sides of ${s} cm. What is its perimeter (in cm)?`), null, 4 * s); }
  if (k === 5 || k === 6) {
    const n = R.pick([3, 4, 5, 6, 8]), nm = { 3: ['triangulaire', 'triangular'], 4: ['carrée', 'square'], 5: ['pentagonale', 'pentagonal'], 6: ['hexagonale', 'hexagonal'], 8: ['octogonale', 'octagonal'] }[n];
    if (R.chance(0.5)) {
      const Q = [['faces', 'faces', n + 2], ['arêtes', 'edges', 3 * n], ['sommets', 'vertices', 2 * n]], [af, ae, ans] = R.pick(Q);
      return kp(`pz${n}${af}`, T(`Combien ${af === 'arêtes' ? 'd’' : 'de '}${af} a un prisme à base ${nm[0]}?`, `How many ${ae} does a prism with a ${nm[1]} base have?`), null, ans);
    }
    const Q = [['faces', 'faces', n + 1], ['arêtes', 'edges', 2 * n], ['sommets', 'vertices', n + 1]], [af, ae, ans] = R.pick(Q);
    return kp(`py${n}${af}`, T(`Combien ${af === 'arêtes' ? 'd’' : 'de '}${af} a une pyramide à base ${nm[0]}?`, `How many ${ae} does a pyramid with a ${nm[1]} base have?`), null, ans);
  }
  const SY = [['carré', 'square', 4], ['rectangle', 'rectangle', 2], ['triangle équilatéral', 'equilateral triangle', 3], ['losange', 'rhombus', 2], ['hexagone régulier', 'regular hexagon', 6], ['pentagone régulier', 'regular pentagon', 5]];
  const [fr, en, ans] = R.pick(SY);
  return kp(`axes${fr}`, T(`Combien d’axes de symétrie a un ${fr}?`, `How many lines of symmetry does a ${en} have?`), null, ans);
};

// ---------- m11 ----------
const h24 = (h, m) => `${h} h${m ? ' ' + String(m).padStart(2, '0') : ''}`;
const tOpt = (tot) => { const t = ((tot % 1440) + 1440) % 1440, h = Math.floor(t / 60), m = t % 60; return T(h24(h, m), `${h}:${String(m).padStart(2, '0')}`); };
const durT = (d) => { const h = Math.floor(d / 60), m = d % 60; return T(`${h ? h + ' h' : ''}${h && m ? ' ' : ''}${m ? m + ' min' : ''}`, `${h ? h + ' h' : ''}${h && m ? ' ' : ''}${m ? m + ' min' : ''}`); };
const timeOK = (v) => v >= 0 && v < 1440;
const EV = [['Le film', 'The movie'], ['Le spectacle', 'The show'], ['La partie de hockey', 'The hockey game'], ['Le cours de natation', 'The swimming class'], ['La pièce de théâtre', 'The play']];
NEW.m11 = (L, R) => {
  const k = R.int(0, 5);
  const lenConv = () => {
    const m = R.int(0, 3);
    if (m === 0) { const x = R.int(2, 9); return kp(`c${x}mcm`, T(`${x} m = ? cm`, `${x} m = ? cm`), null, x * 100); }
    if (m === 1) { const x = R.int(2, 15); return kp(`c${x}cmmm`, T(`${x} cm = ? mm`, `${x} cm = ? mm`), null, x * 10); }
    if (m === 2) { const x = R.int(2, 9); return kp(`c${x}00cm`, T(`${NB2(x * 100)} cm = ? m`, `${NBe(x * 100)} cm = ? m`), null, x); }
    const x = R.int(3, 15); return kp(`c${x}0mm`, T(`${x * 10} mm = ? cm`, `${x * 10} mm = ? cm`), null, x);
  };
  if (L === 2) {
    if (k === 0) {
      const h = R.int(1, 12), m = R.int(0, 11) * 5, tot = h * 60 + m, sw = (m === 0 ? 12 : m / 5) * 60 + h * 5;
      return numQ(R, `ck${h}:${m}`, T('Quelle heure est-il?', 'What time is it?'), { svg: S.clock(h, m) }, tot, [sw, tot + 5, tot - 5, tot + 10, tot - 10, tot + 60], { fmt: (v) => T(h24(Math.floor(v / 60), v % 60), `${Math.floor(v / 60)}:${String(v % 60).padStart(2, '0')}`), cols: 2, valid: (v) => v >= 60 && v < 780 && v % 5 === 0 });
    }
    if (k === 1) {
      const sh = R.int(8, 18), sm = R.int(0, 11) * 5, d = R.pick([20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 80, 90]), ev = R.pick(EV), st = sh * 60 + sm;
      return numQ(R, `fin${st}+${d}${ev[0]}`, T(`${ev[0]} commence à ${h24(sh, sm)} et dure ${durT(d).fr}. À quelle heure finit-il?`, `${ev[1]} starts at ${sh}:${String(sm).padStart(2, '0')} and lasts ${durT(d).en}. What time does it end?`), null, st + d, [st + d + 10, st + d - 10, st + d + 60, st + d - 5, st + d + 30, st - d], { fmt: tOpt, cols: 2, valid: timeOK });
    }
    if (k === 2) return lenConv();
    if (k === 3) {
      const vals = R.sample([30, 80, 120, 150, 200, 250, 5, 450, 700], 3), U = (v) => (v >= 100 && v % 100 === 0 ? T(`${v / 100} m`, `${v / 100} m`) : T(`${v} cm`, `${v} cm`));
      const mixed = vals.map((v, i) => (i === 0 && v >= 100 && v % 100 === 0 ? { cm: v, t: U(v) } : i === 1 ? { cm: v, t: T(`${v * 10} mm`, `${v * 10} mm`) } : { cm: v, t: U(v) }));
      const big = R.chance(0.5), t = mixed.reduce((a, b) => ((big ? b.cm > a.cm : b.cm < a.cm) ? b : a));
      if (new Set(mixed.map((x) => x.cm)).size < 3) return NEW.m11(L, R);
      return { type: 'choice', key: `lm${mixed.map((x) => x.t.fr).join('|')}${big}`, prompt: big ? T('Quelle longueur est la plus grande?', 'Which length is the longest?') : T('Quelle longueur est la plus petite?', 'Which length is the shortest?'), options: mixed.map((x) => ({ text: x.t })), answer: mixed.indexOf(t), fixedOrder: true, cols: 3 };
    }
    if (k === 4) {
      const Q = [['Combien de jours y a-t-il dans 3 semaines?', 'How many days are in 3 weeks?', 21], ['Combien de jours y a-t-il dans 4 semaines?', 'How many days are in 4 weeks?', 28], ['Combien de minutes y a-t-il dans 2 heures?', 'How many minutes are in 2 hours?', 120], ['Combien de minutes y a-t-il dans 3 heures?', 'How many minutes are in 3 hours?', 180], ['Combien de secondes y a-t-il dans 2 minutes?', 'How many seconds are in 2 minutes?', 120], ['Combien de mois y a-t-il dans 2 ans?', 'How many months are in 2 years?', 24], ['Combien de jours y a-t-il en février (année normale)?', 'How many days are in February (normal year)?', 28], ['Combien de minutes y a-t-il dans une heure et demie?', 'How many minutes are in one and a half hours?', 90]];
      const [fr, en, ans] = R.pick(Q); return kp(`tq${fr}`, T(fr, en), null, ans, SAY(fr, en));
    }
    const m = R.int(0, 3);
    if (m === 0) { const x = R.int(2, 9); return kp(`kg${x}`, T(`${x} kg = ? g`, `${x} kg = ? g`), null, x * 1000); }
    if (m === 1) { const x = R.int(2, 9); return kp(`L${x}`, T(`${x} L = ? mL`, `${x} L = ? mL`), null, x * 1000); }
    if (m === 2) { const x = R.int(2, 9); return kp(`g${x}`, T(`${x * 1000} g = ? kg`, `${x * 1000} g = ? kg`), null, x); }
    const x = R.int(2, 9); return kp(`mL${x}`, T(`${x * 1000} mL = ? L`, `${x * 1000} mL = ? L`), null, x);
  }
  if (k === 0) {
    const sh = R.int(7, 17), sm = R.int(0, 11) * 5, eh = sh + R.int(1, 3), em = R.int(0, 11) * 5, d = (eh * 60 + em) - (sh * 60 + sm);
    if (d < 25) return NEW.m11(L, R);
    return kp(`du${sh}:${sm}-${eh}:${em}`, T(`De ${h24(sh, sm)} à ${h24(eh, em)}, combien de minutes y a-t-il?`, `From ${sh}:${String(sm).padStart(2, '0')} to ${eh}:${String(em).padStart(2, '0')}, how many minutes are there?`), null, d);
  }
  if (k === 1) {
    const sh = R.int(8, 20), sm = R.int(0, 11) * 5, d = R.pick([65, 70, 85, 95, 105, 110, 125, 135, 150]), ev = R.pick(EV), st = sh * 60 + sm;
    return numQ(R, `fin${st}+${d}${ev[0]}`, T(`${ev[0]} commence à ${h24(sh, sm)} et dure ${durT(d).fr}. À quelle heure finit-il?`, `${ev[1]} starts at ${sh}:${String(sm).padStart(2, '0')} and lasts ${durT(d).en}. What time does it end?`), null, st + d, [st + d + 10, st + d - 10, st + d + 60, st + d - 60, st + d + 40, st + d - 20, st + d + 5], { fmt: tOpt, cols: 2, valid: (v) => v >= 0 && v < 1440 });
  }
  if (k === 2) {
    const eh = R.int(10, 21), em = R.int(0, 11) * 5, d = R.pick([75, 80, 95, 105, 115, 130, 145]), ev = R.pick(EV), en = eh * 60 + em;
    return numQ(R, `deb${en}-${d}${ev[0]}`, T(`${ev[0]} finit à ${h24(eh, em)} et dure ${durT(d).fr}. À quelle heure commence-t-il?`, `${ev[1]} ends at ${eh}:${String(em).padStart(2, '0')} and lasts ${durT(d).en}. What time does it start?`), null, en - d, [en - d + 10, en - d - 10, en - d + 60, en - d - 60, en - d + 20, en - d - 5], { fmt: tOpt, cols: 2, valid: timeOK });
  }
  if (k === 3) {
    const m = R.int(0, 4);
    if (m === 0) { const a = R.int(1, 9), b = R.int(10, 95); return kp(`mc${a}_${b}`, T(`${a} m ${b} cm = ? cm`, `${a} m ${b} cm = ? cm`), null, a * 100 + b); }
    if (m === 1) { const a = R.int(1, 9), b = R.int(1, 9); return kp(`km${a}_${b}`, T(`${a} km ${b}00 m = ? m`, `${a} km ${b}00 m = ? m`), null, a * 1000 + b * 100); }
    if (m === 2) { const a = R.int(2, 9); return kp(`kk${a}`, T(`${a} km = ? m`, `${a} km = ? m`), null, a * 1000); }
    if (m === 3) { const a = R.int(1, 9), b = R.int(1, 9); return kp(`cmm${a}_${b}`, T(`${a} cm ${b} mm = ? mm`, `${a} cm ${b} mm = ? mm`), null, a * 10 + b); }
    const a = R.int(2, 15) * 100; return kp(`mm${a}`, T(`${NB2(a)} cm = ? m`, `${NBe(a)} cm = ? m`), null, a / 100);
  }
  if (k === 4) {
    const m = R.int(0, 3);
    if (m === 0) { const h = R.int(1, 4), mi = R.pick([15, 20, 30, 40, 45, 50]); return kp(`hm${h}_${mi}`, T(`${h} h ${mi} min = ? min`, `${h} h ${mi} min = ? min`), null, h * 60 + mi); }
    if (m === 1) { const h = R.int(3, 9), extra = R.int(5, 55); return kp(`hf${h}_${extra}`, T(`Combien d’heures complètes y a-t-il dans ${h * 60 + extra} minutes?`, `How many full hours are there in ${h * 60 + extra} minutes?`), null, h); }
    if (m === 2) { const mi = R.int(2, 9); return kp(`sec${mi}`, T(`${mi} minutes = ? secondes`, `${mi} minutes = ? seconds`), null, mi * 60); }
    const d = R.int(3, 8); return kp(`dw${d}`, T(`${d} semaines et 3 jours = ? jours`, `${d} weeks and 3 days = ? days`), null, d * 7 + 3);
  }
  const m = R.int(0, 3);
  if (m === 0) { const a = R.int(1, 9), b = R.int(1, 9); return kp(`kgg${a}_${b}`, T(`${a} kg ${b}00 g = ? g`, `${a} kg ${b}00 g = ? g`), null, a * 1000 + b * 100); }
  if (m === 1) { const a = R.int(1, 9), b = R.int(1, 9); return kp(`Lm${a}_${b}`, T(`${a} L ${b}00 mL = ? mL`, `${a} L ${b}00 mL = ? mL`), null, a * 1000 + b * 100); }
  if (m === 2) return lenConv();
  const a = R.int(1, 9) * 1000 + R.int(0, 9) * 100; return kp(`gk${a}`, T(`Combien de kilogrammes complets y a-t-il dans ${NB2(a)} g?`, `How many full kilograms are there in ${NBe(a)} g?`), null, Math.floor(a / 1000));
};

// ---------- m12 ----------
const SPORTS = [['Hockey', 'Hockey', '🏒'], ['Soccer', 'Soccer', '⚽'], ['Natation', 'Swimming', '🏊'], ['Vélo', 'Biking', '🚲'], ['Danse', 'Dance', '💃'], ['Judo', 'Judo', '🥋'], ['Ski', 'Skiing', '⛷️']];
const BAGC = [['rouges', 'red', '🔴'], ['bleues', 'blue', '🔵'], ['vertes', 'green', '🟢'], ['jaunes', 'yellow', '🟡']];
NEW.m12 = (L, R) => {
  const k = R.int(0, L === 2 ? 4 : 6);
  const n = L === 2 ? 4 : 5, sp = R.sample(SPORTS, n);
  if (k <= 1) { // scaled bar graph
    const [max, step, mult] = L === 2 ? [40, 5, 5] : R.pick([[100, 10, 5], [60, 10, 5], [100, 20, 10]]);
    const vals = R.sample(Array.from({ length: max / mult }, (_, i) => (i + 1) * mult), n);
    const data = sp.map((s, i) => ({ label: s[0], value: vals[i] })), chart = S.barChartScaled(data, { max, step });
    const [a, b] = R.sample(data, 2), [hi, lo] = a.value > b.value ? [a, b] : [b, a];
    const kind = R.pick(L === 2 ? ['one', 'diff', 'most'] : ['diff', 'tot', 'two', 'least']);
    const base = `bs${data.map((x) => x.label + x.value).join()}${max}`;
    if (kind === 'one') return kp(`${base}o${a.label}`, T(`Combien d’élèves choisissent ${a.label}?`, `How many students choose ${a.label}?`), { svg: chart }, a.value);
    if (kind === 'diff') return kp(`${base}d${hi.label}${lo.label}`, T(`Combien d’élèves de plus choisissent ${hi.label} que ${lo.label}?`, `How many more students choose ${hi.label} than ${lo.label}?`), { svg: chart }, hi.value - lo.value);
    if (kind === 'tot') return kp(`${base}t`, T('Combien d’élèves ont répondu en tout?', 'How many students answered in all?'), { svg: chart }, sumArr(vals));
    if (kind === 'two') return kp(`${base}w${a.label}${b.label}`, T(`Combien d’élèves choisissent ${a.label} ou ${b.label}?`, `How many students choose ${a.label} or ${b.label}?`), { svg: chart }, a.value + b.value);
    const best = data.reduce((x, y) => ((kind === 'most' ? y.value > x.value : y.value < x.value) ? y : x));
    return { type: 'choice', key: `${base}${kind}`, prompt: kind === 'most' ? T('Quel sport est le plus populaire?', 'Which sport is the most popular?') : T('Quel sport est le moins populaire?', 'Which sport is the least popular?'), stimulus: { svg: chart }, options: [best, ...data.filter((x) => x !== best).slice(0, 3)].map((x) => ({ text: x.label })), answer: 0, cols: 2 };
  }
  if (k === 2) { // pictogram with a scale
    const per = L === 2 ? R.pick([2, 5]) : R.pick([5, 10]), cnt3 = L === 2 ? 4 : 5, sps = sp.slice(0, cnt3);
    const syms = R.sample([1, 2, 3, 4, 5, 6, 7, 8], cnt3), data = sps.map((s, i) => ({ label: s[0], value: syms[i] * per })), pic = S.pictogram(data, per, R.pick(['⭐', '👤', '🧒']));
    const [a, b] = R.sample(data, 2), [hi, lo] = a.value > b.value ? [a, b] : [b, a], kind = R.pick(L === 2 ? ['one', 'diff', 'tot'] : ['diff', 'tot', 'one', 'two']);
    const base = `pg${data.map((x) => x.label + x.value).join()}${per}`;
    if (kind === 'one') return kp(`${base}o${a.label}`, T(`Combien d’élèves choisissent ${a.label}?`, `How many students choose ${a.label}?`), { svg: pic }, a.value);
    if (kind === 'diff') return kp(`${base}d${hi.label}${lo.label}`, T(`Combien d’élèves de plus choisissent ${hi.label} que ${lo.label}?`, `How many more students choose ${hi.label} than ${lo.label}?`), { svg: pic }, hi.value - lo.value);
    if (kind === 'two') return kp(`${base}w${a.label}${b.label}`, T(`Combien d’élèves choisissent ${a.label} ou ${b.label}?`, `How many students choose ${a.label} or ${b.label}?`), { svg: pic }, a.value + b.value);
    return kp(`${base}t`, T('Combien d’élèves ont répondu en tout?', 'How many students answered in all?'), { svg: pic }, sumArr(data.map((x) => x.value)));
  }
  if (k === 3 || (k === 4 && L === 3)) { // chance with a bag of marbles
    const cs = R.sample(BAGC, 3), cn = R.sample([1, 2, 3, 4, 5, 6, 7, 8], 3), tot = sumArr(cn);
    const bag = cs.map((c, i) => c[2].repeat(cn[i])).join(' ');
    if (L === 2) {
      const most = R.chance(0.5), t = most ? Math.max(...cn) : Math.min(...cn), idx = cn.indexOf(t);
      return { type: 'choice', key: `bag${cn.join()}${cs.map((c) => c[0]).join('')}${most}`, prompt: most ? T('Je pige une bille sans regarder. Quelle couleur ai-je le plus de chances de piger?', 'I pick a marble without looking. Which colour am I most likely to pick?') : T('Je pige une bille sans regarder. Quelle couleur ai-je le moins de chances de piger?', 'I pick a marble without looking. Which colour am I least likely to pick?'), stimulus: tx(bag), options: [idx, ...[0, 1, 2].filter((i) => i !== idx)].map((i) => ({ emoji: cs[i][2], text: T(`les ${cs[i][0]}`, cs[i][1]) })), answer: 0, cols: 3 };
    }
    const i = R.int(0, 2), fam = R.int(0, 1);
    if (fam === 0) {
      const wrongs = [`${cn[i]} sur ${tot + 1}`, `${tot - cn[i]} sur ${tot}`, `${cn[i]} sur ${tot - 1}`, `${cn[i] + 1} sur ${tot}`].filter((x) => x !== `${cn[i]} sur ${tot}`);
      return { type: 'choice', key: `pb${cn.join()}${i}`, prompt: T(`Je pige une bille sans regarder. Quelle est la chance de piger une bille ${cs[i][0].replace(/s$/, '')}?`, `I pick a marble without looking. What is the chance of picking a ${cs[i][1]} marble?`), stimulus: tx(bag), options: [`${cn[i]} sur ${tot}`, ...R.sample([...new Set(wrongs)], 3)].map((t) => ({ text: T(t, t.replace(' sur ', ' out of ')) })), answer: 0, cols: 2 };
    }
    return kp(`pt${cn.join()}${i}`, T(`Combien de billes y a-t-il dans le sac en tout?`, 'How many marbles are in the bag in all?'), tx(bag), tot);
  }
  if (k === 4) { // L2 certain/possible/impossible with a bag
    const c = R.sample(BAGC, 2), kind = R.int(0, 2), nn = R.int(3, 6);
    const bag = kind === 0 ? c[0][2].repeat(nn) : c[0][2].repeat(nn) + ' ' + c[1][2].repeat(R.int(1, 4));
    const ask = kind === 2 ? c[1] : c[0];
    const ans = kind === 0 ? 0 : kind === 1 ? 1 : 2;
    return { type: 'choice', key: `ci${bag}${ask[0]}`, prompt: T(`Je pige une bille sans regarder. Piger une bille ${ask[0]} est…`, `I pick a marble without looking. Picking a ${ask[1]} marble is…`), stimulus: tx(bag), options: [{ text: T('certain', 'certain') }, { text: T('possible', 'possible') }, { text: T('impossible', 'impossible') }], answer: ans, fixedOrder: true, cols: 3 };
  }
  if (k === 5) {
    const a = R.int(2, 5), b = R.int(2, 4), p = R.pick(PEOPLE), x = R.pick([['chandails', 'shirts', 'pantalons', 'pants'], ['tuques', 'hats', 'foulards', 'scarves'], ['saveurs de crème glacée', 'ice-cream flavours', 'cornets', 'cones']]);
    return kp(`cb${a}${b}${x[0]}`, T(`${p.n} a ${a} ${x[0]} et ${b} ${x[2]}. Combien de combinaisons différentes peut-${il(p)} faire en choisissant un seul de chaque?`, `${p.n} has ${a} ${x[1]} and ${b} ${x[3]}. How many different combinations can ${he(p)} make by choosing one of each?`), null, a * b);
  }
  const DQ = [['un nombre pair', 'an even number', 3], ['un nombre impair', 'an odd number', 3], ['un nombre plus grand que 4', 'a number greater than 4', 2], ['un nombre plus petit que 3', 'a number smaller than 3', 2], ['un 6', 'a 6', 1], ['un nombre plus grand que 1', 'a number greater than 1', 5]];
  const [dfr, den, dn2] = R.pick(DQ), others = R.sample([1, 2, 3, 4, 5].filter((x) => x !== dn2), 3);
  return { type: 'choice', key: `dice${dfr}`, prompt: T(`Je lance un dé à 6 faces. Quelle est la chance d’obtenir ${dfr}?`, `I roll a 6-sided die. What is the chance of getting ${den}?`), options: [dn2, ...others].map((x) => ({ text: T(`${x} sur 6`, `${x} out of 6`) })), answer: 0, cols: 2 };
};

// ---------- m13 ----------
const BOXES = [
  ['sac', 'sacs', 'bag', 'bags', 'bonbons', 'candies', '🍬'], ['boîte', 'boîtes', 'box', 'boxes', 'crayons', 'crayons', '🖍️'], ['panier', 'paniers', 'basket', 'baskets', 'pommes', 'apples', '🍎'],
  ['assiette', 'assiettes', 'plate', 'plates', 'biscuits', 'cookies', '🍪'], ['étagère', 'étagères', 'shelf', 'shelves', 'livres', 'books', '📘'], ['paquet', 'paquets', 'pack', 'packs', 'jus', 'juice boxes', '🧃'],
];
const arrPrompt = T('Combien en tout?', 'How many altogether?');
NEW.m13 = (L, R) => {
  const F = L === 2 ? [2, 3, 4, 5, 10] : [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const a = R.pick(F), b = L === 2 ? R.int(2, 10) : R.int(3, 10), e = R.pick(OBJ), bx = R.pick(BOXES);
  const k = R.int(0, L === 2 ? 6 : 9);
  if (k === 0) return kp(`x${a}x${b}`, T('Calcule.', 'Work it out.'), tx(`${a} × ${b} = ?`), a * b);
  if (k === 1) return R.chance(0.5) ? kp(`mf${a}x?=${a * b}`, T('Quel nombre manque?', 'Which number is missing?'), tx(`${a} × ? = ${a * b}`), b) : kp(`mg?x${b}=${a * b}`, T('Quel nombre manque?', 'Which number is missing?'), tx(`? × ${b} = ${a * b}`), a);
  if (k === 2) return kp(`d${a * b}/${a}`, T('Calcule.', 'Work it out.'), tx(`${a * b} ÷ ${a} = ?`), b);
  if (k === 3) { const rows = R.int(2, L === 2 ? 5 : 6), cols = R.int(L === 2 ? 3 : 4, L === 2 ? 10 : 8); return kp(`arr${rows}x${cols}${e}`, arrPrompt, { svg: S.emojiGrid(rows, cols, e) }, rows * cols, SAY('Combien en tout?', 'How many altogether?')); }
  if (k === 4) { const fr = `Il y a ${b} ${bx[1]}. Chaque ${bx[0]} contient ${a} ${bx[4]}. Combien de ${bx[4]} y a-t-il en tout?`, en = `There are ${b} ${bx[3]}. Each ${bx[2]} holds ${a} ${bx[5]}. How many ${bx[5]} are there in all?`; return kp(`wt${a}x${b}${bx[0]}`, T(fr, en), { emoji: bx[6] }, a * b, SAY(fr, en)); }
  if (k === 5) { const fr = `On partage ${a * b} ${bx[4]} également entre ${a} ${bx[1]}. Combien de ${bx[4]} y a-t-il dans chaque ${bx[0]}?`, en = `We share ${a * b} ${bx[5]} equally among ${a} ${bx[3]}. How many ${bx[5]} are in each ${bx[2]}?`; return kp(`ws${a * b}/${a}${bx[0]}`, T(fr, en), { emoji: bx[6] }, b, SAY(fr, en)); }
  if (k === 6 && L === 2) return numQ(R, `xc${a}x${b}`, T('Calcule.', 'Work it out.'), tx(`${a} × ${b} = ?`), a * b, [a + b, a * b + a, a * b - a, a * b + b, a * b - b, a * (b + 1)], { fmt: String });
  // ---- Difficile ----
  if (k === 6) { // division with remainder
    const kk = R.pick([3, 4, 5, 6, 7, 8, 9]), q = R.int(3, 9), r = R.int(1, kk - 1), n = kk * q + r, ask = R.int(0, 2);
    const fr0 = `Il y a ${n} ${bx[4]}. On les met dans des ${bx[1]} de ${kk}.`, en0 = `There are ${n} ${bx[5]}. We put them in ${bx[3]} of ${kk}.`;
    if (ask === 0) return kp(`rm${n}/${kk}a${bx[0]}`, T(`${fr0} Combien de ${bx[1]} sont complets?`, `${en0} How many ${bx[3]} are full?`), { emoji: bx[6] }, q);
    if (ask === 1) return kp(`rm${n}/${kk}b${bx[0]}`, T(`${fr0} Combien de ${bx[4]} restent hors des ${bx[1]}?`, `${en0} How many ${bx[5]} are left over?`), { emoji: bx[6] }, r);
    return kp(`rm${n}/${kk}c${bx[0]}`, T(`${fr0} Combien de ${bx[1]} faut-il pour tout ranger?`, `${en0} How many ${bx[3]} are needed to hold everything?`), { emoji: bx[6] }, q + 1);
  }
  if (k === 7) { const extra = R.int(2, 9); const fr = `${b} ${bx[1]} contiennent chacun ${a} ${bx[4]}. On ajoute encore ${extra} ${bx[4]}. Combien de ${bx[4]} y a-t-il en tout?`, en = `${b} ${bx[3]} each hold ${a} ${bx[5]}. We add ${extra} more ${bx[5]}. How many ${bx[5]} are there in all?`; return kp(`w2${a}x${b}+${extra}${bx[0]}`, T(fr, en), { emoji: bx[6] }, a * b + extra, SAY(fr, en)); }
  if (k === 8) {
    const n = a * b, opts = [[a, b]];
    const dv = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12].filter((d) => n % d === 0 && n / d <= 12 && d !== a && d !== b && d !== n / a);
    const ex = R.sample(dv, Math.min(1, dv.length));
    if (!ex.length) return NEW.m13(L, R);
    const good = [ex[0], n / ex[0]];
    let bad = []; for (let g = 0; g < 60 && bad.length < 2; g++) { const x = R.int(2, 9), y = R.int(3, 9); if (x * y !== n && !bad.some((p) => p[0] === x && p[1] === y)) bad.push([x, y]); }
    return { type: 'choice', key: `eq${n}${good}${bad.join('|')}`, prompt: T(`Quelle multiplication est égale à ${n}?`, `Which multiplication equals ${n}?`), options: [good, ...bad].map(([x, y]) => ({ text: `${x} × ${y}` })), answer: 0, cols: 3 };
  }
  const per = R.int(6, 12), nb = R.pick([6, 7, 8, 9]);
  const fr = `Un hockeyeur ramasse ${nb} rondelles par minute. Combien en ramasse-t-il en ${per > 10 ? 10 : per} minutes?`, en = `A hockey player collects ${nb} pucks per minute. How many does he collect in ${per > 10 ? 10 : per} minutes?`;
  return kp(`wr${nb}x${per > 10 ? 10 : per}`, T(fr, en), { emoji: '🏒' }, nb * (per > 10 ? 10 : per), SAY(fr, en));
};

// ---------- m14 ----------
NEW.m14 = (L, R) => {
  const pr = (fr, en) => T(fr, en);
  if (L === 2) {
    const k = R.int(0, 9);
    if (k === 0) { const n = R.int(21, 99); return kp(`dbl${n}`, pr(`Quel est le double de ${n}?`, `What is double ${n}?`), null, 2 * n); }
    if (k === 1) { const n = R.int(11, 99) * 2; return kp(`half${n}`, pr(`Quelle est la moitié de ${n}?`, `What is half of ${n}?`), null, n / 2); }
    if (k === 2) { const n = R.int(21, 69), up = R.chance(0.5); return kp(`nd${n}${up}`, pr('Calcule. Astuce : pense au double!', 'Work it out. Tip: think of the double!'), tx(`${n} + ${n + (up ? 1 : 2)} = ?`), 2 * n + (up ? 1 : 2)); }
    if (k === 3) { const a = R.pick([9, 19, 29, 39, 49, 59, 69, 79, 99]), b = R.int(14, 76); return kp(`cp${a}+${b}`, pr('Calcule. Astuce : ajoute la dizaine, puis recule de 1.', 'Work it out. Tip: add the ten, then go back 1.'), tx(`${a} + ${b} = ?`), a + b); }
    if (k === 4) { const n = R.int(2, 99); return kp(`x10_${n}`, pr(`Calcule ${n} × 10.`, `Work out ${n} × 10.`), null, n * 10); }
    if (k === 5) { const n = R.int(2, 99); return kp(`d10_${n}`, pr(`Calcule ${n * 10} ÷ 10.`, `Work out ${n * 10} ÷ 10.`), null, n); }
    if (k === 6) { const a = R.int(1, 19) * 50; return kp(`c1000_${a}`, pr('Quel nombre manque pour faire 1 000?', 'Which number makes 1000?'), tx(`${a} + ? = 1 000`), 1000 - a); }
    if (k === 7) { const hund = R.chance(0.5), n = hund ? R.int(101, 999) : R.int(11, 99); if (n % (hund ? 100 : 10) === (hund ? 50 : 5)) return NEW.m14(L, R); const u = hund ? 100 : 10; return kp(`rd${n}${u}`, pr(`Arrondis ${n} à la ${hund ? 'centaine' : 'dizaine'} la plus proche.`, `Round ${n} to the nearest ${hund ? 'hundred' : 'ten'}.`), null, Math.round(n / u) * u); }
    if (k === 8) { const s = R.pick([25, 50, 250]), a = R.int(0, 8) * s; return kp(`sk${s}_${a}`, pr(`Compte de ${s} en ${s}. Quel nombre manque?`, `Count by ${s}s. Which number is missing?`), tx(`${a}, ${a + s}, ${a + 2 * s}, ?`), a + 3 * s); }
    const a = R.int(11, 49) * 10, b = R.int(11, 49) * 10;
    return kp(`ts${a}+${b}`, pr('Calcule de tête.', 'Work it out in your head.'), tx(`${a} + ${b} = ?`), a + b);
  }
  const k = R.int(0, 11);
  if (k === 0) { const a = R.pick([198, 298, 398, 498, 599, 799, 999, 797, 695]), b = R.int(120, 480), r = Math.round(a / 100) * 100; return kp(`cm${a}+${b}`, pr(`Calcule. Astuce : ${a} est proche de ${r}.`, `Work it out. Tip: ${a} is close to ${r}.`), tx(`${a} + ${b} = ?`), a + b); }
  if (k === 1) { const a = R.int(2, 9) * 100 + R.int(1, 9) * 10 + R.int(1, 9), b = R.pick([98, 99, 198, 199, 299, 297, 49, 51]); return kp(`cs${a}-${b}`, pr('Calcule de tête. Astuce : arrondis, puis ajuste.', 'Work it out in your head. Tip: round, then adjust.'), tx(`${a} − ${b} = ?`), a - b); }
  if (k === 2) { const n = R.int(11, 99); return kp(`x100_${n}`, pr(`Calcule ${n} × 100.`, `Work out ${n} × 100.`), null, n * 100); }
  if (k === 3) { const n = R.int(11, 99); return kp(`d100_${n}`, pr(`Calcule ${n * 100} ÷ 100.`, `Work out ${n * 100} ÷ 100.`), null, n); }
  if (k === 4) { const n = R.int(101, 499); return kp(`dbl${n}`, pr(`Quel est le double de ${n}?`, `What is double ${n}?`), null, 2 * n); }
  if (k === 5) { const n = R.int(51, 499) * 2; return kp(`half${n}`, pr(`Quelle est la moitié de ${n}?`, `What is half of ${n}?`), null, n / 2); }
  if (k === 6) { const a = R.pick([25, 50, 20, 30, 40, 60]), b = R.pick(a === 25 ? [2, 4, 6, 8] : [2, 3, 4, 5, 6, 8]); return kp(`mm${a}x${b}`, pr('Calcule de tête.', 'Work it out in your head.'), tx(`${a} × ${b} = ?`), a * b); }
  if (k === 7) { const a = R.int(1, 99) * 10, c = 1000 - a; return kp(`c1k${a}`, pr('Quel nombre manque pour faire 1 000?', 'Which number makes 1000?'), tx(`${a} + ? = 1 000`), c); }
  if (k === 8) { const n = R.int(1001, 9999), u = R.pick([10, 100, 1000]); if (n % u === u / 2) return NEW.m14(L, R); const r = Math.round(n / u) * u; if (r > 9999) return NEW.m14(L, R); return kp(`rd${n}${u}`, pr(`Arrondis ${NB2(n)} à ${u === 10 ? 'la dizaine' : u === 100 ? 'la centaine' : 'l’unité de mille'} la plus proche.`, `Round ${NBe(n)} to the nearest ${u === 10 ? 'ten' : u === 100 ? 'hundred' : 'thousand'}.`), null, r); }
  if (k === 9) {
    const a = R.int(120, 880), b = R.int(120, 880), est = Math.round(a / 100) * 100 + Math.round(b / 100) * 100;
    if (Math.abs(a + b - est) < 40) return NEW.m14(L, R);
    return numQ(R, `es${a}+${b}`, pr(`${a} + ${b} est environ égal à…`, `${a} + ${b} is about…`), null, est, [est + 100, est - 100, est + 200, est - 200, est + 300], { fmt: String, valid: (v) => v % 100 === 0 && v > 0 });
  }
  if (k === 10) { const a = R.int(11, 49), b = R.pick([20, 30, 40, 50]); return kp(`mt${a}x${b}`, pr('Calcule de tête.', 'Work it out in your head.'), tx(`${a} × ${b / 10} × 10 = ?`), a * b); }
  const n = R.int(11, 99) * 20, d = R.pick([2, 4, 5, 10]); return kp(`dv${n}/${d}`, pr('Calcule de tête.', 'Work it out in your head.'), tx(`${n} ÷ ${d} = ?`), n / d);
};

// ---------- m15 ----------
const CASH = [5, 10, 25, 100, 200];
NEW.m15 = (L, R) => {
  const k = R.int(0, 5);
  const billAmt = (nB) => {
    const items = []; for (let i = 0; i < nB; i++) items.push(R.pick([500, 1000]));
    for (let i = 0, n = R.int(2, 4); i < n; i++) items.push(R.pick(CASH));
    const srt = items.slice().sort((x, y) => y - x), tot = sumArr(items);
    return numQ(R, `bm${srt.join('-')}`, T('Quel montant est montré?', 'Which amount is shown?'), { svg: S.money(srt) }, tot, [tot + 5, tot - 5, tot + 25, tot - 25, tot + 100, tot - 100, tot + 10, tot - 10], { fmt: (v) => moneyT(v), cols: 3 });
  };
  const price = () => R.int(21, 199) * 5;
  const itemsB = [['une casquette', 'a cap', '🧢'], ['un livre', 'a book', '📘'], ['un jouet', 'a toy', '🧸'], ['un chandail de hockey', 'a hockey jersey', '🏒'], ['un sac à dos', 'a backpack', '🎒'], ['des gants', 'gloves', '🧤']];
  if (L === 2) {
    if (k === 0) return billAmt(R.int(1, 2));
    if (k === 1) { const p = R.pick(PEOPLE), pay = R.pick([500, 1000, 2000]), cost = R.int(Math.floor(100 / 5), (pay - 100) / 5) * 5, it = R.pick(itemsB); const fr = `${p.n} achète ${it[0]} à ${moneyT(cost).fr}. ${Il(p)} paie avec ${moneyT(pay).fr}. Combien de monnaie reçoit-${il(p)}?`, en = `${p.n} buys ${it[1]} for ${moneyT(cost).en}. ${He(p)} pays with ${moneyT(pay).en}. How much change does ${he(p)} get?`; const ans = pay - cost; return numQ(R, `ch${cost}_${pay}${p.n}`, T(fr, en), { emoji: it[2] }, ans, [ans + 100, ans - 100, ans + 5, ans - 5, ans + 50, ans - 50, cost], { fmt: (v) => moneyT(v), cols: 3, say: SAY(fr, en), valid: (v) => v > 0 && v < pay && v % 5 === 0 }); }
    if (k === 2) { const x = price(), y = price(), p = R.pick(PEOPLE), [i1, i2] = R.sample(itemsB, 2), ans = x + y; const fr = `${p.n} achète ${i1[0]} à ${moneyT(x).fr} et ${i2[0]} à ${moneyT(y).fr}. Combien dépense-t-${il(p)} en tout?`, en = `${p.n} buys ${i1[1]} for ${moneyT(x).en} and ${i2[1]} for ${moneyT(y).en}. How much does ${he(p)} spend in all?`; return numQ(R, `tt${x}+${y}${p.n}`, T(fr, en), { text: `${i1[2]}  ${i2[2]}` }, ans, [ans + 100, ans - 100, ans + 10, ans - 10, ans + 50, ans - 50, ans + 5], { fmt: (v) => moneyT(v), cols: 3, say: SAY(fr, en), valid: (v) => v > 0 && v % 5 === 0 }); }
    if (k === 3) { const base = R.int(2, 9) * 100, set = new Set([base + 50, base + 5, base + 15, base + 25, base + 75, base + 45]), vals = R.sample([...set], 3), big = R.chance(0.5), t = big ? Math.max(...vals) : Math.min(...vals); return { type: 'choice', key: `cm${vals.slice().sort((a, b) => a - b).join(',')}${big}`, prompt: big ? T('Quel est le prix le plus élevé?', 'Which is the highest price?') : T('Quel est le prix le moins élevé?', 'Which is the lowest price?'), options: vals.map((v) => ({ text: moneyT(v) })), answer: vals.indexOf(t), fixedOrder: true, cols: 3 }; }
    if (k === 4) { const n = R.int(2, 6); return kp(`q${n}`, T(`Combien de pièces de 25 ¢ faut-il pour faire ${n} $?`, `How many 25¢ coins make $${n}?`), null, n * 4); }
    const u = R.pick([75, 125, 150, 250, 175, 50]), n = R.int(2, 4), it = R.pick([['jus', 'juice boxes', '🧃'], ['muffins', 'muffins', '🧁'], ['pommes', 'apples', '🍎'], ['crayons', 'pencils', '✏️']]), ans = u * n;
    const fr = `Un ${it[0].replace(/s$/, '')} coûte ${moneyT(u).fr}. Combien coûtent ${n} ${it[0]}?`, en = `One ${it[1].replace(/s$/, '')} costs ${moneyT(u).en}. How much do ${n} ${it[1]} cost?`;
    return numQ(R, `un${u}x${n}${it[0]}`, T(fr, en), { emoji: it[2] }, ans, [ans + 25, ans - 25, ans + 100, ans - 50, ans + 50, u + n * 100, ans + 5], { fmt: (v) => moneyT(v), cols: 3, say: SAY(fr, en), valid: (v) => v > 0 && v % 5 === 0 });
  }
  if (k === 0) { const p = R.pick(PEOPLE), pay = R.pick([2000, 5000]), n = R.int(2, 3), prices = Array.from({ length: n }, () => R.int(60, Math.floor((pay - 200) / n / 5)) * 5), tot = sumArr(prices), its = R.sample(itemsB, n); const fr = `${p.n} achète ${its.map((i, j) => `${i[0]} à ${moneyT(prices[j]).fr}`).join(', ').replace(/, ([^,]*)$/, ' et $1')}. ${Il(p)} paie avec ${moneyT(pay).fr}. Combien de monnaie reçoit-${il(p)}?`, en = `${p.n} buys ${its.map((i, j) => `${i[1]} for ${moneyT(prices[j]).en}`).join(', ').replace(/, ([^,]*)$/, ' and $1')}. ${He(p)} pays with ${moneyT(pay).en}. How much change does ${he(p)} get?`; const ans = pay - tot; if (ans <= 0) return NEW.m15(L, R); return numQ(R, `ch3${prices.join('-')}_${pay}${p.n}`, T(fr, en), { text: its.map((i) => i[2]).join('  ') }, ans, [ans + 100, ans - 100, ans + 10, ans - 10, ans + 50, ans - 50, ans + 5], { fmt: (v) => moneyT(v), cols: 3, say: SAY(fr, en), valid: (v) => v > 0 && v < pay && v % 5 === 0 }); }
  if (k === 1) { const p = R.pick(PEOPLE), step = R.pick([250, 500, 125, 200, 150]), n = R.int(4, 12), target = step * n, it = R.pick(itemsB); const fr = `${p.n} veut acheter ${it[0]} à ${moneyT(target).fr}. ${Il(p)} économise ${moneyT(step).fr} chaque semaine. Combien de semaines doit-${il(p)} économiser?`, en = `${p.n} wants to buy ${it[1]} for ${moneyT(target).en}. ${He(p)} saves ${moneyT(step).en} each week. How many weeks must ${he(p)} save?`; if (target % step) return NEW.m15(L, R); return kp(`sv${step}x${n}${p.n}`, T(fr, en), { emoji: it[2] }, n, SAY(fr, en)); }
  if (k === 2) { const p = R.pick(PEOPLE), it = R.pick(itemsB), orig = price() + 500, rab = R.pick([100, 150, 200, 250, 300]), ans = orig - rab; const fr = `${it[0].replace(/^./, (c) => c.toUpperCase())} coûte ${moneyT(orig).fr}. Il y a un rabais de ${moneyT(rab).fr}. Quel est le nouveau prix?`, en = `${it[1].replace(/^./, (c) => c.toUpperCase())} costs ${moneyT(orig).en}. There is a discount of ${moneyT(rab).en}. What is the new price?`; return numQ(R, `rb${orig}-${rab}`, T(fr, en), { emoji: it[2] }, ans, [ans + 2 * rab, ans + 100, ans - 100, ans + 50, ans - 50, orig + rab, ans + 5], { fmt: (v) => moneyT(v), cols: 3, say: SAY(fr, en), valid: (v) => v > 0 && v % 5 === 0 }); }
  if (k === 3) { const n = R.pick([2, 4, 5]), u = R.int(11, 60) * 5, tot = n * u, it = R.pick([['cahiers', 'notebooks', '📓'], ['jus', 'juice boxes', '🧃'], ['balles', 'balls', '⚾'], ['sandwichs', 'sandwiches', '🥪']]); const fr = `${n} ${it[0]} coûtent ${moneyT(tot).fr} en tout. Combien coûte un seul?`, en = `${n} ${it[1]} cost ${moneyT(tot).en} in all. How much does one cost?`; return numQ(R, `pu${tot}/${n}${it[0]}`, T(fr, en), { emoji: it[2] }, u, [u + 5, u - 5, u + 25, u - 25, u + 10, u - 10, tot - u], { fmt: (v) => moneyT(v), cols: 3, say: SAY(fr, en), valid: (v) => v > 0 && v % 5 === 0 }); }
  if (k === 4) return billAmt(2);
  const p = R.pick(PEOPLE), prices = [price(), price(), price()], tot = sumArr(prices), its = R.sample(itemsB, 3);
  const fr = `${p.n} achète ${its.map((i, j) => `${i[0]} à ${moneyT(prices[j]).fr}`).join(', ').replace(/, ([^,]*)$/, ' et $1')}. Combien dépense-t-${il(p)} en tout?`, en = `${p.n} buys ${its.map((i, j) => `${i[1]} for ${moneyT(prices[j]).en}`).join(', ').replace(/, ([^,]*)$/, ' and $1')}. How much does ${he(p)} spend in all?`;
  return numQ(R, `t3${prices.join('+')}${p.n}`, T(fr, en), { text: its.map((i) => i[2]).join('  ') }, tot, [tot + 100, tot - 100, tot + 10, tot - 10, tot + 50, tot - 50, tot + 5], { fmt: (v) => moneyT(v), cols: 3, say: SAY(fr, en), valid: (v) => v > 0 && v % 5 === 0 });
};

// ---------- m16 ----------
const crd = (x, y) => `(${x}, ${y})`;
NEW.m16 = (L, R) => {
  const k = R.int(0, L === 2 ? 5 : 6);
  const pts3 = (n) => { const set = new Set(), out = []; while (out.length < 3) { const x = R.int(0, n), y = R.int(0, n); if (!set.has(`${x},${y}`) && x + y > 0) { set.add(`${x},${y}`); out.push({ x, y, label: 'ABC'[out.length] }); } } return out; };
  if (k === 0 || (L === 3 && k === 6)) {
    const n = L === 2 ? 5 : 7, ps = pts3(n), t = R.pick(ps);
    const wr = [crd(t.y, t.x), crd(t.x, Math.min(n, t.y + 1)), crd(Math.max(0, t.x - 1), t.y), crd(t.x + 1, t.y)].filter((c) => c !== crd(t.x, t.y) && !(t.x === t.y));
    const wrong = [...new Set([...wr, crd(t.x, Math.max(0, t.y - 1)), crd(Math.min(n, t.x + 1), Math.min(n, t.y + 1))])].filter((c) => c !== crd(t.x, t.y));
    return { type: 'choice', key: `cn${n}${ps.map((p) => p.x + '.' + p.y).join('')}${t.label}`, prompt: T(`Quelles sont les coordonnées du point ${t.label}? (d’abord vers la droite, puis vers le haut)`, `What are the coordinates of point ${t.label}? (first across, then up)`), stimulus: { svg: S.coordPlane(n, ps) }, options: [crd(t.x, t.y), ...R.sample(wrong, 3)].map((c) => ({ text: c })), answer: 0, cols: 2 };
  }
  if (k === 1) {
    const n = L === 2 ? 5 : 7, ps = pts3(n), t = R.pick(ps);
    return { type: 'choice', key: `wp${n}${ps.map((p) => p.x + '.' + p.y).join('')}${t.label}`, prompt: T(`Quel point est en ${crd(t.x, t.y)}?`, `Which point is at ${crd(t.x, t.y)}?`), stimulus: { svg: S.coordPlane(n, ps) }, options: ps.map((p) => ({ text: p.label })), answer: ps.indexOf(t), fixedOrder: true, cols: 3 };
  }
  if (k === 2 && L === 2) {
    const SY = [['carré', 'square', 4], ['rectangle', 'rectangle', 2], ['triangle équilatéral', 'equilateral triangle', 3], ['losange', 'rhombus', 2], ['hexagone régulier', 'regular hexagon', 6]];
    const [fr, en, ans] = R.pick(SY); return kp(`axes${fr}`, T(`Combien d’axes de symétrie a un ${fr}?`, `How many lines of symmetry does a ${en} have?`), null, ans);
  }
  if (k === 3 || (k === 2 && L === 3)) {
    const x = R.int(0, 5), y = R.int(0, 5), dx = R.int(1, 4), dy = R.int(1, 4), p = R.pick(['A', 'B', 'C']);
    const dirs = L === 2 ? [[1, 1]] : [[1, 1], [-1, 1], [1, -1]];
    const [sx, sy] = R.pick(dirs); let nx = x + sx * dx, ny = y + sy * dy;
    if (nx < 0 || ny < 0) { nx = x + dx; ny = y + dy; }
    const hd = nx >= x ? ['vers la droite', 'right'] : ['vers la gauche', 'left'], vd = ny >= y ? ['vers le haut', 'up'] : ['vers le bas', 'down'];
    const d1 = Math.abs(nx - x), d2 = Math.abs(ny - y);
    const wrong = [crd(nx, ny + 1), crd(ny, nx), crd(nx + 1, ny), crd(x + d2, y + d1), crd(x + d1, y)].filter((c) => c !== crd(nx, ny));
    return { type: 'choice', key: `mv${x}${y}${nx}${ny}${p}`, prompt: T(`Le point ${p} est en ${crd(x, y)}. On le déplace de ${d1} case${d1 > 1 ? 's' : ''} ${hd[0]} et de ${d2} case${d2 > 1 ? 's' : ''} ${vd[0]}. Où arrive-t-il?`, `Point ${p} is at ${crd(x, y)}. We move it ${d1} square${d1 > 1 ? 's' : ''} ${hd[1]} and ${d2} square${d2 > 1 ? 's' : ''} ${vd[1]}. Where does it end up?`), options: [crd(nx, ny), ...R.sample([...new Set(wrong)], 3)].map((c) => ({ text: c })), answer: 0, cols: 2 };
  }
  if (k === 4 && L === 2) {
    const a = R.int(2, 5), s = R.int(2, 4), n = R.int(7, 10);
    return kp(`fg${a}_${s}_${n}`, T(`Figure 1 : ${a} carrés, figure 2 : ${a + s} carrés, figure 3 : ${a + 2 * s} carrés. La suite continue. Combien de carrés y a-t-il à la figure ${n}?`, `Figure 1: ${a} squares, figure 2: ${a + s} squares, figure 3: ${a + 2 * s} squares. The pattern continues. How many squares are in figure ${n}?`), { svg: S.areaGrid(['#'.repeat(a)], S.COLORS.green) }, a + (n - 1) * s);
  }
  if (k === 4) {
    const x1 = R.int(1, 3), y1 = R.int(1, 3), w = R.int(2, 6), h = R.int(2, 5);
    return kp(`pp${x1}${y1}${w}${h}`, T(`Un rectangle a pour sommets A${crd(x1, y1)}, B${crd(x1 + w, y1)}, C${crd(x1 + w, y1 + h)} et D${crd(x1, y1 + h)}. Quel est son périmètre?`, `A rectangle has vertices A${crd(x1, y1)}, B${crd(x1 + w, y1)}, C${crd(x1 + w, y1 + h)} and D${crd(x1, y1 + h)}. What is its perimeter?`), null, 2 * (w + h));
  }
  if (k === 5 && L === 2) {
    const y = R.int(1, 5), x1 = R.int(0, 3), x2 = x1 + R.int(2, 5), ps = [{ x: x1, y, label: 'A' }, { x: x2, y, label: 'B' }];
    return kp(`dis${x1}${x2}${y}`, T('Combien de cases sépare le point A du point B?', 'How many squares are there from point A to point B?'), { svg: S.coordPlane(Math.max(5, x2), ps) }, x2 - x1);
  }
  if (k === 5) { // reflection across a vertical line
    const line = R.int(3, 6), x = R.int(1, line - 1), y = R.int(1, 7), ans = 2 * line - x;
    return numQ(R, `rf${x}${y}${line}`, T(`Le point A est en ${crd(x, y)}. On fait un miroir par rapport à la ligne verticale x = ${line}. Quelles sont les nouvelles coordonnées?`, `Point A is at ${crd(x, y)}. We reflect it in the vertical line x = ${line}. What are its new coordinates?`), null, ans, [ans - 1, ans + 1, line, x + 1, y], { fmt: (v) => crd(v, y), cols: 2, valid: (v) => v >= 0 && v <= 12 && v !== x });
  }
  const x1 = R.int(0, 3), y1 = R.int(0, 3), w = R.int(2, 5), h = R.int(2, 5);
  const A = crd(x1, y1), B = crd(x1 + w, y1), C = crd(x1 + w, y1 + h), D = crd(x1, y1 + h);
  const wrong = [crd(x1 + w, y1 + h + 1), crd(x1 + 1, y1 + h), crd(x1 + h, y1 + w), crd(x1 + w - 1, y1 + h)].filter((c) => c !== D);
  return { type: 'choice', key: `rc${x1}${y1}${w}${h}`, prompt: T(`ABCD est un rectangle. A est en ${A}, B est en ${B} et C est en ${C}. Quelles sont les coordonnées de D?`, `ABCD is a rectangle. A is at ${A}, B is at ${B} and C is at ${C}. What are the coordinates of D?`), options: [D, ...R.sample([...new Set(wrong)], 3)].map((c) => ({ text: c })), answer: 0, cols: 2 };
};

// ---------- m17 – cahier A (stories, teams / remainders, growing patterns) ----------
function teamsQ(R, L) {
  const [p, q] = R.sample(PEOPLE, 2), v = sv(p, q);
  const k = L === 2 ? R.pick([3, 4, 5]) : R.pick([6, 7, 8, 9]), n = R.int(L === 2 ? 20 : 30, L === 2 ? 59 : 99);
  if (n % k === 0) return teamsQ(R, L);
  Object.assign(v, { n, k });
  const ci = R.int(0, 2);
  const CTX = [
    [['À la récré, {n} enfants jouent au ballon-chasseur. Ils forment des équipes de {k}.', 'At recess, {n} children play dodgeball. They make teams of {k}.'], 'teams'],
    [['Pour la sortie à la cabane à sucre, {n} élèves montent dans des minibus de {k} places.', 'For the sugar shack trip, {n} students get into minibuses with {k} seats each.'], 'bus'],
    [['{p} range {n} cartes de hockey dans des pochettes de {k} cartes.', '{p} puts {n} hockey cards into sleeves of {k} cards each.'], 'cards'],
  ][ci];
  const nm = { teams: [['équipes complètes', 'full teams'], ['enfants sans équipe', 'children without a team'], ['équipes', 'teams']], bus: [['minibus complets', 'full minibuses'], ['élèves dans le dernier minibus plein ou non', ''], ['minibus', 'minibuses']], cards: [['pochettes pleines', 'full sleeves'], ['cartes restantes', 'cards left over'], ['pochettes', 'sleeves']] }[CTX[1]];
  const ask = R.int(0, 2);
  if (ask === 0) return mkQ({ id: 'tm0', v: { ...v, ci }, sents: [CTX[0]], q: [`Combien de ${nm[0][0]} y a-t-il?`, `How many ${nm[0][1]} are there?`], ans: Math.floor(n / k) });
  if (ask === 1 && CTX[1] !== 'bus') return mkQ({ id: 'tm1', v: { ...v, ci }, sents: [CTX[0]], q: [`Combien y a-t-il de ${nm[1][0]}?`, `How many ${nm[1][1]} are there?`], ans: n % k });
  return mkQ({ id: 'tm2', v: { ...v, ci }, sents: [CTX[0]], q: [CTX[1] === 'teams' ? 'Combien d’équipes faut-il en tout (la dernière peut être incomplète)?' : CTX[1] === 'bus' ? 'Combien de minibus faut-il en tout?' : 'Combien de pochettes faut-il en tout?', CTX[1] === 'teams' ? 'How many teams are needed in all (the last one may be incomplete)?' : CTX[1] === 'bus' ? 'How many minibuses are needed in all?' : 'How many sleeves are needed in all?'], ans: Math.ceil(n / k) });
}
function growQ(R, L) {
  const [p, q] = R.sample(PEOPLE, 2), v = sv(p, q);
  const kind = R.int(0, L === 2 ? 1 : 3);
  if (kind <= 1) {
    const d = L === 2 ? R.pick([5, 10, 15, 20, 25]) : R.pick([12, 15, 25, 35, 40]), s0 = R.int(2, 9) * (L === 2 ? 5 : 10), n = R.int(6, 9);
    const act = R.pick([['pages', 'pages', 'lit', 'reads'], ['mètres', 'metres', 'patine', 'skates'], ['dessins', 'drawings', 'fait', 'makes']]);
    Object.assign(v, { d, s0, n, a: act[0] });
    return mkQ({ id: 'gr1', v, sents: [[`Le jour 1, {p} ${act[2]} {s0} ${act[0]}. Le jour 2, {il} en ${act[2]} {s0b}. Le jour 3, {il} en ${act[2]} {s0c}.`.replace('{s0b}', s0 + d).replace('{s0c}', s0 + 2 * d), `On day 1, {p} ${act[3]} {s0} ${act[1]}. On day 2, {he} ${act[3]} ${s0 + d}. On day 3, {he} ${act[3]} ${s0 + 2 * d}.`], ['{Il} continue ainsi.', '{He} keeps going the same way.']], q: [`Combien en ${act[2]}${act[2] === 'patine' ? '-t-' : '-'}{il} le jour {n}?`, `How many ${act[1]} does {he} ${act[3].replace(/s$/, '')} on day {n}?`], ans: s0 + (n - 1) * d });
  }
  if (kind === 2) {
    const s0 = R.int(2, 5), n = R.int(5, 7), ch = R.pick([['fourmis', 'ants'], ['bactéries', 'bacteria'], ['abonnés', 'followers']]);
    Object.assign(v, { s0, n });
    return mkQ({ id: 'gr2', v, sents: [[`Le jour 1, il y a {s0} ${ch[0]}. Chaque jour, leur nombre double.`, `On day 1 there are {s0} ${ch[1]}. Every day the number doubles.`]], q: ['Combien y en a-t-il le jour {n}?', 'How many are there on day {n}?'], ans: s0 * 2 ** (n - 1) });
  }
  const s0 = R.int(90, 200), d = R.int(6, 15), n = R.int(5, 9);
  Object.assign(v, { s0, d, n });
  return mkQ({ id: 'gr3', v, sents: [['Un livre a {s0} pages. {p} en lit {d} chaque jour.', 'A book has {s0} pages. {p} reads {d} each day.']], q: ['Combien de pages lui reste-t-il à lire après {n} jours?', 'How many pages are left after {n} days?'], ans: s0 - d * n });
}
NEW.m17 = (L, R) => {
  const r = R.int(1, 100);
  if (r <= 52) { const kinds = L === 2 ? ['cmp3', 'miss3', 'grp', 'two3', 'sub3'] : ['after', 'start', 'times', 'two4', 'budget']; return M7[R.pick(kinds)](SB(R, L)); }
  if (r <= 76) return teamsQ(R, L);
  return growQ(R, L);
};

// ---------- m18 – cahier B (place value, rounding, comparing, fractions, groups, grid) ----------
function cardsQ(R, L) {
  const nd = L === 2 ? 3 : 4, ds = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], nd), big = R.chance(0.5);
  const srt = ds.slice().sort((a, b) => (big ? b - a : a - b)), n = Number(srt.join(''));
  return kp(`cd${ds.slice().sort().join('')}${big}`, T(`Avec les cartes ${ds.join(', ')}, forme le ${big ? 'plus grand' : 'plus petit'} nombre possible.`, `With the cards ${ds.join(', ')}, make the ${big ? 'biggest' : 'smallest'} number you can.`), { text: ds.map((d) => `[${d}]`).join('  ') }, n);
}
function roundStoryQ(R, L) {
  const p = R.pick(PEOPLE), hund = L === 2 || R.chance(0.5), n = L === 2 ? R.int(101, 999) : R.int(1001, 9999), u = hund ? 100 : 10;
  if (n % u === u / 2) return roundStoryQ(R, L);
  const r = Math.round(n / u) * u, ev = R.pick([['Un aréna a {n} places.', 'An arena has {n} seats.'], ['Le parc national a accueilli {n} visiteurs en été.', 'The national park welcomed {n} visitors in summer.'], ['{p} a ramassé {n} feuilles d’érable.', '{p} collected {n} maple leaves.']]);
  const fr = ev[0].replace('{n}', NB2(n)).replace('{p}', p.n), en = ev[1].replace('{n}', NBe(n)).replace('{p}', p.n);
  if (r > 9999) return roundStoryQ(R, L);
  return kp(`rs${n}${u}${ev[0].length}`, T(`${fr} Arrondis ce nombre à la ${hund ? 'centaine' : 'dizaine'} la plus proche.`, `${en} Round this number to the nearest ${hund ? 'hundred' : 'ten'}.`), null, r);
}
function diffStoryQ(R, L) {
  const a = L === 2 ? R.int(300, 999) : R.int(2000, 9900), b = L === 2 ? R.int(101, a - 80) : R.int(1001, a - 300);
  const ev = R.pick([['Le trajet Montréal–Québec en autobus fait {a} km aller-retour pour {p} et {b} km pour {q}.', '']]);
  const sc = R.pick([['Un parc compte {a} sapins et {b} érables.', 'A park has {a} fir trees and {b} maple trees.', 'Combien y a-t-il de sapins de plus que d’érables?', 'How many more fir trees than maple trees are there?'], ['Le premier livre a {a} pages. Le second a {b} pages.', 'The first book has {a} pages. The second has {b} pages.', 'Combien de pages le premier livre a-t-il de plus?', 'How many more pages does the first book have?'], ['En hiver, l’aréna a reçu {a} spectateurs. En été, il en a reçu {b}.', 'In winter the arena had {a} spectators. In summer it had {b}.', 'Combien de spectateurs de plus en hiver qu’en été?', 'How many more spectators in winter than in summer?']]);
  const ap = R.chance(0.5) && L === 3;
  const fr = sc[0].replace('{a}', NB2(a)).replace('{b}', NB2(b)), en = sc[1].replace('{a}', NBe(a)).replace('{b}', NBe(b));
  if (ap) { const tot = a + b; if (tot > 9999) return diffStoryQ(R, L); return kp(`df${a}+${b}${sc[0].length}`, T(`${fr} Combien y en a-t-il en tout?`, `${en} How many are there in all?`), null, tot); }
  return kp(`df${a}-${b}${sc[0].length}`, T(`${fr} ${sc[2]}`, `${en} ${sc[3]}`), null, a - b);
}
NEW.m18 = (L, R) => {
  const r = R.int(1, 100);
  if (r <= 16) return cardsQ(R, L);
  if (r <= 30) return roundStoryQ(R, L);
  if (r <= 44) return diffStoryQ(R, L);
  if (r <= 60) return NEW.m9(L, R);
  if (r <= 72) return NEW.m13(L, R);
  if (r <= 82) return NEW.m2(L, R);
  if (r <= 90) return NEW.m3(L, R);
  return NEW.m16(L, R);
};

// ---------- m19 – cahier C (measurement, time, money, tables, graphs, multi-step) ----------
function measStoryQ(R, L) {
  const p = R.pick(PEOPLE), k = R.int(0, 3);
  if (k === 0) { const w = R.int(L === 2 ? 4 : 8, L === 2 ? 15 : 40), h = R.int(3, L === 2 ? 9 : 25); return kp(`fe${w}x${h}`, T(`Le jardin de ${p.n} mesure ${w} m sur ${h} m. ${Il(p)} installe une clôture tout autour. Combien de mètres de clôture faut-il?`, `${p.n}’s garden is ${w} m by ${h} m. ${He(p)} puts a fence all around it. How many metres of fence are needed?`), null, 2 * (w + h)); }
  if (k === 1) { const w = R.int(3, 12), h = R.int(2, 9); return kp(`ai${w}x${h}`, T(`La patinoire de ${p.n} est un rectangle de ${w} m sur ${h} m. Quelle est son aire (en m²)?`, `${p.n}’s rink is a rectangle ${w} m by ${h} m. What is its area (in m²)?`), null, w * h); }
  if (k === 2) { const a = R.int(1, 9), b = R.int(15, 95); return kp(`co${a}_${b}`, T(`${p.n} coupe une corde de ${a} m et une autre de ${b} cm. Quelle est la longueur totale (en cm)?`, `${p.n} cuts a rope ${a} m long and another ${b} cm long. What is the total length (in cm)?`), null, a * 100 + b); }
  const n = R.int(2, 6), u = R.pick([30, 40, 50, 60, 75]); return kp(`ru${n}x${u}`, T(`${p.n} place ${n} planches de ${u} cm bout à bout. Quelle est la longueur totale (en cm)?`, `${p.n} lays ${n} boards of ${u} cm end to end. What is the total length (in cm)?`), null, n * u);
}
function multiQ(R, L) {
  const p = R.pick(PEOPLE), k = R.int(0, 2);
  if (k === 0) {
    const money = R.pick([2000, 2500, 3000]), a = R.int(3, 9) * 50 + R.pick([0, 25, 75]), b = R.int(1, 5) * 100 + R.pick([25, 50, 75]), ans = money - a - b;
    const fr = `${p.n} a ${moneyT(money).fr}. ${Il(p)} achète un billet de cinéma à ${moneyT(a).fr} et du maïs soufflé à ${moneyT(b).fr}. Combien d’argent lui reste-t-il?`, en = `${p.n} has ${moneyT(money).en}. ${He(p)} buys a movie ticket for ${moneyT(a).en} and popcorn for ${moneyT(b).en}. How much money is left?`;
    return numQ(R, `mq${money}-${a}-${b}`, T(fr, en), { emoji: '🎬' }, ans, [ans + 100, ans - 100, ans + 25, ans - 25, ans + 50, ans - 50, money - a], { fmt: (v) => moneyT(v), cols: 3, say: SAY(fr, en), valid: (v) => v > 0 && v % 5 === 0 });
  }
  if (k === 1) {
    const sh = R.int(7, 17), sm = R.int(0, 11) * 5, d1 = R.pick([20, 25, 30, 35, 40]), d2 = R.pick([30, 45, 50, 60, 75]), st = sh * 60 + sm, end = st + d1 + d2;
    const fr = `${p.n} sort de l’école à ${h24(sh, sm)}. ${Il(p)} marche ${d1} minutes jusqu’à l’aréna, puis s’entraîne ${d2} minutes. À quelle heure ${il(p) === 'elle' ? 'elle termine-t-elle' : 'termine-t-il'} son entraînement?`, en = `${p.n} leaves school at ${sh}:${String(sm).padStart(2, '0')}. ${He(p)} walks ${d1} minutes to the arena, then trains for ${d2} minutes. At what time does ${he(p)} finish training?`;
    return numQ(R, `tq${st}+${d1}+${d2}${p.n}`, T(fr, en), { emoji: '⏰' }, end, [end + 10, end - 10, end + 5, end - 5, end + 20, end - 20, st + d2], { fmt: tOpt, cols: 2, say: SAY(fr, en), valid: timeOK });
  }
  const w = R.int(3, 9), h = R.int(2, 7), pm = R.pick([2, 3, 4, 5]);
  const fr = `${p.n} veut clôturer un jardin de ${w} m sur ${h} m. La clôture coûte ${pm} $ le mètre. Combien coûte toute la clôture (en $)?`, en = `${p.n} wants to fence a garden ${w} m by ${h} m. The fence costs $${pm} per metre. How much does all the fence cost (in $)?`;
  return kp(`cl${w}x${h}x${pm}${p.n}`, T(fr, en), null, 2 * (w + h) * pm, SAY(fr, en));
}
NEW.m19 = (L, R) => {
  const r = R.int(1, 100);
  if (r <= 14) return measStoryQ(R, L);
  if (r <= 38) return NEW.m11(L, R);
  if (r <= 62) return NEW.m15(L, R);
  if (r <= 74) return NEW.m13(L, R);
  if (r <= 88) return NEW.m12(L, R);
  return multiQ(R, L);
};

// ---------- wire up: L1 = former level 3, L2/L3 = new generators ----------
for (const u of units) {
  const nw = NEW[u.id];
  if (!nw) continue;
  const base = { ...u }; // keeps the original generate() with a valid `this` for its internal retries
  const L1FROM = { m13: 2 }; // m13 Facile = equal groups & arrays (former level 2); tables start at Moyen
  u.generate = function generate(level, R) { return level <= 1 ? base.generate(L1FROM[u.id] || 3, R) : nw(level, R); };
}
