// Mathématique 3e année — Nombres (g3m1 → g3m8)
import { FRAC_FR, FRAC_EN, uniqT, S, T, SAY, NB, NBe, NT, WORDS, frW, enW, dec, moneyT, money2, K, CH, NQ, TQ, YN, SORT, ORD, tx, unit, range, frac, fracWords, gcd, tenthsSvg, hundredSvg, C } from './math-lib.js';

const swaps = (n) => { const s = String(n), out = []; for (let i = 0; i < s.length - 1; i++) { const a = s.split(''); [a[i], a[i + 1]] = [a[i + 1], a[i]]; if (a[0] !== '0') out.push(Number(a.join(''))); } return out; };
const r4 = (R) => R.pick([R.int(1001, 9999), R.int(1, 9) * 1000 + R.int(1, 9) * 100, R.int(1, 9) * 1000 + R.int(1, 99), R.int(1, 9) * 1000 + R.int(1, 9) * 10 + R.int(1, 9)]);
const r5 = (R) => R.pick([R.int(10001, 99999), R.int(10, 99) * 1000, R.int(10, 99) * 1000 + R.int(1, 9) * 100, R.int(1, 9) * 10000 + R.int(1, 999), R.int(10, 99) * 1000 + R.int(1, 99)]);
const in5 = (v) => v >= 10000 && v <= 99999;
const in4 = (v) => v >= 1000 && v <= 9999;

// ---------- g3m1 : lire et écrire ----------
const tipRead = T('Lis d’abord le nombre de milliers, puis dis « mille », puis le reste.', 'Read the thousands first, say “thousand”, then the rest.');
const tipZero = T('Un 0 garde la place vide : n’oublie pas les zéros!', 'A 0 keeps an empty place: don’t forget the zeros!');
const m1 = unit('g3m1', '🔢', T('Lire et écrire les nombres jusqu’à 100 000', 'Reading and writing numbers to 100,000'),
  'Arithmétique — lire et écrire les nombres naturels inférieurs à 100 000', [
    [
      (R) => { const n = r4(R); return K(`w${n}`, T('Écris ce nombre en chiffres.', 'Write this number in digits.'), n, tipZero, { stimulus: tx(WORDS(n)), say: SAY(frW(n), enW(n)) }); },
      (R) => { const n = r4(R); return NQ(R, `wc${n}`, T('Comment s’écrit ce nombre en lettres?', 'How do you write this number in words?'), n, [...swaps(n), n + 100, n - 100, n + 1000, n - 10], tipRead, { stimulus: tx(NB(n)), fmt: WORDS, cols: 2, valid: in4 }); },
      (R) => { const x = R.pick([R.int(2, 9) * 1000, R.int(11, 99) * 100, R.int(101, 999) * 10]); return K(`aft${x}`, T(`Quel nombre vient juste après ${NB(x - 1)}?`, `Which number comes right after ${NBe(x - 1)}?`), x, T('Ajoute 1. Quand les unités dépassent 9, on fait une nouvelle dizaine.', 'Add 1. When the ones go past 9, you make a new ten.')); },
      (R) => { const x = R.pick([R.int(2, 9) * 1000, R.int(11, 99) * 100, R.int(101, 999) * 10]); return K(`bef${x}`, T(`Quel nombre vient juste avant ${NB(x)}?`, `Which number comes right before ${NBe(x)}?`), x - 1, T('Enlève 1. Attention aux zéros : 3 000 − 1 = 2 999.', 'Take away 1. Watch the zeros: 3,000 − 1 = 2,999.')); },
      (R) => { const n = R.int(1, 9) * 1000; return { type: 'numberline', key: `nl${n}`, prompt: T(`Touche le nombre ${NB(n)}.`, `Tap the number ${NBe(n)}.`), min: 0, max: 10000, step: 1000, answer: n, tip: T('Chaque bond vaut 1 000.', 'Each jump is worth 1,000.') }; },
    ],
    [
      (R) => { const n = r5(R); return NQ(R, `wc${n}`, T('Comment s’écrit ce nombre en lettres?', 'How do you write this number in words?'), n, [...swaps(n), n + 1000, n - 1000, n + 10000, n - 100], tipRead, { stimulus: tx(NT(n)), fmt: WORDS, cols: 2, valid: in5 }); },
      (R) => { const n = r5(R); return NQ(R, `wd${n}`, T('Écoute et lis. Quel est ce nombre?', 'Listen and read. Which number is it?'), n, [...swaps(n), n + 1000, n - 10000, n * 10 > 99999 ? n - 1 : n + 10], tipZero, { stimulus: tx(WORDS(n)), say: SAY(frW(n), enW(n)), valid: in5 }); },
      (R) => { const x = R.pick([R.int(2, 9) * 10000, R.int(11, 99) * 1000, R.int(101, 999) * 100]); return NQ(R, `aft${x}`, T(`Quel nombre vient juste après ${NB(x - 1)}?`, `Which number comes right after ${NBe(x - 1)}?`), x, [x - 2, x + 1, x - 10, x + 9, x + 10, (x - 1) * 10 > 99999 ? x + 100 : x + 1000], T('Ajoute 1 : tous les 9 deviennent des 0 et le chiffre à gauche augmente.', 'Add 1: all the 9s become 0s and the digit on the left goes up.'), { valid: in5 }); },
      (R) => { const x = R.pick([R.int(2, 9) * 10000, R.int(11, 99) * 1000]); return NQ(R, `bef${x}`, T(`Quel nombre vient juste avant ${NB(x)}?`, `Which number comes right before ${NBe(x)}?`), x - 1, [x - 10, x - 100, x + 1, x - 1000, x - 11], T('Enlève 1 : 40 000 − 1 = 39 999.', 'Take away 1: 40,000 − 1 = 39,999.'), { valid: in5 }); },
      (R) => { const n = R.int(1, 9) * 10000; return { type: 'numberline', key: `nl${n}`, prompt: T(`Touche le nombre ${NB(n)}.`, `Tap the number ${NBe(n)}.`), min: 0, max: 100000, step: 10000, answer: n, tip: T('Chaque bond vaut 10 000.', 'Each jump is worth 10,000.') }; },
    ],
    [
      (R) => { const n = R.pick([R.int(70, 99) * 1000 + R.int(1, 99), R.int(1, 9) * 10000 + R.int(1, 9), R.int(71, 99) * 1000, R.int(10, 99) * 1000 + R.int(70, 99)]); return NQ(R, `wd${n}`, T('Écoute et lis. Quel est ce nombre?', 'Listen and read. Which number is it?'), n, [...swaps(n), n + 10, n - 10, n + 1000, n - 1000], T('Soixante-dix = 70, quatre-vingts = 80, quatre-vingt-dix = 90.', 'Seventy = 70, eighty = 80, ninety = 90.'), { stimulus: tx(WORDS(n)), say: SAY(frW(n), enW(n)), valid: in5 }); },
      (R) => { const n = R.pick([R.int(70, 99) * 1000 + R.int(100, 999), R.int(1, 9) * 10000 + R.int(10, 99)]); return NQ(R, `wc${n}`, T('Quelle écriture en lettres est la bonne?', 'Which words are correct?'), n, [...swaps(n), n + 10, n - 10, n + 10000, n - 1000], tipRead, { stimulus: tx(NT(n)), fmt: WORDS, cols: 2, valid: in5 }); },
      (R) => { const st = R.pick([100, 1000, 10000]), a = R.int(1, 8) * 10000 + R.int(0, 9) * 1000 + R.int(0, 9) * 100, seq = [a, a + st, a + 2 * st, a + 3 * st].filter((v) => v < 100000); const ans = seq[seq.length - 1] + st; if (!in5(ans) || seq.length < 4) return K(`th${a}`, T(`Combien de milliers complets y a-t-il dans ${NB(a)}?`, `How many whole thousands are in ${NBe(a)}?`), Math.floor(a / 1000), T('Cache les 3 derniers chiffres : ce qui reste, ce sont les milliers.', 'Cover the last 3 digits: what is left is the thousands.')); return NQ(R, `seq${a}_${st}`, T('Quel nombre vient ensuite?', 'Which number comes next?'), ans, [ans + st, ans - 2 * st, ans + 1, seq[3] + st * 10, seq[3] + (st === 100 ? 1000 : 100)], T(`On compte par bonds de ${NB(st)}.`, `We count by ${NBe(st)}s.`), { stimulus: tx(T(seq.map(NB).join(' ; ') + ' ; …', seq.map(NBe).join(', ') + ', …')), valid: in5 }); },
      (R) => { const n = R.int(11, 99) * 1000 + R.int(0, 999); return K(`th${n}`, T(`Combien de milliers complets y a-t-il dans ${NB(n)}?`, `How many whole thousands are in ${NBe(n)}?`), Math.floor(n / 1000), T('Cache les 3 derniers chiffres : ce qui reste, ce sont les milliers.', 'Cover the last 3 digits: what is left is the thousands.')); },
      (R) => { const n = R.int(1, 19) * 5000; return { type: 'numberline', key: `nl5k${n}`, prompt: T(`Touche le nombre ${NB(n)}.`, `Tap the number ${NBe(n)}.`), min: 0, max: 100000, step: 5000, answer: n, tip: T('Les grands traits valent 10 000; chaque petit bond vaut 5 000.', 'Each small jump is worth 5,000.') }; },
    ],
  ]);

