// Mathématique 3e année — Opérations (g3m9 → g3m17)
import { uniqT, S, T, NB, NBe, NT, K, CH, NQ, TQ, YN, tx, unit, range, PEOPLE, il, Il, he, He, his } from './math-lib.js';

const ex = (a, op, b) => T(`${NB(a)} ${op} ${NB(b)}`, `${NBe(a)} ${op} ${NBe(b)}`);
const colCarries = (a, b) => { let x = a, y = b, c = 0, n = 0; while (x > 0 || y > 0) { const s = (x % 10) + (y % 10) + c; c = s > 9 ? 1 : 0; n += c; x = Math.floor(x / 10); y = Math.floor(y / 10); } return n; };
const colBorrows = (a, b) => { let x = a, y = b, br = 0, n = 0; while (y > 0 || br) { const d = (x % 10) - br - (y % 10); br = d < 0 ? 1 : 0; n += br; x = Math.floor(x / 10); y = Math.floor(y / 10); if (!x && !y) break; } return n; };
const bugAdd = (a, b) => { let r = 0, m = 1, x = a, y = b; while (x > 0 || y > 0) { r += ((x % 10) + (y % 10)) % 10 * m; m *= 10; x = Math.floor(x / 10); y = Math.floor(y / 10); } return r; };
const bugSub = (a, b) => { let r = 0, m = 1, x = a, y = b; while (x > 0 || y > 0) { r += Math.abs((x % 10) - (y % 10)) * m; m *= 10; x = Math.floor(x / 10); y = Math.floor(y / 10); } return r; };
function pickPair(R, genA, genB, ok) { for (let g = 0; g < 300; g++) { const a = genA(), b = genB(); if (ok(a, b)) return [a, b]; } return [genA(), genB()]; }

// ---------- g3m9 : addition ----------
const tipAdd = T('Pose l’addition en colonnes. Commence par les unités. Si ça dépasse 9, fais une retenue!', 'Line up the columns. Start with the ones. If it goes past 9, carry 1!');
const m9 = unit('g3m9', '➕', T('Addition jusqu’à 4 chiffres', 'Adding up to 4 digits'),
  'Arithmétique — addition de nombres naturels (4 chiffres), avec retenues', [
    [
      (R) => { const [a, b] = pickPair(R, () => R.int(101, 899), () => R.int(101, 899), (a, b) => colCarries(a, b) === 1 && a + b < 1000); return K(`a${a}_${b}`, T('Calcule.', 'Work it out.'), a + b, tipAdd, { stimulus: tx(ex(a, '+', b)) }); },
      (R) => { const [a, b] = pickPair(R, () => R.int(1001, 8999), () => R.int(100, 999), (a, b) => colCarries(a, b) === 0); return K(`a${a}_${b}`, T('Calcule.', 'Work it out.'), a + b, T('Additionne chaque colonne : unités avec unités, dizaines avec dizaines…', 'Add each column: ones with ones, tens with tens…'), { stimulus: tx(ex(a, '+', b)) }); },
      (R) => { const a = R.int(1001, 6999), k = R.int(1, 2) * 1000 + R.pick([0, 100, 200, 500]); return K(`ak${a}_${k}`, T('Calcule dans ta tête.', 'Work it out in your head.'), a + k, T('Ajoute d’abord les milliers, puis les centaines.', 'Add the thousands first, then the hundreds.'), { stimulus: tx(ex(a, '+', k)) }); },
    ],
    [
      (R) => { const [a, b] = pickPair(R, () => R.int(1001, 6999), () => R.int(1001, 2999), (a, b) => colCarries(a, b) >= 2 && a + b <= 9999); return K(`a${a}_${b}`, T('Calcule.', 'Work it out.'), a + b, tipAdd, { stimulus: tx(ex(a, '+', b)) }); },
      (R) => { const a = R.int(101, 999), b = R.int(101, 999), c = R.int(101, 999); return K(`a3_${a}_${b}_${c}`, T('Calcule la somme des trois nombres.', 'Add the three numbers.'), a + b + c, T('Additionne deux nombres, puis ajoute le troisième. Ou pose les trois en colonnes.', 'Add two numbers, then add the third. Or line up all three in columns.'), { stimulus: tx(T(`${a} + ${b} + ${c}`, `${a} + ${b} + ${c}`)) }); },
      (R) => { const [a, b] = pickPair(R, () => R.int(1001, 6999), () => R.int(1001, 2999), (a, b) => colCarries(a, b) >= 2 && a + b <= 9999); const s = a + b; return NQ(R, `ac${a}_${b}`, T('Quelle réponse est la bonne?', 'Which answer is right?'), s, [bugAdd(a, b), s + 10, s - 100, s + 1000, s - 10], T('Vérifie les retenues : as-tu ajouté le 1 dans la colonne suivante?', 'Check the carries: did you add the 1 to the next column?'), { stimulus: tx(ex(a, '+', b)), valid: (v) => v > 0 && v <= 9999 }); },
    ],
    [
      (R) => { const b = R.int(1001, 5999), s = R.pick([R.int(5, 9) * 1000, R.int(60, 99) * 100, R.int(6001, 9999)]); if (s <= b) return K(`m${b}`, T(`Quel nombre faut-il ajouter à ${NB(b)} pour obtenir ${NB(b + 1234)}?`, `What must you add to ${NBe(b)} to get ${NBe(b + 1234)}?`), 1234, T('Fais la soustraction : total − partie connue.', 'Subtract: total − known part.')); return K(`m${b}_${s}`, T(`? + ${NB(b)} = ${NB(s)}. Quel nombre manque?`, `? + ${NBe(b)} = ${NBe(s)}. Which number is missing?`), s - b, T('Le nombre manquant = total − nombre connu. Vérifie en additionnant.', 'Missing number = total − known number. Check by adding.')); },
      (R) => { const [a, b] = pickPair(R, () => R.int(1001, 6999), () => R.int(1001, 2999), (a, b) => colCarries(a, b) === 3 && a + b <= 9999); return K(`a${a}_${b}`, T('Calcule. Attention aux 3 retenues!', 'Work it out. Watch the 3 carries!'), a + b, tipAdd, { stimulus: tx(ex(a, '+', b)) }); },
      (R) => { const p = R.pick(PEOPLE), a = R.int(1001, 3999), b = R.int(1001, 2999), c = R.int(101, 999); return K(`wp${a}_${b}_${c}`, T(`Les élèves de l’école ${p.n === 'Léa' ? 'des Érables' : 'du Boisé'} ramassent des canettes : ${NB(a)} en septembre, ${NB(b)} en octobre et ${NB(c)} en novembre. Combien en tout?`, `The students at school collect cans: ${NBe(a)} in September, ${NBe(b)} in October and ${NBe(c)} in November. How many in all?`), a + b + c, T('Additionne les trois nombres en colonnes.', 'Add the three numbers in columns.')); },
      (R) => { const a = R.int(1001, 4999), b = R.int(1001, 4999); const s = a + b, wrong = s + R.pick([10, 100, -10, -100, 1000]); const show = R.chance(0.5) ? s : wrong; return YN(`ok${a}_${b}_${show}`, T(`${NB(a)} + ${NB(b)} = ${NB(show)}. Est-ce juste?`, `${NBe(a)} + ${NBe(b)} = ${NBe(show)}. Is it right?`), show === s, T('Vérifie avec la soustraction : la somme − un nombre = l’autre nombre.', 'Check with subtraction: sum − one number = the other number.')); },
    ],
  ]);

