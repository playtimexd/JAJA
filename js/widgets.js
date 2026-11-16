// Question renderers. Each widget gets (q, area, ctx):
//   ctx.check(correct) -> 'ok' | 'retry' | 'reveal'   (one answer attempt)
//   ctx.mistake()                                     (soft mistake, used by sort)
//   ctx.finish()                                      (sort finished)
//   ctx.revealed()                                    (widget finished showing the right answer)
import { el, wait } from './util.js';
import { tr, t } from './i18n.js';
import { speak, sfx } from './audio.js';
import { store } from './store.js';

// Chinese: characters with pinyin on top. hz = '大山', py = 'dà shān' (one syllable per character; punctuation has none).
const isHan = (c) => /\p{Script=Han}/u.test(c);
export function hanzi(hz, py, cls = '') {
  const n = el('span', { class: `hz ${cls}` });
  const syl = String(py || '').trim().split(/\s+/).filter(Boolean);
  const chars = [...String(hz)];
  const hanCount = chars.filter(isHan).length;
  if (!py || store.settings.pinyin === false || syl.length !== hanCount) {
    n.append(String(hz));
    if (py && store.settings.pinyin !== false && syl.length !== hanCount) n.prepend(el('span', { class: 'py-line' }, py));
    return n;
  }
  let k = 0, last = null;
  for (const c of chars) {
    if (isHan(c)) { last = el('ruby', {}, c, el('rt', {}, syl[k++].replace(/[，。、？！,.!?;:；：]+$/u, ''))); n.append(last); }
    else if (last && /[，。、？！,.!?;:；：」』）)…]/u.test(c)) {   // keep punctuation glued to the previous character
      const g = el('span', { class: 'hz-g' }); last.replaceWith(g); g.append(last, el('span', { class: 'hz-p' }, c)); last = g;
    } else { n.append(c); last = null; }
  }
  return n;
}

export function face(o, cls = '') {
  const f = el('span', { class: `face ${cls}` });
  if (o.svg) f.append(el('span', { class: 'f-svg', html: o.svg }));
  if (o.emoji) f.append(el('span', { class: 'f-emoji' }, o.emoji));
  if (o.hz) f.append(el('span', { class: 'f-text f-hz' }, hanzi(o.hz, o.py)));
  else if (o.py && !o.hz) f.append(el('span', { class: 'f-text f-py' }, o.py));
  if (o.text != null && o.text !== '') f.append(el('span', { class: 'f-text' }, tr(o.text)));
  return f;
}

const speakerBtn = (say) =>
  el('button', { class: 'mini-say', 'aria-label': '🔊', onclick: (e) => { e.stopPropagation(); speak(say); } }, '🔊');

export function stimulus(s) {
  if (!s) return null;
  const box = el('div', { class: 'stim' });
  if (s.hz) {
    const long = [...s.hz].length > 14;
    box.append(el('div', { class: `stim-text stim-hz ${long ? 'long' : [...s.hz].length > 4 ? 'mid' : ''}` }, hanzi(s.hz, s.py)));
  } else if (s.svg) box.append(el('div', { class: 'stim-svg', html: s.svg }));
  else if (s.emojis) {
    const g = el('div', { class: 'stim-count' });
    for (let i = 0; i < s.count; i += 5) {
      g.append(el('span', { class: 'grp' }, s.emojis.repeat(Math.min(5, s.count - i))));
    }
    box.append(g);
  } else if (s.emoji) box.append(el('div', { class: 'stim-emoji' }, s.emoji));
  else if (s.text != null) {
    const txt = tr(s.text);
    box.append(el('div', { class: `stim-text ${txt.length > 60 ? 'long' : txt.length > 18 ? 'mid' : ''}` }, txt));
  }
  return box;
}

const shake = (n) => { n.classList.remove('shake'); void n.offsetWidth; n.classList.add('shake'); };

