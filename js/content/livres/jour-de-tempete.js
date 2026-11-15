// ---------- shared drawing helpers ----------
const O = '#3a3f55';
const DEFS = '<defs>'
  + '<linearGradient id="sh" x1="0" y1="0" x2="1" y2="0.35"><stop offset="0" stop-color="#fff" stop-opacity=".32"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1b1f3a" stop-opacity=".3"/></linearGradient>'
  + '<linearGradient id="shv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1b1f3a" stop-opacity=".25"/></linearGradient>'
  + '<linearGradient id="skyW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#86bfe8"/><stop offset=".55" stop-color="#c9e5f6"/><stop offset="1" stop-color="#f1f9fe"/></linearGradient>'
  + '<linearGradient id="skyI" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a6fc0"/><stop offset=".6" stop-color="#e8a0a0"/><stop offset="1" stop-color="#f7d8a8"/></linearGradient>'
  + '<linearGradient id="snow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdfeff"/><stop offset="1" stop-color="#dcebf7"/></linearGradient>'
  + '<linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9a066"/><stop offset="1" stop-color="#b9783f"/></linearGradient>'
  + '<linearGradient id="metal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8e9aa6"/><stop offset=".35" stop-color="#e3e9ee"/><stop offset=".7" stop-color="#b9c3cc"/><stop offset="1" stop-color="#7f8b97"/></linearGradient>'
  + '<radialGradient id="sun"><stop offset="0" stop-color="#fff6c2" stop-opacity=".95"/><stop offset="1" stop-color="#fff6c2" stop-opacity="0"/></radialGradient>'
  + '<radialGradient id="glow"><stop offset="0" stop-color="#ffd27a" stop-opacity=".9"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>'
  + '<radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#2a2038" stop-opacity="0"/><stop offset="1" stop-color="#2a2038" stop-opacity=".22"/></radialGradient>'
  + '<linearGradient id="skyS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a9bb2"/><stop offset=".6" stop-color="#c3cfdc"/><stop offset="1" stop-color="#e6edf4"/></linearGradient><linearGradient id="skyN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1636"/><stop offset=".7" stop-color="#2b3a74"/><stop offset="1" stop-color="#4a5c9a"/></linearGradient><linearGradient id="nightSnow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9d6f0"/><stop offset="1" stop-color="#8fa2cc"/></linearGradient><radialGradient id="beam"><stop offset="0" stop-color="#fff3b0" stop-opacity=".85"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></radialGradient><radialGradient id="orange"><stop offset="0" stop-color="#ffb04a" stop-opacity=".95"/><stop offset="1" stop-color="#ff8a1a" stop-opacity="0"/></radialGradient></defs>';
