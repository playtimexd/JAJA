// g3c21 reading: stories, g3c22 reading: descriptions/diaries/letters (both use `session`: one passage per round), g3c23 picture talk 看图说话 (hand).
import { STORIES } from './chinois-read-a.js';
import { INFO } from './chinois-read-b.js';
import { say, T, H, HC, mc, hand, take, pyWrong, finish, hanLen, chk } from './chinois-lib.js';

function parsePassage(src, id) {
  const lines = src.trim().split('\n');
  const p = { id, title: null, lines: [], qs: [] };
  let q = null;
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) continue;
    if (l[0] === '@') { const [h, py] = l.slice(1).split('|'); chk(h, py, `${id} title`); p.title = { hz: h, py }; continue; }
    if (l[0] === '?') { const [h, py] = l.slice(1).trim().split('|'); chk(h, py, `${id} question`); q = { q: { hz: h, py }, right: null, wrongs: [] }; p.qs.push(q); continue; }
    if (l[0] === '=' || (l[0] === 'x' && l[1] === ' ')) {
      const [h, py] = l.slice(1).trim().split('|'); chk(h, py, `${id} option`);
      if (l[0] === '=') q.right = { hz: h, py }; else q.wrongs.push({ hz: h, py });
      continue;
    }
    const [h, py] = l.split('|'); chk(h, py, `${id} line`);
    p.lines.push({ hz: h, py });
  }
  for (const [i, k] of p.qs.entries()) if (!k.right || k.wrongs.length < 2) throw new Error(`${id} question ${i} incomplete`);
  p.hz = `《${p.title.hz}》${p.lines.map((x) => x.hz).join('')}`;
  p.py = `${p.title.py} ${p.lines.map((x) => x.py).join(' ')}`;
  p.body = p.lines.map((x) => x.hz).join('');
  p.bodyPy = p.lines.map((x) => x.py).join(' ');
  p.n = hanLen(p.body);
  return p;
}

function readUnit(id, icon, title, pfeq, DATA) {
  const P = {};
  for (const L of [1, 2, 3]) P[L] = DATA[L].map((s, i) => parsePassage(s, `${id}-${L}-${i}`));
  const stim = (p) => ({ hz: p.hz, py: p.py });
  const tipOf = (p) => HC(H('再读一读：', 'zài dú yì dú'), { hz: p.body, py: p.bodyPy });
  const authored = (L, p) => p.qs.map((k, i) => mc(`${p.id}-q${i}`, k.q, { ...k.right }, k.wrongs.map((w) => ({ ...w })), { stimulus: stim(p), say: i === 0 ? say(p.body) : undefined, cols: 1, tip: tipOf(p) }));
  const auto = (L, p, R) => {
    const out = [];
    const others = P[L].filter((x) => x !== p);
    const longLine = p.lines.filter((l) => hanLen(l.hz) >= 6);
    if (longLine.length) {
      const k = longLine.length > 1 ? (R.int(0, longLine.length - 1)) : 0;
      const right = longLine[k];
      const wr = take(R, others.flatMap((x) => x.lines).filter((l) => hanLen(l.hz) >= 6), 3);
      out.push(mc(`${p.id}-s${k}`, H('哪句话在短文里？', 'nǎ jù huà zài duǎn wén lǐ'), { ...right }, wr.map((w) => ({ ...w })), { stimulus: stim(p), cols: 1, tip: tipOf(p) }));
    }
    const first = p.lines.slice(0, 3);
    if (first.length === 3 && first.every((l) => hanLen(l.hz) <= 20)) {
      out.push({ type: 'order', key: `${p.id}-ord`, prompt: H('把短文开头的句子排好顺序。', 'bǎ duǎn wén kāi tóu de jù zi pái hǎo shùn xù'), say: say(first.map((l) => l.hz).join('')), tiles: first.map((l) => ({ hz: l.hz, py: l.py })), joiner: '', tip: tipOf(p) });
    }
    if (others.length >= 2) out.push(mc(`${p.id}-t`, H('这篇短文的题目是什么？', 'zhè piān duǎn wén de tí mù shì shén me'), { hz: p.title.hz, py: p.title.py }, take(R, others, 3).map((x) => ({ hz: x.title.hz, py: x.title.py })), { stimulus: { hz: p.body, py: p.bodyPy }, cols: 1, tip: tipOf(p) }));
    const shorts = [...p.lines].sort((a, b) => hanLen(a.hz) - hanLen(b.hz)).filter((l) => hanLen(l.hz) >= 4).slice(0, 2);
    shorts.forEach((l, i) => {
      const wr = pyWrong(R, l.py, 3);
      if (wr.length >= 2) out.push(mc(`${p.id}-p${i}`, H('这句话的拼音哪个是对的？', 'zhè jù huà de pīn yīn nǎ gè shì duì de'), { py: l.py }, wr.map((w) => ({ py: w })), { stimulus: { hz: l.hz }, say: say(l.hz), cols: 1, tip: tipOf(p) }));
    });
    return out;
  };
  const all = (L, p, R) => [...authored(L, p), ...auto(L, p, R)];
  return finish({
    id, icon, title, pfeq,
    generate(L, R) { const lv = [1, 2, 3].includes(L) ? L : 2; const p = R.pick(P[lv]); return R.pick(all(lv, p, R)); },
    session(L, R) { const lv = [1, 2, 3].includes(L) ? L : 2; const p = R.pick(P[lv]); return authored(lv, p); },
    allSay() { return [1, 2, 3].flatMap((L) => P[L].flatMap((p) => [say(p.body), ...p.lines.map((l) => say(l.hz))])); },
    passages: P,
  });
}

