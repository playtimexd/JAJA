// Chinese (中文) units c15–c21 for Petit Hibou: strokes, writing, stroke order, nursery rhymes, poems, short stories.
// Simplified characters + Hanyu Pinyin (tone marks, neutral tone unmarked), 人教版一年级 level.
// Instructions are {fr, en}; Chinese audio is `say: { text, lang: 'zh-CN' }`.

const ZH = 'zh-CN';
const say = (text) => ({ text, lang: ZH });
const isHan = (c) => /\p{Script=Han}/u.test(c);
const hanLen = (s) => [...s].filter(isHan).length;
const T = (fr, en) => ({ fr, en });
const o = (hz, py, extra = {}) => ({ hz, py, say: say(hz), ...extra });
const label = (x) => (x.hz || '') + (x.emoji || '') + (x.svg || '') + (x.hz ? '' : JSON.stringify(x.text ?? ''));
const uniq = (arr) => { const seen = new Set(); return arr.filter((x) => { const k = label(x); if (seen.has(k)) return false; seen.add(k); return true; }); };
function mc(key, prompt, right, wrong, extra = {}) {
  return { type: 'choice', key, prompt, options: uniq([right, ...wrong]), answer: 0, ...extra };
}
function chk(hz, py, where) {
  if (hanLen(hz) !== py.trim().split(/\s+/).length) throw new Error(`pinyin mismatch at ${where}: ${hz} / ${py}`);
}
const ord = (i) => ({ fr: ['1er', '2e', '3e', '4e', '5e', '6e', '7e', '8e'][i], en: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'][i] });

/* ================================================================== */
/*  Pool of common words (for distractors and pictures)                */
/* ================================================================== */
// [hz, py, emoji, kind]  kinds: who (people/animals) p (places) o (objects) v (actions) f (feelings) t (time) n (nature) d (directions)
const POOL_TXT = `
小明|xiǎo míng|👦|who
小美|xiǎo měi|👧|who
妈妈|mā ma|👩|who
爸爸|bà ba|👨|who
奶奶|nǎi nai|👵|who
爷爷|yé ye|👴|who
姐姐|jiě jie|👱‍♀️|who
弟弟|dì di|🧒|who
老师|lǎo shī|🧑‍🏫|who
医生|yī shēng|🧑‍⚕️|who
小狗|xiǎo gǒu|🐶|who
小猫|xiǎo māo|🐱|who
小鸟|xiǎo niǎo|🐦|who
小熊|xiǎo xióng|🐻|who
小兔|xiǎo tù|🐰|who
小鱼|xiǎo yú|🐟|who
小鸭|xiǎo yā|🦆|who
小马|xiǎo mǎ|🐴|who
小猪|xiǎo zhū|🐷|who
小鸡|xiǎo jī|🐤|who
小羊|xiǎo yáng|🐑|who
松鼠|sōng shǔ|🐿️|who
小鹿|xiǎo lù|🦌|who
青蛙|qīng wā|🐸|who
大象|dà xiàng|🐘|who
老虎|lǎo hǔ|🐯|who
猴子|hóu zi|🐵|who
海狸|hǎi lí|🦫|who
家里|jiā lǐ|🏠|p
学校|xué xiào|🏫|p
公园|gōng yuán|⛲|p
河边|hé biān|🎣|p
河里|hé lǐ|🏞️|p
雪地|xuě dì|🌨️|p
冰场|bīng chǎng|🧊|p
海边|hǎi biān|🏖️|p
树林|shù lín|🌲|p
厨房|chú fáng|🍳|p
商店|shāng diàn|🏪|p
医院|yī yuàn|🏥|p
花园|huā yuán|🌷|p
动物园|dòng wù yuán|🦁|p
山上|shān shàng|⛰️|p
床上|chuáng shàng|🛏️|p
树上|shù shàng|🌳|p
苹果|píng guǒ|🍎|o
饺子|jiǎo zi|🥟|o
风筝|fēng zheng|🪁|o
球|qiú|⚽|o
书|shū|📖|o
花|huā|🌸|o
蛋糕|dàn gāo|🎂|o
红包|hóng bāo|🧧|o
枫叶|fēng yè|🍁|o
冰球|bīng qiú|🏒|o
雨伞|yǔ sǎn|☂️|o
帽子|mào zi|🧢|o
面包|miàn bāo|🍞|o
牛奶|niú nǎi|🥛|o
糖|táng|🍬|o
画|huà|🖼️|o
手套|shǒu tào|🧤|o
雪橇|xuě qiāo|🛷|o
玩具|wán jù|🧸|o
饼干|bǐng gān|🍪|o
西瓜|xī guā|🍉|o
香蕉|xiāng jiāo|🍌|o
灯笼|dēng long|🏮|o
飞机|fēi jī|✈️|o
冰鞋|bīng xié|⛸️|o
书包|shū bāo|🎒|o
蜡烛|là zhú|🕯️|o
鞋|xié|👟|o
耳朵|ěr duo|👂|o
牙刷|yá shuā|🪥|o
房子|fáng zi|🏡|o
眼睛|yǎn jing|👀|o
剪刀|jiǎn dāo|✂️|o
小船|xiǎo chuán|⛵|o
吃饭|chī fàn|🍚|v
睡觉|shuì jiào|😴|v
唱歌|chàng gē|🎤|v
跳舞|tiào wǔ|💃|v
看书|kàn shū|📚|v
画画|huà huà|🎨|v
滑冰|huá bīng|⛸️|v
堆雪人|duī xuě rén|⛄|v
打球|dǎ qiú|🏀|v
游泳|yóu yǒng|🏊|v
跑步|pǎo bù|🏃|v
做饭|zuò fàn|🧑‍🍳|v
包饺子|bāo jiǎo zi|🥟|v
洗手|xǐ shǒu|🧼|v
刷牙|shuā yá|🪥|v
放风筝|fàng fēng zheng|🪁|v
拍手|pāi shǒu|👏|v
起床|qǐ chuáng|⏰|v
高兴|gāo xìng|😊|f
难过|nán guò|😢|f
生气|shēng qì|😠|f
害怕|hài pà|😨|f
累|lèi|🥱|f
冷|lěng|🥶|f
热|rè|🥵|f
饿|è|🤤|f
早上|zǎo shang|🌅|t
中午|zhōng wǔ|🕛|t
晚上|wǎn shang|🌙|t
冬天|dōng tiān|❄️|t
夏天|xià tiān|🌞|t
秋天|qiū tiān|🍂|t
春天|chūn tiān|🌷|t
春节|chūn jié|🧨|t
今天|jīn tiān|📅|t
新年|xīn nián|🎆|t
太阳|tài yáng|☀️|n
月亮|yuè liang|🌛|n
星星|xīng xing|⭐|n
白云|bái yún|☁️|n
雨|yǔ|🌧️|n
风|fēng|💨|n
大树|dà shù|🌳|n
小河|xiǎo hé|🌊|n
雪花|xuě huā|❄️|n
彩虹|cǎi hóng|🌈|n
小花|xiǎo huā|🌼|n
东|dōng||d
西|xī||d
南|nán||d
北|běi||d
`.trim().split('\n').map((l) => {
  const [hz, py, emoji, kind] = l.split('|');
  chk(hz, py, 'POOL ' + hz);
  return { hz, py, emoji: emoji || undefined, kind };
});
const POOL = POOL_TXT;
const POOLBY = Object.fromEntries(POOL.map((p) => [p.hz, p]));
const poolOpt = (p, withEmoji) => o(p.hz, p.py, withEmoji && p.emoji ? { emoji: p.emoji } : {});

function wrongWords(R, kind, ans, avoid, n, sameKind) {
  let c = POOL.filter((p) => {
    if (p.hz === ans || (kind !== 'd' && avoid.includes(p.hz)) || p.hz.includes(ans) || ans.includes(p.hz)) return false;
    if (kind === 'd') return p.kind === 'd';
    if (p.kind === 'd') return false;
    return sameKind ? p.kind === kind : p.kind !== kind;
  });
  const sameLen = c.filter((p) => hanLen(p.hz) === hanLen(ans));
  if (sameLen.length >= n) c = sameLen;
  return R.sample(c, n);
}

/* ================================================================== */
/*  Characters (stroke counts) — shared by c15, c16, c17               */
/* ================================================================== */
// hz py strokes fr|en
const CH_TXT = {
  c16a: `
一 yī 1 un|one
二 èr 2 deux|two
三 sān 3 trois|three
十 shí 2 dix|ten
人 rén 2 personne|person
大 dà 3 grand|big
口 kǒu 3 bouche|mouth
山 shān 3 montagne|mountain
土 tǔ 3 terre|earth
上 shàng 3 en haut|up
下 xià 3 en bas|down
小 xiǎo 3 petit|small
了 le 2 déjà (petit mot)|already (little word)
子 zǐ 3 enfant|child
女 nǚ 3 fille, femme|girl, woman
力 lì 2 force|strength
工 gōng 3 travail|work
千 qiān 3 mille|thousand
川 chuān 3 rivière|river
个 gè 3 mot de mesure|measure word
也 yě 3 aussi|also
又 yòu 2 encore|again
刀 dāo 2 couteau|knife
九 jiǔ 2 neuf|nine
七 qī 2 sept|seven
八 bā 2 huit|eight
入 rù 2 entrer|enter
儿 ér 2 enfant (fin de mot)|child (word ending)
几 jǐ 2 combien|how many
`,
  c16b: `
日 rì 4 soleil, jour|sun, day
月 yuè 4 lune|moon
水 shuǐ 4 eau|water
火 huǒ 4 feu|fire
木 mù 4 arbre, bois|tree, wood
天 tiān 4 ciel|sky
中 zhōng 4 milieu|middle
王 wáng 4 roi|king
云 yún 4 nuage|cloud
不 bù 4 non, ne pas|not
开 kāi 4 ouvrir|open
夫 fū 4 mari|husband
文 wén 4 écriture|writing
方 fāng 4 carré|square
心 xīn 4 cœur|heart
午 wǔ 4 midi|noon
友 yǒu 4 ami|friend
太 tài 4 très, trop|very, too
户 hù 4 porte (de maison)|door (of a house)
公 gōng 4 public|public
少 shǎo 4 peu|few
五 wǔ 4 cinq|five
六 liù 4 six|six
本 běn 5 cahier|notebook
北 běi 5 nord|north
左 zuǒ 5 gauche|left
右 yòu 5 droite|right
出 chū 5 sortir|go out
古 gǔ 5 ancien|ancient
正 zhèng 5 juste, droit|correct, straight
外 wài 5 dehors|outside
立 lì 5 se tenir debout|stand
对 duì 5 correct|correct
玉 yù 5 jade|jade
四 sì 5 quatre|four
它 tā 5 il, elle (chose)|it
去 qù 5 aller|go
头 tóu 5 tête|head
冬 dōng 5 hiver|winter
平 píng 5 plat|flat
母 mǔ 5 mère|mother
`,
  c16c: `
多 duō 6 beaucoup|many
回 huí 6 revenir|return
年 nián 6 année|year
在 zài 6 être à|be at
老 lǎo 6 vieux|old
如 rú 6 comme|as
先 xiān 6 d'abord|first
西 xī 6 ouest|west
行 xíng 6 marcher, d'accord|walk, okay
同 tóng 6 pareil|same
朵 duǒ 6 fleur (mot de mesure)|flower (measure word)
吃 chī 6 manger|eat
灰 huī 6 gris|gray
色 sè 6 couleur|colour
共 gòng 6 ensemble|together
光 guāng 6 lumière|light
伞 sǎn 6 parapluie|umbrella
来 lái 7 venir|come
里 lǐ 7 dedans|inside
时 shí 7 temps|time
花 huā 7 fleur|flower
坐 zuò 7 s'asseoir|sit
声 shēng 7 son|sound
听 tīng 7 écouter|listen
男 nán 7 garçon, homme|boy, man
还 hái 7 encore|still
走 zǒu 7 marcher|walk
步 bù 7 pas|step
角 jiǎo 7 corne, coin|horn, corner
`,
  c17a: `
马 mǎ 3 cheval|horse
门 mén 3 porte|door
手 shǒu 4 main|hand
牛 niú 4 vache|cow
车 chē 4 auto|car
书 shū 4 livre|book
他 tā 5 il (garçon, homme)|he
们 men 5 pluriel (ex. nous : 我们)|plural (e.g. we: 我们)
生 shēng 5 naître, vie|born, life
鸟 niǎo 5 oiseau|bird
目 mù 5 œil|eye
田 tián 5 champ|field
禾 hé 5 céréale|grain
白 bái 5 blanc|white
石 shí 5 pierre|stone
瓜 guā 5 melon, courge|melon, squash
`,
  c17b: `
耳 ěr 6 oreille|ear
米 mǐ 6 riz|rice
竹 zhú 6 bambou|bamboo
羊 yáng 6 mouton|sheep
虫 chóng 6 insecte|insect
衣 yī 6 vêtement|clothes
妈 mā 6 maman|mum
好 hǎo 6 bon|good
我 wǒ 7 moi, je|I, me
你 nǐ 7 toi, tu|you
学 xué 8 apprendre|learn
爸 bà 8 papa|dad
鱼 yú 8 poisson|fish
国 guó 8 pays|country
果 guǒ 8 fruit|fruit
的 de 8 de (possession)|of (possession)
雨 yǔ 8 pluie|rain
青 qīng 8 vert-bleu|green-blue
河 hé 8 rivière|river
姐 jiě 8 grande sœur|older sister
妹 mèi 8 petite sœur|younger sister
到 dào 8 arriver|arrive
`,
  c17c: `
春 chūn 9 printemps|spring
秋 qiū 9 automne|autumn
星 xīng 9 étoile|star
看 kàn 9 regarder|look
前 qián 9 devant|front
点 diǎn 9 point, heure|dot, o'clock
很 hěn 9 très|very
说 shuō 9 parler|speak
树 shù 9 arbre|tree
草 cǎo 9 herbe|grass
面 miàn 9 visage, nouilles|face, noodles
家 jiā 10 maison, famille|home, family
高 gāo 10 haut, grand|tall
哥 gē 10 grand frère|older brother
笔 bǐ 10 crayon|pen
鸭 yā 10 canard|duck
站 zhàn 10 être debout|stand
都 dōu 10 tous|all
起 qǐ 10 se lever|rise
谁 shéi 10 qui|who
桌 zhuō 10 table|table
`,
};
const parseCh = (txt) => txt.trim().split('\n').map((l) => {
  const [hz, py, n, ...rest] = l.split(' ');
  const [fr, en] = rest.join(' ').split('|');
  return { hz, py, n: +n, fr, en };
});
const CH = Object.fromEntries(Object.entries(CH_TXT).map(([k, v]) => [k, parseCh(v)]));
const CH_ALL = Object.values(CH).flat();
// characters that TTS reads wrongly alone: speak a short word instead
const SAYWORD = { 了: '好了', 们: '我们', 的: '我的', 个: '一个', 子: '孩子', 儿: '女儿', 也: '也是', 行: '不行', 都: '都是', 还: '还有', 几: '几个', 又: '又来',  };
const chSay = (c) => say(SAYWORD[c.hz] || c.hz);

/* ================================================================== */
/*  c15 — 笔画 (strokes)                                               */
/* ================================================================== */
const STROKES = [
  { n: '横', py: 'héng', d: 'M14 50H86' },
  { n: '竖', py: 'shù', d: 'M50 12V88' },
  { n: '撇', py: 'piě', d: 'M74 14Q64 56 24 86' },
  { n: '捺', py: 'nà', d: 'M22 14Q38 62 84 86' },
  { n: '点', py: 'diǎn', d: 'M42 28L58 56' },
  { n: '提', py: 'tí', d: 'M18 80L84 40' },
  { n: '横折', py: 'héng zhé', d: 'M18 24H78V86' },
  { n: '竖钩', py: 'shù gōu', d: 'M56 12V76Q56 88 36 80' },
  { n: '竖折', py: 'shù zhé', d: 'M28 12V78H86' },
  { n: '横钩', py: 'héng gōu', d: 'M14 34H80L68 58' },
  { n: '横撇', py: 'héng piě', d: 'M18 26H74Q62 58 24 84' },
  { n: '横折钩', py: 'héng zhé gōu', d: 'M18 22H76V82Q76 90 58 84' },
  { n: '斜钩', py: 'xié gōu', d: 'M22 14L68 78Q78 90 88 58' },
  { n: '卧钩', py: 'wò gōu', d: 'M16 36Q40 92 82 56L84 36' },
  { n: '竖提', py: 'shù tí', d: 'M32 12V72Q40 82 84 50' },
  { n: '竖弯钩', py: 'shù wān gōu', d: 'M34 12V68Q34 84 56 84H80V62' },
];
const STROKE = Object.fromEntries(STROKES.map((s) => [s.n, s]));
const strokeSvg = (s) =>
  `<svg viewBox="0 0 100 100" width="130" height="130" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="94" height="94" rx="6" fill="none" stroke="currentColor" stroke-opacity=".25" stroke-dasharray="5 4"/><path d="M50 3V97M3 50H97" stroke="currentColor" stroke-opacity=".12" stroke-dasharray="3 4"/><path d="${s.d}" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const strokeName = (s) => o(s.n, s.py);
const LV_STROKES = { 1: STROKES.slice(0, 6), 2: STROKES.slice(0, 12), 3: STROKES };
const cnt = (arr, lo, hi) => arr.filter((c) => c.n >= lo && c.n <= hi);
const c15Chars = {
  1: cnt(CH_ALL, 1, 3),
  2: cnt(CH_ALL, 4, 6),
  3: cnt(CH_ALL, 7, 10),
};
const c15Pairs = { 1: cnt(CH_ALL, 1, 3), 2: cnt(CH_ALL, 2, 6), 3: cnt(CH_ALL, 3, 10) };
function c15Name(R, level) {
  const list = LV_STROKES[level];
  const s = R.pick(list);
  const w = R.sample(list.filter((x) => x !== s), level === 1 ? 2 : 3);
  return mc(`c15-a-${s.n}-${level}`, T('Quel est le nom de ce trait?', 'What is the name of this stroke?'), strokeName(s), w.map(strokeName), {
    stimulus: { svg: strokeSvg(s) },
    say: say(s.n),
    cols: level === 1 ? 3 : 2,
  });
}
function c15Pic(R, level) {
  const list = LV_STROKES[level];
  const s = R.pick(list);
  const w = R.sample(list.filter((x) => x !== s), level === 1 ? 2 : 3);
  const so = (x) => ({ svg: strokeSvg(x) });
  return mc(`c15-b-${s.n}-${level}`, T('Quel dessin est ce trait?', 'Which drawing is this stroke?'), so(s), w.map(so), {
    stimulus: { hz: s.n, py: s.py },
    say: say(s.n),
    cols: 2,
  });
}
function c15Count(R, level) {
  const c = R.pick(c15Chars[level]);
  const base = { stimulus: { hz: c.hz, py: c.py }, say: chSay(c) };
  const prompt = T('Combien de traits a ce caractère?', 'How many strokes does this character have?');
  if (level === 1) {
    const w = R.sample([c.n - 2, c.n - 1, c.n + 1, c.n + 2].filter((x) => x >= 1), 2);
    return { type: 'choice', key: `c15-c-${c.hz}`, prompt, ...base, options: [c.n, ...w].map((x) => ({ text: String(x) })), answer: 0, cols: 3 };
  }
  return { type: 'keypad', key: `c15-c-${c.hz}`, prompt, ...base, answer: c.n };
}
function c15More(R, level) {
  const pool = c15Pairs[level];
  let a, b, guard = 0;
  do { [a, b] = R.sample(pool, 2); } while (a.n === b.n && guard++ < 50);
  if (a.n === b.n) b = pool.find((x) => x.n !== a.n);
  const big = a.n > b.n ? a : b;
  const small = big === a ? b : a;
  const key = `c15-m-${[a.hz, b.hz].sort().join('')}`;
  return mc(key, T('Quel caractère a le plus de traits?', 'Which character has more strokes?'), o(big.hz, big.py), [o(small.hz, small.py)], { cols: 2 });
}
const c15 = {
  id: 'c15',
  icon: '✏️',
  title: { fr: 'Les traits 笔画', en: 'Strokes 笔画' },
  pfeq: 'Chinois — écriture : les traits de base (1re année)',
  generate(level, R) {
    return R.pick([c15Name, c15Pic, c15Count, c15Count, c15More])(R, level);
  },
};

/* ================================================================== */
/*  c16 / c17 — write                                                  */
/* ================================================================== */
function writeQ(prefix) {
  return (c) => ({
    type: 'write',
    key: `${prefix}-${c.hz}`,
    prompt: T(`Écris le caractère « ${c.fr} » (${c.py}).`, `Write the character “${c.en}” (${c.py}).`),
    say: chSay(c),
    char: c.hz,
    py: c.py,
  });
}
const c16Sets = { 1: CH.c16a, 2: CH.c16b, 3: CH.c16c };
const c17Sets = { 1: CH.c17a, 2: CH.c17b, 3: CH.c17c };
const c16 = {
  id: 'c16',
  icon: '🖌️',
  title: { fr: 'Écrire 1 写字', en: 'Writing 1 写字' },
  pfeq: 'Chinois — écriture (1re année) : caractères simples',
  generate(level, R) { return writeQ('c16')(R.pick(c16Sets[level])); },
};
const c17 = {
  id: 'c17',
  icon: '✍️',
  title: { fr: 'Écrire 2 写字', en: 'Writing 2 写字' },
  pfeq: 'Chinois — écriture (1re année) : caractères des listes 识字表/写字表',
  generate(level, R) { return writeQ('c17')(R.pick(c17Sets[level])); },
};

/* ================================================================== */
/*  c18 — 笔顺 (stroke order)                                          */
/* ================================================================== */
const SEQ_TXT = `
一 yī 横
二 èr 横 横
三 sān 横 横 横
十 shí 横 竖
人 rén 撇 捺
大 dà 横 撇 捺
口 kǒu 竖 横折 横
山 shān 竖 竖折 竖
土 tǔ 横 竖 横
上 shàng 竖 横 横
下 xià 横 竖 点
小 xiǎo 竖钩 点 点
了 le 横撇 竖钩
子 zǐ 横撇 竖钩 横
女 nǚ 撇点 撇 横
力 lì 横折钩 撇
工 gōng 横 竖 横
川 chuān 撇 竖 竖
个 gè 撇 捺 竖
日 rì 竖 横折 横 横
月 yuè 撇 横折钩 横 横
水 shuǐ 竖钩 横撇 撇 捺
火 huǒ 点 撇 撇 捺
木 mù 横 竖 撇 捺
天 tiān 横 横 撇 捺
中 zhōng 竖 横折 横 竖
王 wáng 横 横 竖 横
手 shǒu 撇 横 横 竖钩
不 bù 横 撇 竖 点
太 tài 横 撇 捺 点
牛 niú 撇 横 横 竖
午 wǔ 撇 横 横 竖
云 yún 横 横 撇折 点
开 kāi 横 横 撇 竖
夫 fū 横 横 撇 捺
文 wén 点 横 撇 捺
方 fāng 点 横 横折钩 撇
心 xīn 卧钩 点 点 点
友 yǒu 横 撇 横 撇 捺
目 mù 竖 横折 横 横 横
田 tián 竖 横折 横 竖 横
白 bái 撇 竖 横折 横 横
石 shí 横 撇 竖 横折 横
本 běn 横 竖 撇 捺 横
出 chū 竖 竖折 竖 竖折 竖
生 shēng 撇 横 横 竖 横
`;
const EXTRA_STROKES = { 撇点: 'piě diǎn', 撇折: 'piě zhé', 卧钩: 'wò gōu' };
const strokeInfo = (n) => (STROKE[n] ? STROKE[n] : { n, py: EXTRA_STROKES[n] });
const SEQ = SEQ_TXT.trim().split('\n').map((l) => {
  const [hz, py, ...seq] = l.split(' ');
  return { hz, py, seq };
});
const ALL_STROKE_NAMES = [...new Set(SEQ.flatMap((c) => c.seq))];
for (const n of ALL_STROKE_NAMES) if (!strokeInfo(n).py) throw new Error('stroke py missing ' + n);
const SEQ_LV = { 1: SEQ.filter((c) => c.seq.length <= 3), 2: SEQ.filter((c) => c.seq.length <= 4), 3: SEQ };
const SEQ_POS = (level) => SEQ_LV[level].flatMap((c) => c.seq.map((_, i) => [c, i]));
const noDup = (c) => new Set(c.seq).size === c.seq.length;
const ORDER_L = { 2: SEQ.filter((c) => noDup(c) && c.seq.length <= 3 && c.seq.length >= 2), 3: SEQ.filter((c) => noDup(c) && c.seq.length >= 2) };
const RULES = [
  { hz: '先横后竖', py: 'xiān héng hòu shù', chars: ['十 shí', '干 gàn'] },
  { hz: '先撇后捺', py: 'xiān piě hòu nà', chars: ['人 rén', '入 rù', '八 bā'] },
  { hz: '从上到下', py: 'cóng shàng dào xià', chars: ['三 sān', '二 èr'] },
  { hz: '从左到右', py: 'cóng zuǒ dào yòu', chars: ['川 chuān', '休 xiū', '林 lín'] },
  { hz: '先外后内', py: 'xiān wài hòu nèi', chars: ['月 yuè', '同 tóng', '问 wèn'] },
  { hz: '先中间后两边', py: 'xiān zhōng jiān hòu liǎng biān', chars: ['小 xiǎo', '水 shuǐ', '山 shān'] },
];
const RULE_ITEMS = RULES.flatMap((r, ri) => r.chars.map((s) => { const [hz, py] = s.split(' '); return { hz, py, ri }; }));
function c18Nth(R, level) {
  const [c, i] = R.pick(SEQ_POS(level));
  const ans = strokeInfo(c.seq[i]);
  const wrong = R.sample(ALL_STROKE_NAMES.filter((n) => n !== c.seq[i]).map(strokeInfo), level === 1 ? 2 : 3);
  const last = i === c.seq.length - 1 && c.seq.length > 1;
  const prompt = last
    ? T('Quel est le dernier trait de ce caractère?', 'What is the last stroke of this character?')
    : i === 0
      ? T('Quel est le premier trait de ce caractère?', 'What is the first stroke of this character?')
      : { fr: `Quel est le ${ord(i).fr} trait de ce caractère?`, en: `What is the ${ord(i).en} stroke of this character?` };
  return mc(`c18-n-${c.hz}-${i}`, prompt, strokeName(ans), wrong.map(strokeName), {
    stimulus: { hz: c.hz, py: c.py },
    say: say(SAYWORD[c.hz] || c.hz),
    cols: level === 1 ? 3 : 2,
  });
}
function c18Order(R, level) {
  const c = R.pick(ORDER_L[level]);
  return {
    type: 'order',
    key: `c18-o-${c.hz}`,
    prompt: T('Remets les traits dans le bon ordre.', 'Put the strokes in the right order.'),
    stimulus: { hz: c.hz, py: c.py },
    say: say(c.hz),
    tiles: c.seq.map((n) => ({ hz: n, py: strokeInfo(n).py })),
    joiner: ' ',
  };
}
function c18Rule(R) {
  const it = R.pick(RULE_ITEMS);
  const right = RULES[it.ri];
  const wrong = R.sample(RULES.filter((r) => r !== right), 3);
  const ro = (r) => o(r.hz, r.py);
  return mc(`c18-r-${it.hz}`, T("Quelle règle d'ordre des traits s'applique?", 'Which stroke-order rule applies?'), ro(right), wrong.map(ro), {
    stimulus: { hz: it.hz, py: it.py },
    say: say(it.hz),
    cols: 2,
  });
}
const c18 = {
  id: 'c18',
  icon: '📝',
  title: { fr: 'Ordre des traits 笔顺', en: 'Stroke order 笔顺' },
  pfeq: 'Chinois — écriture (1re année) : ordre des traits',
  generate(level, R) {
    if (level === 1) return c18Nth(R, 1);
    if (level === 2) return R.pick([c18Nth, c18Nth, c18Nth, c18Order])(R, 2);
    return R.pick([c18Nth, c18Nth, c18Order, c18Rule, c18Rule])(R, 3);
  },
};

/* ================================================================== */
/*  Line-based texts: rhymes (c19), poems (c20)                        */
/* ================================================================== */
// line = 'hz | py | blankWord:kind' (blank optional). Kind: who/p/o/v/f/t/n/d
function parseLines(arr, where) {
  return arr.map((s, i) => {
    const [hz, py, b] = s.split(' | ');
    chk(hz, py, `${where}#${i}`);
    return { hz, py, b: b || null };
  });
}
function maskLine(l) {
  const [word, kind] = l.b.split(':');
  const idx = l.hz.indexOf(word);
  if (idx < 0) throw new Error('blank not in line ' + l.hz);
  const before = hanLen(l.hz.slice(0, idx));
  const n = hanLen(word);
  const syl = l.py.split(' ');
  return {
    kind,
    word,
    wordPy: syl.slice(before, before + n).join(' '),
    hz: l.hz.slice(0, idx) + '＿'.repeat(n) + l.hz.slice(idx + word.length),
    py: syl.filter((_, i) => i < before || i >= before + n).join(' '),
  };
}
const joinHz = (ls) => ls.map((l) => l.hz).join('　');
const joinPy = (ls) => ls.map((l) => l.py).join(' ');
const sayAll = (ls) => say(ls.map((l) => l.hz).join('，'));

