// Shared picture + pinyin helpers for the Chinese storybooks (js/content/livres-zh/<id>.js).
//
// TEXT — P(svg, src) builds a page { svg, text, tokens } from a source string of tokens:
//   a Han word followed by its pinyin in ASCII parentheses, e.g. '小熊(xiǎo xióng)有(yǒu)一个(yí gè)红(hóng)气球(qì qiú)。'
//   One tone-marked syllable per character, punctuation stands alone, whitespace is ignored (lines may wrap freely).
// Pinyin conventions (as 人教版 primary textbooks print them):
//   一 / 不 carry their sandhi tone (一个 yí gè, 一天 yì tiān, 一起 yì qǐ, 第一 dì yī, 不是 bú shì, 不好 bù hǎo);
//   third-tone sandhi is NOT written (你好 nǐ hǎo); 轻声 unmarked (妈妈 mā ma, 的 de, 了 le, 们 men, 桌子 zhuō zi);
//   个 always gè; 谁 shuí; directional complements keep full tones (跳上去 tiào shàng qù).
export function toks(src) {
  const out = [];
  const re = /(\p{Script=Han}+)\(([^)]*)\)|(\S)/gu;
  let m;
  while ((m = re.exec(src))) {
    if (m[1]) out.push({ hz: m[1], py: m[2].trim().replace(/\s+/g, ' ') });
    else if (/\p{Script=Han}/u.test(m[3])) throw new Error(`no pinyin after ${m[3]} in ${src.slice(0, 40)}`);
    else out.push({ hz: m[3] });
  }
  return out;
}
export const P = (svg, src) => { const tokens = toks(src); return { svg, text: tokens.map((t) => t.hz).join(''), tokens }; };
export const Z = (src) => { const t = toks(src); return { hz: t.map((x) => x.hz).join(''), py: t.filter((x) => x.py).map((x) => x.py).join(' ') }; };
export const W = (src, def, emoji) => { const z = Z(src), d = Z(def); return { word: z.hz, py: z.py, def: d.hz, defPy: d.py, emoji }; }; // def = very simple Chinese with its pinyin (shown over the characters)
export const Q = (q, options, answer) => { const n = options.length, k = (q.length + n) % n, o = options.map(Z); return { q: Z(q), options: o.map((_, i) => o[(i + n - k) % n]), answer: (answer + k) % n }; }; // the right answer moves around deterministically

// ---------------------------------------------------------------- picture primitives
export const O = '#3a3f55';
export const SKIN = '#f6d2b0';
const DEFS = '<defs>'
  + '<radialGradient id="gSun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff3a0" stop-opacity=".9"/><stop offset="1" stop-color="#fff3a0" stop-opacity="0"/></radialGradient>'
  + '<radialGradient id="gGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6c8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></radialGradient>'
  + '<radialGradient id="gLamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd27a" stop-opacity=".6"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>'
  + '<linearGradient id="gWat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86cdf2"/><stop offset="1" stop-color="#4c97cf"/></linearGradient>'
  + '<linearGradient id="gSnow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dde9f5"/></linearGradient>'
  + '<linearGradient id="gIce" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eaf6ff"/><stop offset="1" stop-color="#bcdcf2"/></linearGradient>'
  + '<linearGradient id="gGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fd86f"/><stop offset="1" stop-color="#6db552"/></linearGradient>'
  + '<linearGradient id="gGlass" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".5" stop-color="#ffffff" stop-opacity=".1"/><stop offset="1" stop-color="#ffffff" stop-opacity=".35"/></linearGradient>'
  + '</defs>';
export const svg = (b, defs = '') => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${DEFS}${defs}<g stroke="${O}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${b}</g></svg>`;
const sw_ = (sw) => (sw === 3 ? '' : sw ? ` stroke-width="${sw}"` : ' stroke="none"');
export const ell = (cx, cy, rx, ry, f, sw = 3, ex = '') => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"${sw_(sw)}${ex ? ' ' + ex : ''}/>`;
export const circ = (cx, cy, r, f, sw = 3, ex = '') => ell(cx, cy, r, r, f, sw, ex);
export const rect = (x, y, w, h, f, sw = 3, r = 0, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}"${r ? ` rx="${r}"` : ''} fill="${f}"${sw_(sw)}${ex ? ' ' + ex : ''}/>`;
export const path = (d, f = 'none', sw = 3, ex = '') => `<path d="${d}" fill="${f}"${sw_(sw)}${ex ? ' ' + ex : ''}/>`;
export const line = (x1, y1, x2, y2, c = O, sw = 3) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${c === O ? '' : ` stroke="${c}"`}${sw_(sw)}/>`;
export const G = (x, y, s, inner, flip = false, rot = 0) => `<g transform="translate(${x} ${y})${rot ? ` rotate(${rot})` : ''} scale(${flip ? -s : s} ${s})">${inner}</g>`;
export const rnd = (i) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
export const shadow = (x, y, rx, ry = rx * 0.22) => ell(x, y, rx, ry, '#2a3a4a', 0, 'opacity=".2"');
// outlined limb: dark stroke under a coloured stroke
export const limb = (d, c, w = 7) => `<path d="${d}" fill="none" stroke="${O}" stroke-width="${w + 5}"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}"/>`;

let gid = 0;
export const sky = (a, b) => { const id = 'gS' + (gid++); return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="300" fill="url(#${id})" stroke="none"/>`; };
export const SKY = { day: ['#8fd3f7', '#dff3ff'], snow: ['#b9cfe6', '#eef4fb'], dusk: ['#f7b98a', '#ffe7c2'], night: ['#1d2a5a', '#3d4f8c'], warm: ['#ffd9a8', '#fff2dc'] };
export const cloud = (x, y, s = 1, c = '#fff') => G(x, y, s, `<g fill="${c}" stroke="none"><ellipse cx="0" cy="3" rx="34" ry="12" fill="#000" opacity=".06"/><ellipse cx="0" cy="0" rx="32" ry="12"/><ellipse cx="-18" cy="-8" rx="15" ry="11"/><ellipse cx="8" cy="-13" rx="19" ry="15"/><ellipse cx="22" cy="-4" rx="12" ry="9"/></g>`);
export const sun = (x, y, r = 24) => circ(x, y, r * 2.6, 'url(#gSun)', 0) + path(Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, k = Math.cos(a), n = Math.sin(a); return `M${Math.round(x + k * (r + 5))} ${Math.round(y + n * (r + 5))}L${Math.round(x + k * (r + 13))} ${Math.round(y + n * (r + 13))}`; }).join(''), 'none', 4, 'stroke="#f7b733"') + circ(x, y, r, '#ffd84d') + circ(x - 7, y - 7, r * 0.4, '#fff3a0', 0);
export const star = (x, y, r = 5, f = '#ffe58a') => `<path d="M${x} ${y - r} L${x + r * 0.3} ${y - r * 0.3} L${x + r} ${y} L${x + r * 0.3} ${y + r * 0.3} L${x} ${y + r} L${x - r * 0.3} ${y + r * 0.3} L${x - r} ${y} L${x - r * 0.3} ${y - r * 0.3}Z" fill="${f}" stroke="none"/>`;
export const stars = (n = 14, seed = 3, y1 = 130) => Array.from({ length: n }, (_, i) => star(Math.round(rnd(i + seed) * 390 + 5), Math.round(rnd(i + seed + 50) * y1 + 6), 2 + Math.round(rnd(i + seed + 9) * 3))).join('');
// full moon (crescent = false) or crescent
export const moon = (x, y, r = 24, full = true) => circ(x, y, r * 2.4, 'url(#gGlow)', 0) + (full
  ? circ(x, y, r, '#fff1a8') + circ(x - r * 0.3, y - r * 0.2, r * 0.18, '#f3e08a', 0) + circ(x + r * 0.35, y + r * 0.25, r * 0.13, '#f3e08a', 0) + circ(x + r * 0.1, y - r * 0.45, r * 0.1, '#f3e08a', 0)
  : path(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * 0.65} ${r} 0 1 1 ${x} ${y - r}Z`, '#fff1a8'));