export const g3c21 = readUnit('g3c21', '📖', { ...T('Lire une histoire 读故事', 'Reading a story 读故事'), zh: H('读故事', 'dú gù shì') }, 'Chinois — lecture : de courtes histoires originales avec questions de compréhension (2e–3e année)', STORIES);
export const g3c22 = readUnit('g3c22', '📰', { ...T('Lire pour comprendre 读一读', 'Reading to learn 读一读'), zh: H('读一读', 'dú yì dú') }, 'Chinois — lecture : description, journal, lettre, avis (2e–3e année)', INFO);

/* ======================= g3c23 — 看图说话 ======================= */
const SCENES = `
🐱🥛|小猫 xiǎo māo|牛奶 niú nǎi
🐶🦴|小狗 xiǎo gǒu|骨头 gǔ tou
🌧️☂️👧|下雨 xià yǔ|雨伞 yǔ sǎn
⛄❄️🧒|雪人 xuě rén|堆 duī
🍎🧺👩|苹果 píng guǒ|篮子 lán zi
🚲🧒🌳|自行车 zì xíng chē|公园 gōng yuán
🎂🕯️👦|蛋糕 dàn gāo|生日 shēng rì
📚🧑‍🏫🏫|老师 lǎo shī|教室 jiào shì
🐦🌳🐛|小鸟 xiǎo niǎo|虫子 chóng zi
🌊🏖️🧒|沙滩 shā tān|海浪 hǎi làng
🍜🥢👨|面条 miàn tiáo|筷子 kuài zi
🌙⭐🛏️|月亮 yuè liang|睡觉 shuì jiào
🎨🖌️👧|画画 huà huà|颜色 yán sè
⚽🥅👦|足球 zú qiú|踢 tī
🐟🎣👴|钓鱼 diào yú|河边 hé biān
🌻☀️🐝|向日葵 xiàng rì kuí|蜜蜂 mì fēng
🚌🏫🧒|汽车 qì chē|上学 shàng xué
🍉🧒🪑|西瓜 xī guā|吃 chī
🧹🧽👩|打扫 dǎ sǎo|干净 gān jìng
🐘💦🌴|大象 dà xiàng|洗澡 xǐ zǎo
🦆🏞️🐥|鸭子 yā zi|池塘 chí táng
⛷️🏔️👦|滑雪 huá xuě|山坡 shān pō
🥕🐰🌱|兔子 tù zi|胡萝卜 hú luó bo
🏊🧒🌞|游泳 yóu yǒng|夏天 xià tiān
📖👵🧒|奶奶 nǎi nai|讲故事 jiǎng gù shi
🍳🥚👨‍🍳|做饭 zuò fàn|鸡蛋 jī dàn
🎁🎄👧|礼物 lǐ wù|树 shù
🪁🌬️🧒|风筝 fēng zheng|风 fēng
🧸🛏️👶|玩具 wán jù|宝宝 bǎo bao
🌈🌧️🐸|彩虹 cǎi hóng|青蛙 qīng wā
🍂🍁🚶|落叶 luò yè|秋天 qiū tiān
🛒🥬👩|超市 chāo shì|买菜 mǎi cài
🎵🎹👧|钢琴 gāng qín|弹 tán
🏥🧑‍⚕️🤒|医生 yī shēng|生病 shēng bìng
🌷🪴👧|浇花 jiāo huā|花盆 huā pén
🐒🍌🌴|猴子 hóu zi|香蕉 xiāng jiāo
🚒🔥👨‍🚒|消防车 xiāo fáng chē|着火 zháo huǒ
🍲🥣👨‍👩‍👧|一家人 yì jiā rén|吃饭 chī fàn
🐢🐇🏁|乌龟 wū guī|兔子 tù zi
✈️🧳👨‍👩‍👧‍👦|飞机 fēi jī|旅行 lǚ xíng
`.trim().split('\n').map((l, i) => {
  const [em, a, b] = l.split('|');
  const w = (x) => { const [h, ...p] = x.trim().split(' '); const py = p.join(' '); chk(h, py, 'scene'); return { hz: h, py }; };
  return { i, em, a: w(a), b: w(b) };
});
if (new Set(SCENES.map((s) => s.em)).size !== SCENES.length) throw new Error('duplicate scene');
const g3c23 = finish({
  id: 'g3c23', icon: '🖼️', title: { ...T('Regarde et raconte 看图说话', 'Look and tell 看图说话'), zh: H('看图说话', 'kàn tú shuō huà') },
  pfeq: 'Chinois — expression écrite : décrire une image en une phrase, quelques phrases ou un petit texte (2e–3e année)',
  generate(L, R) {
    const s = R.pick(SCENES);
    const hints = [H('可以用：', 'kě yǐ yòng'), s.a, '、', s.b, '。'];
    if (L === 1) return hand({ mode: 'sentence', key: `g3c23-1-${s.i}`, prompt: HC(H('看图，写一句话：谁？在做什么？', 'kàn tú xiě yí jù huà shuí zài zuò shén me'), ...hints), stimulus: { emoji: s.em }, say: say(`${s.a.hz}，${s.b.hz}`), words: [s.a.hz], minWords: 6, lines: 2 });
    if (L === 2) return hand({ mode: 'composition', key: `g3c23-2-${s.i}`, prompt: HC(H('看图，写两三句话：谁？在哪里？在做什么？', 'kàn tú xiě liǎng sān jù huà shuí zài nǎ lǐ zài zuò shén me'), ...hints), stimulus: { emoji: s.em }, say: say(`${s.a.hz}，${s.b.hz}`), minWords: 14, lines: 3 });
    return hand({ mode: 'composition', key: `g3c23-3-${s.i}`, prompt: HC(H('看图，写一个小故事（四五句话）：先怎么样，后来怎么样，最后怎么样？也写写你的心情。', 'kàn tú xiě yí gè xiǎo gù shì sì wǔ jù huà xiān zěn me yàng hòu lái zěn me yàng zuì hòu zěn me yàng yě xiě xie nǐ de xīn qíng'), ...hints), stimulus: { emoji: s.em }, say: say(`${s.a.hz}，${s.b.hz}`), minWords: 28, lines: 5 });
  },
  allSay() { return SCENES.map((s) => say(`${s.a.hz}，${s.b.hz}`)); },
});
export { g3c23 };
export const units = [g3c21, g3c22, g3c23];
