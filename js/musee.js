// « Mon musée » — the child's real artworks (photos of finished projects + Atelier paintings).
// Stored ONLY on this iPad, in IndexedDB 'hibou-musee':
//   store 'art' (keyPath id): { id, date (ISO), title, projectId, source: 'photo'|'atelier', blob (JPEG ≤1600 px), thumb (JPEG dataURL ~240 px) }
//   store 'kv'  (out-of-line keys): small blobs/objects for other features (Atelier autosave draft).
import { el } from './util.js';
import { tr, lang } from './i18n.js';
import { sfx } from './audio.js';
import { screen, backBtn, sheet, wallet } from './ui.js';
import { dressedOwl, confetti } from './game.js';

const L = {
  title: { fr: 'Mon musée', en: 'My museum' },
  add: { fr: 'Ajouter une photo', en: 'Add a photo' },
  camera: { fr: 'Prendre une photo', en: 'Take a photo' },
  library: { fr: 'Choisir une photo', en: 'Choose a photo' },
  howAdd: { fr: 'Comment veux-tu ajouter ton œuvre?', en: 'How do you want to add your artwork?' },
  added: { fr: 'Ton œuvre est dans ton musée!', en: 'Your artwork is in your museum!' },
  ok: { fr: 'Super!', en: 'Great!' },
  emptyT: { fr: 'Ton musée est encore vide', en: 'Your museum is still empty' },
  emptyS: { fr: 'Fais un projet d’arts plastiques, puis prends-le en photo. Ou peins dans l’Atelier!', en: 'Make an art project, then take a photo of it. Or paint in the Studio!' },
  works: { fr: 'œuvres', en: 'artworks' }, work: { fr: 'œuvre', en: 'artwork' },
  share: { fr: 'Partager', en: 'Share' }, save: { fr: 'Télécharger', en: 'Download' },
  del: { fr: 'Retirer', en: 'Remove' }, close: { fr: 'Fermer', en: 'Close' },
  delQ: { fr: 'Retirer cette œuvre du musée?', en: 'Remove this artwork from the museum?' },
  delS: { fr: 'Elle sera effacée de l’iPad. On ne peut pas annuler.', en: 'It will be erased from the iPad. This cannot be undone.' },
  yesDel: { fr: 'Oui, retirer', en: 'Yes, remove' }, keep: { fr: 'Non, garder', en: 'No, keep it' },
  photo: { fr: 'Photo', en: 'Photo' }, atelier: { fr: 'Atelier', en: 'Studio' },
  untitled: { fr: 'Mon œuvre', en: 'My artwork' },
  artist: { fr: 'Artiste', en: 'Artist' }, technique: { fr: 'Technique', en: 'Medium' },
  tPhoto: { fr: 'œuvre réelle, photographiée', en: 'real artwork, photographed' },
  tAtelier: { fr: 'peinture numérique', en: 'digital painting' },
  editHint: { fr: 'Touche le titre pour le changer', en: 'Tap the title to change it' },
  noDb: { fr: 'Le musée ne peut pas s’ouvrir sur cet appareil (navigation privée?).', en: 'The museum cannot open on this device (private browsing?).' },
  fail: { fr: 'Oups! L’image n’a pas pu être enregistrée.', en: 'Oops! The picture could not be saved.' },
  badImg: { fr: 'Oups! Cette image ne s’ouvre pas.', en: 'Oops! This picture cannot be opened.' },
  loading: { fr: 'Chargement…', en: 'Loading…' },
};

