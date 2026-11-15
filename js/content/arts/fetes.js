// Arts plastiques — catégorie « fêtes et saisons » (année scolaire au Québec).
// Les images sont générées par de petites fonctions pour rester cohérentes et légères.
// Mode 'draw' : traits déjà faits #3a3f55, nouveaux traits #ff5d8f, dernière étape en couleurs.
// Mode 'craft' : l'élément nouveau de l'étape est entouré de rose #ff5d8f.
const K = '#3a3f55', PK = '#ff5d8f';
const n1 = (n) => Math.round(n * 10) / 10;
const st = (fill, w = 5) => `fill="${fill}" stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const P = (d, fill = 'none', w = 5, x = '') => `<path d="${d}" ${st(fill, w)}${x ? ' ' + x : ''}/>`;
const PF = (d, fill) => `<path data-f="1" d="${d}" fill="${fill}"/>`;
const C = (x, y, r, fill = 'none', w = 5) => `<circle cx="${x}" cy="${y}" r="${r}" ${st(fill, w)}/>`;
const CF = (x, y, r, fill) => `<circle data-f="1" cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const E = (x, y, rx, ry, fill = 'none', rot = 0, w = 5) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''} ${st(fill, w)}/>`;
const EF = (x, y, rx, ry, fill, rot = 0) => `<ellipse data-f="1" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${rot ? ` transform="rotate(${rot} ${x} ${y})"` : ''} fill="${fill}"/>`;
const R = (x, y, w, h, fill = 'none', rx = 6, sw = 5) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ${st(fill, sw)}/>`;
const RF = (x, y, w, h, fill, rx = 0) => `<rect data-f="1" x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}"/>`;
const L = (x1, y1, x2, y2, w = 5) => P(`M${x1} ${y1}L${x2} ${y2}`, 'none', w);
const dot = (x, y, r = 5) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${K}"/>`;
const eyes = (x, y, dx, r = 6) => dot(x - dx, y, r) + dot(x + dx, y, r);
const G = (t, s) => `<g transform="${t}">${s}</g>`;
const mir = (s) => G('translate(400 0) scale(-1 1)', s);
const poly = (pts, fill = 'none', w = 5) => P('M' + pts.map((p) => p.join(' ')).join('L') + 'Z', fill, w);
const Sc = (d, col, w = 8) => `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const Sd = (d, col, w = 6) => `<path data-f="1" d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const smile = (x, y, w, h = 0.8) => P(`M${x - w} ${y}Q${x} ${n1(y + w * h * 2)} ${x + w} ${y}`);
const DASH = 'stroke-dasharray="10 8"';
const heart = (x, y, s, fill) => P(`M${x} ${n1(y + 30 * s)}C${n1(x - 45 * s)} ${n1(y - 5 * s)} ${n1(x - 25 * s)} ${n1(y - 40 * s)} ${x} ${n1(y - 15 * s)}C${n1(x + 25 * s)} ${n1(y - 40 * s)} ${n1(x + 45 * s)} ${n1(y - 5 * s)} ${x} ${n1(y + 30 * s)}Z`, fill, s < 1 ? 4 : 5);
const star = (x, y, Rr, fill, n = 5, k = 0.45) => { const p = []; for (let i = 0; i < n * 2; i++) { const a = -Math.PI / 2 + (i * Math.PI) / n, r = i % 2 ? Rr * k : Rr; p.push([n1(x + r * Math.cos(a)), n1(y + r * Math.sin(a))]); } return poly(p, fill, 4); };
const rays = (x, y, r1, r2, n, fill) => { let s = ''; for (let i = 0; i < n; i++) { const a = (i * 2 * Math.PI) / n, w = (Math.PI / n) * 0.5; const q = (ang, r) => [n1(x + r * Math.cos(ang)), n1(y + r * Math.sin(ang))]; s += poly([q(a - w, r1), q(a, r2), q(a + w, r1)], fill, 4); } return s; };
const MP = [[0, -45], [9, -26], [24, -33], [20, -10], [42, -16], [30, 4], [40, 18], [8, 14], [5, 40]];
const mapleD = (x, y, s) => { const a = MP.map(([p, q]) => [n1(x + p * s), n1(y + q * s)]); const b = MP.slice().reverse().map(([p, q]) => [n1(x - p * s), n1(y + q * s)]); return 'M' + [...a, ...b].map((p) => p.join(' ')).join('L') + 'Z'; };
const maple = (x, y, s, fill) => P(mapleD(x, y, s), fill, 4) + L(x, n1(y + 38 * s), x, n1(y + 54 * s), 4);
const mapleF = (x, y, s, fill) => PF(mapleD(x, y, s), fill);
const leaf = (x, y, s, fill) => maple(x, y, s, fill) + P(`M${x} ${n1(y + 36 * s)}V${n1(y - 8 * s)}M${x} ${n1(y + 8 * s)}L${n1(x - 18 * s)} ${n1(y - 12 * s)}M${x} ${n1(y + 8 * s)}L${n1(x + 18 * s)} ${n1(y - 12 * s)}`, 'none', 3);
const petals = (x, y, r, col, n = 6) => { let s = ''; for (let i = 0; i < n; i++) { const a = (i * 360) / n; const rad = (a * Math.PI) / 180; s += E(n1(x + r * Math.cos(rad)), n1(y + r * Math.sin(rad)), n1(r * 0.62), n1(r * 0.4), col, a, 4); } return s; };
const egg = (x, y, s, fill) => P(`M${x} ${n1(y - 60 * s)}C${n1(x + 50 * s)} ${n1(y - 60 * s)} ${n1(x + 55 * s)} ${n1(y + 55 * s)} ${x} ${n1(y + 60 * s)}C${n1(x - 55 * s)} ${n1(y + 55 * s)} ${n1(x - 50 * s)} ${n1(y - 60 * s)} ${x} ${n1(y - 60 * s)}Z`, fill);
const drop = (x, y, s = 1, fill = '#9fd8ff') => P(`M${x} ${n1(y - 16 * s)}C${n1(x + 12 * s)} ${n1(y - 2 * s)} ${n1(x + 11 * s)} ${n1(y + 8 * s)} ${x} ${n1(y + 10 * s)}C${n1(x - 11 * s)} ${n1(y + 8 * s)} ${n1(x - 12 * s)} ${n1(y - 2 * s)} ${x} ${n1(y - 16 * s)}Z`, fill, 4);
let _s = 7; const rnd = () => (_s = (_s * 16807) % 2147483647) / 2147483647;
const dots = (col, cx, cy, rx, ry, n, r = 9) => { let s = ''; for (let i = 0; i < n; i++) { const a = rnd() * 6.283, d = Math.sqrt(rnd()); s += CF(n1(cx + rx * d * Math.cos(a)), n1(cy + ry * d * Math.sin(a)), r, col); } return s; };
const ring = (cx, cy, Rr, r, fill) => `<path fill-rule="evenodd" d="M${cx - Rr} ${cy}a${Rr} ${Rr} 0 1 0 ${2 * Rr} 0a${Rr} ${Rr} 0 1 0 ${-2 * Rr} 0ZM${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z" ${st(fill)}/>`;
const burst = (x, y, r, col, n = 12) => { let d = '', t = ''; for (let i = 0; i < n; i++) { const a = (i * 2 * Math.PI) / n, rr = i % 2 ? r * 0.8 : r; d += `M${n1(x + r * 0.28 * Math.cos(a))} ${n1(y + r * 0.28 * Math.sin(a))}L${n1(x + rr * Math.cos(a))} ${n1(y + rr * Math.sin(a))}`; t += CF(n1(x + (rr + 9) * Math.cos(a)), n1(y + (rr + 9) * Math.sin(a)), 4, col); } return Sc(d, col, 6) + t; };
const flake = (cx, cy, Rr, lv, col) => { let d = ''; for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3 - Math.PI / 2, c = Math.cos(a), s = Math.sin(a); if (lv === 0) d += `M${cx} ${cy}L${n1(cx + Rr * c)} ${n1(cy + Rr * s)}`; else { const f = lv === 1 ? 0.55 : 0.8, bl = lv === 1 ? 0.3 : 0.2, bx = cx + Rr * f * c, by = cy + Rr * f * s; for (const k of [-1, 1]) d += `M${n1(bx)} ${n1(by)}L${n1(bx + Rr * bl * Math.cos(a + (k * Math.PI) / 4))} ${n1(by + Rr * bl * Math.sin(a + (k * Math.PI) / 4))}`; } } return Sc(d, col, 6); };

