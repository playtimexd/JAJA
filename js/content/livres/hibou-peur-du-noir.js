// hibou-peur-du-noir — storybook (see docs/LIVRES.md)
// ---- shared picture helpers (richer picture-book style: gradients, shading, layered scenery) ----
const O = '#3a3f55';
const DEFS = '<defs>'
  + '<radialGradient id="gOB" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#dba679"/><stop offset="1" stop-color="#b17748"/></radialGradient>'
  + '<radialGradient id="gOG" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#b3b0cc"/><stop offset="1" stop-color="#7b7899"/></radialGradient>'
  + '<radialGradient id="gBB" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#fdf0d6"/><stop offset="1" stop-color="#ecc994"/></radialGradient>'
  + '<radialGradient id="gBG" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#f7f3fc"/><stop offset="1" stop-color="#cfc8e0"/></radialGradient>'
  + '<radialGradient id="gFly" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff9a8" stop-opacity=".95"/><stop offset=".45" stop-color="#ffe45c" stop-opacity=".45"/><stop offset="1" stop-color="#ffe45c" stop-opacity="0"/></radialGradient>'
  + '<radialGradient id="gMoon" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="#fff6c8" stop-opacity=".5"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient>'
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
const path = (d, f = 'none', sw = 3, ex = '') => `<path d="${d}"${/fill=/.test(ex) ? '' : ` fill="${f}"`}${/stroke-width=/.test(ex) ? '' : sw_(sw)}${ex ? ' ' + ex : ''}/>`;
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