export const snowfall = (n = 30, seed = 7, y1 = 300) => Array.from({ length: n }, (_, i) => circ(Math.round(rnd(i + seed) * 400), Math.round(rnd(i + seed + 70) * y1), 1.5 + Math.round(rnd(i + seed + 30) * 25) / 10, '#fff', 0, 'opacity=".9"')).join('');
export const tuft = (x, y, s = 1, c = '#5aa04a') => `<path d="M${x - 5 * s} ${y} Q${x - 6 * s} ${y - 9 * s} ${x - 9 * s} ${y - 13 * s} Q${x - 2 * s} ${y - 9 * s} ${x - 1 * s} ${y - 16 * s} Q${x + 2 * s} ${y - 9 * s} ${x + 8 * s} ${y - 12 * s} Q${x + 5 * s} ${y - 6 * s} ${x + 5 * s} ${y}Z" fill="${c}" stroke="none"/>`;
export const tufts = (y0, y1, n, seed = 1, c = '#5aa04a', s = 1) => Array.from({ length: n }, (_, i) => tuft(Math.round(rnd(i + seed) * 400), Math.round(y0 + rnd(i + seed + 40) * (y1 - y0)), s * (0.7 + rnd(i + seed + 80) * 0.6), c)).join('');
export const flower = (x, y, c = '#ff7aa8') => `${line(x, y, x, y - 12, '#3f8f4f', 2.5)}${circ(x - 3, y - 14, 3.2, c, 1.5)}${circ(x + 3, y - 14, 3.2, c, 1.5)}${circ(x, y - 17, 3.2, c, 1.5)}${circ(x, y - 12, 3, c, 1.5)}${circ(x, y - 14, 2, '#ffe066', 0)}`;
export const flowers = (y0, y1, n, seed = 2) => Array.from({ length: n }, (_, i) => flower(Math.round(rnd(i + seed) * 380 + 10), Math.round(y0 + rnd(i + seed + 20) * (y1 - y0)), ['#ff7aa8', '#ffd23f', '#9b8cff', '#ffffff'][i % 4])).join('');

// ---------------------------------------------------------------- scenery
export const ground = (y = 220, c = 'url(#gGrass)', wave = 8) => path(`M-5 ${y} Q100 ${y - wave} 200 ${y} T405 ${y} L405 305 L-5 305Z`, c);
export const snowGround = (y = 215) => ground(y, 'url(#gSnow)', 10) + path(`M30 ${y + 30} q20 -6 40 0 M250 ${y + 45} q25 -7 50 0 M140 ${y + 70} q18 -5 36 0`, 'none', 2, 'stroke="#c9d9ea"');
export const hills = (y = 200, c1 = '#a9dc8a', c2 = '#86c76c') => path(`M-5 ${y} Q60 ${y - 55} 140 ${y - 20} T300 ${y - 30} T405 ${y - 10} L405 ${y + 40} L-5 ${y + 40}Z`, c1, 0) + path(`M-5 ${y + 10} Q90 ${y - 30} 200 ${y} T405 ${y - 5} L405 ${y + 40} L-5 ${y + 40}Z`, c2, 0);
export const mountains = (y = 190, c = '#8fa7c9', snow = true) => path(`M-5 ${y} L60 ${y - 80} L120 ${y - 20} L190 ${y - 100} L260 ${y - 30} L330 ${y - 90} L405 ${y - 20} L405 ${y + 20} L-5 ${y + 20}Z`, c, 0)
  + (snow ? path(`M45 ${y - 60} L60 ${y - 80} L75 ${y - 62} L66 ${y - 66} L58 ${y - 58}Z M172 ${y - 76} L190 ${y - 100} L208 ${y - 76} L198 ${y - 82} L188 ${y - 72}Z M314 ${y - 70} L330 ${y - 90} L346 ${y - 70} L336 ${y - 76} L326 ${y - 66}Z`, '#fff', 0) : '');
export const pine = (x, y, s = 1, snowy = false) => G(x, y, s, rect(-5, -14, 10, 16, '#8a5a36', 2.5)
  + path('M0 -100 L22 -62 L12 -62 L30 -34 L18 -34 L36 -10 L-36 -10 L-18 -34 L-30 -34 L-12 -62 L-22 -62Z', '#3e8a5a')
  + path('M0 -100 L-22 -62 L-12 -62 L-30 -34 L-18 -34 L-36 -10 L0 -10Z', '#2f7349', 0, 'opacity=".5"')
  + (snowy ? path('M0 -100 L10 -82 Q0 -78 -10 -82Z M-22 -62 Q-6 -56 22 -62 L16 -56 Q0 -52 -16 -56Z M-30 -34 Q0 -26 30 -34 L24 -28 Q0 -22 -24 -28Z M-36 -10 Q0 -4 36 -10 L30 -6 Q0 0 -30 -6Z', '#fff', 2) : ''));
export const tree = (x, y, s = 1, c = '#6cbf55', fruit = '') => G(x, y, s, path('M-7 0 L-5 -50 Q-14 -60 -18 -66 M5 -50 L7 0', '#9a6a42', 3) + path('M-7 0 L-5 -52 L5 -52 L7 0Z', '#9a6a42')
  + circ(-22, -70, 24, c) + circ(22, -72, 24, c) + circ(0, -92, 28, c) + circ(-8, -68, 20, c, 0) + circ(10, -78, 18, c, 0)
  + circ(-10, -96, 9, '#fff', 0, 'opacity=".18"') + fruit);
export const maple = (x, y, s = 1, c = '#e8642f') => tree(x, y, s, c);
export const bareTree = (x, y, s = 1, snowy = true) => G(x, y, s, path('M-6 0 L-4 -60 L-24 -88 M-4 -60 L0 -100 M0 -76 L22 -96 M-2 -46 L-28 -64', 'none', 7) + path('M-6 0 L-4 -60 L-24 -88 M-4 -60 L0 -100 M0 -76 L22 -96 M-2 -46 L-28 -64', 'none', 4, 'stroke="#8a5a36"')
  + (snowy ? path('M-28 -90 q4 -4 8 0 M-4 -102 q4 -4 8 0 M18 -98 q4 -4 8 0', 'none', 4, 'stroke="#fff"') : ''));
export const bamboo = (x, y, h = 160, s = 1, c = '#7cc36a') => G(x, y, s, rect(-6, -h, 12, h, c, 2.5) + Array.from({ length: Math.floor(h / 34) }, (_, i) => line(-6, -30 - i * 34, 6, -30 - i * 34, O, 2.5)).join('')
  + Array.from({ length: Math.floor(h / 50) }, (_, i) => path(`M${i % 2 ? 6 : -6} ${-44 - i * 50} q${i % 2 ? 18 : -18} -10 ${i % 2 ? 30 : -30} -4 q${i % 2 ? -14 : 14} 8 ${i % 2 ? -30 : 30} 4Z`, '#5aa04a', 2)).join(''));
