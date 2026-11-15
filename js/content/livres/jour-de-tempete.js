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
const mia = (x, y, s, o = {}) => kid(x, y, s, { skin: '#e6b48a', hair: '#2a1f1a', style: 'long', coat: '#e86a9a', pants: '#3a3f6a', hat: '#f08a24', band: '#ffe1b8', mitt: '#f08a24', boots: '#7a3a4a', ...o });
const theo = (x, y, s, o = {}) => kid(x, y, s * 0.82, { skin: '#e6b48a', hair: '#2a1f1a', coat: '#4a8fe0', pants: '#3a3f6a', hat: '#e23b3b', band: '#ffd6d6', mitt: '#e23b3b', boots: '#2e5a9a', ...o });
const GLASS = P('M-14 -75h28', 'none', 'stroke-width="2"') + C(-7, -74, 6.5, 'rgba(255,255,255,.35)', 'stroke-width="2.2"') + C(7, -74, 6.5, 'rgba(255,255,255,.35)', 'stroke-width="2.2"');
const samir = (x, y, s, o = {}) => kid(x, y, s, { skin: '#b98462', hair: '#1e1a18', coat: '#3fa34d', pants: '#4a4a5a', hat: '#8a8a96', band: '#e3e3ea', mitt: '#3a3f55', boots: '#3a3a44', ...o, extra: GLASS + (o.extra || '') });
const odette = (x, y, s, o = {}) => kid(x, y, s, { skin: '#f0cdb0', hair: '#eeeeee', coat: '#8a5cc7', pants: '#6b4a6a', boots: '#c8372d', back: C(0, -94, 9, '#eeeeee'), ...o, extra: GLASS + P('M-6 -58q6 5 12 0', 'none', 'stroke="none"') + (o.extra || '') });
const maman = (x, y, s, o = {}) => kid(x, y, s, { skin: '#e6b48a', hair: '#4a2a1a', style: 'long', coat: '#e8c14a', pants: '#4a4a5a', boots: '#6b4a3a', ...o });
const shovel = (hx, hy, ang = -40) => G(thick('M0 0L0 -50', '#a8672f', 4) + P('M-9 0L9 0L7 16L-7 16Z', '#e8564a'), `translate(${hx} ${hy}) rotate(${ang})`);
const mug = (x, y, s = 1) => G(R(-10, -16, 20, 16, '#f2f2f6', 4) + P('M10 -12q9 0 9 6t-9 4', 'none', 'stroke-width="3"') + E(0, -16, 10, 3.5, '#6b3f26', 'stroke-width="2"') + C(-4, -19, 3.5, '#fff', 'stroke-width="1.5"') + C(4, -19, 3.5, '#fff', 'stroke-width="1.5"'), `translate(${x} ${y}) scale(${s})`);
const steam = (x, y) => P(`M${x} ${y}q-6 -8 0 -16t0 -16M${x + 10} ${y}q-6 -8 0 -16t0 -16`, 'none', 'stroke="#fff" stroke-width="3" opacity=".8"');