// ---- characters: Lulu (baby owl, red scarf), Mamie Chouette (grey, purple shawl, round glasses) ----
const BEAK = '#f4a03a';
const hibou = (x, y, s, who = 'baby', face = 'happy', wings = 'down', flip = false, rot = 0, look = '') => {
  const m = who === 'mamie';
  const c = m ? 'url(#gOG)' : 'url(#gOB)', d = m ? '#6f6c8f' : '#a06c40', dl = m ? '#8d8aae' : '#c08656', b = m ? 'url(#gBG)' : 'url(#gBB)', disc = m ? '#e3def0' : '#f6dcb2';
  const iris = m ? '#8a62b8' : '#f2a62e', er = m ? 8.5 : 11, ey = -80, ex = m ? 14 : 12;
  const dy = look === 'up' ? -3.5 : 0, dx = look === 'left' ? -3 : look === 'right' ? 3 : 0;
  const pupil = (cx) => face === 'scared' ? circ(cx + dx, ey + dy, 2.6, O, 0) + circ(cx + dx - 1, ey + dy - 1, .9, '#fff', 0)
    : circ(cx + dx, ey + dy, er * .66, iris, 0) + circ(cx + dx, ey + dy, face === 'wow' ? er * .46 : er * .34, O, 0) + circ(cx + dx - 2.2, ey + dy - 2.4, 2, '#fff', 0) + circ(cx + dx + 2, ey + dy + 2.4, 1, '#fff', 0);
  const closed = face === 'sleep' || face === 'love';
  const arc = (cx) => path(face === 'love' ? `M${cx - 7} ${ey} Q${cx} ${ey - 9} ${cx + 7} ${ey}` : `M${cx - 7} ${ey - 2} Q${cx} ${ey + 5} ${cx + 7} ${ey - 2}`, 'none', 3);
  const eyes = closed ? arc(-ex) + arc(ex) : circ(-ex, ey, er, '#fff', 2.5) + circ(ex, ey, er, '#fff', 2.5) + pupil(-ex) + pupil(ex);
  const brows = face === 'scared' ? path('M-22 -98 L-7 -103', 'none', 3) + path('M22 -98 L7 -103', 'none', 3) : face === 'wow' ? path('M-20 -98 Q-12 -102 -5 -98', 'none', 2.5) + path('M20 -98 Q12 -102 5 -98', 'none', 2.5) : '';
  const wD = (sg) => G(0, 0, 1, path('M24 -64 Q46 -62 43 -30 L39 -8 L33 -14 L28 -6 L23 -16 Q17 -40 24 -64Z', d) + path('M30 -52 Q36 -38 33 -20 M37 -50 Q42 -36 38 -22', 'none', 1.8, `stroke="${dl}"`), sg < 0);
  const wW = (sg) => G(0, 0, 1, path('M22 -62 Q56 -92 100 -78 Q104 -72 96 -68 Q102 -62 92 -58 Q98 -52 86 -50 Q90 -42 78 -40 Q52 -34 24 -30Z', d) + path('M40 -60 Q58 -56 78 -52 M38 -50 Q58 -46 74 -40', 'none', 1.8, `stroke="${dl}"`), sg < 0);
  const wU = (sg) => G(0, 0, 1, path('M22 -50 Q34 -70 52 -100 Q58 -108 60 -102 L58 -90 L68 -92 L62 -80 L70 -78 L60 -66 Q52 -58 42 -42Z', d) + path('M34 -62 Q46 -78 56 -94 M40 -56 Q54 -70 64 -80', 'none', 1.8, `stroke="${dl}"`), sg < 0);
  const behind = wings === 'wide' ? wW(1) + wW(-1) : wings === 'wave' ? wD(-1) + wU(1) : wings === 'cover' ? '' : wD(-1) + wD(1);
  const front = wings === 'cover' ? ell(-17, -66, 10, 22, d, 3, 'transform="rotate(-48 -17 -66)"') + ell(17, -66, 10, 22, d, 3, 'transform="rotate(48 17 -66)"') + path('M-26 -62 l5 6 M26 -62 l-5 6', 'none', 2, `stroke="${dl}"`) : '';
  const hair = m ? path('M-12 -106 Q-8 -112 -2 -108', 'none', 2, 'stroke="#fff"') + circ(-8, -110, 7, '#f1edf8', 2.2) + circ(8, -110, 7, '#f1edf8', 2.2) + circ(0, -114, 8, '#f7f4fc', 2.2) + circ(0, -109, 6, '#f7f4fc', 0) : '';
  const clothes = m
    ? path('M-33 -58 Q0 -42 33 -58 L38 -16 Q0 -2 -38 -16Z', '#a56bc9') + path('M6 -48 Q30 -40 35 -20 L38 -16 Q10 -6 0 -10Z', '#000', 0, 'opacity=".14"') + path('M-38 -16 l3 7 M-26 -10 l2 7 M-12 -6 l1 7 M2 -5 l-1 7 M16 -7 l-2 7 M28 -11 l-2 7 M37 -16 l-3 6', 'none', 2.5) + path('M-30 -46 q10 8 20 4 M10 -40 q10 4 20 -4', 'none', 2, 'stroke="#d2b0e8"') + circ(0, -40, 4.5, '#ffd84d', 2.2) + circ(-1.2, -41.2, 1.2, '#fff', 0)
    : path('M-19 -57 Q0 -47 19 -57 L18 -46 Q0 -38 -18 -46Z', '#e8504f', 2.5) + path('M-8 -46 L-6 -52 M2 -45 L3 -51 M11 -47 L12 -53', 'none', 1.6, 'stroke="#ff9a8a"') + path('M8 -46 l8 22 l-11 3 l-3 -19Z', '#e8504f', 2.5) + path('M10 -34 l5 -2 M12 -29 l5 -2', 'none', 1.6, 'stroke="#ff9a8a"');
  const frames = m ? [-ex, ex].map((cx) => `<circle cx="${cx}" cy="${ey}" r="12.6" fill="#dff0ff" fill-opacity=".3" stroke="#c4417a" stroke-width="3.6"/><path d="M${cx - 9} ${ey - 7} Q${cx - 6} ${ey - 11} ${cx - 1} ${ey - 11}" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`).join('') + path('M-2 -81 Q0 -85 2 -81', 'none', 3.4, 'stroke="#c4417a"') + path('M-26 -82 L-31 -85 M26 -82 L31 -85', 'none', 3.4, 'stroke="#c4417a"') : '';
  return G(x, y, s,
    shadow(0, 1, 32, 5) +
    path('M-10 -6 L-12 6 L0 2 L12 6 L10 -6Z', d, 2.5) +
    behind + [-9, 9].map((px) => path(`M${px - 8} 0 Q${px} -9 ${px + 8} 0 M${px - 3} 0 L${px - 3} -5 M${px + 3} 0 L${px + 3} -5`, BEAK, 3, `stroke="#c9801f"`)).join('') +
    ell(0, -42, 31, 37, c) + ell(0, -36, 20, 28, b, 0) + [[-8, -50], [8, -50], [0, -42], [-14, -36], [14, -36], [-7, -30], [7, -30], [0, -22], [-10, -20], [10, -20]].map(([a, bb]) => path(`M${a - 5} ${bb} q5 6 10 0`, 'none', 1.8, `stroke="${dl}"`)).join('') +
    clothes + (wings === 'cover' ? '' : '') +
    path('M-23 -98 L-29 -122 L-8 -106Z', d) + path('M23 -98 L29 -122 L8 -106Z', d) +
    circ(0, -80, 28, c) + ell(-ex, ey, 16, 16.5, disc, 0) + ell(ex, ey, 16, 16.5, disc, 0) + path('M0 -92 Q-3 -78 0 -66 Q3 -78 0 -92Z', disc, 0) + ell(-10, -97, 6, 3, dl, 0, 'opacity=".5"') + ell(10, -97, 6, 3, dl, 0, 'opacity=".5"') +
    eyes + brows + path('M-6 -73 L0 -60 L6 -73Z', BEAK, 2.5) + path('M-2 -70 L0 -64 L2 -70Z', '#ffd08a', 0) +
    (face === 'happy' ? path('M-9 -58 Q0 -53 9 -58', 'none', 0) : '') +
    (face === 'happy' || face === 'love' || face === 'wow' ? ell(-22, -69, 5, 3.6, '#ff8fa3', 0, 'opacity=".75"') + ell(22, -69, 5, 3.6, '#ff8fa3', 0, 'opacity=".75"') : '') +
    frames + hair + front, flip, rot);
};
// long wing that wraps from one body to the other (hug)
const hugWing = (x1, y1, x2, y2, who = 'baby') => {
  const L = Math.hypot(x2 - x1, y2 - y1), a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, d = who === 'mamie' ? '#6f6c8f' : '#a06c40', dl = who === 'mamie' ? '#8d8aae' : '#c08656';
  return `<g transform="translate(${x1} ${y1}) rotate(${a})">` + path(`M0 -12 Q${L * .5} -20 ${L} -9 L${L - 7} -4 L${L + 3} 1 L${L - 7} 6 L${L + 1} 12 Q${L * .5} 20 0 13Z`, d) + path(`M${L * .3} -5 Q${L * .6} -2 ${L - 10} -2 M${L * .3} 5 Q${L * .6} 6 ${L - 10} 4`, 'none', 1.8, `stroke="${dl}"`) + '</g>';
};
const raton = (x, y, s, wave = false, flip = false) => G(x, y, s,
  shadow(0, 1, 34, 5) +
  path('M20 -18 Q58 -28 52 -52 Q46 -66 62 -80 Q78 -62 74 -42 Q70 -12 26 -2Z', '#a3a3b4') + [[50, -30], [55, -46], [61, -62]].map(([a, bb]) => path(`M${a - 8} ${bb + 3} Q${a} ${bb - 4} ${a + 12} ${bb - 2}`, 'none', 6, 'stroke="#4a4a5a"')).join('') +
  rect(-15, -16, 11, 16, '#6e6e80', 3, 4) + rect(4, -16, 11, 16, '#6e6e80', 3, 4) + ell(-10, -2, 9, 4, '#4a4a5a', 2.5) + ell(10, -2, 9, 4, '#4a4a5a', 2.5) +
  ell(0, -34, 21, 23, '#a8a8ba') + ell(0, -28, 12, 16, '#ececf4', 0) +
  (wave ? ell(-26, -52, 6, 13, '#6e6e80', 3, 'transform="rotate(-35 -26 -52)"') + circ(-33, -63, 4.5, '#4a4a5a', 2.5) : ell(-23, -32, 6, 13, '#6e6e80', 3, 'transform="rotate(10 -23 -32)"')) + ell(23, -32, 6, 13, '#6e6e80', 3, 'transform="rotate(-10 23 -32)"') +
  circ(-16, -80, 8, '#a8a8ba') + circ(16, -80, 8, '#a8a8ba') + circ(-16, -80, 3.6, '#6e6e80', 0) + circ(16, -80, 3.6, '#6e6e80', 0) +
  ell(0, -62, 21, 18, '#bcbccb') + path('M-21 -66 Q-10 -80 0 -68 Q10 -80 21 -66 L19 -55 Q10 -50 0 -56 Q-10 -50 -19 -55Z', '#3f4256', 2.5) + ell(0, -50, 10, 7.5, '#f0f0f6', 2.5) + path('M-3 -66 Q0 -70 3 -66', 'none', 0) +
  circ(-8.5, -62, 5, '#fff', 0) + circ(8.5, -62, 5, '#fff', 0) + circ(-8.5, -62, 2.6, O, 0) + circ(8.5, -62, 2.6, O, 0) + circ(-9.4, -63.2, 1, '#fff', 0) + circ(7.6, -63.2, 1, '#fff', 0) + ell(0, -53, 3.6, 2.8, O, 0) + path('M-6 -47 Q0 -41 6 -47', 'none', 2.4) + path('M-14 -52 l-12 -2 M-14 -49 l-12 3 M14 -52 l12 -2 M14 -49 l12 3', 'none', 1.5, 'stroke="#f0f0f6"'), flip);
