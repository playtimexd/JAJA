// Recurring cast + props for the Chinese storybooks (same family in every book, so the child recognises them).
// 小雨 Xiǎoyǔ (girl, 7, red coat, buns) · 弟弟 (little brother, blue) · 妈妈 · 爸爸 (glasses) · 外婆 (grey bun, purple) · 爷爷 / 奶奶 (on video calls)
import { O, G, circ, ell, rect, path, line, limb, shadow, rnd, star, kid, adult, person } from './kit.js';

// w = winter clothes (coat, tuque, scarf)
export const yu = (x, y, s = 1, o = {}) => kid(x, y, s, { hair: 'buns', hairC: '#2b2b36', top: '#e9566f', bottom: '#3f6fb5', shoes: '#7a4a3a', ...(o.w ? { coat: true, hat: 'tuque', hatC: '#e8433a', scarf: '#ffd23f' } : {}), ...o });
export const didi = (x, y, s = 1, o = {}) => kid(x, y, s * 0.82, { hair: 'boy', hairC: '#2b2b36', top: '#4f8fd6', bottom: '#3a4a6a', shoes: '#4a4a5a', ...(o.w ? { coat: true, hat: 'tuque', hatC: '#4f8fd6', scarf: '#7cc36a' } : {}), ...o });
export const mama = (x, y, s = 1, o = {}) => adult(x, y, s, { hair: 'mom', hairC: '#2b2b36', top: '#7cc36a', bottom: '#4a5a8a', ...(o.w ? { coat: true, top: '#3fa07a', scarf: '#ff8fa3' } : {}), ...o });
export const baba = (x, y, s = 1, o = {}) => adult(x, y, s, { hair: 'dad', hairC: '#2b2b36', top: '#f2a65a', bottom: '#4a4a5a', glasses: true, ...(o.w ? { coat: true, top: '#5a6fa8', hat: 'tuque', hatC: '#f2a65a', scarf: '#e9566f' } : {}), ...o });
export const waipo = (x, y, s = 1, o = {}) => adult(x, y, s, { hair: 'grandma', hairC: '#c9ced8', top: '#9b6fc7', bottom: '#5a4a6a', ...(o.w ? { coat: true, top: '#8a5fb5', scarf: '#ffd23f' } : {}), ...o });
export const yeye = (x, y, s = 1, o = {}) => adult(x, y, s, { hair: 'grandpa', hairC: '#c9ced8', top: '#c8553d', bottom: '#4a4a5a', ...o });
export const nainai = (x, y, s = 1, o = {}) => adult(x, y, s, { hair: 'grandma', hairC: '#d9dde6', top: '#e8a33a', bottom: '#5a4a6a', ...o });
export const friend = (x, y, s = 1, o = {}) => kid(x, y, s, { hair: 'girl', hairC: '#c9772f', top: '#7cc36a', bottom: '#5a4a6a', skin: '#f3c9a0', ...o });
export const friend2 = (x, y, s = 1, o = {}) => kid(x, y, s, { hair: 'boy', hairC: '#5a3a22', top: '#ffd23f', bottom: '#3a4a6a', skin: '#c98d62', ...o });

// ---------------------------------------------------------------- props
export const mitten = (x, y, s = 1, c = '#e8433a', rot = 0) => G(x, y, s, path('M-9 -2 Q-19 -3 -17 -10 Q-13 -15 -8 -8', c, 2.5) + path('M-9 10 L-10 -6 Q-10 -17 0 -17 Q10 -17 10 -6 L9 10Z', c, 2.5)
  + path('M-5 -8 l3 3 l3 -3 l3 3', 'none', 1.5, 'stroke="#fff" opacity=".8"') + rect(-11, 8, 22, 8, '#fff', 2.5, 2), false, rot);
