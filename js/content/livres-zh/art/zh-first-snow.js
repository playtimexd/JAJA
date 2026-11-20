// Pictures for zh-first-snow (第一场雪): cover + 11 pages.
import { svg, yu, didi, mama, snowman, rect, circ, ell, path, line, G, sky, SKY, snowGround, snowfall, pine, bareTree, house, room, win, cloud, heart, spark, table } from './all.js';

const outdoor = (n = 30, seed = 4) => sky(...SKY.snow) + cloud(70, 50, 1, '#f2f6fb') + cloud(300, 40, 0.8, '#f2f6fb') + house(320, 190, 0.8, { snow: true, lit: true }) + pine(40, 200, 0.9, true) + pine(90, 190, 0.7, true) + snowGround(205) + snowfall(n, seed);
const indoor = (scene = 'snow') => room('#fbe7c6', '#d9a877', 220) + win(130, 40, 140, 110, scene);
const cup = (x, y) => path(`M${x - 12} ${y - 18} L${x + 12} ${y - 18} L${x + 9} ${y} L${x - 9} ${y}Z`, '#fff') + path(`M${x + 12} ${y - 14} q10 2 0 10`, 'none', 3) + path(`M${x - 6} ${y - 24} q-4 -6 0 -10 M${x + 4} ${y - 24} q-4 -6 0 -10`, 'none', 2, 'opacity=".5"');

export const pics = [
  // cover
  svg(outdoor(36, 2) + snowman(250, 262, 0.8, { hat: true }) + yu(110, 270, 1.15, { w: true, arms: 'up', mood: 'laugh' }) + didi(170, 272, 1.15, { w: true, arms: 'up', mood: 'laugh' })),
  // 1 morning window
  svg(indoor('snow') + rect(110, 160, 180, 16, '#fff', 3, 4) + yu(200, 280, 1.2, { mood: 'wow', arms: 'hold' })),
  // 2 calls mama
  svg(indoor('snow') + yu(130, 282, 1.2, { mood: 'laugh', arms: 'up' }) + mama(275, 290, 0.95, { mood: 'happy' }) + heart(210, 110, 1) + spark(70, 90, 1)),
  // 3 brother arrives
  svg(indoor('snow') + didi(120, 282, 1.3, { mood: 'wow', arms: 'point' }) + mama(270, 290, 0.95, { mood: 'laugh', arms: 'wave' })),
  // 4 dressing, going out
  svg(room('#fbe7c6', '#d9a877', 220) + rect(160, 50, 80, 170, '#9a5b3a', 3, 4) + circ(228, 140, 4, '#ffd84d', 0) + yu(110, 282, 1.25, { w: true, mood: 'laugh' }) + didi(300, 284, 1.25, { w: true, mood: 'laugh' })),
  // 5 snowflake on hand
  svg(outdoor(40, 6) + yu(200, 292, 1.5, { w: true, mood: 'wow', arms: 'reach' }) + path('M268 148 l0 12 M262 154 l12 0 M264 148 l8 12 M272 148 l-8 12', 'none', 2.5, 'stroke="#7fb6e0"')),
  // 6 like stars
  svg(outdoor(44, 9) + yu(180, 292, 1.5, { w: true, mood: 'laugh', arms: 'up' }) + spark(90, 90, 1.2, '#fff') + spark(310, 100, 1, '#fff')),
  // 7 brother walks in deep snow
  svg(outdoor(26, 3) + path('M60 270 q10 -8 20 0 M120 280 q12 -8 24 0 M300 268 q10 -8 20 0', 'none', 3, 'stroke="#a9c1d9"') + didi(200, 285, 1.6, { w: true, legs: 'walk', mood: 'laugh' }) + ell(150, 284, 8, 3.5, '#bcd0e6', 0) + ell(120, 288, 8, 3.5, '#bcd0e6', 0)),
  // 8 building snowman
  svg(outdoor(20, 5) + snowman(200, 270, 0.9, { nose: false, scarf: null }) + yu(95, 285, 1.3, { w: true, mood: 'happy', arms: 'up' }) + didi(310, 285, 1.3, { w: true, mood: 'happy', arms: 'up' })),
  // 9 hat on snowman
  svg(outdoor(18, 8) + snowman(200, 270, 1, { hat: false, scarf: '#4f8fd6' }) + didi(110, 285, 1.3, { w: true, mood: 'laugh', arms: 'up', hat: null }) + yu(300, 285, 1.3, { w: true, mood: 'laugh', arms: 'wave' })),
  // 10 hot milk
  svg(indoor('snow') + table(200, 220, 240) + cup(150, 220) + cup(250, 220) + yu(95, 285, 1.2, { mood: 'happy', arms: 'hold' }) + didi(330, 288, 1.2, { mood: 'laugh', arms: 'hold' }) + mama(205, 262, 0.7, { mood: 'laugh' })),
  // 11 night window
  svg(room('#f7d9a8', '#b98a5e', 220) + win(110, 40, 180, 130, 'night') + snowman(200, 150, 0.35, { hat: true }) + snowfall(10, 12, 150) + yu(200, 292, 1.2, { mood: 'calm', arms: 'hold' }) + circ(330, 80, 50, 'url(#gLamp)', 0)),
];