// ---------- g3m2 : valeur de position ----------
const PL = [T('unités', 'ones'), T('dizaines', 'tens'), T('centaines', 'hundreds'), T('unités de mille', 'thousands'), T('dizaines de mille', 'ten thousands')];
const PV = [1, 10, 100, 1000, 10000];
const digitsOf = (n) => String(n).split('').reverse().map(Number);
const expand = (n) => digitsOf(n).map((d, i) => d * PV[i]).filter(Boolean).reverse();
const tipPlace = T('De droite à gauche : unités, dizaines, centaines, unités de mille, dizaines de mille.', 'From right to left: ones, tens, hundreds, thousands, ten thousands.');
function digitQ(R, n) {
  const ds = digitsOf(n), pos = R.int(0, ds.length - 1), ans = ds[pos];
  const pool = [...new Set([...ds, ...[ans + 1, ans - 1, 0, 9].filter((v) => v >= 0 && v <= 9)])].filter((v) => v !== ans);
  return CH(`dg${n}_${pos}`, T(`Dans ${NB(n)}, quel est le chiffre des ${PL[pos].fr}?`, `In ${NBe(n)}, which digit is in the ${PL[pos].en} place?`), [ans, ...R.sample(pool, 3)].map((v) => tx(String(v))), tipPlace, { stimulus: tx(NT(n)) });
}
function valueQ(R, n) {
  const ds = digitsOf(n), cand = ds.map((d, i) => i).filter((i) => ds[i] !== 0 && ds.indexOf(ds[i]) === ds.lastIndexOf(ds[i]));
  if (!cand.length) return digitQ(R, n);
  const pos = R.pick(cand), d = ds[pos], ans = d * PV[pos];
  return NQ(R, `val${n}_${pos}`, T(`Dans ${NB(n)}, que vaut le chiffre ${d}?`, `In ${NBe(n)}, what is the digit ${d} worth?`), ans, PV.map((p) => d * p), T('La valeur dépend de la position : 3 dans les centaines vaut 300.', 'The value depends on the place: a 3 in the hundreds is worth 300.'), { stimulus: tx(NT(n)) });
}
const m2 = unit('g3m2', '🧱', T('Valeur de position', 'Place value'),
  'Arithmétique — valeur de position, décomposition et composition des nombres < 100 000', [
    [
      (R) => digitQ(R, R.int(1001, 9999)),
      (R) => valueQ(R, R.int(1001, 9999)),
      (R) => { const n = r4(R), ds = digitsOf(n); const t = T(`${ds[3]} unités de mille, ${ds[2]} centaines, ${ds[1]} dizaines, ${ds[0]} unités`, `${ds[3]} thousands, ${ds[2]} hundreds, ${ds[1]} tens, ${ds[0]} ones`); return K(`cmp${n}`, T('Quel nombre est-ce?', 'Which number is it?'), n, tipZero, { stimulus: tx(t), say: SAY(t.fr, t.en) }); },
      (R) => { const n = R.int(1001, 9999), e = expand(n); return K(`exp${n}`, T('Quel nombre est-ce?', 'Which number is it?'), n, T('Place chaque partie dans sa colonne.', 'Put each part in its column.'), { stimulus: tx(T(e.map(NB).join(' + '), e.map(NBe).join(' + '))) }); },
    ],
    [
      (R) => digitQ(R, R.int(10001, 99999)),
      (R) => valueQ(R, R.int(10001, 99999)),
      (R) => { const n = r5(R), e = expand(n); return NQ(R, `exp${n}`, T('Quel nombre est-ce?', 'Which number is it?'), n, [...swaps(n), n + 1000, n - 10, n + 9000], tipZero, { stimulus: tx(T(e.map(NB).join(' + '), e.map(NBe).join(' + '))), valid: in5 }); },
      (R) => { const n = r5(R), e = expand(n); const wrong = (k) => { const f = expand(n + k); return T(f.map(NB).join(' + '), f.map(NBe).join(' + ')); }; const ks = R.sample([1000, -1000, 100, 10, -10, 9000], 3).filter((k) => in5(n + k)); return CH(`dec${n}`, T(`Comment décompose-t-on ${NB(n)}?`, `How do you break down ${NBe(n)}?`), [T(e.map(NB).join(' + '), e.map(NBe).join(' + ')), ...ks.map(wrong)].map(tx), tipPlace, { cols: 1 }); },
    ],
    [
      (R) => { const c = R.int(11, 99), u = R.pick([[100, 'centaines', 'hundreds'], [10, 'dizaines', 'tens'], [1000, 'unités de mille', 'thousands']]); const ans = c * u[0]; if (ans > 9999) return NQ(R, `grp${c}_${u[0]}`, T(`${c} ${u[1]}, c’est combien?`, `${c} ${u[2]} is how much?`), ans, [c * u[0] / 10, c * u[0] * 10, c + u[0], ans + u[0]], T(`1 de ces groupes = ${NB(u[0])}. Multiplie.`, `1 group = ${NBe(u[0])}. Multiply.`)); return K(`grp${c}_${u[0]}`, T(`${c} ${u[1]}, c’est combien?`, `${c} ${u[2]} is how much?`), ans, T(`${c} ${u[1]} = ${c} × ${u[0]}.`, `${c} ${u[2]} = ${c} × ${u[0]}.`)); },
      (R) => { const n = R.int(1001, 9999), w = R.pick([[100, 'centaines', 'hundreds'], [10, 'dizaines', 'tens']]); return K(`cnt${n}_${w[0]}`, T(`Combien de ${w[1]} y a-t-il en tout dans ${NB(n)}?`, `How many ${w[2]} are there in all in ${NBe(n)}?`), Math.floor(n / w[0]), T(w[0] === 100 ? 'Cache les 2 derniers chiffres : 4 582 → 45 centaines.' : 'Cache le dernier chiffre : 4 582 → 458 dizaines.', w[0] === 100 ? 'Cover the last 2 digits: 4,582 → 45 hundreds.' : 'Cover the last digit: 4,582 → 458 tens.')); },
      (R) => { const a = R.int(1, 7), b = R.int(10, 19), c = R.int(10, 19), d = R.int(0, 9); const n = a * 1000 + b * 100 + c * 10 + d; const t = T(`${a} unités de mille + ${b} centaines + ${c} dizaines + ${d} unités`, `${a} thousands + ${b} hundreds + ${c} tens + ${d} ones`); return K(`odd${a}_${b}_${c}_${d}`, T('Quel nombre est-ce? Attention aux échanges!', 'Which number is it? Watch the trades!'), n, T('10 centaines = 1 unité de mille; 10 dizaines = 1 centaine.', '10 hundreds = 1 thousand; 10 tens = 1 hundred.'), { stimulus: tx(t), say: SAY(t.fr, t.en) }); },
      (R) => { const n = R.int(10, 98) * 1000 + R.int(0, 999), add = R.pick([[1000, 'mille', 'one thousand'], [10000, 'dix mille', 'ten thousand'], [100, 'cent', 'one hundred']]); const ans = n + add[0]; return NQ(R, `add${n}_${add[0]}`, T(`Ajoute ${add[1]} à ${NB(n)}.`, `Add ${add[2]} to ${NBe(n)}.`), ans, [n + add[0] / 10, n + add[0] * 10, ans + 1, ans - 1000, n + 1], T('Seul le chiffre d’une position change.', 'Only the digit in one place changes.'), { valid: (v) => v > 0 && v < 100000 && v !== n }); },
    ],
  ]);