// ---------- g3m10 : soustraction ----------
const tipSub = T('Commence par les unités. Si le chiffre du haut est trop petit, emprunte 1 dizaine (ou centaine) à gauche.', 'Start with the ones. If the top digit is too small, borrow 1 ten (or hundred) from the left.');
const m10 = unit('g3m10', '➖', T('Soustraction jusqu’à 4 chiffres', 'Subtracting up to 4 digits'),
  'Arithmétique — soustraction de nombres naturels (4 chiffres), avec emprunts', [
    [
      (R) => { const [a, b] = pickPair(R, () => R.int(201, 999), () => R.int(101, 899), (a, b) => a > b && colBorrows(a, b) === 1); return K(`s${a}_${b}`, T('Calcule.', 'Work it out.'), a - b, tipSub, { stimulus: tx(ex(a, '−', b)) }); },
      (R) => { const [a, b] = pickPair(R, () => R.int(2001, 9999), () => R.int(1001, 8999), (a, b) => a > b && colBorrows(a, b) === 0); return K(`s${a}_${b}`, T('Calcule.', 'Work it out.'), a - b, T('Soustrais chaque colonne, de droite à gauche.', 'Subtract each column, from right to left.'), { stimulus: tx(ex(a, '−', b)) }); },
      (R) => { const a = R.int(3001, 9999), k = R.int(1, 2) * 1000 + R.pick([0, 100, 200]); return K(`sk${a}_${k}`, T('Calcule dans ta tête.', 'Work it out in your head.'), a - k, T('Enlève d’abord les milliers, puis les centaines.', 'Take away the thousands first, then the hundreds.'), { stimulus: tx(ex(a, '−', k)) }); },
    ],
    [
      (R) => { const [a, b] = pickPair(R, () => R.int(2001, 9999), () => R.int(1001, 8999), (a, b) => a > b && colBorrows(a, b) >= 2); return K(`s${a}_${b}`, T('Calcule.', 'Work it out.'), a - b, tipSub, { stimulus: tx(ex(a, '−', b)) }); },
      (R) => { const [a, b] = pickPair(R, () => R.int(2001, 9999), () => R.int(1001, 8999), (a, b) => a > b && colBorrows(a, b) >= 1); const d = a - b; return CH(`chk${a}_${b}`, T(`${NB(a)} − ${NB(b)} = ${NB(d)}. Quelle addition le vérifie?`, `${NBe(a)} − ${NBe(b)} = ${NBe(d)}. Which addition checks it?`), [T(`${NB(d)} + ${NB(b)} = ${NB(a)}`, `${NBe(d)} + ${NBe(b)} = ${NBe(a)}`), T(`${NB(a)} + ${NB(b)} = ${NB(a + b)}`, `${NBe(a)} + ${NBe(b)} = ${NBe(a + b)}`), T(`${NB(d)} + ${NB(a)} = ${NB(a + d)}`, `${NBe(d)} + ${NBe(a)} = ${NBe(a + d)}`)].map(tx), T('Réponse + nombre enlevé = nombre de départ.', 'Answer + number taken away = starting number.'), { cols: 1 }); },
      (R) => { const [a, b] = pickPair(R, () => R.int(2001, 9999), () => R.int(1001, 8999), (a, b) => a > b && colBorrows(a, b) >= 1 && bugSub(a, b) !== a - b); const d = a - b; return NQ(R, `sc${a}_${b}`, T('Quelle réponse est la bonne?', 'Which answer is right?'), d, [bugSub(a, b), d + 10, d - 100, d + 100, d + 1000], T('On ne fait jamais « petit chiffre − grand chiffre » à l’envers : on emprunte!', 'Never flip “small digit − big digit”: borrow instead!'), { stimulus: tx(ex(a, '−', b)), valid: (v) => v > 0 }); },
    ],
    [
      (R) => { const a = R.pick([R.int(2, 9) * 1000, R.int(2, 9) * 1000 + R.int(1, 9), R.int(2, 9) * 1000 + R.int(1, 9) * 100, R.int(2, 9) * 1000 + R.int(1, 9) * 10]), b = R.int(1001, a - 100); return K(`sz${a}_${b}`, T('Calcule. Attention aux zéros!', 'Work it out. Watch the zeros!'), a - b, T('Pour emprunter à travers les zéros : 5 000 = 4 centaines de dizaines… pense 4 999 + 1.', 'Borrowing across zeros: think of 5,000 as 4,999 + 1.'), { stimulus: tx(ex(a, '−', b)) }); },
      (R) => { const a = R.int(3001, 9999), b = R.int(1001, a - 500); return K(`ms${a}_${b}`, T(`${NB(a)} − ? = ${NB(a - b)}. Quel nombre manque?`, `${NBe(a)} − ? = ${NBe(a - b)}. Which number is missing?`), b, T('Le nombre enlevé = départ − reste.', 'Number taken away = start − what is left.')); },
      (R) => { const p = R.pick(PEOPLE), a = R.int(30, 99) * 100 + R.int(0, 99), b = R.int(1001, a - 500); return K(`wps${a}_${b}`, T(`Le camp de jour a ${NB(a)} $ pour l’été. Il dépense ${NB(b)} $ pour les sorties. Combien d’argent reste-t-il?`, `The day camp has $${NBe(a)} for the summer. It spends $${NBe(b)} on outings. How much money is left?`), a - b, T('Il reste = départ − dépense.', 'Left = start − spent.')); },
      (R) => { const a = R.int(1001, 9999), b = R.int(1001, 9999); if (a === b) return K(`df${a}`, T(`Quelle est la différence entre ${NB(a)} et ${NB(a + 999)}?`, `What is the difference between ${NBe(a)} and ${NBe(a + 999)}?`), 999, tipSub); return K(`df${a}_${b}`, T(`Quel est l’écart entre ${NB(Math.max(a, b))} et ${NB(Math.min(a, b))}?`, `What is the difference between ${NBe(Math.max(a, b))} and ${NBe(Math.min(a, b))}?`), Math.abs(a - b), T('L’écart = le plus grand − le plus petit.', 'Difference = greater − smaller.')); },
    ],
  ]);

