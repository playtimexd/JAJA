// Small SVG drawings shared by content generators. All return SVG strings.
const C = {
  ink: '#2b2d42', blue: '#4f8ef7', green: '#3cc47c', orange: '#ff9f43', pink: '#ff6b9a',
  yellow: '#ffd23f', purple: '#9b6bff', light: '#eef3ff', paper: '#ffffff',
};
export const COLORS = C;

const svg = (w, h, body) =>
  `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img">${body}</svg>`;

// Base-ten blocks picture of n (0..999)
export function base10(n) {
  const h = Math.floor(n / 100), t = Math.floor((n % 100) / 10), u = n % 10;
  let x = 6, out = '';
  const s = 7; // unit size
  for (let i = 0; i < h; i++) {
    out += `<rect x="${x}" y="6" width="${s * 10}" height="${s * 10}" fill="${C.blue}" stroke="${C.ink}" stroke-width="1.5" rx="2"/>`;
    for (let k = 1; k < 10; k++) {
      out += `<line x1="${x + k * s}" y1="6" x2="${x + k * s}" y2="${6 + s * 10}" stroke="#ffffff88" stroke-width="1"/>`;
      out += `<line x1="${x}" y1="${6 + k * s}" x2="${x + s * 10}" y2="${6 + k * s}" stroke="#ffffff88" stroke-width="1"/>`;
    }
    x += s * 10 + 8;
  }
  for (let i = 0; i < t; i++) {
    out += `<rect x="${x}" y="6" width="${s}" height="${s * 10}" fill="${C.green}" stroke="${C.ink}" stroke-width="1.5" rx="2"/>`;
    for (let k = 1; k < 10; k++) out += `<line x1="${x}" y1="${6 + k * s}" x2="${x + s}" y2="${6 + k * s}" stroke="#ffffff88"/>`;
    x += s + 5;
  }
  if (t) x += 6;
  for (let i = 0; i < u; i++) {
    const col = Math.floor(i / 5), row = i % 5;
    out += `<rect x="${x + col * (s + 4)}" y="${6 + s * 10 - (row + 1) * (s + 4) + 4}" width="${s}" height="${s}" fill="${C.orange}" stroke="${C.ink}" stroke-width="1.2" rx="1.5"/>`;
  }
  if (u) x += Math.ceil(u / 5) * (s + 4);
  return svg(Math.max(x + 6, 60), s * 10 + 12, out);
}

export function clock(h, m) {
  const cx = 100, cy = 100;
  let out = `<circle cx="${cx}" cy="${cy}" r="92" fill="${C.paper}" stroke="${C.ink}" stroke-width="6"/>`;
  for (let i = 1; i <= 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    out += `<text x="${cx + Math.sin(a) * 70}" y="${cy - Math.cos(a) * 70 + 8}" font-size="22" font-weight="700" text-anchor="middle" fill="${C.ink}" font-family="system-ui">${i}</text>`;
  }
  for (let i = 0; i < 60; i++) {
    const a = (i / 60) * Math.PI * 2, r1 = i % 5 ? 86 : 82;
    out += `<line x1="${cx + Math.sin(a) * r1}" y1="${cy - Math.cos(a) * r1}" x2="${cx + Math.sin(a) * 90}" y2="${cy - Math.cos(a) * 90}" stroke="${C.ink}" stroke-width="${i % 5 ? 1 : 2.5}"/>`;
  }
  const ha = ((h % 12) + m / 60) / 12 * Math.PI * 2, ma = (m / 60) * Math.PI * 2;
  out += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(ha) * 44}" y2="${cy - Math.cos(ha) * 44}" stroke="${C.ink}" stroke-width="9" stroke-linecap="round"/>`;
  out += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(ma) * 68}" y2="${cy - Math.cos(ma) * 68}" stroke="${C.blue}" stroke-width="6" stroke-linecap="round"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="7" fill="${C.ink}"/>`;
  return svg(200, 200, out);
}

// Plane figures
export function shape(kind, color = C.purple) {
  const st = `fill="${color}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"`;
  const body = {
    carre: `<rect x="25" y="25" width="90" height="90" ${st}/>`,
    rectangle: `<rect x="8" y="40" width="124" height="62" ${st}/>`,
    triangle: `<polygon points="70,14 128,122 12,122" ${st}/>`,
    cercle: `<circle cx="70" cy="70" r="55" ${st}/>`,
    losange: `<polygon points="70,8 122,70 70,132 18,70" ${st}/>`,
    hexagone: `<polygon points="40,18 100,18 130,70 100,122 40,122 10,70" ${st}/>`,
    pentagone: `<polygon points="70,10 130,55 107,126 33,126 10,55" ${st}/>`,
  }[kind];
  return svg(140, 140, body);
}

