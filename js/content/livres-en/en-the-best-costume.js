// en-the-best-costume — English storybook, level 2 (docs/LIVRES.md). Catch Unit 2: My Clothes · Halloween.
import { O, SKIN, svg, sky, vg, ell, circ, rect, path, line, G, rnd, shadow, cloud, star, stars, moon, tree, bareTree, bush, floorRoom, win, table, rain, heart, sparkle, kid, adult } from './art/kit.js';

// ---- props ----
const jol = (x, y, s = 1) => G(x, y, s, circ(0, -14, 36, 'url(#gLamp)', 0) + shadow(0, 0, 22, 4) + ell(0, -14, 21, 15, '#f39c34') + path('M-8 -28 Q-13 -14 -8 0 M8 -28 Q13 -14 8 0', 'none', 2, 'stroke="#c96f1a"') + rect(-3, -35, 6, 8, '#3f8f4f', 2, 2) + path('M-12 -17 l4 -7 l4 7Z M4 -17 l4 -7 l4 7Z', '#ffd84d', 2) + path('M-11 -10 Q0 0 11 -10 L7 -6 L4 -9 L0 -5 L-4 -9 L-7 -6Z', '#ffd84d', 2));
const umbrella = (x, y, s = 1, c = '#4caf50', spikes = false, rot = 0, rib = '#2f7a3f') => G(x, y, s, line(0, -94, 0, 0, O, 4) + path('M0 0 q0 9 -7 9 q-7 0 -7 -7', 'none', 4)
  + (spikes ? [[-44, -76], [-22, -90], [0, -95], [22, -90], [44, -76]].map(([a, b]) => path(`M${a - 7} ${b + 4} L${a} ${b - 12} L${a + 7} ${b + 4}Z`, '#f2c94c', 2.2)).join('') : '')
  + path('M-62 -50 Q-60 -92 0 -94 Q60 -92 62 -50 Q47 -60 31 -50 Q16 -60 0 -50 Q-16 -60 -31 -50 Q-47 -60 -62 -50Z', c) + path('M0 -94 L-31 -50 M0 -94 L0 -50 M0 -94 L31 -50', 'none', 2, `stroke="${rib}"`) + path('M-40 -80 Q-30 -88 -14 -90', 'none', 3, 'stroke="#fff" opacity=".35"'), false, rot);
