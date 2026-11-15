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
  + '</defs>';
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

// ---------- characters of this book ----------
const lea = (x, y, s, o = {}) => kid(x, y, s, { skin: '#f1c6a0', hair: '#6a3b22', style: 'braids', coat: '#8a5cc7', pants: '#3a4a7a', hat: '#f4c430', band: '#fff4b0', mitt: '#e23b3b', iris: '#3b6a8a', boots: '#7a3a4a', ...o });
const noe = (x, y, s, o = {}) => kid(x, y, s, { skin: '#c68a5e', skinD: '#a8683f', hair: '#2a2420', coat: '#3b7fd1', pants: '#4a4a5a', hat: '#3fa34d', band: '#d6f2d8', mitt: '#f08a24', iris: '#3a2418', ...o });
const rose = (x, y, s, o = {}) => kid(x, y, s, { skin: '#e8b890', hair: '#2b2b2b', style: 'long', coat: '#c43d8a', pants: '#3a3f55', hat: '#7f6bb5', band: '#e6dcf7', mitt: '#7f6bb5', scarf: '#f4c430', iris: '#3a2a22', ...o });
const gaston = (x, y, s, o = {}) => kid(x, y, s, { skin: '#e8b890', hair: '#eee', coat: '#c8372d', pants: '#4a4a5a', hat: '#5a6a7a', band: '#3f4a58', mitt: '#8a5a3c', beard: true, plaid: true, brow: '#c9ccd8', iris: '#4a7a9a', boots: '#5a3a28', ...o });
const kidB = (x, y, s, o = {}) => kid(x, y, s, { skin: '#f1c6a0', hair: '#c9772b', coat: '#f08a24', pants: '#3a4a7a', hat: '#e8556a', band: '#ffe0e6', mitt: '#e8556a', iris: '#4a7a3a', ...o });
const maman = (x, y, s, o = {}) => kid(x, y, s, { skin: '#f1c6a0', hair: '#a0522d', style: 'long', coat: '#6fb5a0', pants: '#4a4a5a', boots: '#6b4a3a', iris: '#4a6a3a', ...o });

const dog = (x, y, s = 1, o = {}) => {
  const { mitt = false, flip = false, mood = 'happy', run = false, wet = false } = o;
  const fur = '#b9773f', furD = '#8a5428', cream = '#ecd0a4';
  const legs = run
    ? P('M-24 -18L-40 -4M-10 -16L-18 0', 'none', `stroke="${O}" stroke-width="13"`) + P('M-24 -18L-40 -4M-10 -16L-18 0', 'none', `stroke="${furD}" stroke-width="9"`) + P('M16 -16L34 -6M24 -18L40 -12', 'none', `stroke="${O}" stroke-width="13"`) + P('M16 -16L34 -6M24 -18L40 -12', 'none', `stroke="${fur}" stroke-width="9"`) + C(-40, -3, 5.5, cream) + C(-18, 1, 5.5, cream) + C(34, -6, 5.5, cream) + C(40, -12, 5.5, cream)
    : RS(-26, -22, 11, 22, furD, 5) + RS(-9, -22, 11, 22, furD, 5) + RS(8, -22, 11, 22, fur, 5) + RS(23, -22, 11, 22, fur, 5) + R(-26, -5, 11, 5, cream, 2.5) + R(-9, -5, 11, 5, cream, 2.5) + R(8, -5, 11, 5, cream, 2.5) + R(23, -5, 11, 5, cream, 2.5);
  return G(
    (run ? '' : E(2, 1, 40, 6, '#27406a', `${NS} opacity=".2"`))
    + thick(run ? 'M-30 -36Q-52 -52 -50 -70' : 'M-30 -34Q-50 -42 -48 -62', fur, 8) + P(run ? 'M-30 -36Q-52 -52 -50 -70' : 'M-30 -34Q-50 -42 -48 -62', 'none', `stroke="${cream}" stroke-width="3" opacity=".7" transform="translate(1 0)"`)
    + legs
    + ES(0, -30, 34, 18, fur) + E(-2, -22, 24, 8, cream, NS) + P('M-14 -42Q-6 -34 -12 -20M6 -44Q14 -36 8 -22', 'none', `stroke="${furD}" stroke-width="2" opacity=".5"`)
    + P('M20 -38Q30 -40 38 -34L36 -26Q28 -24 20 -26Z', '#c43d3d', 'stroke-width="2"') + C(30, -32, 3.5, '#f4c430', 'stroke-width="1.5"')
    + CS(40, -52, 17, fur) + P('M33 -62Q40 -68 47 -62Q40 -58 33 -62Z', cream, NS) + E(57, -46, 11, 9, cream) + E(63, -49, 4.4, 3.4, '#2a2a33', NS) + C(62, -50.5, 1.2, '#fff', NS)
    + (mitt ? '' : P('M54 -40q4 2 8 -1q0 10 -4 12q-4 -2 -4 -11Z', '#e8656a', 'stroke-width="1.8"'))
    + P('M24 -70Q10 -70 11 -48Q12 -38 20 -42Q28 -48 30 -62Z', furD) + P('M24 -70Q10 -70 11 -48', 'none', 'stroke="#fff" stroke-width="1.6" opacity=".2"')
    + eye(44, -55, '#3a2418', { rx: 3.6, ry: 3.9 }) + P('M38 -63Q43 -66 48 -63', 'none', `stroke="${furD}" stroke-width="2.2"`)
    + (wet ? P('M60 -34q-2 5 0 8q2 -2 0 -8', '#8fd0f6', 'stroke="none"') : '')
    + (mitt ? G(P('M-9.5 2Q-13 -22 0 -25Q13 -22 9.5 2Z', '#e23b3b') + E(-12, -12, 4.4, 6.4, '#e23b3b') + R(-10.5, 0, 21, 9, '#fff', 3) + P('M-5 -8q-2 4 0 6q2 -2 0 -6', '#8fd0f6', 'stroke="none"'), 'translate(60 -37) rotate(80) scale(0.9)', 2.2) : ''),
    `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`);
};
const horse = (x, y, s = 1, o = {}) => {
  const { gallop = false } = o;
  const body = '#a8672f', dark = '#7a4a22', light = '#c8864a';
  const hoof = (px) => R(px - 1, -7, 15, 7, '#3a3036', 3);
  return G(
    E(0, 1, 70, 7, '#27406a', `${NS} opacity=".2"`)
    + thick('M-52 -80Q-84 -72 -76 -28', '#2e2018', 11) + P('M-52 -80Q-84 -72 -76 -28', 'none', 'stroke="#5a4030" stroke-width="3" opacity=".7" transform="translate(2 0)"')
    + RS(-42, -50, 13, 50, dark, 5) + RS(-24, -50, 13, 50, dark, 5) + hoof(-43) + hoof(-25)
    + ES(0, -66, 56, 28, body) + E(-6, -50, 40, 8, light, `${NS} opacity=".5"`)
    + RS(16, -52, 13, 52, body, 5) + RS(34, -52, 13, 52, body, 5) + hoof(15) + hoof(33)
    + P('M24 -82L56 -124L84 -112L58 -58Z', body) + P('M24 -82L56 -124L84 -112L58 -58Z', 'url(#sh)', NS)
    + P('M66 -126L70 -142L82 -124Z', body) + P('M69 -128L71 -137L77 -126Z', '#e8b090', NS)
    + ES(90, -106, 22, 13, light, 'transform="rotate(28 90 -106)"') + E(104, -92, 4, 5, '#3a2a2a', NS)
    + eye(80, -111, '#2a1a12', { rx: 3.8, ry: 4.4 })
    + P('M72 -98Q92 -86 106 -95', 'none', 'stroke="#4a3a2a" stroke-width="3"') + thick('M84 -118L96 -96', '#c8372d', 3)
    + thick('M56 -126Q40 -108 30 -82', '#2e2018', 9) + P('M52 -120Q40 -104 32 -84', 'none', 'stroke="#5a4030" stroke-width="2.5" opacity=".6"')
    + P('M30 -78Q42 -64 40 -48', 'none', 'stroke="#c8372d" stroke-width="7"') + C(44, -62, 5.2, '#f4c430', 'stroke-width="1.8"') + C(36, -52, 4.4, '#f4c430', 'stroke-width="1.8"') + C(42, -44, 4, '#f4c430', 'stroke-width="1.8"') + P('M45 -62v4M37 -52v3.4M43 -44v3', 'none', 'stroke="#8a5a1c" stroke-width="1"'),
    `translate(${x} ${y}) scale(${s})`);
};
// a horse-drawn sleigh with the class (Léa, Noé, a friend, Monsieur Gaston driving); blanket over the knees
const sleighBody = () => G(P('M-14 -4Q-30 -2 -24 -26', 'none', 'stroke="#6b4a3a" stroke-width="5"') + P('M-14 3L204 3', 'none', 'stroke="#6b4a3a" stroke-width="6"') + R(16, -6, 5, 8, '#6b4a3a') + R(66, -6, 5, 8, '#6b4a3a') + R(130, -6, 5, 8, '#6b4a3a') + R(172, -6, 5, 8, '#6b4a3a')
  + P('M-14 -4Q-30 -2 -24 -26', 'none', 'stroke="#b9c3cc" stroke-width="2.5" opacity=".6"'));
