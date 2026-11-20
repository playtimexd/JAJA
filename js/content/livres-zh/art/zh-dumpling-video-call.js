// Pictures for zh-dumpling-video-call (除夕包饺子): cover + 11 pages.
import { O, svg, rect, circ, ell, path, line, G, rnd, cloud, star, heart, spark, room, win, table, lantern, yu, didi, mama, baba, yeye, nainai, tablet, dumpling, bowl, plate, coin } from './all.js';

const paperCut = (x, y, s = 1) => G(x, y, s, path('M0 -24 L24 0 L0 24 L-24 0Z', '#e8433a') + path('M0 -14 L14 0 L0 14 L-14 0Z', '#ffd23f', 2) + circ(0, 0, 5, '#e8433a', 2) + path('M-24 0 l-6 0 M24 0 l6 0 M0 -24 l0 -6 M0 24 l0 6', 'none', 2));
const fu = (x, y, s = 1) => G(x, y, s, path('M0 -22 L22 0 L0 22 L-22 0Z', '#e8433a') + path('M-9 0 Q0 -10 9 0 Q0 10 -9 0Z M0 -8 l0 16 M-8 -2 l16 4', 'none', 2.5, 'stroke="#ffd23f"'), false, 180);
const festive = () => room('#fbe7c6', '#c98d5a', 215) + win(40, 40, 110, 90, 'night') + paperCut(95, 85, 1.0) + lantern(230, 40, 1.1) + lantern(350, 40, 1.1) + rect(180, 62, 14, 4, '#ffd23f', 2) ;
const kitchenT = () => room('#fff1d0', '#c9a074', 190) + rect(0, 110, 400, 10, '#e6d2a8', 3) + lantern(350, 50, 1.0) + lantern(50, 50, 1.0);
const tbl = (c = '#c98d5a') => table(200, 200, 340, c);
const dough = (x, y, s = 1) => G(x, y, s, ell(0, 0, 34, 20, '#fff6e0') + ell(0, -4, 26, 14, '#fff', 0, 'opacity=".4"'));
const wrapper = (x, y, s = 1) => G(x, y, s, circ(0, 0, 14, '#fffaf0', 2.5) + ell(0, 0, 6, 3.5, '#9ab55a', 0));
const potSteam = (x, y, s = 1) => G(x, y, s, ell(0, 4, 58, 8, '#2a3a4a', 0, 'opacity=".2"') + path('M-50 -40 Q-50 0 -24 4 L24 4 Q50 0 50 -40Z', '#7b8197') + ell(0, -40, 50, 10, '#e8f1f8') + [-30, -10, 14, 32].map((dx, i) => G(dx, -42 + (i % 2) * 3, 1, dumpling(0, 0, 0.9))).join('') + path('M-24 -58 q-8 -14 0 -26 q8 -12 0 -24 M10 -58 q-8 -14 0 -26 q8 -12 0 -24 M34 -56 q-6 -12 0 -22', 'none', 6, 'stroke="#fff" opacity=".85"'));
const envelope = (x, y, s = 1, rot = 0) => G(x, y, s, rect(-14, -20, 28, 40, '#e8433a', 2.5, 3) + path('M-14 -20 L0 -4 L14 -20', 'none', 2) + circ(0, 2, 6, '#ffd23f', 2), false, rot);
const call = (a, b) => tablet(0, 0, 1, rect(-52, -38, 104, 76, '#fff1d0', 0) + rect(-52, 20, 104, 20, '#e8b074', 0) + a + b);

