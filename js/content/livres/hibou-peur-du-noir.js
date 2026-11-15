// hibou-peur-du-noir — storybook (see docs/LIVRES.md)
const P = 'hpn';
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

// ---- characters: Lulu (baby owl, red scarf), Mamie Chouette (grey, purple shawl, glasses) ----
const OWL = { baby: { c: '#c28a5a', d: '#9c6a42', b: '#f6e0bd' }, mamie: { c: '#8f8ca8', d: '#6b6888', b: '#ece6f4' } };
const BEAK = '#f4a03a';
const hibou = (x, y, s, who = 'baby', face = 'happy', wings = 'down', flip = false) => {
  const o = OWL[who], m = who === 'mamie';
  const pup = (cx) => face === 'scared' ? circ(cx, -80, 2.6, O, 0)
    : face === 'wow' ? circ(cx, -83, 6.5, O, 0) + circ(cx - 2, -85.5, 2, '#fff', 0) + circ(cx + 2.5, -80, 1, '#fff', 0)
    : circ(cx, -79, 5, O, 0) + circ(cx - 1.6, -81, 1.7, '#fff', 0);
  const closed = face === 'sleep' || face === 'love';
  const arc = (cx) => path(face === 'love' ? `M${cx - 6} -78 Q${cx} -87 ${cx + 6} -78` : `M${cx - 6} -80 Q${cx} -73 ${cx + 6} -80`, 'none', 3);
  const eyes = closed ? arc(-11) + arc(11) : circ(-11, -80, 11, '#fff', 2.5) + circ(11, -80, 11, '#fff', 2.5) + pup(-11) + pup(11);
  const brows = face === 'scared' ? path('M-19 -95 L-6 -99', 'none', 2.5) + path('M19 -95 L6 -99', 'none', 2.5) : '';
  const wingD = ell(31, -40, 9, 24, o.d, 3, 'transform="rotate(-10 31 -40)"');
  const wingW = path('M22 -56 Q58 -96 86 -66 Q70 -64 72 -50 Q58 -54 54 -38 Q40 -42 24 -34Z', o.d);
  const wingU = path('M22 -52 Q44 -100 62 -96 Q58 -80 58 -70 Q48 -70 42 -48Z', o.d);
  const mir = (p) => G(0, 0, 1, p, true);
  const behind = wings === 'wide' ? mir(wingW) + wingW : wings === 'wave' ? mir(wingD) + wingU : wings === 'cover' ? '' : mir(wingD) + wingD;
  const front = wings === 'cover' ? ell(-13, -60, 9, 20, o.d, 3, 'transform="rotate(25 -13 -60)"') + ell(13, -60, 9, 20, o.d, 3, 'transform="rotate(-25 13 -60)"') : '';
  return G(x, y, s,
    behind + ell(-9, -3, 9, 4.5, BEAK, 2.5) + ell(9, -3, 9, 4.5, BEAK, 2.5) +
    ell(0, -42, 30, 37, o.c) + ell(0, -36, 19, 27, o.b, 0) + path('M-8 -44 q4 4 8 0 q4 4 8 0 M-12 -32 q4 4 8 0 q4 4 8 0 M-6 -20 q3 3 6 0 q3 3 6 0', 'none', 2, `stroke="${o.d}"`) +
    (m ? path('M-31 -58 Q0 -44 31 -58 L35 -18 Q0 -6 -35 -18Z', '#a56bc9') + path('M-35 -18 l3 6 M-22 -12 l2 6 M-8 -9 l1 6 M6 -9 l-1 6 M20 -12 l-2 6 M33 -18 l-3 6', 'none', 2.5) + circ(-12, -34, 2.5, '#e9d6f5', 0) + circ(10, -28, 2.5, '#e9d6f5', 0) : '') +
    path('M-22 -98 L-27 -118 L-8 -104Z', o.d) + path('M22 -98 L27 -118 L8 -104Z', o.d) +
    circ(0, -80, 27, o.c) + eyes + brows + path('M-5.5 -72 L0 -62 L5.5 -72Z', BEAK, 2.5) +
    (face === 'happy' || face === 'love' || face === 'wow' ? circ(-20, -68, 4, '#ff9aa8', 0) + circ(20, -68, 4, '#ff9aa8', 0) : '') +
    (m ? circ(-11, -80, 13.5, 'none', 2.5) + circ(11, -80, 13.5, 'none', 2.5) + line(-2, -80, 2, -80, O, 2.5) + circ(-8, -110, 7, '#fff', 2) + circ(0, -113, 8, '#fff', 2) + circ(9, -110, 7, '#fff', 2) + circ(0, -110, 7, '#fff', 0) : path('M-17 -56 Q0 -47 17 -56 L16 -48 Q0 -40 -17 -48Z', '#e8504f', 2.5) + path('M8 -48 l7 20 l-10 2 l-2 -18Z', '#e8504f', 2.5)) +
    front, flip);
};
const raton = (x, y, s, wave = false, flip = false) => G(x, y, s,
  path('M20 -18 Q58 -28 52 -52 Q46 -66 62 -78 Q76 -62 72 -44 Q68 -14 26 -4Z', '#9a9aa8') + path('M50 -30 l12 -6 M54 -48 l12 -4 M60 -64 l10 -2', 'none', 5, 'stroke="#4a4a5a"') +
  rect(-14, -14, 10, 14, '#6e6e80', 3) + rect(4, -14, 10, 14, '#6e6e80', 3) + ell(0, -34, 20, 22, '#9a9aa8') + ell(0, -28, 11, 15, '#e6e6ee', 0) +
  (wave ? ell(-24, -46, 5.5, 12, '#6e6e80', 3, 'transform="rotate(-30 -24 -46)"') : ell(-23, -32, 5.5, 12, '#6e6e80', 3, 'transform="rotate(10 -23 -32)"')) + ell(23, -32, 5.5, 12, '#6e6e80', 3, 'transform="rotate(-10 23 -32)"') +
  circ(-15, -78, 7, '#9a9aa8') + circ(15, -78, 7, '#9a9aa8') + circ(-15, -78, 3, '#6e6e80', 0) + circ(15, -78, 3, '#6e6e80', 0) +
  ell(0, -62, 19, 17, '#b4b4c2') + path('M-19 -66 Q0 -76 19 -66 L17 -56 Q0 -50 -17 -56Z', '#3f4256', 2.5) + ell(0, -50, 9, 7, '#e6e6ee', 2.5) +
  circ(-8, -63, 4.5, '#fff', 0) + circ(8, -63, 4.5, '#fff', 0) + circ(-8, -63, 2.2, O, 0) + circ(8, -63, 2.2, O, 0) + ell(0, -54, 3.2, 2.4, O, 0) + path('M-5 -48 Q0 -43 5 -48', 'none', 2.2), flip);
