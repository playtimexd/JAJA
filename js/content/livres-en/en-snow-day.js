// en-snow-day — English storybook, level 1 (see docs/LIVRES.md; pictures use ./art/kit.js)
import { O, SKIN, svg, ell, circ, rect, path, line, G, rnd, shadow, cloud, sun, winterDay, greyDay, snowGround, snowflakes, pine, bareTree, house, floorRoom, win, table, mug, heart, sparkle, motion, sweat, kid, adult, note } from './art/kit.js';

// ---- characters ----
// Noah: ginger hair, blue coat, red toque, yellow scarf/mitts. Ava (little sister): ginger pigtails, pink coat, purple toque, green scarf.
// Mr. Roy: grey beard, red plaid coat, dark toque. Dad: ginger hair, glasses, green sweater.
const HAIR = '#c97a2a';
const noahOut = { hs: 'short', hair: HAIR, skin: SKIN.light, coat: '#2e86de', hat: '#e6493f', pom: '#fff', scarf: '#f2c94c', mitts: '#f2c94c', pants: '#34495e', shoes: '#4a3a2e' };
const avaOut = { hs: 'pigtails', hair: HAIR, skin: SKIN.light, coat: '#e84393', hat: '#9b59b6', pom: '#f2c94c', scarf: '#3fb55f', mitts: '#9b59b6', pants: '#6c3483', shoes: '#4a3a2e' };
const noah = (x, y, s, o = {}) => kid(x, y, s, { ...(o.pj ? { hs: 'short', hair: HAIR, skin: SKIN.light, shirt: '#5dade2', stripe: '#fff', pants: '#5dade2', shoes: '#5dade2' } : o.in ? { hs: 'short', hair: HAIR, skin: SKIN.light, shirt: '#2e86de', pants: '#34495e' } : noahOut), ...o });
const ava = (x, y, s, o = {}) => kid(x, y, s * .84, { ...(o.pj ? { hs: 'pigtails', hair: HAIR, skin: SKIN.light, shirt: '#f78fb3', stripe: '#fff', pants: '#f78fb3', shoes: '#f78fb3' } : o.in ? { hs: 'pigtails', hair: HAIR, skin: SKIN.light, shirt: '#e84393', pants: '#6c3483' } : avaOut), ...o });
const PLAID = path('M-25 -62 H25 M-27 -48 H27 M-28 -36 H28 M-11 -68 V-28 M11 -68 V-28', 'none', 2.4, 'stroke="#7b1f1f" opacity=".75"');
const roy = (x, y, s, o = {}) => adult(x, y, s, { hs: 'bald', hair: '#c8ccd2', skin: SKIN.peach, beard: '#d5d9df', coat: '#c0392b', ...(o.in ? {} : { hat: '#2c3e50', hatBand: '#c0392b', pom: '#c0392b', mitts: '#6b4329' }), pants: '#4a4f63', shoes: '#3a3f55', ...o, extra: PLAID + (o.extra || '') });
const dad = (x, y, s, o = {}) => adult(x, y, s, { hs: 'short', hair: HAIR, skin: SKIN.light, shirt: '#3fa36b', glasses: true, pants: '#34495e', ...o });

