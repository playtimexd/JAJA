// Mathématique 3e année — shared helpers (texts, number words, question builders, extra SVG drawings).
import * as S from '../svg.js';
export { S };

export const T = (fr, en) => ({ fr, en });
export const SAY = (fr, en) => ({ text: { fr, en } });
export const C = S.COLORS;

// ---------- number formatting ----------
export const NB = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); // 12 345 (fr-CA)
export const NBe = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const NT = (n) => T(NB(n), NBe(n));
// decimals from an integer count of tenths/hundredths: dec(347, 2) -> 3,47 / 3.47
export const dec = (v, d) => { const s = (v / 10 ** d).toFixed(d); return T(s.replace('.', ','), s); };
// money in cents
export const moneyT = (c) => {
  if (c < 100) return T(`${c} ¢`, `${c}¢`);
  if (c % 100 === 0) return T(`${c / 100} $`, `$${c / 100}`);
  const d = Math.floor(c / 100), r = String(c % 100).padStart(2, '0');
  return T(`${d},${r} $`, `$${d}.${r}`);
};
export const money2 = (c) => { const d = Math.floor(c / 100), r = String(c % 100).padStart(2, '0'); return T(`${d},${r} $`, `$${d}.${r}`); };

// ---------- number words (to 999 999) ----------
const FR_SMALL = 'zéro un deux trois quatre cinq six sept huit neuf dix onze douze treize quatorze quinze seize dix-sept dix-huit dix-neuf'.split(' ');
const FR_TENS = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante'];
function fr999(n) {
  if (n < 20) return FR_SMALL[n];
  if (n < 100) {
    const t = Math.floor(n / 10), u = n % 10;
    if (t === 7 || t === 9) {
      const base = t === 7 ? 'soixante' : 'quatre-vingt';
      if (t === 7 && u === 1) return 'soixante et onze';
      return `${base}-${FR_SMALL[10 + u]}`;
    }
    if (t === 8) return u === 0 ? 'quatre-vingts' : `quatre-vingt-${FR_SMALL[u]}`;
    if (u === 0) return FR_TENS[t];
    if (u === 1) return `${FR_TENS[t]} et un`;
    return `${FR_TENS[t]}-${FR_SMALL[u]}`;
  }
  const h = Math.floor(n / 100), r = n % 100;
  const head = h === 1 ? 'cent' : `${FR_SMALL[h]} cent${r === 0 ? 's' : ''}`;
  return r === 0 ? head : `${head} ${fr999(r)}`;
}
export function frW(n) {
  if (n < 1000) return fr999(n);
  const th = Math.floor(n / 1000), r = n % 1000;
  const head = th === 1 ? 'mille' : `${fr999(th).replace(/(vingt|cent)s$/, '$1')} mille`;
  return r ? `${head} ${fr999(r)}` : head;
}
const EN_SMALL = 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen'.split(' ');
const EN_TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function en999(n) {
  if (n < 20) return EN_SMALL[n];
  if (n < 100) return EN_TENS[Math.floor(n / 10)] + (n % 10 ? '-' + EN_SMALL[n % 10] : '');
  const h = Math.floor(n / 100), r = n % 100;
  return `${EN_SMALL[h]} hundred` + (r ? ` ${en999(r)}` : '');
}
export function enW(n) {
  if (n < 1000) return en999(n);
  const th = Math.floor(n / 1000), r = n % 1000;
  return `${en999(th)} thousand` + (r ? ` ${en999(r)}` : '');
}
export const WORDS = (n) => T(frW(n), enW(n));

// ---------- people & contexts ----------
export const PEOPLE = [
  { n: 'Léa', g: 'f' }, { n: 'Félix', g: 'm' }, { n: 'Mia', g: 'f' }, { n: 'Zachary', g: 'm' },
  { n: 'Florence', g: 'f' }, { n: 'William', g: 'm' }, { n: 'Émile', g: 'm' }, { n: 'Rosalie', g: 'f' },
  { n: 'Noah', g: 'm' }, { n: 'Alice', g: 'f' }, { n: 'Jacob', g: 'm' }, { n: 'Chloé', g: 'f' },
  { n: 'Olivier', g: 'm' }, { n: 'Juliette', g: 'f' }, { n: 'Samuel', g: 'm' }, { n: 'Charlotte', g: 'f' },
];
export const il = (p) => (p.g === 'f' ? 'elle' : 'il');
export const Il = (p) => (p.g === 'f' ? 'Elle' : 'Il');
export const he = (p) => (p.g === 'f' ? 'she' : 'he');
export const He = (p) => (p.g === 'f' ? 'She' : 'He');
export const his = (p) => (p.g === 'f' ? 'her' : 'his');
export const vow = (n) => /^[AEIOUYÉÈÊaeiouyéèê]/.test(n);
export const dn = (n) => (vow(n) ? `d’${n}` : `de ${n}`);
export const qn = (n) => (vow(n) ? `qu’${n}` : `que ${n}`);