export const river = (y1 = 210, y2 = 255) => path(`M-5 ${y1} Q100 ${y1 - 6} 200 ${y1} T405 ${y1} L405 ${y2} Q300 ${y2 + 6} 200 ${y2} T-5 ${y2}Z`, 'url(#gWat)')
  + path(`M40 ${y1 + 14} q12 -5 24 0 M150 ${y1 + 28} q12 -5 24 0 M280 ${y1 + 16} q12 -5 24 0 M330 ${y1 + 32} q10 -4 20 0`, 'none', 2.5, 'stroke="#e8f7ff"');
export const house = (x, y, s = 1, o = {}) => { const { wall = '#f4d9a8', roof = '#c8553d', snow = false, door = '#9a5b3a', lit = false } = o;
  return G(x, y, s, rect(-50, -70, 100, 70, wall) + path('M-62 -68 L0 -118 L62 -68Z', roof) + rect(-12, -40, 24, 40, door, 3, 3) + circ(7, -20, 2, '#ffd84d', 0)
    + rect(-40, -55, 20, 18, lit ? '#ffe08a' : '#bfe6ff', 2.5) + rect(20, -55, 20, 18, lit ? '#ffe08a' : '#bfe6ff', 2.5) + line(-30, -55, -30, -37, O, 2) + line(30, -55, 30, -37, O, 2)
    + (snow ? path('M-64 -66 L0 -120 L64 -66 Q50 -60 40 -66 Q28 -58 18 -68 Q2 -60 -10 -68 Q-24 -58 -34 -66 Q-48 -58 -64 -66Z', '#fff', 2.5) : '')); };
// indoor room: wall + floor
export const room = (wall = '#fbe7c6', floor = '#d9a877', fy = 215) => rect(0, 0, 400, fy, wall, 0) + path(`M0 ${fy} L400 ${fy} L400 300 L0 300Z`, floor, 0) + line(0, fy, 400, fy, O, 3)
  + path(Array.from({ length: 7 }, (_, i) => `M${i * 70 - 10} ${fy} L${i * 80 - 50} 300`).join(''), 'none', 2, 'stroke-opacity=".15"');
// window with a little scene: 'day' | 'snow' | 'night' | 'moon'
export const win = (x, y, w = 90, h = 80, scene = 'day') => { const inner = { day: '#9fdcff', snow: '#c9daee', night: '#22306a', moon: '#22306a' }[scene];
  return rect(x - 6, y - 6, w + 12, h + 12, '#fff', 3, 4) + rect(x, y, w, h, inner, 2.5)
    + (scene === 'snow' ? Array.from({ length: 12 }, (_, i) => circ(x + 6 + rnd(i + 5) * (w - 12), y + 6 + rnd(i + 25) * (h - 12), 2, '#fff', 0)).join('') + path(`M${x} ${y + h - 14} Q${x + w / 2} ${y + h - 22} ${x + w} ${y + h - 12} L${x + w} ${y + h} L${x} ${y + h}Z`, '#fff', 0) : '')
    + (scene === 'day' ? cloud(x + w * 0.4, y + h * 0.35, 0.5) : '')
    + (scene === 'night' ? Array.from({ length: 6 }, (_, i) => star(x + 8 + rnd(i + 2) * (w - 16), y + 8 + rnd(i + 12) * (h - 16), 3)).join('') : '')
    + (scene === 'moon' ? moon(x + w * 0.62, y + h * 0.4, Math.min(w, h) * 0.2) : '')
    + line(x + w / 2, y, x + w / 2, y + h, O, 3) + line(x, y + h / 2, x + w, y + h / 2, O, 3); };
export const table = (x, y, w = 160, c = '#c98d5a') => rect(x - w / 2, y, w, 12, c) + rect(x - w / 2 + 10, y + 12, 10, 50, c) + rect(x + w / 2 - 20, y + 12, 10, 50, c);
export const lantern = (x, y, s = 1, c = '#e8433a') => G(x, y, s, line(0, -40, 0, -24, O, 2) + rect(-8, -26, 16, 5, '#f2b84b', 2) + ell(0, -6, 20, 17, c) + path('M-10 -20 Q-16 -6 -10 8 M10 -20 Q16 -6 10 8 M0 -23 L0 11', 'none', 2, 'stroke="#b8322b"') + rect(-8, 9, 16, 5, '#f2b84b', 2) + path('M-4 14 L-5 26 M0 14 L0 28 M4 14 L5 26', 'none', 2, 'stroke="#f2b84b"'));
export const stone = (x, y, r = 8, c = '#9aa3b5') => path(`M${x - r} ${y} Q${x - r} ${y - r * 1.1} ${x} ${y - r} Q${x + r * 1.1} ${y - r * 0.9} ${x + r} ${y} Z`, c, 2.5) + ell(x - r * 0.3, y - r * 0.6, r * 0.3, r * 0.15, '#fff', 0, 'opacity=".35"');
export const ball = (x, y, r = 14, c = '#e8433a') => circ(x, y, r, c) + path(`M${x - r} ${y} Q${x} ${y + r * 0.5} ${x + r} ${y}`, 'none', 2.5, 'stroke="#fff"') + circ(x - r * 0.35, y - r * 0.4, r * 0.22, '#fff', 0, 'opacity=".55"');
export const heart = (x, y, s = 1, c = '#ff6b8a') => G(x, y, s, path('M0 6 C-14 -4 -10 -16 0 -9 C10 -16 14 -4 0 6Z', c, 2));
export const sweat = (x, y, s = 1) => G(x, y, s, path('M0 -8 Q6 0 0 4 Q-6 0 0 -8Z', '#9fdcff', 2));
export const spark = (x, y, s = 1, c = '#ffd84d') => G(x, y, s, path('M0 -10 L3 -3 L10 0 L3 3 L0 10 L-3 3 L-10 0 L-3 -3Z', c, 2));
export const motion = (x, y, s = 1, flip = false) => G(x, y, s, path('M0 -10 L-22 -10 M0 0 L-30 0 M0 10 L-22 10', 'none', 3, 'stroke="#ffffff" opacity=".9"'), flip);
export const bubble = (x, y, w, h, inner = '', tail = 'left') => path(`M${x} ${y} h${w} a10 10 0 0 1 10 10 v${h} a10 10 0 0 1 -10 10 h${-w}${tail === 'left' ? ' l-8 12 l-2 -12' : ''} a10 10 0 0 1 -10 -10 v${-h} a10 10 0 0 1 10 -10Z`, '#fff', 2.5) + inner;
export const zzz = (x, y) => path(`M${x} ${y} h8 l-8 9 h8 M${x + 12} ${y - 12} h6 l-6 7 h6`, 'none', 2.5, 'stroke="#5f6b8a"');

