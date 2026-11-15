// Arts plastiques — pliage (2e série). Schéma : docs/ARTS.md
// Les dessins sont construits par un petit moteur de « pièces » : chaque pièce apparaît à une étape et est contournée en rose (#ff5d8f) à cette étape.
// Mini step-picture engine: a project = list of pieces [firstStep, shape, hiddenFromStep?].
// Shapes use tokens {S} stroke, {D} dashed line, {I} ink fill; the pieces new in a step are drawn in pink.
const INK = '#3a3f55', PK = '#ff5d8f';
const SN = '';   // normal strokes are set once on the group
const SH = `stroke="${PK}" stroke-width="6"`;
const DN = `stroke="${INK}" stroke-width="3" stroke-dasharray="10 8" stroke-linecap="round"`;
const DH = `stroke="${PK}" stroke-width="5" stroke-dasharray="10 8" stroke-linecap="round"`;
const Y = '#ffd36b', O = '#ff9f5a', B = '#7ec8f0', GN = '#8fd694', PI = '#f6a6c1', VI = '#b79af0', WH = '#fff', GY = '#c9ced9', BR = '#c98f5a', RD = '#ef6a6a', CR = '#fff1d6', DB = '#4b7fd0', DG = '#4fae6a', LB = '#cfeaff', TN = '#e9c98a';
const C = (x, y, r, f = WH) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" {S}/>`;
const E = (x, y, rx, ry, f = WH, rot = 0) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''} {S}/>`;
const R = (x, y, w, h, f = WH, rx = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"${rx ? ` rx="${rx}"` : ''} fill="${f}" {S}/>`;
const G = (pts, f = WH) => `<polygon points="${pts}" fill="${f}" {S}/>`;
const PA = (d, f = 'none') => `<path d="${d}" fill="${f}" {S}/>`;
const L = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" {S}/>`;
const FD = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" {D}/>`;
const DOT = (x, y, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="{I}" stroke="none"/>`;
const EYES = (x, y, d, r = 5) => [DOT(x - d, y, r), DOT(x + d, y, r)];
const SM = (x, y, w, h = 12) => `<path d="M${x - w} ${y}Q${x} ${y + h} ${x + w} ${y}" fill="none" {S}/>`;
const ARR = (x1, y1, cx, cy, x2, y2) => {
  const dx = x2 - cx, dy = y2 - cy, l = Math.hypot(dx, dy) || 1, ux = dx / l, uy = dy / l, bx = x2 - ux * 16, by = y2 - uy * 16, px = -uy * 9, py = ux * 9;
  return `<path d="M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}" fill="none" stroke="${PK}" stroke-width="6" stroke-linecap="round"/><polygon points="${x2},${y2} ${f(bx + px)},${f(by + py)} ${f(bx - px)},${f(by - py)}" fill="${PK}" stroke="none"/>`;
};
const f = (v) => Math.round(v * 10) / 10;
const at = (k, ...s) => s.flat(9).map((x) => [k, x]);            // shapes first shown at step k
const rm = (k, to, ...s) => s.flat(9).map((x) => [k, x, to]);    // shapes shown from step k up to step to-1
const A = (k, ...a) => [[k, ARR(...a), k + 1]];                 // arrow shown at step k only
const coll = (x, o = []) => { if (Array.isArray(x)) { if (typeof x[0] === 'number') o.push(x); else x.forEach((y) => coll(y, o)); } return o; };
function mk(cat) {
  return (id, emoji, fr, en, level, minutes, theme, season, mats, adult, texts, pieces) => {
    const n = texts.length;
    const steps = texts.map(([tf, te], i) => {
      const k = i + 1, last = k === n;
      let body = '';
      for (const [from, sh, to] of coll(pieces)) {
        if (from <= k && (to == null || k < to)) { const hl = !last && from === k; body += sh.replaceAll('{S}', hl ? SH : SN).replaceAll('{D}', hl ? DH : DN).replaceAll('{I}', hl ? PK : INK); }
      }
      return { svg: `<svg viewBox="0 0 400 300"><g stroke="#3a3f55" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">${body.replace(/(\d+\.\d)\d+/g, '$1')}</g></svg>`, text: { fr: tf, en: te } };
    });
    return { id: `${cat}-${id}`, cat, emoji, title: { fr, en }, level, minutes, theme, season: season || null, materials: mats.map(([a, b]) => ({ fr: a, en: b })), adult: !!adult, steps };
  };
}
const M = {
  paper: ['Papier carré (15 cm)', 'Square paper (15 cm)'], paper2: ['Papier à origami ou feuille carrée', 'Origami or square paper'],
  felt: ['Feutres', 'Markers'], scissors: ['Ciseaux', 'Scissors'], glue: ['Colle en bâton', 'Glue stick'], pencil: ['Crayon', 'Pencil'], crayons: ['Crayons de couleur', 'Colouring pencils'],
  sheet: ['Feuille blanche', 'White sheet of paper'], carton: ['Carton', 'Cardboard'], tape: ['Ruban adhésif', 'Tape'], ruler: ['Règle', 'Ruler'],
};

const P = mk('pliage');
const out = [];
const sqD = (c) => G('200,40 330,150 200,260 70,150', c);
const TRI = (c) => G('70,90 330,90 200,250', c);
// head family: diamond -> triangle pointing down -> ears folded down
const headTri = (c, ec) => [
  rm(1, 2, sqD(c), FD(70, 150, 330, 150)), A(1, 330, 50, 385, 110, 340, 142),
  at(2, TRI(c)),
  rm(3, 4, FD(125, 90, 70, 145), FD(275, 90, 330, 145)), A(3, 78, 70, 68, 112, 108, 134),
  at(4, G('125,90 70,145 125,145', ec), G('275,90 330,145 275,145', ec)),
].flat();
const T1 = ['Prends un carré de papier. Plie-le en deux, coin à coin.', 'Take a square of paper. Fold it in half, corner to corner.'];
const T2 = ['Tourne le triangle : la pointe est en bas.', 'Turn the triangle so the point is at the bottom.'];
const T3 = ['Plie chaque coin du haut vers le bas.', 'Fold each top corner down.'];
const T4 = ['Aplatis bien les deux oreilles.', 'Press both ears flat.'];
out.push(P('cochon', '🐷', 'Un cochon en papier', 'A paper pig', 1, 10, 'animaux', null, [M.paper, ['Papier rose', 'Pink paper'], M.felt], false,
  [T1, T2, T3, T4, ['Dessine un groin : un ovale et deux points.', 'Draw a snout: an oval and two dots.'], ['Ajoute les yeux et un sourire. Ton cochon est fini!', 'Add eyes and a smile. Your pig is finished!']],
  [headTri(PI, '#f08fb0'), at(5, E(200, 205, 36, 24, '#f08fb0'), DOT(188, 205, 5), DOT(212, 205, 5)), at(6, EYES(200, 150, 42), SM(200, 232, 12, 8))]));
out.push(P('ours-tete', '🐻', 'Un ours brun', 'A brown bear', 1, 10, 'animaux', null, [M.paper, ['Papier brun', 'Brown paper'], M.felt, M.glue], false,
  [T1, T2, T3, T4, ['Colle un rond beige pour le museau.', 'Glue a beige circle for the muzzle.'], ['Ajoute les yeux, un gros nez et la bouche. Grrr!', 'Add eyes, a big nose and a mouth. Grrr!']],
  [headTri(BR, '#a8703c'), at(5, C(200, 205, 32, TN)), at(6, EYES(200, 150, 42), E(200, 195, 10, 7, '{I}'), PA('M200 203L200 218M184 224Q200 234 216 224'))]));
out.push(P('lapin-tete', '🐰', 'Un lapin aux longues oreilles', 'A long-eared rabbit', 1, 12, 'animaux', null, [M.paper, ['Papier blanc ou gris', 'White or grey paper'], M.felt, M.scissors, M.glue], false,
  [T1, T2, ['Découpe deux longues bandes de papier. Arrondis le bout.', 'Cut two long strips of paper. Round the tip.'], ['Colle les bandes derrière le triangle : ce sont les oreilles.', 'Glue the strips behind the triangle: these are the ears.'], ['Dessine les yeux et un nez rose.', 'Draw the eyes and a pink nose.'], ['Ajoute des moustaches et des dents. Ton lapin est prêt!', 'Add whiskers and teeth. Your rabbit is ready!']],
  [rm(1, 2, sqD(GY), FD(70, 150, 330, 150)), A(1, 330, 50, 385, 110, 340, 142),
   rm(3, 4, E(60, 255, 18, 36, GY, -20), E(340, 255, 18, 36, GY, 20)),
   at(4, E(140, 60, 22, 58, GY, -10), E(260, 60, 22, 58, GY, 10)),
   at(2, TRI(GY)), at(5, ...EYES(200, 150, 40, 6), C(200, 205, 10, PI)), at(6, L(160, 205, 100, 195), L(160, 215, 100, 225), L(240, 205, 300, 195), L(240, 215, 300, 225), R(192, 222, 16, 14, WH, 3))].flat()));