const blanket = () => G(P('M-4 -30Q0 -52 40 -52Q100 -48 180 -48Q190 -40 186 -28Q96 -20 -2 -24Z', '#c8372d') + P('M-4 -30Q0 -52 40 -52Q100 -48 180 -48Q190 -40 186 -28Q96 -20 -2 -24Z', 'url(#sh)', NS)
  + P('M20 -50V-23M52 -50V-22M84 -49V-21M116 -49V-21M148 -48V-21M176 -47V-24', 'none', 'stroke="#f7e8b8" stroke-width="2.6" opacity=".85"') + P('M-2 -42Q90 -38 188 -38M-3 -33Q90 -30 188 -30', 'none', 'stroke="#2b1b3b" stroke-width="2" opacity=".5"') + P('M10 -48Q50 -40 80 -46M110 -45Q140 -38 176 -44', 'none', 'stroke="#fff" stroke-width="2" opacity=".25"'), '', 2.4);
const sleighFront = () => G(P('M-6 -34L206 -34L198 -6L2 -6Z', '#b5653a') + P('M-6 -34L206 -34L204 -28L-4 -28Z', '#d9904f', NS) + P('M0 -20H202M2 -13H200', 'none', 'stroke="#7a4a2a" stroke-width="1.4" opacity=".6"') + P('M-8 -34Q-22 -34 -24 -54', 'none', 'stroke-width="5"') + C(-24, -56, 4, '#f4c430', 'stroke-width="1.6"'));
const sleigh = (x, y, s, o = {}) => {
  const { lea: lo = {}, noeO = {} } = o;
  return `<g transform="translate(${x} ${y}) scale(${s})">`
    + horse(252, 0, 0.92) + thick('M200 -30L276 -52', '#8a5a3c', 4)
    + sleighBody()
    + lea(44, -34, 1.12, { bust: true, shadow: false, ar: 'w', ...lo }) + noe(96, -34, 1.12, { bust: true, shadow: false, mood: 'laugh', ...noeO }) + kidB(148, -34, 1.12, { bust: true, shadow: false, ar: 'w' }) + gaston(198, -34, 1.2, { bust: true, shadow: false, ar: 'f' })
    + blanket() + sleighFront()
    + G(P('M270 -64q0 -10 -14 -4', 'none', 'stroke-width="2"') + C(254, -68, 4, '#f4c430', 'stroke-width="1.5"') + C(262, -74, 4, '#f4c430', 'stroke-width="1.5"') + C(268, -60, 4, '#f4c430', 'stroke-width="1.5"'), '')
    + '</g>';
};