// ---------- g3m11 : sens de la multiplication ----------
const OBJ = ['🍎', '⭐', '🐟', '🎈', '🍪', '🌸', '🐞', '⚽', '🧁', '🦋', '🍓', '🏒'];
const tipGroups = T('Groupes égaux : nombre de groupes × nombre dans chaque groupe.', 'Equal groups: number of groups × number in each group.');
const LEGS = [['chats', 'cats', 4, '🐈'], ['araignées', 'spiders', 8, '🕷️'], ['oiseaux', 'birds', 2, '🐦'], ['fourmis', 'ants', 6, '🐜'], ['chevaux', 'horses', 4, '🐴'], ['canards', 'ducks', 2, '🦆']];
const WHEELS = [['vélos', 'bikes', 2, '🚲'], ['tricycles', 'tricycles', 3, '🛺'], ['autos', 'cars', 4, '🚗']];
const m11 = unit('g3m11', '🍪', T('Le sens de la multiplication', 'What multiplication means'),
  'Arithmétique — sens de la multiplication : groupes égaux, disposition rectangulaire, addition répétée', [
    [
      (R) => { const g = R.int(2, 5), p = R.int(2, 6), e = R.pick(OBJ); return K(`g${g}_${p}${e}`, T(`${g} groupes de ${p}. Combien y en a-t-il en tout?`, `${g} groups of ${p}. How many are there in all?`), g * p, tipGroups, { stimulus: { svg: S.groups(g, p, e) } }); },
      (R) => { const g = R.int(2, 6), p = R.int(2, 9); const add = Array(g).fill(p).join(' + '); return TQ(`ra${g}_${p}`, T('Quelle multiplication est pareille?', 'Which multiplication is the same?'), uniqT([T(`${g} × ${p}`, `${g} × ${p}`), T(`${g} + ${p}`, `${g} + ${p}`), T(`${p} × ${p}`, `${p} × ${p}`), T(`${g + 1} × ${p}`, `${g + 1} × ${p}`), T(`${g} × ${p + 1}`, `${g} × ${p + 1}`)]).slice(0, 4), T(`On compte combien de fois on ajoute ${p}.`, `Count how many times you add ${p}.`), { stimulus: tx(add) }); },
      (R) => { const r = R.int(2, 5), c = R.int(2, 6), e = R.pick(OBJ); return K(`ar${r}_${c}${e}`, T(`${r} rangées de ${c}. Combien en tout?`, `${r} rows of ${c}. How many in all?`), r * c, T('Rangées × nombre dans chaque rangée.', 'Rows × number in each row.'), { stimulus: { svg: S.emojiGrid(r, c, e) } }); },
    ],
    [
      (R) => { const a = R.int(2, 9), b = R.int(2, 9); if (a === b) return K(`sq${a}`, T(`${a} × ${a} = ?`, `${a} × ${a} = ?`), a * a, tipGroups); return K(`cm${a}_${b}`, T(`${a} × ${b} = ${b} × ?`, `${a} × ${b} = ${b} × ?`), a, T('On peut changer l’ordre : 3 × 5 = 5 × 3.', 'You can switch the order: 3 × 5 = 5 × 3.')); },
      (R) => { const r = R.int(2, 6), c = R.int(3, 8), e = R.pick(OBJ); return TQ(`am${r}_${c}${e}`, T('Quelle multiplication décrit ce tableau?', 'Which multiplication matches this array?'), uniqT([T(`${r} × ${c}`, `${r} × ${c}`), T(`${r} + ${c}`, `${r} + ${c}`), T(`${r} × ${c + 1}`, `${r} × ${c + 1}`), T(`${r + 1} × ${c + 1}`, `${r + 1} × ${c + 1}`)]), T('Compte les rangées, puis combien dans une rangée.', 'Count the rows, then how many in one row.'), { stimulus: { svg: S.emojiGrid(r, c, e) } }); },
      (R) => { const it = R.pick(LEGS), n = R.int(2, 9); return K(`lg${it[0]}${n}`, T(`Combien de pattes ont ${n} ${it[0]}?`, `How many legs do ${n} ${it[1]} have?`), n * it[2], T(`Chaque animal a ${it[2]} pattes : ${n} × ${it[2]}.`, `Each one has ${it[2]} legs: ${n} × ${it[2]}.`), { stimulus: tx(it[3].repeat(Math.min(n, 9))) }); },
      (R) => { const it = R.pick(WHEELS), n = R.int(3, 10); return K(`wh${it[0]}${n}`, T(`Combien de roues ont ${n} ${it[0]}?`, `How many wheels do ${n} ${it[1]} have?`), n * it[2], T(`${n} groupes de ${it[2]} roues.`, `${n} groups of ${it[2]} wheels.`), { stimulus: tx(it[3]) }); },
    ],
    [
      (R) => { const a = R.int(3, 9), b = R.int(6, 9), s = R.int(2, b - 2); return K(`ds${a}_${b}_${s}`, T(`${a} × ${b} = ${a} × ${s} + ${a} × ?`, `${a} × ${b} = ${a} × ${s} + ${a} × ?`), b - s, T(`Coupe le tableau en deux morceaux : ${s} + ? = ${b}.`, `Cut the array in two: ${s} + ? = ${b}.`)); },
      (R) => { const a = R.int(2, 99), z = R.pick([0, 1]), sw = R.chance(0.5); return K(`z${a}_${z}_${sw}`, T(`${sw ? z : a} × ${sw ? a : z} = ?`, `${sw ? z : a} × ${sw ? a : z} = ?`), a * z, z === 0 ? T('Tout nombre × 0 = 0 (0 groupe, c’est rien!).', 'Any number × 0 = 0 (zero groups is nothing!).') : T('Tout nombre × 1 = le même nombre.', 'Any number × 1 = the same number.')); },
      (R) => { const a = R.int(2, 5), b = R.int(2, 5), c = R.int(2, 5); return K(`f3${a}_${b}_${c}`, T(`${a} × ${b} × ${c} = ?`, `${a} × ${b} × ${c} = ?`), a * b * c, T('Multiplie deux nombres, puis multiplie le résultat par le troisième.', 'Multiply two numbers, then multiply the answer by the third.')); },
      (R) => { const p = R.pick(PEOPLE), b = R.int(3, 8), r = R.int(3, 9); return K(`ps${p.n}${b}_${r}`, T(`${p.n} place les chaises du camp de jour en ${r} rangées de ${b} chaises. Combien de chaises en tout?`, `${p.n} sets up the day camp chairs in ${r} rows of ${b} chairs. How many chairs in all?`), r * b, tipGroups); },
      (R) => { const a = R.int(3, 9), b = R.int(3, 9), wrong = R.pick([a * b + a, a * b - b, a + b]); const show = R.chance(0.5) ? a * b : wrong; return YN(`tf${a}_${b}_${show}`, T(`Est-ce vrai? ${a} groupes de ${b} = ${show}`, `True? ${a} groups of ${b} = ${show}`), show === a * b, tipGroups); },
    ],
  ]);