// ---- "fold in half, cut half a shape, open" family ----
// d = right half outline, open path from the top of the fold to the bottom of the fold; mirrored automatically.
const mir = (d, fill) => `<path d="${d}" fill="${fill}" stroke="none"/><path d="${d}" fill="${fill}" stroke="none" transform="translate(400 0) scale(-1 1)"/>`;
const halfOut = (d) => `<path d="${d}" fill="none" {S}/><path d="${d}" fill="none" {S} transform="translate(400 0) scale(-1 1)"/>`;
function symProj(id, emoji, fr, en, ofFr, ofEn, level, minutes, theme, season, mats, d, fill, deco) {
  return P(id, emoji, fr, en, level, minutes, theme, season, mats, false,
    [['Plie une feuille en deux. Aplatis bien le pli.', 'Fold a sheet of paper in half. Press the fold flat.'],
     [`Dessine la moitié ${ofFr} contre le pli, au crayon.`, `Draw half of ${ofEn} against the fold, in pencil.`],
     ['Découpe sur la ligne. Garde le papier plié!', 'Cut along the line. Keep the paper folded!'],
     ['Ouvre le papier : les deux côtés sont pareils!', 'Open the paper: both sides match!'],
     ['Décore avec des feutres. C\'est terminé!', 'Decorate with markers. It\'s finished!']],
    [rm(1, 2, R(50, 40, 300, 220, fill), FD(200, 40, 200, 260)), A(1, 90, 220, 130, 120, 185, 110),
     rm(2, 4, R(200, 40, 150, 220, fill)), at(2, `<path d="${d}" fill="none" {S}/>`),
     rm(3, 4, FD(200, 40, 200, 260)), A(3, 330, 60, 380, 150, 330, 240),
     at(4, mir(d, fill), halfOut(d)), at(5, deco)].flat());
}
const chainStrip = () => [R(30, 90, 340, 120, WH), FD(115, 90, 115, 210), FD(200, 90, 200, 210), FD(285, 90, 285, 210)];
// chain of figures: fig(cx, cy, fill) draws one figure (about 80 wide) whose arms touch the neighbours at cx-43 and cx+43
function chainProj(id, emoji, fr, en, level, minutes, theme, season, mats, fig, figFill, deco) {
  const row = (fill) => [0, 1, 2, 3].map((i) => fig(68 + i * 88, 150, fill));
  return P(id, emoji, fr, en, level, minutes, theme, season, mats, false,
    [['Coupe une bande de papier. Plie-la en accordéon, 4 fois.', 'Cut a strip of paper. Fold it like an accordion, 4 times.'],
     ['Tu as un petit paquet plié. Aplatis-le bien.', 'You have a small folded stack. Press it flat.'],
     ['Dessine la figure : les mains doivent toucher les deux bords!', 'Draw the shape. The hands must touch both edges!'],
     ['Découpe en suivant le dessin. Ne coupe pas les mains!', 'Cut around the drawing. Do not cut the hands!'],
     ['Déplie la chaîne en douceur.', 'Gently unfold the chain.'],
     ['Colorie chaque figure. Ta guirlande est prête!', 'Colour each shape. Your garland is ready!']],
    [rm(1, 2, chainStrip()), A(1, 60, 70, 115, 40, 170, 70),
     rm(2, 4, R(157, 90, 86, 120, WH)), rm(2, 3, `<path d="M178 90V210M200 90V210M222 90V210" stroke="${GY}" stroke-width="2"/>`),
     rm(3, 4, fig(200, 150, 'none')), rm(4, 5, fig(200, 150, WH)), A(4, 330, 70, 370, 150, 335, 225),
     rm(5, 6, row(WH)), at(6, row(figFill), [0, 1, 2, 3].map((i) => deco(68 + i * 88, 150)))].flat());
}
// 6-fold snowflake: arm draws one arm pointing up from (200,150); rotated six times
const flakeArms = (arm, fill) => [0, 60, 120, 180, 240, 300].map((a) => `<g transform="rotate(${a} 200 150)">${arm(fill)}</g>`).join('');
function flakeProj(id, fr, en, level, minutes, arm, fill) {
  const wedge = (c) => `<path d="M200 262L125 125A150 150 0 0 1 275 125Z" fill="${c}" {S}/>`;
  return P(id, '❄️', fr, en, level, minutes, 'decorations', 'hiver', [['Papier blanc ou bleu pâle', 'White or pale blue paper'], M.scissors, ['Une assiette pour tracer un rond', 'A plate to trace a circle']], false,
    [['Trace et découpe un grand rond de papier.', 'Trace and cut out a big paper circle.'],
     ['Plie le rond en deux.', 'Fold the circle in half.'],
     ['Plie encore en trois parts, comme une pointe de tarte.', 'Fold again in three parts, like a slice of pie.'],
     ['Coupe de petits morceaux sur les côtés. Garde la pointe!', 'Snip little pieces from the sides. Keep the tip!'],
     ['Déplie doucement : un flocon unique!', 'Unfold gently: a one-of-a-kind snowflake!']],
    [rm(1, 2, C(200, 150, 105, fill), FD(95, 150, 305, 150)), A(1, 110, 60, 200, 30, 290, 60),
     rm(2, 3, `<path d="M95 150A105 105 0 0 1 305 150Z" fill="${fill}" {S}/>`),
     rm(3, 5, wedge(fill)),
     rm(4, 5, FD(190, 180, 205, 165), FD(190, 220, 215, 200), FD(165, 140, 190, 130), FD(235, 140, 212, 130)),
     at(5, flakeArms(arm, fill), C(200, 150, 7, fill))].flat());
}
const armStar = (c) => `<path d="M200 150V60M200 120l-22-20M200 120l22-20M200 95l-16-16M200 95l16-16" fill="none" {S}/><path d="M200 50l-9 14h18z" fill="${c}" {S}/>`;
const armLace = (c) => `<ellipse cx="200" cy="105" rx="16" ry="42" fill="${c}" {S}/><circle cx="200" cy="58" r="9" fill="${c}" {S}/><path d="M200 150V63" fill="none" {S}/>`;
const armHeart = (c) => `<path d="M200 150V70" fill="none" {S}/><circle cx="188" cy="66" r="13" fill="${c}" {S}/><circle cx="212" cy="66" r="13" fill="${c}" {S}/><path d="M178 74L200 106L222 74" fill="${c}" {S}/>`;
const armSpike = (c) => `<path d="M200 150L186 100L200 45L214 100Z" fill="${c}" {S}/><path d="M200 120l-34 -26M200 120l34 -26" fill="none" {S}/>`;
// figures for chains
const figCat = (cx, cy, c) => `<path d="M${cx - 43} ${cy - 5}H${cx + 43}" fill="none" {S}/><path d="M${cx - 24} ${cy - 48}L${cx - 18} ${cy - 22}L${cx + 18} ${cy - 22}L${cx + 24} ${cy - 48}L${cx + 6} ${cy - 34}H${cx - 6}Z" fill="${c}" {S}/><ellipse cx="${cx}" cy="${cy + 10}" rx="26" ry="38" fill="${c}" {S}/>`;
const figFish = (cx, cy, c) => `<path d="M${cx - 43} ${cy}H${cx + 43}" fill="none" {S}/><path d="M${cx - 30} ${cy}Q${cx} ${cy - 40} ${cx + 22} ${cy}Q${cx} ${cy + 40} ${cx - 30} ${cy}M${cx + 20} ${cy}L${cx + 42} ${cy - 22}V${cy + 22}Z" fill="${c}" {S}/>`;
const figStar = (cx, cy, c) => `<path d="M${cx - 43} ${cy}H${cx + 43}" fill="none" {S}/><polygon points="${cx},${cy - 44} ${cx + 12},${cy - 14} ${cx + 42},${cy - 14} ${cx + 18},${cy + 6} ${cx + 27},${cy + 40} ${cx},${cy + 20} ${cx - 27},${cy + 40} ${cx - 18},${cy + 6} ${cx - 42},${cy - 14} ${cx - 12},${cy - 14}" fill="${c}" {S}/>`;
const figBear = (cx, cy, c) => `<path d="M${cx - 43} ${cy + 5}H${cx + 43}" fill="none" {S}/><circle cx="${cx - 20}" cy="${cy - 38}" r="11" fill="${c}" {S}/><circle cx="${cx + 20}" cy="${cy - 38}" r="11" fill="${c}" {S}/><circle cx="${cx}" cy="${cy - 22}" r="24" fill="${c}" {S}/><ellipse cx="${cx}" cy="${cy + 22}" rx="26" ry="30" fill="${c}" {S}/>`;
const figAngel = (cx, cy, c) => `<path d="M${cx - 43} ${cy + 5}H${cx + 43}" fill="none" {S}/><circle cx="${cx}" cy="${cy - 30}" r="18" fill="${c}" {S}/><path d="M${cx - 14} ${cy - 12}L${cx - 30} ${cy + 45}H${cx + 30}L${cx + 14} ${cy - 12}Z" fill="${c}" {S}/>`;
const figTree = (cx, cy, c) => `<path d="M${cx - 43} ${cy + 15}H${cx + 43}" fill="none" {S}/><polygon points="${cx},${cy - 50} ${cx + 38},${cy + 5} ${cx + 14},${cy + 5} ${cx + 38},${cy + 42} ${cx - 38},${cy + 42} ${cx - 14},${cy + 5} ${cx - 38},${cy + 5}" fill="${c}" {S}/>`;
const eyes2 = (cx, cy) => EYES(cx, cy, 10, 3.5);

const MS = [M.sheet, M.scissors, M.pencil, M.felt];
const mir2 = (fn) => [fn(1), fn(-1)];
const sx = (x) => x;             // (decorations are drawn full-width by hand)
out.push(symProj('fusee-decoupee', '🚀', 'Une fusée découpée', 'A cut-out rocket', 'la fusée', 'the rocket', 1, 8, 'vehicules', null, MS,
  'M200 40C232 72 248 120 248 178L288 238V262L240 244L222 262L200 244', RD,
  [C(200, 120, 22, LB), PA('M152 175H248', 'none'), ...mir2((s) => G(`${200 + s * 14},244 ${200 + s * 24},282 ${200},268`, O)).slice(0, 0), G('185,246 200,285 215,246', Y)]));
out.push(symProj('vase-decoupe', '🏺', 'Un vase symétrique', 'A symmetrical vase', 'le vase', 'the vase', 1, 8, 'objets', null, [M.sheet, M.scissors, M.pencil, M.crayons], 'M200 50H228Q230 82 256 112Q290 152 272 215Q264 256 240 262H200', B,
  [PA('M140 150Q200 170 262 150', 'none'), C(200, 190, 14, PI), C(240, 215, 10, Y), C(160, 215, 10, Y), PA('M200 50V20M200 24l-18-12M200 24l18-12', 'none'), C(182, 10, 8, PI), C(218, 10, 8, PI)]));
out.push(symProj('tshirt-decoupe', '👕', 'Un chandail', 'A T-shirt', 'le chandail', 'the T-shirt', 1, 8, 'objets', null, [M.sheet, M.scissors, M.pencil, M.felt],
  'M200 56Q222 74 246 50L332 84L352 142L298 160V252H200', B,
  [PA('M200 56Q222 74 246 50', 'none'), G('200,130 212,160 244,160 218,178 228,208 200,190 172,208 182,178 156,160 188,160', Y), PA('M104 150L154 138M296 138L296 138', 'none')]));
out.push(symProj('coccinelle-decoupee', '🐞', 'Une coccinelle', 'A ladybug', 'la coccinelle', 'the ladybug', 1, 8, 'animaux', null, [M.sheet, ['Papier rouge', 'Red paper'], M.scissors, M.pencil, M.felt], 'M200 66C296 62 322 170 292 226Q254 262 200 262', RD,
  [E(200, 70, 36, 26, '{I}'), PA('M200 96V262', 'none'), C(150, 150, 16, '{I}'), C(250, 150, 16, '{I}'), C(158, 215, 14, '{I}'), C(242, 215, 14, '{I}'), PA('M180 50L168 22M220 50L232 22', 'none')]));
out.push(symProj('arbre-decoupe', '🌲', 'Un arbre vert', 'A green tree', 'l\'arbre', 'the tree', 1, 8, 'nature', null, [M.sheet, ['Papier vert', 'Green paper'], M.scissors, M.pencil], 'M200 40L255 112H232L276 168H246L292 222H222V262H200', GN,
  [R(188, 222, 24, 40, BR), C(200, 170, 7, RD), C(165, 215, 7, Y), C(235, 215, 7, Y), C(190, 120, 7, Y), C(212, 85, 6, RD)]));
