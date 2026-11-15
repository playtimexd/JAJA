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
  + '<linearGradient id="skyS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a9bb2"/><stop offset=".6" stop-color="#c3cfdc"/><stop offset="1" stop-color="#e6edf4"/></linearGradient><linearGradient id="skyN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1636"/><stop offset=".7" stop-color="#2b3a74"/><stop offset="1" stop-color="#4a5c9a"/></linearGradient><linearGradient id="nightSnow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9d6f0"/><stop offset="1" stop-color="#8fa2cc"/></linearGradient><radialGradient id="beam"><stop offset="0" stop-color="#fff3b0" stop-opacity=".85"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></radialGradient><radialGradient id="orange"><stop offset="0" stop-color="#ffb04a" stop-opacity=".95"/><stop offset="1" stop-color="#ff8a1a" stop-opacity="0"/></radialGradient><linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fc0f0"/><stop offset="1" stop-color="#fbe8c0"/></linearGradient><linearGradient id="skyDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3d2f6e"/><stop offset=".55" stop-color="#c85a7a"/><stop offset="1" stop-color="#ffb070"/></linearGradient><linearGradient id="skyNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1030"/><stop offset=".6" stop-color="#1e2a66"/><stop offset="1" stop-color="#4a4a8a"/></linearGradient><linearGradient id="skyDark" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1a4a"/><stop offset=".55" stop-color="#6a3a6a"/><stop offset="1" stop-color="#f09068"/></linearGradient><pattern id="gingham" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fff"/><rect width="8" height="16" fill="#e8556a" opacity=".5"/><rect width="16" height="8" fill="#e8556a" opacity=".5"/></pattern><radialGradient id="glowG"><stop offset="0" stop-color="#9affc0" stop-opacity=".9"/><stop offset="1" stop-color="#9affc0" stop-opacity="0"/></radialGradient><radialGradient id="orange"><stop offset="0" stop-color="#ffb04a" stop-opacity=".95"/><stop offset="1" stop-color="#ff8a1a" stop-opacity="0"/></radialGradient></defs>';
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
    shout: eye(-7.5, ey, iris) + eye(7.5, ey, iris) + P('M-12.5 -82L-4 -79M12.5 -82L4 -79', 'none', b) + P('M-8.5 -64.5Q0 -63 8.5 -64.5Q8 -52 0 -52Q-8 -52 -8.5 -64.5Z', '#a8323a', 'stroke-width="2.2"') + teeth + E(0, -55.5, 4.5, 2.4, '#ef8a8a', NS),
    shy: eye(-7.5, ey + 0.5, iris, { dy: 2.2, dx: -0.6 }) + eye(7.5, ey + 0.5, iris, { dy: 2.2, dx: -0.6 }) + P('M-12.5 -78.5L-4 -81M12.5 -78.5L4 -81', 'none', b) + P('M-4 -60.5Q0 -62.5 4 -60.5', 'none', 'stroke-width="2.2"'),
    worried: eye(-7.5, ey + 0.5, iris, { dx: 0.6 }) + eye(7.5, ey + 0.5, iris, { dx: 0.6 }) + P('M-12.5 -78.5L-4 -83.5M12.5 -78.5L4 -83.5', 'none', b) + P('M-6.5 -61.5Q-3.3 -64.5 0 -61.5Q3.3 -58.5 6.5 -61.5', 'none', 'stroke-width="2.2"'),
  };
  return `<g transform="translate(0 2.5)">` + cheeks + nose + (M[m] || M.happy) + '</g>';
};
const liteFace = (m) => { const e = C(-7, -71, 2.7, O, NS) + C(7, -71, 2.7, O, NS) + C(-6.2, -72, 0.9, '#fff', NS) + C(7.8, -72, 0.9, '#fff', NS); const mo = { happy: P('M-5 -62Q0 -57 5 -62', 'none', 'stroke-width="2"'), laugh: P('M-6 -63Q0 -62 6 -63Q5 -55 0 -55Q-5 -55 -6 -63Z', '#a8323a', 'stroke-width="1.8"'), sad: P('M-4 -59Q0 -63 4 -59', 'none', 'stroke-width="2"') + P('M-11 -76L-4 -79M11 -76L4 -79', 'none', 'stroke-width="2"'), surprised: E(0, -60, 3, 4, '#a8323a', 'stroke-width="1.8"') + P('M-11 -79q4 -4 8 0M3 -79q4 -4 8 0', 'none', 'stroke-width="2"'), shy: P('M-4 -60Q0 -62 4 -60', 'none', 'stroke-width="2"') + P('M-11 -76L-4 -79M11 -76L4 -79', 'none', 'stroke-width="2"'), shout: P('M-5 -62Q0 -61 5 -62Q4 -54 0 -54Q-4 -54 -5 -62Z', '#a8323a', 'stroke-width="1.8"') + P('M-11 -79L-4 -76M11 -79L4 -76', 'none', 'stroke-width="2"') }; return e + (mo[m] || mo.happy); };
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
  const { skin = '#f1c6a0', skinD = '#d99d78', hair = '#5a3a28', style = 'short', coat = '#d9473f', pants = '#3a4a7a', hat = null, band = '#fff', mitt = null, mittR, mood = 'happy', al = 'd', ar = 'd', scarf = null, flip = false, back = '', extra = '', holdL = '', holdR = '', hold = '', boots = '#4a3a4a', tilt = 0, nc = false, iris = '#5a3a22', beard = false, brow, bust = false, front = '', plaid = false, shadow = true, lite = false } = o;
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
    + hairFront + hatSvg + (lite ? liteFace(mood) : face(mood, { iris, brow: bc, nc, skinD }))
    + (beard ? P('M-10 -65.5Q-5 -69.5 0 -66Q5 -69.5 10 -65.5Q5 -63.5 0 -65Q-5 -63.5 -10 -65.5Z', '#f4f4f8', 'stroke-width="1.8"') : '')
    + extra + front
    + (holdL ? `<g transform="translate(${-hl[0]} ${hl[1]})">${holdL}</g>` : '') + (holdR ? `<g transform="translate(${hr[0]} ${hr[1]})">${holdR}</g>` : '') + hold + '</g>';
};
const mitten = (x, y, s = 1, rot = 0, col = '#e23b3b', wet = false) => G(P('M-9.5 2Q-13 -22 0 -25Q13 -22 9.5 2Z', col) + P('M-9.5 2Q-13 -22 0 -25Q13 -22 9.5 2Z', 'url(#sh)', NS) + E(-12, -12, 4.4, 6.4, col, 'transform="rotate(12 -12 -12)"') + R(-10.5, 0, 21, 9, '#fff', 3) + P('M-8 3v4M-3 3v4M2 3v4M7 3v4', 'none', 'stroke-width="1" opacity=".25"') + P('M-4 -18Q0 -22 4 -18', 'none', 'stroke="#fff" stroke-width="2" opacity=".4"') + (wet ? P('M-5 -8q-2 4 0 6q2 -2 0 -6M4 -14q-2 4 0 6q2 -2 0 -6', '#8fd0f6', 'stroke="none"') : ''), `translate(${x} ${y}) rotate(${rot}) scale(${s})`, 2.2);

