// « Mon cours d’arts » : an ordered course of teacher lessons (Arts plastiques, 1er cycle).
// Data: js/content/arts/cours.js (lessons + projects + paints). Styles: css/arts-cours.css (self-linked if index.html does not link it).
// API:
//   openCourse(back?)        course map; `back` = function for the ‹ button (remembered).
//   openLesson(id, page = 0) goal → slides → vocabulary → mini-game → reflection + « Faire le projet ».
//   setProjectOpener(fn)     fn(projectId) opens a project (arts.js registers it). Fallback: arts.js openArt().
// Completion: store.arts.cours[lessonId] = 'YYYY-MM-DD' when the mini-game is won (+5 plumes the first time, +1 after).
import { el } from './util.js';
import { store, save, today } from './store.js';
import { tr, lang } from './i18n.js';
import { speak, sfx, setContentLang, unlockAudio } from './audio.js';
import { screen, backBtn, wallet, refreshWallet } from './ui.js';
import { addCoins, confetti, COIN, dressedOwl } from './game.js';
import { lessons, paints, mixOf } from './content/arts/cours.js';

try {
  if (!document.querySelector('link[href*="arts-cours.css"]')) document.head.append(el('link', { rel: 'stylesheet', href: new URL('../css/arts-cours.css', import.meta.url).href }));
} catch { /* no DOM */ }

const COINS_FIRST = 5, COINS_AGAIN = 1;
const L = {
  course: { fr: 'Mon cours d’arts', en: 'My art course' },
  hello: { fr: 'Une leçon à la fois, comme à l’école. Tu peux commencer n’importe où!', en: 'One lesson at a time, like at school. You can start anywhere!' },
  lessonsDone: { fr: 'leçons réussies', en: 'lessons done' },
  next: { fr: 'À faire', en: 'Up next' },
  lesson: { fr: 'Leçon', en: 'Lesson' },
  goal: { fr: 'Mon objectif', en: 'My goal' },
  tapPic: { fr: 'Touche l’image pour réentendre.', en: 'Tap the picture to hear it again.' },
  vocab: { fr: 'Les mots de l’artiste', en: 'Artist words' },
  vocabHint: { fr: 'Touche un mot pour l’entendre.', en: 'Tap a word to hear it.' },
  game: { fr: 'À toi de jouer!', en: 'Your turn!' },
  skip: { fr: 'Passer', en: 'Skip' },
  won: { fr: 'Bravo! Leçon réussie!', en: 'Well done! Lesson complete!' },
  cont: { fr: 'Continuer', en: 'Continue' },
  think: { fr: 'Pour réfléchir', en: 'Let’s think about it' },
  thinkHint: { fr: 'Parles-en avec un adulte. Touche une question pour l’entendre.', en: 'Talk about it with a grown-up. Tap a question to hear it.' },
  project: { fr: 'Faire le projet', en: 'Do the project' },
  nextLesson: { fr: 'Leçon suivante', en: 'Next lesson' },
  backCourse: { fr: 'Retour au cours', en: 'Back to the course' },
  make: { fr: 'Fabrique la couleur :', en: 'Make the colour:' },
  check: { fr: 'Vérifier', en: 'Check' },
  or: { fr: 'ou', en: 'or' },
  allDone: { fr: 'Tu as terminé tout le cours! Tu es un vrai artiste!', en: 'You finished the whole course! You are a real artist!' },
};
const say = (x) => speak({ text: tr(x) });
const setLang = () => setContentLang(lang() === 'fr' ? 'fr-CA' : 'en-CA');
const doneMap = () => { store.arts ??= { done: {}, fav: {} }; return (store.arts.cours ??= {}); };
const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

let opener = null, courseBack = null;
export function setProjectOpener(fn) { opener = typeof fn === 'function' ? fn : null; }
async function openProject(pid) {
  if (opener) return opener(pid);
  const m = await import('./arts.js');
  return m.openArt(pid, () => openCourse());
}
async function defaultBack() { const m = await import('./arts.js'); m.artsHome(() => location.reload()); }