const box = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 34, 4) + rect(-30, -44, 60, 44, '#c9965a') + path('M-30 -44 L-40 -60 L-6 -60 L0 -44Z M30 -44 L40 -58 L8 -58 L0 -44Z', '#b07c48') + line(-30, -30, 30, -30, '#a0703f', 2) + rect(-10, -44, 20, 6, '#e8d4a8', 0));
const boots = (x, y, s = 1) => G(x, y, s, [0, 26].map((d) => path(`M${d - 8} -36 L${d + 6} -36 L${d + 6} -10 L${d + 16} -8 Q${d + 18} 0 ${d + 12} 0 L${d - 8} 0Z`, '#f2c94c') + line(d - 8, -6, d + 16, -6, O, 2)).join(''));
const plate = (x, y, r = 12, c = '#f2d16b') => circ(x, y, r, c, 2.4) + circ(x, y, r * .62, 'none', 1.6);
const bag = (x, y, s = 1, c = '#e6863a') => G(x, y, s, path('M-10 -26 Q0 -40 10 -26', 'none', 3) + rect(-12, -26, 24, 26, c, 2.5, 3) + circ(0, -14, 5, '#3a3f55', 0, 'opacity=".25"'));
const candy = (x, y, c = '#e6493f', r = 0) => G(x, y, 1, path('M-11 -4 L-6 0 L-11 4Z M11 -4 L6 0 L11 4Z', c, 1.6) + ell(0, 0, 7, 5, c, 1.8) + line(-3, -3, 3, 3, '#fff', 1.5), false, r);
const choc = (x, y, r = 0) => G(x, y, 1, rect(-14, -6, 28, 12, '#7a4b2a', 2, 2) + rect(-14, -6, 12, 12, '#e6493f', 2, 2), false, r);
const dragonIcon = (x, y, s = 1) => G(x, y, s, path('M-6 -10 Q-26 -34 -38 -14 Q-28 -16 -26 -8Z', '#6cc05a', 2) + ell(0, 0, 18, 12, '#4caf50', 2.4) + circ(18, -12, 9, '#4caf50', 2.4) + path('M13 -20 l2 -9 l4 7Z M21 -20 l4 -8 l2 8Z', '#f2d16b', 1.8) + circ(21, -14, 1.8, O, 0) + path('M27 -10 q8 -2 12 2 q-4 4 -12 2', '#ff9f1c', 1.8) + path('M-18 2 q-12 6 -18 -2', 'none', 2.4) + rect(-10, 8, 6, 8, '#4caf50', 2, 2) + rect(6, 8, 6, 8, '#4caf50', 2, 2));
const thought = (x, y, w, h, inner) => circ(x - w / 2 + 4, y + h / 2 + 14, 4, '#fff', 2) + circ(x - w / 2 + 12, y + h / 2 + 4, 6, '#fff', 2) + ell(x, y, w / 2, h / 2, '#fff', 2.5) + inner;
const nightHouse = (x, y, s = 1, wall = '#6f5a8c', roof = '#3d3456') => G(x, y, s, rect(-55, -72, 110, 72, wall) + path('M-64 -68 L0 -116 L64 -68Z', roof) + [[-34, -52], [34, -52]].map(([a, b]) => circ(a, b + 10, 22, 'url(#gLamp)', 0) + rect(a - 12, b, 24, 22, '#ffd56b') + line(a, b, a, b + 22, O, 2) + line(a - 12, b + 11, a + 12, b + 11, O, 2)).join('') + rect(-11, -40, 22, 40, '#4a2f2a', 3, 3) + circ(6, -20, 2, '#ffd84d', 0));
const sidewalk = (y = 222) => rect(0, y, 400, 300 - y, '#5b6378', 0) + rect(0, y, 400, 24, '#8a92a6', 0) + line(0, y, 400, y, O, 3) + line(0, y + 24, 400, y + 24, O, 2) + [60, 150, 240, 330].map((a) => line(a, y, a - 6, y + 24, O, 1.5)).join('');
const puddle = (x, y, w = 40) => ell(x, y, w, 7, '#8fb8e0', 2, 'opacity=".85"') + ell(x - w * .3, y - 2, w * .3, 2, '#fff', 0, 'opacity=".6"');
const halloweenNight = () => sky('#2a1f4e', '#6b4f8a') + stars(18, 5, 110) + moon(340, 50, 20);
const rainyNight = () => sky('#2b2d4f', '#5a5f86') + cloud(80, 40, 1.4, '#7a7fa3') + cloud(260, 30, 1.6, '#7a7fa3') + cloud(380, 60, 1.1, '#7a7fa3');
const sofa = (x, y, s = 1, c = '#d9534f') => G(x, y, s, shadow(0, 0, 120, 8) + rect(-110, -96, 220, 60, c, 3, 18) + rect(-122, -60, 34, 56, c, 3, 12) + rect(88, -60, 34, 56, c, 3, 12) + rect(-90, -46, 180, 34, c, 3, 8) + line(0, -46, 0, -12, O, 2) + rect(-84, -10, 10, 10, '#7a4b2a', 2) + rect(74, -10, 10, 10, '#7a4b2a', 2) + rect(-100, -90, 200, 10, '#fff', 0, 5, 'opacity=".18"'));
const lampStand = (x, y) => line(x, y, x, y - 110, O, 4) + path(`M${x - 24} ${y - 110} L${x - 14} ${y - 140} L${x + 14} ${y - 140} L${x + 24} ${y - 110}Z`, '#f2c94c') + circ(x, y - 120, 40, 'url(#gLamp)', 0) + ell(x, y, 16, 4, '#7a4b2a', 2);
const frame = (x, y, w, h, inner, c = '#f39c34') => rect(x - 4, y - 4, w + 8, h + 8, c, 3, 3) + rect(x, y, w, h, '#fff7e6', 2) + inner;

// ---- characters (same look on every page) ----
const HAIR = '#8a4b2a';
const wing = (soggy) => soggy
  ? path('M-12 -70 Q-40 -78 -46 -42 Q-50 -18 -42 -6 Q-38 -18 -34 -14 Q-32 -26 -26 -24 Q-22 -42 -12 -52Z', '#93a974') + path('M-14 -64 Q-36 -60 -40 -14', 'none', 2, 'stroke="#5f7a4a"') + path('M-42 -2 q-3 6 0 8 q3 -2 0 -8Z M-30 -8 q-3 6 0 8 q3 -2 0 -8Z', '#6cc05a', 1.6)
  : path('M-12 -70 Q-46 -120 -86 -98 Q-72 -90 -74 -78 Q-60 -82 -58 -68 Q-46 -74 -40 -60 Q-28 -66 -12 -54Z', '#6cc05a') + path('M-14 -66 L-80 -98 M-16 -62 L-58 -70 M-30 -84 L-46 -64', 'none', 2, 'stroke="#3f8f4f"') + path('M-30 -94 Q-50 -106 -70 -100', 'none', 3, 'stroke="#fff" opacity=".35"');
