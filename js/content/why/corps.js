// « Pourquoi? 十万个为什么 » — catégorie corps (le corps et la santé). Voir docs/WHY.md.
const O = '#3a3f55';
const st = `stroke="${O}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const S = (inner, bg = '#fdf6e3') => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="${bg}"/>${inner}</svg>`;
const C = (x, y, r, f) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${st}/>`;
const E = (x, y, rx, ry, f) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${st}/>`;
const R = (x, y, w, h, f, rx = 10) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${st}/>`;
const P = (d, f = 'none', extra = '') => `<path d="${d}" fill="${f}" ${st} ${extra}/>`;
const L = (x1, y1, x2, y2, c = O, w = 3) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
const G = (x, y, s, inner) => `<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
// flèche avec pointe
const A = (x1, y1, x2, y2, c = '#e8604c') => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = 13;
  const p = (da) => `${(x2 - h * Math.cos(a + da)).toFixed(1)} ${(y2 - h * Math.sin(a + da)).toFixed(1)}`;
  return `<line x1="${x1}" y1="${y1}" x2="${(x2 - 6 * Math.cos(a)).toFixed(1)}" y2="${(y2 - 6 * Math.sin(a)).toFixed(1)}" stroke="${c}" stroke-width="6" stroke-linecap="round"/><polygon points="${x2} ${y2} ${p(0.5)} ${p(-0.5)}" fill="${c}"/>`;
};
const dot = (x, y, r, c, o = 1) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" opacity="${o}"/>`;
const face = (x, y, r, m = 'smile') => {
  const shut = ['shut', 'sneeze', 'cry'].includes(m);
  const eyes = shut
    ? `<path d="M${x - 0.55 * r} ${y} q${0.17 * r} ${0.17 * r} ${0.34 * r} 0 M${x + 0.21 * r} ${y} q${0.17 * r} ${0.17 * r} ${0.34 * r} 0" fill="none" ${st}/>`
    : `<circle cx="${x - 0.38 * r}" cy="${y + 2}" r="${Math.max(3, r * 0.1)}" fill="${O}"/><circle cx="${x + 0.38 * r}" cy="${y + 2}" r="${Math.max(3, r * 0.1)}" fill="${O}"/>`;
  const my = y + 0.5 * r;
  const mouth = {
    smile: `<path d="M${x - 0.3 * r} ${my} Q${x} ${my + 0.35 * r} ${x + 0.3 * r} ${my}" fill="none" ${st}/>`,
    shut: `<path d="M${x - 0.2 * r} ${my + 4} L${x + 0.2 * r} ${my + 4}" fill="none" ${st}/>`,
    open: `<ellipse cx="${x}" cy="${my + 4}" rx="${0.24 * r}" ry="${0.34 * r}" fill="#c0504d" ${st}/>`,
    sneeze: `<ellipse cx="${x}" cy="${my + 4}" rx="${0.28 * r}" ry="${0.22 * r}" fill="#c0504d" ${st}/>`,
    o: `<circle cx="${x}" cy="${my + 4}" r="${0.12 * r}" fill="#c0504d" ${st}/>`,
    sad: `<path d="M${x - 0.28 * r} ${my + 8} Q${x} ${my - 4} ${x + 0.28 * r} ${my + 8}" fill="none" ${st}/>`,
    cry: `<path d="M${x - 0.28 * r} ${my + 8} Q${x} ${my - 4} ${x + 0.28 * r} ${my + 8}" fill="none" ${st}/>`,
  }[m] || '';
  const hair = P(`M${x - r} ${y - 2} A${r} ${r} 0 0 1 ${x + r} ${y - 2} Q${x} ${y - r * 0.4} ${x - r} ${y - 2}Z`, '#6b4a3a');
  return `${C(x, y, r, '#ffd9b8')}${hair}${eyes}${dot(x - 0.62 * r, y + 0.32 * r, r * 0.13, '#ff8f80', 0.7)}${dot(x + 0.62 * r, y + 0.32 * r, r * 0.13, '#ff8f80', 0.7)}${mouth}`;
};
const kid = (x, y, s, m = 'smile', shirt = '#6ab0f5') => G(x, y, s,
  `${R(-18, 56, 14, 44, '#4a5a8a', 6)}${R(4, 56, 14, 44, '#4a5a8a', 6)}${R(-40, 30, 14, 42, '#ffd9b8', 7)}${R(26, 30, 14, 42, '#ffd9b8', 7)}${R(-26, 26, 52, 50, shirt, 14)}${face(0, 0, 28, m)}`);
