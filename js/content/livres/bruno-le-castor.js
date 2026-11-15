// bruno-le-castor — storybook (see docs/LIVRES.md)
const P = 'blc';
// ---- shared picture helpers (flat picture-book style) ----
const O = '#3a3f55';
let _g = 0;
const uid = () => `${P}${++_g}`;
const svg = (b) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><g stroke="#3a3f55" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${b}</g></svg>`;
const sw_ = (sw) => (sw === 3 ? "" : sw ? ` stroke-width="${sw}"` : " stroke=\"none\"");
const sky = (a, b) => { const id = uid(); return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="300" fill="url(#${id})"/>`; };
const ell = (cx, cy, rx, ry, f, sw = 3, ex = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"${sw_(sw)}${ex ? " " + ex : ""}/>`;
const circ = (cx, cy, r, f, sw = 3) => ell(cx, cy, r, r, f, sw);
const rect = (x, y, w, h, f, sw = 3, r = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"${r ? ` rx="${r}"` : ""} fill="${f}"${sw_(sw)}/>`;
const path = (d, f = "none", sw = 3, ex = "") => `<path d="${d}" fill="${f}"${sw_(sw)}${ex ? " " + ex : ""}/>`;
const line = (x1, y1, x2, y2, c = O, sw = 3) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${c === O ? "" : ` stroke="${c}"`}${sw_(sw)}/>`;
const G = (x, y, s, inner, flip = false, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})">${inner}</g>`;
const rnd = (i) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const cloud = (x, y, s = 1, c = '#fff') => G(x, y, s, `<g fill="${c}"><ellipse cx="0" cy="0" rx="32" ry="13"/><ellipse cx="-18" cy="-8" rx="15" ry="11"/><ellipse cx="8" cy="-13" rx="19" ry="15"/></g>`);
const sun = (x, y, r = 26) => path(Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, k = Math.cos(a), n = Math.sin(a); return `M${Math.round(x + k * (r + 5))} ${Math.round(y + n * (r + 5))}L${Math.round(x + k * (r + 13))} ${Math.round(y + n * (r + 13))}`; }).join(""), "none", 4, "stroke=\"#f7b733\"") + circ(x, y, r, "#ffd84d");
const star = (x, y, r = 5, f = '#ffe58a') => `<path d="M${x} ${y - r} L${x + r * .3} ${y - r * .3} L${x + r} ${y} L${x + r * .3} ${y + r * .3} L${x} ${y + r} L${x - r * .3} ${y + r * .3} L${x - r} ${y} L${x - r * .3} ${y - r * .3}Z" fill="${f}"/>`;
const moon = (x, y, r = 22) => `<circle cx="${x}" cy="${y}" r="${r * 1.5}" fill="#fff6c8" opacity=".18"/>` + path(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * .65} ${r} 0 1 1 ${x} ${y - r}Z`, '#fff1a8', 3);
const tree = (x, y, s = 1, c = '#69b85f') => G(x, y, s, `${rect(-6, -34, 12, 34, '#8a5a3b', 3)}${circ(0, -58, 25, c)}${circ(-18, -42, 17, c)}${circ(18, -42, 17, c)}<g fill="${c}">${circ(0, -57, 23.5, c, 0)}${circ(-18, -42, 15.5, c, 0)}${circ(18, -42, 15.5, c, 0)}${rect(-14, -45, 28, 14, c, 0)}</g>`);
const pine = (x, y, s = 1, c = '#3f8f63', snow = false) => G(x, y, s, `${rect(-5, -22, 10, 22, '#7a5236', 3)}${path('M-30 -18 L0 -62 L30 -18Z', c)}${path('M-25 -48 L0 -92 L25 -48Z', c)}${path('M-19 -76 L0 -112 L19 -76Z', c)}${snow ? path('M-8 -100 L0 -112 L8 -100 Q0 -95 -8 -100Z', '#fff', 0) + path('M-14 -64 L0 -92 L14 -64 Q0 -57 -14 -64Z', '#fff', 0) + path('M-20 -36 L0 -62 L20 -36 Q0 -28 -20 -36Z', '#fff', 0) : ''}`);
const bush = (x, y, s = 1, c = '#58a84f') => G(x, y, s, `${circ(-14, -10, 14, c)}${circ(14, -10, 14, c)}${circ(0, -16, 17, c)}<g>${circ(-14, -10, 12.5, c, 0)}${circ(14, -10, 12.5, c, 0)}${circ(0, -16, 15.5, c, 0)}${rect(-14, -14, 28, 14, c, 0)}</g>`);
const flower = (x, y, c = '#ff7aa8') => `${line(x, y, x, y - 12, '#3f8f4f', 2.5)}${circ(x, y - 14, 4.5, c, 2)}${circ(x, y - 14, 1.8, '#ffe066', 0)}`;
const lawn = (y = 205, c1 = '#a6d982', c2 = '#86c862') => path(`M-5 ${y - 22} Q80 ${y - 52} 170 ${y - 28} Q260 ${y - 6} 330 ${y - 38} Q380 ${y - 52} 405 ${y - 32} L405 305 L-5 305Z`, c1) + rect(-5, y, 410, 110, c2, 3);
const day = (sx = 335) => sky('#8fd0f4', '#e8f8ff') + sun(sx, 52, 24) + cloud(sx < 150 ? 150 : 70, 58) + cloud(sx < 150 ? 290 : 225, 36, .8);
const wind = (x, y, n = 3, len = 60, c = '#fff') => Array.from({ length: n }, (_, i) => path(`M${x} ${y + i * 14} q${len / 3} -10 ${len / 2} 0 t${len / 2} 0`, 'none', 3.5, `stroke="${c}" opacity=".9"`).replace(`stroke="${O}"`, '')).join('');
const bits = (x, y, n, spread, c = '#e7c35d', len = 14, w = 3, seed = 1) => Array.from({ length: n }, (_, i) => { const a = rnd(i + seed) * 180, cx = x + (rnd(i + 50 + seed) - .5) * spread * 2, cy = y - rnd(i + 90 + seed) * spread * .8, dx = Math.cos(a * Math.PI / 180) * len / 2, dy = Math.sin(a * Math.PI / 180) * len / 2; return line((cx - dx).toFixed(1), (cy - dy).toFixed(1), (cx + dx).toFixed(1), (cy + dy).toFixed(1), c, w); }).join('');
const peek = (x, y, w, h, draw) => { const id = uid(); return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>${rect(x, y, w, h, '#bfe8ff', 0)}<g clip-path="url(#${id})">${draw}</g>${rect(x, y, w, h, 'none', 3)}`; };
// ---- end shared helpers ----

