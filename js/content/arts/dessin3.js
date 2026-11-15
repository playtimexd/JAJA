// Arts plastiques — « Grandes scènes » (série B) : 12 grands dessins avec plusieurs éléments.
// Chaque scène = liste d'étapes (groupes de formes) ; les images cumulatives (anciens traits foncés + nouveaux traits roses)
// et le dessin colorié final sont générés (même principe que dessin.js).
// Attributs spéciaux : f="couleur" (remplissage au coloriage), z="n" (ordre d'empilement au coloriage).
const D = '#3a3f55', K = '#ff5d8f';
const Ye = '#ffd34e', O = '#ff9f43', Rd = '#ff6b6b', Bl = '#6ec1ff', Gr = '#6fd08c', Pk = '#ff9ec4', Pu = '#b38cff';
const Br = '#b97a4b', Tn = '#e8b878', Wh = '#ffffff', Gy = '#d5dbea', Cr = '#fff1d6', Lb = '#cdeeff', Sk = '#f6cfa8';
const Dg = '#4fae6a', Dk = '#4a4f6a', Gy2 = '#aab2c8';
const F = (col, z) => `f="${col}"${z ? ` z="${z}"` : ''}`;
const n1 = (v) => Math.round(v * 10) / 10;
const range = (k, f) => Array.from({ length: k }, (_, i) => f(i));

// Fabrique de formes avec position (X,Y) et échelle s.
function T(X = 0, Y = 0, s = 1) {
  const fx = (v) => n1(X + v * s), fy = (v) => n1(Y + v * s), k = (v) => n1(v * s);
  const tp = (d) => d.replace(/([a-zA-Z])([^a-zA-Z]*)/g, (m, L, rest) => {
    const a = (rest.match(/-?\d*\.?\d+/g) || []).map(Number);
    if (L === 'H') return L + a.map(fx).join(' ');
    if (L === 'V') return L + a.map(fy).join(' ');
    if (L === 'h' || L === 'v') return L + a.map(k).join(' ');
    const up = L === L.toUpperCase(), o = [];
    for (let i = 0; i < a.length; i += 2) o.push(up ? fx(a[i]) : k(a[i]), up ? fy(a[i + 1]) : k(a[i + 1]));
    return L + o.join(' ');
  });
  const pp = (str) => str.trim().split(/\s+/).map((q) => { const [x, y] = q.split(','); return `${fx(+x)},${fy(+y)}`; }).join(' ');
  return {
    c: (x, y, r, a = '') => `<circle cx="${fx(x)}" cy="${fy(y)}" r="${k(r)}" ${a}/>`,
    e: (x, y, rx, ry, a = '') => `<ellipse cx="${fx(x)}" cy="${fy(y)}" rx="${k(rx)}" ry="${k(ry)}" ${a}/>`,
    r: (x, y, w, h, rd, a = '') => `<rect x="${fx(x)}" y="${fy(y)}" width="${k(w)}" height="${k(h)}" rx="${k(rd)}" ${a}/>`,
    l: (x1, y1, x2, y2, a = '') => `<line x1="${fx(x1)}" y1="${fy(y1)}" x2="${fx(x2)}" y2="${fy(y2)}" ${a}/>`,
    p: (d, a = '') => `<path d="${tp(d)}" ${a}/>`,
    pg: (pts, a = '') => `<polygon points="${pp(pts)}" ${a}/>`,
  };
}
const g = T();
const pt = (cx, cy, R, deg) => [cx + R * Math.cos(deg * Math.PI / 180), cy + R * Math.sin(deg * Math.PI / 180)];
const bg = (x, y, w, h, col, z = -100) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" stroke="none" f="${col}" z="${z}"/>`;