out.push(symProj('cloche-decoupee', '🔔', 'Une cloche', 'A bell', 'la cloche', 'the bell', 2, 10, 'decorations', 'noel', [M.sheet, ['Papier jaune', 'Yellow paper'], M.scissors, M.pencil, M.felt], 'M200 50C212 48 216 56 218 64C222 80 232 88 244 104C268 140 262 175 300 205Q306 222 296 230H200', Y,
  [C(200, 252, 15, BR), PA('M150 205H250', 'none'), RD && PA('M170 64Q200 44 230 64', 'none'), G('200,70 180,52 180,84', RD), G('200,70 220,52 220,84', RD)]));
out.push(symProj('robot-decoupe', '🤖', 'Un robot carré', 'A square robot', 'le robot', 'the robot', 2, 12, 'personnages', null, [M.sheet, ['Papier gris ou argent', 'Grey or silver paper'], M.scissors, M.pencil, M.felt], 'M200 50H248V104H292V212H258V252H200', GY,
  [PA('M200 50V24', 'none'), C(200, 18, 8, RD), ...EYES(200, 78, 22, 8), PA('M180 100H220', 'none'), R(168, 130, 64, 50, LB), C(185, 155, 7, RD), C(215, 155, 7, GN), PA('M200 190V252', 'none')]));
out.push(symProj('chateau-decoupe', '🏰', 'Un château fort', 'A castle', 'le château', 'the castle', 2, 12, 'fantastique', null, [M.sheet, ['Papier gris ou beige', 'Grey or beige paper'], M.scissors, M.pencil, M.felt], 'M200 70H224V48H244V70H264V48H284V70H304V252H200', TN,
  [PA('M164 70H236', 'none'), PA('M200 252V215Q200 190 224 190Q248 190 248 215V252', 'none'), R(255, 110, 24, 34, DB), R(121, 110, 24, 34, DB), PA('M120 252V215Q120 190 145 190Q168 190 168 215V252', 'none').slice(0, 0)]));
out.push(symProj('bonhomme-neige-decoupe', '⛄', 'Un bonhomme de neige', 'A snowman', 'le bonhomme', 'the snowman', 1, 8, 'personnages', 'hiver', [['Papier bleu foncé', 'Dark blue paper'], ['Un bout de papier blanc', 'A piece of white paper'], M.scissors, M.pencil, M.felt], 'M200 50A36 36 0 0 1 200 122A64 64 0 0 1 200 250', WH,
  [G('160,50 240,50 232,22 168,22', INK).replace('{S}', '{S}'), ...EYES(200, 80, 14, 4), G('200,92 200,100 232,96', O), ...[0, 1, 2].map((i) => DOT(200, 150 + i * 28, 6)), PA('M300 140L350 100M350 100l-6 22M350 100l-22 2', 'none').slice(0, 0)]));

out.push(chainProj('guirlande-chats', '🐱', 'Une guirlande de chats', 'A garland of cats', 1, 15, 'decorations', null, [['Bande de papier (10 x 30 cm)', 'Strip of paper (10 x 30 cm)'], M.scissors, M.pencil, M.crayons], figCat, GY,
  (cx, cy) => [...eyes2(cx, cy - 8), C(cx, cy + 2, 3, PI), PA(`M${cx - 6} ${cy + 8}Q${cx} ${cy + 14} ${cx + 6} ${cy + 8}`, 'none')]));
out.push(chainProj('guirlande-poissons', '🐟', 'Une guirlande de poissons', 'A garland of fish', 1, 15, 'decorations', null, [['Bande de papier (10 x 30 cm)', 'Strip of paper (10 x 30 cm)'], M.scissors, M.pencil, M.crayons], figFish, O,
  (cx, cy) => [DOT(cx - 14, cy - 6, 4), PA(`M${cx - 4} ${cy - 18}Q${cx + 4} ${cy} ${cx - 4} ${cy + 18}`, 'none')]));
out.push(chainProj('guirlande-etoiles', '⭐', 'Une guirlande d\'étoiles', 'A garland of stars', 1, 15, 'decorations', null, [['Bande de papier (10 x 30 cm)', 'Strip of paper (10 x 30 cm)'], M.scissors, M.pencil, M.crayons], figStar, Y,
  (cx, cy) => [...eyes2(cx, cy - 2), SM(cx, cy + 10, 7, 6)]));
out.push(chainProj('guirlande-ours', '🧸', 'Une guirlande d\'oursons', 'A garland of teddy bears', 2, 18, 'decorations', null, [['Bande de papier (10 x 30 cm)', 'Strip of paper (10 x 30 cm)'], M.scissors, M.pencil, M.crayons], figBear, BR,
  (cx, cy) => [...eyes2(cx, cy - 24), C(cx, cy - 14, 6, TN), DOT(cx, cy - 15, 3), C(cx, cy + 22, 10, TN)]));
out.push(chainProj('guirlande-anges', '👼', 'Une guirlande d\'anges', 'A garland of angels', 2, 18, 'decorations', 'noel', [['Bande de papier (10 x 30 cm)', 'Strip of paper (10 x 30 cm)'], M.scissors, M.pencil, M.crayons], figAngel, '#fff7d6',
  (cx, cy) => [...eyes2(cx, cy - 32), SM(cx, cy - 22, 5, 4), E(cx, cy - 56, 16, 5, Y)]));

out.push(flakeProj('flocon-etoile', 'Un flocon en étoile', 'A star snowflake', 2, 12, armStar, LB));
out.push(flakeProj('flocon-dentelle', 'Un flocon en dentelle', 'A lace snowflake', 2, 12, armLace, '#e8f4ff'));
out.push(flakeProj('flocon-coeurs', 'Un flocon de coeurs', 'A heart snowflake', 3, 15, armHeart, '#ffd9e6'));
out.push(flakeProj('flocon-pointes', 'Un flocon à pointes', 'A spiky snowflake', 2, 12, armSpike, VI));

// ---- origami with a shared opening: square -> triangle (point up) ----
const TU = (c) => G('60,230 340,230 200,90', c);
const sq = (c) => R(100, 50, 200, 200, c);
const O1 = ['Pose le carré devant toi. Plie-le en deux, coin à coin.', 'Place the square in front of you. Fold it in half, corner to corner.'];
const O2 = ['Tu as un grand triangle. Passe ton doigt sur le pli.', 'You have a big triangle. Run your finger along the fold.'];
const baseTri = (c) => [rm(1, 2, sq(c), FD(100, 50, 300, 250)), A(1, 320, 80, 355, 170, 315, 230), at(2, TU(c))].flat();
out.push(P('grenouille-sauteuse', '🐸', 'La grenouille sauteuse', 'The jumping frog', 2, 15, 'animaux', null, [['Papier vert (rectangle)', 'Green paper (rectangle)'], M.felt], false,
  [['Plie le rectangle en deux, puis ouvre : tu vois une ligne au milieu.', 'Fold the rectangle in half, then open it: you see a line in the middle.'],
   ['Rabats les deux coins du haut vers la ligne : une pointe apparaît.', 'Fold the two top corners to the line: a point appears.'],
   ['Plie les côtés vers le centre, comme des portes.', 'Fold the sides to the centre, like doors.'],
   ['Plie le bas vers le haut, deux fois, pour faire les pattes.', 'Fold the bottom up, twice, to make the legs.'],
   ['Dessine les yeux. Appuie sur le dos et glisse : elle saute!', 'Draw the eyes. Press the back and slide: it jumps!']],
  [rm(1, 2, R(110, 60, 180, 190, GN), FD(200, 60, 200, 250)), rm(2, 3, G('200,70 290,150 290,250 110,250 110,150', GN), FD(200, 70, 200, 250)),
   rm(3, 4, G('200,70 260,140 260,250 140,250 140,140', GN), FD(150, 180, 250, 180)),
   rm(4, 5, G('200,70 260,140 260,215 140,215 140,140', GN), G('140,215 100,250 160,250', GN), G('260,215 300,250 240,250', GN)),
   at(5, G('200,60 262,135 262,205 138,205 138,135', GN), C(165, 110, 14, WH), C(235, 110, 14, WH), DOT(165, 112, 6), DOT(235, 112, 6), E(110, 232, 36, 12, GN, -20), E(290, 232, 36, 12, GN, 20))]));
out.push(P('cygne', '🦢', 'Un cygne élégant', 'An elegant swan', 2, 15, 'animaux', null, [M.paper, M.felt], false,
  [O1, O2, ['Plie les deux côtés vers le milieu : tu fais une forme de cerf-volant.', 'Fold both sides to the middle: you make a kite shape.'],
   ['Plie la pointe du haut vers le bas, puis la pointe du bas vers le haut, en arrière.', 'Fold the top point down, then the bottom point up, behind.'],
   ['Plie la pointe du haut en arrière pour faire la tête.', 'Fold the top tip backward to make the head.'],
   ['Dessine un oeil et un bec orange. Ton cygne glisse sur l\'eau!', 'Draw an eye and an orange beak. Your swan glides on the water!']],
  [baseTri(WH), rm(3, 4, G('200,90 290,230 110,230', WH), FD(200, 90, 130, 230), FD(200, 90, 270, 230)),
   rm(4, 5, G('200,60 250,230 150,230', WH), FD(200, 60, 200, 230)),
   rm(5, 6, G('110,230 250,230 270,190 150,190 140,110 118,100', WH), FD(150, 110, 140, 150)),
   at(6, PA('M120 235Q250 250 290 195Q300 175 255 190Q200 205 175 185Q150 160 160 110Q165 80 140 80Q120 85 135 120Q140 150 150 190L120 235Z', WH), DOT(158, 90, 4), G('130,82 105,92 132,100', O), PA('M60 262Q100 250 140 262T220 262T300 262', 'none'))]));
out.push(P('papillon-origami', '🦋', 'Un papillon origami', 'An origami butterfly', 2, 15, 'animaux', 'printemps', [M.paper, M.felt], false,
  [O1, O2, ['Plie la pointe du haut vers le bas, pour toucher le bas.', 'Fold the top point down to touch the bottom.'],
   ['Plie le tout en deux, vers l\'arrière.', 'Fold the whole thing in half, backward.'],
   ['Ouvre les ailes en les écartant doucement.', 'Open the wings gently.'],
   ['Dessine des motifs sur les ailes. Il peut s\'envoler!', 'Draw patterns on the wings. It can fly away!']],
  [baseTri(VI), rm(3, 4, G('60,230 340,230 200,90', VI), G('200,230 60,230 200,165', B)),
   rm(4, 5, G('90,200 310,200 200,100', VI), FD(200, 100, 200, 200)),
   at(5, G('200,150 90,90 60,200 200,200', VI), G('200,150 310,90 340,200 200,200', VI), E(200, 170, 8, 36, INK)),
   at(6, C(120, 150, 14, Y), C(280, 150, 14, Y), C(110, 185, 8, PI), C(290, 185, 8, PI), PA('M195 140L170 105M205 140L230 105', 'none'))]));