// ---------- g3m12 : tables de multiplication 0–10 ----------
const TT = {
  0: T('× 0 donne toujours 0.', '× 0 is always 0.'), 1: T('× 1 ne change pas le nombre.', '× 1 does not change the number.'),
  2: T('× 2, c’est le double.', '× 2 is the double.'), 3: T('× 3 : le double, plus encore une fois le nombre.', '× 3: double it, then add the number once more.'),
  4: T('× 4 : le double du double.', '× 4: double, then double again.'), 5: T('× 5 : la moitié de × 10. Ça finit par 0 ou 5.', '× 5: half of × 10. It ends in 0 or 5.'),
  6: T('× 6 : × 5, puis ajoute le nombre une fois.', '× 6: × 5, then add the number once.'), 7: T('× 7 : × 5 plus × 2.', '× 7: × 5 plus × 2.'),
  8: T('× 8 : double, double, double!', '× 8: double, double, double!'), 9: T('× 9 : × 10, puis enlève le nombre une fois.', '× 9: × 10, then take away the number once.'),
  10: T('× 10 : ajoute un 0 à droite.', '× 10: put a 0 on the right.'),
};
function factQ(R, tables, upTo = 10) {
  const a = R.pick(tables), b = R.int(0, upTo), sw = R.chance(0.5);
  return K(`f${sw ? b : a}x${sw ? a : b}`, T('Vite! Combien?', 'Quick! How much?'), a * b, TT[a], { stimulus: tx(sw ? `${b} × ${a}` : `${a} × ${b}`) });
}
function missQ(R, tables) {
  const a = R.pick(tables), b = R.int(1, 10), sw = R.chance(0.5);
  if (a === 0) return factQ(R, tables);
  return K(`mf${a}_${b}_${sw}`, T('Quel nombre manque?', 'Which number is missing?'), b, T(`Récite la table de ${a} jusqu’à ${a * b}.`, `Count by ${a}s up to ${a * b}.`), { stimulus: tx(sw ? `? × ${a} = ${a * b}` : `${a} × ? = ${a * b}`) });
}
const m12 = unit('g3m12', '✖️', T('Tables de multiplication 0 à 10', 'Times tables 0 to 10'),
  'Arithmétique — répertoire mémorisé de la multiplication (0 × 0 à 10 × 10); essaie aussi le Défi chronométré!', [
    [
      [3, (R) => factQ(R, [0, 1, 2, 5, 10])],
      (R) => missQ(R, [2, 5, 10]),
      (R) => { const a = R.pick([2, 5, 10]), b = R.int(1, 10), p = a * b; return NQ(R, `pc${a}_${b}`, T(`${a} × ${b} = ?`, `${a} × ${b} = ?`), p, [p + a, p - a, a + b, p + 1, p - 1], TT[a], { valid: (v) => v > 0 }); },
    ],
    [
      [3, (R) => factQ(R, [3, 4, 6, 2, 5])],
      [2, (R) => missQ(R, [3, 4, 6])],
      (R) => { const a = R.pick([3, 4, 6]), b = R.int(2, 10), p = a * b; return NQ(R, `pc${a}_${b}`, T(`${a} × ${b} = ?`, `${a} × ${b} = ?`), p, [p + a, p - a, a * (b + 1) + 1, p + 2, p - 2, (a + 1) * b], TT[a], { valid: (v) => v > 0 }); },
    ],
    [
      [3, (R) => factQ(R, [7, 8, 9, 6, 4, 3])],
      [2, (R) => missQ(R, [6, 7, 8, 9])],
      (R) => { const p = R.pick([12, 16, 18, 20, 24, 30, 36, 40]), pairs = range(1, 10).filter((a) => p % a === 0 && p / a <= 10).map((a) => [a, p / a]); const [a, b] = R.pick(pairs); const bad = uniqT([[a + 1, b], [a, b + 1], [a - 1 || 2, b + 1], [b + 1, a + 1]].filter(([x, y]) => x * y !== p).map(([x, y]) => T(`${x} × ${y}`, `${x} × ${y}`))).slice(0, 3); return TQ(`sp${p}_${a}`, T(`Quelle multiplication donne ${p}?`, `Which multiplication equals ${p}?`), [T(`${a} × ${b}`, `${a} × ${b}`), ...bad], T('Pense à toutes les tables où ce nombre apparaît.', 'Think of every table where this number appears.')); },
    ],
  ]);

