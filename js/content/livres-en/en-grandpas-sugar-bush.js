// en-grandpas-sugar-bush — English storybook, level 3 (see docs/LIVRES.md). Pictures use ./art/kit.js.
import { O, SKIN, svg, vg, sky, ell, circ, rect, path, line, G, rnd, shadow, cloud, sun, star, stars, moon, bareTree, pine, snowGround, snowflakes, greyDay, heart, sparkle, sweat, kid, adult, mug } from './art/kit.js';

// plaid for Grandpa's jacket (pattern ids are safe: every picture is an isolated image)
const PLAID = '<defs><pattern id="pPl" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#c0392b"/><rect y="5" width="14" height="4" fill="#8e2a20"/><rect x="5" width="4" height="14" fill="#8e2a20" opacity=".7"/><rect y="11" width="14" height="1.5" fill="#2a2a2a" opacity=".5"/><rect x="11" width="1.5" height="14" fill="#2a2a2a" opacity=".5"/></pattern>'
  + '<linearGradient id="gMet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8eef5"/><stop offset=".5" stop-color="#bfcbd8"/><stop offset="1" stop-color="#8d9cae"/></linearGradient>'
  + '<linearGradient id="gSyr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3b54a"/><stop offset="1" stop-color="#b8661c"/></linearGradient>'
  + '<radialGradient id="gFire" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#fff2a0"/><stop offset=".5" stop-color="#ff9b3d"/><stop offset="1" stop-color="#d9432f"/></radialGradient></defs>';
const S = (b) => svg(PLAID + b);

// ---- characters ----
const elodie = (x, y, s = 1, o = {}) => kid(x, y, s, { hs: 'pigtails', hair: '#6b4329', skin: SKIN.light, coat: '#26a69a', hat: '#ff7aa8', pom: '#fff', scarf: '#f2c94c', mitts: '#f2c94c', pants: '#3f5a8a', shoes: '#7a4b2a', ...o });
const grandpa = (x, y, s = 1, o = {}) => adult(x, y, s, { hs: 'bald', hair: '#e8e8e8', skin: SKIN.peach, beard: '#f4f4f4', coat: 'url(#pPl)', hat: '#2e6b4a', hatBand: '#e8e8e8', pom: '#2e6b4a', pants: '#5a4a3a', shoes: '#3a2a1a', glasses: true, ...o });
const mom = (x, y, s = 1, o = {}) => adult(x, y, s, { hs: 'bob', hair: '#3a2a1a', skin: SKIN.light, coat: '#8e44ad', hat: '#f2c94c', pom: '#fff', mitts: '#fff', pants: '#2f3e5c', ...o });
const dad = (x, y, s = 1, o = {}) => adult(x, y, s, { hs: 'short', hair: '#6b4329', skin: SKIN.light, coat: '#2c6fbb', hat: '#e6493f', pom: '#fff', mitts: '#e6493f', pants: '#3a3a4a', ...o });
const sam = (x, y, s = 1, o = {}) => kid(x, y, s, { hs: 'short', hair: '#2a1d14', skin: SKIN.brown, coat: '#e67e22', hat: '#2ecc71', pom: '#fff', mitts: '#2ecc71', pants: '#34495e', ...o });
const rosie = (x, y, s = 1, o = {}) => kid(x, y, s, { hs: 'long', hair: '#2a1d14', skin: SKIN.brown, coat: '#f78fb3', hat: '#9b59b6', pom: '#fff', mitts: '#9b59b6', pants: '#5a3e7a', ...o });

// ---- props ----
// a bucket hanging on a spile; (x, y) = where the spile enters the trunk
const bucket = (x, y, s = 1, { open = false, drops = 0, full = false, flip = false } = {}) => G(x, y, s,
  line(0, 0, 10, 4, '#7d8a99', 4) + line(0, 0, 10, 4, '#c8d3e0', 2)
  + path('M-2 6 L24 6 L21 36 L1 36Z', 'url(#gMet)') + line(3, 14, 21, 14, '#8d9cae', 1.5) + line(2, 26, 22, 26, '#8d9cae', 1.5)
  + (full ? ell(11, 9, 12, 2.5, '#d8eef8', 1.5) : '')
  + (open ? path('M-4 5 L22 -14 L26 -10 L0 7Z', '#9aa9bd', 2.5) : path('M-6 6 L11 -4 L28 6Z', '#9aa9bd', 2.5))
  + Array.from({ length: drops }, (_, i) => path(`M11 ${8 + i * 8} q-3 4 0 6 q3 -2 0 -6Z`, '#bfe6ff', 1.4)).join(''), flip);
