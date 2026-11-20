// en-the-hungry-bear — English storybook, level 1 (see docs/LIVRES.md; pictures use ./art/kit.js)
import { O, svg, vg, sky, ell, circ, rect, path, line, G, rnd, shadow, cloud, sun, tree, pine, bush, hills, lawn, fg, flower, heart, zzz, note, sparkle, tufts } from './art/kit.js';

// ---- local gradients (each picture is an isolated image, ids are safe) ----
const BD = '<defs>'
  + '<radialGradient id="gBear" cx=".38" cy=".3" r=".9"><stop offset="0" stop-color="#a8754a"/><stop offset="1" stop-color="#6e4526"/></radialGradient>'
  + '<radialGradient id="gMoose" cx=".38" cy=".3" r=".9"><stop offset="0" stop-color="#7a5236"/><stop offset="1" stop-color="#4a2f1c"/></radialGradient>'
  + '<radialGradient id="gRock" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#b9b4ad"/><stop offset="1" stop-color="#7f7a74"/></radialGradient>'
  + '<linearGradient id="gPond" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc8ee"/><stop offset="1" stop-color="#3f86c0"/></linearGradient>'
  + '</defs>';
const page = (b) => svg(BD + b);

// ---- characters ----
// Bear: brown, light belly, standing upright. face: happy|wow|sad|yuck|laugh|sleepy|eat ; arms: down|up|tummy|hold|wave
const bear = (x, y, s = 1, o = {}) => {
  const f = o.face || 'happy', a = o.arms || 'down', dy = o.sit ? 16 : 0, fur = 'url(#gBear)', paw = '#5a3820';
  const legs = o.sit
    ? ell(-24, -10, 16, 12, fur) + ell(24, -10, 16, 12, fur) + ell(-24, -10, 8, 7, '#e8c49a', 0) + ell(24, -10, 8, 7, '#e8c49a', 0) + [-30, -24, -18, 18, 24, 30].map((px) => circ(px, -19, 2.6, '#e8c49a', 0)).join('')
    : ell(-17, -8, 14, 10, fur) + ell(17, -8, 14, 10, fur) + path('M-24 -6 l3 4 M-17 -4 l0 5 M-10 -6 l-2 4 M10 -6 l2 4 M17 -4 l0 5 M24 -6 l-3 4', 'none', 2, `stroke="${paw}"`);
  const A = (cx, cy, r) => ell(cx, cy, 11, 23, fur, 3, `transform="rotate(${r} ${cx} ${cy})"`);
  const arms = { down: A(-38, -48, 18) + A(38, -48, -18), up: A(-44, -96, 150) + A(44, -96, -150), wave: A(-38, -48, 18) + A(44, -96, -150),
    tummy: A(-26, -48, -40) + A(26, -48, 40), hold: A(-24, -62, -60) + A(24, -62, 60), }[a] || '';
  const ey = -104;
  const eye = (cx) => f === 'sleepy' || f === 'laugh' ? path(f === 'laugh' ? `M${cx - 5} ${ey + 1} Q${cx} ${ey - 6} ${cx + 5} ${ey + 1}` : `M${cx - 5} ${ey} Q${cx} ${ey + 4} ${cx + 5} ${ey}`, 'none', 2.6)
    : f === 'yuck' ? path(`M${cx - 5} ${ey - 3} L${cx + 5} ${ey} L${cx - 5} ${ey + 3}`.replace(/L(\S+) (\S+) L/, cx < 0 ? 'L$1 $2 L' : 'L$1 $2 L'), 'none', 2.6, cx > 0 ? `transform="scale(-1 1) translate(${-2 * cx} 0)"` : '')
      : f === 'wow' ? circ(cx, ey, 5.5, '#fff', 2) + circ(cx, ey + .5, 2.6, O, 0) : ell(cx, ey, 3.4, 4.2, O, 0) + circ(cx - 1.2, ey - 1.5, 1.3, '#fff', 0);
  const brow = f === 'sad' ? path(`M-17 ${ey - 9} L-7 ${ey - 13} M17 ${ey - 9} L7 ${ey - 13}`, 'none', 2.4) : '';
  const m = -84;
  const mouth = { happy: path(`M-7 ${m} Q0 ${m + 6} 7 ${m}`, 'none', 2.6), wow: ell(0, m + 3, 5, 6, '#7a2f3f', 2.2), sad: path(`M-6 ${m + 4} Q0 ${m - 2} 6 ${m + 4}`, 'none', 2.6),
    yuck: path(`M-8 ${m + 1} Q0 ${m - 2} 8 ${m + 1}`, 'none', 2.6) + path(`M-1 ${m} q4 10 9 2Z`, '#ff8fa3', 2), laugh: path(`M-9 ${m - 2} Q0 ${m + 12} 9 ${m - 2}Z`, '#7a2f3f', 2.4), sleepy: ell(0, m + 2, 3, 2.4, '#7a2f3f', 2), eat: path(`M-9 ${m - 1} Q0 ${m + 9} 9 ${m - 1}`, 'none', 2.6) + ell(-17, m - 2, 6, 4, '#c68a5a', 0) + ell(17, m - 2, 6, 4, '#c68a5a', 0) }[f] || '';
  const head = circ(-25, -122, 11, fur) + circ(25, -122, 11, fur) + circ(-25, -122, 5, '#e8c49a', 0) + circ(25, -122, 5, '#e8c49a', 0) + circ(0, -100, 31, fur) + ell(-18, -90, 6, 3.5, '#ff8fa3', 0, 'opacity=".55"') + ell(18, -90, 6, 3.5, '#ff8fa3', 0, 'opacity=".55"')
    + ell(0, -88, 15, 11, '#e8c49a', 2.5) + ell(0, -94, 6.5, 4.5, O, 0) + circ(-2, -95.5, 1.5, '#fff', 0) + eye(-12) + eye(12) + brow + mouth;
  const body = ell(0, -50, 38 + (o.full ? 6 : 0), 42 + (o.full ? 4 : 0), fur) + ell(0, -44, 24 + (o.full ? 6 : 0), 29, '#d9a877', 0) + path('M24 -80 Q40 -60 34 -26', 'none', 0) + ell(14, -60, 14, 20, '#000', 0, 'opacity=".08"');
  const front = ['hold', 'tummy'].includes(a);
  return G(x, y, s, shadow(0, 0, 42, 7) + legs + `<g transform="translate(0 ${dy})">` + (front ? body + arms : arms + body) + head + (o.extra || '') + '</g>', !!o.flip, o.rot || 0);
};
const grr = (x, y, s = 1) => G(x, y, s, path('M0 0 l6 -6 l6 6 l6 -6 l6 6 M4 12 l6 -6 l6 6 l6 -6 l6 6', 'none', 3, 'stroke="#e6493f"'));
// Rabbit: grey-brown, sitting
const rabbit = (x, y, s = 1, o = {}) => { const c = '#cdbba6'; return G(x, y, s, shadow(0, 0, 22, 4) + ell(14, -10, 8, 7, '#fff', 2.5) + ell(0, -22, 19, 22, c) + ell(0, -16, 10, 14, '#f3ebe0', 0) + ell(-9, -3, 9, 5, c, 2.5) + ell(9, -3, 9, 5, c, 2.5)
  + ell(-7, -76, 6, 20, c, 3, 'transform="rotate(-10 -7 -76)"') + ell(8, -76, 6, 20, c, 3, 'transform="rotate(12 8 -76)"') + ell(-7, -76, 2.6, 13, '#ffb3c1', 0, 'transform="rotate(-10 -7 -76)"') + ell(8, -76, 2.6, 13, '#ffb3c1', 0, 'transform="rotate(12 8 -76)"')
  + circ(0, -50, 16, c) + circ(-6, -52, 2.6, O, 0) + circ(6, -52, 2.6, O, 0) + circ(-7, -53, .9, '#fff', 0) + circ(5, -53, .9, '#fff', 0) + ell(0, -45, 3, 2, '#ff8fa3', 1.5) + path('M0 -43 q-3 4 -6 2 M0 -43 q3 4 6 2', 'none', 1.6) + rect(-2.5, -41, 5, 4, '#fff', 1.4, 1)
  + path('M-6 -45 l-12 -2 M-6 -43 l-12 2 M6 -45 l12 -2 M6 -43 l12 2', 'none', 1) + ell(-11, -45, 4, 2.6, '#ff8fa3', 0, 'opacity=".6"') + ell(11, -45, 4, 2.6, '#ff8fa3', 0, 'opacity=".6"') + (o.extra || ''), !!o.flip); };