const wings = (x, y, s, soggy = false) => G(x, y, s, wing(soggy)) + G(x, y, s, wing(soggy), true);
const scales = [[-9, -66], [5, -67], [-12, -52], [2, -53], [14, -56], [-5, -40], [9, -41]].map(([a, b]) => circ(a, b, 6.5, '#f2d16b', 2) + circ(a, b, 3.6, 'none', 1.3)).join('');
const horns = path('M-18 -122 L-16 -146 L-6 -127Z M18 -122 L16 -146 L6 -127Z', '#f2d16b', 2.4);
const flame = path('M8 -54 Q0 -40 10 -28 Q12 -36 16 -34 Q14 -42 21 -46 Q22 -54 17 -54Z', '#ff9f1c', 2.2) + path('M11 -50 Q8 -42 12 -36 Q15 -42 17 -48Z', '#ffd84d', 0);
// Max: brown hair, blue shirt. cos: none | sweater | dragon | soggy | umbrella
function max(x, y, s, o = {}) {
  const cos = o.cos || 'none';
  const b = { hs: 'short', hair: HAIR, skin: SKIN.light, shirt: '#4a90d9', pants: '#3f5a8a', shoes: '#e6493f' };
  let extra = '', behind = '';
  if (cos !== 'none') b.shirt = '#4caf50';
  if (cos === 'dragon' || cos === 'soggy' || cos === 'umbrella') { b.shoes = '#f2c94c'; b.scarf = '#e6493f'; extra = scales + horns + (cos === 'soggy' ? path('M-16 -60 q-2 6 0 8 q2 -2 0 -8Z M14 -48 q-2 6 0 8 q2 -2 0 -8Z', '#9fdcff', 1.4) : flame); }
  if (cos === 'dragon') behind = wings(x, y, s);
  if (cos === 'soggy') behind = wings(x, y, s, true);
  if (cos === 'umbrella') { b.R = [[34, -88], [30, -110]]; extra += umbrella(30, -110, 1, '#4caf50', true, -8); }
  return behind + kid(x, y, s, { ...b, ...o, extra: extra + (o.extra || '') });
}
// Rosie: little sister, pigtails. cos: none | pumpkin
function rosie(x, y, s, o = {}) {
  const b = { hs: 'pigtails', hair: HAIR, skin: SKIN.light, shirt: '#f78fb3', bottom: 'skirt', pants: '#9b59b6', shoes: '#9b59b6' };
  let extra = '';
  if (o.cos === 'pumpkin') { Object.assign(b, { dress: true, shirt: '#f39c34', hat: '#3f8f4f', hatBand: '#2f7a3f', pom: '#5aa04a', shoes: '#3f8f4f' }); extra = path('M-11 -73 Q-22 -50 -16 -25 M11 -73 Q22 -50 16 -25 M0 -77 L0 -21', 'none', 2, 'stroke="#c96f1a"'); }
  return kid(x, y, s * .8, { ...b, ...o, extra: extra + (o.extra || '') });
}
const mom = (x, y, s, o = {}) => adult(x, y, s, { hs: 'bob', hair: HAIR, skin: SKIN.light, shirt: '#9b59b6', pants: '#3f3f5a', shoes: '#5a3e2b', ...o });
const dad = (x, y, s, o = {}) => adult(x, y, s, { hs: 'short', hair: '#5a3a22', beard: '#5a3a22', skin: SKIN.light, shirt: '#2e7d5b', pants: '#3f5a8a', ...o });
const grandpa = (x, y, s, o = {}) => adult(x, y, s, { hs: 'bald', hair: '#d5d9e0', beard: '#e6e9ef', glasses: true, skin: SKIN.light, shirt: '#b5651d', pants: '#6b6f80', ...o });
const mrsLee = (x, y, s, o = {}) => adult(x, y, s, { hs: 'bun', hair: '#2a1d14', skin: SKIN.tan, shirt: '#2a9d8f', pants: '#3f3f5a', dress: true, ...o });

