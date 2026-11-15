// Arts plastiques — catégorie « dessin » : tutoriels « comment dessiner » étape par étape.
// Chaque dessin est écrit UNE fois (liste d'étapes = groupes de formes) ; les images cumulatives
// (traits foncés déjà tracés + traits roses nouveaux) et le dessin colorié final sont générés.
// Attributs spéciaux dans les éléments : f="couleur" (remplissage au coloriage), z="n" (ordre d'empilement au coloriage).
const D = '#3a3f55', K = '#ff5d8f';
const Y = '#ffd34e', O = '#ff9f43', Rd = '#ff6b6b', Bl = '#6ec1ff', Gr = '#6fd08c', Pk = '#ff9ec4', Pu = '#b38cff';
const Br = '#b97a4b', Tn = '#e8b878', Wh = '#ffffff', Gy = '#d5dbea', Cr = '#fff1d6', Lb = '#cdeeff', Dk = '#3a3f55';
const F = (col, z) => `f="${col}"${z ? ` z="${z}"` : ''}`;
const c = (x, y, r, a = '') => `<circle cx="${x}" cy="${y}" r="${r}" ${a}/>`;
const e = (x, y, rx, ry, a = '') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" ${a}/>`;
const r = (x, y, w, h, rd, a = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rd}" ${a}/>`;
const l = (x1, y1, x2, y2, a = '') => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${a}/>`;
const p = (d, a = '') => `<path d="${d}" ${a}/>`;
const pg = (pts, a = '') => `<polygon points="${pts}" ${a}/>`;
const mir = (pts) => pts.trim().split(/\s+/).map((q) => { const [x, y] = q.split(','); return `${400 - x},${y}`; }).join(' ');
const pgm = (pts, a = '') => pg(mir(pts), a);
const edgeY = (cx, cy, rx, ry, x) => cy - ry * Math.sqrt(Math.max(0, 1 - ((x - cx) / rx) ** 2));
const pt = (cx, cy, R, deg) => `${(cx + R * Math.cos(deg * Math.PI / 180)).toFixed(0)},${(cy + R * Math.sin(deg * Math.PI / 180)).toFixed(0)}`;
const eyes = (a, b, y, rr = 7) => [c(a, y, rr, F(D)), c(b, y, rr, F(D))];

const strip = (s) => s.replace(/ (?:f|z)="[^"]*"/g, '');
const info = (s) => ({ s: strip(s), f: (s.match(/ f="([^"]*)"/) || [])[1] || 'none', z: +((s.match(/ z="(-?\d+)"/) || [])[1] || 0) });
const wrap = (inner) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const grp = (els, col, w) => (els.length ? `<g fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${els.join('')}</g>` : '');
const S = (fr, en, ...els) => ({ fr, en, els: els.flat() });

const MAT = [
  { fr: 'Feuille blanche', en: 'White paper' },
  { fr: 'Crayon à mine', en: 'Pencil' },
  { fr: 'Gomme à effacer', en: 'Eraser' },
  { fr: 'Crayons de couleur ou feutres', en: 'Colored pencils or markers' },
];

function A(id, emoji, fr, en, level, minutes, theme, steps, cfr, cen, extras = [], season = null) {
  const out = steps.map((st, i) => {
    const done = steps.slice(0, i).flatMap((s) => s.els).map(strip);
    return {
      svg: wrap(grp(done, D, 6) + grp(st.els.map(strip), K, 8)),
      text: { fr: st.fr, en: st.en },
    };
  });
  const all = steps.flatMap((s) => s.els).concat(extras).map(info).map((o, i) => ({ ...o, i }));
  all.sort((a, b) => a.z - b.z || a.i - b.i);
  const body = all.map((o) => o.s.replace(/\s*\/>$/, ` fill="${o.f}"/>`)).join('');
  out.push({
    svg: wrap(`<g stroke="${D}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${body}</g>`),
    text: { fr: cfr, en: cen },
  });
  return { id: `dessin-${id}`, cat: 'dessin', emoji, title: { fr, en }, level, minutes, theme, season, materials: MAT, adult: false, steps: out };
}

const L = [];

// ───────────────────────── FACILE ─────────────────────────

L.push(A('chat', '🐱', 'Un chat', 'A cat', 1, 8, 'animaux', [
  S('Dessine un grand rond un peu aplati pour la tête.', 'Draw a big, slightly flat circle for the head.', e(200, 165, 100, 78, F(O))),
  S('Ajoute deux triangles pointus pour les oreilles.', 'Add two pointy triangles for the ears.', pg('122,122 112,50 172,89', F(O, -1)), pg('278,122 288,50 228,89', F(O, -1))),
  S('Dessine deux yeux ronds.', 'Draw two round eyes.', eyes(162, 238, 155, 8)),
  S('Fais un petit triangle pour le nez et deux petites courbes pour la bouche.', 'Make a little triangle for the nose and two little curves for the mouth.', pg('188,178 212,178 200,192', F(Pk)), p('M200 192 Q200 208 182 208 M200 192 Q200 208 218 208')),
  S('Trace deux moustaches de chaque côté.', 'Draw two whiskers on each side.', l(125, 180, 70, 170), l(125, 195, 70, 200), l(275, 180, 330, 170), l(275, 195, 330, 200)),
], 'Colorie ton chat!', 'Color your cat!', [
  pg('130,112 124,72 160,95', F(Pk, 1)), pg('270,112 276,72 240,95', F(Pk, 1)),
  p('M200 90 V108 M178 94 L184 110 M222 94 L216 110'),
]));

L.push(A('chien', '🐶', 'Un chien', 'A dog', 1, 12, 'animaux', [
  S('Dessine un rond un peu large pour la tête.', 'Draw a slightly wide circle for the head.', e(200, 115, 72, 64, F(Tn))),
  S('Ajoute deux grandes oreilles qui tombent.', 'Add two big floppy ears.', p('M146 75 Q88 78 92 150 Q135 152 142 120', F(Br, -1)), p('M254 75 Q312 78 308 150 Q265 152 258 120', F(Br, -1))),
  S('Dessine deux yeux.', 'Draw two eyes.', eyes(176, 224, 105)),
  S('Fais un museau ovale avec un nez rond.', 'Make an oval muzzle with a round nose.', e(200, 143, 34, 25, F(Cr)), e(200, 133, 14, 9, F(D))),
  S('Trace la bouche.', 'Draw the mouth.', p('M200 142 V152 M200 152 Q188 164 176 153 M200 152 Q212 164 224 153')),
  S('Dessine le corps sous la tête.', 'Draw the body under the head.', p('M152 172 Q125 225 135 272 L265 272 Q275 225 248 172', F(Tn, -2))),
  S('Ajoute deux pattes.', 'Add two paws.', e(170, 274, 28, 10, F(Tn)), e(230, 274, 28, 10, F(Tn)), l(200, 225, 200, 268)),
  S('Termine avec une queue.', 'Finish with a tail.', p('M262 250 Q300 235 292 205')),
], 'Colorie ton chien!', 'Color your dog!', [
  p('M188 150 Q200 182 212 150 Z', F(Pk, 1)),
  c(158, 98, 12, F(Br, 1)),
]));

L.push(A('lapin', '🐰', 'Un lapin', 'A rabbit', 1, 10, 'animaux', [
  S('Dessine un grand rond pour la tête.', 'Draw a big circle for the head.', e(200, 185, 80, 65, F('#f4f4f8'))),
  S('Ajoute deux longues oreilles.', 'Add two long ears.', e(165, 80, 22, 55, F('#f4f4f8', -1)), e(235, 80, 22, 55, F('#f4f4f8', -1))),
  S('Dessine deux yeux.', 'Draw two eyes.', eyes(172, 228, 180)),
  S('Fais un petit nez rond et une bouche.', 'Make a little round nose and a mouth.', e(200, 200, 9, 7, F(Pk)), p('M200 207 V215 M200 215 Q190 225 180 216 M200 215 Q210 225 220 216')),
  S('Ajoute une grande dent.', 'Add a big tooth.', r(192, 219, 16, 16, 3, F(Wh)), l(200, 219, 200, 235)),
  S('Trace des moustaches.', 'Draw whiskers.', l(150, 200, 105, 195), l(150, 212, 105, 218), l(250, 200, 295, 195), l(250, 212, 295, 218)),
], 'Colorie ton lapin!', 'Color your rabbit!', [
  e(165, 85, 10, 38, F(Pk, 1)), e(235, 85, 10, 38, F(Pk, 1)),
  c(142, 203, 12, F('#ffc9dd', 1)), c(258, 203, 12, F('#ffc9dd', 1)),
]));

L.push(A('hibou', '🦉', 'Un hibou', 'An owl', 1, 12, 'animaux', [
  S('Dessine un grand oeuf debout pour le corps.', 'Draw a big egg standing up for the body.', e(200, 165, 85, 100, F(Br, -3))),
  S('Ajoute deux grands cercles pour les yeux.', 'Add two big circles for the eyes.', c(165, 120, 30, F(Wh)), c(235, 120, 30, F(Wh))),
  S('Dessine une pupille dans chaque oeil.', 'Draw a pupil in each eye.', c(165, 122, 10, F(D)), c(235, 122, 10, F(D))),
  S('Fais un petit bec en triangle.', 'Make a little triangle beak.', pg('188,140 212,140 200,165', F(O))),
  S('Ajoute deux pointes sur la tête.', 'Add two points on top of the head.', pg('142,88 134,46 174,70', F(Br, -4)), pg('258,88 266,46 226,70', F(Br, -4))),
  S('Dessine deux ailes sur les côtés.', 'Draw two wings on the sides.', p('M118 150 Q92 200 122 242', F(Tn)), p('M282 150 Q308 200 278 242', F(Tn))),
  S('Fais de petites plumes sur le ventre.', 'Draw little feathers on the tummy.', p('M170 192 q10 10 20 0 M200 192 q10 10 20 0 M185 218 q10 10 20 0 M215 218 q10 10 20 0')),
  S('Dessine les pattes et une branche.', 'Draw the feet and a branch.', p('M172 262 L164 278 M172 262 V279 M172 262 L180 278 M228 262 L220 278 M228 262 V279 M228 262 L236 278'), l(95, 282, 305, 282)),
], 'Colorie ton hibou!', 'Color your owl!', [
  e(200, 205, 50, 55, F(Cr, -2)),
]));