function nextLineQ(R, prefix, text, i, nOpts, level, mixOther) {
  const cur = text.lines[i], nxt = text.lines[i + 1];
  const others = mixOther.flatMap((t) => t.lines).filter((l) => l.hz !== nxt.hz && l.hz !== cur.hz);
  const same = text.lines.filter((l, j) => j !== i && j !== i + 1);
  let wrong;
  if (level >= 3) {
    const w1 = R.sample(same, Math.min(same.length, nOpts - 1));
    wrong = [...w1, ...R.sample(others, nOpts - 1 - w1.length)];
  } else wrong = R.sample(others, nOpts - 1);
  const lo = (l) => o(l.hz, l.py);
  return mc(`${prefix}-n-${text.id}-${i}`, T('Quelle est la ligne suivante?', 'Which line comes next?'), lo(nxt), wrong.map(lo), {
    stimulus: { hz: cur.hz, py: cur.py },
    say: say(cur.hz),
    cols: 1,
  });
}
function blankQ(R, prefix, text, i, nOpts) {
  const l = text.lines[i];
  const m = maskLine(l);
  const avoid = text.lines.map((x) => x.hz).join('');
  const wrong = wrongWords(R, m.kind, m.word, avoid, nOpts - 1, false);
  const shown = text.lines.map((x, j) => (j === i ? { hz: m.hz, py: m.py } : x));
  return mc(`${prefix}-b-${text.id}-${i}`, T('Quel mot manque?', 'Which word is missing?'), o(m.word, m.wordPy), wrong.map((p) => o(p.hz, p.py)), {
    stimulus: { hz: joinHz(shown), py: joinPy(shown) },
    say: sayAll(text.lines),
    cols: nOpts === 4 ? 2 : 3,
  });
}
function orderQ(prefix, text) {
  return {
    type: 'order',
    key: `${prefix}-o-${text.id}`,
    prompt: T('Remets les lignes dans le bon ordre.', 'Put the lines in the right order.'),
    say: sayAll(text.lines),
    tiles: text.lines.map((l) => ({ hz: l.hz, py: l.py })),
    joiner: ' ',
  };
}
function picQ(R, prefix, text, i, all, prompt) {
  const l = text.lines[i];
  const w = R.sample(all.filter((t) => t !== text), 2);
  return mc(`${prefix}-p-${text.id}-${i}`, prompt, { emoji: text.e }, w.map((t) => ({ emoji: t.e })), {
    stimulus: { hz: l.hz, py: l.py },
    say: say(l.hz),
    cols: 3,
  });
}
function heardQ(R, prefix, text, i) {
  const l = text.lines[i];
  const w = R.sample(text.lines.filter((x) => x !== l), 2);
  return mc(`${prefix}-h-${text.id}-${i}`, T('Écoute. Quelle ligne as-tu entendue?', 'Listen. Which line did you hear?'), o(l.hz, l.py), w.map((x) => o(x.hz, x.py)), {
    say: say(l.hz),
    cols: 1,
  });
}