// ---------- places ----------
const farTrees = (base, seed = 0, col = '#a9c6da') => Array.from({ length: 24 }, (_, i) => { const px = i * 17 + ((i * 7 + seed) % 9) - 5, h = 16 + ((i * 5 + seed) % 4) * 6; return P(`M${px - 8} ${base}L${px} ${base - h - 8}L${px + 8} ${base}Z`, col, NS); }).join('');
const winter = (o = {}) => {
  const { sun = true, seed = 0, dusk = false } = o;
  return R(0, 0, 400, 300, dusk ? 'url(#skyI)' : 'url(#skyW)')
    + (sun ? C(338, 56, 56, 'url(#sun)') + C(338, 56, 16, '#fff6c2', NS) : '')
    + E(110, 52, 40, 9, '#fff', `${NS} opacity=".7"`) + E(140, 44, 28, 8, '#fff', `${NS} opacity=".7"`) + E(250, 78, 30, 7, '#fff', `${NS} opacity=".55"`)
    + P('M0 164Q90 132 190 158T400 146V300H0Z', '#c4dbed') + farTrees(158, seed) + P('M0 182Q120 156 230 178T400 170V300H0Z', '#dde9f4') + farTrees(176, seed + 3, '#8fb2c9').replace(/<path/g, '<path opacity=".55"')
    + P('M0 200Q110 180 230 198T400 192V300H0Z', 'url(#snow)') + P('M0 240Q150 224 400 244V300H0Z', '#f4fafe')
    + dashes([[20, 222, 34], [150, 212, 30], [310, 208, 40], [60, 262, 30], [250, 270, 36], [350, 284, 30], [180, 238, 24]]) + sparkles(18, seed, 205);
};
const pine = (x, y, s = 1, snow = true) => G(R(-5, -14, 10, 16, '#6b4a34') + P('M-31 -8L0 -54L31 -8Q0 0 -31 -8Z', '#2b7352') + P('M-25 -34L0 -78L25 -34Q0 -26 -25 -34Z', '#2f7d57') + P('M-18 -58L0 -102L18 -58Q0 -50 -18 -58Z', '#378a62')
  + P('M0 -54L31 -8Q16 -2 6 -5Z', 'rgba(20,50,60,.28)', NS) + P('M0 -78L25 -34Q14 -28 6 -31Z', 'rgba(20,50,60,.25)', NS) + P('M0 -102L18 -58Q10 -52 5 -55Z', 'rgba(20,50,60,.22)', NS)
  + (snow ? P('M-20 -24L0 -54L20 -24Q10 -17 0 -23Q-10 -17 -20 -24Z', '#fff', NS) + P('M-15 -50L0 -78L15 -50Q8 -43 0 -49Q-8 -43 -15 -50Z', '#fff', NS) + P('M-9 -75L0 -102L9 -75Q4 -70 0 -74Q-4 -70 -9 -75Z', '#fff', NS) : '')
  + P('M-24 -9Q0 -3 24 -9', 'none', 'stroke="#fff" stroke-width="2" opacity=".5"'), `translate(${x} ${y}) scale(${s})`, 2.2)
  + E(x + 8 * s, y + 1, 28 * s, 5 * s, '#27406a', `${NS} opacity=".14"`);
