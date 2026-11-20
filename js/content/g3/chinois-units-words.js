// g3c17 measure words 量词, g3c18 antonyms & synonyms 反义词/近义词, g3c19 sentences & punctuation 连词成句/标点, g3c20 sentence-making 用词造句 (hand).
import { WORDS } from './chinois-vocab.js';
import { say, T, mc, hand, take, pyWrong, finish, split, hanLen, chk } from './chinois-lib.js';

/* ======================= g3c17 — measure words ======================= */
// mw|py|nouns (hz py… emoji, comma separated)
const MW_TXT = `
个|gè|苹果 píng guǒ 🍎,人 rén 🧑,球 qiú ⚽,梨 lí 🍐,鸡蛋 jī dàn 🥚,西瓜 xī guā 🍉,小朋友 xiǎo péng you 🧒,太阳 tài yáng ☀️,月亮 yuè liang 🌙
只|zhī|小鸟 xiǎo niǎo 🐦,猫 māo 🐱,兔子 tù zi 🐰,鸡 jī 🐔,鸭子 yā zi 🦆,老虎 lǎo hǔ 🐯,蝴蝶 hú dié 🦋,羊 yáng 🐑,狗 gǒu 🐕
条|tiáo|鱼 yú 🐟,蛇 shé 🐍,河 hé 🏞️,裙子 qún zi 👗,路 lù 🛣️,裤子 kù zi 👖,狗 gǒu 🐕,龙 lóng 🐉
本|běn|书 shū 📖,词典 cí diǎn 📚,故事书 gù shi shū 📕,日记 rì jì 📔
棵|kē|树 shù 🌳,草 cǎo 🌿,白菜 bái cài 🥬,松树 sōng shù 🌲
朵|duǒ|花 huā 🌸,白云 bái yún ☁️,红花 hóng huā 🌺
张|zhāng|纸 zhǐ 📄,桌子 zhuō zi 🪑,床 chuáng 🛏️,照片 zhào piàn 🖼️,地图 dì tú 🗺️,票 piào 🎫,嘴 zuǐ 👄,画 huà 🎨
把|bǎ|伞 sǎn ☂️,椅子 yǐ zi 🪑,刀 dāo 🔪,尺子 chǐ zi 📏,剪刀 jiǎn dāo ✂️,勺子 sháo zi 🥄
件|jiàn|衣服 yī fu 👕,礼物 lǐ wù 🎁,行李 xíng li 🧳
辆|liàng|汽车 qì chē 🚗,自行车 zì xíng chē 🚲,卡车 kǎ chē 🚚,小汽车 xiǎo qì chē 🚙
双|shuāng|鞋 xié 👟,筷子 kuài zi 🥢,袜子 wà zi 🧦,眼睛 yǎn jing 👀,手套 shǒu tào 🧤
支|zhī|笔 bǐ 🖊️,铅笔 qiān bǐ ✏️,蜡烛 là zhú 🕯️
座|zuò|山 shān ⛰️,桥 qiáo 🌉,城市 chéng shì 🏙️,塔 tǎ 🗼
颗|kē|星星 xīng xing ⭐,糖 táng 🍬,牙 yá 🦷,心 xīn ❤️
片|piàn|叶子 yè zi 🍂,树叶 shù yè 🍃,面包 miàn bāo 🍞,雪花 xuě huā ❄️,草地 cǎo dì 🌱
杯|bēi|水 shuǐ 💧,牛奶 niú nǎi 🥛,茶 chá 🍵,果汁 guǒ zhī 🧃
碗|wǎn|米饭 mǐ fàn 🍚,面条 miàn tiáo 🍜,汤 tāng 🍲,粥 zhōu 🥣
首|shǒu|歌 gē 🎵,诗 shī 📜,儿歌 ér gē 🎶
匹|pǐ|马 mǎ 🐴,小马 xiǎo mǎ 🐎,白马 bái mǎ 🐴
头|tóu|牛 niú 🐮,猪 zhū 🐷,大象 dà xiàng 🐘,狮子 shī zi 🦁,羊 yáng 🐑
群|qún|鸟 niǎo 🐦,鱼 yú 🐟,学生 xué sheng 🧑‍🎓,蚂蚁 mǎ yǐ 🐜
间|jiān|教室 jiào shì 🏫,屋子 wū zi 🏠,商店 shāng diàn 🏪
场|chǎng|雨 yǔ 🌧️,雪 xuě ❄️,比赛 bǐ sài 🏆,电影 diàn yǐng 🎬
幅|fú|画 huà 🎨,地图 dì tú 🗺️,图画 tú huà 🖼️
盏|zhǎn|灯 dēng 💡,台灯 tái dēng 🪔,路灯 lù dēng 🏮
艘|sōu|船 chuán 🚢,小船 xiǎo chuán ⛵,帆船 fān chuán ⛵
粒|lì|米 mǐ 🍚,沙子 shā zi 🏖️,豆子 dòu zi 🫘
封|fēng|信 xìn ✉️,家信 jiā xìn 💌
扇|shàn|门 mén 🚪,窗户 chuāng hu 🪟,大门 dà mén 🚪
串|chuàn|葡萄 pú tao 🍇,钥匙 yào shi 🔑,糖葫芦 táng hú lu 🍡
束|shù|鲜花 xiān huā 💐,阳光 yáng guāng 🌤️
`;
const MWS = MW_TXT.trim().split('\n').map((l) => {
  const [mw, py, ns] = l.split('|');
  const nouns = ns.split(',').map((n) => { const p = n.trim().split(' '); const h = p[0], em = p[p.length - 1], npy = p.slice(1, -1).join(' '); chk(h, npy, 'mw noun'); return { hz: h, py: npy, em }; });
  return { mw, py, nouns };
});
const MWMAP = Object.fromEntries(MWS.map((m) => [m.mw, m]));
const VALID = {}; // noun hz -> set of measure words that fit
for (const m of MWS) for (const n of m.nouns) (VALID[n.hz] ||= new Set()).add(m.mw);
// compatible measure words that must not be used as wrong answers
const KIN = [['只', '头', '条'], ['张', '幅'], ['朵', '片', '束'], ['本', '首'], ['辆', '个'], ['间', '座'], ['颗', '粒'], ['杯', '碗'], ['盏', '个'], ['艘', '条', '只'], ['座', '个'], ['件', '个']];
const compatible = (a, b) => KIN.some((g) => g.includes(a) && g.includes(b));
const MWE = MWS.flatMap((m) => m.nouns.map((n) => ({ m, n })));
const yiPy = (mwPy) => (split(mwPy).tone === 4 ? 'yí' : 'yì');
const mwTip = (e) => T(`一${e.m.mw} (${yiPy(e.m.py)} ${e.m.py}) + ${e.n.hz} : ${e.n.hz} ${e.n.py} → 一${e.m.mw}${e.n.hz}.`, `一${e.m.mw} (${yiPy(e.m.py)} ${e.m.py}) + ${e.n.hz}: ${e.n.hz} ${e.n.py} → 一${e.m.mw}${e.n.hz}.`);
const wrongMw = (R, e, n) => take(R, MWS.filter((m) => m.mw !== '个' && !(VALID[e.n.hz]?.has(m.mw)) && !compatible(m.mw, e.m.mw) && ![...VALID[e.n.hz] || []].some((v) => compatible(v, m.mw))), n);
const g3c17 = finish({
  id: 'g3c17', icon: '📏', title: T('Les mots de mesure 量词', 'Measure words 量词'),
  pfeq: 'Chinois — vocabulaire : les classificateurs (一只、一条、一本…) (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const e = R.pick(MWE);
    const mo = (m, py) => (py ? { hz: m.mw, py: m.py } : { hz: m.mw });
    const nounToMw = () => {
      const wr = wrongMw(R, e, lvl === 1 ? 2 : 3);
      const stim = { hz: `一＿${e.n.hz}`, py: `${yiPy(e.m.py)} ${e.n.py}` };
      return mc(`m1-${e.m.mw}-${e.n.hz}`, T(`Quel mot de mesure va avec ce mot ? ${e.n.em}`, `Which measure word goes with this word? ${e.n.em}`), mo(e.m, lvl < 3), wr.map((m) => mo(m, lvl < 3)), { stimulus: lvl === 3 ? { hz: `一＿${e.n.hz}` } : stim, say: say(`一${e.m.mw}${e.n.hz}`), cols: 2, tip: mwTip(e) });
    };
    const mwToNoun = () => {
      const pool = MWE.filter((x) => x.n.hz !== e.n.hz && !(VALID[x.n.hz]?.has(e.m.mw)) && ![...VALID[x.n.hz]].some((v) => compatible(v, e.m.mw)));
      const wr = take(R, pool, lvl === 1 ? 2 : 3).map((x) => x.n);
      const o = (n, py) => (py ? { hz: n.hz, py: n.py, emoji: n.em } : { hz: n.hz });
      return mc(`m2-${e.m.mw}-${e.n.hz}`, T('Quel mot va après ce mot de mesure ?', 'Which word goes after this measure word?'), o(e.n, lvl < 3), wr.map((n) => o(n, lvl < 3)), { stimulus: { hz: `一${e.m.mw}＿`, py: `${yiPy(e.m.py)} ${e.m.py}` }, say: say(`一${e.m.mw}${e.n.hz}`), cols: 2, tip: mwTip(e) });
    };
    const order = () => {
      const wr = wrongMw(R, e, 1)[0];
      const tiles = [{ hz: '一', py: yiPy(e.m.py) }, { hz: e.m.mw, py: e.m.py }, { hz: e.n.hz, py: e.n.py }];
      return { type: 'order', key: `m3-${e.m.mw}-${e.n.hz}`, prompt: T(`Écoute. Remets dans l’ordre : un/une ${e.n.em}`, `Listen. Put in order: one ${e.n.em}`), say: say(`一${e.m.mw}${e.n.hz}`), tiles, extra: wr ? [{ hz: wr.mw, py: wr.py }] : undefined, joiner: '', tip: mwTip(e) };
    };
    const sortMw = () => {
      const a = R.pick(MWS.filter((m) => m.mw !== '个')); const cands = MWS.filter((m) => m !== a && m.mw !== '个' && a.mw !== '个' && !compatible(m.mw, a.mw) && !m.nouns.some((n) => a.nouns.some((x) => x.hz === n.hz))); if (!cands.length) return nounToMw(); const b = R.pick(cands);
      const ia = take(R, a.nouns, 3).filter((n) => !VALID[n.hz].has(b.mw)), ib = take(R, b.nouns, 3).filter((n) => !VALID[n.hz].has(a.mw));
      if (ia.length < 2 || ib.length < 2) return nounToMw();
      const items = R.shuffle([...ia.map((n) => ({ hz: n.hz, py: n.py, emoji: n.em, bin: 0 })), ...ib.map((n) => ({ hz: n.hz, py: n.py, emoji: n.em, bin: 1 }))]);
      return { type: 'sort', key: `m4-${a.mw}-${b.mw}-${items.map((i) => i.hz).sort().join('')}`, prompt: T('Range chaque mot avec son mot de mesure.', 'Put each word with its measure word.'), bins: [{ hz: `一${a.mw}`, py: `${yiPy(a.py)} ${a.py}` }, { hz: `一${b.mw}`, py: `${yiPy(b.py)} ${b.py}` }], items, tip: T(`一${a.mw} : ${a.nouns.map((n) => n.hz).join(' ')} ; 一${b.mw} : ${b.nouns.map((n) => n.hz).join(' ')}.`, `一${a.mw}: ${a.nouns.map((n) => n.hz).join(' ')}; 一${b.mw}: ${b.nouns.map((n) => n.hz).join(' ')}.`) };
    };
    if (lvl === 1) return R.pick([nounToMw, nounToMw, mwToNoun, order])();
    if (lvl === 2) return R.pick([nounToMw, mwToNoun, order, sortMw])();
    return R.pick([nounToMw, mwToNoun, mwToNoun, sortMw, order])();
  },
  allSay() { return MWE.map((e) => say(`一${e.m.mw}${e.n.hz}`)); },
});

