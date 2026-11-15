// Handwriting answers (type `hand`): a lined pad for Apple Pencil / finger, AI reading + gentle correction.
// Server: worker /ai/write (free Cloudflare AI first, OpenAI as backup). Without a server: self-check against the model answer.
import { el } from './util.js';
import { tr } from './i18n.js';
import { speak, sfx } from './audio.js';
import { store } from './store.js';
import { VOICE_URL } from './config.js';

const L = {
  check: { fr: 'Vérifier', en: 'Check' },
  reading: { fr: 'Hibou lit ton écriture…', en: 'Owl is reading your writing…' },
  read: { fr: 'Hibou a lu :', en: 'Owl read:' },
  fix: { fr: 'À corriger :', en: 'To fix:' },
  model: { fr: 'Réponse modèle :', en: 'Model answer:' },
  empty: { fr: 'Écris d’abord ta réponse.', en: 'Write your answer first.' },
  offline: { fr: 'Hibou ne peut pas lire en ce moment. Compare avec la réponse :', en: 'Owl cannot read right now. Compare with the answer:' },
  yes: { fr: 'J’ai réussi', en: 'I got it' }, no: { fr: 'Pas encore', en: 'Not yet' },
  pen: { fr: 'Crayon', en: 'Pen' }, eraser: { fr: 'Gomme', en: 'Eraser' }, keyboard: { fr: 'Clavier', en: 'Keyboard' },
  words: { fr: 'Mots à utiliser :', en: 'Words to use:' },
};
const voiceUrl = () => (store.settings.voiceUrl || VOICE_URL).replace(/\/$/, '');
const norm = (s) => String(s).replace(/[，。！？、；：]/g, ' ').toLowerCase().replace(/[’']/g, "'").replace(/[.,!?;:«»"“”]/g, ' ').replace(/\s+/g, ' ').trim();

