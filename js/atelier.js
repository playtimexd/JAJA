// « Atelier » — free painting / colouring canvas for Apple Pencil and finger.
// Layers (bottom → top): paper colour (CSS background) · paint canvas · live-stroke canvas · line-art canvas (colouring pages).
// History = a base canvas + the last ≤30 operations (strokes are deterministic, chalk uses a seeded RNG), so undo replays.
// Autosave: the paint layer (PNG) + settings go to IndexedDB 'hibou-musee' / kv 'atelier-draft' (see musee.js).
import { el, makeRng } from './util.js';
import { tr } from './i18n.js';
import { sfx } from './audio.js';
import { screen, backBtn, sheet, refreshWallet } from './ui.js';
import { save } from './store.js';
import { addCoins, confetti, COIN } from './game.js';
import { ensureSteps } from './arts-gen.js';
import { addArtwork, getArtwork, kvGet, kvSet } from './musee.js';

const L = {
  title: { fr: 'Atelier', en: 'Studio' },
  undo: { fr: 'Annuler', en: 'Undo' }, redo: { fr: 'Rétablir', en: 'Redo' },
  sym: { fr: 'Miroir', en: 'Mirror' }, paper: { fr: 'Papier', en: 'Paper' }, pages: { fr: 'Coloriages', en: 'Colouring' },
  clear: { fr: 'Effacer', en: 'Clear' }, museum: { fr: 'Mon musée', en: 'My museum' },
  size: { fr: 'Taille', en: 'Size' }, mix: { fr: 'Mélange', en: 'Mix' },
  mixT: { fr: 'Mélange deux couleurs', en: 'Mix two colours' }, mixS: { fr: 'Touche une couleur, puis une autre.', en: 'Tap one colour, then another.' },
  mixAdd: { fr: 'Ajouter à ma palette', en: 'Add to my palette' },
  paperT: { fr: 'Choisis ton papier', en: 'Choose your paper' },
  stampT: { fr: 'Choisis un tampon', en: 'Choose a stamp' },
  pagesT: { fr: 'Choisis un coloriage', en: 'Choose a colouring page' }, blank: { fr: 'Feuille blanche', en: 'Blank page' },
  clearT: { fr: 'Tout effacer?', en: 'Erase everything?' },
  clearPaint: { fr: 'Effacer ma peinture', en: 'Erase my painting' }, newBlank: { fr: 'Nouvelle feuille blanche', en: 'New blank page' },
  keep: { fr: 'Non, garder', en: 'No, keep it' },
  replaceT: { fr: 'Commencer une nouvelle page?', en: 'Start a new page?' },
  replaceS: { fr: 'Ton dessin actuel sera remplacé. Mets-le dans ton musée avant, si tu veux le garder!', en: 'Your current drawing will be replaced. Put it in your museum first if you want to keep it!' },
  go: { fr: 'Oui, nouvelle page', en: 'Yes, new page' },
  resumeT: { fr: 'Tu as un dessin pas fini!', en: 'You have an unfinished drawing!' },
  resume: { fr: 'Reprendre mon dessin', en: 'Continue my drawing' }, startCol: { fr: 'Commencer le coloriage', en: 'Start the colouring page' },
  saveT: { fr: 'Accrocher dans mon musée', en: 'Hang it in my museum' }, nameIt: { fr: 'Donne un titre à ton œuvre :', en: 'Give your artwork a title:' },
  hang: { fr: 'Accrocher 🖼️', en: 'Hang it 🖼️' },
  saved: { fr: 'Ton œuvre est dans ton musée!', en: 'Your artwork is in your museum!' },
  updated: { fr: 'Ton œuvre a été mise à jour dans ton musée.', en: 'Your artwork was updated in your museum.' },
  already: { fr: 'Cette œuvre est déjà dans ton musée.', en: 'This artwork is already in your museum.' },
  empty: { fr: 'Dessine d’abord quelque chose!', en: 'Draw something first!' },
  fail: { fr: 'Oups! Je n’ai pas pu l’enregistrer.', en: 'Oops! I could not save it.' },
  ok: { fr: 'Super!', en: 'Great!' }, myDrawing: { fr: 'Mon dessin', en: 'My drawing' },
};
const TOOLS = [
  { id: 'crayon', icon: '✏️', t: { fr: 'Crayon', en: 'Pencil' } },
  { id: 'pinceau', icon: '🖌️', t: { fr: 'Pinceau', en: 'Brush' } },
  { id: 'feutre', icon: '🖊️', t: { fr: 'Feutre', en: 'Marker' } },
  { id: 'craie', icon: '🖍️', t: { fr: 'Craie', en: 'Chalk' } },
  { id: 'gomme', icon: '🧽', t: { fr: 'Gomme', en: 'Eraser' } },
  { id: 'seau', icon: '🪣', t: { fr: 'Remplir', en: 'Fill' } },
  { id: 'tampon', icon: '⭐', t: { fr: 'Tampons', en: 'Stamps' } },
];
const ALPHA = { crayon: 1, pinceau: 0.72, feutre: 0.9, craie: 0.92, gomme: 1 };
const COLORS = ['#23253a', '#8a8fa3', '#ffffff', '#8b5a3c', '#ef4b4b', '#ff9f43', '#ffd23f', '#9be15d',
  '#2fb36f', '#2ec4b6', '#6ec1ff', '#3d6fe0', '#8b5cf6', '#ff5d8f', '#ffb3cf', '#f5c99b'];