out.push(P('portefeuille', '👛', 'Un portefeuille', 'A wallet', 2, 15, 'objets', null, [['Papier ou carton mince', 'Paper or thin cardboard'], M.tape, M.felt], false,
  [['Plie le papier en deux dans la longueur, puis ouvre.', 'Fold the paper in half lengthwise, then open it.'],
   ['Plie les bords vers la ligne du milieu.', 'Fold the edges to the middle line.'],
   ['Plie le bas vers le haut, en gardant un petit espace.', 'Fold the bottom up, leaving a small gap.'],
   ['Plie le tout en deux, comme un livre.', 'Fold it in half, like a book.'],
   ['Ferme avec un petit morceau de ruban. Décore le dessus!', 'Close with a small piece of tape. Decorate the front!']],
  [rm(1, 2, R(80, 40, 240, 220, TN), FD(200, 40, 200, 260)),
   rm(2, 3, R(140, 40, 120, 220, TN), R(80, 40, 60, 220, '#d8b878'), R(260, 40, 60, 220, '#d8b878')),
   rm(3, 4, R(80, 40, 240, 150, TN), R(80, 150, 240, 100, '#d8b878')), rm(4, 5, R(80, 60, 240, 130, '#d8b878'), FD(200, 60, 200, 190)),
   at(5, R(80, 60, 120, 130, BR, 6), R(200, 60, 120, 130, BR, 6), R(190, 110, 20, 26, Y, 4), C(140, 125, 12, Y))].flat()));
out.push(P('coeur-origami', '💖', 'Un coeur plié', 'A folded heart', 2, 12, 'cartes', 'saint-valentin', [['Papier rose ou rouge (carré)', 'Pink or red paper (square)'], M.felt], false,
  [['Plie le carré en deux en triangle, puis ouvre.', 'Fold the square in half into a triangle, then open it.'],
   ['Plie les deux côtés du bas vers la ligne du milieu.', 'Fold the two lower sides to the middle line.'],
   ['Plie la pointe du bas vers le haut.', 'Fold the bottom tip up.'],
   ['Plie les deux coins du haut vers l\'arrière pour arrondir.', 'Fold the two top corners backward to round them.'],
   ['Retourne : tu as un coeur! Écris un petit mot dessus.', 'Turn it over: you have a heart! Draw a little message on it.']],
  [rm(1, 2, sq(RD), FD(100, 50, 300, 250)), rm(2, 3, G('200,40 300,150 200,260 100,150', RD), FD(200, 40, 200, 260)),
   rm(3, 4, G('200,40 290,130 200,260 110,130', RD), G('200,150 150,110 200,260 250,110', '#ff8fa8')), rm(4, 5, G('110,100 290,100 200,250', RD), FD(200, 250, 200, 100)),
   at(5, PA('M200 250C80 170 90 90 150 90C180 90 200 115 200 130C200 115 220 90 250 90C310 90 320 170 200 250Z', RD), PA('M165 130Q175 105 200 120', 'none'))]));
out.push(P('etoile-gonflee', '⭐', 'Une étoile gonflée', 'A puffy star', 3, 25, 'decorations', null, [['Bande de papier (2 x 30 cm)', 'Paper strip (2 x 30 cm)'], M.scissors], false,
  [['Fais un noeud simple avec la bande, sans trop serrer.', 'Tie a simple knot in the strip, not too tight.'],
   ['Serre doucement pour aplatir le noeud en pentagone.', 'Tighten gently to flatten the knot into a pentagon.'],
   ['Plie le bout qui dépasse et coupe l\'excédent.', 'Fold the leftover end and trim it.'],
   ['Enroule le bout restant autour du pentagone, côté après côté.', 'Wrap the remaining end around the pentagon, side by side.'],
   ['Rentre le bout dans le pentagone.', 'Tuck the end inside the pentagon.'],
   ['Pince chaque côté avec tes ongles : l\'étoile gonfle!', 'Pinch each side with your fingernails: the star puffs up!']],
  [rm(1, 2, R(40, 120, 320, 30, Y)), rm(2, 3, G('200,90 250,128 231,190 169,190 150,128', Y), R(250, 118, 100, 24, Y)),
   rm(3, 4, G('200,90 250,128 231,190 169,190 150,128', Y), R(250, 118, 60, 24, Y)), rm(4, 5, G('200,90 250,128 231,190 169,190 150,128', Y), PA('M150 128L250 128L169 190L200 90L231 190Z', 'none')),
   rm(5, 6, G('200,90 250,128 231,190 169,190 150,128', Y)),
   at(6, G('200,50 225,110 290,115 240,155 258,220 200,185 142,220 160,155 110,115 175,110', Y))]));

// ---- easy ones: cones, strips, bookmarks ----
out.push(P('souris-origami', '🐭', 'Une souris grise', 'A grey mouse', 1, 10, 'animaux', null, [M.paper, ['Papier gris', 'Grey paper'], M.felt, M.scissors, M.glue], false,
  [['Plie le carré en triangle, la pointe en bas.', 'Fold the square into a triangle, point down.'], ['Coupe deux petits ronds de papier.', 'Cut two small paper circles.'], ['Colle un rond sur chaque coin du haut : ce sont les oreilles.', 'Glue a circle on each top corner: these are the ears.'], ['Dessine deux yeux et un nez rose.', 'Draw two eyes and a pink nose.'], ['Ajoute des moustaches et une queue en ficelle. Ta souris est prête!', 'Add whiskers and a string tail. Your mouse is ready!']],
  [rm(1, 5, C(60, 262, 26, PI)).slice(0, 0), at(3, C(85, 85, 32, PI), C(315, 85, 32, PI)).slice(0, 0), rm(2, 3, C(60, 255, 28, GY), C(340, 255, 28, GY)), at(3, C(80, 88, 34, GY), C(320, 88, 34, GY)), at(1, TRI(GY)), at(3, C(80, 88, 18, PI), C(320, 88, 18, PI)).slice(0, 0), at(4, ...EYES(200, 150, 40, 6), C(200, 235, 10, PI)), at(5, L(140, 190, 80, 180), L(140, 205, 80, 215), L(260, 190, 320, 180), L(260, 205, 320, 215), PA('M200 250Q230 280 280 268Q330 255 360 280', 'none'))].flat()));
out.push(P('marque-page-coin', '🔖', 'Un marque-page en coin', 'A corner bookmark', 1, 8, 'objets', null, [['Papier carré', 'Square paper'], M.felt], false,
  [['Plie le carré en deux, coin à coin.', 'Fold the square in half, corner to corner.'], ['Pose le triangle, la pointe vers toi.', 'Lay the triangle with its point towards you.'], ['Plie le coin du haut vers le bas pour faire une poche.', 'Fold the top corner down to make a pocket.'], ['Dessine un visage sur la poche : un petit monstre!', 'Draw a face on the pocket: a little monster!'], ['Glisse le coin d\'une page dans la poche. Bravo!', 'Slip a page corner into the pocket. Well done!']],
  [rm(1, 2, sq(O), FD(100, 50, 300, 250)), at(2, G('60,90 340,90 200,230', O)).slice(0, 0), rm(2, 3, G('60,90 340,90 200,230', O)), rm(3, 5, G('60,90 340,90 200,230', O), G('120,90 280,90 200,170', Y)), at(4, ...EYES(200, 125, 25, 6), PA('M180 148Q200 160 220 148', 'none')), at(5, R(120, 40, 160, 120, WH, 4).slice(0, 0))].flat().concat(at(5, G('60,90 340,90 200,230', O), G('120,90 280,90 200,170', Y), ...EYES(200, 125, 25, 6), PA('M180 148Q200 160 220 148', 'none'))).filter((p) => p[0] !== 4 || true)));
out.push(P('chapeau-fete', '🥳', 'Un chapeau de fête', 'A party hat', 1, 12, 'fetes', null, [['Une feuille ronde ou en demi-cercle', 'A round or half-circle sheet'], M.scissors, M.tape, M.felt], false,
  [['Découpe un grand demi-cercle dans une feuille.', 'Cut a big half circle from a sheet.'], ['Décore-le avec des points et des rayures.', 'Decorate it with dots and stripes.'], ['Enroule-le pour faire un cône.', 'Roll it into a cone.'], ['Tiens le cône avec du ruban adhésif.', 'Hold the cone with tape.'], ['Ajoute un pompon de papier de soie au sommet.', 'Add a tissue-paper pom-pom on top.']],
  [rm(1, 3, `<path d="M60 220A140 140 0 0 1 340 220Z" fill="${B}" {S}/>`), rm(2, 3, C(140, 170, 10, Y), C(200, 130, 10, PI), C(255, 170, 10, Y), C(200, 190, 10, WH)), rm(3, 6, `<path d="M200 40L120 250H280Z" fill="${B}" {S}/>`), rm(3, 4, A(3, 90, 100, 100, 230, 130, 240)).slice(0, 0), rm(4, 6, R(180, 120, 40, 14, TN)), rm(3, 6, C(175, 170, 9, Y), C(225, 190, 9, PI), C(195, 215, 9, WH), C(215, 135, 8, WH)), at(5, C(200, 40, 22, PI))].flat()));
out.push(P('tipi', '⛺', 'Un tipi miniature', 'A mini tipi', 1, 15, 'decorations', null, [['Demi-cercle de papier', 'A half-circle of paper'], M.felt, M.tape, ['Bâtonnets (3 ou 4)', 'Sticks (3 or 4)']], false,
  [['Découpe un demi-cercle de papier.', 'Cut out a half circle of paper.'], ['Dessine des motifs colorés sur le bord.', 'Draw coloured patterns along the edge.'], ['Enroule le papier en cône, en laissant une porte.', 'Roll the paper into a cone, leaving a door.'], ['Tiens-le avec du ruban.', 'Hold it with tape.'], ['Glisse les bâtonnets au sommet. Ton tipi est fini!', 'Slide the sticks in at the top. Your tipi is finished!']],
  [rm(1, 3, `<path d="M60 230A140 140 0 0 1 340 230Z" fill="${TN}" {S}/>`), rm(2, 3, G('100,215 120,195 140,215 160,195 180,215', O), G('220,215 240,195 260,215 280,195 300,215', O)), rm(3, 6, `<path d="M200 50L110 250H290Z" fill="${TN}" {S}/>`), rm(3, 6, G('185,250 200,190 215,250', INK).replace('{S}', '{S}')), rm(2, 3, G('100,215 120,195 140,215', O)).slice(0, 0), at(4, R(190, 160, 20, 10, WH).slice(0, 0)), at(5, L(200, 50, 170, 15), L(200, 50, 230, 15), L(200, 50, 200, 8))].flat()));
out.push(P('lunettes-papier', '🕶️', 'Des lunettes rigolotes', 'Funny glasses', 1, 12, 'jouets', null, [M.carton, M.scissors, ['Papier de soie ou cellophane', 'Tissue paper or cellophane'], M.tape, M.felt], true,
  [['Dessine des lunettes sur du carton mince.', 'Draw glasses on thin cardboard.'], ['Découpe-les. Demande de l\'aide pour les trous!', 'Cut them out. Ask for help with the holes!'], ['Colorie la monture avec des feutres.', 'Colour the frame with markers.'], ['Colle du papier de soie derrière chaque trou.', 'Glue tissue paper behind each hole.'], ['Ajoute deux branches en carton. À toi le style!', 'Add two cardboard arms. Time for style!']],
  [rm(1, 3, R(70, 100, 100, 80, 'none', 30), R(230, 100, 100, 80, 'none', 30), R(170, 125, 60, 14, 'none')), at(3, R(70, 100, 100, 80, 'none', 30), R(230, 100, 100, 80, 'none', 30), R(170, 125, 60, 14, VI, 6)), at(4, R(80, 108, 80, 64, PI, 24), R(240, 108, 80, 64, B, 24)), at(5, L(70, 140, 30, 120), L(330, 140, 370, 120))].flat()));