// ---------- g3m3 : comparer et ordonner ----------
const SYM = [tx('<'), tx('>'), tx('=')];
const symQ = (key, a, b, A, B, tip) => { const s = a < b ? 0 : a > b ? 1 : 2; return { type: 'choice', key, prompt: T('Quel signe va dans la case?', 'Which sign goes in the box?'), stimulus: tx(T(`${A.fr}  ☐  ${B.fr}`, `${A.en}  ☐  ${B.en}`)), options: SYM, answer: s, fixedOrder: true, cols: 3, tip }; };
const tipCmp = T('Compare d’abord le nombre de chiffres, puis les chiffres de gauche à droite.', 'First compare how many digits, then compare digits from left to right.');
const close = (R, n, lo, hi) => { const ds = String(n).split(''); const i = R.int(0, ds.length - 1); ds[i] = String((+ds[i] + R.int(1, 8)) % 10); if (ds[0] === '0') ds[0] = '1'; const v = Number(ds.join('')); return v >= lo && v <= hi ? v : n + R.pick([10, 100, -10]); };
const m3 = unit('g3m3', '⚖️', T('Comparer et ordonner', 'Comparing and ordering'),
  'Arithmétique — comparer et ordonner des nombres naturels < 100 000 (<, >, =)', [
    [
      (R) => { const a = R.int(1000, 9999), b = R.chance(0.15) ? a : close(R, a, 1000, 9999); return symQ(`s${a}_${b}`, a, b, NT(a), NT(b), tipCmp); },
      (R) => { const a = R.int(1000, 9999), set = [...new Set([a, close(R, a, 1000, 9999), close(R, a, 1000, 9999), ...swaps(a)])].slice(0, 4); if (set.length < 4) set.push(a + 1); const big = R.chance(0.5), ans = big ? Math.max(...set) : Math.min(...set); return CH(`mx${set.join('_')}${big}`, big ? T('Quel est le plus grand nombre?', 'Which is the greatest number?') : T('Quel est le plus petit nombre?', 'Which is the smallest number?'), [ans, ...set.filter((v) => v !== ans)].slice(0, 4).map((v) => tx(NT(v))), tipCmp); },
      (R) => { const s = R.sample(range(10, 99), 4).map((x) => x * 100 + R.int(0, 99)).sort((x, y) => x - y); return ORD(`o${s.join('_')}`, T('Place du plus petit au plus grand.', 'Put them in order from smallest to greatest.'), s.map((v) => NT(v)), tipCmp); },
    ],
    [
      (R) => { const a = R.int(10000, 99999), b = R.chance(0.1) ? a : close(R, a, 10000, 99999); return symQ(`s${a}_${b}`, a, b, NT(a), NT(b), tipCmp); },
      (R) => { const a = R.int(10000, 99999), s = [...new Set([a, close(R, a, 10000, 99999), close(R, a, 10000, 99999), close(R, a, 10000, 99999), R.int(1000, 9999)])].sort((x, y) => y - x); return ORD(`od${s.join('_')}`, T('Place du plus grand au plus petit.', 'Put them in order from greatest to smallest.'), s.map((v) => NT(v)), tipCmp); },
      (R) => { const a = R.int(10, 98) * 1000, b = a + R.pick([1000, 2000]), ans = R.int(a + 1, b - 1); return NQ(R, `btw${a}_${ans}`, T(`Quel nombre est entre ${NB(a)} et ${NB(b)}?`, `Which number is between ${NBe(a)} and ${NBe(b)}?`), ans, [a - R.int(1, 900), b + R.int(1, 900), a - 1000, b + 100, ans * 10 > 99999 ? b + 10 : ans * 10], T('Le nombre doit être plus grand que le premier et plus petit que le deuxième.', 'It must be greater than the first and smaller than the second.'), { valid: (v) => (v <= a || v >= b) && v < 1000000 }); },
    ],
    [
      (R) => { const a = R.int(10, 90) * 100, b = R.int(1, 9) * 100, c = a + b - R.pick([0, 10, 100, -10, -100]) ; return symQ(`e${a}_${b}_${c}`, a + b, c, T(`${NB(a)} + ${NB(b)}`, `${NBe(a)} + ${NBe(b)}`), NT(c), T('Calcule d’abord la somme, puis compare.', 'Work out the sum first, then compare.')); },
      (R) => { const a = R.int(10000, 99999), b = R.chance(0.2) ? a : close(R, a, 10000, 99999); return symQ(`wsym${a}_${b}`, a, b, WORDS(a), NT(b), T('Écris d’abord le nombre en chiffres dans ta tête.', 'First write the number in digits in your head.')); },
      (R) => { const ds = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 4); if (ds.every((d) => d === 0)) ds[0] = 1; const big = R.chance(0.5); const s = [...ds].sort((x, y) => (big ? y - x : x - y)); if (!big && s[0] === 0) { const i = s.findIndex((d) => d > 0); [s[0], s[i]] = [s[i], s[0]]; } const ans = Number(s.join('')); return K(`mk${ds.join('')}${big}`, big ? T(`Avec les chiffres ${ds.join(', ')}, forme le plus grand nombre possible.`, `Using the digits ${ds.join(', ')}, make the greatest number possible.`) : T(`Avec les chiffres ${ds.join(', ')}, forme le plus petit nombre de 4 chiffres possible.`, `Using the digits ${ds.join(', ')}, make the smallest 4-digit number possible.`), ans, big ? T('Mets le plus grand chiffre à gauche, puis le suivant…', 'Put the greatest digit on the left, then the next…') : T('Mets le plus petit chiffre à gauche, mais jamais 0 au début.', 'Put the smallest digit on the left, but never 0 first.')); },
      (R) => { const p = R.int(1, 8), q = R.sample([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x !== p), 3); const base = q.map((x) => Number(`${p}${x}${q.filter((y) => y !== x).join('')}`)); const s = [...new Set(base)].sort((x, y) => x - y); return ORD(`op${s.join('_')}`, T('Place du plus petit au plus grand.', 'Put them in order from smallest to greatest.'), s.map(NT), T('Même premier chiffre? Regarde le deuxième, puis le troisième.', 'Same first digit? Look at the second, then the third.')); },
    ],
  ]);