const svg = (b) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" stroke-linejoin="round" stroke-linecap="round">${DEFS}${b}</svg>`.replace(/\d+\.\d{2,}/g, (m) => String(Math.round(m * 10) / 10)).replace(/ rx="0"| rotate\(0\)/g, '').replace(/ +\/>/g, '/>').replace(/ {2,}/g, ' ');
const R = (x, y, w, h, f, r = 0, ex = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" ${ex}/>`;
const C = (x, y, r, f, ex = '') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${ex}/>`;
const E = (x, y, rx, ry, f, ex = '') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${ex}/>`;
const P = (d, f = 'none', ex = '') => `<path d="${d}" fill="${f}" ${ex}/>`;
const NS = 'stroke="none"';
const G = (inner, t = '', w = 2.6) => `<g stroke="${O}" stroke-width="${w}" ${t ? `transform="${t}"` : ''}>${inner}</g>`;
const PS = (d, f, ex = '') => P(d, f, ex) + P(d, 'url(#sh)', NS);
const RS = (x, y, w, h, f, r = 0, ex = '') => R(x, y, w, h, f, r, ex) + R(x, y, w, h, 'url(#sh)', r, NS);
const ES = (x, y, rx, ry, f, ex = '') => E(x, y, rx, ry, f, ex) + E(x, y, rx, ry, 'url(#sh)', NS);
const CS = (x, y, r, f, ex = '') => C(x, y, r, f, ex) + C(x, y, r, 'url(#sh)', NS);
const thick = (d, col, w = 6, ol = O) => P(d, 'none', `stroke="${ol}" stroke-width="${w + 3.5}"`) + P(d, 'none', `stroke="${col}" stroke-width="${w}"`);
const leaf = (x, y, s = 1, c = '#d9472f', rot = 0) => G(P('M0 -12L3 -5L10 -8L7 -1L12 3L4 5L1 13L0 8L-1 13L-4 5L-12 3L-7 -1L-10 -8L-3 -5Z', c, 'stroke-width="1.8"') + P('M0 -8V9', 'none', 'stroke="#8a2a1c" stroke-width="1.2"'), `translate(${x} ${y}) rotate(${rot}) scale(${s})`);
const star4 = (x, y, r, f = '#fff') => P(`M${x} ${y - r * 2}L${x + r * 0.5} ${y - r * 0.5}L${x + r * 2} ${y}L${x + r * 0.5} ${y + r * 0.5}L${x} ${y + r * 2}L${x - r * 0.5} ${y + r * 0.5}L${x - r * 2} ${y}L${x - r * 0.5} ${y - r * 0.5}Z`, f, NS);
const sparkles = (n, seed = 0, y0 = 200) => Array.from({ length: n }, (_, i) => star4((i * 71 + seed * 13 + 23) % 400, y0 + ((i * 53 + seed * 7) % (300 - y0)), 1.1 + (i % 3) * 0.6)).join('');
const flakes = (n = 24, r = 2.4) => Array.from({ length: n }, (_, i) => C((i * 97 + 31) % 400, (i * 61 + 17) % 300, r + (i % 3) * 0.6, '#fff', `${NS} opacity=".9"`)).join('');
const dashes = (pts) => pts.map(([x, y, w]) => P(`M${x} ${y}q${w / 2} -3 ${w} 0`, 'none', 'stroke="#aac6dc" stroke-width="2" opacity=".8"')).join('');

// ---------- people (same look every page) ----------
const eye = (x, ey, ir, o = {}) => {
  const { rx = 4.2, ry = 4.8, dx = 0, dy = 0 } = o;
  return E(x, ey, rx, ry, '#fff', 'stroke-width="1.1"') + C(x + 0.4 + dx, ey + 0.4 + dy, 3.3, ir, NS) + C(x + 0.4 + dx, ey + 0.6 + dy, 1.9, '#1d1818', NS) + C(x + 1.6 + dx, ey - 1 + dy, 1.2, '#fff', NS) + C(x - 1 + dx, ey + 1.8 + dy, 0.55, '#fff', `${NS} opacity=".8"`) + P(`M${x - rx - 0.5} ${ey - 1}Q${x} ${ey - ry - 3} ${x + rx + 0.5} ${ey - 1}`, 'none', 'stroke-width="1.7"');
};
const face = (m, o) => {
  const { iris = '#5a3a22', brow, nc, skinD = '#d99d78' } = o;
  const ey = -73, b = `stroke="${brow}" stroke-width="2.5"`;
  const cheeks = nc ? '' : C(-13, -65, 4, '#ee7f82', `${NS} opacity=".42"`) + C(13, -65, 4, '#ee7f82', `${NS} opacity=".42"`);
  const nose = P('M-1.5 -68.5Q0.5 -66 2.2 -68', 'none', `stroke="${skinD}" stroke-width="1.8"`);
  const teeth = P('M-6.5 -63.4Q0 -63.4 6.5 -63.4L6 -61.4Q0 -61.4 -6 -61.4Z', '#fff', NS);
  const M = {
    happy: eye(-7.5, ey, iris) + eye(7.5, ey, iris) + P('M-12.5 -81Q-8 -84.5 -3.5 -82M3.5 -82Q8 -84.5 12.5 -81', 'none', b) + P('M-6 -63Q0 -57 6 -63', 'none', 'stroke-width="2.3"') + P('M-7 -63.5l-1.2 -1.4M7 -63.5l1.2 -1.4', 'none', 'stroke-width="1.5"'),
    laugh: eye(-7.5, ey + 0.5, iris, { ry: 4 }) + eye(7.5, ey + 0.5, iris, { ry: 4 }) + P('M-12.5 -81Q-8 -86 -3.5 -82M3.5 -82Q8 -86 12.5 -81', 'none', b) + P('M-8.5 -64.5Q0 -63 8.5 -64.5Q8 -53 0 -53Q-8 -53 -8.5 -64.5Z', '#a8323a', 'stroke-width="2.2"') + teeth + E(0, -56, 4.5, 2.4, '#ef8a8a', NS),
    sad: eye(-7.5, ey + 0.5, iris, { dy: 1.2 }) + eye(7.5, ey + 0.5, iris, { dy: 1.2 }) + P('M-12.5 -78L-4 -83M12.5 -78L4 -83', 'none', b) + P('M-5 -59Q0 -64.5 5 -59', 'none', 'stroke-width="2.3"') + P('M10.5 -70q-3.5 6 0 9q3.5 -3 0 -9', '#8fd0f6', 'stroke-width="1" stroke="#5aa8d8"'),
    surprised: eye(-7.5, ey, iris, { rx: 5, ry: 6.2 }) + eye(7.5, ey, iris, { rx: 5, ry: 6.2 }) + P('M-13 -84q5 -5 9.5 -1M3.5 -85q5 -4 9.5 1', 'none', b) + E(0, -60.5, 3.4, 4.6, '#a8323a', 'stroke-width="2"') + E(0, -58.5, 2, 1.6, '#ef8a8a', NS),
    sleepy: P('M-12 -73Q-7.5 -68.5 -3 -73M3 -73Q7.5 -68.5 12 -73', 'none', 'stroke-width="2.4"') + P('M-12 -78Q-8 -80 -4 -78M4 -78Q8 -80 12 -78', 'none', `${b} opacity=".7"`) + P('M-3.5 -62Q0 -60 3.5 -62', 'none', 'stroke-width="2.2"'),
    yawn: P('M-12 -73Q-7.5 -68.5 -3 -73M3 -73Q7.5 -68.5 12 -73', 'none', 'stroke-width="2.4"') + P('M-12 -79Q-8 -81 -4 -79M4 -79Q8 -81 12 -79', 'none', `${b} opacity=".7"`) + E(0, -60, 4, 5.4, '#a8323a', 'stroke-width="2.2"') + E(0, -57.5, 2.4, 2, '#ef8a8a', NS),
    worried: eye(-7.5, ey + 0.5, iris, { dx: 0.6 }) + eye(7.5, ey + 0.5, iris, { dx: 0.6 }) + P('M-12.5 -78.5L-4 -83.5M12.5 -78.5L4 -83.5', 'none', b) + P('M-6.5 -61.5Q-3.3 -64.5 0 -61.5Q3.3 -58.5 6.5 -61.5', 'none', 'stroke-width="2.2"'),
  };
  return `<g transform="translate(0 2.5)">` + cheeks + nose + (M[m] || M.happy) + '</g>';
};
const HAND = { d: [20, -26], f: [30, -46], u: [26, -86], o: [36, -52], w: [32, -78], c: [12, -40] };
const hp = (h) => (Array.isArray(h) ? h : HAND[h]);
const limb = (x1, y1, x2, y2, col) => P(`M${x1} ${y1}L${x2} ${y2}`, 'none', `stroke="${O}" stroke-width="12.5"`) + P(`M${x1} ${y1}L${x2} ${y2}`, 'none', `stroke="${col}" stroke-width="8"`) + P(`M${x1 - 1.2} ${y1 - 1}L${x2 - 1.2} ${y2 - 1}`, 'none', 'stroke="#fff" stroke-width="2" opacity=".28"');
const hand = (px, py, ang, m, skin) => {
  const body = m
    ? R(-6, -7.5, 5.5, 15, '#fff', 2.4) + R(-3, -7.2, 17, 14.4, m, 7) + R(-3, -7.2, 17, 14.4, 'url(#sh)', 7, NS) + E(3, -8.5, 5, 3.4, m, 'transform="rotate(-35 3 -8.5)"')
    : [-4.8, -1.6, 1.6, 4.8].map((yy, i) => R(4, yy - 1.7, 9 + (i === 1 || i === 2 ? 1.8 : 0), 3.4, skin, 1.7, 'stroke-width="1.6"')).join('') + R(-3, -6.2, 10, 12.4, skin, 5) + E(1, -7.4, 4.8, 2.9, skin, 'transform="rotate(-40 1 -7.4)" stroke-width="1.8"') + P('M5 -2.5V2.5', 'none', 'stroke="#d08a6a" stroke-width="1" opacity=".6"');
  return `<g transform="translate(${px} ${py}) rotate(${ang})" stroke-width="2.2">${body}</g>`;
};
const kid = (x, y, s, o = {}) => {
  const { skin = '#f1c6a0', skinD = '#d99d78', hair = '#5a3a28', style = 'short', coat = '#d9473f', pants = '#3a4a7a', hat = null, band = '#fff', mitt = null, mittR, mood = 'happy', al = 'd', ar = 'd', scarf = null, flip = false, back = '', extra = '', holdL = '', holdR = '', hold = '', boots = '#4a3a4a', tilt = 0, nc = false, iris = '#5a3a22', beard = false, brow, bust = false, front = '', plaid = false, shadow = true } = o;
  const mr = mittR === undefined ? mitt : mittR;
  const bc = brow || hair;
  const hl = hp(al), hr = hp(ar);
  const angL = (Math.atan2(hl[1] + 50, -hl[0] + 15) * 180) / Math.PI, angR = (Math.atan2(hr[1] + 50, hr[0] - 15) * 180) / Math.PI;
  const arm = (sx, h, m, ang) => limb(sx * 15, -50, sx * h[0], h[1], coat) + hand(sx * h[0], h[1], ang, m, skin);
  const hairBack = style === 'long' ? P('M-22 -74Q-25 -42 -17 -40L17 -40Q25 -42 22 -74Z', hair) + P('M-19 -70Q-21 -48 -16 -43', 'none', `stroke="${o.hairL || '#fff'}" stroke-width="2" opacity=".25"`)
    : style === 'braids' ? [-1, 1].map((q) => P(`M${q * 19} -70Q${q * 26} -62 ${q * 22} -52Q${q * 25} -44 ${q * 21} -38`, 'none', `stroke="${O}" stroke-width="10"`) + P(`M${q * 19} -70Q${q * 26} -62 ${q * 22} -52Q${q * 25} -44 ${q * 21} -38`, 'none', `stroke="${hair}" stroke-width="6.6"`) + P(`M${q * 24} -60l-5 2M${q * 24.5} -50l-5 2.4`, 'none', 'stroke="#fff" stroke-width="1.3" opacity=".3"') + C(q * 21, -37, 3.6, '#e8a317', 'stroke-width="1.8"')).join('') : '';
  const hairFront = style === 'bald' ? '' : P('M-19.5 -72Q-23 -96 0 -95.5Q23 -96 19.5 -72Q14 -82 5 -84Q-8 -83 -19.5 -72Z', hair) + P('M-12 -88Q-4 -93 6 -91', 'none', 'stroke="#fff" stroke-width="2.2" opacity=".28"');
  const hatSvg = hat ? P('M-21 -81Q-26 -108 0 -109Q26 -108 21 -81Z', hat) + P('M-21 -81Q-26 -108 0 -109Q26 -108 21 -81Z', 'url(#sh)', NS) + P('M-19 -97Q0 -103 19 -97', 'none', `stroke="${band}" stroke-width="3" opacity=".55"`) + R(-22.5, -91.5, 45, 10.5, band, 5) + P('M-18 -91v9M-12 -91v9M-6 -91v9M0 -91v9M6 -91v9M12 -91v9M18 -91v9', 'none', 'stroke="#000" stroke-width="1" opacity=".16"') + C(0, -110, 7, band) + P('M-4 -112l2 3M1 -115l1 3M4 -110l2 2', 'none', 'stroke="#000" stroke-width="1" opacity=".2"') : '';
  const bodyPath = 'M-19 -13Q-23 -48 -12 -59L12 -59Q23 -48 19 -13Z';
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s}) rotate(${tilt})" stroke="${O}" stroke-width="2.6">`
    + (shadow ? E(0, 1, 26, 5.5, '#27406a', `${NS} opacity=".2"`) : '')
    + hairBack + back
    + (bust ? '' : RS(-13.5, -20, 11.5, 20, pants, 3) + RS(2, -20, 11.5, 20, pants, 3) + RS(-16, -8.5, 15, 8.5, boots, 3.5) + RS(1, -8.5, 15, 8.5, boots, 3.5) + P('M-15 -3h13M2 -3h13', 'none', 'stroke="#fff" stroke-width="1.5" opacity=".4"'))
    + PS(bodyPath, coat) + P('M0 -57V-14', 'none', 'stroke-width="1.6" opacity=".5"') + R(-18.5, -17, 37, 5, 'rgba(0,0,0,.14)', 2, NS) + C(-3, -40, 1.5, O, NS) + C(-3, -30, 1.5, O, NS) + C(-3, -20, 1.5, O, NS)
    + (plaid ? P('M-17 -50h34M-18 -38h36M-18 -26h36M-8 -58v44M8 -58v44', 'none', 'stroke="#2b1b1b" stroke-width="2.2" opacity=".42"') : '')
    + (scarf ? RS(-14, -63, 28, 9, scarf, 4.5) + P('M6 -56l4 14h7l-3 -13z', scarf, 'stroke-width="2"') : '')
    + arm(-1, hl, mitt, angL) + arm(1, hr, mr, angR)
    + CS(0, -72, 20.5, skin) + E(-20.5, -71, 3.8, 5, skin, 'stroke-width="2"') + E(20.5, -71, 3.8, 5, skin, 'stroke-width="2"') + E(-20.5, -71, 1.6, 2.6, skinD, NS) + E(20.5, -71, 1.6, 2.6, skinD, NS)
    + C(0, -72, 20.5, 'none', 'stroke-width="2.6"')
    + (beard ? P('M-20 -72Q-24 -46 0 -43Q24 -46 20 -72Q15 -61 0 -60Q-15 -61 -20 -72Z', '#f4f4f8', 'stroke-width="2.2"') + P('M-8 -50Q0 -47 8 -50M-14 -58Q-12 -52 -6 -48M14 -58Q12 -52 6 -48', 'none', 'stroke="#c9ccd8" stroke-width="1.5"') : '')
    + hairFront + hatSvg + face(mood, { iris, brow: bc, nc, skinD })
    + (beard ? P('M-10 -65.5Q-5 -69.5 0 -66Q5 -69.5 10 -65.5Q5 -63.5 0 -65Q-5 -63.5 -10 -65.5Z', '#f4f4f8', 'stroke-width="1.8"') : '')
    + extra + front
    + (holdL ? `<g transform="translate(${-hl[0]} ${hl[1]})">${holdL}</g>` : '') + (holdR ? `<g transform="translate(${hr[0]} ${hr[1]})">${holdR}</g>` : '') + hold + '</g>';
};
const mitten = (x, y, s = 1, rot = 0, col = '#e23b3b', wet = false) => G(P('M-9.5 2Q-13 -22 0 -25Q13 -22 9.5 2Z', col) + P('M-9.5 2Q-13 -22 0 -25Q13 -22 9.5 2Z', 'url(#sh)', NS) + E(-12, -12, 4.4, 6.4, col, 'transform="rotate(12 -12 -12)"') + R(-10.5, 0, 21, 9, '#fff', 3) + P('M-8 3v4M-3 3v4M2 3v4M7 3v4', 'none', 'stroke-width="1" opacity=".25"') + P('M-4 -18Q0 -22 4 -18', 'none', 'stroke="#fff" stroke-width="2" opacity=".4"') + (wet ? P('M-5 -8q-2 4 0 6q2 -2 0 -6M4 -14q-2 4 0 6q2 -2 0 -6', '#8fd0f6', 'stroke="none"') : ''), `translate(${x} ${y}) rotate(${rot}) scale(${s})`, 2.2);