out.push(P('lanterne-rayee', '🏮', 'Une lanterne rayée', 'A striped lantern', 1, 15, 'decorations', null, [['Feuille de papier de couleur', 'Sheet of coloured paper'], M.scissors, M.ruler, M.glue, M.pencil], false,
  [['Plie la feuille en deux dans la longueur.', 'Fold the sheet in half lengthwise.'], ['Trace des lignes à partir du pli, jusqu\'à 2 cm du bord.', 'Draw lines from the fold up to 2 cm from the edge.'], ['Coupe sur chaque ligne. Ne coupe pas jusqu\'au bout!', 'Cut along each line. Do not cut all the way!'], ['Ouvre la feuille et colle les deux petits côtés ensemble.', 'Open the sheet and glue the two short sides together.'], ['Ajoute une anse de papier. Ta lanterne est prête!', 'Add a paper handle. Your lantern is ready!']],
  [rm(1, 3, R(60, 110, 280, 100, RD), FD(60, 160, 340, 160)), rm(2, 3, ...[0, 1, 2, 3, 4].map((i) => FD(95 + i * 52, 160, 95 + i * 52, 120))).slice(0, 0), rm(3, 4, R(60, 110, 280, 100, RD, 0), ...[0, 1, 2, 3, 4, 5].map((i) => L(90 + i * 44, 160, 90 + i * 44, 122))), rm(4, 5, `<path d="M110 70H290Q330 150 290 230H110Q70 150 110 70Z" fill="${RD}" {S}/>`), at(5, `<path d="M110 70H290Q330 150 290 230H110Q70 150 110 70Z" fill="${RD}" {S}/>`, PA('M150 70Q200 15 250 70', 'none'), ...[0, 1, 2, 3].map((i) => PA(`M${150 + i * 33} 82V218`, 'none')))].flat().concat(at(2, ...[0, 1, 2, 3, 4, 5].map((i) => FD(90 + i * 44, 160, 90 + i * 44, 122))))));
out.push(P('guirlande-fanions', '🚩', 'Une guirlande de fanions', 'Bunting flags', 1, 15, 'decorations', null, [['Papier de couleur', 'Coloured paper'], M.scissors, ['Ficelle', 'String'], M.tape], false,
  [['Découpe un triangle dans du papier de couleur.', 'Cut a triangle from coloured paper.'], ['Utilise-le comme modèle pour en faire plusieurs.', 'Use it as a model to make several.'], ['Décore chaque fanion avec des motifs.', 'Decorate each flag with patterns.'], ['Replie le haut de chaque fanion par-dessus la ficelle.', 'Fold the top of each flag over the string.'], ['Colle-les à égale distance. Accroche ta guirlande!', 'Tape them evenly spaced. Hang up your garland!']],
  [rm(1, 2, G('150,80 250,80 200,200', Y)), rm(2, 3, G('60,90 130,90 95,170', Y), G('155,90 225,90 190,170', B), G('250,90 320,90 285,170', PI)), rm(3, 4, G('60,90 130,90 95,170', Y), G('155,90 225,90 190,170', B), G('250,90 320,90 285,170', PI), C(95, 120, 8, WH), C(190, 120, 8, WH), C(285, 120, 8, WH)), rm(4, 5, PA('M30 70Q200 110 370 70', 'none'), G('60,80 130,86 95,170', Y), G('155,86 225,86 190,170', B), G('250,80 320,74 285,170', PI)),
   at(5, PA('M20 60Q200 110 380 60', 'none'), ...[0, 1, 2, 3, 4].map((i) => G(`${50 + i * 70},${76 + (i % 2 ? 0 : -6) + [0, 14, 24, 14, 0][i]} ${100 + i * 70},${76 + [0, 14, 24, 14, 0][i]} ${75 + i * 70},${140 + [0, 14, 24, 14, 0][i]}`, [Y, B, PI, GN, O][i])))].flat()));
out.push(P('pyramide', '🔺', 'Une pyramide', 'A pyramid', 1, 12, 'objets', null, [['Papier ou carton léger', 'Paper or light cardboard'], M.scissors, M.tape, M.felt], false,
  [['Dessine un carré, puis un triangle sur chacun de ses côtés.', 'Draw a square, then a triangle on each of its sides.'], ['Découpe toute la forme en étoile.', 'Cut out the whole star shape.'], ['Plie sur chaque côté du carré.', 'Fold along each side of the square.'], ['Rapproche les pointes des triangles au-dessus du carré.', 'Bring the triangle tips together above the square.'], ['Tiens avec du ruban. Dessine des briques de pierre!', 'Hold with tape. Draw stone bricks!']],
  [rm(1, 3, R(150, 110, 100, 100, TN), G('150,110 250,110 200,40', TN), G('250,110 250,210 330,160', TN), G('150,210 250,210 200,280', TN), G('150,110 150,210 70,160', TN)),
   rm(3, 4, FD(150, 110, 250, 110), FD(250, 110, 250, 210), FD(250, 210, 150, 210), FD(150, 210, 150, 110)), rm(3, 4, R(150, 110, 100, 100, TN), G('150,110 250,110 200,40', TN), G('250,110 250,210 330,160', TN), G('150,210 250,210 200,280', TN), G('150,110 150,210 70,160', TN)).slice(0, 0),
   rm(4, 5, G('200,60 100,230 300,230', TN), G('200,60 300,230 250,255', '#d8b878')),
   at(5, G('200,60 100,230 300,230', TN), G('200,60 300,230 340,200', '#d8b878'), PA('M130 195H230M160 160H210M200 230V195', 'none'))].flat()));
out.push(P('avion-fleche', '🛩️', 'L\'avion fléché', 'The dart plane', 2, 12, 'vehicules', null, [['Feuille 8,5 x 11 po', 'Letter-size sheet'], M.felt], false,
  [['Plie la feuille en deux dans la longueur, puis ouvre.', 'Fold the sheet in half lengthwise, then open it.'], ['Plie les deux coins du haut vers le milieu.', 'Fold the two top corners to the middle.'], ['Plie encore les côtés vers le milieu.', 'Fold the sides to the middle again.'], ['Plie l\'avion en deux sur la ligne du centre.', 'Fold the plane in half on the centre line.'], ['Plie chaque aile vers le bas. Dessine un hublot et lance!', 'Fold each wing down. Draw a window and throw!']],
  [rm(1, 2, R(110, 30, 180, 240, WH), FD(200, 30, 200, 270)), rm(2, 3, G('200,30 290,110 290,270 110,270 110,110', WH), FD(200, 30, 200, 270)), rm(3, 4, G('200,30 250,100 250,270 150,270 150,100', WH), FD(200, 30, 200, 270)),
   rm(4, 5, G('60,230 340,230 200,70', WH).slice(0, 0)), rm(4, 5, G('200,40 235,270 165,270', WH), G('200,120 290,230 235,230', B)).slice(0, 0), rm(4, 5, G('200,40 230,260 170,260', B)),
   at(5, G('60,170 200,60 340,170 200,220', B), G('200,60 340,170 200,150', '#a8d8f5'), C(200, 140, 6, WH))].flat()));

// ---- more folding: books, boxes, cards, animals ----
const ONLY = (a) => a.flat();
out.push(P('bracelet-papier', '📿', 'Un bracelet en papier', 'A paper bracelet', 1, 10, 'decorations', null, [['Bandes de papier de couleur', 'Strips of coloured paper'], M.glue, M.felt], false,
  [['Découpe une longue bande de papier.', 'Cut a long strip of paper.'], ['Dessine des motifs sur toute la bande.', 'Draw patterns along the strip.'], ['Plie la bande en deux dans sa longueur pour la rendre solide.', 'Fold the strip in half lengthwise to make it strong.'], ['Mesure sur ton poignet et fais un cercle.', 'Measure on your wrist and make a circle.'], ['Colle les deux bouts. Ton bracelet est prêt!', 'Glue the two ends. Your bracelet is ready!']],
  [rm(1, 3, R(40, 120, 320, 50, Y)), rm(2, 3, ...[0, 1, 2, 3, 4, 5, 6].map((i) => C(75 + i * 45, 145, 10, i % 2 ? PI : B))), rm(3, 4, R(40, 135, 320, 25, Y), FD(40, 147, 360, 147)), rm(4, 5, `<ellipse cx="200" cy="150" rx="95" ry="70" fill="none" stroke="${Y}" stroke-width="26"/><ellipse cx="200" cy="150" rx="95" ry="70" fill="none" {S}/>`), at(5, `<ellipse cx="200" cy="150" rx="95" ry="70" fill="none" stroke="${Y}" stroke-width="26"/>`, ...[0, 1, 2, 3, 4, 5].map((i) => C(200 + 95 * Math.cos(i * 1.05), 150 + 70 * Math.sin(i * 1.05), 8, i % 2 ? PI : B)))].flat()));
out.push(P('fleur-decoupee', '🌼', 'Une fleur découpée', 'A cut-out flower', 1, 10, 'nature', 'printemps', [M.sheet, M.scissors, M.pencil, M.glue, M.crayons], false,
  [['Plie un carré de papier en deux, puis encore en deux.', 'Fold a square of paper in half, then in half again.'], ['Dessine un pétale arrondi sur le coin ouvert.', 'Draw a rounded petal on the open corner.'], ['Découpe sur la ligne.', 'Cut along the line.'], ['Ouvre : une fleur à quatre pétales!', 'Open it: a four-petal flower!'], ['Colle un rond jaune au centre et une tige verte.', 'Glue a yellow circle in the middle and a green stem.']],
  [rm(1, 2, R(110, 60, 180, 180, PI), FD(200, 60, 200, 240), FD(110, 150, 290, 150)), rm(2, 4, R(110, 60, 90, 90, PI)), at(2, PA('M110 150Q110 70 150 66Q200 62 200 150', 'none')), rm(3, 4, FD(110, 150, 200, 150)).slice(0, 0),
   rm(4, 5, ...[0, 90, 180, 270].map((a) => `<ellipse cx="200" cy="90" rx="40" ry="55" fill="${PI}" {S} transform="rotate(${a} 200 150)"/>`)), at(5, R(194, 200, 12, 80, DG).slice(0, 0)), at(5, R(194, 205, 12, 80, GN), ...[0, 90, 180, 270].map((a) => `<ellipse cx="200" cy="90" rx="40" ry="55" fill="${PI}" {S} transform="rotate(${a} 200 120)"/>`).slice(0, 0), C(200, 150, 26, Y))].flat()));
