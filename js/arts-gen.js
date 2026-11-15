// Arts plastiques — runtime generator for the big imported libraries (OpenMoji, Quick, Draw!).
// Pure string code (no DOM, no imports) so tools/check-arts.mjs can run it in Node.
//   gen: 'parts'   -> project has `line` (all-<path> black outline, 72x72) + `color` (72x72 inner SVG)
//   gen: 'strokes' -> project has `strokes` ("x,y x,y|x,y …", Quick, Draw! 256x256 box)
// Both produce `steps` [{svg,text}] following docs/ARTS.md (viewBox 0 0 400 300).
export const D = '#3a3f55', K = '#ff5d8f';
const SC = 300 / 72;   // 72x72 OpenMoji box -> 300 tall, centred in 400
const f1 = (v) => { const s = (Math.round(v * 10) / 10).toFixed(1); return s.endsWith('.0') ? s.slice(0, -2) : s; };
const wrap = (inner) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const MACRO_L = ' fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"';
const unmacro = (s) => s.replace(/~l/g, MACRO_L);

export const CREDIT = {
  openmoji: { fr: 'Illustration : OpenMoji – openmoji.org – CC BY-SA 4.0', en: 'Illustration: OpenMoji – openmoji.org – CC BY-SA 4.0' },
  quickdraw: { fr: 'Dessin : jeu de données Quick, Draw! de Google – CC BY 4.0', en: 'Drawing: Google Quick, Draw! dataset – CC BY 4.0' },
};

// ---------- French / English subject helpers ----------
const VOWEL = /^(?:[aeiouâàéèêëîïôöûùœ]|h(?:élicoptère|ippopotame|uître))/i;
export function frSubject(title) {
  const m = /^(Une|Un|Des|Du|La|Le|Les)\s+(.+)$/i.exec(title.fr.trim());
  if (!m) return { le: title.fr, de: 'de ' + title.fr, ton: 'ton dessin', noun: title.fr };
  const art = m[1].toLowerCase(), noun = m[2], v = VOWEL.test(noun);
  if (art === 'des' || art === 'les') return { le: 'les ' + noun, de: 'des ' + noun, ton: 'tes ' + noun, noun };
  if (art === 'du' || art === 'le' || art === 'un') return v ? { le: 'l’' + noun, de: 'de l’' + noun, ton: 'ton ' + noun, noun } : { le: 'le ' + noun, de: 'du ' + noun, ton: 'ton ' + noun, noun };
  return v ? { le: 'l’' + noun, de: 'de l’' + noun, ton: 'ton ' + noun, noun } : { le: 'la ' + noun, de: 'de la ' + noun, ton: 'ta ' + noun, noun };
}
export function enSubject(title) {
  let t = title.en.trim(); let noun = t;
  const m = /^(An?|The|Some)\s+(.+)$/i.exec(t); if (m) noun = m[2];
  const lower = (s) => (/^(Japanese|Christmas|Milky|T-Rex|French)/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1));
  return { the: 'the ' + lower(noun), your: 'your ' + lower(noun) };
}

// ---------- path helpers ----------
const NP = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7, z: 0 };
export function pathBox(d) {
  const toks = d.match(/[a-zA-Z]|-?(?:\d+\.?\d*|\.\d+)/g) || [];
  let x = 0, y = 0, sx = 0, sy = 0, i = 0, cmd = '', x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  const add = (px, py) => { if (px < x0) x0 = px; if (px > x1) x1 = px; if (py < y0) y0 = py; if (py > y1) y1 = py; };
  while (i < toks.length) {
    if (/[a-zA-Z]/.test(toks[i])) { cmd = toks[i++]; if (/z/i.test(cmd)) { x = sx; y = sy; continue; } }
    const lc = cmd.toLowerCase(), rel = cmd === lc, k = NP[lc]; if (!k) { i++; continue; }
    const a = toks.slice(i, i + k).map(Number); i += k; if (a.length < k) break;
    const ox = rel ? x : 0, oy = rel ? y : 0;
    if (lc === 'm' || lc === 'l' || lc === 't') { x = ox + a[0]; y = oy + a[1]; if (lc === 'm') { sx = x; sy = y; } add(x, y); if (lc === 'm') cmd = rel ? 'l' : 'L'; }
    else if (lc === 'h') { x = ox + a[0]; add(x, y); }
    else if (lc === 'v') { y = oy + a[0]; add(x, y); }
    else if (lc === 'c') { add(ox + a[0], oy + a[1]); add(ox + a[2], oy + a[3]); x = ox + a[4]; y = oy + a[5]; add(x, y); }
    else if (lc === 's' || lc === 'q') { add(ox + a[0], oy + a[1]); x = ox + a[2]; y = oy + a[3]; add(x, y); }
    else if (lc === 'a') { const ex = ox + a[5], ey = oy + a[6], mx = (x + ex) / 2, my = (y + ey) / 2; add(x, y); add(mx - a[0], my - a[1]); add(mx + a[0], my + a[1]); x = ex; y = ey; add(x, y); }
  }
  return [x0, y0, x1, y1];
}