// ---- props ----
const ball = (x, y, r) => circ(x, y, r, 'url(#gSnow)') + ell(x + r * .3, y + r * .35, r * .62, r * .45, '#b7cde6', 0, 'opacity=".55"') + ell(x - r * .35, y - r * .4, r * .25, r * .16, '#fff', 0);
// snowman: o = { mid, head, face, hat, scarf, arms }
const snowman = (x, y, s = 1, o = {}) => G(x, y, s, shadow(0, 0, 54, 8) + ball(0, -44, 46) + (o.mid === false ? '' : ball(0, -116, 34))
  + (o.arms ? path('M-30 -124 L-70 -150 M-56 -142 L-64 -160 M30 -124 L72 -146 M60 -140 L70 -156', 'none', 4.5, 'stroke="#7a5236"') : '')
  + (o.mid === false ? '' : [-124, -108, -92].map((yy) => circ(0, yy, 4, O, 0)).join(''))
  + (o.scarf ? path('M-30 -146 Q0 -134 30 -146 L30 -136 Q0 -124 -30 -136Z', o.scarf, 2.6) + path('M14 -138 L20 -96 L32 -98 L26 -138Z', o.scarf, 2.6) + path('M20 -100 l2 6 M26 -100 l2 6', 'none', 2, 'stroke="#fff"') : '')
  + (o.head ? ball(0, -172, 26) : '')
  + (o.head && o.face ? circ(-9, -178, 3.8, O, 0) + circ(9, -178, 3.8, O, 0) + path('M-10 -160 Q0 -152 10 -160', 'none', 0) + [-10, -5, 0, 5, 10].map((xx, i) => circ(xx, -162 + Math.abs(xx) * -.25 + (i === 2 ? 3 : 1.5), 2, O, 0)).join('') + path('M0 -172 L26 -166 L0 -166Z', '#f08a2c', 2.4) : '')
  + (o.hat ? path('M-25 -184 Q-25 -216 0 -216 Q25 -216 25 -184Z', o.hat) + rect(-27, -190, 54, 9, '#fff', 2.4, 4) + circ(0, -218, 7, '#ffd84d', 2.4) : ''));
const sled = (x, y, s = 1, rot = 0, inner = '') => G(x, y, s, inner + path('M-50 -14 L46 -14 Q62 -14 60 -30', 'none', 4) + rect(-50, -24, 96, 12, '#e6493f', 3, 4) + path('M-44 -12 L-44 -4 M38 -12 L38 -4', 'none', 3) + path('M-56 -2 L48 -2 Q66 -2 64 -20', 'none', 4, 'stroke="#8c96a8"'), false, rot);
const radio = (x, y) => G(x, y, 1, line(18, -40, 32, -68, O, 3) + circ(32, -68, 3, '#e6493f', 2) + rect(-34, -40, 68, 40, '#e6493f', 3, 8) + circ(-12, -20, 13, '#ffe7c2', 2.6) + [-6, 0, 6].map((d) => line(-24, -20 + d, 0, -20 + d, '#c9955a', 1.6)).join('') + rect(8, -32, 20, 10, '#fff', 2, 2) + circ(12, -10, 4, '#3a3f55', 0) + circ(24, -10, 4, '#3a3f55', 0) + note(-46, -50, .9) + note(46, -54, .8, '#e6493f') + path('M-50 -20 q-8 -8 0 -16 M-58 -16 q-12 -12 0 -24', 'none', 2.4, 'stroke="#8c96a8"'));
const bus = (x, y, s = 1) => G(x, y, s, rect(-60, -46, 120, 40, '#ffc93c', 3, 8) + [-44, -20, 4].map((xx) => rect(xx, -40, 18, 14, '#bfe8ff', 2.4, 2)).join('') + rect(32, -40, 22, 26, '#bfe8ff', 2.4, 2) + line(-58, -20, 58, -20, O, 2) + path('M-64 -46 Q-60 -64 -30 -60 Q0 -70 30 -60 Q60 -66 64 -46 Q0 -40 -64 -46Z', '#fff', 2.6) + path('M-70 -2 Q-40 -18 0 -10 Q40 -18 70 -2 L70 4 L-70 4Z', '#fff', 2.6));
const car = (x, y, s = 1, c = '#e6493f') => G(x, y, s, rect(-36, -24, 72, 18, c, 3, 6) + path('M-20 -24 L-12 -38 L16 -38 L24 -24Z', c, 3) + path('M-44 -22 Q-30 -52 0 -48 Q32 -54 44 -22 Q0 -16 -44 -22Z', '#fff', 2.6) + path('M-46 2 Q-20 -14 0 -6 Q24 -14 46 2Z', '#fff', 2.6));
const angel = (x, y, s = 1) => G(x, y, s, ell(-36, -64, 40, 20, '#b9cfe6', 0, 'transform="rotate(35 -36 -64)"') + ell(36, -64, 40, 20, '#b9cfe6', 0, 'transform="rotate(-35 36 -64)"') + path('M-18 -40 L18 -40 L42 6 L-42 6Z', '#b9cfe6', 0) + circ(0, -100, 24, '#b9cfe6', 0) + ell(-36, -64, 40, 20, 'none', 2, 'transform="rotate(35 -36 -64)" stroke="#a6bfd9"') + ell(36, -64, 40, 20, 'none', 2, 'transform="rotate(-35 36 -64)" stroke="#a6bfd9"'));
const plank = (x1, y1, x2, y2) => line(x1, y1, x2, y2, O, 13) + line(x1, y1, x2, y2, '#d9a066', 8) + line(x1, y1 - 1, x2, y2 - 1, '#f0c48e', 2.5);
const hooks = (x, y) => rect(x, y, 150, 10, '#9c6a40', 2.6, 3) + [20, 60, 100, 136].map((d) => circ(x + d, y + 18, 4, '#8c96a8', 2)).join('');
const mat = (x, y, w) => rect(x - w / 2, y - 10, w, 16, '#7a5236', 2.6, 4) + path(`M${x - w / 2 + 8} ${y - 2} h${w - 16}`, 'none', 2, 'stroke="#5a3e2b"');
const boot = (x, y, c) => path(`M${x - 8} ${y - 22} h14 v14 h10 q4 0 4 8 h-28Z`, c, 2.6);
const pot = (x, y) => G(x, y, 1, rect(-22, -26, 44, 26, '#8c96a8', 3, 4) + line(-22, -20, -38, -24, O, 4) + ell(0, -26, 22, 5, '#7a4b2a', 2.4) + path('M-8 -32 q-4 -6 0 -12 q4 -6 0 -12 M8 -32 q-4 -6 0 -12', 'none', 2, 'stroke="#c8d3e0"'));
const street = (y) => rect(-5, y, 410, 300 - y, 'url(#gSnow)', 0) + line(-5, y, 405, y, O, 3);