/* ================================================================== */
/*  c19 — 儿歌                                                         */
/* ================================================================== */
const RH = [
  { id: 'r1', e: '❄️', L: ['雪花飘呀飘 | xuě huā piāo ya piāo | 雪花:n', '落在小树梢 | luò zài xiǎo shù shāo | 树梢:n', '小明堆雪人 | xiǎo míng duī xuě rén | 雪人:o', '大家笑哈哈 | dà jiā xiào hā hā'] },
  { id: 'r2', e: '🐰', L: ['小白兔白又白 | xiǎo bái tù bái yòu bái | 小白兔:who', '两只耳朵竖起来 | liǎng zhī ěr duo shù qǐ lái | 耳朵:o', '爱吃萝卜和青菜 | ài chī luó bo hé qīng cài | 萝卜:o', '蹦蹦跳跳真可爱 | bèng bèng tiào tiào zhēn kě ài | 可爱:f'] },
  { id: 'r3', e: '🔢', L: ['一二三四五 | yī èr sān sì wǔ', '上山看老虎 | shàng shān kàn lǎo hǔ | 老虎:who', '它在树下睡觉 | tā zài shù xià shuì jiào | 睡觉:v', '小猴在跳舞 | xiǎo hóu zài tiào wǔ | 跳舞:v'] },
  { id: 'r4', e: '👏', L: ['你拍一我拍一 | nǐ pāi yī wǒ pāi yī', '一个小孩坐飞机 | yí gè xiǎo hái zuò fēi jī | 飞机:o', '你拍二我拍二 | nǐ pāi èr wǒ pāi èr', '两个小孩丢手绢 | liǎng gè xiǎo hái diū shǒu juàn | 手绢:o', '你拍三我拍三 | nǐ pāi sān wǒ pāi sān', '三个小孩吃饼干 | sān gè xiǎo hái chī bǐng gān | 饼干:o'] },
  { id: 'r5', e: '🥟', L: ['过年包饺子 | guò nián bāo jiǎo zi | 饺子:o', '奶奶擀面皮 | nǎi nai gǎn miàn pí | 奶奶:who', '红包送给我 | hóng bāo sòng gěi wǒ | 红包:o', '新年真快乐 | xīn nián zhēn kuài lè | 新年:t'] },
  { id: 'r6', e: '🏒', L: ['冬天冰上玩 | dōng tiān bīng shàng wán | 冬天:t', '小小冰球飞 | xiǎo xiǎo bīng qiú fēi | 冰球:o', '我穿冰鞋跑 | wǒ chuān bīng xié pǎo | 冰鞋:o', '进球我最棒 | jìn qiú wǒ zuì bàng'] },
  { id: 'r7', e: '🍁', L: ['秋天枫叶红 | qiū tiān fēng yè hóng | 枫叶:n', '像把小红伞 | xiàng bǎ xiǎo hóng sǎn', '风儿轻轻吹 | fēng ér qīng qīng chuī | 风儿:n', '飘到我身旁 | piāo dào wǒ shēn páng'] },
  { id: 'r8', e: '🐻', L: ['小熊爱吃蜜 | xiǎo xióng ài chī mì | 小熊:who', '吃饱就睡觉 | chī bǎo jiù shuì jiào | 睡觉:v', '冬天它不醒 | dōng tiān tā bù xǐng | 冬天:t', '春天它起床 | chūn tiān tā qǐ chuáng | 起床:v'] },
  { id: 'r9', e: '⭐', L: ['夜晚星星多 | yè wǎn xīng xing duō | 星星:n', '一闪一闪亮 | yì shǎn yì shǎn liàng', '月亮像小船 | yuè liang xiàng xiǎo chuán | 月亮:n', '载我去梦乡 | zài wǒ qù mèng xiāng'] },
  { id: 'r10', e: '🐸', L: ['小小青蛙呱呱叫 | xiǎo xiǎo qīng wā guā guā jiào | 青蛙:who', '荷叶当床睡午觉 | hé yè dāng chuáng shuì wǔ jiào | 荷叶:n', '小鱼游来打招呼 | xiǎo yú yóu lái dǎ zhāo hu | 小鱼:who', '咕咕呱呱真热闹 | gū gū guā guā zhēn rè nao'] },
  { id: 'r11', e: '🪥', L: ['早上起床先刷牙 | zǎo shang qǐ chuáng xiān shuā yá | 早上:t', '晚上睡前再刷牙 | wǎn shang shuì qián zài shuā yá | 晚上:t', '牙刷轻轻上下刷 | yá shuā qīng qīng shàng xià shuā | 牙刷:o', '牙齿白白笑哈哈 | yá chǐ bái bái xiào hā hā | 牙齿:o'] },
  { id: 'r12', e: '🌧️', L: ['滴答滴答下小雨 | dī dā dī dā xià xiǎo yǔ | 小雨:n', '小草喝水长高了 | xiǎo cǎo hē shuǐ zhǎng gāo le | 小草:n', '我打雨伞去学校 | wǒ dǎ yǔ sǎn qù xué xiào | 雨伞:o', '彩虹出来笑眯眯 | cǎi hóng chū lái xiào mī mī | 彩虹:n'] },
  { id: 'r13', e: '🌙', L: ['月亮升上来 | yuè liang shēng shàng lái | 月亮:n', '宝宝要睡觉 | bǎo bao yào shuì jiào | 睡觉:v', '闭上小眼睛 | bì shàng xiǎo yǎn jing | 眼睛:o', '做个好梦吧 | zuò gè hǎo mèng ba'] },
  { id: 'r14', e: '🙌', L: ['我的小手真能干 | wǒ de xiǎo shǒu zhēn néng gàn | 小手:o', '会洗小脸会画画 | huì xǐ xiǎo liǎn huì huà huà | 画画:v', '会给妈妈捶捶背 | huì gěi mā ma chuí chuí bèi | 妈妈:who', '还会搭个大房子 | hái huì dā gè dà fáng zi | 房子:o'] },
  { id: 'r15', e: '🌷', L: ['春天到春天到 | chūn tiān dào chūn tiān dào', '小花对我笑 | xiǎo huā duì wǒ xiào | 小花:n', '小鸟枝上叫 | xiǎo niǎo zhī shàng jiào | 小鸟:who', '我去公园跑 | wǒ qù gōng yuán pǎo | 公园:p'] },
  { id: 'r16', e: '🍉', L: ['夏天太阳大 | xià tiān tài yáng dà | 太阳:n', '我吃大西瓜 | wǒ chī dà xī guā | 西瓜:o', '甜甜的汁水 | tián tián de zhī shuǐ', '流到小手上 | liú dào xiǎo shǒu shàng | 小手:o'] },
  { id: 'r17', e: '🎂', L: ['今天我生日 | jīn tiān wǒ shēng rì | 今天:t', '大家来唱歌 | dà jiā lái chàng gē | 唱歌:v', '我吹蜡烛真高兴 | wǒ chuī là zhú zhēn gāo xìng | 蜡烛:o', '吃块大蛋糕 | chī kuài dà dàn gāo | 蛋糕:o'] },
].map((r) => ({ id: r.id, e: r.e, lines: parseLines(r.L, r.id) }));
const blankIdx = (t) => t.lines.map((l, i) => (l.b ? i : -1)).filter((i) => i >= 0);
const RH_PIC = T('Quelle image va avec cette comptine?', 'Which picture goes with this rhyme?');
const c19 = {
  id: 'c19',
  icon: '🎵',
  title: { fr: 'Comptines 儿歌', en: 'Nursery rhymes 儿歌' },
  pfeq: 'Chinois — lecture : comptines (儿歌) et compréhension (1re année)',
  generate(level, R) {
    const t = R.pick(RH);
    if (level === 1) {
      const k = R.int(0, 3);
      if (k === 0) return heardQ(R, 'c19', t, R.int(0, t.lines.length - 1));
      if (k === 1) return nextLineQ(R, 'c19', t, R.int(0, t.lines.length - 2), 2, 1, RH.filter((x) => x !== t));
      return picQ(R, 'c19', t, R.int(0, t.lines.length - 1), RH, RH_PIC);
    }
    if (level === 2) {
      return R.chance(0.55)
        ? blankQ(R, 'c19', t, R.pick(blankIdx(t)), 3)
        : nextLineQ(R, 'c19', t, R.int(0, t.lines.length - 2), 3, 2, RH.filter((x) => x !== t));
    }
    const k = R.int(0, 4);
    if (k === 0) return orderQ('c19', t);
    if (k === 1) return blankQ(R, 'c19', t, R.pick(blankIdx(t)), 4);
    return nextLineQ(R, 'c19', t, R.int(0, t.lines.length - 2), 4, 3, RH.filter((x) => x !== t));
  },
};

