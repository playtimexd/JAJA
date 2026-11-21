// « Mes livres » — illustrated French storybooks: read (or listen), tap any word to hear it, then words + quiz.
// Data: js/content/livres/<id>.js (schema in docs/LIVRES.md); BOOKS lists the files in shelf order.
import { el, makeRng } from './util.js';
import { store, save, today } from './store.js';
import { tr, setZone, zh } from './i18n.js';
import { speak, stopSpeech, sfx, unlockAudio, setContentLang } from './audio.js';
import { runQuestion, hanzi, setText } from './widgets.js';
import { screen, backBtn, wallet, sheet } from './ui.js';
import { COIN, addCoins, bump, progress, checkBadges, showBadges, confetti, touchStreak, dressedOwl } from './game.js';

export const BOOKS = [
  'trois-petits-cochons', 'hibou-peur-du-noir', 'bruno-le-castor', 'la-tuque-magique', 'cabane-a-sucre',
  'jour-de-tempete', 'jardin-de-grand-papa', 'dragon-de-la-ruelle', 'voyage-de-perle', 'robot-de-la-bibliotheque',
];
const L = {
  shelf: { fr: 'Mes livres', en: 'My books', zh: zh('我的书', 'wǒ de shū') },
  cont: { fr: 'Continuer', en: 'Continue', zh: zh('继续读', 'jì xù dú') },
  read: { fr: 'Je lis', en: 'I read', zh: zh('我自己读', 'wǒ zì jǐ dú') },
  listen: { fr: 'J’écoute', en: 'Listen', zh: zh('听故事', 'tīng gù shì') },
  tapWord: { fr: 'Touche un mot pour l’entendre.', en: 'Tap a word to hear it.', zh: zh('点一个词，听一听。', 'diǎn yí gè cí tīng yì tīng') },
  words: { fr: 'Les mots du livre', en: 'Words from the book', zh: zh('书里的词语', 'shū lǐ de cí yǔ') },
  quiz: { fr: 'As-tu bien compris?', en: 'Did you understand?', zh: zh('你读懂了吗？', 'nǐ dú dǒng le ma') },
  end: { fr: 'Fin', en: 'The end', zh: zh('完', 'wán') },
  bravo: { fr: 'Bravo, grand lecteur!', en: 'Well done, great reader!', zh: zh('真棒，你是小读者！', 'zhēn bàng nǐ shì xiǎo dú zhě') },
  again: { fr: 'Relire', en: 'Read again', zh: zh('再读一遍', 'zài dú yí biàn') },
  other: { fr: 'Un autre livre', en: 'Another book', zh: zh('换一本书', 'huàn yì běn shū') },
  lvl: [null, { fr: 'Début 2e année', en: 'Early grade 2', zh: zh('二年级上', 'èr nián jí shàng') }, { fr: 'Fin 2e année', en: 'Late grade 2', zh: zh('二年级下', 'èr nián jí xià') }, { fr: '3e année', en: 'Grade 3', zh: zh('三年级', 'sān nián jí') }],
  p: { fr: ' p.', en: ' p.', zh: zh('页', 'yè') },
  pages: { fr: ' pages', en: ' pages', zh: zh('页', 'yè') },
  min: { fr: ' min', en: ' min', zh: zh('分钟', 'fēn zhōng') },
};
// One shelf per language. English / Chinese shelves list their books in js/content/livres-en|livres-zh/index.js (BOOKS).
// Book ids are unique across shelves (en-…, zh-…); a Chinese page carries `tokens: [{hz, py}]` for pinyin over each word.
export const SHELVES = {
  fr: { dir: 'livres', speech: 'fr-CA', title: { fr: 'Mes livres', en: 'My books' }, praise: ['Bravo!', 'Super!', 'Exactement!'], retry: 'Essaie encore!', reveal: 'La bonne réponse :', bravo: 'Bravo, grand lecteur!' },
  en: { dir: 'livres-en', speech: 'en-CA', title: { fr: 'Livres en anglais', en: 'English books' }, praise: ['Great job!', 'Super!', 'Exactly!'], retry: 'Try again!', reveal: 'The right answer:', bravo: 'Well done, great reader!' },
  zh: { dir: 'livres-zh', speech: 'zh-CN', title: { fr: 'Livres en chinois 中文故事', en: 'Chinese books 中文故事', zh: zh('中文故事书', 'zhōng wén gù shì shū') }, praise: [zh('太棒了！', 'tài bàng le'), zh('真棒！', 'zhēn bàng'), zh('对了！', 'duì le')], retry: zh('再试一次！', 'zài shì yí cì'), reveal: zh('正确答案：', 'zhèng què dá àn'), bravo: zh('你真是个小读者！', 'nǐ zhēn shì gè xiǎo dú zhě') },
};
const cache = {};
const shelfOf = (id) => (id.startsWith('en-') ? 'en' : id.startsWith('zh-') ? 'zh' : 'fr');
async function loadBook(id) {
  if (cache[id]) return cache[id];
  const b = (await import(`./content/${SHELVES[shelfOf(id)].dir}/${id}.js`)).book;
  b.shelf = shelfOf(id);
  return (cache[id] = b);
}
async function listOf(lang) {
  if (lang === 'fr') return BOOKS;
  try { return (await import(`./content/${SHELVES[lang].dir}/index.js`)).BOOKS; } catch { return []; }
}
export async function shelfCount(lang) { return (await listOf(lang)).length; }
async function loadAll(lang) {
  const out = [];
  for (const id of await listOf(lang)) { try { out.push(await loadBook(id)); } catch { /* not written yet */ } }
  return out;
}
const conf = (b) => SHELVES[b?.shelf || 'fr'];
// English shelf = « English zone », Chinese shelf = « Chinese zone » (js/i18n.js): the whole chrome reads and speaks that language.
const zone = (shelf) => setZone(shelf === 'en' || shelf === 'zh' ? shelf : null);
const sayB = (b, text) => ({ text: text && typeof text === 'object' ? (text.hz ?? tr(text)) : text, lang: conf(b).speech });
const label = (x) => (x && typeof x === 'object' && x.hz ? hanzi(x.hz, x.py) : x);
// Each picture is an isolated <img>: books may use <style>/ids inside their SVG without leaking into each other.
const pic = (svg, cls) => {
  let v = String(svg || '');
  // Re-serialise through the lenient HTML parser: fixes small XML mistakes (e.g. a repeated attribute) that would break an <img>.
  try {
    const node = new DOMParser().parseFromString(`<body>${v}</body>`, 'text/html').querySelector('svg');
    if (node) { node.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); v = new XMLSerializer().serializeToString(node); }
  } catch { /* keep the original */ }
  if (!/xmlns=/.test(v)) v = v.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  if (/xlink:href/.test(v) && !/xmlns:xlink/.test(v)) v = v.replace('<svg', '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
  return el('div', { class: cls }, el('img', { src: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(v), alt: '', draggable: 'false' }));
};

