// Picture ↔ word pairs for the Memory game (French and English), plus a math pair maker.
const W = [
  ['🐱', 'chat', 'cat'], ['🐶', 'chien', 'dog'], ['🐰', 'lapin', 'rabbit'], ['🐟', 'poisson', 'fish'], ['🐦', 'oiseau', 'bird'],
  ['🐻', 'ours', 'bear'], ['🦊', 'renard', 'fox'], ['🐸', 'grenouille', 'frog'], ['🐴', 'cheval', 'horse'], ['🐮', 'vache', 'cow'],
  ['🐷', 'cochon', 'pig'], ['🐔', 'poule', 'hen'], ['🦆', 'canard', 'duck'], ['🐭', 'souris', 'mouse'], ['🐢', 'tortue', 'turtle'],
  ['🦋', 'papillon', 'butterfly'], ['🐝', 'abeille', 'bee'], ['🐘', 'éléphant', 'elephant'], ['🦁', 'lion', 'lion'], ['🐵', 'singe', 'monkey'],
  ['🍎', 'pomme', 'apple'], ['🍌', 'banane', 'banana'], ['🍓', 'fraise', 'strawberry'], ['🍇', 'raisins', 'grapes'], ['🥕', 'carotte', 'carrot'],
  ['🧀', 'fromage', 'cheese'], ['🍞', 'pain', 'bread'], ['🥚', 'œuf', 'egg'], ['🥛', 'lait', 'milk'], ['🍪', 'biscuit', 'cookie'],
  ['🍰', 'gâteau', 'cake'], ['🍕', 'pizza', 'pizza'], ['🍦', 'crème glacée', 'ice cream'], ['🍊', 'orange', 'orange'], ['🍉', 'melon d’eau', 'watermelon'],
  ['🚗', 'auto', 'car'], ['🚌', 'autobus', 'bus'], ['🚲', 'vélo', 'bike'], ['✈️', 'avion', 'plane'], ['🚂', 'train', 'train'],
  ['⛵', 'bateau', 'boat'], ['🚀', 'fusée', 'rocket'], ['🚒', 'camion de pompier', 'fire truck'], ['🏠', 'maison', 'house'], ['🌳', 'arbre', 'tree'],
  ['🌸', 'fleur', 'flower'], ['☀️', 'soleil', 'sun'], ['🌙', 'lune', 'moon'], ['⭐', 'étoile', 'star'], ['☁️', 'nuage', 'cloud'],
  ['🌧️', 'pluie', 'rain'], ['❄️', 'neige', 'snow'], ['🌈', 'arc-en-ciel', 'rainbow'], ['📚', 'livres', 'books'], ['✏️', 'crayon', 'pencil'],
  ['✂️', 'ciseaux', 'scissors'], ['🎒', 'sac à dos', 'backpack'], ['⚽', 'ballon', 'ball'], ['🧸', 'ourson', 'teddy bear'], ['🪁', 'cerf-volant', 'kite'],
  ['👕', 'chandail', 'T-shirt'], ['👖', 'pantalon', 'pants'], ['🧦', 'bas', 'socks'], ['👟', 'souliers', 'shoes'], ['🧢', 'casquette', 'cap'],
  ['🧤', 'mitaines', 'mittens'], ['🧣', 'foulard', 'scarf'], ['👁️', 'œil', 'eye'], ['👂', 'oreille', 'ear'], ['👃', 'nez', 'nose'],
  ['👄', 'bouche', 'mouth'], ['✋', 'main', 'hand'], ['🦶', 'pied', 'foot'], ['🛏️', 'lit', 'bed'], ['🪑', 'chaise', 'chair'],
  ['🚪', 'porte', 'door'], ['🔑', 'clé', 'key'], ['⏰', 'réveil', 'clock'], ['🎁', 'cadeau', 'gift'], ['🎈', 'ballon', 'balloon'],
];
// Duplicate words inside one language (ballon) are fine: one game never uses both.
export function wordPairs(lang, n, R) {
  const col = lang === 'en' ? 2 : 1;
  const seen = new Set();
  const out = [];
  for (const w of R.shuffle(W)) {
    if (seen.has(w[col])) continue;
    seen.add(w[col]);
    out.push({ a: { emoji: w[0] }, b: { text: w[col] }, say: { text: w[col], lang: lang === 'en' ? 'en-CA' : 'fr-CA' } });
    if (out.length === n) break;
  }
  return out;
}
// Math: calculation ↔ result (results all different).
export function mathPairs(level, n, R) {
  const out = [], used = new Set();
  let guard = 0;
  while (out.length < n && guard++ < 500) {
    let a, b, op, r;
    if (level === 1) { a = R.int(1, 9); b = R.int(1, 9); op = R.chance(0.6) ? '+' : '−'; if (op === '−' && b > a) [a, b] = [b, a]; }
    else if (level === 2) { a = R.int(5, 40); b = R.int(3, 30); op = R.chance(0.55) ? '+' : '−'; if (op === '−' && b > a) [a, b] = [b, a]; }
    else { if (R.chance(0.35)) { a = R.int(2, 5); b = R.int(2, 5); op = '×'; } else { a = R.int(20, 90); b = R.int(10, 60); op = R.chance(0.5) ? '+' : '−'; if (op === '−' && b > a) [a, b] = [b, a]; } }
    r = op === '+' ? a + b : op === '−' ? a - b : a * b;
    if (used.has(r)) continue;
    used.add(r);
    out.push({ a: { text: `${a} ${op} ${b}` }, b: { text: String(r) } });
  }
  return out;
}
