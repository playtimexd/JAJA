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
const camille = (x, y, s, o = {}) => kid(x, y, s, { skin: '#9a6040', hair: '#1e1612', coat: '#f4c430', pants: '#3b7fd1', boots: '#e8556a', back: C(-16, -84, 11, '#1e1612') + C(16, -84, 11, '#1e1612') + C(0, -92, 13, '#1e1612'), ...o });
const GLASS = C(-7, -74, 7.5, 'rgba(255,255,255,.3)', 'stroke-width="2.2"') + C(7, -74, 7.5, 'rgba(255,255,255,.3)', 'stroke-width="2.2"') + P('M-0.5 -74h1', 'none', 'stroke-width="2"');
const lacasse = (x, y, s, o = {}) => kid(x, y, s * 1.15, { skin: '#f1c6a0', hair: '#c0392b', coat: '#e8785a', pants: '#7a5a6a', boots: '#6b4a3a', back: C(0, -97, 10, '#c0392b'), nc: true, ...o, hold: R(-12, -50, 24, 34, '#fff', 4, 'stroke-width="2"') + (o.hold || ''), extra: GLASS + (o.extra || '') });
const MOUSTACHE = P('M-11 -63Q-6 -69 0 -64Q6 -69 11 -63Q6 -60 0 -61Q-6 -60 -11 -63Z', '#4a3a3a', 'stroke-width="1.5"');
const dimitri = (x, y, s, o = {}) => kid(x, y, s * 1.3, { skin: '#e0b08a', hair: '#8a8a92', coat: '#4a7ac0', pants: '#6b4a3a', boots: '#3a3a44', nc: true, ...o, hold: P('M-8 -57v40M8 -57v40', 'none', 'stroke="#c8372d" stroke-width="3"') + (o.hold || ''), extra: MOUSTACHE + (o.extra || '') });

const spk = (x, y, r = 10, c = '#ffb020') => P(`M${x} ${y - r}L${x + r * 0.28} ${y - r * 0.28}L${x + r} ${y}L${x + r * 0.28} ${y + r * 0.28}L${x} ${y + r}L${x - r * 0.28} ${y + r * 0.28}L${x - r} ${y}L${x - r * 0.28} ${y - r * 0.28}Z`, c, 'stroke="#e8731a" stroke-width="2"');
const sparks = (x, y, s = 1) => spk(x, y, 14 * s) + spk(x + 24 * s, y - 14 * s, 8 * s, '#ffe066') + spk(x + 34 * s, y + 8 * s, 6 * s) + spk(x - 22 * s, y - 20 * s, 7 * s, '#ffe066') + spk(x + 8 * s, y - 34 * s, 5 * s);