/* ================================================================== */
/*  c20 — 古诗                                                         */
/* ================================================================== */
const AU = {
  骆宾王: 'luò bīn wáng', 李白: 'lǐ bái', 孟浩然: 'mèng hào rán', 李绅: 'lǐ shēn', 王之涣: 'wáng zhī huàn',
  白居易: 'bái jū yì', 杨万里: 'yáng wàn lǐ', 袁枚: 'yuán méi', 贺知章: 'hè zhī zhāng', 王安石: 'wáng ān shí',
};
for (const [k, v] of Object.entries(AU)) chk(k, v, 'author ' + k);
const POEMS_RAW = [
  { id: 'p1', t: '咏鹅', tp: 'yǒng é', a: '骆宾王', e: '🪿', L: ['鹅鹅鹅 | é é é', '曲项向天歌 | qū xiàng xiàng tiān gē', '白毛浮绿水 | bái máo fú lǜ shuǐ | 绿水:n', '红掌拨清波 | hóng zhǎng bō qīng bō | 红掌:o'],
    m: [2, T("Les plumes blanches flottent sur l'eau verte.", 'White feathers float on green water.'), [T("L'oie vole haut dans le ciel.", 'The goose flies high in the sky.'), T("L'oie mange du riz.", 'The goose eats rice.')]] },
  { id: 'p2', t: '静夜思', tp: 'jìng yè sī', a: '李白', e: '🌕', L: ['床前明月光 | chuáng qián míng yuè guāng | 明月:n', '疑是地上霜 | yí shì dì shàng shuāng | 地上:p', '举头望明月 | jǔ tóu wàng míng yuè | 明月:n', '低头思故乡 | dī tóu sī gù xiāng | 故乡:p'],
    m: [2, T('Je lève la tête et je regarde la lune brillante.', 'I raise my head and look at the bright moon.'), [T('Je ferme les yeux et je dors.', 'I close my eyes and sleep.'), T('Je regarde la neige tomber.', 'I watch the snow fall.')]] },
  { id: 'p3', t: '春晓', tp: 'chūn xiǎo', a: '孟浩然', e: '🐦', L: ['春眠不觉晓 | chūn mián bù jué xiǎo', '处处闻啼鸟 | chù chù wén tí niǎo | 啼鸟:who', '夜来风雨声 | yè lái fēng yǔ shēng | 风雨:n', '花落知多少 | huā luò zhī duō shao | 花:n'],
    m: [1, T('Partout, on entend chanter les oiseaux.', 'Everywhere, you hear birds singing.'), [T('Partout, les gens dansent.', 'Everywhere, people are dancing.'), T('Partout, les oiseaux dorment.', 'Everywhere, the birds are sleeping.')]] },
  { id: 'p4', t: '悯农', tp: 'mǐn nóng', a: '李绅', e: '🌾', L: ['锄禾日当午 | chú hé rì dāng wǔ', '汗滴禾下土 | hàn dī hé xià tǔ | 汗:o', '谁知盘中餐 | shéi zhī pán zhōng cān', '粒粒皆辛苦 | lì lì jiē xīn kǔ | 辛苦:f'],
    m: [3, T('Chaque grain de riz vient d\'un travail très dur.', 'Every grain of rice comes from hard work.'), [T('Chaque grain de riz est très sucré.', 'Every grain of rice is very sweet.'), T('Chaque grain de riz est tombé du ciel.', 'Every grain of rice fell from the sky.')]] },
  { id: 'p5', t: '画', tp: 'huà', a: '', e: '⛰️', L: ['远看山有色 | yuǎn kàn shān yǒu sè | 山:n', '近听水无声 | jìn tīng shuǐ wú shēng | 水:n', '春去花还在 | chūn qù huā hái zài | 花:n', '人来鸟不惊 | rén lái niǎo bù jīng | 鸟:who'],
    m: [0, T('De loin, on voit les montagnes en couleurs.', 'From far away, the mountains show their colours.'), [T('De loin, on entend la mer.', 'From far away, you hear the sea.'), T('De près, on ne voit rien.', 'Up close, you see nothing.')]] },
  { id: 'p6', t: '江南', tp: 'jiāng nán', a: '', e: '🐟', L: ['江南可采莲 | jiāng nán kě cǎi lián', '莲叶何田田 | lián yè hé tián tián | 莲叶:n', '鱼戏莲叶间 | yú xì lián yè jiān | 鱼:who', '鱼戏莲叶东 | yú xì lián yè dōng | 东:d', '鱼戏莲叶西 | yú xì lián yè xī | 西:d', '鱼戏莲叶南 | yú xì lián yè nán | 南:d', '鱼戏莲叶北 | yú xì lián yè běi | 北:d'],
    m: [2, T('Les poissons jouent entre les feuilles de lotus.', 'Fish play among the lotus leaves.'), [T('Les poissons dorment sur la rive.', 'Fish sleep on the bank.'), T('Les oiseaux jouent dans les feuilles.', 'Birds play in the leaves.')]] },
  { id: 'p7', t: '登鹳雀楼', tp: 'dēng guàn què lóu', a: '王之涣', e: '🏯', L: ['白日依山尽 | bái rì yī shān jìn | 白日:n', '黄河入海流 | huáng hé rù hǎi liú | 黄河:n', '欲穷千里目 | yù qióng qiān lǐ mù', '更上一层楼 | gèng shàng yì céng lóu | 楼:p'],
    m: [3, T('Monte encore un étage.', 'Climb one more floor.'), [T("Descends l'escalier.", 'Go down the stairs.'), T('Reste dans la maison.', 'Stay in the house.')]] },
  { id: 'p8', t: '池上', tp: 'chí shàng', a: '白居易', e: '🛶', L: ['小娃撑小艇 | xiǎo wá chēng xiǎo tǐng | 小艇:o', '偷采白莲回 | tōu cǎi bái lián huí | 白莲:n', '不解藏踪迹 | bù jiě cáng zōng jì', '浮萍一道开 | fú píng yí dào kāi | 浮萍:n'],
    m: [0, T('Un petit enfant fait avancer une petite barque.', 'A little child pushes a small boat along.'), [T('Un petit enfant dort sur un bateau.', 'A little child sleeps on a boat.'), T('Un petit enfant nage dans la mer.', 'A little child swims in the sea.')]] },
  { id: 'p9', t: '小池', tp: 'xiǎo chí', a: '杨万里', e: '🪷', L: ['泉眼无声惜细流 | quán yǎn wú shēng xī xì liú | 泉眼:n', '树阴照水爱晴柔 | shù yīn zhào shuǐ ài qíng róu | 树阴:n', '小荷才露尖尖角 | xiǎo hé cái lù jiān jiān jiǎo | 小荷:n', '早有蜻蜓立上头 | zǎo yǒu qīng tíng lì shàng tóu | 蜻蜓:who'],
    m: [3, T('Une libellule est déjà posée tout en haut.', 'A dragonfly has already landed on top.'), [T("Une grenouille saute dans l'eau.", 'A frog jumps into the water.'), T("Un poisson saute hors de l'eau.", 'A fish jumps out of the water.')]] },
  { id: 'p10', t: '所见', tp: 'suǒ jiàn', a: '袁枚', e: '🐄', L: ['牧童骑黄牛 | mù tóng qí huáng niú | 黄牛:who', '歌声振林樾 | gē shēng zhèn lín yuè | 歌声:o', '意欲捕鸣蝉 | yì yù bǔ míng chán | 鸣蝉:who', '忽然闭口立 | hū rán bì kǒu lì | 闭口:v'],
    m: [0, T('Un petit berger monte sur un buffle jaune.', 'A shepherd boy rides a yellow ox.'), [T('Un petit berger monte sur un cheval blanc.', 'A shepherd boy rides a white horse.'), T('Un petit berger porte un panier.', 'A shepherd boy carries a basket.')]] },
  { id: 'p11', t: '咏柳', tp: 'yǒng liǔ', a: '贺知章', e: '🍃', L: ['碧玉妆成一树高 | bì yù zhuāng chéng yí shù gāo | 碧玉:o', '万条垂下绿丝绦 | wàn tiáo chuí xià lǜ sī tāo | 垂下:v', '不知细叶谁裁出 | bù zhī xì yè shéi cái chū | 细叶:n', '二月春风似剪刀 | èr yuè chūn fēng sì jiǎn dāo | 剪刀:o'],
    m: [3, T('Le vent du printemps est comme des ciseaux.', 'The spring wind is like scissors.'), [T('Le vent du printemps est comme un tambour.', 'The spring wind is like a drum.'), T('Le vent du printemps est comme de la neige.', 'The spring wind is like snow.')]] },
  { id: 'p12', t: '梅花', tp: 'méi huā', a: '王安石', e: '🌸', L: ['墙角数枝梅 | qiáng jiǎo shù zhī méi | 墙角:p', '凌寒独自开 | líng hán dú zì kāi', '遥知不是雪 | yáo zhī bú shì xuě | 雪:n', '为有暗香来 | wèi yǒu àn xiāng lái | 暗香:n'],
    m: [2, T("De loin, on sait que ce n'est pas de la neige.", 'From far away, you know it is not snow.'), [T("De loin, on sait que c'est de la pluie.", 'From far away, you know it is rain.'), T("De loin, on sait que c'est un oiseau.", 'From far away, you know it is a bird.')]] },
];
const PO = POEMS_RAW.map((p) => { chk(p.t, p.tp, 'poem title ' + p.id); return { id: p.id, e: p.e, t: p.t, tp: p.tp, a: p.a, m: p.m, lines: parseLines(p.L, p.id) }; });
const PO_PIC = T('Quel dessin va avec ce poème?', 'Which drawing goes with this poem?');
function poemTitleQ(R, p) {
  const w = R.sample(PO.filter((x) => x !== p), 2);
  return mc(`c20-t-${p.id}`, PO_PIC, { emoji: p.e }, w.map((x) => ({ emoji: x.e })), { stimulus: { hz: p.t, py: p.tp }, say: say(p.t), cols: 3 });
}
function authorQ(R, p) {
  const names = Object.keys(AU);
  const w = R.sample(names.filter((n) => n !== p.a), 3);
  return mc(`c20-a-${p.id}`, T('Qui a écrit ce poème?', 'Who wrote this poem?'), o(p.a, AU[p.a]), w.map((n) => o(n, AU[n])), { stimulus: { hz: p.t, py: p.tp }, say: say(p.t), cols: 2 });
}
function meaningQ(p) {
  const [i, ok, wr] = p.m;
  const l = p.lines[i];
  return mc(`c20-m-${p.id}`, T('Que veut dire cette ligne?', 'What does this line mean?'), { text: ok }, wr.map((x) => ({ text: x })), {
    stimulus: { hz: l.hz, py: l.py },
    say: say(l.hz),
    cols: 1,
  });
}
const c20 = {
  id: 'c20',
  icon: '📜',
  title: { fr: 'Poèmes anciens 古诗', en: 'Classic poems 古诗' },
  pfeq: 'Chinois — lecture : poèmes classiques (古诗), mémorisation et compréhension (1re année)',
  generate(level, R) {
    const p = R.pick(PO);
    if (level === 1) {
      const k = R.int(0, 4);
      if (k === 0) return poemTitleQ(R, p);
      if (k === 1) return nextLineQ(R, 'c20', p, R.int(0, p.lines.length - 2), 2, 1, PO.filter((x) => x !== p));
      if (k === 2) return heardQ(R, 'c20', p, R.int(0, p.lines.length - 1));
      return picQ(R, 'c20', p, R.int(0, p.lines.length - 1), PO, PO_PIC);
    }
    if (level === 2) {
      return R.chance(0.5)
        ? blankQ(R, 'c20', p, R.pick(blankIdx(p)), 3)
        : nextLineQ(R, 'c20', p, R.int(0, p.lines.length - 2), 3, 2, PO.filter((x) => x !== p));
    }
    const k = R.int(0, 6);
    if (k === 0) return orderQ('c20', p);
    if (k === 1) return meaningQ(p);
    if (k === 2) return p.a ? authorQ(R, p) : meaningQ(p);
    if (k === 3) return blankQ(R, 'c20', p, R.pick(blankIdx(p)), 4);
    return nextLineQ(R, 'c20', p, R.int(0, p.lines.length - 2), 4, 3, PO.filter((x) => x !== p));
  },
};