const stormBg = (n = 40) => R(0, 0, 400, 300, '#c4d1de') + R(0, 0, 400, 110, '#b6c5d6', 0, NS) + '<g fill="#a2b2c4">' + R(10, 128, 50, 40, '#a2b2c4') + R(70, 118, 44, 50, '#a2b2c4') + R(300, 124, 54, 44, '#a2b2c4') + R(360, 134, 40, 34, '#a2b2c4') + '</g>' + P('M0 176Q200 164 400 176V300H0Z', '#f6f9fc') + P('M0 250Q200 236 400 252V300H0Z', '#e8eff6') + flakes(n, 3);
const house = (x, y, s = 1, o = {}) => {
  const { wall = '#d9a066', roof = '#7a5a6a', drift = 0, win = '' } = o;
  return G(R(-80, -112, 160, 112, wall) + P('M-92 -110L0 -166L92 -110Z', roof) + P('M-84 -113L0 -158L84 -113Q50 -122 0 -150Q-50 -122 -84 -113Z', '#fff', NS)
    + R(-16, -56, 32, 56, '#7a3f26', 3) + C(8, -28, 2.6, '#f4c430', NS)
    + (win || R(-68, -98, 40, 40, '#ffe9a8', 3) + P('M-48 -98v40M-68 -78h40', 'none', 'stroke-width="2"'))
    + R(32, -98, 40, 40, '#ffe9a8', 3) + P('M52 -98v40M32 -78h40', 'none', 'stroke-width="2"')
    + R(-26, -6, 52, 6, '#b8a89a', 2) + R(-34, 0, 68, 6, '#a89888', 2)
    + (drift === 2 ? E(0, 2, 62, 30, '#fff') + E(-44, 6, 30, 16, '#f2f7fb', NS) : '')
    + (drift === 1 ? E(-58, 4, 30, 18, '#fff') + E(58, 4, 30, 18, '#fff') + R(-30, 2, 60, 6, '#dfe8f0', 3, NS) : ''),
    `translate(${x} ${y}) scale(${s})`);
};
const fort = (x, y, s = 1, flag = true, half = false) => {
  const b = (bx, by, w = 38) => R(bx, by, w, 26, '#f6fafe', 9);
  return G(
    (flag ? thick('M0 -92L0 -150', '#a8672f', 3) + P('M2 -150L34 -140L2 -128Z', '#e23b3b', 'stroke-width="2.5"') : '')
    + b(-88, -26) + b(-50, -26) + b(-12, -26) + b(26, -26) + b(64, -26, 30)
    + b(-70, -52) + b(-32, -52) + b(6, -52) + b(44, -52)
    + (half ? '' : b(-88, -78, 30) + b(-50, -78) + b(-12, -78) + b(26, -78) + b(64, -78, 30))
    + (half ? '' : b(-70, -104, 34) + b(26, -104, 34) + P('M-34 -26Q0 -66 34 -26Z', '#6a7a96', 'stroke-width="3"')),
    `translate(${x} ${y}) scale(${s})`);
};
const plough = (x, y, s = 1) => G(
  P('M-96 -18L-66 -66L-60 -66L-60 -10Z', '#e8731a') + P('M-110 -10L-96 -22L-60 -10L-60 0L-110 0Z', '#d9d9e0')
  + R(-60, -50, 150, 36, '#f4b81c', 6) + P('M-30 -50L-18 -86H34L50 -50Z', '#f4b81c') + R(-18, -80, 20, 24, '#bfe3f5', 3) + R(10, -80, 20, 24, '#bfe3f5', 3)
  + R(40, -76, 50, 26, '#f4b81c', 4) + C(10, -92, 7, '#ff9a1a', 'stroke-width="2.5"') + C(-56, -34, 5, '#fff3b0', 'stroke-width="2"')
  + C(-30, -12, 17, '#33364a') + C(-30, -12, 7, '#b9c3cc') + C(60, -12, 17, '#33364a') + C(60, -12, 7, '#b9c3cc') + C(88, -12, 17, '#33364a') + C(88, -12, 7, '#b9c3cc'),
  `translate(${x} ${y}) scale(${s})`);
const night = () => R(0, 0, 400, 300, '#26325e') + '<g fill="#fff" opacity=".85">' + C(40, 36, 2, '#fff') + C(120, 24, 1.6, '#fff') + C(220, 50, 2, '#fff') + C(330, 30, 1.8, '#fff') + C(370, 80, 2, '#fff') + '</g>' + C(60, 70, 16, '#fff1a8', NS) + P('M0 190Q200 176 400 190V300H0Z', '#dfe9f6') + P('M0 250Q200 236 400 252V300H0Z', '#c5d4ea');