const dragon = (x, y, s = 1, o = {}) => {
  const { mood = 'happy', fly = false, flip = false, body = '#3fb5a0', belly = '#f4c26a', wing = '#7fd6c4', tilt = 0, lite = false } = o;
  const eye = (ex, py = 0) => C(ex, -70, 6.6, '#fff', 'stroke-width="2.4"') + C(ex * 0.8, -69 + py, 3.2, O, NS) + C(ex * 0.8 - 1, -70.6 + py, 1, '#fff', NS);
  const sh = (ex) => P(`M${ex - 5} -70q5 -7 10 0`, 'none', 'stroke-width="2.6"');
  const cl = (ex) => P(`M${ex - 5} -72q5 5 10 0`, 'none', 'stroke-width="2.6"');
  const M = {
    happy: eye(-9) + eye(9) + P('M-6 -52q6 6 12 0', 'none', 'stroke-width="2.4"'),
    sad: eye(-9, 2) + eye(9, 2) + P('M-15 -80L-4 -76M15 -80L4 -76', 'none', 'stroke-width="2.6"') + P('M-5 -49q5 -5 10 0', 'none', 'stroke-width="2.4"') + P('M15 -63q-3 6 0 9q3 -3 0 -9', '#7cc4f0', NS),
    sneeze: P('M-14 -72l8 3M14 -72l-8 3', 'none', 'stroke-width="3"') + P('M-5 -52q5 6 10 0', 'none', 'stroke-width="2.4"') + sparks(0, -40, 1.1),
    sleepy: cl(-9) + cl(9) + P('M-4 -52q4 3 8 0', 'none', 'stroke-width="2.2"'),
    surprised: eye(-9) + eye(9) + E(0, -51, 3, 4, '#b3363a', 'stroke-width="2"'),
    laugh: sh(-9) + sh(9) + P('M-7 -54q7 13 14 0z', '#b3363a', 'stroke-width="2.2"'),
  };
  const wingP = fly
    ? G(P('M-14 -50Q-50 -108 -98 -86Q-86 -76 -92 -62Q-76 -62 -74 -46Q-46 -42 -14 -30Z', wing) , '')
    : G(P('M-14 -50Q-46 -70 -42 -32Q-28 -40 -14 -30Z', wing), '');
  return G(
    G(wingP, 'scale(-1 1)') + G(wingP, '')
    + thick('M16 -12Q52 -6 46 -36', body, 9) + P('M46 -34l-9 -9l15 -2z', belly, 'stroke-width="2.4"')
    + E(0, -30, 24, 28, body) + E(0, -27, 15, 21, belly, 'stroke="none"') + (lite ? '' : P('M-12 -36h24M-13 -28h26M-12 -20h24', 'none', 'stroke="#e5a94a" stroke-width="1.8"'))
    + (fly ? '' : E(-12, -2, 11, 5.5, body) + E(12, -2, 11, 5.5, body))
    + (lite ? '' : E(-25, -33, 6, 10, body, 'transform="rotate(25 -25 -33)"') + E(25, -33, 6, 10, body, 'transform="rotate(-25 25 -33)"'))
    + P('M-14 -86l-5 -15l12 9zM14 -86l5 -15l-12 9z', belly, 'stroke-width="2.4"') + (lite ? '' : P('M-5 -88l5 -10l5 10z', belly, 'stroke-width="2.4"'))
    + E(0, -68, 24, 21, body) + E(0, -56, 13, 9, body === '#3fb5a0' ? '#6fd3bd' : '#58b8a6') + (lite ? '' : C(-4, -57, 1.8, O, NS) + C(4, -57, 1.8, O, NS) + C(-17, -62, 3.5, '#f28b8b', NS + ' opacity=".6"') + C(17, -62, 3.5, '#f28b8b', NS + ' opacity=".6"'))
    + (M[mood] || M.happy),
    `translate(${x} ${y}) scale(${flip ? -s : s} ${s}) rotate(${tilt})`);
};

