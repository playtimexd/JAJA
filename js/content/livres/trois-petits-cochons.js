// trois-petits-cochons — storybook (see docs/LIVRES.md)
// ---- shared picture helpers (richer picture-book style: gradients, shading, layered scenery) ----
const O = '#3a3f55';
const DEFS = '<defs>'
  + '<radialGradient id="gSk" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#ffd6de"/><stop offset="1" stop-color="#f4a0b3"/></radialGradient>'
  + '<radialGradient id="gSn" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#ffa9bb"/><stop offset="1" stop-color="#ee7f9a"/></radialGradient>'
  + '<radialGradient id="gFur" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#a9aec4"/><stop offset="1" stop-color="#737a97"/></radialGradient>'
  + '<radialGradient id="gBel" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#f1f2f8"/><stop offset="1" stop-color="#c3c8da"/></radialGradient>'
  + '<radialGradient id="gSun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff3a0" stop-opacity=".9"/><stop offset="1" stop-color="#fff3a0" stop-opacity="0"/></radialGradient>'
  + '<linearGradient id="gBlk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>'
  + '</defs>';
const svg = (b) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${DEFS}<g stroke="#3a3f55" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${b}</g></svg>`;
const sw_ = (sw) => (sw === 3 ? '' : sw ? ` stroke-width="${sw}"` : ' stroke="none"');
const vg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>`;
const sky = (a, b) => vg('gSky', a, b) + '<rect width="400" height="300" fill="url(#gSky)" stroke="none"/>';
const ell = (cx, cy, rx, ry, f, sw = 3, ex = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"${sw_(sw)}${ex ? ' ' + ex : ''}/>`;
const circ = (cx, cy, r, f, sw = 3) => ell(cx, cy, r, r, f, sw);
const rect = (x, y, w, h, f, sw = 3, r = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"${r ? ` rx="${r}"` : ''} fill="${f}"${sw_(sw)}/>`;
const path = (d, f = 'none', sw = 3, ex = '') => `<path d="${d}" fill="${f}"${sw_(sw)}${ex ? ' ' + ex : ''}/>`;
const line = (x1, y1, x2, y2, c = O, sw = 3) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${c === O ? '' : ` stroke="${c}"`}${sw_(sw)}/>`;
const G = (x, y, s, inner, flip = false, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})">${inner}</g>`;
const rnd = (i) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const shadow = (x, y, rx, ry = rx * .22) => ell(x, y, rx, ry, '#2a3a2a', 0, 'opacity=".22"');
const cloud = (x, y, s = 1, c = '#fff') => G(x, y, s, `<g fill="${c}" stroke="none"><ellipse cx="0" cy="2" rx="34" ry="13" fill="#dbe9f6"/><ellipse cx="0" cy="0" rx="32" ry="12"/><ellipse cx="-18" cy="-8" rx="15" ry="11"/><ellipse cx="8" cy="-13" rx="19" ry="15"/><ellipse cx="22" cy="-4" rx="12" ry="9"/></g>`);
const sun = (x, y, r = 26) => circ(x, y, r * 2.6, 'url(#gSun)', 0) + path(Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, k = Math.cos(a), n = Math.sin(a); return `M${Math.round(x + k * (r + 5))} ${Math.round(y + n * (r + 5))}L${Math.round(x + k * (r + 13))} ${Math.round(y + n * (r + 13))}`; }).join(''), 'none', 4, 'stroke="#f7b733"') + circ(x, y, r, '#ffd84d') + circ(x - 7, y - 7, r * .4, '#fff3a0', 0);
const star = (x, y, r = 5, f = '#ffe58a') => `<path d="M${x} ${y - r} L${x + r * .3} ${y - r * .3} L${x + r} ${y} L${x + r * .3} ${y + r * .3} L${x} ${y + r} L${x - r * .3} ${y + r * .3} L${x - r} ${y} L${x - r * .3} ${y - r * .3}Z" fill="${f}" stroke="none"/>`;
const moon = (x, y, r = 22) => circ(x, y, r * 1.9, '#fff6c8', 0).replace('/>', ' opacity=".2"/>') + path(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * .65} ${r} 0 1 1 ${x} ${y - r}Z`, '#fff1a8', 3);
const tuft = (x, y, s = 1, c = '#5aa04a') => `<path d="M${x - 5 * s} ${y} Q${x - 6 * s} ${y - 9 * s} ${x - 9 * s} ${y - 13 * s} Q${x - 2 * s} ${y - 9 * s} ${x - 1 * s} ${y - 16 * s} Q${x + 2 * s} ${y - 9 * s} ${x + 8 * s} ${y - 12 * s} Q${x + 5 * s} ${y - 6 * s} ${x + 5 * s} ${y}Z" fill="${c}" stroke="none"/>`;
const tufts = (y0, y1, n, seed = 1, c = '#5aa04a', s = 1) => Array.from({ length: n }, (_, i) => tuft(Math.round(rnd(i + seed) * 400), Math.round(y0 + rnd(i + seed + 40) * (y1 - y0)), s * (.7 + rnd(i + seed + 80) * .6), c)).join('');
const flower = (x, y, c = '#ff7aa8') => `${line(x, y, x, y - 12, '#3f8f4f', 2.5)}${circ(x - 3, y - 14, 3.2, c, 1.5)}${circ(x + 3, y - 14, 3.2, c, 1.5)}${circ(x, y - 17, 3.2, c, 1.5)}${circ(x, y - 12, 3.2, c, 1.5)}${circ(x, y - 14.5, 2, '#ffe066', 0)}`;
const tree = (x, y, s = 1, c = '#69b85f') => G(x, y, s, `${shadow(0, 0, 34)}${path('M-7 0 L-5 -38 L5 -38 L7 0Z', '#8a5a3b')}${line(-2, -6, -2, -30, '#6b4329', 2)}${circ(0, -60, 26, c)}${circ(-19, -44, 18, c)}${circ(19, -44, 18, c)}<g stroke="none" fill="${c}">${circ(0, -59, 24.5, c, 0)}${circ(-19, -44, 16.5, c, 0)}${circ(19, -44, 16.5, c, 0)}${rect(-16, -48, 32, 16, c, 0)}</g>${ell(8, -52, 14, 18, '#3f8f4f', 0, 'opacity=".25"')}${circ(-9, -70, 7, '#a2dd8f', 0)}${circ(-22, -48, 5, '#a2dd8f', 0)}`);
const pine = (x, y, s = 1, c = '#3f8f63', snow = false) => G(x, y, s, `${shadow(0, 0, 30)}${rect(-5, -22, 10, 22, '#7a5236', 3)}${path('M-32 -18 L0 -64 L32 -18Z', c)}${path('M-26 -48 L0 -94 L26 -48Z', c)}${path('M-20 -76 L0 -116 L20 -76Z', c)}${path('M0 -64 L32 -18 L10 -18Z', '#2d6b49', 0, 'opacity=".4"')}${path('M0 -94 L26 -48 L8 -48Z', '#2d6b49', 0, 'opacity=".4"')}${snow ? path('M-8 -104 L0 -116 L8 -104 Q0 -99 -8 -104Z', '#fff', 0) + path('M-14 -68 L0 -94 L14 -68 Q0 -61 -14 -68Z', '#fff', 0) + path('M-20 -40 L0 -64 L20 -40 Q0 -32 -20 -40Z', '#fff', 0) : ''}`);
const bush = (x, y, s = 1, c = '#58a84f') => G(x, y, s, `${shadow(0, 0, 28)}${circ(-14, -10, 14, c)}${circ(14, -10, 14, c)}${circ(0, -16, 17, c)}<g stroke="none">${circ(-14, -10, 12.5, c, 0)}${circ(14, -10, 12.5, c, 0)}${circ(0, -16, 15.5, c, 0)}${rect(-14, -14, 28, 14, c, 0)}${circ(-6, -22, 5, '#8bd37b', 0)}${circ(-18, -14, 3.5, '#8bd37b', 0)}</g>`);
const hills = (y, far = '#c3e8c0', mid = '#a9dc8a') => path(`M-5 ${y - 44} Q50 ${y - 82} 120 ${y - 52} Q190 ${y - 28} 250 ${y - 62} Q330 ${y - 96} 405 ${y - 48} L405 ${y} L-5 ${y}Z`, far, 0) + path(`M-5 ${y - 24} Q70 ${y - 56} 160 ${y - 30} Q250 ${y - 6} 320 ${y - 36} Q370 ${y - 52} 405 ${y - 30} L405 ${y + 10} L-5 ${y + 10}Z`, mid);
const lawn = (y = 205, a = '#8ed26c', b = '#62b04a', far = '#c3e8c0', mid = '#a9dc8a', tc = '#4f9a43') => hills(y, far, mid) + vg('gGr', a, b) + `<rect x="-5" y="${y}" width="410" height="${305 - y}" fill="url(#gGr)" stroke="none"/>` + line(-5, y, 405, y, O, 3) + [0, 1, 2, 3, 4, 5].map((i) => ell(Math.round(rnd(i + 7) * 400), Math.round(y + 14 + rnd(i + 17) * (290 - y)), 40 + rnd(i) * 30, 5 + rnd(i + 5) * 4, '#b6e592', 0, 'opacity=".4"')).join('') + tufts(y + 6, 296, 30, 3, tc);
const fg = (c = '#3f8f4f') => tuft(8, 304, 2.2, c) + tuft(30, 306, 1.7, c) + tuft(392, 304, 2.4, c) + tuft(368, 306, 1.6, c);
const day = (sx = 335) => sky('#79c6f1', '#eaf8ff') + sun(sx, 52, 22) + cloud(sx < 150 ? 160 : 70, 58) + cloud(sx < 150 ? 290 : 225, 36, .8) + path('M110 40 q4 -5 8 0 q4 -5 8 0', 'none', 2, 'stroke="#5a6a8a"');
const wind = (x, y, n = 3, len = 60, c = '#fff') => Array.from({ length: n }, (_, i) => path(`M${x} ${y + i * 14} q${len / 3} -10 ${len / 2} 0 t${len / 2} 0`, 'none', 3.5, `stroke="${c}" opacity=".9"`)).join('');
const bits = (x, y, n, spread, c = '#e7c35d', len = 14, w = 3, seed = 1) => Array.from({ length: n }, (_, i) => { const a = rnd(i + seed) * 180, cx = x + (rnd(i + 50 + seed) - .5) * spread * 2, cy = y - rnd(i + 90 + seed) * spread * .8, dx = Math.cos(a * Math.PI / 180) * len / 2, dy = Math.sin(a * Math.PI / 180) * len / 2; return line((cx - dx).toFixed(1), (cy - dy).toFixed(1), (cx + dx).toFixed(1), (cy + dy).toFixed(1), c, w); }).join('');
const peek = (x, y, w, h, draw) => `<clipPath id="pk${x}_${y}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>${rect(x, y, w, h, '#bfe8ff', 0)}<g clip-path="url(#pk${x}_${y})">${draw}</g>${rect(x, y, w, h, 'none', 3)}`;
// ---- end shared helpers ----

// ---- characters: the three pigs (same colours every page), maman, the wolf ----
const PIG = { 0: { c: '#b583d6', d: '#8f5db5' }, 1: { c: '#f2c230', d: '#c99a14' }, 2: { c: '#58b866', d: '#3a9048' }, 3: { c: '#4f86d6', d: '#3563ad' } };
const SKIN = '#ffb6c4', SNOUT = '#ff93aa', DARKM = '#8a2f45';
const eye = (cx, cy, k) => k === 'wide' ? circ(cx, cy, 6.2, '#fff', 2.2) + circ(cx, cy + .6, 2.8, O, 0) + circ(cx - 1, cy - .8, 1, '#fff', 0)
  : k === 'closed' ? path(`M${cx - 5} ${cy + 1.5} Q${cx} ${cy - 6} ${cx + 5} ${cy + 1.5}`, 'none', 3)
  : ell(cx, cy, 3.7, 4.5, O, 0) + circ(cx - 1.3, cy - 1.7, 1.4, '#fff', 0) + circ(cx + 1.2, cy + 1.7, .7, '#fff', 0);
const cochon = (x, y, s, w = 1, face = 'happy', up = false, flip = false, ex = '') => {
  const o = PIG[w];
  const k = { happy: 'dot', sad: 'dot', scared: 'wide', surprised: 'wide', cheer: 'closed' }[face];
  const brows = { happy: path('M-15 -96 Q-10 -99 -5 -96', 'none', 2.5) + path('M15 -96 Q10 -99 5 -96', 'none', 2.5),
    cheer: '', sad: path('M-16 -92 L-5 -98', 'none', 2.5) + path('M16 -92 L5 -98', 'none', 2.5),
    scared: path('M-16 -98 L-5 -102', 'none', 2.5) + path('M16 -98 L5 -102', 'none', 2.5),
    surprised: path('M-15 -102 Q-10 -105 -5 -102', 'none', 2.5) + path('M15 -102 Q10 -105 5 -102', 'none', 2.5) }[face];
  const mouth = { happy: path('M-7 -62 Q0 -54 7 -62', 'none', 2.8), sad: path('M-6 -58 Q0 -65 6 -58', 'none', 2.8), scared: ell(0, -60, 5.5, 5, DARKM, 2) + path('M-3 -58 Q0 -56 3 -58', 'none', 0), surprised: ell(0, -60, 4, 5.5, DARKM, 2), cheer: path('M-10 -64 Q0 -48 10 -64Z', DARKM, 2.5) + path('M-5 -57 Q0 -52 5 -57Z', '#ff8aa0', 0) }[face];
  const armUp = ell(-34, -62, 7, 14, SKIN, 3, 'transform="rotate(-35 -34 -62)"') + ell(34, -62, 7, 14, SKIN, 3, 'transform="rotate(35 34 -62)"');
  const armDn = ell(-30, -36, 7, 13, SKIN, 3, 'transform="rotate(10 -30 -36)"') + ell(30, -36, 7, 13, SKIN, 3, 'transform="rotate(-10 30 -36)"');
  const hat = w === 1 ? ell(0, -97, 28, 7, '#f0d78a') + path('M-17 -98 Q-16 -122 0 -122 Q16 -122 17 -98Z', '#f0d78a') + rect(-17, -106, 34, 6, '#d9503f', 2) + path('M-24 -97 Q0 -92 24 -97', 'none', 2, 'stroke="#c9a85a"')
    : w === 2 ? path('M-20 -95 Q-20 -126 0 -126 Q20 -126 20 -95Z', '#8c5a3a') + rect(-21, -102, 42, 8, '#6b4329', 2.5, 3) + circ(0, -127, 5, '#f3e2b8', 2.5) + path('M-8 -118 Q-4 -122 0 -121', 'none', 2, 'stroke="#b88a5f"')
    : w === 3 ? path('M-20 -95 Q-19 -122 0 -122 Q19 -122 20 -95Z', '#e0503f') + path('M-20 -97 L-31 -94 Q-31 -89 -20 -91Z', '#b23a2c', 2.5) + path('M-9 -112 Q-4 -118 2 -117', 'none', 2.5, 'stroke="#f48a7a"')
    : path('M-14 -105 Q-4 -113 8 -108 Q18 -105 14 -96 Z', '#e9e0f2', 2.5) + circ(-16, -101, 6.5, '#ff9ec0', 2.5) + circ(-16, -101, 2.2, '#ffe066', 0);
  const body = w === 0
    ? path('M-23 -64 Q-30 -26 -32 -8 L32 -8 Q30 -26 23 -64Z', o.c) + path('M0 -64 Q18 -30 32 -8 L10 -8Z', '#000', 0, 'opacity=".12"') + rect(-14, -56, 28, 40, '#fff', 2.5, 6) + path('M-14 -40 Q0 -34 14 -40', 'none', 2, 'stroke="#d8d2e6"') + circ(0, -48, 2.6, '#ff9ec0', 1.5)
    : path('M-26 -40 Q-27 -12 -13 -12 L13 -12 Q27 -12 26 -40Z', o.c) + path('M2 -40 L26 -40 Q27 -12 13 -12 L8 -12Z', '#000', 0, 'opacity=".14"') + rect(-14, -58, 7, 20, o.c, 2.5) + rect(7, -58, 7, 20, o.c, 2.5) + rect(-13, -40, 26, 8, o.d, 0, 3) + circ(-10.5, -35, 2.4, '#fff3c8', 1.5) + circ(10.5, -35, 2.4, '#fff3c8', 1.5) + path('M-16 -22 L-8 -22 M8 -22 L16 -22', 'none', 2, `stroke="${o.d}"`);
  return G(x, y, s,
    shadow(0, 1, 34, 6) +
    path('M24 -26 q14 -2 12 -14 q-3 -8 -10 -3 q4 2 -1 7', 'none', 3.4) +
    rect(-14, -18, 10, 18, SKIN, 3) + rect(4, -18, 10, 18, SKIN, 3) + ell(-10, -2, 10, 5, '#6b4a3a', 2.5) + ell(10, -2, 10, 5, '#6b4a3a', 2.5) + ell(-12, -4, 4, 1.8, '#9a7a62', 0) + ell(8, -4, 4, 1.8, '#9a7a62', 0) +
    ell(0, -42, 26, 30, 'url(#gSk)') + body +
    (up ? armUp : armDn) + ex +
    path('M-21 -92 L-33 -114 L-9 -100Z', 'url(#gSk)', 3) + path('M21 -92 L33 -114 L9 -100Z', 'url(#gSk)', 3) + path('M-21 -96 L-28 -108 L-14 -100Z', SNOUT, 0) + path('M21 -96 L28 -108 L14 -100Z', SNOUT, 0) +
    ell(0, -79, 27, 24, 'url(#gSk)') + circ(-18, -70, 5.5, '#ff8fa3', 0).replace('/>', ' opacity=".7"/>') + circ(18, -70, 5.5, '#ff8fa3', 0).replace('/>', ' opacity=".7"/>') +
    ell(0, -73, 11.5, 8, 'url(#gSn)') + ell(-4, -73, 1.8, 2.5, O, 0) + ell(4, -73, 1.8, 2.5, O, 0) + ell(-3, -77, 3, 1.4, '#ffd0da', 0).replace('/>', ' opacity=".8"/>') +
    eye(-10, -86, k) + eye(10, -86, k) + brows + mouth + hat +
    (face === 'scared' ? path('M28 -98 q-5 9 0 12 q5 -3 0 -12Z', '#9fdcff', 2) : ''),
    flip);
};
const FUR = '#8b90a8', FURD = '#656a86', BELLY = '#d6d9e6';
const loup = (x, y, s, face = 'grin', flip = false, run = false, rot = 0, ex = '') => {
  const e = (cx, k) => k === 'wide' ? circ(cx, -101, 7, '#fff', 2.2) + circ(cx, -100, 2.8, O, 0) + circ(cx - 1, -102, 1, '#fff', 0)
    : k === 'x' ? path(`M${cx - 5} -105 L${cx + 5} -97 M${cx + 5} -105 L${cx - 5} -97`, 'none', 3.4)
    : k === 'sq' ? path(`M${cx - 6} -99 Q${cx} -106 ${cx + 6} -99`, 'none', 3.2)
    : ell(cx, -101, 7, 6, '#ffe27a', 2.5) + ell(cx, -100, 2.2, 4.4, O, 0) + circ(cx - 2, -103, 1.2, '#fff', 0);
  const ek = { grin: 'dot', puff: 'sq', mad: 'dot', ouch: 'x', scared: 'wide', sly: 'dot' }[face];
  const brow = face === 'grin' || face === 'mad' || face === 'sly' ? path('M-21 -113 L-5 -105', 'none', 4) + path('M21 -113 L5 -105', 'none', 4) : face === 'scared' ? path('M-20 -111 L-6 -115', 'none', 3) + path('M20 -111 L6 -115', 'none', 3) : face === 'ouch' ? path('M-19 -108 L-6 -112', 'none', 3) + path('M19 -108 L6 -112', 'none', 3) : '';
  const mouth = { grin: path('M-13 -80 Q0 -68 13 -80', '#fff', 2.5) + path('M-8 -77 l3 5 l3 -4 M2 -75 l3 4 l3 -5', 'none', 2), sly: path('M-12 -80 Q0 -70 12 -78 Q10 -72 0 -70 Q-8 -70 -12 -80Z', '#6e2535', 2.5) + path('M-8 -77 l3 4 l3 -4', '#fff', 1.5), puff: ell(0, -80, 5.5, 5, '#6e2535', 2),
    mad: path('M-13 -76 Q0 -86 13 -76 Q0 -64 -13 -76Z', '#6e2535', 2.5) + path('M-9 -76 l3 5 l3 -6 M2 -76 l3 6 l3 -5', '#fff', 1.5), ouch: ell(0, -77, 9, 11, '#6e2535', 2.5) + ell(0, -72, 5.5, 4.5, '#ff8a8a', 0),
    scared: ell(0, -77, 7.5, 9, '#6e2535', 2.5) + ell(0, -73, 4.5, 3.5, '#ff8a8a', 0) }[face];
  const cheeks = face === 'puff' ? ell(-22, -84, 14, 13, 'url(#gFur)', 3) + ell(22, -84, 14, 13, 'url(#gFur)', 3) + circ(-22, -84, 4, '#ff9aa8', 0) + circ(22, -84, 4, '#ff9aa8', 0) : face === 'ouch' ? circ(-22, -86, 5.5, '#ff7d7d', 0) + circ(22, -86, 5.5, '#ff7d7d', 0) : '';
  const legs = run
    ? path('M-18 -22 L-34 -4 L-22 6 L-6 -14Z', FUR, 3) + ell(-32, 4, 12, 5, FURD, 3, 'transform="rotate(-20 -32 4)"') + rect(5, -22, 15, 22, 'url(#gFur)', 3) + ell(14, -2, 12, 5, FURD, 3)
    : rect(-20, -22, 15, 22, 'url(#gFur)', 3) + rect(5, -22, 15, 22, 'url(#gFur)', 3) + ell(-12, -2, 12, 5, FURD, 3) + ell(13, -2, 12, 5, FURD, 3);
  const arms = face === 'mad' ? ell(-34, -48, 8, 17, 'url(#gFur)', 3, 'transform="rotate(35 -34 -48)"') + ell(34, -48, 8, 17, 'url(#gFur)', 3, 'transform="rotate(-35 34 -48)"') + circ(-24, -34, 6, FURD, 2.5) + circ(24, -34, 6, FURD, 2.5)
    : face === 'ouch' || face === 'scared' ? ell(-36, -66, 8, 17, 'url(#gFur)', 3, 'transform="rotate(-30 -36 -66)"') + ell(36, -66, 8, 17, 'url(#gFur)', 3, 'transform="rotate(30 36 -66)"')
    : ell(-34, -48, 8, 17, 'url(#gFur)', 3, 'transform="rotate(12 -34 -48)"') + ell(34, -48, 8, 17, 'url(#gFur)', 3, 'transform="rotate(-12 34 -48)"');
  return G(x, y, s,
    shadow(0, 1, 38, 6) +
    path('M24 -30 Q64 -50 56 -4 Q46 -26 26 -18Z', 'url(#gFur)', 3) + path('M50 -20 Q56 -12 55 -6 Q47 -14 40 -14Z', '#e6e8f2', 0) +
    legs +
    ell(0, -52, 31, 38, 'url(#gFur)') + ell(0, -47, 18, 28, 'url(#gBel)', 0) + path('M-10 -60 l3 4 M4 -50 l3 4 M-6 -38 l3 4', 'none', 1.8, 'stroke="#aab0c6"') +
    arms + ex +
    path('M-26 -104 L-34 -140 L-8 -114Z', FURD, 3) + path('M26 -104 L34 -140 L8 -114Z', FURD, 3) + path('M-25 -110 L-30 -130 L-14 -114Z', '#f0a0b0', 0) + path('M25 -110 L30 -130 L14 -114Z', '#f0a0b0', 0) +
    ell(0, -92, 31, 26, 'url(#gFur)') + path('M-31 -92 L-43 -84 L-29 -77Z', 'url(#gFur)', 3) + path('M31 -92 L43 -84 L29 -77Z', 'url(#gFur)', 3) + path('M-12 -118 l4 8 l4 -7 l4 8', 'none', 2.5, `stroke="${FURD}"`) +
    ell(0, -82, 17, 12.5, 'url(#gBel)', 2.5) + cheeks + ell(0, -90, 6, 4.5, '#2c2f3f', 0) + circ(-1.8, -91.5, 1.3, '#fff', 0) +
    e(-12, ek) + e(12, ek) + brow + mouth,
    flip, rot);
};

// ---- houses: base centred on (x, y) ----
const strawHouse = (x, y, s = 1, o = {}) => G(x, y, s,
  shadow(0, 1, 70, 8) +
  rect(-45, -60, 90, 60, '#f2d27a') + Array.from({ length: 22 }, (_, i) => line(-43 + i * 4 + rnd(i) * 2, -58 + rnd(i + 9) * 6, -43 + i * 4 + rnd(i) * 2, -6 - rnd(i + 3) * 8, i % 2 ? '#d9b04f' : '#fbe7a6', 1.6)).join('') + rect(-45, -60, 90, 60, 'url(#gBlk)', 0) +
  rect(-24, -38, 22, 38, o.pig ? '#4a3a33' : '#9b6b43') + (o.pig ? cochon(-13, -1, .38, o.pig, o.face || 'scared') + path('M-24 -38 L-24 0', 'none', 3) : line(-13, -36, -13, -2, '#7a5232', 1.8) + circ(-6, -19, 2, '#f7e08a', 1.5)) +
  rect(8, -50, 26, 24, '#c98f43', 2.5) + rect(11, -47, 20, 18, '#bfe8ff', 2) + line(21, -47, 21, -29, O, 2) + line(11, -38, 31, -38, O, 2) + rect(4, -50, 5, 24, '#e0a85a', 2) + rect(34, -50, 5, 24, '#e0a85a', 2) +
  path('M-64 -48 L0 -118 L64 -48Z', '#e0ac3e') + path('M0 -118 L64 -48 L30 -48Z', '#b9862a', 0, 'opacity=".35"') +
  Array.from({ length: 8 }, (_, i) => ell(-56 + i * 16, -48, 9, 6.5, '#e8b94c', 2.5)).join('') + Array.from({ length: 14 }, (_, i) => line(-4 + (i - 7) * 5, -108 + Math.abs(i - 7) * 3, -6 + (i - 7) * 8.5, -56, '#c9972f', 1.6)).join('') + bits(0, -64, 10, 55, '#f2d27a', 12, 3, 4));
const stickHouse = (x, y, s = 1, o = {}) => o.fall
  ? G(x, y, s, shadow(0, 1, 70, 8) + rect(-45, -12, 90, 12, '#a8754a', 2.5) + path('M-45 0 L-45 -34 L-33 -52 L-22 0Z', '#a8754a', 3) + G(52, -30, 1, path('M-50 0 L0 -50 L50 0Z', '#8a5a3b', 3) + line(-30, -6, 0, -36, '#6b4329', 3) + line(-10, -2, 14, -32, '#6b4329', 3), false, 38) + [[-30, -16, -58], [5, -8, 70], [20, -6, -80], [-5, -4, 30], [38, -3, 85]].map(([a, b, r], i) => G(a, b, 1, rect(-5, -32, 10, 52, i % 2 ? '#a8754a' : '#b98558', 2.5), false, r)).join(''))
  : G(x, y, s, shadow(0, 1, 70, 8) +
    Array.from({ length: 9 }, (_, i) => rect(-45 + i * 10, -62 - (i % 3) * 2, 10, 62 + (i % 3) * 2, i % 2 ? '#a8754a' : '#b98558', 2.5) + line(-40 + i * 10, -50 + (i % 4) * 8, -40 + i * 10, -38 + (i % 4) * 8, '#7d5233', 1.6)).join('') +
    [0, 2, 5].map((i) => circ(-40 + i * 10 + 1, -30 - i * 3, 2.2, '#6b4329', 1.2)).join('') + rect(-47, -44, 94, 5, '#d9b57a', 2) + rect(-47, -14, 94, 5, '#d9b57a', 2) +
    rect(-24, -38, 22, 38, o.pig ? '#4a3a33' : '#6b4329') + (o.pig ? cochon(-13, -1, .38, o.pig, o.face || 'scared') : line(-13, -36, -13, -2, '#4a2f1d', 1.8) + circ(-6, -19, 2, '#f7e08a', 1.5)) +
    rect(10, -52, 26, 24, '#6b4329', 2.5) + rect(13, -49, 20, 18, '#bfe8ff', 2) + line(23, -49, 23, -31, O, 2) + line(13, -40, 33, -40, O, 2) +
    path('M-62 -58 L0 -116 L62 -58Z', '#8a5a3b') + path('M0 -116 L62 -58 L30 -58Z', '#000', 0, 'opacity=".15"') + Array.from({ length: 8 }, (_, i) => line(-52 + i * 14, -58, -38 + i * 14, -72 - (i % 2) * 3, '#6b4329', 3)).join('') + Array.from({ length: 5 }, (_, i) => line(-30 + i * 16, -86 + Math.abs(i - 2) * 9, -22 + i * 16, -64, '#a8754a', 2.5)).join(''));
const brickHouse = (x, y, s = 1, o = {}) => G(x, y, s,
  shadow(0, 1, 72, 8) +
  rect(26, -106, 16, 42, '#b4503c') + [0, 1, 2].map((i) => line(26, -96 + i * 12, 42, -96 + i * 12, '#8c3a2b', 1.6)).join('') + rect(23, -110, 22, 8, '#8c3a2b') +
  (o.smoke ? ell(34, -124, 8, 6, '#eef0f8', 0) + ell(42, -138, 10, 7, '#eef0f8', 0) + ell(36, -154, 12, 8, '#eef0f8', 0).replace('/>', ' opacity=".7"/>') : '') +
  rect(-50, -62, 100, 62, '#d8674f') + [0, 1, 2, 3].map((r) => Array.from({ length: 6 }, (_, i) => rect(-50 + i * 20 + (r % 2 ? -10 : 0) + 0, -62 + r * 15.5, 20, 15.5, ['#d8674f', '#cf5b45', '#e07a60', '#c9533f'][(i * 3 + r * 2) % 4], 1.4)).join('')).join('') + rect(-50, -62, 100, 62, 'url(#gBlk)', 0) +
  rect(-14, -43, 28, 43, o.open ? '#4a3a33' : '#3d79c2') + (o.open ? cochon(0, -1, .4, 3, o.face || 'happy', true) : path('M-14 -43 Q0 -50 14 -43', 'none', 0) + rect(-10, -39, 20, 18, '#2f66ad', 0) + circ(7, -20, 2.2, '#ffe066', 1.5)) + rect(-18, -2, 36, 4, '#b9bcc9', 2) +
  (o.win ? peek(-46, -54, 24, 22, cochon(-34, -12, .4, 1, 'happy')) + peek(22, -54, 24, 22, cochon(34, -12, .4, 2, 'happy')) : rect(-46, -54, 24, 22, '#bfe8ff') + rect(22, -54, 24, 22, '#bfe8ff') + line(-34, -54, -34, -32, O, 2) + line(34, -54, 34, -32, O, 2)) + rect(-48, -32, 28, 4, '#fff', 2) + rect(20, -32, 28, 4, '#fff', 2) + [-42, -34, -26].map((a) => circ(a, -28, 2.2, '#ff7aa8', 0)).join('') +
  path('M-64 -58 L0 -116 L64 -58Z', '#5a6b8c') + path('M0 -116 L64 -58 L30 -58Z', '#000', 0, 'opacity=".15"') + [0, 1, 2].map((r) => Array.from({ length: 8 - r * 2 }, (_, i) => path(`M${-49 + r * 13 + i * 14} ${-64 - r * 13} q6 7 12 0`, 'none', 1.6, 'stroke="#44557a"')).join('')).join('') + (o.inner || ''));

// ---- scenes ----
const dusk = () => sky('#f6a77e', '#ffe9c0') + circ(80, 92, 70, '#ffd27a', 0).replace('/>', ' opacity=".3"/>') + circ(80, 92, 26, '#ffd27a', 0) + cloud(250, 50, .9, '#fff0e6') + cloud(330, 90, .7, '#ffe3d2');
const heart = (x, y, s = 1) => G(x, y, s, path('M0 8 C-18 -4 -10 -18 0 -8 C10 -18 18 -4 0 8Z', '#ff6f91', 2.5));
const road = (d) => path(d, '#e8cfa6', 3) + path(d.split('Z')[0], 'none', 0);
const field = (y = 205) => lawn(y) + flower(40, 278) + flower(360, 270, '#ffd84d') + flower(210, 288, '#fff') + flower(300, 290, '#ff7aa8');

export const book = {
  id: 'trois-petits-cochons',
  title: 'Les trois petits cochons',
  emoji: '🐷',
  level: 2,
  minutes: 15,
  cover: svg(day(60) + lawn(220) + tree(28, 232, 1.1) + brickHouse(332, 240, 1.2, { smoke: true }) + cochon(70, 286, 1.2, 1, 'happy') + cochon(160, 290, 1.2, 2, 'happy') + cochon(250, 286, 1.2, 3, 'cheer', true) + flower(30, 292) + flower(140, 294, '#ffd84d') + fg()),
  pages: [
    { text: "Il était une fois trois petits cochons qui vivaient avec leur maman dans une jolie maison au bord d’un grand champ. Chaque matin, la maman préparait le déjeuner et chantait en balayant la cuisine. Les trois frères, eux, aimaient jouer dehors, courir dans l’herbe et se chamailler pour rire. Ils étaient très heureux, mais la maison devenait un peu petite pour trois cochons qui grandissaient à vue d’œil.",
      svg: svg(day() + lawn(200) + shadow(75, 205, 70) + rect(20, 118, 110, 88, '#f6e7c8') + [0, 1, 2, 3, 4, 5].map((i) => line(20, 130 + i * 14, 130, 130 + i * 14, '#e2cfa6', 1.5)).join('') + path('M8 124 L75 58 L142 124Z', '#c9694a') + path('M75 58 L142 124 L108 124Z', '#000', 0, 'opacity=".14"') + rect(62, 154, 26, 52, '#8a5a3b') + circ(82, 182, 2, '#ffe066', 1.5) + rect(30, 138, 24, 24, '#bfe8ff') + line(42, 138, 42, 162, O, 2) + line(30, 150, 54, 150, O, 2) + rect(98, 138, 24, 24, '#bfe8ff') + tree(372, 218, 1) + bush(160, 206, .9) + cochon(105, 285, 1.4, 0, 'happy') + cochon(215, 290, 1, 1, 'happy') + cochon(285, 292, 1, 2, 'happy') + cochon(350, 290, 1, 3, 'happy') + heart(160, 98, 1.2) + flower(20, 286) + fg()) },
    { text: "Un beau jour, les trois cochons ont tellement grandi qu’ils ne tenaient plus dans la maison. « Il est temps de vous bâtir chacun votre maison », a dit leur maman, les yeux un peu mouillés. Elle leur a donné un gros baiser et un baluchon sur le dos. « Soyez prudents, mes petits, et méfiez-vous du loup qui rôde dans la forêt! » Les trois frères ont promis, puis ils sont partis sur le chemin en chantant.",
      svg: (() => {
        const bundle = '<g transform="rotate(-20 20 -60)">' + line(14, -50, 44, -112, '#8a5a3b', 4) + circ(46, -116, 11, '#d9503f', 2.5) + circ(43, -118, 2, '#fff', 0) + circ(50, -113, 2, '#fff', 0) + '</g>';
        return svg(day(340) + lawn(180) + shadow(40, 186, 52) + rect(10, 108, 62, 76, '#f6e7c8') + path('M2 114 L41 66 L80 114Z', '#c9694a') + rect(32, 144, 18, 40, '#8a5a3b') + cochon(78, 196, .62, 0, 'happy', true) + path('M-10 300 Q110 232 190 244 Q320 258 410 222 L410 262 Q320 296 190 290 Q100 284 40 310Z', '#ecd5ae') + path('M20 300 Q120 256 190 262', 'none', 2, 'stroke="#d2b88a"') + tree(372, 214, .9) + cochon(150, 276, 1, 1, 'happy', false, false, bundle) + cochon(240, 286, 1.02, 2, 'happy', false, false, bundle) + cochon(330, 280, 1, 3, 'happy', false, false, bundle) + fg());
      })() },
    { text: "Le premier cochon était un grand pressé. Il n’aimait pas du tout les longs travaux, et il voulait jouer le plus vite possible. Alors, au premier tas de paille croisé au bord du chemin, il s’est écrié : « Voilà exactement ce qu’il me faut! » En quelques minutes à peine, il a construit une petite maison jaune et toute légère. Puis il s’est étendu au soleil, fier de lui, en sifflotant d’un air tranquille.",
      svg: svg(day() + field() + strawHouse(300, 238, 1.4) + shadow(65, 270, 40) + ell(60, 258, 32, 22, '#f2d27a') + path('M32 252 q28 -6 56 0 M30 262 q30 -4 60 0', 'none', 2, 'stroke="#d9b04f"') + line(44, 238, 44, 276, '#c98f43', 3) + line(76, 238, 76, 276, '#c98f43', 3) + ell(112, 272, 24, 14, '#f2d27a') + cochon(185, 288, 1.3, 1, 'cheer', true, false, G(-44, -86, 1, path('M-14 -4 Q-8 -22 0 -18 Q10 -26 16 -4Z', '#f2d27a', 2.5) + line(-8, -6, -8, -16, '#d9b04f', 1.5) + line(4, -6, 4, -18, '#d9b04f', 1.5) + line(10, -8, 12, -16, '#fbe7a6', 1.5))) + bits(140, 215, 5, 20, '#f2d27a', 12, 3, 8) + fg()) },
    { text: "Le deuxième cochon avait un peu plus de patience, mais il n’aimait pas non plus se fatiguer. Il a ramassé des bâtons dans le bois et il les a attachés les uns aux autres. Toc, toc, toc! Son marteau résonnait dans la forêt tout entière. « Ma maison sera plus solide que celle de mon frère », se disait-il en frappant. Le soir même, il avait un toit, une porte et une petite fenêtre, et il était bien content.",
      svg: svg(day(60) + field() + stickHouse(300, 238, 1.4) + [0, 1, 2, 3, 4].map((i) => line(30 + i * 6, 282 - i * 4, 90 + i * 4, 270 - i * 3 + (i % 2) * 6, i % 2 ? '#a8754a' : '#b98558', 6)).join('') + cochon(185, 290, 1.3, 2, 'cheer', true, false, G(38, -88, 1, rect(-3, -34, 6, 40, '#8a5a3b', 2.5, 2) + rect(-12, -42, 24, 12, '#8a90a5', 2.5, 3) + rect(-12, -42, 8, 12, '#b9bfd2', 0), false, 25)) + path('M240 160 l10 -8 M246 176 l12 0 M238 146 l5 -10', 'none', 3, 'stroke="#f7b733"') + fg()) },
    { text: "Le troisième cochon, lui, ne se pressait pas du tout. Il savait qu’une bonne maison demande du temps et de la patience. Brique après brique, avec de la colle grise, il montait ses murs bien droits pendant que ses frères jouaient. Il a même ajouté une grande cheminée sur le toit. Il avait chaud et ses pattes étaient fatiguées, mais, au bout de plusieurs jours, sa belle maison rouge était enfin terminée.",
      svg: svg(day() + field() + brickHouse(300, 240, 1.4, { smoke: true }) + [0, 1, 2].map((r) => Array.from({ length: 3 - (r > 1 ? 1 : 0) }, (_, i) => rect(24 + i * 34 + (r % 2) * 14, 272 - r * 15, 32, 15, ['#d8674f', '#cf5b45', '#e07a60'][(i + r) % 3], 2.5)).join('')).join('') + shadow(75, 276, 60) + cochon(195, 290, 1.3, 3, 'happy', true, false, G(34, -92, 1, rect(-14, -8, 28, 14, '#d8674f', 2.5) + line(-14, -1, 14, -1, '#a8402f', 1.5) + path('M10 8 l12 -3 l3 8 l-12 3Z', '#cfd3e0', 2), false, 6)) + rect(116, 258, 20, 16, '#8a90a5', 2.5, 3) + fg()) },
    { text: "Un après-midi, un gros loup affamé est sorti de la forêt et il s’est approché de la maison de paille. Il a frappé à la porte, en prenant sa voix la plus douce. « Petit cochon, petit cochon, laisse-moi entrer! » a-t-il dit. Mais le premier cochon, tremblant derrière la porte, a répondu : « Non, non, par le poil de mon petit menton! » Alors le loup, très fâché, a montré ses dents et a répliqué : « Eh bien, je vais souffler! »",
      svg: svg(day(60) + field() + strawHouse(292, 246, 1.5, { pig: 1, face: 'scared' }) + loup(105, 284, 1.3, 'sly') + path('M178 150 q10 -8 22 -4', 'none', 3, 'stroke="#fff"') + fg()) },
    { text: "Le loup a pris une immense respiration et il a soufflé, soufflé, soufflé de toutes ses forces. Les joues toutes gonflées, il est devenu rouge comme une tomate. Un petit craquement s’est fait entendre, puis la maison de paille s’est envolée en mille morceaux, comme un tas de plumes dans le vent! Le pauvre cochon, au milieu des brins jaunes, a poussé un cri de frayeur. Il a pris ses jambes à son cou, sans même se retourner.",
      svg: svg(day(60) + field() + ell(300, 268, 70, 8, '#d9b04f', 0, 'opacity=".5"') + loup(68, 286, 1.35, 'puff') + wind(135, 186, 3, 80) + G(285, 110, 1, path('M-50 0 L0 -60 L50 0Z', '#e0ac3e') + Array.from({ length: 7 }, (_, i) => ell(-42 + i * 14, 0, 8, 5.5, '#e8b94c', 2.5)).join(''), false, 24) + bits(240, 200, 20, 80, '#e7c35d', 18, 4, 3) + bits(330, 150, 10, 45, '#f2d27a', 16, 4, 20) + bits(300, 270, 8, 35, '#e7c35d', 14, 3, 30) + cochon(355, 284, 1, 1, 'scared', true, true) + fg()) },
    { text: "Le premier cochon s’est sauvé à toute vitesse chez son frère, le deuxième cochon, qui a refermé la porte derrière lui. Mais le loup les avait suivis, et il a répété son petit refrain : « Petit cochon, petit cochon, laisse-moi entrer! » Les deux frères ont crié que non, bien sûr. Alors le loup a gonflé sa poitrine, puis il a soufflé encore plus fort. Les bâtons se sont dispersés, et la maison de bois s’est écroulée en un instant!",
      svg: svg(day(340) + field() + loup(58, 286, 1.25, 'puff') + wind(118, 190, 3, 70) + stickHouse(225, 248, 1.2, { fall: true }) + bits(215, 190, 14, 60, '#a8754a', 32, 5, 11) + cochon(315, 288, .95, 1, 'scared', true, true) + cochon(373, 290, .95, 2, 'scared', true, true) + fg()) },
    { text: "Les deux cochons, le cœur battant, ont couru aussi vite que leurs petites pattes le leur permettaient. Ils sont arrivés tout essoufflés chez leur frère, le troisième cochon, et ils ont frappé à sa porte. « Vite, vite, ouvre-nous! Le loup est derrière nous! » criaient-ils. Heureusement, le troisième cochon a ouvert la porte en grand et il l’a refermée aussitôt après leur passage. Les trois frères se sont serrés les uns contre les autres, à l’abri dans la solide maison de briques.",
      svg: svg(day(60) + lawn(205) + loup(30, 258, .55, 'grin') + brickHouse(298, 250, 1.5, { open: true, face: 'happy' }) + [0, 1, 2].map((i) => ell(150 + i * 4, 282 - i * 3, 12 - i * 2, 4, '#e8dcc0', 0, 'opacity=".6"')).join('') + cochon(115, 288, 1.05, 1, 'scared', true) + cochon(205, 290, 1.05, 2, 'scared', true) + path('M72 232 l-24 0 M72 246 l-30 0 M160 232 l-24 0 M160 246 l-30 0', 'none', 3, 'stroke="#fff"') + fg()) },
    { text: "Dehors, le loup a repris son refrain, mais les trois frères ont encore répondu : « Non, non, par le poil de notre petit menton! » Alors le loup a soufflé, soufflé, soufflé, jusqu’à en avoir le visage tout rouge. Pourtant, la maison de briques ne bougeait pas du tout, pas même d’un petit centimètre. Il a soufflé encore et encore, puis il s’est assis par terre, hors d’haleine. Il était si fâché qu’il en trépignait, et les trois cochons riaient derrière la fenêtre.",
      svg: svg(day(340) + field() + brickHouse(298, 248, 1.5, { win: true, smoke: true }) + loup(90, 286, 1.3, 'mad') + wind(150, 190, 3, 55) + path('M200 205 l10 -6 M204 225 l12 0 M200 245 l10 6', 'none', 3, 'stroke="#fff"') + path('M70 130 q-6 -12 4 -20 M110 130 q6 -12 -4 -20', 'none', 3, 'stroke="#fff" opacity=".8"') + fg()) },
    { text: "Le loup a regardé la maison de tous les côtés, très mécontent. Finalement, il a eu une nouvelle idée : « Je vais descendre par la cheminée! » Il a donc cherché une échelle, il l’a appuyée contre le mur et il a grimpé tout doucement sur le toit. Il marchait sur la pointe des pattes pour ne pas faire de bruit. Mais le troisième cochon, qui avait l’oreille fine, a entendu un petit grattement au-dessus de sa tête.",
      svg: svg(dusk() + lawn(220, '#c9c27a', '#9aa855', '#e2d9a0', '#cfc77c', '#7e8a3f') + brickHouse(225, 272, 1.45, { smoke: true }) + G(130, 272, 1, rect(0, 0, 0, 0, 'none', 0) + line(-6, -2, 34, -140, '#a8754a', 6) + line(16, -2, 56, -140, '#a8754a', 6) + [0, 1, 2, 3, 4, 5].map((i) => line(-1 + i * 7.3, -22 - i * 22, 22 + i * 7.3, -22 - i * 22, '#6b4329', 3.5)).join('')) + loup(246, 160, 1.05, 'sly', false, false, 6) + path('M298 100 q10 -6 18 0', 'none', 2.5, 'stroke="#fff" opacity=".6"') + fg('#8a9a3f')) },
    { text: "« Vite, mes frères, vite! » a dit le troisième cochon. Ensemble, ils ont rempli une grosse marmite d’eau, ils l’ont placée dans la cheminée et ils ont allumé un grand feu. L’eau a commencé à bouillonner, glou, glou, glou. Au même moment, le loup s’est laissé glisser dans le conduit. Il a perdu l’équilibre, il a lâché un grand cri et il est tombé, plouf! dans l’eau très chaude. Heureusement pour lui, elle n’était pas encore bouillante.",
      svg: svg(rect(0, 0, 400, 300, '#ecd0a2', 0) + Array.from({ length: 8 }, (_, i) => line(0, 20 + i * 38, 400, 20 + i * 38, '#d8b988', 2)).join('') + rect(0, 262, 400, 40, '#b98558', 0) + [0, 1, 2, 3, 4].map((i) => line(i * 90 + 30, 262, i * 90 + 10, 300, '#9c6c42', 2)).join('') + line(0, 262, 400, 262, O, 3) +
        rect(20, 40, 230, 225, '#9aa0b4') + [0, 1, 2, 3, 4, 5, 6].map((i) => Array.from({ length: 4 }, (_, j) => rect(30 + j * 58 + (i % 2) * 29 - (i % 2 ? 29 : 0), 40 + i * 32, 58, 32, ['#9aa0b4', '#8d93a8', '#a6abbd'][(i + j) % 3], 1.6)).join('')).join('') + rect(30, 40, 230, 225, 'none', 3.5) +
        path('M55 266 L55 120 Q145 78 235 120 L235 266Z', '#2a2a38') + ell(145, 262, 78, 6, '#ffb347', 0, 'opacity=".5"') + path('M75 264 Q90 220 105 250 Q122 196 145 238 Q168 200 182 245 Q198 222 216 264Z', '#ff9a2e', 2.5) + path('M104 262 Q122 232 134 256 Q150 220 168 258Z', '#ffd84d', 0) +
        ell(145, 258, 62, 14, '#000', 0, 'opacity=".25"') +
        G(150, 192, 1, path('M-45 60 Q-40 -20 0 -30 Q40 -20 45 60Z', 'none', 0), false, 0) +
        loup(150, 150, .98, 'ouch', false, true, 16, '') +
        [[88, 150], [208, 140], [112, 118], [190, 112], [75, 185], [222, 180], [128, 96]].map(([a, b], i) => path(`M${a} ${b - 7} q5 7 0 11 q-5 -4 0 -11Z`, '#8ad4f5', 2)).join('') +
        path('M80 205 Q100 176 118 202 M182 200 Q202 170 220 204', 'none', 4, 'stroke="#fff" opacity=".85"') +
        path('M95 228 Q145 244 200 228 L206 262 Q145 276 90 262Z', '#4a4f66', 3.5) + ell(145, 228, 56, 9, '#8ad4f5', 3) + path('M92 236 Q145 248 204 236', 'none', 2, 'stroke="#2d324a"') + rect(86, 224, 10, 7, '#2d324a', 2) + rect(196, 224, 10, 7, '#2d324a', 2) +
        path('M96 200 q-8 -14 4 -24 M196 196 q8 -14 -4 -24', 'none', 3, 'stroke="#fff" opacity=".7"') +
        cochon(285, 290, .8, 1, 'cheer', true) + cochon(335, 292, .8, 2, 'cheer', true) + cochon(379, 290, .76, 3, 'cheer', true)) },
    { text: "« Ouille, ouille, ouille! » a hurlé le loup en bondissant hors de la marmite. Il avait le derrière tout rouge et la queue qui fumait. Sans demander son reste, il a filé à toute vitesse et il s’est enfui dans la forêt en poussant des cris. Il a couru, couru, couru, si loin que personne ne l’a jamais revu dans le pays. Il avait vraiment compris sa leçon, et les trois cochons ont éclaté de rire en le regardant disparaître.",
      svg: svg(day(340) + lawn(215) + pine(28, 240, 1.3) + pine(78, 252, 1.05) + pine(120, 232, .8, '#4a9a6c') + brickHouse(318, 244, 1.3, { smoke: true }) + [0, 1, 2].map((i) => ell(250 - i * 22, 284 - i * 4, 18 - i * 3, 6, '#f0e6cc', 0, 'opacity=".8"')).join('') + path('M215 190 q-24 6 -32 -2 M222 216 q-30 0 -38 -8 M222 246 q-22 6 -34 0', 'none', 3, 'stroke="#fff"') + loup(165, 282, 1.15, 'scared', false, true, -8) + path('M108 252 q-7 -10 2 -16 q-5 -9 5 -16', 'none', 3, 'stroke="#9aa0b4" opacity=".9"') + cochon(268, 290, .8, 1, 'cheer', true, true) + cochon(315, 292, .8, 2, 'cheer', true) + cochon(360, 290, .8, 3, 'cheer', true) + fg()) },
    { text: "Après cette grande aventure, les trois frères se sont serrés dans leurs bras en riant, et ils étaient tous fiers du troisième cochon. Le premier et le deuxième cochon ont reconnu qu’ils auraient dû travailler plus fort. Depuis ce jour, les trois frères vivent ensemble dans la belle maison de briques, qui est assez grande pour tous. Le soir, ils soupent côte à côte, et ils sont heureux comme des rois.",
      svg: svg(sky('#f9e2b8', '#fff4dc') + rect(0, 0, 400, 300, '#f6dfb3', 0) + Array.from({ length: 9 }, (_, i) => line(0, 12 + i * 28, 400, 12 + i * 28, '#ecd09a', 1.5)).join('') +
        rect(0, 232, 400, 70, '#b98558', 0) + Array.from({ length: 6 }, (_, i) => line(i * 70 + 40, 232, i * 70, 300, '#9c6c42', 2)).join('') + line(0, 232, 400, 232, O, 3) +
        peek(150, 36, 110, 92, sky('#79c6f1', '#eaf8ff') + sun(210, 80, 17) + cloud(170, 66, .55) + path('M150 128 Q190 100 260 120 L260 128Z', '#9ed67e', 0)) + line(205, 36, 205, 128, O, 2) + line(150, 82, 260, 82, O, 2) + rect(142, 126, 126, 8, '#fff', 3, 2) + path('M148 36 L132 70 L148 130 M262 36 L278 70 L262 130', '#e0765b', 3) +
        rect(26, 128, 84, 108, '#9aa0b4') + [0, 1, 2, 3].map((i) => line(26, 150 + i * 22, 110, 150 + i * 22, '#7d8499', 1.8)).join('') + path('M40 236 L40 170 Q68 150 96 170 L96 236Z', '#2a2a38') + path('M48 236 Q54 206 62 224 Q70 190 78 222 Q86 206 90 236Z', '#ff9a2e', 2) + path('M58 236 Q66 216 72 232 Q80 214 84 236Z', '#ffd84d', 0) + rect(20, 120, 96, 12, '#8a5a3b', 3) +
        path('M300 40 l0 22 M330 40 l0 18', 'none', 2.5, 'stroke="#d8a65a"') + rect(290, 60, 26, 20, '#e07a60', 2.5) + rect(322, 56, 24, 18, '#7ab5e0', 2.5) +
        cochon(105, 258, 1.05, 1, 'cheer', true) + cochon(205, 262, 1.1, 3, 'happy') + cochon(305, 258, 1.05, 2, 'cheer', true) +
        rect(60, 228, 280, 14, '#8a5a3b', 3, 3) + rect(75, 242, 250, 56, '#a8754a') + [0, 1, 2, 3, 4].map((i) => line(90 + i * 55, 244, 90 + i * 55, 296, '#8a5a3b', 2)).join('') +
        ell(205, 226, 32, 8, '#fff', 3) + ell(205, 223, 25, 5, '#ffb347', 0) + path('M195 214 q-4 -8 2 -12 M208 214 q4 -8 -2 -12', 'none', 2, 'stroke="#fff" opacity=".8"') + ell(120, 226, 20, 6, '#fff', 2.5) + ell(290, 226, 20, 6, '#fff', 2.5) + ell(120, 224, 14, 3.5, '#ffb347', 0) + ell(290, 224, 14, 3.5, '#ffb347', 0) +
        heart(165, 150, 1.3) + heart(250, 125, 1.1) + heart(60, 100, 1)) },
  ],
  words: [
    {"word":"la paille","emoji":"🌾","def":"Des tiges de blé séchées, jaunes et légères."},
    {"word":"un baluchon","emoji":"🎒","def":"Un petit paquet de vêtements qu’on porte sur le dos."},
    {"word":"se méfier","emoji":"🧐","def":"Faire attention à quelqu’un parce qu’on pense qu’il peut être dangereux."},
    {"word":"rôder","emoji":"🐺","def":"Se promener doucement quelque part, sans qu’on sache ce qu’on veut faire."},
    {"word":"une brique","emoji":"🧱","def":"Un bloc rouge et très dur pour bâtir un mur."},
    {"word":"essoufflé","emoji":"😮‍💨","def":"Qui a de la difficulté à respirer parce qu’il a trop couru."},
    {"word":"la cheminée","emoji":"🏠","def":"Le tuyau sur le toit par où sort la fumée."},
    {"word":"une marmite","emoji":"🍲","def":"Une grosse casserole pour faire cuire la soupe."},
    {"word":"s’enfuir","emoji":"🏃","def":"Partir en courant très vite parce qu’on a peur."},
    {"word":"solide","emoji":"💪","def":"Qui ne se brise pas facilement."},
  ],
  quiz: [
    {"q":"Pourquoi la maman dit-elle à ses petits de construire chacun leur maison?","options":["Les cochons ont grandi et la maison est devenue trop petite","Elle veut aller vivre ailleurs","Le loup a détruit leur première maison"],"answer":0},
    {"q":"Dans quel ordre les cochons construisent-ils leur maison?","options":["Briques, bâtons, paille","Paille, bâtons, briques","Bâtons, paille, briques"],"answer":1},
    {"q":"Pourquoi le troisième cochon met-il tant de temps à bâtir sa maison?","options":["Il est paresseux","Il veut une belle maison solide","Il n’a pas d’outils"],"answer":1},
    {"q":"Que veut dire « essoufflé » dans l’histoire?","options":["Qui a de la difficulté à respirer après avoir couru","Qui a très faim","Qui est très content"],"answer":0},
    {"q":"Que se passe-t-il quand le loup souffle sur la maison de briques?","options":["Elle s’envole","Elle ne bouge pas du tout","Elle se fend en deux"],"answer":1},
    {"q":"Comment le loup essaie-t-il ensuite d’entrer dans la maison de briques?","options":["Par la fenêtre, avec une échelle","Par la cheminée","En creusant sous la maison"],"answer":1},
    {"q":"Comment sait-on que le troisième cochon est malin?","options":["Il prépare une marmite d’eau chaude dans la cheminée","Il court plus vite que le loup","Il se cache sous le lit"],"answer":0},
    {"q":"Comment les cochons se sentent-ils à la fin de l’histoire?","options":["Ils sont tristes et fâchés","Ils sont fiers, soulagés et heureux","Ils ont encore très peur"],"answer":1},
  ],
};