const pages = [
  // 1 — school is closed
  { svg: svg(R(0, 0, 400, 300, '#fbe6c4') + R(0, 212, 400, 88, '#c89a68') + R(0, 206, 400, 8, '#a87a4e', 0, NS)
    + G(R(34, 28, 150, 118, '#c4d1de', 6) + flakes(26, 3.4).replace(/opacity="\.9"/g, 'opacity="1"') + P('M109 28v118M34 87h150', 'none', 'stroke-width="5"') + R(24, 144, 170, 12, '#a87a4e', 4))
    + G(R(250, 150, 100, 64, '#f2f2f6', 8) + R(262, 160, 50, 30, '#d8e0ea', 4) + C(332, 176, 12, '#e8c14a', 'stroke-width="2.5"') + P('M250 150L226 108', 'none', 'stroke-width="3"') + P('M346 130q10 8 0 18M356 122q16 16 0 34', 'none', 'stroke="#f08a24" stroke-width="3"'))
    + mia(96, 268, 1.25, { mood: 'laugh', ar: 'u', al: 'u', hat: null, coat: '#f7a8c6', pants: '#f7a8c6', boots: '#fff' })
    + theo(190, 270, 1.3, { mood: 'laugh', ar: 'u', al: 'u', hat: null, coat: '#8cc4f0', pants: '#8cc4f0', boots: '#fff' })
    + maman(310, 262, 1.2, { mood: 'happy', al: 'f' })), text: "Ce matin, la neige tombe à gros flocons. À la radio, on annonce : « Les écoles sont fermées! » Mia et son petit frère Théo sautent de joie." },
  // 2 — getting dressed
  { svg: svg(R(0, 0, 400, 300, '#e9dcc8') + R(0, 214, 400, 86, '#9a7050') + R(0, 208, 400, 8, '#7a5238', 0, NS)
    + G(R(20, 30, 360, 14, '#8a5a3c', 4) + [50, 110, 170].map((px, i) => C(px, 44, 4, '#f4c430', 'stroke-width="2"') + R(px - 22, 52, 44, 80, ['#3fa34d', '#8a5cc7', '#e8c14a'][i], 10)).join('') + P('M214 44L214 70', 'none', 'stroke-width="3"'))
    + G(R(24, 232, 120, 10, '#6b4a3a', 3) + R(30, 238, 8, 40, '#6b4a3a') + R(130, 238, 8, 40, '#6b4a3a') + P('M60 224h16l-3 -14h-10z', '#d9473f') + R(56, 222, 28, 12, '#d9473f', 4))
    + G(P('M290 288l22 -2l4 -22l-14 -4l-6 12l-12 2z', '#d9473f'))
    + mia(160, 280, 1.3, { mood: 'happy' }) + theo(266, 276, 1.3, { mood: 'worried', hat: '#e23b3b', boots: '#f2f2f2', al: 'f' })
    + G(P('M300 290q18 -4 34 -2l-4 -22l-14 -2l-4 12l-10 4z', '#e23b3b', 'stroke-width="3"'), 'translate(30 -6)')), text: "Mia met sa tuque, ses mitaines et ses bottes. Théo cherche encore sa deuxième botte. Elle est sous le banc!" },
  // 3 — Samir waits outside
  { svg: svg(stormBg(34) + house(96, 230, 0.95, { drift: 1 }) + fort(364, 238, 0.35, false, true)
    + samir(300, 282, 1.25, { ar: 'o', al: 'f', mood: 'happy', flip: true, hold: shovel(-34, -36, 20) })
    + mia(178, 292, 1.2, { mood: 'laugh', ar: 'u' }) + theo(224, 292, 1.2, { mood: 'laugh', al: 'u' })), text: "Dehors, le voisin Samir les attend avec une pelle. — On construit un fort? demande-t-il. — Oui! crient Mia et Théo." },
  // 4 — building the fort
  { svg: svg(stormBg(30) + fort(200, 248, 1.15, false, true)
    + samir(78, 290, 1.25, { ar: 'f', mood: 'happy', hold: shovel(32, -34, -10) })
    + mia(320, 292, 1.25, { flip: true, ar: 'f', mood: 'happy', hold: G(E(-34, -52, 14, 10, '#f6fafe'), '') })
    + theo(278, 294, 1.2, { flip: true, ar: 'f', mood: 'laugh', hold: shovel(-26, -34, 10) })
    + G(R(10, 268, 22, 20, '#e8564a', 4) + E(21, 268, 11, 4, '#f6fafe') + C(56, 296, 8, '#f6fafe') + C(366, 296, 9, '#f6fafe'))), text: "Ils font de gros blocs de neige avec des seaux. Mia les empile. Théo les tape avec sa pelle." },
  // 5 — fort finished
  { svg: svg(stormBg(30)
    + fort(200, 236, 1.25, true)
    + samir(112, 292, 1.2, { mood: 'laugh', ar: 'u' }) + mia(200, 294, 1.2, { mood: 'laugh', ar: 'u', al: 'u' }) + theo(290, 296, 1.2, { mood: 'laugh', al: 'u' })), text: "Le fort a quatre murs, une porte et un drapeau rouge. Samir est fier. C'est le plus beau fort de la rue!" },
  // 6 — Madame Odette is stuck
  { svg: svg(stormBg(30) + house(276, 238, 1.15, { wall: '#9ec4a8', roof: '#7a5a6a', drift: 2, win: R(-68, -100, 50, 60, '#ffe9a8', 3) + odette(-43, -42, 0.5, { mood: 'worried', ar: 'w' }) + P('M-68 -100h50v60h-50z', 'none', 'stroke-width="3"') })
    + mia(80, 288, 1.4, { mood: 'worried', ar: 'f' }) + theo(142, 290, 1.3, { mood: 'worried' })), text: "Mia regarde la maison d'en face. Madame Odette est à sa fenêtre. Ses marches sont cachées sous la neige. Elle ne peut pas sortir." },
  // 7 — shovelling
  { svg: svg(stormBg(20) + house(262, 232, 1.15, { wall: '#9ec4a8', drift: 1 })
    + samir(118, 292, 1.2, { mood: 'happy', ar: 'f', hold: shovel(32, -34, -20) }) + mia(178, 296, 1.2, { mood: 'happy', ar: 'f', hold: shovel(32, -34, -20) }) + theo(238, 298, 1.2, { mood: 'happy', ar: 'f', hold: shovel(30, -32, -20) })
    + G(E(86, 270, 18, 12, '#fff') + E(60, 280, 12, 8, '#fff') + C(150, 240, 4, '#fff', NS) + C(212, 236, 4, '#fff', NS))), text: "Les trois amis courent chez Madame Odette. Pelletée après pelletée, ils déneigent les marches et le trottoir." },
  // 8 — Odette says thank you
  { svg: svg(stormBg(16) + house(240, 244, 1.3, { wall: '#9ec4a8', drift: 1 })
    + odette(240, 192, 1.15, { mood: 'happy', ar: 'u', al: 'f' })
    + samir(70, 292, 1.2, { mood: 'happy', hold: shovel(30, -30, -15) }) + mia(130, 296, 1.2, { mood: 'happy', ar: 'f' }) + theo(184, 298, 1.2, { mood: 'laugh', al: 'u' })
    + leaf(300, 70, 1, '#e8556a')), text: "Madame Odette ouvre sa porte. — Merci, mes chers enfants! Vous êtes bien gentils, dit-elle. — Ce n'est rien, répond Mia en souriant." },
  // 9 — hot chocolate
  { svg: svg(R(0, 0, 400, 300, '#f6e3c8') + R(0, 214, 400, 86, '#b8825a') + R(0, 208, 400, 8, '#8a5a3c', 0, NS)
    + G(R(150, 36, 100, 80, '#bfe3f5', 4) + flakes(8, 3).replace(/opacity="\.9"/g, 'opacity="1"') + P('M200 36v80M150 76h100', 'none', 'stroke-width="4"'))
    + odette(70, 262, 1.3, { mood: 'happy', hat: null }) + mia(180, 252, 1.25, { hat: null, mood: 'laugh' }) + samir(262, 252, 1.2, { hat: null, mood: 'happy' }) + theo(336, 256, 1.2, { hat: null, mood: 'laugh' })
    + G(R(20, 214, 360, 16, '#a8672f', 6) + R(40, 228, 14, 60, '#8a5a3c') + R(346, 228, 14, 60, '#8a5a3c'))
    + mug(120, 214, 1.3) + mug(200, 214, 1.4) + mug(262, 214, 1.4) + mug(330, 214, 1.3) + steam(196, 190) + steam(258, 190) + steam(326, 192) + steam(118, 192)), text: "Madame Odette les invite à entrer. Elle prépare du chocolat chaud avec des guimauves. Ça fait du bien aux mains froides!" },
  // 10 — afternoon play
  { svg: svg(stormBg(18) + fort(330, 218, 0.8, true)
    + G(P('M70 250q18 -10 36 0l12 24q-24 8 -60 0z', '#dbe6f0', NS) + C(88, 240, 8, '#dbe6f0', NS) + P('M62 252q-18 6 -20 22q16 -6 28 -12zM114 252q18 6 20 22q-16 -6 -28 -12z', '#dbe6f0', NS))
    + theo(150, 282, 1.3, { mood: 'laugh', ar: 'u', al: 'u' }) + mia(250, 292, 1.25, { mood: 'laugh', ar: 'u', flip: false }) + C(292, 190, 8, '#fff', 'stroke-width="2.5"') + P('M300 196l16 8M296 206l14 6', 'none', 'stroke="#fff" stroke-width="3"')
    + samir(350, 290, 1.1, { flip: true, mood: 'surprised', ar: 'u' })), text: "Tout l'après-midi, ils jouent dans la neige. Théo fait un ange de neige. Mia lance une boule à Samir : plouf!" },
  // 11 — bedtime
  { svg: svg(R(0, 0, 400, 300, '#7a6fa8') + R(0, 208, 400, 92, '#9a7050') + G(R(160, 30, 80, 84, '#26325e', 4) + flakes(10, 3).replace(/opacity="\.9"/g, 'opacity="1"').replace(/cx="(\d+)"/g, (m, a) => `cx="${160 + (a % 80)}"`).replace(/cy="(\d+)"/g, (m, a) => `cy="${30 + (a % 84)}"`) + P('M200 30v84M160 72h80', 'none', 'stroke-width="4"'))
    + G(R(30, 178, 130, 20, '#8a5a3c', 4) + R(30, 160, 10, 70, '#8a5a3c') + R(236, 170, 130, 28, '#8a5a3c', 4) + R(356, 150, 10, 80, '#8a5a3c'))
    + mia(100, 260, 1.4, { hat: null, mood: 'sleepy' }) + theo(300, 246, 1.5, { hat: null, mood: 'sleepy' })
    + G(R(22, 190, 146, 70, '#e8556a', 10) + P('M22 205h146', 'none', 'stroke="#fff" stroke-width="3" opacity=".6"') + R(232, 190, 144, 70, '#4a8fe0', 10) + P('M232 205h144', 'none', 'stroke="#fff" stroke-width="3" opacity=".6"'))), text: "Le soir, Mia et Théo sont fatigués. Dans leur lit, ils écoutent le vent. Dehors, la neige tombe encore." },
  // 12 — the snowplough
  { svg: svg(night() + flakes(14, 2.5) + house(88, 236, 0.9, { wall: '#b98a5e', drift: 1, win: R(-68, -98, 40, 40, '#ffe9a8', 3) + mia(-48, -60, 0.4, { hat: null, mood: 'surprised', ar: 'w' }) })
    + G(P('M80 268L-10 268L-10 236Z', '#fff3b0', NS + ' opacity=".5"'), 'translate(228 0)') + P('M260 220L230 240V270L270 270Z', '#fff3b0', NS + ' opacity=".35"')
    + plough(300, 270, 1.15) + G(E(196, 268, 34, 18, '#fff') + E(224, 262, 22, 20, '#fff', NS))
    + P('M170 252l-12 -8M178 242l-12 -12', 'none', 'stroke="#fff" stroke-width="3"')), text: "Au milieu de la nuit, un gros bruit réveille Mia. Une déneigeuse jaune passe dans la rue. Ses lumières orange tournent." },
  // 13 — morning after
  { svg: svg(R(0, 0, 400, 300, '#a9dcf5') + C(330, 50, 24, '#fff1a8') + '<g fill="#8fb4cc">' + R(10, 128, 50, 40, '#9bbdd4') + R(300, 124, 54, 44, '#9bbdd4') + '</g>' + P('M0 176Q200 164 400 176V300H0Z', '#f6f9fc') + P('M0 250Q200 236 400 252V300H0Z', '#e8eff6') + P('M0 270Q200 262 400 274V300H0Z', '#dfe8f0')
    + house(330, 220, 0.75, { wall: '#9ec4a8', drift: 1 }) + odette(316, 192, 0.7, { mood: 'happy', ar: 'u' })
    + fort(110, 222, 0.95, true)
    + mia(190, 292, 1.35, { mood: 'happy', ar: 'u' }) + theo(250, 296, 1.35, { mood: 'laugh', al: 'u' }) + samir(52, 294, 1.2, { mood: 'happy', ar: 'u' })), text: "Le lendemain, la rue est bien dégagée sous le soleil. Le fort est toujours là. Mia sourit : quelle belle journée de tempête!" },
];