out.push(P('livre-accordeon', '📖', 'Un livre accordéon', 'An accordion book', 2, 20, 'objets', null, [['Bande de papier longue', 'Long strip of paper'], M.carton, M.glue, M.felt], false,
  [['Prends une longue bande de papier.', 'Take a long strip of paper.'], ['Plie-la en accordéon : un pli vers toi, un pli vers l\'arrière.', 'Fold it like an accordion: one fold toward you, one away.'], ['Tu as six pages. Aplatis bien les plis.', 'You have six pages. Press the folds flat.'], ['Colle la première et la dernière page sur deux cartons.', 'Glue the first and last pages onto two pieces of cardboard.'], ['Dessine une histoire, une image par page. Bonne lecture!', 'Draw a story, one picture per page. Happy reading!']],
  [rm(1, 2, R(30, 120, 340, 70, WH)), rm(2, 3, R(30, 120, 340, 70, WH), ...[0, 1, 2, 3, 4].map((i) => FD(87 + i * 57, 120, 87 + i * 57, 190))), rm(3, 4, G('80,200 120,110 160,200 200,110 240,200 280,110 320,200', WH).slice(0, 0)), rm(3, 4, ...[0, 1, 2, 3, 4, 5].map((i) => G(`${60 + i * 45},${i % 2 ? 90 : 210} ${100 + i * 45},${i % 2 ? 210 : 90} ${100 + i * 45},${i % 2 ? 90 : 210}`, WH).slice(0, 0))).slice(0, 0),
   rm(3, 5, `<path d="M60 220L100 100L140 220L180 100L220 220L260 100L300 220L340 100" fill="none" {S}/>`), rm(4, 5, R(40, 90, 14, 140, B), R(330, 90, 14, 140, B)).slice(0, 0), at(4, R(50, 95, 50, 130, B), R(300, 95, 50, 130, B)),
   at(5, `<path d="M60 220L100 100L140 220L180 100L220 220L260 100L300 220L340 100" fill="none" {S}/>`, R(50, 95, 50, 130, B), R(300, 95, 50, 130, B), C(140, 165, 12, Y), G('165,200 185,155 205,200', GN), C(260, 165, 12, PI))].flat()));
out.push(P('tangram-lapin', '🧩', 'Un lapin en tangram', 'A tangram rabbit', 2, 20, 'jeux', null, [['Carré de carton (10 cm)', 'Square of cardboard (10 cm)'], M.scissors, M.ruler, M.felt], false,
  [['Trace un carré. Divise-le avec une ligne en diagonale.', 'Draw a square. Divide it with a diagonal line.'], ['Trace les autres lignes : tu auras 7 pièces.', 'Draw the other lines: you will have 7 pieces.'], ['Découpe les 7 pièces. Colorie-les.', 'Cut out the 7 pieces. Colour them.'], ['Place les pièces pour faire le corps du lapin.', 'Place the pieces to make the rabbit\'s body.'], ['Ajoute la tête et les longues oreilles. Un lapin de tangram!', 'Add the head and the long ears. A tangram rabbit!']],
  [rm(1, 2, R(100, 50, 200, 200, WH), L(100, 50, 300, 250)).slice(0, 0), rm(1, 2, R(100, 50, 200, 200, WH), FD(100, 50, 300, 250)), rm(2, 3, R(100, 50, 200, 200, WH), L(100, 50, 300, 250), L(200, 150, 100, 250), L(250, 100, 250, 200).slice(0, 0), FD(200, 150, 300, 50).slice(0, 0), L(200, 150, 300, 50), L(150, 200, 200, 250)),
   rm(3, 4, G('60,60 160,60 110,110', RD), G('240,60 340,60 290,110', B), G('60,200 160,200 110,250', Y), G('200,200 300,200 250,250', GN), R(160, 120, 70, 50, PI), G('250,130 340,130 295,175', VI), G('100,130 140,130 100,170', O)),
   rm(4, 5, G('120,260 280,260 250,160 150,160', B), G('150,160 250,160 200,110', RD), G('280,260 330,230 310,200 280,230', Y)), at(5, G('250,160 310,110 330,150 280,200', GN), G('295,110 285,40 305,40 320,110', VI), G('325,110 335,40 355,40 350,115', O), G('120,260 280,260 250,160 150,160', B), G('150,160 250,160 200,110', RD), C(300, 140, 5, INK))].flat()));
out.push(P('carte-bouche', '🗣️', 'Une carte qui parle', 'A talking card', 2, 20, 'cartes', null, [M.sheet, M.scissors, M.felt, M.glue], false,
  [['Plie une feuille en deux comme un livre.', 'Fold a sheet in half like a book.'], ['Plie le haut du pli vers le bas, en diagonale, des deux côtés.', 'Fold the top of the fold down, diagonally, on both sides.'], ['Ouvre la carte à moitié. Pousse la bouche vers l\'intérieur.', 'Open the card halfway. Push the mouth inward.'], ['Colorie l\'intérieur de la bouche en rouge.', 'Colour the inside of the mouth red.'], ['Dessine des yeux et des cheveux dessus. Elle parle!', 'Draw eyes and hair on top. It talks!']],
  [rm(1, 2, R(70, 60, 260, 180, GN), FD(70, 150, 330, 150)), rm(2, 3, R(70, 60, 260, 90, GN), R(70, 150, 260, 90, '#6fc17f'), FD(170, 150, 120, 105), FD(230, 150, 280, 105)), rm(3, 4, R(70, 60, 260, 90, GN), G('70,150 330,150 280,230 120,230', '#6fc17f'), G('120,150 280,150 200,200', '#444')), rm(4, 5, R(70, 60, 260, 90, GN), G('70,150 330,150 280,230 120,230', '#6fc17f'), G('120,150 280,150 200,200', RD)), at(5, R(70, 60, 260, 90, GN), G('70,150 330,150 280,230 120,230', '#6fc17f'), G('120,150 280,150 200,200', RD), C(140, 100, 20, WH), C(260, 100, 20, WH), DOT(140, 102, 8), DOT(260, 102, 8), PA('M110 62Q140 30 170 62M230 62Q260 30 290 62', 'none'))].flat()));
out.push(P('boite-cadeau', '🎁', 'Une boîte cadeau', 'A gift box', 2, 20, 'objets', null, [['Papier carré (20 cm)', 'Square paper (20 cm)'], M.tape, M.felt], false,
  [['Plie les quatre coins vers le centre.', 'Fold the four corners to the centre.'], ['Rouvre. Plie les deux côtés vers le centre.', 'Open. Fold two sides to the centre.'], ['Plie les deux côtés qui restent vers le centre.', 'Fold the two remaining sides to the centre.'], ['Dresse les parois et plie les coins vers l\'intérieur.', 'Stand up the walls and fold the corners inside.'], ['Ferme la boîte avec un couvercle fait pareil, un peu plus grand. Ajoute un ruban!', 'Close the box with a lid made the same way, a bit bigger. Add a ribbon!']],
  [rm(1, 2, sq(B), FD(100, 50, 300, 250).slice(0, 0), FD(200, 50, 100, 150), FD(200, 50, 300, 150), FD(100, 150, 200, 250), FD(300, 150, 200, 250)), rm(2, 3, sq(B), FD(150, 50, 150, 250), FD(250, 50, 250, 250)), rm(3, 4, sq(B), FD(100, 100, 300, 100), FD(100, 200, 300, 200)), rm(4, 5, G('110,110 290,110 320,190 80,190', B), R(80, 190, 240, 60, '#5aa8d8')), at(5, R(90, 150, 220, 100, '#5aa8d8'), G('80,150 320,150 300,100 100,100', B), R(180, 100, 40, 150, RD).slice(0, 0), R(188, 100, 24, 150, Y), PA('M200 100Q150 50 170 80Q190 60 200 100Q210 60 230 80Q250 50 200 100', Y))].flat()));
out.push(P('tortue-origami', '🐢', 'Une tortue origami', 'An origami turtle', 2, 15, 'animaux', null, [M.paper, ['Papier vert', 'Green paper'], M.felt], false,
  [['Plie le carré en deux, coin à coin, puis ouvre.', 'Fold the square corner to corner, then open it.'], ['Plie deux coins vers le centre.', 'Fold two corners to the centre.'], ['Plie les deux autres coins vers le centre : un hexagone.', 'Fold the other two corners to the centre: a hexagon.'], ['Plie un petit bout de chaque pointe vers le haut : pattes et tête.', 'Fold up a small piece of each point: legs and head.'], ['Dessine des carreaux sur le carapace et un oeil. Doucement, la tortue!', 'Draw squares on the shell and an eye. Slowly, turtle!']],
  [rm(1, 2, sq(GN), FD(100, 50, 300, 250)), rm(2, 3, G('200,40 300,150 200,260 100,150', GN), FD(150, 95, 250, 95), FD(150, 205, 250, 205)), rm(3, 4, G('130,110 270,110 300,150 270,190 130,190 100,150', GN)), rm(4, 5, G('130,110 270,110 300,150 270,190 130,190 100,150', GN), G('300,150 340,140 340,160', GN), G('140,110 120,80 160,100', GN), G('260,110 280,80 240,100', GN), G('140,190 120,220 160,200', GN), G('260,190 280,220 240,200', GN)),
   at(5, G('130,110 270,110 300,150 270,190 130,190 100,150', GN), E(200, 150, 70, 38, DG).slice(0, 0), PA('M165 150H235M200 112V188', 'none'), G('300,150 345,135 345,165', GN), DOT(332, 145, 4), G('140,110 118,78 165,100', GN), G('260,110 282,78 235,100', GN), G('140,190 118,222 165,200', GN), G('260,190 282,222 235,200', GN), E(200, 150, 62, 34, 'none'))].flat()));
out.push(P('chauve-souris-origami', '🦇', 'Une chauve-souris', 'A bat', 2, 15, 'animaux', 'halloween', [['Papier noir carré', 'Black square paper'], M.scissors, ['Papier blanc (petits yeux)', 'White paper (small eyes)'], M.glue], false,
  [O1, ['Plie le triangle en deux : une pointe au milieu en bas.', 'Fold the triangle in half: a point in the middle, bottom.'], ['Ouvre : plie les deux coins du bas vers le haut pour faire des ailes.', 'Open it: fold the two bottom corners up to make wings.'], ['Découpe le bord des ailes en arcs, comme des pointes.', 'Cut the wing edges into scallops, like points.'], ['Ajoute deux petites oreilles et deux yeux blancs. Houuu!', 'Add two small ears and two white eyes. Wooo!']],
  [baseTri(INK).slice(0, 0), rm(1, 2, sq('#555d77'), FD(100, 50, 300, 250)), rm(2, 3, TU('#555d77'), FD(200, 90, 200, 230)), rm(3, 4, G('200,100 60,190 120,250 200,200 280,250 340,190', '#555d77'), FD(200, 100, 200, 200)), rm(4, 6, G('200,100 40,160 90,190 120,175 150,215 180,190 200,215 220,190 250,215 280,175 310,190 360,160', '#555d77')),
   at(5, G('180,115 190,70 205,110', '#555d77'), G('200,110 215,70 225,115', '#555d77'), C(188, 140, 9, WH), C(214, 140, 9, WH), DOT(190, 142, 4), DOT(212, 142, 4))].flat()));
