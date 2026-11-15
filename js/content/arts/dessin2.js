// Arts plastiques — « Grandes scènes » (série A) : 12 grands décors à dessiner étape par étape.
// Chaque scène est écrite UNE fois (liste d'étapes = groupes de formes, dessinés de l'arrière vers l'avant) ;
// les images cumulatives (traits foncés déjà tracés + traits roses nouveaux) et le dessin colorié final sont générés.
// Dans les étapes, les formes remplies sont blanches (elles cachent ce qui est derrière) ; au coloriage final, f="couleur".
const D = '#3a3f55', K = '#ff5d8f';
const Y = '#ffd34e', O = '#ff9f43', Rd = '#ff6b6b', Bl = '#6ec1ff', Gr = '#6fd08c', Pk = '#ff9ec4', Pu = '#b38cff';
const Br = '#b97a4b', Dn = '#8a5a36', Tn = '#e8b878', Wh = '#ffffff', Gy = '#d5dbea', Cr = '#fff1d6', Lb = '#cdeeff';
const Gl = '#a8e6a1', Gd = '#4fb07a', Sa = '#f6dfa4', Sk = '#ffd9b3', Dg = '#7a8199', Sn = '#f4f8ff', Sea = '#7fd0ee';

const q = (v) => +(+v).toFixed(1);
const F = (col) => `f="${col}"`;
const c = (x, y, rad, a = '') => `<circle cx="${q(x)}" cy="${q(y)}" r="${q(rad)}" ${a}/>`;
const e = (x, y, rx, ry, a = '') => `<ellipse cx="${q(x)}" cy="${q(y)}" rx="${q(rx)}" ry="${q(ry)}" ${a}/>`;
const r = (x, y, w, h, rd, a = '') => `<rect x="${q(x)}" y="${q(y)}" width="${q(w)}" height="${q(h)}" rx="${q(rd)}" ${a}/>`;
const l = (x1, y1, x2, y2, a = '') => `<line x1="${q(x1)}" y1="${q(y1)}" x2="${q(x2)}" y2="${q(y2)}" ${a}/>`;
const p = (d, a = '') => `<path d="${d}" ${a}/>`;
const pg = (pts, a = '') => `<polygon points="${pts}" ${a}/>`;
const pt = (cx, cy, R, deg) => `${q(cx + R * Math.cos(deg * Math.PI / 180))} ${q(cy + R * Math.sin(deg * Math.PI / 180))}`;

const paint = (s, mode) => {
  const m = s.match(/ f="([^"]*)"/);
  const col = m ? m[1] : 'none';
  const val = mode === 'line' ? (col === 'none' ? 'none' : '#fff') : col;
  return s.replace(/ (?:f|z)="[^"]*"/g, '').replace(/\s*\/>$/, ` fill="${val}"/>`);
};
const wrap = (inner) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const grp = (els, col, w) => (els.length ? `<g stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${els.map((s) => paint(s, 'line')).join('')}</g>` : '');
const S = (fr, en, ...els) => ({ fr, en, els: els.flat(Infinity) });

const MAT = [
  { fr: 'Une grande feuille blanche', en: 'A big sheet of white paper' },
  { fr: 'Crayon à mine', en: 'Pencil' },
  { fr: 'Gomme à effacer', en: 'Eraser' },
  { fr: 'Crayons de couleur ou feutres', en: 'Colored pencils or markers' },
];

function A(id, emoji, fr, en, level, minutes, steps, cfr, cen, o = {}) {
  const out = steps.map((st, i) => ({
    svg: wrap(grp(steps.slice(0, i).flatMap((s) => s.els), D, 6) + grp(st.els, K, 8)),
    text: { fr: st.fr, en: st.en },
  }));
  const body = [...(o.bg || []), ...steps.flatMap((s) => s.els), ...(o.fg || [])].map((s) => paint(s, 'fill')).join('');
  out.push({ svg: wrap(`<g stroke="${D}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${body}</g>`), text: { fr: cfr, en: cen } });
  return { id: `dessin-scene-${id}`, cat: 'dessin', emoji, title: { fr, en }, level, minutes, theme: 'scene', season: o.season || null, materials: MAT, adult: false, steps: out };
}