/* ======================= g3c18 — antonyms / synonyms ======================= */
const pairs = (txt, where) => txt.trim().split('\n').map((l) => { const [a, pa, b, pb] = l.split('|').map((s) => s.trim()); chk(a, pa, where); chk(b, pb, where); return { a, pa, b, pb }; });
const ANT = pairs(`
高|gāo|矮|ǎi
长|cháng|短|duǎn
多|duō|少|shǎo
上|shàng|下|xià
左|zuǒ|右|yòu
前|qián|后|hòu
里|lǐ|外|wài
远|yuǎn|近|jìn
快|kuài|慢|màn
早|zǎo|晚|wǎn
黑|hēi|白|bái
冷|lěng|热|rè
新|xīn|旧|jiù
好|hǎo|坏|huài
胖|pàng|瘦|shòu
轻|qīng|重|zhòng
开|kāi|关|guān
进|jìn|出|chū
来|lái|去|qù
深|shēn|浅|qiǎn
粗|cū|细|xì
软|ruǎn|硬|yìng
干|gān|湿|shī
真|zhēn|假|jiǎ
对|duì|错|cuò
美|měi|丑|chǒu
男|nán|女|nǚ
笑|xiào|哭|kū
买|mǎi|卖|mài
明|míng|暗|àn
静|jìng|闹|nào
大|dà|小|xiǎo
宽|kuān|窄|zhǎi
满|mǎn|空|kōng
难|nán|易|yì
苦|kǔ|甜|tián
香|xiāng|臭|chòu
勤|qín|懒|lǎn
高兴|gāo xìng|难过|nán guò
安静|ān jìng|吵闹|chǎo nào
干净|gān jìng|脏|zāng
喜欢|xǐ huan|讨厌|tǎo yàn
开始|kāi shǐ|结束|jié shù
出口|chū kǒu|入口|rù kǒu
白天|bái tiān|黑夜|hēi yè
勇敢|yǒng gǎn|胆小|dǎn xiǎo
`, 'ANT');
const SYN = pairs(`
高兴|gāo xìng|快乐|kuài lè
漂亮|piào liang|美丽|měi lì
马上|mǎ shàng|立刻|lì kè
爸爸|bà ba|父亲|fù qīn
妈妈|mā ma|母亲|mǔ qīn
聪明|cōng míng|机灵|jī ling
刚才|gāng cái|刚刚|gāng gāng
喜欢|xǐ huan|喜爱|xǐ ài
说|shuō|讲|jiǎng
看|kàn|瞧|qiáo
老师|lǎo shī|教师|jiào shī
医生|yī shēng|大夫|dài fu
帮助|bāng zhù|帮忙|bāng máng
认真|rèn zhēn|仔细|zǐ xì
特别|tè bié|非常|fēi cháng
经常|jīng cháng|常常|cháng cháng
突然|tū rán|忽然|hū rán
生气|shēng qì|发火|fā huǒ
朋友|péng you|好友|hǎo yǒu
孩子|hái zi|小孩|xiǎo hái
房子|fáng zi|房屋|fáng wū
开心|kāi xīn|愉快|yú kuài
迅速|xùn sù|飞快|fēi kuài
`, 'SYN');
const AO = ANT.flatMap((p) => [{ w: p.a, py: p.pa, o: p.b, opy: p.pb, p }, { w: p.b, py: p.pb, o: p.a, opy: p.pa, p }]);
const SO = SYN.flatMap((p) => [{ w: p.a, py: p.pa, o: p.b, opy: p.pb, p }, { w: p.b, py: p.pb, o: p.a, opy: p.pa, p }]);
const ANTW = new Set(ANT.flatMap((p) => [p.a, p.b])), SYNW = new Set(SYN.flatMap((p) => [p.a, p.b]));
const ow = (x, py) => (py ? { hz: x.hz, py: x.py } : { hz: x.hz });
const g3c18 = finish({
  id: 'g3c18', icon: '↔️', title: T('Contraires et mots proches 反义词和近义词', 'Opposites and similar words 反义词和近义词'),
  pfeq: 'Chinois — vocabulaire : antonymes et synonymes (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const useSyn = lvl >= 2 && R.chance(lvl === 2 ? 0.35 : 0.5);
    const list = useSyn ? SO : AO;
    const e = lvl === 1 ? R.pick(AO.filter((x) => [...x.w].length === 1)) : R.pick(list);
    const kind = useSyn ? T('un mot qui a presque le même sens que', 'a word with almost the same meaning as') : T('le contraire de', 'the opposite of');
    const tip = useSyn ? T(`${e.w} (${e.py}) et ${e.o} (${e.opy}) ont presque le même sens.`, `${e.w} (${e.py}) and ${e.o} (${e.opy}) mean almost the same.`) : T(`${e.w} (${e.py}) ↔ ${e.o} (${e.opy}) : ce sont des contraires.`, `${e.w} (${e.py}) ↔ ${e.o} (${e.opy}): they are opposites.`);
    function same2() { return list.filter((x) => x.p !== e.p && [...x.w].length === [...e.w].length).flatMap((x) => [{ hz: x.w, py: x.py }, { hz: x.o, py: x.opy }]); }
    const pick = () => mc(`g3c18-${useSyn ? 's' : 'a'}-${e.w}-${e.o}`, T(`Quel est ${kind.fr} ?`, `What is ${kind.en}?`), ow({ hz: e.o, py: e.opy }, lvl < 3), take(R, same2().filter((x) => x.hz !== e.o && x.hz !== e.w), lvl === 1 ? 2 : 3).map((x) => ow(x, lvl < 3)), { stimulus: { hz: e.w, py: e.py }, say: say(e.w), cols: 2, tip });
    const isPair = () => {
      // which pair really are opposites / similar?
      const q = R.pick(list.length ? (useSyn ? SYN : ANT) : ANT), q2 = R.pick((useSyn ? SYN : ANT).filter((x) => x !== q && [...x.a].length === [...q.a].length));
      const right = { hz: `${q.a} ${q.b}`, py: `${q.pa} ${q.pb}` };
      const mix = (a, b) => ({ hz: `${a.a} ${b.b}`, py: `${a.pa} ${b.pb}` });
      const others = take(R, (useSyn ? SYN : ANT).filter((x) => x !== q && x !== q2 && [...x.a].length === [...q.a].length), 2);
      const wrong = [mix(q, q2), ...others.map((o) => mix(o, q))];
      return mc(`g3c18-p-${useSyn ? 's' : 'a'}-${q.a}`, useSyn ? T('Quelle paire a presque le même sens ?', 'Which pair means almost the same?') : T('Quelle paire est faite de contraires ?', 'Which pair are opposites?'), right, wrong.slice(0, 3), { cols: 2, tip: useSyn ? T(`${q.a} = ${q.b}.`, `${q.a} = ${q.b}.`) : T(`${q.a} ↔ ${q.b}.`, `${q.a} ↔ ${q.b}.`) });
    };
    if (lvl === 3 && R.chance(0.3)) return isPair();
    return pick();
  },
  allSay() { return [...AO, ...SO].map((x) => say(x.w)).concat([...AO, ...SO].map((x) => say(x.o))); },
});