const strip = (s) => s.replace(/ (?:f|z)="[^"]*"/g, '');
const info = (s) => ({ s: strip(s), f: (s.match(/ f="([^"]*)"/) || [])[1] || 'none', z: +((s.match(/ z="(-?\d+)"/) || [])[1] || 0) });
const wrap = (inner) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const grp = (els, col, w) => (els.length ? `<g fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${els.join('')}</g>` : '');
const S = (fr, en, ...els) => ({ fr, en, els: els.flat(Infinity) });

const MAT = [
  { fr: 'Une grande feuille blanche', en: 'A big sheet of white paper' },
  { fr: 'Crayon à mine', en: 'Pencil' },
  { fr: 'Gomme à effacer', en: 'Eraser' },
  { fr: 'Crayons de couleur ou feutres', en: 'Colored pencils or markers' },
];

const LIST = [];
function A(id, emoji, fr, en, level, minutes, steps, cfr, cen, extras = []) {
  const out = steps.map((st, i) => {
    const done = steps.slice(0, i).flatMap((s) => s.els).map(strip);
    return { svg: wrap(grp(done, D, 6) + grp(st.els.map(strip), K, 8)), text: { fr: st.fr, en: st.en } };
  });
  const all = steps.flatMap((s) => s.els).concat(extras.flat(Infinity)).map(info).map((o, i) => ({ ...o, i }));
  all.sort((a, b) => a.z - b.z || a.i - b.i);
  const body = all.map((o) => o.s.replace(/\s*\/>$/, ` fill="${o.f}"/>`)).join('');
  out.push({ svg: wrap(`<g stroke="${D}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${body}</g>`), text: { fr: cfr, en: cen } });
  LIST.push({ id: `dessin-scene-${id}`, cat: 'dessin', emoji, title: { fr, en }, level, minutes, theme: 'scene', season: null, materials: MAT, adult: false, steps: out });
}

// ───────── formes réutilisables ─────────
const cloud = (x, y, s = 1) => { const t = T(x, y, s); return [t.p('M-30 8Q-46 8-40-4Q-36-16-22-12Q-14-28 4-20Q18-30 30-14Q46-12 42 2Q46 10 30 8Z', F(Wh))]; };
const sun = (x, y, s = 1) => { const t = T(x, y, s); return [t.c(0, 0, 14, F(Ye)), ...range(8, (i) => { const a = pt(0, 0, 20, i * 45), b = pt(0, 0, 28, i * 45); return t.l(a[0], a[1], b[0], b[1]); })]; };
const bird = (x, y, s = 1) => T(x, y, s).p('M-9 2Q-4-6 0 1Q4-6 9 2');
const tree = (x, y, s = 1, col = Gr) => { const t = T(x, y, s); return [t.r(-5, -3, 10, 24, 2, F(Br)), t.c(0, -22, 21, F(col))]; };
const pine = (x, y, s = 1, col = Dg) => { const t = T(x, y, s); return [t.r(-4, -12, 8, 22, 1, F(Br)), t.pg('0,-62 -19,-32 19,-32', F(col)), t.pg('0,-46 -25,-10 25,-10', F(col))]; };
const person = (x, y, s, shirt, pants, hair, skin = Sk) => {
  const t = T(x, y, s);
  return [t.r(-8, -13, 7, 13, 2, F(pants)), t.r(1, -13, 7, 13, 2, F(pants)),
    t.p('M-9 -36Q-9 -38 -5 -38H5Q9 -38 9 -36L10 -12H-10Z', F(shirt)), t.l(-9, -34, -14, -18), t.l(9, -34, 14, -18),
    t.c(0, -45, 8, F(skin)), t.p('M-8.5 -46Q-9-55 0-55Q9-55 8.5-46Q0-50-8.5-46Z', F(hair))];
};
const bust = (x, y, s, shirt, hair, skin = Sk) => {
  const t = T(x, y, s);
  return [t.p('M-18 34L-18 24Q-18 12 0 12Q18 12 18 24V34Z', F(shirt)), t.c(0, 0, 11, F(skin)), t.p('M-11-2Q-12-14 0-14Q12-14 11-2Q0-8-11-2Z', F(hair))];
};
const balloon = (x, y, r, col, hx, hy) => [g.c(x, y, r, F(col)), g.l(x, y + r, hx, hy)];
const dog = (x, y, s, col, ear) => {
  const t = T(x, y, s);
  return [t.r(-14, -9, 5, 9, 2, F(col)), t.r(-6, -9, 5, 9, 2, F(col)), t.r(6, -9, 5, 9, 2, F(col)), t.r(13, -9, 5, 9, 2, F(col)),
    t.p('M18-20Q30-28 27-40', ''), t.e(0, -16, 19, 10, F(col)), t.c(-21, -25, 9, F(col)), t.e(-30, -22, 5, 3.5, F(col)),
    t.p('M-22-32Q-14-38-13-26Q-17-24-22-32Z', F(ear)), t.c(-24, -27, 1.6, F(D)), t.c(-34, -23, 1.8, F(D))];
};
const festoon = (x0, y0, cx, cy, x1, y1, k, cols, fh = 14) => {
  const q = (t) => [(1 - t) ** 2 * x0 + 2 * t * (1 - t) * cx + t * t * x1, (1 - t) ** 2 * y0 + 2 * t * (1 - t) * cy + t * t * y1];
  return [g.p(`M${x0} ${y0}Q${cx} ${cy} ${x1} ${y1}`), range(k, (i) => { const [x, y] = q((i + 0.5) / k); return g.pg(`${n1(x - 7)},${n1(y)} ${n1(x + 7)},${n1(y)} ${n1(x)},${n1(y + fh)}`, F(cols[i % cols.length])); })];
};
const stripes = (x0, k, w, y0, y1, cols) => range(k, (i) => { const x = x0 + i * w; return g.p(`M${x} ${y0}L${x + w} ${y0}L${x + w} ${y1}Q${x + w / 2} ${y1 + 16} ${x} ${y1}Z`, F(cols[i % cols.length])); });

// ═════════════ 1. LE ZOO ═════════════
{
  const giraffe = (x, y) => {
    const t = T(x, y);
    return [[t.r(-24, 12, 7, 34, 2, F(Ye)), t.r(-12, 14, 7, 32, 2, F(Ye)), t.r(10, 14, 7, 32, 2, F(Ye)), t.r(20, 12, 7, 34, 2, F(Ye)), t.l(-30, -4, -40, 16), t.e(0, 0, 30, 17, F(Ye))],
      [t.p('M16-10L32-72L46-68L34 0Z', F(Ye)), t.e(46, -72, 14, 8, F(Ye)), t.l(44, -80, 43, -90), t.l(52, -79, 55, -88), t.c(50, -74, 2.4, F(D))]];
  };
  const gSp = (() => { const t = T(60, 135); return [t.c(-12, -4, 5, F(Br)), t.c(8, 4, 5, F(Br)), t.c(-20, 6, 4, F(Br)), t.c(14, -8, 4, F(Br)), t.c(30, -50, 4, F(Br)), t.c(26, -30, 4, F(Br)), t.c(38, -60, 3.5, F(Br))]; })();
  const ele = (x, y) => {
    const t = T(x, y);
    return [[t.r(-30, 18, 16, 30, 4, F(Gy2)), t.r(8, 18, 16, 30, 4, F(Gy2)), t.l(-42, -6, -50, 14), t.e(0, 0, 42, 28, F(Gy2))],
      [t.e(44, -10, 22, 22, F(Gy2)), t.e(32, -4, 14, 20, F('#c5cbe0')), t.c(52, -16, 3, F(D)), t.p('M58-2Q76 4 72 30Q70 40 62 36Q66 24 56 14Z', F(Gy2)), t.p('M50 10Q62 14 60 26', F(Wh))]];
  };
  const lion = (() => {
    const t = T(352, 138);
    return [g.p('M296 182Q300 148 332 150L378 150Q396 156 396 182Z', F(Gy)), t.r(-16, 8, 8, 12, 3, F(Tn)), t.r(8, 8, 8, 12, 3, F(Tn)), t.p('M26-2Q42-4 40-20'), t.c(40, -22, 4, F(O)), t.e(0, 0, 27, 13, F(Tn)),
      t.c(-26, -6, 19, F('#d98a2b')), t.c(-26, -4, 11, F('#ffd98a')), t.c(-30, -8, 2, F(D)), t.c(-22, -8, 2, F(D)), t.pg('-28,-3 -24,-3 -26,0', F(Pk))];
  })();
  const peng = (x, y, s) => {
    const t = T(x, y, s);
    return [t.e(-4, 0, 4, 2, F(O)), t.e(4, 0, 4, 2, F(O)), t.e(0, -15, 10, 15, F(Dk)), t.e(0, -12, 6, 10, F(Wh)), t.pg('-3,-22 3,-22 0,-18', F(O)), t.c(-3.5, -25, 2.4, F(Wh)), t.c(3.5, -25, 2.4, F(Wh)), t.p('M-10-20Q-15-10-10-5'), t.p('M10-20Q15-10 10-5')];
  };
  const gi = giraffe(60, 135), el = ele(215, 138);
  A('zoo', '🦒', 'Le zoo', 'The zoo', 3, 50, [
    S('Trace une ligne droite pour le sol.', 'Draw a straight line for the ground.', g.l(0, 165, 400, 165)),
    S('Dessine la clôture du zoo : deux barres et des poteaux.', 'Draw the zoo fence: two rails and some posts.', g.l(0, 184, 400, 184), g.l(0, 198, 400, 198), range(11, (i) => g.r(10 + i * 36, 172, 6, 32, 2, F(Tn, 6)))),
    S('Derrière la clôture, dessine deux grands arbres.', 'Behind the fence, draw two big trees.', tree(150, 138, 1.3), tree(262, 142, 1.1)),
    S('Dessine le corps et les pattes de la girafe.', 'Draw the giraffe\'s body and legs.', gi[0]),
    S('Ajoute son long cou et sa tête avec deux petites cornes.', 'Add its long neck and its head with two little horns.', gi[1]),
    S('Dessine le gros corps et les pattes de l\'éléphant.', 'Draw the elephant\'s big body and legs.', el[0]),
    S('Ajoute la tête, l\'oreille, la trompe et la défense.', 'Add the head, ear, trunk and tusk.', el[1]),
    S('À droite, dessine un gros rocher avec un lion qui a une crinière.', 'On the right, draw a big rock with a lion that has a mane.', lion),
    S('En bas, dessine un bassin rond avec de l\'eau et un îlot.', 'At the bottom, draw a pool with water and a little island.', g.r(205, 206, 188, 88, 16, F(Gy)), g.r(214, 214, 170, 72, 10, F(Bl)), g.p('M226 236Q238 228 250 236Q262 244 274 236'), g.p('M330 266Q342 258 354 266Q366 274 378 266'), g.e(302, 254, 38, 12, F(Gy))),
    S('Sur l\'îlot, dessine trois pingouins.', 'On the island, draw three penguins.', peng(282, 252, 0.9), peng(304, 250, 1), peng(326, 253, 0.85)),
    S('À gauche, dessine un papa et un enfant qui visitent le zoo.', 'On the left, draw a dad and a child visiting the zoo.', person(45, 290, 1.1, Rd, Bl, '#5b3a29'), person(95, 293, 0.8, Gr, Pu, '#e0a030')),
    S('Dessine un ballon que l\'enfant tient, et une dame qui regarde.', 'Draw a balloon the child holds, and a lady looking on.', balloon(110, 238, 15, Pk, 106, 280), person(158, 290, 1.1, Pu, '#59607f', '#2d2a3a')),
    S('Dans le ciel, dessine le soleil, des nuages et des oiseaux.', 'In the sky, draw the sun, clouds and birds.', sun(352, 38, 1), cloud(80, 38, 1), cloud(215, 30, 0.9), bird(150, 70), bird(180, 55, 0.8)),
  ], 'Colorie ton zoo!', 'Color your zoo!', [bg(0, 0, 400, 165, Lb), bg(0, 165, 400, 135, '#c4eaa8', -99), gSp, bg(0, 244, 200, 56, '#ead9b8', -98)]);
}

// ═════════════ 2. LA CLASSE ═════════════
{
  const stu = (x, y, s, hair, shirt) => { const t = T(x, y, s); return [t.r(-15, 16, 30, 9, 3, F(Br)), t.p('M-17 22Q-17-2 0-3Q17-2 17 22Z', F(shirt)), t.c(0, -14, 10, F(hair))]; };
  const desk = (x, y, s) => { const t = T(x, y, s); return [t.r(-30, -36, 60, 13, 3, F(Tn)), t.l(-26, -23, -26, -8), t.l(26, -23, 26, -8)]; };
  const hairs = ['#5b3a29', '#2d2a3a', '#e0a030', '#b0532a', '#2d2a3a', '#5b3a29'], shirts = [Rd, Bl, Gr, Pu, O, Pk];
  const far = [120, 200, 280].map((x) => [x, 222, 0.8]), near = [90, 200, 310].map((x) => [x, 270, 1.1]);
  const globe = T(150, 130);
  const books = [[320, 52, 8, '#ff6b6b'], [330, 52, 8, '#6ec1ff'], [340, 50, 10, '#6fd08c'], [352, 52, 8, '#ffd34e'], [362, 50, 10, '#b38cff'],
    [320, 94, 10, '#ffd34e'], [332, 92, 8, '#ff9f43'], [342, 94, 10, '#ff6b6b'], [354, 92, 8, '#6ec1ff'], [364, 94, 9, '#6fd08c'],
    [320, 134, 8, '#b38cff'], [330, 132, 10, '#6ec1ff'], [342, 134, 10, '#ff6b6b'], [354, 134, 9, '#ffd34e']];
  A('classe', '🏫', 'La classe', 'The classroom', 3, 55, [
    S('Trace une ligne pour le plancher.', 'Draw a line for the floor.', g.l(0, 190, 400, 190)),
    S('Dessine le grand tableau avec son cadre et la tablette.', 'Draw the big blackboard with its frame and ledge.', g.r(95, 40, 200, 95, 5, F('#4d6b5a')), g.r(103, 48, 184, 79, 3, F('#5d7f6a')), g.r(120, 135, 150, 6, 2, F(Br))),
    S('À gauche, dessine une fenêtre avec une barre au milieu.', 'On the left, draw a window with a bar in the middle.', g.r(12, 45, 66, 84, 3, F(Lb)), g.l(45, 45, 45, 129), g.l(12, 87, 78, 87), g.r(6, 129, 78, 8, 2, F(Br))),
    S('Au-dessus du tableau, dessine une horloge ronde.', 'Above the board, draw a round clock.', g.c(195, 20, 13, F(Wh)), g.l(195, 20, 195, 12), g.l(195, 20, 202, 20)),
    S('À droite, dessine une bibliothèque avec trois tablettes.', 'On the right, draw a bookcase with three shelves.', g.r(312, 36, 80, 154, 4, F(Br)), g.l(312, 76, 392, 76), g.l(312, 118, 392, 118), g.l(312, 158, 392, 158)),
    S('Range des livres sur les tablettes.', 'Put some books on the shelves.', books.map(([x, y, w, c]) => g.r(x, y, w, (y < 76 ? 76 : y < 118 ? 118 : 158) - y, 1, F(c)))),
    S('Dessine le bureau de l\'enseignante avec un globe dessus.', 'Draw the teacher\'s desk with a globe on top.', g.r(108, 154, 90, 10, 3, F(Tn)), g.r(116, 164, 74, 26, 2, F(Br)), globe.c(0, 0, 15, F(Bl)), globe.p('M0-15Q-8 0 0 15 M0-15Q8 0 0 15'), globe.l(-15, 0, 15, 0), g.l(150, 145, 150, 154)),
    S('Dessine l\'enseignante debout devant le tableau.', 'Draw the teacher standing in front of the board.', person(255, 190, 1.3, Pu, '#59607f', '#5b3a29'), g.l(275, 144, 238, 100)),
    S('Dessine deux rangées de pupitres, d\'abord ceux du fond.', 'Draw the desks, starting with the far row.', far.map(([x, y, s]) => desk(x, y, s))),
    S('Ajoute des élèves vus de dos derrière ces pupitres.', 'Add pupils seen from behind at those desks.', far.map(([x, y, s], i) => stu(x, y, s, hairs[i], shirts[i]))),
    S('Dessine les pupitres de la rangée devant.', 'Draw the desks of the front row.', near.map(([x, y, s]) => desk(x, y, s))),
    S('Ajoute trois élèves vus de dos, plus gros parce qu\'ils sont plus proches.', 'Add three pupils from behind, bigger because they are closer.', near.map(([x, y, s], i) => stu(x, y, s, hairs[i + 3], shirts[i + 3]))),
    S('Ajoute une plante sur le bord de la fenêtre et une affiche au mur.', 'Add a plant on the windowsill and a poster on the wall.', g.r(30, 112, 20, 17, 3, F(O)), g.p('M40 112Q30 94 36 90Q42 100 40 112 M40 112Q50 94 46 90Q38 100 40 112', F(Gr)), g.r(14, 150, 40, 30, 2, F(Wh)), g.c(34, 165, 8, F(Ye))),
  ], 'Colorie ta classe!', 'Color your classroom!', [bg(0, 0, 400, 190, '#fff1d6'), bg(0, 190, 400, 110, '#e8c996', -99),
    `<path d="M120 70L150 70M120 90Q140 80 160 100L180 80Q200 100 230 78" stroke="#fff" f="none"/>`, g.c(120, 100, 10, 'stroke="#fff" f="none"'), g.pg('240,118 262,118 251,98', 'stroke="#fff" f="none"'), g.c(50, 70, 10, F(Ye, -50))]);
}

// ═════════════ 3. LA CUISINE EN FÊTE ═════════════
{
  const cat = (x, y) => {
    const t = T(x, y);
    return [[t.p('M18-24Q40-26 36-50', ''), t.e(0, -22, 17, 22, F(O)), t.e(-8, 0, 7, 3, F(O)), t.e(8, 0, 7, 3, F(O))],
      [t.pg('-14,-58 -17,-76 -5,-66', F(O)), t.pg('14,-58 17,-76 5,-66', F(O)), t.c(0, -52, 15, F(O)), t.c(-6, -54, 2.4, F(D)), t.c(6, -54, 2.4, F(D)), t.pg('-2,-49 2,-49 0,-46', F(Pk)), t.p('M0-46Q-3-42-6-44 M0-46Q3-42 6-44'), t.l(-14, -48, -24, -50), t.l(14, -48, 24, -50)]];
  };
  const hat = (x, y, s, col) => { const t = T(x, y, s); return [t.pg('0,-34 -14,0 14,0', F(col)), t.c(0, -36, 4, F(Ye)), t.l(-8, -14, 8, -14)]; };
  const fl = festoon(0, 10, 100, 40, 400, 10, 9, [Rd, Ye, Bl, Gr, Pk], 14);
  const pres = (x, y, w, h, c) => [g.r(x, y, w, h, 2, F(c)), g.l(x + w / 2, y, x + w / 2, y + h), g.p(`M${x + w / 2} ${y}Q${x + w / 2 - 12} ${y - 14} ${x + w / 2 - 4} ${y - 4}M${x + w / 2} ${y}Q${x + w / 2 + 12} ${y - 14} ${x + w / 2 + 4} ${y - 4}`)];
  const ct = cat(335, 296);
  A('cuisine-fete', '🎂', 'La cuisine en fête', 'The party kitchen', 3, 50, [
    S('Trace la ligne du plancher.', 'Draw the floor line.', g.l(0, 170, 400, 170)),
    S('Dessine une grande fenêtre à gauche avec ses rideaux.', 'Draw a big window on the left with its curtains.', g.r(40, 30, 90, 80, 3, F(Lb)), g.l(85, 30, 85, 110), g.l(40, 70, 130, 70), g.p('M26 24Q40 40 36 118L26 118Z', F(Rd)), g.p('M144 24Q130 40 134 118L144 118Z', F(Rd))),
    S('À droite, dessine l\'armoire du haut et le comptoir du bas.', 'On the right, draw the top cupboard and the counter below.', g.r(262, 20, 128, 60, 4, F(Br)), g.l(326, 20, 326, 80), g.r(262, 118, 128, 52, 3, F(Tn)), g.l(326, 118, 326, 170), g.c(318, 140, 2.5), g.c(334, 140, 2.5), g.r(256, 112, 140, 8, 2, F(Gy))),
    S('Dessine une guirlande qui pend en haut du mur.', 'Draw a garland hanging at the top of the wall.', fl[0]),
    S('Au milieu, dessine la table ronde avec ses pattes.', 'In the middle, draw the round table with its legs.', g.l(100, 256, 96, 296), g.l(150, 270, 148, 296), g.l(220, 270, 222, 296), g.l(270, 256, 274, 296), g.e(185, 238, 120, 32, F('#d99b66'))),
    S('Sur la table, dessine un gâteau à deux étages.', 'On the table, draw a two-tier cake.', g.r(150, 198, 70, 28, 4, F(Pk)), g.r(160, 174, 50, 24, 4, F(Cr)), g.p('M150 204Q158 214 166 204Q174 214 182 204Q190 214 198 204Q206 214 214 204Q218 212 220 204')),
    S('Plante trois bougies sur le gâteau.', 'Stick three candles on the cake.', g.r(168, 158, 5, 16, 1, F(Bl)), g.r(182, 158, 5, 16, 1, F(Gr)), g.r(196, 158, 5, 16, 1, F(Ye))),
    S('Ajoute une petite flamme sur chaque bougie.', 'Add a little flame on each candle.', g.p('M170 156Q164 148 170 142Q176 148 170 156Z', F(O)), g.p('M184 156Q178 148 184 142Q190 148 184 156Z', F(O)), g.p('M198 156Q192 148 198 142Q204 148 198 156Z', F(O))),
    S('Pose deux chapeaux de fête sur la table.', 'Put two party hats on the table.', hat(100, 236, 1, Bl), hat(265, 236, 1, Gr)),
    S('En bas à gauche, dessine deux cadeaux avec un ruban.', 'At the bottom left, draw two presents with ribbons.', pres(22, 262, 50, 34, Pu), pres(70, 272, 38, 24, O)),
    S('Au-dessus des cadeaux, dessine trois ballons avec leur ficelle.', 'Above the presents, draw three balloons with their strings.', balloon(30, 205, 17, Rd, 48, 262), balloon(62, 186, 17, Ye, 48, 262), balloon(90, 208, 17, Bl, 48, 262)),
    S('En bas à droite, dessine un chat assis : le corps, puis la tête.', 'At the bottom right, draw a sitting cat: the body, then the head.', ct),
    S('Ajoute un chapeau de fête sur la tête du chat et des petits fanions à la guirlande.', 'Add a party hat on the cat\'s head and little flags on the garland.', hat(335, 242, 0.7, Pk), fl[1]),
  ], 'Colorie ta fête!', 'Color your party!', [bg(0, 0, 400, 170, '#fff3c9'), bg(0, 170, 400, 130, '#f2c9a0', -99)]);
}

// ═════════════ 4. LE MARCHÉ DE FRUITS ET LÉGUMES ═════════════
{
  const pile = (x, y, col, r = 9) => [g.c(x - r * 1.1, y, r, F(col)), g.c(x + r * 1.1, y, r, F(col)), g.c(x, y - r * 1.5, r, F(col)), g.c(x - r * 2.2, y - r * 1.5 + 4, r, F(col)), g.c(x + r * 2.2, y - r * 1.5 + 4, r, F(col))];
  const crate = (x, w = 56) => g.r(x - w / 2, 136, w, 16, 3, F(Br, 4));
  const bunch = (x) => [-12, -4, 4, 12].map((d) => [g.pg(`${x + d - 5},118 ${x + d + 5},118 ${x + d},142`, F(O)), g.e(x + d, 112, 4, 7, F(Gr))]);
  const banana = (x) => [[-6, 0], [0, -8], [6, 0]].map(([dx, dy]) => g.p(`M${x + dx - 14} ${132 + dy}Q${x + dx} ${150 + dy} ${x + dx + 14} ${132 + dy}Q${x + dx} ${142 + dy} ${x + dx - 14} ${132 + dy}Z`, F(Ye)));
  const scale = (() => { const t = T(368, 150, 0.6); return [t.e(0, 0, 14, 4, F(Gy)), t.l(0, 0, 0, -32), t.l(-30, -32, 30, -32), t.l(-30, -32, -38, -18), t.l(-30, -32, -22, -18), t.p('M-40-18Q-30-8-20-18Z', F(Gy2)), t.l(30, -32, 22, -18), t.l(30, -32, 38, -18), t.p('M20-18Q30-8 40-18Z', F(Gy2)), t.c(-30, -25, 6, F(Rd))]; })();
  const basket = (x, y) => { const t = T(x, y); return [t.p('M0 0Q0 16 15 16Q30 16 30 0Z', F(Tn)), t.c(8, -4, 6, F(Rd)), t.c(20, -4, 6, F(Gr)), t.p('M0 0Q15-26 30 0')]; };
  const fcrate = (x, y, col) => [g.r(x - 26, y, 52, 20, 3, F(Br)), g.c(x - 12, y - 6, 9, F(col)), g.c(x + 6, y - 7, 9, F(col)), g.c(x + 22, y - 5, 8, F(col)), g.c(x - 2, y - 17, 9, F(col))];
  A('marche', '🍎', 'Le marché de fruits et légumes', 'The fruit and vegetable market', 3, 55, [
    S('Trace la ligne du sol.', 'Draw the ground line.', g.l(0, 198, 400, 198)),
    S('Dessine le toit rayé du premier kiosque, avec des petites vagues en bas.', 'Draw the striped roof of the first stall, with little waves at the bottom.', stripes(10, 7, 25, 50, 82, [Rd, Wh])),
    S('Dessine le toit rayé du deuxième kiosque.', 'Draw the striped roof of the second stall.', stripes(215, 7, 25, 50, 82, [Rd, Wh])),
    S('Ajoute les poteaux de chaque kiosque.', 'Add the posts of each stall.', g.l(14, 98, 14, 198), g.l(181, 98, 181, 198), g.l(219, 98, 219, 198), g.l(386, 98, 386, 198)),
    S('Dessine les deux comptoirs en bois avec des planches.', 'Draw the two wooden counters with boards.', g.r(10, 150, 175, 48, 3, F(Tn, 3)), g.r(215, 150, 175, 48, 3, F(Tn, 3)), g.l(68, 150, 68, 198), g.l(126, 150, 126, 198), g.l(273, 150, 273, 198), g.l(331, 150, 331, 198)),
    S('Sur le premier comptoir, dessine des pommes et des choux dans des caisses.', 'On the first counter, draw apples and cabbages in crates.', crate(46), pile(46, 130, Rd, 7), crate(160), g.c(150, 128, 11, F(Gr, 5)), g.c(170, 128, 11, F(Gr, 5)), g.c(160, 112, 11, F(Gr, 5))),
    S('Sur le deuxième comptoir, dessine des tomates et des carottes.', 'On the second counter, draw tomatoes and carrots.', crate(236, 46), pile(236, 130, Rd, 6), crate(284, 40), bunch(284)),
    S('Derrière le premier comptoir, dessine le marchand avec un chapeau.', 'Behind the first counter, draw the seller with a hat.', bust(103, 116, 1, Gr, Br), g.e(103, 108, 20, 4, F(Ye)), g.p('M93 108Q103 92 113 108Z', F(Ye))),
    S('Sur le deuxième comptoir, dessine un autre marchand et une petite balance.', 'On the second counter, draw another seller and a small scale.', scale, bust(332, 116, 1, Bl, '#2d2a3a')),
    S('En bas à gauche, dessine une cliente avec un panier.', 'At the bottom left, draw a lady customer with a basket.', person(70, 292, 1.25, Pu, '#59607f', '#2d2a3a'), basket(82, 266)),
    S('À droite, dessine un client avec un sac à la main.', 'On the right, draw a customer with a bag in his hand.', person(325, 292, 1.25, Rd, '#59607f', '#5b3a29'), g.r(338, 262, 18, 22, 3, F(Tn)), g.p('M342 262Q347 252 352 262')),
    S('Au milieu, dessine deux caisses de fruits sur le sol.', 'In the middle, draw two crates of fruit on the ground.', fcrate(165, 272, O), fcrate(228, 272, Ye)),
    S('Dans le ciel, dessine le soleil, un nuage et une guirlande de fanions.', 'In the sky, draw the sun, a cloud and a string of flags.', sun(355, 22, 0.8), cloud(120, 22, 0.9), festoon(0, 10, 100, 24, 200, 10, 5, [Ye, Bl, Pk], 10)),
  ], 'Colorie ton marché!', 'Color your market!', [bg(0, 0, 400, 198, Lb), bg(0, 198, 400, 102, '#ead9b8', -99)]);
}

// ═════════════ 5. LA CASERNE DE POMPIERS ═════════════
{
  const ladder = (() => { const o = []; const yy = (x, b) => b - (x - 262) * 0.2368; o.push(g.l(262, 168, 338, 150), g.l(262, 158, 338, 140)); for (let i = 0; i < 6; i++) { const x = 268 + i * 13; o.push(g.l(x, yy(x, 168), x, yy(x, 158))); } return o; })();
  const hydrant = (() => { const t = T(340, 292, 1.2); return [t.r(-12, -6, 24, 6, 2, F(Gy2)), t.r(-9, -30, 18, 26, 3, F(Rd)), t.p('M-10-30Q0-46 10-30Z', F(Rd)), t.r(-14, -22, 6, 8, 1, F(Gy2)), t.r(8, -22, 6, 8, 1, F(Gy2)), t.c(0, -48, 2.5, F(Gy2))]; })();
  const ff = (() => { const t = T(200, 292, 1.3); return [person(200, 292, 1.3, '#ffcf3d', '#3a4b78', '#5b3a29'), t.p('M-10-50Q-10-64 0-64Q10-64 10-50Z', F(Rd)), t.l(-13, -50, 13, -50)]; })();
  const dal = dog(262, 294, 1.1, Wh, Dk);
  const dalSp = (() => { const t = T(262, 294, 1.1); return [t.c(-6, -18, 2.5, F(D)), t.c(6, -14, 2.5, F(D)), t.c(12, -21, 2, F(D)), t.c(-12, -12, 2, F(D)), t.c(-20, -28, 1.8, F(D))]; })();
  A('caserne', '🚒', 'La caserne de pompiers', 'The fire station', 3, 50, [
    S('Trace la ligne de la route.', 'Draw the line of the road.', g.l(0, 225, 400, 225)),
    S('À gauche, dessine le grand bâtiment de la caserne.', 'On the left, draw the big fire station building.', g.r(20, 105, 225, 120, 2, F('#e8806a'))),
    S('Ajoute le toit plat et la tour avec son petit toit pointu.', 'Add the flat roof and the tower with its pointy roof.', g.r(12, 92, 241, 16, 3, F(Gy)), g.r(98, 40, 64, 52, 2, F('#e8806a')), g.pg('90,42 130,12 170,42', F(Gy))),
    S('Dessine une horloge ronde sur la tour.', 'Draw a round clock on the tower.', g.c(130, 66, 14, F(Wh)), g.l(130, 66, 130, 56), g.l(130, 66, 138, 66)),
    S('Dessine les deux grandes portes du garage.', 'Draw the two big garage doors.', g.r(34, 140, 86, 85, 3, F(Gy)), g.r(138, 140, 86, 85, 3, F(Gy))),
    S('Dessine des lignes sur les portes et trois fenêtres en haut.', 'Draw lines on the doors and three windows above.', range(4, (i) => [g.l(36, 157 + i * 17, 118, 157 + i * 17), g.l(140, 157 + i * 17, 222, 157 + i * 17)]), g.r(36, 114, 28, 16, 2, F(Lb)), g.r(180, 114, 28, 16, 2, F(Lb))),
    S('À droite, dessine le camion de pompiers : la cabine et la grande caisse.', 'On the right, draw the fire truck: the cab and the big body.', g.r(258, 170, 86, 52, 4, F(Rd)), g.r(340, 158, 50, 64, 6, F(Rd)), g.r(352, 168, 26, 22, 3, F(Lb)), g.r(384, 206, 12, 10, 2, F(Gy))),
    S('Ajoute deux grosses roues.', 'Add two big wheels.', g.c(290, 226, 16, F(Dk, 5)), g.c(366, 226, 16, F(Dk, 5)), g.c(290, 226, 6, F(Gy, 6)), g.c(366, 226, 6, F(Gy, 6))),
    S('Pose une échelle sur le toit du camion.', 'Put a ladder on the roof of the truck.', ladder),
    S('Ajoute une lumière sur la cabine et une bande sur le côté.', 'Add a light on the cab and a stripe on the side.', g.e(365, 154, 10, 5, F(Ye)), g.r(262, 190, 76, 8, 2, F(Wh))),
    S('En bas, dessine un pompier avec son casque.', 'At the bottom, draw a firefighter with his helmet.', ff),
    S('À côté, dessine un dalmatien.', 'Next to him, draw a Dalmatian dog.', dal),
    S('Dessine une borne-fontaine, puis le soleil et un nuage.', 'Draw a fire hydrant, then the sun and a cloud.', hydrant, sun(345, 40, 0.9), cloud(240, 40, 0.9), cloud(60, 30, 0.8)),
  ], 'Colorie ta caserne!', 'Color your fire station!', [bg(0, 0, 400, 225, Lb), bg(0, 225, 400, 75, '#c8ccd9', -99), dalSp]);
}

// ═════════════ 6. LA RIVIÈRE ET LE PONT ═════════════
{
  const duck = (x, y, s) => { const t = T(x, y, s); return [t.pg('-10,-2 -17,-9 -9,-6', F(Ye)), t.e(0, 0, 12, 8, F(Ye)), t.c(10, -9, 6, F(Ye)), t.pg('15,-9 21,-7 15,-5', F(O)), t.c(11, -10, 1.3, F(D))]; };
  const boat = (() => { const t = T(145, 268); return [t.p('M-40 0L45 0Q35 22-25 22Z', F(Br)), t.l(0, 0, 0, -62), t.pg('2,-60 2,-8 38,-8', F(Wh)), t.pg('-2,-52 -2,-8 -28,-8', F(Rd))]; })();
  const wheel = (() => { const t = T(118, 206); return [t.c(0, 0, 20, F(Br)), t.c(0, 0, 4, F(Gy)), ...range(4, (i) => { const a = pt(0, 0, 20, i * 45), b = pt(0, 0, 20, i * 45 + 180); return t.l(a[0], a[1], b[0], b[1]); })]; })();
  const fisher = (() => { const t = T(322, 262); return [t.r(-8, -24, 20, 8, 3, F('#59607f')), t.l(8, -16, 14, 0), t.p('M-8-34Q-8-38-4-38H4Q8-38 8-34L9-16H-9Z', F(Br)), t.c(0, -46, 8, F(Sk)), t.p('M-12-48Q0-58 12-48Z', F(Ye)), t.l(8, -30, -50, -48)]; })();
  A('riviere', '🌉', 'La rivière et le pont', 'The river and the bridge', 3, 50, [
    S('Dessine trois grosses collines au fond.', 'Draw three big hills in the background.', g.p('M-10 140Q50 66 130 140Z', F('#8fd18a')), g.p('M110 140Q220 40 330 140Z', F('#7cc57a')), g.p('M280 140Q350 80 420 140Z', F('#8fd18a'))),
    S('Dessine les deux bords de la rivière : étroite au loin, large près de toi.', 'Draw the two banks of the river: narrow far away, wide near you.', g.p('M185 135Q150 200 70 300'), g.p('M215 135Q250 200 330 300')),
    S('Dessine le pont en arche qui traverse la rivière.', 'Draw the arched bridge across the river.', g.p('M130 190L130 172Q200 138 270 172L270 190Z', F(Gy))),
    S('Dessine le trou de l\'arche et deux rangées de pierres.', 'Draw the arch opening and two rows of stones.', g.p('M156 190Q200 140 244 190Z', F('#9fd8ff')), g.l(136, 179, 152, 179), g.l(248, 179, 264, 179), g.p('M132 166Q200 132 268 166')),
    S('À gauche, dessine le moulin : une maison avec un toit.', 'On the left, draw the mill: a house with a roof.', g.r(28, 152, 72, 64, 2, F(Tn)), g.pg('20,154 64,116 108,154', F(Rd)), g.r(52, 182, 22, 34, 2, F(Br)), g.r(78, 166, 14, 14, 2, F(Lb))),
    S('Ajoute la grande roue du moulin dans l\'eau.', 'Add the big mill wheel in the water.', wheel),
    S('Plante des arbres sur les rives.', 'Plant trees on the banks.', tree(345, 252, 1.2), tree(30, 134, 0.7), tree(325, 160, 0.8), tree(14, 258, 1.1)),
    S('Sur la rivière, dessine un voilier avec deux voiles.', 'On the river, draw a sailboat with two sails.', boat),
    S('Sur la rive de droite, dessine un pêcheur assis avec sa canne.', 'On the right bank, draw a fisherman sitting with his rod.', fisher, g.l(272, 214, 272, 262), g.c(272, 266, 3, F(Rd))),
    S('Dessine une maman canard et deux bébés qui nagent.', 'Draw a mother duck and two ducklings swimming.', duck(220, 270, 1.3), duck(252, 280, 0.8), duck(245, 262, 0.7)),
    S('Dans le ciel, dessine le soleil, des nuages et des oiseaux.', 'In the sky, draw the sun, clouds and birds.', sun(60, 40, 1), cloud(190, 38, 1), cloud(330, 48, 0.9), bird(120, 60), bird(150, 50, 0.8)),
    S('Ajoute des buissons et des fleurs au bord de l\'eau.', 'Add bushes and flowers by the water.', g.e(95, 232, 18, 10, F(Dg)), g.c(300, 205, 5, F(Pk)), g.c(312, 212, 5, F(Ye)), g.c(46, 236, 5, F(Pk)), g.c(70, 240, 5, F(Ye))),
  ], 'Colorie ta rivière!', 'Color your river!', [bg(0, 0, 400, 140, Lb), bg(0, 140, 400, 160, '#b6e6a0', -99), g.p('M185 135Q150 200 70 300L330 300Q250 200 215 135Z', 'stroke="none" f="#8fd3ff" z="-90"')]);
}

// ═════════════ 7. LE MONDE DES DINOSAURES ═════════════
{
  const palm = (x, y, s) => { const t = T(x, y, s); return [t.p('M-5 0Q-8-30 2-60L8-58Q0-30 5 0Z', F(Br)), t.p('M5-60Q-18-92-52-72Q-24-72 5-60Z', F(Dg)), t.p('M5-60Q-30-70-56-50Q-26-58 5-60Z', F(Dg)), t.p('M5-60Q28-92 62-72Q34-72 5-60Z', F(Dg)), t.p('M5-60Q40-70 66-50Q36-58 5-60Z', F(Dg)), t.p('M5-60Q-2-95 12-100Q14-78 5-60Z', F(Dg)), t.c(2, -57, 4, F(Br))]; };
  const bra = (() => { const t = T(85, 160); return [[t.p('M-42-4Q-72 6-86 34Q-64 20-40 18Z', F('#8fbf7f')), t.r(-32, 20, 15, 36, 4, F('#8fbf7f')), t.r(-8, 22, 13, 34, 4, F('#8fbf7f')), t.r(12, 22, 13, 34, 4, F('#8fbf7f')), t.r(30, 20, 15, 36, 4, F('#8fbf7f')), t.e(0, 0, 46, 28, F('#8fbf7f'))],
    [t.p('M26-16L40-84L56-80L50-4Z', F('#8fbf7f')), t.e(60, -86, 15, 9, F('#8fbf7f')), t.c(65, -89, 2.5, F(D)), t.p('M58-82Q64-80 70-83')]]; })();
  const braSp = (() => { const t = T(85, 160); return [t.c(-18, -10, 6, F('#6a9f5a')), t.c(6, -14, 7, F('#6a9f5a')), t.c(28, -4, 5, F('#6a9f5a')), t.c(-4, 8, 5, F('#6a9f5a'))]; })();
  const trex = (() => { const t = T(300, 232); return [[t.p('M30-8Q70-14 92-36Q72 4 34 18Z', F('#e38a5c')), t.r(-14, 26, 16, 28, 4, F('#e38a5c')), t.r(8, 26, 14, 28, 4, F('#e38a5c')), t.e(-4, 56, 14, 5, F('#e38a5c')), t.e(18, 56, 12, 5, F('#e38a5c')), t.e(0, 0, 36, 28, F('#e38a5c')), t.p('M-28 8L-38 16L-32 19')],
    [t.p('M-72-36Q-70-56-40-58Q-16-56-12-36Q-14-22-36-20Q-60-18-72-26Z', F('#e38a5c')), t.l(-70, -28, -34, -30), t.pg('-66,-29 -61,-29 -63.5,-23', F(Wh)), t.pg('-56,-29.5 -51,-29.5 -53.5,-23.5', F(Wh)), t.pg('-46,-30 -41,-30 -43.5,-24', F(Wh)), t.c(-34, -48, 3.5, F(D))]]; })();
  const tri = (() => { const t = T(130, 255); return [t.p('M28 0Q50 6 52 20Q38 12 26 12Z', F('#e0a060')), t.r(-22, 10, 10, 18, 3, F('#e0a060')), t.r(-6, 12, 9, 16, 3, F('#e0a060')), t.r(8, 12, 9, 16, 3, F('#e0a060')), t.r(18, 10, 10, 18, 3, F('#e0a060')), t.e(0, 0, 30, 17, F('#e0a060')),
    t.e(-24, -6, 14, 20, F(Rd)), t.e(-36, 2, 15, 12, F('#e0a060')), t.pg('-42,-6 -48,-26 -36,-10', F(Wh)), t.pg('-34,-10 -30,-28 -26,-12', F(Wh)), t.pg('-48,4 -58,2 -50,8', F(Wh)), t.c(-38, -2, 2.3, F(D))]; })();
  const nest = (() => { const t = T(30, 284); return [t.e(0, 0, 32, 11, F(Br)), t.e(-14, -9, 9, 12, F(Cr)), t.e(2, -13, 9, 12, F(Cr)), t.e(18, -8, 9, 12, F(Cr)), t.c(-14, -12, 2, F(Gr)), t.c(3, -16, 2, F(Gr)), t.c(19, -10, 2, F(Gr))]; })();
  const ptero = (x, y, s) => { const t = T(x, y, s); return [t.p('M-4-2Q-30-30-56-14Q-36-14-26 4Q-14 0-4-2Z', F('#c98a6b')), t.p('M4-2Q30-30 56-14Q36-14 26 4Q14 0 4-2Z', F('#c98a6b')), t.e(0, 0, 12, 6, F('#c98a6b')), t.pg('-10,-6 -38,-4 -10,2', F('#c98a6b')), t.pg('-4,-6 0,-15 4,-6', F('#c98a6b')), t.l(12, 2, 24, 10), t.c(-12, -3, 1.6, F(D))]; };
  A('dinosaures', '🦖', 'Le monde des dinosaures', 'The dinosaur world', 3, 55, [
    S('Trace le sol : une longue ligne un peu ondulée.', 'Draw the ground: a long, slightly wavy line.', g.p('M0 214Q100 198 200 214Q300 228 400 210')),
    S('Dessine un gros volcan.', 'Draw a big volcano.', g.p('M190 214L262 80Q282 70 302 80L378 214Z', F('#9a7b6a'))),
    S('Dessine le cratère et la lave qui coule.', 'Draw the crater and the lava flowing down.', g.e(282, 80, 21, 6, F(Rd)), g.p('M272 86Q266 112 280 130Q284 146 276 160Q296 150 290 128Q298 108 296 86Z', F(O))),
    S('Dessine de la fumée qui monte en gros ronds.', 'Draw smoke rising in big round puffs.', g.c(282, 56, 15, F('#cfd3e0')), g.c(304, 38, 18, F('#cfd3e0')), g.c(334, 26, 15, F('#cfd3e0'))),
    S('Dessine deux palmiers géants.', 'Draw two giant palm trees.', palm(180, 222, 1.3), palm(342, 218, 0.9)),
    S('À gauche, dessine le corps, les pattes et la queue d\'un brachiosaure.', 'On the left, draw the body, legs and tail of a brachiosaurus.', bra[0]),
    S('Ajoute son très long cou et sa petite tête.', 'Add its very long neck and its small head.', bra[1]),
    S('À droite, dessine le gros corps d\'un tyrannosaure avec ses pattes et sa queue.', 'On the right, draw the big body of a T-rex with its legs and tail.', trex[0]),
    S('Ajoute sa grosse tête avec des dents.', 'Add its big head with teeth.', trex[1]),
    S('Devant, dessine un tricératops avec trois cornes.', 'In front, draw a triceratops with three horns.', tri),
    S('En bas à gauche, dessine un nid avec trois oeufs.', 'At the bottom left, draw a nest with three eggs.', nest),
    S('Dans le ciel, dessine deux ptérodactyles.', 'In the sky, draw two pterodactyls.', ptero(70, 44, 1), ptero(205, 96, 0.75)),
    S('Ajoute le soleil et des petites fougères au sol.', 'Add the sun and little ferns on the ground.', sun(30, 22, 0.8), g.p('M150 244Q146 228 140 222 M150 244Q154 228 162 224 M150 244Q150 226 150 218'), g.p('M236 272Q232 258 226 252 M236 272Q240 258 248 254 M236 272Q236 256 236 248')),
  ], 'Colorie le monde des dinosaures!', 'Color the dinosaur world!', [bg(0, 0, 400, 214, '#d6efff'), `<path d="M0 214Q100 198 200 214Q300 228 400 210V300H0Z" stroke="none" f="#bfdc8e" z="-99"/>`, braSp]);
}

// ═════════════ 8. LA FÊTE FORAINE ═════════════
{
  const hub = [258, 120], R = 76;
  const wheel = [g.c(hub[0], hub[1], R), g.c(hub[0], hub[1], 9, F(Ye))];
  const spokes = range(8, (i) => { const b = pt(hub[0], hub[1], R, i * 45); return g.l(hub[0], hub[1], b[0], b[1]); });
  const legs = [g.l(hub[0], hub[1], 212, 240), g.l(hub[0], hub[1], 304, 240), g.l(226, 190, 290, 190), g.l(200, 240, 224, 240), g.l(292, 240, 316, 240)];
  const gond = range(8, (i) => { const [x, y] = pt(hub[0], hub[1], R, i * 45 + 22.5); return [g.l(x, y, x, y + 4), g.r(x - 9, y + 4, 18, 16, 3, F([Rd, Ye, Bl, Gr][i % 4]))]; });
  const horse = (x, y, s, col) => { const t = T(x, y, s); return [t.l(-9, 4, -9, 14), t.l(-3, 4, -3, 14), t.l(6, 4, 6, 14), t.l(12, 4, 12, 14), t.p('M-14-2Q-22 0-20 12Q-14 4-14 2', F(Rd)), t.e(0, 0, 15, 8, F(col)), t.p('M8-4L16-20L24-16L16 0Z', F(col)), t.e(24, -18, 8, 4.5, F(col)), t.c(21, -20, 1.4, F(D))]; };
  const booth = [g.r(340, 168, 52, 72, 3, F(Cr)), stripes(336, 4, 15, 160, 176, [Rd, Wh]), g.r(338, 216, 56, 24, 3, F(Br, 4))];
  const candy = (x, c) => [g.l(x, 212, x, 220), g.c(x, 198, 11, F(c, 5)), g.c(x - 6, 192, 6, F(c, 5)), g.c(x + 6, 192, 6, F(c, 5))];
  const fl = festoon(0, 22, 100, 62, 200, 22, 6, [Rd, Ye, Bl, Gr, Pk, O], 12), fl2 = festoon(200, 22, 300, 62, 400, 22, 6, [Gr, Pk, O, Rd, Ye, Bl], 12);
  A('foire', '🎡', 'La fête foraine', 'The fun fair', 3, 55, [
    S('Trace la ligne du sol.', 'Draw the ground line.', g.l(0, 240, 400, 240)),
    S('Dessine la grande roue : un très grand cercle avec un rond au centre.', 'Draw the big Ferris wheel: a very big circle with a dot in the center.', wheel),
    S('Ajoute huit rayons et les deux grandes pattes de la roue.', 'Add eight spokes and the two big legs of the wheel.', spokes, legs),
    S('Accroche huit petites cabines autour de la roue.', 'Hang eight little cabins around the wheel.', gond),
    S('À gauche, dessine le manège : la base, quatre poteaux et un toit.', 'On the left, draw the carousel: the base, four poles and a roof.', g.r(12, 215, 156, 22, 4, F(Gy)), range(4, (i) => g.l(34 + i * 38, 215, 34 + i * 38, 156)), g.r(8, 148, 164, 10, 4, F(Rd)), g.pg('8,148 90,106 172,148', F(Pk)), g.l(90, 106, 90, 88), g.pg('90,88 106,94 90,100', F(Ye))),
    S('Ajoute deux chevaux de bois sur le manège.', 'Add two wooden horses on the carousel.', horse(55, 190, 1.1, Wh), horse(125, 190, 1.1, '#e0a060')),
    S('À droite, dessine le kiosque avec un toit rayé et un comptoir.', 'On the right, draw the booth with a striped roof and a counter.', booth),
    S('Ajoute un vendeur et deux barbes à papa.', 'Add a seller and two cotton candies.', bust(366, 196, 0.8, Bl, '#e0a030'), candy(347, Pk), candy(387, Bl)),
    S('Dessine une guirlande de petits drapeaux en haut.', 'Draw a string of little flags at the top.', fl, fl2),
    S('Au premier plan, dessine un papa et une dame qui se promènent.', 'In the front, draw a dad and a lady walking around.', person(45, 292, 1.2, Rd, '#5b6b9a', '#5b3a29'), person(190, 292, 1.2, Pu, Bl, '#2d2a3a')),
    S('Dessine un enfant qui tient trois ballons.', 'Draw a child holding three balloons.', person(115, 296, 0.85, Ye, Gr, '#b0532a'), balloon(100, 252, 13, Rd, 124, 282), balloon(122, 244, 13, Bl, 124, 282), balloon(144, 254, 13, Pk, 124, 282)),
    S('Ajoute un autre couple à droite, plus près de la grande roue.', 'Add another pair on the right, closer to the Ferris wheel.', person(270, 292, 1.1, Gr, '#59607f', '#5b3a29'), person(310, 296, 0.8, Pu, Rd, '#e0a030')),
    S('Dans le ciel, dessine le soleil, un nuage et des oiseaux.', 'In the sky, draw the sun, a cloud and some birds.', sun(40, 60, 0.8), cloud(130, 62, 0.8), bird(340, 55), bird(365, 70, 0.8)),
  ], 'Colorie ta fête foraine!', 'Color your fun fair!', [bg(0, 0, 400, 240, '#d6efff'), bg(0, 240, 400, 60, '#e9d9b0', -99)]);
}

// ═════════════ 9. LA PATINOIRE ET LE HOCKEY ═════════════
{
  const skater = (x, y, s, jersey, pants, helm, dir) => {
    const t = T(x, y, s);
    return [t.e(-5, 0, 7, 2.5, F(Gy)), t.e(5, 0, 7, 2.5, F(Gy)), t.r(-8, -13, 7, 13, 2, F(pants)), t.r(1, -13, 7, 13, 2, F(pants)), t.p('M-9 -36Q-9 -38 -5 -38H5Q9 -38 9 -36L10 -12H-10Z', F(jersey)),
      t.l(-9, -34, -14, -20), t.l(9, -34, 15 * dir, -20), t.c(0, -45, 8, F(Sk)), t.p('M-9-46Q-9-56 0-56Q9-56 9-46Z', F(helm)), t.l(15 * dir, -20, 32 * dir, -2), t.l(32 * dir, -2, 40 * dir, -2)];
  };
  const net = (x) => [g.r(x, 192, 24, 36, 3, F('#e8f0ff')), g.l(x + 8, 192, x + 8, 228), g.l(x + 16, 192, x + 16, 228), g.l(x, 204, x + 24, 204), g.l(x, 216, x + 24, 216), g.r(x - 2, 190, 4, 40, 1, F(Rd)), g.r(x + 22, 190, 4, 40, 1, F(Rd))];
  const lamp = (x, y) => { const t = T(x, y); return [t.r(-2, -78, 4, 78, 1, F(Gy2)), t.r(-9, -90, 18, 12, 3, F(Ye)), t.pg('-11,-90 11,-90 0,-99', F(Gy2))]; };
  const flakes = range(14, (i) => `<circle cx="${(i * 97 + 31) % 390 + 5}" cy="${(i * 53 + 17) % 110 + 6}" r="3" stroke="#fff" f="#fff" z="-90"/>`);
  A('patinoire', '🏒', 'La patinoire et le hockey', 'The rink and the hockey game', 3, 55, [
    S('Dessine la bordure de la patinoire : une grande forme qui s\'élargit vers toi.', 'Draw the rink boards: a big shape that gets wider towards you.', g.p('M95 138L305 138Q312 138 316 146L386 270Q390 286 376 286H24Q10 286 14 270L84 146Q88 138 95 138Z', F(Wh))),
    S('Dessine la glace à l\'intérieur, avec la ligne du centre.', 'Draw the ice inside, with the center line.', g.p('M104 148L296 148L366 274H34Z', F('#bfe7ff')), g.l(200, 148, 200, 274)),
    S('Dessine le rond de mise au jeu au centre.', 'Draw the face-off circle in the center.', g.e(200, 212, 30, 14), g.e(200, 212, 3, 2)),
    S('Dessine un filet à chaque bout de la patinoire.', 'Draw a net at each end of the rink.', net(50), net(326)),
    S('Derrière la patinoire, dessine de gros bancs de neige.', 'Behind the rink, draw big snowbanks.', g.e(40, 140, 40, 14, F(Wh)), g.e(120, 140, 36, 11, F(Wh)), g.e(250, 140, 36, 11, F(Wh)), g.e(365, 142, 44, 14, F(Wh))),
    S('Dessine le chalet : la maison, le toit, la porte et deux fenêtres.', 'Draw the chalet: the house, the roof, the door and two windows.', g.r(305, 74, 85, 64, 2, F(Br)), g.pg('295,76 347,32 400,76', F(Rd)), g.r(335, 102, 22, 36, 2, F('#7a4b2a')), g.r(312, 88, 20, 18, 2, F(Ye)), g.r(362, 88, 20, 18, 2, F(Ye))),
    S('Ajoute une cheminée avec de la fumée.', 'Add a chimney with smoke.', g.r(318, 36, 14, 24, 1, F(Gy2)), g.c(326, 26, 8, F(Wh)), g.c(334, 12, 8, F(Wh))),
    S('Dessine des sapins derrière.', 'Draw some fir trees behind.', pine(28, 130, 1.2), pine(64, 128, 0.9), pine(180, 130, 0.9)),
    S('Dessine deux lampadaires aux coins de la patinoire.', 'Draw two lampposts at the corners of the rink.', lamp(135, 140), lamp(262, 140)),
    S('Dessine deux joueurs d\'une équipe avec leurs bâtons.', 'Draw two players from one team with their sticks.', skater(120, 216, 0.85, Rd, Dk, Rd, 1), skater(158, 262, 1.1, Rd, Dk, Rd, 1)),
    S('Dessine deux joueurs de l\'autre équipe.', 'Draw two players from the other team.', skater(285, 206, 0.8, Bl, Dk, Bl, -1), skater(258, 268, 1.1, Bl, Dk, Bl, -1)),
    S('Dessine la rondelle noire entre les joueurs.', 'Draw the black puck between the players.', g.e(212, 266, 7, 3, F(Dk))),
    S('Ajoute deux bancs de neige devant et des nuages.', 'Add two snowbanks in front and some clouds.', g.e(22, 294, 52, 12, F(Wh, 8)), g.e(385, 294, 45, 12, F(Wh, 8)), cloud(110, 40, 1), cloud(220, 30, 0.9)),
  ], 'Colorie ta patinoire!', 'Color your rink!', [bg(0, 0, 400, 126, '#cfe9ff'), bg(0, 126, 400, 174, '#f3f8ff', -99), flakes]);
}

// ═════════════ 10. LE JARDIN POTAGER ═════════════
{
  const carrots = range(7, (i) => { const x = 45 + i * 52, y = 164; return [g.pg(`${x - 6},${y - 4} ${x + 6},${y - 4} ${x},${y + 10}`, F(O)), g.p(`M${x} ${y - 4}Q${x - 12} ${y - 14} ${x - 6} ${y - 28}Q${x} ${y - 14} ${x} ${y - 4}M${x} ${y - 4}Q${x + 12} ${y - 14} ${x + 6} ${y - 28}Q${x} ${y - 14} ${x} ${y - 4}Z`, F(Gr))]; });
  const toms = [50, 130, 210, 280].map((x) => [g.l(x, 224, x, 160), g.e(x - 11, 190, 14, 9, F(Gr)), g.e(x + 11, 180, 14, 9, F(Gr)), g.c(x - 7, 206, 8, F(Rd)), g.c(x + 10, 200, 8, F(Rd)), g.c(x + 1, 214, 7, F(Rd))]);
  const pumps = [120, 205, 285].map((x) => [g.e(x, 268, 26, 19, F(O)), g.p(`M${x} 249Q${x - 13} 268 ${x} 287M${x} 249Q${x + 13} 268 ${x} 287`), g.r(x - 3, 244, 6, 9, 1, F(Dg)), g.p(`M${x + 3} 246Q${x + 16} 236 ${x + 22} 244Q${x + 12} 250 ${x + 3} 246Z`, F(Gr))]);
  const scare1 = [g.l(350, 118, 350, 282), g.l(312, 172, 388, 172), g.pg('332,166 368,166 362,214 338,214', F(Rd)), g.r(344, 182, 10, 10, 1, F(Ye)), g.l(312, 172, 302, 164), g.l(312, 172, 302, 180), g.l(388, 172, 397, 164), g.l(388, 172, 397, 180)];
  const scare2 = [g.c(350, 148, 15, F('#f5deb3')), g.e(350, 136, 26, 5, F(Br)), g.p('M336 136Q350 110 364 136Z', F(Br)), g.c(344, 148, 2, F(D)), g.c(356, 148, 2, F(D)), g.p('M343 156Q350 162 357 156')];
  const can = (() => { const t = T(22, 292); return [t.p('M36-14L58-34L62-30L38-6Z', F(Bl)), t.e(62, -32, 5, 8, F(Bl)), t.r(0, -26, 36, 26, 4, F(Bl)), t.p('M2-22Q-16-22-14-8Q-12 0 2-4')]; })();
  const bf = (x, y, s, c) => { const t = T(x, y, s); return [t.e(-7, -3, 7, 9, F(c)), t.e(7, -3, 7, 9, F(c)), t.e(-5, 7, 4, 6, F(c)), t.e(5, 7, 4, 6, F(c)), t.l(0, -8, 0, 10), t.l(0, -8, -4, -15), t.l(0, -8, 4, -15)]; };
  const bee = (x, y) => { const t = T(x, y); return [t.e(-3, -8, 5, 3, F(Lb)), t.e(5, -8, 5, 3, F(Lb)), t.e(0, 0, 9, 6, F(Ye)), t.l(-2, -5, -2, 5), t.l(3, -5, 3, 5), t.c(-10, 0, 1.4, F(D))]; };
  A('potager', '🥕', 'Le jardin potager', 'The vegetable garden', 3, 55, [
    S('Trace la ligne du fond du jardin.', 'Draw the line at the back of the garden.', g.l(0, 130, 400, 130)),
    S('Dessine une clôture en bois avec des poteaux et deux barres.', 'Draw a wooden fence with posts and two rails.', g.l(100, 112, 400, 112), g.l(100, 124, 400, 124), range(10, (i) => g.r(106 + i * 30, 100, 8, 34, 2, F(Tn, 1)))),
    S('À gauche, dessine le cabanon : un mur, un toit pointu, une porte et une fenêtre.', 'On the left, draw the shed: a wall, a pointy roof, a door and a window.', g.r(15, 62, 80, 70, 2, F(Br)), g.pg('6,64 55,26 104,64', F(Rd)), g.r(28, 86, 28, 46, 2, F('#7a4b2a')), g.r(66, 82, 20, 18, 2, F(Lb)), g.c(50, 110, 2)),
    S('Dessine trois grandes plates-bandes de terre.', 'Draw three big beds of soil.', g.r(10, 148, 380, 32, 12, F('#8a5a3c')), g.r(10, 195, 380, 34, 12, F('#8a5a3c')), g.r(80, 245, 220, 44, 14, F('#8a5a3c'))),
    S('Dans la première rangée, plante des carottes : un bout orange et des feuilles.', 'In the first row, plant carrots: an orange tip and leaves.', carrots),
    S('Dans la deuxième rangée, dessine des plants de tomates sur des tuteurs.', 'In the second row, draw tomato plants on stakes.', toms),
    S('Dans la troisième rangée, dessine trois grosses citrouilles.', 'In the third row, draw three big pumpkins.', pumps),
    S('À droite, dessine l\'épouvantail : le poteau, les bras et la chemise.', 'On the right, draw the scarecrow: the pole, the arms and the shirt.', scare1),
    S('Ajoute sa tête avec un chapeau et un visage.', 'Add its head with a hat and a face.', scare2),
    S('En bas à gauche, dessine un arrosoir.', 'At the bottom left, draw a watering can.', can),
    S('Dessine deux papillons au-dessus des plantes.', 'Draw two butterflies above the plants.', bf(180, 100, 1.2, Pu), bf(255, 82, 1, Pk)),
    S('Dessine deux abeilles qui volent.', 'Draw two flying bees.', bee(100, 176), bee(300, 232)),
    S('Dans le ciel, dessine le soleil et des nuages.', 'In the sky, draw the sun and clouds.', sun(350, 40, 1), cloud(160, 36, 1), cloud(255, 24, 0.7)),
  ], 'Colorie ton jardin!', 'Color your garden!', [bg(0, 0, 400, 130, Lb), bg(0, 130, 400, 170, '#a9dd8a', -99)]);
}

// ═════════════ 11. L'AÉROPORT ═════════════
{
  const plane = (x, y, s, gear) => {
    const t = T(x, y, s);
    return {
      a: [t.pg('34,224 18,184 48,184 72,214', F(Bl)), t.p('M32 240Q30 214 62 212L214 212Q252 214 272 232Q252 250 214 252L64 252Q32 252 32 240Z', F(Wh))],
      b: [t.pg('120,240 84,274 124,274 176,240', F(Bl)), t.e(150, 258, 20, 8, F(Gy2))],
      c: [...range(7, (i) => t.c(76 + i * 20, 226, 4.5, F(Lb))), t.p('M236 220Q250 222 258 230L236 230Z', F(Lb)), ...(gear ? [t.l(100, 252, 100, 266), t.c(100, 270, 7, F(Dk, 5)), t.l(222, 252, 222, 266), t.c(222, 270, 7, F(Dk, 5))] : [])],
    };
  };
  const big = plane(0, 0, 1, true), small = plane(-4, -62, 0.5, false);
  const terminal = [g.r(10, 110, 165, 55, 2, F(Gy)), g.r(6, 102, 173, 10, 2, F(Rd))];
  const windowsT = [...range(6, (i) => g.r(20 + i * 26, 124, 18, 16, 2, F(Lb))), g.r(80, 146, 24, 19, 2, F(Br))];
  const tower = [g.r(196, 70, 26, 95, 2, F(Gy)), g.pg('180,70 238,70 230,44 188,44', F(Lb)), g.r(184, 34, 50, 10, 3, F(Rd)), g.l(209, 34, 209, 12), g.c(209, 10, 3, F(Rd))];
  const hangar = [g.p('M268 165L268 128Q330 78 392 128L392 165Z', F('#9fb4e0')), g.p('M300 165L300 138Q330 114 360 138L360 165Z', F(Gy)), g.l(315, 165, 315, 126), g.l(330, 165, 330, 120), g.l(345, 165, 345, 126)];
  const tug = [g.r(292, 238, 34, 28, 5, F(Ye)), g.r(296, 228, 26, 10, 2, F(Ye)), g.c(302, 270, 9, F(Dk, 5)), g.c(318, 270, 9, F(Dk, 5)), g.r(330, 250, 62, 16, 2, F(Gy)), g.l(326, 258, 330, 258), g.c(346, 270, 7, F(Dk, 5)), g.c(378, 270, 7, F(Dk, 5))];
  const bags = [g.r(336, 232, 16, 18, 2, F(Br)), g.r(354, 238, 12, 12, 2, F(Rd)), g.r(368, 228, 16, 22, 2, F(Pu))];
  const worker = (() => { const t = T(30, 297, 1.1); return [person(30, 297, 1.1, O, '#3a4b78', '#2d2a3a'), t.l(-14, -18, -22, -42), t.l(14, -18, 22, -42), t.c(-22, -44, 3, F(Rd)), t.c(22, -44, 3, F(Rd))]; })();
  A('aeroport', '✈️', 'L\'aéroport', 'The airport', 3, 55, [
    S('Trace deux lignes droites pour la piste, avec des tirets blancs au milieu.', 'Draw two straight lines for the runway, with white dashes in the middle.', g.l(0, 165, 400, 165), g.l(0, 195, 400, 195), range(8, (i) => g.r(14 + i * 50, 177, 28, 6, 2, F(Wh)))),
    S('À gauche, dessine le terminal : un long bâtiment avec un toit.', 'On the left, draw the terminal: a long building with a roof.', terminal),
    S('Ajoute six fenêtres et une porte.', 'Add six windows and a door.', windowsT),
    S('Au milieu, dessine la tour de contrôle avec son antenne.', 'In the middle, draw the control tower with its antenna.', tower),
    S('À droite, dessine un hangar arrondi avec une grande porte.', 'On the right, draw a round hangar with a big door.', hangar),
    S('Au premier plan, dessine le corps de l\'avion et sa queue.', 'In front, draw the airplane\'s body and tail.', big.a),
    S('Ajoute l\'aile et le moteur.', 'Add the wing and the engine.', big.b),
    S('Dessine les hublots, la vitre du pilote et deux roues.', 'Draw the windows, the pilot\'s window and two wheels.', big.c),
    S('À droite, dessine le petit camion à bagages avec sa remorque.', 'On the right, draw the small baggage truck with its cart.', tug),
    S('Empile trois valises sur la remorque.', 'Stack three suitcases on the cart.', bags),
    S('Dessine un employé avec ses deux bâtons de signalisation.', 'Draw a ground worker with two signal wands.', worker),
    S('Dans le ciel, dessine un autre avion plus petit qui s\'envole.', 'In the sky, draw another smaller airplane taking off.', small.a, small.b, small.c),
    S('Ajoute des nuages et le soleil.', 'Add clouds and the sun.', cloud(280, 42, 1), cloud(350, 22, 0.7)),
  ], 'Colorie ton aéroport!', 'Color your airport!', [bg(0, 0, 400, 165, '#d6efff'), bg(0, 165, 400, 30, '#8b90a3', -99), bg(0, 195, 400, 105, '#c9cdd9', -99)]);
}

// ═════════════ 12. LA MAISON EN COUPE ═════════════
{
  const sofaBack = [g.r(278, 212, 76, 36, 6, F(Rd))];
  const dad = [g.p('M306 244Q306 228 318 228Q330 228 330 244Z', F(Bl)), g.c(318, 216, 9, F(Sk)), g.p('M309 214Q309 205 318 205Q327 205 327 214Q318 210 309 214Z', F('#5b3a29'))];
  const sofaFront = [g.r(270, 236, 90, 26, 6, F(Rd)), g.r(264, 224, 14, 38, 5, F('#e45a5a')), g.r(354, 224, 14, 38, 5, F('#e45a5a'))];
  const duck = (() => { const t = T(300, 138, 0.6); return [t.e(0, 0, 12, 8, F(Ye)), t.c(10, -9, 6, F(Ye)), t.pg('15,-9 21,-7 15,-5', F(O))]; })();
  const bed = [g.r(54, 150, 108, 14, 2, F(Br)), g.r(54, 122, 8, 42, 3, F(Br)), g.r(156, 140, 6, 24, 2, F(Br)), g.r(62, 138, 92, 14, 5, F(Bl)), g.e(78, 134, 13, 7, F(Wh)), g.p('M96 138Q120 130 154 138V152H96Z', F(Pu))];
  const kid = [g.p('M76 138Q78 128 88 128Q100 128 100 138Z', F(Gr)), g.c(88, 120, 9, F(Sk)), g.p('M79 118Q79 108 88 108Q97 108 97 118Q88 114 79 118Z', F('#e0a030'))];
  const mom = [person(108, 268, 0.95, Pk, '#59607f', '#2d2a3a'), g.l(116, 235, 140, 224)];
  A('maison', '🏠', 'La maison en coupe', 'The cutaway house', 3, 60, [
    S('Dessine un grand rectangle pour la maison, puis un grand toit en triangle avec une cheminée.', 'Draw a big rectangle for the house, then a big triangle roof with a chimney.', g.r(30, 72, 340, 198, 0, F(Cr, -60)), g.r(300, 22, 24, 36, 1, F(Br)), g.pg('14,74 200,10 386,74', F(Rd))),
    S('Trace le plancher du milieu et deux murs pour faire quatre pièces.', 'Draw the middle floor and two walls to make four rooms.', g.r(30, 164, 340, 8, 0, F(Br)), g.l(172, 74, 172, 266), g.l(228, 74, 228, 266)),
    S('Dessine l\'escalier au milieu, marche par marche.', 'Draw the staircase in the middle, step by step.', g.p('M174 266V248H185V228H196V208H207V188H218V168H226V266Z', F(Tn))),
    S('En haut à gauche, c\'est la chambre : dessine le lit.', 'Top left is the bedroom: draw the bed.', bed),
    S('Ajoute une fenêtre, une lampe et un enfant assis dans le lit.', 'Add a window, a lamp and a child sitting in the bed.', g.r(80, 84, 48, 30, 2, F(Lb)), g.l(104, 84, 104, 114), g.r(32, 142, 20, 22, 2, F(Br)), g.pg('35,126 49,126 52,140 32,140', F(Ye)), kid),
    S('En haut à droite, c\'est la salle de bain : dessine le bain.', 'Top right is the bathroom: draw the bathtub.', g.p('M262 140H362Q362 162 346 162H278Q262 162 262 140Z', F(Wh)), g.p('M266 146H358Q356 158 346 158H278Q268 158 266 146Z', F(Bl)), g.p('M352 140V122Q352 114 342 114')),
    S('Ajoute un canard en plastique, un lavabo et un miroir rond.', 'Add a rubber duck, a sink and a round mirror.', duck, g.r(234, 140, 16, 24, 2, F(Wh)), g.e(242, 138, 14, 5, F(Wh)), g.c(244, 106, 14, F(Lb))),
    S('En bas à gauche, c\'est la cuisine : dessine le frigo et le comptoir.', 'Bottom left is the kitchen: draw the fridge and the counter.', g.r(36, 190, 34, 78, 3, F(Gy)), g.l(36, 218, 70, 218), g.l(64, 202, 64, 212), g.r(76, 226, 56, 42, 2, F(Tn)), g.r(76, 184, 46, 24, 2, F(Br)), g.r(128, 182, 38, 30, 2, F(Lb)), g.l(147, 182, 147, 212)),
    S('Dessine la cuisinière avec une casserole, et la maman qui cuisine.', 'Draw the stove with a pot, and mom cooking.', g.r(134, 226, 36, 42, 2, F('#9aa3b8')), g.r(140, 210, 24, 16, 3, F(Gy2)), g.c(144, 236, 2.5), g.c(160, 236, 2.5), mom),
    S('En bas à droite, c\'est le salon : dessine le dos du sofa et la télé.', 'Bottom right is the living room: draw the back of the sofa and the TV.', sofaBack, g.r(232, 246, 28, 22, 2, F(Br)), g.r(230, 212, 32, 32, 3, F(Dk)), g.r(234, 216, 24, 24, 2, F('#7fd6ff'))),
    S('Ajoute le papa assis sur le sofa et les coussins du sofa.', 'Add dad sitting on the sofa and the sofa cushions.', dad, sofaFront),
    S('Dessine le chien couché sur le tapis, devant le sofa.', 'Draw the dog lying on the rug in front of the sofa.', g.e(300, 270, 52, 5, F(Pk)), dog(300, 270, 0.85, '#e0a060', '#8a5a3c')),
    S('Ajoute le sol et un cadre au mur.', 'Add the ground and a picture frame on the wall.', g.r(20, 268, 360, 12, 0, F(Gy2)), g.r(280, 90, 36, 28, 2, F(Wh)), g.c(298, 104, 7, F(Ye))),
  ], 'Colorie ta maison!', 'Color your house!', [bg(0, 0, 400, 270, Lb), bg(0, 270, 400, 30, '#a9dd8a', -99),
    bg(32, 74, 138, 90, '#cfe7ff', -50), bg(230, 74, 138, 90, '#d9f2ee', -50), bg(32, 172, 138, 96, '#fff1c2', -50), bg(230, 172, 138, 96, '#ffe0e0', -50)]);
}

export const projects = LIST;