// ---------- question builders ----------
// keypad
export const K = (key, prompt, answer, tip, extra = {}) => ({ type: 'keypad', key, prompt, answer, tip, ...extra });
// choice: opts = option objects, correct one FIRST
export const CH = (key, prompt, opts, tip, extra = {}) => ({ type: 'choice', key, prompt, options: opts, answer: 0, tip, cols: extra.cols ?? (opts.length === 4 ? 4 : opts.length), ...extra });
export const tx = (t) => ({ text: t });
// numeric choice with distractors; answer first
export function NQ(R, key, prompt, ans, cands, tip, o = {}) {
  const { fmt = NT, valid = () => true, n = 3, ...extra } = o;
  let d = [...new Set(cands)].filter((v) => v !== ans && v >= 0 && valid(v));
  d = R.sample(d, Math.min(n, d.length));
  for (let k = 1; d.length < n && k < 60; k++) for (const v of [ans + k, ans - k, ans + 10 * k, ans - 10 * k, ans + 100 * k]) if (d.length < n && v >= 0 && v !== ans && !d.includes(v) && valid(v)) d.push(v);
  return CH(key, prompt, [ans, ...d].map((v) => ({ text: fmt(v) })), tip, { cols: n + 1 === 4 ? 4 : n + 1, ...extra });
}
// choice from text labels (T objects or strings), correct first
export const TQ = (key, prompt, labels, tip, extra = {}) => CH(key, prompt, labels.map((l) => ({ text: l })), tip, extra);
export const YES_NO = [T('Oui', 'Yes'), T('Non', 'No')];
export const YN = (key, prompt, yes, tip, extra = {}) => ({ type: 'choice', key, prompt, options: YES_NO.map((t) => ({ text: t })), answer: yes ? 0 : 1, fixedOrder: true, cols: 2, tip, ...extra });
export const SORT = (key, prompt, bins, items, tip, extra = {}) => ({ type: 'sort', key, prompt, bins, items, tip, ...extra });
export const ORD = (key, prompt, tiles, tip, extra = {}) => ({ type: 'order', key, prompt, tiles, tip, joiner: ' ', ...extra });

// pick one generator; entries may be [weight, fn]
export function mix(R, gens) {
  const list = gens.map((g) => (Array.isArray(g) ? g : [1, g]));
  let r = R.next() * list.reduce((a, [w]) => a + w, 0);
  for (const [w, f] of list) { if ((r -= w) < 0) return f(R); }
  return list[list.length - 1][1](R);
}
// unit factory. levels = [gensL1, gensL2, gensL3]
export function unit(id, icon, title, pfeq, levels, defTip) {
  return {
    id, icon, title, pfeq: `${pfeq} (PFEQ 2e cycle, 3e année)`,
    generate(level, R) {
      const q = mix(R, levels[level - 1]);
      if (!q.tip && defTip) q.tip = defTip;
      return q;
    },
  };
}

export const sum = (a) => a.reduce((x, y) => x + y, 0);
export const gcd = (a, b) => (b ? gcd(b, a % b) : a);
export const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
export const frac = (a, b) => T(`${a}/${b}`, `${a}/${b}`);
export const FRAC_FR = { 2: ['demi', 'demis'], 3: ['tiers', 'tiers'], 4: ['quart', 'quarts'], 5: ['cinquième', 'cinquièmes'], 6: ['sixième', 'sixièmes'], 8: ['huitième', 'huitièmes'], 10: ['dixième', 'dixièmes'], 12: ['douzième', 'douzièmes'] };
export const FRAC_EN = { 2: ['half', 'halves'], 3: ['third', 'thirds'], 4: ['quarter', 'quarters'], 5: ['fifth', 'fifths'], 6: ['sixth', 'sixths'], 8: ['eighth', 'eighths'], 10: ['tenth', 'tenths'], 12: ['twelfth', 'twelfths'] };
export const fracWords = (a, b) => T(`${a === 1 ? (b === 2 ? 'un' : 'un') : fr999(a)} ${FRAC_FR[b][a > 1 ? 1 : 0]}`, `${en999(a)} ${FRAC_EN[b][a > 1 ? 1 : 0]}`);