// ---------- parts (OpenMoji) ----------
function parseLine(line) {
  const out = []; const re = /<path([^>]*)\/>/g; let m, idx = 0;
  while ((m = re.exec(line))) {
    const a = {}; for (const q of m[1].matchAll(/([\w-]+)="([^"]*)"/g)) a[q[1]] = q[2];
    if (!a.d) continue;
    const bb = pathBox(a.d);
    out.push({ d: a.d, t: a.t || 's', w: a.w ? parseFloat(a.w) : 2, eo: a.e === '1', bb, diag: Math.hypot(bb[2] - bb[0], bb[3] - bb[1]), f0: 0, f1: 1, src: idx++ });
  }
  return out;
}
const eff = (p) => p.diag * (p.f1 - p.f0);
function splitPieces(ps) {
  // very simple drawings: cut the biggest outline into two (revealed with dashes) until there are 5 pieces
  let guard = 0;
  while (ps.length < 5 && guard++ < 8) {
    const cand = ps.filter((p) => p.t === 's' && (p.f1 - p.f0) > 0.2).sort((a, b) => eff(b) - eff(a))[0];
    if (!cand) break;
    const mid = (cand.f0 + cand.f1) / 2;
    const a = { ...cand, f1: mid }, b = { ...cand, f0: mid };
    ps.splice(ps.indexOf(cand), 1, a, b);
  }
  return ps;
}
function pieceEl(p, col, k, merged) {
  const f0 = merged ? merged[0] : p.f0, f1 = merged ? merged[1] : p.f1;
  const dash = f0 > 0.001 || f1 < 0.999 ? ` pathLength="100" stroke-dasharray="${f1c(f1 - f0)} 200" stroke-dashoffset="${f1c(-f0)}"` : '';
  const ev = p.eo ? ' fill-rule="evenodd"' : '';
  if (p.t === 'f') return `<path fill="${col}"${ev} d="${p.d}"/>`;
  const sw = Math.abs(p.w - 2) > 0.05 ? ` stroke-width="${fw(p.w * k)}"` : '';
  if (p.t === 'b') return `<path fill="${col}"${ev} stroke="${col}" stroke-linecap="round" stroke-linejoin="round"${sw || ` stroke-width="${fw(2 * k)}"`} d="${p.d}"/>`;
  return `<path${sw}${dash} d="${p.d}"/>`;
}
const fw = (v) => String(Math.round(v * 100) / 100);
const f1c = (v) => String(Math.round(v * 1000) / 10);
function groupEls(list, col, k) {
  // merge consecutive dash pieces of the same source path
  const bySrc = new Map(); const plain = [];
  for (const p of list) { if (p.t === 's' && (p.f0 > 0 || p.f1 < 1)) { const g = bySrc.get(p.src) || []; g.push(p); bySrc.set(p.src, g); } else plain.push(p); }
  const strokeEls = [], fillEls = [];
  for (const p of plain) (p.t === 's' ? strokeEls : fillEls).push(pieceEl(p, col, k));
  for (const g of bySrc.values()) {
    g.sort((a, b) => a.f0 - b.f0); let cur = null;
    for (const p of g) { if (cur && p.f0 <= cur[1] + 0.001) cur[1] = Math.max(cur[1], p.f1); else { if (cur) strokeEls.push(pieceEl(g[0], col, k, cur)); cur = [p.f0, p.f1]; } }
    if (cur) strokeEls.push(pieceEl(g[0], col, k, cur));
  }
  let s = '';
  if (strokeEls.length) s += `<g fill="none" stroke="${col}" stroke-width="${fw(2 * k)}" stroke-linecap="round" stroke-linejoin="round">${strokeEls.join('')}</g>`;
  if (fillEls.length) s += `<g>${fillEls.join('')}</g>`;
  return s;
}
const OLD_K = 6 / (2 * SC), NEW_K = 8 / (2 * SC);   // stroke width 6 (old) / 8 (new) on screen for a width-2 line
const place = (inner) => wrap(`<g transform="translate(50 0) scale(4.1667)">${inner}</g>`);

function chunk(m, n) {
  // sizes grow from the big shapes to the many small details
  const w = Array.from({ length: n }, (_, i) => 1 + 0.45 * i); const tot = w.reduce((a, b) => a + b, 0);
  const sizes = w.map((x) => Math.max(1, Math.round((x / tot) * m)));
  let diff = m - sizes.reduce((a, b) => a + b, 0);
  for (let i = n - 1; diff !== 0; i = (i - 1 + n) % n) { if (diff > 0) { sizes[i]++; diff--; } else if (sizes[i] > 1) { sizes[i]--; diff++; } }
  return sizes;
}

const T_FR = {
  first: (s) => `Dessine la grande forme ${s.de}.`,
  mid: [(s) => `Ajoute les parties moyennes ${s.de}.`, () => 'Ajoute les parties en rose.', (s) => `Continue avec d’autres lignes pour ${s.le}.`, () => 'Dessine encore des formes en rose.', (s) => `Ajoute d’autres parties ${s.de}.`],
  last: () => 'Termine avec les petits détails.',
  color: (s) => `Colorie ${s.ton}!`,
};
const T_EN = {
  first: (s) => `Draw the big shape of ${s.the}.`,
  mid: [(s) => `Add the medium parts of ${s.the}.`, () => 'Add the parts in pink.', () => 'Keep going with the pink lines.', () => 'Draw more shapes in pink.', (s) => `Add more parts of ${s.the}.`],
  last: () => 'Finish with the small details.',
  color: (s) => `Color ${s.your}!`,
};

