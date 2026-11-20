// Pictures for zh-squirrel-nuts (小松鼠存果子): cover + 10 pages.
import { svg, rect, circ, ell, path, line, G, rnd, sky, SKY, cloud, hills, ground, tufts, tree, maple, bareTree, pine, snowGround, snowfall, heart, spark, sweat, tear, squirrel, bird, acorn, sun } from './all.js';

const AUT = ['#e8642f', '#f2a23a', '#d9482f'];
const autumn = () => sky('#bfe3f7', '#fff3d6') + cloud(90, 50, 1) + hills(205, '#e7c36a', '#d9a84f') + maple(60, 215, 0.9, AUT[0]) + maple(340, 210, 1, AUT[1]) + ground(220, '#a9c95a', 8) + tufts(235, 295, 10, 3, '#8fb04a', 1);
const leaves = () => [[40, 250], [120, 270], [280, 262], [350, 285], [200, 285]].map(([x, y], i) => path(`M${x} ${y} q8 -10 16 0 q-8 6 -16 0Z`, AUT[i % 3], 2)).join('');
const nuts = (list) => list.map(([x, y, s]) => acorn(x, y, s || 1)).join('');
const basket = (x, y, s = 1, n = 0) => G(x, y, s, path('M-26 -26 Q-24 8 0 8 Q24 8 26 -26Z', '#d9a35e') + path('M-22 -14 L22 -14 M-20 -2 L20 -2 M-8 -26 L-8 6 M8 -26 L8 6', 'none', 2, 'opacity=".5"') + ell(0, -26, 28, 6, '#b07a3d') + Array.from({ length: n }, (_, i) => acorn(-18 + (i % 5) * 9, -34 - Math.floor(i / 5) * 8, 0.8)).join('') + path('M-26 -26 Q0 -70 26 -26', 'none', 4, 'stroke="#b07a3d"'));
const hole = (x, y, s = 1, filled = 0) => G(x, y, s, ell(0, 0, 26, 34, '#3a2a22') + ell(0, 4, 20, 28, '#5a3f30', 0) + Array.from({ length: filled }, (_, i) => acorn(-14 + (i % 4) * 10, 24 - Math.floor(i / 4) * 10, 0.7)).join(''));
const bigTree = (x, y, s = 1, c = '#e8642f') => G(x, y, s, path('M-30 0 Q-24 -120 -18 -170 L18 -170 Q24 -120 30 0Z', '#9a6a42') + path('M-14 -60 Q-10 -90 -4 -100', 'none', 2, 'opacity=".4"') + circ(-50, -190, 46, c) + circ(50, -190, 46, c) + circ(0, -230, 52, c) + circ(0, -180, 46, c, 0));

export const pics = [
  svg(autumn() + leaves() + squirrel(170, 265, 2.2, { mood: 'happy' }) + basket(270, 280, 1.3, 7) + nuts([[100, 275, 1.4], [330, 260, 1.2]])),
  // 1 autumn, squirrel in tree
  svg(sky('#bfe3f7', '#fff3d6') + cloud(300, 45, 0.9) + ground(240, '#a9c95a', 6) + bigTree(150, 285, 1.0, AUT[0]) + maple(340, 245, 1.0, AUT[1]) + squirrel(215, 140, 1.5, { mood: 'happy' }) + leaves()),
  // 2 many acorns under the tree
  svg(autumn() + leaves() + nuts([[60, 265, 1.4], [120, 280, 1.4], [170, 262, 1.4], [240, 278, 1.4], [300, 262, 1.4], [350, 282, 1.3], [90, 250, 1.1], [270, 250, 1.1]]) + squirrel(200, 245, 1.9, { mood: 'wow' }) + spark(120, 120, 1.2)),
  // 3 picking up, basket
  svg(autumn() + leaves() + nuts([[70, 270, 1.3], [320, 268, 1.3], [345, 285, 1.2]]) + squirrel(130, 262, 2.0, { mood: 'happy' }) + basket(285, 275, 1.8, 10) + acorn(210, 190, 1.6) + path('M215 215 q20 20 40 30', 'none', 3, 'stroke="#e8433a" stroke-dasharray="5 6"')),
  // 4 bird asks
  svg(autumn() + leaves() + squirrel(130, 270, 1.9, { mood: 'happy' }) + basket(210, 282, 1.5, 10) + bird(300, 150, 2.6, '#4f8fd6', true, true) + path('M260 110 q12 -14 30 -8 M255 128 q4 -8 12 -6', 'none', 3, 'stroke="#ffd23f"')),
  // 5 squirrel explains: thought bubble with snow
  svg(autumn() + leaves() + squirrel(130, 275, 2.1, { mood: 'happy' }) + circ(215, 160, 5, '#fff', 2) + circ(232, 142, 8, '#fff', 2) + ell(300, 80, 80, 56, '#fff') + snowfall(10, 4, 70).replace(/fill="#fff"/g, 'fill="#9fc3e6"') + pine(300, 125, 0.45, true) + pine(325, 125, 0.35, true) + ell(270, 118, 10, 6, '#bf8a4f', 2)),
  // 6 put in the tree hollow
  svg(sky('#bfe3f7', '#fff3d6') + ground(240, '#a9c95a', 6) + bigTree(150, 285, 1.1, AUT[0]) + hole(150, 225, 1.1, 8) + squirrel(250, 275, 1.9, { mood: 'happy', flip: true }) + nuts([[330, 272, 1.2]]) + leaves()),
  // 7 bird plays
  svg(autumn() + leaves() + bird(120, 200, 3.0, '#4f8fd6', false, false) + bird(260, 125, 2.2, '#4f8fd6', true, true) + path('M118 120 q8 -10 16 0 M150 100 q8 -10 16 0', 'none', 2.5, 'stroke="#e8433a"') + spark(80, 100, 1.2) + heart(300, 200, 1.0)),
  // 8 winter, hungry bird
  svg(sky(...SKY.snow) + snowGround(215) + bareTree(70, 240, 1.4) + bareTree(330, 235, 1.3) + snowfall(30, 7, 300) + bird(200, 270, 3.4, '#4f8fd6', false, false) + sweat(235, 205, 1.2) + tear(165, 235)),
  // 9 share
  svg(sky(...SKY.snow) + snowGround(215) + bigTree(130, 285, 1.0, '#7a5a3a').replace(/#7a5a3a/g, '#cfdceb') + hole(135, 225, 1.1, 8) + squirrel(215, 275, 1.9, { mood: 'happy', flip: true }) + bird(300, 275, 2.6, '#4f8fd6', true) + nuts([[255, 268, 1.2], [285, 282, 1.2]]) + heart(260, 120, 1.2) + snowfall(16, 5, 300)),
  // 10 happy ending
  svg(sky('#f7b98a', '#ffe7c2') + sun(320, 90, 24) + ground(235, '#a9c95a', 6) + maple(60, 240, 1, AUT[0]) + squirrel(150, 270, 2.0, { mood: 'laugh' }) + bird(270, 265, 2.6, '#4f8fd6', true) + acorn(330, 270, 1.4) + heart(210, 140, 1.4) + leaves()),
];
