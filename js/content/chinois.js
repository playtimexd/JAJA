// Chinese (中文) for Petit Hibou, part 1: Hanyu Pinyin and first characters (人教版一年级 level).
// Simplified characters + pinyin with tone marks. Units c1..c14, 3 levels each.
// Instructions are {fr, en}; Chinese audio uses say: { text, lang: 'zh-CN' }.
// Careful rules: one pinyin syllable per Han character, neutral tone = no mark ('mā ma'),
// no audio-only question has two possible answers (homophones filtered), no 3rd+3rd tone words in listening tasks.

const Z = 'zh-CN';
const sayZ = (t) => ({ text: t, lang: Z });
const take = (R, a, n) => R.sample(a, Math.min(n, a.length));
const nd = (L) => (L === 1 ? 2 : 3); // number of wrong options: 3 / 4 / 4 options
const pyOf = (py) => ({ py });
const mc = (key, prompt, right, wrong, extra = {}) => ({ type: 'choice', key, prompt, options: [right, ...wrong], answer: 0, ...extra });

// ---------- pinyin helpers ----------
const MARKS = { a: 'āáǎà', o: 'ōóǒò', e: 'ēéěè', i: 'īíǐì', u: 'ūúǔù', v: 'ǖǘǚǜ' };
const UNM = {};
for (const k of Object.keys(MARKS)) [...MARKS[k]].forEach((c, i) => { UNM[c] = [k, i + 1]; });
function split(syl) { // 'shǔ' -> { base: 'shu', tone: 3 }  (ü is written v inside)
  let base = '', tone = 0;
  for (const c of syl) { if (UNM[c]) { base += UNM[c][0]; tone = UNM[c][1]; } else base += c === 'ü' ? 'v' : c; }
  return { base, tone };
}
function mark(base, tone) {
  const ch = [...base];
  if (tone) {
    let i = ch.indexOf('a'); if (i < 0) i = ch.indexOf('e'); if (i < 0) i = ch.indexOf('o');
    if (i < 0) for (let k = ch.length - 1; k >= 0; k--) if ('iuv'.includes(ch[k])) { i = k; break; }
    if (i >= 0) ch[i] = MARKS[ch[i]][tone - 1];
  }
  return ch.join('').replace(/v/g, 'ü');
}
const INI = ['zh', 'ch', 'sh', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'z', 'c', 's', 'y', 'w'];
function parts(syl) { // 'shū' -> { ini:'sh', fin:'u', tone:1, finM:'ū' }
  const { base, tone } = split(syl);
  const ini = INI.find((i) => base.startsWith(i)) || '';
  const fin = base.slice(ini.length);
  return { ini, fin, tone, finM: mark(fin, tone), finU: mark(fin, 0) };
}
// all tone variants of a pinyin string that change exactly one non-neutral syllable
function variants(py) {
  const s = py.split(' '), out = new Set();
  s.forEach((syl, i) => {
    const { base, tone } = split(syl);
    if (!tone) return;
    for (let t = 1; t <= 4; t++) if (t !== tone) { const c = s.slice(); c[i] = mark(base, t); out.add(c.join(' ')); }
  });
  out.delete(py);
  return [...out];
}
// variants that change EVERY syllable (only for words without neutral tone)
function variantsAll(py) {
  const s = py.split(' ');
  if (s.some((x) => !split(x).tone)) return variants(py);
  const out = new Set();
  const rec = (i, acc) => {
    if (i === s.length) { out.add(acc.join(' ')); return; }
    const { base, tone } = split(s[i]);
    for (let t = 1; t <= 4; t++) if (t !== tone) rec(i + 1, [...acc, mark(base, t)]);
  };
  rec(0, []);
  out.delete(py);
  return [...out];
}
const NEAR_INI = { b: 'p', p: 'b', d: 't', t: 'd', g: 'k', k: 'g', j: 'q', q: 'j', zh: 'ch', ch: 'zh', sh: 's', s: 'sh', z: 'c', c: 'z', l: 'n', n: 'l', f: 'h', h: 'f' };
const NEAR_FIN = { an: 'ang', ang: 'an', en: 'eng', eng: 'en', in: 'ing', ing: 'in', ai: 'ei', ei: 'ai', ou: 'iu', iu: 'ou' };
// syllables that sound close to a single syllable (tone, near initial, near final)
function nearSyl(py) {
  const { ini, fin, tone } = parts(py), base = ini + fin, out = new Set();
  for (let t = 1; t <= 4; t++) if (t !== tone) out.add(mark(base, t));
  if (NEAR_INI[ini]) out.add(mark(NEAR_INI[ini] + fin, tone));
  if (NEAR_FIN[fin]) out.add(mark(ini + NEAR_FIN[fin], tone));
  out.delete(py);
  return [...out];
}

// ---------- prompts ----------
const P = {
  hearPic: { fr: 'Écoute. Touche la bonne image.', en: 'Listen. Tap the right picture.' },
  seePic: { fr: 'Quelle image va avec ce mot?', en: 'Which picture goes with this word?' },
  picChar: { fr: 'Quel mot va avec l’image?', en: 'Which word goes with the picture?' },
  hearChar: { fr: 'Écoute. Touche le bon caractère.', en: 'Listen. Tap the right character.' },
  seePy: { fr: 'Lis le pinyin. Touche le bon caractère.', en: 'Read the pinyin. Tap the right character.' },
  meaning: { fr: 'Que veut dire ce mot?', en: 'What does this word mean?' },
  pyPick: { fr: 'Quel est le pinyin de ce mot?', en: 'What is the pinyin of this word?' },
  hearPy: { fr: 'Écoute. Touche le bon pinyin.', en: 'Listen. Tap the right pinyin.' },
  hearMean: { fr: 'Écoute. Que veut dire ce mot?', en: 'Listen. What does this word mean?' },
  lookSame: { fr: 'Touche exactement le même caractère.', en: 'Tap exactly the same character.' },
  meanBack: (w) => ({ fr: `Touche le mot qui veut dire « ${w.fr} ».`, en: `Tap the word that means “${w.en}”.` }),
};

// ---------- vocabulary ----------
const rows = (a) => a.map(([hz, py, e, fr, en, f]) => ({ hz, py, e: e || '', fr, en, nm: f === 'nm' }));

const W7 = rows([
  ['日', 'rì', '☀️', 'soleil, jour', 'sun, day'], ['月', 'yuè', '🌙', 'lune, mois', 'moon, month'],
  ['水', 'shuǐ', '💧', 'eau', 'water'], ['火', 'huǒ', '🔥', 'feu', 'fire'], ['山', 'shān', '⛰️', 'montagne', 'mountain'],
  ['石', 'shí', '🪨', 'pierre', 'stone'], ['田', 'tián', '', 'champ', 'field'], ['土', 'tǔ', '', 'terre (matière)', 'soil'],
  ['木', 'mù', '🪵', 'bois', 'wood'], ['禾', 'hé', '🌾', 'céréale, blé', 'grain plant'], ['云', 'yún', '☁️', 'nuage', 'cloud'],
  ['雨', 'yǔ', '🌧️', 'pluie', 'rain'], ['风', 'fēng', '🌬️', 'vent', 'wind'], ['天', 'tiān', '', 'ciel', 'sky'],
  ['地', 'dì', '', 'sol, terre', 'ground, earth'], ['花', 'huā', '🌸', 'fleur', 'flower'], ['草', 'cǎo', '🌿', 'herbe', 'grass'],
  ['树', 'shù', '🌳', 'arbre', 'tree'],
]);
const W8 = rows([
  ['口', 'kǒu', '👄', 'bouche', 'mouth'], ['耳', 'ěr', '👂', 'oreille', 'ear'], ['目', 'mù', '👁️', 'œil', 'eye'],
  ['手', 'shǒu', '✋', 'main', 'hand'], ['足', 'zú', '🦶', 'pied', 'foot'], ['头', 'tóu', '', 'tête', 'head'],
  ['牙', 'yá', '🦷', 'dent', 'tooth'], ['心', 'xīn', '❤️', 'cœur', 'heart'], ['鼻', 'bí', '👃', 'nez', 'nose'],
  ['身', 'shēn', '', 'corps', 'body'],
]);
const W9 = rows([
  ['爸爸', 'bà ba', '👨', 'papa', 'dad'], ['妈妈', 'mā ma', '👩', 'maman', 'mom'], ['哥哥', 'gē ge', '', 'grand frère', 'older brother'],
  ['姐姐', 'jiě jie', '', 'grande sœur', 'older sister'], ['弟弟', 'dì di', '', 'petit frère', 'younger brother'],
  ['妹妹', 'mèi mei', '', 'petite sœur', 'younger sister'], ['爷爷', 'yé ye', '👴', 'grand-père', 'grandpa'],
  ['奶奶', 'nǎi nai', '👵', 'grand-mère', 'grandma'], ['我', 'wǒ', '', 'moi, je', 'I, me'], ['你', 'nǐ', '', 'toi, tu', 'you'],
  ['他', 'tā', '', 'il, lui', 'he, him'], ['她', 'tā', '', 'elle', 'she, her'], ['们', 'men', '', 'marque du pluriel', 'plural marker', 'nm'],
  ['我们', 'wǒ men', '', 'nous', 'we, us'], ['你们', 'nǐ men', '', 'vous', 'you (plural)'],
]);
const W10 = rows([
  ['马', 'mǎ', '🐴', 'cheval', 'horse'], ['牛', 'niú', '🐮', 'vache, bœuf', 'cow, ox'], ['羊', 'yáng', '🐑', 'mouton', 'sheep'],
  ['鸟', 'niǎo', '🐦', 'oiseau', 'bird'], ['鱼', 'yú', '🐟', 'poisson', 'fish'], ['虫', 'chóng', '🐛', 'insecte, ver', 'bug, worm'],
  ['猫', 'māo', '🐱', 'chat', 'cat'], ['狗', 'gǒu', '🐶', 'chien', 'dog'], ['兔', 'tù', '🐰', 'lapin', 'rabbit'],
  ['鸡', 'jī', '🐔', 'poule', 'chicken'], ['鸭', 'yā', '🦆', 'canard', 'duck'], ['猪', 'zhū', '🐷', 'cochon', 'pig'],
  ['虎', 'hǔ', '🐯', 'tigre', 'tiger'],
]);
const W11 = rows([
  ['红', 'hóng', '🔴', 'rouge', 'red'], ['黄', 'huáng', '🟡', 'jaune', 'yellow'], ['蓝', 'lán', '🔵', 'bleu', 'blue'],
  ['绿', 'lǜ', '🟢', 'vert', 'green'], ['白', 'bái', '⚪', 'blanc', 'white'], ['黑', 'hēi', '⚫', 'noir', 'black'],
  ['上', 'shàng', '⬆️', 'en haut, dessus', 'up, above'], ['下', 'xià', '⬇️', 'en bas, dessous', 'down, below'],
  ['左', 'zuǒ', '⬅️', 'gauche', 'left'], ['右', 'yòu', '➡️', 'droite', 'right'], ['大', 'dà', '', 'grand', 'big'],
  ['小', 'xiǎo', '', 'petit', 'small'], ['多', 'duō', '', 'beaucoup', 'many'], ['少', 'shǎo', '', 'peu', 'few'],
  ['前', 'qián', '', 'devant', 'front'], ['后', 'hòu', '', 'derrière', 'behind'],
]);
const W12 = rows([
  ['书', 'shū', '📖', 'livre', 'book'], ['本', 'běn', '', 'cahier', 'notebook', 'nm'], ['笔', 'bǐ', '🖊️', 'crayon, stylo', 'pen'],
  ['门', 'mén', '🚪', 'porte', 'door'], ['车', 'chē', '🚗', 'auto', 'car'], ['米', 'mǐ', '', 'riz (grain)', 'rice (grain)'],
  ['饭', 'fàn', '🍚', 'repas, riz cuit', 'meal, cooked rice'], ['水', 'shuǐ', '💧', 'eau', 'water'], ['衣', 'yī', '👕', 'vêtement', 'clothes'],
  ['学', 'xué', '', 'étudier', 'to study'], ['生', 'shēng', '', 'naître, vivre', 'to be born, life'],
  ['老师', 'lǎo shī', '👩‍🏫', 'professeur', 'teacher'], ['家', 'jiā', '🏠', 'maison, famille', 'home, family'],
]);
const W6 = rows([
  ['一', 'yī', '', 'un', 'one'], ['二', 'èr', '', 'deux', 'two'], ['三', 'sān', '', 'trois', 'three'], ['四', 'sì', '', 'quatre', 'four'],
  ['五', 'wǔ', '', 'cinq', 'five'], ['六', 'liù', '', 'six', 'six'], ['七', 'qī', '', 'sept', 'seven'], ['八', 'bā', '', 'huit', 'eight'],
  ['九', 'jiǔ', '', 'neuf', 'nine'], ['十', 'shí', '', 'dix', 'ten'], ['百', 'bǎi', '', 'cent', 'hundred'], ['千', 'qiān', '', 'mille', 'thousand'],
]);

