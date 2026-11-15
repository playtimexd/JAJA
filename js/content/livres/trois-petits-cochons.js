// trois-petits-cochons — storybook (see docs/LIVRES.md)
const P = 'tpc';
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

// ---- characters: the three pigs (same colours every page), maman, the wolf ----
const PIG = { 0: { c: '#b583d6' }, 1: { c: '#f2c230' }, 2: { c: '#58b866' }, 3: { c: '#4f86d6' } };
const SKIN = '#ffb6c4', SNOUT = '#ff93aa', DARKM = '#8a2f45';
const eye = (cx, cy, k) => k === 'wide' ? circ(cx, cy, 5.5, '#fff', 2) + circ(cx, cy + .5, 2.3, O, 0)
  : k === 'closed' ? path(`M${cx - 4.5} ${cy + 1} Q${cx} ${cy - 5} ${cx + 4.5} ${cy + 1}`, 'none', 2.8)
  : ell(cx, cy, 3.2, 3.9, O, 0) + circ(cx - 1, cy - 1.4, 1.1, '#fff', 0);
const cochon = (x, y, s, w = 1, face = 'happy', up = false, flip = false) => {
  const o = PIG[w], lite = s < .65;
  const k = { happy: 'dot', sad: 'dot', scared: 'wide', surprised: 'wide', cheer: 'closed' }[face];
  const brows = face === 'scared' || face === 'sad' ? path('M-15 -93 L-5 -98', 'none', 2.5) + path('M15 -93 L5 -98', 'none', 2.5) : face === 'surprised' ? path('M-14 -96 L-5 -97', 'none', 2.5) + path('M14 -96 L5 -97', 'none', 2.5) : '';
  const mouth = { happy: path('M-6 -63 Q0 -57 6 -63', 'none', 2.8), sad: path('M-6 -60 Q0 -66 6 -60', 'none', 2.8), scared: ell(0, -62, 5, 4.5, DARKM, 2), surprised: ell(0, -61, 4, 5, DARKM, 2), cheer: path('M-9 -65 Q0 -50 9 -65Z', DARKM, 2.5) }[face];
  const arms = up
    ? ell(-31, -62, 6, 12, SKIN, 3, 'transform="rotate(-35 -31 -62)"') + ell(31, -62, 6, 12, SKIN, 3, 'transform="rotate(35 31 -62)"')
    : ell(-28, -36, 6, 12, SKIN, 3, 'transform="rotate(10 -28 -36)"') + ell(28, -36, 6, 12, SKIN, 3, 'transform="rotate(-10 28 -36)"');
  const hat = w === 1 ? ell(0, -98, 25, 6, '#f0d78a') + path('M-15 -99 Q-14 -120 0 -120 Q14 -120 15 -99Z', '#f0d78a') + rect(-15, -105, 30, 5, '#d9503f', 2)
    : w === 2 ? path('M-18 -97 Q-18 -122 0 -122 Q18 -122 18 -97Z', '#8c5a3a') + rect(-19, -102, 38, 7, '#6b4329', 2, 3) + circ(0, -123, 4.5, '#e9d3a0', 2.5)
    : w === 3 ? path('M-18 -97 Q-17 -118 0 -118 Q17 -118 18 -97Z', '#d9503f') + path('M-18 -98 L-27 -96 Q-27 -92 -18 -93Z', '#b23a2c', 2.5)
    : circ(-15, -101, 6, '#ff9ec0', 2.5) + circ(-15, -101, 2, '#ffe066', 0);
  const dress = w === 0 ? rect(-9, -35, 18, 21, '#fff', 2.5, 4) : '';
  return G(x, y, s,
    (lite ? '' : path('M23 -26 q12 -4 9 -14 q-4 -7 -9 -1', 'none', 3)) +
    rect(-14, -16, 10, 16, SKIN, 3) + rect(4, -16, 10, 16, SKIN, 3) + ell(-10, -2, 9, 4.5, '#6b4a3a', 2.5) + ell(10, -2, 9, 4.5, '#6b4a3a', 2.5) +
    ell(0, -40, 25, 28, SKIN) +
    path('M-24 -38 Q-25 -14 -12 -14 L12 -14 Q25 -14 24 -38Z', o.c, 3) + rect(-14, -54, 6, 18, o.c, 2.5) + rect(8, -54, 6, 18, o.c, 2.5) + dress + (w && !lite ? circ(-11, -30, 2.2, '#fff', 0) + circ(11, -30, 2.2, '#fff', 0) : '') +
    arms +
    path('M-20 -92 L-30 -110 L-10 -99Z', SKIN, 3) + path('M20 -92 L30 -110 L10 -99Z', SKIN, 3) + (lite ? '' : path('M-20 -95 L-26 -105 L-14 -99Z', SNOUT, 0) + path('M20 -95 L26 -105 L14 -99Z', SNOUT, 0)) +
    ell(0, -80, 23, 21, SKIN) + (lite ? '' : circ(-15, -72, 4.5, '#ff9aa8', 0) + circ(15, -72, 4.5, '#ff9aa8', 0)) +
    ell(0, -76, 10, 7, SNOUT) + (lite ? '' : ell(-3.6, -76, 1.5, 2.1, O, 0) + ell(3.6, -76, 1.5, 2.1, O, 0)) +
    eye(-9, -87, k) + eye(9, -87, k) + (lite ? '' : brows) + mouth + hat +
    (face === 'scared' ? path('M26 -100 q-5 8 0 11 q5 -3 0 -11Z', '#9fdcff', 2) : ''),
    flip);
};
const FUR = '#8b90a8', FURD = '#656a86', BELLY = '#d6d9e6';
const loup = (x, y, s, face = 'grin', flip = false) => {
  const lt = s < .6;
  const e = (cx, k) => k === 'wide' ? circ(cx, -101, 6.5, '#fff', 2) + circ(cx, -100, 2.6, O, 0)
    : k === 'x' ? path(`M${cx - 5} -104 L${cx + 5} -97 M${cx + 5} -104 L${cx - 5} -97`, 'none', 3)
    : k === 'sq' ? path(`M${cx - 6} -100 Q${cx} -106 ${cx + 6} -100`, 'none', 3)
    : ell(cx, -101, 6.5, 5.5, '#ffe27a', 2.5) + ell(cx, -100, 2, 4, O, 0) + path(`M${cx - 7} -106 L${cx + 7} -104`, 'none', 0);
  const ek = { grin: 'dot', puff: 'sq', mad: 'dot', ouch: 'x', scared: 'wide' }[face];
  const brow = face === 'grin' || face === 'mad' ? path('M-20 -111 L-5 -105', 'none', 3.5) + path('M20 -111 L5 -105', 'none', 3.5) : face === 'scared' ? path('M-19 -110 L-6 -113', 'none', 3) + path('M19 -110 L6 -113', 'none', 3) : '';
  const mouth = { grin: path('M-12 -80 Q0 -70 12 -80', '#fff', 2.5) + path('M-7 -77 l3 5 l3 -4 M1 -75 l3 4 l3 -5', 'none', 2), puff: ell(0, -80, 4.5, 4, '#6e2535', 2),
    mad: path('M-12 -78 Q0 -86 12 -78 Q0 -68 -12 -78Z', '#6e2535', 2.5) + path('M-8 -78 l3 4 l3 -5 M2 -78 l3 5 l3 -4', '#fff', 1.5), ouch: ell(0, -78, 9, 10, '#6e2535', 2.5) + ell(0, -73, 5, 4, '#ff8a8a', 0),
    scared: ell(0, -78, 7, 8, '#6e2535', 2.5) + ell(0, -74, 4, 3, '#ff8a8a', 0) }[face];
  const cheeks = face === 'puff' ? ell(-19, -84, 12, 11, FUR, 3) + ell(19, -84, 12, 11, FUR, 3) + circ(-19, -84, 3, '#ff9aa8', 0) + circ(19, -84, 3, '#ff9aa8', 0) : face === 'ouch' ? circ(-20, -86, 5, '#ff7d7d', 0) + circ(20, -86, 5, '#ff7d7d', 0) : '';
  return G(x, y, s,
    (lt ? '' : path('M24 -30 Q58 -44 52 -6 Q44 -24 26 -20Z', FUR, 3)) +
    rect(-19, -20, 14, 20, FUR, 3) + rect(5, -20, 14, 20, FUR, 3) + ell(-12, -2, 11, 5, FURD, 3) + ell(12, -2, 11, 5, FURD, 3) +
    ell(0, -52, 30, 37, FUR) + ell(0, -46, 17, 27, BELLY, 0) +
    ell(-33, -50, 7, 16, FUR, 3, 'transform="rotate(12 -33 -50)"') + ell(33, -50, 7, 16, FUR, 3, 'transform="rotate(-12 33 -50)"') +
    path('M-25 -104 L-32 -136 L-8 -114Z', FURD, 3) + path('M25 -104 L32 -136 L8 -114Z', FURD, 3) + (lt ? '' : path('M-24 -110 L-28 -128 L-14 -114Z', '#f0a0b0', 0) + path('M24 -110 L28 -128 L14 -114Z', '#f0a0b0', 0)) +
    ell(0, -92, 29, 25, FUR) + (lt ? '' : path('M-29 -92 L-40 -84 L-27 -79Z', FUR, 3) + path('M29 -92 L40 -84 L27 -79Z', FUR, 3)) +
    ell(0, -84, 15, 11, BELLY, 0) + cheeks + ell(0, -91, 5.5, 4, '#2c2f3f', 0) +
    e(-11, ek) + e(11, ek) + brow + mouth,
    flip);
};

