// Pictures for zh-waipo-comes (外婆来了): cover + 11 pages.
import { O, svg, rect, circ, ell, path, line, G, rnd, sky, SKY, cloud, moon, star, stars, pine, snowGround, snowfall, house, room, win, table, heart, spark, tear, zzz, yu, didi, mama, baba, waipo, plane, suitcase, bowl, flake } from './all.js';

const tiger = (x, y, s = 1) => G(x, y, s, path('M-14 4 Q-16 -14 0 -16 Q16 -14 14 4Z', '#f2c14e') + circ(-6, -8, 2, O, 0) + circ(6, -8, 2, O, 0) + path('M-3 -4 L3 -4 L0 -1Z', '#e8433a', 1.5) + path('M-10 -15 l2 4 M10 -15 l-2 4 M0 -16 l0 4', 'none', 2) + path('M-20 6 L20 6', 'none', 3));
const airport = () => rect(0, 0, 400, 300, '#e8eef5', 0) + rect(20, 30, 360, 110, '#bfe3f7', 3, 6) + line(120, 30, 120, 140, O, 3) + line(260, 30, 260, 140, O, 3) + plane(300, 100, 0.8) + cloud(60, 70, 0.8) + rect(0, 200, 400, 100, '#cdd6e3', 0) + line(0, 200, 400, 200, O, 3);
const exitDoor = () => rect(150, 130, 100, 74, '#9fb4d2', 3, 4) + line(200, 130, 200, 204, O, 3) + rect(170, 112, 60, 16, '#4fb06a', 2.5, 3) + path('M184 120 l10 0 l-4 -4 M194 120 l-4 4', 'none', 2, 'stroke="#fff"');
const bedRoom = () => room('#fbe7c6', '#d9a877', 215) + win(250, 40, 100, 80, 'snow');
const kitchen = () => room('#fff1d0', '#c9a074', 200) + rect(0, 120, 400, 12, '#e6d2a8', 3) + rect(30, 60, 90, 60, '#ffe9b0', 3, 4);
const items = (x, y) => circ(x, y, 7, '#b5342a', 2.5) + circ(x + 16, y + 4, 7, '#b5342a', 2.5) + rect(x + 28, y - 4, 22, 14, '#ffd27a', 2.5, 4) + path(`M${x + 54} ${y - 6} l12 0 l4 20 l-20 0Z`, '#4f8fd6');

