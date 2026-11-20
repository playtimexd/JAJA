// en-where-is-biscuit — English storybook, level 2 (docs/LIVRES.md). Catch Unit 7: People Around Me (helpers, places, directions).
import { O, SKIN, svg, sky, ell, circ, rect, path, line, G, rnd, shadow, cloud, sun, tree, bush, lawn, day, floorRoom, win, table, mug, heart, sparkle, zzz, note, motion, kid, adult, cat } from './art/kit.js';

// ---- characters ----
const ava = (x, y, s, o = {}) => kid(x, y, s, { hs: 'ponytail', hair: '#2a1d14', skin: SKIN.brown, shirt: '#f2c94c', pants: '#3f5a8a', shoes: '#e6493f', ...o });
const dad = (x, y, s, o = {}) => adult(x, y, s * 1.1, { hs: 'short', hair: '#2a1d14', beard: '#2a1d14', skin: SKIN.brown, glasses: true, shirt: '#4a90d9', pants: '#5a5f73', ...o });
const biscuit = (x, y, s, o = {}) => cat(x, y, s, { c: '#f0a64a', st: '#c9772a', ...o });
const capC = path('M-25 -114 Q-24 -134 0 -134 Q24 -134 25 -114Z', '#2d4f8a') + path('M-26 -114 Q0 -110 34 -112 Q30 -106 -26 -108Z', '#1f3a6a', 2.4) + circ(0, -126, 3, '#e6493f', 0);
const mailBag = path('M-22 -74 L16 -40', 'none', 4, 'stroke="#7a4b2a"') + rect(8, -48, 30, 26, '#8a5a3b', 2.5, 4) + rect(8, -48, 30, 9, '#a87048', 2.2, 3) + rect(14, -64, 18, 14, '#fff', 2, 1);
const lopez = (x, y, s, o = {}) => adult(x, y, s, { hs: 'short', hair: '#3a2a1a', skin: SKIN.tan, shirt: '#3b5b9a', pants: '#2d3f66', ...o, extra: capC + mailBag + (o.extra || '') });
const chefHat = circ(-12, -138, 11, '#fff', 2.5) + circ(12, -138, 11, '#fff', 2.5) + circ(0, -146, 13, '#fff', 2.5) + rect(-18, -134, 36, 14, '#fff', 2.5, 3);
const apron = path('M-14 -70 L14 -70 L18 -30 Q0 -26 -18 -30Z', '#fff', 2.4) + rect(-8, -62, 16, 9, '#f6b6c8', 1.8, 2);
const mrsRoy = (x, y, s, o = {}) => adult(x, y, s, { hs: 'short', hair: '#c0392b', skin: SKIN.light, shirt: '#f78fb3', pants: '#5a5f73', ...o, extra: apron + chefHat + (o.extra || '') });
const turban = path('M-27 -104 Q-30 -136 0 -138 Q30 -136 27 -104 Q14 -116 0 -112 Q-14 -116 -27 -104Z', '#e8762c') + path('M-24 -114 Q0 -132 24 -120 M-22 -124 Q4 -138 20 -128', 'none', 2.2, 'stroke="#b5521a"') + path('M-4 -112 L0 -118 L4 -112Z', '#b5521a', 0);
const tie = path('M-9 -76 L0 -66 L9 -76Z', '#fff', 2) + path('M-3 -68 L3 -68 L5 -44 L0 -38 L-5 -44Z', '#2d4f8a', 2);
const singh = (x, y, s, o = {}) => adult(x, y, s, { hs: 'bald', hair: '#c8ccd4', beard: '#b9bec8', skin: SKIN.peach, shirt: '#7a8f5a', pants: '#4a4f63', shoes: '#2a2a2a', ...o, extra: tie + path('M-12 -86 Q-6 -82 0 -84 Q6 -82 12 -86', 'none', 2, 'stroke="#8a8f99"') + turban + (o.extra || '') });
const nora = (x, y, s, o = {}) => adult(x, y, s, { hs: 'short', hair: '#e8a33c', skin: SKIN.light, helmet: '#d9342b', coat: '#c9a227', pants: '#c9a227', shoes: '#2a2a2a', mitts: '#3a3f55', ...o });
const bowl = (x, y, s = 1, full = true) => G(x, y, s, ell(0, -10, 18, 5, full ? '#a8643a' : '#cfd8e3', 2) + (full ? [-8, -2, 5, 10, -4, 3].map((a, i) => circ(a, -12 - (i % 2) * 3, 3, '#7a4b2a', 1.2)).join('') : '') + path('M-18 -10 L-14 0 L14 0 L18 -10Z', '#4a90d9'));
const muffin = (x, y, s = 1, c = '#c98f5c') => G(x, y, s, path('M-9 0 L-11 -12 L11 -12 L9 0Z', '#f6b6c8', 2) + path('M-13 -12 Q-14 -24 0 -24 Q14 -24 13 -12Z', c, 2) + circ(-4, -18, 1.6, '#4a2f2a', 0) + circ(4, -16, 1.6, '#4a2f2a', 0));
const cookie = (x, y, r = 8) => circ(x, y, r, '#d9a05b', 2) + circ(x - 3, y - 2, 1.6, '#4a2f2a', 0) + circ(x + 3, y + 2, 1.6, '#4a2f2a', 0) + circ(x + 2, y - 3, 1.3, '#4a2f2a', 0);
const cookiePlate = (s = 1) => G(0, -54, s, ell(0, 0, 22, 6, '#fff', 2.4) + cookie(-9, -5, 7) + cookie(8, -5, 7) + cookie(0, -11, 7));
const smell = (x, y) => path(`M${x} ${y} q-8 -10 0 -20 q8 -10 0 -20 M${x + 14} ${y + 4} q-8 -10 0 -20 q8 -10 0 -20`, 'none', 3, 'stroke="#fff" opacity=".85"');
const curled = (x, y, s = 1) => G(x, y, s, path('M18 2 Q34 -4 30 -16 Q26 -22 20 -14', 'none', 9) + path('M18 2 Q34 -4 30 -16 Q26 -22 20 -14', 'none', 5, 'stroke="#f0a64a"') + ell(0, -6, 26, 14, '#f0a64a') + path('M-6 -18 q2 6 0 10 M4 -19 q2 6 0 10 M14 -16 q2 5 0 8', 'none', 2, 'stroke="#c9772a"')
  + path('M-30 -18 L-30 -34 L-20 -24Z M-12 -20 L-10 -34 L-20 -26Z', '#f0a64a', 2.4) + circ(-20, -14, 13, '#f0a64a') + path('M-28 -14 q3 2 6 0 M-18 -14 q3 2 6 0', 'none', 1.8) + path('M-21 -9 h3 l-1.5 2Z', '#ff8fa3', 1) + ell(-8, 2, 9, 4, '#fbe3c4', 2));