L.push(A('poisson', '🐠', 'Un poisson', 'A fish', 1, 10, 'animaux', [
  S('Dessine un grand ovale pour le corps.', 'Draw a big oval for the body.', e(180, 150, 100, 65, F(O))),
  S('Ajoute un triangle pour la queue.', 'Add a triangle for the tail.', pg('272,150 345,95 345,205', F(Y, -1))),
  S('Dessine un oeil rond et une petite bouche.', 'Draw a round eye and a little mouth.', c(120, 135, 10, F(Wh)), c(120, 135, 4, F(D)), p('M85 162 Q98 170 110 162')),
  S('Trace une courbe pour la joue.', 'Draw a curve for the gill.', p('M140 105 Q118 150 140 195')),
  S('Ajoute une nageoire en haut et une en bas.', 'Add one fin on top and one below.', p('M150 92 Q182 48 218 88', F(Y, -1)), p('M172 210 Q192 242 218 208', F(Y, -1))),
  S('Fais des écailles avec des petites courbes.', 'Make scales with little curves.', p('M190 118 q14 12 0 26 M222 118 q14 12 0 26 M206 150 q14 12 0 26 M238 130 q12 10 0 22')),
  S('Dessine des bulles.', 'Draw some bubbles.', c(60, 95, 8, F(Lb)), c(42, 65, 5, F(Lb)), c(78, 55, 6, F(Lb))),
], 'Colorie ton poisson!', 'Color your fish!'));

L.push(A('tortue', '🐢', 'Une tortue', 'A turtle', 1, 10, 'animaux', [
  S('Dessine une grande demi-boule pour la carapace.', 'Draw a big half-ball for the shell.', p('M105 190 A95 85 0 0 1 295 190 Z', F('#5fbf6e'))),
  S('Ajoute un rond pour la tête.', 'Add a circle for the head.', c(322, 170, 28, F('#9bd97a', -1))),
  S('Dessine deux pattes et une petite queue.', 'Draw two legs and a little tail.', r(135, 190, 36, 30, 12, F('#9bd97a', -1)), r(235, 190, 36, 30, 12, F('#9bd97a', -1)), p('M105 190 L78 204 L110 206', F('#9bd97a', -1))),
  S('Dessine un hexagone au milieu de la carapace.', 'Draw a hexagon in the middle of the shell.', pg('180,140 220,140 238,165 220,190 180,190 162,165', F('#a6e3a1', 1))),
  S('Trace des lignes pour faire les plaques.', 'Draw lines to make the plates.', l(162, 165, 115, 165), l(238, 165, 285, 165), l(180, 140, 158, 118), l(220, 140, 242, 118)),
  S('Ajoute un oeil et un sourire.', 'Add an eye and a smile.', c(328, 163, 5, F(D)), p('M312 178 Q325 186 337 176')),
], 'Colorie ta tortue!', 'Color your turtle!'));

L.push(A('escargot', '🐌', 'Un escargot', 'A snail', 1, 10, 'animaux', [
  S('Dessine un grand rond pour la coquille.', 'Draw a big circle for the shell.', c(180, 130, 70, F(O, 1))),
  S('Fais une spirale dans la coquille.', 'Draw a spiral in the shell.', p('M180 130 a10 10 0 0 1 20 0 a22 22 0 0 1 -44 0 a36 36 0 0 1 72 0 a50 50 0 0 1 -100 0', 'z="2"')),
  S('Dessine un long ovale sous la coquille pour le corps.', 'Draw a long oval under the shell for the body.', e(190, 225, 125, 28, F('#bfe29a'))),
  S('Ajoute un rond pour la tête.', 'Add a circle for the head.', c(322, 200, 26, F('#bfe29a'))),
  S('Dessine deux antennes avec un petit rond au bout.', 'Draw two antennae with a little circle on the end.', l(314, 177, 300, 146), c(298, 140, 6, F('#bfe29a')), l(332, 179, 342, 146), c(344, 141, 6, F('#bfe29a'))),
  S('Ajoute un oeil et un sourire.', 'Add an eye and a smile.', c(326, 197, 4, F(D)), p('M316 210 Q328 220 338 209')),
], 'Colorie ton escargot!', 'Color your snail!'));

L.push(A('coccinelle', '🐞', 'Une coccinelle', 'A ladybug', 1, 10, 'animaux', [
  S('Dessine un grand ovale pour le dos.', 'Draw a big oval for the back.', e(200, 170, 95, 90, F(Rd))),
  S('Ajoute un petit rond pour la tête, en haut.', 'Add a small circle for the head, at the top.', c(200, 70, 30, F(D, -1))),
  S('Trace une ligne droite au milieu du dos.', 'Draw a straight line down the middle of the back.', l(200, 82, 200, 258)),
  S('Dessine des gros points.', 'Draw big dots.', c(158, 155, 16, F(D)), c(242, 155, 16, F(D)), c(155, 215, 13, F(D)), c(245, 215, 13, F(D))),
  S('Ajoute deux antennes et deux yeux.', 'Add two antennae and two eyes.', p('M188 50 Q175 25 152 28'), p('M212 50 Q225 25 248 28'), c(190, 70, 5, F(Wh, 1)), c(210, 70, 5, F(Wh, 1))),
  S('Dessine trois pattes de chaque côté.', 'Draw three legs on each side.', l(108, 150, 70, 132), l(106, 190, 62, 196), l(127, 225, 90, 248), l(292, 150, 330, 132), l(294, 190, 338, 196), l(273, 225, 310, 248)),
], 'Colorie ta coccinelle!', 'Color your ladybug!'));

L.push(A('poule', '🐔', 'Une poule', 'A hen', 1, 12, 'animaux', [
  S('Dessine un grand ovale pour le corps.', 'Draw a big oval for the body.', e(190, 185, 90, 70, F('#f0a35e'))),
  S('Ajoute un rond pour la tête.', 'Add a circle for the head.', c(270, 108, 38, F('#f0a35e'))),
  S('Dessine la crête avec trois petits ronds.', 'Draw the comb with three little circles.', c(254, 68, 10, F(Rd, -1)), c(270, 62, 11, F(Rd, -1)), c(287, 68, 10, F(Rd, -1))),
  S('Fais un bec en triangle et une petite barbe en dessous.', 'Make a triangle beak and a little wattle below.', pg('304,100 336,110 304,122', F(Y)), e(296, 138, 8, 14, F(Rd, -1))),
  S('Dessine un oeil rond.', 'Draw a round eye.', c(282, 100, 6, F(D))),
  S('Ajoute une aile ovale sur le corps.', 'Add an oval wing on the body.', e(178, 185, 45, 30, F(Tn))),
  S('Fais la queue avec deux courbes.', 'Make the tail with two curves.', p('M112 155 Q70 150 58 105 Q95 112 125 135', F(Tn)), p('M108 180 Q62 188 45 145 Q85 150 118 165', F(Tn))),
  S('Dessine deux pattes avec des orteils.', 'Draw two legs with toes.', p('M170 255 V287 M155 291 L170 287 L185 291'), p('M215 255 V287 M200 291 L215 287 L230 291')),
], 'Colorie ta poule!', 'Color your hen!'));

L.push(A('pingouin', '🐧', 'Un pingouin', 'A penguin', 1, 10, 'animaux', [
  S('Dessine un grand oeuf debout.', 'Draw a big egg standing up.', e(200, 160, 85, 115, F('#4a5a8f'))),
  S('Dessine un ventre blanc plus petit à l\'intérieur.', 'Draw a smaller white tummy inside.', e(200, 185, 58, 85, F(Wh))),
  S('Ajoute deux yeux ronds avec une pupille.', 'Add two round eyes with a pupil.', c(175, 95, 10, F(Wh)), c(225, 95, 10, F(Wh)), c(177, 96, 4, F(D)), c(223, 96, 4, F(D))),
  S('Fais un petit bec en triangle.', 'Make a little triangle beak.', pg('186,112 214,112 200,134', F(O))),
  S('Dessine deux ailes sur les côtés.', 'Draw two flippers on the sides.', p('M118 140 Q78 190 100 235 Q125 205 128 170', F('#4a5a8f')), p('M282 140 Q322 190 300 235 Q275 205 272 170', F('#4a5a8f'))),
  S('Ajoute deux grands pieds.', 'Add two big feet.', e(168, 284, 26, 10, F(O)), e(232, 284, 26, 10, F(O))),
], 'Colorie ton pingouin!', 'Color your penguin!'));