// ---------- characters of this book ----------
const GLASSES = C(-7.5, -70.5, 6.9, 'rgba(255,255,255,.22)', 'stroke-width="1.9"') + C(7.5, -70.5, 6.9, 'rgba(255,255,255,.22)', 'stroke-width="1.9"') + P('M-0.7 -71h1.4M-14.4 -71L-20 -73M14.4 -71L20 -73', 'none', 'stroke-width="1.8"') + P('M-11 -74q3 -2 6 -1', 'none', 'stroke="#fff" stroke-width="1.4" opacity=".7"');
const camille = (x, y, s, o = {}) => kid(x, y, s, { skin: '#9a6040', skinD: '#7a4a30', hair: '#1e1612', style: 'short', coat: '#f4c430', pants: '#3b7fd1', boots: '#e8556a', iris: '#2a1a12', back: C(-17, -88, 11, '#1e1612', 'stroke-width="2.4"') + C(17, -88, 11, '#1e1612', 'stroke-width="2.4"') + C(-17, -88, 4, '#e8556a', 'stroke-width="1.6"') + C(17, -88, 4, '#e8556a', 'stroke-width="1.6"'), ...o });
const lacasse = (x, y, s, o = {}) => kid(x, y, s * 1.12, { skin: '#f1c6a0', skinD: '#d99d78', hair: '#c0392b', coat: '#e8785a', pants: '#7a5a6a', boots: '#6b4a3a', iris: '#3a6a4a', back: C(0, -98, 10, '#c0392b', 'stroke-width="2.4"') + P('M-5 -100q5 -4 10 0', 'none', 'stroke="#e8705a" stroke-width="1.5"'), ...o, extra: GLASSES + (o.extra || '') });
const MOUSTACHE = P('M-11 -62Q-6 -68 0 -63Q6 -68 11 -62Q6 -59 0 -60Q-6 -59 -11 -62Z', '#8a8a92', 'stroke-width="1.5"');
const dimitri = (x, y, s, o = {}) => kid(x, y, s * 1.2, { skin: '#e0b08a', skinD: '#c08a62', hair: '#9a9aa2', style: 'short', coat: '#4a7ac0', pants: '#6b4a3a', boots: '#3a3a44', iris: '#4a3a2a', brow: '#8a8a92', plaid: false, ...o, front: P('M-8 -57v40M8 -57v40', 'none', 'stroke="#c8372d" stroke-width="3"') + (o.front || ''), extra: MOUSTACHE + (o.extra || '') });
const NEIGH = [
  { skin: '#f1c6a0', hair: '#3a2a20', coat: '#4a8fe0', pants: '#4a4a5a', boots: '#4a3a4a' }, { skin: '#c68a5e', hair: '#1e1612', coat: '#e8556a', pants: '#3a3f55', boots: '#3a3a44' },
  { skin: '#e8b890', hair: '#c9772b', coat: '#3fa34d', pants: '#5a4a3a', boots: '#4a3a2a' }, { skin: '#8a5a3a', hair: '#1a1410', coat: '#8a5cc7', pants: '#3a4a7a', boots: '#2a2a3a' },
  { skin: '#f1c6a0', hair: '#7a7a82', coat: '#e8a33a', pants: '#4a4a5a', boots: '#5a3a2a' }, { skin: '#d9a070', hair: '#2a1e18', coat: '#2fa39a', pants: '#4a3a5a', boots: '#3a3a44' },
];
const neighbor = (x, y, s, i, o = {}) => kid(x, y, s, { ...NEIGH[i % NEIGH.length], lite: true, shadow: false, mood: 'happy', ...o });
const crouched = (x, y, s, o = {}) => {
  const { flip = false, pants = '#3b7fd1', boots = '#e8556a' } = o;
  return E(x, y + 1, 30 * s, 6 * s, '#10183a', `${NS} opacity=".25"`) + camille(x, y - 22 * s, s, { ...o, bust: true, shadow: false })
    + `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" stroke="${O}" stroke-width="2.6">` + RS(-26, -30, 24, 22, pants, 10) + RS(2, -30, 24, 22, pants, 10) + RS(-34, -12, 24, 12, boots, 6) + RS(10, -12, 24, 12, boots, 6) + P('M-30 -4h18M14 -4h18', 'none', 'stroke="#fff" stroke-width="1.6" opacity=".4"') + '</g>';
};
const spk = (x, y, r = 10, c = '#ffb020') => P(`M${x} ${y - r}L${x + r * 0.28} ${y - r * 0.28}L${x + r} ${y}L${x + r * 0.28} ${y + r * 0.28}L${x} ${y + r}L${x - r * 0.28} ${y + r * 0.28}L${x - r} ${y}L${x - r * 0.28} ${y - r * 0.28}Z`, c, 'stroke="#e8731a" stroke-width="1.6"');
const sparks = (x, y, s = 1) => spk(x, y, 13 * s) + spk(x + 24 * s, y - 14 * s, 8 * s, '#ffe066') + spk(x + 34 * s, y + 8 * s, 6 * s) + spk(x - 22 * s, y - 20 * s, 7 * s, '#ffe066') + spk(x + 8 * s, y - 34 * s, 5 * s) + C(x + 40 * s, y - 30 * s, 2.4 * s, '#ffe066', NS) + C(x - 34 * s, y + 2 * s, 2 * s, '#ffb020', NS);