// ---- places ----
const sidewalk = (y = 226) => rect(0, y, 400, 300 - y, '#7d8597', 0) + rect(0, y, 400, 22, '#b9bfcc', 0) + line(0, y, 400, y, O, 3) + line(0, y + 22, 400, y + 22, O, 2) + [50, 140, 230, 320].map((a) => line(a, y, a - 4, y + 22, O, 1.5)).join('') + [30, 130, 230, 330].map((a) => rect(a, y + 52, 40, 6, '#f2f2f2', 0, 2)).join('');
const bakery = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 70, 6) + rect(-64, -120, 128, 120, '#f6d1a4') + Array.from({ length: 12 }, (_, i) => path(`M${-70 + i * 12} -96 L${-64 + i * 12} -80 L${-58 + i * 12} -96Z`, i % 2 ? '#fff' : '#ff8fa3', 2)).join('') + rect(-70, -104, 140, 10, '#ff8fa3', 2.5)
  + rect(-54, -74, 60, 50, '#bfe8ff') + [-42, -26, -10].map((a) => G(a, -28, .9, path('M-9 0 L-11 -12 L11 -12 L9 0Z', '#f6b6c8', 2) + path('M-13 -12 Q-14 -24 0 -24 Q14 -24 13 -12Z', '#c98f5c', 2))).join('') + rect(20, -70, 32, 70, '#c0392b', 3, 3) + circ(46, -34, 2.5, '#ffd84d', 0)
  + ell(0, -112, 18, 8, '#e8b06a', 2.4) + path('M-8 -114 l4 4 M0 -115 l4 4 M8 -114 l4 4', 'none', 1.6));
