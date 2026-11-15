// Arts plastiques — impression (tampons, frottage, monotype, pochoirs) (étapes générées par de petites fonctions SVG ; schéma : docs/ARTS.md)
const INK = '#3a3f55', HL = '#ff5d8f';
const RED = '#e8484f', ORG = '#ff9a3c', YEL = '#ffd23f', GRN = '#4cb85a', BLU = '#3d7be0', PUR = '#8e5bd0', PNK = '#f48fb1', BRN = '#8a5a3c', SKY = '#bfe3ff', DG = '#2f8f46', WH = '#ffffff';
let cur = 0, now = 0;   // now = drawing the current step (tools only show then)
const tl = (s) => (now ? s : '');   // 1 while drawing the piece that is new in this step
const sk = (w = 3) => (cur ? `stroke="${HL}" stroke-width="5"` : `stroke="${INK}" stroke-width="${w}"`);
const halo = () => (cur ? ` stroke="${HL}" stroke-width="4"` : '');
const R = (x, y, w, h, f, rx = 5) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${sk()}/>`;
const E = (x, y, rx, ry, f) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${sk()}/>`;
const C = (x, y, r, f) => E(x, y, r, r, f);
const P = (d, f = 'none', w = 3) => `<path d="${d}" fill="${f}" ${sk(w)} stroke-linecap="round" stroke-linejoin="round"/>`;
const T = (pts, f) => `<polygon points="${pts}" fill="${f}" ${sk()} stroke-linejoin="round"/>`;
const pe = (x, y, rx, ry, f, rot = 0) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}"${halo()}${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''}/>`;
const pc = (x, y, r, f) => pe(x, y, r, r, f);
const pp = (d, f) => `<path d="${d}" fill="${f}"${halo()} stroke-linejoin="round"/>`;
const pr = (x, y, w, h, f, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}"${halo()}/>`;
const pl = (d, c, w = 8) => (cur ? `<path d="${d}" fill="none" stroke="${HL}" stroke-width="${w + 7}" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>` : '') + `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const defd = new Set();   // shape ids already defined in the current svg
const use = (id, d, pts, f) => (defd.has(id) ? '' : (defd.add(id), `<defs><path id="${id}" d="${d}"/></defs>`)) + `<g fill="${f}"${halo()}>${pts.map(([x, y, r = 0, k = 1]) => `<use href="#${id}" transform="translate(${x} ${y})${r ? ` rotate(${r})` : ''}${k !== 1 ? ` scale(${k})` : ''}"/>`).join('')}</g>`;
const dots = (a, r, f) => `<g fill="${f}"${halo()}>${a.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`;
const ring = (cx, cy, r, n, f, rr, a0 = 0) => dots(Array.from({ length: n }, (_, i) => { const a = a0 + i * 2 * Math.PI / n; return [Math.round(cx + r * Math.cos(a)), Math.round(cy + r * Math.sin(a))]; }), rr, f);
const NEWS = () => `<rect x="12" y="10" width="376" height="280" rx="4" fill="#e9e5da" stroke="${cur ? HL : INK}" stroke-width="${cur ? 5 : 3}"/><path d="M28 30H120M28 46H96M280 262H370M300 276H368M28 262H80" stroke="#b9b3a2" stroke-width="5" stroke-linecap="round"/>`;
const SHEET = (f = '#fffdf7') => R(40, 26, 320, 248, f, 4);
const GLASS = (n) => (n ? R(318, 212, 52, 64, '#d9f0ff', 8) + `<path d="M322 236q12-7 22 0t22 0" fill="none" stroke="#6fb4e8" stroke-width="4"/>` : '');
const CLOCK = (n) => (n ? C(345, 52, 22, '#fff') + `<path d="M345 36V52L357 58" fill="none" ${sk(4)} stroke-linecap="round"/>` : '');
const brush = (x, y, a, c) => tl(`<g transform="translate(${x} ${y}) rotate(${a})"><path d="M-5-14Q-6-2 0 5Q6-2 5-14Z" fill="${c}" ${sk(2)}/>${R(-6, -32, 12, 18, '#c9ced9', 2)}${R(-4, -86, 8, 54, '#e0a458', 3)}</g>`)
const spg = (x, y) => tl(R(x - 24, y - 16, 48, 32, '#f2d36b', 12) + `<g fill="#d9b648">${[[-9, -4, 4], [8, -7, 3], [3, 6, 4], [-12, 7, 3], [14, 5, 3]].map(([a, b, r]) => `<circle cx="${x + a}" cy="${y + b}" r="${r}"/>`).join('')}</g>`);
const swab = (x, y, c) => tl(`<g transform="translate(${x} ${y}) rotate(25)">${R(-3, -62, 6, 58, '#fff', 2)}<ellipse cx="0" cy="0" rx="7" ry="9" fill="${c}" ${sk(2)}/></g>`);
const fng = (x, y, c) => tl(`<g transform="translate(${x} ${y}) rotate(-20)">${R(-10, -70, 20, 62, '#f2c6a0', 10)}<ellipse cx="0" cy="-6" rx="10" ry="8" fill="${c}" ${sk(2)}/></g>`);
const HANDD = (() => { const f = (cx, cy, a) => { const r = a * Math.PI / 180, c = Math.cos(r), s = Math.sin(r), p = (x, y) => `${Math.round(cx + x * c - y * s)} ${Math.round(cy + x * s + y * c)}`; return `M${p(0, -15)}C${p(7, -15)} ${p(7, 15)} ${p(0, 15)}C${p(-7, 15)} ${p(-7, -15)} ${p(0, -15)}Z`; }; return 'M0-5C17-5 17 33 0 33C-17 33-17-5 0-5Z' + [[-18, -12, -20], [-6, -22, -6], [7, -23, 6], [19, -13, 22], [-22, 12, -60]].map((a) => f(...a)).join(''); })();
const hand = (x, y, c, s = 1, r = 0) => use('phd', HANDD, [[x, y, r, s]], c);
const pot = (x, y, c) => R(x - 20, y, 40, 28, '#f4efe3', 5) + E(x, y, 20, 7, c);
const sunP = (x, y, r, c = YEL) => pl(Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `M${Math.round(x + (r + 8) * Math.cos(a))} ${Math.round(y + (r + 8) * Math.sin(a))}L${Math.round(x + (r + 22) * Math.cos(a))} ${Math.round(y + (r + 22) * Math.sin(a))}`; }).join(''), c, 6) + pc(x, y, r, c);
const cloud = (x, y, s = 1, f = WH) => `<g transform="translate(${x} ${y}) scale(${s})">${pp('M-40 14Q-52 14-48 2Q-44-8-30-6Q-26-22-8-20Q8-34 24-18Q44-22 46-6Q58-2 52 14Z', f)}</g>`;
const grass = (c = GRN) => pl('M50 262Q80 246 110 262T170 262T230 262T290 262T350 262', c, 12);
const NS = ['Couvre la table avec du papier journal.', 'Cover the table with newspaper.', NEWS];
const SH = (f) => ['Pose la feuille sur le papier journal.', 'Put the paper on the newspaper.', () => SHEET(f)];
const RINSE = ['Rince ton pinceau dans l’eau.', 'Rinse your brush in the water.', GLASS];
const DRY = ['Laisse sécher.', 'Let it dry.', CLOCK];
const M = {
  news: ['Papier journal', 'Newspaper'], sheet: ['Feuille de papier épais', 'Thick paper'], brush: ['Pinceaux', 'Paintbrushes'], gou: ['Gouache', 'Poster paint'],
  water: ['Pot d’eau', 'Jar of water'], plate: ['Assiette en carton (palette)', 'Paper plate (palette)'], sponge: ['Éponge', 'Sponge'], swab: ['Cotons-tiges', 'Cotton swabs'],
  aqua: ['Aquarelle', 'Watercolours'], wax: ['Crayons de cire', 'Wax crayons'], oil: ['Pastels gras', 'Oil pastels'], dry: ['Pastels secs', 'Soft pastels'], tissue: ['Papier mouchoir', 'Tissue paper'],
  towel: ['Essuie-tout', 'Paper towel'], straw: ['Paille', 'Straw'], string: ['Ficelle', 'String'], salt: ['Gros sel', 'Coarse salt'], shirt: ['Vieux t-shirt (tablier)', 'Old T-shirt (apron)'],
  marker: ['Feutres', 'Markers'], pencil: ['Crayon à mine', 'Pencil'], scissors: ['Ciseaux', 'Scissors'], glue: ['Colle en bâton', 'Glue stick'], col: ['Crayons de couleur', 'Coloured pencils'],
  paper: ['Papier blanc', 'White paper'], cardb: ['Carton', 'Cardboard'], tray: ['Plateau ou grande assiette', 'Tray or big plate'],
};
const mk = (K, id, emoji, fr, en, level, minutes, theme, season, mats, adult, steps) => ({
  id: K + '-' + id, cat: K, emoji, title: { fr, en }, level, minutes, theme, season, materials: mats.map(([a, b]) => ({ fr: a, en: b })), adult,
  steps: steps.map((s, i) => {
    let o = ''; defd.clear();
    for (let j = 0; j <= i; j++) { now = j === i; cur = (j === i && i < steps.length - 1) ? 1 : 0; o += steps[j][2](j === i); }
    cur = 0;
    return { svg: `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${o}</svg>`, text: { fr: s[0], en: s[1] } };
  }),
});

const K = 'impression';
const HRT = 'M0 16C-6 8-22-2-22-14C-22-26-6-28 0-18C6-28 22-26 22-14C22-2 6 8 0 16Z';
const STR = 'M0-24L7-8L24-8L10 3L15 20L0 10L-15 20L-10 3L-24-8L-7-8Z';
const FSH = 'M-24 0Q-8-20 14-10L28-18V18L14 10Q-8 20-24 0Z';
const LEF = 'M0 26Q-24 0 0-28Q24 0 0 26Z';
const hrt = (pts, f) => use('ph', HRT, pts, f), str = (pts, f) => use('ps', STR, pts, f), fsh = (pts, f) => use('pf', FSH, pts, f), lef = (pts, f) => use('pl', LEF, pts, f);
const pre = ['Papier journal', 'Newspaper'], gp = ['Gouache', 'Poster paint'], pl8 = ['Assiette en carton', 'Paper plate'], pt = ['Pomme de terre', 'Potato'], kn = ['Couteau (adulte)', 'Knife (adult)'], wp = ['Lingettes', 'Wet wipes'];
const potato = (x, y, d, c) => tl(E(x, y, 52, 38, '#efd9a0') + `<path transform="translate(${x} ${y}) scale(.9)" d="${d}" fill="${c}"/>`);
const cork = (x, y) => tl(`<g transform="translate(${x} ${y}) rotate(20)">${R(-12, -50, 24, 50, '#d9a95e', 4)}${E(0, 0, 12, 5, '#c3924a')}</g>`);
const roll = (x, y) => tl(`<g transform="translate(${x} ${y}) rotate(-20)">${R(-12, -40, 24, 80, '#cfa66b', 4)}${E(0, -40, 12, 5, '#fff1d6')}</g>`);
const pad = (x, y, c) => R(x - 50, y, 100, 36, '#f4efe3', 6) + E(x, y + 6, 40, 9, c);
export const projects = [
  mk(K, 'pdt-coeurs', '💗', 'Des cœurs en tampons de pomme de terre', 'Potato-stamp hearts', 2, 25, 'fetes', 'saint-valentin', [pt, kn, gp, pl8, M.news, M.sheet], true, [
    ['Un adulte coupe une pomme de terre en deux.', 'A grown-up cuts a potato in half.', () => tl(E(130, 150, 70, 50, '#efd9a0'))],
    ['Un adulte dessine un cœur et coupe autour pour qu’il dépasse.', 'A grown-up draws a heart and cuts around it so it sticks out.', () => potato(130, 150, HRT, '#c9a15a')],
    NS, SH(), ['Verse de la gouache rouge dans une assiette. Trempe le tampon.', 'Pour red paint on a plate. Dip the stamp.', () => pad(320, 215, RED) + potato(240, 160, HRT, RED)],
    ['Appuie le tampon sur la feuille et soulève-le. Un cœur !', 'Press the stamp on the paper and lift it. A heart!', () => hrt([[120, 90, -10]], RED)],
    ['Fais plein de cœurs rouges en retrempant à chaque fois.', 'Make lots of red hearts, dipping the stamp each time.', () => hrt([[200, 70, 8], [280, 100, -8], [150, 160, 10], [240, 170, -12]], RED)],
    ['Change de couleur : lave le tampon et fais des cœurs roses.', 'Change colour: wash the stamp and make pink hearts.', () => hrt([[320, 60, 12, 0.7], [90, 215, -8, 0.7], [180, 230, 10, 0.7], [290, 235, -10, 0.7]], PNK)],
    ['Laisse sécher. Ta feuille d’amour est prête !', 'Let it dry. Your love paper is ready!', () => ''],
  ]),
  mk(K, 'pdt-etoiles', '⭐', 'Des étoiles en tampons de pomme de terre', 'Potato-stamp stars', 1, 20, 'fetes', 'noel', [pt, kn, gp, pl8, M.news, ['Papier bleu foncé', 'Dark blue paper']], true, [
    ['Un adulte coupe une pomme de terre en deux et sculpte une étoile.', 'A grown-up cuts a potato in half and carves a star.', () => potato(130, 150, STR, '#c9a15a')],
    NS, SH('#2a3a8a'), ['Verse de la peinture jaune dans une assiette.', 'Pour yellow paint on a plate.', () => pad(320, 220, YEL)],
    ['Trempe le tampon et tapote sur du papier journal pour enlever le surplus.', 'Dip the stamp and dab on newspaper to remove the extra.', () => potato(250, 170, STR, YEL)],
    ['Appuie sur la feuille bleue. Soulève. Une étoile !', 'Press on the blue paper. Lift. A star!', () => str([[100, 90, -12]], YEL)],
    ['Fais d’autres étoiles. Tourne le tampon pour changer.', 'Make more stars. Turn the stamp to change it.', () => str([[230, 70, 10], [330, 120, -8], [90, 200, 14], [200, 160, 0], [290, 230, -15]], YEL)],
    ['Avec de la peinture blanche, ajoute des petits points. Laisse sécher.', 'With white paint, add little dots. Let it dry.', () => dots([[150, 50], [60, 130], [150, 240], [320, 190], [270, 60], [350, 50]], 4, WH)],
  ]),
  mk(K, 'pdt-poissons', '🐟', 'Des poissons au tampon', 'Fish stamps', 3, 30, 'animaux', null, [pt, kn, gp, pl8, M.news, M.sheet, M.swab], true, [
    ['Un adulte coupe une pomme de terre en deux et dessine un poisson.', 'A grown-up cuts a potato in half and draws a fish.', () => potato(130, 150, FSH, '#c9a15a')],
    ['Un adulte coupe autour du poisson pour qu’il dépasse.', 'A grown-up cuts around the fish so it sticks out.', () => potato(130, 150, FSH, '#c9a15a')],
    NS, SH('#d6ecff'), ['Trempe le tampon dans de la gouache orange. Tapote.', 'Dip the stamp in orange paint. Dab.', () => pad(320, 215, ORG) + potato(250, 160, FSH, ORG)],
    ['Appuie le tampon sur la feuille. Fais un banc de poissons.', 'Press the stamp on the paper. Make a school of fish.', () => fsh([[100, 80, 5], [200, 100, -5], [300, 70, 8], [150, 160, -8]], ORG)],
    ['Lave le tampon. Fais d’autres poissons en bleu et en vert.', 'Wash the stamp. Make more fish in blue and green.', () => fsh([[260, 170, 6], [90, 230, -6]], BLU) + fsh([[210, 235, 4]], GRN)],
    ['Avec un coton-tige, fais un point noir pour chaque œil.', 'With a cotton swab, make a black dot for each eye.', () => dots([[88, 74], [188, 94], [288, 64], [138, 154], [248, 164], [78, 224], [198, 229]], 3.5, INK) + swab(330, 110, INK)],
    ['Fais des bulles et des algues avec ton doigt. Laisse sécher.', 'Make bubbles and seaweed with your finger. Let it dry.', () => dots([[340, 200], [330, 180], [350, 160]], 6, '#fff') + pl('M60 270Q50 245 65 230M330 270Q320 245 335 232', DG, 5)],
  ]),
  mk(K, 'bouchons-raisins', '🍇', 'Une grappe en tampons de bouchons', 'A cork-stamp grape bunch', 1, 15, 'nourriture', 'automne', [['Bouchon de liège ou de plastique', 'Cork or plastic stopper'], gp, pl8, M.news, M.sheet, M.brush], false, [
    NS, SH(), ['Verse de la gouache mauve dans une assiette.', 'Pour purple paint on a plate.', () => pad(320, 220, PUR)],
    ['Trempe le bouchon dans la peinture.', 'Dip the cork in the paint.', () => cork(260, 190)],
    ['Appuie un rond en haut. Ce sera le haut de la grappe.', 'Press a circle at the top. It will be the top of the bunch.', () => dots([[160, 80], [200, 80], [240, 80]], 18, PUR)],
    ['Fais deux rangées de plus, avec moins de ronds à chaque fois.', 'Make two more rows, with fewer circles each time.', () => dots([[180, 118], [220, 118], [200, 156]], 18, PUR) + dots([[160, 118], [240, 118]], 18, '#a070e0')],
    ['Fais un dernier rond en bas, en pointe.', 'Make a last circle at the bottom, as the tip.', () => dots([[200, 196]], 18, '#a070e0')],
    ['Peins une tige brune et une grande feuille verte avec le pinceau.', 'Paint a brown stem and a big green leaf with the brush.', () => pl('M200 60V35', BRN, 7) + pp('M205 40Q250 10 290 35Q250 60 205 40Z', GRN)],
  ]),
  mk(K, 'bouchons-fleurs', '🌼', 'Des fleurs au bouchon', 'Cork-stamp flowers', 1, 20, 'nature', 'printemps', [['Bouchons de liège ou de plastique', 'Corks or plastic stoppers'], gp, pl8, M.news, M.sheet, M.brush], false, [
    NS, SH(), ['Mets du rose dans une assiette. Trempe le bouchon.', 'Put pink on a plate. Dip the cork.', () => pad(320, 220, PNK) + cork(260, 190)],
    ['Appuie six fois le bouchon en rond pour faire les pétales.', 'Press the cork six times in a circle to make petals.', () => ring(130, 100, 30, 6, PNK, 16, 0.5)],
    ['Avec un bouchon propre, mets un rond jaune au milieu.', 'With a clean cork, add a yellow circle in the middle.', () => dots([[130, 100]], 14, YEL)],
    ['Fais deux autres fleurs, en orange et en mauve.', 'Make two more flowers, in orange and purple.', () => ring(270, 120, 30, 6, ORG, 16, 0.2) + dots([[270, 120]], 14, YEL) + ring(190, 205, 26, 6, '#b06ad0', 14) + dots([[190, 205]], 12, YEL)],
    ['Avec le pinceau, peins les tiges vertes et des feuilles.', 'With the brush, paint the green stems and leaves.', () => pl('M130 145V270M270 165V270M190 240V270', GRN, 7) + pp('M130 220Q95 205 85 225Q110 240 130 230Z', DG) + pp('M270 230Q305 215 315 235Q290 250 270 240Z', DG)],
  ]),
  mk(K, 'bonhomme-couvercles', '⛄', 'Un bonhomme de neige aux bouchons', 'A lid-stamp snowman', 1, 20, 'hiver', 'hiver', [['Bouchons de différentes grandeurs', 'Lids and corks of different sizes'], gp, pl8, M.news, ['Papier bleu', 'Blue paper'], M.brush], false, [
    NS, SH('#5a7fd0'), ['Trouve trois bouchons de grandeurs différentes : petit, moyen, grand.', 'Find three lids of different sizes: small, medium, big.', () => C(110, 90, 40, '#fff6c9') + C(190, 100, 28, '#fff6c9') + C(250, 108, 18, '#fff6c9')],
    ['Trempe le grand couvercle dans le blanc. Appuie-le en bas.', 'Dip the big lid in white. Press it at the bottom.', () => pad(330, 235, WH) + dots([[200, 205]], 52, WH)],
    ['Avec le couvercle moyen, fais le ventre.', 'With the medium lid, make the belly.', () => dots([[200, 135]], 38, WH)],
    ['Avec le petit bouchon, fais la tête.', 'With the small cork, make the head.', () => dots([[200, 85]], 26, WH)],
    ['Avec ton doigt, fais des boutons noirs. Peins un nez orange.', 'With your finger, make black buttons. Paint an orange nose.', () => dots([[200, 125], [200, 145], [200, 165]], 5, INK) + dots([[190, 78], [210, 78]], 4, INK) + pp('M200 85L235 92L200 96Z', ORG)],
    ['Ajoute un chapeau noir, des bras bruns et de la neige. Laisse sécher.', 'Add a black hat, brown arms and snow. Let it dry.', () => pr(172, 50, 56, 10, INK, 3) + pr(182, 26, 36, 28, INK, 3) + pl('M165 140L115 110M235 140L285 110', BRN, 5) + dots([[60, 60], [330, 70], [320, 200], [70, 190]], 5, WH)],
  ]),
  mk(K, 'feuilles-imprimees', '🍁', 'Des feuilles imprimées', 'Leaf prints', 1, 20, 'nature', 'automne', [['Feuilles d’arbre fraîches', 'Fresh tree leaves'], gp, M.brush, M.news, M.sheet, M.towel], false, [
    NS, SH(), ['Ramasse des feuilles avec des belles nervures. Pose-en une, dessous vers le haut.', 'Collect leaves with nice veins. Put one face down on the newspaper, veins up.', () => lef([[130, 150, 20]], '#7ac7a1')],
    ['Peins le dessous de la feuille avec de la gouache rouge.', 'Paint the underside of the leaf with red paint.', () => lef([[130, 150, 20]], RED) + brush(190, 130, 25, RED)],
    ['Retourne la feuille sur la feuille de papier. Appuie avec un essuie-tout.', 'Flip the leaf onto the paper. Press with a paper towel.', () => lef([[100, 80, 20]], RED) + tl(R(60, 60, 80, 70, '#f6f1e3', 8))],
    ['Soulève la feuille doucement par la tige. Regarde les nervures !', 'Lift the leaf gently by the stem. Look at the veins!', () => `<path d="M100 56L100 110M100 80L84 68M100 92L116 80" stroke="#fff" stroke-width="3" opacity=".8"/>`],
    ['Fais d’autres feuilles en orange et en jaune.', 'Make more leaves in orange and yellow.', () => lef([[210, 100, -30], [300, 130, 40]], ORG) + lef([[180, 210, 10], [290, 220, -20]], YEL)],
    ['Laisse sécher. Ta forêt d’automne est prête !', 'Let it dry. Your autumn forest is ready!', () => lef([[100, 220, -50]], RED)],
  ]),
  mk(K, 'frottage-pieces', '🪙', 'Des pièces de monnaie en frottage', 'Coin rubbings', 1, 10, 'decouverte', null, [['Pièces de monnaie', 'Coins'], M.paper, ['Crayon de cire ou de plomb', 'Wax crayon or pencil']], false, [
    ['Pose des pièces de monnaie sur la table.', 'Put some coins on the table.', () => C(110, 130, 36, '#d9dde6') + C(220, 130, 30, '#e8c07a') + C(300, 140, 26, '#c98e4d')],
    SH(), ['Recouvre les pièces avec une feuille. Tiens-la bien.', 'Cover the coins with a sheet of paper. Hold it still.', () => ''],
    ['Frotte doucement avec le côté d’un crayon de cire.', 'Rub gently with the side of a wax crayon.', () => R(80, 100, 60, 8, RED, 4)],
    ['Une image apparaît ! Frotte jusqu’au bord.', 'A picture appears! Rub right up to the edge.', () => C(110, 130, 36, '#f4b1b8') + C(220, 130, 30, '#f4b1b8') + C(300, 140, 26, '#f4b1b8')],
    ['Fais d’autres frottages avec des couleurs différentes.', 'Make more rubbings with different colours.', () => C(100, 220, 30, '#a5c4f2') + C(190, 225, 26, '#bfe8b0') + C(280, 220, 32, '#ffe27a')],
  ]),
  mk(K, 'frottage-feuilles', '🍃', 'Un frottage de feuilles', 'A leaf rubbing', 1, 15, 'nature', 'automne', [['Feuilles sèches', 'Dry leaves'], M.paper, ['Crayons de cire', 'Wax crayons']], false, [
    ['Ramasse des feuilles de formes différentes.', 'Collect leaves of different shapes.', () => lef([[110, 120, -20]], GRN) + lef([[200, 100, 10]], ORG) + lef([[290, 125, 30]], RED)],
    ['Pose les feuilles à l’envers, nervures vers le haut.', 'Place the leaves upside down, veins up.', () => lef([[110, 150, -20]], '#b5e0a0') + lef([[210, 150, 10]], '#b5e0a0') + lef([[300, 150, 30]], '#b5e0a0')],
    SH(), ['Pose une feuille de papier mince par-dessus.', 'Lay a sheet of thin paper over them.', () => ''],
    ['Enlève le papier d’un crayon de cire. Frotte doucement avec le côté.', 'Peel the paper off a wax crayon. Rub gently with the side.', () => R(90, 150, 70, 9, ORG, 4)],
    ['Les feuilles apparaissent ! Change de couleur pour chaque feuille.', 'The leaves appear! Change colour for each leaf.', () => lef([[110, 150, -20]], '#e8484f') + lef([[200, 150, 10]], ORG) + lef([[290, 150, 30]], '#8a5a3c')],
    ['Ajoute des tiges au crayon. Laisse reposer.', 'Add stems with a pencil. Let it rest.', () => pl('M110 178L100 215M200 178L205 218M290 178L280 215', INK, 3)],
  ]),
  mk(K, 'chasse-textures', '🔎', 'La chasse aux textures', 'The texture hunt', 2, 25, 'decouverte', null, [['Objets texturés : grille, brique, bois, feuille', 'Textured things: grille, brick, wood, leaf'], M.paper, M.wax, M.tape || ['Ruban adhésif', 'Tape']], false, [
    ['Fais une promenade dans la maison pour trouver des textures rugueuses.', 'Walk around the house to find rough textures.', () => R(60, 60, 90, 70, '#e8c07a', 4) + R(170, 60, 90, 70, '#b9bccc', 4) + R(280, 60, 60, 70, '#c98e4d', 4)],
    ['Colle une feuille sur un mur ou un objet avec du ruban.', 'Tape a sheet of paper on a wall or object.', () => R(100, 150, 150, 100, '#fff', 4) + R(85, 170, 20, 12, '#d9a95e', 2)],
    ['Frotte avec le côté d’un crayon de cire. La texture sort !', 'Rub with the side of a wax crayon. The texture comes out!', () => `<g stroke="${BLU}" stroke-width="4" opacity=".8"><path d="M110 170H240M110 190H240M110 210H240M110 230H240"/></g>`],
    ['Essaie une grille : tu vois des carrés.', 'Try a grille: you see squares.', () => R(270, 160, 80, 70, '#fff', 3) + `<path d="M280 170H340M280 185H340M280 200H340M280 215H340M290 165V225M305 165V225M320 165V225M335 165V225" stroke="${RED}" stroke-width="3"/>`],
    ['Essaie du bois, une brique, une feuille, un tapis.', 'Try wood, a brick, a leaf, a rug.', () => R(40, 160, 50, 70, '#fff', 3) + `<path d="M50 170Q60 200 50 220M65 168Q75 200 65 222M80 170Q70 200 80 220" fill="none" stroke="${GRN}" stroke-width="3"/>`],
    ['Découpe tes frottages et colle-les pour faire un monstre de textures.', 'Cut out your rubbings and glue them into a texture monster.', () => ''],
  ]),
  mk(K, 'frottage-ecorce', '🌲', 'Un frottage d’écorce', 'A bark rubbing', 1, 20, 'nature', null, [['Un arbre dehors', 'A tree outside'], M.paper, M.wax, M.tape || ['Ruban adhésif', 'Tape']], false, [
    ['Choisis un arbre avec une écorce bien rugueuse.', 'Choose a tree with really rough bark.', () => R(150, 30, 100, 240, '#a0603a', 6) + `<path d="M170 40V260M200 40V260M230 40V260" stroke="#7a4a28" stroke-width="5"/>`],
    SH(), ['Tiens la feuille contre le tronc. Colle-la avec du ruban.', 'Hold the paper against the trunk. Tape it on.', () => `<path d="M150 80H250M150 220H250" stroke="${INK}" stroke-width="3"/>`],
    ['Frotte de haut en bas avec le côté d’un crayon de cire brun.', 'Rub from top to bottom with the side of a brown wax crayon.', () => `<path d="M170 90V210M200 90V210M230 90V210" stroke="#7a4a28" stroke-width="12" stroke-linecap="round"/>`],
    ['Retire la feuille. Regarde l’écorce sur ton papier !', 'Take off the paper. Look at the bark on your paper!', () => R(150, 50, 100, 200, '#fffdf7', 4) + `<g stroke="#8a5a3c" stroke-width="9" stroke-linecap="round"><path d="M170 70V230M195 70V230M220 70V230M240 80V220" /></g>`],
    ['Dessine des branches et des feuilles vertes avec des crayons de cire.', 'Draw branches and green leaves with wax crayons.', () => pl('M170 70L120 40M230 70L285 40', '#8a5a3c', 8) + dots([[110, 40], [140, 55], [290, 38], [265, 55], [200, 50]], 14, GRN)],
  ]),
  mk(K, 'monotype-poisson', '🐠', 'Un monotype de poisson', 'A fish monoprint', 2, 25, 'animaux', null, [['Plateau en plastique ou assiette', 'Plastic tray or plate'], gp, M.brush, M.swab, M.paper, M.news], false, [
    NS, ['Étale une couche de gouache bleue sur le plateau avec un pinceau.', 'Spread a layer of blue paint on the tray with a brush.', () => R(70, 60, 260, 180, BLU, 10) + brush(330, 110, 25, BLU)],
    ['Avec un coton-tige, dessine un poisson dans la peinture. Ça enlève la couleur.', 'With a cotton swab, draw a fish in the paint. It removes the colour.', () => `<path d="M120 150Q180 90 240 140L290 105V195L240 160Q180 210 120 150Z" fill="none" stroke="#a5c4f2" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>` + swab(320, 220, '#a5c4f2')],
    ['Ajoute un œil et des vagues dans la peinture.', 'Add an eye and waves in the paint.', () => C(150, 140, 7, '#a5c4f2') + `<path d="M90 80Q110 70 130 80T170 80M230 215Q250 205 270 215T310 215" fill="none" stroke="#a5c4f2" stroke-width="6" stroke-linecap="round"/>`],
    ['Pose une feuille sur le plateau, sans la bouger. Frotte avec ta main.', 'Lay a sheet on the tray and don’t move it. Rub with your hand.', () => R(80, 70, 240, 160, '#fffdf7', 4) + tl(hand(300, 160, '#f2c6a0', 1.1, 20))],
    ['Soulève la feuille doucement. Le poisson est apparu !', 'Peel the sheet slowly. The fish has appeared!', () => R(80, 70, 240, 160, BLU, 4) + `<path d="M120 150Q180 90 240 140L290 105V195L240 160Q180 210 120 150Z" fill="none" stroke="#fffdf7" stroke-width="6" stroke-linejoin="round"/>`],
    ['Laisse sécher. Colorie le poisson avec des feutres si tu veux.', 'Let it dry. Colour the fish with markers if you like.', () => pp('M126 150Q180 100 236 142L284 112V188L236 158Q180 200 126 150Z', ORG)],
  ]),
  mk(K, 'monotype-fleur', '🌷', 'Un monotype de fleur', 'A flower monoprint', 3, 30, 'nature', 'printemps', [['Plateau en plastique', 'Plastic tray'], gp, M.brush, M.pencil, M.paper, M.news], false, [
    NS, ['Étale de la gouache rose sur tout le plateau. Fais une couche mince.', 'Spread pink paint all over the tray. Make a thin layer.', () => R(70, 60, 260, 180, '#f06c9b', 10)],
    SH(), ['Pose doucement la feuille sur la peinture.', 'Lay the sheet gently on the paint.', () => R(80, 70, 240, 160, '#fffdf7', 4)],
    ['Avec un crayon, dessine une fleur sur le dos de la feuille. Appuie fort.', 'With a pencil, draw a flower on the back of the sheet. Press hard.', () => pl('M200 200V130M200 150L170 140M200 165L230 150', GRN, 4) + ring(200, 105, 28, 6, PNK, 6) + pc(200, 105, 10, YEL) + tl(`<g transform="translate(250 120) rotate(40)">${R(-3, -60, 6, 60, '#e0a458', 2)}</g>`)],
    ['Ne bouge pas la feuille ! Soulève un coin pour regarder.', 'Don’t move the sheet! Lift a corner to peek.', () => `<path d="M80 70L110 70L80 100Z" fill="#fff" stroke="${HL}" stroke-width="4"/>`],
    ['Retire la feuille : les lignes de ton dessin sont en peinture.', 'Peel off the sheet: the lines of your drawing are in paint.', () => R(80, 70, 240, 160, '#fffdf7', 4) + `<g fill="none" stroke="#e0527f" stroke-width="5" stroke-linecap="round"><path d="M200 200V130M200 150L170 140M200 165L230 150"/>${[0, 60, 120, 180, 240, 300].map((a) => `<ellipse cx="200" cy="77" rx="9" ry="14" transform="rotate(${a} 200 105)"/>`).join('')}</g>`],
    ['Laisse sécher. Ajoute du jaune et du vert avec le pinceau.', 'Let it dry. Add yellow and green with the brush.', () => pc(200, 105, 9, YEL) + pp('M195 170Q160 160 150 180Q175 190 195 180Z', GRN)],
  ]),
  mk(K, 'styro-poisson', '🐟', 'Un poisson en styromousse', 'A foam-plate fish', 2, 30, 'animaux', null, [['Barquette de styromousse', 'Styrofoam tray'], M.pencil, gp, ['Rouleau ou pinceau', 'Roller or brush'], M.paper, M.news], false, [
    NS, ['Découpe le fond plat d’une barquette de styromousse.', 'Cut out the flat bottom of a styrofoam tray.', () => R(90, 60, 220, 170, '#f2f4f8', 6)],
    ['Dessine un poisson en appuyant fort avec un crayon. Le trait creuse la styromousse.', 'Draw a fish pressing hard with a pencil. The line digs into the foam.', () => `<path d="M120 150Q180 90 240 140L285 108V192L240 158Q180 210 120 150Z" fill="none" stroke="#b9bccc" stroke-width="5" stroke-linejoin="round"/><circle cx="150" cy="140" r="6" fill="#b9bccc"/>`],
    ['Ajoute des écailles et des vagues avec le crayon.', 'Add scales and waves with the pencil.', () => `<path d="M190 120Q205 150 190 175M220 125Q235 150 220 168M100 90Q120 80 140 90T180 90" fill="none" stroke="#b9bccc" stroke-width="5" stroke-linecap="round"/>`],
    ['Étale de la gouache bleue sur la styromousse avec un rouleau.', 'Roll blue paint over the foam with a roller.', () => R(90, 60, 220, 170, BLU, 6) + tl(`<g transform="translate(270 110) rotate(-90)">${R(-10, -22, 20, 44, '#cfa66b', 4)}${R(-3, -60, 6, 38, '#9aa0b4', 2)}</g>`)],
    ['Pose une feuille dessus. Frotte avec la main. Le dessin s’imprime !', 'Lay a sheet on top. Rub with your hand. The drawing prints!', () => R(100, 70, 220, 165, '#fffdf7', 4) + tl(hand(290, 150, '#f2c6a0', 1.1, 20))],
    ['Soulève la feuille : le poisson est blanc dans le bleu !', 'Peel the sheet: the fish is white in the blue!', () => R(100, 70, 220, 165, BLU, 4) + `<path d="M130 150Q190 90 250 140L295 108V192L250 158Q190 210 130 150Z" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/><path d="M200 120Q215 150 200 175M230 125Q245 150 230 168" fill="none" stroke="#fff" stroke-width="5"/>`],
    ['Fais une deuxième impression en orange pour comparer.', 'Make a second print in orange to compare.', () => ''],
  ]),
  mk(K, 'styro-chat', '🐱', 'Un chat en styromousse', 'A foam-print cat', 2, 30, 'animaux', null, [['Barquette de styromousse', 'Styrofoam tray'], M.pencil, gp, M.brush, M.paper, M.news], false, [
    NS, ['Découpe une barquette de styromousse bien plate.', 'Cut a flat styrofoam tray piece.', () => R(100, 40, 200, 200, '#f2f4f8', 6)],
    ['Avec un crayon, dessine la tête d’un chat. Appuie fort.', 'With a pencil, draw a cat’s head. Press hard.', () => `<path d="M140 90L135 50L170 70Q200 62 230 70L265 50L260 90Q285 130 255 175Q200 215 145 175Q115 130 140 90Z" fill="none" stroke="#b9bccc" stroke-width="5" stroke-linejoin="round"/>`],
    ['Creuse les yeux, le nez, la bouche et les moustaches.', 'Dig the eyes, nose, mouth and whiskers.', () => `<g fill="none" stroke="#b9bccc" stroke-width="5" stroke-linecap="round"><circle cx="170" cy="115" r="9"/><circle cx="230" cy="115" r="9"/><path d="M190 145L210 145L200 158ZM200 158Q185 175 170 165M200 158Q215 175 230 165M120 130L85 120M120 145L85 150M280 130L315 120M280 145L315 150"/></g>`],
    ['Peins la styromousse avec de la gouache noire.', 'Paint the foam with black paint.', () => R(100, 40, 200, 200, INK, 6) + brush(300, 160, 25, INK)],
    ['Pose une feuille et frotte avec ta main. Soulève.', 'Lay a sheet on it and rub with your hand. Lift.', () => R(110, 50, 200, 200, '#fffdf7', 4) + tl(hand(300, 130, '#f2c6a0', 1.1, 20))],
    ['Le chat blanc sort du noir ! Fais d’autres impressions.', 'The white cat comes out of the black! Make more prints.', () => R(110, 50, 200, 200, INK, 4) + `<g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M150 100L145 62L178 80Q205 72 232 80L265 62L260 100Q280 135 255 175Q205 210 155 175Q130 135 150 100Z"/><circle cx="178" cy="125" r="9"/><circle cx="232" cy="125" r="9"/><path d="M193 150L217 150L205 163M130 140L95 130M280 140L315 130"/></g>`],
  ]),
  mk(K, 'styro-maison', '🏡', 'Une maison en styromousse', 'A foam-print house', 3, 40, 'objets', null, [['Barquette de styromousse', 'Styrofoam tray'], M.pencil, gp, ['Rouleau', 'Roller'], M.paper, M.news], false, [
    NS, ['Découpe une barquette de styromousse et dessine une maison avec un toit.', 'Cut a styrofoam tray piece and draw a house with a roof.', () => R(80, 50, 240, 200, '#f2f4f8', 6) + `<path d="M120 140H280V230H120ZM105 140L200 70L295 140" fill="none" stroke="#b9bccc" stroke-width="5" stroke-linejoin="round"/>`],
    ['Creuse une porte, des fenêtres et une cheminée.', 'Dig a door, windows and a chimney.', () => `<path d="M180 230V180H220V230M140 160H170V190H140ZM230 160H260V190H230ZM245 80V105" fill="none" stroke="#b9bccc" stroke-width="5"/>`],
    ['Ajoute des briques et de la fumée avec des petits traits.', 'Add bricks and smoke with little lines.', () => `<path d="M130 205H165M240 205H275M150 218H190M215 218H255M245 62Q255 52 245 42" fill="none" stroke="#b9bccc" stroke-width="4" stroke-linecap="round"/>`],
    ['Passe un rouleau de gouache rouge sur la styromousse.', 'Roll red paint over the foam.', () => R(80, 50, 240, 200, RED, 6) + tl(`<g transform="translate(340 150) rotate(0)">${R(-10, -30, 20, 60, '#cfa66b', 4)}</g>`)],
    ['Pose la feuille. Frotte partout avec la main. Soulève.', 'Lay the sheet. Rub everywhere with your hand. Lift.', () => R(90, 60, 240, 200, '#fffdf7', 4) + tl(hand(320, 190, '#f2c6a0', 1.1, 10))],
    ['Une maison est imprimée ! Fais-en une en bleu à côté.', 'A house is printed! Make a blue one next to it.', () => R(90, 60, 240, 200, RED, 4) + `<path d="M130 150H290V240H130ZM115 150L210 80L305 150M190 240V190H230V240M150 170H180V200H150ZM240 170H270V200H240Z" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/>`],
    ['Laisse sécher. Colorie la porte et les fenêtres aux crayons.', 'Let it dry. Colour the door and windows with pencils.', () => R(192, 192, 36, 46, YEL, 3) + R(152, 172, 26, 26, '#8fc2f2', 2) + R(242, 172, 26, 26, '#8fc2f2', 2)],
  ]),
  mk(K, 'rouleau-ficelle', '🧵', 'Un rouleau à la ficelle', 'A string roller', 3, 35, 'decouverte', null, [['Rouleau de papier de toilette', 'Toilet paper roll'], M.string, M.glue, gp, M.paper, M.news], false, [
    ['Prends un rouleau de papier de toilette et de la ficelle.', 'Take a toilet paper roll and some string.', () => R(130, 100, 100, 100, '#cfa66b', 6) + P('M250 130Q280 100 310 140T330 200', 'none', 4)],
    ['Colle la ficelle autour du rouleau en spirale. Laisse sécher.', 'Glue the string around the roll in a spiral. Let it dry.', () => R(130, 100, 100, 100, '#cfa66b', 6) + `<path d="M130 120Q180 130 230 120M130 140Q180 150 230 140M130 160Q180 170 230 160M130 180Q180 190 230 180" fill="none" stroke="#fff6e0" stroke-width="6"/>`],
    NS, SH(), ['Verse de la gouache dans une assiette. Roule le rouleau dedans.', 'Pour paint on a plate. Roll the roll in it.', () => pad(100, 215, BLU) + roll(250, 130)],
    ['Roule-le sur la feuille, tout droit, en appuyant bien.', 'Roll it across the paper, straight, pressing well.', () => pl('M60 80Q100 70 140 80T220 80T300 80', BLU, 7)],
    ['Fais d’autres lignes en changeant de couleur.', 'Make more lines changing colour.', () => pl('M60 130Q100 120 140 130T220 130T300 130', RED, 7) + pl('M60 180Q100 170 140 180T220 180T300 180', YEL, 7)],
    ['Roule dans tous les sens pour faire un beau papier. Laisse sécher.', 'Roll in all directions to make a beautiful paper. Let it dry.', () => pl('M70 60Q80 140 70 240M330 60Q320 140 330 240', GRN, 7)],
  ]),
  mk(K, 'rouleau-fleurs', '🌺', 'Des fleurs au rouleau de papier de toilette', 'Toilet-roll flowers', 1, 20, 'nature', 'printemps', [['Rouleau de papier de toilette', 'Toilet paper roll'], gp, pl8, M.news, M.sheet, M.brush], false, [
    NS, SH(), ['Écrase un bout du rouleau pour faire un cœur : plie-le en deux, puis appuie.', 'Squash one end of the roll into a heart: fold it, then press.', () => R(300, 80, 56, 40, '#cfa66b', 6) + `<path d="M310 82Q328 70 328 86Q328 70 346 82" fill="none" stroke="${INK}" stroke-width="3"/>`],
    ['Trempe le bout dans de la peinture rose.', 'Dip the end in pink paint.', () => pad(320, 215, PNK) + roll(255, 150)],
    ['Appuie cinq fois en rond : cinq pétales en forme de cœur.', 'Press five times in a circle: five heart-shaped petals.', () => hrt([[130, 66, 0, 0.7], [160, 90, 72, 0.7], [150, 128, 144, 0.7], [110, 128, 216, 0.7], [100, 90, 288, 0.7]], PNK)],
    ['Avec un doigt propre, fais un centre jaune.', 'With a clean finger, make a yellow centre.', () => dots([[130, 100]], 14, YEL)],
    ['Fais d’autres fleurs, puis peins les tiges vertes avec un pinceau.', 'Make more flowers, then paint green stems with a brush.', () => hrt([[270, 80, 0, 0.7], [300, 104, 72, 0.7], [290, 142, 144, 0.7], [250, 142, 216, 0.7], [240, 104, 288, 0.7]], ORG) + dots([[270, 120]], 14, YEL) + pl('M130 120V268M270 160V268', GRN, 7)],
  ]),
  mk(K, 'doigts-coccinelles', '🐞', 'Des coccinelles aux empreintes', 'Fingerprint ladybugs', 1, 15, 'animaux', 'ete', [['Tampon encreur ou gouache rouge', 'Ink pad or red paint'], M.sheet, M.marker, wp, M.pre || ['Papier blanc', 'White paper']], false, [
    SH(), ['Appuie ton pouce sur le tampon rouge.', 'Press your thumb on the red ink pad.', () => R(250, 190, 90, 56, '#f4efe3', 6) + E(295, 205, 36, 12, RED) + fng(280, 210, RED)],
    ['Appuie ton pouce sur la feuille : un ovale rouge, le corps.', 'Press your thumb on the paper: a red oval, the body.', () => pe(110, 110, 26, 34, RED)],
    ['Fais plusieurs ovales, bien espacés.', 'Make several ovals, well spaced.', () => pe(220, 90, 26, 34, RED, 20) + pe(310, 130, 26, 34, RED, -30) + pe(150, 210, 26, 34, RED, -15) + pe(260, 210, 26, 34, RED, 25)],
    ['Avec un feutre noir, dessine une tête et une ligne au milieu.', 'With a black marker, draw a head and a line down the middle.', () => P('M110 76V144', 'none', 3) + pc(110, 70, 11, INK)],
    ['Ajoute des points noirs sur les ailes.', 'Add black spots on the wings.', () => dots([[98, 98], [122, 98], [100, 125], [120, 125]], 4, INK)],
    ['Fais pareil pour toutes les coccinelles. Ajoute six pattes et deux antennes.', 'Do the same for every ladybug. Add six legs and two antennae.', () => dots([[212, 80], [230, 80], [304, 120], [320, 120], [142, 200], [160, 200], [252, 200], [270, 200]], 4, INK) + P('M80 90L62 82M80 110L60 112M80 130L62 142M140 90L158 82M140 110L160 112M140 130L158 142', 'none', 3)],
  ]),
  mk(K, 'doigts-poussins', '🐥', 'Des poussins aux empreintes', 'Fingerprint chicks', 1, 15, 'animaux', 'paques', [['Gouache jaune', 'Yellow paint'], M.sheet, M.marker, wp], false, [
    SH('#e8f7e0'), ['Trempe ton pouce dans la gouache jaune.', 'Dip your thumb in yellow paint.', () => pad(320, 215, YEL) + fng(260, 180, YEL)],
    ['Appuie ton pouce pour faire le corps du poussin.', 'Press your thumb to make the chick’s body.', () => pc(110, 160, 30, YEL)],
    ['Appuie ton index plus petit pour faire la tête.', 'Press your index finger, smaller, for the head.', () => pc(110, 100, 22, YEL)],
    ['Fais d’autres poussins sur la feuille.', 'Make more chicks on the paper.', () => dots([[220, 170], [310, 140], [200, 230]], 30, YEL) + dots([[220, 110], [310, 80], [200, 175]], 22, YEL)],
    ['Avec un feutre, dessine un œil et un bec orange.', 'With a marker, draw an eye and an orange beak.', () => dots([[100, 96], [212, 106], [300, 76], [192, 171]], 3.5, INK) + T('118,102 134,106 118,112', ORG) + T('230,112 246,116 230,122', ORG) + T('318,82 334,86 318,92', ORG)],
    ['Dessine des pattes et de l’herbe verte. Laisse sécher.', 'Draw legs and green grass. Let it dry.', () => P('M100 190V210M120 190V210', 'none', 4).replace(INK, ORG) + grass()],
  ]),
  mk(K, 'mains-papillon', '🦋', 'Un papillon de mains', 'A handprint butterfly', 1, 20, 'animaux', 'printemps', [gp, M.sheet, M.brush, wp, M.marker], false, [
    NS, SH(), ['Peins ta main gauche en violet.', 'Paint your left hand purple.', () => hand(90, 70, PUR, 0.9, 0) + brush(170, 60, 25, PUR)],
    ['Appuie-la sur la feuille, doigts vers le haut et vers la droite.', 'Press it on the paper, fingers pointing up and to the right.', () => hand(150, 130, PUR, 1.5, 45)],
    ['Lave ta main. Peins ta main droite en rose. Appuie-la de l’autre côté.', 'Wash your hand. Paint your right hand pink. Press it on the other side.', () => hand(250, 130, PNK, 1.5, -45)],
    ['Appuie deux petites mains en jaune vers le bas pour les ailes du bas.', 'Press two little yellow hands down for the lower wings.', () => hand(160, 220, YEL, 0.9, 150) + hand(240, 220, YEL, 0.9, -150)],
    ['Avec ton pinceau, peins le corps noir au milieu.', 'With your brush, paint the black body in the middle.', () => pe(200, 150, 9, 55, INK)],
    ['Dessine deux antennes au feutre. Laisse sécher.', 'Draw two antennae with a marker. Let it dry.', () => P('M200 98Q190 70 175 62M200 98Q210 70 225 62', 'none', 4)],
  ]),
  mk(K, 'pochoir-etoiles', '🌟', 'Des étoiles au pochoir', 'Star stencils', 2, 25, 'decorations', null, [M.cardb, M.scissors, M.sponge, gp, M.tape || ['Ruban adhésif', 'Tape'], ['Papier foncé', 'Dark paper']], false, [
    NS, ['Dessine une étoile sur un carton mince et découpe-la. Garde le carton troué.', 'Draw a star on thin cardboard and cut it out. Keep the cardboard with the hole.', () => R(90, 50, 200, 200, '#cfa66b', 4) + `<path d="${STR}" transform="translate(190 150) scale(3.6)" fill="#fff" stroke="${INK}" stroke-width="1"/>`],
    SH('#2a3a8a'), ['Pose le pochoir sur le papier. Colle-le avec un bout de ruban.', 'Place the stencil on the paper. Tape it down.', () => R(90, 50, 200, 200, '#cfa66b', 4) + `<path d="${STR}" transform="translate(190 150) scale(3.6)" fill="#2a3a8a" stroke="${INK}" stroke-width="1"/>`],
    ['Tamponne l’éponge dans la peinture jaune. Tapote le surplus.', 'Dab the sponge in yellow paint. Dab off the extra.', () => pad(330, 235, YEL) + spg(310, 160)],
    ['Tamponne dans le trou, de haut en bas. Ne frotte pas.', 'Dab into the hole, up and down. Don’t scrub.', () => `<path d="${STR}" transform="translate(190 150) scale(3.6)" fill="${YEL}"/>` + spg(270, 100)],
    ['Soulève le carton avec soin. Une étoile parfaite !', 'Lift the cardboard carefully. A perfect star!', () => str([[190, 150, 0, 3.6]], YEL)],
    ['Déplace le pochoir et fais d’autres étoiles, en jaune et en blanc.', 'Move the stencil and make more stars, in yellow and white.', () => str([[80, 70, 12, 1.3], [320, 90, -10, 1.8]], WH) + str([[90, 230, -8, 1.5], [310, 230, 10, 1.3]], YEL)],
  ]),
  mk(K, 'pochoir-dino', '🦕', 'Un dinosaure au pochoir', 'A dinosaur stencil', 3, 35, 'animaux', null, [M.cardb, M.scissors, M.sponge, gp, ['Ruban adhésif', 'Tape'], M.paper], false, [
    NS, ['Dessine un dinosaure bien simple sur un carton. Découpe-le en gardant le trou.', 'Draw a very simple dinosaur on cardboard. Cut it out and keep the hole.', () => R(70, 40, 260, 220, '#cfa66b', 4) + `<path d="M110 190Q110 130 170 130Q200 80 250 100Q280 95 270 125Q250 135 240 160L300 190L270 195L250 230H225L215 200H160L150 230H125L125 195Z" fill="#fff" stroke="${INK}" stroke-width="2"/>`],
    SH('#fff6e0'), ['Pose le pochoir sur la feuille et colle-le avec du ruban.', 'Lay the stencil on the paper and tape it down.', () => R(70, 40, 260, 220, '#cfa66b', 4) + `<path d="M110 190Q110 130 170 130Q200 80 250 100Q280 95 270 125Q250 135 240 160L300 190L270 195L250 230H225L215 200H160L150 230H125L125 195Z" fill="#fff6e0" stroke="${INK}" stroke-width="2"/>`],
    ['Tamponne de la gouache verte avec l’éponge dans le trou.', 'Dab green paint with the sponge into the hole.', () => `<path d="M110 190Q110 130 170 130Q200 80 250 100Q280 95 270 125Q250 135 240 160L300 190L270 195L250 230H225L215 200H160L150 230H125L125 195Z" fill="${GRN}"/>` + spg(320, 120)],
    ['Tamponne un peu de vert foncé sur les bords pour faire de l’ombre.', 'Dab a little dark green on the edges for shadow.', () => `<path d="M110 190Q110 130 170 130L170 160Q130 160 125 195Z" fill="${DG}" opacity=".8"/>`],
    ['Soulève le pochoir. Ton dinosaure apparaît !', 'Lift the stencil. Your dinosaur appears!', () => `<path d="M110 190Q110 130 170 130Q200 80 250 100Q280 95 270 125Q250 135 240 160L300 190L270 195L250 230H225L215 200H160L150 230H125L125 195Z" fill="none" stroke="${HL}" stroke-width="3" stroke-dasharray="8 6"/>`],
    ['Ajoute un œil, des taches jaunes et un volcan en arrière-plan.', 'Add an eye, yellow spots and a volcano in the background.', () => dots([[255, 112]], 5, INK) + dots([[150, 165], [185, 150], [200, 175]], 7, YEL) + pp('M30 260L80 190L130 260Z', BRN)],
  ]),
  mk(K, 'marbre-mousse', '🌈', 'Du papier marbré à la mousse à raser', 'Shaving-foam marbled paper', 2, 30, 'decouverte', null, [['Mousse à raser (adulte)', 'Shaving foam (adult)'], ['Colorant alimentaire', 'Food colouring'], M.tray, ['Cure-dent', 'Toothpick'], M.sheet, ['Carte rigide pour racler', 'Stiff card to scrape']], true, [
    NS, ['Un adulte met une couche de mousse à raser dans un grand plateau.', 'A grown-up spreads a layer of shaving foam in a big tray.', () => R(70, 70, 260, 170, '#fff', 14) + dots([[120, 120], [200, 150], [270, 110], [160, 200], [260, 190]], 28, '#f4f4f8')],
    ['Fais des gouttes de colorant de plusieurs couleurs sur la mousse.', 'Put drops of food colouring in several colours on the foam.', () => dots([[130, 120], [210, 110], [280, 130]], 8, RED) + dots([[160, 180], [240, 170]], 8, BLU) + dots([[110, 190], [290, 195]], 8, YEL)],
    ['Avec un cure-dent, fais des tourbillons dans les couleurs.', 'With a toothpick, swirl the colours.', () => pl('M110 130Q150 100 200 130T290 130M120 190Q170 160 230 190T300 190', '#c29be8', 4)],
    ['Pose la feuille sur la mousse. Appuie doucement avec la main.', 'Lay the paper on the foam. Press gently with your hand.', () => R(80, 80, 240, 150, '#fffdf7', 4) + tl(hand(290, 150, '#f2c6a0', 1, 15))],
    ['Soulève-la et racle la mousse avec une carte. Les couleurs restent !', 'Lift it and scrape off the foam with a card. The colours stay!', () => R(80, 80, 240, 150, '#fffdf7', 4) + pl('M100 120Q150 100 200 120T290 120', RED, 6) + pl('M100 160Q150 140 200 160T290 160', BLU, 6) + pl('M100 200Q150 180 200 200T290 200', YEL, 6)],
    ['Laisse sécher à plat. Lave-toi les mains.', 'Let it dry flat. Wash your hands.', () => CLOCK(1)],
  ]),
  mk(K, 'repetition-motifs', '🔁', 'Des bandes de motifs', 'Pattern strips', 2, 25, 'decouverte', null, [['Bouchons, éponge, doigts', 'Corks, sponge, fingers'], gp, pl8, M.news, M.sheet], false, [
    NS, SH('#fff8e6'), ['Un motif se répète. Commence avec ABAB : rond, carré, rond, carré.', 'A pattern repeats. Start with ABAB: circle, square, circle, square.', () => dots([[70, 70], [150, 70], [230, 70], [310, 70]], 18, RED) + [[110, 70], [190, 70], [270, 70], [350, 70]].map(([x, y]) => pr(x - 15, y - 15, 30, 30, BLU, 2)).join('')],
    ['Fais une deuxième ligne avec ABC : rond, étoile, cœur.', 'Make a second row with ABC: circle, star, heart.', () => dots([[70, 140], [190, 140], [310, 140]], 14, GRN) + str([[110, 140, 0, 0.7], [230, 140, 0, 0.7], [350, 140, 0, 0.7]], YEL) + hrt([[150, 140, 0, 0.6], [270, 140, 0, 0.6]], PNK)],
    ['Fais une troisième ligne : rouge, rouge, bleu, rouge, rouge, bleu.', 'Make a third row: red, red, blue, red, red, blue.', () => dots([[70, 205], [110, 205], [190, 205], [230, 205], [310, 205], [350, 205]], 14, RED) + dots([[150, 205], [270, 205]], 14, BLU)],
    ['Un copain doit deviner la suite de ton motif.', 'A friend has to guess what comes next in your pattern.', () => R(300, 235, 40, 30, '#fff', 4) + `<path d="M312 248Q320 238 328 248Q320 252 320 258" fill="none" stroke="${HL}" stroke-width="5"/>`],
    ['Laisse sécher. Ta bande de motifs est prête !', 'Let it dry. Your pattern strip is ready!', () => ''],
  ]),
  mk(K, 'papier-cadeau', '🎁', 'Du papier cadeau maison', 'Homemade wrapping paper', 3, 40, 'decorations', 'noel', [M.cardb, ['Grande feuille de papier kraft', 'Big sheet of kraft paper'], M.sponge, gp, ['Rouleau de papier de toilette', 'Toilet paper roll'], M.news], false, [
    NS, ['Déplie un grand papier brun (kraft) sur la table.', 'Unfold a big brown (kraft) paper on the table.', () => R(40, 26, 320, 248, '#d9b98a', 4)],
    ['Écrase un rouleau de papier de toilette en triangle pour faire un sapin.', 'Squash a toilet paper roll into a triangle to make a tree.', () => T('300,100 330,150 270,150', '#cfa66b') + roll(340, 220)],
    ['Trempe-le dans le vert et fais des sapins en rangées.', 'Dip it in green and print trees in rows.', () => use('pt', 'M0-22L18 8H-18ZM0-8L24 22H-24Z', [[80, 80], [160, 80], [240, 80], [320, 80], [120, 160], [200, 160], [280, 160]], DG)],
    ['Avec ton doigt, fais des boules rouges sur les sapins.', 'With your finger, make red baubles on the trees.', () => dots([[80, 85], [165, 70], [240, 90], [320, 72], [124, 168], [200, 150], [284, 170]], 4, RED)],
    ['Avec un bouchon, fais des gros points blancs de neige entre les sapins.', 'With a cork, print big white snow dots between the trees.', () => dots([[120, 110], [200, 115], [280, 115], [80, 200], [160, 220], [240, 215], [320, 205]], 9, WH)],
    ['Avec ton doigt jaune, ajoute une étoile sur chaque sapin.', 'With a yellow finger, add a star on each tree.', () => dots([[80, 52], [160, 52], [240, 52], [320, 52], [120, 132], [200, 132], [280, 132]], 4, YEL)],
    ['Laisse sécher bien à plat avant d’emballer ton cadeau.', 'Let it dry flat before wrapping your gift.', () => ''],
  ]),
  mk(K, 'bulles-meduse', '🪼', 'Une méduse au papier bulle', 'A bubble-wrap jellyfish', 1, 20, 'animaux', null, [['Papier bulle', 'Bubble wrap'], gp, M.brush, M.sheet, M.news], false, [
    NS, SH('#d6ecff'), ['Peins un morceau de papier bulle avec de la gouache rose.', 'Paint a piece of bubble wrap with pink paint.', () => R(110, 50, 180, 70, PNK, 20) + dots([[140, 70], [170, 70], [200, 70], [230, 70], [260, 70], [155, 95], [185, 95], [215, 95], [245, 95]], 9, '#f9a8c9') + brush(310, 90, 25, PNK)],
    ['Retourne-le sur la feuille. Appuie et soulève.', 'Flip it onto the paper. Press and lift.', () => pp('M100 130Q100 60 200 60Q300 60 300 130Z', PNK) + dots([[140, 110], [170, 110], [200, 110], [230, 110], [260, 110], [155, 85], [185, 85], [215, 85], [245, 85]], 7, '#f9c2d8')],
    ['Peins des tentacules ondulées sous la tête avec un pinceau.', 'Paint wavy tentacles under the head with a brush.', () => pl('M130 130Q110 170 130 200T120 260M165 130Q145 180 165 210T155 265M200 130Q180 175 200 215T190 268M235 130Q215 180 235 210T225 265M270 130Q250 170 270 200T260 258', '#c29be8', 6)],
    ['Fais deux petits points noirs pour les yeux.', 'Make two little black dots for the eyes.', () => dots([[170, 90], [230, 90]], 5, INK)],
    ['Imprime d’autres bulles bleues au fond pour faire l’eau. Laisse sécher.', 'Print more blue bubbles in the background for the water. Let it dry.', () => dots([[60, 60], [340, 70], [60, 200], [345, 190], [80, 250], [330, 250]], 10, '#8fc2f2')],
  ]),
  mk(K, 'celeri-roses', '🌹', 'Des roses au céleri', 'Celery roses', 2, 25, 'nature', 'fete-des-meres', [['Pied de céleri (adulte coupe la base)', 'Celery stalks (adult cuts the base)'], gp, pl8, M.news, M.sheet, M.brush], true, [
    ['Un adulte coupe le bas d’un pied de céleri : on voit une forme de rose.', 'A grown-up cuts the bottom off a celery bunch: it looks like a rose.', () => E(150, 150, 70, 50, '#d9f0b0') + `<path d="M120 150Q150 120 180 150Q150 175 120 150ZM135 150Q150 135 165 150" fill="none" stroke="#7ac7a1" stroke-width="4"/>`],
    NS, SH('#fff8e6'), ['Verse de la peinture rose dans une assiette.', 'Pour pink paint in a plate.', () => pad(320, 215, PNK)],
    ['Trempe la base du céleri dans la peinture.', 'Dip the base of the celery in the paint.', () => E(250, 170, 40, 30, '#d9f0b0') + E(250, 175, 36, 20, PNK)],
    ['Appuie sur la feuille. Une rose apparaît !', 'Press on the paper. A rose appears!', () => `<g fill="none" stroke="${PNK}" stroke-width="9" stroke-linecap="round"><circle cx="130" cy="100" r="30"/><path d="M130 100Q145 85 150 100Q145 115 130 108Q118 98 130 92"/></g>`],
    ['Fais d’autres roses en rouge et en jaune.', 'Make more roses in red and yellow.', () => `<g fill="none" stroke="${RED}" stroke-width="9" stroke-linecap="round"><circle cx="270" cy="130" r="30"/></g><g fill="none" stroke="${YEL}" stroke-width="9" stroke-linecap="round"><circle cx="200" cy="200" r="26"/></g>`],
    ['Peins des tiges et des feuilles vertes avec le pinceau.', 'Paint green stems and leaves with the brush.', () => pl('M130 135V270M270 165V270M200 230V270', GRN, 6) + pp('M130 220Q95 205 85 225Q110 240 130 230Z', DG)],
  ]),
  mk(K, 'briques-legos', '🧱', 'Une ville aux briques Lego', 'A Lego-brick town', 1, 20, 'objets', null, [['Briques Lego', 'Lego bricks'], gp, pl8, M.news, M.sheet, M.brush], false, [
    NS, SH(), ['Trempe le dessous d’une brique Lego dans de la peinture rouge.', 'Dip the underside of a Lego brick in red paint.', () => pad(320, 215, RED) + R(240, 150, 60, 30, RED, 4) + dots([[255, 150], [285, 150]], 6, '#c8323a')],
    ['Appuie-la sur la feuille. Les petits ronds forment des fenêtres.', 'Press it on the paper. The little circles make windows.', () => R(60, 160, 70, 40, 'none', 0).replace(/fill="none"/, `fill="${RED}"`) + dots([[75, 170], [95, 170], [115, 170], [75, 190], [95, 190], [115, 190]], 5, '#ffe9a0')],
    ['Fais des immeubles en empilant les empreintes.', 'Make buildings by stacking the prints.', () => pr(60, 80, 70, 80, RED) + pr(150, 110, 70, 90, BLU) + pr(240, 60, 70, 140, YEL)],
    ['Avec une petite brique, fais des fenêtres.', 'With a small brick, make windows.', () => dots([[80, 100], [110, 100], [80, 130], [110, 130], [170, 130], [200, 130], [260, 80], [290, 80], [260, 120], [290, 120]], 6, '#ffffff')],
    ['Peins une route grise et un soleil avec ton pinceau.', 'Paint a grey road and a sun with your brush.', () => pr(40, 255, 320, 18, '#8a90a4') + sunP(330, 50, 18)],
  ]),
];