export const book = {
  id: 'jour-de-tempete',
  title: 'Le jour de tempête',
  emoji: '❄️',
  level: 2,
  minutes: 9,
  cover: svg(stormBg(46) + fort(100, 236, 1.05, true) + house(334, 214, 0.7, { wall: '#9ec4a8', drift: 1 }) + mia(210, 292, 1.5, { mood: 'laugh', ar: 'u' }) + theo(268, 296, 1.5, { mood: 'laugh', al: 'u' })),
  pages,
  words: [
    { word: 'une tempête', emoji: '🌨️', def: 'Un très gros mauvais temps, avec beaucoup de neige et de vent.' },
    { word: 'fermé', emoji: '🔒', def: "Qui n'est pas ouvert. Ce jour-là, il n'y a pas d'école." },
    { word: 'une tuque', emoji: '🧶', def: "Un bonnet de laine pour garder la tête au chaud." },
    { word: 'une pelle', emoji: '⛏️', def: 'Un outil pour ramasser et lancer la neige.' },
    { word: 'un fort', emoji: '🏰', def: 'Une cachette avec de gros murs. Ici, il est fait de blocs de neige.' },
    { word: 'déneiger', emoji: '❄️', def: 'Enlever la neige d’un endroit.' },
    { word: 'un voisin', emoji: '🏘️', def: 'Une personne qui habite tout près de chez toi.' },
    { word: 'une guimauve', emoji: '🍡', def: 'Une petite friandise blanche et molle qui fond dans le chocolat chaud.' },
    { word: 'une déneigeuse', emoji: '🚜', def: 'Un gros camion qui pousse la neige hors de la rue.' },
  ],
  quiz: [
    { q: 'Pourquoi Mia et Théo sautent-ils de joie?', options: ["Il n'y a pas d'école.", "C'est leur anniversaire.", 'Papa fait des crêpes.'], answer: 0 },
    { q: 'Qui attend Mia et Théo dehors?', options: ['Madame Odette', 'Samir, le voisin', 'Maman'], answer: 1 },
    { q: 'Que font les enfants en premier?', options: ['Ils boivent du chocolat chaud.', 'Ils déneigent les marches.', 'Ils construisent un fort.'], answer: 2 },
    { q: 'Pourquoi Madame Odette ne peut-elle pas sortir?', options: ['Ses marches sont cachées sous la neige.', 'Elle est endormie.', "Elle n'a pas de manteau."], answer: 0 },
    { q: 'Que veut dire « déneiger »?', options: ['Faire tomber la neige', 'Enlever la neige', 'Jouer dans la neige'], answer: 1 },
    { q: 'Que boivent les enfants chez Madame Odette?', options: ['Du lait froid', 'Du jus', 'Du chocolat chaud'], answer: 2 },
    { q: 'Comment se sent Madame Odette quand les enfants ont fini?', options: ['Fâchée', 'Contente et reconnaissante', 'Fatiguée'], answer: 1 },
    { q: 'Qu\'est-ce qui réveille Mia pendant la nuit?', options: ['Une déneigeuse', 'Le chat', 'Un orage'], answer: 0 },
  ],
};
