// en-camping-at-loon-lake — English storybook, level 3 (see docs/LIVRES.md). Pictures use ./art/kit.js.
import { O, SKIN, svg, vg, ell, circ, rect, path, line, poly, G, rnd, shadow, cloud, sun, star, stars, moon, pine, tufts, flower, heart, sparkle, sweat, zzz, motion, kid, adult } from './art/kit.js';

// ---- family: Mom (red-brown ponytail, teal shirt), Dad (black beard, orange shirt), Jacob (spiky hair, striped blue shirt), Mila (small, pigtails, yellow) ----
const mom = (x, y, s = 1, o = {}) => adult(x, y, s, { hs: 'ponytail', hair: '#a0522d', skin: SKIN.tan, shirt: '#2a9d8f', pants: '#3d5a80', shoes: '#5a3e2b', ...o });
const dad = (x, y, s = 1, o = {}) => adult(x, y, s, { hs: 'short', hair: '#2a1d14', skin: SKIN.tan, beard: '#2a1d14', shirt: '#e76f51', pants: '#6a6a42', shoes: '#4a3424', ...o });
const jacob = (x, y, s = 1, o = {}) => kid(x, y, s, { hs: 'spiky', hair: '#2a1d14', skin: SKIN.tan, shirt: '#4a90d9', stripe: '#fff', bottom: 'shorts', pants: '#3f5a8a', shoes: '#e6493f', ...o });
const mila = (x, y, s = 1, o = {}) => kid(x, y, s * .82, { hs: 'pigtails', hair: '#2a1d14', skin: SKIN.tan, shirt: '#ffd166', bottom: 'skirt', pants: '#f78fb3', shoes: '#9b59b6', ...o });
const PJ = { jacob: { shirt: '#5b6fc7', stripe: '#8fa0ea', bottom: 'pants', pants: '#5b6fc7', shoes: '#5b6fc7' }, mila: { shirt: '#f4a6c6', stripe: '#ffffff', bottom: 'pants', pants: '#f4a6c6', shoes: '#f4a6c6' }, dad: { shirt: '#6c7a89', pants: '#4a5563', shoes: '#4a5563' }, mom: { shirt: '#9b7bc4', pants: '#7a5aa8', shoes: '#7a5aa8' } };

// ---- raccoon (side view, facing right) ----
const raccoon = (x, y, s = 1, { bag = false, climb = false, flip = false, sleepy = false, eyesGlow = false } = {}) => {
  const g = '#8a8f99', d = '#3a3f4a', l = '#d8dce3';
  const tail = G(-30, -26, 1, ell(-14, -10, 18, 9, g, 3, 'transform="rotate(-30 -14 -10)"') + [-24, -14, -4].map((cx) => ell(cx, -10 + (cx + 14) * .55, 3.5, 8.5, d, 0, `transform="rotate(-30 ${cx} ${-10 + (cx + 14) * .55})"`)).join(''));
  const eyes = sleepy ? path('M17 -50 q4 3 8 0', 'none', 2.2, 'stroke="#fff"') : eyesGlow ? circ(22, -50, 4.5, '#fff6a0', 1.5) + circ(22, -50, 1.8, '#3a3f4a', 0) : circ(22, -50, 3.6, '#fff', 0) + circ(23, -50, 2.2, '#111', 0) + circ(22, -51, .8, '#fff', 0);
  const head = path('M2 -58 L6 -72 L14 -60Z', g) + ell(18, -48, 18, 14, g) + path('M4 -52 Q18 -60 34 -50 Q30 -42 22 -46 Q14 -42 6 -46Z', d, 0) + eyes + ell(34, -44, 8, 5.5, l, 2.5) + circ(41, -45, 3, '#111', 0) + path('M2 -40 Q12 -36 20 -38', 'none', 0);
  const body = ell(-6, -28, 26, 18, g) + ell(-2, -22, 14, 10, l, 0, 'opacity=".6"');
  const legs = rect(-26, -16, 9, 16, d, 2.5, 4) + rect(8, -16, 9, 16, d, 2.5, 4);
  const arm = bag ? path('M14 -30 L26 -22', 'none', 7, `stroke="${d}"`) + G(32, -24, 1, rect(-10, -14, 22, 22, '#fff', 2.5, 4) + circ(-2, -2, 4, '#ffd1e0', 1.5) + circ(5, 3, 4, '#fff', 1.5) + circ(4, -7, 4, '#ffe3a0', 1.5) + path('M-10 -14 L12 -14', 'none', 3, 'stroke="#ff7aa8"')) + circ(30, -18, 3, '#fff', 1.5) + circ(36, -40, 2, '#fff', 0) : rect(14, -18, 8, 18, d, 2.5, 4);
  return G(x, y, s, (climb ? '' : shadow(-4, 0, 30, 4)) + tail + legs + body + arm + head, flip, climb ? -70 : 0);
};
// ---- props ----
const tent = (x, y, s = 1, { open = false, glow = false } = {}) => G(x, y, s, shadow(0, 0, 80, 7) + path('M-70 0 L-20 -86 L66 -86 L96 0Z', '#3f8f63') + path('M-20 -86 L66 -86 L96 0 L10 0Z', '#2d6b49', 2) + path('M-70 0 L-20 -86 L30 0Z', glow ? '#ffd76a' : '#58b07a')
  + (open ? path('M-20 -86 L-44 0 L-20 -10 L4 0Z', glow ? '#fff2b0' : '#1f3a2c', 2.5) : line(-20, -86, -20, 0, O, 2.5) + path('M-20 -60 l-4 4 l4 4', 'none', 2)) + line(-70, 0, -88, 10, '#c8b48a', 2) + line(96, 0, 112, 10, '#c8b48a', 2) + line(-20, -86, -20, -98, O, 3));