export function hand(q, area, ctx) {
  const lang = ['en', 'zh'].includes(q.lang) ? q.lang : 'fr';
  const lines = Math.max(1, Math.min(8, q.lines || (q.mode === 'composition' ? 6 : 2)));
  const LH = 92;                                    // px between writing lines (CSS px)
  const wrap = el('div', { class: 'hand-wrap' });
  if (q.words?.length) wrap.append(el('div', { class: 'hand-words' }, tr(L.words), ' ', q.words.map((w) => el('b', {}, w))));

  // ---- pad ----
  const canvas = el('canvas', { class: 'hand-pad' });
  const ta = el('textarea', { class: 'hand-ta hidden', rows: String(lines + 1), lang: { fr: 'fr-CA', en: 'en-CA', zh: 'zh-CN' }[lang], autocapitalize: 'sentences', spellcheck: 'false' });
  const strokes = []; let cur = null, mode = 'pen', penSeen = false, dpr = 1;
  const g = canvas.getContext('2d');
  const size = () => {
    dpr = Math.min(2.5, window.devicePixelRatio || 1);
    const w = canvas.clientWidth || 600, h = lang === 'zh' ? lines * (LH + 6) + 18 : lines * LH + 30;
    canvas.style.height = `${h}px`;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    redraw();
  };
  function paper() {
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.fillStyle = '#fff'; g.fillRect(0, 0, canvas.width, canvas.height);
    if (lang === 'zh') {                               // 田字格: one square per character
      const W = canvas.width / dpr, n = Math.max(4, Math.floor((W - 24) / LH));
      const x0 = (W - n * LH) / 2;
      for (let r = 0; r < lines; r++) for (let c = 0; c < n; c++) {
        const x = x0 + c * LH, y = 12 + r * (LH + 6);
        g.strokeStyle = '#e5534b'; g.lineWidth = 1.5; g.setLineDash([]); g.strokeRect(x, y, LH, LH);
        g.strokeStyle = '#f2b8b4'; g.lineWidth = 1; g.setLineDash([5, 5]);
        g.beginPath(); g.moveTo(x + LH / 2, y); g.lineTo(x + LH / 2, y + LH); g.moveTo(x, y + LH / 2); g.lineTo(x + LH, y + LH / 2); g.stroke();
        g.setLineDash([]);
      }
      return;
    }
    for (let i = 1; i <= lines; i++) {
      const y = i * LH;
      g.strokeStyle = '#c9d6ee'; g.lineWidth = 2; g.beginPath(); g.moveTo(12, y); g.lineTo(canvas.width / dpr - 12, y); g.stroke();
      g.strokeStyle = '#eef2fa'; g.lineWidth = 1; g.beginPath(); g.moveTo(12, y - LH / 2.2); g.lineTo(canvas.width / dpr - 12, y - LH / 2.2); g.stroke();
    }
  }
  function drawStroke(s) {
    if (s.pts.length < 2) { const p = s.pts[0]; g.fillStyle = '#23253a'; g.beginPath(); g.arc(p[0], p[1], s.w / 2, 0, 7); g.fill(); return; }
    g.lineCap = 'round'; g.lineJoin = 'round';
    g.strokeStyle = s.erase ? '#fff' : '#23253a';
    for (let i = 1; i < s.pts.length; i++) {
      const [x0, y0, p0] = s.pts[i - 1], [x1, y1, p1] = s.pts[i];
      g.lineWidth = s.erase ? 28 : s.w * (0.6 + ((p0 + p1) / 2) * 0.8);
      g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke();
    }
  }
  function redraw() { paper(); strokes.forEach(drawStroke); }
  const pos = (e) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top, e.pressure || 0.5]; };
  canvas.addEventListener('pointerdown', (e) => {
    if (area.classList.contains('locked')) return;
    if (e.pointerType === 'pen') penSeen = true;
    else if (penSeen && e.pointerType === 'touch') return;          // palm rejection once a Pencil is used
    try { canvas.setPointerCapture(e.pointerId); } catch { /* synthetic or lost pointer */ }
    cur = { pts: [pos(e)], w: e.pointerType === 'pen' ? 4 : 5, erase: mode === 'eraser' };
    strokes.push(cur); drawStroke(cur); e.preventDefault();
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!cur) return;
    const co = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
    const evs = co.length ? co : [e];
    for (const ev of evs) cur.pts.push(pos(ev));
    redraw(); e.preventDefault();
  });
  const up = () => { cur = null; };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);

  // ---- tools ----
  const tool = (icon, label, fn, cls = '') => el('button', { class: `hand-tool ${cls}`, onclick: () => { sfx('tap'); fn(); } }, icon, el('small', {}, tr(label)));
  const penBtn = tool('✏️', L.pen, () => { mode = 'pen'; setTools(); }, 'on');
  const erBtn = tool('🧽', L.eraser, () => { mode = 'eraser'; setTools(); });
  const kbBtn = tool('⌨️', L.keyboard, () => { const k = ta.classList.toggle('hidden'); canvas.classList.toggle('hidden', !k); if (!k) ta.focus(); kbBtn.classList.toggle('on', !k); });
  const setTools = () => { penBtn.classList.toggle('on', mode === 'pen'); erBtn.classList.toggle('on', mode === 'eraser'); };
  const tools = el('div', { class: 'hand-tools' }, penBtn, erBtn,
    tool('↶', { fr: 'Annuler', en: 'Undo' }, () => { strokes.pop(); redraw(); }),
    tool('🗑️', { fr: 'Effacer', en: 'Clear' }, () => { strokes.length = 0; redraw(); }), kbBtn);

  const out = el('div', { class: 'hand-out' });
  const checkBtn = el('button', { class: 'btn check' }, '✓ ', tr(L.check));
  wrap.append(tools, canvas, ta, out, el('div', { class: 'actions' }, checkBtn));
  area.append(wrap);
  requestAnimationFrame(size);
  window.addEventListener('resize', size, { once: true });

  const modelAnswer = q.expected || q.answerKey || '';
  const show = (res, typed) => {
    out.innerHTML = '';
    if (res.text) out.append(el('div', { class: 'hand-read' }, el('b', {}, tr(L.read), ' '), dictDiff(res.text)));
    if (res.corrections?.length) out.append(el('div', { class: 'hand-fix' }, el('b', {}, tr(L.fix), ' '), res.corrections.map((c) => el('span', { class: 'fx' }, el('s', {}, c.wrong), ' → ', el('b', {}, c.right)))));
    if (res.feedback) { out.append(el('div', { class: 'hand-fb' }, '🦉 ', res.feedback)); speak({ text: res.feedback, lang: { fr: 'fr-CA', en: 'en-CA', zh: 'zh-CN' }[lang] }); }
  };
  // dictation: mark the words that differ from the dictated sentence
  const dictDiff = (text) => {
    if (q.mode !== 'dictation' || !q.expected) return el('span', {}, `« ${text} »`);
    const want = norm(q.expected).split(' '), got = norm(text).split(' ');
    return el('span', {}, '« ', got.map((w, i) => el('span', { class: want[i] === w ? 'ok-w' : 'bad-w' }, w, ' ')), '»');
  };
  let attempts = 0;
  checkBtn.addEventListener('click', async () => {
    if (area.classList.contains('locked') || checkBtn.disabled) return;
    const typed = !ta.classList.contains('hidden') ? ta.value.trim() : '';
    if (!typed && !strokes.some((s) => !s.erase)) { out.textContent = tr(L.empty); sfx('bad'); return; }
    checkBtn.disabled = true; out.innerHTML = ''; out.append(el('div', { class: 'hand-wait' }, '⏳ ', tr(L.reading)));
    let res = null;
    try {
      if (!voiceUrl()) throw new Error('no server');
      const r = await fetch(`${voiceUrl()}/ai/write`, {
        method: 'POST', headers: { 'content-type': 'application/json', ...(store.settings.voiceCode ? { 'x-family-code': store.settings.voiceCode } : {}) },
        body: JSON.stringify({ lang, mode: q.mode, image: typed ? undefined : canvas.toDataURL('image/png'), typed: typed || undefined,
          expected: q.expected, answerKey: q.answerKey, text: q.stimulus?.text ? tr(q.stimulus.text) : undefined, question: tr(q.prompt), words: q.words, minWords: q.minWords }),
        signal: AbortSignal.timeout(45000),
      });
      if (!r.ok) throw new Error('server ' + r.status);
      res = await r.json();
    } catch (e) {
      // no AI available: show the model answer and let the child / parent decide
      checkBtn.disabled = false;
      out.innerHTML = '';
      out.append(el('div', { class: 'hand-fb' }, tr(L.offline), ' ', el('b', {}, modelAnswer || '—')),
        el('div', { class: 'actions' },
          el('button', { class: 'btn primary', onclick: () => { area.classList.add('locked'); ctx.check(true); } }, '✔ ', tr(L.yes)),
          el('button', { class: 'btn', onclick: () => { area.classList.add('locked'); ctx.check(false); ctx.check(false); } }, tr(L.no))));
      return;
    }
    // dictation is judged locally, word by word (accents and endings count)
    if (q.mode === 'dictation' && q.expected) res.ok = norm(res.text) === norm(q.expected);
    show(res, typed);
    attempts++;
    const r = ctx.check(!!res.ok);
    if (r === 'ok') { area.classList.add('locked'); checkBtn.remove(); }
    else if (r === 'retry') { checkBtn.disabled = false; }
    else {
      area.classList.add('locked'); checkBtn.remove();
      if (modelAnswer) out.append(el('div', { class: 'hand-model' }, el('b', {}, tr(L.model), ' '), modelAnswer));
      ctx.revealed();
    }
  });
}