// ---------------- choice ----------------
function choice(q, area, ctx) {
  const order = q.options.map((o, i) => i);
  const idx = q.fixedOrder ? order : ctx.R.shuffle(order);
  const anySvg = q.options.some((o) => o.svg);
  const longest = Math.max(...q.options.map((o) => tr(o.text ?? '').length));
  const cols = q.cols || (q.options.length <= 3 ? q.options.length : 2);
  const balloons = ctx.style === 'balloons';
  const grid = el('div', { class: `choices cols-${cols} ${anySvg ? 'has-svg' : ''} ${longest > 22 ? 'long' : ''} ${balloons ? 'balloons' : ''}` });
  const btns = [];
  for (const [k, i] of idx.entries()) {
    const o = q.options[i];
    const b = el('button', { class: 'opt' }, face(o));
    if (balloons) { b.classList.add(`bal${k % 5}`); b.style.animationDelay = `${-ctx.R.int(0, 2000)}ms`; }
    if (o.say) b.append(speakerBtn(o.say));
    b.addEventListener('click', () => {
      if (b.disabled || grid.classList.contains('locked')) return;
      const r = ctx.check(i === q.answer);
      if (r === 'ok') { b.classList.add('right'); if (balloons) b.classList.add('popped'); grid.classList.add('locked'); }
      else if (r === 'retry') { b.classList.add('wrong'); b.disabled = true; shake(b); }
      else {
        b.classList.add('wrong'); shake(b); grid.classList.add('locked');
        btns.find((x) => x.i === q.answer).b.classList.add('right', 'pulse');
        ctx.revealed();
      }
    });
    btns.push({ b, i });
    grid.append(b);
  }
  area.append(grid);
}

// ---------------- sort ----------------
function sort(q, area, ctx) {
  const items = ctx.R.shuffle(q.items.map((it, i) => ({ ...it, i })));
  const tray = el('div', { class: 'tray' });
  const bins = el('div', { class: `bins n${q.bins.length}` });
  let selected = null, left = items.length;
  const binEls = q.bins.map((b, bi) => {
    const drop = el('div', { class: 'bin-drop' });
    const node = el('button', { class: 'bin' }, el('div', { class: 'bin-head' }, b.emoji ? el('span', { class: 'bin-emoji' }, b.emoji) : null, el('span', {}, b.hz ? hanzi(b.hz, b.py) : tr(b.text))), drop);
    node.addEventListener('click', () => selected && place(selected, bi));
    node.drop = drop;
    return node;
  });
  bins.append(...binEls);

  function select(card) {
    tray.querySelectorAll('.card.sel').forEach((c) => c.classList.remove('sel'));
    selected = card;
    if (card) { card.classList.add('sel'); sfx('tap'); if (card.item.say) speak(card.item.say); }
  }
  function place(card, bi) {
    if (card.item.bin === bi) {
      sfx('place');
      card.classList.remove('sel');
      card.classList.add('placed');
      binEls[bi].drop.append(card);
      selected = null;
      if (--left === 0) ctx.finish();
    } else {
      ctx.mistake();
      shake(binEls[bi]);
      shake(card);
    }
  }
  for (const it of items) {
    const card = el('div', { class: `card ${it.svg ? 'has-svg' : ''} ${tr(it.text ?? '').length > 25 ? 'long' : ''}` }, face(it));
    card.item = it;
    if (it.say) card.append(speakerBtn(it.say));
    // tap-to-select + drag
    let start = null, ghost = null;
    card.addEventListener('pointerdown', (e) => {
      if (card.classList.contains('placed')) return;
      start = { x: e.clientX, y: e.clientY };
      card.setPointerCapture(e.pointerId);
    });
    card.addEventListener('pointermove', (e) => {
      if (!start) return;
      const dx = e.clientX - start.x, dy = e.clientY - start.y;
      if (!ghost && Math.hypot(dx, dy) > 12) {
        select(card);
        ghost = card.cloneNode(true);
        ghost.classList.add('drag-ghost');
        const r = card.getBoundingClientRect();
        Object.assign(ghost.style, { width: r.width + 'px', left: r.left + 'px', top: r.top + 'px' });
        ghost.r = r;
        document.body.append(ghost);
        card.classList.add('dragging');
      }
      if (ghost) ghost.style.transform = `translate(${dx}px, ${dy}px) rotate(-3deg)`;
    });
    const end = (e) => {
      if (!start) return;
      const wasDrag = !!ghost;
      start = null;
      if (ghost) {
        ghost.remove(); ghost = null; card.classList.remove('dragging');
        const target = document.elementFromPoint(e.clientX, e.clientY)?.closest('.bin');
        const bi = binEls.indexOf(target);
        if (bi >= 0) place(card, bi);
      }
      if (!wasDrag && e.type === 'pointerup' && !card.classList.contains('placed')) select(selected === card ? null : card);
    };
    card.addEventListener('pointerup', end);
    card.addEventListener('pointercancel', end);
    tray.append(card);
  }
  area.append(bins, tray);
}

