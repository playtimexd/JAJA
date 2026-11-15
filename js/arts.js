// Arts plastiques: a large library of step-by-step drawing / folding / recycled crafts / seasonal projects.
// Data: js/content/arts/{dessin,pliage,recup,fetes}.js (schema in docs/ARTS.md).
// Big imported libraries (openmoji.js, quickdraw.js) are loaded only when a library tab or the search is used;
// their steps are generated on demand by js/arts-gen.js.
import { el } from './util.js';
import { store, save, today } from './store.js';
import { tr, lang } from './i18n.js';
import { speak, sfx, setContentLang, unlockAudio } from './audio.js';
import { screen, backBtn, wallet, sheet } from './ui.js';
import { ensureSteps, thumbSvg, CREDIT } from './arts-gen.js';
import { COIN, addCoins, progress, bump, checkBadges, showBadges, confetti, touchStreak, dressedOwl } from './game.js';

const CATS = [
  { id: 'saison', icon: '🗓️', t: { fr: 'En ce moment', en: 'Right now' } },
  { id: 'dessin', icon: '✏️', t: { fr: 'Dessin', en: 'Drawing' } },
  { id: 'anib', lib: true, icon: '🐾', t: { fr: 'Animaux (bibliothèque)', en: 'Animals (library)' } },
  { id: 'biblio', lib: true, icon: '📚', t: { fr: 'Bibliothèque', en: 'Library' } },
  { id: 'scene', icon: '🏞️', t: { fr: 'Grandes scènes', en: 'Big scenes' } },
  { id: 'pliage', icon: '📄', t: { fr: 'Pliage et découpage', en: 'Folding & cutting' } },
  { id: 'recup', icon: '♻️', t: { fr: 'Bricolage récup', en: 'Recycled crafts' } },
  { id: 'fetes', icon: '🎃', t: { fr: 'Fêtes et saisons', en: 'Holidays & seasons' } },
  { id: 'fav', icon: '❤️', t: { fr: 'Mes favoris', en: 'My favourites' } },
];
const L = {
  all: { fr: 'Tous', en: 'All' }, d1: { fr: 'Facile', en: 'Easy' }, d2: { fr: 'Moyen', en: 'Medium' }, d3: { fr: 'Difficile', en: 'Hard' },
  need: { fr: 'Ce qu’il te faut', en: 'What you need' }, go: { fr: 'C’est parti!', en: 'Let’s go!' }, step: { fr: 'Étape', en: 'Step' },
  done: { fr: 'J’ai fini! 🎉', en: 'I’m done! 🎉' }, bravo: { fr: 'Bravo, artiste!', en: 'Well done, artist!' }, adult: { fr: 'Avec un adulte', en: 'With a grown-up' },
  min: { fr: 'min', en: 'min' }, none: { fr: 'Rien ici pour l’instant.', en: 'Nothing here yet.' }, again: { fr: 'Refaire', en: 'Do it again' },
  search: { fr: 'Chercher un dessin…', en: 'Search for a drawing…' }, moreCards: { fr: 'Voir plus ▼', en: 'Show more ▼' }, loading: { fr: 'Chargement…', en: 'Loading…' },
  more: { fr: 'Autres projets', en: 'More projects' }, made: { fr: 'déjà fait', en: 'done' }, tapCheck: { fr: 'Touche chaque objet quand tu l’as.', en: 'Tap each item when you have it.' },
};
const SEASONS_BY_MONTH = {
  1: ['hiver'], 2: ['hiver', 'saint-valentin'], 3: ['hiver', 'cabane-a-sucre', 'printemps', 'paques'], 4: ['printemps', 'paques', 'cabane-a-sucre', 'jour-de-la-terre'],
  5: ['printemps', 'fete-des-meres'], 6: ['ete', 'fete-des-peres', 'fete-nationale'], 7: ['ete'], 8: ['ete'], 9: ['automne'], 10: ['automne', 'halloween'],
  11: ['automne', 'hiver', 'noel'], 12: ['hiver', 'noel'],
};

let all = null;
async function load() {
  if (all) return all;
  all = [];
  for (const c of ['dessin', 'dessin2', 'dessin3', 'pliage', 'recup', 'fetes']) {
    try { all.push(...(await import(`./content/arts/${c}.js`)).projects); } catch (e) { console.warn('arts missing', c, e.message); }
  }
  return all;
}
let big = null;
async function loadBig() {
  if (big) return big;
  big = [];
  for (const c of ['openmoji', 'quickdraw']) {
    try { big.push(...(await import(`./content/arts/${c}.js`)).projects); } catch (e) { console.warn('arts library missing', c, e.message); }
  }
  return big;
}
const isBig = (id) => /^(om|qd)-/.test(id);
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const view = { cat: 'saison', lvl: 0, q: '', page: 1 };
const PAGE = 36;

