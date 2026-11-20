// « Pourquoi? 十万个为什么 » — a children's science encyclopedia in French, English and Chinese (pinyin),
// read aloud sentence by sentence (tap any word to hear it), then a quiz.
// Data: js/content/why/<cat>.js (+ <cat>-pics.js, groups.js). Schema: docs/WHY.md. Spoken texts: js/why-text.js.
import { el, makeRng, wait } from './util.js';
import { store, save, today } from './store.js';
import { speak, stopSpeech, sfx, unlockAudio, setContentLang } from './audio.js';
import { runQuestion, hanzi } from './widgets.js';
import { screen, backBtn, wallet, sheet } from './ui.js';
import { COIN, addCoins, bump, progress, checkBadges, showBadges, confetti, touchStreak, dressedOwl } from './game.js';
import { CATS, MOVED } from './content/why/groups.js';
import { LANGS, SPEECH, KIND, PRAISE, DONE, txt, sentences, slideReading, quizSay } from './why-text.js';

const L = {
  title: { fr: 'Pourquoi?', en: 'Why?', zh: '十万个为什么' },
  search: { fr: 'Chercher… (ex. volcan, castor)', en: 'Search… (e.g. volcano, beaver)', zh: '搜索……（比如：火山）' },
  none: { fr: 'Rien trouvé. Essaie un autre mot!', en: 'Nothing found. Try another word!', zh: '没有找到，换个词试试！' },
  quizMix: { fr: 'Défi science', en: 'Science challenge', zh: '科学大挑战' },
  quizSub: { fr: '⚡ éclair · 🎈 ballons', en: '⚡ lightning · 🎈 balloons', zh: '⚡ 限时 · 🎈 气球' },
  read: { fr: 'lus', en: 'read', zh: '已读' },
  quiz: { fr: 'Petit quiz', en: 'Quiz', zh: '小测验' },
  all: { fr: 'Écouter tout', en: 'Listen to all', zh: '听全部' },
  tri: { fr: 'Les trois langues', en: 'All three languages', zh: '三种语言' },
  tap: { fr: 'Touche un mot pour l’entendre.', en: 'Tap a word to hear it.', zh: '点一个词，听一听。' },
  more: { fr: 'Un autre', en: 'Another one', zh: '再看一个' },
  again: { fr: 'Revoir', en: 'Again', zh: '再看一遍' },
  retry: { fr: 'Essaie encore!', en: 'Try again!', zh: '再想想！' },
  reveal: { fr: 'La bonne réponse :', en: 'The right answer:', zh: '正确答案是：' },
  lightning: { fr: 'Défi éclair', en: 'Lightning', zh: '闪电挑战' },
  balloons: { fr: 'Ballons', en: 'Balloons', zh: '打气球' },
};
const KIND_ICON = { fact: '💡', try: '🧪', words: '📖' };
const LANG_BTN = { fr: 'FR', en: 'EN', zh: '中文' };

// ---------- language: FR / EN / 中文, follows the app language when that changes ----------
function wl() {
  const s = store.settings, app = s.lang === 'en' ? 'en' : 'fr';
  if (!s.whyLangUi) s.whyLangUi = app;                       // older saves / Chinese plan: remember the current app language
  if (s.whyLangUi !== app) { s.whyLang = app; s.whyLangUi = app; save(); }   // the app language changed → follow it
  return LANGS.includes(s.whyLang) ? s.whyLang : app;
}
function setLang(l) { store.settings.whyLang = l; store.settings.whyLangUi = store.settings.lang === 'en' ? 'en' : 'fr'; save(); }
const T = (x, l = wl()) => x?.[l] ?? x?.fr ?? '';
// label of a {fr,en,zh:{hz,py}} item: Chinese gets pinyin
const label = (x, l = wl(), cls = '') => (l === 'zh' ? hanzi(x.zh.hz, x.zh.py, cls) : el('span', { class: cls }, x[l]));
const langSwitch = (onPick) => el('div', { class: 'why-lang', role: 'group' }, LANGS.map((k) =>
  el('button', { class: wl() === k ? 'on' : '', lang: k, onclick: () => { if (wl() === k) return; sfx('tap'); setLang(k); onPick(k); } }, LANG_BTN[k])));