// ---------- g3m4 : arrondir ----------
const roundTo = (n, p) => Math.round(n / p) * p;
const PN = { 10: ['à la dizaine près', 'to the nearest ten'], 100: ['à la centaine près', 'to the nearest hundred'], 1000: ['au millier près', 'to the nearest thousand'] };
const tipRound = (p) => T(`Regarde le chiffre juste à droite des ${p === 10 ? 'dizaines' : p === 100 ? 'centaines' : 'milliers'} : 0 à 4, on descend; 5 à 9, on monte.`, `Look at the digit just right of the ${p === 10 ? 'tens' : p === 100 ? 'hundreds' : 'thousands'}: 0–4 round down, 5–9 round up.`);
function roundQ(R, n, p) {
  const ans = roundTo(n, p), lo = Math.floor(n / p) * p, hi = lo + p;
  return NQ(R, `r${n}_${p}`, T(`Arrondis ${NB(n)} ${PN[p][0]}.`, `Round ${NBe(n)} ${PN[p][1]}.`), ans, [lo, hi, lo - p, hi + p, roundTo(n, p * 10), roundTo(n, p / 10 || 1)].filter((v) => v !== n), tipRound(p), { valid: (v) => v % p === 0 || v === roundTo(n, p / 10) });
}
const m4 = unit('g3m4', '🎯', T('Arrondir', 'Rounding'),
  'Arithmétique — arrondir à la dizaine, à la centaine et au millier près', [
    [
      (R) => roundQ(R, R.int(11, 999), 10),
      (R) => { const n = R.int(11, 99); return { type: 'numberline', key: `nl${n}`, prompt: T(`Touche la dizaine la plus proche de ${n}.`, `Tap the ten closest to ${n}.`), min: 0, max: 100, step: 10, answer: roundTo(n, 10), tip: tipRound(10) }; },
      (R) => { const t = R.int(1, 9) * 10, n = t + R.int(-4, 4); return YN(`yn${n}_${t}`, T(`Est-ce que ${n} s’arrondit à ${t}?`, `Does ${n} round to ${t}?`), roundTo(n, 10) === t, tipRound(10)); },
    ],
    [
      (R) => roundQ(R, R.int(101, 9999), 100),
      (R) => roundQ(R, R.int(1001, 9999), 10),
      (R) => { const n = R.int(101, 999); return { type: 'numberline', key: `nlc${n}`, prompt: T(`Touche la centaine la plus proche de ${n}.`, `Tap the hundred closest to ${n}.`), min: 0, max: 1000, step: 100, answer: roundTo(n, 100), tip: tipRound(100) }; },
    ],
    [
      (R) => roundQ(R, R.int(1001, 99999), 1000),
      (R) => roundQ(R, R.pick([R.int(1, 99) * 100 + R.int(45, 55), R.int(10, 99) * 100 + R.int(95, 99)]), R.pick([10, 100])),
      (R) => { const c = R.int(2, 98) * 100, ok = c + R.int(-50, 49), bad = R.sample([c - R.int(51, 99), c + R.int(50, 99), c + R.int(100, 150), c - R.int(100, 150)], 3); return CH(`wh${c}_${ok}`, T(`Quel nombre s’arrondit à ${NB(c)} (centaine près)?`, `Which number rounds to ${NBe(c)} (nearest hundred)?`), [ok, ...bad].map((v) => tx(NT(v))), T(`Les nombres de ${NB(c - 50)} à ${NB(c + 49)} s’arrondissent à ${NB(c)}.`, `Numbers from ${NBe(c - 50)} to ${NBe(c + 49)} round to ${NBe(c)}.`)); },
      (R) => { const n = R.int(1, 19) * 500 + R.int(1, 499); const ans = roundTo(n, 1000); return { type: 'numberline', key: `nlm${n}`, prompt: T(`Touche le millier le plus proche de ${NB(n)}.`, `Tap the thousand closest to ${NBe(n)}.`), min: 0, max: 10000, step: 1000, answer: Math.min(ans, 10000), tip: tipRound(1000) }; },
    ],
  ]);

