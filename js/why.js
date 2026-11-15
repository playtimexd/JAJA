// « Pourquoi? 十万个为什么 » — illustrated science explanations (Chinese + pinyin, or French), then a mini quiz.
// Data: js/content/why/{animaux,corps,ciel,science}.js (schema in docs/WHY.md).
import { el } from './util.js';
import { store, save, today } from './store.js';
import { tr } from './i18n.js';
import { speak, sfx, unlockAudio, setContentLang } from './audio.js';
import { runQuestion, hanzi } from './widgets.js';
import { screen, backBtn, wallet, sheet } from './ui.js';
import { COIN, addCoins, bump, progress, checkBadges, showBadges, confetti, touchStreak, dressedOwl } from './game.js';
import { makeRng } from './util.js';
import { GROUPS } from './content/why/groups.js';

const CATS = [
  { id: 'animaux', icon: '🦊', t: { zh: '动物和植物', fr: 'Animaux et plantes' } },
  { id: 'corps', icon: '🫀', t: { zh: '身体和健康', fr: 'Le corps' } },
  { id: 'ciel', icon: '🌈', t: { zh: '天空和宇宙', fr: 'Ciel et espace' } },
  { id: 'science', icon: '🧲', t: { zh: '生活中的科学', fr: 'Sciences de tous les jours' } },
];
const L = {
  title: { zh: '十万个为什么', fr: 'Pourquoi?' },
  quizMix: { zh: '科学大挑战', fr: 'Défi science' },
  quizSub: { zh: '⚡ 限时 · 🎈 气球', fr: '⚡ éclair · 🎈 ballons' },
  fact: { zh: '你知道吗？', fr: 'Le savais-tu?' },
  quiz: { zh: '小测验', fr: 'Petit quiz' },
  next: { zh: '下一页', fr: 'Suivant' },
  done: { zh: '太棒了！你学会了！', fr: 'Bravo! Tu as appris quelque chose!' },
  more: { zh: '再看一个', fr: 'Un autre' },
  again: { zh: '再看一遍', fr: 'Revoir' },
  learned: { zh: '已学会', fr: 'appris' },
};
const wl = () => (store.settings.whyLang === 'zh' ? 'zh' : 'fr');   // French by default, Chinese on request
const T = (x) => x[wl()] ?? x.fr;
const sayLang = () => (wl() === 'zh' ? 'zh-CN' : 'fr-CA');
// text node for a {zh,py,fr} item in the current language
const txt = (x, cls = '') => (wl() === 'zh' ? hanzi(x.zh, x.py, cls) : el('span', { class: cls }, x.fr));
const sayOf = (x) => ({ text: wl() === 'zh' ? x.zh : x.fr, lang: sayLang() });

let all = null;
async function load() {
  if (all) return all;
  all = [];
  for (const c of CATS) {
    try { all.push(...(await import(`./content/why/${c.id}.js`)).topics); } catch (e) { console.warn('why missing', c.id, e.message); }
  }
  return all;
}
const view = { cat: 'animaux' };

export async function openWhy(id, home, playFn, i = 0) { const list = await load(); const t = list.find((x) => x.id === id); if (t) topic(t, Math.min(i, t.slides.length - 1), home, playFn); else whyHome(home, playFn); }

