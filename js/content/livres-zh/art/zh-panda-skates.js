// Pictures for zh-panda-skates (熊猫学滑冰): cover + 10 pages.
import { svg, rect, circ, ell, path, line, G, sky, SKY, cloud, pine, snowGround, snowfall, mountains, star, spark, sweat, motion, heart, rabbit, panda, yu, snowman } from './all.js';

const lake = (n = 12, seed = 2) => sky(...SKY.snow) + mountains(150, '#9fb4d2', true) + pine(30, 178, 0.8, true) + pine(370, 180, 0.9, true) + pine(340, 172, 0.6, true) + path('M0 160 L400 160 L400 300 L0 300Z', '#e9f1f9', 0) + rect(0, 172, 400, 128, 'url(#gIce)', 0) + path('M20 215 q40 -4 80 0 M240 250 q50 -5 100 0 M120 280 q30 -3 60 0', 'none', 2, 'stroke="#fff" opacity=".8"') + snowfall(n, seed, 170);
const blades = (dx = 0) => path(`M${-26 + dx} 3 L-2 3 M${2 + dx} 3 L${26 + dx} 3`, 'none', 4, 'stroke="#9aa3b5"');
const pd = (x, y, s, o = {}) => panda(x, y, s, { ...o, item: (o.item || '') + blades() });
const fall = (x, y, s) => G(x, y, s, panda(0, 0, 1, { mood: 'cry', arms: 'up', item: blades() }), false, 68) ;

export const pics = [
  svg(lake(14, 3) + pd(150, 275, 1.4, { mood: 'laugh', arms: 'up' }) + yu(270, 270, 1.15, { w: true, legs: 'skate', mood: 'laugh', arms: 'wave' })),
  // 1 panda on the mountain
  svg(sky(...SKY.snow) + mountains(130, '#9fb4d2', true) + snowGround(190) + pine(60, 200, 1.1, true) + pine(340, 205, 1.2, true) + panda(200, 275, 1.4, { mood: 'happy', scarf: '#e8433a' }) + path('M0 230 L400 230', 'none', 0) + snowfall(14, 5, 190)),
  // 2 sees kids skating
  svg(lake(10, 4) + yu(110, 255, 0.95, { w: true, legs: 'skate', mood: 'laugh', arms: 'wave' }) + rabbit(230, 245, 1.0, { pose: 'run' }) + pd(330, 292, 1.35, { mood: 'wow', arms: 'up' }) + heart(330, 110, 0.9)),
  // 3 gets skates
  svg(lake(8, 6) + yu(120, 285, 1.35, { w: true, mood: 'happy', arms: 'hold' }) + panda(270, 292, 1.5, { mood: 'happy', arms: 'hold' }) + G(190, 262, 1.2, path('M-14 -4 L-12 -26 L2 -26 L4 -12 L16 -6 L16 2 L-14 2Z', '#e8433a') + path('M-16 8 L18 8', 'none', 4, 'stroke="#9aa3b5"')) ),
  // 4 falls down
  svg(lake(8, 7) + fall(220, 275, 1.4) + star(150, 215, 7) + star(300, 205, 6) + star(190, 160, 5) + spark(120, 250, 0.9, '#fff')),
  // 5 falls again, sad
  svg(lake(8, 9) + pd(200, 290, 1.5, { mood: 'cry', arms: 'down' }) + sweat(255, 180, 1.2) + star(120, 200, 5) + fall(340, 290, 0.6)),
  // 6 xiaoyu helps
  svg(lake(8, 1) + yu(120, 290, 1.4, { w: true, legs: 'skate', mood: 'happy', arms: [[34, -42], [34, -42]] }) + pd(235, 290, 1.4, { mood: 'happy', arms: 'hold' }) + heart(230, 110, 1)),
  // 7 step by step
  svg(lake(10, 8) + yu(120, 290, 1.4, { w: true, legs: 'skate', mood: 'laugh', arms: [[34, -42], [34, -42]] }) + pd(235, 290, 1.4, { mood: 'laugh', arms: 'hold' }) + ell(60, 292, 14, 4, '#d3e5f4', 0) + ell(190, 296, 14, 4, '#d3e5f4', 0) + ell(300, 296, 14, 4, '#d3e5f4', 0)),
  // 8 rabbit cheers, panda glides
  svg(lake(8, 2) + rabbit(90, 262, 1.5, { pose: 'sit' }) + pd(250, 285, 1.5, { mood: 'laugh', arms: 'up' }) + motion(170, 235, 1.2, false)),
  // 9 gliding
  svg(lake(8, 4) + yu(80, 245, 0.9, { w: true, legs: 'skate', mood: 'laugh' }) + rabbit(330, 240, 1.0, { pose: 'sit' }) + pd(210, 292, 1.7, { mood: 'laugh', arms: 'up' }) + motion(120, 250, 1.3, false) + spark(300, 120, 1.2) + spark(110, 120, 1)),
  // 10 everyone claps
  svg(lake(14, 6) + yu(100, 280, 1.25, { w: true, mood: 'laugh', arms: 'up' }) + rabbit(310, 275, 1.3, { pose: 'sit' }) + pd(205, 292, 1.5, { mood: 'laugh', arms: 'up' }) + heart(205, 80, 1.2) + spark(60, 90, 1) + spark(350, 100, 1)),
];
