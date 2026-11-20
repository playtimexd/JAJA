// Pictures for zh-dragon-boat (公园里的龙舟赛): cover + 11 pages.
import { O, svg, rect, circ, ell, path, line, G, sky, SKY, cloud, sun, hills, tree, ground, tufts, heart, spark, sweat, motion, yu, didi, mama, baba, friend, friend2, dragonBoat, zongzi } from './all.js';

const RED = '#e8433a', YEL = '#f2b800', BLU = '#3f8fd6', GRN = '#3fa06a';
const lake = () => sky(...SKY.day) + cloud(80, 45, 1) + cloud(320, 60, 0.8) + hills(150, '#a9dc8a', '#86c76c') + tree(40, 160, 0.7) + tree(360, 165, 0.8) + rect(0, 150, 400, 150, 'url(#gWat)', 0)
  + path('M0 190 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 M0 250 q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0', 'none', 2, 'stroke="#fff" opacity=".5"');
const shore = () => rect(0, 262, 400, 38, '#9fd86f', 0) + line(0, 262, 400, 262, O, 3);
const drum = (x, y, s = 1) => G(x, y, s, ell(0, 0, 16, 7, '#e8433a') + rect(-16, 0, 32, 18, '#e8433a', 3, 0) + ell(0, 18, 16, 6, '#c9302a') + ell(0, 0, 13, 5, '#f6e2b8', 2) + path('M-16 6 l32 0 M-16 12 l32 0', 'none', 2, 'stroke="#ffd23f"'));
const paddle = (x, y, rot = 30) => G(x, y, 1, line(0, -26, 0, 14, '#c98d5a', 4) + path('M-6 8 L6 8 L5 22 L-5 22Z', '#e9b26a', 2.5), false, rot);
// a boat with its crew [{k, dx, arms, hat, o}] drawn behind the hull
const WHO = { yu, didi, f1: friend, f2: friend2 };
function boat(x, y, s, c, crew, tilt = 0, flag = '#ffd23f') {
  if (s < 1.2 && c !== RED) crew = crew.slice(0, 2);
  const kids = crew.map((m) => (WHO[m.k] || yu)(x + m.dx * s, y + 2 * s, 0.34 * s, { legs: 'stand', hat: m.hat === undefined ? null : m.hat, hatC: c, mood: m.mood || 'laugh', arms: m.arms || 'hold', ...(m.o || {}) })).join('');
  return kids + dragonBoat(x, y, s, c, flag, tilt);
}
const RC = (o = {}) => [{ k: 'f1', dx: -32 }, { k: 'f2', dx: -10 }, { k: 'yu', dx: 12 }, { k: 'didi', dx: 34, arms: 'up' }].map((m) => ({ ...m, ...o }));
const AI = (n) => [-30, -8, 14, 36].map((dx, i) => ({ k: ['f2', 'f1', 'didi', 'yu'][(i + n) % 4], dx, hat: null }));
const bubble = () => ell(250, 80, 120, 60, '#fff') + rect(150, 72, 200, 40, 'url(#gWat)', 0) + dragonBoat(220, 100, 0.6, RED) + zongzi(300, 90, 0.8) + zongzi(330, 104, 0.6);

