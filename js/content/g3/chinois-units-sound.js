// g3c11 radicals 偏旁部首, g3c12 look-alikes 形近字, g3c13 polyphones 多音字 (light).
import { CHAR, WORDS } from './chinois-vocab.js';
import { say, T, H, HC, mc, take, uniq, pyWrong, finish, parse, hanLen } from './chinois-lib.js';

/* ======================= g3c11 — radicals ======================= */
// radical|name|fr|en|chars (char py,…)
const RAD_TXT = `
氵|sān diǎn shuǐ|l’eau, les liquides|water, liquids|河 hé,海 hǎi,湖 hú,洗 xǐ,汗 hàn,池 chí,洋 yáng,泥 ní,沙 shā,浪 làng,游 yóu,汤 tāng,流 liú
木|mù zì páng|les arbres, le bois|trees, wood|树 shù,林 lín,桥 qiáo,桌 zhuō,板 bǎn,村 cūn,松 sōng,根 gēn,梨 lí,桃 táo,枝 zhī,椅 yǐ
口|kǒu zì páng|la bouche, la voix|mouth, voice|吃 chī,叫 jiào,听 tīng,吹 chuī,唱 chàng,吗 ma,喝 hē,吵 chǎo,喊 hǎn
扌|tí shǒu páng|la main, les gestes|hand, actions of the hand|打 dǎ,拉 lā,推 tuī,找 zhǎo,提 tí,拍 pāi,抱 bào,拿 ná,摸 mō,接 jiē,摘 zhāi,扔 rēng
亻|dān rén páng|les personnes|people|休 xiū,你 nǐ,他 tā,们 men,住 zhù,作 zuò,做 zuò,体 tǐ,件 jiàn,借 jiè
女|nǚ zì páng|les femmes, la famille|women, family|妈 mā,姐 jiě,妹 mèi,好 hǎo,奶 nǎi,姑 gū,婆 pó,她 tā
讠|yán zì páng|la parole, parler|speech, speaking|说 shuō,话 huà,读 dú,请 qǐng,谢 xiè,认 rèn,讲 jiǎng,语 yǔ,诗 shī
艹|cǎo zì tóu|l’herbe, les plantes|grass, plants|花 huā,草 cǎo,苹 píng,菜 cài,药 yào,苗 miáo,荷 hé,芽 yá,萝 luó
日|rì zì páng|le soleil, le temps|sun, time|明 míng,晴 qíng,时 shí,晚 wǎn,早 zǎo,星 xīng,昨 zuó,春 chūn
火|huǒ zì páng|le feu, la chaleur|fire, heat|灯 dēng,炒 chǎo,烤 kǎo,烟 yān,灰 huī,烧 shāo
足|zú zì páng|les pieds, les pas|foot, steps|跑 pǎo,跳 tiào,路 lù,踢 tī,跟 gēn,蹲 dūn
饣|shí zì páng|la nourriture|food|饭 fàn,饺 jiǎo,饱 bǎo,饿 è,饼 bǐng,饮 yǐn,馆 guǎn
钅|jīn zì páng|le métal|metal|钟 zhōng,钱 qián,铁 tiě,银 yín,针 zhēn,铃 líng
纟|jiǎo sī páng|le fil, la soie, les couleurs|thread, silk, colours|红 hóng,绿 lǜ,细 xì,线 xiàn,纸 zhǐ,给 gěi,练 liàn,级 jí
忄|shù xīn páng|le cœur, les sentiments|heart, feelings|快 kuài,忙 máng,怕 pà,忘 wàng,惊 jīng,情 qíng,懂 dǒng,慢 màn
目|mù zì páng|les yeux, voir|eyes, seeing|看 kàn,眼 yǎn,睡 shuì,睛 jīng,眉 méi,盼 pàn
雨|yǔ zì tóu|la pluie, la météo|rain, weather|雪 xuě,雷 léi,雾 wù,露 lù,雹 báo
虫|chóng zì páng|les insectes, petites bêtes|insects, small creatures|蚂 mǎ,蚁 yǐ,蚊 wén,蜂 fēng,蝴 hú,蝶 dié,蜘 zhī,蛛 zhū,蛇 shé
`;
const RADS = RAD_TXT.trim().split('\n').map((l) => {
  const [r, name, fr, en, cs] = l.split('|');
  const chars = cs.split(',').map((x) => { const [h, p] = x.trim().split(' '); return { hz: h, py: p, rad: r }; });
  return { r, name, fr, en, chars };
});
const ALLRC = RADS.flatMap((x) => x.chars);
{
  const s = new Set();
  for (const c of ALLRC) { if (s.has(c.hz)) throw new Error('dup radical char ' + c.hz); s.add(c.hz); }
}
// what each radical is about, and its name (三点水…), in Chinese with pinyin
const RAD_ZH = {
  '氵': [H('和水有关', 'hé shuǐ yǒu guān'), '三点水'], '木': [H('和树木有关', 'hé shù mù yǒu guān'), '木字旁'], '口': [H('和嘴巴有关', 'hé zuǐ ba yǒu guān'), '口字旁'], '扌': [H('和手的动作有关', 'hé shǒu de dòng zuò yǒu guān'), '提手旁'],
  '亻': [H('和人有关', 'hé rén yǒu guān'), '单人旁'], '女': [H('和女孩子、女人有关', 'hé nǚ hái zi nǚ rén yǒu guān'), '女字旁'], '讠': [H('和说话有关', 'hé shuō huà yǒu guān'), '言字旁'], '艹': [H('和花草有关', 'hé huā cǎo yǒu guān'), '草字头'],
  '日': [H('和太阳、时间有关', 'hé tài yáng shí jiān yǒu guān'), '日字旁'], '火': [H('和火、热有关', 'hé huǒ rè yǒu guān'), '火字旁'], '足': [H('和脚、走路有关', 'hé jiǎo zǒu lù yǒu guān'), '足字旁'], '饣': [H('和吃的东西有关', 'hé chī de dōng xi yǒu guān'), '食字旁'],
  '钅': [H('和金属有关', 'hé jīn shǔ yǒu guān'), '金字旁'], '纟': [H('和丝线有关', 'hé sī xiàn yǒu guān'), '绞丝旁'], '忄': [H('和心情有关', 'hé xīn qíng yǒu guān'), '竖心旁'], '目': [H('和眼睛有关', 'hé yǎn jing yǒu guān'), '目字旁'],
  '雨': [H('和下雨、天气有关', 'hé xià yǔ tiān qì yǒu guān'), '雨字头'], '虫': [H('和小虫子有关', 'hé xiǎo chóng zi yǒu guān'), '虫字旁'],
};
for (const x of RADS) { const z = RAD_ZH[x.r]; if (!z || hanLen(z[1]) !== x.name.split(' ').length) throw new Error('radical zh ' + x.r); x.zh = z[0]; x.nameZh = { hz: z[1], py: x.name }; }
const RADMAP = Object.fromEntries(RADS.map((x) => [x.r, x]));
const RAD_OTHER = ['冫', '禾', '刂', '宀', '辶', '竹'];
const rOpt = (r) => ({ hz: r });
const cOpt = (c, py = true) => (py ? { hz: c.hz, py: c.py, say: say(c.hz) } : { hz: c.hz, say: say(c.hz) });
const list = (a) => a.flatMap((c, i) => (i ? ['、', c] : [c]));
const radTip = (x) => HC(x.nameZh, H('：'), x.zh, H('，比如', 'bǐ rú'), ...list(x.chars.slice(0, 5).map((c) => ({ hz: c.hz, py: c.py }))), '。');
const RQ = {
  whichRad(R, c, L) {
    const right = RADMAP[c.rad];
    const pool = RADS.filter((x) => x !== right);
    const near = { '氵': ['冫'], '亻': ['讠'], '讠': ['亻'], '扌': ['木'], '木': ['扌', '禾'], '艹': ['竹'], '日': ['目'], '目': ['日'], '纟': ['钅'], '钅': ['纟'] }[c.rad] || [];
    const wr = [...near.slice(0, L === 3 ? 1 : 0).map((r) => rOpt(r)), ...take(R, pool, 4).map((x) => rOpt(x.r))];
    return mc(`wr-${c.hz}`, H('这个字的偏旁是哪一个？', 'zhè gè zì de piān páng shì nǎ yí gè'), rOpt(right.r), wr.slice(0, nW(L)), { stimulus: { hz: c.hz, py: c.py }, say: say(c.hz), cols: 3, tip: radTip(right) });
  },
  radMeaning(R, x, L) {
    const wr = take(R, RADS.filter((y) => y !== x), nW(L));
    return mc(`rm-${x.r}`, H('这个偏旁和什么有关？', 'zhè gè piān páng hé shén me yǒu guān'), { ...x.zh }, wr.map((y) => ({ ...y.zh })), { stimulus: { hz: x.r }, tip: radTip(x) });
  },
  hasRad(R, x, L) {
    const c = R.pick(x.chars);
    const wr = take(R, ALLRC.filter((y) => y.rad !== x.r), nW(L));
    return mc(`hr-${x.r}-${c.hz}`, H('哪个字有这个偏旁？', 'nǎ gè zì yǒu zhè gè piān páng'), cOpt(c, L < 3), wr.map((y) => cOpt(y, L < 3)), { stimulus: { hz: x.r }, say: say(c.hz), cols: 2, tip: radTip(x) });
  },
  guess(R, x, L) {
    const c = R.pick(x.chars);
    const wr = take(R, ALLRC.filter((y) => y.rad !== x.r), nW(L));
    return mc(`gs-${x.r}-${c.hz}`, HC(H('猜一猜：哪个字', 'cāi yì cāi nǎ gè zì'), x.zh, '？'), cOpt(c, L < 3), wr.map((y) => cOpt(y, L < 3)), { say: say(c.hz), cols: 2, tip: radTip(x) });
  },
  sort(R, L) {
    const k = L === 3 ? 3 : 2;
    const rs = R.sample(RADS, k);
    const per = L === 1 ? 2 : 2;
    const items = R.shuffle(rs.flatMap((x, bin) => take(R, x.chars, per).map((c) => ({ hz: c.hz, py: c.py, bin }))));
    return { type: 'sort', key: `so-${rs.map((x) => x.r).join('')}-${items.map((i) => i.hz).sort().join('')}`, prompt: H('分一分：把每个字放进它的偏旁盒子里。', 'fēn yì fēn bǎ měi gè zì fàng jìn tā de piān páng hé zi lǐ'), bins: rs.map((x) => ({ hz: x.r })), items, tip: HC(...rs.flatMap((x, i) => [...(i ? ['；'] : []), x.nameZh, H('：'), x.zh]), '。') };
  },
};
const nW = (L) => (L === 1 ? 2 : 3);
const g3c11 = finish({
  id: 'g3c11', icon: '🧱', title: { ...T('Les radicaux 偏旁部首', 'Radicals 偏旁部首'), zh: H('偏旁部首', 'piān páng bù shǒu') },
  pfeq: 'Chinois — caractères : les radicaux et leur sens (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const x = R.pick(RADS), c = R.pick(x.chars);
    if (lvl === 1) return R.pick([() => RQ.whichRad(R, c, 1), () => RQ.radMeaning(R, x, 1), () => RQ.guess(R, x, 1)])();
    if (lvl === 2) return R.pick([() => RQ.whichRad(R, c, 2), () => RQ.hasRad(R, x, 2), () => RQ.guess(R, x, 2), () => RQ.radMeaning(R, x, 2), () => RQ.sort(R, 2)])();
    return R.pick([() => RQ.whichRad(R, c, 3), () => RQ.whichRad(R, c, 3), () => RQ.hasRad(R, x, 3), () => RQ.guess(R, x, 3), () => RQ.sort(R, 3)])();
  },
  allSay() { return ALLRC.map((c) => say(c.hz)); },
});