const bucket = (x, y, s = 1, o = {}) => {
  const { drip = false, open = false, lid = true } = o;
  return G(
    P('M-22 -44Q0 -62 22 -44', 'none', 'stroke="#6b6b78" stroke-width="2.4"')
    + P('M-17 -30L-14 0L14 0L17 -30Z', 'url(#metal)') + P('M-14 -22H15M-13.5 -12H14.5', 'none', 'stroke="#fff" stroke-width="1.2" opacity=".4"') + R(-14.5, -3, 29, 3, '#6b6b78', 1.5, NS)
    + (open ? E(0, -31, 17, 5, '#5a4030') + E(0, -30.5, 14, 3.2, '#d9f0fb', NS) + P('M-6 -31q6 -1 12 0', 'none', 'stroke="#fff" stroke-width="1" opacity=".8"') : E(0, -31, 17.5, 5, '#9aa6b0'))
    + (lid && !open ? P('M-19 -32Q0 -50 19 -32Z', '#9aa6b0') + P('M-19 -32Q0 -50 19 -32Z', 'url(#sh)', NS) + P('M-16 -35Q0 -46 16 -36Q8 -34 0 -36Q-8 -34 -16 -35Z', '#fff', NS) : '')
    + (drip ? P('M-1 -50q-3 5 0 8q3 -3 0 -8', '#8fd0f6', 'stroke-width="1.2" stroke="#5aa8d8"') : ''),
    `translate(${x} ${y}) scale(${s})`, 2.2);
};
const barkLines = 'M-6 -10V-40M0 -20V-62M6 -6V-34M-9 -50V-72M3 -64V-78';
const maple = (x, y, s = 1, o = {}) => {
  const { buck = true, drip = false, open = false, snowy = true } = o;
  const br = (d, w) => thick(d, '#7a4e32', w) + (snowy ? P(d, 'none', 'stroke="#fff" stroke-width="2.2" opacity=".85" transform="translate(0 -2.4)"') : '');
  return `<g transform="translate(${x} ${y}) scale(${s})">` + E(4, 3, 34, 6, '#27406a', `${NS} opacity=".16"`)
    + G(P('M-20 4Q-12 -4 -13 -30Q-12 -58 -9 -86L9 -86Q12 -58 13 -30Q12 -4 22 4Z', '#8a5a3c') + P('M-20 4Q-12 -4 -13 -30Q-12 -58 -9 -86L9 -86Q12 -58 13 -30Q12 -4 22 4Z', 'url(#sh)', NS)
      + P(barkLines, 'none', 'stroke="#4a3022" stroke-width="1.6" opacity=".55"') + P('M-3 -12q-3 4 0 8M4 -44q-3 4 0 8', 'none', 'stroke="#c8966a" stroke-width="1.6" opacity=".6"') + E(-4, -30, 2.4, 3.4, '#5a3a24', NS), '', 2.6)
    + br('M-7 -80L-28 -114M-28 -114L-46 -124M-28 -114L-26 -140M-18 -96L-34 -100', 6) + br('M7 -82L9 -120M9 -120L-3 -144M9 -120L27 -138M9 -104L26 -112', 6) + br('M5 -70L34 -102M34 -102L50 -106M34 -102L40 -126', 5)
    + (buck ? P('M10 -52L18 -49', 'none', 'stroke="#6b6b78" stroke-width="4"') + bucket(30, -4, 0.82, { drip, open }).replace('stroke-width="2.2"', 'stroke-width="2.4"') : '') + '</g>';
};
const shack = (x, y, s = 1, o = {}) => {
  const { smoke = true, lit = true } = o;
  return `<g transform="translate(${x} ${y}) scale(${s})">` + E(0, 4, 90, 9, '#27406a', `${NS} opacity=".16"`)
    + (smoke ? '<g opacity=".92">' + E(44, -120, 10, 7.5, '#fff', NS) + E(52, -136, 13, 9.5, '#f4f9fd', NS) + E(40, -154, 16, 11, '#fff', NS) + E(54, -172, 19, 12, '#f1f6fb', NS) + '</g>' : '')
    + G(R(32, -106, 18, 38, '#7a4a36') + R(29, -110, 24, 8, '#5a3a2c', 2) + R(-62, -72, 124, 72, 'url(#wood)', 2) + R(-62, -72, 124, 72, 'url(#sh)', 2, NS)
      + [-64, -52, -40, -28, -16, -4].map((qq) => P(`M-62 ${qq}h124`, 'none', 'stroke="#8a5428" stroke-width="1.4" opacity=".5"')).join('') + [-62, 62].map((qx) => [-62, -42, -22, -2].map((qy) => C(qx, qy + 10, 4.5, '#c98b50', 'stroke-width="1.5"')).join('')).join('')
      + P('M-76 -64L0 -122L76 -64Z', '#6b4a3a') + P('M-64 -68L0 -112L64 -68Q36 -82 0 -104Q-36 -82 -64 -68Z', '#fff', NS) + P('M-76 -64L0 -122L76 -64', 'none', 'stroke-width="3"') + P('M-50 -78l-4 8M-30 -90l-3 10M24 -92l3 10M46 -80l4 8', 'none', 'stroke="#fff" stroke-width="3"')
      + R(-14, -46, 28, 46, '#7a3f26', 3) + P('M0 -46V0', 'none', 'stroke-width="1.5" opacity=".5"') + C(8, -22, 2.4, '#f4c430', NS)
      + R(24, -56, 24, 22, lit ? '#ffe9a8' : '#bfe3f5', 2) + P('M36 -56V-34M24 -45H48', 'none', 'stroke-width="2"') + R(-48, -56, 24, 22, lit ? '#ffe9a8' : '#bfe3f5', 2) + P('M-36 -56V-34M-48 -45H-24', 'none', 'stroke-width="2"')
      + E(-64, 2, 24, 10, '#fff', NS) + E(62, 2, 26, 11, '#fff', NS) + R(-58, -14, 20, 14, '#a8672f', 2, 'stroke-width="1.5"') + P('M-58 -7h20', 'none', 'stroke-width="1.2"'), '', 2.6)
    + (lit ? C(36, -45, 34, 'url(#glow)', `${NS} opacity=".7"`) : '') + '</g>';
};
const taffy = '#e8a317';
const dropS = (x, y, sz = 1, c = '#8fd0f6') => P(`M${x} ${y - 6 * sz}q${-4 * sz} ${6 * sz} 0 ${9 * sz}q${4 * sz} ${-3 * sz} 0 ${-9 * sz}`, c, 'stroke="#5aa8d8" stroke-width="1.3"');
const ladle = () => thick('M0 0L40 -44', '#6b6b78', 3.4, '#4a4a58') + P('M36 -48Q48 -44 52 -34Q44 -24 34 -32Z', 'url(#metal)', `stroke="${O}" stroke-width="2.2"`) + E(44, -40, 7.5, 4, '#e8a317', 'transform="rotate(-50 44 -40)"') + P('M41 -43q4 -2 7 1', 'none', 'stroke="#fff" stroke-width="1.4" opacity=".8"');
const syrupCan = () => G(R(-12, -34, 24, 34, 'url(#metal)', 4) + R(-12, -34, 24, 34, 'url(#shv)', 4, NS) + R(-10, -22, 20, 18, '#d9472f', 2, 'stroke-width="1.5"') + leaf(0, -13, 0.48, '#f7c95a') + R(-6, -40, 12, 7, '#9aa6b0', 2) + R(-3.5, -44, 7, 5, '#6b6b78', 2) + P('M-9 -30V-4', 'none', 'stroke="#fff" stroke-width="2" opacity=".5"'), '', 2.4);