const PAPERS = [
  { c: '#ffffff', t: { fr: 'Blanc', en: 'White' } }, { c: '#fff4dc', t: { fr: 'Crème', en: 'Cream' } },
  { c: '#e6f3ff', t: { fr: 'Bleu ciel', en: 'Sky blue' } }, { c: '#ffe8f0', t: { fr: 'Rose', en: 'Pink' } },
  { c: '#eaf6df', t: { fr: 'Vert tendre', en: 'Soft green' } }, { c: '#d8b88e', t: { fr: 'Carton', en: 'Kraft' } },
  { c: '#2b2d42', t: { fr: 'Tableau noir', en: 'Blackboard' } },
];
const STAMPS = ['star', 'heart', 'circle', 'flower', '🦋', '🐞', '🌈', '🍁', '❄️', '🐟', '🦉', '🍄', '☀️', '🌙', '🎈', '🌸'];
const MIX_KEY = 'hibou-atelier-mix', DRAFT = 'atelier-draft', TOL = 48;

// ---------------- colouring pages from projects ----------------
/** Line-art SVG (string) of a drawing project's last line step, or null when the project has no line drawing. */
export function coloringFromProject(p) {
  if (!p || (!p.gen && p.cat !== 'dessin')) return null;
  let steps;
  try { steps = ensureSteps(p); } catch { return null; }
  if (!steps || steps.length < 2) return null;
  return steps[steps.length - 2].svg
    .replace(/#ff5d8f/gi, '#3a3f55')
    .replace(/stroke-width="8"/g, 'stroke-width="6"').replace(/stroke-width="1\.92"/g, 'stroke-width="1.44"')
    .replace(/fill="#fff(?:fff)?"/gi, 'fill="none"');                         // white fills would hide the paint
}

// ---------------- colour helpers ----------------
const hex2rgb = (h) => { const n = parseInt(h.slice(1), 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const rgb2hex = (a) => '#' + a.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
// RYB (painter's) mixing so blue + yellow = green, red + yellow = orange…
function rgb2ryb([r, g, b]) {
  const w = Math.min(r, g, b); r -= w; g -= w; b -= w;
  const mg = Math.max(r, g, b); let y = Math.min(r, g); r -= y; g -= y;
  if (b && g) { b /= 2; g /= 2; }
  y += g; b += g;
  const my = Math.max(r, y, b); if (my) { const n = mg / my; r *= n; y *= n; b *= n; }
  return [r + w, y + w, b + w];
}
function ryb2rgb([r, y, b]) {
  const w = Math.min(r, y, b); r -= w; y -= w; b -= w;
  const my = Math.max(r, y, b); let g = Math.min(y, b); y -= g; b -= g;
  if (b && g) { b *= 2; g *= 2; }
  r += y; g += y;
  const mg = Math.max(r, g, b); if (mg) { const n = my / mg; r *= n; g *= n; b *= n; }
  return [r + w, g + w, b + w];
}
function rgb2hsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, dd = mx - mn;
  if (!dd) return [0, 0, l];
  const s = dd / (1 - Math.abs(2 * l - 1));
  const h = mx === r ? ((g - b) / dd + 6) % 6 : mx === g ? (b - r) / dd + 2 : (r - g) / dd + 4;
  return [h * 60, s, l];
}
function hsl2rgb([h, s, l]) {
  const c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = l - c / 2;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}
// hue from the RYB mix, saturation / lightness = average of the two paints (keeps mixes bright, not muddy)
export function mixColors(a, b) {
  const A = hex2rgb(a), B = hex2rgb(b), x = rgb2ryb(A), y = rgb2ryb(B);
  const [h] = rgb2hsl(ryb2rgb(x.map((v, i) => (v + y[i]) / 2)));
  const ha = rgb2hsl(A), hb = rgb2hsl(B);
  return rgb2hex(hsl2rgb([h, (ha[1] + hb[1]) / 2, (ha[2] + hb[2]) / 2]));
}
const loadMix = () => { try { return JSON.parse(localStorage.getItem(MIX_KEY)) || []; } catch { return []; } };
const saveMix = (a) => { try { localStorage.setItem(MIX_KEY, JSON.stringify(a.slice(0, 8))); } catch { /* private */ } };

// ---------------- the studio ----------------
/**
 * openAtelier({ coloring, title, projectId, back, onMusee } = {})
 *   coloring : SVG string of line art (drawn on top; the bucket uses it as walls). Omit to resume the last drawing / blank page.
 *   title    : default artwork title (e.g. the project or colouring page title, string or {fr,en}).
 *   back     : called by the ‹ button. onMusee (optional): shows « Voir mon musée » after saving.
 */
export async function openAtelier(opts = {}) {
  const { back, onMusee } = opts;
  let draft = opts.fresh ? null : await kvGet(DRAFT);
  if (draft && !(draft.blob instanceof Blob)) draft = null;
  if (opts.coloring && draft) {
    const unfinished = draft.version > 0 && draft.savedVersion !== draft.version && draft.coloring !== opts.coloring;
    if (unfinished) {
      const keepOld = await new Promise((res) => {
        let answered = false;
        const sh = sheet(el('div', { class: 'at-ask' }, el('h2', {}, '🎨 ', tr(L.resumeT)),
          el('img', { class: 'at-ask-img', src: URL.createObjectURL(draft.blob), alt: '', style: { background: draft.paper } }),
          el('div', { class: 'at-ask-btns' },
            el('button', { class: 'btn', onclick: () => { answered = true; sfx('tap'); sh.close(); res(true); } }, tr(L.resume)),
            el('button', { class: 'btn primary', onclick: () => { answered = true; sfx('tap'); sh.close(); res(false); } }, tr(L.startCol)))));
        const obs = new MutationObserver(() => { if (!sh.node.isConnected) { obs.disconnect(); if (!answered) res(true); } });
        obs.observe(document.body, { childList: true });
      });
      if (!keepOld) draft = null;
    } else if (draft.coloring !== opts.coloring) draft = null;
  } else if (opts.fresh) draft = null;

  const S = draft ? {
    id: draft.id, W: draft.W, H: draft.H, paper: draft.paper || '#ffffff', coloring: draft.coloring || null, title: draft.title || '',
    projectId: draft.projectId || null, museumId: draft.museumId || null, rewarded: !!draft.rewarded, version: draft.version || 0, savedVersion: draft.savedVersion ?? -1,
  } : {
    id: `d-${Date.now().toString(36)}`, W: 0, H: 0, paper: '#ffffff', coloring: opts.coloring || null, title: tr(opts.title) || '',
    projectId: opts.projectId || null, museumId: null, rewarded: false, version: 0, savedVersion: -1,
  };
  const ui = { tool: 'crayon', color: '#ff5d8f', size: 12, sym: 0, stamp: 'star' };
  try { Object.assign(ui, JSON.parse(localStorage.getItem('hibou-atelier-ui')) || {}); } catch { /* defaults */ }
  const keepUi = () => { try { localStorage.setItem('hibou-atelier-ui', JSON.stringify(ui)); } catch { /* private */ } };

  // ---------- DOM ----------
  const paintC = el('canvas', { class: 'at-paint' }), strokeC = el('canvas', { class: 'at-stroke' }), linesC = el('canvas', { class: 'at-lines' });
  const board = el('div', { class: 'at-board', style: { background: S.paper } }, paintC, strokeC, linesC);
  const stage = el('div', { class: 'at-stage' }, board);
  const btn = (icon, label, fn, cls = '') => el('button', { class: `at-btn ${cls}`, 'aria-label': tr(label), title: tr(label), onclick: () => { sfx('tap'); fn(); } }, el('span', { class: 'ai' }, icon), el('small', {}, tr(label)));
  const undoB = btn('↶', L.undo, () => undo()), redoB = btn('↷', L.redo, () => redo());
  const symB = btn('🪞', L.sym, () => { ui.sym = (ui.sym + 1) % 3; keepUi(); setSym(); });
  const saveB = el('button', { class: 'btn primary at-save', onclick: () => { sfx('tap'); toMuseum(); } }, '🖼️ ', el('span', {}, tr(L.museum)));
  const toolsBox = el('div', { class: 'at-tools' });
  const sizeIn = el('input', { type: 'range', min: '3', max: '48', step: '1', value: String(ui.size), class: 'at-range', 'aria-label': tr(L.size) });
  const sizeDot = el('span', { class: 'at-dot' });
  const pal = el('div', { class: 'at-pal' });
  const root = screen('atelier-screen purple',
    el('header', { class: 'bar at-bar' }, backBtn(() => { flush(); (back || (() => history.back()))(); }),
      el('h1', {}, '🎨 ', tr(L.title)),
      el('div', { class: 'at-acts' }, undoB, redoB, symB, btn('📄', L.paper, paperSheet), btn('🖍️', L.pages, pagesSheet), btn('🗑️', L.clear, clearSheet)),
      saveB),
    el('div', { class: 'at-main' },
      toolsBox, stage,
      el('div', { class: 'at-side' }, el('div', { class: 'at-size' }, sizeDot, sizeIn), pal)));

  // ---------- canvas sizing ----------
  if (!S.W) { S.W = Math.max(300, Math.round(stage.clientWidth - 8)); S.H = Math.max(240, Math.round(stage.clientHeight - 8)); }
  const W = S.W, H = S.H;
  const d = Math.min(2.5, window.devicePixelRatio || 1, Math.sqrt(5e6 / (W * H)));
  const PW = Math.round(W * d), PH = Math.round(H * d);
  for (const c of [paintC, strokeC, linesC]) { c.width = PW; c.height = PH; }
  const base = document.createElement('canvas'); base.width = PW; base.height = PH;
  const pg = paintC.getContext('2d'), sg = strokeC.getContext('2d'), lg = linesC.getContext('2d'), bg = base.getContext('2d');
  for (const g of [pg, sg, bg]) g.setTransform(d, 0, 0, d, 0, 0);
  const raw = (g, fn) => { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; try { fn(); } finally { g.restore(); } };
  const fit = () => {
    if (!root.isConnected) { window.removeEventListener('resize', fit); return; }
    const k = Math.min((stage.clientWidth - 4) / W, (stage.clientHeight - 4) / H);
    board.style.width = `${Math.floor(W * k)}px`; board.style.height = `${Math.floor(H * k)}px`;
  };
  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', () => setTimeout(fit, 300));

  if (draft) {
    try {
      const img = await blobImage(draft.blob);
      raw(bg, () => bg.drawImage(img, 0, 0, PW, PH)); raw(pg, () => pg.drawImage(img, 0, 0, PW, PH));
    } catch (e) { console.warn('atelier: draft', e); }
  }
  let walls = null;                                       // Uint8Array(PW*PH): 1 where a colouring line is
  if (S.coloring) {
    try {
      await drawLines(S.coloring);
      const a = lg.getImageData(0, 0, PW, PH).data; walls = new Uint8Array(PW * PH);
      for (let i = 0, j = 3; i < walls.length; i++, j += 4) walls[i] = a[j] > 90 ? 1 : 0;
    } catch (e) { console.warn('atelier: line art', e); }
  }
  board.classList.toggle('coloring', !!S.coloring);
  async function drawLines(svg) {
    let s = svg.trim();
    if (!/xmlns=/.test(s.slice(0, 200))) s = s.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    const vb = /viewBox="([^"]+)"/.exec(s)?.[1].split(/[\s,]+/).map(Number) || [0, 0, 400, 300];
    const m = 0.04, k = Math.min((PW * (1 - 2 * m)) / vb[2], (PH * (1 - 2 * m)) / vb[3]);
    const w = Math.round(vb[2] * k), h = Math.round(vb[3] * k);
    s = s.replace(/<svg([^>]*?)\s(?:width|height)="[^"]*"/g, '<svg$1').replace(/<svg([^>]*?)\s(?:width|height)="[^"]*"/g, '<svg$1')
      .replace('<svg', `<svg width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"`);
    const img = await blobImage(new Blob([s], { type: 'image/svg+xml' }));
    lg.clearRect(0, 0, PW, PH);
    lg.drawImage(img, Math.round((PW - w) / 2), Math.round((PH - h) / 2), w, h);
  }

  // ---------- operations ----------
  const ops = [], redoStack = [];
  const T = (sym) => {
    const t = [(x, y) => [x, y]];
    if (sym >= 1) t.push((x, y) => [W - x, y]);
    if (sym >= 2) t.push((x, y) => [x, H - y], (x, y) => [W - x, H - y]);
    return t;
  };
  const width = (op, p) => {
    const s = op.size;
    switch (op.tool) {
      case 'crayon': return s * (0.3 + 0.9 * p);
      case 'pinceau': return s * 1.8 * (0.6 + 0.8 * p);
      case 'craie': return s * 1.3;
      case 'gomme': return s * 2;
      default: return s;
    }
  };
  // stroke renderer: begin(op) -> { seg(i) } draws point i (and segment i-1 -> i) on the stroke canvas
  function renderer(op) {
    const tf = T(op.sym), rng = makeRng(op.seed), rest = tf.map(() => 0);
    let sprite = null;
    if (op.tool === 'pinceau') {
      const n = Math.max(4, Math.ceil(op.size * 2.6 * d));
      sprite = document.createElement('canvas'); sprite.width = sprite.height = n;
      const g = sprite.getContext('2d'), gr = g.createRadialGradient(n / 2, n / 2, 0, n / 2, n / 2, n / 2);
      const [r, gg, b] = hex2rgb(op.color);
      gr.addColorStop(0, `rgba(${r},${gg},${b},1)`); gr.addColorStop(0.55, `rgba(${r},${gg},${b},0.85)`); gr.addColorStop(1, `rgba(${r},${gg},${b},0)`);
      g.fillStyle = gr; g.fillRect(0, 0, n, n);
    }
    const dab = (x, y, w) => sg.drawImage(sprite, x - w / 2, y - w / 2, w, w);
    const grains = (x, y, w) => {
      const n = Math.max(3, Math.round(w * 0.55));
      for (let k = 0; k < n; k++) {
        const a = rng.next() * 6.283, rr = Math.sqrt(rng.next()) * w / 2, sz = 0.7 + rng.next() * 1.6;
        sg.fillRect(x + Math.cos(a) * rr - sz / 2, y + Math.sin(a) * rr - sz / 2, sz, sz);
      }
    };
    sg.fillStyle = sg.strokeStyle = op.color; sg.lineCap = 'round'; sg.lineJoin = 'round';
    return (i) => {
      const [x1, y1, p1] = op.pts[i];
      tf.forEach((f, k) => {
        const [bx, by] = f(x1, y1), w1 = width(op, p1);
        if (i === 0) {
          if (op.tool === 'pinceau') dab(bx, by, w1);
          else if (op.tool === 'craie') grains(bx, by, w1);
          else { sg.beginPath(); sg.arc(bx, by, w1 / 2, 0, 6.2832); sg.fill(); }
          return;
        }
        const [x0, y0, p0] = op.pts[i - 1], [ax, ay] = f(x0, y0), w0 = width(op, p0);
        const len = Math.hypot(bx - ax, by - ay);
        if (op.tool === 'pinceau' || op.tool === 'craie') {
          const step = op.tool === 'pinceau' ? Math.max(0.8, Math.min(w0, w1) * 0.12) : 1.6;
          let t = rest[k];
          while (t <= len) {
            const u = len ? t / len : 0, x = ax + (bx - ax) * u, y = ay + (by - ay) * u, w = w0 + (w1 - w0) * u;
            if (op.tool === 'pinceau') dab(x, y, w); else grains(x, y, w);
            t += step;
          }
          rest[k] = t - len;
        } else {
          sg.lineWidth = (w0 + w1) / 2;
          sg.beginPath(); sg.moveTo(ax, ay); sg.lineTo(bx, by); sg.stroke();
        }
      });
    };
  }
  const clearStroke = () => raw(sg, () => sg.clearRect(0, 0, PW, PH));
  function commitStroke(op, g) {
    raw(g, () => {
      if (op.tool === 'gomme') g.globalCompositeOperation = 'destination-out';
      else g.globalAlpha = ALPHA[op.tool] ?? 1;
      g.drawImage(strokeC, 0, 0);
    });
    clearStroke();
  }
  function drawStamp(g, op) {
    T(op.sym).forEach((f, k) => {
      const [x, y] = f(op.x, op.y), s = op.size * 3.6;
      g.save(); g.translate(x, y); if (k === 1 || k === 3) g.scale(-1, 1); if (k >= 2) g.scale(1, -1);
      g.fillStyle = op.color; g.strokeStyle = op.color;
      g.beginPath();
      if (op.kind === 'star') { for (let i = 0; i < 10; i++) { const a = (Math.PI / 5) * i - Math.PI / 2, rr = i % 2 ? s * 0.22 : s * 0.5; g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); } g.closePath(); g.fill(); }
      else if (op.kind === 'heart') { const h = s * 0.5; g.moveTo(0, h * 0.9); g.bezierCurveTo(-h * 1.6, -h * 0.1, -h * 0.7, -h * 1.2, 0, -h * 0.45); g.bezierCurveTo(h * 0.7, -h * 1.2, h * 1.6, -h * 0.1, 0, h * 0.9); g.fill(); }
      else if (op.kind === 'circle') { g.arc(0, 0, s * 0.42, 0, 6.2832); g.fill(); }
      else if (op.kind === 'flower') {
        for (let i = 0; i < 5; i++) { const a = (6.2832 / 5) * i; g.moveTo(Math.cos(a) * s * 0.26 + s * 0.17, Math.sin(a) * s * 0.26); g.arc(Math.cos(a) * s * 0.26, Math.sin(a) * s * 0.26, s * 0.17, 0, 6.2832); }
        g.fill(); g.beginPath(); g.fillStyle = '#ffd23f'; g.arc(0, 0, s * 0.13, 0, 6.2832); g.fill();
      } else {
        g.font = `${Math.round(s * 0.8)}px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif`;
        g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(op.kind, 0, s * 0.04);
      }
      g.restore();
    });
  }
  function floodFill(op, g, canvas) {
    const px = Math.floor(op.x * d), py = Math.floor(op.y * d);
    if (px < 0 || py < 0 || px >= PW || py >= PH) return false;
    const N = PW * PH, start = py * PW + px;
    if (walls && walls[start]) return false;
    const tmp = document.createElement('canvas'); tmp.width = PW; tmp.height = PH;
    const tg = tmp.getContext('2d', { willReadFrequently: true });
    tg.fillStyle = op.paper; tg.fillRect(0, 0, PW, PH); tg.drawImage(canvas, 0, 0);
    const comp = new Uint32Array(tg.getImageData(0, 0, PW, PH).data.buffer);
    const seed = comp[start], sr = seed & 255, sgc = (seed >> 8) & 255, sb = (seed >> 16) & 255;
    const [fr, fg, fb] = hex2rgb(op.color);
    if (Math.max(Math.abs(fr - sr), Math.abs(fg - sgc), Math.abs(fb - sb)) < 6) return false;   // already this colour
    const ok = (i) => { if (walls && walls[i]) return false; const c = comp[i]; return Math.abs((c & 255) - sr) <= TOL && Math.abs(((c >> 8) & 255) - sgc) <= TOL && Math.abs(((c >> 16) & 255) - sb) <= TOL; };
    const mask = new Uint8Array(N), stack = [start];
    while (stack.length) {
      let i = stack.pop(); const y = (i / PW) | 0, rowStart = y * PW, rowEnd = rowStart + PW;
      while (i > rowStart && !mask[i - 1] && ok(i - 1)) i--;
      let upOpen = false, downOpen = false;
      for (; i < rowEnd && !mask[i] && ok(i); i++) {
        mask[i] = 1;
        if (y > 0) { const u = i - PW; if (!mask[u] && ok(u)) { if (!upOpen) { stack.push(u); upOpen = true; } } else upOpen = false; }
        if (y < PH - 1) { const v = i + PW; if (!mask[v] && ok(v)) { if (!downOpen) { stack.push(v); downOpen = true; } } else downOpen = false; }
      }
    }
    // grow the region a little: 2 px everywhere (antialiased edges), further under colouring lines (no white gaps)
    let front = [];
    for (let i = 0; i < N; i++) if (mask[i]) { const x = i % PW; if ((x > 0 && !mask[i - 1]) || (x < PW - 1 && !mask[i + 1]) || (i >= PW && !mask[i - PW]) || (i < N - PW && !mask[i + PW])) front.push(i); }
    const steps = Math.ceil(4 * d);
    for (let s = 0; s < steps && front.length; s++) {
      const nf = [];
      for (const i of front) {
        const x = i % PW;
        for (const j of [x > 0 ? i - 1 : -1, x < PW - 1 ? i + 1 : -1, i - PW, i + PW]) {
          if (j < 0 || j >= N || mask[j]) continue;
          if (s < 2 || (walls && walls[j])) { mask[j] = 1; nf.push(j); }
        }
      }
      front = nf;
    }
    const id = raw2(g, () => g.getImageData(0, 0, PW, PH));
    const px32 = new Uint32Array(id.data.buffer), col = (255 << 24) | (fb << 16) | (fg << 8) | fr;
    for (let i = 0; i < N; i++) if (mask[i]) px32[i] = col;
    raw(g, () => g.putImageData(id, 0, 0));
    return true;
  }
  const raw2 = (g, fn) => { g.save(); g.setTransform(1, 0, 0, 1, 0, 0); try { return fn(); } finally { g.restore(); } };
  // apply an operation to a target (paint canvas or the history base)
  function apply(op, g, canvas) {
    if (op.t === 's') { const seg = renderer(op); for (let i = 0; i < op.pts.length; i++) seg(i); commitStroke(op, g); return true; }
    if (op.t === 'f') {                                   // mirror mode fills the mirrored spots too
      let any = false;
      for (const f of T(op.sym || 0)) { const [x, y] = f(op.x, op.y); if (floodFill({ ...op, x, y }, g, canvas)) any = true; }
      return any;
    }
    if (op.t === 'st') { drawStamp(g, op); return true; }
    if (op.t === 'clear') { raw(g, () => g.clearRect(0, 0, PW, PH)); return true; }
    return false;
  }
  function push(op) {
    ops.push(op); redoStack.length = 0;
    if (ops.length > 30) apply(ops.shift(), bg, base);
    changed();
  }
  function rebuild() { raw(pg, () => { pg.clearRect(0, 0, PW, PH); pg.drawImage(base, 0, 0); }); for (const o of ops) apply(o, pg, paintC); }
  function undo() { if (!ops.length) return; redoStack.push(ops.pop()); rebuild(); changed(); }
  function redo() { if (!redoStack.length) return; const o = redoStack.pop(); ops.push(o); apply(o, pg, paintC); changed(); }
  function changed() {
    S.version++;
    undoB.disabled = !ops.length; redoB.disabled = !redoStack.length;
    scheduleSave();
  }
  undoB.disabled = true; redoB.disabled = true;

  // ---------- input ----------
  let penSeen = false, cur = null, curId = null, seg = null, lastP = 0.5;
  const pos = (e) => {
    const r = board.getBoundingClientRect();
    const p = e.pointerType === 'pen' ? Math.max(0.08, e.pressure || 0.5) : 0.5;
    lastP = lastP * 0.65 + p * 0.35;
    return [Math.round(((e.clientX - r.left) * W / r.width) * 10) / 10, Math.round(((e.clientY - r.top) * H / r.height) * 10) / 10, Math.round((e.pointerType === 'pen' ? lastP : 0.5) * 100) / 100];
  };
  board.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'pen') penSeen = true;
    else if (penSeen && e.pointerType === 'touch') return;                // palm rejection once a Pencil is used
    if (cur || e.button > 0) return;                                       // one finger / pen at a time
    e.preventDefault();
    lastP = e.pointerType === 'pen' ? Math.max(0.08, e.pressure || 0.5) : 0.5;
    const [x, y] = pos(e);
    if (ui.tool === 'seau') {
      const op = { t: 'f', x, y, color: ui.color, paper: S.paper, sym: ui.sym };
      if (apply(op, pg, paintC)) { sfx('place'); push(op); }
      return;
    }
    if (ui.tool === 'tampon') { const op = { t: 'st', x, y, kind: ui.stamp, color: ui.color, size: ui.size, sym: ui.sym }; drawStamp(pg, op); sfx('place'); push(op); return; }
    try { board.setPointerCapture(e.pointerId); } catch { /* synthetic */ }
    cur = { t: 's', tool: ui.tool, color: ui.tool === 'gomme' ? S.paper : ui.color, size: ui.size, sym: ui.sym, seed: (Math.random() * 2 ** 31) | 0, pts: [pos(e)] };
    curId = e.pointerId;
    strokeC.style.opacity = String(ALPHA[cur.tool] ?? 1);
    seg = renderer(cur); seg(0);
  });
  board.addEventListener('pointermove', (e) => {
    if (!cur || e.pointerId !== curId) return;
    e.preventDefault();
    const co = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
    for (const ev of co.length ? co : [e]) {
      const p = pos(ev), q = cur.pts[cur.pts.length - 1];
      if (Math.abs(p[0] - q[0]) + Math.abs(p[1] - q[1]) < 0.6) continue;
      cur.pts.push(p); seg(cur.pts.length - 1);
    }
  });
  const end = (e) => {
    if (!cur || e.pointerId !== curId) return;
    const op = cur; cur = null; curId = null; seg = null;
    commitStroke(op, pg); push(op);
  };
  board.addEventListener('pointerup', end); board.addEventListener('pointercancel', end);
  stage.addEventListener('touchstart', (e) => { if (e.target.closest('.at-board')) e.preventDefault(); }, { passive: false });
  stage.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  const noGesture = (e) => { if (!root.isConnected) { document.removeEventListener('gesturestart', noGesture); return; } e.preventDefault(); };
  document.addEventListener('gesturestart', noGesture);

  // ---------- tools / palette ----------
  const toolBtns = TOOLS.map((t) => {
    const b = el('button', { class: 'at-tool', 'data-tool': t.id, onclick: () => {
      sfx('tap');
      if (t.id === 'tampon' && ui.tool === 'tampon') { stampSheet(); return; }
      ui.tool = t.id; keepUi(); setTools();
      if (t.id === 'tampon') stampSheet();
    } }, el('span', { class: 'ai' }, t.id === 'tampon' ? '' : t.icon), el('small', {}, tr(t.t)));
    return b;
  });
  toolsBox.append(...toolBtns);
  function setTools() {
    toolBtns.forEach((b) => b.classList.toggle('on', b.dataset.tool === ui.tool));
    const sb = toolBtns.find((b) => b.dataset.tool === 'tampon').querySelector('.ai');
    sb.textContent = ''; sb.append(stampIcon(ui.stamp));
    updDot();
  }
  function stampIcon(k) {
    if (k.length > 2 && /^[a-z]+$/.test(k)) return el('span', { class: `at-shape s-${k}`, style: { color: ui.color } }, { star: '★', heart: '♥', circle: '●', flower: '✿' }[k]);
    return el('span', {}, k);
  }
  function drawPal() {
    pal.innerHTML = '';
    const sw = (c) => el('button', { class: `at-sw ${ui.color === c ? 'on' : ''}`, style: { background: c }, 'aria-label': c, onclick: () => { sfx('tap'); ui.color = c; keepUi(); drawPal(); setTools(); } });
    COLORS.forEach((c) => pal.append(sw(c)));
    loadMix().forEach((c) => pal.append(sw(c)));
    pal.append(el('button', { class: 'at-sw at-mix', 'aria-label': tr(L.mix), title: tr(L.mix), onclick: () => { sfx('tap'); mixSheet(); } }, '＋'));
  }
  function updDot() {
    const w = ui.tool === 'tampon' ? ui.size * 1.6 : Math.max(4, width({ tool: ui.tool, size: ui.size }, 0.5));
    sizeDot.style.width = sizeDot.style.height = `${Math.min(46, w)}px`;
    sizeDot.style.background = ui.tool === 'gomme' ? '#fff' : ui.color;
    sizeDot.classList.toggle('erase', ui.tool === 'gomme');
  }
  sizeIn.addEventListener('input', () => { ui.size = Number(sizeIn.value); updDot(); });
  sizeIn.addEventListener('change', keepUi);
  function setSym() {
    board.classList.toggle('sym1', ui.sym >= 1); board.classList.toggle('sym2', ui.sym === 2);
    symB.classList.toggle('on', ui.sym > 0);
    symB.querySelector('.ai').textContent = ['🪞', '↔️', '✳️'][ui.sym];
  }
  drawPal(); setTools(); setSym();

  // ---------- sheets ----------
  function stampSheet() {
    const sh = sheet(el('div', { class: 'at-sheet' }, el('h2', {}, tr(L.stampT)),
      el('div', { class: 'at-grid' }, STAMPS.map((k) => el('button', { class: `at-cell ${ui.stamp === k ? 'on' : ''}`, onclick: () => { sfx('tap'); ui.stamp = k; ui.tool = 'tampon'; keepUi(); setTools(); sh.close(); } }, stampIcon(k))))));
  }
  function paperSheet() {
    const sh = sheet(el('div', { class: 'at-sheet' }, el('h2', {}, '📄 ', tr(L.paperT)),
      el('div', { class: 'at-grid papers' }, PAPERS.map((p) => el('button', { class: `at-paper ${S.paper === p.c ? 'on' : ''}`, onclick: () => {
        sfx('tap'); S.paper = p.c; board.style.background = p.c; updDot(); S.version++; scheduleSave(); sh.close();
      } }, el('span', { class: 'pp', style: { background: p.c } }), el('small', {}, tr(p.t)))))));
  }
  function mixSheet() {
    let a = null, b = null;
    const slotA = el('span', { class: 'at-slot' }), slotB = el('span', { class: 'at-slot' }), res = el('span', { class: 'at-slot big' });
    const addB = el('button', { class: 'btn primary', disabled: true, onclick: () => {
      sfx('good'); const m = mixColors(a, b); const list = [m, ...loadMix().filter((x) => x !== m)]; saveMix(list);
      ui.color = m; keepUi(); drawPal(); setTools(); sh.close();
    } }, tr(L.mixAdd));
    const show = () => {
      slotA.style.background = a || ''; slotB.style.background = b || '';
      res.style.background = a && b ? mixColors(a, b) : ''; addB.disabled = !(a && b);
    };
    const sh = sheet(el('div', { class: 'at-sheet' }, el('h2', {}, '🎨 ', tr(L.mixT)), el('p', { class: 'hint' }, tr(L.mixS)),
      el('div', { class: 'at-mixrow' }, slotA, el('b', {}, '+'), slotB, el('b', {}, '='), res),
      el('div', { class: 'at-grid colors' }, [...COLORS, ...loadMix()].map((c) => el('button', { class: 'at-sw', style: { background: c }, onclick: () => { sfx('tap'); if (!a || (a && b)) { a = c; b = null; } else b = c; show(); } }))),
      addB));
  }
  async function pagesSheet() {
    let pages = [];
    try { pages = (await import('./content/arts/coloriages.js')).pages; } catch (e) { console.warn('atelier: pages', e); }
    const pick = (coloring, title) => { sh.close(); confirmReplace(() => openAtelier({ ...opts, coloring, title, projectId: null, fresh: true })); };
    const sh = sheet(el('div', { class: 'at-sheet' }, el('h2', {}, '🖍️ ', tr(L.pagesT)),
      el('div', { class: 'at-grid pages' },
        el('button', { class: 'at-page', onclick: () => { sfx('tap'); pick(null, ''); } }, el('div', { class: 'at-page-pic blank' }), el('small', {}, tr(L.blank))),
        pages.map((p) => el('button', { class: 'at-page', onclick: () => { sfx('tap'); pick(p.svg, p.title); } }, el('div', { class: 'at-page-pic', html: p.svg }), el('small', {}, tr(p.title)))))));
  }
  function confirmReplace(go) {
    const dirty = (ops.length || draft) && S.savedVersion !== S.version;
    if (!dirty) { flush(); go(); return; }
    const sh = sheet(el('div', { class: 'at-ask' }, el('h2', {}, tr(L.replaceT)), el('p', { class: 'hint' }, tr(L.replaceS)),
      el('div', { class: 'at-ask-btns' },
        el('button', { class: 'btn', onclick: () => { sfx('tap'); sh.close(); } }, tr(L.keep)),
        el('button', { class: 'btn primary', onclick: () => { sfx('tap'); sh.close(); go(); } }, tr(L.go)))));
  }
  function clearSheet() {
    const sh = sheet(el('div', { class: 'at-ask' }, el('h2', {}, '🗑️ ', tr(L.clearT)),
      el('div', { class: 'at-ask-btns' },
        el('button', { class: 'btn', onclick: () => { sfx('tap'); sh.close(); } }, tr(L.keep)),
        el('button', { class: 'btn danger', onclick: () => { sfx('tap'); sh.close(); const op = { t: 'clear' }; apply(op, pg, paintC); push(op); } }, tr(L.clearPaint)),
        S.coloring ? el('button', { class: 'btn danger', onclick: () => { sfx('tap'); sh.close(); confirmReplace(() => openAtelier({ ...opts, coloring: null, title: '', projectId: null, fresh: true })); } }, tr(L.newBlank)) : null)));
  }

  // ---------- save to museum ----------
  function compose() {
    const c = document.createElement('canvas'); c.width = PW; c.height = PH;
    const g = c.getContext('2d'); g.fillStyle = S.paper; g.fillRect(0, 0, PW, PH); g.drawImage(paintC, 0, 0); g.drawImage(linesC, 0, 0);
    return c;
  }
  async function toMuseum() {
    if (S.version === 0 && !draft) { msg('✏️', L.empty); return; }
    if (S.museumId && S.savedVersion === S.version) { msg('🖼️', L.already); return; }
    const exists = S.museumId ? await getArtwork(S.museumId).catch(() => null) : null;
    const prev = el('img', { class: 'at-ask-img', alt: '' });
    let url = '';
    compose().toBlob((b) => { if (b) { url = URL.createObjectURL(b); prev.src = url; } }, 'image/jpeg', 0.6);
    const name = el('input', { class: 'at-name', value: exists?.title || S.title || tr(L.myDrawing), maxlength: '60', enterkeyhint: 'done' });
    const sh = sheet(el('div', { class: 'at-ask' }, el('h2', {}, '🖼️ ', tr(L.saveT)), prev,
      el('label', { class: 'at-name-l' }, tr(L.nameIt), name),
      el('div', { class: 'at-ask-btns' }, el('button', { class: 'btn primary', onclick: async (ev) => {
        ev.currentTarget.disabled = true;
        S.title = name.value.trim() || tr(L.myDrawing);
        let rec = null;
        try {
          const blob = await new Promise((res, rej) => compose().toBlob((b) => (b ? res(b) : rej(new Error('toBlob'))), 'image/jpeg', 0.92));
          rec = await addArtwork({ source: 'atelier', blob, title: S.title, projectId: S.projectId, id: exists ? S.museumId : null, confirm: false });
        } catch (e) { console.warn('atelier: save', e); }
        sh.close(); if (url) URL.revokeObjectURL(url);
        if (!rec) { msg('😕', L.fail); return; }
        S.museumId = rec.id; S.savedVersion = S.version;
        let coins = 0;
        if (!S.rewarded) { coins = 5; S.rewarded = true; addCoins(coins); save(); refreshWallet(); }
        flush();
        sfx('win'); confetti(50);
        const done = sheet(el('div', { class: 'at-ask' }, el('div', { class: 'musee-frame' }, el('img', { src: rec.thumb, alt: '' })),
          el('h2', {}, tr(exists ? L.updated : L.saved)), coins ? el('div', { class: 'res-coins' }, `+${coins} ${COIN}`) : null,
          el('div', { class: 'at-ask-btns' },
            onMusee ? el('button', { class: 'btn', onclick: () => { sfx('tap'); done.close(); onMusee(); } }, '🖼️ ', tr(L.museum)) : null,
            el('button', { class: 'btn primary', onclick: () => { sfx('tap'); done.close(); } }, tr(L.ok)))));
      } }, tr(L.hang)))));
  }
  function msg(icon, text) {
    const sh = sheet(el('div', { class: 'at-ask' }, el('div', { class: 'at-big-i' }, icon), el('h2', {}, tr(text)),
      el('div', { class: 'at-ask-btns' }, el('button', { class: 'btn primary', onclick: () => sh.close() }, tr(L.ok)))));
  }

  // ---------- autosave ----------
  let saveTimer = 0, saving = false;
  function scheduleSave() { clearTimeout(saveTimer); saveTimer = setTimeout(flush, 1500); }
  function flush() {
    clearTimeout(saveTimer);
    if (saving || (S.version === 0 && !draft)) return;
    saving = true;
    paintC.toBlob(async (blob) => {
      try { if (blob) await kvSet(DRAFT, { ...S, blob, date: new Date().toISOString() }); } finally { saving = false; }
    }, 'image/png');
  }
  const onHide = (e) => { if (!root.isConnected) { document.removeEventListener('visibilitychange', onHide); window.removeEventListener('pagehide', onHide); return; } if (document.visibilityState === 'hidden' || e.type === 'pagehide') flush(); };
  document.addEventListener('visibilitychange', onHide); window.addEventListener('pagehide', onHide);

  return { undo, redo, save: toMuseum, flush, get state() { return { ...S, ops: ops.length, tool: ui.tool, color: ui.color }; }, setTool: (t) => { ui.tool = t; setTools(); }, setColor: (c) => { ui.color = c; drawPal(); setTools(); } };
}

function blobImage(blob) {
  return new Promise((res, rej) => {
    const url = URL.createObjectURL(blob), img = new Image();
    img.onload = () => { res(img); setTimeout(() => URL.revokeObjectURL(url), 2000); };
    img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('image decode failed')); };
    img.src = url;
  });
}