// ---- scenes ----
const winView = (x, y, w, h) => rect(x, y, w, h, '#c3d3e6', 0) + street(y + h - 30) + G(x + 30, y + h - 28, .55, house(0, 0, 1, '#f4c27a', '#d9534f', '#7c4a2d', true)) + pine(x + w - 34, y + h - 26, .5, '#3f8f63', true) + car(x + w / 2 + 10, y + h - 8, .7, '#5aa5ff') + snowflakes(26, 9);
const yard = (y = 200, seed = 1) => winterDay(340) + snowGround(y) + pine(26, y + 8, .75, '#3f8f63', true) + G(330, y + 4, .62, house(0, 0, 1, '#9fc5e8', '#7a5236', '#c0392b', true)) + bareTree(140, y + 6, .7, '#7a5236', true);
const hill = () => winterDay(60) + path('M-5 130 Q150 110 405 250 L405 305 L-5 305Z', 'url(#gSnow)') + path('M-5 200 Q80 190 160 214', 'none', 0) + pine(340, 236, .7, '#3f8f63', true) + pine(380, 250, .6, '#2f7a52', true) + pine(40, 140, .55, '#3f8f63', true) + path('M20 160 Q160 150 380 268', 'none', 3, 'stroke="#c4d8ec"') + path('M30 170 Q170 166 370 280', 'none', 3, 'stroke="#c4d8ec"');