const pages = [
  // 1 — the bus
  { svg: svg(winter({ seed: 1 }) + pine(30, 190, 0.8) + pine(372, 186, 0.62)
    + G(E(266, 238, 150, 12, '#27406a', `${NS} opacity=".2"`) + R(128, 104, 258, 108, '#f7b81c', 16) + R(128, 104, 258, 108, 'url(#shv)', 16, NS) + R(128, 164, 258, 9, '#3a3f55', 0, NS) + R(128, 104, 258, 10, '#fff', 5, 'opacity=".3" stroke="none"')
      + [140, 178, 216, 254, 292, 330].map((wx, i) => R(wx, 116, 32, 36, '#bfe3f5', 4) + P(`M${wx + 2} ${118 + 22}l14 -20h8l-18 20z`, '#fff', `${NS} opacity=".5"`) + E(wx + 16, 143, 11, 9, ['#e8556a', '#3fa34d', '#f4c430', '#3b7fd1', '#8a5cc7', '#f08a24'][i], NS) + C(wx + 16, 134, 7.5, ['#f1c6a0', '#c68a5e', '#f1c6a0', '#e8b890', '#c68a5e', '#f1c6a0'][i], 'stroke-width="1.8"') + C(wx + 13.5, 133, 1.2, O, NS) + C(wx + 18.5, 133, 1.2, O, NS) + P(`M${wx + 13} ${137}q3 2.4 6 0`, 'none', 'stroke-width="1.3"')).join('')
      + R(134, 178, 24, 26, '#bfe3f5', 3) + C(386, 188, 5, '#fff3b0', 'stroke-width="2"') + C(386, 136, 4, '#ff7a2a', 'stroke-width="1.6"') + R(121, 150, 9, 22, '#c8372d', 2) + P('M128 196h258', 'none', 'stroke="#6b6b78" stroke-width="7"')
      + C(172, 218, 25, '#33364a') + C(172, 218, 11, '#b9c3cc') + C(172, 218, 4, '#6b6b78', NS) + C(342, 218, 25, '#33364a') + C(342, 218, 11, '#b9c3cc') + C(342, 218, 4, '#6b6b78', NS) + P('M126 180Q122 160 128 150', 'none', 'stroke-width="3"'))
    + P('M122 214q-20 6 -34 -2', 'none', 'stroke="#fff" stroke-width="6" opacity=".5"') + E(100, 218, 14, 8, '#fff', `${NS} opacity=".7"`) + E(82, 212, 9, 6, '#fff', `${NS} opacity=".6"`)
    + lea(82, 288, 1.5, { ar: 'u', mood: 'laugh' }) + noe(168, 292, 1.35, { al: 'w', mood: 'happy' }) + leaf(250, 58, 1.1, '#d9472f', 20) + leaf(100, 78, 0.8, '#e8864a', -30)), text: "En mars, la classe de Léa part à la cabane à sucre. Léa porte sa tuque jaune et ses mitaines rouges. Elle est si contente!" },
  // 2 — maple trees and buckets
  { svg: svg(winter({ sun: false, seed: 2 }) + pine(36, 178, 0.7) + maple(76, 206, 0.62, { buck: true }) + maple(356, 208, 0.7, { buck: true })
    + maple(256, 266, 1.7, { buck: true, drip: false, open: true }) + G(P('M300 218q-2 5 0 8q2 -3 0 -8', '#8fd0f6', 'stroke="#5aa8d8" stroke-width="1.3"') + E(302, 234, 3, 1, 'none', 'stroke="#fff" stroke-width="1" opacity=".8"'), '')
    + G(P('M311 244q8 -3 16 0M315 249q4 -2 8 0', 'none', 'stroke="#5aa8d8" stroke-width="2"'), '')
    + lea(116, 292, 1.55, { mood: 'surprised', ar: [38, -56], al: 'd' }) + noe(188, 294, 1.4, { mood: 'happy', al: 'd', ar: 'd' }) + sparkles(8, 4, 220)), text: "Dans la forêt, un seau est accroché à chaque érable. Plic! Plic! L'eau d'érable coule goutte à goutte dans le seau." },
  // 3 — tasting the maple water
  { svg: svg(winter({ sun: false, seed: 3 }) + pine(30, 182, 0.7) + maple(354, 262, 1.5, { buck: true, drip: true })
    + gaston(108, 296, 1.7, { ar: [40, -56], al: 'd', mood: 'happy', holdR: G(thick('M0 4L10 -44', '#7a7a88', 3.6, '#4a4a58') + P('M-6 -46Q-8 -60 10 -62Q28 -60 26 -46Q18 -38 10 -40Q0 -40 -6 -46Z', 'url(#metal)', 'stroke-width="2.4"') + E(10, -52, 14, 4.2, '#e8a317', 'stroke-width="1.6"') + P('M2 -54q6 -3 12 -1', 'none', 'stroke="#fff" stroke-width="1.6" opacity=".8"') + P('M24 -44q3 5 0 9q-3 -4 0 -9', '#f2c14a', 'stroke="#c8861c" stroke-width="1"'), 'scale(1.25)', 2.2) })
    + lea(262, 294, 1.5, { flip: true, ar: [34, -56], mood: 'surprised', holdR: G(P('M-8 -14h16l-2 16h-12z', 'url(#metal)', 'stroke-width="2"') + E(0, -14, 8, 2.6, '#e8a317', 'stroke-width="1.5"') + P('M8 -9q7 0 6 5q-1 4 -7 3', 'none', 'stroke-width="2"'), 'translate(0 -4)') })
    + sparkles(6, 3, 230)), text: "Monsieur Gaston goûte l'eau d'érable avec Léa. — Elle ressemble à de l'eau! dit Léa. — Oui, mais elle est un peu sucrée, répond-il." },
  // 4 — inside the shack: steam and boiling
  { svg: svg(R(0, 0, 400, 205, '#c98b50') + R(0, 0, 400, 205, 'url(#shv)', 0, NS) + R(0, 205, 400, 95, '#7a4a2c') + [0, 40, 80, 120, 160].map((q) => P(`M0 ${q + 20}h400`, 'none', 'stroke="#8a5428" stroke-width="2" opacity=".55"')).join('') + [30, 90, 170, 250, 330, 380].map((q, i) => P(`M${q} ${(i * 37) % 160 + 10}q8 4 14 0`, 'none', 'stroke="#8a5428" stroke-width="1.5" opacity=".5"')).join('')
    + P('M0 205h400', 'none', 'stroke="#5a3a24" stroke-width="3"') + [20, 80, 140, 200, 260, 320, 380].map((q) => P(`M${q} 208v92`, 'none', 'stroke="#5a3a24" stroke-width="1.5" opacity=".5"')).join('')
    + G(R(150, 0, 120, 42, '#4a3426') + P('M158 42L168 0M210 42V0M262 42L252 0', 'none', 'stroke="#2a1c14" stroke-width="2" opacity=".6"') + R(142, 38, 136, 8, '#6b4a34', 2), '')
    + G(R(10, 36, 56, 64, '#bfe3f5', 3) + P('M38 36V100M10 68H66', 'none', 'stroke-width="3"') + flakes(5, 2.6).replace(/opacity="\.9"/g, 'opacity="1"'), '')
    + '<g opacity=".8">' + E(250, 150, 36, 24, '#fff', NS) + E(300, 118, 44, 28, '#f6fafd', NS) + E(240, 90, 44, 26, '#fff', NS) + E(340, 144, 30, 20, '#f6fafd', NS) + E(210, 120, 28, 18, '#f6fafd', NS) + E(190, 160, 24, 16, '#fff', NS) + E(330, 80, 24, 14, '#fff', NS) + '</g>'
    + gaston(300, 216, 1.35, { ar: 'd', al: [-40, -42], mood: 'happy', holdL: G(thick('M0 0L-30 44', '#8a6a46', 4) + R(-48, 40, 30, 14, '#8a8a96', 3, 'transform="rotate(-40 -40 46)"'), '', 2.2) })
    + '<g transform="translate(44 0)">' + G(RS(106, 164, 250, 76, '#7a7a88', 8) + R(116, 170, 230, 36, '#d9941a', 4) + R(116, 170, 230, 36, 'url(#shv)', 4, NS) + P('M120 186q12 -9 24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0t24 0', 'none', 'stroke="#f7c95a" stroke-width="3"') + [140, 190, 230, 280, 320].map((q, i) => C(q, 182 + (i % 2) * 8, 5 + (i % 3), '#f7d57a', 'stroke="#f7ecb8" stroke-width="1.5"')).join('') + R(116, 214, 230, 26, '#2f2f3a', 4) + P('M134 240Q150 204 166 240Q182 200 198 240Q214 204 230 240Q246 208 262 240Q278 202 294 240Z', '#ff9a2a', 'stroke-width="2"') + P('M148 240Q158 218 168 240Q178 212 192 240Z', '#ffd84a', NS), '', 2.6) + '</g>'
    + G(thick('M248 156L214 190', '#8a6a46', 4.5) + P('M200 184L228 176L222 198L196 198Z', '#9a9aa6', 'stroke-width="2.4"'), '') + '<g opacity=".55">' + E(280, 168, 30, 14, '#fff', NS) + E(340, 160, 26, 12, '#fff', NS) + E(220, 172, 20, 10, '#fff', NS) + '</g>' + C(250, 230, 100, 'url(#glow)', `${NS} opacity=".3"`)
    + lea(52, 298, 1.65, { mood: 'surprised', ar: 'd', al: 'd' }) + noe(128, 300, 1.5, { mood: 'happy' }) + R(0, 0, 400, 300, 'url(#vig)', 0, NS)), text: "Dans la cabane, l'eau d'érable bout dans un grand bassin. Il y a de la vapeur partout! Il faut beaucoup d'eau d'érable pour faire un peu de sirop." },
  // 5 — tire sur la neige
  { svg: svg(winter({ sun: false, seed: 5 }) + maple(34, 198, 0.55) + maple(374, 196, 0.55)
    + gaston(96, 244, 1.55, { ar: [42, -52], al: 'd', mood: 'happy' })
    + lea(252, 248, 1.5, { ar: 'd', al: [40, -50], mood: 'surprised', holdL: G(thick('M0 6L2 -40', '#a8672f', 3) + C(2, -46, 9.5, taffy, 'stroke-width="2.4"') + C(-1, -49, 2.8, '#fff', `${NS} opacity=".6"`) + P('M3 -37Q10 -28 4 -16', 'none', `stroke="${taffy}" stroke-width="4"`), '', 2.2) })
    + noe(346, 252, 1.4, { mood: 'laugh', ar: 'd', al: 'd' })
    + G(RS(66, 148, 28, 2, '#8a5a3c', 1, NS), '')
    // kettle pouring
    + G(PS('M-16 -6L16 -6L13 -34L-13 -34Z', '#6b6b78') + R(-15, -38, 30, 6, '#8a8a96', 3) + P('M-14 -30Q-6 -26 -2 -30', 'none', 'stroke="#fff" stroke-width="2" opacity=".4"') + P('M13 -26Q26 -30 28 -14L24 -10', 'none', 'stroke-width="4"') + P('M-13 -26Q-26 -30 -28 -14', 'none', 'stroke-width="5"'), 'translate(156 164) rotate(26)', 2.2)
    + P('M170 176Q172 196 168 222', 'none', `stroke="${taffy}" stroke-width="5"`) + P('M170 176Q172 196 168 222', 'none', 'stroke="#fbd877" stroke-width="1.6" opacity=".8"')
    + G(PS('M12 226L388 226L396 268L4 268Z', '#a8672f') + R(2, 264, 396, 10, '#8a5428', 3) + P('M24 232Q70 216 120 230T214 228T300 224T376 230V240H24Z', '#fff', NS) + P('M40 244q30 -4 60 0M200 246q40 -4 70 0M300 242q30 -4 60 0', 'none', 'stroke="#dcebf7" stroke-width="3"') + [20, 368].map((q) => R(q, 272, 10, 28, '#7a4a36')).join(''), '')
    + G(P('M130 236Q144 222 158 236T186 234T214 230', 'none', `stroke="${taffy}" stroke-width="7"`) + P('M130 236Q144 222 158 236T186 234T214 230', 'none', 'stroke="#fbd877" stroke-width="2.4" opacity=".8"') + P('M262 240q14 -12 28 0t24 -2', 'none', `stroke="${taffy}" stroke-width="6"`), '', 1.2) + sparkles(8, 5, 270)), text: "C'est l'heure de la tire sur la neige! Monsieur Gaston verse du sirop chaud sur la neige. Léa l'enroule autour d'un bâton." },
  // 6 — sticky Noé
  { svg: svg(winter({ sun: false, seed: 6 }) + shack(330, 196, 0.62) + pine(34, 186, 0.7)
    + lea(112, 300, 1.85, { mood: 'laugh', ar: [40, -62], holdR: G(thick('M0 0L14 -42', '#a8672f', 3) + C(15, -48, 10.5, taffy, 'stroke-width="2.4"') + C(11, -51, 3, '#fff', `${NS} opacity=".6"`) + P('M13 -38Q4 -30 10 -20', 'none', `stroke="${taffy}" stroke-width="4"`), '', 2.2) })
    + noe(280, 302, 1.85, { mood: 'laugh', al: [-34, -62], ar: [26, -46], holdL: G(thick('M0 0L-8 -36', '#a8672f', 3) + C(-8, -42, 8, taffy, 'stroke-width="2.4"'), '', 2.2),
      extra: P('M-3 -52Q-6 -40 -2 -30', 'none', `stroke="${taffy}" stroke-width="4.5"`) + C(-2, -29, 3.4, taffy, 'stroke-width="1.6"') + C(-5, -62, 3.4, taffy, 'stroke-width="1.4"'),
      front: C(10, -30, 4, taffy, 'stroke-width="1.6"') + C(-9, -22, 3.2, taffy, 'stroke-width="1.4"') + P('M8 -34Q12 -26 10 -22', 'none', `stroke="${taffy}" stroke-width="2.4"`) })
    + dropS(0, 0, 0) + sparkles(10, 6, 215)), text: "Miam! La tire est molle et collante. Noé en a sur le menton et même sur son manteau!" },
  // 7 — sleigh ride
  { svg: svg(winter({ seed: 7 }) + pine(30, 178, 0.8) + pine(86, 172, 0.58) + pine(372, 166, 0.7)
    + P('M-2 262Q160 252 402 258', 'none', 'stroke="#bcd3e4" stroke-width="5" opacity=".8"') + P('M-2 274Q160 264 402 270', 'none', 'stroke="#bcd3e4" stroke-width="4" opacity=".7"')
    + sleigh(-4, 262, 1.1) + E(40, 266, 20, 6, '#fff', `${NS} opacity=".8"`) + P('M360 256l12 6M366 248l14 2', 'none', 'stroke="#fff" stroke-width="3" opacity=".8"')
    + star4(300, 60, 2, '#f4c430') + star4(318, 70, 1.4, '#f4c430')), text: "Ensuite, un grand cheval tire la traîne. Les enfants se couvrent avec une couverture. Ding, ding! Les clochettes sonnent." },
  // 8 — mitten falls
  { svg: svg(winter({ seed: 8 }) + pine(36, 176, 0.8) + pine(360, 160, 0.6)
    + P('M-2 262Q100 254 402 262', 'none', 'stroke="#bcd3e4" stroke-width="5" opacity=".8"') + P('M-2 276Q100 268 402 276', 'none', 'stroke="#bcd3e4" stroke-width="4" opacity=".7"')
    + `<g transform="translate(86 270) scale(1.55)">` + sleighBody() + lea(44, -34, 1.12, { bust: true, shadow: false, al: [38, -92], ar: 'd', mitt: null, mittR: '#e23b3b', mood: 'surprised' }) + noe(100, -34, 1.1, { bust: true, shadow: false, mood: 'happy' }) + kidB(150, -34, 1.1, { bust: true, shadow: false, ar: 'w' })
    + blanket() + sleighFront() + '</g>'
    + mitten(48, 276, 1.6, -50) + E(46, 281, 20, 5, '#fff', `${NS} opacity=".9"`) + P('M62 240l-8 18M72 248l-8 16M40 238l-4 16', 'none', 'stroke="#fff" stroke-width="2.6" opacity=".8"') + star4(22, 268, 3, '#fff') + star4(78, 282, 2.4, '#fff')
    + P('M60 206q-4 -10 6 -14', 'none', 'stroke="#e8a317" stroke-width="3"')), text: "Léa salue les arbres en levant la main. Oups! Sa mitaine tombe dans la neige. Personne ne la voit." },
  // 9 — sad Léa
  { svg: svg(winter({ sun: false, seed: 9 }) + shack(330, 192, 0.8) + pine(30, 186, 0.7)
    + lea(180, 296, 1.9, { mood: 'sad', ar: [14, -44], al: [-10, -56], mittR: null, mitt: '#e23b3b', holdR: C(0, 0, 0.1, 'none') })
    + rose(290, 298, 1.55, { mood: 'worried', al: [-34, -64] }) + noe(66, 298, 1.45, { mood: 'worried', ar: [34, -50] }) + P('M168 168q-6 4 -2 10M180 164q-4 6 0 12', 'none', 'stroke="#7cc4f0" stroke-width="2.4" opacity=".7"')), text: "Plus tard, Léa a froid à la main. Elle ne trouve plus sa mitaine et elle a de la peine. — On va la chercher, dit madame Rose." },
  // 10 — Biscuit arrives
  { svg: svg(winter({ sun: false, seed: 10 }) + pine(28, 184, 0.7) + pine(376, 190, 0.7)
    + P('M0 268Q120 256 240 262', 'none', 'stroke="#bcd3e4" stroke-width="4" opacity=".6"') + E(30, 286, 26, 8, '#fff', NS) + E(60, 292, 16, 6, '#fff', NS) + C(22, 262, 5, '#fff', NS) + C(40, 250, 4, '#fff', NS) + C(10, 276, 3.4, '#fff', NS)
    + dog(118, 284, 1.95, { mitt: true, run: true }) + P('M6 224h-6M10 244h-10M16 262h-12', 'none', 'stroke="#9fb8cc" stroke-width="3.4"')
    + lea(310, 296, 1.6, { flip: true, mood: 'surprised', al: [36, -88], mitt: null, mittR: '#e23b3b' }) + rose(374, 298, 1.35, { flip: true, mood: 'surprised', al: [-30, -56] })), text: "Tout à coup, un chien brun arrive en courant. C'est Biscuit, le chien de la cabane. Dans sa gueule, il y a une mitaine rouge!" },
  // 11 — joy: Léa hugs Biscuit
  { svg: svg(winter({ seed: 11 }) + shack(330, 192, 0.6) + pine(30, 182, 0.7)
    + rose(26, 280, 0.95, { mood: 'laugh', al: [-30, -78] }) + noe(74, 292, 1.1, { mood: 'laugh', al: 'w' })
    + lea(112, 298, 1.9, { mood: 'laugh', tilt: 9, ar: [44, -34], al: [-50, -40], mitt: '#e23b3b', mittR: '#e23b3b' })
    + dog(272, 298, 1.9, { flip: true, mood: 'happy' }) + G(thick('M140 232Q190 252 240 244', '#8a5cc7', 8.5) + hand(246, 242, -8, '#e23b3b', '#f1c6a0'), '')
    + mitten(78, 290, 1.4, 70, '#e23b3b', true) + dropS(88, 268, 0.9) + dropS(70, 280, 0.7) + sparkles(8, 11, 230)), text: "C'est la mitaine de Léa! Elle est mouillée et pleine de bave, mais Léa s'en fiche. Elle serre Biscuit dans ses bras et tout le monde rit." },
  // 12 — sleepy bus ride home
  { svg: svg(R(0, 0, 400, 300, '#e9d3a0') + R(0, 0, 400, 300, 'url(#shv)', 0, NS)
    + G(R(30, 24, 340, 168, 'url(#skyI)', 12) + C(290, 126, 60, 'url(#sun)', NS) + C(290, 126, 18, '#fff1c8', NS) + P('M30 130Q110 108 200 126T370 118V192H30Z', '#c9a6b8', NS) + farTrees(150, 2, '#5a4a6a') + P('M30 150Q120 134 210 148T370 142V192H30Z', '#f3e6ee', NS) + pine(80, 186, 0.8) + pine(150, 190, 1.0) + pine(328, 188, 0.85) + flakes(14, 1.6) + P('M200 24V192', 'none', 'stroke-width="5"') + R(30, 20, 340, 8, '#6b6b78', 3, NS), '', 4)
    + lea(144, 294, 1.95, { mood: 'sleepy', tilt: 9, ar: [24, -48], al: [-22, -46], mitt: null, bust: true, shadow: false, extra: C(11, -57, 3.4, taffy, NS), front: C(24, -41, 5, taffy, NS) + C(-18, -39, 4, taffy, NS) })
    + noe(246, 294, 1.95, { mood: 'sleepy', tilt: -7, al: [-24, -46], ar: [22, -44], mitt: null, bust: true, shadow: false, extra: C(8, -56, 3.8, taffy, NS), front: C(-22, -40, 5, taffy, NS) + C(18, -37, 4, taffy, NS) })
    + G(PS('M54 252Q54 236 78 236H322Q346 236 346 252V300H54Z', '#3f7a5c') + R(54, 240, 292, 10, '#4b8a6a', 5, NS) + P('M110 254V300M200 254V300M290 254V300', 'none', 'stroke="#2f5a46" stroke-width="2" opacity=".5"'), '', 2.8)
    + G(PS('M0 198Q0 186 14 186H34V300H0Z', '#4b8a6a') + R(0, 0, 400, 14, '#d7c48a', 0, NS), '', 2.8)
    + R(0, 0, 400, 300, 'url(#vig)', 0, NS)), text: "Dans l'autobus, il fait chaud. Léa et Noé ont les mains collantes et les yeux qui se ferment. Bientôt, ils s'endorment." },
  // 13 — home
  { svg: svg(R(0, 0, 400, 300, '#f6d6a8') + R(0, 0, 400, 205, '#f3c88e') + [30, 90, 150, 210, 270, 330, 390].map((q) => P(`M${q} 0V205`, 'none', 'stroke="#e8b070" stroke-width="10" opacity=".4"')).join('') + R(0, 205, 400, 95, '#a86f46') + [0, 25, 50, 75].map((q) => P(`M0 ${222 + q}H400`, 'none', 'stroke="#8a5a3c" stroke-width="1.6" opacity=".6"')).join('') + R(0, 200, 400, 12, '#6b4a3a', 0, NS)
    + G(R(262, 36, 112, 124, '#26325e', 6) + C(318, 78, 17, '#fff1a8', 'stroke-width="2"') + P('M262 96h112M318 36V160', 'none', 'stroke-width="4"') + star4(290, 60, 2, '#fff') + star4(346, 126, 1.6, '#fff') + R(250, 26, 136, 12, '#8a5a3c', 4) + P('M250 36Q272 96 254 160L240 160Q256 96 244 36Z', '#e8556a', 'stroke-width="2"') + P('M386 36Q364 96 382 160L396 160Q380 96 392 36Z', '#e8556a', 'stroke-width="2"'), '', 2.6)
    + G(PS('M30 236Q200 256 372 236L360 296Q200 304 42 296Z', '#c8372d') + P('M44 248Q200 266 360 248M50 262Q200 278 354 262', 'none', 'stroke="#f4c430" stroke-width="2.4" opacity=".7"'), '', 2.2)
    + G(R(18, 40, 76, 62, '#8a5a3c', 4) + R(26, 48, 60, 46, '#cfe9f8', 2) + P('M26 80Q50 66 70 82T86 78V94H26Z', '#fff', NS) + leaf(56, 66, 0.9, '#d9472f'), '', 2.6)
    + C(150, 130, 120, 'url(#glow)', `${NS} opacity=".25"`)
    + maman(100, 280, 1.75, { mood: 'happy', ar: [40, -42], al: [-30, -50] })
    + lea(262, 298, 1.7, { mood: 'yawn', hat: null, al: [50, -80], ar: [38, -78], mitt: null, mittR: null, holdL: G(syrupCan(), 'translate(0 10) scale(1.15)', 2.4), holdR: mitten(0, 8, 0.85, -6, '#e23b3b') })
    + leaf(196, 56, 1.2, '#d9472f', 20) + leaf(178, 90, 0.9, '#e8864a', -20) + R(0, 0, 400, 300, 'url(#vig)', 0, NS)), text: "À la maison, Léa montre sa mitaine et sa petite canne de sirop à maman. Elle sent l'érable de la tête aux pieds. — Quelle belle journée! dit-elle en bâillant." },
];

export const book = {
  id: 'cabane-a-sucre',
  title: 'Une journée à la cabane à sucre',
  emoji: '🍁',
  level: 2,
  minutes: 9,
  cover: svg(winter({ seed: 14 }) + pine(36, 186, 0.8) + shack(298, 196, 0.95) + maple(68, 268, 1.5, { buck: true, drip: true }) + lea(176, 292, 1.75, { mood: 'laugh', ar: [38, -88] }) + noe(252, 296, 1.6, { mood: 'happy', al: 'd' }) + leaf(344, 78, 1.8, '#d9472f', 15) + leaf(60, 70, 1.2, '#e8864a', -25) + leaf(220, 60, 1, '#d9472f', 40)),
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