// ---- scenes ----
const calendar = (x, y) => rect(x, y, 96, 86, '#fff') + rect(x, y, 96, 16, '#e6493f') + circ(x + 24, y, 3, '#ccc', 2) + circ(x + 72, y, 3, '#ccc', 2)
  + Array.from({ length: 3 }, (_, i) => line(x, y + 16 + (i + 1) * 17.5, x + 96, y + 16 + (i + 1) * 17.5, '#c8d3e0', 1.5)).join('') + Array.from({ length: 4 }, (_, i) => line(x + (i + 1) * 19.2, y + 16, x + (i + 1) * 19.2, y + 86, '#c8d3e0', 1.5)).join('')
  + [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [1, 1], [2, 1]].map(([c, r]) => path(`M${x + c * 19.2 + 5} ${y + 16 + r * 17.5 + 5} l9 8 M${x + c * 19.2 + 14} ${y + 16 + r * 17.5 + 5} l-9 8`, 'none', 1.8, 'stroke="#e6493f"')).join('')
  + G(x + 3 * 19.2 + 9.6, y + 16 + 2 * 17.5 + 13, .38, ell(0, -14, 21, 15, '#f39c34', 4) + rect(-3, -35, 6, 8, '#3f8f4f', 3)) + ell(x + 3 * 19.2 + 9.6, y + 16 + 2 * 17.5 + 8.5, 13, 11, 'none', 2.5, 'stroke="#e6493f"');
const kitchen = () => floorRoom('#fde8c8', '#c98f5c', 215) + win(36, 36, 96, 72, sky('#9fd3f4', '#f1f9ff') + tree(60, 120, .8, '#e8892f', '#f7c35d') + tree(115, 125, .7, '#d9534f', '#f39c74')) + rect(20, 140, 120, 75, '#e8c48f') + rect(20, 134, 126, 10, '#c98f5c') + line(80, 144, 80, 215, O, 2) + circ(72, 178, 2.5, O, 0) + circ(88, 178, 2.5, O, 0);

const P1 = svg(kitchen() + calendar(268, 32) + thought(205, 60, 96, 66, dragonIcon(200, 64, 1.1))
  + mom(345, 280, .95, { face: 'laugh', arms: 'hips' }) + rosie(108, 282, 1, { face: 'laugh', arms: 'hold' }) + max(205, 282, 1.05, { face: 'grin', R: [[34, -92], [50, -112]] })
  + jol(370, 296, .7));

const store = () => floorRoom('#e3eef6', '#b8c3cc', 215) + rect(24, 22, 352, 128, '#d9c3a0') + Array.from({ length: 40 }, (_, i) => circ(40 + (i % 10) * 36, 34 + Math.floor(i / 10) * 30, 2, '#a8916a', 0)).join('')
  + [70, 130, 190, 250, 310].map((a) => path(`M${a} 50 l0 14 q0 6 6 6`, 'none', 3) + path(`M${a - 18} 72 L${a} 62 L${a + 18} 72`, 'none', 2.4, 'stroke="#8a92a6"')).join('')
  + rect(262, 158, 126, 60, '#4a78b8') + rect(256, 152, 138, 10, '#c98f5c');
const P2 = svg(store() + adult(318, 214, .9, { hs: 'curly', hair: '#2a1d14', skin: SKIN.brown, shirt: '#e6493f', face: 'worried', arms: 'reach' }) + rect(262, 158, 126, 60, '#4a78b8') + rect(256, 152, 138, 10, '#c98f5c') + rect(300, 176, 50, 26, '#fff', 2, 4)
  + mom(62, 284, .95, { face: 'worried', arms: 'down' }) + max(140, 284, 1, { face: 'cry', arms: 'down' })
  + rosie(214, 286, 1, { face: 'happy', arms: 'hold', extra: G(0, -48, 1.15, ell(0, 0, 20, 15, '#f39c34') + path('M-8 -13 Q-12 0 -8 13 M8 -13 Q12 0 8 13', 'none', 2, 'stroke="#c96f1a"') + rect(-3, -20, 6, 8, '#3f8f4f', 2, 2)) }));

const livingRoom = (warm = '#efe2f5') => floorRoom(warm, '#b98a5e', 215) + frame(56, 40, 70, 54, tree(91, 90, .5, '#e8892f', '#f7c35d'));
const P3 = svg(livingRoom() + rect(300, 68, 84, 147, 'url(#gWood)') + rect(308, 76, 68, 60, 'none', 2) + rect(308, 144, 68, 62, 'none', 2) + circ(312, 145, 4, '#ffd84d', 2)
  + sofa(160, 268, 1) + max(118, 254, 1, { face: 'mad', arms: 'hug' }) + mom(206, 258, .9, { face: 'smile', arms: 'point', legs: 'sit' }) + rect(62, 236, 196, 30, '#d9534f', 3, 8) + rect(38, 208, 34, 56, '#d9534f', 3, 12) + rect(248, 208, 34, 56, '#d9534f', 3, 12)
  + lampStand(368, 290) + sparkle(352, 60, 1));