export function snowman(x, y, s = 1, o = {}) {
  const { hat = false, hatC = '#e8433a', nose = true, mit = null, scarf = '#4f8fd6', mood = 'happy' } = o;
  const sn = (cx, cy, r) => circ(cx, cy, r, 'url(#gSnow)') + ell(cx + r * 0.3, cy + r * 0.35, r * 0.55, r * 0.4, '#c9d9ea', 0, 'opacity=".5"');
  const mouth = mood === 'sad' ? path('M-7 -124 Q0 -129 7 -124', 'none', 2.5) : [-8, -4, 0, 4, 8].map((dx, i) => circ(dx, -128 + Math.abs(dx) * -0.3 + (i === 2 ? 2 : 1), 1.8, O, 0)).join('');
  return G(x, y, s, shadow(0, 2, 44)
    + path('M-26 -94 L-62 -118 M-50 -110 L-58 -128 M-50 -110 L-66 -108', 'none', 4.5, 'stroke="#8a5a36"') + path('M26 -94 L62 -118 M50 -110 L58 -128 M50 -110 L66 -108', 'none', 4.5, 'stroke="#8a5a36"')
    + sn(0, -36, 38) + sn(0, -94, 28) + sn(0, -140, 21)
    + circ(-7, -145, 2.8, O, 0) + circ(7, -145, 2.8, O, 0) + mouth
    + (nose ? path('M0 -138 L22 -134 L0 -131Z', '#f28c28', 2) : '')
    + circ(0, -100, 3.2, O, 0) + circ(0, -86, 3.2, O, 0) + circ(0, -48, 3.2, O, 0) + circ(0, -32, 3.2, O, 0)
    + (scarf ? path('M-22 -120 Q0 -110 22 -120 L22 -112 Q0 -102 -22 -112Z', scarf, 2.5) + path('M12 -112 L18 -90 L8 -90 L4 -108Z', scarf, 2.5) : '')
    + (hat ? path('M-21 -150 Q-19 -176 0 -177 Q19 -176 21 -150Z', hatC) + rect(-23, -156, 46, 9, '#fff', 2.5, 4) + circ(0, -179, 6.5, '#fff', 2.5) : '')
    + (mit ? mitten(62, -122, 0.9, mit, -20) : ''));
}
export const flake = (x, y, r = 8, c = '#fff') => G(x, y, 1, path(`M0 ${-r} L0 ${r} M${-r * 0.87} ${-r / 2} L${r * 0.87} ${r / 2} M${-r * 0.87} ${r / 2} L${r * 0.87} ${-r / 2}`, 'none', 2.2, `stroke="${c}"`));
export const tablet = (x, y, s = 1, inner = '', id = 'tb') => G(x, y, s, `<defs><clipPath id="${id}"><rect x="-52" y="-38" width="104" height="76" rx="4"/></clipPath></defs>`
  + rect(-60, -46, 120, 92, '#3a3f55', 3, 10) + rect(-52, -38, 104, 76, '#ffe7c2', 0, 4) + `<g clip-path="url(#${id})">${inner}</g>` + circ(56, 0, 2, '#9aa3b5', 0));
export const plane = (x, y, s = 1) => G(x, y, s, path('M-50 0 Q-50 -10 -30 -10 L40 -10 Q56 -8 60 0 Q56 8 40 8 L-30 8 Q-50 8 -50 0Z', '#fff') + path('M-4 -8 L-20 -40 L-8 -40 L16 -8Z', '#cfe3f5') + path('M-4 8 L-16 32 L-4 32 L16 8Z', '#cfe3f5')
  + path('M-46 -6 L-56 -26 L-46 -26 L-34 -8Z', '#e8433a') + [0, 10, 20, 30].map((dx) => circ(dx, -2, 2.6, '#7fb6e6', 1.5)).join(''));
export const suitcase = (x, y, s = 1, c = '#e8433a', open = false) => G(x, y, s, shadow(0, 1, 34)
  + (open ? path('M-36 -40 L-30 -84 L30 -84 L36 -40Z', c) : '') + rect(-36, -46, 72, 46, c, 3, 6) + line(-36, -26, 36, -26, O, 2) + rect(-10, -54, 20, 8, 'none', 3, 3)
  + circ(-24, 2, 4, O, 0) + circ(24, 2, 4, O, 0) + path('M-28 -40 L-28 -6 M28 -40 L28 -6', 'none', 2, 'opacity=".35"'));
