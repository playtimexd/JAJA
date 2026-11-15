// Arts plastiques — collage (papier déchiré, mosaïque, textures, nature) (étapes générées par de petites fonctions SVG ; schéma : docs/ARTS.md)
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

const K = 'collage';
const cp = ['Papier de bricolage de couleurs', 'Coloured craft paper'], mag = ['Vieux magazines ou circulaires', 'Old magazines or flyers'], gw = ['Colle blanche et pinceau', 'White glue and brush'], tis = ['Papier de soie', 'Tissue paper'];
const std = [M.paper, cp, M.glue, M.scissors];
const jag = (x, y, w, h, s = 0) => {
  const P = [], n = (l) => Math.max(2, Math.round(l / 16)), j = (i) => [2.5, -2.5, 1.5, -1.5][(i + s) & 3];
  for (let i = 0; i <= n(w); i++) P.push([x + w * i / n(w), y + j(i)]);
  for (let i = 1; i <= n(h); i++) P.push([x + w + j(i + 1), y + h * i / n(h)]);
  for (let i = 1; i <= n(w); i++) P.push([x + w - w * i / n(w), y + h + j(i + 2)]);
  for (let i = 1; i < n(h); i++) P.push([x + j(i + 3), y + h - h * i / n(h)]);
  return P.map((p) => p.map((v) => Math.round(v * 10) / 10).join(',')).join(' ');
};
const TP = (pts, f) => `<polygon points="${pts}" fill="${f}" ${sk(2)} stroke-linejoin="round"/>`;
const TR = (x, y, w, h, f, s = 0) => TP(jag(x, y, w, h, s), f);
const BL = (cx, cy, rx, ry, f, s = 0, n = 12) => TP(Array.from({ length: n }, (_, i) => { const a = i * 2 * Math.PI / n, k = [1, 0.9, 1.07, 0.94][(i + s) & 3]; return `${Math.round(cx + rx * k * Math.cos(a))},${Math.round(cy + ry * k * Math.sin(a))}`; }).join(' '), f);
const glu = (x, y) => tl(`<g transform="translate(${x} ${y}) rotate(25)"><rect x="-9" y="-50" width="18" height="40" rx="4" fill="#f9d56e" stroke="${INK}" stroke-width="3"/><rect x="-11" y="-14" width="22" height="14" rx="3" fill="${RED}" stroke="${INK}" stroke-width="3"/></g>`);
const scis = (x, y) => tl(`<g transform="translate(${x} ${y}) rotate(-25)"><path d="M0 0L-16 -56M0 0L16 -56" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="-12" cy="14" r="10" fill="none" stroke="${RED}" stroke-width="5"/><circle cx="12" cy="14" r="10" fill="none" stroke="${RED}" stroke-width="5"/></g>`);
const mos = (rows, ox, oy, s, pal, keep) => {
  const by = {};
  rows.forEach((row, r) => [...row].forEach((ch, c) => { if (pal[ch] && (!keep || keep.includes(ch))) (by[ch] = by[ch] || []).push(`M${ox + c * s} ${oy + r * s}h${s - 1}v${s - 1}h${1 - s}z`); }));
  return Object.entries(by).map(([ch, d]) => `<path d="${d.join('')}" fill="${pal[ch]}" ${cur ? `stroke="${HL}" stroke-width="3"` : `stroke="${INK}" stroke-width="1.2"`}/>`).join('');
};
const out = (d) => `<path d="${d}" fill="none" stroke="${cur ? HL : '#aab0c4'}" stroke-width="${cur ? 5 : 3}" stroke-dasharray="8 6" stroke-linecap="round" stroke-linejoin="round"/>`;
const tipS = ['Déchire le papier avec tes doigts, sans ciseaux.', 'Tear the paper with your fingers, no scissors.'];
const FISH = ['...FFF....', '.XXXXXXXT.', 'XXXEXXXXTT', 'XXXXXXXXTT', '.BBBBBBBT.', '..BBBB....'];
const HEART = ['.RR...RR.', 'RRRR.RRRR', 'RRRRRRRRR', 'PPPPPPPPP', '.PPPPPPP.', '..DDDDD..', '...DDD...', '....D....'];
const BFLY = ['AAA..KK..AAA', 'AAAA.KK.AAAA', 'AABAAKKAABAA', '.AAAAKKAAAA.', '.CCCCKKCCCC.', '..CCCKKCCC..', '...C.KK.C...'];
const leafP = (x, y, a, c) => `<g transform="translate(${x} ${y}) rotate(${a})">${P('M0 0Q18-18 0-44Q-18-18 0 0Z', c)}</g>`;
export const projects = [
  mk(K, 'arbre-dechire', '🌳', 'Un arbre en papier déchiré', 'A torn-paper tree', 1, 20, 'nature', 'automne', std, false, [
    SH('#d6ecff'), ['Déchire une grande bande de papier brun pour le tronc.', 'Tear a long strip of brown paper for the trunk.', () => TR(182, 130, 36, 135, BRN, 1)],
    ['Colle le tronc au milieu. Frotte bien avec ta main.', 'Glue the trunk in the middle. Rub it well with your hand.', () => glu(270, 200) + TR(182, 130, 36, 135, BRN, 1)],
    ['Déchire deux petites bandes pour les branches.', 'Tear two little strips for the branches.', () => TR(140, 150, 50, 12, BRN, 2) + TR(210, 135, 50, 12, BRN, 3)],
    ['Déchire plein de petits morceaux rouges, orange et jaunes.', 'Tear lots of little red, orange and yellow pieces.', () => [[150, 90, RED], [190, 70, ORG], [235, 90, YEL], [130, 125, ORG], [200, 115, YEL], [265, 130, ORG]].map(([x, y, c], i) => BL(x, y, 18, 15, c, i, 6)).join('')],
    ['Colle-les en haut pour faire le feuillage.', 'Glue them at the top to make the leaves.', () => [[110, 100, YEL], [255, 60, RED], [150, 60, ORG]].map(([x, y, c], i) => BL(x, y, 18, 15, c, i + 1, 6)).join('')],
    ['Déchire du vert pour l’herbe et colle-la en bas.', 'Tear green paper for grass and glue it at the bottom.', () => TR(44, 255, 312, 15, GRN, 2)],
    ['Déchire un rond jaune pour le soleil et colle-le.', 'Tear a yellow circle for the sun and glue it.', () => BL(330, 60, 22, 22, YEL, 0, 10)],
  ]),
  mk(K, 'mouton-coton', '🐑', 'Un mouton en coton', 'A cotton-ball sheep', 1, 20, 'animaux', null, [M.paper, ['Boules de coton', 'Cotton balls'], ['Papier noir', 'Black paper'], gw, M.scissors], false, [
    SH('#e3f6dc'), ['Découpe un ovale noir pour le corps et un rond pour la tête.', 'Cut a black oval for the body and a circle for the head.', () => E(215, 150, 78, 52, INK) + C(115, 130, 28, INK) + scis(330, 240)],
    ['Découpe quatre bandes noires pour les pattes. Colle-les.', 'Cut four black strips for the legs. Glue them on.', () => R(160, 190, 14, 56, INK, 2) + R(190, 190, 14, 56, INK, 2) + R(240, 190, 14, 56, INK, 2) + R(270, 190, 14, 56, INK, 2)],
    ['Étale de la colle blanche sur le corps avec un pinceau.', 'Spread white glue on the body with a brush.', () => E(215, 150, 78, 52, '#fff6c9') + brush(300, 200, 25, '#fff')],
    ['Colle des boules de coton sur toute la colle.', 'Stick cotton balls all over the glue.', () => ring(215, 150, 55, 9, '#fff', 17) + ring(215, 150, 20, 5, '#fff', 17, 0.3) + dots([[160, 138], [270, 138], [215, 105], [165, 170], [265, 168]], 16, '#fff')],
    ['Colle deux petites boules sur la tête.', 'Glue two little cotton balls on the head.', () => dots([[100, 100], [130, 100]], 11, '#fff')],
    ['Dessine un œil avec un feutre. Ajoute de l’herbe verte.', 'Draw an eye with a marker. Add green grass.', () => C(108, 128, 5, '#fff') + C(109, 128, 2.5, INK) + P('M40 262Q80 244 120 262T200 262T280 262T360 262', 'none', 10).replace(INK, GRN)],
  ]),
  mk(K, 'soleil-dechire', '☀️', 'Un soleil en papier déchiré', 'A torn-paper sun', 1, 15, 'nature', 'ete', std, false, [
    SH('#d6ecff'), ['Déchire un grand rond de papier jaune.', 'Tear a big circle of yellow paper.', () => BL(200, 150, 62, 62, YEL, 0, 14)],
    ['Colle le rond au milieu de la feuille.', 'Glue the circle in the middle of the paper.', () => glu(310, 220)],
    ['Déchire un rond orange plus petit et colle-le sur le jaune.', 'Tear a smaller orange circle and glue it on the yellow.', () => BL(200, 150, 38, 38, ORG, 1, 12)],
    ['Déchire dix longues bandes jaunes et orange pour les rayons.', 'Tear ten long yellow and orange strips for the rays.', () => [0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => `<g transform="rotate(${a} 200 150)">${TR(192, 30, 16, 44, i % 2 ? ORG : YEL, i)}</g>`).join('')],
    ['Colle les rayons tout autour, comme des pétales.', 'Glue the rays all around, like petals.', () => glu(320, 230)],
    ['Dessine un sourire et deux yeux avec un feutre.', 'Draw a smile and two eyes with a marker.', () => P('M170 165Q200 190 230 165', 'none', 5) + dots([[182, 135], [218, 135]], 5, INK)],
  ]),
  mk(K, 'mosaique-poisson', '🐠', 'Un poisson en mosaïque', 'A mosaic fish', 1, 30, 'animaux', null, [M.paper, ['Papier de bricolage (carrés déjà coupés)', 'Craft paper (pre-cut squares)'], M.glue, M.pencil], false, [
    SH(), ['Dessine un gros poisson au crayon.', 'Draw a big fish with a pencil.', () => out('M70 135Q130 70 250 100L330 80V210L250 190Q130 215 70 135Z')],
    ['Colle des carrés bleus pour le corps, un à côté de l’autre.', 'Glue blue squares for the body, side by side.', () => mos(FISH, 70, 75, 26, { X: BLU }, 'X')],
    ['Colle des carrés orange pour la queue et la nageoire.', 'Glue orange squares for the tail and fin.', () => mos(FISH, 70, 75, 26, { F: ORG, T: ORG }, 'FT')],
    ['Colle des carrés jaunes pour le ventre.', 'Glue yellow squares for the belly.', () => mos(FISH, 70, 75, 26, { B: YEL }, 'B')],
    ['Colle un carré blanc pour l’œil.', 'Glue a white square for the eye.', () => mos(FISH, 70, 75, 26, { E: WH }, 'E')],
    ['Ajoute des petits carrés bleu pâle pour les bulles.', 'Add little pale blue squares for bubbles.', () => mos(['X.X', '.X.'], 24, 55, 12, { X: '#8fc2f2' }) + mos(['X.', '.X'], 24, 100, 10, { X: '#8fc2f2' })],
  ]),
  mk(K, 'mosaique-coeur', '❤️', 'Un cœur en mosaïque', 'A mosaic heart', 1, 25, 'fetes', 'saint-valentin', [M.paper, ['Carrés de papier rouge, rose et mauve', 'Red, pink and purple paper squares'], M.glue], false, [
    SH(), ['Dessine un gros cœur au crayon.', 'Draw a big heart with a pencil.', () => out('M200 250L84 140Q60 80 120 50Q175 40 200 90Q225 40 280 50Q340 80 316 140Z')],
    ['Colle des carrés rouges en haut du cœur.', 'Glue red squares at the top of the heart.', () => mos(HEART, 74, 36, 28, { R: RED }, 'R')],
    ['Colle des carrés roses au milieu.', 'Glue pink squares in the middle.', () => mos(HEART, 74, 36, 28, { P: PNK }, 'P')],
    ['Colle des carrés mauves en bas.', 'Glue purple squares at the bottom.', () => mos(HEART, 74, 36, 28, { D: '#b06ad0' }, 'D')],
    ['Presse bien chaque carré avec ton doigt.', 'Press each square with your finger.', () => fng(300, 150, PNK)],
    ['Laisse sécher à plat. Ton cœur est prêt !', 'Let it dry flat. Your heart is ready!', () => CLOCK(1)],
  ]),
  mk(K, 'mosaique-papillon', '🦋', 'Un papillon en mosaïque', 'A mosaic butterfly', 3, 35, 'animaux', 'printemps', [M.paper, ['Papier de bricolage', 'Craft paper'], M.scissors, M.glue, M.pencil], false, [
    SH('#e8f7ff'), ['Dessine un papillon avec deux ailes pareilles.', 'Draw a butterfly with two matching wings.', () => out('M200 80Q120 30 60 80Q40 150 150 150Q60 170 90 230Q150 260 200 190Q250 260 310 230Q340 170 250 150Q360 150 340 80Q280 30 200 80Z')],
    ['Découpe de petits carrés de papier rose, jaune et mauve.', 'Cut small squares of pink, yellow and purple paper.', () => mos(['AB', 'CA'], 330, 40, 18, { A: PNK, B: YEL, C: '#b06ad0' }) + scis(345, 130)],
    ['Colle les carrés roses sur le haut des ailes.', 'Glue the pink squares on the upper wings.', () => mos(BFLY, 56, 60, 24, { A: PNK }, 'A')],
    ['Ajoute des carrés jaunes pour faire les taches.', 'Add yellow squares for the spots.', () => mos(BFLY, 56, 60, 24, { B: YEL }, 'B')],
    ['Colle des carrés mauves sur le bas des ailes.', 'Glue purple squares on the lower wings.', () => mos(BFLY, 56, 60, 24, { C: '#b06ad0' }, 'C')],
    ['Colle des carrés noirs au milieu pour le corps.', 'Glue black squares in the middle for the body.', () => mos(BFLY, 56, 60, 24, { K: INK }, 'K')],
    ['Dessine deux antennes avec un feutre noir.', 'Draw two antennae with a black marker.', () => P('M188 62Q178 36 160 30M212 62Q222 36 240 30', 'none', 4)],
  ]),
  mk(K, 'monstre-magazines', '👾', 'Un monstre de magazines', 'A magazine monster', 2, 30, 'fantastique', null, [M.paper, mag, M.scissors, M.glue], false, [
    SH(), ['Feuillette un magazine. Cherche des yeux, des bouches et des nez.', 'Flip through a magazine. Look for eyes, mouths and noses.', () => R(60, 60, 130, 100, '#f2f4f8', 4) + C(100, 100, 14, WH) + C(100, 100, 6, GRN) + P('M120 135Q145 155 170 135', 'none', 5) + R(215, 70, 120, 90, '#f6e9d0', 4)],
    ['Découpe une grande forme pour le corps dans une belle page de couleur.', 'Cut a big body shape from a nice coloured page.', () => BL(200, 160, 100, 90, '#7ac7a1', 1, 10) + scis(335, 250)],
    ['Colle le corps au milieu de ta feuille.', 'Glue the body in the middle of your paper.', () => glu(335, 250)],
    ['Découpe trois yeux différents et colle-les.', 'Cut three different eyes and glue them on.', () => dots([[160, 120], [200, 105], [240, 120]], 18, WH) + dots([[160, 122], [200, 107], [240, 122]], 9, BLU) + dots([[160, 122], [200, 107], [240, 122]], 4, INK)],
    ['Découpe une grande bouche avec des dents et colle-la.', 'Cut a big mouth with teeth and glue it.', () => P('M150 175Q200 235 250 175Z', RED) + P('M160 177L170 190L180 180L190 192L200 182L210 192L220 180L230 190L240 178', WH, 3)],
    ['Ajoute des bras, des pieds ou des cornes en papier de magazine.', 'Add arms, feet or horns from magazine paper.', () => T('150,80 140,40 175,70', ORG) + T('250,80 260,40 225,70', ORG) + R(75, 175, 30, 12, YEL, 6) + R(295, 175, 30, 12, YEL, 6) + R(160, 240, 24, 24, PUR, 4) + R(216, 240, 24, 24, PUR, 4)],
  ]),
  mk(K, 'assiette-aliments', '🍽️', 'Une assiette de magazines', 'A magazine dinner plate', 1, 25, 'nourriture', null, [M.paper, ['Circulaires d’épicerie', 'Grocery flyers'], M.scissors, M.glue, ['Assiette en carton', 'Paper plate']], false, [
    ['Prends une assiette en carton.', 'Take a paper plate.', () => C(200, 150, 112, '#fffdf7') + C(200, 150, 80, '#f2f0ea')],
    ['Cherche dans la circulaire des fruits, des légumes et du pain.', 'Look in the flyer for fruits, vegetables and bread.', () => R(30, 20, 100, 80, '#fff4cf', 4) + C(60, 55, 16, RED) + C(95, 60, 14, ORG) + P('M140 40L190 70', 'none', 3)],
    ['Découpe une pomme et une banane. Colle-les sur l’assiette.', 'Cut out an apple and a banana. Glue them on the plate.', () => C(165, 130, 28, RED) + P('M175 110Q180 100 190 98', 'none', 4) + P('M215 175Q250 190 275 150Q240 170 215 175Z', YEL)],
    ['Découpe du brocoli et des carottes. Colle-les.', 'Cut out broccoli and carrots. Glue them on.', () => dots([[215, 120], [235, 110], [250, 125]], 15, DG) + R(224, 128, 12, 18, '#c8e6a0', 3) + T('150,185 205,195 150,200', ORG)],
    ['Découpe un morceau de pain et du fromage.', 'Cut out a slice of bread and some cheese.', () => R(180, 80, 50, 34, '#e8c07a', 10) + T('240,160 285,160 240,190', YEL)],
    ['Ta belle assiette santé est collée !', 'Your healthy plate is glued!', () => ''],
  ]),
  mk(K, 'algues-matisse', '🌿', 'Les algues de Matisse', 'Matisse-style seaweed', 2, 30, 'arts', null, [['Papier de bricolage bleu, vert, orange', 'Blue, green and orange craft paper'], M.paper, M.scissors, M.glue], false, [
    SH('#fff8e6'), ['Découpe un grand fond bleu foncé aux bords ondulés. Colle-le.', 'Cut a big dark blue background with wavy edges. Glue it.', () => P('M60 40Q200 20 340 44Q360 150 336 256Q200 276 62 252Q42 150 60 40Z', '#2a52b0')],
    ['Plie un papier vert en deux. Découpe une grande forme d’algue sans la dessiner.', 'Fold green paper in half. Cut a big seaweed shape freehand.', () => scis(330, 250) + `<path d="M0 0" />`],
    ['Ouvre-la, c’est une algue symétrique. Colle-la à gauche.', 'Open it: a symmetric seaweed. Glue it on the left.', () => pp('M110 250Q80 200 120 170Q70 150 120 110Q90 80 130 60Q150 100 140 130Q180 160 150 200Q170 230 150 250Z', GRN)],
    ['Découpe des algues plus petites en orange et en vert pâle. Colle-les.', 'Cut smaller seaweeds in orange and light green. Glue them.', () => pp('M250 250Q225 210 255 180Q225 150 260 120Q250 150 280 170Q290 210 275 250Z', ORG) + pp('M190 250Q180 220 200 200Q185 175 205 150Q215 190 215 215Q225 235 210 250Z', '#b5e0a0')],
    ['Découpe des étoiles de mer et des coraux jaunes et blancs.', 'Cut yellow and white starfish and corals.', () => T('300,130 308,150 330,152 313,166 319,188 300,176 281,188 287,166 270,152 292,150', YEL) + BL(70, 230, 14, 14, WH, 0, 8)],
    ['Colle tout. Presse bien et laisse sécher.', 'Glue everything. Press well and let it dry.', () => glu(335, 240)],
  ]),
  mk(K, 'danseur-matisse', '💃', 'Un danseur découpé', 'A cut-out dancer', 3, 40, 'personnages', null, [['Papier de bricolage de deux couleurs', 'Craft paper in two colours'], M.paper, M.scissors, M.glue, M.pencil], false, [
    SH('#2a52b0'), ['Dessine un bonhomme en mouvement sur du papier orange : tête, torse, bras et jambes qui bougent.', 'Draw a moving person on orange paper: head, body, arms and legs in motion.', () => out('M200 90Q180 50 200 40Q225 50 205 90L240 140L290 120L296 138L240 170L220 200L250 250L232 258L195 210L160 255L145 240L180 190L170 140L120 150L112 130L170 118Z')],
    ['Découpe le long du trait avec les ciseaux, d’un seul morceau.', 'Cut along the line with the scissors, all in one piece.', () => scis(320, 250)],
    ['Découpe des petites formes de feuilles dans du papier jaune.', 'Cut small leaf shapes from yellow paper.', () => leafP(70, 90, 20, YEL) + leafP(330, 100, -30, YEL)],
    ['Colle le bonhomme au centre du fond bleu.', 'Glue the figure in the middle of the blue background.', () => pp('M200 90Q180 50 200 40Q225 50 205 90L240 140L290 120L296 138L240 170L220 200L250 250L232 258L195 210L160 255L145 240L180 190L170 140L120 150L112 130L170 118Z', ORG)],
    ['Colle les feuilles et des étoiles jaunes autour de lui.', 'Glue the leaves and yellow stars around him.', () => leafP(70, 110, 20, YEL) + leafP(335, 120, -30, YEL) + leafP(90, 230, 70, '#fff3b0') + leafP(320, 240, -70, '#fff3b0')],
    ['Fais un cercle blanc pour la lune. Admire ton œuvre !', 'Make a white circle for the moon. Admire your work!', () => BL(320, 60, 18, 18, WH, 0, 10)],
  ]),
  mk(K, 'escargot-matisse', '🐌', 'Un escargot en couleurs', 'A colourful snail', 2, 30, 'animaux', null, [M.paper, ['Papier de bricolage de toutes les couleurs', 'Craft paper in all colours'], M.scissors, M.glue], false, [
    SH('#fff8e6'), ['Déchire ou coupe des carrés et des rectangles de plusieurs couleurs.', 'Tear or cut squares and rectangles in several colours.', () => R(60, 50, 40, 30, RED, 2) + R(110, 40, 30, 40, YEL, 2) + R(150, 55, 44, 28, BLU, 2) + R(205, 45, 36, 36, GRN, 2) + R(250, 50, 44, 30, PUR, 2)],
    ['Colle-les en spirale pour faire la coquille. Commence au centre.', 'Glue them in a spiral to make the shell. Start in the middle.', () => R(226, 120, 26, 24, RED, 2) + R(252, 120, 22, 30, YEL, 2) + R(236, 148, 36, 22, BLU, 2)],
    ['Continue la spirale avec des formes de plus en plus grandes.', 'Keep spiralling with bigger and bigger shapes.', () => R(190, 130, 36, 40, GRN, 2) + R(198, 90, 76, 30, PUR, 2) + R(272, 100, 34, 58, ORG, 2) + R(200, 172, 106, 28, PNK, 2)],
    ['Colle une grande bande verte pour le corps.', 'Glue a long green strip for the body.', () => pp('M70 215Q75 200 140 200H320Q340 200 340 210Q340 225 320 225H80Q65 225 70 215Z', GRN)],
    ['Ajoute la tête avec deux antennes.', 'Add the head with two antennae.', () => pp('M45 205Q45 185 70 185Q95 190 90 215H48Z', GRN) + P('M62 185L50 150M78 185L90 150', 'none', 4)],
    ['Colle deux petits ronds blancs pour les yeux. Laisse sécher.', 'Glue two little white circles for eyes. Let it dry.', () => dots([[50, 148], [90, 148]], 9, WH) + dots([[50, 148], [90, 148]], 4, INK)],
  ]),
  mk(K, 'fleurs-decoupees', '🌺', 'Des fleurs découpées', 'Cut-out flowers', 1, 20, 'nature', 'printemps', [M.paper, ['Papier de bricolage de couleurs vives', 'Bright craft paper'], M.scissors, M.glue], false, [
    SH('#e3f6dc'), ['Découpe un grand rond rose et colle-le en haut à gauche.', 'Cut a big pink circle and glue it at the top left.', () => BL(120, 100, 44, 44, PNK, 0, 12)],
    ['Découpe des pétales en forme de gouttes. Colle-les autour du rond.', 'Cut drop-shaped petals. Glue them around the circle.', () => [0, 60, 120, 180, 240, 300].map((a) => `<g transform="rotate(${a} 120 100)">${P('M120 62Q104 36 120 20Q136 36 120 62Z', '#ffc2d8')}</g>`).join('')],
    ['Découpe une fleur plus petite en orange et colle-la à droite.', 'Cut a smaller orange flower and glue it on the right.', () => BL(285, 130, 30, 30, ORG, 1, 10) + ring(285, 130, 46, 8, YEL, 16)],
    ['Découpe des tiges vertes et des feuilles pointues.', 'Cut green stems and pointy leaves.', () => R(117, 150, 8, 112, GRN, 2) + R(282, 190, 8, 72, GRN, 2) + leafP(121, 220, 50, DG) + leafP(286, 235, -50, DG)],
    ['Colle les centres jaunes. Ajoute un papillon.', 'Glue the yellow centres. Add a butterfly.', () => C(120, 100, 14, YEL) + C(285, 130, 9, YEL) + T('200,60 175,45 175,75', PUR) + T('200,60 225,45 225,75', PUR)],
  ]),
  mk(K, 'robot-textures', '🤖', 'Un robot en textures', 'A texture robot', 2, 35, 'personnages', null, [M.paper, ['Papier d’aluminium', 'Aluminum foil'], ['Carton ondulé', 'Corrugated cardboard'], M.glue, M.scissors], false, [
    SH('#e0e8f5'), ['Découpe un rectangle de carton ondulé pour le corps.', 'Cut a rectangle of corrugated cardboard for the body.', () => R(130, 130, 140, 120, '#cfa66b', 4) + `<path d="M140 130V250M155 130V250M170 130V250M185 130V250M200 130V250M215 130V250M230 130V250M245 130V250M260 130V250" stroke="#b8894d" stroke-width="2"/>`],
    ['Colle un carré de papier d’aluminium pour la tête.', 'Glue a square of aluminum foil for the head.', () => R(150, 50, 100, 70, '#d9dde6', 6) + `<path d="M160 60L200 110M210 58L240 100M165 105L190 70" stroke="#fff" stroke-width="3"/>`],
    ['Colle deux ronds de carton pour les yeux et une bande pour la bouche.', 'Glue two cardboard circles for eyes and a strip for the mouth.', () => dots([[180, 84], [220, 84]], 11, YEL) + dots([[180, 84], [220, 84]], 5, INK) + R(178, 104, 44, 8, INK, 3)],
    ['Colle des bandes d’aluminium pour les bras et les jambes.', 'Glue foil strips for the arms and legs.', () => R(70, 140, 60, 16, '#d9dde6', 6) + R(270, 140, 60, 16, '#d9dde6', 6) + R(150, 250, 22, 20, '#d9dde6', 3) + R(228, 250, 22, 20, '#d9dde6', 3)],
    ['Colle des boutons de papier de couleur sur le ventre.', 'Glue coloured paper buttons on the belly.', () => dots([[170, 160], [200, 160], [230, 160]], 9, RED) + dots([[170, 195], [230, 195]], 9, BLU) + R(190, 188, 20, 14, GRN, 3)],
    ['Ajoute une antenne avec un fil et un petit rond. Laisse sécher.', 'Add an antenna with a thread and a little circle. Let it dry.', () => P('M200 50V26', 'none', 4) + C(200, 22, 8, RED)],
  ]),
  mk(K, 'poisson-aluminium', '🐟', 'Un poisson d’aluminium', 'A foil fish', 1, 20, 'animaux', null, [M.paper, ['Papier d’aluminium', 'Aluminum foil'], ['Papier de bricolage bleu', 'Blue craft paper'], M.glue, M.scissors], false, [
    SH('#5f8fe0'), ['Dessine un gros poisson sur le papier d’aluminium et découpe-le.', 'Draw a big fish on aluminum foil and cut it out.', () => P('M90 150Q160 80 250 130L320 90V210L250 170Q160 220 90 150Z', '#d9dde6', 4) + scis(330, 250)],
    ['Colle-le au milieu du papier bleu.', 'Glue it in the middle of the blue paper.', () => glu(330, 250)],
    ['Découpe des petits triangles bleus. Colle-les sur le poisson comme des écailles.', 'Cut little blue triangles. Glue them on the fish as scales.', () => [[170, 130], [200, 130], [230, 140], [185, 155], [215, 160], [170, 165]].map(([x, y]) => T(`${x},${y} ${x + 12},${y} ${x + 6},${y + 12}`, '#3d7be0')).join('')],
    ['Colle un rond blanc et un point noir pour l’œil.', 'Glue a white circle and a black dot for the eye.', () => C(130, 145, 10, WH) + C(132, 146, 4, INK)],
    ['Découpe des algues vertes et des bulles. Colle-les.', 'Cut green seaweed and bubbles. Glue them.', () => P('M70 270Q60 235 80 215M95 270Q105 240 92 222', 'none', 6).replace(INK, GRN) + dots([[70, 100], [90, 70], [60, 60]], 8, '#bfe3ff')],
  ]),
  mk(K, 'maison-textures', '🏠', 'Une maison en textures', 'A house of textures', 2, 35, 'objets', null, [M.paper, ['Carton ondulé, tissu, papier de soie', 'Corrugated cardboard, fabric, tissue paper'], M.glue, M.scissors], false, [
    SH('#d6ecff'), ['Découpe un carré de carton ondulé pour les murs. Colle-le.', 'Cut a square of corrugated cardboard for the walls. Glue it.', () => R(100, 130, 200, 130, '#cfa66b', 4) + `<path d="M120 130V260M140 130V260M160 130V260M180 130V260M200 130V260M220 130V260M240 130V260M260 130V260M280 130V260" stroke="#b8894d" stroke-width="2"/>`],
    ['Découpe un grand triangle de tissu à carreaux pour le toit.', 'Cut a big triangle of checkered fabric for the roof.', () => T('85,135 200,50 315,135', RED) + `<path d="M130 120L180 70M170 128L215 70M210 130L250 78" stroke="#fff" stroke-width="3" opacity=".7"/>`],
    ['Colle une porte en papier brillant.', 'Glue a door of shiny paper.', () => R(175, 190, 50, 70, '#7a5a3a', 4) + C(215, 228, 4, YEL)],
    ['Colle deux fenêtres en papier de soie jaune.', 'Glue two windows of yellow tissue paper.', () => R(120, 160, 40, 40, '#ffe27a', 3) + R(240, 160, 40, 40, '#ffe27a', 3) + P('M140 160V200M120 180H160M260 160V200M240 180H280', 'none', 3)],
    ['Ajoute une cheminée en carton et de la fumée de coton.', 'Add a cardboard chimney and cotton smoke.', () => R(250, 70, 24, 40, '#a0603a', 3) + dots([[262, 56], [274, 40], [262, 24]], 12, '#fff')],
    ['Colle des brins de laine verte pour l’herbe en bas.', 'Glue green yarn strands for grass at the bottom.', () => P('M44 262Q80 250 120 262T200 262T280 262T356 262', 'none', 8).replace(INK, GRN)],
  ]),
  mk(K, 'chat-tissu', '🐱', 'Un chat en tissu', 'A fabric cat', 2, 35, 'animaux', null, [M.paper, ['Retailles de tissu', 'Fabric scraps'], M.glue, M.scissors, M.marker], false, [
    SH('#fff3d6'), ['Découpe un grand rond de tissu pour la tête.', 'Cut a big circle of fabric for the head.', () => C(200, 130, 70, '#f2a65a') + `<path d="M150 95L170 150M185 85L205 160M230 90L215 150" stroke="#d88a3a" stroke-width="4"/>`],
    ['Découpe deux triangles pour les oreilles.', 'Cut two triangles for the ears.', () => T('145,95 135,45 185,75', '#f2a65a') + T('255,95 265,45 215,75', '#f2a65a')],
    ['Découpe un petit tissu rose pour l’intérieur des oreilles.', 'Cut a small pink fabric for inside the ears.', () => T('148,85 143,60 168,76', PNK) + T('252,85 257,60 232,76', PNK)],
    ['Colle un triangle rose pour le nez.', 'Glue a pink triangle for the nose.', () => T('190,150 210,150 200,166', PNK)],
    ['Colle deux gros boutons ou des ronds de tissu pour les yeux.', 'Glue two big buttons or fabric circles for eyes.', () => dots([[170, 125], [230, 125]], 14, '#7ac7a1') + dots([[170, 125], [230, 125]], 6, INK)],
    ['Avec un feutre, dessine la bouche et de longues moustaches.', 'With a marker, draw the mouth and long whiskers.', () => P('M200 166Q185 185 170 175M200 166Q215 185 230 175M150 150L100 140M150 160L100 168M250 150L300 140M250 160L300 168', 'none', 3)],
  ]),
  mk(K, 'hibou-feuilles', '🦉', 'Un hibou de feuilles', 'A leaf owl', 2, 35, 'animaux', 'automne', [M.paper, ['Feuilles d’automne sèches', 'Dry autumn leaves'], M.glue, M.scissors, M.marker], false, [
    SH('#fbeed0'), ['Ramasse des feuilles de toutes les couleurs et laisse-les sécher.', 'Collect leaves of all colours and let them dry.', () => leafP(80, 110, -20, RED) + leafP(130, 90, 10, ORG) + leafP(320, 110, 30, YEL) + leafP(280, 80, -10, '#c98e4d')],
    ['Colle une grosse feuille brune au milieu pour le corps.', 'Glue a big brown leaf in the middle for the body.', () => pp('M200 250Q110 220 120 130Q200 50 280 130Q290 220 200 250Z', '#a0603a')],
    ['Colle des petites feuilles en rangées sur le ventre.', 'Glue small leaves in rows on the belly.', () => [[170, 190, 0], [200, 190, 0], [230, 190, 0], [185, 215, 0], [215, 215, 0]].map(([x, y]) => leafP(x, y + 20, 0, '#e8b05a').replace(/scale\(1\)/, '')).join('')],
    ['Colle deux feuilles rondes pour les yeux.', 'Glue two round leaves for the eyes.', () => pc(170, 125, 26, WH) + pc(230, 125, 26, WH) + pc(170, 125, 12, YEL) + pc(230, 125, 12, YEL)],
    ['Avec un feutre, dessine les pupilles et un bec en triangle.', 'With a marker, draw the pupils and a triangle beak.', () => dots([[170, 125], [230, 125]], 6, INK) + T('190,145 210,145 200,165', ORG)],
    ['Colle un brin de bois en dessous pour la branche.', 'Glue a twig underneath for the branch.', () => P('M60 258H340', 'none', 8).replace(INK, '#5e3a22')],
  ]),
  mk(K, 'bonhomme-nature', '🍃', 'Un bonhomme de la forêt', 'A forest friend', 1, 25, 'nature', 'automne', [M.paper, ['Feuilles, brindilles, petits cailloux', 'Leaves, twigs, little pebbles'], gw, M.marker], false, [
    SH('#f4ead2'), ['Ramasse des feuilles, des brindilles et des cailloux dehors.', 'Collect leaves, twigs and pebbles outside.', () => leafP(70, 100, 10, GRN) + leafP(110, 120, -40, ORG) + P('M290 70L340 110', 'none', 5).replace(INK, '#6a4a2a') + dots([[300, 150], [330, 160]], 10, '#b9bccc')],
    ['Colle une grosse feuille au milieu pour le corps.', 'Glue a big leaf in the middle for the body.', () => pp('M200 250Q130 200 140 140Q200 100 260 140Q270 200 200 250Z', '#e8a43a')],
    ['Colle un caillou rond pour la tête.', 'Glue a round pebble for the head.', () => pc(200, 100, 32, '#b9bccc')],
    ['Colle des brindilles pour les bras et les jambes.', 'Glue twigs for the arms and legs.', () => pl('M140 160L90 130M260 160L310 130M180 245L170 275M220 245L230 275', '#6a4a2a', 6)],
    ['Dessine un visage avec un feutre.', 'Draw a face with a marker.', () => dots([[188, 95], [212, 95]], 4, INK) + P('M188 112Q200 124 212 112', 'none', 3)],
    ['Colle des petites feuilles sur la tête comme des cheveux.', 'Glue little leaves on the head like hair.', () => leafP(185, 76, -25, GRN) + leafP(200, 70, 0, RED) + leafP(215, 76, 25, ORG)],
  ]),
  mk(K, 'arbre-brindilles', '🌲', 'Un arbre de brindilles', 'A twig tree', 1, 20, 'nature', null, [M.cardb, ['Brindilles', 'Twigs'], M.glue, ['Colle blanche', 'White glue']], false, [
    ['Prends un carton. Ce sera ton cadre.', 'Take a piece of cardboard. It will be your frame.', () => R(50, 30, 300, 240, '#cfa66b', 4)],
    ['Colle une grande brindille debout au milieu. C’est le tronc.', 'Glue a big twig standing in the middle. It’s the trunk.', () => P('M200 250V110', 'none', 9).replace(INK, '#6a4a2a')],
    ['Colle des petites brindilles en V pour les branches.', 'Glue small twigs in a V for the branches.', () => P('M200 190L150 140M200 160L255 110M200 130L160 80', 'none', 6).replace(INK, '#6a4a2a')],
    ['Colle de petites feuilles ou des boules de papier au bout.', 'Glue small leaves or paper balls at the tips.', () => dots([[150, 135], [255, 105], [160, 75], [200, 95], [230, 60], [190, 50]], 14, GRN)],
    ['Colle des cailloux ou des graines au pied de l’arbre.', 'Glue pebbles or seeds at the foot of the tree.', () => dots([[160, 255], [185, 262], [215, 262], [240, 255]], 9, '#b9bccc')],
  ]),
  mk(K, 'papillon-petales', '🌸', 'Un papillon de pétales', 'A petal butterfly', 2, 30, 'animaux', 'printemps', [M.paper, ['Pétales ou papier de soie déchiré', 'Petals or torn tissue paper'], gw, M.marker], false, [
    SH('#e8f7ff'), ['Dessine un gros papillon au crayon.', 'Draw a big butterfly with a pencil.', () => out('M200 120Q130 40 70 90Q60 150 160 160Q90 190 120 240Q170 250 200 190Q230 250 280 240Q310 190 240 160Q340 150 330 90Q270 40 200 120Z')],
    ['Étale un peu de colle sur une aile avec le pinceau.', 'Spread a little glue on one wing with the brush.', () => brush(300, 80, 20, '#fff') + pp('M200 120Q130 40 70 90Q60 150 160 160Z', '#fff6c9')],
    ['Colle des pétales roses sur l’aile du haut.', 'Stick pink petals on the upper wing.', () => dots([[110, 100], [140, 90], [160, 115], [120, 130]], 14, PNK)],
    ['Fais pareil de l’autre côté.', 'Do the same on the other side.', () => dots([[290, 100], [260, 90], [240, 115], [280, 130]], 14, PNK)],
    ['Ajoute des pétales jaunes et mauves sur le bas des ailes.', 'Add yellow and purple petals on the lower wings.', () => dots([[130, 200], [160, 190], [270, 200], [240, 190]], 13, YEL) + dots([[145, 225], [255, 225]], 12, '#b06ad0')],
    ['Dessine le corps et les antennes avec un feutre.', 'Draw the body and antennae with a marker.', () => E(200, 155, 8, 50, INK) + P('M200 108Q190 80 175 72M200 108Q210 80 225 72', 'none', 3)],
  ]),
  mk(K, 'portrait-collage', '🧑‍🎨', 'Mon portrait en collage', 'My collage portrait', 3, 45, 'personnages', null, [M.paper, mag, cp, M.scissors, M.glue, M.pencil], false, [
    SH('#e0e8f5'), ['Regarde-toi dans un miroir. Dessine un grand ovale pour le visage.', 'Look in a mirror. Draw a big oval for the face.', () => out('M200 40Q120 50 120 140Q125 230 200 250Q275 230 280 140Q280 50 200 40Z')],
    ['Découpe un ovale de papier de la couleur de ta peau et colle-le.', 'Cut an oval of paper the colour of your skin and glue it.', () => pe(200, 145, 80, 105, '#f2c6a0') + glu(335, 250)],
    ['Découpe tes cheveux : mèches, boucles ou frange. Colle-les.', 'Cut your hair: strands, curls or bangs. Glue them on.', () => pp('M120 130Q110 40 200 36Q290 40 280 130Q250 70 200 80Q150 70 120 130Z', BRN) + pp('M118 130Q104 170 124 200Q112 160 130 130Z', BRN) + pp('M282 130Q296 170 276 200Q288 160 270 130Z', BRN)],
    ['Cherche tes yeux dans un magazine, ou découpe-les dans du papier. Colle-les.', 'Find eyes in a magazine, or cut them from paper. Glue them on.', () => E(165, 140, 20, 11, WH) + E(235, 140, 20, 11, WH) + C(165, 140, 8, BLU) + C(235, 140, 8, BLU) + C(165, 140, 3.5, INK) + C(235, 140, 3.5, INK)],
    ['Découpe un nez et une bouche. Colle le nez, puis la bouche.', 'Cut a nose and a mouth. Glue the nose, then the mouth.', () => pp('M195 150Q185 185 200 192Q215 185 205 150Z', '#e0a07a') + pp('M170 212Q200 232 230 212Q200 220 170 212Z', RED)],
    ['Ajoute tes habits avec du papier à motifs ou du tissu.', 'Add your clothes with patterned paper or fabric.', () => pp('M110 270Q120 240 160 235Q200 255 240 235Q280 240 290 270Z', PUR) + dots([[150, 260], [190, 258], [235, 262]], 4, YEL)],
    ['Colle un fond de papier coloré et des formes autour de toi.', 'Glue a coloured background and shapes around you.', () => dots([[70, 70], [330, 60], [60, 220], [340, 230]], 18, YEL) + BL(335, 140, 14, 14, GRN, 1, 8)],
  ]),
  mk(K, 'portrait-picasso', '🎭', 'Un visage cubiste', 'A cubist face', 3, 40, 'arts', null, [M.paper, cp, M.scissors, M.glue, M.marker], false, [
    SH('#fff8e6'), ['Découpe une grande forme de visage dans du papier beige.', 'Cut a big face shape from beige paper.', () => P('M200 40Q130 50 125 150Q130 235 200 255Q270 235 275 150Q270 50 200 40Z', '#f2d6b0', 4)],
    ['Découpe une moitié du visage dans du papier bleu et colle-la sur la gauche.', 'Cut half of the face from blue paper and glue it on the left.', () => pp('M200 40Q130 50 125 150Q130 235 200 255Z', '#7aa7e8')],
    ['Découpe deux yeux différents : un de face, un de côté. Colle-les.', 'Cut two different eyes: one from the front, one from the side. Glue them.', () => E(165, 120, 22, 14, WH) + C(165, 120, 7, INK) + T('215,115 255,120 215,135', WH) + C(240, 122, 5, INK)],
    ['Découpe un grand nez en triangle de profil. Colle-le.', 'Cut a big triangle nose in profile. Glue it.', () => T('200,125 232,190 190,190', '#e0a07a')],
    ['Découpe une bouche de travers, rouge. Colle-la.', 'Cut a crooked red mouth. Glue it.', () => pp('M150 215Q190 200 250 225Q200 240 150 215Z', RED)],
    ['Colle des triangles et des carrés de couleur autour du visage.', 'Glue coloured triangles and squares around the face.', () => T('50,40 110,40 50,100', YEL) + T('350,260 290,260 350,200', GRN) + R(300, 50, 40, 40, ORG, 3) + R(55, 200, 44, 44, PUR, 3)],
    ['Avec un feutre noir, souligne les contours. Laisse sécher.', 'With a black marker, outline the shapes. Let it dry.', () => ''],
  ]),
  mk(K, 'ville-formes', '🏙️', 'Ma ville en formes', 'My shape city', 2, 35, 'objets', null, [M.paper, cp, M.scissors, M.glue, M.marker], false, [
    SH('#b7dcf5'), ['Découpe des rectangles de différentes hauteurs : ce sont les immeubles.', 'Cut rectangles of different heights: these are the buildings.', () => R(60, 120, 50, 150, '#e8484f', 2) + R(120, 80, 60, 190, '#3d7be0', 2) + R(190, 150, 50, 120, '#ffb347', 2) + R(250, 100, 55, 170, '#8e5bd0', 2)],
    ['Colle-les sur le bas de ta feuille, un à côté de l’autre.', 'Glue them at the bottom of your paper, side by side.', () => R(310, 170, 40, 100, '#4cb85a', 2) + glu(330, 90)],
    ['Découpe des petits carrés jaunes pour les fenêtres.', 'Cut little yellow squares for windows.', () => [[70, 135], [90, 165], [135, 100], [155, 135], [200, 165], [265, 115], [285, 150], [320, 185]].map(([x, y]) => R(x, y, 12, 12, YEL, 1)).join('')],
    ['Découpe des triangles pour les toits et colle-les.', 'Cut triangles for the roofs and glue them on.', () => T('190,150 215,125 240,150', RED) + T('120,80 150,50 180,80', INK)],
    ['Découpe un grand rond jaune pour le soleil et des nuages blancs.', 'Cut a big yellow circle for the sun and white clouds.', () => BL(60, 60, 24, 24, YEL, 0, 10) + cloud(240, 56, 0.8) + cloud(340, 90, 0.5)],
    ['Colle une route grise en bas avec des traits blancs.', 'Glue a grey road at the bottom with white lines.', () => R(44, 272, 312, 0, INK, 0) + `<rect x="40" y="262" width="320" height="12" fill="#8a90a4"/><path d="M60 268H100M140 268H180M220 268H260M300 268H340" stroke="#fff" stroke-width="3"/>`],
  ]),
  mk(K, 'fusee-formes', '🚀', 'Une fusée en formes', 'A shape rocket', 1, 20, 'vehicules', null, [M.paper, cp, M.scissors, M.glue], false, [
    SH('#1f2a5a'), ['Découpe un long rectangle gris pour le corps.', 'Cut a long grey rectangle for the body.', () => R(160, 80, 80, 140, '#d9dde6', 6)],
    ['Découpe un triangle rouge et colle-le en haut.', 'Cut a red triangle and glue it on top.', () => T('160,80 200,20 240,80', RED)],
    ['Découpe deux triangles bleus pour les ailes.', 'Cut two blue triangles for the wings.', () => T('160,170 120,240 160,220', BLU) + T('240,170 280,240 240,220', BLU)],
    ['Colle un rond bleu clair pour le hublot.', 'Glue a light blue circle for the window.', () => C(200, 130, 20, '#bfe3ff') + C(200, 130, 12, '#8fc2f2')],
    ['Découpe une flamme orange et jaune et colle-la en bas.', 'Cut an orange and yellow flame and glue it underneath.', () => pp('M170 220Q200 290 230 220Z', ORG) + pp('M185 220Q200 262 215 220Z', YEL)],
    ['Colle des étoiles jaunes et une lune blanche autour.', 'Glue yellow stars and a white moon around it.', () => dots([[80, 60], [320, 80], [70, 190], [330, 200], [100, 250], [310, 40]], 6, YEL) + BL(320, 140, 18, 18, WH, 0, 10)],
  ]),
  mk(K, 'aquarium', '🐡', 'Mon aquarium', 'My aquarium', 2, 35, 'animaux', null, [M.paper, cp, ['Papier de soie bleu', 'Blue tissue paper'], M.scissors, M.glue], false, [
    SH(), ['Colle une grande feuille de papier de soie bleu pour l’eau.', 'Glue a big sheet of blue tissue paper for the water.', () => pr(44, 30, 312, 240, '#a8d4f5', 6)],
    ['Découpe du sable en papier beige. Colle-le en bas.', 'Cut sand from beige paper. Glue it at the bottom.', () => pp('M44 240Q120 220 200 240T356 235V270H44Z', '#ecd39a')],
    ['Découpe un poisson orange et colle-le à gauche.', 'Cut an orange fish and glue it on the left.', () => pp('M70 120Q110 85 150 115L180 95V150L150 130Q110 160 70 120Z', ORG) + C(95, 115, 4, INK)],
    ['Découpe un poisson jaune plus petit et un poisson rayé.', 'Cut a smaller yellow fish and a striped fish.', () => pp('M220 80Q250 60 275 80L295 68V100L275 90Q250 105 220 80Z', YEL) + pp('M230 170Q270 140 310 165L335 145V200L310 185Q270 210 230 170Z', PUR) + P('M262 152V190M282 150V190', 'none', 3)],
    ['Découpe des algues vertes et colle-les sur le sable.', 'Cut green seaweed and glue it on the sand.', () => pp('M80 250Q60 215 85 190Q95 220 100 250Z', GRN) + pp('M140 252Q130 225 150 205Q158 230 160 252Z', DG) + pp('M300 250Q280 220 305 200Q312 225 318 250Z', GRN)],
    ['Colle des bulles de papier blanc et un petit coquillage.', 'Glue white paper bubbles and a little shell.', () => dots([[130, 70], [145, 50], [120, 40], [260, 120], [275, 105]], 8, '#fff') + pp('M200 250Q220 225 240 250Z', PNK)],
  ]),
  mk(K, 'vitrail-soie', '🪟', 'Un vitrail en papier de soie', 'A tissue-paper stained glass', 3, 40, 'decorations', null, [['Papier de soie de couleurs', 'Coloured tissue paper'], ['Papier cartouche noir', 'Black card'], ['Papier collant transparent (contact)', 'Clear sticky film'], M.scissors, M.glue], false, [
    ['Découpe un cadre noir avec un grand rond au milieu.', 'Cut a black frame with a big circle in the middle.', () => R(60, 30, 280, 240, INK, 6) + C(200, 150, 90, '#fff')],
    ['Dessine des traits noirs dans le rond pour faire des sections.', 'Draw black lines in the circle to make sections.', () => P('M200 60V240M110 150H290M136 86L264 214M264 86L136 214', 'none', 6)],
    ['Déchire du papier de soie rouge et jaune en petits morceaux.', 'Tear red and yellow tissue paper into little pieces.', () => BL(100, 70, 16, 12, RED, 0, 8) + BL(130, 90, 14, 12, YEL, 1, 8) + BL(300, 70, 16, 12, ORG, 2, 8)],
    ['Colle les morceaux rouges et jaunes sur la moitié du haut.', 'Glue the red and yellow pieces on the top half.', () => pp('M200 60A90 90 0 0 1 290 150H200Z', RED) + pp('M200 60A90 90 0 0 0 110 150H200Z', YEL)],
    ['Colle du bleu et du vert sur la moitié du bas.', 'Glue blue and green on the bottom half.', () => pp('M200 150H290A90 90 0 0 1 200 240Z', BLU) + pp('M200 150H110A90 90 0 0 0 200 240Z', GRN)],
    ['Garde tes traits noirs visibles. Laisse sécher.', 'Keep your black lines visible. Let it dry.', () => P('M200 60V240M110 150H290M136 86L264 214M264 86L136 214', 'none', 6)],
    ['Colle le vitrail à une fenêtre : la lumière passe !', 'Stick the stained glass on a window: the light shines through!', () => ''],
  ]),
  mk(K, 'lapin-soie', '🐰', 'Un lapin en papier de soie', 'A tissue-paper bunny', 1, 20, 'animaux', 'paques', [M.paper, ['Papier de soie rose et blanc', 'Pink and white tissue paper'], gw, M.marker], false, [
    SH('#e8f7e0'), ['Dessine un lapin avec une grosse tête, deux oreilles et un corps.', 'Draw a bunny with a big head, two ears and a body.', () => out('M200 80Q150 70 160 20Q175 10 190 60M200 80Q250 70 240 20Q225 10 210 60M200 75Q150 90 150 125Q100 150 110 220Q140 260 200 255Q260 260 290 220Q300 150 250 125Q250 90 200 75Z')],
    ['Fais des petites boules de papier de soie blanc en les roulant dans tes doigts.', 'Make little balls of white tissue paper by rolling them in your fingers.', () => dots([[320, 60], [340, 90], [320, 110]], 11, WH) + fng(300, 150, WH)],
    ['Trempe chaque boule dans la colle et colle-la dans le corps.', 'Dip each ball in glue and stick it inside the body.', () => dots([[150, 200], [190, 205], [230, 200], [265, 200], [170, 230], [215, 235], [250, 230], [185, 175], [225, 170]], 13, WH)],
    ['Remplis la tête de la même façon.', 'Fill the head the same way.', () => dots([[175, 105], [200, 100], [225, 105], [185, 125], [215, 125]], 12, WH)],
    ['Colle des boules roses dans les oreilles.', 'Glue pink balls inside the ears.', () => dots([[172, 42], [178, 62], [228, 42], [222, 62]], 8, PNK)],
    ['Dessine les yeux, le nez et les moustaches avec un feutre.', 'Draw the eyes, nose and whiskers with a marker.', () => dots([[182, 108], [218, 108]], 4, INK) + C(200, 122, 5, PNK) + P('M170 125L140 118M170 130L140 136M230 125L260 118M230 130L260 136', 'none', 3)],
  ]),
  mk(K, 'bonhomme-neige-dechire', '☃️', 'Un bonhomme de neige déchiré', 'A torn-paper snowman', 1, 20, 'hiver', 'hiver', std, false, [
    SH('#5a7fd0'), ['Déchire trois ronds de papier blanc : grand, moyen et petit.', 'Tear three circles of white paper: big, medium and small.', () => BL(70, 80, 40, 40, WH, 0, 12) + BL(70, 160, 30, 30, WH, 1, 12) + BL(70, 220, 22, 22, WH, 2, 10)],
    ['Colle le plus grand en bas, puis le moyen, puis le petit.', 'Glue the biggest at the bottom, then the medium, then the small.', () => BL(220, 215, 54, 52, WH, 0, 12) + BL(220, 140, 40, 38, WH, 1, 12) + BL(220, 88, 28, 28, WH, 2, 10)],
    ['Découpe un chapeau noir : un rectangle et une bande.', 'Cut a black hat: a rectangle and a strip.', () => R(190, 40, 60, 12, INK, 3) + R(200, 14, 40, 28, INK, 3)],
    ['Découpe un petit triangle orange pour le nez et deux ronds noirs pour les yeux.', 'Cut a small orange triangle for the nose and two black circles for the eyes.', () => T('220,90 250,96 220,100', ORG) + dots([[210, 80], [232, 80]], 4, INK)],
    ['Colle trois boutons noirs et une écharpe rouge.', 'Glue three black buttons and a red scarf.', () => dots([[220, 130], [220, 150], [220, 170]], 5, INK) + R(190, 108, 60, 12, RED, 5) + R(235, 116, 14, 30, RED, 3)],
    ['Déchire des petits morceaux blancs pour la neige qui tombe.', 'Tear little white pieces for the falling snow.', () => BL(70, 60, 7, 6, WH, 0, 6) + BL(340, 100, 7, 6, WH, 1, 6) + BL(100, 180, 7, 6, WH, 2, 6) + BL(335, 220, 7, 6, WH, 3, 6) + BL(300, 50, 7, 6, WH, 0, 6)],
  ]),
  mk(K, 'citrouille-dechiree', '🎃', 'Une citrouille déchirée', 'A torn-paper pumpkin', 1, 20, 'fetes', 'halloween', std, false, [
    SH('#2a2f55'), ['Déchire un grand rond de papier orange.', 'Tear a big circle of orange paper.', () => BL(200, 160, 90, 80, ORG, 0, 14)],
    ['Colle-le au milieu et frotte bien.', 'Glue it in the middle and rub it well.', () => glu(330, 230)],
    ['Déchire deux demi-lunes orange foncé et colle-les sur les côtés.', 'Tear two dark orange crescents and glue them on the sides.', () => P('M130 100Q100 160 130 230Q80 170 130 100Z', '#ff8a1f') + P('M270 100Q300 160 270 230Q320 170 270 100Z', '#ff8a1f')],
    ['Déchire un morceau vert pour la tige.', 'Tear a green piece for the stem.', () => TR(190, 62, 22, 34, DG, 1)],
    ['Déchire deux triangles et une bouche en noir. Colle-les.', 'Tear two triangles and a mouth in black. Glue them.', () => T('150,140 180,140 165,115', INK) + T('220,140 250,140 235,115', INK) + P('M150 185Q200 225 250 185Z', INK)],
    ['Colle un petit morceau jaune dans chaque trou. Ça brille !', 'Glue a little yellow piece in each hole. It glows!', () => T('158,134 172,134 165,122', YEL) + T('228,134 242,134 235,122', YEL) + P('M180 192Q200 208 220 192Z', YEL)],
  ]),
  mk(K, 'carte-fleurs', '💐', 'Une carte aux fleurs de papier', 'A paper flower card', 2, 35, 'cartes', 'fete-des-meres', [M.cardb, cp, M.scissors, M.glue, M.marker], false, [
    ['Plie une feuille de carton en deux pour faire la carte.', 'Fold a sheet of cardboard in half to make the card.', () => R(80, 40, 240, 220, '#fff6e0', 4) + `<path d="M200 40V260" stroke="${INK}" stroke-width="4" stroke-dasharray="10 8"/>`],
    ['Découpe trois tiges vertes et colle-les sur le devant.', 'Cut three green stems and glue them on the front.', () => R(135, 150, 8, 100, GRN, 2) + R(196, 120, 8, 130, GRN, 2) + R(257, 150, 8, 100, GRN, 2)],
    ['Découpe des ronds de couleurs pour le centre des fleurs.', 'Cut coloured circles for the flower centres.', () => dots([[139, 140], [200, 110], [261, 140]], 14, YEL)],
    ['Découpe des pétales dans du papier rose, rouge et mauve.', 'Cut petals from pink, red and purple paper.', () => ring(139, 140, 26, 6, PNK, 12) + ring(200, 110, 28, 6, RED, 13) + ring(261, 140, 26, 6, '#b06ad0', 12)],
    ['Colle les pétales autour de chaque centre.', 'Glue the petals around each centre.', () => dots([[139, 140], [200, 110], [261, 140]], 12, YEL) + leafP(150, 215, 60, DG) + leafP(250, 215, -60, DG)],
    ['Écris un mot doux dans la carte avec un feutre.', 'Write a sweet message inside the card with a marker.', () => P('M110 100Q150 90 190 100', 'none', 3) + P('M110 130Q160 120 200 130', 'none', 3)],
  ]),
  mk(K, 'paysage-bandes', '🌄', 'Un paysage en bandes de papier', 'A paper-strip landscape', 2, 30, 'nature', null, [M.paper, cp, M.scissors, M.glue], false, [
    SH(), ['Colle une bande de papier bleu en haut pour le ciel.', 'Glue a strip of blue paper at the top for the sky.', () => TR(44, 30, 312, 90, '#8fc2f2', 0)],
    ['Déchire une bande violette en vagues pour les montagnes lointaines.', 'Tear a wavy purple strip for the distant mountains.', () => pp('M44 150Q90 90 140 130Q190 70 250 120Q310 90 356 140V160H44Z', '#9a7bd0')],
    ['Colle une bande vert pâle pour les collines.', 'Glue a pale green strip for the hills.', () => pp('M44 175Q120 130 200 170T356 160V200H44Z', '#a5dd6a')],
    ['Colle une bande vert foncé plus bas.', 'Glue a dark green strip lower down.', () => pp('M44 215Q120 185 200 210T356 205V240H44Z', DG)],
    ['Colle une bande brune pour le chemin.', 'Glue a brown strip for the path.', () => pp('M44 245Q200 225 356 245V270H44Z', '#c98e4d')],
    ['Découpe un soleil orange et un nuage blanc. Colle-les.', 'Cut an orange sun and a white cloud. Glue them.', () => BL(310, 60, 22, 22, ORG, 0, 10) + cloud(110, 60, 0.9)],
  ]),
  mk(K, 'dragon-formes', '🐉', 'Un dragon en formes', 'A shape dragon', 3, 45, 'fantastique', null, [M.paper, cp, M.scissors, M.glue, M.marker], false, [
    SH('#fff3d6'), ['Découpe un grand ovale vert pour le corps.', 'Cut a big green oval for the body.', () => E(190, 170, 100, 56, GRN)],
    ['Découpe une tête avec un museau en forme de rectangle arrondi.', 'Cut a head with a rounded rectangle snout.', () => E(100, 120, 40, 34, GRN) + R(60, 128, 56, 30, GRN, 14)],
    ['Découpe un long cou et une queue en forme de triangle allongé.', 'Cut a long neck and a long triangle tail.', () => pp('M120 130L150 130L170 170L120 170Z', GRN) + T('280,150 360,190 280,200', GRN)],
    ['Découpe des triangles orange pour les piquants du dos. Colle-les.', 'Cut orange triangles for the back spikes. Glue them.', () => [[150, 120], [180, 112], [210, 114], [240, 122], [270, 136]].map(([x, y]) => T(`${x},${y} ${x + 14},${y - 26} ${x + 28},${y + 8}`, ORG)).join('')],
    ['Découpe deux grandes ailes jaunes et colle-les.', 'Cut two big yellow wings and glue them.', () => T('180,150 160,60 250,110', YEL) + T('220,150 260,50 300,130', '#ffe9a0')],
    ['Colle quatre pattes, un œil et des narines. Dessine des dents blanches.', 'Glue four legs, an eye and nostrils. Draw white teeth.', () => R(130, 215, 24, 36, GRN, 8) + R(220, 215, 24, 36, GRN, 8) + C(100, 112, 7, YEL) + C(100, 112, 3, INK) + T('66,150 74,162 82,150', WH)],
    ['Ajoute de la fumée grise qui sort du nez et des écailles de couleur.', 'Add grey smoke from the nose and coloured scales.', () => dots([[44, 135], [48, 118], [60, 100]], 9, '#b9bccc') + dots([[190, 175], [220, 190], [165, 190]], 8, '#7ac7a1')],
  ]),
  mk(K, 'prenom-magazines', '🔤', 'Mon prénom en magazines', 'My name in magazine letters', 2, 30, 'lettres', null, [M.paper, mag, M.scissors, M.glue], false, [
    SH('#fff8e6'), ['Cherche dans les magazines les lettres de ton prénom.', 'Look in magazines for the letters of your name.', () => R(60, 50, 56, 56, '#ffd6e5', 3) + R(128, 50, 56, 56, '#d6ecff', 3) + R(196, 50, 56, 56, '#e0f5d0', 3) + `<path d="M70 98L88 58L106 98M138 58V98M165 58V98M138 78H165M206 98V58L240 98V58" fill="none" stroke="${INK}" stroke-width="4"/>`],
    ['Découpe chaque lettre en carré ou en rond.', 'Cut out each letter in a square or circle.', () => scis(320, 200)],
    ['Place les lettres dans le bon ordre sur ta feuille sans coller.', 'Put the letters in the right order on your paper without gluing.', () => R(70, 130, 50, 50, '#ffd6e5', 3) + R(130, 130, 50, 50, '#d6ecff', 3) + R(190, 130, 50, 50, '#e0f5d0', 3) + R(250, 130, 50, 50, '#ffe9a0', 3)],
    ['Colle-les une à une avec la colle en bâton.', 'Glue them one by one with the glue stick.', () => glu(330, 230)],
    ['Découpe des petites formes de magazine pour décorer autour.', 'Cut little magazine shapes to decorate around.', () => dots([[70, 60], [330, 70], [60, 230], [340, 240]], 16, PUR) + BL(200, 230, 22, 18, ORG, 1, 8)],
    ['Colle les décorations. Ton prénom est une œuvre d’art !', 'Glue the decorations. Your name is a work of art!', () => ''],
  ]),
];
