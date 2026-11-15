// Arts plastiques: a large library of step-by-step drawing / folding / recycled crafts / seasonal projects.
// Data: js/content/arts/{dessin,pliage,recup,fetes}.js (schema in docs/ARTS.md).
import { el } from './util.js';
import { store, save, today } from './store.js';
import { tr, lang } from './i18n.js';
import { speak, sfx, setContentLang, unlockAudio } from './audio.js';
import { screen, backBtn, wallet, sheet } from './ui.js';
import { COIN, addCoins, progress, bump, checkBadges, showBadges, confetti, touchStreak, dressedOwl } from './game.js';

const CATS = [
  { id: 'saison', icon: '🗓️', t: { fr: 'En ce moment', en: 'Right now' } },
  { id: 'dessin', icon: '✏️', t: { fr: 'Dessin', en: 'Drawing' } },
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
  for (const c of ['dessin', 'pliage', 'recup', 'fetes']) {
    try { all.push(...(await import(`./content/arts/${c}.js`)).projects); } catch (e) { console.warn('arts missing', c, e.message); }
  }
  return all;
}
const view = { cat: 'saison', lvl: 0 };

export async function artsHome(home) {
  const list = await load();
  const month = new Date().getMonth() + 1;
  const now = SEASONS_BY_MONTH[month];
  const pick = (cat) => cat === 'saison' ? list.filter((p) => p.season && now.includes(p.season))
    : cat === 'fav' ? list.filter((p) => store.arts.fav[p.id]) : list.filter((p) => p.cat === cat);
  const grid = el('div', { class: 'art-grid' });
  const tabs = el('div', { class: 'art-tabs' });
  const lv = el('div', { class: 'art-lvls' });
  const draw = () => {
    tabs.innerHTML = ''; lv.innerHTML = ''; grid.innerHTML = '';
    for (const c of CATS) {
      const n = pick(c.id).length;
      if (c.id === 'fav' && !n) continue;
      tabs.append(el('button', { class: `art-tab ${view.cat === c.id ? 'on' : ''}`, onclick: () => { sfx('tap'); view.cat = c.id; draw(); } }, el('span', { class: 'ti' }, c.icon), tr(c.t), el('small', {}, String(n))));
    }
    [0, 1, 2, 3].forEach((l) => lv.append(el('button', { class: `${['', 'green', 'orange', 'red'][l]} ${view.lvl === l ? 'on' : ''}`, onclick: () => { sfx('tap'); view.lvl = l; draw(); } }, tr(l ? L['d' + l] : L.all))));
    const items = pick(view.cat).filter((p) => !view.lvl || p.level === view.lvl);
    if (!items.length) grid.append(el('p', { class: 'hint' }, tr(L.none)));
    for (const p of items) {
      const done = store.arts.done[p.id];
      grid.append(el('button', { class: `art-card lv${p.level} ${done ? 'done' : ''}`, onclick: () => { sfx('tap'); project(p, home); } },
        el('div', { class: 'art-thumb', html: p.steps[p.steps.length - 1].svg }),
        el('div', { class: 'art-info' },
          el('b', {}, p.emoji, ' ', tr(p.title)),
          el('small', {}, `${tr(L['d' + p.level])} · ${p.minutes} ${tr(L.min)}${p.adult ? ' · 🧑' : ''}`)),
        done ? el('span', { class: 'art-done' }, '✔') : null,
        store.arts.fav[p.id] ? el('span', { class: 'art-fav' }, '❤️') : null));
    }
  };
  screen('arts-screen purple',
    el('header', { class: 'bar' }, backBtn(home), el('h1', {}, '🎨 ', lang() === 'fr' ? 'Arts plastiques' : 'Arts & crafts'), wallet()),
    tabs, lv, grid);
  draw();
}

function project(p, home) {
  unlockAudio();
  setContentLang(lang() === 'fr' ? 'fr-CA' : 'en-CA');
  const have = new Set();
  const favBtn = el('button', { class: `round fav ${store.arts.fav[p.id] ? 'on' : ''}`, onclick: () => { sfx('tap'); store.arts.fav[p.id] = !store.arts.fav[p.id]; if (!store.arts.fav[p.id]) delete store.arts.fav[p.id]; save(); favBtn.classList.toggle('on'); favBtn.textContent = store.arts.fav[p.id] ? '❤️' : '🤍'; } }, store.arts.fav[p.id] ? '❤️' : '🤍');
  screen('art-intro purple',
    el('header', { class: 'bar' }, backBtn(() => artsHome(home)), el('h1', {}, p.emoji, ' ', tr(p.title)), favBtn),
    el('div', { class: 'art-intro-body' },
      el('div', { class: 'art-final', html: p.steps[p.steps.length - 1].svg }),
      el('div', { class: 'art-need' },
        el('div', { class: 'art-meta' }, `${tr(L['d' + p.level])} · ⏱️ ${p.minutes} ${tr(L.min)} · ${p.steps.length} ${tr(L.step).toLowerCase()}s${p.adult ? ' · 🧑 ' + tr(L.adult) : ''}`),
        el('h3', {}, '🧺 ', tr(L.need)),
        el('small', {}, tr(L.tapCheck)),
        el('div', { class: 'need-list' }, p.materials.map((m, i) => {
          const b = el('button', { class: 'need', onclick: () => { sfx('tap'); have.has(i) ? have.delete(i) : have.add(i); b.classList.toggle('on'); } }, el('span', { class: 'box' }), tr(m));
          return b;
        })),
        el('button', { class: 'btn primary big-go', onclick: () => { sfx('tap'); steps(p, home, 0); } }, tr(L.go), ' ➜'))),
  );
  speak({ text: `${tr(p.title)}. ${tr(L.need)} : ${p.materials.map(tr).join(', ')}.` });
}

function steps(p, home, i) {
  const s = p.steps[i], last = i === p.steps.length - 1;
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
    el('div', { class: 'art-final small', html: p.steps[p.steps.length - 1].svg }),
    el('div', { class: 'res-coins' }, `+${coins} ${COIN}`),
    el('div', { class: 'res-btns' },
      el('button', { class: 'btn ghost', onclick: () => { sh.close(); steps(p, home, 0); } }, '↻ ', tr(L.again)),
      el('button', { class: 'btn primary', onclick: () => { sh.close(); artsHome(home); } }, tr(L.more), ' ➜'))));
  speak({ text: tr(L.bravo) });
  showBadges(fresh);
}