export const pics = [
  svg(lake() + boat(190, 235, 2.4, RED, RC()) + sun(330, 50, 22) + heart(330, 130, 1) + spark(70, 110, 1.2)),
  // 1 lake with boats, family on the shore
  svg(lake() + boat(110, 190, 0.9, BLU, AI(1)) + boat(270, 205, 0.9, YEL, AI(2)) + boat(200, 232, 0.9, RED, RC()) + shore() + baba(70, 298, 0.9, { mood: 'laugh', arms: 'wave' }) + mama(130, 298, 0.9, { mood: 'laugh', arms: 'wave' }) + yu(260, 298, 1.0, { mood: 'laugh', arms: 'up' }) + didi(320, 298, 0.95, { mood: 'laugh', arms: 'up' })),
  // 2 close-up of the dragon boat
  svg(lake() + boat(180, 250, 3.1, RED, [{ k: 'f1', dx: -30 }, { k: 'f2', dx: -8 }, { k: 'yu', dx: 14 }, { k: 'didi', dx: 34 }]) + drum(340, 215, 0.9) + spark(60, 90, 1.2) + spark(350, 100, 1)),
  // 3 the team, brother with the drum
  svg(lake() + rect(0, 200, 400, 100, '#b98a5e', 0) + line(0, 200, 400, 200, O, 3) + friend(70, 296, 1.25, { mood: 'laugh', arms: 'up', hat: 'tuque', hatC: RED }) + friend2(150, 296, 1.25, { mood: 'laugh', arms: 'up', hat: 'tuque', hatC: RED }) + yu(250, 296, 1.25, { mood: 'laugh', arms: 'up', hat: 'tuque', hatC: RED }) + didi(330, 296, 1.4, { mood: 'laugh', arms: 'hold', hat: 'tuque', hatC: RED }) + drum(330, 270, 0.9)),
  // 4 dad tells the old story (bubble with river, boat and zongzi)
  svg(sky(...SKY.day) + hills(210, '#a9dc8a', '#86c76c') + rect(0, 225, 400, 75, '#9fd86f', 0) + line(0, 225, 400, 225, O, 3) + baba(95, 298, 1.0, { mood: 'happy', arms: 'point' }) + yu(215, 298, 1.1, { mood: 'wow', arms: 'up' }) + didi(285, 298, 1.0, { mood: 'wow', arms: 'up' }) + bubble()),
  // 5 the start: splashes
  svg(lake() + boat(120, 185, 1.0, BLU, AI(1)) + boat(280, 195, 1.0, YEL, AI(3)) + boat(110, 262, 1.5, GRN, AI(2)) + boat(290, 275, 1.7, RED, RC({ arms: 'up' }), -6) + path('M170 255 q10 -20 20 0 M230 248 q10 -20 20 0', 'none', 4, 'stroke="#fff"') + sweat(190, 200, 1.2)),
  // 6 chaos: red boat spins, others ahead
  svg(lake() + boat(300, 175, 0.9, BLU, AI(1)) + boat(110, 190, 0.9, YEL, AI(2)) + boat(200, 262, 1.8, RED, RC({ mood: 'worried' }), -12) + paddle(95, 255, 40) + paddle(305, 262, -50) + sweat(150, 190, 1.3) + path('M110 235 q-20 20 0 40 M300 232 q20 20 0 40', 'none', 4, 'stroke="#fff" opacity=".8"')),
  // 7 yu raises her hand: stop
  svg(lake() + boat(190, 250, 2.9, RED, [{ k: 'f1', dx: -30 }, { k: 'f2', dx: -8 }, { k: 'yu', dx: 14, arms: 'up' }, { k: 'didi', dx: 34 }]) + spark(130, 110, 1.3) + spark(290, 110, 1.3)),
  // 8 in rhythm
  svg(lake() + boat(180, 252, 2.9, RED, [{ k: 'f1', dx: -30, arms: 'point' }, { k: 'f2', dx: -8, arms: 'point' }, { k: 'yu', dx: 14, arms: 'point' }, { k: 'didi', dx: 34, arms: 'up' }]) + motion(40, 215, 1.4, false) + motion(40, 245, 1.2, false) + spark(330, 80, 1.2) + spark(70, 90, 1)),
  // 9 the yellow boat reaches the finish line first
  svg(lake() + rect(335, 130, 6, 120, '#fff', 3) + path('M341 134 l40 10 l-40 10Z', '#e8433a') + boat(300, 220, 1.4, YEL, AI(2)) + boat(200, 250, 1.8, RED, RC({ arms: 'up' })) + motion(60, 240, 1.2, false) + heart(250, 110, 1)),
  // 10 second place, comforting brother
  svg(lake() + shore() + didi(120, 298, 1.5, { mood: 'sad', arms: 'down', hat: 'tuque', hatC: RED }) + yu(230, 298, 1.45, { mood: 'happy', arms: [[34, -54], [34, -54]], hat: 'tuque', hatC: RED }) + G(330, 150, 1.4, circ(0, 0, 24, '#c9ced8') + circ(0, 0, 16, '#e3e7ee', 2) + path('M-10 -22 L-14 -44 L14 -44 L10 -22', '#e8433a') + path('M-3 6 L0 -10 L3 6', 'none', 4)) + heart(175, 100, 1.2)),
  // 11 zongzi picnic on the grass
  svg(sky(...SKY.warm) + hills(180, '#a9dc8a', '#86c76c') + rect(0, 205, 400, 95, '#9fd86f', 0) + line(0, 205, 400, 205, O, 3) + tufts(215, 295, 14, 4) + rect(70, 235, 260, 50, '#fff', 3, 3) + rect(70, 235, 260, 12, '#e8433a', 0) + zongzi(140, 262, 1.2) + zongzi(200, 258, 1.2) + zongzi(260, 262, 1.2) + friend(55, 296, 0.9, { mood: 'laugh' }) + friend2(345, 296, 0.9, { mood: 'laugh' }) + yu(130, 232, 0.8, { mood: 'laugh', arms: 'up' }) + didi(270, 232, 0.75, { mood: 'laugh', arms: 'up' }) + heart(200, 70, 1.3) + spark(80, 100, 1.1)),
];
