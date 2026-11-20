// en-the-lost-mitten — English storybook, level 1 (see docs/LIVRES.md; pictures use ./art/kit.js)
import { O, SKIN, svg, ell, circ, rect, path, line, G, rnd, shadow, winterDay, greyDay, snowGround, snowflakes, pine, bareTree, house, school, floorRoom, win, kid, adult, dog, heart, sparkle, motion, note, mug } from './art/kit.js';

// ---- characters ----
// Mia: red coat, yellow toque with red pom, blue scarf, red mittens. `bare` = local [x, y] of the hand without a mitten.
const MIA = { coat: '#e6493f', hat: '#f2c94c', pom: '#e6493f', scarf: '#4a90d9', mitts: '#e6493f', hs: 'long', hair: '#7a4a2a', pants: '#34507e', shoes: '#2f3b55' };
const mia = (x, y, s, o = {}) => kid(x, y, s, { ...MIA, ...o }) + (o.bare ? circ(+(x + o.bare[0] * s).toFixed(1), +(y + o.bare[1] * s).toFixed(1), +(6.4 * s).toFixed(1), SKIN.peach, 2.5) : '');
// Leo: little brother, green coat, blue toque, blue mittens
const LEO = { coat: '#3fb55f', hat: '#4a90d9', pom: '#fff', mitts: '#4a90d9', hs: 'short', hair: '#7a4a2a', pants: '#5a4a8a', shoes: '#2f3b55' };
const leo = (x, y, s, o = {}) => kid(x, y, s * .82, { ...LEO, ...o });
const dad = (x, y, s, o = {}) => adult(x, y, s, { hs: 'short', hair: '#4a3220', beard: '#4a3220', shirt: '#3d6f9e', stripe: '#5d8fbe', pants: '#4a4a55', shoes: '#3a2a20', skin: SKIN.light, ...o });
const patel = (x, y, s, o = {}) => adult(x, y, s, { skin: SKIN.tan, hs: 'long', hair: '#2a1d14', coat: '#8e44ad', hat: '#f78fb3', pom: '#fff', mitts: '#f78fb3', pants: '#3a3f55', shoes: '#2f3b55', ...o });
const grandma = (x, y, s, o = {}) => adult(x, y, s, { hs: 'bun', hair: '#d4d4dc', glasses: true, shirt: '#2e9e8e', dress: true, skin: SKIN.light, shoes: '#7a4a2a', ...o });
const pepper = (x, y, s, o = {}) => dog(x, y, s, { c: '#e0a96d', p: '#a86b3c', k: '#4a90d9', ...o });