const dEye = (ex, o = {}) => { const { r = 7.4, py = 0, px = 0 } = o; return C(ex, -78, r, '#fff', 'stroke-width="2"') + C(ex + px, -77 + py, r * 0.64, '#2a6a62', NS) + C(ex + px, -77 + py, r * 0.36, '#0d2a2a', NS) + C(ex + px + 1.9, -79 + py, r * 0.22, '#fff', NS) + C(ex + px - 1.6, -74.6 + py, r * 0.1, '#fff', NS); };
const dragon = (x, y, s = 1, o = {}) => {
  const { mood = 'happy', pose = 'stand', flip = false, body = '#4fc27b', dark = '#35a064', light = '#8ee3a8', belly = '#f6d083', wing = '#b6efc8', arms = 'd', headTilt = 0, shadow = true, tilt = 0, horn = '#f6e6b8' } = o;
  const fly = pose === 'fly', curl = pose === 'curl';
  const wingR = fly
    ? P('M14 -56Q50 -128 118 -98Q106 -88 112 -72Q94 -76 90 -58Q76 -62 68 -44Q40 -44 18 -34Z', wing) + P('M14 -56Q60 -94 118 -98M14 -56Q70 -74 112 -72M14 -56Q66 -58 90 -58M14 -56Q50 -48 68 -44', 'none', `stroke="${dark}" stroke-width="2.2"`) + P('M14 -56Q50 -128 118 -98Q106 -88 112 -72Q94 -76 90 -58Q76 -62 68 -44Q40 -44 18 -34Z', 'url(#sh)', NS)
    : P('M14 -58Q44 -90 56 -54Q44 -58 40 -46Q32 -50 20 -38Z', wing) + P('M14 -58Q40 -70 56 -54M14 -58Q34 -58 40 -46', 'none', `stroke="${dark}" stroke-width="2"`) + P('M14 -58Q44 -90 56 -54Q44 -58 40 -46Q32 -50 20 -38Z', 'url(#sh)', NS);
  const tail = thick(curl ? 'M16 -10Q58 -8 52 -36Q48 -52 34 -46' : 'M16 -12Q60 -4 56 -38Q54 -54 40 -48', body, 10) + P(curl ? 'M34 -47L26 -60L42 -58Z' : 'M40 -49L33 -62L49 -59Z', belly, 'stroke-width="2.2"')
    + P(curl ? 'M30 -12l2 -7 4 6M44 -16l4 -6 2 7M52 -30l6 -4 -1 7' : 'M32 -10l2 -7 4 6M48 -12l5 -6 1 8M56 -28l7 -3 -2 8', dark, 'stroke-width="1.6"');
  const head = `<g transform="rotate(${headTilt} 0 -58) translate(0 ${curl ? 7 : 0})">`
    + [-1, 1].map((q) => P(`M${q * 21} -82Q${q * 42} -96 ${q * 42} -70Q${q * 36} -72 ${q * 27} -62Z`, wing) + P(`M${q * 24} -80Q${q * 36} -82 ${q * 38} -72`, 'none', `stroke="${dark}" stroke-width="1.6"`)).join('')
    + [-1, 1].map((q) => P(`M${q * 11} -95L${q * 20} -113L${q * 19} -92Z`, horn, 'stroke-width="2.2"') + P(`M${q * 13} -97L${q * 18} -108`, 'none', 'stroke="#fff" stroke-width="1.6" opacity=".6"')).join('')
    + CS(0, -74, 24.5, body) + P('M-5 -97L0 -108L5 -97Z', dark, 'stroke-width="1.8"') + P('M-3 -91h6', 'none', `stroke="${light}" stroke-width="2.4" opacity=".7"`)
    + ES(0, -65, 16, 11.5, light, 'stroke-width="2"') + C(-5, -67, 1.7, dark, NS) + C(5, -67, 1.7, dark, NS)
    + E(-16, -64, 5, 3.4, '#ee7f82', `${NS} opacity=".5"`) + E(16, -64, 5, 3.4, '#ee7f82', `${NS} opacity=".5"`)
    + ({
      happy: dEye(-10) + dEye(10) + P('M-14 -87Q-10 -90 -6 -88M6 -88Q10 -90 14 -87', 'none', `stroke="${dark}" stroke-width="2.4"`) + P('M-6 -60Q0 -54 6 -60', 'none', 'stroke-width="2.2"'),
      sad: dEye(-10, { py: 2 }) + dEye(10, { py: 2 }) + P('M-16 -85L-5 -90M16 -85L5 -90', 'none', `stroke="${dark}" stroke-width="2.6"`) + P('M-5 -57Q0 -62 5 -57', 'none', 'stroke-width="2.2"') + P('M17 -70q-4 7 0 11q4 -4 0 -11', '#9ad8f8', 'stroke="#5aa8d8" stroke-width="1.2"') + P('M-17 -70q-4 7 0 11q4 -4 0 -11', '#9ad8f8', 'stroke="#5aa8d8" stroke-width="1.2"'),
      cry: dEye(-10, { py: 2.4 }) + dEye(10, { py: 2.4 }) + P('M-16 -85L-5 -90M16 -85L5 -90', 'none', `stroke="${dark}" stroke-width="2.6"`) + P('M-5 -57Q0 -62 5 -57', 'none', 'stroke-width="2.2"') + P('M-17 -72Q-20 -60 -16 -52M17 -72Q20 -60 16 -52', 'none', 'stroke="#9ad8f8" stroke-width="3.6"') + P('M-16 -50q-4 6 0 9q4 -3 0 -9M16 -50q-4 6 0 9q4 -3 0 -9', '#9ad8f8', 'stroke="#5aa8d8" stroke-width="1.2"'),
      sleepy: P('M-16 -78Q-10 -72 -4 -78M4 -78Q10 -72 16 -78', 'none', 'stroke-width="2.6"') + P('M-4 -59Q0 -56 4 -59', 'none', 'stroke-width="2.2"'),
      surprised: dEye(-10, { r: 8.2 }) + dEye(10, { r: 8.2 }) + P('M-17 -90q6 -5 11 -1M6 -91q6 -4 11 1', 'none', `stroke="${dark}" stroke-width="2.4"`) + E(0, -57, 3.6, 4.6, '#a8323a', 'stroke-width="2"'),
      laugh: P('M-16 -76Q-10 -83 -4 -76M4 -76Q10 -83 16 -76', 'none', 'stroke-width="2.8"') + P('M-8 -62Q0 -60 8 -62Q7 -50 0 -50Q-7 -50 -8 -62Z', '#a8323a', 'stroke-width="2.2"') + E(0, -53, 4.4, 2.4, '#ef8a8a', NS),
      squint: P('M-16 -81L-6 -77L-16 -73M16 -81L6 -77L16 -73', 'none', 'stroke-width="2.8"') + P('M-8 -70q-3 3 -6 0M8 -70q3 3 6 0', 'none', 'stroke-width="1.6"') + E(0, -57, 4.4, 5.2, '#a8323a', 'stroke-width="2"') + P('M-6 -92q6 -4 12 0', 'none', `stroke="${dark}" stroke-width="2.2"`),
      sneeze: P('M-17 -80L-6 -76L-17 -72M17 -80L6 -76L17 -72', 'none', 'stroke-width="3"') + E(0, -56, 7.4, 8.4, '#a8323a', 'stroke-width="2.4"') + E(0, -52, 4.6, 3.4, '#ef8a8a', NS) + P('M-9 -92q9 -5 18 0', 'none', `stroke="${dark}" stroke-width="2.4"`),
      shy: dEye(-10, { py: 2.4, px: -1.4 }) + dEye(10, { py: 2.4, px: -1.4 }) + P('M-15 -86L-5 -88M15 -86L5 -88', 'none', `stroke="${dark}" stroke-width="2.4"`) + P('M-4 -59Q0 -61.5 4 -59', 'none', 'stroke-width="2.2"'),
    })[mood] + '</g>';
  const armSvg = (q) => { const T = { d: [28, -22], u: [36, -64], h: [18, -34], o: [42, -42], c: [14, -40] }[arms]; return P(`M${q * 20} -44L${q * T[0]} ${T[1]}`, 'none', `stroke="${O}" stroke-width="11"`) + P(`M${q * 20} -44L${q * T[0]} ${T[1]}`, 'none', `stroke="${body}" stroke-width="7"`) + CS(q * T[0], T[1], 5.6, body, 'stroke-width="2.2"') + [-1, 0, 1].map((k) => C(q * T[0] + k * 3.4, T[1] - 5.4, 1.5, horn, 'stroke="none"')).join(''); };
  const foldedWings = curl
    ? [-1, 1].map((q) => P(`M${q * 24} -56Q${q * 44} -22 ${q * 8} -4Q${q * -4} -14 ${q * 0} -40Z`, wing) + P(`M${q * 24} -56Q${q * 44} -22 ${q * 8} -4Q${q * -4} -14 ${q * 0} -40Z`, 'url(#sh)', NS) + P(`M${q * 22} -52Q${q * 28} -30 ${q * 8} -10M${q * 18} -50Q${q * 14} -30 ${q * 4} -18`, 'none', `stroke="${dark}" stroke-width="1.8"`)).join('') : '';
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s}) rotate(${tilt})" stroke="${O}" stroke-width="2.6">`
    + (shadow && !fly ? E(0, 1, 34, 6.5, '#10183a', `${NS} opacity=".25"`) : '')
    + tail + `<g transform="scale(-1 1)">${wingR}</g>` + wingR
    + (fly ? '' : ES(-12, -4, 11.5, 6, dark) + ES(12, -4, 11.5, 6, dark) + P('M-18 -3v3M-12 -2v3M-6 -3v3M6 -3v3M12 -2v3M18 -3v3', 'none', `stroke="${horn}" stroke-width="2.4"`))
    + ES(0, -32, curl ? 28 : 25, curl ? 26 : 30, body) + E(0, -29, curl ? 18 : 16, curl ? 18 : 23, belly, 'stroke="none"') + P(curl ? 'M-14 -34h28M-15 -26h30M-13 -18h26' : 'M-12 -38h24M-13 -30h26M-12 -22h24M-10 -14h20', 'none', 'stroke="#c8963a" stroke-width="1.8" opacity=".7"')
    + (curl ? '' : armSvg(-1) + armSvg(1)) + foldedWings + head + '</g>';
};
const dragonMama = (x, y, s, o = {}) => dragon(x, y, s, { body: '#3ea88f', dark: '#2a8070', light: '#86d8c4', belly: '#f2d28c', wing: '#a8e6d6', ...o });
const dragonPapa = (x, y, s, o = {}) => dragon(x, y, s, { body: '#3c9a66', dark: '#2a7a4a', light: '#7ccf98', belly: '#e8c070', wing: '#98dcb0', horn: '#f0d89a', ...o });
const dragonOld = (x, y, s, o = {}) => dragon(x, y, s, { body: '#5aa6d0', dark: '#3a82aa', light: '#9ad0ee', belly: '#f4dca0', wing: '#b8e2f6', ...o });