const farTrees = (base, seed = 0, col = '#a9c6da') => Array.from({ length: 24 }, (_, i) => { const px = i * 17 + ((i * 7 + seed) % 9) - 5, h = 16 + ((i * 5 + seed) % 4) * 6; return P(`M${px - 8} ${base}L${px} ${base - h - 8}L${px + 8} ${base}Z`, col, NS); }).join('');
// ---------- characters of this book ----------
const GLASSES = C(-7.5, -70.5, 6.9, 'rgba(255,255,255,.22)', 'stroke-width="1.9"') + C(7.5, -70.5, 6.9, 'rgba(255,255,255,.22)', 'stroke-width="1.9"') + P('M-0.7 -71h1.4M-14.4 -71L-20 -73M14.4 -71L20 -73', 'none', 'stroke-width="1.8"') + P('M-11 -74q3 -2 6 -1', 'none', 'stroke="#fff" stroke-width="1.4" opacity=".7"');
const mia = (x, y, s, o = {}) => kid(x, y, s, { skin: '#e6b48a', skinD: '#c98f66', hair: '#2a1f1a', style: 'long', coat: '#e86a9a', pants: '#3a3f6a', hat: '#f08a24', band: '#ffe1b8', mitt: '#f08a24', boots: '#7a3a4a', iris: '#3a2418', ...o });
const theo = (x, y, s, o = {}) => kid(x, y, s * 0.84, { skin: '#e6b48a', skinD: '#c98f66', hair: '#2a1f1a', coat: '#4a8fe0', pants: '#3a3f6a', hat: '#e23b3b', band: '#ffd6d6', mitt: '#e23b3b', boots: '#2e5a9a', iris: '#3a2418', ...o });
const samir = (x, y, s, o = {}) => kid(x, y, s, { skin: '#b98462', skinD: '#966244', hair: '#1e1a18', coat: '#3fa34d', pants: '#4a4a5a', hat: '#8a8a96', band: '#e3e3ea', mitt: '#3a3f55', boots: '#3a3a44', iris: '#2a1a12', ...o, extra: GLASSES + (o.extra || '') });
const odette = (x, y, s, o = {}) => kid(x, y, s, { skin: '#f0cdb0', skinD: '#d9a888', hair: '#f1f1f4', style: 'short', coat: '#8a5cc7', pants: '#6b4a6a', boots: '#c8372d', iris: '#4a7a9a', back: C(0, -98, 9, '#f1f1f4', 'stroke-width="2.4"') + P('M-5 -100q5 -4 10 0', 'none', 'stroke="#c9ccd8" stroke-width="1.5"'), ...o, extra: GLASSES + (o.extra || '') });
const maman = (x, y, s, o = {}) => kid(x, y, s, { skin: '#e6b48a', skinD: '#c98f66', hair: '#6a3a22', style: 'long', coat: '#e8c14a', pants: '#4a4a5a', boots: '#6b4a3a', iris: '#4a3a22', ...o });
const shovel = (len = 56, col = '#e8564a') => thick(`M0 6L0 ${-len}`, '#a8672f', 4) + P(`M-10 ${-len + 2}L10 ${-len + 2}L8 ${-len - 18}L-8 ${-len - 18}Z`, col, 'stroke-width="2.4"') + P(`M-6 ${-len - 6}h12`, 'none', 'stroke="#fff" stroke-width="2" opacity=".4"');
const snowball = (x, y, r = 9) => CS(x, y, r, '#fbfdff', `stroke="#8fa8c4" stroke-width="2"`) + C(x - r * 0.3, y - r * 0.3, r * 0.3, '#fff', NS) + P(`M${x - r * 0.5} ${y + r * 0.5}Q${x} ${y + r * 0.9} ${x + r * 0.6} ${y + r * 0.3}`, 'none', 'stroke="#c4d6ea" stroke-width="1.6"');
const mug = (x, y, s = 1, o = {}) => {
  const { marsh = true, col = '#f2f2f6' } = o;
  return G(ES(0, -2, 15, 4, '#c9ccd8', NS) + PS('M-13 -30L13 -30L11 -2Q0 3 -11 -2Z', col) + P('M13 -25q10 0 9 8t-9 7', 'none', 'stroke-width="3"') + E(0, -30, 13, 4, '#6b3f26', 'stroke-width="2"') + P('M-8 -30q8 3 16 0', 'none', 'stroke="#a0693f" stroke-width="1.4" opacity=".7"')
    + (marsh ? RS(-9, -37, 9, 9, '#fff', 3, 'stroke-width="2"') + RS(1, -36, 9, 9, '#fff6e8', 3, 'stroke-width="2"') : '') + P('M-8 -22q-1 8 1 14', 'none', 'stroke="#fff" stroke-width="2" opacity=".6"') + P('M-6 -14h12', 'none', `stroke="#e8556a" stroke-width="3"`), `translate(${x} ${y}) scale(${s})`, 2.2);
};
const steam = (x, y, s = 1) => P(`M${x} ${y}q${-7 * s} ${-9 * s} 0 ${-17 * s}t0 ${-17 * s}M${x + 11 * s} ${y}q${-7 * s} ${-9 * s} 0 ${-17 * s}t0 ${-17 * s}`, 'none', 'stroke="#fff" stroke-width="3.4" opacity=".85"');
const boot = (x, y, s = 1, flip = false, col = '#e8564a') => G(PS('M-9 -34L7 -34L8 -12Q22 -10 22 -2L22 0L-10 0Z', col) + R(-10, -36, 18, 7, '#fff', 3) + P('M-10 -4H22', 'none', 'stroke="#fff" stroke-width="2" opacity=".5"') + P('M-6 -30V-14', 'none', 'stroke="#fff" stroke-width="2" opacity=".4"'), `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`, 2.4);