// corps en coupe (tête + tronc vide)
const cut = () => `${R(108, 118, 26, 110, '#ffd9b8', 12)}${R(266, 118, 26, 110, '#ffd9b8', 12)}${R(138, 92, 124, 198, '#ffe9d6', 44)}${R(184, 80, 32, 22, '#ffd9b8', 6)}${face(200, 52, 32)}`;
const heart = (x, y, s = 1, c = '#e8604c') => G(x, y, s, P('M0 -8C-8-26-34-20-34 0C-34 18-14 28 0 40C14 28 34 18 34 0C34-20 8-26 0-8Z', c));
const lungs = (x, y, s = 1, c = '#f4a3b0') => G(x, y, s, `${P('M-6 -30C-34 -30-48 10-42 42C-36 58-8 52-6 30Z', c)}${P('M6 -30C34 -30 48 10 42 42C36 58 8 52 6 30Z', c)}${L(0, -50, 0, -16)}${L(0, -16, -16, 6)}${L(0, -16, 16, 6)}`);
const stomach = (x, y, s = 1, c = '#f6b26b') => G(x, y, s, P('M-30 -20C-10 -34 24 -30 34 0C42 26 10 40 -10 30C-30 20-34 10-30 -20Z', c));
const tooth = (x, y, s = 1, c = '#fff') => G(x, y, s, P('M-20 -22C-10 -32 10 -32 20 -22C26 -10 20 10 14 34C10 44 4 40 2 28C0 20 -2 20 -4 28C-6 40 -12 44 -14 34C-20 10 -26 -10 -20 -22Z', c));
const drop = (x, y, s = 1, c = '#5bb5f0') => G(x, y, s, P('M0 -14C9 0 12 6 12 11A12 12 0 0 1 -12 11C-12 6 -9 0 0 -14Z', c));
const germ = (x, y, s = 1, c = '#7bc86c') => G(x, y, s, `${[0, 1, 2, 3, 4, 5].map((i) => { const a = i * Math.PI / 3; return L(Math.round(14 * Math.cos(a)), Math.round(14 * Math.sin(a)), Math.round(22 * Math.cos(a)), Math.round(22 * Math.sin(a)), O, 3); }).join('')}${C(0, 0, 14, c)}${dot(-5, -2, 2.5, O)}${dot(5, -2, 2.5, O)}`);
const star = (x, y, s = 1, c = '#ffd23f') => G(x, y, s, P('M0-14L4-4L15-4L6 3L9 14L0 7L-9 14L-6 3L-15-4L-4-4Z', c));
const moon = (x, y, s = 1) => G(x, y, s, P('M0-24A24 24 0 1 0 24 8A18 18 0 0 1 0-24Z', '#ffe08a'));
const sun = (x, y, s = 1) => G(x, y, s, `${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = i * Math.PI / 4; return L((26 * Math.cos(a)).toFixed(1), (26 * Math.sin(a)).toFixed(1), (38 * Math.cos(a)).toFixed(1), (38 * Math.sin(a)).toFixed(1), '#f2a900', 4); }).join('')}${C(0, 0, 20, '#ffd23f')}`);
const cloud = (x, y, s = 1, c = '#fff') => G(x, y, s, `<path d="M-30 14A16 16 0 0 1 -26 -14A20 20 0 0 1 8 -22A18 18 0 0 1 32 -2A14 14 0 0 1 30 14Z" fill="${c}" ${st}/>`);
const hand = (x, y, s = 1, c = '#ffd9b8') => G(x, y, s, `${[[-30, -34, -12], [-10, -46, -4], [12, -46, 4], [32, -34, 14]].map(([fx, fy, r]) => `<g transform="translate(${fx} ${fy}) rotate(${r})">${R(-8, -26, 16, 40, c, 8)}</g>`).join('')}${R(-52, -4, 22, 14, c, 7)}${P('M-34 -10L34 -10L36 40Q0 64 -32 40Z', c)}`);
const eye = (x, y, s = 1) => G(x, y, s, `${P('M-50 0Q0-46 50 0Q0 46-50 0Z', '#fff')}${C(0, 0, 21, '#6b8fd6')}${C(0, 0, 9, O)}${dot(-6, -7, 4, '#fff')}`);
const bone = (x, y, w, s = 1, rot = 0, c = '#fff') => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${R(-w / 2, -8, w, 16, c, 6)}${C(-w / 2, -9, 11, c)}${C(-w / 2, 9, 11, c)}${C(w / 2, -9, 11, c)}${C(w / 2, 9, 11, c)}${R(-w / 2 + 2, -7, w - 4, 14, c, 4).replace(`stroke="${O}"`, 'stroke="none"')}</g>`;
const ear = (x, y, s = 1) => G(x, y, s, P('M-10 -50C30 -62 52 -30 40 4C34 22 20 28 18 50C16 68-12 64-8 44C-6 34 8 28 12 14C16 -4-14-8-14 -22Z', '#ffd9b8') + P('M0 -30C16 -34 26 -14 16 -2', 'none'));
const brain = (x, y, s = 1, c = '#f4a3b0') => G(x, y, s, `${P('M-44 6C-52-22-24-42 0-34C26-44 56-20 44 8C50 30 26 42 8 34C-6 44-34 40-44 6Z', c)}${P('M-10-26C-14-8 6-10 0 10', 'none')}${P('M-30 -4C-18 0-20 12-30 16', 'none')}${P('M26 -6C16 0 18 14 28 18', 'none')}`);

// constructeur de sujet
const tri = (a) => ({ zh: a[0], py: a[1], fr: a[2] });
const T = (id, emoji, level, q, slides, fact, quiz) => ({
  id: 'corps-' + id, cat: 'corps', emoji, level,
  q: tri(q),
  slides: slides.map(([svg, tx]) => ({ svg, ...tri(tx) })),
  fact: tri(fact),
  quiz: quiz.map(([qq, opts, answer]) => ({ ...tri(qq), options: opts.map(([zh, py, fr, emoji]) => ({ zh, py, fr, emoji })), answer })),
});

export const topics = [
  // ───────── niveau 1 ─────────
  T('baille', '🥱', 1,
    ['为什么会打哈欠？', 'wèi shén me huì dǎ hā qian', 'Pourquoi bâille-t-on?'],
    [
      [S(`${moon(70, 60, 1.2)}${star(330, 50, 1.2)}${star(300, 100)}${face(200, 150, 80, 'open')}`, '#e9ecff'),
        ['累了或者困了，我们就会打哈欠。', 'lèi le huò zhě kùn le, wǒ men jiù huì dǎ hā qian.', 'Quand on est fatigué ou qu’on a sommeil, on bâille.']],
      [S(`${face(230, 150, 80, 'open')}${A(40, 110, 150, 150, '#5bb5f0')}${A(40, 190, 150, 170, '#5bb5f0')}${dot(60, 150, 8, '#bfe3fa')}${dot(100, 130, 6, '#bfe3fa')}${dot(100, 175, 7, '#bfe3fa')}`),
        ['哈欠会让我们吸进好多空气。', 'hā qian huì ràng wǒ men xī jìn hǎo duō kōng qì.', 'Un bâillement fait entrer beaucoup d’air.']],
      [S(`${face(110, 150, 62, 'open')}${face(290, 150, 62, 'open')}${A(170, 90, 230, 90, '#e8604c')}${A(230, 210, 170, 210, '#e8604c')}`),
        ['看到别人打哈欠，你也会想打。', 'kàn dào bié rén dǎ hā qian, nǐ yě huì xiǎng dǎ.', 'Quand on voit quelqu’un bâiller, on a envie de bâiller aussi.']],
    ],
    ['小狗和小猫也会打哈欠哦！', 'xiǎo gǒu hé xiǎo māo yě huì dǎ hā qian ò!', 'Les chiens et les chats bâillent aussi!'],
    [
      [['看到别人打哈欠，你会怎么样？', 'kàn dào bié rén dǎ hā qian, nǐ huì zěn me yàng?', 'Quand tu vois quelqu’un bâiller, que fais-tu?'],
        [['也想打哈欠', 'yě xiǎng dǎ hā qian', 'Tu as envie de bâiller aussi', '🥱'], ['马上变高', 'mǎ shàng biàn gāo', 'Tu deviens grand tout de suite', '📏'], ['突然打喷嚏', 'tū rán dǎ pēn tì', 'Tu éternues soudain', '🤧']], 0],
      [['打哈欠时，嘴巴会怎么样？', 'dǎ hā qian shí, zuǐ ba huì zěn me yàng?', 'Quand on bâille, que fait la bouche?'],
        [['张得很大', 'zhāng de hěn dà', 'Elle s’ouvre grand', '😮'], ['紧紧闭着', 'jǐn jǐn bì zhe', 'Elle reste bien fermée', '😶'], ['一直在笑', 'yī zhí zài xiào', 'Elle sourit tout le temps', '😄']], 0],
    ]),

  T('brosser-dents', '🪥', 1,
    ['为什么要刷牙？', 'wèi shén me yào shuā yá', 'Pourquoi faut-il se brosser les dents?'],
    [
      [S(`${tooth(200, 150, 3.4)}${germ(110, 90, 1.2)}${germ(300, 100, 1.1)}${germ(120, 220, 1)}${germ(290, 215, 1.2)}`),
        ['嘴巴里有小细菌，会弄坏牙齿。', 'zuǐ ba lǐ yǒu xiǎo xì jūn, huì nòng huài yá chǐ.', 'Dans la bouche, il y a de petits microbes qui abîment les dents.']],
      [S(`${tooth(220, 160, 3.4)}${R(30, 100, 150, 26, '#f6c445', 12)}${R(30, 82, 60, 20, '#5bb5f0', 8)}${A(120, 80, 190, 120, '#e8604c')}${dot(250, 90, 9, '#bfe3fa')}${dot(290, 120, 7, '#bfe3fa')}${dot(300, 190, 10, '#bfe3fa')}`),
        ['刷牙能把脏东西刷掉。', 'shuā yá néng bǎ zāng dōng xi shuā diào.', 'Le brossage enlève la saleté.']],
      [S(`${tooth(110, 150, 2.6, '#d8c98a')}${germ(60, 70, 0.9)}${germ(150, 240, 0.9)}${A(180, 150, 230, 150, '#e8604c')}${tooth(300, 150, 2.6)}${star(350, 90, 1.4)}${star(255, 85, 1)}`),
        ['早上和睡觉前，都要刷牙。', 'zǎo shang hé shuì jiào qián, dōu yào shuā yá.', 'Brosse-toi les dents le matin et avant d’aller au lit.']],
    ],
    ['我们一共会有二十颗乳牙。', 'wǒ men yī gòng huì yǒu èr shí kē rǔ yá.', 'Les enfants ont vingt dents de bébé.'],
    [
      [['一天里什么时候要刷牙？', 'yī tiān lǐ shén me shí hou yào shuā yá?', 'Quand faut-il se brosser les dents?'],
        [['早上和睡前', 'zǎo shang hé shuì qián', 'Le matin et avant de dormir', '🪥'], ['只在过生日', 'zhǐ zài guò shēng rì', 'Seulement à son anniversaire', '🎂'], ['从来不用', 'cóng lái bù yòng', 'Jamais', '🙅']], 0],
      [['刷牙能赶走什么？', 'shuā yá néng gǎn zǒu shén me?', 'Que chasse le brossage?'],
        [['小细菌', 'xiǎo xì jūn', 'Les microbes', '🦠'], ['小星星', 'xiǎo xīng xing', 'Les petites étoiles', '⭐'], ['小鱼', 'xiǎo yú', 'Les petits poissons', '🐟']], 0],
    ]),

  T('eternuer', '🤧', 1,
    ['为什么会打喷嚏？', 'wèi shén me huì dǎ pēn tì', 'Pourquoi éternue-t-on?'],
    [
      [S(`${face(220, 150, 76, 'shut')}${dot(70, 120, 5, '#b59b6b')}${dot(100, 150, 6, '#b59b6b')}${dot(70, 180, 4, '#b59b6b')}${dot(125, 120, 4, '#b59b6b')}${A(60, 150, 140, 158, '#e8604c')}`),
        ['鼻子里进了灰尘，有点痒。', 'bí zi lǐ jìn le huī chén, yǒu diǎn yǎng.', 'De la poussière entre dans le nez et ça chatouille.']],
      [S(`${face(150, 150, 76, 'sneeze')}${A(240, 150, 340, 120, '#5bb5f0')}${A(240, 170, 350, 175, '#5bb5f0')}${A(240, 190, 330, 235, '#5bb5f0')}${dot(300, 150, 6, '#b59b6b')}${dot(335, 195, 5, '#b59b6b')}`),
        ['打喷嚏，是把灰尘用力吹出去。', 'dǎ pēn tì, shì bǎ huī chén yòng lì chuī chū qù.', 'L’éternuement chasse la poussière avec force.']],
      [S(`${face(160, 150, 76, 'sneeze')}${P('M225 175L290 125L330 165L265 215Z', '#fff')}${P('M240 172L290 135', 'none')}${A(330, 60, 290, 100, '#e8604c')}`),
        ['打喷嚏时，要用纸巾或者手肘挡住。', 'dǎ pēn tì shí, yào yòng zhǐ jīn huò zhě shǒu zhǒu dǎng zhù.', 'Quand on éternue, on se couvre avec un mouchoir ou le coude.']],
    ],
    ['喷嚏的风，比你想的快多了！', 'pēn tì de fēng, bǐ nǐ xiǎng de kuài duō le!', 'Un éternuement va beaucoup plus vite qu’on le pense!'],
    [
      [['打喷嚏是为了什么？', 'dǎ pēn tì shì wèi le shén me?', 'À quoi sert un éternuement?'],
        [['把灰尘吹出去', 'bǎ huī chén chuī chū qù', 'À chasser la poussière', '💨'], ['把鼻子变大', 'bǎ bí zi biàn dà', 'À agrandir le nez', '👃'], ['让肚子饱', 'ràng dù zi bǎo', 'À remplir le ventre', '🍚']], 0],
      [['打喷嚏时应该怎么做？', 'dǎ pēn tì shí yīng gāi zěn me zuò?', 'Que faire quand on éternue?'],
        [['用纸巾挡住', 'yòng zhǐ jīn dǎng zhù', 'Se couvrir avec un mouchoir', '🤧'], ['对着朋友', 'duì zhe péng you', 'Éternuer vers un ami', '🧒'], ['憋住不动', 'biē zhù bù dòng', 'Retenir sa respiration, immobile', '😤']], 0],
    ]),

  T('coeur', '❤️', 1,
    ['心脏为什么会跳？', 'xīn zàng wèi shén me huì tiào', 'Pourquoi le cœur bat-il?'],
    [
      [S(`${cut()}${heart(180, 150, 0.8)}${A(52, 150, 118, 150, '#e8604c')}`),
        ['心脏在胸口，像一个小拳头。', 'xīn zàng zài xiōng kǒu, xiàng yī gè xiǎo quán tou.', 'Le cœur est dans la poitrine, gros comme un petit poing.']],
      [S(`${heart(200, 150, 2.6)}${A(60, 210, 130, 175, '#5b8fe0')}${A(275, 120, 345, 90, '#e8604c')}${A(120, 60, 160, 95, '#5b8fe0')}`),
        ['心脏一缩一松，把血送到全身。', 'xīn zàng yī suō yī sōng, bǎ xuè sòng dào quán shēn.', 'Le cœur se serre et se relâche pour pousser le sang partout.']],
      [S(`${heart(110, 150, 1.5)}${A(170, 150, 225, 150, '#e8604c')}${heart(300, 150, 2.1)}${L(250, 85, 232, 70, '#e8604c', 4)}${L(345, 80, 362, 62, '#e8604c', 4)}${L(250, 215, 232, 232, '#e8604c', 4)}${L(345, 220, 362, 238, '#e8604c', 4)}`),
        ['跑步的时候，心脏跳得更快。', 'pǎo bù de shí hou, xīn zàng tiào de gèng kuài.', 'Quand on court, le cœur bat plus vite.']],
    ],
    ['你的心脏一辈子都不会休息！', 'nǐ de xīn zàng yī bèi zi dōu bù huì xiū xi!', 'Ton cœur ne se repose jamais de toute ta vie!'],
    [
      [['心脏在身体的哪里？', 'xīn zàng zài shēn tǐ de nǎ lǐ?', 'Où est le cœur dans le corps?'],
        [['胸口', 'xiōng kǒu', 'Dans la poitrine', '🫀'], ['脚趾头', 'jiǎo zhǐ tou', 'Dans les orteils', '🦶'], ['头发里', 'tóu fa lǐ', 'Dans les cheveux', '💇']], 0],
      [['跑步的时候，心脏会怎么样？', 'pǎo bù de shí hou, xīn zàng huì zěn me yàng?', 'Quand on court, que fait le cœur?'],
        [['跳得更快', 'tiào de gèng kuài', 'Il bat plus vite', '💓'], ['完全不跳', 'wán quán bù tiào', 'Il s’arrête', '⏸️'], ['跑到外面', 'pǎo dào wài miàn', 'Il sort du corps', '🏃']], 0],
    ]),

  T('dormir', '😴', 1,
    ['为什么要睡觉？', 'wèi shén me yào shuì jiào', 'Pourquoi faut-il dormir?'],
    [
      [S(`${moon(310, 60, 1.3)}${star(250, 40, 1.1)}${star(350, 120)}${R(60, 150, 280, 90, '#8ec5ff', 16)}${R(60, 220, 280, 20, '#6a9fe0', 8)}${R(70, 124, 90, 50, '#fff', 20)}${face(120, 140, 30, 'shut')}`, '#e9ecff'),
        ['白天玩了一天，身体会累。', 'bái tiān wán le yī tiān, shēn tǐ huì lèi.', 'Après une journée de jeux, le corps est fatigué.']],
      [S(`${R(70, 90, 110, 130, '#fff', 14)}${R(180, 120, 20, 70, O, 4)}${R(80, 100, 20, 110, '#d9524c', 4)}${R(210, 90, 110, 130, '#fff', 14)}${R(220, 100, 90, 110, '#6cc26c', 4)}${A(180, 155, 215, 155, '#e8604c')}`),
        ['睡觉的时候，身体在充电。', 'shuì jiào de shí hou, shēn tǐ zài chōng diàn.', 'Pendant le sommeil, le corps se recharge, comme une pile.']],
      [S(`${kid(110, 90, 1, 'shut')}${A(200, 150, 270, 150, '#e8604c')}${kid(320, 70, 1.3, 'smile')}${L(255, 250, 385, 250, O, 3)}`),
        ['睡饱了，身体长得好，也有精神。', 'shuì bǎo le, shēn tǐ zhǎng de hǎo, yě yǒu jīng shen.', 'Bien dormir aide à grandir et donne de l’énergie.']],
    ],
    ['小朋友比大人需要睡更久。', 'xiǎo péng yǒu bǐ dà rén xū yào shuì gèng jiǔ.', 'Les enfants ont besoin de dormir plus longtemps que les adultes.'],
    [
      [['睡觉的时候，身体在做什么？', 'shuì jiào de shí hou, shēn tǐ zài zuò shén me?', 'Que fait le corps pendant le sommeil?'],
        [['休息和充电', 'xiū xi hé chōng diàn', 'Il se repose et se recharge', '🔋'], ['去上学', 'qù shàng xué', 'Il va à l’école', '🏫'], ['跑马拉松', 'pǎo mǎ lā sōng', 'Il court un marathon', '🏃']], 0],
      [['睡得好，第二天会怎么样？', 'shuì de hǎo, dì èr tiān huì zěn me yàng?', 'Quand on dort bien, comment est-on le lendemain?'],
        [['有精神', 'yǒu jīng shen', 'En forme', '😃'], ['更想睡觉', 'gèng xiǎng shuì jiào', 'Encore plus endormi', '😴'], ['变成小狗', 'biàn chéng xiǎo gǒu', 'On devient un chien', '🐶']], 0],
    ]),

  T('laver-mains', '🧼', 1,
    ['为什么要洗手？', 'wèi shén me yào xǐ shǒu', 'Pourquoi faut-il se laver les mains?'],
    [
      [S(`${hand(200, 160, 2.2)}${germ(80, 70, 1.2)}${germ(310, 80, 1.2)}${germ(70, 220, 1)}${germ(335, 215, 1)}${germ(200, 255, 0.9)}`),
        ['小手摸过很多东西，沾了细菌。', 'xiǎo shǒu mō guo hěn duō dōng xi, zhān le xì jūn.', 'Nos mains touchent plein de choses et attrapent des microbes.']],
      [S(`${hand(200, 170, 2.2)}${C(90, 80, 20, '#e4f4ff')}${C(130, 55, 14, '#e4f4ff')}${C(310, 90, 22, '#e4f4ff')}${C(280, 55, 12, '#e4f4ff')}${drop(70, 200, 1.4)}${drop(335, 200, 1.4)}${drop(95, 250, 1.1)}`),
        ['用肥皂和水搓一搓，细菌就跑了。', 'yòng féi zào hé shuǐ cuō yī cuō, xì jūn jiù pǎo le.', 'Avec du savon et de l’eau, les microbes s’en vont.']],
      [S(`${hand(200, 170, 2.2)}${star(80, 90, 1.5)}${star(320, 100, 1.5)}${star(120, 230, 1)}${star(300, 235, 1)}`),
        ['吃东西前和上厕所后，都要洗手。', 'chī dōng xi qián hé shàng cè suǒ hòu, dōu yào xǐ shǒu.', 'Lave-toi les mains avant de manger et après être allé aux toilettes.']],
    ],
    ['洗手要搓二十秒，和唱两遍生日歌一样久。', 'xǐ shǒu yào cuō èr shí miǎo, hé chàng liǎng biàn shēng rì gē yī yàng jiǔ.', 'Il faut frotter vingt secondes, le temps de chanter deux fois « Bonne fête ».'],
    [
      [['洗手能洗掉什么？', 'xǐ shǒu néng xǐ diào shén me?', 'Que enlève-t-on en se lavant les mains?'],
        [['细菌', 'xì jūn', 'Les microbes', '🦠'], ['手指', 'shǒu zhǐ', 'Les doigts', '🖐️'], ['影子', 'yǐng zi', 'L’ombre', '👤']], 0],
      [['什么时候一定要洗手？', 'shén me shí hou yī dìng yào xǐ shǒu?', 'Quand faut-il absolument se laver les mains?'],
        [['吃东西前', 'chī dōng xi qián', 'Avant de manger', '🍎'], ['睡着以后', 'shuì zháo yǐ hòu', 'Une fois endormi', '😴'], ['看星星时', 'kàn xīng xing shí', 'En regardant les étoiles', '🌟']], 0],
    ]),

  T('transpirer', '💦', 1,
    ['为什么会出汗？', 'wèi shén me huì chū hàn', 'Pourquoi transpire-t-on?'],
    [
      [S(`${sun(70, 70, 1.3)}${face(250, 150, 80, 'open')}${drop(180, 100, 1.2)}${drop(325, 100, 1.2)}${drop(315, 190, 1)}${drop(185, 195, 1)}`),
        ['天气热，或者跑步以后，身体会变热。', 'tiān qì rè, huò zhě pǎo bù yǐ hòu, shēn tǐ huì biàn rè.', 'Quand il fait chaud ou après avoir couru, le corps chauffe.']],
      [S(`${R(40, 190, 320, 50, '#ffd9b8', 14)}${drop(100, 175, 1.2)}${drop(200, 175, 1.2)}${drop(300, 175, 1.2)}${A(100, 140, 100, 70, '#5bb5f0')}${A(200, 140, 200, 70, '#5bb5f0')}${A(300, 140, 300, 70, '#5bb5f0')}`),
        ['汗水变干的时候，会带走热量。', 'hàn shuǐ biàn gān de shí hou, huì dài zǒu rè liàng.', 'En séchant, la sueur emporte la chaleur.']],
      [S(`${kid(120, 80, 1.2, 'smile')}${R(260, 150, 70, 90, '#e4f4ff', 10)}${R(264, 190, 62, 46, '#8fd0ff', 6)}${A(250, 100, 215, 130, '#e8604c')}${drop(300, 110, 1.3)}`),
        ['出汗以后，要喝水补一补。', 'chū hàn yǐ hòu, yào hē shuǐ bǔ yī bǔ.', 'Après avoir transpiré, il faut boire de l’eau.']],
    ],
    ['出汗是身体自己的小空调。', 'chū hàn shì shēn tǐ zì jǐ de xiǎo kōng tiáo.', 'La transpiration est la petite climatisation du corps.'],
    [
      [['出汗是为了什么？', 'chū hàn shì wèi le shén me?', 'À quoi sert la transpiration?'],
        [['让身体凉快', 'ràng shēn tǐ liáng kuai', 'À rafraîchir le corps', '😌'], ['让头发变长', 'ràng tóu fa biàn cháng', 'À faire pousser les cheveux', '💇'], ['让牙齿变白', 'ràng yá chǐ biàn bái', 'À blanchir les dents', '🦷']], 0],
      [['出了很多汗，要做什么？', 'chū le hěn duō hàn, yào zuò shén me?', 'Quand on a beaucoup transpiré, que faire?'],
        [['喝水', 'hē shuǐ', 'Boire de l’eau', '🥤'], ['穿大棉袄', 'chuān dà mián ǎo', 'Mettre un gros manteau', '🧥'], ['不吃不喝', 'bù chī bù hē', 'Ne rien boire ni manger', '🚫']], 0],
    ]),

  T('ventre-gargouille', '🍽️', 1,
    ['为什么肚子会咕咕叫？', 'wèi shén me dù zi huì gū gū jiào', 'Pourquoi le ventre gargouille-t-il?'],
    [
      [S(`${cut()}${stomach(200, 190, 1.1)}${dot(185, 185, 5, '#d9a441')}${dot(205, 195, 4, '#d9a441')}${dot(215, 180, 4, '#d9a441')}`),
        ['吃进去的东西，会到肚子里的胃。', 'chī jìn qù de dōng xi, huì dào dù zi lǐ de wèi.', 'Ce qu’on mange arrive dans l’estomac, dans le ventre.']],
      [S(`${stomach(200, 150, 2.6)}${A(60, 110, 130, 135, '#e8604c')}${A(340, 110, 275, 135, '#e8604c')}${A(60, 200, 130, 180, '#e8604c')}${A(340, 200, 275, 180, '#e8604c')}`),
        ['胃一缩一缩，把食物搅一搅。', 'wèi yī suō yī suō, bǎ shí wù jiǎo yī jiǎo.', 'L’estomac se serre pour brasser la nourriture.']],
      [S(`${stomach(110, 150, 1.6)}${dot(95, 150, 6, '#f7e3b3')}${dot(125, 140, 5, '#f7e3b3')}${A(180, 150, 235, 150, '#e8604c')}${kid(310, 80, 1.1, 'smile')}${R(250, 190, 50, 40, '#ff6b5e', 12)}`),
        ['肚子空了，里面的空气也会跑来跑去，咕咕叫。', 'dù zi kōng le, lǐ miàn de kōng qì yě huì pǎo lái pǎo qù, gū gū jiào.', 'Quand le ventre est vide, l’air s’y promène et ça gargouille.']],
    ],
    ['咕咕声就是在说：我想吃东西了！', 'gū gū shēng jiù shì zài shuō: wǒ xiǎng chī dōng xi le!', 'Le gargouillis dit : j’ai envie de manger!'],
    [
      [['吃进去的东西先到哪里？', 'chī jìn qù de dōng xi xiān dào nǎ lǐ?', 'Où va d’abord la nourriture?'],
        [['胃', 'wèi', 'Dans l’estomac', '🍽️'], ['耳朵', 'ěr duo', 'Dans l’oreille', '👂'], ['脚', 'jiǎo', 'Dans le pied', '🦶']], 0],
      [['肚子咕咕叫，可能是什么意思？', 'dù zi gū gū jiào, kě néng shì shén me yì si?', 'Que veut dire un ventre qui gargouille?'],
        [['有点饿了', 'yǒu diǎn è le', 'Il a un peu faim', '🍎'], ['要下雨了', 'yào xià yǔ le', 'Il va pleuvoir', '🌧️'], ['想唱歌了', 'xiǎng chàng gē le', 'Il veut chanter', '🎤']], 0],
    ]),

  T('larmes', '😢', 1,
    ['为什么会流眼泪？', 'wèi shén me huì liú yǎn lèi', 'Pourquoi pleure-t-on?'],
    [
      [S(`${eye(200, 140, 2.1)}${P('M105 118Q200 70 295 118', 'none')}${drop(150, 215, 1.4)}${drop(250, 220, 1.4)}`),
        ['眼睛里总有一点点水，保护眼睛。', 'yǎn jing lǐ zǒng yǒu yī diǎn diǎn shuǐ, bǎo hù yǎn jing.', 'Les yeux ont toujours un peu d’eau qui les protège.']],
      [S(`${face(150, 150, 70, 'cry')}${drop(125, 185, 1.1)}${drop(172, 190, 1.1)}${G(300, 160, 1, `${C(0, 0, 42, '#f4e3a6')}${P('M-20 -30Q-34 0 -20 30', 'none')}${P('M20 -30Q34 0 20 30', 'none')}${P('M0 -42L0 -56', 'none')}`)}${A(270, 105, 235, 130, '#e8604c')}`),
        ['洋葱或者灰尘，会让眼泪流出来。', 'yáng cōng huò zhě huī chén, huì ràng yǎn lèi liú chū lái.', 'Un oignon ou de la poussière peuvent faire couler des larmes.']],
      [S(`${face(110, 150, 62, 'cry')}${drop(95, 190, 1.2)}${face(290, 150, 62, 'sad')}${drop(310, 195, 1)}`),
        ['难过或者很感动的时候，也会流泪。', 'nán guò huò zhě hěn gǎn dòng de shí hou, yě huì liú lèi.', 'On pleure aussi quand on est triste ou très ému.']],
    ],
    ['哭一哭，心情常常会好一点。', 'kū yī kū, xīn qíng cháng cháng huì hǎo yī diǎn.', 'Pleurer peut aider à se sentir mieux.'],
    [
      [['眼泪有什么用？', 'yǎn lèi yǒu shén me yòng?', 'À quoi servent les larmes?'],
        [['保护和冲洗眼睛', 'bǎo hù hé chōng xǐ yǎn jing', 'À protéger et laver les yeux', '👁️'], ['给花浇水', 'gěi huā jiāo shuǐ', 'À arroser les fleurs', '🌷'], ['让人变高', 'ràng rén biàn gāo', 'À grandir', '📏']], 0],
      [['切洋葱时为什么会流泪？', 'qiē yáng cōng shí wèi shén me huì liú lèi?', 'Pourquoi pleure-t-on en coupant un oignon?'],
        [['洋葱刺激了眼睛', 'yáng cōng cì jī le yǎn jing', 'L’oignon pique les yeux', '🧅'], ['洋葱太圆了', 'yáng cōng tài yuán le', 'L’oignon est trop rond', '⚪'], ['刀太亮了', 'dāo tài liàng le', 'Le couteau brille trop', '🔪']], 0],
    ]),

  T('boire-eau', '🥤', 1,
    ['为什么要喝水？', 'wèi shén me yào hē shuǐ', 'Pourquoi faut-il boire de l’eau?'],
    [
      [S(`${kid(120, 70, 1.5, 'smile', '#8fd0ff')}${drop(300, 90, 2.4)}${drop(340, 190, 1.4)}${drop(260, 210, 1.1)}`),
        ['我们的身体里，有很多很多水。', 'wǒ men de shēn tǐ lǐ, yǒu hěn duō hěn duō shuǐ.', 'Notre corps contient beaucoup, beaucoup d’eau.']],
      [S(`${R(150, 70, 100, 150, '#e4f4ff', 14)}${R(156, 120, 88, 94, '#8fd0ff', 8)}${A(100, 60, 160, 100, '#e8604c')}${drop(310, 90, 1.2)}${drop(335, 150, 1.2)}${A(270, 140, 320, 190, '#5bb5f0')}`),
        ['出汗和尿尿，会让身体丢掉水。', 'chū hàn hé niào niào, huì ràng shēn tǐ diū diào shuǐ.', 'En transpirant et en faisant pipi, le corps perd de l’eau.']],
      [S(`${R(140, 80, 100, 150, '#e4f4ff', 14)}${R(146, 120, 88, 104, '#8fd0ff', 8)}${A(250, 130, 320, 150, '#5bb5f0')}${kid(340, 90, 0.7, 'smile', '#8fd0ff')}`),
        ['每天多喝水，身体才有劲。', 'měi tiān duō hē shuǐ, shēn tǐ cái yǒu jìn.', 'Boire de l’eau chaque jour donne de l’énergie au corps.']],
    ],
    ['最好的饮料，就是清清的白开水。', 'zuì hǎo de yǐn liào, jiù shì qīng qīng de bái kāi shuǐ.', 'La meilleure boisson, c’est un simple verre d’eau.'],
    [
      [['身体里有什么？', 'shēn tǐ lǐ yǒu shén me?', 'Qu’y a-t-il beaucoup dans le corps?'],
        [['很多水', 'hěn duō shuǐ', 'Beaucoup d’eau', '💧'], ['很多沙子', 'hěn duō shā zi', 'Beaucoup de sable', '🏖️'], ['很多雪', 'hěn duō xuě', 'Beaucoup de neige', '❄️']], 0],
      [['出了汗，身体会怎么样？', 'chū le hàn, shēn tǐ huì zěn me yàng?', 'Quand on transpire, que perd le corps?'],
        [['丢掉水', 'diū diào shuǐ', 'Il perd de l’eau', '💦'], ['变成冰', 'biàn chéng bīng', 'Il devient de la glace', '🧊'], ['变得更重', 'biàn de gèng zhòng', 'Il devient plus lourd', '⚖️']], 0],
    ]),

  T('buee-hiver', '❄️', 1,
    ['为什么冬天呼气有白雾？', 'wèi shén me dōng tiān hū qì yǒu bái wù', 'Pourquoi voit-on son souffle en hiver?'],
    [
      [S(`${star(60, 50, 1)}${dot(320, 40, 5, '#fff')}${dot(350, 90, 4, '#fff')}${dot(40, 120, 4, '#fff')}${R(0, 250, 400, 50, '#f4faff', 0)}${face(130, 160, 70, 'o')}${cloud(260, 160, 1.7)}`, '#cfe6fa'),
        ['冬天呼出的气，变成了白白的雾。', 'dōng tiān hū chū de qì, biàn chéng le bái bái de wù.', 'En hiver, l’air qu’on souffle devient un petit nuage blanc.']],
      [S(`${R(0, 0, 200, 300, '#ffe6b3', 0)}${R(200, 0, 200, 300, '#cfe6fa', 0)}${dot(60, 150, 9, '#f08a4b')}${A(80, 150, 180, 150, '#f08a4b')}${drop(260, 110, 0.9)}${drop(300, 160, 0.9)}${drop(270, 210, 0.9)}${drop(335, 120, 0.8)}`, '#fff'),
        ['呼出的气暖暖的，遇到冷空气，变成小水珠。', 'hū chū de qì nuǎn nuǎn de, yù dào lěng kōng qì, biàn chéng xiǎo shuǐ zhū.', 'Notre souffle est chaud; dans l’air froid, il devient de minuscules gouttes.']],
      [S(`${sun(80, 70, 1.2)}${face(150, 170, 66, 'smile')}${dot(260, 170, 6, '#bfe3fa', 0.5)}`, '#e4f6ff'),
        ['夏天空气暖和，就看不见白雾。', 'xià tiān kōng qì nuǎn huo, jiù kàn bù jiàn bái wù.', 'En été, l’air est chaud : on ne voit pas de nuage.']],
    ],
    ['你呼出的白雾，其实就是小水珠！', 'nǐ hū chū de bái wù, qí shí jiù shì xiǎo shuǐ zhū!', 'Ton nuage de souffle, ce sont des gouttelettes d’eau!'],
    [
      [['白雾是什么变成的？', 'bái wù shì shén me biàn chéng de?', 'En quoi le souffle se transforme-t-il?'],
        [['小水珠', 'xiǎo shuǐ zhū', 'En petites gouttes d’eau', '💧'], ['小石头', 'xiǎo shí tou', 'En petits cailloux', '🪨'], ['小雪人', 'xiǎo xuě rén', 'En petits bonhommes de neige', '⛄']], 0],
      [['什么时候最容易看到白雾？', 'shén me shí hou zuì róng yì kàn dào bái wù?', 'Quand voit-on le mieux son souffle?'],
        [['冷冷的冬天', 'lěng lěng de dōng tiān', 'Par un froid d’hiver', '🥶'], ['热热的夏天', 'rè rè de xià tiān', 'Par une chaude journée d’été', '☀️'], ['在被窝里', 'zài bèi wō lǐ', 'Sous la couette', '🛏️']], 0],
    ]),

  T('hoquet', '🫨', 1,
    ['为什么会打嗝？', 'wèi shén me huì dǎ gé', 'Pourquoi a-t-on le hoquet?'],
    [
      [S(`${cut()}${lungs(200, 150, 0.9)}${P('M160 205Q200 180 240 205', 'none', 'stroke="#e8604c" stroke-width="5"')}`),
        ['肺的下面，有一块会动的肌肉。', 'fèi de xià miàn, yǒu yī kuài huì dòng de jī ròu.', 'Sous les poumons, il y a un muscle qui bouge.']],
      [S(`${cut()}${lungs(200, 150, 0.9)}${P('M160 220Q200 190 240 220', 'none', 'stroke="#e8604c" stroke-width="5"')}${A(200, 280, 200, 232, '#e8604c')}`),
        ['它突然一抖，我们就吸了一口气，发出“嗝”。', 'tā tū rán yī dǒu, wǒ men jiù xī le yī kǒu qì, fā chū “gé”.', 'Il sursaute, on inspire d’un coup et ça fait « hic »!']],
      [S(`${kid(120, 80, 1.3, 'o')}${R(250, 130, 70, 100, '#e4f4ff', 12)}${R(256, 160, 58, 64, '#8fd0ff', 6)}${A(246, 180, 200, 150, '#e8604c')}`),
        ['慢慢喝几口水，打嗝很快就会好。', 'màn màn hē jǐ kǒu shuǐ, dǎ gé hěn kuài jiù huì hǎo.', 'Quelques petites gorgées d’eau, et le hoquet passe vite.']],
    ],
    ['打嗝一般不疼，过一会儿就停了。', 'dǎ gé yī bān bù téng, guò yī huì er jiù tíng le.', 'Le hoquet ne fait pas mal et s’arrête tout seul.'],
    [
      [['打嗝是什么在抖？', 'dǎ gé shì shén me zài dǒu?', 'Qu’est-ce qui sursaute quand on a le hoquet?'],
        [['肺下面的肌肉', 'fèi xià miàn de jī ròu', 'Le muscle sous les poumons', '🫁'], ['脚趾', 'jiǎo zhǐ', 'Les orteils', '🦶'], ['头发', 'tóu fa', 'Les cheveux', '💇']], 0],
      [['打嗝了，可以怎么办？', 'dǎ gé le, kě yǐ zěn me bàn?', 'Que peut-on faire quand on a le hoquet?'],
        [['慢慢喝水', 'màn màn hē shuǐ', 'Boire doucement de l’eau', '🥤'], ['大声尖叫', 'dà shēng jiān jiào', 'Crier fort', '📣'], ['倒立跑步', 'dào lì pǎo bù', 'Courir à l’envers', '🙃']], 0],
    ]),

  // ───────── niveau 2 ─────────
  T('grandir', '📏', 2,
    ['为什么会长高？', 'wèi shén me huì zhǎng gāo', 'Pourquoi grandit-on?'],
    [
      [S(`${kid(90, 130, 0.9)}${kid(210, 100, 1.1)}${kid(330, 70, 1.3)}${L(20, 275, 380, 275, O, 4)}${A(90, 110, 90, 75, '#e8604c')}`),
        ['小朋友每年都会长高一点点。', 'xiǎo péng yǒu měi nián dōu huì zhǎng gāo yī diǎn diǎn.', 'Les enfants grandissent un peu chaque année.']],
      [S(`${bone(200, 150, 100, 1.2, 90)}${A(200, 62, 200, 30, '#e8604c')}${A(200, 238, 200, 270, '#e8604c')}${E(200, 82, 34, 8, '#9fd9a6')}${E(200, 218, 34, 8, '#9fd9a6')}`),
        ['骨头两头有软软的地方，会慢慢变长。', 'gǔ tou liǎng tóu yǒu ruǎn ruǎn de dì fang, huì màn màn biàn cháng.', 'Les os ont des bouts mous qui s’allongent peu à peu.']],
      [S(`${C(70, 150, 28, '#ff6b5e')}${moon(200, 150, 1.8)}${C(330, 150, 40, '#fff')}${P('M295 140Q330 120 365 140M295 160Q330 180 365 160', 'none')}${L(330, 110, 330, 190)}`),
        ['吃好东西、睡好觉、多运动，长得更好。', 'chī hǎo dōng xi, shuì hǎo jiào, duō yùn dòng, zhǎng de gèng hǎo.', 'Bien manger, bien dormir et bouger aident à bien grandir.']],
    ],
    ['有的人长得快，有的人长得慢，都很正常。', 'yǒu de rén zhǎng de kuài, yǒu de rén zhǎng de màn, dōu hěn zhèng cháng.', 'Certains grandissent vite, d’autres lentement : c’est normal.'],
    [
      [['哪样会帮助我们长高？', 'nǎ yàng huì bāng zhù wǒ men zhǎng gāo?', 'Qu’est-ce qui aide à grandir?'],
        [['睡好觉', 'shuì hǎo jiào', 'Bien dormir', '😴'], ['一直不动', 'yī zhí bù dòng', 'Ne jamais bouger', '🪑'], ['只吃糖', 'zhǐ chī táng', 'Manger seulement des bonbons', '🍬']], 0],
      [['骨头怎么会变长？', 'gǔ tou zěn me huì biàn cháng?', 'Comment les os s’allongent-ils?'],
        [['两头慢慢长', 'liǎng tóu màn màn zhǎng', 'Ils poussent aux deux bouts', '🦴'], ['被人拉长', 'bèi rén lā cháng', 'On les étire', '🤝'], ['泡在水里', 'pào zài shuǐ lǐ', 'Ils trempent dans l’eau', '🛁']], 0],
    ]),

  T('dents-lait', '🦷', 2,
    ['为什么要换牙？', 'wèi shén me yào huàn yá', 'Pourquoi perd-on ses dents de bébé?'],
    [
      [S(`${R(50, 80, 300, 70, '#ff9a9a', 28)}${[0, 1, 2, 3, 4].map((i) => tooth(105 + i * 48, 175, 0.9)).join('')}`),
        ['小时候的牙齿，叫乳牙，又小又少。', 'xiǎo shí hou de yá chǐ, jiào rǔ yá, yòu xiǎo yòu shǎo.', 'Les dents de bébé sont petites et peu nombreuses.']],
      [S(`${R(50, 50, 300, 60, '#ff9a9a', 28)}${tooth(150, 150, 1.3, '#fff')}${tooth(260, 190, 1.9, '#ffe9a8')}${A(260, 285, 260, 245, '#e8604c')}${L(168, 120, 168, 140, '#e8604c', 4)}`),
        ['新牙在下面长大，把乳牙顶松。', 'xīn yá zài xià miàn zhǎng dà, bǎ rǔ yá dǐng sōng.', 'Les dents d’adulte poussent dessous et font bouger les dents de bébé.']],
      [S(`${tooth(120, 150, 2.4)}${A(190, 150, 235, 150, '#e8604c')}${tooth(300, 150, 3)}${star(345, 90, 1.3)}`),
        ['新牙很大、很结实，要好好爱护。', 'xīn yá hěn dà, hěn jiē shi, yào hǎo hāo ài hù.', 'Les nouvelles dents sont grandes et solides : prends-en grand soin.']],
    ],
    ['大人一共有二十八到三十二颗牙。', 'dà rén yī gòng yǒu èr shí bā dào sān shí èr kē yá.', 'Un adulte a de vingt-huit à trente-deux dents.'],
    [
      [['乳牙松了以后，会怎么样？', 'rǔ yá sōng le yǐ hòu, huì zěn me yàng?', 'Quand la dent de bébé bouge, que se passe-t-il?'],
        [['长出新牙', 'zhǎng chū xīn yá', 'Une nouvelle dent pousse', '🦷'], ['长出翅膀', 'zhǎng chū chì bǎng', 'Des ailes poussent', '🪽'], ['变成石头', 'biàn chéng shí tou', 'Elle devient un caillou', '🪨']], 0],
      [['新牙长出来以后要怎么办？', 'xīn yá zhǎng chū lái yǐ hòu yào zěn me bàn?', 'Que faire des dents d’adulte?'],
        [['好好刷牙', 'hǎo hāo shuā yá', 'Bien les brosser', '🪥'], ['不用管它', 'bù yòng guǎn tā', 'Les ignorer', '🙈'], ['再换一次', 'zài huàn yī cì', 'Les changer encore', '🔁']], 0],
    ]),

  T('doigts-rides', '🛁', 2,
    ['为什么手指泡水会皱？', 'wèi shén me shǒu zhǐ pào shuǐ huì zhòu', 'Pourquoi les doigts se plissent-ils dans l’eau?'],
    [
      [S(`${R(0, 210, 400, 90, '#8fd0ff', 0)}${R(150, 70, 100, 170, '#ffd9b8', 40)}${P('M165 110Q200 95 235 110M165 140Q200 125 235 140M165 170Q200 155 235 170', 'none')}${drop(100, 150, 1.3)}${drop(310, 140, 1.3)}`),
        ['在水里泡久了，手指的皮肤会起皱。', 'zài shuǐ lǐ pào jiǔ le, shǒu zhǐ de pí fū huì qǐ zhòu.', 'Après un long moment dans l’eau, la peau des doigts se plisse.']],
      [S(`${R(40, 120, 320, 40, '#ffd9b8', 8)}${R(40, 160, 320, 90, '#f7b98d', 8)}${A(100, 30, 100, 105, '#5bb5f0')}${A(200, 30, 200, 105, '#5bb5f0')}${A(300, 30, 300, 105, '#5bb5f0')}`),
        ['这是身体自己做的小变化，不疼也不会坏。', 'zhè shì shēn tǐ zì jǐ zuò de xiǎo biàn huà, bù téng yě bù huì huài.', 'C’est un petit changement du corps : ça ne fait pas mal.']],
      [S(`${R(40, 90, 150, 130, '#e4f4ff', 14)}${P('M60 140Q90 120 120 140M60 170Q90 150 120 170', 'none')}${C(280, 150, 40, '#8fd0ff')}${A(40, 250, 80, 225, '#e8604c')}`),
        ['有皱纹的手指，抓湿东西更稳。', 'yǒu zhòu wén de shǒu zhǐ, zhuā shī dōng xi gèng wěn.', 'Des doigts plissés agrippent mieux les objets mouillés.']],
    ],
    ['手指出水以后，皱纹很快就会不见。', 'shǒu zhǐ chū shuǐ yǐ hòu, zhòu wén hěn kuài jiù huì bù jiàn.', 'Hors de l’eau, les plis disparaissent vite.'],
    [
      [['泡澡太久，手指会怎么样？', 'pào zǎo tài jiǔ, shǒu zhǐ huì zěn me yàng?', 'Après un long bain, que deviennent les doigts?'],
        [['起皱纹', 'qǐ zhòu wén', 'Ils se plissent', '🖐️'], ['变得更长', 'biàn de gèng cháng', 'Ils s’allongent', '📏'], ['变成蓝色', 'biàn chéng lán sè', 'Ils deviennent bleus', '🔵']], 0],
      [['手指上的皱纹，会一直都在吗？', 'shǒu zhǐ shàng de zhòu wén, huì yī zhí dōu zài ma?', 'Les plis restent-ils pour toujours?'],
        [['不会，很快就好', 'bù huì, hěn kuài jiù hǎo', 'Non, ils partent vite', '✅'], ['会，一辈子', 'huì, yī bèi zi', 'Oui, toute la vie', '❌'], ['会越来越多', 'huì yuè lái yuè duō', 'Il y en a de plus en plus', '📈']], 0],
    ]),

  T('chair-poule', '🐔', 2,
    ['为什么会起鸡皮疙瘩？', 'wèi shén me huì qǐ jī pí gē da', 'Pourquoi a-t-on la chair de poule?'],
    [
      [S(`${R(40, 200, 320, 70, '#ffd9b8', 8)}${[80, 160, 240, 320].map((x) => L(x, 200, x, 150, '#6b4a3a', 5)).join('')}${cloud(330, 70, 1, '#e4f4ff')}${dot(60, 60, 5, '#fff')}${dot(100, 100, 4, '#bfe3fa')}`, '#e4f4ff'),
        ['很冷，或者被吓一跳，皮肤会起小疙瘩。', 'hěn lěng, huò zhě bèi xià yī tiào, pí fū huì qǐ xiǎo gē da.', 'Quand on a froid ou peur, la peau fait de petits boutons.']],
      [S(`${R(40, 190, 320, 80, '#ffd9b8', 8)}${[80, 160, 240, 320].map((x) => `${P(`M${x - 18} 190Q${x} 165 ${x + 18} 190`, '#f7b98d')}${L(x, 175, x - 6, 120, '#6b4a3a', 5)}`).join('')}${A(30, 250, 30, 205, '#e8604c')}`),
        ['每根汗毛下面有小肌肉，一缩就把毛竖起来。', 'měi gēn hàn máo xià miàn yǒu xiǎo jī ròu, yī suō jiù bǎ máo shù qǐ lái.', 'Sous chaque poil, un petit muscle se contracte et le redresse.']],
      [S(`${G(150, 150, 1.5, `${E(0, 20, 50, 40, '#f0b27a')}${C(-35, -22, 24, '#f0b27a')}${P('M-52 -40L-48 -64L-34 -46Z', '#f0b27a')}${P('M-26 -40L-20 -64L-12 -40Z', '#f0b27a')}${dot(-42, -22, 3, O)}${dot(-28, -22, 3, O)}`)}${[0, 1, 2, 3, 4].map((i) => L(250 + i * 12, 200, 244 + i * 12, 170, '#6b4a3a', 3)).join('')}`),
        ['毛竖起来，能留住一层暖暖的空气。', 'máo shù qǐ lái, néng liú zhù yī céng nuǎn nuǎn de kōng qì.', 'Les poils dressés gardent une couche d’air chaud.']],
    ],
    ['小猫小狗害怕时，毛也会竖起来。', 'xiǎo māo xiǎo gǒu hài pà shí, máo yě huì shù qǐ lái.', 'Quand un chat ou un chien a peur, son poil se hérisse aussi.'],
    [
      [['什么时候会起鸡皮疙瘩？', 'shén me shí hou huì qǐ jī pí gē da?', 'Quand a-t-on la chair de poule?'],
        [['觉得很冷的时候', 'jué de hěn lěng de shí hou', 'Quand on a froid', '🥶'], ['吃饱饭的时候', 'chī bǎo fàn de shí hou', 'Quand on a bien mangé', '🍚'], ['看书的时候', 'kàn shū de shí hou', 'Quand on lit', '📖']], 0],
      [['什么让汗毛竖起来？', 'shén me ràng hàn máo shù qǐ lái?', 'Qu’est-ce qui redresse les poils?'],
        [['小肌肉', 'xiǎo jī ròu', 'De petits muscles', '💪'], ['小风扇', 'xiǎo fēng shàn', 'Un petit ventilateur', '🌀'], ['小梳子', 'xiǎo shū zi', 'Un petit peigne', '🪮']], 0],
    ]),

  T('legumes', '🥦', 2,
    ['为什么要吃蔬菜？', 'wèi shén me yào chī shū cài', 'Pourquoi faut-il manger des légumes?'],
    [
      [S(`${E(200, 190, 150, 80, '#fff')}${G(120, 185, 1.2, `${C(0, 0, 24, '#4caf50')}${R(-5, 20, 10, 22, '#8bc34a', 4)}`)}${G(205, 190, 1, `${P('M-14 -30L14 -30L8 30L-8 30Z', '#f08a4b')}${P('M-8 -30L0 -46L8 -30', '#4caf50')}`)}${C(280, 190, 24, '#e8604c')}`),
        ['蔬菜有红的、绿的、橙色的，真好看。', 'shū cài yǒu hóng de, lǜ de, chéng sè de, zhēn hǎo kàn.', 'Les légumes sont rouges, verts, orange… tout un arc-en-ciel!']],
      [S(`${kid(110, 80, 1.3, 'smile')}${A(190, 150, 250, 150, '#e8604c')}${G(310, 150, 1.4, P('M-24 8Q-10 -14 0 -34Q10 -14 24 8Q10 14 0 26Q-10 14 -24 8Z', '#6cc26c'))}`),
        ['蔬菜里有养分，让身体长得壮。', 'shū cài lǐ yǒu yǎng fèn, ràng shēn tǐ zhǎng de zhuàng.', 'Les légumes donnent au corps de quoi devenir fort.']],
      [S(`${cut()}${stomach(200, 195, 1.0)}${P('M165 245Q200 275 235 245', 'none', 'stroke="#6cc26c" stroke-width="6"')}${star(330, 90, 1.4)}`),
        ['蔬菜还帮助肚子，让我们好好上厕所。', 'shū cài hái bāng zhù dù zi, ràng wǒ men hǎo hāo shàng cè suǒ.', 'Les légumes aident aussi le ventre à bien digérer.']],
    ],
    ['每天吃不同颜色的蔬菜最棒。', 'měi tiān chī bù tóng yán sè de shū cài zuì bàng.', 'Mange des légumes de plusieurs couleurs chaque jour : c’est génial.'],
    [
      [['哪个是蔬菜？', 'nǎ gè shì shū cài?', 'Lequel est un légume?'],
        [['胡萝卜', 'hú luó bo', 'La carotte', '🥕'], ['巧克力', 'qiǎo kè lì', 'Le chocolat', '🍫'], ['薯片', 'shǔ piàn', 'Les croustilles', '🍟']], 0],
      [['吃蔬菜对身体有什么好处？', 'chī shū cài duì shēn tǐ yǒu shén me hǎo chù?', 'À quoi servent les légumes pour le corps?'],
        [['长得壮', 'zhǎng de zhuàng', 'Devenir fort', '💪'], ['变成菜叶', 'biàn chéng cài yè', 'Devenir une feuille', '🍃'], ['不用刷牙', 'bù yòng shuā yá', 'Ne plus se brosser les dents', '🚫']], 0],
    ]),

  T('fievre', '🌡️', 2,
    ['为什么会发烧？', 'wèi shén me huì fā shāo', 'Pourquoi a-t-on de la fièvre?'],
    [
      [S(`${R(86, 50, 28, 150, '#fff', 14)}${R(94, 90, 12, 110, '#e8604c', 6)}${C(100, 215, 26, '#e8604c')}${face(280, 150, 62, 'sad')}${dot(235, 175, 9, '#ff8f80', 0.9)}${dot(325, 175, 9, '#ff8f80', 0.9)}`),
        ['发烧，就是体温比平常高。', 'fā shāo, jiù shì tǐ wēn bǐ píng cháng gāo.', 'Avoir de la fièvre, c’est avoir la température plus haute que d’habitude.']],
      [S(`${germ(80, 140, 1.4)}${germ(110, 210, 1.1)}${A(150, 170, 220, 160, '#e8604c')}${C(300, 150, 54, '#ffb3a7')}${[0, 1, 2, 3, 4, 5].map((i) => L((Math.cos(i * 1.047) * 60).toFixed(1) * 1 + 300, (Math.sin(i * 1.047) * 60).toFixed(1) * 1 + 150, (Math.cos(i * 1.047) * 78).toFixed(1) * 1 + 300, (Math.sin(i * 1.047) * 78).toFixed(1) * 1 + 150, '#e8604c', 5)).join('')}`),
        ['身体生病，会把自己变热，来对付细菌。', 'shēn tǐ shēng bìng, huì bǎ zì jǐ biàn rè, lái duì fu xì jūn.', 'Quand le corps est malade, il se réchauffe pour combattre les microbes.']],
      [S(`${R(70, 180, 260, 70, '#8ec5ff', 16)}${R(80, 150, 70, 46, '#fff', 20)}${face(115, 165, 24, 'shut')}${R(250, 100, 60, 90, '#e4f4ff', 10)}${R(254, 130, 52, 56, '#8fd0ff', 6)}`),
        ['发烧了，要多休息、多喝水，告诉大人。', 'fā shāo le, yào duō xiū xi, duō hē shuǐ, gào sù dà rén.', 'Avec de la fièvre, repose-toi, bois de l’eau et préviens un adulte.']],
    ],
    ['体温计会告诉我们，有多热。', 'tǐ wēn jì huì gào sù wǒ men, yǒu duō rè.', 'Le thermomètre nous dit à quel point on est chaud.'],
    [
      [['发烧是什么意思？', 'fā shāo shì shén me yì si?', 'Que veut dire avoir de la fièvre?'],
        [['体温变高了', 'tǐ wēn biàn gāo le', 'La température est plus haute', '🌡️'], ['头发着火了', 'tóu fa zháo huǒ le', 'Les cheveux brûlent', '🔥'], ['长高了', 'zhǎng gāo le', 'On a grandi', '📏']], 0],
      [['发烧了，应该怎么办？', 'fā shāo le, yīng gāi zěn me bàn?', 'Que faire quand on a de la fièvre?'],
        [['休息并告诉大人', 'xiū xi bìng gào sù dà rén', 'Se reposer et le dire à un adulte', '🛌'], ['出去跑步', 'chū qù pǎo bù', 'Aller courir dehors', '🏃'], ['自己吃药', 'zì jǐ chī yào', 'Prendre des médicaments tout seul', '💊']], 0],
    ]),

  T('vertige', '😵', 2,
    ['为什么转圈会头晕？', 'wèi shén me zhuàn quān huì tóu yūn', 'Pourquoi tourner fait-il tourner la tête?'],
    [
      [S(`${kid(200, 90, 1.2, 'smile')}${P('M70 160A130 40 0 0 1 330 160', 'none', 'stroke="#e8604c" stroke-width="5" stroke-dasharray="10 8"')}${P('M330 160A130 40 0 0 1 70 160', 'none', 'stroke="#e8604c" stroke-width="5" stroke-dasharray="10 8"')}`),
        ['我们转圈转得很快，转了好多圈。', 'wǒ men zhuàn quān zhuàn de hěn kuài, zhuàn le hǎo duō quān.', 'On tourne très vite, plusieurs tours de suite.']],
      [S(`${ear(130, 150, 1.4)}${C(290, 150, 56, '#e4f4ff')}${P('M265 140Q290 105 315 140Q325 175 290 185Q255 180 265 150', 'none', 'stroke="#5bb5f0" stroke-width="5"')}${dot(315, 160, 7, '#5bb5f0')}`),
        ['耳朵里有一点点水，帮我们站稳。', 'ěr duo lǐ yǒu yī diǎn diǎn shuǐ, bāng wǒ men zhàn wěn.', 'Dans l’oreille, un peu de liquide nous aide à garder l’équilibre.']],
      [S(`${face(130, 150, 66, 'sad')}${P('M215 150A60 60 0 1 1 300 100', 'none', 'stroke="#e8604c" stroke-width="5"')}${P('M240 150A35 35 0 1 1 290 128', 'none', 'stroke="#e8604c" stroke-width="5"')}${star(340, 70, 1.2)}${star(350, 210)}`),
        ['停下来后，水还在动，所以觉得晕。', 'tíng xià lái hòu, shuǐ hái zài dòng, suǒ yǐ jué de yūn.', 'Quand on s’arrête, le liquide bouge encore : ça donne le tournis.']],
    ],
    ['坐一会儿，头晕很快就会好。', 'zuò yī huì er, tóu yūn hěn kuài jiù huì hǎo.', 'Assieds-toi un peu : le tournis passe vite.'],
    [
      [['什么在帮我们站稳不倒？', 'shén me zài bāng wǒ men zhàn wěn bù dǎo?', 'Qu’est-ce qui nous aide à tenir debout?'],
        [['耳朵里的水', 'ěr duo lǐ de shuǐ', 'Le liquide dans l’oreille', '👂'], ['鼻子里的毛', 'bí zi lǐ de máo', 'Les poils du nez', '👃'], ['脚上的鞋', 'jiǎo shàng de xié', 'Les souliers', '👟']], 0],
      [['头晕了，可以怎么办？', 'tóu yūn le, kě yǐ zěn me bàn?', 'Quand la tête tourne, que faire?'],
        [['坐下来休息', 'zuò xià lái xiū xi', 'S’asseoir et se reposer', '🪑'], ['再转十圈', 'zài zhuàn shí quān', 'Tourner dix fois de plus', '🌀'], ['马上跑步', 'mǎ shàng pǎo bù', 'Courir tout de suite', '🏃']], 0],
    ]),

  T('oreille', '👂', 2,
    ['耳朵为什么能听到声音？', 'ěr duo wèi shén me néng tīng dào shēng yīn', 'Comment l’oreille entend-elle les sons?'],
    [
      [S(`${C(60, 150, 28, '#ffd9b8')}${dot(52, 146, 3, O)}${dot(68, 146, 3, O)}${E(86, 158, 12, 8, '#c0504d')}${P('M130 120Q145 150 130 180', 'none', 'stroke="#5bb5f0" stroke-width="5"')}${P('M155 105Q180 150 155 195', 'none', 'stroke="#5bb5f0" stroke-width="5"')}${P('M180 90Q215 150 180 210', 'none', 'stroke="#5bb5f0" stroke-width="5"')}${ear(300, 150, 1.5)}`),
        ['声音像看不见的小波浪，飘到耳朵里。', 'shēng yīn xiàng kàn bù jiàn de xiǎo bō làng, piāo dào ěr duo lǐ.', 'Le son voyage comme de petites vagues invisibles jusqu’à l’oreille.']],
      [S(`${R(30, 120, 110, 60, '#ffd9b8', 20)}${E(190, 150, 12, 56, '#f4a3b0')}${A(60, 150, 170, 150, '#5bb5f0')}${P('M215 150Q260 110 300 150Q260 190 215 150', '#ffe0b0')}${P('M205 100Q198 150 205 200', 'none', 'stroke="#e8604c" stroke-width="3"')}`),
        ['耳朵里有层薄膜，声音一来就抖一抖。', 'ěr duo lǐ yǒu céng báo mó, shēng yīn yī lái jiù dǒu yī dǒu.', 'Dans l’oreille, une fine membrane vibre quand le son arrive.']],
      [S(`${ear(90, 150, 1.1)}${A(150, 150, 230, 130, '#e8604c')}${brain(300, 120, 1.3)}${star(300, 215, 1)}`),
        ['这个抖动变成信号，送到大脑，我们就听懂了。', 'zhè gè dǒu dòng biàn chéng xìn hào, sòng dào dà nǎo, wǒ men jiù tīng dǒng le.', 'Cette vibration devient un signal envoyé au cerveau : on comprend le son!']],
    ],
    ['太大的声音会伤耳朵，要小心。', 'tài dà de shēng yīn huì shāng ěr duo, yào xiǎo xīn.', 'Les sons trop forts abîment les oreilles : attention!'],
    [
      [['声音是怎么传来的？', 'shēng yīn shì zěn me chuán lái de?', 'Comment le son voyage-t-il?'],
        [['像波浪一样', 'xiàng bō làng yī yàng', 'Comme des vagues', '🌊'], ['像小鸟飞来', 'xiàng xiǎo niǎo fēi lái', 'Comme un oiseau qui vole', '🐦'], ['像雨点掉落', 'xiàng yǔ diǎn diào luò', 'Comme des gouttes de pluie', '🌧️']], 0],
      [['谁来听懂声音？', 'shéi lái tīng dǒng shēng yīn?', 'Qui comprend le son?'],
        [['大脑', 'dà nǎo', 'Le cerveau', '🧠'], ['膝盖', 'xī gài', 'Le genou', '🦵'], ['肚脐', 'dù qí', 'Le nombril', '⭕']], 0],
    ]),

  T('cheveux', '💇', 2,
    ['为什么头发会长？', 'wèi shén me tóu fa huì zhǎng', 'Pourquoi les cheveux poussent-ils?'],
    [
      [S(`${R(60, 190, 280, 80, '#ffd9b8', 8)}${[100, 160, 220, 280].map((x) => P(`M${x} 190Q${x - 10} 120 ${x + 10} 80`, 'none', 'stroke="#6b4a3a" stroke-width="6"')).join('')}`),
        ['头皮里有小小的发根，头发从那里长出来。', 'tóu pí lǐ yǒu xiǎo xiǎo de fà gēn, tóu fa cóng nà lǐ zhǎng chū lái.', 'Les cheveux poussent à partir de petites racines dans le cuir chevelu.']],
      [S(`${R(60, 190, 280, 80, '#ffd9b8', 8)}${[100, 200, 300].map((x) => `${P(`M${x} 190Q${x - 6} 150 ${x} 110`, 'none', 'stroke="#6b4a3a" stroke-width="6"')}${C(x, 205, 12, '#f7b98d')}${A(x + 30, 170, x + 30, 120, '#e8604c')}`).join('')}`),
        ['发根不停地做新的头发，把旧的顶上去。', 'fà gēn bù tíng de zuò xīn de tóu fa, bǎ jiù de dǐng shàng qù.', 'La racine fabrique sans cesse du cheveu neuf qui pousse l’ancien.']],
      [S(`${face(130, 160, 70, 'smile')}${P('M270 90L330 210M330 90L270 210', 'none', 'stroke="#9aa0b8" stroke-width="7"')}${C(262, 226, 14, 'none')}${C(338, 226, 14, 'none')}${star(350, 60)}`),
        ['剪头发不会疼，因为剪的是头发外面的部分。', 'jiǎn tóu fa bù huì téng, yīn wèi jiǎn de shì tóu fa wài miàn de bù fen.', 'Se faire couper les cheveux ne fait pas mal : on coupe la partie qui dépasse.']],
    ],
    ['头发每个月大约长一厘米。', 'tóu fa měi gè yuè dà yuē zhǎng yī lí mǐ.', 'Les cheveux poussent d’environ un centimètre par mois.'],
    [
      [['头发是从哪里长出来的？', 'tóu fa shì cóng nǎ lǐ zhǎng chū lái de?', 'D’où poussent les cheveux?'],
        [['头皮里的发根', 'tóu pí lǐ de fà gēn', 'De la racine dans le cuir chevelu', '🌱'], ['耳朵里', 'ěr duo lǐ', 'De l’intérieur de l’oreille', '👂'], ['帽子里', 'mào zi lǐ', 'De l’intérieur du chapeau', '🧢']], 0],
      [['剪头发为什么不疼？', 'jiǎn tóu fa wèi shén me bù téng?', 'Pourquoi la coupe ne fait-elle pas mal?'],
        [['剪的是外面那段', 'jiǎn de shì wài miàn nà duàn', 'On coupe le bout qui dépasse', '✂️'], ['剪刀是软的', 'jiǎn dāo shì ruǎn de', 'Les ciseaux sont mous', '🧸'], ['头发在睡觉', 'tóu fa zài shuì jiào', 'Les cheveux dorment', '😴']], 0],
    ]),

  T('croute', '🩹', 2,
    ['为什么受伤会结痂？', 'wèi shén me shòu shāng huì jié jiā', 'Pourquoi une croûte se forme-t-elle sur une plaie?'],
    [
      [S(`${R(40, 130, 320, 40, '#ffd9b8', 6)}${R(40, 170, 320, 80, '#f7b98d', 6)}${P('M170 130L190 175L225 130Z', '#fdf6e3')}${drop(195, 105, 1.2, '#e8604c')}${drop(150, 100, 0.8, '#e8604c')}`),
        ['摔破皮了，会流一点点血。', 'shuāi pò pí le, huì liú yī diǎn diǎn xuè.', 'Si on s’écorche, un peu de sang coule.']],
      [S(`${R(40, 130, 320, 40, '#ffd9b8', 6)}${R(40, 170, 320, 80, '#f7b98d', 6)}${P('M155 130Q200 100 245 130L230 175L170 175Z', '#b9654a')}`),
        ['血会变得黏黏的，盖住伤口，就是痂。', 'xuè huì biàn de nián nián de, gài zhù shāng kǒu, jiù shì jiā.', 'Le sang devient collant et couvre la plaie : c’est la croûte.']],
      [S(`${R(40, 130, 320, 40, '#ffd9b8', 6)}${R(40, 170, 320, 80, '#f7b98d', 6)}${P('M155 130Q200 100 245 130L230 160L170 160Z', '#b9654a')}${P('M175 165Q200 190 225 165L225 175L175 175Z', '#ffb3a7')}${A(300, 60, 215, 150, '#e8604c')}`),
        ['痂下面，新的皮肤在长。不要去抠它。', 'jiā xià miàn, xīn de pí fū zài zhǎng. bù yào qù kōu tā.', 'Sous la croûte, la peau neuve pousse. Ne la gratte pas.']],
    ],
    ['伤口痛得厉害或者很大，要找大人帮忙。', 'shāng kǒu tòng de lì hai huò zhě hěn dà, yào zhǎo dà rén bāng máng.', 'Si la plaie fait très mal ou est grande, demande l’aide d’un adulte.'],
    [
      [['痂是用什么变成的？', 'jiā shì yòng shén me biàn chéng de?', 'De quoi la croûte est-elle faite?'],
        [['变干的血', 'biàn gān de xuè', 'De sang séché', '🩸'], ['小饼干', 'xiǎo bǐng gān', 'De biscuit', '🍪'], ['泥巴', 'ní ba', 'De boue', '🟤']], 0],
      [['痂下面发生了什么？', 'jiā xià miàn fā shēng le shén me?', 'Que se passe-t-il sous la croûte?'],
        [['新皮肤在长', 'xīn pí fū zài zhǎng', 'La peau neuve pousse', '🌱'], ['有小虫子', 'yǒu xiǎo chóng zi', 'Il y a des petites bêtes', '🐛'], ['什么也没有', 'shén me yě méi yǒu', 'Rien du tout', '❌']], 0],
    ]),

  T('os', '🦴', 2,
    ['骨头有什么用？', 'gǔ tou yǒu shén me yòng', 'À quoi servent les os?'],
    [
      [S(`${G(200, 150, 1, `${C(0, -90, 32, '#fff')}${dot(-12, -94, 6, O)}${dot(12, -94, 6, O)}${R(-6, -56, 12, 90, '#fff', 4)}${P('M-40 -42Q0 -26 40 -42', 'none')}${P('M-36 -22Q0 -6 36 -22', 'none')}${P('M-30 -2Q0 14 30 -2', 'none')}${R(-28, 40, 56, 16, '#fff', 8)}${R(-30, 56, 12, 70, '#fff', 6)}${R(18, 56, 12, 70, '#fff', 6)}${R(-46, -48, 10, 70, '#fff', 5)}${R(36, -48, 10, 70, '#fff', 5)}`)}`),
        ['身体里有很多骨头，合起来像一个架子。', 'shēn tǐ lǐ yǒu hěn duō gǔ tou, hé qǐ lái xiàng yī gè jià zi.', 'Le corps a beaucoup d’os qui forment ensemble une charpente.']],
      [S(`${kid(110, 70, 1.2, 'smile')}${A(200, 150, 240, 150, '#e8604c')}${R(260, 150, 40, 100, '#ffb3a7', 20)}${R(310, 150, 40, 100, '#ffb3a7', 20)}${C(280, 110, 26, '#ffb3a7')}`),
        ['有骨头撑着，我们才能站直、跑跳。', 'yǒu gǔ tou chēng zhe, wǒ men cái néng zhàn zhí, pǎo tiào.', 'Grâce aux os, on tient debout, on court et on saute.']],
      [S(`${C(120, 110, 62, '#fff')}${C(120, 120, 34, '#f4a3b0')}${R(240, 60, 110, 170, '#fff', 44)}${heart(295, 140, 0.9)}${star(70, 240, 1)}`),
        ['头骨保护大脑，肋骨保护心和肺。', 'tóu gǔ bǎo hù dà nǎo, lèi gǔ bǎo hù xīn hé fèi.', 'Le crâne protège le cerveau; les côtes protègent le cœur et les poumons.']],
    ],
    ['宝宝出生时，大约有三百块骨头。', 'bǎo bao chū shēng shí, dà yuē yǒu sān bǎi kuài gǔ tou.', 'Un bébé naît avec environ trois cents os.'],
    [
      [['头骨保护什么？', 'tóu gǔ bǎo hù shén me?', 'Que protège le crâne?'],
        [['大脑', 'dà nǎo', 'Le cerveau', '🧠'], ['肚子', 'dù zi', 'Le ventre', '🍽️'], ['脚趾', 'jiǎo zhǐ', 'Les orteils', '🦶']], 0],
      [['没有骨头，身体会怎么样？', 'méi yǒu gǔ tou, shēn tǐ huì zěn me yàng?', 'Sans os, que deviendrait le corps?'],
        [['软软地站不直', 'ruǎn ruǎn de zhàn bù zhí', 'Mou, impossible de se tenir droit', '🫠'], ['跑得更快', 'pǎo de gèng kuài', 'On courrait plus vite', '🏃'], ['变得很高', 'biàn de hěn gāo', 'On serait très grand', '📏']], 0],
    ]),

  T('poumons', '🫁', 2,
    ['肺怎么呼吸？', 'fèi zěn me hū xī', 'Comment les poumons respirent-ils?'],
    [
      [S(`${cut()}${lungs(200, 165, 1.1)}`),
        ['肺在胸口里，一左一右，像两个气球。', 'fèi zài xiōng kǒu lǐ, yī zuǒ yī yòu, xiàng liǎng gè qì qiú.', 'Les poumons, un à gauche, un à droite, sont comme deux ballons dans la poitrine.']],
      [S(`${lungs(200, 170, 2.2, '#f08aa0')}${A(200, 8, 200, 60, '#5bb5f0')}${dot(165, 170, 6, '#bfe3fa')}${dot(235, 170, 6, '#bfe3fa')}${dot(185, 215, 5, '#bfe3fa')}`),
        ['吸气的时候，空气进来，肺就鼓起来。', 'xī qì de shí hou, kōng qì jìn lái, fèi jiù gǔ qǐ lái.', 'On inspire : l’air entre et les poumons se gonflent.']],
      [S(`${lungs(200, 190, 1.5, '#f4a3b0')}${A(200, 120, 200, 25, '#e8604c')}`),
        ['呼气的时候，空气出去，肺就缩小。', 'hū qì de shí hou, kōng qì chū qù, fèi jiù suō xiǎo.', 'On expire : l’air sort et les poumons dégonflent.']],
    ],
    ['空气里的氧气，会让身体有力气。', 'kōng qì lǐ de yǎng qì, huì ràng shēn tǐ yǒu lì qi.', 'L’oxygène de l’air donne de la force au corps.'],
    [
      [['吸气的时候，肺会怎么样？', 'xī qì de shí hou, fèi huì zěn me yàng?', 'Quand on inspire, que font les poumons?'],
        [['鼓起来', 'gǔ qǐ lái', 'Ils se gonflent', '🎈'], ['缩得更小', 'suō de gèng xiǎo', 'Ils rapetissent', '🔻'], ['跑出身体', 'pǎo chū shēn tǐ', 'Ils sortent du corps', '🏃']], 0],
      [['肺有几个？', 'fèi yǒu jǐ gè?', 'Combien a-t-on de poumons?'],
        [['两个', 'liǎng gè', 'Deux', '2️⃣'], ['一百个', 'yī bǎi gè', 'Cent', '💯'], ['没有', 'méi yǒu', 'Aucun', '🚫']], 0],
    ]),

  // ───────── niveau 3 ─────────
  T('yeux-voir', '👀', 3,
    ['眼睛为什么能看东西？', 'yǎn jing wèi shén me néng kàn dōng xi', 'Comment les yeux voient-ils?'],
    [
      [S(`${sun(60, 60, 0.9)}${G(150, 190, 1, `${P('M-16 20L0 -50L16 20Z', '#e8604c')}${R(-26, 20, 52, 20, '#8a5a3c', 4)}`)}${A(190, 170, 260, 150, '#f2a900')}${eye(330, 140, 0.8)}`),
        ['光照在东西上，再弹进我们的眼睛。', 'guāng zhào zài dōng xi shàng, zài tán jìn wǒ men de yǎn jing.', 'La lumière frappe les objets, puis rebondit dans nos yeux.']],
      [S(`${C(210, 150, 100, '#fff')}${E(135, 150, 12, 36, '#cfe9ff')}${P('M290 100Q325 150 290 200', 'none', 'stroke="#e8604c" stroke-width="6"')}${A(20, 150, 118, 150, '#f2a900')}${A(150, 150, 280, 150, '#f2a900')}`),
        ['眼睛前面有个小镜片，把光聚起来。', 'yǎn jing qián miàn yǒu gè xiǎo jìng piàn, bǎ guāng jù qǐ lái.', 'À l’avant de l’œil, une petite lentille rassemble la lumière.']],
      [S(`${eye(90, 150, 0.9)}${A(150, 150, 220, 150, '#e8604c')}${brain(310, 150, 1.5)}`),
        ['眼睛把光变成信号，送给大脑，大脑告诉我们看见了什么。', 'yǎn jing bǎ guāng biàn chéng xìn hào, sòng gěi dà nǎo, dà nǎo gào sù wǒ men kàn jiàn le shén me.', 'L’œil transforme la lumière en signal pour le cerveau, qui nous dit ce qu’on voit.']],
    ],
    ['天黑了没有光，我们就什么也看不见。', 'tiān hēi le méi yǒu guāng, wǒ men jiù shén me yě kàn bù jiàn.', 'Sans lumière, dans le noir complet, on ne voit rien.'],
    [
      [['我们能看见东西，需要什么？', 'wǒ men néng kàn jiàn dōng xi, xū yào shén me?', 'De quoi a-t-on besoin pour voir?'],
        [['光', 'guāng', 'De la lumière', '💡'], ['声音', 'shēng yīn', 'Du son', '🔊'], ['香味', 'xiāng wèi', 'Une odeur', '🌸']], 0],
      [['眼睛前面的小镜片做什么？', 'yǎn jing qián miàn de xiǎo jìng piàn zuò shén me?', 'Que fait la petite lentille de l’œil?'],
        [['把光聚起来', 'bǎ guāng jù qǐ lái', 'Elle rassemble la lumière', '🔍'], ['发出声音', 'fā chū shēng yīn', 'Elle fait du bruit', '🔊'], ['擦干眼泪', 'cā gān yǎn lèi', 'Elle essuie les larmes', '🧻']], 0],
      [['谁来告诉我们看见了什么？', 'shéi lái gào sù wǒ men kàn jiàn le shén me?', 'Qui nous dit ce qu’on voit?'],
        [['大脑', 'dà nǎo', 'Le cerveau', '🧠'], ['手指', 'shǒu zhǐ', 'Les doigts', '🖐️'], ['膝盖', 'xī gài', 'Les genoux', '🦵']], 0],
    ]),

  T('reves', '💭', 3,
    ['为什么会做梦？', 'wèi shén me huì zuò mèng', 'Pourquoi fait-on des rêves?'],
    [
      [S(`${R(60, 190, 280, 80, '#8ec5ff', 16)}${R(70, 164, 90, 50, '#fff', 20)}${face(120, 180, 30, 'shut')}${C(185, 140, 7, '#fff')}${C(215, 110, 11, '#fff')}${cloud(290, 70, 1.6)}${star(290, 70, 0.9)}`, '#e9ecff'),
        ['我们睡着的时候，常常会做梦。', 'wǒ men shuì zháo de shí hou, cháng cháng huì zuò mèng.', 'Quand on dort, on fait souvent des rêves.']],
      [S(`${brain(200, 150, 2.2)}${P('M40 60Q70 40 100 60Q130 80 160 60', 'none', 'stroke="#5b8fe0" stroke-width="4"')}${P('M250 40Q280 20 310 40Q340 60 370 40', 'none', 'stroke="#5b8fe0" stroke-width="4"')}${star(70, 240, 1)}${star(340, 240, 1)}`),
        ['睡觉时，大脑还在忙，会想白天的事。', 'shuì jiào shí, dà nǎo hái zài máng, huì xiǎng bái tiān de shì.', 'Pendant le sommeil, le cerveau reste actif et repense à la journée.']],
      [S(`${cloud(110, 150, 2.2, '#cfe6fa')}${A(190, 150, 250, 150, '#e8604c')}${C(320, 150, 36, '#eee')}${P('M300 140Q320 125 340 140', 'none')}`),
        ['醒来以后，我们常常把梦忘掉了。', 'xǐng lái yǐ hòu, wǒ men cháng cháng bǎ mèng wàng diào le.', 'Au réveil, on oublie souvent ses rêves.']],
    ],
    ['科学家还在研究，我们为什么会做梦。', 'kē xué jiā hái zài yán jiū, wǒ men wèi shén me huì zuò mèng.', 'Les scientifiques cherchent encore pourquoi on rêve.'],
    [
      [['我们什么时候会做梦？', 'wǒ men shén me shí hou huì zuò mèng?', 'Quand fait-on des rêves?'],
        [['睡着的时候', 'shuì zháo de shí hou', 'Pendant le sommeil', '😴'], ['洗澡的时候', 'xǐ zǎo de shí hou', 'Pendant le bain', '🛁'], ['跑步的时候', 'pǎo bù de shí hou', 'Pendant la course', '🏃']], 0],
      [['睡觉时，大脑在做什么？', 'shuì jiào shí, dà nǎo zài zuò shén me?', 'Que fait le cerveau pendant le sommeil?'],
        [['还在忙着想事情', 'hái zài máng zhe xiǎng shì qing', 'Il reste actif et pense', '🧠'], ['完全停下来', 'wán quán tíng xià lái', 'Il s’arrête complètement', '⏹️'], ['出去玩', 'chū qù wán', 'Il sort jouer', '🎈']], 0],
      [['醒来以后，梦常常会怎么样？', 'xǐng lái yǐ hòu, mèng cháng cháng huì zěn me yàng?', 'Au réveil, que devient souvent le rêve?'],
        [['被忘掉', 'bèi wàng diào', 'On l’oublie', '💭'], ['变成真的', 'biàn chéng zhēn de', 'Il devient réel', '✨'], ['留在枕头里', 'liú zài zhěn tou lǐ', 'Il reste dans l’oreiller', '🛏️']], 0],
    ]),

  T('rhume', '🤒', 3,
    ['为什么会感冒？', 'wèi shén me huì gǎn mào', 'Pourquoi attrape-t-on un rhume?'],
    [
      [S(`${face(110, 160, 66, 'sneeze')}${A(180, 160, 250, 130, '#5bb5f0')}${germ(285, 110, 1.3)}${germ(330, 170, 1)}${germ(270, 205, 1.1)}`),
        ['感冒是一种小病毒，跑进了身体。', 'gǎn mào shì yī zhǒng xiǎo bìng dú, pǎo jìn le shēn tǐ.', 'Un rhume vient de minuscules virus qui entrent dans le corps.']],
      [S(`${germ(300, 150, 1.8)}${[0, 1, 2].map((i) => C(120 + i * 8, 90 + i * 60, 24, '#fff') + dot(112 + i * 8, 86 + i * 60, 3, O) + dot(128 + i * 8, 86 + i * 60, 3, O)).join('')}${A(165, 120, 270, 140, '#e8604c')}`),
        ['身体里的小卫士，会出来打败它们。', 'shēn tǐ lǐ de xiǎo wèi shì, huì chū lái dǎ bài tā men.', 'De petits gardiens du corps se lèvent pour les combattre.']],
      [S(`${hand(90, 180, 1.3)}${R(300, 100, 60, 100, '#e4f4ff', 10)}${R(304, 140, 52, 56, '#8fd0ff', 6)}${star(220, 80, 1)}${C(220, 190, 30, '#fff')}${P('M205 190Q220 175 235 190', 'none')}`),
        ['勤洗手，多休息，多喝水，感冒会好得快。', 'qín xǐ shǒu, duō xiū xi, duō hē shuǐ, gǎn mào huì hǎo de kuài.', 'Se laver les mains, se reposer et boire de l’eau aident à guérir plus vite.']],
    ],
    ['感冒通常几天就会好起来。', 'gǎn mào tōng cháng jǐ tiān jiù huì hǎo qǐ lái.', 'Un rhume passe en général en quelques jours.'],
    [
      [['感冒是什么引起的？', 'gǎn mào shì shén me yǐn qǐ de?', 'Qu’est-ce qui cause un rhume?'],
        [['小病毒', 'xiǎo bìng dú', 'De petits virus', '🦠'], ['天上的月亮', 'tiān shàng de yuè liang', 'La lune', '🌙'], ['吃了蔬菜', 'chī le shū cài', 'Avoir mangé des légumes', '🥦']], 0],
      [['身体里谁来打败病毒？', 'shēn tǐ lǐ shéi lái dǎ bài bìng dú?', 'Qui combat les virus dans le corps?'],
        [['身体的小卫士', 'shēn tǐ de xiǎo wèi shì', 'Les petits gardiens du corps', '🛡️'], ['鞋子', 'xié zi', 'Les souliers', '👟'], ['头发', 'tóu fa', 'Les cheveux', '💇']], 0],
      [['怎样好得快？', 'zěn yàng hǎo de kuài?', 'Comment guérir plus vite?'],
        [['多休息多喝水', 'duō xiū xi duō hē shuǐ', 'Se reposer et boire de l’eau', '🛌'], ['多吃糖', 'duō chī táng', 'Manger plein de bonbons', '🍬'], ['半夜玩耍', 'bàn yè wán shuǎ', 'Jouer en pleine nuit', '🎮']], 0],
    ]),

  T('digestion', '🍎', 3,
    ['吃进去的食物去哪了？', 'chī jìn qù de shí wù qù nǎ le', 'Où va la nourriture qu’on mange?'],
    [
      [S(`${face(110, 120, 56, 'open')}${tooth(100, 220, 0.8)}${tooth(140, 220, 0.8)}${A(180, 120, 250, 120, '#e8604c')}${C(300, 120, 28, '#e8604c')}`),
        ['先用牙齿嚼碎，再咽下去。', 'xiān yòng yá chǐ jiáo suì, zài yàn xià qù.', 'On mâche d’abord avec les dents, puis on avale.']],
      [S(`${cut()}${P('M200 105L200 150', 'none', 'stroke="#f4a3b0" stroke-width="12"')}${stomach(200, 180, 1.1)}${A(200, 112, 200, 150, '#e8604c')}`),
        ['食物到了胃里，被搅成软软的糊。', 'shí wù dào le wèi lǐ, bèi jiǎo chéng ruǎn ruǎn de hú.', 'Dans l’estomac, la nourriture est brassée en purée.']],
      [S(`${cut()}${P('M165 200Q165 180 235 185Q250 210 165 225Q150 250 235 255Q245 275 175 275', 'none', 'stroke="#f2b36b" stroke-width="14"')}${A(255, 275, 305, 275, '#e8604c')}`),
        ['在长长的肠子里，身体吸收有用的东西，剩下的排出去。', 'zài cháng cháng de cháng zi lǐ, shēn tǐ xī shōu yǒu yòng de dōng xi, shèng xià de pái chū qù.', 'Dans le long intestin, le corps garde ce qui est utile et le reste sort.']],
    ],
    ['小朋友的肠子，比身体还长好多。', 'xiǎo péng yǒu de cháng zi, bǐ shēn tǐ hái cháng hǎo duō.', 'L’intestin d’un enfant est bien plus long que son corps.'],
    [
      [['吃东西，第一步是什么？', 'chī dōng xi, dì yī bù shì shén me?', 'Quelle est la première étape quand on mange?'],
        [['用牙齿嚼碎', 'yòng yá chǐ jiáo suì', 'Mâcher avec les dents', '🦷'], ['直接吸收', 'zhí jiē xī shōu', 'Absorber directement', '🙈'], ['先睡一觉', 'xiān shuì yī jiào', 'Dormir d’abord', '😴']], 0],
      [['谁把食物搅成糊？', 'shéi bǎ shí wù jiǎo chéng hú?', 'Qui brasse la nourriture en purée?'],
        [['胃', 'wèi', 'L’estomac', '🍽️'], ['眼睛', 'yǎn jing', 'Les yeux', '👁️'], ['耳朵', 'ěr duo', 'Les oreilles', '👂']], 0],
      [['在肠子里，身体做什么？', 'zài cháng zi lǐ, shēn tǐ zuò shén me?', 'Dans l’intestin, que fait le corps?'],
        [['吸收有用的东西', 'xī shōu yǒu yòng de dōng xi', 'Il prend ce qui est utile', '✅'], ['把食物放大', 'bǎ shí wù fàng dà', 'Il agrandit la nourriture', '🔎'], ['给食物唱歌', 'gěi shí wù chàng gē', 'Il chante à la nourriture', '🎤']], 0],
    ]),

  T('cerveau', '🧠', 3,
    ['大脑怎么指挥身体？', 'dà nǎo zěn me zhǐ huī shēn tǐ', 'Comment le cerveau commande-t-il le corps?'],
    [
      [S(`${brain(200, 70, 1.3)}${P('M200 115L200 160L130 200L90 250', 'none', 'stroke="#f2b36b" stroke-width="8"')}${P('M200 160L270 200L310 250', 'none', 'stroke="#f2b36b" stroke-width="8"')}${hand(90, 270, 0.45)}${hand(310, 270, 0.45)}`),
        ['大脑像指挥官，住在头里。', 'dà nǎo xiàng zhǐ huī guān, zhù zài tóu lǐ.', 'Le cerveau est comme un chef qui habite dans la tête.']],
      [S(`${brain(200, 60, 1)}${P('M200 95L200 150L130 190L100 240', 'none', 'stroke="#f2b36b" stroke-width="8"')}${A(75, 215, 125, 175, '#5b8fe0')}${A(160, 160, 185, 110, '#5b8fe0')}${A(225, 110, 225, 160, '#e8604c')}${A(180, 205, 125, 245, '#e8604c')}${hand(100, 275, 0.45)}`),
        ['身体有很多细细的“电线”，传递消息。', 'shēn tǐ yǒu hěn duō xì xì de “diàn xiàn”, chuán dì xiāo xi.', 'Le corps a plein de fins « fils » qui transmettent des messages.']],
      [S(`${hand(110, 190, 1.2)}${A(150, 110, 130, 70, '#e8604c')}${R(260, 170, 80, 60, '#d9524c', 8)}${dot(300, 150, 6, '#f2a900')}${dot(312, 134, 5, '#f2a900')}${dot(288, 130, 4, '#f2a900')}`),
        ['烫到手，消息跑得太快，手先缩回来了。', 'tàng dào shǒu, xiāo xi pǎo de tài kuài, shǒu xiān suō huí lái le.', 'Si on se brûle, le message va si vite que la main se retire d’elle-même.']],
    ],
    ['消息在身体里一秒钟能跑很远。', 'xiāo xi zài shēn tǐ lǐ yī miǎo zhōng néng pǎo hěn yuǎn.', 'Un message traverse le corps en une seconde.'],
    [
      [['谁像指挥官一样管着身体？', 'shéi xiàng zhǐ huī guān yī yàng guǎn zhe shēn tǐ?', 'Qui commande le corps comme un chef?'],
        [['大脑', 'dà nǎo', 'Le cerveau', '🧠'], ['手指', 'shǒu zhǐ', 'Les doigts', '🖐️'], ['鼻子', 'bí zi', 'Le nez', '👃']], 0],
      [['身体里谁来传递消息？', 'shēn tǐ lǐ shéi lái chuán dì xiāo xi?', 'Qui transmet les messages dans le corps?'],
        [['细细的“电线”', 'xì xì de “diàn xiàn”', 'De fins « fils »', '🔌'], ['小邮递员', 'xiǎo yóu dì yuán', 'De petits facteurs', '📮'], ['小鸟', 'xiǎo niǎo', 'Des oiseaux', '🐦']], 0],
      [['手碰到很烫的东西，会怎么样？', 'shǒu pèng dào hěn tàng de dōng xi, huì zěn me yàng?', 'Quand la main touche du très chaud, que fait-elle?'],
        [['很快缩回来', 'hěn kuài suō huí lái', 'Elle se retire très vite', '✋'], ['不动', 'bù dòng', 'Elle ne bouge pas', '🗿'], ['伸得更远', 'shēn de gèng yuǎn', 'Elle s’avance plus loin', '➡️']], 0],
    ]),

  T('sang', '🩸', 3,
    ['为什么血是红色的？', 'wèi shén me xuè shì hóng sè de', 'Pourquoi le sang est-il rouge?'],
    [
      [S(`${R(50, 70, 300, 160, '#ffe9d6', 40)}${[0, 1, 2, 3, 4, 5, 6].map((i) => G(95 + i * 35, 120 + (i % 3) * 30, 1, `${E(0, 0, 14, 11, '#d9362f')}${E(0, 0, 5, 3, '#a8241f')}`)).join('')}`),
        ['血里有很多很多红色的小颗粒。', 'xuè lǐ yǒu hěn duō hěn duō hóng sè de xiǎo kē lì.', 'Le sang contient plein de minuscules grains rouges.']],
      [S(`${lungs(90, 150, 1.1)}${A(135, 130, 250, 110, '#e8604c')}${heart(300, 120, 0.9)}${A(280, 175, 160, 230, '#5b8fe0')}${dot(170, 110, 8, '#d9362f')}${dot(210, 118, 8, '#d9362f')}`),
        ['红颗粒在肺里拿到空气，再送到全身。', 'hóng kē lì zài fèi lǐ ná dào kōng qì, zài sòng dào quán shēn.', 'Ils prennent l’air dans les poumons et le transportent partout.']],
      [S(`${cut()}${heart(200, 150, 0.7)}${P('M200 190L200 270M200 190L160 250M200 190L240 250', 'none', 'stroke="#d9362f" stroke-width="7"')}${P('M165 130L120 200M235 130L280 200', 'none', 'stroke="#d9362f" stroke-width="7"')}`),
        ['血在身体的小管子里，转着圈儿跑。', 'xuè zài shēn tǐ de xiǎo guǎn zi lǐ, zhuàn zhe quān er pǎo.', 'Le sang circule en boucle dans de petits tuyaux du corps.']],
    ],
    ['你的身体里，有好几千亿个红颗粒！', 'nǐ de shēn tǐ lǐ, yǒu hǎo jǐ qiān yì gè hóng kē lì!', 'Ton corps contient des centaines de milliards de ces grains rouges!'],
    [
      [['血为什么是红色的？', 'xuè wèi shén me shì hóng sè de?', 'Pourquoi le sang est-il rouge?'],
        [['里面有红色小颗粒', 'lǐ miàn yǒu hóng sè xiǎo kē lì', 'Il contient de petits grains rouges', '🔴'], ['被画上了红色', 'bèi huà shàng le hóng sè', 'On l’a peint en rouge', '🖌️'], ['吃了西红柿', 'chī le xī hóng shì', 'On a mangé des tomates', '🍅']], 0],
      [['红颗粒在肺里拿到什么？', 'hóng kē lì zài fèi lǐ ná dào shén me?', 'Que prennent les grains rouges dans les poumons?'],
        [['空气', 'kōng qì', 'De l’air', '💨'], ['沙子', 'shā zi', 'Du sable', '🏖️'], ['糖果', 'táng guǒ', 'Des bonbons', '🍬']], 0],
      [['血在哪里跑？', 'xuè zài nǎ lǐ pǎo?', 'Où circule le sang?'],
        [['身体的小管子里', 'shēn tǐ de xiǎo guǎn zi lǐ', 'Dans de petits tuyaux du corps', '🫀'], ['头发上面', 'tóu fa shàng miàn', 'Sur les cheveux', '💇'], ['衣服外面', 'yī fu wài miàn', 'Dehors, sur les vêtements', '👕']], 0],
    ]),
];