// characters that are not in the lists above but are useful as look-alike distractors
const EX = {
  入: 'rù', 八: 'bā', 太: 'tài', 犬: 'quǎn', 士: 'shì', 干: 'gān', 末: 'mò', 未: 'wèi', 乌: 'wū', 午: 'wǔ', 古: 'gǔ', 用: 'yòng',
  于: 'yú', 且: 'qiě', 自: 'zì', 免: 'miǎn', 角: 'jiǎo', 由: 'yóu', 中: 'zhōng', 出: 'chū', 买: 'mǎi', 灭: 'miè', 在: 'zài',
  回: 'huí', 老: 'lǎo', 师: 'shī', 汽: 'qì', 高: 'gāo', 低: 'dī', 冷: 'lěng', 热: 'rè', 快: 'kuài', 慢: 'màn', 早: 'zǎo',
  晚: 'wǎn', 好: 'hǎo', 坏: 'huài', 新: 'xīn', 旧: 'jiù', 来: 'lái', 去: 'qù', 开: 'kāi', 关: 'guān', 男: 'nán', 女: 'nǚ',
  远: 'yuǎn', 近: 'jìn', 哭: 'kū', 笑: 'xiào',
};
const LKG = [
  ['人', '入', '八'], ['大', '太', '天', '犬'], ['日', '目', '白', '田', '口'], ['土', '士', '干'], ['木', '禾', '本', '未', '末'],
  ['小', '少', '水'], ['左', '右', '在'], ['马', '鸟', '乌'], ['牛', '午', '羊', '手'], ['山', '出', '由'], ['月', '用', '目'],
  ['千', '十', '干', '于'], ['石', '古', '右'], ['耳', '且'], ['白', '百', '自'], ['兔', '免'], ['虫', '中', '由'], ['火', '灭', '大'],
  ['高', '喜'], ['买', '头'], ['鱼', '角'],
];
// groups of words whose meanings/pictures could be confused: never together as options
const CONF = [
  ['木', '树', '草', '禾'], ['土', '地', '田', '石'], ['鸟', '鸡', '鸭'], ['米', '饭'], ['书', '本'], ['我', '我们'], ['你', '你们'],
  ['日', '天'], ['云', '天'], ['口', '牙'], ['目', '头'], ['心', '身'], ['手', '身'], ['足', '身'], ['鱼', '虫'], ['猫', '虎'],
  ['上', '前'], ['下', '后'], ['大', '多'], ['小', '少'], ['们', '我们'], ['们', '你们'], ['爸爸', '爷爷'], ['妈妈', '奶奶'],
];

const ALL = [];
for (const w of [...W7, ...W8, ...W9, ...W10, ...W11, ...W12, ...W6]) if (!ALL.some((x) => x.hz === w.hz)) ALL.push(w);
const PYM = {};
for (const w of ALL) if ([...w.hz].length === 1) PYM[w.hz] = w.py;
for (const [k, v] of Object.entries(EX)) if (!PYM[k]) PYM[k] = v;
const conflict = (a, b) => CONF.some((g) => g.includes(a.hz) && g.includes(b.hz));

// wrong answers from a pool (priority) then from everything else
function others(R, w, pool, n, o = {}) {
  const ok = (x) => x.hz !== w.hz && x.py !== w.py && !conflict(w, x)
    && (!o.pic || (x.e && x.e !== w.e)) && (!o.mean || (!x.nm && x.fr !== w.fr)) && (!o.len || [...x.hz].length === [...w.hz].length);
  const cands = [...R.shuffle(pool.filter(ok)), ...R.shuffle(ALL.filter((x) => ok(x) && !pool.includes(x)))];
  const seenPy = new Set([w.py]), seenE = new Set([w.e]), seenFr = new Set([w.fr]), res = [];
  for (const x of cands) {
    if (seenPy.has(x.py) || (o.pic && seenE.has(x.e)) || (o.mean && seenFr.has(x.fr))) continue;
    seenPy.add(x.py); seenE.add(x.e); seenFr.add(x.fr); res.push(x);
    if (res.length === n) break;
  }
  return res;
}
// look-alike characters (single char) first, then ordinary distractors; never a homophone of w
function lookOthers(R, w, pool, n) {
  const res = [];
  if ([...w.hz].length === 1) {
    const g = LKG.find((x) => x.includes(w.hz)) || [];
    const lk = g.filter((c) => c !== w.hz && PYM[c] && PYM[c] !== w.py).map((c) => ({ hz: c, py: PYM[c] }));
    res.push(...take(R, lk, n));
  }
  if (res.length < n) {
    const more = others(R, w, pool, n + 2, { len: true }).filter((x) => !res.some((y) => y.hz === x.hz) && !res.some((y) => y.py === x.py));
    res.push(...more.slice(0, n - res.length));
  }
  return res;
}
const oHz = (w, py) => (py ? { hz: w.hz, py: w.py } : { hz: w.hz });
const uniqStr = (arr) => [...new Set(arr)];