// big maple trunk in the foreground (top goes off the picture)
const trunk = (x, y, w = 46, tap = true, o = {}) => {
  const bark = Array.from({ length: 7 }, (_, i) => { const xx = x - w / 2 + 6 + rnd(i + x) * (w - 12); const y0 = 10 + rnd(i + 9) * (y - 90); return path(`M${xx.toFixed(0)} ${y0.toFixed(0)} q-3 18 1 36 q3 14 -1 28`, 'none', 2, 'stroke="#5e4029"'); }).join('');
  return shadow(x, y + 2, w * .9, 6) + path(`M${x - w / 2} -5 L${x - w / 2 - 4} ${y - 8} Q${x - w / 2 - 14} ${y} ${x - w / 2 - 16} ${y + 4} L${x + w / 2 + 16} ${y + 4} Q${x + w / 2 + 14} ${y} ${x + w / 2 + 4} ${y - 8} L${x + w / 2} -5Z`, '#7a5236') + rect(x + w / 6, 0, w / 3, y - 6, '#000', 0, 0, 'opacity=".12"') + bark + path(`M${x - w / 2 - 14} ${y + 2} Q${x} ${y - 12} ${x + w / 2 + 14} ${y + 2}`, '#fff', 0, 'opacity=".9"')
    + (tap ? bucket(x + 4, y - 80, 1.2, o) : '');
};
const maples = (y = 196, seed = 1, n = 6, sc = .75) => Array.from({ length: n }, (_, i) => bareTree(Math.round(20 + i * (360 / (n - 1)) + (rnd(i + seed) - .5) * 30), y + Math.round(rnd(i + seed + 7) * 8), sc * (.8 + rnd(i + seed + 3) * .4), '#6e4a30', true)).join('');
const tinyBucket = (x, y) => rect(x - 4, y, 8, 9, '#c8d3e0', 1.5, 1);
const steamPuff = (x, y, s = 1, op = .85) => G(x, y, s, `<g fill="#fff" stroke="none" opacity="${Math.max(op, .8)}"><circle cx="0" cy="0" r="14"/><circle cx="14" cy="-6" r="12"/><circle cx="-12" cy="-8" r="10"/><circle cx="4" cy="-16" r="11"/></g>`);
const shack = (x, y, s = 1, { steam = false, drip = false, waveDoor = false } = {}) => G(x, y, s,
  shadow(0, 0, 100, 8) + rect(-80, -80, 160, 80, 'url(#gWood)') + Array.from({ length: 9 }, (_, i) => line(-80 + i * 20, -78, -80 + i * 20, -2, '#7a4f2e', 1.6)).join('')
  + path('M-96 -76 L0 -130 L96 -76Z', '#8b3a2e') + path('M-96 -76 L0 -130 L96 -76 L86 -80 Q40 -98 0 -122 Q-40 -98 -86 -80Z', '#fff', 2)
  + rect(-20, -152, 40, 26, '#a8764f') + path('M-28 -150 L0 -166 L28 -150Z', '#8b3a2e') + Array.from({ length: 3 }, (_, i) => line(-12 + i * 12, -148, -12 + i * 12, -130, '#5e4029', 3)).join('')
  + rect(-60, -58, 34, 28, '#ffe9a8') + line(-43, -58, -43, -30) + line(-60, -44, -26, -44)
  + rect(14, -54, 40, 54, '#6b4329', 3, 3) + circ(46, -27, 2.5, '#ffd84d', 0)
  + (drip ? Array.from({ length: 8 }, (_, i) => path(`M${-86 + i * 22} -78 l4 ${10 + (i % 3) * 5} l4 ${-10 - (i % 3) * 5}Z`, '#d7f1ff', 1.5) + path(`M${-82 + i * 22} ${-60 + (i % 3) * 5} q-2 3 0 5 q2 -2 0 -5Z`, '#9fdcff', 1.2)).join('') : '')
  + (steam ? steamPuff(0, -172, 1.1) + steamPuff(18, -200, 1.3, .7) + steamPuff(-6, -232, 1.5, .5) : ''));
