// Pictures for zh-mooncakes (月饼和月亮): cover + 11 pages.
import { O, svg, rect, circ, ell, path, line, G, rnd, sky, SKY, cloud, moon, stars, star, ground, tufts, maple, house, room, win, table, lantern, heart, spark, thought, yu, didi, mama, baba, adult, mooncake, plate, bench } from './all.js';

const granny = (x, y, s = 1, o = {}) => adult(x, y, s, { hair: 'grandma', hairC: '#e3e6ee', top: '#4f8fd6', bottom: '#5a4a6a', glasses: true, ...o });
const kitchen = () => room('#fff1d0', '#c9a074', 190) + rect(0, 110, 400, 10, '#e6d2a8', 3) + win(290, 30, 80, 70, 'dusk'.replace('dusk', 'day')) + lantern(50, 40, 1.0);
const tbl = () => table(200, 205, 340);
const mold = (x, y, s = 1) => G(x, y, s, rect(-18, -30, 36, 30, '#b07a3d', 3, 4) + rect(-8, -52, 16, 26, '#c98d5a', 3, 4) + path('M-12 -14 l24 0 M-8 -20 l16 0', 'none', 2, 'opacity=".5"'));
const dough = (x, y, s = 1) => G(x, y, s, ell(0, 0, 30, 18, '#fff6e0') + ell(-6, -4, 14, 7, '#fff', 0, 'opacity=".5"'));
const redBox = (x, y, s = 1) => G(x, y, s, rect(-30, -22, 60, 22, '#e8433a', 3, 4) + rect(-30, -34, 60, 14, '#c9302a', 3, 4) + path('M-6 -34 L6 -34 L6 0 L-6 0Z', '#ffd23f', 2) + mooncake(0, -10, 10));
const night = () => sky(...SKY.night) + stars(18, 5, 110);
const yard = () => night() + ground(215, '#2f5d4a', 6) + rect(0, 215, 400, 85, '#2f5d4a', 0) + path('M330 215 L330 120 M330 150 L300 120', 'none', 0) + maple(60, 220, 1.1, '#b5473a') + maple(350, 225, 1.2, '#c8603a');
const bigMoon = () => moon(300, 70, 34);
const rabbitOnMoon = (x, y, s = 1) => G(x, y, s, circ(0, 0, 60, '#fff1a8') + path('M-20 24 Q-24 4 -8 0 Q-12 -22 -4 -30 Q0 -22 -2 -2 Q14 -4 20 8 Q24 22 8 26Z', '#fff', 2.5) + circ(10, 2, 2, O, 0));
const lady = (x, y, s = 1) => G(x, y, s, path('M-12 0 Q-18 -30 -6 -46 L6 -46 Q18 -30 12 0Z', '#ff9fb2') + circ(0, -56, 11, '#f6d2b0') + path('M-12 -58 Q-14 -72 0 -72 Q14 -72 12 -58 Q0 -66 -12 -58Z', '#2b2b36') + circ(-10, -66, 5, '#2b2b36') + path('M-14 -36 Q-26 -26 -20 -14', 'none', 3, 'stroke="#ffd23f"'));