const VT = {
  hearPic(R, w, pool, L) {
    if (!w.e) return null;
    const d = others(R, w, pool, nd(L), { pic: true });
    return mc('hp:' + w.hz, P.hearPic, { emoji: w.e }, d.map((x) => ({ emoji: x.e })), { say: sayZ(w.hz) });
  },
  seePic(R, w, pool, L) {
    if (!w.e) return null;
    const d = others(R, w, pool, nd(L), { pic: true });
    return mc('sp:' + w.hz, P.seePic, { emoji: w.e }, d.map((x) => ({ emoji: x.e })), { say: sayZ(w.hz), stimulus: { hz: w.hz, py: w.py } });
  },
  picChar(R, w, pool, L) {
    if (!w.e) return null;
    const d = others(R, w, pool, nd(L), {});
    return mc('pc:' + w.hz, P.picChar, oHz(w, true), d.map((x) => oHz(x, true)), { say: sayZ(w.hz), stimulus: { emoji: w.e } });
  },
  hearChar(R, w, pool, L) {
    const d = L === 3 ? lookOthers(R, w, pool, 3) : others(R, w, pool, nd(L), {});
    return mc('hc:' + w.hz, P.hearChar, oHz(w, L < 3), d.map((x) => oHz(x, L < 3)), { say: sayZ(w.hz) });
  },
  seePy(R, w, pool, L) {
    const d = L === 3 ? lookOthers(R, w, pool, 3) : others(R, w, pool, nd(L), {});
    return mc('xp:' + w.hz, P.seePy, oHz(w, false), d.map((x) => oHz(x, false)), { say: sayZ(w.hz), stimulus: { text: w.py } });
  },
  meaning(R, w, pool, L) {
    if (w.nm) return null;
    const d = others(R, w, pool, nd(L), { mean: true });
    return mc('mn:' + w.hz, P.meaning, { text: { fr: w.fr, en: w.en } }, d.map((x) => ({ text: { fr: x.fr, en: x.en } })), { say: sayZ(w.hz), stimulus: { hz: w.hz, py: w.py } });
  },
  pyPick(R, w, pool, L) {
    let wrong;
    if (L === 3) {
      wrong = take(R, variants(w.py), 2);
      const o = others(R, w, pool, 4, { len: true }).map((x) => x.py).filter((p) => !wrong.includes(p));
      wrong = uniqStr([...wrong, ...o]).slice(0, 3);
    } else wrong = others(R, w, pool, nd(L), { len: true }).map((x) => x.py);
    if (wrong.length < 2) return null;
    return mc('pp:' + w.hz, P.pyPick, pyOf(w.py), wrong.map(pyOf), { say: sayZ(w.hz), stimulus: L === 1 ? { hz: w.hz, py: w.py } : { hz: w.hz } });
  },
  hearPy(R, w, pool, L) {
    let wrong = take(R, variants(w.py), 2);
    const o = others(R, w, pool, 4, { len: true }).map((x) => x.py).filter((p) => !wrong.includes(p));
    wrong = uniqStr([...wrong, ...o]).slice(0, 3);
    if (wrong.length < 3) return null;
    return mc('hy:' + w.hz, P.hearPy, pyOf(w.py), wrong.map(pyOf), { say: sayZ(w.hz) });
  },
  meanBack(R, w, pool) {
    if (w.nm) return null;
    const d = others(R, w, pool, 3, { mean: true });
    return mc('mb:' + w.hz, P.meanBack(w), oHz(w, false), d.map((x) => oHz(x, false)));
  },
  hearMean(R, w, pool) {
    if (w.nm) return null;
    const d = others(R, w, pool, 3, { mean: true });
    return mc('hm:' + w.hz, P.hearMean, { text: { fr: w.fr, en: w.en } }, d.map((x) => ({ text: { fr: x.fr, en: x.en } })), { say: sayZ(w.hz) });
  },
  lookSame(R, w, pool) {
    const d = lookOthers(R, w, pool, 3);
    if (d.length < 3) return null;
    return mc('ls:' + w.hz, P.lookSame, oHz(w, false), d.map((x) => oHz(x, false)), { say: sayZ(w.hz), stimulus: { hz: w.hz } });
  },
};
const VLEVELS = {
  1: ['hearPic', 'seePic', 'picChar', 'hearChar', 'meaning', 'seePy', 'pyPick'],
  2: ['hearPic', 'picChar', 'hearChar', 'seePy', 'meaning', 'pyPick', 'hearPy'],
  3: ['hearChar', 'seePy', 'meaning', 'pyPick', 'hearPy', 'meanBack', 'hearMean', 'lookSame'],
};
function vocabUnit(id, icon, title, pfeq, pool) {
  return {
    id, icon, title, pfeq,
    generate(L, R) {
      for (let k = 0; k < 40; k++) {
        const w = R.pick(pool);
        const q = VT[R.pick(VLEVELS[L])](R, w, pool, L);
        if (q) return q;
      }
      throw new Error('no vocab question');
    },
  };
}

// =====================================================================
// c1 单韵母与四声
// =====================================================================
const TS = {
  ma: ['妈', '麻', '马', '骂'], ba: ['八', '拔', '把', '爸'], yi: ['衣', '姨', '椅', '意'], wu: ['屋', '无', '五', '雾'],
  shu: ['书', '熟', '鼠', '树'], fu: ['夫', '福', '府', '父'], mi: ['咪', '迷', '米', '蜜'], ji: ['鸡', '集', '几', '记'],
  qi: ['七', '骑', '起', '气'], xi: ['西', '习', '洗', '细'], shi: ['诗', '十', '使', '是'], zhu: ['猪', '竹', '主', '住'],
  tu: ['突', '图', '土', '兔'], hu: ['呼', '壶', '虎', '户'], yan: ['烟', '盐', '眼', '燕'], fan: ['翻', '烦', '反', '饭'],
  qing: ['清', '晴', '请', '庆'], ya: ['鸭', '牙', '哑', '亚'], wan: ['弯', '玩', '晚', '万'], ying: ['英', '迎', '影', '硬'],
};
const EASY = ['ma', 'ba', 'yi', 'wu', 'shu', 'fu', 'mi', 'ji', 'qi', 'xi', 'shi', 'zhu', 'tu', 'hu'];
const ARROW = ['→', '↗', '↘↗', '↘'];
const contourOpt = (t) => ({ text: `${t}  ${ARROW[t - 1]}` });
const VOWELS = [['a', '啊'], ['o', '哦'], ['e', '鹅'], ['i', '衣'], ['u', '乌'], ['ü', '鱼']];
const ORD = [{ fr: '1er', en: '1st' }, { fr: '2e', en: '2nd' }, { fr: '3e', en: '3rd' }, { fr: '4e', en: '4th' }];

const c1 = {
  id: 'c1', icon: '🎵', title: { fr: 'Voyelles et 4 tons · 单韵母与四声', en: 'Vowels & 4 tones · 单韵母与四声' },
  pfeq: 'Chinois — pinyin : voyelles et tons (1re année, programme chinois)',
  generate(L, R) {
    const types = L === 1 ? ['tonePick', 'contour', 'vowelPick'] : L === 2 ? ['tonePick', 'contour', 'vowelPick', 'vowelTone', 'markPick'] : ['tonePick', 'contour', 'vowelPick', 'vowelTone', 'markPick', 'tonePick'];
    const type = R.pick(types);
    const syls = L === 1 ? EASY : L === 2 ? [...EASY, 'yan', 'fan', 'qing', 'ya', 'wan', 'ying'] : Object.keys(TS);
    const s = R.pick(syls), t = R.int(1, 4), hz = TS[s][t - 1], py = mark(s, t);
    const others = [1, 2, 3, 4].filter((x) => x !== t);
    if (type === 'tonePick') {
      const ws = L === 1 ? take(R, others, 2) : others;
      return mc(`tp:${s}${t}`, { fr: 'Écoute. Quel est le bon ton?', en: 'Listen. Which tone is it?' }, pyOf(py), ws.map((x) => pyOf(mark(s, x))), { say: sayZ(hz) });
    }
    if (type === 'contour') {
      const ws = L === 1 ? take(R, others, 2) : others;
      return mc(`ct:${s}${t}`, { fr: 'Regarde le pinyin. Quelle est la mélodie de ce ton?', en: 'Look at the pinyin. What is the melody of this tone?' }, contourOpt(t), ws.map(contourOpt), { say: sayZ(hz), stimulus: { text: py } });
    }
    if (type === 'vowelPick') {
      const [v, vh] = R.pick(VOWELS);
      const ws = take(R, VOWELS.filter((x) => x[0] !== v), L === 1 ? 2 : L === 2 ? 3 : 5).map((x) => pyOf(x[0]));
      return mc(`vp:${v}`, { fr: 'Écoute. Quelle voyelle entends-tu?', en: 'Listen. Which vowel do you hear?' }, pyOf(v), ws, { say: sayZ(vh), cols: 3 });
    }
    if (type === 'vowelTone') {
      const [v] = R.pick(VOWELS), tt = R.int(1, 4);
      const key = v === 'ü' ? 'v' : v;
      return mc(`vt:${v}${tt}`, { fr: 'Regarde la voyelle. Quelle est la mélodie de ce ton?', en: 'Look at the vowel. What is the melody of this tone?' }, contourOpt(tt), [1, 2, 3, 4].filter((x) => x !== tt).map(contourOpt), { stimulus: { text: mark(key, tt) } });
    }
    // markPick: "touch the Nth tone"
    return mc(`mk:${s}${t}`, { fr: `Touche la syllabe au ${ORD[t - 1].fr} ton (${ARROW[t - 1]}).`, en: `Tap the syllable with the ${ORD[t - 1].en} tone (${ARROW[t - 1]}).` }, pyOf(py), others.map((x) => pyOf(mark(s, x))));
  },
};

// =====================================================================
// c2 声母
// =====================================================================
const IW = [
  ['b', '爸', 'bà', '👨'], ['p', '苹果', 'píng guǒ', '🍎'], ['m', '马', 'mǎ', '🐴'], ['f', '风', 'fēng', '🌬️'], ['d', '灯', 'dēng', '💡'],
  ['t', '兔', 'tù', '🐰'], ['n', '牛', 'niú', '🐮'], ['l', '梨', 'lí', '🍐'], ['g', '狗', 'gǒu', '🐶'], ['k', '裤', 'kù', '👖'],
  ['h', '花', 'huā', '🌸'], ['j', '鸡', 'jī', '🐔'], ['q', '球', 'qiú', '⚽'], ['x', '熊', 'xióng', '🐻'], ['zh', '猪', 'zhū', '🐷'],
  ['ch', '车', 'chē', '🚗'], ['sh', '树', 'shù', '🌳'], ['r', '日', 'rì', '☀️'], ['z', '嘴', 'zuǐ', '👄'], ['c', '草', 'cǎo', '🌿'],
  ['s', '伞', 'sǎn', '☂️'], ['y', '鱼', 'yú', '🐟'], ['w', '袜', 'wà', '🧦'],
].map(([ini, hz, py, e]) => ({ ini, hz, py, e }));
const GROUPS = [['b', 'p'], ['d', 't'], ['g', 'k', 'h'], ['j', 'q', 'x'], ['zh', 'ch', 'sh', 'r'], ['z', 'c', 's'], ['m', 'n', 'l', 'f'], ['y', 'w']];
const grp = (i) => GROUPS.find((g) => g.includes(i));
const iniClose = (i) => { // confusable initials (same group; small groups borrow a neighbour)
  const g = grp(i).filter((x) => x !== i);
  if (g.length >= 3) return g;
  const extra = { b: ['m'], p: ['f'], d: ['n'], t: ['l'], y: ['j', 'x'], w: ['f', 'h'] }[i] || [];
  return [...g, ...extra];
};
const iniFar = (i) => INI.filter((x) => !grp(i).includes(x) && !iniClose(i).includes(x));
const iniOpts = (R, ini, L) => {
  const n = L === 1 ? 2 : 3;
  const pool = L === 3 ? iniClose(ini) : iniFar(ini);
  const w = take(R, pool, n);
  if (w.length < n) w.push(...take(R, INI.filter((x) => x !== ini && !w.includes(x)), n - w.length));
  return w.map(pyOf);
};
const SYLS = [];
const addSyl = (hz, py) => { const s = py.split(' ')[0]; if (!SYLS.some((x) => x.py === s)) SYLS.push({ hz: [...hz][0], py: s, ini: parts(s).ini }); };
IW.forEach((w) => addSyl(w.hz, w.py));

