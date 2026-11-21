// g3c1–g3c10 themed character units, g3c24 stroke-order writing (type `write`), g3c25 田字格 words (type `hand`).
import { THEMES, CHARS, CHAR, WORDS } from './chinois-vocab.js';
import { say, T, H, HC, hand, mc, take, uniq, pyWrong, LOOKMAP, finish, hanLen, isHan, nOpt } from './chinois-lib.js';

const oc = (c, py = true) => (py ? { hz: c.hz, py: c.py, say: say(c.hz) } : { hz: c.hz, say: say(c.hz) });
const ow = (w, py = true) => (py ? { hz: w.hz, py: w.py } : { hz: w.hz });
// tip: the character and the words it makes (组词), no French/English gloss
const wordsTip = (c) => HC({ hz: c.hz, py: c.py }, H('，组词：', 'zǔ cí'), ...c.words.flatMap((w, i) => (i ? ['、', w] : [w])), '。');
const blank = (w, ch) => {
  const hzs = [...w.hz]; const i = hzs.indexOf(ch);
  const pos = hzs.slice(0, i).filter(isHan).length;
  hzs[i] = '＿';
  const sy = w.py.split(' '); sy.splice(pos, 1);
  return { hz: hzs.join(''), py: sy.join(' ') };
};

// distractor characters: look-alikes first, then others of the theme, then any
function otherChars(R, c, pool, n) {
  const out = [];
  const g = LOOKMAP[c.hz];
  if (g) for (const x of R.shuffle(g.filter((y) => y.hz !== c.hz))) if (out.length < Math.min(2, n)) out.push(x);
  for (const x of R.shuffle(pool)) { if (out.length >= n) break; if (x.hz !== c.hz && !out.some((y) => y.hz === x.hz)) out.push(x); }
  return out;
}
const otherWords = (R, c, n) => take(R, WORDS.filter((w) => !w.hz.includes(c.hz)), n);
const pickWord = (R, c, wi) => { const i = wi ?? R.int(0, c.words.length - 1); return [c.words[i], i]; };