const carrot = (x, y, s = 1, rot = 0) => G(x, y, s, path('M-5 0 L5 0 L0 30Z', '#f28c28', 2.5) + path('M-2 8 l3 0 M-1 16 l3 0', 'none', 1.5) + path('M0 0 l-6 -10 M0 0 l0 -12 M0 0 l6 -10', 'none', 3, 'stroke="#3f8f4f"'), false, rot);
// Squirrel: red-brown, big tail
const squirrel = (x, y, s = 1, o = {}) => { const c = '#c8662e'; return G(x, y, s, shadow(0, 0, 18, 3) + path('M8 -8 Q40 -10 34 -44 Q30 -70 10 -66 Q26 -56 22 -40 Q18 -24 4 -20Z', c) + path('M18 -40 Q28 -52 18 -60', 'none', 2, 'stroke="#e6955a"') + ell(0, -20, 13, 17, c) + ell(0, -16, 7, 11, '#f6dcae', 0)
  + ell(-6, -2, 6, 4, c, 2.5) + ell(6, -2, 6, 4, c, 2.5) + path('M-11 -50 L-9 -62 L-3 -52Z M11 -50 L9 -62 L3 -52Z', c, 2.5) + circ(0, -44, 12, c) + ell(0, -40, 6, 4.5, '#f6dcae', 0) + circ(-5, -46, 2.3, O, 0) + circ(5, -46, 2.3, O, 0) + circ(-5.6, -47, .8, '#fff', 0) + circ(4.4, -47, .8, '#fff', 0) + circ(0, -41, 1.8, O, 0) + path('M-3 -37 q3 2 6 0', 'none', 1.5) + (o.extra || ''), !!o.flip); };