// ---------- g3m13 : division ----------
const tipDiv = T('Division = partager en parts égales. Pense à la multiplication : 6 × ? = 24.', 'Division = sharing equally. Think of multiplication: 6 × ? = 24.');
const m13 = unit('g3m13', '➗', T('La division', 'Division'),
  'Arithmétique — sens de la division (partage, groupement), lien avec la multiplication, reste', [
    [
      (R) => { const g = R.int(2, 5), p = R.int(2, 6), e = R.pick(OBJ); return K(`sh${g}_${p}${e}`, T(`On partage ${g * p} ${e} également entre ${g} amis. Combien chaque ami en reçoit-il?`, `${g * p} ${e} are shared equally among ${g} friends. How many does each friend get?`), p, T('Donne un objet à chaque ami, chacun son tour, jusqu’à ce qu’il n’en reste plus.', 'Give one to each friend in turn until none are left.'), { stimulus: { svg: S.groups(g, p, e) } }); },
      (R) => { const g = R.int(2, 6), p = R.pick([2, 3, 4, 5]), e = R.pick(OBJ); return K(`gp${g}_${p}${e}`, T(`Il y a ${g * p} ${e}. On fait des groupes de ${p}. Combien de groupes?`, `There are ${g * p} ${e}. We make groups of ${p}. How many groups?`), g, T(`Combien de fois ${p} entre dans ${g * p}?`, `How many times does ${p} fit into ${g * p}?`), { stimulus: { emojis: e, count: g * p } }); },
      (R) => { const a = R.int(1, 5), b = R.int(1, 5); return K(`d${a * b}_${a}`, T(`${a * b} ÷ ${a} = ?`, `${a * b} ÷ ${a} = ?`), b, tipDiv); },
    ],
    [
      [2, (R) => { const a = R.int(2, 10), b = R.int(1, 10); return K(`d${a * b}_${a}`, T(`${a * b} ÷ ${a} = ?`, `${a * b} ÷ ${a} = ?`), b, T(`Cherche dans la table de ${a} : ${a} × ? = ${a * b}.`, `Look in the ${a} times table: ${a} × ? = ${a * b}.`)); }],
      (R) => { const a = R.int(2, 9), b = R.int(2, 9), p = a * b; return TQ(`fam${p}_${a}`, T(`Quelle multiplication aide à calculer ${p} ÷ ${a}?`, `Which multiplication helps you work out ${p} ÷ ${a}?`), uniqT([T(`${a} × ${b} = ${p}`, `${a} × ${b} = ${p}`), T(`${a} + ${b} = ${a + b}`, `${a} + ${b} = ${a + b}`), T(`${p} × ${a} = ${p * a}`, `${p} × ${a} = ${p * a}`), T(`${a} × ${b + 1} = ${a * (b + 1)}`, `${a} × ${b + 1} = ${a * (b + 1)}`)]), tipDiv, { cols: 2 }); },
      (R) => { const a = R.int(2, 9), b = R.int(2, 10); return K(`md${a}_${b}`, T(`? ÷ ${a} = ${b}. Quel nombre manque?`, `? ÷ ${a} = ${b}. Which number is missing?`), a * b, T('Le nombre de départ = parts × taille de chaque part.', 'Starting number = parts × size of each part.')); },
      (R) => { const p = R.pick(PEOPLE), g = R.int(3, 8), k = R.int(3, 9); return K(`tm${p.n}${g}_${k}`, T(`Au camp de jour, ${g * k} enfants forment ${g} équipes égales. Combien d’enfants par équipe?`, `At day camp, ${g * k} children form ${g} equal teams. How many children per team?`), k, tipDiv); },
    ],
    [
      (R) => { const d = R.int(2, 9), q = R.int(2, 9), r = R.int(1, d - 1); return K(`r${d * q + r}_${d}`, T(`${d * q + r} ÷ ${d} = ${q} reste ?`, `${d * q + r} ÷ ${d} = ${q} remainder ?`), r, T(`${d} × ${q} = ${d * q}. Ce qui dépasse, c’est le reste.`, `${d} × ${q} = ${d * q}. What is left over is the remainder.`)); },
      (R) => { const d = R.int(2, 9), q = R.int(2, 9), r = R.int(1, d - 1); return K(`q${d * q + r}_${d}`, T(`${d * q + r} ÷ ${d} = ? reste ${r}`, `${d * q + r} ÷ ${d} = ? remainder ${r}`), q, T('Trouve le plus grand multiple qui ne dépasse pas le nombre.', 'Find the greatest multiple that does not go past the number.')); },
      (R) => { const per = R.int(3, 6), cars = R.int(3, 7), extra = R.int(1, per - 1), n = per * cars + extra; return K(`up${per}_${n}`, T(`${n} enfants vont à la cabane à sucre. Chaque auto peut prendre ${per} enfants. Combien d’autos faut-il au minimum?`, `${n} children are going to the sugar shack. Each car can take ${per} children. How many cars are needed at least?`), cars + 1, T('Les enfants qui restent ont besoin d’une auto de plus!', 'The children left over need one more car!')); },
      (R) => { const per = R.int(4, 8), boxes = R.int(3, 9), extra = R.int(1, per - 1), n = per * boxes + extra; return K(`dn${per}_${n}`, T(`On range ${n} muffins dans des boîtes de ${per}. Combien de boîtes pleines peut-on remplir?`, `We pack ${n} muffins into boxes of ${per}. How many full boxes can we fill?`), boxes, T('Seulement les boîtes complètement pleines comptent : on oublie le reste.', 'Only completely full boxes count: forget the remainder.')); },
    ],
  ]);

// ---------- g3m14 : 2 chiffres × 1 chiffre ----------
const tipMul2 = T('Décompose : 24 × 3 = 20 × 3 + 4 × 3 = 60 + 12.', 'Break it up: 24 × 3 = 20 × 3 + 4 × 3 = 60 + 12.');
const m14 = unit('g3m14', '🧮', T('Multiplier un nombre à 2 chiffres', 'Multiplying a 2-digit number'),
  'Arithmétique — multiplication d’un nombre à 2 chiffres par un nombre à 1 chiffre', [
    [
      (R) => { const t = R.int(1, 9) * 10, b = R.int(2, 9), sw = R.chance(0.5); return K(`t${t}_${b}_${sw}`, T('Calcule.', 'Work it out.'), t * b, T(`${t / 10} × ${b} = ${t / 10 * b}, puis ajoute un 0.`, `${t / 10} × ${b} = ${t / 10 * b}, then add a 0.`), { stimulus: tx(sw ? `${b} × ${t}` : `${t} × ${b}`) }); },
      (R) => { const b = R.int(2, 4), t = R.int(1, Math.floor(9 / b)), u = R.int(0, Math.floor(9 / b)), n = t * 10 + u; return K(`n${n}_${b}`, T('Calcule.', 'Work it out.'), n * b, T('Multiplie les unités, puis les dizaines.', 'Multiply the ones, then the tens.'), { stimulus: tx(`${n} × ${b}`) }); },
      (R) => { const n = R.int(11, 30), b = R.int(2, 3); return K(`db${n}_${b}`, T(b === 2 ? `Quel est le double de ${n}?` : `Quel est le triple de ${n}?`, b === 2 ? `What is double ${n}?` : `What is triple ${n}?`), n * b, b === 2 ? T('Le double = × 2.', 'Double = × 2.') : T('Le triple = × 3.', 'Triple = × 3.')); },
    ],
    [
      [2, (R) => { const n = R.int(12, 99), b = R.int(2, 9); return K(`n${n}_${b}`, T('Calcule.', 'Work it out.'), n * b, tipMul2, { stimulus: tx(`${n} × ${b}`) }); }],
      (R) => { const t = R.int(1, 9), u = R.int(1, 9), b = R.int(2, 9); return TQ(`dc${t}${u}_${b}`, T(`Comment décomposer ${t * 10 + u} × ${b}?`, `How can you break up ${t * 10 + u} × ${b}?`), uniqT([T(`${t * 10} × ${b} + ${u} × ${b}`, `${t * 10} × ${b} + ${u} × ${b}`), T(`${t * 10} × ${b} + ${u}`, `${t * 10} × ${b} + ${u}`), T(`${t} × ${b} + ${u} × ${b}`, `${t} × ${b} + ${u} × ${b}`), T(`${t * 10} + ${u} × ${b}`, `${t * 10} + ${u} × ${b}`)]), tipMul2, { cols: 1 }); },
      (R) => { const n = R.int(12, 49), b = R.int(2, 9); const p = n * b; return K(`pp${n}_${b}`, T(`${n} × ${b} = ${Math.floor(n / 10) * 10 * b} + ?`, `${n} × ${b} = ${Math.floor(n / 10) * 10 * b} + ?`), (n % 10) * b, T('Il manque les unités × le multiplicateur.', 'The ones × the multiplier are missing.')); },
    ],
    [
      (R) => { const n = R.int(23, 99), b = R.int(3, 9), p = n * b; const t = Math.floor(n / 10), u = n % 10; return NQ(R, `bc${n}_${b}`, T(`${n} × ${b} = ?`, `${n} × ${b} = ?`), p, [t * b * 10 + (u * b) % 10, p + 10, p - 10, t * b * 10 + u * b + 100, (t * 10) * b + u], T('N’oublie pas la retenue des unités!', 'Don’t forget to carry from the ones!'), { valid: (v) => v > 0 }); },
      (R) => { const it = R.pick([['boîtes de 24 œufs', 'boxes of 24 eggs', 24], ['paquets de 36 cartes de hockey', 'packs of 36 hockey cards', 36], ['caisses de 48 canettes', 'crates of 48 cans', 48], ['rangées de 15 érables', 'rows of 15 maple trees', 15], ['sacs de 25 bonbons', 'bags of 25 candies', 25]]), b = R.int(3, 9); return K(`ct${it[2]}_${b}`, T(`Il y a ${b} ${it[0]}. Combien en tout?`, `There are ${b} ${it[1]}. How many in all?`), it[2] * b, tipMul2); },
      (R) => { const a = R.int(12, 99), b = R.int(2, 9), c = R.int(12, 99), d = R.int(2, 9); if (a * b === c * d) return K(`n${a}_${b}`, T('Calcule.', 'Work it out.'), a * b, tipMul2, { stimulus: tx(`${a} × ${b}`) }); return CH(`cp${a}_${b}_${c}_${d}`, T('Quel produit est le plus grand?', 'Which product is greater?'), (a * b > c * d ? [[a, b], [c, d]] : [[c, d], [a, b]]).map(([x, y]) => tx(`${x} × ${y}`)), T('Estime d’abord, puis calcule si c’est serré.', 'Estimate first, then calculate if it’s close.'), { cols: 2 }); },
      (R) => { const n = R.int(12, 99), b = R.int(2, 9), p = n * b; return K(`mn${n}_${b}`, T(`${b} × ? = ${p}. Quel nombre manque? (indice : il a 2 chiffres)`, `${b} × ? = ${p}. Which number is missing? (hint: it has 2 digits)`), n, T(`Essaie des dizaines : ${b} × 10, ${b} × 20… puis ajuste.`, `Try tens: ${b} × 10, ${b} × 20… then adjust.`)); },
    ],
  ]);