export async function openBook(id, back, i = 0) { const b = await loadBook(id); page(b, Math.min(i, b.pages.length - 1), back, false); }

export async function libraryHome(back, lang = 'fr') {
  zone(lang);
  const books = await loadAll(lang);
  const read = store.books || {};
  screen('livres-screen pink',
    el('header', { class: 'bar' }, backBtn(back), el('h1', {}, '📚 ', tr(SHELVES[lang].title)), wallet()),
    el('div', { class: 'shelf' }, books.map((b) => el('button', { class: `book lv${b.level} ${read[b.id] ? 'done' : ''}`, onclick: () => { sfx('tap'); cover(b, back); } },
      pic(b.cover, 'book-cover'),
      el('div', { class: 'book-info' }, el('b', {}, b.emoji, ' ', label(b.titleZh || b.title)), el('small', {}, tr(L.lvl[b.level]), ` · ${b.pages.length}`, tr(L.p), ` · ${b.minutes}`, tr(L.min))),
      read[b.id] ? el('span', { class: 'book-stars' }, '★'.repeat(read[b.id].stars || 0) + '☆'.repeat(3 - (read[b.id].stars || 0))) : null))),
  );
}

function cover(b, back) {
  zone(b.shelf);
  unlockAudio(); setContentLang(conf(b).speech);
  screen('book-cover-screen pink',
    el('header', { class: 'bar' }, backBtn(() => libraryHome(back, b.shelf))),
    el('div', { class: 'cover-body' },
      pic(b.cover, 'cover-pic'),
      el('div', { class: 'cover-side' },
        el('h1', { class: 'cover-title' }, label(b.titleZh || b.title)),
        el('div', { class: 'art-meta' }, tr(L.lvl[b.level]), ` · ${b.pages.length}`, tr(L.pages), ` · ⏱️ ${b.minutes}`, tr(L.min)),
        (store.bookPos?.[b.id] > 0 && store.bookPos[b.id] < b.pages.length - 1) ? el('button', { class: 'btn primary big-go', onclick: () => { sfx('tap'); page(b, store.bookPos[b.id], back, false); } }, '▶ ', tr(L.cont), b.shelf === 'zh' ? ` (${store.bookPos[b.id] + 1}` : ` (p. ${store.bookPos[b.id] + 1}`, b.shelf === 'zh' ? tr(L.p) : '', ')') : null,
        el('button', { class: 'btn primary big-go', onclick: () => { sfx('tap'); page(b, 0, back, false); } }, '📖 ', tr(L.read)),
        el('button', { class: 'btn big-go', onclick: () => { sfx('tap'); page(b, 0, back, true); } }, '🎧 ', tr(L.listen)))),
  );
  speak(sayB(b, b.titleZh || b.title));
}

