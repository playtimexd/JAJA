// « Pourquoi? 十万个为什么 » — category ciel (sky, weather, Earth and space). See docs/WHY.md.
const O = '#3a3f55';
const n = (v) => Math.round(v * 10) / 10;
const W = (b, bg = '#dff1ff') => `<svg viewBox="0 0 400 300"><rect width="400" height="300" fill="${bg}"/>${b}</svg>`;
const sun = (x, y, r = 28) => { let s = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, c = Math.cos(a), d = Math.sin(a); s += `<line x1="${n(x + c * (r + 6))}" y1="${n(y + d * (r + 6))}" x2="${n(x + c * (r + 16))}" y2="${n(y + d * (r + 16))}" stroke="#f5a623" stroke-width="5" stroke-linecap="round"/>`; } return s + `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffd54a" stroke="${O}" stroke-width="3"/>`; };
const cloud = (x, y, s = 1, c = '#fff') => { const sh = '<circle cx="-26" cy="4" r="20"/><circle cx="0" cy="-8" r="26"/><circle cx="28" cy="4" r="20"/><rect x="-26" y="-14" width="54" height="38"/>'; return `<g transform="translate(${x} ${y}) scale(${s})"><g fill="${c}" stroke="${O}" stroke-width="${n(3 / s)}">${sh}</g><g fill="${c}">${sh}</g></g>`; };
const drop = (x, y, s = 1, c = '#4aa8e8') => `<path transform="translate(${x} ${y}) scale(${s})" d="M0-12C8 0 10 6 0 10C-10 6-8 0 0-12Z" fill="${c}" stroke="${O}" stroke-width="${n(2 / s)}"/>`;
const arrow = (x1, y1, x2, y2, c = O, w = 4) => { const a = Math.atan2(y2 - y1, x2 - x1), h = 8 + w * 1.5, bx = x2 - Math.cos(a) * h * .8, by = y2 - Math.sin(a) * h * .8; const p = (t) => `${n(x2 - Math.cos(a + t) * h)},${n(y2 - Math.sin(a + t) * h)}`; return `<line x1="${x1}" y1="${y1}" x2="${n(bx)}" y2="${n(by)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><polygon points="${x2},${y2} ${p(.45)} ${p(-.45)}" fill="${c}"/>`; };
const earth = (x, y, r = 40) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#4aa8e8" stroke="${O}" stroke-width="3"/><ellipse cx="${n(x - r * .3)}" cy="${n(y - r * .25)}" rx="${n(r * .3)}" ry="${n(r * .22)}" fill="#7bc96f"/><ellipse cx="${n(x + r * .35)}" cy="${n(y + r * .3)}" rx="${n(r * .28)}" ry="${n(r * .2)}" fill="#7bc96f"/>`;
const ball = (x, y, r, c = '#f5ecc8') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="${O}" stroke-width="3"/>`;
const moon = (x, y, r = 24) => ball(x, y, r) + `<circle cx="${n(x - r * .35)}" cy="${n(y - r * .2)}" r="${n(r * .2)}" fill="#d9cf9f"/><circle cx="${n(x + r * .3)}" cy="${n(y + r * .3)}" r="${n(r * .25)}" fill="#d9cf9f"/>`;
const phase = (x, y, r, t) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#4b5170" stroke="${O}" stroke-width="3"/>` + (t === null ? '' : `<path d="M${x} ${y - r}A${r} ${r} 0 0 1 ${x} ${y + r}A${Math.max(.01, n(Math.abs(t) * r))} ${r} 0 0 ${t > 0 ? 1 : 0} ${x} ${y - r}Z" fill="#f5ecc8"/>`);
const star = (x, y, r = 8, c = '#ffd54a') => { let p = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, d = i % 2 ? r * .45 : r; p += `${n(x + Math.cos(a) * d)},${n(y + Math.sin(a) * d)} `; } return `<polygon points="${p}" fill="${c}"/>`; };
const ground = (y, c = '#9bd16b') => `<rect x="-5" y="${y}" width="410" height="${305 - y}" fill="${c}" stroke="${O}" stroke-width="3"/>`;
const tree = (x, y, s = 1, c = '#5fae4e') => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-5" y="-30" width="10" height="30" fill="#8b5e3c" stroke="${O}" stroke-width="2"/><circle cx="0" cy="-48" r="24" fill="${c}" stroke="${O}" stroke-width="3"/></g>`;
const fir = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-12" width="8" height="12" fill="#8b5e3c"/><path d="M0-80L-24-16H24Z" fill="#3f8f5a" stroke="${O}" stroke-width="3" stroke-linejoin="round"/></g>`;
const mount = (x, y, w, h, c = '#8d93a8', snow = true) => `<path d="M${x - w / 2} ${y}L${x} ${y - h}L${x + w / 2} ${y}Z" fill="${c}" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>` + (snow ? `<path d="M${x - w * .14} ${y - h * .72}L${x} ${y - h}L${x + w * .14} ${y - h * .72}L${x + w * .06} ${y - h * .64}L${x} ${y - h * .72}L${x - w * .06} ${y - h * .64}Z" fill="#fff"/>` : '');
const kid = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="${O}" stroke-width="4" stroke-linecap="round"><circle cx="0" cy="-34" r="9" fill="#ffd9b8"/><path d="M0-25V0M0-18L-12-6M0-18L12-6M0 0L-9 16M0 0L9 16" fill="none"/></g>`;
const txt = (x, y, t, sz = 22, c = O) => `<text x="${x}" y="${y}" font-size="${sz}" font-family="sans-serif" font-weight="700" fill="${c}" text-anchor="middle">${t}</text>`;
const flake = (x, y, r = 20, c = '#fff', w = 3) => { let s = `<g stroke="${c}" stroke-width="${w}" stroke-linecap="round" fill="none">`; for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3, P = (d, t = 0) => `${n(x + Math.cos(a + t) * d)} ${n(y + Math.sin(a + t) * d)}`; s += `<path d="M${x} ${y}L${P(r)}M${P(r * .55)}L${P(r * .85, .5)}M${P(r * .55)}L${P(r * .85, -.5)}"/>`; } return s + '</g>'; };
const rainbow = (x, y, R, w = 8) => ['#e8514a', '#f5923e', '#ffd54a', '#6cc04a', '#4aa8e8', '#5b6fd6', '#9b5fc9'].map((c, i) => `<path d="M${x - R + i * w} ${y}A${R - i * w} ${R - i * w} 0 0 1 ${x + R - i * w} ${y}" fill="none" stroke="${c}" stroke-width="${w + .5}"/>`).join('');
const spectrum = (x1, y1, x2, y2, dy) => ['#e8514a', '#f5923e', '#ffd54a', '#6cc04a', '#4aa8e8', '#5b6fd6', '#9b5fc9'].map((c, i) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${n(y2 + (i - 3) * dy)}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`).join('');
const spin = (x, y, r, c = O) => `<path d="M${x - r} ${y}A${r} ${r} 0 1 1 ${x} ${y + r}" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 0"/>` + arrow(x, y + r, x - 8, y + r + 1, c, 4);
const S = (svg, zh, py, fr) => ({ svg, zh, py, fr });
const o = (zh, py, fr, emoji) => ({ zh, py, fr, emoji });
const Q = (zh, py, fr, options, answer) => ({ zh, py, fr, options, answer });
const T = (id, emoji, level, q, slides, f, quiz) => ({ id: 'ciel-' + id, cat: 'ciel', emoji, level, q: { zh: q[0], py: q[1], fr: q[2] }, slides, fact: f ? { zh: f[0], py: f[1], fr: f[2] } : undefined, quiz });
const night = '#2b3157';