/* ======================= g3c12 — look-alikes ======================= */
// char|py|word|word py|fr hint|en hint  — groups separated by blank lines
const LA_TXT = `
日|rì|日出|rì chū|le lever du soleil|sunrise
目|mù|题目|tí mù|le sujet d’un exercice|the topic of an exercise
自|zì|自己|zì jǐ|soi-même|oneself
白|bái|白云|bái yún|un nuage blanc|a white cloud
百|bǎi|一百|yì bǎi|cent|one hundred

人|rén|人口|rén kǒu|le nombre d’habitants|population
入|rù|入口|rù kǒu|l’entrée|entrance
八|bā|八月|bā yuè|le mois d’août|August

大|dà|大山|dà shān|une grande montagne|a big mountain
太|tài|太阳|tài yáng|le soleil|the sun
犬|quǎn|警犬|jǐng quǎn|un chien policier|a police dog
天|tiān|天空|tiān kōng|le ciel|the sky

请|qǐng|请坐|qǐng zuò|« Asseyez-vous, s’il vous plaît »|please sit
清|qīng|清水|qīng shuǐ|de l’eau claire|clear water
晴|qíng|晴天|qíng tiān|un jour de beau temps|a sunny day
情|qíng|心情|xīn qíng|l’humeur|mood
睛|jīng|眼睛|yǎn jing|les yeux|eyes
青|qīng|青草|qīng cǎo|l’herbe verte|green grass

休|xiū|休息|xiū xi|se reposer|to rest
体|tǐ|身体|shēn tǐ|le corps|body

千|qiān|千万|qiān wàn|dix millions, absolument|ten million
干|gān|干净|gān jìng|propre|clean
于|yú|于是|yú shì|alors, c’est pourquoi|so, therefore

未|wèi|未来|wèi lái|l’avenir|future
末|mò|周末|zhōu mò|la fin de semaine|weekend
木|mù|树木|shù mù|les arbres|trees
本|běn|课本|kè běn|le manuel|textbook

午|wǔ|中午|zhōng wǔ|midi|noon
牛|niú|牛奶|niú nǎi|le lait de vache|cow’s milk

买|mǎi|买菜|mǎi cài|acheter des légumes|to buy vegetables
卖|mài|卖菜|mài cài|vendre des légumes|to sell vegetables

问|wèn|问题|wèn tí|une question|a question
间|jiān|中间|zhōng jiān|le milieu|middle
闻|wén|新闻|xīn wén|les nouvelles|news
闭|bì|闭眼|bì yǎn|fermer les yeux|to close the eyes
闪|shǎn|闪电|shǎn diàn|l’éclair|lightning

河|hé|河水|hé shuǐ|l’eau de la rivière|river water
可|kě|可爱|kě ài|mignon|cute
何|hé|如何|rú hé|comment|how

力|lì|力气|lì qi|la force|strength
刀|dāo|小刀|xiǎo dāo|un petit couteau|a small knife

田|tián|田野|tián yě|les champs|fields
由|yóu|自由|zì yóu|la liberté|freedom
甲|jiǎ|甲虫|jiǎ chóng|un scarabée|a beetle
申|shēn|申请|shēn qǐng|faire une demande|to apply

见|jiàn|见面|jiàn miàn|se rencontrer|to meet
贝|bèi|贝壳|bèi ké|un coquillage|a seashell

住|zhù|住在|zhù zài|habiter à|to live at
主|zhǔ|主人|zhǔ rén|le maître, l’hôte|host, owner
往|wǎng|往前|wǎng qián|vers l’avant|forward

玩|wán|玩具|wán jù|un jouet|a toy
完|wán|完成|wán chéng|terminer|to finish

己|jǐ|自己|zì jǐ|soi-même|oneself
已|yǐ|已经|yǐ jīng|déjà|already

在|zài|现在|xiàn zài|maintenant|now
再|zài|再见|zài jiàn|au revoir|goodbye

找|zhǎo|找人|zhǎo rén|chercher quelqu’un|to look for someone
我|wǒ|我们|wǒ men|nous|we

组|zǔ|小组|xiǎo zǔ|un petit groupe|a small group
租|zū|租房|zū fáng|louer une maison|to rent a flat

她|tā|她们|tā men|elles (des filles)|they (girls)
他|tā|他们|tā men|ils (des garçons)|they (boys)
它|tā|它们|tā men|ils (des animaux, des choses)|they (animals, things)
`;
const LA = LA_TXT.trim().split(/\n\s*\n/).map((g, gi) => g.trim().split('\n').map((l, i) => {
  const [h, p, w, wp, fr, en] = l.split('|').map((s) => s.trim());
  if (hanLen(w) !== wp.split(/\s+/).length) throw new Error('look-alike word py ' + w);
  if (!w.includes(h)) throw new Error('look-alike word lacks char ' + w);
  return { hz: h, py: p, w, wp, fr, en, g: gi };
}));
const LAE = LA.flat();
const laBlank = (e) => { const hzs = [...e.w]; hzs[hzs.indexOf(e.hz)] = '＿'; const sy = e.wp.split(' '); const pos = [...e.w].slice(0, [...e.w].indexOf(e.hz)).length; sy.splice(pos, 1); return { hz: hzs.join(''), py: sy.join(' ') }; };
const laTip = (g) => HC(H('别弄混：', 'bié nòng hùn'), ...g.flatMap((x, i) => [...(i ? ['；'] : []), { hz: x.hz, py: x.py }, '（', { hz: x.w, py: x.wp }, '）']), '。');
const g3c12 = finish({
  id: 'g3c12', icon: '🔍', title: { ...T('Les caractères qui se ressemblent 形近字', 'Look-alike characters 形近字'), zh: H('形近字', 'xíng jìn zì') },
  pfeq: 'Chinois — caractères : distinguer les caractères de forme proche (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const e = R.pick(LAE), grp = LA[e.g];
    const sib = grp.filter((x) => x.hz !== e.hz);
    const extra = take(R, LAE.filter((x) => x.g !== e.g), 4).map((x) => x);
    const n = lvl === 1 ? 2 : 3;
    const wr = [...R.shuffle(sib), ...extra].slice(0, n);
    const opt = (x) => (lvl === 1 ? { hz: x.hz, py: x.py } : { hz: x.hz });
    if (lvl === 3 && R.chance(0.4)) {
      // listen: which word (look-alike words side by side)?
      const ws = [...R.shuffle(sib).map((x) => x.w), ...take(R, LAE.filter((x) => x.g !== e.g), 3).map((x) => x.w)].filter((w) => w !== e.w).slice(0, 3);
      return mc(`la3w-${e.hz}-${e.w}`, H('听一听，你听到的是哪个词？', 'tīng yì tīng nǐ tīng dào de shì nǎ gè cí'), { hz: e.w }, ws.map((w) => ({ hz: w })), { say: say(e.w), cols: 2, tip: laTip(grp) });
    }
    return mc(`la${lvl}-${e.hz}-${e.w}`, H('听一听，哪个字可以填进词语里？', 'tīng yì tīng nǎ gè zì kě yǐ tián jìn cí yǔ lǐ'), opt(e), wr.map(opt), { stimulus: lvl === 3 ? { hz: laBlank(e).hz } : laBlank(e), say: say(e.w), cols: 2, tip: laTip(grp) });
  },
  allSay() { return LAE.map((e) => say(e.w)); },
});

