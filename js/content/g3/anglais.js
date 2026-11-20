// Petit Hibou — Grade 3 English (ESL, Québec PFEQ cycle 2 year 1). Units g3e1…g3e33. Original content, Canadian English.
// Files: anglais-core.js (helpers), anglais-read.js, anglais-vocab.js, anglais-grammar.js, anglais-talk.js, anglais-write.js.
import { readUnits } from './anglais-read.js';
import { vocabUnits } from './anglais-vocab.js';
import { grammarUnits } from './anglais-grammar.js';
import { talkUnits } from './anglais-talk.js';
import { writeUnits } from './anglais-write.js';

export const units = [...readUnits, ...vocabUnits, ...grammarUnits, ...talkUnits, ...writeUnits];

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => `g3e${a + i}`);
export const SECTIONS = [
  { id: 'g3-read', icon: '📖', t: { fr: 'Je lis', en: 'Reading' }, ids: range(1, 5), boss: '🐉' },
  { id: 'g3-words1', icon: '🔤', t: { fr: 'Les mots de tous les jours', en: 'Everyday words' }, ids: range(6, 10), boss: '🦖' },
  { id: 'g3-words2', icon: '🌍', t: { fr: 'Les mots du monde', en: 'Words of the world' }, ids: range(11, 16), boss: '🦁' },
  { id: 'g3-verbs', icon: '🏃', t: { fr: 'Grammaire : les verbes', en: 'Grammar: verbs' }, ids: range(17, 20), boss: '🐙' },
  { id: 'g3-sentences', icon: '✍️', t: { fr: 'Grammaire : les phrases', en: 'Grammar: sentences' }, ids: range(21, 26), boss: '🦈' },
  { id: 'g3-talk', icon: '🎧', t: { fr: 'J’écoute et je parle', en: 'Listening & speaking' }, ids: range(27, 29), boss: '🦜' },
  { id: 'g3-write', icon: '📝', t: { fr: 'J’écris', en: 'Writing' }, ids: range(30, 33), boss: '🦉' },
];