// ---------------- order ----------------
const tileKey = (x) => (x && x.hz ? x.hz : tr(x));
const tileLabel = (x) => (x && x.hz ? hanzi(x.hz, x.py) : tr(x));
function order(q, area, ctx) {
  const all = [...q.tiles.map((x, i) => ({ x, i })), ...(q.extra || []).map((x) => ({ x, i: -1 }))];
  let pool = ctx.R.shuffle(all);
  // avoid presenting the tiles already in order
  if (pool.length > 1 && pool.every((p, k) => p.i === k)) pool = [...pool.slice(1), pool[0]];
  const tight = (q.joiner ?? ' ') === '';
  const slotsRow = el('div', { class: `slots ${tight ? 'tight' : ''}` });
  const poolRow = el('div', { class: 'pool' });
  const slots = q.tiles.map(() => { const s = el('div', { class: 'slot' }); slotsRow.append(s); return s; });
  const checkBtn = el('button', { class: 'btn check', disabled: true }, '✓ ', t('check'));
  const filled = () => slots.every((s) => s.firstChild);
  const refresh = () => { checkBtn.disabled = !filled(); };

  for (const p of pool) {
    const tile = el('button', { class: 'tile' }, tileLabel(p.x));
    tile.p = p;
    tile.addEventListener('click', () => {
      if (area.classList.contains('locked')) return;
      sfx('tap');
      if (tile.parentElement.classList.contains('slot')) poolRow.append(tile);
      else { const s = slots.find((x) => !x.firstChild); if (s) s.append(tile); }
      slotsRow.querySelectorAll('.wrong').forEach((n) => n.classList.remove('wrong'));
      refresh();
    });
    poolRow.append(tile);
  }
  checkBtn.addEventListener('click', () => {
    const got = slots.map((s) => tileKey(s.firstChild.p.x));
    const want = q.tiles.map((x) => tileKey(x));
    const ok = got.every((g, k) => g === want[k]);
    const r = ctx.check(ok);
    if (r === 'ok') { slots.forEach((s) => s.firstChild.classList.add('right')); area.classList.add('locked'); checkBtn.remove(); }
    else if (r === 'retry') {
      slots.forEach((s, k) => { if (got[k] !== want[k]) s.firstChild.classList.add('wrong'); });
      shake(slotsRow);
      setTimeout(() => {
        slots.forEach((s, k) => { if (s.firstChild && got[k] !== want[k]) poolRow.append(s.firstChild); });
        poolRow.querySelectorAll('.wrong').forEach((n) => n.classList.remove('wrong'));
        refresh();
      }, 900);
    } else {
      area.classList.add('locked'); checkBtn.remove();
      slots.forEach((s, k) => { s.innerHTML = ''; s.append(el('span', { class: 'tile right' }, tileLabel(q.tiles[k]))); });
      poolRow.innerHTML = '';
      ctx.revealed();
    }
  });
  area.append(slotsRow, poolRow, el('div', { class: 'actions' }, checkBtn));
}

