// 3e année Chinese — parsed vocabulary (≈330 new characters in 10 themes) shared by the g3 Chinese units.
import { RAW_A } from './chinois-vocab-a.js';
import { RAW_B } from './chinois-vocab-b.js';

export const isHan = (c) => /\p{Script=Han}/u.test(c);
export const hanLen = (s) => [...s].filter(isHan).length;

export const THEMES = [
  { id: 'home', icon: '🏠', fr: 'La maison et la famille', en: 'Home & family', zh: '家和家人', zhPy: 'jiā hé jiā rén', raw: RAW_A.home },
  { id: 'school', icon: '🏫', fr: 'L’école', en: 'School', zh: '学校', zhPy: 'xué xiào', raw: RAW_A.school },
  { id: 'weather', icon: '🌦️', fr: 'Le temps et la nature', en: 'Weather & nature', zh: '天气和大自然', zhPy: 'tiān qì hé dà zì rán', raw: RAW_A.weather },
  { id: 'body', icon: '🧍', fr: 'Le corps et la santé', en: 'Body & health', zh: '身体和健康', zhPy: 'shēn tǐ hé jiàn kāng', raw: RAW_A.body },
  { id: 'animals', icon: '🦁', fr: 'Les animaux', en: 'Animals', zh: '动物', zhPy: 'dòng wù', raw: RAW_A.animals },
  { id: 'food', icon: '🍜', fr: 'Les aliments', en: 'Food', zh: '食物', zhPy: 'shí wù', raw: RAW_B.food },
  { id: 'time', icon: '⏰', fr: 'Couleurs, nombres et temps', en: 'Colours, numbers & time', zh: '颜色、数字和时间', zhPy: 'yán sè shù zì hé shí jiān', raw: RAW_B.time },
  { id: 'actions', icon: '🤸', fr: 'Les actions', en: 'Actions', zh: '动作', zhPy: 'dòng zuò', raw: RAW_B.actions },
  { id: 'places', icon: '🏙️', fr: 'Lieux et déplacements', en: 'Places & directions', zh: '地方和方向', zhPy: 'dì fang hé fāng xiàng', raw: RAW_B.places },
  { id: 'mind', icon: '💭', fr: 'Caractère et sentiments', en: 'Character & feelings', zh: '性格和心情', zhPy: 'xìng gé hé xīn qíng', raw: RAW_B.mind },
];

const seen = new Set();
for (const th of THEMES) {
  th.chars = th.raw.trim().split('\n').map((line) => {
    const [hz, py, fr, en, ws] = line.split('|').map((s) => s.trim());
    if ([...hz].length !== 1 || !isHan(hz) || py.split(/\s+/).length !== 1) throw new Error(`bad char line: ${line}`);
    if (seen.has(hz)) throw new Error(`duplicate char ${hz}`);
    seen.add(hz);
    const words = ws.split(';').map((w) => {
      const [whz, ...p] = w.trim().split(/\s+/);
      const wpy = p.join(' ');
      if (hanLen(whz) !== wpy.split(/\s+/).length) throw new Error(`pinyin count in word ${whz} ${wpy}`);
      if (!whz.includes(hz)) throw new Error(`word ${whz} lacks ${hz}`);
      return { hz: whz, py: wpy };
    });
    return { hz, py, fr, en, words, theme: th.id };
  });
}
export const CHARS = THEMES.flatMap((t) => t.chars);
export const CHAR = Object.fromEntries(CHARS.map((c) => [c.hz, c]));
// every distinct word of the vocabulary
const wseen = new Set();
export const WORDS = CHARS.flatMap((c) => c.words.map((w) => ({ ...w, of: c.hz }))).filter((w) => (wseen.has(w.hz) ? false : (wseen.add(w.hz), true)));