// ---- houses: base centred on (x, y) ----
const strawHouse = (x, y, s = 1, o = {}) => G(x, y, s,
  rect(-45, -60, 90, 60, '#f2d27a') + Array.from({ length: 9 }, (_, i) => line(-45 + (i + 1) * 9, -58, -45 + (i + 1) * 9, -2, '#d9b04f', 2)).join('') +
  rect(-24, -38, 22, 38, o.pig ? '#4a3a33' : '#9b6b43') + (o.pig ? cochon(-13, -1, .3, o.pig, o.face || 'scared') + path('M-24 -38 L-24 0', 'none', 3) : circ(-6, -19, 1.8, '#f7e08a', 1.5)) +
  rect(10, -48, 22, 20, '#bfe8ff') + line(21, -48, 21, -28, O, 2) + line(10, -38, 32, -38, O, 2) +
  path('M-60 -54 L0 -114 L60 -54Z', '#e4b84d') + Array.from({ length: 6 }, (_, i) => line(-44 + i * 11, -56 - i * 2 + (i > 2 ? 2 * (i - 2) * 2 - 0 : 0), -28 + i * 11 - (i > 2 ? 0 : 0), -78 - 0, '#c9972f', 2)).join('') + bits(0, -56, 8, 50, '#f2d27a', 12, 3, 4));