// ---------- places ----------
const snowfall = (n, seed = 0, sz = 1) => Array.from({ length: n }, (_, i) => C((i * 83 + seed * 29) % 420 - 10, (i * 57 + seed * 41) % 300, (1.3 + ((i * 7 + seed) % 4) * 0.75) * sz, '#fff', `${NS} opacity="${(0.55 + ((i * 3) % 4) * 0.12).toFixed(2)}"`)).join('');
const wind = (n, seed = 0) => Array.from({ length: n }, (_, i) => { const x = (i * 97 + seed * 31) % 400, y = (i * 61 + seed * 17) % 300; return P(`M${x} ${y}l-16 6`, 'none', 'stroke="#fff" stroke-width="1.8" opacity=".5"'); }).join('');
const farHouses = (base, col, night, seed = 0) => Array.from({ length: 8 }, (_, i) => {
  const px = i * 54 - 10 + ((i * 13 + seed) % 11), w = 38 + ((i * 5 + seed) % 3) * 8, h = 22 + ((i * 7 + seed) % 3) * 6;
  return R(px, base - h, w, h, col, 0, NS) + P(`M${px - 4} ${base - h}L${px + w / 2} ${base - h - 16}L${px + w + 4} ${base - h}Z`, col, NS) + (night ? R(px + 6, base - h + 7, 7, 7, '#ffd27a', 0, NS) + R(px + w - 14, base - h + 7, 7, 7, '#ffd27a', 0, NS) : '');
}).join('');
const outdoor = (o = {}) => {
  const { mode = 'storm', road = false, seed = 0, flakeN = 46 } = o;
  const night = mode === 'night', clear = mode === 'clear';
  const sky = night ? 'url(#skyN)' : clear ? 'url(#skyW)' : 'url(#skyS)';
  const far = night ? '#2a3a70' : clear ? '#b4cde0' : '#a8b7c9';
  const g1 = night ? '#7f93c4' : clear ? '#dde9f4' : '#d3dde9';
  const g2 = night ? 'url(#nightSnow)' : clear ? 'url(#snow)' : '#eaf0f6';
  const g3 = night ? '#a9bbe2' : clear ? '#f4fafe' : '#f2f6fa';
  return R(0, 0, 400, 300, sky)
    + (clear ? C(338, 52, 56, 'url(#sun)') + C(338, 52, 16, '#fff6c2', NS) + E(110, 52, 40, 9, '#fff', `${NS} opacity=".7"`) + E(250, 74, 30, 7, '#fff', `${NS} opacity=".6"`) : '')
    + (night ? C(64, 58, 40, 'url(#sun)', 'opacity=".5"') + C(64, 58, 15, '#fff1b8', NS) + C(70, 54, 12, '#2a3a70', `${NS} opacity=".25"`) + [[40, 30], [120, 22], [220, 44], [330, 26], [372, 78], [180, 78]].map(([a, b]) => star4(a, b, 1.2, '#fff')).join('') : '')
    + (clear ? '' : E(200, 60, 160, 40, night ? '#3a4a80' : '#9cabbf', `${NS} opacity=".35"`))
    + farHouses(176, far, night, seed) + farTrees(178, seed, far)
    + P('M0 180Q120 170 260 178T400 172V300H0Z', g1) + P('M0 200Q110 188 230 198T400 192V300H0Z', g2)
    + (road ? P('M0 226Q200 214 400 228V270Q200 258 0 272Z', night ? '#56649a' : '#b3becd') + P('M0 240Q200 230 400 242', 'none', `stroke="${night ? '#6f7fb4' : '#c9d3df'}" stroke-width="5" opacity=".8"`) + P('M0 258Q200 248 400 260', 'none', `stroke="${night ? '#6f7fb4' : '#c9d3df'}" stroke-width="4" opacity=".7"`) + E(40, 224, 60, 12, g3, NS) + E(200, 218, 80, 10, g3, NS) + E(350, 226, 66, 12, g3, NS) + E(60, 272, 70, 12, g3, NS) + E(250, 268, 90, 12, g3, NS) + E(380, 270, 50, 12, g3, NS) : P('M0 244Q150 228 400 246V300H0Z', g3))
    + dashes(night ? [] : [[20, 222, 34], [150, 214, 30], [310, 210, 40], [60, 270, 30], [250, 284, 36]]) + sparkles(night ? 0 : 10, seed, 214)
    + (clear ? '' : wind(10, seed) + snowfall(flakeN, seed));
};
const house = (x, y, s = 1, o = {}) => {
  const { wall = '#d9a066', roof = '#7a5a6a', steps = 'clear', night = false, smoke = true, winL = '', door = '#7a3f26', open = false } = o;
  const win = (wx) => R(wx, -100, 42, 44, '#ffe9a8', 3) + C(wx + 21, -78, 38, 'url(#glow)', `${NS} opacity=".5"`) + R(wx, -100, 42, 44, 'url(#shv)', 3, NS);
  return `<g transform="translate(${x} ${y}) scale(${s})">` + E(0, 3, 110, 10, '#27406a', `${NS} opacity=".16"`)
    + (smoke ? '<g opacity=".9">' + E(54, -178, 9, 7, '#fff', NS) + E(60, -194, 12, 9, '#f4f9fd', NS) + E(50, -212, 15, 10, '#fff', NS) + '</g>' : '')
    + G(R(46, -162, 18, 44, '#8a5a4c') + R(43, -166, 24, 8, '#6b4a3c', 2)
      + RS(-80, -112, 160, 112, wall) + [-100, -88, -76, -64, -52, -40, -28, -16, -4].map((q) => P(`M-80 ${q}h160`, 'none', 'stroke="#000" stroke-width="1" opacity=".1"')).join('')
      + P('M-98 -106L0 -172L98 -106Z', roof) + P('M-98 -106L0 -172L98 -106Z', 'url(#sh)', NS) + P('M-80 -118l20 -8M-30 -140l16 -8M30 -142l16 8M72 -120l16 8', 'none', 'stroke="#000" stroke-width="1.4" opacity=".18"')
      + P('M-88 -108L0 -164L88 -108Q50 -120 0 -148Q-50 -120 -88 -108Z', '#fff', NS) + P('M-98 -106L0 -172L98 -106', 'none', 'stroke-width="3"')
      + win(-72) + win(30) + winL
      + P(winL ? 'M30 -78h42M51 -100v44' : 'M-72 -78h42M-51 -100v44M30 -78h42M51 -100v44', 'none', 'stroke-width="2.2"') + R(-76, -56, 50, 6, '#fff', 2, 'stroke-width="2"') + R(26, -56, 50, 6, '#fff', 2, 'stroke-width="2"') + P('M-72 -100Q-64 -80 -66 -58L-72 -58ZM-30 -100Q-38 -80 -36 -58L-30 -58Z', '#e8556a', NS + ' opacity=".8"')
      + R(-17, -64, 34, 64, door, 3) + R(-11, -58, 22, 22, '#ffe9a8', 2, 'stroke-width="2"') + C(10, -28, 2.6, '#f4c430', NS) + (open ? R(-17, -64, 34, 64, '#ffd27a', 3) + R(-13, -62, 26, 62, '#fff0c8', 2, NS) : '')
      + C(0, -50, 7, '#2f7d57', 'stroke-width="2"') + C(0, -43, 2.4, '#e23b3b', NS)
      + C(0, -42, 60, 'url(#glow)', `${NS} opacity=".15"`)
      + (steps === 'buried' ? E(-4, 2, 70, 38, '#fff', 'stroke="#b9cfe3" stroke-width="2"') + E(-34, -4, 42, 22, '#f2f7fb', NS) + E(34, 0, 40, 20, '#f2f7fb', NS) + P('M-50 -26Q-4 -52 46 -26', 'none', 'stroke="#c4d6ea" stroke-width="2.4"') + P('M-60 -10q20 -10 40 -2M10 -8q24 -10 44 0', 'none', 'stroke="#d9e6f2" stroke-width="2.4"')
        : steps === 'clear' ? R(-28, -10, 56, 10, '#c9bcae', 2) + R(-36, 0, 72, 8, '#b8a89a', 2) + E(-52, 6, 26, 10, '#fff', NS) + E(54, 6, 26, 10, '#fff', NS) : '')
      + E(-86, 4, 30, 12, '#fff', NS) + E(86, 4, 30, 12, '#fff', NS), '', 2.6)
    + '</g>';
};
const blk = (x, y, w = 38, h = 24) => R(x, y, w, h, '#f6fbff', 8, 'stroke="#8fa8c4" stroke-width="1.8"') + P(`M${x + 3} ${y + h - 6}Q${x + w / 2} ${y + h - 2} ${x + w - 3} ${y + h - 6}`, 'none', 'stroke="#c4d6ea" stroke-width="3"') + P(`M${x + 6} ${y + 6}q6 -3 12 -1`, 'none', 'stroke="#fff" stroke-width="2.4"');
const fort = (x, y, s = 1, o = {}) => {
  const { flag = true, rows = 4 } = o;
  const row = (r) => { const yy = -24 * (r + 1), off = r % 2 ? 19 : 0; let out = ''; for (let bx = -100 - off; bx < 100; bx += 38) { const cx0 = Math.max(bx, -100), cx1 = Math.min(bx + 38, 100); if (r < 2 && cx1 > -28 && cx0 < 28) continue; if (cx1 - cx0 > 12) out += blk(cx0, yy, cx1 - cx0, 24); } return out; };
  let walls = ''; for (let r = 0; r < rows; r++) walls += row(r);
  return `<g transform="translate(${x} ${y}) scale(${s})">` + E(0, 4, 118, 10, '#27406a', `${NS} opacity=".18"`)
    + R(-100, -24 * rows, 200, 24 * rows, '#dbe7f4', 0, NS)
    + (flag ? thick('M72 -92L72 -156', '#a8672f', 3, '#6b4a3a') + P('M74 -156Q96 -164 112 -152Q96 -144 74 -134Z', '#e23b3b', 'stroke="#3a3f55" stroke-width="2.4"') + P('M78 -150Q94 -156 106 -150', 'none', 'stroke="#fff" stroke-width="1.6" opacity=".4"') + C(72, -158, 4, '#f4c430', 'stroke="#3a3f55" stroke-width="2"') : '')
    + P('M-26 0V-30Q-26 -56 0 -56Q26 -56 26 -30V0Z', '#2f3a62', 'stroke="#8fa8c4" stroke-width="2.4"') + P('M-20 0V-30Q-20 -49 0 -49Q20 -49 20 -30V0Z', '#46568a', NS) + P('M-30 2h60', 'none', 'stroke="#c4d6ea" stroke-width="4"')
    + walls + P('M-104 -24 -100 -30', 'none', NS)
    + [-82, -36, 12, 58].map((cx) => blk(cx, -24 * rows - 18, 30, 20)).join('') + '</g>';
};
const plough = (x, y, s = 1, o = {}) => {
  const { night = false } = o;
  const ye = '#f4b81c';
  return `<g transform="translate(${x} ${y}) scale(${s})">` + E(0, 2, 124, 9, '#10183a', `${NS} opacity="${night ? 0.4 : 0.2}"`)
    + (night ? P('M-112 -34L-210 -80L-210 12Z', 'url(#beam)', NS) : '')
    + G(
      PS('M-64 -22L-64 -50L-36 -50L-30 -84L22 -84L40 -50L98 -50L102 -22Z', ye)
      + R(-70, -30, 176, 12, '#3a3f55', 0, NS) + P('M-70 -24H106', 'none', 'stroke="#f4f4f8" stroke-width="2" opacity=".5"')
      + R(-26, -78, 22, 26, '#bfe3f5', 3) + R(2, -78, 22, 26, '#bfe3f5', 3) + P('M-24 -74l8 0 -4 14z', '#fff', NS + ' opacity=".5"') + C(-14, -64, 5, '#f1c6a0', 'stroke-width="1.5"') + P('M-19 -69Q-14 -74 -9 -69', '#3a3f55', NS)
      + RS(36, -66, 62, 20, ye, 4) + P('M40 -56H94', 'none', 'stroke="#c88a10" stroke-width="1.6" opacity=".6"')
      + R(-12, -92, 38, 9, '#6b6b78', 2) + RS(-10, -102, 14, 10, '#ff9a1a', 3) + RS(10, -102, 14, 10, '#ff9a1a', 3)
      + PS('M-66 -54L-112 -16L-112 6L-60 6L-56 -20Z', '#e8731a') + P('M-112 -16L-60 -22', 'none', 'stroke="#fff" stroke-width="2" opacity=".5"') + R(-116, 0, 62, 7, '#b9c3cc', 2) + P('M-100 -12l30 -12', 'none', 'stroke="#fff" stroke-width="3" opacity=".35"')
      + RS(-66, -42, 12, 14, night ? '#fff6b8' : '#ffe9a8', 3)
      + [-30, 48, 82].map((wx) => C(wx, -10, 19, '#2a2d3e') + C(wx, -10, 8.5, '#b9c3cc') + C(wx, -10, 3.4, '#6b6b78', NS)).join('') + P('M-54 -20Q-30 -34 -6 -20', 'none', 'stroke-width="2.6"'), '', 2.6)
    + C(-10, -102, 36, 'url(#orange)', `${NS} opacity="${night ? 0.9 : 0.5}"`) + C(16, -102, 36, 'url(#orange)', `${NS} opacity="${night ? 0.9 : 0.5}"`)
    + (night ? C(-66, -38, 22, 'url(#beam)', NS) : '') + '</g>';
};
const inside = (o = {}) => {
  const { wall = '#fbe6c4', floor = '#c89a68', y = 206, wain = null, stripe = true } = o;
  return R(0, 0, 400, 300, wall) + (stripe ? [20, 60, 100, 140, 180, 220, 260, 300, 340, 380].map((q) => R(q, 0, 20, y, '#fff', 0, `${NS} opacity=".12"`)).join('') : '') + R(0, 0, 400, y, 'url(#shv)', 0, NS)
    + (wain ? R(0, y - 56, 400, 56, wain) + R(0, y - 60, 400, 6, '#fff', 0, 'opacity=".7" stroke="none"') + [0, 60, 120, 180, 240, 300, 360].map((q) => P(`M${q} ${y - 54}v50`, 'none', 'stroke="#000" stroke-width="1.4" opacity=".12"')).join('') : '')
    + R(0, y, 400, 300 - y, floor) + [0, 22, 44, 66, 88].map((q) => P(`M0 ${y + 8 + q}H400`, 'none', 'stroke="#000" stroke-width="1.6" opacity=".14"')).join('') + R(0, y, 400, 300 - y, 'url(#shv)', 0, NS) + R(0, y - 8, 400, 12, '#fff', 0, 'opacity=".85" stroke="#3a3f55" stroke-width="2"');
};
const windowFrame = (x, y, w, h, glass, inner = '') => G(R(x - 8, y - 8, w + 16, h + 16, '#fff', 8) + R(x, y, w, h, glass, 4, 'stroke-width="2"') + inner + P(`M${x + w / 2} ${y}V${y + h}M${x} ${y + h / 2}H${x + w}`, 'none', 'stroke="#fff" stroke-width="5"') + P(`M${x + w / 2} ${y}V${y + h}M${x} ${y + h / 2}H${x + w}`, 'none', 'stroke-width="1.4"') + R(x - 12, y + h + 6, w + 24, 8, '#f4ecdc', 3), '', 2.6);
const stormGlass = (x, y, w, h, seed = 0) => Array.from({ length: 22 }, (_, i) => C(x + 4 + ((i * 53 + seed * 17) % (w - 8)), y + 4 + ((i * 37 + seed * 29) % (h - 8)), 1.6 + (i % 3) * 0.9, '#fff', `${NS} opacity=".9"`)).join('')
  + Array.from({ length: 6 }, (_, i) => P(`M${x + 10 + ((i * 41) % (w - 24))} ${y + 8 + ((i * 29) % (h - 20))}l-12 5`, 'none', 'stroke="#fff" stroke-width="1.8" opacity=".6"')).join('');