const c2 = {
  id: 'c2', icon: '🔤', title: { fr: 'Consonnes initiales · 声母', en: 'Initials · 声母' },
  pfeq: 'Chinois — pinyin : initiales (1re année, programme chinois)',
  generate(L, R) {
    const w = R.pick(IW);
    const types = L === 1 ? ['hearIni', 'picIni', 'seeIni', 'iniWord'] : L === 2 ? ['hearIni', 'picIni', 'iniWord', 'seeIni'] : ['hearIni', 'iniWord', 'iniPy', 'picIni', 'iniPy'];
    const t = R.pick(types);
    const Pi = { fr: 'Par quelle lettre commence ce mot?', en: 'Which letter does this word start with?' };
    if (t === 'hearIni') return mc(`hi:${w.ini}`, { fr: 'Écoute. Par quelle lettre commence ce mot?', en: 'Listen. Which letter does this word start with?' }, pyOf(w.ini), iniOpts(R, w.ini, L), { say: sayZ(w.hz), cols: 4 });
    if (t === 'picIni') return mc(`pi:${w.ini}`, Pi, pyOf(w.ini), iniOpts(R, w.ini, L), { say: sayZ(w.hz), stimulus: { emoji: w.e }, cols: 4 });
    if (t === 'seeIni') return mc(`si:${w.ini}`, Pi, pyOf(w.ini), iniOpts(R, w.ini, L), { say: sayZ(w.hz), stimulus: { hz: w.hz, py: w.py }, cols: 4 });
    if (t === 'iniWord') {
      const pool = IW.filter((x) => x.ini !== w.ini && (L === 3 ? iniClose(w.ini).includes(x.ini) : L === 1 ? !grp(w.ini).includes(x.ini) : true));
      const d = take(R, pool, L === 1 ? 2 : 3);
      const o = (x) => (L === 1 ? { hz: x.hz, py: x.py, emoji: x.e } : { hz: x.hz, py: x.py });
      return mc(`iw:${w.ini}`, { fr: `Quel mot commence par « ${w.ini} »?`, en: `Which word starts with “${w.ini}”?` }, o(w), d.map(o), { stimulus: { text: w.ini } });
    }
    // iniPy: which syllable starts with the initial
    const right = R.pick(SYLS.filter((s) => s.ini === w.ini));
    const wrongPool = SYLS.filter((s) => s.ini !== w.ini && (L === 3 ? iniClose(w.ini).includes(s.ini) : true));
    const wrong = take(R, wrongPool, 3);
    return mc(`ip:${w.ini}`, { fr: `Quelle syllabe commence par « ${w.ini} »?`, en: `Which syllable starts with “${w.ini}”?` }, pyOf(right.py), wrong.map((s) => pyOf(s.py)), { stimulus: { text: w.ini } });
  },
};

// =====================================================================
// c3 拼读  (blending)
// =====================================================================
const PIC1 = [
  ['妈', 'mā', '👩'], ['爸', 'bà', '👨'], ['鱼', 'yú', '🐟'], ['马', 'mǎ', '🐴'], ['牛', 'niú', '🐮'], ['猫', 'māo', '🐱'], ['狗', 'gǒu', '🐶'],
  ['鸟', 'niǎo', '🐦'], ['鸡', 'jī', '🐔'], ['兔', 'tù', '🐰'], ['伞', 'sǎn', '☂️'], ['花', 'huā', '🌸'], ['书', 'shū', '📖'], ['手', 'shǒu', '✋'],
  ['心', 'xīn', '❤️'], ['水', 'shuǐ', '💧'], ['火', 'huǒ', '🔥'], ['门', 'mén', '🚪'], ['车', 'chē', '🚗'], ['衣', 'yī', '👕'],
  ['牙', 'yá', '🦷'], ['口', 'kǒu', '👄'], ['月', 'yuè', '🌙'], ['日', 'rì', '☀️'], ['山', 'shān', '⛰️'], ['云', 'yún', '☁️'],
  ['雨', 'yǔ', '🌧️'], ['风', 'fēng', '🌬️'], ['虫', 'chóng', '🐛'], ['鸭', 'yā', '🦆'], ['羊', 'yáng', '🐑'], ['猪', 'zhū', '🐷'],
  ['树', 'shù', '🌳'], ['草', 'cǎo', '🌿'], ['笔', 'bǐ', '🖊️'], ['饭', 'fàn', '🍚'], ['家', 'jiā', '🏠'], ['星', 'xīng', '⭐'],
  ['灯', 'dēng', '💡'], ['球', 'qiú', '⚽'], ['梨', 'lí', '🍐'], ['熊', 'xióng', '🐻'], ['虾', 'xiā', '🦐'], ['裤', 'kù', '👖'],
  ['袜', 'wà', '🧦'], ['钟', 'zhōng', '🕐'], ['铃', 'líng', '🔔'],
].map(([hz, py, e]) => ({ hz, py, e, ...parts(py) }));
PIC1.forEach((w) => addSyl(w.hz, w.py));
const blendWrong = (R, w, L) => { // toneless wrong syllables near ini+fin
  const base = w.ini + w.fin, out = new Set();
  const ini2 = NEAR_INI[w.ini], fin2 = NEAR_FIN[w.fin];
  if (ini2) out.add(ini2 + w.fin);
  if (fin2) out.add(w.ini + fin2);
  for (const o of PIC1) { if (o !== w && o.ini && (o.ini === w.ini || o.fin === w.fin)) out.add(L === 1 ? o.ini + o.fin : (o.ini === w.ini ? w.ini + o.fin : o.ini + w.fin)); }
  const rnd = R.pick(PIC1.filter((o) => o !== w && o.ini && o.ini !== w.ini && o.fin !== w.fin));
  out.add(L === 1 ? rnd.ini + rnd.fin : rnd.ini + w.fin);
  out.delete(base);
  return [...out];
};

const c3 = {
  id: 'c3', icon: '🧩', title: { fr: 'Assembler les sons · 拼读', en: 'Blending sounds · 拼读' },
  pfeq: 'Chinois — pinyin : lecture de syllabes (1re année, programme chinois)',
  generate(L, R) {
    const types = L === 1 ? ['hearPy', 'seePyPic', 'blendO', 'blendC'] : L === 2 ? ['hearPy', 'seePyPic', 'blendO', 'blendC'] : ['hearPy', 'seePyHz', 'blendO', 'blendC', 'hearPy'];
    const t = R.pick(types);
    const w = R.pick(PIC1.filter((x) => x.ini || t === 'hearPy' || t === 'seePyPic' || t === 'seePyHz'));
    if (t === 'hearPy') {
      let wrong;
      if (L === 1) wrong = take(R, PIC1.filter((x) => x.py !== w.py), 2).map((x) => x.py);
      else if (L === 2) {
        const near = take(R, nearSyl(w.py), 2);
        const rnd = take(R, PIC1.filter((x) => x.py !== w.py && !near.includes(x.py)), 1).map((x) => x.py);
        wrong = [...near, ...rnd];
      } else wrong = take(R, nearSyl(w.py), 3);
      if (L === 3 && wrong.length < 3) wrong.push(...take(R, PIC1.filter((x) => x.py !== w.py && !wrong.includes(x.py)), 3 - wrong.length).map((x) => x.py));
      return mc(`hy:${w.hz}`, P.hearPy, pyOf(w.py), uniqStr(wrong).map(pyOf), { say: sayZ(w.hz) });
    }
    if (t === 'seePyPic') {
      const d = take(R, PIC1.filter((x) => x.py !== w.py && x.e !== w.e), nd(L));
      return mc(`sy:${w.hz}`, { fr: 'Lis le pinyin. Touche la bonne image.', en: 'Read the pinyin. Tap the right picture.' }, { emoji: w.e }, d.map((x) => ({ emoji: x.e })), { say: sayZ(w.hz), stimulus: { text: w.py } });
    }
    if (t === 'seePyHz') {
      const lk = lookOthers(R, { hz: w.hz, py: w.py }, ALL, 3);
      return mc(`sz:${w.hz}`, P.seePy, oHz(w, false), lk.map((x) => oHz(x, false)), { say: sayZ(w.hz), stimulus: { text: w.py } });
    }
    if (t === 'blendC') {
      const wrong = take(R, blendWrong(R, w, L), nd(L)).map((s) => pyOf(s));
      return mc(`bc:${w.hz}`, { fr: 'Mets les sons ensemble. Que lis-tu?', en: 'Blend the sounds. What do you read?' }, pyOf(w.ini + w.fin), wrong, { say: sayZ(w.hz), stimulus: { text: `${w.ini} + ${w.fin}` } });
    }
    // blendO: build the syllable from its pieces
    const oi = R.pick(PIC1.filter((x) => x.ini && x.ini !== w.ini));
    const extra = L === 1 ? [oi.ini] : L === 2 ? [oi.ini, oi.finM] : [NEAR_INI[w.ini] || oi.ini, mark(NEAR_FIN[w.fin] || oi.fin, w.tone)];
    const stim = L === 1 ? { emoji: w.e } : L === 2 ? { hz: w.hz } : undefined;
    const q = { type: 'order', key: `bo:${w.hz}`, prompt: { fr: 'Écoute. Remets les sons dans l’ordre.', en: 'Listen. Put the sounds in order.' }, say: sayZ(w.hz), tiles: [w.ini, w.finM], extra: uniqStr(extra).filter((x) => x !== w.ini && x !== w.finM), joiner: '' };
    if (stim) q.stimulus = stim;
    return q;
  },
};