function partsSteps(p) {
  let ps = splitPieces(parseLine(p.line));
  ps.sort((a, b) => eff(b) - eff(a) || a.src - b.src || a.f0 - b.f0);
  const m = ps.length;
  const n = Math.max(1, Math.min(m, Math.min(7, Math.max(3, Math.round(m / 2.4)))));
  const sizes = chunk(m, n);
  const sf = frSubject(p.title), se = enSubject(p.title);
  const steps = []; let at = 0;
  for (let i = 0; i < n; i++) {
    const fresh = ps.slice(at, at + sizes[i]), old = ps.slice(0, at); at += sizes[i];
    const inner = groupEls(old, D, OLD_K) + groupEls(fresh, K, NEW_K);
    const kind = i === 0 ? 'first' : (i === n - 1 && n > 2) ? 'last' : 'mid';
    const mi = Math.max(0, i - 1);
    const text = kind === 'mid' ? { fr: T_FR.mid[mi % T_FR.mid.length](sf), en: T_EN.mid[mi % T_EN.mid.length](se) } : { fr: T_FR[kind](sf), en: T_EN[kind](se) };
    steps.push({ svg: place(inner), text });
  }
  steps.push({ svg: place(unmacro(p.color)), text: { fr: T_FR.color(sf), en: T_EN.color(se) } });
  return steps;
}

// ---------- strokes (Quick, Draw!) ----------
export function parseStrokes(s) { return s.split('|').map((st) => st.trim().split(' ').map((q) => q.split(',').map(Number))); }
function fitStrokes(strokes) {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const st of strokes) for (const [x, y] of st) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  const w = Math.max(1, x1 - x0), h = Math.max(1, y1 - y0), sc = Math.min(350 / w, 260 / h);
  const ox = (400 - w * sc) / 2 - x0 * sc, oy = (300 - h * sc) / 2 - y0 * sc;
  return strokes.map((st) => { const pts = st.map(([x, y]) => `${f1(x * sc + ox)},${f1(y * sc + oy)}`); if (pts.length === 1) pts.push(pts[0]); return pts.join(' '); });
}
const pl = (pts) => `<polyline points="${pts}"/>`;
const sgroup = (list, col, wd) => (list.length ? `<g fill="none" stroke="${col}" stroke-width="${wd}" stroke-linecap="round" stroke-linejoin="round">${list.map(pl).join('')}</g>` : '');
const QD_FR = { first: (s) => `Dessine ${s.le} : commence par le trait rose.`, mid: ['Ajoute le trait suivant.', 'Continue avec la ligne rose.', 'Dessine la partie en rose.', 'Ajoute un autre trait.'], last: 'Ajoute le dernier trait.', color: 'Colorie-le comme tu veux!' };
const QD_EN = { first: (s) => `Draw ${s.the}: start with the pink line.`, mid: ['Add the next line.', 'Keep going with the pink line.', 'Draw the part in pink.', 'Add another line.'], last: 'Add the last line.', color: 'Color it any way you like!' };
function strokeSteps(p) {
  const pts = fitStrokes(parseStrokes(p.strokes));
  const per = pts.length <= 7 ? 1 : 2; const sf = frSubject(p.title), se = enSubject(p.title);
  const steps = []; const nst = Math.ceil(pts.length / per);
  for (let i = 0; i < nst; i++) {
    const old = pts.slice(0, i * per), fresh = pts.slice(i * per, (i + 1) * per);
    const kind = i === 0 ? 'first' : (i === nst - 1 && nst > 2) ? 'last' : 'mid';
    const text = kind === 'first' ? { fr: QD_FR.first(sf), en: QD_EN.first(se) } : kind === 'last' ? { fr: QD_FR.last, en: QD_EN.last } : { fr: QD_FR.mid[(i - 1) % QD_FR.mid.length], en: QD_EN.mid[(i - 1) % QD_EN.mid.length] };
    steps.push({ svg: wrap(sgroup(old, D, 6) + sgroup(fresh, K, 8)), text });
  }
  steps.push({ svg: wrap(sgroup(pts, D, 6)), text: { fr: QD_FR.color, en: QD_EN.color } });
  return steps;
}

// ---------- public ----------
export function genSteps(p) { return p.gen === 'parts' ? partsSteps(p) : p.gen === 'strokes' ? strokeSteps(p) : p.steps; }
export function ensureSteps(p) { if (!p.steps) p.steps = genSteps(p); return p.steps; }
export function thumbSvg(p) {
  if (p.steps) return p.steps[p.steps.length - 1].svg;
  if (p.gen === 'parts') return place(unmacro(p.color));
  if (p.gen === 'strokes') return wrap(sgroup(fitStrokes(parseStrokes(p.strokes)), D, 6));
  return '';
}
