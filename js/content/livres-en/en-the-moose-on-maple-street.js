// en-the-moose-on-maple-street — English storybook, level 2 (see docs/LIVRES.md). Catch Unit 7: People Around Me.
import { O, SKIN, svg, vg, sky, ell, circ, rect, path, line, G, rnd, shadow, cloud, sun, tree, pine, bush, house, floorRoom, win, kid, adult, heart, sparkle, flower, tufts, fg, note } from './art/kit.js';

// ---- characters ----
// Lucas: glasses, green hoodie.  Mom: dark bob, red sweater.
const lucas = (x, y, s, face = 'happy', arms = 'down', ex = {}) => kid(x, y, s, { skin: SKIN.light, hair: '#6b4329', hs: 'short', glasses: true, shirt: '#3fae5a', pants: '#3f5a8a', face, arms, extra: path('M-5 -76 l-2 14 M5 -76 l2 14', 'none', 2, 'stroke="#e8f6ea"') + circ(-7, -61, 2, '#e8f6ea', 0) + circ(7, -61, 2, '#e8f6ea', 0) + (ex.extra || ''), ...ex });
const mom = (x, y, s, face = 'happy', arms = 'down', ex = {}) => adult(x, y, s, { skin: SKIN.light, hair: '#2a1d14', hs: 'bob', shirt: '#d9534f', pants: '#34495e', face, arms, ...ex });
const mrsGreen = (x, y, s, face = 'wow', arms = 'down', ex = {}) => adult(x, y, s, { skin: SKIN.peach, hair: '#c9ccd3', hs: 'bun', shirt: '#b98fd6', dress: true, glasses: true, shoes: '#7a4b8a', face, arms, ...ex });
// Mr. Roy the baker: white apron + chef hat (drawn over the head)
const chefHat = (x, y, s) => G(x, y, s, rect(-18, -142, 36, 14, '#fff', 3, 3) + circ(-14, -150, 11, '#fff') + circ(14, -150, 11, '#fff') + circ(0, -158, 14, '#fff') + rect(-15, -150, 30, 12, '#fff', 0));
const baker = (x, y, s, face = 'worried', arms = 'down', ex = {}) => adult(x, y, s, { skin: SKIN.tan, hair: '#3a2a1e', hs: 'short', shirt: '#f4f4f4', pants: '#5a6270', face, arms, extra: path('M-16 -66 L16 -66 L22 -24 L-22 -24Z', '#fff', 2.5) + ell(-6, -84, 3, 2, '#fff', 0, 'opacity=".9"'), ...ex }) + chefHat(x, y, s);
// crossing guard: orange safety vest
const guard = (x, y, s, face = 'happy', arms = 'down', ex = {}) => adult(x, y, s, { skin: SKIN.brown, hair: '#2a1d14', hs: 'bun', shirt: '#5b6d8a', vest: '#ff8c2a', pants: '#2f3b52', face, arms, ...ex });
const stopSign = (x, y, s = 1) => G(x, y, s, line(0, 0, 0, 46, O, 6) + line(0, 0, 0, 46, '#c9ccd3', 3) + path('M-9 -22 L9 -22 L22 -9 L22 9 L9 22 L-9 22 L-22 9 L-22 -9Z', '#e6493f', 3) + rect(-13, -4, 26, 8, '#fff', 0, 2));
// Officer Ben: navy uniform + cap
const cap = (x, y, s, c = '#22325a') => G(x, y, s, path('M-27 -132 Q-25 -158 0 -158 Q25 -158 27 -132Z', c) + rect(-29, -134, 58, 8, '#1a1a1a', 2.5, 3) + circ(0, -146, 4.5, '#ffd84d', 2));
const officer = (x, y, s, face = 'happy', arms = 'down', ex = {}) => adult(x, y, s, { skin: SKIN.peach, hair: '#c47a3a', hs: 'short', shirt: '#2b3e6b', pants: '#22325a', shoes: '#1a1a1a', face, arms, extra: circ(-11, -64, 4, '#ffd84d', 2) + rect(-24, -42, 48, 6, '#1a1a1a', 2, 2), ...ex }) + cap(x, y, s);
// Ms. Martin, wildlife officer: khaki-green uniform + wide-brim hat
const ranger = (x, y, s, face = 'smile', arms = 'down', ex = {}) => adult(x, y, s, { skin: SKIN.dark, hair: '#1e140d', hs: 'ponytail', shirt: '#6b8a3a', pants: '#4f5f3a', shoes: '#5a3e2b', face, arms, extra: path('M-14 -70 l5 12 M14 -70 l-5 12', 'none', 2, 'stroke="#4f6a28"') + circ(-12, -60, 4.5, '#e8c547', 2) + (ex.extra || ''), ...ex }) + G(x, y, s, ell(0, -133, 38, 7, '#a5885a') + path('M-20 -134 Q-20 -158 0 -158 Q20 -158 20 -134Z', '#a5885a') + rect(-20, -142, 40, 6, '#6b4a2a', 2, 2));
const apple = (x, y, s = 1) => G(x, y, s, circ(-3, 0, 7, '#e6493f', 2.5) + circ(3, 0, 7, '#e6493f', 2.5) + rect(-6, -3, 12, 8, '#e6493f', 0) + line(0, -6, 1, -12, '#6b4329', 2.5) + ell(5, -11, 4, 2, '#5aa04a', 1.5) + circ(-4, -3, 2, '#fff', 0, 'opacity=".6"'));