export const pics = [
  svg(night() + moon(280, 80, 40) + ground(225, '#2f5d4a', 6) + rect(0, 225, 400, 75, '#2f5d4a', 0) + yu(110, 292, 1.5, { mood: 'laugh', arms: [[-30, -50], [30, -50]] }) + mooncake(110, 205, 20) + redBox(230, 280, 1.2) + heart(180, 110, 1)),
  // 1 smell of sweet from kitchen
  svg(room('#fff1d0', '#c9a074', 215) + rect(150, 40, 100, 175, '#9a5b3a', 3, 4) + circ(236, 130, 4, '#ffd23f', 0) + mama(75, 298, 1.0, { mood: 'happy', arms: 'hold' }) + yu(300, 298, 1.3, { mood: 'wow', arms: 'up' }) + path('M120 90 q-10 -14 0 -26 M140 90 q-10 -14 0 -26', 'none', 4, 'stroke="#f7c98a"') + win(30, 40, 90, 80, 'day') + maple(350, 140, 0.5, '#e8642f')),
  // 2 mama steams dough
  svg(kitchen() + tbl() + dough(200, 198, 1.5) + mama(105, 298, 1.05, { mood: 'laugh', arms: 'hold' }) + yu(300, 298, 1.1, { mood: 'wow', arms: 'up' }) + path('M180 150 q-8 -12 0 -22 M200 150 q-8 -12 0 -22 M220 150 q-8 -12 0 -22', 'none', 4, 'stroke="#fff" opacity=".8"')),
  // 3 filling, brother steals
  svg(kitchen() + tbl() + ell(180, 198, 26, 10, '#7a3f3a') + dough(250, 198, 1.0) + yu(110, 298, 1.2, { mood: 'happy', arms: 'hold' }) + didi(330, 298, 1.3, { mood: 'laugh', arms: [[-24, -60], [24, -60]] }) + mama(215, 270, 0.55, { mood: 'laugh' }) + spark(300, 130, 1.1)),
  // 4 mold press
  svg(kitchen() + tbl() + mold(180, 198, 1.8) + mooncake(270, 190, 18) + mooncake(310, 192, 18) + mooncake(230, 194, 14) + yu(90, 298, 1.3, { mood: 'laugh', arms: 'reach' }) + spark(180, 95, 1.2)),
  // 5 thinking of the neighbour
  svg(room('#fff1d0', '#c9a074', 215) + yu(130, 298, 1.45, { mood: 'think', arms: 'hold' }) + thought(260, 70, 120, 80) + granny(236, 104, 0.42, { mood: 'sad' }) + house(288, 104, 0.5, { lit: true }) + mama(335, 298, 0.9, { mood: 'happy', arms: 'point' })),
  // 6 knocking, grandma opens
  svg(sky('#ffd9a8', '#fff2dc') + ground(225, '#9fd86f', 6) + rect(0, 225, 400, 75, '#8fc765', 0) + house(280, 230, 1.7, { lit: true, roof: '#6a7bb5' }) + granny(280, 300, 0.95, { mood: 'laugh', arms: 'up' }) + yu(110, 298, 1.1, { mood: 'happy', arms: 'hold', item: redBox(0, -40, 0.8) }) + didi(185, 298, 1.0, { mood: 'laugh', arms: 'up' }) + heart(280, 60, 1.2)),
  // 7 moon rises over the yard
  svg(yard() + bigMoon() + bench(200, 285, 1.8) + yu(160, 255, 0.85, { mood: 'wow', legs: 'sit' }) + mama(250, 262, 0.7, { mood: 'happy', legs: 'sit' })),
  // 8 story of Chang'e
  svg(yard() + G(200, 80, 0.9, rabbitOnMoon(0, 0, 1) + lady(-20, 40, 0.8)) + baba(90, 296, 0.9, { mood: 'laugh', arms: 'point' }) + didi(310, 296, 1.1, { mood: 'wow', arms: 'up' }) + granny(250, 298, 0.8, { mood: 'happy' })),
  // 9 grandma tastes
  svg(night() + moon(80, 70, 28) + ground(225, '#2f5d4a', 6) + rect(0, 225, 400, 75, '#2f5d4a', 0) + granny(200, 298, 1.3, { mood: 'laugh', arms: 'hold', item: mooncake(0, -126, 14) }) + yu(80, 298, 1.1, { mood: 'happy', arms: 'up' }) + didi(330, 298, 1.0, { mood: 'laugh', arms: 'up' }) + heart(210, 40, 1.2) + spark(250, 100, 1.2)),
  // 10 same moon
  svg(night() + moon(280, 80, 44) + ground(225, '#2f5d4a', 6) + rect(0, 225, 400, 75, '#2f5d4a', 0) + yu(140, 298, 1.5, { mood: 'wow', arms: 'point' }) + baba(70, 298, 0.9, { mood: 'happy', arms: 'hold' }) + heart(200, 110, 1.1)),
  // 11 hug goodnight
  svg(night() + moon(80, 70, 30) + ground(225, '#2f5d4a', 6) + rect(0, 225, 400, 75, '#2f5d4a', 0) + granny(150, 298, 1.0, { mood: 'laugh', arms: [[-35, -90], [38, -90]] }) + yu(240, 298, 1.35, { mood: 'happy', arms: 'up' }) + heart(190, 90, 1.5) + redBox(330, 285, 0.9)),
];
