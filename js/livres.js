// « Mes livres » — illustrated French storybooks: read (or listen), tap any word to hear it, then words + quiz.
// Data: js/content/livres/<id>.js (schema in docs/LIVRES.md); BOOKS lists the files in shelf order.
import { el, makeRng } from './util.js';
import { store, save, today } from './store.js';
import { tr } from './i18n.js';
import { speak, stopSpeech, sfx, unlockAudio, setContentLang } from './audio.js';
import { runQuestion } from './widgets.js';
import { screen, backBtn, wallet, sheet } from './ui.js';
import { COIN, addCoins, bump, progress, checkBadges, showBadges, confetti, touchStreak, dressedOwl } from './game.js';

export const BOOKS = [
  'trois-petits-cochons', 'hibou-peur-du-noir', 'bruno-le-castor', 'la-tuque-magique', 'cabane-a-sucre',
  'jour-de-tempete', 'jardin-de-grand-papa', 'dragon-de-la-ruelle', 'voyage-de-perle', 'robot-de-la-bibliotheque',
];
const L = {
  shelf: { fr: 'Mes livres', en: 'My books' },
  read: { fr: 'Je lis', en: 'I read' },
  listen: { fr: 'J’écoute', en: 'Listen' },
  tapWord: { fr: 'Touche un mot pour l’entendre.', en: 'Tap a word to hear it.' },
  words: { fr: 'Les mots du livre', en: 'Words from the book' },
  quiz: { fr: 'As-tu bien compris?', en: 'Did you understand?' },
  end: { fr: 'Fin', en: 'The end' },
  bravo: { fr: 'Bravo, grand lecteur!', en: 'Well done, great reader!' },
  again: { fr: 'Relire', en: 'Read again' },
  other: { fr: 'Un autre livre', en: 'Another book' },
  lvl: [null, { fr: 'Début 2e année', en: 'Early grade 2' }, { fr: 'Fin 2e année', en: 'Late grade 2' }, { fr: '3e année', en: 'Grade 3' }],
};
const cache = {};
async function loadBook(id) { return (cache[id] ??= (await import(`./content/livres/${id}.js`)).book); }
async function loadAll() {
  const out = [];
  for (const id of BOOKS) { try { out.push(await loadBook(id)); } catch { /* not written yet */ } }
  return out;
}
const fr = (text) => ({ text, lang: 'fr-CA' });
// Each picture is an isolated <img>: books may use <style>/ids inside their SVG without leaking into each other.
const pic = (svg, cls) => {
  let v = String(svg || '');
  if (!/xmlns=/.test(v)) v = v.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  if (/xlink:href/.test(v) && !/xmlns:xlink/.test(v)) v = v.replace('<svg', '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  return el('div', { class: cls }, el('img', { src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(v), alt: '', draggable: 'false' }));
};

export async function libraryHome(back) {
  const books = await loadAll();
  const read = store.books || {};
  screen('livres-screen pink',
    el('header', { class: 'bar' }, backBtn(back), el('h1', {}, '📚 ', tr(L.shelf)), wallet()),
    el('div', { class: 'shelf' }, books.map((b) => el('button', { class: `book lv${b.level} ${read[b.id] ? 'done' : ''}`, onclick: () => { sfx('tap'); cover(b, back); } },
      pic(b.cover, 'book-cover'),
      el('div', { class: 'book-info' }, el('b', {}, b.emoji, ' ', b.title), el('small', {}, `${tr(L.lvl[b.level])} · ${b.pages.length} p. · ${b.minutes} min`)),
      read[b.id] ? el('span', { class: 'book-stars' }, '★'.repeat(read[b.id].stars || 0) + '☆'.repeat(3 - (read[b.id].stars || 0))) : null))),
  );
}

function cover(b, back) {
  unlockAudio(); setContentLang('fr-CA');
  screen('book-cover-screen pink',
    el('header', { class: 'bar' }, backBtn(() => libraryHome(back))),
    el('div', { class: 'cover-body' },
      pic(b.cover, 'cover-pic'),
      el('div', { class: 'cover-side' },
        el('h1', { class: 'cover-title' }, b.title),
        el('div', { class: 'art-meta' }, `${tr(L.lvl[b.level])} · ${b.pages.length} pages · ⏱️ ${b.minutes} min`),
        el('button', { class: 'btn primary big-go', onclick: () => { sfx('tap'); page(b, 0, back, false); } }, '📖 ', tr(L.read)),
        el('button', { class: 'btn big-go', onclick: () => { sfx('tap'); page(b, 0, back, true); } }, '🎧 ', tr(L.listen)))),
  );
  speak(fr(b.title));
}

// Words are tappable: each one speaks itself.
function tappable(text) {
  const box = el('div', { class: 'book-text' });
  for (const part of text.split(/(\s+)/)) {
    if (/^\s+$/.test(part) || !part) { box.append(part); continue; }
    const clean = part.replace(/^[«»—“”"'(¡¿.,!?;:…]+|[«»—“”"'),.!?;:…]+$/g, '');
    if (!clean) { box.append(part); continue; }
    const w = el('span', { class: 'w', onclick: (e) => { e.stopPropagation(); sfx('tap'); box.querySelectorAll('.w.on').forEach((n) => n.classList.remove('on')); w.classList.add('on'); speak(fr(clean)); } }, part);
    box.append(w);
  }
  return box;
}

let auto = null;
function page(b, i, back, listen) {
  clearTimeout(auto);
  const p = b.pages[i], last = i === b.pages.length - 1;
  const go = (k) => { stopSpeech(); clearTimeout(auto); sfx('tap'); k < b.pages.length ? page(b, k, back, listen) : endWords(b, back); };
  const bar = el('div', { class: 'book-progress' }, el('span', { style: { width: `${((i + 1) / b.pages.length) * 100}%` } }));
  const n = screen('book-page pink',
    el('header', { class: 'bar' }, el('button', { class: 'round back', onclick: () => { clearTimeout(auto); stopSpeech(); cover(b, back); } }, '✕'), bar, el('span', { class: 'bar-title' }, `${i + 1} / ${b.pages.length}`)),
    el('div', { class: 'book-body' },
      pic(p.svg, 'book-pic'),
      el('div', { class: 'book-side' },
        tappable(p.text),
        el('small', { class: 'hint' }, tr(L.tapWord)),
        el('div', { class: 'step-nav' },
          el('button', { class: 'btn ghost', disabled: i === 0, onclick: () => go(i - 1) }, '◀'),
          el('button', { class: 'say-btn', onclick: () => speak(fr(p.text)) }, '🔊'),
          el('button', { class: 'btn primary', onclick: () => go(i + 1) }, last ? `${tr(L.end)} ➜` : '▶')))),
  );
  // swipe to turn pages
  let x0 = null;
  n.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  n.addEventListener('pointerup', (e) => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 80) go(dx < 0 ? i + 1 : Math.max(0, i - 1)); });
  if (listen) speak(fr(p.text)).then(() => { if (document.body.contains(n)) auto = setTimeout(() => go(i + 1), 1200); });
  else if (i === 0) speak(fr(p.text));
}

function endWords(b, back) {
  screen('book-words pink',
    el('header', { class: 'bar' }, backBtn(() => page(b, b.pages.length - 1, back, false)), el('h1', {}, '📝 ', tr(L.words))),
    el('div', { class: 'word-cards' }, b.words.map((w) => el('button', { class: 'word-card', onclick: () => { sfx('tap'); speak(fr(`${w.word}. ${w.def}`)); } },
      el('span', { class: 'wc-e' }, w.emoji || '📘'), el('b', {}, w.word), el('small', {}, w.def)))),
    el('div', { class: 'res-btns' }, el('button', { class: 'btn primary big-go', onclick: () => { sfx('tap'); quiz(b, back); } }, '❓ ', tr(L.quiz), ' ➜')),
  );
}

async function quiz(b, back) {
  const R = makeRng();
  const qRoot = el('div', { class: 'q' });
  const bubble = el('div', { class: 'owl-bubble' });
  let quit = false;
  screen('session pink',
    el('header', { class: 'bar' }, el('button', { class: 'round back', onclick: () => { quit = true; libraryHome(back); } }, '✕'), el('h1', {}, b.emoji, ' ', tr(L.quiz))),
    qRoot, el('div', { class: 'owl-corner' }, bubble, dressedOwl('mini')));
  let score = 0;
  for (const [k, x] of b.quiz.entries()) {
    if (quit) return;
    const q = { type: 'choice', key: `${b.id}#${k}`, prompt: x.q, say: fr(x.q), options: x.options.map((o) => ({ text: o })), answer: x.answer, cols: 1 };
    score += await runQuestion(q, qRoot, R, {
      praise: () => { const w = R.pick(['Bravo!', 'Super!', 'Exactement!']); bubble.textContent = w; bubble.className = 'owl-bubble show good'; speak(fr(w)); },
      retry: () => { bubble.textContent = 'Essaie encore!'; bubble.className = 'owl-bubble show bad'; },
      reveal: () => { bubble.textContent = 'La bonne réponse :'; bubble.className = 'owl-bubble show bad'; },
      waitNext: (cb) => setTimeout(cb, 1600),
    });
  }
  if (quit) return;
  const pct = score / b.quiz.length;
  const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.4 ? 1 : 0;
  const prev = store.books?.[b.id];
  store.books = { ...(store.books || {}), [b.id]: { date: today(), stars: Math.max(stars, prev?.stars || 0) } };
  const coins = (prev ? 3 : 15 + b.level * 5) + stars * 2;
  addCoins(coins); touchStreak(); bump('books'); bump('games'); progress('francais'); progress('stars', stars); progress('correct', Math.floor(score));
  const fresh = checkBadges(); save();
  confetti(60); sfx('win');
  const sh = sheet(el('div', { class: 'memory-done' }, dressedOwl('big hop-loop'), el('h2', {}, tr(L.bravo)),
    el('div', { class: 'res-score' }, `${b.emoji} ${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}`), el('div', { class: 'res-coins' }, `+${coins} ${COIN}`),
    el('div', { class: 'res-btns' },
      el('button', { class: 'btn ghost', onclick: () => { sh.close(); cover(b, back); } }, '↻ ', tr(L.again)),
      el('button', { class: 'btn primary', onclick: () => { sh.close(); libraryHome(back); } }, tr(L.other), ' ➜'))));
  speak(fr(tr(L.bravo)));
  showBadges(fresh);
}
