// ---------- shared drawing helpers ----------
const O = '#3a3f55';
const svg = (b) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round">${b}</svg>`.replace(/\d+\.\d{2,}/g, (m) => String(Math.round(m * 10) / 10)).replace(/ rx="0"| rotate\(0\)/g, '').replace(/ +\/>/g, '/>').replace(/ {2,}/g, ' ');
const R = (x, y, w, h, f, r = 0, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" ${ex}/>`;
const C = (x, y, r, f, ex = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${ex}/>`;
const E = (x, y, rx, ry, f, ex = '') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const P = (d, f = 'none', ex = '') => `<path d="${d}" fill="${f}" ${ex}/>`;
const G = (inner, t = '') => `<g stroke="${O}" stroke-width="3" ${t ? `transform="${t}"` : ''}>${inner}</g>`;
const NS = 'stroke="none"';
const thick = (d, col, w = 6) => P(d, 'none', `stroke="${O}" stroke-width="${w + 4}"`) + P(d, 'none', `stroke="${col}" stroke-width="${w}"`);
const leaf = (x, y, s = 1, c = '#d9472f') => G(P('M0 -10L3 -4L9 -6L6 0L10 3L3 4L0 11L-3 4L-10 3L-6 0L-9 -6L-3 -4Z', c, 'stroke-width="2"'), `translate(${x} ${y}) scale(${s})`);
const flakes = (n = 24, r = 2.4) => Array.from({ length: n }, (_, i) => C((i * 97 + 31) % 400, (i * 61 + 17) % 300, r + (i % 3) * 0.6, '#fff', `${NS} opacity=".9"`)).join('');

// ---------- people (same look every page) ----------
const face = (m, nc) => {
  const ey = -74, my = -64;
  const dot = (x, r = 2.7) => C(x, ey, r, O, NS);
  const up = (x) => P(`M${x - 4} ${ey + 2}q4 -7 8 0`, 'none', 'stroke-width="2.6"');
  const dn = (x) => P(`M${x - 4} ${ey}q4 5 8 0`, 'none', 'stroke-width="2.6"');
  const brSad = P('M-12 -79L-3 -83M12 -79L3 -83', 'none', 'stroke-width="2.4"');
  const cheeks = C(-12, -66, 3.6, '#f28b8b', `${NS} opacity=".55"`) + C(12, -66, 3.6, '#f28b8b', `${NS} opacity=".55"`);
  const M = {
    happy: dot(-7) + dot(7) + P(`M-6 ${my}q6 7 12 0`, 'none', 'stroke-width="2.6"'),
    laugh: up(-7) + up(7) + P(`M-7 ${my - 1}q7 13 14 0z`, '#b3363a', 'stroke-width="2.4"'),
    sad: dot(-7) + dot(7) + brSad + P(`M-5 ${my + 4}q5 -6 10 0`, 'none', 'stroke-width="2.6"') + P('M10 -71q-3 5 0 8q3 -3 0 -8', '#7cc4f0', NS),
    surprised: C(-7, ey, 4.2, '#fff', 'stroke-width="2"') + C(7, ey, 4.2, '#fff', 'stroke-width="2"') + dot(-7, 1.8) + dot(7, 1.8) + P('M-12 -83q4 -4 8 0M4 -83q4 -4 8 0', 'none', 'stroke-width="2.4"') + E(0, my + 2, 3.2, 4.4, '#b3363a', 'stroke-width="2"'),
    sleepy: dn(-7) + dn(7) + P(`M-3 ${my + 1}q3 3 6 0`, 'none', 'stroke-width="2.4"'),
    worried: dot(-7) + dot(7) + brSad + P(`M-6 ${my + 3}q3 -4 6 0q3 4 6 0`, 'none', 'stroke-width="2.4"'),
  };
  return (nc ? '' : cheeks) + (M[m] || M.happy);
};
const HAND = { d: [22, -28], f: [30, -46], u: [28, -84], o: [34, -50], w: [30, -78] };
const limb = (x1, y1, x2, y2, col) => P(`M${x1} ${y1}L${x2} ${y2}`, 'none', `stroke="${O}" stroke-width="12"`) + P(`M${x1} ${y1}L${x2} ${y2}`, 'none', `stroke="${col}" stroke-width="6"`);
const kid = (x, y, s, o = {}) => {
  const { skin = '#f1c6a0', hair = '#5a3a28', style = 'short', coat = '#d9473f', pants = '#3a4a7a', hat = null, band = '#fff', mitt = null, mittR, mood = 'happy', al = 'd', ar = 'd', scarf = null, flip = false, back = '', extra = '', hold = '', boots = '#4a3a4a', tilt = 0, nc = false } = o;
  const mr = mittR === undefined ? mitt : mittR;
  const arm = (sx, h, m) => limb(sx * 15, -50, sx * h[0], h[1], coat) + C(sx * h[0], h[1], 6, m || skin, 'stroke-width="2.6"');
  const hairBack = style === 'long' ? P('M-21 -72Q-23 -44 -15 -42L15 -42Q23 -44 21 -72Z', hair) : style === 'braids' ? E(-21, -58, 5, 12, hair) + E(21, -58, 5, 12, hair) + C(-21, -48, 3, '#e8a317', 'stroke-width="2"') + C(21, -48, 3, '#e8a317', 'stroke-width="2"') : '';
  const hairFront = style === 'bald' ? '' : P('M-18 -73Q-21 -95 0 -95Q21 -95 18 -73Q10 -85 0 -84Q-10 -85 -18 -73Z', hair);
  const hatSvg = hat ? P('M-19 -77Q-22 -102 0 -102Q22 -102 19 -77Z', hat) + R(-20, -83, 40, 9, band, 4) + C(0, -103, 6, band) : '';
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s}) rotate(${tilt})" stroke="${O}" stroke-width="3">`
    + hairBack + back + R(-13, -18, 11, 18, pants, 3) + R(2, -18, 11, 18, pants, 3) + R(-15, -7, 14, 7, boots, 3) + R(1, -7, 14, 7, boots, 3)
    + P('M-18 -14Q-21 -48 -11 -57L11 -57Q21 -48 18 -14Z', coat) + (scarf ? R(-13, -61, 26, 8, scarf, 4) : '')
    + arm(-1, HAND[al], mitt) + arm(1, HAND[ar], mr) + hold
    + C(0, -72, 18, skin) + hairFront + hatSvg + face(mood, nc) + extra + '</g>';
};
const mitten = (x, y, s = 1, rot = 0, col = '#e23b3b') => G(P('M-9 0Q-12 -22 0 -24Q12 -22 9 0Z', col) + E(-11, -12, 4, 6, col) + R(-10, -1, 20, 8, '#fff', 3), `translate(${x} ${y}) rotate(${rot}) scale(${s})`);

// ---------- characters of this book ----------
const lea = (x, y, s, o = {}) => kid(x, y, s, { skin: '#f1c6a0', hair: '#6a3b22', style: 'braids', coat: '#8a5cc7', pants: '#3a4a7a', hat: '#f4c430', band: '#fff4b0', mitt: '#e23b3b', ...o });
const noe = (x, y, s, o = {}) => kid(x, y, s, { skin: '#c68a5e', hair: '#2a2420', coat: '#3b7fd1', pants: '#4a4a5a', hat: '#3fa34d', band: '#d6f2d8', mitt: '#f08a24', ...o });
const rose = (x, y, s, o = {}) => kid(x, y, s, { skin: '#e8b890', hair: '#2b2b2b', style: 'long', coat: '#c43d8a', pants: '#3a3f55', hat: '#7f6bb5', band: '#e6dcf7', mitt: '#7f6bb5', scarf: '#f4c430', ...o });
const PLAID = P('M-14 -50h28M-15 -38h30M-8 -56v40M8 -56v40', 'none', 'stroke="#2b1b1b" stroke-width="2" opacity=".5"');
const BEARD = P('M-17 -68Q-18 -46 0 -46Q18 -46 17 -68Q9 -56 0 -57Q-9 -56 -17 -68Z', '#f4f4f8', 'stroke-width="2.5"');
const gaston = (x, y, s, o = {}) => kid(x, y, s, { skin: '#e8b890', hair: '#eee', coat: '#c8372d', pants: '#4a4a5a', hat: '#5a6a7a', band: '#3f4a58', mitt: '#8a5a3c', ...o, hold: PLAID + (o.hold || ''), extra: BEARD + (o.extra || '') });
const kidB = (x, y, s, o = {}) => kid(x, y, s, { skin: '#f1c6a0', hair: '#c9772b', coat: '#f08a24', pants: '#3a4a7a', hat: '#e8556a', band: '#ffe0e6', mitt: '#e8556a', ...o });
const maman = (x, y, s, o = {}) => kid(x, y, s, { skin: '#f1c6a0', hair: '#a0522d', style: 'long', coat: '#6fb5a0', pants: '#4a4a5a', boots: '#6b4a3a', ...o });

const dog = (x, y, s = 1, o = {}) => {
  const { mitt = false, flip = false, mood = 'happy' } = o;
  return G(
    thick('M-28 -34Q-46 -48 -38 -62', '#b9773f', 7)
    + R(-24, -20, 10, 20, '#a8683a', 4) + R(-8, -20, 10, 20, '#a8683a', 4) + R(8, -20, 10, 20, '#b9773f', 4) + R(22, -20, 10, 20, '#b9773f', 4)
    + E(0, -30, 32, 17, '#b9773f') + P('M-4 -43Q4 -30 -2 -14', 'none', 'stroke="#c98b50" stroke-width="2" opacity=".6"')
    + C(32, -48, 16, '#b9773f') + E(52, -43, 10, 8, '#e8c49a') + C(59, -46, 3.5, O, NS)
    + P('M26 -62Q12 -60 14 -42Q24 -40 28 -54Z', '#7a4a26') + C(36, -53, 3, O, NS)
    + (mitt ? '' : P('M50 -37q2 10 7 6', '#e8656a', 'stroke-width="2"')) + (mitt ? '' : '')
    + (mitt ? G(P('M-9 0Q-12 -22 0 -24Q12 -22 9 0Z', '#e23b3b') + E(-11, -12, 4, 6, '#e23b3b') + R(-10, -1, 20, 8, '#fff', 3), 'translate(53 -22) rotate(70)') : ''),
    `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`);
};
const horse = (x, y, s = 1) => G(
  thick('M-48 -76Q-76 -66 -64 -30', '#5a3a22', 9)
  + R(-38, -44, 12, 44, '#a8672f', 4) + R(-22, -44, 12, 44, '#a8672f', 4) + R(16, -44, 12, 44, '#b5733a', 4) + R(32, -44, 12, 44, '#b5733a', 4)
  + R(-39, -6, 14, 6, '#4a3a3a', 3) + R(-23, -6, 14, 6, '#4a3a3a', 3) + R(15, -6, 14, 6, '#4a3a3a', 3) + R(31, -6, 14, 6, '#4a3a3a', 3)
  + E(0, -62, 52, 26, '#b5733a')
  + P('M24 -76L52 -118L78 -108L56 -56Z', '#b5733a') + P('M64 -122L68 -138L78 -122Z', '#b5733a')
  + E(82, -104, 20, 12, '#b5733a', 'transform="rotate(28 82 -104)"') + C(98, -96, 3, O, NS) + C(80, -111, 3, O, NS)
  + thick('M52 -122Q38 -104 30 -80', '#5a3a22', 8) + E(42, -84, 8, 18, '#c8372d', 'transform="rotate(20 42 -84)"') + C(46, -66, 5, '#f4c430', 'stroke-width="2"') + C(34, -64, 4, '#f4c430', 'stroke-width="2"'),
  `translate(${x} ${y}) scale(${s})`);
// a horse-drawn sleigh with the class (Léa, Noé, a friend, Monsieur Gaston driving)
const sleigh = (x, y, s, leaO = {}) => `<g transform="translate(${x} ${y}) scale(${s})">`
  + horse(250, 0, 1)
  + thick('M-14 -6Q-26 -2 -20 -22', '#6b4a3a', 5) + thick('M-14 0L200 0', '#6b4a3a', 5) + thick('M20 0L20 -30M170 0L170 -30', '#6b4a3a', 5)
  + thick('M196 -24L262 -52', '#8a5a3c', 5) + thick('M200 -74L262 -86', '#3a3f55', 2)
  + lea(45, -30, 0.85, { ar: 'w', ...leaO }) + noe(92, -30, 0.85, { mood: 'laugh' }) + kidB(138, -30, 0.85, { mood: 'happy', ar: 'w' }) + gaston(190, -30, 0.95, { ar: 'f', mitt: '#8a5a3c' })
  + G(P('M10 -34Q10 -52 96 -50Q170 -50 180 -34Z', '#e8a84a') + P('M40 -34v-16M70 -34v-17M100 -34v-17M130 -34v-16M160 -34v-16', 'none', 'stroke="#c8372d" stroke-width="3"'))
  + G(P('M-8 -34L206 -34L196 -6L2 -6Z', '#b5653a') + P('M-8 -26L204 -26', 'none', 'stroke-width="1.5" opacity=".5"')) + '</g>';

const winter = (sun = true) => R(0, 0, 400, 300, '#cfe9f8') + (sun ? C(338, 48, 22, '#fff1a8') : '') + P('M0 175Q70 140 150 172T300 160T400 175V300H0Z', '#e3eff7') + P('M0 205Q110 182 220 203T400 198V300H0Z', '#f8fcff') + P('M0 255Q150 240 400 258V300H0Z', '#e9f3fa');
const pine = (x, y, s = 1) => G(R(-5, -14, 10, 16, '#7a5238') + P('M-28 -10L0 -58L28 -10Z', '#2f7d57') + P('M-23 -38L0 -80L23 -38Z', '#378a62') + P('M-17 -62L0 -102L17 -62Z', '#3f9a6c') + P('M-9 -88L0 -102L9 -88Z', '#fff', NS), `translate(${x} ${y}) scale(${s})`);
const maple = (x, y, s = 1, bucket = true, drip = false) => G(
  E(0, 2, 24, 5, '#d8e6ef', NS) + P('M-12 2L-8 -80L8 -80L12 2Z', '#8a5a3c')
  + thick('M-6 -78L-26 -112M-26 -112L-42 -122M-26 -112L-24 -136M6 -78L8 -118M8 -118L-4 -142M8 -118L26 -136M6 -70L32 -100M32 -100L48 -104M32 -100L38 -124', '#8a5a3c', 5)
  + (bucket ? P('M8 -56L18 -54', 'none', 'stroke-width="4"') + P('M14 -46h24l-3 26h-18z', '#b9c3cc') + R(12, -50, 28, 6, '#9aa6b0', 2) : '')
  + (drip ? P('M19 -50q-3 5 0 8q3 -3 0 -8', '#7cc4f0', 'stroke-width="1.5"') : ''),
  `translate(${x} ${y}) scale(${s})`);
const shack = (x, y, s = 1) => G(
  R(34, -104, 16, 34, '#7a4a36') + R(-60, -70, 120, 70, '#b5653a', 2) + P('M-60 -50h120M-60 -30h120M-60 -10h120', 'none', 'stroke-width="1.5" opacity=".45"')
  + P('M-74 -66L0 -118L74 -66Z', '#6b4a3a') + P('M-62 -70L0 -110L62 -70Q36 -80 0 -104Q-36 -80 -62 -70Z', '#fff', NS)
  + R(-14, -44, 28, 44, '#7a3f26', 3) + R(24, -54, 22, 20, '#ffe9a8', 2) + R(-46, -54, 22, 20, '#ffe9a8', 2)
  + E(42, -116, 11, 8, '#fff', NS) + E(52, -132, 13, 10, '#fff', NS) + E(40, -150, 15, 11, '#fff', NS),
  `translate(${x} ${y}) scale(${s})`);
const taffy = '#e8a317';

const pages = [
  // 1 — the bus
  { svg: svg(winter() + pine(30, 190, 0.8) + pine(372, 188, 0.7)
    + G(R(138, 104, 244, 104, '#f7b81c', 14) + R(138, 168, 244, 8, '#3a3f55', 0, NS)
      + [150, 186, 222, 258, 294, 330].map((wx, i) => R(wx, 114, 30, 32, '#bfe3f5', 3) + C(wx + 15, 134, 9, ['#f1c6a0', '#c68a5e', '#f1c6a0', '#e8b890', '#c68a5e', '#f1c6a0'][i], 'stroke-width="2"') + P(`M${wx + 6} 130Q${wx + 15} 114 ${wx + 24} 130Z`, ['#e8556a', '#3fa34d', '#f4c430', '#3b7fd1', '#8a5cc7', '#f08a24'][i], 'stroke-width="2"')).join('')
      + C(184, 224, 22, '#33364a') + C(184, 224, 9, '#b9c3cc') + C(336, 224, 22, '#33364a') + C(336, 224, 9, '#b9c3cc') + R(138, 196, 244, 6, '#6b6b78', 3))
    + leaf(262, 190, 1.5) + lea(62, 270, 1.15, { ar: 'u', mood: 'laugh' }) + noe(116, 272, 1.1, { al: 'w' })), text: "En mars, la classe de Léa part à la cabane à sucre. Léa porte sa tuque jaune et ses mitaines rouges. Elle est si contente!" },
  // 2 — maple trees and buckets
  { svg: svg(winter(false) + pine(36, 178, 0.7) + maple(90, 200, 0.75) + maple(348, 205, 0.8) + maple(262, 262, 1.5, true, true)
    + P('M277 192q-3 6 0 9q3 -3 0 -9', '#7cc4f0', 'stroke-width="1.5"') + G(P('M292 242q8 -3 16 0M296 248q4 -2 8 0', 'none', 'stroke="#5aa8d8" stroke-width="2"'))
    + lea(120, 268, 1.1, { mood: 'surprised', al: 'f' }) + noe(176, 270, 1.05, { mood: 'happy' })), text: "Dans la forêt, un seau est accroché à chaque érable. Plic! Plic! L'eau d'érable coule goutte à goutte dans le seau." },
  // 3 — tasting the maple water
  { svg: svg(winter(false) + pine(30, 180, 0.7) + maple(336, 255, 1.45, true, true)
    + gaston(108, 268, 1.25, { ar: 'o', mood: 'happy' })
    + lea(222, 268, 1.1, { flip: true, ar: 'f', mood: 'surprised', hold: G(P('M24 -54h12l-2 12h-8z', '#fff', 'stroke-width="2.5"')) })), text: "Monsieur Gaston goûte l'eau d'érable avec Léa. — Elle ressemble à de l'eau! dit Léa. — Oui, mais elle est un peu sucrée, répond-il." },
  // 4 — inside the shack: steam and boiling
  { svg: svg(R(0, 0, 400, 205, '#d9a066') + R(0, 205, 400, 95, '#8a5a3c') + P('M0 40h400M0 80h400M0 120h400M0 160h400', 'none', 'stroke="#b8803f" stroke-width="2" opacity=".6"')
    + G(R(150, 0, 100, 40, '#5a4030') + P('M160 40L170 0M200 40V0M240 40L230 0', 'none', 'stroke-width="2" opacity=".5"'))
    + G(R(120, 160, 230, 74, '#6b6b78', 8) + R(130, 164, 210, 34, taffy) + P('M134 176q12 -8 24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0', 'none', 'stroke="#f7c95a" stroke-width="3"') + R(130, 204, 210, 24, '#3f3f4c', 4) + P('M170 228Q185 192 200 228Q214 190 228 228Q244 196 258 228Z', '#f08a24', 'stroke-width="2"'))
    + '<g fill="#fff" opacity=".88">' + E(170, 130, 30, 20, '#fff') + E(230, 100, 40, 24, '#fff') + E(200, 66, 36, 22, '#fff') + E(290, 128, 28, 18, '#fff') + E(260, 150, 22, 14, '#fff') + '</g>'
    + G(R(358, 150, 36, 84, '#a8672f', 3) + P('M358 180h36M358 206h36', 'none', 'stroke-width="2"'))
    + gaston(236, 168, 1.05, { ar: 'f', hold: thick('M30 -46L-70 -30', '#8a8a96', 4) }) + lea(52, 282, 1.2, { mood: 'surprised' }) + noe(104, 284, 1.15, { mood: 'happy' })), text: "Dans la cabane, l'eau d'érable bout dans un grand bassin. Il y a de la vapeur partout! Il faut beaucoup d'eau d'érable pour faire un peu de sirop." },
  // 5 — tire sur la neige
  { svg: svg(winter(false) + shack(70, 200, 0.7) + pine(372, 188, 0.7)
    + G(R(36, 206, 330, 36, '#b5653a', 4) + P('M44 206Q80 190 120 204T200 204T290 202T358 206V214H44Z', '#fff', NS) + R(36, 242, 8, 28, '#7a4a36') + R(358, 242, 8, 28, '#7a4a36'))
    + P('M110 150Q118 170 108 186Q100 198 118 204', 'none', `stroke="${taffy}" stroke-width="6"`) + P('M170 190q8 -10 16 0t16 0', 'none', `stroke="${taffy}" stroke-width="5"`)
    + gaston(92, 296, 1.2, { ar: 'f', mood: 'happy', hold: G(R(28, -64, 26, 22, '#6b6b78', 3) + R(52, -58, 10, 5, '#6b6b78')) })
    + lea(250, 296, 1.15, { al: 'f', ar: 'f', hold: G(thick('M20 -50L66 -78', '#a8672f', 3) + C(68, -80, 9, taffy, 'stroke-width="2.5"')), mood: 'surprised', flip: true })
    + noe(330, 298, 1.1, { flip: true, mood: 'laugh' })), text: "C'est l'heure de la tire sur la neige! Monsieur Gaston verse du sirop chaud sur la neige. Léa l'enroule autour d'un bâton." },
  // 6 — sticky Noé
  { svg: svg(winter(false) + shack(310, 190, 0.7) + pine(40, 184, 0.7)
    + lea(110, 300, 1.7, { mood: 'laugh', ar: 'f', hold: G(thick('M24 -48L58 -90', '#a8672f', 3) + C(60, -92, 10, taffy, 'stroke-width="2.5"')) })
    + noe(268, 300, 1.7, { mood: 'laugh', al: 'f', ar: 'f', hold: P('M-16 -48L-40 -86', 'none', 'stroke="#a8672f" stroke-width="3"'),
      extra: C(2, -55, 5, taffy, 'stroke-width="2"') + C(-4, -52, 3, taffy, NS) + P('M-3 -52Q-6 -40 -2 -34', 'none', `stroke="${taffy}" stroke-width="4" stroke-linecap="round"`) })
    + G(C(268, 238, 6, taffy, 'stroke-width="2"') + C(286, 252, 5, taffy, 'stroke-width="2"') + C(254, 258, 4, taffy, 'stroke-width="2"'))), text: "Miam! La tire est molle et collante. Noé en a sur le menton et même sur son manteau!" },
  // 7 — sleigh ride
  { svg: svg(winter() + pine(36, 176, 0.8) + pine(90, 172, 0.6) + pine(362, 168, 0.7) + sleigh(12, 252, 0.92)
    + G(P('M-2 270Q150 262 400 266', 'none', 'stroke="#c9dbe8" stroke-width="3"')) + C(340, 120, 3, '#fff', NS)), text: "Ensuite, un grand cheval tire la traîne. Les enfants se couvrent avec une couverture. Ding, ding! Les clochettes sonnent." },
  // 8 — mitten falls
  { svg: svg(winter() + pine(40, 172, 0.8) + pine(340, 150, 0.6) + sleigh(122, 216, 0.58, { mittR: null, mood: 'surprised' })
    + G(P('M-2 236Q150 228 400 232', 'none', 'stroke="#c9dbe8" stroke-width="3"') + P('M-2 246Q150 238 400 242', 'none', 'stroke="#c9dbe8" stroke-width="3"'))
    + mitten(96, 280, 1.6, -35) + C(78, 252, 3, '#fff', NS) + P('M116 238l-6 -10M126 244l3 -10M104 232l-8 -6', 'none', 'stroke="#e8a317" stroke-width="3"')), text: "Léa salue les arbres en levant la main. Oups! Sa mitaine tombe dans la neige. Personne ne la voit." },
  // 9 — sad Léa
  { svg: svg(winter(false) + shack(318, 190, 0.8) + pine(32, 184, 0.7)
    + lea(170, 282, 1.5, { mood: 'sad', ar: 'u', mittR: null })
    + rose(268, 286, 1.3, { mood: 'worried', al: 'f' }) + noe(66, 286, 1.2, { mood: 'worried', flip: false })), text: "Plus tard, Léa a froid à la main. Elle ne trouve plus sa mitaine et elle a de la peine. — On va la chercher, dit madame Rose." },
  // 10 — Biscuit arrives
  { svg: svg(winter(false) + pine(30, 182, 0.7) + pine(372, 186, 0.7)
    + dog(116, 262, 1.7, { mitt: true }) + P('M20 232h-18M24 252h-20M30 270h-24', 'none', 'stroke="#9fb8cc" stroke-width="3"') + C(40, 280, 8, '#fff', NS) + C(60, 286, 6, '#fff', NS)
    + lea(300, 280, 1.3, { flip: true, mood: 'surprised', ar: 'u', mittR: null }) + rose(360, 282, 1.15, { flip: true, mood: 'surprised' })), text: "Tout à coup, un chien brun arrive en courant. C'est Biscuit, le chien de la cabane. Dans sa gueule, il y a une mitaine rouge!" },
  // 11 — joy
  { svg: svg(winter() + shack(318, 190, 0.7) + pine(36, 180, 0.7)
    + lea(140, 290, 1.5, { mood: 'laugh', al: 'f', ar: 'f' }) + dog(238, 290, 1.5, { flip: true })
    + mitten(188, 150, 1.5, 15) + P('M182 164q-3 6 0 9M198 168q-3 6 0 9', '#7cc4f0', 'stroke="#7cc4f0" stroke-width="3"')
    + noe(60, 292, 1.05, { mood: 'laugh', al: 'w' }) + rose(344, 296, 1.1, { flip: true, mood: 'laugh' })), text: "C'est la mitaine de Léa! Elle est mouillée et pleine de bave, mais Léa s'en fiche. Elle serre Biscuit dans ses bras et tout le monde rit." },
  // 12 — sleepy bus ride home
  { svg: svg(R(0, 0, 400, 300, '#f3e2a9') + G(R(40, 28, 320, 132, '#f4a86b', 8) + R(40, 28, 320, 52, '#7a6fc0', 8) + P('M40 100Q120 84 200 100T360 98V152H40Z', '#3b5a6a', NS) + C(300, 74, 14, '#fff1a8', NS) + pine(90, 156, 0.7) + pine(150, 160, 0.9) + pine(310, 158, 0.8) + P('M200 28V160', 'none', 'stroke-width="4"'))
    + lea(144, 250, 1.4, { mood: 'sleepy', tilt: 9, al: 'd' }) + noe(236, 250, 1.4, { mood: 'sleepy', extra: C(7, -54, 4, taffy, NS) })
    + G(R(70, 218, 240, 90, '#3f7a5c', 14) + R(70, 218, 240, 14, '#4b8a6a', 7))
    + G(R(0, 0, 400, 14, '#d7c48a', 0) + R(14, 206, 28, 94, '#4b8a6a', 6))), text: "Dans l'autobus, il fait chaud. Léa et Noé ont les mains collantes et les yeux qui se ferment. Bientôt, ils s'endorment." },
  // 13 — home
  { svg: svg(R(0, 0, 400, 300, '#f9dcb8') + R(0, 214, 400, 86, '#b8825a') + R(0, 208, 400, 10, '#8a5a3c', 0, NS)
    + G(R(250, 40, 110, 120, '#2e3a6a', 6) + C(300, 78, 16, '#fff1a8', 'stroke-width="2"') + P('M250 100h110M305 40v120', 'none', 'stroke-width="4"') + R(240, 30, 130, 12, '#8a5a3c', 4) + P('M240 40Q262 100 244 160L232 160Q246 100 236 40Z', '#e8556a', 'stroke-width="2"'))
    + G(P('M30 230Q200 250 380 230L370 292Q200 300 40 292Z', '#c8372d', 'stroke-width="2"'))
    + maman(120, 266, 1.45, { mood: 'happy', al: 'o' })
    + lea(250, 272, 1.25, { mood: 'sleepy', hat: null, ar: 'u', mittR: '#e23b3b', hold: '', extra: C(8, -62, 4, taffy, NS) })
    + G(R(268, 178, 20, 26, '#d9a066', 3) + R(268, 172, 20, 8, '#8a5a3c', 3) + P('M278 182v14', 'none', 'stroke-width="2"'), '')
    + leaf(200, 100, 1.4) + leaf(176, 130, 1) + leaf(214, 140, 0.9)), text: "À la maison, Léa montre sa mitaine et sa petite canne de sirop à maman. Elle sent l'érable de la tête aux pieds. — Quelle belle journée! dit-elle en bâillant." },
];

export const book = {
  id: 'cabane-a-sucre',
  title: 'Une journée à la cabane à sucre',
  emoji: '🍁',
  level: 2,
  minutes: 9,
  cover: svg(winter() + pine(40, 186, 0.8) + shack(300, 196, 0.9) + maple(60, 262, 1.3, true, true) + lea(160, 276, 1.4, { mood: 'laugh', ar: 'u' }) + noe(224, 280, 1.3, { mood: 'happy' }) + leaf(340, 70, 1.8) + leaf(60, 60, 1.2)),
  pages,
  words: [
    { word: 'un érable', emoji: '🍁', def: "Un grand arbre. On fait le sirop avec son eau sucrée." },
    { word: "l'eau d'érable", emoji: '💧', def: "Le liquide sucré qui coule de l'érable au printemps." },
    { word: 'un seau', emoji: '🪣', def: "Un récipient avec une anse, pour recueillir ou transporter un liquide." },
    { word: 'la cabane à sucre', emoji: '🛖', def: "Le petit bâtiment où l'on fait bouillir l'eau d'érable." },
    { word: 'la vapeur', emoji: '♨️', def: "Un nuage blanc qui sort d'un liquide très chaud." },
    { word: 'la tire sur la neige', emoji: '🍬', def: "Du sirop d'érable chaud, versé sur la neige, qui devient une friandise molle." },
    { word: 'la traîne', emoji: '🛷', def: "Une grande voiture sans roues qu'un cheval tire sur la neige." },
    { word: 'la mitaine', emoji: '🧤', def: "Un gant sans doigts séparés qui garde la main bien au chaud." },
    { word: 'collant', emoji: '🍯', def: "Qui reste collé aux doigts, comme le sirop." },
  ],
  quiz: [
    { q: 'À quel moment de l\'année la classe va-t-elle à la cabane à sucre?', options: ['En juillet', 'En mars', 'En octobre'], answer: 1 },
    { q: "Qu'est-ce qui est accroché à chaque érable?", options: ['Une lanterne', 'Une mitaine', 'Un seau'], answer: 2 },
    { q: 'Que verse Monsieur Gaston sur la neige?', options: ['Du sirop chaud', "De l'eau froide", 'Du lait'], answer: 0 },
    { q: 'Qui tire la traîne?', options: ['Un chien', 'Un grand cheval', 'Un tracteur'], answer: 1 },
    { q: 'Que perd Léa dans la neige?', options: ['Sa tuque jaune', 'Une botte', 'Sa mitaine rouge'], answer: 2 },
    { q: 'Qui retrouve la mitaine de Léa?', options: ['Biscuit, le chien', 'Noé', 'Madame Rose'], answer: 0 },
    { q: 'Comment Léa se sent-elle quand elle ne trouve plus sa mitaine?', options: ['Elle a de la peine.', 'Elle est très fâchée contre Noé.', "Elle n'a pas remarqué."], answer: 0 },
    { q: "Que font Léa et Noé dans l'autobus, au retour?", options: ['Ils chantent fort.', "Ils s'endorment.", 'Ils mangent de la tire.'], answer: 1 },
  ],
};