// ---- characters: Bruno (green kerchief), Lili (pink flower, lighter fur), Papa (red plaid vest) ----
const BV = { bruno: { c: '#9a6a43', b: '#e8c99a' }, lili: { c: '#b98556', b: '#f2dab0' }, papa: { c: '#74502f', b: '#d6b080' } };
const castor = (x, y, s, who = 'bruno', face = 'happy', arms = 'down', flip = false) => {
  const o = BV[who];
  const k = face === 'scared' || face === 'wow' ? 'wide' : face === 'cheer' ? 'closed' : 'dot';
  const ey = (cx) => k === 'wide' ? circ(cx, -83, 5.5, '#fff', 2) + circ(cx, -82.5, 2.4, O, 0) : k === 'closed' ? path(`M${cx - 4.5} -81 Q${cx} -88 ${cx + 4.5} -81`, 'none', 2.8) : ell(cx, -82, 3.2, 3.9, O, 0) + circ(cx - 1, -83.4, 1.1, '#fff', 0);
  const brows = face === 'determined' ? path('M-16 -92 L-5 -87', 'none', 3) + path('M16 -92 L5 -87', 'none', 3) : face === 'scared' ? path('M-15 -92 L-5 -96', 'none', 2.5) + path('M15 -92 L5 -96', 'none', 2.5) : '';
  const hand = (sx, rot, ax = 28, ay = -38) => ell(sx * ax, ay, 6, 12, o.c, 3, `transform="rotate(${sx * rot} ${sx * ax} ${ay})"`);
  const arm = { down: hand(-1, -10) + hand(1, -10), up: ell(-33, -62, 6, 12, o.c, 3, 'transform="rotate(-35 -33 -62)"') + ell(33, -62, 6, 12, o.c, 3, 'transform="rotate(35 33 -62)"'), front: ell(24, -44, 6, 13, o.c, 3, 'transform="rotate(-75 24 -44)"') + ell(30, -36, 6, 13, o.c, 3, 'transform="rotate(-75 30 -36)"'), point: hand(-1, -10) + ell(33, -56, 6, 13, o.c, 3, 'transform="rotate(-55 33 -56)"') }[arms];
  return G(x, y, s,
    ell(40, -6, 27, 8, '#5a4636', 3, 'transform="rotate(-4 40 -6)"') + path('M24 -10 l8 -6 M36 -12 l8 -6 M48 -12 l8 -5', 'none', 2, 'stroke="#8a7460"') +
    ell(-11, -3, 10, 5, '#5a4636', 2.5) + ell(11, -3, 10, 5, '#5a4636', 2.5) + rect(-15, -16, 11, 14, o.c, 3) + rect(4, -16, 11, 14, o.c, 3) +
    ell(0, -40, 28, 33, o.c) + ell(0, -34, 17, 25, o.b, 0) +
    (who === 'papa' ? path('M-27 -54 Q0 -40 27 -54 L25 -20 Q0 -10 -25 -20Z', '#d94f4f') + path('M-15 -48 L-15 -16 M0 -46 L0 -13 M15 -48 L15 -16 M-26 -40 L26 -40 M-26 -29 L26 -29', 'none', 2, 'stroke="#8c2a2a"') : '') +
    arm +
    circ(-19, -99, 7, o.c) + circ(19, -99, 7, o.c) + circ(-19, -99, 3, '#6b4a35', 0) + circ(19, -99, 3, '#6b4a35', 0) +
    ell(0, -79, 26, 23, o.c) + ell(0, -69, 14, 10, o.b, 0) + circ(-18, -72, 3.5, '#ff9aa8', 0) + circ(18, -72, 3.5, '#ff9aa8', 0) +
    ey(-10) + ey(10) + brows + ell(0, -73, 7, 4.5, '#3a2a2a', 0) + rect(-5.5, -68, 5.5, 9, '#fff', 2, 1.5) + rect(0, -68, 5.5, 9, '#fff', 2, 1.5) +
    (face === 'scared' ? path('M24 -100 q-5 8 0 11 q5 -3 0 -11Z', '#9fdcff', 2) : '') + (face === 'determined' ? path('M24 -96 q-4 6 0 9 q4 -3 0 -9Z', '#9fdcff', 2) : '') +
    (who === 'bruno' ? path('M-17 -55 Q0 -46 17 -55 L0 -36Z', '#4caf63', 2.5) : '') +
    (who === 'lili' ? [[-9, -111], [3, -113], [-3, -104], [-15, -105], [-1, -110]].map(([a, b], i) => i < 4 ? circ(a - 12 + 12, b, 4.5, '#ff7aa8', 2) : '').join('') + circ(-6, -108, 3.5, '#ffe066', 0) : ''), flip);
};
const stick = (x, y, len, ang, w = 5, c = '#8a5a3b') => `<line x1="${x}" y1="${y}" x2="${(x + Math.cos(ang * Math.PI / 180) * len).toFixed(0)}" y2="${(y - Math.sin(ang * Math.PI / 180) * len).toFixed(0)}" stroke="${c}" stroke-width="${w}"/>`;
const bigLog = (x, y, s = 1) => G(x, y, s, rect(-60, -34, 120, 34, '#9a6a43', 3, 12) + ell(60, -17, 9, 17, '#d9b283', 3) + ell(60, -17, 4, 8, '#b98558', 2) + path('M-40 -22 q14 -4 28 0 M0 -10 q16 4 34 0', 'none', 2, 'stroke="#74502f"'));
const mud = (x, y, r = 10) => ell(x, y, r, r * .8, '#6b4a35', 2.5) + circ(x - r * .3, y - r * .3, r * .22, '#8a6a52', 0);
const dam = (x, y, s, o = {}) => G(x, y, s,
  rect(-140, -8, 280, 14, '#6b4a35', 3, 6) +
  Array.from({ length: o.lvl || 3 }, (_, i) => { const yy = -(i + 1) * 22 - 6, c1 = '#9a6a43', c2 = '#84583a'; return (i % 2 ? rect(-130, yy, 26, 22, c2, 3, 8) + rect(104, yy, 26, 22, c2, 3, 8) + Array.from({ length: 4 }, (_, j) => rect(-104 + j * 52, yy, 52, 22, j % 2 ? c1 : c2, 3, 8)).join('') : Array.from({ length: 5 }, (_, j) => rect(-130 + j * 52, yy, 52, 22, j % 2 ? c2 : c1, 3, 8)).join('')); }).join('') +
  path('M-90 ' + (-(o.lvl || 3) * 22 - 6) + ' l-8 -14 M-30 ' + (-(o.lvl || 3) * 22 - 6) + ' l4 -16 M40 ' + (-(o.lvl || 3) * 22 - 6) + ' l-3 -15 M95 ' + (-(o.lvl || 3) * 22 - 6) + ' l9 -12', 'none', 4, 'stroke="#6b4329"') + (o.hole ? rect(-18, -50, 36, 22, '#1f2d44', 3) + path('M-18 -42 Q-46 -36 -70 -4 M18 -42 Q46 -36 70 -4 M-6 -28 Q0 0 -4 12 M8 -28 Q10 0 16 12', 'none', 5, 'stroke="#bfe3ff"') : '') +
  (o.patch ? rect(-20, -52, 40, 26, '#6b4a35', 3, 4) + line(-18, -30, 14, -50, '#9a6a43', 5) + line(-14, -50, 18, -28, '#84583a', 5) + line(-20, -40, 20, -40, '#9a6a43', 5) + mud(-12, -36, 7) + mud(10, -32, 7) : ''));