const closet = () => rect(0, 0, 400, 215, '#dce8d5', 0) + rect(0, 215, 400, 85, '#c98f5c', 0) + line(0, 215, 400, 215, O, 3)
  + rect(150, 14, 236, 206, 'url(#gWood)') + rect(164, 26, 208, 190, '#5e4334') + line(164, 54, 372, 54, '#c8ccd4', 5)
  + path('M190 54 l0 -6 M190 54 L172 66 L208 66Z', 'none', 2.4, 'stroke="#c8ccd4"') + path('M178 66 L202 66 L206 150 L174 150Z', '#7a8fb8')
  + path('M232 50 q8 -4 16 0 L246 190 L236 190Z', '#e6493f') + path('M248 50 q4 0 6 4 L262 160 L252 160Z', '#c0392b')
  + path('M330 54 L312 66 L348 66Z', 'none', 2.4, 'stroke="#c8ccd4"') + path('M312 66 L348 66 L352 140 L308 140Z', '#2a9d8f');
const P4 = svg(closet() + box(214, 214, 1) + boots(318, 214, 1) + rect(150, 214, 236, 6, '#7a4b2a', 2)
  + max(92, 285, 1.1, { cos: 'sweater', mitts: '#4caf50', face: 'wow', arms: 'up' }) + sparkle(30, 70, 1.1) + sparkle(150, 240, .8) + sparkle(36, 150, .7));

const craft = () => kitchen() + rect(268, 28, 100, 90, '#fff7e6', 0) + calendar(268, 32);
const P5 = svg(craft() + dad(70, 270, .95, { face: 'happy', arms: 'hold', extra: path('M-6 -52 l-10 -12 M-2 -52 l-14 -6', 'none', 3, 'stroke="#c0392b"') }) + max(176, 262, .95, { face: 'happy', arms: 'hold', extra: line(4, -50, 12, -34, '#7a4b2a', 3) })
  + rosie(258, 254, 1, { face: 'grin', arms: 'hold' }) + mom(342, 268, .95, { face: 'smile', arms: 'hold' })
  + table(200, 206, 340) + G(110, 204, 1, path('M-50 -4 Q-30 -26 6 -18 Q-6 -12 -2 -4Z', '#6cc05a') + path('M8 -4 Q22 -26 50 -16 Q40 -10 42 -4Z', '#c9965a'))
  + circ(170, 200, 9, '#4caf50', 2.5) + line(170, 192, 178, 178, '#7a4b2a', 3) + [0, 1, 2].map((i) => ell(232 + i * 4, 202 - i * 3, 16, 5, '#f2d16b', 2)).join('') + plate(275, 198, 10) + line(282, 186, 290, 178, '#f2c94c', 4) + line(290, 196, 300, 186, '#e6493f', 4)
  + G(340, 204, 1, path('M-26 -4 Q-24 -16 0 -18 Q24 -16 26 -4Z', '#4caf50') + circ(-8, -10, 4, '#f2d16b', 1.6) + circ(6, -10, 4, '#f2d16b', 1.6)) + rect(372, 184, 12, 18, '#fff', 2, 3) + rect(374, 178, 8, 7, '#e6493f', 2));

const mirror = () => ell(70, 112, 50, 74, '#c98f5c', 4) + `<clipPath id="mir"><ellipse cx="70" cy="112" rx="42" ry="66"/></clipPath>` + ell(70, 112, 42, 66, '#cfe6f2', 2) + `<g clip-path="url(#mir)">${max(72, 200, .62, { cos: 'dragon', face: 'laugh', arms: 'cheer' })}${path('M40 60 l30 -30 M50 90 l40 -40', 'none', 4, 'stroke="#fff" opacity=".6"')}</g>`;
const P6 = svg(floorRoom('#f5e6d3', '#b98a5e', 215) + mirror() + max(190, 282, 1.05, { cos: 'dragon', face: 'laugh', arms: 'cheer' })
  + rosie(318, 278, 1, { face: 'laugh', arms: 'cry' }) + dad(352, 284, .95, { face: 'grin', arms: 'hips' }) + path('M152 118 q-8 -10 -2 -18 M138 128 q-12 -8 -10 -20 M232 118 q8 -10 2 -18 M246 128 q12 -8 10 -20', 'none', 3, 'stroke="#e6493f"'));