export async function whyHome(home, playFn) {
  const list = await load();
  const langSeg = el('div', { class: 'why-lang' }, [['zh', '🐼 中文'], ['fr', '⚜️ Français']].map(([k, label]) =>
    el('button', { class: wl() === k ? 'on' : '', onclick: () => { sfx('tap'); store.settings.whyLang = k; save(); whyHome(home, playFn); } }, label)));
  const tabs = el('div', { class: 'art-tabs' }, CATS.map((c) => el('button', { class: `art-tab ${view.cat === c.id ? 'on' : ''}`, onclick: () => { sfx('tap'); view.cat = c.id; whyHome(home, playFn); } },
    el('span', { class: 'ti' }, c.icon), T(c.t), el('small', {}, String(list.filter((t) => t.cat === c.id).length)))));
  const items = list.filter((t) => t.cat === view.cat);
  const byId = Object.fromEntries(items.map((t) => [t.id.slice(view.cat.length + 1), t]));
  const groups = (GROUPS[view.cat] || []).map((g) => ({ ...g, topics: g.ids.map((id) => byId[id]).filter(Boolean) }));
  const placed = new Set(groups.flatMap((g) => g.topics.map((t) => t.id)));
  const rest = items.filter((t) => !placed.has(t.id));
  if (rest.length) groups.push({ icon: '✨', zh: '其他', fr: 'Autres', topics: rest });
  const card = (t) => el('button', { class: `why-card lv${t.level} ${store.why?.[t.id] ? 'done' : ''}`, onclick: () => { sfx('tap'); topic(t, 0, home, playFn); } },
    el('span', { class: 'why-emoji' }, t.emoji), el('span', { class: 'why-q' }, txt(t.q)), store.why?.[t.id] ? el('span', { class: 'why-ok' }, '✔') : null);
  const grid = el('div', { class: 'why-groups' }, groups.filter((g) => g.topics.length).map((g) => {
    const got = g.topics.filter((t) => store.why?.[t.id]).length;
    return el('section', { class: 'why-group' },
      el('h2', {}, el('span', { class: 'wg-i' }, g.icon), T(g), el('small', {}, `${got} / ${g.topics.length}`)),
      el('div', { class: 'why-grid' }, g.topics.sort((a, b) => a.level - b.level).map(card)));
  }));
  const learned = Object.keys(store.why || {}).length;
  screen('why-screen blue',
    el('header', { class: 'bar' }, backBtn(home), el('h1', {}, '🔭 ', T(L.title)), langSeg, wallet()),
    el('div', { class: 'why-top' },
      tabs,
      el('button', { class: 'why-quiz', onclick: () => { sfx('tap'); quizHub(home, playFn); } }, el('b', {}, '🏆 ', T(L.quizMix)), el('small', {}, `${T(L.quizSub)} · ✔ ${learned} ${T(L.learned)}`))),
    grid);
}

function topic(t, i, home, playFn) {
  unlockAudio();
  store.resume = { t: 'why', id: t.id, i, label: wl() === 'zh' ? t.q.zh : t.q.fr, icon: t.emoji };
  save();
  setContentLang(sayLang());
  const s = t.slides[i], last = i === t.slides.length - 1;
  const dots = el('div', { class: 'step-dots' }, t.slides.map((_, k) => el('button', { class: `sd ${k < i ? 'past' : ''} ${k === i ? 'now' : ''}`, onclick: () => { sfx('tap'); topic(t, k, home, playFn); } })));
  screen('why-topic blue',
    el('header', { class: 'bar' }, backBtn(() => whyHome(home, playFn)), el('h1', { class: 'why-title' }, t.emoji, ' ', txt(t.q))),
    el('div', { class: 'step-body' },
      el('div', { class: 'step-pic', html: s.svg || '' }),
      el('div', { class: 'step-side' },
        el('div', { class: 'why-text' }, txt(s)),
        el('button', { class: 'say-btn', onclick: () => speak(sayOf(s)) }, '🔊'),
        last && t.fact ? el('div', { class: 'why-fact' }, el('b', {}, '💡 ', T(L.fact)), ' ', txt(t.fact)) : null,
        dots,
        el('div', { class: 'step-nav' },
          el('button', { class: 'btn ghost', disabled: i === 0, onclick: () => { sfx('tap'); topic(t, i - 1, home, playFn); } }, '◀'),
          last ? el('button', { class: 'btn primary', onclick: () => { sfx('tap'); quiz(t, home, playFn); } }, '❓ ', T(L.quiz))
            : el('button', { class: 'btn primary', onclick: () => { sfx('tap'); topic(t, i + 1, home, playFn); } }, '▶')))),
  );
  speak(i === 0 ? { text: `${wl() === 'zh' ? t.q.zh : t.q.fr} ${wl() === 'zh' ? s.zh : s.fr}`, lang: sayLang() } : sayOf(s));
}

// One quiz item → engine 'choice' question.
function toQuestion(t, x, k) {
  const zh = wl() === 'zh';
  return {
    type: 'choice', key: `${t.id}#${k}`,
    prompt: zh ? x.zh : x.fr,
    stimulus: zh ? { hz: x.zh, py: x.py } : null,
    say: sayOf(x),
    options: x.options.map((o) => (zh ? { hz: o.zh, py: o.py, emoji: o.emoji } : { text: o.fr, emoji: o.emoji })),
    answer: x.answer,
    cols: x.options.length === 4 ? 2 : x.options.length,
  };
}