// ---------- g3m5 : pairs, impairs, multiples ----------
const tipEven = T('Regarde seulement le dernier chiffre : 0, 2, 4, 6, 8 → pair.', 'Look only at the last digit: 0, 2, 4, 6, 8 → even.');
const PI_BINS = [{ text: T('Pair', 'Even'), emoji: '👯' }, { text: T('Impair', 'Odd'), emoji: '🦄' }];
const tipMult = (k) => ({
  2: T('Les multiples de 2 finissent par 0, 2, 4, 6 ou 8.', 'Multiples of 2 end in 0, 2, 4, 6 or 8.'),
  5: T('Les multiples de 5 finissent par 0 ou 5.', 'Multiples of 5 end in 0 or 5.'),
  10: T('Les multiples de 10 finissent par 0.', 'Multiples of 10 end in 0.'),
}[k] || T(`Récite la table de ${k} : ${k}, ${2 * k}, ${3 * k}, ${4 * k}…`, `Count by ${k}s: ${k}, ${2 * k}, ${3 * k}, ${4 * k}…`));
function multQ(R, k, max) {
  const m = k * R.int(2, Math.floor(max / k)), bad = [];
  for (let g = 0; bad.length < 3 && g < 200; g++) { const v = R.int(Math.max(2, m - 3 * k), m + 3 * k); if (v % k && !bad.includes(v)) bad.push(v); }
  return CH(`mul${k}_${m}_${bad.join('_')}`, T(`Lequel est un multiple de ${k}?`, `Which one is a multiple of ${k}?`), [m, ...bad].map((v) => tx(String(v))), tipMult(k));
}
function seqQ(R, k, startMax) {
  const a = R.int(0, startMax) * (R.chance(0.5) ? k : 1), hole = R.int(1, 4), seq = range(0, 4).map((i) => a + i * k);
  const show = seq.map((v, i) => (i === hole ? '?' : String(v))).join(', ');
  return K(`sq${k}_${a}_${hole}`, T('Quel nombre manque?', 'Which number is missing?'), seq[hole], T(`On ajoute ${k} chaque fois.`, `We add ${k} each time.`), { stimulus: tx(show) });
}
const m5 = unit('g3m5', '🔁', T('Pairs, impairs et multiples', 'Even, odd and multiples'),
  'Arithmétique — nombres pairs et impairs, multiples d’un nombre naturel', [
    [
      (R) => { const n = R.int(10, 999); return { type: 'choice', key: `pi${n}`, prompt: T(`${n} est-il pair ou impair?`, `Is ${n} even or odd?`), stimulus: tx(String(n)), options: PI_BINS, answer: n % 2, fixedOrder: true, cols: 2, tip: tipEven }; },
      (R) => { const it = R.sample(range(10, 199), 6); return SORT(`so${it.join('_')}`, T('Classe les nombres : pairs ou impairs?', 'Sort the numbers: even or odd?'), PI_BINS, it.map((v) => ({ text: String(v), bin: v % 2 })), tipEven); },
      (R) => seqQ(R, R.pick([2, 5, 10]), 40),
      (R) => multQ(R, R.pick([2, 5, 10]), 100),
    ],
    [
      (R) => seqQ(R, R.pick([3, 4, 25, 50, 100]), 30),
      (R) => multQ(R, R.pick([3, 4, 5]), 50),
      (R) => { const k = R.pick([3, 4, 5, 10]), it = R.sample(range(5, 60), 6); return SORT(`sm${k}_${it.join('_')}`, T(`Multiple de ${k} ou non?`, `Multiple of ${k} or not?`), [{ text: T(`Multiple de ${k}`, `Multiple of ${k}`), emoji: '✅' }, { text: T('Non', 'No'), emoji: '❌' }], it.map((v) => ({ text: String(v), bin: v % k ? 1 : 0 })), tipMult(k)); },
      (R) => { const n = R.int(1000, 9999); return { type: 'choice', key: `pi${n}`, prompt: T(`${NB(n)} est-il pair ou impair?`, `Is ${NBe(n)} even or odd?`), stimulus: tx(NT(n)), options: PI_BINS, answer: n % 2, fixedOrder: true, cols: 2, tip: tipEven }; },
    ],
    [
      (R) => multQ(R, R.pick([6, 7, 8, 9]), 90),
      (R) => { const a = R.int(11, 99), b = R.int(11, 99), op = R.pick(['+', '×']); const v = op === '+' ? a + b : a * b; return { type: 'choice', key: `par${a}${op}${b}`, prompt: T(`Sans calculer : ${a} ${op} ${b}, est-ce pair ou impair?`, `Without calculating: is ${a} ${op} ${b} even or odd?`), options: PI_BINS, answer: v % 2, fixedOrder: true, cols: 2, tip: op === '+' ? T('pair + pair = pair; impair + impair = pair; pair + impair = impair.', 'even + even = even; odd + odd = even; even + odd = odd.') : T('Si un des nombres est pair, le produit est pair.', 'If one number is even, the product is even.') }; },
      (R) => { const k = R.pick([3, 4, 6, 7, 8, 9]), m = R.int(30, 99); return K(`lm${k}_${m}`, T(`Quel est le plus grand multiple de ${k} qui est plus petit que ${m}?`, `What is the greatest multiple of ${k} that is less than ${m}?`), Math.floor((m - 1) / k) * k, T(`Compte par ${k} jusqu’à dépasser ${m}, puis recule d’un bond.`, `Count by ${k}s until you pass ${m}, then step back one jump.`)); },
      (R) => { const pair = R.pick([[2, 5], [2, 3], [3, 5], [4, 5], [2, 7]]), l = pair[0] * pair[1], m = l * R.int(1, Math.floor(99 / l)); const bad = R.sample(range(10, 99).filter((v) => !(v % pair[0] === 0 && v % pair[1] === 0) && (v % pair[0] === 0 || v % pair[1] === 0)), 3); return CH(`two${pair.join('')}_${m}_${bad.join('_')}`, T(`Quel nombre est un multiple de ${pair[0]} ET de ${pair[1]}?`, `Which number is a multiple of ${pair[0]} AND of ${pair[1]}?`), [m, ...bad].map((v) => tx(String(v))), T('Vérifie les deux conditions pour chaque nombre.', 'Check both rules for each number.')); },
      (R) => seqQ(R, R.pick([6, 7, 8, 9, 11, 12, 15, 25]), 20),
    ],
  ]);