// ---------- data ----------
let all = null;
const pics = {};
async function load() {
  if (all) return all;
  all = [];
  for (const c of CATS) {
    try { all.push(...(await import(`./content/why/${c.id}.js`)).topics); } catch (e) { console.warn('why missing', c.id, e.message); }
  }
  // topics that moved to another domain keep their progress
  for (const box of ['why', 'whyRead']) {
    const o = store[box];
    if (!o) continue;
    for (const [a, b] of Object.entries(MOVED)) if (o[a]) { o[b] ??= o[a]; delete o[a]; }
  }
  return all;
}
const loadPics = (cat) => (pics[cat] ??= import(`./content/why/${cat}-pics.js`).then((m) => m.PICS).catch(() => ({})));
const view = { cat: 'animaux', q: '' };
let mode = null;      // null · 'all' (read the whole topic) · 'tri' (each slide fr → en → zh)
let run = 0;          // reading generation: bumping it cancels the reading in progress
const isRead = (id) => !!store.whyRead?.[id];
const isDone = (id) => !!store.why?.[id];

export async function openWhy(id, home, playFn, i = 0) {
  const list = await load();
  const t = list.find((x) => x.id === (MOVED[id] || id));
  if (t) topic(t, Math.min(i, t.slides.length - 1), home, playFn); else whyHome(home, playFn);
}

// ---------- home: domains, shelves, search, progress ----------
const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const hay = new WeakMap();
function haystack(t) {
  if (!hay.has(t)) {
    const parts = [t.q.fr, t.q.en, t.q.zh.hz, t.q.zh.py];
    for (const s of t.slides) {
      if (s.words) for (const w of s.words) parts.push(w.fr.t, w.en.t, w.zh.t.hz, w.zh.t.py);
      else parts.push(s.fr, s.en, s.zh.hz);
    }
    hay.set(t, fold(parts.join(' ')));
  }
  return hay.get(t);
}

export async function whyHome(home, playFn) {
  mode = null; run++;
  const list = await load();
  const l = wl();
  const card = (t) => el('button', { class: `why-card lv${t.level} ${isRead(t.id) ? 'read' : ''} ${isDone(t.id) ? 'done' : ''}`, onclick: () => { sfx('tap'); topic(t, 0, home, playFn); } },
    el('span', { class: 'why-emoji' }, t.emoji),
    el('span', { class: 'why-q', lang: l }, label(t.q, l)),
    el('span', { class: 'why-ok' }, isDone(t.id) ? '⭐' : isRead(t.id) ? '✔' : ''));
  const shelves = (cat) => {
    const c = CATS.find((x) => x.id === cat);
    const items = list.filter((t) => t.cat === cat);
    return el('div', { class: 'why-groups' }, c.shelves.map((s) => {
      const ts = items.filter((t) => t.shelf === s.id).sort((a, b) => a.level - b.level);
      if (!ts.length) return null;
      const got = ts.filter((t) => isRead(t.id)).length;
      return el('section', { class: 'why-group' },
        el('h2', {}, el('span', { class: 'wg-i' }, s.icon), label(s.t, l), el('small', {}, `✔ ${got} / ${ts.length}`)),
        el('div', { class: 'why-grid' }, ts.map(card)));
    }));
  };
  const results = el('div', { class: 'why-results' });
  const draw = () => {
    results.replaceChildren();
    const q = fold(view.q.trim());
    if (!q) { results.append(shelves(view.cat)); return; }
    const words = q.split(/\s+/);
    const hits = list.filter((t) => words.every((w) => haystack(t).includes(w)));
    results.append(hits.length ? el('div', { class: 'why-grid' }, hits.map(card)) : el('p', { class: 'why-none' }, T(L.none, l)));
  };
  const search = el('input', { class: 'why-search', type: 'search', value: view.q, placeholder: T(L.search, l), enterkeyhint: 'search', autocomplete: 'off',
    oninput: (e) => { view.q = e.target.value; tabs.classList.toggle('dim', !!view.q.trim()); draw(); } });
  const tabs = el('div', { class: `why-tabs ${view.q.trim() ? 'dim' : ''}` }, CATS.map((c) => {
    const ts = list.filter((t) => t.cat === c.id);
    return el('button', { class: `why-tab ${view.cat === c.id ? 'on' : ''}`, onclick: () => { sfx('tap'); view.cat = c.id; view.q = ''; whyHome(home, playFn); } },
      el('span', { class: 'ti' }, c.icon), el('span', { class: 'tn', lang: l }, label(c.t, l)),
      el('small', {}, `${ts.filter((t) => isRead(t.id)).length}/${ts.length}`));
  }));
  const nRead = list.filter((t) => isRead(t.id)).length;
  screen('why-screen blue',
    el('header', { class: 'bar' }, backBtn(home), el('h1', {}, '🔭 ', T(L.title, l)), langSwitch(() => whyHome(home, playFn)), wallet()),
    el('div', { class: 'why-top' },
      el('div', { class: 'why-searchbox' }, el('span', {}, '🔎'), search),
      el('div', { class: 'why-progress', title: `${nRead} / ${list.length}` },
        el('span', { class: 'why-bar' }, el('i', { style: { width: `${(nRead / Math.max(1, list.length)) * 100}%` } })),
        el('small', {}, `📖 ${nRead} / ${list.length} ${T(L.read, l)} · ⭐ ${list.filter((t) => isDone(t.id)).length}`)),
      el('button', { class: 'why-quiz', onclick: () => { sfx('tap'); quizHub(home, playFn); } }, el('b', {}, '🏆 ', T(L.quizMix, l)), el('small', {}, T(L.quizSub, l)))),
    tabs, results);
  draw();
}