export const pics = [
  svg(kitchenT() + tbl() + plate(150, 198, 100) + [-30, -5, 20, 40].map((dx, i) => dumpling(150 + dx, 190 + (i % 2) * 3, 1.1, i === 3)).join('') + yu(80, 298, 1.15, { mood: 'laugh', arms: 'up' }) + didi(330, 298, 1.1, { mood: 'laugh', arms: 'up' }) + envelope(260, 170, 1.0, 12) + heart(210, 90, 1.2)),
  // 1 morning: mama announces
  svg(festive() + mama(110, 296, 1.0, { mood: 'laugh', arms: 'point' }) + yu(240, 298, 1.3, { mood: 'laugh', arms: 'up' }) + didi(320, 298, 1.2, { mood: 'laugh', arms: 'up' }) + spark(200, 120, 1.2)),
  // 2 red decorations
  svg(room('#fbe7c6', '#c98d5a', 215) + rect(150, 50, 100, 165, '#9a5b3a', 3, 4) + circ(236, 140, 4, '#ffd23f', 0) + fu(200, 100, 1.6) + paperCut(70, 100, 1.5) + paperCut(335, 100, 1.5) + lantern(40, 40, 1.2) + lantern(360, 40, 1.2) + yu(110, 298, 1.2, { mood: 'laugh', arms: 'up' }) + heart(150, 120, 0.9)),
  // 3 kneading dough
  svg(kitchenT() + tbl() + dough(200, 195, 1.4) + mama(110, 298, 1.05, { mood: 'happy', arms: 'reach' }) + yu(310, 298, 1.1, { mood: 'wow', arms: 'up' }) + path('M270 140 q10 -16 -6 -22', 'none', 2, 'opacity=".4"')),
  // 4 dad mixing filling
  svg(kitchenT() + tbl() + bowl(190, 196, 2.2, '#fff', ell(0, -14, 24, 5, '#d98f6f', 0) + circ(-8, -16, 4, '#9ab55a', 0) + circ(8, -15, 4, '#9ab55a', 0)) + baba(95, 298, 1.0, { mood: 'laugh', arms: 'hold' }) + didi(320, 298, 1.35, { mood: 'wow', arms: 'up' }) + path('M180 125 q-6 -10 0 -18 M200 125 q-6 -10 0 -18', 'none', 3, 'opacity=".5"')),
  // 5 rolling wrappers
  svg(kitchenT() + tbl() + wrapper(150, 190, 1.4) + wrapper(210, 192, 1.2) + wrapper(270, 189, 1.4) + rect(160, 150, 70, 10, '#c98d5a', 2.5, 5) + yu(200, 298, 1.35, { mood: 'laugh', arms: [[-34, -44], [34, -44]] }) + mama(340, 298, 0.9, { mood: 'laugh', arms: 'point' })),
  // 6 wrapping together
  svg(kitchenT() + tbl() + plate(200, 190, 130) + dumpling(170, 184, 1.2) + dumpling(200, 188, 1.2) + dumpling(230, 184, 1.2) + dumpling(262, 188, 1.3, true) + baba(60, 298, 0.9, { mood: 'laugh', arms: 'hold' }) + didi(335, 298, 1.1, { mood: 'laugh', arms: 'hold' }) + yu(130, 298, 1.0, { mood: 'happy', arms: 'hold' })),
  // 7 secret coin
  svg(kitchenT() + tbl() + coin(200, 140, 18) + mama(110, 298, 1.05, { mood: 'laugh', arms: 'up' }) + yu(285, 298, 1.2, { mood: 'wow', arms: 'up' }) + didi(345, 298, 1.0, { mood: 'wow', arms: 'up' }) + spark(165, 110, 1.2) + spark(240, 100, 1)),
  // 8 pot + call comes
  svg(kitchenT() + rect(0, 190, 400, 110, '#c9a074', 0) + potSteam(120, 215, 1.3) + tablet(300, 160, 1.5, rect(-52, -38, 104, 76, '#e8433a', 0) + circ(0, 0, 12, '#4fb06a'), 'tb1') + mama(60, 298, 0.8, { mood: 'happy' }) + yu(215, 298, 0.9, { mood: 'wow', arms: 'up' }) + spark(300, 100, 1.2, '#ffd23f')),
  // 9 video call
  svg(kitchenT() + tbl() + tablet(200, 140, 2.4, rect(-52, -38, 104, 76, '#fff1d0', 0) + rect(-52, 22, 104, 20, '#c8553d', 0) + yeye(-24, 46, 0.34, { mood: 'laugh', top: '#e8433a' }) + nainai(24, 46, 0.34, { mood: 'laugh', top: '#e8433a' }), 'tb2') + yu(90, 298, 1.1, { mood: 'laugh', arms: 'wave' }) + didi(330, 298, 1.0, { mood: 'laugh', arms: 'wave' })),
  // 10 red envelope on screen
  svg(kitchenT() + tbl() + tablet(200, 140, 2.4, rect(-52, -38, 104, 76, '#fff1d0', 0) + rect(-52, 22, 104, 20, '#c8553d', 0) + nainai(0, 46, 0.4, { mood: 'laugh', top: '#e8433a', arms: 'up' }) + envelope(-30, -4, 0.7, -10) + envelope(30, -4, 0.7, 10), 'tb3') + yu(90, 298, 1.1, { mood: 'wow', arms: 'up' }) + didi(330, 298, 1.0, { mood: 'wow', arms: 'up' })),
  // 11 found the coin
  svg(kitchenT() + tbl() + bowl(120, 196, 1.2, '#fff') + bowl(300, 196, 1.2, '#fff') + yu(200, 298, 1.5, { mood: 'laugh', arms: [[-30, -92], [30, -92]] }) + coin(170, 112, 10) + coin(232, 112, 10) + heart(200, 60, 1.3) + spark(80, 100, 1.2) + spark(330, 100, 1.2)),
];