const grenouille = (x, y, s, sing = false) => G(x, y, s,
  shadow(0, 1, 34, 5) + ell(-22, -4, 14, 6, '#4fae4b') + ell(22, -4, 14, 6, '#4fae4b') + ell(0, -22, 30, 22, '#6fcf63') + ell(0, -16, 18, 13, '#e0f6b8', 0) + ell(-12, -30, 12, 8, '#8be07f', 0, 'opacity=".7"') +
  ell(-23, -10, 6.5, 11, '#5fbf5a', 3, 'transform="rotate(20 -23 -10)"') + ell(23, -10, 6.5, 11, '#5fbf5a', 3, 'transform="rotate(-20 23 -10)"') + circ(-16, -6, 3, '#e0f6b8', 1.5) +
  circ(-15, -41, 11, '#6fcf63') + circ(15, -41, 11, '#6fcf63') + circ(-15, -42, 7.5, '#fff', 2) + circ(15, -42, 7.5, '#fff', 2) + circ(-15, -42, 3.6, O, 0) + circ(15, -42, 3.6, O, 0) + circ(-16.2, -43.4, 1.3, '#fff', 0) + circ(13.8, -43.4, 1.3, '#fff', 0) +
  circ(-4, -34, 1.4, '#3a8a3a', 0) + circ(4, -34, 1.4, '#3a8a3a', 0) +
  (sing ? ell(0, -23, 15, 11, '#8a2f45', 2.5) + ell(0, -18, 9, 5, '#ff8a8a', 0) + circ(0, -33, 9, '#9be58f', 2) : path('M-16 -27 Q0 -17 16 -27', 'none', 2.8)));