// ---------- reading a slide ----------
// Text with tappable words, grouped in sentence spans (highlighted while read). Returns the spans in reading order.
function sentenceSpans(text, l, onWord) {
  const out = [];
  if (l === 'zh') {
    const { hz, py, w } = text;
    const syl = py.trim().split(/\s+/).filter(Boolean);
    const isHan = (c) => /\p{Script=Han}/u.test(c);
    const chars = [...hz];
    // tokens with offsets (code points) and their pinyin
    let at = 0, k = 0;
    const toks = (w || [chars.length]).map((n) => {
      const s = chars.slice(at, at + n).join('');
      const nh = [...s].filter(isHan).length;
      const tok = { s, at, py: syl.slice(k, k + nh).join(' ') };
      at += n; k += nh;
      return tok;
    });
    let from = 0;
    for (const sen of sentences(hz, 'zh')) {
      const start = [...hz.slice(0, hz.indexOf(sen, from))].length; from = hz.indexOf(sen, from) + sen.length;
      const end = start + [...sen].length;
      const span = el('span', { class: 'sen', lang: 'zh' });
      let last = null;
      for (const tok of toks) {
        if (tok.at < start || tok.at >= end) continue;
        if (/[\p{Script=Han}0-9]/u.test(tok.s)) {
          const wd = el('span', { class: 'w', onclick: (e) => { e.stopPropagation(); onWord(wd, tok.s); } }, tok.py ? hanzi(tok.s, tok.py) : el('span', { class: 'num' }, tok.s));
          span.append(wd); last = wd;
        } else if (last && /^[，。、？！：；”’」』）…]+$/u.test(tok.s)) last.append(el('span', { class: 'p' }, tok.s));   // punctuation stays with its word
        else { span.append(el('span', { class: 'p' }, tok.s)); last = null; }
      }
      out.push({ node: span, text: sen });
    }
    return out;
  }
  for (const sen of sentences(text, l)) {
    const span = el('span', { class: 'sen', lang: l });
    for (const part of sen.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) { span.append(' '); continue; }
      const clean = part.replace(/^[«»—“”"'(¡¿.,!?;:…]+|[«»—“”"'),.!?;:…]+$/g, '');
      if (!clean) { span.append(part); continue; }
      const wd = el('span', { class: 'w', onclick: (e) => { e.stopPropagation(); onWord(wd, clean); } }, part);
      span.append(wd);
    }
    out.push({ node: span, text: sen });
  }
  return out;
}

// Builds the text panel of slide i in language l: { node, units } with units aligned to slideReading().
function slideText(t, i, l, titleNode, onWord) {
  const s = t.slides[i], units = [];
  const box = el('div', { class: `why-read kind-${s.kind}`, lang: l });
  if (i === 0) units.push({ node: titleNode, text: txt(t.q, l) });
  if (KIND[s.kind]) {
    const h = el('div', { class: 'why-kind' }, `${KIND_ICON[s.kind]} `, el('span', { class: 'sen' }, KIND[s.kind][l]));
    box.append(h); units.push({ node: h.lastChild, text: KIND[s.kind][l] });
  }
  if (s.kind === 'words') {
    const list = el('div', { class: 'why-words' });
    for (const w of s.words) {
      const term = el('span', { class: 'sen term' }, el('span', { class: 'w', onclick: (e) => { e.stopPropagation(); onWord(e.currentTarget, l === 'zh' ? w.zh.t.hz : w[l].t); } },
        l === 'zh' ? hanzi(w.zh.t.hz, w.zh.t.py) : w[l].t));
      const def = sentenceSpans(l === 'zh' ? w.zh.d : w[l].d, l, onWord);
      list.append(el('div', { class: 'why-word' }, term, el('div', { class: 'def' }, def.flatMap((d) => [d.node, ' ']))));
      units.push({ node: term, text: l === 'zh' ? w.zh.t.hz : w[l].t }, ...def);
    }
    box.append(list);
  } else {
    const sens = sentenceSpans(l === 'zh' ? s.zh : s[l], l, onWord);
    box.append(el('p', { class: 'why-para' }, sens.flatMap((x) => [x.node, l === 'zh' ? '' : ' '])));
    units.push(...sens);
  }
  // sanity: the units must be exactly what why-text.js says is read (voice clips are keyed on it)
  const plan = slideReading(t, i, l);
  if (plan.length !== units.length || plan.some((p, k) => p.text !== units[k].text)) console.warn('why: reading plan mismatch', t.id, i, l);
  return { node: box, units };
}

async function sayUnit(u, l, my) {
  if (my !== run) return false;
  u.node?.classList.add('reading');
  u.node?.scrollIntoView?.({ block: 'nearest', behavior: 'smooth' });
  if (store.settings.voice) await speak({ text: u.text, lang: SPEECH[l] });
  else await wait(Math.max(1400, [...u.text].length * (l === 'zh' ? 260 : 75)));
  u.node?.classList.remove('reading');
  return my === run;
}

async function topic(t, i, home, playFn) {
  run++;
  unlockAudio();
  const l = wl();
  const P = await loadPics(t.cat);
  store.resume = { t: 'why', id: t.id, i, label: txt(t.q, l), icon: t.emoji };
  const s = t.slides[i], last = i === t.slides.length - 1;
  if (last && !isRead(t.id)) store.whyRead = { ...(store.whyRead || {}), [t.id]: today() };
  save();
  setContentLang(SPEECH[l]);
  const go = (k) => { sfx('tap'); topic(t, k, home, playFn); };
  const stop = () => { mode = null; run++; stopSpeech(); document.querySelectorAll('.why-read .reading, .why-title .reading').forEach((n) => n.classList.remove('reading')); syncBtns(); };
  const onWord = (node, word) => {
    stop(); sfx('tap');
    document.querySelectorAll('.why-read .w.on').forEach((n) => n.classList.remove('on'));
    node.classList.add('on');
    speak({ text: word, lang: SPEECH[shown] });
  };
  // title + text are re-rendered in place when the shown language changes (« 🔁 Les trois langues »)
  const title = el('h1', { class: 'why-title' });
  const textBox = el('div', { class: 'why-textbox' });
  const hint = el('small', { class: 'hint' });
  let shown = l, units = [];
  const show = (lang) => {
    shown = lang;
    const q = el('span', { class: 'sen', lang }, label(t.q, lang));
    title.replaceChildren(t.emoji, ' ', q);
    const r = slideText(t, i, lang, q, onWord);
    textBox.replaceChildren(r.node);
    units = r.units;
    hint.textContent = `👆 ${T(L.tap, lang)}`;
    setContentLang(SPEECH[lang]);
  };
  const btnAll = el('button', { class: 'why-mode', onclick: () => toggle('all') }, '🎧 ', T(L.all, l));
  const btnTri = el('button', { class: 'why-mode', onclick: () => toggle('tri') }, '🔁 ', T(L.tri, l));
  const quizBtn = el('button', { class: 'btn primary why-go', onclick: () => { stop(); sfx('tap'); quiz(t, home, playFn); } }, '❓ ', T(L.quiz, l));
  function syncBtns() { btnAll.classList.toggle('on', mode === 'all'); btnTri.classList.toggle('on', mode === 'tri'); }
  function toggle(m) { sfx('tap'); if (mode === m) { stop(); return; } mode = m; syncBtns(); readSlide(); }
  async function readSlide() {
    const my = ++run;
    stopSpeech();
    const langs = mode === 'tri' ? LANGS : [l];
    for (const lang of langs) {
      if (shown !== lang) show(lang);
      for (const u of units) if (!(await sayUnit(u, lang, my))) return;
      if (my !== run) return;
      await wait(450);
    }
    if (my !== run) return;
    if (shown !== l) show(l);
    if (!mode) return;
    if (!last) { await wait(700); if (my === run && mode) topic(t, i + 1, home, playFn); }
    else { mode = null; syncBtns(); quizBtn.classList.add('pulse'); }
  }
  const pic = s.pic != null && P[t.id]?.[s.pic]
    ? el('div', { class: 'why-pic', html: P[t.id][s.pic] })
    : el('div', { class: `why-pic emo kind-${s.kind}` }, el('span', {}, s.emoji || t.emoji));
  const dots = el('div', { class: 'step-dots' }, t.slides.map((x, k) => el('button', { class: `sd ${k < i ? 'past' : ''} ${k === i ? 'now' : ''} ${x.kind}`, 'aria-label': String(k + 1), onclick: () => go(k) })));
  const n = screen('why-topic blue',
    el('header', { class: 'bar' }, backBtn(() => { stop(); whyHome(home, playFn); }), title, langSwitch(() => topic(t, i, home, playFn))),
    el('div', { class: 'why-body' },
      pic,
      el('div', { class: 'why-side' },
        textBox, hint,
        el('div', { class: 'why-modes' }, btnAll, btnTri),
        el('div', { class: 'why-nav' },
          el('button', { class: 'btn ghost', disabled: i === 0, onclick: () => go(i - 1) }, '◀'),
          el('button', { class: 'say-btn', 'aria-label': '🔊', onclick: () => { sfx('tap'); readSlide(); } }, '🔊'),
          last ? quizBtn : el('button', { class: 'btn primary', onclick: () => go(i + 1) }, '▶')),
        dots)),
  );
  show(l);
  syncBtns();
  // swipe to change slide
  let x0 = null;
  n.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
  n.addEventListener('pointerup', (e) => { if (x0 == null) return; const dx = e.clientX - x0; x0 = null; if (Math.abs(dx) > 90) { if (dx < 0 && !last) go(i + 1); else if (dx > 0 && i > 0) go(i - 1); } });
  readSlide();
}

// ---------- quiz ----------
function toQuestion(t, x, k, l = wl()) {
  return {
    type: 'choice', key: `${t.id}#${k}`,
    prompt: l === 'zh' ? { fr: 'Écoute et choisis.', en: 'Listen and choose.' } : x[l],
    stimulus: l === 'zh' ? { hz: x.zh.hz, py: x.zh.py } : null,
    say: { text: quizSay(x, l), lang: SPEECH[l] },
    options: x.options.map((o) => (l === 'zh' ? { hz: o.zh.hz, py: o.zh.py, emoji: o.emoji } : { text: o[l], emoji: o.emoji })),
    answer: x.answer,
    cols: x.options.length === 4 ? 2 : 1,
  };
}

async function quiz(t, home, playFn) {
  const R = makeRng();
  const l = wl();
  const qRoot = el('div', { class: `q why-qz lang-${l}` });
  const bubble = el('div', { class: 'owl-bubble' });
  let quit = false;
  setContentLang(SPEECH[l]);
  screen('session blue',
    el('header', { class: 'bar' }, el('button', { class: 'round back', onclick: () => { quit = true; whyHome(home, playFn); } }, '✕'), el('h1', { class: 'why-title' }, t.emoji, ' ', T(L.quiz, l))),
    qRoot, el('div', { class: 'owl-corner' }, bubble, dressedOwl('mini')));
  let score = 0;
  for (const [k, x] of t.quiz.entries()) {
    if (quit) return;
    score += await runQuestion(toQuestion(t, x, k, l), qRoot, R, {
      praise: () => { const w = R.pick(PRAISE[l]); bubble.textContent = w; bubble.className = 'owl-bubble show good'; speak({ text: w, lang: SPEECH[l] }); },
      retry: () => { bubble.textContent = T(L.retry, l); bubble.className = 'owl-bubble show bad'; },
      reveal: () => { bubble.textContent = T(L.reveal, l); bubble.className = 'owl-bubble show bad'; },
      waitNext: (cb) => setTimeout(cb, 1600),
    });
  }
  if (quit) return;
  const first = !isDone(t.id);
  store.why = { ...(store.why || {}), [t.id]: today() };
  store.whyRead = { ...(store.whyRead || {}), [t.id]: store.whyRead?.[t.id] || today() };
  const coins = (first ? 8 + t.level * 2 : 2) + Math.round(score);
  if (l === 'zh') window.__planDone?.('WHY');
  addCoins(coins); touchStreak(); bump('why'); bump('games'); progress('correct', Math.floor(score)); progress('why');
  const fresh = checkBadges(); save();
  confetti(50); sfx('win');
  const list = await load();
  const next = list.filter((x) => x.cat === t.cat && x.shelf === t.shelf && !isRead(x.id)).sort((a, b) => a.level - b.level)[0]
    || list.filter((x) => x.cat === t.cat && !isRead(x.id)).sort((a, b) => a.level - b.level)[0];
  const sh = sheet(el('div', { class: 'memory-done' }, dressedOwl('big hop-loop'), el('h2', {}, DONE[l]),
    el('div', { class: 'res-score' }, `${t.emoji} ${Math.round(score * 10) / 10} / ${t.quiz.length}`), el('div', { class: 'res-coins' }, `+${coins} ${COIN}`),
    el('div', { class: 'res-btns' },
      el('button', { class: 'btn ghost', onclick: () => { sh.close(); topic(t, 0, home, playFn); } }, '↻ ', T(L.again, l)),
      el('button', { class: 'btn primary', onclick: () => { sh.close(); next ? topic(next, 0, home, playFn) : whyHome(home, playFn); } }, next ? [next.emoji, ' ', T(L.more, l), ' ➜'] : '➜'))));
  speak({ text: DONE[l], lang: SPEECH[l] });
  showBadges(fresh);
}

// Mixed science quiz using the main game engine (lightning / balloons), from read topics first.
async function quizHub(home, playFn) {
  const list = await load();
  const l = wl();
  const subject = { id: 'why', color: 'blue', speech: SPEECH[l], praise: l };
  const pool = (lvl) => {
    const known = list.filter((t) => (isRead(t.id) || isDone(t.id)) && t.level <= lvl);
    return known.length >= 6 ? known : list.filter((t) => t.level <= lvl);
  };
  const unit = () => ({
    id: 'why-mix', icon: '🔭', title: { fr: L.quizMix.fr, en: L.quizMix.en }, pfeq: '', subject,
    generate(level, R) { const t = R.pick(pool(level)); const k = R.int(0, t.quiz.length - 1); return toQuestion(t, t.quiz[k], k, l); },
  });
  const back = () => quizHub(home, playFn);
  const card = (icon, title, sub, cls, fn) => el('button', { class: `mode-card ${cls}`, onclick: () => { sfx('tap'); fn(); } }, el('span', { class: 'mode-i' }, icon), el('span', { class: 'mode-t' }, title), el('span', { class: 'mode-s' }, sub));
  const rec = (lv, m) => store.records[`why-mix|${lv}|${m}`] || 0;
  screen('hub blue',
    el('header', { class: 'bar' }, backBtn(() => whyHome(home, playFn)), el('h1', {}, '🏆 ', T(L.quizMix, l)), langSwitch(() => quizHub(home, playFn)), wallet()),
    el('div', { class: 'modes' }, [1, 2, 3].flatMap((lv) => [
      card('⚡', `${'★'.repeat(lv)} ${T(L.lightning, l)}`, `60 s · 🏆 ${rec(lv, 'eclair')}`, 'eclair', () => playFn({ mode: 'eclair', pool: [unit()], level: lv, key: 'why-mix', back })),
      card('🎈', `${'★'.repeat(lv)} ${T(L.balloons, l)}`, `❤️❤️❤️ · 🏆 ${rec(lv, 'ballons')}`, 'ballons', () => playFn({ mode: 'ballons', pool: [unit()], level: lv, key: 'why-mix', back })),
    ])));
}