const curtainPair = (x, y, w, h, col = '#e8556a') => G(P(`M${x - 14} ${y - 10}Q${x + 6} ${y + h / 2} ${x - 8} ${y + h + 10}L${x - 22} ${y + h + 10}Q${x - 12} ${y + h / 2} ${x - 26} ${y - 10}Z`, col) + P(`M${x + w + 14} ${y - 10}Q${x + w - 6} ${y + h / 2} ${x + w + 8} ${y + h + 10}L${x + w + 22} ${y + h + 10}Q${x + w + 12} ${y + h / 2} ${x + w + 26} ${y - 10}Z`, col) + R(x - 30, y - 18, w + 60, 8, '#8a5a3c', 4), '', 2.2);

const pages = [
  // 1 — school is closed
  { svg: svg(inside({ wall: '#fbe6c4', floor: '#c89a68', y: 214, wain: '#e8c9a0' })
    + windowFrame(36, 36, 150, 112, 'url(#skyS)', stormGlass(36, 36, 150, 112, 1)) + curtainPair(36, 36, 150, 112)
    + G(R(236, 160, 150, 10, '#8a5a3c', 4) + R(250, 168, 8, 46, '#8a5a3c') + R(366, 168, 8, 46, '#8a5a3c'), '', 2.4)
    + G(RS(258, 118, 96, 44, '#a8672f', 9) + C(284, 140, 15, '#4a3226') + C(284, 140, 11, '#6b4a34') + P('M276 134h16M276 140h16M276 146h16', 'none', 'stroke="#c9a070" stroke-width="1.6"') + R(310, 126, 34, 14, '#f4ecdc', 3) + C(318, 150, 4.5, '#e8c14a', 'stroke-width="1.6"') + C(334, 150, 4.5, '#e8c14a', 'stroke-width="1.6"') + P('M340 118L358 92', 'none', 'stroke-width="3"') + C(358, 92, 3.4, '#c8372d', NS), '', 2.4)
    + P('M366 128q9 9 0 18M376 120q15 17 0 34M386 112q21 25 0 50', 'none', 'stroke="#f08a24" stroke-width="3.2" opacity=".9"')
    + E(100, 286, 38, 7, '#27406a', `${NS} opacity=".22"`) + E(200, 288, 30, 6, '#27406a', `${NS} opacity=".22"`)
    + mia(100, 268, 1.55, { mood: 'laugh', ar: 'u', al: 'u', hat: null, coat: '#f7a8c6', pants: '#f7a8c6', boots: '#fff', shadow: false })
    + theo(204, 272, 1.5, { mood: 'laugh', ar: 'u', al: 'u', hat: null, coat: '#8cc4f0', pants: '#8cc4f0', boots: '#fff', shadow: false })
    + maman(322, 298, 1.5, { mood: 'happy', al: [-40, -62], ar: [36, -44], holdR: mug(0, 6, 0.7, { marsh: false }) })
    + star4(160, 96, 3, '#f4c430') + star4(248, 100, 2.4, '#f4c430') + star4(62, 108, 2.2, '#f4c430')), text: "Ce matin, la neige tombe à gros flocons. À la radio, on annonce : « Les écoles sont fermées! » Mia et son petit frère Théo sautent de joie." },
  // 2 — getting dressed
  { svg: svg(inside({ wall: '#efe0c6', floor: '#9a7050', y: 220, wain: '#d9c09a' })
    + G(R(20, 40, 210, 12, '#8a5a3c', 4) + [46, 100, 154, 206].map((px, i) => C(px, 56, 4.4, '#f4c430', 'stroke-width="2"') + P(`M${px - 9} 60Q${px - 14} 62 ${px - 22} 70L${px - 30} 122L${px - 19} 124L${px - 17} 96L${px - 17} 142L${px + 17} 142L${px + 17} 96L${px + 19} 124L${px + 30} 122L${px + 22} 70Q${px + 14} 62 ${px + 9} 60Z`, ['#3fa34d', '#8a5cc7', '#e8c14a', '#4a8fe0'][i]) + P(`M${px - 9} 60Q${px - 14} 62 ${px - 22} 70L${px - 30} 122L${px - 19} 124L${px - 17} 96L${px - 17} 142L${px + 17} 142L${px + 17} 96L${px + 19} 124L${px + 30} 122L${px + 22} 70Q${px + 14} 62 ${px + 9} 60Z`, 'url(#sh)', NS) + E(px, 66, 12, 8, '#000', NS + ' opacity=".15"') + P(`M${px} 68V140`, 'none', 'stroke-width="1.6" opacity=".4"') + R(px - 16, 60, 32, 8, '#fff', 3, 'opacity=".25" stroke="none"')).join('') + P('M60 52q6 4 12 0', 'none', 'stroke-width="2"'), '', 2.4)
    + G(R(276, 236, 118, 14, '#a8672f', 5) + R(284, 248, 10, 46, '#7a4a2a') + R(376, 248, 10, 46, '#7a4a2a') + R(284, 276, 100, 6, '#7a4a2a'), '', 2.4)
    + boot(338, 282, 0.95, true, '#e23b3b') + C(318, 262, 24, '#27406a', `${NS} opacity=".1"`)
    + G(PS('M20 282Q80 296 150 284L146 300H24Z', '#c8372d') + P('M30 288h110', 'none', 'stroke="#f4c430" stroke-width="2" opacity=".7"'), '', 2)
    + mia(104, 292, 1.6, { mood: 'happy', ar: [46, -22], al: 'd' })
    + theo(214, 296, 1.55, { mood: 'worried', al: [-24, -62], holdR: boot(0, 4, 0.55, false, '#2e8fd0'), front: RS(-16, -10, 15, 10, '#fff', 3.5, 'stroke-width="2.4"') + P('M-15 -6h13', 'none', 'stroke="#e8556a" stroke-width="2"') })
    + star4(318, 244, 3.4, '#f4c430') + star4(298, 250, 2, '#f4c430') + star4(344, 242, 2, '#f4c430')), text: "Mia met sa tuque, ses mitaines et ses bottes. Théo cherche encore sa deuxième botte. Elle est sous le banc!" },
  // 3 — Samir waits outside
  { svg: svg(outdoor({ mode: 'storm', seed: 3 }) + house(62, 214, 0.78, { open: true, steps: 'clear' })
    + mia(152, 296, 1.5, { mood: 'laugh', ar: 'u', al: 'd' }) + theo(220, 298, 1.45, { mood: 'laugh', al: 'u', ar: 'd' })
    + samir(336, 296, 1.5, { flip: true, mood: 'happy', al: [-36, -50], holdL: G(shovel(62), 'rotate(-12)') })
    + snowfall(22, 7, 1.2) + wind(8, 3)), text: "Dehors, le voisin Samir les attend avec une pelle. — On construit un fort? demande-t-il. — Oui! crient Mia et Théo." },
  // 4 — building the fort
  { svg: svg(outdoor({ mode: 'storm', seed: 4, flakeN: 34 }) + fort(206, 254, 1.4, { flag: false, rows: 3 })
    + G(PS('M20 296L44 270L84 270L98 296Z', '#e8564a') + P('M26 288h66', 'none', 'stroke="#fff" stroke-width="2" opacity=".5"'), '', 2.4) + blk(60, 262, 30, 22) + blk(100, 270, 30, 22) + blk(24, 282, 34, 22)
    + samir(54, 298, 1.45, { mood: 'happy', ar: [38, -44], holdR: shovel(52) })
    + theo(268, 298, 1.45, { mood: 'laugh', ar: [30, -64], holdR: G(shovel(46), 'rotate(-20)') })
    + mia(348, 298, 1.5, { flip: true, mood: 'happy', ar: [34, -62], al: [-34, -54], holdR: blk(-17, -14, 34, 24) })
    + snowfall(20, 9, 1.2) + wind(6, 4) + C(256, 214, 3, '#fff', NS) + C(240, 206, 2.4, '#fff', NS)), text: "Ils font de gros blocs de neige avec des seaux. Mia les empile. Théo les tape avec sa pelle." },
  // 5 — fort finished
  { svg: svg(outdoor({ mode: 'storm', seed: 5, flakeN: 28 }) + fort(204, 262, 1.25, { flag: true, rows: 4 })
    + mia(56, 298, 1.55, { mood: 'laugh', ar: 'u', al: 'd' }) + theo(122, 300, 1.5, { mood: 'laugh', al: 'u' })
    + samir(350, 298, 1.6, { flip: true, mood: 'happy', al: [-14, -44], ar: [36, -62] })
    + snowfall(14, 2, 1.1) + star4(300, 112, 3, '#f4c430') + star4(318, 100, 2, '#f4c430') + star4(108, 120, 2.4, '#f4c430')), text: "Le fort a quatre murs, une porte et un drapeau rouge. Samir est fier. C'est le plus beau fort de la rue!" },
  // 6 — Madame Odette is stuck
  { svg: svg(outdoor({ mode: 'storm', seed: 6 }) + house(272, 238, 1.05, { wall: '#9ec4a8', roof: '#7a5a6a', steps: 'buried', winL: odette(-51, -54, 0.46, { bust: true, shadow: false, mood: 'worried', ar: 'w' }) })
    + mia(70, 298, 1.6, { mood: 'worried', ar: [44, -52] }) + theo(146, 300, 1.5, { mood: 'worried' })
    + snowfall(24, 4, 1.2) + wind(8, 6)), text: "Mia regarde la maison d'en face. Madame Odette est à sa fenêtre. Ses marches sont cachées sous la neige. Elle ne peut pas sortir." },
  // 7 — shovelling
  { svg: svg(outdoor({ mode: 'storm', seed: 7, flakeN: 30 }) + house(306, 212, 0.9, { wall: '#9ec4a8', steps: 'clear' })
    + P('M0 262Q120 246 230 252T340 232L352 238Q240 262 120 282Q40 292 0 296Z', '#cfd9e6', NS) + P('M0 264Q120 248 230 254', 'none', 'stroke="#fff" stroke-width="3" opacity=".7"')
    + E(60, 290, 50, 10, '#fff', NS) + E(240, 288, 40, 8, '#fff', NS)
    + samir(78, 296, 1.5, { mood: 'happy', ar: [30, -40], al: [-10, -44], holdR: G(shovel(32), 'rotate(155)') })
    + mia(170, 298, 1.55, { mood: 'happy', ar: [30, -40], al: [-10, -44], holdR: G(shovel(32), 'rotate(155)') })
    + theo(250, 300, 1.55, { mood: 'laugh', ar: [28, -38], al: [-10, -42], holdR: G(shovel(30), 'rotate(155)') })
    + G(P('M110 238q14 -26 34 -10M196 236q16 -28 38 -8M274 244q12 -22 32 -8', 'none', 'stroke="#fff" stroke-width="4"'), '') + C(128, 214, 4, '#fff', NS) + C(214, 212, 3.6, '#fff', NS) + C(288, 226, 3.4, '#fff', NS)
    + snowfall(16, 5, 1.1)), text: "Les trois amis courent chez Madame Odette. Pelletée après pelletée, ils déneigent les marches et le trottoir." },
  // 8 — Odette says thank you
  { svg: svg(outdoor({ mode: 'storm', seed: 8, flakeN: 22 }) + house(262, 262, 1.5, { wall: '#9ec4a8', open: true, steps: 'clear' })
    + odette(262, 270, 1.42, { mood: 'happy', al: [-18, -44], ar: [18, -44] })
    + samir(64, 298, 1.5, { mood: 'happy', ar: [26, -40], holdR: G(shovel(52), 'rotate(-10)') }) + mia(138, 300, 1.55, { mood: 'happy', ar: 'd' }) + theo(204, 302, 1.5, { mood: 'laugh', al: 'u' })
    + snowfall(12, 6, 1.1)), text: "Madame Odette ouvre sa porte. — Merci, mes chers enfants! Vous êtes bien gentils, dit-elle. — Ce n'est rien, répond Mia en souriant." },
  // 9 — hot chocolate
  { svg: svg(inside({ wall: '#f6e3c8', floor: '#b8825a', y: 222, wain: '#e0b98a' })
    + windowFrame(150, 40, 100, 80, 'url(#skyS)', stormGlass(150, 40, 100, 80, 3)) + curtainPair(150, 40, 100, 80, '#4a8fe0')
    + G(PS('M30 150Q20 170 34 178L70 178Q80 168 72 150Z', '#fff') + P('M34 160q18 6 36 0', 'none', 'stroke="#e8556a" stroke-width="3"') + C(52, 144, 8, '#5aa860', 'stroke-width="2"') + P('M52 136q-8 -12 -2 -22M52 136q8 -12 2 -22', 'none', 'stroke="#5aa860" stroke-width="3"'), '', 2.4)
    + odette(66, 250, 1.4, { mood: 'happy', ar: [18, -46], al: [-18, -46] }) + mia(166, 250, 1.4, { mood: 'laugh', hat: null, ar: [18, -46], al: [-18, -46] }) + samir(250, 250, 1.4, { mood: 'happy', hat: null, ar: [18, -46], al: [-18, -46] }) + theo(332, 254, 1.4, { mood: 'laugh', hat: null, ar: [18, -46], al: [-18, -46] })
    + G(RS(10, 212, 380, 22, '#d9a066', 8) + R(14, 232, 372, 70, '#c8372d', 0, NS) + P('M14 232h372M14 244h372M14 258h372', 'none', 'stroke="#fff" stroke-width="2.4" opacity=".35"') + [60, 120, 180, 240, 300, 360].map((q) => P(`M${q} 232V300`, 'none', 'stroke="#fff" stroke-width="2.4" opacity=".35"')).join(''), '', 2.6)
    + mug(66, 226, 0.95) + mug(166, 228, 1.0) + mug(250, 228, 1.0) + mug(332, 226, 0.95)
    + steam(60, 186, 0.62) + steam(160, 188, 0.62) + steam(244, 188, 0.62) + steam(326, 186, 0.62) + R(0, 0, 400, 300, 'url(#vig)', 0, NS)), text: "Madame Odette les invite à entrer. Elle prépare du chocolat chaud avec des guimauves. Ça fait du bien aux mains froides!" },
  // 10 — afternoon play
  { svg: svg(outdoor({ mode: 'clear', seed: 10 }) + fort(318, 226, 0.78, { flag: true, rows: 4 })
    + E(104, 272, 96, 24, '#cfdeee', NS) + P('M58 250Q74 236 100 260Q128 236 150 252Q130 272 118 290L92 290Q74 272 58 250Z', '#c4d6ea', NS) + E(104, 268, 80, 8, '#e8f1f9', NS)
    + `<g transform="translate(160 276) rotate(-90)">` + theo(0, 0, 1.5, { shadow: false, mood: 'laugh', al: [46, -70], ar: [46, -70] }) + '</g>'
    + mia(222, 298, 1.6, { mood: 'laugh', ar: [46, -64], al: [-30, -50] })
    + snowball(290, 160, 10) + P('M272 176l-28 12M276 186l-26 12M282 168l-28 4', 'none', 'stroke="#fff" stroke-width="3" opacity=".7"')
    + samir(350, 298, 1.55, { flip: true, mood: 'surprised', ar: [36, -64], al: [-30, -50] })
    + G(C(350, 130, 9, '#fff', NS) + C(366, 124, 5, '#fff', NS) + C(334, 122, 5, '#fff', NS) + C(352, 114, 3.6, '#fff', NS) + C(372, 138, 4, '#fff', NS) + C(332, 136, 3.4, '#fff', NS) + P('M326 112l-8 -8M352 104l2 -10M374 120l8 -4', 'none', 'stroke="#fff" stroke-width="3"'), '')
    + snowfall(10, 8, 1)), text: "Tout l'après-midi, ils jouent dans la neige. Théo fait un ange de neige. Mia lance une boule à Samir : plouf!" },
  // 11 — bedtime
  { svg: svg(inside({ wall: '#7568ae', floor: '#8a6a54', y: 220, wain: '#5f5496' })
    + windowFrame(146, 34, 108, 88, 'url(#skyN)', C(204, 58, 14, '#fff1b8', NS) + C(210, 55, 11, '#2b3a74', `${NS} opacity=".3"`) + stormGlass(146, 34, 108, 88, 9)) + curtainPair(146, 34, 108, 88, '#e8556a')
    + G(RS(168, 176, 64, 44, '#a8672f', 4) + R(172, 130, 56, 8, '#8a5a3c', 4) + E(200, 124, 28, 8, '#ffe9a8', 'stroke-width="2"') + P('M186 130L200 100L214 130Z', '#ffd27a', 'stroke-width="2.4"'), '', 2.4) + C(200, 112, 70, 'url(#glow)', `${NS} opacity=".5"`)
    + G(RS(22, 160, 132, 70, '#b9783f', 8) + R(22, 140, 12, 98, '#8a5a3c', 4) + ES(80, 186, 44, 16, '#f6fafe') + RS(206, 160, 132, 70, '#b9783f', 8), '', 2.6)
    + G(R(332, 140, 12, 98, '#8a5a3c', 4) + ES(282, 186, 44, 16, '#f6fafe') , '', 2.6)
    + mia(88, 262, 1.8, { mood: 'sleepy', hat: null, tilt: -4, bust: true, shadow: false, coat: '#f7a8c6', al: [-12, -34], ar: [14, -36] })
    + theo(280, 262, 1.8, { mood: 'sleepy', hat: null, tilt: 4, bust: true, shadow: false, coat: '#8cc4f0', al: [-12, -34], ar: [14, -36] })
    + G(PS('M16 218Q18 206 60 204L152 206Q160 210 158 300H12Z', '#e8556a') + P('M26 224Q86 236 150 222M24 240Q86 252 152 238', 'none', 'stroke="#fff" stroke-width="2.4" opacity=".4"') + C(64, 214, 3, '#fff', 'opacity=".5" stroke="none"') + C(110, 220, 3, '#fff', 'opacity=".5" stroke="none"'), '', 2.6)
    + G(PS('M216 214Q222 202 262 202L346 204Q352 210 350 300H210Z', '#4a8fe0') + P('M222 224Q284 236 346 222M222 240Q284 252 348 238', 'none', 'stroke="#fff" stroke-width="2.4" opacity=".4"') + C(262, 214, 3, '#fff', 'opacity=".5" stroke="none"') + C(310, 220, 3, '#fff', 'opacity=".5" stroke="none"'), '', 2.6)
    + P('M170 60q-8 6 -4 14M232 66q8 6 4 14', 'none', 'stroke="#fff" stroke-width="2" opacity=".3"') + R(0, 0, 400, 300, 'url(#vig)', 0, NS)), text: "Le soir, Mia et Théo sont fatigués. Dans leur lit, ils écoutent le vent. Dehors, la neige tombe encore." },
  // 12 — the snowplough
  { svg: svg(outdoor({ mode: 'night', seed: 12, road: true, flakeN: 30 }) + house(76, 210, 0.92, { wall: '#b98a5e', night: true, steps: 'clear', winL: mia(-51, -54, 0.46, { bust: true, shadow: false, mood: 'surprised', hat: null, coat: '#f7a8c6', ar: 'w' }) })
    + plough(244, 292, 1.4, { night: true })
    + G(P('M52 252Q40 224 70 214Q54 238 80 250ZM30 262Q12 240 38 228Q26 246 46 258Z', '#f2f7fb', NS + ' opacity=".9"'), '') + E(60, 280, 36, 10, '#e8f0fa', NS) + C(36, 232, 4, '#fff', NS) + C(56, 218, 3, '#fff', NS) + C(24, 250, 3, '#fff', NS)
    + P('M6 120h14M10 130h18M0 140h12', 'none', 'stroke="#fff" stroke-width="2" opacity="0"') + snowfall(26, 3, 1.2) + R(0, 0, 400, 300, 'url(#vig)', 0, NS)), text: "Au milieu de la nuit, un gros bruit réveille Mia. Une déneigeuse jaune passe dans la rue. Ses lumières orange tournent." },
  // 13 — morning after
  { svg: svg(outdoor({ mode: 'clear', seed: 13, road: true }) + house(226, 198, 0.55, { wall: '#d9a066', steps: 'clear', smoke: true }) + fort(308, 252, 0.82, { flag: true, rows: 4 })
    + theo(170, 298, 1.35, { mood: 'happy', al: 'w' })
    + mia(88, 298, 1.75, { mood: 'happy', ar: 'd', al: 'd' })
    + star4(40, 110, 3, '#f4c430') + star4(150, 100, 2.4, '#f4c430')), text: "Le lendemain, la rue est bien dégagée sous le soleil. Le fort est toujours là. Mia sourit : quelle belle journée de tempête!" },
];