// ---------------- course map ----------------
export function openCourse(back) {
  if (typeof back === 'function') courseBack = back;
  unlockAudio(); setLang();
  const d = doneMap();
  const n = lessons.filter((l) => d[l.id]).length;
  const next = lessons.find((l) => !d[l.id]);
  screen('cours-screen purple',
    el('header', { class: 'bar' }, backBtn(() => (courseBack || defaultBack)()), el('h1', {}, '🎓 ', tr(L.course)), wallet()),
    el('div', { class: 'cours-intro' },
      dressedOwl('cours-owl'),
      el('div', { class: 'cours-intro-txt' },
        el('b', {}, n === lessons.length ? tr(L.allDone) : tr(L.hello)),
        el('div', { class: 'cours-prog' }, el('span', { style: { width: `${Math.round((n / lessons.length) * 100)}%` } })),
        el('small', {}, `${n} / ${lessons.length} ${tr(L.lessonsDone)}`))),
    el('div', { class: 'cours-map' }, lessons.map((l, i) => el('button', {
      class: `cours-node ${d[l.id] ? 'done' : ''} ${l === next ? 'next' : ''}`,
      onclick: () => { sfx('tap'); openLesson(l.id); },
    },
    el('span', { class: 'cn-num' }, String(i + 1)),
    el('span', { class: 'cn-icon' }, l.icon),
    el('span', { class: 'cn-title' }, tr(l.title)),
    d[l.id] ? el('span', { class: 'cn-ok' }, '✅') : l === next ? el('span', { class: 'cn-next' }, tr(L.next)) : null))));
  if (next) speak({ text: `${tr(L.course)}. ${tr(L.lesson)} ${lessons.indexOf(next) + 1} : ${tr(next.title)}.` });
}

// ---------------- one lesson ----------------
const pagesOf = (les) => ['goal', ...les.teach.map((_, i) => `s${i}`), 'vocab', 'game', 'end'];

export function openLesson(id, k = 0) {
  const les = lessons.find((l) => l.id === id);
  if (!les) return openCourse();
  unlockAudio(); setLang();
  const pages = pagesOf(les);
  k = Math.max(0, Math.min(pages.length - 1, k | 0));
  const p = pages[k], idx = lessons.indexOf(les);
  const go = (j) => { sfx('tap'); openLesson(id, j); };
  let body, speech = null;
  if (p === 'goal') {
    body = el('div', { class: 'cours-goal' },
      el('div', { class: 'cours-big-icon' }, les.icon),
      el('div', { class: 'cours-goal-lbl' }, `${tr(L.lesson)} ${idx + 1} · ${tr(L.goal)}`),
      el('div', { class: 'cours-goal-txt' }, tr(les.goal)),
      el('button', { class: 'say-btn', onclick: () => say(les.goal) }, '🔊'));
    speech = `${tr(les.title)}. ${tr(les.goal)}`;
  } else if (p[0] === 's') {
    const i = +p.slice(1), s = les.teach[i];
    body = el('div', { class: 'step-body cours-slide' },
      el('div', { class: 'step-pic', html: s.svg, onclick: () => say(s.text) }),
      el('div', { class: 'step-side' },
        el('div', { class: 'step-num' }, String(i + 1)),
        el('div', { class: 'step-text' }, tr(s.text)),
        el('button', { class: 'say-btn', onclick: () => say(s.text) }, '🔊'),
        el('small', { class: 'cours-hint' }, tr(L.tapPic))));
    speech = tr(s.text);
  } else if (p === 'vocab') {
    body = el('div', { class: 'cours-vocab-wrap' },
      el('h2', {}, '📖 ', tr(L.vocab)), el('small', { class: 'cours-hint' }, tr(L.vocabHint)),
      el('div', { class: 'cours-vocab' }, les.vocab.map((v) => el('button', {
        class: 'cours-word', onclick: (e) => { e.currentTarget.classList.add('heard'); speak({ text: `${tr(v.word)}. ${tr(v.def)}` }); },
      }, el('b', {}, tr(v.word)), el('span', {}, tr(v.def)), el('i', {}, '🔊')))));
    speech = tr(L.vocab);
  } else if (p === 'game') {
    const host = el('div', { class: 'cours-game' });
    body = el('div', { class: 'cours-game-wrap' }, el('h2', {}, '🎲 ', tr(L.game)), host);
    setTimeout(() => (GAMES[les.game.type] || GAMES.quiz)(host, les.game, () => won(les, host, () => openLesson(id, k + 1))), 0);
  } else {
    body = endPage(les, idx);
    speech = `${tr(L.think)}. ${les.retour.map(tr).join(' ')}`;
  }
  const dots = el('div', { class: 'step-dots' }, pages.map((_, j) => el('button', { class: `sd ${j < k ? 'past' : ''} ${j === k ? 'now' : ''}`, onclick: () => go(j) })));
  screen('cours-lesson purple',
    el('header', { class: 'bar' }, backBtn(() => openCourse()), el('h1', {}, les.icon, ' ', tr(les.title)), el('span', { class: 'bar-title' }, `${k + 1} / ${pages.length}`)),
    body,
    el('div', { class: 'cours-nav' },
      el('button', { class: 'btn ghost', disabled: k === 0, onclick: () => go(k - 1) }, '◀'),
      dots,
      p === 'end' ? el('span', { class: 'cours-nav-gap' })
        : p === 'game' ? el('button', { class: 'btn ghost cours-skip', onclick: () => go(k + 1) }, tr(L.skip), ' ▶')
          : el('button', { class: 'btn primary', onclick: () => go(k + 1) }, '▶')));
  if (speech) speak({ text: speech });
}

