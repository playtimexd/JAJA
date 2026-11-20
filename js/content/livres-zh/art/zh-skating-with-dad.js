// Pictures for zh-skating-with-dad (和爸爸去滑冰): cover + 11 pages.
import { O, svg, rect, circ, ell, path, line, G, sky, SKY, cloud, pine, snowGround, snowfall, heart, spark, sweat, star, motion, yu, baba, mama, mug } from './all.js';

const iceBg = (n = 6, seed = 2) => sky(...SKY.snow) + cloud(70, 45, 1, '#f2f6fb') + cloud(320, 60, 0.8, '#f2f6fb') + pine(30, 150, 0.8, true) + pine(80, 145, 0.6, true) + pine(360, 150, 0.9, true) + rect(0, 150, 400, 150, '#f4f8fc', 0) + rect(0, 168, 400, 132, 'url(#gIce)', 0) + path('M30 215 q40 -4 80 0 M250 255 q50 -5 100 0 M120 285 q30 -3 60 0', 'none', 2, 'stroke="#fff" opacity=".9"') + snowfall(n, seed, 150);
const boards = (y = 168) => rect(-5, y - 22, 410, 22, '#fff', 3, 3) + rect(-5, y - 12, 410, 5, '#4f8fd6', 0) + [20, 100, 180, 260, 340].map((x) => line(x, y - 22, x, y, O, 2)).join('');
const blades = path('M-26 3 L-2 3 M2 3 L26 3', 'none', 4, 'stroke="#9aa3b5"');
const me = (x, y, s, o = {}) => yu(x, y, s, { w: true, hat: 'helmet', hatC: '#4f8fd6', ...o });
const penguin = (x, y, s = 1) => G(x, y, s, ell(0, -22, 18, 24, '#2f3346') + ell(0, -18, 11, 18, '#fff', 0) + circ(0, -50, 12, '#2f3346') + circ(-4, -52, 2.5, '#fff', 0) + circ(5, -52, 2.5, '#fff', 0) + circ(-4, -52, 1.2, O, 0) + circ(5, -52, 1.2, O, 0) + path('M-4 -46 L6 -46 L1 -41Z', '#f2a23a', 2) + ell(-8, 2, 8, 3.5, '#f2a23a', 2) + ell(8, 2, 8, 3.5, '#f2a23a', 2) + path('M-18 -30 L-28 -12 M18 -30 L28 -12', 'none', 5, 'stroke="#2f3346"'));
const skate = (x, y, s = 1, c = '#fff') => G(x, y, s, path('M-16 -30 L-6 -30 L-4 -12 L16 -8 L16 4 L-16 4Z', c) + path('M-20 10 L20 10 M-14 4 L-14 10 M10 4 L10 10', 'none', 3, 'stroke="#9aa3b5"') + path('M-14 -22 L-8 -22 M-12 -14 L-6 -14', 'none', 2, 'stroke="#e8433a"'));

