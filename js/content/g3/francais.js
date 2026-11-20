// Petit Hibou — Français, 3e année (2e cycle du primaire, Québec).
// Suit la « Progression des apprentissages au primaire – Français, langue d’enseignement » (MEQ), 3e année,
// et la « Liste orthographique » du MEQ (mots de 3e année, js/content/meq-liste.js).
// Unités g3f1 → g3f42, réparties dans les fichiers francais-*.js. Facile = reconnaître ; Moyen = choisir / transformer ;
// Difficile = appliquer dans des phrases plus longues, écrire à la main. Chaque question porte un `tip` court et gentil.
// Textes, phrases et poèmes originaux. Français du Québec (déjeuner / dîner / souper, tuque, mitaines, dépanneur…).
import { units as LECT } from './francais-lecture.js';
import { units as ORTHO } from './francais-ortho.js';
import { units as GRAM } from './francais-gram.js';
import { units as CONJ } from './francais-conj.js';
import { units as VOC } from './francais-voc.js';
import { units as ECRIRE } from './francais-ecrire.js';

const byNum = (a, b) => Number(a.id.slice(3)) - Number(b.id.slice(3));
export const units = [...LECT, ...ORTHO, ...GRAM, ...CONJ, ...VOC, ...ECRIRE].sort(byNum);

const ids = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => `g3f${a + i}`);
export const SECTIONS = [
  { id: 'lect', icon: '📚', t: { fr: 'Lecture', en: 'Reading' }, ids: ids(1, 6), boss: '🐲' },
  { id: 'liste', icon: '📝', t: { fr: 'Les mots de la liste', en: 'Spelling list words' }, ids: ids(7, 12), boss: '🦖' },
  { id: 'ortho', icon: '🔍', t: { fr: 'Orthographe', en: 'Spelling rules' }, ids: ids(13, 19), boss: '🦈' },
  { id: 'gram', icon: '✏️', t: { fr: 'Grammaire', en: 'Grammar' }, ids: ids(20, 25), boss: '🐙' },
  { id: 'conj', icon: '⏳', t: { fr: 'Conjugaison', en: 'Verb tenses' }, ids: ids(26, 32), boss: '🦁' },
  { id: 'voc', icon: '💬', t: { fr: 'Vocabulaire', en: 'Vocabulary' }, ids: ids(33, 38), boss: '🐊' },
  { id: 'ecrire', icon: '✍️', t: { fr: 'J’écris', en: 'Writing' }, ids: ids(39, 42), boss: '🦉' },
];