// ---- props ----
const mitten = (x, y, s = 1, c = '#e6493f', rot = 0) => G(x, y, s, ell(-11, -2, 4.6, 7.5, c, 2.5, 'transform="rotate(-25 -11 -2)"') + path('M-9 10 L-10 -6 Q-10 -17 0 -17 Q10 -17 10 -6 L9 10Z', c, 2.5) + path('M-4 -12 q4 -3 8 0', 'none', 1.6, 'stroke="#fff" opacity=".6"') + rect(-11, 8, 22, 7, '#fff', 2.5, 3), false, rot);
const flakes = (seed = 1, n = 34) => snowflakes(n, seed);
const steps = (x, y) => [0, 1, 2, 3, 4].map((i) => ell(x + i * 26, y - (i % 2) * 8, 6, 3.5, '#b9cde3', 0)).join('');
const fort = (x, y, s = 1) => G(x, y, s, shadow(0, 2, 80, 8) + path('M-72 0 Q-74 -74 0 -76 Q74 -74 72 0Z', 'url(#gSnow)') + path('M-66 -24 Q0 -32 66 -24 M-56 -50 Q0 -58 56 -50 M-30 -2 L-34 -24 M24 -24 L20 -50 M-20 -50 L-16 -72 M44 -2 L46 -24 M-50 -26 L-46 -50', 'none', 2, 'stroke="#a9c1d9"') + path('M-24 0 Q-24 -40 0 -40 Q24 -40 24 0Z', '#5f7d9c') + path('M-16 0 Q-16 -30 0 -30 Q16 -30 16 0Z', '#4b6886', 0));
const shovel = (x, y, s = 1, rot = 0, c = '#e6493f') => G(x, y, s, line(0, -70, 0, 0, O, 7) + line(0, -70, 0, 0, '#c98f5c', 3.5) + rect(-8, -78, 16, 7, '#3a3f55', 0, 3) + path('M-14 0 L14 0 L12 22 Q0 26 -12 22Z', c), false, rot);
const slide = (x, y, s = 1) => G(x, y, s, shadow(10, 0, 90, 7) + line(-60, 0, -60, -110, O, 9) + line(-60, 0, -60, -110, '#4a90d9', 5) + line(-30, 0, -30, -110, O, 9) + line(-30, 0, -30, -110, '#4a90d9', 5) + [0, 1, 2, 3, 4].map((i) => line(-60, -18 - i * 20, -30, -18 - i * 20, O, 4)).join('') + rect(-66, -118, 46, 10, '#f2c94c', 3, 3) + path('M-22 -118 Q30 -110 46 -40 Q54 -8 90 -4 L90 8 Q44 8 34 -36 Q20 -96 -22 -104Z', '#e6493f') + path('M-20 -116 Q26 -112 40 -60', 'none', 3, 'stroke="#fff" opacity=".7"') + path('M-68 -120 Q-44 -130 -18 -120Z M-20 -118 Q20 -124 40 -90 Q20 -112 -20 -114Z', '#fff', 2));
const steps3 = (x, y, w = 110) => rect(x - w / 2, y - 18, w, 18, '#b8a89a') + rect(x - w / 2 + 10, y - 34, w - 20, 16, '#c9bbae') + rect(x - w / 2 + 20, y - 48, w - 40, 14, '#d8ccc0') + path(`M${x - w / 2} ${y - 18} q${w / 2} -6 ${w} 0`, 'none', 4, 'stroke="#fff"');
const boot = (x, y, s = 1, c = '#2f3b55', rot = 0) => G(x, y, s, path('M-8 -26 L8 -26 L8 0 L20 2 Q24 10 18 12 L-8 12Z', c) + rect(-10, -30, 20, 7, '#d8d8e0', 2.5, 3), false, rot);
const sock = (x, y, s = 1) => ell(x, y, 8 * s, 9 * s, '#f2f2f6', 2.5) + path(`M${x - 6 * s} ${y - 2 * s} h${12 * s} M${x - 6 * s} ${y + 3 * s} h${12 * s}`, 'none', 2, 'stroke="#e6493f"');
const bed = (x, y, s = 1, front = true) => G(x, y, s, front ? path('M-62 -14 Q-64 6 -50 8 L50 8 Q64 6 62 -14 Q58 -2 0 -2 Q-58 -2 -62 -14Z', '#8e5bb5') + path('M-56 -6 q56 8 112 0', 'none', 2, 'stroke="#c6a0e6"') : shadow(0, 8, 70, 8) + ell(0, -16, 64, 20, '#6e3f99') + ell(0, -14, 50, 12, '#c6a0e6', 0));
const armchair = (x, y, s = 1, c = '#d9534f') => G(x, y, s, shadow(0, 0, 70, 7) + rect(-56, -110, 112, 90, c, 3, 18) + rect(-50, -40, 100, 26, c, 3, 8) + rect(-68, -70, 22, 64, c, 3, 9) + rect(46, -70, 22, 64, c, 3, 9) + rect(-46, -6, 8, 8, '#7a4a2a') + rect(38, -6, 8, 8, '#7a4a2a') + path('M-40 -96 q40 -10 80 0', 'none', 2, 'stroke="#fff" opacity=".35"'));
const yarn = (x, y, r = 12, c = '#e6493f') => circ(x, y, r, c) + path(`M${x - r + 3} ${y - 3} q${r} -8 ${r * 2 - 6} 4 M${x - r + 4} ${y + 5} q${r} -6 ${r * 2 - 8} 2 M${x - 4} ${y - r + 2} q6 ${r} 0 ${r * 2 - 4}`, 'none', 1.6, 'stroke="#a8302a"');
const knit = G(0, -50, 1, line(-16, -24, -2, 4, '#c8c8d0', 3) + line(16, -24, 2, 4, '#c8c8d0', 3) + rect(-12, -10, 24, 16, '#e6493f', 2.5, 3) + path('M-8 -6 v8 M-3 -6 v8 M2 -6 v8 M7 -6 v8', 'none', 1.4, 'stroke="#a8302a"'));
const sweater = (x, y, s = 1, flip = false) => G(x, y, s, path('M-26 -46 Q-4 -54 20 -46 L22 -20 Q-2 -12 -26 -20Z', '#e6493f', 2.5) + path('M-20 -44 v22 M-12 -46 v26 M-4 -48 v28 M4 -48 v28 M12 -46 v26', 'none', 1.4, 'stroke="#a8302a"') + rect(-28, -24, 52, 6, '#fff', 2, 3), flip);
const bark = (x, y, s = 1) => G(x, y, s, path('M0 -8 l10 -6 M2 0 l12 0 M0 8 l10 6', 'none', 3, 'stroke="#5a6a8a"'));
const winterView = (x, y, w, h) => rect(x, y, w, h, '#cfe8fa', 0) + ell(x + w / 2, y + h, w * .8, h * .35, '#fff', 0) + pine(x + w * .25, y + h * .9, .35, '#3f8f63', true) + pine(x + w * .75, y + h * .85, .28, '#3f8f63', true) + snowflakes(26, 9);
const street = (y = 205, seed = 1) => winterDay(345) + snowGround(y) + pine(30, y + 6, .75, '#3f8f63', true) + bareTree(375, y + 4, .8, '#7a5236', true) + flakes(seed);
const paw = (x, y, s = 1) => G(x, y, s, ell(0, 4, 7, 6, '#a86b3c', 0) + circ(-7, -5, 3, '#a86b3c', 0) + circ(0, -8, 3, '#a86b3c', 0) + circ(7, -5, 3, '#a86b3c', 0));
const thought = (x, y, inner) => circ(x - 34, y + 40, 4, '#fff', 2) + circ(x - 24, y + 28, 7, '#fff', 2) + ell(x, y, 30, 22, '#fff', 2.5) + inner;
const qmark = (x, y, s = 1) => G(x, y, s, path('M-6 -8 Q-6 -16 0 -16 Q7 -16 7 -9 Q7 -3 0 0 L0 5', 'none', 3.4) + circ(0, 11, 2, O, 0));