// overlays (arrows, folds, cuts)
const head = (x, y, a) => `<path d="M0 0L-16 -9L-16 9Z" transform="translate(${x} ${y}) rotate(${a})" fill="${PK}"/>`;
const ang = (x1, y1, x2, y2) => n1((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI);
const arrow = (x1, y1, x2, y2) => `<path d="M${x1} ${y1}L${x2} ${y2}" fill="none" stroke="${PK}" stroke-width="7" stroke-linecap="round"/>` + head(x2, y2, ang(x1, y1, x2, y2));
const arc = (x1, y1, cx, cy, x2, y2) => `<path d="M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}" fill="none" stroke="${PK}" stroke-width="7" stroke-linecap="round"/>` + head(x2, y2, ang(cx, cy, x2, y2));
const cut = (d) => `<path d="${d}" fill="none" stroke="${PK}" stroke-width="5" ${DASH} stroke-linecap="round"/>`;
const fold = (d) => `<path d="${d}" fill="none" stroke="${K}" stroke-width="4" ${DASH} stroke-linecap="round"/>`;

// builder
const DEFS = '<defs><filter id="hl" x="-15%" y="-15%" width="130%" height="130%"><feMorphology in="SourceAlpha" operator="dilate" radius="4" result="d"/><feFlood flood-color="#ff5d8f"/><feComposite in2="d" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
const tf = (s, nw) => {
  s = s.replace(/<[^>]*data-f="1"[^>]*\/>/g, '').replace(/fill="#(?!3a3f55)[0-9a-fA-F]{3,6}"/g, 'fill="#fff"').replace(/stroke="#(?!3a3f55)[0-9a-fA-F]{3,6}"/g, `stroke="${K}"`);
  return nw ? s.replace(/#3a3f55/g, PK).replace(/stroke-width="[\d.]+"/g, 'stroke-width="8"') : s;
};
const build = (mode, steps) => steps.map(([, , o = ''], i) => {
  const last = i === steps.length - 1;
  let k = 0; for (let j = 0; j <= i; j++) if (steps[j][0][0] === '@') k = j;
  let s = '';
  for (let j = k; j <= i; j++) {
    const q = steps[j][0].replace(/^@/, '');
    if (last) s += q;
    else if (j < i) s += mode === 'draw' ? tf(q, false) : q;
    else s += mode === 'draw' ? tf(q, true) : `<g filter="url(#hl)">${q}</g>`;
  }
  return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${mode === 'draw' ? '' : DEFS}${s}${last ? '' : o}</svg>`;
});
const t2 = (s) => { const [fr, en] = s.split('|'); return { fr: fr.trim(), en: en.trim() }; };
const out = [];
const add = (id, emoji, title, level, minutes, theme, season, mats, mode, steps, adult = false) => {
  const svgs = build(mode, steps);
  out.push({ id: 'fetes-' + id, cat: 'fetes', emoji, title: t2(title), level, minutes, theme, season, materials: mats.split(';').map(t2), adult, steps: steps.map((s, i) => ({ svg: svgs[i], text: t2(s[1]) })) });
};

// ───────── AUTOMNE ─────────
{
  const brush = G('rotate(35 176 120)', R(168, 52, 16, 62, '#b98a5a', 5) + R(166, 108, 20, 20, '#c9ced9', 3) + E(176, 138, 11, 16, '#e8505b', 0, 4));
  add('feuille-empreinte', '🍁', "Feuilles d'érable en empreintes|Maple leaf prints", 1, 15, 'nature', 'automne',
    "Une feuille d'érable|A maple leaf;Gouache rouge, orange et jaune|Red, orange and yellow paint;Un pinceau|A brush;Du papier blanc|White paper", 'craft', [
      [leaf(110, 150, 2, '#e8a33c'), "Ramasse une belle feuille d'érable.|Pick up a pretty maple leaf."],
      [leaf(110, 150, 2, '#e8505b') + brush, "Peins le dessous de la feuille avec de la gouache rouge.|Paint the underside of the leaf with red paint."],
      [R(215, 40, 165, 220, '#fffaf0', 8), "Retourne la feuille sur le papier et appuie fort.|Flip the leaf onto the paper and press hard.", arc(165, 80, 205, 40, 235, 70)],
      [mapleF(297, 150, 1.9, '#e8505b') + P('M297 218V140M297 180L262 140M297 180L332 140', 'none', 3).replace(K, '#c0392b'), "Soulève la feuille doucement : voilà ton empreinte!|Lift the leaf slowly: there is your print!"],
      [mapleF(262, 78, 1.1, '#ff9a3c') + mapleF(340, 220, 1.1, '#ffd23f'), "Fais d'autres empreintes : orange et jaune.|Make more prints: orange and yellow."],
      [mapleF(340, 80, 0.8, '#c0392b') + mapleF(255, 225, 0.8, '#ff9a3c'), "Laisse sécher. Quelle belle page d'automne!|Let it dry. What a lovely autumn page!"],
    ]);
}
{
  const cols = ['#e8505b', '#ff9a3c', '#ffd23f', '#c0392b', '#ff9a3c'];
  const row = (y0, xs, dy) => xs.map((x, i) => maple(x, y0 + dy[i], 0.55, cols[i % 5])).join('');
  add('herisson-feuilles', '🦔', 'Un hérisson de feuilles|A leaf hedgehog', 2, 25, 'animaux', 'automne',
    "Carton brun|Brown cardboard;Papier de couleur d'automne|Autumn coloured paper;Ciseaux|Scissors;Colle|Glue;Crayon noir|Black pencil", 'craft', [
      [E(195, 195, 120, 65, '#b98a5a'), "Découpe un gros ovale dans du carton brun.|Cut a big oval from brown cardboard."],
      [P('M300 178Q350 196 338 226Q315 236 290 228Z', '#e9c79a') + dot(339, 215, 8), "Ajoute un museau pointu avec un nez noir.|Add a pointy snout with a black nose."],
      [row(146, [105, 145, 185, 225, 262], [14, 2, -2, 0, 12]), "Découpe des feuilles de papier et colle une rangée sur le dos.|Cut paper leaves and glue a row on the back."],
      [row(184, [92, 132, 172, 212, 250], [8, 0, -2, 0, 8]), "Colle une autre rangée de feuilles en dessous.|Glue another row of leaves below."],
      [E(150, 258, 22, 12, '#7a5230') + E(250, 258, 22, 12, '#7a5230') + C(312, 197, 7, '#fff', 4) + dot(314, 197, 3), "Dessine un œil et colle deux petites pattes.|Draw an eye and glue two little feet."],
    ]);
}
{
  const trunk = poly([[175, 272], [188, 220], [180, 190], [170, 160], [130, 112], [148, 100], [186, 140], [192, 72], [214, 72], [214, 140], [256, 106], [268, 120], [224, 176], [216, 210], [228, 272]], '#9c6b3f');
  add('arbre-doigts', '🌳', "Un arbre d'automne avec tes doigts|A fall tree with your fingers", 1, 15, 'nature', 'automne',
    "Gouache orange, rouge, jaune et brune|Orange, red, yellow and brown paint;Papier de bricolage|Craft paper;Un pinceau|A brush", 'craft', [
      [RF(0, 268, 400, 32, '#b5d99c') + trunk, "Peins un tronc brun avec des branches.|Paint a brown trunk with branches."],
      [dots('#ff9a3c', 140, 90, 70, 45, 16), "Trempe ton doigt dans la gouache orange et fais des points.|Dip your finger in orange paint and make dots."],
      [dots('#e8505b', 260, 90, 70, 45, 16), "Fais des points rouges de l'autre côté.|Make red dots on the other side."],
      [dots('#ffd23f', 200, 75, 95, 50, 18, 8), "Ajoute des points jaunes entre les autres.|Add yellow dots in between."],
      [dots('#b98a5a', 200, 282, 150, 8, 12, 7), "Fais quelques feuilles tombées au sol.|Make a few fallen leaves on the ground."],
    ]);
}
{
  const body = E(200, 175, 115, 80, '#ff9a3c');
  add('citrouille', '🎃', 'Une citrouille|A pumpkin', 1, 10, 'nature', 'automne', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur ou feutres|Colouring pencils or markers", 'draw', [
    [body, "Dessine un grand ovale bien large.|Draw a big wide oval."],
    [P('M168 98C128 135 128 215 168 252') + P('M232 98C272 135 272 215 232 252'), "Ajoute deux lignes courbes pour les côtes.|Add two curved lines for the ribs."],
    [P('M188 100L194 62L214 62L212 100Z', '#6aa84f'), "Dessine une petite tige en haut.|Draw a little stem on top."],
    [E(160, 72, 26, 12, '#5fbf6a', -25) + P('M214 72Q256 52 264 82Q254 68 240 78', 'none', 4), "Ajoute une feuille et une vrille.|Add a leaf and a curly vine."],
    [PF('M115 140C120 118 135 105 150 100C132 120 126 140 128 160Z', '#ffc47a') + EF(200, 262, 100, 10, '#d9c9a8'), "Colorie en orange, la tige en vert et ajoute une ombre.|Colour it orange, the stem green, and add a shadow."],
  ]);
}
{
  add('epouvantail', '🌾', 'Un épouvantail|A scarecrow', 3, 25, 'personnages', 'automne', "Feuille blanche|White paper;Crayons de couleur ou feutres|Colouring pencils or markers", 'draw', [
    [RF(0, 272, 400, 28, '#d9b86a') + R(192, 40, 16, 245, '#9c6b3f', 4) + R(60, 118, 280, 16, '#9c6b3f', 4), "Dessine une grande croix en bois : un poteau et une branche.|Draw a big wooden cross: a pole and a crossbar."],
    [P('M140 118H260L272 215H128Z', '#e8505b') + R(72, 110, 70, 34, '#e8505b', 12) + R(258, 110, 70, 34, '#e8505b', 12) + Sd('M150 140H250M146 170H254M142 198H258M175 120V212M225 120V212', '#ffd23f', 4), "Habille-le d'une chemise avec des manches.|Dress him in a shirt with sleeves."],
    [C(200, 82, 32, '#f3d9a8'), "Ajoute un rond pour la tête.|Add a circle for the head."],
    [E(200, 58, 54, 10, '#9c6b3f') + R(172, 22, 56, 38, '#9c6b3f', 6) + Sd('M172 50H228', '#e8505b', 8), "Dessine un chapeau de paille avec un large bord.|Draw a straw hat with a wide brim."],
    [eyes(200, 80, 12, 5) + poly([[194, 90], [206, 90], [200, 100]], '#ff9a3c', 3) + P('M178 108L186 114L194 108L202 114L210 108L218 114', 'none', 4), "Fais deux yeux, un nez triangle et un sourire cousu.|Make two eyes, a triangle nose and a stitched smile."],
    [P('M130 215L116 248M155 215L150 250M200 215V252M248 215L254 250M270 215L284 246M72 134L55 120M70 130L52 138M328 134L346 120M330 130L348 138', 'none', 5), "Ajoute de la paille qui dépasse de la chemise et des manches.|Add straw sticking out of the shirt and sleeves."],
    [CF(100, 90, 16, '#ffd23f') + CF(310, 58, 8, '#ffb24d'), "Colorie : chemise rouge, chapeau brun, ciel et champ d'automne.|Colour it: red shirt, brown hat, autumn sky and field."],
  ]);
}

// ───────── HALLOWEEN ─────────
{
  const gb = P('M110 250V140C110 55 290 55 290 140V250Q270 222 250 250Q230 278 210 250Q190 222 170 250Q150 278 130 250Q120 238 110 250Z', '#f4f6ff');
  add('fantome', '👻', 'Un fantôme|A ghost', 1, 10, 'personnages', 'halloween', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur|Colouring pencils", 'draw', [
    [RF(0, 0, 400, 300, '#a9a3e6') + CF(330, 55, 28, '#fff3b0') + gb, "Dessine un grand dôme avec le bas ondulé.|Draw a big dome with a wavy bottom."],
    [E(165, 150, 13, 18, K) + E(235, 150, 13, 18, K), "Dessine deux yeux ovales.|Draw two oval eyes."],
    [E(200, 205, 16, 20, K), "Fais une grande bouche ronde.|Make a big round mouth."],
    [P('M110 170Q70 160 60 190Q80 198 110 208', '#f4f6ff') + mir(P('M110 170Q70 160 60 190Q80 198 110 208', '#f4f6ff')), "Ajoute deux petits bras.|Add two little arms."],
    [EF(132, 186, 14, 8, '#ffb3c7') + EF(268, 186, 14, 8, '#ffb3c7'), "Colorie le ciel du soir et ajoute des joues roses.|Colour the evening sky and add pink cheeks."],
  ]);
}
{
  const w = P('M172 150C130 95 70 100 30 140Q58 142 64 165Q86 150 98 178Q118 160 134 190Q152 172 176 196Z', '#7a5bb5');
  add('chauve-souris', '🦇', 'Une chauve-souris|A bat', 1, 10, 'animaux', 'halloween', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur|Colouring pencils", 'draw', [
    [RF(0, 0, 400, 300, '#ffb24d') + CF(335, 58, 32, '#fff3b0') + E(200, 168, 30, 48, '#5b3f8c') + C(200, 112, 30, '#5b3f8c'), "Dessine un ovale pour le corps et un rond pour la tête.|Draw an oval for the body and a circle for the head."],
    [poly([[178, 92], [176, 56], [196, 84]], '#5b3f8c') + poly([[222, 92], [224, 56], [204, 84]], '#5b3f8c'), "Ajoute deux oreilles pointues.|Add two pointy ears."],
    [w, "Dessine une grande aile avec le bord qui fait des vagues.|Draw a big wing with a wavy edge."],
    [mir(w), "Fais la même aile de l'autre côté.|Draw the same wing on the other side."],
    [C(190, 108, 7, '#fff', 4) + C(210, 108, 7, '#fff', 4) + dot(190, 109, 3) + dot(210, 109, 3) + poly([[192, 128], [199, 128], [196, 138]], '#fff', 3) + poly([[201, 128], [208, 128], [204, 138]], '#fff', 3), "Dessine des yeux et deux petites dents.|Draw eyes and two little fangs."],
    [EF(200, 168, 14, 30, '#7a5bb5'), "Colorie la chauve-souris en violet et le ciel en orange.|Colour the bat purple and the sky orange."],
  ]);
}
{
  const slit = (x, y1, y2) => P(`M${x} ${y1}V${y2}`, 'none', 4, DASH);
  let s1 = '', s2 = '';
  for (let x = 95; x <= 305; x += 35) { s1 += slit(x, 190, 132); s2 += L(x, 95, x, 205, 4); }
  add('lanterne-papier', '🎃', 'Une lanterne de citrouille en papier|A paper pumpkin lantern', 3, 30, 'decorations', 'halloween',
    "Une feuille de papier orange|An orange sheet of paper;Papier noir|Black paper;Ciseaux|Scissors;Colle ou ruban adhésif|Glue or tape;Règle|Ruler", 'craft', [
      [R(60, 110, 280, 80, '#ff9a3c', 8), "Plie une feuille orange en deux, dans le sens de la longueur.|Fold an orange sheet in half lengthwise.", arc(300, 80, 345, 100, 300, 112) + fold('M60 190H340')],
      [s1, "Coupe des fentes à partir du pli, mais pas jusqu'au bout.|Cut slits from the fold, but not all the way."],
      [R(60, 70, 280, 160, '#ff9a3c', 8) + s2, "Ouvre la feuille : tu vois toutes les fentes.|Open the sheet: you see all the slits."],
      ['@' + P('M120 85C70 135 70 215 120 250H280C330 215 330 135 280 85Z', '#ff9a3c') + P('M200 85V250M160 85C128 140 128 200 160 250M240 85C272 140 272 200 240 250', 'none', 4) + R(118, 74, 164, 16, '#e07a1f', 5) + R(118, 244, 164, 16, '#e07a1f', 5), "Roule la feuille en cylindre et colle les deux bouts.|Roll the sheet into a cylinder and glue the ends."],
      [P('M130 80C130 20 270 20 270 80', 'none', 6), "Colle une bande de papier noir en haut pour faire une anse.|Glue a black paper strip on top as a handle."],
      [poly([[160, 150], [186, 150], [173, 128]], K) + poly([[214, 150], [240, 150], [227, 128]], K) + poly([[158, 188], [176, 208], [190, 190], [208, 208], [224, 190], [242, 188], [226, 224], [174, 224]], K), "Colle des yeux et une bouche en papier noir.|Glue black paper eyes and a mouth."],
    ]);
}
{
  const legs = P('M180 135Q125 80 75 95M176 155Q105 120 55 150M176 178Q105 175 62 215M182 198Q130 230 105 275');
  add('araignee', '🕷️', 'Une araignée|A spider', 2, 15, 'animaux', 'halloween', "Feuille blanche|White paper;Crayon de plomb|Pencil;Feutre noir et crayons de couleur|Black marker and colouring pencils", 'draw', [
    [RF(0, 0, 400, 300, '#ffe3b3') + L(200, 0, 200, 122, 4) + E(200, 190, 55, 62, '#6b4fa0'), "Dessine un fil et un gros ovale pour le corps.|Draw a thread and a big oval for the body."],
    [C(200, 112, 30, '#6b4fa0'), "Ajoute un rond pour la tête, en haut.|Add a circle for the head, at the top."],
    [legs, "Dessine quatre pattes pliées sur le côté gauche.|Draw four bent legs on the left side."],
    [mir(legs), "Dessine les quatre pattes du côté droit.|Draw the four legs on the right side."],
    [C(188, 108, 9, '#fff', 4) + C(212, 108, 9, '#fff', 4) + dot(190, 109, 4) + dot(210, 109, 4) + P('M190 126Q200 134 210 126', 'none', 4), "Fais des yeux et un petit sourire.|Make eyes and a little smile."],
    [EF(200, 188, 15, 30, '#ff9a3c') + EF(200, 188, 32, 12, '#ff9a3c'), "Colorie l'araignée en violet avec une croix orange.|Colour the spider purple with an orange cross."],
  ]);
}
{
  const tube = R(150, 70, 100, 170, '#d9b88a', 10) + E(200, 70, 50, 14, '#c79f6b', 0, 4);
  const band = (y, rot = 0) => G(`rotate(${rot} 200 ${y + 8})`, R(144, y, 112, 16, '#fff', 6, 4));
  add('momie', '🧻', 'Une momie en rouleau|A toilet-roll mummy', 2, 20, 'personnages', 'halloween',
    "Un rouleau de papier de toilette vide|An empty toilet paper roll;Papier blanc en bandes|White paper strips;Colle|Glue;Yeux mobiles ou papier|Googly eyes or paper;Feutre noir|Black marker", 'craft', [
      [tube, "Prends un rouleau de papier de toilette vide.|Take an empty toilet paper roll."],
      [band(86, -4) + band(108, 3) + band(190, 4) + band(212, -3), "Colle des bandes de papier blanc en haut et en bas.|Glue white paper strips at the top and bottom."],
      [R(152, 134, 96, 40, K, 8, 4), "Laisse une fente noire au milieu pour les yeux.|Leave a black slot in the middle for the eyes."],
      [C(178, 154, 12, '#fff', 4) + C(222, 154, 12, '#fff', 4) + dot(181, 155, 5) + dot(219, 155, 5), "Colle deux yeux.|Glue two eyes."],
      [band(124, -12) + band(168, 10), "Colle deux bandes qui passent en travers du visage.|Glue two strips crossing over the face."],
    ]);
}

// ───────── HIVER ─────────
add('flocon', '❄️', 'Un flocon de neige|A snowflake', 2, 10, 'nature', 'hiver', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur|Colouring pencils", 'draw', [
  [RF(0, 0, 400, 300, '#4f86c6') + flake(200, 150, 120, 0, '#fff'), "Dessine trois lignes qui se croisent au milieu : ça fait six bras.|Draw three lines crossing in the middle: that makes six arms."],
  [flake(200, 150, 120, 1, '#fff'), "Ajoute deux petites branches sur chaque bras.|Add two little branches on each arm."],
  [flake(200, 150, 120, 2, '#fff'), "Ajoute deux autres branches plus près du bout.|Add two more branches closer to the tip."],
  [(() => { let s = C(200, 150, 14, '#fff', 4); for (let i = 0; i < 6; i++) { const a = (i * Math.PI) / 3 - Math.PI / 2; s += C(n1(200 + 128 * Math.cos(a)), n1(150 + 128 * Math.sin(a)), 7, '#fff', 4); } return s; })(), "Fais un rond au milieu et un point au bout de chaque bras.|Make a circle in the middle and a dot at the end of each arm."],
  [Sd('M70 40L80 40M330 250L340 250', '#fff', 8) + CF(60, 250, 6, '#fff') + CF(340, 50, 6, '#fff') + CF(40, 140, 5, '#fff') + CF(365, 160, 5, '#fff'), "Colorie le fond en bleu et laisse le flocon blanc.|Colour the background blue and leave the snowflake white."],
]);
{
  add('bonhomme-neige', '⛄', 'Un bonhomme de neige|A snowman', 1, 12, 'personnages', 'hiver', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur|Colouring pencils", 'draw', [
    [RF(0, 0, 400, 300, '#cfe8ff') + RF(0, 258, 400, 42, '#fff') + C(200, 224, 62, '#fff'), "Dessine un grand cercle en bas.|Draw a big circle at the bottom."],
    [C(200, 148, 46, '#fff'), "Dessine un cercle moyen au-dessus.|Draw a medium circle above it."],
    [C(200, 84, 34, '#fff'), "Dessine un petit cercle pour la tête.|Draw a small circle for the head."],
    [P('M156 140L92 105M122 119L102 86M122 119L90 128') + mir(P('M156 140L92 105M122 119L102 86M122 119L90 128')), "Ajoute deux bras en branches.|Add two branch arms."],
    [eyes(200, 76, 12, 5) + poly([[200, 86], [238, 92], [200, 98]], '#ff9a3c', 4) + dot(180, 100, 3) + dot(190, 106, 3) + dot(210, 106, 3) + dot(220, 100, 3), "Fais des yeux, un nez carotte et un sourire de cailloux.|Make eyes, a carrot nose and a pebble smile."],
    [R(172, 18, 56, 40, K, 4) + E(200, 58, 46, 9, K, 0, 4) + Sd('M174 48H226', '#e8505b', 8), "Mets-lui un chapeau haut de forme.|Give him a top hat."],
    [P('M164 112Q200 130 236 112L240 132Q200 150 160 132Z', '#e8505b') + P('M168 134L158 172L182 166Z', '#e8505b') + dot(200, 160, 5) + dot(200, 182, 5) + dot(200, 204, 5), "Ajoute une écharpe et trois gros boutons.|Add a scarf and three big buttons."],
    [CF(70, 50, 5, '#fff') + CF(320, 80, 5, '#4f86c6') + CF(350, 40, 5, '#4f86c6') + CF(40, 130, 5, '#4f86c6'), "Colorie : chapeau noir, écharpe rouge, nez orange, ciel bleu.|Colour: black hat, red scarf, orange nose, blue sky."],
  ]);
}
{
  const mit = (x, y, fill, flip) => G(`translate(${x} ${y})${flip ? ' scale(-1 1)' : ''}`, P('M-34 0V-72C-34 -112 34 -112 34 -72V0Z', fill) + E(-40, -34, 13, 24, fill, 20, 4));
  const dm = (x, y, flip) => G(`translate(${x} ${y})${flip ? ' scale(-1 1)' : ''}`, P('M-34 0V-72C-34 -112 34 -112 34 -72V0Z', 'none', 5, DASH) + E(-40, -34, 13, 24, 'none', 20, 4).replace('<ellipse', '<ellipse ' + DASH));
  const cuff = (x) => R(x - 38, -6 + 235, 76, 26, '#fff', 6, 4);
  add('mitaines', '🧤', 'Des mitaines en papier|Paper mittens', 2, 20, 'decorations', 'hiver', "Papier de couleur|Coloured paper;Papier blanc|White paper;Crayon, ciseaux|Pencil, scissors;Colle|Glue;Ficelle ou laine|String or yarn", 'craft', [
    [R(30, 40, 340, 220, '#cfe8ff', 10), "Pose ta main sur du papier, le pouce bien écarté.|Lay your hand on paper, thumb stretched out.", arc(70, 70, 120, 55, 150, 90)],
    [dm(130, 235, false) + dm(270, 235, true), "Trace le contour de ta main deux fois avec un crayon.|Trace around your hand twice with a pencil."],
    [mit(130, 235, '#e8505b', false) + mit(270, 235, '#e8505b', true), "Coupe sur la ligne : tu as deux mitaines.|Cut along the line: you have two mittens."],
    [cuff(130) + cuff(270), "Colle une bande blanche au poignet de chaque mitaine.|Glue a white strip on each mitten's wrist."],
    [heart(130, 165, 0.7, '#fff') + star(270, 165, 20, '#ffd23f'), "Décore avec un cœur et une étoile.|Decorate with a heart and a star."],
    [P('M164 240Q200 290 236 240', 'none', 4), "Relie les deux mitaines avec une ficelle.|Join the two mittens with a string."],
  ]);
}
{
  const fl = P('M128 160C95 190 90 225 108 232C122 205 130 190 140 185Z', '#2f3550');
  add('pingouin', '🐧', 'Un pingouin|A penguin', 2, 15, 'animaux', 'hiver', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur ou feutres|Colouring pencils or markers", 'draw', [
    [RF(0, 0, 400, 300, '#d9efff') + RF(0, 262, 400, 38, '#fff') + P('M200 50C140 50 120 130 125 190C128 245 160 270 200 270C240 270 272 245 275 190C280 130 260 50 200 50Z', '#2f3550'), "Dessine un grand ovale pointu en haut : le corps.|Draw a big oval, pointy at the top: the body."],
    [P('M200 124C160 128 150 190 160 225C170 255 190 262 200 262C210 262 230 255 240 225C250 190 240 128 200 124Z', '#fff'), "Dessine un ventre blanc dedans.|Draw a white belly inside."],
    [C(178, 96, 10, '#fff', 4) + C(222, 96, 10, '#fff', 4) + dot(180, 97, 4) + dot(220, 97, 4) + poly([[188, 112], [212, 112], [200, 132]], '#ff9a3c', 4), "Ajoute deux yeux et un bec orange.|Add two eyes and an orange beak."],
    [fl + mir(fl), "Dessine deux ailes (nageoires) sur les côtés.|Draw two flippers on the sides."],
    [E(168, 274, 28, 10, '#ff9a3c', 0, 4) + E(232, 274, 28, 10, '#ff9a3c', 0, 4), "Ajoute deux grands pieds plats.|Add two big flat feet."],
    [CF(60, 60, 5, '#fff') + CF(330, 90, 5, '#fff') + CF(350, 40, 5, '#fff'), "Colorie : corps bleu foncé, bec et pieds orange.|Colour: dark blue body, orange beak and feet."],
  ]);
}
{
  add('ours-polaire', '🐻‍❄️', 'Un ours polaire|A polar bear', 3, 25, 'animaux', 'hiver', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons bleus et gris|Blue and grey pencils", 'draw', [
    [RF(0, 0, 400, 300, '#cfe8ff') + RF(0, 245, 400, 55, '#fff') + E(200, 205, 100, 78, '#f4f7ff'), "Dessine un gros ovale pour le corps.|Draw a big oval for the body."],
    [C(200, 100, 58, '#f4f7ff'), "Pose une grosse tête ronde sur le corps.|Put a big round head on the body."],
    [C(152, 55, 19, '#f4f7ff') + C(248, 55, 19, '#f4f7ff') + EF(152, 58, 8, 7, '#ffb3c7') + EF(248, 58, 8, 7, '#ffb3c7'), "Ajoute deux petites oreilles rondes.|Add two small round ears."],
    [E(200, 120, 30, 23, '#fff') + E(200, 108, 12, 8, K), "Dessine le museau : un ovale et un petit nez noir.|Draw the snout: an oval and a small black nose."],
    [eyes(200, 92, 26, 6) + P('M200 116V128M200 128Q190 140 178 132M200 128Q210 140 222 132', 'none', 4), "Fais deux yeux et une bouche.|Make two eyes and a mouth."],
    [E(148, 262, 34, 22, '#f4f7ff') + E(252, 262, 34, 22, '#f4f7ff') + P('M136 268V275M148 270V277M160 268V275M240 268V275M252 270V277M264 268V275', 'none', 3), "Dessine deux grosses pattes de devant avec des griffes.|Draw two big front paws with claws."],
    [EF(200, 240, 110, 8, '#dcecff') + CF(60, 50, 5, '#fff') + CF(340, 70, 5, '#fff') + CF(330, 130, 5, '#fff'), "Colorie le ciel en bleu clair et ajoute des ombres bleues sur l'ours.|Colour the sky light blue and add blue shadows on the bear."],
  ]);
}

// ───────── NOËL ─────────
add('sapin', '🎄', 'Un sapin de Noël|A Christmas tree', 1, 12, 'decorations', 'noel', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur ou feutres|Colouring pencils or markers", 'draw', [
  [RF(0, 262, 400, 38, '#e6f1ff') + R(185, 238, 30, 40, '#9c6b3f', 3) + poly([[200, 125], [320, 245], [80, 245]], '#3fa65b'), "Dessine un tronc et un grand triangle.|Draw a trunk and a big triangle."],
  [poly([[200, 75], [285, 175], [115, 175]], '#4fba6a'), "Ajoute un triangle moyen au-dessus.|Add a medium triangle above."],
  [poly([[200, 35], [255, 110], [145, 110]], '#5ccf7a'), "Ajoute un petit triangle tout en haut.|Add a small triangle at the very top."],
  [star(200, 30, 22, '#ffd23f'), "Dessine une étoile sur la pointe.|Draw a star on the tip."],
  [C(165, 222, 10, '#e8505b', 4) + C(235, 215, 10, '#6fb7e9', 4) + C(200, 150, 10, '#ffd23f', 4) + C(160, 155, 9, '#e8505b', 4) + C(240, 150, 9, '#6fb7e9', 4) + C(200, 100, 8, '#e8505b', 4), "Dessine des boules rondes sur les branches.|Draw round balls on the branches."],
  [EF(200, 280, 90, 6, '#d9e6f5'), "Colorie le sapin en vert, les boules en couleurs.|Colour the tree green and the balls in bright colours."],
]);
{
  const leaves = (() => { let s = ''; for (let i = 0; i < 14; i++) { const a = (i * 360) / 14, r = (a * Math.PI) / 180; s += E(n1(200 + 90 * Math.cos(r)), n1(150 + 90 * Math.sin(r)), 24, 10, i % 2 ? '#2e8b57' : '#3fa65b', a + 90 + (i % 2 ? 20 : -20), 4); } return s; })();
  const cand = [[200, 60, '#8a5fc9'], [290, 150, '#8a5fc9'], [200, 240, '#f08cb6'], [110, 150, '#8a5fc9']];
  add('couronne-avent', '🕯️', "Une couronne de l'Avent|An Advent wreath", 2, 30, 'decorations', 'noel', "Une assiette en carton|A cardboard plate;Gouache verte|Green paint;Papier vert, violet et rose|Green, purple and pink paper;Papier jaune et rouge|Yellow and red paper;Colle, ciseaux|Glue, scissors", 'craft', [
    [C(200, 150, 120, '#f1e1c0'), "Prends une assiette en carton et repère le centre.|Take a cardboard plate and find the middle.", cut('M140 150a60 60 0 1 0 120 0a60 60 0 1 0 -120 0Z')],
    ['@' + ring(200, 150, 120, 60, '#f1e1c0'), "Coupe le rond du milieu avec des ciseaux.|Cut out the middle circle with scissors."],
    [ring(200, 150, 120, 60, '#5fbf6a'), "Peins l'anneau en vert.|Paint the ring green."],
    [leaves, "Colle des feuilles de papier vert tout autour.|Glue green paper leaves all around."],
    [cand.map(([x, y, c]) => C(x, y, 17, c) + C(x, y, 7, '#ffd23f', 3)).join(''), "Colle quatre bougies : trois violettes et une rose.|Glue four candles: three purple and one pink."],
    [CF(150, 85, 7, '#e8505b') + CF(160, 95, 7, '#e8505b') + CF(250, 215, 7, '#e8505b') + CF(240, 208, 7, '#e8505b') + CF(120, 200, 7, '#e8505b') + CF(285, 95, 7, '#e8505b'), "Ajoute des petites baies rouges.|Add little red berries."],
  ]);
}
{
  const ant = (d) => Sc(d, '#8a5a2b', 9);
  const al = ant('M172 114Q152 64 124 36M150 78Q124 72 106 82M138 56Q126 34 138 20');
  add('renne', '🦌', 'Un renne au nez rouge|A red-nosed reindeer', 3, 25, 'animaux', 'noel', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur ou feutres|Colouring pencils or markers", 'draw', [
    [RF(0, 0, 400, 300, '#d9efff') + P('M148 125Q200 100 252 125Q250 215 200 258Q150 215 148 125Z', '#b8803f'), "Dessine une tête en forme de goutte, large en haut.|Draw a drop-shaped head, wide at the top."],
    [E(200, 226, 36, 28, '#e9c79a') + C(200, 238, 15, '#e8505b'), "Ajoute un museau et un gros nez rouge.|Add a snout and a big red nose."],
    [E(126, 136, 34, 14, '#b8803f', -30) + E(274, 136, 34, 14, '#b8803f', 30), "Dessine deux grandes oreilles sur les côtés.|Draw two big ears on the sides."],
    [al, "Dessine un bois qui se divise, à gauche.|Draw a branching antler on the left."],
    [mir(al), "Fais le même bois à droite.|Draw the same antler on the right."],
    [eyes(200, 168, 26, 7), "Ajoute deux yeux.|Add two eyes."],
    [CF(70, 60, 5, '#fff') + CF(330, 70, 5, '#fff') + CF(350, 200, 5, '#fff') + CF(50, 220, 5, '#fff'), "Colorie le renne en brun et son nez en rouge brillant.|Colour the reindeer brown and his nose bright red."],
  ]);
}
{
  const str = P('M20 40Q200 90 380 40', 'none', 4);
  const bal = (x, y, c) => L(x, y, x, y + 24, 3) + C(x, y + 90, 46, c);
  const cap = (x, y) => R(x - 15, y + 22, 30, 16, '#ffd23f', 3, 3);
  add('ornements', '🔔', 'Des boules de Noël peintes|Painted Christmas baubles', 2, 25, 'decorations', 'noel', "Feuille de carton blanc|White cardboard;Gouache|Paint;Pinceaux|Brushes;Ficelle|String", 'craft', [
    [str, "Dessine une ficelle qui fait une courbe.|Draw a curved string."],
    [bal(90, 55, '#e8505b') + bal(200, 65, '#6fb7e9') + bal(310, 55, '#5fbf6a'), "Peins trois grosses boules : rouge, bleue et verte.|Paint three big balls: red, blue and green."],
    [cap(90, 55) + cap(200, 65) + cap(310, 55), "Ajoute un petit capuchon jaune sur chaque boule.|Add a little yellow cap on each ball."],
    [Sc('M58 138Q90 122 122 138M52 156Q90 140 128 156M58 174Q90 158 122 174', '#fff', 7), "Fais des rayures blanches sur la boule rouge.|Paint white stripes on the red ball."],
    [[[170, 140], [200, 125], [230, 140], [185, 165], [215, 165], [172, 188], [228, 188]].map(([x, y]) => CF(x, y, 7, '#fff')).join(''), "Fais des points blancs avec ton doigt sur la boule bleue.|Dab white dots with your finger on the blue ball."],
    [star(310, 150, 26, '#ffd23f'), "Peins une étoile jaune sur la boule verte.|Paint a yellow star on the green ball."],
  ]);
}
{
  const bas = P('M150 40H250V150C250 190 292 205 292 245C292 275 252 282 226 270C186 255 150 218 150 165Z', '#e8505b');
  add('bas-noel', '🧦', 'Un bas de Noël|A Christmas stocking', 2, 25, 'decorations', 'noel', "Papier rouge|Red paper;Papier blanc, bleu et jaune|White, blue and yellow paper;Ciseaux, colle|Scissors, glue;Ficelle|String", 'craft', [
    [bas, "Dessine un grand bas sur du papier rouge et découpe-le.|Draw a big stocking on red paper and cut it out."],
    [R(142, 36, 116, 38, '#fff', 10), "Colle une bande blanche en haut.|Glue a white band at the top."],
    [E(164, 205, 20, 28, '#6fb7e9', -20) + E(266, 262, 30, 20, '#6fb7e9', -15), "Colle un talon et un bout bleus.|Glue a blue heel and toe."],
    [star(200, 125, 22, '#ffd23f') + heart(200, 190, 0.6, '#fff'), "Décore le bas avec une étoile et un cœur.|Decorate the stocking with a star and a heart."],
    [R(172, 4, 36, 32, '#6fb7e9', 4, 4) + L(190, 4, 190, 36, 4) + C(236, 22, 16, '#ffd23f', 4), "Ajoute un petit cadeau et une boule qui dépassent.|Add a little gift and a ball sticking out."],
    [P('M254 48C298 38 296 92 256 86', 'none', 5), "Colle une petite boucle de ficelle pour l'accrocher.|Glue a little loop of string to hang it."],
  ]);
}
add('carte-noel', '✉️', 'Une carte de Noël|A Christmas card', 1, 15, 'cartes', 'noel', "Papier épais|Thick paper;Papier vert et brun|Green and brown paper;Gouache ou feutres|Paint or markers;Colle, ciseaux|Glue, scissors", 'craft', [
  [R(110, 30, 180, 240, '#fff8e8', 8), "Plie une feuille en deux pour faire une carte.|Fold a sheet in half to make a card.", fold('M110 30V270') + arc(330, 70, 355, 150, 330, 230)],
  [poly([[200, 62], [238, 112], [162, 112]], '#3fa65b') + poly([[200, 100], [250, 160], [150, 160]], '#4fba6a') + poly([[200, 148], [262, 214], [138, 214]], '#5ccf7a'), "Colle trois triangles verts, du plus petit au plus grand.|Glue three green triangles, smallest to biggest."],
  [R(188, 214, 24, 26, '#9c6b3f', 3, 4) + star(200, 50, 16, '#ffd23f'), "Ajoute un tronc brun et une étoile jaune.|Add a brown trunk and a yellow star."],
  [CF(178, 195, 7, '#e8505b') + CF(225, 190, 7, '#6fb7e9') + CF(200, 135, 7, '#ffd23f') + CF(180, 140, 6, '#e8505b') + CF(222, 142, 6, '#6fb7e9') + CF(200, 90, 6, '#e8505b'), "Fais des boules avec le bout de ton doigt et de la gouache.|Make balls with your fingertip and paint."],
  [Sc('M130 258Q145 246 160 258T190 258T220 258T250 258', '#3a3f55', 4), "Écris « Joyeux Noël » sous le sapin.|Write “Merry Christmas” under the tree."],
]);
{
  const wing = P('M175 160C120 90 50 100 48 175C70 160 90 165 100 185C115 170 135 180 150 205Z', '#fff8d6');
  add('ange', '👼', 'Un ange|An angel', 3, 25, 'personnages', 'noel', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur dorés et bleus|Gold and blue pencils", 'draw', [
    [RF(0, 0, 400, 300, '#a9bdf0') + wing + mir(wing), "Dessine deux grandes ailes qui s'ouvrent.|Draw two big wings spreading open."],
    [P('M178 122H222L262 262Q200 282 138 262Z', '#fff'), "Dessine une robe en forme de cloche.|Draw a bell-shaped gown."],
    [C(200, 92, 34, '#f5d3a8') + P('M166 92C160 48 240 48 234 92C225 70 175 70 166 92Z', '#f0c75e'), "Ajoute un rond pour la tête, avec des cheveux.|Add a circle for the head, with hair."],
    [`<ellipse cx="200" cy="44" rx="38" ry="10" fill="none" stroke="#ffd23f" stroke-width="7"/>`, "Dessine un halo au-dessus de la tête.|Draw a halo above the head."],
    [E(176, 165, 12, 28, '#fff', -35) + E(224, 165, 12, 28, '#fff', 35) + C(200, 188, 10, '#f5d3a8', 4), "Ajoute deux bras et des mains jointes.|Add two arms and clasped hands."],
    [P('M178 94Q185 100 192 94M208 94Q215 100 222 94', 'none', 4) + P('M192 108Q200 114 208 108', 'none', 4), "Dessine des yeux fermés et un petit sourire.|Draw closed eyes and a little smile."],
    [EF(180, 106, 8, 5, '#ffb3c7') + EF(220, 106, 8, 5, '#ffb3c7') + CF(60, 60, 5, '#fff') + CF(340, 50, 5, '#fff') + CF(350, 220, 5, '#fff'), "Colorie le ciel en bleu et le halo en doré.|Colour the sky blue and the halo gold."],
  ]);
}

// ───────── SAINT-VALENTIN ─────────
{
  const half = 'M200 95C175 55 112 70 120 125C128 170 175 200 200 235';
  add('carte-coeur', '💌', 'Une carte en cœur|A heart card', 1, 15, 'cartes', 'saint-valentin', "Papier rouge ou rose|Red or pink paper;Une carte blanche|A white card;Ciseaux, colle|Scissors, glue;Crayon|Pencil", 'craft', [
    [R(100, 60, 100, 180, '#ffb3c7', 6), "Plie une feuille de papier rouge en deux.|Fold a sheet of red paper in half.", arc(60, 70, 40, 160, 90, 230)],
    [P(half, 'none', 5, DASH), "Dessine une moitié de cœur le long du pli.|Draw half a heart along the fold."],
    ['', "Coupe sur la ligne avec des ciseaux.|Cut along the line with scissors.", cut(half)],
    ['@' + R(60, 25, 280, 250, '#fff8e8', 10) + heart(200, 145, 2.6, '#e8505b'), "Ouvre : un cœur parfait! Colle-le sur une carte.|Open it: a perfect heart! Glue it on a card."],
    [Sc('M120 254Q140 242 160 254T200 254T240 254T280 254', K, 4), "Écris un mot doux sous le cœur.|Write a sweet message under the heart."],
  ]);
}
{
  const bigL = G('rotate(-55 140 105)', heart(140, 105, 1.7, '#ff6f91')), bigR = G('rotate(55 260 105)', heart(260, 105, 1.7, '#ff6f91'));
  const smL = G('rotate(-115 150 200)', heart(150, 200, 1.2, '#ffc75f')), smR = G('rotate(115 250 200)', heart(250, 200, 1.2, '#ffc75f'));
  add('coeur-papillon', '🦋', 'Un papillon fait de cœurs|A butterfly made of hearts', 2, 20, 'animaux', 'saint-valentin', "Papier rose, jaune et brun|Pink, yellow and brown paper;Ciseaux, colle|Scissors, glue;Feutre noir|Black marker", 'craft', [
    [bigL + bigR, "Découpe deux grands cœurs et colle-les en V, pointes vers le milieu.|Cut two big hearts and glue them in a V, points to the middle."],
    [smL + smR, "Colle deux cœurs plus petits en bas.|Glue two smaller hearts below."],
    [E(200, 160, 11, 55, '#6b4a3a') + C(200, 100, 13, '#6b4a3a'), "Colle un long ovale brun pour le corps.|Glue a long brown oval for the body."],
    [P('M196 90Q185 60 168 50M204 90Q215 60 232 50', 'none', 4) + dot(168, 50, 6) + dot(232, 50, 6), "Dessine deux antennes avec un feutre.|Draw two antennae with a marker."],
    [CF(138, 90, 9, '#fff') + CF(262, 90, 9, '#fff') + CF(160, 205, 7, '#fff') + CF(240, 205, 7, '#fff'), "Colle des petits ronds blancs sur les ailes.|Glue little white dots on the wings."],
  ]);
}
{
  const body = poly([[100, 150], [300, 150], [300, 250], [100, 250]], '#ffb3c7') + poly([[100, 150], [140, 118], [340, 118], [300, 150]], '#ffd0dd') + poly([[300, 150], [340, 118], [340, 218], [300, 250]], '#f58aa8');
  const lid = poly([[92, 128], [308, 128], [308, 162], [92, 162]], '#e8505b') + poly([[92, 128], [134, 100], [348, 100], [308, 128]], '#f07a82') + poly([[308, 128], [348, 100], [348, 134], [308, 162]], '#c9414d');
  add('boite-bisous', '💋', 'Une boîte à bisous|A kiss box', 3, 35, 'decorations', 'saint-valentin', "Une petite boîte en carton|A small cardboard box;Papier rose et rouge|Pink and red paper;Ruban jaune|Yellow ribbon;Ciseaux, colle|Scissors, glue", 'craft', [
    [body, "Couvre une petite boîte avec du papier rose.|Cover a small box with pink paper."],
    [lid, "Couvre le couvercle avec du papier rouge.|Cover the lid with red paper."],
    [[130, 180, 230, 280].map((x) => heart(x, 207, 0.5, '#e8505b')).join(''), "Découpe des cœurs et colle-les sur la boîte.|Cut out hearts and glue them on the box."],
    [E(198, 108, 22, 12, '#ffd23f', -20) + E(242, 108, 22, 12, '#ffd23f', 20) + C(220, 110, 8, '#f0b429', 4), "Fais un nœud en ruban et colle-le sur le couvercle.|Make a ribbon bow and glue it on the lid."],
    [heart(150, 55, 0.6, '#fff') + heart(215, 32, 0.6, '#fff') + heart(280, 52, 0.6, '#fff'), "Écris des mots doux sur des cœurs de papier et mets-les dans la boîte.|Write sweet words on paper hearts and put them in the box.", arrow(215, 70, 215, 98)],
  ]);
}

// ───────── CABANE À SUCRE ─────────
add('seau-erable', '🪣', "Un seau d'eau d'érable|A maple sap bucket", 2, 20, 'objets', 'cabane-a-sucre', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur|Colouring pencils", 'draw', [
  [RF(0, 0, 400, 300, '#d7ecff') + RF(0, 258, 400, 42, '#fff') + poly([[30, 0], [150, 0], [140, 300], [40, 300]], '#9c6b3f') + P('M70 20V90M110 120V200M75 210V270', 'none', 4), "Dessine un gros tronc d'érable avec de l'écorce.|Draw a big maple trunk with bark."],
  [R(148, 138, 54, 12, '#c9ced9', 4) + L(202, 144, 202, 156, 5), "Ajoute un petit tuyau dans le tronc : le chalumeau.|Add a little spout in the trunk."],
  [poly([[170, 175], [262, 175], [252, 262], [180, 262]], '#c9ced9') + E(216, 175, 46, 9, '#e1e5ee', 0, 4), "Dessine un seau en dessous.|Draw a bucket below it."],
  [P('M172 176Q216 110 260 176', 'none', 5), "Ajoute l'anse du seau.|Add the bucket handle."],
  [drop(204, 158, 0.7) + E(216, 235, 30, 6, '#9fd8ff', 0, 3), "Dessine une goutte d'eau d'érable qui tombe.|Draw a drop of maple sap falling."],
  [PF('M20 262H400V300H20Z', '#eaf3ff'), "Colorie le tronc en brun et le seau en gris. De la neige!|Colour the trunk brown and the bucket grey. Add snow!"],
]);
{
  add('cabane-sucre', '🏡', 'Une cabane à sucre|A sugar shack', 3, 30, 'nature', 'cabane-a-sucre', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur|Colouring pencils", 'draw', [
    [RF(0, 0, 400, 300, '#d7ecff') + RF(0, 250, 400, 50, '#fff') + R(90, 150, 220, 100, '#b98a5a', 4), "Dessine un grand rectangle pour les murs.|Draw a big rectangle for the walls."],
    [poly([[75, 152], [325, 152], [290, 95], [110, 95]], '#9c3d3d'), "Ajoute un toit large en forme de trapèze.|Add a wide trapezoid roof."],
    [R(186, 58, 28, 40, '#c9a36b', 3) + poly([[180, 58], [220, 58], [200, 40]], '#9c3d3d'), "Dessine une cheminée à ventilation sur le toit.|Draw a vent chimney on the roof."],
    [R(180, 192, 40, 58, '#7a5230', 4) + R(108, 176, 44, 34, '#ffe9a8', 3) + R(248, 176, 44, 34, '#ffe9a8', 3) + L(130, 176, 130, 210, 3) + L(270, 176, 270, 210, 3), "Ajoute une porte et deux fenêtres.|Add a door and two windows."],
    [C(205, 24, 12, '#e8edf5', 4) + C(226, 12, 9, '#e8edf5', 4) + C(188, 12, 8, '#e8edf5', 4), "Fais monter de la vapeur au-dessus de la cheminée.|Make steam rise above the chimney."],
    [poly([[22, 252], [58, 252], [40, 196]], '#3fa65b') + poly([[342, 252], [378, 252], [360, 196]], '#3fa65b') + L(40, 252, 40, 262, 6) + L(360, 252, 360, 262, 6), "Plante un petit sapin de chaque côté.|Plant a little fir tree on each side."],
    [PF('M80 152H320L300 134H100Z', '#fff') + CF(60, 50, 6, '#fff') + CF(330, 70, 6, '#fff'), "Colorie : murs bruns, toit rouge, neige sur le toit.|Colour: brown walls, red roof, snow on the roof."],
  ]);
}
{
  const strip = (y) => Sc(`M60 ${y}Q85 ${y - 20} 110 ${y}T160 ${y}T210 ${y}T260 ${y}T310 ${y}`, '#e8a93c', 14);
  add('crepe-tire', '🥞', 'Tire sur la neige|Maple taffy on snow', 1, 12, 'nourriture', 'cabane-a-sucre', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons jaune, brun et bleu|Yellow, brown and blue pencils", 'draw', [
    [RF(0, 0, 400, 300, '#e8f4ff') + R(30, 150, 340, 120, '#fff', 16), "Dessine un grand bac rempli de neige.|Draw a big tray full of snow."],
    [strip(190), "Dessine une longue ligne ondulée : c'est la tire d'érable.|Draw a long wavy line: that is the maple taffy."],
    [strip(222) + strip(254), "Ajoute deux autres lignes ondulées en dessous.|Add two more wavy lines below."],
    [R(306, 183, 66, 14, '#e0b878', 6, 4) + E(312, 190, 14, 10, '#e8a93c', 0, 4), "Dessine un bâton au bout de la première ligne, pour l'enrouler.|Draw a stick at the end of the first line, to roll it."],
    [Sc('M60 40H80M70 30V50M65 35L75 45M65 45L75 35', K, 4) + Sc('M300 70H320M310 60V80M305 65L315 75M305 75L315 65', K, 4) + Sc('M180 55H200M190 45V65M185 50L195 60M185 60L195 50', K, 4), "Ajoute quelques flocons qui tombent.|Add a few falling snowflakes."],
    [EF(200, 262, 150, 5, '#dcecff'), "Colorie la tire en doré, le bâton en brun clair et le bac en bleu pâle.|Colour the taffy golden, the stick light brown, and the tray pale blue."],
  ]);
}

// ───────── PÂQUES ─────────
{
  add('oeufs-decores', '🥚', 'Des œufs décorés|Decorated eggs', 1, 15, 'decorations', 'paques', "Feuille blanche|White paper;Crayons de couleur ou feutres|Colouring pencils or markers", 'draw', [
    [RF(0, 0, 400, 300, '#fff7d9') + egg(100, 175, 0.9, '#9ad0f5') + egg(200, 160, 1.1, '#ffb3c7') + egg(300, 175, 0.9, '#c4e8a8'), "Dessine trois œufs : un grand au milieu, deux plus petits.|Draw three eggs: a big one in the middle, two smaller."],
    [Sc('M156 165L172 145L188 165L204 145L220 165L236 145L244 160', '#e8505b', 6), "Dessine une ligne en zigzag sur l'œuf du milieu.|Draw a zigzag line on the middle egg."],
    [Sc('M65 150Q100 138 135 150M58 175Q100 163 142 175M62 200Q100 188 138 200', '#3d7cc9', 6), "Ajoute trois lignes ondulées sur l'œuf de gauche.|Add three wavy lines on the left egg."],
    [[[275, 150], [305, 140], [325, 165], [285, 180], [310, 200], [275, 205]].map(([x, y]) => C(x, y, 7, '#e8505b', 3)).join(''), "Fais des ronds sur l'œuf de droite.|Make circles on the right egg."],
    [poly([[0, 300], [0, 250], [20, 228], [40, 250], [60, 228], [80, 250], [110, 228], [130, 250], [160, 228], [180, 250], [210, 228], [230, 250], [260, 228], [280, 250], [310, 228], [330, 250], [360, 228], [380, 250], [400, 232], [400, 300]], '#8fd16f'), "Dessine de l'herbe en pointes sous les œufs.|Draw spiky grass under the eggs."],
    ['', "Colorie les œufs de couleurs vives.|Colour the eggs in bright colours."],
  ]);
}
{
  const ear = E(160, 70, 22, 60, '#f3eefc', -8) + EF(160, 74, 9, 40, '#ffb3c7', -8) + E(240, 70, 22, 60, '#f3eefc', 8) + EF(240, 74, 9, 40, '#ffb3c7', 8);
  add('lapin', '🐰', 'Un lapin de Pâques|An Easter bunny', 2, 20, 'animaux', 'paques', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur ou feutres|Colouring pencils or markers", 'draw', [
    [RF(0, 0, 400, 300, '#e9f6ff') + RF(0, 268, 400, 32, '#c4e8a8') + E(200, 235, 62, 50, '#f3eefc'), "Dessine un gros ovale pour le corps.|Draw a big oval for the body."],
    [ear, "Ajoute deux très longues oreilles.|Add two very long ears."],
    [C(200, 150, 60, '#f3eefc'), "Dessine une grosse tête ronde devant les oreilles.|Draw a big round head in front of the ears."],
    [eyes(200, 142, 22, 6) + E(200, 162, 9, 6, '#ff8fa8', 0, 3) + P('M200 168V176M200 176Q188 186 178 178M200 176Q212 186 222 178', 'none', 4) + L(140, 160, 168, 166, 3) + L(140, 176, 168, 172, 3) + L(260, 160, 232, 166, 3) + L(260, 176, 232, 172, 3), "Fais les yeux, le nez, la bouche et les moustaches.|Make the eyes, nose, mouth and whiskers."],
    [E(176, 240, 12, 22, '#f3eefc', 0, 4) + E(224, 240, 12, 22, '#f3eefc', 0, 4) + E(150, 284, 30, 13, '#f3eefc', 0, 4) + E(250, 284, 30, 13, '#f3eefc', 0, 4), "Ajoute deux pattes de devant et deux grands pieds.|Add two front paws and two big feet."],
    [C(266, 262, 16, '#fff', 4) + EF(150, 150, 12, 7, '#ffb3c7') + EF(250, 150, 12, 7, '#ffb3c7'), "Dessine une queue en pompon et des joues roses.|Draw a pompom tail and pink cheeks."],
    ['', "Colorie le lapin en gris-mauve et l'herbe en vert.|Colour the bunny grey-purple and the grass green."],
  ]);
}
{
  add('poussin', '🐥', 'Un poussin qui sort de son œuf|A chick hatching', 1, 12, 'animaux', 'paques', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons jaune et orange|Yellow and orange pencils", 'draw', [
    [RF(0, 0, 400, 300, '#e6f7d9') + C(195, 150, 75, '#ffd23f'), "Dessine un grand rond : le poussin.|Draw a big circle: the chick."],
    [P('M105 215L135 190L165 215L195 190L225 215L255 190L285 215Q285 285 195 285Q105 285 105 215Z', '#fff'), "Dessine la coquille avec le haut en zigzag.|Draw the shell with a zigzag top."],
    [eyes(168, 138, 27, 7) + poly([[184, 150], [206, 150], [195, 168]], '#ff9a3c', 4), "Ajoute deux yeux et un petit bec.|Add two eyes and a little beak."],
    [E(118, 158, 16, 24, '#ffc42a', 20) + E(272, 158, 16, 24, '#ffc42a', -20) + P('M195 75Q185 50 175 48M195 75Q198 45 210 40M195 75Q210 55 225 58', 'none', 5), "Dessine deux petites ailes et trois plumes sur la tête.|Draw two little wings and three feathers on the head."],
    [EF(150, 165, 12, 7, '#ffb3c7') + EF(240, 165, 12, 7, '#ffb3c7'), "Colorie le poussin en jaune, le bec en orange.|Colour the chick yellow and the beak orange."],
  ]);
}
{
  const grass = poly([[110, 178], [125, 140], [140, 174], [158, 135], [175, 172], [195, 128], [215, 172], [235, 135], [250, 174], [270, 140], [285, 176], [290, 180]], '#8fd16f');
  add('panier-paques', '🧺', 'Un panier de Pâques|An Easter basket', 3, 30, 'objets', 'paques', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur ou feutres|Colouring pencils or markers", 'draw', [
    [RF(0, 0, 400, 300, '#fff7d9') + Sc('M105 180C105 45 295 45 295 180', '#b98a5a', 9), "Dessine une grande anse en arc.|Draw a big arched handle."],
    [grass, "Ajoute de l'herbe en pointes qui dépasse.|Add spiky grass sticking out."],
    [egg(160, 160, 0.45, '#ffb3c7') + egg(205, 152, 0.5, '#ffd23f') + egg(250, 162, 0.45, '#9ad0f5'), "Dessine trois petits œufs dans l'herbe.|Draw three little eggs in the grass."],
    [P('M95 185H305L285 275H115Z', '#d9a35f') + R(88, 175, 224, 18, '#c28a45', 6), "Dessine le panier devant les œufs, avec un bord épais.|Draw the basket in front of the eggs, with a thick rim."],
    [P('M100 210H300M104 232H296M110 254H290M150 195L142 275M200 195V275M250 195L258 275', 'none', 3), "Ajoute des lignes croisées pour le tissage.|Add crossing lines for the weave."],
    [E(176, 186, 22, 12, '#e8505b', -15) + E(224, 186, 22, 12, '#e8505b', 15) + C(200, 188, 8, '#e8505b', 4), "Dessine un gros nœud sur le bord.|Draw a big bow on the rim."],
    ['', "Colorie le panier en brun doré et l'herbe en vert.|Colour the basket golden brown and the grass green."],
  ]);
}

// ───────── PRINTEMPS ─────────
{
  const pt = (x, y, r, c) => petals(x, y, r, c, 7);
  add('fleurs', '🌷', 'Trois fleurs du printemps|Three spring flowers', 1, 12, 'nature', 'printemps', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur ou feutres|Colouring pencils or markers", 'draw', [
    [RF(0, 0, 400, 300, '#e9f6ff') + Sc('M120 275V160M200 275V115M285 275V150', '#5fbf6a', 6), "Dessine trois tiges de hauteurs différentes.|Draw three stems of different heights."],
    [pt(120, 140, 30, '#ff8fa8') + pt(200, 92, 36, '#ffd23f') + pt(285, 130, 30, '#b79cf0'), "Dessine des pétales en cercle au bout de chaque tige.|Draw petals in a circle at the top of each stem."],
    [C(120, 140, 14, '#ffd23f') + C(200, 92, 16, '#e8505b') + C(285, 130, 14, '#ffd23f'), "Dessine un rond au centre de chaque fleur.|Draw a circle in the middle of each flower."],
    [E(150, 228, 30, 12, '#5fbf6a', -30) + E(240, 215, 30, 12, '#5fbf6a', 30) + E(86, 235, 26, 11, '#5fbf6a', 25), "Ajoute des feuilles le long des tiges.|Add leaves along the stems."],
    [poly([[0, 300], [0, 272], [25, 255], [45, 275], [75, 255], [100, 278], [140, 258], [170, 278], [215, 256], [250, 278], [290, 258], [330, 278], [365, 256], [400, 275], [400, 300]], '#8fd16f'), "Dessine de l'herbe en bas.|Draw grass at the bottom."],
    [CF(340, 50, 22, '#ffd23f'), "Colorie les fleurs de couleurs vives et ajoute un soleil.|Colour the flowers in bright colours and add a sun."],
  ]);
}
{
  const bl = EF(120, 105, 62, 48, '#ff8fa8', -20) + EF(120, 105, 30, 22, '#ffd23f', -20) + EF(130, 197, 45, 36, '#6fb7e9', 20) + EF(130, 197, 18, 14, '#fff', 20);
  add('papillon-peinture', '🦋', 'Un papillon en peinture|A paint-blot butterfly', 2, 20, 'animaux', 'printemps', "Une feuille blanche|A white sheet;Gouache de plusieurs couleurs|Paint in several colours;Un pinceau|A brush;Feutre noir|Black marker", 'craft', [
    [R(50, 40, 300, 220, '#fffaf0', 6), "Plie une feuille en deux, puis ouvre-la : le pli est au milieu.|Fold a sheet in half, then open it: the fold is in the middle.", fold('M200 40V260')],
    [bl, "Mets des taches de gouache sur un seul côté du pli.|Put blobs of paint on one side of the fold only.", fold('M200 40V260')],
    ['', "Referme la feuille et frotte bien avec ta main.|Close the sheet and rub well with your hand.", arc(350, 150, 285, 50, 205, 110)],
    [mir(bl), "Ouvre : un papillon pareil des deux côtés!|Open it: a butterfly the same on both sides!"],
    [E(200, 150, 10, 62, K, 0, 4) + P('M196 90Q185 62 168 54M204 90Q215 62 232 54', 'none', 4) + dot(168, 54, 6) + dot(232, 54, 6), "Dessine le corps et les antennes avec un feutre noir.|Draw the body and antennae with a black marker."],
  ]);
}
{
  const can = 'M65 160Q65 38 200 38Q335 38 335 160Q300 135 267 160Q233 135 200 160Q167 135 133 160Q100 135 65 160Z';
  add('parapluie', '☔', 'Un parapluie sous la pluie|An umbrella in the rain', 1, 12, 'objets', 'printemps', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur ou feutres|Colouring pencils or markers", 'draw', [
    [RF(0, 0, 400, 300, '#cfe0f5') + P(can, '#ff8fa8'), "Dessine un grand demi-rond avec le bas en vagues.|Draw a big half circle with a wavy bottom."],
    [P('M200 40Q150 90 135 148M200 40V148M200 40Q250 90 265 148', 'none', 4), "Trace des lignes qui partent du haut vers le bas.|Draw lines from the top going down."],
    [P('M200 160V235Q200 268 170 264', 'none', 7), "Ajoute le manche en forme de crochet.|Add the hook-shaped handle."],
    [[[60, 90], [110, 30], [330, 50], [350, 130], [50, 180], [320, 200], [90, 240]].map(([x, y]) => drop(x, y, 0.9)).join(''), "Dessine des gouttes de pluie tout autour.|Draw raindrops all around."],
    [E(200, 285, 90, 10, '#9fd8ff', 0, 4), "Ajoute une flaque d'eau en bas.|Add a puddle at the bottom."],
    [EF(200, 70, 60, 14, '#ffc4d6'), "Colorie le parapluie de couleurs gaies et le ciel en gris-bleu.|Colour the umbrella in cheerful colours and the sky grey-blue."],
  ]);
}
{
  add('oiseau', '🐦', 'Un oiseau sur sa branche|A bird on its branch', 3, 25, 'animaux', 'printemps', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons brun, orange et vert|Brown, orange and green pencils", 'draw', [
    [RF(0, 0, 400, 300, '#e9f6ff') + Sc('M20 245Q200 225 380 250', '#9c6b3f', 12) + E(70, 228, 22, 10, '#8fd16f', -30) + E(330, 232, 22, 10, '#8fd16f', 30) + E(300, 215, 14, 8, '#ff8fa8', 20), "Dessine une longue branche avec quelques feuilles.|Draw a long branch with a few leaves."],
    [E(200, 175, 70, 52, '#a88a6a', -8), "Dessine un gros ovale pour le corps de l'oiseau.|Draw a big oval for the bird's body."],
    [C(258, 122, 34, '#a88a6a'), "Ajoute un rond pour la tête, en haut à droite.|Add a circle for the head, at the top right."],
    [poly([[150, 165], [72, 138], [80, 192]], '#8a6c4c') + E(190, 168, 40, 24, '#8a6c4c', -15), "Dessine une queue pointue et une aile.|Draw a pointed tail and a wing."],
    [poly([[288, 115], [322, 123], [288, 132]], '#ff9a3c') + C(264, 112, 8, '#fff', 4) + dot(266, 112, 3.5), "Ajoute un bec pointu et un œil.|Add a pointy beak and an eye."],
    [L(190, 222, 190, 240, 4) + L(216, 224, 216, 242, 4) + P('M190 240L178 246M190 240L202 246M216 242L204 248M216 242L228 248', 'none', 3), "Dessine deux pattes qui s'accrochent à la branche.|Draw two legs gripping the branch."],
    [EF(236, 162, 28, 36, '#ff8f5a', -8), "Colorie le ventre en orange et le reste en brun.|Colour the tummy orange and the rest brown."],
  ]);
}

// ───────── JOUR DE LA TERRE ─────────
add('planete-terre', '🌍', 'Notre planète Terre|Our planet Earth', 1, 15, 'nature', 'jour-de-la-terre', "Une assiette en carton ou du papier|A cardboard plate or paper;Gouache bleue, verte et blanche|Blue, green and white paint;Un pinceau|A brush", 'craft', [
  [C(200, 150, 110, '#fff'), "Trace un grand rond avec une assiette.|Trace a big circle around a plate."],
  [C(200, 150, 110, '#6fb7e9'), "Peins le rond en bleu : ce sont les océans.|Paint the circle blue: these are the oceans."],
  [PF('M140 90C170 70 215 85 205 115C195 140 160 130 150 150C135 160 120 120 140 90Z', '#5fbf6a') + PF('M240 165C270 150 292 170 282 195C270 220 245 215 240 165Z', '#5fbf6a') + PF('M150 200C175 190 190 215 175 240C160 255 140 230 150 200Z', '#5fbf6a'), "Peins des continents verts.|Paint green continents."],
  [EF(160, 112, 24, 9, '#fff') + EF(182, 106, 18, 8, '#fff') + EF(250, 120, 24, 9, '#fff') + EF(230, 232, 26, 9, '#fff') + EF(120, 160, 18, 8, '#fff'), "Ajoute des nuages blancs avec ton pinceau.|Add white clouds with your brush."],
  [heart(218, 150, 0.9, '#e8505b'), "Dessine un cœur : prends soin de la Terre!|Draw a heart: take care of the Earth!"],
]);
{
  add('mangeoire', '🐦', 'Une mangeoire à oiseaux|A bird feeder', 3, 40, 'objets', 'jour-de-la-terre', "Un carton de lait vide, propre et sec|An empty, clean, dry milk carton;Gouache|Paint;Un bâton ou un crayon|A stick or pencil;Graines pour oiseaux|Bird seed;Ficelle|String", 'craft', [
    [R(130, 120, 140, 150, '#fff', 4) + poly([[130, 120], [270, 120], [235, 65], [165, 65]], '#e8edf5'), "Prends un carton de lait vide, propre et sec.|Take an empty, clean and dry milk carton."],
    [R(155, 170, 90, 70, '#4a4f68', 4), "Un adulte découpe une grande fenêtre sur le devant.|A grown-up cuts a big window in the front.", cut('M155 170H245V240H155Z')],
    [R(130, 120, 140, 150, '#ffd23f', 4) + poly([[130, 120], [270, 120], [235, 65], [165, 65]], '#e8505b') + R(155, 170, 90, 70, '#4a4f68', 4), "Peins le carton : des murs jaunes et un toit rouge.|Paint the carton: yellow walls and a red roof."],
    [R(110, 240, 180, 9, '#9c6b3f', 4), "Un adulte perce deux trous et passe un bâton comme perchoir.|A grown-up makes two holes and slides a stick through as a perch."],
    [EF(180, 236, 9, 5, '#e0b24a') + EF(200, 232, 9, 5, '#c9962f') + EF(220, 236, 9, 5, '#e0b24a') + EF(190, 228, 8, 5, '#c9962f') + EF(210, 226, 8, 5, '#e0b24a'), "Verse des graines au fond de la mangeoire.|Pour some seeds in the bottom of the feeder."],
    [L(200, 65, 200, 30, 4) + Sc('M60 22H340', '#9c6b3f', 12), "Attache une ficelle au toit et accroche la mangeoire à une branche.|Tie a string to the roof and hang the feeder from a branch."],
  ], true);
}
{
  const pot = poly([[130, 150], [270, 150], [250, 270], [150, 270]], '#fff') + R(122, 138, 156, 16, '#e8edf5', 5);
  add('semis-pot', '🌱', 'Un semis dans un pot de yogourt|A seedling in a yogurt pot', 2, 20, 'nature', 'jour-de-la-terre', "Un pot de yogourt vide et lavé|An empty, washed yogurt pot;Feutres ou gouache|Markers or paint;De la terre|Soil;Des graines (haricots, tournesol)|Seeds (beans, sunflower);De l'eau|Water", 'craft', [
    [pot, "Prends un pot de yogourt vide et bien lavé.|Take an empty, well washed yogurt pot."],
    [Sc('M138 190Q200 170 262 190', '#e8505b', 7) + Sc('M142 220Q200 200 258 220', '#6fb7e9', 7) + heart(200, 245, 0.45, '#ffd23f'), "Décore le pot avec des feutres ou de la peinture.|Decorate the pot with markers or paint."],
    [P('M128 150Q200 108 272 150Z', '#7a5230'), "Remplis le pot de terre.|Fill the pot with soil."],
    [EF(180, 132, 7, 4, '#e0b24a') + EF(200, 126, 7, 4, '#e0b24a') + EF(220, 132, 7, 4, '#e0b24a'), "Mets trois graines et enfonce-les avec ton doigt.|Put in three seeds and push them in with your finger.", arrow(200, 70, 200, 112)],
    [drop(160, 70, 0.9) + drop(200, 40, 0.9) + drop(240, 70, 0.9) + drop(200, 95, 0.9), "Arrose avec un petit peu d'eau.|Water it with a little water."],
    [Sc('M200 132V82', '#5fbf6a', 7) + E(178, 84, 24, 12, '#5fbf6a', -30) + E(224, 84, 24, 12, '#5fbf6a', 30) + CF(345, 55, 24, '#ffd23f') + Sd('M345 18V8M345 102V92M308 55H298M392 55H382M319 29L312 22M371 81L378 88M319 81L312 88M371 29L378 22', '#ffd23f', 5), "Mets le pot au soleil : bientôt une petite pousse sort!|Put the pot in the sun: soon a little sprout comes out!"],
  ]);
}

// ───────── FÊTE DES MÈRES / DES PÈRES ─────────
{
  const stems = Sc('M175 235Q130 170 112 108M200 235V108M225 235Q270 170 288 108', '#5fbf6a', 8);
  add('bouquet-mere', '💐', 'Un bouquet pour maman|A bouquet for Mom', 2, 25, 'decorations', 'fete-des-meres', "Papier de couleur|Coloured paper;Papier vert|Green paper;Un petit pot ou un rouleau de carton|A small pot or cardboard roll;Ruban|Ribbon;Ciseaux, colle|Scissors, glue", 'craft', [
    [stems, "Découpe des tiges vertes dans du papier et colle-les en bouquet.|Cut green paper stems and glue them in a bunch."],
    [petals(112, 88, 28, '#ff8fa8', 7) + petals(200, 70, 32, '#ffd23f', 7) + petals(288, 88, 28, '#b79cf0', 7), "Découpe des pétales et colle-les au bout des tiges.|Cut petals and glue them at the top of the stems."],
    [C(112, 88, 13, '#ffd23f') + C(200, 70, 15, '#e8505b') + C(288, 88, 13, '#ffd23f'), "Colle un rond au centre de chaque fleur.|Glue a circle in the middle of each flower."],
    [E(150, 190, 30, 11, '#3fa65b', -30) + E(250, 185, 30, 11, '#3fa65b', 30), "Ajoute des feuilles vertes.|Add green leaves."],
    [poly([[140, 215], [260, 215], [250, 285], [150, 285]], '#9ad0f5') + R(142, 208, 116, 16, '#e8505b', 4, 4), "Mets le bouquet dans un pot décoré avec un ruban.|Put the bouquet in a decorated pot with a ribbon."],
  ]);
}
{
  const kn = poly([[184, 56], [216, 56], [222, 86], [178, 86]], '#e8505b');
  add('cravate-carte', '👔', 'Une carte-cravate pour papa|A tie card for Dad', 2, 25, 'cartes', 'fete-des-peres', "Papier bleu, blanc et rouge|Blue, white and red paper;Ciseaux, colle|Scissors, glue;Feutres|Markers", 'craft', [
    [R(110, 30, 180, 240, '#9ad0f5', 8), "Plie une feuille bleue en deux : ce sera la chemise.|Fold a blue sheet in half: it will be the shirt.", fold('M110 30V270')],
    [poly([[196, 46], [146, 38], [172, 98]], '#fff') + poly([[204, 46], [254, 38], [228, 98]], '#fff'), "Colle un col blanc en haut.|Glue a white collar at the top."],
    [poly([[180, 86], [220, 86], [240, 230], [200, 252], [160, 230]], '#e8505b'), "Découpe une cravate rouge et colle-la au milieu.|Cut a red tie and glue it in the middle."],
    [kn, "Ajoute un petit nœud en haut de la cravate.|Add a little knot at the top of the tie."],
    [Sc('M172 140H228M170 170H230M168 200H232', '#fff', 7), "Décore la cravate avec des rayures blanches.|Decorate the tie with white stripes."],
  ]);
}
add('signet', '🔖', 'Un signet fait main|A handmade bookmark', 1, 20, 'objets', 'fete-des-peres', "Carton mince|Thin cardboard;Gouache ou crayons|Paint or pencils;Un perforateur|A hole punch;Laine ou ficelle|Yarn or string", 'craft', [
  [R(150, 30, 100, 215, '#fff8e8', 10), "Découpe une bande de carton longue et mince.|Cut a long, thin strip of cardboard."],
  [R(150, 30, 100, 215, '#9ad0f5', 10), "Peins un fond de couleur.|Paint a coloured background."],
  [heart(200, 145, 1.6, '#e8505b'), "Dessine un gros cœur au milieu.|Draw a big heart in the middle."],
  [CF(163, 70, 5, '#fff') + CF(237, 70, 5, '#fff') + CF(163, 110, 5, '#fff') + CF(237, 110, 5, '#fff') + CF(163, 200, 5, '#fff') + CF(237, 200, 5, '#fff'), "Ajoute des petits points blancs sur les bords.|Add little white dots along the edges."],
  [C(200, 52, 7, '#fff', 3) + P('M200 52C165 15 135 45 155 75', 'none', 5), "Fais un trou en haut avec le perforateur et passe une ficelle.|Make a hole at the top with the hole punch and thread a string."],
  [Sc('M172 245V288M190 245V292M210 245V292M228 245V288', '#e8505b', 6), "Ajoute des brins de laine en bas pour faire une frange.|Add strands of yarn at the bottom for a tassel."],
]);

// ───────── ÉTÉ / FÊTE NATIONALE ─────────
add('soleil', '☀️', 'Un soleil joyeux|A happy sun', 1, 10, 'nature', 'ete', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons jaune et orange|Yellow and orange pencils", 'draw', [
  [RF(0, 0, 400, 300, '#d9f0ff') + C(200, 150, 58, '#ffd23f'), "Dessine un grand rond au milieu.|Draw a big circle in the middle."],
  [rays(200, 150, 68, 125, 12, '#ffb82e'), "Ajoute douze rayons en triangle tout autour.|Add twelve triangle rays all around."],
  [(() => { let d = ''; for (let i = 0; i < 12; i++) { const a = ((i + 0.5) * Math.PI) / 6; d += `M${n1(200 + 76 * Math.cos(a))} ${n1(150 + 76 * Math.sin(a))}L${n1(200 + 100 * Math.cos(a))} ${n1(150 + 100 * Math.sin(a))}`; } return P(d, 'none', 5); })(), "Ajoute un petit trait entre chaque rayon.|Add a little line between each ray."],
  [eyes(200, 140, 20, 6) + smile(200, 162, 24, 0.8), "Dessine un visage : deux yeux et un grand sourire.|Draw a face: two eyes and a big smile."],
  [EF(168, 160, 10, 6, '#ff9a6a') + EF(232, 160, 10, 6, '#ff9a6a'), "Colorie le soleil en jaune et le ciel en bleu clair.|Colour the sun yellow and the sky light blue."],
]);
{
  const fdl = (x, y, s) => G(`translate(${x} ${y}) scale(${s})`, P('M0 -34C16 -20 14 0 0 12C-14 0 -16 -20 0 -34Z', '#fff', 3) + P('M-4 8C-14 -26 -40 -22 -36 -2C-34 10 -18 12 -6 6Z', '#fff', 3) + P('M4 8C14 -26 40 -22 36 -2C34 10 18 12 6 6Z', '#fff', 3) + R(-19, 10, 38, 9, '#fff', 3, 3) + P('M-6 19C-8 32 -22 36 -26 46C-14 46 -4 40 0 30C4 40 14 46 26 46C22 36 8 32 6 19Z', '#fff', 3));
  add('drapeau-quebec', '⚜️', 'Le drapeau du Québec en papier|A paper Quebec flag', 3, 35, 'decorations', 'fete-nationale', "Papier bleu et blanc|Blue and white paper;Ciseaux, colle|Scissors, glue;Un bâton|A stick;Crayon|Pencil", 'craft', [
    [R(60, 55, 280, 190, '#2f6fb8', 4), "Découpe un grand rectangle de papier bleu.|Cut a big rectangle of blue paper."],
    [R(182, 55, 36, 190, '#fff', 0, 3) + R(60, 132, 280, 36, '#fff', 0, 3) + L(60, 55, 340, 55, 4), "Colle une grande croix blanche qui touche les quatre bords.|Glue a big white cross touching all four edges."],
    [fdl(121, 92, 0.8), "Dessine une fleur de lys sur du papier blanc, découpe-la et colle-la en haut à gauche.|Draw a fleur-de-lys on white paper, cut it out and glue it top left."],
    [fdl(279, 92, 0.8) + fdl(121, 210, 0.8) + fdl(279, 210, 0.8), "Fais trois autres fleurs de lys pareilles pour les autres coins.|Make three more matching fleurs-de-lys for the other corners."],
    [R(46, 36, 12, 258, '#b98a5a', 4) + C(52, 32, 9, '#ffd23f', 4), "Colle le drapeau sur un bâton.|Glue the flag on a stick."],
  ]);
}
{
  add('poisson', '🐟', 'Un poisson|A fish', 2, 15, 'animaux', 'ete', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons orange, bleu et vert|Orange, blue and green pencils", 'draw', [
    [RF(0, 0, 400, 300, '#bfe6ff') + RF(0, 262, 400, 38, '#f3dfa5') + E(190, 150, 95, 60, '#ff9a3c'), "Dessine un grand ovale pour le corps.|Draw a big oval for the body."],
    [poly([[278, 150], [352, 98], [338, 150], [352, 202]], '#ff7a2c') + P('M150 98Q185 55 235 100Z', '#ff7a2c') + P('M170 202Q195 235 225 204Z', '#ff7a2c'), "Ajoute la queue, une nageoire en haut et une en bas.|Add the tail, a fin on top and one underneath."],
    [C(130, 135, 12, '#fff', 4) + dot(127, 135, 5) + P('M98 163Q110 171 124 163', 'none', 4), "Dessine un œil et la bouche.|Draw an eye and the mouth."],
    [P('M152 108Q137 150 152 192', 'none', 4) + P('M190 125Q205 140 190 155M215 138Q230 153 215 168M190 160Q205 175 190 190M240 150Q252 160 240 172', 'none', 4), "Fais les ouïes et des écailles en petits arcs.|Make the gills and scales as little arcs."],
    [C(70, 100, 9, '#e6f6ff', 4) + C(52, 68, 6, '#e6f6ff', 4) + C(84, 58, 5, '#e6f6ff', 4) + Sc('M330 262Q320 230 335 215M350 262Q352 235 365 225', '#5fbf6a', 6), "Ajoute des bulles et des algues.|Add bubbles and seaweed."],
    ['', "Colorie le poisson en orange, l'eau en bleu et le sable en beige.|Colour the fish orange, the water blue and the sand beige."],
  ]);
}
{
  add('bateau', '⛵', 'Un voilier|A sailboat', 3, 30, 'vehicules', 'ete', "Feuille blanche|White paper;Crayon de plomb et règle|Pencil and ruler;Crayons de couleur|Colouring pencils", 'draw', [
    [RF(0, 0, 400, 300, '#d9f0ff') + RF(0, 255, 400, 45, '#6fb7e9') + CF(335, 60, 30, '#ffd23f') + poly([[80, 215], [320, 215], [285, 262], [115, 262]], '#e8505b'), "Dessine la coque : un trapèze large.|Draw the hull: a wide trapezoid."],
    [L(195, 70, 195, 215, 6), "Plante un grand mât au milieu.|Plant a tall mast in the middle."],
    [poly([[200, 75], [200, 205], [290, 205]], '#fff'), "Dessine une grande voile en triangle à droite du mât.|Draw a big triangle sail to the right of the mast."],
    [poly([[190, 95], [190, 205], [120, 205]], '#ffd23f'), "Ajoute une voile plus petite à gauche.|Add a smaller sail on the left."],
    [poly([[195, 70], [195, 92], [228, 81]], '#e8505b', 4) + C(150, 238, 7, '#fff', 3) + C(200, 238, 7, '#fff', 3) + C(250, 238, 7, '#fff', 3), "Ajoute une petite flamme en haut et trois hublots.|Add a little flag at the top and three portholes."],
    [P('M0 262Q25 245 50 262T100 262T150 262T200 262T250 262T300 262T350 262T400 262', 'none', 5) + P('M20 285Q45 270 70 285T120 285T170 285T220 285T270 285T320 285T370 285', 'none', 5), "Dessine des vagues devant le bateau.|Draw waves in front of the boat."],
    ['', "Colorie : ciel bleu pâle, mer bleue, soleil jaune.|Colour: pale blue sky, blue sea, yellow sun."],
  ]);
}
{
  add('creme-glacee', '🍦', 'Un cornet de crème glacée|An ice cream cone', 1, 12, 'nourriture', 'ete', "Feuille blanche|White paper;Crayon de plomb|Pencil;Crayons de couleur|Colouring pencils", 'draw', [
    [RF(0, 0, 400, 300, '#d9f0ff') + poly([[150, 160], [250, 160], [200, 285]], '#e0b878'), "Dessine un grand triangle pointe en bas : le cornet.|Draw a big triangle pointing down: the cone."],
    [P('M160 185L214 250M240 185L186 250M172 215H228', 'none', 4), "Fais des lignes croisées sur le cornet.|Draw crossing lines on the cone."],
    [P('M135 160C135 118 265 118 265 160Q248 185 232 160Q216 188 200 162Q184 188 168 160Q152 185 135 160Z', '#ffb3c7'), "Dessine une première boule avec le bas ondulé.|Draw a first scoop with a wavy bottom."],
    [E(200, 92, 52, 44, '#fff3d6'), "Ajoute une deuxième boule au-dessus.|Add a second scoop on top."],
    [C(200, 40, 14, '#e8505b', 4) + P('M200 26Q210 8 224 6', 'none', 4), "Dessine une cerise avec sa queue.|Draw a cherry with its stem."],
    [Sd('M176 80L184 74M210 70L218 78M194 105L202 99M222 100L230 94', '#e8505b', 6) + Sd('M170 100L176 108M240 82L246 90', '#6fb7e9', 6), "Colorie les boules, ajoute des vermicelles de couleur.|Colour the scoops and add colourful sprinkles."],
  ]);
}
{
  add('feux-artifice', '🎆', "Des feux d'artifice en peinture|Painted fireworks", 2, 25, 'decorations', 'fete-nationale', "Papier épais|Thick paper;Gouache bleu foncé, jaune, rose, bleu clair et noire|Dark blue, yellow, pink, light blue and black paint;Pinceaux|Brushes", 'craft', [
    [R(20, 20, 360, 260, '#26305e', 12), "Peins une feuille en bleu foncé : le ciel de la nuit.|Paint a sheet dark blue: the night sky."],
    [burst(130, 120, 70, '#ffd23f'), "Avec un pinceau, fais des traits qui partent d'un même point.|With a brush, make strokes that start from one point."],
    [burst(280, 100, 62, '#ff6f91', 14), "Fais un deuxième feu d'artifice en rose.|Make a second firework in pink."],
    [burst(215, 195, 48, '#9fd8ff', 10), "Un troisième, plus petit, en bleu pâle.|A third, smaller one, in pale blue."],
    [[[60, 60], [330, 200], [345, 60], [60, 200], [175, 45]].map(([x, y]) => CF(x, y, 4, '#fff')).join(''), "Ajoute des petits points blancs : des étincelles.|Add little white dots: sparks."],
    [poly([[20, 280], [20, 248], [55, 248], [55, 230], [90, 230], [90, 255], [130, 255], [130, 238], [165, 238], [165, 258], [215, 258], [215, 232], [250, 232], [250, 250], [290, 250], [290, 236], [330, 236], [330, 255], [380, 255], [380, 280]], '#12162b', 3), "Peins une ville toute noire en bas.|Paint an all-black city at the bottom."],
  ]);
}

export const projects = out;