/* ======================= g3c13 — polyphones ======================= */
// char|py1:word py;word py|meaning1 fr/en|py2:...|meaning2   — per line one char, two readings
const POLY_TXT = `
行|xíng:行走 xíng zǒu;行车 xíng chē|marcher, aller|walk, go|háng:银行 yín háng;一行字 yì háng zì|banque, rangée|bank, row
长|cháng:长江 cháng jiāng;很长 hěn cháng|long|long|zhǎng:长大 zhǎng dà;校长 xiào zhǎng|grandir, chef|to grow, head
乐|lè:快乐 kuài lè;乐园 lè yuán|joie|joy|yuè:音乐 yīn yuè;乐曲 yuè qǔ|musique|music
好|hǎo:好人 hǎo rén;好看 hǎo kàn|bon|good|hào:爱好 ài hào;好学 hào xué|aimer, passe-temps|to like, hobby
重|zhòng:重要 zhòng yào;很重 hěn zhòng|lourd, important|heavy, important|chóng:重新 chóng xīn;重来 chóng lái|de nouveau|again
都|dōu:都是 dōu shì;都来 dōu lái|tous, tout|all|dū:首都 shǒu dū;大都市 dà dū shì|capitale|capital
看|kàn:看见 kàn jiàn;看书 kàn shū|regarder|to look|kān:看家 kān jiā;看门 kān mén|garder|to guard
空|kōng:天空 tiān kōng;空中 kōng zhōng|ciel, vide|sky, empty|kòng:有空 yǒu kòng;空地 kòng dì|temps libre, espace vide|free time, empty space
数|shù:数学 shù xué;数字 shù zì|nombre|number|shǔ:数羊 shǔ yáng;数一数 shǔ yi shǔ|compter|to count
觉|jué:觉得 jué de;感觉 gǎn jué|sentir, penser|to feel|jiào:睡觉 shuì jiào;午觉 wǔ jiào|dormir, la sieste|sleep
种|zhǒng:种子 zhǒng zi;一种 yì zhǒng|graine, espèce|seed, kind|zhòng:种花 zhòng huā;种树 zhòng shù|planter|to plant
背|bèi:后背 hòu bèi;背后 bèi hòu|dos|back|bēi:背书包 bēi shū bāo;背包 bēi bāo|porter sur le dos|to carry on the back
发|fā:发现 fā xiàn;出发 chū fā|émettre, partir|to send out, depart|fà:头发 tóu fa;理发 lǐ fà|cheveux|hair
少|shǎo:很少 hěn shǎo;多少 duō shao|peu|few|shào:少年 shào nián;少先队 shào xiān duì|jeune|young
为|wéi:成为 chéng wéi;为难 wéi nán|devenir, faire|to become|wèi:因为 yīn wèi;为了 wèi le|à cause de, pour|because of, for
还|hái:还是 hái shi;还有 hái yǒu|encore, toujours|still|huán:还书 huán shū;还钱 huán qián|rendre|to return
了|le:太好了 tài hǎo le;下雨了 xià yǔ le|particule d’achèvement|completed action|liǎo:了不起 liǎo bu qǐ;看不了 kàn bu liǎo|pouvoir, terminer|to be able
着|zhe:看着 kàn zhe;坐着 zuò zhe|en train de|-ing|zháo:着急 zháo jí;着火 zháo huǒ|prendre (feu), s’inquiéter|to catch (fire), worry
得|de:跑得快 pǎo de kuài;说得好 shuō de hǎo|particule (résultat)|particle (result)|děi:我得走 wǒ děi zǒu;得去 děi qù|devoir|must
调|tiáo:调皮 tiáo pí;调料 tiáo liào|espiègle, assaisonner|naughty, to season|diào:声调 shēng diào;调查 diào chá|ton, enquêter|tone, to investigate
干|gān:干净 gān jìng;干了 gān le|sec, propre|dry, clean|gàn:干活 gàn huó;干什么 gàn shén me|faire, travailler|to do, work
应|yīng:应该 yīng gāi;应当 yīng dāng|devoir|should|yìng:回应 huí yìng;答应 dā ying|répondre|to respond
传|chuán:传说 chuán shuō;传来 chuán lái|transmettre|to pass on|zhuàn:传记 zhuàn jì;自传 zì zhuàn|biographie|biography
朝|zhāo:朝阳 zhāo yáng;朝气 zhāo qì|matin|morning|cháo:朝前 cháo qián;朝南 cháo nán|vers, face à|facing
假|jiǎ:真假 zhēn jiǎ;假话 jiǎ huà|faux|false|jià:放假 fàng jià;假期 jià qī|vacances|holiday
`;
const POLY = POLY_TXT.trim().split('\n').map((l) => {
  const [h, a, afr, aen, b, bfr, ben] = l.split('|');
  const rd = (x, fr, en) => { const [py, ws] = x.split(':'); return { py, fr, en, words: ws.split(';').map((w) => { const [wh, ...p] = w.trim().split(/\s+/); const wp = p.join(' '); if (hanLen(wh) !== wp.split(/\s+/).length) throw new Error('poly pinyin ' + wh + ' ' + wp); if (!wh.includes(h)) throw new Error('poly word ' + wh); return { hz: wh, py: wp }; }) }; };
  return { hz: h, rds: [rd(a, afr, aen), rd(b, bfr, ben)] };
});
const polyTip = (p) => HC({ hz: p.hz, py: p.rds[0].py }, H('读', 'dú'), ` ${p.rds[0].py}：`, ...list(p.rds[0].words), H('；也读', 'yě dú'), ` ${p.rds[1].py}：`, ...list(p.rds[1].words), '。');
const POLYE = POLY.flatMap((p) => p.rds.flatMap((rd, ri) => rd.words.map((w, wi) => ({ p, rd, ri, w, wi }))));
const g3c13 = finish({
  id: 'g3c13', icon: '🔀', title: { ...T('Un caractère, deux sons 多音字', 'One character, two sounds 多音字'), zh: H('多音字', 'duō yīn zì') },
  pfeq: 'Chinois — caractères : quelques caractères à deux lectures (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const e = R.pick(POLYE), other = e.p.rds[1 - e.ri];
    const key = `${e.p.hz}-${e.w.hz}`;
    if (lvl === 1 || (lvl === 2 && R.chance(0.5))) {
      const extra = take(R, [pyWrong(R, e.rd.py, 2)].flat(), lvl === 1 ? 0 : 1);
      return mc(`g3c13a-${key}`, H('听一听，这个词里的多音字怎么读？', 'tīng yì tīng zhè gè cí lǐ de duō yīn zì zěn me dú'), { py: e.rd.py }, [{ py: other.py }, ...extra.map((p) => ({ py: p }))].slice(0, lvl === 1 ? 1 : 2), { stimulus: { hz: e.w.hz }, say: say(e.w.hz), cols: 3, tip: polyTip(e.p) });
    }
    if (lvl === 2) {
      const right = e.w, wr = [...take(R, other.words, 2), ...take(R, POLYE.filter((x) => x.p !== e.p), 1).map((x) => x.w)];
      return mc(`g3c13b-${key}`, HC(H('在哪个词里，', 'zài nǎ gè cí lǐ'), { hz: e.p.hz, py: e.rd.py }, H('读', 'dú'), ` ${e.rd.py}？`), { hz: right.hz }, wr.map((w) => ({ hz: w.hz })), { stimulus: { hz: e.p.hz }, say: say(right.hz), cols: 2, tip: polyTip(e.p) });
    }
    // L3: pinyin of the whole word
    const swapped = e.w.py.split(' ');
    const idx = [...e.w.hz].filter((c) => /\p{Script=Han}/u.test(c)).indexOf(e.p.hz) >= 0 ? [...e.w.hz].indexOf(e.p.hz) : 0;
    swapped[idx] = other.py;
    const wr = [swapped.join(' '), ...pyWrong(R, e.w.py, 3)].filter((x) => x !== e.w.py);
    return mc(`g3c13c-${key}`, H('听一听，这个词的拼音哪个是对的？', 'tīng yì tīng zhè gè cí de pīn yīn nǎ gè shì duì de'), { py: e.w.py }, [...new Set(wr)].slice(0, 3).map((p) => ({ py: p })), { stimulus: { hz: e.w.hz }, say: say(e.w.hz), cols: 2, tip: polyTip(e.p) });
  },
  allSay() { return POLYE.map((e) => say(e.w.hz)); },
});

export const units = [g3c11, g3c12, g3c13];
export { RADS, LAE };
