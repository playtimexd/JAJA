// Chinese (中文) units c22–c24 for Petit Hibou: handwriting (type `hand`, lang 'zh').
// c22 dictation, c23 pinyin → characters, c24 writing sentences. 人教版一年级 level, Hanyu Pinyin with tone marks.
// `say` objects use lang 'zh-CN'; `hand` questions use lang 'zh'.

const ZH = 'zh-CN';
const say = (text) => ({ text, lang: ZH });
const T = (fr, en, zh) => ({ fr, en, zh });   // unit titles (parents page: fr/en; the child: zh)
const H = (hz, py) => ({ hz, py });
const HC = (...parts) => ({ hz: parts.map((p) => (typeof p === 'string' ? p : p.hz)).join(''), py: parts.filter((p) => typeof p !== 'string' && p.py).map((p) => p.py).join(' ') });
const hand = (o) => ({ type: 'hand', lang: 'zh', ...o });
const isHan = (c) => /\p{Script=Han}/u.test(c);
const hanLen = (s) => [...s].filter(isHan).length;
// "hz|py" lines → [{ hz, py }], checking one pinyin syllable per character and no duplicates
function parse(txt, where) {
  const seen = new Set();
  return txt.trim().split('\n').map((l) => {
    const [hz, py] = l.split('|').map((s) => s.trim());
    if (!hz || !py || hanLen(hz) !== py.split(/\s+/).length) throw new Error(`pinyin mismatch in ${where}: ${l}`);
    if (seen.has(hz)) throw new Error(`duplicate in ${where}: ${hz}`);
    seen.add(hz);
    return { hz, py };
  });
}

/* ---------------- level 1: single characters ---------------- */
const CHARS = parse(`
一|yī
二|èr
三|sān
四|sì
五|wǔ
六|liù
七|qī
八|bā
九|jiǔ
十|shí
人|rén
大|dà
小|xiǎo
口|kǒu
日|rì
月|yuè
山|shān
水|shuǐ
火|huǒ
木|mù
土|tǔ
上|shàng
下|xià
中|zhōng
天|tiān
云|yún
子|zǐ
女|nǚ
心|xīn
手|shǒu
目|mù
耳|ěr
门|mén
田|tián
石|shí
左|zuǒ
右|yòu
东|dōng
西|xī
南|nán
北|běi
白|bái
马|mǎ
牛|niú
羊|yáng
鸟|niǎo
鱼|yú
我|wǒ
你|nǐ
他|tā
好|hǎo
爱|ài
是|shì
有|yǒu
不|bù
来|lái
去|qù
雨|yǔ
雪|xuě
风|fēng
花|huā
草|cǎo
红|hóng
`, 'CHARS');

/* ---------------- level 2: two-character words ---------------- */
const WORDS = parse(`
大人|dà rén
山水|shān shuǐ
火车|huǒ chē
月亮|yuè liang
老师|lǎo shī
学生|xué shēng
太阳|tài yáng
白云|bái yún
小鸟|xiǎo niǎo
小鱼|xiǎo yú
大山|dà shān
上学|shàng xué
下雨|xià yǔ
下雪|xià xuě
大雨|dà yǔ
大雪|dà xuě
天空|tiān kōng
小草|xiǎo cǎo
花朵|huā duǒ
红花|hóng huā
妈妈|mā ma
爸爸|bà ba
爷爷|yé ye
奶奶|nǎi nai
哥哥|gē ge
姐姐|jiě jie
弟弟|dì di
妹妹|mèi mei
朋友|péng you
你好|nǐ hǎo
我们|wǒ men
你们|nǐ men
他们|tā men
山上|shān shàng
水里|shuǐ lǐ
天上|tiān shàng
木头|mù tou
火山|huǒ shān
小雨|xiǎo yǔ
回家|huí jiā
上午|shàng wǔ
下午|xià wǔ
今天|jīn tiān
明天|míng tiān
春天|chūn tiān
夏天|xià tiān
秋天|qiū tiān
冬天|dōng tiān
小狗|xiǎo gǒu
小猫|xiǎo māo
小马|xiǎo mǎ
白兔|bái tù
书包|shū bāo
耳朵|ěr duo
大门|dà mén
土地|tǔ dì
田地|tián dì
石头|shí tou
星星|xīng xing
河水|hé shuǐ
大海|dà hǎi
蓝天|lán tiān
`, 'WORDS');