const fallenTent = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 90, 7) + path('M-90 0 Q-70 -34 -30 -30 Q0 -46 30 -28 Q70 -36 92 0Z', '#3f8f63') + path('M-50 -26 Q-30 -14 -10 -26 M10 -30 Q30 -16 50 -28', 'none', 2.5, 'stroke="#2d6b49"') + line(-80, -10, -110, -40, '#9aa9bd', 5) + line(70, -12, 104, -46, '#9aa9bd', 5) + ell(-104, -4, 11, 6, '#4a3424', 2.5) + ell(-96, 6, 11, 6, '#4a3424', 2.5));
const canoe = (x, y, s = 1) => G(x, y, s, path('M-120 -24 Q-100 6 0 8 Q100 6 120 -24 Q100 -14 0 -14 Q-100 -14 -120 -24Z', '#d9432f') + path('M-110 -18 Q0 -8 110 -18', 'none', 2.5, 'stroke="#ffb3a3"') + path('M-120 -24 Q-100 -14 0 -14 Q100 -14 120 -24', 'none', 3));
const paddle = (x1, y1, x2, y2) => line(x1, y1, x2, y2, '#a8764f', 5) + G(x2, y2, 1, ell(0, 0, 6, 14, '#c98f5c', 2.5, `transform="rotate(${Math.round(Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI - 90)})"`));
const loon = (x, y, s = 1, flip = false) => G(x, y, s, ell(0, 0, 30, 10, '#1f2430') + `<g stroke="none" fill="#fff">${Array.from({ length: 10 }, (_, i) => rect(-20 + (i % 5) * 8, -6 + Math.floor(i / 5) * 6, 3.5, 3.5, '#fff', 0)).join('')}</g>` + path('M18 -4 Q24 -24 30 -26', 'none', 9, 'stroke="#1f2430"') + path('M20 -12 l6 -2 M21 -16 l6 -2', 'none', 2, 'stroke="#fff"') + ell(34, -28, 9, 7, '#1f2430') + circ(36, -30, 2.4, '#e6493f', 0) + path('M42 -28 L56 -25 L42 -24Z', '#2a2f3a', 2) + path('M-34 6 q34 6 68 0', 'none', 2, 'stroke="#fff" opacity=".6"'), flip);
const campfire = (x, y, s = 1, big = 1) => G(x, y, s, circ(0, -20, 70, 'url(#gLamp)', 0) + [0, 1, 2, 3, 4, 5, 6].map((i) => ell(Math.cos(i * .9) * 30, -2 + Math.sin(i * .9) * 6, 8, 6, '#9aa0a8', 2)).join('') + line(-26, -4, 22, -14, '#7a5236', 9) + line(-26, -4, 22, -14, '#a8764f', 5) + line(26, -4, -22, -14, '#7a5236', 9) + line(26, -4, -22, -14, '#a8764f', 5)
  + G(0, -10, big, path('M-20 0 Q-26 -22 -10 -34 Q-12 -20 -2 -18 Q-6 -42 10 -54 Q8 -32 18 -26 Q20 -36 16 -42 Q34 -24 20 0Z', '#ff8a3d', 2.5) + path('M-10 0 Q-12 -14 -2 -22 Q0 -12 6 -12 Q6 -22 10 -26 Q18 -12 10 0Z', '#ffe066', 0)) + [[-14, -64], [12, -76], [24, -58], [-4, -88]].map(([a, b]) => circ(a, b, 2, '#ffb84d', 0)).join(''));