// ---------- extra SVG drawings ----------
const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;
const r1 = (v) => Math.round(v * 10) / 10;
const pts = (P) => P.map((p) => `${r1(p[0])},${r1(p[1])}`).join(' ');
const TXT = (x, y, s, size = 18, extra = '') => `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" font-weight="800" text-anchor="middle" fill="${C.ink}" font-family="system-ui" ${extra}>${s}</text>`;

// angle with vertex at centre; deg between rays; rot = rotation of the first ray (deg)
export function angleSvg(deg, rot = 0, color = C.blue) {
  const cx = 110, cy = 110, L = 92, a0 = (-rot * Math.PI) / 180, a1 = (-(rot + deg) * Math.PI) / 180;
  const p0 = [cx + L * Math.cos(a0), cy + L * Math.sin(a0)], p1 = [cx + L * Math.cos(a1), cy + L * Math.sin(a1)];
  let out = '';
  if (deg === 90) {
    const s = 20, q0 = [cx + s * Math.cos(a0), cy + s * Math.sin(a0)], q1 = [cx + s * Math.cos(a1), cy + s * Math.sin(a1)];
    out += `<polygon points="${pts([[cx, cy], q0, [q0[0] + q1[0] - cx, q0[1] + q1[1] - cy], q1])}" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2"/>`;
  } else {
    const r = 30, e0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], e1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
    out += `<path d="M${r1(cx)},${r1(cy)} L${r1(e0[0])},${r1(e0[1])} A${r},${r} 0 ${deg > 180 ? 1 : 0} 0 ${r1(e1[0])},${r1(e1[1])} Z" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2"/>`;
  }
  out += `<line x1="${cx}" y1="${cy}" x2="${r1(p0[0])}" y2="${r1(p0[1])}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>`;
  out += `<line x1="${cx}" y1="${cy}" x2="${r1(p1[0])}" y2="${r1(p1[1])}" stroke="${color}" stroke-width="7" stroke-linecap="round"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="6" fill="${C.ink}"/>`;
  return svg(220, 220, out);
}

// polygon from points (in a 0..140 box), optional right-angle marks at given vertex indexes
export function polySvg(P, color = C.purple, opts = {}) {
  const { right = [], labels = null } = opts;
  let out = `<polygon points="${pts(P)}" fill="${color}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>`;
  for (const i of right) {
    const v = P[i], a = P[(i + P.length - 1) % P.length], b = P[(i + 1) % P.length];
    const u = (p) => { const dx = p[0] - v[0], dy = p[1] - v[1], l = Math.hypot(dx, dy); return [dx / l * 12, dy / l * 12]; };
    const ua = u(a), ub = u(b);
    out += `<polyline points="${pts([[v[0] + ua[0], v[1] + ua[1]], [v[0] + ua[0] + ub[0], v[1] + ua[1] + ub[1]], [v[0] + ub[0], v[1] + ub[1]]])}" fill="none" stroke="${C.ink}" stroke-width="2"/>`;
  }
  if (labels) P.forEach((p, i) => {
    const q = P[(i + 1) % P.length], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
    const cx = sum(P.map((z) => z[0])) / P.length, cy = sum(P.map((z) => z[1])) / P.length;
    const dx = mx - cx, dy = my - cy, l = Math.hypot(dx, dy) || 1;
    out += TXT(mx + dx / l * 18, my + dy / l * 18 + 6, labels[i], 16);
  });
  const pad = labels ? 34 : 10, padX = labels ? 58 : 10, xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
  const x0 = Math.min(...xs) - padX, y0 = Math.min(...ys) - pad, W = Math.max(...xs) - Math.min(...xs) + 2 * padX, H = Math.max(...ys) - Math.min(...ys) + 2 * pad;
  return `<svg viewBox="${r1(x0)} ${r1(y0)} ${r1(W)} ${r1(H)}" xmlns="http://www.w3.org/2000/svg" role="img">${out}</svg>`;
}