/* ---------------- level 3: short sentences (with punctuation) ---------------- */
const SENT = parse(`
我爱妈妈。|wǒ ài mā ma
我爱爸爸。|wǒ ài bà ba
今天下雪了。|jīn tiān xià xuě le
今天下雨了。|jīn tiān xià yǔ le
天上有白云。|tiān shàng yǒu bái yún
山上有小鸟。|shān shàng yǒu xiǎo niǎo
水里有小鱼。|shuǐ lǐ yǒu xiǎo yú
我是学生。|wǒ shì xué shēng
他是老师。|tā shì lǎo shī
我有一个朋友。|wǒ yǒu yí gè péng you
我们上学。|wǒ men shàng xué
小鸟在天上飞。|xiǎo niǎo zài tiān shàng fēi
月亮出来了。|yuè liang chū lái le
太阳出来了。|tài yáng chū lái le
花儿开了。|huā ér kāi le
小草绿了。|xiǎo cǎo lǜ le
我喜欢小狗。|wǒ xǐ huan xiǎo gǒu
我喜欢小猫。|wǒ xǐ huan xiǎo māo
妈妈在家。|mā ma zài jiā
爸爸上班。|bà ba shàng bān
爷爷爱我。|yé ye ài wǒ
奶奶爱我。|nǎi nai ài wǒ
弟弟吃饭。|dì di chī fàn
我们是朋友。|wǒ men shì péng you
大山很高。|dà shān hěn gāo
天很蓝。|tiān hěn lán
火是红的。|huǒ shì hóng de
白云在天上。|bái yún zài tiān shàng
我在学校。|wǒ zài xué xiào
我会写字。|wǒ huì xiě zì
我会读书。|wǒ huì dú shū
你好吗？|nǐ hǎo ma
我很好。|wǒ hěn hǎo
下雨了。|xià yǔ le
天黑了。|tiān hēi le
天亮了。|tiān liàng le
鸟儿在唱歌。|niǎo ér zài chàng gē
小猫喝水。|xiǎo māo hē shuǐ
我有两只手。|wǒ yǒu liǎng zhī shǒu
一个人在家。|yí gè rén zài jiā
月亮像小船。|yuè liang xiàng xiǎo chuán
树上有小鸟。|shù shàng yǒu xiǎo niǎo
大树很高。|dà shù hěn gāo
冬天下大雪。|dōng tiān xià dà xuě
春天花儿开。|chūn tiān huā ér kāi
秋天叶子黄。|qiū tiān yè zi huáng
夏天很热。|xià tiān hěn rè
今天不上学。|jīn tiān bú shàng xué
我爱我的家。|wǒ ài wǒ de jiā
`, 'SENT');

/* ---------------- c23 level 3: 3–5 characters, no punctuation ---------------- */
const SHORT = parse(`
我爱妈妈|wǒ ài mā ma
我爱爸爸|wǒ ài bà ba
我是学生|wǒ shì xué shēng
他是老师|tā shì lǎo shī
下雨了|xià yǔ le
下雪了|xià xuě le
天黑了|tiān hēi le
天亮了|tiān liàng le
我很好|wǒ hěn hǎo
你好吗|nǐ hǎo ma
我爱你|wǒ ài nǐ
花儿开了|huā ér kāi le
小朋友|xiǎo péng you
大太阳|dà tài yáng
太阳花|tài yáng huā
小白兔|xiǎo bái tù
小火车|xiǎo huǒ chē
小花猫|xiǎo huā māo
小山羊|xiǎo shān yáng
一个人|yí gè rén
三个人|sān gè rén
五个人|wǔ gè rén
上学去|shàng xué qù
回家了|huí jiā le
好朋友|hǎo péng you
大石头|dà shí tou
小石头|xiǎo shí tou
左右手|zuǒ yòu shǒu
大月亮|dà yuè liang
红太阳|hóng tài yáng
小白马|xiǎo bái mǎ
大黄牛|dà huáng niú
小鸭子|xiǎo yā zi
小花狗|xiǎo huā gǒu
大花猫|dà huā māo
老师好|lǎo shī hǎo
同学们|tóng xué men
谢谢你|xiè xie nǐ
你是谁|nǐ shì shéi
在家里|zài jiā lǐ
在山上|zài shān shàng
在水里|zài shuǐ lǐ
在天上|zài tiān shàng
在学校|zài xué xiào
去学校|qù xué xiào
上学了|shàng xué le
`, 'SHORT');

const DICT_P = H('听一听，用汉字写下来。', 'tīng yì tīng yòng hàn zì xiě xià lái');
const PY_P = H('看拼音，写汉字。', 'kàn pīn yīn xiě hàn zì');
const lv = (level) => ([1, 2, 3].includes(level) ? level : 2);

/* ================================================================== */
/*  c22 — 听写                                                          */
/* ================================================================== */
const DICT = { 1: CHARS, 2: WORDS, 3: SENT };
const c22 = {
  id: 'c22',
  icon: '✍️',
  title: T('La dictée 听写', 'Dictation 听写', H('听写', 'tīng xiě')),
  pfeq: 'Chinois — écriture (1re année) : dictée de caractères, de mots et de phrases',
  generate(level, R) {
    const l = lv(level), e = R.pick(DICT[l]);
    return hand({ mode: 'dictation', key: `c22-${e.hz}`, prompt: DICT_P, say: say(e.hz), expected: e.hz, lines: l === 3 ? 2 : 1 });
  },
  allSay() { return [1, 2, 3].flatMap((l) => DICT[l].map((e) => say(e.hz))); },
};