export const book = {
  id: 'jour-de-tempete',
  title: 'Le jour de tempête',
  emoji: '❄️',
  level: 2,
  minutes: 9,
  cover: svg(outdoor({ mode: 'storm', seed: 14, flakeN: 34 }) + fort(214, 254, 1.25, { flag: true, rows: 4 })
    + mia(64, 298, 1.5, { mood: 'laugh', ar: 'u' }) + theo(128, 300, 1.35, { mood: 'happy', al: 'u' }) + samir(346, 298, 1.55, { flip: true, mood: 'happy', ar: 'u' })
    + snowfall(12, 4, 1.1)),
  pages,
  words: [
    { word: 'une tempête', emoji: '🌨️', def: 'Un très gros mauvais temps, avec beaucoup de neige et de vent.' },
    { word: 'fermé', emoji: '🔒', def: "Qui n'est pas ouvert. Ce jour-là, il n'y a pas d'école." },
    { word: 'une tuque', emoji: '🧶', def: 'Un bonnet de laine pour garder la tête au chaud.' },
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
    { q: "Comment se sent Madame Odette quand les enfants ont fini?", options: ['Fâchée', 'Contente et reconnaissante', 'Fatiguée'], answer: 1 },
    { q: "Qu'est-ce qui réveille Mia pendant la nuit?", options: ['Une déneigeuse', 'Le chat', 'Un orage'], answer: 0 },
  ],
};