const L1 = [
  T('pluie', '🌧️', 1,
    ['为什么会下雨？', 'wèi shén me huì xià yǔ', 'Pourquoi pleut-il?'],
    [
      S(W(sun(60, 60) + `<rect x="-5" y="220" width="410" height="85" fill="#4aa8e8" stroke="${O}" stroke-width="3"/>` + [140, 220, 300].map((x) => arrow(x, 205, x, 120, '#8fd0f5', 6)).join('')),
        '太阳晒热了海水，水变成看不见的水汽。', 'tài yáng shài rè le hǎi shuǐ, shuǐ biàn chéng kàn bú jiàn de shuǐ qì.',
        'Le soleil chauffe la mer. L\'eau devient de la vapeur invisible.'),
      S(W(`<rect x="-5" y="250" width="410" height="55" fill="#4aa8e8" stroke="${O}" stroke-width="3"/>` + arrow(90, 235, 90, 150, '#8fd0f5', 6) + arrow(150, 235, 190, 150, '#8fd0f5', 6) + cloud(230, 90, 1.8, '#f4f7fb') + [200, 225, 250, 215, 240].map((x, i) => `<circle cx="${x}" cy="${85 + (i % 3) * 14}" r="4" fill="#4aa8e8"/>`).join('')),
        '水汽升到高处，变冷，变成小水滴，聚成云。', 'shuǐ qì shēng dào gāo chù, biàn lěng, biàn chéng xiǎo shuǐ dī, jù chéng yún.',
        'La vapeur monte, refroidit, devient de minuscules gouttes et forme un nuage.'),
      S(W(ground(250) + cloud(200, 70, 2.2, '#b9c3d3') + [120, 170, 220, 270, 145, 195, 245].map((x, i) => drop(x, 150 + (i % 2) * 40 + (i > 3 ? 20 : 0), 1.4)).join('')),
        '小水滴越聚越大，太重了，就掉下来变成雨。', 'xiǎo shuǐ dī yuè jù yuè dà, tài zhòng le, jiù diào xià lái biàn chéng yǔ.',
        'Les gouttes grossissent, deviennent trop lourdes et tombent : c\'est la pluie.'),
    ],
    ['大雨滴其实像一个小圆面包。', 'dà yǔ dī qí shí xiàng yí gè xiǎo yuán miàn bāo.', 'Une grosse goutte de pluie ressemble en fait à un petit pain rond.'],
    [
      Q('雨是从哪里掉下来的？', 'yǔ shì cóng nǎ lǐ diào xià lái de', 'D\'où tombe la pluie?', [o('云', 'yún', 'Des nuages', '☁️'), o('地下', 'dì xià', 'Du sol', '🕳️'), o('月亮', 'yuè liang', 'De la lune', '🌙')], 0),
      Q('云里的小水滴变重了，会怎么样？', 'yún lǐ de xiǎo shuǐ dī biàn zhòng le, huì zěn me yàng', 'Que font les gouttes quand elles deviennent lourdes?', [o('掉下来', 'diào xià lái', 'Elles tombent', '💧'), o('飞上天', 'fēi shàng tiān', 'Elles montent au ciel', '🚀'), o('变成星星', 'biàn chéng xīng xing', 'Elles deviennent des étoiles', '⭐')], 0),
    ]),

  T('nuage', '☁️', 1,
    ['云是什么做的？', 'yún shì shén me zuò de', 'De quoi sont faits les nuages?'],
    [
      S(W(cloud(150, 130, 2.6) + `<circle cx="300" cy="150" r="70" fill="#f4faff" stroke="${O}" stroke-width="4"/>` + [[270, 130], [300, 120], [330, 140], [285, 160], [320, 175], [270, 180], [305, 195], [340, 110]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#4aa8e8"/>`).join('')),
        '云是由无数很小很小的水滴组成的。', 'yún shì yóu wú shù hěn xiǎo hěn xiǎo de shuǐ dī zǔ chéng de.',
        'Un nuage est fait d\'un nombre immense de toutes petites gouttes d\'eau.'),
      S(W(cloud(200, 90, 2) + [140, 200, 260].map((x) => arrow(x, 250, x, 170, '#f5a623', 5)).join('') + ground(255)),
        '水滴特别小，会被空气托在天上。', 'shuǐ dī tè bié xiǎo, huì bèi kōng qì tuō zài tiān shàng.',
        'Les gouttes sont si petites que l\'air les porte dans le ciel.'),
      S(W(`<rect y="0" width="400" height="300" fill="#bcd8f2"/>` + cloud(200, 110, 2.4) + [120, 180, 230, 290, 160, 250].map((x, i) => flake(x, 130 + (i % 2) * 40, 10, '#6aa8dc', 2.5)).join('') + mount(90, 300, 200, 110) + mount(310, 300, 220, 90), '#bcd8f2'),
        '在很高很冷的地方，云是由小冰晶组成的。', 'zài hěn gāo hěn lěng de dì fāng, yún shì yóu xiǎo bīng jīng zǔ chéng de.',
        'Très haut où il fait très froid, les nuages sont faits de petits cristaux de glace.'),
    ],
    ['一朵白云可能和很多头大象一样重。', 'yì duǒ bái yún kě néng hé hěn duō tóu dà xiàng yí yàng zhòng.', 'Un nuage blanc peut peser autant que beaucoup d\'éléphants.'],
    [
      Q('云是什么做的？', 'yún shì shén me zuò de', 'De quoi est fait un nuage?', [o('小水滴', 'xiǎo shuǐ dī', 'De gouttelettes', '💧'), o('棉花', 'mián hua', 'De coton', '🧶'), o('烟', 'yān', 'De fumée', '💨')], 0),
      Q('云里的水滴有多大？', 'yún lǐ de shuǐ dī yǒu duō dà', 'Quelle est la taille des gouttes dans un nuage?', [o('很小很小', 'hěn xiǎo hěn xiǎo', 'Toutes petites', '🔬'), o('像西瓜那么大', 'xiàng xī guā nà me dà', 'Grosses comme un melon d\'eau', '🍉'), o('像房子那么大', 'xiàng fáng zi nà me dà', 'Grosses comme une maison', '🏠')], 0),
    ]),

  T('jour-nuit', '🌗', 1,
    ['为什么有白天和黑夜？', 'wèi shén me yǒu bái tiān hé hēi yè', 'Pourquoi y a-t-il le jour et la nuit?'],
    [
      S(W(sun(60, 150, 32) + [120, 150, 180].map((y) => arrow(110, y, 175, 150 + (y - 150) / 2, '#f5a623', 4)).join('') + earth(270, 150, 60) + `<path d="M270 90A60 60 0 0 1 270 210Z" fill="${night}" opacity=".6"/>`, '#c9d6ee'),
        '地球像一个大球，太阳只能照亮朝着它的一面。', 'dì qiú xiàng yí gè dà qiú, tài yáng zhǐ néng zhào liàng cháo zhe tā de yí miàn.',
        'La Terre est une grosse boule. Le soleil n\'éclaire que le côté tourné vers lui.'),
      S(W(sun(60, 150, 32) + earth(270, 150, 60) + `<path d="M270 90A60 60 0 0 1 270 210Z" fill="${night}" opacity=".6"/>` + `<path d="M205 75A85 85 0 0 1 335 75" fill="none" stroke="${O}" stroke-width="5" stroke-linecap="round"/>` + arrow(329, 66, 336, 78, O, 5), '#c9d6ee'),
        '地球会转圈，大约一天转一圈。', 'dì qiú huì zhuàn quān, dà yuē yì tiān zhuàn yì quān.',
        'La Terre tourne sur elle-même : un tour en environ une journée.'),
      S(W(sun(40, 150, 26) + earth(230, 150, 80) + `<path d="M230 70A80 80 0 0 1 230 230Z" fill="${night}" opacity=".6"/>` + kid(170, 150, 1.2) + kid(290, 150, 1.2) + sun(180, 62, 10) + moon(285, 70, 14) + star(330, 100, 7) + star(315, 215, 6), '#c9d6ee'),
        '转到朝着太阳是白天，背着太阳是黑夜。', 'zhuàn dào cháo zhe tài yáng shì bái tiān, bèi zhe tài yáng shì hēi yè.',
        'Face au soleil, c\'est le jour. Dos au soleil, c\'est la nuit.'),
    ],
    ['是地球在转，不是太阳绕着我们转。', 'shì dì qiú zài zhuàn, bú shì tài yáng rào zhe wǒ men zhuàn.', 'C\'est la Terre qui tourne, pas le soleil qui tourne autour de nous.'],
    [
      Q('地球大约多久转一圈？', 'dì qiú dà yuē duō jiǔ zhuàn yì quān', 'En combien de temps la Terre fait-elle un tour sur elle-même?', [o('一天', 'yì tiān', 'Un jour', '📅'), o('一年', 'yì nián', 'Un an', '🎂'), o('一小时', 'yì xiǎo shí', 'Une heure', '⏰')], 0),
      Q('我们这里是黑夜，是因为什么？', 'wǒ men zhè lǐ shì hēi yè, shì yīn wèi shén me', 'Pourquoi est-il nuit chez nous?', [o('背着太阳', 'bèi zhe tài yáng', 'On est dos au soleil', '🌍'), o('太阳关灯了', 'tài yáng guān dēng le', 'Le soleil a éteint sa lumière', '💡'), o('云把太阳吃了', 'yún bǎ tài yáng chī le', 'Un nuage a mangé le soleil', '😋')], 0),
    ]),

  T('vent', '🌬️', 1,
    ['为什么会刮风？', 'wèi shén me huì guā fēng', 'Pourquoi y a-t-il du vent?'],
    [
      S(W(sun(70, 50, 24) + `<rect x="-5" y="200" width="200" height="105" fill="#f08a4b" stroke="${O}" stroke-width="3"/><rect x="195" y="200" width="210" height="105" fill="#7fc4ea" stroke="${O}" stroke-width="3"/>` + [40, 100, 150].map((x) => arrow(x, 185, x, 135, '#e8514a', 5)).join('')),
        '太阳把有的地方晒得热，有的地方不那么热。', 'tài yáng bǎ yǒu de dì fāng shài de rè, yǒu de dì fāng bú nà me rè.',
        'Le soleil chauffe fort à certains endroits et moins à d\'autres.'),
      S(W(`<rect x="-5" y="220" width="200" height="85" fill="#f08a4b" stroke="${O}" stroke-width="3"/><rect x="195" y="220" width="210" height="85" fill="#7fc4ea" stroke="${O}" stroke-width="3"/>` + arrow(100, 205, 100, 80, '#e8514a', 6) + arrow(100, 70, 300, 70, '#e8514a', 5) + arrow(300, 80, 300, 180, '#4a7fd6', 6) + arrow(300, 200, 120, 200, '#4a7fd6', 6)),
        '热空气变轻往上跑，冷空气跑过去补位。', 'rè kōng qì biàn qīng wǎng shàng pǎo, lěng kōng qì pǎo guò qù bǔ wèi.',
        'L\'air chaud, plus léger, monte. L\'air froid accourt prendre sa place.'),
      S(W(ground(240) + tree(110, 245, 1.2) + `<path d="M105 215Q150 200 175 185" stroke="#5fae4e" stroke-width="0"/>` + [60, 110, 160].map((y, i) => `<path d="M${20 + i * 20} ${y}q40 -18 80 0t80 0" fill="none" stroke="#8fb3d9" stroke-width="5" stroke-linecap="round"/>`).join('') + `<path d="M300 90l30 -30 30 30-30 30z" fill="#e8514a" stroke="${O}" stroke-width="3"/><path d="M330 120q-8 40 12 70" fill="none" stroke="${O}" stroke-width="3"/>`),
        '空气在流动，这就是风。', 'kōng qì zài liú dòng, zhè jiù shì fēng.',
        'L\'air se déplace : c\'est le vent.'),
    ],
    ['风看不见，但我们能看到树叶在动。', 'fēng kàn bú jiàn, dàn wǒ men néng kàn dào shù yè zài dòng.', 'On ne voit pas le vent, mais on voit les feuilles bouger.'],
    [
      Q('风是什么？', 'fēng shì shén me', 'Qu\'est-ce que le vent?', [o('流动的空气', 'liú dòng de kōng qì', 'De l\'air qui se déplace', '💨'), o('天上的水', 'tiān shàng de shuǐ', 'De l\'eau du ciel', '💧'), o('跑动的云', 'pǎo dòng de yún', 'Des nuages qui courent', '☁️')], 0),
      Q('热空气会怎么样？', 'rè kōng qì huì zěn me yàng', 'Que fait l\'air chaud?', [o('往上升', 'wǎng shàng shēng', 'Il monte', '⬆️'), o('往下沉', 'wǎng xià chén', 'Il descend', '⬇️'), o('一动不动', 'yí dòng bú dòng', 'Il ne bouge pas', '🧱')], 0),
    ]),

  T('arc-en-ciel', '🌈', 1,
    ['彩虹是怎么来的？', 'cǎi hóng shì zěn me lái de', 'D\'où vient l\'arc-en-ciel?'],
    [
      S(W(sun(60, 50, 24) + cloud(260, 60, 1.2, '#b9c3d3') + [150, 200, 250, 300, 170, 230, 280, 330].map((x, i) => drop(x, 140 + (i % 3) * 35, 1.2)).join('') + ground(265)),
        '下雨后，空中还飘着很多小水滴。', 'xià yǔ hòu, kōng zhōng hái piāo zhe hěn duō xiǎo shuǐ dī.',
        'Après la pluie, il reste plein de petites gouttes dans l\'air.'),
      S(W(`<circle cx="230" cy="150" r="70" fill="#e6f4ff" stroke="${O}" stroke-width="4"/>` + `<line x1="20" y1="90" x2="170" y2="130" stroke="#f5a623" stroke-width="7" stroke-linecap="round"/>` + spectrum(190, 195, 40, 250, 7)),
        '太阳光穿过水滴，被分成了七种颜色。', 'tài yáng guāng chuān guò shuǐ dī, bèi fēn chéng le qī zhǒng yán sè.',
        'La lumière traverse la goutte et se sépare en sept couleurs.'),
      S(W(rainbow(200, 215, 150, 12) + ground(215) + sun(350, 60, 22) + kid(150, 255, 1.3) + arrow(320, 85, 175, 215, '#f5a623', 3)),
        '太阳在我们背后，就能看见彩虹。', 'tài yáng zài wǒ men bèi hòu, jiù néng kàn jiàn cǎi hóng.',
        'Si le soleil est dans notre dos, on voit l\'arc-en-ciel.'),
    ],
    ['彩虹其实是一个圆圈，在飞机上可能看到。', 'cǎi hóng qí shí shì yí gè yuán quān, zài fēi jī shàng kě néng kàn dào.', 'L\'arc-en-ciel est en fait un cercle. On peut le voir en avion.'],
    [
      Q('彩虹有几种颜色？', 'cǎi hóng yǒu jǐ zhǒng yán sè', 'Combien de couleurs a l\'arc-en-ciel?', [o('七种', 'qī zhǒng', 'Sept', '🌈'), o('两种', 'liǎng zhǒng', 'Deux', '✌️'), o('一种', 'yì zhǒng', 'Une', '☝️')], 0),
      Q('什么时候容易看到彩虹？', 'shén me shí hou róng yì kàn dào cǎi hóng', 'Quand voit-on facilement un arc-en-ciel?', [o('雨后有太阳时', 'yǔ hòu yǒu tài yáng shí', 'Quand il y a du soleil après la pluie', '🌦️'), o('半夜', 'bàn yè', 'En pleine nuit', '🌙'), o('下大雪时', 'xià dà xuě shí', 'Pendant une grosse tempête de neige', '❄️')], 0),
    ]),

  T('neige', '❄️', 1,
    ['为什么会下雪？', 'wèi shén me huì xià xuě', 'Pourquoi neige-t-il?'],
    [
      S(W(cloud(200, 90, 2.2, '#b9c3d3') + [150, 200, 250, 190, 230].map((x, i) => flake(x, 80 + (i % 2) * 25, 7, '#6aa8dc', 2)).join('') + mount(80, 300, 180, 100, '#9aa3bb') + mount(320, 300, 200, 80, '#9aa3bb'), '#c3d6ee'),
        '冬天，云里很冷，水汽变成小冰晶。', 'dōng tiān, yún lǐ hěn lěng, shuǐ qì biàn chéng xiǎo bīng jīng.',
        'En hiver, il fait très froid dans les nuages. La vapeur devient de petits cristaux de glace.'),
      S(W(flake(130, 110, 12, '#fff', 3) + flake(190, 150, 12, '#fff', 3) + arrow(215, 150, 250, 150, '#fff', 4) + flake(310, 150, 46, '#fff', 4) + flake(100, 200, 10, '#fff', 3), '#5b7aa8'),
        '冰晶互相粘在一起，变成雪花。', 'bīng jīng hù xiāng zhān zài yì qǐ, biàn chéng xuě huā.',
        'Les cristaux s\'accrochent entre eux et forment un flocon.'),
      S(W(fir(90, 270, 1.4) + fir(320, 270, 1.2) + ground(255, '#fff') + [60, 130, 200, 260, 340, 110, 290].map((x, i) => flake(x, 50 + ((i * 53) % 170), 9, '#6aa8dc', 2.5)).join('') + arrow(200, 60, 200, 130, '#6aa8dc', 4), '#dbe7f5'),
        '雪花变重了，轻轻飘下来。', 'xuě huā biàn zhòng le, qīng qīng piāo xià lái.',
        'Les flocons deviennent lourds et tombent doucement.'),
    ],
    ['空气太暖的话，雪会半路化成雨。', 'kōng qì tài nuǎn de huà, xuě huì bàn lù huà chéng yǔ.', 'Si l\'air est trop doux, la neige fond en route et devient de la pluie.'],
    [
      Q('雪是由什么变成的？', 'xuě shì yóu shén me biàn chéng de', 'De quoi la neige est-elle faite?', [o('小冰晶', 'xiǎo bīng jīng', 'De petits cristaux de glace', '🧊'), o('白色沙子', 'bái sè shā zi', 'De sable blanc', '🏖️'), o('白糖', 'bái táng', 'De sucre blanc', '🍬')], 0),
      Q('要下雪，空气要怎么样？', 'yào xià xuě, kōng qì yào zěn me yàng', 'Pour qu\'il neige, comment doit être l\'air?', [o('很冷', 'hěn lěng', 'Très froid', '🥶'), o('很热', 'hěn rè', 'Très chaud', '🥵'), o('很烫', 'hěn tàng', 'Brûlant', '🔥')], 0),
    ]),

  T('tonnerre', '⚡', 1,
    ['为什么会打雷闪电？', 'wèi shén me huì dǎ léi shǎn diàn', 'Pourquoi y a-t-il du tonnerre et des éclairs?'],
    [
      S(W(cloud(200, 90, 2.6, '#6b7390') + [150, 185, 215, 250, 170, 235].map((x, i) => `<circle cx="${x}" cy="${80 + (i % 3) * 18}" r="5" fill="#dff1ff" stroke="${O}" stroke-width="1.5"/>`).join('') + ground(255), '#9aa6c0'),
        '乌云里有很多小冰粒，它们撞来撞去。', 'wū yún lǐ yǒu hěn duō xiǎo bīng lì, tā men zhuàng lái zhuàng qù.',
        'Dans le nuage sombre, de petits grains de glace se cognent sans arrêt.'),
      S(W(cloud(200, 70, 2.6, '#6b7390') + `<path d="M205 110L170 170L200 170L175 245L235 150L205 150L225 110Z" fill="#ffd54a" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>` + ground(250), '#9aa6c0'),
        '云里存了很多电，电跳出来就是闪电。', 'yún lǐ cún le hěn duō diàn, diàn tiào chū lái jiù shì shǎn diàn.',
        'Le nuage accumule de l\'électricité. Quand elle jaillit, c\'est un éclair.'),
      S(W(`<path d="M120 20L90 110L125 110L95 200L160 100L125 100L145 20Z" fill="#ffd54a" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>` + `<circle cx="125" cy="200" r="30" fill="#f08a4b" opacity=".7"/>` + [60, 90, 120].map((r) => `<path d="M${180 + r * .3} ${200 - r}Q${180 + r} 200 ${180 + r * .3} ${200 + r}" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round"/>`).join('') + ground(262), '#9aa6c0'),
        '闪电让空气突然变得很热，发出轰隆声。', 'shǎn diàn ràng kōng qì tū rán biàn de hěn rè, fā chū hōng lóng shēng.',
        'L\'éclair réchauffe l\'air d\'un coup. L\'air éclate avec un grand boum : le tonnerre.'),
      S(W(`<path d="M50 40L30 100L55 100L35 160L80 90L58 90L75 40Z" fill="#ffd54a" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>` + arrow(100, 100, 360, 100, '#f5a623', 8) + [140, 175, 205].map((x) => `<path d="M${x} 205q15 -20 0 -40" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round"/>`).join('') + arrow(110, 215, 230, 215, '#4a7fd6', 4) + ground(262), '#9aa6c0'),
        '光跑得比声音快，所以先看到闪电，后听到雷。', 'guāng pǎo de bǐ shēng yīn kuài, suǒ yǐ xiān kàn dào shǎn diàn, hòu tīng dào léi.',
        'La lumière va plus vite que le son : on voit l\'éclair d\'abord, on entend le tonnerre ensuite.'),
    ],
    ['打雷时别站在大树下，要躲进屋里或车里。', 'dǎ léi shí bié zhàn zài dà shù xià, yào duǒ jìn wū lǐ huò chē lǐ.', 'Pendant l\'orage, ne reste pas sous un arbre : cache-toi dans une maison ou une auto.'],
    [
      Q('我们先看到什么？', 'wǒ men xiān kàn dào shén me', 'Qu\'est-ce qu\'on voit en premier?', [o('闪电', 'shǎn diàn', 'L\'éclair', '⚡'), o('雷声', 'léi shēng', 'Le tonnerre', '🔊'), o('一起', 'yì qǐ', 'Les deux en même temps', '🤝')], 0),
      Q('打雷时我们应该怎么办？', 'dǎ léi shí wǒ men yīng gāi zěn me bàn', 'Que faut-il faire pendant un orage?', [o('躲进屋里', 'duǒ jìn wū lǐ', 'Aller à l\'intérieur', '🏠'), o('站在大树下', 'zhàn zài dà shù xià', 'Rester sous un grand arbre', '🌳'), o('爬到山顶', 'pá dào shān dǐng', 'Monter au sommet d\'une montagne', '⛰️')], 0),
    ]),

  T('soleil-chaud', '☀️', 1,
    ['太阳为什么这么热？', 'tài yáng wèi shén me zhè me rè', 'Pourquoi le soleil est-il si chaud?'],
    [
      S(W(`<circle cx="200" cy="150" r="95" fill="#ffd54a" stroke="${O}" stroke-width="4"/><circle cx="200" cy="150" r="45" fill="#f5923e"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = i * Math.PI / 4; return `<line x1="${n(200 + Math.cos(a) * 105)}" y1="${n(150 + Math.sin(a) * 105)}" x2="${n(200 + Math.cos(a) * 130)}" y2="${n(150 + Math.sin(a) * 130)}" stroke="#f5a623" stroke-width="7" stroke-linecap="round"/>`; }).join(''), '#fdf0d0'),
        '太阳是一颗很大很大的星星，里面特别热。', 'tài yáng shì yì kē hěn dà hěn dà de xīng xing, lǐ miàn tè bié rè.',
        'Le soleil est une très, très grosse étoile, brûlante à l\'intérieur.'),
      S(W(`<circle cx="200" cy="150" r="100" fill="#ffd54a" stroke="${O}" stroke-width="4"/><circle cx="200" cy="150" r="40" fill="#e8514a"/>` + [[170, 140], [215, 130], [190, 170], [225, 165]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#fff" stroke="${O}" stroke-width="2"/>`).join('') + [[120, 70], [280, 70], [120, 235], [280, 235]].map(([x, y]) => arrow(n(200 + (x - 200) * .5), n(150 + (y - 150) * .5), x, y, '#f5a623', 5)).join(''), '#fdf0d0'),
        '太阳中心很小的东西挤在一起，放出很多热和光。', 'tài yáng zhōng xīn hěn xiǎo de dōng xi jǐ zài yì qǐ, fàng chū hěn duō rè hé guāng.',
        'Au centre, de minuscules particules se fusionnent et libèrent beaucoup de chaleur et de lumière.'),
      S(W(sun(45, 150, 28) + `<line x1="95" y1="150" x2="285" y2="150" stroke="#f5a623" stroke-width="5" stroke-dasharray="14 10" stroke-linecap="round"/>` + earth(335, 150, 30) + txt(200, 125, '8', 44) + ``, '#dff1ff'),
        '光和热走很远的路，大约八分钟到地球。', 'guāng hé rè zǒu hěn yuǎn de lù, dà yuē bā fēn zhōng dào dì qiú.',
        'La lumière et la chaleur font un long voyage : environ huit minutes jusqu\'à la Terre.'),
    ],
    ['太阳大得很，能装下一百多万个地球。', 'tài yáng dà de hěn, néng zhuāng xià yì bǎi duō wàn gè dì qiú.', 'Le soleil est si grand qu\'on y logerait plus d\'un million de Terres.'],
    [
      Q('太阳是什么？', 'tài yáng shì shén me', 'Qu\'est-ce que le soleil?', [o('一颗星星', 'yì kē xīng xing', 'Une étoile', '⭐'), o('一个大灯泡', 'yí gè dà dēng pào', 'Une énorme ampoule', '💡'), o('一团云', 'yì tuán yún', 'Un paquet de nuages', '☁️')], 0),
      Q('太阳光到地球要多久？', 'tài yáng guāng dào dì qiú yào duō jiǔ', 'Combien de temps la lumière du soleil met-elle pour arriver?', [o('大约八分钟', 'dà yuē bā fēn zhōng', 'Environ huit minutes', '⏱️'), o('一秒钟', 'yì miǎo zhōng', 'Une seconde', '⚡'), o('一个月', 'yí gè yuè', 'Un mois', '📅')], 0),
    ]),

  T('brouillard', '🌫️', 1,
    ['为什么会有雾？', 'wèi shén me huì yǒu wù', 'Pourquoi y a-t-il du brouillard?'],
    [
      S(W(ground(230, '#8fc27a') + `<circle cx="330" cy="70" r="20" fill="#ffd54a" stroke="${O}" stroke-width="3"/>` + tree(80, 235, 1.2) + `<rect x="150" y="200" width="30" height="40" fill="#f08a4b" stroke="${O}" stroke-width="3"/>` + [80, 130, 180].map((x) => arrow(x, 210, x, 180, '#4a7fd6', 4)).join('')),
        '晚上或清晨，地面附近的空气变冷了。', 'wǎn shang huò qīng chén, dì miàn fù jìn de kōng qì biàn lěng le.',
        'Le soir ou tôt le matin, l\'air près du sol se refroidit.'),
      S(W(ground(240, '#8fc27a') + [80, 120, 170, 220, 270, 320].map((x, i) => `<circle cx="${x}" cy="${170 + (i % 2) * 30}" r="${4 + (i % 3)}" fill="#fff" stroke="${O}" stroke-width="2"/>`).join('') + [90, 200, 300].map((x) => arrow(x, 225, x, 190, '#8fd0f5', 4)).join('')),
        '空气里的水汽遇冷，变成很多小水滴。', 'kōng qì lǐ de shuǐ qì yù lěng, biàn chéng hěn duō xiǎo shuǐ dī.',
        'La vapeur d\'eau de l\'air se refroidit et devient plein de petites gouttes.'),
      S(W(ground(230, '#8fc27a') + tree(70, 238, 1.2) + tree(330, 238, 1.4) + `<rect x="-5" y="130" width="410" height="110" fill="#fff" opacity=".78"/>` + `<circle cx="330" cy="60" r="20" fill="#ffd54a" stroke="${O}" stroke-width="3"/>`, '#cfe3f4'),
        '这些小水滴飘在地面上，就是雾。', 'zhè xiē xiǎo shuǐ dī piāo zài dì miàn shàng, jiù shì wù.',
        'Ces petites gouttes flottent au ras du sol : c\'est le brouillard.'),
    ],
    ['雾其实就是贴着地面的云。', 'wù qí shí jiù shì tiē zhe dì miàn de yún.', 'Le brouillard, c\'est en fait un nuage posé sur le sol.'],
    [
      Q('雾是由什么组成的？', 'wù shì yóu shén me zǔ chéng de', 'De quoi le brouillard est-il fait?', [o('小水滴', 'xiǎo shuǐ dī', 'De petites gouttes d\'eau', '💧'), o('小石头', 'xiǎo shí tou', 'De petits cailloux', '🪨'), o('棉花糖', 'mián huā táng', 'De barbe à papa', '🍭')], 0),
      Q('雾像什么？', 'wù xiàng shén me', 'À quoi ressemble le brouillard?', [o('贴着地面的云', 'tiē zhe dì miàn de yún', 'À un nuage au ras du sol', '☁️'), o('天上的星星', 'tiān shàng de xīng xing', 'À des étoiles', '⭐'), o('地下的水', 'dì xià de shuǐ', 'À de l\'eau sous terre', '🕳️')], 0),
    ]),

  T('givre', '🧊', 1,
    ['为什么会结霜？', 'wèi shén me huì jié shuāng', 'Pourquoi se forme-t-il du givre?'],
    [
      S(W(`<circle cx="340" cy="50" r="18" fill="#f5ecc8" stroke="${O}" stroke-width="3"/>` + star(60, 50, 8) + star(250, 35, 6) + ground(240, '#7fa88f') + [90, 140, 190, 240, 290].map((x) => `<path d="M${x} 240q-4 -30 -10 -45M${x} 240q2 -35 6 -50M${x} 240q8 -25 16 -40" fill="none" stroke="#3f8f5a" stroke-width="4" stroke-linecap="round"/>`).join('') + txt(330, 160, '0°', 30, '#4a7fd6'), night),
        '冬天夜里，草叶和窗玻璃变得比零度还冷。', 'dōng tiān yè lǐ, cǎo yè hé chuāng bō li biàn de bǐ líng dù hái lěng.',
        'Les nuits d\'hiver, les brins d\'herbe et les vitres deviennent plus froids que zéro degré.'),
      S(W(`<rect x="170" y="100" width="40" height="150" fill="#cfe3f4" stroke="${O}" stroke-width="4"/>` + [60, 90, 120].map((x) => arrow(x, 120 + (x - 60) / 2, 160, 160 + (x - 60) / 4, '#8fd0f5', 4)).join('') + flake(260, 130, 22, '#8fb8e0', 3) + flake(300, 190, 14, '#8fb8e0', 3), '#f3f7fb'),
        '空气里的水汽碰到它们，直接变成小冰晶。', 'kōng qì lǐ de shuǐ qì pèng dào tā men, zhí jiē biàn chéng xiǎo bīng jīng.',
        'La vapeur de l\'air touche ces surfaces glacées et se change directement en cristaux.'),
      S(W(ground(240, '#dfeaf2') + [90, 150, 210, 270, 330].map((x) => `<path d="M${x} 240l-6 -60M${x} 240l8 -55M${x} 240l0 -70" stroke="#fff" stroke-width="8" stroke-linecap="round"/>` + flake(x, 180, 10, '#9cc4e8', 2.5)).join(''), '#c7d9ec'),
        '冰晶一层层长出来，就成了白白的霜。', 'bīng jīng yì céng céng zhǎng chū lái, jiù chéng le bái bái de shuāng.',
        'Les cristaux s\'empilent couche après couche et font le givre blanc.'),
    ],
    ['霜不是从天上掉下来的，是在物体上长出来的。', 'shuāng bú shì cóng tiān shàng diào xià lái de, shì zài wù tǐ shàng zhǎng chū lái de.', 'Le givre ne tombe pas du ciel : il pousse directement sur les objets.'],
    [
      Q('霜是从哪里来的？', 'shuāng shì cóng nǎ lǐ lái de', 'D\'où vient le givre?', [o('空气里的水汽', 'kōng qì lǐ de shuǐ qì', 'De la vapeur d\'eau de l\'air', '💨'), o('天上掉下来的雪', 'tiān shàng diào xià lái de xuě', 'De la neige tombée du ciel', '❄️'), o('地下冒出来的', 'dì xià mào chū lái de', 'Ça sort du sol', '🕳️')], 0),
      Q('什么时候容易结霜？', 'shén me shí hou róng yì jié shuāng', 'Quand se forme le givre?', [o('很冷的夜里', 'hěn lěng de yè lǐ', 'Pendant une nuit très froide', '🌙'), o('热的中午', 'rè de zhōng wǔ', 'En plein midi chaud', '☀️'), o('下雨的夏天', 'xià yǔ de xià tiān', 'Un été pluvieux', '🌧️')], 0),
    ]),

  T('lune-surface', '🌕', 1,
    ['月亮上有什么？', 'yuè liang shàng yǒu shén me', 'Qu\'y a-t-il sur la lune?'],
    [
      S(W(moon(200, 150, 110), '#2b3157').replace('</svg>', `<circle cx="150" cy="105" r="22" fill="none" stroke="#b8ad7f" stroke-width="4"/><circle cx="240" cy="190" r="30" fill="none" stroke="#b8ad7f" stroke-width="4"/><circle cx="250" cy="100" r="12" fill="none" stroke="#b8ad7f" stroke-width="4"/><circle cx="140" cy="200" r="14" fill="none" stroke="#b8ad7f" stroke-width="4"/></svg>`),
        '月亮表面有很多大大小小的坑。', 'yuè liang biǎo miàn yǒu hěn duō dà dà xiǎo xiǎo de kēng.',
        'La surface de la lune est couverte de cratères, grands et petits.'),
      S(W(`<path d="M-5 250Q100 230 200 245T405 240V305H-5Z" fill="#b9b4a0" stroke="${O}" stroke-width="3"/><ellipse cx="270" cy="270" rx="45" ry="12" fill="#9e9985"/>` + `<circle cx="80" cy="60" r="16" fill="#8b7a6a" stroke="${O}" stroke-width="3"/>` + arrow(100, 78, 255, 255, '#e8514a', 4), night),
        '这些坑是石头从太空砸出来的。', 'zhè xiē kēng shì shí tou cóng tài kōng zá chū lái de.',
        'Ces cratères ont été creusés par des roches venues de l\'espace.'),
      S(W(star(50, 50, 7) + star(330, 40, 6) + star(150, 90, 5) + star(280, 110, 6) + earth(320, 70, 30) + `<path d="M-5 230Q120 205 230 225T405 215V305H-5Z" fill="#b9b4a0" stroke="${O}" stroke-width="3"/><ellipse cx="90" cy="265" rx="40" ry="10" fill="#9e9985"/>` + kid(250, 238, 1.3), '#10142e'),
        '月亮上没有空气，也没有风和雨。', 'yuè liang shàng méi yǒu kōng qì, yě méi yǒu fēng hé yǔ.',
        'Sur la lune, il n\'y a ni air, ni vent, ni pluie.'),
    ],
    ['人类曾经登上月亮，脚印还留着。', 'rén lèi céng jīng dēng shàng yuè liang, jiǎo yìn hái liú zhe.', 'Des humains ont marché sur la lune, et leurs traces y sont toujours.'],
    [
      Q('月亮表面有什么？', 'yuè liang biǎo miàn yǒu shén me', 'Qu\'y a-t-il à la surface de la lune?', [o('很多坑', 'hěn duō kēng', 'Plein de cratères', '🕳️'), o('很多树', 'hěn duō shù', 'Plein d\'arbres', '🌳'), o('很多河', 'hěn duō hé', 'Plein de rivières', '🏞️')], 0),
      Q('月亮上为什么没有风？', 'yuè liang shàng wèi shén me méi yǒu fēng', 'Pourquoi n\'y a-t-il pas de vent sur la lune?', [o('因为没有空气', 'yīn wèi méi yǒu kōng qì', 'Parce qu\'il n\'y a pas d\'air', '🚫'), o('因为太冷了', 'yīn wèi tài lěng le', 'Parce qu\'il fait trop froid', '🥶'), o('因为太小了', 'yīn wèi tài xiǎo le', 'Parce qu\'elle est trop petite', '🔹')], 0),
    ]),

  T('etoile-filante', '🌠', 1,
    ['流星是什么？', 'liú xīng shì shén me', 'Qu\'est-ce qu\'une étoile filante?'],
    [
      S(W(star(60, 60, 6) + star(330, 50, 6) + star(270, 150, 5) + [[110, 190, 10], [180, 120, 14], [260, 220, 8], [320, 190, 12]].map(([x, y, r]) => `<path d="M${x - r} ${y}l${r * .5} -${r}l${r} -${r * .3}l${r * .6} ${r * .8}l-${r * .4} ${r}l-${r * 1.2} ${r * .2}z" fill="#8d93a8" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>`).join(''), night),
        '太空里有很多小小的石头。', 'tài kōng lǐ yǒu hěn duō xiǎo xiǎo de shí tou.',
        'Dans l\'espace, il y a plein de petits cailloux.'),
      S(W(`<path d="M-5 230Q200 200 405 230V305H-5Z" fill="#4aa8e8" opacity=".5"/>` + `<path d="M60 30L210 150" stroke="#ffd54a" stroke-width="12" stroke-linecap="round" opacity=".6"/><path d="M80 45L210 150" stroke="#fff" stroke-width="4" stroke-linecap="round"/>` + `<circle cx="215" cy="154" r="11" fill="#8d93a8" stroke="${O}" stroke-width="3"/>` + `<rect x="-5" y="130" width="410" height="8" fill="#9ad0f2" opacity=".5"/>`, '#1b2146'),
        '它们飞进地球的空气里，一下子烧得发亮。', 'tā men fēi jìn dì qiú de kōng qì lǐ, yí xià zi shāo de fā liàng.',
        'Elles foncent dans l\'air de la Terre et s\'enflamment en brillant.'),
      S(W(star(60, 50, 6) + star(330, 90, 6) + star(150, 40, 5) + `<path d="M70 50Q180 70 300 150" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="305" cy="154" r="7" fill="#ffd54a"/>` + fir(70, 270, 1.4) + fir(150, 275, 1.1) + fir(330, 270, 1.5) + ground(262, '#f2f6fa'), night),
        '我们看到一道光划过夜空，就是流星。', 'wǒ men kàn dào yí dào guāng huá guò yè kōng, jiù shì liú xīng.',
        'On voit un trait de lumière traverser le ciel de nuit : c\'est une étoile filante.'),
    ],
    ['流星不是星星，大多数只有沙粒那么大。', 'liú xīng bú shì xīng xing, dà duō shù zhǐ yǒu shā lì nà me dà.', 'Une étoile filante n\'est pas une étoile. La plupart ne sont pas plus grosses qu\'un grain de sable.'],
    [
      Q('流星其实是什么？', 'liú xīng qí shí shì shén me', 'Qu\'est-ce qu\'une étoile filante en réalité?', [o('小石头', 'xiǎo shí tou', 'Un petit caillou de l\'espace', '🪨'), o('掉下来的星星', 'diào xià lái de xīng xing', 'Une étoile qui tombe', '⭐'), o('会飞的灯', 'huì fēi de dēng', 'Une lampe volante', '💡')], 0),
      Q('流星为什么会发亮？', 'liú xīng wèi shén me huì fā liàng', 'Pourquoi brille-t-elle?', [o('它冲进空气，变热了', 'tā chōng jìn kōng qì, biàn rè le', 'Elle fonce dans l\'air et chauffe', '🔥'), o('它带着小灯', 'tā dài zhe xiǎo dēng', 'Elle porte une petite lampe', '🔦'), o('月亮照着它', 'yuè liang zhào zhe tā', 'La lune l\'éclaire', '🌙')], 0),
    ]),
];

const hexa = (x, y, r, fill = 'none', c = '#fff', w = 4) => `<polygon points="${[0, 1, 2, 3, 4, 5].map((i) => `${n(x + Math.cos(i * Math.PI / 3 - Math.PI / 6) * r)},${n(y + Math.sin(i * Math.PI / 3 - Math.PI / 6) * r)}`).join(' ')}" fill="${fill}" stroke="${c}" stroke-width="${w}" stroke-linejoin="round"/>`;
const tiltEarth = (x, y, r, deg) => `<g transform="rotate(${deg} ${x} ${y})"><line x1="${x}" y1="${y - r - 22}" x2="${x}" y2="${y + r + 22}" stroke="#e8514a" stroke-width="4" stroke-linecap="round"/>${earth(x, y, r)}</g>`;
const sunlit = (x, y, r) => `<g>${ball(x, y, r, '#4b5170')}<path d="M${x} ${y - r}A${r} ${r} 0 0 0 ${x} ${y + r}Z" fill="#f5ecc8"/></g>`;
const space = '#2b3157';
const sunRays = (y0 = 100) => [y0, 150, 300 - y0].map((y) => arrow(105, y, 232, 150 + (y - 150) * .5, '#f5c518', 4)).join('');

const L2 = [
  T('bleu', '🔵', 2,
    ['天空为什么是蓝色的？', 'tiān kōng wèi shén me shì lán sè de', 'Pourquoi le ciel est-il bleu?'],
    [
      S(W(sun(50, 150, 28) + `<line x1="95" y1="150" x2="170" y2="150" stroke="#fff" stroke-width="12" stroke-linecap="round"/>` + spectrum(175, 150, 370, 150, 22), '#46507a'),
        '太阳光看起来是白色的，里面藏着很多颜色。', 'tài yáng guāng kàn qǐ lái shì bái sè de, lǐ miàn cáng zhe hěn duō yán sè.',
        'La lumière du soleil paraît blanche, mais elle cache plein de couleurs.'),
      S(W(sun(50, 50, 24) + `<line x1="80" y1="70" x2="180" y2="140" stroke="#f5a623" stroke-width="8" stroke-linecap="round"/>` + [[210, 150], [270, 110], [260, 200], [330, 160], [200, 215]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#e6f4ff" stroke="${O}" stroke-width="2"/>` + [0, 1, 2, 3, 4].map((k) => { const a = k * 1.26 + x; return arrow(x, y, n(x + Math.cos(a) * 34), n(y + Math.sin(a) * 34), '#2f7fe0', 3); }).join('')).join('')),
        '空气会把蓝光向四面八方撒开。', 'kōng qì huì bǎ lán guāng xiàng sì miàn bā fāng sā kāi.',
        'L\'air éparpille la lumière bleue dans toutes les directions.'),
      S(W([[60, 40, 140, 190], [200, 30, 190, 190], [340, 50, 255, 195], [90, 110, 150, 205], [310, 130, 245, 215]].map(([x1, y1, x2, y2]) => arrow(x1, y1, x2, y2, '#2f7fe0', 4)).join('') + ground(235) + kid(200, 235, 1.4), '#8cc8f5'),
        '蓝光到处都是，所以我们看到蓝天。', 'lán guāng dào chù dōu shì, suǒ yǐ wǒ men kàn dào lán tiān.',
        'Il y a de la lumière bleue partout, alors on voit un ciel bleu.'),
    ],
    ['火星的白天，天空是淡红色的。', 'huǒ xīng de bái tiān, tiān kōng shì dàn hóng sè de.', 'Sur Mars, le ciel de jour est rougeâtre.'],
    [
      Q('太阳光里藏着什么？', 'tài yáng guāng lǐ cáng zhe shén me', 'Qu\'est-ce que la lumière du soleil cache?', [o('很多种颜色', 'hěn duō zhǒng yán sè', 'Plein de couleurs', '🌈'), o('只有黄色', 'zhǐ yǒu huáng sè', 'Seulement du jaune', '🟡'), o('只有白色', 'zhǐ yǒu bái sè', 'Seulement du blanc', '⚪')], 0),
      Q('是什么把蓝光撒开？', 'shì shén me bǎ lán guāng sā kāi', 'Qu\'est-ce qui éparpille la lumière bleue?', [o('空气', 'kōng qì', 'L\'air', '💨'), o('月亮', 'yuè liang', 'La lune', '🌙'), o('雪', 'xuě', 'La neige', '❄️')], 0),
    ]),

  T('coucher', '🌇', 2,
    ['夕阳为什么是红的？', 'xī yáng wèi shén me shì hóng de', 'Pourquoi le soleil couchant est-il rouge?'],
    [
      S(W(`<circle cx="200" cy="440" r="240" fill="#bfe3fa"/><circle cx="200" cy="440" r="210" fill="#7bc96f" stroke="${O}" stroke-width="3"/>` + kid(200, 232, 1) + sun(200, 25, 16) + arrow(200, 50, 200, 180, '#f5c518', 4) + sun(365, 160, 16) + arrow(340, 170, 225, 215, '#f5923e', 4)),
        '傍晚，太阳在天边，光要走更长的路才到我们这里。', 'bàng wǎn, tài yáng zài tiān biān, guāng yào zǒu gèng cháng de lù cái dào wǒ men zhè lǐ.',
        'Le soir, le soleil est à l\'horizon : sa lumière fait un plus long chemin dans l\'air.'),
      S(W(sun(40, 150, 26) + `<line x1="85" y1="150" x2="285" y2="150" stroke="#f5923e" stroke-width="7" stroke-linecap="round"/>` + [130, 180, 230].map((x) => arrow(x, 145, x - 15, 85, '#2f7fe0', 3) + arrow(x, 155, x - 15, 215, '#2f7fe0', 3)).join('') + arrow(285, 150, 335, 150, '#e8514a', 7) + kid(360, 200, 1), '#f9e4c8'),
        '路上，蓝光被空气撒开了，剩下红光和橙光。', 'lù shàng, lán guāng bèi kōng qì sā kāi le, shèng xià hóng guāng hé chéng guāng.',
        'En chemin, l\'air éparpille le bleu. Il reste le rouge et l\'orange.'),
      S(W(`<circle cx="200" cy="215" r="120" fill="#f9c36e" opacity=".6"/><circle cx="200" cy="215" r="48" fill="#ffd54a"/>` + `<rect x="-5" y="215" width="410" height="90" fill="#3d5a8c" stroke="${O}" stroke-width="3"/>` + [235, 250, 265].map((y, i) => `<path d="M${170 + i * 8} ${y}h${60 - i * 16}" stroke="#f9c36e" stroke-width="4" stroke-linecap="round"/>`).join('') + fir(60, 218, 1.1) + fir(340, 218, 1.3), '#f6a56a'),
        '红橙色的光照亮天空，就是红红的晚霞。', 'hóng chéng sè de guāng zhào liàng tiān kōng, jiù shì hóng hóng de wǎn xiá.',
        'La lumière rouge-orangé colore le ciel : c\'est un beau coucher de soleil.'),
    ],
    ['清晨的朝霞也是红色的，原因一样。', 'qīng chén de zhāo xiá yě shì hóng sè de, yuán yīn yí yàng.', 'Le lever de soleil est rouge aussi, pour la même raison.'],
    [
      Q('傍晚太阳光走的路怎么样？', 'bàng wǎn tài yáng guāng zǒu de lù zěn me yàng', 'Le soir, comment est le chemin de la lumière du soleil?', [o('更长', 'gèng cháng', 'Plus long', '↔️'), o('更短', 'gèng duǎn', 'Plus court', '🔹'), o('一样长', 'yí yàng cháng', 'Pareil qu\'à midi', '🟰')], 0),
      Q('夕阳变红，是因为蓝光怎么样了？', 'xī yáng biàn hóng, shì yīn wèi lán guāng zěn me yàng le', 'Le soleil devient rouge, car la lumière bleue...', [o('被撒开了', 'bèi sā kāi le', 'a été éparpillée', '✨'), o('掉进海里了', 'diào jìn hǎi lǐ le', 'est tombée dans la mer', '🌊'), o('变成红光了', 'biàn chéng hóng guāng le', 'est devenue rouge', '🔴')], 0),
    ]),

  T('flocon', '❄️', 2,
    ['雪花为什么是六角形？', 'xuě huā wèi shén me shì liù jiǎo xíng', 'Pourquoi les flocons ont-ils six branches?'],
    [
      S(W(hexa(200, 150, 100) + [0, 1, 2, 3, 4, 5].map((i) => `<line x1="200" y1="150" x2="${n(200 + Math.cos(i * Math.PI / 3 - Math.PI / 6) * 100)}" y2="${n(150 + Math.sin(i * Math.PI / 3 - Math.PI / 6) * 100)}" stroke="#fff" stroke-width="3"/><circle cx="${n(200 + Math.cos(i * Math.PI / 3 - Math.PI / 6) * 100)}" cy="${n(150 + Math.sin(i * Math.PI / 3 - Math.PI / 6) * 100)}" r="9" fill="#fff"/>`).join('') + `<circle cx="200" cy="150" r="10" fill="#fff"/>`, '#5b7aa8'),
        '水变成冰晶时，会排成整齐的六边形。', 'shuǐ biàn chéng bīng jīng shí, huì pái chéng zhěng qí de liù biān xíng.',
        'En devenant glace, l\'eau s\'organise en hexagones bien rangés.'),
      S(W(hexa(60, 150, 26, '#fff') + arrow(100, 150, 140, 150, '#fff', 4) + flake(200, 150, 40, '#fff', 4) + hexa(200, 150, 14, '#fff') + arrow(250, 150, 285, 150, '#fff', 4) + flake(340, 150, 58, '#fff', 4) + hexa(340, 150, 14, '#fff'), '#5b7aa8'),
        '小冰晶一边飘，一边在六个角上长出新的枝。', 'xiǎo bīng jīng yì biān piāo, yì biān zài liù gè jiǎo shàng zhǎng chū xīn de zhī.',
        'Le petit cristal flotte et fait pousser de nouvelles branches sur ses six coins.'),
      S(W(flake(80, 150, 60, '#fff', 4) + hexa(200, 150, 40, 'none', '#9cc4e8', 3) + flake(200, 150, 34, '#fff', 3) + flake(320, 150, 62, '#fff', 5) + `<circle cx="320" cy="150" r="22" fill="none" stroke="#fff" stroke-width="3"/>`, '#5b7aa8'),
        '每片雪花飘的路不一样，所以样子都不同。', 'měi piàn xuě huā piāo de lù bù yí yàng, suǒ yǐ yàng zi dōu bù tóng.',
        'Chaque flocon suit un chemin différent, alors ils ne se ressemblent pas.'),
    ],
    ['雪花大多有六个角，每片都不一样。', 'xuě huā dà duō yǒu liù gè jiǎo, měi piàn dōu bù yí yàng.', 'La plupart des flocons ont six branches, et chacun est différent.'],
    [
      Q('雪花大多有几个角？', 'xuě huā dà duō yǒu jǐ gè jiǎo', 'Combien de branches ont la plupart des flocons?', [o('六个', 'liù gè', 'Six', '❄️'), o('四个', 'sì gè', 'Quatre', '4️⃣'), o('八个', 'bā gè', 'Huit', '8️⃣')], 0),
      Q('每片雪花的样子一样吗？', 'měi piàn xuě huā de yàng zi yí yàng ma', 'Tous les flocons sont-ils identiques?', [o('都不一样', 'dōu bù yí yàng', 'Non, chacun est différent', '🔍'), o('全都一样', 'quán dōu yí yàng', 'Oui, tous pareils', '🟰'), o('都是圆的', 'dōu shì yuán de', 'Ils sont tous ronds', '⚪')], 0),
    ]),

  T('phases-lune', '🌙', 2,
    ['月亮为什么会变形？', 'yuè liang wèi shén me huì biàn xíng', 'Pourquoi la lune change-t-elle de forme?'],
    [
      S(W(sun(50, 150, 26) + [110, 150, 190].map((y) => arrow(95, y, 195, 150 + (y - 150) * .4, '#f5c518', 4)).join('') + sunlit(260, 150, 48) + star(340, 50, 6) + star(350, 250, 6) + star(150, 40, 5), space),
        '月亮自己不发光，是反射太阳的光。', 'yuè liang zì jǐ bù fā guāng, shì fǎn shè tài yáng de guāng.',
        'La lune ne fait pas de lumière : elle renvoie celle du soleil.'),
      S(W(sun(30, 150, 20) + `<circle cx="230" cy="150" r="88" fill="none" stroke="#9aa3c8" stroke-width="2" stroke-dasharray="6 6"/>` + earth(230, 150, 28) + sunlit(230, 62, 14) + sunlit(318, 150, 14) + sunlit(230, 238, 14) + sunlit(142, 150, 14) + arrow(300, 100, 318, 120, '#fff', 3), space),
        '月亮绕着地球转，太阳总是照亮它的一半。', 'yuè liang rào zhe dì qiú zhuàn, tài yáng zǒng shì zhào liàng tā de yí bàn.',
        'La lune tourne autour de la Terre. Le soleil en éclaire toujours une moitié.'),
      S(W([[50, null], [125, -.6], [200, 0], [275, .55], [350, 1]].map(([x, t]) => phase(x, 150, 32, t)).join('') + star(70, 50, 6) + star(280, 50, 5) + star(180, 250, 6) + star(330, 245, 5), space),
        '我们从地球上看，看到的亮面一天天不一样。', 'wǒ men cóng dì qiú shàng kàn, kàn dào de liàng miàn yì tiān tiān bù yí yàng.',
        'Vue de la Terre, la partie éclairée change de jour en jour.'),
    ],
    ['大约一个月，月亮就变一个来回。', 'dà yuē yí gè yuè, yuè liang jiù biàn yí gè lái huí.', 'En environ un mois, la lune fait un cycle complet.'],
    [
      Q('月亮自己会发光吗？', 'yuè liang zì jǐ huì fā guāng ma', 'La lune fait-elle sa propre lumière?', [o('不会，它反射太阳光', 'bú huì, tā fǎn shè tài yáng guāng', 'Non, elle renvoie la lumière du soleil', '☀️'), o('会，像灯一样', 'huì, xiàng dēng yí yàng', 'Oui, comme une lampe', '💡'), o('会，像火一样', 'huì, xiàng huǒ yí yàng', 'Oui, comme un feu', '🔥')], 0),
      Q('月亮绕着什么转？', 'yuè liang rào zhe shén me zhuàn', 'Autour de quoi tourne la lune?', [o('地球', 'dì qiú', 'La Terre', '🌍'), o('太阳', 'tài yáng', 'Le soleil', '☀️'), o('火星', 'huǒ xīng', 'Mars', '🔴')], 0),
      Q('月亮变一个来回，大约要多久？', 'yuè liang biàn yí gè lái huí, dà yuē yào duō jiǔ', 'Combien de temps dure un cycle de la lune?', [o('一个月', 'yí gè yuè', 'Un mois', '📅'), o('一天', 'yì tiān', 'Un jour', '☀️'), o('一年', 'yì nián', 'Un an', '🎂')], 0),
    ]),

  T('saisons', '🍁', 2,
    ['为什么有四季？', 'wèi shén me yǒu sì jì', 'Pourquoi y a-t-il quatre saisons?'],
    [
      S(W(tiltEarth(200, 150, 70, 23) + arrow(250, 52, 262, 30, O, 3), '#e9eefc'),
        '地球的轴是歪着的，像一个斜斜的陀螺。', 'dì qiú de zhóu shì wāi zhe de, xiàng yí gè xié xié de tuó luó.',
        'L\'axe de la Terre est penché, comme une toupie inclinée.'),
      S(W(sun(200, 150, 28) + `<ellipse cx="200" cy="150" rx="150" ry="100" fill="none" stroke="#9aa3c8" stroke-width="2" stroke-dasharray="6 6"/>` + [[200, 50], [350, 150], [200, 250], [50, 150]].map(([x, y]) => tiltEarth(x, y, 14, 23)).join('') + arrow(300, 60, 335, 100, O, 3), '#e9eefc'),
        '地球绕太阳走一圈，要一年。', 'dì qiú rào tài yáng zǒu yì quān, yào yì nián.',
        'La Terre fait un tour autour du soleil en un an.'),
      S(W(sun(55, 150, 34) + sunRays() + tiltEarth(300, 150, 55, -23) + tree(355, 85, .8), '#e9eefc'),
        '我们这半边斜向太阳，太阳光照得直，就是夏天。', 'wǒ men zhè bàn biān xié xiàng tài yáng, tài yáng guāng zhào de zhí, jiù shì xià tiān.',
        'Quand notre moitié se penche vers le soleil, il l\'éclaire bien en face : c\'est l\'été.'),
      S(W(sun(55, 150, 34) + sunRays() + tiltEarth(300, 150, 55, 23) + flake(355, 75, 20, '#6aa8dc', 3), '#e9eefc'),
        '斜着躲开太阳，光照得斜，就是冬天。', 'xié zhe duǒ kāi tài yáng, guāng zhào de xié, jiù shì dōng tiān.',
        'Quand elle se penche loin du soleil, la lumière arrive de biais : c\'est l\'hiver.'),
    ],
    ['其实一月地球离太阳更近，我们却在过冬天。', 'qí shí yī yuè dì qiú lí tài yáng gèng jìn, wǒ men què zài guò dōng tiān.', 'En janvier, la Terre est en fait plus proche du soleil, et pourtant c\'est l\'hiver chez nous.'],
    [
      Q('四季是因为什么？', 'sì jì shì yīn wèi shén me', 'Pourquoi y a-t-il des saisons?', [o('地球的轴是歪的', 'dì qiú de zhóu shì wāi de', 'L\'axe de la Terre est penché', '🌍'), o('太阳时大时小', 'tài yáng shí dà shí xiǎo', 'Le soleil change de taille', '☀️'), o('月亮挡住太阳', 'yuè liang dǎng zhù tài yáng', 'La lune cache le soleil', '🌙')], 0),
      Q('地球绕太阳一圈要多久？', 'dì qiú rào tài yáng yì quān yào duō jiǔ', 'Combien de temps la Terre met-elle pour faire le tour du soleil?', [o('一年', 'yì nián', 'Un an', '🎂'), o('一天', 'yì tiān', 'Un jour', '☀️'), o('一个月', 'yí gè yuè', 'Un mois', '🌙')], 0),
      Q('我们这半边斜向太阳时，是什么季节？', 'wǒ men zhè bàn biān xié xiàng tài yáng shí, shì shén me jì jié', 'Quand notre moitié se penche vers le soleil, c\'est quelle saison?', [o('夏天', 'xià tiān', 'L\'été', '🏖️'), o('冬天', 'dōng tiān', 'L\'hiver', '⛄'), o('半夜', 'bàn yè', 'Le milieu de la nuit', '🌙')], 0),
    ]),

  T('hiver-court', '🕓', 2,
    ['为什么冬天白天很短？', 'wèi shén me dōng tiān bái tiān hěn duǎn', 'Pourquoi les jours sont-ils courts en hiver?'],
    [
      S(W(sun(55, 150, 34) + sunRays() + tiltEarth(300, 150, 55, 23) + flake(355, 75, 20, '#6aa8dc', 3), '#e9eefc'),
        '冬天，我们这半边斜着背向太阳。', 'dōng tiān, wǒ men zhè bàn biān xié zhe bèi xiàng tài yáng.',
        'En hiver, notre moitié de la Terre se penche loin du soleil.'),
      S(W(`<path d="M40 235Q200 110 360 235" fill="none" stroke="#f5a623" stroke-width="4" stroke-dasharray="8 8"/>` + sun(200, 168, 18) + ground(235, '#dfeaf2') + fir(60, 238, 1.1) + fir(330, 238, 1.3), '#dbe7f5'),
        '太阳升得低，在天上走的路短，白天就短。', 'tài yáng shēng de dī, zài tiān shàng zǒu de lù duǎn, bái tiān jiù duǎn.',
        'Le soleil reste bas et fait un petit chemin dans le ciel : le jour est court.'),
      S(W(`<path d="M30 235Q200 -50 370 235" fill="none" stroke="#f5a623" stroke-width="4" stroke-dasharray="8 8"/>` + sun(200, 96, 24) + ground(235) + tree(70, 240, 1.1) + tree(330, 240, 1.3), '#bfe3fa'),
        '夏天正好相反，太阳升得高，白天又长又亮。', 'xià tiān zhèng hǎo xiāng fǎn, tài yáng shēng de gāo, bái tiān yòu cháng yòu liàng.',
        'En été, c\'est le contraire : le soleil monte haut et le jour est long et lumineux.'),
    ],
    ['冬天在魁北克，下午四五点天就黑了。', 'dōng tiān zài kuí běi kè, xià wǔ sì wǔ diǎn tiān jiù hēi le.', 'En hiver au Québec, il fait déjà noir vers quatre ou cinq heures de l\'après-midi.'],
    [
      Q('冬天白天怎么样？', 'dōng tiān bái tiān zěn me yàng', 'Comment est le jour en hiver?', [o('比较短', 'bǐ jiào duǎn', 'Plutôt court', '🌆'), o('比较长', 'bǐ jiào cháng', 'Plutôt long', '☀️'), o('没有白天', 'méi yǒu bái tiān', 'Il n\'y a pas de jour', '🌑')], 0),
      Q('冬天太阳升得怎么样？', 'dōng tiān tài yáng shēng de zěn me yàng', 'En hiver, le soleil monte...', [o('比较低', 'bǐ jiào dī', 'moins haut', '🔽'), o('比较高', 'bǐ jiào gāo', 'plus haut', '🔼'), o('一直不升起', 'yì zhí bù shēng qǐ', 'il ne se lève jamais', '🚫')], 0),
    ]),

  T('aurore', '🌌', 2,
    ['北极光是什么？', 'běi jí guāng shì shén me', 'Qu\'est-ce que l\'aurore boréale?'],
    [
      S(W(sun(50, 150, 26) + [[110, 120], [150, 160], [190, 130], [230, 170], [200, 190], [140, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#ffd54a"/>`).join('') + arrow(220, 150, 285, 150, '#ffd54a', 4) + earth(335, 150, 32), space),
        '太阳会向太空吹出很多小小的带电颗粒。', 'tài yáng huì xiàng tài kōng chuī chū hěn duō xiǎo xiǎo de dài diàn kē lì.',
        'Le soleil souffle dans l\'espace plein de minuscules particules chargées d\'électricité.'),
      S(W(earth(200, 150, 50) + ['M200 100C110 10 110 290 200 200', 'M200 100C40 -30 40 330 200 200', 'M200 100C290 10 290 290 200 200', 'M200 100C360 -30 360 330 200 200'].map((d) => `<path d="${d}" fill="none" stroke="#9aa3c8" stroke-width="2.5"/>`).join('') + [[25, 60], [40, 100], [380, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#ffd54a"/>`).join('') + arrow(60, 80, 125, 35, '#ffd54a', 3) + arrow(70, 230, 135, 262, '#ffd54a', 3), space),
        '地球像一块大磁铁，把它们引向南北两端。', 'dì qiú xiàng yí kuài dà cí tiě, bǎ tā men yǐn xiàng nán běi liǎng duān.',
        'La Terre est comme un gros aimant : il guide les particules vers les pôles Nord et Sud.'),
      S(W(star(50, 40, 5, '#fff') + star(330, 50, 6, '#fff') + star(160, 30, 4, '#fff') + `<path d="M-5 150C70 60 150 130 230 60S370 110 405 70V120C370 160 300 110 230 130S70 190 -5 200Z" fill="#5ee08a" opacity=".75"/><path d="M-5 175C70 100 150 160 230 100S370 140 405 110V130C370 170 300 130 230 150S70 200 -5 210Z" fill="#9bf0b8" opacity=".5"/>` + ground(268, '#e8f0f8') + fir(70, 275, 1.5) + fir(150, 280, 1.2) + fir(260, 275, 1.4) + fir(340, 280, 1.7), '#12183a'),
        '它们撞上高处的空气，空气就发出绿色的光。', 'tā men zhuàng shàng gāo chù de kōng qì, kōng qì jiù fā chū lǜ sè de guāng.',
        'Elles frappent l\'air en haute altitude, et l\'air s\'illumine en vert.'),
    ],
    ['在魁北克北部，冬夜里有机会看到北极光。', 'zài kuí běi kè běi bù, dōng yè lǐ yǒu jī huì kàn dào běi jí guāng.', 'Dans le nord du Québec, on peut voir des aurores boréales les nuits d\'hiver.'],
    [
      Q('北极光出现在哪里？', 'běi jí guāng chū xiàn zài nǎ lǐ', 'Où apparaissent les aurores boréales?', [o('靠近北极的夜空', 'kào jìn běi jí de yè kōng', 'Dans le ciel de nuit près du pôle Nord', '🌌'), o('海底', 'hǎi dǐ', 'Au fond de la mer', '🌊'), o('屋子里', 'wū zi lǐ', 'Dans la maison', '🏠')], 0),
      Q('北极光常见的颜色是什么？', 'běi jí guāng cháng jiàn de yán sè shì shén me', 'Quelle est une couleur fréquente des aurores?', [o('绿色', 'lǜ sè', 'Vert', '🟢'), o('黑色', 'hēi sè', 'Noir', '⚫'), o('棕色', 'zōng sè', 'Brun', '🟤')], 0),
    ]),

  T('etoiles-scintillent', '✨', 2,
    ['星星为什么一闪一闪？', 'xīng xing wèi shén me yì shǎn yì shǎn', 'Pourquoi les étoiles scintillent-elles?'],
    [
      S(W(star(45, 50, 22) + `<line x1="75" y1="70" x2="290" y2="205" stroke="#fff" stroke-width="3" stroke-dasharray="10 9" stroke-linecap="round"/>` + earth(335, 230, 38), space),
        '星星离我们非常非常远，是很远的太阳。', 'xīng xing lí wǒ men fēi cháng fēi cháng yuǎn, shì hěn yuǎn de tài yáng.',
        'Les étoiles sont très, très loin : ce sont des soleils lointains.'),
      S(W(`<rect x="-5" y="140" width="410" height="80" fill="#6fa8e0" opacity=".45"/>` + star(50, 40, 14, '#fff') + `<path d="M62 52L190 140L205 160L185 178L208 198L195 222L200 245" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>` + `<rect x="-5" y="262" width="410" height="45" fill="#4a5a7a"/>` + kid(200, 285, .8), space),
        '星光穿过地球的空气，空气一直在晃动。', 'xīng guāng chuān guò dì qiú de kōng qì, kōng qì yì zhí zài huàng dòng.',
        'La lumière des étoiles traverse l\'air de la Terre, et l\'air bouge sans cesse.'),
      S(W([[60, 50], [150, 100], [250, 40], [330, 110], [90, 170], [200, 150], [300, 190]].map(([x, y]) => star(x, y, 9, '#fff') + `<path d="M${x - 16} ${y}H${x + 16}M${x} ${y - 16}V${y + 16}" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`).join('') + ground(265, '#e8f0f8') + fir(60, 275, 1.4) + fir(330, 275, 1.5), '#12183a'),
        '光被晃得弯来弯去，我们看到星星在闪。', 'guāng bèi huàng de wān lái wān qù, wǒ men kàn dào xīng xing zài shǎn.',
        'La lumière est courbée dans tous les sens, alors les étoiles semblent clignoter.'),
    ],
    ['在太空里没有空气，星星不眨眼的。', 'zài tài kōng lǐ méi yǒu kōng qì, xīng xing bù zhǎ yǎn de.', 'Dans l\'espace, il n\'y a pas d\'air, et les étoiles ne scintillent pas.'],
    [
      Q('星星为什么看起来在闪？', 'xīng xing wèi shén me kàn qǐ lái zài shǎn', 'Pourquoi les étoiles semblent-elles scintiller?', [o('光穿过晃动的空气', 'guāng chuān guò huàng dòng de kōng qì', 'Leur lumière traverse un air qui bouge', '🌬️'), o('星星在眨眼睛', 'xīng xing zài zhǎ yǎn jing', 'Elles clignent des yeux', '👀'), o('星星在跳舞', 'xīng xing zài tiào wǔ', 'Elles dansent', '💃')], 0),
      Q('星星其实像什么？', 'xīng xing qí shí xiàng shén me', 'À quoi ressemblent vraiment les étoiles?', [o('很远的太阳', 'hěn yuǎn de tài yáng', 'À des soleils très lointains', '☀️'), o('小灯泡', 'xiǎo dēng pào', 'À de petites ampoules', '💡'), o('萤火虫', 'yíng huǒ chóng', 'À des lucioles', '🪲')], 0),
    ]),

  T('grele', '🧊', 2,
    ['冰雹是什么？', 'bīng báo shì shén me', 'Qu\'est-ce que la grêle?'],
    [
      S(W(ground(262) + cloud(200, 150, 3.2, '#6b7390') + [150, 200, 250].map((x) => arrow(x, 245, x, 95, '#fff', 6)).join('') + [140, 215, 265].map((x) => flake(x, 70, 9, '#9cc4e8', 2.5)).join(''), '#9aa6c0'),
        '雷雨云里，强风把水滴吹到又高又冷的地方。', 'léi yǔ yún lǐ, qiáng fēng bǎ shuǐ dī chuī dào yòu gāo yòu lěng de dì fāng.',
        'Dans le nuage d\'orage, un vent fort pousse les gouttes très haut, là où il fait très froid.'),
      S(W([78, 62, 46, 30, 14].map((r, i) => `<circle cx="200" cy="150" r="${r}" fill="${i % 2 ? '#dff1ff' : '#fff'}" stroke="${O}" stroke-width="3"/>`).join('') + arrow(290, 150, 340, 150, '#4aa8e8', 4) + drop(335, 100, 1.2) + drop(60, 90, 1.2) + drop(350, 210, 1.2), '#9aa6c0'),
        '水滴冻成冰粒，一层一层包上更多的冰，越变越大。', 'shuǐ dī dòng chéng bīng lì, yì céng yì céng bāo shàng gèng duō de bīng, yuè biàn yuè dà.',
        'Les gouttes gèlent, puis s\'enrobent de glace couche après couche et grossissent.'),
      S(W(ground(250) + cloud(200, 55, 2.6, '#6b7390') + [[100, 130], [160, 170], [230, 140], [290, 180], [330, 120], [200, 210], [130, 215]].map(([x, y], i) => `<line x1="${x + 6}" y1="${y - 22}" x2="${x + 2}" y2="${y - 10}" stroke="#fff" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="${8 + i % 3 * 2}" fill="#fff" stroke="${O}" stroke-width="2.5"/>`).join(''), '#9aa6c0'),
        '冰粒太重了，风托不住，就砸下来，这就是冰雹。', 'bīng lì tài zhòng le, fēng tuō bu zhù, jiù zá xià lái, zhè jiù shì bīng báo.',
        'Les grêlons deviennent trop lourds pour le vent et s\'écrasent au sol : c\'est la grêle.'),
    ],
    ['冰雹打下来很疼，下冰雹时要躲进屋里。', 'bīng báo dǎ xià lái hěn téng, xià bīng báo shí yào duǒ jìn wū lǐ.', 'La grêle fait mal : quand il grêle, il faut aller à l\'intérieur.'],
    [
      Q('冰雹是什么？', 'bīng báo shì shén me', 'Qu\'est-ce que la grêle?', [o('一层层长大的冰粒', 'yì céng céng zhǎng dà de bīng lì', 'Des grains de glace qui grossissent couche par couche', '🧊'), o('很大的雪花', 'hěn dà de xuě huā', 'De très gros flocons', '❄️'), o('冻住的雨伞', 'dòng zhù de yǔ sǎn', 'Des parapluies gelés', '☂️')], 0),
      Q('下冰雹时应该怎么办？', 'xià bīng báo shí yīng gāi zěn me bàn', 'Que faire quand il grêle?', [o('躲进屋里', 'duǒ jìn wū lǐ', 'Se mettre à l\'abri à l\'intérieur', '🏠'), o('到外面玩', 'dào wài miàn wán', 'Aller jouer dehors', '🛝'), o('去山顶', 'qù shān dǐng', 'Monter au sommet d\'une montagne', '⛰️')], 0),
    ]),

  T('terre-ronde', '🌍', 2,
    ['地球为什么是圆的？', 'dì qiú wèi shén me shì yuán de', 'Pourquoi la Terre est-elle ronde?'],
    [
      S(W(earth(200, 150, 62) + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = i * Math.PI / 4; return arrow(n(200 + Math.cos(a) * 135), n(150 + Math.sin(a) * 135), n(200 + Math.cos(a) * 82), n(150 + Math.sin(a) * 82), '#e8514a', 5); }).join(''), '#e9eefc'),
        '地球很大很重，会把所有东西往中心拉。', 'dì qiú hěn dà hěn zhòng, huì bǎ suǒ yǒu dōng xi wǎng zhōng xīn lā.',
        'La Terre est grosse et lourde : elle tire tout vers son centre.'),
      S(W(`<path d="M55 115L100 85L148 108L155 160L122 208L70 192L45 150Z" fill="#a8a08e" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>` + arrow(175, 150, 235, 150, O, 5) + earth(320, 150, 62), '#e9eefc'),
        '这个拉力四面八方一样大，就把地球拉成了球。', 'zhè ge lā lì sì miàn bā fāng yí yàng dà, jiù bǎ dì qiú lā chéng le qiú.',
        'Cette attraction est la même de tous les côtés : elle arrondit la Terre en boule.'),
      S(W(`<rect x="298" y="120" width="4" height="50" fill="${O}"/><path d="M300 125L300 165L335 165Z" fill="#fff" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><path d="M280 175h60l-8 18h-44z" fill="#e8514a" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>` + `<circle cx="200" cy="480" r="300" fill="#4aa8e8" stroke="${O}" stroke-width="4"/>` + kid(50, 218, 1.1) + sun(350, 40, 18), '#dff1ff'),
        '船从远处开来，先看到船帆。', 'chuán cóng yuǎn chù kāi lái, xiān kàn dào chuán fān.',
        'Un bateau qui arrive de loin : on voit d\'abord sa voile.'),
    ],
    ['地球其实不是完全圆，赤道那里有点鼓。', 'dì qiú qí shí bú shì wán quán yuán, chì dào nà lǐ yǒu diǎn gǔ.', 'La Terre n\'est pas parfaitement ronde : elle est un peu bombée à l\'équateur.'],
    [
      Q('是什么把地球拉成球？', 'shì shén me bǎ dì qiú lā chéng qiú', 'Qu\'est-ce qui arrondit la Terre?', [o('地球自己的拉力', 'dì qiú zì jǐ de lā lì', 'Sa propre force d\'attraction', '🧲'), o('一只大手', 'yì zhī dà shǒu', 'Une grosse main', '🖐️'), o('风', 'fēng', 'Le vent', '💨')], 0),
      Q('地球是什么形状？', 'dì qiú shì shén me xíng zhuàng', 'Quelle est la forme de la Terre?', [o('球形', 'qiú xíng', 'Une boule', '🌍'), o('方形', 'fāng xíng', 'Un carré', '🟦'), o('三角形', 'sān jiǎo xíng', 'Un triangle', '🔺')], 0),
    ]),

  T('marees', '🌊', 2,
    ['为什么会有潮水？', 'wèi shén me huì yǒu cháo shuǐ', 'Pourquoi y a-t-il des marées?'],
    [
      S(W(earth(120, 150, 55) + moon(335, 150, 28) + [120, 150, 180].map((y) => arrow(190, y, 270, 150 + (y - 150) * .5, '#e8514a', 4)).join(''), space),
        '月亮会拉着地球上的海水。', 'yuè liang huì lā zhe dì qiú shàng de hǎi shuǐ.',
        'La lune tire sur l\'eau des océans.'),
      S(W(`<ellipse cx="190" cy="150" rx="112" ry="68" fill="#4aa8e8" stroke="${O}" stroke-width="3"/>` + earth(190, 150, 56).replace(/fill="#4aa8e8"/, 'fill="#8fb8a0"') + moon(355, 150, 24), space),
        '对着月亮的海水被拉得鼓起来，海边水就涨高了。', 'duì zhe yuè liang de hǎi shuǐ bèi lā de gǔ qǐ lái, hǎi biān shuǐ jiù zhǎng gāo le.',
        'L\'eau face à la lune se gonfle, et le niveau monte sur la côte.'),
      S(W(`<polygon points="175,190 410,190 410,282" fill="#4aa8e8"/><path d="M-5 112L410 282V305H-5Z" fill="#f2d9a0" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>` + `<line x1="170" y1="190" x2="410" y2="190" stroke="${O}" stroke-width="3" stroke-dasharray="8 6"/><line x1="320" y1="250" x2="410" y2="250" stroke="${O}" stroke-width="3" stroke-dasharray="8 6"/>` + arrow(340, 200, 340, 245, O, 4) + arrow(375, 245, 375, 200, O, 4) + moon(60, 60, 22), '#dff1ff'),
        '地球转走了，水位又降低，这就是潮起潮落。', 'dì qiú zhuàn zǒu le, shuǐ wèi yòu jiàng dī, zhè jiù shì cháo qǐ cháo luò.',
        'La Terre tourne, le niveau redescend : c\'est la marée haute puis la marée basse.'),
    ],
    ['加拿大的芬迪湾，潮水能涨落十几米。', 'jiā ná dà de fēn dí wān, cháo shuǐ néng zhǎng luò shí jǐ mǐ.', 'Dans la baie de Fundy, au Canada, la marée peut monter et descendre de plus de dix mètres.'],
    [
      Q('潮水和什么有关？', 'cháo shuǐ hé shén me yǒu guān', 'À quoi les marées sont-elles liées?', [o('月亮', 'yuè liang', 'À la lune', '🌙'), o('星星', 'xīng xing', 'Aux étoiles', '⭐'), o('云', 'yún', 'Aux nuages', '☁️')], 0),
      Q('海水涨上来叫什么？', 'hǎi shuǐ zhǎng shàng lái jiào shén me', 'Comment appelle-t-on la montée de la mer?', [o('涨潮', 'zhǎng cháo', 'La marée haute', '🌊'), o('下雨', 'xià yǔ', 'La pluie', '🌧️'), o('刮风', 'guā fēng', 'Le vent', '💨')], 0),
    ]),

  T('eclipse', '🌑', 2,
    ['日食是怎么回事？', 'rì shí shì zěn me huí shì', 'Qu\'est-ce qu\'une éclipse de soleil?'],
    [
      S(W(sun(50, 150, 34) + moon(200, 150, 18) + earth(340, 150, 26) + arrow(105, 150, 165, 150, '#f5c518', 4), space),
        '月亮绕着地球转，有时正好走到太阳前面。', 'yuè liang rào zhe dì qiú zhuàn, yǒu shí zhèng hǎo zǒu dào tài yáng qián miàn.',
        'La lune tourne autour de la Terre. Parfois, elle passe juste devant le soleil.'),
      S(W(`<polygon points="40,112 190,138 190,162 40,188" fill="#f5c518" opacity=".35"/><polygon points="190,138 190,162 312,152 312,148" fill="#10142e" opacity=".85"/>` + sun(40, 150, 38) + moon(190, 150, 14) + earth(340, 150, 32), space),
        '月亮把太阳光挡住了，地上就变暗了。', 'yuè liang bǎ tài yáng guāng dǎng zhù le, dì shàng jiù biàn àn le.',
        'La lune bloque la lumière du soleil, et le sol s\'assombrit.'),
      S(W(`<circle cx="200" cy="150" r="82" fill="none" stroke="#ffd54a" stroke-width="7" opacity=".65"/>` + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => { const a = i * Math.PI / 6; return `<line x1="${n(200 + Math.cos(a) * 92)}" y1="${n(150 + Math.sin(a) * 92)}" x2="${n(200 + Math.cos(a) * 112)}" y2="${n(150 + Math.sin(a) * 112)}" stroke="#ffd54a" stroke-width="5" stroke-linecap="round" opacity=".6"/>`; }).join('') + `<circle cx="200" cy="150" r="68" fill="#10142e" stroke="${O}" stroke-width="3"/>`, '#4b5a8a'),
        '这就是日食。看太阳要戴专门的眼镜，不能直接看。', 'zhè jiù shì rì shí. kàn tài yáng yào dài zhuān mén de yǎn jìng, bù néng zhí jiē kàn.',
        'C\'est une éclipse de soleil. Pour regarder le soleil, il faut des lunettes spéciales, jamais à l\'œil nu.'),
    ],
    ['完全日食时，白天会突然变得像黄昏一样暗。', 'wán quán rì shí shí, bái tiān huì tū rán biàn de xiàng huáng hūn yí yàng àn.', 'Pendant une éclipse totale, le jour devient soudain sombre comme au crépuscule.'],
    [
      Q('日食时，什么挡住了太阳？', 'rì shí shí, shén me dǎng zhù le tài yáng', 'Pendant une éclipse, qu\'est-ce qui cache le soleil?', [o('月亮', 'yuè liang', 'La lune', '🌙'), o('云', 'yún', 'Un nuage', '☁️'), o('地球', 'dì qiú', 'La Terre', '🌍')], 0),
      Q('能直接用眼睛看太阳吗？', 'néng zhí jiē yòng yǎn jing kàn tài yáng ma', 'Peut-on regarder le soleil directement?', [o('不能，要戴专门的眼镜', 'bù néng, yào dài zhuān mén de yǎn jìng', 'Non, il faut des lunettes spéciales', '🕶️'), o('能，一直看', 'néng, yì zhí kàn', 'Oui, longtemps', '👀'), o('能，看越久越好', 'néng, kàn yuè jiǔ yuè hǎo', 'Oui, plus longtemps c\'est mieux', '⏳')], 0),
    ]),
];

const floater = (x, y, deg) => `<g transform="rotate(${deg} ${x} ${y})">${kid(x, y + 30, 1)}</g>`;
const dots = (list, r = 3) => list.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#6a7aa0"/>`).join('');

const L3 = [
  T('astronaute', '👩‍🚀', 3,
    ['宇航员为什么会飘起来？', 'yǔ háng yuán wèi shén me huì piāo qǐ lái', 'Pourquoi les astronautes flottent-ils?'],
    [
      S(W(ground(235) + kid(150, 235, 1.4) + arrow(250, 120, 250, 215, '#e8514a', 7) + sun(340, 50, 22)),
        '地球一直在拉着我们，所以我们站在地上。', 'dì qiú yì zhí zài lā zhe wǒ men, suǒ yǐ wǒ men zhàn zài dì shàng.',
        'La Terre nous tire sans arrêt, alors on reste debout au sol.'),
      S(W(`<circle cx="200" cy="360" r="190" fill="#4aa8e8" stroke="${O}" stroke-width="4"/><ellipse cx="130" cy="215" rx="40" ry="16" fill="#7bc96f"/><ellipse cx="290" cy="225" rx="34" ry="14" fill="#7bc96f"/>` + `<rect x="60" y="90" width="50" height="20" fill="#5b7aa8" stroke="${O}" stroke-width="3"/><rect x="190" y="90" width="50" height="20" fill="#5b7aa8" stroke="${O}" stroke-width="3"/><rect x="110" y="85" width="80" height="30" rx="8" fill="#e9eefc" stroke="${O}" stroke-width="3"/>` + arrow(250, 100, 340, 100, '#ffd54a', 6) + arrow(150, 125, 150, 175, '#e8514a', 6), space),
        '空间站一直往前飞，也一直在往下掉。', 'kōng jiān zhàn yì zhí wǎng qián fēi, yě yì zhí zài wǎng xià diào.',
        'La station spatiale file vers l\'avant tout en tombant sans arrêt.'),
      S(W(`<rect x="40" y="50" width="320" height="200" rx="40" fill="#e9eefc" stroke="${O}" stroke-width="5"/>` + floater(130, 100, 40) + floater(260, 130, -30) + ball(210, 80, 12, '#e8514a') + `<rect x="170" y="190" width="60" height="10" rx="5" fill="#f5c518" stroke="${O}" stroke-width="3" transform="rotate(-20 200 195)"/>`, '#c9d6ee'),
        '里面的人和东西一起下落，所以会飘起来。', 'lǐ miàn de rén hé dōng xi yì qǐ xià luò, suǒ yǐ huì piāo qǐ lái.',
        'Tout ce qu\'il y a dedans tombe ensemble : alors on flotte.'),
    ],
    ['在空间站里，水会变成一个个小水球。', 'zài kōng jiān zhàn lǐ, shuǐ huì biàn chéng yí gè gè xiǎo shuǐ qiú.', 'Dans la station spatiale, l\'eau forme de petites boules.'],
    [
      Q('在太空里，地球还拉着宇航员吗？', 'zài tài kōng lǐ, dì qiú hái lā zhe yǔ háng yuán ma', 'Dans l\'espace, la Terre tire-t-elle encore l\'astronaute?', [o('还拉着', 'hái lā zhe', 'Oui, elle le tire encore', '🌍'), o('一点也不拉', 'yì diǎn yě bù lā', 'Pas du tout', '🚫'), o('变成推着', 'biàn chéng tuī zhe', 'Elle le pousse', '👉'), o('只有晚上拉', 'zhǐ yǒu wǎn shang lā', 'Seulement la nuit', '🌙')], 0),
      Q('空间站里的东西为什么会飘？', 'kōng jiān zhàn lǐ de dōng xi wèi shén me huì piāo', 'Pourquoi les objets flottent-ils dans la station?', [o('和空间站一起往下掉', 'hé kōng jiān zhàn yì qǐ wǎng xià diào', 'Ils tombent avec la station', '🛰️'), o('里面太热了', 'lǐ miàn tài rè le', 'Il y fait trop chaud', '🥵'), o('里面有大风', 'lǐ miàn yǒu dà fēng', 'Il y a un grand vent', '💨'), o('地球不拉它们', 'dì qiú bù lā tā men', 'La Terre ne les tire pas', '❌')], 0),
    ]),

  T('volcan', '🌋', 3,
    ['火山为什么会喷发？', 'huǒ shān wèi shén me huì pēn fā', 'Pourquoi un volcan entre-t-il en éruption?'],
    [
      S(W(`<rect x="-5" y="150" width="410" height="155" fill="#b08968" stroke="${O}" stroke-width="3"/><rect x="-5" y="150" width="410" height="14" fill="#7bc96f" stroke="${O}" stroke-width="3"/>` + `<ellipse cx="200" cy="250" rx="110" ry="38" fill="#f5923e" stroke="${O}" stroke-width="3"/>` + [[160, 245], [200, 255], [240, 240], [185, 232]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#ffd54a"/>`).join('') + sun(340, 60, 22), '#dff1ff'),
        '地球里面很热，有些岩石热得变成了红红的岩浆。', 'dì qiú lǐ miàn hěn rè, yǒu xiē yán shí rè de biàn chéng le hóng hóng de yán jiāng.',
        'L\'intérieur de la Terre est très chaud : certaines roches fondent en magma rouge.'),
      S(W(`<path d="M30 235L165 85H235L370 235Z" fill="#b08968" stroke="${O}" stroke-width="4" stroke-linejoin="round"/><rect x="-5" y="235" width="410" height="70" fill="#b08968" stroke="${O}" stroke-width="3"/><rect x="182" y="95" width="36" height="150" fill="#f5923e"/><ellipse cx="200" cy="262" rx="95" ry="30" fill="#f5923e" stroke="${O}" stroke-width="3"/>` + [195, 205].map((x) => arrow(x, 235, x, 125, '#e8514a', 5)).join('') + [[215, 190], [188, 160]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff"/>`).join(''), '#dff1ff'),
        '岩浆比岩石轻，一直往上挤，里面还有气体。', 'yán jiāng bǐ yán shí qīng, yì zhí wǎng shàng jǐ, lǐ miàn hái yǒu qì tǐ.',
        'Le magma est plus léger que la roche : il remonte et contient aussi des gaz.'),
      S(W(cloud(200, 50, 2.4, '#6b7390') + cloud(120, 70, 1.4, '#8a90a8') + cloud(290, 75, 1.5, '#8a90a8') + `<path d="M30 270L165 110H235L370 270Z" fill="#8b5e3c" stroke="${O}" stroke-width="4" stroke-linejoin="round"/><path d="M165 110L185 130L195 112L205 135L215 112L235 110L215 100H185Z" fill="#f5923e"/><path d="M200 120Q180 190 150 270H190Q205 190 205 125Z" fill="#f5923e"/><path d="M215 125Q240 200 270 270H235Q215 200 212 130Z" fill="#e8514a"/>` + [[150, 100], [250, 95], [120, 130], [280, 125]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#f5923e" stroke="${O}" stroke-width="2"/>`).join('') + ground(268, '#7a8f6a'), '#c9d6ee'),
        '压力太大，岩浆从山口冲出来，就是火山喷发。', 'yā lì tài dà, yán jiāng cóng shān kǒu chōng chū lái, jiù shì huǒ shān pēn fā.',
        'La pression devient trop forte : le magma jaillit par le cratère. C\'est une éruption.'),
    ],
    ['熔岩冷了，会变成黑色的石头。', 'róng yán lěng le, huì biàn chéng hēi sè de shí tou.', 'Quand la lave refroidit, elle devient une roche noire.'],
    [
      Q('岩浆是什么？', 'yán jiāng shì shén me', 'Qu\'est-ce que le magma?', [o('热得融化的岩石', 'rè de róng huà de yán shí', 'De la roche fondue par la chaleur', '🌋'), o('红色的水', 'hóng sè de shuǐ', 'De l\'eau rouge', '🥤'), o('很热的雪', 'hěn rè de xuě', 'De la neige très chaude', '❄️'), o('一种气体', 'yì zhǒng qì tǐ', 'Un gaz', '💨')], 0),
      Q('火山喷发是因为什么？', 'huǒ shān pēn fā shì yīn wèi shén me', 'Pourquoi un volcan entre-t-il en éruption?', [o('岩浆往上挤，压力太大', 'yán jiāng wǎng shàng jǐ, yā lì tài dà', 'Le magma pousse vers le haut, la pression est trop forte', '💥'), o('有人敲山', 'yǒu rén qiāo shān', 'Quelqu\'un frappe la montagne', '🔨'), o('下了大雨', 'xià le dà yǔ', 'Il a beaucoup plu', '🌧️'), o('山太冷了', 'shān tài lěng le', 'La montagne a trop froid', '🥶')], 0),
    ]),

  T('seisme', '🫨', 3,
    ['地震是怎么回事？', 'dì zhèn shì zěn me huí shì', 'Que se passe-t-il pendant un tremblement de terre?'],
    [
      S(W(`<rect x="-5" y="150" width="198" height="155" fill="#b08968" stroke="${O}" stroke-width="4"/><rect x="207" y="150" width="198" height="155" fill="#a67c52" stroke="${O}" stroke-width="4"/><rect x="-5" y="150" width="198" height="14" fill="#7bc96f"/><rect x="207" y="150" width="198" height="14" fill="#7bc96f"/>` + arrow(60, 235, 150, 235, '#e8514a', 6) + arrow(340, 235, 250, 235, '#e8514a', 6), '#dff1ff'),
        '地面下有很大很大的岩石板块，慢慢地移动。', 'dì miàn xià yǒu hěn dà hěn dà de yán shí bǎn kuài, màn màn de yí dòng.',
        'Sous le sol, d\'énormes plaques de roche bougent très lentement.'),
      S(W(`<rect x="-5" y="150" width="198" height="155" fill="#b08968" stroke="${O}" stroke-width="4"/><rect x="207" y="136" width="198" height="169" fill="#a67c52" stroke="${O}" stroke-width="4"/><rect x="-5" y="150" width="198" height="14" fill="#7bc96f"/><rect x="207" y="136" width="198" height="14" fill="#7bc96f"/>` + arrow(60, 235, 160, 235, '#e8514a', 8) + arrow(340, 235, 240, 235, '#e8514a', 8) + `<polygon points="200,205 214,225 236,222 222,240 235,262 212,252 196,270 192,248 166,252 182,235 168,214 192,224" fill="#ffd54a" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>`, '#dff1ff'),
        '板块互相挤着，挤得太紧，突然滑动一下。', 'bǎn kuài hù xiāng jǐ zhe, jǐ de tài jǐn, tū rán huá dòng yí xià.',
        'Les plaques se poussent, se coincent, puis glissent d\'un coup.'),
      S(W(ground(240) + `<g transform="rotate(-3 200 200)"><rect x="140" y="170" width="120" height="70" fill="#f5d27a" stroke="${O}" stroke-width="4"/><path d="M125 175L200 115L275 175Z" fill="#e8514a" stroke="${O}" stroke-width="4" stroke-linejoin="round"/><rect x="185" y="195" width="30" height="45" fill="#8b5e3c"/></g>` + [[95, 190], [90, 215], [305, 190], [310, 215]].map(([x, y]) => `<path d="M${x - 12} ${y}q6 -8 12 0t12 0" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round"/>`).join('') + `<path d="M250 240l-15 25l12 12" fill="none" stroke="${O}" stroke-width="4" stroke-linecap="round"/>`, '#dff1ff'),
        '地面就会抖动，这就是地震。大多数地震很轻很小。', 'dì miàn jiù huì dǒu dòng, zhè jiù shì dì zhèn. dà duō shù dì zhèn hěn qīng hěn xiǎo.',
        'Le sol se met à trembler : c\'est un tremblement de terre. La plupart sont très faibles.'),
      S(W(`<rect x="-5" y="250" width="410" height="55" fill="#d9c3a0"/><rect x="90" y="140" width="220" height="22" rx="5" fill="#b08968" stroke="${O}" stroke-width="4"/><rect x="100" y="162" width="16" height="90" fill="#b08968" stroke="${O}" stroke-width="3"/><rect x="284" y="162" width="16" height="90" fill="#b08968" stroke="${O}" stroke-width="3"/>` + `<g stroke="${O}" stroke-width="4" stroke-linecap="round"><circle cx="200" cy="200" r="9" fill="#ffd9b8"/><path d="M200 209V240M200 215L186 200M200 215L214 200M200 240L190 252M200 240L212 252" fill="none"/></g>`, '#f3f7fb'),
        '要是感觉到晃动，就躲到桌子下面，抱住头。', 'yào shi gǎn jué dào huàng dòng, jiù duǒ dào zhuō zi xià miàn, bào zhù tóu.',
        'Si tu sens le sol bouger, mets-toi sous une table et protège ta tête.'),
    ],
    ['魁北克有时也有很轻的地震，大多数人感觉不到。', 'kuí běi kè yǒu shí yě yǒu hěn qīng de dì zhèn, dà duō shù rén gǎn jué bú dào.', 'Il y a parfois de petits séismes au Québec, que la plupart des gens ne sentent pas.'],
    [
      Q('地震是因为什么？', 'dì zhèn shì yīn wèi shén me', 'Pourquoi y a-t-il des tremblements de terre?', [o('地下的板块动了', 'dì xià de bǎn kuài dòng le', 'Les plaques sous le sol ont bougé', '🪨'), o('天上的云太重', 'tiān shàng de yún tài zhòng', 'Les nuages sont trop lourds', '☁️'), o('海里的鱼在游', 'hǎi lǐ de yú zài yóu', 'Les poissons nagent', '🐟'), o('风太大了', 'fēng tài dà le', 'Il y a trop de vent', '💨')], 0),
      Q('感觉到地面晃动，该怎么办？', 'gǎn jué dào dì miàn huàng dòng, gāi zěn me bàn', 'Que faire si on sent le sol bouger?', [o('躲到桌子下面', 'duǒ dào zhuō zi xià miàn', 'Se mettre sous une table', '🛡️'), o('坐电梯下楼', 'zuò diàn tī xià lóu', 'Prendre l\'ascenseur', '🛗'), o('跳到床上', 'tiào dào chuáng shàng', 'Sauter sur le lit', '🛏️'), o('大声尖叫', 'dà shēng jiān jiào', 'Crier très fort', '😱')], 0),
    ]),

  T('lune-tombe', '🌓', 3,
    ['月亮为什么不会掉下来？', 'yuè liang wèi shén me bú huì diào xià lái', 'Pourquoi la lune ne tombe-t-elle pas?'],
    [
      S(W(earth(90, 150, 42) + moon(320, 150, 22) + arrow(290, 150, 180, 150, '#e8514a', 7), space),
        '地球的拉力一直拉着月亮。', 'dì qiú de lā lì yì zhí lā zhe yuè liang.',
        'La force d\'attraction de la Terre tire sans cesse sur la lune.'),
      S(W(earth(90, 150, 42) + moon(320, 150, 22) + arrow(290, 150, 180, 150, '#e8514a', 5) + arrow(320, 118, 320, 40, '#ffd54a', 7), space),
        '月亮同时在飞快地往旁边跑。', 'yuè liang tóng shí zài fēi kuài de wǎng páng biān pǎo.',
        'En même temps, la lune file à toute vitesse sur le côté.'),
      S(W(`<circle cx="200" cy="150" r="90" fill="none" stroke="#9aa3c8" stroke-width="3" stroke-dasharray="7 7"/><line x1="200" y1="150" x2="290" y2="150" stroke="${O}" stroke-width="3"/>` + kid(200, 185, 1) + ball(290, 150, 16, '#e8514a') + arrow(290, 125, 290, 70, O, 5), '#e9eefc'),
        '像甩着绳子的小球，月亮一直在转圈。', 'xiàng shuǎi zhe shéng zi de xiǎo qiú, yuè liang yì zhí zài zhuàn quān.',
        'Comme une balle au bout d\'une corde, la lune tourne sans arrêt.'),
    ],
    ['月亮每年离地球远一点点，非常非常慢。', 'yuè liang měi nián lí dì qiú yuǎn yì diǎn diǎn, fēi cháng fēi cháng màn.', 'Chaque année, la lune s\'éloigne un tout petit peu de la Terre, très, très lentement.'],
    [
      Q('哪个东西的拉力让月亮绕着转？', 'nǎ ge dōng xi de lā lì ràng yuè liang rào zhe zhuàn', 'Quelle attraction fait tourner la lune autour?', [o('地球', 'dì qiú', 'La Terre', '🌍'), o('风', 'fēng', 'Le vent', '💨'), o('火星', 'huǒ xīng', 'Mars', '🔴'), o('云', 'yún', 'Les nuages', '☁️')], 0),
      Q('月亮不会掉下来，是因为什么？', 'yuè liang bú huì diào xià lái, shì yīn wèi shén me', 'Pourquoi la lune ne tombe-t-elle pas?', [o('它一边被拉，一边往旁边飞', 'tā yì biān bèi lā, yì biān wǎng páng biān fēi', 'Elle est tirée tout en filant sur le côté', '🌀'), o('它被线吊着', 'tā bèi xiàn diào zhe', 'Elle est suspendue à un fil', '🧵'), o('它很轻会飘', 'tā hěn qīng huì piāo', 'Elle est si légère qu\'elle flotte', '🎈'), o('它被云托着', 'tā bèi yún tuō zhe', 'Elle est portée par les nuages', '☁️')], 0),
    ]),

  T('montagne-froide', '🏔️', 3,
    ['为什么山顶比山下冷？', 'wèi shén me shān dǐng bǐ shān xià lěng', 'Pourquoi fait-il plus froid au sommet d\'une montagne?'],
    [
      S(W(sun(45, 50, 24) + mount(200, 262, 340, 200, '#8d93a8') + ground(262) + arrow(90, 75, 105, 245, '#f5c518', 5) + arrow(120, 62, 305, 240, '#f5c518', 5), '#dff1ff'),
        '太阳光先穿过空气，主要是晒热了地面。', 'tài yáng guāng xiān chuān guò kōng qì, zhǔ yào shì shài rè le dì miàn.',
        'La lumière du soleil traverse l\'air et chauffe surtout le sol.'),
      S(W(`<polygon points="30,260 89.5,190 310.5,190 370,260" fill="#f08a4b"/><polygon points="89.5,190 140.5,130 259.5,130 310.5,190" fill="#f5d27a"/><polygon points="140.5,130 200,60 259.5,130" fill="#8fd0f5"/><path d="M30 260L200 60L370 260Z" fill="none" stroke="${O}" stroke-width="4" stroke-linejoin="round"/>` + ground(260) + [60, 100].map((x) => arrow(x, 250, x, 190, '#e8514a', 4)).join(''), '#dff1ff'),
        '地面再把热传给附近的空气，离地面越远，越冷。', 'dì miàn zài bǎ rè chuán gěi fù jìn de kōng qì, lí dì miàn yuè yuǎn, yuè lěng.',
        'Le sol réchauffe l\'air tout près de lui : plus on s\'éloigne du sol, plus il fait froid.'),
      S(W(fir(60, 262, 1.1) + fir(340, 262, 1.2) + mount(200, 262, 340, 200, '#8d93a8') + ground(262) + dots([[100, 245], [120, 235], [150, 250], [180, 240], [210, 252], [240, 238], [270, 248], [300, 242], [330, 252], [140, 222], [170, 215], [230, 220], [260, 228], [200, 200], [215, 175], [190, 150], [205, 120]], 3) + flake(200, 70, 14, '#6aa8dc', 3), '#dff1ff'),
        '高处空气也比较稀，留不住热，所以山顶常有雪。', 'gāo chù kōng qì yě bǐ jiào xī, liú bu zhù rè, suǒ yǐ shān dǐng cháng yǒu xuě.',
        'En haut, l\'air est plus rare et garde mal la chaleur : il y a souvent de la neige au sommet.'),
    ],
    ['爬高一千米，气温大约会低六度。', 'pá gāo yì qiān mǐ, qì wēn dà yuē huì dī liù dù.', 'Quand on monte de mille mètres, il fait environ six degrés de moins.'],
    [
      Q('越往高处，天气一般怎么样？', 'yuè wǎng gāo chù, tiān qì yì bān zěn me yàng', 'Plus on monte, comment est la température en général?', [o('越冷', 'yuè lěng', 'Plus froide', '🥶'), o('越热', 'yuè rè', 'Plus chaude', '🥵'), o('一样', 'yí yàng', 'Pareille', '🟰'), o('会变成夏天', 'huì biàn chéng xià tiān', 'Ça devient l\'été', '🏖️')], 0),
      Q('太阳光主要先晒热什么？', 'tài yáng guāng zhǔ yào xiān shài rè shén me', 'Qu\'est-ce que la lumière du soleil chauffe d\'abord surtout?', [o('地面', 'dì miàn', 'Le sol', '🟫'), o('云', 'yún', 'Les nuages', '☁️'), o('星星', 'xīng xing', 'Les étoiles', '⭐'), o('月亮', 'yuè liang', 'La lune', '🌙')], 0),
    ]),

  T('cycle-eau', '♻️', 3,
    ['水是怎么在天地间旅行的？', 'shuǐ shì zěn me zài tiān dì jiān lǚ xíng de', 'Comment l\'eau voyage-t-elle entre le ciel et la terre?'],
    [
      S(W(sun(60, 60) + `<rect x="-5" y="220" width="410" height="85" fill="#4aa8e8" stroke="${O}" stroke-width="3"/>` + [120, 200, 280, 350].map((x) => arrow(x, 205, x, 120, '#8fd0f5', 6)).join(''), '#dff1ff'),
        '太阳晒热海水和湖水，水变成水汽升上天。', 'tài yáng shài rè hǎi shuǐ hé hú shuǐ, shuǐ biàn chéng shuǐ qì shēng shàng tiān.',
        'Le soleil chauffe la mer et les lacs : l\'eau devient de la vapeur et monte.'),
      S(W(mount(310, 270, 220, 130) + ground(270) + cloud(120, 70, 2, '#b9c3d3') + [90, 120, 150].map((x) => drop(x, 135, 1.3)).join('') + [250, 290].map((x) => flake(x, 100, 9, '#6aa8dc', 2.5)).join('') + arrow(30, 250, 30, 150, '#8fd0f5', 5), '#dff1ff'),
        '水汽变成云，云变成雨或雪落回地面。', 'shuǐ qì biàn chéng yún, yún biàn chéng yǔ huò xuě luò huí dì miàn.',
        'La vapeur forme des nuages, puis retombe en pluie ou en neige.'),
      S(W(mount(110, 215, 220, 130) + `<rect x="-5" y="215" width="205" height="90" fill="#9bd16b" stroke="${O}" stroke-width="3"/><rect x="200" y="235" width="205" height="70" fill="#4aa8e8" stroke="${O}" stroke-width="3"/>` + `<path d="M110 140Q150 170 120 200T200 235" fill="none" stroke="#4aa8e8" stroke-width="8" stroke-linecap="round"/>` + arrow(150, 280, 280, 280, '#fff', 4), '#dff1ff'),
        '雨水流进小河，小河流进大海，旅行又重新开始。', 'yǔ shuǐ liú jìn xiǎo hé, xiǎo hé liú jìn dà hǎi, lǚ xíng yòu chóng xīn kāi shǐ.',
        'L\'eau de pluie coule dans la rivière, la rivière dans la mer, et le voyage recommence.'),
    ],
    ['你喝的水，可能是恐龙时代就有的水。', 'nǐ hē de shuǐ, kě néng shì kǒng lóng shí dài jiù yǒu de shuǐ.', 'L\'eau que tu bois est peut-être là depuis l\'époque des dinosaures.'],
    [
      Q('水变成水汽，需要什么？', 'shuǐ biàn chéng shuǐ qì, xū yào shén me', 'Que faut-il pour que l\'eau devienne de la vapeur?', [o('太阳的热', 'tài yáng de rè', 'La chaleur du soleil', '☀️'), o('月亮的光', 'yuè liang de guāng', 'La lumière de la lune', '🌙'), o('风的声音', 'fēng de shēng yīn', 'Le bruit du vent', '🔊'), o('星星的冷', 'xīng xing de lěng', 'Le froid des étoiles', '⭐')], 0),
      Q('雨水最后会流到哪里？', 'yǔ shuǐ zuì hòu huì liú dào nǎ lǐ', 'Où l\'eau de pluie finit-elle par couler?', [o('小河和大海', 'xiǎo hé hé dà hǎi', 'Dans les rivières et la mer', '🌊'), o('月亮上', 'yuè liang shàng', 'Sur la lune', '🌙'), o('太阳里', 'tài yáng lǐ', 'Dans le soleil', '☀️'), o('云的上面', 'yún de shàng miàn', 'Au-dessus des nuages', '☁️')], 0),
    ]),
];

export const topics = [...L1, ...L2, ...L3];
