// en-sams-first-day — English storybook, level 1 (see docs/LIVRES.md; pictures use ./art/kit.js)
import { O, SKIN, svg, ell, circ, rect, path, line, G, rnd, shadow, cloud, sun, day, lawn, tree, bush, school, floorRoom, win, table, heart, sparkle, motion, sweat, fg, kid, adult, flower } from './art/kit.js';

// ---- characters ----
// Sam: spiky black hair, orange shirt, blue backpack. Lily: curly brown hair, purple top and skirt. Ms. Gray: grey bun, glasses, teal dress. Mom: long black hair, pink top.
const BAG = '#2e6fd8';
const sam = (x, y, s, o = {}) => (o.bag === false ? '' : G(x, y, s, rect(-27, -80, 54, 46, BAG, 3, 10) + rect(-27, -80, 8, 46, '#1f55ad', 0, 4)))
  + kid(x, y, s, { hs: 'spiky', hair: '#22191a', skin: SKIN.tan, shirt: '#f08a2c', pants: '#3f5a8a', shoes: '#4a4f63', ...o,
    extra: (o.bag === false ? '' : path('M-12 -76 L-14 -42 M12 -76 L14 -42', 'none', 8) + path('M-12 -76 L-14 -42 M12 -76 L14 -42', 'none', 4.5, `stroke="${BAG}"`)) + (o.extra || '') });
const lily = (x, y, s, o = {}) => kid(x, y, s, { hs: 'curly', hair: '#5a2e1a', skin: SKIN.brown, shirt: '#9b59b6', bottom: 'skirt', pants: '#6c3483', shoes: '#c0392b', ...o });
const gray = (x, y, s, o = {}) => adult(x, y, s, { hs: 'bun', hair: '#9aa0aa', skin: SKIN.light, shirt: '#2e8b8b', dress: true, glasses: true, shoes: '#3a3f55', ...o });
const mom = (x, y, s, o = {}) => adult(x, y, s, { hs: 'long', hair: '#22191a', skin: SKIN.tan, shirt: '#e85d75', pants: '#34495e', ...o });