out.push(P('panier-carre', '🧺', 'Un panier carré', 'A square basket', 2, 20, 'objets', 'paques', [['Papier carré (20 cm)', 'Square paper (20 cm)'], M.scissors, M.glue, ['Bande de papier pour l\'anse', 'Paper strip for the handle']], false,
  [['Plie les quatre coins vers le centre.', 'Fold the four corners to the centre.'], ['Plie encore les coins vers le centre : un petit carré.', 'Fold the corners to the centre again: a small square.'], ['Déplie les coins et garde les plis. Relève deux côtés.', 'Unfold the corners and keep the creases. Lift up two sides.'], ['Rabats les coins par-dessus pour fermer les murs du panier.', 'Fold the corners over to close the basket walls.'], ['Colle une anse en bande de papier. Mets des oeufs dedans!', 'Glue a paper-strip handle. Put eggs inside!']],
  [rm(1, 2, sq(Y), FD(200, 50, 100, 150), FD(300, 150, 200, 50).slice(0, 0), FD(200, 50, 300, 150), FD(100, 150, 200, 250), FD(300, 150, 200, 250)), rm(2, 3, G('200,50 300,150 200,250 100,150', Y), FD(150, 100, 250, 100), FD(150, 200, 250, 200)), rm(3, 4, R(120, 100, 160, 100, Y)), rm(4, 5, R(100, 110, 200, 110, Y), R(100, 110, 200, 30, '#e8b84a')), at(5, PA('M110 120Q200 -10 290 120', 'none'), R(100, 120, 200, 100, Y), R(100, 120, 200, 28, '#e8b84a'), E(150, 112, 18, 24, PI), E(200, 108, 18, 26, B), E(250, 112, 18, 24, VI))].flat()));
out.push(P('voilier-quille', '⛵', 'Un voilier avec voile', 'A sailboat with a sail', 2, 15, 'vehicules', 'ete', [M.paper, ['Papier de couleur', 'Coloured paper'], M.felt], false,
  [O1, ['Plie la pointe du haut vers le bas, des deux côtés.', 'Fold the top point down, on both sides.'], ['Ouvre le papier au centre pour faire une coque.', 'Open the paper in the middle to make a hull.'], ['Tire la voile vers le haut, avec les deux pointes.', 'Pull the sail up, with its two points.'], ['Dessine des vagues. Fais voguer ton voilier!', 'Draw waves. Set your sailboat afloat!']],
  [baseTri(B), rm(3, 4, G('60,230 340,230 300,170 100,170', B), G('100,170 300,170 200,90', '#b6e0ff').slice(0, 0)), rm(4, 5, G('60,230 340,230 300,170 100,170', B), G('150,170 250,170 200,80', WH)), at(5, G('60,230 340,230 300,170 100,170', B), G('200,170 200,50 260,170', WH), G('195,170 195,70 145,170', Y), L(200, 170, 200, 50), PA('M40 255Q80 235 120 255T200 255T280 255T360 255', 'none'))].flat()));

// ---- difficult ----
out.push(P('boite-masu', '📦', 'La boîte masu', 'The masu box', 3, 30, 'objets', null, [['Papier carré (15 cm)', 'Square paper (15 cm)'], M.felt], false,
  [['Plie le carré en deux dans les deux sens, puis ouvre.', 'Fold the square in half both ways, then open it.'], ['Plie les quatre coins vers le centre.', 'Fold the four corners to the centre.'], ['Plie les bords vers le centre : tu as un carré plus petit.', 'Fold the edges to the centre: you get a smaller square.'], ['Rouvre. Plie deux côtés opposés vers le milieu.', 'Open. Fold two opposite sides to the middle.'], ['Rabats les coins vers le centre, de chaque côté.', 'Fold the corners to the centre, on each side.'], ['Relève les parois et rabats les languettes.', 'Raise the walls and fold the tabs over.'], ['Plie la boîte entière et colorie-la. Fais le couvercle un peu plus grand!', 'Your box is done. Colour it. Make the lid a little bigger!']],
  [rm(1, 2, sq(O), FD(200, 50, 200, 250), FD(100, 150, 300, 150)), rm(2, 3, sq(O), FD(150, 100, 250, 100).slice(0, 0), FD(200, 50, 100, 150), FD(200, 50, 300, 150), FD(100, 150, 200, 250), FD(300, 150, 200, 250)), rm(3, 4, G('200,50 300,150 200,250 100,150', O), FD(150, 100, 250, 200).slice(0, 0), FD(150, 100, 250, 100), FD(150, 200, 250, 200)), rm(4, 5, R(130, 80, 140, 140, O), FD(165, 80, 165, 220), FD(235, 80, 235, 220)), rm(5, 6, R(130, 80, 140, 140, O), G('130,80 165,80 165,115', '#e28a3a'), G('270,80 235,80 235,115', '#e28a3a'), G('130,220 165,220 165,185', '#e28a3a'), G('270,220 235,220 235,185', '#e28a3a')), rm(6, 7, G('130,100 270,100 290,160 110,160', O), R(110, 160, 180, 80, '#e28a3a')), at(7, R(100, 150, 200, 90, '#e28a3a'), G('90,150 310,150 290,95 110,95', O), C(200, 125, 10, Y), L(100, 150, 100, 240).slice(0, 0))].flat()));
out.push(P('carte-gateau', '🎂', 'Une carte gâteau pop-up', 'A pop-up cake card', 3, 30, 'cartes', null, [['Deux feuilles de carton léger', 'Two sheets of light cardboard'], M.scissors, M.glue, M.felt], false,
  [['Plie la première feuille en deux : c\'est la carte.', 'Fold the first sheet in half: this is the card.'], ['Fais deux fentes parallèles au pli, de 4 cm.', 'Make two cuts parallel to the fold, 4 cm each.'], ['Plie la languette entre les fentes vers l\'avant.', 'Fold the tab between the cuts forward.'], ['Ferme la carte : la languette pousse vers l\'intérieur.', 'Close the card: the tab pops inward.'], ['Découpe un gâteau dans l\'autre feuille et colle-le sur la languette.', 'Cut a cake from the other sheet and glue it on the tab.'], ['Ajoute des bougies, du glaçage et un message. Bonne fête!', 'Add candles, icing and a message. Happy birthday!']],
  [rm(1, 2, R(60, 70, 280, 160, B), FD(200, 70, 200, 230)), rm(2, 3, R(60, 70, 280, 160, B), FD(200, 70, 200, 230), L(200, 120, 250, 120), L(200, 170, 250, 170)), rm(3, 4, R(60, 70, 280, 160, B), R(200, 120, 50, 50, '#e8f4ff')), rm(4, 6, G('60,230 200,230 200,90 60,90', B), G('200,230 340,230 340,90 200,90', '#8fc9f0'), R(180, 150, 50, 60, '#e8f4ff')), rm(5, 6, R(165, 130, 70, 60, PI, 6)), at(6, G('60,230 200,230 200,90 60,90', B), G('200,230 340,230 340,90 200,90', '#8fc9f0'), R(160, 130, 80, 60, PI, 6), PA('M160 140Q180 160 200 140T240 140', Y), L(180, 130, 180, 105), L(200, 130, 200, 105), L(220, 130, 220, 105), C(180, 100, 5, Y), C(200, 100, 5, Y), C(220, 100, 5, Y))].flat()));
out.push(P('lanterne-3d', '🏮', 'Une lanterne en spirale', 'A spiral lantern', 3, 30, 'decorations', 'hiver', [['Deux feuilles de papier de couleur', 'Two sheets of coloured paper'], M.scissors, M.glue, M.ruler], false,
  [['Plie une feuille en deux dans la longueur.', 'Fold a sheet in half lengthwise.'], ['Trace des traits à 2 cm d\'intervalle depuis le pli, sans toucher le bord.', 'Draw lines 2 cm apart from the fold, without reaching the edge.'], ['Coupe sur tous les traits. Garde un bord de 2 cm!', 'Cut along all the lines. Keep a 2 cm edge!'], ['Déplie et roule la feuille en cylindre.', 'Unfold and roll the sheet into a cylinder.'], ['Colle les bords ensemble. Étire doucement.', 'Glue the edges together. Stretch gently.'], ['Ajoute une anse de papier. Mets une petite lumière à DEL!', 'Add a paper handle. Put in a small LED light!']],
  [rm(1, 3, R(50, 100, 300, 120, Y), FD(50, 160, 350, 160)), rm(2, 3, ...[0, 1, 2, 3, 4, 5, 6].map((i) => FD(80 + i * 40, 160, 80 + i * 40, 120)).slice(0, 0)), rm(3, 4, R(50, 100, 300, 120, Y), ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => L(75 + i * 36, 160, 75 + i * 36, 108))), rm(4, 5, E(200, 70, 80, 20, Y), R(120, 70, 160, 150, Y), E(200, 220, 80, 20, Y)), rm(5, 7, E(200, 60, 85, 20, 'none'), `<path d="M115 60V210Q200 250 285 210V60" fill="${Y}" {S}/>`), at(6, `<path d="M130 70Q200 -10 270 70" fill="none" {S}/>`, ...[0, 1, 2, 3, 4].map((i) => PA(`M${150 + i * 25} 75V215`, 'none')), E(200, 138, 20, 28, '#fff7a0').slice(0, 0))].flat()));
out.push(P('lotus-origami', '🪷', 'Une fleur de lotus', 'A lotus flower', 3, 30, 'nature', 'ete', [['Papier carré (15 cm)', 'Square paper (15 cm)'], M.felt], false,
  [['Plie les quatre coins vers le centre.', 'Fold the four corners to the centre.'], ['Plie encore les quatre coins vers le centre.', 'Fold the four corners to the centre again.'], ['Une dernière fois : les coins vers le centre.', 'One last time: the corners to the centre.'], ['Retourne le papier. Plie les coins vers le centre encore.', 'Flip the paper. Fold the corners to the centre once more.'], ['Retourne. Ouvre un pétale à la fois, sous les pointes.', 'Flip. Open one petal at a time, under the points.'], ['Ouvre une deuxième rangée de pétales. Ton lotus fleurit!', 'Open a second row of petals. Your lotus blooms!']],
  [rm(1, 2, sq(PI), FD(200, 50, 100, 150), FD(200, 50, 300, 150), FD(100, 150, 200, 250), FD(300, 150, 200, 250)), rm(2, 3, G('200,50 300,150 200,250 100,150', PI), FD(150, 100, 250, 100), FD(150, 200, 250, 200)), rm(3, 4, R(130, 80, 140, 140, PI), FD(130, 80, 270, 220)), rm(4, 5, R(150, 100, 100, 100, '#ff8fb0')), rm(5, 6, ...[0, 90, 180, 270].map((a) => `<ellipse cx="200" cy="110" rx="26" ry="50" fill="#ff8fb0" {S} transform="rotate(${a} 200 150)"/>`)),
   at(6, ...[45, 135, 225, 315].map((a) => `<ellipse cx="200" cy="100" rx="30" ry="62" fill="${PI}" {S} transform="rotate(${a} 200 150)"/>`), ...[0, 90, 180, 270].map((a) => `<ellipse cx="200" cy="110" rx="26" ry="50" fill="#ff8fb0" {S} transform="rotate(${a} 200 150)"/>`), C(200, 150, 14, Y))].flat()));
