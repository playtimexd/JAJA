// Shared picture kit for the English storybook shelf (js/content/livres-en/*.js).
// Same flat picture-book style as the French books (docs/LIVRES.md): #3a3f55 outlines, gradients, layered scenery.
// Every picture is an isolated <img>, so the fixed gradient ids below are safe.
export const O = '#3a3f55';
export const SKIN = { light: '#f7d2b6', peach: '#f1c19a', tan: '#d9a173', brown: '#a8704a', dark: '#7a4e32' };
const DEFS = '<defs>'
  + '<radialGradient id="gSun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff3a0" stop-opacity=".9"/><stop offset="1" stop-color="#fff3a0" stop-opacity="0"/></radialGradient>'
  + '<linearGradient id="gSnow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dbe8f5"/></linearGradient>'
  + '<linearGradient id="gWat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86cdf2"/><stop offset="1" stop-color="#4c97cf"/></linearGradient>'
  + '<linearGradient id="gIce" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6f6ff"/><stop offset="1" stop-color="#b6dcf2"/></linearGradient>'
  + '<linearGradient id="gWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c98f5c"/><stop offset="1" stop-color="#9c6a40"/></linearGradient>'
  + '<radialGradient id="gLamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".85"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient>'
  + '</defs>';
export const svg = (b) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${DEFS}<g stroke="#3a3f55" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${b}</g></svg>`;
const sw_ = (sw) => (sw === 3 ? '' : sw ? ` stroke-width="${sw}"` : ' stroke="none"');
export const vg = (id, a, b) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>`;
export const sky = (a, b) => vg('gSky', a, b) + '<rect width="400" height="300" fill="url(#gSky)" stroke="none"/>';
export const ell = (cx, cy, rx, ry, f, sw = 3, ex = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"${sw_(sw)}${ex ? ' ' + ex : ''}/>`;
export const circ = (cx, cy, r, f, sw = 3, ex = '') => ell(cx, cy, r, r, f, sw, ex);
export const rect = (x, y, w, h, f, sw = 3, r = 0, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}"${r ? ` rx="${r}"` : ''} fill="${f}"${sw_(sw)}${ex ? ' ' + ex : ''}/>`;
export const path = (d, f = 'none', sw = 3, ex = '') => `<path d="${d}" fill="${f}"${sw_(sw)}${ex ? ' ' + ex : ''}/>`;
export const line = (x1, y1, x2, y2, c = O, sw = 3, ex = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${c === O ? '' : ` stroke="${c}"`}${sw_(sw)}${ex ? ' ' + ex : ''}/>`;
export const poly = (pts, c = O, sw = 3, ex = '') => `<polyline points="${pts.map((p) => p.join(',')).join(' ')}" fill="none"${c === O ? '' : ` stroke="${c}"`}${sw_(sw)}${ex ? ' ' + ex : ''}/>`;
export const G = (x, y, s, inner, flip = false, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})">${inner}</g>`;
export const rnd = (i) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
export const shadow = (x, y, rx, ry = rx * .22) => ell(x, y, rx, ry, '#2a3a2a', 0, 'opacity=".2"');
export const cloud = (x, y, s = 1, c = '#fff') => G(x, y, s, `<g fill="${c}" stroke="none"><ellipse cx="0" cy="2" rx="34" ry="13" fill="#dbe9f6"/><ellipse cx="0" cy="0" rx="32" ry="12"/><ellipse cx="-18" cy="-8" rx="15" ry="11"/><ellipse cx="8" cy="-13" rx="19" ry="15"/><ellipse cx="22" cy="-4" rx="12" ry="9"/></g>`);
export const sun = (x, y, r = 24) => circ(x, y, r * 2.6, 'url(#gSun)', 0) + path(Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, k = Math.cos(a), n = Math.sin(a); return `M${Math.round(x + k * (r + 5))} ${Math.round(y + n * (r + 5))}L${Math.round(x + k * (r + 13))} ${Math.round(y + n * (r + 13))}`; }).join(''), 'none', 4, 'stroke="#f7b733"') + circ(x, y, r, '#ffd84d') + circ(x - 7, y - 7, r * .4, '#fff3a0', 0);
export const star = (x, y, r = 5, f = '#ffe58a') => `<path d="M${x} ${y - r} L${x + r * .3} ${y - r * .3} L${x + r} ${y} L${x + r * .3} ${y + r * .3} L${x} ${y + r} L${x - r * .3} ${y + r * .3} L${x - r} ${y} L${x - r * .3} ${y - r * .3}Z" fill="${f}" stroke="none"/>`;
export const stars = (n, seed = 1, y1 = 150) => Array.from({ length: n }, (_, i) => star(Math.round(rnd(i + seed) * 400), Math.round(rnd(i + seed + 30) * y1), 2 + rnd(i + seed + 60) * 3.5)).join('');
export const moon = (x, y, r = 22) => circ(x, y, r * 1.9, '#fff6c8', 0, 'opacity=".2"') + path(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * .65} ${r} 0 1 1 ${x} ${y - r}Z`, '#fff1a8', 3);
export const tuft = (x, y, s = 1, c = '#5aa04a') => `<path d="M${x - 5 * s} ${y} Q${x - 6 * s} ${y - 9 * s} ${x - 9 * s} ${y - 13 * s} Q${x - 2 * s} ${y - 9 * s} ${x - 1 * s} ${y - 16 * s} Q${x + 2 * s} ${y - 9 * s} ${x + 8 * s} ${y - 12 * s} Q${x + 5 * s} ${y - 6 * s} ${x + 5 * s} ${y}Z" fill="${c}" stroke="none"/>`;
export const tufts = (y0, y1, n, seed = 1, c = '#5aa04a', s = 1) => Array.from({ length: n }, (_, i) => tuft(Math.round(rnd(i + seed) * 400), Math.round(y0 + rnd(i + seed + 40) * (y1 - y0)), s * (.7 + rnd(i + seed + 80) * .6), c)).join('');
export const flower = (x, y, c = '#ff7aa8') => `${line(x, y, x, y - 12, '#3f8f4f', 2.5)}${circ(x - 3, y - 14, 3.2, c, 1.5)}${circ(x + 3, y - 14, 3.2, c, 1.5)}${circ(x, y - 17, 3.2, c, 1.5)}${circ(x, y - 12, 3.2, c, 1.5)}${circ(x, y - 14.5, 2, '#ffe066', 0)}`;
export const tree = (x, y, s = 1, c = '#69b85f', hi = '#a2dd8f') => G(x, y, s, `${shadow(0, 0, 34)}${path('M-7 0 L-5 -38 L5 -38 L7 0Z', '#8a5a3b')}${line(-2, -6, -2, -30, '#6b4329', 2)}${circ(0, -60, 26, c)}${circ(-19, -44, 18, c)}${circ(19, -44, 18, c)}<g stroke="none">${circ(0, -59, 24.5, c, 0)}${circ(-19, -44, 16.5, c, 0)}${circ(19, -44, 16.5, c, 0)}${rect(-16, -48, 32, 16, c, 0)}</g>${ell(8, -52, 14, 18, '#2d6b49', 0, 'opacity=".22"')}${circ(-9, -70, 7, hi, 0)}${circ(-22, -48, 5, hi, 0)}`);
// bare winter / maple tree (no leaves)
export const bareTree = (x, y, s = 1, c = '#7a5236', snow = false) => G(x, y, s, `${shadow(0, 0, 30)}${path('M-8 0 L-5 -60 L5 -60 L8 0Z', c)}${path('M-3 -50 L-30 -86 M-2 -62 L-6 -104 M3 -56 L28 -92 M-18 -72 L-34 -76 M16 -76 L34 -80 M-5 -90 L-18 -108 M24 -86 L26 -106', 'none', 6, `stroke="${c}"`)}${snow ? path('M-30 -88 l10 -2 M-8 -105 l6 -1 M26 -94 l8 -2 M-36 -78 l6 -1', 'none', 4, 'stroke="#fff"') : ''}`);
export const pine = (x, y, s = 1, c = '#3f8f63', snow = false) => G(x, y, s, `${shadow(0, 0, 30)}${rect(-5, -22, 10, 22, '#7a5236', 3)}${path('M-32 -18 L0 -64 L32 -18Z', c)}${path('M-26 -48 L0 -94 L26 -48Z', c)}${path('M-20 -76 L0 -116 L20 -76Z', c)}${path('M0 -64 L32 -18 L10 -18Z', '#2d6b49', 0, 'opacity=".4"')}${path('M0 -94 L26 -48 L8 -48Z', '#2d6b49', 0, 'opacity=".4"')}${snow ? path('M-8 -104 L0 -116 L8 -104 Q0 -99 -8 -104Z', '#fff', 0) + path('M-14 -68 L0 -94 L14 -68 Q0 -61 -14 -68Z', '#fff', 0) + path('M-20 -40 L0 -64 L20 -40 Q0 -32 -20 -40Z', '#fff', 0) : ''}`);
export const bush = (x, y, s = 1, c = '#58a84f') => G(x, y, s, `${shadow(0, 0, 28)}${circ(-14, -10, 14, c)}${circ(14, -10, 14, c)}${circ(0, -16, 17, c)}<g stroke="none">${circ(-14, -10, 12.5, c, 0)}${circ(14, -10, 12.5, c, 0)}${circ(0, -16, 15.5, c, 0)}${rect(-14, -14, 28, 14, c, 0)}${circ(-6, -22, 5, '#8bd37b', 0)}${circ(-18, -14, 3.5, '#8bd37b', 0)}</g>`);
export const hills = (y, far = '#c3e8c0', mid = '#a9dc8a') => path(`M-5 ${y - 44} Q50 ${y - 82} 120 ${y - 52} Q190 ${y - 28} 250 ${y - 62} Q330 ${y - 96} 405 ${y - 48} L405 ${y} L-5 ${y}Z`, far, 0) + path(`M-5 ${y - 24} Q70 ${y - 56} 160 ${y - 30} Q250 ${y - 6} 320 ${y - 36} Q370 ${y - 52} 405 ${y - 30} L405 ${y + 10} L-5 ${y + 10}Z`, mid);
export const lawn = (y = 205, a = '#8ed26c', b = '#62b04a', far = '#c3e8c0', mid = '#a9dc8a', tc = '#4f9a43') => hills(y, far, mid) + vg('gGr', a, b) + `<rect x="-5" y="${y}" width="410" height="${305 - y}" fill="url(#gGr)" stroke="none"/>` + line(-5, y, 405, y, O, 3) + [0, 1, 2, 3, 4, 5].map((i) => ell(Math.round(rnd(i + 7) * 400), Math.round(y + 14 + rnd(i + 17) * (290 - y)), 40 + rnd(i) * 30, 5 + rnd(i + 5) * 4, '#b6e592', 0, 'opacity=".4"')).join('') + tufts(y + 6, 296, 30, 3, tc);
// snowy ground with soft drifts and blue shadows
export const snowGround = (y = 205, hillsToo = true) => (hillsToo ? hills(y, '#e3eef8', '#f2f7fc') : '') + `<rect x="-5" y="${y}" width="410" height="${305 - y}" fill="url(#gSnow)" stroke="none"/>` + line(-5, y, 405, y, O, 3) + [0, 1, 2, 3, 4].map((i) => ell(Math.round(rnd(i + 3) * 400), Math.round(y + 18 + rnd(i + 13) * (280 - y)), 50 + rnd(i) * 30, 6 + rnd(i + 5) * 4, '#c4d8ec', 0, 'opacity=".55"')).join('');
export const snowflakes = (n = 40, seed = 1, c = '#fff') => Array.from({ length: n }, (_, i) => circ(Math.round(rnd(i + seed) * 400), Math.round(rnd(i + seed + 50) * 300), (1.6 + rnd(i + seed + 90) * 2.6).toFixed(1), c, 0, 'opacity=".9"')).join('');
export const rain = (n = 40, seed = 1) => Array.from({ length: n }, (_, i) => { const x = Math.round(rnd(i + seed) * 410), y = Math.round(rnd(i + seed + 50) * 290); return line(x, y, x - 4, y + 12, '#9cc7ee', 2.5); }).join('');
export const day = (sx = 335) => sky('#79c6f1', '#eaf8ff') + sun(sx, 52, 22) + cloud(sx < 150 ? 160 : 70, 58) + cloud(sx < 150 ? 290 : 225, 36, .8);
export const winterDay = (sx = 335) => sky('#9fd3f4', '#f1f9ff') + sun(sx, 50, 20) + cloud(sx < 150 ? 170 : 80, 56) + cloud(sx < 150 ? 300 : 230, 34, .8);
export const greyDay = () => sky('#9aa9bd', '#dde4ec') + cloud(80, 50, 1.3, '#eef1f5') + cloud(250, 36, 1.1, '#eef1f5') + cloud(360, 70, .9, '#eef1f5');
export const night = (seed = 3) => sky('#1b2455', '#4b4f9a') + stars(28, seed) + moon(330, 58);
export const fg = (c = '#3f8f4f') => tuft(8, 304, 2.2, c) + tuft(30, 306, 1.7, c) + tuft(392, 304, 2.4, c) + tuft(368, 306, 1.6, c);
export const heart = (x, y, s = 1, c = '#ff6f91') => G(x, y, s, path('M0 8 C-18 -4 -10 -18 0 -8 C10 -18 18 -4 0 8Z', c, 2.5));
export const sparkle = (x, y, s = 1, c = '#ffd84d') => G(x, y, s, path('M0 -12 L3 -3 L12 0 L3 3 L0 12 L-3 3 L-12 0 L-3 -3Z', c, 2));
export const motion = (x, y, n = 3, len = 22, dir = 1) => Array.from({ length: n }, (_, i) => line(x, y + i * 9, x - dir * (len - i * 4), y + i * 9, '#ffffff', 3, 'opacity=".9"')).join('');
export const sweat = (x, y, s = 1) => G(x, y, s, path('M0 -8 q-6 9 0 12 q6 -3 0 -12Z', '#9fdcff', 2));
export const zzz = (x, y, s = 1) => G(x, y, s, path('M0 0 h10 l-10 10 h10 M14 -14 h7 l-7 7 h7 M24 -24 h5 l-5 5 h5', 'none', 2.4, 'stroke="#5a6a8a"'));
export const note = (x, y, s = 1, c = '#5a6a8a') => G(x, y, s, circ(0, 0, 4, c, 0) + line(4, 0, 4, -14, c, 2.4) + path('M4 -14 q6 2 8 8', 'none', 2.4, `stroke="${c}"`));
// speech bubble holding a small picture (no words): content drawn around (0,0)
export const bubble = (x, y, w, h, content = '', tail = 'left') => G(x, y, 1, path(`M${-w / 2} ${-h / 2} h${w} v${h} h${-w / 2 + 14} l${tail === 'left' ? -26 : 10} 16 l${tail === 'left' ? 6 : -2} -16 h${-w / 2 + 6}Z`.replace(/h(-?\d+(\.\d+)?)/g, (m) => m), '#fff', 2.5, 'stroke-linejoin="round"') + content);
// ---- buildings / interiors ----
export const house = (x, y, s = 1, wall = '#f4c27a', roof = '#d9534f', door = '#7c4a2d', snow = false) => G(x, y, s, `${shadow(0, 0, 70, 8)}${rect(-55, -70, 110, 70, wall)}${path('M-66 -66 L0 -118 L66 -66Z', roof)}${snow ? path('M-66 -66 L0 -118 L66 -66 L58 -70 Q30 -80 0 -110 Q-30 -80 -58 -70Z', '#fff', 2) : ''}${rect(32, -110, 14, 28, '#a35d4b')}${rect(-12, -42, 24, 42, door, 3, 3)}${circ(7, -21, 2, '#ffd84d', 0)}${rect(-44, -56, 24, 22, '#bfe8ff')}${line(-32, -56, -32, -34)}${line(-44, -45, -20, -45)}${rect(20, -56, 24, 22, '#bfe8ff')}${line(32, -56, 32, -34)}${line(20, -45, 44, -45)}`);
export const school = (x, y, s = 1, snow = false) => G(x, y, s, `${shadow(0, 0, 120, 9)}${rect(-110, -80, 220, 80, '#e58b5c')}${Array.from({ length: 6 }, (_, i) => line(-110, -70 + i * 13, 110, -70 + i * 13, '#c96c42', 1.5)).join('')}${rect(-120, -92, 240, 14, '#8a5a3b')}${snow ? rect(-122, -98, 244, 8, '#fff', 2, 4) : ''}${rect(-30, -132, 60, 42, '#e58b5c')}${path('M-36 -130 L0 -152 L36 -130Z', '#8a5a3b')}${circ(0, -112, 11, '#fff')}${line(0, -112, 0, -119, O, 2)}${line(0, -112, 5, -112, O, 2)}${rect(-18, -46, 36, 46, '#4a78b8', 3, 3)}${line(0, -46, 0, 0)}${[-90, -55, 55, 90].map((cx) => rect(cx - 13, -64, 26, 24, '#bfe8ff') + line(cx, -64, cx, -40, O, 2)).join('')}${line(70, -152, 70, -92, O, 3)}${path('M70 -152 l26 6 l-26 7Z', '#e6493f', 2)}`);
export const floorRoom = (wall = '#f6e3c4', floor = '#d6a46d', y = 215) => rect(0, 0, 400, y, wall, 0) + Array.from({ length: 9 }, (_, i) => line(i * 50, 0, i * 50, y, '#000', 8, 'opacity=".035"')).join('') + rect(0, y, 400, 300 - y, floor, 0) + Array.from({ length: 5 }, (_, i) => line(0, y + 14 + i * 18, 400, y + 14 + i * 18, '#000', 1.5, 'opacity=".12"')).join('') + line(0, y, 400, y, O, 3) + rect(0, y - 8, 400, 8, '#fff', 0, 0, 'opacity=".5"');
export const win = (x, y, w = 90, h = 70, view = '') => `<clipPath id="cw${x}_${y}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>${rect(x - 6, y - 6, w + 12, h + 12, '#fff', 3, 4)}${rect(x, y, w, h, '#bfe8ff', 0)}<g clip-path="url(#cw${x}_${y})">${view}</g>${rect(x, y, w, h, 'none', 3)}${line(x + w / 2, y, x + w / 2, y + h, O, 4)}${line(x, y + h / 2, x + w, y + h / 2, O, 4)}${rect(x - 10, y + h + 4, w + 20, 8, '#fff', 3, 3)}`;
export const table = (x, y, w = 160) => rect(x - w / 2, y, w, 12, '#c98f5c', 3, 4) + rect(x - w / 2 + 10, y + 12, 9, 44, '#9c6a40') + rect(x + w / 2 - 19, y + 12, 9, 44, '#9c6a40');
export const mug = (x, y, s = 1, c = '#e6493f', steam = true) => G(x, y, s, `${rect(-9, -18, 18, 18, c, 2.5, 3)}${path('M9 -14 q8 0 8 6 q0 6 -8 6', 'none', 2.5)}${ell(0, -18, 9, 2.5, '#7a4b2a', 1.5)}${steam ? path('M-3 -24 q-4 -6 0 -10 q4 -4 0 -10 M4 -24 q-4 -6 0 -10', 'none', 2, 'stroke="#c8d3e0"') : ''}`);

// ---- people ----
// kid(x, y, s, o): front-facing child, feet at (x, y), ~132 px tall at s = 1.
// o = { skin, hair, hs: 'short'|'spiky'|'curly'|'bob'|'ponytail'|'pigtails'|'long'|'bun'|'bald', shirt, pants, shoes,
//       bottom: 'pants'|'shorts'|'skirt', face: 'happy'|'laugh'|'sad'|'cry'|'wow'|'worried'|'sleepy'|'mad'|'smile'|'grin',
//       arms: 'down'|'up'|'wave'|'hold'|'point'|'hips'|'reach'|'cheer'|'think'|'hug'|'carry', L, R (custom arm points),
//       legs: 'stand'|'walk'|'jump'|'sit'|'run', coat (colour), scarf, hat (toque colour), pom, mitts (colour), helmet, glasses, beard,
//       stripe (shirt stripe colour), dress, adult (longer legs, bigger body), flip, extra (svg drawn at the hands, in local coords) }
export function kid(x, y, s = 1, o = {}) {
  const skin = o.skin || SKIN.peach, hair = o.hair || '#6b4329', shirt = o.coat || o.shirt || '#4a90d9', pants = o.pants || '#3f5a8a', shoes = o.shoes || '#5a3e2b';
  const handC = o.mitts || skin;
  const adult = !!o.adult;
  const legLen = adult ? 60 : 38;
  const sit = o.legs === 'sit';
  const up = sit ? 22 : -(legLen - 38); // vertical shift of the upper body
  const T = (inner) => `<g transform="translate(0 ${up})">${inner}</g>`;
  const bw = adult ? 24 : 20; // half body width at shoulders
  // legs
  let legs = '';
  const leg = (x1, y1, x2, y2) => line(x1, y1, x2, y2, O, 13) + line(x1, y1, x2, y2, o.bottom === 'shorts' || o.bottom === 'skirt' || o.dress ? skin : pants, 8);
  const shoe = (cx, cy, d = 1) => ell(cx + d * 2, cy, 10, 5.5, shoes, 2.5);
  const top = -36 + up + (sit ? 0 : 0);
  if (sit) legs = leg(-8, top + 2, -15, -6) + leg(8, top + 2, 15, -6) + ell(-16, -6, 8, 9, shoes, 2.5) + ell(16, -6, 8, 9, shoes, 2.5);
  else if (o.legs === 'walk') legs = leg(-7, top + 2, -14, -5) + leg(7, top + 2, 12, -5) + shoe(-15, -3, -1) + shoe(13, -3, 1);
  else if (o.legs === 'run') legs = leg(-7, top + 2, -22, -10) + leg(7, top + 2, 18, -2) + shoe(-24, -9, -1) + shoe(20, -1, 1);
  else if (o.legs === 'jump') legs = leg(-7, top + 2, -16, -12) + leg(7, top + 2, 16, -12) + shoe(-18, -10, -1) + shoe(18, -10, 1);
  else legs = leg(-7, top + 2, -8, -5) + leg(7, top + 2, 8, -5) + shoe(-9, -3, -1) + shoe(9, -3, 1);
  if (o.bottom === 'shorts' && !o.coat) legs += T(path('M-17 -40 L17 -40 L19 -22 L3 -22 L0 -30 L-3 -22 L-19 -22Z', pants));
  if (o.bottom === 'skirt' && !o.coat && !o.dress) legs += T(path('M-17 -40 L17 -40 L25 -20 L-25 -20Z', pants));
  // arms (shoulder -> elbow -> hand), local coords before shift
  const SH = [[-bw + 2, -72], [bw - 2, -72]];
  const P = {
    down: [[[-bw - 6, -56], [-bw - 8, -40]], [[bw + 6, -56], [bw + 8, -40]]],
    up: [[[-bw - 12, -92], [-bw - 16, -112]], [[bw + 12, -92], [bw + 16, -112]]],
    cheer: [[[-bw - 16, -84], [-bw - 26, -100]], [[bw + 16, -84], [bw + 26, -100]]],
    wave: [[[-bw - 6, -56], [-bw - 8, -40]], [[bw + 14, -84], [bw + 18, -106]]],
    hold: [[[-bw - 4, -54], [-8, -50]], [[bw + 4, -54], [8, -50]]],
    carry: [[[-bw - 6, -58], [-16, -62]], [[bw + 6, -58], [16, -62]]],
    point: [[[-bw - 6, -56], [-bw - 8, -40]], [[bw + 14, -76], [bw + 32, -80]]],
    hips: [[[-bw - 14, -58], [-bw + 2, -46]], [[bw + 14, -58], [bw - 2, -46]]],
    reach: [[[-bw - 14, -74], [-bw - 30, -78]], [[bw + 14, -74], [bw + 30, -78]]],
    think: [[[-bw - 6, -56], [-bw - 8, -40]], [[bw + 4, -56], [8, -86]]],
    hug: [[[-bw - 4, -60], [6, -58]], [[bw + 4, -60], [-6, -60]]],
    cry: [[[-bw - 2, -60], [-8, -94]], [[bw + 2, -60], [8, -94]]],
  };
  const pose = P[o.arms || 'down'] || P.down;
  const L = o.L || pose[0], R = o.R || pose[1];
  const arm = (sh, pts) => { const all = [sh, ...pts]; const h = all[all.length - 1]; return poly(all, O, 12) + poly(all, shirt, 7) + circ(h[0], h[1], o.mitts ? 6.5 : 5.5, handC, 2.5); };
  // body
  const len = o.coat ? -26 : -36;
  let body = path(`M${-bw} -74 Q0 -80 ${bw} -74 L${bw + 4} ${len} Q0 ${len + 6} ${-bw - 4} ${len}Z`, shirt);
  if (o.dress) body = path(`M${-bw} -74 Q0 -80 ${bw} -74 L${bw + 10} -24 Q0 -18 ${-bw - 10} -24Z`, shirt);
  if (o.stripe) body += `<clipPath id="ks${x}_${y}"><path d="M${-bw} -74 Q0 -80 ${bw} -74 L${bw + 4} ${len} Q0 ${len + 6} ${-bw - 4} ${len}Z"/></clipPath><g clip-path="url(#ks${x}_${y})">${[0, 1, 2].map((i) => rect(-bw - 6, -66 + i * 11, bw * 2 + 12, 4.5, o.stripe, 0)).join('')}</g>`;
  if (o.coat) body += line(0, -72, 0, -28, O, 2) + rect(-bw - 4, -32, bw * 2 + 8, 5, '#fff', 2, 2, 'opacity=".75"');
  if (o.vest) body += path(`M${-bw} -74 L-8 -74 L-6 ${len + 3} L${-bw - 4} ${len}Z M${bw} -74 L8 -74 L6 ${len + 3} L${bw + 4} ${len}Z`, o.vest, 2.5) + rect(-bw - 3, -50, bw * 2 + 6, 4, '#e8f04a', 0, 0, 'opacity=".9"');
  body += path(`M${bw - 8} -74 Q${bw} -74 ${bw + 4} ${len} Q${bw - 6} ${len + 4} ${bw - 10} ${len + 3}Z`, '#000', 0, 'opacity=".12"');
  if (o.scarf) body += rect(-15, -80, 30, 9, o.scarf, 2.5, 4) + path('M6 -74 l3 22 l9 -2 l-4 -21Z', o.scarf, 2.5);
  // head
  const hy = adult ? -104 : -102, hr = adult ? 24 : 26;
  const hs = o.hs || 'short';
  const back = { bob: path(`M-30 ${hy + 2} Q-32 ${hy - 32} 0 ${hy - 32} Q32 ${hy - 32} 30 ${hy + 2} L30 ${hy + 22} Q20 ${hy + 26} 14 ${hy + 18} L-14 ${hy + 18} Q-20 ${hy + 26} -30 ${hy + 22}Z`, hair),
    long: path(`M-30 ${hy} Q-34 ${hy - 34} 0 ${hy - 33} Q34 ${hy - 34} 30 ${hy} L32 ${hy + 44} Q16 ${hy + 50} 10 ${hy + 30} L-10 ${hy + 30} Q-16 ${hy + 50} -32 ${hy + 44}Z`, hair),
    ponytail: path(`M22 ${hy - 20} Q48 ${hy - 18} 40 ${hy + 16} Q36 ${hy + 28} 30 ${hy + 30} Q36 ${hy + 6} 22 ${hy - 6}Z`, hair),
    pigtails: ell(-32, hy + 2, 9, 15, hair, 3, `transform="rotate(20 -32 ${hy + 2})"`) + ell(32, hy + 2, 9, 15, hair, 3, `transform="rotate(-20 32 ${hy + 2})"`) + circ(-26, hy - 10, 3.5, '#ff7aa8', 2) + circ(26, hy - 10, 3.5, '#ff7aa8', 2),
    bun: circ(0, hy - hr - 6, 11, hair) }[hs] || '';
  const fringe = { short: path(`M${-hr - 1} ${hy - 2} Q${-hr - 2} ${hy - hr - 6} 0 ${hy - hr - 5} Q${hr + 2} ${hy - hr - 6} ${hr + 1} ${hy - 2} Q${hr - 6} ${hy - 16} 6 ${hy - 15} Q-4 ${hy - 20} -10 ${hy - 13} Q${-hr + 6} ${hy - 16} ${-hr - 1} ${hy - 2}Z`, hair),
    spiky: path(`M${-hr - 1} ${hy - 2} L${-hr + 2} ${hy - 22} L-18 ${hy - 26} L-14 ${hy - 38} L-4 ${hy - 30} L2 ${hy - 40} L8 ${hy - 29} L18 ${hy - 36} L18 ${hy - 24} L${hr + 1} ${hy - 20} L${hr + 1} ${hy - 2} Q${hr - 6} ${hy - 16} 4 ${hy - 14} Q-10 ${hy - 18} ${-hr - 1} ${hy - 2}Z`, hair),
    curly: Array.from({ length: 9 }, (_, i) => { const a = Math.PI * (1.05 + i * .1125); return circ(Math.round(Math.cos(a) * (hr - 1)), Math.round(hy - 6 + Math.sin(a) * (hr - 1)), 9, hair, 2.5); }).join('') + ell(0, hy - 20, hr - 4, 12, hair, 0),
    bald: path(`M${-hr} ${hy + 2} Q${-hr - 3} ${hy - 12} ${-hr + 4} ${hy - 14} L${-hr + 6} ${hy + 4}Z M${hr} ${hy + 2} Q${hr + 3} ${hy - 12} ${hr - 4} ${hy - 14} L${hr - 6} ${hy + 4}Z`, hair, 2),
  };
  const front = hs === 'bald' ? fringe.bald : hs === 'curly' ? fringe.curly : hs === 'spiky' ? fringe.spiky : fringe.short;
  // face
  const f = o.face || 'happy';
  const ey = hy + 1;
  const eye = (cx) => f === 'sleepy' || f === 'laugh' ? path(f === 'laugh' ? `M${cx - 5} ${ey + 1} Q${cx} ${ey - 6} ${cx + 5} ${ey + 1}` : `M${cx - 5} ${ey} Q${cx} ${ey + 4} ${cx + 5} ${ey}`, 'none', 2.6)
    : f === 'wow' || f === 'worried' ? circ(cx, ey, 5.5, '#fff', 2) + circ(cx, ey + .5, 2.6, O, 0) + circ(cx - 1, ey - 1, .9, '#fff', 0)
      : ell(cx, ey, 3.3, 4, O, 0) + circ(cx - 1.2, ey - 1.5, 1.3, '#fff', 0);
  const brows = f === 'mad' ? path(`M-15 ${ey - 11} L-5 ${ey - 7} M15 ${ey - 11} L5 ${ey - 7}`, 'none', 2.8) : f === 'worried' || f === 'sad' || f === 'cry' ? path(`M-15 ${ey - 8} L-5 ${ey - 12} M15 ${ey - 8} L5 ${ey - 12}`, 'none', 2.4) : f === 'wow' ? path(`M-15 ${ey - 12} Q-10 ${ey - 15} -5 ${ey - 12} M15 ${ey - 12} Q10 ${ey - 15} 5 ${ey - 12}`, 'none', 2.2) : path(`M-14 ${ey - 9} Q-10 ${ey - 11} -6 ${ey - 9} M14 ${ey - 9} Q10 ${ey - 11} 6 ${ey - 9}`, 'none', 2);
  const my = hy + 13;
  const mouth = { happy: path(`M-7 ${my - 1} Q0 ${my + 6} 7 ${my - 1}`, 'none', 2.6), smile: path(`M-5 ${my} Q0 ${my + 3} 5 ${my}`, 'none', 2.4), grin: path(`M-9 ${my - 2} Q0 ${my + 10} 9 ${my - 2}Z`, '#fff', 2.4),
    laugh: path(`M-9 ${my - 3} Q0 ${my + 12} 9 ${my - 3}Z`, '#b8434f', 2.4) + ell(0, my + 4, 4, 2, '#ff8fa3', 0), sad: path(`M-6 ${my + 3} Q0 ${my - 3} 6 ${my + 3}`, 'none', 2.6), cry: path(`M-7 ${my + 4} Q0 ${my - 4} 7 ${my + 4}`, 'none', 2.6),
    wow: ell(0, my + 2, 4.5, 5.5, '#b8434f', 2.2), worried: path(`M-6 ${my + 2} q3 -3 6 0 q3 3 6 0`, 'none', 2.4), sleepy: ell(0, my + 1, 3, 2.5, '#b8434f', 2), mad: path(`M-6 ${my + 2} L6 ${my + 2}`, 'none', 2.6) }[f] || '';
  const tears = f === 'cry' ? path(`M-11 ${ey + 5} q-3 8 0 12 q3 -4 0 -12Z M11 ${ey + 5} q-3 8 0 12 q3 -4 0 -12Z`, '#9fdcff', 1.8) : '';
  const cheeks = ell(-14, hy + 9, 5, 3.2, '#ff8fa3', 0, 'opacity=".6"') + ell(14, hy + 9, 5, 3.2, '#ff8fa3', 0, 'opacity=".6"');
  const glasses = o.glasses ? circ(-10, ey, 7.5, 'none', 2.4) + circ(10, ey, 7.5, 'none', 2.4) + line(-2.5, ey, 2.5, ey, O, 2.4) : '';
  const beard = o.beard ? path(`M${-hr + 2} ${hy + 2} Q${-hr + 2} ${hy + 30} 0 ${hy + 32} Q${hr - 2} ${hy + 30} ${hr - 2} ${hy + 2} Q14 ${hy + 16} 0 ${hy + 16} Q-14 ${hy + 16} ${-hr + 2} ${hy + 2}Z`, o.beard, 2.5) + path(`M-8 ${my - 1} Q0 ${my + 4} 8 ${my - 1}`, 'none', 2.4) : '';
  const hat = o.hat ? path(`M${-hr - 2} ${hy - 6} Q${-hr - 2} ${hy - hr - 12} 0 ${hy - hr - 12} Q${hr + 2} ${hy - hr - 12} ${hr + 2} ${hy - 6}Z`, o.hat) + rect(-hr - 4, hy - 12, hr * 2 + 8, 10, o.hatBand || '#fff', 2.5, 4) + path(`M${-hr + 4} ${hy - 20} Q0 ${hy - 26} ${hr - 4} ${hy - 20}`, 'none', 2, 'stroke="#fff" opacity=".5"') + circ(0, hy - hr - 14, 7.5, o.pom || '#fff', 2.5) : '';
  const helmet = o.helmet ? path(`M${-hr - 3} ${hy - 2} Q${-hr - 3} ${hy - hr - 10} 0 ${hy - hr - 10} Q${hr + 3} ${hy - hr - 10} ${hr + 3} ${hy - 2} L${hr + 3} ${hy + 4} L${hr - 4} ${hy + 4} L${hr - 4} ${hy - 6} L${-hr + 4} ${hy - 6} L${-hr + 4} ${hy + 4} L${-hr - 3} ${hy + 4}Z`, o.helmet) + path(`M${-hr + 6} ${hy - 6} L${-hr + 6} ${hy + 14} Q0 ${hy + 24} ${hr - 6} ${hy + 14} L${hr - 6} ${hy - 6}`, 'none', 2, 'stroke="#c8d3e0"') : '';
  const head = back + rect(-6, hy + hr - 6, 12, 10, skin, 2.5) + circ(-hr + 1, hy + 2, 6, skin, 2.5) + circ(hr - 1, hy + 2, 6, skin, 2.5) + circ(0, hy, hr, skin) + (o.hat || o.helmet ? (hs === 'long' || hs === 'bob' ? '' : '') : front) + cheeks + eye(-10) + eye(10) + brows + mouth + tears + glasses + beard + hat + helmet + (hs === 'bun' && !o.hat ? '' : '');
  const armsSvg = arm(SH[0], L) + arm(SH[1], R);
  const front2 = ['hold', 'carry', 'hug', 'cry'].includes(o.arms);
  return G(x, y, s, shadow(0, 0, 28, 5) + legs + T(front2 ? body + head + (o.extra || '') + armsSvg : armsSvg + body + head + (o.extra || '')), !!o.flip);
}
export const adult = (x, y, s = 1, o = {}) => kid(x, y, s, { ...o, adult: true });

// ---- a friendly dog (side view, facing right; flip to face left). colour c, patch p, collar k ----
export function dog(x, y, s = 1, o = {}) {
  const c = o.c || '#e0a96d', p = o.p || '#a86b3c', k = o.k || '#e6493f';
  const tailUp = o.tail !== 'down';
  const sitting = o.pose === 'sit';
  const f = o.face || 'happy';
  const eyeS = f === 'sleepy' ? path('M30 -60 q4 3 8 0', 'none', 2.4) : circ(34, -60, 3.4, O, 0) + circ(33, -61.5, 1.1, '#fff', 0);
  const mouthS = f === 'sad' ? path('M40 -44 q4 -3 9 0', 'none', 2.2) : path('M38 -46 q5 5 11 0', 'none', 2.2) + (f === 'happy' ? path('M42 -44 q2 8 6 0', '#ff8fa3', 1.8) : '');
  const body = sitting
    ? ell(-2, -32, 22, 28, c) + ell(-14, -10, 14, 10, c) + rect(6, -24, 8, 24, c, 3, 4) + rect(-4, -24, 8, 24, c, 3, 4)
    : ell(-6, -32, 34, 18, c) + rect(-30, -26, 9, 26, c, 3, 4) + rect(-14, -24, 9, 24, c, 3, 4) + rect(4, -24, 9, 24, c, 3, 4) + rect(18, -26, 9, 26, c, 3, 4) + ell(-14, -38, 12, 8, p, 0, 'opacity=".9"');
  const tail = tailUp ? path(sitting ? 'M-22 -14 q-20 -2 -22 -22' : 'M-38 -38 q-14 -10 -10 -26', 'none', 6, `stroke="${c}"`) : path('M-38 -32 q-12 6 -12 18', 'none', 6, `stroke="${c}"`);
  const tailO = tailUp ? path(sitting ? 'M-22 -14 q-20 -2 -22 -22' : 'M-38 -38 q-14 -10 -10 -26', 'none', 10) : path('M-38 -32 q-12 6 -12 18', 'none', 10);
  const head = ell(30, -56, 18, 16, c) + ell(44, -48, 10, 8, '#f6dcae', 2.5) + ell(52, -52, 4.5, 3.5, O, 0) + eyeS + mouthS + path('M18 -68 q-12 2 -10 26 q8 -2 12 -12Z', p, 2.5) + rect(16, -44, 22, 6, k, 2, 3) + circ(27, -36, 3.2, '#ffd84d', 1.8);
  return G(x, y, s, shadow(0, 0, 36, 5) + tailO + tail + body + head, !!o.flip);
}
// ---- cat (sitting, front-ish) ----
export function cat(x, y, s = 1, o = {}) {
  const c = o.c || '#f0a64a', st = o.st || '#c9772a';
  const f = o.face || 'happy';
  const eyes = f === 'sleepy' ? path('M-12 -58 q4 3 8 0 M4 -58 q4 3 8 0', 'none', 2.2) : ell(-8, -58, 3.4, 4.4, '#3a5a2a', 0) + ell(8, -58, 3.4, 4.4, '#3a5a2a', 0) + circ(-9, -60, 1.2, '#fff', 0) + circ(7, -60, 1.2, '#fff', 0);
  return G(x, y, s, shadow(0, 0, 26, 5) + path('M16 -6 q30 -4 24 -36', 'none', 10) + path('M16 -6 q30 -4 24 -36', 'none', 6, `stroke="${c}"`) + ell(0, -22, 20, 24, c) + ell(0, -16, 11, 15, '#fbe3c4', 0) + ell(-9, -2, 8, 5, c, 2.5) + ell(9, -2, 8, 5, c, 2.5)
    + path('M-20 -66 L-18 -88 L-4 -74Z M20 -66 L18 -88 L4 -74Z', c) + path('M-16 -72 L-16 -82 L-9 -75Z M16 -72 L16 -82 L9 -75Z', '#ffb3c1', 0) + ell(0, -60, 21, 17, c) + path('M-6 -76 l2 6 M0 -77 l0 6 M6 -76 l-2 6', 'none', 2.2, `stroke="${st}"`) + path('M-24 -26 q6 -2 8 4 M24 -26 q-6 -2 -8 4', 'none', 2.2, `stroke="${st}"`)
    + eyes + path('M-2.5 -51 h5 l-2.5 3Z', '#ff8fa3', 1.4) + path('M0 -48 q-3 4 -6 2 M0 -48 q3 4 6 2', 'none', 1.8) + path('M-10 -50 l-14 -2 M-10 -47 l-14 3 M10 -50 l14 -2 M10 -47 l14 3', 'none', 1.2) + (o.collar ? rect(-12, -46, 24, 5, o.collar, 1.8, 2) + circ(0, -40, 3, '#ffd84d', 1.5) : ''), !!o.flip);
}