const lodge = (x, y, s = 1) => G(x, y, s, path('M-62 0 Q-62 -72 0 -74 Q62 -72 62 0Z', '#8a5a3b') + Array.from({ length: 9 }, (_, i) => line(-50 + i * 11, -10 - rnd(i) * 40, -34 + i * 11 + rnd(i + 9) * 20, -52 - rnd(i + 4) * 14, '#6b4329', 3)).join('') + path('M-12 0 Q-12 -22 0 -22 Q12 -22 12 0Z', '#2a1d25'));
const rain = (n = 30, seed = 1) => `<g stroke="#d6e6ff" stroke-width="2.5" opacity=".75">${Array.from({ length: n }, (_, i) => { const a = Math.round(rnd(i + seed) * 400), b = Math.round(rnd(i + 30 + seed) * 290); return `<line x1="${a}" y1="${b}" x2="${a - 10}" y2="${b + 22}"/>`; }).join('')}</g>`;
const reeds = (x, y, s = 1) => G(x, y, s, [-10, 0, 8, 16].map((a, i) => stick(a, 0, 40 + i * 6, 90 + (i % 2 ? 6 : -6), 3, '#6aa04e') + ell(a + (i % 2 ? 2 : -2), -40 - i * 6, 3.5, 8, '#8a5a3b', 2)).join(''));
const pad = (x, y, s = 1) => G(x, y, s, ell(0, 0, 16, 6, '#58b05a') + path('M0 0 L14 -2', 'none', 2));
const sweat = (x, y) => path(`M${x} ${y} q-5 8 0 11 q5 -3 0 -11Z`, '#9fdcff', 2);
const night = () => sky('#1b2455', '#4b4f9a') + star(170, 45, 4) + star(230, 70, 3) + star(190, 95, 3);
const maple = (x, y, s = 1) => tree(x, y, s, '#e0572f');
const farTrees = (y = 178) => [20, 70, 120, 330, 380].map((a, i) => pine(a, y + (i % 2) * 8, .75 + (i % 2) * .1, '#5a9a7a')).join('');
const shore = (y = 238) => path(`M-5 ${y} Q100 ${y - 14} 200 ${y - 4} Q300 ${y - 16} 405 ${y} L405 305 L-5 305Z`, '#9bcf7a') + rect(-5, y + 14, 410, 100, '#86c862', 3);

