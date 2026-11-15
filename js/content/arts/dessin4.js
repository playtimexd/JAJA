// Arts plastiques — « Grandes scènes » (série C) : 18 grands dessins avec composition (ligne d’horizon, plans, grandeur selon la distance).
// Chaque scène = liste d'étapes (groupes de formes) ; les images cumulatives (anciens traits foncés + nouveaux traits roses)
// et le dessin colorié final sont générés (même principe que dessin.js).
// Attributs spéciaux : f="couleur" (remplissage au coloriage), z="n" (ordre d’empilement des étapes et du coloriage).
const D = '#3a3f55', K = '#ff5d8f';
const Ye = '#ffd34e', O = '#ff9f43', Rd = '#ff6b6b', Bl = '#6ec1ff', Gr = '#6fd08c', Pk = '#ff9ec4', Pu = '#b38cff';
const Br = '#b97a4b', Tn = '#e8b878', Wh = '#ffffff', Gy = '#d5dbea', Cr = '#fff1d6', Lb = '#cdeeff', Sk = '#f6cfa8';
const Dg = '#4fae6a', Dk = '#4a4f6a', Gy2 = '#aab2c8';
const F = (col, z) => `f="${col}"${z ? ` z="${z}"` : ''}`;
const n1 = (v) => Math.round(v * 10) / 10;
const range = (k, f) => Array.from({ length: k }, (_, i) => f(i));

// Fabrique de formes avec position (X,Y) et échelle s.
function T(X = 0, Y = 0, s = 1) {
  const fx = (v) => n1(X + v * s), fy = (v) => n1(Y + v * s), k = (v) => n1(v * s);
  const tp = (d) => d.replace(/([a-zA-Z])([^a-zA-Z]*)/g, (m, L, rest) => {
    const a = (rest.match(/-?\d*\.?\d+/g) || []).map(Number);
    if (L === 'H') return L + a.map(fx).join(' ');
    if (L === 'V') return L + a.map(fy).join(' ');
    if (L === 'h' || L === 'v') return L + a.map(k).join(' ');
    const up = L === L.toUpperCase(), o = [];
    for (let i = 0; i < a.length; i += 2) o.push(up ? fx(a[i]) : k(a[i]), up ? fy(a[i + 1]) : k(a[i + 1]));
    return L + o.join(' ');
  });
  const pp = (str) => str.trim().split(/\s+/).map((q) => { const [x, y] = q.split(','); return `${fx(+x)},${fy(+y)}`; }).join(' ');
  return {
    c: (x, y, r, a = '') => `<circle cx="${fx(x)}" cy="${fy(y)}" r="${k(r)}" ${a}/>`,
    e: (x, y, rx, ry, a = '') => `<ellipse cx="${fx(x)}" cy="${fy(y)}" rx="${k(rx)}" ry="${k(ry)}" ${a}/>`,
    r: (x, y, w, h, rd, a = '') => `<rect x="${fx(x)}" y="${fy(y)}" width="${k(w)}" height="${k(h)}" rx="${k(rd)}" ${a}/>`,
    l: (x1, y1, x2, y2, a = '') => `<line x1="${fx(x1)}" y1="${fy(y1)}" x2="${fx(x2)}" y2="${fy(y2)}" ${a}/>`,
    p: (d, a = '') => `<path d="${tp(d)}" ${a}/>`,
    pg: (pts, a = '') => `<polygon points="${pp(pts)}" ${a}/>`,
  };
}
const g = T();
const pt = (cx, cy, R, deg) => [cx + R * Math.cos(deg * Math.PI / 180), cy + R * Math.sin(deg * Math.PI / 180)];
const bg = (x, y, w, h, col, z = -100) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" stroke="none" f="${col}" z="${z}"/>`;