function won(les, host, next) {
  const d = doneMap(), first = !d[les.id];
  d[les.id] = today();
  const coins = first ? COINS_FIRST : COINS_AGAIN;
  addCoins(coins); save(); refreshWallet();
  sfx('win'); confetti(60);
  host.innerHTML = '';
  host.append(el('div', { class: 'cours-won' }, dressedOwl('big hop-loop'), el('h2', {}, tr(L.won)), el('div', { class: 'res-coins' }, `+${coins} ${COIN}`),
    el('button', { class: 'btn primary big-go', onclick: () => { sfx('tap'); next(); } }, tr(L.cont), ' ▶')));
  say(L.won);
}

function endPage(les, idx) {
  const nxt = lessons[idx + 1];
  return el('div', { class: 'cours-end' },
    el('div', { class: 'cours-retour' },
      el('h2', {}, '💭 ', tr(L.think)), el('small', { class: 'cours-hint' }, tr(L.thinkHint)),
      les.retour.map((q) => el('button', { class: 'cours-q-card', onclick: () => say(q) }, el('span', {}, tr(q)), el('i', {}, '🔊')))),
    el('div', { class: 'cours-end-btns' },
      el('button', { class: 'btn primary big-go cours-project-btn', onclick: () => { sfx('tap'); openProject(les.project); } }, '🖌️ ', tr(L.project)),
      nxt ? el('button', { class: 'btn ghost', onclick: () => { sfx('tap'); openLesson(nxt.id); } }, tr(L.nextLesson), ' : ', nxt.icon, ' ', tr(nxt.title)) : null,
      el('button', { class: 'btn ghost', onclick: () => { sfx('tap'); openCourse(); } }, tr(L.backCourse))));
}

// ---------------- mini-games ----------------
const head = (q) => el('div', { class: 'q-head cours-q' }, el('button', { class: 'say-btn', onclick: () => say(q) }, '🔊'), el('div', { class: 'cours-q-txt' }, tr(q)));
const roundDots = (r, n) => n > 1 ? el('div', { class: 'cours-rounds' }, Array.from({ length: n }, (_, i) => el('span', { class: i < r ? 'past' : i === r ? 'now' : '' }))) : null;
const shake = (n) => { n.classList.remove('shake'); void n.offsetWidth; n.classList.add('shake'); };
const potSvg = (c) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="32" width="64" height="60" rx="10" fill="#eef1f6" stroke="#3a3f55" stroke-width="5"/><rect x="24" y="50" width="52" height="28" rx="5" fill="${c}"/><ellipse cx="50" cy="34" rx="32" ry="10" fill="${c}" stroke="#3a3f55" stroke-width="5"/></svg>`;
const blobSvg = (c) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="48" cy="52" r="34" fill="${c}" stroke="#3a3f55" stroke-width="4"/><circle cx="82" cy="24" r="8" fill="${c}" stroke="#3a3f55" stroke-width="3"/><circle cx="14" cy="70" r="6" fill="${c}" stroke="#3a3f55" stroke-width="3"/></svg>`;