// ---------- g3m15 : calcul mental ----------
const m15 = unit('g3m15', '🧠', T('Calcul mental : mes stratégies', 'Mental math strategies'),
  'Arithmétique — calcul mental : stratégies (compensation, doubles, décomposition, × 10, × 100)', [
    [
      (R) => { const n = R.int(1000, 8999), k = R.pick([10, 100, 1000]), add = R.chance(0.5); return K(`pm${n}_${k}_${add}`, T('Calcule dans ta tête.', 'Work it out in your head.'), add ? n + k : n - k, T(`± ${NB(k)} : un seul chiffre change (celui des ${k === 10 ? 'dizaines' : k === 100 ? 'centaines' : 'milliers'}).`, `± ${NBe(k)}: only one digit changes.`), { stimulus: tx(T(`${NB(n)} ${add ? '+' : '−'} ${NB(k)}`, `${NBe(n)} ${add ? '+' : '−'} ${NBe(k)}`)) }); },
      (R) => { const n = R.int(11, 50), dbl = R.chance(0.5); return dbl ? K(`d${n}`, T(`Le double de ${n}?`, `Double ${n}?`), 2 * n, T('Double les dizaines, puis les unités : 37 → 60 + 14.', 'Double the tens, then the ones: 37 → 60 + 14.')) : K(`h${2 * n}`, T(`La moitié de ${2 * n}?`, `Half of ${2 * n}?`), n, T('Partage en deux : la moitié des dizaines, puis des unités.', 'Split in two: half the tens, then half the ones.')); },
      (R) => { const n = R.int(1, 19) * 5; return K(`c100_${n}`, T(`${n} + ? = 100`, `${n} + ? = 100`), 100 - n, T('Va à la prochaine dizaine, puis jusqu’à 100.', 'Go to the next ten, then up to 100.')); },
    ],
    [
      (R) => { const a = R.int(21, 89), k = R.pick([9, 19, 29, 39, 11, 21, 31]), add = R.chance(0.6); const n = add ? a : a + 50; const r = add ? n + k : n - k; const near = k % 10 === 9 ? k + 1 : k - 1; return K(`cp${n}_${k}_${add}`, T('Calcule dans ta tête.', 'Work it out in your head.'), r, T(`${k} est près de ${near} : calcule avec ${near}, puis corrige de 1.`, `${k} is close to ${near}: use ${near}, then fix by 1.`), { stimulus: tx(`${n} ${add ? '+' : '−'} ${k}`) }); },
      (R) => { const n = R.int(2, 99), k = R.pick([10, 100]); return K(`x${n}_${k}`, T('Calcule dans ta tête.', 'Work it out in your head.'), n * k, k === 10 ? T('× 10 : ajoute un 0.', '× 10: add one 0.') : T('× 100 : ajoute deux 0.', '× 100: add two 0s.'), { stimulus: tx(`${n} × ${k}`) }); },
      (R) => { const n = R.int(1, 19) * 50; return K(`c1k${n}`, T(`${NB(n)} + ? = 1 000`, `${NBe(n)} + ? = 1,000`), 1000 - n, T('Va à la prochaine centaine, puis jusqu’à 1 000.', 'Go to the next hundred, then up to 1,000.')); },
      (R) => { const n = R.int(12, 49), d = R.pick([1, -1]); return K(`nd${n}_${d}`, T('Calcule dans ta tête.', 'Work it out in your head.'), 2 * n + d, T(`Presque un double : ${n} + ${n} = ${2 * n}, puis ajuste.`, `Near double: ${n} + ${n} = ${2 * n}, then adjust.`), { stimulus: tx(`${n} + ${n + d}`) }); },
    ],
    [
      (R) => { const n = R.int(6, 49) * 2; return K(`x5_${n}`, T('Calcule dans ta tête.', 'Work it out in your head.'), n * 5, T('× 5 = × 10, puis la moitié.', '× 5 = × 10, then half.'), { stimulus: tx(`${n} × 5`) }); },
      (R) => { const n = R.int(11, 40); return K(`x4_${n}`, T('Calcule dans ta tête.', 'Work it out in your head.'), n * 4, T('× 4 = le double du double.', '× 4 = double, then double again.'), { stimulus: tx(`${n} × 4`) }); },
      (R) => { const n = R.int(2, 99) * 10; return K(`dv${n}`, T('Calcule dans ta tête.', 'Work it out in your head.'), n / 10, T('÷ 10 : enlève le 0 à la fin.', '÷ 10: remove the 0 at the end.'), { stimulus: tx(T(`${NB(n)} ÷ 10`, `${NBe(n)} ÷ 10`)) }); },
      (R) => { const a = R.int(21, 89), b = R.int(11, 59) * 1, k = b % 10 === 0 ? b + 9 : b; const near = Math.ceil(k / 10) * 10; return TQ(`st${a}_${k}`, T(`Quelle stratégie marche pour ${a} + ${k}?`, `Which strategy works for ${a} + ${k}?`), uniqT([T(`${a} + ${near} − ${near - k}`, `${a} + ${near} − ${near - k}`), T(`${a} + ${near} + ${near - k}`, `${a} + ${near} + ${near - k}`), T(`${a} − ${near} + ${near - k}`, `${a} − ${near} + ${near - k}`)]), T('Si tu ajoutes trop, il faut enlever le surplus.', 'If you add too much, take the extra away.'), { cols: 1 }); },
      (R) => { const k = R.int(2, 9) * 4; return K(`q25_${k}`, T('Calcule dans ta tête.', 'Work it out in your head.'), 25 * k, T('4 × 25 = 100. Compte les groupes de 4.', '4 × 25 = 100. Count the groups of 4.'), { stimulus: tx(`25 × ${k}`) }); },
    ],
  ]);