const stickHouse = (x, y, s = 1, o = {}) => o.fall
  ? G(x, y, s, rect(-45, -22, 90, 22, '#a8754a', 0) + path('M-45 0 L-45 -30 L-30 -46 L-24 0Z', '#a8754a', 3) + G(40, -30, 1, path('M-50 0 L0 -50 L50 0Z', '#8a5a3b', 3) + line(-30, -6, 0, -36, '#6b4329', 3), false, 32) + G(-30, -16, 1, rect(-5, -40, 10, 50, '#b98558', 2.5), false, -58) + G(5, -8, 1, rect(-5, -30, 10, 40, '#a8754a', 2.5), false, 70) + G(20, -6, 1, rect(-5, -30, 10, 36, '#b98558', 2.5), false, -80))
  : G(x, y, s,
    Array.from({ length: 9 }, (_, i) => rect(-45 + i * 10, -62 - (i % 3) * 2, 10, 62 + (i % 3) * 2, i % 2 ? '#a8754a' : '#b98558', 2.5)).join('') +
    rect(-24, -38, 22, 38, o.pig ? '#4a3a33' : '#6b4329') + (o.pig ? cochon(-13, -1, .3, o.pig, o.face || 'scared') : circ(-6, -19, 1.8, '#f7e08a', 1.5)) +
    rect(12, -48, 22, 20, '#bfe8ff') + line(23, -48, 23, -28, O, 2) + line(12, -38, 34, -38, O, 2) +
    path('M-58 -58 L0 -112 L58 -58Z', '#8a5a3b') + Array.from({ length: 7 }, (_, i) => line(-48 + i * 14, -60, -36 + i * 14, -72 - (i % 2) * 2, '#6b4329', 3)).join(''));