const brick = { day: '#b5563a', dusk: '#a8503e', night: '#6a3f4c' };
const alley = (mode = 'day', o = {}) => {
  const { dark = false } = o;
  const sky = { day: '#8fd0ef', dusk: '#f4a86b', night: '#1f2a55' }[mode];
  const wc = mode === 'day' ? '#bfe3f5' : dark ? '#2a3150' : '#ffe08a';
  const sx = 300;
  const wins = [24, 90, 156, 222, 354].flatMap((wx) => [78, 128, 178].map((wy) => [wx, wy]));
  const steps = Array.from({ length: 7 }, (_, i) => E(sx + (i % 2 ? 17 : -17), 212 - i * 15, 18, 4.5, '#4a4a5e', 'stroke-width="2"')).join('');
  return R(0, 0, 400, 300, sky)
    + (mode === 'day' ? C(60, 36, 18, '#fff1a8', NS) : mode === 'dusk' ? C(330, 50, 24, '#ffe9a8', NS) : C(60, 34, 15, '#fff1a8', NS) + C(240, 34, 2, '#fff', NS) + C(330, 24, 2.4, '#fff', NS))
    + R(0, 56, 400, 164, brick[mode]) + R(0, 50, 400, 10, '#5a2f2a') + P('M0 90h400M0 130h400M0 170h400M0 200h400', 'none', 'stroke="#000" stroke-width="1.5" opacity=".13"')
    + R(0, 214, 400, 86, '#7a7f90', 0, NS) + P('M0 214h400', 'none', `stroke="${O}" stroke-width="3"`)
    + G(R(sx - 36, 114, 72, 5, '#2b2b3a', 1) + R(sx - 36, 164, 72, 5, '#2b2b3a', 1) + P(`M${sx - 36} 114v-22h72v22M${sx - 36} 164v-22h72v22`, 'none', 'stroke="#2b2b3a" stroke-width="2.5"') + R(sx - 2, 92, 4, 124, '#2b2b3a') + steps
      + P(`M${sx + 20} 212L${sx + 20} 174M${sx + 20} 174L${sx - 20} 150`, 'none', 'stroke="#2b2b3a" stroke-width="2.5"'))
    + (mode === 'day' ? '' : R(0, 0, 400, 300, mode === 'dusk' ? '#ff7a3a' : '#10183a', 0, `opacity="${mode === 'dusk' ? 0.14 : 0.32}" ${NS}`))
    + G(wins.map(([wx, wy]) => R(wx, wy, 32, 30, wc, 2)).join('') + P(wins.map(([wx, wy]) => `M${wx + 16} ${wy}v30`).join(''), 'none', 'stroke-width="2"'), '');
};
const lineAt = (x1, y1, x2, y2, sag, t) => { const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + sag * 2; const u = 1 - t; return [u * u * x1 + 2 * u * t * mx + t * t * x2, u * u * y1 + 2 * u * t * my + t * t * y2]; };
const clothes = (x1, y1, x2, y2, sag, cols) => {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + sag * 2;
  let s = P(`M${x1} ${y1}Q${mx} ${my} ${x2} ${y2}`, 'none', 'stroke-width="2.5"');
  cols.forEach((c, i) => {
    const [px, py] = lineAt(x1, y1, x2, y2, sag, (i + 1) / (cols.length + 1));
    s += i % 3 === 0 ? P(`M${px - 9} ${py}h18l6 7l-5 5l-3 -3v17h-14v-17l-3 3l-5 -5z`, c, 'stroke-width="2.2"') : i % 3 === 1 ? R(px - 9, py, 18, 22, c, 2, 'stroke-width="2.2"') : R(px - 4, py, 8, 14, c, 3, 'stroke-width="2"') + R(px + 5, py, 8, 14, '#fff', 3, 'stroke-width="2"');
  });
  return s;
};
const lanternCols = ['#ff7a3a', '#ffd04a', '#ff5a7a', '#7ad0ff', '#ff9a3a'];
const lanternLine = (x1, y1, x2, y2, sag, n, lit) => {
  let s = P(`M${x1} ${y1}Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + sag * 2} ${x2} ${y2}`, 'none', 'stroke-width="2.2"');
  for (let i = 0; i < n; i++) {
    const [px, py] = lineAt(x1, y1, x2, y2, sag, (i + 0.5) / n);
    const c = lit ? lanternCols[i % 5] : '#8f736c';
    s += (lit ? C(px, py + 14, 24, '#ffd04a', `${NS} opacity=".3"`) : '') + P(`M${px} ${py}v7`, 'none', 'stroke-width="2"') + E(px, py + 17, 10, 11, c, 'stroke-width="2.2"');
  }
  return s;
};
const bin = (x, y, s, col, lid) => G(P('M-22 -52L22 -52L18 0L-18 0Z', col) + R(-25, -60, 50, 10, lid || col, 4) + C(-14, 0, 5, '#33364a', 'stroke-width="2"') + C(14, 0, 5, '#33364a', 'stroke-width="2"') + P('M-8 -34h16', 'none', 'stroke="#fff" stroke-width="3" opacity=".5"'), `translate(${x} ${y}) scale(${s})`);
const table = (x, y, w) => G(R(x, y + 12, w, 16, '#fff', 0, NS) + P(`M${x + 5} ${y + 20}h${w - 10}`, 'none', 'stroke="#d9473f" stroke-width="16" stroke-dasharray="10 10" stroke-linecap="butt"') + R(x, y, w, 12, '#f2f2f6', 3) + R(x + 6, y + 28, 8, 28, '#7a5238') + R(x + w - 14, y + 28, 8, 28, '#7a5238'));
const bat = (x, y, s, c = '#3fb5a0') => G(P('M0 0Q-14 -22 -40 -14Q-30 -8 -34 0Q-18 -2 0 6Q18 -2 34 0Q30 -8 40 -14Q14 -22 0 0Z', c, 'stroke-width="4"') + E(0, 4, 8, 11, c, 'stroke-width="4"') + C(0, -9, 7, c, 'stroke-width="4"') + P('M6 12Q20 20 16 30', 'none', `stroke="${c}" stroke-width="4"`), `translate(${x} ${y}) scale(${s})`);
const feather = (x1, y1, x2, y2) => P(`M${x1} ${y1}Q${(x1 + x2) / 2 - 8} ${(y1 + y2) / 2 + 2} ${x2} ${y2}Q${(x1 + x2) / 2 + 8} ${(y1 + y2) / 2 - 4} ${x1} ${y1}Z`, '#f2f2f6', 'stroke-width="2.4"');
const zz = (x, y) => P(`M${x} ${y}h10l-10 12h10M${x + 16} ${y - 14}h7l-7 8h7`, 'none', 'stroke="#fff" stroke-width="3"');