// ---------------- keypad ----------------
function keypad(q, area, ctx) {
  let val = '';
  const disp = el('div', { class: 'kp-display' }, '');
  const show = () => { disp.textContent = val || ' '; disp.classList.toggle('empty', !val); okBtn.disabled = !val; };
  const pad = el('div', { class: 'keypad' });
  const press = (k) => {
    if (area.classList.contains('locked')) return;
    sfx('tap');
    if (k === '⌫') val = val.slice(0, -1);
    else if (val.length < 4) val = (val === '0' ? '' : val) + k;
    disp.classList.remove('wrong');
    show();
  };
  for (const k of ['7', '8', '9', '4', '5', '6', '1', '2', '3', '⌫', '0']) pad.append(el('button', { class: `key ${k === '⌫' ? 'del' : ''}`, onclick: () => press(k) }, k));
  const okBtn = el('button', { class: 'key ok', disabled: true }, '✓');
  okBtn.addEventListener('click', () => {
    if (!val || area.classList.contains('locked')) return;
    const r = ctx.check(Number(val) === q.answer);
    if (r === 'ok') { disp.classList.add('right'); area.classList.add('locked'); }
    else if (r === 'retry') { disp.classList.add('wrong'); shake(disp); setTimeout(() => { val = ''; show(); }, 700); }
    else { area.classList.add('locked'); disp.classList.add('wrong'); shake(disp); setTimeout(() => { disp.className = 'kp-display right pulse'; disp.textContent = q.answer; ctx.revealed(); }, 700); }
  });
  pad.append(okBtn);
  area.append(el('div', { class: 'kp-wrap' }, disp, pad));
  show();
}

// ---------------- base10 ----------------
function base10(q, area, ctx) {
  const cols = q.answer >= 100 ? ['h', 't', 'u'] : ['t', 'u'];
  const val = { h: 0, t: 0, u: 0 };
  const names = { h: { fr: 'centaines', en: 'hundreds' }, t: { fr: 'dizaines', en: 'tens' }, u: { fr: 'unités', en: 'ones' } };
  const wrap = el('div', { class: 'b10' });
  const views = {};
  for (const c of cols) {
    const stack = el('div', { class: `b10-stack ${c}` });
    const count = el('div', { class: 'b10-count' }, '0');
    const col = el('div', { class: 'b10-col' },
      el('div', { class: 'b10-name' }, tr(names[c])),
      stack,
      count,
      el('div', { class: 'b10-btns' },
        el('button', { class: 'pm', onclick: () => step(c, -1) }, '−'),
        el('button', { class: 'pm plus', onclick: () => step(c, +1) }, '+')));
    views[c] = { stack, count };
    wrap.append(col);
  }
  const render = () => {
    for (const c of cols) {
      const { stack, count } = views[c];
      stack.innerHTML = '';
      for (let i = 0; i < val[c]; i++) stack.append(el('span', { class: `blk ${c}` }));
      count.textContent = val[c];
    }
  };
  function step(c, d) {
    if (area.classList.contains('locked')) return;
    const nv = val[c] + d;
    if (nv < 0 || nv > 9) return;
    val[c] = nv; sfx('tap'); render();
  }
  const checkBtn = el('button', { class: 'btn check' }, '✓ ', t('check'));
  checkBtn.addEventListener('click', () => {
    const n = val.h * 100 + val.t * 10 + val.u;
    const r = ctx.check(n === q.answer);
    if (r === 'ok') { wrap.classList.add('right'); area.classList.add('locked'); checkBtn.remove(); }
    else if (r === 'retry') shake(wrap);
    else {
      area.classList.add('locked'); checkBtn.remove();
      val.h = Math.floor(q.answer / 100); val.t = Math.floor(q.answer / 10) % 10; val.u = q.answer % 10;
      render(); wrap.classList.add('right', 'pulse'); ctx.revealed();
    }
  });
  area.append(wrap, el('div', { class: 'actions' }, checkBtn));
  render();
}

