// 3e année Chinese (中文 · 部编版 一年级下 → 二年级上 level, for a heritage learner): ~330 new characters, radicals, look-alikes,
// polyphones, pinyin, measure words, sentences, reading, picture talk, writing. Units g3c1 … g3c25.
import { units as vocab } from './chinois-units-vocab.js';   // g3c1–10 themes, g3c24 write, g3c25 田字格
import { units as sound } from './chinois-units-sound.js';   // g3c11–13
import { units as pinyin } from './chinois-units-pinyin.js'; // g3c14–16
import { units as words } from './chinois-units-words.js';   // g3c17–20
import { units as read } from './chinois-units-read.js';     // g3c21–23

const byId = Object.fromEntries([...vocab, ...sound, ...pinyin, ...words, ...read].map((u) => [u.id, u]));
const order = Array.from({ length: 25 }, (_, i) => `g3c${i + 1}`);
export const units = order.map((id) => byId[id]);
if (units.some((u) => !u)) throw new Error('missing Chinese unit');

const T = (fr, en) => ({ fr, en });
export const SECTIONS = [
  { id: 'g3-sz', icon: '🀄', t: T('Nouveaux caractères 识字', 'New characters 识字'), ids: order.slice(0, 10), boss: '🦁' },
  { id: 'g3-bs', icon: '🧱', t: T('Radicaux, formes proches et deux sons 偏旁·形近字·多音字', 'Radicals, look-alikes, two readings 偏旁·形近字·多音字'), ids: ['g3c11', 'g3c12', 'g3c13'], boss: '🐲' },
  { id: 'g3-py', icon: '🎼', t: T('Pinyin et tons 拼音', 'Pinyin and tones 拼音'), ids: ['g3c14', 'g3c15', 'g3c16'], boss: '🦜' },
  { id: 'g3-cy', icon: '💬', t: T('Mots et phrases 词语和句子', 'Words and sentences 词语和句子'), ids: ['g3c17', 'g3c18', 'g3c19', 'g3c20'], boss: '🐙' },
  { id: 'g3-yd', icon: '📖', t: T('Lecture et images 阅读', 'Reading and pictures 阅读'), ids: ['g3c21', 'g3c22', 'g3c23'], boss: '🐘' },
  { id: 'g3-xz', icon: '🖌️', t: T('Écrire 写字', 'Writing 写字'), ids: ['g3c24', 'g3c25'], boss: '🐯' },
];