const library = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 80, 6) + rect(-74, -110, 148, 110, '#d8dde8') + path('M-84 -108 L0 -146 L84 -108Z', '#9aa6bd') + rect(-84, -112, 168, 8, '#b9c2d4') + [-56, -28, 28, 56].map((a) => rect(a - 7, -104, 14, 96, '#eef1f6', 2.5)).join('')
  + rect(-16, -60, 32, 60, '#5d7fb3', 3, 3) + rect(-86, -10, 172, 10, '#b9c2d4') + G(0, -126, 1, path('M-12 -6 L0 -2 L12 -6 L12 8 L0 12 L-12 8Z', '#e6493f', 2) + line(0, -2, 0, 12, O, 2)));
const fireStation = (x, y, s = 1, open = false) => G(x, y, s, shadow(0, 0, 90, 6) + rect(-84, -132, 168, 132, '#c4553f') + Array.from({ length: 9 }, (_, i) => line(-84, -120 + i * 14, 84, -120 + i * 14, '#a8432f', 1.5)).join('') + rect(-92, -142, 184, 14, '#7a3a2f')
  + rect(-60, -96, 120, 96, open ? '#3b3442' : '#e8e2d8', 3, 4) + (open ? '' : Array.from({ length: 5 }, (_, i) => line(-60, -78 + i * 18, 60, -78 + i * 18, '#b9b2a6', 2)).join('')) + circ(0, -114, 10, '#ffd84d', 2.5) + line(0, -124, 0, -132, O, 2.5));
const house = (x, y, s = 1, wall = '#9ad0c2', roof = '#4f7a9a') => G(x, y, s, shadow(0, 0, 60, 6) + rect(-50, -76, 100, 76, wall) + path('M-60 -72 L0 -118 L60 -72Z', roof) + rect(-38, -58, 26, 24, '#bfe8ff') + line(-25, -58, -25, -34, O, 2) + rect(12, -58, 26, 24, '#bfe8ff') + line(25, -58, 25, -34, O, 2) + rect(-10, -40, 20, 40, '#7c4a2d', 3, 3));
const mailbox = (x, y, s = 1) => G(x, y, s, rect(-4, -40, 8, 40, '#5a5f73') + path('M-18 -40 L-18 -66 Q0 -82 18 -66 L18 -40Z', '#e6493f') + rect(-10, -60, 20, 4, O, 0));
const parkEdge = (x, y) => tree(x, y, 1.1, '#5fb05a') + Array.from({ length: 6 }, (_, i) => line(x - 70 + i * 12, y, x - 70 + i * 12, y - 22, '#fff', 4)).join('') + line(x - 74, y - 16, x - 6, y - 16, '#fff', 4);
const town = () => day(340) + sidewalk(226);
const arrowL = (x, y) => path(`M${x} ${y} l-30 0 m10 -10 l-10 10 l10 10`, 'none', 4, 'stroke="#fff"');

const P1 = svg(floorRoom('#fff1d6', '#d6a46d', 215) + win(160, 30, 100, 78, day(250) + tree(200, 140, .9)) + G(215, 66, 1, path('M0 -30 L36 -40 L36 36 L0 36Z', '#bfe8ff', 2.5) + line(0, -30, 0, 36, O, 3), false) + rect(120, 130, 190, 85, '#9ad0c2') + rect(112, 122, 206, 12, '#e8dccb') + rect(176, 124, 60, 10, '#cfd8e3', 2, 3) + line(160, 140, 160, 215, O, 2) + line(250, 140, 250, 215, O, 2)
  + dad(350, 280, .95, { face: 'worried', arms: 'down', extra: '' }) + mug(330, 216, 1.2) + ava(80, 284, 1.05, { face: 'worried', arms: 'hold', extra: rect(-12, -66, 24, 30, '#e6493f', 2.5, 3) + circ(0, -52, 7, '#fff', 0) }) + bowl(170, 280, 1.4));