// ---------------------------------------------------------------- people
// Front-facing chibi people. Origin = between the feet. o:
//   kind: 'kid' | 'adult'; hair: 'girl' | 'buns' | 'boy' | 'mom' | 'dad' | 'grandma' | 'grandpa' | 'bald'
//   hairC, skin, top (shirt/coat colour), bottom (trousers), dress (true: skirt), shoes
//   mood: 'happy' | 'laugh' | 'sad' | 'cry' | 'wow' | 'think' | 'sleep' | 'calm' | 'worried'
//   arms: 'down' | 'up' | 'wave' | 'hold' | 'point' | 'hips' | 'reach' | [[lx,ly],[rx,ry]] (hand positions)
//   legs: 'stand' | 'walk' | 'sit' | 'skate' | 'run'
//   hat: 'tuque' | 'straw' | 'cap' | 'helmet' | null; hatC; scarf: colour; glasses; item: svg drawn on top (local coords); back: svg drawn behind
const MOUTH_RED = '#d9534f';
function face(hy, r, mood, glasses) {
  const ex = r * 0.38, ey = hy + 1;
  const eye = (x) => ell(x, ey, 3, 4, O, 0) + circ(x + 1, ey - 1.6, 1.2, '#fff', 0);
  let e = '', m = '', extra = '';
  switch (mood) {
    case 'laugh': e = path(`M${-ex - 4} ${ey + 1} Q${-ex} ${ey - 5} ${-ex + 4} ${ey + 1} M${ex - 4} ${ey + 1} Q${ex} ${ey - 5} ${ex + 4} ${ey + 1}`, 'none', 2.5); m = path(`M-8 ${hy + 9} Q0 ${hy + 21} 8 ${hy + 9}Z`, MOUTH_RED, 2.5); break;
    case 'sad': e = eye(-ex) + eye(ex) + path(`M${-ex - 5} ${ey - 9} L${-ex + 4} ${ey - 7} M${ex + 5} ${ey - 9} L${ex - 4} ${ey - 7}`, 'none', 2.5); m = path(`M-6 ${hy + 14} Q0 ${hy + 9} 6 ${hy + 14}`, 'none', 2.5); break;
    case 'worried': e = eye(-ex) + eye(ex) + path(`M${-ex - 5} ${ey - 7} L${-ex + 4} ${ey - 10} M${ex + 5} ${ey - 7} L${ex - 4} ${ey - 10}`, 'none', 2.5); m = path(`M-6 ${hy + 13} Q-3 ${hy + 10} 0 ${hy + 13} Q3 ${hy + 16} 6 ${hy + 13}`, 'none', 2.5); break;
    case 'cry': e = path(`M${-ex - 4} ${ey} Q${-ex} ${ey + 3} ${-ex + 4} ${ey} M${ex - 4} ${ey} Q${ex} ${ey + 3} ${ex + 4} ${ey}`, 'none', 2.5); m = ell(0, hy + 13, 5, 4, MOUTH_RED, 2.5);
      extra = path(`M${-ex} ${ey + 4} q-3 8 0 12 q3 -4 0 -12Z M${ex} ${ey + 4} q-3 8 0 12 q3 -4 0 -12Z`, '#9fdcff', 1.5); break;
    case 'wow': e = eye(-ex) + eye(ex) + path(`M${-ex - 4} ${ey - 10} Q${-ex} ${ey - 13} ${-ex + 4} ${ey - 10} M${ex - 4} ${ey - 10} Q${ex} ${ey - 13} ${ex + 4} ${ey - 10}`, 'none', 2.5); m = ell(0, hy + 13, 4, 5, MOUTH_RED, 2.5); break;
    case 'think': e = ell(-ex + 1, ey - 1, 3, 4, O, 0) + ell(ex + 1, ey - 1, 3, 4, O, 0); m = path(`M-3 ${hy + 13} L5 ${hy + 11}`, 'none', 2.5); break;
    case 'sleep': e = path(`M${-ex - 4} ${ey} Q${-ex} ${ey + 3} ${-ex + 4} ${ey} M${ex - 4} ${ey} Q${ex} ${ey + 3} ${ex + 4} ${ey}`, 'none', 2.5); m = ell(0, hy + 13, 2.5, 2, MOUTH_RED, 2); break;
    case 'calm': e = path(`M${-ex - 4} ${ey + 1} Q${-ex} ${ey - 4} ${-ex + 4} ${ey + 1} M${ex - 4} ${ey + 1} Q${ex} ${ey - 4} ${ex + 4} ${ey + 1}`, 'none', 2.5); m = path(`M-5 ${hy + 11} Q0 ${hy + 15} 5 ${hy + 11}`, 'none', 2.5); break;
    default: e = eye(-ex) + eye(ex); m = path(`M-6 ${hy + 10} Q0 ${hy + 17} 6 ${hy + 10}`, 'none', 2.5);
  }
  const cheeks = ell(-r * 0.62, hy + 8, 4.5, 3, '#ff8fa3', 0, 'opacity=".55"') + ell(r * 0.62, hy + 8, 4.5, 3, '#ff8fa3', 0, 'opacity=".55"');
  const gl = glasses ? circ(-ex, ey, 7, 'none', 2) + circ(ex, ey, 7, 'none', 2) + line(-ex + 7, ey, ex - 7, ey, O, 2) : '';
  return cheeks + e + m + extra + gl;
}
function hairParts(style, hy, r, c) {
  const top = hy - r;
  switch (style) {
    case 'girl': return [ell(0, hy - 2, r + 3, r + 3, c) + ell(-r - 4, hy + 10, 7, 10, c) + ell(r + 4, hy + 10, 7, 10, c) + circ(-r - 1, hy + 2, 3.5, '#ff6b8a', 2) + circ(r + 1, hy + 2, 3.5, '#ff6b8a', 2),
      path(`M${-r - 1} ${hy - 2} Q${-r} ${top - 4} 0 ${top - 4} Q${r} ${top - 4} ${r + 1} ${hy - 2} Q${r * 0.5} ${hy - r * 0.55} 0 ${hy - r * 0.5} Q${-r * 0.5} ${hy - r * 0.6} ${-r - 1} ${hy - 2}Z`, c)];
    case 'buns': return [circ(-r * 0.75, top + 1, 9, c) + circ(r * 0.75, top + 1, 9, c),
      path(`M${-r - 1} ${hy} Q${-r} ${top - 3} 0 ${top - 3} Q${r} ${top - 3} ${r + 1} ${hy} Q${r * 0.6} ${hy - r * 0.6} 0 ${hy - r * 0.45} Q${-r * 0.6} ${hy - r * 0.6} ${-r - 1} ${hy}Z`, c)];
    case 'boy': return ['', path(`M${-r - 1} ${hy + 2} Q${-r - 2} ${top - 3} 0 ${top - 4} Q${r + 2} ${top - 3} ${r + 1} ${hy + 2} L${r * 0.8} ${hy - r * 0.35} L${r * 0.55} ${hy - r * 0.2} L${r * 0.3} ${hy - r * 0.5} L0 ${hy - r * 0.3} L${-r * 0.35} ${hy - r * 0.55} L${-r * 0.6} ${hy - r * 0.25} L${-r * 0.85} ${hy - r * 0.4}Z`, c)];
    case 'mom': return [path(`M${-r - 4} ${hy} Q${-r - 6} ${top - 6} 0 ${top - 5} Q${r + 6} ${top - 6} ${r + 4} ${hy} L${r + 6} ${hy + r + 10} Q${r} ${hy + r + 14} ${r - 4} ${hy + r + 8} L${-r + 4} ${hy + r + 8} Q${-r} ${hy + r + 14} ${-r - 6} ${hy + r + 10}Z`, c),
      path(`M${-r - 1} ${hy} Q${-r} ${top - 4} 0 ${top - 4} Q${r} ${top - 4} ${r + 1} ${hy} Q${r * 0.3} ${hy - r * 0.75} ${-r * 0.2} ${hy - r * 0.45} Q${-r * 0.6} ${hy - r * 0.3} ${-r - 1} ${hy}Z`, c)];
    case 'dad': return ['', path(`M${-r - 1} ${hy - 1} Q${-r - 1} ${top - 4} 0 ${top - 4} Q${r + 1} ${top - 4} ${r + 1} ${hy - 1} Q${r * 0.6} ${hy - r * 0.62} 0 ${hy - r * 0.6} Q${-r * 0.6} ${hy - r * 0.62} ${-r - 1} ${hy - 1}Z`, c)];
    case 'grandma': return [circ(0, top - 3, 11, c), path(`M${-r - 1} ${hy} Q${-r} ${top - 3} 0 ${top - 3} Q${r} ${top - 3} ${r + 1} ${hy} Q${r * 0.7} ${hy - r * 0.55} 0 ${hy - r * 0.6} Q${-r * 0.7} ${hy - r * 0.55} ${-r - 1} ${hy}Z`, c) + path(`M-6 ${top - 2} Q0 ${top + 4} 6 ${top - 2}`, 'none', 2)];
    case 'grandpa': return ['', path(`M${-r - 1} ${hy + 4} Q${-r - 3} ${hy - r * 0.6} ${-r * 0.55} ${hy - r * 0.75} L${-r * 0.5} ${hy - r * 0.35} Q${-r * 0.8} ${hy - r * 0.2} ${-r * 0.8} ${hy + 4}Z M${r + 1} ${hy + 4} Q${r + 3} ${hy - r * 0.6} ${r * 0.55} ${hy - r * 0.75} L${r * 0.5} ${hy - r * 0.35} Q${r * 0.8} ${hy - r * 0.2} ${r * 0.8} ${hy + 4}Z`, c)];
    default: return ['', ''];
  }
}
function hatOf(h, hy, r, c) {
  const top = hy - r;
  switch (h) {
    case 'tuque': return path(`M${-r - 2} ${hy - 4} Q${-r} ${top - 10} 0 ${top - 10} Q${r} ${top - 10} ${r + 2} ${hy - 4}Z`, c) + rect(-r - 3, hy - 9, 2 * r + 6, 9, '#fff', 2.5, 4) + circ(0, top - 12, 7, '#fff', 2.5)
      + path(`M${-r * 0.5} ${top - 4} L${-r * 0.4} ${hy - 10} M0 ${top - 8} L0 ${hy - 10} M${r * 0.5} ${top - 4} L${r * 0.4} ${hy - 10}`, 'none', 2, 'opacity=".35"');
    case 'straw': return ell(0, hy - r * 0.55, r * 1.9, r * 0.45, '#f2cf6b') + path(`M${-r * 0.85} ${hy - r * 0.6} Q${-r * 0.8} ${top - 12} 0 ${top - 12} Q${r * 0.8} ${top - 12} ${r * 0.85} ${hy - r * 0.6}Z`, '#f2cf6b') + path(`M${-r * 0.85} ${hy - r * 0.75} Q0 ${hy - r * 0.55} ${r * 0.85} ${hy - r * 0.75}`, 'none', 4, 'stroke="#c8553d"');
    case 'cap': return path(`M${-r - 1} ${hy - 4} Q${-r} ${top - 6} 0 ${top - 6} Q${r} ${top - 6} ${r + 1} ${hy - 4}Z`, c) + path(`M${r * 0.2} ${hy - 6} Q${r + 14} ${hy - 8} ${r + 16} ${hy - 2} L${r * 0.2} ${hy - 2}Z`, c);
    case 'helmet': return path(`M${-r - 3} ${hy} Q${-r - 3} ${top - 8} 0 ${top - 8} Q${r + 3} ${top - 8} ${r + 3} ${hy}Z`, c) + path(`M${-r + 2} ${hy - 2} L${r - 2} ${hy - 2}`, 'none', 2) + path(`M${-r - 2} ${hy + 4} Q0 ${hy + r + 10} ${r + 2} ${hy + 4}`, 'none', 2.5, 'stroke="#c9ced8"');
    default: return '';
  }
}
export function person(x, y, s = 1, o = {}) {
  const A = o.kind === 'adult';
  const { skin = SKIN, hair = A ? 'dad' : 'girl', hairC = '#2b2b36', top = '#e9566f', bottom = '#3f6fb5', dress = false, shoes = '#5a4636', mood = 'happy', arms = 'down', legs = 'stand', hat = null, hatC = '#e8433a', scarf = null, glasses = false, item = '', back = '', flip = false, coat = false } = o;
  const g = A ? { hy: -150, r: 23, sh: -120, hip: -62, foot: -5, w1: 18, w2: 22, bodyTop: -128, armL: 28 } : { hy: -82, r: 24, sh: -57, hip: -26, foot: -5, w1: 15, w2: 20, bodyTop: -62, armL: 22 };
  const sit = legs === 'sit', dy = sit ? (A ? 50 : 20) : 0;
  const { hy, r, sh, hip } = g;
  const preset = {
    down: [[-g.w2 - 5, sh + g.armL + 4], [g.w2 + 5, sh + g.armL + 4]],
    up: [[-g.w2 - 14, sh - g.armL - 6], [g.w2 + 14, sh - g.armL - 6]],
    wave: [[-g.w2 - 5, sh + g.armL + 4], [g.w2 + 16, sh - g.armL - 4]],
    hold: [[-7, sh + 14], [7, sh + 14]],
    point: [[-g.w2 - 5, sh + g.armL + 4], [g.w2 + g.armL + 6, sh - 4]],
    hips: [[-g.w2 - 2, sh + 22], [g.w2 + 2, sh + 22]],
    reach: [[g.w2 + 8, sh + 2], [g.w2 + g.armL + 8, sh - 6]],
  };
  const [aL, aR] = Array.isArray(arms) ? arms : (preset[arms] || preset.down);
  const armC = top;
  const slx = -g.w1 + 2, srx = g.w1 - 2;
  const arm = (sx, [hx, hy2], side) => { const mx = (sx + hx) / 2 + side * 6, my = (sh + hy2) / 2 + 2; return limb(`M${sx} ${sh + 3} Q${mx} ${my} ${hx} ${hy2}`, armC, A ? 9 : 8) + circ(hx, hy2, A ? 5.5 : 5, skin, 2.5); };
  // legs
  let L = '';
  const legC = dress ? skin : bottom;
  if (sit) {
    L = limb(`M-8 ${hip + dy} Q-14 ${hip + dy + 4} -22 ${g.foot}`, legC, A ? 10 : 9) + limb(`M8 ${hip + dy} Q14 ${hip + dy + 4} 22 ${g.foot}`, legC, A ? 10 : 9) + ell(-24, g.foot, 8, 5, shoes, 2.5) + ell(24, g.foot, 8, 5, shoes, 2.5);
  } else {
    const f = legs === 'walk' ? [[-14, g.foot], [12, g.foot - 4]] : legs === 'run' ? [[-20, g.foot - 6], [16, g.foot]] : [[-9, g.foot], [9, g.foot]];
    L = limb(`M-8 ${hip} L${f[0][0]} ${f[0][1]}`, legC, A ? 10 : 9) + limb(`M8 ${hip} L${f[1][0]} ${f[1][1]}`, legC, A ? 10 : 9)
      + ell(f[0][0] - 2, f[0][1], 8, 5, shoes, 2.5) + ell(f[1][0] + 2, f[1][1], 8, 5, shoes, 2.5)
      + (legs === 'skate' ? path(`M${f[0][0] - 12} ${g.foot + 8} L${f[0][0] + 6} ${g.foot + 8} M${f[1][0] - 6} ${g.foot + 8} L${f[1][0] + 12} ${g.foot + 8}`, 'none', 3, 'stroke="#9aa3b5"') + line(f[0][0] - 2, g.foot + 4, f[0][0] - 2, g.foot + 8, O, 2) + line(f[1][0] + 2, g.foot + 4, f[1][0] + 2, g.foot + 8, O, 2) : '');
  }
  // body
  const bt = g.bodyTop + dy, bb = (dress ? hip + (A ? 24 : 10) : hip + 4) + dy;
  const body = coat
    ? path(`M${-g.w1 - 3} ${bt} Q${-g.w2 - 8} ${(bt + bb) / 2} ${-g.w2 - 4} ${bb + 2} Q0 ${bb + 8} ${g.w2 + 4} ${bb + 2} Q${g.w2 + 8} ${(bt + bb) / 2} ${g.w1 + 3} ${bt} Q0 ${bt - 5} ${-g.w1 - 3} ${bt}Z`, top) + path(`M${-g.w2 - 4} ${(bt + bb) / 2} Q0 ${(bt + bb) / 2 + 5} ${g.w2 + 4} ${(bt + bb) / 2}`, 'none', 2, 'opacity=".4"') + line(0, bt + 4, 0, bb + 4, O, 2)
    : path(`M${-g.w1} ${bt} Q${-g.w2 - 3} ${(bt + bb) / 2} ${-g.w2 - (dress ? 8 : 0)} ${bb} L${g.w2 + (dress ? 8 : 0)} ${bb} Q${g.w2 + 3} ${(bt + bb) / 2} ${g.w1} ${bt} Q0 ${bt - 4} ${-g.w1} ${bt}Z`, top)
      + (dress ? '' : rect(-g.w2 + 1, hip - 2 + dy, 2 * g.w2 - 2, 8, bottom, 2.5, 3));
  const [hb, hf] = hairParts(hair, hy + dy, r, hairC);
  const head = circ(-r + 1, hy + dy + 3, 5, skin, 2.5) + circ(r - 1, hy + dy + 3, 5, skin, 2.5) + circ(0, hy + dy, r, skin) + face(hy + dy, r, mood, glasses || (A && (hair === 'grandma' || hair === 'grandpa')));
  const sc = scarf ? path(`M${-g.w1} ${bt - 2} Q0 ${bt + 8} ${g.w1} ${bt - 2} L${g.w1} ${bt + 5} Q0 ${bt + 14} ${-g.w1} ${bt + 5}Z`, scarf, 2.5) + path(`M${g.w1 - 8} ${bt + 6} L${g.w1 - 2} ${bt + 24} L${g.w1 - 10} ${bt + 24} L${g.w1 - 14} ${bt + 8}Z`, scarf, 2.5) : '';
  const beard = A && hair === 'grandpa' && o.beard ? path(`M-10 ${hy + dy + 14} Q0 ${hy + dy + 34} 10 ${hy + dy + 14} Q0 ${hy + dy + 20} -10 ${hy + dy + 14}Z`, '#eef0f4', 2.5) : '';
  const inner = shadow(0, 2, A ? 34 : 28) + back + L + body + sc + hb + head + beard + hf + hatOf(hat, hy + dy, r, hatC)
    + arm(slx, [aL[0], aL[1] + dy], -1) + arm(srx, [aR[0], aR[1] + dy], 1) + item;
  return G(x, y, s, inner, flip);
}
export const kid = (x, y, s, o = {}) => person(x, y, s, { ...o, kind: 'kid' });
export const adult = (x, y, s, o = {}) => person(x, y, s, { ...o, kind: 'adult' });