// quadrilaterals and polygons with a little random variation (deterministic from params)
export function quadPts(kind, a = 0) {
  // a in 0..3 = variant
  switch (kind) {
    case 'carre': { const s = 80 + a * 6; return [[30, 20], [30 + s, 20], [30 + s, 20 + s], [30, 20 + s]]; }
    case 'rectangle': { const w = 120 - a * 8, h = 54 + a * 10; return [[15, 25], [15 + w, 25], [15 + w, 25 + h], [15, 25 + h]]; }
    case 'losange': { const w = 46 + a * 6, h = 62 - a * 3; return [[75, 75 - h], [75 + w, 75], [75, 75 + h], [75 - w, 75]]; }
    case 'parallelogramme': { const sh = 26 + a * 6, w = 96 - a * 4; return [[15 + sh, 30], [15 + sh + w, 30], [15 + w, 110], [15, 110]]; }
    case 'trapeze': { const top = 50 + a * 8, off = a % 2 ? 10 : 35; return [[15 + off, 30], [15 + off + top, 30], [140, 110], [15, 110]]; }
    case 'quelconque': return [[[20, 40], [110, 20], [135, 115], [40, 100]], [[30, 25], [120, 50], [100, 120], [15, 95]], [[45, 20], [130, 35], [115, 110], [20, 120]], [[20, 30], [95, 15], [140, 95], [55, 125]]][a];
    case 'triangle': return [[[75, 15], [135, 120], [15, 120]], [[20, 20], [20, 120], [135, 120]], [[40, 20], [140, 110], [10, 115]], [[75, 25], [140, 110], [10, 110]]][a];
    default: { // regular n-gon by name
      const n = { eq3: 3, pentagone: 5, hexagone: 6, octogone: 8 }[kind];
      const rot = a * 0.2 - Math.PI / 2;
      return range(0, n - 1).map((i) => [75 + 60 * Math.cos(rot + (2 * Math.PI * i) / n), 72 + 60 * Math.sin(rot + (2 * Math.PI * i) / n)]);
    }
  }
}

// rotate points around (75,72)
export const rot = (P, deg) => { const t = (deg * Math.PI) / 180, c = Math.cos(t), s = Math.sin(t); return P.map(([x, y]) => [75 + (x - 75) * c - (y - 72) * s, 72 + (x - 75) * s + (y - 72) * c]); };

// generic 3D solid (prism or pyramid) with a polygonal base [[x,z]...] seen from slightly above
export function solid3d(base, h, kind = 'prisme', color = C.orange) {
  const tilt = 0.38, cx = 90, cy = 120;
  const P = (x, y, z) => [cx + x, cy - y + z * tilt];
  const shade = (k) => ['#ffd9a8', '#ffb15c', '#e0861e', '#c46c0c'][k];
  const cols = { orange: shade, green: (k) => ['#bff0d3', '#6fdba0', '#33b06c', '#1f8a51'][k], blue: (k) => ['#cfe0ff', '#8db5fb', '#4f8ef7', '#2f6bd0'][k], pink: (k) => ['#ffd0df', '#ff9fbd', '#ff6b9a', '#d94677'][k], purple: (k) => ['#e2d4ff', '#c1a6ff', '#9b6bff', '#7445d9'][k] }[color] || shade;
  const n = base.length;
  const bot = base.map(([x, z]) => P(x, 0, z)), top = base.map(([x, z]) => P(x, h, z));
  const apex = P(sum(base.map((b) => b[0])) / n, h, sum(base.map((b) => b[1])) / n);
  let out = `<polygon points="${pts(bot)}" fill="${cols(3)}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>`;
  const sides = range(0, n - 1).map((i) => {
    const j = (i + 1) % n, mz = (base[i][1] + base[j][1]) / 2;
    return { i, j, mz };
  }).sort((a, b) => a.mz - b.mz);
  for (const s of sides) {
    const face = kind === 'prisme' ? [bot[s.i], bot[s.j], top[s.j], top[s.i]] : [bot[s.i], bot[s.j], apex];
    const dx = base[s.j][0] - base[s.i][0], light = dx > 0 ? (s.mz > 0 ? 1 : 2) : 2;
    out += `<polygon points="${pts(face)}" fill="${cols(light)}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>`;
  }
  if (kind === 'prisme') out += `<polygon points="${pts(top)}" fill="${cols(0)}" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>`;
  return svg(180, 180, `<g transform="translate(0,${r1(h / 2 - 30)})">${out}</g>`);
}
export const regBase = (n, r, off = 0, sx = 1) => range(0, n - 1).map((i) => [r * sx * Math.cos(off + (2 * Math.PI * i) / n), r * Math.sin(off + (2 * Math.PI * i) / n)]);