const bedroom = () => rect(0, 0, 400, 300, '#e8dff5', 0) + rect(0, 215, 400, 85, '#c98f5c', 0) + line(0, 215, 400, 215, O, 3) + win(40, 40, 70, 60, day(80));
const bed = (x, y) => rect(x, y - 70, 14, 70, '#9c6a40') + rect(x + 14, y - 46, 170, 22, '#9c6a40') + rect(x + 14, y - 62, 170, 18, '#7ab0e8', 2.5, 6) + rect(x + 20, y - 74, 40, 14, '#fff', 2.5, 6) + rect(x + 184, y - 56, 12, 56, '#9c6a40') + rect(x + 20, y - 24, 8, 24, '#9c6a40') + rect(x + 172, y - 24, 8, 24, '#9c6a40') + rect(x + 28, y - 24, 144, 24, '#3a3448', 0);
const basket = (x, y) => G(x, y, 1, path('M-26 -40 L26 -40 L20 0 L-20 0Z', '#e8c48f') + Array.from({ length: 4 }, (_, i) => line(-24 + i, -32 + i * 9, 24 - i, -32 + i * 9, '#b08850', 2)).join('') + path('M-20 -40 q6 -12 14 -4 q8 -10 16 0 q6 -8 10 4Z', '#f78fb3', 2) + rect(-6, -48, 16, 10, '#9ad0c2', 2, 3));
const P2 = svg(bedroom() + bed(150, 236) + ell(230, 228, 46, 10, '#ffe9a0', 0, 'opacity=".75"') + ava(110, 286, 1, { face: 'worried', arms: 'point', extra: rect(46, -86, 18, 10, '#5a5f73', 2, 2) }) + path('M168 202 L232 216 L232 240 L168 214Z', '#ffe9a0', 0, 'opacity=".55"')
  + basket(56, 290) + dad(330, 284, .95, { face: 'worried', arms: 'hold', legs: 'stand', extra: G(0, -46, 1, ell(-6, 4, 12, 7, '#5a3e2b', 2.2)) }));

const P3 = svg(town() + parkEdge(60, 228) + house(190, 228, .9) + house(330, 228, .85, '#f4c27a', '#d9534f') + mailbox(262, 240) + arrowL(70, 170)
  + lopez(250, 284, 1, { face: 'happy', arms: 'point', flip: true }) + ava(140, 286, 1, { face: 'wow', arms: 'down' }) + dad(80, 286, .95, { face: 'smile', arms: 'down' }) + G(110, 150, 1, path('M-6 0 q10 -14 22 -8', 'none', 6, 'stroke="#f0a64a"')));

const slide = (x, y) => G(x, y, 1, line(-40, 0, -40, -80, O, 4) + line(-60, 0, -60, -80, O, 4) + Array.from({ length: 5 }, (_, i) => line(-60, -14 - i * 16, -40, -14 - i * 16, O, 3)).join('') + rect(-64, -86, 30, 8, '#e6493f', 2.5, 3) + path('M-36 -84 Q10 -60 30 -4 L44 -4 Q20 -66 -34 -96Z', '#4a90d9'));
const squirrel = (x, y, s = 1, flip = false) => G(x, y, s, path('M8 -6 Q26 -10 22 -30 Q18 -42 8 -36 Q16 -26 4 -14Z', '#b8743c', 2.2) + ell(0, -10, 9, 10, '#c9844a', 2.2) + circ(-6, -22, 7, '#c9844a', 2.2) + path('M-8 -28 l-1 -6 l4 4Z', '#c9844a', 1.6) + circ(-9, -23, 1.5, O, 0), flip);
const pigeon = (x, y, s = 1, flip = false) => G(x, y, s, ell(0, -8, 12, 8, '#9aa3b5', 2) + circ(-10, -16, 6, '#8a93a5', 2) + path('M-16 -16 l-5 2 l5 1Z', '#f2c94c', 1.4) + circ(-11, -17, 1.2, O, 0) + line(-2, 0, -2, 4, '#e6866a', 2) + line(3, 0, 3, 4, '#e6866a', 2), flip);
const P4 = svg(day(70) + lawn(190) + rect(250, 178, 150, 20, '#b9bfcc', 2) + bakery(330, 186, .85) + smell(300, 70) + tree(56, 210, 1.3) + slide(190, 252) + squirrel(36, 204, 1.1) + squirrel(150, 280, 1, true) + pigeon(300, 285, 1) + pigeon(330, 280, .9, true) + pigeon(360, 290, 1)
  + dad(100, 290, .95, { face: 'grin', arms: 'point' }) + ava(250, 288, 1, { face: 'wow', arms: 'down' }) + sparkle(250, 90, .8));