const chauve = (x, y, s, rot = 0) => G(x, y, s,
  path('M-8 -6 Q-32 -30 -62 -12 Q-50 -8 -46 6 Q-38 -2 -30 8 Q-22 0 -8 10Z', '#6a5a92') + path('M8 -6 Q32 -30 62 -12 Q50 -8 46 6 Q38 -2 30 8 Q22 0 8 10Z', '#6a5a92') + path('M-14 -2 L-40 -10 M-14 2 L-34 4 M14 -2 L40 -10 M14 2 L34 4', 'none', 1.8, 'stroke="#4f4378"') +
  ell(0, 0, 12, 16, '#5a4d88') + ell(0, 4, 7, 9, '#7a6cab', 0) + path('M-10 -12 L-13 -28 L-1 -17Z M10 -12 L13 -28 L1 -17Z', '#5a4d88') + path('M-10 -15 L-11 -23 L-5 -17Z M10 -15 L11 -23 L5 -17Z', '#e8a0c0', 0) + circ(-4.5, -8, 3, '#fff', 0) + circ(4.5, -8, 3, '#fff', 0) + circ(-4.5, -8, 1.4, O, 0) + circ(4.5, -8, 1.4, O, 0) + path('M-5 -2 Q0 3 5 -2', 'none', 2) + path('M-2.5 -1.5 l1 3 l1 -3 M1.5 -1.5 l1 3 l1 -3', '#fff', 0.8), false, rot);