// =====================================================================
// c4 复韵母和鼻韵母
// =====================================================================
const FINALS = ['ai', 'ei', 'ui', 'ao', 'ou', 'iu', 'ie', 'üe', 'er', 'an', 'en', 'in', 'un', 'ün', 'ang', 'eng', 'ing', 'ong'];
const NEAR4 = {
  ai: ['ei', 'an', 'ao'], ei: ['ai', 'ui', 'en'], ui: ['ei', 'iu', 'un'], ao: ['ou', 'ai', 'ang'], ou: ['ao', 'iu', 'ong'], iu: ['ou', 'ui', 'in'],
  ie: ['üe', 'ei', 'in'], üe: ['ie', 'ün', 'er'], er: ['en', 'ei', 'ie'], an: ['ang', 'en', 'ai'], en: ['eng', 'an', 'in'], in: ['ing', 'ün', 'en'],
  un: ['ün', 'en', 'ui'], ün: ['un', 'in', 'üe'], ang: ['an', 'eng', 'ong'], eng: ['en', 'ing', 'ang'], ing: ['in', 'eng', 'ong'], ong: ['ang', 'eng', 'ou'],
};
const F4 = [
  ['ai', '菜', 'cài', '🥬'], ['ai', '白', 'bái', '⚪'], ['ai', '买', 'mǎi', '🛒'], ['ai', '来', 'lái', ''],
  ['ei', '杯', 'bēi', '🥛'], ['ei', '黑', 'hēi', '⚫'], ['ei', '美', 'měi', ''], ['ei', '飞', 'fēi', '✈️'],
  ['ui', '水', 'shuǐ', '💧'], ['ui', '腿', 'tuǐ', '🦵'], ['ui', '嘴', 'zuǐ', ''], ['ui', '队', 'duì', ''], ['ui', '回', 'huí', ''],
  ['ao', '猫', 'māo', '🐱'], ['ao', '草', 'cǎo', '🌿'], ['ao', '桃', 'táo', '🍑'], ['ao', '好', 'hǎo', ''], ['ao', '帽', 'mào', '🧢'],
  ['ou', '狗', 'gǒu', '🐶'], ['ou', '手', 'shǒu', '✋'], ['ou', '头', 'tóu', ''], ['ou', '口', 'kǒu', '👄'], ['ou', '楼', 'lóu', '🏢'],
  ['iu', '牛', 'niú', '🐮'], ['iu', '球', 'qiú', '⚽'], ['iu', '六', 'liù', '6️⃣'], ['iu', '九', 'jiǔ', '9️⃣'], ['iu', '油', 'yóu', ''],
  ['ie', '鞋', 'xié', '👟'], ['ie', '写', 'xiě', '✏️'], ['ie', '爷', 'yé', '👴'], ['ie', '姐', 'jiě', ''], ['ie', '叶', 'yè', '🍃'],
  ['üe', '月', 'yuè', '🌙'], ['üe', '雪', 'xuě', '❄️'], ['üe', '学', 'xué', ''],
  ['er', '耳', 'ěr', '👂'], ['er', '二', 'èr', '2️⃣'], ['er', '儿', 'ér', ''],
  ['an', '山', 'shān', '⛰️'], ['an', '伞', 'sǎn', '☂️'], ['an', '蓝', 'lán', '🔵'], ['an', '饭', 'fàn', '🍚'], ['an', '看', 'kàn', ''],
  ['en', '门', 'mén', '🚪'], ['en', '人', 'rén', '🧑'], ['en', '本', 'běn', ''], ['en', '很', 'hěn', ''],
  ['in', '心', 'xīn', '❤️'], ['in', '林', 'lín', ''], ['in', '金', 'jīn', ''], ['in', '银', 'yín', ''], ['in', '音', 'yīn', ''],
  ['un', '春', 'chūn', '🌱'], ['un', '村', 'cūn', ''], ['un', '孙', 'sūn', ''], ['un', '轮', 'lún', ''],
  ['ün', '云', 'yún', '☁️'], ['ün', '军', 'jūn', ''], ['ün', '裙', 'qún', '👗'],
  ['ang', '羊', 'yáng', '🐑'], ['ang', '糖', 'táng', '🍬'], ['ang', '汤', 'tāng', '🍲'], ['ang', '忙', 'máng', ''], ['ang', '上', 'shàng', '⬆️'],
  ['eng', '风', 'fēng', '🌬️'], ['eng', '灯', 'dēng', '💡'], ['eng', '冷', 'lěng', '🥶'], ['eng', '生', 'shēng', ''],
  ['ing', '星', 'xīng', '⭐'], ['ing', '瓶', 'píng', '🍼'], ['ing', '铃', 'líng', '🔔'], ['ing', '请', 'qǐng', ''],
  ['ong', '虫', 'chóng', '🐛'], ['ong', '红', 'hóng', '🔴'], ['ong', '钟', 'zhōng', '🕐'], ['ong', '东', 'dōng', ''], ['ong', '龙', 'lóng', '🐉'],
].map(([fin, hz, py, e]) => ({ ...parts(py), fin, hz, py, e }));
F4.forEach((w) => addSyl(w.hz, w.py));
const finOpts = (R, fin, L) => {
  const n = L === 1 ? 2 : 3;
  let pool;
  if (L === 3) pool = NEAR4[fin];
  else pool = FINALS.filter((f) => f !== fin && !NEAR4[fin].includes(f));
  const w = take(R, pool, n);
  if (w.length < n) w.push(...take(R, FINALS.filter((f) => f !== fin && !w.includes(f)), n - w.length));
  return w.map(pyOf);
};

const c4 = {
  id: 'c4', icon: '🔗', title: { fr: 'Voyelles composées et nasales · 复韵母和鼻韵母', en: 'Compound & nasal finals · 复韵母和鼻韵母' },
  pfeq: 'Chinois — pinyin : finales composées et nasales (1re année, programme chinois)',
  generate(L, R) {
    const types = L === 1 ? ['hearFin', 'seeFin', 'finWord', 'hearFin'] : L === 2 ? ['hearFin', 'seeFin', 'finWord', 'finOrder'] : ['hearFin', 'finWord', 'finOrder', 'sortFin', 'hearFin'];
    const t = R.pick(types);
    const w = R.pick(F4);
    if (t === 'hearFin') return mc(`hf:${w.hz}`, { fr: 'Écoute. Quelle finale entends-tu dans ce mot?', en: 'Listen. Which final do you hear in this word?' }, pyOf(w.fin), finOpts(R, w.fin, L), { say: sayZ(w.hz), cols: 4 });
    if (t === 'seeFin') return mc(`sf:${w.hz}`, { fr: 'Quelle finale vois-tu dans ce mot?', en: 'Which final is in this word?' }, pyOf(w.fin), finOpts(R, w.fin, L), { say: sayZ(w.hz), stimulus: { hz: w.hz, py: w.py }, cols: 4 });
    if (t === 'finWord') {
      const pool = F4.filter((x) => x.fin !== w.fin && x.py !== w.py && (L === 3 ? NEAR4[w.fin].includes(x.fin) : L === 1 ? !NEAR4[w.fin].includes(x.fin) : true) && (L > 1 || x.e));
      const seen = new Set();
      const d = R.shuffle(pool).filter((x) => { if (seen.has(x.fin + (L === 3 ? x.hz : ''))) return false; seen.add(x.fin + (L === 3 ? x.hz : '')); return true; }).slice(0, L === 1 ? 2 : 3);
      const o = (x) => (L === 1 ? { hz: x.hz, py: x.py, emoji: x.e } : { hz: x.hz, py: x.py });
      if (L === 1 && !w.e) return mc(`fw:${w.hz}`, { fr: `Quel mot a la finale « ${w.fin} »?`, en: `Which word has the final “${w.fin}”?` }, { hz: w.hz, py: w.py }, d.map((x) => ({ hz: x.hz, py: x.py })), { stimulus: { text: w.fin } });
      return mc(`fw:${w.hz}`, { fr: `Quel mot a la finale « ${w.fin} »?`, en: `Which word has the final “${w.fin}”?` }, o(w), d.map(o), { stimulus: { text: w.fin } });
    }
    if (t === 'finOrder') {
      const x = R.pick(F4.filter((y) => y.ini));
      const oi = R.pick(F4.filter((y) => y.ini && y.fin !== x.fin));
      const extra = L === 2 ? [oi.ini, oi.finM] : [oi.ini, mark(NEAR4[x.fin][0].replace('ü', 'v'), x.tone).replace('v', 'ü')];
      return { type: 'order', key: `fo:${x.hz}`, prompt: { fr: 'Écoute. Remets les sons dans l’ordre.', en: 'Listen. Put the sounds in order.' }, say: sayZ(x.hz), stimulus: L === 2 ? { hz: x.hz } : undefined, tiles: [x.ini, x.finM], extra: uniqStr(extra).filter((z) => z !== x.ini && z !== x.finM), joiner: '' };
    }
    // sortFin: two close finals
    const a = w.fin, b = R.pick(NEAR4[a].slice(0, 2));
    const ia = take(R, F4.filter((x) => x.fin === a), 3), ib = take(R, F4.filter((x) => x.fin === b), 3);
    const items = R.shuffle([...ia.map((x) => ({ hz: x.hz, py: x.py, bin: 0 })), ...ib.map((x) => ({ hz: x.hz, py: x.py, bin: 1 }))]);
    return { type: 'sort', key: `sf:${a}:${b}:${items.map((x) => x.hz).sort().join('')}`, prompt: { fr: 'Place chaque mot dans la bonne boîte (selon sa finale).', en: 'Put each word in the right box (by its final).' }, bins: [{ text: a }, { text: b }], items };
  },
};