// ---------------- numberline ----------------
function numberline(q, area, ctx) {
  const n = Math.round((q.max - q.min) / q.step);
  const W = 1000, pad = 40, y = 70;
  const x = (v) => pad + ((v - q.min) / (q.max - q.min)) * (W - 2 * pad);
  const every = n > 11 ? (q.max - q.min) / 4 : (q.max - q.min) / 2;
  let body = `<line x1="${pad - 20}" y1="${y}" x2="${W - pad + 20}" y2="${y}" stroke="#2b2d42" stroke-width="5" stroke-linecap="round"/>`;
  for (let i = 0; i <= n; i++) {
    const v = q.min + i * q.step, big = (v - q.min) % every === 0;
    body += `<line x1="${x(v)}" y1="${y - (big ? 22 : 14)}" x2="${x(v)}" y2="${y + (big ? 22 : 14)}" stroke="#2b2d42" stroke-width="${big ? 5 : 3}"/>`;
    if (big) body += `<text x="${x(v)}" y="${y + 58}" font-size="34" font-weight="800" text-anchor="middle" fill="#2b2d42" font-family="system-ui">${v}</text>`;
  }
  const svgNode = el('div', { class: 'nl', html: `<svg viewBox="0 0 ${W} 140" xmlns="http://www.w3.org/2000/svg">${body}<g class="marker"></g></svg>` });
  const svgEl = svgNode.firstChild;
  const marker = svgEl.querySelector('.marker');
  let chosen = null;
  const drawMarker = (v, cls) => {
    marker.innerHTML = `<g class="${cls || ''}"><circle cx="${x(v)}" cy="${y}" r="20" /><text x="${x(v)}" y="${y - 34}" font-size="32" text-anchor="middle">🦉</text></g>`;
  };
  svgEl.addEventListener('pointerdown', (e) => {
    if (area.classList.contains('locked')) return;
    const r = svgEl.getBoundingClientRect();
    const sx = ((e.clientX - r.left) / r.width) * W;
    const i = Math.round(((sx - pad) / (W - 2 * pad)) * n);
    chosen = q.min + Math.max(0, Math.min(n, i)) * q.step;
    sfx('tap'); drawMarker(chosen); checkBtn.disabled = false;
  });
  const checkBtn = el('button', { class: 'btn check', disabled: true }, '✓ ', t('check'));
  checkBtn.addEventListener('click', () => {
    const r = ctx.check(chosen === q.answer);
    if (r === 'ok') { drawMarker(chosen, 'ok'); area.classList.add('locked'); checkBtn.remove(); }
    else if (r === 'retry') { drawMarker(chosen, 'bad'); shake(svgNode); }
    else { area.classList.add('locked'); checkBtn.remove(); drawMarker(q.answer, 'ok'); ctx.revealed(); }
  });
  area.append(svgNode, el('div', { class: 'actions' }, checkBtn));
}