const P7 = svg(rainyNight() + rect(0, 210, 400, 90, '#5b6378', 0) + rect(0, 0, 220, 230, '#8a6a9a') + Array.from({ length: 8 }, (_, i) => line(0, 20 + i * 28, 220, 20 + i * 28, '#6f5384', 2)).join('') + rect(40, 70, 130, 160, '#ffe3a0') + circ(105, 160, 80, 'url(#gLamp)', 0) + rect(40, 70, 130, 160, 'none', 4)
  + rect(170, 70, 16, 160, '#4a2f2a') + rect(0, 228, 240, 16, '#7a6a80') + rect(0, 244, 260, 18, '#6a5a70') + line(0, 228, 240, 228, O, 3)
  + dad(78, 228, .82, { face: 'smile', arms: 'down' }) + max(118, 230, .82, { cos: 'dragon', face: 'worried', arms: 'down', extra: bag(-30, -40, .9) }) + rosie(152, 230, .82, { cos: 'pumpkin', face: 'wow', arms: 'down' })
  + jol(212, 228, .8) + jol(236, 244, .7) + jol(30, 244, .7) + puddle(300, 278, 50) + puddle(170, 288, 30) + rain(60, 3));

const street = () => rainyNight() + nightHouse(80, 222, .9) + nightHouse(250, 222, .8, '#4f6f8c', '#2d3d56') + tree(380, 222, .9, '#d9534f', '#f39c74') + sidewalk(222) + jol(150, 226, .6) + jol(300, 226, .6);
const P8 = svg(street() + max(200, 286, 1.05, { cos: 'soggy', face: 'cry', arms: 'down', extra: bag(-30, -40, .9) + path('M-12 -2 q0 6 3 7 M10 -2 q0 6 3 7', 'none', 3, 'stroke="#4caf50"') }) + puddle(200, 290, 60) + puddle(340, 270, 30) + rain(70, 9));

const porch = () => rainyNight() + rain(40, 21) + rect(0, 0, 400, 30, '#7a5a3a') + rect(0, 28, 400, 8, '#5e4334') + rect(0, 0, 300, 236, '#b79a72') + Array.from({ length: 8 }, (_, i) => line(0, 36 + i * 26, 300, 36 + i * 26, '#9c7f5a', 2)).join('') + rect(30, 60, 70, 100, '#4a2f2a', 3, 3) + rect(130, 62, 80, 60, '#ffd56b') + line(170, 62, 170, 122) + line(130, 92, 210, 92)
  + rect(380, 30, 14, 210, '#e8dccb') + circ(118, 50, 46, 'url(#gLamp)', 0) + rect(108, 36, 20, 22, '#ffd56b', 2.5, 4) + rect(0, 232, 400, 68, '#8a6a4a') + line(0, 232, 400, 232, O, 3) + Array.from({ length: 4 }, (_, i) => line(0, 248 + i * 14, 400, 248 + i * 14, '#6f5338', 2)).join('');
const halfUmb = G(250, 242, 1, path('M-62 -14 Q-60 -56 0 -58 Q60 -56 62 -14 Q47 -24 31 -14 Q16 -24 0 -14 Q-16 -24 -31 -14 Q-47 -24 -62 -14Z', '#2b2b35') + `<clipPath id="pu"><rect x="-70" y="-70" width="70" height="70"/></clipPath><g clip-path="url(#pu)">${path('M-62 -14 Q-60 -56 0 -58 Q60 -56 62 -14 Q47 -24 31 -14 Q16 -24 0 -14 Q-16 -24 -31 -14 Q-47 -24 -62 -14Z', '#4caf50')}</g>` + path('M-44 -46 l-6 -14 l12 4Z M-20 -56 l-2 -14 l10 8Z', '#f2c94c', 2) + line(0, -58, 0, -14, '#666', 2));
const P9 = svg(porch() + grandpa(340, 268, .95, { face: 'grin', arms: 'point', flip: true }) + halfUmb + rect(176, 250, 26, 24, '#c8ccd4', 2.5, 3) + ell(189, 250, 13, 4, '#4caf50', 2) + line(287, 171, 270, 190, '#7a4b2a', 5) + ell(268, 193, 5, 7, '#4caf50', 2)
  + max(46, 290, .8, { cos: 'soggy', face: 'wow', arms: 'down' }) + rosie(112, 292, .9, { cos: 'pumpkin', face: 'happy', arms: 'wave', R: [[24, -84], [22, -104]], extra: umbrella(22, -104, .55, '#f39c34', false, 0, '#c96f1a') })
  + sparkle(300, 90, 1) + sparkle(270, 140, .7));