// ---------------------------------------------------------------- animals (side view facing right unless noted; flip = face left)
const eyeA = (x, y, r = 3.2) => circ(x, y, r, O, 0) + circ(x + r * 0.35, y - r * 0.4, r * 0.35, '#fff', 0);
export function crow(x, y, s = 1, o = {}) {
  const { pose = 'stand', flip = false, mood = 'happy' } = o;
  const B = '#33384d', Wg = '#474e6b';
  const head = circ(20, -50, 14, B) + path('M31 -54 L47 -48 L31 -43Z', '#f2b84b', 2.5) + circ(24, -53, 5, '#fff', 2) + circ(25.5, -53, 2.6, O, 0) + circ(26.4, -54.2, 0.9, '#fff', 0)
    + (mood === 'sad' || mood === 'tired' ? path('M18 -61 L28 -58', 'none', 2.5, 'stroke="#fff"') : '') + (mood === 'happy' ? ell(17, -44, 3.5, 2.3, '#ff8fa3', 0, 'opacity=".6"') : '');
  const legs = path('M-2 -12 L-4 0 M-9 0 L1 0 M8 -12 L8 0 M3 0 L13 0', 'none', 3, 'stroke="#f2b84b"');
  const tail = path('M-20 -30 L-46 -20 L-42 -14 L-46 -8 L-18 -18Z', B);
  let wing = path('M-14 -36 Q4 -44 16 -34 Q6 -18 -16 -20 Z', Wg) + path('M-6 -28 L8 -30 M-8 -23 L6 -24', 'none', 2, 'opacity=".5"');
  if (pose === 'fly') wing = path('M-6 -36 Q-20 -76 4 -86 Q10 -60 14 -38Z', Wg) + path('M-2 -48 L4 -74 M4 -44 L10 -66', 'none', 2, 'opacity=".5"');
  const bird = tail + (pose === 'fly' ? '' : legs) + ell(0, -28, 25, 18, B) + ell(4, -22, 14, 8, '#565e7d', 0, 'opacity=".6"') + wing + head;
  const inner = (pose === 'fly' ? '' : shadow(2, 1, 22)) + (pose === 'drink' ? `<g transform="rotate(32 0 -12)">${bird}</g>` : bird);
  return G(x, y, s, inner, flip);
}
export function rabbit(x, y, s = 1, o = {}) {
  const { pose = 'sit', flip = false, c = '#f4f1ec', mood = 'happy' } = o;
  const ears = path('M14 -54 Q8 -90 18 -92 Q26 -88 22 -54Z', c) + path('M15 -60 Q12 -84 18 -86 Q22 -82 20 -60Z', '#ffb8c6', 0) + path('M24 -54 Q26 -88 36 -86 Q42 -80 30 -52Z', c);
  const face_ = mood === 'dizzy' ? path('M27 -48 l6 6 m0 -6 l-6 6', 'none', 2.5) : eyeA(31, -45);
  const head = ears + circ(26, -40, 17, c) + face_ + circ(42, -38, 3, '#ff8fa3', 2) + path('M40 -33 Q38 -29 35 -31', 'none', 2) + ell(30, -33, 4, 2.5, '#ff8fa3', 0, 'opacity=".55"');
  let body;
  if (pose === 'run') body = path('M-30 -18 Q-34 -8 -40 -2', 'none', 4) + ell(-4, -24, 30, 17, c) + circ(-33, -30, 7, '#fff') + limb('M14 -14 L34 -4', c, 7) + limb('M-18 -14 L-38 -8', c, 7) + limb('M10 -14 L22 0', c, 7);
  else if (pose === 'dizzy') body = ell(0, -14, 30, 14, c) + circ(-30, -16, 7, '#fff') + limb('M-10 -4 L-16 4', c, 7) + limb('M10 -4 L18 4', c, 7);
  else body = ell(-2, -22, 24, 22, c) + circ(-25, -14, 7, '#fff') + ell(-6, -4, 14, 6, c) + limb('M14 -20 L18 -6', c, 6);
  const inner = shadow(0, 1, 30) + body + (pose === 'dizzy' ? G(0, 30, 1, head, false, 0).replace('translate(0 30)', 'translate(4 16) rotate(-18)') : head)
    + (pose === 'dizzy' ? star(10, -64, 6) + star(30, -70, 5) + star(46, -60, 6) : '');
  return G(x, y, s, inner, flip);
}
// panda: front-facing chibi. arms: 'down' | 'up' | 'hold' | 'wave'; pose 'stand' | 'sit'
export function panda(x, y, s = 1, o = {}) {
  const { mood = 'happy', arms = 'down', pose = 'stand', item = '', flip = false, scarf = null } = o;
  const K = '#2f3346', Wt = '#ffffff';
  const sit = pose === 'sit';
  const legs = sit ? ell(-20, -8, 13, 10, K) + ell(20, -8, 13, 10, K) + ell(-22, -8, 6, 5, '#555b73', 0) + ell(22, -8, 6, 5, '#555b73', 0) : ell(-13, -9, 11, 12, K) + ell(13, -9, 11, 12, K);
  const body = ell(0, -40, 30, 30, Wt) + ell(0, -36, 18, 18, '#f3f1ea', 0);
  const A = { down: [[-30, -24], [30, -24]], up: [[-38, -84], [38, -84]], hold: [[-10, -42], [10, -42]], wave: [[-30, -24], [40, -80]] }[arms] || [[-30, -24], [30, -24]];
  const arm = (sx, [hx, hy]) => limb(`M${sx} -58 Q${(sx + hx) / 2} ${(-58 + hy) / 2} ${hx} ${hy}`, K, 13) + circ(hx, hy, 7, K, 2.5);
  const hy = -90;
  const fc = mood === 'laugh' ? path('M-14 -92 q4 -5 8 0 M6 -92 q4 -5 8 0', 'none', 2.5, 'stroke="#fff"') : mood === 'sad' || mood === 'cry' ? circ(-10, -91, 2.6, '#fff', 0) + circ(10, -91, 2.6, '#fff', 0) + (mood === 'cry' ? path('M-10 -84 q-3 8 0 11 q3 -3 0 -11Z M10 -84 q-3 8 0 11 q3 -3 0 -11Z', '#9fdcff', 1.5) : '') : circ(-10, -91, 3, '#fff', 0) + circ(10, -91, 3, '#fff', 0) + circ(-9, -92, 1.2, K, 0) + circ(11, -92, 1.2, K, 0);
  const mouth = mood === 'sad' || mood === 'cry' ? path('M-5 -73 Q0 -77 5 -73', 'none', 2.5) : mood === 'wow' ? ell(0, -73, 4, 4.5, MOUTH_RED, 2.5) : mood === 'laugh' ? path('M-7 -76 Q0 -66 7 -76Z', MOUTH_RED, 2.5) : path('M-5 -76 Q0 -71 5 -76', 'none', 2.5);
  const head = circ(-22, -112, 10, K) + circ(22, -112, 10, K) + ell(0, hy, 30, 26, Wt) + ell(-11, -90, 8, 10, K, 0, 'transform="rotate(25 -11 -90)"') + ell(11, -90, 8, 10, K, 0, 'transform="rotate(-25 11 -90)"') + fc + ell(0, -80, 5, 3.5, K, 0) + mouth + ell(-19, -78, 4.5, 3, '#ff8fa3', 0, 'opacity=".6"') + ell(19, -78, 4.5, 3, '#ff8fa3', 0, 'opacity=".6"');
  const sc = scarf ? path('M-22 -64 Q0 -54 22 -64 L22 -57 Q0 -47 -22 -57Z', scarf, 2.5) : '';
  return G(x, y, s, shadow(0, 1, 32) + legs + body + sc + head + arm(-22, A[0]) + arm(22, A[1]) + item, flip);
}
export function pony(x, y, s = 1, o = {}) {
  const { c = '#d99a5b', mane = '#7a4a2a', flip = false, sack = false, mood = 'happy', legs = 'stand' } = o;
  const lg = legs === 'walk' ? ['M-24 -40 L-32 -2', 'M-14 -40 L-10 -2', 'M18 -40 L12 -2', 'M28 -40 L36 -2'] : ['M-26 -40 L-26 -2', 'M-14 -40 L-14 -2', 'M18 -40 L18 -2', 'M30 -40 L30 -2'];
  const legsS = lg.map((d) => limb(d, c, 8)).join('') + lg.map((d) => { const m = d.match(/L(-?\d+) (-?\d+)/); return ell(+m[1], +m[2], 6, 4, '#5a4636', 2.5); }).join('');
  const body = ell(0, -50, 38, 20, c) + path('M-36 -56 Q-56 -50 -52 -24 Q-44 -40 -36 -46Z', mane);
  const neck = path('M22 -62 Q30 -86 40 -92 L54 -82 Q44 -70 36 -46Z', c);
  const head = ell(52, -88, 13, 11, c, 3, 'transform="rotate(25 52 -88)"') + ell(60, -78, 9, 8, c) + circ(63, -77, 1.5, O, 0) + path('M40 -100 L44 -114 L50 -100Z', c) + eyeA(50, -91) + path('M38 -96 Q30 -84 26 -66 Q34 -80 42 -92Z', mane)
    + path(`M56 -71 Q${mood === 'sad' ? '60 -74 64 -71' : '60 -68 64 -71'}`, 'none', 2) + ell(48, -82, 4, 2.6, '#ff8fa3', 0, 'opacity=".55"');
  const sk = sack ? path('M-14 -76 Q-20 -64 -18 -54 L16 -54 Q20 -64 12 -76 Q0 -82 -14 -76Z', '#e9d3a6') + path('M-4 -78 L-6 -86 M4 -78 L6 -86', 'none', 2.5) + path('M-10 -64 L10 -64', 'none', 2, 'opacity=".35"') : '';
  return G(x, y, s, shadow(0, 1, 44) + legsS + body + neck + head + sk, flip);
}
export function cow(x, y, s = 1, o = {}) {
  const { flip = false } = o, c = '#fbf7f0', K = '#4a4a5a';
  const lg = ['M-30 -40 L-30 -2', 'M-16 -40 L-16 -2', 'M20 -40 L20 -2', 'M34 -40 L34 -2'];
  return G(x, y, s, shadow(0, 1, 52) + lg.map((d) => limb(d, c, 10)).join('') + lg.map((d) => { const m = d.match(/L(-?\d+) (-?\d+)/); return ell(+m[1], +m[2], 7, 4, K, 2.5); }).join('')
    + ell(0, -54, 46, 26, c) + path('M-20 -74 Q-6 -66 -12 -50 Q-26 -44 -30 -60Z M10 -46 Q22 -52 26 -40 Q14 -32 8 -40Z', K, 0) + path('M-46 -56 Q-58 -40 -54 -26', 'none', 3) + ell(-54, -24, 4, 6, K, 0)
    + ell(42, -70, 18, 16, c) + path('M30 -84 Q22 -98 30 -96 M54 -84 Q62 -98 54 -96', 'none', 4, 'stroke="#e9d3a6"') + ell(30, -82, 8, 4, c, 2.5, 'transform="rotate(-25 30 -82)"')
    + ell(48, -60, 13, 9, '#f7b8b0') + circ(44, -60, 2, O, 0) + circ(52, -60, 2, O, 0) + eyeA(42, -74) + path('M35 -79 L39 -78', 'none', 2) + path('M36 -46 L36 -40', 'none', 2) + circ(36, -38, 4, '#f2b84b', 2), flip);
}
export function squirrel(x, y, s = 1, o = {}) {
  const { flip = false, mood = 'happy' } = o, c = '#d9733b';
  return G(x, y, s, shadow(0, 1, 18) + path('M-10 -10 Q-40 -10 -36 -44 Q-34 -70 -14 -66 Q-28 -52 -18 -34 Q-12 -22 -10 -10Z', c) + path('M-18 -52 Q-28 -40 -20 -26', 'none', 2, 'opacity=".4"')
    + ell(0, -18, 12, 16, c) + ell(2, -14, 7, 10, '#f6d7b0', 0) + circ(6, -38, 11, c) + path('M0 -46 L2 -56 L8 -47Z', c, 2.5) + eyeA(9, -39, 2.4) + circ(16, -36, 2, O, 0)
    + (mood === 'wow' ? ell(11, -31, 2, 2.5, MOUTH_RED, 1.5) : '') + limb('M6 -22 L14 -26', c, 4) + ell(-2, -2, 8, 4, c, 2.5), flip);
}
export function monkey(x, y, s = 1, o = {}) {
  const { flip = false, arms = 'down', mood = 'happy', item = '' } = o, c = '#a8703f', f = '#f2d2a6';
  const A = arms === 'up' ? [[-24, -74], [24, -74]] : arms === 'hold' ? [[-8, -36], [8, -36]] : [[-22, -14], [22, -14]];
  return G(x, y, s, shadow(0, 1, 22) + path('M14 -14 Q40 -10 36 -40 Q34 -52 42 -54', 'none', 4) + limb('M-8 -20 L-12 -2', c, 8) + limb('M8 -20 L12 -2', c, 8) + ell(0, -30, 16, 18, c) + ell(0, -26, 9, 11, f, 0)
    + limb(`M-12 -40 L${A[0][0]} ${A[0][1]}`, c, 7) + limb(`M12 -40 L${A[1][0]} ${A[1][1]}`, c, 7)
    + circ(-20, -64, 8, f) + circ(20, -64, 8, f) + circ(0, -62, 18, c) + path('M-13 -60 Q-14 -72 -4 -70 Q0 -66 4 -70 Q14 -72 13 -60 Q12 -48 0 -48 Q-12 -48 -13 -60Z', f, 2.5)
    + eyeA(-6, -62, 2.6) + eyeA(6, -62, 2.6) + (mood === 'laugh' ? path('M-5 -55 Q0 -49 5 -55Z', MOUTH_RED, 2) : path('M-4 -54 Q0 -51 4 -54', 'none', 2)) + item, flip);
}
export function bird(x, y, s = 1, c = '#ffb347', flip = false, flying = false) {
  return G(x, y, s, (flying ? path('M-4 -10 Q-12 -26 4 -24 Q4 -16 2 -10Z', c) : '') + ell(0, -8, 11, 9, c) + circ(8, -14, 6, c) + path('M13 -15 L19 -13 L13 -11Z', '#f2b84b', 2) + circ(9, -15, 1.4, O, 0) + path('M-10 -10 L-18 -14 L-16 -6Z', c, 2.5) + (flying ? '' : path('M-2 -2 L-2 2 M3 -2 L3 2', 'none', 2)), flip);
}
export function frog(x, y, s = 1, o = {}) {
  const { flip = false, mood = 'happy' } = o, c = '#7cc36a';
  return G(x, y, s, shadow(0, 1, 16) + ell(0, -10, 16, 11, c) + circ(-8, -20, 6, c) + circ(8, -20, 6, c) + circ(-8, -21, 3, '#fff', 0) + circ(8, -21, 3, '#fff', 0) + circ(-8, -21, 1.6, O, 0) + circ(8, -21, 1.6, O, 0)
    + (mood === 'laugh' ? path('M-8 -9 Q0 -1 8 -9Z', MOUTH_RED, 2) : path('M-7 -9 Q0 -4 7 -9', 'none', 2)) + ell(-14, -2, 7, 3, c, 2.5) + ell(14, -2, 7, 3, c, 2.5), flip);
}
export function dog(x, y, s = 1, o = {}) {
  const { flip = false, c = '#e8c48f', mood = 'happy', item = '', pose = 'stand' } = o, ear = '#a8703f';
  const lg = pose === 'run' ? ['M-18 -16 L-30 -4', 'M-8 -16 L-2 -2', 'M12 -16 L4 -4', 'M20 -16 L30 -6'] : ['M-18 -16 L-18 -2', 'M-8 -16 L-8 -2', 'M10 -16 L10 -2', 'M20 -16 L20 -2'];
  return G(x, y, s, shadow(0, 1, 28) + lg.map((d) => limb(d, c, 7)).join('') + path('M-24 -28 Q-36 -40 -32 -48', 'none', 4) + ell(0, -26, 26, 13, c) + ell(-6, -30, 8, 6, ear, 0, 'opacity=".7"')
    + circ(28, -42, 14, c) + ell(38, -36, 8, 6, c) + circ(45, -38, 3, O, 0) + path('M20 -54 Q14 -40 22 -32 Q28 -44 24 -54Z', ear) + eyeA(31, -46, 2.8)
    + (mood === 'laugh' ? path('M34 -31 Q38 -24 42 -30Z', MOUTH_RED, 2) : path('M34 -31 Q38 -28 42 -31', 'none', 2)) + item, flip);
}
export function cat(x, y, s = 1, o = {}) {
  const { flip = false, c = '#f2a65a', mood = 'happy', paws = null } = o;
  return G(x, y, s, shadow(0, 1, 18) + path('M-12 -6 Q-30 -6 -30 -20 Q-30 -34 -20 -32', 'none', 5, `stroke="${c}"`) + path('M-12 -6 Q-30 -6 -30 -20 Q-30 -34 -20 -32', 'none', 1.5)
    + ell(0, -16, 14, 16, c) + ell(-6, -2, 6, 4, paws || c, 2.5) + ell(6, -2, 6, 4, paws || c, 2.5) + path('M-14 -38 L-12 -54 L-2 -44Z M14 -38 L12 -54 L2 -44Z', c) + circ(0, -38, 14, c)
    + (mood === 'sleep' ? path('M-9 -40 q3 3 6 0 M3 -40 q3 3 6 0', 'none', 2) : eyeA(-6, -40, 2.4) + eyeA(6, -40, 2.4)) + path('M-2 -34 L2 -34 L0 -32Z', '#ff8fa3', 1.5) + path('M-4 -30 Q0 -28 0 -31 Q0 -28 4 -30', 'none', 1.8)
    + path('M-8 -33 L-20 -35 M-8 -31 L-20 -29 M8 -33 L20 -35 M8 -31 L20 -29', 'none', 1.2), flip);
}