export const dumpling = (x, y, s = 1, ugly = false) => G(x, y, s, (ugly
  ? path('M-15 5 Q-20 -6 -6 -9 Q-2 -16 6 -9 Q20 -10 15 5 Q2 9 -15 5Z', '#fbf6ea', 2.5) + path('M-2 -4 q4 3 8 -1', 'none', 1.6) + ell(10, -2, 3, 2, '#7cc36a', 0)
  : path('M-16 4 Q-18 -10 0 -12 Q18 -10 16 4 Q0 10 -16 4Z', '#fbf6ea', 2.5) + path('M-8 -10 l2 4 M-2 -11 l1 4 M4 -11 l0 4 M10 -9 l-1 4', 'none', 1.6)));
export const plate = (x, y, w = 70, c = '#ffffff') => ell(x, y, w / 2, w / 7, c) + ell(x, y - 1, w / 2 - 8, w / 7 - 4, 'none', 1.5, 'stroke="#7fb6e6"');
export const bowl = (x, y, s = 1, c = '#ffffff', fill = '') => G(x, y, s, fill + path('M-26 -14 Q-24 10 0 12 Q24 10 26 -14Z', c) + ell(0, -14, 26, 6, '#f2e6d0') + path('M-18 -2 Q0 4 18 -2', 'none', 2, 'stroke="#e8433a"'));
export const mooncake = (x, y, r = 18, bite = false) => G(x, y, 1, circ(0, 0, r, '#d9984e') + circ(0, 0, r * 0.72, 'none', 2, 'stroke="#a8692e"')
  + [0, 60, 120, 180, 240, 300].map((a) => ell(Math.cos(a * Math.PI / 180) * r * 0.42, Math.sin(a * Math.PI / 180) * r * 0.42, r * 0.16, r * 0.1, '#e9b26a', 0)).join('') + circ(0, 0, r * 0.14, '#e9b26a', 0)
  + circ(-r * 0.4, -r * 0.45, r * 0.15, '#fff', 0, 'opacity=".3"') + (bite ? circ(r * 0.9, -r * 0.5, r * 0.45, '#fff6e6', 0) : ''));
export const zongzi = (x, y, s = 1) => G(x, y, s, path('M-16 8 L0 -18 L16 8Z', '#6fae4f') + path('M0 -18 L4 8', 'none', 2, 'opacity=".4"') + path('M-10 -2 L10 -2 M-14 4 L14 4', 'none', 2.5, 'stroke="#d9a877"'));
export const acorn = (x, y, s = 1) => G(x, y, s, ell(0, 2, 8, 10, '#c98d5a', 2.5) + path('M-10 -4 Q0 -14 10 -4 Q0 -1 -10 -4Z', '#8a5a36', 2.5) + line(0, -10, 2, -15, O, 2.5));
export const dragonBoat = (x, y, s = 1, c = '#e8433a', flag = '#ffd23f', tilt = 0) => G(x, y, s,
  path('M-40 -6 Q-56 -26 -46 -32 Q-40 -22 -32 -12Z', c) + path('M-52 -6 Q0 12 50 -8 L44 6 Q0 20 -46 6Z', c)
  + path('M-44 0 Q0 14 46 -2', 'none', 2, 'stroke="#ffd23f"') + [-30, -16, -2, 12, 26].map((dx) => path(`M${dx} ${3 + Math.abs(dx) * 0.05} q4 -5 8 0`, 'none', 2, 'stroke="#ffd23f"')).join('')
  + path('M44 -6 Q60 -26 52 -38 Q62 -46 72 -38 Q76 -30 66 -28 L72 -24 Q64 -20 58 -22 Q60 -12 48 -2Z', c) + circ(62, -36, 2.4, O, 0) + path('M54 -42 L50 -52 L58 -44 M60 -44 L62 -54 L64 -44', 'none', 2.5)
  + line(0, -6, 0, -40, O, 2.5) + path('M0 -40 L22 -34 L0 -26Z', flag, 2.5), false, tilt);