// ---- the moose: side view facing right; head 'up' | 'down' (eating) | 'look' (looks back = flipped head handled by flip) ----
function moose(x, y, s = 1, o = {}) {
  const c = '#7a4b2e', cf = '#5f3a22', d = '#4a2c18', lg = '#b89573', lgf = '#9c7a5a', a = '#ead6ad', h = '#2e2a28';
  // leg: thigh (body colour) -> knee -> pale lower leg -> split hoof. k = sideways swing of the foot (walking)
  const leg = (lx, k, far) => {
    const up = far ? cf : c, lo = far ? lgf : lg;
    return path(`M${lx - 13} -96 Q${lx - 15} -66 ${lx - 8 + k * .4} -52 L${lx + 8 + k * .4} -52 Q${lx + 14} -70 ${lx + 12} -96Z`, up)
      + path(`M${lx - 8 + k * .4} -54 L${lx - 6 + k} -12 L${lx + 5 + k} -12 L${lx + 8 + k * .4} -54Z`, lo)
      + ell(lx + k * .4, -52, 8.5, 7, lo, 2.6)
      + path(`M${lx - 8 + k} -13 L${lx + 7 + k} -13 L${lx + 9 + k} 0 L${lx - 9 + k} 0Z`, h, 2.5) + line(lx + k, -8, lx + k, 0, '#6b6460', 1.6);
  };
  const w = o.walk ? 9 : 0;
  const farLegs = leg(-50, -w, true) + leg(30, w, true);
  const nearLegs = leg(-34, w, false) + leg(46, -w, false);
  const body = path('M-84 -112 Q-88 -142 -56 -146 Q-20 -150 0 -168 Q30 -182 52 -150 Q66 -122 54 -94 Q46 -84 28 -84 L-58 -86 Q-84 -88 -84 -112Z', c)
    + path('M-80 -100 Q-30 -88 30 -92 Q48 -94 58 -110 Q60 -94 50 -88 Q40 -84 28 -84 L-58 -86 Q-78 -88 -80 -100Z', d, 0, 'opacity=".45"')
    + path('M-60 -138 Q-24 -142 -2 -160 Q22 -176 40 -160', 'none', 5, 'stroke="#a8764c" opacity=".75"')
    + path('M-86 -130 q-10 4 -6 14', 'none', 5) + path('M14 -150 q8 14 4 30 M26 -152 q8 14 4 28', 'none', 2, 'stroke="#5a341d" opacity=".6"');
  const ears = ell(-4, -8, 6, 15, cf, 2.6, 'transform="rotate(-62 -4 -8)"') + ell(-10, 2, 6.5, 16, c, 2.8, 'transform="rotate(-78 -10 2)"') + ell(-10, 2, 3, 10, '#c79a76', 0, 'transform="rotate(-78 -10 2)"');
  const palm = (dx, back) => path(back
    ? `M${dx} -4 Q${dx - 6} -22 ${dx - 26} -30 L${dx - 34} -42 L${dx - 24} -40 L${dx - 28} -54 L${dx - 16} -46 L${dx - 14} -60 L${dx - 5} -48 L${dx + 2} -60 L${dx + 4} -42 Q${dx + 10} -24 ${dx + 8} -4Z`
    : `M${dx} -4 Q${dx + 8} -26 ${dx + 30} -34 L${dx + 30} -48 L${dx + 39} -40 L${dx + 44} -54 L${dx + 49} -40 L${dx + 60} -46 L${dx + 56} -32 L${dx + 66} -30 Q${dx + 44} -18 ${dx + 10} -2Z`, back ? '#d9c497' : a, 2.6)
    + path(back ? `M${dx + 2} -10 Q${dx - 6} -26 ${dx - 20} -32` : `M${dx + 6} -8 Q${dx + 18} -26 ${dx + 40} -32`, 'none', 1.8, 'stroke="#b89a6a"');
  const headInner = palm(4, true)
    + path('M14 34 Q24 60 14 78 Q4 62 6 36Z', c, 2.6) // dewlap (bell)
    + path('M-6 2 Q8 -12 28 2 L54 28 Q70 34 74 50 Q76 66 62 68 Q52 70 46 62 Q40 60 38 54 Q26 52 18 42 L0 22 Q-14 12 -6 2Z', c) // long head + bulbous overhanging nose
    + path('M48 30 Q70 34 74 50 Q76 66 62 68 Q52 70 46 62 Q50 46 48 30Z', d, 0, 'opacity=".5"') + path('M38 54 Q42 66 52 66', 'none', 2.4) + path('M40 58 q6 4 10 2', 'none', 2, 'stroke="#c79a76"')
    + ell(64, 54, 3.2, 5, h, 0, 'transform="rotate(-25 64 54)"') + path('M8 4 Q16 -2 24 6', 'none', 2.4) + circ(18, 12, 4, O, 0) + circ(16.8, 10.6, 1.4, '#fff', 0) + path('M10 22 q10 4 18 0', 'none', 1.8, 'stroke="#5a341d" opacity=".7"')
    + ears + palm(10, false);
  const neck = path('M6 -168 Q50 -172 84 -150 L92 -118 Q70 -100 42 -94 Q30 -120 6 -168Z', c) + path('M50 -110 Q70 -108 88 -122 L92 -118 Q70 -100 42 -94Z', d, 0, 'opacity=".4"');
  const neckDown = path('M6 -168 Q56 -166 84 -136 L100 -100 Q74 -92 42 -94 Q30 -120 6 -168Z', c);
  const head = o.head === 'down' ? G(88, -138, 1.1, headInner, false, 42) : G(80, -150, 1.1, headInner, false, o.head === 'nod' ? 14 : 0);
  return G(x, y, s, shadow(0, 0, 84, 9) + farLegs + nearLegs + (o.head === 'down' ? neckDown : neck) + body + head + (o.extra || ''), !!o.flip);
}