L.push(A('bonhomme-de-neige', '⛄', 'Un bonhomme de neige', 'A snowman', 1, 12, 'personnages', [
  S('Dessine un gros rond en bas.', 'Draw a big circle at the bottom.', c(200, 232, 55, F('#eaf6ff'))),
  S('Ajoute un rond moyen par-dessus.', 'Add a medium circle on top.', c(200, 148, 42, F('#eaf6ff'))),
  S('Ajoute un petit rond pour la tête.', 'Add a small circle for the head.', c(200, 82, 32, F('#eaf6ff'))),
  S('Dessine un chapeau haut de forme.', 'Draw a top hat.', r(176, 14, 48, 36, 3, F('#4a4f6a')), r(160, 48, 80, 10, 4, F('#4a4f6a'))),
  S('Fais deux yeux, un nez en carotte et un sourire.', 'Make two eyes, a carrot nose and a smile.', c(188, 80, 4, F(D)), c(212, 80, 4, F(D)), pg('200,86 238,92 200,98', F(O)), p('M184 98 Q200 112 216 98')),
  S('Dessine trois gros boutons.', 'Draw three big buttons.', c(200, 135, 5, F(D)), c(200, 158, 5, F(D)), c(200, 215, 5, F(D))),
  S('Ajoute deux bras de branche.', 'Add two stick arms.', p('M160 140 L105 110 M122 122 L108 100'), p('M240 140 L295 110 M278 122 L292 100')),
  S('Mets une écharpe autour du cou.', 'Put a scarf around the neck.', p('M168 112 Q200 132 232 112', F(Rd))),
], 'Colorie ton bonhomme de neige!', 'Color your snowman!', [], 'hiver'));

const tri = (deg) => pg(`${pt(200, 150, 78, deg - 12)} ${pt(200, 150, 128, deg)} ${pt(200, 150, 78, deg + 12)}`, F(O, -1));
L.push(A('soleil', '☀️', 'Un soleil', 'A sun', 1, 8, 'nature', [
  S('Dessine un grand rond au milieu.', 'Draw a big circle in the middle.', c(200, 150, 60, F(Y))),
  S('Ajoute quatre rayons en triangle : en haut, en bas, à gauche et à droite.', 'Add four triangle rays: top, bottom, left and right.', tri(0), tri(90), tri(180), tri(270)),
  S('Ajoute quatre autres rayons entre les premiers.', 'Add four more rays in between.', tri(45), tri(135), tri(225), tri(315)),
  S('Dessine deux yeux.', 'Draw two eyes.', eyes(178, 222, 140, 6)),
  S('Fais un grand sourire.', 'Draw a big smile.', p('M170 165 Q200 192 230 165')),
], 'Colorie ton soleil!', 'Color your sun!', [
  c(160, 160, 9, F('#ff9fb2', 1)), c(240, 160, 9, F('#ff9fb2', 1)),
], 'ete'));

L.push(A('arbre', '🌳', 'Un arbre', 'A tree', 1, 10, 'nature', [
  S('Dessine un grand tronc.', 'Draw a big trunk.', p('M178 290 V185 H222 V290', F(Br))),
  S('Fais un gros nuage de feuilles au-dessus.', 'Draw a big cloud of leaves on top.', p('M125 150 A35 35 0 0 1 135 90 A45 45 0 0 1 215 55 A40 40 0 0 1 280 100 A35 35 0 0 1 275 160 A40 40 0 0 1 215 185 L185 185 A40 40 0 0 1 125 150 Z', F(Gr))),
  S('Ajoute des branches dans le tronc.', 'Add branches on the trunk.', p('M200 262 V232 M200 245 L182 228 M200 245 L218 228')),
  S('Dessine des pommes rondes.', 'Draw round apples.', c(165, 115, 9, F(Rd)), c(232, 100, 9, F(Rd)), c(210, 150, 9, F(Rd)), c(160, 150, 9, F(Rd))),
  S('Trace le sol avec des brins d\'herbe.', 'Draw the ground with blades of grass.', l(40, 290, 360, 290), p('M80 290 l5 -14 l5 14 M115 290 l5 -14 l5 14 M285 290 l5 -14 l5 14 M320 290 l5 -14 l5 14')),
], 'Colorie ton arbre!', 'Color your tree!', [
  e(200, 292, 170, 6, F('#a8e08a', -2)),
]));

const petal = (a) => `<ellipse cx="200" cy="52" rx="19" ry="32" transform="rotate(${a} 200 100)" ${F(Pk, -1)}/>`;
L.push(A('fleur', '🌼', 'Une fleur', 'A flower', 1, 10, 'nature', [
  S('Dessine un rond au milieu.', 'Draw a circle in the middle.', c(200, 100, 22, F(Y, 1))),
  S('Ajoute quatre pétales ovales : en haut, en bas, à gauche et à droite.', 'Add four oval petals: top, bottom, left and right.', petal(0), petal(90), petal(180), petal(270)),
  S('Ajoute quatre autres pétales entre les premiers.', 'Add four more petals in between.', petal(45), petal(135), petal(225), petal(315)),
  S('Dessine une longue tige.', 'Draw a long stem.', p('M200 178 Q190 235 200 292')),
  S('Ajoute deux feuilles.', 'Add two leaves.', p('M196 245 Q150 222 138 248 Q165 262 196 254 Z', F(Gr)), p('M200 225 Q250 200 262 226 Q235 242 200 234 Z', F(Gr))),
], 'Colorie ta fleur!', 'Color your flower!', [], 'printemps'));

L.push(A('maison', '🏠', 'Une maison', 'A house', 1, 12, 'objets', [
  S('Dessine un grand carré pour les murs.', 'Draw a big square for the walls.', r(110, 140, 180, 130, 0, F('#ffe39a'))),
  S('Ajoute un grand triangle pour le toit.', 'Add a big triangle for the roof.', pg('95,145 200,60 305,145', F(Rd))),
  S('Dessine une porte avec une poignée ronde.', 'Draw a door with a round knob.', r(178, 205, 44, 65, 0, F(Br)), c(212, 240, 4, F(Y))),
  S('Fais une fenêtre carrée avec une croix.', 'Make a square window with a cross.', r(125, 165, 40, 40, 0, F(Lb)), p('M145 165 V205 M125 185 H165')),
  S('Fais la même fenêtre de l\'autre côté.', 'Make the same window on the other side.', r(235, 165, 40, 40, 0, F(Lb)), p('M255 165 V205 M235 185 H275')),
  S('Ajoute une cheminée sur le toit.', 'Add a chimney on the roof.', p('M245 100 V68 H275 V121', F('#d98a6a', -1))),
], 'Colorie ta maison!', 'Color your house!', [
  e(200, 272, 150, 10, F('#8fd68a', -2)),
]));

L.push(A('creme-glacee', '🍦', 'Un cornet de crème glacée', 'An ice cream cone', 1, 10, 'nourriture', [
  S('Dessine un grand triangle pointe en bas pour le cornet.', 'Draw a big triangle pointing down for the cone.', pg('150,165 250,165 200,285', F(Tn, -1))),
  S('Ajoute un gros rond pour la boule.', 'Add a big circle for the scoop.', c(200, 120, 56, F(Pk))),
  S('Dessine une ligne qui goutte en bas de la boule.', 'Draw a drippy line at the bottom of the scoop.', p('M148 142 Q160 168 176 148 Q190 172 206 150 Q220 170 234 148 Q244 160 252 142')),
  S('Ajoute une cerise avec sa queue.', 'Add a cherry with its stem.', c(200, 59, 11, F(Rd)), p('M200 48 Q205 30 225 25')),
  S('Trace des lignes croisées sur le cornet.', 'Draw crossing lines on the cone.', l(158, 185, 214, 250), l(171, 215, 205, 272), l(242, 185, 186, 250), l(229, 215, 195, 272)),
], 'Colorie ta crème glacée!', 'Color your ice cream!', [], 'ete'));

const arc = (R, col) => p(`M${200 - R} 250 A${R} ${R} 0 0 1 ${200 + R} 250`, F(col));
L.push(A('arc-en-ciel', '🌈', 'Un arc-en-ciel', 'A rainbow', 1, 8, 'nature', [
  S('Dessine une grande demi-courbe.', 'Draw a big half-circle curve.', arc(150, Rd)),
  S('Dessine une autre courbe juste en dessous.', 'Draw another curve just below.', arc(125, O)),
  S('Ajoute deux autres courbes plus petites.', 'Add two more smaller curves.', arc(100, Y), arc(75, Gr)),
  S('Fais une dernière petite courbe au milieu.', 'Make a last little curve in the middle.', arc(50, Bl)),
  S('Dessine un nuage à chaque bout.', 'Draw a cloud at each end.', p('M42 275 A20 20 0 0 1 48 238 A28 28 0 0 1 100 222 A26 26 0 0 1 142 245 A20 20 0 0 1 138 275 Z', F(Wh, 2)), p('M358 275 A20 20 0 0 0 352 238 A28 28 0 0 0 300 222 A26 26 0 0 0 258 245 A20 20 0 0 0 262 275 Z', F(Wh, 2))),
], 'Colorie ton arc-en-ciel!', 'Color your rainbow!', [
  p('M172 250 A28 28 0 0 1 228 250', F(Wh, 1)),
]));

L.push(A('fusee', '🚀', 'Une fusée', 'A rocket', 1, 10, 'vehicules', [
  S('Dessine le grand corps de la fusée avec une pointe en haut.', 'Draw the big body of the rocket with a point at the top.', p('M200 28 Q262 85 256 200 L144 200 Q138 85 200 28 Z', F('#eef1fa'))),
  S('Ajoute un hublot rond.', 'Add a round window.', c(200, 118, 22, F(Lb))),
  S('Dessine deux ailerons sur les côtés.', 'Draw two fins on the sides.', p('M146 165 L98 232 L146 205', F(Rd, -1)), p('M254 165 L302 232 L254 205', F(Rd, -1))),
  S('Ajoute la tuyère en dessous.', 'Add the engine nozzle below.', p('M168 200 L232 200 L222 226 L178 226 Z', F(Gy))),
  S('Dessine les flammes.', 'Draw the flames.', p('M176 228 Q200 292 224 228', F(O, -1))),
  S('Ajoute des étoiles autour.', 'Add stars around.', p('M60 70 V92 M49 81 H71'), p('M335 60 V80 M325 70 H345'), p('M330 150 V166 M322 158 H338'), c(70, 160, 4, F(Y))),
], 'Colorie ta fusée!', 'Color your rocket!', [
  p('M200 28 Q226 52 240 80 Q200 92 160 80 Q174 52 200 28 Z', F(Rd, 1)),
]));
// ───────────────────────── MOYEN ─────────────────────────