/* ======================= g3c19 — sentences & punctuation ======================= */
// seg/seg/seg。|pinyin (one syllable per character; punctuation is attached to the last segment)
const SENT_TXT = `
小明/每天/早上/刷牙。|xiǎo míng měi tiān zǎo shang shuā yá
妈妈/在/厨房/里/煮饭。|mā ma zài chú fáng lǐ zhǔ fàn
我们/在/操场/上/做操。|wǒ men zài cāo chǎng shàng zuò cāo
老师/教/我们/读/课文。|lǎo shī jiāo wǒ men dú kè wén
小鸟/站/在/树枝/上。|xiǎo niǎo zhàn zài shù zhī shàng
弟弟/喜欢/踢/足球。|dì di xǐ huan tī zú qiú
外婆家/有/一只/小狗。|wài pó jiā yǒu yì zhī xiǎo gǒu
秋天到了，/树叶/黄/了。|qiū tiān dào le shù yè huáng le
河里/有/许多/小鱼。|hé lǐ yǒu xǔ duō xiǎo yú
我/把/书/放/在/桌子/上。|wǒ bǎ shū fàng zài zhuō zi shàng
爸爸/开车/带/我们/去/公园。|bà ba kāi chē dài wǒ men qù gōng yuán
小猫/躺/在/被子/上/睡觉。|xiǎo māo tǎng zài bèi zi shàng shuì jiào
同学们/排队/去/食堂/吃饭。|tóng xué men pái duì qù shí táng chī fàn
冬天/下了/一场/大雪。|dōng tiān xià le yì chǎng dà xuě
小狗/在/院子/里/跑来跑去。|xiǎo gǒu zài yuàn zi lǐ pǎo lái pǎo qù
姐姐/在/教室/里/写/作业。|jiě jie zài jiào shì lǐ xiě zuò yè
太阳/从/东边/升/起来/了。|tài yáng cóng dōng biān shēng qǐ lái le
我/用/勺子/喝/汤。|wǒ yòng sháo zi hē tāng
天空/中/飞/着/一群/大雁。|tiān kōng zhōng fēi zhe yì qún dà yàn
小朋友们/在/沙滩/上/玩/沙子。|xiǎo péng you men zài shā tān shàng wán shā zi
爷爷/每天/早晨/去/散步。|yé ye měi tiān zǎo chén qù sàn bù
我们/的/教室/很/干净。|wǒ men de jiào shì hěn gān jìng
星期天/我/去/奶奶/家。|xīng qī tiān wǒ qù nǎi nai jiā
蚂蚁/搬/着/一粒/米。|mǎ yǐ bān zhe yí lì mǐ
妹妹/穿/着/红/裙子。|mèi mei chuān zhe hóng qún zi
河水/流/向/大海。|hé shuǐ liú xiàng dà hǎi
白云/飘/在/蓝天/上。|bái yún piāo zài lán tiān shàng
晚上/我们/一起/看/星星。|wǎn shang wǒ men yì qǐ kàn xīng xing
公鸡/站/在/墙头/上/叫。|gōng jī zhàn zài qiáng tóu shàng jiào
你/今年/几岁/了？|nǐ jīn nián jǐ suì le
这/是/谁/的/书包？|zhè shì shéi de shū bāo
你/想/吃/什么？|nǐ xiǎng chī shén me
洗手间/在/哪里？|xǐ shǒu jiān zài nǎ lǐ
明天/你/去/学校/吗？|míng tiān nǐ qù xué xiào ma
你/为什么/哭/了？|nǐ wèi shén me kū le
谁/在/敲门？|shéi zài qiāo mén
你/喜欢/哪种/水果？|nǐ xǐ huan nǎ zhǒng shuǐ guǒ
现在/几点/了？|xiàn zài jǐ diǎn le
图书馆里/有/多少/本书？|tú shū guǎn lǐ yǒu duō shao běn shū
你/会/游泳/吗？|nǐ huì yóu yǒng ma
小鱼/为什么/不/睡觉？|xiǎo yú wèi shén me bú shuì jiào
你的/生日/是/哪/天？|nǐ de shēng rì shì nǎ tiān
这/只/小狗/多大/了？|zhè zhī xiǎo gǒu duō dà le
今天/的/天气/真/好！|jīn tiān de tiān qì zhēn hǎo
这/朵/花/真/漂亮！|zhè duǒ huā zhēn piào liang
我们/赢/了！|wǒ men yíng le
太阳/出来/了！|tài yáng chū lái le
小心/摔倒！|xiǎo xīn shuāi dǎo
你/跑/得/真/快！|nǐ pǎo de zhēn kuài
下雪/了，/我们/去/堆/雪人/吧！|xià xuě le wǒ men qù duī xuě rén ba
好大的/一棵/树！|hǎo dà de yì kē shù
生日/快乐！|shēng rì kuài lè
谢谢/你/的/礼物！|xiè xie nǐ de lǐ wù
快/看，/彩虹/出来/了！|kuài kàn cǎi hóng chū lái le
这里/的/风景/真/美！|zhè lǐ de fēng jǐng zhēn měi
大家/一起/加油！|dà jiā yì qǐ jiā yóu
`;
const SENTS = SENT_TXT.trim().split('\n').map((l) => {
  const [sg, py] = l.split('|');
  const segs = sg.split('/');
  const syl = py.split(' ');
  let k = 0;
  const tiles = segs.map((s) => { const n = hanLen(s); const t = { hz: s, py: syl.slice(k, k + n).join(' ') }; k += n; return t; });
  if (k !== syl.length) throw new Error('sentence pinyin count ' + sg);
  if (new Set(segs).size !== segs.length) throw new Error('duplicate tile in ' + sg);
  const hz = segs.join('');
  const end = hz.slice(-1);
  return { hz, py, tiles, end, body: hz.slice(0, -1) };
});
const COMMA_TXT = `
天黑了，我们回家吧。|tiān hēi le wǒ men huí jiā ba
下雨了，我带了雨伞。|xià yǔ le wǒ dài le yǔ sǎn
春天来了，花儿开了。|chūn tiān lái le huā ér kāi le
我很饿，想吃面包。|wǒ hěn è xiǎng chī miàn bāo
他跑得快，我跑得慢。|tā pǎo de kuài wǒ pǎo de màn
妈妈做饭，爸爸看书。|mā ma zuò fàn bà ba kàn shū
冬天到了，天气很冷。|dōng tiān dào le tiān qì hěn lěng
小鸟唱歌，小鱼游泳。|xiǎo niǎo chàng gē xiǎo yú yóu yǒng
放学了，同学们回家了。|fàng xué le tóng xué men huí jiā le
太阳出来了，雾散了。|tài yáng chū lái le wù sàn le
今天有风，没有太阳。|jīn tiān yǒu fēng méi yǒu tài yáng
小明病了，没有来上学。|xiǎo míng bìng le méi yǒu lái shàng xué
妹妹哭了，姐姐抱起了她。|mèi mei kū le jiě jie bào qǐ le tā
天晴了，我们去爬山。|tiān qíng le wǒ men qù pá shān
桌子上有书、笔和本子。|zhuō zi shàng yǒu shū bǐ hé běn zi
公园里有花、草和树。|gōng yuán lǐ yǒu huā cǎo hé shù
我家有爸爸、妈妈和我。|wǒ jiā yǒu bà ba mā ma hé wǒ
我喜欢苹果、香蕉和西瓜。|wǒ xǐ huan píng guǒ xiāng jiāo hé xī guā
`;
const COMMAS = COMMA_TXT.trim().split('\n').map((l) => { const [hz, py] = l.split('|'); chk(hz, py, 'comma'); const m = hz.match(/[，、]/); return { hz, py, mark: m[0], idx: hz.indexOf(m[0]) }; });
const NAMES = [['。', '句号 jù hào', 'point (fin de phrase)', 'full stop'], ['，', '逗号 dòu hào', 'virgule', 'comma'], ['？', '问号 wèn hào', 'point d’interrogation', 'question mark'], ['！', '叹号 tàn hào', 'point d’exclamation', 'exclamation mark'], ['、', '顿号 dùn hào', 'virgule de liste', 'list comma']];
const ENDS = ['。', '？', '！'];
const exOk = (s) => s.end !== '！' || /真|好大|快乐|加油|谢谢|快看|小心/.test(s.hz);
const PUNCT_TIP = T('？ à la fin d’une question (吗, 什么, 谁, 几, 哪…). ！ pour un cri ou une grande émotion. 。 pour une phrase simple. ， entre deux petites parties ; 、 entre les mots d’une liste.', '？ ends a question (吗, 什么, 谁, 几, 哪…). ！ shows a cry or strong feeling. 。 ends a plain sentence. ， separates two parts; 、 separates items in a list.');
const g3c19 = finish({
  id: 'g3c19', icon: '🧱', title: T('Phrases et ponctuation 连词成句和标点', 'Sentences and punctuation 连词成句和标点'),
  pfeq: 'Chinois — langue : former une phrase avec des mots, la ponctuation (，。？！、) (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const orderQ = () => {
      const s = R.pick(SENTS.filter((x) => (lvl === 1 ? x.tiles.length <= 5 : lvl === 2 ? x.tiles.length >= 4 : x.tiles.length >= 5)));
      const ex = lvl === 3 ? [R.pick(SENTS.filter((x) => x !== s)).tiles[0]].filter((t) => !s.tiles.some((y) => y.hz === t.hz)) : undefined;
      return { type: 'order', key: `g3c19-o-${s.hz}`, prompt: T(lvl === 3 ? 'Remets les mots dans l’ordre pour faire une phrase. (Un mot est de trop.)' : 'Remets les mots dans l’ordre pour faire une phrase.', lvl === 3 ? 'Put the words in order to make a sentence. (One word is extra.)' : 'Put the words in order to make a sentence.'), say: lvl < 3 ? say(s.hz) : undefined, tiles: s.tiles, extra: ex && ex.length ? ex : undefined, joiner: '', tip: T(`${s.hz} (${s.py})`, `${s.hz} (${s.py})`) };
    };
    const endQ = () => {
      const s = R.pick(SENTS.filter(exOk));
      const opts = (lvl === 1 ? (s.end === '！' ? ['！', '。'] : s.end === '？' ? ['？', '。'] : ['。', '？']) : ENDS).map((m) => ({ text: m }));
      const right = opts.find((o) => o.text === s.end);
      return mc(`g3c19-e-${s.hz}`, T('Quel signe faut-il à la fin de la phrase ?', 'Which mark ends the sentence?'), right, opts.filter((o) => o !== right), { stimulus: { hz: `${s.body}＿`, py: s.py }, say: say(s.hz), cols: 3, tip: PUNCT_TIP });
    };
    const commaQ = () => {
      const c = R.pick(COMMAS);
      const hz = `${c.hz.slice(0, c.idx)}＿${c.hz.slice(c.idx + 1)}`;
      const opts = lvl === 1 ? [c.mark, c.mark === '，' ? '。' : '，'] : ['，', '、', '。'];
      return mc(`g3c19-c-${c.hz}`, T('Quel signe va dans le trou ?', 'Which mark goes in the gap?'), { text: c.mark }, opts.filter((m) => m !== c.mark).map((m) => ({ text: m })), { stimulus: { hz, py: c.py }, say: say(c.hz), cols: 3, tip: PUNCT_TIP });
    };
    const nameQ = () => {
      const [m, , fr, en] = R.pick(NAMES);
      const wr = take(R, NAMES.filter((x) => x[0] !== m), lvl === 1 ? 2 : 3);
      return mc(`g3c19-n-${m}`, T('Comment s’appelle ce signe ?', 'What is this mark called?'), { text: T(`${NAMES.find((x) => x[0] === m)[1]} · ${fr}`, `${NAMES.find((x) => x[0] === m)[1]} · ${en}`) }, wr.map((x) => ({ text: T(`${x[1]} · ${x[2]}`, `${x[1]} · ${x[3]}`) })), { stimulus: { text: m }, tip: PUNCT_TIP });
    };
    if (lvl === 1) return R.pick([orderQ, orderQ, endQ, nameQ, commaQ])();
    if (lvl === 2) return R.pick([orderQ, orderQ, endQ, commaQ, nameQ])();
    return R.pick([orderQ, orderQ, orderQ, endQ, commaQ, commaQ])();
  },
  allSay() { return [...SENTS.map((s) => say(s.hz)), ...COMMAS.map((c) => say(c.hz))]; },
});