// ---- shared scenery ----
const stars = (n, seed = 1, ymax = 170) => Array.from({ length: n }, (_, i) => { const px = Math.round(rnd(i + seed) * 390 + 5), py = Math.round(rnd(i + 40 + seed) * ymax + 8), r = 3 + Math.round(rnd(i + 80 + seed) * 4); return circ(px, py, r * 2, '#fff6c8', 0).replace('/>', ' opacity=".05"/>') + star(px, py, r); }).join('');
const night = (n = 14, seed = 1) => sky('#171e4d', '#4f4f9f') + stars(n, seed);
const nightGround = (y = 220, c1 = '#2b4a6b', c2 = '#244a52', far = '#34457a') => path(`M-5 ${y - 50} Q60 ${y - 96} 130 ${y - 58} Q200 ${y - 30} 270 ${y - 74} Q340 ${y - 100} 405 ${y - 56} L405 ${y} L-5 ${y}Z`, far, 0) + path(`M-5 ${y - 24} Q90 ${y - 56} 180 ${y - 30} Q270 ${y - 8} 340 ${y - 40} Q380 ${y - 50} 405 ${y - 34} L405 ${y + 10} L-5 ${y + 10}Z`, c1) + vg('gGr', c2, '#1b3744') + `<rect x="-5" y="${y}" width="410" height="${305 - y}" fill="url(#gGr)" stroke="none"/>` + line(-5, y, 405, y, O, 3) + [0, 1, 2, 3, 4].map((i) => ell(Math.round(rnd(i + 7) * 400), Math.round(y + 12 + rnd(i + 17) * (290 - y)), 40 + rnd(i) * 30, 5, '#3a7a78', 0, 'opacity=".3"')).join('') + tufts(y + 6, 296, 26, 5, '#2f6a63');
const oak = (x, y, s, o = {}) => G(x, y, s,
  shadow(0, 2, 56, 8) + path('M-38 0 Q-30 -60 -22 -112 L22 -112 Q30 -60 38 0Z', o.t || '#7a5236') + path('M-26 0 Q-20 -60 -14 -108 L-4 -108 Q-8 -50 -10 0Z', '#000', 0, 'opacity=".1"') + path('M14 -104 L16 -30 M-8 -90 L-10 -40 M6 -70 L9 -20', 'none', 2, 'stroke="#5e3f29"') + path('M-38 0 Q-52 4 -58 8 M38 0 Q52 4 58 8', 'none', 4, `stroke="${o.t || '#7a5236'}"`) +
  path('M-13 -26 L-13 -58 Q0 -78 13 -58 L13 -26Z', '#2a1d25') + path('M-13 -26 L-13 -58 Q-4 -70 2 -72 L2 -26Z', '#000', 0, 'opacity=".25"') +
  path('M30 -92 L128 -102 L130 -86 L30 -76Z', o.t || '#7a5236') + path('M60 -92 q12 -4 24 -1 M96 -97 l10 -2', 'none', 1.8, 'stroke="#5e3f29"') + path('M128 -102 l10 -6 M130 -88 l10 2', 'none', 4, `stroke="${o.t || '#7a5236'}"`) +
  circ(0, -152, 50, o.c || '#69b85f') + circ(-48, -126, 36, o.c || '#69b85f') + circ(48, -126, 36, o.c || '#69b85f') + circ(128, -108, 22, o.c || '#69b85f') +
  `<g stroke="none">${circ(0, -151, 48.5, o.c || '#69b85f', 0)}${circ(-48, -126, 34.5, o.c || '#69b85f', 0)}${circ(48, -126, 34.5, o.c || '#69b85f', 0)}${rect(-60, -140, 120, 30, o.c || '#69b85f', 0)}${circ(-14, -168, 20, o.l || '#8ed07c', 0)}${circ(-52, -136, 14, o.l || '#8ed07c', 0)}${circ(30, -160, 11, o.l || '#8ed07c', 0)}${circ(52, -108, 12, o.d || '#4f9a4a', 0)}${ell(8, -118, 26, 12, o.d || '#4f9a4a', 0, 'opacity=".6"')}${circ(126, -112, 16, o.l || '#8ed07c', 0)}</g>`);