const P5 = svg(floorRoom('#fde2e8', '#c98f5c', 215) + win(30, 34, 90, 70, day(80)) + biscuit(75, 112, .35) + rect(250, 40, 130, 110, '#5a5f73') + rect(262, 56, 106, 70, '#3a3442', 3, 6) + ell(315, 92, 40, 20, '#ff9f1c', 0, 'opacity=".5"') + rect(262, 130, 106, 8, '#c8ccd4', 2)
  + mrsRoy(300, 270, .95, { face: 'laugh', arms: 'hold', extra: rect(-28, -56, 56, 8, '#c8ccd4', 2.4, 2) + muffin(-16, -56, .8) + muffin(0, -56, .8) + muffin(16, -56, .8) }) + smell(290, 150)
  + rect(140, 196, 110, 70, '#f6b6c8') + rect(134, 190, 122, 10, '#c98f5c') + muffin(160, 190, .9) + muffin(185, 190, .9) + muffin(210, 190, .9) + muffin(235, 190, .9)
  + dad(40, 288, .9, { face: 'smile', arms: 'down' }) + ava(100, 290, 1, { face: 'laugh', arms: 'cheer' }));

const shelf = (x, y, w, h) => rect(x, y, w, h, '#9c6a40') + Array.from({ length: Math.floor(h / 40) }, (_, r) => line(x, y + 40 * (r + 1), x + w, y + 40 * (r + 1), O, 3) + Array.from({ length: Math.floor(w / 12) - 1 }, (_, i) => rect(x + 5 + i * 12, y + 40 * r + 10 + (rnd(i + r * 9) * 8 | 0), 10, 30 - (rnd(i + r * 9) * 8 | 0), ['#e6493f', '#4a90d9', '#3fb55f', '#f2c94c', '#9b59b6'][(i + r) % 5], 1.6)).join('')).join('');
const chair = (x, y) => G(x, y, 1, shadow(0, 0, 50, 6) + rect(-44, -96, 88, 70, '#3fa58f', 3, 20) + rect(-56, -54, 24, 50, '#3fa58f', 3, 10) + rect(32, -54, 24, 50, '#3fa58f', 3, 10) + rect(-36, -40, 72, 30, '#4fb8a0', 3, 8) + rect(-40, -10, 6, 10, '#7a4b2a', 2) + rect(34, -10, 6, 10, '#7a4b2a', 2)
  + Array.from({ length: 14 }, (_, i) => path(`M${-30 + rnd(i) * 60} ${-36 + rnd(i + 9) * 24} q4 -3 8 0`, 'none', 2, 'stroke="#f0a64a"')).join(''));
const P6 = svg(floorRoom('#efe6d6', '#b98a5e', 215) + shelf(10, 20, 120, 200) + win(170, 34, 80, 64, day(200)) + shelf(290, 20, 100, 200)
  + chair(210, 262) + singh(330, 284, .95, { face: 'smile', arms: 'hold', extra: rect(-14, -64, 28, 10, '#e6493f', 2) + rect(-14, -54, 28, 9, '#4a90d9', 2) }) + ava(130, 288, 1, { face: 'wow', arms: 'reach' }) + dad(50, 288, .9, { face: 'smile', arms: 'down' }) + note(370, 120, 1));

