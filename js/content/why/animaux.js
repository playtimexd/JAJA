// Pourquoi? 十万个为什么 — category « animaux » (animals and plants). Format: docs/WHY.md
// ---- small SVG helpers (flat friendly style, #3a3f55 outlines) ----
const S = '#3a3f55';
const W = (c) => `fill="${c}" stroke="${S}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const sv = (b, bg = '#e8f5fd') => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="${bg}"/>${b}</svg>`;
const E = (x, y, rx, ry, c) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${W(c)}/>`;
const C = (x, y, r, c) => `<circle cx="${x}" cy="${y}" r="${r}" ${W(c)}/>`;
const R = (x, y, w, h, c, r = 6) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ${W(c)}/>`;
const P = (d, c = 'none') => `<path d="${d}" ${W(c)}/>`;
const L = (x1, y1, x2, y2, c = S, w = 3) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const tube = (d, c, w = 14) => `<path d="${d}" fill="none" stroke="${S}" stroke-width="${w + 6}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const G = (x, y, s, inner, rot = 0, flip = false) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})">${inner}</g>`;
const eye = (x, y, r = 4) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${S}"/>`;
const T = (x, y, t, sz = 22, c = S) => `<text x="${x}" y="${y}" font-size="${sz}" font-family="sans-serif" font-weight="700" fill="${c}" text-anchor="middle">${t}</text>`;
const arrow = (x1, y1, x2, y2, c = '#ef6a5b', w = 5) => {
  const a = Math.atan2(y2 - y1, x2 - x1), bx = x2 - Math.cos(a) * 14, by = y2 - Math.sin(a) * 14, px = -Math.sin(a) * 8, py = Math.cos(a) * 8;
  return `<line x1="${x1}" y1="${y1}" x2="${bx.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><polygon points="${x2},${y2} ${(bx + px).toFixed(1)},${(by + py).toFixed(1)} ${(bx - px).toFixed(1)},${(by - py).toFixed(1)}" fill="${c}" stroke="${c}" stroke-width="2" stroke-linejoin="round"/>`;
};
const sun = (x, y, r = 24) => { let s = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; s += L((x + Math.cos(a) * (r + 6)).toFixed(1), (y + Math.sin(a) * (r + 6)).toFixed(1), (x + Math.cos(a) * (r + 16)).toFixed(1), (y + Math.sin(a) * (r + 16)).toFixed(1), '#f5a623', 4); } return s + C(x, y, r, '#ffd34d'); };
const ground = (y, c = '#a8dc7a') => `<rect x="0" y="${y}" width="400" height="${300 - y}" fill="${c}"/><line x1="0" y1="${y}" x2="400" y2="${y}" stroke="${S}" stroke-width="3"/>`;
const cloud = (x, y, s = 1) => G(x, y, s, `<ellipse cx="0" cy="0" rx="30" ry="16" fill="#fff"/><ellipse cx="-18" cy="6" rx="20" ry="12" fill="#fff"/><ellipse cx="20" cy="6" rx="22" ry="12" fill="#fff"/>`);
const leaf = (x, y, s = 1, c = '#6cc24a', rot = 0) => G(x, y, s, P('M0 -22 C16 -10 16 12 0 24 C-16 12 -16 -10 0 -22Z', c) + L(0, -14, 0, 20, S, 2), rot);
const maple = (x, y, s = 1, c = '#e0452f', rot = 0) => G(x, y, s, P('M0 -26 L6 -13 L15 -18 L12 -4 L24 -2 L15 7 L20 15 L6 13 L4 27 L-4 27 L-6 13 L-20 15 L-15 7 L-24 -2 L-12 -4 L-15 -18 L-6 -13Z', c), rot);
const heart = (x, y, s = 1, c = '#ef6a5b') => G(x, y, s, P('M0 14 C-26 -4 -16 -22 0 -8 C16 -22 26 -4 0 14Z', c));
const flower = (x, y, s = 1, c = '#ff8fb1', stem = 60) => G(x, y, s, L(0, 0, 0, stem, '#4c9a3a', 5) + [0, 72, 144, 216, 288].map((a) => `<ellipse transform="rotate(${a})" cx="0" cy="-15" rx="8" ry="13" ${W(c)}/>`).join('') + C(0, 0, 9, '#ffd34d'));
const sprout = (x, y, s = 1) => G(x, y, s, L(0, 0, 0, -34, '#4c9a3a', 5) + leaf(-12, -36, 0.7, '#6cc24a', -60) + leaf(12, -40, 0.7, '#6cc24a', 60));
const tree = (x, y, s = 1, c = '#5fb04a', trunk = '#9a6a3c') => G(x, y, s, R(-9, -50, 18, 54, trunk, 3) + C(0, -76, 38, c) + C(-26, -56, 24, c) + C(26, -56, 24, c));
const dirt = (y = 200) => `<rect x="0" y="${y}" width="400" height="${300 - y}" fill="#a9794f"/><line x1="0" y1="${y}" x2="400" y2="${y}" stroke="${S}" stroke-width="3"/>`;
const drop = (x, y, s = 1) => G(x, y, s, P('M0 -16 C12 0 14 8 0 14 C-14 8 -12 0 0 -16Z', '#5bb8f0'));
const zz = (x, y, s = 1) => G(x, y, s, `<path d="M-8 -10 L8 -10 L-8 6 L8 6" fill="none" stroke="${S}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`);
const moon = (x, y) => `<path d="M${x} ${y - 24} A24 24 0 1 0 ${x + 18} ${y + 14} A19 19 0 1 1 ${x} ${y - 24}Z" ${W('#ffe9a8')}/>`;
const star = (x, y, s = 1) => G(x, y, s, P('M0 -10 L3 -3 L10 -3 L4 2 L6 9 L0 5 L-6 9 L-4 2 L-10 -3 L-3 -3Z', '#ffd34d'));
const water = (y, c = '#8fd0f5') => `<rect x="0" y="${y}" width="400" height="${300 - y}" fill="${c}"/><path d="M0 ${y} q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="${S}" stroke-width="3"/>`;
// ---- animals (centred near the origin, ~100 px; place with G) ----
const cat = (happy = true) => P('M34 44 Q80 40 66 0') + E(0, 38, 40, 30, '#f4b26a') + E(0, -10, 38, 32, '#f4b26a') + P('M-32 -28 L-30 -66 L-8 -40Z', '#f4b26a') + P('M32 -28 L30 -66 L8 -40Z', '#f4b26a') + (happy ? P('M-22 -12 q7 -8 14 0') + P('M8 -12 q7 -8 14 0') : eye(-15, -14, 5) + eye(15, -14, 5)) + P('M-5 -1 L5 -1 L0 5Z', '#f08aa0') + P('M0 5 q-5 7 -11 3 M0 5 q5 7 11 3') + L(-34, 2, -58, -4) + L(-34, 8, -58, 12) + L(34, 2, 58, -4) + L(34, 8, 58, 12);
const dog = (pant = false) => E(0, 42, 40, 32, '#d9a066') + E(-38, -14, 13, 26, '#a96f3a') + E(38, -14, 13, 26, '#a96f3a') + E(0, -14, 34, 30, '#d9a066') + E(0, -2, 18, 14, '#f6e3c8') + P('M-10 4 Q0 11 10 4') + (pant ? P('M-8 6 Q0 40 8 6Z', '#ef7d8c') : '') + E(0, -9, 7, 5, S) + eye(-14, -22) + eye(14, -22);
const bird = (wing = 0) => L(-5, 24, -8, 44) + L(8, 24, 10, 44) + P('M-36 -2 L-72 -14 L-70 10Z', '#4a90c8') + E(0, 0, 40, 26, '#6bb3e8') + C(38, -18, 17, '#6bb3e8') + P('M52 -22 L72 -16 L52 -10Z', '#ffb347') + eye(42, -21, 3) + (wing ? P('M-18 -4 Q-34 -54 6 -54 Q16 -22 14 0Z', '#4a90c8') : P('M-22 0 Q-8 -30 22 -2 Q0 14 -22 0Z', '#4a90c8'));
const fish = (c = '#ff9f5a') => P('M-38 0 L-70 -24 L-70 24Z', c) + E(0, 0, 42, 25, c) + P('M-4 -24 Q6 -40 18 -22', c) + eye(26, -6, 4) + P('M14 -14 Q6 0 14 14');
const bear = (sleep = false) => C(-26, -62, 11, '#9b6a3f') + C(26, -62, 11, '#9b6a3f') + E(0, 36, 46, 36, '#9b6a3f') + C(0, -30, 34, '#9b6a3f') + E(0, -19, 16, 12, '#e6c8a0') + E(0, -24, 6, 4, S) + (sleep ? P('M-22 -36 q7 6 14 0') + P('M8 -36 q7 6 14 0') : eye(-15, -38, 4) + eye(15, -38, 4)) + P('M0 -20 L0 -14 M-7 -12 Q0 -7 7 -12');
const bee = () => E(-8, -20, 12, 17, '#dff3ff') + E(8, -22, 12, 17, '#dff3ff') + E(0, 0, 26, 18, '#ffd23f') + P('M-8 -17 Q-13 0 -8 17') + P('M6 -17 Q1 0 6 17') + C(30, -2, 11, '#ffd23f') + eye(34, -5, 3) + L(36, -12, 44, -22) + P('M-26 0 L-36 0 L-26 -4Z', S);
const giraffe = () => R(-30, 52, 11, 50, '#f6c453', 4) + R(-10, 54, 11, 48, '#f6c453', 4) + R(14, 54, 11, 48, '#f6c453', 4) + R(34, 52, 11, 50, '#f6c453', 4) + P('M26 30 L44 -90 L66 -86 L54 34Z', '#f6c453') + E(0, 40, 46, 26, '#f6c453') + E(64, -92, 24, 14, '#f6c453') + L(52, -104, 50, -122) + L(62, -104, 62, -122) + C(50, -124, 4, S) + C(62, -124, 4, S) + eye(70, -96, 3) + [[-20, 36], [10, 46], [-4, 24], [52, -40], [48, -10], [36, 8]].map(([a, b]) => C(a, b, 6, '#c98a2b')).join('');
const stripesZ = (cx, cy, rx, ry) => { let s = ''; for (let x = -rx + 12; x < rx - 6; x += 19) { const h = ry * Math.sqrt(1 - (x / rx) ** 2) - 2; s += L(cx + x, cy - h, cx + x + 3, cy + h, S, 6); } return s; };
const zebra = () => R(-32, 40, 10, 54, '#fff', 4) + R(-12, 42, 10, 52, '#fff', 4) + R(16, 42, 10, 52, '#fff', 4) + R(36, 40, 10, 54, '#fff', 4) + P('M28 20 L50 -42 L72 -34 L56 28Z', '#fff') + E(0, 24, 50, 28, '#fff') + stripesZ(0, 24, 50, 28) + E(72, -38, 26, 14, '#fff') + P('M52 -46 L56 -64 L64 -48Z', '#fff') + eye(78, -42, 3) + L(54, -40, 66, -26, S, 6) + L(52, -26, 62, -10, S, 6);
const penguin = () => E(0, 0, 32, 46, S) + E(0, 8, 21, 34, '#fff') + E(-34, 8, 9, 24, S) + E(34, 8, 9, 24, S) + C(-9, -26, 4, '#fff') + C(9, -26, 4, '#fff') + eye(-9, -26, 2) + eye(9, -26, 2) + P('M-7 -19 L7 -19 L0 -10Z', '#ffb347') + E(-12, 48, 13, 5, '#ffb347') + E(12, 48, 13, 5, '#ffb347');
const frog = (sac = 0) => E(0, 14, 42, 28, '#7bc96f') + E(-38, 36, 18, 9, '#7bc96f') + E(38, 36, 18, 9, '#7bc96f') + C(-20, -14, 13, '#7bc96f') + C(20, -14, 13, '#7bc96f') + C(-20, -14, 6, '#fff') + C(20, -14, 6, '#fff') + eye(-20, -14, 3) + eye(20, -14, 3) + P('M-26 14 Q0 28 26 14') + (sac ? E(0, 26, sac, sac * 0.85, '#f7a5b3') : '');
const snake = (d, c = '#7bc96f', w = 24) => tube(d, c, w);
const butterfly = (c1 = '#ff9f5a', c2 = '#ffd34d') => E(-26, -16, 26, 20, c1) + E(26, -16, 26, 20, c1) + E(-20, 18, 18, 15, c2) + E(20, 18, 18, 15, c2) + E(0, 2, 5, 28, S) + L(-2, -26, -12, -42) + L(2, -26, 12, -42);
const caterpillar = (n = 5, c = '#8fd16a') => { let s = ''; for (let i = n - 1; i >= 0; i--) s += C(i * 22, 0, 13, c); return s + C(-6, -2, 14, '#6cc24a') + eye(-10, -4, 3) + L(-10, -14, -16, -26) + L(-2, -14, 2, -26); };
const ant = () => [[-14, 14], [0, 16], [14, 14]].map(([a, b]) => L(a, 2, a - 4, b + 8) + L(a, 2, a + 6, b + 8)).join('') + E(-22, 0, 14, 10, S) + E(0, 0, 9, 8, S) + C(16, -2, 9, S) + L(22, -8, 30, -20) + L(18, -9, 20, -22);
const elephant = () => R(-28, 40, 20, 50, '#b8c0cc', 6) + R(14, 40, 20, 50, '#b8c0cc', 6) + E(10, 14, 52, 36, '#b8c0cc') + C(-44, -8, 30, '#b8c0cc') + E(-18, -8, 20, 28, '#a3adbb') + tube('M-64 4 Q-84 40 -66 68', '#b8c0cc', 16) + P('M-58 14 L-72 30 L-62 26Z', '#fff') + eye(-52, -16, 4);
const chameleon = (c = '#8fd16a') => tube('M-34 0 Q-70 14 -56 42 Q-44 52 -40 38', c, 10) + L(-16, 20, -20, 40) + L(14, 20, 18, 40) + E(0, 0, 40, 24, c) + C(40, -6, 17, c) + C(46, -12, 8, '#fff') + eye(48, -12, 3) + P('M32 -2 Q50 8 56 -2');
const moose = () => R(-34, 40, 10, 56, '#8a5a3b', 4) + R(-12, 40, 10, 56, '#8a5a3b', 4) + R(16, 40, 10, 56, '#8a5a3b', 4) + R(36, 40, 10, 56, '#8a5a3b', 4) + E(0, 18, 52, 32, '#8a5a3b') + P('M-44 4 L-56 -26 L-34 -30 L-30 -2Z', '#8a5a3b') + E(-66, -22, 24, 16, '#8a5a3b') + E(-86, -14, 12, 10, '#6f452c') + eye(-70, -28, 3) + P('M-58 -36 L-76 -50 L-68 -66 L-52 -60 L-40 -72 L-38 -52 L-48 -38Z', '#e8c98a') + P('M-44 -38 L-34 -54 L-24 -50 L-16 -64 L-12 -44 L-30 -32Z', '#e8c98a');
const camel = () => C(-6, -20, 24, '#d9a95e') + R(-34, 40, 10, 56, '#d9a95e', 4) + R(-12, 40, 10, 56, '#d9a95e', 4) + R(16, 40, 10, 56, '#d9a95e', 4) + R(36, 40, 10, 56, '#d9a95e', 4) + E(0, 14, 52, 28, '#d9a95e') + P('M40 4 Q60 -30 66 -50 L84 -48 Q76 -20 58 14Z', '#d9a95e') + E(80, -52, 22, 11, '#d9a95e') + eye(84, -56, 3);
const whale = () => P('M76 -5 Q112 -50 128 -34 Q110 -8 128 22 Q108 30 76 8Z', '#5b8fd0') + E(0, 0, 90, 46, '#5b8fd0') + P('M-80 14 Q0 54 80 12 Q0 30 -80 14Z', '#e8f1fb') + eye(-60, -8, 4) + P('M-86 6 Q-70 14 -54 6');
const bat = (wings = true) => (wings ? P('M-8 -4 Q-46 -44 -86 -12 Q-70 -8 -64 8 Q-52 0 -40 14 Q-24 4 -8 14Z', '#6b5b8a') + P('M8 -4 Q46 -44 86 -12 Q70 -8 64 8 Q52 0 40 14 Q24 4 8 14Z', '#6b5b8a') : '') + E(0, 4, 14, 22, '#6b5b8a') + C(0, -20, 12, '#6b5b8a') + P('M-10 -28 L-10 -42 L-2 -32Z', '#6b5b8a') + P('M10 -28 L10 -42 L2 -32Z', '#6b5b8a') + eye(-4, -22, 2) + eye(4, -22, 2);
const beaver = () => E(-52, 40, 26, 10, '#6b4a2b') + E(0, 22, 42, 28, '#9a6a3c') + C(36, 2, 24, '#9a6a3c') + R(40, 8, 9, 14, '#ffb347', 2) + E(52, -2, 6, 5, S) + eye(36, -6, 3) + C(26, -20, 7, '#9a6a3c');
const firefly = (glow = true) => (glow ? `<circle cx="-18" cy="0" r="26" fill="#fff27a" fill-opacity="0.45"/>` : '') + E(-10, -14, 14, 9, '#dff3ff') + E(8, 0, 20, 10, '#4a4e69') + E(-14, 2, 11, 8, glow ? '#fff27a' : '#c9c27a') + C(30, 0, 8, '#4a4e69') + L(34, -6, 42, -16);
const sunflower = (s = 1) => G(0, 0, s, [0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<ellipse transform="rotate(${a})" cx="0" cy="-26" rx="9" ry="16" ${W('#ffd34d')}/>`).join('') + C(0, 0, 18, '#8a5a3b'));
const hive = (x, y, s = 1) => G(x, y, s, E(0, 0, 36, 40, '#e8b84a') + [-18, 0, 18].map((k) => P(`M-26 ${k} Q0 ${k + 10} 26 ${k}`)).join('') + E(0, 10, 11, 13, S));
const panel = (x, y, w, h, c = '#fff') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${c}" stroke="${S}" stroke-width="3"/>`;
const tx = (zh, py, fr) => ({ zh, py, fr });
const sl = (svg, zh, py, fr) => ({ svg, zh, py, fr });
const op = (zh, py, fr, emoji) => ({ zh, py, fr, emoji });
const qz = (zh, py, fr, answer, ...options) => ({ zh, py, fr, options, answer });
const cactus = (water = false) => R(-16, -84, 32, 84, '#5bb56a', 16) + R(-46, -58, 16, 36, '#5bb56a', 8) + R(-46, -36, 40, 14, '#5bb56a', 7) + R(30, -70, 16, 36, '#5bb56a', 8) + R(6, -50, 40, 14, '#5bb56a', 7) + (water ? R(-8, -76, 16, 62, '#8fd0f5', 8) + R(-42, -52, 8, 24, '#8fd0f5', 4) + R(34, -64, 8, 24, '#8fd0f5', 4) : '') + [[-16, -70, -24, -74], [16, -60, 24, -64], [-16, -40, -24, -42], [16, -30, 24, -32], [0, -84, 0, -94], [-46, -50, -54, -52], [46, -62, 54, -64]].map(([a, b, c, d]) => L(a, b, c, d, S, 2)).join('');
const vap = (x, y, c = '#5bb8f0') => `<path d="M${x} ${y} q-12 -14 0 -28 q12 -14 0 -28" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`;
const hex = (x, y, r, c) => `<polygon points="${[0, 1, 2, 3, 4, 5].map((i) => `${(x + r * Math.cos(i * Math.PI / 3 + Math.PI / 6)).toFixed(1)},${(y + r * Math.sin(i * Math.PI / 3 + Math.PI / 6)).toFixed(1)}`).join(' ')}" ${W(c)}/>`;
const cross = (x, y, s = 1) => G(x, y, s, L(-16, -16, 16, 16, '#ef6a5b', 7) + L(16, -16, -16, 16, '#ef6a5b', 7));
const check = (x, y, s = 1) => G(x, y, s, `<polyline points="-16,0 -5,12 16,-14" fill="none" stroke="#3fae4c" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`);
const hdrop = (x, y, s = 1) => G(x, y, s, P('M0 -16 C12 0 14 8 0 14 C-14 8 -12 0 0 -16Z', '#f5a623'));
const snow = (n = 14, seed = 3) => { let s = '', a = seed; for (let i = 0; i < n; i++) { a = (a * 73 + 41) % 997; const x = (a * 7) % 400, y = (a * 13) % 200 + 10; s += `<circle cx="${x}" cy="${y}" r="4" fill="#fff"/>`; } return s; };

export const topics = [
  // ================= LEVEL 1 =================
  {
    id: 'animaux-chat-ronronne', cat: 'animaux', emoji: '🐱', level: 1,
    q: tx('猫为什么会打呼噜？', 'māo wèi shén me huì dǎ hū lu', 'Pourquoi le chat ronronne-t-il?'),
    slides: [
      sl(sv(G(200, 165, 1.6, cat(true)) + heart(90, 70, 1.3) + heart(320, 85, 1) + heart(310, 215, 0.8), '#fff3e0'),
        '猫咪开心的时候，会发出呼噜呼噜的声音。', 'māo mī kāi xīn de shí hou, huì fā chū hū lu hū lu de shēng yīn.', 'Quand le chat est content, il fait un bruit : rrron rrron.'),
      sl(sv(G(105, 170, 1.1, cat(false)) + L(125, 202, 205, 178, '#8a8fa8', 3) + C(285, 150, 92, '#fff') + R(250, 66, 70, 168, '#fbd5d5', 30) + E(262, 150, 9, 32, '#e8594f') + E(308, 150, 9, 32, '#e8594f') + arrow(268, 112, 284, 112, '#2f80ed', 4) + arrow(302, 112, 286, 112, '#2f80ed', 4) + arrow(284, 192, 268, 192, '#2f80ed', 4) + arrow(288, 192, 304, 192, '#2f80ed', 4), '#fff3e0'),
        '它的喉咙里有小肌肉，一松一紧，动得很快。', 'tā de hóu lóng li yǒu xiǎo jī ròu, yì sōng yì jǐn, dòng de hěn kuài.', 'Dans sa gorge, de petits muscles se serrent et se relâchent très vite.'),
      sl(sv(G(120, 165, 1.4, cat(true)) + arrow(30, 70, 84, 130, '#5bb8f0') + P('M200 130 q18 28 0 56') + P('M226 116 q26 40 0 84') + P('M254 102 q34 52 0 112'), '#fff3e0'),
        '空气经过，喉咙一抖，就发出声音了。', 'kōng qì jīng guò, hóu lóng yì dǒu, jiù fā chū shēng yīn le.', 'L\'air passe, la gorge vibre, et le son sort.'),
    ],
    fact: tx('猫咪受伤或者害怕的时候，也会打呼噜。', 'māo mī shòu shāng huò zhě hài pà de shí hou, yě huì dǎ hū lu.', 'Un chat blessé ou apeuré peut aussi ronronner.'),
    quiz: [
      qz('猫咪的呼噜声从哪里来？', 'māo mī de hū lu shēng cóng nǎ li lái', 'D\'où vient le ronron du chat?', 0,
        op('喉咙', 'hóu lóng', 'De sa gorge', '😺'), op('尾巴', 'wěi ba', 'De sa queue', '🐾'), op('耳朵', 'ěr duo', 'De ses oreilles', '👂')),
      qz('猫咪开心的时候会怎么样？', 'māo mī kāi xīn de shí hou huì zěn me yàng', 'Que fait le chat quand il est content?', 1,
        op('汪汪叫', 'wāng wāng jiào', 'Il aboie', '🐶'), op('打呼噜', 'dǎ hū lu', 'Il ronronne', '😺'), op('学鸟飞', 'xué niǎo fēi', 'Il imite l\'oiseau qui vole', '🐦')),
    ],
  },
  {
    id: 'animaux-chien-langue', cat: 'animaux', emoji: '🐶', level: 1,
    q: tx('为什么狗会伸舌头？', 'wèi shén me gǒu huì shēn shé tou', 'Pourquoi le chien tire-t-il la langue?'),
    slides: [
      sl(sv(sun(335, 60, 26) + ground(250) + G(185, 150, 1.6, dog(true)), '#fff0d6'),
        '天热的时候，狗狗会张嘴伸出舌头。', 'tiān rè de shí hou, gǒu gou huì zhāng zuǐ shēn chū shé tou.', 'Quand il fait chaud, le chien ouvre la gueule et sort la langue.'),
      sl(sv(G(150, 150, 1.3, dog(true)) + drop(78, 170, 1.2) + drop(100, 215, 1) + drop(222, 175, 1.2) + cross(150, 215, 1.6) + arrow(300, 200, 196, 190, '#2f80ed'), '#fff0d6'),
        '狗狗不太会出汗，要靠嘴巴来散热。', 'gǒu gou bú tài huì chū hàn, yào kào zuǐ ba lái sàn rè.', 'Le chien ne transpire presque pas : il se refroidit par la gueule.'),
      sl(sv(sun(340, 50, 20) + G(140, 160, 1.4, dog(true)) + arrow(20, 205, 90, 205, '#5bb8f0') + vap(215, 215) + vap(240, 225) + vap(262, 215), '#fff0d6'),
        '湿湿的舌头吹着风，水变成水汽，身体就凉快了。', 'shī shī de shé tou chuī zhe fēng, shuǐ biàn chéng shuǐ qì, shēn tǐ jiù liáng kuai le.', 'La langue mouillée au vent perd son eau en vapeur, et le corps se rafraîchit.'),
    ],
    fact: tx('狗狗的脚底有汗腺，会出一点点汗。', 'gǒu gou de jiǎo dǐ yǒu hàn xiàn, huì chū yì diǎn diǎn hàn.', 'Le chien transpire un tout petit peu par les coussinets de ses pattes.'),
    quiz: [
      qz('狗狗为什么伸舌头？', 'gǒu gou wèi shén me shēn shé tou', 'Pourquoi le chien tire-t-il la langue?', 0,
        op('让身体凉快', 'ràng shēn tǐ liáng kuai', 'Pour se rafraîchir', '😌'), op('想唱歌', 'xiǎng chàng gē', 'Pour chanter', '🎤'), op('想睡觉', 'xiǎng shuì jiào', 'Pour dormir', '😴')),
      qz('天气很热，狗狗会怎么做？', 'tiān qì hěn rè, gǒu gou huì zěn me zuò', 'Quand il fait très chaud, que fait le chien?', 2,
        op('穿上毛衣', 'chuān shàng máo yī', 'Il met un chandail', '🧶'), op('喝热汤', 'hē rè tāng', 'Il boit de la soupe chaude', '🍲'), op('张嘴伸舌头', 'zhāng zuǐ shēn shé tou', 'Il ouvre la gueule, langue dehors', '🐶')),
    ],
  },
  {
    id: 'animaux-erable-rouge', cat: 'animaux', emoji: '🍁', level: 1,
    q: tx('枫叶为什么秋天会变红？', 'fēng yè wèi shén me qiū tiān huì biàn hóng', 'Pourquoi les feuilles d\'érable rougissent-elles à l\'automne?'),
    slides: [
      sl(sv(sun(60, 55, 22) + cloud(300, 50) + ground(250) + tree(150, 250, 1.7) + maple(320, 150, 2.4, '#4fae3f'), '#dff2fb'),
        '夏天，枫叶里有很多绿色，所以是绿的。', 'xià tiān, fēng yè li yǒu hěn duō lǜ sè, suǒ yǐ shì lǜ de.', 'L\'été, la feuille contient beaucoup de vert : elle est verte.'),
      sl(sv(sun(60, 50, 12) + cloud(330, 50, 0.8) + maple(80, 160, 2.6, '#5fb04a') + maple(200, 160, 2.6, '#c8c640') + maple(320, 160, 2.6, '#e8903a') + arrow(130, 160, 152, 160, '#3a3f55', 5) + arrow(250, 160, 272, 160, '#3a3f55', 5), '#e6eef7'),
        '秋天天气变冷，阳光变少，绿色就慢慢消失了。', 'qiū tiān tiān qì biàn lěng, yáng guāng biàn shǎo, lǜ sè jiù màn màn xiāo shī le.', 'À l\'automne, il fait plus froid, il y a moins de soleil et le vert disparaît peu à peu.'),
      sl(sv(ground(250, '#e8c98a') + tree(200, 250, 1.9, '#e0452f') + maple(70, 120, 1, '#e0452f', 30) + maple(330, 100, 1, '#e8903a', -20) + maple(95, 215, 1, '#e0452f', 70) + maple(300, 230, 1, '#e8903a', 140) + maple(350, 190, 0.8, '#e0452f', 10), '#fde9d2'),
        '叶子还会做出红色，枫叶就变红啦！', 'yè zi hái huì zuò chū hóng sè, fēng yè jiù biàn hóng la!', 'La feuille fabrique aussi du rouge : elle devient rouge!'),
    ],
    fact: tx('魁北克的秋天，满山的枫叶红得像火一样。', 'kuí běi kè de qiū tiān, mǎn shān de fēng yè hóng de xiàng huǒ yí yàng.', 'À l\'automne, au Québec, les montagnes deviennent rouges comme du feu.'),
    quiz: [
      qz('夏天的枫叶是什么颜色？', 'xià tiān de fēng yè shì shén me yán sè', 'De quelle couleur est la feuille d\'érable en été?', 1,
        op('红色', 'hóng sè', 'Rouge', '🔴'), op('绿色', 'lǜ sè', 'Vert', '🟢'), op('蓝色', 'lán sè', 'Bleu', '🔵')),
      qz('秋天，枫叶里的绿色会怎么样？', 'qiū tiān, fēng yè li de lǜ sè huì zěn me yàng', 'À l\'automne, que devient le vert de la feuille?', 0,
        op('慢慢变少', 'màn màn biàn shǎo', 'Il diminue peu à peu', '🍃'), op('变得更多', 'biàn de gèng duō', 'Il devient plus fort', '➕'), op('变成蓝色', 'biàn chéng lán sè', 'Il devient bleu', '🔵')),
    ],
  },
  {
    id: 'animaux-ours-hiberne', cat: 'animaux', emoji: '🐻', level: 1,
    q: tx('熊为什么要冬眠？', 'xióng wèi shén me yào dōng mián', 'Pourquoi l\'ours hiberne-t-il?'),
    slides: [
      sl(sv(ground(245, '#fff') + snow(16) + R(310, 120, 16, 126, '#9a6a3c', 3) + L(318, 150, 290, 120, '#9a6a3c', 6) + L(318, 140, 345, 112, '#9a6a3c', 6) + G(150, 170, 1.3, bear(false)), '#dbe7f3'),
        '冬天雪很厚，熊找不到吃的。', 'dōng tiān xuě hěn hòu, xióng zhǎo bu dào chī de.', 'L\'hiver, la neige est épaisse et l\'ours ne trouve rien à manger.'),
      sl(sv(sun(340, 50, 22) + ground(250) + G(80, 215, 0.7, fish()) + C(300, 232, 10, '#d6336c') + C(322, 238, 10, '#d6336c') + C(311, 218, 10, '#d6336c') + G(190, 165, 1.4, bear(false) + E(0, 42, 30, 22, '#ffe08a')), '#fff1d6'),
        '秋天，熊吃很多东西，身上长出厚厚的脂肪。', 'qiū tiān, xióng chī hěn duō dōng xi, shēn shang zhǎng chū hòu hòu de zhī fáng.', 'À l\'automne, l\'ours mange beaucoup et fait une épaisse couche de gras.'),
      sl(sv(R(0, 0, 400, 150, '#fff', 0) + snow(12) + dirt(150) + E(200, 215, 120, 62, '#6b4a2b') + G(190, 225, 0.85, bear(true)) + zz(268, 190, 1.2) + zz(290, 170, 0.9) + heart(335, 255, 0.9), '#cfe3f5'),
        '冬天它躲进洞里睡觉，心跳变慢，靠脂肪过冬。', 'dōng tiān tā duǒ jìn dòng li shuì jiào, xīn tiào biàn màn, kào zhī fáng guò dōng.', 'L\'hiver, il dort dans sa tanière, son coeur ralentit et il vit de son gras.'),
    ],
    fact: tx('熊妈妈会在洞里生下熊宝宝。', 'xióng mā ma huì zài dòng li shēng xià xióng bǎo bao', 'Maman ours donne naissance à ses oursons dans la tanière.'),
    quiz: [
      qz('熊冬眠的时候在哪里？', 'xióng dōng mián de shí hou zài nǎ li', 'Où l\'ours passe-t-il l\'hiver?', 2,
        op('树顶上', 'shù dǐng shang', 'Au sommet d\'un arbre', '🌳'), op('河里', 'hé li', 'Dans la rivière', '🌊'), op('洞里', 'dòng li', 'Dans une tanière', '🕳️')),
      qz('冬眠的熊靠什么过冬？', 'dōng mián de xióng kào shén me guò dōng', 'De quoi l\'ours vit-il pendant l\'hiver?', 0,
        op('身上的脂肪', 'shēn shang de zhī fáng', 'Du gras de son corps', '🥓'), op('吃雪人', 'chī xuě rén', 'Il mange un bonhomme de neige', '⛄'), op('喝汽水', 'hē qì shuǐ', 'Il boit de la liqueur', '🥤')),
    ],
  },
  {
    id: 'animaux-castor-barrage', cat: 'animaux', emoji: '🦫', level: 1,
    q: tx('河狸为什么要造水坝？', 'hé lí wèi shén me yào zào shuǐ bà', 'Pourquoi le castor construit-il un barrage?'),
    slides: [
      sl(sv(ground(245) + tree(310, 245, 1.2) + P('M296 190 L306 196 L296 204Z', '#c98a2b') + R(40, 224, 64, 16, '#9a6a3c', 8) + R(60, 208, 56, 16, '#b07a46', 8) + G(190, 215, 1, beaver()) + L(60, 225, 80, 225, '#6b4a2b', 2), '#dff2fb'),
        '河狸用大牙齿咬断树，搬来树枝和泥巴。', 'hé lí yòng dà yá chǐ yǎo duàn shù, bān lái shù zhī hé ní ba.', 'Le castor coupe les arbres avec ses grandes dents et apporte des branches et de la boue.'),
      sl(sv(R(0, 230, 400, 70, '#a9794f', 0) + R(0, 120, 232, 112, '#8fd0f5', 0) + R(256, 196, 144, 36, '#8fd0f5', 0) + R(226, 100, 32, 132, '#9a6a3c', 6) + L(232, 120, 252, 130, S, 2) + L(232, 150, 252, 160, S, 2) + L(232, 180, 252, 190, S, 2) + L(226, 232, 256, 232, S, 3) + arrow(40, 170, 205, 170, '#2f80ed') + G(242, 88, 0.55, beaver()), '#dff2fb'),
        '它们把水拦住，河里就有了一个大水塘。', 'tā men bǎ shuǐ lán zhù, hé li jiù yǒu le yí gè dà shuǐ táng.', 'Ils arrêtent l\'eau, et la rivière devient un grand étang.'),
      sl(sv(P('M110 175 Q200 50 290 175Z', '#9a6a3c') + L(140, 130, 180, 110, S, 2) + L(210, 100, 250, 130, S, 2) + L(130, 160, 270, 160, S, 2) + R(190, 180, 22, 56, '#6b4a2b', 4) + `<rect x="0" y="175" width="400" height="125" fill="#8fd0f5" fill-opacity=".78"/><path d="M0 175 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="${S}" stroke-width="3"/>` + G(110, 245, 0.55, beaver()) + arrow(150, 245, 192, 232, '#ef6a5b'), '#dff2fb'),
        '水塘里的小木屋，入口在水下，狼不容易进来。', 'shuǐ táng li de xiǎo mù wū, rù kǒu zài shuǐ xià, láng bù róng yì jìn lái.', 'La hutte est dans l\'étang, son entrée est sous l\'eau : les loups y entrent difficilement.'),
    ],
    fact: tx('河狸的大牙齿会一直长，所以要常常咬木头。', 'hé lí de dà yá chǐ huì yì zhí zhǎng, suǒ yǐ yào cháng cháng yǎo mù tou', 'Les dents du castor poussent toute sa vie : il doit souvent ronger du bois.'),
    quiz: [
      qz('河狸用什么咬断树？', 'hé lí yòng shén me yǎo duàn shù', 'Avec quoi le castor coupe-t-il les arbres?', 1,
        op('眼睛', 'yǎn jing', 'Avec ses yeux', '👀'), op('大牙齿', 'dà yá chǐ', 'Avec ses grandes dents', '🦷'), op('耳朵', 'ěr duo', 'Avec ses oreilles', '👂')),
      qz('河狸的水坝会让河里出现什么？', 'hé lí de shuǐ bà huì ràng hé li chū xiàn shén me', 'Que fait apparaître le barrage du castor?', 0,
        op('水塘', 'shuǐ táng', 'Un étang', '💧'), op('沙漠', 'shā mò', 'Un désert', '🏜️'), op('火山', 'huǒ shān', 'Un volcan', '🌋')),
    ],
  },
  {
    id: 'animaux-poisson-respire', cat: 'animaux', emoji: '🐟', level: 1,
    q: tx('鱼为什么在水里能呼吸？', 'yú wèi shén me zài shuǐ li néng hū xī', 'Pourquoi les poissons respirent-ils sous l\'eau?'),
    slides: [
      sl(sv(G(200, 150, 1.5, fish()) + [[70, 80], [110, 220], [320, 70], [340, 230], [60, 170], [290, 250], [250, 60]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="7" fill="#fff" stroke="${S}" stroke-width="2"/>`).join(''), '#8fd0f5'),
        '水里有一点点氧气。', 'shuǐ li yǒu yì diǎn diǎn yǎng qì.', 'Il y a un peu d\'oxygène dans l\'eau.'),
      sl(sv(G(190, 150, 2, fish()) + arrow(370, 150, 285, 150, '#2f80ed') + arrow(218, 175, 218, 250, '#2f80ed') + arrow(236, 175, 262, 250, '#2f80ed'), '#bfe6fa'),
        '鱼的嘴巴吞进水，水从鳃那里流出去。', 'yú de zuǐ ba tūn jìn shuǐ, shuǐ cóng sāi nà li liú chū qù.', 'Le poisson avale de l\'eau, qui ressort par ses branchies.'),
      sl(sv(C(200, 150, 112, '#fff') + R(0, 118, 200, 64, '#bfe6fa', 0).replace('stroke="#3a3f55"', 'stroke="none"') + [160, 185, 210, 235].map((x) => R(x, 90, 12, 120, '#ef6a5b', 6)).join('') + [[60, 140], [80, 165], [100, 135], [125, 160]].map(([a, b]) => C(a, b, 6, '#5bb8f0')).join('') + arrow(70, 150, 150, 150, '#2f80ed', 4), '#bfe6fa'),
        '鳃把氧气留下来，送进鱼的身体里。', 'sāi bǎ yǎng qì liú xià lái, sòng jìn yú de shēn tǐ li.', 'Les branchies gardent l\'oxygène et l\'envoient dans le corps du poisson.'),
    ],
    fact: tx('鱼离开水，鳃会黏在一起，就不好呼吸了。', 'yú lí kāi shuǐ, sāi huì nián zài yì qǐ, jiù bù hǎo hū xī le', 'Hors de l\'eau, les branchies collent ensemble et le poisson respire mal.'),
    quiz: [
      qz('鱼用什么在水里呼吸？', 'yú yòng shén me zài shuǐ li hū xī', 'Avec quoi le poisson respire-t-il sous l\'eau?', 2,
        op('鼻子', 'bí zi', 'Avec son nez', '👃'), op('尾巴', 'wěi ba', 'Avec sa queue', '🐟'), op('鳃', 'sāi', 'Avec ses branchies', '🐠')),
      qz('鱼从哪里吞进水？', 'yú cóng nǎ li tūn jìn shuǐ', 'Par où le poisson avale-t-il l\'eau?', 1,
        op('眼睛', 'yǎn jing', 'Par ses yeux', '👀'), op('嘴巴', 'zuǐ ba', 'Par sa bouche', '👄'), op('尾巴', 'wěi ba', 'Par sa queue', '🐟')),
    ],
  },
  {
    id: 'animaux-girafe-cou', cat: 'animaux', emoji: '🦒', level: 1,
    q: tx('长颈鹿的脖子为什么这么长？', 'cháng jǐng lù de bó zi wèi shén me zhè me cháng', 'Pourquoi la girafe a-t-elle un si long cou?'),
    slides: [
      sl(sv(ground(250) + G(320, 250, 1.8, tree()) + G(125, 128, 1.2, giraffe()), '#e8f5fd'),
        '长颈鹿爱吃高高树上的嫩叶。', 'cháng jǐng lù ài chī gāo gāo shù shang de nèn yè.', 'La girafe adore les jeunes feuilles tout en haut des arbres.'),
      sl(sv(ground(250) + G(325, 250, 1.8, tree()) + L(40, 128, 380, 128, '#ef6a5b', 3).replace('stroke-linecap="round"', 'stroke-linecap="round" stroke-dasharray="8 8"') + G(70, 205, 0.55, zebra()) + cross(160, 175, 1.2) + G(235, 128, 1.2, giraffe()) + check(285, 70, 1.3), '#e8f5fd'),
        '脖子长，就能吃到别的动物够不着的叶子。', 'bó zi cháng, jiù néng chī dào bié de dòng wù gòu bu zháo de yè zi.', 'Avec son long cou, elle atteint des feuilles que les autres animaux ne peuvent pas attraper.'),
    ],
    fact: tx('长颈鹿的脖子里有七块骨头，和我们一样多。', 'cháng jǐng lù de bó zi li yǒu qī kuài gǔ tou, hé wǒ men yí yàng duō', 'Le cou de la girafe a sept os, comme le nôtre.'),
    quiz: [
      qz('长颈鹿爱吃什么？', 'cháng jǐng lù ài chī shén me', 'Qu\'aime manger la girafe?', 0,
        op('树上的嫩叶', 'shù shang de nèn yè', 'Des jeunes feuilles d\'arbre', '🌿'), op('小鱼', 'xiǎo yú', 'De petits poissons', '🐟'), op('肉', 'ròu', 'De la viande', '🥩')),
      qz('长脖子能帮长颈鹿做什么？', 'cháng bó zi néng bāng cháng jǐng lù zuò shén me', 'À quoi sert le long cou de la girafe?', 2,
        op('在水里游泳', 'zài shuǐ li yóu yǒng', 'À nager', '🏊'), op('钻进小洞里', 'zuān jìn xiǎo dòng li', 'À se faufiler dans un petit trou', '🕳️'), op('吃到高处的叶子', 'chī dào gāo chù de yè zi', 'À atteindre les feuilles en hauteur', '🌳')),
    ],
  },
  {
    id: 'animaux-abeille-miel', cat: 'animaux', emoji: '🐝', level: 1,
    q: tx('蜜蜂为什么要采蜜？', 'mì fēng wèi shén me yào cǎi mì', 'Pourquoi les abeilles récoltent-elles le nectar?'),
    slides: [
      sl(sv(ground(250) + flower(200, 170, 1.8, '#ff8fb1', 80) + G(268, 120, 1.3, bee()) + hdrop(200, 168, 1.1), '#e8f5fd'),
        '蜜蜂飞到花上，吸走甜甜的花蜜。', 'mì fēng fēi dào huā shang, xī zǒu tián tián de huā mì.', 'L\'abeille vole sur une fleur et aspire le nectar sucré.'),
      sl(sv(ground(250) + flower(60, 200, 1.2, '#ff8fb1', 50) + G(110, 110, 1.1, bee()) + arrow(165, 120, 255, 150) + hive(310, 175, 1.9), '#e8f5fd'),
        '它把花蜜带回蜂巢，酿成蜂蜜。', 'tā bǎ huā mì dài huí fēng cháo, niàng chéng fēng mì.', 'Elle rapporte le nectar à la ruche, où il devient du miel.'),
      sl(sv(ground(260, '#fff') + snow(10) + R(70, 60, 260, 190, '#ffe9a8', 30) + [[130, 110], [190, 110], [250, 110], [160, 160], [220, 160], [280, 160], [130, 210], [190, 210], [250, 210]].map(([a, b], i) => hex(a, b, 30, i % 3 === 1 ? '#f5a623' : '#f5a623')).join('') + G(190, 160, 0.5, bee()) + G(250, 210, 0.5, bee()), '#cfe3f5'),
        '蜂蜜是蜜蜂一家的食物，冬天也能吃。', 'fēng mì shì mì fēng yì jiā de shí wù, dōng tiān yě néng chī.', 'Le miel nourrit toute la famille, même l\'hiver.'),
    ],
    fact: tx('蜜蜂的翅膀每秒扇动两百多次。', 'mì fēng de chì bǎng měi miǎo shān dòng liǎng bǎi duō cì', 'Une abeille bat des ailes plus de deux cents fois par seconde.'),
    quiz: [
      qz('蜜蜂从花里采走什么？', 'mì fēng cóng huā li cǎi zǒu shén me', 'Que prend l\'abeille dans la fleur?', 0,
        op('花蜜', 'huā mì', 'Du nectar', '🍯'), op('泥土', 'ní tǔ', 'De la terre', '🟤'), op('石头', 'shí tou', 'Des cailloux', '🪨')),
      qz('蜜蜂把花蜜带回哪里？', 'mì fēng bǎ huā mì dài huí nǎ li', 'Où l\'abeille rapporte-t-elle le nectar?', 1,
        op('鸟窝', 'niǎo wō', 'Dans un nid d\'oiseau', '🪹'), op('蜂巢', 'fēng cháo', 'Dans la ruche', '🐝'), op('河边', 'hé biān', 'Au bord de la rivière', '🏞️')),
    ],
  },
  {
    id: 'animaux-plantes-soleil', cat: 'animaux', emoji: '🌱', level: 1,
    q: tx('植物为什么需要阳光？', 'zhí wù wèi shén me xū yào yáng guāng', 'Pourquoi les plantes ont-elles besoin de soleil?'),
    slides: [
      sl(sv(sun(60, 55, 22) + ground(250) + sprout(200, 250, 3.2) + C(170, 120, 7, '#ffd34d') + C(232, 112, 7, '#ffd34d') + C(188, 100, 6, '#ffd34d') + arrow(200, 135, 200, 195, '#f5a623'), '#e8f5fd'),
        '植物不会吃东西，它们自己做食物。', 'zhí wù bú huì chī dōng xi, tā men zì jǐ zuò shí wù.', 'Les plantes ne mangent pas : elles fabriquent leur nourriture.'),
      sl(sv(sun(60, 60, 24) + cloud(340, 60) + drop(50, 230, 1.5) + leaf(200, 150, 3.4, '#6cc24a') + arrow(105, 95, 165, 125) + arrow(310, 90, 245, 125) + arrow(80, 225, 160, 190, '#2f80ed') + arrow(230, 215, 290, 250, '#f5a623') + C(315, 262, 12, '#ffd34d'), '#e8f5fd'),
        '叶子用阳光、水和空气，做出养分。', 'yè zi yòng yáng guāng, shuǐ hé kōng qì, zuò chū yǎng fèn.', 'La feuille utilise le soleil, l\'eau et l\'air pour faire sa nourriture.'),
      sl(sv(panel(15, 30, 175, 235, '#fff7d1') + sun(60, 75, 16) + G(105, 240, 1, L(0, 0, 0, -80, '#4c9a3a', 6) + leaf(-18, -84, 1, '#6cc24a', -50) + leaf(18, -92, 1, '#6cc24a', 50)) + panel(210, 30, 175, 235, '#aab2cc') + star(340, 70) + moon(250, 75) + G(300, 240, 1, L(0, 0, 0, -36, '#9aa34a', 6) + leaf(-12, -34, 0.8, '#d6c94a', -95) + leaf(14, -30, 0.8, '#d6c94a', 95)) + check(105, 280, 0.6) + cross(300, 280, 0.6), '#e8f5fd'),
        '没有阳光，植物就长不好，叶子会发黄。', 'méi yǒu yáng guāng, zhí wù jiù zhǎng bu hǎo, yè zi huì fā huáng.', 'Sans soleil, la plante pousse mal et ses feuilles jaunissent.'),
    ],
    fact: tx('植物做养分的时候，还会放出氧气给我们呼吸。', 'zhí wù zuò yǎng fèn de shí hou, hái huì fàng chū yǎng qì gěi wǒ men hū xī', 'En fabriquant sa nourriture, la plante rejette l\'oxygène que nous respirons.'),
    quiz: [
      qz('植物用什么做食物？', 'zhí wù yòng shén me zuò shí wù', 'Avec quoi la plante fabrique-t-elle sa nourriture?', 0,
        op('阳光、水和空气', 'yáng guāng shuǐ hé kōng qì', 'Soleil, eau et air', '☀️'), op('巧克力和牛奶', 'qiǎo kè lì hé niú nǎi', 'Chocolat et lait', '🍫'), op('玩具和石头', 'wán jù hé shí tou', 'Jouets et cailloux', '🧸')),
      qz('植物会放出什么让我们呼吸？', 'zhí wù huì fàng chū shén me ràng wǒ men hū xī', 'Que rejette la plante pour que nous respirions?', 1,
        op('汽油', 'qì yóu', 'De l\'essence', '⛽'), op('氧气', 'yǎng qì', 'De l\'oxygène', '💨'), op('烟', 'yān', 'De la fumée', '🌫️')),
    ],
  },
  {
    id: 'animaux-graine-germe', cat: 'animaux', emoji: '🌰', level: 1,
    q: tx('种子为什么会发芽？', 'zhǒng zi wèi shén me huì fā yá', 'Pourquoi une graine germe-t-elle?'),
    slides: [
      sl(sv(E(200, 150, 100, 74, '#c9a06a') + E(200, 154, 82, 58, '#fff3d0') + G(185, 190, 1.6, L(0, 0, 0, -30, '#4c9a3a', 5) + leaf(-10, -32, 0.6, '#6cc24a', -60) + leaf(10, -34, 0.6, '#6cc24a', 60)) + C(240, 130, 10, '#ffe08a') + C(255, 165, 9, '#ffe08a') + C(228, 168, 8, '#ffe08a'), '#fdf3e0'),
        '种子里面有一棵小小的植物宝宝，还有食物。', 'zhǒng zi lǐ miàn yǒu yì kē xiǎo xiǎo de zhí wù bǎo bao, hái yǒu shí wù.', 'Dans la graine, il y a une minuscule plante et de la nourriture.'),
      sl(sv(sun(340, 55, 22) + dirt(170) + E(200, 215, 24, 15, '#c9a06a') + drop(160, 70, 1.6) + drop(200, 50, 1.6) + drop(240, 80, 1.6) + arrow(200, 100, 200, 185, '#5bb8f0'), '#e8f5fd'),
        '种子碰到水，又很暖和，就醒来了。', 'zhǒng zi pèng dào shuǐ, yòu hěn nuǎn huo, jiù xǐng lái le.', 'La graine reçoit de l\'eau et de la chaleur : elle se réveille.'),
      sl(sv(sun(340, 55, 22) + dirt(150) + `<path d="M200 150 Q195 190 205 235 M203 195 Q230 210 242 245 M198 190 Q170 205 162 238" fill="none" stroke="#f5e6c8" stroke-width="6" stroke-linecap="round"/>` + sprout(200, 150, 2.2) + arrow(285, 140, 285, 70, '#3fae4c') + arrow(285, 175, 285, 255, '#ef6a5b'), '#e8f5fd'),
        '根往下扎，嫩芽往上钻，小苗长出来啦。', 'gēn wǎng xià zhā, nèn yá wǎng shàng zuān, xiǎo miáo zhǎng chū lái la.', 'La racine descend, la pousse monte : une petite plante est née!'),
    ],
    fact: tx('有的种子能睡上好多年，等到有水才发芽。', 'yǒu de zhǒng zi néng shuì shàng hǎo duō nián, děng dào yǒu shuǐ cái fā yá', 'Certaines graines dorment des années et attendent l\'eau pour germer.'),
    quiz: [
      qz('种子需要什么才会发芽？', 'zhǒng zi xū yào shén me cái huì fā yá', 'De quoi une graine a-t-elle besoin pour germer?', 2,
        op('玩具', 'wán jù', 'De jouets', '🧸'), op('音乐', 'yīn yuè', 'De musique', '🎵'), op('水和暖和', 'shuǐ hé nuǎn huo', 'D\'eau et de chaleur', '💧')),
      qz('发芽时，根往哪里长？', 'fā yá shí, gēn wǎng nǎ li zhǎng', 'Quand la graine germe, vers où pousse la racine?', 1,
        op('往上', 'wǎng shàng', 'Vers le haut', '⬆️'), op('往下', 'wǎng xià', 'Vers le bas', '⬇️'), op('往天上飞', 'wǎng tiān shang fēi', 'Elle s\'envole dans le ciel', '☁️')),
    ],
  },
  {
    id: 'animaux-grenouille-coasse', cat: 'animaux', emoji: '🐸', level: 1,
    q: tx('青蛙为什么会呱呱叫？', 'qīng wā wèi shén me huì guā guā jiào', 'Pourquoi la grenouille coasse-t-elle?'),
    slides: [
      sl(sv(moon(330, 55) + star(250, 40) + star(80, 50) + water(215, '#3b6ea5') + E(115, 220, 90, 28, '#6b8e4e') + G(115, 185, 1.1, frog(0)) + P('M190 150 q14 20 0 40') + P('M215 135 q22 34 0 70') + P('M242 120 q30 50 0 100'), '#7f93c9'),
        '春天的晚上，青蛙爸爸在水边大声唱歌。', 'chūn tiān de wǎn shang, qīng wā bà ba zài shuǐ biān dà shēng chàng gē.', 'Un soir de printemps, papa grenouille chante fort au bord de l\'eau.'),
      sl(sv(ground(260, '#8fd0f5') + G(200, 150, 1.8, frog(32)) + arrow(330, 240, 262, 210), '#e6f4e1'),
        '它先吸一大口气，喉咙下的气囊就鼓起来。', 'tā xiān xī yí dà kǒu qì, hóu lóng xià de qì náng jiù gǔ qǐ lái.', 'Il prend une grande inspiration et le sac sous sa gorge se gonfle.'),
      sl(sv(water(230, '#3b6ea5') + G(100, 175, 1.2, frog(26)) + P('M170 130 q14 20 0 40') + P('M195 118 q22 34 0 64') + P('M222 106 q30 50 0 88') + G(330, 205, 0.7, frog(0)) + heart(330, 140, 1), '#7f93c9'),
        '声音传得远，是在叫青蛙姑娘来。', 'shēng yīn chuán de yuǎn, shì zài jiào qīng wā gū niang lái.', 'Le son porte loin : il appelle une grenouille.'),
    ],
    fact: tx('每一种青蛙的叫声都不一样。', 'měi yì zhǒng qīng wā de jiào shēng dōu bù yí yàng', 'Chaque espèce de grenouille a son propre chant.'),
    quiz: [
      qz('青蛙叫的时候，喉咙下面会怎么样？', 'qīng wā jiào de shí hou, hóu lóng xià mian huì zěn me yàng', 'Quand la grenouille chante, que fait le dessous de sa gorge?', 0,
        op('鼓起一个气囊', 'gǔ qǐ yí gè qì náng', 'Un sac se gonfle', '🎈'), op('长出羽毛', 'zhǎng chū yǔ máo', 'Des plumes poussent', '🪶'), op('变成蓝色', 'biàn chéng lán sè', 'Elle devient bleue', '🔵')),
      qz('青蛙爸爸为什么唱歌？', 'qīng wā bà ba wèi shén me chàng gē', 'Pourquoi papa grenouille chante-t-il?', 1,
        op('想吃雪糕', 'xiǎng chī xuě gāo', 'Il veut une crème glacée', '🍦'), op('叫青蛙姑娘来', 'jiào qīng wā gū niang lái', 'Pour appeler une grenouille', '💚'), op('想去上学', 'xiǎng qù shàng xué', 'Il veut aller à l\'école', '🎒')),
    ],
  },
  {
    id: 'animaux-chenille-papillon', cat: 'animaux', emoji: '🦋', level: 1,
    q: tx('毛毛虫为什么会变成蝴蝶？', 'máo mao chóng wèi shén me huì biàn chéng hú dié', 'Pourquoi la chenille devient-elle un papillon?'),
    slides: [
      sl(sv(leaf(200, 150, 5.5, '#6cc24a', 70) + C(150, 150, 6, '#fff6c9') + C(165, 140, 6, '#fff6c9') + C(165, 160, 6, '#fff6c9') + G(270, 150, 0.6, caterpillar(3)), '#e8f5fd'),
        '毛毛虫从叶子上的小卵里孵出来。', 'máo mao chóng cóng yè zi shang de xiǎo luǎn li fū chū lái.', 'La chenille sort d\'un petit oeuf collé sur une feuille.'),
      sl(sv(leaf(280, 150, 3.8, '#6cc24a', 90) + C(330, 110, 14, '#e8f5fd').replace('stroke="#3a3f55"', 'stroke="none"') + C(340, 160, 12, '#e8f5fd').replace('stroke="#3a3f55"', 'stroke="none"') + G(60, 220, 1.3, caterpillar(6)), '#e8f5fd'),
        '它拼命吃叶子，越长越大。', 'tā pīn mìng chī yè zi, yuè zhǎng yuè dà.', 'Elle mange des feuilles sans arrêt et grossit de plus en plus.'),
      sl(sv(tube('M30 70 Q200 40 370 70', '#9a6a3c', 14) + L(200, 56, 200, 100, S, 3) + E(200, 150, 28, 52, '#8fd16a') + P('M178 130 q22 10 44 0') + P('M176 160 q24 10 48 0'), '#e8f5fd'),
        '然后它变成蛹，挂在树枝上，身体在里面慢慢变。', 'rán hòu tā biàn chéng yǒng, guà zài shù zhī shang, shēn tǐ zài lǐ miàn màn màn biàn.', 'Elle devient chrysalide, accrochée à une branche, et son corps change à l\'intérieur.'),
      sl(sv(tube('M30 70 Q200 40 370 70', '#9a6a3c', 14) + L(120, 58, 120, 100, S, 3) + P('M120 100 Q96 150 120 200 Q144 150 120 100Z', '#d9e8c4') + G(270, 160, 1.8, butterfly()), '#e8f5fd'),
        '过了些日子，蛹裂开，蝴蝶飞出来啦！', 'guò le xiē rì zi, yǒng liè kāi, hú dié fēi chū lái la!', 'Quelques jours plus tard, la chrysalide s\'ouvre et le papillon s\'envole!'),
    ],
    fact: tx('蝴蝶用脚来尝味道。', 'hú dié yòng jiǎo lái cháng wèi dao', 'Le papillon goûte avec ses pattes.'),
    quiz: [
      qz('毛毛虫长大以后先变成什么？', 'máo mao chóng zhǎng dà yǐ hòu xiān biàn chéng shén me', 'Après avoir grandi, en quoi la chenille se transforme-t-elle d\'abord?', 2,
        op('鱼', 'yú', 'En poisson', '🐟'), op('青蛙', 'qīng wā', 'En grenouille', '🐸'), op('蛹', 'yǒng', 'En chrysalide', '🐛')),
      qz('毛毛虫最爱做什么？', 'máo mao chóng zuì ài zuò shén me', 'Que fait la chenille avec le plus d\'appétit?', 0,
        op('吃叶子', 'chī yè zi', 'Manger des feuilles', '🍃'), op('游泳', 'yóu yǒng', 'Nager', '🏊'), op('打篮球', 'dǎ lán qiú', 'Jouer au basket', '🏀')),
    ],
  },
  // ================= LEVEL 2 =================
  {
    id: 'animaux-oiseau-vole', cat: 'animaux', emoji: '🐦', level: 2,
    q: tx('鸟为什么会飞？', 'niǎo wèi shén me huì fēi', 'Pourquoi les oiseaux volent-ils?'),
    slides: [
      sl(sv(cloud(60, 50) + G(190, 160, 2, bird(0)) + C(340, 65, 42, '#fff') + P('M318 92 Q346 38 362 44 Q356 80 326 98Z', '#6bb3e8') + L(318, 92, 362, 44) + L(250, 135, 305, 85, '#8a8fa8', 3), '#e8f5fd'),
        '鸟的翅膀上长着轻轻的羽毛。', 'niǎo de chì bǎng shang zhǎng zhe qīng qīng de yǔ máo.', 'Les ailes de l\'oiseau sont couvertes de plumes légères.'),
      sl(sv(G(140, 160, 1.8, bird(0)) + R(95, 152, 90, 20, '#fff', 10) + C(320, 120, 62, '#fff') + C(320, 120, 46, '#6bb3e8') + C(320, 120, 30, '#e8f5fd') + L(320, 90, 320, 150, S, 3) + L(290, 120, 350, 120, S, 3) + L(186, 162, 262, 128, '#8a8fa8', 3), '#e8f5fd'),
        '鸟的骨头很多是空心的，所以身体很轻。', 'niǎo de gǔ tou hěn duō shì kōng xīn de, suǒ yǐ shēn tǐ hěn qīng.', 'Beaucoup d\'os d\'oiseau sont creux : son corps est léger.'),
      sl(sv(cloud(330, 50) + G(190, 130, 1.6, bird(1)) + arrow(110, 175, 110, 250, '#2f80ed') + arrow(150, 185, 150, 260, '#2f80ed') + arrow(190, 190, 190, 262, '#2f80ed') + arrow(300, 190, 300, 80, '#3fae4c', 8), '#e8f5fd'),
        '翅膀向下拍，把空气往下推，鸟就被托起来。', 'chì bǎng xiàng xià pāi, bǎ kōng qì wǎng xià tuī, niǎo jiù bèi tuō qǐ lái.', 'L\'aile pousse l\'air vers le bas, et l\'oiseau est soulevé.'),
    ],
    fact: tx('有的鸟，比如企鹅，不会飞，但是会游泳。', 'yǒu de niǎo, bǐ rú qǐ é, bú huì fēi, dàn shì huì yóu yǒng', 'Certains oiseaux, comme le manchot, ne volent pas mais nagent bien.'),
    quiz: [
      qz('鸟靠什么飞起来？', 'niǎo kào shén me fēi qǐ lái', 'Qu\'est-ce qui fait voler l\'oiseau?', 2,
        op('四条腿', 'sì tiáo tuǐ', 'Quatre pattes', '🦵'), op('大尾巴', 'dà wěi ba', 'Une grosse queue', '🦊'), op('翅膀拍空气', 'chì bǎng pāi kōng qì', 'Ses ailes qui battent l\'air', '🪽')),
      qz('鸟的身体为什么很轻？', 'niǎo de shēn tǐ wèi shén me hěn qīng', 'Pourquoi le corps de l\'oiseau est-il léger?', 0,
        op('很多骨头是空心的', 'hěn duō gǔ tou shì kōng xīn de', 'Beaucoup d\'os sont creux', '🦴'), op('吃了很多石头', 'chī le hěn duō shí tou', 'Il mange beaucoup de cailloux', '🪨'), op('身体里装满水', 'shēn tǐ li zhuāng mǎn shuǐ', 'Son corps est plein d\'eau', '💧')),
    ],
  },
  {
    id: 'animaux-zebre-rayures', cat: 'animaux', emoji: '🦓', level: 2,
    q: tx('斑马为什么有条纹？', 'bān mǎ wèi shén me yǒu tiáo wén', 'Pourquoi le zèbre a-t-il des rayures?'),
    slides: [
      sl(sv(ground(255) + G(95, 165, 1, zebra()) + G(305, 165, 1, zebra(), 0, true), '#e8f5fd'),
        '每匹斑马的条纹都不一样，像指纹一样。', 'měi pǐ bān mǎ de tiáo wén dōu bù yí yàng, xiàng zhǐ wén yí yàng.', 'Chaque zèbre a des rayures différentes, comme des empreintes digitales.'),
      sl(sv(ground(255) + G(100, 165, 0.9, zebra().replace(/<line[^>]*stroke-width="6"[^>]*\/>/g, '').replace(/fill="#fff"/g, 'fill="#c98a4b"')) + [[70, 120], [100, 110], [130, 125]].map(([a, b]) => C(a, b, 5, S) + E(a, b - 5, 5, 3, '#dff3ff')).join('') + G(295, 165, 0.9, zebra(), 0, true) + arrow(280, 100, 245, 60, '#ef6a5b', 4) + arrow(310, 100, 345, 60, '#ef6a5b', 4) + C(240, 50, 5, S) + C(350, 50, 5, S) + cross(295, 70, 0.8), '#e8f5fd'),
        '科学家发现，吸血的苍蝇不爱落在条纹上。', 'kē xué jiā fā xiàn, xī xuè de cāng ying bú ài luò zài tiáo wén shàng.', 'Des scientifiques ont constaté que les mouches piqueuses se posent moins sur les rayures.'),
    ],
    fact: tx('小斑马出生后不久就能站起来跑。', 'xiǎo bān mǎ chū shēng hòu bù jiǔ jiù néng zhàn qǐ lái pǎo', 'Le bébé zèbre se lève et court peu après sa naissance.'),
    quiz: [
      qz('每匹斑马的条纹怎么样？', 'měi pǐ bān mǎ de tiáo wén zěn me yàng', 'Comment sont les rayures de chaque zèbre?', 2,
        op('都一模一样', 'dōu yì mú yí yàng', 'Toutes identiques', '🟰'), op('都是红色', 'dōu shì hóng sè', 'Toutes rouges', '🔴'), op('都不一样', 'dōu bù yí yàng', 'Toutes différentes', '🦓')),
      qz('科学家发现，什么不爱落在斑马身上？', 'kē xué jiā fā xiàn, shén me bú ài luò zài bān mǎ shēn shang', 'Selon les scientifiques, qu\'est-ce qui se pose moins sur le zèbre?', 1,
        op('月亮', 'yuè liang', 'La lune', '🌙'), op('吸血的苍蝇', 'xī xuè de cāng ying', 'Les mouches piqueuses', '🪰'), op('彩虹', 'cǎi hóng', 'L\'arc-en-ciel', '🌈')),
    ],
  },
  {
    id: 'animaux-cactus-epines', cat: 'animaux', emoji: '🌵', level: 2,
    q: tx('仙人掌为什么有刺？', 'xiān rén zhǎng wèi shén me yǒu cì', 'Pourquoi le cactus a-t-il des épines?'),
    slides: [
      sl(sv(sun(330, 55, 26) + ground(235, '#f2d9a0') + G(170, 235, 2, cactus()), '#fdebc8'),
        '仙人掌住在很干的沙漠里，很少下雨。', 'xiān rén zhǎng zhù zài hěn gān de shā mò li, hěn shǎo xià yǔ.', 'Le cactus vit dans le désert très sec, où il pleut rarement.'),
      sl(sv(ground(250, '#f2d9a0') + G(200, 250, 2.4, cactus(true)) + drop(60, 70, 1.4) + drop(340, 90, 1.4) + arrow(60, 100, 60, 150, '#2f80ed', 4), '#fdebc8'),
        '它粗粗的身体里存着水。', 'tā cū cū de shēn tǐ li cún zhe shuǐ.', 'Son gros corps garde de l\'eau en réserve.'),
      sl(sv(ground(250, '#f2d9a0') + G(290, 250, 1.8, cactus()) + G(80, 215, 0.55, camel()) + arrow(130, 200, 205, 200, '#ef6a5b', 5) + cross(175, 170, 1.1), '#fdebc8'),
        '刺是变细的叶子，能赶走想吃它的动物。', 'cì shì biàn xì de yè zi, néng gǎn zǒu xiǎng chī tā de dòng wù.', 'Les épines sont des feuilles devenues fines : elles repoussent les animaux qui veulent le manger.'),
    ],
    fact: tx('仙人掌也会开出漂亮的花。', 'xiān rén zhǎng yě huì kāi chū piào liang de huā', 'Le cactus donne aussi de jolies fleurs.'),
    quiz: [
      qz('仙人掌住在哪里？', 'xiān rén zhǎng zhù zài nǎ li', 'Où vit le cactus?', 1,
        op('大海里', 'dà hǎi li', 'Dans la mer', '🌊'), op('沙漠', 'shā mò', 'Dans le désert', '🏜️'), op('北极', 'běi jí', 'Dans l\'Arctique', '🧊')),
      qz('仙人掌的身体里存着什么？', 'xiān rén zhǎng de shēn tǐ li cún zhe shén me', 'Que garde le cactus dans son corps?', 0,
        op('水', 'shuǐ', 'De l\'eau', '💧'), op('铁', 'tiě', 'Du fer', '⚙️'), op('糖果', 'táng guǒ', 'Des bonbons', '🍬')),
    ],
  },
  {
    id: 'animaux-manchot-froid', cat: 'animaux', emoji: '🐧', level: 2,
    q: tx('企鹅为什么不怕冷？', 'qǐ é wèi shén me bú pà lěng', 'Pourquoi le manchot n\'a-t-il pas froid?'),
    slides: [
      sl(sv(ground(262, '#fff') + G(200, 150, 2, penguin()) + drop(70, 70, 1.5) + drop(335, 85, 1.5) + arrow(85, 95, 130, 115, '#2f80ed', 4) + arrow(320, 105, 275, 120, '#2f80ed', 4), '#e6f0fa'),
        '企鹅身上有很厚很密的羽毛，水也进不去。', 'qǐ é shēn shang yǒu hěn hòu hěn mì de yǔ máo, shuǐ yě jìn bu qù.', 'Le manchot a des plumes épaisses et serrées : l\'eau n\'entre pas.'),
      sl(sv(E(200, 150, 118, 134, '#5a6180') + E(200, 150, 94, 108, '#ffe08a') + E(200, 150, 66, 80, '#f4a8a8') + heart(200, 150, 1.5) + G(345, 245, 0.55, penguin()), '#e6f0fa'),
        '羽毛下面还有一层厚厚的脂肪，像暖和的被子。', 'yǔ máo xià mian hái yǒu yì céng hòu hòu de zhī fáng, xiàng nuǎn huo de bèi zi.', 'Sous les plumes, il y a une épaisse couche de gras, comme une couverture chaude.'),
      sl(sv(ground(270, '#fff') + snow(10) + [[110, 190], [160, 180], [210, 185], [260, 180], [310, 190], [135, 220], [185, 215], [235, 218], [285, 215]].map(([a, b]) => G(a, b, 0.6, E(0, 0, 32, 46, S) + E(0, 8, 21, 34, '#fff') + P('M-7 -19 L7 -19 L0 -10Z', '#ffb347'))).join('') + heart(200, 80, 1.4), '#e6f0fa'),
        '天气特别冷，企鹅会挤在一起互相取暖。', 'tiān qì tè bié lěng, qǐ é huì jǐ zài yì qǐ hù xiāng qǔ nuǎn.', 'Quand il fait très froid, les manchots se serrent pour se réchauffer.'),
    ],
    fact: tx('帝企鹅爸爸会把蛋放在脚上，一直暖着。', 'dì qǐ é bà ba huì bǎ dàn fàng zài jiǎo shang, yì zhí nuǎn zhe', 'Le papa manchot empereur garde l\'oeuf au chaud sur ses pieds.'),
    quiz: [
      qz('企鹅靠什么保暖？', 'qǐ é kào shén me bǎo nuǎn', 'Qu\'est-ce qui garde le manchot au chaud?', 1,
        op('烤火炉', 'kǎo huǒ lú', 'Un poêle', '🔥'), op('厚羽毛和脂肪', 'hòu yǔ máo hé zhī fáng', 'Des plumes épaisses et du gras', '🐧'), op('穿羽绒服', 'chuān yǔ róng fú', 'Un manteau', '🧥')),
      qz('天气特别冷，企鹅会怎么做？', 'tiān qì tè bié lěng, qǐ é huì zěn me zuò', 'Quand il fait très froid, que font les manchots?', 2,
        op('散得很远', 'sàn de hěn yuǎn', 'Ils s\'éloignent', '↔️'), op('去洗热水澡', 'qù xǐ rè shuǐ zǎo', 'Ils prennent un bain chaud', '🛁'), op('挤在一起', 'jǐ zài yì qǐ', 'Ils se serrent ensemble', '🐧')),
    ],
  },
  {
    id: 'animaux-luciole-lumiere', cat: 'animaux', emoji: '✨', level: 2,
    q: tx('萤火虫为什么会发光？', 'yíng huǒ chóng wèi shén me huì fā guāng', 'Pourquoi les lucioles brillent-elles?'),
    slides: [
      sl(sv(moon(330, 50) + star(60, 40) + star(210, 30) + R(0, 250, 400, 50, '#2b3a2b', 0) + G(90, 190, 1, firefly()) + G(200, 120, 1, firefly()) + G(300, 200, 1, firefly()) + G(330, 120, 0.7, firefly()) + G(150, 235, 0.7, firefly()), '#2d3a66'),
        '夏天的晚上，萤火虫一闪一闪地飞。', 'xià tiān de wǎn shang, yíng huǒ chóng yì shǎn yì shǎn de fēi.', 'Les soirs d\'été, les lucioles volent en clignotant.'),
      sl(sv(G(100, 150, 1.6, firefly(true)) + L(150, 150, 215, 150, '#8a8fa8', 3) + C(300, 150, 85, '#fff') + E(300, 150, 56, 34, '#4a4e69') + E(280, 150, 32, 22, '#fff27a') + arrow(375, 90, 332, 124, '#2f80ed', 4) + C(345, 100, 5, '#5bb8f0') + C(358, 112, 5, '#5bb8f0'), '#e6eef7'),
        '它肚子里的特别物质遇到氧气，就会发光。', 'tā dù zi li de tè bié wù zhì yù dào yǎng qì, jiù huì fā guāng.', 'Une substance spéciale dans son ventre brille au contact de l\'oxygène.'),
      sl(sv(C(110, 120, 40, '#fff27a') + R(92, 156, 36, 24, '#aab2cc') + vap(55, 105, '#ef6a5b') + vap(165, 105, '#ef6a5b') + G(290, 150, 1.6, firefly(true)) + `<circle cx="290" cy="150" r="64" fill="none" stroke="#5bb8f0" stroke-width="4" stroke-dasharray="6 6"/>`, '#e6eef7'),
        '这种光几乎不发热，是冷光。', 'zhè zhǒng guāng jī hū bù fā rè, shì lěng guāng.', 'Cette lumière chauffe à peine : c\'est une lumière froide.'),
    ],
    fact: tx('萤火虫一闪一闪，是在找自己的同伴。', 'yíng huǒ chóng yì shǎn yì shǎn, shì zài zhǎo zì jǐ de tóng bàn', 'Les lucioles clignotent pour trouver leurs semblables.'),
    quiz: [
      qz('萤火虫的光是什么光？', 'yíng huǒ chóng de guāng shì shén me guāng', 'Quelle sorte de lumière est celle de la luciole?', 1,
        op('烫手的火', 'tàng shǒu de huǒ', 'Un feu brûlant', '🔥'), op('冷光', 'lěng guāng', 'Une lumière froide', '🔵'), op('太阳光', 'tài yáng guāng', 'La lumière du soleil', '☀️')),
      qz('萤火虫的光要遇到什么才会亮？', 'yíng huǒ chóng de guāng yào yù dào shén me cái huì liàng', 'Avec quoi la lumière de la luciole doit-elle se mêler pour briller?', 2,
        op('雪', 'xuě', 'De la neige', '❄️'), op('沙子', 'shā zi', 'Du sable', '🏖️'), op('氧气', 'yǎng qì', 'De l\'oxygène', '💨')),
    ],
  },
  {
    id: 'animaux-cameleon-couleur', cat: 'animaux', emoji: '🦎', level: 2,
    q: tx('变色龙为什么会变色？', 'biàn sè lóng wèi shén me huì biàn sè', 'Pourquoi le caméléon change-t-il de couleur?'),
    slides: [
      sl(sv(ground(250) + G(110, 190, 1.4, chameleon()) + L(150, 175, 232, 150, '#8a8fa8', 3) + C(300, 150, 85, '#fff') + [0, 1, 2, 3].map((i) => [0, 1, 2, 3].map((j) => R(262 + i * 20, 112 + j * 20, 12, 12, '#8fd16a', 2)).join('')).join(''), '#e8f5fd'),
        '它的皮肤里有很多极小的晶体。', 'tā de pí fū li yǒu hěn duō jí xiǎo de jīng tǐ.', 'Sa peau contient plein de minuscules cristaux.'),
      sl(sv(C(100, 150, 78, '#fff') + [0, 1, 2, 3].map((i) => [0, 1, 2, 3].map((j) => R(70 + i * 15, 120 + j * 15, 10, 10, '#8fd16a', 2)).join('')).join('') + C(300, 150, 78, '#fff') + [0, 1, 2, 3].map((i) => [0, 1, 2, 3].map((j) => R(256 + i * 28, 106 + j * 28, 10, 10, '#f08a4b', 2)).join('')).join('') + arrow(185, 150, 215, 150, S, 5), '#e8f5fd'),
        '晶体靠近或者分开，反射出来的颜色就不一样。', 'jīng tǐ kào jìn huò zhě fēn kāi, fǎn shè chū lái de yán sè jiù bù yí yàng.', 'Quand les cristaux se rapprochent ou s\'écartent, la couleur renvoyée change.'),
      sl(sv(ground(255) + G(90, 180, 0.9, chameleon('#8fd16a')) + G(200, 180, 0.9, chameleon('#f08a4b')) + G(310, 180, 0.9, chameleon('#6aa0f0')) + heart(90, 70, 1.4) + sun(200, 70, 18) + cloud(310, 70), '#e8f5fd'),
        '它变色，常常是因为心情或者温度。', 'tā biàn sè, cháng cháng shì yīn wèi xīn qíng huò zhě wēn dù.', 'Il change de couleur surtout selon son humeur ou la température.'),
    ],
    fact: tx('变色龙的两只眼睛可以各看各的。', 'biàn sè lóng de liǎng zhī yǎn jing kě yǐ gè kàn gè de', 'Un caméléon peut regarder dans deux directions avec chaque oeil.'),
    quiz: [
      qz('变色龙变色是靠什么？', 'biàn sè lóng biàn sè shì kào shén me', 'Comment le caméléon change-t-il de couleur?', 1,
        op('涂颜料', 'tú yán liào', 'Il se peint', '🎨'), op('皮肤里的小晶体', 'pí fū li de xiǎo jīng tǐ', 'Grâce aux cristaux de sa peau', '💎'), op('换衣服', 'huàn yī fu', 'Il change de vêtements', '👕')),
      qz('变色龙的眼睛有什么特别？', 'biàn sè lóng de yǎn jing yǒu shén me tè bié', 'Qu\'ont de spécial les yeux du caméléon?', 2,
        op('会发光', 'huì fā guāng', 'Ils brillent', '✨'), op('长在尾巴上', 'zhǎng zài wěi ba shang', 'Ils sont sur la queue', '🦎'), op('能各看各的', 'néng gè kàn gè de', 'Chaque oeil regarde seul', '👀')),
    ],
  },
  {
    id: 'animaux-elephant-trompe', cat: 'animaux', emoji: '🐘', level: 2,
    q: tx('大象的鼻子为什么这么长？', 'dà xiàng de bí zi wèi shén me zhè me cháng', 'Pourquoi l\'éléphant a-t-il une si longue trompe?'),
    slides: [
      sl(sv(ground(285) + G(200, 150, 1.5, elephant()) + `<circle cx="100" cy="232" r="40" fill="none" stroke="#ef6a5b" stroke-width="4" stroke-dasharray="6 6"/>`, '#f3eefb'),
        '大象的鼻子是鼻子和上嘴唇长在一起。', 'dà xiàng de bí zi shì bí zi hé shàng zuǐ chún zhǎng zài yì qǐ.', 'La trompe de l\'éléphant, c\'est le nez et la lèvre du haut réunis.'),
      sl(sv(R(0, 235, 135, 65, '#8fd0f5', 0) + ground(285, '#b5e08a').replace('<rect x="0"', '<rect x="135"') + G(255, 150, 1.3, elephant()) + arrow(100, 250, 160, 235, '#2f80ed', 5) + arrow(150, 225, 196, 175, '#2f80ed', 5), '#f3eefb'),
        '它能吸水，再喷进嘴里，还能抓东西。', 'tā néng xī shuǐ, zài pēn jìn zuǐ li, hái néng zhuā dōng xi.', 'Elle aspire l\'eau et l\'envoie dans la bouche; elle peut aussi attraper des objets.'),
      sl(sv(ground(285) + flower(45, 280, 1, '#ff8fb1', 0) + G(200, 160, 1.5, elephant()) + drop(210, 40, 1.4) + drop(255, 60, 1.4) + drop(300, 45, 1.4) + vap(70, 215, '#8fb7d6'), '#f3eefb'),
        '它还能闻味道、洗澡，也能和同伴打招呼。', 'tā hái néng wén wèi dao, xǐ zǎo, yě néng hé tóng bàn dǎ zhāo hu.', 'Elle sert aussi à sentir, à se doucher et à saluer les autres éléphants.'),
    ],
    fact: tx('大象是陆地上最大的动物。', 'dà xiàng shì lù dì shang zuì dà de dòng wù', 'L\'éléphant est le plus grand animal terrestre.'),
    quiz: [
      qz('大象怎么喝水？', 'dà xiàng zěn me hē shuǐ', 'Comment l\'éléphant boit-il?', 1,
        op('用尾巴沾水', 'yòng wěi ba zhān shuǐ', 'Avec sa queue', '🐘'), op('用鼻子吸水再喷进嘴里', 'yòng bí zi xī shuǐ zài pēn jìn zuǐ li', 'Il aspire avec la trompe puis asperge sa bouche', '🐘'), op('用耳朵喝水', 'yòng ěr duo hē shuǐ', 'Avec ses oreilles', '👂')),
      qz('大象的鼻子除了呼吸，还能做什么？', 'dà xiàng de bí zi chú le hū xī, hái néng zuò shén me', 'À part respirer, que peut faire la trompe?', 0,
        op('抓东西', 'zhuā dōng xi', 'Attraper des objets', '✋'), op('飞上天', 'fēi shàng tiān', 'Voler', '🪽'), op('打电话', 'dǎ diàn huà', 'Téléphoner', '📞')),
    ],
  },
  {
    id: 'animaux-serpent-mue', cat: 'animaux', emoji: '🐍', level: 2,
    q: tx('蛇为什么会蜕皮？', 'shé wèi shén me huì tuì pí', 'Pourquoi le serpent change-t-il de peau?'),
    slides: [
      sl(sv(snake('M50 230 q30 -30 60 0 t60 0', '#7bc96f', 14) + snake('M40 100 q40 -50 80 0 t80 0 t80 0', '#7bc96f', 30) + arrow(250, 230, 250, 175, '#ef6a5b', 6), '#e8f5fd'),
        '蛇长大了，可是旧皮不会跟着长大。', 'shé zhǎng dà le, kě shì jiù pí bú huì gēn zhe zhǎng dà.', 'Le serpent grandit, mais sa vieille peau ne grandit pas.'),
      sl(sv(snake('M40 160 q40 -60 80 0 t80 0 t80 0', '#d9dbe3', 40) + snake('M40 160 q40 -60 80 0 t80 0 t80 0', '#7bc96f', 22) + arrow(330, 230, 330, 200, '#ef6a5b', 5), '#e8f5fd'),
        '旧皮下面，已经长出了新皮。', 'jiù pí xià mian, yǐ jīng zhǎng chū le xīn pí.', 'Sous la vieille peau, une nouvelle peau a déjà poussé.'),
      sl(sv(R(40, 215, 320, 55, '#9aa0b0', 20) + snake('M60 200 q30 -26 60 0 t60 0', '#e6e7ee', 20) + snake('M190 180 q35 -40 70 0 t60 0', '#7bc96f', 24) + E(335, 165, 16, 12, '#7bc96f') + eye(341, 162, 3), '#e8f5fd'),
        '蛇在石头上蹭，旧皮就脱下来啦。', 'shé zài shí tou shang cèng, jiù pí jiù tuō xià lái la.', 'Le serpent se frotte contre une roche et la vieille peau se détache.'),
    ],
    fact: tx('蛇没有眼皮，眼睛总是睁着。', 'shé méi yǒu yǎn pí, yǎn jing zǒng shì zhēng zhe', 'Le serpent n\'a pas de paupières : ses yeux restent toujours ouverts.'),
    quiz: [
      qz('蛇为什么要蜕皮？', 'shé wèi shén me yào tuì pí', 'Pourquoi le serpent mue-t-il?', 1,
        op('因为天气下雪', 'yīn wèi tiān qì xià xuě', 'Parce qu\'il neige', '❄️'), op('因为长大了旧皮太小', 'yīn wèi zhǎng dà le jiù pí tài xiǎo', 'Il grandit et sa vieille peau est trop petite', '🐍'), op('因为想变成鱼', 'yīn wèi xiǎng biàn chéng yú', 'Pour devenir un poisson', '🐟')),
      qz('蛇蜕下来的旧皮像什么？', 'shé tuì xià lái de jiù pí xiàng shén me', 'À quoi ressemble la vieille peau laissée par le serpent?', 2,
        op('一块糖', 'yí kuài táng', 'Un bonbon', '🍬'), op('一朵花', 'yì duǒ huā', 'Une fleur', '🌸'), op('一层空壳', 'yì céng kōng ké', 'Une enveloppe vide', '🫥')),
    ],
  },
  {
    id: 'animaux-orignal-bois', cat: 'animaux', emoji: '🫎', level: 2,
    q: tx('驼鹿为什么有大角？', 'tuó lù wèi shén me yǒu dà jiǎo', 'Pourquoi l\'orignal a-t-il de grands bois?'),
    slides: [
      sl(sv(ground(285) + G(210, 140, 1.6, moose()), '#e8f5fd'),
        '只有驼鹿爸爸才有大角。', 'zhǐ yǒu tuó lù bà ba cái yǒu dà jiǎo.', 'Seul l\'orignal mâle a de grands bois.'),
      sl(sv(ground(268) + maple(50, 60, 1, '#e0452f', 20) + maple(350, 70, 1, '#e8903a', -20) + G(105, 170, 1, moose(), 0, true) + G(295, 170, 1, moose()), '#fde9d2'),
        '秋天，驼鹿爸爸用角来比赛，看谁更强壮。', 'qiū tiān, tuó lù bà ba yòng jiǎo lái bǐ sài, kàn shéi gèng qiáng zhuàng.', 'À l\'automne, les mâles s\'affrontent avec leurs bois pour voir qui est le plus fort.'),
      sl(sv(R(0, 0, 200, 300, '#e6eef7', 0) + ground(268).replace('width="400"', 'width="400"') + snow(8) + G(100, 170, 0.8, moose().replace(/<path[^>]*fill="#e8c98a"[^>]*\/>/g, '')) + G(150, 262, 1, P('M0 0 L-10 -30 L-24 -40 L-18 -20 L-34 -26 L-20 -4Z', '#e8c98a')) + arrow(190, 130, 225, 130, S, 5) + G(305, 170, 0.8, moose()), '#e8f5fd'),
        '冬天角会掉下来，春天再长出新的。', 'dōng tiān jiǎo huì diào xià lái, chūn tiān zài zhǎng chū xīn de.', 'L\'hiver, les bois tombent; au printemps, de nouveaux repoussent.'),
    ],
    fact: tx('驼鹿是最大的鹿，还会游泳。', 'tuó lù shì zuì dà de lù, hái huì yóu yǒng', 'L\'orignal est le plus grand des cerfs et il nage bien.'),
    quiz: [
      qz('哪一种驼鹿有大角？', 'nǎ yì zhǒng tuó lù yǒu dà jiǎo', 'Quel orignal a de grands bois?', 1,
        op('驼鹿妈妈', 'tuó lù mā ma', 'La femelle', '🫎'), op('驼鹿爸爸', 'tuó lù bà ba', 'Le mâle', '🫎'), op('驼鹿宝宝', 'tuó lù bǎo bao', 'Le petit', '🍼')),
      qz('驼鹿的角冬天会怎么样？', 'tuó lù de jiǎo dōng tiān huì zěn me yàng', 'Que deviennent les bois de l\'orignal en hiver?', 0,
        op('掉下来', 'diào xià lái', 'Ils tombent', '🍂'), op('变成金子', 'biàn chéng jīn zi', 'Ils deviennent de l\'or', '🪙'), op('变成树', 'biàn chéng shù', 'Ils deviennent un arbre', '🌳')),
    ],
  },
  {
    id: 'animaux-oiseaux-migrateurs', cat: 'animaux', emoji: '🪿', level: 2,
    q: tx('候鸟为什么要往南飞？', 'hòu niǎo wèi shén me yào wǎng nán fēi', 'Pourquoi les oiseaux migrateurs partent-ils vers le sud?'),
    slides: [
      sl(sv(ground(255, '#fff') + snow(14) + R(310, 120, 16, 136, '#9a6a3c', 3) + L(318, 150, 288, 118, '#9a6a3c', 6) + L(318, 140, 350, 112, '#9a6a3c', 6) + G(150, 205, 1.3, bird(0)) + L(120, 190, 108, 188, S, 3), '#dbe7f3'),
        '冬天，北方很冷，虫子和水草都少了。', 'dōng tiān, běi fāng hěn lěng, chóng zi hé shuǐ cǎo dōu shǎo le.', 'L\'hiver, le nord est froid et il y a moins d\'insectes et de plantes d\'eau.'),
      sl(sv(G(200, 80, 0.5, bird(1)) + G(165, 110, 0.5, bird(0)) + G(235, 110, 0.5, bird(1)) + arrow(350, 60, 350, 200, '#ef6a5b', 8) + sun(350, 255, 24), '#e8f5fd'),
        '加拿大雁成群结队，飞到暖和的南方去。', 'jiā ná dà yàn chéng qún jié duì, fēi dào nuǎn huo de nán fāng qù.', 'Les bernaches du Canada partent en groupe vers le sud, où il fait chaud.'),
      sl(sv(sun(335, 50, 22) + ground(250) + flower(50, 255, 1, '#ff8fb1', 0) + flower(350, 255, 1, '#ffd34d', 0) + E(200, 222, 62, 24, '#b07a46') + E(180, 208, 9, 12, '#fff') + E(200, 204, 9, 12, '#fff') + E(220, 208, 9, 12, '#fff') + G(110, 140, 0.9, bird(0)) + G(300, 140, 0.9, bird(1), 0, true), '#e8f5fd'),
        '春天回暖，它们又飞回来生宝宝。', 'chūn tiān huí nuǎn, tā men yòu fēi huí lái shēng bǎo bao.', 'Au printemps, il fait doux : ils reviennent pour avoir des petits.'),
    ],
    fact: tx('雁排成“人”字形飞，可以省力气。', 'yàn pái chéng rén zì xíng fēi, kě yǐ shěng lì qi', 'Les oies volent en V pour économiser leur énergie.'),
    quiz: [
      qz('冬天，候鸟往哪边飞？', 'dōng tiān, hòu niǎo wǎng nǎ biān fēi', 'L\'hiver, vers où volent les oiseaux migrateurs?', 1,
        op('北边', 'běi biān', 'Vers le nord', '🧭'), op('南边', 'nán biān', 'Vers le sud', '☀️'), op('月亮上', 'yuè liang shang', 'Vers la lune', '🌙')),
      qz('候鸟为什么要飞走？', 'hòu niǎo wèi shén me yào fēi zǒu', 'Pourquoi les oiseaux migrateurs s\'en vont-ils?', 0,
        op('冬天吃的变少了', 'dōng tiān chī de biàn shǎo le', 'L\'hiver, il y a moins à manger', '🍽️'), op('想去看电影', 'xiǎng qù kàn diàn yǐng', 'Ils veulent aller au cinéma', '🎬'), op('想买新鞋', 'xiǎng mǎi xīn xié', 'Ils veulent des souliers neufs', '👟')),
    ],
  },
  {
    id: 'animaux-fourmis-file', cat: 'animaux', emoji: '🐜', level: 2,
    q: tx('蚂蚁为什么排队走？', 'mǎ yǐ wèi shén me pái duì zǒu', 'Pourquoi les fourmis marchent-elles en file?'),
    slides: [
      sl(sv(ground(250, '#d9c08f') + G(100, 222, 1.4, ant()) + [150, 185, 220, 255, 290].map((x) => C(x, 232, 4, '#b266d6')).join('') + C(335, 225, 15, '#f5a623'), '#e8f5fd'),
        '蚂蚁找到食物，就一边走一边留下气味。', 'mǎ yǐ zhǎo dào shí wù, jiù yì biān zǒu yì biān liú xià qì wèi.', 'Quand une fourmi trouve de la nourriture, elle laisse une odeur sur son chemin.'),
      sl(sv(ground(250, '#d9c08f') + [50, 110, 170, 230].map((x) => G(x, 218, 0.8, ant())).join('') + [80, 140, 200, 260, 300].map((x) => C(x, 232, 3.5, '#b266d6')).join('') + C(340, 225, 15, '#f5a623'), '#e8f5fd'),
        '别的蚂蚁闻到气味，就跟着走。', 'bié de mǎ yǐ wén dào qì wèi, jiù gēn zhe zǒu.', 'Les autres fourmis sentent l\'odeur et suivent le même chemin.'),
      sl(sv(ground(250, '#d9c08f') + P('M20 250 Q80 140 150 250Z', '#a9794f') + E(85, 240, 14, 12, S) + [[200, 232], [260, 232], [320, 232]].map(([a, b]) => G(a, b, 0.8, ant(), 0, true) + C(a, b - 18, 8, '#f5a623')).join(''), '#e8f5fd'),
        '蚂蚁们排成一条线，把食物搬回家。', 'mǎ yǐ men pái chéng yì tiáo xiàn, bǎ shí wù bān huí jiā.', 'Les fourmis forment une ligne et rapportent la nourriture à la fourmilière.'),
    ],
    fact: tx('蚂蚁能搬起比自己重很多倍的东西。', 'mǎ yǐ néng bān qǐ bǐ zì jǐ zhòng hěn duō bèi de dōng xi', 'La fourmi peut porter beaucoup plus lourd qu\'elle.'),
    quiz: [
      qz('蚂蚁靠什么找到同伴走过的路？', 'mǎ yǐ kào shén me zhǎo dào tóng bàn zǒu guò de lù', 'Comment la fourmi retrouve-t-elle le chemin des autres?', 1,
        op('路灯', 'lù dēng', 'Avec des lampadaires', '💡'), op('气味', 'qì wèi', 'Avec l\'odeur', '👃'), op('手机地图', 'shǒu jī dì tú', 'Avec la carte du téléphone', '📱')),
      qz('蚂蚁排队是为了做什么？', 'mǎ yǐ pái duì shì wèi le zuò shén me', 'Pourquoi les fourmis font-elles la file?', 0,
        op('搬食物回家', 'bān shí wù huí jiā', 'Rapporter la nourriture à la maison', '🍞'), op('去上学', 'qù shàng xué', 'Aller à l\'école', '🎒'), op('看电视', 'kàn diàn shì', 'Regarder la télé', '📺')),
    ],
  },
  {
    id: 'animaux-tournesol-soleil', cat: 'animaux', emoji: '🌻', level: 2,
    q: tx('向日葵为什么跟着太阳转？', 'xiàng rì kuí wèi shén me gēn zhe tài yáng zhuàn', 'Pourquoi le tournesol suit-il le soleil?'),
    slides: [
      sl(sv(ground(255) + C(60, 50, 16, '#ffd34d') + C(200, 40, 16, '#ffd34d') + C(340, 50, 16, '#ffd34d') + P('M80 255 Q78 210 50 170', 'none').replace('fill="none"', 'fill="none"').replace(`stroke="${S}"`, 'stroke="#4c9a3a"').replace('stroke-width="3"', 'stroke-width="7"') + G(50, 170, 0.7, sunflower(1)) + L(200, 255, 200, 160, '#4c9a3a', 7) + G(200, 150, 0.7, sunflower(1)) + P('M320 255 Q322 210 350 170', 'none').replace(`stroke="${S}"`, 'stroke="#4c9a3a"').replace('stroke-width="3"', 'stroke-width="7"') + G(350, 170, 0.7, sunflower(1)), '#e8f5fd'),
        '小向日葵白天会跟着太阳，慢慢地转头。', 'xiǎo xiàng rì kuí bái tiān huì gēn zhe tài yáng, màn màn de zhuǎn tóu.', 'Le jeune tournesol suit le soleil durant la journée en tournant lentement la tête.'),
      sl(sv(ground(255) + sun(335, 55, 24) + L(190, 255, 190, 150, '#4c9a3a', 8) + leaf(160, 220, 1.2, '#6cc24a', -70) + G(190, 130, 1.5, sunflower(1)) + arrow(300, 85, 245, 112, '#f5a623', 5) + arrow(340, 250, 340, 150, '#3fae4c', 7), '#e8f5fd'),
        '这样它能晒到更多阳光，长得更快。', 'zhè yàng tā néng shài dào gèng duō yáng guāng, zhǎng de gèng kuài.', 'Ainsi il reçoit plus de soleil et pousse plus vite.'),
      sl(sv(ground(255) + R(0, 215, 90, 40, '#fde9d2', 0) + sun(45, 225, 22) + L(260, 255, 260, 150, '#4c9a3a', 8) + leaf(230, 220, 1.2, '#6cc24a', -70) + leaf(292, 200, 1.2, '#6cc24a', 70) + G(260, 120, 1.9, sunflower(1)) + arrow(100, 200, 190, 150, '#f5a623', 5), '#fde9d2'),
        '花开了以后，向日葵就不转了，一直朝着东方。', 'huā kāi le yǐ hòu, xiàng rì kuí jiù bú zhuàn le, yì zhí cháo zhe dōng fāng.', 'Une fois fleuri, le tournesol ne tourne plus : il regarde vers l\'est.'),
    ],
    fact: tx('向日葵的花盘里，有很多小花和种子。', 'xiàng rì kuí de huā pán li, yǒu hěn duō xiǎo huā hé zhǒng zi', 'Le coeur du tournesol contient plein de petites fleurs et de graines.'),
    quiz: [
      qz('哪一种向日葵会跟着太阳转？', 'nǎ yì zhǒng xiàng rì kuí huì gēn zhe tài yáng zhuàn', 'Quels tournesols suivent le soleil?', 1,
        op('开花后的大向日葵', 'kāi huā hòu de dà xiàng rì kuí', 'Les grands, après la floraison', '🌻'), op('还没开花的小向日葵', 'hái méi kāi huā de xiǎo xiàng rì kuí', 'Les jeunes, avant la floraison', '🌱'), op('都不会', 'dōu bú huì', 'Aucun', '🚫')),
      qz('小向日葵为什么跟着太阳转？', 'xiǎo xiàng rì kuí wèi shén me gēn zhe tài yáng zhuàn', 'Pourquoi le jeune tournesol suit-il le soleil?', 2,
        op('怕太阳', 'pà tài yáng', 'Il a peur du soleil', '😨'), op('想和太阳赛跑', 'xiǎng hé tài yáng sài pǎo', 'Il veut faire la course avec le soleil', '🏃'), op('想晒到更多阳光', 'xiǎng shài dào gèng duō yáng guāng', 'Il veut capter plus de soleil', '☀️')),
    ],
  },
  // ================= LEVEL 3 =================
  {
    id: 'animaux-chauve-souris-echo', cat: 'animaux', emoji: '🦇', level: 3,
    q: tx('蝙蝠为什么能在黑夜里飞？', 'biān fú wèi shén me néng zài hēi yè li fēi', 'Comment la chauve-souris vole-t-elle dans le noir?'),
    slides: [
      sl(sv(star(60, 40) + star(340, 60) + moon(330, 110) + G(200, 110, 1.5, bat()) + P('M165 190 q35 28 70 0') + P('M145 215 q55 46 110 0') + P('M125 242 q75 62 150 0'), '#2d3a66'),
        '蝙蝠飞的时候，嘴巴会发出很高的声音。', 'biān fú fēi de shí hou, zuǐ ba huì fā chū hěn gāo de shēng yīn.', 'En vol, la chauve-souris émet des sons très aigus avec sa bouche.'),
      sl(sv(G(80, 150, 1.1, bat()) + G(320, 150, 0.8, butterfly('#cfc4a8', '#e6dcc0')) + arrow(135, 138, 262, 138, '#ef6a5b', 5) + arrow(262, 168, 135, 168, '#3fae4c', 5), '#2d3a66'),
        '声音碰到东西，就会弹回来，叫作回声。', 'shēng yīn pèng dào dōng xi, jiù huì tán huí lái, jiào zuò huí shēng.', 'Le son frappe un objet et rebondit : c\'est l\'écho.'),
      sl(sv(G(160, 160, 2.2, bat(false)) + G(330, 80, 0.7, butterfly('#cfc4a8', '#e6dcc0')) + arrow(320, 120, 210, 150, '#3fae4c', 5) + `<circle cx="125" cy="85" r="26" fill="none" stroke="#ffd34d" stroke-width="4" stroke-dasharray="6 6"/>`, '#2d3a66'),
        '蝙蝠用耳朵听回声，就知道东西在哪里。', 'biān fú yòng ěr duo tīng huí shēng, jiù zhī dào dōng xi zài nǎ li.', 'Elle écoute l\'écho avec ses oreilles et sait où se trouvent les objets.'),
    ],
    fact: tx('蝙蝠的叫声很高，我们的耳朵听不见。', 'biān fú de jiào shēng hěn gāo, wǒ men de ěr duo tīng bu jiàn', 'Son cri est trop aigu pour nos oreilles.'),
    quiz: [
      qz('蝙蝠靠什么在黑夜里找路？', 'biān fú kào shén me zài hēi yè li zhǎo lù', 'Qu\'utilise la chauve-souris pour trouver son chemin dans le noir?', 2,
        op('手电筒', 'shǒu diàn tǒng', 'Une lampe de poche', '🔦'), op('地图', 'dì tú', 'Une carte', '🗺️'), op('回声', 'huí shēng', 'L\'écho', '🔊'), op('鼻子发光', 'bí zi fā guāng', 'Son nez qui brille', '✨')),
      qz('回声是什么？', 'huí shēng shì shén me', 'Qu\'est-ce que l\'écho?', 3,
        op('一种光', 'yì zhǒng guāng', 'Une lumière', '💡'), op('一种风', 'yì zhǒng fēng', 'Un vent', '🌬️'), op('一种味道', 'yì zhǒng wèi dao', 'Une odeur', '👃'), op('弹回来的声音', 'tán huí lái de shēng yīn', 'Un son qui rebondit', '🔊')),
    ],
  },
  {
    id: 'animaux-arbre-cernes', cat: 'animaux', emoji: '🪵', level: 3,
    q: tx('树的年轮是怎么来的？', 'shù de nián lún shì zěn me lái de', 'D\'où viennent les cernes des arbres?'),
    slides: [
      sl(sv([120, 100, 80, 60, 40, 20].map((r, i) => C(180, 150, r, i % 2 ? '#c79a5b' : '#e8c98a')).join('') + arrow(190, 150, 350, 150, '#ef6a5b', 6), '#e8f5fd'),
        '树每年都会长粗一圈。', 'shù měi nián dōu huì zhǎng cū yì quān.', 'Chaque année, l\'arbre grossit d\'un cerne.'),
      sl(sv(R(40, 120, 110, 80, '#f0d9a8', 0) + R(150, 120, 60, 80, '#b07a46', 0) + R(210, 120, 110, 80, '#f0d9a8', 0) + R(320, 120, 50, 80, '#b07a46', 0) + flower(95, 85, 0.8, '#ff8fb1', 0) + maple(180, 80, 0.9, '#e0452f') + arrow(40, 235, 370, 235, S, 5), '#e8f5fd'),
        '春天长得快，木头颜色浅；秋天长得慢，颜色深。', 'chūn tiān zhǎng de kuài, mù tou yán sè qiǎn; qiū tiān zhǎng de màn, yán sè shēn.', 'Au printemps, il pousse vite et le bois est pâle; à l\'automne, il pousse lentement et le bois est foncé.'),
      sl(sv([120, 90, 60, 30].map((r, i) => C(180, 150, r, i % 2 ? '#c79a5b' : '#e8c98a')).join('') + T(180, 156, '1', 20) + T(228, 156, '2', 20) + T(258, 156, '3', 20) + T(288, 156, '4', 20) + L(180, 150, 300, 150, S, 2), '#e8f5fd'),
        '一浅一深，合起来就是一圈，代表一年。', 'yì qiǎn yì shēn, hé qǐ lái jiù shì yì quān, dài biǎo yì nián.', 'Une bande pâle et une foncée forment un cerne : un an.'),
    ],
    fact: tx('年轮越宽，常常说明那一年长得好。', 'nián lún yuè kuān, cháng cháng shuō míng nà yì nián zhǎng de hǎo', 'Plus un cerne est large, plus l\'arbre a souvent bien poussé cette année-là.'),
    quiz: [
      qz('数年轮，可以知道树的什么？', 'shǔ nián lún, kě yǐ zhī dào shù de shén me', 'En comptant les cernes, que peut-on savoir de l\'arbre?', 1,
        op('喜欢吃什么', 'xǐ huan chī shén me', 'Ce qu\'il aime manger', '🍽️'), op('年纪', 'nián jì', 'Son âge', '🎂'), op('会唱什么歌', 'huì chàng shén me gē', 'Les chansons qu\'il chante', '🎵'), op('住在哪个星球', 'zhù zài nǎ gè xīng qiú', 'Sur quelle planète il vit', '🪐')),
      qz('一圈年轮表示多久？', 'yì quān nián lún biǎo shì duō jiǔ', 'Combien de temps représente un cerne?', 3,
        op('一天', 'yì tiān', 'Un jour', '☀️'), op('一小时', 'yì xiǎo shí', 'Une heure', '🕐'), op('一分钟', 'yì fēn zhōng', 'Une minute', '⏱️'), op('一年', 'yì nián', 'Un an', '📅')),
    ],
  },
  {
    id: 'animaux-fleur-pollinisation', cat: 'animaux', emoji: '🌸', level: 3,
    q: tx('花为什么要有香味和颜色？', 'huā wèi shén me yào yǒu xiāng wèi hé yán sè', 'Pourquoi les fleurs ont-elles une odeur et des couleurs?'),
    slides: [
      sl(sv(ground(255) + flower(180, 175, 2, '#ff8fb1', 80) + P('M110 120 q-14 20 0 40') + P('M90 105 q-24 34 0 70') + P('M250 120 q14 20 0 40') + P('M270 105 q24 34 0 70') + G(330, 70, 1.2, bee()) + arrow(305, 90, 255, 120, '#ef6a5b', 4), '#e8f5fd'),
        '花的颜色和香味，是在请蜜蜂来做客。', 'huā de yán sè hé xiāng wèi, shì zài qǐng mì fēng lái zuò kè.', 'Les couleurs et l\'odeur de la fleur invitent l\'abeille.'),
      sl(sv(ground(255) + flower(70, 195, 1.4, '#ff8fb1', 60) + flower(330, 195, 1.4, '#ff8fb1', 60) + G(200, 110, 1.3, bee()) + C(190, 98, 4, '#f5a623') + C(205, 94, 4, '#f5a623') + C(212, 106, 4, '#f5a623') + arrow(105, 150, 165, 120, '#ef6a5b', 4) + arrow(240, 118, 300, 150, '#ef6a5b', 4), '#e8f5fd'),
        '蜜蜂身上沾到花粉，又飞到另一朵花上。', 'mì fēng shēn shang zhān dào huā fěn, yòu fēi dào lìng yì duǒ huā shang.', 'L\'abeille se couvre de pollen et vole vers une autre fleur.'),
      sl(sv(ground(255) + flower(80, 200, 1.5, '#ff8fb1', 55) + C(80, 150, 4, '#f5a623') + arrow(140, 160, 245, 160, S, 6) + C(310, 160, 42, '#e0452f') + L(310, 118, 314, 98, '#6b4a2b', 5) + leaf(332, 100, 0.8, '#6cc24a', 60) + E(310, 168, 5, 8, '#fff6c9') + E(296, 160, 4, 7, '#fff6c9') + E(324, 160, 4, 7, '#fff6c9'), '#e8f5fd'),
        '花粉落到另一朵花里，花才能结出果实和种子。', 'huā fěn luò dào lìng yì duǒ huā li, huā cái néng jié chū guǒ shí hé zhǒng zi.', 'Quand le pollen arrive dans l\'autre fleur, elle peut faire un fruit et des graines.'),
    ],
    fact: tx('苹果花要靠蜜蜂传粉，才能结苹果。', 'píng guǒ huā yào kào mì fēng chuán fěn, cái néng jié píng guǒ', 'Les fleurs de pommier ont besoin des abeilles pour donner des pommes.'),
    quiz: [
      qz('蜜蜂为什么会飞到花上？', 'mì fēng wèi shén me huì fēi dào huā shang', 'Pourquoi l\'abeille vole-t-elle vers la fleur?', 3,
        op('想找雪人', 'xiǎng zhǎo xuě rén', 'Elle cherche un bonhomme de neige', '⛄'), op('想去游泳', 'xiǎng qù yóu yǒng', 'Elle veut aller nager', '🏊'), op('想听音乐', 'xiǎng tīng yīn yuè', 'Elle veut écouter de la musique', '🎵'), op('被颜色和香味吸引', 'bèi yán sè hé xiāng wèi xī yǐn', 'Elle est attirée par les couleurs et l\'odeur', '🌸')),
      qz('花粉落到另一朵花上，花会怎么样？', 'huā fěn luò dào lìng yì duǒ huā shang, huā huì zěn me yàng', 'Que se passe-t-il quand le pollen arrive sur une autre fleur?', 1,
        op('马上变成石头', 'mǎ shàng biàn chéng shí tou', 'Elle devient une pierre', '🪨'), op('能结出果实和种子', 'néng jié chū guǒ shí hé zhǒng zi', 'Elle peut donner un fruit et des graines', '🍎'), op('变成一只蜜蜂', 'biàn chéng yì zhī mì fēng', 'Elle devient une abeille', '🐝'), op('开始唱歌', 'kāi shǐ chàng gē', 'Elle se met à chanter', '🎤')),
    ],
  },
  {
    id: 'animaux-chameau-bosse', cat: 'animaux', emoji: '🐪', level: 3,
    q: tx('骆驼为什么能很久不喝水？', 'luò tuo wèi shén me néng hěn jiǔ bù hē shuǐ', 'Pourquoi le chameau peut-il rester longtemps sans boire?'),
    slides: [
      sl(sv(sun(50, 50, 24) + ground(284, '#f2d9a0') + G(190, 140, 1.5, camel() + C(-6, -20, 14, '#ffe08a')), '#fdebc8'),
        '骆驼的驼峰里，装的是脂肪，不是水。', 'luò tuo de tuó fēng li, zhuāng de shì zhī fáng, bú shì shuǐ.', 'La bosse du chameau contient du gras, pas de l\'eau.'),
      sl(sv(ground(270, '#f2d9a0') + G(100, 180, 0.9, camel()) + arrow(175, 150, 225, 150, S, 6) + G(310, 180, 0.9, camel().replace('cy="-20" r="24"', 'cy="-6" r="13"')), '#fdebc8'),
        '没有吃的时候，身体可以用脂肪当能量。', 'méi yǒu chī de shí hou, shēn tǐ kě yǐ yòng zhī fáng dàng néng liàng.', 'Quand il n\'y a rien à manger, le corps utilise le gras comme énergie.'),
      sl(sv(ground(268, '#f2d9a0') + R(255, 232, 145, 68, '#8fd0f5', 0) + G(120, 170, 1.0, camel()) + arrow(210, 135, 290, 228, '#2f80ed', 5) + drop(330, 255, 1.2), '#fdebc8'),
        '它还特别会喝水，一次能喝很多。', 'tā hái tè bié huì hē shuǐ, yí cì néng hē hěn duō.', 'Il sait aussi très bien boire : il avale beaucoup d\'un coup.'),
    ],
    fact: tx('骆驼的睫毛很长，能挡住沙子。', 'luò tuo de jié máo hěn cháng, néng dǎng zhù shā zi', 'Les cils du chameau sont longs et protègent ses yeux du sable.'),
    quiz: [
      qz('骆驼的驼峰里装着什么？', 'luò tuo de tuó fēng li zhuāng zhe shén me', 'Que contient la bosse du chameau?', 1,
        op('水', 'shuǐ', 'De l\'eau', '💧'), op('脂肪', 'zhī fáng', 'Du gras', '🟡'), op('沙子', 'shā zi', 'Du sable', '🏖️'), op('空气', 'kōng qì', 'De l\'air', '💨')),
      qz('骆驼找到水的时候会怎么样？', 'luò tuo zhǎo dào shuǐ de shí hou huì zěn me yàng', 'Que fait le chameau quand il trouve de l\'eau?', 2,
        op('一滴都不喝', 'yì dī dōu bù hē', 'Il n\'en boit pas une goutte', '🚫'), op('把水倒进驼峰', 'bǎ shuǐ dào jìn tuó fēng', 'Il verse l\'eau dans sa bosse', '🫗'), op('一次喝很多', 'yí cì hē hěn duō', 'Il boit beaucoup d\'un coup', '🐪'), op('把水变成糖', 'bǎ shuǐ biàn chéng táng', 'Il change l\'eau en sucre', '🍬')),
    ],
  },
  {
    id: 'animaux-baleine-souffle', cat: 'animaux', emoji: '🐋', level: 3,
    q: tx('鲸为什么要浮出水面呼吸？', 'jīng wèi shén me yào fú chū shuǐ miàn hū xī', 'Pourquoi la baleine remonte-t-elle respirer à la surface?'),
    slides: [
      sl(sv(G(200, 150, 1.2, whale()) + E(190, 142, 22, 16, '#f4a8a8') + E(236, 142, 22, 16, '#f4a8a8'), '#8fd0f5'),
        '鲸不是鱼，它和我们一样用肺呼吸。', 'jīng bú shì yú, tā hé wǒ men yí yàng yòng fèi hū xī.', 'La baleine n\'est pas un poisson : comme nous, elle respire avec des poumons.'),
      sl(sv(G(200, 175, 1.0, whale()) + `<rect x="0" y="150" width="400" height="150" fill="#8fd0f5" fill-opacity=".8"/><path d="M0 150 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="${S}" stroke-width="3"/>` + arrow(80, 60, 170, 120, '#2f80ed', 6), '#e8f5fd'),
        '肺里需要新鲜空气，所以它要浮上来换气。', 'fèi li xū yào xīn xiān kōng qì, suǒ yǐ tā yào fú shàng lái huàn qì.', 'Ses poumons ont besoin d\'air frais : elle remonte pour respirer.'),
      sl(sv(G(200, 175, 1.0, whale()) + `<rect x="0" y="150" width="400" height="150" fill="#8fd0f5" fill-opacity=".8"/><path d="M0 150 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="${S}" stroke-width="3"/>` + vap(180, 135, '#8fd0f5') + vap(200, 135, '#8fd0f5') + vap(220, 135, '#8fd0f5') + drop(150, 60, 1) + drop(250, 50, 1), '#e8f5fd'),
        '头顶的呼吸孔一开，“呼”地喷出一股水雾。', 'tóu dǐng de hū xī kǒng yì kāi, hū de pēn chū yì gǔ shuǐ wù.', 'L\'évent s\'ouvre sur sa tête, et un jet de brume jaillit.'),
    ],
    fact: tx('蓝鲸是地球上最大的动物。', 'lán jīng shì dì qiú shang zuì dà de dòng wù', 'Le rorqual bleu est le plus grand animal de la Terre.'),
    quiz: [
      qz('鲸为什么要浮出水面？', 'jīng wèi shén me yào fú chū shuǐ miàn', 'Pourquoi la baleine monte-t-elle à la surface?', 3,
        op('看月亮', 'kàn yuè liang', 'Pour regarder la lune', '🌙'), op('喝汽水', 'hē qì shuǐ', 'Pour boire de la liqueur', '🥤'), op('打电话', 'dǎ diàn huà', 'Pour téléphoner', '📞'), op('换新鲜空气', 'huàn xīn xiān kōng qì', 'Pour renouveler l\'air', '💨')),
      qz('鲸用什么呼吸？', 'jīng yòng shén me hū xī', 'Avec quoi la baleine respire-t-elle?', 2,
        op('鳃', 'sāi', 'Avec des branchies', '🐟'), op('皮肤', 'pí fū', 'Avec sa peau', '🖐️'), op('肺', 'fèi', 'Avec des poumons', '🫁'), op('尾巴', 'wěi ba', 'Avec sa queue', '🐋')),
    ],
  },
  {
    id: 'animaux-feuille-verte', cat: 'animaux', emoji: '🍃', level: 3,
    q: tx('叶子为什么是绿色的？', 'yè zi wèi shén me shì lǜ sè de', 'Pourquoi les feuilles sont-elles vertes?'),
    slides: [
      sl(sv(leaf(110, 150, 4.2, '#6cc24a', 30) + L(165, 130, 238, 130, '#8a8fa8', 3) + C(310, 150, 82, '#fff') + [[280, 120], [320, 110], [345, 150], [300, 160], [270, 185], [325, 195], [350, 120]].map(([a, b]) => C(a, b, 10, '#4fae3f')).join(''), '#e8f5fd'),
        '叶子里有很多叶绿素。', 'yè zi li yǒu hěn duō yè lǜ sù.', 'Il y a plein de chlorophylle dans la feuille.'),
      sl(sv(sun(60, 60, 24) + leaf(250, 180, 3.8, '#6cc24a', 30) + arrow(105, 95, 200, 150, '#f5a623', 6) + arrow(130, 60, 225, 125, '#f5a623', 6) + C(235, 170, 8, '#4fae3f') + C(270, 195, 8, '#4fae3f') + C(255, 150, 8, '#4fae3f'), '#e8f5fd'),
        '叶绿素能吸收阳光，帮叶子做养分。', 'yè lǜ sù néng xī shōu yáng guāng, bāng yè zi zuò yǎng fèn.', 'La chlorophylle capte la lumière du soleil pour fabriquer la nourriture.'),
      sl(sv(sun(50, 45, 20) + leaf(170, 200, 3, '#6cc24a', 30) + arrow(95, 70, 150, 150, '#ef6a5b', 4) + arrow(125, 50, 175, 140, '#4a90c8', 4) + arrow(200, 170, 310, 100, '#3fae4c', 6) + E(340, 85, 30, 20, '#fff') + C(340, 85, 10, '#4a90c8') + eye(340, 85, 4), '#e8f5fd'),
        '绿光被反射回来，进到我们的眼睛里。', 'lǜ guāng bèi fǎn shè huí lái, jìn dào wǒ men de yǎn jing li.', 'La lumière verte est renvoyée et entre dans nos yeux.'),
      sl(sv(leaf(100, 150, 3.6, '#6cc24a', 30) + arrow(165, 150, 235, 150, S, 6) + leaf(305, 150, 3.6, '#e8c94a', 30), '#e8f5fd'),
        '秋天叶绿素少了，黄色就露出来。', 'qiū tiān yè lǜ sù shǎo le, huáng sè jiù lòu chū lái.', 'À l\'automne, il y a moins de chlorophylle et le jaune apparaît.'),
    ],
    fact: tx('有的叶子是红色或紫色的，里面也有叶绿素。', 'yǒu de yè zi shì hóng sè huò zǐ sè de, lǐ miàn yě yǒu yè lǜ sù', 'Certaines feuilles rouges ou violettes contiennent aussi de la chlorophylle.'),
    quiz: [
      qz('叶子里的什么让它看起来是绿色？', 'yè zi li de shén me ràng tā kàn qǐ lái shì lǜ sè', 'Qu\'est-ce qui rend la feuille verte?', 3,
        op('绿颜料', 'lǜ yán liào', 'De la peinture verte', '🎨'), op('小青蛙', 'xiǎo qīng wā', 'De petites grenouilles', '🐸'), op('绿色的灯', 'lǜ sè de dēng', 'Une lampe verte', '💡'), op('叶绿素', 'yè lǜ sù', 'La chlorophylle', '🍃')),
      qz('叶绿素有什么本领？', 'yè lǜ sù yǒu shén me běn lǐng', 'Que sait faire la chlorophylle?', 1,
        op('会跑步', 'huì pǎo bù', 'Elle sait courir', '🏃'), op('吸收阳光做养分', 'xī shōu yáng guāng zuò yǎng fèn', 'Capter le soleil pour fabriquer de la nourriture', '☀️'), op('会唱歌', 'huì chàng gē', 'Elle sait chanter', '🎤'), op('会变魔术', 'huì biàn mó shù', 'Elle fait des tours de magie', '🎩')),
    ],
  },
];
