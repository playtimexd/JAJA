// g3c14 tones 声调辨析, g3c15 blending / whole syllables 拼读, g3c16 neutral tone & erhua 轻声儿化.
import { WORDS } from './chinois-vocab.js';
import { say, T, H, HC, mc, take, uniq, pyWrong, finish, split, mark, tone, hanLen } from './chinois-lib.js';

const cOpt = (hz, py, withPy = true) => (withPy ? { hz, py, say: say(hz) } : { hz, say: say(hz) });
const ARROW = ['→', '↗', '↘↗', '↘'];
const contour = (t) => ({ text: `${t}  ${ARROW[t - 1]}` });

/* ======================= g3c14 — tones ======================= */
// 4 characters with the same syllable in tones 1–4 (hz py)
const SETS = `
师 shī|十 shí|史 shǐ|是 shì
鸡 jī|急 jí|己 jǐ|记 jì
搭 dā|答 dá|打 dǎ|大 dà
包 bāo|雹 báo|饱 bǎo|抱 bào
汤 tāng|糖 táng|躺 tǎng|烫 tàng
千 qiān|钱 qián|浅 qiǎn|欠 qiàn
烟 yān|盐 yán|眼 yǎn|雁 yàn
腰 yāo|摇 yáo|咬 yǎo|药 yào
只 zhī|直 zhí|纸 zhǐ|至 zhì
呼 hū|湖 hú|虎 hǔ|户 hù
梳 shū|熟 shú|鼠 shǔ|术 shù
踢 tī|题 tí|体 tǐ|替 tì
温 wēn|文 wén|稳 wěn|问 wèn
猪 zhū|竹 zhú|煮 zhǔ|住 zhù
花 huā|华 huá|话 huà
抓 zhuā|爪 zhǎo|罩 zhào
低 dī|敌 dí|底 dǐ|地 dì
`.trim().split('\n').map((l) => l.split('|').map((x) => { const [h, p] = x.trim().split(' '); return { hz: h, py: p }; })).filter((g) => g.length === 4 && new Set(g.map((x) => split(x.py).base)).size === 1);
const SANDHI = `
一|个|yí gè|一个
一|天|yì tiān|一天
一|年|yì nián|一年
一|只|yì zhī|一只
一|起|yì qǐ|一起
一|本|yì běn|一本
一|条|yì tiáo|一条
一|棵|yì kē|一棵
一|朵|yì duǒ|一朵
一|张|yì zhāng|一张
一|件|yí jiàn|一件
一|块|yí kuài|一块
一|半|yí bàn|一半
一|定|yí dìng|一定
一|样|yí yàng|一样
一|边|yì biān|一边
一|些|yì xiē|一些
一|首|yì shǒu|一首
一|双|yì shuāng|一双
一|次|yí cì|一次
一|直|yì zhí|一直
不|是|bú shì|不是
不|好|bù hǎo|不好
不|来|bù lái|不来
不|对|bú duì|不对
不|去|bú qù|不去
不|吃|bù chī|不吃
不|看|bú kàn|不看
不|怕|bú pà|不怕
不|多|bù duō|不多
不|高|bù gāo|不高
不|能|bù néng|不能
不|行|bù xíng|不行
不|大|bú dà|不大
不|要|bú yào|不要
不|会|bú huì|不会
不|累|bú lèi|不累
不|渴|bù kě|不渴
不|饿|bú è|不饿
`.trim().split('\n').map((l) => { const [a, b, py, hz] = l.split('|'); return { a, hz, py, t: py.split(' ')[0] }; });
const SANDHI_TIP = H('变调：在第四声前面，一读 yí，不读 bú；在第一、二、三声前面，一读 yì，不还是读 bù。', 'biàn diào zài dì sì shēng qián miàn yī dú bù dú zài dì yī èr sān shēng qián miàn yī dú bù hái shì dú');
const toneTip = (g) => HC(H('同一个音，四个声调：', 'tóng yí gè yīn sì gè shēng diào'), ...g.flatMap((x, i) => (i ? [' · ', x] : [x])), '。');
const W2 = WORDS.filter((w) => hanLen(w.hz) === 2 && w.py.split(' ').every((s) => tone(s)));
const W3 = WORDS.filter((w) => hanLen(w.hz) >= 3 && w.py.split(' ').every((s) => tone(s)));
const g3c14 = finish({
  id: 'g3c14', icon: '🎼', title: { ...T('Écouter les tons 声调辨析', 'Telling tones apart 声调辨析'), zh: H('声调辨析', 'shēng diào biàn xī') },
  pfeq: 'Chinois — pinyin : distinguer les quatre tons et les changements de ton (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const g = R.pick(SETS), x = R.pick(g);
    const hearSet = () => mc(`ts-${x.hz}`, H('听一听，你听到的是哪个字？', 'tīng yì tīng nǐ tīng dào de shì nǎ gè zì'), cOpt(x.hz, x.py, lvl < 3), R.sample(g.filter((y) => y !== x), lvl === 1 ? 2 : 3).map((y) => cOpt(y.hz, y.py, lvl < 3)), { say: say(x.hz), cols: 2, tip: toneTip(g) });
    const toneOf = () => mc(`to-${x.hz}`, H('这个字读第几声？', 'zhè gè zì dú dì jǐ shēng'), contour(tone(x.py)), [1, 2, 3, 4].filter((t) => t !== tone(x.py)).slice(0, lvl === 1 ? 2 : 3).map(contour), { stimulus: { hz: x.hz, py: x.py }, say: say(x.hz), cols: 2, tip: toneTip(g) });
    const pyPick = (pool, n) => { const w = R.pick(pool); return mc(`tw-${w.hz}`, H('听一听，哪个拼音是对的？', 'tīng yì tīng nǎ gè pīn yīn shì duì de'), { py: w.py }, pyWrong(R, w.py, 3).slice(0, n).map((p) => ({ py: p })), { stimulus: { hz: w.hz }, say: say(w.hz), cols: 2, tip: HC(w, H('读作', 'dú zuò'), ` ${w.py}。`) }); };
    const sandhi = () => {
      const s = R.pick(SANDHI), base = s.a === '一' ? ['yī', 'yí', 'yì'] : ['bù', 'bú', 'bǔ'];
      return mc(`sd-${s.hz}`, H('听一听，这个词的第一个字怎么读？', 'tīng yì tīng zhè gè cí de dì yī gè zì zěn me dú'), { py: s.t }, base.filter((p) => p !== s.t).map((p) => ({ py: p })).slice(0, s.a === '一' ? 2 : 2), { stimulus: { hz: s.hz }, say: say(s.hz), cols: 3, tip: SANDHI_TIP });
    };
    if (lvl === 1) return R.pick([hearSet, toneOf, hearSet])();
    if (lvl === 2) return R.pick([hearSet, toneOf, () => pyPick(W2, 2), () => pyPick(W2, 3)])();
    return R.pick([hearSet, sandhi, sandhi, () => pyPick(W2, 3), () => pyPick(W3, 3)])();
  },
  allSay() { return [...SETS.flat().map((x) => say(x.hz)), ...SANDHI.map((s) => say(s.hz)), ...W2.map((w) => say(w.hz)), ...W3.map((w) => say(w.hz))]; },
});

