// g3c21 reading: stories, g3c22 reading: descriptions/diaries/letters (both use `session`: one passage per round), g3c23 picture talk 看图说话 (hand).
import { STORIES } from './chinois-read-a.js';
import { INFO } from './chinois-read-b.js';
import { say, T, mc, hand, take, pyWrong, finish, hanLen, chk } from './chinois-lib.js';

function parsePassage(src, id) {
  const lines = src.trim().split('\n');
  const p = { id, title: null, lines: [], qs: [] };
  let q = null;
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) continue;
    if (l[0] === '@') { const [h, py] = l.slice(1).split('|'); chk(h, py, `${id} title`); p.title = { hz: h, py }; continue; }
    if (l[0] === '?') { const [fr, en] = l.slice(1).split('‖').map((s) => s.trim()); q = { fr, en, right: null, wrongs: [] }; p.qs.push(q); continue; }
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
  const tipOf = (p) => T(`Le texte : ${p.body} (${p.bodyPy})`, `The text: ${p.body} (${p.bodyPy})`);
  const authored = (L, p) => p.qs.map((k, i) => mc(`${p.id}-q${i}`, T(k.fr, k.en), { ...k.right }, k.wrongs.map((w) => ({ ...w })), { stimulus: stim(p), say: i === 0 ? say(p.body) : undefined, cols: 1, tip: tipOf(p) }));
  const auto = (L, p, R) => {
    const out = [];
    const others = P[L].filter((x) => x !== p);
    const longLine = p.lines.filter((l) => hanLen(l.hz) >= 6);
    if (longLine.length) {
      const k = longLine.length > 1 ? (R.int(0, longLine.length - 1)) : 0;
      const right = longLine[k];
      const wr = take(R, others.flatMap((x) => x.lines).filter((l) => hanLen(l.hz) >= 6), 3);
      out.push(mc(`${p.id}-s${k}`, T('Quelle phrase est dans le texte ?', 'Which sentence is in the text?'), { ...right }, wr.map((w) => ({ ...w })), { stimulus: stim(p), cols: 1, tip: tipOf(p) }));
    }
    const first = p.lines.slice(0, 3);
    if (first.length === 3 && first.every((l) => hanLen(l.hz) <= 20)) {
      out.push({ type: 'order', key: `${p.id}-ord`, prompt: T('Remets le début de l’histoire dans l’ordre.', 'Put the start of the text in order.'), say: say(first.map((l) => l.hz).join('')), tiles: first.map((l) => ({ hz: l.hz, py: l.py })), joiner: '', tip: tipOf(p) });
    }
    if (others.length >= 2) out.push(mc(`${p.id}-t`, T('Quel est le titre de ce texte ?', 'What is the title of this text?'), { hz: p.title.hz, py: p.title.py }, take(R, others, 3).map((x) => ({ hz: x.title.hz, py: x.title.py })), { stimulus: { hz: p.body, py: p.bodyPy }, cols: 1, tip: tipOf(p) }));
    const shorts = [...p.lines].sort((a, b) => hanLen(a.hz) - hanLen(b.hz)).filter((l) => hanLen(l.hz) >= 4).slice(0, 2);
    shorts.forEach((l, i) => {
      const wr = pyWrong(R, l.py, 3);
      if (wr.length >= 2) out.push(mc(`${p.id}-p${i}`, T('Quel est le bon pinyin de cette phrase ?', 'What is the right pinyin of this sentence?'), { py: l.py }, wr.map((w) => ({ py: w })), { stimulus: { hz: l.hz }, say: say(l.hz), cols: 1, tip: tipOf(p) }));
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

export const g3c21 = readUnit('g3c21', '📖', T('Lire une histoire 读故事', 'Reading a story 读故事'), 'Chinois — lecture : de courtes histoires originales avec questions de compréhension (2e–3e année)', STORIES);
export const g3c22 = readUnit('g3c22', '📰', T('Lire pour comprendre 读一读', 'Reading to learn 读一读'), 'Chinois — lecture : description, journal, lettre, avis (2e–3e année)', INFO);

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
  id: 'g3c23', icon: '🖼️', title: T('Regarde et raconte 看图说话', 'Look and tell 看图说话'),
  pfeq: 'Chinois — expression écrite : décrire une image en une phrase, quelques phrases ou un petit texte (2e–3e année)',
  generate(L, R) {
    const s = R.pick(SCENES);
    const hints = T(`Mots utiles : ${s.a.hz} (${s.a.py}), ${s.b.hz} (${s.b.py}).`, `Useful words: ${s.a.hz} (${s.a.py}), ${s.b.hz} (${s.b.py}).`);
    if (L === 1) return hand({ mode: 'sentence', key: `g3c23-1-${s.i}`, prompt: T(`Regarde l’image. Écris UNE phrase : qui est-ce ? que fait-il ? ${hints.fr}`, `Look at the picture. Write ONE sentence: who is it? what are they doing? ${hints.en}`), stimulus: { emoji: s.em }, say: say(`${s.a.hz}，${s.b.hz}`), words: [s.a.hz], minWords: 6, lines: 2 });
    if (L === 2) return hand({ mode: 'composition', key: `g3c23-2-${s.i}`, prompt: T(`Regarde l’image. Écris 2 ou 3 phrases : qui ? où ? que fait-il ? ${hints.fr}`, `Look at the picture. Write 2 or 3 sentences: who? where? what are they doing? ${hints.en}`), stimulus: { emoji: s.em }, say: say(`${s.a.hz}，${s.b.hz}`), minWords: 14, lines: 3 });
    return hand({ mode: 'composition', key: `g3c23-3-${s.i}`, prompt: T(`Regarde l’image et raconte une petite histoire (4 ou 5 phrases) : avant, pendant, après. Dis aussi ce que tu ressens. ${hints.fr}`, `Look at the picture and tell a little story (4 or 5 sentences): before, during, after. Say how you feel too. ${hints.en}`), stimulus: { emoji: s.em }, say: say(`${s.a.hz}，${s.b.hz}`), minWords: 28, lines: 5 });
  },
  allSay() { return SCENES.map((s) => say(`${s.a.hz}，${s.b.hz}`)); },
});
export { g3c23 };
export const units = [g3c21, g3c22, g3c23];