// nets drawn on a grid of unit squares; cells = [[c,r]...]; tris = extra triangles [[pts...]] in grid units
export function netSvg(cells, tris = [], circles = [], color = C.green) {
  const cs = 34, all = [...cells.map(([c, r, w = 1, h = 1]) => [[c, r], [c + w, r + h]]), ...tris.map((t) => [[Math.min(...t.map((p) => p[0])), Math.min(...t.map((p) => p[1]))], [Math.max(...t.map((p) => p[0])), Math.max(...t.map((p) => p[1]))]]), ...circles.map(([x, y, r]) => [[x - r, y - r], [x + r, y + r]])];
  const minX = Math.min(...all.map((b) => b[0][0])), minY = Math.min(...all.map((b) => b[0][1]));
  const maxX = Math.max(...all.map((b) => b[1][0])), maxY = Math.max(...all.map((b) => b[1][1]));
  const X = (x) => 8 + (x - minX) * cs, Y = (y) => 8 + (y - minY) * cs;
  let out = '';
  for (const [c, r, w = 1, h = 1] of cells) out += `<rect x="${X(c)}" y="${Y(r)}" width="${w * cs}" height="${h * cs}" fill="${color}" stroke="${C.ink}" stroke-width="2.5"/>`;
  for (const t of tris) out += `<polygon points="${pts(t.map(([x, y]) => [X(x), Y(y)]))}" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
  for (const [x, y, r] of circles) out += `<circle cx="${X(x)}" cy="${Y(y)}" r="${r * cs}" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2.5"/>`;
  return svg(16 + (maxX - minX) * cs, 16 + (maxY - minY) * cs, out);
}

// small grid with filled cells; axis: 'v' | 'h' | null at the middle; cells = Set of "c,r"
export function gridSvg(cols, rows, cells, { axis = null, color = C.blue, cs = 26, cells2 = null, color2 = C.orange } = {}) {
  let out = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const k = `${c},${r}`, f = cells.has(k) ? color : cells2?.has(k) ? color2 : C.paper;
    out += `<rect x="${6 + c * cs}" y="${6 + r * cs}" width="${cs}" height="${cs}" fill="${f}" stroke="#9aa6c2" stroke-width="1.5"/>`;
  }
  if (axis === 'v') out += `<line x1="${6 + (cols / 2) * cs}" y1="0" x2="${6 + (cols / 2) * cs}" y2="${12 + rows * cs}" stroke="${C.pink}" stroke-width="4" stroke-dasharray="8 5"/>`;
  if (axis === 'h') out += `<line x1="0" y1="${6 + (rows / 2) * cs}" x2="${12 + cols * cs}" y2="${6 + (rows / 2) * cs}" stroke="${C.pink}" stroke-width="4" stroke-dasharray="8 5"/>`;
  return svg(12 + cols * cs, 12 + rows * cs, out);
}

// isometric stack of unit cubes. heights[j][i] = number of cubes in the column at (i, j); j = 0 is the back row
export function cubesSvg(heights, color = C.orange) {
  const a = 22, b = 12, c = 26; // iso unit vectors
  const rows = heights.length, cols = heights[0].length, maxH = Math.max(...heights.flat());
  const ox = 14 + rows * a, oy = 10 + maxH * c;
  const P = (i, j, k) => [ox + (i - j) * a, oy + (i + j) * b - k * c];
  let out = '';
  const list = [];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) for (let k = 0; k < heights[j][i]; k++) list.push([i, j, k]);
  list.sort((p, q) => (p[0] + p[1]) - (q[0] + q[1]) || p[2] - q[2]);
  for (const [i, j, k] of list) {
    const top = [P(i, j, k + 1), P(i + 1, j, k + 1), P(i + 1, j + 1, k + 1), P(i, j + 1, k + 1)];
    const right = [P(i + 1, j, k), P(i + 1, j + 1, k), P(i + 1, j + 1, k + 1), P(i + 1, j, k + 1)];
    const left = [P(i, j + 1, k), P(i + 1, j + 1, k), P(i + 1, j + 1, k + 1), P(i, j + 1, k + 1)];
    out += `<polygon points="${pts(left)}" fill="#e0861e" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/>`;
    out += `<polygon points="${pts(right)}" fill="${color}" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/>`;
    out += `<polygon points="${pts(top)}" fill="#ffd9a8" stroke="${C.ink}" stroke-width="2" stroke-linejoin="round"/>`;
  }
  const W = 28 + (rows + cols) * a, H = 20 + maxH * c + (rows + cols) * b;
  return svg(W, H, out);
}