const strip = (s) => s.replace(/ (?:f|z)="[^"]*"/g, '');
const info = (s) => ({ s: strip(s), f: (s.match(/ f="([^"]*)"/) || [])[1] || 'none', z: +((s.match(/ z="(-?\d+)"/) || [])[1] || 0) });
const wrap = (inner) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const S = (fr, en, ...els) => ({ fr, en, els: els.flat(Infinity) });

const MAT = [
  { fr: 'Une grande feuille blanche', en: 'A big sheet of white paper' },
  { fr: 'Crayon à mine', en: 'Pencil' },
  { fr: 'Gomme à effacer', en: 'Eraser' },
  { fr: 'Crayons de couleur ou feutres', en: 'Colored pencils or markers' },
];

const LIST = [];
function A(id, emoji, fr, en, level, minutes, steps, cfr, cen, extras = [], season = null) {
  const out = steps.map((st, i) => {
    // Même ordre de superposition au trait et en couleur ; le blanc masque les traits cachés.
    const visible = steps.slice(0, i + 1).flatMap((step, j) => step.els.map((el) => ({ ...info(el), fresh: j === i })))
      .map((el, order) => ({ ...el, order })).sort((a, b) => a.z - b.z || a.order - b.order);
    const body = visible.map((el) => el.s.replace(/\s*\/>$/, ` fill="${el.f === 'none' ? 'none' : '#fff'}" stroke="${el.fresh ? K : D}" stroke-width="${el.fresh ? 8 : 6}"/>`)).join('');
    return { svg: wrap(`<g stroke-linecap="round" stroke-linejoin="round">${body}</g>`), text: { fr: st.fr, en: st.en } };
  });
  const all = steps.flatMap((s) => s.els).concat(extras.flat(Infinity)).map(info).map((o, i) => ({ ...o, i }));
  all.sort((a, b) => a.z - b.z || a.i - b.i);
  const body = all.map((o) => o.s.replace(/\s*\/>$/, ` fill="${o.f}"/>`)).join('');
  out.push({ svg: wrap(`<g stroke="${D}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${body}</g>`), text: { fr: cfr, en: cen } });
  LIST.push({ id: `dessin-scene-${id}`, cat: 'dessin', emoji, title: { fr, en }, level, minutes, theme: 'scene', season, materials: MAT, adult: false, steps: out });
}

// ───────── formes réutilisables ─────────
const cloud = (x, y, s = 1) => { const t = T(x, y, s); return [t.p('M-30 8Q-46 8-40-4Q-36-16-22-12Q-14-28 4-20Q18-30 30-14Q46-12 42 2Q46 10 30 8Z', F(Wh))]; };
const sun = (x, y, s = 1) => { const t = T(x, y, s); return [t.c(0, 0, 14, F(Ye)), ...range(8, (i) => { const a = pt(0, 0, 20, i * 45), b = pt(0, 0, 28, i * 45); return t.l(a[0], a[1], b[0], b[1]); })]; };
const bird = (x, y, s = 1) => T(x, y, s).p('M-9 2Q-4-6 0 1Q4-6 9 2');
const tree = (x, y, s = 1, col = Gr) => { const t = T(x, y, s); return [
  t.p('M-6 21Q-2 8-4-13L3-14Q2 7 7 21Z', F(Br)),
  t.p('M-5-6Q-17-3-19-14Q-27-20-18-29Q-19-40-7-38Q1-48 10-39Q22-41 23-29Q30-20 20-13Q18-3 6-6Z', F(col)),
]; };
const pine = (x, y, s = 1, col = Dg) => { const t = T(x, y, s); return [
  t.p('M-3-14L-4 10H4L3-14Z', F(Br)),
  t.p('M0-62L-10-43L-6-44L-18-26L-11-28L-25-10Q0-5 25-10L11-28L18-26L6-44L10-43Z', F(col)),
]; };
const person = (x, y, s, shirt, pants, hair, skin = Sk) => {
  const t = T(x, y, s);
  return [t.r(-8, -13, 7, 13, 2, F(pants)), t.r(1, -13, 7, 13, 2, F(pants)),
    t.p('M-9 -36Q-9 -38 -5 -38H5Q9 -38 9 -36L10 -12H-10Z', F(shirt)), t.l(-9, -34, -14, -18), t.l(9, -34, 14, -18),
    t.c(0, -45, 8, F(skin)), t.p('M-8.5 -46Q-9-55 0-55Q9-55 8.5-46Q0-50-8.5-46Z', F(hair))];
};
const bust = (x, y, s, shirt, hair, skin = Sk) => {
  const t = T(x, y, s);
  return [t.p('M-18 34L-18 24Q-18 12 0 12Q18 12 18 24V34Z', F(shirt)), t.c(0, 0, 11, F(skin)), t.p('M-11-2Q-12-14 0-14Q12-14 11-2Q0-8-11-2Z', F(hair))];
};
const balloon = (x, y, r, col, hx, hy) => [g.c(x, y, r, F(col)), g.l(x, y + r, hx, hy)];
const dog = (x, y, s, col, ear) => {
  const t = T(x, y, s);
  return [t.r(-14, -9, 5, 9, 2, F(col)), t.r(-6, -9, 5, 9, 2, F(col)), t.r(6, -9, 5, 9, 2, F(col)), t.r(13, -9, 5, 9, 2, F(col)),
    t.p('M18-20Q30-28 27-40', ''), t.e(0, -16, 19, 10, F(col)), t.c(-21, -25, 9, F(col)), t.e(-30, -22, 5, 3.5, F(col)),
    t.p('M-22-32Q-14-38-13-26Q-17-24-22-32Z', F(ear)), t.c(-24, -27, 1.6, F(D)), t.c(-34, -23, 1.8, F(D))];
};
const festoon = (x0, y0, cx, cy, x1, y1, k, cols, fh = 14) => {
  const q = (t) => [(1 - t) ** 2 * x0 + 2 * t * (1 - t) * cx + t * t * x1, (1 - t) ** 2 * y0 + 2 * t * (1 - t) * cy + t * t * y1];
  return [g.p(`M${x0} ${y0}Q${cx} ${cy} ${x1} ${y1}`), range(k, (i) => { const [x, y] = q((i + 0.5) / k); return g.pg(`${n1(x - 7)},${n1(y)} ${n1(x + 7)},${n1(y)} ${n1(x)},${n1(y + fh)}`, F(cols[i % cols.length])); })];
};
const stripes = (x0, k, w, y0, y1, cols) => range(k, (i) => { const x = x0 + i * w; return g.p(`M${x} ${y0}L${x + w} ${y0}L${x + w} ${y1}Q${x + w / 2} ${y1 + 16} ${x} ${y1}Z`, F(cols[i % cols.length])); });

// ───────── formes réutilisables (série C) ─────────
const Nb = '#1f2547', Cy = '#7fd0ee', Sn = '#eef5ff';
const moon = (x, y, r = 14) => [g.c(x, y, r, F('#fff6c8'))];
const star = (x, y, r = 5) => g.pg(`${x},${y - r} ${n1(x + r * 0.3)},${n1(y - r * 0.3)} ${x + r},${y} ${n1(x + r * 0.3)},${n1(y + r * 0.3)} ${x},${y + r} ${n1(x - r * 0.3)},${n1(y + r * 0.3)} ${x - r},${y} ${n1(x - r * 0.3)},${n1(y - r * 0.3)}`, F(Ye));
const home = (x, y, w, h, wall, roof, door = Br) => [g.r(x, y - h, w, h, 2, F(wall)), g.pg(`${x - 6},${y - h} ${n1(x + w / 2)},${n1(y - h * 1.5)} ${x + w + 6},${y - h}`, F(roof)), g.r(n1(x + w * 0.4), n1(y - h * 0.55), n1(w * 0.2), n1(h * 0.55), 1, F(door))];
const win = (x, y, w = 14, h = 14, col = Lb) => g.r(x, y, w, h, 2, F(col));
const smoke = (x, y) => g.p(`M${x} ${y}Q${x - 8} ${y - 10} ${x} ${y - 18}Q${x + 8} ${y - 26} ${x} ${y - 34}`);
const fish = (x, y, s, col) => { const t = T(x, y, s); return [t.pg('14,0 30,-10 30,10', F(col)), t.e(0, 0, 18, 11, F(col)), t.c(-9, -2, 2, F(D))]; };
const fence = (x0, x1, y, h = 22, col = Tn) => [g.l(x0, n1(y - h * 0.7), x1, n1(y - h * 0.7)), g.l(x0, n1(y - h * 0.3), x1, n1(y - h * 0.3)), range(Math.floor((x1 - x0) / 22) + 1, (i) => g.r(x0 + i * 22 - 3, y - h, 6, h, 1, F(col)))];
const snowman = (x, y, s = 1) => { const t = T(x, y, s); return [t.c(0, -12, 13, F(Wh)), t.c(0, -33, 10, F(Wh)), t.pg('0,-33 14,-31 0,-29', F(O)), t.c(-3, -36, 1.5, F(D)), t.c(3, -36, 1.5, F(D)), t.r(-9, -26, 18, 4, 1, F(Rd))]; };
const smallPines = (xs, y, s) => xs.map((x) => pine(x, y, s));
const lamp = (x, y, s = 1) => { const t = T(x, y, s); return [t.l(0, 0, 0, -48), t.c(0, -52, 6, F('#fff3a8'))]; };
const skyBg = (h, col = Lb) => bg(0, 0, 400, h, col, -100);
const grassBg = (y, col = '#a9dd8a') => bg(0, y, 400, 300 - y, col, -99);

// ═════════════ 1. CABANE À SUCRE EN FORÊT ═════════════
{
  A('cabane-sucre-foret', '🍁', 'La cabane à sucre dans la forêt', 'The sugar shack in the forest', 3, 45, [
    S('Trace la ligne d\'horizon : une ligne un peu ondulée au milieu de la feuille.', 'Draw the horizon line: a slightly wavy line across the middle of the page.', g.p('M0 172Q120 158 220 170T400 164')),
    S('Dessine la cabane à sucre : un gros rectangle et un toit en pointe.', 'Draw the sugar shack: a big rectangle and a pointed roof.', home(150, 190, 90, 52, Br, '#b9473a')),
    S('Ajoute la cheminée, deux fenêtres et la fumée.', 'Add the chimney, two windows and the smoke.', g.r(208, 100, 12, 24, 1, F(Gy2)), win(160, 160, 16, 16, Ye), win(204, 160, 16, 16, Ye), smoke(214, 98)),
    S('Ce qui est loin est plus petit ! Dessine de petits sapins le long de l\'horizon.', 'What is far away is smaller! Draw little fir trees along the horizon.', smallPines([20, 52, 84, 120, 276, 312, 348, 382], 172, 0.5)),
    S('Devant, dessine deux grands érables. Ce qui est proche est grand !', 'In front, draw two big maple trees. What is close is big!', tree(62, 218, 1.8, O), tree(344, 222, 1.6, Rd)),
    S('Accroche un seau sur chaque érable, avec un petit tuyau.', 'Hang a bucket on each maple, with a little spout.', g.r(52, 224, 12, 12, 2, F(Gy2)), g.l(62, 222, 66, 226), g.r(334, 226, 12, 12, 2, F(Gy2)), g.l(344, 224, 348, 228)),
    S('Dessine le sentier de neige qui va de la porte jusqu\'au bas de la feuille.', 'Draw the snowy path that goes from the door to the bottom of the page.', g.p('M186 190Q150 250 110 300L280 300Q230 250 204 190Z', F(Sn, -50))),
    S('Sur le sentier, dessine un enfant et une grosse marmite pour la tire sur la neige.', 'On the path, draw a child and a big pot for maple taffy on snow.', person(240, 280, 1.3, Rd, Bl, '#5b3a29'), g.e(296, 276, 18, 10, F(Dk)), g.l(282, 284, 280, 292), g.l(310, 284, 312, 292), g.p('M270 296Q292 290 316 296')),
    S('Dans le ciel, dessine le soleil, un nuage et un oiseau.', 'In the sky, draw the sun, a cloud and a bird.', sun(346, 52), cloud(96, 52), bird(200, 78)),
  ], 'Colorie ta cabane à sucre !', 'Color your sugar shack!', [skyBg(170), bg(0, 168, 400, 132, '#f2f7ff', -99)], 'cabane-a-sucre');
}

// ═════════════ 2. LA PATINOIRE EXTÉRIEURE ═════════════
{
  const goal = (x, y) => { const t = T(x, y); return [t.r(-16, -24, 32, 24, 1, F(Rd, 5)), t.l(-10, -24, -10, 0), t.l(0, -24, 0, 0), t.l(10, -24, 10, 0)]; };
  const skater = (x, y, s, shirt, pants, hair) => [person(x, y, s, shirt, pants, hair), g.l(x - 8 * s, y + 3 * s, x + 2 * s, y + 3 * s), g.l(x + 2 * s, y + 3 * s, x + 12 * s, y + 3 * s)];
  A('patinoire-ext', '⛸️', 'La patinoire dans la cour', 'The outdoor skating rink', 2, 30, [
    S('Trace la ligne d\'horizon, bien droite, à peu près au tiers de la feuille.', 'Draw the horizon line, nice and straight, about a third of the way down.', g.l(0, 110, 400, 110)),
    S('Dessine la patinoire : un grand rectangle aux coins ronds. Elle prend beaucoup de place.', 'Draw the rink: a big rectangle with round corners. It takes lots of room.', g.r(40, 140, 320, 140, 28, F(Cy))),
    S('Ajoute la bande tout autour, comme une deuxième ligne.', 'Add the boards all around, like a second line.', g.r(28, 128, 344, 164, 34)),
    S('Dessine un but de hockey de chaque côté de la glace.', 'Draw a hockey net on each side of the ice.', goal(72, 232), goal(328, 232)),
    S('Derrière, dessine de petits sapins couverts de neige. Ils sont loin, alors ils sont petits.', 'Behind, draw little snowy fir trees. They are far, so they are small.', smallPines([20, 56, 100, 150, 250, 300, 346, 384], 112, 0.7)),
    S('Dessine trois patineurs sur la glace. Celui qui est en bas est plus grand.', 'Draw three skaters on the ice. The one at the bottom is bigger.', skater(120, 206, 0.8, Rd, Dk, '#5b3a29'), skater(250, 216, 0.9, Gr, Pu, '#e0a030'), skater(200, 262, 1.1, Bl, Dk, '#2d2a3a')),
    S('Ajoute un petit rond pour la rondelle et un bâton de hockey.', 'Add a little circle for the puck and a hockey stick.', g.e(172, 250, 7, 3, F(D)), g.l(214, 262, 232, 244), g.l(232, 244, 240, 246)),
    S('Dessine deux lampadaires et un bonhomme de neige à côté de la patinoire.', 'Draw two lamp posts and a snowman beside the rink.', lamp(14, 124, 1.6), lamp(386, 124, 1.6), snowman(384, 292, 1)),
    S('Dessine le soleil d\'hiver et deux nuages.', 'Draw the winter sun and two clouds.', sun(330, 44), cloud(90, 40), cloud(200, 62, 0.8)),
  ], 'Colorie ta patinoire !', 'Color your rink!', [skyBg(110), bg(0, 110, 400, 190, '#f2f7ff', -99)], 'hiver');
}

// ═════════════ 3. LE VIEUX-QUÉBEC LA NUIT ═════════════
{
  const chateau = [g.r(200, 70, 120, 100, 2, F('#6f9a86')), g.pg('196,70 260,30 324,70', F('#6f9a86')), g.r(188, 40, 28, 130, 2, F('#6f9a86')), g.pg('186,40 202,6 218,40', F('#4f7a68')), g.r(300, 56, 32, 114, 2, F('#6f9a86')), g.pg('298,56 316,22 334,56', F('#4f7a68')), range(4, (i) => win(224 + i * 22, 96, 10, 14, Ye)), range(4, (i) => win(224 + i * 22, 130, 10, 14, Ye))];
  const rue = (x, y, w, h, wall, roof) => [g.r(x, y - h, w, h, 1, F(wall)), g.pg(`${x},${y - h} ${x + w / 2},${y - h - 18} ${x + w},${y - h}`, F(roof)), win(x + 8, y - h + 10, 12, 14, Ye), win(x + w - 20, y - h + 10, 12, 14, Ye), win(x + 8, y - h + 34, 12, 14, Ye), win(x + w - 20, y - h + 34, 12, 14, Ye)];
  A('vieux-quebec-nuit', '🏰', 'Le Vieux-Québec la nuit', 'Old Quebec City at night', 3, 50, [
    S('Trace la ligne d\'horizon : une ligne droite aux deux tiers de la feuille.', 'Draw the horizon line: a straight line two thirds down the page.', g.l(0, 215, 400, 215)),
    S('Sur la colline, dessine le grand château avec une tour de chaque côté.', 'On the hill, draw the big castle with a tower on each side.', g.p('M150 215Q190 170 260 168Q340 168 400 190L400 215Z', F('#4a5a78')), chateau),
    S('À gauche, dessine trois maisons collées avec des toits pointus.', 'On the left, draw three houses side by side with pointed roofs.', rue(10, 215, 44, 56, Br, Rd), rue(54, 215, 44, 70, Tn, Pu), rue(98, 215, 44, 48, '#d48a6a', Bl)),
    S('Dessine le fleuve en bas avec un pont de bois et un petit bateau.', 'Draw the river at the bottom with a wooden bridge and a little boat.', g.r(0, 240, 400, 60, 0, F('#3d5a9a', -40)), g.r(120, 252, 110, 9, 2, F(Br)), g.l(130, 261, 130, 276), g.l(170, 261, 170, 276), g.l(220, 261, 220, 276), g.pg('290,262 340,262 330,276 300,276', F(Rd)), g.l(315, 262, 315, 234), g.pg('315,234 315,258 336,258', F(Wh))),
    S('Ajoute la lune dans le ciel.', 'Add the moon in the sky.', moon(66, 44, 22)),
    S('Dessine plein d\'étoiles qui brillent.', 'Draw lots of shining stars.', star(120, 30), star(150, 66, 4), star(210, 18, 4), star(370, 20), star(366, 80, 5), star(30, 100, 4), star(380, 130, 4)),
    S('Dessine trois lampadaires le long de la rue.', 'Draw three lamp posts along the street.', lamp(30, 292, 1), lamp(190, 292, 1), lamp(360, 292, 1)),
    S('Ajoute des petits traits de lumière dans l\'eau, sous le château.', 'Add little lines of light in the water, under the castle.', g.l(230, 262, 238, 262), g.l(250, 270, 262, 270), g.l(270, 280, 280, 280), g.l(240, 288, 250, 288)),
  ], 'Colorie ta nuit à Québec !', 'Color your night in Quebec City!', [bg(0, 0, 400, 240, Nb, -100), bg(0, 240, 400, 60, '#2d4a86', -90)]);
}

// ═════════════ 4. LA FERME ET LA GRANGE ═════════════
{
  const cow = (x, y, s) => { const t = T(x, y, s); return [t.r(-22, -6, 5, 14, 1, F(Wh)), t.r(-10, -6, 5, 14, 1, F(Wh)), t.r(8, -6, 5, 14, 1, F(Wh)), t.r(18, -6, 5, 14, 1, F(Wh)), t.e(0, -16, 28, 16, F(Wh)), t.c(-14, -20, 6, F(Dk)), t.c(8, -12, 5, F(Dk)), t.e(-30, -26, 10, 9, F(Wh)), t.e(-36, -23, 5, 4, F(Pk)), t.l(-30, -35, -32, -42), t.l(-25, -34, -24, -41), t.p('M28-18Q38-12 36 0')]; };
  const hen = (x, y, s) => { const t = T(x, y, s); return [t.e(0, -8, 11, 9, F(Wh)), t.c(-9, -18, 6, F(Wh)), t.pg('-14,-18 -20,-16 -14,-14', F(O)), t.c(-9, -24, 3, F(Rd)), t.c(-10, -19, 1.2, F(D)), t.l(-3, 0, -3, 5), t.l(3, 0, 3, 5)]; };
  A('ferme-grange', '🐄', 'La ferme et la grande grange', 'The farm and the big barn', 2, 35, [
    S('Trace la ligne d\'horizon : une ligne douce qui montre où la terre rencontre le ciel.', 'Draw the horizon line: a soft line where the land meets the sky.', g.p('M0 150Q100 140 200 150T400 148')),
    S('Dessine la grange : un grand rectangle rouge avec un toit en deux pentes.', 'Draw the barn: a big red rectangle with a two-slope roof.', g.r(120, 130, 110, 65, 2, F(Rd)), g.pg('112,132 175,92 238,132', F('#8a3a30'))),
    S('Ajoute la grande porte avec un X, et une petite fenêtre en haut.', 'Add the big door with an X, and a little window at the top.', g.r(155, 160, 40, 35, 1, F(Wh)), g.l(155, 160, 195, 195), g.l(195, 160, 155, 195), g.c(175, 118, 8, F(Ye))),
    S('À côté, dessine le silo : un grand cylindre avec un toit rond.', 'Next to it, draw the silo: a tall cylinder with a round roof.', g.r(246, 100, 32, 95, 3, F(Gy)), g.p('M246 100Q262 76 278 100Z', F(Gy2)), g.l(246, 125, 278, 125), g.l(246, 150, 278, 150)),
    S('Au loin, dessine de petits arbres. Ils sont petits parce qu\'ils sont loin.', 'Far away, draw little trees. They are small because they are far.', tree(20, 148, 0.6), tree(52, 150, 0.5), tree(330, 150, 0.6), tree(368, 148, 0.7)),
    S('Dessine la clôture en bois de chaque côté de la grange.', 'Draw the wooden fence on each side of the barn.', fence(0, 108, 205, 24), fence(290, 400, 205, 24)),
    S('Dessine le chemin de terre qui part de la grange jusqu\'en bas.', 'Draw the dirt road that goes from the barn down to the bottom.', g.p('M165 195Q150 250 120 300L240 300Q205 250 185 195Z', F(Tn, -50))),
    S('Dessine une grande vache devant, et une vache plus petite derrière. La plus proche est la plus grosse !', 'Draw a big cow in front, and a smaller cow behind. The closest one is the biggest!', cow(66, 236, 0.8), cow(318, 268, 1.4)),
    S('Ajoute trois poules et un fermier avec un chapeau.', 'Add three hens and a farmer with a hat.', hen(150, 282, 1), hen(95, 290, 1.1), hen(262, 240, 0.9), person(215, 292, 1.3, Bl, Dk, '#5b3a29'), g.r(203, 218, 24, 4, 1, F(Ye)), g.r(207, 208, 16, 11, 2, F(Ye))),
    S('Dessine le soleil, un nuage et deux oiseaux dans le ciel.', 'Draw the sun, a cloud and two birds in the sky.', sun(340, 46), cloud(100, 50), bird(210, 70), bird(240, 52, 0.8)),
  ], 'Colorie ta ferme !', 'Color your farm!', [skyBg(150), grassBg(148, '#b6e48e')]);
}

// ═════════════ 5. LA PLAGE ═════════════
{
  const Sa = '#f6dfa4';
  const parasol = (x, y) => [g.l(x, y, x, y - 70), g.p(`M${x - 44} ${y - 66}Q${x} ${y - 110} ${x + 44} ${y - 66}Z`, F(Rd)), g.p(`M${x - 14} ${y - 70}Q${x - 14} ${y - 100} ${x} ${y - 90}`), g.p(`M${x + 14} ${y - 70}Q${x + 14} ${y - 100} ${x} ${y - 90}`)];
  A('plage-ete', '🏖️', 'Une journée à la plage', 'A day at the beach', 2, 30, [
    S('Trace la ligne d\'horizon : une ligne droite où la mer touche le ciel.', 'Draw the horizon line: a straight line where the sea touches the sky.', g.l(0, 125, 400, 125)),
    S('Dessine la rive : une grande vague de sable qui sépare la mer et la plage.', 'Draw the shore: a big wavy edge that separates the sea and the beach.', g.p('M0 205Q100 188 200 205T400 198L400 300L0 300Z', F(Sa))),
    S('Au loin, sur la mer, dessine un tout petit voilier. Il est petit car il est loin.', 'Far out on the sea, draw a tiny sailboat. It is small because it is far.', g.pg('290,128 330,128 322,138 298,138', F(Rd)), g.pg('310,126 310,100 326,124', F(Wh)), g.l(310, 128, 310, 98)),
    S('Dessine une grande serviette rayée et un parasol qui donne de l\'ombre.', 'Draw a big striped towel and a parasol that gives shade.', g.r(60, 250, 90, 36, 2, F(Ye)), g.l(60, 262, 150, 262), g.l(60, 274, 150, 274), parasol(105, 252)),
    S('Fais un château de sable : un gros rectangle, deux tours et un petit drapeau.', 'Build a sandcastle: a big rectangle, two towers and a little flag.', g.r(250, 232, 80, 44, 2, F('#e8c88a')), g.r(244, 212, 22, 64, 2, F('#e8c88a')), g.r(314, 212, 22, 64, 2, F('#e8c88a')), g.l(290, 232, 290, 206), g.pg('290,206 290,218 306,212', F(Rd))),
    S('Dessine deux enfants qui jouent : un avec un seau, un avec une pelle.', 'Draw two children playing: one with a bucket, one with a shovel.', person(205, 286, 1.2, Pk, Bl, '#5b3a29'), g.r(224, 270, 14, 12, 2, F(Ye)), person(350, 290, 1.1, Gr, Rd, '#e0a030'), g.l(362, 276, 372, 262)),
    S('Dans l\'eau, ajoute des vagues et un gros ballon. Sur le sable, une étoile de mer.', 'In the water, add waves and a big beach ball. On the sand, a starfish.', g.p('M20 150Q40 142 60 150T100 150'), g.p('M180 170Q200 162 220 170T260 170'), g.c(120, 175, 14, F(Pk)), g.l(106, 175, 134, 175), star(30, 252, 12)),
    S('Ajoute le gros soleil, un nuage et des mouettes.', 'Add the big sun, a cloud and seagulls.', sun(60, 50, 1.4), cloud(250, 50), bird(190, 80), bird(215, 98, 0.8), bird(360, 70)),
  ], 'Colorie ta plage !', 'Color your beach!', [skyBg(125, '#bfe9ff'), bg(0, 125, 400, 80, '#59b9e8', -99)], 'ete');
}

// ═════════════ 6. LE FOND MARIN ═════════════
{
  const Sa4 = '#f1d9a0';
  const weed = (x, y, h) => g.p(`M${x} ${y}Q${x - 12} ${y - h / 3} ${x} ${y - h / 2}T${x} ${y - h}`);
  const coral = (x, y, col) => [g.p(`M${x} ${y}V${y - 36}M${x} ${y - 20}L${x - 14} ${y - 34}M${x} ${y - 26}L${x + 14} ${y - 42}`, `f="none"`), g.c(x, y - 38, 6, F(col)), g.c(x - 15, y - 36, 5, F(col)), g.c(x + 15, y - 44, 5, F(col))];
  const octo = (x, y) => { const t = T(x, y); return [t.p('M-18 10Q-34 24 -24 36', ''), t.p('M-8 14Q-12 32 -4 40', ''), t.p('M8 14Q12 32 4 40', ''), t.p('M18 10Q34 24 24 36', ''), t.e(0, 0, 22, 20, F(Pu)), t.c(-8, -2, 4, F(Wh)), t.c(8, -2, 4, F(Wh)), t.c(-8, -2, 1.6, F(D)), t.c(8, -2, 1.6, F(D))]; };
  A('fond-marin', '🐠', 'Au fond de la mer', 'At the bottom of the sea', 3, 40, [
    S('Trace le fond de la mer : une ligne ondulée en bas de la feuille.', 'Draw the sea floor: a wavy line at the bottom of the page.', g.p('M0 252Q100 236 200 252T400 246L400 300L0 300Z', F(Sa4))),
    S('Dessine deux gros rochers sur le fond.', 'Draw two big rocks on the sea floor.', g.p('M20 258Q20 218 62 220Q92 224 96 258Z', F(Gy2)), g.p('M310 254Q316 214 350 212Q384 216 390 254Z', F(Gy2))),
    S('Ajoute des algues qui dansent : des lignes qui montent en vagues.', 'Add dancing seaweed: lines that go up in waves.', weed(120, 256, 90), weed(138, 256, 60), weed(260, 252, 100), weed(282, 254, 64)),
    S('Dessine des coraux qui ressemblent à des petits arbres avec des boules au bout.', 'Draw corals like little trees with balls at the ends.', coral(180, 252, Pk), coral(224, 248, O), coral(70, 224, Rd)),
    S('Dessine une pieuvre sur le rocher de droite.', 'Draw an octopus on the right rock.', octo(350, 200)),
    S('Dessine un gros poisson devant, à gauche. Il est proche : on le fait grand !', 'Draw a big fish in front, on the left. It is close: draw it big!', fish(110, 120, 2.2, Ye)),
    S('Ajoute deux poissons moyens, et trois tout petits au loin.', 'Add two medium fish, and three tiny ones far away.', fish(280, 100, 1.2, Bl), fish(230, 170, 1.1, Gr), fish(190, 60, 0.5, O), fish(240, 50, 0.5, O), fish(330, 150, 0.5, Pk)),
    S('Dessine un crabe et une étoile de mer sur le sable.', 'Draw a crab and a starfish on the sand.', g.e(160, 280, 14, 9, F(Rd)), g.l(146, 276, 136, 266), g.l(174, 276, 184, 266), g.c(136, 264, 4, F(Rd)), g.c(184, 264, 4, F(Rd)), star(230, 276, 12)),
    S('Dessine des bulles de toutes grandeurs qui montent vers le haut.', 'Draw bubbles of all sizes going up.', g.c(60, 60, 8), g.c(76, 40, 5), g.c(52, 24, 4), g.c(330, 40, 9), g.c(346, 20, 5), g.c(300, 70, 4)),
  ], 'Colorie le fond de la mer !', 'Color the sea bottom!', [bg(0, 0, 400, 300, '#8fdcf5', -100), bg(0, 130, 400, 170, '#59b9e8', -99)]);
}

// ═════════════ 7. LA JUNGLE ET SES LIANES ═════════════
{
  const leaf = (x, y, a, s) => { const c = Math.cos(a * Math.PI / 180), n = Math.sin(a * Math.PI / 180), p = (u, v) => `${n1(x + (u * c - v * n) * s)} ${n1(y + (u * n + v * c) * s)}`; return [g.p(`M${p(0, 0)}Q${p(20, -24)} ${p(56, 0)}Q${p(20, 24)} ${p(0, 0)}Z`, F(Gr)), g.l(x, y, ...p(50, 0).split(' ').map(Number))]; };
  const monkey = (x, y) => { const t = T(x, y); return [t.p('M0 -14Q-6-30 -4-46', ''), t.e(0, 24, 10, 16, F(Br)), t.p('M10 34Q34 40 30 18', ''), t.c(0, 4, 12, F(Br)), t.c(-12, 2, 5, F(Br)), t.c(12, 2, 5, F(Br)), t.c(0, 8, 8, F(Tn)), t.c(-4, 3, 1.8, F(D)), t.c(4, 3, 1.8, F(D)), t.p('M-4 10Q0 13 4 10', '')]; };
  const parrot = (x, y) => { const t = T(x, y); return [t.p('M-6 14L-20 40M0 14L-6 42M6 14L8 40', ''), t.e(0, 0, 11, 16, F(Rd)), t.e(5, 2, 6, 11, F(Bl)), t.c(-2, -20, 9, F(Rd)), t.pg('-8,-22 -20,-16 -9,-13', F(Ye)), t.c(-4, -23, 1.8, F(D))]; };
  const tiger = (x, y) => { const t = T(x, y); return [t.r(-34, 4, 8, 22, 3, F(O)), t.r(-18, 6, 8, 20, 3, F(O)), t.r(20, 6, 8, 20, 3, F(O)), t.r(36, 4, 8, 22, 3, F(O)), t.p('M46 -4Q66 -8 66 -26', ''), t.e(0, 0, 46, 22, F(O)), t.c(-52, -10, 17, F(O)), t.c(-60, -26, 6, F(O)), t.c(-44, -26, 6, F(O)), t.c(-58, -12, 2, F(D)), t.c(-46, -12, 2, F(D)), t.pg('-55,-4 -49,-4 -52,0', F(Pk)), t.l(-12, -20, -8, -6), t.l(2, -21, 6, -6), t.l(16, -19, 20, -5), t.l(28, -16, 30, -4)]; };
  A('jungle-lianes', '🐒', 'La jungle et ses lianes', 'The jungle and its vines', 3, 45, [
    S('Trace la ligne d\'horizon bien en bas : le sol de la jungle et une rivière.', 'Draw the horizon line low on the page: the jungle floor and a river.', g.p('M0 225Q100 215 200 225T400 220')),
    S('Dessine trois gros troncs d\'arbres, bien droits, qui montent jusqu\'en haut.', 'Draw three big tree trunks, standing straight up to the top.', g.r(40, 0, 36, 226, 6, F('#8a5a36', 2)), g.r(176, 0, 30, 222, 6, F('#8a5a36', 2)), g.r(318, 0, 40, 224, 6, F('#8a5a36', 2))),
    S('Dessine de grandes feuilles vertes qui sortent des troncs.', 'Draw big green leaves coming out of the trunks.', leaf(76, 70, -20, 1.4), leaf(76, 120, 20, 1.2), leaf(176, 50, 200, 1.4), leaf(206, 100, -10, 1.2), leaf(318, 60, 160, 1.4), leaf(318, 130, 200, 1.1)),
    S('Dessine deux lianes qui pendent entre les arbres.', 'Draw two vines hanging between the trees.', g.p('M76 20Q140 90 176 20', 'f="none" z="3"'), g.p('M206 30Q262 110 318 30', 'f="none" z="3"')),
    S('Suspends un singe à une liane.', 'Hang a monkey from a vine.', monkey(142, 82)),
    S('Dessine un perroquet de couleur sur une branche.', 'Draw a colorful parrot on a branch.', g.l(206, 150, 262, 150), parrot(246, 126)),
    S('Dessine la rivière en bas, avec des vagues et un nénuphar.', 'Draw the river at the bottom, with waves and a water lily.', g.r(0, 244, 400, 56, 0, F(Bl, 4)), g.p('M20 266Q40 258 60 266T100 266'), g.p('M240 280Q260 272 280 280T320 280'), g.e(150, 264, 22, 8, F(Gr, 5))),
    S('Dessine un tigre sur la berge, entre les troncs. Il est plus gros que le singe !', 'Draw a tiger on the bank, between the trunks. It is bigger than the monkey!', tiger(262, 214)),
    S('Ajoute des fleurs rouges au sol et un gros papillon.', 'Add red flowers on the ground and a big butterfly.', g.c(100, 236, 7, F(Rd)), g.c(120, 242, 6, F(Pk)), g.c(350, 238, 7, F(Rd)), g.e(60, 190, 14, 9, F(Pu)), g.e(78, 190, 14, 9, F(Pu)), g.l(66, 190, 72, 190)),
  ], 'Colorie ta jungle !', 'Color your jungle!', [bg(0, 0, 400, 226, '#cdeeb0', -100), bg(0, 225, 400, 75, '#7fb866', -99)]);
}

// ═════════════ 8. LA VILLE LA NUIT ═════════════
{
  const bld = (x, w, h, col) => g.r(x, 240 - h, w, h, 1, F(col));
  const wins = (x, y, cols, rows, sx, sy, col = Ye) => range(cols * rows, (i) => g.r(x + (i % cols) * sx, y + Math.floor(i / cols) * sy, 8, 10, 1, F(col)));
  const car = (x, y, s, col) => { const t = T(x, y, s); return [t.r(-26, -16, 52, 16, 5, F(col)), t.p('M-14-16Q-10-30 0-30H12Q20-30 24-16Z', F(col)), t.r(-10, -26, 8, 8, 1, F(Lb)), t.r(2, -26, 8, 8, 1, F(Lb)), t.c(-14, 0, 6, F(D)), t.c(14, 0, 6, F(D)), t.c(26, -9, 3, F(Ye))]; };
  A('ville-nuit', '🌃', 'La ville la nuit', 'The city at night', 3, 45, [
    S('Trace la ligne d\'horizon : une ligne droite en bas, là où les maisons touchent la rue.', 'Draw the horizon line: a straight line low down, where the buildings touch the street.', g.l(0, 240, 400, 240)),
    S('Dessine cinq petits immeubles au loin. Ils sont bas parce qu\'ils sont loin.', 'Draw five small buildings far away. They are short because they are far.', bld(0, 50, 70, '#5a6591'), bld(70, 40, 60, '#5a6591'), bld(180, 50, 74, '#5a6591'), bld(250, 44, 66, '#5a6591'), bld(360, 40, 78, '#5a6591')),
    S('Devant, dessine trois grands immeubles de hauteurs différentes.', 'In front, draw three big buildings of different heights.', bld(30, 70, 150, '#3f4a7a'), bld(122, 60, 196, '#4a3f7a'), bld(250, 76, 130, '#3f4a7a')),
    S('Sur le plus haut, ajoute une antenne avec un petit cercle rouge.', 'On the tallest, add an antenna with a little red circle.', g.l(152, 44, 152, 14), g.c(152, 10, 4, F(Rd))),
    S('Dessine les fenêtres : des petits rectangles bien alignés en lignes et en colonnes.', 'Draw the windows: little rectangles lined up in rows and columns.', wins(42, 106, 4, 6, 16, 22), wins(134, 62, 3, 7, 18, 22), wins(262, 130, 4, 4, 16, 22)),
    S('Dessine la route en bas, avec des lignes au milieu.', 'Draw the road at the bottom, with lines in the middle.', g.r(0, 240, 400, 60, 0, F(Dk)), range(6, (i) => g.l(10 + i * 70, 272, 42 + i * 70, 272))),
    S('Dessine deux voitures sur la route. La plus basse est la plus proche, donc la plus grosse.', 'Draw two cars on the road. The lower one is closer, so it is bigger.', car(110, 262, 0.8, Rd), car(290, 286, 1.2, Ye)),
    S('Ajoute un lampadaire et un feu de circulation sur le trottoir.', 'Add a lamp post and a traffic light on the sidewalk.', lamp(22, 244, 1.2), g.l(380, 244, 380, 180), g.r(372, 150, 16, 34, 3, F(D)), g.c(380, 158, 4, F(Rd)), g.c(380, 168, 4, F(Ye)), g.c(380, 178, 4, F(Gr))),
    S('Dans le ciel, dessine la grosse lune et des étoiles.', 'In the sky, draw the big moon and some stars.', moon(330, 40, 22), star(60, 30), star(110, 70, 4), star(230, 24, 4), star(210, 80, 5), star(290, 90, 4)),
  ], 'Colorie ta ville la nuit !', 'Color your city at night!', [bg(0, 0, 400, 240, Nb, -100), bg(0, 240, 400, 60, '#8a90a8', -99)]);
}

// ═════════════ 9. LE PARC EN AUTOMNE ═════════════
{
  const squirrel = (x, y) => { const t = T(x, y); return [t.p('M8 0Q30 -4 24 -24Q20 -34 12 -26', 'f="none"'), t.e(0, -8, 10, 8, F(Br)), t.c(-9, -16, 6, F(Br)), t.c(-12, -17, 1.4, F(D)), t.pg('-13,-21 -10,-27 -7,-21', F(Br))]; };
  const leafBits = (pts) => pts.map(([x, y, c]) => g.pg(`${x},${y - 5} ${x + 4},${y} ${x},${y + 5} ${x - 4},${y}`, F(c)));
  A('parc-automne', '🍂', 'Le parc en automne', 'The park in autumn', 2, 35, [
    S('Trace la ligne d\'horizon : une ligne douce, un peu au-dessus du milieu.', 'Draw the horizon line: a soft line, a bit above the middle.', g.p('M0 140Q100 128 200 140T400 134')),
    S('Au loin, dessine six petits arbres. Ils sont tout petits car ils sont loin.', 'Far away, draw six little trees. They are tiny because they are far.', tree(24, 142, 0.6, O), tree(64, 140, 0.5, Rd), tree(104, 142, 0.6, Ye), tree(300, 138, 0.5, O), tree(340, 136, 0.6, Rd), tree(378, 138, 0.5, Ye)),
    S('Dessine un étang : un grand ovale à droite.', 'Draw a pond: a big oval on the right.', g.e(300, 190, 76, 24, F(Bl)), g.p('M262 190Q280 184 296 190T332 190')),
    S('Devant, dessine deux grands arbres. L\'orange est à gauche, le rouge est à droite.', 'In front, draw two big trees. The orange one is on the left, the red one on the right.', tree(70, 215, 2.2, O), tree(356, 192, 1.8, Rd)),
    S('Dessine un banc en bois près de l\'étang : le dossier, le siège et les pattes.', 'Draw a wooden bench near the pond: the back, the seat and the legs.', g.r(150, 204, 76, 14, 2, F(Tn)), g.r(150, 224, 76, 9, 2, F(Tn)), g.l(156, 233, 156, 246), g.l(220, 233, 220, 246)),
    S('Dessine un enfant avec un râteau, et une grosse pile de feuilles.', 'Draw a child with a rake, and a big pile of leaves.', g.e(258, 276, 40, 15, F(O)), person(168, 288, 1.4, Bl, Dk, '#5b3a29'), g.l(184, 286, 206, 240), g.l(198, 244, 216, 248)),
    S('Dessine un écureuil au pied du grand arbre.', 'Draw a squirrel at the foot of the big tree.', squirrel(112, 262)),
    S('Fais tomber des feuilles : des petits losanges qui volent partout.', 'Make leaves fall: little diamonds flying everywhere.', leafBits([[40, 90, O], [130, 100, Rd], [220, 70, Ye], [300, 100, O], [340, 60, Rd], [90, 160, Ye], [250, 240, Rd], [30, 250, O]])),
    S('Dessine le soleil d\'automne, un nuage et trois oiseaux.', 'Draw the autumn sun, a cloud and three birds.', sun(330, 40, 0.9), cloud(120, 38), bird(220, 56), bird(244, 72, 0.8), bird(196, 80, 0.7)),
  ], 'Colorie ton parc !', 'Color your park!', [skyBg(140, '#d6efff'), grassBg(138, '#c4e08a')], 'automne');
}

// ═════════════ 10. L'ESPACE ET LES PLANÈTES ═════════════
{
  const rocket = (x, y, s) => { const t = T(x, y, s); return [t.pg('-14,4 -30,30 -14,22', F(Rd)), t.pg('14,4 30,30 14,22', F(Rd)), t.p('M0-56Q20-34 14 22H-14Q-20-34 0-56Z', F(Wh)), t.p('M-10-40Q0-60 10-40Z', F(Rd)), t.c(0, -14, 8, F(Bl)), t.p('M-9 22Q0 52 9 22Z', F(O))]; };
  const astro = (x, y, s) => { const t = T(x, y, s); return [t.r(-8, 12, 6, 14, 3, F(Wh)), t.r(2, 12, 6, 14, 3, F(Wh)), t.r(-10, -8, 20, 22, 5, F(Wh)), t.l(-10, -2, -18, 8), t.l(10, -2, 18, -6), t.c(0, -20, 11, F(Wh)), t.c(2, -20, 7, F(Bl))]; };
  A('espace-planetes', '🪐', 'L\'espace et les planètes', 'Space and the planets', 3, 40, [
    S('Trace la grande planète en bas : un grand arc qui monte au milieu.', 'Draw the big planet at the bottom: a big arc rising in the middle.', g.p('M-40 300Q200 180 440 300Z', F(Gy2))),
    S('Ajoute des cratères : des ronds de différentes grosseurs sur la planète.', 'Add craters: circles of different sizes on the planet.', g.e(110, 270, 22, 8), g.e(260, 256, 18, 6), g.e(340, 280, 26, 8), g.e(200, 286, 12, 4)),
    S('Dessine une fusée qui a atterri sur la planète : le corps, la pointe et deux ailerons.', 'Draw a rocket that landed on the planet: the body, the nose and two fins.', rocket(190, 226, 1.1)),
    S('Dessine un astronaute à côté de la fusée.', 'Draw an astronaut next to the rocket.', astro(270, 252, 1.2)),
    S('En haut à gauche, dessine une planète avec un anneau, comme Saturne.', 'At the top left, draw a planet with a ring, like Saturn.', g.c(70, 70, 24, F(Pk)), g.e(70, 74, 44, 10)),
    S('À droite, dessine une très grosse planète avec des rayures.', 'On the right, draw a very big planet with stripes.', g.c(320, 80, 36, F(O)), g.p('M286 68Q320 58 354 68'), g.p('M284 86Q320 96 356 86')),
    S('Dessine un croissant de lune et une petite planète verte avec deux petits trous.', 'Draw a crescent moon and a small green planet with two little holes.', g.c(180, 40, 14, F(Cr)), g.c(210, 120, 16, F(Gr)), g.c(205, 118, 3), g.c(216, 126, 2.5)),
    S('Remplis le ciel de petites étoiles, et ajoute une comète avec sa queue.', 'Fill the sky with little stars and add a comet with its tail.', star(30, 130), star(130, 20), star(250, 24, 4), star(130, 130, 4), star(380, 150, 5), star(370, 30, 4), g.c(260, 160, 6, F(Wh)), g.p('M254 164L214 184'), g.p('M258 168L226 198')),
  ], 'Colorie l\'espace !', 'Color space!', [bg(0, 0, 400, 300, '#2a2f5a', -100)]);
}

// ═════════════ 11. LE CHÂTEAU FORT ═════════════
{
  const crenel = (x0, y, k) => range(k, (i) => g.r(x0 + i * 22, y - 12, 12, 12, 1, F(Gy)));
  A('chateau-fort', '🏰', 'Le château fort', 'The castle', 3, 45, [
    S('Trace la ligne d\'horizon, et une colline douce où le château va se tenir.', 'Draw the horizon line, and a soft hill where the castle will stand.', g.p('M0 190Q100 176 200 186T400 184')),
    S('Dessine le grand mur du château : un long rectangle avec des créneaux en haut.', 'Draw the castle\'s big wall: a long rectangle with battlements on top.', g.r(110, 116, 180, 74, 2, F(Gy)), crenel(116, 116, 8)),
    S('Ajoute deux grosses tours, une à chaque bout du mur, avec un toit pointu.', 'Add two big towers, one at each end of the wall, with pointed roofs.', g.r(88, 70, 40, 120, 2, F(Gy2)), g.pg('82,70 108,28 134,70', F(Rd)), g.r(272, 70, 40, 120, 2, F(Gy2)), g.pg('266,70 292,28 318,70', F(Rd)), g.r(104, 100, 8, 20, 4, F(Dk)), g.r(288, 100, 8, 20, 4, F(Dk))),
    S('Dessine la grande porte voûtée au milieu, avec des lignes pour la herse.', 'Draw the big arched gate in the middle, with lines for the portcullis.', g.p('M180 190V152Q200 120 220 152V190Z', F(Br)), g.l(190, 140, 190, 190), g.l(200, 132, 200, 190), g.l(210, 140, 210, 190)),
    S('Dessine les douves, l\'eau devant le château, et le pont-levis en bois.', 'Draw the moat, the water in front of the castle, and the wooden drawbridge.', g.p('M0 200Q100 194 200 200T400 198V236H0Z', F(Bl, 3)), g.pg('176,198 224,198 238,238 162,238', F(Tn, 4))),
    S('Plante un drapeau sur chaque tour.', 'Plant a flag on each tower.', g.l(108, 28, 108, 6), g.pg('108,6 108,18 128,12', F(Pu)), g.l(292, 28, 292, 6), g.pg('292,6 292,18 312,12', F(Ye))),
    S('Dessine un grand arbre à gauche, plus gros que le château.', 'Draw a big tree on the left, bigger than the castle.', tree(36, 200, 2, Dg)),
    S('Devant, dessine un chevalier avec un casque, une épée et un bouclier.', 'In front, draw a knight with a helmet, a sword and a shield.', person(320, 290, 1.5, Gy2, Dk, Gy2), g.l(340, 262, 356, 232), g.l(350, 244, 362, 248), g.pg('292,264 312,264 312,280 302,290 292,280', F(Rd))),
    S('Dans le ciel, dessine le soleil, deux nuages et un dragon qui vole au loin.', 'In the sky, draw the sun, two clouds and a dragon flying far away.', sun(340, 50, 0.9), cloud(60, 42), cloud(190, 52, 0.8), g.e(220, 100, 14, 6, F(Gr)), g.p('M208 98Q196 84 202 76Q210 86 214 96', F(Gr)), g.p('M232 98Q244 84 238 76Q230 86 226 96', F(Gr)), g.p('M234 102Q250 108 252 98')),
  ], 'Colorie ton château !', 'Color your castle!', [skyBg(190), grassBg(184, '#a9dd8a')]);
}

// ═════════════ 12. LE MARCHÉ DE FRUITS ═════════════
{
  const stand = (x, col2) => [g.l(x, 82, x, 170), g.l(x + 110, 82, x + 110, 170), stripes(x - 6, 6, 20, 58, 86, [col2, Wh]), g.r(x - 4, 150, 118, 30, 3, F(Br))];
  const fruits = (x, y, n, r, col) => range(n, (i) => g.c(x + i * (r * 2 - 1), y - r + 2, r, F(col)));
  A('marche-fruits', '🍎', 'Le marché de fruits', 'The fruit market', 2, 35, [
    S('Trace la ligne d\'horizon : une ligne droite pour le mur au fond du marché.', 'Draw the horizon line: a straight line for the wall at the back of the market.', g.l(0, 130, 400, 130)),
    S('Dessine le premier kiosque : deux poteaux et un toit à rayures.', 'Draw the first stall: two posts and a striped roof.', stand(30, Rd)),
    S('Dessine le deuxième kiosque, un peu plus loin à droite, avec un toit à rayures vertes.', 'Draw the second stall, a little farther on the right, with a green striped roof.', stand(260, Gr)),
    S('Sur la table de gauche, empile des pommes rouges et des oranges.', 'On the left table, pile up red apples and oranges.', fruits(42, 150, 5, 9, Rd), fruits(52, 132, 4, 9, O), fruits(62, 114, 3, 9, Rd)),
    S('Sur la table de droite, mets des citrons, des raisins et une grosse pastèque.', 'On the right table, put lemons, grapes and a big watermelon.', fruits(272, 150, 4, 9, Ye), g.e(350, 142, 26, 16, F(Gr)), g.p('M338 134Q350 128 362 134'), range(5, (i) => g.c(300 + (i % 3) * 14 - (i > 2 ? 7 : 0), 130 - Math.floor(i / 3) * 12, 7, F(Pu)))),
    S('Derrière la table, dessine un vendeur avec un tablier et un grand sourire.', 'Behind the table, draw a seller with an apron and a big smile.', person(112, 190, 1.2, Wh, Dk, '#5b3a29'), g.p('M103 156Q112 162 121 156')),
    S('Devant, dessine une cliente avec un grand panier plein de fruits. Elle est proche, donc grande.', 'In front, draw a customer with a big basket full of fruit. She is close, so she is big.', person(220, 292, 1.7, Pu, Pk, '#2d2a3a'), g.p('M248 268Q248 290 270 290Q292 290 292 268Z', F(Tn)), g.c(260, 266, 7, F(Rd)), g.c(276, 264, 7, F(O))),
    S('Ajoute une banderole avec des fanions en haut et une petite poule dans la rue.', 'Add a banner with little flags on top and a small hen in the street.', festoon(0, 24, 200, 54, 400, 24, 9, [Rd, Ye, Bl, Gr]), g.e(340, 274, 14, 10, F(Wh)), g.c(330, 262, 6, F(Wh)), g.c(330, 255, 3, F(Rd))),
  ], 'Colorie ton marché !', 'Color your market!', [skyBg(130, '#d6efff'), bg(0, 130, 400, 170, '#e8e0cf', -99)]);
}

// ═════════════ 13. LA COUR D'ÉCOLE EN HIVER ═════════════
{
  const bus = (x, y, s) => { const t = T(x, y, s); return [t.r(-44, -34, 88, 34, 5, F(Ye)), t.r(-38, -28, 14, 12, 1, F(Lb)), t.r(-18, -28, 14, 12, 1, F(Lb)), t.r(2, -28, 14, 12, 1, F(Lb)), t.r(24, -28, 14, 12, 1, F(Lb)), t.c(-26, 2, 8, F(D)), t.c(26, 2, 8, F(D))]; };
  A('cour-ecole-hiver', '🏫', 'La cour d\'école en hiver', 'The schoolyard in winter', 2, 35, [
    S('Trace la ligne d\'horizon : une ligne droite derrière l\'école.', 'Draw the horizon line: a straight line behind the school.', g.l(0, 170, 400, 170)),
    S('Dessine l\'école : un grand rectangle large avec un toit plat.', 'Draw the school: a big wide rectangle with a flat roof.', g.r(100, 80, 200, 90, 2, F('#d48a6a')), g.r(94, 72, 212, 10, 2, F(Dk))),
    S('Ajoute la grande porte au milieu et une rangée de fenêtres de chaque côté.', 'Add the big door in the middle and a row of windows on each side.', g.r(184, 124, 32, 46, 2, F(Bl)), g.l(200, 124, 200, 170), range(3, (i) => win(112 + i * 24, 100, 16, 18)), range(3, (i) => win(228 + i * 24, 100, 16, 18))),
    S('Plante un mât avec un drapeau devant l\'école.', 'Plant a flagpole with a flag in front of the school.', g.l(328, 172, 328, 70), g.pg('328,70 328,88 354,79', F(Rd))),
    S('Au fond, dessine de petits sapins et un autobus scolaire jaune.', 'In the back, draw little fir trees and a yellow school bus.', smallPines([20, 56, 84], 172, 0.6), bus(54, 176, 0.9)),
    S('Dessine la clôture de la cour tout le long.', 'Draw the schoolyard fence all along.', fence(0, 400, 206, 26, Gy2)),
    S('Dessine un gros bonhomme de neige tout près, avec un chapeau et une écharpe.', 'Draw a big snowman very close, with a hat and a scarf.', snowman(90, 290, 2.2), g.r(76, 194, 28, 4, 1, F(D)), g.r(82, 176, 16, 19, 2, F(D))),
    S('Dessine trois enfants en habit de neige qui jouent dans la cour.', 'Draw three children in snow clothes playing in the yard.', person(200, 260, 1.1, Rd, Dk, '#5b3a29'), person(250, 272, 1.3, Gr, Pu, '#e0a030'), person(318, 286, 1.5, Pu, Dk, '#2d2a3a')),
    S('Fais tomber la neige : des petits ronds partout, et ajoute un grand nuage gris.', 'Make the snow fall: little dots everywhere, and add a big gray cloud.', cloud(160, 40, 1.4), range(14, (i) => g.c(20 + i * 28 + (i % 2) * 8, 70 + (i * 37) % 60, 3))),
  ], 'Colorie ton école !', 'Color your school!', [skyBg(170, '#dde8f4'), bg(0, 170, 400, 130, '#f4f8ff', -99)], 'hiver');
}

// ═════════════ 14. LE CHALET AU BORD DU LAC ═════════════
{
  const mount = (x, w, h, y = 150) => [g.pg(`${x},${y} ${x + w / 2},${y - h} ${x + w},${y}`, F('#8c9ac0')), g.pg(`${x + w / 2 - w * 0.12},${y - h + h * 0.24} ${x + w / 2},${y - h} ${x + w / 2 + w * 0.12},${y - h + h * 0.24}`, F(Wh))];
  A('chalet-lac', '🛖', 'Le chalet au bord du lac', 'The cottage by the lake', 3, 45, [
    S('Trace la ligne d\'horizon : la rive d\'en face, une ligne droite au milieu de la feuille.', 'Draw the horizon line: the far shore, a straight line across the middle of the page.', g.l(0, 150, 400, 150)),
    S('Derrière, dessine deux grandes montagnes avec de la neige au sommet.', 'Behind it, draw two big mountains with snow on top.', mount(30, 170, 80), mount(190, 190, 100)),
    S('Dessine le lac en bas des montagnes, avec la rive de ce côté-ci qui monte à gauche.', 'Draw the lake below the mountains, with the near shore rising on the left.', g.p('M0 150H400V300H0Z', F(Bl)), g.p('M0 226Q80 210 150 236T230 300L0 300Z', F('#a9dd8a'))),
    S('Sur la rive, dessine le chalet : un rectangle en rondins avec un toit pointu.', 'On the shore, draw the cottage: a log rectangle with a pointed roof.', home(26, 232, 104, 56, Tn, '#8a3a30', Br), g.l(26, 202, 130, 202), g.l(26, 216, 130, 216)),
    S('Ajoute la cheminée avec de la fumée, et deux fenêtres.', 'Add the chimney with smoke, and two windows.', g.r(104, 150, 12, 26, 1, F(Gy2)), smoke(110, 148), win(38, 190, 18, 16, Ye), win(100, 190, 18, 16, Ye)),
    S('Dessine le quai en bois qui s\'avance dans l\'eau, avec ses pilotis.', 'Draw the wooden dock going out into the water, with its posts.', g.r(150, 240, 130, 9, 1, F(Br)), g.l(168, 249, 168, 266), g.l(214, 249, 214, 266), g.l(262, 249, 262, 266)),
    S('Dessine des grands sapins à droite et un canot rouge qui flotte.', 'Draw big fir trees on the right and a red canoe floating.', pine(350, 190, 2), pine(318, 176, 1.5), pine(382, 176, 1.5), g.p('M296 282Q340 296 384 282Q340 272 296 282Z', F(Rd))),
    S('Sur le quai, dessine un pêcheur avec sa canne et son fil dans l\'eau.', 'On the dock, draw a fisher with a rod and a line in the water.', person(246, 240, 1, Gr, Dk, '#5b3a29'), g.l(255, 214, 292, 194), g.l(292, 194, 292, 230)),
    S('Dans le ciel, dessine le soleil, des nuages et des huards.', 'In the sky, draw the sun, clouds and loons flying.', sun(340, 40, 0.9), cloud(100, 36), cloud(220, 50, 0.8), bird(170, 90), bird(150, 78, 0.8)),
  ], 'Colorie ton chalet !', 'Color your cottage!', [skyBg(150, '#cdeeff')], 'ete');
}

// ═════════════ 15. LE CAMPING ET LE FEU DE CAMP ═════════════
{
  const tent = (x, y, s, col) => { const t = T(x, y, s); return [t.pg('-46,0 0,-50 46,0', F(col)), t.pg('-12,0 0,-30 12,0', F(Dk))]; };
  const flames = (x, y, s) => { const t = T(x, y, s); return [t.p('M-14 0Q-18-20 -4-32Q-4-16 4-22Q14-14 14 0Z', F(Rd)), t.p('M-6 0Q-8-12 0-20Q8-12 6 0Z', F(Ye))]; };
  A('camping-feu', '⛺', 'Le camping et le feu de camp', 'Camping and the campfire', 2, 35, [
    S('Trace la ligne d\'horizon : l\'endroit où la forêt finit et où le sol commence.', 'Draw the horizon line: where the forest ends and the ground begins.', g.p('M0 170Q100 160 200 170T400 164')),
    S('Au loin, dessine une rangée de petits sapins. Ils sont petits car ils sont loin.', 'Far away, draw a row of little fir trees. They are small because they are far.', smallPines([14, 44, 74, 104, 134, 264, 294, 324, 354, 384], 172, 0.6)),
    S('Dessine deux grands sapins devant, un de chaque côté.', 'Draw two big fir trees in front, one on each side.', pine(36, 216, 2.2), pine(372, 220, 2.4)),
    S('Dessine la tente : un grand triangle avec une ouverture au milieu.', 'Draw the tent: a big triangle with an opening in the middle.', tent(130, 240, 1.8, O)),
    S('Dessine le feu de camp : trois bûches et des flammes.', 'Draw the campfire: three logs and some flames.', g.r(246, 262, 44, 9, 4, F(Br)), g.r(250, 252, 44, 9, 4, F(Br, 1)), flames(270, 256, 1.4)),
    S('Autour du feu, assieds deux enfants. Dessine-leur un bâton avec une guimauve.', 'Sit two children around the fire. Draw them a stick with a marshmallow.', person(212, 286, 1.2, Rd, Dk, '#5b3a29'), person(340, 288, 1.2, Bl, Pu, '#e0a030'), g.l(222, 262, 252, 266), g.c(255, 267, 4, F(Wh))),
    S('Ajoute un sac de couchage roulé et une lanterne devant la tente.', 'Add a rolled sleeping bag and a lantern in front of the tent.', g.r(60, 276, 54, 14, 7, F(Pu)), g.r(168, 268, 12, 18, 2, F(Ye)), g.l(170, 268, 178, 268)),
    S('Dans le ciel, dessine la lune et plein d\'étoiles.', 'In the sky, draw the moon and lots of stars.', moon(320, 50, 20), star(60, 30), star(130, 60, 4), star(190, 24, 5), star(240, 70, 4), star(110, 110, 4), star(260, 30, 4)),
  ], 'Colorie ton camping !', 'Color your campsite!', [bg(0, 0, 400, 168, '#2f3a6e', -100), bg(0, 166, 400, 134, '#4c7a52', -99)]);
}

// ═════════════ 16. LE CARNAVAL D'HIVER ═════════════
{
  const palace = [g.r(120, 100, 160, 90, 2, F('#bfe6ff')), g.r(100, 60, 40, 130, 2, F('#a8d8f5')), g.pg('96,60 120,18 144,60', F('#d9f1ff')), g.r(260, 60, 40, 130, 2, F('#a8d8f5')), g.pg('256,60 280,18 304,60', F('#d9f1ff')), g.p('M180 190V150Q200 124 220 150V190Z', F(Pu)), range(4, (i) => g.r(138 + i * 28 - (i > 1 ? -20 : 0), 118, 12, 20, 6, F(Wh)))];
  const bonhomme = (x, y, s) => { const t = T(x, y, s); return [t.l(-18, -50, -34, -70), t.l(18, -50, 34, -70), t.e(0, -22, 30, 34, F(Rd)), t.c(0, -80, 20, F(Wh)), t.pg('-18,-92 0,-122 18,-92', F(Rd)), t.c(0, -124, 5, F(Wh)), t.c(-7, -84, 2.5, F(D)), t.c(7, -84, 2.5, F(D)), t.p('M-8 -72Q0 -66 8 -72', ''), t.r(-30, -34, 60, 12, 3, F(Pu)), t.l(-30, -28, 30, -28), t.l(-12, -22, -16, 4), t.l(12, -22, 16, 4)]; };
  A('carnaval-hiver', '🎿', 'Le Carnaval d\'hiver', 'The winter carnival', 3, 50, [
    S('Trace la ligne d\'horizon : une ligne droite où la neige commence.', 'Draw the horizon line: a straight line where the snow begins.', g.l(0, 190, 400, 190)),
    S('Dessine le palais de glace : un mur large, deux tours avec des toits pointus.', 'Draw the ice palace: a wide wall, two towers with pointed roofs.', palace),
    S('Au loin, dessine de petits sapins couverts de neige, derrière le palais.', 'Far away, draw little snowy fir trees behind the palace.', smallPines([14, 46, 340, 370], 190, 0.6)),
    S('Devant, dessine le Bonhomme Carnaval : un grand corps rouge, une tête ronde et une tuque pointue.', 'In front, draw Bonhomme Carnaval: a big red body, a round head and a pointed toque.', bonhomme(120, 290, 1.3)),
    S('Dessine ses bras avec des mitaines et sa ceinture fléchée avec des rayures.', 'Draw his arms with mittens and his arrow sash with stripes.', g.c(78, 214, 6, F(Wh)), g.c(162, 214, 6, F(Wh)), g.l(88, 256, 94, 262), g.l(112, 254, 118, 260), g.l(138, 254, 144, 260)),
    S('À droite, dessine trois enfants qui glissent sur une luge.', 'On the right, draw three children sliding on a sled.', g.p('M250 280Q300 290 360 280L350 272H258Z', F(Br)), person(280, 272, 0.9, Bl, Dk, '#5b3a29'), person(305, 272, 0.9, Pk, Dk, '#e0a030'), person(330, 272, 0.9, Gr, Dk, '#2d2a3a')),
    S('Accroche une guirlande de fanions colorés entre les deux tours.', 'Hang a garland of colorful flags between the two towers.', festoon(120, 70, 200, 110, 280, 70, 7, [Rd, Ye, Bl, Pu, Gr], 12)),
    S('Dessine des feux d\'artifice : des lignes qui partent d\'un point comme une étoile.', 'Draw fireworks: lines going out from a point like a star.', range(8, (i) => { const a = pt(70, 50, 22, i * 45), b = pt(70, 50, 34, i * 45); return g.l(a[0], a[1], b[0], b[1]); }), range(8, (i) => { const a = pt(330, 40, 18, i * 45), b = pt(330, 40, 30, i * 45); return g.l(a[0], a[1], b[0], b[1]); }), star(200, 40, 6)),
  ], 'Colorie ton carnaval !', 'Color your carnival!', [bg(0, 0, 400, 190, '#2a3f7a', -100), bg(0, 190, 400, 110, '#f4f8ff', -99)], 'hiver');
}

// ═════════════ 17. L'AQUARIUM ═════════════
{
  const Sa4b = '#f1d9a0';
  const shark = (x, y, s) => { const t = T(x, y, s); return [t.pg('34,0 56,-18 54,16', F(Gy2)), t.e(0, 0, 40, 16, F(Gy2)), t.pg('-6,-14 8,-34 14,-14', F(Gy2)), t.e(-6, 6, 30, 7, F(Wh)), t.c(-26, -4, 2.4, F(D)), t.p('M-38 2Q-32 8 -24 6', '')]; };
  const jelly = (x, y, s) => { const t = T(x, y, s); return [t.p('M-8 0Q-12 10 -8 20', ''), t.p('M0 0Q-4 12 0 22', ''), t.p('M8 0Q12 10 8 20', ''), t.p('M-16 0Q-16 -20 0 -20Q16 -20 16 0Z', F(Pk))]; };
  const kidBack = (x, y, s, shirt, hair) => { const t = T(x, y, s); return [t.p('M-22 40Q-22 18 0 18Q22 18 22 40Z', F(shirt)), t.c(0, 6, 13, F(hair))]; };
  A('aquarium-poissons', '🦈', 'La visite à l\'aquarium', 'A visit to the aquarium', 3, 45, [
    S('Trace le plancher : la ligne droite en bas, où les visiteurs marchent.', 'Draw the floor: the straight line at the bottom, where visitors walk.', g.l(0, 262, 400, 262)),
    S('Dessine la grande vitre de l\'aquarium : un énorme rectangle avec les coins arrondis.', 'Draw the aquarium\'s big window: an enormous rectangle with rounded corners.', g.r(30, 30, 340, 210, 22, F('#8fdcf5'))),
    S('Dans l\'aquarium, dessine le sable et deux rochers au fond.', 'Inside the tank, draw the sand and two rocks at the bottom.', g.p('M32 208Q120 194 200 208T368 204V236Q368 240 350 240H50Q32 240 32 224Z', F(Sa4b)), g.p('M60 214Q64 190 92 188Q110 192 114 214Z', F(Gy2)), g.p('M290 214Q296 186 326 186Q348 192 352 214Z', F(Gy2))),
    S('Ajoute des algues qui bougent.', 'Add swaying seaweed.', g.p('M150 214Q138 196 150 182T150 150'), g.p('M168 214Q180 198 168 186T168 160'), g.p('M250 214Q238 196 250 184T250 154')),
    S('Dessine un grand requin qui nage : un corps long, une nageoire et une queue.', 'Draw a big shark swimming: a long body, a fin and a tail.', shark(240, 106, 1.5)),
    S('Dessine des petits poissons qui nagent ensemble.', 'Draw little fish swimming together.', fish(90, 100, 0.8, O), fish(120, 130, 0.7, O), fish(80, 150, 0.7, Ye), fish(130, 170, 0.6, Ye)),
    S('Dessine une méduse rose avec ses longs bras.', 'Draw a pink jellyfish with its long arms.', jelly(330, 90, 1.4)),
    S('Devant la vitre, dessine deux enfants vus de dos qui regardent les poissons.', 'In front of the glass, draw two children seen from behind watching the fish.', kidBack(120, 250, 1.4, Rd, '#5b3a29'), kidBack(260, 256, 1.5, Bl, '#2d2a3a')),
    S('Dessine des bulles qui montent dans l\'eau.', 'Draw bubbles rising in the water.', g.c(186, 60, 5), g.c(198, 44, 3), g.c(60, 60, 6), g.c(340, 140, 4), g.c(352, 126, 3)),
  ], 'Colorie ton aquarium !', 'Color your aquarium!', [bg(0, 0, 400, 262, '#3f4a7a', -100), bg(0, 262, 400, 38, '#8a90a8', -99)]);
}

// ═════════════ 18. LA RUELLE DE MONTRÉAL ET SES ESCALIERS ═════════════
{
  const stairs = (x, n, st) => [g.p(`M${x} 230${range(n, (i) => `L${x + i * st} ${230 - (i + 1) * st}L${x + (i + 1) * st} ${230 - (i + 1) * st}`).join('')}L${x + n * st} 230Z`, F(Gy2)), g.l(x, 206, x + n * st, 206 - n * st + 24 - 0), g.r(x + n * st - 6, 230 - n * st - 3, 46, 5, 1, F(Br))];
  const tri = (bx, col) => [g.r(bx, 70, 120, 160, 1, F(col)), g.r(bx - 4, 62, 128, 10, 2, F(Dk)), range(3, (i) => win(bx + 12 + i * 34, 84, 18, 24)), win(bx + 12, 134, 18, 24), g.r(bx + 66, 130, 24, 46, 1, F(Br)), g.l(bx + 12, 122, bx + 108, 122), range(5, (i) => g.l(bx + 14 + i * 22, 114, bx + 14 + i * 22, 122)), win(bx + 72, 196, 30, 26), stairs(bx + 6, 5, 11), g.r(bx + 12, 198, 18, 32, 1, F(Br))];
  A('ruelle-montreal', '🏘️', 'La ruelle de Montréal', 'A Montreal alley and its outdoor stairs', 3, 50, [
    S('Trace la ligne d\'horizon : le trottoir, une ligne droite en bas de la feuille.', 'Draw the horizon line: the sidewalk, a straight line low on the page.', g.l(0, 230, 400, 230)),
    S('Dessine le premier immeuble : un grand rectangle brique avec une corniche en haut.', 'Draw the first building: a big brick rectangle with a cornice on top.', tri(8, '#c4684a').slice(0, 2)),
    S('Dessine le deuxième et le troisième immeuble, côte à côte, de couleurs différentes.', 'Draw the second and third building side by side, in different colors.', tri(140, '#d98a5a').slice(0, 2), tri(272, '#b05a4a').slice(0, 2)),
    S('Ajoute les fenêtres du haut sur les trois immeubles. Aligne-les bien !', 'Add the top windows on all three buildings. Line them up nicely!', [8, 140, 272].map((bx) => range(3, (i) => win(bx + 12 + i * 34, 84, 18, 24)))),
    S('Dessine un balcon avec une rampe au deuxième étage de chaque immeuble.', 'Draw a balcony with a railing on the second floor of each building.', [8, 140, 272].map((bx) => [g.l(bx + 12, 122, bx + 108, 122), range(5, (i) => g.l(bx + 14 + i * 22, 114, bx + 14 + i * 22, 122)), win(bx + 12, 134, 18, 24), g.r(bx + 66, 130, 24, 46, 1, F(Br))])),
    S('Dessine les escaliers extérieurs : de grandes marches qui montent en diagonale jusqu\'au balcon.', 'Draw the outdoor stairs: big steps climbing diagonally up to the balcony.', [8, 140, 272].map((bx) => stairs(bx + 6, 5, 11))),
    S('Ajoute les portes et les fenêtres du rez-de-chaussée.', 'Add the doors and the windows of the ground floor.', [8, 140, 272].map((bx) => [win(bx + 68, 196, 22, 26), g.r(bx + 94, 200, 18, 30, 1, F(Br))])),
    S('Devant, dessine un grand arbre sur le trottoir et un vélo. Ils sont proches, donc grands.', 'In front, draw a big tree on the sidewalk and a bike. They are close, so they are big.', tree(30, 256, 1.6, Gr), g.c(318, 284, 12), g.c(354, 284, 12), g.p('M318 284L334 262L354 284M334 262H322'), g.l(334, 262, 346, 258)),
    S('Tends une corde à linge entre deux balcons, avec des vêtements. Ajoute le soleil.', 'Hang a clothesline between two balconies, with clothes. Add the sun.', g.l(130, 126, 148, 126), g.p('M110 124Q130 138 150 124'), g.r(122, 128, 10, 14, 1, F(Pk)), g.r(136, 128, 10, 12, 1, F(Bl)), sun(344, 36, 0.9)),
  ], 'Colorie ta ruelle !', 'Color your alley!', [skyBg(230, '#d6efff'), bg(0, 230, 400, 70, '#b9bccb', -99)]);
}

export const projects = LIST;