const grenouille = (x, y, s, sing = false) => G(x, y, s,
  ell(-20, -4, 13, 6, '#5fbf5a') + ell(20, -4, 13, 6, '#5fbf5a') + ell(0, -22, 28, 21, '#6fcf63') + ell(0, -16, 17, 12, '#d9f2b0', 0) +
  ell(-22, -10, 6, 10, '#5fbf5a', 3, 'transform="rotate(20 -22 -10)"') + ell(22, -10, 6, 10, '#5fbf5a', 3, 'transform="rotate(-20 22 -10)"') +
  circ(-14, -40, 10, '#6fcf63') + circ(14, -40, 10, '#6fcf63') + circ(-14, -41, 6.5, '#fff', 2) + circ(14, -41, 6.5, '#fff', 2) + circ(-14, -41, 3, O, 0) + circ(14, -41, 3, O, 0) +
  (sing ? ell(0, -24, 13, 10, '#8a2f45', 2.5) + ell(0, -20, 8, 4, '#ff8a8a', 0) + path('M34 -44 q8 -4 8 -12 M40 -36 q10 -2 12 -12', 'none', 2.5, 'stroke="#fff"') : path('M-14 -26 Q0 -17 14 -26', 'none', 2.8)));
const chauve = (x, y, s, rot = 0) => G(x, y, s,
  path('M-8 -6 Q-30 -26 -56 -10 Q-46 -4 -42 6 Q-34 -2 -28 8 Q-20 0 -8 10Z', '#6a5a92') + path('M8 -6 Q30 -26 56 -10 Q46 -4 42 6 Q34 -2 28 8 Q20 0 8 10Z', '#6a5a92') +
  ell(0, 0, 11, 15, '#4f4378') + path('M-9 -12 L-12 -26 L-1 -16Z M9 -12 L12 -26 L1 -16Z', '#4f4378') + circ(-4, -8, 2.2, '#fff', 0) + circ(4, -8, 2.2, '#fff', 0) + circ(-4, -8, 1, O, 0) + circ(4, -8, 1, O, 0) + path('M-4 -2 Q0 2 4 -2', 'none', 2), false, rot);