// ---------------- write (Chinese stroke order, Hanzi Writer) ----------------
// q: { type:'write', key, prompt, say?, char:'人', py:'rén' } — watch the strokes, then trace them.
let hwLoad = null;
const loadHW = () => hwLoad ??= new Promise((res, rej) => {
  if (window.HanziWriter) return res(window.HanziWriter);
  const s = document.createElement('script');
  s.src = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.7.2/dist/hanzi-writer.min.js';
  s.onload = () => res(window.HanziWriter); s.onerror = () => { hwLoad = null; rej(new Error('hanzi-writer')); };
  document.head.append(s);
});
function write(q, area, ctx) {
  const size = Math.min(340, Math.round(window.innerHeight * 0.42));
  const box = el('div', { class: 'hw-box', style: { width: `${size}px`, height: `${size}px` } });
  const grid = `<svg class="hw-grid" viewBox="0 0 100 100"><rect x="1" y="1" width="98" height="98" fill="none" stroke="#e5534b" stroke-width="1.5"/><path d="M0 0L100 100M100 0L0 100M50 0V100M0 50H100" stroke="#e5534b" stroke-width=".6" stroke-dasharray="3 3"/></svg>`;
  box.innerHTML = grid;
  const pin = el('div', { class: 'hw-py' }, hanzi(q.char, q.py, 'big'));
  const watchBtn = el('button', { class: 'btn' }, '▶ ', tr({ fr: 'Regarder', en: 'Watch' }));
  const msg = el('div', { class: 'hw-msg' });
  area.append(el('div', { class: 'hw-wrap' }, el('div', { class: 'hw-side' }, pin, watchBtn, msg), box));
  loadHW().then((HW) => {
    const w = HW.create(box, q.char, { width: size, height: size, padding: 10, showOutline: true, strokeColor: '#2b2d42', outlineColor: '#ddd', drawingColor: '#ff5d8f', highlightColor: '#4f8ef7', drawingWidth: 26, strokeAnimationSpeed: 1, delayBetweenStrokes: 250, showHintAfterMisses: 2, highlightOnComplete: true });
    const quiz = () => w.quiz({
      onComplete: (d) => { const ok = d.totalMistakes <= Math.max(2, w._character?.strokes?.length ?? 4); ctx.check(true); if (!ok) msg.textContent = '👍'; },
    });
    watchBtn.onclick = () => { sfx('tap'); w.cancelQuiz?.(); w.animateCharacter({ onComplete: quiz }); };
    w.animateCharacter({ onComplete: quiz });
  }).catch(() => {
    msg.textContent = tr({ fr: 'Il faut Internet pour cet exercice.', en: 'This exercise needs the Internet.' });
    ctx.finish();
  });
}

import { hand } from './hand.js';
export const WIDGETS = { choice, sort, order, keypad, base10, numberline, write, hand };

// Render a question; resolves with a score in [0, 1].
export function runQuestion(q, root, R, hooks) {
  return new Promise((resolve) => {
    let mistakes = 0, finished = false;
    const maxTries = hooks.tries ?? 2;
    const scoreNow = () => (mistakes === 0 ? 1 : mistakes === 1 ? 0.5 : 0);
    const isSort = q.type === 'sort';
    const finish = async (score, delay) => {
      if (finished) return;
      finished = true;
      await wait(delay);
      resolve(score);
    };
    const ctx = {
      R,
      style: hooks.style,
      check(correct) {
        if (correct) {
          sfx('good'); hooks.praise();
          finish(scoreNow(), hooks.fast ? 550 : 1100);
          return 'ok';
        }
        mistakes++;
        sfx('bad');
        if (mistakes >= maxTries) { hooks.reveal(); return 'reveal'; }
        hooks.retry();
        return 'retry';
      },
      mistake() { mistakes++; sfx('bad'); hooks.retry(); },
      finish() { sfx('good'); hooks.praise(); finish(isSort ? scoreNow() : 1, 1100); },
      revealed() { if (q.tip) root.append(el('div', { class: 'q-tip' }, '💡 ', tr(q.tip))); hooks.waitNext(() => finish(0, 0)); },
    };

    window.__q = q; // test hook
    root.innerHTML = '';
    const head = el('div', { class: 'q-head' });
    const promptText = tr(q.prompt);
    head.append(el('div', { class: 'q-prompt' }, promptText));
    const say = q.say || (q.prompt ? { text: q.prompt } : null);
    if (say) head.prepend(el('button', { class: 'say-btn', 'aria-label': '🔊', onclick: () => speak(say) }, '🔊'));
    root.append(head);
    const st = stimulus(q.stimulus);
    if (st) root.append(st);
    const area = el('div', { class: `q-area t-${q.type}` });
    root.append(area);
    WIDGETS[q.type](q, area, ctx);
    // hooks.bind({ fail }) lets the game end a question from outside (time ran out)
    hooks.bind?.({
      fail() {
        if (finished) return;
        root.append(el('div', { class: 'q-block' }));
        sfx('bad');
        finish(0, 700);
      },
    });
    // auto read: explicit `say`, else the prompt (in the UI language)
    setTimeout(() => speak(say), 250);
  });
}