const Q = {
  hearChar(R, c, pool, L) {
    const d = otherChars(R, c, pool, nOpt(L));
    return mc(`hc-${c.hz}`, H('听一听，你听到的是哪个字？', 'tīng yì tīng nǐ tīng dào de shì nǎ gè zì'), oc(c, L === 1), d.map((x) => oc(x, L === 1)), { say: say(c.hz), cols: L === 1 ? 3 : 2, tip: wordsTip(c) });
  },
  // hear a word, find the new character inside it (meaning through the spoken word, no gloss)
  charMeaning(R, c, pool, L) {
    const [w] = pickWord(R, c);
    const d = otherChars(R, c, pool, nOpt(L)).filter((x) => !w.hz.includes(x.hz)).slice(0, nOpt(L));
    return mc(`cm-${c.hz}-${w.hz}`, H('听一听这个词，词里有哪个字？', 'tīng yì tīng zhè gè cí cí lǐ yǒu nǎ gè zì'), oc(c, L === 1), d.map((x) => oc(x, L === 1)), { say: say(w.hz), stimulus: L === 1 ? { emoji: '🎧' } : undefined, cols: L === 1 ? 3 : 2, tip: wordsTip(c) });
  },
  // read the pinyin, pick the character (no homophone among the options)
  meaningChar(R, c, pool, L) {
    const d = otherChars(R, c, pool, nOpt(L) + 2).filter((x) => x.py !== c.py).slice(0, nOpt(L));
    return mc(`mc-${c.hz}`, H('看拼音，选出对的字。', 'kàn pīn yīn xuǎn chū duì de zì'), oc(c, false), d.map((x) => oc(x, false)), { stimulus: { text: c.py }, say: say(c.hz), cols: L === 1 ? 3 : 2, tip: wordsTip(c) });
  },
  charPinyin(R, c, pool) {
    const wr = pyWrong(R, c.py, 3);
    const ex = take(R, pool.filter((x) => x.py !== c.py), 3).map((x) => x.py);
    return mc(`cp-${c.hz}`, H('这个字的拼音是什么？', 'zhè gè zì de pīn yīn shì shén me'), { py: c.py }, [...wr, ...ex].slice(0, 3).map((p) => ({ py: p })), { stimulus: { hz: c.hz }, say: say(c.hz), cols: 2, tip: wordsTip(c) });
  },
  completeWord(R, c, pool, L, wi) {
    const [w, i] = pickWord(R, c, wi);
    const d = otherChars(R, c, pool, 3);
    const b = blank(w, c.hz);
    return mc(`cw-${c.hz}-${i}`, H('听一听，哪个字可以填进词语里？', 'tīng yì tīng nǎ gè zì kě yǐ tián jìn cí yǔ lǐ'), oc(c, L === 1), d.map((x) => oc(x, L === 1)), { stimulus: L === 3 ? { hz: b.hz } : b, say: say(w.hz), cols: 2, tip: wordsTip(c) });
  },
  wordWith(R, c, pool, L, wi) {
    const [w, i] = pickWord(R, c, wi);
    const d = otherWords(R, c, 3);
    return mc(`ww-${c.hz}-${i}`, H('哪个词里有这个字？', 'nǎ gè cí lǐ yǒu zhè gè zì'), ow(w, L < 3), d.map((x) => ow(x, L < 3)), { stimulus: { hz: c.hz, py: c.py }, say: say(c.hz), cols: 2, tip: wordsTip(c) });
  },
  hearWordPy(R, c, pool, L, wi) {
    const [w, i] = pickWord(R, c, wi);
    return mc(`wp-${c.hz}-${i}`, H('听一听，这个词的拼音是什么？', 'tīng yì tīng zhè gè cí de pīn yīn shì shén me'), { py: w.py }, pyWrong(R, w.py, 3).map((p) => ({ py: p })), { stimulus: { hz: w.hz }, say: say(w.hz), cols: 2, tip: wordsTip(c) });
  },
  hearWord(R, c, pool, L, wi) {
    const [w, i] = pickWord(R, c, wi);
    const sameFirst = WORDS.filter((x) => x.hz !== w.hz && (x.hz[0] === w.hz[0] || x.hz.endsWith(w.hz.slice(-1))));
    const d = uniq([...take(R, sameFirst, 2), ...take(R, WORDS.filter((x) => x.hz !== w.hz), 3)].map((x) => ow(x, false))).slice(0, 3);
    return mc(`hw-${c.hz}-${i}`, H('听一听，你听到的是哪个词？', 'tīng yì tīng nǐ tīng dào de shì nǎ gè cí'), ow(w, false), d, { say: say(w.hz), cols: 2, tip: wordsTip(c) });
  },
};
const LEVELS = {
  1: ['hearChar', 'charMeaning', 'meaningChar'],
  2: ['hearChar', 'charPinyin', 'completeWord', 'completeWord', 'wordWith', 'meaningChar'],
  3: ['completeWord', 'wordWith', 'hearWordPy', 'hearWord', 'charPinyin', 'charMeaning'],
};

const themeUnit = (n, th, pfeq) => finish({
  id: `g3c${n}`, icon: th.icon, title: { ...T(`${th.fr} · ${th.zh}`, `${th.en} · ${th.zh}`), zh: { hz: th.zh, py: th.zhPy } }, pfeq,
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const c = R.pick(th.chars);
    return Q[R.pick(LEVELS[lvl])](R, c, th.chars, lvl);
  },
  allSay() { return th.chars.flatMap((c) => [say(c.hz), ...c.words.map((w) => say(w.hz))]); },
});

const PF = 'Chinois — caractères (2e à 3e année, programme chinois) : ';
export const vocabUnits = THEMES.map((th, i) => themeUnit(i + 1, th, `${PF}${th.fr.toLowerCase()}`));