const pages = [
  { // 1 — snow everywhere
    text: "Noah wakes up and looks out the window. Wow! Snow, snow, snow! The cars are white. The trees are white. The street is white. “Ava! Wake up!” says Noah. “Look! It is snowing!” His little sister Ava runs to the window.",
    svg: svg(floorRoom('#d6e6f7', '#b98a5a', 215) + win(130, 28, 160, 120, winView(130, 28, 160, 120)) + rect(-10, 170, 70, 60, '#5dade2', 3, 8) + rect(-10, 160, 40, 18, '#fff', 3, 6) + rect(-10, 190, 76, 14, '#f2c94c', 3, 4) + noah(110, 290, 1, { pj: true, face: 'wow', arms: 'point', R: [[36, -88], [54, -100]] }) + ava(320, 290, 1, { pj: true, face: 'laugh', arms: 'up', legs: 'run' }) + sparkle(300, 60, .8, '#fff')),
  },
  { // 2 — the radio: no school
    text: "In the kitchen, Dad listens to the radio. “There is too much snow,” he says. “The school buses cannot go. There is no school today!” “No school?” says Noah. “Yay! It is a snow day!” Noah and Ava jump and dance.",
    svg: svg(floorRoom('#fdf0d5', '#c9955a', 210) + win(230, 30, 140, 100, rect(230, 30, 140, 100, '#c3d3e6', 0) + street(106) + bus(300, 122, .8) + snowflakes(20, 4)) + rect(0, 150, 150, 60, '#9c6a40', 3, 2) + rect(-4, 142, 158, 12, '#e8c07a', 3, 3) + rect(20, 166, 40, 30, '#7a5236', 2.4, 3) + rect(80, 166, 40, 30, '#7a5236', 2.4, 3) + radio(70, 142) + dad(60, 292, .95, { face: 'happy', arms: 'hips' }) + noah(200, 280, .95, { in: true, face: 'laugh', arms: 'cheer', legs: 'jump' }) + ava(310, 284, .95, { in: true, face: 'laugh', arms: 'cheer', legs: 'jump' }) + heart(255, 170, .7)),
  },
  { // 3 — getting dressed
    text: "Noah and Ava put on their snow pants, their warm coats and their boots. Noah puts on his red toque. Ava puts on her purple toque. Then they put on their scarves and mittens. “Ready?” asks Noah. “Ready!” says Ava. They run outside.",
    svg: svg(floorRoom('#e8f0d9', '#a8774c', 215) + rect(250, 40, 110, 175, '#7a5236', 3, 3) + rect(262, 54, 86, 60, '#c3d3e6', 2.6, 3) + snowflakes(10, 7) + circ(342, 140, 5, '#ffd84d', 2) + hooks(40, 50) + path('M56 70 l0 30 M96 70 q-12 30 4 50', 'none', 0) + rect(48, 70, 24, 44, '#5aa5ff', 2.6, 6) + path('M90 70 h20 l6 50 h-32Z', '#f2c94c', 2.6) + mat(300, 268, 110) + boot(272, 260, '#4a3a2e') + boot(312, 262, '#c0392b') + noah(120, 288, 1, { face: 'grin', arms: 'wave' }) + ava(205, 288, 1, { face: 'laugh', arms: 'up' }) + sparkle(160, 120, .8)),
  },
  { // 4 — snow angels
    text: "First, they make snow angels. They lie down in the soft snow. They move their arms up and down. They move their legs open and shut. Noah gets up and looks. “My angel is big!” he says. Ava laughs. “My angel is small!”",
    svg: svg(winterDay(340) + snowGround(120) + pine(30, 128, .6, '#3f8f63', true) + pine(372, 132, .55, '#2f7a52', true) + G(330, 124, .45, house(0, 0, 1, '#9fc5e8', '#7a5236', '#c0392b', true)) + angel(110, 262, 1.15) + angel(250, 270, .85) + G(250, 270, 1, kid(0, 0, .72, { ...avaOut, face: 'laugh', arms: 'cheer', legs: 'jump' })) + noah(360, 294, .95, { face: 'happy', arms: 'point', R: [[-30, -76], [-50, -82]], L: [[-34, -56], [-38, -42]] }) + snowflakes(14, 22) + sparkle(160, 160, .8)),
  },
  { // 5 — sledding
    text: "Then they go to the big hill with their red sled. Ava sits in the front. Noah sits in the back. One, two, three… Whoosh! The sled goes down the hill, fast, fast, fast! “Again! Again!” shouts Ava.",
    svg: svg(hill() + sled(196, 186, 1, 22, kid(-22, -22, .78, { ...noahOut, legs: 'sit', face: 'laugh', arms: 'cheer' }) + kid(24, -20, .66, { ...avaOut, legs: 'sit', face: 'laugh', arms: 'up' })) + motion(118, 130, 3, 34) + path('M260 238 q14 -14 30 -6 M270 248 q16 -8 28 2', 'none', 3, 'stroke="#fff"') + snowflakes(16, 31) + circ(282, 230, 4, '#fff', 0) + circ(292, 222, 3, '#fff', 0)),
  },
  { // 6 — rolling the balls
    text: "“Now let’s make a snowman,” says Noah. “The biggest snowman on our street!” They roll a big ball of snow for the body. They roll a second ball. Then they roll a third ball for the head. It is very, very big!",
    svg: svg(yard(190) + snowman(90, 284, 1) + path('M250 276 Q320 270 405 280 L405 292 Q320 282 250 290Z', '#c4d8ec', 0) + ball(222, 254, 34) + noah(292, 288, .95, { face: 'grin', arms: 'reach', flip: true }) + ava(350, 288, .95, { face: 'laugh', arms: 'reach', flip: true }) + snowflakes(10, 41)),
  },
  { // 7 — too heavy
    text: "Noah and Ava try to put the head on the snowman. “Push!” says Noah. “Pull!” says Ava. Push! Pull! Push! Pull! The big head does not go up. “It is too heavy!” says Ava. She sits down in the snow. She is sad.",
    svg: svg(yard(190) + snowman(170, 286, 1) + ball(262, 238, 34) + noah(318, 288, .95, { face: 'mad', arms: 'reach', flip: true, legs: 'walk' }) + sweat(352, 150, 1.1) + sweat(286, 186, .8) + ava(60, 292, .95, { face: 'cry', legs: 'sit', arms: 'down' }) + snowflakes(10, 51)),
  },
  { // 8 — Mr. Roy and the long board
    text: "Then they hear a voice. “Hello, kids! Do you need help?” It is Mr. Roy, their old neighbour. He has a grey beard and a red coat. He has a long board in his hands. “I have an idea,” he says with a smile.",
    svg: svg(yard(190) + snowman(110, 286, .95) + ball(196, 262, 30) + noah(60, 292, .8, { face: 'wow' }) + ava(252, 292, .8, { face: 'wow', arms: 'up' }) + plank(286, 210, 405, 204) + roy(325, 292, 1, { face: 'happy', arms: 'carry' }) + sparkle(230, 140, .9) + snowflakes(8, 61)),
  },
  { // 9 — up the ramp!
    text: "Mr. Roy puts the long board on the snowman, like a slide. “Now, all together!” Push! Push! Push! The big head rolls up, up, up the board… and it stops on top! “We did it!” shouts Noah. Mr. Roy laughs.",
    svg: svg(yard(190) + snowman(220, 288, 1, { head: true, arms: true }) + plank(196, 136, 60, 284) + path('M86 236 Q120 196 150 170', 'none', 3, 'stroke="#fff" stroke-dasharray="6 8"') + roy(36, 294, .85, { face: 'laugh', arms: 'cheer' }) + noah(300, 290, .9, { face: 'laugh', arms: 'cheer', legs: 'jump' }) + ava(368, 292, .9, { face: 'laugh', arms: 'cheer' }) + sparkle(220, 70, 1) + sparkle(282, 96, .7) + snowflakes(8, 71)),
  },
  { // 10 — the face
    text: "Now the snowman needs a face. Ava gives him a carrot nose. Noah gives him two black rocks for eyes. Mr. Roy gives him an old green toque and a long blue scarf. It is the biggest snowman on the street!",
    svg: svg(yard(190) + snowman(200, 290, 1.02, { head: true, face: true, hat: '#3fa36b', scarf: '#2e86de', arms: true }) + ava(100, 292, .95, { face: 'laugh', arms: 'cheer' }) + noah(300, 292, .95, { face: 'grin', arms: 'wave' }) + roy(366, 294, .82, { face: 'happy', arms: 'hips' }) + heart(260, 70, .9) + sparkle(130, 80, .9) + snowflakes(10, 81)),
  },
  { // 11 — hot chocolate
    text: "Dad makes hot chocolate. Noah, Ava and Mr. Roy sit at the kitchen window. The hot chocolate is warm and sweet. They look out at their big snowman. “I love snow days!” says Ava. Mr. Roy smiles. “Me too!”",
    svg: svg(floorRoom('#fdf0d5', '#c9955a', 215) + win(120, 24, 170, 120, rect(120, 24, 170, 120, '#ffd7a8', 0) + rect(120, 24, 170, 60, '#f7b9a0', 0) + street(118) + snowman(205, 142, .5, { head: true, face: true, hat: '#3fa36b', scarf: '#2e86de', arms: true }) + pine(150, 126, .4, '#3f8f63', true)) + dad(350, 286, .9, { face: 'happy', arms: 'hold', extra: G(0, -40, .8, pot(0, 0)) }) + noah(100, 290, .9, { in: true, face: 'happy', arms: 'hold', extra: mug(0, -44, 1, '#e6493f') }) + ava(200, 290, .9, { in: true, face: 'laugh', arms: 'hold', extra: mug(0, -44, 1, '#9b59b6') }) + roy(290, 290, .85, { in: true, face: 'grin', arms: 'hold', extra: mug(0, -44, 1, '#3fa36b') }) + table(195, 232, 300) + heart(60, 100, .9) + heart(330, 70, .7)),
  },
];