export const pics = [
  svg(room('#fbe7c6', '#d9a877', 215) + win(250, 40, 110, 90, 'snow') + suitcase(80, 290, 1.1, '#e8433a', false) + waipo(200, 292, 0.95, { mood: 'laugh', arms: 'wave' }) + yu(300, 292, 1.2, { mood: 'laugh', arms: 'up' }) + heart(200, 60, 1.2)),
  // 1 tidy guest room
  svg(bedRoom() + rect(30, 150, 150, 70, '#fff', 3, 8) + rect(30, 135, 150, 30, '#a9d4f5', 3, 8) + ell(60, 150, 24, 10, '#fff') + yu(260, 292, 1.35, { mood: 'happy', arms: 'up' }) + mama(340, 296, 0.8, { mood: 'happy', arms: 'hold' }) + spark(220, 80, 1)),
  // 2 airport waiting
  svg(airport() + exitDoor() + yu(90, 296, 1.5, { mood: 'wow', arms: 'up' }) + mama(330, 298, 0.95, { w: true, mood: 'happy', arms: 'wave' }) + baba(40, 300, 0.2, {})),
  // 3 running to waipo
  svg(airport() + exitDoor() + waipo(210, 215, 0.62, { w: true, mood: 'laugh', arms: 'wave' }) + suitcase(262, 210, 0.7) + yu(100, 296, 1.5, { w: true, mood: 'laugh', legs: 'run', arms: 'up' }) + heart(210, 100, 1)),
  // 4 hug
  svg(airport() + waipo(170, 296, 1.2, { w: true, mood: 'laugh', arms: [[-35, -90], [38, -90]] }) + yu(255, 296, 1.4, { w: true, mood: 'happy', arms: 'up' }) + heart(210, 70, 1.4) + tear(268, 205)),
  // 5 suitcase open
  svg(bedRoom() + suitcase(215, 270, 2.3, '#e8433a', true) + items(180, 200) + waipo(80, 296, 0.95, { mood: 'laugh', arms: 'point' }) + yu(350, 296, 1.3, { mood: 'wow', arms: 'reach' }) + spark(320, 100, 1.2)),
  // 6 tiger shoes
  svg(bedRoom() + didi(180, 296, 1.7, { mood: 'laugh', arms: 'up', shoes: '#f2c14e' }) + tiger(150, 298, 0.9) + tiger(212, 298, 0.9) + waipo(310, 296, 0.95, { mood: 'laugh', arms: 'point' }) + mama(60, 298, 0.8, { mood: 'laugh' })),
  // 7 noodles
  svg(kitchen() + waipo(100, 296, 1.0, { mood: 'laugh', arms: 'hold' }) + table(250, 210, 200) + bowl(210, 212, 1.2, '#fff', ell(0, -14, 22, 5, '#f6dd9a', 0)) + bowl(290, 212, 1.2, '#fff', ell(0, -14, 22, 5, '#f6dd9a', 0)) + yu(250, 298, 0.9, { mood: 'laugh', arms: 'hold' }) + path('M200 160 q-8 -14 0 -26 M290 160 q-8 -14 0 -26', 'none', 5, 'stroke="#fff" opacity=".8"')),
  // 8 waipo sleepy on sofa
  svg(room('#fbe7c6', '#d9a877', 215) + win(40, 40, 100, 80, 'night') + rect(170, 120, 190, 100, '#6aa792', 3, 12) + rect(160, 130, 40, 90, '#6aa792', 3, 12) + waipo(268, 226, 0.8, { mood: 'sleep', legs: 'sit', arms: 'hold' }) + rect(180, 196, 170, 34, '#7bb8a3', 3, 10) + zzz(300, 120) + mama(90, 296, 0.95, { mood: 'happy', arms: 'point' }) + yu(40, 300, 0.2, {})),
  // 9 next morning snow, waipo at window
  svg(room('#fbe7c6', '#d9a877', 215) + win(110, 30, 180, 130, 'snow') + snowfall(10, 4, 120) + waipo(200, 296, 1.15, { mood: 'wow', arms: 'hold' }) + spark(70, 90, 1)),
  // 10 snow angels
  svg(sky(...SKY.snow) + house(330, 190, 0.8, { snow: true, lit: true }) + pine(40, 200, 0.9, true) + snowGround(205) + snowfall(16, 5, 300) + G(130, 262, 1.0, ell(0, 0, 30, 22, 'none', 0) + path('M-40 12 Q0 -6 40 12 L26 32 Q0 22 -26 32Z', '#dcecf8', 2.5) + circ(0, -12, 14, '#cfe3f5', 2.5)) + waipo(270, 270, 0.6, { w: true, mood: 'laugh', arms: 'up' }) + yu(215, 290, 1.1, { w: true, mood: 'laugh', arms: 'up' })),
  // 11 bedtime story, moon
  svg(room('#f5d9a8', '#b98a5e', 220) + win(250, 40, 100, 90, 'moon') + stars(5, 4, 100).replace(/./, '') + rect(40, 170, 180, 50, '#fff', 3, 8) + rect(40, 160, 180, 26, '#f08fa3', 3, 8) + yu(120, 175, 0.8, { mood: 'happy', legs: 'sit', arms: 'hold' }) + waipo(285, 296, 0.95, { mood: 'laugh', arms: 'point' }) + heart(210, 80, 1.2)),
];