// Simple 3D solids, line drawings with flat shading
export function solid(kind) {
  const s = `stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"`;
  const b = {
    cube: `<polygon points="30,50 90,50 90,110 30,110" fill="${C.orange}" ${s}/><polygon points="30,50 55,28 115,28 90,50" fill="#ffc180" ${s}/><polygon points="90,50 115,28 115,88 90,110" fill="#e07d1f" ${s}/>`,
    prisme: `<polygon points="12,60 92,60 92,112 12,112" fill="${C.green}" ${s}/><polygon points="12,60 40,36 120,36 92,60" fill="#8fe3b3" ${s}/><polygon points="92,60 120,36 120,88 92,112" fill="#22955a" ${s}/>`,
    pyramide: `<polygon points="20,110 85,118 66,22" fill="${C.yellow}" ${s}/><polygon points="85,118 122,96 66,22" fill="#d9a800" ${s}/>`,
    sphere: `<circle cx="66" cy="70" r="50" fill="${C.pink}" ${s}/><ellipse cx="50" cy="52" rx="14" ry="9" fill="#ffffff88"/>`,
    cylindre: `<path d="M26,30 L26,105 A40,13 0 0 0 106,105 L106,30" fill="${C.blue}" ${s}/><ellipse cx="66" cy="30" rx="40" ry="13" fill="#9cc0ff" ${s}/>`,
    cone: `<path d="M66,14 L22,104 A44,14 0 0 0 110,104 Z" fill="${C.purple}" ${s}/><path d="M22,104 A44,14 0 0 1 110,104" fill="none" stroke="${C.ink}" stroke-width="2" stroke-dasharray="5 5"/>`,
  }[kind];
  return svg(132, 132, b);
}

// Fraction pictures: shape split into `parts` pieces, `shaded` of them coloured.
// equal=false draws an unequal split (for "is it shared fairly?" questions).
export function fraction(parts, shaded, kind = 'rect', equal = true) {
  let out = '';
  const fill = (i) => (i < shaded ? C.green : C.paper);
  if (kind === 'circle' && !equal) {
    const cx = 70, cy = 70, r = 58, w = [0.1, 0.45, 0.2, 0.25].slice(0, parts), sum = w.reduce((a, b) => a + b, 0);
    let acc = -Math.PI / 2;
    for (let i = 0; i < parts; i++) {
      const a0 = acc, a1 = acc + (w[i] / sum) * 2 * Math.PI; acc = a1;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      out += `<path d="M${cx},${cy} L${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)} A${r},${r} 0 ${large} 1 ${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)} Z" fill="${fill(i)}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>`;
    }
    return svg(140, 140, out);
  }
  if (kind === 'circle' && equal) {
    const cx = 70, cy = 70, r = 58;
    if (parts === 1) out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill(0)}" stroke="${C.ink}" stroke-width="4"/>`;
    for (let i = 0; parts > 1 && i < parts; i++) {
      const a0 = (i / parts) * 2 * Math.PI - Math.PI / 2, a1 = ((i + 1) / parts) * 2 * Math.PI - Math.PI / 2;
      const large = a1 - a0 > Math.PI ? 1 : 0;
      out += `<path d="M${cx},${cy} L${cx + r * Math.cos(a0)},${cy + r * Math.sin(a0)} A${r},${r} 0 ${large} 1 ${cx + r * Math.cos(a1)},${cy + r * Math.sin(a1)} Z" fill="${fill(i)}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>`;
    }
    return svg(140, 140, out);
  }
  // rectangle bar
  const W = 160, H = 80;
  let cuts = [];
  if (equal) for (let i = 0; i <= parts; i++) cuts.push((W * i) / parts);
  else {
    // deliberately unequal
    const w = [0.18, 0.5, 0.32, 0.25].slice(0, parts);
    const sum = w.reduce((a, b) => a + b, 0);
    let acc = 0;
    cuts = [0, ...w.map((v) => (acc += (v / sum) * W))];
  }
  for (let i = 0; i < parts; i++)
    out += `<rect x="${10 + cuts[i]}" y="10" width="${cuts[i + 1] - cuts[i]}" height="${H}" fill="${fill(i)}" stroke="${C.ink}" stroke-width="4"/>`;
  return svg(W + 20, H + 20, out);
}