/* ================================================================== */
/*  c21 — 小故事 (original short stories)                              */
/* ================================================================== */
// [id, level, sentences ('hz | py'), facts [kind, answer hz, fr, en]]
const ST_RAW = [
  // ---- level 1 (3 short sentences, picture options) ----
  ['s1', 1, ['今天下雪了。 | jīn tiān xià xuě le', '小明在雪地里堆雪人。 | xiǎo míng zài xuě dì lǐ duī xuě rén', '小明很高兴。 | xiǎo míng hěn gāo xìng'],
    [['who', '小明', 'Qui joue dans la neige?', 'Who plays in the snow?'], ['p', '雪地', 'Où joue Xiaoming?', 'Where does Xiaoming play?'], ['v', '堆雪人', 'Que fait Xiaoming?', 'What does Xiaoming do?'], ['f', '高兴', 'Comment se sent Xiaoming?', 'How does Xiaoming feel?']]],
  ['s2', 1, ['妈妈在厨房。 | mā ma zài chú fáng', '她在包饺子。 | tā zài bāo jiǎo zi', '小美想吃饺子。 | xiǎo měi xiǎng chī jiǎo zi'],
    [['who', '妈妈', 'Qui est dans la cuisine?', 'Who is in the kitchen?'], ['p', '厨房', 'Où est maman?', 'Where is Mum?'], ['v', '包饺子', 'Que fait maman?', 'What is Mum doing?'], ['o', '饺子', 'Que veut manger Xiaomei?', 'What does Xiaomei want to eat?']]],
  ['s3', 1, ['小狗在公园里。 | xiǎo gǒu zài gōng yuán lǐ', '它爱跑步。 | tā ài pǎo bù', '它跑累了。 | tā pǎo lèi le'],
    [['who', '小狗', 'Qui est dans le parc?', 'Who is in the park?'], ['p', '公园', 'Où est le chien?', 'Where is the dog?'], ['v', '跑步', 'Qu\'est-ce que le chien aime faire?', 'What does the dog like to do?'], ['f', '累', 'Comment se sent le chien à la fin?', 'How does the dog feel at the end?']]],
  ['s4', 1, ['爸爸有一个蛋糕。 | bà ba yǒu yí gè dàn gāo', '今天是小美的生日。 | jīn tiān shì xiǎo měi de shēng rì', '小美很高兴。 | xiǎo měi hěn gāo xìng'],
    [['who', '爸爸', 'Qui a un gâteau?', 'Who has a cake?'], ['o', '蛋糕', 'Qu\'a papa?', 'What does Dad have?'], ['t', '今天', "Quand est l'anniversaire de Xiaomei?", "When is Xiaomei's birthday?"], ['f', '高兴', 'Comment se sent Xiaomei?', 'How does Xiaomei feel?']]],
  ['s5', 1, ['小鸟在树上。 | xiǎo niǎo zài shù shàng', '它唱着歌。 | tā chàng zhe gē', '小猫看着它。 | xiǎo māo kàn zhe tā'],
    [['who', '小鸟', "Qui est dans l'arbre?", 'Who is in the tree?'], ['p', '树上', "Où est l'oiseau?", 'Where is the bird?'], ['v', '唱歌', "Que fait l'oiseau?", 'What does the bird do?'], ['who', '小猫', "Qui regarde l'oiseau?", 'Who looks at the bird?']]],
  ['s6', 1, ['奶奶给我一个红包。 | nǎi nai gěi wǒ yí gè hóng bāo', '今天是春节。 | jīn tiān shì chūn jié', '我说新年快乐。 | wǒ shuō xīn nián kuài lè'],
    [['who', '奶奶', 'Qui donne une enveloppe rouge?', 'Who gives a red envelope?'], ['o', '红包', 'Que donne grand-maman?', 'What does Grandma give?'], ['t', '春节', 'Quelle fête est-ce?', 'Which holiday is it?']]],
  ['s7', 1, ['小熊在冬天睡觉。 | xiǎo xióng zài dōng tiān shuì jiào', '外面在下雪。 | wài miàn zài xià xuě', '小熊在家里。 | xiǎo xióng zài jiā lǐ'],
    [['who', '小熊', 'Qui dort?', 'Who is sleeping?'], ['t', '冬天', 'Quand dort-il?', 'When does it sleep?'], ['v', '睡觉', 'Que fait le petit ours?', 'What does the little bear do?'], ['p', '家里', 'Où est le petit ours?', 'Where is the little bear?']]],
  ['s8', 1, ['小美有一把雨伞。 | xiǎo měi yǒu yì bǎ yǔ sǎn', '外面下大雨。 | wài miàn xià dà yǔ', '她去学校。 | tā qù xué xiào'],
    [['who', '小美', 'Qui a un parapluie?', 'Who has an umbrella?'], ['o', '雨伞', 'Qu\'a Xiaomei?', 'What does Xiaomei have?'], ['p', '学校', 'Où va Xiaomei?', 'Where does Xiaomei go?']]],
  ['s9', 1, ['爷爷在家里看书。 | yé ye zài jiā lǐ kàn shū', '小猫在床上睡觉。 | xiǎo māo zài chuáng shàng shuì jiào', '我在写字。 | wǒ zài xiě zì'],
    [['who', '爷爷', 'Qui lit?', 'Who is reading?'], ['v', '看书', 'Que fait grand-papa?', 'What does Grandpa do?'], ['who', '小猫', 'Qui dort?', 'Who is sleeping?'], ['p', '床上', 'Où dort le chat?', 'Where is the cat sleeping?']]],
  ['s10', 1, ['小鱼在河里游。 | xiǎo yú zài hé lǐ yóu', '小鸭也在河里。 | xiǎo yā yě zài hé lǐ', '它们很高兴。 | tā men hěn gāo xìng'],
    [['who', '小鱼', 'Qui nage?', 'Who is swimming?'], ['who', '小鸭', 'Qui est aussi dans la rivière?', 'Who is also in the river?'], ['p', '河里', 'Où sont-ils?', 'Where are they?'], ['f', '高兴', 'Comment se sentent-ils?', 'How do they feel?']]],
  ['s11', 1, ['早上，弟弟喝牛奶。 | zǎo shang dì di hē niú nǎi', '他还吃面包。 | tā hái chī miàn bāo', '他吃饱了。 | tā chī bǎo le'],
    [['who', '弟弟', 'Qui boit du lait?', 'Who drinks milk?'], ['t', '早上', 'Quand?', 'When?'], ['o', '牛奶', 'Que boit-il?', 'What does he drink?'], ['o', '面包', 'Que mange-t-il?', 'What does he eat?']]],
  ['s12', 1, ['小兔在花园里。 | xiǎo tù zài huā yuán lǐ', '它吃苹果。 | tā chī píng guǒ', '太阳很大，它很热。 | tài yáng hěn dà tā hěn rè'],
    [['who', '小兔', 'Qui est dans le jardin?', 'Who is in the garden?'], ['p', '花园', 'Où est le lapin?', 'Where is the rabbit?'], ['o', '苹果', 'Que mange le lapin?', 'What does the rabbit eat?'], ['f', '热', 'Comment se sent le lapin?', 'How does the rabbit feel?']]],
  // ---- level 2 (4 sentences) ----
  ['s13', 2, ['周末，爸爸带我去冰场。 | zhōu mò bà ba dài wǒ qù bīng chǎng', '我穿上冰鞋。 | wǒ chuān shàng bīng xié', '爸爸和我打冰球。 | bà ba hé wǒ dǎ bīng qiú', '我们玩得很开心。 | wǒ men wán de hěn kāi xīn'],
    [['who', '爸爸', 'Qui m\'emmène à la patinoire?', 'Who takes me to the rink?'], ['p', '冰场', 'Où allons-nous?', 'Where do we go?'], ['o', '冰鞋', 'Que je mets?', 'What do I put on?'], ['o', '冰球', 'À quoi jouons-nous?', 'What do we play?']]],
  ['s14', 2, ['秋天到了。 | qiū tiān dào le', '公园里的枫叶红了。 | gōng yuán lǐ de fēng yè hóng le', '小美捡了很多枫叶。 | xiǎo měi jiǎn le hěn duō fēng yè', '她把枫叶送给妈妈。 | tā bǎ fēng yè sòng gěi mā ma'],
    [['t', '秋天', 'Quelle saison est-ce?', 'Which season is it?'], ['p', '公园', 'Où sont les feuilles d\'érable?', 'Where are the maple leaves?'], ['o', '枫叶', 'Que ramasse Xiaomei?', 'What does Xiaomei pick up?'], ['who', '妈妈', 'À qui donne-t-elle les feuilles?', 'Who does she give the leaves to?']]],
  ['s15', 2, ['春节快到了。 | chūn jié kuài dào le', '奶奶和妈妈在包饺子。 | nǎi nai hé mā ma zài bāo jiǎo zi', '我也来帮忙。 | wǒ yě lái bāng máng', '饺子真好吃。 | jiǎo zi zhēn hǎo chī'],
    [['t', '春节', 'Quelle fête arrive?', 'Which holiday is coming?'], ['v', '包饺子', 'Que font grand-maman et maman?', 'What are Grandma and Mum doing?'], ['who', '奶奶', 'Qui fait des raviolis avec maman?', 'Who makes dumplings with Mum?']]],
  ['s16', 2, ['下雪了，雪很大。 | xià xuě le xuě hěn dà', '爷爷拿来雪橇。 | yé ye ná lái xuě qiāo', '小明和弟弟坐在雪橇上。 | xiǎo míng hé dì di zuò zài xuě qiāo shàng', '他们从山上滑下来。 | tā men cóng shān shàng huá xià lái'],
    [['o', '雪橇', 'Qu\'apporte grand-papa?', 'What does Grandpa bring?'], ['who', '爷爷', 'Qui apporte la luge?', 'Who brings the sled?'], ['who', '弟弟', 'Avec qui Xiaoming est-il sur la luge?', 'Who is on the sled with Xiaoming?'], ['p', '山上', "D'où glissent-ils?", 'Where do they slide from?']]],
  ['s17', 2, ['今天是小美的生日。 | jīn tiān shì xiǎo měi de shēng rì', '妈妈做了一个大蛋糕。 | mā ma zuò le yí gè dà dàn gāo', '朋友们来到她家。 | péng you men lái dào tā jiā', '大家一起唱生日歌。 | dà jiā yì qǐ chàng shēng rì gē'],
    [['t', '今天', "Quand est l'anniversaire de Xiaomei?", "When is Xiaomei's birthday?"], ['who', '妈妈', 'Qui fait le gâteau?', 'Who makes the cake?'], ['o', '蛋糕', 'Que fait maman?', 'What does Mum make?'], ['v', '唱歌', 'Que font-ils tous ensemble?', 'What do they all do together?']]],
  ['s18', 2, ['小猫饿了。 | xiǎo māo è le', '它去河边找小鱼。 | tā qù hé biān zhǎo xiǎo yú', '小鱼在水里游。 | xiǎo yú zài shuǐ lǐ yóu', '小猫吃不到，很难过。 | xiǎo māo chī bú dào hěn nán guò'],
    [['f', '饿', 'Comment se sent le chat au début?', 'How does the cat feel at the start?'], ['p', '河边', 'Où va le chat?', 'Where does the cat go?'], ['who', '小鱼', 'Qui nage dans l\'eau?', 'Who swims in the water?'], ['f', '难过', 'Comment se sent le chat à la fin?', 'How does the cat feel at the end?']]],
  ['s19', 2, ['小海狸住在河边。 | xiǎo hǎi lí zhù zài hé biān', '它每天搬木头。 | tā měi tiān bān mù tou', '它用木头盖房子。 | tā yòng mù tou gài fáng zi', '房子盖好了，它很高兴。 | fáng zi gài hǎo le tā hěn gāo xìng'],
    [['who', '海狸', 'Qui construit?', 'Who builds?'], ['p', '河边', 'Où habite le castor?', 'Where does the beaver live?'], ['o', '房子', 'Que construit le castor?', 'What does the beaver build?'], ['f', '高兴', 'Comment se sent le castor à la fin?', 'How does the beaver feel at the end?']]],
  ['s20', 2, ['早上，我去学校。 | zǎo shang wǒ qù xué xiào', '老师在黑板上写字。 | lǎo shī zài hēi bǎn shàng xiě zì', '我们一起读书。 | wǒ men yì qǐ dú shū', '我喜欢上学。 | wǒ xǐ huan shàng xué'],
    [['t', '早上', 'Quand vais-je à l\'école?', 'When do I go to school?'], ['p', '学校', 'Où vais-je?', 'Where do I go?'], ['who', '老师', 'Qui écrit au tableau?', 'Who writes on the board?']]],
  ['s21', 2, ['星期六，我和姐姐去公园。 | xīng qī liù wǒ hé jiě jie qù gōng yuán', '姐姐放风筝。 | jiě jie fàng fēng zheng', '风很大，风筝飞得很高。 | fēng hěn dà fēng zheng fēi de hěn gāo', '我看着风筝笑。 | wǒ kàn zhe fēng zheng xiào'],
    [['who', '姐姐', 'Qui fait voler un cerf-volant?', 'Who flies a kite?'], ['v', '放风筝', 'Que fait grande sœur?', 'What does my older sister do?'], ['p', '公园', 'Où allons-nous?', 'Where do we go?'], ['o', '风筝', 'Qu\'est-ce qui vole très haut?', 'What flies very high?']]],
  ['s22', 2, ['晚上，妈妈给我讲故事。 | wǎn shang mā ma gěi wǒ jiǎng gù shi', '故事里有一只小兔。 | gù shi lǐ yǒu yì zhī xiǎo tù', '小兔不睡觉，小兔玩球。 | xiǎo tù bú shuì jiào xiǎo tù wán qiú', '我很快睡着了。 | wǒ hěn kuài shuì zháo le'],
    [['t', '晚上', 'Quand maman raconte-t-elle l\'histoire?', 'When does Mum tell the story?'], ['who', '妈妈', 'Qui raconte l\'histoire?', 'Who tells the story?'], ['who', '小兔', 'Qui est dans l\'histoire?', 'Who is in the story?'], ['o', '球', 'Avec quoi joue le lapin?', 'What does the rabbit play with?']]],
  ['s23', 2, ['爸爸去商店。 | bà ba qù shāng diàn', '他买了牛奶和面包。 | tā mǎi le niú nǎi hé miàn bāo', '小明想吃糖。 | xiǎo míng xiǎng chī táng', '爸爸笑了，也买了糖。 | bà ba xiào le yě mǎi le táng'],
    [['p', '商店', 'Où va papa?', 'Where does Dad go?'], ['o', '牛奶', 'Papa a acheté du…', 'Dad bought some…'], ['who', '小明', 'Qui veut des bonbons?', 'Who wants candy?'], ['o', '糖', 'Que veut Xiaoming?', 'What does Xiaoming want?']]],
  // ---- level 3 (5–6 sentences) ----
  ['s24', 3, ['星期天早上，小明起床了。 | xīng qī tiān zǎo shang xiǎo míng qǐ chuáng le', '他先刷牙，再洗脸。 | tā xiān shuā yá zài xǐ liǎn', '妈妈做了面包和牛奶。 | mā ma zuò le miàn bāo hé niú nǎi', '吃完早饭，他去公园。 | chī wán zǎo fàn tā qù gōng yuán', '在公园里，他遇到了小美。 | zài gōng yuán lǐ tā yù dào le xiǎo měi', '他们一起打球，玩得真开心。 | tā men yì qǐ dǎ qiú wán de zhēn kāi xīn'],
    [['t', '早上', 'Quand Xiaoming se lève-t-il?', 'When does Xiaoming get up?'], ['v', '刷牙', "Que fait-il d'abord?", 'What does he do first?'], ['p', '公园', 'Où va-t-il après le repas?', 'Where does he go after eating?'], ['who', '小美', 'Qui rencontre-t-il?', 'Who does he meet?']]],
  ['s25', 3, ['冬天，河里结冰了。 | dōng tiān hé lǐ jié bīng le', '爸爸说我们去滑冰吧。 | bà ba shuō wǒ men qù huá bīng ba', '我穿上厚厚的手套和帽子。 | wǒ chuān shàng hòu hòu de shǒu tào hé mào zi', '冰上有很多人。 | bīng shàng yǒu hěn duō rén', '我不会滑，摔倒了。 | wǒ bú huì huá shuāi dǎo le', '爸爸笑着拉我起来。 | bà ba xiào zhe lā wǒ qǐ lái'],
    [['t', '冬天', 'Quelle saison est-ce?', 'Which season is it?'], ['v', '滑冰', 'Que font-ils?', 'What do they do?'], ['o', '手套', 'Que je mets aux mains?', 'What do I put on my hands?'], ['who', '爸爸', 'Qui m\'aide à me relever?', 'Who helps me get up?']]],
  ['s26', 3, ['秋天，松鼠很忙。 | qiū tiān sōng shǔ hěn máng', '它在树林里跑来跑去。 | tā zài shù lín lǐ pǎo lái pǎo qù', '它找到了很多吃的。 | tā zhǎo dào le hěn duō chī de', '它把吃的搬回家。 | tā bǎ chī de bān huí jiā', '冬天来了，它不怕冷。 | dōng tiān lái le tā bú pà lěng'],
    [['t', '秋天', "Quand l'écureuil est-il très occupé?", 'When is the squirrel very busy?'], ['who', '松鼠', 'Qui est très occupé?', 'Who is very busy?'], ['p', '树林', 'Où court-il?', 'Where does it run around?'], ['f', '冷', "De quoi n'a-t-il pas peur?", 'What is it not afraid of?']]],
  ['s27', 3, ['春节那天，我们去奶奶家。 | chūn jié nà tiān wǒ men qù nǎi nai jiā', '家里挂着红红的灯笼。 | jiā lǐ guà zhe hóng hóng de dēng long', '爷爷奶奶给我红包。 | yé ye nǎi nai gěi wǒ hóng bāo', '大家一起吃饺子。 | dà jiā yì qǐ chī jiǎo zi', '饭后，我和弟弟唱歌跳舞。 | fàn hòu wǒ hé dì di chàng gē tiào wǔ'],
    [['t', '春节', 'Quel jour allons-nous chez grand-maman?', 'On which day do we go to Grandma\'s?'], ['o', '灯笼', 'Qu\'est-ce qui est accroché à la maison?', 'What hangs in the house?'], ['o', '饺子', 'Que mange-t-on ensemble?', 'What do we eat together?'], ['who', '弟弟', 'Qui chante et danse avec moi?', 'Who sings and dances with me?']]],
  ['s28', 3, ['今天下雨了。 | jīn tiān xià yǔ le', '小美没有带雨伞。 | xiǎo měi méi yǒu dài yǔ sǎn', '她很难过。 | tā hěn nán guò', '这时，小明走过来。 | zhè shí xiǎo míng zǒu guò lái', '他说我们一起走吧。 | tā shuō wǒ men yì qǐ zǒu ba', '他和小美用一把雨伞回家。 | tā hé xiǎo měi yòng yì bǎ yǔ sǎn huí jiā'],
    [['who', '小美', "Qui n'a pas de parapluie?", 'Who has no umbrella?'], ['f', '难过', 'Comment se sent Xiaomei?', 'How does Xiaomei feel?'], ['who', '小明', 'Qui vient aider?', 'Who comes to help?'], ['o', '雨伞', 'Que partagent-ils?', 'What do they share?']]],
  ['s29', 3, ['星期六，爸爸带我去动物园。 | xīng qī liù bà ba dài wǒ qù dòng wù yuán', '我看见了大象。 | wǒ kàn jiàn le dà xiàng', '大象的鼻子很长。 | dà xiàng de bí zi hěn cháng', '我还看见了老虎和猴子。 | wǒ hái kàn jiàn le lǎo hǔ hé hóu zi', '小猴子很可爱。 | xiǎo hóu zi hěn kě ài', '我有点怕老虎。 | wǒ yǒu diǎn pà lǎo hǔ'],
    [['p', '动物园', 'Où va-t-on le samedi?', 'Where do we go on Saturday?'], ['who', '大象', 'Qui a un très long nez?', 'Who has a very long nose?'], ['who', '猴子', 'Qui est très mignon?', 'Who is very cute?'], ['who', '老虎', "De qui ai-je un peu peur?", 'Who am I a little afraid of?']]],
  ['s30', 3, ['小鸭不会游泳。 | xiǎo yā bú huì yóu yǒng', '鸭妈妈说别怕。 | yā mā ma shuō bié pà', '小鸭跳进河里。 | xiǎo yā tiào jìn hé lǐ', '它游起来了。 | tā yóu qǐ lái le', '小鸭真高兴。 | xiǎo yā zhēn gāo xìng'],
    [['v', '游泳', 'Que ne sait pas faire le caneton?', "What can't the duckling do?"], ['p', '河里', 'Où saute-t-il?', 'Where does it jump?'], ['f', '高兴', 'Comment se sent-il à la fin?', 'How does it feel at the end?']]],
  ['s31', 3, ['周末，爸爸在厨房做饭。 | zhōu mò bà ba zài chú fáng zuò fàn', '我帮爸爸洗苹果。 | wǒ bāng bà ba xǐ píng guǒ', '妈妈在看书。 | mā ma zài kàn shū', '奶奶在睡觉。 | nǎi nai zài shuì jiào', '饭做好了，大家一起吃饭。 | fàn zuò hǎo le dà jiā yì qǐ chī fàn'],
    [['p', '厨房', 'Où cuisine papa?', 'Where does Dad cook?'], ['o', '苹果', 'Que lave-je?', 'What do I wash?'], ['v', '看书', 'Que fait maman?', 'What does Mum do?'], ['who', '奶奶', 'Qui dort?', 'Who is sleeping?']]],
  ['s32', 3, ['夏天，我们去海边。 | xià tiān wǒ men qù hǎi biān', '太阳很大，天很热。 | tài yáng hěn dà tiān hěn rè', '弟弟在海边玩球。 | dì di zài hǎi biān wán qiú', '我和姐姐游泳。 | wǒ hé jiě jie yóu yǒng', '妈妈给我们西瓜吃。 | mā ma gěi wǒ men xī guā chī', '吃了西瓜，不热了。 | chī le xī guā bú rè le'],
    [['t', '夏天', 'Quelle saison est-ce?', 'Which season is it?'], ['p', '海边', 'Où allons-nous?', 'Where do we go?'], ['v', '游泳', 'Que font ma sœur et moi?', 'What do my sister and I do?'], ['o', '西瓜', 'Que nous donne maman?', 'What does Mum give us?']]],
  ['s33', 3, ['春天，风很大。 | chūn tiān fēng hěn dà', '小明和爷爷去公园放风筝。 | xiǎo míng hé yé ye qù gōng yuán fàng fēng zheng', '风筝飞得很高，像一只小鸟。 | fēng zheng fēi de hěn gāo xiàng yì zhī xiǎo niǎo', '忽然，线断了。 | hū rán xiàn duàn le', '风筝飞走了，小明很难过。 | fēng zheng fēi zǒu le xiǎo míng hěn nán guò', '爷爷笑着说明年再做一个。 | yé ye xiào zhe shuō míng nián zài zuò yí gè'],
    [['t', '春天', 'Quelle saison est-ce?', 'Which season is it?'], ['who', '爷爷', 'Avec qui Xiaoming fait-il voler le cerf-volant?', 'Who flies the kite with Xiaoming?'], ['o', '风筝', "Qu'est-ce qui s'envole?", 'What flies away?'], ['f', '难过', 'Comment se sent Xiaoming à la fin?', 'How does Xiaoming feel at the end?']]],
];
const STORIES = ST_RAW.map(([id, lv, ss, facts]) => {
  const sents = ss.map((s, i) => { const [hz, py] = s.split(' | '); chk(hz, py, `${id}#${i}`); return { hz, py }; });
  const text = sents.map((s) => s.hz).join('');
  facts.forEach(([k, a]) => { if (!POOLBY[a]) throw new Error(`story ${id}: ${a} not in POOL`); if (POOLBY[a].kind !== k) throw new Error(`story ${id}: kind of ${a}`); });
  return { id, lv, hz: text, py: sents.map((s) => s.py).join(' '), facts };
});
// the 'o' question in s23 is clearer with a plain prompt: fix text
STORIES.find((s) => s.id === 's23').facts[1] = ['o', '牛奶', 'Que boit-on? Papa a acheté…', 'Dad bought some…'];
const ST_LV = { 1: STORIES.filter((s) => s.lv === 1), 2: STORIES.filter((s) => s.lv <= 2), 3: STORIES.filter((s) => s.lv >= 2) };
const c21 = {
  id: 'c21',
  icon: '📚',
  title: { fr: 'Petites histoires 小故事', en: 'Little stories 小故事' },
  pfeq: 'Chinois — lecture : courts textes, compréhension (qui, quoi, où, quand) (1re année)',
  generate(level, R) {
    const s = R.pick(ST_LV[level]);
    const fi = R.int(0, s.facts.length - 1);
    const [kind, ans, fr, en] = s.facts[fi];
    const a = POOLBY[ans];
    const n = level === 1 ? 3 : level === 2 ? 3 : 4;
    const wr = wrongWords(R, kind, ans, s.hz, n - 1, true);
    const pic = level === 1;
    return mc(`c21-${s.id}-${fi}`, T(fr, en), poolOpt(a, pic), wr.map((p) => poolOpt(p, pic)), {
      stimulus: { hz: s.hz, py: s.py },
      say: say(s.hz),
      cols: n === 4 ? 2 : 3,
    });
  },
};

export const units = [c15, c16, c17, c18, c19, c20, c21];