const picnicTable = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 70, 6) + line(-50, 0, -30, -44, '#7a5236', 7) + line(50, 0, 30, -44, '#7a5236', 7) + rect(-72, -26, 144, 7, '#9c6a40', 2.5, 2) + rect(-62, -52, 124, 10, 'url(#gWood)', 3, 2) + line(-58, -47, 58, -47, '#7a4f2e', 1.5));
const mBag = (x, y, s = 1, open = false) => G(x, y, s, rect(-12, -22, 24, 22, '#fff', 2.5, 4) + path('M-12 -22 L12 -22', 'none', 3, 'stroke="#ff7aa8"') + circ(-4, -9, 4, '#ffd1e0', 1.5) + circ(4, -12, 4, '#fff', 1.5) + (open ? circ(14, -2, 3.4, '#fff', 1.5) + circ(-15, -1, 3.4, '#fff', 1.5) : ''));
const car = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 90, 7) + path('M-90 -14 L-88 -40 Q-84 -48 -70 -50 L-46 -50 L-26 -78 L44 -78 L66 -50 L84 -48 Q94 -44 92 -14Z', '#4a78b8') + path('M-20 -72 L-38 -52 L0 -52 L0 -72Z M8 -72 L8 -52 L54 -52 L38 -72Z', '#bfe8ff', 2.5) + rect(-30, -90, 70, 10, '#7a5236', 2.5, 3) + rect(-24, -100, 30, 10, '#e6b04c', 2.5, 2) + line(-6, -50, -6, -16, O, 2) + circ(-56, -12, 15, '#333') + circ(-56, -12, 6, '#c8d3e0', 2) + circ(60, -12, 15, '#333') + circ(60, -12, 6, '#c8d3e0', 2) + rect(84, -36, 8, 8, '#ffe066', 2, 2));
const dock = (x, y, w = 150) => rect(x, y, w, 12, 'url(#gWood)', 3, 2) + Array.from({ length: Math.floor(w / 18) }, (_, i) => line(x + 18 + i * 18, y, x + 18 + i * 18, y + 12, '#7a4f2e', 1.5)).join('') + [x + 10, x + w / 2, x + w - 12].map((px) => rect(px - 4, y + 12, 8, 30, '#7a4f2e', 2.5)).join('');
const water = (y, h, c1, c2, id = 'gLk') => vg(id, c1, c2) + rect(-5, y, 410, h, `url(#${id})`, 0) + Array.from({ length: 8 }, (_, i) => path(`M${Math.round(rnd(i + 2) * 360)} ${Math.round(y + 10 + rnd(i + 12) * (h - 20))} q10 -4 20 0 q10 4 20 0`, 'none', 2, 'stroke="#fff" opacity=".45"')).join('');
const waterFront = (y, c = '#4c97cf') => path(`M-5 ${y} Q30 ${y - 6} 60 ${y} T120 ${y} T180 ${y} T240 ${y} T300 ${y} T360 ${y} T420 ${y} L420 305 L-5 305Z`, c, 3, 'opacity=".92"');
const T = {
  day: { s: ['#79c6f1', '#eaf8ff'], w: ['#7cc7ef', '#3f86c4'], hills: '#8cc49a', pines: '#2f7a55', ground: ['#86cc63', '#5aa64a'], tuft: '#3f8f4f' },
  sunset: { s: ['#7d5aa8', '#ffb36b'], w: ['#e39a74', '#6a5aa0'], hills: '#6a6a8a', pines: '#3a3f5a', ground: ['#6f9a52', '#4a7a3e'], tuft: '#3a6a34' },
  night: { s: ['#141b45', '#3b3f80'], w: ['#2a3570', '#121a40'], hills: '#232c4a', pines: '#141c30', ground: ['#2a4a38', '#1c3428'], tuft: '#16301f' },
  dawn: { s: ['#ffc7b0', '#fff4e0'], w: ['#c6dcef', '#8fbcdc'], hills: '#a9c2bb', pines: '#6f9584', ground: ['#86cc63', '#5aa64a'], tuft: '#3f8f4f' },
};
// lake landscape: far shore with pines at y = h, water from h to shore, grassy ground from shore down
const lake = (t = 'day', h = 140, shore = 215, extra = '') => {
  const c = T[t];
  const top = vg('gSky', c.s[0], c.s[1]) + rect(0, 0, 400, 300, 'url(#gSky)', 0)
    + (t === 'day' ? sun(340, 46, 20) + cloud(90, 48) + cloud(230, 30, .8) : t === 'sunset' ? circ(300, h - 6, 34, '#ffd27a', 0, 'opacity=".9"') + cloud(90, 50, 1, '#ffd9c2') : t === 'night' ? stars(40, 5, h) + moon(330, 48, 18) : circ(90, h - 10, 26, '#fff1c8', 0) + cloud(260, 46, 1, '#fff'));
  const hillsP = path(`M-5 ${h} Q60 ${h - 46} 140 ${h - 24} Q220 ${h - 58} 300 ${h - 30} Q360 ${h - 46} 405 ${h - 20} L405 ${h + 2} L-5 ${h + 2}Z`, c.hills, 0);
  const pinesP = Array.from({ length: 16 }, (_, i) => { const px = i * 27 + Math.round(rnd(i + 4) * 10), ph = 20 + Math.round(rnd(i + 8) * 18); return path(`M${px - 9} ${h + 1} L${px} ${h - ph} L${px + 9} ${h + 1}Z`, c.pines, 0); }).join('');
  const ground = shore < 300 ? vg('gGd', c.ground[0], c.ground[1]) + path(`M-5 ${shore + 8} Q80 ${shore - 8} 180 ${shore} Q290 ${shore + 8} 405 ${shore - 6} L405 305 L-5 305Z`, 'url(#gGd)') + path(`M-5 ${shore + 8} Q80 ${shore - 8} 180 ${shore} Q290 ${shore + 8} 405 ${shore - 6}`, 'none', 7, 'stroke="#e9d8a6" opacity=".9"') + tufts(shore + 14, 296, 22, 5, c.tuft) : '';
  return top + hillsP + pinesP + water(h, (shore < 300 ? shore + 10 : 305) - h, c.w[0], c.w[1]) + (t === 'sunset' ? rect(270, h + 6, 60, 4, '#ffd27a', 0, 2, 'opacity=".7"') + rect(282, h + 16, 36, 3, '#ffd27a', 0, 2, 'opacity=".6"') : '') + (t === 'night' ? rect(318, h + 10, 26, 3, '#fff1a8', 0, 1, 'opacity=".6"') : '') + extra + ground;
};
const bigPine = (x, y, s = 1, c = '#2f7a55') => pine(x, y, s, c);