// ---------- g3m6 : fractions : partie d’un tout, d’un ensemble ----------
const DEN1 = [2, 3, 4, 5, 6, 8], DEN2 = [2, 3, 4, 5, 6, 8, 10];
const tipFrac = T('Le nombre du bas (dénominateur) = nombre de parts égales. Le nombre du haut = parts coloriées.', 'Bottom number (denominator) = number of equal parts. Top number = coloured parts.');
function fracPicQ(R, dens) {
  const b = R.pick(dens), a = R.int(1, b - 1), kind = b <= 8 && R.chance(0.5) ? 'circle' : 'rect';
  const cands = [[b - a, b], [a, b + 1], [b, a], [a, a + b], [a + 1, b], [a - 1, b]].filter(([x, y]) => x > 0 && y > 1 && !(x === a && y === b));
  const uniq = [...new Map(cands.map((c) => [c.join('/'), c])).values()];
  return CH(`fp${a}_${b}_${kind}`, T('Quelle fraction est coloriée?', 'What fraction is coloured?'), [[a, b], ...R.sample(uniq, 3)].map(([x, y]) => tx(frac(x, y))), tipFrac, { stimulus: { svg: S.fraction(b, a, kind) } });
}
const SETS = ['🍎', '⚽', '🧁', '🐟', '🎈', '🍪', '🌼'];
function fracSetQ(R, max) {
  const b = R.int(3, max), a = R.int(1, b - 1), [e1, e2] = R.sample([['🔴', '🔵'], ['🟢', '⚪'], ['🟡', '🟣'], ['⭐', '🌙']], 1)[0];
  const row = R.shuffle([...Array(a).fill(e1), ...Array(b - a).fill(e2)]).join(' ');
  const cands = [[b - a, b], [a, b - a], [a, b + 1], [b, a]].filter(([x, y]) => x > 0 && y > 0 && !(x === a && y === b) && x !== y);
  const uniq = [...new Map(cands.map((c) => [c.join('/'), c])).values()];
  return CH(`fs${row}`, T(`Quelle fraction de l’ensemble est ${e1}?`, `What fraction of the set is ${e1}?`), [[a, b], ...uniq].slice(0, 4).map(([x, y]) => tx(frac(x, y))), T('Compte tous les objets (en bas), puis ceux qu’on demande (en haut).', 'Count all the objects (bottom), then the ones asked for (top).'), { stimulus: tx(row) });
}
const m6 = unit('g3m6', '🍕', T('Fractions : partie d’un tout et d’un ensemble', 'Fractions: part of a whole, part of a set'),
  'Arithmétique — fractions : partie d’un tout, partie d’un ensemble, vocabulaire (numérateur, dénominateur)', [
    [
      (R) => fracPicQ(R, DEN1),
      (R) => { const b = R.pick([2, 3, 4]), eq = R.chance(0.5), kind = R.pick(['rect', 'circle']); return YN(`eq${b}${eq}${kind}`, T('Le tout est-il partagé en parts égales?', 'Is the whole cut into equal parts?'), eq, T('Des parts égales ont toutes exactement la même grandeur.', 'Equal parts are all exactly the same size.'), { stimulus: { svg: S.fraction(b, 1, kind, eq) } }); },
      (R) => { const b = R.pick([2, 3, 4, 5, 6, 8, 10]), a = R.int(1, b - 1); return CH(`fw${a}_${b}`, T(`Comment lit-on ${a}/${b}?`, `How do you read ${a}/${b}?`), uniqT([fracWords(a, b), ...R.shuffle([[b, a], [a, b === 10 ? 8 : b + 1], [a === 1 ? 2 : a - 1, b], [a + 1, b], [b - a, b]].filter(([x, y]) => FRAC_OK(x, y) && !(x === a && y === b))).map(([x, y]) => fracWords(x, y))]).slice(0, 4).map(tx), tipFrac, { cols: 2, stimulus: tx(frac(a, b)) }); },
      (R) => fracSetQ(R, 6),
    ],
    [
      (R) => fracPicQ(R, DEN2),
      (R) => fracSetQ(R, 10),
      (R) => { const b = R.pick(DEN2), a = R.int(1, b - 1), top = R.chance(0.5); return K(`nd${a}_${b}_${top}`, top ? T(`Dans la fraction ${a}/${b}, quel est le numérateur?`, `In the fraction ${a}/${b}, what is the numerator?`) : T(`Dans la fraction ${a}/${b}, quel est le dénominateur?`, `In the fraction ${a}/${b}, what is the denominator?`), top ? a : b, T('Numérateur en haut, dénominateur en bas (comme D pour « dessous »).', 'Numerator on top, denominator at the bottom (D for “down”).'), { stimulus: tx(frac(a, b)) }); },
      (R) => { const b = R.pick(DEN2), a = R.int(1, b - 1); return K(`rest${a}_${b}`, T(`${a}/${b} de la pizza est mangé. Combien de parts sur ${b} restent?`, `${a}/${b} of the pizza is eaten. How many parts out of ${b} are left?`), b - a, T('Le tout = toutes les parts. Enlève les parts mangées.', 'The whole = all the parts. Take away the parts eaten.'), { stimulus: { svg: S.fraction(b, a, b <= 8 ? 'circle' : 'rect') } }); },
    ],
    [
      (R) => { const b = R.pick([2, 3, 4, 5, 6, 10]), k = R.int(2, 9), n = b * k, a = R.chance(0.5) ? 1 : R.int(1, b - 1); const e = R.pick(SETS); return K(`of${a}_${b}_${n}`, T(`Combien font ${a}/${b} de ${n} ${e}?`, `What is ${a}/${b} of ${n} ${e}?`), a * k, T(`Partage ${n} en ${b} groupes égaux (${k} chacun), puis prends ${a} groupe${a > 1 ? 's' : ''}.`, `Split ${n} into ${b} equal groups (${k} each), then take ${a} group${a > 1 ? 's' : ''}.`)); },
      (R) => { const b = R.pick([2, 3, 4, 5, 6]), k = R.int(2, 9); const p = R.pick(['billes', 'cartes', 'autocollants']); const pe = { billes: 'marbles', cartes: 'cards', autocollants: 'stickers' }[p]; return K(`wh${b}_${k}_${p}`, T(`1/${b} de mes ${p}, c’est ${k} ${p}. Combien de ${p} ai-je en tout?`, `1/${b} of my ${pe} is ${k} ${pe}. How many ${pe} do I have in all?`), b * k, T(`Il y a ${b} parts pareilles de ${k}.`, `There are ${b} equal parts of ${k}.`)); },
      (R) => { const b = R.pick([3, 4, 5, 6, 8]), k = R.int(2, 6), n = b * k, a = R.int(1, b - 1); return K(`left${a}_${b}_${n}`, T(`Il y a ${n} crêpes. On en mange ${a}/${b}. Combien de crêpes reste-t-il?`, `There are ${n} pancakes. We eat ${a}/${b} of them. How many pancakes are left?`), n - a * k, T('Trouve d’abord 1 part, puis les parts mangées, puis enlève.', 'Find 1 part first, then the parts eaten, then subtract.')); },
      (R) => fracSetQ(R, 12),
    ],
  ]);
const FRAC_OK = (x, y) => x > 0 && x < y && !!({ 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 8: 1, 10: 1, 12: 1 })[y];