export const pics = [
  svg(iceBg(10, 3) + boards() + baba(120, 290, 0.95, { w: true, legs: 'skate', mood: 'laugh', arms: 'wave' }) + me(235, 292, 1.35, { legs: 'skate', mood: 'laugh', arms: 'up' }) + heart(180, 80, 1.1)),
  // 1 sunny Saturday
  svg(sky('#9fd8f7', '#eef8ff') + circ(320, 70, 55, 'url(#gSun)', 0) + circ(320, 70, 22, '#ffe58a') + snowGround(200) + pine(50, 205, 1.1, true) + pine(355, 200, 1.2, true) + baba(140, 292, 1.05, { w: true, mood: 'laugh', arms: 'point' }) + me(240, 292, 1.35, { hat: 'tuque', hatC: '#e8433a', mood: 'laugh', arms: 'up' }) + skate(330, 290, 0.9)),
  // 2 big rink, scared
  svg(iceBg(8, 4) + boards() + me(120, 292, 1.5, { mood: 'worried', arms: 'hold' }) + baba(70, 280, 0.7, { w: true, legs: 'skate', mood: 'happy', hat: null }).replace('', '') + yu(300, 255, 0.55, { w: true, legs: 'skate', mood: 'laugh' }) + yu(350, 250, 0.5, { w: true, legs: 'skate', mood: 'laugh', hat: 'cap' }) + sweat(160, 175, 1.1)),
  // 3 lacing skates, helmet
  svg(sky('#e9f2fa', '#fff') + rect(0, 200, 400, 100, '#d9a877', 0) + line(0, 200, 400, 200, O, 3) + rect(40, 150, 320, 14, '#c98d5a', 3, 4) + rect(60, 164, 12, 40, '#a8743f', 2) + rect(328, 164, 12, 40, '#a8743f', 2) + me(215, 150, 1.5, { legs: 'sit', mood: 'happy', arms: 'hold' }).replace('', '') + baba(100, 296, 0.95, { w: true, mood: 'laugh', arms: 'point' }) + skate(300, 150, 1.4)),
  // 4 holding the boards
  svg(iceBg(6, 5) + boards(190) + me(200, 296, 1.55, { legs: 'skate', mood: 'worried', arms: [[-34, -50], [34, -50]] }) + baba(320, 296, 0.95, { w: true, legs: 'skate', mood: 'happy', arms: 'point' }) + sweat(235, 150, 1.2)),
  // 5 penguin walk
  svg(iceBg(6, 6) + baba(95, 296, 0.95, { w: true, legs: 'skate', mood: 'laugh', arms: 'point' }) + me(225, 296, 1.45, { legs: 'walk', mood: 'laugh', arms: 'wave' }) + penguin(330, 270, 1.4) + path('M250 205 q-8 -26 14 -34', 'none', 3, 'stroke="#5a6fa8" stroke-dasharray="4 5"') + spark(150, 100, 1.1)),
  // 6 letting go of the boards
  svg(iceBg(6, 7) + boards(150) + me(150, 296, 1.5, { legs: 'skate', mood: 'laugh', arms: 'up' }) + baba(285, 296, 1.0, { w: true, legs: 'skate', mood: 'laugh', arms: 'wave' }) + heart(200, 90, 1.1) + spark(330, 110, 1)),
  // 7 gliding
  svg(iceBg(8, 8) + me(210, 296, 1.65, { legs: 'skate', mood: 'laugh', arms: 'up' }) + motion(120, 250, 1.4, false) + baba(320, 280, 0.75, { w: true, legs: 'skate', mood: 'laugh' }) + spark(100, 110, 1.2) + spark(330, 100, 1)),
  // 8 sits down, laughs
  svg(iceBg(4, 9) + me(200, 296, 1.65, { legs: 'sit', mood: 'laugh', arms: 'up' }) + star(120, 210, 7) + star(290, 200, 6) + baba(330, 280, 0.75, { w: true, legs: 'skate', mood: 'laugh', arms: 'reach' })),
  // 9 dad pulls her up
  svg(iceBg(4, 3) + baba(130, 296, 1.1, { w: true, legs: 'skate', mood: 'laugh', arms: 'reach' }) + me(255, 296, 1.5, { legs: 'skate', mood: 'laugh', arms: 'reach' }) + heart(190, 90, 1.2) + spark(330, 120, 1)),
  // 10 skating to mama with cocoa
  svg(iceBg(6, 4) + boards(185) + mama(330, 298, 0.95, { w: true, mood: 'laugh', arms: 'wave', item: '' }) + mug(300, 215, 1.2) + mug(350, 215, 1.2) + me(150, 296, 1.5, { legs: 'skate', mood: 'laugh', arms: 'up' }) + motion(80, 250, 1.2, false) + heart(250, 90, 1)),
  // 11 cocoa together
  svg(iceBg(8, 6) + baba(120, 296, 1.05, { w: true, mood: 'happy', arms: 'hold' }) + me(230, 296, 1.5, { mood: 'happy', arms: 'hold' }) + mug(185, 175, 1.6) + mug(270, 200, 1.4) + heart(180, 70, 1.2)),
];