// ---- Maple Street scenery ----
const maple = (x, y, s = 1) => tree(x, y, s, '#e8743b', '#ffb36b');
const leaves = (n, seed = 1, y0 = 200, y1 = 300) => Array.from({ length: n }, (_, i) => ell(Math.round(rnd(i + seed) * 400), Math.round(y0 + rnd(i + seed + 30) * (y1 - y0)), 5, 3, ['#e8743b', '#f2b33d', '#d9534f'][i % 3], 1.5, `transform="rotate(${Math.round(rnd(i + seed + 9) * 180)} ${Math.round(rnd(i + seed) * 400)} ${Math.round(y0 + rnd(i + seed + 30) * (y1 - y0))})"`)).join('');
const morning = () => sky('#ffd6a0', '#bfe3f7') + sun(60, 70, 20) + cloud(220, 50, .9) + cloud(340, 80, .7);
const road = (y = 222) => rect(0, y - 22, 400, 22, '#d9d6cf', 0) + Array.from({ length: 9 }, (_, i) => line(i * 50, y - 22, i * 50, y, '#b9b5ad', 2)).join('') + line(0, y - 22, 400, y - 22, O, 3) + rect(0, y, 400, 300 - y, '#7d8590', 0) + rect(0, y, 400, 5, '#5e6670', 0) + line(0, y, 400, y, O, 3) + Array.from({ length: 6 }, (_, i) => rect(i * 76 + 6, y + 40, 40, 6, '#f5d13b', 0, 2)).join('');
const bakery = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 70, 6) + rect(-62, -104, 124, 104, '#f7e1c0') + rect(-66, -114, 132, 14, '#b5654a', 3, 3) + rect(-36, -136, 72, 22, '#fff4dd', 3, 6) + ell(0, -125, 18, 7, '#d9a05b', 2.5) + path('M-8 -129 l3 6 M0 -130 l3 6 M8 -129 l3 6', 'none', 1.8, 'stroke="#a8703a"')
  + path('M-62 -98 L62 -98 L66 -78 L-66 -78Z', '#fff') + [0, 1, 2, 3, 4, 5].map((i) => path(`M${-62 + i * 22} -98 L${-51 + i * 22} -98 L${-48 + i * 22} -78 L${-62 + i * 22 - 2} -78Z`, '#f27b9b', 0)).join('') + path('M-66 -78 ' + Array.from({ length: 6 }, (_, i) => `q11 10 22 0`).join(' '), '#f27b9b', 2.5) + path('M-62 -98 L62 -98 L66 -78 L-66 -78Z', 'none')
  + rect(-52, -62, 60, 44, '#cfeeff') + ell(-34, -26, 12, 6, '#d9a05b', 2.2) + ell(-12, -26, 11, 6, '#c98a4a', 2.2) + path('M-30 -40 q8 -12 16 0 q-8 4 -16 0Z', '#e8b25c', 2) + circ(-6, -44, 6, '#b5654a', 2) + path('M-50 -60 l18 18', 'none', 3, 'stroke="#fff" opacity=".6"') + rect(18, -60, 32, 60, '#c0603a', 3, 3) + circ(43, -30, 2.5, '#ffd84d', 0) + rect(23, -54, 22, 20, '#cfeeff', 2.5, 2));