// ---------- g3m7 : comparer, fractions équivalentes ----------
const tipSameDen = T('Même dénominateur : les parts ont la même grandeur. Plus de parts = plus grand.', 'Same denominator: the parts are the same size. More parts = bigger.');
const tipUnit = T('Plus on coupe en parts, plus chaque part est petite : 1/2 > 1/4.', 'The more parts you cut, the smaller each part: 1/2 > 1/4.');
const m7 = unit('g3m7', '🍰', T('Comparer les fractions, fractions équivalentes', 'Comparing fractions, equivalent fractions'),
  'Arithmétique — comparer des fractions (même dénominateur), fractions équivalentes simples', [
    [
      (R) => { const b = R.pick([3, 4, 5, 6, 8]), [x, y] = R.sample(range(1, b - 1), 2); return CH(`bg${x}_${y}_${b}`, T('Quelle fraction est la plus grande?', 'Which fraction is bigger?'), [Math.max(x, y), Math.min(x, y)].map((a) => ({ text: frac(a, b), svg: S.fraction(b, a, 'rect') })), tipSameDen, { cols: 2 }); },
      (R) => { const b = R.pick([4, 5, 6, 8, 10]), x = R.int(1, b - 1), y = R.chance(0.15) ? x : R.int(1, b - 1); return symQ(`fs${x}_${y}_${b}`, x, y, frac(x, b), frac(y, b), tipSameDen); },
      (R) => { const [p, q] = R.sample([2, 3, 4, 6, 8], 2); return CH(`ub${p}_${q}`, T('Quelle part est la plus grande?', 'Which piece is bigger?'), [Math.min(p, q), Math.max(p, q)].map((d) => ({ text: frac(1, d), svg: S.fraction(d, 1, 'circle') })), tipUnit, { cols: 2 }); },
    ],
    [
      (R) => { const b = R.pick([5, 6, 8, 10, 12]), s = R.sample(range(1, b - 1), 3).sort((x, y) => x - y); return ORD(`of${s.join('_')}_${b}`, T('Place du plus petit au plus grand.', 'Put them in order from smallest to greatest.'), s.map((a) => frac(a, b)), tipSameDen); },
      (R) => { const [p, q] = R.sample([2, 3, 4, 5, 6, 8, 10], 2), n = 1; return symQ(`us${p}_${q}`, 1 / p, 1 / q, frac(n, p), frac(n, q), tipUnit); },
      (R) => { const b = R.pick([4, 6, 8, 10]), a = R.int(1, b - 1), half = b / 2; const s = a < half ? 0 : a > half ? 1 : 2; return { type: 'choice', key: `hf${a}_${b}`, prompt: T(`${a}/${b}, c’est…`, `${a}/${b} is…`), stimulus: { svg: S.fraction(b, a, 'rect') }, options: [tx(T('moins que la moitié', 'less than half')), tx(T('plus que la moitié', 'more than half')), tx(T('exactement la moitié', 'exactly half'))], answer: s, fixedOrder: true, cols: 1, tip: T(`La moitié de ${b} parts, c’est ${half} parts.`, `Half of ${b} parts is ${half} parts.`) }; },
    ],
    [
      (R) => { const [a, b] = R.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5]]), k = R.int(2, b <= 3 ? 4 : 2), B = b * k; return K(`eqn${a}_${b}_${k}`, T(`Complète : ${a}/${b} = ?/${B}`, `Fill in: ${a}/${b} = ?/${B}`), a * k, T(`Le bas a été multiplié par ${k}. Fais pareil avec le haut.`, `The bottom was multiplied by ${k}. Do the same to the top.`), { stimulus: { svg: S.fraction(b, a, 'rect') } }); },
      (R) => { const [a, b] = R.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4]]), k = R.int(2, 3); const A = a * k, B = b * k; return K(`eqd${A}_${B}`, T(`Complète : ${A}/${B} = ${a}/?`, `Fill in: ${A}/${B} = ${a}/?`), b, T(`Le haut a été divisé par ${k}. Fais pareil avec le bas.`, `The top was divided by ${k}. Do the same to the bottom.`)); },
      (R) => { const [a, b] = R.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5]]), k = R.int(2, 4); const ok = [a * k, b * k]; const bad = [[a + k, b + k], [a * k, b * k + 1], [a * k + 1, b * k], [a, b * k], [a * k, b]].filter(([x, y]) => x * b !== y * a && x < y); return CH(`eqc${a}_${b}_${k}_${R.int(0, 2)}`, T(`Quelle fraction est équivalente à ${a}/${b}?`, `Which fraction is equivalent to ${a}/${b}?`), uniqT([ok, ...R.shuffle(bad)].map(([x, y]) => frac(x, y))).slice(0, 4).map(tx), T('Multiplie le haut ET le bas par le même nombre.', 'Multiply the top AND the bottom by the same number.')); },
      (R) => { const b = R.pick([4, 6, 8, 10, 12]); return K(`hb${b}`, T(`La moitié d’une barre, c’est combien de ${FRAC_FR[b][1]}?`, `Half a bar is how many ${FRAC_EN[b][1]}?`), b / 2, T('La moitié de toutes les parts.', 'Half of all the parts.'), { stimulus: { svg: S.fraction(b, b / 2, 'rect') } }); },
    ],
  ]);