const bench = (x, y, s = 1) => G(x, y, s, rect(-60, -34, 120, 10, '#9c6a40') + rect(-60, -60, 120, 9, '#9c6a40') + rect(-60, -48, 120, 9, '#9c6a40') + rect(-52, -24, 8, 24, O, 0) + rect(44, -24, 8, 24, O, 0));
const P7 = svg(town() + fireStation(300, 228, .9) + tree(120, 228, 1, '#5fb05a') + bench(180, 270, 1.2) + ava(150, 262, .95, { face: 'cry', arms: 'down', legs: 'sit' }) + dad(222, 262, .85, { face: 'smile', arms: 'down', legs: 'sit', L: [[-42, -72], [-64, -64]] }) + heart(190, 120, 1) + sparkle(300, 70, .9));

const truck = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 120, 8) + rect(-110, -70, 160, 56, '#d9342b', 3, 6) + path('M50 -70 L86 -70 Q104 -66 108 -40 L110 -14 L50 -14Z', '#d9342b') + path('M58 -64 L84 -64 Q96 -60 98 -42 L58 -42Z', '#bfe8ff', 2.5)
  + rect(-104, -84, 140, 8, '#c8ccd4', 2.5) + Array.from({ length: 10 }, (_, i) => line(-100 + i * 14, -84, -100 + i * 14, -76, O, 2)).join('') + rect(60, -78, 22, 8, '#4a90d9', 2.5, 3) + rect(-110, -40, 160, 6, '#fff', 0) + rect(-100, -60, 30, 16, '#c8ccd4', 2) + circ(-60, -54, 6, '#c8ccd4', 2)
  + [[-80, -12], [-40, -12], [76, -12]].map(([a, b]) => circ(a, b, 15, '#3a3f55') + circ(a, b, 6, '#c8ccd4', 2)).join('') + rect(100, -30, 12, 8, '#ffd84d', 2));
const P8 = svg(day(340) + rect(0, 0, 400, 230, '#c4553f', 0) + Array.from({ length: 16 }, (_, i) => line(0, 14 + i * 14, 400, 14 + i * 14, '#a8432f', 1.5)).join('') + rect(40, 30, 320, 200, '#3b3442') + rect(40, 30, 320, 12, '#7a3a2f') + truck(190, 222, 1.15)
  + rect(0, 226, 400, 74, '#b9bfcc', 0) + line(0, 226, 400, 226, O, 3) + nora(300, 288, 1, { face: 'smile', arms: 'cry', L: [[-30, -56], [-32, -40]], R: [[28, -56], [4, -90]] }) + ava(170, 290, .95, { face: 'wow', arms: 'down' }) + dad(90, 290, .9, { face: 'smile', arms: 'down' }));

const helmet = (x, y, s = 1) => G(x, y, s, path('M-46 0 Q-46 -46 0 -48 Q46 -46 46 0Z', '#f2c94c') + ell(0, 0, 58, 9, '#e0b030', 3) + path('M-30 -30 Q-14 -42 6 -42', 'none', 4, 'stroke="#fff" opacity=".5"') + rect(-12, -40, 24, 22, '#d9342b', 2, 3));
const P9 = svg(rect(0, 0, 400, 300, '#3b3442', 0) + rect(0, 0, 400, 20, '#7a3a2f', 0) + G(-30, 0, 1, truck(160, 230, 1.1)) + rect(0, 226, 400, 74, '#9aa0ad', 0) + line(0, 226, 400, 226, O, 3) + path('M240 0 L400 0 L400 300 L180 300Z', '#fff4c0', 0, 'opacity=".22"')
  + bench(300, 252, 1.1) + helmet(300, 205, .95) + curled(300, 200, 1.05) + zzz(330, 150, 1)
  + nora(370, 296, .85, { face: 'grin', arms: 'down' }) + ava(200, 292, 1, { face: 'laugh', arms: 'reach' }) + dad(120, 292, .9, { face: 'laugh', arms: 'cheer' }) + sparkle(250, 140, .9) + heart(270, 120, .9));

