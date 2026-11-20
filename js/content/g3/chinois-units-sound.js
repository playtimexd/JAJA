// g3c11 radicals 偏旁部首, g3c12 look-alikes 形近字, g3c13 polyphones 多音字 (light).
import { CHAR, WORDS } from './chinois-vocab.js';
import { say, T, mc, take, uniq, pyWrong, finish, parse, hanLen } from './chinois-lib.js';

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
const RADMAP = Object.fromEntries(RADS.map((x) => [x.r, x]));
const RAD_OTHER = ['冫', '禾', '刂', '宀', '辶', '竹'];
const rOpt = (r) => ({ hz: r });
const cOpt = (c, py = true) => (py ? { hz: c.hz, py: c.py, say: say(c.hz) } : { hz: c.hz, say: say(c.hz) });
const radTip = (x) => T(`${x.r} (${x.name}) = ${x.fr}. Exemples : ${x.chars.slice(0, 5).map((c) => c.hz).join(' ')}.`, `${x.r} (${x.name}) = ${x.en}. Examples: ${x.chars.slice(0, 5).map((c) => c.hz).join(' ')}.`);
const RQ = {
  whichRad(R, c, L) {
    const right = RADMAP[c.rad];
    const pool = RADS.filter((x) => x !== right);
    const near = { '氵': ['冫'], '亻': ['讠'], '讠': ['亻'], '扌': ['木'], '木': ['扌', '禾'], '艹': ['竹'], '日': ['目'], '目': ['日'], '纟': ['钅'], '钅': ['纟'] }[c.rad] || [];
    const wr = [...near.slice(0, L === 3 ? 1 : 0).map((r) => rOpt(r)), ...take(R, pool, 4).map((x) => rOpt(x.r))];
    return mc(`wr-${c.hz}`, T('Quel est le radical (偏旁) de ce caractère ?', 'Which radical (偏旁) does this character have?'), rOpt(right.r), wr.slice(0, nW(L)), { stimulus: { hz: c.hz, py: c.py }, say: say(c.hz), cols: 3, tip: radTip(right) });
  },
  radMeaning(R, x, L) {
    const wr = take(R, RADS.filter((y) => y !== x), nW(L));
    return mc(`rm-${x.r}`, T('Que veut dire ce radical ? (Il aide à deviner le sens.)', 'What does this radical hint at?'), { text: T(x.fr, x.en) }, wr.map((y) => ({ text: T(y.fr, y.en) })), { stimulus: { hz: x.r }, tip: radTip(x) });
  },
  hasRad(R, x, L) {
    const c = R.pick(x.chars);
    const wr = take(R, ALLRC.filter((y) => y.rad !== x.r), nW(L));
    return mc(`hr-${x.r}-${c.hz}`, T(`Quel caractère a le radical « ${x.r} » ?`, `Which character has the radical “${x.r}”?`), cOpt(c, L < 3), wr.map((y) => cOpt(y, L < 3)), { stimulus: { hz: x.r }, say: say(c.hz), cols: 2, tip: radTip(x) });
  },
  guess(R, x, L) {
    const c = R.pick(x.chars);
    const wr = take(R, ALLRC.filter((y) => y.rad !== x.r), nW(L));
    return mc(`gs-${x.r}-${c.hz}`, T(`Devine : quel caractère parle de « ${x.fr} » ?`, `Guess: which character is about “${x.en}”?`), cOpt(c, L < 3), wr.map((y) => cOpt(y, L < 3)), { say: say(c.hz), cols: 2, tip: radTip(x) });
  },
  sort(R, L) {
    const k = L === 3 ? 3 : 2;
    const rs = R.sample(RADS, k);
    const per = L === 1 ? 2 : 2;
    const items = R.shuffle(rs.flatMap((x, bin) => take(R, x.chars, per).map((c) => ({ hz: c.hz, py: c.py, bin }))));
    return { type: 'sort', key: `so-${rs.map((x) => x.r).join('')}-${items.map((i) => i.hz).sort().join('')}`, prompt: T('Range chaque caractère dans la boîte de son radical.', 'Put each character in the box of its radical.'), bins: rs.map((x) => ({ hz: x.r })), items, tip: T(rs.map((x) => `${x.r} = ${x.fr}`).join(' ; '), rs.map((x) => `${x.r} = ${x.en}`).join('; ')) };
  },
};
const nW = (L) => (L === 1 ? 2 : 3);
const g3c11 = finish({
  id: 'g3c11', icon: '🧱', title: T('Les radicaux 偏旁部首', 'Radicals 偏旁部首'),
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
const laTip = (g) => T(`À ne pas confondre : ${g.map((x) => `${x.hz} (${x.py}) ${x.w}`).join(' ; ')}.`, `Do not mix up: ${g.map((x) => `${x.hz} (${x.py}) ${x.w}`).join('; ')}.`);
const g3c12 = finish({
  id: 'g3c12', icon: '🔍', title: T('Les caractères qui se ressemblent 形近字', 'Look-alike characters 形近字'),
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
      // which word fits the meaning?
      const ws = [...R.shuffle(sib).map((x) => x.w), ...take(R, LAE.filter((x) => x.g !== e.g), 3).map((x) => x.w)].slice(0, 3);
      return mc(`la3w-${e.hz}-${e.w}`, T(`Quel mot veut dire « ${e.fr} » ?`, `Which word means “${e.en}”?`), { hz: e.w }, ws.map((w) => ({ hz: w })), { say: say(e.w), cols: 2, tip: laTip(grp) });
    }
    return mc(`la${lvl}-${e.hz}-${e.w}`, T(`Quel caractère complète le mot « ${e.fr} » ?`, `Which character completes the word “${e.en}”?`), opt(e), wr.map(opt), { stimulus: lvl === 3 ? { hz: laBlank(e).hz } : laBlank(e), say: say(e.w), cols: 2, tip: laTip(grp) });
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
const polyTip = (p) => T(`${p.hz} se lit ${p.rds[0].py} (${p.rds[0].fr}) : ${p.rds[0].words[0].hz} ; ou ${p.rds[1].py} (${p.rds[1].fr}) : ${p.rds[1].words[0].hz}.`, `${p.hz} is read ${p.rds[0].py} (${p.rds[0].en}): ${p.rds[0].words[0].hz}; or ${p.rds[1].py} (${p.rds[1].en}): ${p.rds[1].words[0].hz}.`);
const POLYE = POLY.flatMap((p) => p.rds.flatMap((rd, ri) => rd.words.map((w, wi) => ({ p, rd, ri, w, wi }))));
const g3c13 = finish({
  id: 'g3c13', icon: '🔀', title: T('Un caractère, deux sons 多音字', 'One character, two sounds 多音字'),
  pfeq: 'Chinois — caractères : quelques caractères à deux lectures (2e–3e année)',
  generate(L, R) {
    const lvl = [1, 2, 3].includes(L) ? L : 2;
    const e = R.pick(POLYE), other = e.p.rds[1 - e.ri];
    const key = `${e.p.hz}-${e.w.hz}`;
    if (lvl === 1 || (lvl === 2 && R.chance(0.5))) {
      const extra = take(R, [pyWrong(R, e.rd.py, 2)].flat(), lvl === 1 ? 0 : 1);
      return mc(`g3c13a-${key}`, T(`Écoute le mot. Comment lit-on « ${e.p.hz} » ici ?`, `Listen to the word. How is “${e.p.hz}” read here?`), { py: e.rd.py }, [{ py: other.py }, ...extra.map((p) => ({ py: p }))].slice(0, lvl === 1 ? 1 : 2), { stimulus: { hz: e.w.hz }, say: say(e.w.hz), cols: 3, tip: polyTip(e.p) });
    }
    if (lvl === 2) {
      const right = e.w, wr = [...take(R, other.words, 2), ...take(R, POLYE.filter((x) => x.p !== e.p), 1).map((x) => x.w)];
      return mc(`g3c13b-${key}`, T(`Dans quel mot « ${e.p.hz} » se lit-il ${e.rd.py} (${e.rd.fr}) ?`, `In which word is “${e.p.hz}” read ${e.rd.py} (${e.rd.en})?`), { hz: right.hz }, wr.map((w) => ({ hz: w.hz })), { stimulus: { hz: e.p.hz }, say: say(right.hz), cols: 2, tip: polyTip(e.p) });
    }
    // L3: pinyin of the whole word
    const swapped = e.w.py.split(' ');
    const idx = [...e.w.hz].filter((c) => /\p{Script=Han}/u.test(c)).indexOf(e.p.hz) >= 0 ? [...e.w.hz].indexOf(e.p.hz) : 0;
    swapped[idx] = other.py;
    const wr = [swapped.join(' '), ...pyWrong(R, e.w.py, 3)].filter((x) => x !== e.w.py);
    return mc(`g3c13c-${key}`, T('Écoute. Quel est le bon pinyin de ce mot ?', 'Listen. What is the right pinyin of this word?'), { py: e.w.py }, [...new Set(wr)].slice(0, 3).map((p) => ({ py: p })), { stimulus: { hz: e.w.hz }, say: say(e.w.hz), cols: 2, tip: polyTip(e.p) });
  },
  allSay() { return POLYE.map((e) => say(e.w.hz)); },
});

export const units = [g3c11, g3c12, g3c13];
export { RADS, LAE };