/* ======================= g3c15 — blending, whole syllables ======================= */
const WHOLE = `
知 zhī|吃 chī|是 shì|日 rì|字 zì|词 cí|四 sì|一 yī|五 wǔ|鱼 yú|叶 yè|月 yuè|远 yuǎn|音 yīn|云 yún|英 yīng
`.trim().split('|').map((x) => { const [h, p] = x.trim().split(' '); return { hz: h, py: p }; });
const SPELL = `
妈 mā|大 dà|花 huā|书 shū|小 xiǎo|家 jiā|飞 fēi|豆 dòu|草 cǎo|三 sān|看 kàn|爬 pá|毛 máo|灯 dēng|船 chuán|熊 xióng|鸟 niǎo|鞋 xié|手 shǒu|桌 zhuō|蓝 lán|冰 bīng|球 qiú|笑 xiào
`.trim().split('|').map((x) => { const [h, p] = x.trim().split(' '); return { hz: h, py: p }; });
const INI = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's'];
const parts = (py) => { const { base, tone: t } = split(py); const ini = INI.find((i) => base.startsWith(i) && base.length > i.length) || ''; return { ini, fin: base.slice(ini.length), t }; };
const BLEND = SPELL.map((x) => ({ ...x, ...parts(x.py) })).map((x) => ({ ...x, finM: mark(x.fin.replace('v', 'ü'), x.t) }));
const BLEND_TIP = (x) => HC(`${x.ini} + ${x.finM} = ${x.py}  `, { hz: x.hz, py: x.py }, '。');
const NEAR_INI = { b: 'p', p: 'b', d: 't', t: 'd', g: 'k', k: 'g', j: 'q', q: 'j', zh: 'ch', ch: 'zh', sh: 's', s: 'sh', z: 'c', c: 'z', l: 'n', n: 'l', f: 'h', h: 'f', x: 'sh', m: 'n', r: 'l' };
// ü after j q x is written u; y/w rules
const UROWS = `
去 qù|qǜ
菊 jú|jǘ
须 xū|xǖ
取 qǔ|qǚ
句 jù|jǜ
雪 xuě|xüě
全 quán|qüán
选 xuǎn|xüǎn
圈 quān|qüān
军 jūn|jǘn
`.trim().split('\n').map((l) => { const [a, w] = l.split('|'); const [h, p] = a.split(' '); return { hz: h, py: p, wrong: w }; });
const YW = `
i|yi|衣 yī
ia|ya|牙 yá
ie|ye|叶 yè
iao|yao|药 yào
iu|you|有 yǒu
ian|yan|眼 yǎn
in|yin|音 yīn
ing|ying|英 yīng
u|wu|五 wǔ
ua|wa|娃 wá
uo|wo|我 wǒ
uai|wai|外 wài
ui|wei|为 wèi
uan|wan|玩 wán
un|wen|文 wén
ü|yu|鱼 yú
üe|yue|月 yuè
üan|yuan|远 yuǎn
ün|yun|云 yún
`.trim().split('\n').map((l) => { const [f, w, c] = l.split('|'); const [h, p] = c.split(' '); return { fin: f, written: w, hz: h, py: p }; });
const WT = WORDS.filter((w) => hanLen(w.hz) <= 3);
const WHOLE_TIP = HC(H('整体认读音节不用拼，直接读：', 'zhěng tǐ rèn dú yīn jié bú yòng pīn zhí jiē dú'), ' zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying');
const g3c15 = finish({
  id: 'g3c15', icon: '🧩', title: { ...T('Épeler et lire le pinyin 拼读', 'Spelling and reading pinyin 拼读'), zh: H('拼读', 'pīn dú') },
  pfeq: 'Chinois — pinyin : syllabes à lecture globale, assemblage, règles d’écriture (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const hearWhole = () => { const x = R.pick(WHOLE); return mc(`wh-${x.hz}`, H('听一听，你听到的是哪个整体认读音节？', 'tīng yì tīng nǐ tīng dào de shì nǎ gè zhěng tǐ rèn dú yīn jié'), { py: x.py }, take(R, WHOLE.filter((y) => y !== x), lvl === 1 ? 2 : 3).map((y) => ({ py: y.py })), { stimulus: { hz: x.hz }, say: say(x.hz), cols: 2, tip: WHOLE_TIP }); };
    const blend = () => {
      const x = R.pick(BLEND);
      const wr = [...new Set([mark(x.fin.replace('v', 'ü'), x.t === 1 ? 2 : 1) && `${NEAR_INI[x.ini] || 'b'}${mark(x.fin.replace('v', 'ü'), x.t)}`, ...pyWrong(R, x.py, 3)])].filter((p) => p !== x.py);
      return mc(`bl-${x.hz}`, HC(H('拼一拼：', 'pīn yì pīn'), ` ${x.ini} + ${x.finM} = ?`), { py: x.py }, wr.slice(0, lvl === 1 ? 2 : 3).map((p) => ({ py: p })), { say: say(x.hz), cols: 2, tip: BLEND_TIP(x) });
    };
    const wholeOrSpell = () => {
      const k = lvl === 2 ? 2 : 3;
      const items = R.shuffle([...take(R, WHOLE, k).map((x) => ({ hz: x.hz, py: x.py, bin: 0, say: say(x.hz) })), ...take(R, SPELL, k).map((x) => ({ hz: x.hz, py: x.py, bin: 1, say: say(x.hz) }))]);
      return { type: 'sort', key: `ws-${items.map((i) => i.hz).sort().join('')}`, prompt: H('分一分：哪些是整体认读音节，哪些要拼着读？', 'fēn yì fēn nǎ xiē shì zhěng tǐ rèn dú yīn jié nǎ xiē yào pīn zhe dú'), bins: [H('整体认读', 'zhěng tǐ rèn dú'), H('拼着读', 'pīn zhe dú')], items, tip: WHOLE_TIP };
    };
    const hearWord = () => {
      const w = R.pick(WT);
      const d = take(R, WT.filter((x) => x.hz !== w.hz && hanLen(x.hz) === hanLen(w.hz)), lvl === 1 ? 2 : 3);
      return mc(`hwd-${w.hz}`, H('听一听，你听到的是哪个词？', 'tīng yì tīng nǐ tīng dào de shì nǎ gè cí'), { hz: w.hz }, d.map((x) => ({ hz: x.hz })), { say: say(w.hz), cols: 2, tip: HC(w, H('读作', 'dú zuò'), ` ${w.py}。`) });
    };
    const uRule = () => {
      const x = R.pick(UROWS);
      return mc(`ur-${x.hz}`, HC(H('这个字的拼音怎么写？', 'zhè gè zì de pīn yīn zěn me xiě'), '（j q x + ü）'), { py: x.py }, [{ py: x.wrong }, ...pyWrong(R, x.py, 2).map((p) => ({ py: p }))], { stimulus: { hz: x.hz }, say: say(x.hz), cols: 2, tip: H('小ü见了j、q、x，去掉两点还读ü：qù、jú、xū；y后面也一样：yú。n、l后面要写两点：nǚ、lǜ。', 'xiǎo jiàn le qù diào liǎng diǎn hái dú hòu miàn yě yí yàng hòu miàn yào xiě liǎng diǎn') });
    };
    const ywRule = () => {
      const x = R.pick(YW);
      const wr = R.sample(YW.filter((y) => y.written !== x.written), 3).map((y) => y.written);
      return mc(`yw-${x.fin}`, HC(H('韵母', 'yùn mǔ'), ` ${x.fin} `, H('前面没有声母，要怎么写？', 'qián miàn méi yǒu shēng mǔ yào zěn me xiě')), { py: x.written }, [...wr, x.fin === 'ü' ? 'u' : `y${x.fin}`].filter((p) => p !== x.written).slice(0, 3).map((p) => ({ py: p })), { stimulus: { hz: x.hz, py: x.py }, say: say(x.hz), cols: 2, tip: HC(` ${x.fin} → ${x.written}  `, { hz: x.hz, py: x.py }, '。') });
    };
    if (lvl === 1) return R.pick([hearWhole, blend, hearWord, hearWord])();
    if (lvl === 2) return R.pick([hearWhole, blend, blend, wholeOrSpell, hearWord, hearWord])();
    return R.pick([uRule, ywRule, ywRule, blend, hearWord, wholeOrSpell])();
  },
  allSay() { return [...WHOLE, ...SPELL, ...UROWS, ...YW].map((x) => say(x.hz)).concat(WT.map((w) => say(w.hz))); },
});