L.push(A('papillon', '🦋', 'Un papillon', 'A butterfly', 2, 12, 'animaux', [
  S('Dessine un long ovale debout pour le corps.', 'Draw a long upright oval for the body.', e(200, 150, 10, 70, F(D, 1))),
  S('Ajoute un petit rond pour la tête et deux antennes.', 'Add a small circle for the head and two antennae.', c(200, 70, 14, F(D, 1)), p('M194 58 Q180 32 160 28'), p('M206 58 Q220 32 240 28')),
  S('Dessine les deux grandes ailes du haut.', 'Draw the two big top wings.', p('M190 130 Q140 30 70 55 Q45 110 105 150 Q160 160 190 150 Z', F(O, -1)), p('M210 130 Q260 30 330 55 Q355 110 295 150 Q240 160 210 150 Z', F(O, -1))),
  S('Dessine les deux ailes du bas, plus petites.', 'Draw the two smaller bottom wings.', p('M190 155 Q130 150 85 190 Q80 250 140 245 Q185 230 190 170 Z', F(Pu, -1)), p('M210 155 Q270 150 315 190 Q320 250 260 245 Q215 230 210 170 Z', F(Pu, -1))),
  S('Ajoute des ronds sur les ailes.', 'Add circles on the wings.', c(115, 95, 16, F(Y)), c(285, 95, 16, F(Y)), c(125, 210, 12, F(Y)), c(275, 210, 12, F(Y))),
], 'Colorie ton papillon!', 'Color your butterfly!', [], 'printemps'));

L.push(A('ours', '🐻', 'Un ours en peluche', 'A teddy bear', 2, 14, 'animaux', [
  S('Dessine un grand rond pour la tête.', 'Draw a big circle for the head.', c(200, 100, 62, F(Br))),
  S('Ajoute deux petites oreilles rondes.', 'Add two small round ears.', c(152, 52, 22, F(Br, -1)), c(248, 52, 22, F(Br, -1))),
  S('Dessine un museau ovale avec un petit nez.', 'Draw an oval muzzle with a little nose.', e(200, 120, 28, 22, F(Cr)), e(200, 110, 10, 7, F(D))),
  S('Dessine deux yeux.', 'Draw two eyes.', eyes(178, 222, 88, 6)),
  S('Trace la bouche.', 'Draw the mouth.', p('M200 117 V126 M200 126 Q190 135 182 127 M200 126 Q210 135 218 127')),
  S('Dessine un gros ovale pour le corps.', 'Draw a big oval for the body.', e(200, 218, 72, 58, F(Br, -2))),
  S('Ajoute deux bras ovales.', 'Add two oval arms.', e(124, 208, 20, 40, F(Br, -2)), e(276, 208, 20, 40, F(Br, -2))),
  S('Dessine un ventre rond et deux pieds.', 'Draw a round tummy and two feet.', e(200, 225, 42, 36, F(Cr, -1)), e(158, 276, 30, 14, F(Br, -3)), e(242, 276, 30, 14, F(Br, -3))),
], 'Colorie ton ours!', 'Color your bear!', [
  c(154, 54, 11, F(Tn, 1)), c(246, 54, 11, F(Tn, 1)),
]));

L.push(A('renard', '🦊', 'Un renard', 'A fox', 2, 12, 'animaux', [
  S('Dessine une grande tête de renard avec deux oreilles pointues.', 'Draw a big fox head with two pointy ears.', p('M200 255 Q105 230 80 150 L82 45 L160 105 Q200 95 240 105 L318 45 L320 150 Q295 230 200 255 Z', F('#ff8a3d'))),
  S('Dessine le bas du visage en blanc.', 'Draw the white part of the face.', p('M200 255 Q130 238 108 175 Q150 190 200 180 Q250 190 292 175 Q270 238 200 255 Z', F(Wh, 1))),
  S('Ajoute deux yeux.', 'Add two eyes.', eyes(148, 252, 148, 7)),
  S('Dessine un petit nez rond au bout du museau.', 'Draw a little round nose at the tip of the snout.', e(200, 244, 13, 9, F(D, 2))),
  S('Dessine l\'intérieur des oreilles.', 'Draw the inside of the ears.', pg('94,110 93,68 132,96', F(D, 2)), pg('306,110 307,68 268,96', F(D, 2))),
  S('Trace des moustaches.', 'Draw whiskers.', l(115, 205, 65, 198), l(115, 218, 65, 225), l(285, 205, 335, 198), l(285, 218, 335, 225)),
], 'Colorie ton renard!', 'Color your fox!'));

L.push(A('castor', '🦫', 'Un castor', 'A beaver', 2, 14, 'animaux', [
  S('Dessine un grand rond pour la tête.', 'Draw a big circle for the head.', c(200, 120, 70, F(Br, -3))),
  S('Ajoute deux petites oreilles rondes.', 'Add two little round ears.', c(140, 62, 16, F(Br, -4)), c(260, 62, 16, F(Br, -4))),
  S('Dessine deux yeux et un gros nez.', 'Draw two eyes and a big nose.', eyes(172, 228, 105, 7), e(200, 128, 14, 10, F(D))),
  S('Fais deux grandes dents devant.', 'Make two big front teeth.', r(186, 142, 28, 26, 4, F(Wh)), l(200, 142, 200, 168)),
  S('Dessine le corps rond sous la tête.', 'Draw the round body under the head.', e(190, 235, 80, 52, F(Br, -4))),
  S('Ajoute deux petites pattes.', 'Add two little paws.', e(160, 268, 18, 12, F(Tn)), e(220, 268, 18, 12, F(Tn))),
  S('Dessine une grande queue plate.', 'Draw a big flat tail.', e(318, 262, 50, 20, F('#6b4a33', -5))),
  S('Trace des lignes sur la queue.', 'Draw lines on the tail.', p('M298 252 V272 M318 248 V276 M338 252 V272')),
], 'Colorie ton castor!', 'Color your beaver!', [
  e(200, 138, 32, 22, F(Cr, -2)),
]));

L.push(A('raton-laveur', '🦝', 'Un raton laveur', 'A raccoon', 2, 12, 'animaux', [
  S('Dessine une grande tête bien large.', 'Draw a big, wide head.', e(200, 155, 115, 80, F(Gy, -3))),
  S('Ajoute deux oreilles rondes.', 'Add two round ears.', c(118, 85, 24, F('#8a91a6', -4)), c(282, 85, 24, F('#8a91a6', -4))),
  S('Dessine le masque autour des yeux.', 'Draw the mask around the eyes.', p('M100 145 Q150 118 200 140 Q250 118 300 145 Q285 190 240 178 Q215 168 200 170 Q185 168 160 178 Q115 190 100 145 Z', F('#4a4f6a', -2))),
  S('Dessine deux yeux ronds avec une pupille.', 'Draw two round eyes with a pupil.', c(155, 150, 11, F(Wh)), c(245, 150, 11, F(Wh)), c(157, 151, 5, F(D)), c(243, 151, 5, F(D))),
  S('Ajoute un museau et un gros nez.', 'Add a snout and a big nose.', e(200, 188, 34, 26, F(Wh, -1)), e(200, 176, 14, 10, F(D))),
  S('Trace la bouche.', 'Draw the mouth.', p('M200 186 V196 M200 196 Q190 206 180 197 M200 196 Q210 206 220 197')),
  S('Ajoute des moustaches.', 'Add whiskers.', l(168, 200, 120, 196), l(168, 210, 122, 218), l(232, 200, 280, 196), l(232, 210, 278, 218)),
], 'Colorie ton raton laveur!', 'Color your raccoon!', [
  c(118, 87, 12, F('#e5a0b0', 1)), c(282, 87, 12, F('#e5a0b0', 1)),
]));

L.push(A('elephant', '🐘', 'Un éléphant', 'An elephant', 2, 15, 'animaux', [
  S('Dessine un très gros ovale pour le corps.', 'Draw a very big oval for the body.', e(230, 175, 105, 78, F(Gy, -2))),
  S('Ajoute un grand rond pour la tête.', 'Add a big circle for the head.', c(120, 150, 58, F(Gy))),
  S('Dessine une grande oreille ronde.', 'Draw a big round ear.', e(152, 148, 36, 50, F('#c3cbe0', 1))),
  S('Dessine une longue trompe qui descend.', 'Draw a long trunk going down.', p('M70 180 Q40 240 72 275 Q100 290 110 262 Q96 262 90 245 Q92 215 112 195', F(Gy))),
  S('Ajoute un oeil et une défense.', 'Add an eye and a tusk.', c(104, 135, 6, F(D, 2)), p('M92 205 Q70 215 74 232', F(Wh))),
  S('Dessine deux pattes épaisses.', 'Draw two thick legs.', r(158, 235, 40, 52, 10, F(Gy, -3)), r(262, 235, 40, 52, 10, F(Gy, -3))),
  S('Termine avec une petite queue.', 'Finish with a little tail.', p('M335 160 Q354 185 346 215')),
], 'Colorie ton éléphant!', 'Color your elephant!'));