async function quiz(t, home, playFn) {
  const R = makeRng();
  const qRoot = el('div', { class: 'q why-qz' });
  const bubble = el('div', { class: 'owl-bubble' });
  let quit = false;
  screen('session blue',
    el('header', { class: 'bar' }, el('button', { class: 'round back', onclick: () => { quit = true; whyHome(home, playFn); } }, '✕'), el('h1', { class: 'why-title' }, t.emoji, ' ', T(L.quiz))),
    qRoot, el('div', { class: 'owl-corner' }, bubble, dressedOwl('mini')));
  let score = 0;
  const praise = wl() === 'zh' ? ['真棒！', '对啦！', '好厉害！'] : ['Bravo!', 'Super!', 'Génial!'];
  for (const [k, x] of t.quiz.entries()) {
    if (quit) return;
    const q = toQuestion(t, x, k);
    // the question is already shown big in the stimulus for Chinese; keep the prompt short
    if (wl() === 'zh') q.prompt = { fr: 'Écoute et choisis.', en: 'Listen and choose.' };
    score += await runQuestion(q, qRoot, R, {
      praise: () => { const w = praise[R.int(0, praise.length - 1)]; bubble.textContent = w; bubble.className = 'owl-bubble show good'; speak({ text: w, lang: sayLang() }); },
      retry: () => { bubble.textContent = wl() === 'zh' ? '再想想！' : 'Essaie encore!'; bubble.className = 'owl-bubble show bad'; },
      reveal: () => { bubble.textContent = wl() === 'zh' ? '正确答案是：' : 'La bonne réponse :'; bubble.className = 'owl-bubble show bad'; },
      waitNext: (cb) => setTimeout(cb, 1600),
    });
  }
  if (quit) return;
  const first = !store.why?.[t.id];
  store.why = { ...(store.why || {}), [t.id]: today() };
  const coins = (first ? 8 + t.level * 2 : 2) + Math.round(score);
  addCoins(coins); touchStreak(); bump('why'); bump('games'); progress('correct', Math.floor(score)); progress('why');
  const fresh = checkBadges(); save();
  confetti(50); sfx('win');
  const list = await load();
  const next = list.filter((x) => x.cat === t.cat && !store.why[x.id]).sort((a, b) => a.level - b.level)[0];
  const sh = sheet(el('div', { class: 'memory-done' }, dressedOwl('big hop-loop'), el('h2', {}, T(L.done)),
    el('div', { class: 'res-score' }, `${t.emoji} ${Math.round(score * 10) / 10} / ${t.quiz.length}`), el('div', { class: 'res-coins' }, `+${coins} ${COIN}`),
    el('div', { class: 'res-btns' },
      el('button', { class: 'btn ghost', onclick: () => { sh.close(); topic(t, 0, home, playFn); } }, '↻ ', T(L.again)),
      el('button', { class: 'btn primary', onclick: () => { sh.close(); next ? topic(next, 0, home, playFn) : whyHome(home, playFn); } }, T(L.more), ' ➜'))));
  speak({ text: T(L.done), lang: sayLang() });
  showBadges(fresh);
}

// Mixed science quiz using the main game engine (lightning / balloons), from learned topics first.
async function quizHub(home, playFn) {
  const list = await load();
  const subject = { id: 'why', color: 'blue', speech: sayLang(), praise: wl() };
  const pool = (lvl) => {
    const learned = list.filter((t) => store.why?.[t.id] && t.level <= lvl);
    return learned.length >= 6 ? learned : list.filter((t) => t.level <= lvl);
  };
  const unit = (lvl) => ({
    id: 'why-mix', icon: '🔭', title: L.quizMix, pfeq: '', subject,
    generate(level, R) { const t = R.pick(pool(level)); const k = R.int(0, t.quiz.length - 1); return toQuestion(t, t.quiz[k], k); },
  });
  const back = () => quizHub(home, playFn);
  const card = (icon, title, sub, cls, fn) => el('button', { class: `mode-card ${cls}`, onclick: () => { sfx('tap'); fn(); } }, el('span', { class: 'mode-i' }, icon), el('span', { class: 'mode-t' }, title), el('span', { class: 'mode-s' }, sub));
  const rec = (l, m) => store.records[`why-mix|${l}|${m}`] || 0;
  screen('hub blue',
    el('header', { class: 'bar' }, backBtn(() => whyHome(home, playFn)), el('h1', {}, '🏆 ', T(L.quizMix)), wallet()),
    el('div', { class: 'modes' }, [1, 2, 3].flatMap((l) => [
      card('⚡', `${['', '★', '★★', '★★★'][l]} ${wl() === 'zh' ? '闪电挑战' : 'Défi éclair'}`, `60 s · 🏆 ${rec(l, 'eclair')}`, 'eclair', () => playFn({ mode: 'eclair', pool: [unit(l)], level: l, key: 'why-mix', back })),
      card('🎈', `${['', '★', '★★', '★★★'][l]} ${wl() === 'zh' ? '打气球' : 'Ballons'}`, `❤️❤️❤️ · 🏆 ${rec(l, 'ballons')}`, 'ballons', () => playFn({ mode: 'ballons', pool: [unit(l)], level: l, key: 'why-mix', back })),
    ])));
}
