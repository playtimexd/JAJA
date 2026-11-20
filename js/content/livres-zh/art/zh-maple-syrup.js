// Pictures for zh-maple-syrup (糖屋里的枫糖): cover + 11 pages.
import { O, svg, rect, circ, ell, path, line, G, rnd, sky, SKY, cloud, hills, snowGround, snowfall, pine, bareTree, house, room, win, table, heart, spark, sweat, adult, yu, didi, mama, baba, shack, pail, taffyTray, taffy, plate, leaf } from './all.js';

const AMBER = '#d98d2c';
const spring = (n = 8, seed = 2) => sky('#a9d8f2', '#eef8ff') + cloud(90, 45, 1) + hills(190, '#cfe0d0', '#b7d0bc') + snowGround(205) + (n ? snowfall(n, seed, 120) : '');
const uncle = (x, y, s = 1, o = {}) => adult(x, y, s, { hair: 'dad', hairC: '#6a4a2a', top: '#c84a3a', bottom: '#4a5a8a', hat: 'cap', hatC: '#2f5d8a', ...o });
const treeP = (x, y, s = 1) => bareTree(x, y, s) + G(x + 8 * s, y - 28 * s, s, pail(0, 0, 1.1)) + path(`M${x + 8 * s} ${y - 62 * s} q-2 10 0 14`, 'none', 2, 'stroke="#d98d2c"');
const drops = (x, y) => path(`M${x} ${y} q-3 6 0 9 q3 -3 0 -9Z M${x + 1} ${y + 22} q-3 6 0 9 q3 -3 0 -9Z`, AMBER, 1.5);
const pot = (x, y, s = 1, steam = true) => G(x, y, s, shadow0() + path('M-60 -50 Q-60 0 -30 4 L30 4 Q60 0 60 -50Z', '#6c7287') + ell(0, -50, 60, 14, '#4a4f63') + ell(0, -50, 52, 10, '#e2a23c', 2) + rect(-62, -56, 124, 8, '#8d93a8', 2.5, 3) + (steam ? path('M-30 -72 q-10 -16 0 -28 q10 -12 0 -26 M0 -76 q-10 -16 0 -28 q10 -12 0 -26 M30 -72 q-10 -16 0 -28 q10 -12 0 -26', 'none', 6, 'stroke="#fff" opacity=".8"') : ''));
function shadow0() { return ell(0, 6, 70, 8, '#2a3a4a', 0, 'opacity=".2"'); }
const bottle = (x, y, s = 1) => G(x, y, s, path('M-12 0 L-14 -34 Q-14 -44 -6 -46 L-6 -56 L6 -56 L6 -46 Q14 -44 14 -34 L12 0Z', '#d9822b') + rect(-7, -64, 14, 10, '#c84a3a', 2.5, 2) + path('M-9 -30 L9 -30 L9 -12 L-9 -12Z', '#ffe9b0', 2) + path('M0 -26 l-4 4 l4 4 l4 -4Z', '#e8642f', 1.5));
const pancakes = (x, y, s = 1) => G(x, y, s, ell(0, 0, 36, 8, '#f6e2b8') + ell(0, -6, 30, 8, '#e8b45a') + ell(0, -12, 30, 8, '#f0c06a') + ell(0, -18, 28, 8, '#e8b45a') + path('M-16 -20 Q-10 -6 -14 6 M8 -20 Q14 -8 10 4', 'none', 5, 'stroke="#c8741f"') + ell(0, -24, 22, 6, '#c8741f', 2));
const inShack = () => rect(0, 0, 400, 300, '#b5653a', 0) + path(Array.from({ length: 12 }, (_, i) => `M0 ${i * 25} L400 ${i * 25}`).join(''), 'none', 2, 'opacity=".25"') + rect(0, 220, 400, 80, '#7a4a3a', 0) + line(0, 220, 400, 220, O, 3);

