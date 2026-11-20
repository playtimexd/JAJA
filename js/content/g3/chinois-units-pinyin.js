// g3c14 tones 声调辨析, g3c15 blending / whole syllables 拼读, g3c16 neutral tone & erhua 轻声儿化.
import { WORDS } from './chinois-vocab.js';
import { say, T, mc, take, uniq, pyWrong, finish, split, mark, tone, hanLen } from './chinois-lib.js';

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
const SANDHI_TIP = T('不 et 一 changent de ton : devant un 4e ton, 不 → bú et 一 → yí. Devant les tons 1, 2, 3, 一 → yì (et 不 reste bù).', '不 and 一 change tone: before a 4th tone, 不 → bú and 一 → yí. Before tones 1, 2, 3, 一 → yì (and 不 stays bù).');
const toneTip = (g) => T(`Même syllabe, quatre tons : ${g.map((x) => `${x.hz} ${x.py}`).join(' · ')}.`, `Same syllable, four tones: ${g.map((x) => `${x.hz} ${x.py}`).join(' · ')}.`);
const W2 = WORDS.filter((w) => hanLen(w.hz) === 2 && w.py.split(' ').every((s) => tone(s)));
const W3 = WORDS.filter((w) => hanLen(w.hz) >= 3 && w.py.split(' ').every((s) => tone(s)));
const g3c14 = finish({
  id: 'g3c14', icon: '🎼', title: T('Écouter les tons 声调辨析', 'Telling tones apart 声调辨析'),
  pfeq: 'Chinois — pinyin : distinguer les quatre tons et les changements de ton (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const g = R.pick(SETS), x = R.pick(g);
    const hearSet = () => mc(`ts-${x.hz}`, T('Écoute. Quel caractère entends-tu ?', 'Listen. Which character do you hear?'), cOpt(x.hz, x.py, lvl < 3), R.sample(g.filter((y) => y !== x), lvl === 1 ? 2 : 3).map((y) => cOpt(y.hz, y.py, lvl < 3)), { say: say(x.hz), cols: 2, tip: toneTip(g) });
    const toneOf = () => mc(`to-${x.hz}`, T('Quel est le ton de ce caractère ?', 'Which tone is this character?'), contour(tone(x.py)), [1, 2, 3, 4].filter((t) => t !== tone(x.py)).slice(0, lvl === 1 ? 2 : 3).map(contour), { stimulus: { hz: x.hz, py: x.py }, say: say(x.hz), cols: 2, tip: toneTip(g) });
    const pyPick = (pool, n) => { const w = R.pick(pool); return mc(`tw-${w.hz}`, T('Écoute. Quel est le bon pinyin ?', 'Listen. What is the right pinyin?'), { py: w.py }, pyWrong(R, w.py, 3).slice(0, n).map((p) => ({ py: p })), { stimulus: lvl === 3 ? { hz: w.hz } : { hz: w.hz }, say: say(w.hz), cols: 2, tip: T(`${w.hz} se lit ${w.py}.`, `${w.hz} is read ${w.py}.`) }); };
    const sandhi = () => {
      const s = R.pick(SANDHI), base = s.a === '一' ? ['yī', 'yí', 'yì'] : ['bù', 'bú', 'bǔ'];
      return mc(`sd-${s.hz}`, T(`Comment lit-on « ${s.a} » dans ce mot ?`, `How is “${s.a}” read in this word?`), { py: s.t }, base.filter((p) => p !== s.t).map((p) => ({ py: p })).slice(0, s.a === '一' ? 2 : 2), { stimulus: { hz: s.hz }, say: say(s.hz), cols: 3, tip: SANDHI_TIP });
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
const BLEND_TIP = (x) => T(`${x.ini} + ${x.finM} = ${x.py} (${x.hz}).`, `${x.ini} + ${x.finM} = ${x.py} (${x.hz}).`);
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
const g3c15 = finish({
  id: 'g3c15', icon: '🧩', title: T('Épeler et lire le pinyin 拼读', 'Spelling and reading pinyin 拼读'),
  pfeq: 'Chinois — pinyin : syllabes à lecture globale, assemblage, règles d’écriture (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const hearWhole = () => { const x = R.pick(WHOLE); return mc(`wh-${x.hz}`, T('Écoute. Quelle syllabe entends-tu ? (Syllabe à lire en bloc)', 'Listen. Which syllable do you hear? (Read as a whole)'), { py: x.py }, take(R, WHOLE.filter((y) => y !== x), lvl === 1 ? 2 : 3).map((y) => ({ py: y.py })), { stimulus: { hz: x.hz }, say: say(x.hz), cols: 2, tip: T('zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying se lisent en bloc : on ne les épelle pas.', 'zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying are read as a whole, not spelled.') }); };
    const blend = () => {
      const x = R.pick(BLEND);
      const wr = [...new Set([mark(x.fin.replace('v', 'ü'), x.t === 1 ? 2 : 1) && `${NEAR_INI[x.ini] || 'b'}${mark(x.fin.replace('v', 'ü'), x.t)}`, ...pyWrong(R, x.py, 3)])].filter((p) => p !== x.py);
      return mc(`bl-${x.hz}`, T(`Assemble : ${x.ini} + ${x.finM} = ?`, `Blend: ${x.ini} + ${x.finM} = ?`), { py: x.py }, wr.slice(0, lvl === 1 ? 2 : 3).map((p) => ({ py: p })), { say: say(x.hz), cols: 2, tip: BLEND_TIP(x) });
    };
    const wholeOrSpell = () => {
      const k = lvl === 2 ? 2 : 3;
      const items = R.shuffle([...take(R, WHOLE, k).map((x) => ({ hz: x.hz, py: x.py, bin: 0, say: say(x.hz) })), ...take(R, SPELL, k).map((x) => ({ hz: x.hz, py: x.py, bin: 1, say: say(x.hz) }))]);
      return { type: 'sort', key: `ws-${items.map((i) => i.hz).sort().join('')}`, prompt: T('Quelles syllabes se lisent en bloc ? Trie-les.', 'Which syllables are read as a whole? Sort them.'), bins: [{ text: T('en bloc 整体认读', 'whole 整体认读') }, { text: T('à épeler', 'spelled out') }], items, tip: T('Les 16 syllabes en bloc : zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying.', 'The 16 whole syllables: zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying.') };
    };
    const hearWord = () => {
      const w = R.pick(WT);
      const d = take(R, WT.filter((x) => x.hz !== w.hz && hanLen(x.hz) === hanLen(w.hz)), lvl === 1 ? 2 : 3);
      return mc(`hwd-${w.hz}`, T('Écoute le mot. Quels caractères entends-tu ?', 'Listen to the word. Which characters do you hear?'), { hz: w.hz }, d.map((x) => ({ hz: x.hz })), { say: say(w.hz), cols: 2, tip: T(`${w.hz} se lit ${w.py}.`, `${w.hz} is read ${w.py}.`) });
    };
    const uRule = () => {
      const x = R.pick(UROWS);
      return mc(`ur-${x.hz}`, T('Comment écrit-on ce son ? (j, q, x + ü)', 'How is this sound written? (j, q, x + ü)'), { py: x.py }, [{ py: x.wrong }, ...pyWrong(R, x.py, 2).map((p) => ({ py: p }))], { stimulus: { hz: x.hz }, say: say(x.hz), cols: 2, tip: T('Après j, q, x (et y), le ü s’écrit u sans les deux points : qù, jú, xū, yú. Après n et l, on garde ü : nǚ, lǜ.', 'After j, q, x (and y), ü is written u without dots: qù, jú, xū, yú. After n and l, keep ü: nǚ, lǜ.') });
    };
    const ywRule = () => {
      const x = R.pick(YW);
      const wr = R.sample(YW.filter((y) => y.written !== x.written), 3).map((y) => y.written);
      return mc(`yw-${x.fin}`, T(`Quand « ${x.fin} » est seul (sans consonne), comment l’écrit-on ?`, `When “${x.fin}” stands alone (no initial), how is it written?`), { py: x.written }, [...wr, x.fin === 'ü' ? 'u' : `y${x.fin}`].filter((p) => p !== x.written).slice(0, 3).map((p) => ({ py: p })), { stimulus: { hz: x.hz, py: x.py }, say: say(x.hz), cols: 2, tip: T(`${x.fin} sans consonne → ${x.written} (${x.hz} ${x.py}).`, `${x.fin} with no initial → ${x.written} (${x.hz} ${x.py}).`) });
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
const NEUT_TIP = T('Au ton neutre (轻声), la 2e syllabe est courte et légère, sans accent : mā ma, zhuō zi.', 'In the neutral tone (轻声) the 2nd syllable is short and light, with no mark: mā ma, zhuō zi.');
const erTip = (e) => T(`${e.hz} se lit ${e.py} : 儿 s’ajoute au son précédent (une seule syllabe). ${e.fr}.`, `${e.hz} is read ${e.py}: 儿 merges into the previous sound (one syllable). ${e.en}.`);
const g3c16 = finish({
  id: 'g3c16', icon: '🪶', title: T('Ton léger et « r » final 轻声儿化', 'Light tone and the “r” sound 轻声儿化'),
  pfeq: 'Chinois — pinyin : le ton neutre (轻声) et la finale en -r (儿化) (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const hearNeut = () => {
      const w = R.pick(NEUT); const [a, b] = w.py.split(' ');
      const t = tone(a);
      const wr = [`${a} ${mark(split(b).base, 1)}`, `${a} ${mark(split(b).base, 4)}`, `${mark(split(a).base, t === 1 ? 2 : 1)} ${b}`, `${a} ${mark(split(b).base, 3)}`].filter((p) => p !== w.py);
      return mc(`nt-${w.hz}`, T('Écoute. Quel est le bon pinyin ? (2e syllabe légère)', 'Listen. What is the right pinyin? (2nd syllable light)'), { py: w.py }, wr.slice(0, lvl === 1 ? 2 : 3).map((p) => ({ py: p })), { stimulus: { hz: w.hz }, say: say(w.hz), cols: 2, tip: NEUT_TIP });
    };
    const whichLight = () => {
      const w = R.pick(NEUT);
      return mc(`wl-${w.hz}`, T('Quelle syllabe est légère (轻声) ?', 'Which syllable is light (轻声)?'), { text: T('la 2e', 'the 2nd') }, [{ text: T('la 1re', 'the 1st') }, { text: T('aucune', 'none') }], { stimulus: { hz: w.hz, py: w.py }, say: say(w.hz), cols: 3, tip: NEUT_TIP });
    };
    const sortLight = () => {
      const k = lvl === 1 ? 2 : lvl === 2 ? 3 : 4;
      const items = R.shuffle([...take(R, NEUT, k).map((x) => ({ hz: x.hz, py: x.py, bin: 0, say: say(x.hz) })), ...take(R, FULL, k).map((x) => ({ hz: x.hz, py: x.py, bin: 1, say: say(x.hz) }))]);
      return { type: 'sort', key: `sl-${items.map((i) => i.hz).sort().join('')}`, prompt: T('Trie les mots : 2e syllabe légère ou deux vrais tons ?', 'Sort the words: light 2nd syllable, or two full tones?'), bins: [{ text: T('ton léger 轻声', 'light tone 轻声') }, { text: T('deux tons pleins', 'two full tones') }], items, tip: NEUT_TIP };
    };
    const erPick = () => {
      const e = R.pick(ER);
      const base = e.py.replace(/r$/, '');
      const wr = [`${base} ér`, base, `${base}rr`.replace('rr', 'er'), pyWrong(R, base, 1)[0] ? `${pyWrong(R, base, 1)[0]}r` : ''].filter((p) => p && p !== e.py);
      return mc(`er-${e.hz}`, T('Écoute. Comment écrit-on ce mot en pinyin ? (finale en -r)', 'Listen. How is this word written in pinyin? (final -r)'), { py: e.py }, [...new Set(wr)].slice(0, lvl === 1 ? 2 : 3).map((p) => ({ py: p })), { stimulus: { text: e.hz }, say: say(e.hz), cols: 2, tip: erTip(e) });
    };
    const erCount = () => {
      const e = R.pick(ER); const n = [...e.hz].length;
      return mc(`ec-${e.hz}`, T('Combien de syllabes entend-on dans ce mot ? (儿 compte avec le son d’avant)', 'How many syllables do you hear in this word? (儿 merges with the sound before)'), { text: String(n - 1) }, [{ text: String(n) }, { text: String(n + 1) }], { stimulus: { text: e.hz }, say: say(e.hz), cols: 3, tip: erTip(e) });
    };
    const erMean = () => {
      const e = R.pick(ER);
      return mc(`em-${e.hz}`, T('Écoute. Que veut dire ce mot ?', 'Listen. What does this word mean?'), { text: T(e.fr, e.en) }, take(R, ER.filter((x) => x.hz !== e.hz), lvl === 1 ? 2 : 3).map((x) => ({ text: T(x.fr, x.en) })), { say: say(e.hz), stimulus: { text: `${e.hz}  ${e.py}` }, tip: erTip(e) });
    };
    if (lvl === 1) return R.pick([hearNeut, whichLight, sortLight, erMean])();
    if (lvl === 2) return R.pick([hearNeut, sortLight, erPick, erMean, erCount])();
    return R.pick([hearNeut, sortLight, erPick, erPick, erCount, erMean])();
  },
  allSay() { return [...NEUT, ...FULL, ...ER].map((x) => say(x.hz)); },
});

export const units = [g3c14, g3c15, g3c16];