// =====================================================================
// c5 声调大挑战  (two-syllable words, tone patterns) — no 3rd+3rd tone words (sandhi)
// =====================================================================
const W5 = [
  ['妈妈', 'mā ma', '👩'], ['爸爸', 'bà ba', '👨'], ['哥哥', 'gē ge', ''], ['姐姐', 'jiě jie', ''], ['弟弟', 'dì di', ''], ['妹妹', 'mèi mei', ''],
  ['爷爷', 'yé ye', '👴'], ['奶奶', 'nǎi nai', '👵'], ['老师', 'lǎo shī', '👩‍🏫'], ['学生', 'xué sheng', '🧑‍🎓'], ['朋友', 'péng you', '🤝'],
  ['谢谢', 'xiè xie', '🙏'], ['再见', 'zài jiàn', '👋'], ['太阳', 'tài yáng', '☀️'], ['月亮', 'yuè liang', '🌙'], ['星星', 'xīng xing', '⭐'],
  ['苹果', 'píng guǒ', '🍎'], ['香蕉', 'xiāng jiāo', '🍌'], ['西瓜', 'xī guā', '🍉'], ['米饭', 'mǐ fàn', '🍚'], ['牛奶', 'niú nǎi', '🥛'],
  ['面包', 'miàn bāo', '🍞'], ['熊猫', 'xióng māo', '🐼'], ['蝴蝶', 'hú dié', '🦋'], ['青蛙', 'qīng wā', '🐸'], ['大山', 'dà shān', '⛰️'],
  ['白云', 'bái yún', '☁️'], ['红花', 'hóng huā', '🌹'], ['书包', 'shū bāo', '🎒'], ['铅笔', 'qiān bǐ', '✏️'], ['学校', 'xué xiào', '🏫'],
  ['电话', 'diàn huà', '📞'], ['火车', 'huǒ chē', '🚂'], ['汽车', 'qì chē', '🚗'], ['飞机', 'fēi jī', '✈️'], ['红色', 'hóng sè', ''],
  ['眼睛', 'yǎn jing', '👀'], ['耳朵', 'ěr duo', '👂'], ['鼻子', 'bí zi', '👃'], ['手机', 'shǒu jī', '📱'], ['椅子', 'yǐ zi', '🪑'],
  ['桌子', 'zhuō zi', ''], ['孩子', 'hái zi', '🧒'], ['房子', 'fáng zi', '🏠'], ['杯子', 'bēi zi', '☕'], ['衣服', 'yī fu', '👕'],
  ['名字', 'míng zi', ''], ['东西', 'dōng xi', ''], ['我们', 'wǒ men', ''], ['他们', 'tā men', ''],
].map(([hz, py, e]) => ({ hz, py, e, neutral: py.split(' ').some((s) => !split(s).tone), rep: hz[0] === hz[1] }));

const c5 = {
  id: 'c5', icon: '🎼', title: { fr: 'Le grand défi des tons · 声调大挑战', en: 'The big tone challenge · 声调大挑战' },
  pfeq: 'Chinois — pinyin : tons de mots de deux syllabes (1re année, programme chinois)',
  generate(L, R) {
    const types = L === 1 ? ['hearTone', 'hearPic', 'hearTone'] : L === 2 ? ['hearTone', 'hzPick', 'neutral', 'order', 'hearTone'] : ['hearTone', 'pyPick', 'hzPick', 'neutral', 'order'];
    const t = R.pick(types);
    const w = R.pick(W5.filter((x) => t !== 'hearPic' || x.e));
    if (t === 'hearTone') {
      let pool;
      if (L === 1) pool = variantsAll(w.py);
      else if (L === 2) pool = uniqStr([...variants(w.py), ...variantsAll(w.py)]);
      else pool = variants(w.py);
      const wrong = take(R, pool, nd(L));
      return mc(`ht:${w.hz}`, { fr: 'Écoute. Quel est le bon pinyin?', en: 'Listen. Which is the right pinyin?' }, pyOf(w.py), wrong.map(pyOf), { say: sayZ(w.hz), cols: L === 1 ? 3 : 2 });
    }
    if (t === 'pyPick') {
      const wrong = take(R, variants(w.py), 3);
      return mc(`pp:${w.hz}`, { fr: 'Quel est le pinyin de ce mot?', en: 'What is the pinyin of this word?' }, pyOf(w.py), wrong.map(pyOf), { say: sayZ(w.hz), stimulus: { hz: w.hz }, cols: 2 });
    }
    if (t === 'hearPic') {
      const d = take(R, W5.filter((x) => x.e && x.e !== w.e), 2);
      return mc(`hp:${w.hz}`, { fr: 'Écoute. Touche la bonne image.', en: 'Listen. Tap the right picture.' }, { emoji: w.e }, d.map((x) => ({ emoji: x.e })), { say: sayZ(w.hz) });
    }
    if (t === 'hzPick') {
      const d = take(R, W5.filter((x) => x.py !== w.py && x.hz !== w.hz), 3);
      return mc(`hz:${w.hz}`, { fr: 'Lis le pinyin. Touche le bon mot.', en: 'Read the pinyin. Tap the right word.' }, { hz: w.hz, py: L === 2 ? w.py : undefined }, d.map((x) => ({ hz: x.hz, py: L === 2 ? x.py : undefined })), { say: sayZ(w.hz), stimulus: { text: w.py } });
    }
    if (t === 'neutral') {
      const nw = R.pick(W5.filter((x) => x.neutral)), d = take(R, W5.filter((x) => !x.neutral), nd(L));
      return mc(`nt:${nw.hz}`, { fr: 'Lequel a un ton neutre (une syllabe sans accent)?', en: 'Which one has a neutral tone (a syllable with no mark)?' }, { hz: nw.hz, py: nw.py }, d.map((x) => ({ hz: x.hz, py: x.py })));
    }
    // order the two characters
    const ow = R.pick(W5.filter((x) => !x.rep));
    const [a, b] = [...ow.hz], [pa, pb] = ow.py.split(' ');
    const other = R.pick(W5.filter((x) => !x.rep && !ow.hz.includes([...x.hz][0]) && !ow.hz.includes([...x.hz][1])));
    const tile = (hz, py) => (L === 2 ? { hz, py } : { hz });
    return { type: 'order', key: `od:${ow.hz}`, prompt: { fr: 'Écoute. Remets les caractères dans l’ordre.', en: 'Listen. Put the characters in order.' }, say: sayZ(ow.hz), tiles: [tile(a, pa), tile(b, pb)], extra: [tile([...other.hz][0], other.py.split(' ')[0])], joiner: '' };
  },
};

// =====================================================================
// c6 数字
// =====================================================================
const D = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
const DP = ['líng', 'yī', 'èr', 'sān', 'sì', 'wǔ', 'liù', 'qī', 'bā', 'jiǔ', 'shí'];
function numHz(n) {
  if (n === 100) return { hz: '百', py: 'bǎi' };
  if (n === 1000) return { hz: '千', py: 'qiān' };
  if (n <= 10) return { hz: D[n], py: DP[n] };
  const t = Math.floor(n / 10), u = n % 10;
  if (t === 1) return { hz: '十' + D[u], py: 'shí ' + DP[u] };
  return { hz: D[t] + '十' + (u ? D[u] : ''), py: DP[t] + ' shí' + (u ? ' ' + DP[u] : '') };
}
const DOTS = ['🍎', '⭐', '🐟', '🌸', '🎈'];
const c6 = {
  id: 'c6', icon: '🔢', title: { fr: 'Les nombres · 数字', en: 'Numbers · 数字' },
  pfeq: 'Chinois — nombres 一 à 十, 百, 千 (1re année, programme chinois)',
  generate(L, R) {
    const types = L === 1 ? ['hearNum', 'seeNum', 'digitHz', 'dotsHz', 'hearDots', 'keypad', 'order']
      : L === 2 ? ['hearNum', 'seeNum', 'digitHz', 'dotsHz', 'hearDots', 'keypad', 'order'] : ['hearNum', 'seeNum', 'digitHz', 'keypad', 'order', 'hearNum', 'seeNum'];
    const t = R.pick(types);
    const base = L === 1 ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : L === 2 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 100, 1000] : [...Array.from({ length: 10 }, (_, i) => i + 1), ...Array.from({ length: 19 }, (_, i) => i + 11), 20, 30, 40, 50, 60, 70, 80, 90, 100, 1000];
    let n;
    if (L === 3) n = R.chance(0.7) ? R.int(11, 99) : R.pick(base);
    else n = R.pick(base);
    if ((t === 'dotsHz' || t === 'hearDots') && n > 10) n = R.int(1, 10);
    if (t === 'dotsHz' && n < 1) n = R.int(1, 10);
    if (t === 'hearDots' && n < 1) n = R.int(1, 10);
    const h = numHz(n);
    const near = (k) => {
      const set = new Set();
      if (L === 3 && n >= 11 && n < 100) { set.add(n + 1); set.add(n - 1); set.add(n + 10); set.add(n - 10); set.add(Math.floor(n % 10) * 10 + Math.floor(n / 10)); set.add(n + 2); }
      else { for (const x of base) set.add(x); }
      set.delete(n); set.delete(0 + (n ? -1 : 0));
      return take(R, [...set].filter((x) => x > 0 || (L === 2 && x === 0)), k);
    };
    const k = nd(L);
    if (t === 'hearNum') return mc(`hn:${n}`, { fr: 'Écoute. Touche le bon nombre.', en: 'Listen. Tap the right number.' }, { text: String(n) }, near(k).map((x) => ({ text: String(x) })), { say: sayZ(h.hz), cols: 4 });
    if (t === 'seeNum') return mc(`sn:${n}`, { fr: 'Quel est ce nombre?', en: 'What number is this?' }, { text: String(n) }, near(k).map((x) => ({ text: String(x) })), { say: sayZ(h.hz), stimulus: { hz: h.hz, py: h.py }, cols: 4 });
    if (t === 'digitHz') return mc(`dh:${n}`, { fr: 'Touche le bon caractère pour ce nombre.', en: 'Tap the right characters for this number.' }, { hz: h.hz, ...(L < 3 ? { py: h.py } : {}) }, near(k).map((x) => ({ hz: numHz(x).hz, ...(L < 3 ? { py: numHz(x).py } : {}) })), { say: sayZ(h.hz), stimulus: { text: String(n) }, cols: 4 });
    if (t === 'dotsHz') {
      const e = R.pick(DOTS);
      return mc(`dz:${n}`, { fr: 'Compte. Touche le bon nombre.', en: 'Count. Tap the right number.' }, { hz: h.hz, ...(L < 3 ? { py: h.py } : {}) }, near(k).map((x) => ({ hz: numHz(x).hz, ...(L < 3 ? { py: numHz(x).py } : {}) })), { say: sayZ(h.hz), stimulus: { emojis: e, count: n }, cols: 4 });
    }
    if (t === 'hearDots') {
      const e = R.pick(DOTS);
      const ws = take(R, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((x) => x !== n), k);
      return mc(`hd:${n}`, { fr: 'Écoute. Touche les bons objets.', en: 'Listen. Tap the right group.' }, { emoji: e.repeat(n) }, ws.map((x) => ({ emoji: e.repeat(x) })), { say: sayZ(h.hz), cols: 2 });
    }
    if (t === 'keypad') return { type: 'keypad', key: `kp:${n}`, prompt: { fr: 'Écris ce nombre avec le clavier.', en: 'Type this number on the keypad.' }, say: sayZ(h.hz), stimulus: { hz: h.hz, py: h.py }, answer: n };
    // order
    const len = L === 1 ? 3 : 4, hi = L === 3 ? 18 : 10;
    const s = R.int(1, Math.max(1, hi - len + 1));
    const seq = Array.from({ length: len }, (_, i) => s + i);
    return { type: 'order', key: `od:${s}:${len}`, prompt: { fr: 'Écoute. Mets les nombres dans l’ordre.', en: 'Listen. Put the numbers in order.' }, say: sayZ(seq.map((x) => numHz(x).hz).join('，')), tiles: seq.map((x) => ({ hz: numHz(x).hz, py: numHz(x).py })), joiner: ' ' };
  },
};