// ---- props ----
const pencil = (x, y, rot = 0, c = '#3fb55f', s = 1) => G(x, y, s, rect(-20, -4, 32, 8, c, 2.2, 1) + rect(-26, -4, 7, 8, '#ff9eb5', 2.2, 2) + path('M12 -4 L22 0 L12 4Z', '#f6d7a7', 2.2) + path('M19 -1.2 L22 0 L19 1.2Z', O, 0), false, rot);
const ruler = (x, y, rot = 0) => G(x, y, 1, rect(-26, -5, 52, 10, '#ffd84d', 2.2, 1) + path(Array.from({ length: 9 }, (_, i) => `M${-22 + i * 5.5} -5 v${i % 2 ? 3 : 5}`).join(''), 'none', 1.4), false, rot);
const eraser = (x, y) => rect(x - 9, y - 6, 18, 10, '#ff9eb5', 2.2, 3) + rect(x + 1, y - 6, 8, 10, '#5aa5ff', 2.2, 2);
const glue = (x, y) => rect(x - 6, y - 18, 12, 18, '#fff', 2.2, 3) + path(`M${x - 4} ${y - 18} L${x} ${y - 26} L${x + 4} ${y - 18}Z`, '#f08a2c', 2) + rect(x - 6, y - 12, 12, 5, '#5aa5ff', 0);
const scissors = (x, y) => G(x, y, 1, circ(-10, 4, 4.5, 'none', 2.6, 'stroke="#e6493f"') + circ(-10, -4, 4.5, 'none', 2.6, 'stroke="#e6493f"') + path('M-6 2 L14 -4 M-6 -2 L14 4', 'none', 2.4, 'stroke="#8c96a8"'));
const lunchbox = (x, y) => rect(x - 9, y, 18, 14, '#e6493f', 2.4, 3) + path(`M${x - 5} ${y} q5 -6 10 0`, 'none', 2.2);
const desk = (x, y, w = 120) => shadow(x, y + 50, w / 2, 5) + rect(x - w / 2 + 8, y + 10, 8, 40, '#8c96a8', 2.4) + rect(x + w / 2 - 16, y + 10, 8, 40, '#8c96a8', 2.4) + rect(x - w / 2 + 4, y + 10, w - 8, 22, '#c9955a', 2.6, 3) + rect(x - w / 2, y, w, 11, '#e8c07a', 3, 3) + rect(x - w / 2 + 4, y + 2, w - 8, 3, '#fff', 0, 0, 'opacity=".45"');
const paper = (x, y, art = '') => G(x, y, 1, path('M-22 -6 L20 -9 L23 4 L-20 6Z', '#fff', 2.2) + art);
const qmark = (x, y, s = 1, c = '#5a6a8a') => G(x, y, s, path('M-6 -8 q0 -9 7 -9 q7 0 7 7 q0 6 -7 8 v5', 'none', 3.4, `stroke="${c}"`) + circ(1, 10, 2.2, c, 0));
const apple = (x, y, r = 6) => circ(x, y, r, '#e6493f', 2) + path(`M${x} ${y - r} q1 -4 4 -5`, 'none', 2) + ell(x + 3, y - r - 2, 3, 1.6, '#3fb55f', 0);
const ball = (x, y, r = 10, c = '#e6493f') => circ(x, y, r, c, 2.6) + path(`M${x - r} ${y} Q${x} ${y - r * .5} ${x + r} ${y} M${x} ${y - r} Q${x - r * .5} ${y} ${x} ${y + r}`, 'none', 1.6, 'opacity=".6"') + circ(x - r * .35, y - r * .35, r * .25, '#fff', 0, 'opacity=".5"');
const thought = (x, y, w, h, content) => circ(x - w / 2 + 6, y + h / 2 + 14, 4, '#fff', 2) + circ(x - w / 2 + 14, y + h / 2 + 4, 6, '#fff', 2) + rect(x - w / 2, y - h / 2, w, h, '#fff', 2.6, h / 2) + content;
// classroom wall: green board with chalk shapes, clock, colour strip
const board = (art = '') => rect(56, 26, 288, 112, '#a0703f', 3, 6) + rect(64, 34, 272, 96, '#2f5d50', 2, 3) + path('M70 120 L330 120', 'none', 0) + rect(64, 124, 272, 6, '#a0703f', 0) + art;
const chalk = (d) => path(d, 'none', 2.6, 'stroke="#f2f6f0"');
const clock = (x, y) => circ(x, y, 15, '#fff') + line(x, y, x, y - 9, O, 2.4) + line(x, y, x + 7, y, O, 2.4) + circ(x, y, 1.8, O, 0);
const strip = () => ['#e6493f', '#f08a2c', '#ffd84d', '#3fb55f', '#5aa5ff', '#9b59b6'].map((c, i) => rect(14 + i * 64, 150, 44, 22, c, 2, 4) + circ(36 + i * 64, 161, 5, '#fff', 0, 'opacity=".7"')).join('');
const classroom = (art = '') => floorRoom('#fbefc9', '#c79a68', 205) + board(art) + clock(370, 40) + strip() + rect(8, 40, 36, 92, '#bfe8ff', 3, 3) + line(26, 40, 26, 132) + path('M12 60 q8 -10 14 0 M30 88 q6 -8 10 0', 'none', 0);

// ---- outdoor bits ----
const swings = (x, y) => G(x, y, 1, line(-50, 0, -40, -90, '#d9534f', 6) + line(50, 0, 40, -90, '#d9534f', 6) + line(-44, -90, 44, -90, '#d9534f', 7) + line(-50, 0, -40, -90, O, 1.5, 'opacity="0"') + line(-20, -88, -20, -30, O, 2) + line(0, -88, 0, -30, O, 2) + rect(-26, -32, 32, 7, '#ffd84d', 2.4, 3) + line(20, -88, 20, -36, O, 2) + line(36, -88, 36, -36, O, 2) + rect(16, -38, 24, 7, '#5aa5ff', 2.4, 3));
const slide = (x, y) => G(x, y, 1, line(-40, 0, -40, -80, O, 5) + line(-20, 0, -20, -80, O, 5) + [-62, -44, -26, -8].map((yy) => line(-40, yy, -20, yy, O, 3)).join('') + rect(-46, -86, 32, 8, '#3fb55f', 3, 3) + path('M-16 -84 Q20 -70 30 -20 Q36 -2 56 0 L56 8 Q28 8 20 -16 Q10 -62 -16 -74Z', '#ffd84d', 3));
const hallFloor = () => rect(0, 220, 400, 80, '#d8d2c4', 0) + Array.from({ length: 9 }, (_, i) => line(i * 50 - 20, 220, i * 70 - 120, 300, '#b5ad9c', 2)).join('') + line(0, 250, 400, 250, '#b5ad9c', 2) + line(0, 220, 400, 220, O, 3);

