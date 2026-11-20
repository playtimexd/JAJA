// Mathématique — 3e année (MEQ, Progression des apprentissages, 2e cycle). Units g3m1 → g3m32, split by domain:
// math-nombres (g3m1–8), math-operations (g3m9–17), math-geometrie (g3m18–22), math-mesure (g3m23–28),
// math-donnees (g3m29–32: statistique, probabilité, problèmes). Shared helpers/drawings in math-lib.js.
import { units as nombres } from './math-nombres.js';
import { units as operations } from './math-operations.js';
import { units as geometrie } from './math-geometrie.js';
import { units as mesure } from './math-mesure.js';
import { units as donnees } from './math-donnees.js';

export const units = [...nombres, ...operations, ...geometrie, ...mesure, ...donnees];

const ids = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => `g3m${a + i}`);
export const SECTIONS = [
  { id: 'nombres', icon: '🔢', t: { fr: 'Les nombres', en: 'Numbers' }, ids: ids(1, 8), boss: '🐲' },
  { id: 'addsub', icon: '➕', t: { fr: 'Addition, soustraction et calcul mental', en: 'Adding, subtracting, mental math' }, ids: ['g3m9', 'g3m10', 'g3m15', 'g3m16', 'g3m17'], boss: '🦖' },
  { id: 'multdiv', icon: '✖️', t: { fr: 'Multiplication et division', en: 'Multiplication and division' }, ids: ids(11, 14), boss: '🐙' },
  { id: 'geo', icon: '📐', t: { fr: 'Géométrie', en: 'Geometry' }, ids: ids(18, 22), boss: '🦁' },
  { id: 'mesure', icon: '📏', t: { fr: 'Mesure, temps et argent', en: 'Measurement, time, money' }, ids: ids(23, 28), boss: '🦈' },
  { id: 'stats', icon: '📊', t: { fr: 'Statistique et probabilité', en: 'Data and probability' }, ids: ['g3m29', 'g3m30'], boss: '🐯' },
  { id: 'probl', icon: '🕵️', t: { fr: 'Je résous des problèmes', en: 'Problem solving' }, ids: ['g3m31', 'g3m32'], boss: '🐉' },
];
