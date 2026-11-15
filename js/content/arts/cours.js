// Arts plastiques — « Mon cours d’arts » : 20 ordered teacher lessons on the basics (PFEQ arts plastiques, 1er cycle)
// and one hands-on project per lesson (schema docs/ARTS.md, ids `cours-…`, cat 'cours').
// Lesson: { id, icon, title, goal, vocab[{word,def}], teach[{svg,text}], game{type,…}, project, retour[] }.
// Game types (played by js/arts-cours.js): sort, quiz, mix, pattern, symmetry, spot.
// Check: node tools/check-cours.mjs
const INK = '#3a3f55', NEW = '#ff5d8f';
const RED = '#e63946', YEL = '#ffd23f', BLU = '#2f6fdc', ORA = '#ff8c1a', GRN = '#3aa655', VIO = '#8e44ad', PNK = '#ff9ec4', BRN = '#9a6233';
const SKIN = '#f6c9a0', SKY = '#cfe8ff', GRS = '#8fd16a', GRY = '#9aa0a6', LBL = '#9cc7f5', DBL = '#1d3f7a', BLK = '#2b2b2b', WHT = '#ffffff', CRM = '#fff6dc';
const T = (fr, en) => ({ fr, en });
const r1 = (v) => Math.round(v * 10) / 10;
const pt = (...a) => a.map(r1).join(' ');
const S = (b) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${b}</svg>`;
const I = (b) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${b}</svg>`;
const ln = (d, c = INK, w = 6) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const dl = (d, c = INK, w = 4) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-dasharray="10 8" stroke-linecap="round"/>`;
const sh = (d, f, s = INK, w = 5) => `<path d="${d}" fill="${f}" stroke="${s}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
const ci = (x, y, r, f = 'none', s = INK, w = 5) => `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${f}" stroke="${s}" stroke-width="${w}"/>`;
const ov = (x, y, rx, ry, f = 'none', s = INK, w = 5) => `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${f}" stroke="${s}" stroke-width="${w}"/>`;
const re = (x, y, w, h, f = 'none', s = INK, sw = 5, rx = 4) => `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${f}" stroke="${s}" stroke-width="${sw}"/>`;
const po = (pts, f = 'none', s = INK, w = 5) => `<polygon points="${pts}" fill="${f}" stroke="${s}" stroke-width="${w}" stroke-linejoin="round"/>`;
const g = (t, b) => `<g transform="${t}">${b}</g>`;
const bg = (c) => `<rect width="400" height="300" fill="${c}"/>`;
// curved arrow (quadratic) in the "new / motion" colour
const arr = (x1, y1, cx, cy, x2, y2, c = NEW) => {
  const a = Math.atan2(y2 - cy, x2 - cx), p = (d) => `${r1(x2 - 16 * Math.cos(a + d))} ${r1(y2 - 16 * Math.sin(a + d))}`;
  return ln(`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`, c, 6) + ln(`M${p(0.5)}L${x2} ${y2}L${p(-0.5)}`, c, 6);
};
const wave = (y, amp = 14, step = 25, x0 = 0, x1 = 400) => { let d = `M${x0} ${y}`; for (let x = x0; x < x1; x += step * 2) d += `Q${x + step / 2} ${y - amp} ${x + step} ${y}T${x + 2 * step} ${y}`; return d; };
const zig = (y, h = 30, step = 20, x0 = 0, x1 = 400) => { let d = `M${x0} ${y}`, up = true; for (let x = x0 + step; x <= x1; x += step, up = !up) d += `L${x} ${up ? y - h : y}`; return d; };
const SPI = 'M50 50a5 5 0 0 1 10 0a10 10 0 0 1 -20 0a15 15 0 0 1 30 0a20 20 0 0 1 -40 0a25 25 0 0 1 50 0';
// objects
const pot = (x, y, c) => re(x - 26, y, 52, 50, '#eef1f6', INK, 4, 8) + re(x - 21, y + 14, 42, 24, c, 'none', 0, 4) + ov(x, y + 2, 26, 8, c, INK, 4);
const plus = (x, y) => ln(`M${x - 14} ${y}h28M${x} ${y - 14}v28`, INK, 7);
const eq = (x, y) => ln(`M${x - 14} ${y - 7}h28M${x - 14} ${y + 7}h28`, INK, 7);
const splat = (x, y, r, c) => ci(x, y, r, c, INK, 4) + ci(x + r * 0.95, y - r * 0.7, r * 0.22, c, INK, 3) + ci(x - r * 1.05, y + r * 0.45, r * 0.18, c, INK, 3) + ci(x + r * 0.55, y + r * 1.05, r * 0.15, c, INK, 3);
const splatI = (c) => I(splat(48, 52, 28, c));
const mixPic = (a, b, res) => S(pot(70, 120, a) + plus(135, 145) + pot(200, 120, b) + eq(262, 145) + splat(330, 145, 38, res));
const brush = (x, y, rot, c) => g(`translate(${x} ${y}) rotate(${rot})`, re(-6, 0, 12, 76, '#d9a066', INK, 4, 6) + re(-8, -14, 16, 16, GRY, INK, 4, 2) + sh('M-8 -14Q0 -46 8 -14Z', c, INK, 4));
const crayon = (x, y, rot, c) => g(`translate(${x} ${y}) rotate(${rot})`, re(-9, -84, 18, 64, c, INK, 4, 3) + po('-9,-20 9,-20 0,0', '#f2d0a0', INK, 4) + po('-3,-7 3,-7 0,0', c, 'none', 0));
const scissors = (x, y, rot = 0) => g(`translate(${x} ${y}) rotate(${rot})`, ln('M-10 10L16 -40M10 10L-16 -40', GRY, 7) + ci(-14, 22, 11, WHT, RED, 6) + ci(14, 22, 11, WHT, RED, 6));
const glue = (x, y) => re(x - 15, y, 30, 62, WHT, INK, 4, 6) + re(x - 15, y - 20, 30, 22, '#7cc4ff', INK, 4, 4);
const paper = (x, y, w, h, f = WHT) => re(x, y, w, h, f, INK, 4, 3);
const tree = (x, y, s = 1, c = GRN) => re(x - 7 * s, y - 34 * s, 14 * s, 34 * s, BRN, INK, 4, 2) + ci(x, y - 52 * s, 28 * s, c, INK, 4);
const fir = (x, y, s = 1, c = GRN) => re(x - 5 * s, y - 14 * s, 10 * s, 14 * s, BRN, INK, 3, 1) + po(pt(x, y - 80 * s, x + 26 * s, y - 14 * s, x - 26 * s, y - 14 * s), c, INK, 4);
const house = (x, y, s = 1, c = '#ffb36b') => re(x - 30 * s, y - 50 * s, 60 * s, 50 * s, c, INK, 4, 2) + po(pt(x - 38 * s, y - 50 * s, x + 38 * s, y - 50 * s, x, y - 88 * s), RED, INK, 4) + re(x - 8 * s, y - 24 * s, 16 * s, 24 * s, BRN, INK, 3, 2);
const sun = (x, y, r = 26) => ln(Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `M${r1(x + Math.cos(a) * (r + 8))} ${r1(y + Math.sin(a) * (r + 8))}L${r1(x + Math.cos(a) * (r + 20))} ${r1(y + Math.sin(a) * (r + 20))}`; }).join(''), ORA, 5) + ci(x, y, r, YEL, ORA, 4);
const cloud = (x, y) => sh(`M${x - 34} ${y + 14}a16 16 0 0 1 6 -28a22 22 0 0 1 40 -6a18 18 0 0 1 26 22a12 12 0 0 1 -4 12Z`, WHT, GRY, 3);
const flower = (x, y, s = 1, c = PNK) => ln(`M${x} ${y}V${r1(y - 50 * s)}`, GRN, 5) + [0, 1, 2, 3, 4].map((i) => ci(x + Math.cos(i * 1.2566) * 12 * s, y - 50 * s + Math.sin(i * 1.2566) * 12 * s, 9 * s, c, INK, 3)).join('') + ci(x, y - 50 * s, 7 * s, YEL, INK, 3);
const mountain = (x, y, w, h, c = '#8c9bb5') => po(pt(x - w / 2, y, x, y - h, x + w / 2, y), c, INK, 4) + po(pt(x - w * 0.12, y - h * 0.76, x, y - h, x + w * 0.12, y - h * 0.76), WHT, INK, 3);
const wheel = (x, y, r, cols, s = INK) => cols.map((c, i) => {
  const a0 = (i / cols.length) * 2 * Math.PI - Math.PI / 2 - Math.PI / cols.length, a1 = a0 + (2 * Math.PI) / cols.length;
  return sh(`M${x} ${y}L${r1(x + r * Math.cos(a0))} ${r1(y + r * Math.sin(a0))}A${r} ${r} 0 0 1 ${r1(x + r * Math.cos(a1))} ${r1(y + r * Math.sin(a1))}Z`, c, s, 4);
}).join('');
// progressive drawing: step k shows layers < k in ink, layer k as the new stroke (pink)
const prog = (base, layers) => layers.map((_, k) => S(base + layers.slice(0, k + 1).map((f, j) => f(j === k ? NEW : INK, j === k ? 8 : 6)).join('')));
const mk = (svgs, texts) => svgs.map((svg, i) => ({ svg, text: texts[i] }));
const V = (wf, we, df, de) => ({ word: T(wf, we), def: T(df, de) });
const SL = (svg, fr, en) => ({ svg, text: T(fr, en) });
const Q = (fr, en) => T(fr, en);
const lesson = (id, icon, title, goal, vocab, teach, game, retour) => ({ id, icon, title, goal, vocab, teach, game, project: 'cours-' + id, retour });
const proj = (id, emoji, title, level, minutes, theme, materials, steps, adult = false) => ({ id: 'cours-' + id, cat: 'cours', emoji, title, level, minutes, theme, season: null, materials, adult, steps });
// materials a family has at home
const M = {
  papier: T('Feuille blanche', 'White paper'), crayon: T('Crayon à mine', 'Pencil'), gomme: T('Gomme à effacer', 'Eraser'),
  couleurs: T('Crayons de couleur', 'Coloured pencils'), feutres: T('Feutres', 'Markers'), noir: T('Feutre noir', 'Black marker'),
  regle: T('Règle', 'Ruler'), ciseaux: T('Ciseaux', 'Scissors'), colle: T('Colle en bâton', 'Glue stick'),
  papierCouleur: T('Papier de couleur', 'Coloured paper'), magazines: T('Vieux magazines', 'Old magazines'),
  gouache: T('Gouache rouge, jaune et bleue', 'Red, yellow and blue poster paint'), gouacheBN: T('Gouache blanche et noire', 'White and black poster paint'),
  pinceau: T('Pinceau', 'Paintbrush'), eau: T('Pot d’eau', 'Jar of water'), assiette: T('Assiette en carton', 'Paper plate'),
  essuie: T('Essuie-tout', 'Paper towel'), journal: T('Papier journal pour protéger la table', 'Newspaper to protect the table'),
  cire: T('Crayons de cire ou pastels gras', 'Wax crayons or oil pastels'), pate: T('Pâte à modeler (2 couleurs)', 'Play dough (2 colours)'),
  cure: T('Cure-dent', 'Toothpick'), carton: T('Carton mince (boîte de céréales)', 'Thin cardboard (cereal box)'), ruban: T('Ruban adhésif', 'Tape'),
  miroir: T('Miroir', 'Mirror'), bouchon: T('Bouchon de liège ou de bouteille', 'Cork or bottle cap'), fourchette: T('Fourchette en plastique', 'Plastic fork'),
  feuilles: T('Feuilles d’arbre, pièces de monnaie, objets plats avec des bosses', 'Tree leaves, coins, flat bumpy objects'),
  fruit: T('Un vrai fruit (pomme, poire…)', 'A real fruit (apple, pear…)'),
};

// ================= 1. Les lignes =================
const LI = {
  droite: ln('M12 82L88 18', INK, 8), debout: ln('M50 10V90', INK, 8), couchee: ln('M8 50H92', INK, 8),
  brisee: ln('M8 70L28 30L48 70L68 30L92 70', INK, 7), escalier: ln('M12 85V65H35V45H58V25H85', INK, 7),
  vague: ln('M8 50Q22 22 36 50T64 50T92 50', INK, 7), cercle: ci(50, 50, 34, 'none', INK, 7), spirale: ln(SPI, INK, 6),
  arc: ln('M12 80Q50 0 88 80', INK, 7), boucle: ln('M10 70C30 70 40 20 55 30S50 80 65 70S85 40 92 40', INK, 7),
};
const L1 = lesson('lignes', '〰️', T('Les lignes', 'Lines'),
  T('Je vais apprendre à reconnaître et à tracer différentes sortes de lignes.', 'I will learn to recognize and draw different kinds of lines.'),
  [V('ligne droite', 'straight line', 'Une ligne qui va tout droit, sans tourner, comme le bord d’une règle.', 'A line that goes straight without turning, like the edge of a ruler.'),
    V('ligne courbe', 'curved line', 'Une ligne qui tourne doucement, comme une vague.', 'A line that bends gently, like a wave.'),
    V('ligne brisée', 'zigzag line', 'Une ligne qui change de direction d’un coup : un zigzag.', 'A line that suddenly changes direction: a zigzag.'),
    V('spirale', 'spiral', 'Une ligne qui tourne en rond autour d’un centre, comme une coquille d’escargot.', 'A line that turns round and round a centre, like a snail shell.'),
    V('ligne pointillée', 'dotted line', 'Une ligne faite de petits traits ou de points.', 'A line made of little dashes or dots.')],
  [SL(S(ln('M40 60H360') + ln('M80 100V270') + ln('M130 260L230 110') + re(250, 180, 120, 30, '#ffe08a', INK, 4, 3) + ln('M265 180v10M280 180v10M295 180v10M310 180v10M325 180v10M340 180v10M355 180v10', INK, 3)),
    'Une ligne droite va tout droit, sans tourner. Elle peut être couchée, debout ou penchée.', 'A straight line goes straight without turning. It can lie down, stand up or lean.'),
  SL(S(ln(wave(150, 40, 30, 20, 200), BLU, 8) + ln(zig(190, 80, 30, 230, 380), RED, 8)),
    'Une ligne courbe tourne doucement, comme une vague. Une ligne brisée change de direction d’un coup : c’est un zigzag.', 'A curved line bends gently, like a wave. A zigzag line suddenly changes direction.'),
  SL(S(g('translate(10 40) scale(2.2)', ln(SPI, VIO, 3)) + dl('M230 230Q290 40 380 160', GRN, 7) + [0, 1, 2, 3, 4, 5].map((i) => ci(240 + i * 26, 270, 4, INK, 'none', 0)).join('')),
    'Une spirale tourne en rond autour d’un centre. Une ligne pointillée est faite de petits traits ou de points.', 'A spiral turns round and round a centre. A dotted line is made of little dashes or dots.'),
  SL(S(ln('M40 70Q200 20 360 70', INK, 24) + ln('M40 160Q200 110 360 160', INK, 11) + ln('M40 240Q200 190 360 240', INK, 3) + crayon(330, 280, 30, ORA)),
    'Une ligne peut être épaisse ou mince. Appuie fort ou doucement sur ton crayon pour changer l’épaisseur.', 'A line can be thick or thin. Press hard or softly on your pencil to change the thickness.'),
  SL(S(g('translate(15 5) scale(1.1)', ln(SPI, ORA, 5)) + ln('M220 60q12-14 24 0q12-14 24 0M280 90q10-12 20 0q10-12 20 0', INK, 4) + ln(wave(185, 12, 25), BLU, 6) + ln(wave(215, 12, 25), BLU, 6) + ln(zig(290, 34, 12), GRN, 5)),
    'Les artistes mélangent toutes ces lignes pour dessiner ce qu’ils voient : le soleil, les oiseaux, les vagues, l’herbe.', 'Artists mix all these lines to draw what they see: the sun, birds, waves, grass.')],
  { type: 'sort', q: Q('Range chaque ligne : est-elle droite ou courbe?', 'Sort each line: is it straight or curved?'),
    bins: [{ id: 'd', label: T('Lignes droites', 'Straight lines'), icon: I(LI.droite) }, { id: 'c', label: T('Lignes courbes', 'Curved lines'), icon: I(LI.vague) }],
    items: [['debout', 'd'], ['couchee', 'd'], ['brisee', 'd'], ['escalier', 'd'], ['cercle', 'c'], ['spirale', 'c'], ['arc', 'c'], ['boucle', 'c']].map(([k, b]) => ({ svg: I(LI[k]), bin: b })) },
  [T('Quelle ligne était la plus facile à tracer? La plus difficile?', 'Which line was the easiest to draw? The hardest?'),
    T('Où vois-tu des lignes courbes dans ta maison?', 'Where do you see curved lines in your home?'),
    T('Quelle ligne te fait penser à la mer? Au tonnerre?', 'Which line makes you think of the sea? Of thunder?')]);
const lgBase = paper(40, 30, 320, 240);
const lgL = [
  (c, w) => ln('M200 30V270M40 150H360', c, w),
  (c, w) => ln('M60 55H180M60 85H180M60 115H180M75 140L170 45', c, w),
  (c, w) => ln(wave(65, 12, 20, 210, 350), c, w) + ln(wave(100, 12, 20, 210, 350), c, w) + ln(wave(135, 12, 20, 210, 350), c, w),
  (c, w) => ln(zig(200, 30, 20, 50, 190), c, w) + ln(zig(255, 30, 20, 50, 190), c, w),
  (c, w) => g('translate(212 170) scale(0.9)', ln(SPI, c, w)) + dl('M300 170Q360 210 300 262', c, w) + dl('M330 165Q380 215 335 262', c, w),
];
const P1 = proj('lignes', '〰️', T('Le tableau des lignes', 'The line chart'), 1, 15, 'motifs', [M.papier, M.crayon, M.regle, M.feutres], [
  { svg: S(lgBase + dl('M200 30V270M40 150H360', NEW, 5) + arr(370, 60, 395, 150, 370, 240)), text: T('Plie ta feuille en deux, puis encore en deux. Déplie-la : les plis font 4 cases.', 'Fold your paper in half, then in half again. Unfold it: the folds make 4 boxes.') },
  ...mk(prog(lgBase, lgL), [
    T('Repasse sur les plis avec ton crayon et ta règle.', 'Trace over the folds with your pencil and ruler.'),
    T('Dans la première case, trace des lignes droites avec ta règle.', 'In the first box, draw straight lines with your ruler.'),
    T('Dans la deuxième case, dessine des lignes courbes, comme des vagues.', 'In the second box, draw curved lines, like waves.'),
    T('Dans la troisième case, dessine des lignes brisées en zigzag.', 'In the third box, draw zigzag lines.'),
    T('Dans la dernière case, dessine une spirale et des lignes pointillées.', 'In the last box, draw a spiral and dotted lines.')]),
  { svg: S(re(40, 30, 160, 120, '#ffe7a3', 'none', 0, 0) + re(200, 30, 160, 120, '#cfe8ff', 'none', 0, 0) + re(40, 150, 160, 120, '#ffd3e1', 'none', 0, 0) + re(200, 150, 160, 120, '#d9f5c8', 'none', 0, 0) + paper(40, 30, 320, 240, 'none') + lgL[0](INK, 6) + lgL[1](RED, 6) + lgL[2](BLU, 6) + lgL[3](VIO, 6) + lgL[4](GRN, 6)),
    text: T('Colorie chaque case avec tes feutres. Ton tableau des lignes est fini!', 'Colour each box with your markers. Your line chart is finished!') },
]);

// ================= 2. Les formes =================
const FO = {
  cercle: ci(50, 50, 34, RED, INK, 5), carre: re(18, 18, 64, 64, BLU, INK, 5, 2), triangle: po('50,12 90,86 10,86', YEL, INK, 5),
  rectangle: re(8, 30, 84, 40, GRN, INK, 5, 2), losange: po('50,8 88,50 50,92 12,50', ORA, INK, 5),
  nuage: sh('M16 72a14 14 0 0 1 6-26a18 18 0 0 1 32-10a16 16 0 0 1 28 14a12 12 0 0 1 -2 22Z', LBL),
  flaque: sh('M12 55C10 35 35 30 45 38S70 22 82 40S95 75 70 72S40 85 25 75S14 66 12 55Z', '#7fb6ea'),
  feuille: sh('M50 92C18 70 14 30 50 8C86 30 82 70 50 92Z', GRN) + ln('M50 88V22', INK, 3),
  tache: sh('M30 20C50 5 60 30 75 25S95 55 80 70S55 95 40 80S5 75 15 55S15 30 30 20Z', VIO),
};
const L2 = lesson('formes', '🔷', T('Les formes', 'Shapes'),
  T('Je vais apprendre à reconnaître les formes géométriques et les formes libres.', 'I will learn to recognize geometric shapes and free shapes.'),
  [V('forme', 'shape', 'Ce qu’on obtient quand une ligne se referme.', 'What you get when a line closes up.'),
    V('forme géométrique', 'geometric shape', 'Une forme régulière : cercle, carré, triangle, rectangle.', 'A regular shape: circle, square, triangle, rectangle.'),
    V('forme libre', 'free shape', 'Une forme sans règle, comme un nuage ou une flaque d’eau.', 'A shape with no rule, like a cloud or a puddle.'),
    V('contour', 'outline', 'La ligne qui fait le tour d’une forme.', 'The line that goes all around a shape.')],
  [SL(S(ln('M40 210C40 110 130 90 150 160', INK, 7) + arr(170, 150, 195, 110, 220, 150) + sh('M250 210C240 110 340 90 360 160S320 230 250 210Z', PNK, INK, 7)),
    'Quand une ligne se referme sur elle-même, elle fait une forme.', 'When a line closes up on itself, it makes a shape.'),
  SL(S(ci(80, 100, 48, RED) + re(160, 52, 92, 92, BLU, INK, 5, 2) + po('330,48 384,148 276,148', YEL) + re(100, 190, 200, 76, GRN, INK, 5, 2)),
    'Les formes géométriques sont régulières : le cercle, le carré, le triangle et le rectangle.', 'Geometric shapes are regular: the circle, the square, the triangle and the rectangle.'),
  SL(S(g('translate(20 20) scale(1.5)', FO.nuage) + g('translate(210 10) scale(1.6)', FO.flaque) + g('translate(40 150) scale(1.4)', FO.feuille) + g('translate(220 150) scale(1.4)', FO.tache)),
    'Les formes libres n’ont pas de règle : un nuage, une flaque, une feuille, une tache de peinture.', 'Free shapes have no rule: a cloud, a puddle, a leaf, a paint blot.'),
  SL(S(sun(330, 60, 28) + re(70, 150, 110, 110, '#ffb36b', INK, 5, 2) + po('55,150 195,150 125,80', RED) + re(110, 200, 30, 60, BRN, INK, 4, 2) + re(258, 190, 20, 70, BRN, INK, 4, 2) + ci(268, 165, 42, GRN) + ln('M20 262H380', INK, 5)),
    'Regarde autour de toi : une maison, c’est un carré et un triangle! Tout est fait de formes.', 'Look around you: a house is a square and a triangle! Everything is made of shapes.')],
  { type: 'sort', q: Q('Range chaque forme : géométrique ou libre?', 'Sort each shape: geometric or free?'),
    bins: [{ id: 'g', label: T('Formes géométriques', 'Geometric shapes'), icon: I(FO.carre) }, { id: 'l', label: T('Formes libres', 'Free shapes'), icon: I(FO.nuage) }],
    items: [['cercle', 'g'], ['triangle', 'g'], ['rectangle', 'g'], ['losange', 'g'], ['nuage', 'l'], ['flaque', 'l'], ['feuille', 'l'], ['tache', 'l']].map(([k, b]) => ({ svg: I(FO[k]), bin: b })) },
  [T('Quelles formes as-tu utilisées pour ton robot?', 'Which shapes did you use for your robot?'),
    T('Nomme un objet rond et un objet carré dans ta chambre.', 'Name a round object and a square object in your bedroom.'),
    T('Préfères-tu dessiner des formes géométriques ou des formes libres? Pourquoi?', 'Do you prefer drawing geometric shapes or free shapes? Why?')]);