const brickHouse = (x, y, s = 1, o = {}) => G(x, y, s,
  rect(26, -104, 16, 40, '#b4503c') + rect(23, -108, 22, 8, '#8c3a2b') +
  (o.smoke ? ell(34, -122, 8, 6, '#e9eaf2', 0) + ell(42, -136, 10, 7, '#e9eaf2', 0) : '') +
  rect(-50, -62, 100, 62, '#d8674f') + [-48, -34, -20, -6].map((yy) => line(-50, yy, 50, yy, '#a8402f', 2)).join('') +
  [-48, -20].map((yy) => Array.from({ length: 5 }, (_, i) => line(-40 + i * 20, yy, -40 + i * 20, yy + 14, '#a8402f', 2)).join('')).join('') + [-34, -6].map((yy) => Array.from({ length: 5 }, (_, i) => line(-30 + i * 20, yy, -30 + i * 20, yy + 14, '#a8402f', 2)).join('')).join('') +
  rect(-13, -40, 26, 40, o.open ? '#4a3a33' : '#3d79c2') + (o.open ? cochon(0, -1, .3, 3, o.face || 'happy') : circ(6, -20, 2, '#ffe066', 1.5)) +
  (o.win ? peek(-44, -52, 22, 20, cochon(-33, -30, .33, 1, 'happy') ) + peek(22, -52, 22, 20, cochon(33, -30, .33, 2, 'happy')) : rect(-44, -52, 22, 20, '#bfe8ff') + rect(22, -52, 22, 20, '#bfe8ff')) +
  path('M-62 -58 L0 -112 L62 -58Z', '#5a6b8c') + path('M-44 -58 L0 -98 L44 -58', 'none', 2) + (o.inner || ''));

// ---- scenes ----
const dusk = () => sky('#f8b184', '#ffe6bd') + circ(80, 90, 26, '#ffd27a', 0) + cloud(250, 50, .9, '#fff0e6');
const road = (d) => path(d, '#e2c59a', 3);
const field = (y = 205) => lawn(y) + flower(40, 278) + flower(360, 270, '#ffd84d') + flower(210, 285, '#fff');
const wolfWind = (x, y) => wind(x, y, 3, 70);

