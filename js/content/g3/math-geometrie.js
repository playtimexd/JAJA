// Mathématique 3e année — Géométrie (g3m18 → g3m22)
import { uniqT, S, T, K, CH, TQ, YN, tx, unit, range, solid3d, regBase, netSvg, polySvg, quadPts, rot, angleSvg, gridSvg, tilingSvg, friezeSvg, oneEmojiSvg, C } from './math-lib.js';

// ---------- g3m18 : solides ----------
const sq = (s, a = 0.45) => regBase(4, s, a);
const rectB = (w, d, a = 0.35) => [[-w, -d], [w, -d], [w, d], [-w, d]].map(([x, z]) => [x * Math.cos(a) - z * Math.sin(a), x * Math.sin(a) + z * Math.cos(a)]);
const SOL = [
  { id: 'cube', fr: 'cube', en: 'cube', F: 6, A: 12, S: 8, bF: 'carré', bE: 'square', pic: (c) => solid3d(sq(52), 74, 'prisme', c), fam: 'prisme', n: 4 },
  { id: 'prr', fr: 'prisme à base rectangulaire', en: 'rectangular prism', F: 6, A: 12, S: 8, bF: 'rectangle', bE: 'rectangle', pic: (c) => solid3d(rectB(62, 26), 52, 'prisme', c), fam: 'prisme', n: 4 },
  { id: 'prt', fr: 'prisme à base triangulaire', en: 'triangular prism', F: 5, A: 9, S: 6, bF: 'triangle', bE: 'triangle', pic: (c) => solid3d(regBase(3, 54, 1.25), 68, 'prisme', c), fam: 'prisme', n: 3 },
  { id: 'prp', fr: 'prisme à base pentagonale', en: 'pentagonal prism', F: 7, A: 15, S: 10, bF: 'pentagone', bE: 'pentagon', pic: (c) => solid3d(regBase(5, 50, 0.3), 64, 'prisme', c), fam: 'prisme', n: 5 },
  { id: 'prh', fr: 'prisme à base hexagonale', en: 'hexagonal prism', F: 8, A: 18, S: 12, bF: 'hexagone', bE: 'hexagon', pic: (c) => solid3d(regBase(6, 50, 0.2), 60, 'prisme', c), fam: 'prisme', n: 6 },
  { id: 'pyc', fr: 'pyramide à base carrée', en: 'square pyramid', F: 5, A: 8, S: 5, bF: 'carré', bE: 'square', pic: (c) => solid3d(sq(60, 0.4), 96, 'pyramide', c), fam: 'pyramide', n: 4 },
  { id: 'pyt', fr: 'pyramide à base triangulaire', en: 'triangular pyramid', F: 4, A: 6, S: 4, bF: 'triangle', bE: 'triangle', pic: (c) => solid3d(regBase(3, 62, 1.25), 92, 'pyramide', c), fam: 'pyramide', n: 3 },
  { id: 'pyp', fr: 'pyramide à base pentagonale', en: 'pentagonal pyramid', F: 6, A: 10, S: 6, bF: 'pentagone', bE: 'pentagon', pic: (c) => solid3d(regBase(5, 58, 0.3), 92, 'pyramide', c), fam: 'pyramide', n: 5 },
  { id: 'pyh', fr: 'pyramide à base hexagonale', en: 'hexagonal pyramid', F: 7, A: 12, S: 7, bF: 'hexagone', bE: 'hexagon', pic: (c) => solid3d(regBase(6, 58, 0.2), 92, 'pyramide', c), fam: 'pyramide', n: 6 },
];
const ROUND = [
  { id: 'sphere', fr: 'boule (sphère)', en: 'sphere', pic: () => S.solid('sphere') },
  { id: 'cylindre', fr: 'cylindre', en: 'cylinder', pic: () => S.solid('cylindre') },
  { id: 'cone', fr: 'cône', en: 'cone', pic: () => S.solid('cone') },
];
const COLS = ['orange', 'green', 'blue', 'pink', 'purple'];
const nm = (s) => T(s.fr, s.en);
const BASIC = SOL.filter((s) => ['cube', 'prr', 'prt', 'pyc', 'pyt'].includes(s.id));
const tipFAS = T('Face = surface plate, arête = ligne où 2 faces se touchent, sommet = pointe où les arêtes se rencontrent.', 'Face = flat surface, edge = line where 2 faces meet, vertex = corner where edges meet.');
const ATTR = { F: ['faces', 'faces'], A: ['arêtes', 'edges'], S: ['sommets', 'vertices'] };
function nameSolidQ(R, pool) {
  const s = R.pick(pool), c = R.pick(COLS), others = R.sample([...SOL, ...ROUND].filter((x) => x.id !== s.id), 3);
  return CH(`nm${s.id}${c}${others.map((o) => o.id).join('')}`, T('Quel est ce solide?', 'What is this solid?'), [s, ...others].map((x) => tx(nm(x))), T('Prisme : 2 bases pareilles reliées par des rectangles. Pyramide : 1 base et des triangles qui se rejoignent en pointe.', 'Prism: 2 matching bases joined by rectangles. Pyramid: 1 base and triangles meeting at a point.'), { cols: 2, stimulus: { svg: s.pic(c) } });
}
function countQ(R, pool, attrs) {
  const s = R.pick(pool), a = R.pick(attrs), c = R.pick(COLS);
  return K(`ct${s.id}${a}`, T(`Combien de ${ATTR[a][0]} a ce solide (${s.fr})?`, `How many ${ATTR[a][1]} does this solid (${s.en}) have?`), s[a], a === 'F' ? T('N’oublie pas les faces cachées derrière et dessous!', 'Don’t forget the hidden faces at the back and bottom!') : tipFAS, { stimulus: { svg: s.pic(c) } });
}
// cube nets: random hexominoes checked by "rolling a cube" over the cells
const ADD = (v, w) => v.map((x, i) => x + w[i]); const NEG = (v) => v.map((x) => -x);
function cubeNetOk(cells) {
  const key = (c) => c.join(','), set = new Map(cells.map((c) => [key(c), c]));
  const seen = new Map([[key(cells[0]), { d: [0, 0, -1], n: [0, 1, 0], e: [1, 0, 0] }]]), q = [cells[0]];
  while (q.length) {
    const c = q.shift(), st = seen.get(key(c));
    for (const [dx, dy, f] of [[1, 0, (s) => ({ d: s.e, e: NEG(s.d), n: s.n })], [-1, 0, (s) => ({ d: NEG(s.e), e: s.d, n: s.n })], [0, -1, (s) => ({ d: s.n, n: NEG(s.d), e: s.e })], [0, 1, (s) => ({ d: NEG(s.n), n: s.d, e: s.e })]]) {
      const nb = [c[0] + dx, c[1] + dy], k = key(nb);
      if (set.has(k) && !seen.has(k)) { seen.set(k, f(st)); q.push(nb); }
    }
  }
  return new Set([...seen.values()].map((s) => s.d.join(','))).size === 6;
}
function randHex(R) {
  const cells = [[0, 0]], has = (c) => cells.some((x) => x[0] === c[0] && x[1] === c[1]);
  while (cells.length < 6) {
    const b = R.pick(cells), d = R.pick([[1, 0], [-1, 0], [0, 1], [0, -1]]), n = [b[0] + d[0], b[1] + d[1]];
    if (!has(n) && Math.abs(n[0]) <= 3 && Math.abs(n[1]) <= 2) cells.push(n);
  }
  const mx = Math.min(...cells.map((c) => c[0])), my = Math.min(...cells.map((c) => c[1]));
  return cells.map(([x, y]) => [x - mx, y - my]).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
}
function cubeNetQ(R) {
  const want = R.chance(0.5);
  let cells = randHex(R);
  for (let g = 0; g < 400 && cubeNetOk(cells) !== want; g++) cells = randHex(R);
  const ok = cubeNetOk(cells);
  return YN(`cn${cells.map((c) => c.join('')).join('_')}`, T('Ce développement peut-il se plier pour former un cube?', 'Can this net be folded into a cube?'), ok, T('Imagine le pliage : il faut 6 faces, sans 2 carrés qui se superposent. Un bloc de 2 × 2 ne marche jamais.', 'Imagine folding: you need 6 faces with no two squares overlapping. A 2 × 2 block never works.'), { stimulus: { svg: netSvg(cells) } });
}
const h3 = 0.866;
const NETS = [
  { id: 'cube', svg: () => netSvg([[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]]) },
  { id: 'cube', svg: () => netSvg([[0, 0], [0, 1], [1, 1], [2, 1], [3, 1], [3, 2]]), v: 2 },
  { id: 'prr', svg: () => netSvg([[1, 0, 2, 1], [0, 1, 1, 1], [1, 1, 2, 1], [3, 1, 1, 1], [4, 1, 2, 1], [1, 2, 2, 1]]) },
  { id: 'prt', svg: () => netSvg([[0, 1, 1, 2], [1, 1, 1, 2], [2, 1, 1, 2]], [[[1, 1], [2, 1], [1.5, 1 - h3]], [[1, 3], [2, 3], [1.5, 3 + h3]]]) },
  { id: 'pyc', svg: () => netSvg([[1, 1]], [[[1, 1], [2, 1], [1.5, 0]], [[2, 1], [2, 2], [3, 1.5]], [[1, 2], [2, 2], [1.5, 3]], [[1, 1], [1, 2], [0, 1.5]]]) },
  { id: 'pyt', svg: () => netSvg([], [[[0, 2 * h3 * 1.6], [1.6, 2 * h3 * 1.6], [0.8, h3 * 1.6]], [[1.6, 2 * h3 * 1.6], [3.2, 2 * h3 * 1.6], [2.4, h3 * 1.6]], [[0.8, h3 * 1.6], [2.4, h3 * 1.6], [1.6, 2 * h3 * 1.6]], [[0.8, h3 * 1.6], [2.4, h3 * 1.6], [1.6, 0]]]) },
  { id: 'cylindre', svg: () => netSvg([[0, 1, 3.2, 1.6]], [], [[1.6, 0.5, 0.5], [1.6, 3.1, 0.5]]) },
];
const solidById = (id) => SOL.find((s) => s.id === id) || ROUND.find((s) => s.id === id);
function netQ(R) {
  const n = R.pick(NETS), s = solidById(n.id), others = R.sample([...SOL.slice(0, 3), SOL[5], SOL[6], ROUND[1], ROUND[2]].filter((x) => x.id !== n.id), 3);
  return CH(`net${n.id}${n.v || ''}${others.map((o) => o.id).join('')}`, T('Quel solide forme ce développement une fois plié?', 'Which solid does this net make when folded?'), [s, ...others].map((x) => tx(nm(x))), T('Compte les faces et regarde leur forme : triangles → pyramide, rectangles → prisme, cercles → cylindre.', 'Count the faces and look at their shapes: triangles → pyramid, rectangles → prism, circles → cylinder.'), { cols: 2, stimulus: { svg: n.svg() } });
}
const RIDDLE = (s) => T(`J’ai ${s.F} faces, ${s.A} arêtes et ${s.S} sommets. Qui suis-je?`, `I have ${s.F} faces, ${s.A} edges and ${s.S} vertices. What am I?`);
const BIGBASE = [[7, 'heptagone', 'heptagon'], [8, 'octogone', 'octagon'], [10, 'décagone', 'decagon'], [5, 'pentagone', 'pentagon'], [6, 'hexagone', 'hexagon']];
const m18 = unit('g3m18', '🧊', T('Les solides', 'Solids'),
  'Géométrie — solides : faces, arêtes, sommets; prismes et pyramides; développements', [
    [
      [2, (R) => nameSolidQ(R, [...BASIC, ...ROUND.map((r) => ({ ...r, pic: () => r.pic() }))])],
      (R) => countQ(R, BASIC, ['F']),
      (R) => { const r = R.pick(ROUND), others = R.sample(BASIC, 2), c = R.pick(COLS); return CH(`rl${r.id}${others.map((o) => o.id).join('')}${c}`, T('Quel solide peut rouler?', 'Which solid can roll?'), [{ svg: r.pic() }, ...others.map((o) => ({ svg: o.pic(c) }))], T('Un solide qui roule a une surface courbe (arrondie).', 'A solid that rolls has a curved surface.'), { cols: 3 }); },
      (R) => { const s = R.pick(BASIC), c = R.pick(COLS); const shapes = [['carré', 'square'], ['rectangle', 'rectangle'], ['triangle', 'triangle'], ['cercle', 'circle']]; const ans = shapes.find((x) => x[0] === s.bF); return CH(`bs${s.id}${c}`, T(`Quelle est la forme de la base de ce solide?`, 'What shape is the base of this solid?'), [ans, ...shapes.filter((x) => x !== ans)].map(([f, e]) => tx(T(f, e))), T('La base est la face du dessous (pour une pyramide, celle qui n’est pas un triangle pointu).', 'The base is the face on the bottom.'), { stimulus: { svg: s.pic(c) } }); },
    ],
    [
      [2, (R) => countQ(R, SOL.slice(0, 7), ['A', 'S'])],
      [2, (R) => netQ(R)],
      (R) => { const s = R.pick(SOL.slice(0, 7)), a = R.pick(['F', 'S']); const ok = SOL.filter((x) => x[a] === s[a]).map((x) => x.id); const others = R.sample(SOL.filter((x) => !ok.includes(x.id)), 3); return CH(`wh${s.id}${a}${others.map((o) => o.id).join('')}`, T(`Quel solide a exactement ${s[a]} ${ATTR[a][0]}?`, `Which solid has exactly ${s[a]} ${ATTR[a][1]}?`), [s, ...others].map((x) => tx(nm(x))), tipFAS, { cols: 2 }); },
      (R) => { const [s1, s2] = R.sample(SOL.slice(0, 7), 2), a = R.pick(['F', 'S', 'A']), n1 = R.int(1, 3), n2 = R.int(1, 2); return K(`tot${s1.id}${n1}${s2.id}${n2}${a}`, T(`${n1} ${s1.fr}${n1 > 1 ? 's' : ''} et ${n2} ${s2.fr}${n2 > 1 ? 's' : ''} : combien de ${ATTR[a][0]} en tout?`, `${n1} ${s1.en}${n1 > 1 ? 's' : ''} and ${n2} ${s2.en}${n2 > 1 ? 's' : ''}: how many ${ATTR[a][1]} in all?`), n1 * s1[a] + n2 * s2[a], T(`Un ${s1.fr} a ${s1[a]} ${ATTR[a][0]}, un ${s2.fr} en a ${s2[a]}.`, `A ${s1.en} has ${s1[a]} ${ATTR[a][1]}, a ${s2.en} has ${s2[a]}.`)); },
    ],
    [
      [2, (R) => cubeNetQ(R)],
      (R) => { const s = R.pick(SOL), others = R.sample(SOL.filter((x) => x.F !== s.F || x.A !== s.A), 3); return CH(`rd${s.id}${others.map((o) => o.id).join('')}`, RIDDLE(s), [s, ...others].map((x) => tx(nm(x))), T('Prisme à n côtés : n + 2 faces. Pyramide à n côtés : n + 1 faces.', 'Prism with an n-sided base: n + 2 faces. Pyramid: n + 1 faces.'), { cols: 2 }); },
      (R) => { const [n, bf, be] = R.pick(BIGBASE), fam = R.pick(['prisme', 'pyramide']), a = R.pick(['F', 'A', 'S']); const v = fam === 'prisme' ? { F: n + 2, A: 3 * n, S: 2 * n } : { F: n + 1, A: 2 * n, S: n + 1 }; return K(`nb${n}${fam}${a}`, { fr: `${fam === 'prisme' ? 'Un prisme' : 'Une pyramide'} a une base à ${n} côtés (${bf}). Combien a-t-${fam === 'prisme' ? 'il' : 'elle'} de ${ATTR[a][0]}?`, en: `A ${fam === 'prisme' ? 'prism' : 'pyramid'} has a base with ${n} sides (${be}). How many ${ATTR[a][1]} does it have?` }, v[a], fam === 'prisme' ? T(`Prisme : 2 bases de ${n} côtés + ${n} rectangles. Arêtes : ${n} en haut, ${n} en bas, ${n} debout.`, `Prism: 2 bases + ${n} rectangles. Edges: ${n} top, ${n} bottom, ${n} standing.`) : T(`Pyramide : 1 base + ${n} triangles. Sommets : ${n} autour de la base + 1 en haut.`, `Pyramid: 1 base + ${n} triangles. Vertices: ${n} around the base + 1 at the top.`)); },
      (R) => { const s = R.pick(SOL.filter((x) => x.fam === 'pyramide')), c = R.pick(COLS), tri = s.id === 'pyt'; return K(`tf${s.id}`, T(`Combien de faces de cette ${s.fr} sont des triangles?`, `How many faces of this ${s.en} are triangles?`), tri ? 4 : s.n, T('Compte les triangles autour, et regarde si la base est aussi un triangle!', 'Count the triangles around, and check if the base is a triangle too!'), { stimulus: { svg: s.pic(c) } }); },
    ],
  ]);

