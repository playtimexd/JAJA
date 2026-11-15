// « Plan du jour »: one language per day (français → English → 中文), about 30 minutes, 4 short blocks.
// Starts 2026-11-16. Each block points to an existing activity; it is ticked when that activity is finished today.
import { el } from './util.js';
import { store, save, today, levelStats } from './store.js';
import { tr } from './i18n.js';

export const PLAN_START = '2026-11-16';
const ORDER = ['francais', 'anglais', 'chinois'];
const SUBJ = {
  francais: { icon: '📖', t: { fr: 'Français', en: 'French' } },
  anglais: { icon: '🍁', t: { fr: 'Anglais', en: 'English' } },
  chinois: { icon: '🐼', t: { fr: 'Chinois', en: 'Chinese' } },
};
// Unit sequences each block walks through (one step every time that language comes back, i.e. every 3 days).
const SEQ = {
  francais: {
    lire: ['f14', 'f8'],
    langue: ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f9', 'f10', 'f11', 'f12', 'f13'],
    dictee: ['f15'],
    ecrire: ['f17', 'f16', 'f18', 'BOOK'],
  },
  anglais: {
    catch: ['k0', 'k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9'],
    langue: ['e21', 'e22', 'e23', 'e24', 'e25', 'e26', 'e27', 'e28', 'e29', 'e30', 'e31', 'e32', 'e33', 'e34'],
    ecoute: ['e19', 'e20', 'e35'],
    parler: ['TALK', 'e37', 'e36', 'e38'],
  },
  chinois: {
    pinyin: ['c1', 'c2', 'c3', 'c4', 'c5'],
    zi: ['c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14'],
    xie: ['c16', 'c22', 'c17', 'c23', 'c18', 'c24', 'c15'],
    du: ['c19', 'c20', 'c21', 'WHY'],
  },
};
const BLOCKS = {
  francais: [['lire', '📗', { fr: 'Lecture', en: 'Reading' }, 9], ['langue', '✏️', { fr: 'Orthographe et grammaire', en: 'Spelling & grammar' }, 7], ['dictee', '🎧', { fr: 'Dictée', en: 'Dictation' }, 6], ['ecrire', '✍️', { fr: 'J’écris / un livre', en: 'Writing / a book' }, 8]],
  anglais: [['catch', '📗', { fr: 'Catch : vocabulaire de l’unité', en: 'Catch: unit vocabulary' }, 9], ['langue', '🔤', { fr: 'Sons, phrases et grammaire', en: 'Sounds, sentences, grammar' }, 7], ['ecoute', '👂', { fr: 'Écouter, lire, épeler', en: 'Listen, read, spell' }, 6], ['parler', '💬', { fr: 'Parler ou écrire', en: 'Speak or write' }, 8]],
  chinois: [['pinyin', '🔤', { fr: 'Pinyin et tons', en: 'Pinyin & tones' }, 7], ['zi', '🀄', { fr: 'Caractères', en: 'Characters' }, 8], ['xie', '🖌️', { fr: 'Écrire', en: 'Writing' }, 8], ['du', '📜', { fr: 'Comptines, poèmes, pourquoi?', en: 'Rhymes, poems, why?' }, 7]],
};

const dayIndex = (d = today()) => Math.round((new Date(`${d}T12:00`) - new Date(`${PLAN_START}T12:00`)) / 864e5);
export const planStarted = (d = today()) => dayIndex(d) >= 0;

export function planFor(d = today()) {
  const i = Math.max(0, dayIndex(d));
  const subject = ORDER[i % 3];
  const n = Math.floor(i / 3);                                   // how many times this language came before
  const blocks = BLOCKS[subject].map(([key, icon, label, min], b) => {
    const seq = SEQ[subject][key];
    return { key, icon, label, min, target: seq[n % seq.length], id: `${d}|${subject}|${key}` };
  });
  return { date: d, subject, ...SUBJ[subject], blocks, done: blocks.filter((b) => isDone(b)).length };
}
const doneSet = () => (store.planDone ??= {});
const isDone = (b) => !!doneSet()[b.id];

// Called when an activity finishes: ticks the matching block of today's plan.
export function markPlan(target) {
  if (!planStarted()) return null;
  const p = planFor();
  const b = p.blocks.find((x) => x.target === target && !isDone(x));
  if (!b) return null;
  doneSet()[b.id] = 1;
  // keep only the last 60 days
  const keys = Object.keys(doneSet());
  if (keys.length > 400) for (const k of keys.slice(0, keys.length - 400)) delete doneSet()[k];
  save();
  return { block: b, all: planFor().done === p.blocks.length };
}

// Next 14 days, for the parents page.
export function upcoming(days = 14) {
  const start = planStarted() ? today() : PLAN_START;
  const out = [];
  for (let k = 0; k < days; k++) {
    const d = new Date(`${start}T12:00`); d.setDate(d.getDate() + k);
    const ds = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    out.push(planFor(ds));
  }
  return out;
}

// Home card. open(block) launches the activity (provided by main.js).
export function planCard(open, unitTitle) {
  const d = planStarted() ? today() : PLAN_START;
  const p = planFor(d);
  const soon = !planStarted();
  const total = p.blocks.reduce((a, b) => a + b.min, 0);
  return el('div', { class: `plan-card ${p.done === p.blocks.length ? 'all' : ''}` },
    el('div', { class: 'plan-head' },
      el('b', {}, '📅 ', tr({ fr: soon ? 'Plan de demain' : 'Plan du jour', en: soon ? 'Tomorrow’s plan' : 'Today’s plan' }), ' · ', p.icon, ' ', tr(p.t)),
      el('small', {}, `${p.done}/${p.blocks.length} · ~${total} min`)),
    el('div', { class: 'plan-blocks' }, p.blocks.map((b) => el('button', {
      class: `plan-block ${isDone(b) ? 'done' : ''}`, disabled: soon,
      onclick: () => open(b, p.subject),
    }, el('span', { class: 'pb-i' }, isDone(b) ? '✅' : b.icon),
    el('span', { class: 'pb-t' }, el('b', {}, tr(b.label)), el('small', {}, `${unitTitle(b.target, p.subject)} · ${b.min} min`))))),
  );
}
