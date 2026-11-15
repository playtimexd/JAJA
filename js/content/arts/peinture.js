// Arts plastiques — peinture (gouache, aquarelle, pastels) (étapes générées par de petites fonctions SVG ; schéma : docs/ARTS.md)
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

const K = 'peinture';
const base = [M.news, M.sheet, M.brush, M.gou, M.water];
const aq = [M.news, ['Papier à aquarelle ou papier épais', 'Watercolour or thick paper'], M.brush, M.aqua, M.water];
const fold = () => `<path d="M200 26V274" stroke="${cur ? HL : INK}" stroke-width="4" stroke-dasharray="10 8"/>`;
const flo = (cx, cy, r, f) => pl([0, 60, 120, 180, 240, 300].map((a) => { const c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return [-9, -3, 3, 9].map((o) => `M${Math.round(cx + 8 * c - o * s)} ${Math.round(cy + 8 * s + o * c)}L${Math.round(cx + r * c - o * s)} ${Math.round(cy + r * s + o * c)}`).join(''); }).join(''), f, 3);
const drop = (x, y, c) => pp(`M${x} ${y - 14}Q${x + 9} ${y} ${x} ${y + 7}Q${x - 9} ${y} ${x} ${y - 14}Z`, c);
const grid = (x0, y0, nc, nr, dx, dy, r, f) => Array.from({ length: nr }, (_, i) => dots(Array.from({ length: nc }, (_, c) => [x0 + c * dx + (i % 2) * dx / 2, y0 + i * dy]), r, f)).join('');
export const projects = [
  mk(K, 'melanger', '🎨', 'Mélanger les couleurs', 'Mixing colours', 1, 15, 'decouverte', null, [...base, M.plate], false, [
    NS, SH(), ['Mets une goutte de rouge, de jaune et de bleu.', 'Put a drop of red, yellow and blue.', () => pc(120, 70, 30, RED) + pc(280, 70, 30, YEL) + pc(200, 215, 30, BLU)],
    ['Mélange le rouge et le jaune : ça fait orange !', 'Mix red and yellow: it makes orange!', () => pc(200, 70, 30, ORG) + brush(236, 100, 25, ORG)],
    RINSE,
    ['Mélange le jaune et le bleu : ça fait vert !', 'Mix yellow and blue: it makes green!', () => pc(242, 142, 30, GRN)],
    ['Mélange le bleu et le rouge : ça fait violet !', 'Mix blue and red: it makes purple!', () => pc(158, 142, 30, PUR)],
    ['Tu as fait un cercle de six couleurs !', 'You made a circle of six colours!', () => pc(200, 140, 12, WH)],
  ]),
  mk(K, 'arc-en-ciel', '🌈', 'Un arc-en-ciel', 'A rainbow', 1, 20, 'nature', null, base, false, [
    NS, SH(), ['Peins un grand arc rouge.', 'Paint a big red arch.', () => pl('M50 250A150 150 0 0 1 350 250', RED, 22)],
    ['Peins un arc orange en dessous.', 'Paint an orange arch under it.', () => pl('M72 250A128 128 0 0 1 328 250', ORG, 22)],
    ['Peins un arc jaune.', 'Paint a yellow arch.', () => pl('M94 250A106 106 0 0 1 306 250', YEL, 22)],
    RINSE,
    ['Peins un arc vert, puis un arc bleu.', 'Paint a green arch, then a blue one.', () => pl('M116 250A84 84 0 0 1 284 250', GRN, 22) + pl('M138 250A62 62 0 0 1 262 250', BLU, 22)],
    ['Ajoute un nuage blanc à chaque bout et laisse sécher.', 'Add a white cloud at each end and let it dry.', () => cloud(62, 246, 1.1) + cloud(338, 246, 1.1) + cloud(200, 64, 0.8, '#eef6ff')],
  ]),
  mk(K, 'lavis-bleu', '🌊', 'Un lavis de bleus', 'A blue wash', 1, 15, 'decouverte', null, aq, false, [
    NS, SH(), ['Mouille toute la feuille avec de l’eau claire.', 'Wet the whole paper with clean water.', () => pr(46, 32, 308, 236, '#eaf4ff', 6)],
    ['Dépose du bleu foncé en haut.', 'Put dark blue at the top.', () => pr(46, 32, 308, 70, '#4d6fd0', 6) + pr(46, 90, 308, 20, '#6f8fe0')],
    RINSE,
    ['Ajoute du bleu pâle au milieu.', 'Add light blue in the middle.', () => pr(46, 110, 308, 70, '#8fc2f2') + pr(46, 170, 308, 20, '#b5dcf8')],
    ['Mets seulement de l’eau en bas. Les couleurs vont se mélanger.', 'Put only water at the bottom. The colours will blend.', () => pr(46, 190, 308, 78, '#d8edfb', 6)],
    DRY,
    ['Un beau dégradé de bleus, du plus foncé au plus pâle.', 'A lovely blue gradient, from dark to light.', () => `<defs><linearGradient id="lv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f62c8"/><stop offset="1" stop-color="#dff1ff"/></linearGradient></defs><rect x="46" y="32" width="308" height="236" rx="6" fill="url(#lv)"/>`],
  ]),
  mk(K, 'chenille-doigts', '🐛', 'Une chenille aux doigts', 'A finger-painted caterpillar', 1, 15, 'animaux', null, [M.news, M.sheet, M.gou, M.plate, ['Lingettes pour les mains', 'Wet wipes']], false, [
    NS, SH(), ['Trempe ton doigt dans le vert. Fais un gros rond pour le corps.', 'Dip your finger in green. Make a big round dot for the body.', () => pc(130, 170, 28, GRN) + fng(150, 120, GRN)],
    ['Fais d’autres ronds verts pour allonger la chenille.', 'Make more green dots to make the caterpillar longer.', () => dots([[190, 170], [250, 170], [310, 170]], 28, GRN)],
    ['Avec du rouge, fais un rond pour la tête.', 'With red, make a round head.', () => pc(78, 160, 32, RED)],
    ['Ajoute deux yeux blancs et un sourire.', 'Add two white eyes and a smile.', () => dots([[68, 148], [92, 148]], 8, WH) + dots([[69, 149], [93, 149]], 4, INK) + pl('M64 170Q78 182 92 170', INK, 4)],
    ['Fais deux antennes et des petites pattes avec ton doigt.', 'Make two antennae and little legs with your finger.', () => pl('M66 128L52 100M90 128L104 100', INK, 5) + dots([[150, 206], [210, 206], [270, 206], [330, 206]], 6, BRN)],
    ['Lave tes mains et laisse sécher. Ta chenille est prête !', 'Wash your hands and let it dry. Your caterpillar is ready!', () => grass() + pc(330, 120, 16, YEL) + pl('M330 140V250', GRN, 5)],
  ]),
  mk(K, 'arbre-eponge', '🌳', 'Un arbre à l’éponge', 'A sponge-painted tree', 1, 20, 'nature', null, [...base, M.sponge], false, [
    NS, SH(), ['Peins un tronc brun avec ton pinceau.', 'Paint a brown trunk with your brush.', () => pl('M200 255V150M200 190L160 150M200 175L240 140', BRN, 16)],
    ['Trempe l’éponge dans le vert. Tamponne le feuillage.', 'Dip the sponge in green. Dab the leaves.', () => pc(200, 100, 60, GRN) + pc(150, 120, 40, GRN) + pc(250, 120, 40, GRN) + spg(300, 60)],
    ['Avec du vert pâle et du jaune, tamponne encore par-dessus.', 'With light green and yellow, dab on top.', () => dots([[180, 80], [220, 90], [150, 125], [250, 115], [200, 130]], 16, '#a5dd6a') + dots([[210, 70], [170, 110], [240, 135]], 10, YEL)],
    RINSE,
    ['Peins l’herbe en bas avec ton pinceau.', 'Paint the grass at the bottom with your brush.', () => grass(DG)],
    ['Ajoute un soleil jaune et laisse sécher.', 'Add a yellow sun and let it dry.', () => sunP(330, 62, 22) + cloud(80, 56, 0.8)],
  ]),
  mk(K, 'fleur-pointillee', '🌸', 'Une fleur en pointillés', 'A dotted flower', 1, 20, 'nature', 'printemps', [M.news, M.sheet, M.swab, M.gou, M.plate], false, [
    NS, SH(), ['Avec un coton-tige vert, fais une tige en petits points.', 'With a green cotton swab, make a stem of little dots.', () => dots([[200, 262], [200, 240], [200, 218], [200, 196], [200, 174]], 6, GRN) + swab(236, 222, GRN)],
    ['Ajoute deux feuilles en points verts.', 'Add two leaves in green dots.', () => dots([[180, 230], [162, 220], [220, 215], [238, 205]], 7, GRN)],
    ['Avec un autre coton-tige, fais des points jaunes au centre.', 'With another swab, make yellow dots in the middle.', () => dots([[200, 110], [186, 110], [214, 110], [200, 96], [200, 124], [190, 100], [210, 120], [190, 120], [210, 100]], 8, YEL)],
    ['Fais des pétales en points roses autour du centre.', 'Make petals in pink dots around the centre.', () => ring(200, 110, 38, 10, PNK, 10) + ring(200, 110, 56, 14, PNK, 8, 0.2)],
    ['Entoure d’une couronne de points rouges, puis laisse sécher.', 'Add a crown of red dots and let it dry.', () => ring(200, 110, 76, 18, RED, 5, 0.1)],
  ]),
  mk(K, 'arbre-mains', '🖐️', 'L’arbre aux mains', 'The handprint tree', 1, 20, 'nature', 'automne', [M.news, M.sheet, M.brush, M.gou, ['Lingettes pour les mains', 'Wet wipes']], false, [
    NS, SH(), ['Peins un gros tronc brun avec ton pinceau.', 'Paint a big brown trunk with your brush.', () => pl('M200 260V140M200 190L150 150M200 175L250 140', BRN, 24)],
    ['Peins ta main en rouge. Appuie-la sur le côté gauche.', 'Paint your hand red. Press it on the left side.', () => hand(130, 90, RED, 1.2, -25)],
    ['Peins ta main en orange. Appuie-la sur le côté droit.', 'Paint your hand orange. Press it on the right side.', () => hand(270, 90, ORG, 1.2, 25)],
    ['Fais une main jaune au milieu, en haut.', 'Make a yellow hand in the middle, at the top.', () => hand(200, 60, YEL, 1.2, 0)],
    ['Avec ton doigt, fais des feuilles qui tombent.', 'With your finger, make falling leaves.', () => dots([[90, 200], [320, 190], [120, 245], [300, 240], [270, 215]], 8, ORG)],
    ['Lave tes mains tout de suite. Laisse sécher.', 'Wash your hands right away. Let it dry.', () => grass(YEL) + dots([[330, 250], [70, 250]], 8, RED)],
  ]),
  mk(K, 'arbre-souffle', '🌬️', 'Un arbre soufflé à la paille', 'A straw-blown tree', 1, 15, 'nature', null, [M.news, M.sheet, ['Gouache brune très diluée', 'Very watery brown paint'], M.straw, ['Cuillère', 'Spoon']], false, [
    NS, SH(), ['Verse une cuillère de peinture brune diluée en bas de la feuille.', 'Pour a spoonful of watery brown paint at the bottom.', () => pp('M170 252Q200 228 230 252Q215 266 185 266Z', BRN)],
    ['Avec la paille, souffle vers le haut pour faire le tronc.', 'With the straw, blow upward to make the trunk.', () => pl('M200 250Q196 200 200 160', BRN, 10) + tl(`<g transform="rotate(-70 280 260)">${R(250, 250, 80, 10, '#fff', 4)}</g>`)],
    ['Tourne la feuille et souffle encore pour faire des branches.', 'Turn the paper and blow again to make branches.', () => pl('M200 160L150 110M200 160L250 105M200 185L160 170M200 180L245 160M150 110L130 80M250 105L270 75', BRN, 6)],
    ['Souffle encore pour faire de petites branches.', 'Blow again to make twigs.', () => pl('M150 110L165 80M250 105L232 78M160 170L130 160M245 160L275 150', BRN, 3)],
    DRY,
    ['Avec ton doigt, mets des fleurs roses au bout des branches.', 'With your finger, put pink blossoms at the tips.', () => dots([[130, 78], [165, 78], [232, 76], [270, 73], [130, 158], [275, 148], [150, 108], [250, 104]], 9, PNK) + grass('#9be0a0')],
  ]),
  mk(K, 'fleur-ficelle', '🪢', 'Une fleur à la ficelle', 'A string-pull flower', 3, 25, 'nature', null, [M.news, M.sheet, M.gou, M.string, M.plate], false, [
    NS, SH(), ['Plie la feuille en deux et ouvre-la. Il y a un pli au milieu.', 'Fold the paper in half and open it. There is a crease in the middle.', fold],
    ['Trempe la ficelle dans la peinture rose.', 'Dip the string in pink paint.', () => pot(90, 214, PNK) + pl('M120 224Q150 200 160 230T190 220', PNK, 5)],
    ['Dépose la ficelle en spirale sur une moitié. Laisse le bout dehors.', 'Lay the string in a spiral on one half. Leave the end outside.', () => pl('M130 150Q80 130 100 100Q150 90 160 140Q150 200 100 190Q70 170 90 150', PNK, 6) + pl('M160 140L190 210', PNK, 4)],
    ['Ferme la feuille et appuie fort avec ta main.', 'Close the paper and press hard with your hand.', () => tl(hand(260, 150, '#ffd9e6', 1.3, 0))],
    ['Tire la ficelle avec l’autre main en appuyant.', 'Pull the string with your other hand while pressing.', () => tl(`<path d="M200 150H330" stroke="${HL}" stroke-width="6" stroke-linecap="round"/>`)],
    ['Ouvre la feuille : une fleur apparaît !', 'Open the paper: a flower appears!', () => pl('M130 150Q80 130 100 100Q150 90 160 140Q150 200 100 190Q70 170 90 150', PNK, 4) + pl('M270 150Q320 130 300 100Q250 90 240 140Q250 200 300 190Q330 170 310 150', PNK, 4)],
    ['Ajoute un cœur jaune et des tiges avec un pinceau, puis laisse sécher.', 'Add a yellow centre and stems with a brush, then let it dry.', () => pc(200, 140, 14, YEL) + pl('M200 160V262M200 220L160 200M200 232L240 212', GRN, 8)],
  ]),
  mk(K, 'papillon-symetrique', '🦋', 'Le papillon symétrique', 'The mirror butterfly', 1, 20, 'animaux', 'printemps', base, false, [
    NS, SH(), ['Plie la feuille en deux, puis ouvre-la.', 'Fold the paper in half, then open it.', fold],
    ['Peins une moitié d’aile avec des couleurs vives, près du pli.', 'Paint half a wing with bright colours, near the fold.', () => pp('M196 140Q110 40 80 110Q70 170 196 160Z', PNK) + pc(130, 120, 22, YEL) + pc(160, 135, 12, BLU)],
    ['Peins aussi l’aile du bas.', 'Paint the lower wing too.', () => pp('M196 170Q100 170 90 230Q130 270 196 200Z', PUR) + pc(140, 215, 14, ORG)],
    ['Ferme la feuille vite, avant que ça sèche. Appuie bien.', 'Close the paper quickly, before it dries. Press well.', () => tl(hand(280, 140, '#e8e0f5', 1.2, 10))],
    ['Ouvre doucement : les deux ailes sont pareilles !', 'Open slowly: both wings are the same!', () => pp('M204 140Q290 40 320 110Q330 170 204 160Z', PNK) + pc(270, 120, 22, YEL) + pc(240, 135, 12, BLU) + pp('M204 170Q300 170 310 230Q270 270 204 200Z', PUR) + pc(260, 215, 14, ORG)],
    DRY,
    ['Peins le corps et deux antennes en noir.', 'Paint the body and two antennae in black.', () => pe(200, 160, 9, 52, INK) + pl('M200 108Q190 80 175 72M200 108Q210 80 225 72', INK, 4)],
  ]),
  mk(K, 'flocons-sel', '❄️', 'Des flocons au sel', 'Salty snowflakes', 2, 25, 'hiver', 'hiver', [...aq, M.salt], false, [
    NS, SH(), ['Peins toute la feuille en bleu avec beaucoup d’eau.', 'Paint the whole paper blue with lots of water.', () => pr(44, 30, 312, 240, '#5f8fe0', 6)],
    ['Vite ! Mets du bleu foncé dans un coin pour une nuit plus profonde.', 'Quick! Add dark blue in a corner for a deeper night.', () => pp('M44 30H200Q150 130 44 190Z', '#3a58b8')],
    ['Saupoudre du gros sel sur la peinture mouillée.', 'Sprinkle coarse salt on the wet paint.', () => dots([[100, 80], [180, 130], [260, 80], [300, 170], [120, 200], [220, 220], [330, 110]], 5, WH)],
    ['Attends. Le sel boit la peinture et fait des étoiles.', 'Wait. The salt soaks up the paint and makes stars.', () => CLOCK(1) + dots([[100, 80], [180, 130], [260, 80], [300, 170], [120, 200], [220, 220], [330, 110]], 14, '#a5c4f2')],
    DRY,
    ['Quand c’est sec, frotte le sel pour l’enlever. Tes flocons brillent !', 'When dry, rub off the salt. Your snowflakes sparkle!', () => [[100, 80], [180, 130], [260, 80], [300, 170], [120, 200], [220, 220], [330, 110]].map(([x, y]) => `<path d="M${x - 14} ${y}H${x + 14}M${x} ${y - 14}V${y + 14}M${x - 10} ${y - 10}L${x + 10} ${y + 10}M${x + 10} ${y - 10}L${x - 10} ${y + 10}" stroke="#e8f2ff" stroke-width="4" stroke-linecap="round"/>`).join('')],
  ]),
  mk(K, 'poisson-cire', '🐠', 'Un poisson caché', 'A hidden fish', 2, 25, 'animaux', null, [M.news, M.sheet, ['Crayon de cire blanc et orange', 'White and orange wax crayon'], M.aqua, M.brush, M.water], false, [
    NS, SH(), ['Avec un crayon de cire blanc, dessine un gros poisson. Appuie fort.', 'With a white wax crayon, draw a big fish. Press hard.', () => `<path d="M110 150Q170 80 250 130L310 90V210L250 170Q170 220 110 150Z" fill="none" stroke="#cfd3e4" stroke-width="7" stroke-linejoin="round"/>`],
    ['Ajoute un œil, des écailles et des bulles, toujours en blanc.', 'Add an eye, scales and bubbles, still in white.', () => `<g fill="none" stroke="#cfd3e4" stroke-width="6" stroke-linecap="round"><circle cx="150" cy="140" r="8"/><path d="M190 120Q205 150 190 180M225 125Q240 150 225 172"/><circle cx="90" cy="100" r="10"/><circle cx="70" cy="70" r="7"/></g>`],
    ['Prépare de l’aquarelle bleue bien mouillée.', 'Get blue watercolour ready, nice and wet.', () => pot(300, 226, BLU) + brush(260, 250, 20, BLU)],
    ['Peins toute la feuille avec le bleu. Le poisson apparaît !', 'Paint the whole paper blue. The fish appears!', () => pr(44, 30, 312, 240, '#6fa3e6', 6) + `<path d="M110 150Q170 80 250 130L310 90V210L250 170Q170 220 110 150Z" fill="none" stroke="#fff" stroke-width="7" stroke-linejoin="round"/>`],
    ['Ajoute du vert pâle dans le bas pour l’océan.', 'Add light green at the bottom for the sea.', () => pr(44, 222, 312, 48, '#7fd1b3', 6)],
    DRY,
    ['Colorie le poisson avec un crayon de cire orange.', 'Colour the fish with an orange wax crayon.', () => pp('M118 150Q170 92 248 134L296 102V198L248 166Q170 208 118 150Z', ORG) + `<g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"><circle cx="150" cy="140" r="8"/><path d="M190 120Q205 150 190 180"/></g>`],
  ]),
  mk(K, 'coucher-soleil', '🌅', 'Un coucher de soleil', 'A sunset', 2, 30, 'nature', 'ete', [...base, M.plate], false, [
    NS, SH(), ['Peins une bande jaune au milieu de la feuille.', 'Paint a yellow stripe across the middle.', () => pr(44, 130, 312, 40, YEL)],
    ['Peins de l’orange au-dessus et sous le jaune. Fais-les se toucher.', 'Paint orange above and below the yellow. Let them touch.', () => pr(44, 90, 312, 42, ORG) + pr(44, 168, 312, 20, ORG)],
    RINSE,
    ['Continue avec du rose, puis du violet vers le haut.', 'Keep going with pink, then purple toward the top.', () => pr(44, 56, 312, 36, '#f06c9b') + pr(44, 30, 312, 28, PUR, 6)],
    ['Mélange les bords avec ton pinceau pour faire un dégradé.', 'Blend the edges with your brush to make a gradient.', () => `<path d="M44 88Q200 70 356 88M44 128Q200 146 356 128" stroke="#fff" stroke-width="6" fill="none" opacity=".5"/>`],
    ['Peins un soleil jaune qui se couche et de l’eau bleue foncée en bas.', 'Paint a yellow setting sun and dark blue water below.', () => pp('M150 190A50 50 0 0 1 250 190Z', '#ffe27a') + pr(44, 190, 312, 80, '#3a4a95', 6)],
    DRY,
    ['Quand c’est sec, ajoute des collines et un arbre en noir.', 'When dry, add black hills and a tree.', () => pp('M44 190Q110 150 180 190Z', INK) + pp('M260 190Q320 160 356 190Z', INK) + pl('M96 190V150', INK, 6) + pc(96, 140, 18, INK)],
  ]),
  mk(K, 'paysage-hiver', '⛄', 'Un paysage d’hiver', 'A winter landscape', 2, 30, 'nature', 'hiver', [...base, M.sponge], false, [
    NS, SH('#eef6ff'), ['Peins le ciel en bleu pâle avec un gros pinceau.', 'Paint the sky pale blue with a big brush.', () => pr(44, 30, 312, 140, '#bfe0f7', 6)],
    ['Peins la neige en blanc dans le bas. Laisse des bosses.', 'Paint white snow along the bottom. Leave some bumps.', () => pp('M44 160Q120 130 200 165T356 150V270H44Z', WH)],
    RINSE,
    ['Peins deux sapins verts : un triangle, puis un autre en dessous.', 'Paint two green fir trees: a triangle, then another under it.', () => pp('M120 90L90 140H150ZM120 120L80 175H160Z', DG) + pp('M250 70L215 125H285ZM250 105L205 165H295Z', DG) + pr(116, 175, 8, 14, BRN) + pr(246, 165, 8, 14, BRN)],
    ['Tamponne de la neige sur les branches avec l’éponge blanche.', 'Dab snow on the branches with the white sponge.', () => dots([[110, 140], [135, 165], [250, 120], [275, 150], [230, 160]], 8, WH) + spg(330, 100)],
    ['Avec ton doigt, fais tomber des flocons.', 'With your finger, make falling snowflakes.', () => dots([[70, 60], [150, 50], [220, 75], [300, 50], [340, 110], [180, 110], [100, 100]], 5, WH)],
    ['Ajoute une lune jaune pâle et laisse sécher.', 'Add a pale yellow moon and let it dry.', () => pc(330, 62, 18, '#fff3b0')],
  ]),
  mk(K, 'arbre-automne', '🍂', 'Un arbre d’automne', 'An autumn tree', 2, 30, 'nature', 'automne', [...base, M.sponge, M.swab], false, [
    NS, SH(), ['Peins le ciel avec un jaune très pâle.', 'Paint the sky very pale yellow.', () => pr(44, 30, 312, 170, '#fff6cf', 6)],
    ['Peins un tronc brun avec des branches qui se séparent.', 'Paint a brown trunk with branches that split.', () => pl('M200 262V150M200 180L150 130M200 165L255 120M150 130L120 100M255 120L285 90', BRN, 14)],
    ['Avec l’éponge, tamponne du rouge sur le feuillage.', 'With the sponge, dab red on the leaves.', () => dots([[130, 90], [180, 70], [240, 80], [280, 100]], 28, RED) + spg(340, 230)],
    ['Tamponne de l’orange, puis du jaune entre les rouges.', 'Dab orange, then yellow between the reds.', () => dots([[155, 100], [210, 90], [260, 110], [110, 115]], 24, ORG) + dots([[180, 55], [230, 65], [140, 70], [290, 80]], 16, YEL)],
    RINSE,
    ['Peins de l’herbe brune au pied de l’arbre.', 'Paint brown grass at the foot of the tree.', () => pp('M44 240Q120 215 200 245T356 235V270H44Z', '#c98e4d')],
    ['Avec un coton-tige, fais tomber des feuilles par terre.', 'With a cotton swab, make leaves fall on the ground.', () => dots([[90, 232], [140, 252], [250, 248], [310, 236], [330, 200], [80, 190]], 8, RED) + dots([[110, 220], [280, 224], [170, 258]], 7, ORG)],
  ]),
  mk(K, 'fleurs-mouillees', '🌷', 'Une fleur mouillée', 'A wet-on-wet flower', 2, 25, 'nature', 'printemps', aq, false, [
    NS, SH(), ['Mouille un grand rond avec de l’eau claire.', 'Wet a big circle with clean water.', () => pe(200, 110, 70, 55, '#eef6ff')],
    ['Touche l’eau avec du rose. La couleur se répand toute seule.', 'Touch the water with pink. The colour spreads by itself.', () => pe(190, 105, 60, 45, '#f9a8c9') + brush(250, 150, 25, PNK)],
    RINSE,
    ['Ajoute une goutte de jaune au milieu et une de violet sur le côté.', 'Add a drop of yellow in the middle and purple on the side.', () => pc(195, 108, 22, YEL) + pe(240, 120, 20, 18, '#c29be8')],
    DRY,
    ['Quand c’est sec, peins une tige verte et deux feuilles.', 'When dry, paint a green stem and two leaves.', () => pl('M200 160V265', GRN, 8) + pp('M200 215Q150 195 140 225Q175 240 200 225Z', GRN) + pp('M200 205Q250 185 262 215Q225 230 200 215Z', GRN)],
  ]),
  mk(K, 'parapluie-pluie', '☔', 'Un parapluie sous la pluie', 'An umbrella in the rain', 1, 20, 'objets', 'printemps', aq, false, [
    NS, SH(), ['Peins le dessus du parapluie en rouge : un demi-cercle.', 'Paint the top of the umbrella red: a half circle.', () => pp('M90 150A110 90 0 0 1 310 150Z', RED)],
    ['Fais des petites vagues en bas, comme un rideau.', 'Make little waves at the bottom, like a curtain.', () => pp('M90 150Q115 175 145 150Q172 175 200 150Q228 175 255 150Q285 175 310 150Z', RED)],
    ['Avec du jaune, peins des rayons de haut en bas.', 'With yellow, paint stripes from top to bottom.', () => pl('M200 62V148M148 75Q155 110 150 150M252 75Q245 110 250 150', YEL, 7)],
    ['Peins le manche brun en forme de crochet.', 'Paint the brown handle, shaped like a hook.', () => pl('M200 150V235Q200 262 172 258', BRN, 9)],
    RINSE,
    ['Du bout du pinceau, fais des gouttes de pluie bleues.', 'With the tip of your brush, make blue raindrops.', () => [[70, 60], [110, 40], [160, 50], [240, 40], [290, 55], [330, 80], [60, 140], [335, 170]].map(([x, y]) => drop(x, y, BLU)).join('')],
    ['Ajoute une flaque bleue en bas et laisse sécher.', 'Add a blue puddle at the bottom and let it dry.', () => pe(250, 255, 70, 12, '#8fc2f2') + pl('M235 255Q250 249 268 255', WH, 3)],
  ]),
  mk(K, 'montagnes-gras', '🏔️', 'Des montagnes en dégradé', 'Gradient mountains', 2, 25, 'nature', null, [M.news, M.paper, M.oil, ['Doigt ou essuie-tout', 'Finger or paper towel']], false, [
    NS, SH(), ['Avec un pastel gras bleu pâle, colorie le ciel du haut jusqu’au milieu.', 'With a light blue oil pastel, colour the sky from top to middle.', () => pr(44, 30, 312, 130, '#bfe0f7', 6)],
    ['Dessine de grandes montagnes en violet pâle.', 'Draw big mountains in light purple.', () => pp('M44 200L130 80L200 160L270 70L356 200Z', '#c5a8ec')],
    ['Dessine des montagnes plus proches en violet plus foncé.', 'Draw closer mountains in darker purple.', () => pp('M44 250L110 150L190 230L270 140L356 250Z', '#8e5bd0')],
    ['Colorie le sol en bleu très foncé. Appuie plus fort vers le bas.', 'Colour the ground dark blue. Press harder toward the bottom.', () => pr(44, 232, 312, 38, '#3a3f8f', 6)],
    ['Frotte les bords avec ton doigt pour mélanger les couleurs.', 'Rub the edges with your finger to blend the colours.', () => fng(200, 200, '#8e5bd0') + `<path d="M120 150L140 190M270 140L250 190" stroke="#fff" stroke-width="5" opacity=".6"/>`],
    ['Ajoute de la neige blanche au sommet et un oiseau noir.', 'Add white snow on the peaks and a black bird.', () => pp('M130 80L112 110L130 104L146 112Z', WH) + pp('M270 70L252 100L270 94L286 102Z', WH) + pl('M310 70Q320 58 330 70Q340 58 350 70', INK, 3)],
  ]),
  mk(K, 'poisson-ecailles', '🐟', 'Un poisson aux écailles de cire', 'A wax-scale fish', 1, 20, 'animaux', null, [M.paper, M.wax, M.pencil], false, [
    SH(), ['Dessine un gros poisson avec un crayon de cire.', 'Draw a big fish with a wax crayon.', () => P('M90 150Q160 70 250 140L320 90V210L250 160Q160 230 90 150Z', 'none', 5)],
    ['Dessine un œil rond et une bouche.', 'Draw a round eye and a mouth.', () => C(140, 135, 10, WH) + C(142, 136, 4, INK) + P('M96 158Q112 168 126 160', 'none', 4)],
    ['Dessine des petits arcs partout pour faire les écailles.', 'Draw little arcs everywhere to make scales.', () => `<g fill="none" stroke="${cur ? HL : INK}" stroke-width="3">${[[180, 120], [210, 120], [195, 145], [225, 145], [180, 170], [210, 170], [240, 125], [250, 150]].map(([x, y]) => `<path d="M${x - 11} ${y}Q${x} ${y - 14} ${x + 11} ${y}"/>`).join('')}</g>`],
    ['Colorie la queue en orange et le dos en rouge.', 'Colour the tail orange and the back red.', () => pp('M250 142L316 96V204L250 158Z', ORG) + pp('M130 100Q190 70 250 140Q190 100 130 100Z', RED)],
    ['Colorie le ventre en jaune et les écailles en bleu et vert.', 'Colour the belly yellow and the scales blue and green.', () => pp('M110 170Q170 215 250 160Q180 190 110 170Z', YEL) + dots([[195, 128], [225, 130], [210, 155]], 6, BLU) + dots([[180, 150], [240, 150]], 6, GRN)],
    ['Dessine des bulles et des algues, puis colorie le fond en bleu.', 'Draw bubbles and seaweed, then colour the background blue.', () => `<path d="M54 40H350V260H54Z" fill="${SKY}" opacity=".4"/>` + pl('M70 260Q60 230 75 210M95 260Q105 235 92 215', DG, 6) + `<g fill="#fff" stroke="${INK}" stroke-width="2"><circle cx="70" cy="90" r="8"/><circle cx="52" cy="60" r="6"/></g>`],
  ]),
  mk(K, 'nuit-etoilee', '🌌', 'Une nuit étoilée', 'A starry night', 3, 35, 'nature', null, [M.news, ['Papier bleu foncé', 'Dark blue paper'], M.dry, M.tissue, ['Fixatif (adulte, dehors)', 'Fixative (adult, outdoors)']], false, [
    NS, SH('#3a4a8f'), ['Avec du pastel bleu pâle, fais de grands tourbillons dans le ciel.', 'With light blue pastel, make big swirls in the sky.', () => pl('M70 80Q120 40 170 80T270 70', '#8fb4f0', 10) + pl('M80 130Q140 100 200 130T330 120', '#6f92e0', 10)],
    ['Frotte avec ton doigt pour mélanger les couleurs.', 'Rub with your finger to blend the colours.', () => fng(230, 180, '#8fb4f0') + pl('M90 175Q160 150 230 175T340 170', '#5a78d0', 10)],
    ['Dessine une grande lune jaune et des étoiles autour.', 'Draw a big yellow moon and stars around it.', () => pc(300, 70, 26, '#ffe27a') + pc(311, 64, 22, '#3a4a8f') + dots([[100, 60], [160, 100], [210, 55], [240, 100]], 8, YEL)],
    ['Pour chaque étoile, ajoute des rayons jaunes.', 'For each star, add yellow rays.', () => [[100, 60], [160, 100], [210, 55], [240, 100]].map(([x, y]) => `<path d="M${x - 16} ${y}H${x + 16}M${x} ${y - 16}V${y + 16}" stroke="${cur ? HL : '#ffe27a'}" stroke-width="3" stroke-linecap="round"/>`).join('')],
    ['Dessine un village noir en bas avec des fenêtres jaunes.', 'Draw a black village at the bottom with yellow windows.', () => pp('M44 270V215H90L110 190L130 215H190V200H240L260 175L280 200H356V270Z', INK) + dots([[90, 240], [130, 240], [220, 235], [270, 240], [320, 235]], 6, YEL)],
    ['Demande à un adulte de mettre du fixatif dehors. Lave tes mains.', 'Ask an adult to spray fixative outside. Wash your hands.', () => dots([[70, 210], [330, 100]], 4, WH)],
  ]),
  mk(K, 'pomme-pastel', '🍎', 'Une pomme au pastel', 'A pastel apple', 3, 35, 'nourriture', null, [M.news, M.paper, M.dry, M.tissue, M.pencil], false, [
    NS, SH(), ['Avec un crayon à mine, dessine une grosse pomme ronde avec une tige.', 'With a pencil, draw a big round apple with a stem.', () => P('M200 90Q130 60 100 150Q90 230 170 250Q200 240 230 250Q310 230 300 150Q270 60 200 90Z', 'none', 4) + P('M200 90Q200 60 215 45', 'none', 5)],
    ['Colorie toute la pomme en rouge pâle avec le côté du pastel.', 'Colour the whole apple light red with the side of the pastel.', () => pp('M200 90Q130 60 100 150Q90 230 170 250Q200 240 230 250Q310 230 300 150Q270 60 200 90Z', '#f58a8a')],
    ['Ajoute du rouge foncé du côté gauche.', 'Add dark red on the left side.', () => pp('M200 90Q130 60 100 150Q90 230 170 250Q150 200 160 140Q165 105 200 90Z', '#c8323a')],
    ['Estompe avec ton doigt pour adoucir le passage.', 'Smudge with your finger to soften the change.', () => fng(210, 190, '#e45a62')],
    ['Laisse une tache blanche brillante en haut à droite.', 'Leave a shiny white spot at the top right.', () => pe(265, 130, 12, 24, '#fde9e9', 30)],
    ['Dessine l’ombre de la pomme sur la table en gris.', 'Draw the apple’s shadow on the table in grey.', () => pe(220, 258, 105, 12, '#b9bccc') + `<path d="M44 262H356" stroke="${cur ? HL : INK}" stroke-width="3"/>`],
    ['Colorie la tige en brun et ajoute une feuille verte.', 'Colour the stem brown and add a green leaf.', () => pl('M200 90Q200 60 215 45', BRN, 8) + pp('M215 55Q250 30 275 50Q245 75 215 55Z', GRN)],
  ]),
  mk(K, 'citrouille', '🎃', 'Une citrouille', 'A pumpkin', 1, 20, 'fetes', 'halloween', base, false, [
    NS, SH(), ['Peins un grand rond orange, un peu écrasé.', 'Paint a big orange circle, a bit squashed.', () => pe(200, 160, 105, 85, ORG)],
    ['Ajoute deux demi-ronds orange foncé sur les côtés.', 'Add two dark orange half circles on the sides.', () => pe(135, 160, 55, 80, '#ff8a1f') + pe(265, 160, 55, 80, '#ff8a1f')],
    ['Peins une queue verte en haut.', 'Paint a green stem at the top.', () => pp('M190 82Q190 50 215 40L220 55Q208 62 212 82Z', DG)],
    RINSE,
    ['Avec du noir, peins deux triangles pour les yeux.', 'With black, paint two triangles for the eyes.', () => pp('M140 135L175 135L158 105Z', INK) + pp('M225 135L260 135L242 105Z', INK)],
    ['Peins une grande bouche avec des dents.', 'Paint a big mouth with teeth.', () => pp('M135 180Q200 235 265 180L245 185L235 205L215 190L195 210L180 188Z', INK)],
    ['Ajoute du jaune dans les yeux et la bouche. Laisse sécher.', 'Add yellow in the eyes and mouth. Let it dry.', () => pp('M150 130L168 130L158 115Z', YEL) + pp('M233 130L251 130L242 115Z', YEL) + pp('M200 205L215 192L226 200Z', YEL)],
  ]),
  mk(K, 'coeurs-doigts', '💗', 'Des cœurs avec les doigts', 'Finger-print hearts', 1, 15, 'fetes', 'saint-valentin', [M.news, M.sheet, M.gou, M.plate, ['Lingettes', 'Wet wipes']], false, [
    NS, SH(), ['Trempe ton pouce dans le rose. Appuie un ovale incliné à gauche.', 'Dip your thumb in pink. Press a tilted oval on the left.', () => pe(170, 130, 26, 38, PNK, -40) + fng(150, 90, PNK)],
    ['Appuie un deuxième ovale incliné à droite pour faire un cœur.', 'Press a second tilted oval on the right to make a heart.', () => pe(230, 130, 26, 38, PNK, 40)],
    ['Avec ton petit doigt, ferme le bas du cœur.', 'With your little finger, close the bottom of the heart.', () => pp('M170 160L200 205L230 160Z', PNK)],
    RINSE,
    ['Fais d’autres cœurs en rouge, plus petits, autour.', 'Make more red hearts, smaller, around it.', () => [[80, 90], [330, 80], [80, 220], [320, 220], [200, 245]].map(([x, y]) => pe(x - 7, y, 8, 12, RED, -40) + pe(x + 7, y, 8, 12, RED, 40) + pp(`M${x - 13} ${y + 6}L${x} ${y + 22}L${x + 13} ${y + 6}Z`, RED)).join('')],
    ['Avec ton doigt, ajoute de petits points blancs. Laisse sécher.', 'With your finger, add little white dots. Let it dry.', () => dots([[160, 115], [240, 115], [120, 170], [290, 170], [200, 40]], 4, WH)],
  ]),
  mk(K, 'tournesol', '🌻', 'Un tournesol', 'A sunflower', 2, 30, 'nature', 'ete', [...base, M.swab], false, [
    NS, SH(), ['Peins le ciel en bleu clair.', 'Paint the sky light blue.', () => pr(44, 30, 312, 180, SKY, 6)],
    ['Peins une longue tige verte et deux grandes feuilles.', 'Paint a long green stem and two big leaves.', () => pl('M200 150V265', GRN, 12) + pp('M200 220Q130 190 110 230Q160 255 200 235Z', DG) + pp('M200 205Q270 175 290 215Q240 240 200 220Z', DG)],
    ['Fais un grand rond brun au centre de la fleur.', 'Make a big brown circle in the centre of the flower.', () => pc(200, 105, 38, BRN)],
    RINSE,
    ['Peins des pétales jaunes tout autour, comme des rayons.', 'Paint yellow petals all around, like rays.', () => Array.from({ length: 12 }, (_, i) => pe(Math.round(200 + 62 * Math.cos(i * Math.PI / 6)), Math.round(105 + 62 * Math.sin(i * Math.PI / 6)), 12, 26, YEL, i * 30 + 90)).join('')],
    ['Avec un coton-tige, fais des points noirs au centre.', 'With a cotton swab, make black dots in the centre.', () => dots([[188, 95], [210, 92], [200, 108], [185, 118], [215, 118], [200, 125]], 4, INK) + swab(270, 160, INK)],
    ['Ajoute de l’herbe et laisse sécher.', 'Add grass and let it dry.', () => grass(DG)],
  ]),
  mk(K, 'feuille-erable', '🍁', 'Une feuille d’érable', 'A maple leaf', 2, 25, 'nature', 'automne', base, false, [
    NS, SH('#fff6e0'), ['Peins un gros rond rouge au centre.', 'Paint a big red circle in the middle.', () => pc(200, 160, 40, RED)],
    ['Peins trois grandes pointes : une en haut, deux sur les côtés.', 'Paint three big points: one on top, two on the sides.', () => pp('M200 160L160 90L200 40L240 90Z', RED) + pp('M200 160L90 130L110 180Z', RED) + pp('M200 160L310 130L290 180Z', RED)],
    ['Ajoute deux pointes en bas, de chaque côté.', 'Add two points at the bottom, one on each side.', () => pp('M200 170L120 235L180 215Z', RED) + pp('M200 170L280 235L220 215Z', RED)],
    ['Peins la tige en brun vers le bas.', 'Paint the stem brown, going down.', () => pl('M200 190V265', BRN, 8)],
    RINSE,
    ['Avec du jaune et de l’orange, peins les nervures et des taches.', 'With yellow and orange, paint the veins and spots.', () => pl('M200 190V80M200 170L135 135M200 170L265 135M200 190L140 225M200 190L260 225', ORG, 4) + dots([[200, 100], [150, 165], [250, 165]], 8, YEL)],
    DRY,
  ]),
  mk(K, 'bonhomme-neige', '☃️', 'Un bonhomme de neige à l’éponge', 'A sponge snowman', 1, 20, 'hiver', 'hiver', [M.news, ['Papier bleu foncé', 'Dark blue paper'], M.sponge, M.gou, M.brush, M.water], false, [
    NS, SH('#5a7fd0'), ['Trempe l’éponge dans le blanc. Tamponne un grand rond en bas.', 'Dip the sponge in white. Dab a big circle at the bottom.', () => pc(200, 205, 58, WH) + spg(320, 230)],
    ['Tamponne un rond moyen, puis un petit rond pour la tête.', 'Dab a medium circle, then a small one for the head.', () => pc(200, 125, 42, WH) + pc(200, 68, 30, WH)],
    RINSE,
    ['Avec ton pinceau, peins un chapeau noir.', 'With your brush, paint a black hat.', () => pr(165, 34, 70, 12, INK, 3) + pr(178, 14, 44, 24, INK, 3)],
    ['Peins deux yeux, des boutons noirs et un nez orange.', 'Paint two eyes, black buttons and an orange nose.', () => dots([[190, 64], [210, 64]], 4, INK) + dots([[200, 110], [200, 130], [200, 150]], 5, INK) + pp('M198 74L225 80L198 84Z', ORG)],
    ['Dessine des bras bruns en forme de branches.', 'Paint brown arms like twigs.', () => pl('M160 125L110 95M240 125L290 95', BRN, 6)],
    ['Avec ton doigt, fais de la neige qui tombe. Laisse sécher.', 'With your finger, make falling snow. Let it dry.', () => dots([[80, 50], [330, 60], [320, 150], [70, 150], [110, 230], [320, 240], [260, 40]], 5, WH)],
  ]),
  mk(K, 'sapin-points', '🎄', 'Un sapin de Noël pointillé', 'A dotted Christmas tree', 1, 25, 'decorations', 'noel', [M.news, M.sheet, M.swab, M.gou, M.plate], false, [
    NS, SH(), ['Avec un coton-tige brun, fais le tronc en points.', 'With a brown swab, make the trunk of dots.', () => dots([[200, 250], [200, 236], [200, 222]], 7, BRN) + swab(240, 240, BRN)],
    ['Avec du vert, fais des rangées de points en forme de triangle.', 'With green, make rows of dots in a triangle shape.', () => dots([[200, 70], [190, 95], [210, 95], [180, 120], [200, 120], [220, 120], [170, 145], [190, 145], [210, 145], [230, 145], [160, 170], [180, 170], [200, 170], [220, 170], [240, 170], [150, 195], [170, 195], [190, 195], [210, 195], [230, 195], [250, 195]], 8, GRN)],
    ['Continue jusqu’en bas pour faire un grand sapin.', 'Keep going down to make a big tree.', () => dots([[130, 218], [150, 218], [170, 218], [190, 210], [210, 210], [230, 218], [250, 218], [270, 218]], 8, DG)],
    ['Ajoute des boules de couleur avec d’autres points.', 'Add coloured baubles with other dots.', () => dots([[200, 120], [170, 170], [230, 170], [190, 200], [250, 200], [150, 200]], 9, RED) + dots([[210, 145], [180, 145], [215, 200]], 8, YEL) + dots([[160, 218], [240, 215]], 8, BLU)],
    ['Fais une grande étoile jaune au sommet avec ton doigt.', 'Make a big yellow star at the top with your finger.', () => `<polygon points="200,18 208,40 232,42 213,56 220,80 200,66 180,80 187,56 168,42 192,40" fill="${YEL}"${halo()}/>`],
    ['Fais de la neige avec des points blancs bleutés. Laisse sécher.', 'Make snow with pale blue dots. Let it dry.', () => dots([[70, 60], [330, 80], [90, 200], [320, 180], [70, 130], [340, 240]], 5, '#b9c4e8')],
  ]),
  mk(K, 'vagues-voilier', '⛵', 'Des vagues et un voilier', 'Waves and a sailboat', 2, 30, 'nature', 'ete', aq, false, [
    NS, SH(), ['Peins le ciel en bleu très pâle.', 'Paint the sky very pale blue.', () => pr(44, 30, 312, 120, '#e3f2fd', 6)],
    ['Peins une coque de bateau brune et deux voiles jaunes.', 'Paint a brown hull and two yellow sails.', () => pp('M130 150L270 150L240 185L160 185Z', BRN) + pp('M200 60L200 140L145 140Z', YEL) + pp('M208 80L208 140L255 140Z', '#ffe9a0') + pl('M200 50V150', INK, 3)],
    RINSE,
    ['Peins des vagues bleu clair avec des S couchés.', 'Paint light blue waves using sideways S shapes.', () => pp('M44 175Q80 160 110 175T180 175T250 175T320 175T356 175V270H44Z', '#78b8ec')],
    ['Peins une deuxième rangée de vagues plus foncée.', 'Paint a second, darker row of waves.', () => pp('M44 205Q80 190 110 205T180 205T250 205T320 205T356 205V270H44Z', '#3d7be0')],
    ['Peins la rangée du bas encore plus foncée.', 'Paint the bottom row even darker.', () => pp('M44 235Q80 220 110 235T180 235T250 235T320 235T356 235V270H44Z', '#2a52b0')],
    ['Ajoute un soleil orange et laisse sécher.', 'Add an orange sun and let it dry.', () => sunP(320, 66, 20, ORG)],
  ]),
  mk(K, 'chat-noir', '🐈‍⬛', 'Un chat noir sous la lune', 'A black cat under the moon', 2, 30, 'animaux', 'halloween', [M.news, ['Papier orange ou lavis orange', 'Orange paper or orange wash'], M.brush, ['Gouache noire et jaune', 'Black and yellow paint'], M.water], false, [
    NS, SH('#ffb347'), ['Peins une grande lune jaune pâle en haut à droite.', 'Paint a big pale yellow moon at the top right.', () => pc(290, 85, 48, '#fff1a8')],
    ['Peins le corps du chat en noir : un gros œuf.', 'Paint the cat’s body in black: a big egg shape.', () => pe(160, 200, 70, 60, INK)],
    ['Peins la tête ronde avec deux oreilles pointues.', 'Paint the round head with two pointy ears.', () => pc(160, 120, 38, INK) + pp('M126 105L122 65L152 90ZM194 105L198 65L168 90Z', INK)],
    RINSE,
    ['Peins une longue queue qui monte en S.', 'Paint a long tail curving up in an S.', () => pl('M225 215Q290 220 280 160T300 120', INK, 14)],
    ['Avec du jaune, peins deux yeux. Ajoute une petite pointe noire dedans.', 'With yellow, paint two eyes. Add a little black slit.', () => pe(145, 120, 9, 8, YEL) + pe(176, 120, 9, 8, YEL) + pe(145, 120, 2, 7, INK) + pe(176, 120, 2, 7, INK)],
    ['Peins de longues moustaches blanches et le sol. Laisse sécher.', 'Paint long white whiskers and the ground. Let it dry.', () => pl('M120 135L90 130M120 142L90 148M200 135L230 130M200 142L230 148', WH, 3) + pl('M60 270H340', '#8a4a10', 10)],
  ]),
  mk(K, 'lapin-paques', '🐰', 'Un lapin d’empreintes', 'A fingerprint bunny', 2, 25, 'animaux', 'paques', [M.news, M.sheet, M.gou, M.plate, ['Lingettes', 'Wet wipes']], false, [
    NS, SH('#e8f7e0'), ['Avec ton pouce, fais plein d’empreintes grises pour le corps.', 'With your thumb, make lots of grey prints for the body.', () => dots([[180, 200], [220, 200], [160, 225], [200, 225], [240, 225], [190, 175], [215, 175]], 13, '#c9c9d6') + fng(290, 200, '#c9c9d6')],
    ['Ajoute des empreintes pour la tête.', 'Add prints for the head.', () => dots([[200, 130], [175, 130], [225, 130], [200, 105]], 13, '#c9c9d6')],
    ['Fais deux longues oreilles avec des empreintes de doigts alignées.', 'Make two long ears with lined-up fingerprints.', () => dots([[175, 85], [172, 65], [170, 45], [225, 85], [228, 65], [230, 45]], 10, '#c9c9d6') + dots([[174, 66], [227, 66]], 4, PNK)],
    RINSE,
    ['Avec ton petit doigt, fais deux yeux et un nez rose.', 'With your little finger, make two eyes and a pink nose.', () => dots([[185, 120], [215, 120]], 4, INK) + pc(200, 138, 5, PNK)],
    ['Fais une queue blanche et des œufs colorés avec ton pouce.', 'Make a white tail and coloured eggs with your thumb.', () => pc(270, 225, 14, WH) + pe(90, 235, 15, 20, PNK) + pe(125, 245, 15, 20, YEL) + pe(320, 240, 15, 20, '#8fc2f2')],
    ['Lave tes mains. Laisse sécher.', 'Wash your hands. Let it dry.', () => grass(GRN)],
  ]),
  mk(K, 'fleurs-fourchette', '🌼', 'Des fleurs à la fourchette', 'Fork flowers', 1, 20, 'nature', 'printemps', [M.news, M.sheet, ['Fourchette en plastique', 'Plastic fork'], M.gou, M.plate], false, [
    NS, SH(), ['Mets du rose sur une assiette. Trempe le dos de la fourchette.', 'Put pink on a plate. Dip the back of a fork.', () => pot(300, 230, PNK) + tl(`<g transform="translate(110 220) rotate(-30)">${R(-4, -70, 8, 56, '#e9edf4', 3)}${[-9, -3, 3, 9].map((x) => R(x - 1.5, -14, 3, 22, '#e9edf4', 1)).join('')}</g>`)],
    ['Appuie la fourchette en tournant. Fais des pétales en étoile.', 'Press the fork while turning. Make star-shaped petals.', () => flo(130, 100, 46, PNK)],
    RINSE,
    ['Fais un deuxième et un troisième groupe de pétales jaunes et violets.', 'Make a second and third group of petals, yellow and purple.', () => flo(270, 120, 46, YEL) + flo(200, 200, 38, PUR)],
    ['Peins un centre avec le bout du pinceau.', 'Paint a centre with the tip of the brush.', () => dots([[130, 100], [200, 200]], 8, YEL) + pc(270, 120, 8, ORG)],
    ['Dessine les tiges vertes et laisse sécher.', 'Paint the green stems and let it dry.', () => pl('M130 150V268M270 170V268M200 245V268', GRN, 6)],
  ]),
  mk(K, 'hibou-gouache', '🦉', 'Un hibou sur sa branche', 'An owl on a branch', 3, 40, 'animaux', null, [...base, M.pencil, M.swab], false, [
    NS, SH('#fbeed0'), ['Avec un crayon, dessine une grosse forme d’œuf pour le corps.', 'With a pencil, draw a big egg shape for the body.', () => P('M200 50Q110 70 115 170Q125 245 200 250Q275 245 285 170Q290 70 200 50Z', 'none', 5)],
    ['Peins le corps en brun.', 'Paint the body brown.', () => pp('M200 50Q110 70 115 170Q125 245 200 250Q275 245 285 170Q290 70 200 50Z', BRN)],
    ['Peins deux grands cercles blancs pour les yeux.', 'Paint two big white circles for the eyes.', () => pc(165, 110, 32, WH) + pc(235, 110, 32, WH)],
    RINSE,
    ['Peins un rond jaune puis un point noir dans chaque œil.', 'Paint a yellow circle then a black dot in each eye.', () => pc(165, 110, 18, YEL) + pc(235, 110, 18, YEL) + pc(165, 110, 8, INK) + pc(235, 110, 8, INK)],
    ['Peins un petit bec orange en triangle.', 'Paint a little orange triangle beak.', () => pp('M188 135L212 135L200 160Z', ORG)],
    ['Avec un coton-tige, fais des plumes en points sur le ventre.', 'With a swab, make feathers with dots on the belly.', () => dots([[170, 190], [200, 190], [230, 190], [155, 215], [185, 215], [215, 215], [245, 215], [170, 238], [200, 238], [230, 238]], 7, '#e8c9a0') + swab(300, 230, '#e8c9a0')],
    ['Peins la branche et les griffes, puis la lune. Laisse sécher.', 'Paint the branch and the claws, then the moon. Let it dry.', () => pl('M60 258H340', '#5e3a22', 14) + pl('M170 250V258M185 250V258M215 250V258M230 250V258', ORG, 6) + pc(335, 55, 20, '#ffe27a')],
  ]),
  mk(K, 'lac-reflet', '🏞️', 'Un lac et son reflet', 'A lake and its reflection', 3, 40, 'nature', null, base, false, [
    NS, SH(), ['Trace une ligne au milieu avec le pinceau sec : c’est le bord du lac.', 'Draw a line across the middle with a dry brush: it’s the lake’s edge.', () => `<path d="M40 150H360" stroke="${cur ? HL : INK}" stroke-width="4" stroke-dasharray="10 8"/>`],
    ['Peins le ciel bleu clair, en haut seulement.', 'Paint the sky light blue, on the top half only.', () => pr(44, 30, 312, 118, '#bfe0f7', 6)],
    ['Peins des montagnes violettes qui touchent la ligne.', 'Paint purple mountains that touch the line.', () => pp('M44 148L120 70L190 148L250 85L356 148Z', '#8e5bd0')],
    ['Peins des sapins verts devant les montagnes.', 'Paint green fir trees in front of the mountains.', () => pp('M70 148L85 112L100 148ZM100 148L117 105L134 148ZM290 148L305 108L320 148Z', DG)],
    RINSE,
    ['Peins l’eau en bas avec du bleu. Garde la ligne bien nette.', 'Paint the water below with blue. Keep the line neat.', () => pr(44, 152, 312, 118, '#78b8ec', 6)],
    ['Peins le reflet à l’envers : montagnes violet pâle, sapins verts.', 'Paint the reflection upside down: pale purple mountains, green trees.', () => pp('M44 152L120 230L190 152L250 215L356 152Z', '#b39be0') + pp('M70 152L85 188L100 152ZM100 152L117 195L134 152ZM290 152L305 192L320 152Z', DG)],
    ['Fais des petites lignes blanches sur l’eau pour la faire bouger.', 'Make little white lines on the water to make it move.', () => pl('M70 205H140M180 185H260M240 245H320M100 252H170', WH, 4)],
  ]),
  mk(K, 'vase-fleurs', '💐', 'Un vase de fleurs', 'A vase of flowers', 3, 40, 'objets', 'fete-des-meres', [...base, M.pencil], false, [
    NS, SH('#fff6e0'), ['Avec un crayon, dessine un vase et la ligne de la table.', 'With a pencil, draw a vase and the table line.', () => P('M170 270H230L240 210Q260 190 230 175V150H170V175Q140 190 160 210Z', 'none', 4) + P('M44 262H356', 'none', 4)],
    ['Peins la table en brun et le vase en bleu.', 'Paint the table brown and the vase blue.', () => pr(44, 264, 312, 8, BRN) + pp('M170 262H230L240 210Q260 190 230 175V150H170V175Q140 190 160 210Z', BLU)],
    ['Peins trois tiges vertes qui sortent du vase.', 'Paint three green stems coming out of the vase.', () => pl('M185 150L150 80M200 150V60M215 150L250 85', GRN, 7)],
    ['Peins une grosse fleur au bout de chaque tige.', 'Paint a big flower at the end of each stem.', () => pc(150, 70, 24, RED) + pc(200, 50, 24, ORG) + pc(250, 74, 24, PNK)],
    RINSE,
    ['Ajoute un centre jaune à chaque fleur.', 'Add a yellow centre to each flower.', () => dots([[150, 70], [200, 50], [250, 74]], 9, YEL)],
    ['Ajoute des feuilles et un reflet blanc sur le vase.', 'Add leaves and a white shine on the vase.', () => pp('M190 120Q160 105 150 125Q175 135 190 120ZM210 110Q240 95 250 115Q225 125 210 110Z', DG) + pe(180, 225, 6, 22, '#cfe2fa', 8)],
    ['Peins le mur du fond en jaune pâle avec un grand pinceau. Laisse sécher.', 'Paint the back wall pale yellow with a big brush. Let it dry.', () => `<path d="M44 30H356V262H44Z" fill="#fff1b8" opacity=".5"/>`],
  ]),
  mk(K, 'jardin-points', '🏡', 'Un jardin en points', 'A dotted garden', 3, 45, 'nature', 'ete', [M.news, M.sheet, M.swab, M.gou, M.plate], false, [
    NS, SH(), ['Avec du bleu, fais le ciel avec des points serrés en haut.', 'With blue, make the sky with close dots at the top.', () => grid(60, 50, 8, 3, 42, 26, 9, '#8fc2f2')],
    ['Fais le sol vert avec des points en bas.', 'Make the green ground with dots at the bottom.', () => grid(60, 215, 8, 2, 42, 26, 9, GRN)],
    ['Fais une petite maison avec des points rouges et un toit brun.', 'Make a little house with red dots and a brown roof.', () => dots([[160, 170], [180, 170], [200, 170], [220, 170], [160, 190], [180, 190], [200, 190], [220, 190]], 7, RED) + dots([[150, 150], [170, 144], [190, 138], [210, 144], [230, 150]], 7, BRN)],
    ['Ajoute des fleurs avec des points roses, jaunes et violets.', 'Add flowers with pink, yellow and purple dots.', () => dots([[80, 190], [95, 183], [90, 200], [300, 190], [315, 183], [310, 202]], 6, PNK) + dots([[260, 200], [270, 194]], 6, YEL) + dots([[115, 205], [125, 197]], 6, PUR)],
    ['Fais un grand soleil avec des points jaunes.', 'Make a big sun with yellow dots.', () => dots([[320, 70], [320, 48], [320, 92], [298, 70], [342, 70]], 7, YEL)],
    ['Remplis les trous avec d’autres points de couleurs proches.', 'Fill the gaps with dots in nearby colours.', () => dots([[90, 76], [250, 72], [280, 100]], 6, '#bfe0f7') + dots([[100, 250], [300, 248]], 6, DG)],
    ['Éloigne-toi de la feuille : les points se mélangent dans ton œil !', 'Step back from the paper: the dots blend in your eye!', () => ''],
  ]),
];