const P10 = svg(halloweenNight() + rain(25, 41) + nightHouse(300, 236, 1.25, '#7d5a8c', '#3d3456') + rect(286, 186, 28, 50, '#ffe3a0') + rect(0, 236, 400, 64, '#5b6378', 0) + rect(0, 236, 400, 22, '#8a92a6', 0) + line(0, 236, 400, 236, O, 3)
  + mrsLee(330, 244, .8, { face: 'laugh', arms: 'hold', extra: G(0, -48, 1, path('M-16 -6 Q0 14 16 -6Z', '#e6493f', 2.4) + circ(-6, -8, 4, '#7a4b2a', 1.6) + circ(4, -9, 4, '#f2c94c', 1.6)) })
  + jol(240, 240, .8) + jol(390, 250, .7) + bush(30, 246, .9, '#3f6f4f') + tree(40, 238, .9, '#d9534f', '#f39c74')
  + max(130, 286, 1, { cos: 'umbrella', face: 'laugh', arms: 'hold', L: [[-26, -56], [-18, -50]], extra: bag(-18, -26, 1) }) + rosie(205, 288, 1, { cos: 'pumpkin', face: 'grin', arms: 'reach', extra: bag(30, -52, .9, '#9b59b6') })
  + candy(268, 120, '#e6493f', 20) + candy(290, 100, '#4a90d9', -20) + choc(250, 90, 10));

const P11 = svg(livingRoom('#f5e6d3') + win(310, 36, 70, 60, rainyNight() + rain(20, 4)) + sofa(200, 236, .9, '#2a9d8f') + mom(140, 222, .78, { face: 'smile', arms: 'down', legs: 'sit' }) + dad(205, 222, .78, { face: 'grin', arms: 'hug', legs: 'sit' }) + grandpa(268, 222, .78, { face: 'laugh', arms: 'down', legs: 'sit' })
  + rect(110, 196, 180, 26, '#2a9d8f', 3, 8)
  + umbrella(46, 214, .55, '#4caf50', true, -20)
  + max(140, 290, 1, { cos: 'sweater', face: 'happy', arms: 'reach', legs: 'sit', extra: choc(50, -78, -10) }) + rosie(262, 290, 1.05, { cos: 'pumpkin', face: 'laugh', arms: 'reach', legs: 'sit' })
  + [[190, 286, '#e6493f'], [212, 292, '#4a90d9'], [200, 276, '#f2c94c'], [330, 290, '#9b59b6'], [100, 292, '#3fb55f']].map(([a, b, c], i) => candy(a, b, c, i * 30)).join('') + choc(80, 280, 20));

const COVER = svg(halloweenNight() + bareTree(60, 236, 1, '#3d2f4a') + nightHouse(330, 230, 1, '#7d5a8c', '#3d3456') + rect(0, 228, 400, 72, '#4a3a5a', 0) + line(0, 228, 400, 228, O, 3)
  + max(190, 288, 1.15, { cos: 'dragon', face: 'laugh', arms: 'cheer' }) + rosie(290, 288, 1.1, { cos: 'pumpkin', face: 'grin', arms: 'wave' })
  + jol(80, 280, 1) + jol(120, 292, .8) + jol(370, 292, .9) + sparkle(110, 60, 1) + sparkle(250, 40, .8) + path('M150 80 q10 -10 20 0 q10 -10 20 0', 'none', 3, 'stroke="#1b1630"'));