export const book = {
  id: 'trois-petits-cochons',
  title: 'Les trois petits cochons',
  emoji: '🐷',
  level: 1,
  minutes: 8,
  cover: svg(day(60) + lawn(215) + tree(30, 225, 1.1) + brickHouse(295, 235, 1.3, { smoke: true }) + cochon(75, 268, 1.05, 1, 'happy') + cochon(160, 272, 1.05, 2, 'happy') + cochon(235, 266, 1, 3, 'happy', true) + flower(30, 290) + flower(120, 292, '#ffd84d')),
  pages: [
    { text: 'Il était une fois trois petits cochons. Ils vivaient avec leur maman.',
      svg: svg(day() + lawn(205) + rect(30, 120, 120, 90, '#f6e7c8') + path('M20 125 L90 62 L160 125Z', '#c9694a') + rect(78, 160, 28, 50, '#8a5a3b') + rect(40, 140, 24, 24, '#bfe8ff') + tree(370, 215, 1) + cochon(110, 262, 1.3, 0, 'happy') + cochon(195, 268, .85, 1, 'happy') + cochon(255, 272, .85, 2, 'happy') + cochon(315, 268, .85, 3, 'happy') + flower(60, 280)) },
    { text: 'Un jour, les cochons ont grandi. Ils partent construire chacun leur maison.',
      svg: svg(day(340) + lawn(200) + rect(10, 120, 60, 70, '#f6e7c8') + path('M2 125 L40 78 L78 125Z', '#c9694a') + rect(30, 152, 16, 38, '#8a5a3b') + cochon(60, 205, .55, 0, 'happy', true) + road('M-10 300 Q120 240 200 250 Q320 262 410 230 L410 262 Q320 292 190 285 Q100 280 40 305Z') + tree(370, 215, .9) + cochon(150, 270, .78, 1, 'happy') + cochon(235, 276, .8, 2, 'happy') + cochon(320, 270, .78, 3, 'happy') + line(165, 205, 190, 190, '#8a5a3b', 3) + circ(194, 190, 8, '#e0c07a', 2.5)) },
    { text: 'Le premier cochon est pressé. Il construit sa maison avec de la paille.',
      svg: svg(day() + field() + strawHouse(285, 240, 1.4) + ell(55, 255, 22, 17, '#f2d27a') + line(40, 250, 70, 250, '#d9b04f', 2) + ell(100, 262, 20, 14, '#f2d27a') + line(88, 258, 112, 258, '#d9b04f', 2) + cochon(170, 270, 1.1, 1, 'cheer', true)) },
    { text: 'Le deuxième cochon construit la sienne avec des bâtons. Toc, toc, toc!',
      svg: svg(day(60) + field() + stickHouse(285, 240, 1.4) + bits(60, 285, 12, 42, '#a8754a', 38, 5, 9) + cochon(160, 270, 1.1, 2, 'cheer', true) + line(196, 195, 208, 160, '#8a5a3b', 5) + rect(196, 150, 22, 12, '#7d8090', 3, 2) + path('M222 160 l8 -4 M224 170 l9 0 M220 152 l6 -8', 'none', 3, 'stroke="#f7b733"').replace(`stroke="${O}"`, '')) },
    { text: 'Le troisième cochon prend son temps. Il fait sa maison avec des briques.',
      svg: svg(day() + field() + brickHouse(285, 240, 1.4, { smoke: true }) + [0, 1, 2].map((i) => rect(40 + (i % 2) * 6, 262 - i * 16, 50, 16, '#d8674f', 3)).join('') + rect(98, 268, 38, 14, '#d8674f', 3) + cochon(185, 272, 1.1, 3, 'happy', true) + rect(223, 168, 20, 10, '#d8674f', 2.5) + path('M196 205 l8 -6', 'none', 2.5)) },
    { text: 'Un gros loup arrive. « Petit cochon, petit cochon, laisse-moi entrer! » dit-il. « Non, non, par le poil de mon petit menton! »',
      svg: svg(day(60) + field() + strawHouse(285, 245, 1.7, { pig: 1, face: 'scared' }) + loup(120, 270, 1.1, 'grin') + ell(200, 120, 0, 0, 'none', 0)) },
    { text: 'Alors le loup souffle, souffle, souffle. Et la maison de paille s’envole!',
      svg: svg(day(60) + field() + loup(70, 270, 1.05, 'puff') + wind(125, 190, 3, 70) + bits(230, 180, 18, 70, '#e7c35d', 18, 4, 3) + bits(300, 130, 8, 40, '#f2d27a', 16, 4, 20) + bits(260, 268, 8, 30, '#e7c35d', 14, 3, 30) + cochon(340, 272, .9, 1, 'scared', true)) },
    { text: 'Le premier cochon se sauve chez son frère. Le loup souffle encore, et la maison de bâtons tombe!',
      svg: svg(day(340) + field() + loup(60, 270, 1, 'puff') + wind(108, 190, 3, 60) + stickHouse(215, 245, 1.2, { fall: true }) + bits(210, 190, 12, 55, '#a8754a', 30, 5, 11) + cochon(310, 272, .75, 1, 'scared', true) + cochon(365, 272, .75, 2, 'scared', true)) },
    { text: 'Les deux cochons courent chez leur frère. Vite, il leur ouvre la porte!',
      svg: svg(day(60) + lawn(205) + loup(34, 262, .5, 'grin') + brickHouse(300, 245, 1.6, { open: true, face: 'happy' }) + cochon(120, 274, .85, 1, 'scared', true) + cochon(205, 274, .85, 2, 'scared', true) + path('M138 232 l-18 0 M222 232 l-18 0', 'none', 3, 'stroke="#fff"').replace(`stroke="${O}"`, '')) },
    { text: 'Le loup souffle, souffle, souffle... Mais la maison de briques ne bouge pas. Il est fâché!',
      svg: svg(day(340) + field() + brickHouse(285, 245, 1.5, { win: true, smoke: true }) + loup(95, 272, 1.1, 'puff') + wind(150, 195, 3, 55)) },
    { text: 'Le loup grimpe sur le toit. Il veut descendre par la cheminée.',
      svg: svg(dusk() + lawn(215, '#c9c27a', '#aab85f') + brickHouse(200, 255, 1.4, { inner: loup(8, -98, .4, 'grin') }) + line(80, 258, 112, 160, '#a8754a', 5) + line(100, 258, 132, 160, '#a8754a', 5) + [0, 1, 2, 3].map((i) => line(86 + i * 7, 244 - i * 25, 107 + i * 7, 244 - i * 25, '#6b4329', 3)).join('')) },
    { text: 'Mais les cochons ont mis une marmite d’eau chaude dans la cheminée. Plouf! Le loup tombe dedans.',
      svg: svg(rect(0, 0, 400, 300, '#e6c89b', 0) + Array.from({ length: 8 }, (_, i) => line(0, 30 + i * 38, 400, 30 + i * 38, '#d3b07f', 2)).join('') + rect(0, 262, 400, 40, '#b98558', 0) + line(0, 262, 400, 262, O, 3) + rect(40, 70, 215, 200, '#9aa0b4') + [0, 1, 2, 3, 4].map((i) => line(40, 100 + i * 34, 255, 100 + i * 34, '#7d8499', 2)).join('') + path('M70 270 L70 130 Q147 100 225 130 L225 270Z', '#2f2f3f') + path('M85 266 Q100 220 112 250 Q128 200 147 240 Q168 205 180 245 Q196 225 212 266Z', '#ff9a2e', 2.5) + path('M110 262 Q125 235 135 258 Q150 225 165 260Z', '#ffd84d', 0) + loup(147, 232, .72, 'ouch') + path('M105 175 Q147 160 190 175 L196 236 Q147 268 98 236Z', '#4a4f66', 3.5) + ell(147, 175, 43, 9, '#8ad4f5', 3) + [[100, 150], [196, 145], [118, 128], [180, 125], [92, 190]].map(([a, b]) => circ(a, b, 4, '#8ad4f5', 2)).join('') + path('M105 118 q-6 -12 4 -20 M185 118 q6 -12 -4 -20', 'none', 3, 'stroke="#fff" opacity=".8"').replace(`stroke="${O}"`, '') + cochon(290, 268, .82, 1, 'cheer', true) + cochon(335, 272, .8, 2, 'cheer', true) + cochon(378, 268, .75, 3, 'cheer', true)) },
    { text: 'Ouille! Le loup s’enfuit dans la forêt. Il ne revient jamais!',
      svg: svg(day(340) + lawn(210) + pine(30, 235, 1.2) + pine(75, 250, 1) + brickHouse(310, 240, 1.3, { smoke: true }) + loup(160, 270, 1.05, 'scared', true) + path('M205 255 q-18 4 -22 -2 M205 232 q-20 0 -26 -6 M208 275 q-16 6 -26 0', 'none', 3, 'stroke="#fff"').replace(`stroke="${O}"`, '') + ell(235, 280, 12, 5, '#e2c59a', 0) + cochon(255, 275, .6, 1, 'cheer', true) + cochon(290, 278, .6, 2, 'cheer', true) + cochon(345, 278, .6, 3, 'cheer', true)) },
    { text: 'Maintenant, les trois frères vivent ensemble dans la maison de briques. Ils sont heureux!',
      svg: svg(rect(0, 0, 400, 300, '#f9e8c8', 0) + rect(0, 235, 400, 65, '#b98558', 0) + line(0, 235, 400, 235, O, 3) + peek(145, 40, 110, 90, sun(200, 90, 20) + cloud(150, 70, .6)) + path('M30 235 L30 130 L100 130 L100 235Z', '#9aa0b4') + path('M42 235 Q42 190 52 215 Q62 180 66 215 Q76 195 88 235Z', '#ff9a2e', 2) + cochon(110, 250, 1, 1, 'cheer') + cochon(200, 252, 1, 3, 'happy') + cochon(290, 250, 1, 2, 'cheer') + rect(60, 200, 280, 14, '#8a5a3b', 3, 3) + rect(75, 214, 250, 70, '#a8754a') + ell(200, 197, 30, 8, '#fff', 3) + ell(200, 194, 24, 5, '#ffb347', 0) + ell(120, 198, 18, 5, '#fff', 2.5) + ell(290, 198, 18, 5, '#fff', 2.5) + path('M170 150 q-8 -10 0 -16 q8 6 0 16Z', '#ff6f91', 2) + path('M240 130 q-8 -10 0 -16 q8 6 0 16Z', '#ff6f91', 2)) },
  ],
  words: [
    { word: 'la paille', emoji: '🌾', def: 'Des tiges de blé sèches et jaunes.' },
    { word: 'un bâton', emoji: '🪵', def: 'Un morceau de bois long et mince.' },
    { word: 'une brique', emoji: '🧱', def: 'Un bloc rouge et très dur pour bâtir un mur.' },
    { word: 'souffler', emoji: '💨', def: 'Envoyer de l’air avec sa bouche.' },
    { word: 'la cheminée', emoji: '🏠', def: 'Le tuyau sur le toit par où sort la fumée.' },
    { word: 'une marmite', emoji: '🍲', def: 'Une grosse casserole pour faire la soupe.' },
    { word: 'le toit', emoji: '🔝', def: 'Le dessus d’une maison.' },
    { word: 's’enfuir', emoji: '🏃', def: 'Partir en courant très vite.' },
  ],
  quiz: [
    { q: 'Avec quoi le premier cochon construit-il sa maison?', options: ['De la paille', 'Des briques', 'Des bâtons'], answer: 0 },
    { q: 'Avec quoi le troisième cochon construit-il sa maison?', options: ['Du sable', 'Des briques', 'De la paille'], answer: 1 },
    { q: 'Que dit le cochon au loup?', options: ['Entre vite, mon ami!', 'Non, non, par le poil de mon petit menton!', 'Je n’ai pas peur de toi!'], answer: 1 },
    { q: 'Quelle maison le loup souffle-t-il en premier?', options: ['La maison de briques', 'La maison de bâtons', 'La maison de paille'], answer: 2 },
    { q: 'Pourquoi les deux cochons courent-ils chez leur frère?', options: ['Pour jouer', 'Parce que sa maison est solide', 'Parce qu’il a de la soupe'], answer: 1 },
    { q: 'Par où le loup veut-il entrer dans la maison de briques?', options: ['Par la porte', 'Par la fenêtre', 'Par la cheminée'], answer: 2 },
    { q: 'Que trouve le loup dans la cheminée?', options: ['Une marmite d’eau chaude', 'Un gros gâteau', 'Un trou noir'], answer: 0 },
    { q: 'Comment se sent le loup à la fin?', options: ['Il a mal et il s’enfuit', 'Il est content', 'Il s’endort'], answer: 0 },
  ],
};