const star = (x, y, r) => path(`M${x} ${y - r} L${x + r * .3} ${y - r * .3} L${x + r} ${y} L${x + r * .3} ${y + r * .3} L${x} ${y + r} L${x - r * .3} ${y + r * .3} L${x - r} ${y} L${x - r * .3} ${y - r * .3}Z`, '#ffd84d', 2);
const sky = (a, b) => `<defs><linearGradient id="gWs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="300" fill="url(#gWs)" stroke="none"/>`;

const pages = [
  { // 1 — school, Mom hugs scared Sam
    text: "This is Sam. Today is his first day at a new school. The school is very big. Sam has a blue backpack and a red lunch box. “I am scared, Mom,” says Sam. “You can do it,” says Mom. She gives him a big hug.",
    svg: svg(day(60) + lawn(212) + tree(36, 214, .8) + school(230, 212, .92) + bush(370, 216, .8) + path('M200 212 L232 212 L262 300 L170 300Z', '#e8dcc0', 2) + sam(172, 286, .95, { face: 'worried', extra: lunchbox(-28, -42) }) + mom(250, 286, 1, { face: 'smile', L: [[-40, -60], [-60, -52]], R: [[30, -56], [32, -40]] }) + heart(212, 150, .9) + fg()),
  },
  { // 2 — lost in the hall
    text: "Sam goes inside. The hall is long. There are many doors: a red door, a yellow door and a green door. “Where is my class?” says Sam. He looks left. He looks right. He feels very small. Where is room seven?",
    svg: svg(rect(0, 0, 400, 220, '#f3e6c8', 0) + rect(0, 120, 400, 6, '#d9c39a', 0) + [[50, '#e6493f'], [200, '#ffd84d'], [350, '#3fb55f']].map(([x, c]) => rect(x - 32, 70, 64, 150, '#fff', 3, 3) + rect(x - 26, 76, 52, 144, c, 3, 2) + rect(x - 16, 88, 32, 30, '#bfe8ff', 2.6, 2) + circ(x + 16, 156, 3.5, '#ffd84d', 2) + rect(x - 10, 50, 20, 14, '#fff', 2.4, 3) + circ(x, 57, 3.5, c, 0)).join('') + [110, 140, 260, 290].map((x) => rect(x - 13, 92, 26, 128, '#7fb2e5', 2.6, 2) + line(x - 6, 104, x + 6, 104, O, 2) + line(x - 6, 110, x + 6, 110, O, 2) + rect(x + 6, 150, 3, 12, O, 0)).join('') + hallFloor() + sam(200, 284, .95, { face: 'worried', arms: 'think' }) + qmark(150, 120, 1.3) + qmark(258, 112, 1.1) + qmark(280, 150, .9)),
  },
  { // 3 — Ms. Gray welcomes Sam at room 7
    text: "A teacher comes to Sam. She has grey hair and big glasses. “Hello! I am Ms. Gray. Are you Sam?” “Yes,” says Sam. “Welcome to room seven!” says Ms. Gray. She smiles. Sam smiles a little bit too.",
    svg: svg(rect(0, 0, 400, 220, '#f3e6c8', 0) + rect(0, 120, 400, 6, '#d9c39a', 0) + rect(78, 60, 104, 160, '#fff', 3, 3) + rect(86, 68, 88, 152, '#fbefc9', 2) + rect(96, 84, 68, 36, '#2f5d50', 2.4, 2) + chalk('M106 108 L116 94 L126 108Z M140 100 a7 7 0 1 0 0.1 0') + rect(98, 160, 30, 6, '#e8c07a', 2) + rect(132, 160, 30, 6, '#e8c07a', 2) + path('M182 68 L222 58 L222 228 L182 220Z', '#3fb55f', 3) + rect(110, 40, 40, 16, '#fff', 2.4, 3) + circ(122, 48, 3, '#3fb55f', 0) + circ(138, 48, 3, '#3fb55f', 0) + [300, 340].map((x) => rect(x - 13, 92, 26, 128, '#7fb2e5', 2.6, 2) + line(x - 6, 104, x + 6, 104, O, 2)).join('') + hallFloor() + gray(150, 290, 1.08, { face: 'happy', arms: 'wave' }) + sam(268, 288, .9, { face: 'smile' }) + sparkle(218, 120, .7) + sparkle(332, 70, .9)),
  },
  { // 4 — no pencil!
    text: "Sam sits at a desk. Ms. Gray says, “Take out your pencil, please.” Sam opens his backpack. “I have a ruler. I have an eraser. I have glue and scissors… but I have no pencil!” Oh no! Sam feels sad.",
    svg: svg(classroom(chalk('M90 110 L110 70 L130 110Z M170 90 a18 18 0 1 0 0.1 0 M210 72 h34 v34 h-34Z M270 108 l10 -30 l10 30 l-26 -18 h32Z')) + gray(345, 270, .92, { face: 'smile', arms: 'point', R: [[36, -88], [32, -110]] }) + sam(170, 298, 1, { face: 'sad', bag: false }) + desk(170, 244, 150) + ruler(122, 238, -4) + eraser(160, 240) + glue(190, 244) + scissors(220, 240) + G(70, 250, 1, rect(-24, -40, 48, 44, BAG, 3, 10) + rect(-20, -46, 40, 10, '#1f55ad', 2.6, 4) + rect(-12, -18, 24, 14, '#1f55ad', 2.4, 4)) + thought(88, 120, 70, 44, pencil(88, 120, -10, '#3fb55f', 1.1) + path('M68 102 L108 138 M108 102 L68 138', 'none', 5, 'stroke="#e6493f"'))),
  },
  { // 5 — Lily gives a green pencil
    text: "A girl sits next to Sam. She has curly hair and a purple shirt. “Hi! I am Lily,” she says. “I have two pencils. Here is my green pencil.” “Thank you!” says Sam. Green is his favourite colour!",
    svg: svg(classroom(chalk('M100 100 a14 14 0 1 0 0.1 0 M150 104 h28 M164 90 v28 M210 100 a14 14 0 1 0 0.1 0 M250 98 h22 M250 106 h22 M300 84 l-10 30 h20')) + sam(118, 298, 1, { face: 'wow', bag: false, R: [[34, -74], [52, -78]] }) + lily(282, 298, 1, { face: 'happy', L: [[-34, -74], [-56, -78]] }) + pencil(204, 216, 0, '#3fb55f', 1.15) + desk(118, 244, 120) + desk(282, 244, 120) + pencil(310, 242, -5, '#5aa5ff') + sparkle(204, 192, .8) + heart(70, 186, .7, '#3fb55f')),
  },
  { // 6 — working together
    text: "Sam and Lily work together. They count: one, two, three, four, five apples. They draw a big yellow sun. Ms. Gray looks at their work. “Very good!” she says. Sam is not scared now. He is happy.",
    svg: svg(classroom([0, 1, 2, 3, 4].map((i) => G(110 + i * 45, 82, 1, circ(0, 0, 14, 'none', 2.6, 'stroke="#ff8a8a"') + path('M0 -14 q2 -6 6 -8', 'none', 2.4, 'stroke="#9be09b"'))).join('')) + sam(120, 298, 1, { face: 'laugh', bag: false, arms: 'cheer' }) + lily(262, 298, 1, { face: 'happy', arms: 'hold' }) + gray(352, 280, .92, { face: 'happy', arms: 'up', R: [[34, -92], [40, -110]], L: [[-30, -56], [-32, -40]] }) + desk(120, 244, 130) + desk(262, 244, 130) + paper(110, 240, circ(-6, -1, 5, '#ffd84d', 1.6) + path('M-6 -10 v-3 M-6 8 v3 M-15 -1 h-3 M3 -1 h3', 'none', 1.4, 'stroke="#f7b733"') + apple(12, 0, 3.2)) + paper(262, 240, [0, 1, 2, 3, 4].map((i) => apple(-14 + i * 7, 0, 3)).join('')) + pencil(146, 238, 10, '#3fb55f', .8) + star(206, 170, 9) + sparkle(380, 120, .8)),
  },
  { // 7 — recess tag
    text: "Ding, ding! It is recess. Sam and Lily run outside to the playground. “Let’s play tag!” says Lily. “You’re it!” Sam runs and runs. He touches Lily. “Now YOU are it!” he laughs. Then they play on the slide.",
    svg: svg(day(340) + lawn(200) + G(60, 200, .45, school(0, 0, 1)) + swings(150, 206) + slide(310, 214) + tree(388, 210, .7) + sam(140, 286, .95, { face: 'laugh', bag: false, legs: 'run', R: [[38, -76], [62, -80]] }) + lily(230, 284, .95, { face: 'laugh', legs: 'run', arms: 'cheer' }) + motion(108, 200, 3, 26) + motion(196, 206, 3, 22) + fg()),
  },
  { // 8 — the gym
    text: "After recess, the class goes to the gym. The gym is very big. There are red balls and blue balls. Lily throws a ball to Sam. “Catch!” she says. Sam catches the ball. “Good catch, Sam!” says Ms. Gray.",
    svg: svg(rect(0, 0, 400, 200, '#cfe3f5', 0) + Array.from({ length: 8 }, (_, i) => rect(i * 52, 0, 4, 200, '#b5cde4', 0)).join('') + rect(0, 150, 400, 50, '#e7d6a8', 0) + rect(170, 40, 60, 40, '#fff', 3, 2) + rect(188, 58, 24, 16, 'none', 2.4) + ell(200, 86, 20, 5, 'none', 3, 'stroke="#e6493f"') + path('M182 88 L188 110 L200 92 L212 110 L218 88', 'none', 1.8, 'stroke="#fff"') + line(200, 0, 200, 40, O, 3) + rect(0, 200, 400, 100, '#e3b779', 0) + Array.from({ length: 6 }, (_, i) => line(i * 80, 200, i * 80 - 30, 300, '#c9955a', 1.6)).join('') + line(0, 200, 400, 200, O, 3) + ell(200, 250, 90, 22, 'none', 3, 'stroke="#e6493f"') + line(0, 284, 400, 284, '#5aa5ff', 3) + [[40, 280, '#e6493f'], [64, 284, '#5aa5ff'], [370, 282, '#e6493f'], [352, 288, '#5aa5ff']].map(([a, b, c]) => ball(a, b, 11, c)).join('') + sam(120, 282, .95, { face: 'wow', bag: false, arms: 'up' }) + ball(130, 152, 13, '#e6493f') + motion(160, 140, 3, 26, -1) + lily(250, 282, .95, { face: 'happy', arms: 'reach', L: [[-30, -86], [-44, -100]] }) + gray(352, 280, .82, { face: 'grin', arms: 'cheer' })),
  },
  { // 9 — the library
    text: "Then the class goes to the library. It is quiet in the library. Shh! Sam finds a book about dogs. Lily finds a book about cats. They sit on a soft carpet and read together. “I like dogs,” says Sam.",
    svg: svg(rect(0, 0, 400, 210, '#efe2c7', 0) + [0, 1].map((k) => G(30 + k * 220, 20, 1, rect(0, 0, 150, 180, '#9c6a40', 3, 3) + [0, 1, 2].map((r) => rect(8, 10 + r * 56, 134, 48, '#6f4829', 2) + Array.from({ length: 11 }, (_, i) => { const h = 30 + Math.round(rnd(i + r * 11 + k * 40) * 14); return rect(12 + i * 12, 56 + r * 56 - h, 10, h, ['#e6493f', '#ffd84d', '#5aa5ff', '#3fb55f', '#9b59b6', '#f08a2c'][Math.floor(rnd(i + r * 7 + k * 3) * 6)], 1.6, 1); }).join('')).join(''))).join('') + rect(0, 210, 400, 90, '#c79a68', 0) + line(0, 210, 400, 210, O, 3) + ell(200, 266, 170, 32, '#e85d75', 3) + ell(200, 266, 140, 22, '#f597a8', 0) + sam(140, 280, .9, { face: 'happy', bag: false, legs: 'sit', arms: 'hold', extra: G(0, -50, 1, rect(-18, -14, 36, 26, '#ffd84d', 2.4, 2) + line(0, -14, 0, 12, O, 2) + ell(-9, 0, 5, 4, '#c98f5c', 1.4) + ell(-12, -4, 2, 3, '#8a5a3b', 0)) }) + lily(260, 280, .9, { face: 'smile', legs: 'sit', arms: 'hold', extra: G(0, -50, 1, rect(-18, -14, 36, 26, '#5aa5ff', 2.4, 2) + line(0, -14, 0, 12, O, 2) + circ(10, 0, 4.5, '#f0a64a', 1.4) + path('M6 -4 l1 -4 l3 3 M14 -4 l-1 -4 l-3 3', 'none', 1.4)) })),
  },
  { // 10 — home: a new friend
    text: "After school, Sam runs home. Mom gives him an apple and some milk. “How is your new school?” she asks. Sam smiles a big smile. “I have a ruler. I have an eraser. I have a green pencil… and I have a new friend!”",
    svg: svg(floorRoom('#e6f2d8', '#c9955a', 210) + win(40, 40, 110, 90, sky('#8ccff2', '#eaf8ff') + circ(70, 70, 10, '#ffd84d', 2) + tree(120, 140, .7)) + rect(250, 30, 110, 80, '#fff', 3, 3) + rect(258, 38, 94, 64, '#fdf6e3', 0) + circ(282, 66, 12, '#ffd84d', 2) + [[316, '#f08a2c', '#22191a'], [338, '#9b59b6', '#5a2e1a']].map(([x, c, h]) => circ(x, 62, 7, h, 2) + circ(x, 66, 6, '#f1c19a', 2) + path(`M${x - 3} 67 q3 3 6 0`, 'none', 1.6) + path(`M${x} 72 v14 M${x - 8} 78 h16 M${x} 86 l-5 10 M${x} 86 l5 10`, 'none', 2.6, `stroke="${c}"`)).join('') + path('M262 98 h86', 'none', 3, 'stroke="#3fb55f"') + mom(110, 282, 1, { face: 'happy', arms: 'hips' }) + sam(240, 286, .95, { face: 'laugh', bag: false, arms: 'cheer', R: [[36, -92], [44, -108]], extra: '' }) + pencil(284, 158, -60, '#3fb55f', 1) + table(330, 228, 120) + apple(310, 220, 9) + rect(338, 204, 18, 24, '#fff', 2.4, 3) + rect(338, 210, 18, 6, '#5aa5ff', 0) + heart(178, 120, 1) + heart(300, 110, .7) + sparkle(205, 80, .8)),
  },
];
export const book = {
  id: 'en-sams-first-day',
  title: 'Sam’s First Day',
  emoji: '🎒',
  level: 1,
  minutes: 5,
  cover: svg(day(330) + lawn(210) + tree(40, 212, .9) + school(205, 210, .95) + tree(372, 214, .8, '#7cc46a') + flower(120, 250) + flower(300, 262, '#ffd84d') + flower(340, 244, '#5aa5ff') + sam(160, 288, 1.05, { face: 'grin', arms: 'wave' }) + lily(250, 288, 1.0, { face: 'laugh', arms: 'wave', R: [[30, -56], [32, -40]], L: [[-34, -84], [-38, -106]] }) + fg()),
  pages: pages.map((p) => ({ svg: p.svg, text: p.text })),
  words: [
    { word: 'backpack', emoji: '🎒', def: 'A bag you carry on your back. You put school things in it.' },
    { word: 'pencil', emoji: '✏️', def: 'A thin stick you use to write and draw.' },
    { word: 'eraser', emoji: '🧽', def: 'A small soft thing that takes away pencil marks.' },
    { word: 'ruler', emoji: '📏', def: 'A long flat stick with numbers. It helps you draw straight lines.' },
    { word: 'recess', emoji: '🛝', def: 'Play time outside at school.' },
    { word: 'gym', emoji: '🏀', def: 'A big room at school where you run and play games.' },
    { word: 'library', emoji: '📚', def: 'A quiet room with many books to read.' },
    { word: 'scared', emoji: '😟', def: 'When you feel afraid.' },
  ],
  quiz: [
    { q: 'How does Sam feel at the start of the story?', options: ['Scared', 'Angry', 'Sleepy'], answer: 0 },
    { q: 'What is the problem in the classroom?', options: ['Sam has no ruler', 'Sam has no pencil', 'Sam has no desk'], answer: 1 },
    { q: 'What colour is Lily’s pencil?', options: ['Red', 'Blue', 'Green', 'Yellow'], answer: 2 },
    { q: 'What game do Sam and Lily play at recess?', options: ['Hockey', 'Tag', 'Hide-and-seek'], answer: 1 },
    { q: 'Why is it quiet in the library?', options: ['People read there', 'Nobody is at school', 'It is night'], answer: 0 },
    { q: 'How does Sam feel at the end of the day?', options: ['Sad, because he has no friends', 'Happy, because he has a new friend', 'Scared, because the school is big'], answer: 1 },
  ],
};