export const book = {
  id: 'en-the-best-costume',
  title: 'The Best Costume',
  emoji: '🎃',
  level: 2,
  minutes: 7,
  cover: COVER,
  pages: [
    { svg: P1, text: 'Halloween is in three days! Max looks at the calendar on the kitchen wall and smiles. “This year, I want to be a dragon,” he says. “A big green dragon with wings!” His little sister Rosie claps her hands. “I want to be a pumpkin!” Mom laughs. “Okay, my little monsters. Let’s go to the costume store after school.”' },
    { svg: P2, text: 'At the store, Max runs to the costume wall. Oh no! The hooks are empty. There are no dragons, no pirates and no superheroes. There is only one pumpkin costume, just the right size for Rosie. “Sorry,” says the clerk. “Everything is sold out.” Max looks at the empty hooks. His eyes feel hot and wet. “Now I can’t be a dragon,” he says.' },
    { svg: P3, text: 'At home, Max sits on the sofa with his arms crossed. He does not want to talk. Mom sits next to him. “You know,” she says, “a long time ago, children made their own costumes. They used old clothes and a lot of good ideas.” Max looks up. “Old clothes?” Mom smiles and points to the closet. “Let’s go and look!”' },
    { svg: P4, text: 'Max opens the closet door. Wow! He finds Dad’s old green sweater. It is soft and very, very big. He finds Mom’s yellow rain boots, a long red scarf and an empty cardboard box. Max puts on the sweater. The sleeves are so long that his hands disappear. “Look!” he shouts. “I am green like a dragon!”' },
    { svg: P5, text: 'That evening, the whole family helps. Dad cuts two big wings out of the cardboard box. Max paints them green. Rosie colours paper plates with a yellow crayon. “These are the scales,” she says. “Dragons have scales on their skin.” Mom glues the plates on the green sweater, one by one. The kitchen smells like paint and glue.' },
    { svg: P6, text: 'The next day, Max puts on the green sweater, the wings and Mom’s yellow rain boots. Dad ties the red scarf around his neck. The long end hangs down like fire. Max looks in the mirror and opens his mouth very wide. “ROAR!” Rosie hides her eyes and giggles. Dad laughs. “That is one scary dragon!” he says.' },
    { svg: P7, text: 'Finally, it is Halloween night. Jack-o’-lanterns smile on the front steps. Max and Rosie stand by the door with their candy bags. Max is a dragon and Rosie is a round orange pumpkin. But when Dad opens the door, they hear a sound. Plip, plop, plip, plop. It is raining! Max frowns. “Oh no,” he says. “Not rain!”' },
    { svg: P8, text: 'Max goes out anyway. He walks to the first house, but the rain falls and falls. Soon, his cardboard wings are wet and soft. They bend down like two old leaves. Green paint drips on his boots. Max stops on the sidewalk. “My wings are soggy,” he says in a small voice. “Now I am just a wet dragon.”' },
    { svg: P9, text: 'Then Grandpa calls from his porch next door. “Come here, little dragon! I have an idea.” Rosie shares her small orange umbrella, and they run to the porch. Grandpa opens a big black umbrella. With a brush, he paints it green, just like the wings. Then he adds yellow spikes on top. “There,” he says. “Rain-proof wings!”' },
    { svg: P10, text: 'Max holds the green umbrella over his head. It looks like two big dragon wings, and it keeps him dry! Max and Rosie walk from house to house. “Trick or treat!” they shout. Their neighbour, Mrs. Lee, laughs. “A dragon with an umbrella! That is the best costume I have ever seen.” She puts candy in both bags.' },
    { svg: P11, text: 'Back home, Max and Rosie sit on the living room floor with their candy. Rosie has only a little, because her legs are short and she walks slowly. Max gives her his favourite chocolate bar. “Thank you for sharing your umbrella,” he says. Then he looks at his family and smiles. “The best costume is the one we made together.”' },
  ],
  words: [
    { word: 'costume', emoji: '🎭', def: 'Special clothes you wear to look like someone or something else.' },
    { word: 'sold out', emoji: '🚫', def: 'When a store has no more of something to sell.' },
    { word: 'closet', emoji: '🚪', def: 'A small room or cupboard where you keep clothes.' },
    { word: 'sweater', emoji: '🧶', def: 'A warm piece of clothing with long sleeves.' },
    { word: 'scales', emoji: '🐉', def: 'Small hard pieces on the skin of a fish, a snake or a dragon.' },
    { word: 'soggy', emoji: '💧', def: 'Very wet and soft.' },
    { word: 'jack-o’-lantern', emoji: '🎃', def: 'A pumpkin with a face cut in it and a light inside.' },
    { word: 'share', emoji: '🤝', def: 'To give part of what you have to someone else.' },
  ],
  quiz: [
    { q: 'What does Max want to be for Halloween?', options: ['A pirate', 'A dragon', 'A pumpkin', 'A superhero'], answer: 1 },
    { q: 'Why can’t Max buy a dragon costume?', options: ['It is too big', 'It costs too much', 'The store is sold out', 'Mom says no'], answer: 2 },
    { q: 'What does Rosie make for the costume?', options: ['The wings', 'The scales', 'The fire', 'The boots'], answer: 1 },
    { q: 'What happens first?', options: ['It starts to rain', 'Grandpa paints the umbrella', 'The family makes the costume', 'Mrs. Lee gives candy'], answer: 2 },
    { q: 'How does Max feel when his wings get soggy?', options: ['Sad', 'Excited', 'Angry at Rosie', 'Sleepy'], answer: 0 },
    { q: 'Why does Max give Rosie his favourite chocolate bar?', options: ['He does not like chocolate', 'She shared her umbrella and has only a little candy', 'Mom tells him to', 'It is wet'], answer: 1 },
  ],
};