/* ======================= g3c20 — making sentences (hand) ======================= */
const NOUNS = [...new Map(MWE.map((e) => [e.n.hz, e.n])).values()];
const VERBS = `
玩|wán|jouer|to play
吃|chī|manger|to eat
看|kàn|regarder|to look at
喜欢|xǐ huan|aimer|to like
爱|ài|aimer|to love
跑|pǎo|courir|to run
唱|chàng|chanter|to sing
画|huà|dessiner|to draw
找|zhǎo|chercher|to look for
想|xiǎng|vouloir, penser|to want, think
`.trim().split('\n').map((l) => { const [h, p, fr, en] = l.split('|'); return { hz: h, py: p, fr, en }; });
const PATS = `
因为…所以…|yīn wèi … suǒ yǐ …|parce que… donc…|because… so…
一边…一边…|yì biān … yì biān …|tout en… tout en…|while… while…
先…再…|xiān … zài …|d’abord… ensuite…|first… then…
虽然…但是…|suī rán … dàn shì …|bien que… mais…|although… but…
如果…就…|rú guǒ … jiù …|si… alors…|if… then…
不但…而且…|bú dàn … ér qiě …|non seulement… mais aussi…|not only… but also…
一…就…|yī … jiù …|dès que…|as soon as…
又…又…|yòu … yòu …|à la fois… et…|both… and…
`.trim().split('\n').map((l) => { const [h, p, fr, en] = l.split('|'); return { hz: h, py: p, fr, en }; });
const g3c20 = finish({
  id: 'g3c20', icon: '💬', title: T('Faire des phrases 用词造句', 'Making sentences 用词造句'),
  pfeq: 'Chinois — écriture : écrire une phrase avec un mot ou un modèle donné (2e–3e année)',
  generate(L, R) {
    if (L === 1) {
      const n = R.pick(NOUNS);
      return hand({ mode: 'sentence', key: `g3c20-1-${n.hz}`, prompt: T(`Écris une phrase avec le mot « ${n.hz} » (${n.py}).`, `Write a sentence with the word “${n.hz}” (${n.py}).`), stimulus: { emoji: n.em }, say: say(n.hz), words: [n.hz], minWords: 4, lines: 2 });
    }
    if (L === 2) {
      const n = R.pick(NOUNS), v = R.pick(VERBS);
      return hand({ mode: 'sentence', key: `g3c20-2-${n.hz}-${v.hz}`, prompt: T(`Écris une phrase avec les deux mots : « ${n.hz} » (${n.py}) et « ${v.hz} » (${v.py}, ${v.fr}).`, `Write a sentence with both words: “${n.hz}” (${n.py}) and “${v.hz}” (${v.py}, ${v.en}).`), stimulus: { emoji: n.em }, say: say(`${n.hz}，${v.hz}`), words: [n.hz, v.hz], minWords: 5, lines: 2 });
    }
    const p = R.pick(PATS), n = R.pick(NOUNS);
    const parts = p.hz.split('…').filter(Boolean);
    return hand({ mode: 'sentence', key: `g3c20-3-${p.hz}-${n.hz}`, prompt: T(`Écris une phrase avec « ${p.hz} » (${p.py}, ${p.fr}) et le mot « ${n.hz} » (${n.py}).`, `Write a sentence with “${p.hz}” (${p.py}, ${p.en}) and the word “${n.hz}” (${n.py}).`), stimulus: { emoji: n.em }, say: say(p.hz.replace(/…/g, '，')), words: [...parts, n.hz], minWords: 8, lines: 3 });
  },
  allSay() { return [...NOUNS.map((n) => say(n.hz)), ...PATS.map((p) => say(p.hz.replace(/…/g, '，')))]; },
});

export const units = [g3c17, g3c18, g3c19, g3c20];
export { SENTS, NOUNS, VERBS };