// Bar chart: data = [{emoji, value}], max value <= 10
export function barChart(data, title = '') {
  const W = 60 + data.length * 70, H = 250, base = 210, unit = 18;
  let out = `<rect x="0" y="0" width="${W}" height="${H}" fill="${C.paper}" rx="12"/>`;
  for (let v = 0; v <= 10; v++) {
    out += `<line x1="44" y1="${base - v * unit}" x2="${W - 10}" y2="${base - v * unit}" stroke="#dde3f0" stroke-width="${v ? 1 : 3}"/>`;
    out += `<text x="34" y="${base - v * unit + 5}" font-size="13" text-anchor="end" fill="${C.ink}" font-family="system-ui">${v}</text>`;
  }
  const cols = [C.blue, C.orange, C.green, C.pink, C.purple];
  data.forEach((d, i) => {
    const x = 62 + i * 70;
    out += `<rect x="${x}" y="${base - d.value * unit}" width="44" height="${d.value * unit}" fill="${cols[i % cols.length]}" stroke="${C.ink}" stroke-width="2" rx="3"/>`;
    out += `<text x="${x + 22}" y="${base + 30}" font-size="26" text-anchor="middle">${d.emoji}</text>`;
  });
  if (title) out += `<text x="${W / 2}" y="18" font-size="14" text-anchor="middle" fill="${C.ink}" font-family="system-ui">${title}</text>`;
  return svg(W, H, out);
}

// Ruler with a coloured bar of `len` cm starting at 0
export function ruler(len, emoji = '') {
  const cm = 26, W = 30 + 15 * cm, out = [];
  out.push(`<rect x="${15}" y="${10}" width="${len * cm}" height="26" rx="13" fill="${C.pink}" stroke="${C.ink}" stroke-width="2.5"/>`);
  if (emoji) out.push(`<text x="${15 + (len * cm) / 2}" y="31" font-size="18" text-anchor="middle">${emoji}</text>`);
  out.push(`<rect x="5" y="48" width="${W - 10}" height="56" rx="6" fill="${C.yellow}" stroke="${C.ink}" stroke-width="2.5"/>`);
  for (let i = 0; i <= 15; i++) {
    const x = 15 + i * cm;
    out.push(`<line x1="${x}" y1="48" x2="${x}" y2="${i % 5 ? 66 : 74}" stroke="${C.ink}" stroke-width="2"/>`);
    out.push(`<text x="${x}" y="94" font-size="14" text-anchor="middle" fill="${C.ink}" font-family="system-ui">${i}</text>`);
    if (i < 15) out.push(`<line x1="${x + cm / 2}" y1="48" x2="${x + cm / 2}" y2="58" stroke="${C.ink}" stroke-width="1"/>`);
  }
  return svg(W, 112, out.join(''));
}

// ---------- added for the enriched math bank ----------

// `g` rounded "plates", each holding `per` emojis (equal groups)
export function groups(g, per, emoji) {
  const cols = Math.min(per, 3), rows = Math.ceil(per / 3), cs = 34;
  const bw = cols * cs + 16, bh = rows * cs + 16, gap = 14;
  const perRow = Math.max(1, Math.min(g, Math.floor(480 / (bw + gap))));
  const nRows = Math.ceil(g / perRow);
  let out = '';
  for (let i = 0; i < g; i++) {
    const r = Math.floor(i / perRow), c = i % perRow;
    const x = 8 + c * (bw + gap), y = 8 + r * (bh + gap);
    out += `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="18" fill="${C.light}" stroke="${C.blue}" stroke-width="3"/>`;
    for (let k = 0; k < per; k++) {
      const cx = x + 8 + (k % 3) * cs + cs / 2, cy = y + 8 + Math.floor(k / 3) * cs + cs / 2;
      out += `<text x="${cx}" y="${cy + 10}" font-size="28" text-anchor="middle">${emoji}</text>`;
    }
  }
  const W = 16 + perRow * bw + (perRow - 1) * gap, H = 16 + nRows * bh + (nRows - 1) * gap;
  return svg(W, H, out);
}

// rows x cols array of one emoji
export function emojiGrid(rows, cols, emoji) {
  const cs = 42;
  let out = '';
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) out += `<text x="${8 + c * cs + cs / 2}" y="${8 + r * cs + cs / 2 + 11}" font-size="32" text-anchor="middle">${emoji}</text>`;
  return svg(16 + cols * cs, 16 + rows * cs, out);
}