const P10 = svg(day(70) + bakery(70, 226, .7) + library(210, 226, .7) + house(345, 226, .75, '#f4c27a', '#d9534f') + sidewalk(226)
  + adult(30, 252, .55, { hs: 'short', hair: '#3a2a1a', skin: SKIN.tan, shirt: '#3b5b9a', pants: '#2d3f66', arms: 'wave', face: 'laugh', extra: capC }) + mrsRoy(100, 252, .55, { arms: 'wave', face: 'laugh' }) + singh(260, 252, .55, { arms: 'wave', face: 'laugh' })
  + truck(210, 296, 1.05) + `<clipPath id="tw"><path d="M271 229 L298 229 Q310 233 312 251 L271 251Z"/></clipPath><g clip-path="url(#tw)">${ava(290, 296, .55, { face: 'laugh', arms: 'wave' })}${biscuit(276, 262, .35)}</g>` + path('M271 229 L298 229 Q310 233 312 251 L271 251Z', 'none', 2.5) + motion(90, 250, 3, 40, 1));

const P11 = svg(town() + fireStation(330, 228, .8, true) + house(100, 228, .85)
  + lopez(40, 288, .82, { face: 'laugh', arms: 'down' }) + mrsRoy(110, 288, .82, { face: 'laugh', arms: 'hold', extra: cookie(-4, -54, 7) }) + singh(180, 288, .82, { face: 'grin', arms: 'down' }) + nora(360, 288, .82, { face: 'laugh', arms: 'hold', extra: cookie(0, -52, 7) })
  + ava(265, 292, .95, { face: 'laugh', arms: 'hold', extra: cookiePlate(1) }) + biscuit(312, 296, .55, { collar: '#e6493f' }) + note(338, 230, .8) + heart(220, 150, .9) + sparkle(270, 120, .9));

const COVER = svg(day(340) + library(80, 226, .75) + bakery(330, 226, .7) + tree(200, 226, 1.1, '#5fb05a') + sidewalk(226) + biscuit(345, 270, .55) + mailbox(374, 268, 1.1)
  + ava(210, 290, 1.2, { face: 'wow', arms: 'point', extra: circ(64, -84, 13, '#bfe8ff', 4) + line(54, -76, 44, -64, '#7a4b2a', 6) }) + dad(110, 290, 1.05, { face: 'smile', arms: 'think' }) + sparkle(300, 160, 1) + note(330, 130, .9));