export const coin = (x, y, r = 6) => circ(x, y, r, '#ffd23f', 2.5) + rect(x - r * 0.3, y - r * 0.3, r * 0.6, r * 0.6, '#e8a33a', 1.5);
export const puck = (x, y) => ell(x, y + 3, 9, 4, '#22252f', 2) + ell(x, y, 9, 4, '#3a3f55', 2);
export const stick = (x, y, s = 1, rot = 0, c = '#d9a877') => G(x, y, s, path('M0 -70 L4 0 L26 2 L26 8 L-2 8 L-6 -70Z', c, 2.5) + rect(-7, -74, 12, 20, '#3a3f55', 2.5, 2), false, rot);
export const goalNet = (x, y, s = 1) => G(x, y, s, path('M-50 0 L-50 -56 L50 -56 L50 0', 'none', 6, 'stroke="#e8433a"') + path('M-50 -56 L-36 -70 L36 -70 L50 -56', 'none', 3, 'stroke="#e8433a"')
  + path(Array.from({ length: 9 }, (_, i) => `M${-40 + i * 10} -56 L${-40 + i * 10} 0`).join('') + Array.from({ length: 5 }, (_, i) => `M-50 ${-46 + i * 11} L50 ${-46 + i * 11}`).join(''), 'none', 1.2, 'stroke="#9aa3b5"'));
export const rink = (y = 190) => rect(0, y, 400, 300 - y, 'url(#gIce)', 0) + path(`M0 ${y + 40} q40 -4 80 0 M220 ${y + 70} q50 -5 100 0 M120 ${y + 95} q30 -3 60 0`, 'none', 2, 'stroke="#ffffff" opacity=".8"')
  + rect(-4, y - 22, 408, 24, '#ffffff', 3) + line(-4, y - 8, 404, y - 8, '#4f8fd6', 3) + line(200, y + 2, 200, 300, '#e8433a', 3) + circ(200, 260, 30, 'none', 2.5, 'stroke="#4f8fd6"');
export const lamp = (x, y, h = 120, lit = true) => (lit ? circ(x, y - h, 34, 'url(#gLamp)', 0) : '') + rect(x - 3, y - h, 6, h, '#5a6070', 2.5) + path(`M${x - 12} ${y - h} L${x + 12} ${y - h} L${x + 8} ${y - h - 12} L${x - 8} ${y - h - 12}Z`, lit ? '#ffe08a' : '#cfd6e2', 2.5);
export const shack = (x, y, s = 1, snowy = true) => G(x, y, s, shadow(0, 2, 90) + rect(-80, -70, 160, 70, '#b5653a') + path(Array.from({ length: 6 }, (_, i) => `M-80 ${-60 + i * 11} L80 ${-60 + i * 11}`).join(''), 'none', 1.5, 'opacity=".3"')
  + path('M-92 -66 L0 -120 L92 -66Z', '#7a4a3a') + rect(40, -132, 18, 40, '#9aa3b5') + (snowy ? path('M-94 -64 L0 -122 L94 -64 Q78 -58 66 -66 Q50 -56 36 -68 Q16 -58 0 -70 Q-18 -58 -34 -68 Q-52 -58 -66 -66 Q-80 -58 -94 -64Z', '#fff', 2.5) : '')
  + rect(-14, -46, 28, 46, '#7a4a3a', 3, 3) + rect(-62, -52, 30, 24, '#ffe08a', 2.5) + rect(32, -52, 30, 24, '#ffe08a', 2.5) + line(-47, -52, -47, -28, O, 2) + line(47, -52, 47, -28, O, 2)
  + path('M49 -136 Q40 -150 52 -160 Q62 -170 52 -184 Q66 -176 64 -160 Q58 -150 66 -140', 'none', 6, 'stroke="#ffffff" opacity=".85"'));
export const pail = (x, y, s = 1) => G(x, y, s, line(0, -26, 0, -16, O, 3) + path('M-10 -18 L10 -18 L8 4 L-8 4Z', '#c9ced8', 2.5) + path('M-10 -18 Q0 -30 10 -18', 'none', 2) + rect(-12, -22, 24, 5, '#9aa3b5', 2, 2));
export const taffyTray = (x, y, s = 1, sticks = 3) => G(x, y, s, rect(-90, -16, 180, 22, '#c98d5a', 3, 3) + path('M-86 -16 Q-60 -26 -30 -18 Q0 -26 30 -18 Q60 -26 86 -16Z', '#fff', 2.5)
  + [-60, -20, 20, 60].slice(0, Math.max(1, sticks + 1)).map((dx) => path(`M${dx - 14} -18 q7 -4 14 0 q7 4 14 0`, 'none', 7, 'stroke="#d98d2c"')).join(''));