const GAMES = {
  // multiple choice, options = SVG pictures and/or labels; optional `pic` above
  quiz(host, g, win) {
    let r = 0;
    const draw = () => {
      const R = g.rounds[r];
      let lock = false;
      const labelsOnly = R.opts.every((o) => !o.svg);
      const grid = el('div', { class: `choices cols-${labelsOnly ? 1 : R.opts.length} cours-choices ${labelsOnly ? 'long' : ''}` });
      for (const o of shuffle(R.opts)) {
        const b = el('button', { class: 'opt cours-opt', onclick: () => {
          if (lock || b.classList.contains('wrong')) return;
          if (o.ok) { lock = true; b.classList.add('right'); sfx('good'); setTimeout(() => (++r < g.rounds.length ? draw() : win()), 900); }
          else { b.classList.add('wrong'); sfx('bad'); shake(b); }
        } }, o.svg ? el('div', { class: 'cours-opt-svg', html: o.svg }) : null, o.label ? el('div', { class: 'cours-opt-lbl' }, tr(o.label)) : null);
        grid.append(b);
      }
      host.innerHTML = '';
      host.append(head(R.q), roundDots(r, g.rounds.length) || '', R.pic ? el('div', { class: 'cours-pic', html: R.pic }) : '', grid);
      speak({ text: labelsOnly ? `${tr(R.q)} ${[...grid.querySelectorAll('.cours-opt-lbl')].map((n) => n.textContent).join(`, ${tr(L.or)} `)}` : tr(R.q) });
    };
    draw();
  },

  // drag (or tap then tap a bin) each item into the right bin
  sort(host, g, win) {
    let sel = null, left = g.items.length;
    const tray = el('div', { class: 'tray cours-tray' });
    const bins = g.bins.map((b) => {
      const drop = el('div', { class: 'bin-drop' });
      const n = el('div', { class: 'bin cours-bin', 'data-bin': b.id, onclick: () => { if (sel) place(sel, b.id); } },
        el('div', { class: 'bin-head' }, b.icon ? el('span', { class: 'cours-bin-icon', html: b.icon }) : null, tr(b.label)), drop);
      n._drop = drop;
      return n;
    });
    const place = (card, binId) => {
      card.classList.remove('sel'); sel = null;
      if (card._it.bin === binId) {
        sfx('good'); card.classList.add('placed'); card._done = true;
        bins.find((b) => b.dataset.bin === binId)._drop.append(card);
        if (--left === 0) setTimeout(win, 700);
      } else { sfx('bad'); shake(card); }
    };
    for (const it of shuffle(g.items)) {
      const c = el('div', { class: 'card cours-card' }, el('div', { class: 'f-svg', html: it.svg }));
      c._it = it;
      c.addEventListener('pointerdown', (e) => {
        if (c._done) return;
        e.preventDefault();
        const sx = e.clientX, sy = e.clientY;
        let ghost = null;
        const move = (ev) => {
          if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 10) {
            const rc = c.getBoundingClientRect();
            ghost = c.cloneNode(true); ghost.classList.add('drag-ghost'); ghost.style.width = `${rc.width}px`;
            document.body.append(ghost); c.classList.add('dragging');
          }
          if (ghost) { ghost.style.left = `${ev.clientX - ghost.offsetWidth / 2}px`; ghost.style.top = `${ev.clientY - ghost.offsetHeight / 2}px`; }
        };
        const up = (ev) => {
          document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); document.removeEventListener('pointercancel', up);
          if (ghost) {
            ghost.remove(); c.classList.remove('dragging');
            const t = document.elementFromPoint(ev.clientX, ev.clientY)?.closest('.cours-bin');
            if (t) place(c, t.dataset.bin);
          } else {
            sfx('tap');
            if (sel && sel !== c) sel.classList.remove('sel');
            sel = sel === c ? null : c;
            c.classList.toggle('sel', sel === c);
          }
        };
        document.addEventListener('pointermove', move); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
      });
      tray.append(c);
    }
    host.innerHTML = '';
    host.append(head(g.q), tray, el('div', { class: `bins n${g.bins.length} cours-bins` }, bins));
    say(g.q);
  },

  // pick two paint pots, see the mix, find the target colour
  mix(host, g, win) {
    let r = 0;
    const draw = () => {
      const target = g.targets[r], tc = paints.colors[target];
      let picks = [], lock = false;
      const slots = [el('div', { class: 'cours-mix-slot' }), el('div', { class: 'cours-mix-slot' })];
      const res = el('div', { class: 'cours-mix-slot res' });
      const msg = el('div', { class: 'cours-mix-msg' });
      const show = () => {
        slots.forEach((s, i) => { s.innerHTML = picks[i] ? blobSvg(paints.colors[picks[i]].c) : ''; });
        res.innerHTML = '';
      };
      const pots = el('div', { class: 'cours-pots' }, g.pots.map((id) => el('button', { class: 'cours-pot', onclick: () => {
        if (lock) return;
        sfx('tap'); picks.push(id); show();
        if (picks.length < 2) { say(paints.colors[id].name); return; }
        lock = true;
        const m = mixOf(picks[0], picks[1]), mc = paints.colors[m];
        res.innerHTML = blobSvg(mc.c);
        msg.textContent = `${tr(paints.colors[picks[0]].name)} + ${tr(paints.colors[picks[1]].name)} = ${tr(mc.name)}`;
        speak({ text: msg.textContent.replace('+', lang() === 'fr' ? 'et' : 'and').replace('=', lang() === 'fr' ? 'donnent' : 'make') });
        if (m === target) {
          sfx('good'); res.classList.add('ok');
          setTimeout(() => (++r < g.targets.length ? draw() : win()), 1500);
        } else {
          sfx('bad'); shake(res);
          setTimeout(() => { picks = []; lock = false; msg.textContent = ''; show(); }, 1800);
        }
      } }, el('div', { html: potSvg(paints.colors[id].c) }), el('span', {}, tr(paints.colors[id].name)))));
      host.innerHTML = '';
      host.append(head(g.q), roundDots(r, g.targets.length) || '',
        el('div', { class: 'cours-mix-target' }, el('span', {}, tr(L.make)), el('span', { class: 'cours-swatch', style: { background: tc.c } }), el('b', {}, tr(tc.name))),
        el('div', { class: 'cours-mix-row' }, slots[0], el('b', {}, '+'), slots[1], el('b', {}, '='), res),
        msg, pots);
      speak({ text: `${tr(L.make)} ${tr(tc.name)}` });
    };
    draw();
  },

  // tap squares on the right half to mirror the left half
  symmetry(host, g, win) {
    let r = 0;
    const draw = () => {
      const P = g.puzzles[r], half = P.rows[0].length, cols = half * 2;
      const want = P.rows.map((s) => s.split('').reverse().map((x) => x === '1'));
      const on = P.rows.map(() => Array(half).fill(false));
      let lock = false;
      const cells = [];
      const grid = el('div', { class: 'cours-sym', style: { gridTemplateColumns: `repeat(${cols}, 1fr)` } });
      grid.style.setProperty('--sym', P.color);
      grid.style.setProperty('--ar', (cols / P.rows.length).toFixed(3));
      P.rows.forEach((s, y) => {
        for (let x = 0; x < cols; x++) {
          if (x < half) grid.append(el('div', { class: `sym-cell fixed ${s[x] === '1' ? 'on' : ''} ${x === half - 1 ? 'edge' : ''}` }));
          else {
            const j = x - half;
            const b = el('button', { class: `sym-cell ${j === 0 ? 'mid' : ''}`, onclick: () => {
              if (lock) return;
              sfx('place'); on[y][j] = !on[y][j]; b.classList.toggle('on', on[y][j]); b.classList.remove('err');
              if (on.every((row, yy) => row.every((v, jj) => v === want[yy][jj]))) { lock = true; sfx('good'); grid.classList.add('solved'); setTimeout(() => (++r < g.puzzles.length ? draw() : win()), 1100); }
            } });
            cells.push([b, y, j]); grid.append(b);
          }
        }
      });
      const check = el('button', { class: 'btn ghost cours-check', onclick: () => {
        let bad = 0;
        for (const [b, y, j] of cells) if (on[y][j] !== want[y][j]) { bad++; b.classList.add('err'); }
        if (bad) { sfx('bad'); setTimeout(() => cells.forEach(([b]) => b.classList.remove('err')), 1200); }
      } }, '🔍 ', tr(L.check));
      host.innerHTML = '';
      host.append(head(g.q), roundDots(r, g.puzzles.length) || '', grid, check);
      if (r === 0) say(g.q);
    };
    draw();
  },

  // continue a repeating pattern
  pattern(host, g, win) {
    let r = 0;
    const keys = Object.keys(g.tokens);
    const draw = () => {
      const R = g.rounds[r], total = R.shown + R.ask;
      const seq = Array.from({ length: total }, (_, i) => R.unit[i % R.unit.length]);
      let f = 0, lock = false;
      const slots = [];
      const row = el('div', { class: 'cours-pattern' }, seq.map((k, i) => {
        if (i < R.shown) return el('div', { class: 'pt-tok', html: g.tokens[k] });
        const s = el('div', { class: 'pt-tok slot' }, '?'); slots.push(s); return s;
      }));
      const used = [...new Set(R.unit.split(''))];
      const extra = keys.filter((k) => !used.includes(k));
      const choices = shuffle([...used, ...(extra.length ? [extra[Math.floor(Math.random() * extra.length)]] : [])]);
      const pick = el('div', { class: 'cours-pattern-pick' }, choices.map((k) => {
        const b = el('button', { class: 'pt-choice', html: g.tokens[k], onclick: () => {
          if (lock) return;
          if (k === seq[R.shown + f]) {
            sfx('good'); slots[f].innerHTML = g.tokens[k]; slots[f].classList.add('filled'); f++;
            if (f === R.ask) { lock = true; row.classList.add('solved'); setTimeout(() => (++r < g.rounds.length ? draw() : win()), 1000); }
          } else { sfx('bad'); shake(b); shake(slots[f]); }
        } });
        return b;
      }));
      host.innerHTML = '';
      host.append(head(g.q), roundDots(r, g.rounds.length) || '', row, pick);
      if (r === 0) say(g.q);
    };
    draw();
  },

  // tap all the targets in a picture
  spot(host, g, win) {
    let r = 0;
    const NS = 'http://www.w3.org/2000/svg';
    const draw = () => {
      const R = g.rounds[r];
      const found = new Set();
      let lock = false, lastBad = 0;
      const pic = el('div', { class: 'cours-spot', html: R.svg });
      const count = el('div', { class: 'cours-count' });
      const upd = () => { count.textContent = `🔎 ${found.size} / ${R.targets.length}`; };
      const svg = pic.querySelector('svg');
      const mk = (tag, attrs) => { const n = document.createElementNS(NS, tag); for (const [a, v] of Object.entries(attrs)) n.setAttribute(a, v); return n; };
      R.targets.forEach((t, i) => {
        const n = Array.isArray(t) ? mk('circle', { cx: t[0], cy: t[1], r: t[2] + 10 }) : mk('rect', { x: t.x, y: t.y, width: t.w, height: t.h });
        n.setAttribute('fill', 'transparent'); n.setAttribute('data-hit', i);
        svg.append(n);
      });
      svg.addEventListener('pointerdown', (e) => {
        if (lock) return;
        const h = e.target.closest?.('[data-hit]');
        const ctm = svg.getScreenCTM();
        const p = ctm ? new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse()) : { x: 0, y: 0 };
        if (h) {
          const i = +h.getAttribute('data-hit');
          if (found.has(i)) return;
          found.add(i); sfx('good');
          const t = R.targets[i];
          svg.append(Array.isArray(t) ? mk('circle', { cx: t[0], cy: t[1], r: t[2] + 4, fill: 'none', stroke: '#2fb36f', 'stroke-width': 7, class: 'spot-ok' })
            : mk('rect', { x: t.x, y: t.y, width: t.w, height: t.h, rx: 8, fill: 'none', stroke: '#2fb36f', 'stroke-width': 7, class: 'spot-ok' }));
          upd();
          if (found.size === R.targets.length) { lock = true; setTimeout(() => (++r < g.rounds.length ? draw() : win()), 1000); }
        } else if (Date.now() - lastBad > 400) {
          lastBad = Date.now(); sfx('bad');
          const x = mk('circle', { cx: p.x, cy: p.y, r: 14, fill: 'none', stroke: '#ef4b4b', 'stroke-width': 6, class: 'spot-miss' });
          svg.append(x); setTimeout(() => x.remove(), 700);
        }
      });
      upd();
      host.innerHTML = '';
      host.append(head(R.q), roundDots(r, g.rounds.length) || '', pic, count);
      say(R.q);
    };
    draw();
  },
};