// ---- shared scenery ----
const stars = (n, seed = 1, ymax = 170) => Array.from({ length: n }, (_, i) => star(Math.round(rnd(i + seed) * 390 + 5), Math.round(rnd(i + 40 + seed) * ymax + 8), 3 + Math.round(rnd(i + 80 + seed) * 4))).join('');
const night = (n = 14, seed = 1) => sky('#1b2455', '#4b4f9a') + stars(n, seed);
const nightGround = (y = 220, c1 = '#2b4a6b', c2 = '#244a52') => path(`M-5 ${y - 24} Q90 ${y - 56} 180 ${y - 30} Q270 ${y - 8} 340 ${y - 40} Q380 ${y - 50} 405 ${y - 34} L405 305 L-5 305Z`, c1) + rect(-5, y, 410, 100, c2, 3);
const oak = (x, y, s, o = {}) => G(x, y, s,
  path('M-36 0 Q-30 -60 -22 -112 L22 -112 Q30 -60 36 0Z', o.t || '#7a5236') + path('M-14 -100 L-14 -20 M10 -104 L12 -30', 'none', 2, 'stroke="#5e3f29"') +
  (o.hole === false ? '' : path('M-13 -26 L-13 -56 Q0 -76 13 -56 L13 -26Z', '#2a1d25') + (o.eyes ? '' : '')) +
  path('M30 -92 L124 -100 L126 -86 L30 -76Z', o.t || '#7a5236') +
  circ(0, -152, 50, o.c || '#69b85f') + circ(-48, -126, 36, o.c || '#69b85f') + circ(48, -126, 36, o.c || '#69b85f') + circ(128, -108, 22, o.c || '#69b85f') +
  `<g>${circ(0, -151, 48.5, o.c || '#69b85f', 0)}${circ(-48, -126, 34.5, o.c || '#69b85f', 0)}${circ(48, -126, 34.5, o.c || '#69b85f', 0)}${rect(-60, -140, 120, 30, o.c || '#69b85f', 0)}</g>`);
const eyesPair = (x, y) => ell(x - 6, y, 3.5, 4.5, '#ffe45c', 0) + ell(x + 6, y, 3.5, 4.5, '#ffe45c', 0);
const bigMoon = (x, y, r) => circ(x, y, r * 1.35, '#fff6c8', 0).replace('/>', ' opacity=".2"/>') + circ(x, y, r, '#fff1a8') + circ(x - r * .3, y - r * .2, r * .2, '#f1dd8a', 0) + circ(x + r * .35, y + r * .25, r * .27, '#f1dd8a', 0) + circ(x + r * .1, y - r * .5, r * .12, '#f1dd8a', 0);
const fly = (x, y) => ell(x, y, 9, 9, '#ffee70', 0, 'opacity=".3"') + ell(x, y, 3.2, 2.6, '#ffe14d', 0);
const log = (x, y, s = 1) => G(x, y, s, rect(-46, -18, 92, 18, '#8a5a3b', 3, 8) + ell(-46, -9, 5, 9, '#c9966a', 2.5) + path('M-20 -14 q10 -3 20 0 M8 -8 q10 3 20 0', 'none', 2, 'stroke="#6b4329"'));
const darkPines = () => pine(30, 232, 1.3, '#1f5a55') + pine(75, 245, 1, '#276b60') + pine(360, 236, 1.2, '#1f5a55') + pine(325, 250, .9, '#276b60');
const butterfly = (x, y, c) => ell(x - 5, y, 5, 4, c, 2) + ell(x + 5, y, 5, 4, c, 2) + line(x, y - 3, x, y + 4, O, 2.5);