const mane = (n, R, rr) => {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const a = (360 / n) * i - 90, [x, y] = pt(200, 150, R, a).split(',');
    d += i === 0 ? `M${x} ${y}` : ` A${rr} ${rr} 0 0 1 ${x} ${y}`;
  }
  return d + ' Z';
};
L.push(A('lion', '🦁', 'Un lion', 'A lion', 2, 14, 'animaux', [
  S('Dessine une grande crinière avec plein de bosses.', 'Draw a big mane with lots of bumps.', p(mane(14, 100, 24), F('#c97b2e', -3))),
  S('Dessine un rond au milieu pour le visage.', 'Draw a circle in the middle for the face.', c(200, 155, 66, F('#f2c36b'))),
  S('Ajoute deux petites oreilles rondes.', 'Add two little round ears.', c(146, 100, 17, F('#f2c36b', -1)), c(254, 100, 17, F('#f2c36b', -1))),
  S('Dessine deux yeux.', 'Draw two eyes.', eyes(177, 223, 143, 7)),
  S('Fais un museau ovale avec un nez triangle.', 'Make an oval muzzle with a triangle nose.', e(200, 176, 32, 22, F(Cr)), pg('188,164 212,164 200,179', F(D))),
  S('Trace la bouche.', 'Draw the mouth.', p('M200 179 V190 M200 190 Q188 202 176 192 M200 190 Q212 202 224 192')),
], 'Colorie ton lion!', 'Color your lion!'));

const W1 = 'M30 266 q20 -14 40 0 q20 14 40 0 q20 -14 40 0 q20 14 40 0 q20 -14 40 0 q20 14 40 0 q20 -14 40 0 q20 14 40 0 q20 -14 40 0';
L.push(A('baleine', '🐳', 'Une baleine', 'A whale', 2, 14, 'animaux', [
  S('Dessine le grand corps de la baleine avec la queue en haut.', 'Draw the whale\'s big body with the tail up.', p('M50 170 Q55 95 160 95 Q260 95 295 160 Q310 130 345 110 Q340 140 322 165 Q345 175 355 195 Q320 195 298 185 Q270 245 160 250 Q50 250 50 170 Z', F('#5b9ee6'))),
  S('Ajoute un oeil et un grand sourire.', 'Add an eye and a big smile.', c(100, 150, 7, F(D)), p('M52 185 Q95 205 130 195')),
  S('Dessine une nageoire.', 'Draw a flipper.', p('M170 205 Q200 242 228 232 Q208 212 190 200', F('#7ab4f0'))),
  S('Fais des petits plis sur le ventre.', 'Draw little folds on the tummy.', p('M80 210 Q95 222 112 226 M125 232 Q140 240 158 242 M170 244 Q185 246 205 244')),
  S('Dessine un jet d\'eau sur le dessus.', 'Draw a spray of water on top.', p('M165 95 V62 M165 62 Q150 48 132 56 M165 62 Q180 48 198 56')),
  S('Trace des vagues en dessous.', 'Draw waves underneath.', p(W1)),
], 'Colorie ta baleine!', 'Color your whale!', [
  p(`${W1} V292 H30 Z`, F('#8fd0ff', -6)),
]));

L.push(A('robot', '🤖', 'Un robot', 'A robot', 2, 15, 'personnages', [
  S('Dessine un rectangle aux coins ronds pour la tête.', 'Draw a rectangle with round corners for the head.', r(145, 40, 110, 80, 14, F(Gy))),
  S('Ajoute une antenne avec une boule.', 'Add an antenna with a ball.', l(200, 40, 200, 22), c(200, 15, 8, F(Rd))),
  S('Dessine deux yeux ronds et une bouche avec des dents.', 'Draw two round eyes and a mouth with teeth.', c(172, 76, 13, F(Bl)), c(228, 76, 13, F(Bl)), r(170, 98, 60, 12, 4, F(Wh)), l(190, 98, 190, 110), l(210, 98, 210, 110)),
  S('Ajoute deux oreilles carrées sur les côtés.', 'Add two square ears on the sides.', r(130, 68, 15, 32, 4, F(Gy, -1)), r(255, 68, 15, 32, 4, F(Gy, -1))),
  S('Dessine un cou et un grand rectangle pour le corps.', 'Draw a neck and a big rectangle for the body.', r(185, 118, 30, 20, 0, F(Gy, -1)), r(130, 135, 140, 110, 12, F(Gy))),
  S('Dessine un écran avec deux boutons.', 'Draw a screen with two buttons.', r(165, 155, 70, 45, 6, F(Wh)), c(185, 177, 7, F(Rd)), c(215, 177, 7, F(Y))),
  S('Ajoute deux bras avec des mains rondes.', 'Add two arms with round hands.', r(92, 145, 30, 85, 12, F(Gy, -1)), r(278, 145, 30, 85, 12, F(Gy, -1)), c(107, 240, 14, F(Bl)), c(293, 240, 14, F(Bl))),
  S('Dessine deux jambes et deux pieds.', 'Draw two legs and two feet.', r(155, 245, 36, 32, 6, F(Gy, -1)), r(209, 245, 36, 32, 6, F(Gy, -1)), r(145, 277, 50, 13, 5, F(Bl)), r(205, 277, 50, 13, 5, F(Bl))),
], 'Colorie ton robot!', 'Color your robot!'));

L.push(A('enfant', '🧒', 'Un enfant', 'A child', 2, 15, 'personnages', [
  S('Dessine un rond pour la tête.', 'Draw a circle for the head.', c(200, 70, 38, F('#ffd9b3'))),
  S('Ajoute les cheveux sur le dessus.', 'Add the hair on top.', p('M162 68 Q165 30 200 30 Q236 30 238 68 Q215 52 200 52 Q182 52 162 68 Z', F('#7a4a2a'))),
  S('Dessine deux yeux et un sourire.', 'Draw two eyes and a smile.', eyes(188, 212, 72, 4), p('M188 85 Q200 96 212 85')),
  S('Dessine un chandail sous la tête.', 'Draw a shirt under the head.', p('M170 112 L230 112 L245 185 L155 185 Z', F('#ff8a5c'))),
  S('Ajoute deux bras avec des mains rondes.', 'Add two arms with round hands.', pg('172,118 168,134 130,184 114,170', F('#ff8a5c')), pg('228,118 232,134 270,184 286,170', F('#ff8a5c')), c(120, 178, 10, F('#ffd9b3')), c(280, 178, 10, F('#ffd9b3'))),
  S('Dessine un pantalon avec deux jambes.', 'Draw pants with two legs.', p('M158 185 L242 185 L236 262 L208 262 L200 208 L192 262 L164 262 Z', F('#3b5ba5'))),
  S('Ajoute deux souliers.', 'Add two shoes.', e(184, 270, 22, 9, F(Rd)), e(216, 270, 22, 9, F(Rd))),
], 'Colorie ton enfant!', 'Color your child!', [
  c(176, 84, 6, F('#ffb3a7', 1)), c(224, 84, 6, F('#ffb3a7', 1)),
]));

L.push(A('pirate', '🏴‍☠️', 'Un pirate', 'A pirate', 2, 15, 'personnages', [
  S('Dessine un grand rond pour la tête.', 'Draw a big circle for the head.', c(200, 118, 50, F('#ffd9b3'))),
  S('Ajoute un chapeau de pirate.', 'Add a pirate hat.', p('M148 90 Q150 35 200 33 Q250 35 252 90 Z', F(D)), p('M118 92 Q200 76 282 92 Q250 108 200 104 Q150 108 118 92 Z', F(D))),
  S('Dessine une petite tête de mort sur le chapeau.', 'Draw a little skull on the hat.', c(200, 62, 9, F(Wh)), c(196, 60, 2, F(D, 1)), c(204, 60, 2, F(D, 1))),
  S('Ajoute un cache-oeil avec sa ficelle et un oeil.', 'Add an eye patch with its string, and an eye.', c(228, 118, 13, F(D)), p('M216 108 Q190 94 152 100'), c(176, 116, 6, F(D))),
  S('Dessine un grand sourire.', 'Draw a big smile.', p('M178 142 Q200 158 224 142')),
  S('Dessine le corps avec un ceinturon.', 'Draw the body with a belt.', p('M150 172 L250 172 L262 252 L138 252 Z', F('#e8ecf5')), r(138, 238, 124, 16, 3, F(D)), r(192, 240, 16, 12, 2, F(Y))),
  S('Ajoute des rayures sur le chandail.', 'Add stripes on the shirt.', l(146, 196, 254, 196), l(142, 218, 258, 218)),
  S('Dessine un bras avec une main et un bras avec un crochet.', 'Draw one arm with a hand and one arm with a hook.', pg('152,176 148,192 112,230 98,214', F('#e8ecf5')), c(104, 222, 10, F('#ffd9b3')), pg('248,176 252,192 288,230 302,214', F('#e8ecf5')), p('M296 226 Q322 226 318 252 Q312 240 304 242')),
], 'Colorie ton pirate!', 'Color your pirate!', [], 'halloween'));