/* ================================================================== */
/*  c23 — 看拼音写汉字                                                  */
/* ================================================================== */
const PYS = { 1: CHARS, 2: WORDS, 3: SHORT };
const c23 = {
  id: 'c23',
  icon: '🔤',
  title: T('Du pinyin aux caractères 看拼音写汉字', 'Pinyin to characters 看拼音写汉字', H('看拼音写汉字', 'kàn pīn yīn xiě hàn zì')),
  pfeq: 'Chinois — écriture (1re année) : écrire les caractères à partir du pinyin',
  generate(level, R) {
    const l = lv(level), e = R.pick(PYS[l]);
    return hand({ mode: 'dictation', key: `c23-${e.hz}`, prompt: PY_P, stimulus: { text: e.py }, say: say(e.hz), expected: e.hz, lines: l === 1 ? 1 : 2 });
  },
  allSay() { return [1, 2, 3].flatMap((l) => PYS[l].map((e) => say(e.hz))); },
};

/* ================================================================== */
/*  c24 — 写一句话                                                      */
/* ================================================================== */
// L2: pattern | emoji picture | hint words (comma separated)
const L2_TXT = `
我喜欢___。|🐶|小狗
我喜欢___。|🐱|小猫
我喜欢___。|🍎|苹果
我喜欢___。|🍌|香蕉
我喜欢___。|🍉|西瓜
我喜欢___。|🥛|牛奶
我喜欢___。|⚽|足球
我喜欢___。|📖|书
我喜欢___。|🐰|小兔
我喜欢___。|🐟|小鱼
我喜欢___。|🌸|花
我喜欢___。|🐘|大象
我想吃___。|🍎|苹果
我想吃___。|🍚|米饭
我想吃___。|🍞|面包
我想吃___。|🥚|鸡蛋
我想吃___。|🍓|草莓
我想吃___。|🥕|胡萝卜
这是___。|🌙|月亮
这是___。|☀️|太阳
这是___。|🚗|汽车
这是___。|🏠|房子
这是___。|🌳|大树
这是___。|🎒|书包
这是___。|🚂|火车
这是___。|⭐|星星
___在___。|🐟💧|小鱼,水里
___在___。|🐦🌳|小鸟,树上
___在___。|🐱🛏️|小猫,床上
___在___。|👩🏠|妈妈,家里
___在___。|👦🏫|小明,学校
___在___。|🐸🍃|青蛙,叶子上
___在___。|☁️🔵|白云,天上
___在___。|🐶🌳|小狗,树下
`;
const PATPY = { '我喜欢___。': 'wǒ xǐ huan', '我想吃___。': 'wǒ xiǎng chī', '这是___。': 'zhè shì', '___在___。': 'zài' };
const L2 = L2_TXT.trim().split('\n').map((l, i) => {
  const [pat, emoji, w] = l.split('|');
  return { i, pat, emoji, words: w.split(',') };
});
const L3 = [
  '👧📖', '🐶⚽', '🌞🌳', '☔🧒', '🌨️⛄', '🐱🐟', '🍎🧺', '🚌🏫', '🏠👨‍👩‍👧', '🎂🎈',
  '🌙⭐', '🐦🌸', '🚗🛣️', '🧒🚲', '🐘💧', '🐸🌧️', '🍉🏖️', '🦆🏞️', '🎨🖌️', '🧑‍🍳🍳',
  '⛷️❄️', '🌈☁️', '🧸🛏️', '🍲👩', '🐰🥕', '🐻🍯', '🦋🌷', '🎵👧', '🏀👦', '🐑🌿',
  '🚂🌄', '🐟🎣', '🌻☀️', '🍂🌳',
];
if (new Set(L3).size !== L3.length) throw new Error('duplicate L3 scenes');

const c24 = {
  id: 'c24',
  icon: '📝',
  title: T('J’écris une phrase 写一句话', 'I write a sentence 写一句话', H('写一句话', 'xiě yí jù huà')),
  pfeq: 'Chinois — écriture (1re année) : copier, compléter et écrire une phrase',
  generate(level, R) {
    const l = lv(level);
    if (l === 1) {
      const i = R.int(0, SENT.length - 1), e = SENT[i];
      return hand({
        mode: 'dictation', key: `c24-l1-${i}`, prompt: H('把这句话抄下来。', 'bǎ zhè jù huà chāo xià lái'),
        stimulus: { hz: e.hz, py: e.py }, say: say(e.hz), expected: e.hz, lines: 2,
      });
    }
    if (l === 2) {
      const e = R.pick(L2);
      return hand({
        mode: 'sentence', key: `c24-l2-${e.i}`,
        prompt: HC(H('看图，把句子写完整：', 'kàn tú bǎ jù zi xiě wán zhěng'), { hz: e.pat, py: PATPY[e.pat] }),
        stimulus: { emoji: e.emoji }, words: e.words, minWords: 4, lines: 2,
      });
    }
    const i = R.int(0, L3.length - 1);
    return hand({
      mode: 'sentence', key: `c24-l3-${i}`,
      prompt: H('看图，用中文写一句话。', 'kàn tú yòng zhōng wén xiě yí jù huà'),
      stimulus: { emoji: L3[i] }, minWords: 6, lines: 2,
    });
  },
  allSay() { return SENT.map((e) => say(e.hz)); },
};

export const units = [c22, c23, c24];