const roL = [
  (c, w) => re(140, 110, 120, 110, 'none', c, w, 6),
  (c, w) => re(160, 40, 80, 62, 'none', c, w, 6),
  (c, w) => ci(183, 64, 10, 'none', c, w) + ci(217, 64, 10, 'none', c, w) + re(180, 82, 40, 10, 'none', c, w, 2),
  (c, w) => ln('M200 40V22', c, w) + po('190,22 210,22 200,6', 'none', c, w),
  (c, w) => re(92, 120, 44, 22, 'none', c, w, 4) + re(264, 120, 44, 22, 'none', c, w, 4) + ci(84, 131, 11, 'none', c, w) + ci(316, 131, 11, 'none', c, w),
  (c, w) => re(158, 224, 28, 48, 'none', c, w, 4) + re(214, 224, 28, 48, 'none', c, w, 4),
  (c, w) => ci(172, 140, 12, 'none', c, w) + po('168,200 186,170 204,200', 'none', c, w) + re(216, 172, 26, 26, 'none', c, w, 2),
];
const P2 = proj('formes', '🤖', T('Un robot de formes', 'A shape robot'), 1, 15, 'personnages', [M.papier, M.crayon, M.regle, M.couleurs], [
  ...mk(prog('', roL), [
    T('Dessine un grand rectangle pour le corps du robot.', 'Draw a big rectangle for the robot’s body.'),
    T('Dessine un carré au-dessus pour la tête.', 'Draw a square on top for the head.'),
    T('Ajoute deux cercles pour les yeux et un petit rectangle pour la bouche.', 'Add two circles for the eyes and a small rectangle for the mouth.'),
    T('Fais une antenne avec une ligne et un petit triangle.', 'Make an antenna with a line and a small triangle.'),
    T('Ajoute des bras en rectangles et des mains rondes.', 'Add rectangle arms and round hands.'),
    T('Dessine deux rectangles pour les jambes.', 'Draw two rectangles for the legs.'),
    T('Décore le ventre avec des formes : un cercle, un triangle, un carré.', 'Decorate the tummy with shapes: a circle, a triangle, a square.')]),
  { svg: S(re(140, 110, 120, 110, '#b8c4d6', INK, 6, 6) + re(160, 40, 80, 62, '#d6dee9', INK, 6, 6) + ci(183, 64, 10, YEL, INK, 6) + ci(217, 64, 10, YEL, INK, 6) + re(180, 82, 40, 10, RED, INK, 6, 2) + ln('M200 40V22', INK, 6) + po('190,22 210,22 200,6', RED, INK, 6) + re(92, 120, 44, 22, '#b8c4d6', INK, 6, 4) + re(264, 120, 44, 22, '#b8c4d6', INK, 6, 4) + ci(84, 131, 11, ORA, INK, 6) + ci(316, 131, 11, ORA, INK, 6) + re(158, 224, 28, 48, BLU, INK, 6, 4) + re(214, 224, 28, 48, BLU, INK, 6, 4) + ci(172, 140, 12, RED, INK, 6) + po('168,200 186,170 204,200', YEL, INK, 6) + re(216, 172, 26, 26, GRN, INK, 6, 2)),
    text: T('Colorie ton robot avec tes crayons de couleur. Donne-lui un nom!', 'Colour your robot with your coloured pencils. Give it a name!') },
]);

// ================= 3. Les couleurs primaires =================
const mondCells = [[60, 20, 100, 90, RED], [270, 160, 70, 120, YEL], [60, 200, 100, 80, BLU]];
const mondLines = (c = BLK, w = 10) => ln('M160 20V280M270 20V280M60 110H340M60 200H160M270 160H340M160 240H270', c, w);
const mond = (k, hi = true) => S(paper(60, 20, 280, 260) + mondCells.slice(0, k).map(([x, y, w, h, f]) => re(x, y, w, h, f, 'none', 0, 0)).join('') + mondLines() + (k && hi ? re(...mondCells[k - 1].slice(0, 4), 'none', NEW, 7, 0) : ''));
const L3 = lesson('primaires', '🔴', T('Les couleurs primaires', 'Primary colours'),
  T('Je vais apprendre à nommer les trois couleurs primaires.', 'I will learn to name the three primary colours.'),
  [V('couleur primaire', 'primary colour', 'Le rouge, le jaune ou le bleu. On ne peut pas les fabriquer en mélangeant d’autres couleurs.', 'Red, yellow or blue. You can’t make them by mixing other colours.'),
    V('gouache', 'poster paint', 'Une peinture épaisse qui se lave à l’eau.', 'A thick paint that washes off with water.'),
    V('palette', 'palette', 'L’endroit où on met et mélange la peinture, comme une assiette.', 'The place where you put and mix paint, like a plate.'),
    V('couleur pure', 'pure colour', 'Une couleur qui sort directement du pot, sans mélange.', 'A colour straight out of the pot, not mixed.')],
  [SL(S(pot(90, 110, RED) + pot(200, 110, YEL) + pot(310, 110, BLU) + splat(90, 230, 22, RED) + splat(200, 230, 22, YEL) + splat(310, 230, 22, BLU)),
    'Il y a trois couleurs primaires : le rouge, le jaune et le bleu.', 'There are three primary colours: red, yellow and blue.'),
  SL(S(splat(60, 90, 20, RED) + splat(60, 160, 20, YEL) + splat(60, 230, 20, BLU) + arr(100, 160, 130, 130, 170, 160) + [[90, RED], [76, ORA], [62, YEL], [48, GRN], [34, BLU], [20, VIO]].map(([r, c]) => ln(`M${290 - r} 230A${r} ${r} 0 0 1 ${290 + r} 230`, c, 14)).join('')),
    'On ne peut pas les fabriquer avec d’autres couleurs. Mais avec elles, on fabrique presque toutes les autres!', 'You can’t make them from other colours. But with them, you can make almost all the others!'),
  SL(mond(3, false), 'Le peintre Piet Mondrian aimait peindre avec des lignes noires et les trois couleurs primaires.', 'The painter Piet Mondrian loved painting with black lines and the three primary colours.'),
  SL(S(ci(90, 165, 46, RED) + ln('M90 120q4-18 14-24', BRN, 6) + sh('M96 112q18-20 32-6q-16 14-32 6Z', GRN, INK, 4) + ov(205, 165, 54, 38, YEL) + ci(318, 165, 46, BLU) + ln('M274 165h88M318 119v92', WHT, 6)),
    'Cherche les couleurs primaires autour de toi : une pomme rouge, un citron jaune, un ballon bleu.', 'Look for primary colours around you: a red apple, a yellow lemon, a blue ball.')],
  { type: 'quiz', rounds: [
    { q: Q('Laquelle est une couleur primaire?', 'Which one is a primary colour?'), opts: [{ svg: splatI(GRN) }, { svg: splatI(BLU), ok: true }, { svg: splatI(ORA) }] },
    { q: Q('Laquelle n’est PAS une couleur primaire?', 'Which one is NOT a primary colour?'), opts: [{ svg: splatI(RED) }, { svg: splatI(VIO), ok: true }, { svg: splatI(YEL) }] },
    { q: Q('Quel groupe a seulement des couleurs primaires?', 'Which group has only primary colours?'), opts: [
      { svg: I(ci(22, 50, 15, RED, INK, 3) + ci(50, 50, 15, GRN, INK, 3) + ci(78, 50, 15, BLU, INK, 3)) },
      { svg: I(ci(22, 50, 15, RED, INK, 3) + ci(50, 50, 15, YEL, INK, 3) + ci(78, 50, 15, BLU, INK, 3)), ok: true },
      { svg: I(ci(22, 50, 15, ORA, INK, 3) + ci(50, 50, 15, YEL, INK, 3) + ci(78, 50, 15, VIO, INK, 3)) }] },
    { q: Q('De quelle couleur primaire est ce camion de pompiers?', 'Which primary colour is this fire truck?'),
      pic: S(re(60, 120, 200, 90, RED) + sh('M260 210V135h50l40 40v35Z', RED) + re(275, 145, 30, 25, LBL, INK, 4, 3) + ln('M80 105H240M80 105v15M110 105v15M140 105v15M170 105v15M200 105v15M230 105v15', GRY, 6) + ci(110, 220, 24, BLK) + ci(300, 220, 24, BLK) + ci(110, 220, 8, GRY, 'none', 0) + ci(300, 220, 8, GRY, 'none', 0)),
      opts: [{ svg: splatI(YEL) }, { svg: splatI(RED), ok: true }, { svg: splatI(BLU) }] },
  ] },
  [T('Quelle couleur primaire préfères-tu? Pourquoi?', 'Which primary colour do you like best? Why?'),
    T('Trouve un objet rouge, un objet jaune et un objet bleu dans la maison.', 'Find a red, a yellow and a blue object in the house.')]);
const P3 = proj('primaires', '🟥', T('Un tableau à la Mondrian', 'A Mondrian-style painting'), 2, 20, 'motifs', [M.papier, M.crayon, M.regle, M.noir, T('Crayons de couleur ou gouache (rouge, jaune, bleu)', 'Coloured pencils or poster paint (red, yellow, blue)')], [
  ...mk(prog(paper(60, 20, 280, 260), [
    (c, w) => ln('M160 20V280M270 20V280', c, w),
    (c, w) => ln('M60 110H340M60 200H160', c, w),
    (c, w) => ln('M270 160H340M160 240H270', c, w),
  ]), [
    T('Avec ta règle, trace deux lignes debout, d’un bord à l’autre de la feuille.', 'With your ruler, draw two standing lines from one edge of the paper to the other.'),
    T('Trace deux lignes couchées. Elles font des cases de toutes les grandeurs.', 'Draw two lying-down lines. They make boxes of all sizes.'),
    T('Ajoute deux petites lignes pour faire d’autres cases.', 'Add two short lines to make more boxes.')]),
  { svg: S(paper(60, 20, 280, 260) + mondLines(NEW, 10)), text: T('Repasse toutes les lignes au feutre noir, bien épais.', 'Go over all the lines with black marker, nice and thick.') },
  { svg: mond(1), text: T('Colorie une grande case en rouge.', 'Colour one big box red.') },
  { svg: mond(2), text: T('Colorie une autre case en jaune.', 'Colour another box yellow.') },
  { svg: mond(3, false), text: T('Colorie une case en bleu et laisse les autres blanches. Voilà ton tableau à la Mondrian!', 'Colour one box blue and leave the others white. Here is your Mondrian-style painting!') },
]);

// ================= 4. Les couleurs secondaires =================
const W6 = [RED, ORA, YEL, GRN, BLU, VIO];
const L4 = lesson('secondaires', '🎨', T('Les couleurs secondaires', 'Secondary colours'),
  T('Je vais apprendre à mélanger deux couleurs primaires pour en fabriquer une nouvelle.', 'I will learn to mix two primary colours to make a new one.'),
  [V('mélanger', 'to mix', 'Brasser deux couleurs ensemble pour en faire une nouvelle.', 'To stir two colours together to make a new one.'),
    V('couleur secondaire', 'secondary colour', 'L’orange, le vert ou le violet : une couleur faite avec deux primaires.', 'Orange, green or purple: a colour made with two primaries.'),
    V('cercle chromatique', 'colour wheel', 'Un cercle qui montre les couleurs dans l’ordre de l’arc-en-ciel.', 'A circle that shows the colours in rainbow order.'),
    V('rincer', 'to rinse', 'Laver son pinceau dans l’eau avant de changer de couleur.', 'To wash your brush in water before changing colour.')],
  [SL(mixPic(RED, YEL, ORA), 'Rouge et jaune, mélangés ensemble, donnent de l’orange.', 'Red and yellow mixed together make orange.'),
    SL(mixPic(YEL, BLU, GRN), 'Jaune et bleu donnent du vert.', 'Yellow and blue make green.'),
    SL(mixPic(RED, BLU, VIO), 'Rouge et bleu donnent du violet.', 'Red and blue make purple.'),
    SL(S(wheel(200, 150, 120, W6)), 'L’orange, le vert et le violet sont les couleurs secondaires. Sur le cercle chromatique, chacune est entre ses deux primaires.', 'Orange, green and purple are the secondary colours. On the colour wheel, each one sits between its two primaries.'),
    SL(S(re(200, 140, 100, 120, '#dff1ff', INK, 5, 12) + ln(wave(175, 6, 12, 205, 295), BLU, 4) + brush(250, 110, 180, BLU) + arr(150, 80, 200, 40, 235, 60) + sh('M40 190h90v70h-90Z', WHT, GRY, 4) + ln('M50 205h70M50 225h70M50 245h50', GRY, 3)),
      'Rince ton pinceau dans l’eau et essuie-le entre deux couleurs. Sinon, tes couleurs deviennent brunes!', 'Rinse your brush in water and wipe it between two colours. Otherwise your colours turn brown!')],
  { type: 'mix', q: Q('Choisis deux pots pour fabriquer la couleur demandée.', 'Pick two pots to make the colour asked for.'), pots: ['rouge', 'jaune', 'bleu'], targets: ['orange', 'vert', 'violet'] },
  [T('Quel mélange t’a le plus surpris?', 'Which mix surprised you the most?'),
    T('Que se passe-t-il si tu oublies de rincer ton pinceau?', 'What happens if you forget to rinse your brush?'),
    T('Avec quelles deux couleurs fais-tu du vert?', 'Which two colours make green?')]);
const plate = ci(200, 150, 122, WHT, INK, 5);
const W6s = (k) => W6.map((c, i) => ([0, 2, 4].includes(i) || (i === 1 && k > 0) || (i === 3 && k > 1) || (i === 5 && k > 2)) ? c : WHT);
const P4 = proj('secondaires', '🌈', T('Mon cercle chromatique', 'My colour wheel'), 2, 25, 'motifs', [M.assiette, M.crayon, M.gouache, M.pinceau, M.eau, M.essuie, M.journal], [
  { svg: S(re(20, 30, 360, 250, '#e9e6df', GRY, 3, 4) + ln('M40 60h140M40 80h120M220 60h140M220 80h100', GRY, 3) + ci(150, 180, 75, WHT) + pot(285, 130, RED) + pot(345, 130, YEL) + pot(285, 205, BLU) + re(320, 205, 50, 55, '#dff1ff', INK, 4, 8)),
    text: T('Mets du papier journal sur la table. Prépare l’assiette, la gouache, le pinceau et l’eau.', 'Put newspaper on the table. Get the plate, the paint, the brush and the water ready.') },
  { svg: S(plate + ln([0, 1, 2].map((i) => { const a = i * Math.PI / 3 - Math.PI / 2 + Math.PI / 6; return `M${r1(200 + 122 * Math.cos(a))} ${r1(150 + 122 * Math.sin(a))}L${r1(200 - 122 * Math.cos(a))} ${r1(150 - 122 * Math.sin(a))}`; }).join(''), NEW, 7)),
    text: T('Avec ton crayon, trace trois lignes qui se croisent au centre : tu as six parts, comme une pizza.', 'With your pencil, draw three lines crossing in the middle: you get six slices, like a pizza.') },
  { svg: S(wheel(200, 150, 122, W6s(0))), text: T('Peins une part en rouge, saute une part, la suivante en jaune, saute, puis bleu.', 'Paint one slice red, skip one, the next one yellow, skip one, then blue.') },
  { svg: S(wheel(200, 150, 122, W6s(1)) + splat(355, 50, 16, ORA)), text: T('Mélange un peu de rouge et de jaune sur le bord. Peins l’orange entre le rouge et le jaune.', 'Mix a little red and yellow on the edge. Paint orange between red and yellow.') },
  { svg: S(wheel(200, 150, 122, W6s(2)) + splat(355, 250, 16, GRN)), text: T('Rince ton pinceau. Mélange le jaune et le bleu pour peindre le vert.', 'Rinse your brush. Mix yellow and blue to paint green.') },
  { svg: S(wheel(200, 150, 122, W6s(3))), text: T('Mélange le rouge et le bleu pour le violet. Ton cercle chromatique est complet!', 'Mix red and blue for purple. Your colour wheel is complete!') },
]);

// ================= 5. Couleurs chaudes et froides =================
const CF = {
  flamme: sh('M50 94C20 92 16 62 34 40C38 56 45 56 46 48C40 30 50 15 58 6C60 30 84 40 82 66C80 86 66 94 50 94Z', ORA) + sh('M50 90C38 88 36 74 44 64C46 72 52 72 52 66C58 72 64 80 50 90Z', YEL, 'none', 0),
  soleil: sun(50, 50, 22),
  fraise: sh('M50 92C20 70 16 40 30 30C40 24 60 24 70 30C84 40 80 70 50 92Z', RED) + po('34,30 50,18 66,30 50,36', GRN, INK, 3) + [[40, 48], [58, 46], [48, 62], [38, 66], [62, 64], [50, 78]].map(([x, y]) => ov(x, y, 2, 3, YEL, 'none', 0)).join(''),
  automne: sh('M50 92L48 70L22 78L30 60L10 46L32 40L26 18L46 30L50 8L54 30L74 18L68 40L90 46L70 60L78 78L52 70Z', ORA),
  glacon: po('22,36 56,24 82,40 48,52', '#e8f6ff', INK, 4) + po('22,36 48,52 48,88 22,72', LBL, INK, 4) + po('48,52 82,40 82,74 48,88', '#6fa9e6', INK, 4),
  vague: sh('M6 70C20 40 40 30 56 44C46 46 44 56 54 60C70 64 82 50 94 56V94H6Z', BLU),
  sapin: fir(50, 96, 1, '#2e8b57'),
  raisins: [[40, 30], [60, 30], [30, 48], [50, 48], [70, 48], [40, 66], [60, 66], [50, 84]].map(([x, y]) => ci(x, y, 11, VIO, INK, 3)).join('') + ln('M50 20V8', BRN, 4),
};
const L5 = lesson('chaudes-froides', '🔥', T('Couleurs chaudes et froides', 'Warm and cool colours'),
  T('Je vais apprendre à reconnaître les couleurs chaudes et les couleurs froides.', 'I will learn to recognize warm colours and cool colours.'),
  [V('couleurs chaudes', 'warm colours', 'Le rouge, l’orange et le jaune : elles font penser au feu et au soleil.', 'Red, orange and yellow: they remind us of fire and the sun.'),
    V('couleurs froides', 'cool colours', 'Le bleu, le vert et le violet : elles font penser à l’eau et à la glace.', 'Blue, green and purple: they remind us of water and ice.'),
    V('contraste', 'contrast', 'Quand deux choses très différentes sont l’une à côté de l’autre et ressortent.', 'When two very different things are side by side and stand out.')],
  [SL(S(g('translate(10 60) scale(1.7)', CF.flamme) + g('translate(140 50) scale(1.6)', CF.soleil) + g('translate(260 70) scale(1.4)', CF.automne)),
    'Le rouge, l’orange et le jaune sont des couleurs chaudes. Elles font penser au feu et au soleil.', 'Red, orange and yellow are warm colours. They remind us of fire and the sun.'),
  SL(S(g('translate(10 70) scale(1.6)', CF.glacon) + g('translate(140 60) scale(1.6)', CF.vague) + g('translate(270 40) scale(1.5)', CF.raisins)),
    'Le bleu, le vert et le violet sont des couleurs froides. Elles font penser à l’eau, à la glace et à la forêt.', 'Blue, green and purple are cool colours. They remind us of water, ice and the forest.'),
  SL(S(wheel(200, 150, 110, W6) + dl('M100 250L300 50', INK, 6) + g('translate(300 175) scale(.7)', CF.soleil) + g('translate(30 30) scale(.7)', CF.glacon)),
    'Sur le cercle chromatique, une moitié est chaude et l’autre moitié est froide.', 'On the colour wheel, one half is warm and the other half is cool.'),
  SL(S(re(0, 0, 400, 170, '#5b4bb7', 'none', 0, 0) + re(0, 170, 400, 130, BLU, 'none', 0, 0) + ln(wave(200, 8, 25), LBL, 4) + ln(wave(240, 8, 25), LBL, 4) + sun(200, 110, 46)),
    'Une couleur chaude à côté d’une couleur froide, ça ressort beaucoup : c’est le contraste!', 'A warm colour next to a cool colour really stands out: that’s contrast!')],
  { type: 'sort', q: Q('Range chaque image : couleur chaude ou couleur froide?', 'Sort each picture: warm colour or cool colour?'),
    bins: [{ id: 'ch', label: T('Chaudes', 'Warm'), icon: I(CF.flamme) }, { id: 'fr', label: T('Froides', 'Cool'), icon: I(CF.glacon) }],
    items: [['soleil', 'ch'], ['fraise', 'ch'], ['automne', 'ch'], ['flamme', 'ch'], ['vague', 'fr'], ['sapin', 'fr'], ['raisins', 'fr'], ['glacon', 'fr']].map(([k, b]) => ({ svg: I(CF[k]), bin: b })) },
  [T('Ta main chaude ressort-elle bien sur le fond froid?', 'Does your warm hand stand out on the cool background?'),
    T('Quelles couleurs mettrais-tu pour dessiner l’hiver? Et l’été?', 'Which colours would you use to draw winter? And summer?')]);