// thermometer in °C (min..max), mercury at t
export function thermoSvg(t, min = -30, max = 40, step = 10) {
  const top = 20, bot = 300, x = 70, Y = (v) => bot - ((v - min) / (max - min)) * (bot - top);
  let out = `<rect x="${x - 14}" y="${top - 10}" width="28" height="${bot - top + 24}" rx="14" fill="${C.paper}" stroke="${C.ink}" stroke-width="3"/>`;
  out += `<circle cx="${x}" cy="${bot + 28}" r="22" fill="#e8413c" stroke="${C.ink}" stroke-width="3"/>`;
  out += `<rect x="${x - 7}" y="${r1(Y(t))}" width="14" height="${r1(bot + 14 - Y(t))}" fill="#e8413c"/>`;
  for (let v = min; v <= max; v += 2) {
    const big = v % step === 0, mid = v % 5 === 0;
    out += `<line x1="${x + 14}" y1="${r1(Y(v))}" x2="${x + 14 + (big ? 22 : mid ? 14 : 8)}" y2="${r1(Y(v))}" stroke="${C.ink}" stroke-width="${big ? 2.5 : 1.2}"/>`;
    if (big) out += `<text x="${x + 42}" y="${r1(Y(v) + 6)}" font-size="17" font-weight="800" fill="${C.ink}" font-family="system-ui">${v < 0 ? '−' + -v : v}</text>`;
  }
  // 1-degree minor ticks every 1 between even marks would be too dense; scale counts by 2
  out += `<text x="${x - 48}" y="${top + 6}" font-size="15" font-weight="700" fill="${C.ink}" font-family="system-ui">°C</text>`;
  return svg(150, bot + 60, out);
}

// spinner with coloured sectors; parts = array of colour names
const SPIN_COL = { rouge: '#e8413c', bleu: C.blue, vert: C.green, jaune: C.yellow };
export function spinnerSvg(parts) {
  const cx = 90, cy = 90, r = 80, n = parts.length;
  let out = '';
  parts.forEach((p, i) => {
    const a0 = (i / n) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / n) * 2 * Math.PI - Math.PI / 2;
    out += `<path d="M${cx},${cy} L${r1(cx + r * Math.cos(a0))},${r1(cy + r * Math.sin(a0))} A${r},${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${r1(cx + r * Math.cos(a1))},${r1(cy + r * Math.sin(a1))} Z" fill="${SPIN_COL[p]}" stroke="${C.ink}" stroke-width="3"/>`;
  });
  out += `<line x1="${cx}" y1="${cy}" x2="${cx + 22}" y2="${cy - 50}" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="8" fill="${C.ink}"/>`;
  return svg(180, 180, out);
}

// tenths bar (10 cells) or hundred grid (10x10) with `n` shaded
export function tenthsSvg(n) {
  let out = '';
  for (let i = 0; i < 10; i++) out += `<rect x="${8 + i * 30}" y="8" width="30" height="60" fill="${i < n ? C.green : C.paper}" stroke="${C.ink}" stroke-width="2.5"/>`;
  return svg(316, 76, out);
}
export function hundredSvg(n) {
  let out = '';
  for (let i = 0; i < 100; i++) { const c = Math.floor(i / 10), r = i % 10; out += `<rect x="${6 + c * 18}" y="${6 + r * 18}" width="18" height="18" fill="${i < n ? C.blue : C.paper}" stroke="#7d8aa8" stroke-width="1"/>`; }
  out += `<rect x="6" y="6" width="180" height="180" fill="none" stroke="${C.ink}" stroke-width="3"/>`;
  return svg(192, 192, out);
}