// ---------- g3m16 : priorité des opérations ----------
const tipPar = T('On calcule toujours d’abord ce qui est entre parenthèses.', 'Always work out what is in brackets first.');
const tipPrio = T('Sans parenthèses : × et ÷ d’abord, ensuite + et −.', 'No brackets: × and ÷ first, then + and −.');
const m16 = unit('g3m16', '🚦', T('L’ordre des opérations', 'Order of operations'),
  'Arithmétique — priorité des opérations (parenthèses, × et ÷ avant + et −), cas simples', [
    [
      (R) => { const a = R.int(1, 9), b = R.int(1, 9), c = R.int(2, 5); return K(`p1${a}_${b}_${c}`, T('Calcule.', 'Work it out.'), (a + b) * c, tipPar, { stimulus: tx(`(${a} + ${b}) × ${c}`) }); },
      (R) => { const a = R.int(2, 5), b = R.int(1, 5), c = R.int(1, 5); return K(`p2${a}_${b}_${c}`, T('Calcule.', 'Work it out.'), a * (b + c), tipPar, { stimulus: tx(`${a} × (${b} + ${c})`) }); },
      (R) => { const b = R.int(1, 9), c = R.int(1, 9), a = b + c + R.int(0, 20); return K(`p3${a}_${b}_${c}`, T('Calcule.', 'Work it out.'), a - (b + c), tipPar, { stimulus: tx(`${a} − (${b} + ${c})`) }); },
      (R) => { const b = R.int(1, 9), a = b + R.int(1, 9), c = R.int(2, 9); return K(`p4${a}_${b}_${c}`, T('Calcule.', 'Work it out.'), (a - b) * c, tipPar, { stimulus: tx(`(${a} − ${b}) × ${c}`) }); },
    ],
    [
      (R) => { const a = R.int(1, 20), b = R.int(2, 9), c = R.int(2, 9); return K(`q1${a}_${b}_${c}`, T('Calcule. Attention à l’ordre!', 'Work it out. Watch the order!'), a + b * c, tipPrio, { stimulus: tx(`${a} + ${b} × ${c}`) }); },
      (R) => { const a = R.int(2, 9), b = R.int(2, 9), c = R.int(1, 20); return K(`q2${a}_${b}_${c}`, T('Calcule. Attention à l’ordre!', 'Work it out. Watch the order!'), a * b + c, tipPrio, { stimulus: tx(`${a} × ${b} + ${c}`) }); },
      (R) => { const b = R.int(2, 6), c = R.int(2, 6), a = b * c + R.int(0, 30); return K(`q3${a}_${b}_${c}`, T('Calcule. Attention à l’ordre!', 'Work it out. Watch the order!'), a - b * c, tipPrio, { stimulus: tx(`${a} − ${b} × ${c}`) }); },
      (R) => { const c = R.int(2, 9), q = R.int(2, 9), a = R.int(1, 30); return K(`q4${a}_${c}_${q}`, T('Calcule. Attention à l’ordre!', 'Work it out. Watch the order!'), a + q, tipPrio, { stimulus: tx(`${a} + ${c * q} ÷ ${c}`) }); },
    ],
    [
      (R) => { const a = R.int(2, 9), b = R.int(2, 9), c = R.int(2, 6), d = R.int(2, 6); if (a * b < c * d) return K(`r1${a}_${b}_${c}_${d}`, T('Calcule.', 'Work it out.'), a * b + c * d, tipPrio, { stimulus: tx(`${a} × ${b} + ${c} × ${d}`) }); return K(`r2${a}_${b}_${c}_${d}`, T('Calcule.', 'Work it out.'), a * b - c * d, tipPrio, { stimulus: tx(`${a} × ${b} − ${c} × ${d}`) }); },
      (R) => { const a = R.int(1, 9), b = R.int(1, 9), d = R.int(1, 5), c = d + R.int(1, 5); return K(`r3${a}_${b}_${c}_${d}`, T('Calcule.', 'Work it out.'), (a + b) * (c - d), tipPar, { stimulus: tx(`(${a} + ${b}) × (${c} − ${d})`) }); },
      (R) => { const a = R.int(2, 9), b = R.int(2, 9), c = R.int(2, 9); const right = a + b * c, wrong = (a + b) * c; if (right === wrong) return K(`q1${a}_${b}_${c}`, T('Calcule.', 'Work it out.'), right, tipPrio, { stimulus: tx(`${a} + ${b} × ${c}`) }); return CH(`wr${a}_${b}_${c}`, T(`Qui a raison? ${a} + ${b} × ${c} = ?`, `Who is right? ${a} + ${b} × ${c} = ?`), [T(`Léa : ${right}`, `Léa: ${right}`), T(`Félix : ${wrong}`, `Félix: ${wrong}`)].map(tx), tipPrio, { cols: 2 }); },
      (R) => { const a = R.int(2, 9), b = R.int(2, 9), c = R.int(2, 9); const v1 = (a + b) * c, v2 = a + b * c; if (v1 === v2) return K(`q2${a}_${b}_${c}`, T('Calcule.', 'Work it out.'), a * b + c, tipPrio, { stimulus: tx(`${a} × ${b} + ${c}`) }); return TQ(`pl${a}_${b}_${c}`, T(`Où faut-il des parenthèses pour obtenir ${v1}?`, `Where do the brackets go to get ${v1}?`), [`(${a} + ${b}) × ${c}`, `${a} + (${b} × ${c})`].map((s) => T(s, s)), tipPar, { cols: 1 }); },
      (R) => { const a = R.int(2, 9), b = R.int(2, 9), c = R.int(2, 9), d = R.int(1, Math.min(9, a + b * c)); return K(`r5${a}_${b}_${c}_${d}`, T('Calcule.', 'Work it out.'), a + b * c - d, tipPrio, { stimulus: tx(`${a} + ${b} × ${c} − ${d}`) }); },
    ],
  ]);