export const book = {
  id: 'en-snow-day',
  title: 'Snow Day!',
  emoji: '❄️',
  level: 1,
  minutes: 5,
  cover: svg(winterDay(340) + snowGround(196) + pine(30, 204, .8, '#3f8f63', true) + G(330, 200, .6, house(0, 0, 1, '#9fc5e8', '#7a5236', '#c0392b', true)) + snowman(200, 286, .9, { head: true, face: true, hat: '#3fa36b', scarf: '#2e86de', arms: true }) + noah(104, 290, 1, { face: 'laugh', arms: 'cheer', legs: 'jump' }) + ava(296, 290, 1, { face: 'laugh', arms: 'wave' }) + snowflakes(36, 5)),
  pages: pages.map((p) => ({ svg: p.svg, text: p.text })),
  words: [
    { word: 'snow day', emoji: '❄️', def: 'A day with no school because there is too much snow.' },
    { word: 'toque', emoji: '🧢', def: 'A warm knitted hat for winter.' },
    { word: 'mittens', emoji: '🧤', def: 'Warm things for your hands in winter.' },
    { word: 'sled', emoji: '🛷', def: 'A thing you sit on to slide down a snowy hill.' },
    { word: 'snowman', emoji: '⛄', def: 'A big shape of a person made with balls of snow.' },
    { word: 'heavy', emoji: '🏋️', def: 'Very hard to lift or move.' },
    { word: 'neighbour', emoji: '🏡', def: 'A person who lives next to you.' },
    { word: 'hot chocolate', emoji: '☕', def: 'A warm, sweet chocolate drink.' },
  ],
  quiz: [
    { q: 'Why is there no school today?', options: ['There is too much snow', 'It is Saturday', 'The teacher is sick'], answer: 0 },
    { q: 'What do Noah and Ava make first?', options: ['A snowman', 'Snow angels', 'A snow fort'], answer: 1 },
    { q: 'What is the problem with the snowman?', options: ['It is melting', 'The head is too heavy', 'They have no carrot'], answer: 1 },
    { q: 'Who helps the children?', options: ['Dad', 'Mr. Roy, their neighbour', 'A police officer'], answer: 1 },
    { q: 'How does the long board help?', options: ['The head rolls up it, like a slide', 'It is a new sled', 'It is a nose for the snowman'], answer: 0 },
    { q: 'How does Ava feel at the end of the day?', options: ['Sad', 'Scared', 'Happy'], answer: 2 },
  ],
};