// Canadian money. items = values in cents (5, 10, 25, 100, 200, 500, 1000)
const COINS = {
  5: { r: 26, fill: '#c9ced6', label: '5¢' },
  10: { r: 22, fill: '#d5dae2', label: '10¢' },
  25: { r: 30, fill: '#bfc5cf', label: '25¢' },
  100: { r: 34, fill: '#f2c230', label: '1 $' },
  200: { r: 38, fill: '#c9ced6', inner: '#f2c230', label: '2 $' },
};
const BILLS = { 500: { fill: '#6fa8ff', label: '5 $' }, 1000: { fill: '#b79cff', label: '10 $' } };
export function money(items, maxW = 440) {
  let x = 6, y = 6, rowH = 0, out = '', W = 0;
  for (const v of items) {
    const bill = BILLS[v], co = COINS[v];
    const w = bill ? 112 : co.r * 2, h = bill ? 58 : co.r * 2;
    if (x + w > maxW && x > 6) { x = 6; y += rowH + 10; rowH = 0; }
    if (bill) {
      out += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${bill.fill}" stroke="${C.ink}" stroke-width="3"/>`;
      out += `<rect x="${x + 8}" y="${y + 8}" width="${w - 16}" height="${h - 16}" rx="5" fill="none" stroke="#ffffffaa" stroke-width="2"/>`;
      out += `<text x="${x + w / 2}" y="${y + h / 2 + 8}" font-size="22" font-weight="800" text-anchor="middle" fill="${C.ink}" font-family="system-ui">${bill.label}</text>`;
    } else {
      const cx = x + co.r, cy = y + co.r;
      out += `<circle cx="${cx}" cy="${cy}" r="${co.r}" fill="${co.fill}" stroke="${C.ink}" stroke-width="3"/>`;
      if (co.inner) out += `<circle cx="${cx}" cy="${cy}" r="${co.r * 0.64}" fill="${co.inner}" stroke="${C.ink}" stroke-width="2"/>`;
      else out += `<circle cx="${cx}" cy="${cy}" r="${co.r - 5}" fill="none" stroke="#ffffff99" stroke-width="2"/>`;
      out += `<text x="${cx}" y="${cy + 6}" font-size="${co.r > 30 ? 19 : 16}" font-weight="800" text-anchor="middle" fill="${C.ink}" font-family="system-ui">${co.label}</text>`;
    }
    x += w + 10; rowH = Math.max(rowH, h); W = Math.max(W, x);
  }
  return svg(W + 0, y + rowH + 8, out);
}

// Grid plan with column letters (top) and row numbers (left). cells = [{c, r, e}] zero-based.
export function plan(cols, rows, cells = [], mark = null, labels = true) {
  const cs = 58, ox = 34, oy = 34;
  let out = '';
  for (let c = 0; labels && c < cols; c++) out += `<text x="${ox + c * cs + cs / 2}" y="24" font-size="22" font-weight="800" text-anchor="middle" fill="${C.ink}" font-family="system-ui">${'ABCDEFG'[c]}</text>`;
  for (let r = 0; labels && r < rows; r++) out += `<text x="16" y="${oy + r * cs + cs / 2 + 8}" font-size="22" font-weight="800" text-anchor="middle" fill="${C.ink}" font-family="system-ui">${r + 1}</text>`;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) out += `<rect x="${ox + c * cs}" y="${oy + r * cs}" width="${cs}" height="${cs}" fill="${mark && mark.c === c && mark.r === r ? C.yellow : C.paper}" stroke="${C.ink}" stroke-width="2.5"/>`;
  for (const k of cells) out += `<text x="${ox + k.c * cs + cs / 2}" y="${oy + k.r * cs + cs / 2 + 12}" font-size="36" text-anchor="middle">${k.e}</text>`;
  return svg(ox + cols * cs + 8, oy + rows * cs + 8, out);
}

// Symmetry figure. inner = left-side points [[x,y]...] with x<70; right = right-side points (top to bottom) or null.
// half=true draws only the left half (flat edge on the axis).
export function symFigure(inner, right, { axis = true, half = false, color = C.purple } = {}) {
  let pts = [[70, 10], ...inner, [70, 130]];
  if (!half) pts = pts.concat(right.slice().reverse());
  const poly = `<polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="${color}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>`;
  const ax = axis ? `<line x1="70" y1="0" x2="70" y2="140" stroke="${C.ink}" stroke-width="2.5" stroke-dasharray="7 6"/>` : '';
  return svg(140, 140, poly + ax);
}