export const taffy = (x, y, s = 1, rot = 0) => G(x, y, s, line(0, 0, 0, -36, '#e9d3a6', 4) + line(0, 0, 0, -36, O, 0) + path('M-6 -34 Q-8 -50 0 -54 Q8 -50 6 -34Z', '#d98d2c', 2.5), false, rot);
export const leaf = (x, y, s = 1, c = '#e8642f', rot = 0) => G(x, y, s, path('M0 12 L0 4 L-12 6 L-9 0 L-16 -6 L-8 -6 L-10 -14 L-3 -9 L0 -18 L3 -9 L10 -14 L8 -6 L16 -6 L9 0 L12 6 L0 4', c, 2), false, rot);
export const bench = (x, y, s = 1) => G(x, y, s, rect(-50, -30, 100, 8, '#c98d5a', 2.5) + rect(-50, -48, 100, 8, '#c98d5a', 2.5) + rect(-44, -22, 6, 22, '#5a6070', 2) + rect(38, -22, 6, 22, '#5a6070', 2));
export const fence = (y = 200, c = '#f4e3c3') => rect(0, y - 20, 400, 6, c, 2) + Array.from({ length: 11 }, (_, i) => path(`M${i * 40 + 6} ${y} L${i * 40 + 6} ${y - 36} L${i * 40 + 12} ${y - 42} L${i * 40 + 18} ${y - 36} L${i * 40 + 18} ${y}Z`, c, 2)).join('');
export const city = (y = 190, c = '#b9c7dc') => path(`M0 ${y} L0 ${y - 40} L30 ${y - 40} L30 ${y - 70} L70 ${y - 70} L70 ${y - 30} L100 ${y - 30} L100 ${y - 90} L130 ${y - 96} L160 ${y - 90} L160 ${y - 45} L200 ${y - 45} L200 ${y - 64} L240 ${y - 64} L240 ${y - 36} L280 ${y - 36} L280 ${y - 80} L300 ${y - 110} L320 ${y - 80} L320 ${y - 50} L360 ${y - 50} L360 ${y - 72} L400 ${y - 72} L400 ${y}Z`, c, 0)
  + Array.from({ length: 16 }, (_, i) => rect(Math.round(8 + rnd(i + 40) * 380), Math.round(y - 30 - rnd(i + 60) * 30), 6, 7, '#ffffff', 0, 0, 'opacity=".55"')).join('');
export const thought = (x, y, w, h, inner = '') => circ(x - w / 2 + 6, y + h / 2 + 18, 4, '#fff', 2) + circ(x - w / 2 + 14, y + h / 2 + 8, 6, '#fff', 2) + rect(x - w / 2, y - h / 2, w, h, '#fff', 2.5, h / 2.4) + inner;
export const tear = (x, y) => path(`M${x} ${y} q-4 8 0 11 q4 -3 0 -11Z`, '#9fdcff', 1.5);
export const note = (x, y, c = '#5f6b8a') => path(`M${x} ${y} L${x} ${y - 16} L${x + 10} ${y - 19} L${x + 10} ${y - 4}`, 'none', 2.5, `stroke="${c}"`) + ell(x - 3, y, 4, 3, c, 0) + ell(x + 7, y - 3, 4, 3, c, 0);
export { O, G, circ, ell, rect, path, line, limb, shadow, rnd, star, person };
export const mug = (x, y, s = 1, c = '#fff') => G(x, y, s, path('M-12 -20 L12 -20 L9 0 L-9 0Z', c) + path('M12 -16 q11 2 0 11', 'none', 3) + ell(0, -20, 12, 3.5, '#8a5a36', 2) + path('M-6 -26 q-4 -6 0 -10 M4 -26 q-4 -6 0 -10', 'none', 2, 'opacity=".5"'));