// ---------- g3m19 : polygones et quadrilatères ----------
const P = {
  triangle: ['triangle', 'triangle', 3], carre: ['carré', 'square', 4], rectangle: ['rectangle', 'rectangle', 4], losange: ['losange', 'rhombus', 4],
  parallelogramme: ['parallélogramme', 'parallelogram', 4], trapeze: ['trapèze', 'trapezoid', 4], quelconque: ['quadrilatère', 'quadrilateral', 4],
  pentagone: ['pentagone', 'pentagon', 5], hexagone: ['hexagone', 'hexagon', 6], octogone: ['octogone', 'octagon', 8], eq3: ['triangle', 'triangle', 3],
};
const ROTS = [0, 0, 10, 20, -15, 30, 45, 90, -30];
const PCOL = [C.purple, C.blue, C.green, C.orange, C.pink];
function figure(R, kind) { const v = R.int(0, 3), r = R.pick(ROTS), col = R.int(0, 4); return { kind, v, r, col, pts: rot(quadPts(kind, v), r), key: `${kind}${v}_${r}` }; }
const vAng = (Pp, i) => { const v = Pp[i], a = Pp[(i + Pp.length - 1) % Pp.length], b = Pp[(i + 1) % Pp.length]; const ax = a[0] - v[0], ay = a[1] - v[1], bx = b[0] - v[0], by = b[1] - v[1]; return (Math.acos((ax * bx + ay * by) / (Math.hypot(ax, ay) * Math.hypot(bx, by))) * 180) / Math.PI; };
const angTypes = (Pp) => Pp.map((_, i) => vAng(Pp, i)).map((d) => (Math.abs(d - 90) < 2 ? 'd' : d < 90 ? 'a' : 'o'));
const parPairs = (Pp) => { const n = Pp.length, dir = range(0, n - 1).map((i) => { const a = Pp[i], b = Pp[(i + 1) % n]; return [b[0] - a[0], b[1] - a[1]]; }); let c = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const [x1, y1] = dir[i], [x2, y2] = dir[j]; if (Math.abs(x1 * y2 - y1 * x2) / (Math.hypot(x1, y1) * Math.hypot(x2, y2)) < 0.02) c++; } return c; };
const figSvg = (f, right = false) => polySvg(f.pts, PCOL[f.col], { right: right ? angTypes(f.pts).map((t, i) => (t === 'd' ? i : -1)).filter((i) => i >= 0) : [] });
const NOTPOLY = [
  `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><circle cx="75" cy="75" r="58" fill="${C.blue}" stroke="${C.ink}" stroke-width="4"/></svg>`,
  `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><polyline points="25,120 25,30 125,30 125,120 60,120" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></svg>`,
  `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><path d="M20,120 L130,120 L130,60 Q75,0 20,60 Z" fill="${C.green}" stroke="${C.ink}" stroke-width="4"/></svg>`,
  `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><ellipse cx="75" cy="75" rx="62" ry="40" fill="${C.pink}" stroke="${C.ink}" stroke-width="4"/></svg>`,
  `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><polyline points="20,110 60,25 100,110 130,40" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/></svg>`,
];
const QUADS = ['carre', 'rectangle', 'losange', 'parallelogramme', 'trapeze'];
const tipQuad = T('Carré : 4 côtés égaux + 4 angles droits. Rectangle : 4 angles droits. Losange : 4 côtés égaux. Parallélogramme : 2 paires de côtés parallèles. Trapèze : 1 paire.', 'Square: 4 equal sides + 4 right angles. Rectangle: 4 right angles. Rhombus: 4 equal sides. Parallelogram: 2 pairs of parallel sides. Trapezoid: 1 pair.');
const STATEMENTS = [
  [T('Un carré est aussi un rectangle.', 'A square is also a rectangle.'), true], [T('Un rectangle est toujours un carré.', 'A rectangle is always a square.'), false],
  [T('Un carré est aussi un losange.', 'A square is also a rhombus.'), true], [T('Un trapèze a 2 paires de côtés parallèles.', 'A trapezoid has 2 pairs of parallel sides.'), false],
  [T('Un losange a 4 côtés de même longueur.', 'A rhombus has 4 sides of the same length.'), true], [T('Tous les quadrilatères ont 4 sommets.', 'All quadrilaterals have 4 vertices.'), true],
  [T('Un triangle peut avoir 2 angles droits.', 'A triangle can have 2 right angles.'), false], [T('Un parallélogramme a 2 paires de côtés parallèles.', 'A parallelogram has 2 pairs of parallel sides.'), true],
  [T('Un hexagone a 8 côtés.', 'A hexagon has 8 sides.'), false], [T('Un rectangle a 4 angles droits.', 'A rectangle has 4 right angles.'), true],
  [T('Un cercle est un polygone.', 'A circle is a polygon.'), false], [T('Un octogone a 8 sommets.', 'An octagon has 8 vertices.'), true],
  [T('Un losange a toujours 4 angles droits.', 'A rhombus always has 4 right angles.'), false], [T('Un rectangle est aussi un parallélogramme.', 'A rectangle is also a parallelogram.'), true],
  [T('Un pentagone a 6 côtés.', 'A pentagon has 6 sides.'), false], [T('Un polygone est une ligne fermée faite de segments.', 'A polygon is a closed shape made of straight sides.'), true],
];
const RIDDLES = [
  ['carre', T('J’ai 4 côtés égaux et 4 angles droits.', 'I have 4 equal sides and 4 right angles.')],
  ['losange', T('J’ai 4 côtés égaux, mais aucun angle droit.', 'I have 4 equal sides but no right angle.')],
  ['rectangle', T('J’ai 4 angles droits, mais mes côtés ne sont pas tous égaux.', 'I have 4 right angles, but my sides are not all equal.')],
  ['trapeze', T('J’ai 4 côtés et exactement 1 paire de côtés parallèles.', 'I have 4 sides and exactly 1 pair of parallel sides.')],
  ['parallelogramme', T('J’ai 2 paires de côtés parallèles, aucun angle droit, et mes côtés ne sont pas tous égaux.', 'I have 2 pairs of parallel sides, no right angle, and my sides are not all equal.')],
  ['hexagone', T('J’ai 6 côtés et 6 sommets.', 'I have 6 sides and 6 vertices.')],
  ['octogone', T('J’ai 8 côtés, comme un panneau d’arrêt.', 'I have 8 sides, like a stop sign.')],
  ['pentagone', T('J’ai 5 côtés et 5 sommets.', 'I have 5 sides and 5 vertices.')],
];
const nameOf = (k) => T(P[k][0], P[k][1]);
const m19 = unit('g3m19', '🔷', T('Polygones et quadrilatères', 'Polygons and quadrilaterals'),
  'Géométrie — polygones (convexes/non), quadrilatères : carré, rectangle, losange, parallélogramme, trapèze', [
    [
      [2, (R) => { const k = R.pick(['triangle', 'quelconque', 'pentagone', 'hexagone', 'octogone']), f = figure(R, k); const opts = ['triangle', 'quelconque', 'pentagone', 'hexagone', 'octogone'].filter((x) => x !== k); return CH(`nm${f.key}`, T('Comment s’appelle ce polygone?', 'What is this polygon called?'), [k, ...R.sample(opts, 3)].map((x) => tx(nameOf(x))), T('Compte les côtés : 3 triangle, 4 quadrilatère, 5 pentagone, 6 hexagone, 8 octogone.', 'Count the sides: 3 triangle, 4 quadrilateral, 5 pentagon, 6 hexagon, 8 octagon.'), { cols: 2, stimulus: { svg: figSvg(f) } }); }],
      (R) => { const k = R.pick(Object.keys(P)), f = figure(R, k), a = R.chance(0.5); return K(`ns${f.key}${a}`, a ? T('Combien de côtés a ce polygone?', 'How many sides does this polygon have?') : T('Combien de sommets a ce polygone?', 'How many vertices does this polygon have?'), P[k][2], T('Fais un petit point sur chaque coin en comptant.', 'Touch each corner as you count.'), { stimulus: { svg: figSvg(f) } }); },
      (R) => { const poly = R.chance(0.5); if (poly) { const f = figure(R, R.pick(Object.keys(P))); return YN(`ip${f.key}`, T('Est-ce un polygone?', 'Is this a polygon?'), true, T('Polygone : figure fermée, faite seulement de côtés droits.', 'Polygon: a closed shape made only of straight sides.'), { stimulus: { svg: figSvg(f) } }); } const i = R.int(0, NOTPOLY.length - 1); return YN(`np${i}`, T('Est-ce un polygone?', 'Is this a polygon?'), false, T('Pas de ligne courbe, et la figure doit être fermée.', 'No curved lines, and the shape must be closed.'), { stimulus: { svg: NOTPOLY[i] } }); },
    ],
    [
      [3, (R) => { const k = R.pick(QUADS), f = figure(R, k); return CH(`q${f.key}`, T('Quel est ce quadrilatère?', 'Which quadrilateral is this?'), [k, ...QUADS.filter((x) => x !== k).slice(0, 4)].slice(0, 4).map((x) => tx(nameOf(x))), tipQuad, { cols: 2, stimulus: { svg: figSvg(f, true) } }); }],
      (R) => { const k = R.pick([...QUADS, 'triangle', 'pentagone', 'hexagone']), f = figure(R, k); return K(`ra${f.key}`, T('Combien d’angles droits a cette figure?', 'How many right angles does this shape have?'), angTypes(f.pts).filter((t) => t === 'd').length, T('Un angle droit est un coin carré, comme le coin d’une feuille.', 'A right angle is a square corner, like the corner of a sheet of paper.'), { stimulus: { svg: figSvg(f) } }); },
      (R) => { const ks = R.sample([...QUADS, 'quelconque', 'triangle', 'pentagone', 'hexagone'], 4), q = ks.find((k) => P[k][2] !== 4); if (!q) { const k = ks[0], f = figure(R, k); return K(`ns${f.key}`, T('Combien de côtés a ce polygone?', 'How many sides does this polygon have?'), 4, tipQuad, { stimulus: { svg: figSvg(f) } }); } const quads = ks.filter((k) => P[k][2] === 4).slice(0, 3); const fs = [q, ...quads].map((k) => figure(R, k)); return CH(`nq${fs.map((f) => f.key).join('')}`, T('Lequel n’est PAS un quadrilatère?', 'Which one is NOT a quadrilateral?'), fs.map((f) => ({ svg: figSvg(f) })), T('Un quadrilatère a exactement 4 côtés.', 'A quadrilateral has exactly 4 sides.'), { cols: fs.length }); },
    ],
    [
      [2, (R) => { const [k, t] = R.pick(RIDDLES); const pool = k.length && P[k][2] === 4 ? QUADS : ['pentagone', 'hexagone', 'octogone', 'carre', 'triangle']; return CH(`rd${k}${R.int(0, 3)}`, t, [k, ...R.sample(pool.filter((x) => x !== k), 3)].map((x) => tx(nameOf(x))), tipQuad, { cols: 2 }); }],
      [2, (R) => { const [s, v] = R.pick(STATEMENTS); return YN(`st${s.fr.slice(0, 30)}`, T('Vrai ou faux? (Oui = vrai)', 'True or false? (Yes = true)'), v, tipQuad, { stimulus: tx(s), say: { text: s } }); }],
      (R) => { const k = R.pick([...QUADS, 'quelconque', 'hexagone', 'octogone', 'triangle']), f = figure(R, k); return K(`pp${f.key}`, T('Combien de paires de côtés parallèles a cette figure?', 'How many pairs of parallel sides does this shape have?'), parPairs(f.pts), T('Deux côtés parallèles ne se rencontrent jamais, même si on les allonge (comme des rails).', 'Parallel sides never meet, even if you extend them (like train tracks).'), { stimulus: { svg: figSvg(f) } }); },
      (R) => { const k = R.pick([...QUADS, 'pentagone', 'hexagone', 'triangle']), f = figure(R, k); return K(`ra${f.key}`, T('Combien d’angles droits a cette figure?', 'How many right angles does this shape have?'), angTypes(f.pts).filter((t) => t === 'd').length, T('Vérifie chaque coin avec le coin d’une feuille.', 'Check each corner with the corner of a sheet of paper.'), { stimulus: { svg: figSvg(f) } }); },
    ],
  ]);