// ---------------- IndexedDB ----------------
const DB = 'hibou-musee', VER = 1;
let dbp = null;
function db() {
  if (dbp) return dbp;
  dbp = new Promise((res, rej) => {
    let r;
    try { r = indexedDB.open(DB, VER); } catch (e) { rej(e); return; }
    r.onupgradeneeded = () => {
      const d = r.result;
      if (!d.objectStoreNames.contains('art')) d.createObjectStore('art', { keyPath: 'id' });
      if (!d.objectStoreNames.contains('kv')) d.createObjectStore('kv');
    };
    r.onsuccess = () => { const d = r.result; d.onversionchange = () => { d.close(); dbp = null; }; d.onclose = () => { dbp = null; }; res(d); };
    r.onerror = () => rej(r.error || new Error('idb open failed'));
    r.onblocked = () => rej(new Error('idb blocked'));
  });
  dbp.catch(() => { dbp = null; });
  return dbp;
}
function run(storeName, mode, fn) {
  return db().then((d) => new Promise((res, rej) => {
    const t = d.transaction(storeName, mode);
    let out;
    const req = fn(t.objectStore(storeName));
    if (req) req.onsuccess = () => { out = req.result; };
    t.oncomplete = () => res(out);
    t.onerror = () => rej(t.error);
    t.onabort = () => rej(t.error || new Error('aborted'));
  }));
}
// Older WebKit could not store Blobs in IndexedDB: fall back to ArrayBuffer and rebuild on read.
async function putSafe(storeName, value, key) {
  try { return await run(storeName, 'readwrite', (s) => (key === undefined ? s.put(value) : s.put(value, key))); }
  catch (e) {
    if (e?.name !== 'DataCloneError' || !(value?.blob instanceof Blob)) throw e;
    const v = { ...value, buf: await value.blob.arrayBuffer(), type: value.blob.type }; delete v.blob;
    return run(storeName, 'readwrite', (s) => (key === undefined ? s.put(v) : s.put(v, key)));
  }
}
const rehydrate = (r) => { if (r && !r.blob && r.buf) { r.blob = new Blob([r.buf], { type: r.type || 'image/jpeg' }); delete r.buf; } return r; };

// key/value helpers (used by atelier.js for its autosave draft)
export const kvGet = (k) => run('kv', 'readonly', (s) => s.get(k)).then(rehydrate).catch(() => undefined);
export const kvSet = (k, v) => putSafe('kv', v, k).then(() => true).catch(() => false);
export const kvDel = (k) => run('kv', 'readwrite', (s) => s.delete(k)).then(() => true).catch(() => false);

export const getArtwork = (id) => run('art', 'readonly', (s) => s.get(id)).then(rehydrate);
async function allArt() { const a = (await run('art', 'readonly', (s) => s.getAll())) || []; a.forEach(rehydrate); return a.sort((x, y) => (x.date < y.date ? 1 : -1)); }
export async function museeCount() { try { return (await run('art', 'readonly', (s) => s.count())) || 0; } catch { return 0; } }

let persistAsked = false;
function askPersist() {
  if (persistAsked) return; persistAsked = true;
  try {
    if (localStorage.getItem('hibou-musee-persist')) return;
    localStorage.setItem('hibou-musee-persist', '1');
  } catch { /* private mode */ }
  try { navigator.storage?.persist?.().catch(() => {}); } catch { /* not supported */ }
}