export const book = {
  id: 'en-the-lost-mitten',
  title: 'The Lost Mitten',
  emoji: '🧤',
  level: 1,
  minutes: 5,
  cover: svg(street(205, 4) + house(320, 208, .8, '#f4c27a', '#d9534f', '#7c4a2d', true) + steps(40, 268)
    + mia(170, 282, 1.1, { face: 'wow', arms: 'wave', bare: [-28, -40], extra: mitten(38, -114, 1.1) })
    + pepper(300, 286, 1.1, { flip: true }) + mitten(250, 248, .85, '#e6493f', -70) + sparkle(250, 224, .7)),
  pages: [
    {
      text: 'This is Mia. Mia lives in Canada. It is winter, and the snow is soft and white. Mia has a red coat, a yellow toque and a blue scarf. She has two red mittens too. They are her favourite mittens!',
      svg: svg(street(205, 1) + school(110, 210, .62, true) + house(330, 208, .7, '#9fd3a0', '#4a78b8', '#7c4a2d', true) + steps(150, 262)
        + mia(240, 285, 1.1, { face: 'happy', arms: 'wave', legs: 'walk' }) + heart(300, 150, .9) + heart(318, 128, .6)),
    },
    {
      text: 'Mia walks home from school. She makes a snow angel. She throws a snowball. She slides down the big hill. “Wheee!” Then she looks at her hands. One hand is red. One hand is pink and cold. “Oh no! Where is my mitten?”',
      svg: svg(winterDay(60) + path('M-5 210 Q120 120 260 160 Q330 180 405 150 L405 300 L-5 300Z', 'url(#gSnow)') + path('M-5 210 Q120 120 260 160 Q330 180 405 150', 'none', 3)
        + pine(330, 168, .7, '#3f8f63', true) + pine(375, 160, .55, '#2f7a52', true)
        + G(90, 248, 1, path('M-12 -24 Q-50 -44 -44 -10 Q-36 4 -14 -4 L-22 26 Q-12 32 -4 22 L0 10 L4 22 Q12 32 22 26 L14 -4 Q36 4 44 -10 Q50 -44 12 -24Z', '#c4d8ec', 0) + circ(0, -34, 12, '#c4d8ec', 0)) + circ(72, 200, 9, '#fff') + circ(54, 206, 7, '#fff') + circ(62, 192, 6, '#fff')
        + mia(235, 282, 1.1, { face: 'worried', L: [[-30, -60], [-36, -84]], bare: [-36, -84] }) + qmark(195, 140, 1.4) + flakes(2)),
    },
    {
      text: 'Mia runs into the house. “Dad! Dad! I have only one mitten!” Dad is in the kitchen. “Is it in your pocket?” asks Dad. Mia looks in her pocket. No, it is not in her pocket. Pepper the dog wags his tail.',
      svg: svg(floorRoom('#fbe7c6', '#c98f5c', 215) + win(160, 34, 90, 66, winterView(160, 34, 90, 66))
        + rect(280, 120, 120, 95, '#eef2f6') + rect(280, 112, 120, 10, '#c98f5c') + line(340, 120, 340, 215) + circ(330, 168, 3, O, 0) + circ(350, 168, 3, O, 0) + rect(300, 92, 22, 20, '#f2c94c', 2.5, 3) + mug(360, 112, 1)
        + rect(10, 70, 60, 145, '#e6eef5') + line(10, 130, 70, 130) + rect(60, 90, 5, 26, '#8a8f99', 0) + rect(60, 140, 5, 30, '#8a8f99', 0)
        + dad(320, 285, 1.1, { face: 'smile', arms: 'think' }) + mia(170, 285, 1.08, { face: 'worried', arms: 'wave', bare: [-28, -40], extra: mitten(38, -114, 1) })
        + pepper(80, 288, .9) + motion(36, 240, 3, 16, 1)),
    },
    {
      text: 'Mia asks her little brother, Leo. “Leo, do you have my red mitten?” Leo shakes his head. “No. I have my blue mittens. Let’s look outside!” Mia and Leo put on their boots. Pepper wants to come too. “Woof! Woof!”',
      svg: svg(street(205, 3) + house(95, 212, 1.05, '#f4c27a', '#d9534f', '#7c4a2d', true) + steps(240, 278)
        + mia(210, 285, 1.08, { face: 'smile', arms: 'down', bare: [-28, -40] }) + leo(300, 285, 1.2, { face: 'happy', arms: 'cheer' }) + path('M272 140 q-8 -6 0 -12 M328 140 q8 -6 0 -12', 'none', 2.5, 'stroke="#5a6a8a"')
        + pepper(110, 290, .9) + bark(170, 238, 1)),
    },
    {
      text: '“Is it in the snow fort?” asks Leo. Mia looks in the snow fort. She sees a shovel. She sees a ball. She sees a lot of snow. But she does not see a red mitten. “No! It is not in the snow fort.”',
      svg: svg(street(200, 5) + fort(250, 262, 1.25) + circ(250, 258, 10, '#4a90d9', 2.5) + path('M242 252 q8 -4 16 0', 'none', 1.8, 'stroke="#fff"') + shovel(345, 272, .9, 18)
        + mia(120, 285, 1.04, { face: 'sad', arms: 'hips', bare: [-18, -46] }) + leo(40, 285, 1.05, { face: 'worried', arms: 'point' })),
    },
    {
      text: '“Is it under the slide?” asks Mia. They run to the park. Leo looks under the slide. He finds a hat, but it is green. He finds a stick. But he does not find a red mitten. “No! It is not under the slide.”',
      svg: svg(street(200, 6) + slide(200, 250, 1.1) + line(250, 262, 300, 252, '#7a5236', 5)
        + leo(215, 280, 1.1, { face: 'wow', arms: 'hold', extra: G(0, -52, 1, path('M-16 6 Q-16 -14 0 -14 Q16 -14 16 6Z', '#3fb55f') + rect(-18, 2, 36, 7, '#fff', 2, 3) + circ(0, -16, 5, '#fff', 2)) })
        + mia(330, 285, 1.04, { face: 'sad', arms: 'down', bare: [-28, -40] })),
    },
    {
      text: 'Mrs. Patel is next door. She has a big shovel. “Hello, Mrs. Patel! Did you see a red mitten?” asks Mia. Mrs. Patel looks and looks. “I see a lot of snow, but no red mitten. Sorry, Mia!”',
      svg: svg(street(205, 7) + house(300, 210, .95, '#bfa0d8', '#5a4a8a', '#7c4a2d', true) + rect(-5, 236, 410, 22, '#d6e2ee', 0) + line(-5, 236, 405, 236, '#b9cde3', 2) + path('M240 230 q20 -18 40 0Z', '#fff', 2)
        + shovel(304, 290, .95, 8, '#f2c94c') + patel(270, 290, 1, { face: 'smile', arms: 'down' })
        + mia(110, 290, 1.08, { face: 'happy', arms: 'wave', bare: [-28, -40] }) + leo(30, 292, 1, { face: 'smile' })),
    },
    {
      text: 'Mia is sad. She sits on the steps. “Is it in my boot?” She takes off her boot. Only a cold foot! “I am tired,” says Mia. Then she looks around. Pepper is not outside now. Where is Pepper?',
      svg: svg(greyDay() + snowGround(205) + house(200, 220, 1.6, '#f4c27a', '#d9534f', '#7c4a2d', true) + steps3(200, 282, 160)
        + mia(170, 262, 1.04, { face: 'sad', legs: 'sit', arms: 'down', bare: [-28, -18] }) + boot(232, 246, .9) + sock(170 + 16 * 1.04, 262 - 6 * 1.04, 1.04)
        + thought(300, 110, paw(300, 110, 1.4) + qmark(322, 104, .8)) + flakes(8, 20)),
    },
    {
      text: 'Mia goes inside. She looks in Pepper’s bed. Ha! Pepper is asleep on the red mitten! “Pepper! You have my mitten!” Pepper opens one eye. The mitten is soft and warm. Mia laughs and laughs. “You are cold too, Pepper!”',
      svg: svg(floorRoom('#e6f0f8', '#c98f5c', 205) + win(40, 40, 86, 64, winterView(40, 40, 86, 64)) + rect(250, 60, 70, 50, '#fff', 3, 3) + rect(258, 68, 54, 34, '#f4c27a', 0) + circ(285, 82, 9, '#e6493f', 0)
        + bed(250, 278, 1.3, false) + pepper(258, 288, 1, { face: 'sleepy', tail: 'down' }) + bed(250, 278, 1.3, true) + mitten(214, 266, 1.35, '#e6493f', -70) + path('M222 254 q8 -4 10 4', 'none', 2.5)
        + path('M296 210 q4 -4 8 0', 'none', 2) + mia(110, 285, 1.1, { face: 'laugh', arms: 'point', bare: [-28, -40] }) + note(330, 200, .9) + path('M330 170 h10 l-10 10 h10', 'none', 2.4, 'stroke="#5a6a8a"')),
    },
    {
      text: 'Grandma has an idea. She takes red wool and knits and knits. On Sunday, Pepper has a little red sweater! Now Mia has two red mittens, and Pepper has a red sweater too. “Woof!” says Pepper. Everyone is warm and happy.',
      svg: svg(floorRoom('#f3e6d0', '#b9875a', 210) + win(155, 34, 90, 66, winterView(155, 34, 90, 66)) + ell(220, 262, 150, 24, '#7fb3d9', 0, 'opacity=".55"')
        + armchair(85, 270, 1) + grandma(85, 262, 1, { face: 'happy', legs: 'sit', arms: 'hold', extra: knit }) + yarn(150, 266, 12)
        + mia(250, 282, 1.08, { face: 'laugh', arms: 'cheer' }) + pepper(340, 288, .95, { flip: true }) + sweater(340, 288, .95, true) + heart(300, 150, .9) + heart(200, 120, .7)),
    },
  ],
  words: [
    { word: 'mitten', emoji: '🧤', def: 'A warm cover for your hand. Your thumb has its own place.' },
    { word: 'toque', emoji: '🧢', def: 'A warm winter hat. In Canada we say toque.' },
    { word: 'scarf', emoji: '🧣', def: 'A long, warm piece of cloth you put around your neck.' },
    { word: 'snow fort', emoji: '🏰', def: 'A little house that kids make with snow.' },
    { word: 'slide', emoji: '🛝', def: 'Something in the park. You go up and slide down.' },
    { word: 'boot', emoji: '🥾', def: 'A big shoe for snow and rain.' },
    { word: 'knit', emoji: '🧶', def: 'To make clothes with wool and two long needles.' },
    { word: 'neighbour', emoji: '🏠', def: 'A person who lives next to your house.' },
  ],
  quiz: [
    { q: 'What colour are Mia’s mittens?', options: ['Blue', 'Red', 'Green', 'Yellow'], answer: 1 },
    { q: 'What does Leo find under the slide?', options: ['A red mitten', 'A green hat', 'A blue ball'], answer: 1 },
    { q: 'Who is Leo?', options: ['Mia’s dad', 'Mia’s little brother', 'Mia’s neighbour'], answer: 1 },
    { q: 'Where is the red mitten?', options: ['In the snow fort', 'In Mia’s boot', 'In Pepper’s bed'], answer: 2 },
    { q: 'Why does Pepper sleep on the mitten?', options: ['It is soft and warm', 'It is his toy', 'It is wet'], answer: 0 },
    { q: 'How does Mia feel at the end?', options: ['Sad', 'Happy', 'Tired'], answer: 1 },
  ],
};