const library = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 90, 7) + rect(-82, -96, 164, 84, '#ded6c4') + path('M-92 -96 L0 -134 L92 -96Z', '#c9bfa8') + circ(0, -110, 10, '#cfeeff', 2.5) + path('M-6 -110 q6 -4 6 2 q0 -6 6 -2 l0 7 q-6 -4 -6 1 q0 -5 -6 -1Z', '#fff', 1.6) + [-62, -34, 34, 62].map((cx) => rect(cx - 7, -92, 14, 80, '#f2ede2', 2.5) + rect(cx - 10, -96, 20, 6, '#f2ede2', 2.5)).join('') + rect(-18, -66, 36, 54, '#6d4a8a', 3, 16) + rect(-92, -12, 184, 6, '#cfc6b2', 2.5) + rect(-100, -6, 200, 6, '#bdb39c', 2.5));
const swings = (x, y, s = 1) => G(x, y, s, path('M-40 0 L-30 -60 L30 -60 L40 0', 'none', 5, 'stroke="#d9534f"') + path('M-40 0 L-30 -60 L30 -60 L40 0', 'none', 8, 'opacity=".0"') + line(-12, -60, -12, -20, O, 2) + line(-2, -60, -2, -20, O, 2) + rect(-15, -22, 16, 5, '#4a90d9', 2) + line(12, -60, 12, -24, O, 2) + line(22, -60, 22, -24, O, 2) + rect(9, -26, 16, 5, '#f2c94c', 2));
const pond = (x, y, rx = 50) => ell(x, y, rx, rx * .22, 'url(#gWat)', 3) + path(`M${x - rx * .5} ${y - 2} q8 -3 16 0 M${x + 6} ${y + 3} q8 -3 16 0`, 'none', 2, 'stroke="#fff" opacity=".7"');
const busW = (x, y, s = 1) => {
  const ws = [-92, -64, -36, -8, 20, 48];
  const faces = ws.map((wx, i) => G(wx + 11, -50, .3, kid(0, 40, 1, { skin: [SKIN.light, SKIN.brown, SKIN.tan, SKIN.dark, SKIN.peach, SKIN.light][i], hair: ['#e8a33c', '#2a1d14', '#6b4329', '#1e140d', '#c0392b', '#2a1d14'][i], hs: ['short', 'pigtails', 'curly', 'short', 'bob', 'spiky'][i], face: 'wow', shirt: '#4a90d9' }))).join('');
  const clip = `<clipPath id="bw"><path d="${ws.map((wx) => `M${wx} -78 h22 v22 h-22Z`).join(' ')}"/></clipPath><clipPath id="bd"><rect x="80" y="-82" width="26" height="30"/></clipPath>`;
  return G(x, y, s, shadow(0, 0, 130, 8) + rect(-110, -88, 220, 76, '#f5c518', 3, 10) + rect(110, -54, 32, 42, '#f5c518', 3, 6) + clip + ws.map((wx) => rect(wx, -78, 22, 22, '#cfeeff', 0)).join('') + `<g clip-path="url(#bw)">${faces}</g>` + ws.map((wx) => rect(wx, -78, 22, 22, 'none', 2.5, 3)).join('')
    + rect(80, -82, 26, 30, '#cfeeff', 0) + `<g clip-path="url(#bd)">${G(93, -44, .3, adult(0, 60, 1, { skin: SKIN.tan, hair: '#2a1d14', hs: 'long', shirt: '#4a6fa5', face: 'smile' }))}</g>` + rect(80, -82, 26, 30, 'none', 2.5, 3)
    + rect(-110, -48, 252, 6, '#1a1a1a', 0) + rect(-110, -38, 252, 3, '#1a1a1a', 0) + circ(138, -26, 5, '#fff3a0', 2) + rect(136, -16, 10, 6, '#c9ccd3', 2, 2) + circ(-70, -12, 16, '#2e2a28') + circ(-70, -12, 6, '#c9ccd3', 2) + circ(90, -12, 16, '#2e2a28') + circ(90, -12, 6, '#c9ccd3', 2));
};
const policeCar = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 70, 7) + path('M-70 -14 L-70 -36 Q-68 -42 -56 -44 L-34 -46 L-18 -66 L30 -66 L48 -46 L66 -42 Q72 -40 72 -30 L72 -14Z', '#fff') + rect(-70, -34, 142, 8, '#2b5bb8', 0) + rect(-12, -62, 18, 16, '#cfeeff', 2.5, 2) + path('M10 -62 L28 -62 L40 -46 L10 -46Z', '#cfeeff', 2.5) + rect(-4, -76, 28, 9, '#fff', 2.5, 3) + rect(-2, -75, 12, 7, '#e6493f', 0, 2) + rect(10, -75, 12, 7, '#2b5bb8', 0, 2) + circ(4, -80, 16, '#e6493f', 0, 'opacity=".25"') + circ(18, -80, 16, '#2b5bb8', 0, 'opacity=".25"') + circ(-42, -14, 13, '#2e2a28') + circ(-42, -14, 5, '#c9ccd3', 2) + circ(44, -14, 13, '#2e2a28') + circ(44, -14, 5, '#c9ccd3', 2) + circ(68, -30, 4, '#fff3a0', 2));
const truck = (x, y, s = 1) => G(x, y, s, shadow(0, 0, 76, 7) + rect(-76, -46, 84, 32, '#4f7a3a', 3, 4) + path('M8 -14 L8 -66 L44 -66 L62 -44 L78 -40 L78 -14Z', '#4f7a3a') + path('M14 -60 L40 -60 L54 -44 L14 -44Z', '#cfeeff', 2.5) + path('M-48 -36 L-30 -36 L-39 -24Z', '#e8c547', 2) + circ(-46, -14, 13, '#2e2a28') + circ(-46, -14, 5, '#c9ccd3', 2) + circ(52, -14, 13, '#2e2a28') + circ(52, -14, 5, '#c9ccd3', 2) + rect(-70, -56, 20, 10, '#e6493f', 2.5, 2) + apple(-60, -60, .8) + circ(76, -30, 4, '#fff3a0', 2));
const street = (y = 222, inner = '') => morning() + path('M-5 200 L-5 150 Q100 120 200 140 Q300 120 405 150 L405 200Z', '#c7dcb4', 0) + inner + road(y);