const sled = (x, y, s = 1) => G(x, y, s, path('M-58 0 L50 0 Q66 0 66 -14', 'none', 4) + rect(-54, -14, 104, 10, '#c0392b', 3, 3) + line(-40, -4, -40, 0) + line(30, -4, 30, 0)
  + rect(-40, -58, 70, 44, '#8a5a3b', 3, 8) + line(-40, -44, 30, -44, '#5e4029', 3) + line(-40, -28, 30, -28, '#5e4029', 3) + ell(-5, -58, 35, 6, '#7a4f2e') + ell(-5, -58, 26, 3.5, '#d8eef8', 0) + path('M66 -14 L90 -40', 'none', 4));
const stove = (x, y, s = 1) => G(x, y, s, rect(-40, -60, 80, 60, '#3a3f55', 3, 6) + rect(-24, -44, 48, 30, 'url(#gFire)', 3, 4) + line(-24, -29, 24, -29, O, 2) + rect(-10, -150, 20, 90, '#4a5068') + rect(-46, -66, 92, 10, '#4a5068', 3, 3));
const bottle = (x, y, s = 1) => G(x, y, s, path('M-8 0 L8 0 L8 -22 Q8 -28 3 -32 L3 -40 L-3 -40 L-3 -32 Q-8 -28 -8 -22Z', 'url(#gSyr)', 2.5) + rect(-4, -46, 8, 7, '#c0392b', 2, 1) + path('M-4 -22 Q-4 -10 -2 -4', 'none', 2, 'stroke="#fff" opacity=".6"') + G(0, -14, .35, path('M0 -14 L4 -6 L12 -8 L8 0 L14 6 L4 6 L2 14 L-2 14 L-4 6 L-14 6 L-8 0 L-12 -8 L-4 -6Z', '#c0392b', 0)));
const snowfg = () => path('M-5 300 L-5 276 Q40 262 90 280 Q120 290 140 300Z M260 300 Q300 270 350 276 Q380 280 405 270 L405 300Z', '#fff', 2.5);
const woodWall = () => rect(0, 0, 400, 300, '#b07c4e', 0) + Array.from({ length: 11 }, (_, i) => line(0, i * 24, 400, i * 24, '#8a5a36', 2)).join('') + Array.from({ length: 12 }, (_, i) => line(Math.round(rnd(i + 3) * 400), (i % 10) * 24, Math.round(rnd(i + 3) * 400), (i % 10) * 24 + 24, '#8a5a36', 2)).join('');
const plankFloor = (y = 240) => rect(0, y, 400, 300 - y, '#8a5a36', 0) + Array.from({ length: 3 }, (_, i) => line(0, y + 18 + i * 18, 400, y + 18 + i * 18, '#6b4329', 2)).join('') + line(0, y, 400, y, O, 3);
const outdoor = (snow = false) => winterSky() + snowGround(196) + maples(198, 4, 7, .7) + (snow ? snowflakes(45, 2) : '');
const winterSky = () => sky('#9fd3f4', '#f1f9ff') + cloud(90, 50) + cloud(250, 34, .8);

const cover = S(winterSky() + sun(215, 42, 20) + snowGround(196) + maples(198, 11, 6, .7) + shack(300, 214, .7, { steam: true }) + trunk(70, 270, 50, true, { drops: 2 }) + grandpa(205, 282, 1.05, { face: 'happy', arms: 'wave' }) + elodie(140, 284, 1.05, { face: 'laugh', arms: 'cheer', legs: 'jump' }) + snowfg());