const HAND = 'M165 272L160 205L118 160Q108 146 122 140L168 178L150 82Q148 66 163 66Q174 66 176 80L188 160L192 62Q194 48 208 50Q220 52 218 66L212 160L228 78Q232 64 245 68Q256 72 252 86L234 168L262 112Q270 100 280 106Q290 112 284 126L248 210Q238 250 232 272Z';
const bandY = [30, 95, 155, 215];
const bands = (cols) => bandY.map((y, i) => i === 0 ? re(50, 30, 300, 240, cols[0], 'none', 0, 0) : sh(wave(y, 10, 25, 50, 350) + 'L350 270L50 270Z', cols[i], 'none', 0)).join('');
const handLines = (c, w) => bandY.slice(1).map((y) => ln(wave(y, 10, 25, 50, 350), c, w)).join('');
const handClip = `<defs><clipPath id="coursHand"><path d="${HAND}"/></clipPath></defs>`;
const handArt = (warm, cool, c = INK, w = 6) => S(handClip + paper(50, 30, 300, 240) + (cool ? bands([LBL, BLU, GRN, VIO]) : '') + (warm ? `<g clip-path="url(#coursHand)">${bands([YEL, ORA, RED, ORA])}</g>` : '') + handLines(c, w) + ln(HAND, c, w));
const P5 = proj('chaudes-froides', '✋', T('Ma main chaude et froide', 'My warm and cool hand'), 1, 20, 'motifs', [M.papier, M.crayon, M.feutres, M.noir], [
  { svg: S(paper(50, 30, 300, 240) + ln(HAND, NEW, 8)), text: T('Pose ta main au milieu de la feuille, les doigts écartés. Trace le contour avec ton crayon.', 'Put your hand in the middle of the paper, fingers apart. Trace around it with your pencil.') },
  { svg: S(paper(50, 30, 300, 240) + ln(HAND, INK, 6) + handLines(NEW, 8)), text: T('Trace trois lignes courbes qui traversent toute la feuille, même ta main.', 'Draw three curved lines across the whole paper, even across your hand.') },
  { svg: handArt(true, false), text: T('Colorie l’intérieur de ta main avec des couleurs chaudes : rouge, orange, jaune.', 'Colour inside your hand with warm colours: red, orange, yellow.') },
  { svg: handArt(true, true), text: T('Colorie le fond autour de ta main avec des couleurs froides : bleu, vert, violet.', 'Colour the background around your hand with cool colours: blue, green, purple.') },
  { svg: handArt(true, true, BLK, 7), text: T('Repasse les lignes au feutre noir. Ta main chaude ressort sur le fond froid : c’est le contraste!', 'Go over the lines in black marker. Your warm hand stands out on the cool background: that’s contrast!') },
]);

// ================= 6. Clair et foncé =================
const SHADES = ['#0e1f40', '#1d3f7a', '#2f6fdc', '#9cc7f5', '#e3efff'];
const L6 = lesson('clair-fonce', '🌗', T('Clair et foncé', 'Light and dark'),
  T('Je vais apprendre à rendre une couleur plus claire ou plus foncée.', 'I will learn to make a colour lighter or darker.'),
  [V('clair', 'light', 'Une couleur pâle, pleine de lumière.', 'A pale colour, full of light.'),
    V('foncé', 'dark', 'Une couleur sombre, presque noire.', 'A deep colour, almost black.'),
    V('nuance', 'shade', 'Une couleur un peu plus claire ou un peu plus foncée qu’une autre.', 'A colour a little lighter or a little darker than another.'),
    V('dégradé', 'gradient', 'Des nuances placées en ordre, du plus clair au plus foncé.', 'Shades placed in order, from lightest to darkest.')],
  [SL(mixPic(BLU, WHT, LBL), 'Si on ajoute du blanc à une couleur, elle devient plus claire. Bleu et blanc donnent du bleu pâle.', 'If you add white to a colour, it gets lighter. Blue and white make light blue.'),
    SL(mixPic(BLU, BLK, DBL), 'Si on ajoute du noir, elle devient plus foncée. Bleu et noir donnent du bleu foncé.', 'If you add black, it gets darker. Blue and black make dark blue.'),
    SL(S(SHADES.slice().reverse().map((c, i) => re(30 + i * 68, 70, 68, 120, c, INK, 4, 0)).join('') + arr(40, 240, 200, 260, 360, 240)), 'Quand on place les nuances en ordre, du plus clair au plus foncé, on obtient un dégradé.', 'When you place shades in order, from lightest to darkest, you get a gradient.'),
    SL(S(splat(200, 210, 60, LBL) + brush(200, 60, 180, BLK) + ci(200, 128, 6, BLK, 'none', 0) + arr(250, 120, 290, 150, 260, 180)), 'Ajoute le noir une toute petite goutte à la fois : il est très fort! Le blanc, lui, il en faut beaucoup.', 'Add black one tiny drop at a time: it is very strong! White, you need a lot of it.')],
  { type: 'mix', q: Q('Choisis deux pots pour fabriquer la nuance demandée.', 'Pick two pots to make the shade asked for.'), pots: ['rouge', 'bleu', 'blanc', 'noir'], targets: ['rose', 'bleuPale', 'bleuFonce', 'gris'] },
  [T('Qu’est-ce qui est le plus fort : le blanc ou le noir?', 'Which is stronger: white or black?'),
    T('Ton ciel ressemble-t-il au ciel du matin ou du soir?', 'Does your sky look like a morning sky or an evening sky?')]);
const skyBand = (i) => [60, 20 + i * 52, 280, 52];
const skyLines = (c, w) => ln('M60 72H340M60 124H340M60 176H340M60 228H340', c, w);
const SIL = sh('M60 280V250h30v-20l20-18 20 18v20h40v-30l25-20 25 20v30h30V255h20v25Z', BLK, 'none', 0) + po('280,280 300,214 320,280', BLK, 'none', 0) + po('305,280 322,230 339,280', BLK, 'none', 0);
const sky = (n, hi = []) => S(SHADES.slice(0, n).map((c, i) => re(...skyBand(i), c, 'none', 0, 0)).join('') + paper(60, 20, 280, 260, 'none') + skyLines(INK, 2) + hi.map((i) => re(...skyBand(i), 'none', NEW, 6, 0)).join(''));
const P6 = proj('clair-fonce', '🌅', T('Un ciel en dégradé', 'A gradient sky'), 2, 25, 'nature', [M.papier, M.crayon, M.regle, T('Gouache bleue, blanche et noire', 'Blue, white and black poster paint'), M.pinceau, M.eau, M.assiette, M.journal, M.noir], [
  { svg: S(paper(60, 20, 280, 260) + skyLines(NEW, 6)), text: T('Avec ta règle, trace quatre lignes couchées : tu as cinq bandes.', 'With your ruler, draw four lying-down lines: you get five stripes.') },
  { svg: sky(1, [0]), text: T('Mélange du bleu avec une goutte de noir. Peins la bande du haut : c’est la nuit.', 'Mix blue with a drop of black. Paint the top stripe: that’s the night.') },
  { svg: sky(2, [1]), text: T('Peins la deuxième bande en bleu, tout simplement.', 'Paint the second stripe plain blue.') },
  { svg: sky(3, [2]), text: T('Pour la troisième bande, mélange du bleu avec un peu de blanc.', 'For the third stripe, mix blue with a little white.') },
  { svg: sky(5, [3, 4]), text: T('Ajoute encore plus de blanc pour les deux dernières bandes. Le ciel s’éclaircit!', 'Add even more white for the last two stripes. The sky gets lighter!') },
  { svg: sky(5).replace('</svg>', SIL + ci(110, 50, 3, WHT, 'none', 0) + ci(170, 38, 2, WHT, 'none', 0) + ci(250, 56, 3, WHT, 'none', 0) + ci(300, 44, 14, CRM, 'none', 0) + '</svg>'), text: T('Quand c’est sec, dessine des maisons et des sapins tout noirs en bas. Quel beau soir!', 'When it’s dry, draw all-black houses and fir trees at the bottom. What a lovely evening!') },
]);

// ================= 7. La texture =================
const TX = {
  ballon: ci(50, 46, 34, RED, INK, 4) + ln('M50 80l-4 14M50 80l4 14', INK, 3) + ln('M32 32q6-10 16-12', WHT, 5),
  pomme: ci(50, 56, 34, GRN, INK, 4) + ln('M50 22q2-10 8-14', BRN, 5) + ln('M34 42q4-8 12-10', WHT, 5),
  miroir: ov(50, 44, 30, 36, LBL, INK, 5) + ln('M46 80V96M34 96h32', INK, 5) + ln('M36 34l14-14M38 50l22-22', WHT, 4),
  verre: po('26,14 74,14 66,92 34,92', '#e3f2ff', INK, 4) + ln('M34 24l4 54', WHT, 5),
  ecorce: re(22, 6, 56, 88, BRN, INK, 4, 4) + ln('M32 10q6 20 0 40t2 40M50 8q-6 24 2 44t-4 38M66 10q6 18-2 36t4 42', '#5e3a1a', 4),
  roche: po('10,80 18,40 44,18 76,26 92,60 80,86', GRY, INK, 4) + ln('M30 50l12 8l-4 14M60 40l8 12M50 74l14-6', '#5f6368', 3) + [[28, 64], [70, 70], [56, 30], [40, 36]].map(([x, y]) => ci(x, y, 2.5, '#5f6368', 'none', 0)).join(''),
  brosse: re(14, 18, 72, 22, '#4f8ef7', INK, 4, 8) + ln('M20 44v40M30 44v40M40 44v40M50 44v40M60 44v40M70 44v40M80 44v40', BRN, 4),
  ananas: po('34,24 50,4 66,24', GRN, INK, 3) + po('40,24 30,6 50,20', GRN, INK, 3) + ov(50, 60, 28, 36, YEL, INK, 4) + ln('M28 44l44 36M24 62l36 30M36 30l40 34M72 44L28 80M76 62L40 92M64 30L24 64', '#c98a10', 3),
};
const L7 = lesson('texture', '🪵', T('La texture', 'Texture'),
  T('Je vais apprendre à reconnaître des textures et à les copier par frottage.', 'I will learn to recognize textures and copy them with rubbings.'),
  [V('texture', 'texture', 'Ce qu’on sent quand on touche une chose : douce, rugueuse, piquante…', 'What you feel when you touch something: soft, rough, prickly…'),
    V('lisse', 'smooth', 'Doux et plat sous les doigts, sans bosses.', 'Soft and flat under your fingers, with no bumps.'),
    V('rugueux', 'rough', 'Avec des bosses qui accrochent les doigts.', 'With bumps that catch your fingers.'),
    V('frottage', 'rubbing', 'Frotter un crayon sur une feuille posée sur un objet pour copier sa texture.', 'Rubbing a crayon on paper laid over an object to copy its texture.')],
  [SL(S(re(20, 60, 80, 80, '#f6efe4', INK, 4, 8) + ln('M30 80q5-10 10 0t10 0t10 0t10 0t10 0M30 100q5-10 10 0t10 0t10 0t10 0t10 0M30 120q5-10 10 0t10 0t10 0t10 0t10 0', GRY, 3) + re(115, 60, 80, 80, BRN, INK, 4, 4) + ln('M128 64q8 30 0 72M150 64q-8 30 2 72M172 64q8 30-2 72', '#5e3a1a', 4) + re(210, 60, 80, 80, '#d8c3a5', INK, 4, 4) + ln(zig(120, 30, 10, 214, 286), '#7a5a3a', 3) + ln(zig(90, 20, 10, 214, 286), '#7a5a3a', 3) + re(305, 60, 80, 80, LBL, INK, 4, 4) + ln('M318 80q10-12 24-14', WHT, 6) + ln(wave(230, 20, 30, 40, 360), INK, 4)),
    'La texture, c’est ce qu’on sent quand on touche : doux, rugueux, piquant ou lisse.', 'Texture is what you feel when you touch: soft, rough, prickly or smooth.'),
  SL(S(g('translate(20 40) scale(2)', TX.pomme) + g('translate(220 40) scale(2)', TX.ecorce)),
    'Une pomme est lisse : douce et plate sous les doigts. L’écorce d’un arbre est rugueuse : elle a des bosses qui accrochent.', 'An apple is smooth: soft and flat under your fingers. Tree bark is rough: it has bumps that catch.'),
  SL(S(dl('M130 260C60 200 60 90 130 30C200 90 200 200 130 260Z', GRY, 4) + paper(40, 20, 300, 260, 'none') + sh('M130 260C60 200 60 90 130 30C200 90 200 200 130 260Z', '#b6e09a', 'none', 0) + ln('M130 255V45M130 90l-35-25M130 130l-45-30M130 170l-45-30M130 90l35-25M130 130l45-30M130 170l45-30', GRN, 4) + g('translate(250 170) rotate(-70)', re(-10, -60, 20, 90, GRN, INK, 4, 4)) + arr(300, 230, 330, 200, 300, 160)),
    'Le frottage : pose une feuille sur un objet plat avec des bosses, puis frotte avec le côté d’un crayon de cire. La texture apparaît!', 'Rubbing: lay paper over a flat bumpy object, then rub with the side of a wax crayon. The texture appears!'),
  SL(S(ov(120, 160, 80, 55, WHT, INK, 4) + ln('M60 150q6-12 12 0q6-12 12 0q6-12 12 0q6-12 12 0q6-12 12 0q6-12 12 0q6-12 12 0q6-12 12 0M64 175q6-12 12 0q6-12 12 0q6-12 12 0q6-12 12 0q6-12 12 0q6-12 12 0q6-12 12 0', GRY, 3) + ov(42, 128, 22, 16, INK, 'none', 0) + ln('M90 210v30M150 210v30', INK, 6) + ln(zig(204, 50, 12, 240, 380), '#7a5a3a', 5) + sh('M230 230Q240 150 310 150T390 230Z', '#d8c3a5', INK, 4) + ci(380, 222, 4, INK, 'none', 0)),
    'On peut aussi dessiner une texture : des boucles pour la laine du mouton, des pics pour le hérisson.', 'You can also draw a texture: loops for a sheep’s wool, spikes for a hedgehog.')],
  { type: 'sort', q: Q('Range chaque objet : est-il lisse ou rugueux?', 'Sort each object: is it smooth or rough?'),
    bins: [{ id: 'l', label: T('Lisse', 'Smooth'), icon: I(TX.ballon) }, { id: 'r', label: T('Rugueux', 'Rough'), icon: I(TX.ecorce) }],
    items: [['pomme', 'l'], ['miroir', 'l'], ['verre', 'l'], ['ballon', 'l'], ['roche', 'r'], ['brosse', 'r'], ['ananas', 'r'], ['ecorce', 'r']].map(([k, b]) => ({ svg: I(TX[k]), bin: b })) },
  [T('Quel objet a donné le plus beau frottage?', 'Which object made the nicest rubbing?'),
    T('Nomme une chose douce et une chose piquante dans ta maison.', 'Name something soft and something prickly in your home.'),
    T('Avec quelles lignes pourrais-tu dessiner la fourrure d’un chat?', 'Which lines could you use to draw a cat’s fur?')]);