// Words are tappable: each one speaks itself.
function tappable(text, b, p) {
  if (p?.tokens) {               // Chinese: one tappable word per token, pinyin on top
    const box = el('div', { class: `book-text zh ${text.length > 80 ? 'l' : ''}` });
    for (const t of p.tokens) {
      if (!t.py) { box.append(t.hz); continue; }
      const w = el('span', { class: 'w', onclick: (e) => { e.stopPropagation(); sfx('tap'); box.querySelectorAll('.w.on').forEach((n) => n.classList.remove('on')); w.classList.add('on'); speak(sayB(b, t.hz)); } }, hanzi(t.hz, t.py));
      box.append(w);
    }
    return box;
  }
  const n = text.split(/\s+/).length;
  const box = el('div', { class: `book-text ${n > 70 ? 'xl' : n > 40 ? 'l' : ''}` });
  for (const part of text.split(/(\s+)/)) {
    if (/^\s+$/.test(part) || !part) { box.append(part); continue; }
    const clean = part.replace(/^[«»—“”"'(¡¿.,!?;:…]+|[«»—“”"'),.!?;:…]+$/g, '');
    if (!clean) { box.append(part); continue; }
    const w = el('span', { class: 'w', onclick: (e) => { e.stopPropagation(); sfx('tap'); box.querySelectorAll('.w.on').forEach((n) => n.classList.remove('on')); w.classList.add('on'); speak(sayB(b, clean)); } }, part);
    box.append(w);
  }
  return box;
}

let auto = null;
function page(b, i, back, listen) {
  zone(b.shelf);
  clearTimeout(auto);
  store.bookPos = { ...(store.bookPos || {}), [b.id]: i };
  store.resume = { t: 'book', id: b.id, i, label: b.title, icon: b.emoji };
  save();
  const p = b.pages[i], last = i === b.pages.length - 1;
  const go = (k) => { stopSpeech(); clearTimeout(auto); sfx('tap'); k < b.pages.length ? page(b, k, back, listen) : endWords(b, back); };
  const bar = el('div', { class: 'book-progress' }, el('span', { style: { width: `${((i + 1) / b.pages.length) * 100}%` } }));
  const n = screen('book-page pink',
    el('header', { class: 'bar' }, el('button', { class: 'round back', onclick: () => { clearTimeout(auto); stopSpeech(); cover(b, back); } }, '✕'), bar, el('span', { class: 'bar-title' }, `${i + 1} / ${b.pages.length}`)),
    el('div', { class: 'book-body' },
      pic(p.svg, 'book-pic'),
      el('div', { class: 'book-side' },
        tappable(p.text, b, p),
        el('small', { class: 'hint' }, tr(L.tapWord)),
        el('div', { class: 'step-nav' },
          el('button', { class: 'btn ghost', disabled: i === 0, onclick: () => go(i - 1) }, '◀'),
          el('button', { class: 'say-btn', onclick: () => speak(sayB(b, p.text)) }, '🔊'),
          el('button', { class: 'btn primary', onclick: () => go(i + 1) }, last ? [tr(L.end), ' ➜'] : '▶')))),
  );
  // swipe to turn pages
  let x0 = null;
  n.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  n.addEventListener('pointerup', (e) => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 80) go(dx < 0 ? i + 1 : Math.max(0, i - 1)); });
  if (listen) speak(sayB(b, p.text)).then(() => { if (document.body.contains(n)) auto = setTimeout(() => go(i + 1), 1200); });
  else if (i === 0) speak(sayB(b, p.text));
}