// ───────── petites formes réutilisables ─────────
const sun = (x, y, rad) => { let d = ''; for (let a = 0; a < 360; a += 45) d += `M${pt(x, y, rad + 5, a)}L${pt(x, y, rad + 14, a)}`; return [p(d), c(x, y, rad, F(Y))]; };
const cloud = (x, y, s = 1, col = Wh) => p(`M${q(x - 26 * s)} ${q(y)}a${q(9 * s)} ${q(9 * s)} 0 0 1 ${q(3 * s)} ${q(-17 * s)}a${q(13 * s)} ${q(13 * s)} 0 0 1 ${q(24 * s)} ${q(-7 * s)}a${q(11 * s)} ${q(11 * s)} 0 0 1 ${q(21 * s)} ${q(5 * s)}a${q(9 * s)} ${q(9 * s)} 0 0 1 ${q(-2 * s)} ${q(19 * s)}Z`, F(col));
const bird = (x, y, s = 1) => p(`M${q(x - 9 * s)} ${q(y)}q${q(4.5 * s)} ${q(-8 * s)} ${q(9 * s)} 0q${q(4.5 * s)} ${q(-8 * s)} ${q(9 * s)} 0`);
const star5 = (x, y, R, col = Y) => pg(Array.from({ length: 10 }, (_, i) => pt(x, y, i % 2 ? R * 0.45 : R, -90 + i * 36).replace(' ', ',')).join(' '), F(col));
const naturalPath = (x, y, s, d, col) => p(d.replace(/([MLQZ])([^MLQZ]*)/g, (_, cmd, values) => {
  const nums = (values.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
  return cmd + nums.map((v, i) => q((i % 2 ? y : x) + v * s)).join(' ');
}), F(col));
const pine = (x, y, s = 1, col = Gd) => [
  naturalPath(x, y, s, 'M-3 -15L-4 0L4 0L3 -15Z', Br),
  naturalPath(x, y, s, 'M0 -64L-9 -46L-5 -47L-14 -31L-9 -33L-20 -8Q0 -4 20 -8L9 -33L14 -31L5 -47L9 -46Z', col),
];
const tree = (x, y, s = 1, col = Gr) => [
  naturalPath(x, y, s, 'M-5 0Q-2 -12 -4 -24L3 -25Q2 -12 6 0Z', Br),
  naturalPath(x, y, s, 'M-5 -18Q-17 -15 -18 -25Q-26 -31 -17 -38Q-18 -48 -7 -47Q1 -56 9 -47Q20 -49 21 -38Q29 -30 19 -24Q17 -15 6 -18Z', col),
];
const person = (x, y, s, shirt, pants = Bl) => [
  r(x - 7 * s, y - 16 * s, 5.5 * s, 16 * s, 2 * s, F(pants)), r(x + 1.5 * s, y - 16 * s, 5.5 * s, 16 * s, 2 * s, F(pants)),
  r(x - 14 * s, y - 31 * s, 6 * s, 14 * s, 3 * s, F(shirt)), r(x + 8 * s, y - 31 * s, 6 * s, 14 * s, 3 * s, F(shirt)),
  r(x - 8 * s, y - 33 * s, 16 * s, 21 * s, 4 * s, F(shirt)), c(x, y - 42 * s, 8.5 * s, F(Sk)),
];
const crenN = (x, t, b, w, n, d = 6, a = '') => { const m = w / (2 * n - 1); let s = `M${q(x)} ${q(b)}V${q(t)}`; for (let i = 0; i < n; i++) { s += `h${q(m)}`; if (i < n - 1) s += `v${d}h${q(m)}v${-d}`; } return p(`${s}V${q(b)}Z`, a); };
const fish = (x, y, s, col, dir = 1) => {
  const shape = (d) => p(d.replace(/([MLQZ])([^MLQZ]*)/g, (_, cmd, values) => {
    const nums = (values.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
    return cmd + nums.map((v, i) => q(i % 2 ? y + v * s : x + dir * v * s)).join(' ');
  }), F(col));
  return [shape('M-13 -3L-27 -11L-23 0L-27 11L-13 3Z'),
    shape('M-7 -7L0 -16L8 -8Z'),
    shape('M18 0Q5 -17 -13 -3L-13 3Q5 17 18 0Z'),
    c(x + dir * 10 * s, y - 2 * s, 1.5 * s, F(D))];
};
const L = [];

// ───────── 1. La ferme ─────────
const hen = (x, y, s = 1) => [
  l(x - 3 * s, y + 8 * s, x - 3 * s, y + 15 * s), l(x + 3 * s, y + 8 * s, x + 3 * s, y + 15 * s),
  pg(`${q(x + 10 * s)},${q(y - 2 * s)} ${q(x + 19 * s)},${q(y - 11 * s)} ${q(x + 15 * s)},${q(y + 4 * s)}`, F(Wh)),
  e(x, y, 12 * s, 9 * s, F(Wh)), c(x - 9 * s, y - 8 * s, 5.5 * s, F(Wh)),
  pg(`${q(x - 13 * s)},${q(y - 9 * s)} ${q(x - 20 * s)},${q(y - 7 * s)} ${q(x - 13 * s)},${q(y - 5 * s)}`, F(Y)),
  c(x - 9 * s, y - 15 * s, 2.5 * s, F(Rd)),
];
L.push(A('ferme', '🚜', 'La ferme', 'The farm', 3, 45, [
  S('Dessine la grande colline verte : une longue ligne ondulée et le champ en bas.', 'Draw the big green hill: a long wavy line and the field below.', p('M-10 140Q100 118 210 138T410 128V310H-10Z', F(Gl))),
  S('Ajoute un gros soleil avec ses rayons et deux nuages.', 'Add a big sun with its rays and two clouds.', sun(340, 48, 20), cloud(100, 52, 1), cloud(215, 36, 0.8)),
  S('Dessine la grange : un grand rectangle avec un toit.', 'Draw the barn: a big rectangle with a roof.', r(42, 100, 106, 54, 0, F(Rd)), pg('30,102 58,66 132,66 160,102', F(Dn))),
  S('Ajoute la grande porte avec un X et une petite fenêtre ronde.', 'Add the big door with an X and a small round window.', r(78, 114, 34, 40, 0, F(Cr)), p('M78 114L112 154M112 114L78 154'), c(95, 84, 7, F(Cr))),
  S('Dessine le silo à côté de la grange.', 'Draw the silo next to the barn.', r(168, 80, 30, 74, 0, F(Gy)), p('M168 80Q183 54 198 80Z', F(Gy))),
  S('Dessine le champ de blé : une bande ondulée avec une ligne.', 'Draw the wheat field: a wavy band with one line.', p('M-10 202Q200 184 410 200V226Q200 212 -10 230Z', F('#f3d36b')), p('M-10 216Q200 198 410 213')),
  S('Dessine la clôture : quatre poteaux et deux barres.', 'Draw the fence: four posts and two bars.', [l(-6, 164, 178, 164), l(-6, 180, 178, 180)], [8, 50, 92, 134].map((x) => r(x - 6, 152, 12, 40, 3, F(Br)))),
  S('Dessine le tracteur : le capot, la cabine et deux roues.', 'Draw the tractor: the hood, the cab and two wheels.', r(272, 182, 7, 18, 1, F(Dg)), r(262, 198, 58, 28, 4, F(O)), r(316, 172, 46, 48, 4, F(O)), r(324, 180, 30, 26, 3, F(Lb)), c(340, 230, 26, F('#555d78')), c(340, 230, 9, F(Y)), c(282, 240, 16, F('#555d78')), c(282, 240, 6, F(Y))),
  S('Dessine la vache : le corps, quatre pattes et la tête.', 'Draw the cow: the body, four legs and the head.', [82, 96, 124, 138].map((x, i) => r(x, 240 + (i % 2 ? 2 : 0), 9, 24, 2, F(Wh))), p('M152 218Q166 228 160 248'), e(112, 226, 42, 25, F(Wh)), e(122, 248, 10, 6, F(Pk)), pg('58,206 54,193 64,203', F(Cr)), pg('76,206 80,193 70,203', F(Cr)), e(66, 218, 17, 15, F(Wh)), e(53, 226, 11, 8, F(Pk))),
  S('Dessine le cochon rose près de la vache.', 'Draw the pink pig next to the cow.', r(198, 268, 8, 14, 2, F(Pk)), r(224, 268, 8, 14, 2, F(Pk)), p('M241 254q8-4 4-10q-6 0-2 6'), e(215, 258, 26, 17, F(Pk)), pg('188,243 197,237 198,247', F(Pk)), c(190, 254, 13, F(Pk)), e(180, 257, 6, 5, F('#ff7fa8'))),
  S('Dessine trois poules sous la clôture.', 'Draw three hens below the fence.', hen(36, 280, 1.4), hen(96, 284, 1.4), hen(150, 282, 1.4)),
  S('Ajoute les taches de la vache, des fleurs et deux oiseaux.', 'Add the cow\'s spots, some flowers and two birds.', p('M96 214q10-6 16 2q2 10-10 10q-10-2-6-12Z', F(D)), p('M126 232q12-4 14 6q-4 10-14 4Z', F(D)), [[250, 280], [275, 292], [330, 286], [20, 235]].map(([x, y]) => [l(x, y, x, y + 10), c(x, y - 2, 4, F(Pk))]), bird(250, 22), bird(290, 60, 0.8)),
], 'Colorie toute ta ferme!', 'Color your whole farm!', { bg: [r(-10, -10, 420, 150, 0, F(Lb))] }));

// ───────── 2. La plage ─────────
const wv = (x, y) => `M${x} ${y}q5-6 10 0t10 0t10 0`;
L.push(A('plage', '🏖️', 'La plage', 'The beach', 3, 45, [
  S('Dessine la mer : une grande forme avec la ligne de l\'horizon en haut.', 'Draw the sea: a big shape with the horizon line at the top.', r(-10, 105, 420, 210, 0, F(Sea))),
  S('Dessine le sable : une ligne ondulée en bas.', 'Draw the sand: a wavy line at the bottom.', p('M-10 182Q70 166 140 176T290 172T410 168V310H-10Z', F(Sa))),
  S('Ajoute le soleil et deux nuages.', 'Add the sun and two clouds.', sun(65, 45, 20), cloud(250, 42, 1), cloud(335, 72, 0.8)),
  S('Trace des vagues sur la mer.', 'Draw waves on the sea.', p([wv(40, 128), wv(165, 121), wv(295, 132), wv(95, 152), wv(225, 148), wv(340, 154)].join(''))),
  S('Dessine un voilier au loin sur la mer.', 'Draw a sailboat far away on the sea.', l(301, 114, 301, 70), pg('303,72 303,110 330,110', F(Wh)), pg('299,80 299,110 278,110', F(Y)), p('M272 114H330L318 128H284Z', F(Rd))),
  S('Dessine un grand parasol sur une serviette.', 'Draw a big umbrella on a towel.', pg('62,252 148,252 160,272 50,272', F(Bl)), l(105, 170, 105, 258), p('M52 205Q105 128 158 205Q145 197 132 205Q119 197 105 205Q92 197 79 205Q66 197 52 205Z', F(Rd))),
  S('Construis un château de sable avec trois tours.', 'Build a sandcastle with three towers.', crenN(274, 205, 258, 30, 3, 6, F('#e9c77f')), crenN(249, 222, 258, 25, 3, 5, F('#e9c77f')), crenN(304, 222, 258, 25, 3, 5, F('#e9c77f')), p('M284 258V245Q289 237 294 245V258Z', F(Br)), l(289, 205, 289, 187), pg('289,187 303,192 289,197', F(Rd))),
  S('Dessine un seau et une pelle.', 'Draw a pail and a shovel.', p('M199 258Q216 234 233 258'), pg('197,254 235,254 230,282 202,282', F(Y)), l(241, 292, 257, 268), e(238, 295, 6, 4, F(Rd))),
  S('Dessine un crabe qui marche sur le sable.', 'Draw a crab walking on the sand.', p('M334 274L320 282M336 279L324 290M366 274L380 282M364 279L376 290'), l(334, 266, 324, 254), l(366, 266, 376, 254), c(322, 251, 7, F(Rd)), c(378, 251, 7, F(Rd)), e(350, 270, 19, 12, F(Rd)), l(344, 260, 344, 252), l(356, 260, 356, 252), c(344, 250, 3.5, F(Wh)), c(356, 250, 3.5, F(Wh))),
  S('Ajoute trois mouettes dans le ciel.', 'Add three seagulls in the sky.', bird(150, 50), bird(190, 78, 1.2), bird(118, 92, 0.9)),
  S('Ajoute les rayures du parasol, une étoile de mer et un coquillage.', 'Add the umbrella stripes, a starfish and a shell.', p('M105 167L79 205M105 167L132 205'), star5(172, 288, 10, O), e(34, 290, 9, 6, F(Pk)), p('M30 290q4-4 8 0')),
], 'Colorie ta plage ensoleillée!', 'Color your sunny beach!', { bg: [r(-10, -10, 420, 125, 0, F(Lb))] }));

// ───────── 3. Sous la mer ─────────
const coral = (x, y, s, col) => [e(x, y, 20 * s, 5 * s, F(col)), r(x - 16 * s, y - 34 * s, 9 * s, 34 * s, 4.5 * s, F(col)), r(x - 4.5 * s, y - 48 * s, 9 * s, 48 * s, 4.5 * s, F(col)), r(x + 7 * s, y - 30 * s, 9 * s, 30 * s, 4.5 * s, F(col))];
const weed = (x, y, h) => p(`M${x} ${y}Q${x - 14} ${q(y - h * 0.25)} ${x} ${q(y - h * 0.5)}Q${x + 14} ${q(y - h * 0.75)} ${x} ${y - h}L${x + 8} ${y - h}Q${x + 22} ${q(y - h * 0.75)} ${x + 8} ${q(y - h * 0.5)}Q${x - 6} ${q(y - h * 0.25)} ${x + 10} ${y}Z`, F(Gr));
L.push(A('mer', '🐙', 'Sous la mer', 'Under the sea', 3, 50, [
  S('Dessine le fond de la mer : une ligne ondulée de sable.', 'Draw the sea floor: a wavy line of sand.', p('M-10 250Q80 232 170 246T310 240T410 236V310H-10Z', F(Sa))),
  S('Dessine quatre coraux de différentes tailles.', 'Draw four corals of different sizes.', coral(45, 254, 1.1, Rd), coral(88, 260, 0.8, Pk), coral(310, 262, 0.7, Pu), coral(352, 252, 1.1, O)),
  S('Ajoute des algues qui ondulent.', 'Add wavy seaweed.', weed(125, 256, 85), weed(142, 258, 55), weed(272, 254, 80), weed(386, 256, 60)),
  S('Dessine le coffre au trésor sur le sable.', 'Draw the treasure chest on the sand.', r(172, 240, 66, 28, 3, F(Br)), p('M172 240Q172 212 205 212Q238 212 238 240Z', F('#a06a3b')), l(190, 214, 190, 268), l(220, 214, 220, 268), c(205, 244, 6, F(Y))),
  S('Dessine la pieuvre : une grosse tête et des bras.', 'Draw the octopus: a big head and arms.', p('M236 105Q230 150 246 158Q252 148 256 156Q260 168 267 157Q274 168 279 157Q283 148 290 158Q304 150 294 105Z', F(Pu)), e(265, 95, 30, 27, F(Pu)), p('M247 158Q236 168 244 177'), p('M267 160Q267 173 276 175'), p('M288 158Q300 167 294 177')),
  S('Dessine la tortue de mer avec sa carapace.', 'Draw the sea turtle with its shell.', e(350, 216, 15, 6, F(Gr)), e(300, 220, 13, 5, F(Gr)), pg('290,208 276,214 292,200', F(Gr)), c(380, 200, 9, F(Gr)), p('M290 210Q290 174 330 174Q370 174 370 210Z', F('#8cc084'))),
  S('Dessine un gros poisson jaune.', 'Draw a big yellow fish.', fish(110, 95, 1.7, Y)),
  S('Dessine un banc de petits poissons et un poisson rouge.', 'Draw a school of little fish and a red fish.', fish(190, 150, 0.8, Pk, -1), fish(228, 130, 0.8, Pk, -1), fish(212, 176, 0.8, Pk, -1), fish(345, 125, 1.1, Rd, -1)),
  S('Dessine une étoile de mer et des coquillages sur le sable.', 'Draw a starfish and shells on the sand.', star5(262, 276, 14, O), e(160, 282, 8, 6, F(Pk)), e(60, 284, 9, 6, F(Cr))),
  S('Ajoute plein de bulles qui montent.', 'Add lots of bubbles going up.', [[250, 40, 6], [264, 22, 4], [275, 50, 5], [140, 55, 6], [152, 35, 4], [205, 200, 5], [215, 182, 3.5], [60, 130, 5]].map(([x, y, rr]) => c(x, y, rr, F('#e6f7ff')))),
  S('Ajoute les yeux de la pieuvre, un sourire et les dessins de la carapace.', 'Add the octopus eyes, a smile and the shell patterns.', c(255, 93, 7, F(Wh)), c(275, 93, 7, F(Wh)), c(256, 95, 3, F(D)), c(276, 95, 3, F(D)), p('M258 110Q265 116 272 110'), p('M310 210L318 190H342L350 210M318 190L330 176M342 190L330 176'), c(160, 268, 5, F(Y)), c(150, 276, 5, F(Y))),
], 'Colorie les créatures de la mer!', 'Color the sea creatures!', { bg: [r(-10, -10, 420, 320, 0, F('#8fd8f0'))] }));

// ───────── 4. L'espace ─────────
L.push(A('espace', '🚀', 'L\'espace', 'Outer space', 3, 50, [
  S('Dessine une grosse planète orange avec son anneau.', 'Draw a big orange planet with its ring.', c(85, 212, 38, F(O)), e(85, 212, 64, 14, 'transform="rotate(-18 85 212)"')),
  S('Dessine la lune ronde en bas à droite.', 'Draw the round moon at the bottom right.', c(330, 238, 50, F(Gy))),
  S('Ajoute des cratères sur la lune.', 'Add craters on the moon.', c(312, 222, 10, F('#b6bfd6')), c(345, 252, 8, F('#b6bfd6')), c(320, 256, 6, F('#b6bfd6')), c(350, 218, 6, F('#b6bfd6'))),
  S('Dessine la fusée au centre : le corps, le bout et la fenêtre.', 'Draw the rocket in the middle: the body, the nose and the window.', p('M225 40Q255 70 255 130H195Q195 70 225 40Z', F(Wh)), p('M225 40Q237 52 245 66H205Q213 52 225 40Z', F(Rd)), c(225, 94, 12, F(Bl))),
  S('Ajoute deux ailerons, la tuyère et la flamme.', 'Add two fins, the nozzle and the flame.', p('M213 145Q225 195 237 145Z', F(O)), pg('195,115 174,152 195,138', F(Rd)), pg('255,115 276,152 255,138', F(Rd)), pg('207,130 243,130 236,146 214,146', F(Gy))),
  S('Dessine une petite planète en haut à droite.', 'Draw a small planet at the top right.', c(350, 58, 19, F(Pk))),
  S('Dessine l\'astronaute qui flotte.', 'Draw the floating astronaut.', r(282, 130, 10, 22, 3, F(Gy)), r(291, 152, 12, 26, 5, F(Wh)), r(308, 152, 12, 26, 5, F(Wh)), c(297, 182, 6, F(Gy)), c(314, 182, 6, F(Gy)), r(272, 132, 22, 10, 5, F(Wh)), r(316, 128, 24, 10, 5, F(Wh)), r(290, 124, 30, 32, 8, F(Wh)), c(305, 108, 17, F(Wh)), e(308, 109, 10, 8, F(Bl))),
  S('Dessine une comète avec sa longue queue.', 'Draw a comet with its long tail.', pg('104,104 28,70 94,122', F(Y)), c(110, 110, 11, F(Wh))),
  S('Dessine un satellite avec deux panneaux.', 'Draw a satellite with two panels.', r(112, 33, 36, 14, 0, F(Bl)), r(172, 33, 36, 14, 0, F(Bl)), r(148, 28, 24, 24, 4, F(Gy)), l(160, 28, 160, 14), c(160, 12, 3, F(Rd))),
  S('Ajoute des étoiles de différentes grandeurs.', 'Add stars of different sizes.', star5(28, 140, 13), star5(150, 165, 10), star5(268, 22, 11), star5(380, 150, 12), star5(62, 28, 10), star5(255, 195, 9)),
  S('Ajoute des bandes sur la planète rose et des rayures sur la fusée.', 'Add stripes on the pink planet and on the rocket.', p('M334 52Q350 58 366 52M333 66Q350 72 367 66'), p('M199 112H251')),
], 'Colorie l\'espace avec des couleurs vives!', 'Color space with bright colors!', { bg: [r(-10, -10, 420, 320, 0, F('#3f4a94'))], fg: [[20, 80], [70, 120], [130, 20], [180, 100], [210, 250], [300, 40], [380, 100], [370, 20], [30, 280], [120, 280], [190, 290], [270, 285], [395, 290], [250, 130]].map(([x, y]) => c(x, y, 1.8, `${F(Wh)} stroke="none"`)) }));

// ───────── 5. La forêt canadienne ─────────
const wvs = (pts) => p(pts.map(([x, y]) => wv(x, y)).join(''));
L.push(A('foret', '🛶', 'La forêt canadienne', 'The Canadian forest', 3, 50, [
  S('Dessine les montagnes pointues tout au fond.', 'Draw the pointy mountains far in the back.', p('M-10 140L50 70L90 110L140 55L200 125L250 85L310 130L350 80L410 120V150H-10Z', F('#b9c4dd'))),
  S('Dessine le grand lac bleu et la rive en bas.', 'Draw the big blue lake and the shore below.', r(-10, 148, 420, 70, 0, F(Bl)), p('M-10 214Q100 200 200 214T410 208V310H-10Z', F(Gl))),
  S('Dessine une rangée de petits sapins de l\'autre côté du lac.', 'Draw a row of little fir trees on the other side of the lake.', [25, 70, 118, 172, 232, 290, 335, 385].map((x) => pine(x, 152, 0.5))),
  S('Dessine trois grands sapins au premier plan.', 'Draw three big fir trees in front.', pine(30, 262, 1.3), pine(372, 258, 1.4), pine(232, 232, 0.9)),
  S('Ajoute le soleil et des nuages.', 'Add the sun and some clouds.', sun(60, 36, 15), cloud(200, 40, 1), cloud(290, 62, 0.8)),
  S('Dessine un canot rouge avec une personne qui pagaie.', 'Draw a red canoe with a person paddling.', l(228, 160, 250, 200), r(196, 160, 18, 26, 5, F(Y)), c(205, 152, 8, F(Sk)), p('M148 184H266Q246 206 206 206Q168 206 148 184Z', F(Rd))),
  S('Dessine l\'orignal sur la rive avec ses grands bois.', 'Draw the moose on the shore with its big antlers.', [75, 86, 112, 124].map((x, i) => r(x, 250 + (i % 2 ? 2 : 0), 6, 26, 2, F(Br))), e(102, 238, 33, 20, F(Br)), p('M78 230L68 204L86 198L96 224Z', F(Br)), pg('52,196 36,174 52,170 66,192', F(Tn)), pg('70,194 78,170 92,176 80,198', F(Tn)), e(62, 204, 17, 11, F(Br)), e(48, 210, 8, 7, F(Dn))),
  S('Construis le barrage du castor avec trois troncs.', 'Build the beaver dam with three logs.', r(268, 196, 92, 10, 5, F(Br)), r(278, 186, 72, 10, 5, F(Br)), r(292, 176, 44, 10, 5, F(Br))),
  S('Dessine le castor devant son barrage.', 'Draw the beaver in front of its dam.', e(272, 254, 14, 6, F(Dn)), e(300, 244, 24, 15, F(Br)), e(296, 258, 8, 4, F(Dn)), c(324, 236, 10, F(Br)), c(320, 226, 4, F(Br)), r(327, 241, 5, 6, 0, F(Wh)), c(333, 237, 3, F(D))),
  S('Ajoute trois oiseaux dans le ciel.', 'Add three birds in the sky.', bird(140, 26), bird(168, 62, 0.9), bird(330, 28, 1.1)),
  S('Ajoute de la neige sur les montagnes et des vagues sur le lac.', 'Add snow on the mountains and ripples on the lake.', pg('125,70 140,55 156,72 148,67 140,74 132,67', F(Wh)), pg('243,98 250,85 258,99 250,94', F(Wh)), pg('339,94 350,80 361,95 351,90', F(Wh)), wvs([[30, 172], [290, 168], [100, 196], [180, 160]])),
], 'Colorie la belle forêt!', 'Color the beautiful forest!', { bg: [r(-10, -10, 420, 160, 0, F(Lb))] }));

// ───────── 6. La ville ─────────
const BL = [[8, 80, 62, '#ffb3c7'], [70, 122, 54, '#9ad0ff'], [124, 58, 60, '#ffe08a'], [184, 108, 54, '#a8e6b8'], [238, 86, 64, '#d4b8ff'], [302, 128, 52, '#ffc999'], [354, 98, 46, '#a8d8ea']];
const bld = ([x, t, w, col]) => r(x, t, w, 222 - t, 0, F(col));
const wins = ([x, t, w]) => { const n = Math.floor((w - 4) / 22), gap = (w - n * 12) / (n + 1), o = []; for (let y = t + 12; y + 14 < 212; y += 28) for (let i = 0; i < n; i++) o.push(r(x + gap + i * (12 + gap), y, 12, 14, 1, F(Lb))); return o; };
L.push(A('ville', '🏙️', 'La ville', 'The city', 3, 55, [
  S('Dessine la rue : une grande bande grise en bas.', 'Draw the street: a big gray band at the bottom.', r(-10, 222, 420, 90, 0, F('#8d93a6'))),
  S('Ajoute le trottoir : une bande plus mince au-dessus.', 'Add the sidewalk: a thinner band above.', r(-10, 222, 420, 12, 0, F('#e8e3d8'))),
  S('Dessine les grands immeubles.', 'Draw the tall buildings.', bld(BL[0]), bld(BL[2]), bld(BL[4]), bld(BL[6])),
  S('Dessine les immeubles plus petits entre les grands.', 'Draw the smaller buildings between the tall ones.', bld(BL[1]), bld(BL[3]), bld(BL[5])),
  S('Dessine les fenêtres des quatre premiers immeubles.', 'Draw the windows of the first four buildings.', BL.slice(0, 4).map(wins)),
  S('Dessine les fenêtres des trois autres immeubles.', 'Draw the windows of the other three buildings.', BL.slice(4).map(wins)),
  S('Ajoute le soleil et des nuages.', 'Add the sun and some clouds.', sun(262, 40, 14), cloud(62, 46, 0.9), cloud(205, 30, 0.8), cloud(350, 50, 0.8)),
  S('Dessine trois arbres le long du trottoir.', 'Draw three trees along the sidewalk.', tree(166, 232, 0.85), tree(262, 232, 0.85), tree(335, 232, 0.85)),
  S('Dessine l\'autobus jaune avec ses fenêtres et ses roues.', 'Draw the yellow bus with its windows and wheels.', r(14, 236, 136, 46, 8, F(Y)), [0, 1, 2, 3].map((i) => r(26 + i * 30, 244, 22, 16, 2, F(Lb))), c(46, 285, 11, F('#555d78')), c(118, 285, 11, F('#555d78'))),
  S('Dessine une petite auto bleue.', 'Draw a little blue car.', p('M246 262L256 242H294L306 262Z', F(Bl)), pg('258,246 292,246 300,260 250,260', F(Lb)), r(232, 262, 86, 22, 7, F(Bl)), c(252, 286, 10, F('#555d78')), c(298, 286, 10, F('#555d78'))),
  S('Dessine le feu de circulation avec ses trois lumières.', 'Draw the traffic light with its three lights.', r(369, 218, 6, 16, 0, F(Dg)), r(358, 160, 28, 58, 5, F('#555d78')), c(372, 174, 6.5, F(Rd)), c(372, 189, 6.5, F(Y)), c(372, 204, 6.5, F(Gr))),
  S('Dessine trois piétons simples sur le trottoir.', 'Draw three simple people on the sidewalk.', person(190, 237, 1.05, Rd), person(226, 237, 0.95, Gr, Dg), person(300, 237, 1.05, O)),
  S('Ajoute les lignes de la rue, une antenne et deux oiseaux.', 'Add the street lines, an antenna and two birds.', p('M158 268H178M190 268H210M324 268H344M356 268H376'), l(154, 58, 154, 36), c(154, 33, 3, F(Rd)), bird(100, 22), bird(300, 18, 0.8)),
], 'Colorie ta grande ville!', 'Color your big city!', { bg: [r(-10, -10, 420, 240, 0, F(Lb))] }));

// ───────── 7. Le parc et les jeux ─────────
const dog = (x, y) => [
  r(x - 14, y + 8, 5, 13, 2, F(Tn)), r(x + 8, y + 8, 5, 13, 2, F(Tn)), p(`M${x + 19} ${y - 4}Q${x + 32} ${y - 14} ${x + 28} ${y - 26}`),
  e(x, y, 21, 11, F(Tn)), c(x - 22, y - 8, 9, F(Tn)), e(x - 27, y - 14, 4, 8, F(Dn)), e(x - 31, y - 5, 5, 4, F(Dn)),
];
L.push(A('parc', '🛝', 'Le parc et les jeux', 'The park and playground', 3, 50, [
  S('Dessine la pelouse : une grande ligne ondulée.', 'Draw the lawn: a big wavy line.', p('M-10 130Q120 108 230 125T410 118V310H-10Z', F(Gl))),
  S('Dessine un très grand arbre à droite.', 'Draw a very big tree on the right.', tree(335, 205, 2)),
  S('Ajoute le soleil et deux nuages.', 'Add the sun and two clouds.', sun(70, 36, 17), cloud(170, 40, 1), cloud(250, 66, 0.8)),
  S('Dessine la glissade avec son escalier.', 'Draw the slide with its ladder.', l(58, 154, 58, 216), l(30, 152, 12, 216), l(46, 152, 28, 216), l(25, 170, 41, 170), l(19, 190, 35, 190), l(14, 208, 30, 208), r(26, 146, 40, 8, 2, F(Rd)), p('M62 152Q112 174 134 216L116 216Q100 188 62 166Z', F(Y))),
  S('Dessine les balançoires : un grand cadre et deux sièges.', 'Draw the swings: a big frame and two seats.', l(150, 150, 135, 222), l(150, 150, 166, 222), l(262, 150, 247, 222), l(262, 150, 278, 222), r(146, 146, 120, 8, 3, F(Rd)), l(180, 154, 180, 205), l(200, 154, 200, 205), l(222, 154, 222, 205), l(242, 154, 242, 205), r(176, 205, 28, 7, 3, F(Y)), r(218, 205, 28, 7, 3, F(Y))),
  S('Dessine le carré de sable avec un petit tas de sable.', 'Draw the sandbox with a little pile of sand.', pg('50,248 160,248 178,280 32,280', F(Br)), pg('58,254 152,254 166,274 44,274', F(Sa)), p('M85 266Q105 244 125 266Z', F(Sa))),
  S('Dessine un banc sous l\'arbre.', 'Draw a bench under the tree.', r(252, 222, 64, 12, 3, F(Br)), r(248, 236, 72, 8, 3, F(Br)), l(254, 244, 254, 258), l(314, 244, 314, 258)),
  S('Dessine un enfant sur la glissade et un enfant sur la balançoire.', 'Draw a child on the slide and a child on the swing.', person(46, 146, 0.9, Rd), person(190, 212, 0.9, Pu)),
  S('Dessine un enfant debout avec un ballon.', 'Draw a child standing with a ball.', person(215, 270, 1.05, Gr, Dg), c(247, 284, 9, F(Rd)), p('M239 284H255')),
  S('Dessine le chien qui court vers le ballon.', 'Draw the dog running to the ball.', dog(312, 274)),
  S('Ajoute des fleurs, des oiseaux et un cerf-volant.', 'Add flowers, birds and a kite.', [[20, 240], [30, 295], [190, 292], [260, 296], [370, 280], [385, 250]].map(([x, y]) => [l(x, y, x, y + 10), c(x, y - 2, 5, F(Pk))]), bird(300, 24), bird(125, 70, 0.8), pg('345,20 365,42 345,64 325,42', F(Rd)), p('M345 64Q333 82 348 98')),
], 'Colorie ton beau parc!', 'Color your lovely park!', { bg: [r(-10, -10, 420, 140, 0, F(Lb))] }));

// ───────── 8. Le château et le dragon ─────────
L.push(A('chateau', '🏰', 'Le château et le dragon', 'The castle and the dragon', 3, 60, [
  S('Dessine une grande montagne pointue.', 'Draw a big pointy mountain.', p('M180 180L270 50L330 120L355 100L410 180Z', F('#b9c4dd'))),
  S('Dessine la colline verte devant la montagne.', 'Draw the green hill in front of the mountain.', p('M-10 192Q100 174 200 190T410 184V310H-10Z', F(Gl))),
  S('Dessine la grande tour du milieu avec son toit pointu.', 'Draw the big middle tower with its pointy roof.', r(108, 84, 44, 70, 0, F('#c9cfe0')), pg('102,86 130,48 158,86', F(Rd))),
  S('Dessine le mur du château avec ses créneaux et la porte.', 'Draw the castle wall with its battlements and the gate.', crenN(88, 126, 195, 84, 3, 8, F('#c9cfe0')), p('M116 195V168Q130 148 144 168V195Z', F(Dn))),
  S('Dessine les deux tours des côtés avec leurs toits.', 'Draw the two side towers with their roofs.', r(58, 92, 34, 103, 0, F('#c9cfe0')), pg('52,94 75,56 98,94', F(Rd)), r(168, 92, 34, 103, 0, F('#c9cfe0')), pg('162,94 185,56 208,94', F(Rd))),
  S('Ajoute un drapeau sur chaque tour.', 'Add a flag on each tower.', l(75, 56, 75, 34), pg('75,34 95,40 75,46', F(Y)), l(130, 48, 130, 26), pg('130,26 150,32 130,38', F(Y)), l(185, 56, 185, 34), pg('185,34 205,40 185,46', F(Y))),
  S('Dessine les douves pleines d\'eau et le pont-levis.', 'Draw the moat full of water and the drawbridge.', p('M-10 196H215Q235 208 215 220H-10Z', F(Bl)), pg('114,196 146,196 154,220 106,220', F(Br))),
  S('Dessine le gros dragon vert : le corps, le cou, la tête et les pattes.', 'Draw the big green dragon: the body, neck, head and legs.', p('M300 188L322 118L336 150L352 122L362 158L346 192Z', F(Pu)), p('M342 214Q380 224 396 196L386 192Q374 210 346 200Z', F(Gr)), e(278, 232, 10, 15, F(Gr)), e(326, 232, 10, 15, F(Gr)), e(300, 208, 50, 28, F(Gr)), p('M268 196Q238 172 252 142L270 150Q262 170 292 186Z', F(Gr)), pg('252,126 246,112 260,124', F(Y)), pg('264,126 268,112 272,126', F(Y)), e(255, 136, 18, 11, F(Gr))),
  S('Ajoute la flamme et les pics sur le dos du dragon.', 'Add the flame and the spikes on the dragon\'s back.', p('M240 134Q226 122 214 127Q221 133 212 139Q225 141 214 149Q229 149 242 143Z', F(O)), pg('280,182 286,170 292,182', F(Y)), pg('296,180 302,168 308,180', F(Y)), pg('312,182 318,170 324,182', F(Y))),
  S('Dessine le chevalier avec son bouclier et son épée.', 'Draw the knight with his shield and sword.', r(130, 262, 7, 18, 2, F(Gy)), r(140, 262, 7, 18, 2, F(Gy)), r(126, 238, 26, 26, 5, F(Gy)), l(160, 246, 172, 216), l(162, 236, 172, 240), e(120, 254, 9, 13, F(Rd)), c(139, 226, 12, F(Gy)), pg('139,214 146,200 152,216', F(Rd))),
  S('Ajoute le soleil, un nuage et deux sapins.', 'Add the sun, a cloud and two fir trees.', sun(40, 35, 15), cloud(205, 30, 0.9), cloud(345, 36, 0.8), pine(24, 270, 1.2), pine(376, 272, 1.1)),
  S('Ajoute les fenêtres des tours, la neige de la montagne et deux oiseaux.', 'Add the tower windows, the mountain snow and two birds.', r(71, 118, 8, 16, 4, F(D)), r(181, 118, 8, 16, 4, F(D)), r(126, 100, 8, 16, 4, F(D)), pg('255,78 270,50 285,78 277,72 270,80 262,72', F(Wh)), bird(120, 14, 0.8), bird(300, 24, 0.8)),
], 'Colorie le château et le dragon!', 'Color the castle and the dragon!', { bg: [r(-10, -10, 420, 200, 0, F(Lb))] }));

// ───────── 9. Le village d'hiver ─────────
const Cl = '#eef2fa';
const house = (x, yb, w, h, wall, roof) => {
  const ax = x + w / 2, ay = yb - h - 26, lx = x - 6, rx = x + w + 6, ey = yb - h;
  const plx = q(lx + 0.5 * (ax - lx)), prx = q(rx + 0.5 * (ax - rx)), py = q(ey + 0.5 * (ay - ey)), mx = q((plx + prx) / 2);
  return [
    r(x + w * 0.68, ey - 34, 10, 28, 0, F('#b5694a')), r(x, ey, w, h, 0, F(wall)),
    pg(`${lx},${ey} ${ax},${ay} ${rx},${ey}`, F(roof)),
    p(`M${plx} ${py}L${ax} ${ay}L${prx} ${py}Q${q(prx - (prx - plx) / 4)} ${q(py + 8)} ${mx} ${py}T${plx} ${py}Z`, F(Wh)),
    r(x + w * 0.15, ey + 10, 14, 14, 2, F(Y)), r(x + w * 0.6, yb - 24, 14, 24, 2, F(Br)),
  ];
};
const smoke = (x, y) => [c(x, y - 6, 5, F(Cl)), c(x + 6, y - 18, 7, F(Cl)), c(x, y - 34, 9, F(Cl))];
L.push(A('hiver', '⛄', 'Le village d\'hiver', 'The winter village', 3, 55, [
  S('Dessine la colline couverte de neige.', 'Draw the snowy hill.', p('M-10 140Q100 120 200 138T410 128V310H-10Z', F(Sn))),
  S('Dessine la première maison avec un toit enneigé.', 'Draw the first house with a snowy roof.', house(20, 172, 64, 44, '#ff9a8a', '#8a5a36')),
  S('Dessine la deuxième maison, plus petite.', 'Draw the second house, a smaller one.', house(150, 162, 56, 40, '#8fc8ff', '#c0564a')),
  S('Dessine la troisième maison, la plus grande.', 'Draw the third house, the biggest one.', house(300, 170, 66, 46, '#ffe08a', '#6b7fb5')),
  S('Dessine des sapins entre les maisons.', 'Draw fir trees between the houses.', pine(112, 200, 1), pine(250, 170, 0.8), pine(386, 208, 1.2)),
  S('Dessine la patinoire : un grand ovale avec un bord de neige.', 'Draw the rink: a big oval with a snowy edge.', e(215, 252, 104, 42, F(Wh)), e(215, 250, 94, 34, F('#cdeefa'))),
  S('Dessine deux patineurs sur la glace.', 'Draw two skaters on the ice.', person(182, 258, 1, Rd, Dg), l(172, 256, 190, 256), person(252, 262, 1, Bl, '#555d78'), l(240, 260, 258, 260)),
  S('Dessine le bonhomme de neige avec trois boules.', 'Draw the snowman with three snowballs.', l(40, 236, 24, 224), l(76, 236, 92, 226), c(58, 268, 22, F(Wh)), c(58, 236, 16, F(Wh)), c(58, 212, 12, F(Wh)), r(48, 192, 20, 12, 1, F(D)), r(44, 202, 28, 4, 2, F(D)), pg('58,212 72,215 58,218', F(O))),
  S('Dessine le traîneau avec deux cadeaux.', 'Draw the sleigh with two presents.', p('M300 276Q335 280 378 272Q386 266 382 258'), l(318, 268, 318, 277), l(356, 268, 358, 275), r(320, 230, 16, 14, 0, F(Gr)), r(340, 234, 14, 10, 0, F(Y)), p('M308 244H364Q364 268 342 268H316Q304 268 308 244Z', F(Rd))),
  S('Dessine la fumée qui sort des trois cheminées.', 'Draw the smoke coming out of the three chimneys.', smoke(20 + 64 * 0.68 + 5, 172 - 44 - 34), smoke(150 + 56 * 0.68 + 5, 162 - 40 - 34), smoke(300 + 66 * 0.68 + 5, 170 - 46 - 34)),
  S('Ajoute plein de flocons de neige.', 'Add lots of snowflakes.', [[30, 30], [80, 70], [130, 25], [170, 80], [220, 40], [260, 90], [310, 30], [350, 70], [385, 25], [20, 120], [190, 118], [345, 118]].map(([x, y]) => c(x, y, 4, F(Wh)))),
  S('Ajoute le visage, les boutons et l\'écharpe du bonhomme de neige.', 'Add the snowman\'s face, buttons and scarf.', c(54, 208, 2.5, F(D)), c(63, 208, 2.5, F(D)), p('M46 224Q58 232 70 224L68 232Q58 238 48 232Z', F(Rd)), c(58, 246, 2.5, F(D)), c(58, 256, 2.5, F(D)), c(58, 266, 2.5, F(D))),
], 'Colorie ton village sous la neige!', 'Color your village in the snow!', { bg: [r(-10, -10, 420, 150, 0, F('#c9defa'))] }));

// ───────── 10. La jungle ─────────
const frond = (x, y, d, s) => [p(`M${x} ${y}Q${q(x + d * 30 * s)} ${q(y - 40 * s)} ${q(x + d * 70 * s)} ${q(y - 30 * s)}Q${q(x + d * 40 * s)} ${q(y - 6 * s)} ${x} ${y}Z`, F(Gr))];
const frondUp = (x, y, d, s) => p(`M${x} ${y}Q${q(x - d * 12 * s)} ${q(y - 50 * s)} ${q(x + d * 12 * s)} ${q(y - 75 * s)}Q${q(x + d * 30 * s)} ${q(y - 40 * s)} ${x} ${y}Z`, F(Gd));
const JG = '#f2b04e';
L.push(A('jungle', '🐒', 'La jungle', 'The jungle', 3, 55, [
  S('Dessine le sol de la jungle : une ligne ondulée.', 'Draw the jungle floor: a wavy line.', p('M-10 250Q100 236 200 248T410 240V310H-10Z', F(Gl))),
  S('Dessine la falaise de roche avec la cascade et le bassin.', 'Draw the rocky cliff with the waterfall and the pool.', p('M262 50L410 38V244H244Z', F('#9fa9c4')), p('M300 52L352 48L362 240H298Z', F(Lb)), e(330, 250, 62, 16, F(Bl))),
  S('Dessine le gros arbre de gauche avec ses feuilles.', 'Draw the big tree on the left with its leaves.', r(60, 56, 34, 200, 6, F(Br)), cloud(78, 90, 2.6, Gd)),
  S('Dessine le deuxième arbre, au milieu.', 'Draw the second tree, in the middle.', r(188, 96, 28, 160, 6, F(Br)), cloud(202, 118, 2.4, Gd)),
  S('Ajoute quatre lianes qui pendent.', 'Add four vines hanging down.', p('M40 100Q24 142 44 190'), p('M110 104Q128 152 108 205'), p('M170 112Q160 160 176 215'), p('M240 108Q256 152 238 200')),
  S('Dessine de grandes feuilles dans les coins.', 'Draw big leaves in the corners.', frond(8, 268, 1, 1.3), frondUp(14, 268, 1, 1.1), frond(394, 268, -1, 1.3), frondUp(388, 268, -1, 1.1)),
  S('Dessine le perroquet sur la branche.', 'Draw the parrot on the branch.', r(94, 88, 58, 7, 3, F(Br)), pg('128,86 124,114 140,88', F(Bl)), e(134, 70, 10, 18, F(Rd)), e(131, 72, 5, 12, F(Bl)), c(135, 48, 9, F(Rd)), pg('142,46 153,50 142,55', F(Y))),
  S('Dessine le singe assis sur la branche.', 'Draw the monkey sitting on the branch.', r(216, 140, 60, 8, 4, F(Br)), p('M262 134Q288 142 280 116'), e(250, 124, 12, 16, F(Br)), c(250, 98, 11, F(Br)), e(250, 101, 7, 6, F(Tn)), c(238, 98, 5, F(Tn)), c(262, 98, 5, F(Tn))),
  S('Dessine le jaguar : le corps, les pattes, la queue et la tête.', 'Draw the jaguar: the body, legs, tail and head.', p('M170 246Q198 236 192 208L202 208Q210 240 172 258Z', F(JG)), [96, 110, 140, 154].map((x, i) => r(x, 258 + (i % 2 ? 2 : 0), 10, 20, 3, F(JG))), e(128, 248, 44, 19, F(JG)), c(68, 224, 6, F(JG)), c(88, 223, 6, F(JG)), c(78, 238, 17, F(JG)), e(66, 244, 9, 6, F(Cr))),
  S('Dessine le serpent enroulé près du jaguar.', 'Draw the snake coiled next to the jaguar.', p('M205 284Q222 262 240 278Q258 296 272 272L282 280Q264 310 240 294Q224 278 214 296Z', F(Gr)), e(284, 272, 10, 7, F(Gr))),
  S('Ajoute les taches du jaguar, les yeux et les lignes de la cascade.', 'Add the jaguar\'s spots, the eyes and the waterfall lines.', [[112, 240], [130, 252], [148, 240], [124, 262]].map(([x, y]) => c(x, y, 4, F(D))), c(74, 234, 3, F(D)), c(86, 234, 3, F(D)), c(247, 98, 2.5, F(D)), c(255, 98, 2.5, F(D)), c(133, 47, 2.5, F(D)), p('M314 70V230M332 62V232M348 70V228')),
], 'Colorie la jungle toute verte!', 'Color the lush jungle!', { bg: [r(-10, -10, 420, 260, 0, F('#d9f2c8'))] }));

// ───────── 11. Le camping ─────────
L.push(A('camping', '⛺', 'Le camping', 'Camping', 3, 55, [
  S('Dessine le terrain du camping : une colline ondulée.', 'Draw the campsite: a wavy hill.', p('M-10 190Q100 170 220 185T410 175V310H-10Z', F('#5f9c74'))),
  S('Dessine le lac : un grand ovale à droite.', 'Draw the lake: a big oval on the right.', e(315, 238, 88, 28, F('#4f86c6'))),
  S('Dessine la pleine lune et cinq étoiles.', 'Draw the full moon and five stars.', c(60, 55, 24, F(Y)), star5(150, 40, 10), star5(205, 78, 8), star5(262, 30, 11), star5(135, 108, 8), star5(315, 76, 9)),
  S('Dessine la tente avec son entrée.', 'Draw the tent with its door.', pg('40,252 95,170 150,252', F(O)), pg('85,252 95,206 106,252', F('#8a3b1e'))),
  S('Dessine trois grands sapins.', 'Draw three tall fir trees.', pine(25, 208, 1.3), pine(172, 202, 1.1), pine(245, 194, 0.9)),
  S('Dessine un gros arbre près du lac.', 'Draw a big tree near the lake.', tree(374, 206, 1.8, Gd)),
  S('Dessine le hibou sur sa branche.', 'Draw the owl on its branch.', r(318, 162, 52, 7, 3, F(Br)), e(334, 148, 10, 15, F('#a07b52')), c(334, 128, 10, F('#a07b52')), pg('326,122 328,110 334,120', F('#a07b52')), pg('342,122 340,110 334,120', F('#a07b52')), c(330, 127, 4.5, F(Wh)), c(339, 127, 4.5, F(Wh)), pg('332,131 336,131 334,137', F(Y))),
  S('Dessine le feu de camp : les flammes, deux bûches et des roches.', 'Draw the campfire: the flames, two logs and some stones.', p('M205 262Q188 240 205 216Q210 238 224 230Q232 248 205 262Z', F(O)), p('M205 258Q197 246 205 234Q211 248 205 258Z', F(Y)), r(182, 258, 46, 9, 4, `transform="rotate(18 205 262)" ${F(Br)}`), r(182, 258, 46, 9, 4, `transform="rotate(-18 205 262)" ${F(Br)}`), c(184, 272, 6, F(Dg)), c(205, 277, 6, F(Dg)), c(226, 272, 6, F(Dg))),
  S('Plante deux bâtons avec des guimauves près du feu.', 'Stick two sticks with marshmallows near the fire.', l(214, 252, 256, 224), c(259, 222, 7, F(Wh)), l(196, 254, 154, 234), c(150, 232, 7, F(Wh))),
  S('Dessine le canot sur le lac.', 'Draw the canoe on the lake.', p('M285 230H350Q336 248 318 248Q300 248 285 230Z', F(Rd)), l(300, 232, 330, 214)),
  S('Ajoute les cratères de la lune et des vagues sur le lac.', 'Add the moon craters and waves on the lake.', c(52, 50, 4, F('#e8b84a')), c(68, 64, 5, F('#e8b84a')), wvs([[262, 258], [330, 262], [290, 224]])),
], 'Colorie ta nuit de camping!', 'Color your camping night!', { bg: [r(-10, -10, 420, 200, 0, F('#4a5aa8'))], fg: [[20, 20], [100, 60], [180, 30], [230, 110], [290, 20], [350, 100], [395, 70], [110, 150], [20, 140]].map(([x, y]) => c(x, y, 1.8, `${F(Wh)} stroke="none"`)) }));

// ───────── 12. La cabane à sucre au printemps ─────────
const maple = (x, y, s) => [r(x - 6 * s, y - 60 * s, 12 * s, 60 * s, 2, F(Br)), cloud(x, y - 52 * s, 1.7 * s, '#8fd38a')];
const pail = (x, y, s, d = 1) => [l(x + d * 6 * s, y - 3 * s, x + d * 1 * s, y - 3 * s), pg(`${q(x + d * 6 * s)},${y} ${q(x + d * 20 * s)},${y} ${q(x + d * 18 * s)},${q(y + 15 * s)} ${q(x + d * 8 * s)},${q(y + 15 * s)}`, F(Gy))];
L.push(A('cabane', '🍁', 'La cabane à sucre au printemps', 'The sugar shack in spring', 3, 55, [
  S('Dessine la colline du printemps : une longue ligne ondulée.', 'Draw the spring hill: a long wavy line.', p('M-10 150Q110 132 220 148T410 140V310H-10Z', F('#b7dca0'))),
  S('Ajoute le soleil et deux nuages.', 'Add the sun and two clouds.', sun(340, 40, 18), cloud(190, 36, 1), cloud(60, 50, 0.8)),
  S('Dessine la cabane en bois : un grand rectangle.', 'Draw the wooden shack: a big rectangle.', r(40, 140, 120, 70, 2, F(Br))),
  S('Dessine le toit avec la cheminée.', 'Draw the roof with the chimney.', r(130, 92, 14, 36, 0, F(Dg)), pg('28,144 100,98 172,144', F(Rd))),
  S('Dessine la porte et les deux fenêtres.', 'Draw the door and the two windows.', r(82, 168, 36, 42, 2, F(Dn)), r(50, 160, 22, 22, 2, F(Y)), r(128, 160, 22, 22, 2, F(Y))),
  S('Ajoute la petite lucarne sur le toit pour laisser sortir la vapeur.', 'Add the little roof vent to let the steam out.', r(88, 74, 24, 28, 2, F(Br)), pg('84,76 100,60 116,76', F(Rd))),
  S('Dessine un érable avec deux chaudières.', 'Draw a maple tree with two pails.', maple(215, 226, 1), pail(221, 198, 1), pail(209, 200, 1, -1)),
  S('Dessine un deuxième érable plus loin.', 'Draw a second maple farther away.', maple(362, 200, 0.8), pail(367, 176, 0.8)),
  S('Dessine des plaques de neige qui fond et des flaques.', 'Draw patches of melting snow and puddles.', e(60, 262, 40, 10, F(Wh)), e(190, 288, 46, 8, F(Wh)), e(300, 200, 26, 6, F(Wh)), e(30, 192, 24, 6, F(Wh)), e(120, 284, 28, 7, F(Bl)), e(360, 286, 26, 7, F(Bl))),
  S('Dessine le cheval brun qui tire la carriole.', 'Draw the brown horse pulling the sleigh.', [250, 262, 284, 296].map((x, i) => r(x, 252 + (i % 2 ? 2 : 0), 6, 22, 2, F(Br))), p('M304 232Q318 238 312 256'), e(275, 240, 30, 16, F(Br)), p('M252 234L240 210L254 204L268 228Z', F(Br)), pg('245,198 249,188 253,200', F(Br)), e(240, 206, 13, 8, F(Br)), e(230, 210, 7, 5, F(Dn))),
  S('Dessine la carriole avec un baril de sirop.', 'Draw the sleigh with a syrup barrel.', p('M306 276Q345 282 392 270Q400 262 394 254'), l(322, 264, 322, 277), l(370, 264, 370, 274), r(332, 220, 22, 20, 4, F(Br)), p('M316 238H378Q380 262 360 264H326Q312 262 316 238Z', F(Rd)), l(300, 244, 316, 246)),
  S('Ajoute trois oiseaux qui reviennent au printemps.', 'Add three birds coming back in spring.', bird(130, 22), bird(280, 70, 0.9), bird(235, 18, 0.8)),
  S('Ajoute la vapeur qui sort de la cabane et les lignes des bûches.', 'Add the steam coming out of the shack and the log lines.', [[100, 56, 5], [106, 44, 7], [100, 28, 9], [137, 80, 5], [143, 68, 7]].map(([x, y, rr]) => c(x, y, rr, F(Cl))), p('M40 154H160M40 196H160')),
], 'Colorie la cabane à sucre!', 'Color the sugar shack!', { season: 'cabane-a-sucre', bg: [r(-10, -10, 420, 160, 0, F(Lb))] }));

export const projects = L;