const nut = (x, y, s = 1) => G(x, y, s, ell(0, 2, 6, 7, '#a8703a', 2) + path('M-6 -1 Q0 -9 6 -1Z', '#6b4329', 2) + line(0, -6, 0, -9, O, 2));
// Beaver: brown with flat tail and big teeth
const beaver = (x, y, s = 1, o = {}) => { const c = '#9a6a43'; return G(x, y, s, shadow(0, 0, 26, 4) + ell(22, -6, 22, 8, '#5a4636', 2.5, 'transform="rotate(-10 22 -6)"') + path('M10 -6 l8 -5 M20 -4 l8 -6 M30 -6 l6 -4', 'none', 1.6, 'stroke="#8a7460"') + ell(0, -26, 22, 26, c) + ell(0, -20, 13, 17, '#e3c28f', 0)
  + ell(-9, -2, 8, 5, '#5a4636', 2.5) + ell(9, -2, 8, 5, '#5a4636', 2.5) + circ(-15, -70, 6, c) + circ(15, -70, 6, c) + circ(0, -56, 19, c) + ell(0, -48, 10, 8, '#e3c28f', 0) + circ(-7, -60, 2.8, O, 0) + circ(7, -60, 2.8, O, 0) + circ(-8, -61, 1, '#fff', 0) + circ(6, -61, 1, '#fff', 0)
  + ell(0, -52, 5, 3.5, '#3a2a2a', 0) + rect(-4.5, -47, 4.5, 8, '#fff', 1.8, 1) + rect(0, -47, 4.5, 8, '#fff', 1.8, 1) + ell(-13, -50, 4, 2.6, '#ff8fa3', 0, 'opacity=".6"') + ell(13, -50, 4, 2.6, '#ff8fa3', 0, 'opacity=".6"') + (o.extra || ''), !!o.flip); };
const sticks = (x, y, s = 1) => G(x, y, s, line(-16, -8, 16, 6, '#8a5a3b', 5) + line(-14, 4, 18, -6, '#a8703a', 5) + line(-10, -2, 14, -2, '#7a4b2a', 4) + path('M10 -5 l6 -6', 'none', 2.5, 'stroke="#3f8f4f"'));
// Moose: side view facing left (flip = face right). plants: water plants hanging from the mouth
const moose = (x, y, s = 1, o = {}) => { const c = 'url(#gMoose)', d = '#4a2f1c', ant = '#d8b98a'; return G(x, y, s, shadow(0, 0, 70, 7)
  + [[-40, 0], [-24, 2], [34, 0], [50, 2]].map(([lx, k]) => rect(lx - 6, -96 + k, 12, 96 - k, d, 3, 4) + rect(lx - 7, -8, 14, 8, '#2a1d14', 2.5, 2)).join('')
  + ell(4, -112, 64, 34, c) + path('M-40 -134 Q-30 -150 -10 -144 Q-20 -120 -40 -110Z', c, 0) + path('M60 -118 q14 -2 12 16', 'none', 4, `stroke="${d}"`)
  + path('M-34 -128 Q-58 -150 -76 -138 L-104 -110 Q-110 -98 -96 -94 L-74 -100 Q-58 -102 -42 -104Z', c) + ell(-98, -102, 9, 8, '#6b4a35', 2.5) + ell(-102, -104, 2.4, 2, O, 0)
  + path('M-62 -100 q-4 22 6 26 q6 -12 4 -26Z', d, 2.5) + ell(-66, -132, 10, 5, d, 2.5, 'transform="rotate(-30 -66 -132)"') + circ(-76, -124, 3, O, 0) + circ(-77, -125, 1, '#fff', 0) + path('M-80 -130 l8 -2', 'none', 2)
  + path('M-62 -140 Q-74 -170 -50 -178 L-44 -168 L-38 -180 L-30 -168 L-22 -176 L-22 -160 Q-30 -146 -56 -138Z', ant) + path('M-64 -140 Q-92 -160 -96 -176 L-88 -172 L-92 -184 L-80 -174 L-80 -186 L-70 -170 Q-64 -156 -60 -146Z', ant)
  + (o.plants ? path('M-104 -96 q-2 14 -8 22 M-98 -94 q2 16 -2 26 M-92 -96 q6 12 4 22', 'none', 3.5, 'stroke="#4fae5a"') + circ(-110, -76, 3, '#4fae5a', 0) + circ(-100, -68, 3, '#4fae5a', 0) : '') + (o.happy ? path('M-102 -94 q6 4 12 0', 'none', 2) : ''), !!o.flip); };