export async function openArt(id, home, i = 0) { const list = isBig(id) ? await loadBig() : await load(); const p = list.find((x) => x.id === id); if (p) steps(p, home, Math.min(i, ensureSteps(p).length - 1)); else artsHome(home); }

export async function artsHome(home) {
  const list = await load();
  const month = new Date().getMonth() + 1;
  const now = SEASONS_BY_MONTH[month];
  const favBig = Object.keys(store.arts.fav).some(isBig);
  if (favBig || view.cat === 'anib' || view.cat === 'biblio' || view.q) await loadBig();   // big libraries: only when needed
  const pick = (cat) => cat === 'saison' ? list.filter((p) => p.season && now.includes(p.season))
    : cat === 'fav' ? [...list, ...(big || [])].filter((p) => store.arts.fav[p.id])
      : cat === 'scene' ? list.filter((p) => p.theme === 'scene')
        : cat === 'anib' ? sortFr((big || []).filter((p) => p.theme === 'animaux'))
          : cat === 'biblio' ? sortFr((big || []).filter((p) => p.theme !== 'animaux'))
            : list.filter((p) => p.cat === cat && p.theme !== 'scene');
  const grid = el('div', { class: 'art-grid' });
  const tabs = el('div', { class: 'art-tabs' });
  const lv = el('div', { class: 'art-lvls' });
  const more = el('div', { class: 'art-more' });
  const search = el('input', { class: 'art-search', type: 'search', placeholder: '🔍 ' + tr(L.search), value: view.q, autocomplete: 'off', spellcheck: 'false' });
  let timer = 0;
  search.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      view.q = search.value.trim(); view.page = 1;
      if (view.q.length >= 2 && !big) { grid.innerHTML = ''; grid.append(el('p', { class: 'hint' }, tr(L.loading))); await loadBig(); }
      draw();
    }, 200);
  });
  const tabBtn = (c) => {
    const n = c.lib && !big ? '' : String(pick(c.id).length);
    return el('button', { class: `art-tab ${!view.q && view.cat === c.id ? 'on' : ''}`, onclick: async () => {
      sfx('tap'); view.cat = c.id; view.page = 1; view.q = ''; search.value = '';
      if (c.lib && !big) { grid.innerHTML = ''; grid.append(el('p', { class: 'hint' }, tr(L.loading))); await loadBig(); }
      draw();
    } }, el('span', { class: 'ti' }, c.icon), tr(c.t), n ? el('small', {}, n) : null);
  };
  const card = (p) => {
    const done = store.arts.done[p.id];
    return el('button', { class: `art-card lv${p.level} ${done ? 'done' : ''}`, onclick: () => { sfx('tap'); project(p, home); } },
      el('div', { class: 'art-thumb', html: thumbSvg(p) }),
      el('div', { class: 'art-info' },
        el('b', {}, p.emoji, ' ', tr(p.title)),
        el('small', {}, `${tr(L['d' + p.level])} · ${p.minutes} ${tr(L.min)}${p.adult ? ' · 🧑' : ''}`)),
      done ? el('span', { class: 'art-done' }, '✔') : null,
      store.arts.fav[p.id] ? el('span', { class: 'art-fav' }, '❤️') : null);
  };
  const draw = () => {
    tabs.innerHTML = ''; lv.innerHTML = ''; grid.innerHTML = ''; more.innerHTML = '';
    for (const c of CATS) {
      if (c.id === 'fav' && !pick('fav').length) continue;
      tabs.append(tabBtn(c));
    }
    [0, 1, 2, 3].forEach((l) => lv.append(el('button', { class: `${['', 'green', 'orange', 'red'][l]} ${view.lvl === l ? 'on' : ''}`, onclick: () => { sfx('tap'); view.lvl = l; view.page = 1; draw(); } }, tr(l ? L['d' + l] : L.all))));
    let src;
    if (view.q) {
      const words = norm(view.q).split(/\s+/).filter(Boolean);
      src = sortFr([...list, ...(big || [])].filter((p) => { const h = norm(p.title.fr + ' ' + p.title.en).split(/[^a-z0-9]+/); return words.every((w) => h.some((x) => x.startsWith(w))); }));
    } else src = pick(view.cat);
    const items = src.filter((p) => !view.lvl || p.level === view.lvl);
    if (!items.length) grid.append(el('p', { class: 'hint' }, tr(L.none)));
    for (const p of items.slice(0, view.page * PAGE)) grid.append(card(p));
    if (items.length > view.page * PAGE) more.append(el('button', { class: 'btn ghost', onclick: () => { sfx('tap'); view.page++; draw(); } }, tr(L.moreCards), ` (${items.length - view.page * PAGE})`));
  };
  screen('arts-screen purple',
    el('header', { class: 'bar' }, backBtn(home), el('h1', {}, '🎨 ', lang() === 'fr' ? 'Arts plastiques' : 'Arts & crafts'), wallet()),
    tabs, search, lv, grid, more);
  draw();
}
const sortFr = (a) => a.slice().sort((x, y) => x.title.fr.localeCompare(y.title.fr, 'fr') || (x.id < y.id ? -1 : 1));