// ---------- g3m20 : angles ----------
const ANG = [tx(T('droit', 'right')), tx(T('aigu', 'acute')), tx(T('obtus', 'obtuse'))];
const tipAng = T('Compare avec le coin d’une feuille : pareil = droit, plus fermé = aigu, plus ouvert = obtus.', 'Compare with the corner of a sheet: same = right, narrower = acute, wider = obtuse.');
const typeOf = (d) => (d === 90 ? 0 : d < 90 ? 1 : 2);
const randDeg = (R, t) => (t === 0 ? 90 : t === 1 ? R.int(4, 15) * 5 : R.int(21, 34) * 5);
const angQ = (key, prompt, deg, extra = {}) => ({ type: 'choice', key, prompt, options: ANG, answer: typeOf(deg), fixedOrder: true, cols: 3, tip: tipAng, ...extra });
const CLOCK_T = [[3, 0], [9, 0], [1, 1], [2, 1], [10, 1], [11, 1], [4, 2], [5, 2], [7, 2], [8, 2]];
const m20 = unit('g3m20', '📐', T('Les angles', 'Angles'),
  'Géométrie — angles : droit, aigu, obtus (comparaison avec l’angle droit)', [
    [
      [3, (R) => { const t = R.int(0, 2), d = randDeg(R, t), r = R.int(0, 35) * 10; return angQ(`a${d}_${r}`, T('Quel type d’angle est-ce?', 'What kind of angle is this?'), d, { stimulus: { svg: angleSvg(d, r) } }); }],
      (R) => { const r = R.int(0, 35) * 10, ds = [90, randDeg(R, 1), randDeg(R, 2)]; return CH(`rd${ds.join('_')}_${r}`, T('Lequel est un angle droit?', 'Which one is a right angle?'), ds.map((d, i) => ({ svg: angleSvg(d, (r + i * 40) % 360) })), tipAng, { cols: 3 }); },
    ],
    [
      [2, (R) => { const t = R.int(0, 2), d = t === 0 ? 90 : t === 1 ? R.int(14, 17) * 5 : R.int(19, 22) * 5, r = R.int(0, 35) * 10; return angQ(`a${d}_${r}`, T('Regarde bien! Quel type d’angle est-ce?', 'Look carefully! What kind of angle is this?'), d, { stimulus: { svg: angleSvg(d, r) } }); }],
      (R) => { const [h, t] = R.pick(CLOCK_T); return { type: 'choice', key: `ck${h}`, prompt: T(`À ${h} h, les aiguilles forment quel angle?`, `At ${h}:00, what angle do the hands make?`), stimulus: { svg: S.clock(h, 0) }, options: ANG, answer: t, fixedOrder: true, cols: 3, tip: tipAng }; },
      (R) => { const want = R.int(0, 2), name = ['droit', 'aigu', 'obtus'][want], en = ['right', 'acute', 'obtuse'][want]; const ds = [randDeg(R, want), ...[0, 1, 2].filter((x) => x !== want).map((x) => randDeg(R, x))], r = R.int(0, 35) * 10; return CH(`wa${want}_${ds.join('_')}_${r}`, T(`Lequel est un angle ${name}?`, `Which one is an ${en === 'right' ? 'right' : en} angle?`.replace('an right', 'a right')), ds.map((d, i) => ({ svg: angleSvg(d, (r + i * 50) % 360) })), tipAng, { cols: 3 }); },
    ],
    [
      (R) => { const ds = R.sample(range(3, 34).map((x) => x * 5), 3); if (Math.max(...ds) - [...ds].sort((a, b) => b - a)[1] < 15) ds[0] = Math.min(170, Math.max(...ds) + 20); const big = Math.max(...ds), r = R.int(0, 35) * 10; return CH(`bg${ds.join('_')}_${r}`, T('Quel angle est le plus grand (le plus ouvert)?', 'Which angle is the greatest (the widest)?'), [big, ...ds.filter((d) => d !== big)].map((d, i) => ({ svg: angleSvg(d, (r + i * 70) % 360) })), T('La longueur des traits ne compte pas : regarde l’ouverture.', 'The length of the lines doesn’t matter: look at the opening.'), { cols: 3 }); },
      [2, (R) => { const k = R.pick(['triangle', 'parallelogramme', 'trapeze', 'losange', 'pentagone', 'hexagone', 'quelconque', 'octogone', 'rectangle']), f = figure(R, k), w = R.pick(['a', 'o']); return K(`ct${f.key}${w}`, w === 'a' ? T('Combien d’angles aigus a cette figure?', 'How many acute angles does this shape have?') : T('Combien d’angles obtus a cette figure?', 'How many obtuse angles does this shape have?'), angTypes(f.pts).filter((t) => t === w).length, tipAng, { stimulus: { svg: figSvg(f) } }); }],
      (R) => { const [h, t] = R.pick(CLOCK_T), want = R.int(0, 2); return YN(`ckyn${h}_${want}`, T(`À ${h} h, les aiguilles forment-elles un angle ${['droit', 'aigu', 'obtus'][want]}?`, `At ${h}:00, do the hands make ${['a right', 'an acute', 'an obtuse'][want]} angle?`), t === want, tipAng, { stimulus: { svg: S.clock(h, 0) } }); },
    ],
  ]);