// Otter: sleek, standing on its tail
const otter = (x, y, s = 1, o = {}) => { const c = '#6b4a35'; return G(x, y, s, shadow(0, 0, 22, 4) + path('M8 -4 Q36 0 44 -10 Q30 6 4 6Z', c, 2.5) + ell(0, -36, 15, 36, c) + ell(0, -32, 9, 26, '#c9a77f', 0) + ell(-8, -2, 8, 4, c, 2.5) + ell(8, -2, 8, 4, c, 2.5)
  + circ(-11, -86, 4.5, c, 2.5) + circ(11, -86, 4.5, c, 2.5) + circ(0, -76, 15, c) + ell(0, -70, 10, 7, '#e3c9a2', 0) + circ(-6, -80, 2.6, O, 0) + circ(6, -80, 2.6, O, 0) + circ(-6.8, -81, .9, '#fff', 0) + circ(5.2, -81, .9, '#fff', 0) + ell(0, -73, 3.6, 2.6, O, 0) + path('M-3 -68 q3 3 6 0', 'none', 1.6)
  + path('M-5 -71 l-12 -2 M-5 -69 l-12 2 M5 -71 l12 -2 M5 -69 l12 2', 'none', 1) + (o.extra || ''), !!o.flip); };
const fish = (x, y, s = 1, rot = 0) => G(x, y, s, path('M18 0 L30 -10 L30 10Z', '#6fa8d6', 2.5) + ell(0, 0, 20, 10, '#9cc7ee', 2.5) + path('M-4 -8 q4 8 0 16', 'none', 2, 'stroke="#6fa8d6"') + circ(-11, -2, 2.2, O, 0) + path('M-8 -9 q10 -6 18 0', 'none', 2, 'stroke="#fff" opacity=".7"'), false, rot);
// Bird: little blue bird
const bird = (x, y, s = 1, o = {}) => G(x, y, s, (o.fly ? path('M-4 -4 Q-14 -26 -26 -18 Q-16 -10 -6 2Z', '#4a90d9', 2.5) : '') + ell(0, 0, 13, 11, '#5aa5ff') + ell(3, 4, 7, 5, '#cfe8ff', 0) + path('M-12 2 L-22 -2 L-20 8Z', '#4a90d9', 2.5) + circ(5, -3, 2.2, O, 0) + path('M12 -2 L20 0 L12 3Z', '#f7b733', 2) + (o.fly ? path('M2 -6 Q6 -28 20 -24 Q12 -12 6 -2Z', '#4a90d9', 2.5) : ell(-3, 1, 7, 5, '#4a90d9', 2.5)) + (o.fly ? '' : line(-2, 10, -3, 16, O, 2) + line(3, 10, 3, 16, O, 2)), !!o.flip);
// ---- scenery ----
const spring = (sx = 335) => sky('#86cdf2', '#eef9ff') + sun(sx, 50, 22) + cloud(sx < 150 ? 170 : 80, 56) + cloud(sx < 150 ? 300 : 230, 34, .8);
const snowPatch = (x, y, w) => ell(x, y, w, w * .16, '#fff', 2, 'opacity=".95"');
const ground = (y = 205, seed = 3) => lawn(y, '#9ad874', '#63b04a') + pine(25, y + 4, .7, '#3f8f63') + pine(378, y + 2, .8, '#2f7a52');
const cave = (x, y, s = 1) => G(x, y, s, path('M-110 0 Q-120 -110 -20 -130 Q80 -140 110 -40 L116 0Z', 'url(#gRock)') + path('M-40 0 Q-46 -76 4 -80 Q52 -78 50 0Z', '#3e3a3a') + path('M-30 0 Q-34 -60 4 -66 Q40 -62 40 0Z', '#2a2626', 0) + path('M-90 -60 q20 -10 30 4 M60 -90 q20 4 24 24 M-60 -110 q16 -6 30 -2', 'none', 2.5, 'stroke="#8f8a84"') + ell(-60, -118, 34, 8, '#fff', 2) + ell(70, -100, 26, 6, '#fff', 2));
const pond = (x, y, rx, ry) => ell(x, y, rx, ry, 'url(#gPond)') + ell(x - rx * .3, y - ry * .3, rx * .4, ry * .14, '#fff', 0, 'opacity=".45"') + path(`M${x - rx * .5} ${y + ry * .3} q10 -5 20 0 M${x + rx * .2} ${y + ry * .1} q10 -5 20 0`, 'none', 2, 'stroke="#fff" opacity=".7"');
const reeds = (x, y) => [0, 8, 16].map((i) => line(x + i, y, x + i - 3, y - 30 - i, '#4f9a43', 3) + ell(x + i - 3, y - 34 - i, 3.5, 8, '#8a5a3b', 2)).join('');
const berryBush = (x, y, s = 1) => G(x, y, s, `${shadow(0, 0, 60, 8)}${circ(-34, -30, 30, '#4fa04a')}${circ(34, -30, 30, '#4fa04a')}${circ(0, -52, 36, '#58a84f')}<g stroke="none">${circ(-34, -30, 28.5, '#4fa04a', 0)}${circ(34, -30, 28.5, '#4fa04a', 0)}${circ(0, -52, 34.5, '#58a84f', 0)}${rect(-34, -40, 68, 40, '#58a84f', 0)}</g>` + Array.from({ length: 16 }, (_, i) => circ(Math.round(-50 + rnd(i + 3) * 100), Math.round(-74 + rnd(i + 30) * 66), 5, '#d6334a', 2)).join(''));
const rock = (x, y, w = 60, h = 34) => path(`M${x - w} ${y} Q${x - w} ${y - h} ${x - w * .3} ${y - h} Q${x + w * .6} ${y - h - 6} ${x + w} ${y}Z`, 'url(#gRock)') + path(`M${x - w * .5} ${y - h * .6} q${w * .3} -8 ${w * .6} 0`, 'none', 2, 'stroke="#d4d0ca"');
const splash = (x, y) => path(`M${x - 30} ${y} q-8 -20 -2 -32 M${x - 14} ${y - 4} q-2 -26 6 -36 M${x + 14} ${y - 4} q2 -26 -6 -36 M${x + 30} ${y} q8 -20 2 -32`, 'none', 3, 'stroke="#fff"') + [[-36, -40], [-10, -50], [14, -48], [38, -38]].map(([a, b]) => circ(x + a, y + b, 4, '#cfeaff', 2)).join('');
const blanket = (x, y, w = 220, h = 50) => `<clipPath id="bl"><path d="M${x - w / 2} ${y} L${x + w / 2} ${y} L${x + w / 2 + 30} ${y + h} L${x - w / 2 - 30} ${y + h}Z"/></clipPath>` + path(`M${x - w / 2} ${y} L${x + w / 2} ${y} L${x + w / 2 + 30} ${y + h} L${x - w / 2 - 30} ${y + h}Z`, '#fff') + `<g clip-path="url(#bl)">${Array.from({ length: 12 }, (_, i) => rect(x - w / 2 - 40 + i * 26, y - 4, 13, h + 8, '#e6493f', 0, 0, 'opacity=".75"')).join('')}${[0, 1].map((i) => rect(x - w / 2 - 40, y + 6 + i * 22, w + 80, 10, '#e6493f', 0, 0, 'opacity=".45"')).join('')}</g>` + path(`M${x - w / 2} ${y} L${x + w / 2} ${y} L${x + w / 2 + 30} ${y + h} L${x - w / 2 - 30} ${y + h}Z`, 'none');
const plate = (x, y, inner) => ell(x, y, 20, 6, '#fff', 2.5) + inner;
const butterfly = (x, y, c = '#ffb84d') => G(x, y, 1, ell(-6, -3, 6, 5, c, 1.8) + ell(6, -3, 6, 5, c, 1.8) + ell(-5, 4, 4, 3.5, c, 1.8) + ell(5, 4, 4, 3.5, c, 1.8) + line(0, -5, 0, 6, O, 2));
const flowers = (seed = 1) => [0, 1, 2, 3, 4, 5].map((i) => flower(Math.round(40 + rnd(i + seed) * 320), Math.round(240 + rnd(i + seed + 9) * 55), ['#ff7aa8', '#ffd84d', '#b48cf0'][i % 3])).join('');