export const book = {
  id: 'bruno-le-castor',
  title: 'Bruno le castor',
  emoji: '🦫',
  level: 1,
  minutes: 7,
  cover: svg(day(335) + farTrees() + rect(-5, 170, 410, 130, '#6fb6e8') + rect(0, 195, 400, 100, '#5aa5dc', 0) + dam(200, 215, .85, { lvl: 3 }) + shore(238) + maple(40, 250, 1.2) + reeds(360, 262, 1.1) + castor(200, 272, 1.5, 'bruno', 'cheer', 'up') + pad(70, 205) + pad(330, 195)),
  pages: [
    { text: 'Bruno est un jeune castor. Il vit avec sa famille dans un lac du Québec.',
      svg: svg(day(60) + farTrees() + rect(-5, 170, 410, 130, '#6fb6e8') + path('M30 195 q20 -6 40 0 t40 0 M250 215 q20 -6 40 0 t40 0 M140 235 q20 -6 40 0', 'none', 2.5, 'stroke="#fff" opacity=".7"') + lodge(105, 200, 1.1) + pad(300, 190) + pad(220, 225) + shore(244) + maple(365, 255, 1.1) + reeds(30, 262) + castor(155, 275, 1.1, 'bruno', 'happy') + castor(230, 277, .85, 'lili', 'happy') + castor(310, 275, 1.25, 'papa', 'happy')) },
    { text: 'Un matin, Papa montre le ruisseau. L’eau est très basse. Il faut un barrage pour la garder!',
      svg: svg(day(340) + farTrees(170) + rect(-5, 170, 410, 140, '#a5d27d') + path('M185 165 Q215 215 175 262 Q160 285 150 305 L255 305 Q250 280 240 255 Q225 215 215 165Z', '#c9a77c') + path('M196 170 Q212 215 192 258 Q182 285 178 305 L225 305 Q222 280 216 258 Q206 215 207 170Z', '#7cbcee') + rect(-5, 262, 410, 50, '#86c862', 3) + path('M190 262 q-10 20 -30 30 L240 292 q-20 -12 -22 -30Z', '#c9a77c', 0) + ell(150, 300, 30, 8, '#c9a77c', 0) + maple(40, 245, 1.2) + castor(115, 276, 1.1, 'bruno', 'wow') + castor(310, 276, 1.3, 'papa', 'happy', 'point')) },
    { text: 'Bruno veut tout faire vite. Il pousse une énorme bûche, mais elle est trop lourde!',
      svg: svg(day(60) + farTrees(170) + shore(215) + maple(350, 235, 1.2) + bigLog(295, 268, 1.2) + castor(175, 276, 1.2, 'bruno', 'determined', 'front') + sweat(150, 175) + sweat(205, 180) + path('M215 278 l-12 0 M215 262 l-14 -4', 'none', 3, 'stroke="#fff"')) },
    { text: 'Papa sourit. « Un petit morceau à la fois, Bruno. Sois patient. »',
      svg: svg(day(340) + farTrees(170) + shore(215) + maple(40, 235, 1.1) + stick(60, 285, 40, 15) + stick(70, 292, 36, 170) + stick(85, 284, 38, 40) + castor(160, 276, 1.15, 'bruno', 'happy', 'up') + stick(195, 188, 34, 70, 6) + castor(290, 277, 1.35, 'papa', 'happy', 'point')) },
    { text: 'Bruno coupe un arbre avec ses grandes dents. Crac, crac, crac!',
      svg: svg(day(60) + farTrees(170) + shore(215) + rect(272, 100, 28, 170, '#a07850', 3) + circ(286, 90, 34, '#69b85f') + circ(262, 110, 24, '#69b85f') + circ(312, 108, 24, '#69b85f') + path('M272 196 L290 208 L300 196 L300 214 L272 214Z', '#f0d9a8', 2.5) + [[255, 190], [262, 215], [248, 205], [310, 222], [318, 205]].map(([a, b], i) => rect(a, b, 8, 5, '#f0d9a8', 2, 1)).join('') + path('M250 180 l-8 -8 M262 176 l-2 -10 M250 224 l-9 7', 'none', 3, 'stroke="#fff"') + castor(232, 277, 1.15, 'bruno', 'determined', 'front') + maple(60, 240, 1.2) + bits(120, 285, 6, 35, '#f0d9a8', 10, 4, 14)) },
    { text: 'Lili apporte de la boue. Papa pousse les bûches. Ensemble, ils bâtissent le barrage.',
      svg: svg(day(340) + farTrees(170) + rect(-5, 170, 410, 130, '#a5d27d') + dam(200, 232, .85, { lvl: 2 }) + shore(250) + castor(75, 280, .95, 'lili', 'happy', 'front') + mud(122, 215, 11) + castor(205, 280, 1.15, 'bruno', 'cheer', 'up') + stick(238, 195, 28, 60, 5) + castor(335, 278, 1.3, 'papa', 'determined', 'front', true) + bigLog(250, 292, .5)) },
    { text: 'Jour après jour, le barrage grandit. Derrière, un petit lac se forme.',
      svg: svg(day(60) + farTrees(165) + rect(-5, 145, 410, 90, '#6fb6e8') + path('M40 175 q20 -6 40 0 t40 0 M250 190 q20 -6 40 0', 'none', 2.5, 'stroke="#fff" opacity=".7"') + pad(90, 185) + pad(300, 170) + ell(300, 168, 4, 4, '#ff7aa8', 2) + reeds(35, 205) + reeds(375, 205) + dam(200, 240, .95, { lvl: 3 }) + rect(-5, 250, 410, 60, '#9bcf7a', 3) + castor(95, 282, 1.1, 'bruno', 'cheer', 'up') + castor(200, 285, .9, 'lili', 'happy', 'up') + castor(305, 280, 1.25, 'papa', 'happy', 'up')) },
    { text: 'Une nuit, un gros orage éclate. Le tonnerre gronde et la pluie tombe fort!',
      svg: svg(sky('#2f3350', '#6c7391') + path('M290 20 L262 90 L284 90 L256 160 L312 80 L290 80 L316 20Z', '#ffe45c', 3) + cloud(70, 50, 1.3, '#8a90ad') + cloud(250, 38, 1.2, '#8a90ad') + rect(-5, 165, 410, 80, '#4a6a98') + path('M20 190 q25 -8 50 0 t50 0 M200 210 q25 -8 50 0 t50 0', 'none', 3, 'stroke="#cfe3ff" opacity=".7"') + dam(270, 235, .75, { lvl: 3 }) + shore(250).replace(/#9bcf7a/, '#5a8a5a').replace(/#86c862/, '#4a7a4a') + rain(34, 3) + castor(115, 280, 1.15, 'bruno', 'scared') + castor(185, 283, .9, 'lili', 'scared', 'up')) },
    { text: 'L’eau pousse fort sur le barrage. Un trou apparaît! Bruno n’a pas peur: il court l’aider.',
      svg: svg(sky('#3a3f5c', '#7d84a3') + cloud(80, 42, 1.2, '#8a90ad') + cloud(300, 36, 1.2, '#8a90ad') + rect(-5, 140, 410, 100, '#4a6a98') + dam(285, 238, .9, { lvl: 3, hole: true }) + shore(252).replace(/#9bcf7a/, '#5a8a5a').replace(/#86c862/, '#4a7a4a') + rain(24, 8) + castor(95, 280, 1.15, 'bruno', 'determined', 'up') + stick(130, 195, 30, 60, 5) + castor(185, 282, 1.25, 'papa', 'determined', 'front')) },
    { text: 'Tous ensemble, ils bouchent le trou avec des branches et de la boue. Le barrage tient bon!',
      svg: svg(sky('#58607f', '#aab3cc') + cloud(90, 44, 1.2, '#c3c9dc') + cloud(310, 40, 1.1, '#c3c9dc') + rect(-5, 140, 410, 100, '#5a87b8') + dam(255, 240, 1.1, { lvl: 3, patch: true }) + shore(252).replace(/#9bcf7a/, '#6a9a6a').replace(/#86c862/, '#5a8a5a') + rain(10, 12) + castor(70, 282, .95, 'lili', 'happy', 'front') + mud(110, 232, 10) + castor(150, 285, 1.2, 'bruno', 'determined', 'front') + stick(185, 212, 28, 50, 5) + castor(345, 282, 1.3, 'papa', 'happy', 'front', true)) },
    { text: 'Le lendemain, le soleil brille. Le barrage est solide, et Bruno est fier de lui!',
      svg: svg(day(335) + ['#ff6b6b', '#ffb84d', '#ffe45c', '#7ad37a', '#5aa5ff'].map((c, i) => path(`M${45 + i * 5} 160 Q200 ${-20 + i * 6} ${355 - i * 5} 160`, 'none', 6, `stroke="${c}" opacity=".85"`)).join('') + farTrees(165) + rect(-5, 150, 410, 85, '#6fb6e8') + ell(120, 185, 30, 5, '#fff', 0, 'opacity=".6"') + pad(80, 195) + pad(320, 185) + reeds(30, 208) + dam(200, 240, 1.0, { lvl: 3 }) + castor(200, 168, 1, 'bruno', 'cheer', 'up') + rect(-5, 250, 410, 60, '#9bcf7a', 3) + castor(90, 284, .95, 'lili', 'happy', 'up') + castor(315, 280, 1.25, 'papa', 'happy', 'up')) },
    { text: 'Ce soir-là, toute la famille mange dans la hutte. Bruno a compris: avec de la patience et de l’aide, on peut tout bâtir.',
      svg: svg(rect(0, 0, 400, 300, '#a8764f', 0) + Array.from({ length: 16 }, (_, i) => line(rnd(i) * 400, rnd(i + 20) * 230, rnd(i) * 400 + 60 - rnd(i + 5) * 120, rnd(i + 20) * 230 + 40, '#84583a', 4)).join('') + rect(0, 238, 400, 62, '#6b4a35', 0) + peek(150, 30, 100, 80, night() + moon(200, 70, 16)).replace('fill="#bfe8ff"', 'fill="#1b2455"') + castor(105, 262, 1.15, 'bruno', 'happy') + castor(200, 268, 1.3, 'papa', 'happy') + castor(300, 262, .95, 'lili', 'happy') + rect(70, 218, 260, 14, '#c9966a', 3, 6) + rect(90, 232, 220, 40, '#9a6a43') + bigLog(150, 214, .35) + stick(250, 210, 26, 25, 5, '#c9966a') + stick(262, 214, 24, 150, 5, '#c9966a') + ell(200, 209, 22, 6, '#e8c99a', 2.5)) },
  ],
  words: [
    { word: 'un castor', emoji: '🦫', def: 'Un animal qui coupe des arbres avec ses dents et construit dans l’eau.' },
    { word: 'un barrage', emoji: '🧱', def: 'Un mur de bûches qui retient l’eau d’un ruisseau.' },
    { word: 'une bûche', emoji: '🪵', def: 'Un gros morceau de bois.' },
    { word: 'la boue', emoji: '🟤', def: 'De la terre mouillée, molle et collante.' },
    { word: 'un ruisseau', emoji: '🏞️', def: 'Une petite rivière.' },
    { word: 'une hutte', emoji: '🛖', def: 'La maison d’un castor, faite de branches.' },
    { word: 'un orage', emoji: '⛈️', def: 'Un gros temps avec de la pluie, du tonnerre et des éclairs.' },
    { word: 'patient', emoji: '⏳', def: 'Quelqu’un qui sait attendre et prend son temps.' },
  ],
  quiz: [
    { q: 'Où vit Bruno?', options: ['Dans un désert', 'Dans un lac du Québec', 'Dans une grotte'], answer: 1 },
    { q: 'Pourquoi la famille veut-elle un barrage?', options: ['Pour garder l’eau du ruisseau', 'Pour jouer dans la boue', 'Pour cacher des noix'], answer: 0 },
    { q: 'Pourquoi Bruno n’arrive-t-il pas à bouger la bûche?', options: ['Elle est trop lourde', 'Elle est mouillée', 'Elle est cassée'], answer: 0 },
    { q: 'Que dit Papa à Bruno?', options: ['Va te coucher!', 'Un petit morceau à la fois.', 'Cours plus vite!'], answer: 1 },
    { q: 'Qui apporte de la boue?', options: ['Papa', 'Bruno', 'Lili'], answer: 2 },
    { q: 'Que se passe-t-il pendant l’orage?', options: ['Le barrage s’envole', 'Un trou apparaît dans le barrage', 'La hutte brûle'], answer: 1 },
    { q: 'Avec quoi bouchent-ils le trou?', options: ['Des branches et de la boue', 'Des feuilles et de l’eau', 'Des cailloux et du sable'], answer: 0 },
    { q: 'Qu’est-ce que Bruno a compris à la fin?', options: ['Il faut tout faire seul', 'Il faut avoir de la patience et de l’aide', 'Il faut dormir le jour'], answer: 1 },
  ],
};