export const pics = [
  svg(spring(10, 3) + pine(40, 200, 1, true) + shack(250, 205, 1.1) + yu(95, 290, 1.5, { w: true, mood: 'laugh', arms: 'up' }) + taffyTray(210, 285, 0.6, 3) + heart(100, 90, 1)),
  // 1 dad invites
  svg(spring(6, 5) + house(300, 200, 1.0, { snow: true, lit: true }) + baba(130, 290, 1.0, { w: true, arms: 'point', mood: 'laugh' }) + yu(215, 290, 1.1, { w: true, arms: 'up', mood: 'laugh' }) + didi(260, 292, 1.1, { w: true, arms: 'up', mood: 'laugh' })),
  // 2 forest of buckets
  svg(spring(0) + treeP(60, 215, 1.1) + treeP(160, 230, 1.3) + treeP(280, 222, 1.2) + treeP(370, 240, 1.4) + yu(215, 292, 0.9, { w: true, legs: 'walk', mood: 'wow' }) + didi(250, 292, 0.9, { w: true, legs: 'walk', mood: 'wow' }) + baba(110, 296, 0.8, { w: true, legs: 'walk' })),
  // 3 dad explains: close-up tree
  svg(spring(0) + G(290, 285, 2.2, path('M-6 0 L-4 -60 L-24 -88 M-4 -60 L0 -88 M-4 -60 L18 -84', 'none', 7, 'stroke="#8a5a36"')) + G(250, 250, 2.0, pail(0, 0, 1.3)) + path('M252 140 q-2 14 0 24', 'none', 3, 'stroke="#d98d2c"') + drops(252, 175) + baba(105, 292, 1.05, { w: true, arms: 'point', mood: 'happy' }) + yu(180, 292, 1.0, { w: true, mood: 'wow' })),
  // 4 listening & tasting
  svg(spring(0) + treeP(300, 240, 1.6) + yu(150, 292, 1.35, { w: true, mood: 'happy', arms: 'reach' }) + didi(215, 292, 1.3, { w: true, mood: 'wow', arms: 'up' }) + drops(333, 205) + spark(110, 100, 1) + spark(370, 90, 1)),
  // 5 big pot in the shack
  svg(inShack() + pot(205, 225, 1.4) + uncle(85, 296, 0.95, { mood: 'laugh', arms: 'point' }) + G(320, 230, 1.5, pail(0, 0, 1.5)) + G(355, 238, 1.5, pail(0, 0, 1.5)) + yu(330, 296, 0.75, { mood: 'wow' })),
  // 6 forty buckets
  svg(inShack() + uncle(95, 296, 1.0, { mood: 'laugh', arms: 'up' }) + Array.from({ length: 12 }, (_, i) => G(180 + (i % 6) * 38, 200 + Math.floor(i / 6) * 38, 1.6, pail(0, 0, 1.2))).join('') + G(190, 296, 1.9, pail(0, 0, 2)).replace('translate(190 296)', 'translate(190 296)') + yu(350, 296, 1.0, { mood: 'wow', arms: 'up' })),
  // 7 golden syrup, lunch
  svg(room('#fbe7c6', '#c98d5a', 200) + win(40, 40, 100, 80, 'snow') + table(200, 210, 300) + pancakes(120, 212, 1.1) + pancakes(280, 212, 1.1) + bottle(200, 210, 1) + mama(70, 298, 0.8, { mood: 'happy' }) + baba(330, 298, 0.8, { mood: 'laugh' }) + yu(150, 298, 0.8, { mood: 'laugh', arms: 'up' }) + didi(250, 298, 0.8, { mood: 'laugh', arms: 'up' })),
  // 8 syrup on snow
  svg(spring(4, 4) + shack(330, 160, 0.6) + taffyTray(200, 262, 1.5, 3) + uncle(95, 296, 1.1, { w: true, mood: 'laugh', arms: [[30, -76], [48, -50]] }) + path('M118 205 q16 20 22 44', 'none', 5, 'stroke="#d98d2c"') + yu(320, 296, 0.9, { w: true, mood: 'wow', arms: 'reach' }) + didi(365, 296, 0.9, { w: true, mood: 'wow' })),
  // 9 taffy pop
  svg(spring(4, 6) + yu(180, 296, 1.7, { w: true, mood: 'laugh', arms: [[-27, -40], [40, -100]] }) + G(222, 192, 2.2, taffy(0, 0, 1, 12)) + heart(110, 80, 1.2) + spark(300, 80, 1.2)),
  // 10 sticky face
  svg(spring(0) + didi(150, 296, 1.7, { w: true, mood: 'laugh', arms: 'up' }) + ell(150, 175, 20, 8, AMBER, 0, 'opacity=".7"') + baba(260, 296, 1.0, { w: true, mood: 'laugh', arms: 'reach' }) + mama(340, 298, 0.9, { w: true, mood: 'happy', arms: 'hold' }) + bottle(318, 215, 0.9)),
  // 11 walking home with the bottle
  svg(sky('#f7b98a', '#ffe7c2') + circ(300, 100, 38, '#ffd27a') + snowGround(215) + pine(40, 205, 0.9, true) + pine(355, 200, 1, true) + yu(170, 292, 1.5, { w: true, mood: 'happy', legs: 'walk', arms: 'hold' }) + bottle(170, 190, 1.2) + didi(270, 292, 1.3, { w: true, mood: 'laugh', legs: 'walk' }) + heart(170, 80, 1.1)),
];