// ---------- props ----------
const lantern = (x, y, s = 1, i = 0, on = true) => {
  const C0 = [['#ff5a3c', '#b8362a'], ['#ff9a2a', '#b8701a'], ['#ffd24a', '#b8962a']][i % 3];
  return `<g transform="translate(${x} ${y}) scale(${s})">` + (on ? C(0, 6, 36, 'url(#glow)', `${NS} opacity=".9"`) : '')
    + G(P('M0 -16V-10', 'none', 'stroke-width="1.6"') + R(-5, -12, 10, 4, '#6b4a34', 1.5, 'stroke-width="1.6"') + E(0, 4, 12.5, 14, on ? C0[0] : C0[1] + '99', 'stroke-width="1.8"') + (on ? E(0, 4, 8, 10, '#fff2b0', `${NS} opacity=".55"`) : '') + P('M0 -10V18M-7 -8Q-12 4 -7 16M7 -8Q12 4 7 16', 'none', `stroke="${on ? '#a8321a' : '#2a1a1a'}" stroke-width="1.2" opacity=".6"`) + R(-5, 16, 10, 4, '#6b4a34', 1.5, 'stroke-width="1.6"') + P('M0 20V27', 'none', 'stroke-width="1.4"') + C(0, 28, 2.2, '#f4c430', 'stroke-width="1.2"'), '', 1.8)
    + '</g>';
};
const qpt = (p0, c, p2, t) => [(1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * c[0] + t * t * p2[0], (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * c[1] + t * t * p2[1]];
const line = (p0, p2, sag, col = '#3a3f55') => P(`M${p0[0]} ${p0[1]}Q${(p0[0] + p2[0]) / 2} ${(p0[1] + p2[1]) / 2 + sag * 2} ${p2[0]} ${p2[1]}`, 'none', `stroke="${col}" stroke-width="1.8"`);
const lanternLine = (p0, p2, sag, n, lit, sc = 1, off = 0) => {
  const c = [(p0[0] + p2[0]) / 2, (p0[1] + p2[1]) / 2 + sag * 2]; let out = line(p0, p2, sag);
  for (let k = 0; k < n; k++) { const t = (k + 0.5) / n, [px, py] = qpt(p0, c, p2, t); out += lantern(px, py + 14 * sc, sc, k + off, typeof lit === 'function' ? lit(k, n) : lit); }
  return out;
};
const laundryLine = (p0, p2, sag, seed = 0) => {
  const c = [(p0[0] + p2[0]) / 2, (p0[1] + p2[1]) / 2 + sag * 2]; let out = line(p0, p2, sag);
  const cols = ['#e8556a', '#4a8fe0', '#f4c430', '#8a5cc7', '#fff', '#3fa34d'];
  for (let k = 0; k < 7; k++) { const t = (k + 0.6) / 7.4, [px, py] = qpt(p0, c, p2, t), col = cols[(k + seed) % 6], kind = (k + seed) % 3;
    out += kind === 0 ? G(P(`M${px - 7} ${py}h14l2 18h-18z`, col, 'stroke-width="1.4"') + P(`M${px - 7} ${py}l-6 8M${px + 7} ${py}l6 8`, 'none', `stroke="${col}" stroke-width="4"`), '', 1.4)
      : kind === 1 ? G(R(px - 8, py, 16, 22, col, 1, 'stroke-width="1.4"') + P(`M${px - 8} ${py + 6}h16`, 'none', 'stroke="#000" stroke-width="1" opacity=".15"'), '', 1.4)
        : G(P(`M${px - 5} ${py}h10v14q0 6 -5 6q-5 0 -5 -6z`, col, 'stroke-width="1.4"'), '', 1.4); }
  return out;
};
const bunting = (p0, p2, sag, n = 12) => { const c = [(p0[0] + p2[0]) / 2, (p0[1] + p2[1]) / 2 + sag * 2]; let out = line(p0, p2, sag); const cols = ['#e8556a', '#f4c430', '#3fa34d', '#4a8fe0', '#8a5cc7']; for (let k = 0; k < n; k++) { const [px, py] = qpt(p0, c, p2, (k + 0.5) / n); out += P(`M${px - 6} ${py}L${px + 6} ${py}L${px} ${py + 13}Z`, cols[k % 5], 'stroke="#3a3f55" stroke-width="1.2"'); } return out; };
const bulbs = (p0, p2, sag, n, on) => { const c = [(p0[0] + p2[0]) / 2, (p0[1] + p2[1]) / 2 + sag * 2]; let out = line(p0, p2, sag, '#2a2a38'); for (let k = 0; k < n; k++) { const [px, py] = qpt(p0, c, p2, (k + 0.5) / n); out += (on ? C(px, py + 5, 11, 'url(#glow)', `${NS} opacity=".8"`) : '') + C(px, py + 5, 3.4, on ? '#fff2a0' : '#7a7a8a', 'stroke="#3a3f55" stroke-width="1"'); } return out; };
const bacBleu = (x, y, s = 1, o = {}) => {
  const { open = false } = o;
  return G(E(2, 2, 36, 6, '#10183a', `${NS} opacity=".25"`) + C(-20, -6, 8, '#2a2d3e') + C(-20, -6, 3, '#9aa6b0', NS) + C(20, -6, 8, '#2a2d3e') + C(20, -6, 3, '#9aa6b0', NS)
    + PS('M-26 -62L26 -62L22 -8L-22 -8Z', '#2f7fd0') + P('M-22 -52H22M-20 -30H20', 'none', 'stroke="#1a5aa0" stroke-width="1.6" opacity=".5"')
    + PS(open ? 'M-29 -66L29 -66L30 -76L-30 -92Z' : 'M-30 -62L30 -62L28 -74Q0 -80 -28 -74Z', '#2468b0') + (open ? '' : R(-12, -78, 24, 5, '#1a4a88', 2, NS))
    + P('M-8 -48l8 -14l8 14z', 'none', 'stroke="#fff" stroke-width="3.4"') + P('M-6 -46l-3 -6M6 -46l3 -6M0 -62l-6 2', 'none', 'stroke="#fff" stroke-width="2"') + P('M-20 -58l2 40', 'none', 'stroke="#fff" stroke-width="2" opacity=".3"'), `translate(${x} ${y}) scale(${s})`, 2.4);
};
const poubelle = (x, y, s = 1, col = '#8a94a0') => G(E(2, 2, 26, 5, '#10183a', `${NS} opacity=".25"`) + PS('M-20 -50L20 -50L17 0L-17 0Z', col) + P('M-12 -46v42M-4 -46v44M4 -46v44M12 -46v42', 'none', 'stroke="#000" stroke-width="1.4" opacity=".2"') + PS('M-23 -50Q-23 -62 0 -62Q23 -62 23 -50Z', '#6b7480') + R(-5, -68, 10, 6, '#4a5260', 3), `translate(${x} ${y}) scale(${s})`, 2.4);
const sparkGlow = (x, y, r = 20) => C(x, y, r * 1.6, 'url(#orange)', `${NS} opacity=".8"`) + spk(x, y, r * 0.5) + spk(x + r * 0.7, y - r * 0.5, r * 0.25, '#ffe066');
const tarte = (x, y, s = 1) => G(ES(0, -4, 28, 9, '#f4f0e8', 'stroke-width="2"') + PS('M-24 -6Q-24 -22 0 -22Q24 -22 24 -6Q0 2 -24 -6Z', '#e8b866') + E(0, -14, 20, 6, '#b8742e', 'stroke-width="1.6"') + P('M-20 -16q4 -4 8 0t8 0t8 0t8 0t8 0', 'none', 'stroke="#e8b866" stroke-width="2.4"') + P('M-4 -14L12 -4L24 -10Z', '#f4f0e8', 'stroke="none"') + P('M-4 -14L12 -4', 'none', 'stroke="#c8963a" stroke-width="1.6"') + P('M-10 -12q4 3 8 1M6 -10q4 2 8 0', 'none', 'stroke="#d9a050" stroke-width="1.6"'), `translate(${x} ${y}) scale(${s})`, 2.2);
const tarteSlice = (x, y, s = 1) => G(ES(0, 2, 24, 6, '#f4f0e8', 'stroke-width="2"') + PS('M-18 0L16 -6L16 -18L-18 -10Z', '#e8b866') + P('M-18 -10L16 -18L16 -14L-18 -5Z', '#b8742e', 'stroke-width="1.6"') + P('M-6 -12q4 -3 8 0', 'none', 'stroke="#d9a050" stroke-width="1.4"'), `translate(${x} ${y}) scale(${s})`, 2.2);
const feather = (x, y, s = 1, rot = 0) => G(P('M0 0Q-16 -30 -6 -74Q8 -64 14 -30Q12 -10 0 0Z', '#e8e8f0') + P('M0 0Q-16 -30 -6 -74Q8 -64 14 -30Q12 -10 0 0Z', 'url(#sh)', NS) + P('M0 4Q2 -30 -4 -72', 'none', 'stroke="#8a8aa0" stroke-width="2.2"') + P('M0 -10l-9 -8M2 -24l-11 -10M0 -38l-9 -10M-2 -52l-7 -8M2 -14l9 -8M3 -28l10 -8M1 -42l9 -8', 'none', 'stroke="#b0b0c4" stroke-width="1.2"') + P('M-6 -60Q-12 -40 -4 -20', 'none', 'stroke="#9aa0c4" stroke-width="2" opacity=".5"'), `translate(${x} ${y}) rotate(${rot}) scale(${s})`, 1.8);
const scale_ = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">` + C(0, 0, 34, 'url(#glowG)', `${NS} opacity=".8"`) + G(PS('M0 -16Q16 -16 18 0Q16 14 0 18Q-16 14 -18 0Q-16 -16 0 -16Z', '#5fcf88') + P('M-9 -4Q0 -10 9 -4M-11 4Q0 -2 11 4M-8 11Q0 5 8 11', 'none', 'stroke="#2a9060" stroke-width="1.6"') + P('M-8 -9q8 -5 14 -1', 'none', 'stroke="#fff" stroke-width="2.4" opacity=".6"'), '', 2) + '</g>';
const handkerchief = (x, y, s = 1, rot = 0) => G(P('M-14 -8Q0 -14 14 -8L16 8Q0 14 -16 8Z', '#fff') + P('M-12 -5Q0 -10 12 -5M-13 5Q0 10 13 5', 'none', 'stroke="#8fc0e8" stroke-width="1.6"') + P('M-4 -2h8M0 -5v6', 'none', 'stroke="#e8556a" stroke-width="1.6"'), `translate(${x} ${y}) rotate(${rot}) scale(${s})`, 2);
const biscuit = (x, y, s = 1) => G(CS(0, 0, 10, '#e8b866') + C(-3, -2, 1.4, '#8a5428', NS) + C(3, 2, 1.4, '#8a5428', NS) + C(2, -4, 1.2, '#8a5428', NS) + P('M7 -7a4 4 0 0 0 4 6', 'none', 'stroke="none"'), `translate(${x} ${y}) scale(${s})`, 2);
const ladleD = (x, y, s = 1, rot = 0) => G(thick('M0 0L34 -34', '#8a8a96', 3.4) + E(40, -40, 11, 9, '#9aa6b0', 'transform="rotate(-45 40 -40)"') + E(40, -40, 8, 5, '#6b3f26', 'transform="rotate(-45 40 -40)" stroke="none"'), `translate(${x} ${y}) rotate(${rot}) scale(${s})`, 2.2);
const basket = (x, y, s = 1, o = {}) => {
  const { peek = false, shake = false } = o;
  return `<g transform="translate(${x} ${y}) scale(${s})">` + E(0, 2, 32, 6, '#10183a', `${NS} opacity=".25"`)
    + (peek ? dragon(0, -6, 0.5, { mood: 'shy', shadow: false, arms: 'c' }) : '')
    + G(P('M-26 -34Q0 -78 26 -34', 'none', 'stroke="#8a5a2c" stroke-width="5"') + PS('M-30 -34L30 -34L24 0L-24 0Z', '#c8963a') + P('M-27 -26H27M-25 -17H25M-23 -8H23M-16 -34V0M-4 -34V0M8 -34V0M20 -34V0', 'none', 'stroke="#8a5a2c" stroke-width="1.6" opacity=".7"') + R(-32, -40, 64, 8, '#d9a850', 3) + P('M-22 -38q10 -6 18 0M6 -38q10 -6 18 0', 'none', 'stroke="#e8556a" stroke-width="3"'), '', 2.4)
    + (shake ? P('M-40 -20q-6 -6 0 -12M42 -20q6 -6 0 -12M-46 -14q-6 -6 0 -12M48 -14q6 -6 0 -12', 'none', 'stroke="#3a3f55" stroke-width="2.4"') : '') + '</g>';
};
const cardboard = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">` + G(E(0, 2, 46, 7, '#10183a', `${NS} opacity=".25"`) + PS('M-44 -48L44 -48L40 0L-40 0Z', '#b98a58') + P('M-44 -48L-56 -62L-30 -66L-30 -48Z', '#c89a68') + P('M44 -48L56 -62L30 -66L30 -48Z', '#c89a68') + E(0, -48, 44, 7, '#6b4a30') + P('M-30 -30H30M-34 -16H34', 'none', 'stroke="#8a5a30" stroke-width="1.6" opacity=".6"') + R(-14, -22, 28, 10, '#e8d8a8', 2, 'stroke-width="1.6" opacity=".9"') + P('M-8 -17h16', 'none', 'stroke="#c8963a" stroke-width="2"'), '', 2.4) + '</g>';
const blanketD = (x, y, s = 1) => G(P('M-36 0Q-40 -20 -20 -28Q0 -34 20 -28Q40 -20 36 0Z', '#c8556a') + P('M-36 0Q-40 -20 -20 -28Q0 -34 20 -28Q40 -20 36 0Z', 'url(#sh)', NS) + P('M-30 -12H30M-24 -22H24M-12 -30V0M8 -30V0M24 -26V0', 'none', 'stroke="#f7e8b8" stroke-width="2" opacity=".8"') + P('M-20 -6l4 4 4 -4 4 4M6 -16l4 4 4 -4', 'none', 'stroke="#f4c430" stroke-width="1.6"'), `translate(${x} ${y}) scale(${s})`, 2.2);
const chair = (x, y, s = 1, flip = false) => G(R(-14, -62, 28, 6, '#a8672f', 2) + R(-12, -58, 4, 26, '#8a5428') + R(8, -58, 4, 26, '#8a5428') + R(-14, -32, 28, 7, '#b9783f', 2) + R(-12, -25, 4, 25, '#8a5428') + R(8, -25, 4, 25, '#8a5428') + P('M-6 -56v22M0 -56v22M6 -56v22', 'none', 'stroke="#8a5428" stroke-width="2.4"'), `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`, 2.2);
const longTable = (x, y, s = 1) => G(E(0, 4, 118, 8, '#10183a', `${NS} opacity=".22"`) + R(-110, -50, 220, 12, '#d9a066', 3) + R(-106, -40, 212, 36, 'url(#gingham)', 0, 'stroke-width="2.2"') + P('M-106 -4Q-96 6 -86 -4Q-76 6 -66 -4Q-56 6 -46 -4Q-36 6 -26 -4Q-16 6 -6 -4Q4 6 14 -4Q24 6 34 -4Q44 6 54 -4Q64 6 74 -4Q84 6 94 -4Q100 4 106 -4', 'none', 'stroke-width="0"') + R(-104, -4, 8, 14, '#8a5428') + R(96, -4, 8, 14, '#8a5428'), `translate(${x} ${y}) scale(${s})`, 2.4);
const burnt = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">` + P('M-14 0Q-8 -12 0 -4Q8 -16 14 0Q4 4 -14 0Z', '#3a2a22', 'stroke="#1a1214" stroke-width="1.6"') + P('M-6 -2Q-2 -16 2 -2Q6 -12 8 -2Z', '#ff9a2a', 'stroke="#e8731a" stroke-width="1.4"') + P('M-2 -2Q0 -10 3 -2Z', '#ffe066', NS) + '<g fill="#6b6b78" opacity=".7">' + C(-4, -24, 6, '#6b6b78', NS) + C(4, -36, 8, '#7a7a88', NS) + C(-2, -50, 10, '#8a8a98', NS) + '</g></g>';
const lerp = (a, b, t) => a + (b - a) * t;
const wp = (side, u, t) => { const x = 128 * u, y = lerp(262 * t, 52 + 144 * t, u); return side === 'L' ? [x, y] : [400 - x, y]; };
const wq = (side, u0, u1, t0, t1, f, ex = '') => P(`M${[wp(side, u0, t0), wp(side, u1, t0), wp(side, u1, t1), wp(side, u0, t1)].map((p) => p.join(' ')).join('L')}Z`, f, ex);
const wl = (side, u0, t0, u1, t1, ex) => P(`M${wp(side, u0, t0).join(' ')}L${wp(side, u1, t1).join(' ')}`, 'none', ex);
const TIMES = {
  day: { sky: 'url(#skyDay)', wallL: '#c4704f', wallR: '#b6633f', floor: '#8c7a7a', far: '#d8b8a0', tint: '', winOn: '#ffe9a8', winOff: '#cfe6f4', litPct: 0.35 },
  dusk: { sky: 'url(#skyDusk)', wallL: '#a65a50', wallR: '#964c48', floor: '#6a5878', far: '#8a6a8a', tint: 'rgba(255,120,70,.1)', winOn: '#ffd27a', winOff: '#4a4a78', litPct: 0.7 },
  night: { sky: 'url(#skyNight)', wallL: '#4a3f6a', wallR: '#40375e', floor: '#3a3556', far: '#34305a', tint: 'rgba(16,24,80,.14)', winOn: '#ffd27a', winOff: '#2a2f5a', litPct: 0.7 },
  dark: { sky: 'url(#skyDark)', wallL: '#3e3a62', wallR: '#36335a', floor: '#34304f', far: '#5a4670', tint: 'rgba(16,20,70,.18)', winOn: '#ffd27a', winOff: '#232650', litPct: 0.08 },
};
const alley = (o = {}) => {
  const { time = 'dusk', seed = 0, glowEnd = false, stars = false } = o;
  const T = TIMES[time];
  let out = R(0, 0, 400, 300, T.sky);
  if (stars || time === 'night' || time === 'dark') out += [[30, 22], [90, 38], [160, 14], [250, 20], [320, 40], [372, 16], [200, 40], [140, 30], [60, 12]].map(([a, b], i) => star4(a, b, 1 + (i % 3) * 0.5, '#fff')).join('');
  if (time === 'dusk' || glowEnd) out += C(200, 120, 90, 'url(#orange)', `${NS} opacity=".6"`);
  out += R(128, 52, 144, 144, T.far, 0, NS) + R(128, 52, 144, 144, 'url(#shv)', 0, NS);
  if (glowEnd) out += R(172, 96, 56, 100, 'url(#skyDark)', 0, NS) + R(172, 150, 56, 46, '#ffb070', 0, `${NS} opacity=".7"`) + C(200, 170, 50, 'url(#glow)', `${NS} opacity=".9"`);
  out += [[134, 70, 18, 126], [226, 60, 20, 136], [150, 90, 16, 106]].map(([a, b, w, h], i) => R(a + (i === 1 ? 24 : 0), b, w, h, T.far, 0, `${NS} opacity=".6"`)).join('');
  const wallCol = (side) => (side === 'L' ? T.wallL : T.wallR);
  for (const side of ['L', 'R']) {
    out += wq(side, 0, 1, 0, 1, wallCol(side)) + wq(side, 0, 1, 0, 1, 'url(#sh)', NS);
    for (let k = 0; k <= 16; k++) { const t = k / 16; out += wl(side, 0, t, 1, t, 'stroke="#000" stroke-width="1" opacity=".16"'); }
    for (let k = 0; k < 16; k++) for (let j = 0; j < 6; j++) { const u = (j + (k % 2 ? 0.5 : 0)) / 6 + 0.04; if (u > 0.98) continue; out += wl(side, u, k / 16, u, (k + 1) / 16, 'stroke="#000" stroke-width="1" opacity=".1"'); }
    const rows = [[0.08, 0.3], [0.4, 0.62]]; let wi = 0;
    for (const [t0, t1] of rows) for (const [u0, u1] of [[0.07, 0.25], [0.37, 0.55], [0.68, 0.86]]) {
      wi++; const lit = ((wi * 37 + seed * 13 + (side === 'L' ? 5 : 11)) % 100) / 100 < T.litPct;
      out += wq(side, u0 - 0.012, u1 + 0.012, t0 - 0.015, t1 + 0.015, '#e8dcc8', 'stroke="#3a3f55" stroke-width="1.6"') + wq(side, u0, u1, t0, t1, lit ? T.winOn : T.winOff, 'stroke="#3a3f55" stroke-width="1.4"')
        + wl(side, (u0 + u1) / 2, t0, (u0 + u1) / 2, t1, 'stroke="#e8dcc8" stroke-width="1.6"') + wl(side, u0, (t0 + t1) / 2, u1, (t0 + t1) / 2, 'stroke="#e8dcc8" stroke-width="1.6"');
      if (lit) { const [gx, gy] = wp(side, (u0 + u1) / 2, (t0 + t1) / 2); out += C(gx, gy, 26 - (u0 * 14), 'url(#glow)', `${NS} opacity=".5"`); }
      if (t0 > 0.3) out += wq(side, u0 - 0.03, u1 + 0.03, t1 + 0.015, t1 + 0.04, '#2a2d3e', NS) + wl(side, u0 - 0.03, t1 - 0.05, u1 + 0.03, t1 - 0.05, 'stroke="#2a2d3e" stroke-width="1.8"') + [0, 0.25, 0.5, 0.75, 1].map((q) => wl(side, lerp(u0 - 0.03, u1 + 0.03, q), t1 - 0.05, lerp(u0 - 0.03, u1 + 0.03, q), t1 + 0.03, 'stroke="#2a2d3e" stroke-width="1.5"')).join('');
    }
    out += wq(side, 0.4, 0.55, 0.64, 1, '#6b3f26', 'stroke="#3a3f55" stroke-width="1.6"') + wq(side, 0.43, 0.52, 0.68, 0.8, T.winOff, NS);
  }
  out += P('M0 300V262L128 196H272L400 262V300Z', T.floor) + P('M0 300V262L128 196H272L400 262V300Z', 'url(#shv)', NS)
    + P('M200 196L90 300M200 196L170 300M200 196L240 300M200 196L310 300M200 196L-10 300M200 196L410 300', 'none', 'stroke="#000" stroke-width="1.4" opacity=".14"') + P('M140 206H260M110 224H290M70 250H330M20 282H380', 'none', 'stroke="#000" stroke-width="1.2" opacity=".12"')
    + E(200, 246, 70, 10, 'url(#glow)', `${NS} opacity="${time === 'day' ? 0.15 : 0.25}"`);
  for (const side of ['L', 'R']) for (let k = 0; k < 9; k++) { const [gx, gy] = wp(side, (k + 0.4) / 9, 1); out += P(`M${gx - 3} ${gy}l1 -7M${gx} ${gy}l0 -9M${gx + 3} ${gy}l-1 -7`, 'none', `stroke="${time === 'day' || time === 'dusk' ? '#5aa860' : '#2f6a58'}" stroke-width="1.8"`); }
  if (T.tint) out += R(0, 0, 400, 300, T.tint, 0, NS);
  return out;
};
const spiral = (x, y, s = 1, h = 150) => {
  const N = 17, back = [], front = [];
  for (let i = 0; i < N; i++) { const a = i * 0.95, yy = -i * (h / N), dx = Math.cos(a) * 26, dz = Math.sin(a), st = P(`M0 ${yy}L${dx} ${yy + 5 * dz}`, 'none', 'stroke="#262a3c" stroke-width="8"') + P(`M0 ${yy - 1}L${dx} ${yy + 5 * dz - 1}`, 'none', 'stroke="#6a7090" stroke-width="3.6"'); (dz < 0 ? back : front).push(st); }
  let rail = ''; for (let i = 0; i <= 60; i++) { const a = (i / 60) * (N - 1) * 0.95, yy = -(i / 60) * (N - 1) * (h / N) - 22; rail += `${i ? 'L' : 'M'}${(Math.cos(a) * 27).toFixed(1)} ${(yy + 5 * Math.sin(a)).toFixed(1)}`; }
  return `<g transform="translate(${x} ${y}) scale(${s})">` + back.join('') + R(-3, -h - 18, 6, h + 18, '#2a2d3e', 1.5, NS) + front.join('') + P(rail, 'none', 'stroke="#262a3c" stroke-width="2.6"') + R(-36, -h - 24, 72, 6, '#2a2d3e', 2, NS) + P(`M-36 ${-h - 24}h72`, 'none', 'stroke="#6a7090" stroke-width="1.4"') + '</g>';
};
const ladder = (x, y, s = 1) => G(P('M-18 0L-10 -96M18 0L10 -96', 'none', 'stroke="#c8963a" stroke-width="6"') + [-20, -40, -60, -80].map((q) => P(`M${-16 + (-q) * 0.08} ${q}H${16 - (-q) * 0.08}`, 'none', 'stroke="#c8963a" stroke-width="5"')).join('') + P('M-10 -96h20', 'none', 'stroke-width="3"'), `translate(${x} ${y}) scale(${s})`, 2);

const pages = [
  // 1 — the alley
  { svg: svg(alley({ time: 'dusk', seed: 1 }) + bunting([0, 36], [400, 52], 14, 14) + laundryLine([0, 70], [400, 90], 20, 0) + laundryLine([6, 112], [394, 104], 16, 2)
    + P('M60 150q-6 -10 2 -18t0 -18M76 154q-6 -10 2 -18t0 -18', 'none', 'stroke="#fff" stroke-width="3" opacity=".55"')
    + spiral(334, 268, 1.15, 150)
    + C(220, 150, 100, 'url(#glow)', `${NS} opacity=".25"`)
    + camille(118, 294, 1.5, { mood: 'happy', ar: [34, -60], al: 'd' }) + P('M60 82l6 -6M300 96l6 -6', 'none', 'stroke="#fff3b0" stroke-width="2"')), text: "Derrière la maison de Camille, la ruelle sent le pain grillé et l'herbe chaude. Des escaliers en colimaçon grimpent jusqu'aux balcons, et des cordes à linge relient les fenêtres comme de longues toiles d'araignée. Demain, c'est la fête des voisins." },
  // 2 — recycling bin, a spark
  { svg: svg(alley({ time: 'dusk', seed: 2 }) + laundryLine([0, 66], [400, 86], 20, 1)
    + poubelle(56, 266, 1.25) + poubelle(104, 258, 1.1, '#7a8490') + sparkGlow(78, 226, 16) + C(78, 232, 44, 'url(#orange)', `${NS} opacity=".4"`)
    + camille(236, 296, 1.55, { mood: 'surprised', al: 'd', ar: [14, -58] })
    + bacBleu(326, 296, 1.5) + C(196, 240, 4, '#ffe066', NS) + spk(116, 244, 6, '#ffe066') + P('M150 226q-8 -6 -2 -14', 'none', 'stroke="#fff3b0" stroke-width="2" opacity=".6"')), text: "Ce soir-là, Camille sort le bac de recyclage. Soudain, elle entend un petit « Atchoum! » derrière les poubelles. Une étincelle orange jaillit dans la pénombre." },
  // 3 — tiny curled dragon behind the blue bin
  { svg: svg(alley({ time: 'dusk', seed: 3 }) + R(0, 0, 400, 300, 'rgba(20,16,60,.25)', 0, NS)
    + dragon(226, 292, 0.95, { pose: 'curl', mood: 'cry', headTilt: 6 })
    + bacBleu(112, 298, 1.9) + poubelle(300, 262, 0.9, '#7a8490')
    + crouched(340, 298, 1.55, { flip: true, mood: 'happy', al: [-28, -50], ar: [40, -34] })
    + C(226, 230, 50, 'url(#orange)', `${NS} opacity=".25"`) + P('M200 226q-3 6 0 9', 'none', 'stroke="none"')), text: "Derrière le bac bleu, un minuscule dragon vert est recroquevillé. Il est à peine plus gros qu'un chat, et ses yeux sont pleins de larmes. Camille s'accroupit doucement près de lui." },
  // 4 — dialogue
  { svg: svg(alley({ time: 'dusk', seed: 4 }) + R(0, 0, 400, 300, 'rgba(20,16,60,.2)', 0, NS) + bacBleu(52, 300, 1.7) + C(200, 190, 110, 'url(#glow)', `${NS} opacity=".2"`)
    + dragon(150, 296, 1.22, { mood: 'sad', arms: 'c' }) + spk(186, 214, 7, '#ffe066')
    + crouched(318, 298, 1.9, { flip: true, mood: 'happy', al: [-24, -48], ar: [40, -30] })), text: "— N'aie pas peur, murmure Camille. Comment t'appelles-tu? — Pouf, répond le dragon d'une toute petite voix. Un coup de vent m'a emporté loin de ma famille. Atchoum!" },
  // 5 — biscuit, blanket, cardboard box under the stairs
  { svg: svg(alley({ time: 'night', seed: 5 }) + spiral(110, 262, 1.5, 150) + R(60, 200, 110, 4, '#2a2d3e', 0, NS)
    + C(150, 232, 90, 'url(#glow)', `${NS} opacity=".55"`) + G(R(150, 136, 6, 40, '#2a2d3e', 2, NS) + E(153, 182, 14, 10, '#ffe9a8', 'stroke-width="2"') + P('M138 182h30', 'none', 'stroke-width="2"'), '')
    + cardboard(160, 296, 1.6)
    + dragon(160, 290, 0.8, { pose: 'curl', mood: 'sleepy', shadow: false }) + blanketD(160, 290, 1.5) + biscuit(194, 252, 0.9)
    + crouched(316, 298, 1.6, { flip: true, mood: 'happy', al: [-34, -40], ar: [20, -44] }) + P('M232 226q4 -8 10 -2', 'none', 'stroke="none"')), text: "Camille lui apporte un biscuit et une vieille couverture. Pouf grignote en frissonnant, puis il s'endort dans une boîte de carton, sous l'escalier. Camille promet de garder son secret." },
  // 6 — party preparations, Pouf hides in the basket
  { svg: svg(alley({ time: 'day', seed: 6 }) + bunting([0, 30], [400, 44], 14, 14) + lanternLine([10, 62], [390, 80], 22, 6, false, 1.05, 0) + lanternLine([4, 118], [396, 110], 16, 4, true, 0.9, 1)
    + ladder(60, 270, 1.3) + longTable(246, 262, 0.95) + chair(150, 276, 0.9, false) + chair(346, 278, 0.9, true)
    + lacasse(70, 288, 1.25, { mood: 'happy', ar: [30, -90], al: 'd', holdR: lantern(0, -12, 0.9, 0, false) })
    + dimitri(230, 270, 1.05, { mood: 'happy', al: [-30, -44], ar: [30, -44] })
    + camille(342, 298, 1.45, { mood: 'happy', ar: 'd', al: 'd' }) + basket(300, 296, 1.1, { peek: true })), text: "Le lendemain, toute la ruelle prépare la fête. Madame Lacasse suspend des lanternes en papier, et monsieur Dimitri installe de longues tables. Camille arrive avec un panier, et Pouf se cache dedans." },
  // 7 — sneeze in the basket, burnt tablecloth
  { svg: svg(alley({ time: 'day', seed: 7 }) + lanternLine([10, 62], [390, 80], 22, 6, false, 1.05, 0) + longTable(210, 248, 1.1) + burnt(150, 206, 1.4)
    + dimitri(330, 262, 1.0, { mood: 'surprised', ar: [30, -70], al: [-30, -70] })
    + lacasse(86, 292, 1.5, { mood: 'shout', ar: [34, -86], al: [-34, -86] }) + ladleD(150, 168, 1.3, 40)
    + dragon(262, 262, 0.95, { mood: 'sneeze', arms: 'u', headTilt: -8 }) + sparks(262, 190, 1.4)
    + basket(262, 296, 1.5, { shake: true })
    + camille(366, 298, 1.3, { flip: true, mood: 'surprised', ar: [30, -40], al: 'd' })), text: "Tout à coup, le panier se met à trembler : « Atchoum! » Des étincelles volent partout et brûlent un coin de nappe. — Un dragon! hurle Madame Lacasse en lâchant sa louche." },
  // 8 — Camille protects Pouf
  { svg: svg(alley({ time: 'day', seed: 8 }) + lanternLine([10, 62], [390, 80], 22, 6, false, 1.05, 0) + longTable(300, 252, 0.9)
    + dimitri(70, 322, 1.35, { mood: 'surprised', bust: true, shadow: false }) + chair(70, 302, 1.5)
    + neighbor(150, 270, 1.15, 0, { mood: 'surprised', ar: 'u', al: 'u' }) + neighbor(350, 268, 1.1, 2, { mood: 'surprised', al: 'u', ar: [-10, -60] }) + neighbor(318, 280, 1.2, 4, { mood: 'shy', al: 'u', ar: 'u' })
    + dragon(262, 296, 0.8, { mood: 'shy', arms: 'c' })
    + camille(212, 300, 1.85, { mood: 'shout', al: [-46, -52], ar: [46, -52] })), text: "Monsieur Dimitri se cache derrière une chaise et les voisins reculent. — Attendez! s'écrie Camille en ouvrant les bras. Il n'est pas méchant, il est perdu et il a le rhume!" },
  // 9 — a big tear, Madame Lacasse offers a handkerchief
  { svg: svg(alley({ time: 'day', seed: 9 }) + lanternLine([10, 62], [390, 80], 22, 6, false, 1.05, 0)
    + neighbor(330, 262, 1.2, 1, { mood: 'shy', al: 'd', ar: 'd' }) + dimitri(372, 276, 1.05, { mood: 'shy', flip: true, ar: 'c', al: 'c' }) + neighbor(36, 262, 1.15, 3, { mood: 'shy' })
    + dragon(236, 296, 1.25, { mood: 'cry', headTilt: 8, arms: 'd' })
    + lacasse(104, 296, 1.5, { mood: 'happy', ar: [48, -50], holdR: handkerchief(2, -2, 1.1, -10) })
    + camille(336, 298, 1.55, { mood: 'happy', al: [-34, -42] })), text: "Pouf baisse la tête, et une grosse larme roule sur son museau. Les voisins se regardent, un peu honteux. Madame Lacasse s'approche et lui tend un mouchoir." },
  // 10 — power cut, dark alley
  { svg: svg(alley({ time: 'dark', seed: 10, glowEnd: true }) + bulbs([0, 40], [400, 60], 16, 14, false) + lanternLine([10, 84], [390, 100], 20, 6, false, 1.05, 0) + longTable(262, 256, 0.85) + C(262, 218, 40, 'url(#glow)', `${NS} opacity=".6"`) + R(256, 208, 5, 10, '#fff3c8', 1.5, NS)
    + neighbor(180, 270, 1.1, 5, { mood: 'shy' }) + neighbor(228, 268, 1.1, 3, { mood: 'shy' })
    + dragon(326, 296, 0.8, { mood: 'sad', arms: 'c' }) + camille(372, 298, 1.3, { flip: true, mood: 'worried', al: 'd' })
    + lacasse(150, 296, 1.35, { mood: 'shy', ar: 'd', al: 'd' })
    + dimitri(66, 300, 1.55, { mood: 'shy', al: [-16, -60], ar: 'd' }) + R(0, 0, 400, 300, 'rgba(60,70,160,.1)', 0, NS)), text: "Au coucher du soleil, une panne de courant plonge tout le quartier dans le noir. Les guirlandes s'éteignent et les lanternes restent sombres. — Notre belle fête est gâchée, soupire monsieur Dimitri." },
  // 11 — feather tickles
  { svg: svg(alley({ time: 'dark', seed: 11, glowEnd: true }) + bulbs([0, 40], [400, 60], 16, 14, false) + lanternLine([10, 84], [390, 100], 20, 6, false, 1.05, 0)
    + neighbor(60, 266, 1.15, 1, { mood: 'shy' }) + neighbor(110, 262, 1.1, 4, { mood: 'happy' }) + lacasse(40, 290, 1.2, { mood: 'happy' }) + dimitri(380, 280, 1.2, { mood: 'happy', flip: true })
    + dragon(150, 296, 1.45, { mood: 'squint', arms: 'c', headTilt: 4 }) + spk(118, 190, 7, '#ffb020') + spk(132, 178, 5, '#ffe066') + C(150, 186, 22, 'url(#orange)', `${NS} opacity=".6"`)
    + camille(290, 298, 1.7, { flip: true, mood: 'happy', tilt: -4, ar: [52, -62], al: [-24, -40], holdR: feather(0, 4, 1.2, 62) })), text: "Pouf renifle, puis il se redresse. — Je pourrais allumer vos lanternes, propose-t-il, mais je ne sais pas éternuer sur commande. Camille ramasse une plume de pigeon et lui chatouille le nez." },
  // 12 — sneezes light the lanterns
  { svg: svg(alley({ time: 'night', seed: 12, glowEnd: true }) + bulbs([0, 38], [400, 58], 16, 14, true)
    + lanternLine([6, 76], [394, 98], 24, 8, (k) => k < 7, 1.1, 0) + lanternLine([4, 128], [396, 120], 18, 6, (k) => k < 5, 1.0, 1)
    + P('M170 184Q190 130 214 100M214 100Q250 80 290 98', 'none', 'stroke="#ffe066" stroke-width="3" opacity=".8" stroke-dasharray="2 8"') + spk(214, 100, 9, '#ffe066') + spk(290, 98, 8) + spk(252, 84, 5, '#ffe066') + spk(160, 150, 7)
    + neighbor(34, 270, 1.2, 0, { mood: 'laugh', ar: 'u', al: 'u' }) + neighbor(82, 276, 1.1, 2, { mood: 'happy', al: 'u' }) + neighbor(356, 272, 1.2, 4, { mood: 'laugh', ar: 'u', al: 'u' }) + neighbor(318, 280, 1.1, 5, { mood: 'happy', ar: 'u' })
    + lacasse(122, 296, 1.35, { mood: 'laugh', ar: 'u', al: 'u' }) + dimitri(290, 298, 1.35, { mood: 'laugh', ar: 'u', al: 'u' })
    + dragon(206, 296, 1.2, { mood: 'sneeze', arms: 'u', headTilt: -12 }) + sparks(206, 178, 1.3)
    + camille(240, 300, 1.2, { mood: 'laugh', ar: 'u' }) + sparkles(14, 12, 140)), text: "Atchoum! Atchoum! Atchoum! À chaque éternuement, une étincelle file le long des cordes à linge. Les lanternes s'allument une à une, rouges, orange et dorées. La ruelle entière brille comme un ciel d'étoiles." },
  // 13 — applause, pie, apology
  { svg: svg(alley({ time: 'night', seed: 13, glowEnd: true }) + bulbs([0, 38], [400, 58], 16, 14, true) + lanternLine([6, 76], [394, 98], 24, 8, true, 1.1, 0) + lanternLine([4, 128], [396, 120], 18, 6, true, 1.0, 1)
    + P('M20 90q-8 4 0 8M16 100q-10 6 0 12M380 92q8 4 0 8M384 102q10 6 0 12', 'none', 'stroke="#fff" stroke-width="2.4" opacity=".5"')
    + neighbor(40, 262, 1.15, 1, { mood: 'laugh', al: 'c', ar: 'c' }) + neighbor(92, 258, 1.05, 3, { mood: 'laugh', al: 'c', ar: 'c' }) + neighbor(318, 258, 1.05, 4, { mood: 'laugh', al: 'c', ar: 'c' }) + neighbor(366, 262, 1.15, 5, { mood: 'laugh', al: 'c', ar: 'c' })
    + dragon(220, 296, 1.05, { mood: 'laugh', arms: 'c' }) + sparks(262, 214, 0.7)
    + lacasse(116, 298, 1.5, { mood: 'happy', ar: [48, -30], holdR: tarteSlice(0, 4, 1.5) }) + tarte(150, 262, 1.3)
    + dimitri(330, 300, 1.45, { mood: 'shy', al: 'c', ar: 'c', tilt: 6 }) + camille(190, 300, 1.0, { mood: 'laugh', ar: 'u' })), text: "Les voisins applaudissent! Madame Lacasse offre une part de tarte au sucre à Pouf, et monsieur Dimitri lui demande pardon pour sa frayeur. Soudain, un grondement lointain fait vibrer les vitres." },
  // 14 — the dragon family
  { svg: svg(alley({ time: 'night', seed: 14, glowEnd: true }) + bulbs([0, 40], [400, 60], 16, 14, true) + lanternLine([6, 104], [394, 124], 24, 8, true, 1.1, 0) + lanternLine([4, 150], [396, 142], 18, 6, true, 1.0, 1)
    + dragonMama(82, 150, 0.74, { pose: 'fly', mood: 'happy' }) + dragonPapa(318, 144, 0.74, { pose: 'fly', mood: 'happy' }) + dragonOld(200, 100, 0.72, { pose: 'fly', mood: 'surprised' })
    + neighbor(34, 272, 1.25, 0, { mood: 'surprised', ar: 'u', al: 'u' }) + neighbor(366, 272, 1.25, 3, { mood: 'surprised', ar: 'u', al: 'u' }) + lacasse(86, 300, 1.3, { mood: 'surprised', al: 'c', ar: 'c' }) + dimitri(318, 300, 1.3, { mood: 'surprised', al: 'c', ar: 'c' })
    + camille(200, 300, 1.7, { mood: 'happy', al: [-36, -66], ar: [36, -66] }) + dragon(200, 230, 0.78, { pose: 'fly', mood: 'laugh', arms: 'h', shadow: false })
    + sparkles(16, 14, 40)), text: "Trois grands dragons descendent entre les balcons, attirés par la lumière des lanternes. — Maman! Papa! s'écrie Pouf en battant des ailes. Il serre Camille dans ses bras avant de s'envoler." },
  // 15 — farewell
  { svg: svg(alley({ time: 'night', seed: 15, stars: true }) + lanternLine([6, 76], [394, 98], 24, 8, true, 1.1, 0) + lanternLine([4, 130], [396, 122], 18, 6, true, 1.0, 1)
    + [[300, 34, 0.16], [336, 52, 0.13], [366, 30, 0.11]].map(([a, b, sc]) => C(a, b, 16, 'url(#glowG)', `${NS} opacity=".9"`) + dragon(a, b + 8, sc, { pose: 'fly', mood: 'happy', shadow: false })).join('')
    + P('M24 100q40 -14 70 0t70 0M250 150q30 -10 60 0t60 0', 'none', 'stroke="#fff" stroke-width="2.4" opacity=".35"')
    + camille(150, 300, 1.75, { mood: 'happy', ar: [34, -92], al: [44, -56], holdL: scale_(2, -8, 1.1, -10) }) + sparkles(10, 15, 150)), text: "Camille le salue longtemps, jusqu'à ce que les dragons ressemblent à de petites étoiles. Dans sa main, une écaille verte est encore tiède. Depuis ce soir-là, quand le vent chante dans les cordes à linge, elle sourit : peut-être que Pouf pense à elle." },
];

export const book = {
  id: 'dragon-de-la-ruelle',
  title: 'Le dragon de la ruelle',
  emoji: '🐉',
  level: 3,
  minutes: 12,
  cover: svg(alley({ time: 'night', seed: 16, glowEnd: true }) + bulbs([0, 40], [400, 60], 16, 14, true) + lanternLine([6, 84], [394, 106], 24, 8, true, 1.1, 0) + lanternLine([4, 136], [396, 128], 18, 6, true, 1.0, 1)
    + camille(190, 300, 1.8, { mood: 'laugh', ar: [28, -88], al: 'd' }) + dragon(244, 164, 0.62, { mood: 'happy', arms: 'u', shadow: false }) + sparks(262, 120, 0.9) + sparkles(14, 16, 150)),
  pages,
  words: [
    { word: 'une ruelle', emoji: '🏘️', def: 'Une petite rue étroite, derrière les maisons.' },
    { word: 'un escalier en colimaçon', emoji: '🌀', def: "Un escalier qui tourne autour d'un poteau, comme la coquille d'un escargot." },
    { word: 'une corde à linge', emoji: '🧺', def: 'Une corde tendue où on suspend les vêtements pour les faire sécher.' },
    { word: 'une lanterne', emoji: '🏮', def: 'Une lampe en papier ou en verre qui éclaire doucement.' },
    { word: 'une étincelle', emoji: '✨', def: 'Une toute petite flamme brillante qui jaillit du feu.' },
    { word: 'éternuer', emoji: '🤧', def: 'Faire « atchoum! » quand le nez chatouille.' },
    { word: 'recroquevillé', emoji: '😟', def: 'Le corps replié sur soi pour avoir moins froid ou moins peur.' },
    { word: 'une panne de courant', emoji: '🔌', def: "Un moment où l'électricité s'arrête et où tout s'éteint." },
    { word: 'honteux', emoji: '😳', def: "Qui a un peu de honte parce qu'il a mal agi." },
  ],
  quiz: [
    { q: "Où se passe l'histoire?", options: ['Dans une forêt', 'Dans une ruelle de Montréal', "Dans une cour d'école"], answer: 1 },
    { q: 'Comment Camille découvre-t-elle Pouf?', options: ['Elle le voit voler dans le ciel.', 'Il frappe à sa porte.', 'Elle entend un éternuement et voit une étincelle.'], answer: 2 },
    { q: 'Pourquoi Pouf a-t-il de la peine au début?', options: ['Il est perdu et loin de sa famille.', "Il n'aime pas la ruelle.", 'Il a perdu son biscuit.'], answer: 0 },
    { q: 'Pourquoi les voisins ont-ils peur de Pouf?', options: ['Il leur a volé leur tarte.', 'Ses éternuements font des étincelles et ils ne le connaissent pas.', 'Il crie très fort.'], answer: 1 },
    { q: "Qu'est-ce qui gâche la fête des voisins?", options: ['La pluie', 'Une panne de courant', 'Un orage de grêle'], answer: 1 },
    { q: 'Comment Pouf réussit-il à éternuer sur commande?', options: ['Camille lui chatouille le nez avec une plume.', 'Il sent du poivre.', 'Il avale un bonbon.'], answer: 0 },
    { q: 'Pourquoi la famille de Pouf arrive-t-elle dans la ruelle?', options: ['Elle a entendu de la musique.', 'Elle est attirée par la lumière des lanternes.', 'Elle voulait de la tarte.'], answer: 1 },
    { q: 'Que veut dire « une ruelle »?', options: ['Une grande autoroute', 'Une petite rue étroite derrière les maisons', 'Un escalier'], answer: 1 },
  ],
};