// simple table: rows = [[label, value], ...], header = [h1, h2] (strings, emoji-friendly)
export function tableSvg(rows, header = null) {
  const rh = 44, w1 = 150, w2 = 110, H = (rows.length + (header ? 1 : 0)) * rh + 4;
  let out = '', y = 2;
  if (header) {
    out += `<rect x="2" y="${y}" width="${w1 + w2}" height="${rh}" fill="${C.light}" stroke="${C.ink}" stroke-width="2"/>`;
    out += TXT(2 + w1 / 2, y + 29, header[0], 18) + TXT(2 + w1 + w2 / 2, y + 29, header[1], 18);
    y += rh;
  }
  for (const [a, b] of rows) {
    out += `<rect x="2" y="${y}" width="${w1}" height="${rh}" fill="${C.paper}" stroke="${C.ink}" stroke-width="2"/><rect x="${2 + w1}" y="${y}" width="${w2}" height="${rh}" fill="${C.paper}" stroke="${C.ink}" stroke-width="2"/>`;
    out += TXT(2 + w1 / 2, y + 30, a, 24) + TXT(2 + w1 + w2 / 2, y + 30, b, 22);
    y += rh;
  }
  return svg(w1 + w2 + 4, H, out);
}
// tally marks string for a table cell: 7 -> "𝍸 ||"
export const tally = (n) => '卌 '.repeat(Math.floor(n / 5)).trim() + (n % 5 ? (n >= 5 ? ' ' : '') + '|'.repeat(n % 5) : '');

// emoji drawn mirrored or not, in a row (frieze); flips = array of booleans; rots = optional degrees
export function friezeSvg(emoji, flips, last = null) {
  const cs = 56;
  let out = '';
  flips.forEach((f, i) => {
    const x = 8 + i * cs + cs / 2;
    out += `<rect x="${8 + i * cs}" y="6" width="${cs}" height="${cs}" fill="${i % 2 ? C.light : C.paper}" stroke="#c9d3ea"/>`;
    out += f === null ? TXT(x, 46, '?', 34) : `<text x="0" y="0" font-size="38" text-anchor="middle" transform="translate(${x},${48}) scale(${f === 'v' ? '1,-1' : f ? '-1,1' : '1,1'})${f === 'v' ? ' translate(0,28)' : ''}">${emoji}</text>`;
  });
  return svg(16 + flips.length * cs, 68, out);
}
export function oneEmojiSvg(emoji, f) {
  return svg(60, 60, `<text x="0" y="0" font-size="40" text-anchor="middle" transform="translate(30,44) scale(${f === 'v' ? '1,-1' : f ? '-1,1' : '1,1'})${f === 'v' ? ' translate(0,30)' : ''}">${emoji}</text>`);
}

// tiling pictures
export function tilingSvg(kind) {
  let out = '';
  const st = `stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"`;
  const col = [C.blue, C.yellow, C.green, C.pink];
  if (kind === 'carre') for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) out += `<rect x="${6 + c * 40}" y="${6 + r * 40}" width="40" height="40" fill="${col[(r + c) % 2]}" ${st}/>`;
  if (kind === 'rectangle') for (let r = 0; r < 5; r++) for (let c = -1; c < 4; c++) { const x = 6 + c * 70 + (r % 2) * 35; out += `<rect x="${x}" y="${6 + r * 32}" width="70" height="32" fill="${col[(r + c + 4) % 3]}" ${st}/>`; }
  if (kind === 'triangle') for (let r = 0; r < 3; r++) for (let c = 0; c < 7; c++) {
    const x = 6 + c * 32, y = 6 + r * 55, up = (c + r) % 2 === 0;
    out += `<polygon points="${up ? pts([[x, y + 55], [x + 32, y], [x + 64, y + 55]]) : pts([[x, y], [x + 64, y], [x + 32, y + 55]])}" fill="${col[up ? 0 : 1]}" ${st}/>`;
  }
  if (kind === 'hexagone') for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) {
    const R = 26, x = 30 + c * R * 1.5 * 1.15, y = 28 + r * R * 1.732 + (c % 2) * R * 0.866;
    out += `<polygon points="${pts(range(0, 5).map((i) => [x + R * Math.cos((Math.PI / 3) * i), y + R * Math.sin((Math.PI / 3) * i)]))}" fill="${col[(c + r) % 3]}" ${st}/>`;
  }
  if (kind === 'losange') for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
    const x = 30 + c * 44 + (r % 2) * 22, y = 26 + r * 34;
    out += `<polygon points="${pts([[x, y - 34], [x + 22, y], [x, y + 34], [x - 22, y]])}" fill="${col[(c + r) % 2 + 2]}" ${st}/>`;
  }
  return svg(250, 172, `<clipPath id="tc"><rect x="4" y="4" width="242" height="164" rx="8"/></clipPath><g clip-path="url(#tc)">${out}</g><rect x="4" y="4" width="242" height="164" rx="8" fill="none" stroke="${C.ink}" stroke-width="3"/>`);
}