L.push(A('auto', '🚗', 'Une auto', 'A car', 2, 12, 'vehicules', [
  S('Dessine un long rectangle aux coins ronds pour le bas de l\'auto.', 'Draw a long rectangle with round corners for the bottom of the car.', r(50, 175, 300, 55, 14, F('#4aa8ff'))),
  S('Ajoute la cabine au-dessus avec un trapèze.', 'Add the cabin on top with a trapezoid.', p('M115 175 L145 120 L255 120 L290 175', F('#4aa8ff', -1))),
  S('Dessine deux fenêtres dans la cabine.', 'Draw two windows in the cabin.', pg('135,170 155,128 195,128 195,170', F(Lb)), pg('205,128 248,128 272,170 205,170', F(Lb))),
  S('Dessine deux grandes roues.', 'Draw two big wheels.', c(115, 235, 30, F('#4a4f6a')), c(285, 235, 30, F('#4a4f6a'))),
  S('Ajoute un petit rond au centre de chaque roue.', 'Add a little circle in the middle of each wheel.', c(115, 235, 12, F(Gy)), c(285, 235, 12, F(Gy))),
  S('Dessine un phare et une poignée de porte.', 'Draw a headlight and a door handle.', c(338, 198, 8, F(Y)), l(180, 192, 205, 192)),
], 'Colorie ton auto!', 'Color your car!'));

L.push(A('autobus-scolaire', '🚌', 'Un autobus scolaire', 'A school bus', 2, 15, 'vehicules', [
  S('Dessine un grand rectangle aux coins ronds.', 'Draw a big rectangle with round corners.', r(40, 90, 320, 125, 18, F('#ffc928'))),
  S('Ajoute trois fenêtres carrées.', 'Add three square windows.', r(55, 108, 42, 42, 4, F(Lb)), r(107, 108, 42, 42, 4, F(Lb)), r(159, 108, 42, 42, 4, F(Lb))),
  S('Ajoute deux autres fenêtres et la porte.', 'Add two more windows and the door.', r(211, 108, 42, 42, 4, F(Lb)), r(263, 108, 42, 42, 4, F(Lb)), r(313, 108, 32, 85, 3, F(Lb))),
  S('Trace deux longues lignes sur le côté.', 'Draw two long lines along the side.', l(40, 170, 360, 170), l(40, 184, 360, 184)),
  S('Dessine deux grandes roues.', 'Draw two big wheels.', c(110, 215, 28, F('#4a4f6a')), c(290, 215, 28, F('#4a4f6a'))),
  S('Ajoute un rond au centre des roues et un phare.', 'Add a circle in the middle of the wheels and a headlight.', c(110, 215, 11, F(Gy)), c(290, 215, 11, F(Gy)), c(351, 198, 6, F(Wh))),
], 'Colorie ton autobus!', 'Color your bus!'));

const cloud = (x, y) => p(`M${x} ${y} a14 14 0 0 1 6 -26 a20 20 0 0 1 38 -6 a14 14 0 0 1 8 32 Z`, F(Lb));
L.push(A('avion', '✈️', 'Un avion', 'An airplane', 2, 14, 'vehicules', [
  S('Dessine un très long ovale pour le corps de l\'avion.', 'Draw a very long oval for the body of the plane.', e(200, 155, 155, 33, F('#eef1fa'))),
  S('Ajoute la queue avec un grand triangle penché.', 'Add the tail with a big slanted shape.', p('M70 140 L50 72 L98 72 L135 126', F(Rd, -1))),
  S('Dessine une grande aile sous l\'avion.', 'Draw a big wing under the plane.', p('M185 188 L140 235 L192 235 L258 186', F('#9bb3d1', -1))),
  S('Dessine cinq petites fenêtres rondes.', 'Draw five little round windows.', c(135, 148, 7, F(Lb)), c(167, 148, 7, F(Lb)), c(199, 148, 7, F(Lb)), c(231, 148, 7, F(Lb)), c(263, 148, 7, F(Lb))),
  S('Ajoute la fenêtre du pilote devant.', 'Add the pilot\'s window at the front.', p('M318 140 Q345 140 352 153 L318 153 Z', F(Lb))),
  S('Dessine un moteur sous l\'aile.', 'Draw an engine under the wing.', r(190, 212, 48, 18, 9, F(Gy))),
  S('Ajoute deux nuages dans le ciel.', 'Add two clouds in the sky.', cloud(290, 70), p('M40 255 a12 12 0 0 1 5 -22 a16 16 0 0 1 30 -4 a12 12 0 0 1 8 26 Z', F(Lb))),
], 'Colorie ton avion!', 'Color your airplane!'));

L.push(A('bateau', '⛵', 'Un bateau à voile', 'A sailboat', 2, 14, 'vehicules', [
  S('Dessine la coque du bateau avec un trapèze.', 'Draw the hull of the boat with a trapezoid.', pg('70,190 330,190 295,250 105,250', F(Br))),
  S('Dessine un grand mât bien droit.', 'Draw a tall straight mast.', l(200, 40, 200, 190)),
  S('Ajoute une grande voile en triangle.', 'Add a big triangle sail.', pg('206,48 206,176 300,176', F(Wh))),
  S('Ajoute une plus petite voile de l\'autre côté.', 'Add a smaller sail on the other side.', pg('194,76 194,176 118,176', F(Y))),
  S('Dessine un petit drapeau en haut.', 'Draw a little flag at the top.', pg('200,40 236,52 200,64', F(Rd))),
  S('Ajoute trois hublots ronds.', 'Add three round portholes.', c(150, 218, 10, F(Lb)), c(200, 218, 10, F(Lb)), c(250, 218, 10, F(Lb))),
  S('Trace des vagues sous le bateau.', 'Draw waves under the boat.', p('M20 258 q22 -14 44 0 q22 14 44 0 q22 -14 44 0 q22 14 44 0 q22 -14 44 0 q22 14 44 0 q22 -14 44 0 q22 14 44 0')),
], 'Colorie ton bateau!', 'Color your boat!', [
  p('M20 258 q22 -14 44 0 q22 14 44 0 q22 -14 44 0 q22 14 44 0 q22 -14 44 0 q22 14 44 0 q22 -14 44 0 q22 14 44 0 V292 H20 Z', F('#8fd0ff', -6)),
], 'ete'));

L.push(A('train', '🚂', 'Un train', 'A train', 2, 15, 'vehicules', [
  S('Dessine la cabine avec un rectangle et un toit.', 'Draw the cab with a rectangle and a roof.', r(60, 90, 75, 108, 6, F(Rd)), r(50, 78, 95, 14, 4, F(D))),
  S('Dessine un long rectangle arrondi pour la chaudière.', 'Draw a long rounded rectangle for the boiler.', r(135, 125, 155, 73, 16, F('#4a8fd9'))),
  S('Ajoute la cheminée et un petit dôme.', 'Add the chimney and a little dome.', p('M245 128 V84 H277 V128', F(D, -1)), p('M160 126 Q185 96 210 126', F(Y))),
  S('Dessine une fenêtre et un phare.', 'Draw a window and a headlight.', r(78, 104, 40, 36, 5, F(Lb)), c(279, 158, 9, F(Y))),
  S('Dessine une longue barre en dessous.', 'Draw a long bar underneath.', r(55, 198, 250, 12, 3, F(D))),
  S('Ajoute une grosse roue et deux plus petites.', 'Add one big wheel and two smaller ones.', c(100, 224, 28, F(Rd)), c(180, 232, 19, F(Rd)), c(250, 232, 19, F(Rd)), l(180, 232, 250, 232)),
  S('Dessine de la fumée qui monte.', 'Draw smoke going up.', c(262, 62, 12, F(Gy)), c(290, 44, 15, F(Gy)), c(326, 30, 18, F(Gy))),
], 'Colorie ton train!', 'Color your train!'));

L.push(A('gateau', '🎂', 'Un gâteau d\'anniversaire', 'A birthday cake', 2, 14, 'nourriture', [
  S('Dessine un grand rectangle aux coins ronds pour l\'étage du bas.', 'Draw a big rectangle with round corners for the bottom layer.', r(70, 190, 260, 75, 12, F('#c98a5e'))),
  S('Ajoute un rectangle plus petit pour l\'étage du haut.', 'Add a smaller rectangle for the top layer.', r(100, 125, 200, 65, 12, F(Pk))),
  S('Dessine du glaçage qui coule sur le haut.', 'Draw icing dripping down the top.', p('M100 135 Q115 160 130 138 Q145 165 160 138 Q180 168 200 138 Q220 168 240 138 Q255 165 270 138 Q285 160 300 135', F(Wh, 1))),
  S('Plante trois bougies sur le gâteau.', 'Stand three candles on the cake.', r(150, 73, 12, 52, 2, F(Bl)), r(194, 73, 12, 52, 2, F(Gr)), r(238, 73, 12, 52, 2, F(Rd))),
  S('Dessine une flamme sur chaque bougie.', 'Draw a flame on each candle.', p('M156 70 Q146 54 156 36 Q166 54 156 70 Z', F(Y)), p('M200 70 Q190 54 200 36 Q210 54 200 70 Z', F(Y)), p('M244 70 Q234 54 244 36 Q254 54 244 70 Z', F(Y))),
  S('Ajoute une assiette en dessous.', 'Add a plate underneath.', e(200, 272, 160, 13, F(Gy, -3))),
  S('Dessine des petits bonbons sur l\'étage du bas.', 'Draw little candies on the bottom layer.', c(115, 225, 5, F(Y)), c(165, 235, 5, F(Bl)), c(215, 222, 5, F(Pk)), c(265, 236, 5, F(Gr)), c(300, 220, 5, F(Y))),
], 'Colorie ton gâteau!', 'Color your cake!'));

// ───────────────────────── DIFFICILE ─────────────────────────
const SK = '#ffd9b3';
const ellR = (x, y, rx, ry, rot, a = '') => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${x} ${y})" ${a}/>`;
const star = (x, y, a = '') => p(`M${x} ${y - 12} l4 8 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1 z`, a);