export const book = {
  id: 'en-the-moose-on-maple-street',
  title: 'The Moose on Maple Street',
  emoji: '🫎',
  level: 2,
  minutes: 7,
  cover: svg(street(222, maple(40, 200, .9) + house(120, 200, .7, '#9fc6e8', '#5a6a8a', '#7c4a2d') + bakery(262, 200, .75) + maple(365, 200, .85)) + moose(205, 290, .95, { walk: true }) + lucas(50, 296, .7, 'wow', 'point') + leaves(14, 4, 230, 300)),
  pages: [
    {
      text: 'It is early in the morning on Maple Street. The sun is just coming up. Lucas puts on his glasses and his green hoodie. Then he looks out the window, and his mouth opens wide. A big brown animal is walking down the middle of the street! It has long legs and giant antlers.',
      svg: svg(floorRoom('#e7f0dc', '#d6a46d', 225) + win(160, 30, 190, 140, morning() + rect(150, 120, 220, 60, '#c7dcb4', 0) + maple(190, 150, .5) + house(320, 150, .45, '#f4c27a', '#d9534f') + rect(150, 148, 220, 40, '#7d8590', 0) + moose(250, 172, .38, { walk: true })) + rect(18, 168, 120, 60, '#4a90d9', 3, 8) + rect(18, 150, 34, 24, '#fff', 3, 8) + rect(10, 160, 12, 72, '#9c6a40', 3, 3) + path('M30 196 q30 -10 60 4 q20 8 46 -2', 'none', 2.5, 'stroke="#2f6aa8"') + lucas(110, 280, 1.05, 'wow', 'point') + rect(300, 240, 60, 20, '#f2c94c', 3, 4) + circ(316, 262, 6, '#2e2a28') + circ(346, 262, 6, '#2e2a28')),
    },
    {
      text: '“Mom! Mom! Come and see!” Lucas shouts. Mom runs to the front door. “Is it a horse?” asks Lucas. “No,” says Mom. “It’s a moose! Moose usually live in the forest. This one is lost.” The moose is very tall, taller than our car. “We stay on the porch,” says Mom. “Moose are wild animals.”',
      svg: svg(street(232, maple(300, 200, .9) + maple(390, 205, .7)) + rect(0, 70, 140, 170, '#9fc6e8', 3) + path('M-10 76 L150 76 L120 50 L-10 50Z', '#5a6a8a') + rect(40, 130, 56, 106, '#7c4a2d', 3, 3) + circ(86, 186, 3, '#ffd84d', 0) + rect(0, 230, 150, 14, '#c49a6c', 3) + rect(140, 120, 8, 112, '#fff', 2.5) + mom(40, 240, .82, 'wow', 'down') + lucas(104, 244, .72, 'wow', 'point') + moose(232, 292, .84, { head: 'nod' }) + rect(330, 250, 70, 36, '#4a90d9', 3, 8) + circ(345, 288, 9, '#2e2a28') + circ(385, 288, 9, '#2e2a28') + leaves(10, 9, 250, 300)),
    },
    {
      text: 'The moose walks to Mrs. Green’s garden next door. Mrs. Green is our neighbour, and she loves her flowers. Crunch, crunch! The moose eats her red flowers and her yellow flowers. Mrs. Green drops her watering can. “My beautiful flowers!” she cries. Then she laughs a little. “Well, I hope you like them, Mr. Moose!”',
      svg: svg(morning() + house(320, 205, .95, '#f6c7d6', '#8a5a9a', '#5a3e8a') + vg('gGr', '#8ed26c', '#62b04a') + rect(0, 200, 400, 100, 'url(#gGr)', 0) + line(0, 200, 400, 200) + tufts(206, 296, 26, 5, '#4f9a43') + rect(0, 228, 260, 60, '#7a5236', 3, 10) + [20, 44, 68, 92, 116, 140, 164, 190, 214, 238].map((fx, i) => flower(fx, 248 + (i % 2) * 14, i % 2 ? '#f2c94c' : '#e6493f')).join('') + path('M0 190 L260 190', 'none', 0) + Array.from({ length: 9 }, (_, i) => rect(i * 30, 178, 8, 30, '#fff', 2.5, 2)).join('') + rect(0, 186, 270, 7, '#fff', 2.5) + moose(118, 274, .95, { head: 'down' }) + path('M196 230 l6 -12 M210 236 l10 -8', 'none', 2.5, 'stroke="#e6493f"') + mrsGreen(330, 286, .85, 'wow', 'up') + G(290, 284, 1, path('M-14 -4 L10 -4 L14 -20 L-10 -20Z', '#4a90d9', 2.5) + path('M14 -16 L30 -28', 'none', 4) + path('M-10 -18 q-10 -6 -4 -12', 'none', 2.5), false, 18) + G(270, 270, .9, path('M0 0 q6 -6 12 0 M4 8 q6 -6 12 0', 'none', 2.5, 'stroke="#86cdf2"'))),
    },
    {
      text: 'Next, the moose stops in front of the bakery. The bakery smells like warm bread and muffins. Mr. Roy, the baker, looks out the window. He has flour on his nose. People want to buy bread, but the moose is standing in front of the door. Nobody can go in! “Oh no,” says Mr. Roy. “Who will eat my muffins?”',
      svg: svg(street(232, maple(30, 205, .8) + bakery(200, 216, 1.45) + maple(380, 205, .8))  + moose(220, 296, .98) + baker(80, 296, .72, 'worried', 'hold', { extra: ell(0, -48, 14, 7, '#d9a05b', 2.4) }) + adult(345, 296, .7, { skin: SKIN.brown, hair: '#2a1d14', hs: 'curly', shirt: '#4a90d9', pants: '#3f5a8a', face: 'worried', arms: 'hips' })),
    },
    {
      text: 'Then the yellow school bus comes down the street. The moose walks into the middle of the road and stops. Ms. Patel, the bus driver, does not honk. She stops the bus and waits. “We must be patient,” she tells the children. All the children press their noses on the windows to see the moose.',
      svg: svg(street(222, maple(60, 200, .8) + library(210, 200, .7) + maple(350, 200, .85)) + busW(140, 288, 1.15) + moose(330, 290, .82, { flip: true }) + leaves(8, 21, 240, 300)),
    },
    {
      text: 'At the corner, Mrs. Lee, the crossing guard, holds up her big red stop sign. Lucas and his friends are on the sidewalk, ready to cross the street. “Stop, children! Stay with me,” says Mrs. Lee. “Do not go near the moose. It is big and strong, and it is scared too.” The children wait behind her.',
      svg: svg(street(210, maple(100, 186, .7) + house(220, 186, .6, '#f4c27a', '#d9534f') + maple(330, 188, .7)) + rect(0, 210, 120, 90, '#d9d6cf', 0) + line(120, 210, 120, 300) + [0, 1, 2, 3, 4].map((i) => rect(150 + i * 26, 226, 16, 70, '#fff', 0, 2, 'opacity=".85"')).join('') + moose(336, 262, .58, { flip: true }) + kid(26, 270, .62, { skin: SKIN.brown, hs: 'pigtails', hair: '#2a1d14', shirt: '#f78fb3', bottom: 'skirt', pants: '#9b59b6', face: 'wow' }) + kid(96, 276, .62, { skin: SKIN.peach, hs: 'curly', hair: '#e8a33c', shirt: '#f2c94c', face: 'worried' }) + lucas(60, 290, .7, 'wow', 'hold') + guard(165, 296, .9, 'mad', 'point', { R: [[44, -86], [48, -112]] }) + stopSign(214, 156, 1.1)),
    },
    {
      text: 'A police car arrives with its lights on. Officer Ben gets out. He holds up his hand, and all the cars stop. Nobody can drive on Maple Street now. Officer Ben talks on his radio. “Hello? We have a moose on Maple Street,” he says. “Please send the wildlife officer!”',
      svg: svg(street(222, maple(330, 200, .85) + maple(60, 200, .7) + bakery(190, 202, .6)) + policeCar(110, 272, 1.15) + officer(250, 292, .9, 'happy', 'up', { L: [[-34, -56], [-14, -62]], R: [[42, -88], [44, -118]], extra: rect(-22, -76, 13, 22, '#1a1a1a', 2, 3) + line(-12, -76, -10, -88, O, 2.5) + circ(-16, -68, 2, '#e6493f', 0) }) + G(380, 268, .6, rect(-60, -46, 90, 34, '#e6493f', 3, 8) + path('M-40 -46 L-30 -66 L10 -66 L20 -46', '#e6493f') + circ(-38, -12, 10, '#2e2a28') + circ(16, -12, 10, '#2e2a28')) + path('M226 184 q-10 -8 -2 -18 M218 190 q-16 -12 -4 -30', 'none', 2.5, 'stroke="#5a6a8a"')),
    },
    {
      text: 'Soon, a green truck parks near the bakery. Ms. Martin, the wildlife officer, gets out. Her job is to help wild animals. She is calm and quiet. She does not run, and she does not shout. She takes a big bag of red apples from her truck. “Hello, big friend,” she says softly. “Are you hungry?”',
      svg: svg(street(222, bakery(110, 202, .7) + maple(240, 200, .75) + maple(370, 200, .8)) + truck(100, 280, 1.05) + ranger(190, 292, .9, 'smile', 'hold', { extra: rect(-16, -64, 32, 26, '#c9a46a', 2.5, 4) + apple(-6, -64, .8) + apple(6, -66, .8) }) + moose(355, 292, .78, { flip: true, head: 'nod' }) + heart(262, 140, .8)),
    },
    {
      text: 'Ms. Martin puts an apple on the road. The moose sniffs it and eats it. Crunch! She walks slowly and puts down another apple, then another one. Step by step, the moose follows the apples. They walk past the park, past the swings and the little pond. Everybody watches and stays very quiet.',
      svg: svg(morning() + vg('gGr', '#8ed26c', '#62b04a') + rect(0, 140, 400, 80, 'url(#gGr)', 0) + line(0, 140, 400, 140) + tree(40, 180, .8) + swings(130, 196, .9) + tree(250, 170, .6) + pond(350, 190, 44) + road(222) + apple(130, 262, .9) + apple(46, 266, .9) + ranger(80, 292, .8, 'smile', 'point', { flip: true, legs: 'walk' }) + moose(255, 292, .72, { walk: true, flip: true })),
    },
    {
      text: 'At the library, Ms. Martin turns left. The moose turns left too. At the end of the street, there is a big green forest. Ms. Martin puts the last apple under a tall pine tree. The moose eats it, looks back at the town one more time, and walks into the forest. It is home again.',
      svg: svg(morning() + path('M-5 200 L-5 120 Q100 90 200 110 Q300 90 405 120 L405 200Z', '#5f9a6e', 0) + pine(200, 200, .9, '#2f7a55') + pine(250, 205, 1.1) + pine(310, 200, .95, '#2f7a55') + pine(370, 205, 1.15) + pine(400, 200, .8) + library(70, 205, .62) + vg('gGr', '#8ed26c', '#62b04a') + rect(130, 200, 280, 100, 'url(#gGr)', 0) + line(130, 200, 400, 200) + rect(0, 200, 130, 100, '#7d8590', 0) + path('M130 200 L130 300', 'none') + tufts(206, 296, 18, 7, '#4f9a43') + pine(330, 270, 1.15) + moose(260, 282, .78, { head: 'nod', flip: true }) + ranger(100, 290, .78, 'happy', 'wave') + apple(352, 272, .8) + fg('#3f8f4f')),
    },
    {
      text: 'Everybody on Maple Street claps and cheers. “Thank you, Ms. Martin!” The next day, Lucas brings a drawing to school for show-and-tell. It is a big brown moose with giant antlers, and all the helpers are in the picture too. “Who helped the moose?” asks his teacher. “Everybody!” says Lucas with a big smile.',
      svg: svg(floorRoom('#f3e6c8', '#c98f5c', 230) + rect(40, 30, 150, 90, '#2f5e4a', 4, 4) + path('M60 60 q20 -20 40 0 M120 50 l30 30 M60 96 h80', 'none', 2.5, 'stroke="#e8f6ea" opacity=".7"') + rect(250, 40, 110, 70, '#fff', 3, 4) + rect(258, 48, 94, 54, '#cfeeff', 0) + [0, 1, 2, 3].map((i) => rect(258 + i * 24, 76, 18, 26, ['#e6493f', '#4a90d9', '#f2c94c', '#3fae5a'][i], 0)).join('') + adult(330, 290, .85, { skin: SKIN.peach, hair: '#8a5a3b', hs: 'long', shirt: '#4a90d9', dress: true, face: 'happy', arms: 'hips' }) + lucas(175, 296, .88, 'grin', 'hold', { extra: rect(-62, -100, 124, 76, '#fffdf4', 3, 3) + G(-14, -36, .3, moose(0, 0, 1)) + G(34, -34, .22, '<g>' + adult(0, 0, 1, { shirt: '#6b8a3a', face: 'smile', skin: SKIN.dark, hair: '#1e140d', hs: 'ponytail' }) + '</g>') + G(50, -34, .22, adult(0, 0, 1, { shirt: '#2b3e6b', face: 'smile' })) + sun(-48, -86, 6) }) + kid(50, 296, .6, { skin: SKIN.brown, hs: 'pigtails', hair: '#2a1d14', shirt: '#f78fb3', face: 'laugh', arms: 'cheer', legs: 'sit' }) + kid(90, 296, .55, { skin: SKIN.peach, hs: 'curly', hair: '#e8a33c', shirt: '#f2c94c', face: 'laugh', arms: 'cheer', legs: 'sit' }) + heart(240, 150, .8) + sparkle(110, 150, .8)),
    },
  ],
  words: [
    { word: 'moose', emoji: '🫎', def: 'A very big wild animal with long legs. The male has wide, flat antlers.' },
    { word: 'antlers', emoji: '🦌', def: 'The big hard horns on the head of a moose or a deer.' },
    { word: 'neighbour', emoji: '🏡', def: 'A person who lives next to you or on your street.' },
    { word: 'bakery', emoji: '🥐', def: 'A shop where people make and sell bread and muffins.' },
    { word: 'crossing guard', emoji: '🛑', def: 'A person who helps children cross the street safely.' },
    { word: 'wildlife officer', emoji: '🌲', def: 'A person whose job is to help and protect wild animals.' },
    { word: 'patient', emoji: '⏳', def: 'Able to wait calmly without getting angry.' },
    { word: 'show-and-tell', emoji: '🖼️', def: 'A time at school when you show something and talk about it.' },
  ],
  quiz: [
    { q: 'Where do moose usually live?', options: ['In a bakery', 'In the forest', 'At school'], answer: 1 },
    { q: 'What does the moose eat in Mrs. Green’s garden?', options: ['Her flowers', 'Her bread', 'Her apples', 'Her hat'], answer: 0 },
    { q: 'Why does the bus driver stop the bus?', options: ['The bus is broken', 'The children are hungry', 'The moose is in the middle of the road'], answer: 2 },
    { q: 'Why is Ms. Martin calm and quiet with the moose?', options: ['So the moose does not get scared', 'Because she is tired', 'Because she is sick'], answer: 0 },
    { q: 'Where does the moose turn left?', options: ['At the bakery', 'At the park', 'At the library', 'At the school'], answer: 2 },
    { q: 'At the end, how does Lucas feel about the moose day?', options: ['Angry', 'Happy and proud', 'Bored'], answer: 1 },
  ],
};