const eyesPair = (x, y) => circ(x - 6, y, 6, '#ffe45c', 0).replace('/>', ' opacity=".25"/>') + ell(x - 6, y, 3.5, 4.5, '#ffe45c', 0) + ell(x + 6, y, 3.5, 4.5, '#ffe45c', 0) + circ(x - 6, y - 1, 1.4, '#fff', 0) + circ(x + 6, y - 1, 1.4, '#fff', 0);
const bigMoon = (x, y, r) => circ(x, y, r * 2.4, 'url(#gMoon)', 0) + circ(x, y, r, '#fff1a8') + circ(x - r * .3, y - r * .2, r * .2, '#f1dd8a', 0) + circ(x + r * .35, y + r * .25, r * .27, '#f1dd8a', 0) + circ(x + r * .1, y - r * .5, r * .12, '#f1dd8a', 0) + circ(x - r * .35, y + r * .45, r * .1, '#f1dd8a', 0);
const fly = (x, y) => circ(x, y, 13, 'url(#gFly)', 0) + ell(x - 2.5, y - 3, 3.2, 1.8, '#fff', 0, 'opacity=".7"') + ell(x + 2.5, y - 3, 3.2, 1.8, '#fff', 0, 'opacity=".7"') + ell(x, y, 2.6, 2.2, '#fff6a0', 0);
const log = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 54, 6) + rect(-46, -20, 92, 20, '#8a5a3b', 3, 9) + rect(-46, -20, 92, 7, '#a8744c', 0, 5) + ell(-46, -10, 6, 10, '#d3a475', 2.5) + ell(-46, -10, 2.5, 5, '#b98558', 0) + path('M-20 -14 q10 -3 20 0 M8 -8 q10 3 20 0', 'none', 2, 'stroke="#6b4329"'));
const darkPines = () => pine(30, 236, 1.3, '#1f5a55') + pine(78, 250, 1, '#276b60') + pine(360, 240, 1.2, '#1f5a55') + pine(322, 254, .9, '#276b60');
const butterfly = (x, y, c) => ell(x - 6, y - 2, 6, 5, c, 2) + ell(x + 6, y - 2, 6, 5, c, 2) + ell(x - 4, y + 4, 4, 3.5, c, 2) + ell(x + 4, y + 4, 4, 3.5, c, 2) + line(x, y - 5, x, y + 6, O, 2.5);
const note = (x, y, c = '#fff') => `<g fill="${c}" stroke="none"><ellipse cx="${x}" cy="${y}" rx="4.5" ry="3.4" transform="rotate(-20 ${x} ${y})"/></g>` + line(x + 4, y - 1, x + 4, y - 14, c, 2) + path(`M${x + 4} ${y - 14} q6 1 6 6`, 'none', 2, `stroke="${c}"`);
const heart = (x, y, s = 1) => G(x, y, s, path('M0 8 C-18 -4 -10 -18 0 -8 C10 -18 18 -4 0 8Z', '#ff6f91', 2.5));