export const book = {
  id: 'en-the-hungry-bear',
  title: 'The Hungry Bear',
  emoji: '🐻',
  level: 1,
  minutes: 5,
  cover: page(spring(335) + ground(205) + flowers(2) + tree(90, 215, .9) + berryBush(330, 232, .7) + bear(200, 278, 1.15, { face: 'wow', arms: 'tummy' }) + grr(242, 196, .9)
    + rabbit(80, 284, .9, { extra: carrot(16, -26, .8, -30) }) + squirrel(300, 290, .9) + bird(120, 110, 1.1, { fly: true })),
  pages: [
    {
      text: 'It is spring in the forest. The snow is melting. The birds sing. In a big cave, Bear opens his eyes. He sleeps all winter long. Now he is awake! He stretches. “Good morning, forest!” says Bear. Then his tummy makes a big noise. GRRR!',
      svg: page(spring(340) + ground(210) + snowPatch(300, 250, 60) + snowPatch(90, 280, 40) + cave(140, 225, 1.05) + bear(146, 252, .95, { face: 'sleepy', arms: 'up' }) + grr(186, 200, .8)
        + bird(300, 120, 1, { fly: true }) + bird(250, 168, .8, {}) + note(330, 110, 1) + note(272, 140, .8) + tufts(230, 296, 12, 4)),
    },
    {
      text: '“Oh my,” says Bear. “I am hungry. I am VERY hungry!” Bear walks out of his cave. His tummy says GRRR again. He looks left. He looks right. “I need some food,” says Bear. “Who can help me?”',
      svg: page(spring(60) + ground(205) + flowers(5) + cave(60, 220, .8) + tree(330, 215, .9) + bush(260, 222, .7) + snowPatch(330, 262, 30)
        + bear(205, 280, 1.15, { face: 'wow', arms: 'tummy' }) + grr(248, 200, 1) + grr(140, 210, .7) + path('M160 120 q-10 -8 0 -16 M250 120 q10 -8 0 -16', 'none', 2.5, 'stroke="#5a6a8a"')),
    },
    {
      text: 'Bear sees Rabbit. “Hello, Rabbit! I am so hungry!” Rabbit gives Bear a carrot. “Here, Bear. I love carrots!” Bear eats the carrot. Crunch! But it is very small. “Thank you, Rabbit. But my tummy says GRRR!”',
      svg: page(spring(335) + ground(205) + flowers(7) + tree(60, 215, .9) + bush(340, 225, .8) + rect(240, 228, 80, 30, '#8a5a3b', 2.5, 4) + [0, 1, 2, 3].map((i) => carrot(252 + i * 18, 232, .6, 180) + path(`M${252 + i * 18} 230 l-4 -8 M${252 + i * 18} 230 l4 -8`, 'none', 2.5, 'stroke="#3f8f4f"')).join('')
        + bear(150, 282, 1.1, { face: 'eat', arms: 'hold', extra: carrot(0, -62, .55, -70) }) + rabbit(285, 288, 1.1, { face: 'happy' }) + grr(196, 206, .8)),
    },
    {
      text: 'Bear sees Squirrel in a tree. “Hello, Squirrel! I am so hungry!” Squirrel gives Bear three nuts. “Here, Bear. I love nuts!” Bear eats the nuts. Crack, crack, crack! But they are very, very small. “Thank you, Squirrel. But my tummy says GRRR!”',
      svg: page(spring(60) + ground(210) + flowers(9) + G(300, 222, 1.5, `${shadow(0, 0, 34)}${path('M-9 0 L-7 -120 L7 -120 L9 0Z', '#8a5a3b')}${path('M2 -80 L-60 -96', 'none', 9, 'stroke="#8a5a3b"')}${circ(0, -140, 40, '#69b85f')}${circ(-30, -118, 26, '#69b85f')}${circ(28, -120, 26, '#69b85f')}<g stroke="none">${circ(0, -140, 38.5, '#69b85f', 0)}${circ(-30, -118, 24.5, '#69b85f', 0)}${circ(28, -120, 24.5, '#69b85f', 0)}${rect(-28, -130, 56, 18, '#69b85f', 0)}</g>${circ(-12, -154, 9, '#a2dd8f', 0)}`)
        + squirrel(232, 82, .95, { extra: nut(-12, -24, .9) })
        + bear(140, 284, 1.1, { face: 'happy', arms: 'hold', extra: nut(-8, -64, .8) + nut(6, -66, .8) + nut(0, -56, .8) }) + grr(182, 208, .8)),
    },
    {
      text: 'Bear sees Beaver at the pond. “Hello, Beaver! I am so hungry!” Beaver gives Bear some sticks. “Here, Bear. I love sticks! They are yummy!” Bear looks at the sticks. “Sticks? No, thank you!” Bear laughs. “Bears do not eat sticks!” GRRR!',
      svg: page(spring(335) + hills(200) + rect(-5, 200, 410, 100, '#8ed26c', 0) + line(-5, 200, 405, 200) + pond(250, 250, 170, 44) + G(330, 240, 1, path('M-50 0 Q-40 -46 0 -48 Q40 -46 50 0Z', '#9a6a43') + path('M-40 -10 L30 -30 M-30 -30 L40 -14 M-20 -40 L20 -6 M-44 -4 L44 -6', 'none', 4, 'stroke="#6f4829"')) + reeds(80, 236)
        + bear(110, 284, 1.05, { face: 'laugh', arms: 'down' }) + beaver(220, 284, 1.15, { extra: sticks(-26, -36, 1) }) + grr(150, 212, .7) + path('M60 140 q-6 -8 0 -14 M150 132 q6 -8 0 -14', 'none', 2.5, 'stroke="#5a6a8a"')),
    },
    {
      text: 'Bear sees Moose in the lake. Moose has a big mouth full of green water plants. “Hello, Moose! I am so hungry!” “Here, Bear,” says Moose. “Eat some plants. They are wet and green!” Bear tries one. “Yuck! No, thank you!”',
      svg: page(spring(60) + hills(200, '#bfe0c8', '#9ccf8a') + pine(370, 200, .6) + pine(30, 200, .7) + rect(-5, 196, 410, 110, 'url(#gPond)', 0) + line(-5, 196, 405, 196)
        + moose(250, 262, .95, { plants: true }) + rect(-5, 236, 410, 70, 'url(#gPond)', 0) + path('M140 238 q10 -5 20 0 M300 240 q10 -5 20 0 M200 250 q10 -5 20 0', 'none', 2, 'stroke="#fff" opacity=".7"') + path('M170 236 Q260 230 360 238', 'none', 2.5, 'stroke="#fff" opacity=".6"')
        + path('M-5 250 Q60 236 130 252 L130 305 L-5 305Z', '#8ed26c') + bear(68, 290, 1, { face: 'yuck', arms: 'hold', extra: path('M-4 -60 q-6 16 2 26 M2 -60 q4 14 -2 24', 'none', 3.5, 'stroke="#4fae5a"') })),
    },
    {
      text: 'Bear sits down on a big rock. He is sad. “I am too hungry,” he says. Splash! Otter jumps out of the river. Otter has a big, shiny fish. “Here, Bear. Fish is good for bears!” Bear smiles. “Yes, please! Thank you, Otter!”',
      svg: page(spring(335) + hills(190) + rect(-5, 186, 410, 30, '#8ed26c', 0) + path('M-5 210 Q200 196 405 214 L405 270 Q200 256 -5 272Z', 'url(#gPond)') + path('M40 236 q12 -5 24 0 M160 226 q12 -5 24 0', 'none', 2, 'stroke="#fff" opacity=".7"') + path('M-5 268 Q200 254 405 270 L405 305 L-5 305Z', '#8ed26c') + line(-5, 268, 405, 270, O, 0)
        + rock(110, 286, 70, 36) + bear(110, 268, .95, { face: 'happy', sit: true, arms: 'down' }) + otter(290, 250, 1.1, { extra: fish(0, -48, .9) }) + splash(290, 252) + fg()),
    },
    {
      text: 'Bear eats the fish. Yum! Then a little blue bird sings, “Tweet, tweet! Follow me, Bear!” Bird flies to a big bush. The bush is full of red berries. “Berries!” says Bear. “I love berries!” Bear eats one, two, three… ten berries!',
      svg: page(spring(60) + ground(205) + flowers(11) + tree(370, 210, .8) + berryBush(270, 262, 1.15) + bird(230, 120, 1.2, { fly: true }) + note(270, 110, 1) + note(196, 96, .8)
        + bear(120, 284, 1.1, { face: 'eat', arms: 'hold', extra: circ(-4, -60, 5, '#d6334a', 2) + circ(5, -64, 5, '#d6334a', 2) + circ(4, -55, 5, '#d6334a', 2) }) + G(60, 288, 1, line(-20, 0, 16, 0, '#e9eef3', 3) + path('M-12 -6 v12 M-4 -7 v14 M4 -7 v14', 'none', 2.5, 'stroke="#e9eef3"') + path('M16 0 l10 -8 v16Z', '#e9eef3', 2) + circ(-22, 0, 5, '#e9eef3', 2))),
    },
    {
      text: 'Rabbit, Squirrel, Beaver, Moose, Otter and Bird all come. “Let’s have a picnic!” says Rabbit. Everyone brings food. Carrots, nuts, fish, berries… and sticks for Beaver! The friends sit in the sun. They eat and they laugh together.',
      svg: page(spring(340) + ground(196) + moose(330, 222, .62, { happy: true }) + blanket(200, 238, 200, 46)
        + plate(150, 262, [0, 1, 2].map((i) => carrot(140 + i * 10, 254, .45, -100)).join('')) + plate(205, 254, nut(198, 248, .7) + nut(210, 250, .7)) + plate(250, 266, fish(250, 260, .55)) + plate(190, 278, [0, 1, 2, 3].map((i) => circ(182 + i * 6, 274, 4, '#d6334a', 1.8)).join(''))
        + bear(200, 230, .85, { face: 'laugh', sit: true, arms: 'up' }) + rabbit(60, 290, .9) + squirrel(110, 292, .85, { extra: nut(-10, -22, .8) }) + beaver(300, 292, .95, { extra: sticks(-20, -32, .8) }) + otter(360, 292, .85, { flip: true, extra: fish(0, -48, .6) }) + bird(120, 120, 1, { fly: true }) + heart(270, 130, .9) + heart(140, 160, .7)),
    },
    {
      text: 'Bear’s tummy is big and round now. It does not say GRRR. “Thank you, friends!” says Bear. “I am not hungry now…” Bear yawns a big yawn. “I am sleepy!” And Bear falls asleep in the warm sun. The friends smile. Shhh!',
      svg: page(sky('#ffd9a0', '#fff3d6') + sun(330, 60, 26) + cloud(90, 60, 1, '#fff6e6') + ground(205) + flowers(13) + tree(370, 210, .8) + berryBush(52, 226, .6)
        + bear(200, 268, 1.1, { face: 'sleepy', sit: true, full: true, arms: 'tummy', rot: -6 }) + zzz(250, 120, 1.4)
        + rabbit(90, 292, .85) + squirrel(130, 294, .8) + beaver(290, 292, .9) + otter(345, 292, .85, { flip: true }) + bird(300, 160, .9) + butterfly(140, 160)),
    },
  ],
  words: [
    { word: 'hungry', emoji: '😋', def: 'When you want to eat food.' },
    { word: 'cave', emoji: '🪨', def: 'A big hole in a rock or a hill. Bears sleep in caves.' },
    { word: 'tummy', emoji: '🫃', def: 'Your belly. Food goes in your tummy.' },
    { word: 'stretch', emoji: '🙆', def: 'To make your arms and legs long after you sleep.' },
    { word: 'berries', emoji: '🍓', def: 'Small, sweet fruits that grow on bushes.' },
    { word: 'picnic', emoji: '🧺', def: 'A meal you eat outside with friends or family.' },
    { word: 'sleepy', emoji: '😴', def: 'When you want to sleep.' },
    { word: 'yawn', emoji: '🥱', def: 'To open your mouth big when you are tired.' },
  ],
  quiz: [
    { q: 'What season is it at the start of the story?', options: ['Winter', 'Spring', 'Fall'], answer: 1 },
    { q: 'Where does Bear sleep all winter?', options: ['In a tree', 'In a cave', 'In the lake'], answer: 1 },
    { q: 'What does Rabbit give Bear?', options: ['A carrot', 'A fish', 'Some nuts', 'Some sticks'], answer: 0 },
    { q: 'Why does Bear say “No, thank you” to Beaver?', options: ['Bears do not eat sticks', 'The sticks are wet', 'Bear is not hungry'], answer: 0 },
    { q: 'Who helps Bear find the berries?', options: ['Moose', 'Otter', 'Bird'], answer: 2 },
    { q: 'How does Bear feel at the end?', options: ['Hungry and sad', 'Full and sleepy', 'Cold and angry'], answer: 1 },
  ],
};