const pages = [
  // 1 — the alley
  { svg: svg(alley('dusk') + G(clothes(0, 98, 282, 108, 14, ['#e8556a', '#3b7fd1', '#f4c430', '#fff', '#3fa34d', '#8a5cc7', '#f08a24'])) + G(clothes(330, 126, 400, 122, 6, ['#fff', '#e8556a']))
    + bin(46, 262, 1, '#3b7fd1') + bin(92, 264, 0.9, '#3fa34d') + camille(190, 276, 1.25, { mood: 'happy', ar: 'w' })), text: "Derrière la maison de Camille, la ruelle sent le pain grillé et l'herbe chaude. Des escaliers en colimaçon grimpent jusqu'aux balcons, et des cordes à linge relient les fenêtres comme de longues toiles d'araignée. Demain, c'est la fête des voisins." },
  // 2 — a sneeze behind the bins
  { svg: svg(alley('night') + bin(268, 262, 1.1, '#3fa34d') + bin(316, 264, 1.1, '#8a8a96') + bin(362, 262, 1, '#e8731a') + C(310, 214, 38, '#ffb020', `${NS} opacity=".25"`) + sparks(318, 196, 1.1)
    + bin(180, 268, 1.2, '#3b7fd1') + camille(100, 280, 1.3, { mood: 'surprised', ar: 'f', hold: P('M0 0', 'none') })), text: "Ce soir-là, Camille sort le bac de recyclage. Soudain, elle entend un petit « Atchoum! » derrière les poubelles. Une étincelle orange jaillit dans la pénombre." },
  // 3 — the lost dragon
  { svg: svg(alley('night') + bin(366, 266, 1.1, '#8a8a96')
    + dragon(296, 276, 1.0, { mood: 'sad' }) + bin(236, 268, 1.35, '#3b7fd1')
    + camille(110, 282, 1.35, { mood: 'surprised', tilt: 8, ar: 'f' })), text: "Derrière le bac bleu, un minuscule dragon vert est recroquevillé. Il est à peine plus gros qu'un chat, et ses yeux sont pleins de larmes. Camille s'accroupit doucement près de lui." },
  // 4 — first words
  { svg: svg(alley('night') + camille(100, 292, 1.5, { mood: 'happy', ar: 'f', al: 'f' }) + dragon(262, 290, 1.25, { mood: 'sneeze' })), text: "— N'aie pas peur, murmure Camille. Comment t'appelles-tu? — Pouf, répond le dragon d'une toute petite voix. Un coup de vent m'a emporté loin de ma famille. Atchoum!" },
  // 5 — a secret bed
  { svg: svg(alley('night') + camille(96, 284, 1.45, { mood: 'happy', ar: 'f', hold: C(34, -52, 7, '#d9a066', 'stroke-width="2.5"') + C(37, -55, 1.2, '#6b3f26', NS) })
    + G(P('M180 290L190 232H300L310 290Z', '#c89a68') + R(184, 232, 122, 8, '#b8803f', 2) + P('M200 260h90', 'none', 'stroke="#a8672f" stroke-width="2"')) + dragon(246, 270, 0.95, { mood: 'sleepy' })
    + G(P('M194 262L190 290H310L302 262Q248 244 194 262Z', '#e8556a') + P('M200 270h98M204 280h92', 'none', 'stroke="#fff" stroke-width="3" opacity=".6"')) + zz(304, 214)), text: "Camille lui apporte un biscuit et une vieille couverture. Pouf grignote en frissonnant, puis il s'endort dans une boîte de carton, sous l'escalier. Camille promet de garder son secret." },
  // 6 — preparing the party
  { svg: svg(alley('day') + G(lanternLine(0, 90, 400, 96, 18, 5, false)) + G(lanternLine(0, 126, 400, 130, 14, 4, false))
    + table(20, 238, 150) + lacasse(70, 232, 1, { mood: 'happy', ar: 'u', hold: '' }) + dimitri(350, 270, 1.0, { mood: 'happy', al: 'f' })
    + camille(240, 282, 1.3, { mood: 'worried', ar: 'f' }) + dragon(284, 262, 0.62, { mood: 'happy' }) + G(P('M268 254L268 262Q284 270 300 262L300 254Z', '#d9a066') + R(264, 250, 40, 8, '#b8803f', 3))), text: "Le lendemain, toute la ruelle prépare la fête. Madame Lacasse suspend des lanternes en papier, et monsieur Dimitri installe de longues tables. Camille arrive avec un panier, et Pouf se cache dedans." },
  // 7 — Atchoum! sparks everywhere
  { svg: svg(alley('day') + table(20, 232, 340) + G(C(268, 234, 13, '#2a2a2a', NS) + C(268, 220, 5, '#777', NS + ' opacity=".6"') + C(276, 208, 7, '#999', NS + ' opacity=".5"'))
    + camille(80, 284, 1.3, { mood: 'worried', ar: 'f' }) + dragon(188, 264, 1.0, { mood: 'sneeze' }) + G(P('M160 262L158 278Q188 292 218 278L216 262Z', '#d9a066') + R(154, 256, 68, 9, '#b8803f', 3))
    + lacasse(322, 286, 1.0, { mood: 'surprised', ar: 'u', al: 'u', flip: true })), text: "Tout à coup, le panier se met à trembler : « Atchoum! » Des étincelles volent partout et brûlent un coin de nappe. — Un dragon! hurle Madame Lacasse en lâchant sa louche." },
  // 8 — Camille defends Pouf
  { svg: svg(alley('day') + dragon(262, 290, 1.2, { mood: 'sad' })
    + camille(178, 296, 1.5, { mood: 'worried', ar: 'o', al: 'o' })
    + dimitri(62, 288, 1.0, { mood: 'surprised', al: 'f', ar: 'f' }) + G(R(30, 214, 66, 8, '#a8672f', 3) + R(34, 222, 6, 66, '#a8672f') + R(86, 222, 6, 66, '#a8672f') + R(36, 160, 56, 54, '#c89a68', 4) + P('M44 172h40M44 184h40M44 196h40', 'none', 'stroke-width="2"'))
    + lacasse(350, 288, 1.0, { mood: 'surprised', flip: true, al: 'f' })), text: "Monsieur Dimitri se cache derrière une chaise et les voisins reculent. — Attendez! s'écrie Camille en ouvrant les bras. Il n'est pas méchant, il est perdu et il a le rhume!" },
  // 9 — softening
  { svg: svg(alley('day') + lacasse(76, 288, 1.0, { mood: 'sad', ar: 'f', hold: R(24, -64, 12, 14, '#fff', 2, 'stroke-width="2"') })
    + dragon(186, 292, 1.4, { mood: 'sad' }) + camille(300, 290, 1.4, { mood: 'happy', al: 'f' }) + dimitri(372, 292, 0.85, { mood: 'worried', flip: true })), text: "Pouf baisse la tête, et une grosse larme roule sur son museau. Les voisins se regardent, un peu honteux. Madame Lacasse s'approche et lui tend un mouchoir." },
  // 10 — power cut
  { svg: svg(alley('night', { dark: true }) + G(lanternLine(0, 90, 400, 96, 18, 5, false)) + table(160, 244, 160)
    + dimitri(70, 292, 1.0, { mood: 'sad' }) + lacasse(124, 298, 0.95, { mood: 'worried' }) + camille(250, 276, 1.2, { mood: 'worried' }) + dragon(340, 282, 0.95, { mood: 'sad' })), text: "Au coucher du soleil, une panne de courant plonge tout le quartier dans le noir. Les guirlandes s'éteignent et les lanternes restent sombres. — Notre belle fête est gâchée, soupire monsieur Dimitri." },
  // 11 — tickle with a feather
  { svg: svg(alley('night', { dark: true }) + G(lanternLine(0, 90, 400, 96, 18, 5, false)) + dragon(216, 292, 1.3, { mood: 'surprised' })
    + camille(112, 292, 1.5, { mood: 'happy', ar: 'f' }) + feather(160, 226, 204, 224)
    + dimitri(336, 294, 0.95, { mood: 'surprised', flip: true }) + lacasse(378, 296, 0.8, { mood: 'worried', flip: true })), text: "Pouf renifle, puis il se redresse. — Je pourrais allumer vos lanternes, propose-t-il, mais je ne sais pas éternuer sur commande. Camille ramasse une plume de pigeon et lui chatouille le nez." },
  // 12 — lanterns light up
  { svg: svg(alley('night') + G(lanternLine(0, 90, 400, 96, 18, 5, true))
    + bin(200, 272, 1.3, '#3b7fd1') + dragon(200, 196, 1.0, { mood: 'sneeze' })
    + G(spk(112, 112, 7) + spk(60, 100, 6, '#ffe066') + spk(300, 110, 7) + spk(348, 100, 6, '#ffe066') + spk(250, 120, 5))
    + camille(86, 292, 1.3, { mood: 'laugh', ar: 'u' }) + lacasse(300, 296, 1.0, { mood: 'laugh', ar: 'u' })), text: "Atchoum! Atchoum! Atchoum! À chaque éternuement, une étincelle file le long des cordes à linge. Les lanternes s'allument une à une, rouges, orange et dorées. La ruelle entière brille comme un ciel d'étoiles." },
  // 13 — the party, and a distant rumble
  { svg: svg(alley('night') + G(lanternLine(0, 90, 400, 96, 18, 5, true))
    + G(table(130, 250, 140)) + G(E(200, 246, 16, 5, '#e8c14a') + P('M186 246Q200 226 214 246Z', '#d9a066', 'stroke-width="2.4"'))
    + camille(66, 290, 1.3, { mood: 'laugh' }) + lacasse(112, 296, 0.95, { mood: 'happy', ar: 'f' })
    + dragon(214, 276, 1.0, { mood: 'happy' }) + dimitri(330, 296, 1.0, { mood: 'happy', ar: 'f' })
    + bat(60, 36, 0.5)), text: "Les voisins applaudissent! Madame Lacasse offre une part de tarte au sucre à Pouf, et monsieur Dimitri lui demande pardon pour sa frayeur. Soudain, un grondement lointain fait vibrer les vitres." },
  // 14 — the family arrives
  { svg: svg(alley('night') + G(lanternLine(0, 90, 400, 96, 18, 5, true))
    + dragon(40, 180, 1.5, { fly: true, body: '#2f9a88', wing: '#6bc9b8', tilt: -8, lite: true }) + dragon(360, 180, 1.5, { fly: true, tilt: 8, flip: true, lite: true }) + dragon(206, 130, 1.0, { fly: true, body: '#3a9ac0', wing: '#8fd0ef', lite: true })
    + camille(150, 296, 1.35, { mood: 'happy', ar: 'u' }) + dragon(250, 262, 1.1, { mood: 'laugh', fly: true })), text: "Trois grands dragons descendent entre les balcons, attirés par la lumière des lanternes. — Maman! Papa! s'écrie Pouf en battant des ailes. Il serre Camille dans ses bras avant de s'envoler." },
  // 15 — goodbye
  { svg: svg(R(0, 0, 400, 300, '#1f2a55') + R(0, 0, 400, 120, '#2a3870', 0, NS) + C(300, 60, 26, '#fff1a8', NS) + '<g fill="#fff">' + [[30, 30], [90, 70], [150, 28], [210, 60], [60, 110], [350, 120], [260, 20], [130, 100]].map(([a, b]) => C(a, b, 2, '#fff', NS)).join('') + '</g>'
    + bat(110, 104, 0.7) + bat(165, 76, 0.6, '#2f9a88') + bat(212, 56, 0.8, '#3a9ac0')
    + spk(100, 130, 5) + spk(240, 74, 4, '#ffe066') + spk(60, 150, 4, '#ffe066')
    + R(0, 214, 400, 90, '#6a3f4c') + G(wins2()) + G(R(0, 206, 400, 8, '#2b2b3a') + P('M0 206V170M60 206V170M120 206V170M180 206V170M240 206V170M300 206V170M360 206V170M400 206V170M0 170H400', 'none', 'stroke="#2b2b3a" stroke-width="3"'))
    + camille(270, 206, 1.5, { mood: 'happy', ar: 'u', al: 'f', hold: '' }) + G(P('M222 150q-8 -10 2 -16q10 -4 14 8q-2 12 -16 8z', '#58d3a6', 'stroke-width="2.5"'))), text: "Camille le salue longtemps, jusqu'à ce que les dragons ressemblent à de petites étoiles. Dans sa main, une écaille verte est encore tiède. Depuis ce soir-là, quand le vent chante dans les cordes à linge, elle sourit : peut-être que Pouf pense à elle." },
];
function wins2() { return R(24, 230, 40, 40, '#ffe08a', 2) + R(120, 230, 40, 40, '#ffe08a', 2) + R(330, 230, 40, 40, '#ffe08a', 2) + P('M44 230v40M24 250h40M140 230v40M120 250h40M350 230v40M330 250h40', 'none', 'stroke-width="2"'); }