const cover = svg(lake('sunset', 140, 210) + bigPine(40, 236, 1.2, '#2a5a48') + tent(110, 234, .8) + loon(300, 172, .6) + campfire(220, 262, .8)
  + dad(300, 280, .85, { face: 'happy', legs: 'sit', arms: 'hold', extra: line(8, -50, 40, -78, '#a8764f', 3) + circ(42, -80, 5, '#fff', 2) }) + mom(360, 278, .8, { face: 'laugh', legs: 'sit', arms: 'down' })
  + jacob(150, 284, .9, { face: 'grin', arms: 'hold', legs: 'sit', extra: line(8, -50, 48, -70, '#a8764f', 3) + circ(50, -72, 5, '#f3c27a', 2) }) + mila(100, 286, .95, { face: 'laugh', arms: 'cheer' })
  + raccoon(30, 300, .5, { flip: false }));

export const book = {
  id: 'en-camping-at-loon-lake',
  title: 'Camping at Loon Lake',
  emoji: '🏕️',
  level: 3,
  minutes: 10,
  cover,
  pages: [
    { text: 'On the first day of the summer holidays, Jacob and his little sister Mila sat in the back of the car for three long hours. “Are we there yet?” asked Mila, again and again. Finally, Dad stopped the car. In front of them was Loon Lake. The water was blue and calm, and tall pine trees stood all around it. “Welcome to our campsite!” said Mom. “We are going to sleep in a tent for three nights!”',
      svg: svg(lake('day', 140, 205) + bigPine(370, 236, 1.1) + car(110, 250, .85) + mom(230, 284, .9, { face: 'happy', arms: 'point', R: [[36, -76], [56, -86]] }) + jacob(300, 286, .95, { face: 'wow', arms: 'cheer', legs: 'jump' }) + mila(345, 288, .95, { face: 'laugh', arms: 'up' }) + dad(36, 282, .85, { face: 'smile', arms: 'carry', extra: rect(-22, -76, 44, 30, '#3f8f63', 2.5, 5) })) },
    { text: 'First, they had to set up the tent. Dad unrolled it on the ground and pushed in the long poles. “This is easy,” he said. “I don’t need the instructions.” Jacob held one side and Mila held the other. Then, suddenly, a gust of wind came from the lake. Whoosh! The whole tent fell down on top of Dad. Only his shoes were sticking out. Mila laughed so hard that she fell on the grass.',
      svg: svg(lake('day', 140, 205) + bigPine(30, 236, 1.1) + fallenTent(210, 262, 1) + G(150, 120, 1, path('M0 0 q30 -14 60 0 t60 0 M10 18 q30 -14 60 0 t60 0 M-10 36 q30 -14 60 0', 'none', 4, 'stroke="#fff" opacity=".9"')) + jacob(330, 284, .95, { face: 'wow', arms: 'up' }) + mila(80, 296, .9, { face: 'laugh', legs: 'sit', arms: 'hug' }) + mom(380, 282, .8, { face: 'wow', arms: 'hold', extra: rect(-12, -66, 24, 30, '#fff', 2, 2) + line(-6, -58, 6, -58, O, 1.5) + line(-6, -52, 6, -52, O, 1.5) })) },
    { text: 'Mom picked up the instructions and smiled. “Let’s try again, together,” she said. This time, they did each step in order. Jacob hammered the pegs into the ground, and Mom tied the ropes. Mila carried the sleeping bags inside and put her teddy bear on her pillow. Soon, the green tent was standing tall and straight. Dad bowed. “Thank you, team,” he said. “Maybe instructions are a good idea after all.”',
      svg: svg(lake('day', 140, 205) + bigPine(370, 236, 1.1) + tent(180, 250, 1, { open: true }) + jacob(80, 286, .95, { face: 'happy', arms: 'reach', R: [[30, -60], [36, -44]], extra: G(38, -44, 1, line(0, 0, 0, -18, '#a8764f', 4) + rect(-8, -26, 16, 9, '#7d8a99', 2, 2)) + G(30, -6, 1, path('M-2 -10 L2 -10 L0 4Z', '#c8d3e0', 1.5)) })
        + mila(290, 288, .95, { face: 'happy', arms: 'carry', extra: rect(-24, -64, 48, 20, '#e6493f', 2.5, 10) + G(30, -70, .5, circ(0, 0, 10, '#c98f5c', 2.5) + circ(-8, -9, 4.5, '#c98f5c', 2.5) + circ(8, -9, 4.5, '#c98f5c', 2.5) + circ(-3, -1, 1.5, O, 0) + circ(3, -1, 1.5, O, 0)) })
        + dad(345, 284, .85, { face: 'laugh', arms: 'down', L: [[-34, -60], [-20, -50]] }) + mom(22, 280, .82, { face: 'smile', arms: 'hold', extra: rect(-12, -66, 24, 30, '#fff', 2, 2) })) },
    { text: 'In the afternoon, everyone put on a life jacket and climbed into the red canoe. Dad sat in the back, and Mom sat in the front. Jacob had his own small paddle. Dip, pull, dip, pull! The canoe glided across the quiet lake. Little fish swam under the boat, and a dragonfly landed on Mila’s knee. “Shh,” whispered Mom. “Listen.” Everyone stopped paddling and waited.',
      svg: svg(lake('day', 120, 400) + [[70, 262], [300, 278], [210, 288]].map(([a, b], i) => G(a, b, .9, ell(0, 0, 12, 5, '#ffb84d', 2) + path('M-12 0 L-20 -6 L-20 6Z', '#ffb84d', 2) + circ(6, -1, 1.2, O, 0), i % 2 === 1)).join('')
        + mom(300, 214, .8, { face: 'smile', legs: 'sit', vest: '#ff7f2a', arms: 'hold', extra: '' }) + mila(240, 214, .85, { face: 'wow', legs: 'sit', vest: '#ff7f2a', arms: 'down' }) + jacob(170, 214, .85, { face: 'happy', legs: 'sit', vest: '#ff7f2a', arms: 'hold' }) + dad(100, 214, .8, { face: 'happy', legs: 'sit', vest: '#ff7f2a', arms: 'hold' })
        + canoe(200, 222, 1.25) + paddle(98, 176, 66, 236) + paddle(176, 180, 150, 240) + G(262, 186, .8, ell(-6, -4, 8, 3, '#bfe6ff', 1.5) + ell(6, -4, 8, 3, '#bfe6ff', 1.5) + line(-2, 0, 14, 0, '#3a7bd5', 3)) + path('M-5 238 q40 -6 80 0 t80 0 t80 0 t80 0 t80 0', 'none', 2.5, 'stroke="#fff" opacity=".7"')) },
    { text: 'From far away came a long, wild sound. “Ooo-OOO-ooo!” It sounded a little bit like a song and a little bit like a ghost. Mila held Jacob’s arm. “What is that?” she asked. Dad pointed to a black and white bird floating on the water. It had a red eye and a sharp beak. “That’s a loon,” he said. “This lake is named after it. Loons sing to talk to their family.”',
      svg: svg(lake('day', 120, 400) + loon(300, 196, 1.3) + G(330, 120, 1, path('M0 0 q10 -10 20 0 M-6 -14 q16 -16 32 0 M-12 -28 q22 -22 44 0', 'none', 3, 'stroke="#fff"')) + loon(360, 150, .5)
        + dad(70, 254, .9, { face: 'smile', legs: 'sit', vest: '#ff7f2a', arms: 'point', R: [[38, -78], [60, -88]] }) + jacob(170, 252, .9, { face: 'wow', legs: 'sit', vest: '#ff7f2a', arms: 'down' }) + mila(220, 254, .95, { face: 'worried', legs: 'sit', vest: '#ff7f2a', arms: 'hold', L: [[-26, -60], [-40, -62]] })
        + G(150, 266, 1, path('M-170 -24 Q-150 6 0 8 Q100 6 120 -24 Q100 -14 0 -14 Q-150 -14 -170 -24Z', '#d9432f') + path('M-160 -18 Q0 -8 110 -18', 'none', 2.5, 'stroke="#ffb3a3"'))) },
    { text: 'Later, it was very hot, so they went swimming. Jacob ran to the end of the wooden dock and jumped. Splash! “It’s freezing!” he shouted, but he was laughing. Mila wore her orange water wings and kicked her feet near the beach. Mom floated on her back and looked at the clouds. Dad tried to catch a frog, but the frog was much faster than Dad.',
      svg: svg(lake('day', 130, 400) + dock(-10, 190, 170) + jacob(196, 176, .9, { face: 'laugh', arms: 'cheer', legs: 'jump', bottom: 'shorts', shirt: SKIN.tan, stripe: false }) + motion(170, 120, 3, 20, -1)
        + G(200, 210, 1, Array.from({ length: 7 }, (_, i) => path(`M0 0 q${-16 + i * 5} -18 ${-24 + i * 8} -6`, 'none', 3, 'stroke="#fff"')).join(''))
        + mila(80, 290, .95, { face: 'laugh', arms: 'up', shirt: '#f78fb3', extra: ell(-29, -84, 8, 10, '#ff9a3d', 2.5) + ell(29, -84, 8, 10, '#ff9a3d', 2.5) })
        + G(300, 236, 1, ell(0, 0, 44, 10, SKIN.tan) + rect(-18, -10, 40, 12, '#2a9d8f', 2.5, 5) + circ(-46, -4, 14, SKIN.tan) + path('M-60 -6 Q-62 -22 -46 -20 Q-34 -22 -32 -10', '#a0522d', 2.5) + path('M-50 -4 q3 -3 6 0 M-42 -6 q3 -3 6 0', 'none', 2) + path('M-46 4 q4 3 8 0', 'none', 2))
        + dad(350, 300, .9, { face: 'wow', arms: 'reach', shirt: SKIN.tan })
        + waterFront(256, '#4c97cf') + path('M60 254 q10 -8 20 0 q10 -8 20 0 M320 252 q10 -8 20 0 q10 -8 20 0', 'none', 2.5, 'stroke="#fff"')
        + ell(270, 262, 18, 6, '#3f8f4f', 2.5) + G(270, 258, 1, ell(0, 0, 10, 7, '#5aa64a', 2) + circ(-6, -6, 3.5, '#5aa64a', 2) + circ(6, -6, 3.5, '#5aa64a', 2) + circ(-6, -6, 1.3, O, 0) + circ(6, -6, 1.3, O, 0) + path('M-8 4 l-10 4 M8 4 l10 4', 'none', 3, 'stroke="#5aa64a"')) + motion(284, 252, 2, 14, -1)) },
    { text: 'When the sun went down, Dad built a campfire with dry sticks and logs. The fire crackled and popped, and orange sparks flew up into the sky. Mom opened a big bag of marshmallows. Everyone put a marshmallow on a long stick. Jacob’s marshmallow turned golden brown. Mila’s caught fire! “Blow on it!” said Jacob. She blew, and it was black and crunchy, but she said it was the best one.',
      svg: svg(lake('sunset', 130, 200) + tent(60, 226, .6) + campfire(200, 262, 1.1)
        + jacob(110, 288, 1, { face: 'grin', legs: 'sit', arms: 'hold', extra: line(8, -50, 66, -74, '#a8764f', 3) + ell(70, -76, 6, 5, '#e6a24a', 2) })
        + mila(300, 290, 1, { face: 'wow', legs: 'sit', arms: 'hold', extra: line(-8, -50, -64, -80, '#a8764f', 3) + ell(-68, -82, 6, 5, '#3a3a3a', 2) + path('M-74 -86 q-2 -14 6 -22 q2 10 6 8 q2 6 -2 14Z', '#ff8a3d', 2) }) + mBag(250, 290, 1, true)
        + mom(360, 284, .85, { face: 'laugh', legs: 'sit', arms: 'down' }) + dad(30, 284, .85, { face: 'happy', legs: 'sit', arms: 'down' })) },
    { text: 'Later, the sky was full of stars, more stars than they ever saw in the city. Dad showed them the Big Dipper. It looked like a giant spoon in the sky. Mila yawned a huge yawn. “Bedtime,” said Mom. Everyone crawled into the tent and zipped it shut. But nobody noticed one small thing. The bag of marshmallows was still on the picnic table.',
      svg: svg(lake('night', 150, 215) + poly([[60, 40], [96, 52], [128, 60], [158, 76], [166, 112], [214, 118], [222, 84], [158, 76]], '#fff6c8', 2, 'opacity=".55"') + [[60, 40], [96, 52], [128, 60], [158, 76], [166, 112], [214, 118], [222, 84]].map(([a, b]) => star(a, b, 7, '#fff6c8')).join('')
        + campfire(140, 262, .6, .4) + tent(300, 248, .9, { open: true, glow: true }) + picnicTable(90, 286, .9) + mBag(110, 240, .9) + sparkle(130, 224, .6, '#ffe066')
        + dad(220, 286, .85, { face: 'smile', arms: 'point', R: [[34, -84], [44, -112]] }) + mila(170, 288, .9, { face: 'sleepy', arms: 'cry', L: [[-22, -60], [-8, -92]], R: [[22, -60], [28, -44]] }) + zzz(150, 170, .8)) },
    { text: 'In the middle of the night, Jacob opened his eyes. Something was moving outside. Scratch, scratch… rustle, rustle… CRUNCH! Mila sat up and hugged her teddy bear. “Is it a bear?” she whispered. Jacob’s heart was beating fast. Mom held them both close. Dad found his flashlight in the dark. “Stay here,” he whispered bravely, and he slowly opened the zipper of the tent.',
      svg: (() => {
        const bag = (x, c) => rect(x - 34, 250, 68, 56, c, 3, 20) + line(x - 20, 258, x - 20, 300, O, 1.5);
        return svg(rect(0, 0, 400, 300, '#1e3a2c', 0) + path('M0 0 L200 -10 L400 0 L400 300 L0 300Z', '#24473a', 0) + path('M200 0 L60 300 M200 0 L340 300', 'none', 4, 'stroke="#173026"') + ell(200, 90, 160, 120, '#3a6a52', 0, 'opacity=".35"')
          + G(370, 150, 1, ell(0, 0, 26, 40, '#0f2018', 0, 'opacity=".6"') + path('M-10 -10 l-10 -14 M0 -14 l0 -16 M10 -10 l10 -14', 'none', 3, 'stroke="#0f2018"'))
          + mom(110, 300, .85, { face: 'worried', legs: 'sit', arms: 'hug', ...PJ.mom }) + bag(110, '#9b59b6')
          + jacob(180, 300, .95, { face: 'wow', legs: 'sit', arms: 'down', ...PJ.jacob }) + bag(180, '#3f6fb5')
          + mila(240, 300, 1, { face: 'worried', legs: 'sit', arms: 'hold', ...PJ.mila, extra: G(0, -54, .7, circ(0, 0, 12, '#c98f5c', 2.5) + circ(-9, -10, 5, '#c98f5c', 2.5) + circ(9, -10, 5, '#c98f5c', 2.5) + circ(-4, -2, 1.6, O, 0) + circ(4, -2, 1.6, O, 0)) }) + bag(240, '#e6493f')
          + dad(320, 300, .85, { face: 'worried', legs: 'sit', arms: 'reach', ...PJ.dad, R: [[34, -64], [52, -70]], extra: G(52, -70, 1, rect(-4, -6, 22, 12, '#ffd166', 2.5, 3) + rect(16, -8, 6, 16, '#c8d3e0', 2, 2)) })
          + sweat(200, 166, 1) + path('M44 40 l10 10 M40 60 l14 2 M60 28 l2 14 M330 40 l-10 10 M340 60 l-14 2', 'none', 3, 'stroke="#ffe066"'));
      })() },
    { text: 'Dad shone the flashlight on the picnic table. Two shiny eyes looked back at him. It was not a bear. It was a raccoon! It had a black mask around its eyes, like a little robber, and a fluffy tail with rings. It was holding the bag of marshmallows in its tiny hands. Its cheeks were full, and it had white sugar on its nose.',
      svg: svg(lake('night', 150, 215) + tent(330, 250, .75, { open: true, glow: true }) + path('M300 210 L120 196 L118 290 Z', '#fff6a0', 0, 'opacity=".38"') + picnicTable(150, 290, 1) + raccoon(140, 238, 1.3, { bag: true, eyesGlow: true }) + circ(198, 186, 3, '#fff', 0)
        + dad(330, 290, .85, { face: 'wow', arms: 'reach', ...PJ.dad, L: [[-36, -70], [-48, -78]], extra: G(-48, -78, 1, rect(-22, -6, 22, 12, '#ffd166', 2.5, 3) + rect(-28, -8, 6, 16, '#c8d3e0', 2, 2)) })) },
    { text: '“Hey! Those are our marshmallows!” said Dad. The raccoon looked at him and did not move. Then it grabbed the bag and ran. Up, up, up it went, into the tallest pine tree. It sat on a branch and kept eating, crunch, crunch. Everyone came out of the tent in their pyjamas. They looked up at the tree, and they started to laugh. Even Dad laughed.',
      svg: svg(lake('night', 150, 215) + bigPine(90, 270, 2.2, '#1f4a38') + raccoon(110, 92, .8, { bag: true }) + path('M118 120 l4 -4 M106 124 l-4 -4', 'none', 2, 'stroke="#fff"')
        + dad(230, 286, .85, { face: 'laugh', arms: 'point', ...PJ.dad, R: [[34, -84], [20, -112]] }) + mom(370, 284, .82, { face: 'laugh', arms: 'down', ...PJ.mom })
        + jacob(290, 290, .9, { face: 'laugh', arms: 'up', ...PJ.jacob }) + mila(330, 292, .9, { face: 'laugh', arms: 'cheer', ...PJ.mila })) },
    { text: 'In the morning, a soft mist was floating on the lake. Two loons were swimming by the dock, and the sun was coming up, pink and gold. Mom made pancakes on the little camping stove, with lots of maple syrup. “Today, we learned something,” said Jacob, with his mouth full. “At night, food goes in the car!” Everyone agreed. And up in the tree, the raccoon was sound asleep.',
      svg: svg(lake('dawn', 140, 210) + ell(200, 160, 240, 10, '#fff', 0, 'opacity=".7"') + ell(120, 176, 160, 7, '#fff', 0, 'opacity=".6"') + loon(250, 178, .5) + loon(296, 184, .42, true)
        + dock(150, 196, 80) + bigPine(40, 256, 1.6) + G(46, 110, 1, raccoon(0, 0, .5, { sleepy: true, flip: true })) + zzz(56, 74, .6)
        + dad(222, 276, .8, { face: 'laugh', arms: 'down' }) + picnicTable(200, 292, 1.1) + G(170, 232, 1, ell(0, 0, 26, 7, '#fff', 2.5) + ell(-4, -6, 18, 5, '#e6b04c', 2) + ell(-2, -11, 16, 5, '#e6b04c', 2) + path('M-10 -14 q4 10 0 16 M6 -14 q2 8 -2 14', 'none', 3, 'stroke="#b8661c"'))
        + G(270, 234, 1, rect(-22, -12, 44, 14, '#3f8f63', 2.5, 3) + circ(-10, -5, 3, '#9aa9bd', 1.5) + ell(6, -16, 16, 4, '#4a4a4a', 2.5) + ell(6, -20, 9, 3, '#e6b04c', 2) + line(22, -16, 34, -18, '#4a4a4a', 3) + path('M0 -26 q-3 -6 0 -10 M10 -26 q-3 -6 0 -10', 'none', 2, 'stroke="#fff"'))
        + mom(318, 288, .9, { face: 'happy', arms: 'reach', L: [[-34, -62], [-50, -66]], extra: G(-50, -66, 1, line(0, 0, -16, -2, '#9aa9bd', 3) + rect(-30, -6, 14, 8, '#9aa9bd', 2, 2)) })
        + jacob(100, 292, .95, { face: 'grin', arms: 'point', R: [[30, -76], [44, -96]] }) + mila(372, 292, .9, { face: 'laugh', arms: 'cheer' })) },
  ],
  words: [
    { word: 'campsite', emoji: '🏕️', def: 'A place where you put your tent and sleep outside.' },
    { word: 'tent', emoji: '⛺', def: 'A small house made of cloth and poles that you sleep in when you camp.' },
    { word: 'canoe', emoji: '🛶', def: 'A long, narrow boat that you move with paddles.' },
    { word: 'loon', emoji: '🦆', def: 'A black and white bird that swims on lakes and sings a long, wild song.' },
    { word: 'campfire', emoji: '🔥', def: 'A fire outside, made with sticks and logs.' },
    { word: 'marshmallow', emoji: '🍡', def: 'A soft, white, sweet candy that you can roast on a fire.' },
    { word: 'raccoon', emoji: '🦝', def: 'A small grey animal with a black mask and a ringed tail.' },
    { word: 'flashlight', emoji: '🔦', def: 'A small lamp you hold in your hand.' },
  ],
  quiz: [
    { q: 'Why did the tent fall down the first time?', options: ['Mila pulled the rope', 'The wind blew and Dad didn’t read the instructions', 'A raccoon pushed it', 'It started to rain'], answer: 1 },
    { q: 'What made the long, wild sound on the lake?', options: ['A ghost', 'A loon', 'A frog', 'A raccoon'], answer: 1 },
    { q: 'What happened to Mila’s marshmallow?', options: ['She dropped it', 'The raccoon took it', 'It caught fire', 'Jacob ate it'], answer: 2 },
    { q: 'How did Mila feel when she heard “CRUNCH!” in the night?', options: ['Scared', 'Bored', 'Angry', 'Sleepy'], answer: 0 },
    { q: 'What happened right after Dad shone the flashlight on the raccoon?', options: ['It ran into the lake', 'It grabbed the bag and climbed a pine tree', 'It went into the tent', 'It went to sleep'], answer: 1 },
    { q: 'What did the family learn?', options: ['Loons can’t sing', 'Put your food away in the car at night', 'Never go swimming', 'Tents are easy'], answer: 1 },
  ],
};