export const book = {
  id: 'en-grandpas-sugar-bush',
  title: 'Grandpa’s Sugar Bush',
  emoji: '🍁',
  level: 3,
  minutes: 10,
  cover,
  pages: [
    { text: 'Every spring, Elodie visited Grandpa at his sugar bush. A sugar bush is a forest full of maple trees. There was still snow on the ground, and the air was cold and fresh. Grandpa waved from the door of his little sugar shack. “Welcome, my helper!” he called. “This year, you are big enough to tap the trees with me.” Elodie jumped up and down in her snow boots. She could not wait to make maple syrup!',
      svg: S(winterSky() + sun(60, 48, 18) + snowGround(196) + maples(198, 2, 7, .72) + shack(275, 222, .85) + grandpa(292, 226, .78, { face: 'laugh', arms: 'wave' }) + elodie(120, 280, 1.05, { face: 'laugh', arms: 'cheer', legs: 'jump' }) + snowfg()) },
    { text: 'First, Grandpa showed her how to tap a tree. He drilled a small hole in the trunk, not too deep. “Does it hurt the tree?” asked Elodie. “No, it is a tiny hole, and the tree will heal,” said Grandpa. Then Elodie tapped a little metal spout into the hole. It was called a spile. Finally, they hung a shiny bucket under it, with a lid to keep out the snow.',
      svg: S(winterSky() + snowGround(196) + maples(198, 6, 6, .7) + trunk(200, 268, 64, true, { open: true })
        + grandpa(290, 284, 1.1, { face: 'smile', arms: 'reach', L: [[-40, -76], [-60, -84]], extra: G(-66, -86, 1, rect(-30, -4, 34, 8, '#9aa9bd', 2.5, 2) + rect(2, -8, 10, 16, '#c0392b', 2.5, 3) + path('M12 0 h10 v-14', 'none', 3)) })
        + elodie(110, 286, 1, { face: 'wow', arms: 'hold', extra: G(0, -50, 1, line(-6, -4, 10, 4, '#7d8a99', 4)) }) + sparkle(222, 176, .6) + snowfg()) },
    { text: 'They worked all morning. Tap, tap, tap! Elodie and Grandpa hung buckets on thirty trees. Her cheeks were red and her nose was cold, but she was proud. Then she ran back to the first tree and lifted the lid. The bucket was empty. Not one drop! “Grandpa, it’s broken!” she cried. “Nothing is coming out!” She looked inside again, but the bucket was still empty.',
      svg: S(greyDay() + snowGround(196) + Array.from({ length: 6 }, (_, i) => bareTree(30 + i * 68, 200 + (i % 2) * 6, .7, '#6e4a30', true) + tinyBucket(33 + i * 68, 172 + (i % 2) * 6)).join('') + trunk(170, 268, 60, true, { open: true }) + elodie(250, 286, 1.08, { face: 'cry', arms: 'reach', R: [[38, -60], [50, -52]] }) + grandpa(352, 236, .62, { face: 'smile', arms: 'hold' }) + snowfg()) },
    { text: 'Grandpa laughed softly and knelt down beside her. “The tree is not broken. It is just too cold today,” he explained. “Sap is the sweet water inside the tree. It only runs when the nights are cold and the days are warm. When the sun warms the trunk, the sap starts to move.” Elodie looked up at the grey sky. “So we have to wait?” she asked. “Yes,” said Grandpa. “We have to wait.”',
      svg: S(greyDay() + snowGround(196) + maples(198, 9, 6, .7) + trunk(60, 262, 52, true)
        + G(250, 70, 1, ell(0, 0, 92, 50, '#fff', 3) + `<clipPath id="bb"><ellipse cx="0" cy="0" rx="88" ry="46"/></clipPath><g clip-path="url(#bb)">${rect(-92, -50, 92, 100, '#2b3570', 0)}${rect(0, -50, 92, 100, '#bfe6ff', 0)}${moon(-48, -10, 14)}${star(-20, -26, 4)}${star(-70, 18, 3)}${star(-26, 22, 3)}${sun(46, -6, 13)}</g>${line(0, -46, 0, 46, O, 2.5)}` + path('M-6 24 q-6 9 0 13 q6 -4 0 -13Z', '#9fdcff', 2))
        + circ(228, 134, 7, '#fff', 2.5) + circ(220, 150, 4.5, '#fff', 2.5)
        + grandpa(200, 284, 1.1, { face: 'smile', legs: 'sit', arms: 'point', R: [[36, -70], [44, -96]] }) + elodie(120, 286, 1.02, { face: 'worried', arms: 'down' }) + snowfg()) },
    { text: 'Waiting was hard. On Monday, Elodie checked the buckets. Empty. On Tuesday, it snowed, and she checked again. Still empty. On Wednesday, she put her ear against a tree to listen, but she heard nothing at all. “Trees are so slow!” she grumbled, and she kicked a pile of snow. Grandpa smiled and gave her a cup of hot chocolate. “Good things take time,” he said.',
      svg: S(sky('#b8c4d4', '#e8edf3') + cloud(80, 46, 1.2, '#eef1f5') + cloud(300, 40, 1.1, '#eef1f5') + snowGround(196) + maples(198, 14, 6, .7) + trunk(62, 262, 52, true, { open: true })
        + elodie(170, 284, 1.05, { face: 'mad', arms: 'hips', legs: 'run' }) + Array.from({ length: 9 }, (_, i) => circ(Math.round(196 + rnd(i) * 40), Math.round(240 + rnd(i + 9) * 30), 3 + rnd(i + 4) * 3, '#fff', 1.5)).join('')
        + grandpa(310, 284, 1.08, { face: 'smile', arms: 'point', R: [[36, -70], [-10, -40]], L: [[-34, -56], [-50, -64]], extra: mug(-52, -58, 1.2, '#e6493f') }) + snowflakes(40, 7) + snowfg()) },
    { text: 'Then, on Thursday, something changed. The night was freezing, but in the morning the sun came out, big and warm. Water dripped from the roof of the sugar shack. The snow became soft and slushy. Elodie ran into the forest and stopped. She heard a tiny sound. Plink… plink… plink! She lifted a lid. Clear drops were falling into the bucket. “Grandpa! The sap is running!” she shouted.',
      svg: S(sky('#7cc6f2', '#eaf8ff') + sun(70, 52, 26) + snowGround(196) + maples(198, 21, 5, .7) + shack(320, 214, .72, { drip: true }) + trunk(150, 270, 62, true, { open: true, drops: 3 })
        + elodie(250, 286, 1.08, { face: 'wow', arms: 'cheer', legs: 'jump' }) + sparkle(205, 140, .7, '#9fdcff') + sparkle(120, 160, .5, '#9fdcff') + snowfg()) },
    { text: 'Elodie dipped her finger in the sap and tasted it. It looked like water, but it was a little bit sweet. All day, the buckets filled up, drip by drip. In the afternoon, Grandpa pulled a big sled with a barrel on it. They poured the sap from the buckets into the barrel. It was heavy work! Splash! Some sap spilled on Elodie’s boots, and they both laughed.',
      svg: S(sky('#7cc6f2', '#eaf8ff') + sun(340, 50, 20) + snowGround(196) + maples(198, 25, 6, .7) + sled(170, 262, 1)
        + grandpa(300, 282, 1.05, { face: 'laugh', arms: 'reach', L: [[-36, -64], [-42, -56]] }) + line(258, 226, 260, 220, O, 3)
        + elodie(90, 284, 1.05, { face: 'laugh', arms: 'carry', extra: G(0, -60, 1, path('M-4 4 L22 4 L19 30 L-1 30Z', 'url(#gMet)', 2.5)) })
        + path('M112 216 q22 -16 36 4', 'none', 5, 'stroke="#d8eef8"') + Array.from({ length: 6 }, (_, i) => path(`M${70 + i * 9} ${272 + (i % 2) * 4} q-3 5 0 7 q3 -2 0 -7Z`, '#bfe6ff', 1.4)).join('') + snowfg()) },
    { text: 'Next, they pulled the barrel to the sugar shack. Inside, a big fire was burning under a long metal pan. Grandpa poured the sap into the pan, and soon it began to bubble. Clouds of steam floated up and out of the roof. The whole shack smelled sweet, like candy. “Now we boil it for a long, long time,” said Grandpa. “The water goes away, and the sugar stays.”',
      svg: S(woodWall() + plankFloor(240) + rect(80, 186, 240, 60, '#a33b2b') + Array.from({ length: 3 }, (_, r) => Array.from({ length: 8 }, (_, i) => rect(80 + i * 30 + (r % 2) * 15, 186 + r * 20, 30, 20, 'none', 1.5, 0, 'stroke="#6e2a1e"')).join('')).join('') + path('M80 186 L80 246 L320 246 L320 186', 'none', 3)
        + path('M150 246 L150 222 Q175 200 200 222 L200 246Z', 'url(#gFire)', 3) + path('M162 246 q6 -18 12 -6 q4 -14 10 0 q6 -12 8 6Z', '#fff2a0', 0)
        + rect(70, 168, 260, 20, '#c8d3e0', 3, 3) + ell(200, 170, 124, 4, '#e8b04c', 0) + Array.from({ length: 10 }, (_, i) => circ(90 + i * 24, 168 + (i % 2), 3, '#fff2c8', 1.2)).join('')
        + steamPuff(120, 150, 1.2) + steamPuff(200, 126, 1.5, .75) + steamPuff(280, 146, 1.2) + steamPuff(200, 70, 1.8, .45)
        + grandpa(352, 290, .95, { face: 'happy', arms: 'reach', L: [[-36, -88], [-50, -104]], extra: G(-52, -104, 1, path('M-20 -10 L6 -10 L4 14 L-18 14Z', 'url(#gMet)', 2.5) + path('M-20 -8 q-10 4 -12 18', 'none', 4, 'stroke="#d8eef8"')) })
        + elodie(46, 290, .95, { face: 'wow', arms: 'down' })) },
    { text: 'They boiled the sap for hours. Elodie added wood to the fire and stirred with a long spoon. Slowly, the sap turned golden, then a warm brown colour. Grandpa held up a big pail and a tiny bottle. “Guess what? It takes forty litres of sap to make just one litre of syrup,” he said. Elodie’s eyes opened wide. “Forty litres for one little bottle? Wow! No wonder syrup is so special!”',
      svg: S(woodWall() + plankFloor(240) + Array.from({ length: 40 }, (_, i) => G(28 + (i % 10) * 15, 100 + Math.floor(i / 10) * 20, .55, path('M-8 0 L8 0 L6 -16 L-6 -16Z', 'url(#gMet)', 2))).join('') + path('M180 120 L210 120', 'none', 5) + path('M204 112 L216 120 L204 128', 'none', 5) + bottle(240, 132, 1.2)
        + grandpa(300, 292, 1.05, { face: 'happy', arms: 'reach', L: [[-34, -78], [-44, -94]], R: [[38, -78], [48, -94]], extra: G(-46, -96, 1, path('M-14 -2 L14 -2 L11 26 L-11 26Z', 'url(#gMet)', 2.5) + path('M-14 -2 q14 -16 28 0', 'none', 2)) + G(48, -84, 1, bottle(0, 0, .55)) })
        + elodie(130, 292, 1.05, { face: 'wow', arms: 'cheer' }) + sparkle(250, 70, .7)) },
    { text: 'On Saturday, the whole family came to the sugar bush: Mom, Dad, and Elodie’s cousins, Sam and Rosie. Grandpa heated some syrup until it was very thick. Then he poured long golden lines of it on clean, fresh snow. Elodie showed her cousins what to do. “Wait a few seconds, then roll it up on your stick,” she said. Mmm! The maple taffy was sticky, chewy and delicious.',
      svg: (() => {
        const stickT = G(10, -50, 1, line(0, 0, 8, -34, '#d9b382', 3) + ell(8, -36, 6, 8, 'url(#gSyr)', 2));
        const trough = rect(60, 252, 280, 34, 'url(#gWood)', 3, 4) + rect(66, 244, 268, 14, '#fff', 2, 6) + Array.from({ length: 9 }, (_, i) => path(`M${78 + i * 28} 249 q6 -3 12 0 q6 3 10 0`, 'none', 4, 'stroke="#d98a2c"')).join('');
        return S(winterSky() + sun(340, 48, 18) + snowGround(196) + maples(198, 31, 6, .66) + shack(330, 200, .55, { steam: true })
          + mom(40, 228, .7, { face: 'happy', arms: 'wave' }) + dad(372, 228, .7, { face: 'laugh', arms: 'wave' })
          + grandpa(205, 250, .8, { face: 'happy', arms: 'reach', L: [[-34, -62], [-40, -54]], extra: G(-40, -54, 1, path('M-10 -12 L8 -12 L6 6 L-8 6Z', '#c8d3e0', 2) + path('M-10 -4 q-8 10 -6 26', 'none', 4, 'stroke="#e8a33c"')) })
          + elodie(110, 270, .85, { face: 'laugh', arms: 'hold', extra: stickT }) + sam(290, 270, .82, { face: 'grin', arms: 'hold', extra: stickT }) + rosie(345, 272, .8, { face: 'laugh', arms: 'hold', extra: stickT }) + trough + heart(372, 196, .8));
      })() },
    { text: 'That evening, Elodie sat by the warm stove with her own little bottle of syrup. She held it up to the light. It was the colour of the setting sun. “Grandpa,” she said, “I almost gave up. But waiting made it taste even better.” Grandpa gave her a big hug. “That is the secret of the sugar bush,” he said. “Good things take patience.” Elodie smiled. Next spring, she would be ready.',
      svg: S(woodWall() + plankFloor(240) + rect(214, 40, 150, 96, '#fff', 3, 4) + vg('gSet', '#f6a35c', '#7d4fa0') + rect(222, 48, 134, 80, 'url(#gSet)', 0) + circ(290, 110, 18, '#ffd84d', 0) + path('M222 128 L250 104 L270 118 L300 96 L330 116 L356 104 L356 128Z', '#3f5a6b', 0) + rect(222, 48, 134, 80, 'none', 3) + line(289, 48, 289, 128, O, 4)
        + circ(90, 190, 90, 'url(#gLamp)', 0) + stove(90, 250, 1) + ell(250, 270, 110, 14, '#c0392b', 0, 'opacity=".7"')
        + grandpa(290, 286, 1.08, { face: 'happy', legs: 'sit', arms: 'reach', L: [[-34, -60], [-56, -64]] })
        + elodie(220, 288, 1.05, { face: 'happy', legs: 'sit', arms: 'reach', L: [[-26, -56], [-28, -42]], R: [[30, -86], [34, -110]], hat: false, scarf: false, mitts: false, extra: G(34, -112, 1, bottle(0, 6, .8)) })
        + heart(250, 60, .7) + heart(190, 80, .5)) },
  ],
  words: [
    { word: 'sugar bush', emoji: '🌳', def: 'A forest of maple trees where people make maple syrup.' },
    { word: 'sap', emoji: '💧', def: 'The clear, sweet water that comes out of a maple tree in spring.' },
    { word: 'spile', emoji: '🔩', def: 'A small metal spout you put in a tree so the sap can drip out.' },
    { word: 'bucket', emoji: '🪣', def: 'An open container with a handle, for carrying water or sap.' },
    { word: 'boil', emoji: '♨️', def: 'To heat a liquid until it bubbles and makes steam.' },
    { word: 'steam', emoji: '☁️', def: 'The white cloud that comes from very hot water.' },
    { word: 'maple taffy', emoji: '🍭', def: 'Hot, thick syrup poured on snow and rolled on a stick.' },
    { word: 'patience', emoji: '⏳', def: 'Being able to wait calmly for something.' },
  ],
  quiz: [
    { q: 'Why did nothing come out of the trees on the first day?', options: ['The buckets had holes', 'It was too cold', 'The trees were too small', 'Grandpa forgot the spiles'], answer: 1 },
    { q: 'When does the sap run?', options: ['When nights are cold and days are warm', 'Only at night', 'When it rains a lot', 'In the summer'], answer: 0 },
    { q: 'How did Elodie feel when she kicked the snow?', options: ['Happy and calm', 'Sleepy', 'Impatient and grumpy', 'Scared'], answer: 2 },
    { q: 'What happened right after the sap started to run?', options: ['They ate maple taffy', 'They poured the sap into a barrel on a sled', 'Grandpa drilled the holes', 'It snowed again'], answer: 1 },
    { q: 'How many litres of sap make one litre of syrup?', options: ['Four', 'Ten', 'Forty', 'One hundred'], answer: 2 },
    { q: 'What did Elodie learn at the sugar bush?', options: ['Trees are broken in winter', 'Good things take patience', 'Syrup is easy to make', 'Buckets are heavy'], answer: 1 },
  ],
};