out.push(P('renard-assis', '🦊', 'Un renard assis', 'A sitting fox', 3, 25, 'animaux', 'automne', [['Papier orange et blanc (carrés)', 'Orange and white paper (squares)'], M.felt, M.glue], false,
  [['Pour la tête : plie un carré orange en triangle, pointe en bas.', 'For the head: fold an orange square into a triangle, point down.'], ['Plie les deux coins du haut vers le haut pour faire les oreilles.', 'Fold the two top corners up to make the ears.'], ['Plie un petit triangle blanc pour le museau et colle-le.', 'Fold a small white triangle for the muzzle and glue it.'], ['Pour le corps : plie un autre carré en triangle haut.', 'For the body: fold another square into a tall triangle.'], ['Colle la tête sur le corps.', 'Glue the head onto the body.'], ['Ajoute une queue touffue et dessine le visage. Quel beau renard!', 'Add a bushy tail and draw the face. What a handsome fox!']],
  [rm(1, 3, TRI(O)), rm(2, 3, G('70,90 120,30 150,90', '#e07a2a'), G('330,90 280,30 250,90', '#e07a2a')), rm(3, 6, G('70,90 120,30 150,90', '#e07a2a'), G('330,90 280,30 250,90', '#e07a2a'), TRI(O), G('140,150 260,150 200,250', WH)), rm(4, 5, G('100,260 300,260 200,60', O)), at(5, G('100,270 300,270 200,130', O), G('70,40 120,-10 150,40', O).slice(0, 0), G('105,135 125,95 145,135', '#e07a2a').slice(0, 0)),
   at(5, G('70,50 330,50 200,150', O), G('70,50 120,0 150,50', '#e07a2a'), G('330,50 280,0 250,50', '#e07a2a'), G('150,85 250,85 200,150', WH)), at(6, E(330, 240, 30, 16, O, -40), G('318,222 335,205 345,228', WH), ...EYES(200, 70, 40, 5), C(200, 148, 7, INK).slice(0, 0), DOT(200, 142, 6), G('165,200 235,200 200,270', WH))].flat()));
out.push(P('chat-assis', '🐈', 'Un chat assis', 'A sitting cat', 3, 25, 'animaux', null, [['Papier gris ou noir (carrés)', 'Grey or black paper (squares)'], M.felt, M.glue], false,
  [['Pour la tête : plie un carré en triangle et rabats les oreilles.', 'For the head: fold a square into a triangle and fold down the ears.'], ['Dessine les yeux, le nez et les moustaches.', 'Draw the eyes, nose and whiskers.'], ['Pour le corps : plie un grand carré en triangle.', 'For the body: fold a big square into a triangle.'], ['Plie les deux coins du bas vers le haut pour faire les pattes.', 'Fold the two bottom corners up to make the paws.'], ['Colle la tête sur la pointe du corps.', 'Glue the head onto the body\'s tip.'], ['Ajoute une longue queue enroulée. Miaou!', 'Add a long curly tail. Meow!']],
  [rm(1, 3, G('120,120 280,120 200,230', GY), G('120,120 160,70 190,120', '#a0a6b8'), G('280,120 240,70 210,120', '#a0a6b8')), rm(3, 5, G('90,270 310,270 200,60', GY)), rm(4, 5, G('90,270 130,230 170,270', '#a0a6b8'), G('310,270 270,230 230,270', '#a0a6b8')), rm(2, 5, ...EYES(200, 150, 30, 5), C(200, 175, 6, PI)), at(5, G('90,275 310,275 200,130', GY), G('90,275 130,240 170,275', '#a0a6b8'), G('310,275 270,240 230,275', '#a0a6b8'), G('120,40 280,40 200,150', GY), G('120,40 160,-5 190,40', '#a0a6b8'), G('280,40 240,-5 210,40', '#a0a6b8'), ...EYES(200, 75, 30, 5), C(200, 98, 6, PI)), at(6, PA('M310 270Q380 260 370 190Q365 160 340 175', 'none'), L(170, 100, 130, 92), L(170, 108, 130, 114), L(230, 100, 270, 92), L(230, 108, 270, 114))].flat()));
out.push(P('dragon-accordeon', '🐲', 'Un dragon en accordéon', 'An accordion dragon', 3, 30, 'fantastique', 'ete', [['Deux bandes de papier de la même couleur', 'Two strips of paper of the same colour'], ['Une tête de dragon en carton', 'A cardboard dragon head'], M.glue, M.felt], false,
  [['Colle deux bandes de papier en angle droit.', 'Glue two strips of paper at a right angle.'], ['Plie la bande du bas par-dessus l\'autre.', 'Fold the bottom strip over the other.'], ['Continue : une bande par-dessus l\'autre, à tour de rôle.', 'Keep going: one strip over the other, taking turns.'], ['Arrête quand la bande est courte. Colle le bout.', 'Stop when the strip is short. Glue the end.'], ['Dessine une tête avec des cornes, des yeux, une langue.', 'Draw a head with horns, eyes and a tongue.'], ['Colle la tête au corps et une queue pointue. Rooaar!', 'Glue the head onto the body and a pointy tail. Rooar!']],
  [rm(1, 2, R(110, 80, 150, 24, GN), R(236, 80, 24, 150, DG)), rm(2, 3, R(110, 80, 130, 24, GN), R(236, 104, 24, 126, DG)), rm(3, 4, ...[0, 1, 2, 3, 4, 5].map((i) => R(110 + i * 30, 100 + (i % 2) * 30, 50, 22, i % 2 ? DG : GN))), rm(4, 5, ...[0, 1, 2, 3, 4, 5].map((i) => R(110 + i * 30, 100 + (i % 2) * 30, 50, 22, i % 2 ? DG : GN)).slice(0, 0), ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => R(60 + i * 36, 140 + (i % 2) * 14, 44, 20, i % 2 ? DG : GN))), rm(5, 6, ...[0, 1, 2, 3, 4, 5, 6, 7].map((i) => R(110 + i * 28, 140 + (i % 2) * 14, 40, 20, i % 2 ? DG : GN)).slice(0, 0)), at(5, G('40,120 100,110 100,200 40,190', GN), G('55,120 65,85 80,115', RD), DOT(70, 150, 6)).slice(0, 0),
   at(5, G('300,60 360,70 380,120 340,140 300,120', GN), G('310,60 320,30 336,65', RD), DOT(340, 90, 6), PA('M345 140Q360 160 350 175', RD)), at(6, ...[0, 1, 2, 3, 4, 5].map((i) => R(60 + i * 38, 150 + (i % 2) * 14, 44, 20, i % 2 ? DG : GN)), G('50,160 20,185 50,190', DG))].flat()));
out.push(P('etoile-huit', '✴️', 'Une étoile à huit branches', 'An eight-point star', 3, 25, 'decorations', 'noel', [['Deux carrés de papier', 'Two squares of paper'], M.glue, M.scissors], false,
  [['Plie un carré en deux dans les deux sens, puis en diagonale.', 'Fold a square in half both ways, then diagonally.'], ['Plie les côtés vers la diagonale pour faire une pointe.', 'Fold the sides to the diagonal to make a point.'], ['Fais quatre pointes de la même façon avec l\'autre carré.', 'Make four points the same way with the other square.'], ['Superpose les deux étoiles à quatre pointes, en tournant l\'une.', 'Stack the two four-point stars, turning one.'], ['Colle-les ensemble : une étoile à huit branches!', 'Glue them together: an eight-point star!']],
  [rm(1, 2, sq(Y), FD(100, 50, 300, 250), FD(300, 50, 100, 250)), rm(2, 3, G('200,50 250,150 200,250 150,150', Y), FD(200, 50, 200, 250)), rm(3, 4, G('200,50 250,150 300,200 200,250 100,200 150,150', Y).slice(0, 0), G('200,30 240,160 370,150 250,200 280,270 200,230 120,270 150,200 30,150 160,160', Y)), rm(4, 5, G('200,30 230,170 330,100 240,200 330,250 220,230 200,280 180,230 70,250 160,200 70,100 170,170', O), G('200,60 215,140 300,110 225,175 270,240 200,205 130,240 175,175 100,110 185,140', Y)),
   at(5, G('200,25 225,125 325,75 255,150 335,230 232,195 200,275 168,195 65,230 145,150 75,75 175,125', O), G('200,70 215,140 280,110 230,170 265,225 200,200 135,225 170,170 120,110 185,140', Y), C(200, 150, 10, WH))].flat()));
out.push(P('ballon-origami', '🎈', 'Un ballon qu\'on gonfle', 'An inflatable balloon', 3, 30, 'jouets', null, [['Papier carré (20 cm)', 'Square paper (20 cm)'], M.felt], false,
  [['Plie le carré en deux dans les deux sens, puis en diagonale.', 'Fold the square in half both ways, then diagonally.'], ['Ramène les coins ensemble : un petit carré double.', 'Bring the corners together: a small double square.'], ['Plie les coins du haut vers le centre, devant et derrière.', 'Fold the top corners to the centre, front and back.'], ['Plie les deux pointes du bas vers le centre.', 'Fold the two bottom points to the centre.'], ['Rentre les petites pointes dans les poches.', 'Tuck the small points into the pockets.'], ['Souffle dans le petit trou en bas : le ballon gonfle!', 'Blow in the small hole at the bottom: the balloon puffs up!']],
  [rm(1, 2, sq(RD), FD(100, 50, 300, 250), FD(200, 50, 200, 250), FD(100, 150, 300, 150)), rm(2, 3, R(130, 80, 140, 140, RD), FD(130, 80, 270, 220)), rm(3, 4, G('130,80 270,80 270,220 130,220', RD), G('130,80 200,150 270,80', '#e05555')), rm(4, 5, G('130,80 270,80 270,220 130,220', RD), G('130,80 200,150 270,80', '#e05555'), G('130,220 200,150 270,220', '#e05555')), rm(5, 6, R(130, 80, 140, 140, RD), PA('M130 80L200 150L270 80M130 220L200 150L270 220', 'none')),
   at(6, E(200, 130, 85, 100, RD), E(170, 95, 14, 22, '#ff9a9a', -25), G('190,228 210,228 200,242', RD), PA('M200 242Q185 265 205 285', 'none'))].flat()));

export const projects = out;