// ---------- g3m21 : symétrie, frises, dallages ----------
const tipSym = T('Plie dans ta tête sur la ligne : les deux moitiés doivent se superposer exactement.', 'Fold it in your head on the line: both halves must match exactly.');
function halfShape(R, cols = 3, rows = 4) { const cells = new Set(); const n = R.int(3, 6); while (cells.size < n) cells.add(`${R.int(0, cols - 1)},${R.int(0, rows - 1)}`); return cells; }
const mirrorV = (cells, W) => new Set([...cells].map((k) => { const [c, r] = k.split(',').map(Number); return `${W - 1 - c},${r}`; }));
const mirrorH = (cells, H) => new Set([...cells].map((k) => { const [c, r] = k.split(',').map(Number); return `${c},${H - 1 - r}`; }));
const shiftV = (cells, d) => new Set([...cells].map((k) => { const [c, r] = k.split(',').map(Number); return `${c + d},${r}`; }));
const shiftH = (cells, d) => new Set([...cells].map((k) => { const [c, r] = k.split(',').map(Number); return `${c},${r + d}`; }));
const skey = (s) => [...s].sort().join(';');
function symYN(R) {
  const L = halfShape(R), R2 = mirrorV(L, 6), sym = R.chance(0.5);
  let right = R2;
  if (!sym) { const arr = [...R2]; const [c, r] = arr[R.int(0, arr.length - 1)].split(',').map(Number); right = new Set(arr); right.delete(`${c},${r}`); right.add(`${c},${(r + 1) % 4}`); if (skey(right) === skey(R2)) right.add(`${3 + ((c + 1) % 3)},${(r + 2) % 4}`); }
  const all = new Set([...L, ...right]);
  return YN(`sy${skey(all)}`, T('La ligne rose est-elle un axe de symétrie?', 'Is the pink line a line of symmetry?'), skey(right) === skey(R2), tipSym, { stimulus: { svg: gridSvg(6, 4, all, { axis: 'v' }) } });
}
function reflectQ(R, axis) {
  if (axis === 'v') {
    const L = halfShape(R), good = mirrorV(L, 6), tr = shiftV(L, 3), upd = mirrorH(mirrorV(L, 6), 4);
    const opts = [good, tr, upd].filter((s, i, a) => a.findIndex((x) => skey(x) === skey(s)) === i);
    if (opts.length < 2) opts.push(shiftV(L, 2));
    return CH(`rv${skey(L)}`, T('Quelle image montre la bonne réflexion (en orange)?', 'Which picture shows the correct reflection (in orange)?'), opts.map((s) => ({ svg: gridSvg(6, 4, L, { axis: 'v', cells2: s, cs: 22 }) })), tipSym, { cols: opts.length, stimulus: { svg: gridSvg(6, 4, L, { axis: 'v' }) } });
  }
  const T0 = halfShape(R, 5, 2), good = mirrorH(T0, 4), tr = shiftH(T0, 2), lr = mirrorV(mirrorH(T0, 4), 5);
  const opts = [good, tr, lr].filter((s, i, a) => a.findIndex((x) => skey(x) === skey(s)) === i);
  if (opts.length < 2) opts.push(shiftH(T0, 1));
  return CH(`rh${skey(T0)}`, T('Quelle image montre la bonne réflexion (en orange)?', 'Which picture shows the correct reflection (in orange)?'), opts.map((s) => ({ svg: gridSvg(5, 4, T0, { axis: 'h', cells2: s, cs: 22 }) })), tipSym, { cols: opts.length, stimulus: { svg: gridSvg(5, 4, T0, { axis: 'h' }) } });
}
const SYM_L = 'AHIMOTUVWXY'.split(''), ASYM_L = 'FGJKLNPQRSZ'.split('');
const TILES = [['carre', T('carré', 'square')], ['rectangle', T('rectangle', 'rectangle')], ['triangle', T('triangle', 'triangle')], ['hexagone', T('hexagone', 'hexagon')], ['losange', T('losange', 'rhombus')]];
const NOTILE = [T('cercle', 'circle'), T('pentagone régulier', 'regular pentagon'), T('octogone régulier', 'regular octagon')];
const FR_EMO = ['🐟', '🐌', '🦆', '🐓', '🦒', '🐘', '🚗', '🐢', '🐇', '🦔', '🐿️', '🦕', '🚲', '🦜'];
const PATTERNS = { trans: [false, false, false, false, false, false, false], refl: [false, true, false, true, false, true, false], pair: [false, false, true, true, false, false, true], vflip: [false, 'v', false, 'v', false, 'v', false] };
const AXES = [['carre', 4], ['rectangle', 2], ['losange', 2], ['eq3', 3], ['hexagone', 6], ['pentagone', 5], ['octogone', 8], ['parallelogramme', 0]];
const m21 = unit('g3m21', '🦋', T('Symétrie, frises et dallages', 'Symmetry, friezes and tilings'),
  'Géométrie — réflexion (axe de symétrie), frises et dallages', [
    [
      [2, (R) => symYN(R)],
      (R) => { const s = R.pick(SYM_L), o = R.sample(ASYM_L, 3); return CH(`lt${s}${o.join('')}`, T('Quelle lettre a un axe de symétrie vertical (de haut en bas)?', 'Which letter has a vertical line of symmetry (top to bottom)?'), [s, ...o].map((l) => tx(l)), T('Imagine un miroir debout au milieu de la lettre.', 'Imagine a mirror standing in the middle of the letter.')); },
      (R) => { const [k, name] = R.pick(TILES), o = R.sample(TILES.filter((t) => t[0] !== k), 3); return CH(`tl${k}${o.map((x) => x[0]).join('')}`, T('Ce dallage est fait avec quelle figure?', 'This tiling is made with which shape?'), [name, ...o.map((x) => x[1])].map(tx), T('Un dallage couvre tout, sans trou et sans chevauchement.', 'A tiling covers everything, with no gaps and no overlaps.'), { cols: 2, stimulus: { svg: tilingSvg(k) } }); },
    ],
    [
      [3, (R) => reflectQ(R, 'v')],
      (R) => { const bad = R.pick(NOTILE), ok = R.sample(TILES, 3).map((t) => t[1]); return CH(`nt${bad.fr}${ok.map((x) => x.fr).join('')}`, T('Avec quelle figure ne peut-on PAS faire un dallage (sans trous ni chevauchements)?', 'Which shape can NOT make a tiling (no gaps, no overlaps)?'), [bad, ...ok].map(tx), T('Pense à des tuiles collées : certaines formes laissent des trous.', 'Think of tiles side by side: some shapes leave gaps.'), { cols: 2 }); },
      (R) => symYN(R),
    ],
    [
      [2, (R) => { const e = R.pick(FR_EMO), pk = R.pick(Object.keys(PATTERNS)), len = R.int(4, 6), pat = PATTERNS[pk]; const ans = pat[len]; const opts = [ans, ...[false, true, 'v'].filter((x) => x !== ans)]; return CH(`fz${e}${pk}${len}`, T('Quel motif continue la frise?', 'Which picture continues the frieze?'), opts.map((f) => ({ svg: oneEmojiSvg(e, f) })), T('Trouve la règle : on glisse (même sens), on retourne comme dans un miroir, ou on renverse la tête en bas?', 'Find the rule: slide (same way), flip like a mirror, or turn upside down?'), { cols: 3, stimulus: { svg: friezeSvg(e, [...pat.slice(0, len), null]) } }); }],
      [2, (R) => reflectQ(R, 'h')],
      (R) => { const [k, n] = R.pick(AXES), f = figure(R, k); return K(`ax${k}${f.v}`, T('Combien d’axes de symétrie a cette figure?', 'How many lines of symmetry does this shape have?'), n, T('Cherche toutes les façons de plier la figure en deux moitiés pareilles.', 'Look for every way to fold the shape into two matching halves.'), { stimulus: { svg: polySvg(quadPts(k, k === 'carre' || k === 'rectangle' || k === 'losange' || k === 'parallelogramme' ? f.v : 0), PCOL[f.col]) } }); },
    ],
  ]);