/* ================= g3c24 — stroke-order writing ================= */
const WL = {
  1: '厅勺扫邻叔姑己台圾柜场纸尺考试练级词文作业术艺育礼比认阴季阵岛沙泥芽苗谷坡舌肩肚印皮肤血伸龟蚁苍网孔尾巴爪羽壳贝狐豆茄枣饮味炒肉咸浅半双次许分刻年岁号久刚始终抱抓扔爬切告诉抬抄投奔扶念底顶附市乡邮局厂转直达往沿乖劳诚实安吵乱净奇怪幸伤',
  2: '室被盆理客亲咱垃铺窝梳桶窗锅婆您梯课堂胶答教语科馆敬选奖度洞洋浪原野根菊浓峰晒凉森温湿湖眉脖指拳脚盖骨胃病疼药健康脑袋痛狮狼狸蛇蚂蚊蝇雀翅蚪鸽雁蛛粉姜柿柠尝栗料茶煮烤淡倍第秒晨昨常总棕深推掉接挤挥追钻涂挖浇栽捉喊桥铁城巷绕圈圆离剧街港超植塔越路勇架脏臭急盼骄羞笨舒情敢',
  3: '筷箱擦整舅篮操橡墨算题旗赛雷暖暴溪滩膀臂腰膝睁嗓躺蹲鲸鲨蜂蜘鹰蝌螃蟹粥酸辣椒酱醋薯葱蒜萄葡橙橘檬渴蒸紫鲜剩暑假寒握摸摇敲鼓踢躲叠摘滚警察博聪懂懒勤愁愿感傲',
};
{
  const list = [...WL[1], ...WL[2], ...WL[3]];
  const all = new Set(list);
  const bad = [...all].filter((c) => !CHAR[c]);
  if (list.length !== all.size || bad.length) throw new Error(`write lists: dup ${list.length - all.size} unknown ${bad.join('')}`);
  for (const c of CHARS) if (!all.has(c.hz)) WL[2] += c.hz;
}
const writeQ = (c) => ({
  type: 'write', key: `g3c24-${c.hz}`,
  prompt: HC(H('写一写：', 'xiě yì xiě'), c.words[0], H('的', 'de'), { hz: c.hz, py: c.py }, '。'),
  say: say(c.words[0].hz), char: c.hz, py: c.py, tip: wordsTip(c),
});
const g3c24 = finish({
  id: 'g3c24', icon: '🖌️', title: { ...T('Écrire les caractères 写字', 'Writing characters 写字'), zh: H('写字', 'xiě zì') },
  pfeq: `${PF}ordre des traits et écriture des nouveaux caractères`,
  generate(L, R) { return writeQ(CHAR[R.pick([...WL[[1, 2, 3].includes(L) ? L : 2]])]); },
  allSay() { return CHARS.map((c) => say(c.words[0].hz)); },
});

/* ================= g3c25 — 田字格 words ================= */
const DP = H('听一听，把词语写在格子里。', 'tīng yì tīng bǎ cí yǔ xiě zài gé zi lǐ');
const w2 = WORDS.filter((w) => hanLen(w.hz) === 2);
const w3 = WORDS.filter((w) => hanLen(w.hz) >= 3);
const g3c25 = finish({
  id: 'g3c25', icon: '✍️', title: { ...T('Les mots dans la case 田字格', 'Words in the grid 田字格'), zh: H('田字格', 'tián zì gé') },
  pfeq: `${PF}écrire des mots (田字格)`,
  generate(L, R) {
    if (L === 1) { const w = R.pick(w2); return hand({ mode: 'dictation', key: `g3c25-1-${w.hz}`, prompt: H('照着写，把词语写在格子里。', 'zhào zhe xiě bǎ cí yǔ xiě zài gé zi lǐ'), stimulus: { hz: w.hz, py: w.py }, say: say(w.hz), expected: w.hz, lines: 1 }); }
    if (L === 2) { const w = R.pick(w2); return hand({ mode: 'dictation', key: `g3c25-2-${w.hz}`, prompt: H('听一听，看拼音，写出词语。', 'tīng yì tīng kàn pīn yīn xiě chū cí yǔ'), stimulus: { text: w.py }, say: say(w.hz), expected: w.hz, lines: 1 }); }
    const w = R.chance(0.35) ? R.pick(w3) : R.pick(w2);
    return hand({ mode: 'dictation', key: `g3c25-3-${w.hz}`, prompt: DP, say: say(w.hz), expected: w.hz, lines: 1 });
  },
  allSay() { return WORDS.map((w) => say(w.hz)); },
});

export const units = [...vocabUnits, g3c24, g3c25];
