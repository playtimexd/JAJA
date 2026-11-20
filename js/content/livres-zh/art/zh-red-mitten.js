// Pictures for zh-red-mitten (红手套): cover + 10 pages.
import { svg, yu, didi, mama, mitten, snowman, tear, bench, rect, circ, ell, path, G, sky, SKY, snowGround, snowfall, pine, bareTree, house, room, cloud, bird, squirrel, heart, spark, win } from './all.js';

const park = (n = 14, seed = 3) => sky(...SKY.snow) + cloud(80, 45, 1, '#f2f6fb') + pine(50, 190, 0.9, true) + pine(350, 195, 1, true) + bareTree(310, 200, 0.9) + snowGround(205) + snowfall(n, seed);
const R = '#e8433a';

export const pics = [
  svg(park(20, 2) + yu(200, 285, 1.6, { w: true, mood: 'happy', arms: [[-27, -34], [40, -70]] }) + mitten(240, 165, 1.8, R, 20) + mitten(108, 215, 1.4, R, -20)),
  // 1 she loves her mittens
  svg(room('#fbe7c6', '#d9a877', 220) + win(250, 40, 110, 90, 'snow') + yu(130, 285, 1.4, { mood: 'happy', arms: 'up' }) + mitten(80, 135, 1.3, R, -25) + mitten(185, 135, 1.3, R, 25) + heart(130, 70, 1) + rect(250, 225, 110, 14, '#c98d5a', 3, 3) + mitten(305, 224, 1.2, R, 0)),
  // 2 play in park
  svg(park(22, 5) + yu(120, 275, 1.3, { w: true, mood: 'laugh', arms: 'up' }) + mitten(70, 125, 1.0, R, -20) + mitten(166, 125, 1.0, R, 20) + didi(260, 280, 1.3, { w: true, mood: 'laugh', arms: 'up' }) + snowman(345, 265, 0.5, { hat: true })),
  // 3 one mitten missing
  svg(park(10, 7) + yu(200, 292, 1.6, { w: true, mood: 'worried', arms: [[-34, -62], [34, -62]] }) + mitten(250, 150, 1.5, R, 15) + spark(110, 100, 1, '#fff')),
  // 4 sad, going back
  svg(park(12, 8) + yu(125, 290, 1.4, { w: true, mood: 'sad', arms: 'down' }) + didi(250, 290, 1.4, { w: true, mood: 'happy', arms: 'wave' }) + heart(210, 140, 0.9, '#ff9fb2') + tear(150, 195)),
  // 5 ask the bird
  svg(park(16, 9) + yu(110, 292, 1.5, { w: true, mood: 'think', arms: 'point' }) + bench(310, 235, 1.1) + bird(290, 188, 2.4, '#4f8fd6', true) + path('M215 150 q8 -14 24 -8', 'none', 3, 'stroke="#ffd23f"')),
  // 6 bird points to tree
  svg(park(10, 4) + bareTree(250, 235, 1.8) + squirrel(260, 112, 1.4, { flip: true, mood: 'happy' }) + bird(120, 240, 3.2, '#4f8fd6', false) + yu(60, 292, 0.9, { w: true, mood: 'think' })),
  // 7 squirrel tells
  svg(park(10, 6) + bareTree(70, 235, 1.8) + squirrel(95, 150, 1.5, { mood: 'wow' }) + snowman(310, 262, 0.9, { hat: false }) + path('M150 140 q60 -30 120 0', 'none', 3, 'stroke="#e8433a" stroke-dasharray="6 7"') + yu(160, 292, 1.0, { w: true, mood: 'wow', arms: 'point', legs: 'run' }) + didi(220, 292, 1.0, { w: true, mood: 'wow', legs: 'run' })),
  // 8 mitten on snowman's twig hand
  svg(park(10, 2) + snowman(230, 270, 1.4, { hat: true, mit: R }) + spark(110, 95, 1.2, '#ffd23f') + spark(330, 80, 1, '#ffd23f') + yu(90, 292, 1.2, { w: true, mood: 'wow', arms: 'point' })),
  // 9 gets it back
  svg(park(14, 3) + yu(200, 292, 1.6, { w: true, mood: 'laugh', arms: [[-34, -64], [34, -64]] }) + mitten(166, 130, 1.5, R, -25) + mitten(236, 130, 1.5, R, 25) + heart(200, 50, 1.2) + snowman(340, 262, 0.7, { hat: true }) + didi(70, 285, 1.1, { w: true, mood: 'laugh', arms: 'up' })),
  // 10 walk home
  svg(sky('#f7b98a', '#ffe7c2') + circ(320, 110, 40, '#ffd27a') + snowGround(210) + pine(40, 200, 0.9, true) + house(330, 205, 0.9, { snow: true, lit: true }) + yu(150, 285, 1.4, { w: true, mood: 'happy', legs: 'walk', arms: 'wave' }) + mitten(100, 170, 1.0, R, -20) + didi(250, 286, 1.3, { w: true, mood: 'laugh', legs: 'walk' })),
];