export const book = {
  id: 'dragon-de-la-ruelle',
  title: 'Le dragon de la ruelle',
  emoji: '🐉',
  level: 3,
  minutes: 12,
  cover: svg(alley('dusk') + G(lanternLine(0, 90, 400, 96, 18, 5, true)) + bin(60, 266, 1.1, '#3b7fd1') + camille(150, 284, 1.45, { mood: 'happy', ar: 'f' }) + dragon(250, 284, 1.3, { mood: 'sneeze' })),
  pages,
  words: [
    { word: 'une ruelle', emoji: '🏘️', def: 'Une petite rue étroite, derrière les maisons.' },
    { word: 'un escalier en colimaçon', emoji: '🌀', def: "Un escalier qui tourne autour d'un poteau, comme la coquille d'un escargot." },
    { word: 'une corde à linge', emoji: '🧺', def: 'Une corde tendue où on suspend les vêtements pour les faire sécher.' },
    { word: 'une lanterne', emoji: '🏮', def: 'Une lampe en papier ou en verre qui éclaire doucement.' },
    { word: 'une étincelle', emoji: '✨', def: 'Une toute petite flamme brillante qui jaillit du feu.' },
    { word: 'éternuer', emoji: '🤧', def: "Faire « atchoum! » quand le nez chatouille." },
    { word: 'recroquevillé', emoji: '😟', def: "Le corps replié sur soi pour avoir moins froid ou moins peur." },
    { word: 'une panne de courant', emoji: '🔌', def: "Un moment où l'électricité s'arrête et où tout s'éteint." },
    { word: 'honteux', emoji: '😳', def: "Qui a un peu de honte parce qu'il a mal agi." },
  ],
  quiz: [
    { q: "Où se passe l'histoire?", options: ['Dans une forêt', 'Dans une ruelle de Montréal', "Dans une cour d'école"], answer: 1 },
    { q: 'Comment Camille découvre-t-elle Pouf?', options: ['Elle le voit voler dans le ciel.', 'Il frappe à sa porte.', 'Elle entend un éternuement et voit une étincelle.'], answer: 2 },
    { q: 'Pourquoi Pouf a-t-il de la peine au début?', options: ["Il est perdu et loin de sa famille.", "Il n'aime pas la ruelle.", "Il a perdu son biscuit."], answer: 0 },
    { q: 'Pourquoi les voisins ont-ils peur de Pouf?', options: ["Il leur a volé leur tarte.", "Ses éternuements font des étincelles et ils ne le connaissent pas.", 'Il crie très fort.'], answer: 1 },
    { q: "Qu'est-ce qui gâche la fête des voisins?", options: ['La pluie', 'Une panne de courant', 'Un orage de grêle'], answer: 1 },
    { q: 'Comment Pouf réussit-il à éternuer sur commande?', options: ['Camille lui chatouille le nez avec une plume.', 'Il sent du poivre.', 'Il avale un bonbon.'], answer: 0 },
    { q: 'Pourquoi la famille de Pouf arrive-t-elle dans la ruelle?', options: ["Elle a entendu de la musique.", 'Elle est attirée par la lumière des lanternes.', 'Elle voulait de la tarte.'], answer: 1 },
    { q: "Que veut dire « une ruelle »?", options: ['Une grande autoroute', 'Une petite rue étroite derrière les maisons', 'Un escalier'], answer: 1 },
  ],
};
