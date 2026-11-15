// Local persistence (single child, iPad localStorage).
const KEY = 'petithibou.v1';

const defaults = () => ({
  settings: { name: '', lang: 'fr', sound: true, voice: true, rate: 0.9, perSession: 8 },
  // progress[unitId][level] = { stars, best, plays, correct, total, last }
  progress: {},
  stickers: [], // emoji collected (may repeat -> counts)
  daily: { date: '', done: false },
  log: [], // { d: 'YYYY-MM-DD', unit, level, score, total, ms }
  // game layer (2026-11-15)
  coins: 0,                 // plumes 🪶
  owned: [],                // shop item ids
  wear: {},                 // slot -> item id
  stats: {},                // counters for badges/missions
  streak: { last: '', n: 0, best: 0 },
  missions: { date: '', list: [] },
  records: {},              // `${unit}|${level}|${mode}` -> best score
  trophies: {},             // island id -> best level beaten
  badges: [],               // badge ids earned (shown once)
  pick: {},                 // unit id -> last chosen difficulty
  arts: { done: {}, fav: {} },
  why: {},
  books: {},                // book id -> { date, stars }                  // topic id -> date learned
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    const d = JSON.parse(raw);
    const base = defaults();
    return { ...base, ...d, settings: { ...base.settings, ...d.settings }, arts: { ...base.arts, ...d.arts } };
  } catch {
    return defaults();
  }
}

export const store = load();

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* private mode: keep in memory */ }
}

export function resetAll() {
  const d = defaults();
  d.settings = store.settings;
  Object.assign(store, d);
  save();
}

export const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export function levelStats(unitId, level) {
  return store.progress[unitId]?.[level] ?? null;
}

// All difficulties are open: the child picks freely (parent's choice, 2026-11-15).
export function isUnlocked(unitId, level) {
  return true;
}

export function recordSession(unitId, level, score, total, ms) {
  const pct = total ? score / total : 0;
  const stars = pct >= 0.9 ? 3 : pct >= 0.7 ? 2 : pct >= 0.5 ? 1 : 0;
  if (unitId) {
    const u = (store.progress[unitId] ??= {});
    const s = (u[level] ??= { stars: 0, best: 0, plays: 0, correct: 0, total: 0, last: '' });
    s.stars = Math.max(s.stars, stars);
    s.best = Math.max(s.best, pct);
    s.plays++;
    s.correct += score;
    s.total += total;
    s.last = today();
  }
  store.log.push({ d: today(), unit: unitId || 'daily', level, score, total, ms });
  if (store.log.length > 500) store.log.splice(0, store.log.length - 500);
  save();
  return stars;
}

// ---- « Mes mots de la semaine » : semaine du cahier « Semaines » de la classe ----
// Estimation : semaine 13 = semaine du lundi 2026-11-16, +1 chaque lundi (aucune semaine sautée).
// Le parent peut corriger (page Parents) : store.settings.frWeek = semaine à la date store.settings.frWeekAt, puis +1 chaque lundi.
export const FR_WEEK_REF = { week: 13, monday: '2026-11-16' };
const mondayOf = (d) => { const x = new Date(`${d}T12:00`); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x; };
export function frWeek(d = today()) {
  const s = store.settings;
  const base = s.frWeek && s.frWeekAt ? { week: s.frWeek, monday: s.frWeekAt } : FR_WEEK_REF;
  const n = base.week + Math.round((mondayOf(d) - mondayOf(base.monday)) / (7 * 864e5));
  return Math.max(1, Math.min(35, n));
}
export function setFrWeek(w) {
  store.settings.frWeek = Math.max(1, Math.min(35, w));
  store.settings.frWeekAt = today();
  save();
}