function endWords(b, back) {
  zone(b.shelf);
  screen('book-words pink',
    el('header', { class: 'bar' }, backBtn(() => page(b, b.pages.length - 1, back, false)), el('h1', {}, '📝 ', tr(L.words))),
    el('div', { class: 'word-cards' }, b.words.map((w) => el('button', { class: 'word-card', onclick: () => { sfx('tap'); speak(sayB(b, `${w.word}${b.shelf === 'zh' ? '。' : '. '}${w.def}`)); } },
      el('span', { class: 'wc-e' }, w.emoji || '📘'), el('b', {}, w.py ? hanzi(w.word, w.py) : w.word), el('small', {}, w.defPy ? hanzi(w.def, w.defPy) : w.def)))),
    el('div', { class: 'res-btns' }, el('button', { class: 'btn primary big-go', onclick: () => { sfx('tap'); quiz(b, back); } }, '❓ ', tr(L.quiz), ' ➜')),
  );
}

async function quiz(b, back) {
  zone(b.shelf);
  const R = makeRng();
  const qRoot = el('div', { class: 'q' });
  const bubble = el('div', { class: 'owl-bubble' });
  let quit = false;
  screen('session pink',
    el('header', { class: 'bar' }, el('button', { class: 'round back', onclick: () => { quit = true; libraryHome(back, b.shelf); } }, '✕'), el('h1', {}, b.emoji, ' ', tr(L.quiz))),
    qRoot, el('div', { class: 'owl-corner' }, bubble, dressedOwl('mini')));
  let score = 0;
  for (const [k, x] of b.quiz.entries()) {
    if (quit) return;
    const q = { type: 'choice', key: `${b.id}#${k}`, prompt: x.q, say: sayB(b, x.q), options: x.options.map((o) => (o && typeof o === 'object' && o.hz ? { hz: o.hz, py: o.py } : { text: o })), answer: x.answer, cols: 1 };
    score += await runQuestion(q, qRoot, R, {
      praise: () => { const w = R.pick(conf(b).praise); setText(bubble, w); bubble.className = 'owl-bubble show good'; speak(sayB(b, w)); },
      retry: () => { setText(bubble, conf(b).retry); bubble.className = 'owl-bubble show bad'; },
      reveal: () => { setText(bubble, conf(b).reveal); bubble.className = 'owl-bubble show bad'; },
      waitNext: (cb) => setTimeout(cb, 1600),
    });
  }
  if (quit) return;
  const pct = score / b.quiz.length;
  const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.4 ? 1 : 0;
  const prev = store.books?.[b.id];
  store.books = { ...(store.books || {}), [b.id]: { date: today(), stars: Math.max(stars, prev?.stars || 0) } };
  const coins = (prev ? 3 : 15 + b.level * 5) + stars * 2;
  window.__planDone?.('BOOK');
  addCoins(coins); touchStreak(); bump('books'); bump('games'); progress({ fr: 'francais', en: 'anglais', zh: 'chinois' }[b.shelf] || 'francais'); progress('stars', stars); progress('correct', Math.floor(score));
  const fresh = checkBadges(); save();
  confetti(60); sfx('win');
  const sh = sheet(el('div', { class: 'memory-done' }, dressedOwl('big hop-loop'), el('h2', {}, tr(L.bravo)),
    el('div', { class: 'res-score' }, `${b.emoji} ${'★'.repeat(stars)}${'☆'.repeat(3 - stars)}`), el('div', { class: 'res-coins' }, `+${coins} ${COIN}`),
    el('div', { class: 'res-btns' },
      el('button', { class: 'btn ghost', onclick: () => { sh.close(); cover(b, back); } }, '↻ ', tr(L.again)),
      el('button', { class: 'btn primary', onclick: () => { sh.close(); libraryHome(back, b.shelf); } }, tr(L.other), ' ➜'))));
  speak(sayB(b, conf(b).bravo));
  showBadges(fresh);
}