const LEAF = 'M110 250C50 200 50 100 110 40C170 100 170 200 110 250Z';
const leafRub = (c = GRN, f = '#b6e09a') => sh(LEAF, f, 'none', 0) + ln('M110 245V55M110 95l-30-22M110 135l-38-26M110 175l-38-26M110 95l30-22M110 135l38-26M110 175l38-26', c, 4);
const coinRub = (x, y, c = ORA) => ci(x, y, 34, '#ffd9a8', c, 4) + ci(x, y, 24, 'none', c, 3) + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => ci(x + 29 * Math.cos(i * 0.785), y + 29 * Math.sin(i * 0.785), 2, c, 'none', 0)).join('');
const buttonRub = (x, y, c = VIO) => ci(x, y, 26, '#e4d0f0', c, 4) + [[-7, -7], [7, -7], [-7, 7], [7, 7]].map(([a, b]) => ci(x + a, y + b, 4, 'none', c, 3)).join('');
const P7 = proj('texture', '🍂', T('La chasse aux textures', 'The texture hunt'), 1, 20, 'nature', [T('Papier mince (papier d’imprimante)', 'Thin paper (printer paper)'), M.cire, M.feuilles, M.ruban], [
  { svg: S(sh('M90 250C40 200 40 110 90 50C140 110 140 200 90 250Z', GRN) + ln('M90 245V60', INK, 3) + coinRub(210, 110, INK).replace(/#ffd9a8/, '#d6d6d6') + buttonRub(310, 110, INK) + ci(260, 220, 40, '#e8d6b8', INK, 4) + ln('M230 205h60M226 220h68M230 235h60', '#a08060', 3)),
    text: T('Pars à la chasse : trouve des objets plats avec des bosses, comme des feuilles d’arbre, une pièce de monnaie ou un bouton.', 'Go hunting: find flat bumpy objects, like tree leaves, a coin or a button.') },
  { svg: S(g('translate(200 150) rotate(90)', re(-16, -110, 32, 200, GRN, INK, 5, 6)) + re(250, 130, 60, 40, WHT, NEW, 5, 2) + arr(270, 120, 300, 70, 340, 90)),
    text: T('Enlève le papier autour de tes crayons de cire. Tu vas frotter avec le côté.', 'Peel the paper off your wax crayons. You will rub with the side.') },
  { svg: S(sh(LEAF, GRN) + paper(40, 20, 300, 260, 'none') + dl('M40 20h300v260H40Z', NEW, 5) + arr(370, 40, 380, 150, 350, 200)),
    text: T('Pose une feuille d’arbre sous ta feuille de papier, les nervures vers le haut. Tiens-la avec du ruban adhésif.', 'Put a tree leaf under your paper, veins facing up. Hold it with tape.') },
  { svg: S(paper(40, 20, 300, 260) + leafRub() + g('translate(230 160) rotate(-70)', re(-12, -60, 24, 100, GRN, NEW, 5, 4))),
    text: T('Tiens bien le papier et frotte avec le côté du crayon. Les nervures apparaissent!', 'Hold the paper still and rub with the side of the crayon. The veins appear!') },
  { svg: S(paper(40, 20, 300, 260) + leafRub() + coinRub(250, 90) + buttonRub(260, 200) + ci(250, 90, 40, 'none', NEW, 5) + ci(260, 200, 32, 'none', NEW, 5)),
    text: T('Change d’objet et de couleur : une pièce de monnaie, un bouton…', 'Change object and colour: a coin, a button…') },
  { svg: S(paper(40, 20, 300, 260) + leafRub() + coinRub(250, 80) + buttonRub(270, 190) + coinRub(190, 235, RED).replace(/#ffd9a8/, '#ffc9c9') + buttonRub(315, 250, BLU).replace('#e4d0f0', '#cfe0ff')),
    text: T('Remplis ta feuille de textures. Tu as fait un tableau de frottages!', 'Fill your paper with textures. You made a rubbing picture!') },
]);

// ================= 8. L’impression (les empreintes) =================
const corkPic = S(re(170, 70, 60, 110, '#d9a066', INK, 5, 4) + ov(200, 70, 30, 10, '#e8bf8a', INK, 4) + [[185, 100], [212, 120], [190, 150], [215, 160]].map(([x, y]) => ci(x, y, 3, '#9a6a36', 'none', 0)).join('') + arr(200, 200, 205, 225, 200, 260));
const forkPic = S(g('rotate(-20 200 150)', re(192, 140, 16, 130, WHT, INK, 4, 6) + sh('M170 140V60M186 140V60M214 140V60M230 140V60', 'none', INK, 7) + sh('M168 120h64v26h-64Z', WHT, INK, 4)));
const spongePic = S(re(130, 90, 140, 120, YEL, INK, 5, 10) + [[150, 110], [190, 130], [230, 105], [160, 170], [210, 180], [245, 150], [180, 150]].map(([x, y]) => ci(x, y, 6, '#e0b000', 'none', 0)).join(''));
const fingerPic = S(sh('M150 300V130C150 90 250 90 250 130V300', SKIN, INK, 5) + ov(200, 135, 26, 20, '#f9dcc2', INK, 3) + ln('M185 125q15-10 30 0M180 138q20-14 40 0', '#d9a07a', 3));
const L8 = lesson('impression', '🥔', T('Les empreintes', 'Prints'),
  T('Je vais apprendre à imprimer des formes avec des objets et de la peinture.', 'I will learn to print shapes with objects and paint.'),
  [V('empreinte', 'print', 'La marque qu’un objet laisse quand on le presse.', 'The mark an object leaves when you press it.'),
    V('imprimer', 'to print', 'Presser un objet couvert de peinture sur du papier.', 'To press an object covered in paint onto paper.'),
    V('estampe', 'print (artwork)', 'Une image faite en imprimant.', 'A picture made by printing.'),
    V('tampon', 'stamp', 'Un objet qu’on trempe dans la peinture pour imprimer.', 'An object you dip in paint to print.')],
  [SL(S(sh('M70 260V120C70 80 150 80 150 120V260', SKIN, INK, 5) + arr(170, 130, 210, 100, 240, 140) + ov(300, 170, 40, 54, '#ff8fb0', INK, 3) + ln('M276 150q24-20 48 0M270 170q30-24 60 0M272 192q28-22 56 0M284 210q16-10 32 0', '#c2185b', 3)),
    'Une empreinte, c’est la marque qu’un objet laisse quand on le presse. Ton doigt aussi fait une empreinte!', 'A print is the mark an object leaves when you press it. Your finger makes a print too!'),
  SL(S(re(60, 50, 50, 90, '#d9a066', INK, 5, 4) + ov(85, 140, 25, 8, RED, INK, 4) + arr(130, 100, 170, 60, 210, 100) + ci(280, 150, 40, RED, 'none', 0) + ci(280, 150, 40, 'none', '#b02030', 3)),
    'On trempe l’objet dans la peinture, on le presse sur le papier, puis on le soulève. Un bouchon fait un rond.', 'Dip the object in paint, press it on the paper, then lift it. A cork makes a circle.'),
  SL(S(g('translate(-90 -10) rotate(-20 200 150)', sh('M170 140V60M186 140V60M214 140V60M230 140V60', 'none', INK, 7) + re(192, 140, 16, 120, WHT, INK, 4, 6)) + ln('M230 260V120M250 260V110M270 260V120M290 260V110M310 260V120M330 260V115', GRN, 7)),
    'Une fourchette fait des lignes. Si on la traîne, ça fait de l’herbe!', 'A fork makes lines. If you drag it, it makes grass!'),
  SL(S([0, 1, 2, 3, 4].map((i) => ci(200 + 50 * Math.cos(i * 1.2566 - 1.57), 140 + 50 * Math.sin(i * 1.2566 - 1.57), 28, PNK, 'none', 0)).join('') + ci(200, 140, 20, YEL, 'none', 0) + ln('M200 220V290M180 260q-30-30-60-10M220 250q30-30 60-10', GRN, 7)),
    'Quand on répète la même empreinte, on crée une image ou un motif : c’est une estampe!', 'When you repeat the same print, you make a picture or a pattern: it’s a print artwork!')],
  { type: 'quiz', rounds: [
    { q: Q('Quelle empreinte fait le bouchon?', 'Which print does the cork make?'), pic: corkPic, opts: [{ svg: I(re(20, 20, 60, 60, RED, 'none', 0, 2)) }, { svg: I(ci(50, 50, 32, RED, 'none', 0)), ok: true }, { svg: I(po('50,10 90,85 10,85', RED, 'none', 0)) }] },
    { q: Q('Quelle empreinte fait la fourchette?', 'Which print does the fork make?'), pic: forkPic, opts: [{ svg: I(ln('M25 15V85M42 15V85M58 15V85M75 15V85', GRN, 8)), ok: true }, { svg: I(ci(50, 50, 32, GRN, 'none', 0)) }, { svg: I(ln(zig(70, 40, 16, 10, 90), GRN, 8)) }] },
    { q: Q('Quelle empreinte fait l’éponge?', 'Which print does the sponge make?'), pic: spongePic, opts: [{ svg: I(po('50,10 90,85 10,85', BLU, 'none', 0)) }, { svg: I(ci(50, 50, 32, BLU, 'none', 0)) }, { svg: I(re(14, 22, 72, 56, BLU, 'none', 0, 6) + [[28, 36], [52, 46], [70, 34], [36, 62], [64, 64]].map(([x, y]) => ci(x, y, 4, WHT, 'none', 0)).join('')), ok: true }] },
    { q: Q('Quelle empreinte fait ton doigt?', 'Which print does your finger make?'), pic: fingerPic, opts: [{ svg: I(re(20, 20, 60, 60, VIO, 'none', 0, 2)) }, { svg: I(ov(50, 50, 26, 36, '#ff8fb0', 'none', 0) + ln('M34 40q16-14 32 0M30 54q20-16 40 0M34 68q16-12 32 0', '#c2185b', 3)), ok: true }, { svg: I(ln('M20 80L80 20', VIO, 10)) }] },
  ] },
  [T('Quel objet faisait la plus belle empreinte?', 'Which object made the nicest print?'),
    T('Qu’arrive-t-il si tu mets trop de peinture sur ton tampon?', 'What happens if you put too much paint on your stamp?'),
    T('Quel autre objet de la maison pourrais-tu essayer?', 'What other object at home could you try?')]);
const FL = [[110, 100, RED], [215, 80, BLU], [305, 115, VIO]];
const printFlower = (x, y, c) => [0, 1, 2, 3, 4].map((i) => ci(x + 26 * Math.cos(i * 1.2566 - 1.57), y + 26 * Math.sin(i * 1.2566 - 1.57), 15, c, 'none', 0)).join('');
const bq = (k) => {
  let b = paper(30, 15, 340, 270);
  const n = k >= 3 ? 3 : 1;
  if (k >= 4) b += FL.slice(0, n).map(([x, y]) => ln(`M${x - 6} ${y + 30}V270M${x} ${y + 30}V272M${x + 6} ${y + 30}V270`, GRN, 4)).join('');
  if (k >= 5) b += FL.slice(0, n).map(([x, y]) => ov(x - 20, y + 110, 9, 16, GRN, 'none', 0) + ov(x + 20, y + 130, 9, 16, GRN, 'none', 0)).join('');
  b += FL.slice(0, n).map(([x, y, c]) => printFlower(x, y, c)).join('');
  if (k >= 2) b += FL.slice(0, n).map(([x, y]) => ov(x, y, 11, 13, YEL, 'none', 0)).join('');
  const hi = [null, ci(110, 100, 46, 'none', NEW, 5), ov(110, 100, 18, 20, 'none', NEW, 5), ci(215, 80, 46, 'none', NEW, 5) + ci(305, 115, 46, 'none', NEW, 5), re(80, 135, 250, 140, 'none', NEW, 5, 10), re(70, 190, 270, 70, 'none', NEW, 5, 10), ''][k];
  return S(b + (hi || ''));
};
const P8 = proj('impression', '💐', T('Un bouquet d’empreintes', 'A bouquet of prints'), 1, 20, 'nature', [M.papier, T('Gouache de plusieurs couleurs', 'Poster paint in several colours'), M.assiette, M.bouchon, M.fourchette, M.journal, M.essuie], [
  { svg: S(ci(200, 150, 110, WHT) + splat(160, 110, 20, RED) + splat(240, 110, 20, BLU) + splat(150, 190, 20, YEL) + splat(240, 195, 20, GRN) + splat(200, 150, 14, VIO)), text: T('Protège la table avec du papier journal. Mets un peu de gouache de chaque couleur dans l’assiette.', 'Protect the table with newspaper. Put a little of each paint colour on the plate.') },
  { svg: bq(1), text: T('Trempe le bouchon dans le rouge et presse-le cinq fois en rond : c’est une fleur!', 'Dip the cork in red and press it five times in a circle: it’s a flower!') },
  { svg: bq(2), text: T('Fais le cœur de la fleur avec le bout de ton doigt trempé dans le jaune.', 'Make the centre of the flower with your fingertip dipped in yellow.') },
  { svg: bq(3), text: T('Essuie le bouchon et fais deux autres fleurs avec d’autres couleurs.', 'Wipe the cork and make two more flowers with other colours.') },
  { svg: bq(4), text: T('Trempe la fourchette dans le vert et traîne-la vers le bas pour faire les tiges.', 'Dip the fork in green and drag it down to make the stems.') },
  { svg: bq(5), text: T('Ajoute des feuilles avec ton doigt trempé dans le vert.', 'Add leaves with your finger dipped in green.') },
  { svg: bq(6), text: T('Laisse sécher. Ton bouquet d’empreintes est prêt à offrir!', 'Let it dry. Your bouquet of prints is ready to give!') },
]);

// ================= 9. Les motifs =================
const star = (x, y, R, r) => Array.from({ length: 10 }, (_, i) => { const a = i * Math.PI / 5 - Math.PI / 2, d = i % 2 ? r : R; return `${r1(x + d * Math.cos(a))},${r1(y + d * Math.sin(a))}`; }).join(' ');
const TOK = {
  A: ci(50, 50, 30, RED, INK, 5), B: re(22, 22, 56, 56, BLU, INK, 5, 4), C: po('50,14 88,82 12,82', YEL, INK, 5), D: po(star(50, 52, 38, 16), GRN, INK, 4),
};
const tokRow = (seq, y = 110, size = 54) => seq.split('').map((k, i) => g(`translate(${20 + i * (size + 6)} ${y}) scale(${size / 100})`, TOK[k])).join('');
const L9 = lesson('motifs', '🔁', T('Les motifs', 'Patterns'),
  T('Je vais apprendre à créer un motif qui se répète.', 'I will learn to create a pattern that repeats.'),
  [V('motif', 'pattern', 'Un dessin qu’on répète encore et encore.', 'A design you repeat again and again.'),
    V('répétition', 'repetition', 'Faire la même chose plusieurs fois.', 'Doing the same thing several times.'),
    V('suite', 'sequence', 'Un ordre qui revient toujours pareil : rond, carré, rond, carré…', 'An order that always comes back the same: circle, square, circle, square…'),
    V('alternance', 'alternation', 'Changer chacun son tour : rouge, bleu, rouge, bleu.', 'Taking turns: red, blue, red, blue.')],
  [SL(S(tokRow('ABABAB', 120)), 'Un motif, c’est un dessin qu’on répète. Rond, carré, rond, carré… c’est une suite AB.', 'A pattern is a design you repeat. Circle, square, circle, square… that’s an AB pattern.'),
    SL(S(tokRow('ABCABC', 120)), 'On peut aussi répéter trois choses : rond, carré, triangle. C’est une suite ABC.', 'You can also repeat three things: circle, square, triangle. That’s an ABC pattern.'),
    SL(S(re(20, 100, 360, 100, RED, INK, 4, 0) + Array.from({ length: 9 }, (_, i) => ln(`M${32 + i * 40} 110L${52 + i * 40} 150L${32 + i * 40} 190`, YEL, 7) + ln(`M${46 + i * 40} 110L${66 + i * 40} 150L${46 + i * 40} 190`, BLU, 5)).join('') + ln('M30 200v40M45 200v46M60 200v40M340 200v40M355 200v46M370 200v40', RED, 5)),
      'La ceinture fléchée, un symbole du Québec, est tissée avec des motifs en forme de flèches.', 'The ceinture fléchée, a symbol of Québec, is woven with arrow-shaped patterns.'),
    SL(S(sh('M120 70L160 50Q200 70 240 50L280 70L310 120L270 135L262 115V260H138V115L130 135L90 120Z', WHT) + [140, 172, 204, 236].map((y) => re(141, y, 118, 14, BLU, 'none', 0, 0)).join('') + sh('M120 70L160 50Q200 70 240 50L280 70L310 120L270 135L262 115V260H138V115L130 135L90 120Z', 'none') + [[110, 95], [285, 95]].map(([x, y]) => ci(x, y, 5, RED, 'none', 0)).join('')),
      'Cherche des motifs autour de toi : sur tes vêtements, les tuiles, le papier peint, les tapis.', 'Look for patterns around you: on your clothes, tiles, wallpaper, rugs.')],
  { type: 'pattern', q: Q('Continue le motif : touche ce qui vient ensuite.', 'Continue the pattern: tap what comes next.'),
    tokens: Object.fromEntries(Object.entries(TOK).map(([k, v]) => [k, I(v)])),
    rounds: [{ unit: 'AB', shown: 4, ask: 2 }, { unit: 'ABC', shown: 6, ask: 3 }, { unit: 'ABB', shown: 6, ask: 3 }, { unit: 'AABD', shown: 8, ask: 4 }] },
  [T('Quelle suite as-tu choisie pour ton bracelet?', 'Which sequence did you choose for your bracelet?'),
    T('Trouve un motif sur un vêtement de ta famille.', 'Find a pattern on a piece of clothing in your family.')]);
const strip = paper(40, 120, 320, 50, CRM);
const cellLines = (c, w) => ln([80, 120, 160, 200, 240, 280, 320].map((x) => `M${x} 120V170`).join(''), c, w);
const brShape = (i, c, w, f = 'none') => i % 2 ? po(pt(60 + i * 40, 130, 74 + i * 40, 160, 46 + i * 40, 160), f, c, w) : ci(60 + i * 40, 145, 13, f, c, w);
const P9 = proj('motifs', '📿', T('Un bracelet à motifs', 'A pattern bracelet'), 1, 15, 'objets', [M.carton, M.regle, M.crayon, M.feutres, M.ciseaux, M.ruban], [
  { svg: S(re(60, 40, 280, 200, '#f0c27a', INK, 4, 4) + dl('M60 120H340M60 170H340', NEW, 5) + scissors(360, 150, 90)), text: T('Coupe une bande de carton mince, assez longue pour faire le tour de ton poignet.', 'Cut a strip of thin cardboard, long enough to go around your wrist.') },
  { svg: S(strip + cellLines(NEW, 6)), text: T('Avec ta règle, trace des lignes pour faire des petites cases tout le long.', 'With your ruler, draw lines to make little boxes all along.') },
  { svg: S(strip + cellLines(INK, 4) + brShape(0, NEW, 6) + brShape(1, NEW, 6)), text: T('Dans la première case, dessine un rond. Dans la deuxième, un triangle.', 'In the first box, draw a circle. In the second, a triangle.') },
  { svg: S(strip + cellLines(INK, 4) + [0, 1].map((i) => brShape(i, INK, 5)).join('') + [2, 3, 4, 5, 6, 7].map((i) => brShape(i, NEW, 6)).join('')), text: T('Continue la suite jusqu’au bout : rond, triangle, rond, triangle…', 'Continue the sequence to the end: circle, triangle, circle, triangle…') },
  { svg: S(strip + cellLines(INK, 4) + [0, 1, 2, 3, 4, 5, 6, 7].map((i) => brShape(i, INK, 5, i % 2 ? BLU : RED)).join('')), text: T('Colorie en suivant aussi une suite de couleurs : rouge, bleu, rouge, bleu…', 'Colour following a colour sequence too: red, blue, red, blue…') },
  { svg: S(ov(200, 150, 130, 60, 'none', INK, 40) + ov(200, 150, 130, 60, 'none', CRM, 32) + `<ellipse cx="200" cy="150" rx="130" ry="60" fill="none" stroke="${RED}" stroke-width="16" stroke-dasharray="22 22"/><ellipse cx="200" cy="150" rx="130" ry="60" fill="none" stroke="${BLU}" stroke-width="16" stroke-dasharray="22 22" stroke-dashoffset="22"/>` + re(310, 120, 30, 50, '#e8e8e8', NEW, 4, 3)),
    text: T('Enroule la bande autour de ton poignet et ferme-la avec du ruban adhésif. Ton bracelet est prêt!', 'Wrap the strip around your wrist and close it with tape. Your bracelet is ready!') },
]);

// ================= 10. La symétrie =================
const WING = 'M196 150C150 50 50 60 76 140C50 200 140 240 196 170Z';
const butterfly = (axis = true) => sh(WING, ORA) + ci(120, 120, 16, YEL, INK, 3) + ci(140, 185, 10, RED, INK, 3) + g('translate(400 0) scale(-1 1)', sh(WING, ORA) + ci(120, 120, 16, YEL, INK, 3) + ci(140, 185, 10, RED, INK, 3)) + ov(200, 155, 9, 50, BRN, INK, 4) + ln('M196 108q-16-40-34-46M204 108q16-40 34-46', INK, 4) + (axis ? dl('M200 20V290', NEW, 5) : '');
const BLOBS = [[170, 110, 24, RED], [150, 175, 18, YEL], [178, 215, 14, BLU], [128, 125, 12, YEL]];
const blobs = (mirror) => BLOBS.map(([x, y, r, c]) => ci(x, y, r, c, 'none', 0) + (mirror ? ci(400 - x, y, r, c, 'none', 0) : '')).join('');
const L10 = lesson('symetrie', '🦋', T('La symétrie', 'Symmetry'),
  T('Je vais apprendre à reconnaître et à créer une image symétrique.', 'I will learn to recognize and create a symmetrical picture.'),
  [V('symétrie', 'symmetry', 'Quand les deux moitiés d’une image sont pareilles, comme dans un miroir.', 'When both halves of a picture are the same, like in a mirror.'),
    V('axe de symétrie', 'line of symmetry', 'La ligne du milieu qui coupe l’image en deux moitiés pareilles.', 'The middle line that cuts the picture into two matching halves.'),
    V('moitié', 'half', 'Une des deux parties égales d’une chose.', 'One of the two equal parts of something.'),
    V('reflet', 'reflection', 'L’image qu’on voit dans un miroir ou dans l’eau.', 'The picture you see in a mirror or in water.')],
  [SL(S(butterfly(true)), 'Une image est symétrique quand ses deux moitiés sont pareilles, comme dans un miroir.', 'A picture is symmetrical when its two halves are the same, like in a mirror.'),
    SL(S(ov(200, 150, 80, 100, SKIN) + ci(170, 130, 9, INK, 'none', 0) + ci(230, 130, 9, INK, 'none', 0) + ln('M150 108q20-12 40 0M210 108q20-12 40 0', INK, 5) + ln('M200 140v30', INK, 4) + ln('M170 195q30 20 60 0', INK, 5) + ov(118, 150, 10, 20, SKIN) + ov(282, 150, 10, 20, SKIN) + dl('M200 30V280', NEW, 5)),
      'La ligne du milieu s’appelle l’axe de symétrie. Ton visage est presque symétrique!', 'The middle line is called the line of symmetry. Your face is almost symmetrical!'),
    SL(S(g('translate(-20 0) scale(.55)', paper(40, 40, 320, 220) + dl('M200 40V260', INK, 5) + blobs(false)) + arr(185, 150, 205, 120, 225, 150) + g('translate(185 0) scale(.55)', paper(40, 40, 320, 220) + dl('M200 40V260', INK, 5) + blobs(true))),
      'Si on peint sur une moitié et qu’on plie la feuille, la peinture se copie de l’autre côté!', 'If you paint on one half and fold the paper, the paint copies itself onto the other side!'),
    SL(S(paper(40, 60, 100, 180, PNK) + dl('M140 60V240', INK, 4) + dl('M140 100C100 60 50 110 80 160L140 220', NEW, 5) + arr(160, 150, 185, 120, 210, 150) + sh('M300 100C340 60 390 110 360 160L300 220L240 160C210 110 260 60 300 100Z', RED) + dl('M300 90V230', INK, 3)),
      'On peut aussi plier et découper : une moitié de cœur devient un cœur entier.', 'You can also fold and cut: half a heart becomes a whole heart.')],
  { type: 'symmetry', q: Q('Touche les cases pour compléter l’autre moitié, comme dans un miroir.', 'Tap the squares to complete the other half, like in a mirror.'),
    puzzles: [
      { rows: ['011', '111', '111', '011', '001'], color: RED },
      { rows: ['001', '011', '111', '001', '001'], color: GRN },
      { rows: ['1100', '1110', '0111', '0111', '1110', '1100'], color: VIO },
    ] },
  [T('Ton papillon est-il pareil des deux côtés?', 'Is your butterfly the same on both sides?'),
    T('Trouve une chose symétrique dans la maison.', 'Find something symmetrical in your home.'),
    T('Les lettres A et H sont-elles symétriques?', 'Are the letters A and H symmetrical?')]);
const PB = paper(40, 40, 320, 220);
const P10 = proj('symetrie', '🦋', T('Un papillon miroir', 'A mirror butterfly'), 1, 15, 'animaux', [M.papier, T('Gouache de 2 ou 3 couleurs', 'Poster paint in 2 or 3 colours'), M.pinceau, M.journal, M.noir], [
  { svg: S(PB + dl('M200 40V260', NEW, 6) + arr(330, 90, 270, 30, 210, 80)), text: T('Plie ta feuille en deux, puis ouvre-la. Le pli, c’est l’axe de symétrie.', 'Fold your paper in half, then open it. The fold is the line of symmetry.') },
  { svg: S(PB + dl('M200 40V260', INK, 4) + blobs(false) + BLOBS.map(([x, y, r]) => ci(x, y, r + 5, 'none', NEW, 4)).join('')), text: T('Sur une seule moitié, près du pli, mets de grosses gouttes de gouache.', 'On one half only, near the fold, put big drops of paint.') },
  { svg: S(paper(200, 40, 160, 220) + arr(150, 150, 170, 90, 240, 100) + ln('M250 140a30 30 0 1 1 60 0a30 30 0 1 1 -60 0', NEW, 6)), text: T('Referme la feuille et frotte fort avec ta main, partout.', 'Close the paper and rub hard with your hand, all over.') },
  { svg: S(PB + dl('M200 40V260', INK, 4) + blobs(true) + BLOBS.map(([x, y, r]) => ci(400 - x, y, r + 5, 'none', NEW, 4)).join('')), text: T('Ouvre doucement… Surprise! La peinture s’est copiée de l’autre côté.', 'Open it slowly… Surprise! The paint copied itself onto the other side.') },
  { svg: S(PB + blobs(true) + ln(WING, NEW, 6) + g('translate(400 0) scale(-1 1)', ln(WING, NEW, 6)) + ov(200, 155, 9, 50, 'none', NEW, 6) + ln('M196 108q-16-40-34-46M204 108q16-40 34-46', NEW, 5)), text: T('Quand c’est sec, dessine au feutre noir les ailes autour des taches, le corps et les antennes sur le pli.', 'When it’s dry, draw the wings around the blots, the body and the antennae on the fold with black marker.') },
  { svg: S(PB + sh(WING, '#ffd8a8') + g('translate(400 0) scale(-1 1)', sh(WING, '#ffd8a8')) + blobs(true) + ov(200, 155, 9, 50, BRN, INK, 4) + ln('M196 108q-16-40-34-46M204 108q16-40 34-46', INK, 4)), text: T('Colorie le reste des ailes. Ton papillon miroir est parfaitement symétrique!', 'Colour the rest of the wings. Your mirror butterfly is perfectly symmetrical!') },
]);

// ================= 11. Le collage =================
const ALG = 'M30 200C10 170 40 150 20 120S-10 90 20 60S0 20 30 0C50 30 40 50 55 70S70 110 50 140S60 180 30 200Z';
const alg = (x, y, s, c, st = 'none', w = 0) => g(`translate(${x} ${y}) scale(${s})`, sh(ALG, c, st, w));
const drop = (x, y, s, c, st = 'none', w = 0) => g(`translate(${x} ${y}) scale(${s})`, sh('M0 -20C10 -5 14 4 0 14C-14 4 -10 -5 0 -20Z', c, st, w));
const COLL = S(re(0, 0, 400, 300, CRM, 'none', 0, 0) + re(200, 170, 60, 40, ORA, INK, 3, 0) + re(90, 150, 40, 70, VIO, INK, 3, 0) + sh('M230 290C200 270 220 240 250 250S300 270 280 290Z', GRN, INK, 3) + alg(330, 110, 0.6, '#1e5bb8', INK, 4)
  + ci(70, 70, 30, RED, INK, 3) + ci(300, 230, 25, BLU, INK, 3) + ci(180, 245, 20, YEL, INK, 3) + ci(345, 50, 22, GRN, INK, 3)
  + po('130,130 190,130 160,80', YEL, INK, 3) + po('250,80 310,80 280,140', RED, INK, 3) + po('40,280 100,280 70,220', BLU, INK, 3));
const L11 = lesson('collage', '✂️', T('Le collage', 'Collage'),
  T('Je vais apprendre à découper, déchirer et composer un collage.', 'I will learn to cut, tear and arrange a collage.'),
  [V('collage', 'collage', 'Une œuvre faite en collant des morceaux de papier.', 'An artwork made by gluing pieces of paper.'),
    V('découper', 'to cut out', 'Couper avec des ciseaux en suivant une ligne.', 'To cut with scissors along a line.'),
    V('déchirer', 'to tear', 'Séparer le papier avec ses doigts. Les bords sont irréguliers.', 'To pull paper apart with your fingers. The edges are uneven.'),
    V('composition', 'composition', 'La façon de placer les morceaux sur la feuille.', 'The way the pieces are placed on the page.')],
  [SL(S(paper(60, 50, 200, 200, YEL) + po(star(160, 150, 80, 34), 'none', NEW, 5).replace('stroke-width="5"', 'stroke-width="5" stroke-dasharray="10 8"') + scissors(300, 160, -60) + arr(330, 250, 280, 290, 220, 270)),
    'Découper, c’est couper avec des ciseaux en suivant une ligne. Truc : tourne la feuille, pas les ciseaux!', 'Cutting means following a line with scissors. Tip: turn the paper, not the scissors!'),
  SL(S(re(40, 70, 140, 160, BLU, INK, 4, 0) + sh('M230 80L250 72L262 86L280 70L300 84L322 70L340 82L356 74L362 100L350 120L364 140L352 162L366 186L354 210L362 230L340 226L320 236L300 224L280 236L258 226L236 234L240 210L228 186L240 160L226 136L238 110L226 92Z', GRN)),
    'Découper fait des bords nets et droits. Déchirer avec les doigts fait des bords irréguliers, tout doux.', 'Cutting makes clean, straight edges. Tearing with your fingers makes uneven, soft edges.'),
  SL(S(re(30, 30, 160, 240, '#1e5bb8', 'none', 0, 0) + alg(80, 50, 1, WHT) + re(210, 30, 160, 240, '#ffb000', 'none', 0, 0) + alg(250, 80, 0.8, RED) + po(star(330, 70, 26, 11), WHT, 'none', 0) + drop(250, 240, 1.4, '#1e5bb8') + drop(130, 240, 1.2, '#ffb000') + ci(340, 230, 14, WHT, 'none', 0)),
    'Le peintre Henri Matisse faisait de grands collages avec des formes découpées dans du papier peint à la gouache.', 'The painter Henri Matisse made big collages with shapes cut out of paper painted with gouache.'),
  SL(S(paper(40, 40, 220, 220, '#ffe1ea') + alg(70, 60, 0.9, GRN, INK, 3) + ci(200, 100, 26, YEL, INK, 3) + po(star(190, 210, 30, 13), BLU, INK, 3) + arr(300, 90, 260, 70, 230, 95) + arr(310, 230, 270, 260, 225, 220) + glue(330, 120)),
    'Avant de coller, place tes morceaux et déplace-les jusqu’à ce que tu aimes ta composition.', 'Before gluing, place your pieces and move them until you like your composition.')],
  { type: 'spot', rounds: [
    { q: Q('Touche tous les cercles du collage.', 'Tap all the circles in the collage.'), svg: COLL, targets: [[70, 70, 30], [300, 230, 25], [180, 245, 20], [345, 50, 22]] },
    { q: Q('Maintenant, touche tous les triangles.', 'Now tap all the triangles.'), svg: COLL, targets: [[160, 113, 30], [280, 100, 30], [70, 258, 30]] },
  ] },
  [T('As-tu préféré découper ou déchirer? Pourquoi?', 'Did you prefer cutting or tearing? Why?'),
    T('Où as-tu placé ta plus grande forme?', 'Where did you put your biggest shape?'),
    T('Si tu recommençais, que changerais-tu dans ta composition?', 'If you started again, what would you change in your composition?')]);
const BGc = paper(60, 30, 280, 240, '#1e5bb8');
const smalls = (st = 'none', w = 0) => po(star(270, 70, 24, 10), YEL, st, w) + ci(290, 220, 14, ORA, st, w) + drop(120, 230, 1.3, PNK, st, w) + po(star(230, 160, 16, 7), WHT, st, w);
const P11 = proj('collage', '🌿', T('Un collage à la Matisse', 'A Matisse-style collage'), 2, 25, 'nature', [T('Grande feuille de couleur pour le fond', 'A big sheet of coloured paper for the background'), M.papierCouleur, M.magazines, M.ciseaux, M.colle], [
  { svg: S(BGc + re(60, 30, 280, 240, 'none', NEW, 6, 3)), text: T('Choisis une grande feuille de couleur pour le fond.', 'Choose a big sheet of coloured paper for the background.') },
  { svg: S(paper(40, 40, 140, 220, WHT) + alg(70, 50, 0.9, WHT, NEW, 5) + dl('M70 50h100', GRY, 2) + scissors(220, 150, -40) + alg(260, 50, 0.9, WHT, INK, 4)), text: T('Dans une autre couleur, découpe de grandes formes libres, comme des algues ou des feuilles.', 'In another colour, cut out big free shapes, like seaweed or leaves.') },
  { svg: S(smalls(NEW, 4).replace(/translate\(120 230\)/, 'translate(110 120)') + scissors(120, 250, 20)), text: T('Découpe aussi des petites formes : des étoiles, des ronds, des gouttes.', 'Also cut out small shapes: stars, circles, drops.') },
  { svg: S(BGc + alg(90, 50, 1, WHT, INK, 2) + alg(200, 90, 0.8, '#7fd6a0', INK, 2) + smalls(INK, 2) + arr(370, 120, 340, 60, 300, 75) + arr(30, 270, 50, 230, 100, 230)), text: T('Place les morceaux sur le fond, sans colle. Déplace-les jusqu’à ce que tu aimes ta composition.', 'Place the pieces on the background, without glue. Move them until you like your composition.') },
  { svg: S(BGc + alg(90, 50, 1, WHT, NEW, 4) + alg(200, 90, 0.8, '#7fd6a0', NEW, 4) + glue(372, 200)), text: T('Colle les grandes formes en premier. Mets de la colle partout, jusqu’au bord.', 'Glue the big shapes first. Put glue everywhere, right to the edge.') },
  { svg: S(BGc + alg(90, 50, 1, WHT) + alg(200, 90, 0.8, '#7fd6a0') + smalls()), text: T('Colle les petites formes par-dessus. Ton collage à la Matisse est fini!', 'Glue the small shapes on top. Your Matisse-style collage is finished!') },
]);

// ================= 12. Le volume (modelage) =================
const tube = (d, c, w = 22) => ln(d, INK, w + 7) + ln(d, c, w);
const ball = (x, y, r, c) => ci(x, y, r, c, INK, 4) + ov(x - r * 0.35, y - r * 0.4, r * 0.25, r * 0.15, WHT, 'none', 0);
const slab = (x, y, rx, ry, c, top = c) => ov(x, y + ry * 0.5, rx, ry, c, INK, 4) + ov(x, y, rx, ry, top, INK, 4);
const VO = {
  bille: ball(50, 50, 22, BLU), orange: ball(50, 52, 34, ORA) + ln('M50 18l4-8', GRN, 4), pois: ball(30, 56, 14, GRN) + ball(56, 56, 14, GRN) + ball(78, 50, 12, GRN),
  serpent: tube('M10 70Q30 40 50 60T90 40', GRN, 14) + ci(88, 38, 2, INK, 'none', 0), ver: tube('M12 50Q30 30 50 50T88 50', PNK, 12), spaghetti: tube('M10 30Q40 20 30 50T60 70T90 60', YEL, 7),
  crepe: slab(50, 50, 40, 14, '#e8c070', '#f3d58a'), biscuit: slab(50, 50, 36, 13, '#b07a3c', '#c98d4a') + [[38, 46], [56, 52], [64, 44], [46, 56]].map(([x, y]) => ci(x, y, 3, '#5a3418', 'none', 0)).join(''),
  tuile: po('14,56 64,40 88,52 38,70', '#d6604a', INK, 4) + po('14,56 38,70 38,78 14,64', '#a8432f', INK, 4) + po('38,70 88,52 88,60 38,78', '#b84c36', INK, 4),
};
const palm = (x, y, rot) => g(`translate(${x} ${y}) rotate(${rot})`, sh('M-40 -20Q-44 -40 -20 -40H40Q54 -40 54 -26V14Q54 26 40 26H-30Q-44 26 -40 6Z', SKIN));
const L12 = lesson('volume', '🐌', T('Le volume', 'Volume'),
  T('Je vais apprendre à modeler une boule, un boudin et une plaque.', 'I will learn to model a ball, a coil and a slab.'),
  [V('volume', 'volume', 'Une forme qui a une épaisseur : on peut en faire le tour et la toucher de tous les côtés.', 'A shape with thickness: you can walk around it and touch it on all sides.'),
    V('modeler', 'to model', 'Donner une forme à la pâte avec ses mains.', 'To shape dough with your hands.'),
    V('boule', 'ball', 'Une forme toute ronde, de tous les côtés.', 'A shape that is round on all sides.'),
    V('boudin', 'coil', 'Une forme longue et ronde, comme un serpent.', 'A long, round shape, like a snake.'),
    V('plaque', 'slab', 'Une forme plate, comme une crêpe.', 'A flat shape, like a pancake.')],
  [SL(S(re(40, 90, 80, 80, LBL, INK, 4, 0) + ci(160, 130, 40, PNK) + arr(205, 130, 225, 100, 245, 130) + po('270,110 330,110 330,170 270,170', LBL, INK, 4) + po('270,110 300,90 360,90 330,110', '#cfe3fb', INK, 4) + po('330,110 360,90 360,150 330,170', '#6fa0dc', INK, 4) + ball(310, 235, 38, PNK)),
    'Un dessin est plat. Une sculpture a du volume : on peut en faire le tour et la toucher de tous les côtés.', 'A drawing is flat. A sculpture has volume: you can walk around it and touch it on all sides.'),
  SL(S(palm(200, 80, 180) + ball(200, 150, 34, ORA) + palm(200, 222, 0) + arr(110, 110, 80, 150, 110, 190) + arr(290, 190, 320, 150, 290, 110)),
    'Pour faire une boule, roule la pâte entre tes deux mains, en faisant des ronds.', 'To make a ball, roll the dough between your two hands in circles.'),
  SL(S(re(20, 220, 360, 20, '#d9c3a0', INK, 4, 2) + tube('M80 195H320', ORA, 30) + palm(200, 150, 0) + arr(120, 90, 90, 70, 60, 95) + arr(280, 90, 310, 70, 340, 95)),
    'Pour faire un boudin, roule la pâte sur la table avec tes mains, vers l’avant et vers l’arrière.', 'To make a coil, roll the dough on the table with your hands, forwards and backwards.'),
  SL(S(re(20, 230, 360, 20, '#d9c3a0', INK, 4, 2) + ball(100, 200, 30, ORA) + palm(100, 120, 0) + ln('M100 150v14', NEW, 6) + arr(150, 200, 200, 170, 240, 200) + slab(300, 214, 60, 14, '#e06b00', ORA)),
    'Pour faire une plaque, écrase une boule avec la paume de ta main.', 'To make a slab, squash a ball with the palm of your hand.'),
  SL(S(ball(80, 230, 40, WHT) + ball(80, 165, 30, WHT) + ball(80, 115, 22, WHT) + po('80,112 104,118 80,122', ORA, INK, 2) + tube('M160 250Q190 200 220 240T290 220', GRN, 18) + slab(340, 236, 44, 15, '#b07a3c', '#c98d4a')),
    'Avec des boules, des boudins et des plaques, on peut tout modeler!', 'With balls, coils and slabs, you can model anything!')],
  { type: 'sort', q: Q('Range chaque objet : boule, boudin ou plaque?', 'Sort each object: ball, coil or slab?'),
    bins: [{ id: 'b', label: T('Boule', 'Ball'), icon: I(VO.bille) }, { id: 'u', label: T('Boudin', 'Coil'), icon: I(VO.ver) }, { id: 'p', label: T('Plaque', 'Slab'), icon: I(VO.crepe) }],
    items: [['orange', 'b'], ['pois', 'b'], ['serpent', 'u'], ['spaghetti', 'u'], ['biscuit', 'p'], ['tuile', 'p']].map(([k, b]) => ({ svg: I(VO[k]), bin: b })) },
  [T('Quelle forme était la plus facile à modeler?', 'Which shape was the easiest to model?'),
    T('Ton escargot tient-il debout tout seul?', 'Does your snail stand up on its own?'),
    T('Quel autre animal pourrais-tu faire avec des boudins?', 'What other animal could you make with coils?')]);
const SHELL = g('translate(80 60) scale(2.2)', ln(SPI, INK, 7.5) + ln(SPI, ORA, 4.5));
const BODY = tube('M70 240H300Q330 240 332 205', GRN, 26);
const ANT = tube('M322 196L310 158M340 196L352 158', GRN, 8) + ball(310, 154, 9, GRN) + ball(352, 154, 9, GRN);
const P12 = proj('volume', '🐌', T('Un escargot en pâte à modeler', 'A play dough snail'), 1, 15, 'animaux', [M.pate, M.cure, T('Un napperon ou une assiette', 'A placemat or a plate')], [
  { svg: S(tube('M60 150H340', ORA, 22) + palm(200, 95, 0) + arr(120, 60, 90, 40, 60, 65) + arr(280, 60, 310, 40, 340, 65)), text: T('Roule un long boudin avec la pâte pour la coquille.', 'Roll a long coil of dough for the shell.') },
  { svg: S(SHELL + arr(330, 80, 360, 140, 320, 200)), text: T('Enroule le boudin sur lui-même, en commençant par un bout : c’est une spirale!', 'Roll the coil up on itself, starting at one end: it’s a spiral!') },
  { svg: S(tube('M70 240H300Q330 240 332 205', GRN, 26) + ln('M70 240H300Q330 240 332 205', NEW, 4)), text: T('Avec l’autre couleur, roule un boudin plus gros pour le corps. Relève un bout pour la tête.', 'With the other colour, roll a thicker coil for the body. Lift one end for the head.') },
  { svg: S(BODY + SHELL + arr(200, 40, 240, 20, 260, 50)), text: T('Pose la coquille sur le corps et appuie doucement pour la coller.', 'Put the shell on the body and press gently to stick it.') },
  { svg: S(BODY + SHELL + ANT + ci(331, 176, 34, 'none', NEW, 5)), text: T('Fais deux petits boudins pour les antennes et deux petites boules pour les yeux.', 'Make two little coils for the antennae and two little balls for the eyes.') },
  { svg: S(BODY + SHELL + ANT + ln('M326 214q8 6 14-2', INK, 3) + ln('M120 248v-6M160 248v-6M200 248v-6M240 248v-6', '#2a7a3a', 3) + ci(310, 154, 3, INK, 'none', 0) + ci(352, 154, 3, INK, 'none', 0)), text: T('Avec le cure-dent, dessine un sourire et des petites lignes. Ton escargot a du volume!', 'With the toothpick, draw a smile and little lines. Your snail has volume!') },
]);

// ================= 13. L’observation =================
const APPLE = 'M200 90C240 60 300 80 300 150C300 220 250 250 200 235C150 250 100 220 100 150C100 80 160 60 200 90Z';
const spotHouse = (dx, d) => ln(`M${dx} 250h190`, INK, 4) + re(dx + 20, 150, 80, 100, '#ffb36b', INK, 4, 2) + po(pt(dx + 12, 150, dx + 108, 150, dx + 60, 105), RED, INK, 4) + (d ? '' : re(dx + 35, 162, 22, 22, LBL, INK, 3, 2)) + re(dx + 68, 200, 22, 50, d ? BLU : BRN, INK, 3, 2) + (d ? '' : sun(dx + 158, 40, 16)) + re(dx + 140, 180, 12, 70, BRN, INK, 3, 2) + ci(dx + 146, 158, 30, GRN, INK, 4) + (d ? '' : ci(dx + 136, 152, 6, RED, INK, 2) + ci(dx + 158, 165, 6, RED, INK, 2));
const snowman = (dx, d) => ci(dx + 95, 225, 46, WHT, INK, 4) + ci(dx + 95, 150, 34, WHT, INK, 4) + ci(dx + 95, 90, 26, WHT, INK, 4) + ci(dx + 86, 84, 3, INK, 'none', 0) + ci(dx + 104, 84, 3, INK, 'none', 0) + po(pt(dx + 95, 92, dx + 120, 96, dx + 95, 100), ORA, INK, 2)
  + re(dx + 66, 112, 58, 12, d ? BLU : RED, INK, 3, 4) + ci(dx + 95, 140, 4, INK, 'none', 0) + (d ? '' : ci(dx + 95, 160, 4, INK, 'none', 0)) + ci(dx + 95, 210, 4, INK, 'none', 0)
  + (d ? '' : ln(`M${dx + 62} 145L${dx + 30} 125M${dx + 40} 131L${dx + 32} 115`, BRN, 4)) + ln(`M${dx + 128} 145L${dx + 160} 125M${dx + 150} 131L${dx + 158} 115`, BRN, 4) + (d ? '' : re(dx + 75, 50, 40, 20, BLK, INK, 3, 2) + re(dx + 66, 68, 58, 6, BLK, INK, 3, 2));
const spotPair = (f) => S(f(0, false) + f(210, true) + dl('M200 10V290', GRY, 3));
const L13 = lesson('observation', '👀', T('L’observation', 'Observation'),
  T('Je vais apprendre à bien observer un modèle pour le dessiner.', 'I will learn to look carefully at a model to draw it.'),
  [V('observer', 'to observe', 'Regarder longtemps et attentivement.', 'To look for a long time and carefully.'),
    V('modèle', 'model', 'La vraie chose qu’on regarde pour la dessiner.', 'The real thing you look at to draw it.'),
    V('détail', 'detail', 'Une petite partie qu’on remarque quand on regarde bien.', 'A small part you notice when you look closely.'),
    V('ombre', 'shadow', 'La partie plus foncée, là où la lumière n’arrive pas.', 'The darker part, where the light doesn’t reach.')],
  [SL(S(sh('M30 150Q80 90 130 150Q80 210 30 150Z', WHT) + ci(80, 150, 20, '#4a8bd6', INK, 3) + ci(80, 150, 8, INK, 'none', 0) + arr(140, 150, 170, 120, 200, 150) + g('translate(130 0) scale(.75)', sh(APPLE, RED)) + re(300, 160, 80, 100, WHT, INK, 3, 3)),
    'Un artiste regarde son modèle plus souvent que sa feuille. Il observe longtemps avant de dessiner.', 'An artist looks at the model more often than at the paper. They observe for a long time before drawing.'),
  SL(S(ln(APPLE, NEW, 5).replace('stroke-width="5"', 'stroke-width="5" stroke-dasharray="14 8"')),
    'Commence par la grande forme, en traçant légèrement. Une pomme n’est pas un cercle parfait!', 'Start with the big shape, drawing lightly. An apple is not a perfect circle!'),
  SL(S(ln(APPLE, INK, 5) + ln('M200 92Q198 70 210 52', BRN, 6) + sh('M210 70Q240 50 262 64Q236 84 210 70Z', GRN, NEW, 4) + ci(160, 180, 6, 'none', NEW, 4)),
    'Ensuite, ajoute les détails : la queue, la feuille, une petite tache.', 'Then add the details: the stem, the leaf, a little spot.'),
  SL(S(ov(230, 248, 100, 14, '#c9c9c9', 'none', 0) + sh(APPLE, RED) + sh('M250 80C300 90 310 200 250 232C285 190 290 120 250 80Z', '#9e1b28', 'none', 0) + ov(150, 120, 14, 24, WHT, 'none', 0) + ln('M200 92Q198 70 210 52', BRN, 6) + sun(50, 50, 22) + dl('M80 80L130 120', ORA, 4)),
    'Regarde d’où vient la lumière. Le côté opposé est plus foncé : c’est l’ombre. Le petit coin blanc, c’est le reflet.', 'Look where the light comes from. The opposite side is darker: that’s the shadow. The little white spot is the shine.')],
  { type: 'spot', rounds: [
    { q: Q('Observe bien! Touche les 4 différences dans l’image de droite.', 'Look closely! Tap the 4 differences in the picture on the right.'), svg: spotPair(spotHouse), targets: [[256, 173, 20], [289, 225, 24], [368, 40, 28], [356, 158, 28]] },
    { q: Q('Encore! Trouve les 4 différences dans le bonhomme de droite.', 'Again! Find the 4 differences in the snowman on the right.'), svg: spotPair(snowman), targets: [[305, 58, 26], [305, 118, 28], [305, 160, 18], [252, 132, 26]] },
  ] },
  [T('Combien de fois as-tu regardé ton fruit pendant que tu dessinais?', 'How many times did you look at your fruit while drawing?'),
    T('Quel détail as-tu remarqué que tu n’avais jamais vu?', 'What detail did you notice that you had never seen before?')]);
const apL = [
  (c, w) => ln(APPLE, c, w),
  (c, w) => ln('M200 92Q198 70 210 52', c, w) + ln('M210 70Q240 50 262 64Q236 84 210 70Z', c, w),
  (c, w) => ov(150, 120, 14, 24, 'none', c, w - 3),
  (c, w) => ov(230, 250, 100, 12, 'none', c, w - 3),
];
const P13 = proj('observation', '🍎', T('Dessine un vrai fruit', 'Draw a real fruit'), 2, 20, 'nourriture', [M.fruit, M.papier, M.crayon, M.gomme, M.couleurs], [
  { svg: S(re(0, 200, 400, 100, '#e6cfa8', 'none', 0, 0) + re(250, 30, 120, 110, SKY, INK, 4, 2) + ln('M310 30V140M250 85H370', INK, 4) + g('translate(40 120) scale(.45)', sh(APPLE, RED) + ln('M200 92Q198 70 210 52', BRN, 8)) + sh('M110 70Q150 40 190 70Q150 100 110 70Z', WHT) + ci(150, 70, 12, '#4a8bd6', INK, 3)),
    text: T('Pose un vrai fruit sur la table, près d’une fenêtre. Regarde-le pendant une minute, sans dessiner.', 'Put a real fruit on the table, near a window. Look at it for one minute, without drawing.') },
  ...mk(prog('', apL), [
    T('Dessine légèrement la grande forme du fruit. Regarde-le souvent!', 'Lightly draw the big shape of the fruit. Look at it often!'),
    T('Ajoute la queue et la feuille. Observe bien leur forme.', 'Add the stem and the leaf. Look closely at their shape.'),
    T('Trouve le reflet de lumière et dessine son contour. Tu le laisseras blanc.', 'Find the shine and draw its outline. You will leave it white.'),
    T('Dessine l’ombre sur la table, du côté opposé à la lumière.', 'Draw the shadow on the table, on the side away from the light.')]),
  { svg: S(ov(230, 250, 100, 12, 'none', INK, 3) + sh(APPLE, RED) + ov(150, 120, 14, 24, WHT, INK, 3) + sh('M210 70Q240 50 262 64Q236 84 210 70Z', GRN) + ln('M200 92Q198 70 210 52', BRN, 6)),
    text: T('Colorie le fruit de sa vraie couleur, sans toucher au reflet.', 'Colour the fruit its real colour, without touching the shine.') },
  { svg: S(ov(230, 250, 100, 12, '#bdbdbd', 'none', 0) + sh(APPLE, RED) + sh('M250 80C300 90 310 200 250 232C285 190 290 120 250 80Z', '#9e1b28', 'none', 0) + ov(150, 120, 14, 24, WHT, 'none', 0) + sh('M210 70Q240 50 262 64Q236 84 210 70Z', GRN) + ln('M200 92Q198 70 210 52', BRN, 6) + ln(APPLE, INK, 3)),
    text: T('Appuie plus fort sur le côté sombre pour faire l’ombre. Compare avec ton vrai fruit!', 'Press harder on the dark side to make the shadow. Compare with your real fruit!') },
]);

// ================= 14. Le portrait =================
const face = (x, y, o = {}) => {
  const e = o.eyes ?? 0.5, ey = y - 66 + 132 * e, ny = ey + (y + 66 - ey) * 0.42, my = ny + (y + 66 - ny) * 0.42, ery = y - 66 + 132 * (o.ears ?? e + 0.08);
  const mouth = o.mouth === 'o' ? ci(x, my + 4, 9, '#c0392b', INK, 3) : o.mouth === 'sad' ? ln(`M${x - 16} ${r1(my + 8)}Q${x} ${r1(my - 6)} ${x + 16} ${r1(my + 8)}`, INK, 4) : ln(`M${x - 18} ${r1(my)}Q${x} ${r1(my + 16)} ${x + 18} ${r1(my)}`, INK, 4);
  const by = ey - (o.mouth === 'o' ? 22 : 13), brow = o.mouth === 'sad' ? `M${x - 30} ${r1(by + 3)}L${x - 12} ${r1(by - 4)}M${x + 30} ${r1(by + 3)}L${x + 12} ${r1(by - 4)}` : `M${x - 30} ${r1(by)}Q${x - 21} ${r1(by - 7)} ${x - 12} ${r1(by)}M${x + 12} ${r1(by)}Q${x + 21} ${r1(by - 7)} ${x + 30} ${r1(by)}`;
  return ov(x - 52, ery, 9, 15, SKIN, INK, 4) + ov(x + 52, ery, 9, 15, SKIN, INK, 4) + ov(x, y, 52, 66, SKIN, INK, 5) + sh(`M${x - 50} ${y - 20}C${x - 56} ${y - 86} ${x + 56} ${y - 86} ${x + 50} ${y - 20}C${x + 36} ${y - 54} ${x - 36} ${y - 54} ${x - 50} ${y - 20}Z`, BRN, INK, 4)
    + ci(x - 20, ey, 6, INK, 'none', 0) + ci(x + 20, ey, 6, INK, 'none', 0) + ln(brow, INK, 4) + ln(`M${x - 2} ${r1(ny - 16)}L${x - 8} ${r1(ny)}H${x + 4}`, INK, 3) + mouth;
};
const FS = (o) => S(g('translate(200 160) scale(1.65) translate(-200 -150)', face(200, 150, o)));
const L14 = lesson('portrait', '🙂', T('Le portrait', 'Portraits'),
  T('Je vais apprendre à placer les yeux, le nez, la bouche et les oreilles dans un visage.', 'I will learn where to place the eyes, nose, mouth and ears on a face.'),
  [V('portrait', 'portrait', 'Un dessin ou une peinture d’une personne.', 'A drawing or painting of a person.'),
    V('autoportrait', 'self-portrait', 'Un portrait de soi-même, qu’on fait en se regardant dans un miroir.', 'A portrait of yourself, made while looking in a mirror.'),
    V('proportions', 'proportions', 'La grandeur et la place des parties, les unes par rapport aux autres.', 'The size and place of the parts compared with each other.'),
    V('expression', 'expression', 'Ce que le visage montre : la joie, la surprise, la tristesse…', 'What the face shows: joy, surprise, sadness…')],
  [SL(S(ov(200, 150, 80, 110, SKIN, INK, 6) + ov(320, 230, 22, 30, CRM, INK, 4)),
    'Le visage a la forme d’un œuf : plus large en haut, plus étroit en bas, vers le menton.', 'A face is shaped like an egg: wider at the top, narrower at the bottom, by the chin.'),
  SL(S(ov(200, 150, 80, 110, SKIN, INK, 6) + dl('M110 150H290', NEW, 4) + sh('M146 150q18-14 36 0q-18 14-36 0Z', WHT, NEW, 4) + sh('M218 150q18-14 36 0q-18 14-36 0Z', WHT, NEW, 4) + ci(164, 150, 6, INK, 'none', 0) + ci(236, 150, 6, INK, 'none', 0)),
    'Surprise : les yeux sont au milieu de la tête, pas en haut!', 'Surprise: the eyes are in the middle of the head, not at the top!'),
  SL(S(ov(200, 150, 80, 110, SKIN, INK, 6) + dl('M110 150H290M140 200H260M150 230H250', GRY, 3) + ci(164, 150, 7, INK, 'none', 0) + ci(236, 150, 7, INK, 'none', 0) + ln('M198 160L190 200H208', NEW, 5) + ln('M175 228Q200 246 225 228', NEW, 6)),
    'Le nez est à mi-chemin entre les yeux et le menton. La bouche est entre le nez et le menton.', 'The nose is halfway between the eyes and the chin. The mouth is between the nose and the chin.'),
  SL(S(ov(116, 175, 13, 26, SKIN, NEW, 5) + ov(284, 175, 13, 26, SKIN, NEW, 5) + ov(200, 150, 80, 110, SKIN, INK, 6) + sh('M122 120C112 20 288 20 278 120C262 70 140 60 122 120Z', BRN, NEW, 5) + ci(164, 150, 7, INK, 'none', 0) + ci(236, 150, 7, INK, 'none', 0) + ln('M198 160L190 200H208', INK, 4) + ln('M175 228Q200 246 225 228', INK, 5)),
    'Les oreilles vont de la hauteur des yeux jusqu’au nez. Les cheveux commencent bien plus haut que les yeux.', 'The ears go from eye level down to the nose. The hair starts well above the eyes.'),
  SL(S(g('translate(72 150) scale(.9) translate(-200 -150)', face(200, 150)) + g('translate(200 150) scale(.9) translate(-200 -150)', face(200, 150, { mouth: 'o' })) + g('translate(328 150) scale(.9) translate(-200 -150)', face(200, 150, { mouth: 'sad' }))),
    'Les sourcils et la bouche montrent l’expression : joyeux, surpris ou triste.', 'The eyebrows and mouth show the expression: happy, surprised or sad.')],
  { type: 'quiz', rounds: [
    { q: Q('Dans quel visage les yeux sont-ils bien placés?', 'In which face are the eyes in the right place?'), opts: [{ svg: FS({ eyes: 0.25 }) }, { svg: FS(), ok: true }, { svg: FS({ eyes: 0.72 }) }] },
    { q: Q('Dans quel visage les oreilles sont-elles bien placées?', 'In which face are the ears in the right place?'), opts: [{ svg: FS({ ears: 0.15 }) }, { svg: FS({ ears: 0.88 }) }, { svg: FS(), ok: true }] },
    { q: Q('Quel visage est surpris?', 'Which face is surprised?'), opts: [{ svg: FS() }, { svg: FS({ mouth: 'o' }), ok: true }, { svg: FS({ mouth: 'sad' }) }] },
    { q: Q('Quel visage est triste?', 'Which face is sad?'), opts: [{ svg: FS({ mouth: 'sad' }), ok: true }, { svg: FS({ mouth: 'o' }) }, { svg: FS() }] },
  ] },
  [T('Où as-tu placé les yeux dans ton autoportrait?', 'Where did you put the eyes in your self-portrait?'),
    T('Quelle expression as-tu choisie?', 'Which expression did you choose?'),
    T('Qu’est-ce qui ressemble le plus à toi dans ton dessin?', 'What looks the most like you in your drawing?')]);
const ptL = [
  (c, w) => ov(200, 130, 62, 82, 'none', c, w),
  (c, w) => dl('M138 130H262', c, w - 3),
  (c, w) => ln('M162 130q14-10 28 0q-14 10-28 0ZM210 130q14-10 28 0q-14 10-28 0Z', c, w - 2) + ci(176, 130, 4, c, 'none', 0) + ci(224, 130, 4, c, 'none', 0),
  (c, w) => ln('M200 140L192 170H206', c, w - 2),
  (c, w) => ln('M180 188Q200 200 220 188', c, w - 2),
  (c, w) => ln('M138 125Q124 128 128 150Q132 168 142 166M262 125Q276 128 272 150Q268 168 258 166', c, w - 2),
  (c, w) => ln('M182 208V238M218 208V238M182 238Q120 245 100 290M218 238Q280 245 300 290', c, w - 2),
  (c, w) => ln('M138 120C128 36 272 36 262 120C250 80 160 70 138 120Z', c, w - 2),
];
const P14 = proj('portrait', '🪞', T('Mon autoportrait', 'My self-portrait'), 3, 30, 'personnages', [M.miroir, M.papier, M.crayon, M.gomme, M.couleurs], [
  ...mk(prog('', ptL), [
    T('Regarde-toi dans le miroir. Dessine un grand œuf pour ta tête.', 'Look at yourself in the mirror. Draw a big egg for your head.'),
    T('Trace une ligne légère au milieu de l’œuf.', 'Draw a light line across the middle of the egg.'),
    T('Dessine tes yeux sur la ligne. Laisse l’espace d’un œil entre les deux.', 'Draw your eyes on the line. Leave one eye’s width between them.'),
    T('Dessine le nez, à mi-chemin entre les yeux et le menton.', 'Draw the nose, halfway between the eyes and the chin.'),
    T('Dessine la bouche entre le nez et le menton. Souris!', 'Draw the mouth between the nose and the chin. Smile!'),
    T('Ajoute les oreilles, de la hauteur des yeux jusqu’au nez.', 'Add the ears, from eye level down to the nose.'),
    T('Dessine le cou et les épaules.', 'Draw the neck and shoulders.'),
    T('Dessine tes cheveux. Ils commencent bien plus haut que les yeux.', 'Draw your hair. It starts well above the eyes.')]),
  { svg: S(sh('M182 208V238Q120 245 100 290H300Q280 245 218 238V208Z', '#4f8ef7') + sh('M138 125Q124 128 128 150Q132 168 142 166ZM262 125Q276 128 272 150Q268 168 258 166Z', SKIN) + ov(200, 130, 62, 82, SKIN, INK, 5) + sh('M138 120C128 36 272 36 262 120C250 80 160 70 138 120Z', BRN) + sh('M162 130q14-10 28 0q-14 10-28 0ZM210 130q14-10 28 0q-14 10-28 0Z', WHT, INK, 4) + ci(176, 130, 5, '#2e6b3a', 'none', 0) + ci(224, 130, 5, '#2e6b3a', 'none', 0) + ln('M200 140L192 170H206', INK, 4) + sh('M180 188Q200 204 220 188Z', '#e0566e', INK, 4) + ci(165, 170, 9, '#ffb3b3', 'none', 0) + ci(235, 170, 9, '#ffb3b3', 'none', 0)),
    text: T('Efface la ligne du milieu et colorie ton portrait. C’est toi!', 'Erase the middle line and colour your portrait. It’s you!') },
]);

// ================= 15. Le paysage =================
const LAND = (k = 4) => S(re(0, 0, 400, 170, SKY, 'none', 0, 0) + re(0, 170, 400, 130, GRS, 'none', 0, 0) + ln('M0 170H400', k === 1 ? NEW : INK, k === 1 ? 7 : 4)
  + (k >= 2 ? mountain(90, 170, 170, 100, '#b3a8d6') + mountain(205, 170, 150, 80, '#a6b8d8') : '') + (k >= 2 ? sun(330, 55, 24) : '')
  + (k >= 3 ? house(290, 215, 0.7) + tree(230, 212, 0.6) + tree(355, 205, 0.5) : '')
  + (k >= 4 ? flower(60, 295, 1.8, RED) + flower(140, 300, 1.5, PNK) + ln(zig(300, 18, 8, 180, 400), '#3c8d2f', 3) : ''));
const L15 = lesson('paysage', '🏞️', T('Le paysage', 'Landscapes'),
  T('Je vais apprendre à organiser un paysage avec la ligne d’horizon, le premier plan et l’arrière-plan.', 'I will learn to organize a landscape with the horizon line, the foreground and the background.'),
  [V('paysage', 'landscape', 'Une image d’un lieu dehors : la campagne, la montagne, la mer, la ville.', 'A picture of an outdoor place: countryside, mountains, sea, city.'),
    V('ligne d’horizon', 'horizon line', 'La ligne où le ciel semble toucher la terre ou la mer.', 'The line where the sky seems to touch the land or the sea.'),
    V('premier plan', 'foreground', 'Le bas de l’image : ce qui est le plus près de nous.', 'The bottom of the picture: what is closest to us.'),
    V('arrière-plan', 'background', 'Le haut de l’image, près de l’horizon : ce qui est le plus loin.', 'The top of the picture, near the horizon: what is farthest away.')],
  [SL(LAND(1), 'La ligne d’horizon, c’est là où le ciel semble toucher la terre. Elle sépare le ciel et le sol.', 'The horizon line is where the sky seems to touch the land. It separates the sky and the ground.'),
    SL(LAND(2), 'À l’arrière-plan, juste sur l’horizon, on dessine ce qui est loin : des montagnes, des collines.', 'In the background, right on the horizon, we draw what is far away: mountains, hills.'),
    SL(LAND(3), 'Au plan du milieu, on dessine la maison et les arbres.', 'In the middle ground, we draw the house and the trees.'),
    SL(LAND(4), 'Au premier plan, en bas de la feuille, ce qui est tout près de nous : de grosses fleurs, de l’herbe.', 'In the foreground, at the bottom of the page, what is very close to us: big flowers, grass.')],
  { type: 'spot', rounds: [
    { q: Q('Touche la ligne d’horizon.', 'Tap the horizon line.'), svg: LAND(4), targets: [{ x: 0, y: 158, w: 400, h: 24 }] },
    { q: Q('Touche les deux montagnes de l’arrière-plan.', 'Tap the two mountains in the background.'), svg: LAND(4), targets: [[90, 130, 40], [205, 140, 36]] },
    { q: Q('Touche les grosses fleurs du premier plan.', 'Tap the big flowers in the foreground.'), svg: LAND(4), targets: [[60, 205, 40], [140, 225, 34]] },
  ] },
  [T('Qu’as-tu mis au premier plan? À l’arrière-plan?', 'What did you put in the foreground? In the background?'),
    T('Où as-tu placé ta ligne d’horizon?', 'Where did you put your horizon line?')]);
const flO = (x, y, s, c, w) => ln(`M${x} ${y}V${r1(y - 50 * s)}`, c, w) + [0, 1, 2, 3, 4].map((i) => ci(x + Math.cos(i * 1.2566) * 12 * s, y - 50 * s + Math.sin(i * 1.2566) * 12 * s, 9 * s, 'none', c, w - 2)).join('');
const pyL = [
  (c, w) => ln('M40 130H360', c, w),
  (c, w) => ln('M40 130L100 70L150 110L200 60L260 130', c, w),
  (c, w) => ln('M40 175Q150 140 260 170T360 165', c, w) + re(275, 125, 44, 36, 'none', c, w - 2, 1) + ln('M268 125L297 100L326 125', c, w - 2) + ln('M232 170V150', c, w - 2) + ci(232, 138, 14, 'none', c, w - 2),
  (c, w) => flO(90, 270, 1.6, c, w) + flO(170, 275, 1.2, c, w) + ln(zig(275, 16, 10, 220, 360), c, w - 3),
  (c, w) => ci(320, 55, 20, 'none', c, w - 2) + ln('M90 50q10-16 26-8q14-12 28 2q12 2 8 14h-60q-8-4-2-8Z', c, w - 3),
];
const P15 = proj('paysage', '⛰️', T('Mon paysage en trois plans', 'My three-ground landscape'), 3, 30, 'nature', [M.papier, M.crayon, M.regle, M.couleurs, M.cire], [
  ...mk(prog(paper(40, 20, 320, 260), pyL), [
    T('Trace la ligne d’horizon, un peu plus haut que le milieu de ta feuille.', 'Draw the horizon line a little above the middle of your paper.'),
    T('À l’arrière-plan, dessine des montagnes posées sur l’horizon.', 'In the background, draw mountains sitting on the horizon.'),
    T('Au plan du milieu, dessine une colline, une petite maison et un arbre.', 'In the middle ground, draw a hill, a little house and a tree.'),
    T('Au premier plan, en bas, dessine de grosses fleurs et de l’herbe.', 'In the foreground, at the bottom, draw big flowers and grass.'),
    T('Ajoute le soleil et un nuage dans le ciel.', 'Add the sun and a cloud in the sky.')]),
  { svg: S(re(40, 20, 320, 110, SKY, 'none', 0, 0) + sh('M40 130L100 70L150 110L200 60L260 130Z', '#c3b8e0', INK, 3) + sh('M40 130H360V280H40Z', '#b8e0a0', 'none', 0) + sh('M40 175Q150 140 260 170T360 165V280H40Z', '#6cc04a', INK, 3) + re(275, 125, 44, 36, '#ffb36b', INK, 3, 1) + po('268,125 297,100 326,125', RED, INK, 3) + re(229, 150, 6, 22, BRN, 'none', 0, 0) + ci(232, 138, 14, GRN, INK, 3) + flower(90, 270, 1.6, RED) + flower(170, 275, 1.2, YEL) + ln(zig(275, 16, 10, 220, 360), '#2f7d22', 4) + sun(320, 55, 20) + sh('M90 50q10-16 26-8q14-12 28 2q12 2 8 14h-60q-8-4-2-8Z', WHT, GRY, 2) + paper(40, 20, 320, 260, 'none')),
    text: T('Colorie : les choses loin en couleurs pâles, les choses proches en couleurs vives.', 'Colour it: far things in pale colours, close things in bright colours.') },
]);

// ================= 16. Près et loin =================
const skyGround = (h = 120) => re(0, 0, 400, h, SKY, 'none', 0, 0) + re(0, h, 400, 300 - h, GRS, 'none', 0, 0) + ln(`M0 ${h}H400`, INK, 3);
const road = (a, b) => po(pt(200 - a, 300, 200 + a, 300, 200 + b, 110, 200 - b, 110), '#b9b4ab', INK, 4);
const cat = (x, y, s) => g(`translate(${x} ${y}) scale(${s})`, ov(0, -30, 34, 26, '#f0a040', INK, 4) + ln('M30 -36Q56 -50 48 -76', INK, 10) + ln('M30 -36Q56 -50 48 -76', '#f0a040', 5) + po('-44,-62 -40,-84 -26,-68', '#f0a040', INK, 3) + po('-14,-68 -4,-84 0,-60', '#f0a040', INK, 3) + ci(-24, -54, 20, '#f0a040', INK, 4) + ci(-31, -57, 3, INK, 'none', 0) + ci(-17, -57, 3, INK, 'none', 0));
const firO = (x, y, s, c, w) => po(pt(x, y - 80 * s, x + 26 * s, y - 14 * s, x - 26 * s, y - 14 * s), 'none', c, w) + ln(`M${x} ${r1(y - 14 * s)}V${y}`, c, w);
const FIRS = [[70, 275, 1.4], [118, 210, 0.9], [152, 162, 0.55], [174, 136, 0.3]];
const L16 = lesson('pres-loin', '🔭', T('Près et loin', 'Near and far'),
  T('Je vais apprendre à montrer qu’une chose est près ou loin dans mon dessin.', 'I will learn to show that something is near or far in my drawing.'),
  [V('perspective', 'perspective', 'La façon de dessiner pour montrer ce qui est près et ce qui est loin.', 'The way of drawing to show what is near and what is far.'),
    V('près', 'near', 'Tout proche de nous. Dans le dessin, c’est grand et en bas.', 'Very close to us. In a drawing, it is big and low.'),
    V('loin', 'far', 'Très éloigné de nous. Dans le dessin, c’est petit et près de l’horizon.', 'Far away from us. In a drawing, it is small and near the horizon.'),
    V('chevaucher', 'to overlap', 'Quand une chose passe devant une autre et en cache une partie.', 'When one thing is in front of another and hides part of it.')],
  [SL(S(skyGround() + tree(300, 150, 0.45) + tree(205, 200, 0.9) + tree(80, 285, 1.6)),
    'Ce qui est près paraît grand et plus bas sur la feuille. Ce qui est loin paraît petit et près de l’horizon.', 'What is near looks big and lower on the page. What is far looks small and near the horizon.'),
  SL(S(skyGround(110) + road(110, 6) + dl('M200 300V112', WHT, 5) + ci(200, 110, 5, NEW, 'none', 0)),
    'Un chemin qui s’éloigne devient de plus en plus étroit, jusqu’à devenir un point sur l’horizon.', 'A path going away gets narrower and narrower, until it becomes a point on the horizon.'),
  SL(S(skyGround(150) + house(240, 240, 1.4) + tree(160, 270, 1.6)),
    'Quand une chose est devant une autre, elle en cache une partie. L’arbre est devant : il est plus près de nous.', 'When one thing is in front of another, it hides part of it. The tree is in front: it is closer to us.'),
  SL(S(re(0, 0, 400, 300, '#eef5ff', 'none', 0, 0) + sh('M0 140Q80 80 160 130T320 110T400 120V300H0Z', '#c9d6ea', 'none', 0) + sh('M0 190Q100 130 200 180T400 170V300H0Z', '#8fb0d6', 'none', 0) + sh('M0 240Q120 190 240 235T400 230V300H0Z', '#3f6fa8', 'none', 0) + fir(330, 290, 0.9, '#1e4d7a') + fir(60, 290, 1.1, '#1e4d7a')),
    'Au loin, les couleurs deviennent plus pâles et on voit moins de détails.', 'Far away, colours get paler and you see fewer details.')],
  { type: 'quiz', rounds: [
    { q: Q('Quelle image montre un chemin qui s’éloigne?', 'Which picture shows a path going away?'), opts: [{ svg: S(skyGround(110) + road(60, 60)) }, { svg: S(skyGround(110) + road(110, 6)), ok: true }, { svg: S(skyGround(110) + road(20, 120)) }] },
    { q: Q('Le chat est loin. Quelle image le montre?', 'The cat is far away. Which picture shows it?'), opts: [{ svg: S(skyGround() + cat(200, 290, 1.6)) }, { svg: S(skyGround() + cat(220, 134, 0.35)), ok: true }] },
    { q: Q('Dans quelle image la maison est-elle derrière l’arbre?', 'In which picture is the house behind the tree?'), opts: [{ svg: S(skyGround(150) + tree(160, 270, 1.6) + house(240, 240, 1.4)) }, { svg: S(skyGround(150) + house(240, 240, 1.4) + tree(160, 270, 1.6)), ok: true }] },
  ] },
  [T('Comment as-tu montré que les sapins s’éloignent?', 'How did you show that the fir trees go farther away?'),
    T('Regarde par la fenêtre : qu’est-ce qui paraît petit parce que c’est loin?', 'Look out the window: what looks small because it is far away?')]);
const pdL = [
  (c, w) => ln('M40 120H360', c, w),
  (c, w) => ci(200, 120, 5, c, c, w - 3),
  (c, w) => ln('M90 280L200 120L310 280', c, w),
  (c, w) => FIRS.map(([x, y, s]) => firO(x, y, s, c, w - 2)).join(''),
  (c, w) => FIRS.map(([x, y, s]) => firO(400 - x, y, s, c, w - 2)).join(''),
  (c, w) => re(250, 108, 14, 12, 'none', c, w - 4, 1) + ln('M247 108L257 100L267 108', c, w - 4),
];
const P16 = proj('pres-loin', '🌲', T('Le chemin des sapins', 'The fir tree path'), 2, 20, 'nature', [M.papier, M.crayon, M.regle, M.couleurs], [
  ...mk(prog(paper(40, 20, 320, 260), pdL), [
    T('Trace la ligne d’horizon avec ta règle.', 'Draw the horizon line with your ruler.'),
    T('Fais un petit point au milieu de l’horizon : c’est là que tout disparaît.', 'Make a little dot in the middle of the horizon: that’s where everything disappears.'),
    T('Trace deux lignes, du bas de la feuille jusqu’au point : c’est le chemin.', 'Draw two lines, from the bottom of the paper up to the dot: that’s the path.'),
    T('À gauche, dessine un gros sapin en bas, puis des sapins de plus en plus petits vers le point.', 'On the left, draw a big fir tree at the bottom, then smaller and smaller ones towards the dot.'),
    T('Fais pareil à droite.', 'Do the same on the right.'),
    T('Dessine une toute petite maison au loin, sur l’horizon.', 'Draw a tiny house far away, on the horizon.')]),
  { svg: S(re(40, 20, 320, 100, SKY, 'none', 0, 0) + re(40, 120, 320, 160, GRS, 'none', 0, 0) + po('90,280 310,280 200,120', '#c9c2b5', INK, 3) + FIRS.map(([x, y, s]) => fir(x, y, s, '#2e8b57') + fir(400 - x, y, s, '#2e8b57')).join('') + re(250, 108, 14, 12, '#ffb36b', INK, 2, 1) + po('247,108 257,100 267,108', RED, INK, 2) + paper(40, 20, 320, 260, 'none')),
    text: T('Colorie ton paysage. Les sapins au loin peuvent être un peu plus pâles.', 'Colour your landscape. The far-away fir trees can be a little paler.') },
]);

// ================= 17. Le mouvement =================
const standing = (x, y, c = INK, w = 6) => ci(x, y - 110, 14, 'none', c, w) + ln(`M${x} ${y - 96}V${y - 50}M${x - 24} ${y - 66}L${x} ${y - 86}L${x + 24} ${y - 66}M${x - 16} ${y}L${x} ${y - 50}L${x + 16} ${y}`, c, w);
const running = (x, y, c = INK, w = 6) => ci(x + 16, y - 108, 14, 'none', c, w) + ln(`M${x + 10} ${y - 94}L${x - 4} ${y - 52}M${x + 8} ${y - 86}L${x + 30} ${y - 74}L${x + 42} ${y - 90}M${x + 8} ${y - 86}L${x - 14} ${y - 72}L${x - 30} ${y - 84}M${x - 4} ${y - 52}L${x + 20} ${y - 30}L${x + 18} ${y - 2}M${x - 4} ${y - 52}L${x - 22} ${y - 28}L${x - 44} ${y - 34}`, c, w);
const sitting = (x, y, c = INK, w = 6) => ci(x, y - 90, 14, 'none', c, w) + ln(`M${x} ${y - 76}V${y - 34}H${x + 36}V${y}M${x} ${y - 64}L${x + 26} ${y - 48}`, c, w) + ln(`M${x - 20} ${y - 34}H${x + 50}M${x - 14} ${y - 34}V${y}M${x + 44} ${y - 34}V${y}`, BRN, 5);
const bentTree = (x, y) => ln(`M${x} ${y}Q${x + 6} ${y - 50} ${x + 40} ${y - 90}`, BRN, 14) + g(`rotate(30 ${x + 50} ${y - 110})`, ov(x + 50, y - 110, 50, 34, GRN, INK, 4));
const L17 = lesson('mouvement', '🏃', T('Le mouvement', 'Movement'),
  T('Je vais apprendre à montrer le mouvement dans un dessin.', 'I will learn to show movement in a drawing.'),
  [V('mouvement', 'movement', 'Quand quelque chose bouge ou se déplace.', 'When something moves or travels.'),
    V('lignes de mouvement', 'motion lines', 'De petits traits derrière un objet pour montrer qu’il va vite.', 'Little lines behind an object to show it is going fast.'),
    V('posture', 'pose', 'La position du corps : debout, penché, les bras en l’air…', 'The position of the body: standing, leaning, arms up…'),
    V('action', 'action', 'Ce que fait un personnage : courir, sauter, lancer.', 'What a character is doing: running, jumping, throwing.')],
  [SL(S(ci(100, 150, 36, RED) + ci(300, 150, 36, RED) + ln('M190 130h50M176 150h64M190 170h50', NEW, 6) + ln('M100 114v72M64 150h72', WHT, 5) + ln('M300 114v72M264 150h72', WHT, 5)),
    'Des petits traits derrière un objet montrent qu’il va vite : ce sont des lignes de mouvement.', 'Little lines behind an object show it is going fast: those are motion lines.'),
  SL(S(standing(110, 260) + running(290, 260, NEW) + ln('M215 150h30M205 170h30', NEW, 5) + ln('M20 262H380', INK, 3)),
    'Pour montrer qu’un personnage court, penche son corps, plie ses bras et écarte ses jambes.', 'To show a character running, lean the body forward, bend the arms and spread the legs.'),
  SL(S(bentTree(150, 270) + ln(wave(80, 10, 20, 10, 90), LBL, 5) + ln(wave(120, 10, 20, 0, 80), LBL, 5) + ln(wave(170, 10, 20, 20, 100), LBL, 5) + po('300,80 340,60 330,110', YEL, INK, 4) + ln('M330 110Q300 160 320 200T300 260', INK, 3) + ln('M20 272H380', INK, 3)),
    'Des lignes en vagues montrent le vent. L’arbre qui penche nous dit qu’il vente fort!', 'Wavy lines show the wind. The leaning tree tells us it is very windy!'),
  SL(S(dl('M40 90Q90 30 140 260Q190 110 240 260Q280 160 320 260Q345 210 370 260', GRY, 4) + `<g opacity=".35">${ci(40, 90, 16, ORA, INK, 3)}${ci(140, 244, 16, ORA, INK, 3)}${ci(240, 244, 16, ORA, INK, 3)}</g>` + ci(320, 244, 16, ORA, INK, 4) + ln('M20 262H380', INK, 3)),
    'On peut aussi dessiner le chemin d’un objet : la balle rebondit, rebondit, rebondit…', 'You can also draw the path of an object: the ball bounces, bounces, bounces…')],
  { type: 'quiz', rounds: [
    { q: Q('Quel ballon va vite?', 'Which ball is going fast?'), opts: [{ svg: I(ci(50, 50, 28, RED, INK, 4)) }, { svg: I(ci(64, 50, 26, RED, INK, 4) + ln('M8 38h18M4 50h22M8 62h18', NEW, 5)), ok: true }] },
    { q: Q('Quel bonhomme court?', 'Which stick figure is running?'), opts: [{ svg: S(g('translate(200 285) scale(1.9) translate(-200 -270)', standing(200, 270, INK, 4))) }, { svg: S(g('translate(200 285) scale(1.9) translate(-200 -270)', running(210, 270, INK, 4))), ok: true }, { svg: S(g('translate(200 285) scale(1.9) translate(-200 -270)', sitting(185, 270, INK, 4))) }] },
    { q: Q('Dans quelle image fait-il du vent?', 'In which picture is it windy?'), opts: [{ svg: S(tree(200, 270, 1.8)) }, { svg: S(bentTree(150, 270) + ln(wave(100, 10, 20, 10, 90), LBL, 5) + ln(wave(150, 10, 20, 0, 80), LBL, 5)), ok: true }] },
  ] },
  [T('Comment as-tu montré que ton bonhomme court vite?', 'How did you show that your stick figure runs fast?'),
    T('Quel sport aimerais-tu dessiner en mouvement?', 'Which sport would you like to draw in motion?')]);
const mvL = [
  (c, w) => ci(230, 70, 22, 'none', c, w),
  (c, w) => ln('M222 92L196 170', c, w),
  (c, w) => ln('M218 108L250 128L268 104M218 108L186 126L166 112', c, w),
  (c, w) => ln('M196 170L236 204L230 250M196 170L166 208L128 200', c, w),
  (c, w) => ci(270, 250, 18, 'none', c, w),
  (c, w) => ln('M110 80h40M100 110h40M110 140h40M296 238h24M300 256h22', c, w - 2),
];
const P17 = proj('mouvement', '⚽', T('Mon bonhomme en action', 'My stick figure in action'), 2, 20, 'personnages', [M.papier, M.crayon, M.feutres], [
  ...mk(prog(ln('M60 270H360', GRS, 6), mvL), [
    T('Dessine la tête, un peu vers l’avant de ta feuille.', 'Draw the head, a little towards the front of your paper.'),
    T('Dessine le corps penché vers l’avant : il court!', 'Draw the body leaning forward: he’s running!'),
    T('Plie les bras : un en avant, un en arrière.', 'Bend the arms: one forward, one back.'),
    T('Écarte les jambes : une plie vers l’avant, l’autre part derrière.', 'Spread the legs: one bends forward, the other goes back.'),
    T('Dessine un ballon juste devant son pied.', 'Draw a ball right in front of his foot.'),
    T('Ajoute des lignes de mouvement derrière lui et derrière le ballon.', 'Add motion lines behind him and behind the ball.')]),
  { svg: S(ln('M60 270H360', GRS, 6) + ov(200, 272, 60, 6, '#cfd8c0', 'none', 0) + ln('M196 170L236 204L230 250M196 170L166 208L128 200', '#1d3f7a', 9) + ln('M222 92L196 170', RED, 14) + ln('M218 108L250 128L268 104M218 108L186 126L166 112', RED, 8) + ci(230, 70, 22, SKIN, INK, 5) + sh('M210 62Q230 36 252 62Q236 54 210 62Z', BRN) + ci(270, 250, 18, WHT, INK, 5) + po('264,244 276,244 278,254 270,260 262,254', INK, 'none', 0) + ln('M110 80h40M100 110h40M110 140h40M296 238h24M300 256h22', GRY, 5)),
    text: T('Colorie ses vêtements avec tes feutres. Ton bonhomme est plein d’énergie!', 'Colour his clothes with your markers. Your stick figure is full of energy!') },
]);

// ================= 18. L’émotion dans les couleurs =================
const EMO = {
  joie: re(0, 0, 400, 300, '#fff3b0', 'none', 0, 0) + ci(120, 120, 70, ORA, 'none', 0) + ci(120, 120, 46, YEL, 'none', 0) + g('translate(230 120) scale(1.6)', ln(SPI, PNK, 6)) + [[300, 60], [350, 240], [60, 250], [200, 260], [370, 120]].map(([x, y]) => ci(x, y, 14, RED, 'none', 0)).join('') + ln(wave(230, 18, 30, 0, 400), ORA, 8),
  calme: re(0, 0, 400, 300, '#d6ecff', 'none', 0, 0) + ln(wave(110, 8, 50, 0, 400), LBL, 10) + ln(wave(170, 8, 50, 0, 400), '#7fc8a9', 10) + ln(wave(230, 8, 50, 0, 400), '#6fa0dc', 10) + ci(300, 60, 26, WHT, 'none', 0),
  colere: re(0, 0, 400, 300, '#3a0d0d', 'none', 0, 0) + ln(zig(110, 60, 30, 0, 400), RED, 10) + ln(zig(220, 60, 25, 0, 400), ORA, 8) + po('60,280 100,170 140,280', BLK, RED, 4) + po('260,280 310,150 360,280', BLK, RED, 4),
  triste: re(0, 0, 400, 300, '#9aa7b8', 'none', 0, 0) + ln('M40 20v60M100 40v60M160 10v60M220 50v60M280 20v60M340 40v60M70 130v60M190 140v60M310 130v60', '#56657d', 5) + ln('M30 260Q120 200 200 270T370 260', '#56657d', 8) + ci(320, 230, 18, '#56657d', 'none', 0),
};
const L18 = lesson('emotion', '😊', T('L’émotion dans les couleurs', 'Emotion in colours'),
  T('Je vais apprendre à exprimer une émotion avec des couleurs et des lignes.', 'I will learn to express an emotion with colours and lines.'),
  [V('émotion', 'emotion', 'Ce qu’on ressent à l’intérieur : la joie, le calme, la colère, la tristesse.', 'What you feel inside: joy, calm, anger, sadness.'),
    V('ambiance', 'mood', 'Le sentiment que nous donne une image.', 'The feeling a picture gives us.'),
    V('couleurs vives', 'bright colours', 'Des couleurs fortes et lumineuses.', 'Strong, shining colours.'),
    V('couleurs sombres', 'dark colours', 'Des couleurs foncées, presque noires.', 'Deep colours, almost black.')],
  [SL(S(EMO.joie), 'La joie : des couleurs vives et chaudes, des lignes rondes qui dansent.', 'Joy: bright, warm colours and round, dancing lines.'),
    SL(S(EMO.calme), 'Le calme : des couleurs douces et froides, des lignes couchées, tranquilles comme un lac.', 'Calm: soft, cool colours and lying-down lines, quiet like a lake.'),
    SL(S(EMO.colere), 'La colère : du rouge, du noir et des lignes pointues qui piquent.', 'Anger: red, black and sharp, spiky lines.'),
    SL(S(EMO.triste), 'La tristesse : du gris, du bleu sombre et des lignes qui tombent, comme la pluie.', 'Sadness: grey, dark blue and falling lines, like rain.'),
    SL(S(g('translate(10 10) scale(.46)', EMO.joie) + g('translate(205 10) scale(.46)', EMO.calme) + g('translate(10 155) scale(.46)', EMO.colere) + g('translate(205 155) scale(.46)', EMO.triste)),
      'Il n’y a pas de mauvaise réponse : chaque artiste choisit ses couleurs pour dire ce qu’il ressent.', 'There is no wrong answer: every artist chooses colours to say what they feel.')],
  { type: 'quiz', rounds: [
    { q: Q('Quel tableau a l’air joyeux?', 'Which painting looks happy?'), opts: [{ svg: S(EMO.triste) }, { svg: S(EMO.joie), ok: true }, { svg: S(EMO.colere) }] },
    { q: Q('Quel tableau a l’air calme?', 'Which painting looks calm?'), opts: [{ svg: S(EMO.colere) }, { svg: S(EMO.joie) }, { svg: S(EMO.calme), ok: true }] },
    { q: Q('Quel tableau a l’air fâché?', 'Which painting looks angry?'), opts: [{ svg: S(EMO.colere), ok: true }, { svg: S(EMO.calme) }, { svg: S(EMO.triste) }] },
    { q: Q('Quel tableau a l’air triste?', 'Which painting looks sad?'), opts: [{ svg: S(EMO.joie) }, { svg: S(EMO.triste), ok: true }, { svg: S(EMO.calme) }] },
  ] },
  [T('Quelle émotion as-tu choisie? Quelles couleurs vont avec?', 'Which emotion did you choose? Which colours go with it?'),
    T('Ta famille a-t-elle deviné ton émotion?', 'Did your family guess your emotion?'),
    T('Est-ce que ton tableau te fait sentir mieux?', 'Does your painting make you feel better?')]);
const emoPaper = paper(50, 30, 300, 240);
const emoLines = (c, w) => g('translate(70 40) scale(1.4)', ln(SPI, c, w / 1.4)) + ln(wave(220, 16, 25, 50, 350), c, w);
const emoShapes = (c, w, f = 'none') => ci(270, 90, 34, f === 'none' ? f : ORA, c, w) + ci(300, 170, 14, f === 'none' ? f : RED, c, w) + ci(110, 240, 12, f === 'none' ? f : RED, c, w) + po(star(200, 130, 26, 11), f === 'none' ? f : PNK, c, w);
const P18 = proj('emotion', '💛', T('Le tableau de mon émotion', 'My emotion painting'), 1, 20, 'motifs', [M.papier, M.cire, M.couleurs, M.feutres], [
  { svg: S(g('translate(80 110) scale(.75) translate(-200 -150)', face(200, 150)) + g('translate(200 110) scale(.75) translate(-200 -150)', face(200, 150, { mouth: 'o' })) + g('translate(320 110) scale(.75) translate(-200 -150)', face(200, 150, { mouth: 'sad' })) + sh('M200 270C150 230 150 200 175 195Q190 192 200 210Q210 192 225 195C250 200 250 230 200 270Z', RED)),
    text: T('Ferme les yeux. Pense à une émotion : la joie, le calme, la colère ou la tristesse.', 'Close your eyes. Think of an emotion: joy, calm, anger or sadness.') },
  { svg: S(crayon(130, 230, -20, YEL) + crayon(200, 230, 0, ORA) + crayon(270, 230, 20, PNK) + re(95, 130, 210, 125, 'none', NEW, 5, 24)), text: T('Choisis trois couleurs qui vont avec ton émotion.', 'Choose three colours that go with your emotion.') },
  { svg: S(emoPaper + emoLines(NEW, 7)), text: T('Dessine des lignes qui vont avec : rondes et douces pour la joie, pointues pour la colère.', 'Draw lines that match: round and soft for joy, spiky for anger.') },
  { svg: S(emoPaper + emoLines(INK, 5) + emoShapes(NEW, 6)), text: T('Ajoute des formes : des ronds, des taches, des étoiles…', 'Add shapes: circles, blots, stars…') },
  { svg: S(re(50, 30, 300, 240, '#fff3b0', 'none', 0, 0) + emoLines(ORA, 7) + emoShapes(INK, 3, 'fill') + emoPaper.replace('fill="#ffffff"', 'fill="none"')), text: T('Colorie tout ton tableau avec tes trois couleurs. Remplis bien la feuille!', 'Colour your whole painting with your three colours. Fill the page!') },
  { svg: S(re(36, 16, 328, 268, '#c98d4a', INK, 4, 6) + re(50, 30, 300, 240, '#fff3b0', 'none', 0, 0) + emoLines(ORA, 7) + emoShapes(INK, 3, 'fill')), text: T('Donne un titre à ton tableau. Montre-le à quelqu’un : devine-t-il ton émotion?', 'Give your painting a title. Show it to someone: can they guess your emotion?') },
]);

// ================= 19. L’art autour de nous =================
const STREET = S(re(0, 0, 400, 300, SKY, 'none', 0, 0) + re(0, 240, 400, 60, '#c9c2b5', 'none', 0, 0) + ln('M0 240H400', INK, 3)
  + re(10, 40, 150, 200, '#d9a37a', INK, 4, 0) + re(25, 70, 120, 110, '#fff3b0', INK, 3, 0) + sun(85, 115, 22) + ln(wave(160, 8, 15, 25, 145), BLU, 5) + re(65, 190, 40, 50, BRN, INK, 3, 2)
  + re(250, 60, 140, 180, '#b8c4d6', INK, 4, 0) + re(270, 80, 30, 30, LBL, INK, 3, 0) + re(340, 80, 30, 30, LBL, INK, 3, 0) + re(280, 140, 60, 80, WHT, INK, 3, 2) + ci(310, 170, 16, PNK, INK, 2) + ln('M296 200q14 10 28 0', GRN, 4)
  + re(186, 200, 34, 40, GRY, INK, 3, 0) + ci(203, 160, 14, '#7a8a99', INK, 3) + po('190,200 216,200 203,172', '#7a8a99', INK, 3)
  + re(170, 262, 110, 10, 'none', INK, 3, 2) + [0, 1, 2, 3, 4].map((i) => re(170 + i * 22, 250, 22, 12, [RED, YEL, BLU, GRN, ORA][i], 'none', 0, 0)).join('') + ln('M178 272v16M272 272v16', INK, 4)
  + ln('M235 240V140', INK, 4) + ci(235, 136, 8, YEL, INK, 3) + tree(370, 290, 0.5) + re(20, 262, 60, 24, RED, INK, 3, 8) + ci(34, 288, 7, BLK) + ci(66, 288, 7, BLK));
const L19 = lesson('art-autour', '🏙️', T('L’art autour de nous', 'Art around us'),
  T('Je vais apprendre à remarquer l’art dans ma ville et dans ma maison.', 'I will learn to notice art in my city and in my home.'),
  [V('murale', 'mural', 'Une grande peinture faite directement sur un mur.', 'A big painting made right on a wall.'),
    V('sculpture', 'sculpture', 'Une œuvre en volume qu’on peut regarder de tous les côtés.', 'An artwork with volume that you can look at from all sides.'),
    V('artisan', 'craftsperson', 'Une personne qui fabrique à la main des objets beaux et utiles.', 'A person who makes beautiful, useful objects by hand.'),
    V('illustration', 'illustration', 'Un dessin dans un livre ou sur une affiche.', 'A drawing in a book or on a poster.')],
  [SL(S(re(0, 0, 400, 300, SKY, 'none', 0, 0) + re(40, 30, 320, 240, '#d9a37a', INK, 4, 0) + re(60, 50, 280, 170, '#fff3b0', INK, 3, 0) + sun(140, 120, 40) + ln(wave(190, 12, 20, 60, 340), BLU, 7) + po(star(270, 100, 30, 12), PNK, INK, 3) + standing(330, 268, INK, 4)),
    'Une murale est une grande peinture sur un mur. À Montréal, il y en a partout dans les rues!', 'A mural is a big painting on a wall. In Montréal, there are murals all over the streets!'),
  SL(S(re(0, 0, 400, 240, SKY, 'none', 0, 0) + re(0, 240, 400, 60, GRS, 'none', 0, 0) + re(160, 200, 80, 50, GRY, INK, 4, 0) + ci(200, 170, 30, RED, INK, 4) + re(176, 90, 48, 50, BLU, INK, 4, 4) + po('200,30 230,90 170,90', YEL, INK, 4) + tree(70, 260, 1.2) + tree(340, 260, 0.9)),
    'Une sculpture est une œuvre en volume. On peut en faire le tour, comme dans un parc.', 'A sculpture is an artwork with volume. You can walk around it, like in a park.'),
  SL(S(sh('M30 120H150Q145 180 90 190Q35 180 30 120Z', LBL) + ln(zig(140, 14, 12, 40, 140), BLU, 4) + [0, 1, 2].map((r) => [0, 1, 2].map((c2) => re(180 + c2 * 34, 90 + r * 34, 34, 34, [RED, YEL, BLU, GRN, ORA, VIO, PNK, LBL, YEL][r * 3 + c2], INK, 2, 0)).join('')).join('') + sh('M300 130L340 120L380 130V210L340 200L300 210Z', WHT) + ln('M340 120V200', INK, 3) + ci(320, 160, 10, ORA, 'none', 0) + ln('M350 150h20M350 165h20M350 180h14', GRY, 3)),
    'Les artisans et les illustrateurs créent aussi : un bol décoré, une courtepointe, un livre illustré.', 'Craftspeople and illustrators create too: a decorated bowl, a quilt, an illustrated book.'),
  SL(S(re(110, 20, 180, 270, '#eef1f6', INK, 5, 12) + ln('M110 110H290M130 60v30', INK, 4) + re(130, 130, 70, 56, WHT, INK, 3, 2) + sun(165, 158, 10) + re(212, 140, 62, 80, WHT, INK, 3, 2) + ci(243, 170, 14, PNK, INK, 2) + ln('M226 205h34', GRN, 4) + ci(165, 130, 5, RED, 'none', 0) + ci(243, 140, 5, BLU, 'none', 0)),
    'Et toi aussi! Tes dessins sur le frigo, c’est de l’art autour de nous.', 'And you too! Your drawings on the fridge are art around us.')],
  { type: 'spot', rounds: [
    { q: Q('Touche les 4 œuvres d’art cachées dans la rue.', 'Tap the 4 artworks hidden in the street.'), svg: STREET, targets: [[85, 125, 55], [203, 190, 32], [310, 180, 40], [225, 262, 40]] },
  ] },
  [T('As-tu déjà vu une murale ou une sculpture dehors? Où?', 'Have you ever seen a mural or a sculpture outside? Where?'),
    T('Quel objet de ta maison est aussi une œuvre d’art?', 'Which object in your home is also a work of art?')]);
const muBase = paper(10, 80, 380, 150) + dl('M200 80V230', GRY, 2);
const muL = [
  (c, w) => ln('M10 205H390', c, w),
  (c, w) => re(30, 130, 60, 75, 'none', c, w - 2, 1) + ln('M24 130L60 100L96 130', c, w - 2) + re(120, 110, 90, 95, 'none', c, w - 2, 1) + ln('M120 130H210', c, w - 3) + re(240, 140, 50, 65, 'none', c, w - 2, 1) + re(310, 120, 60, 85, 'none', c, w - 2, 1),
  (c, w) => standing(105, 205, c, w - 3).replace(/r="14"/, 'r="9"') + firO(225, 205, 0.6, c, w - 3) + ln('M370 205l-4-14l8 0z', c, w - 4),
  (c, w) => ci(360, 100, 12, 'none', c, w - 3) + ln('M60 100q8-8 16 0q8-8 16 0M230 95q6-6 12 0q6-6 12 0', c, w - 4),
];
const P19 = proj('art-autour', '🧱', T('Ma murale de quartier', 'My neighbourhood mural'), 3, 40, 'decorations', [T('2 feuilles blanches', '2 sheets of white paper'), M.ruban, M.crayon, M.feutres, M.couleurs], [
  { svg: S(paper(20, 90, 180, 130) + paper(200, 90, 180, 130) + re(180, 100, 40, 20, '#f3e6b0', NEW, 4, 2) + re(180, 190, 40, 20, '#f3e6b0', NEW, 4, 2)), text: T('Colle deux feuilles bout à bout avec du ruban adhésif, en arrière. Ça fait une longue murale.', 'Tape two sheets end to end, on the back. That makes a long mural.') },
  ...mk(prog(muBase, muL), [
    T('Trace une ligne pour le sol, en bas de ta longue feuille.', 'Draw a line for the ground, at the bottom of your long paper.'),
    T('Dessine les bâtiments de ta rue : ta maison, l’école, le dépanneur…', 'Draw the buildings on your street: your home, the school, the corner store…'),
    T('Ajoute des gens, des arbres et des animaux.', 'Add people, trees and animals.'),
    T('Dessine le ciel : le soleil, des oiseaux.', 'Draw the sky: the sun, some birds.')]),
  { svg: S(re(10, 80, 380, 125, SKY, 'none', 0, 0) + re(10, 205, 380, 25, GRS, 'none', 0, 0) + re(30, 130, 60, 75, '#ffb36b', INK, 3, 1) + po('24,130 60,100 96,130', RED, INK, 3) + re(120, 110, 90, 95, '#e7c6a3', INK, 3, 1) + ln('M120 130H210', INK, 3) + re(240, 140, 50, 65, '#c7e3a8', INK, 3, 1) + re(310, 120, 60, 85, '#b8c4d6', INK, 3, 1) + standing(105, 205, INK, 3).replace(/r="14"/, 'r="9"') + fir(225, 205, 0.6) + sun(360, 100, 12) + ln('M60 100q8-8 16 0q8-8 16 0M230 95q6-6 12 0q6-6 12 0', INK, 3) + paper(10, 80, 380, 150, 'none')),
    text: T('Colorie avec des couleurs vives : une murale, ça doit se voir de loin!', 'Colour with bright colours: a mural should be seen from far away!') },
  { svg: S(re(0, 0, 400, 300, '#f4ead8', 'none', 0, 0) + re(0, 250, 400, 50, '#c9a27a', 'none', 0, 0) + g('translate(20 -30) scale(.9)', re(10, 80, 380, 125, SKY, 'none', 0, 0) + re(10, 205, 380, 25, GRS, 'none', 0, 0) + re(30, 130, 60, 75, '#ffb36b', INK, 3, 1) + po('24,130 60,100 96,130', RED, INK, 3) + re(120, 110, 90, 95, '#e7c6a3', INK, 3, 1) + re(240, 140, 50, 65, '#c7e3a8', INK, 3, 1) + re(310, 120, 60, 85, '#b8c4d6', INK, 3, 1) + fir(225, 205, 0.6) + sun(360, 100, 12) + paper(10, 80, 380, 150, 'none')) + [[22, 38], [354, 38], [22, 168], [354, 168]].map(([x, y]) => re(x, y, 24, 14, '#f3e6b0', NEW, 3, 2)).join('')),
    text: T('Affiche ta murale sur un mur de la maison avec du ruban adhésif. Bravo, muraliste!', 'Hang your mural on a wall at home with tape. Well done, muralist!') },
]);

// ================= 20. Présenter son œuvre =================
const frame = (x, y, w, h, inner = '', f = '#c98d4a') => re(x, y, w, h, f, INK, 4, 3) + re(x + 10, y + 10, w - 20, h - 20, WHT, INK, 3, 1) + inner;
const cartel = (x, y, c = INK) => re(x, y, 60, 40, WHT, c, 3, 2) + ln(`M${x + 8} ${y + 12}h44M${x + 8} ${y + 22}h34M${x + 8} ${y + 31}h26`, GRY, 3);
const heads = (y) => [70, 130, 190, 250, 310].map((x, i) => ci(x, y, 22, [SKIN, '#d9a07a', SKIN, '#b07a50', SKIN][i], INK, 3) + ov(x, y + 46, 30, 22, [BLU, RED, GRN, ORA, VIO][i], INK, 3)).join('');
const L20 = lesson('presenter', '🎤', T('Présenter son œuvre', 'Presenting your artwork'),
  T('Je vais apprendre à présenter mon œuvre et à parler de celle des autres.', 'I will learn to present my artwork and talk about other people’s work.'),
  [V('titre', 'title', 'Le nom qu’on donne à son œuvre.', 'The name you give your artwork.'),
    V('technique', 'technique', 'La façon de faire l’œuvre : dessin, peinture, collage, modelage…', 'The way the artwork was made: drawing, painting, collage, modelling…'),
    V('artiste', 'artist', 'La personne qui crée une œuvre. C’est toi!', 'The person who creates an artwork. That’s you!'),
    V('vernissage', 'opening', 'Une petite fête pour montrer des œuvres pour la première fois.', 'A little party to show artworks for the first time.'),
    V('apprécier', 'to appreciate', 'Dire ce qu’on aime dans une œuvre, et pourquoi.', 'To say what you like about an artwork, and why.')],
  [SL(S(frame(170, 30, 160, 130, sun(250, 95, 22)) + running(110, 200, INK, 5).replace(/r="14"/, 'r="14"') + heads(240)),
    'Quand ton œuvre est finie, tu peux la présenter à ta famille, comme un vrai artiste!', 'When your artwork is finished, you can present it to your family, like a real artist!'),
  SL(S(frame(60, 50, 200, 170, sun(160, 135, 30)) + cartel(285, 160, NEW)),
    'Dis le titre de ton œuvre et sa technique. On peut les écrire sur un petit carton à côté : le cartel.', 'Say the title of your artwork and its technique. You can write them on a little card next to it: the label.'),
  SL(S(sh('M60 40H340Q360 40 360 60V170Q360 190 340 190H150L110 230V190H60Q40 190 40 170V60Q40 40 60 40Z', WHT) + splat(120, 110, 24, BLU) + ln('M170 110h30', INK, 5) + sh('M260 140C230 120 225 95 242 90Q255 87 260 102Q265 87 278 90C295 95 290 120 260 140Z', RED) + ci(110, 260, 26, SKIN, INK, 4)),
    'Explique tes choix : « J’ai choisi du bleu parce que ça me fait penser à la mer. »', 'Explain your choices: “I chose blue because it reminds me of the sea.”'),
  SL(S(heads(150) + [70, 190, 310].map((x) => sh(`M${x + 30} 240h16v-14q0-10 8-16l6-6q4 6 0 14h8q6 0 6 8l-4 14h-24z`, YEL, INK, 3)).join('')),
    'Quand un ami présente son œuvre, écoute-le, dis ce que tu aimes et pose-lui une question.', 'When a friend presents their artwork, listen, say what you like and ask a question.')],
  { type: 'quiz', rounds: [
    { q: Q('Que veut dire le mot « technique »?', 'What does the word “technique” mean?'), opts: [{ label: T('La façon de faire l’œuvre', 'The way the artwork was made'), ok: true }, { label: T('Le prix de l’œuvre', 'The price of the artwork') }, { label: T('La couleur du cadre', 'The colour of the frame') }] },
    { q: Q('Quelle phrase est une bonne façon de parler d’une œuvre?', 'Which sentence is a good way to talk about an artwork?'), opts: [{ label: T('C’est laid.', 'It’s ugly.') }, { label: T('J’aime les couleurs vives parce qu’elles sont joyeuses.', 'I like the bright colours because they are cheerful.'), ok: true }, { label: T('Je ne sais pas.', 'I don’t know.') }] },
    { q: Q('Qu’est-ce qu’on écrit sur le cartel?', 'What do we write on the label?'), opts: [{ label: T('Une recette de gâteau', 'A cake recipe') }, { label: T('Le numéro de téléphone', 'The phone number') }, { label: T('Le titre, le nom de l’artiste et la technique', 'The title, the artist’s name and the technique'), ok: true }] },
    { q: Q('Quand un ami présente son œuvre, je…', 'When a friend presents their artwork, I…'), opts: [{ label: T('l’écoute et je lui pose une question', 'listen and ask a question'), ok: true }, { label: T('parle en même temps', 'talk at the same time') }, { label: T('regarde ailleurs', 'look somewhere else') }] },
  ] },
  [T('Quelle œuvre de ce cours es-tu le plus fier ou la plus fière d’avoir faite?', 'Which artwork from this course are you proudest of?'),
    T('Qu’est-ce que ta famille a aimé dans ton vernissage?', 'What did your family like about your art show?'),
    T('Que voudrais-tu apprendre ensuite en arts plastiques?', 'What would you like to learn next in art?')]);
const art3 = [sun(0, 0, 14), re(-14, -18, 28, 30, '#b8c4d6', INK, 3, 3) + ci(-6, -6, 4, YEL, INK, 2) + ci(6, -6, 4, YEL, INK, 2), g('scale(.3) translate(-200 -150)', butterfly(false))];
const wall = (k) => re(0, 0, 400, 300, '#f4ead8', 'none', 0, 0) + re(0, 250, 400, 50, '#c9a27a', 'none', 0, 0) + [70, 200, 330].map((x, i) => frame(x - 50, 50, 100, 90, g(`translate(${x} 95)`, art3[i]), ['#ff9ec4', '#9cc7f5', '#8fd16a'][i]) + cartel(x - 30, 150, k ? INK : NEW).replace(/width="60" height="40"/, 'width="60" height="40"')).join('');
const P20 = proj('presenter', '🖼️', T('Mon petit vernissage', 'My little art show'), 1, 20, 'objets', [T('Tes œuvres préférées', 'Your favourite artworks'), M.papierCouleur, M.colle, M.carton, M.feutres, T('Ruban adhésif de masquage', 'Masking tape')], [
  { svg: S([70, 200, 330].map((x, i) => paper(x - 45, 90, 90, 80) + g(`translate(${x} 130)`, art3[i])).join('') + po(star(200, 50, 26, 11), YEL, NEW, 4)), text: T('Choisis tes trois œuvres préférées.', 'Choose your three favourite artworks.') },
  { svg: S(frame(100, 50, 200, 170, g('translate(200 135) scale(2)', art3[0]), '#ff9ec4') + re(100, 50, 200, 170, 'none', NEW, 5, 3) + glue(340, 120)), text: T('Colle chaque œuvre sur une feuille de couleur un peu plus grande : ça fait un cadre.', 'Glue each artwork onto a slightly bigger sheet of coloured paper: that makes a frame.') },
  { svg: S(g('translate(80 60) scale(2.4)', cartel(0, 0, NEW)) + crayon(300, 200, 30, BLU)), text: T('Fais un cartel pour chaque œuvre : le titre, ton nom et la technique. Demande de l’aide pour écrire si tu veux.', 'Make a label for each artwork: the title, your name and the technique. Ask for help writing if you want.') },
  { svg: S(wall(0)), text: T('Accroche tes œuvres au mur avec du ruban adhésif, à la hauteur des yeux, avec leur cartel.', 'Hang your artworks on the wall with tape, at eye level, with their labels.') },
  { svg: S(wall(1) + heads(230)), text: T('Invite ta famille au vernissage! Présente chaque œuvre : son titre, sa technique et pourquoi tu l’aimes.', 'Invite your family to the opening! Present each artwork: its title, its technique and why you like it.') },
  { svg: S(wall(1) + heads(230) + [[40, 30, RED], [120, 20, YEL], [280, 25, BLU], [360, 35, GRN], [200, 18, PNK]].map(([x, y, c]) => re(x, y, 8, 14, c, 'none', 0, 2)).join('')), text: T('Demande à ton public ce qu’il voit et ce qu’il ressent. Bravo, artiste!', 'Ask your audience what they see and how they feel. Well done, artist!') },
]);

// ================= paints (mix game) =================
export const paints = {
  colors: {
    rouge: { c: RED, name: T('rouge', 'red') }, jaune: { c: YEL, name: T('jaune', 'yellow') }, bleu: { c: BLU, name: T('bleu', 'blue') },
    blanc: { c: '#ffffff', name: T('blanc', 'white') }, noir: { c: '#222222', name: T('noir', 'black') },
    orange: { c: ORA, name: T('orange', 'orange') }, vert: { c: GRN, name: T('vert', 'green') }, violet: { c: VIO, name: T('violet', 'purple') },
    rose: { c: PNK, name: T('rose', 'pink') }, bleuPale: { c: LBL, name: T('bleu pâle', 'light blue') }, bleuFonce: { c: DBL, name: T('bleu foncé', 'dark blue') },
    gris: { c: GRY, name: T('gris', 'grey') }, jaunePale: { c: '#fff1a8', name: T('jaune pâle', 'pale yellow') }, rougeFonce: { c: '#8b1e2b', name: T('rouge foncé', 'dark red') },
    olive: { c: '#6b6b1e', name: T('vert olive', 'olive green') }, brun: { c: '#7a4a24', name: T('brun', 'brown') },
  },
  // key = the two pot ids sorted alphabetically, joined by '+'
  mix: { 'jaune+rouge': 'orange', 'bleu+jaune': 'vert', 'bleu+rouge': 'violet', 'blanc+rouge': 'rose', 'blanc+bleu': 'bleuPale', 'bleu+noir': 'bleuFonce', 'blanc+noir': 'gris', 'blanc+jaune': 'jaunePale', 'noir+rouge': 'rougeFonce', 'jaune+noir': 'olive' },
};
export const mixOf = (a, b) => (a === b ? a : paints.mix[[a, b].sort().join('+')] || 'brun');

export const lessons = [L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, L11, L12, L13, L14, L15, L16, L17, L18, L19, L20];
export const projects = [P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16, P17, P18, P19, P20];
