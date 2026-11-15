// Shared screen helpers (used by main.js and arts.js).
import { el } from './util.js';
import { t } from './i18n.js';
import { stopSpeech, sfx } from './audio.js';
import { store } from './store.js';
import { COIN, streakNow } from './game.js';

export const app = document.getElementById('app');
export const screen = (cls, ...kids) => {
  stopSpeech();
  document.querySelectorAll('.sheet-wrap').forEach((n) => n.remove());
  app.innerHTML = '';
  const n = el('div', { class: `screen ${cls}` }, ...kids);
  app.append(n);
  app.scrollTop = 0;
  return n;
};
export const backBtn = (fn, label = '‹') => el('button', { class: 'round back', 'aria-label': t('back'), onclick: () => { sfx('tap'); fn(); } }, label);
export const starsTxt = (n) => '★'.repeat(n) + '☆'.repeat(3 - n);

// 🪶 coins + 🔥 streak pills
export const wallet = () => el('span', { class: 'pill coins', id: 'wallet' }, `${COIN} ${store.coins}`);
export const streakPill = () => { const n = streakNow(); return el('span', { class: `pill streak ${n ? '' : 'cold'}` }, `🔥 ${n}`); };
export const refreshWallet = () => { const w = document.getElementById('wallet'); if (w) w.textContent = `${COIN} ${store.coins}`; };

// Bottom sheet (modal). Returns { node, close }.
export function sheet(...kids) {
  const close = () => { wrap.classList.add('out'); setTimeout(() => wrap.remove(), 220); };
  const box = el('div', { class: 'sheet' }, el('button', { class: 'sheet-x', 'aria-label': 'x', onclick: () => { sfx('tap'); close(); } }, '✕'), ...kids);
  const wrap = el('div', { class: 'sheet-wrap', onclick: (e) => { if (e.target === wrap) close(); } }, box);
  document.body.append(wrap);
  return { node: box, close };
}
