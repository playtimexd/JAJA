// « Plan du jour »: one subject per day (français → English → mathématique), about 30 minutes, 4 short blocks.
// Français : « Mots de la semaine » et « Dictée » suivent le cahier de la classe (js/content/francais4.js, semaine = frWeek()).
// Starts 2026-11-16 (Chinese is not part of the plan — parent's choice). Each block points to an existing activity; it is ticked when that activity is finished today.
import { el } from './util.js';
import { store, save, today, levelStats, frWeek } from './store.js';
import { unitForWeek } from './content/francais4.js';
import { tr } from './i18n.js';

export const PLAN_START = '2026-11-16';
const ORDER = ['francais', 'anglais', 'math'];
const SUBJ = {
  francais: { icon: '📖', t: { fr: 'Français', en: 'French' } },
  anglais: { icon: '🍁', t: { fr: 'Anglais', en: 'English' } },
  math: { icon: '🧮', t: { fr: 'Mathématique', en: 'Math' } },
};
// Unit sequences each block walks through (one step every time that language comes back, i.e. every 3 days).
const SEQ = {
  francais: {
    lire: ['f14', 'f8'],
    langue: ['WEEK'],          // « Mes mots de la semaine » : bloc courant du cahier de la classe (Facile/Moyen)
    dictee: ['WEEK'],          // même bloc, niveau Difficile (dictée + « écris 2 autres mots »)
    ecrire: ['f17', 'f16', 'f18', 'BOOK'],
  },
  anglais: {
    catch: ['k0', 'k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9'],
    langue: ['e21', 'e22', 'e23', 'e24', 'e25', 'e26', 'e27', 'e28', 'e29', 'e30', 'e31', 'e32', 'e33', 'e34'],
    ecoute: ['e19', 'e20', 'e35'],
    parler: ['TALK', 'e37', 'e36', 'e38'],
  },
  math: {
    nombres: ['m1', 'm2', 'm3', 'm4', 'm8'],
    calcul: ['m5', 'm6', 'm14', 'm13'],
    espace: ['m9', 'm10', 'm11', 'm15', 'm16', 'm12'],
    probl: ['m7', 'm17', 'm18', 'm19'],
  },
};
const BLOCKS = {
  francais: [['lire', '📗', { fr: 'Lecture', en: 'Reading' }, 9], ['langue', '📅', { fr: 'Mes mots de la semaine', en: 'This week’s words' }, 7], ['dictee', '🎧', { fr: 'Dictée de la semaine', en: 'This week’s dictation' }, 6], ['ecrire', '✍️', { fr: 'J’écris / un livre', en: 'Writing / a book' }, 8]],
  anglais: [['catch', '📗', { fr: 'Catch : vocabulaire de l’unité', en: 'Catch: unit vocabulary' }, 9], ['langue', '🔤', { fr: 'Sons, phrases et grammaire', en: 'Sounds, sentences, grammar' }, 7], ['ecoute', '👂', { fr: 'Écouter, lire, épeler', en: 'Listen, read, spell' }, 6], ['parler', '💬', { fr: 'Parler ou écrire', en: 'Speak or write' }, 8]],
  math: [['nombres', '🔢', { fr: 'Les nombres', en: 'Numbers' }, 6], ['calcul', '➕', { fr: 'Calcul', en: 'Calculation' }, 8], ['espace', '📐', { fr: 'Fractions, géométrie, mesure', en: 'Fractions, geometry, measuring' }, 8], ['probl', '🕵️', { fr: 'Je résous un problème', en: 'Problem solving' }, 8]],
};

const dayIndex = (d = today()) => Math.round((new Date(`${d}T12:00`) - new Date(`${PLAN_START}T12:00`)) / 864e5);
export const planStarted = (d = today()) => dayIndex(d) >= 0;

export function planFor(d = today()) {
  const i = Math.max(0, dayIndex(d));
  const subject = ORDER[i % 3];
  const n = Math.floor(i / 3);                                   // how many times this language came before
  const blocks = BLOCKS[subject].map(([key, icon, label, min], b) => {
    const seq = SEQ[subject][key];
    let target = seq[n % seq.length], level = null, cap = null;
    if (target === 'WEEK') { target = unitForWeek(frWeek(d)); if (key === 'dictee') level = 3; else cap = 2; }
    return { key, icon, label, min, target, level, cap, id: `${d}|${subject}|${key}` };
  });
  return { date: d, subject, ...SUBJ[subject], blocks, done: blocks.filter((b) => isDone(b)).length };
}
const doneSet = () => (store.planDone ??= {});
const isDone = (b) => !!doneSet()[b.id];

// Called when an activity finishes: ticks the matching block of today's plan.
// Two blocks may share a unit (langue + dictée = this week's words): a block with a fixed level takes that level first.
export function markPlan(target, level) {
  if (!planStarted()) return null;
  const p = planFor();
  const open = p.blocks.filter((x) => x.target === target && !isDone(x));
  const b = open.find((x) => x.level != null && x.level === level) || open.find((x) => x.level == null) || open[0];
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