export const book = {
  id: 'en-where-is-biscuit',
  title: 'Where Is Biscuit?',
  emoji: '🐱',
  level: 2,
  minutes: 7,
  cover: COVER,
  pages: [
    { svg: P1, text: 'It is Saturday morning. Ava pours cat food into a little blue bowl. “Biscuit! Breakfast time!” she calls. Biscuit is her orange cat. Every morning, he runs to the kitchen for his food. But today, nobody comes. The bowl stays full. Ava looks at the window over the sink. It is open. “Dad,” she says, “where is Biscuit?”' },
    { svg: P2, text: 'Ava and Dad look everywhere in the house. Ava looks under the bed with a flashlight. Dad looks in the laundry basket and behind the sofa. No orange cat! Ava feels a knot in her tummy. Dad puts on his shoes. “Don’t worry,” he says. “Let’s go outside and ask our neighbours. Somebody saw him, I am sure.”' },
    { svg: P3, text: 'On the sidewalk, they meet Mr. Lopez, the mail carrier. He has a big bag full of letters. “Good morning! Did you see an orange cat?” asks Ava. Mr. Lopez thinks. “Yes! I saw an orange tail this morning. It went left, next to the park.” “Thank you!” says Ava. She takes Dad’s hand and they turn left.' },
    { svg: P4, text: 'The park is quiet. Ava looks under the slide and behind the big tree. She sees two squirrels and a lot of pigeons, but no Biscuit. Then she smells something warm and sweet. Across from the park, there is a bakery. “Muffins!” says Dad. “Biscuit loves the smell of muffins,” says Ava. “Let’s go and ask!”' },
    { svg: P5, text: 'Mrs. Roy, the baker, is taking muffins out of the oven. She wears a tall white hat. “An orange cat?” she says. “Yes! He sat by my window for a long time. He looked at my muffins with big, hungry eyes. Then he crossed the street and went into the library.” Ava laughs a little. “That is my Biscuit!”' },
    { svg: P6, text: 'In the library, Mr. Singh, the librarian, is holding a pile of books. “Yes, a cat came in,” he whispers. “He slept on the big reading chair, next to the window.” Ava runs to the chair. It is empty, but it is covered with orange hair! “He left a few minutes ago,” says Mr. Singh. “He turned right, toward the fire station.”' },
    { svg: P7, text: 'Ava and Dad walk and walk. Ava’s legs are tired. She sits on a bench, and a tear rolls down her cheek. “What if we never find him?” she asks. Dad gives her a big hug. “Biscuit is a smart cat,” he says. “And look, the fire station is right there, across the street. Let’s ask one more person.”' },
    { svg: P8, text: 'At the fire station, the big door is open. A shiny red fire truck is inside. Captain Nora, the firefighter, comes to say hello. She listens to Ava’s story. Then she puts a finger on her lips. “Shhh. Come with me,” she whispers. “I think I have a little visitor. He came in this morning and he did not want to leave.”' },
    { svg: P9, text: 'On a bench, next to the fire truck, there is a big yellow helmet. In the helmet, there is a round, orange ball of fur. It is Biscuit! He is sleeping in a spot of warm sun. “Biscuit!” cries Ava. The cat opens one eye, yawns and says, “Meow.” Ava hugs him tight. “You silly cat! You went on a big adventure!”' },
    { svg: P10, text: 'Captain Nora smiles. “He is a brave cat. Maybe he wants to be a firefighter!” Everybody laughs. Then the firefighters drive Ava, Dad and Biscuit home in the big red truck. They do not turn on the loud siren, because Biscuit is sleepy. From the window, Ava waves to Mr. Lopez, Mrs. Roy and Mr. Singh.' },
    { svg: P11, text: 'That afternoon, Ava puts a new red collar on Biscuit, with a little bell and a tag with their address. Now everybody can hear him and help him come home. Then Ava and Dad bake chocolate chip cookies. They bring them to the mail carrier, the baker, the librarian and the firefighters. “Thank you for helping us,” says Ava.' },
  ],
  words: [
    { word: 'neighbour', emoji: '🏘️', def: 'A person who lives near you.' },
    { word: 'mail carrier', emoji: '📬', def: 'A person who brings letters and packages to houses.' },
    { word: 'baker', emoji: '🧁', def: 'A person who makes bread, muffins and cakes.' },
    { word: 'librarian', emoji: '📚', def: 'A person who works in a library and helps you find books.' },
    { word: 'firefighter', emoji: '🚒', def: 'A person who puts out fires and helps people in danger.' },
    { word: 'across from', emoji: '↔️', def: 'On the other side of the street.' },
    { word: 'helmet', emoji: '⛑️', def: 'A hard hat that keeps your head safe.' },
    { word: 'collar', emoji: '🔔', def: 'A band that a cat or a dog wears around its neck.' },
  ],
  quiz: [
    { q: 'How does Ava know something is wrong at breakfast?', options: ['Biscuit is sick', 'Biscuit does not come and the bowl stays full', 'The bowl is empty', 'Dad is late'], answer: 1 },
    { q: 'Who sees an orange tail going left?', options: ['The baker', 'The librarian', 'The mail carrier', 'The firefighter'], answer: 2 },
    { q: 'Why does Ava think Biscuit went to the bakery?', options: ['He loves the smell of muffins', 'He is cold', 'He wants to see Mrs. Roy’s cat', 'He likes books'], answer: 0 },
    { q: 'What does Ava find on the reading chair?', options: ['A muffin', 'A helmet', 'Orange cat hair', 'A letter'], answer: 2 },
    { q: 'Where is Biscuit sleeping?', options: ['In a basket of bread', 'In a firefighter’s helmet', 'Under the slide', 'On the reading chair'], answer: 1 },
    { q: 'Why does Ava put a bell on Biscuit’s collar?', options: ['Because it is pretty', 'So people can hear him and help him come home', 'Because Biscuit likes music', 'Because the firefighters ask her'], answer: 1 },
  ],
};