// =====================================================================
// c7-c12 vocabulary units (shared generator)
// =====================================================================
const c7 = vocabUnit('c7', '🌿', { fr: 'La nature · 大自然', en: 'Nature · 大自然' }, 'Chinois — caractères : la nature (1re année, programme chinois)', W7);
const c8 = vocabUnit('c8', '🧍', { fr: 'Le corps · 身体', en: 'The body · 身体' }, 'Chinois — caractères : le corps (1re année, programme chinois)', W8);
const c9 = vocabUnit('c9', '👨‍👩‍👧', { fr: 'La famille · 家人', en: 'Family · 家人' }, 'Chinois — caractères : la famille et les pronoms (1re année, programme chinois)', W9);
const c10 = vocabUnit('c10', '🐾', { fr: 'Les animaux · 动物', en: 'Animals · 动物' }, 'Chinois — caractères : les animaux (1re année, programme chinois)', W10);
const c11 = vocabUnit('c11', '🎨', { fr: 'Couleurs et directions · 颜色与方位', en: 'Colours & directions · 颜色与方位' }, 'Chinois — caractères : couleurs, directions, tailles (1re année, programme chinois)', W11);
const c12 = vocabUnit('c12', '🏫', { fr: 'École et vie quotidienne · 学校和生活', en: 'School & daily life · 学校和生活' }, 'Chinois — caractères : l’école et la maison (1re année, programme chinois)', W12);

// =====================================================================
// c13 组词
// =====================================================================
const W13 = rows([
  ['大人', 'dà rén', '🧑', 'adulte', 'adult'], ['小鸟', 'xiǎo niǎo', '🐦', 'petit oiseau', 'little bird'], ['小鱼', 'xiǎo yú', '🐟', 'petit poisson', 'little fish'],
  ['大山', 'dà shān', '⛰️', 'grande montagne', 'big mountain'], ['火山', 'huǒ shān', '🌋', 'volcan', 'volcano'], ['山水', 'shān shuǐ', '🏞️', 'paysage de montagnes et d’eau', 'mountains and water, scenery'],
  ['花草', 'huā cǎo', '🌼', 'fleurs et herbe', 'flowers and grass'], ['大树', 'dà shù', '🌳', 'grand arbre', 'big tree'], ['小草', 'xiǎo cǎo', '🌱', 'petite herbe', 'little grass'],
  ['白云', 'bái yún', '☁️', 'nuage blanc', 'white cloud'], ['红花', 'hóng huā', '🌹', 'fleur rouge', 'red flower'], ['下雨', 'xià yǔ', '🌧️', 'il pleut', 'it rains'],
  ['土地', 'tǔ dì', '', 'terre, terrain', 'land'], ['石头', 'shí tou', '🪨', 'pierre', 'stone'], ['木头', 'mù tou', '🪵', 'bois', 'wood'],
  ['口水', 'kǒu shuǐ', '', 'salive', 'saliva'], ['手心', 'shǒu xīn', '', 'paume de la main', 'palm of the hand'], ['人口', 'rén kǒu', '', 'population', 'population'],
  ['门口', 'mén kǒu', '', 'devant la porte', 'doorway'], ['书本', 'shū běn', '📚', 'livres', 'books'], ['车门', 'chē mén', '', 'portière', 'car door'],
  ['米饭', 'mǐ fàn', '🍚', 'riz cuit', 'cooked rice'], ['上学', 'shàng xué', '🎒', 'aller à l’école', 'go to school'], ['学生', 'xué sheng', '🧑‍🎓', 'élève', 'student'],
  ['老师', 'lǎo shī', '👩‍🏫', 'professeur', 'teacher'], ['回家', 'huí jiā', '🏠', 'rentrer à la maison', 'go home'], ['大家', 'dà jiā', '', 'tout le monde', 'everyone'],
  ['小马', 'xiǎo mǎ', '🐴', 'poney', 'pony'], ['小羊', 'xiǎo yáng', '🐑', 'agneau', 'lamb'], ['白兔', 'bái tù', '🐰', 'lapin blanc', 'white rabbit'],
  ['黑猫', 'hēi māo', '🐈‍⬛', 'chat noir', 'black cat'], ['蓝天', 'lán tiān', '', 'ciel bleu', 'blue sky'], ['上下', 'shàng xià', '', 'en haut et en bas', 'up and down'],
  ['前后', 'qián hòu', '', 'devant et derrière', 'front and back'], ['多少', 'duō shǎo', '', 'combien', 'how many'], ['大小', 'dà xiǎo', '', 'la taille', 'size'],
  ['白天', 'bái tiān', '', 'la journée', 'daytime'], ['水火', 'shuǐ huǒ', '', 'l’eau et le feu', 'water and fire'], ['天地', 'tiān dì', '', 'le ciel et la terre', 'heaven and earth'],
  ['日出', 'rì chū', '🌅', 'lever du soleil', 'sunrise'], ['绿草', 'lǜ cǎo', '🌿', 'herbe verte', 'green grass'], ['小狗', 'xiǎo gǒu', '🐶', 'petit chien', 'puppy'],
  ['小猫', 'xiǎo māo', '🐱', 'petit chat', 'kitten'], ['小鸡', 'xiǎo jī', '🐤', 'poussin', 'chick'], ['小鸭', 'xiǎo yā', '🦆', 'caneton', 'duckling'],
  ['火车', 'huǒ chē', '🚂', 'train', 'train'], ['汽车', 'qì chē', '🚗', 'auto', 'car'], ['左手', 'zuǒ shǒu', '', 'main gauche', 'left hand'],
]);
const WSET = new Set(W13.map((w) => w.hz));
const W13E = W13.filter((w) => w.e);
const W13PY = (w) => w.py.split(' ');
const w13others = (R, w, n, o = {}) => {
  const c = R.shuffle(W13.filter((x) => x.hz !== w.hz && x.py !== w.py && x.fr !== w.fr && (!o.e || (x.e && x.e !== w.e)) && (!o.not || ![...x.hz].includes(o.not))));
  return c.slice(0, n);
};
const ow = (w, L) => (L === 1 ? { hz: w.hz, py: w.py, emoji: w.e } : L === 2 ? { hz: w.hz, py: w.py } : { hz: w.hz });
const c13 = {
  id: 'c13', icon: '🧱', title: { fr: 'Former des mots · 组词', en: 'Building words · 组词' },
  pfeq: 'Chinois —组词 : assembler des caractères en mots (1re année, programme chinois)',
  generate(L, R) {
    const types = L === 1 ? ['charWord', 'wordPic', 'hearWord', 'missing'] : L === 2 ? ['charWord', 'missing', 'hearWord', 'wordMean', 'wordPic'] : ['charWord', 'missing', 'hearWord', 'wordMean', 'meanWord'];
    const t = R.pick(types);
    const w = R.pick(t === 'wordPic' || L === 1 ? W13E : W13);
    const chars = [...w.hz], py = W13PY(w);
    if (t === 'charWord') {
      const i = R.int(0, 1), ch = chars[i];
      const pool = R.shuffle(W13.filter((x) => !x.hz.includes(ch) && x.hz !== w.hz && (L > 1 || x.e)));
      const d = pool.slice(0, nd(L));
      return mc(`cw:${w.hz}:${ch}`, { fr: 'Quel mot contient ce caractère?', en: 'Which word contains this character?' }, ow(w, L), d.map((x) => ow(x, L)), { say: sayZ(ch), stimulus: { hz: ch, ...(PYM[ch] && L < 3 ? { py: PYM[ch] } : {}) } });
    }
    if (t === 'wordPic') {
      const d = w13others(R, w, nd(L), { e: true });
      return mc(`wp:${w.hz}`, { fr: 'Quelle image va avec ce mot?', en: 'Which picture goes with this word?' }, { emoji: w.e }, d.map((x) => ({ emoji: x.e })), { say: sayZ(w.hz), stimulus: { hz: w.hz, py: w.py } });
    }
    if (t === 'hearWord') {
      let d;
      if (L === 3) { // swap one character for a look-alike: a non-word that does not sound the same
        const cands = [];
        chars.forEach((c, i) => { const g = LKG.find((x) => x.includes(c)); if (g) for (const o of g) if (o !== c && PYM[o] && PYM[o] !== PYM[c]) { const s = chars.slice(); s[i] = o; const hz = s.join(''); if (!WSET.has(hz)) cands.push(hz); } });
        const real = w13others(R, w, 3).map((x) => x.hz);
        d = uniqStr([...take(R, cands, 2), ...real]).slice(0, 3).map((hz) => ({ hz }));
      } else d = w13others(R, w, nd(L), { e: L === 1 }).map((x) => ow(x, L));
      return mc(`hw:${w.hz}`, { fr: 'Écoute. Touche le bon mot.', en: 'Listen. Tap the right word.' }, ow(w, L), d.map((x) => (x.hz ? (x.py || x.emoji || L < 3 ? x : { hz: x.hz }) : x)), { say: sayZ(w.hz) });
    }
    if (t === 'wordMean') {
      const d = w13others(R, w, 3);
      return mc(`wm:${w.hz}`, { fr: 'Que veut dire ce mot?', en: 'What does this word mean?' }, { text: { fr: w.fr, en: w.en } }, d.map((x) => ({ text: { fr: x.fr, en: x.en } })), { say: sayZ(w.hz), stimulus: { hz: w.hz, py: w.py } });
    }
    if (t === 'meanWord') {
      const d = w13others(R, w, 3);
      return mc(`mw:${w.hz}`, { fr: `Touche le mot qui veut dire « ${w.fr} ».`, en: `Tap the word that means “${w.en}”.` }, { hz: w.hz }, d.map((x) => ({ hz: x.hz })));
    }
    // missing character
    const pos = R.int(0, 1), miss = chars[pos], keep = chars[1 - pos];
    const stimHz = pos === 0 ? '＿' + keep : keep + '＿';
    const missPy = py[pos], keepPy = py[1 - pos];
    // wrong characters: not forming any known word, never the same sound for the missing slot when audio helps
    let pool;
    if (L === 3) {
      const g = LKG.find((x) => x.includes(miss)) || [];
      pool = g.filter((c) => c !== miss && PYM[c]);
    } else pool = [];
    const allChars = uniqStr(W13.flatMap((x) => [...x.hz])).filter((c) => c !== miss && c !== keep && PYM[c]);
    pool = uniqStr([...R.shuffle(pool), ...R.shuffle(allChars)]).filter((c) => !WSET.has(pos === 0 ? c + keep : keep + c) && c !== miss);
    const d = pool.slice(0, nd(L));
    const o = (c, p) => (L < 3 ? { hz: c, py: p } : { hz: c });
    return mc(`ms:${w.hz}:${pos}`, { fr: `Écoute. Il manque un caractère : « ${w.fr} ».`, en: `Listen. One character is missing: “${w.en}”.` }, o(miss, missPy), d.map((c) => o(c, PYM[c])), { say: sayZ(w.hz), stimulus: { hz: stimHz, py: keepPy } });
  },
};