export const book = {
  id: 'hibou-peur-du-noir',
  title: 'Le petit hibou qui avait peur du noir',
  emoji: '🦉',
  level: 1,
  minutes: 7,
  cover: svg(night(22, 3) + bigMoon(290, 78, 36) + nightGround(235) + pine(350, 240, 1.3, '#1f5a55') + pine(385, 250, 1, '#276b60') + oak(95, 258, 1.2, { c: '#2f7a62', t: '#6a4630' }) + hibou(190, 143, 1, 'baby', 'happy', 'wave') + hibou(246, 143, 1.15, 'mamie', 'happy') + fly(150, 200) + fly(310, 205) + fly(30, 245) + fly(250, 235)),
  pages: [
    { text: 'Lulu est un petit hibou. Le jour, il joue dans le grand chêne.',
      svg: svg(sky('#9fdcf7', '#eafaff') + sun(335, 52) + cloud(255, 70, .8) + cloud(40, 30, .7) + lawn(220) + oak(120, 258, 1.2) + hibou(192, 143, 1, 'baby', 'happy', 'wave') + butterfly(300, 150, '#ff9ec0') + butterfly(340, 190, '#ffd84d') + bush(350, 250, 1.2) + flower(260, 285) + flower(300, 280, '#fff')) },
    { text: 'Mais le soir, le ciel devient tout noir. Lulu a peur! Il se cache sous ses ailes.',
      svg: svg(sky('#2c2760', '#f08a5d') + star(60, 30, 4) + star(150, 50, 3) + star(300, 24, 4) + circ(330, 150, 20, '#ffd27a', 0) + nightGround(225, '#2f3b63', '#1f3a4a') + oak(300, 262, 1.1, { c: '#1f5a55', t: '#4a3a3f' }) + bush(60, 255, 1.3, '#1f4a46') + eyesPair(52, 232) + eyesPair(88, 240) + hibou(150, 268, 1.15, 'baby', 'scared', 'cover')) },
    { text: 'Mamie Chouette arrive. Elle dit doucement: « Viens voir la nuit avec moi. »',
      svg: svg(sky('#2c2760', '#c9719b') + star(60, 30, 4) + star(150, 50, 3) + star(250, 24, 4) + nightGround(225, '#2f3b63', '#1f3a4a') + oak(70, 262, 1.1, { c: '#1f5a55', t: '#4a3a3f' }) + hibou(190, 262, 1.05, 'baby', 'scared', 'down') + hibou(300, 262, 1.3, 'mamie', 'happy', 'wide')) },
    { text: 'Dehors, Lulu regarde en haut. Oh! Des milliers d’étoiles brillent dans le ciel!',
      svg: svg(night(36, 7) + star(200, 40, 9, '#fff6b0') + star(80, 100, 8, '#fff6b0') + star(330, 90, 8, '#fff6b0') + nightGround(235) + hibou(150, 268, 1.15, 'baby', 'wow', 'wave') + hibou(245, 270, 1.35, 'mamie', 'happy', 'down')) },
    { text: 'La lune est ronde comme un gros bonbon. Elle éclaire toute la forêt.',
      svg: svg(night(12, 5) + bigMoon(200, 98, 58) + nightGround(235, '#2f5a7a', '#2a5a5f') + darkPines() + log(190, 268, 1.3) + hibou(160, 252, .95, 'baby', 'wow', 'down') + hibou(236, 252, 1.1, 'mamie', 'happy', 'down')) },
    { text: 'Des lucioles dansent autour de Lulu. Elles font de petites lumières jaunes.',
      svg: svg(night(8, 9) + nightGround(205, '#25506a', '#245047') + darkPines() + bush(70, 262, 1.3, '#1f4a46') + bush(335, 268, 1.3, '#1f4a46') + hibou(200, 272, 1.25, 'baby', 'wow', 'wave') + [[120, 150], [165, 118], [250, 140], [300, 175], [110, 215], [290, 235], [215, 100], [330, 120], [65, 140], [180, 195]].map(([a, b]) => fly(a, b)).join('')) },
    { text: 'Un raton laveur arrive sur le tronc. « Bonsoir, Lulu! » dit-il.',
      svg: svg(night(14, 11) + bigMoon(90, 70, 28) + nightGround(225, '#2f5a7a', '#2a5a5f') + darkPines() + log(250, 268, 1.7) + raton(275, 250, 1.15, true) + hibou(120, 270, 1.15, 'baby', 'happy', 'wave') + hibou(48, 268, 1.1, 'mamie', 'happy', 'down')) },
    { text: 'Au bord de l’étang, une grenouille chante. Croa, croa!',
      svg: svg(night(12, 13) + bigMoon(310, 62, 26) + nightGround(205, '#2f5a7a', '#2a5a5f') + ell(275, 250, 120, 42, '#3a6fa0') + ell(275, 244, 100, 28, '#4a85b8', 0) + ell(300, 240, 22, 5, '#fff6b0', 0, 'opacity=".5"') + ell(250, 262, 24, 6, '#5fbf5a', 2.5) + grenouille(250, 262, 1.15, true) + path('M205 230 q6 -4 12 0 M320 262 q6 -4 12 0', 'none', 2.5, 'stroke="#fff" opacity=".6"') + hibou(75, 262, 1.2, 'baby', 'wow', 'down') + hibou(140, 265, 1.1, 'mamie', 'happy', 'down') + bush(30, 262, 1, '#1f4a46')) },
    { text: 'Une chauve-souris vole tout près. Elle fait un grand cercle devant la lune.',
      svg: svg(night(10, 17) + bigMoon(250, 95, 46) + chauve(240, 85, 1.4, -12) + path('M150 160 Q190 100 235 88', 'none', 2.5, 'stroke="#fff" stroke-dasharray="6 7" opacity=".5"') + nightGround(235) + darkPines() + hibou(120, 270, 1.2, 'baby', 'wow', 'wave') + hibou(200, 272, 1.3, 'mamie', 'happy', 'down')) },
    { text: 'Lulu n’a plus peur. Il ouvre grand ses ailes. La nuit est belle!',
      svg: svg(night(26, 21) + bigMoon(320, 58, 26) + nightGround(240, '#2f5a7a', '#2a5a5f') + darkPines() + hibou(200, 200, 1.5, 'baby', 'love', 'wide') + raton(50, 272, .75, true) + chauve(310, 150, .9, 8) + fly(120, 130) + fly(290, 215) + fly(105, 205)) },
    { text: 'De retour dans l’arbre, Lulu serre Mamie dans ses ailes. « J’aime la nuit! » dit-il.',
      svg: svg(rect(0, 0, 400, 300, '#a8764f', 0) + [0, 1, 2, 3, 4].map((i) => path(`M${i * 90 - 20} 0 Q${i * 90 + 10} 150 ${i * 90 - 10} 300`, 'none', 3, 'stroke="#8a5a3b" opacity=".7"')).join('') + rect(0, 255, 400, 45, '#5aa55a', 0) + path('M0 262 q40 -14 80 0 t80 0 t80 0 t80 0 t80 0', '#78c26a') + peek(135, 40, 130, 110, night(12, 23) + bigMoon(220, 80, 22)).replace('fill="#bfe8ff"', 'fill="#1b2455"') + path('M120 150 Q200 60 280 150Z', 'none', 5, 'stroke="#6a4630" opacity=".9"').replace('M120 150 Q200 60 280 150Z', 'M135 150 L135 70 Q200 10 265 70 L265 150') + hibou(150, 270, 1.3, 'baby', 'love', 'wide') + hibou(275, 272, 1.45, 'mamie', 'love', 'down')) },
    { text: 'Lulu ferme les yeux. Bonne nuit, petit hibou!',
      svg: svg(rect(0, 0, 400, 300, '#8e5f3f', 0) + [0, 1, 2, 3].map((i) => path(`M${i * 120 - 20} 0 Q${i * 120 + 10} 150 ${i * 120 - 10} 300`, 'none', 3, 'stroke="#764a30" opacity=".7"')).join('') + rect(0, 262, 400, 38, '#5aa55a', 0) + peek(280, 30, 90, 80, night(8, 31) + moon(330, 70, 18)).replace('fill="#bfe8ff"', 'fill="#1b2455"') + ell(165, 262, 100, 28, '#78c26a', 3) + hibou(160, 255, 1.25, 'baby', 'sleep', 'down') + path('M80 232 Q165 205 250 232 L252 262 Q165 280 78 262Z', '#e8504f') + path('M92 236 q70 -16 148 0', 'none', 2.5, 'stroke="#fff" opacity=".6"') + hibou(320, 268, 1.2, 'mamie', 'sleep', 'down') + ell(60, 262, 10, 4, '#fff', 0, 'opacity=".4"') + fly(40, 200) + ell(40, 224, 14, 16, '#bfe8ff', 2.5, 'opacity=".9"') + star(150, 60, 4) + star(95, 100, 3) + star(200, 120, 3)) },
  ],
  words: [
    { word: 'une étoile', emoji: '⭐', def: 'Un point qui brille dans le ciel la nuit.' },
    { word: 'la lune', emoji: '🌙', def: 'Elle éclaire le ciel quand il fait noir.' },
    { word: 'une luciole', emoji: '✨', def: 'Un petit insecte qui s’allume dans la nuit.' },
    { word: 'un raton laveur', emoji: '🦝', def: 'Un animal gris avec un masque noir sur les yeux.' },
    { word: 'une chauve-souris', emoji: '🦇', def: 'Un petit animal de nuit qui vole avec des ailes sans plumes.' },
    { word: 'un étang', emoji: '🐸', def: 'Un petit lac où vivent des grenouilles.' },
    { word: 'briller', emoji: '💫', def: 'Donner beaucoup de lumière.' },
    { word: 'le nid', emoji: '🪹', def: 'La maison douce d’un oiseau.' },
  ],
  quiz: [
    { q: 'De quoi Lulu a-t-il peur?', options: ['Du noir', 'Du soleil', 'De l’eau'], answer: 0 },
    { q: 'Qui emmène Lulu dehors, la nuit?', options: ['Un raton laveur', 'Mamie Chouette', 'Une grenouille'], answer: 1 },
    { q: 'Qu’est-ce que Lulu voit d’abord dans le ciel?', options: ['Des nuages', 'Un avion', 'Des étoiles'], answer: 2 },
    { q: 'Que font les lucioles?', options: ['Elles dorment', 'Elles dansent avec de petites lumières', 'Elles chantent'], answer: 1 },
    { q: 'Qui dit « Bonsoir, Lulu! »?', options: ['Le raton laveur', 'La chauve-souris', 'La lune'], answer: 0 },
    { q: 'Quel animal chante au bord de l’étang?', options: ['Un hibou', 'Une grenouille', 'Un castor'], answer: 1 },
    { q: 'Que veut dire « briller »?', options: ['Dormir très fort', 'Donner de la lumière', 'Avoir très peur'], answer: 1 },
    { q: 'Comment Lulu se sent-il à la fin de l’histoire?', options: ['Il a encore peur', 'Il a faim', 'Il aime la nuit'], answer: 2 },
  ],
};