// ---------- g3m22 : plan cartésien ----------
const LET = 'ABCDEFGH'.split('');
const cp = (x, y) => T(`(${x}, ${y})`, `(${x}, ${y})`);
const tipXY = T('D’abord on avance sur l’axe horizontal (x), ensuite on monte (y) : (x, y).', 'First go across (x), then go up (y): (x, y).');
function points(R, n, k) { const pts = []; while (pts.length < k) { const x = R.int(0, n - 1), y = R.int(0, n); if (!pts.some((p) => p.x === x && p.y === y) && (x || y)) pts.push({ x, y, label: LET[pts.length] }); } return pts; }
const m22 = unit('g3m22', '🗺️', T('Le plan cartésien', 'The coordinate grid'),
  'Géométrie — repérer des points dans le plan cartésien (1er quadrant)', [
    [
      [3, (R) => { const [p] = points(R, 6, 1); const d = [cp(p.y, p.x), cp(p.x + 1, p.y), cp(p.x, p.y + 1), cp(p.x - 1, p.y), cp(p.y + 1, p.x)].filter((o) => o.fr !== cp(p.x, p.y).fr && !o.fr.includes('-')); return CH(`c${p.x}_${p.y}`, T('Quelles sont les coordonnées du point A?', 'What are the coordinates of point A?'), uniqT([cp(p.x, p.y), ...d]).slice(0, 4).map(tx), tipXY, { stimulus: { svg: S.coordPlane(6, [p]) } }); }],
      (R) => { const [p] = points(R, 6, 1), ax = R.chance(0.5); return K(`k${p.x}_${p.y}_${ax}`, ax ? T('Quelle est la coordonnée x (horizontale) du point A?', 'What is the x (across) coordinate of point A?') : T('Quelle est la coordonnée y (verticale) du point A?', 'What is the y (up) coordinate of point A?'), ax ? p.x : p.y, tipXY, { stimulus: { svg: S.coordPlane(6, [p]) } }); },
    ],
    [
      [3, (R) => { const ps = points(R, 8, 4), t = R.pick(ps); return CH(`w${ps.map((p) => p.x + '' + p.y).join('_')}${t.label}`, T(`Quel point est situé à ${cp(t.x, t.y).fr}?`, `Which point is at ${cp(t.x, t.y).en}?`), [t, ...ps.filter((p) => p !== t)].map((p) => tx(p.label)), tipXY, { stimulus: { svg: S.coordPlane(8, ps) } }); }],
      (R) => { const ps = points(R, 8, 3), t = R.pick(ps); const d = [cp(t.y, t.x), cp(t.x + 1, t.y), cp(t.x, t.y - 1), cp(t.x - 1, t.y + 1)].filter((o) => o.fr !== cp(t.x, t.y).fr && !o.fr.includes('-')); return CH(`c8${ps.map((p) => p.x + '' + p.y).join('_')}${t.label}`, T(`Quelles sont les coordonnées du point ${t.label}?`, `What are the coordinates of point ${t.label}?`), uniqT([cp(t.x, t.y), ...d]).slice(0, 4).map(tx), tipXY, { stimulus: { svg: S.coordPlane(8, ps) } }); },
    ],
    [
      (R) => { const x = R.int(0, 4), y = R.int(0, 5), dx = R.int(1, 3), dy = R.int(1, 3), up = R.chance(0.6); const ny = up ? y + dy : y - dy; if (ny < 0) return K(`dx${x}_${y}_${dx}`, T(`Le point A avance de ${dx} vers la droite. Quelle est sa nouvelle coordonnée x?`, `Point A moves ${dx} to the right. What is its new x coordinate?`), x + dx, tipXY, { stimulus: { svg: S.coordPlane(8, [{ x, y, label: 'A' }]) } }); const ans = cp(x + dx, ny); const d = [cp(x + dy, up ? y + dx : y - dx), cp(x - dx, ny), cp(x + dx, up ? y - dy : y + dy), cp(ny, x + dx), cp(x + dx + 1, ny), cp(x, ny), cp(x + dx, ny + 1)].filter((o) => !o.fr.includes('-')); return CH(`mv${x}_${y}_${dx}_${dy}_${up}`, T(`Déplace le point A : ${dx} vers la droite, puis ${dy} vers le ${up ? 'haut' : 'bas'}. Où arrive-t-il?`, `Move point A ${dx} to the right, then ${dy} ${up ? 'up' : 'down'}. Where does it land?`), uniqT([ans, ...d]).filter((o, i) => i === 0 || o.fr !== ans.fr).slice(0, 4).map(tx), T('Déplace d’abord sur l’axe horizontal, puis sur l’axe vertical.', 'Move across first, then up or down.'), { stimulus: { svg: S.coordPlane(8, [{ x, y, label: 'A' }]) } }); },
      (R) => { const x1 = R.int(0, 3), y1 = R.int(0, 3), x2 = x1 + R.int(2, 4), y2 = y1 + R.int(2, 4); const pts = [{ x: x1, y: y1, label: 'A' }, { x: x2, y: y1, label: 'B' }, { x: x2, y: y2, label: 'C' }]; const ans = cp(x1, y2); return CH(`rc${x1}${y1}${x2}${y2}`, T('A, B et C sont 3 sommets d’un rectangle. Où est le 4e sommet D?', 'A, B and C are 3 corners of a rectangle. Where is the 4th corner D?'), uniqT([ans, cp(y2, x1), cp(x1, y1 + 1), cp(x2 + 1, y2), cp(x1 + 1, y2)]).slice(0, 4).map(tx), T('D est au-dessus de A et à la même hauteur que C.', 'D is straight above A and at the same height as C.'), { stimulus: { svg: S.coordPlane(8, pts) } }); },
      (R) => { const y = R.int(0, 7), x1 = R.int(0, 2), x2 = x1 + R.int(2, 5), v = R.chance(0.5); const pts = v ? [{ x: y, y: x1, label: 'A' }, { x: y, y: x2, label: 'B' }] : [{ x: x1, y, label: 'A' }, { x: x2, y, label: 'B' }]; return K(`ds${y}_${x1}_${x2}_${v}`, T('Combien de cases y a-t-il entre A et B?', 'How many units apart are A and B?'), x2 - x1, T('Soustrais les coordonnées qui changent.', 'Subtract the coordinates that change.'), { stimulus: { svg: S.coordPlane(8, pts) } }); },
    ],
  ]);

export const units = [m18, m19, m20, m21, m22];