// ---------- g3m17 : estimer ----------
const rT = (n, p) => Math.round(n / p) * p;
const tipEst = T('Arrondis chaque nombre, puis calcule avec les nombres arrondis.', 'Round each number, then calculate with the rounded numbers.');
const m17 = unit('g3m17', '🔮', T('Estimer un résultat', 'Estimating'),
  'Arithmétique — approximer le résultat d’une opération; juger si une réponse est vraisemblable', [
    [
      (R) => { const a = R.int(101, 899), b = R.int(101, 899); if (Math.abs(a % 100 - 50) < 6 || Math.abs(b % 100 - 50) < 6) return K(`ex${a}_${b}`, T('Calcule exactement.', 'Work it out exactly.'), a + b, tipEst, { stimulus: tx(`${a} + ${b}`) }); const e = rT(a, 100) + rT(b, 100); return NQ(R, `e${a}_${b}`, T(`Environ combien font ${a} + ${b}?`, `About how much is ${a} + ${b}?`), e, [e + 100, e - 100, e + 200, e - 200], tipEst, { valid: (v) => v > 0 && v % 100 === 0 }); },
      (R) => { const a = R.int(21, 99), b = R.int(21, 99); if (a % 10 === 5 || b % 10 === 5) return K(`ex${a}_${b}`, T('Calcule exactement.', 'Work it out exactly.'), a + b, tipEst, { stimulus: tx(`${a} + ${b}`) }); const e = rT(a, 10) + rT(b, 10); return NQ(R, `e10${a}_${b}`, T(`Environ combien font ${a} + ${b}? (arrondis à la dizaine)`, `About how much is ${a} + ${b}? (round to tens)`), e, [e + 10, e - 10, e + 20, e - 20], tipEst, { valid: (v) => v > 0 && v % 10 === 0 }); },
      (R) => { const a = R.int(101, 499), b = R.int(101, 499), s = a + b, shown = R.chance(0.5) ? s : s + R.pick([1000, 300, -200, 500]); return YN(`ry${a}_${b}_${shown}`, T(`${p0(R)} dit que ${a} + ${b} = ${NB(shown)}. Est-ce que ça a du sens?`, `Someone says ${a} + ${b} = ${NBe(shown)}. Does it make sense?`), shown === s, tipEst); },
    ],
    [
      (R) => { const a = R.int(1001, 9999), b = R.int(1001, a); if (Math.abs(a % 1000 - 500) < 60 || Math.abs(b % 1000 - 500) < 60) return K(`exd${a}_${b}`, T('Calcule exactement.', 'Work it out exactly.'), a - b, tipEst, { stimulus: tx(T(`${NB(a)} − ${NB(b)}`, `${NBe(a)} − ${NBe(b)}`)) }); const e = rT(a, 1000) - rT(b, 1000); return NQ(R, `ed${a}_${b}`, T(`Environ combien font ${NB(a)} − ${NB(b)}?`, `About how much is ${NBe(a)} − ${NBe(b)}?`), e, [e + 1000, e - 1000, e + 2000, e + 500], tipEst, { valid: (v) => v >= 0 && v % 500 === 0 }); },
      (R) => { const a = R.int(1001, 4999), b = R.int(1001, 4999), s = a + b, k = rT(s, 1000); return CH(`cl${a}_${b}`, T(`${NB(a)} + ${NB(b)} est plus proche de…`, `${NBe(a)} + ${NBe(b)} is closest to…`), uniqT([k, k + 1000, k - 1000, k + 2000].map((v) => NT(v))).map(tx), tipEst); },
      (R) => { const a = R.int(101, 999), b = R.int(101, 999), s = a + b; const shown = R.chance(0.5) ? s : bugTwo(R, s); return YN(`ry2${a}_${b}_${shown}`, T(`Est-ce que ${a} + ${b} = ${NB(shown)} est vraisemblable?`, `Is ${a} + ${b} = ${NBe(shown)} reasonable?`), Math.abs(shown - s) < 50, tipEst); },
    ],
    [
      (R) => { const n = R.int(12, 98), b = R.int(3, 9); if (n % 10 === 5) return K(`exm${n}_${b}`, T('Calcule exactement.', 'Work it out exactly.'), n * b, tipEst, { stimulus: tx(`${n} × ${b}`) }); const e = rT(n, 10) * b; return NQ(R, `em${n}_${b}`, T(`Environ combien font ${n} × ${b}?`, `About how much is ${n} × ${b}?`), e, [e + 10 * b, e - 10 * b, e * 10, e + 100, e - 100], T('Arrondis le nombre à 2 chiffres à la dizaine, puis multiplie.', 'Round the 2-digit number to the nearest ten, then multiply.'), { valid: (v) => v > 0 && v % 10 === 0 }); },
      (R) => { const items = R.sample([['jus', 'juice', 289], ['fromage', 'cheese', 649], ['pain', 'bread', 349], ['pommes', 'apples', 499], ['lait', 'milk', 579], ['céréales', 'cereal', 599], ['sirop d’érable', 'maple syrup', 899], ['œufs', 'eggs', 429]], 3); const tot = items.reduce((a, x) => a + x[2], 0); const bud = R.pick([10, 15, 20]) * 100; return YN(`bud${items.map((x) => x[2]).join('_')}_${bud}`, T(`À l’épicerie : ${items.map((x) => `${x[0]} ${(x[2] / 100).toFixed(2).replace('.', ',')} $`).join(', ')}. Est-ce que ${bud / 100} $ suffisent?`, `At the grocery store: ${items.map((x) => `${x[1]} $${(x[2] / 100).toFixed(2)}`).join(', ')}. Is $${bud / 100} enough?`), tot <= bud, T('Arrondis chaque prix au dollar près, additionne, puis compare.', 'Round each price to the nearest dollar, add, then compare.')); },
      (R) => { const a = R.int(1001, 4999), b = R.int(1001, 4999), c = R.int(101, 999), s = a + b + c, k = rT(s, 1000); return CH(`c3${a}_${b}_${c}`, T(`${NB(a)} + ${NB(b)} + ${NB(c)} est plus proche de…`, `${NBe(a)} + ${NBe(b)} + ${NBe(c)} is closest to…`), uniqT([k, k + 1000, k - 1000, k + 2000].map((v) => NT(v))).map(tx), tipEst); },
      (R) => { const n = R.int(21, 99), b = R.int(3, 9), p = n * b, shown = R.chance(0.5) ? p : R.pick([p * 10, p + 300, n + b, Math.floor(p / 10)]); return YN(`rm${n}_${b}_${shown}`, T(`${n} × ${b} = ${NB(shown)}. Est-ce vraisemblable?`, `${n} × ${b} = ${NBe(shown)}. Is that reasonable?`), shown === p, T('Estime : arrondis à la dizaine et multiplie dans ta tête.', 'Estimate: round to the ten and multiply in your head.')); },
    ],
  ]);
const NAMES = PEOPLE.map((p) => p.n);
function p0(R) { return R.pick(NAMES); }
function bugTwo(R, s) { return R.pick([s + 1000, s - 300 > 0 ? s - 300 : s + 400, s + 500, Math.floor(s / 10)]); }

export const units = [m9, m10, m11, m12, m13, m14, m15, m16, m17];
