// « Pourquoi? 十万个为什么 » — category `science` (everyday science and inventions). See docs/WHY.md.
// Small SVG helpers keep every picture consistent (flat, #3a3f55 outlines, no words, 400×300).
const O = '#3a3f55';
const n = (v) => Math.round(v * 10) / 10;
const svg = (b, bg = '#eef6fb') => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round"><rect width="400" height="300" fill="${bg}"/>${b}</svg>`;
const rc = (x, y, w, h, f, r = 8, sw = 3) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" stroke="${sw ? O : 'none'}" stroke-width="${sw}"/>`;
const ci = (x, y, r, f, sw = 3) => `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="${f}" stroke="${sw ? O : 'none'}" stroke-width="${sw}"/>`;
const el = (x, y, rx, ry, f, sw = 3) => `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(rx)}" ry="${n(ry)}" fill="${f}" stroke="${sw ? O : 'none'}" stroke-width="${sw}"/>`;
const pa = (d, f = 'none', sw = 3, c = O, da = '') => `<path d="${d}" fill="${f}" stroke="${sw ? c : 'none'}" stroke-width="${sw}"${da ? ` stroke-dasharray="${da}"` : ''}/>`;
const ln = (x1, y1, x2, y2, c = O, w = 3) => `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${c}" stroke-width="${w}"/>`;
const ar = (x1, y1, x2, y2, c = '#e8553d', w = 5) => {
  const a = Math.atan2(y2 - y1, x2 - x1), bx = x2 - 14 * Math.cos(a), by = y2 - 14 * Math.sin(a), s = Math.sin(a) * 9, k = Math.cos(a) * 9;
  return `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(bx)}" y2="${n(by)}" stroke="${c}" stroke-width="${w}"/><polygon points="${n(x2)},${n(y2)} ${n(bx - s)},${n(by + k)} ${n(bx + s)},${n(by - k)}" fill="${c}" stroke="${c}" stroke-width="2"/>`;
};
const tx = (x, y, t, s = 26) => `<text x="${x}" y="${y}" font-size="${s}" font-weight="700" text-anchor="middle" fill="${O}" stroke="none" font-family="sans-serif">${t}</text>`;
const wave = (y, c = '#8ecbf0') => rc(-5, y, 410, 305 - y, c, 0, 0) + pa(`M-5 ${y}Q20 ${y - 9} 45 ${y}T95 ${y}T145 ${y}T195 ${y}T245 ${y}T295 ${y}T345 ${y}T395 ${y}T445 ${y}`);
const face = (x, y, r = 18, f = '#ffd9b3') => ci(x, y, r, f) + ci(x - r / 3, y - r / 6, r / 9, O, 0) + ci(x + r / 3, y - r / 6, r / 9, O, 0) + pa(`M${n(x - r / 3)} ${n(y + r / 3)}Q${x} ${n(y + r * 0.75)} ${n(x + r / 3)} ${n(y + r / 3)}`, 'none', 2);
const person = (x, y, s = 1, col = '#6aa7e8') => rc(x - 20 * s, y + 18 * s, 40 * s, 54 * s, col, 10 * s) + face(x, y, 18 * s);
const sun = (x, y, r = 24) => { let s = ''; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; s += ln(x + Math.cos(a) * (r + 6), y + Math.sin(a) * (r + 6), x + Math.cos(a) * (r + 16), y + Math.sin(a) * (r + 16), '#f5a623', 4); } return s + ci(x, y, r, '#ffd166'); };
const cloud = (x, y, s = 1, f = '#fff') => { const c = [[0, 0, 22], [24, -8, 26], [50, 0, 22], [25, 8, 22]]; const d = (st) => c.map(([a, b, r]) => ci(x + a * s, y + b * s, r * s, f, st)).join(''); return d(3) + d(0); };
const gl = (x, y, w, h, lv = 0, c = '#8ecbf0') => (lv ? rc(x + 1, y + h - lv, w - 2, lv - 1, c, 8, 0) : '') + pa(`M${x} ${y}V${y + h - 8}Q${x} ${y + h} ${x + 8} ${y + h}H${x + w - 8}Q${x + w} ${y + h} ${x + w} ${y + h - 8}V${y}`);
const fish = (x, y, d = 1, c = '#ff9f43') => el(x, y, 26, 14, c) + pa(`M${x - d * 24} ${y}L${x - d * 46} ${y - 13}L${x - d * 46} ${y + 13}Z`, c) + ci(x + d * 13, y - 3, 3, O, 0);
const flake = (x, y, r = 14, c = '#4a90e2') => [0, 60, 120].map((a) => { const t = a * Math.PI / 180; return ln(x - r * Math.cos(t), y - r * Math.sin(t), x + r * Math.cos(t), y + r * Math.sin(t), c, 3); }).join('');
const check = (x, y) => pa(`M${x - 12} ${y}L${x - 3} ${y + 10}L${x + 14} ${y - 12}`, 'none', 6, '#3fae5a');
const cross = (x, y) => ln(x - 11, y - 11, x + 11, y + 11, '#e8553d', 6) + ln(x + 11, y - 11, x - 11, y + 11, '#e8553d', 6);
const ground = (y = 250, c = '#bfe3a8') => rc(-5, y, 410, 305 - y, c, 0, 0);
const mountain = (x, y, w, h, f = '#9aa3c0') => pa(`M${x} ${y}L${x + w / 2} ${y - h}L${x + w} ${y}Z`, f);
const sound = (x, y, d = 1, c = '#e8553d') => [0, 1, 2].map((i) => pa(`M${x + d * i * 18} ${y - 14 - i * 8}Q${x + d * (i * 18 + 12)} ${y} ${x + d * i * 18} ${y + 14 + i * 8}`, 'none', 4, c)).join('');
const mag = (x, y, w = 140, h = 50) => rc(x, y, w / 2, h, '#e8553d', 0, 0) + rc(x + w / 2, y, w / 2, h, '#4a90e2', 0, 0) + rc(x, y, w, h, 'none', 3);
const pot = (x, y, hot = '#8ecbf0') => rc(x - 30, y + 100, 220, 18, O, 4) + ln(x - 14, y + 22, x, y + 22, O, 6) + ln(x + 160, y + 22, x + 174, y + 22, O, 6) + rc(x, y, 160, 100, '#c9cedb', 10) + rc(x + 8, y + 20, 144, 72, hot, 6, 0);
const bottle = (x, cap = 1, f = '#c4752b') => pa(`M${x - 18} 70V110C${x - 18} 135 ${x - 45} 140 ${x - 45} 175V265Q${x - 45} 280 ${x - 30} 280H${x + 30}Q${x + 45} 280 ${x + 45} 265V175C${x + 45} 140 ${x + 18} 135 ${x + 18} 110V70Z`, f) + (cap ? rc(x - 22, 52, 44, 20, '#e8553d', 4) : '');
const bub = (x, y, r = 6) => ci(x, y, r, '#fff', 2);
const steam = (x, y) => pa(`M${x} ${y}Q${x - 14} ${y - 20} ${x} ${y - 40}T${x} ${y - 80}`, 'none', 4, '#9aa3c0');
const ellipseDash = (x, y, rx, ry, c = '#e8553d') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="${c}" stroke-width="4" stroke-dasharray="8 6"/>`;
const car = (x, y, c = '#e8553d') => rc(x, y, 100, 32, c, 8) + rc(x + 20, y - 24, 56, 28, c, 8) + rc(x + 28, y - 18, 18, 16, '#dff3fc', 3, 2) + rc(x + 50, y - 18, 18, 16, '#dff3fc', 3, 2) + ci(x + 24, y + 34, 13, O) + ci(x + 76, y + 34, 13, O);
const bulb = (x, y, on = true) => (on ? [0, 1, 2, 3, 4, 5].map((i) => { const a = (i * 40 - 100) * Math.PI / 180; return ln(x + Math.cos(a) * 44, y - 4 + Math.sin(a) * 44, x + Math.cos(a) * 58, y - 4 + Math.sin(a) * 58, '#f5a623', 4); }).join('') : '') + ci(x, y - 4, 34, on ? '#ffe27a' : '#d5d9e4') + rc(x - 14, y + 28, 28, 22, '#8d93a8', 4) + pa(`M${x - 12} ${y + 28}V${y + 8}L${x - 6} ${y - 8}L${x} ${y + 8}L${x + 6} ${y - 8}L${x + 12} ${y + 8}V${y + 28}`, 'none', 3, on ? '#e8553d' : O);
const ladybug = (x, y, s = 1) => ci(x, y, 16 * s, '#e8553d') + ci(x, y - 16 * s, 7 * s, O) + ln(x, y - 14 * s, x, y + 16 * s, O, 2) + ci(x - 7 * s, y - 2 * s, 3 * s, O, 0) + ci(x + 7 * s, y + 5 * s, 3 * s, O, 0) + ci(x - 6 * s, y + 8 * s, 2.5 * s, O, 0);
const plane = (x, y, s = 1) => pa(`M${x - 80 * s} ${y - 8 * s}L${x - 105 * s} ${y - 50 * s}L${x - 80 * s} ${y - 50 * s}L${x - 45 * s} ${y - 8 * s}Z`, '#e8553d') + el(x, y, 92 * s, 24 * s, '#fff') + pa(`M${x - 5 * s} ${y + 6 * s}L${x - 45 * s} ${y + 54 * s}L${x - 18 * s} ${y + 54 * s}L${x + 35 * s} ${y + 6 * s}Z`, '#c9cedb') + [0, 1, 2, 3].map((i) => ci(x + (20 + i * 16) * s, y - 8 * s, 4 * s, '#8ecbf0', 2)).join('');
const rocket = (x, y, s = 1) => pa(`M${x - 22 * s} ${y + 18 * s}L${x - 48 * s} ${y + 60 * s}L${x - 22 * s} ${y + 56 * s}Z`, '#e8553d') + pa(`M${x + 22 * s} ${y + 18 * s}L${x + 48 * s} ${y + 60 * s}L${x + 22 * s} ${y + 56 * s}Z`, '#e8553d') + pa(`M${x} ${y - 80 * s}C${x + 34 * s} ${y - 50 * s} ${x + 30 * s} ${y + 30 * s} ${x + 22 * s} ${y + 60 * s}H${x - 22 * s}C${x - 30 * s} ${y + 30 * s} ${x - 34 * s} ${y - 50 * s} ${x} ${y - 80 * s}Z`, '#fff') + pa(`M${x - 24 * s} ${y - 42 * s}Q${x} ${y - 104 * s} ${x + 24 * s} ${y - 42 * s}Z`, '#e8553d') + ci(x, y - 12 * s, 11 * s, '#8ecbf0');
const flame = (x, y, s = 1) => pa(`M${x - 16 * s} ${y}Q${x} ${y + 76 * s} ${x + 16 * s} ${y}Z`, '#ffb02e');
const panel = (x, y, w, h, f = '#4a90e2') => pa(`M${x} ${y + h}L${x + 30} ${y}H${x + w + 30}L${x + w} ${y + h}Z`, f) + [1, 2, 3].map((i) => ln(x + w * i / 4 + 30 - 30 * i / 4 * 0, y, x + w * i / 4 - 0, y + h, '#fff', 2)).join('') + ln(x + 15, y + h / 2, x + w + 15, y + h / 2, '#fff', 2);

// shorthands for the text objects
const T = ([zh, py, fr]) => ({ zh, py, fr });
const S = (svgStr, a) => ({ svg: svgStr, ...T(a) });
const op = ([zh, py, fr], emoji) => ({ zh, py, fr, emoji });
const Q = (a, opts, answer) => ({ ...T(a), options: opts.map(([z, p, f, e]) => op([z, p, f], e)), answer });

export const topics = [
  // ───────── 1 ─────────
  {
    id: 'science-glace-flotte', cat: 'science', emoji: '🧊', level: 1,
    q: T(['冰为什么会浮在水上？', 'bīng wèi shén me huì fú zài shuǐ shàng', 'Pourquoi la glace flotte-t-elle sur l’eau?']),
    slides: [
      S(svg(gl(60, 100, 100, 130, 70) + rc(243, 138, 94, 91, '#dff3fc', 8, 0) + gl(240, 100, 100, 130, 0) + ln(255, 160, 275, 180, '#fff', 4) + ln(290, 150, 315, 175, '#fff', 4) + pa('M225 160H355', 'none', 3, '#e8553d', '6 5') + ar(365, 168, 365, 134) + ar(172, 175, 228, 175, '#2f7fc1', 6) + flake(110, 60, 18)), [
        '水结成冰，会变大一点点。', 'shuǐ jié chéng bīng huì biàn dà yì diǎn diǎn', 'Quand l’eau gèle, elle prend un tout petit peu plus de place.']),
      S(svg(gl(100, 70, 200, 170, 120) + rc(160, 98, 80, 72, '#e4f6ff', 10) + ln(172, 112, 192, 132, '#fff', 4) + ar(200, 222, 200, 180, '#2f7fc1', 6)), [
        '冰比同样多的水更轻。', 'bīng bǐ tóng yàng duō de shuǐ gèng qīng', 'La glace est plus légère que la même quantité d’eau.']),
      S(svg(rc(-5, 105, 410, 30, '#e9f8ff', 0) + rc(-5, 135, 410, 170, '#8ecbf0', 0, 0) + rc(290, 62, 60, 44, '#d9a066', 4) + pa('M282 64L320 38L358 64Z', '#e8553d') + fish(120, 205) + fish(270, 245, -1, '#7bc47f') + ci(60, 40, 5, '#fff', 0) + ci(150, 70, 4, '#fff', 0) + ci(230, 35, 5, '#fff', 0), '#d6ecfa'), [
        '冬天，湖面结冰，鱼儿在冰下面游。', 'dōng tiān hú miàn jié bīng yú ér zài bīng xià miàn yóu', 'L’hiver, le lac gèle et les poissons nagent sous la glace.']),
    ],
    fact: T(['加拿大北方有冰路，卡车能开过冰面。', 'jiā ná dà běi fāng yǒu bīng lù kǎ chē néng kāi guò bīng miàn', 'Dans le nord du Canada, il y a des routes de glace où roulent des camions.']),
    quiz: [
      Q(['冰块放进水里会怎么样？', 'bīng kuài fàng jìn shuǐ lǐ huì zěn me yàng', 'Que fait un glaçon dans l’eau?'], [['浮起来', 'fú qǐ lái', 'Il flotte', '🧊'], ['沉到底', 'chén dào dǐ', 'Il coule au fond', '⚓'], ['变成石头', 'biàn chéng shí tou', 'Il devient une pierre', '🪨']], 0),
      Q(['水结成冰以后，会怎么样？', 'shuǐ jié chéng bīng yǐ hòu huì zěn me yàng', 'Que devient l’eau quand elle gèle?'], [['变大一点点', 'biàn dà yì diǎn diǎn', 'Elle prend un peu plus de place', '📈'], ['变成热水', 'biàn chéng rè shuǐ', 'Elle devient de l’eau chaude', '♨️'], ['消失不见', 'xiāo shī bú jiàn', 'Elle disparaît', '💨']], 0),
    ],
  },
  // ───────── 2 ─────────
  {
    id: 'science-aimant', cat: 'science', emoji: '🧲', level: 1,
    q: T(['磁铁为什么能吸铁？', 'cí tiě wèi shén me néng xī tiě', 'Pourquoi un aimant attire-t-il le fer?']),
    slides: [
      S(svg(mag(130, 125, 140, 50) + pa('M140 120C130 40 270 40 260 120', 'none', 3, '#9aa3c0', '7 6') + pa('M165 120C160 75 240 75 235 120', 'none', 3, '#9aa3c0', '7 6') + pa('M140 180C130 260 270 260 260 180', 'none', 3, '#9aa3c0', '7 6') + pa('M165 180C160 225 240 225 235 180', 'none', 3, '#9aa3c0', '7 6')), [
        '磁铁身边有一种看不见的力。', 'cí tiě shēn biān yǒu yì zhǒng kàn bú jiàn de lì', 'Autour de l’aimant, il y a une force qu’on ne voit pas.']),
      S(svg(mag(30, 120, 90, 50) + [120, 145, 170].map((y) => ln(170, y, 235, y, '#8d93a8', 7) + ci(238, y, 6, '#8d93a8') + ar(162, y, 128, y, '#e8553d', 4)).join('')), [
        '这种力能把铁拉过来。', 'zhè zhǒng lì néng bǎ tiě lā guò lái', 'Cette force tire le fer vers l’aimant.']),
      S(svg(mag(150, 25, 100, 40) + ln(40, 205, 100, 205, '#8d93a8', 8) + rc(140, 175, 50, 60, '#d9a066') + rc(225, 175, 50, 60, '#fff') + ln(235, 190, 265, 190, '#c9cedb', 3) + ln(235, 205, 265, 205, '#c9cedb', 3) + ci(340, 205, 28, '#ffd166') + pa('M362 200L378 205L362 210Z', '#ff9f43') + check(70, 150) + cross(165, 150) + cross(250, 150) + cross(340, 150)), [
        '木头、纸和塑料，磁铁吸不动。', 'mù tou zhǐ hé sù liào cí tiě xī bú dòng', 'Le bois, le papier et le plastique, l’aimant ne les attire pas.']),
    ],
    fact: T(['试一试：拿磁铁在家里找一找，哪些东西能吸住？', 'shì yi shì ná cí tiě zài jiā lǐ zhǎo yi zhǎo nǎ xiē dōng xi néng xī zhù', 'Essaie : promène un aimant dans la maison avec un adulte. Qu’est-ce qui colle?']),
    quiz: [
      Q(['磁铁能吸住什么？', 'cí tiě néng xī zhù shén me', 'Qu’est-ce que l’aimant peut attirer?'], [['铁钉', 'tiě dīng', 'Un clou en fer', '🔩'], ['木头', 'mù tou', 'Du bois', '🪵'], ['塑料', 'sù liào', 'Du plastique', '🧸']], 0),
      Q(['磁铁的力看得见吗？', 'cí tiě de lì kàn de jiàn ma', 'Peut-on voir la force de l’aimant?'], [['看不见', 'kàn bú jiàn', 'Non, on ne la voit pas', '👀'], ['红颜色的', 'hóng yán sè de', 'Elle est rouge', '🟥'], ['像绳子一样', 'xiàng shéng zi yí yàng', 'Elle ressemble à une corde', '🪢']], 0),
    ],
  },
  // ───────── 3 ─────────
  {
    id: 'science-ombre', cat: 'science', emoji: '🌓', level: 1,
    q: T(['影子是怎么来的？', 'yǐng zi shì zěn me lái de', 'D’où vient l’ombre?']),
    slides: [
      S(svg(sun(60, 150, 28) + [90, 120, 150, 180, 210].map((y) => ar(110, y, 342, y, '#f5c542', 3)).join('') + rc(350, 60, 25, 200, '#c9cedb', 4)), [
        '光是直直地走的。', 'guāng shì zhí zhí de zǒu de', 'La lumière avance en ligne droite.']),
      S(svg(rc(210, 110, 150, 80, '#3a3f5544', 0, 0) + sun(50, 150, 28) + ar(100, 100, 360, 100, '#f5c542', 3) + ar(100, 125, 163, 125, '#f5c542', 3) + ar(100, 150, 163, 150, '#f5c542', 3) + ar(100, 175, 163, 175, '#f5c542', 3) + ar(100, 200, 360, 200, '#f5c542', 3) + rc(170, 110, 40, 80, '#d9a066') + rc(365, 60, 20, 200, '#c9cedb', 4)), [
        '东西挡住了光，后面就暗了。', 'dōng xi dǎng zhù le guāng hòu miàn jiù àn le', 'Un objet bloque la lumière : derrière, c’est sombre.']),
      S(svg(ground() + sun(70, 60, 26) + el(290, 262, 95, 9, '#3a3f5555', 0) + rc(176, 230, 14, 22, O, 4) + rc(194, 230, 14, 22, O, 4) + person(190, 140, 1.3) + pa('M100 80L180 130', 'none', 3, '#f5c542', '7 6')), [
        '这块暗暗的地方，就是影子。', 'zhè kuài àn àn de dì fang jiù shì yǐng zi', 'Cette zone sombre, c’est l’ombre.']),
    ],
    fact: T(['试一试：晚上用手电筒和大人玩手影吧！', 'shì yi shì wǎn shang yòng shǒu diàn tǒng hé dà rén wán shǒu yǐng ba', 'Essaie : le soir, fais des ombres chinoises avec une lampe de poche et un adulte!']),
    quiz: [
      Q(['影子出现在哪里？', 'yǐng zi chū xiàn zài nǎ lǐ', 'Où apparaît l’ombre?'], [['光被挡住的后面', 'guāng bèi dǎng zhù de hòu miàn', 'Derrière ce qui bloque la lumière', '🌑'], ['天上的云里', 'tiān shàng de yún lǐ', 'Dans les nuages', '☁️'], ['水杯里面', 'shuǐ bēi lǐ miàn', 'Dans un verre d’eau', '🥛']], 0),
      Q(['没有光的时候，会有影子吗？', 'méi yǒu guāng de shí hou huì yǒu yǐng zi ma', 'Y a-t-il une ombre quand il n’y a pas de lumière?'], [['没有影子', 'méi yǒu yǐng zi', 'Non, pas d’ombre', '🌚'], ['有很大的影子', 'yǒu hěn dà de yǐng zi', 'Oui, une très grande ombre', '👤'], ['影子会自己跑出来', 'yǐng zi huì zì jǐ pǎo chū lái', 'L’ombre sort toute seule', '🏃']], 0),
    ],
  },
  // ───────── 4 ─────────
  {
    id: 'science-echo', cat: 'science', emoji: '⛰️', level: 1,
    q: T(['为什么会有回声？', 'wèi shén me huì yǒu huí shēng', 'Pourquoi y a-t-il de l’écho?']),
    slides: [
      S(svg(ground(240) + mountain(210, 240, 190, 170) + person(70, 170, 0.9) + sound(112, 178, 1)), [
        '声音遇到大山，会被弹回来。', 'shēng yīn yù dào dà shān huì bèi tán huí lái', 'Le son frappe la montagne et rebondit.']),
      S(svg(ground(240) + mountain(210, 240, 190, 170) + person(70, 170, 0.9) + sound(112, 178, 1) + sound(196, 178, -1, '#2f7fc1') + pa('M180 120Q130 100 100 150', 'none', 4, '#2f7fc1', '8 6')), [
        '弹回来的声音，就是回声。', 'tán huí lái de shēng yīn jiù shì huí shēng', 'Le son qui revient, c’est l’écho.']),
      S(svg(ground(240) + mountain(-40, 240, 190, 190) + mountain(250, 240, 190, 200) + person(200, 180, 0.8) + sound(232, 205, 1) + sound(168, 205, -1)), [
        '在大房间和山谷里，回声最清楚。', 'zài dà fáng jiān hé shān gǔ lǐ huí shēng zuì qīng chu', 'Dans une grande pièce ou une vallée, l’écho s’entend le mieux.']),
    ],
    fact: T(['山越远，回声回来得越晚。', 'shān yuè yuǎn huí shēng huí lái de yuè wǎn', 'Plus la montagne est loin, plus l’écho revient tard.']),
    quiz: [
      Q(['回声是什么？', 'huí shēng shì shén me', 'Qu’est-ce que l’écho?'], [['弹回来的声音', 'tán huí lái de shēng yīn', 'Un son qui rebondit', '🔊'], ['山发出的光', 'shān fā chū de guāng', 'De la lumière de la montagne', '💡'], ['风的颜色', 'fēng de yán sè', 'La couleur du vent', '🎨']], 0),
      Q(['在哪里喊最容易听到回声？', 'zài nǎ lǐ hǎn zuì róng yì tīng dào huí shēng', 'Où entend-on le mieux l’écho?'], [['山谷里', 'shān gǔ lǐ', 'Dans une vallée', '🏞️'], ['被子里', 'bèi zi lǐ', 'Sous une couverture', '🛏️'], ['草地上', 'cǎo dì shàng', 'Dans un champ ouvert', '🌱']], 0),
    ],
  },
  // ───────── 5 ─────────
  {
    id: 'science-eau-bout', cat: 'science', emoji: '♨️', level: 1,
    q: T(['为什么水会烧开？', 'wèi shén me shuǐ huì shāo kāi', 'Pourquoi l’eau bout-elle?']),
    slides: [
      S(svg(pot(120, 110) + ar(150, 290, 150, 240) + ar(200, 290, 200, 240) + ar(250, 290, 250, 240)), [
        '锅底很热，把水也烧热了。', 'guō dǐ hěn rè bǎ shuǐ yě shāo rè le', 'Le fond de la casserole est chaud et chauffe l’eau.']),
      S(svg(pot(120, 110, '#8ecbf0') + bub(160, 190, 7) + bub(200, 200, 8) + bub(240, 185, 6) + bub(180, 170, 5) + bub(225, 165, 7) + ar(150, 290, 150, 240) + ar(250, 290, 250, 240)), [
        '水越来越热，就冒出很多小泡泡。', 'shuǐ yuè lái yuè rè jiù mào chū hěn duō xiǎo pào pao', 'L’eau devient de plus en plus chaude et fait plein de petites bulles.']),
      S(svg(pot(120, 130) + bub(170, 205, 7) + bub(215, 195, 8) + bub(250, 210, 6) + steam(160, 120) + steam(200, 120) + steam(240, 120)), [
        '泡泡是水变成的水蒸气。', 'pào pao shì shuǐ biàn chéng de shuǐ zhēng qì', 'Les bulles sont de l’eau devenue vapeur.']),
      S(svg(pot(150, 140) + steam(210, 130) + steam(250, 130) + ellipseDash(235, 170, 130, 100) + person(55, 130, 0.8, '#7bc47f') + check(55, 105) + person(345, 120, 1.2, '#e8a33d')), [
        '水蒸气很烫，要离远一点，让大人来。', 'shuǐ zhēng qì hěn tàng yào lí yuǎn yì diǎn ràng dà rén lái', 'La vapeur est brûlante : reste loin et laisse faire un adulte.']),
    ],
    fact: T(['在很高的山上，水不到一百度就开了。', 'zài hěn gāo de shān shàng shuǐ bú dào yì bǎi dù jiù kāi le', 'Sur une très haute montagne, l’eau bout avant 100 degrés.']),
    quiz: [
      Q(['水烧开以后，会变成什么？', 'shuǐ shāo kāi yǐ hòu huì biàn chéng shén me', 'En bouillant, en quoi l’eau se transforme-t-elle?'], [['水蒸气', 'shuǐ zhēng qì', 'En vapeur', '♨️'], ['沙子', 'shā zi', 'En sable', '🏖️'], ['冰块', 'bīng kuài', 'En glaçons', '🧊']], 0),
      Q(['水开了的时候，我们应该怎么做？', 'shuǐ kāi le de shí hou wǒ men yīng gāi zěn me zuò', 'Quand l’eau bout, que doit-on faire?'], [['离远一点，让大人来', 'lí yuǎn yì diǎn ràng dà rén lái', 'S’éloigner et laisser un adulte faire', '🧑'], ['用手去摸水', 'yòng shǒu qù mō shuǐ', 'Toucher l’eau', '✋'], ['把脸凑过去看', 'bǎ liǎn còu guò qù kàn', 'Mettre son visage tout près', '😮']], 0),
    ],
  },
  // ───────── 6 ─────────
  {
    id: 'science-bulles-soda', cat: 'science', emoji: '🥤', level: 1,
    q: T(['汽水为什么有泡泡？', 'qì shuǐ wèi shén me yǒu pào pao', 'Pourquoi la boisson gazeuse a-t-elle des bulles?']),
    slides: [
      S(svg(bottle(200, 1) + [[185, 150], [215, 170], [175, 210], [225, 220], [200, 245], [190, 185], [210, 130], [180, 260], [220, 255]].map(([x, y]) => bub(x, y, 5)).join('')), [
        '汽水里藏着很多气。', 'qì shuǐ lǐ cáng zhe hěn duō qì', 'Dans la boisson gazeuse, il y a beaucoup de gaz caché.']),
      S(svg(bottle(200, 1) + [[180, 205], [190, 215], [200, 205], [210, 215], [220, 205], [185, 230], [200, 235], [215, 230], [195, 190], [208, 190]].map(([x, y]) => bub(x, y, 4)).join('') + ar(120, 215, 150, 215, '#e8553d', 5) + ar(280, 215, 250, 215, '#e8553d', 5) + ar(200, 20, 200, 48, '#e8553d', 5)), [
        '瓶子关紧时，气被压在水里。', 'píng zi guān jǐn shí qì bèi yā zài shuǐ lǐ', 'Bouteille fermée, le gaz reste coincé dans le liquide.']),
      S(svg(bottle(200, 0) + rc(290, 200, 44, 20, '#e8553d', 4) + [[200, 50], [190, 30], [212, 20], [180, 70], [220, 60], [200, 120], [200, 180], [185, 200], [215, 220], [195, 250]].map(([x, y]) => bub(x, y, 6)).join('') + ar(250, 110, 250, 30, '#e8553d', 5)), [
        '一打开瓶盖，气就变成泡泡冒出来。', 'yì dǎ kāi píng gài qì jiù biàn chéng pào pao mào chū lái', 'Dès qu’on ouvre le bouchon, le gaz sort en bulles.']),
    ],
    fact: T(['摇一摇再打开，泡泡会喷出来，要小心！', 'yáo yi yáo zài dǎ kāi pào pao huì pēn chū lái yào xiǎo xīn', 'Si on secoue puis ouvre, ça gicle : attention!']),
    quiz: [
      Q(['汽水里的泡泡是什么？', 'qì shuǐ lǐ de pào pao shì shén me', 'Que sont les bulles de la boisson gazeuse?'], [['气', 'qì', 'Du gaz', '💨'], ['小鱼', 'xiǎo yú', 'De petits poissons', '🐟'], ['小虫子', 'xiǎo chóng zi', 'De petits insectes', '🐛']], 0),
      Q(['为什么打开瓶盖会冒泡？', 'wèi shén me dǎ kāi píng gài huì mào pào', 'Pourquoi ça fait des bulles quand on ouvre?'], [['被压住的气跑出来了', 'bèi yā zhù de qì pǎo chū lái le', 'Le gaz coincé s’échappe', '💨'], ['瓶盖里有小虫子', 'píng gài lǐ yǒu xiǎo chóng zi', 'Il y a des insectes dans le bouchon', '🐛'], ['水被冻住了', 'shuǐ bèi dòng zhù le', 'L’eau est gelée', '🧊']], 0),
    ],
  },
  // ───────── 7 ─────────
  {
    id: 'science-miroir', cat: 'science', emoji: '🪞', level: 1,
    q: T(['为什么镜子能照出人？', 'wèi shén me jìng zi néng zhào chū rén', 'Pourquoi un miroir nous montre-t-il?']),
    slides: [
      S(svg(sun(70, 55, 24) + ground() + person(120, 150, 1) + rc(300, 60, 22, 190, '#cfe8f5', 4) + ln(308, 80, 308, 120, '#fff', 4) + ar(92, 90, 112, 135, '#f5c542', 4) + ar(150, 190, 294, 160, '#f5c542', 4)), [
        '光照在你身上，又弹到镜子上。', 'guāng zhào zài nǐ shēn shàng yòu tán dào jìng zi shàng', 'La lumière éclaire ton corps puis rebondit vers le miroir.']),
      S(svg(pa('M20 40H70L58 90L78 120L55 150L80 180L58 210L74 260H20Z', '#c9cedb') + ar(170, 60, 78, 115, '#f5c542', 3) + ar(78, 115, 172, 150, '#f5c542', 3) + ar(78, 115, 150, 205, '#f5c542', 3) + ar(78, 115, 160, 85, '#f5c542', 3) + ln(200, 20, 200, 280, '#c9cedb', 2) + rc(350, 40, 30, 230, '#cfe8f5', 4) + ar(215, 60, 345, 110, '#f5c542', 3) + ar(345, 110, 215, 160, '#f5c542', 3) + ar(215, 140, 345, 190, '#f5c542', 3) + ar(345, 190, 215, 240, '#f5c542', 3)), [
        '镜子很光滑，光会被整齐地弹回来。', 'jìng zi hěn guāng huá guāng huì bèi zhěng qí de tán huí lái', 'Le miroir est lisse : la lumière rebondit bien en ordre.']),
      S(svg(ground() + rc(190, 40, 20, 220, '#cfe8f5', 4) + person(90, 150, 1) + '<g opacity=".4">' + person(310, 150, 1, '#e8553d') + '</g>' + ar(114, 178, 186, 178, '#f5c542', 4) + ar(186, 140, 112, 140, '#f5c542', 4)), [
        '光进了你的眼睛，你就看到了自己。', 'guāng jìn le nǐ de yǎn jing nǐ jiù kàn dào le zì jǐ', 'La lumière entre dans tes yeux : tu te vois!']),
    ],
    fact: T(['你举右手，镜子里的人像是举左手。', 'nǐ jǔ yòu shǒu jìng zi lǐ de rén xiàng shì jǔ zuǒ shǒu', 'Tu lèves la main droite, et dans le miroir on dirait la gauche.']),
    quiz: [
      Q(['镜子靠什么照出人？', 'jìng zi kào shén me zhào chū rén', 'Qu’est-ce qui permet au miroir de nous montrer?'], [['光', 'guāng', 'La lumière', '💡'], ['声音', 'shēng yīn', 'Le son', '🔊'], ['风', 'fēng', 'Le vent', '🌬️']], 0),
      Q(['光滑的镜子会把光怎么样？', 'guāng huá de jìng zi huì bǎ guāng zěn me yàng', 'Que fait un miroir lisse de la lumière?'], [['弹回来', 'tán huí lái', 'Il la renvoie', '↩️'], ['吃掉', 'chī diào', 'Il la mange', '😋'], ['变成水', 'biàn chéng shuǐ', 'Il la change en eau', '💧']], 0),
    ],
  },
  // ───────── 8 ─────────
  {
    id: 'science-bateau', cat: 'science', emoji: '🚢', level: 1,
    q: T(['船为什么不会沉？', 'chuán wèi shén me bú huì chén', 'Pourquoi un bateau ne coule-t-il pas?']),
    slides: [
      S(svg(pa('M140 140H260L240 170H160Z', '#e8553d') + ln(200, 140, 200, 70) + pa('M200 72L240 130H200Z', '#fff') + wave(160, '#8ecbf0bb') + ar(160, 245, 160, 190, '#2f7fc1', 6) + ar(240, 245, 240, 190, '#2f7fc1', 6), '#d6ecfa'), [
        '水会向上托住船。', 'shuǐ huì xiàng shàng tuō zhù chuán', 'L’eau pousse le bateau vers le haut.']),
      S(svg(wave(190) + pa('M80 110H320L280 195H120Z', '#f6d5cf') + cloud(120, 160, 0.8) + cloud(200, 160, 0.8) + ln(200, 110, 200, 30) + pa('M200 32L250 100H200Z', '#fff'), '#d6ecfa'), [
        '船是空心的，装着很多空气。', 'chuán shì kōng xīn de zhuāng zhe hěn duō kōng qì', 'Le bateau est creux et rempli d’air.']),
      S(svg(pa('M240 100H340L322 130H258Z', '#e8553d') + ln(290, 100, 290, 40) + pa('M290 42L322 92H290Z', '#fff') + wave(130) + rc(70, 230, 60, 50, '#8d93a8') + ar(100, 170, 100, 222, '#e8553d', 5) + bub(150, 210, 5) + bub(160, 245, 4), '#d6ecfa'), [
        '小铁块会沉，铁做的大船却能浮。', 'xiǎo tiě kuài huì chén tiě zuò de dà chuán què néng fú', 'Un petit bloc de fer coule, mais un grand bateau en fer flotte.']),
    ],
    fact: T(['加拿大的大湖上，有很长很长的大货船。', 'jiā ná dà de dà hú shàng yǒu hěn cháng hěn cháng de dà huò chuán', 'Sur les Grands Lacs, il y a de très longs cargos.']),
    quiz: [
      Q(['为什么大船能浮在水上？', 'wèi shén me dà chuán néng fú zài shuǐ shàng', 'Pourquoi un gros bateau flotte-t-il?'], [['水托住了它', 'shuǐ tuō zhù le tā', 'L’eau le soutient', '🌊'], ['船里有魔法', 'chuán lǐ yǒu mó fǎ', 'Il y a de la magie dedans', '🪄'], ['水很怕船', 'shuǐ hěn pà chuán', 'L’eau a peur du bateau', '😱']], 0),
      Q(['一块小铁块放进水里会怎么样？', 'yí kuài xiǎo tiě kuài fàng jìn shuǐ lǐ huì zěn me yàng', 'Que fait un petit bloc de fer dans l’eau?'], [['沉下去', 'chén xià qù', 'Il coule', '⬇️'], ['浮起来', 'fú qǐ lái', 'Il flotte', '⬆️'], ['飞走', 'fēi zǒu', 'Il s’envole', '🕊️']], 0),
    ],
  },
  // ───────── 9 ─────────
  {
    id: 'science-electricite-statique', cat: 'science', emoji: '🎈', level: 1,
    q: T(['气球为什么能吸住头发？', 'qì qiú wèi shén me néng xī zhù tóu fa', 'Pourquoi un ballon attire-t-il les cheveux?']),
    slides: [
      S(svg(ground() + person(110, 180, 1.2) + pa('M86 178C86 148 134 148 134 178C120 163 100 163 86 178Z', '#7a4e2d') + ci(195, 135, 42, '#e8553d') + pa('M195 177L190 190L200 190Z', '#e8553d') + pa('M150 95l10 -12l10 12l10 -12', 'none', 4, '#f5a623') + pa('M160 175l10 -12l10 12', 'none', 4, '#f5a623')), [
        '气球和头发摩擦，会带上静电。', 'qì qiú hé tóu fa mó cā huì dài shàng jìng diàn', 'Le ballon frotte les cheveux et se charge d’électricité statique.']),
      S(svg(ci(200, 70, 42, '#e8553d') + [[-14, -34], [-6, -36], [2, -38], [10, -36], [18, -34]].map(([dx, dy], i) => pa(`M${185 + i * 8} 185Q${175 + i * 12} 150 ${192 + i * 4} 112`, 'none', 4, '#7a4e2d')).join('') + person(200, 205, 1) + pa('M180 200C180 175 220 175 220 200C210 190 190 190 180 200Z', '#7a4e2d')), [
        '带了静电的气球，会把头发拉过来。', 'dài le jìng diàn de qì qiú huì bǎ tóu fa lā guò lái', 'Le ballon chargé tire les cheveux vers lui.']),
      S(svg([[50, 60], [120, 40], [330, 50], [360, 130], [60, 150], [300, 100], [250, 30]].map(([x, y]) => ci(x, y, 5, '#fff', 0)).join('') + ground() + person(200, 150, 1.3) + [-40, -20, 0, 20, 40].map((d, i) => ln(200 + d * 0.5, 130, 200 + d * 1.6, 90 - (i % 2) * 15, '#7a4e2d', 4)).join('') + pa('M120 120l10 -12l10 12l10 -12', 'none', 4, '#f5a623') + pa('M250 100l10 -12l10 12l10 -12', 'none', 4, '#f5a623'), '#dbe9f6'), [
        '冬天空气干，静电特别多。', 'dōng tiān kōng qì gān jìng diàn tè bié duō', 'L’hiver, l’air est sec : il y a beaucoup d’électricité statique.']),
    ],
    fact: T(['试一试：用气球在头发上擦一擦，再吸小纸片。', 'shì yi shì yòng qì qiú zài tóu fa shàng cā yi cā zài xī xiǎo zhǐ piàn', 'Essaie : frotte un ballon sur tes cheveux, puis approche-le de petits bouts de papier.']),
    quiz: [
      Q(['气球要先怎么做，才能吸住头发？', 'qì qiú yào xiān zěn me zuò cái néng xī zhù tóu fa', 'Que faut-il faire d’abord pour que le ballon attire les cheveux?'], [['在头发上擦一擦', 'zài tóu fa shàng cā yi cā', 'Le frotter sur les cheveux', '💇'], ['放进水里', 'fàng jìn shuǐ lǐ', 'Le mettre dans l’eau', '💧'], ['晒一晒太阳', 'shài yi shài tài yang', 'Le mettre au soleil', '☀️']], 0),
      Q(['哪个时候静电最多？', 'nǎ gè shí hou jìng diàn zuì duō', 'Quand y a-t-il le plus d’électricité statique?'], [['冬天', 'dōng tiān', 'En hiver, quand l’air est sec', '❄️'], ['下雨天', 'xià yǔ tiān', 'Un jour de pluie', '🌧️'], ['泡澡的时候', 'pào zǎo de shí hou', 'Dans le bain', '🛁']], 0),
    ],
  },
  // ───────── 10 ─────────
  {
    id: 'science-pain-gonfle', cat: 'science', emoji: '🍞', level: 1,
    q: T(['面包为什么会发起来？', 'miàn bāo wèi shén me huì fā qǐ lái', 'Pourquoi le pain gonfle-t-il?']),
    slides: [
      S(svg(pa('M60 140H340Q330 245 200 255Q70 245 60 140Z', '#fff') + el(200, 140, 120, 48, '#f3dcae') + [[150, 130], [200, 115], [250, 135], [180, 155], [230, 160]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="8" fill="#b5651d" stroke="${O}" stroke-width="2"/>` + ci(x - 3, y - 1, 1.5, '#fff', 0) + ci(x + 3, y - 1, 1.5, '#fff', 0)).join(''), '#fdf6e8'), [
        '面团里加了一点点酵母。', 'miàn tuán lǐ jiā le yì diǎn diǎn jiào mǔ', 'On ajoute un tout petit peu de levure dans la pâte.']),
      S(svg([[110, 200], [200, 225], [290, 200], [160, 150], [250, 150]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="10" fill="#b5651d" stroke="${O}" stroke-width="2"/>` + ci(x - 4, y - 1, 2, '#fff', 0) + ci(x + 4, y - 1, 2, '#fff', 0)).join('') + [[135, 205], [225, 215], [270, 185], [180, 180]].map(([x, y]) => rc(x, y, 14, 14, '#fff', 3, 2)).join('') + [[120, 100], [210, 90], [290, 105], [170, 60], [255, 55]].map(([x, y]) => bub(x, y, 8)).join('') + ar(210, 130, 210, 100, '#e8553d', 3), '#f3dcae'), [
        '酵母吃糖，会放出很多小气泡。', 'jiào mǔ chī táng huì fàng chū hěn duō xiǎo qì pào', 'La levure mange du sucre et fait plein de petites bulles de gaz.']),
      S(svg(el(95, 225, 55, 32, '#f3dcae') + ar(165, 200, 205, 200, '#e8553d', 6) + pa('M220 240V175Q220 110 290 110Q360 110 360 175V240Z', '#d9a066') + pa('M232 235V178Q232 124 290 124Q348 124 348 178V235Z', '#f8e7bd') + [[260, 150], [300, 165], [320, 200], [270, 205], [245, 180], [295, 135], [335, 160]].map(([x, y]) => ci(x, y, 7, '#f0d9a2', 2)).join(''), '#fdf6e8'), [
        '气泡把面团撑大，烤好就松松软软。', 'qì pào bǎ miàn tuán chēng dà kǎo hǎo jiù sōng sōng ruǎn ruǎn', 'Les bulles font gonfler la pâte : cuit, le pain est tout moelleux.']),
    ],
    fact: T(['面包里的小洞，就是气泡留下的。', 'miàn bāo lǐ de xiǎo dòng jiù shì qì pào liú xià de', 'Les petits trous dans le pain sont laissés par les bulles.']),
    quiz: [
      Q(['酵母放出什么，让面团变大？', 'jiào mǔ fàng chū shén me ràng miàn tuán biàn dà', 'Que produit la levure pour faire gonfler la pâte?'], [['小气泡', 'xiǎo qì pào', 'De petites bulles de gaz', '🫧'], ['小石头', 'xiǎo shí tou', 'De petits cailloux', '🪨'], ['小星星', 'xiǎo xīng xing', 'De petites étoiles', '⭐']], 0),
      Q(['面包里为什么有很多小洞？', 'miàn bāo lǐ wèi shén me yǒu hěn duō xiǎo dòng', 'Pourquoi y a-t-il plein de petits trous dans le pain?'], [['气泡留下的', 'qì pào liú xià de', 'Les bulles les ont laissés', '🫧'], ['虫子咬的', 'chóng zi yǎo de', 'Des insectes l’ont mordu', '🐛'], ['用针扎的', 'yòng zhēn zhā de', 'On l’a piqué avec une aiguille', '🪡']], 0),
    ],
  },
  // ───────── 11 ─────────
  {
    id: 'science-sirop-erable', cat: 'science', emoji: '🍁', level: 1,
    q: T(['枫糖浆是怎么做的？', 'fēng táng jiāng shì zěn me zuò de', 'Comment fait-on le sirop d’érable?']),
    slides: [
      S(svg(ground(250, '#fff') + rc(180, 130, 40, 125, '#8b5a2b', 6) + ci(200, 95, 58, '#e8743b') + ci(150, 120, 38, '#e8553d') + ci(250, 120, 38, '#e8553d') + [[192, 170], [208, 195], [195, 225]].map(([x, y]) => ci(x, y, 5, '#f3c26b', 0)).join('') + ar(200, 240, 200, 150, '#f3c26b', 4), '#e6f1f7'), [
        '春天，枫树里有甜甜的树汁。', 'chūn tiān fēng shù lǐ yǒu tián tián de shù zhī', 'Au printemps, il y a une sève sucrée dans l’érable.']),
      S(svg(rc(130, 20, 130, 260, '#8b5a2b', 12) + ci(262, 135, 7, O) + rc(262, 128, 38, 14, '#8d93a8', 3) + ci(296, 160, 5, '#f3c26b', 0) + ci(296, 185, 5, '#f3c26b', 0) + pa('M270 210H340L332 270H278Z', '#c9cedb') + rc(278, 238, 54, 28, '#f3c26b', 4, 0), '#e6f1f7'), [
        '人们在树上钻个小孔，接住树汁。', 'rén men zài shù shàng zuān gè xiǎo kǒng jiē zhù shù zhī', 'On perce un petit trou dans l’arbre pour recueillir la sève.']),
      S(svg(pot(120, 130, '#e0a24a') + steam(160, 120) + steam(200, 120) + steam(240, 120), '#f7efe2'), [
        '把树汁煮很久，水变成蒸汽跑掉。', 'bǎ shù zhī zhǔ hěn jiǔ shuǐ biàn chéng zhēng qì pǎo diào', 'On fait bouillir longtemps : l’eau part en vapeur.']),
      S(svg(bottle(120, 1, '#c4752b') + el(290, 245, 60, 14, '#f3dcae') + el(290, 228, 60, 14, '#f3dcae') + el(290, 211, 60, 14, '#f3dcae') + pa('M265 205Q290 190 315 205Q320 235 300 250Q280 255 262 235Z', '#c4752b', 0) + ci(290, 160, 6, '#c4752b', 0), '#f7efe2'), [
        '剩下的就是又甜又浓的枫糖浆。', 'shèng xià de jiù shì yòu tián yòu nóng de fēng táng jiāng', 'Il reste le sirop d’érable, sucré et épais.']),
    ],
    fact: T(['大约四十桶树汁，才能煮出一桶枫糖浆。', 'dà yuē sì shí tǒng shù zhī cái néng zhǔ chū yì tǒng fēng táng jiāng', 'Il faut environ quarante chaudières de sève pour faire une de sirop.']),
    quiz: [
      Q(['枫糖浆是用什么做的？', 'fēng táng jiāng shì yòng shén me zuò de', 'Avec quoi fait-on le sirop d’érable?'], [['枫树的树汁', 'fēng shù de shù zhī', 'La sève de l’érable', '🍁'], ['枫叶的颜色', 'fēng yè de yán sè', 'La couleur des feuilles', '🍂'], ['雪', 'xuě', 'De la neige', '❄️']], 0),
      Q(['树汁为什么要煮很久？', 'shù zhī wèi shén me yào zhǔ hěn jiǔ', 'Pourquoi fait-on bouillir longtemps la sève?'], [['让水跑掉，变浓', 'ràng shuǐ pǎo diào biàn nóng', 'Pour chasser l’eau et épaissir', '♨️'], ['让树汁变成冰', 'ràng shù zhī biàn chéng bīng', 'Pour la changer en glace', '🧊'], ['让树汁变咸', 'ràng shù zhī biàn xián', 'Pour la rendre salée', '🧂']], 0),
    ],
  },
  // ───────── 12 ─────────
  {
    id: 'science-souffle-blanc', cat: 'science', emoji: '😮‍💨', level: 1,
    q: T(['冬天为什么能看见呼出的白气？', 'dōng tiān wèi shén me néng kàn jiàn hū chū de bái qì', 'Pourquoi voit-on son souffle blanc l’hiver?']),
    slides: [
      S(svg(face(80, 150, 42) + ci(112, 168, 6, '#e8553d') + ar(135, 168, 260, 150, '#f08a5d', 7) + ci(300, 130, 6, '#f08a5d', 0) + ci(320, 175, 6, '#f08a5d', 0), '#fdeee4'), [
        '我们呼出的气，又暖又湿。', 'wǒ men hū chū de qì yòu nuǎn yòu shī', 'L’air qu’on souffle est chaud et humide.']),
      S(svg([[60, 40], [150, 60], [330, 50], [250, 30], [370, 130], [40, 240], [320, 250]].map(([x, y]) => flake(x, y, 8, '#fff')).join('') + face(70, 150, 38) + [[140, 150], [160, 140], [165, 165], [185, 150], [205, 135], [210, 165], [230, 150], [250, 160]].map(([x, y]) => ci(x, y, 5, '#fff', 2)).join('') + tx(335, 220, '-20', 30), '#cfe6f7'), [
        '冬天外面很冷，暖气遇冷变成小水珠。', 'dōng tiān wài miàn hěn lěng nuǎn qì yù lěng biàn chéng xiǎo shuǐ zhū', 'Il fait froid dehors : l’air chaud se change en minuscules gouttes.']),
      S(svg([[60, 40], [150, 60], [330, 50], [250, 30], [370, 130]].map(([x, y]) => flake(x, y, 8, '#fff')).join('') + face(70, 150, 38) + cloud(170, 150, 1.5), '#cfe6f7'), [
        '很多小水珠聚在一起，就成了白气。', 'hěn duō xiǎo shuǐ zhū jù zài yì qǐ jiù chéng le bái qì', 'Plein de gouttelettes ensemble forment un nuage blanc.']),
    ],
    fact: T(['夏天很热，呼出的气就看不见。', 'xià tiān hěn rè hū chū de qì jiù kàn bú jiàn', 'L’été, il fait chaud et on ne voit pas son souffle.']),
    quiz: [
      Q(['白气是什么？', 'bái qì shì shén me', 'Qu’est-ce que le souffle blanc?'], [['很多小水珠', 'hěn duō xiǎo shuǐ zhū', 'Plein de minuscules gouttes d’eau', '💧'], ['白色的烟', 'bái sè de yān', 'De la fumée blanche', '🚬'], ['小棉花', 'xiǎo mián hua', 'Du petit coton', '☁️']], 0),
      Q(['为什么夏天看不见呼出的白气？', 'wèi shén me xià tiān kàn bú jiàn hū chū de bái qì', 'Pourquoi ne voit-on pas son souffle l’été?'], [['天气暖，不容易变成水珠', 'tiān qì nuǎn bù róng yì biàn chéng shuǐ zhū', 'Il fait chaud : peu de gouttelettes se forment', '☀️'], ['夏天不呼气', 'xià tiān bù hū qì', 'On ne souffle pas l’été', '🙊'], ['白气怕太阳', 'bái qì pà tài yang', 'Le souffle a peur du soleil', '😱']], 0),
    ],
  },
  // ───────── 13 ─────────
  {
    id: 'science-sel-glace', cat: 'science', emoji: '🧂', level: 2,
    q: T(['为什么盐能让路上的冰融化？', 'wèi shén me yán néng ràng lù shàng de bīng róng huà', 'Pourquoi le sel fait-il fondre la glace sur la route?']),
    slides: [
      S(svg(rc(-5, 170, 410, 140, '#8d93a8', 0, 0) + el(205, 235, 140, 42, '#dff3fc') + car(120, 185) + pa('M60 270Q40 250 55 225', 'none', 4, '#fff') + pa('M90 275Q70 255 80 235', 'none', 4, '#fff') + ln(150, 235, 170, 240, '#fff', 4), '#d6ecfa'), [
        '冬天路上结冰，车子容易打滑。', 'dōng tiān lù shàng jié bīng chē zi róng yì dǎ huá', 'L’hiver, la route gèle et les autos dérapent facilement.']),
      S(svg(rc(-5, 190, 410, 120, '#8d93a8', 0, 0) + rc(270, 20, 44, 62, '#fff', 8) + rc(270, 14, 44, 16, '#c9cedb', 4) + [[285, 90], [300, 105], [275, 118], [295, 135], [260, 150], [320, 150]].map(([x, y]) => rc(x, y, 7, 7, '#fff', 2, 2)).join('') + pa('M60 235L150 205L190 235L150 265Z', '#dff3fc') + el(250, 245, 50, 16, '#8ecbf0') + ci(170, 255, 6, '#8ecbf0', 0) + ci(195, 262, 5, '#8ecbf0', 0), '#e9f4fb'), [
        '撒上盐，冰就开始变成水。', 'sā shàng yán bīng jiù kāi shǐ biàn chéng shuǐ', 'Avec du sel, la glace se met à fondre.']),
      S(svg(gl(60, 100, 110, 140, 105, '#e4f6ff') + ln(75, 150, 105, 180, '#8ecbf0', 3) + ln(110, 140, 140, 175, '#8ecbf0', 3) + gl(230, 100, 110, 140, 105) + [[255, 225], [275, 228], [300, 224], [320, 228], [265, 215]].map(([x, y]) => rc(x, y, 6, 6, '#fff', 2, 2)).join('') + tx(115, 70, '-3', 30) + tx(285, 70, '-3', 30) + flake(115, 270, 14), '#e9f4fb'), [
        '盐水要更冷，才会结冰。', 'yán shuǐ yào gèng lěng cái huì jié bīng', 'L’eau salée doit être plus froide pour geler.']),
      S(svg(rc(180, 30, 28, 200, '#fff', 14) + rc(188, 150, 12, 80, '#e8553d', 6, 0) + ci(194, 245, 24, '#e8553d') + tx(280, 150, '-20', 34) + el(80, 245, 70, 22, '#dff3fc') + [[50, 240], [75, 250], [100, 242]].map(([x, y]) => rc(x, y, 7, 7, '#fff', 2, 2)).join('') + cross(80, 200) + flake(300, 70, 20), '#cfe6f7'), [
        '太冷的时候，盐也没办法啦。', 'tài lěng de shí hou yán yě méi bàn fǎ la', 'S’il fait trop froid, même le sel n’y peut rien.']),
    ],
    fact: T(['盐也会让汽车慢慢生锈。', 'yán yě huì ràng qì chē màn màn shēng xiù', 'Le sel fait aussi rouiller les autos peu à peu.']),
    quiz: [
      Q(['路上结冰，人们会撒什么？', 'lù shàng jié bīng rén men huì sā shén me', 'Que répand-on sur la glace des routes?'], [['盐', 'yán', 'Du sel', '🧂'], ['巧克力', 'qiǎo kè lì', 'Du chocolat', '🍫'], ['彩纸', 'cǎi zhǐ', 'Des papiers colorés', '🎊']], 0),
      Q(['盐水要怎么样才会结冰？', 'yán shuǐ yào zěn me yàng cái huì jié bīng', 'Que faut-il pour que l’eau salée gèle?'], [['要更冷', 'yào gèng lěng', 'Il faut plus de froid', '🥶'], ['要更热', 'yào gèng rè', 'Il faut plus de chaleur', '🔥'], ['马上就结', 'mǎ shàng jiù jié', 'Elle gèle tout de suite', '⚡']], 0),
    ],
  },
  // ───────── 14 ─────────
  {
    id: 'science-montgolfiere', cat: 'science', emoji: '🎈', level: 2,
    q: T(['热气球为什么能升空？', 'rè qì qiú wèi shén me néng shēng kōng', 'Pourquoi une montgolfière monte-t-elle dans le ciel?']),
    slides: [
      S(svg(pa('M150 170C120 100 160 40 200 40C240 40 280 100 250 170Z', '#e8553d') + pa('M175 90q12 -12 25 0t25 0M170 125q15 -12 30 0t30 0', 'none', 4, '#ffd166') + ln(165, 168, 188, 232) + ln(235, 168, 212, 232) + rc(186, 230, 28, 24, '#d9a066', 3) + pa('M200 222C190 208 200 200 200 190C210 202 212 212 200 222Z', '#ffb02e', 3), '#dbeefa'), [
        '球里的空气被加热了。', 'qiú lǐ de kōng qì bèi jiā rè le', 'L’air dans le ballon est chauffé.']),
      S(svg(rc(30, 50, 150, 170, '#dbe9f6') + [[50, 80], [90, 75], [130, 85], [160, 100], [60, 120], [100, 125], [140, 130], [70, 165], [110, 170], [150, 160], [50, 200], [95, 205], [140, 200], [170, 190]].map(([x, y]) => ci(x, y, 5, '#2f7fc1', 0)).join('') + rc(220, 50, 150, 170, '#fde3dc') + [[250, 90], [310, 110], [340, 160], [270, 170], [320, 200]].map(([x, y]) => ci(x, y, 5, '#e8553d', 0)).join('') + ar(105, 235, 105, 285, '#2f7fc1', 6) + ar(295, 285, 295, 235, '#e8553d', 6), '#f6f9fb'), [
        '热空气比冷空气轻。', 'rè kōng qì bǐ lěng kōng qì qīng', 'L’air chaud est plus léger que l’air froid.']),
      S(svg(cloud(60, 70, 0.8) + cloud(290, 45, 0.8) + mountain(-60, 300, 250, 110) + mountain(160, 300, 280, 140, '#8791b5') + pa('M150 190C120 120 160 60 200 60C240 60 280 120 250 190Z', '#e8553d') + ln(165, 188, 188, 244) + ln(235, 188, 212, 244) + rc(186, 242, 28, 24, '#d9a066', 3) + ar(340, 270, 340, 150, '#e8553d', 7), '#cfe9fb'), [
        '轻的热空气，把大球托了起来。', 'qīng de rè kōng qì bǎ dà qiú tuō le qǐ lái', 'L’air chaud, léger, soulève le grand ballon.']),
      S(svg(ground(255) + pa('M150 150C120 80 160 20 200 20C240 20 280 80 250 150Z', '#4a90e2') + ln(165, 148, 188, 204) + ln(235, 148, 212, 204) + rc(186, 202, 28, 24, '#d9a066', 3) + ar(340, 80, 340, 190, '#2f7fc1', 7) + pa('M60 255V225M90 255V215M310 255V230', 'none', 6, '#4f8f4f') + cloud(70, 60, 0.7), '#dbeefa'), [
        '空气变冷了，热气球就慢慢降下来。', 'kōng qì biàn lěng le rè qì qiú jiù màn màn jiàng xià lái', 'L’air refroidit et la montgolfière redescend doucement.']),
    ],
    fact: T(['很久以前，一只羊、一只鸭和一只鸡坐过热气球。', 'hěn jiǔ yǐ qián yì zhī yáng yì zhī yā hé yì zhī jī zuò guò rè qì qiú', 'Il y a très longtemps, un mouton, un canard et un coq sont montés en montgolfière.']),
    quiz: [
      Q(['热空气和冷空气，哪个更轻？', 'rè kōng qì hé lěng kōng qì nǎ gè gèng qīng', 'Quel air est le plus léger, le chaud ou le froid?'], [['热空气', 'rè kōng qì', 'L’air chaud', '🔥'], ['冷空气', 'lěng kōng qì', 'L’air froid', '❄️'], ['一样重', 'yí yàng zhòng', 'Pareil', '⚖️']], 0),
      Q(['热气球里的空气变冷了，会怎么样？', 'rè qì qiú lǐ de kōng qì biàn lěng le huì zěn me yàng', 'Que se passe-t-il quand l’air du ballon refroidit?'], [['慢慢降下来', 'màn màn jiàng xià lái', 'Il redescend doucement', '⬇️'], ['飞得更高', 'fēi de gèng gāo', 'Il monte plus haut', '⬆️'], ['变成石头', 'biàn chéng shí tou', 'Il devient une pierre', '🪨']], 0),
    ],
  },
  // ───────── 15 ─────────
  {
    id: 'science-loupe', cat: 'science', emoji: '🔍', level: 2,
    q: T(['放大镜为什么能放大？', 'fàng dà jìng wèi shén me néng fàng dà', 'Pourquoi la loupe grossit-elle?']),
    slides: [
      S(svg(pa('M200 45C262 110 262 190 200 255C138 190 138 110 200 45Z', '#dff3fc', 4) + ln(180, 100, 175, 150, '#fff', 4) + pa('M60 150H340', 'none', 3, '#e8553d', '7 6') + pa('M130 85H270', 'none', 3, '#4a90e2', '7 6')), [
        '放大镜是中间厚、边上薄的玻璃。', 'fàng dà jìng shì zhōng jiān hòu biān shàng báo de bō li', 'La loupe est un verre épais au milieu et mince sur les bords.']),
      S(svg(pa('M200 60C235 100 235 200 200 240C165 200 165 100 200 60Z', '#dff3fc', 4) + ln(20, 110, 185, 110, '#f5c542', 4) + ln(185, 110, 330, 150, '#f5c542', 4) + ln(20, 150, 330, 150, '#f5c542', 4) + ln(20, 190, 185, 190, '#f5c542', 4) + ln(185, 190, 330, 150, '#f5c542', 4) + ln(330, 150, 385, 110, '#f5c542', 4) + ln(330, 150, 385, 190, '#f5c542', 4) + ci(330, 150, 6, '#e8553d', 0)), [
        '光穿过它，会被弯一弯。', 'guāng chuān guò tā huì bèi wān yi wān', 'La lumière qui la traverse se courbe un peu.']),
      S(svg(ground() + ladybug(70, 220, 0.9) + ln(285, 175, 345, 240, '#8b5a2b', 14) + ci(230, 120, 72, '#e9f7ff', 6) + ladybug(230, 125, 2.2)), [
        '弯过的光，让东西看起来变大了。', 'wān guò de guāng ràng dōng xi kàn qǐ lái biàn dà le', 'La lumière courbée fait paraître l’objet plus grand.']),
    ],
    fact: T(['千万别用放大镜看太阳，很危险！', 'qiān wàn bié yòng fàng dà jìng kàn tài yang hěn wēi xiǎn', 'Ne regarde jamais le soleil avec une loupe : c’est très dangereux!']),
    quiz: [
      Q(['放大镜的形状是怎样的？', 'fàng dà jìng de xíng zhuàng shì zěn yàng de', 'Quelle forme a une loupe?'], [['中间厚，边上薄', 'zhōng jiān hòu biān shàng báo', 'Épaisse au centre, mince sur les bords', '🔍'], ['中间薄，边上厚', 'zhōng jiān báo biān shàng hòu', 'Mince au centre, épaisse sur les bords', '🥣'], ['又平又薄', 'yòu píng yòu báo', 'Plate et mince', '📄']], 0),
      Q(['光穿过放大镜，会怎么样？', 'guāng chuān guò fàng dà jìng huì zěn me yàng', 'Que fait la lumière qui traverse la loupe?'], [['被弯一弯', 'bèi wān yi wān', 'Elle se courbe', '↪️'], ['变成声音', 'biàn chéng shēng yīn', 'Elle devient du son', '🔊'], ['全部消失', 'quán bù xiāo shī', 'Elle disparaît toute', '💨']], 0),
    ],
  },
  // ───────── 16 ─────────
  {
    id: 'science-ampoule', cat: 'science', emoji: '💡', level: 2,
    q: T(['灯泡为什么会亮？', 'dēng pào wèi shén me huì liàng', 'Pourquoi une ampoule s’allume-t-elle?']),
    slides: [
      S(svg(pa('M70 120V70H330V112M70 180V240H330V205', 'none', 5) + rc(48, 115, 44, 70, '#7bc47f', 6) + rc(60, 105, 20, 10, '#c9cedb', 3) + rc(48, 140, 44, 16, '#ffd166', 0, 0) + bulb(330, 155, true) + ar(150, 70, 240, 70, '#f5a623', 5) + ar(250, 240, 160, 240, '#f5a623', 5)), [
        '电池里的电，沿着电线跑进灯泡。', 'diàn chí lǐ de diàn yán zhe diàn xiàn pǎo jìn dēng pào', 'L’électricité de la pile suit le fil jusqu’à l’ampoule.']),
      S(svg([0, 1, 2, 3, 4, 5, 6, 7].map((i) => { const a = i * Math.PI / 4; return ln(200 + Math.cos(a) * 105, 125 + Math.sin(a) * 105, 200 + Math.cos(a) * 130, 125 + Math.sin(a) * 130, '#f5a623', 5); }).join('') + ci(200, 125, 92, '#ffe27a') + rc(170, 210, 60, 40, '#8d93a8', 6) + pa('M180 210V165L192 135L200 165L208 135L220 165V210', 'none', 5, '#e8553d') + ln(188, 250, 188, 285) + ln(212, 250, 212, 285)), [
        '老式灯泡里有细丝，电一来就发光。', 'lǎo shì dēng pào lǐ yǒu xì sī diàn yì lái jiù fā guāng', 'Dans une ampoule ancienne, un fin filament brille quand l’électricité arrive.']),
      S(svg(pa('M70 120V70H175M225 70H330V112M70 180V240H330V205', 'none', 5) + ln(175, 70, 215, 40, O, 5) + rc(48, 115, 44, 70, '#7bc47f', 6) + rc(60, 105, 20, 10, '#c9cedb', 3) + rc(48, 140, 44, 16, '#ffd166', 0, 0) + bulb(330, 155, false) + cross(270, 70)), [
        '电路断开了，电走不通，灯就灭了。', 'diàn lù duàn kāi le diàn zǒu bù tōng dēng jiù miè le', 'Le circuit est coupé : l’électricité ne passe plus, l’ampoule s’éteint.']),
    ],
    fact: T(['插座里的电很强，小朋友千万别碰！', 'chā zuò lǐ de diàn hěn qiáng xiǎo péng yǒu qiān wàn bié pèng', 'L’électricité d’une prise est très forte : les enfants n’y touchent jamais!']),
    quiz: [
      Q(['手电筒里的电从哪里来？', 'shǒu diàn tǒng lǐ de diàn cóng nǎ lǐ lái', 'D’où vient l’électricité d’une lampe de poche?'], [['电池', 'diàn chí', 'Des piles', '🔋'], ['玻璃', 'bō li', 'Du verre', '🪟'], ['纸', 'zhǐ', 'Du papier', '📄']], 0),
      Q(['电路断开了，灯会怎么样？', 'diàn lù duàn kāi le dēng huì zěn me yàng', 'Que fait l’ampoule quand le circuit est coupé?'], [['灭了', 'miè le', 'Elle s’éteint', '🌑'], ['更亮', 'gèng liàng', 'Elle brille plus fort', '✨'], ['变成彩色', 'biàn chéng cǎi sè', 'Elle devient multicolore', '🌈']], 0),
    ],
  },
  // ───────── 17 ─────────
  {
    id: 'science-frigo', cat: 'science', emoji: '🧊', level: 2,
    q: T(['冰箱为什么是冷的？', 'bīng xiāng wèi shén me shì lěng de', 'Pourquoi le frigo est-il froid?']),
    slides: [
      S(svg(rc(120, 20, 160, 260, '#e8f1f5', 12) + rc(135, 105, 130, 160, '#cfe8f9', 6, 0) + ln(120, 90, 280, 90) + rc(262, 38, 8, 36, '#8d93a8', 3) + rc(262, 105, 8, 60, '#8d93a8', 3) + flake(200, 55, 16) + ci(165, 235, 15, '#e8553d') + rc(200, 205, 34, 60, '#fff', 4)), [
        '冰箱像一个搬热的机器。', 'bīng xiāng xiàng yí gè bān rè de jī qì', 'Le frigo est comme une machine qui déménage la chaleur.']),
      S(svg(rc(100, 40, 200, 220, '#e8f1f5', 10) + rc(115, 55, 110, 190, '#cfe8f9', 6, 0) + flake(160, 110, 16) + ci(180, 215, 14, '#e8553d') + ar(150, 150, 345, 150, '#e8553d', 9) + pa('M310 100q12 -14 0 -28M330 100q12 -14 0 -28', 'none', 4, '#e8553d') + pa('M310 215q12 -14 0 -28M330 215q12 -14 0 -28', 'none', 4, '#e8553d')), [
        '它把箱子里的热，搬到箱子外面。', 'tā bǎ xiāng zi lǐ de rè bān dào xiāng zi wài miàn', 'Elle déplace la chaleur de l’intérieur vers l’extérieur.']),
      S(svg(rc(110, 20, 160, 260, '#e8f1f5', 12) + [60, 90, 120, 150, 180, 210, 240].map((y) => pa(`M140 ${y}H240`, 'none', 5, '#e8743b')).join('') + pa('M140 60V240M240 60V240', 'none', 5, '#e8743b') + [150, 190, 230].map((x) => pa(`M${x} 17q12 -8 0 -16`, 'none', 4, '#e8553d')).join('') + ci(330, 150, 18, '#ffd9b3') + ln(312, 150, 290, 150, '#ffd9b3', 12) + pa('M300 120q-12 14 0 28M300 175q-12 -14 0 -28', 'none', 4, '#e8553d')), [
        '冰箱背后会有点暖，那是搬出来的热。', 'bīng xiāng bèi hòu huì yǒu diǎn nuǎn nà shì bān chū lái de rè', 'L’arrière du frigo est un peu chaud : c’est la chaleur déménagée.']),
    ],
    fact: T(['魁北克的冬天，阳台就像一个大冰箱。', 'kuí běi kè de dōng tiān yáng tái jiù xiàng yí gè dà bīng xiāng', 'L’hiver au Québec, le balcon est comme un grand frigo.']),
    quiz: [
      Q(['冰箱把热搬到哪里？', 'bīng xiāng bǎ rè bān dào nǎ lǐ', 'Où le frigo envoie-t-il la chaleur?'], [['箱子外面', 'xiāng zi wài miàn', 'À l’extérieur', '➡️'], ['箱子里面', 'xiāng zi lǐ miàn', 'À l’intérieur', '⬅️'], ['天上', 'tiān shàng', 'Dans le ciel', '☁️']], 0),
      Q(['冰箱背后为什么会有点暖？', 'bīng xiāng bèi hòu wèi shén me huì yǒu diǎn nuǎn', 'Pourquoi l’arrière du frigo est-il un peu chaud?'], [['搬出来的热在那里', 'bān chū lái de rè zài nà lǐ', 'La chaleur déménagée sort par là', '♨️'], ['里面有小太阳', 'lǐ miàn yǒu xiǎo tài yang', 'Il y a un petit soleil dedans', '☀️'], ['冰箱在发烧', 'bīng xiāng zài fā shāo', 'Le frigo a de la fièvre', '🤒']], 0),
    ],
  },
  // ───────── 18 ─────────
  {
    id: 'science-rouille', cat: 'science', emoji: '🔩', level: 2,
    q: T(['为什么铁会生锈？', 'wèi shén me tiě huì shēng xiù', 'Pourquoi le fer rouille-t-il?']),
    slides: [
      S(svg(wave(215, '#8ecbf0bb') + rc(104, 90, 12, 150, '#8d93a8', 3) + rc(90, 80, 40, 12, '#8d93a8', 3) + [[170, 110], [60, 130], [150, 170]].map(([x, y]) => pa(`M${x} ${y - 12}Q${x + 10} ${y + 2} ${x} ${y + 8}Q${x - 10} ${y + 2} ${x} ${y - 12}Z`, '#8ecbf0')).join('') + cloud(250, 90, 1)), [
        '铁遇到水和空气，会慢慢变样。', 'tiě yù dào shuǐ hé kōng qì huì màn màn biàn yàng', 'Le fer au contact de l’eau et de l’air change peu à peu.']),
      S(svg(rc(50, 130, 300, 34, '#8d93a8', 8) + el(110, 148, 28, 14, '#b5541c', 0) + el(190, 150, 36, 16, '#b5541c', 0) + el(270, 146, 30, 15, '#b5541c', 0) + [[140, 120], [230, 175], [300, 125], [90, 180]].map(([x, y]) => ci(x, y, 5, '#e8743b', 0)).join('') + cloud(110, 70, 0.8) + ar(160, 75, 180, 120, '#4a90e2', 4)), [
        '空气里的氧气和铁结合，变成红褐色的铁锈。', 'kōng qì lǐ de yǎng qì hé tiě jié hé biàn chéng hóng hè sè de tiě xiù', 'L’oxygène de l’air s’unit au fer et forme la rouille rouge-brun.']),
      S(svg(rc(50, 160, 300, 40, '#8d93a8', 8) + rc(50, 148, 300, 16, '#e8553d', 6) + [[90, 60], [180, 40], [270, 70]].map(([x, y]) => pa(`M${x} ${y - 12}Q${x + 10} ${y + 2} ${x} ${y + 8}Q${x - 10} ${y + 2} ${x} ${y - 12}Z`, '#8ecbf0') + ar(x, y + 14, x, y + 60, '#8ecbf0', 3)).join('') + [[110, 125], [200, 120], [290, 128]].map(([x, y]) => pa(`M${x - 8} ${y}Q${x} ${y - 14} ${x + 8} ${y}`, 'none', 3, '#4a90e2')).join('')), [
        '涂上油漆，铁就不容易生锈。', 'tú shàng yóu qī tiě jiù bù róng yì shēng xiù', 'Avec de la peinture, le fer rouille moins facilement.']),
    ],
    fact: T(['铁锈很脆，会一片一片掉下来。', 'tiě xiù hěn cuì huì yí piàn yí piàn diào xià lái', 'La rouille est fragile : elle tombe par petits morceaux.']),
    quiz: [
      Q(['铁生锈需要什么？', 'tiě shēng xiù xū yào shén me', 'De quoi le fer a-t-il besoin pour rouiller?'], [['水和空气', 'shuǐ hé kōng qì', 'D’eau et d’air', '💧'], ['月亮和星星', 'yuè liang hé xīng xing', 'De la lune et des étoiles', '🌙'], ['音乐和歌', 'yīn yuè hé gē', 'De musique et de chansons', '🎵']], 0),
      Q(['怎样让铁不容易生锈？', 'zěn yàng ràng tiě bù róng yì shēng xiù', 'Comment éviter que le fer rouille?'], [['涂上油漆', 'tú shàng yóu qī', 'Le peindre', '🎨'], ['泡在水里', 'pào zài shuǐ lǐ', 'Le laisser dans l’eau', '🛁'], ['放在雨里', 'fàng zài yǔ lǐ', 'Le laisser sous la pluie', '🌧️']], 0),
    ],
  },
  // ───────── 19 ─────────
  {
    id: 'science-son', cat: 'science', emoji: '🔊', level: 2,
    q: T(['声音是怎么传播的？', 'shēng yīn shì zěn me chuán bō de', 'Comment le son voyage-t-il?']),
    slides: [
      S(svg(pa('M110 170V240Q110 262 200 262T290 240V170', '#e8553d') + el(200, 170, 90, 22, '#f7e3c4') + ln(310, 70, 235, 152, '#8b5a2b', 9) + sound(300, 190, 1, '#2f7fc1') + sound(100, 190, -1, '#2f7fc1')), [
        '东西一震动，就会发出声音。', 'dōng xi yí zhèn dòng jiù huì fā chū shēng yīn', 'Quand un objet vibre, il fait du bruit.']),
      S(svg([50, 100, 108, 116, 170, 225, 233, 241, 295, 350, 358].map((x) => [100, 130, 160, 190, 220].map((y) => ci(x, y, 5, '#2f7fc1', 0)).join('')).join('') + ar(40, 262, 360, 262, '#e8553d', 6)), [
        '震动会推着空气，一层一层传开。', 'zhèn dòng huì tuī zhe kōng qì yì céng yì céng chuán kāi', 'La vibration pousse l’air et se propage couche après couche.']),
      S(svg(rc(25, 110, 54, 80, O, 8) + ci(52, 150, 18, '#8d93a8') + sound(92, 150, 1) + sound(190, 150, 1, '#2f7fc1') + face(330, 150, 38) + el(298, 154, 9, 14, '#ffcba0') + sound(255, 150, 1, '#2f7fc1')), [
        '空气传到耳朵里，我们就听到了。', 'kōng qì chuán dào ěr duo lǐ wǒ men jiù tīng dào le', 'L’air arrive jusqu’à l’oreille : on entend!']),
    ],
    fact: T(['太空里没有空气，所以声音传不开。', 'tài kōng lǐ méi yǒu kōng qì suǒ yǐ shēng yīn chuán bù kāi', 'Dans l’espace, il n’y a pas d’air : le son ne voyage pas.']),
    quiz: [
      Q(['声音是怎么来的？', 'shēng yīn shì zěn me lái de', 'D’où vient le son?'], [['东西震动', 'dōng xi zhèn dòng', 'D’un objet qui vibre', '🥁'], ['东西变红', 'dōng xi biàn hóng', 'D’un objet qui rougit', '🟥'], ['东西变冷', 'dōng xi biàn lěng', 'D’un objet qui refroidit', '🥶']], 0),
      Q(['声音要靠什么传到我们耳朵？', 'shēng yīn yào kào shén me chuán dào wǒ men ěr duo', 'Qu’est-ce qui transporte le son jusqu’à nos oreilles?'], [['空气', 'kōng qì', 'L’air', '💨'], ['光', 'guāng', 'La lumière', '💡'], ['影子', 'yǐng zi', 'L’ombre', '👤']], 0),
    ],
  },
  // ───────── 20 ─────────
  {
    id: 'science-boussole', cat: 'science', emoji: '🧭', level: 2,
    q: T(['指南针为什么指北？', 'zhǐ nán zhēn wèi shén me zhǐ běi', 'Pourquoi la boussole indique-t-elle le nord?']),
    slides: [
      S(svg(pa('M200 40C80 40 40 260 200 260', 'none', 3, '#9aa3c0', '7 6') + pa('M200 40C320 40 360 260 200 260', 'none', 3, '#9aa3c0', '7 6') + ci(200, 150, 90, '#8ecbf0') + pa('M170 100Q190 90 205 110Q200 140 175 135Z', '#7bc47f', 2) + pa('M215 170Q245 160 250 190Q235 215 215 200Z', '#7bc47f', 2) + rc(186, 40, 28, 110, '#e8553d', 0) + rc(186, 150, 28, 110, '#4a90e2', 0)), [
        '地球像一块很大很大的磁铁。', 'dì qiú xiàng yí kuài hěn dà hěn dà de cí tiě', 'La Terre ressemble à un très grand aimant.']),
      S(svg(ci(200, 150, 100, '#fff', 6) + ci(200, 150, 80, '#f1f6fa', 2) + ln(200, 58, 200, 72) + ln(200, 228, 200, 242) + ln(108, 150, 122, 150) + ln(278, 150, 292, 150) + pa('M200 75L184 150H216Z', '#e8553d') + pa('M200 225L184 150H216Z', '#fff') + ci(200, 150, 6, O)), [
        '指南针里的小针，也是一块小磁铁。', 'zhǐ nán zhēn lǐ de xiǎo zhēn yě shì yí kuài xiǎo cí tiě', 'L’aiguille de la boussole est un petit aimant aussi.']),
      S(svg(ci(200, 60, 48, '#8ecbf0') + el(200, 24, 24, 9, '#fff') + ci(200, 215, 70, '#fff', 6) + ci(200, 215, 55, '#f1f6fa', 2) + pa('M200 165L188 215H212Z', '#e8553d') + pa('M200 265L188 215H212Z', '#fff') + ci(200, 215, 5, O) + ar(200, 158, 200, 118, '#e8553d', 4)), [
        '小针被地球吸引，一头总是指向北方。', 'xiǎo zhēn bèi dì qiú xī yǐn yì tóu zǒng shì zhǐ xiàng běi fāng', 'L’aiguille est attirée par la Terre : un bout montre toujours le nord.']),
    ],
    fact: T(['在森林里迷路，指南针可以帮你找方向。', 'zài sēn lín lǐ mí lù zhǐ nán zhēn kě yǐ bāng nǐ zhǎo fāng xiàng', 'Si tu te perds en forêt, la boussole t’aide à trouver ton chemin.']),
    quiz: [
      Q(['指南针的小针一头指向哪里？', 'zhǐ nán zhēn de xiǎo zhēn yì tóu zhǐ xiàng nǎ lǐ', 'Où pointe un bout de l’aiguille de la boussole?'], [['北方', 'běi fāng', 'Vers le nord', '🧭'], ['月亮', 'yuè liang', 'Vers la lune', '🌙'], ['云', 'yún', 'Vers les nuages', '☁️']], 0),
      Q(['地球像什么？', 'dì qiú xiàng shén me', 'À quoi la Terre ressemble-t-elle (pour la boussole)?'], [['一块大磁铁', 'yí kuài dà cí tiě', 'À un grand aimant', '🧲'], ['一个大冰箱', 'yí gè dà bīng xiāng', 'À un grand frigo', '🧊'], ['一朵大云', 'yì duǒ dà yún', 'À un gros nuage', '☁️']], 0),
    ],
  },
  // ───────── 21 ─────────
  {
    id: 'science-patins', cat: 'science', emoji: '⛸️', level: 2,
    q: T(['溜冰鞋为什么能在冰上滑？', 'liū bīng xié wèi shén me néng zài bīng shàng huá', 'Pourquoi un patin glisse-t-il sur la glace?']),
    slides: [
      S(svg(rc(-5, 220, 410, 90, '#dff3fc', 0, 0) + pa('M110 60H170V135L250 160Q272 166 272 190V204H110Z', '#e8553d') + rc(100, 204, 190, 10, '#c9cedb', 3) + ln(130, 214, 130, 204) + ln(250, 214, 250, 204) + ln(310, 190, 380, 190, '#9aa3c0', 4) + ln(320, 170, 370, 170, '#9aa3c0', 4), '#eaf5fb'), [
        '冰面很光滑，滑起来不费力。', 'bīng miàn hěn guāng huá huá qǐ lái bú fèi lì', 'La glace est très lisse : on glisse sans effort.']),
      S(svg(rc(70, 100, 260, 40, '#c9cedb', 6) + rc(70, 140, 260, 10, '#8ecbf0', 0) + rc(70, 150, 260, 100, '#e9f8ff', 0) + ln(70, 150, 330, 150, O, 2) + ar(340, 60, 300, 143, '#e8553d', 4) + ci(110, 175, 4, '#fff', 0) + ci(220, 200, 4, '#fff', 0), '#f4fafd'), [
        '冰面上，有一层薄薄的水。', 'bīng miàn shàng yǒu yì céng báo báo de shuǐ', 'Sur la glace, il y a une toute mince couche d’eau.']),
      S(svg(rc(-5, 240, 410, 70, '#e9f8ff', 0, 0) + rc(40, 70, 120, 60, '#e8553d') + rc(94, 130, 12, 105, '#c9cedb', 3) + pa('M88 240L100 262L112 240Z', '#8ecbf0') + rc(240, 70, 120, 60, '#4a90e2') + rc(235, 130, 130, 105, '#c9cedb', 3) + ar(100, 25, 100, 62, '#e8553d', 5) + ar(300, 25, 300, 62, '#e8553d', 5), '#f4fafd'), [
        '冰刀很窄，压得很紧，滑得更快。', 'bīng dāo hěn zhǎi yā de hěn jǐn huá de gèng kuài', 'La lame est étroite et appuie fort : on glisse mieux.']),
    ],
    fact: T(['加拿大人很爱冰球，冬天常在冰上玩。', 'jiā ná dà rén hěn ài bīng qiú dōng tiān cháng zài bīng shàng wán', 'Les Canadiens adorent le hockey et jouent souvent sur la glace l’hiver.']),
    quiz: [
      Q(['冰刀有什么特点？', 'bīng dāo yǒu shén me tè diǎn', 'Comment est la lame d’un patin?'], [['很窄', 'hěn zhǎi', 'Très étroite', '⛸️'], ['很宽很平', 'hěn kuān hěn píng', 'Large et plate', '🟫'], ['很软', 'hěn ruǎn', 'Molle', '🧽']], 0),
      Q(['冰面上为什么容易滑？', 'bīng miàn shàng wèi shén me róng yì huá', 'Pourquoi la glace est-elle glissante?'], [['有一层薄薄的水', 'yǒu yì céng báo báo de shuǐ', 'Il y a une fine couche d’eau', '💧'], ['像沙子一样粗', 'xiàng shā zi yí yàng cū', 'Elle est rugueuse comme du sable', '🏖️'], ['粘着胶水', 'zhān zhe jiāo shuǐ', 'Elle est collante', '🍯']], 0),
    ],
  },
  // ───────── 22 ─────────
  {
    id: 'science-paille', cat: 'science', emoji: '🥤', level: 2,
    q: T(['吸管为什么能喝到水？', 'xī guǎn wèi shén me néng hē dào shuǐ', 'Pourquoi peut-on boire avec une paille?']),
    slides: [
      S(svg(gl(120, 100, 160, 170, 130) + rc(196, 40, 16, 200, '#ffd166', 4) + ci(204, 34, 20, '#ff8fa3') + [75, 110, 145, 180].map((y) => ci(204, y, 4, '#fff', 0)).join('') + ar(240, 140, 240, 60, '#e8553d', 5)), [
        '我们用嘴吸，管子里的空气变少了。', 'wǒ men yòng zuǐ xī guǎn zi lǐ de kōng qì biàn shǎo le', 'On aspire : il reste moins d’air dans la paille.']),
      S(svg(gl(120, 100, 160, 170, 130) + rc(196, 40, 16, 200, '#ffd166', 4) + [145, 170, 240, 265].map((x) => ar(x, 50, x, 132, '#2f7fc1', 5)).join('') + cloud(100, 50, 0.6) + cloud(255, 40, 0.6)), [
        '杯子外面的空气，一直压着水面。', 'bēi zi wài miàn de kōng qì yì zhí yā zhe shuǐ miàn', 'L’air autour du verre appuie sans arrêt sur l’eau.']),
      S(svg(gl(120, 100, 160, 170, 100) + rc(198, 70, 12, 185, '#8ecbf0', 0, 0) + rc(196, 40, 16, 215, 'none', 4) + ci(204, 34, 20, '#ff8fa3') + ar(250, 200, 250, 90, '#2f7fc1', 6)), [
        '水被压进管子里，一路上升到嘴里。', 'shuǐ bèi yā jìn guǎn zi lǐ yí lù shàng shēng dào zuǐ lǐ', 'L’eau est poussée dans la paille et monte jusqu’à la bouche.']),
    ],
    fact: T(['吸管上有个洞，就喝不到水了！', 'xī guǎn shàng yǒu gè dòng jiù hē bú dào shuǐ le', 'Si la paille a un trou, on n’arrive plus à boire!']),
    quiz: [
      Q(['用吸管喝水，是什么把水压上来？', 'yòng xī guǎn hē shuǐ shì shén me bǎ shuǐ yā shàng lái', 'Qu’est-ce qui pousse l’eau vers le haut de la paille?'], [['空气', 'kōng qì', 'L’air', '💨'], ['杯子', 'bēi zi', 'Le verre', '🥛'], ['勺子', 'sháo zi', 'La cuillère', '🥄']], 0),
      Q(['吸管破了个洞，会怎么样？', 'xī guǎn pò le gè dòng huì zěn me yàng', 'Que se passe-t-il si la paille a un trou?'], [['很难吸到水', 'hěn nán xī dào shuǐ', 'C’est difficile de boire', '😮‍💨'], ['水会更甜', 'shuǐ huì gèng tián', 'L’eau devient plus sucrée', '🍬'], ['水自己跳出来', 'shuǐ zì jǐ tiào chū lái', 'L’eau saute toute seule', '⛲']], 0),
    ],
  },
  // ───────── 23 ─────────
  {
    id: 'science-bulle-savon', cat: 'science', emoji: '🫧', level: 2,
    q: T(['为什么肥皂泡是彩色的？', 'wèi shén me féi zào pào shì cǎi sè de', 'Pourquoi les bulles de savon sont-elles colorées?']),
    slides: [
      S(svg(ci(120, 150, 80, '#ffffff88', 3) + pa('M80 110Q100 85 130 85', 'none', 4, '#fff') + pa('M185 130L245 110', 'none', 3, O, '6 5') + ci(310, 105, 62, '#fff', 3) + pa('M268 98H352', 'none', 2) + pa('M268 106H352', 'none', 2) + rc(268, 140, 84, 26, '#7a4e2d', 12), '#f3eefb'), [
        '肥皂泡的膜，比头发丝还薄。', 'féi zào pào de mó bǐ tóu fa sī hái báo', 'La paroi d’une bulle est plus mince qu’un cheveu.']),
      S(svg(sun(60, 50, 24) + rc(70, 170, 270, 18, '#dff3ff', 4) + ar(100, 80, 175, 168, '#f5c542', 4) + ar(175, 168, 265, 80, '#f5c542', 4) + ln(178, 188, 192, 200, '#f5c542', 3) + ln(192, 200, 205, 188, '#f5c542', 3) + ar(205, 170, 320, 100, '#e8553d', 4), '#f3eefb'), [
        '光照到膜上，前面和后面都会反射。', 'guāng zhào dào mó shàng qián miàn hé hòu miàn dōu huì fǎn shè', 'La lumière se reflète sur le devant et sur le derrière de la paroi.']),
      S(svg(ci(200, 150, 100, '#ffffff66', 3) + [['#e8553d', 92], ['#ffb02e', 86], ['#f5e642', 80], ['#7bc47f', 74], ['#4a90e2', 68], ['#9b6ad8', 62]].map(([c, r]) => { const a0 = 200 * Math.PI / 180, a1 = 265 * Math.PI / 180; return pa(`M${n(200 + r * Math.cos(a0))} ${n(150 + r * Math.sin(a0))}A${r} ${r} 0 0 1 ${n(200 + r * Math.cos(a1))} ${n(150 + r * Math.sin(a1))}`, 'none', 6, c); }).join(''), '#f3eefb'), [
        '膜厚薄不同，我们看到的颜色也不同。', 'mó hòu báo bù tóng wǒ men kàn dào de yán sè yě bù tóng', 'Selon l’épaisseur de la paroi, on voit des couleurs différentes.']),
    ],
    fact: T(['试一试：和大人用肥皂水，吹一吹泡泡吧！', 'shì yi shì hé dà rén yòng féi zào shuǐ chuī yi chuī pào pao ba', 'Essaie : fais des bulles avec de l’eau savonneuse et un adulte!']),
    quiz: [
      Q(['肥皂泡的膜怎么样？', 'féi zào pào de mó zěn me yàng', 'Comment est la paroi d’une bulle de savon?'], [['非常薄', 'fēi cháng báo', 'Très mince', '🫧'], ['很厚很硬', 'hěn hòu hěn yìng', 'Épaisse et dure', '🧱'], ['像石头', 'xiàng shí tou', 'Comme une pierre', '🪨']], 0),
      Q(['泡泡上的彩色，和什么有关？', 'pào pao shàng de cǎi sè hé shén me yǒu guān', 'De quoi dépendent les couleurs de la bulle?'], [['光和膜的厚薄', 'guāng hé mó de hòu báo', 'De la lumière et de l’épaisseur de la paroi', '🌈'], ['泡泡里装了颜料', 'pào pao lǐ zhuāng le yán liào', 'Il y a de la peinture dedans', '🎨'], ['泡泡在吃彩虹', 'pào pao zài chī cǎi hóng', 'La bulle mange l’arc-en-ciel', '😋']], 0),
    ],
  },
  // ───────── 24 ─────────
  {
    id: 'science-savon-mains', cat: 'science', emoji: '🧼', level: 2,
    q: T(['为什么用肥皂能把手洗干净？', 'wèi shén me yòng féi zào néng bǎ shǒu xǐ gān jìng', 'Pourquoi le savon nettoie-t-il les mains?']),
    slides: [
      S(svg([120, 160, 200, 240].map((x, i) => rc(x - 12, 50 + (i % 2) * 14, 24, 70, '#ffd9b3', 12)).join('') + rc(105, 100, 150, 150, '#ffd9b3', 30) + [[150, 160], [200, 190], [170, 215], [225, 150], [140, 120]].map(([x, y]) => ci(x, y, 9, '#c9a227', 0)).join('') + [[310, 60], [340, 100], [320, 150]].map(([x, y]) => pa(`M${x} ${y - 12}Q${x + 10} ${y + 2} ${x} ${y + 8}Q${x - 10} ${y + 2} ${x} ${y - 12}Z`, '#8ecbf0') + ar(x, y + 16, x, y + 50, '#8ecbf0', 3)).join('')), [
        '手上有油油的脏东西，只用水冲不掉。', 'shǒu shàng yǒu yóu yóu de zāng dōng xi zhǐ yòng shuǐ chōng bú diào', 'Les mains ont des saletés grasses : l’eau seule ne les enlève pas.']),
      S(svg(el(200, 150, 48, 36, '#f5c542') + [0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const t = a * Math.PI / 180; return ln(200 + 32 * Math.cos(t), 150 + 25 * Math.sin(t), 200 + 66 * Math.cos(t), 150 + 62 * Math.sin(t), '#c9a227', 4) + ci(200 + 74 * Math.cos(t), 150 + 70 * Math.sin(t), 8, '#4a90e2', 3); }).join(''), '#cfe8f9'), [
        '肥皂一头喜欢水，一头喜欢油。', 'féi zào yì tóu xǐ huan shuǐ yì tóu xǐ huan yóu', 'Le savon a un bout qui aime l’eau et un bout qui aime le gras.']),
      S(svg(rc(150, 14, 100, 20, '#c9cedb', 6) + rc(185, 34, 30, 30, '#c9cedb', 4) + ar(200, 70, 200, 110, '#2f7fc1', 5) + el(200, 160, 30, 22, '#f5c542') + [0, 60, 120, 180, 240, 300].map((a) => { const t = a * Math.PI / 180; return ci(200 + 46 * Math.cos(t), 160 + 36 * Math.sin(t), 6, '#4a90e2', 3); }).join('') + ar(200, 205, 200, 255, '#2f7fc1', 5) + rc(130, 268, 140, 14, '#8d93a8', 5), '#cfe8f9'), [
        '它抓住脏东西，水就能把它冲走。', 'tā zhuā zhù zāng dōng xi shuǐ jiù néng bǎ tā chōng zǒu', 'Il attrape la saleté, et l’eau l’emporte.']),
    ],
    fact: T(['洗手要搓够二十秒，大约唱两遍生日歌。', 'xǐ shǒu yào cuō gòu èr shí miǎo dà yuē chàng liǎng biàn shēng rì gē', 'Frotte tes mains vingt secondes : c’est deux fois « Bonne fête ».']),
    quiz: [
      Q(['肥皂能帮我们做什么？', 'féi zào néng bāng wǒ men zuò shén me', 'À quoi sert le savon?'], [['抓住脏东西，冲走', 'zhuā zhù zāng dōng xi chōng zǒu', 'À attraper la saleté pour l’emporter', '🧼'], ['把手变成蓝色', 'bǎ shǒu biàn chéng lán sè', 'À rendre les mains bleues', '🟦'], ['把水变成冰', 'bǎ shuǐ biàn chéng bīng', 'À geler l’eau', '🧊']], 0),
      Q(['洗手要搓多久？', 'xǐ shǒu yào cuō duō jiǔ', 'Combien de temps faut-il frotter?'], [['大约二十秒', 'dà yuē èr shí miǎo', 'Environ vingt secondes', '⏱️'], ['一秒钟', 'yì miǎo zhōng', 'Une seconde', '⚡'], ['一整天', 'yì zhěng tiān', 'Toute la journée', '📅']], 0),
    ],
  },
  // ───────── 25 ─────────
  {
    id: 'science-avion', cat: 'science', emoji: '✈️', level: 3,
    q: T(['飞机为什么会飞？', 'fēi jī wèi shén me huì fēi', 'Pourquoi un avion vole-t-il?']),
    slides: [
      S(svg('<g transform="rotate(-8 200 150)">' + pa('M90 150C110 125 230 115 310 148C250 158 150 160 90 150Z', '#c9cedb') + '</g>' + pa('M20 95C150 90 250 85 380 105', 'none', 4, '#4a90e2') + pa('M20 122C150 112 250 105 380 125', 'none', 4, '#4a90e2') + pa('M20 192C150 195 250 195 380 175', 'none', 4, '#4a90e2') + pa('M20 220C150 220 250 220 380 205', 'none', 4, '#4a90e2') + ar(300, 265, 100, 265, '#e8553d', 5)), [
        '飞机向前冲，空气从机翼下面流过。', 'fēi jī xiàng qián chōng kōng qì cóng jī yì xià miàn liú guò', 'L’avion avance : l’air passe autour et sous l’aile.']),
      S(svg('<g transform="rotate(-18 200 150)">' + pa('M90 150C110 125 230 115 310 148C250 158 150 160 90 150Z', '#c9cedb') + '</g>' + ar(320, 140, 350, 225, '#2f7fc1', 6) + ar(290, 165, 310, 250, '#2f7fc1', 6) + ar(200, 120, 200, 45, '#e8553d', 8)), [
        '机翼斜着，把空气向下推。', 'jī yì xié zhe bǎ kōng qì xiàng xià tuī', 'L’aile est inclinée : elle pousse l’air vers le bas.']),
      S(svg(cloud(60, 60, 0.7) + cloud(310, 50, 0.7) + plane(205, 170, 1) + ar(150, 215, 150, 130, '#e8553d', 8) + ar(240, 220, 240, 150, '#e8553d', 8), '#cfe9fb'), [
        '空气也向上推机翼，把飞机托起来。', 'kōng qì yě xiàng shàng tuī jī yì bǎ fēi jī tuō qǐ lái', 'L’air pousse aussi l’aile vers le haut et soulève l’avion.']),
      S(svg(cloud(50, 70, 0.7) + cloud(300, 60, 0.7) + plane(190, 150, 1) + ar(40, 260, 360, 260, '#7bc47f', 9) + ln(30, 130, 80, 130, '#fff', 4) + ln(10, 160, 60, 160, '#fff', 4), '#cfe9fb'), [
        '发动机让飞机一直向前，才不会掉下来。', 'fā dòng jī ràng fēi jī yì zhí xiàng qián cái bú huì diào xià lái', 'Le moteur la fait avancer sans cesse, sinon elle tomberait.']),
    ],
    fact: T(['鸟的翅膀也是这样，把空气向下推。', 'niǎo de chì bǎng yě shì zhè yàng bǎ kōng qì xiàng xià tuī', 'Les ailes d’oiseau font pareil : elles poussent l’air vers le bas.']),
    quiz: [
      Q(['飞机的什么部分，能把空气向下推？', 'fēi jī de shén me bù fen néng bǎ kōng qì xiàng xià tuī', 'Quelle partie de l’avion pousse l’air vers le bas?'], [['机翼', 'jī yì', 'Les ailes', '✈️'], ['轮子', 'lún zi', 'Les roues', '🛞'], ['窗户', 'chuāng hu', 'Les fenêtres', '🪟'], ['椅子', 'yǐ zi', 'Les sièges', '💺']], 0),
      Q(['飞机停在地上不动，能飞起来吗？', 'fēi jī tíng zài dì shàng bú dòng néng fēi qǐ lái ma', 'Un avion immobile au sol peut-il décoller?'], [['不能，要先向前冲', 'bù néng yào xiān xiàng qián chōng', 'Non : il doit d’abord foncer vers l’avant', '🛫'], ['能，机翼会自己扇动', 'néng jī yì huì zì jǐ shān dòng', 'Oui, ses ailes battent seules', '🦅'], ['能，只要关上窗户', 'néng zhǐ yào guān shàng chuāng hu', 'Oui, il suffit de fermer les fenêtres', '🪟'], ['能，只要唱歌', 'néng zhǐ yào chàng gē', 'Oui, il suffit de chanter', '🎤']], 0),
    ],
  },
  // ───────── 26 ─────────
  {
    id: 'science-velo', cat: 'science', emoji: '🚲', level: 3,
    q: T(['自行车骑起来为什么不倒？', 'zì xíng chē qí qǐ lái wèi shén me bú dǎo', 'Pourquoi le vélo ne tombe-t-il pas quand on roule?']),
    slides: [
      S(svg(ground(240) + '<g transform="rotate(-22 200 234)">' + ci(140, 200, 34, '#fff') + ci(260, 200, 34, '#fff') + pa('M140 200L185 155L240 155L260 200M185 155L195 200H140', 'none', 4) + ln(240, 155, 250, 130, O, 4) + ln(238, 130, 262, 130, O, 4) + ln(172, 148, 196, 148, O, 5) + '</g>' + ar(300, 110, 340, 190, '#e8553d', 6)), [
        '车子不动，很容易倒下去。', 'chē zi bú dòng hěn róng yì dǎo xià qù', 'Un vélo immobile tombe facilement.']),
      S(svg(ground(240) + ci(140, 200, 34, '#fff') + ci(260, 200, 34, '#fff') + pa('M140 200L185 155L240 155L260 200M185 155L195 200H140', 'none', 4) + ln(240, 155, 250, 130, O, 4) + ln(238, 130, 262, 130, O, 4) + ln(172, 148, 196, 148, O, 5) + ln(105, 170, 20, 170, '#9aa3c0', 5) + ln(110, 195, 40, 195, '#9aa3c0', 5) + ln(100, 220, 30, 220, '#9aa3c0', 5) + ar(300, 90, 380, 90, '#7bc47f', 8)), [
        '车子跑得越快，越容易站稳。', 'chē zi pǎo de yuè kuài yuè róng yì zhàn wěn', 'Plus le vélo va vite, plus il tient facilement debout.']),
      S(svg(ground(250) + '<g transform="rotate(-14 200 250)">' + el(200, 190, 12, 55, '#fff') + ln(200, 135, 200, 100, O, 4) + ln(160, 98, 240, 98, O, 5) + '</g>' + el(330, 190, 24, 55, '#fff') + '<g transform="rotate(0 330 250)">' + ln(330, 135, 330, 100, O, 4) + ln(290, 104, 370, 92, O, 5) + '</g>' + ar(110, 90, 80, 130, '#e8553d', 5) + ar(320, 60, 280, 60, '#e8553d', 6)), [
        '车子歪了，把车把转向歪的那边。', 'chē zi wāi le bǎ chē bǎ zhuǎn xiàng wāi de nà biān', 'Si le vélo penche, tourne le guidon du côté où il penche.']),
      S(svg(ground(250) + el(200, 190, 12, 55, '#fff') + ln(200, 135, 200, 100, O, 4) + ln(160, 98, 240, 98, O, 5) + check(300, 120) + ln(60, 110, 110, 110, '#9aa3c0', 4) + ln(50, 150, 105, 150, '#9aa3c0', 4) + ln(300, 190, 360, 190, '#9aa3c0', 4)), [
        '这样车子就会一直站稳。', 'zhè yàng chē zi jiù huì yì zhí zhàn wěn', 'Comme ça, le vélo reste droit.']),
    ],
    fact: T(['骑车时，你的小动作也在帮车子站稳。', 'qí chē shí nǐ de xiǎo dòng zuò yě zài bāng chē zi zhàn wěn', 'Quand tu roules, tes petits mouvements aident le vélo à rester droit.']),
    quiz: [
      Q(['自行车怎样更容易站稳？', 'zì xíng chē zěn yàng gèng róng yì zhàn wěn', 'Comment le vélo tient-il mieux debout?'], [['向前跑得快一些', 'xiàng qián pǎo de kuài yì xiē', 'En roulant un peu plus vite', '💨'], ['停在原地不动', 'tíng zài yuán dì bú dòng', 'En restant immobile', '🛑'], ['把车轮拿掉', 'bǎ chē lún ná diào', 'En enlevant les roues', '🛞'], ['车把绑起来', 'chē bǎ bǎng qǐ lái', 'En attachant le guidon', '🪢']], 0),
      Q(['车子歪了，要把车把怎么办？', 'chē zi wāi le yào bǎ chē bǎ zěn me bàn', 'Si le vélo penche, que faire du guidon?'], [['转向歪的那边', 'zhuǎn xiàng wāi de nà biān', 'Le tourner du côté qui penche', '↪️'], ['转向相反的那边', 'zhuǎn xiàng xiāng fǎn de nà biān', 'Le tourner du côté opposé', '↩️'], ['松开双手', 'sōng kāi shuāng shǒu', 'Lâcher les deux mains', '🙌'], ['闭上眼睛', 'bì shàng yǎn jing', 'Fermer les yeux', '🙈']], 0),
    ],
  },
  // ───────── 27 ─────────
  {
    id: 'science-fusee', cat: 'science', emoji: '🚀', level: 3,
    q: T(['火箭为什么能飞上天？', 'huǒ jiàn wèi shén me néng fēi shàng tiān', 'Pourquoi une fusée monte-t-elle dans le ciel?']),
    slides: [
      S(svg(rocket(200, 110, 1) + flame(200, 170, 1) + ar(180, 215, 165, 280, '#ffb02e', 5) + ar(200, 230, 200, 290, '#ffb02e', 5) + ar(220, 215, 235, 280, '#ffb02e', 5), '#dbeefa'), [
        '火箭向下喷出很多热气。', 'huǒ jiàn xiàng xià pēn chū hěn duō rè qì', 'La fusée projette beaucoup de gaz chaud vers le bas.']),
      S(svg(rocket(200, 110, 1) + flame(200, 170, 1) + ar(70, 250, 70, 90, '#7bc47f', 10) + ar(300, 190, 300, 270, '#ffb02e', 8), '#dbeefa'), [
        '气向下冲，火箭就被推向上。', 'qì xiàng xià chōng huǒ jiàn jiù bèi tuī xiàng shàng', 'Le gaz file vers le bas, donc la fusée est poussée vers le haut.']),
      S(svg(ci(230, 120, 42, '#e8553d') + pa('M230 162L224 176H236Z', '#e8553d') + pa('M180 150Q150 190 120 190', 'none', 4, '#9aa3c0') + pa('M180 165Q165 215 130 225', 'none', 4, '#9aa3c0') + ar(250, 80, 330, 40, '#e8553d', 4) + pa('M80 260Q120 210 160 240T240 220', 'none', 3, '#9aa3c0', '7 6'), '#eef6fb'), [
        '气球放气会乱飞，是一样的道理。', 'qì qiú fàng qì huì luàn fēi shì yí yàng de dào lǐ', 'Un ballon qui se dégonfle part dans tous les sens : même idée.']),
      S(svg([[40, 40], [110, 90], [330, 50], [290, 140], [60, 200], [350, 230], [230, 30], [150, 250]].map(([x, y]) => ci(x, y, 3, '#fff', 0)).join('') + rocket(200, 110, 1) + flame(200, 170, 1) + ar(200, 250, 200, 292, '#ffb02e', 6), '#232846'), [
        '太空里没有空气，火箭照样能飞。', 'tài kōng lǐ méi yǒu kōng qì huǒ jiàn zhào yàng néng fēi', 'Dans l’espace, sans air, la fusée vole quand même.']),
    ],
    fact: T(['试一试：吹一个气球，不扎口，放手看它飞！', 'shì yi shì chuī yí gè qì qiú bù zā kǒu fàng shǒu kàn tā fēi', 'Essaie : gonfle un ballon sans le nouer, lâche-le et regarde-le filer!']),
    quiz: [
      Q(['火箭靠什么往上飞？', 'huǒ jiàn kào shén me wǎng shàng fēi', 'Qu’est-ce qui fait monter la fusée?'], [['向下喷出的气', 'xiàng xià pēn chū de qì', 'Le gaz projeté vers le bas', '🔥'], ['大翅膀', 'dà chì bǎng', 'De grandes ailes', '🦅'], ['风筝线', 'fēng zheng xiàn', 'Une corde de cerf-volant', '🪁'], ['轮子', 'lún zi', 'Des roues', '🛞']], 0),
      Q(['放开没扎口的气球，会怎么样？', 'fàng kāi méi zā kǒu de qì qiú huì zěn me yàng', 'Que fait un ballon gonflé non noué quand on le lâche?'], [['乱飞', 'luàn fēi', 'Il file dans tous les sens', '🎈'], ['一动不动', 'yí dòng bú dòng', 'Il reste immobile', '🛑'], ['变成小鸟', 'biàn chéng xiǎo niǎo', 'Il devient un oiseau', '🐦'], ['变成冰块', 'biàn chéng bīng kuài', 'Il devient un glaçon', '🧊']], 0),
    ],
  },
  // ───────── 28 ─────────
  {
    id: 'science-solaire', cat: 'science', emoji: '☀️', level: 3,
    q: T(['太阳能板为什么能发电？', 'tài yáng néng bǎn wèi shén me néng fā diàn', 'Pourquoi un panneau solaire fait-il de l’électricité?']),
    slides: [
      S(svg(sun(70, 60, 30) + ar(110, 95, 170, 165, '#f5c542', 5) + ar(130, 70, 220, 160, '#f5c542', 5) + ar(150, 50, 280, 155, '#f5c542', 5) + panel(110, 190, 200, 70), '#dbeefa'), [
        '太阳光里藏着很多能量。', 'tài yáng guāng lǐ cáng zhe hěn duō néng liàng', 'La lumière du soleil cache beaucoup d’énergie.']),
      S(svg(panel(80, 60, 240, 150, '#3a6fb0') + ln(130, 60, 100, 210, '#fff', 2) + ln(200, 60, 170, 210, '#fff', 2) + ln(270, 60, 240, 210, '#fff', 2) + ln(100, 110, 350, 110, '#fff', 2) + ln(90, 160, 330, 160, '#fff', 2) + ln(150, 210, 150, 270, O, 6) + ln(250, 210, 250, 270, O, 6), '#dbeefa'), [
        '太阳能板，是用特别的材料做的。', 'tài yáng néng bǎn shì yòng tè bié de cái liào zuò de', 'Le panneau solaire est fait d’un matériau spécial.']),
      S(svg(sun(330, 50, 24) + ar(300, 75, 250, 150, '#f5c542', 5) + panel(70, 130, 170, 70) + pa('M230 190H370', 'none', 5) + [[260, 190], [300, 190], [340, 190]].map(([x, y]) => ci(x, y, 7, '#ffd166', 2)).join('') + ar(250, 240, 360, 240, '#f5a623', 6), '#dbeefa'), [
        '光照上去，就能让电跑起来。', 'guāng zhào shàng qù jiù néng ràng diàn pǎo qǐ lái', 'Quand la lumière l’éclaire, l’électricité se met en marche.']),
      S(svg(panel(20, 190, 130, 60) + pa('M110 190V160H245V120M245 160H300V180', 'none', 5) + bulb(245, 80, true) + rc(290, 175, 56, 100, O, 10) + rc(298, 190, 40, 66, '#8ecbf0', 4, 0) + pa('M318 205L308 228H317L312 247L328 222H318Z', '#ffd166', 2), '#f4fafd'), [
        '电可以点亮灯，也能给手机充电。', 'diàn kě yǐ diǎn liàng dēng yě néng gěi shǒu jī chōng diàn', 'L’électricité allume une lampe et recharge un téléphone.']),
    ],
    fact: T(['阴天的时候，太阳能板也有一点电。', 'yīn tiān de shí hou tài yáng néng bǎn yě yǒu yì diǎn diàn', 'Même par temps nuageux, le panneau fait un peu d’électricité.']),
    quiz: [
      Q(['太阳能板需要什么才能发电？', 'tài yáng néng bǎn xū yào shén me cái néng fā diàn', 'De quoi un panneau solaire a-t-il besoin?'], [['阳光', 'yáng guāng', 'De lumière du soleil', '☀️'], ['冰块', 'bīng kuài', 'De glaçons', '🧊'], ['糖水', 'táng shuǐ', 'D’eau sucrée', '🍯'], ['沙子', 'shā zi', 'De sable', '🏖️']], 0),
      Q(['太阳能板发的电，能做什么？', 'tài yáng néng bǎn fā de diàn néng zuò shén me', 'À quoi sert l’électricité du panneau solaire?'], [['点亮灯', 'diǎn liàng dēng', 'À allumer une lampe', '💡'], ['让石头说话', 'ràng shí tou shuō huà', 'À faire parler les pierres', '🗣️'], ['把雪变成糖', 'bǎ xuě biàn chéng táng', 'À changer la neige en sucre', '🍬'], ['让月亮变大', 'ràng yuè liang biàn dà', 'À agrandir la lune', '🌕']], 0),
    ],
  },
  // ───────── 29 ─────────
  {
    id: 'science-bascule', cat: 'science', emoji: '⚖️', level: 3,
    q: T(['跷跷板为什么能撬起重的人？', 'qiāo qiāo bǎn wèi shén me néng qiào qǐ zhòng de rén', 'Pourquoi une balançoire à bascule peut-elle soulever une personne lourde?']),
    slides: [
      S(svg(ground(245) + pa('M200 166L170 245H230Z', '#ffd166') + rc(40, 150, 320, 16, '#d9a066', 4) + person(75, 96, 1, '#6aa7e8') + person(325, 96, 1, '#e8553d') + ellipseDash(200, 168, 34, 22)), [
        '跷跷板中间有一个支点。', 'qiāo qiāo bǎn zhōng jiān yǒu yí gè zhī diǎn', 'Au milieu de la bascule, il y a un pivot.']),
      S(svg(ground(245) + pa('M200 166L170 245H230Z', '#ffd166') + rc(40, 150, 320, 16, '#d9a066', 4) + person(75, 96, 1, '#6aa7e8') + person(325, 96, 1, '#6aa7e8') + ln(180, 60, 220, 60, O, 5) + ln(180, 74, 220, 74, O, 5)), [
        '两边一样重，就会平平的。', 'liǎng biān yí yàng zhòng jiù huì píng píng de', 'Si les deux côtés pèsent pareil, la bascule reste à plat.']),
      S(svg(ground(245) + pa('M200 166L170 245H230Z', '#ffd166') + rc(40, 150, 320, 16, '#d9a066', 4) + person(160, 74, 1.3, '#e8553d') + person(335, 105, 0.8, '#6aa7e8')), [
        '重的人坐近中间，轻的人坐远一点，也能平。', 'zhòng de rén zuò jìn zhōng jiān qīng de rén zuò yuǎn yì diǎn yě néng píng', 'Le lourd s’assoit près du centre, le léger plus loin : ça s’équilibre.']),
      S(svg(ground(245) + pa('M200 166L170 245H230Z', '#ffd166') + '<g transform="rotate(8 200 158)">' + rc(40, 150, 320, 16, '#d9a066', 4) + person(160, 74, 1.3, '#e8553d') + person(335, 105, 0.8, '#6aa7e8') + '</g>' + ar(335, 30, 335, 100, '#e8553d', 6)), [
        '离支点越远，用的力气越小。', 'lí zhī diǎn yuè yuǎn yòng de lì qi yuè xiǎo', 'Plus on est loin du pivot, moins il faut de force.']),
    ],
    fact: T(['撬棍、剪刀、开瓶器，都是这样的小帮手。', 'qiào gùn jiǎn dāo kāi píng qì dōu shì zhè yàng de xiǎo bāng shou', 'Le levier, les ciseaux, l’ouvre-bouteille : tous des petits aides de ce genre.']),
    quiz: [
      Q(['重的人和轻的人玩跷跷板，怎么坐才平？', 'zhòng de rén hé qīng de rén wán qiāo qiāo bǎn zěn me zuò cái píng', 'Un lourd et un léger sur la bascule : comment s’asseoir pour l’équilibre?'], [['重的坐近中间，轻的坐远些', 'zhòng de zuò jìn zhōng jiān qīng de zuò yuǎn xiē', 'Le lourd près du centre, le léger loin', '⚖️'], ['重的坐最远', 'zhòng de zuò zuì yuǎn', 'Le lourd tout au bout', '⬇️'], ['两个人都站着', 'liǎng gè rén dōu zhàn zhe', 'Les deux restent debout', '🧍'], ['轻的坐在支点上', 'qīng de zuò zài zhī diǎn shàng', 'Le léger sur le pivot', '📍']], 0),
      Q(['支点在哪里？', 'zhī diǎn zài nǎ lǐ', 'Où se trouve le pivot?'], [['跷跷板中间', 'qiāo qiāo bǎn zhōng jiān', 'Au milieu de la bascule', '📍'], ['最左边', 'zuì zuǒ biān', 'Tout à gauche', '⬅️'], ['在天上', 'zài tiān shàng', 'Dans le ciel', '☁️'], ['在云里', 'zài yún lǐ', 'Dans les nuages', '🌥️']], 0),
    ],
  },
  // ───────── 30 ─────────
  {
    id: 'science-telephone', cat: 'science', emoji: '📞', level: 3,
    q: T(['电话为什么能把声音传到很远的地方？', 'diàn huà wèi shén me néng bǎ shēng yīn chuán dào hěn yuǎn de dì fang', 'Pourquoi le téléphone envoie-t-il la voix si loin?']),
    slides: [
      S(svg(face(70, 140, 34) + sound(112, 140, 1) + rc(190, 70, 56, 100, O, 10) + rc(198, 82, 40, 62, '#8ecbf0', 4, 0) + pa('M246 120L270 150', 'none', 3, O, '6 5') + ci(315, 160, 62, '#fff', 3) + pa('M275 160q10 -34 20 0t20 0t20 0t20 0', 'none', 5, '#e8553d'), '#f4fafd'), [
        '你说话时，声音让小膜片震动。', 'nǐ shuō huà shí shēng yīn ràng xiǎo mó piàn zhèn dòng', 'Quand tu parles, ta voix fait vibrer une petite membrane.']),
      S(svg(pa('M25 150q10 -26 20 0t20 0t20 0', 'none', 5, '#e8553d') + ar(100, 150, 140, 150, '#3a3f55', 5) + rc(150, 105, 90, 90, '#c9cedb', 12) + ci(195, 150, 22, '#8d93a8') + ci(195, 150, 6, '#fff', 2) + ar(250, 150, 290, 150, '#3a3f55', 5) + pa('M300 150l10 -34l12 68l12 -68l12 68l12 -68l10 34', 'none', 5, '#f5a623'), '#f4fafd'), [
        '机器把震动变成电的小信号。', 'jī qì bǎ zhèn dòng biàn chéng diàn de xiǎo xìn hào', 'Une machine transforme la vibration en petits signaux électriques.']),
      S(svg(mountain(-40, 300, 220, 80, '#bfe3a8') + mountain(220, 300, 220, 100, '#bfe3a8') + rc(22, 180, 44, 80, O, 10) + rc(29, 192, 30, 46, '#8ecbf0', 3, 0) + pa('M200 70L172 250H228Z', 'none', 4) + ln(180, 170, 220, 170, O, 3) + ci(200, 66, 8, '#e8553d') + pa('M178 52Q200 28 222 52', 'none', 4, '#e8553d') + rc(334, 180, 44, 80, O, 10) + rc(341, 192, 30, 46, '#8ecbf0', 3, 0) + pa('M72 190Q130 80 196 80', 'none', 4, '#f5a623', '8 6') + pa('M204 80Q270 80 336 190', 'none', 4, '#f5a623', '8 6'), '#eef6fb'), [
        '信号沿着线，或者在空中，跑去远方。', 'xìn hào yán zhe xiàn huò zhě zài kōng zhōng pǎo qù yuǎn fāng', 'Le signal court le long d’un fil ou dans l’air, vers un endroit lointain.']),
      S(svg(pa('M20 150l10 -34l12 68l12 -68l12 68l12 -68l10 34', 'none', 5, '#f5a623') + rc(120, 100, 56, 100, O, 10) + rc(128, 112, 40, 62, '#8ecbf0', 4, 0) + sound(190, 150, 1) + face(310, 150, 36) + el(278, 154, 9, 14, '#ffcba0') + ln(177, 160, 178, 160, O, 1), '#f4fafd'), [
        '那边的机器，再把信号变回声音。', 'nà biān de jī qì zài bǎ xìn hào biàn huí shēng yīn', 'De l’autre côté, une machine retransforme le signal en voix.']),
    ],
    fact: T(['试一试：用两个纸杯和一根线，做个线电话！', 'shì yi shì yòng liǎng gè zhǐ bēi hé yì gēn xiàn zuò gè xiàn diàn huà', 'Essaie : avec deux verres en carton et une ficelle, fabrique un téléphone à ficelle!']),
    quiz: [
      Q(['电话把声音变成了什么？', 'diàn huà bǎ shēng yīn biàn chéng le shén me', 'En quoi le téléphone transforme-t-il la voix?'], [['电信号', 'diàn xìn hào', 'En signaux électriques', '⚡'], ['小石头', 'xiǎo shí tou', 'En petits cailloux', '🪨'], ['冰块', 'bīng kuài', 'En glaçons', '🧊'], ['彩带', 'cǎi dài', 'En rubans', '🎀']], 0),
      Q(['谁把信号变回声音？', 'shéi bǎ xìn hào biàn huí shēng yīn', 'Qui retransforme le signal en voix?'], [['那边的机器', 'nà biān de jī qì', 'La machine de l’autre côté', '📱'], ['天上的云', 'tiān shàng de yún', 'Les nuages', '☁️'], ['路边的树', 'lù biān de shù', 'Les arbres du chemin', '🌳'], ['地上的草', 'dì shàng de cǎo', 'L’herbe', '🌱']], 0),
    ],
  },
];