// ---------------- images ----------------
async function decode(blob) {
  if (self.createImageBitmap) {
    try { return await createImageBitmap(blob, { imageOrientation: 'from-image' }); } catch { /* try <img> */ }
    try { return await createImageBitmap(blob); } catch { /* try <img> */ }
  }
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.decoding = 'async';
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = url; });
    return img;
  } finally { setTimeout(() => URL.revokeObjectURL(url), 1000); }
}
function scaled(src, max, bg = '#fff') {
  const w0 = src.width || src.naturalWidth, h0 = src.height || src.naturalHeight;
  const k = Math.min(1, max / Math.max(w0, h0));
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w0 * k)); c.height = Math.max(1, Math.round(h0 * k));
  const g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, c.width, c.height);          // JPEG has no alpha: transparent -> white
  g.imageSmoothingQuality = 'high';
  g.drawImage(src, 0, 0, c.width, c.height);
  return c;
}
const toBlob = (c, type, q) => new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error('toBlob failed'))), type, q));
async function prepare(blob) {
  const img = await decode(blob);
  const big = scaled(img, 1600), small = scaled(img, 240);
  try { img.close?.(); } catch { /* ImageBitmap only */ }
  return { blob: await toBlob(big, 'image/jpeg', 0.8), thumb: small.toDataURL('image/jpeg', 0.72) };
}
const newId = () => `a-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

// Opens a hidden <input type=file>. MUST run synchronously inside a tap handler (iOS rule).
function pickFile(camera) {
  return new Promise((res) => {
    const inp = el('input', { type: 'file', accept: 'image/*', style: { position: 'fixed', left: '-1000px', opacity: '0' } });
    if (camera) inp.setAttribute('capture', 'environment');
    let done = false;
    const end = (f) => { if (done) return; done = true; inp.remove(); window.removeEventListener('focus', onFocus); res(f || null); };
    const onFocus = () => setTimeout(() => { if (!inp.files?.length) end(null); }, 1200);   // cancel on browsers without the 'cancel' event
    inp.addEventListener('change', () => end(inp.files?.[0]));
    inp.addEventListener('cancel', () => end(null));
    document.body.append(inp);
    window.addEventListener('focus', onFocus);
    inp.click();
  });
}

/**
 * Add an artwork to the museum.
 *   addArtwork({ title, projectId, source: 'photo'|'atelier', blob?, pick?: 'camera'|'library', confirm?: true, id? })
 * - With `blob`: stores it directly (Atelier saves). With `id` of an existing artwork: replaces its picture.
 * - Without `blob`: `pick:'camera'` / `'library'` opens the file input at once (call from a tap!);
 *   no `pick` shows a small sheet with both choices.
 * Resolves to the stored record (without re-reading) or null (cancelled / failed).
 */
export function addArtwork({ title = '', projectId = null, source, blob = null, pick, confirm = true, id = null } = {}) {
  askPersist();
  const src = source || (blob ? 'atelier' : 'photo');
  if (blob) return store(blob);
  if (pick === 'camera' || pick === 'library') return pickFile(pick === 'camera').then((f) => (f ? store(f) : null));
  return new Promise((res) => {
    let chose = false;
    const choose = (cam) => { chose = true; sh.close(); pickFile(cam).then((f) => (f ? store(f) : null)).then(res); };
    const sh = sheet(el('div', { class: 'musee-pick' },
      el('h2', {}, '🖼️ ', tr(L.howAdd)),
      el('div', { class: 'musee-pick-btns' },
        el('button', { class: 'btn primary', onclick: () => { sfx('tap'); choose(true); } }, '📷 ', tr(L.camera)),
        el('button', { class: 'btn', onclick: () => { sfx('tap'); choose(false); } }, '🖼️ ', tr(L.library)))));
    const obs = new MutationObserver(() => { if (!sh.node.isConnected) { obs.disconnect(); if (!chose) res(null); } });
    obs.observe(document.body, { childList: true });
  });

  async function store(file) {
    let rec;
    try {
      const { blob: jpg, thumb } = await prepare(file);
      const old = id ? await getArtwork(id).catch(() => null) : null;
      rec = old ? { ...old, blob: jpg, thumb, title: title || old.title } : { id: newId(), date: new Date().toISOString(), title: title || tr(L.untitled), projectId, source: src, blob: jpg, thumb };
    } catch (e) {
      console.warn('musee: image', e);
      if (confirm) errSheet(L.badImg);
      return null;
    }
    try { await putSafe('art', rec); } catch (e) {
      console.warn('musee: store', e);
      if (confirm) errSheet(L.fail);
      return null;
    }
    if (confirm) {
      sfx('win'); confetti(40);
      const sh = sheet(el('div', { class: 'musee-added' },
        el('div', { class: 'musee-frame' }, el('img', { src: rec.thumb, alt: '' })),
        el('h2', {}, tr(L.added)),
        el('button', { class: 'btn primary', onclick: () => { sfx('tap'); sh.close(); } }, tr(L.ok))));
    }
    return rec;
  }
}
function errSheet(msg) {
  sfx('bad');
  const sh = sheet(el('div', { class: 'musee-added' }, el('div', { class: 'musee-err-i' }, '😕'), el('h2', {}, tr(msg)),
    el('button', { class: 'btn', onclick: () => sh.close() }, tr(L.close))));
}

// ---------------- the museum wall ----------------
const fmtDate = (iso) => { try { return new Date(iso).toLocaleDateString(lang() === 'fr' ? 'fr-CA' : 'en-CA', { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return iso.slice(0, 10); } };
const fmtMonth = (iso) => { try { const s = new Date(iso).toLocaleDateString(lang() === 'fr' ? 'fr-CA' : 'en-CA', { month: 'long', year: 'numeric' }); return s.charAt(0).toUpperCase() + s.slice(1); } catch { return iso.slice(0, 7); } };
const artistName = () => { try { return JSON.parse(localStorage.getItem('petithibou.v1'))?.settings?.name || ''; } catch { return ''; } };

/**
 * openMusee({ back, onAtelier }) — full screen. `back`: called by the ‹ button.
 * `onAtelier` (optional): shows an « Atelier » button in the empty state and the top row.
 */
export async function openMusee({ back, onAtelier } = {}) {
  askPersist();
  const goBack = back || (() => history.back());
  const wall = el('div', { class: 'musee-wall' }, el('p', { class: 'hint' }, tr(L.loading)));
  const count = el('span', { class: 'bar-title musee-count' });
  const addBtn = el('button', { class: 'btn primary musee-add', onclick: () => { sfx('tap'); addArtwork({ source: 'photo' }).then((r) => { if (r) draw(); }); } }, '📷 ', tr(L.add));
  const atelierBtn = onAtelier ? el('button', { class: 'btn musee-add', onclick: () => { sfx('tap'); onAtelier(); } }, '🎨 ', tr(L.atelier)) : null;
  screen('musee-screen',
    el('header', { class: 'bar' }, backBtn(goBack), el('h1', {}, '🖼️ ', tr(L.title)), count, wallet()),
    el('div', { class: 'musee-actions' }, addBtn, atelierBtn),
    wall);

  async function draw() {
    let list;
    try { list = await allArt(); } catch (e) {
      console.warn('musee: open', e);
      wall.innerHTML = ''; wall.append(el('div', { class: 'musee-empty' }, el('div', { class: 'musee-err-i' }, '😕'), el('p', {}, tr(L.noDb))));
      addBtn.disabled = true;
      return;
    }
    wall.innerHTML = '';
    count.textContent = list.length ? `${list.length} ${tr(list.length > 1 ? L.works : L.work)}` : '';
    if (!list.length) {
      wall.append(el('div', { class: 'musee-empty' }, dressedOwl('big bob'), el('h2', {}, tr(L.emptyT)), el('p', {}, tr(L.emptyS)),
        el('div', { class: 'musee-pick-btns' },
          el('button', { class: 'btn primary', onclick: () => { sfx('tap'); addArtwork({ source: 'photo', pick: 'camera' }).then((r) => { if (r) draw(); }); } }, '📷 ', tr(L.camera)),
          onAtelier ? el('button', { class: 'btn', onclick: () => { sfx('tap'); onAtelier(); } }, '🎨 ', tr(L.atelier)) : null)));
      return;
    }
    let month = '', row = null;
    list.forEach((a, i) => {
      const m = fmtMonth(a.date);
      if (m !== month) { month = m; wall.append(el('h2', { class: 'musee-month' }, m)); row = el('div', { class: 'musee-row' }); wall.append(row); }
      row.append(el('button', { class: `musee-item tilt${i % 3}`, onclick: () => { sfx('tap'); view(a, draw); } },
        el('div', { class: `musee-frame ${a.source === 'atelier' ? 'f-atelier' : ''}` }, el('img', { src: a.thumb, alt: a.title, loading: 'lazy' })),
        el('div', { class: 'musee-cartel small' }, el('b', {}, a.title), el('small', {}, fmtDate(a.date)))));
    });
  }
  await draw();
}

function view(a, redraw) {
  let url = '';
  try { url = a.blob ? URL.createObjectURL(a.blob) : a.thumb; } catch { url = a.thumb; }
  const title = el('input', { class: 'musee-title-in', value: a.title, maxlength: '60', 'aria-label': 'title', enterkeyhint: 'done' });
  const saveTitle = async () => {
    const v = title.value.trim() || tr(L.untitled);
    if (v === a.title) return;
    a.title = v;
    try { await putSafe('art', a); redraw(); } catch (e) { console.warn('musee: rename', e); }
  };
  title.addEventListener('change', saveTitle);
  title.addEventListener('keydown', (e) => { if (e.key === 'Enter') title.blur(); });
  const name = artistName();
  const canShare = !!(navigator.share && navigator.canShare);
  const fileOf = () => new File([a.blob], `${(a.title || 'oeuvre').replace(/[^\p{L}\p{N} _-]+/gu, '').trim() || 'oeuvre'}.jpg`, { type: a.blob?.type || 'image/jpeg' });
  const share = async () => {
    sfx('tap');
    if (!a.blob) return;
    const f = fileOf();
    if (canShare && navigator.canShare({ files: [f] })) { try { await navigator.share({ files: [f], title: a.title }); } catch { /* cancelled */ } return; }
    const link = el('a', { href: url, download: f.name }); document.body.append(link); link.click(); link.remove();
  };
  const sh = sheet(el('div', { class: 'musee-view' },
    el('div', { class: `musee-frame big ${a.source === 'atelier' ? 'f-atelier' : ''}` }, el('img', { src: url, alt: a.title })),
    el('div', { class: 'musee-cartel' },
      title,
      el('small', { class: 'musee-edit-hint' }, '✏️ ', tr(L.editHint)),
      name ? el('div', {}, el('b', {}, tr(L.artist), ' : '), name) : null,
      el('div', {}, el('b', {}, tr(L.technique), ' : '), tr(a.source === 'atelier' ? L.tAtelier : L.tPhoto)),
      el('div', {}, '📅 ', fmtDate(a.date))),
    el('div', { class: 'musee-view-btns' },
      el('button', { class: 'btn primary', onclick: share }, canShare ? '📤 ' : '⬇️ ', tr(canShare ? L.share : L.save)),
      el('button', { class: 'btn danger', onclick: () => { sfx('tap'); confirmDel(); } }, '🗑️ ', tr(L.del)))));
  // free the full-size picture when the sheet goes away
  const obs = new MutationObserver(() => { if (!sh.node.isConnected) { obs.disconnect(); title.blur(); if (url.startsWith('blob:')) URL.revokeObjectURL(url); } });
  obs.observe(document.body, { childList: true });

  function confirmDel() {
    const c = sheet(el('div', { class: 'musee-added' },
      el('div', { class: 'musee-frame' }, el('img', { src: a.thumb, alt: '' })),
      el('h2', {}, tr(L.delQ)), el('p', { class: 'hint' }, tr(L.delS)),
      el('div', { class: 'musee-pick-btns' },
        el('button', { class: 'btn', onclick: () => { sfx('tap'); c.close(); } }, tr(L.keep)),
        el('button', { class: 'btn danger', onclick: async () => {
          sfx('tap');
          try { await run('art', 'readwrite', (s) => s.delete(a.id)); } catch (e) { console.warn('musee: delete', e); }
          c.close(); sh.close(); redraw();
        } }, '🗑️ ', tr(L.yesDel)))));
  }
}