/* ======================= g3c16 — neutral tone, erhua ======================= */
const NEUT = `
妈妈|mā ma
爸爸|bà ba
爷爷|yé ye
奶奶|nǎi nai
哥哥|gē ge
姐姐|jiě jie
弟弟|dì di
妹妹|mèi mei
桌子|zhuō zi
椅子|yǐ zi
孩子|hái zi
帽子|mào zi
鼻子|bí zi
袜子|wà zi
裙子|qún zi
杯子|bēi zi
房子|fáng zi
勺子|sháo zi
筷子|kuài zi
耳朵|ěr duo
眼睛|yǎn jing
星星|xīng xing
朋友|péng you
喜欢|xǐ huan
窗户|chuāng hu
衣服|yī fu
东西|dōng xi
豆腐|dòu fu
萝卜|luó bo
葡萄|pú tao
石头|shí tou
木头|mù tou
头发|tóu fa
地方|dì fang
时候|shí hou
我们|wǒ men
你们|nǐ men
他们|tā men
明白|míng bai
漂亮|piào liang
休息|xiū xi
先生|xiān sheng
姑娘|gū niang
太太|tài tai
舒服|shū fu
月亮|yuè liang
`.trim().split('\n').map((l) => { const [h, p] = l.split('|'); if (hanLen(h) !== p.split(' ').length) throw new Error('neutral py ' + h); return { hz: h, py: p }; });
const FULL = `
大山|dà shān
山水|shān shuǐ
白云|bái yún
小鸟|xiǎo niǎo
天空|tiān kōng
老师|lǎo shī
学校|xué xiào
火车|huǒ chē
书包|shū bāo
汽车|qì chē
花朵|huā duǒ
大海|dà hǎi
红花|hóng huā
小鱼|xiǎo yú
蓝天|lán tiān
铅笔|qiān bǐ
电话|diàn huà
春天|chūn tiān
苹果|píng guǒ
香蕉|xiāng jiāo
米饭|mǐ fàn
面包|miàn bāo
老虎|lǎo hǔ
大象|dà xiàng
公园|gōng yuán
河水|hé shuǐ
森林|sēn lín
飞机|fēi jī
`.trim().split('\n').map((l) => { const [h, p] = l.split('|'); if (hanLen(h) !== p.split(' ').length) throw new Error('full py ' + h); return { hz: h, py: p }; });
// erhua: written 儿 → one syllable with final -r
const ER = `
花儿|huār|la fleur|flower
鸟儿|niǎor|l’oiseau|bird
画儿|huàr|le dessin|picture
玩儿|wánr|jouer|to play
这儿|zhèr|ici|here
那儿|nàr|là-bas|there
哪儿|nǎr|où|where
事儿|shìr|l’affaire|matter
小孩儿|xiǎo háir|l’enfant|child
点儿|diǎnr|un peu|a little
歌儿|gēr|la chanson|song
空儿|kòngr|le temps libre|free time
小鱼儿|xiǎo yúr|le petit poisson|little fish
冰棍儿|bīng gùnr|la glace sur bâtonnet|ice lolly
门儿|ménr|la porte|door
一会儿|yí huìr|un instant|a moment
`.trim().split('\n').map((l) => { const [h, p, fr, en] = l.split('|'); return { hz: h, py: p, fr, en }; });
const NEUT_TIP = H('轻声：第二个字读得又短又轻，不标声调：mā ma、zhuō zi。', 'qīng shēng dì èr gè zì dú de yòu duǎn yòu qīng bù biāo shēng diào');
// erhua word with pinyin over each character: 儿 shows « r » (花儿 huā r), written together as huār
const erPy = (e) => e.py.replace(/r$/, ' r');
const erW = (e) => ({ hz: e.hz, py: erPy(e) });
const erTip = (e) => HC(erW(e), H('读作', 'dú zuò'), ` ${e.py}：`, H('儿和前面的音连在一起，只读一个音节。', 'ér hé qián miàn de yīn lián zài yì qǐ zhǐ dú yí gè yīn jié'));
const g3c16 = finish({
  id: 'g3c16', icon: '🪶', title: { ...T('Ton léger et « r » final 轻声儿化', 'Light tone and the “r” sound 轻声儿化'), zh: H('轻声和儿化', 'qīng shēng hé ér huà') },
  pfeq: 'Chinois — pinyin : le ton neutre (轻声) et la finale en -r (儿化) (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const hearNeut = () => {
      const w = R.pick(NEUT); const [a, b] = w.py.split(' ');
      const t = tone(a);
      const wr = [`${a} ${mark(split(b).base, 1)}`, `${a} ${mark(split(b).base, 4)}`, `${mark(split(a).base, t === 1 ? 2 : 1)} ${b}`, `${a} ${mark(split(b).base, 3)}`].filter((p) => p !== w.py);
      return mc(`nt-${w.hz}`, H('听一听，哪个拼音是对的？第二个字读轻声。', 'tīng yì tīng nǎ gè pīn yīn shì duì de dì èr gè zì dú qīng shēng'), { py: w.py }, wr.slice(0, lvl === 1 ? 2 : 3).map((p) => ({ py: p })), { stimulus: { hz: w.hz }, say: say(w.hz), cols: 2, tip: NEUT_TIP });
    };
    const whichLight = () => {
      const w = R.pick(NEUT);
      return mc(`wl-${w.hz}`, H('哪个字读轻声？', 'nǎ gè zì dú qīng shēng'), H('第二个字', 'dì èr gè zì'), [H('第一个字', 'dì yī gè zì'), H('都不读轻声', 'dōu bù dú qīng shēng')], { stimulus: { hz: w.hz, py: w.py }, say: say(w.hz), cols: 3, tip: NEUT_TIP });
    };
    const sortLight = () => {
      const k = lvl === 1 ? 2 : lvl === 2 ? 3 : 4;
      const items = R.shuffle([...take(R, NEUT, k).map((x) => ({ hz: x.hz, py: x.py, bin: 0, say: say(x.hz) })), ...take(R, FULL, k).map((x) => ({ hz: x.hz, py: x.py, bin: 1, say: say(x.hz) }))]);
      return { type: 'sort', key: `sl-${items.map((i) => i.hz).sort().join('')}`, prompt: H('分一分：哪些词的第二个字读轻声？', 'fēn yì fēn nǎ xiē cí de dì èr gè zì dú qīng shēng'), bins: [H('读轻声', 'dú qīng shēng'), H('不读轻声', 'bù dú qīng shēng')], items, tip: NEUT_TIP };
    };
    const erPick = () => {
      const e = R.pick(ER);
      const base = e.py.replace(/r$/, '');
      const wr = [`${base} ér`, base, `${base}rr`.replace('rr', 'er'), pyWrong(R, base, 1)[0] ? `${pyWrong(R, base, 1)[0]}r` : ''].filter((p) => p && p !== e.py);
      return mc(`er-${e.hz}`, H('听一听，这个儿化词的拼音怎么写？', 'tīng yì tīng zhè gè ér huà cí de pīn yīn zěn me xiě'), { py: e.py }, [...new Set(wr)].slice(0, lvl === 1 ? 2 : 3).map((p) => ({ py: p })), { stimulus: { hz: e.hz }, say: say(e.hz), cols: 2, tip: erTip(e) });
    };
    const erCount = () => {
      const e = R.pick(ER); const n = [...e.hz].length;
      return mc(`ec-${e.hz}`, H('这个词读几个音节？儿和前面的音一起读。', 'zhè gè cí dú jǐ gè yīn jié ér hé qián miàn de yīn yì qǐ dú'), { text: String(n - 1) }, [{ text: String(n) }, { text: String(n + 1) }], { stimulus: { hz: e.hz }, say: say(e.hz), cols: 3, tip: erTip(e) });
    };
    // listen to an erhua word, pick it (no French/English meaning)
    const erMean = () => {
      const e = R.pick(ER);
      return mc(`em-${e.hz}`, H('听一听，你听到的是哪个儿化词？', 'tīng yì tīng nǐ tīng dào de shì nǎ gè ér huà cí'), lvl === 1 ? erW(e) : { hz: e.hz }, take(R, ER.filter((x) => x.hz !== e.hz), lvl === 1 ? 2 : 3).map((x) => (lvl === 1 ? erW(x) : { hz: x.hz })), { say: say(e.hz), cols: 2, tip: erTip(e) });
    };
    if (lvl === 1) return R.pick([hearNeut, whichLight, sortLight, erMean])();
    if (lvl === 2) return R.pick([hearNeut, sortLight, erPick, erMean, erCount])();
    return R.pick([hearNeut, sortLight, erPick, erPick, erCount, erMean])();
  },
  allSay() { return [...NEUT, ...FULL, ...ER].map((x) => say(x.hz)); },
});

export const units = [g3c14, g3c15, g3c16];