// =====================================================================
// c14 反义词和量词
// =====================================================================
const ANT = [
  ['大', 'dà', '小', 'xiǎo'], ['上', 'shàng', '下', 'xià'], ['多', 'duō', '少', 'shǎo'], ['左', 'zuǒ', '右', 'yòu'], ['前', 'qián', '后', 'hòu'],
  ['黑', 'hēi', '白', 'bái'], ['高', 'gāo', '低', 'dī'], ['冷', 'lěng', '热', 'rè'], ['快', 'kuài', '慢', 'màn'], ['早', 'zǎo', '晚', 'wǎn'],
  ['好', 'hǎo', '坏', 'huài'], ['新', 'xīn', '旧', 'jiù'], ['来', 'lái', '去', 'qù'], ['出', 'chū', '入', 'rù'], ['开', 'kāi', '关', 'guān'],
  ['天', 'tiān', '地', 'dì'], ['水', 'shuǐ', '火', 'huǒ'], ['男', 'nán', '女', 'nǚ'], ['远', 'yuǎn', '近', 'jìn'], ['哭', 'kū', '笑', 'xiào'],
];
const OPP = {};
const ACH = []; // every antonym character as {hz, py}
for (const [a, pa, b, pb] of ANT) { OPP[a] = b; OPP[b] = a; ACH.push({ hz: a, py: pa }, { hz: b, py: pb }); }
for (const c of ACH) if (!PYM[c.hz]) PYM[c.hz] = c.py;
const MW = [
  ['鸟', 'niǎo', '🐦', '只', 'zhī'], ['鱼', 'yú', '🐟', '条', 'tiáo'], ['书', 'shū', '📖', '本', 'běn'], ['人', 'rén', '🧑', '个', 'gè'],
  ['马', 'mǎ', '🐴', '匹', 'pǐ'], ['牛', 'niú', '🐮', '头', 'tóu'], ['猫', 'māo', '🐱', '只', 'zhī'], ['兔子', 'tù zi', '🐰', '只', 'zhī'],
  ['鸡', 'jī', '🐔', '只', 'zhī'], ['鸭', 'yā', '🦆', '只', 'zhī'], ['花', 'huā', '🌸', '朵', 'duǒ'], ['云', 'yún', '☁️', '朵', 'duǒ'],
  ['树', 'shù', '🌳', '棵', 'kē'], ['车', 'chē', '🚗', '辆', 'liàng'], ['伞', 'sǎn', '☂️', '把', 'bǎ'], ['笔', 'bǐ', '🖊️', '支', 'zhī'],
  ['山', 'shān', '⛰️', '座', 'zuò'], ['水', 'shuǐ', '💧', '杯', 'bēi'], ['饭', 'fàn', '🍚', '碗', 'wǎn'], ['门', 'mén', '🚪', '扇', 'shàn'],
  ['衣', 'yī', '👕', '件', 'jiàn'], ['星', 'xīng', '⭐', '颗', 'kē'], ['苹果', 'píng guǒ', '🍎', '个', 'gè'],
].map(([n, np, e, m, mp]) => ({ n, np, e, m, mp }));
const MWS = uniqStr(MW.map((x) => x.m)).map((m) => ({ m, mp: MW.find((x) => x.m === m).mp }));
const mwWrong = (R, x, k) => take(R, MWS.filter((s) => s.m !== x.m && s.mp !== x.mp && s.m !== '个'), k);
const oppWrong = (R, hz, L, k) => {
  const partner = OPP[hz];
  let pool = ACH.filter((c) => c.hz !== hz && c.hz !== partner);
  const picked = [];
  if (L === 3) { // look-alikes of the right answer
    const g = LKG.find((x) => x.includes(partner)) || [];
    for (const c of g) if (c !== partner && c !== hz && PYM[c]) picked.push({ hz: c, py: PYM[c] });
  }
  const rest = R.shuffle(pool.filter((c) => !picked.some((p) => p.hz === c.hz)));
  return uniqStr([...take(R, picked, 2).map((p) => p.hz), ...rest.map((c) => c.hz)]).slice(0, k).map((h) => ({ hz: h, py: PYM[h] }));
};
const c14 = {
  id: 'c14', icon: '⚖️', title: { fr: 'Contraires et mots de mesure · 反义词和量词', en: 'Opposites & measure words · 反义词和量词' },
  pfeq: 'Chinois — contraires et classificateurs (1re année, programme chinois)',
  generate(L, R) {
    const types = L === 1 ? ['oppPick', 'hearOpp', 'mwFill', 'mwPic'] : L === 2 ? ['oppPick', 'hearOpp', 'mwFill', 'mwPic', 'oppPair'] : ['oppPick', 'hearOpp', 'mwFill', 'oppPair', 'mwOrder'];
    const t = R.pick(types);
    if (t === 'oppPick' || t === 'hearOpp') {
      const c = R.pick(ACH);
      const wrong = oppWrong(R, c.hz, L, nd(L));
      const o = (h) => ({ hz: h.hz, ...(L < 3 ? { py: h.py } : {}) });
      const right = { hz: OPP[c.hz], py: PYM[OPP[c.hz]] };
      if (t === 'oppPick') return mc(`op:${c.hz}`, { fr: 'Quel est le contraire de ce mot?', en: 'What is the opposite of this word?' }, o(right), wrong.map(o), { say: sayZ(c.hz), stimulus: { hz: c.hz, py: c.py } });
      return mc(`ho:${c.hz}`, { fr: 'Écoute. Quel est le contraire?', en: 'Listen. What is the opposite?' }, o(right), wrong.map(o), { say: sayZ(c.hz) });
    }
    if (t === 'oppPair') {
      const [a, pa, b, pb] = R.pick(ANT);
      const [flip] = [R.chance(0.5)];
      const right = flip ? { hz: b + a, py: pb + ' ' + pa } : { hz: a + b, py: pa + ' ' + pb };
      const wrong = [], seen = new Set([right.hz]);
      for (let k = 0; k < 60 && wrong.length < nd(L); k++) {
        const x = R.pick(ACH), y = R.pick(ACH);
        if (x.hz === y.hz || OPP[x.hz] === y.hz || seen.has(x.hz + y.hz)) continue;
        seen.add(x.hz + y.hz); wrong.push({ hz: x.hz + y.hz, py: x.py + ' ' + y.py });
      }
      const o = (z) => (L === 3 ? { hz: z.hz, py: z.py } : { hz: z.hz, py: z.py });
      return mc(`pr:${a}${b}`, { fr: 'Quelle paire est faite de deux contraires?', en: 'Which pair is made of two opposites?' }, o(right), wrong.map(o), { say: sayZ(right.hz) });
    }
    const x = R.pick(MW);
    if (t === 'mwFill') {
      const wrong = mwWrong(R, x, nd(L));
      const o = (z) => (L < 3 ? { hz: z.m, py: z.mp } : { hz: z.m });
      return mc(`mf:${x.n}`, { fr: 'Complète : quel mot de mesure va ici?', en: 'Fill in: which measure word goes here?' }, o({ m: x.m, mp: x.mp }), wrong.map(o), { say: sayZ(L === 1 ? '一' + x.m + x.n : x.n), stimulus: { hz: '一＿' + x.n, py: 'yī ' + x.np }, ...(L === 1 ? {} : {}) });
    }
    if (t === 'mwPic') {
      const y = R.pick(MW.filter((z) => z.m !== '个'));
      const d = take(R, MW.filter((z) => z.m !== y.m && z.e !== y.e), nd(L));
      return mc(`mp:${y.n}`, { fr: 'Quelle image va avec ce mot de mesure?', en: 'Which picture goes with this measure word?' }, { emoji: y.e }, d.map((z) => ({ emoji: z.e })), { say: sayZ('一' + y.m), stimulus: { hz: '一' + y.m, py: 'yī ' + y.mp } });
    }
    // mwOrder
    const other = R.pick(MWS.filter((s) => s.m !== x.m && s.m !== '个'));
    return { type: 'order', key: `mo:${x.n}`, prompt: { fr: 'Écoute. Remets les mots dans l’ordre.', en: 'Listen. Put the words in order.' }, say: sayZ('一' + x.m + x.n), tiles: [{ hz: '一', py: 'yī' }, { hz: x.m, py: x.mp }, { hz: x.n, py: x.np }], extra: [{ hz: other.m, py: other.mp }], joiner: '' };
  },
};

export const units = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14];