export const book = {
  id: 'hibou-peur-du-noir',
  title: 'Le petit hibou qui avait peur du noir',
  emoji: '🦉',
  level: 1,
  minutes: 7,
  cover: svg(night(22, 3) + bigMoon(300, 80, 36) + nightGround(238) + pine(352, 244, 1.3, '#1f5a55') + pine(388, 254, 1, '#276b60') + oak(70, 262, 1.15, { c: '#2f7a62', l: '#43956f', d: '#25604f', t: '#6a4630' }) + hibou(185, 282, 1.3, 'baby', 'happy', 'wave') + hibou(268, 284, 1.45, 'mamie', 'happy', 'down') + fly(140, 205) + fly(330, 210) + fly(30, 250) + fly(225, 150) + fly(360, 160)),
  pages: [
    { text: 'Lulu est un petit hibou. Le jour, il joue dans le grand chêne.',
      svg: svg(sky('#9fdcf7', '#eafaff') + sun(345, 48) + cloud(270, 70, .8) + cloud(40, 30, .7) + lawn(222) + oak(135, 260, 1.25) + hibou(235, 152, 1.15, 'baby', 'happy', 'wave') + butterfly(330, 150, '#ff9ec0') + butterfly(350, 190, '#ffd84d') + butterfly(70, 170, '#fff') + bush(345, 255, 1.3) + flower(260, 285) + flower(300, 282, '#fff') + flower(22, 280, '#ffd84d') + fg()) },
    { text: 'Mais le soir, le ciel devient tout noir. Lulu a peur! Il se cache sous ses ailes.',
      svg: svg(sky('#241f58', '#e8805a') + star(60, 30, 4) + star(150, 50, 3) + star(300, 24, 4) + star(350, 70, 3) + circ(330, 160, 70, '#ffb070', 0).replace('/>', ' opacity=".35"/>') + circ(330, 160, 22, '#ffd27a', 0) + nightGround(228, '#2f3b63', '#1f3a4a', '#4a3f78') + oak(320, 266, 1.15, { c: '#1f5a55', l: '#2d7467', d: '#184a45', t: '#4a3a3f' }) + bush(55, 258, 1.4, '#1f4a46') + eyesPair(46, 236) + eyesPair(82, 246) + eyesPair(120, 270) + hibou(195, 290, 1.65, 'baby', 'scared', 'cover') + fg('#1f4a46')) },
    { text: 'Mamie Chouette arrive. Elle dit doucement: « Viens voir la nuit avec moi. »',
      svg: svg(sky('#2c2760', '#c9719b') + star(60, 30, 4) + star(150, 50, 3) + star(250, 24, 4) + nightGround(228, '#2f3b63', '#1f3a4a', '#4a3f78') + oak(52, 266, 1.1, { c: '#1f5a55', l: '#2d7467', d: '#184a45', t: '#4a3a3f' }) + hibou(150, 288, 1.4, 'baby', 'scared', 'down') + hibou(290, 290, 1.7, 'mamie', 'happy', 'down') + hugWing(262, 228, 196, 200, 'mamie') + heart(212, 92, 1.4) + fg('#1f4a46')) },
    { text: 'Dehors, Lulu regarde en haut. Oh! Des milliers d’étoiles brillent dans le ciel!',
      svg: svg(night(40, 7) + star(200, 40, 10, '#fff6b0') + star(80, 100, 8, '#fff6b0') + star(330, 90, 9, '#fff6b0') + path('M300 20 Q340 40 372 70', 'none', 3, 'stroke="#fff6b0" opacity=".8"') + nightGround(240) + hibou(135, 286, 1.45, 'baby', 'wow', 'wave', false, 0, 'up') + hibou(262, 290, 1.65, 'mamie', 'happy', 'down', false, 0, 'up') + fg('#1f4a46')) },
    { text: 'La lune est ronde comme un gros bonbon. Elle éclaire toute la forêt.',
      svg: svg(night(12, 5) + bigMoon(200, 92, 58) + nightGround(238, '#2f5a7a', '#2a5a5f') + darkPines() + log(200, 272, 1.45) + hibou(155, 250, 1.2, 'baby', 'wow', 'down', false, 0, 'up') + hibou(250, 250, 1.35, 'mamie', 'happy', 'down', false, 0, 'up') + fg('#1f4a46')) },
    { text: 'Des lucioles dansent autour de Lulu. Elles font de petites lumières jaunes.',
      svg: svg(night(8, 9) + nightGround(208, '#25506a', '#245047') + darkPines() + bush(60, 268, 1.4, '#1f4a46') + bush(345, 272, 1.4, '#1f4a46') + hibou(200, 290, 1.6, 'baby', 'wow', 'wave') + [[120, 150], [165, 108], [260, 130], [305, 175], [100, 225], [295, 240], [215, 80], [335, 110], [60, 130], [150, 195], [250, 200]].map(([a, b]) => fly(a, b)).join('') + fg('#1f4a46')) },
    { text: 'Un raton laveur arrive sur le tronc. « Bonsoir, Lulu! » dit-il.',
      svg: svg(night(14, 11) + bigMoon(90, 66, 28) + nightGround(228, '#2f5a7a', '#2a5a5f') + darkPines() + log(270, 270, 1.9) + raton(285, 246, 1.3, true) + hibou(135, 286, 1.45, 'baby', 'happy', 'wave') + hibou(48, 290, 1.05, 'mamie', 'happy', 'down') + fg('#1f4a46')) },
    { text: 'Au bord de l’étang, une grenouille chante. Croa, croa!',
      svg: svg(night(12, 13) + bigMoon(318, 56, 26) + nightGround(200, '#2f5a7a', '#2a5a5f') + vg('gPond', '#4a85b8', '#2f5f90') + '<ellipse cx="278" cy="252" rx="130" ry="46" fill="url(#gPond)"/>' + ell(300, 240, 36, 5, '#fff6b0', 0, 'opacity=".4"') + ell(248, 246, 70, 9, '#6aa0d0', 0, 'opacity=".4"') + path('M195 262 q10 -6 22 0 M320 276 q10 -6 22 0 M350 240 q8 -4 16 0', 'none', 2.5, 'stroke="#fff" opacity=".55"') + [[380, 215], [366, 222], [392, 224]].map(([a, b]) => line(a, b, a, b + 30, '#4a7a3a', 3) + ell(a, b - 4, 4, 11, '#8a5a3b', 2.5)).join('') + ell(245, 266, 34, 8, '#4faa4a', 2.5) + grenouille(245, 262, 1.5, true) + note(318, 205) + note(342, 188) + note(300, 168) + hibou(80, 282, 1.45, 'baby', 'wow', 'down') + hibou(168, 286, 1.25, 'mamie', 'happy', 'down') + bush(20, 262, 1, '#1f4a46') + fg('#1f4a46')) },
    { text: 'Une chauve-souris vole tout près. Elle fait un grand cercle devant la lune.',
      svg: svg(night(10, 17) + bigMoon(250, 92, 52) + path('M120 190 Q130 70 250 40 Q330 50 345 120', 'none', 3, 'stroke="#fff" stroke-dasharray="6 8" opacity=".5"') + chauve(240, 96, 1.7, -10) + nightGround(238) + darkPines() + hibou(110, 288, 1.5, 'baby', 'wow', 'wave', false, 0, 'up') + hibou(200, 290, 1.55, 'mamie', 'happy', 'down', false, 0, 'up') + fg('#1f4a46')) },
    { text: 'Lulu n’a plus peur. Il ouvre grand ses ailes. La nuit est belle!',
      svg: svg(night(30, 21) + bigMoon(318, 56, 26) + nightGround(244, '#2f5a7a', '#2a5a5f') + darkPines() + hibou(200, 262, 1.9, 'baby', 'love', 'wide') + raton(46, 276, .95, true) + chauve(330, 150, 1, 8) + fly(110, 130) + fly(300, 225) + fly(105, 215) + fly(330, 262) + fly(70, 70) + fg('#1f4a46')) },
    { text: 'De retour dans l’arbre, Lulu serre Mamie dans ses ailes. « J’aime la nuit! » dit-il.',
      svg: (() => {
        const bk = rect(0, 0, 400, 300, '#a8764f', 0) + [0, 1, 2, 3, 4].map((i) => path(`M${i * 90 - 20} 0 Q${i * 90 + 10} 150 ${i * 90 - 10} 300`, 'none', 3, 'stroke="#8a5a3b" opacity=".6"')).join('') + [0, 1, 2, 3, 4, 5].map((i) => ell(Math.round(rnd(i + 3) * 380 + 10), Math.round(rnd(i + 9) * 150 + 20), 4, 7, '#8a5a3b', 0, 'opacity=".4"')).join('') + rect(0, 258, 400, 42, '#6b8a45', 0) + path('M0 262 q30 -10 60 0 t60 0 t60 0 t60 0 t60 0 t60 0 t60 0', '#86a858') + path('M-10 300 Q80 240 200 246 Q320 240 410 300Z', '#e9d6a8', 3) + path('M40 290 q80 -30 160 -24 q80 -6 150 24', 'none', 2, 'stroke="#c9b27a"');
        const win = vg('gWn', '#171e4d', '#4f4f9f') + '<rect x="150" y="26" width="100" height="100" rx="50" fill="url(#gWn)" stroke="#6a4630" stroke-width="6"/>' + moon(205, 70, 16) + star(176, 50, 4) + star(228, 100, 3) + star(188, 100, 3);
        return svg(bk + win + hibou(150, 268, 1.5, 'baby', 'love', 'down', false, 10) + hibou(262, 270, 1.65, 'mamie', 'love', 'down', false, -8) + hugWing(176, 205, 285, 200, 'baby') + hugWing(238, 200, 140, 214, 'mamie') + heart(318, 96, 1.6) + heart(80, 100, 1.1) + heart(345, 150, 1));
      })() },
    { text: 'Lulu ferme les yeux. Bonne nuit, petit hibou!',
      svg: svg(rect(0, 0, 400, 300, '#8e5f3f', 0) + [0, 1, 2, 3].map((i) => path(`M${i * 120 - 20} 0 Q${i * 120 + 10} 150 ${i * 120 - 10} 300`, 'none', 3, 'stroke="#764a30" opacity=".7"')).join('') + rect(0, 262, 400, 38, '#6b8a45', 0) + vg('gWn', '#171e4d', '#4f4f9f') + '<rect x="280" y="26" width="92" height="92" rx="46" fill="url(#gWn)" stroke="#6a4630" stroke-width="6"/>' + moon(330, 70, 16) + star(300, 50, 3) + star(352, 98, 3) + path('M80 280 Q165 220 250 280Z', '#e9d6a8', 3) + hibou(165, 262, 1.55, 'baby', 'sleep', 'down') + path('M70 238 Q165 214 262 238 L266 276 Q165 296 66 276Z', '#e8504f') + path('M82 244 q84 -18 170 0 M78 258 q88 -12 178 0', 'none', 2, 'stroke="#ff9a8a"') + hibou(335, 282, 1.4, 'mamie', 'sleep', 'down') + path('M40 100 l16 0 l-16 18 l16 0 M70 70 l12 0 l-12 14 l12 0', 'none', 3, 'stroke="#fff6b0"') + star(150, 60, 4) + star(95, 100, 3)) },
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