// ---------- g3m8 : nombres décimaux ----------
const tipTenth = T('Une barre coupée en 10 : chaque part = 1 dixième = 0,1.', 'A bar cut in 10: each part = 1 tenth = 0.1.');
const tipCent = T('100 cases : chaque case = 1 centième = 0,01. Une colonne de 10 = 0,1.', '100 squares: each one = 1 hundredth = 0.01. A column of 10 = 0.1.');
const m8 = unit('g3m8', '🪙', T('Les nombres décimaux : dixièmes et centièmes', 'Decimals: tenths and hundredths'),
  'Arithmétique — introduction aux nombres décimaux (dixièmes, centièmes), lien avec l’argent', [
    [
      (R) => { const n = R.int(1, 9); return CH(`t${n}`, T('Quelle partie de la barre est coloriée?', 'What part of the bar is coloured?'), uniqT([dec(n, 1), dec(10 - n, 1), dec(n, 2), T(`${n},${n}`, `${n}.${n}`)]).map(tx), tipTenth, { stimulus: { svg: tenthsSvg(n) } }); },
      (R) => { const n = R.int(1, 9); return CH(`tf${n}`, T(`${n}/10 s’écrit aussi…`, `${n}/10 can also be written…`), [dec(n, 1), T(`${n},10`, `${n}.10`), dec(n, 2), T(`1,${n}`, `1.${n}`)].map(tx), tipTenth); },
      (R) => { const c = R.pick([5, 10, 25, 50, 75, 20, 30, 40, 60, 70, 80, 90, 15, 35, 45, 55, 65, 85, 95]); return CH(`c${c}`, T(`${c} ¢, c’est combien en dollars?`, `${c}¢ is how much in dollars?`), [money2(c), money2(c * 10 > 999 ? c + 100 : c * 10), T(`${c},00 $`, `$${c}.00`), money2(Math.floor(c / 10))].map(tx), T('1 $ = 100 ¢. Les cents vont après la virgule : 25 ¢ = 0,25 $.', '$1 = 100¢. Cents go after the decimal point: 25¢ = $0.25.')); },
      (R) => { const w = R.int(1, 9), t = R.int(1, 9), st = T(`${w} unité${w > 1 ? 's' : ''} et ${t} dixième${t > 1 ? 's' : ''}`, `${w} one${w > 1 ? 's' : ''} and ${t} tenth${t > 1 ? 's' : ''}`); return CH(`wt${w}_${t}`, T('Quel nombre est-ce?', 'Which number is it?'), uniqT([dec(w * 10 + t, 1), dec(t * 10 + w, 1), dec(w * 100 + t, 2), T(`${w}${t}`, `${w}${t}`)]).map(tx), T('Les unités avant la virgule, les dixièmes juste après.', 'Ones before the decimal point, tenths right after.'), { stimulus: tx(st), say: SAY(st.fr, st.en) }); },
      (R) => { const n = R.int(2, 49); return K(`nt${n}`, T(`Combien de dixièmes y a-t-il en tout dans ${dec(n, 1).fr}?`, `How many tenths are there in all in ${dec(n, 1).en}?`), n, T('1 unité = 10 dixièmes. Ajoute les dixièmes après la virgule.', '1 one = 10 tenths. Add the tenths after the point.')); },
      (R) => { const k = R.pick([[10, 10], [25, 4], [5, 20]]); return K(`ct${k[0]}`, T(`Combien de pièces de ${k[0]} ¢ faut-il pour faire 1 $?`, `How many ${k[0]}¢ coins make $1?`), k[1], T('1 $ = 100 ¢.', '$1 = 100¢.'), { stimulus: { svg: S.money([k[0], k[0], k[0]]) } }); },
    ],
    [
      (R) => { const n = R.int(1, 99); return CH(`h${n}`, T('Quelle partie de la grille est coloriée?', 'What part of the grid is coloured?'), [dec(n, 2), dec(n % 10 === 0 ? n / 10 : n + 10 > 99 ? n - 10 : n + 10, 2), T(`${n}`, `${n}`), dec(Math.max(1, Math.floor(n / 10)), 1)].map(tx), tipCent, { stimulus: { svg: hundredSvg(n) } }); },
      (R) => { const v = R.int(101, 999), pos = R.int(0, 2), ds = [Math.floor(v / 100), Math.floor(v / 10) % 10, v % 10]; const names = [T('des unités', 'ones'), T('des dixièmes', 'tenths'), T('des centièmes', 'hundredths')]; const ans = ds[pos]; const pool = [...new Set([...ds, 0, ans + 1].filter((x) => x !== ans && x <= 9))]; return CH(`dp${v}_${pos}`, T(`Dans ${dec(v, 2).fr}, quel est le chiffre ${names[pos].fr}?`, `In ${dec(v, 2).en}, which digit is in the ${names[pos].en} place?`), [ans, ...R.sample(pool, 3)].map((x) => tx(String(x))), T('Après la virgule : dixièmes, puis centièmes.', 'After the decimal point: tenths, then hundredths.')); },
      (R) => { const items = R.sample([200, 100, 100, 25, 25, 25, 10, 10, 5, 5, 500], R.int(3, 5)).sort((a, b) => b - a); const c = items.reduce((a, b) => a + b, 0); return NQ(R, `mo${items.join('_')}`, T('Combien d’argent y a-t-il? (en dollars)', 'How much money is there? (in dollars)'), c, [c + 10, c - 10, c + 25, c - 5, c + 100, c - 25], T('Commence par les dollars, puis ajoute les cents.', 'Start with the dollars, then add the cents.'), { stimulus: { svg: S.money(items) }, fmt: money2, valid: (v) => v > 0 }); },
      (R) => { const n = R.int(1, 9) * 10; return CH(`tc${n}`, T(`${dec(n / 10, 1).fr} = combien de centièmes?`, `${dec(n / 10, 1).en} = how many hundredths?`), [n, n / 10, n * 10, 100 - n].filter((v, i, a) => a.indexOf(v) === i).map((v) => tx(String(v))), T('1 dixième = 10 centièmes.', '1 tenth = 10 hundredths.')); },
    ],
    [
      (R) => { const a = R.int(1, 9), b = R.int(10, 99); const A = a * 10, B = b; if (A === B) return CH(`dc${a}`, T('Lequel est le plus grand?', 'Which is greater?'), [dec(a + 1, 1), dec(a, 1)].map(tx), T('Compare les dixièmes.', 'Compare the tenths.'), { cols: 2 }); return symQ(`ds${a}_${b}`, A, B, dec(a, 1), dec(b, 2), T('Écris les deux avec 2 chiffres après la virgule : 0,5 = 0,50.', 'Write both with 2 digits after the point: 0.5 = 0.50.')); },
      (R) => { const s = R.sample(range(1, 99), 4).sort((x, y) => x - y); return ORD(`od${s.join('_')}`, T('Place du plus petit au plus grand.', 'Put them in order from smallest to greatest.'), s.map((v) => (v % 10 === 0 && R.chance(0.5) ? dec(v / 10, 1) : dec(v, 2))), T('Compare d’abord les dixièmes, puis les centièmes.', 'Compare the tenths first, then the hundredths.')); },
      (R) => { const a = R.int(1, 19) * 25 + 100, b = R.int(1, 15) * 5 + R.pick([0, 100]); const s = a + b; return NQ(R, `ad${a}_${b}`, T(`${money2(a).fr} + ${money2(b).fr} = ?`, `${money2(a).en} + ${money2(b).en} = ?`), s, [s + 10, s - 10, s + 100, s - 5, s + 5, a + b * 10], T('Additionne les dollars, puis les cents. 100 ¢ = 1 $ de plus.', 'Add the dollars, then the cents. 100¢ = $1 more.'), { fmt: money2, valid: (v) => v > 0 }); },
      (R) => { const w = R.int(1, 9), t = R.int(0, 9), h = R.int(1, 9); const v = w * 100 + t * 10 + h; const st = T(`${w} unité${w > 1 ? 's' : ''}, ${t} dixième${t > 1 ? 's' : ''}, ${h} centième${h > 1 ? 's' : ''}`, `${w} one${w > 1 ? 's' : ''}, ${t} tenth${t !== 1 ? 's' : ''}, ${h} hundredth${h > 1 ? 's' : ''}`); return CH(`cp${v}`, T('Quel nombre est-ce?', 'Which number is it?'), uniqT([dec(v, 2), dec(w * 100 + h * 10 + t, 2), dec(w * 1000 + t * 100 + h, 2), dec(t * 100 + h * 10 + w, 2)]).map(tx), T('Unités, virgule, dixièmes, centièmes.', 'Ones, decimal point, tenths, hundredths.'), { stimulus: tx(st), say: SAY(st.fr, st.en) }); },
    ],
  ]);

export const units = [m1, m2, m3, m4, m5, m6, m7, m8];