const ANT = '165,100 125,102 85,88 58,94 80,72 50,58 84,56 68,34 102,44 106,18 130,46 152,58 158,76';
L.push(A('orignal', '🫎', 'Un orignal', 'A moose', 3, 18, 'animaux', [
  S('Dessine un long ovale debout pour la tête.', 'Draw a long upright oval for the head.', e(200, 170, 55, 78, F(Br, -1))),
  S('Ajoute deux oreilles penchées sur les côtés.', 'Add two tilted ears on the sides.', ellR(137, 126, 28, 11, -28, F(Br, -2)), ellR(263, 126, 28, 11, 28, F(Br, -2))),
  S('Dessine un gros museau ovale en bas.', 'Draw a big oval muzzle at the bottom.', e(200, 222, 38, 28, F('#8a5a3a'))),
  S('Ajoute deux narines et deux yeux.', 'Add two nostrils and two eyes.', c(188, 228, 4, F(D)), c(212, 228, 4, F(D)), eyes(172, 228, 140, 7)),
  S('Dessine un grand bois plat avec des pointes à gauche.', 'Draw a big flat antler with points on the left.', pg(ANT, F(Tn, -3))),
  S('Dessine le même bois à droite.', 'Draw the same antler on the right.', pgm(ANT, F(Tn, -3))),
  S('Ajoute une petite barbe sous le menton.', 'Add a little beard under the chin.', p('M195 248 Q190 270 200 280 Q210 270 205 248', F(Br, -2))),
], 'Colorie ton orignal!', 'Color your moose!'));

L.push(A('girafe', '🦒', 'Une girafe', 'A giraffe', 3, 20, 'animaux', [
  S('Dessine un gros ovale pour le corps.', 'Draw a big oval for the body.', e(190, 215, 95, 50, F(Y))),
  S('Dessine un très long cou qui monte.', 'Draw a very long neck going up.', p('M138 172 L118 80 L165 75 L190 166', F(Y, -1))),
  S('Ajoute la tête avec un ovale.', 'Add the head with an oval.', e(125, 62, 42, 22, F(Y))),
  S('Dessine deux petites cornes et une oreille.', 'Draw two little horns and an ear.', l(110, 42, 108, 22), c(108, 19, 5, F(Br)), l(138, 42, 140, 22), c(140, 19, 5, F(Br)), e(158, 52, 13, 7, F(Y))),
  S('Dessine quatre pattes.', 'Draw four legs.', r(122, 258, 16, 36, 4, F(Y, -2)), r(150, 258, 16, 36, 4, F(Y, -2)), r(222, 258, 16, 36, 4, F(Y, -2)), r(250, 258, 16, 36, 4, F(Y, -2))),
  S('Ajoute une queue avec un petit bout rond.', 'Add a tail with a little round tip.', p('M284 205 Q310 215 305 255'), c(305, 259, 6, F(Br))),
  S('Dessine un oeil, une narine et un sourire.', 'Draw an eye, a nostril and a smile.', c(100, 58, 4, F(D)), c(86, 68, 3, F(D)), p('M92 76 Q104 82 114 76')),
  S('Dessine des taches sur le corps et le cou.', 'Draw spots on the body and the neck.', c(180, 215, 12, F('#c9803a', 1)), e(225, 198, 10, 8, F('#c9803a', 1)), e(140, 232, 9, 7, F('#c9803a', 1)), e(215, 242, 9, 7, F('#c9803a', 1)), e(142, 130, 9, 7, F('#c9803a', 1)), e(158, 100, 8, 6, F('#c9803a', 1))),
], 'Colorie ta girafe!', 'Color your giraffe!'));

const plate = (cx, h) => {
  const xl = cx - 16, xr = cx + 16, yl = edgeY(200, 190, 115, 60, xl) + 2, yr = edgeY(200, 190, 115, 60, xr) + 2, yt = edgeY(200, 190, 115, 60, cx) - h;
  return p(`M${xl} ${yl.toFixed(0)} L${cx} ${yt.toFixed(0)} L${xr} ${yr.toFixed(0)}`, F(O, -2));
};
L.push(A('dinosaure', '🦖', 'Un dinosaure', 'A dinosaur', 3, 20, 'animaux', [
  S('Dessine un gros ovale pour le corps.', 'Draw a big oval for the body.', e(200, 190, 115, 60, F('#7fcf7a', -1))),
  S('Ajoute une petite tête ovale à gauche.', 'Add a small oval head on the left.', e(75, 200, 32, 22, F('#7fcf7a'))),
  S('Dessine une longue queue pointue à droite.', 'Draw a long pointy tail on the right.', p('M310 180 Q350 190 372 225 Q340 218 308 215', F('#7fcf7a', -1))),
  S('Dessine deux grosses pattes.', 'Draw two big legs.', r(135, 240, 32, 48, 10, F('#7fcf7a', -2)), r(240, 240, 32, 48, 10, F('#7fcf7a', -2))),
  S('Dessine trois grandes plaques pointues sur le dos.', 'Draw three big pointy plates on the back.', plate(165, 46), plate(200, 50), plate(235, 46)),
  S('Ajoute deux plaques plus petites.', 'Add two smaller plates.', plate(130, 36), plate(270, 36)),
  S('Dessine un oeil et un sourire.', 'Draw an eye and a smile.', c(66, 193, 4, F(D)), p('M45 206 Q60 214 74 206')),
  S('Ajoute des taches rondes sur le dos.', 'Add round spots on the back.', c(170, 178, 9, F('#4fae6a', 1)), c(215, 200, 9, F('#4fae6a', 1)), c(250, 175, 9, F('#4fae6a', 1))),
], 'Colorie ton dinosaure!', 'Color your dinosaur!'));

L.push(A('princesse', '👸', 'Une princesse', 'A princess', 3, 20, 'personnages', [
  S('Dessine un rond pour la tête.', 'Draw a circle for the head.', c(200, 70, 34, F(SK))),
  S('Ajoute les cheveux : un bonnet et deux longues mèches.', 'Add the hair: a cap and two long locks.', p('M172 62 Q168 30 200 30 Q232 30 228 62 Q215 44 200 44 Q185 44 172 62 Z', F('#e0a030')), p('M174 52 Q145 100 160 160'), p('M226 52 Q255 100 240 160')),
  S('Dessine une couronne avec des pointes.', 'Draw a crown with points.', p('M178 40 L182 20 L192 32 L200 14 L208 32 L218 20 L222 40 Z', F(Y))),
  S('Dessine deux yeux et un sourire.', 'Draw two eyes and a smile.', eyes(188, 212, 68, 4), p('M188 82 Q200 92 212 82')),
  S('Dessine le haut de la robe.', 'Draw the top of the dress.', p('M178 104 L222 104 L226 150 L174 150 Z', F(Pk))),
  S('Dessine une grande jupe en forme de cloche.', 'Draw a big bell-shaped skirt.', p('M174 150 L226 150 L300 275 Q200 292 100 275 Z', F(Pk))),
  S('Ajoute deux bras avec des mains rondes.', 'Add two arms with round hands.', pg('180,108 178,122 138,150 128,138', F(SK)), pg('220,108 222,122 262,150 272,138', F(SK)), c(130, 144, 9, F(SK)), c(270, 144, 9, F(SK))),
  S('Ajoute un bijou, des points et une bordure en vagues.', 'Add a jewel, dots and a wavy hem.', c(200, 150, 7, F(Bl)), c(170, 215, 5, F(Y)), c(230, 205, 5, F(Y)), c(200, 245, 5, F(Y)), p('M120 268 q20 12 40 0 q20 12 40 0 q20 12 40 0 q20 12 40 0')),
], 'Colorie ta princesse!', 'Color your princess!', [
  p('M172 55 Q142 105 160 165 L240 165 Q258 105 228 55 Z', F('#e0a030', -3)),
]));

L.push(A('chevalier', '🛡️', 'Un chevalier', 'A knight', 3, 20, 'personnages', [
  S('Dessine un casque arrondi.', 'Draw a rounded helmet.', p('M150 122 Q148 40 200 38 Q252 40 250 122 Z', F(Gy))),
  S('Dessine la fente pour les yeux.', 'Draw the slit for the eyes.', r(160, 84, 80, 14, 7, F(D))),
  S('Ajoute une plume sur le casque.', 'Add a feather on the helmet.', p('M200 38 Q215 8 250 16 Q232 30 226 44', F(Rd))),
  S('Dessine le corps avec une ceinture.', 'Draw the body with a belt.', r(150, 135, 100, 85, 10, F(Gy)), r(150, 198, 100, 12, 0, F(Br))),
  S('Ajoute deux bras épais.', 'Add two thick arms.', r(108, 140, 36, 78, 14, F(Gy, -1)), r(256, 140, 36, 78, 14, F(Gy, -1))),
  S('Dessine deux jambes avec des bottes.', 'Draw two legs with boots.', r(160, 220, 32, 55, 8, F(Gy, -1)), r(208, 220, 32, 55, 8, F(Gy, -1)), e(176, 278, 26, 9, F(D)), e(224, 278, 26, 9, F(D))),
  S('Dessine un grand bouclier avec une croix.', 'Draw a big shield with a cross.', p('M52 140 H124 V196 Q88 242 52 196 Z', F(Bl)), p('M88 142 V228 M54 175 H122')),
  S('Ajoute une épée dans la main.', 'Add a sword in the hand.', pg('293,190 307,190 307,70 300,48 293,70', F(Gy)), l(284, 192, 316, 192), l(300, 192, 300, 216), c(300, 214, 11, F(Gy))),
], 'Colorie ton chevalier!', 'Color your knight!'));