// ruler in millimetres (0..10 cm) with a bar of `mm`
export function rulerMm(mm, emoji = '') {
  const u = 4, W = 30 + 100 * u, out = [];
  out.push(`<rect x="15" y="10" width="${mm * u}" height="24" rx="12" fill="${C.pink}" stroke="${C.ink}" stroke-width="2.5"/>`);
  if (emoji) out.push(`<text x="${15 + (mm * u) / 2}" y="29" font-size="17" text-anchor="middle">${emoji}</text>`);
  out.push(`<rect x="5" y="44" width="${W - 10}" height="58" rx="6" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2.5"/>`);
  for (let i = 0; i <= 100; i++) {
    const x = 15 + i * u;
    out.push(`<line x1="${x}" y1="44" x2="${x}" y2="${i % 10 ? (i % 5 ? 52 : 57) : 66}" stroke="${C.ink}" stroke-width="${i % 10 ? 1 : 2}"/>`);
    if (i % 10 === 0) out.push(`<text x="${x}" y="90" font-size="14" text-anchor="middle" fill="${C.ink}" font-family="system-ui">${i / 10}</text>`);
  }
  out.push(`<text x="${W - 22}" y="90" font-size="12" text-anchor="middle" fill="${C.ink}" font-family="system-ui">cm</text>`);
  return svg(W, 110, out.join(''));
}

// balance scale: left items vs right items (emoji strings), tilt -1 left heavy, 0 equal, 1 right heavy
export function balanceSvg(left, right, tilt = 0) {
  const t = tilt * 12, cx = 150;
  const ly = 70 + t, ry = 70 - t;
  let out = `<polygon points="${cx},70 ${cx - 22},170 ${cx + 22},170" fill="${C.purple}" stroke="${C.ink}" stroke-width="3"/>`;
  out += `<line x1="${cx - 110}" y1="${ly}" x2="${cx + 110}" y2="${ry}" stroke="${C.ink}" stroke-width="6" stroke-linecap="round"/>`;
  out += `<path d="M${cx - 150},${ly + 30} h80 l-10,14 h-60 Z" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/><line x1="${cx - 110}" y1="${ly}" x2="${cx - 110}" y2="${ly + 30}" stroke="${C.ink}" stroke-width="2"/>`;
  out += `<path d="M${cx + 70},${ry + 30} h80 l-10,14 h-60 Z" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/><line x1="${cx + 110}" y1="${ry}" x2="${cx + 110}" y2="${ry + 30}" stroke="${C.ink}" stroke-width="2"/>`;
  out += `<text x="${cx - 110}" y="${ly + 24}" font-size="26" text-anchor="middle">${left}</text><text x="${cx + 110}" y="${ry + 24}" font-size="26" text-anchor="middle">${right}</text>`;
  return svg(300, 180, out);
}

// calendar month grid (start = weekday index 0=lundi, days count)
export function calSvg(start, days, mark = []) {
  const cs = 40, heads = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  let out = '';
  heads.forEach((h, i) => { out += TXT(8 + i * cs + cs / 2, 26, h, 17); });
  for (let d = 1; d <= days; d++) {
    const p = start + d - 1, c = p % 7, r = Math.floor(p / 7);
    out += `<rect x="${8 + c * cs}" y="${36 + r * cs}" width="${cs}" height="${cs}" fill="${mark.includes(d) ? C.yellow : C.paper}" stroke="#9aa6c2" stroke-width="1.5"/>`;
    out += TXT(8 + c * cs + cs / 2, 36 + r * cs + 26, d, 16);
  }
  const rows = Math.ceil((start + days) / 7);
  return svg(16 + 7 * cs, 44 + rows * cs, out);
}
// drop duplicate {fr,en} labels (keeps first)
export const uniqT = (arr) => arr.filter((o, i, a) => a.findIndex((p) => JSON.stringify(p) === JSON.stringify(o)) === i);