function project(p, home) {
  ensureSteps(p);
  unlockAudio();
  setContentLang(lang() === 'fr' ? 'fr-CA' : 'en-CA');
  const have = new Set();
  const favBtn = el('button', { class: `round fav ${store.arts.fav[p.id] ? 'on' : ''}`, onclick: () => { sfx('tap'); store.arts.fav[p.id] = !store.arts.fav[p.id]; if (!store.arts.fav[p.id]) delete store.arts.fav[p.id]; save(); favBtn.classList.toggle('on'); favBtn.textContent = store.arts.fav[p.id] ? '❤️' : '🤍'; } }, store.arts.fav[p.id] ? '❤️' : '🤍');
  screen('art-intro purple',
    el('header', { class: 'bar' }, backBtn(() => artsHome(home)), el('h1', {}, p.emoji, ' ', tr(p.title)), favBtn),
    el('div', { class: 'art-intro-body' },
      el('div', { class: 'art-final', html: thumbSvg(p) }),
      el('div', { class: 'art-need' },
        el('div', { class: 'art-meta' }, `${tr(L['d' + p.level])} · ⏱️ ${p.minutes} ${tr(L.min)} · ${p.steps.length} ${tr(L.step).toLowerCase()}s${p.adult ? ' · 🧑 ' + tr(L.adult) : ''}`),
        el('h3', {}, '🧺 ', tr(L.need)),
        el('small', {}, tr(L.tapCheck)),
        el('div', { class: 'need-list' }, p.materials.map((m, i) => {
          const b = el('button', { class: 'need', onclick: () => { sfx('tap'); have.has(i) ? have.delete(i) : have.add(i); b.classList.toggle('on'); } }, el('span', { class: 'box' }), tr(m));
          return b;
        })),
        el('button', { class: 'btn primary big-go', onclick: () => { sfx('tap'); steps(p, home, 0); } }, tr(L.go), ' ➜'),
        CREDIT[p.source] ? el('div', { class: 'art-credit' }, tr(CREDIT[p.source])) : null)),
  );
  speak({ text: `${tr(p.title)}. ${tr(L.need)} : ${p.materials.map(tr).join(', ')}.` });
}

function steps(p, home, i) {
  ensureSteps(p);
  const s = p.steps[i], last = i === p.steps.length - 1;
  store.resume = { t: 'art', id: p.id, i, label: tr(p.title), icon: p.emoji };
  save();
  const dots = el('div', { class: 'step-dots' }, p.steps.map((_, k) => el('button', { class: `sd ${k < i ? 'past' : ''} ${k === i ? 'now' : ''}`, onclick: () => { sfx('tap'); steps(p, home, k); } })));
  screen('art-step purple',
    el('header', { class: 'bar' }, backBtn(() => project(p, home), '✕'), el('h1', {}, p.emoji, ' ', tr(p.title)), el('span', { class: 'bar-title' }, `${tr(L.step)} ${i + 1} / ${p.steps.length}`)),
    el('div', { class: 'step-body' },
      el('div', { class: 'step-pic', html: s.svg }),
      el('div', { class: 'step-side' },
        el('div', { class: 'step-num' }, String(i + 1)),
        el('div', { class: 'step-text' }, tr(s.text)),
        el('button', { class: 'say-btn', onclick: () => speak({ text: tr(s.text) }) }, '🔊'),
        dots,
        el('div', { class: 'step-nav' },
          el('button', { class: 'btn ghost', disabled: i === 0, onclick: () => { sfx('tap'); steps(p, home, i - 1); } }, '◀'),
          last ? el('button', { class: 'btn primary', onclick: () => finish(p, home) }, tr(L.done))
            : el('button', { class: 'btn primary', onclick: () => { sfx('tap'); steps(p, home, i + 1); } }, '▶')))),
  );
  speak({ text: tr(s.text) });
}

function finish(p, home) {
  const first = !store.arts.done[p.id];
  store.arts.done[p.id] = today();
  const coins = first ? 10 + p.level * 5 : 3;
  addCoins(coins);
  touchStreak(); bump('arts'); progress('arts');
  const fresh = checkBadges();
  save();
  sfx('win'); confetti(70);
  const sh = sheet(el('div', { class: 'memory-done' }, dressedOwl('big hop-loop'), el('h2', {}, tr(L.bravo)),
    el('div', { class: 'art-final small', html: thumbSvg(p) }),
    el('div', { class: 'res-coins' }, `+${coins} ${COIN}`),
    el('div', { class: 'res-btns' },
      el('button', { class: 'btn ghost', onclick: () => { sh.close(); steps(p, home, 0); } }, '↻ ', tr(L.again)),
      el('button', { class: 'btn primary', onclick: () => { sh.close(); artsHome(home); } }, tr(L.more), ' ➜'))));
  speak({ text: tr(L.bravo) });
  showBadges(fresh);
}