L.push(A('sorciere', '🧙‍♀️', 'Une gentille sorcière', 'A friendly witch', 3, 20, 'personnages', [
  S('Dessine un rond pour la tête.', 'Draw a circle for the head.', c(200, 140, 42, F(SK))),
  S('Dessine un grand chapeau pointu avec un large rebord.', 'Draw a tall pointy hat with a wide brim.', p('M148 100 L205 12 L252 100 Z', F(Pu)), e(200, 100, 80, 14, F(Pu))),
  S('Dessine deux yeux, un petit nez et un sourire.', 'Draw two eyes, a little nose and a smile.', eyes(186, 214, 136, 5), p('M200 142 Q194 154 202 154'), p('M184 160 Q200 174 218 160')),
  S('Ajoute de longs cheveux de chaque côté.', 'Add long hair on each side.', p('M160 128 Q135 165 150 198', F('#d9742e', -1)), p('M240 128 Q265 165 250 198', F('#d9742e', -1))),
  S('Dessine une robe en forme de triangle.', 'Draw a triangle-shaped dress.', p('M178 182 L222 182 L272 288 L128 288 Z', F('#6b4fc9'))),
  S('Ajoute deux bras avec des mains rondes.', 'Add two arms with round hands.', pg('182,190 178,204 148,244 134,236', F('#6b4fc9')), pg('218,190 222,204 258,236 270,228', F('#6b4fc9')), c(142, 248, 9, F(SK)), c(262, 234, 9, F(SK))),
  S('Dessine un long balai dans les mains.', 'Draw a long broom in the hands.', p('M60 262 L345 222', F(Br)), p('M340 224 L382 204 L388 248 Z', F(Y))),
], 'Colorie ta sorcière!', 'Color your witch!', [
  star(205, 62, F(Y, 1)),
], 'halloween'));

L.push(A('licorne', '🦄', 'Une licorne', 'A unicorn', 3, 20, 'fantastique', [
  S('Dessine un gros ovale pour le corps.', 'Draw a big oval for the body.', e(215, 195, 100, 50, F('#f4f0ff'))),
  S('Dessine un long cou.', 'Draw a long neck.', p('M135 160 L125 92 L175 88 L190 150', F('#f4f0ff', -1))),
  S('Ajoute la tête avec un ovale.', 'Add the head with an oval.', e(120, 75, 42, 24, F('#f4f0ff'))),
  S('Dessine une corne pointue et une oreille.', 'Draw a pointy horn and an ear.', pg('128,56 150,12 148,58', F(Y)), pg('158,58 168,35 176,62', F('#f4f0ff', -1))),
  S('Dessine quatre pattes.', 'Draw four legs.', r(130, 238, 16, 50, 5, F('#f4f0ff', -2)), r(160, 238, 16, 50, 5, F('#f4f0ff', -2)), r(255, 238, 16, 50, 5, F('#f4f0ff', -2)), r(285, 238, 16, 50, 5, F('#f4f0ff', -2))),
  S('Dessine une longue crinière ondulée.', 'Draw a long wavy mane.', p('M165 62 Q218 78 182 106 Q228 120 186 138 Q216 150 197 162', F(Pk))),
  S('Dessine une belle queue qui frise.', 'Draw a pretty curly tail.', p('M312 170 Q352 165 348 205 Q346 235 322 238 Q336 210 312 195', F(Pu))),
  S('Ajoute un oeil, une narine et une étoile sur le corps.', 'Add an eye, a nostril and a star on the body.', c(108, 72, 4, F(D)), c(86, 82, 3, F(D)), star(235, 192, F(Y, 1))),
], 'Colorie ta licorne!', 'Color your unicorn!'));

L.push(A('dragon', '🐉', 'Un dragon gentil', 'A friendly dragon', 3, 22, 'fantastique', [
  S('Dessine un gros ovale pour le corps.', 'Draw a big oval for the body.', e(205, 195, 85, 52, F('#7fcf7a'))),
  S('Dessine un cou qui monte.', 'Draw a neck going up.', p('M140 165 Q110 130 125 92 L172 88 Q168 130 190 150', F('#7fcf7a', -1))),
  S('Ajoute la tête avec un ovale.', 'Add the head with an oval.', e(118, 78, 40, 24, F('#7fcf7a'))),
  S('Dessine deux cornes, un oeil et un sourire.', 'Draw two horns, an eye and a smile.', pg('108,58 100,32 124,54', F(Y)), pg('135,54 138,28 154,56', F(Y)), c(104, 72, 4, F(D)), p('M88 90 Q100 96 112 88')),
  S('Dessine une petite flamme devant la bouche.', 'Draw a little flame in front of the mouth.', p('M80 82 Q58 66 36 80 Q50 88 44 100 Q66 96 80 90 Z', F(O, 1))),
  S('Dessine une aile sur le dos.', 'Draw a wing on the back.', p('M205 143 Q215 75 295 60 Q285 95 305 108 Q275 115 278 138 Q262 142 250 151', F(Pu, -2))),
  S('Dessine une longue queue qui monte.', 'Draw a long tail curling up.', p('M288 185 Q335 180 352 140 Q360 175 330 215 Q305 225 285 212', F('#7fcf7a', -1))),
  S('Ajoute deux grosses pattes.', 'Add two big legs.', r(150, 238, 28, 48, 8, F('#7fcf7a', -3)), r(235, 238, 28, 48, 8, F('#7fcf7a', -3))),
], 'Colorie ton dragon!', 'Color your dragon!'));

L.push(A('sirene', '🧜‍♀️', 'Une sirène', 'A mermaid', 3, 20, 'fantastique', [
  S('Dessine un rond pour la tête.', 'Draw a circle for the head.', c(200, 60, 28, F(SK))),
  S('Ajoute les cheveux : un bonnet et deux longues mèches.', 'Add the hair: a cap and two long locks.', p('M172 62 Q168 30 200 30 Q232 30 228 62 Q215 44 200 44 Q185 44 172 62 Z', F('#d9742e')), p('M174 52 Q145 100 160 160'), p('M226 52 Q255 100 240 160')),
  S('Dessine deux yeux et un sourire.', 'Draw two eyes and a smile.', eyes(190, 210, 58, 4), p('M190 70 Q200 78 210 70')),
  S('Dessine le corps avec deux coquillages.', 'Draw the body with two shells.', p('M180 88 L220 88 L224 160 L176 160 Z', F(SK)), c(189, 112, 12, F(Pk)), c(211, 112, 12, F(Pk))),
  S('Ajoute deux bras avec des mains rondes.', 'Add two arms with round hands.', pg('180,94 176,108 140,128 130,114', F(SK)), pg('220,94 224,108 260,128 270,114', F(SK)), c(134, 122, 9, F(SK)), c(266, 122, 9, F(SK))),
  S('Dessine la queue de poisson qui finit en pointe.', 'Draw the fish tail ending in a point.', p('M176 160 Q168 215 200 250 Q232 215 224 160', F(Gr))),
  S('Dessine la grande nageoire au bout.', 'Draw the big fin at the end.', p('M200 248 Q150 245 132 288 Q168 276 200 262 Q232 276 268 288 Q250 245 200 248 Z', F(Bl))),
  S('Trace des écailles avec de petites courbes.', 'Draw scales with little curves.', p('M186 184 q7 7 14 0 M200 184 q7 7 14 0 M193 204 q7 7 14 0 M196 224 q7 7 8 0')),
], 'Colorie ta sirène!', 'Color your mermaid!', [
  p('M172 55 Q142 105 160 165 L240 165 Q258 105 228 55 Z', F('#d9742e', -3)),
  c(310, 80, 8, F(Lb)), c(330, 55, 5, F(Lb)), c(292, 50, 6, F(Lb)),
]));

const rungs = (() => { let d = ''; for (let x = 75; x <= 225; x += 20) d += `M${x} 108 V120 `; return d; })();
L.push(A('camion-pompier', '🚒', 'Un camion de pompier', 'A fire truck', 3, 20, 'vehicules', [
  S('Dessine un grand rectangle pour l\'arrière du camion.', 'Draw a big rectangle for the back of the truck.', r(50, 125, 200, 80, 6, F(Rd))),
  S('Dessine la cabine à l\'avant.', 'Draw the cab at the front.', p('M250 205 V135 Q250 112 275 112 H318 L352 160 V205 Z', F(Rd))),
  S('Ajoute la grande fenêtre de la cabine.', 'Add the big window of the cab.', p('M262 160 V128 H314 L338 160 Z', F(Lb))),
  S('Dessine l\'échelle sur le toit : deux lignes et des barreaux.', 'Draw the ladder on the roof: two lines and rungs.', l(60, 108, 240, 108), l(60, 120, 240, 120), p(rungs)),
  S('Dessine une barre en bas et trois grosses roues.', 'Draw a bar at the bottom and three big wheels.', r(50, 205, 305, 12, 3, F(D)), c(105, 225, 28, F(D)), c(200, 225, 28, F(D)), c(305, 225, 28, F(D))),
  S('Ajoute un petit rond au centre de chaque roue.', 'Add a little circle in the middle of each wheel.', c(105, 225, 11, F(Gy)), c(200, 225, 11, F(Gy)), c(305, 225, 11, F(Gy))),
  S('Dessine deux portes de rangement et un rouleau de tuyau.', 'Draw two storage doors and a hose reel.', r(145, 140, 45, 50, 3, F(Gy)), r(195, 140, 45, 50, 3, F(Gy)), c(100, 165, 24, F(Gy)), c(100, 165, 8, F(D))),
  S('Ajoute une sirène sur le toit et un phare.', 'Add a siren on the roof and a headlight.', c(285, 104, 8, F(Bl)), c(344, 185, 7, F(Y))),
], 'Colorie ton camion de pompier!', 'Color your fire truck!'));

export const projects = L;
