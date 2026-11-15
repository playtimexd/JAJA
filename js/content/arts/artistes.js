// Arts plastiques — « Apprécier des œuvres d’art » (PFEQ) : artistes + projets « à la manière de … ».
// `artists` = fiches d’artistes (bio, « Regarde bien », œuvres décrites en mots, quiz, image de style).
// `projects` = projets selon docs/ARTS.md (id `artistes-…`, cat 'artistes').
// Toutes les images sont des dessins ORIGINAUX « dans le style » de l’artiste, jamais des copies d’œuvres réelles.
// Chaque projet = une liste de « couches » ; l’étape i montre les couches 0..i, la nouvelle en rose (#ff5d8f),
// et la dernière étape montre le résultat fini et coloré. L’image de style de l’artiste = résultat fini plein cadre.

const D = '#3a3f55', HL = '#ff5d8f';
const OLD = `stroke="${D}" stroke-width="3"`, NEW = `stroke="${HL}" stroke-width="6"`, NONE = 'stroke="none"';
const T = (fr, en) => ({ fr, en });
const f0 = (v) => Math.round(v);
const svg = (b) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" fill="none">${b}</svg>`;
const R = (x, y, w, h, f, s = '', rx = 0) => `<rect x="${f0(x)}" y="${f0(y)}" width="${f0(w)}" height="${f0(h)}"${rx ? ` rx="${rx}"` : ''} fill="${f}" ${s}/>`;
const C = (x, y, r, f, s = '') => `<circle cx="${f0(x)}" cy="${f0(y)}" r="${f0(r)}" fill="${f}" ${s}/>`;
const E = (x, y, rx, ry, f, s = '') => `<ellipse cx="${f0(x)}" cy="${f0(y)}" rx="${f0(rx)}" ry="${f0(ry)}" fill="${f}" ${s}/>`;
const P = (d, f, s = '') => `<path d="${d}" fill="${f}" ${s}/>`;
const pts = (a) => a.map(([x, y]) => `${f0(x)},${f0(y)}`).join(' ');
const PG = (a, f, s = '') => `<polygon points="${pts(a)}" fill="${f}" ${s}/>`;
const LN = (m, d, c, w) => (m === 'new' ? `<path d="${d}" stroke="${HL}" stroke-width="${w + 6}"/>` : '') + `<path d="${d}" stroke="${c}" stroke-width="${w}"/>`;
const hl = (s, m) => (m === 'new' ? s : NONE);                 // outline only while it is the new thing
const HG = (m, b) => (m === 'new' ? `<g stroke="${HL}" stroke-width="3">${b}</g>` : b);
const dotD = (a) => a.map(([x, y]) => `M${f0(x)} ${f0(y)}h0`).join('');
const DT = (m, a, c, w = 9) => (a.length ? (m === 'new' ? `<path d="${dotD(a)}" stroke="${HL}" stroke-width="${w + 5}"/>` : '') + `<path d="${dotD(a)}" stroke="${c}" stroke-width="${w}"/>` : '');
const pol = (cx, cy, r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
const starPts = (cx, cy, r1, r2, n, rot = -Math.PI / 2) => Array.from({ length: 2 * n }, (_, i) => pol(cx, cy, i % 2 ? r2 : r1, rot + (i * Math.PI) / n));
const rnd = (seed) => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };
const byCol = (list, extra = '') => { const g = {}; for (const [c, d] of list) (g[c] ||= []).push(d); return Object.entries(g).map(([c, ds]) => `<path d="${ds.join('')}" fill="${c}"${extra}/>`).join(''); };
const lens = (x1, y1, x2, y2, w) => { const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2, l = Math.hypot(x2 - x1, y2 - y1) || 1, nx = (-(y2 - y1) / l) * w, ny = ((x2 - x1) / l) * w; return `M${f0(x1)} ${f0(y1)}Q${f0(cx + nx)} ${f0(cy + ny)} ${f0(x2)} ${f0(y2)}Q${f0(cx - nx)} ${f0(cy - ny)} ${f0(x1)} ${f0(y1)}Z`; };
const arrow = (x1, y1, x2, y2) => { const a = Math.atan2(y2 - y1, x2 - x1), p = (t) => `${f0(x2 - 16 * Math.cos(a - t))},${f0(y2 - 16 * Math.sin(a - t))}`; return `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${HL}" stroke-width="6"/><polygon points="${x2},${y2} ${p(0.5)} ${p(-0.5)}" fill="${HL}"/>`; };
const CUT = (d) => `<path d="${d}" stroke="${HL}" stroke-width="4" stroke-dasharray="9 7"/>`;
const PAPER = (f) => `<rect x="20" y="15" width="360" height="270" rx="4" fill="${f}" stroke="#cfc6b4" stroke-width="2"/>`;
// fill + outline once finished, pencil outline before
const OF = (m, s, d, fill, fin = `stroke="${D}" stroke-width="2.5"`) => (m === 'fin' ? P(d, fill, fin) : P(d, 'none', s));
const sampleQ = (p0, p1, p2, n) => Array.from({ length: n }, (_, i) => { const t = n === 1 ? 0.5 : i / (n - 1), u = 1 - t; return [u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0], u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1]]; });
const cubic = ([a, b, c, d], t) => { const u = 1 - t; const p = (k) => u * u * u * a[k] + 3 * u * u * t * b[k] + 3 * u * t * t * c[k] + t * t * t * d[k]; const q = (k) => 3 * u * u * (b[k] - a[k]) + 6 * u * t * (c[k] - b[k]) + 3 * t * t * (d[k] - c[k]); return [p(0), p(1), q(0), q(1)]; };

// Common materials
const M = {
  papier: T('Feuille blanche épaisse', 'Thick white paper'), crayon: T('Crayon à mine', 'Pencil'), gomme: T('Gomme à effacer', 'Eraser'),
  gouache: T('Gouache de plusieurs couleurs', 'Poster paint in several colours'), pinceau: T('Pinceaux', 'Paintbrushes'), eau: T('Pot d’eau', 'Water jar'),
  assiette: T('Vieille assiette pour la peinture', 'Old plate for the paint'), pastels: T('Pastels gras', 'Oil pastels'), crayonsC: T('Crayons de couleur', 'Coloured pencils'),
  feutres: T('Feutres', 'Markers'), feutreNoir: T('Feutre noir épais', 'Thick black marker'), regle: T('Règle', 'Ruler'), ciseaux: T('Ciseaux', 'Scissors'),
  colle: T('Bâton de colle', 'Glue stick'), papiersC: T('Papiers de couleur', 'Coloured paper'), cotons: T('Cotons-tiges', 'Cotton swabs'),
  noir: T('Papier noir', 'Black paper'), blanc: T('Crayon blanc ou craie', 'White pencil or chalk'), carton: T('Carton mince (boîte de céréales)', 'Thin cardboard (cereal box)'),
  eponge: T('Petite éponge', 'Small sponge'), ruban: T('Ruban adhésif', 'Tape'), ficelle: T('Ficelle', 'String'),
};

const STYLE = {};
function mk(o) {
  const L = o.layers, old = o.old || OLD, fin = o.fin || OLD;
  const view = (i, last) => {
    let start = 0, paper = o.paper || '#fff';
    for (let k = 0; k <= i; k++) { if (L[k].reset) start = k; if (L[k].paper) paper = L[k].paper; }
    const vis = [];
    for (let k = start; k <= i; k++) {
      if (L[k].only && k !== i) continue;
      const m = last ? 'fin' : k === i ? 'new' : 'old';
      vis.push([L[k].z ?? 5, k, L[k].d(m === 'new' ? NEW : m === 'old' ? old : fin, m)]);
    }
    vis.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    return { paper, body: vis.map((v) => v[2]).join('') };
  };
  const steps = L.map((l, i) => { const v = view(i, i === L.length - 1); return { svg: svg(PAPER(v.paper) + v.body), text: l.t }; });
  const f = view(L.length - 1, true);
  STYLE[o.id] = svg(`<rect width="400" height="300" fill="${f.paper}"/>` + f.body);
  return { id: o.id, cat: 'artistes', artist: o.artist, emoji: o.emoji, title: o.title, level: o.level, minutes: o.minutes, theme: o.theme || 'artistes', season: o.season || null, materials: o.materials, adult: !!o.adult, steps };
}
const END = (fr, en) => ({ t: T(fr, en), d: () => '' });

// ───────────────────────── Riopelle : mosaïque au carton ─────────────────────────
const RIO = (() => {
  const r = rnd(7), cols = ['#d62828', '#f77f00', '#fcbf49', '#2a9d8f', '#264653', '#3a86ff', '#8338ec', '#f1faee', '#1d1d1d', '#6a994e'];
  const g = [[], [], []];
  for (let y = 20; y < 270; y += 25) for (let x = 22; x < 372; x += 30) {
    const px = x + r() * 6, py = y + r() * 5, a = (r() - 0.5) * 12, b = (r() - 0.5) * 8;
    let w = 26 + r() * 10, h = 16 + r() * 10;
    w = Math.min(w, 376 - px - Math.abs(b)); h = Math.min(h, 281 - py - Math.abs(a));
    if (w < 8 || h < 6) continue;
    g[Math.floor(r() * 3)].push([cols[Math.floor(r() * cols.length)], `M${f0(px)} ${f0(py)}l${f0(w)} ${f0(a)}l${f0(b)} ${f0(h)}l${f0(-w)} ${f0(-a)}z`]);
  }
  const lines = { k: '', w: '' };
  for (let i = 0; i < 34; i++) { const x = 30 + r() * 330, y = 25 + r() * 240, dx = (r() - 0.5) * 30, dy = (r() - 0.5) * 16; lines[i % 2 ? 'k' : 'w'] += `M${f0(x)} ${f0(y)}l${f0(dx)} ${f0(dy)}`; }
  return { g, lines };
})();
const pRiopelle = mk({
  id: 'artistes-riopelle-mosaique', artist: 'riopelle', emoji: '🧱', level: 2, minutes: 30,
  title: T('Une mosaïque au carton, à la manière de Riopelle', 'A cardboard mosaic, in the style of Riopelle'),
  materials: [M.papier, M.gouache, T('Bouts de carton rigide (comme une spatule)', 'Stiff cardboard pieces (like a spatula)'), M.assiette],
  layers: [
    { only: true, t: T('Mets de petits tas de gouache de plusieurs couleurs sur une vieille assiette.', 'Put small blobs of paint in several colours on an old plate.'),
      d: (s) => E(200, 150, 120, 80, '#f4f1ea', s) + ['#d62828', '#fcbf49', '#2a9d8f', '#3a86ff', '#1d1d1d', '#f77f00'].map((c, i) => C(140 + (i % 3) * 60, 125 + Math.floor(i / 3) * 50, 15, c)).join('') },
    { t: T('Trempe le bord d’un bout de carton dans la peinture. Racle-le sur la feuille : ça fait une tache carrée.', 'Dip the edge of a piece of cardboard in the paint. Scrape it on the paper: it makes a square patch.'),
      d: (s, m) => HG(m, byCol(RIO.g[0])) + (m === 'new' ? R(300, 200, 50, 30, '#d9b98a', `${s} transform="rotate(-20 325 215)"`) : '') },
    { t: T('Fais plein de taches, collées les unes contre les autres, dans tous les sens.', 'Make lots of patches, side by side, going every which way.'), d: (s, m) => HG(m, byCol(RIO.g[1])) },
    { t: T('Remplis toute la feuille. Change souvent de couleur!', 'Fill the whole sheet. Change colours often!'), d: (s, m) => HG(m, byCol(RIO.g[2])) },
    { t: T('Avec la tranche du carton, ajoute de petits traits noirs et blancs par-dessus.', 'With the edge of the cardboard, add little black and white lines on top.'), z: 7,
      d: (s, m) => LN(m, RIO.lines.k, '#1d1d1d', 3) + LN(m, RIO.lines.w, '#ffffff', 3) },
    END('Laisse sécher. Ton tableau brille comme une mosaïque!', 'Let it dry. Your painting shines like a mosaic!'),
  ],
});

// ───────────────────────── Riopelle : oies au pochoir ─────────────────────────
const GOOSE = 'M-44 6Q-30 -2 -8 0L-2 -30Q2 -36 8 -32L10 -2Q22 -2 30 -8Q36 -12 42 -10L46 -6L38 -4Q30 6 14 10Q-10 16 -44 6Z';
const goose = (x, y, k, f, s = '') => `<path d="${GOOSE}" fill="${f}" ${s} transform="translate(${x} ${y}) scale(${k})"/>`;
const dabs = (cx, cy, c1, c2, seed) => { const r = rnd(seed), a = [], b = []; for (let i = 0; i < 64; i++) { const t = (i / 64) * 6.283 + r() * 0.2, d = 24 + r() * 26; (i % 3 ? a : b).push([cx + Math.cos(t) * d * 1.6, cy + Math.sin(t) * d * 0.9]); } return E(cx, cy, 78, 42, c1, 'opacity=".45"') + `<path d="${dotD(a)}" stroke="${c1}" stroke-width="24"/><path d="${dotD(b)}" stroke="${c2}" stroke-width="18"/>`; };
const GEESE = [[110, 90, '#3a86ff', '#8338ec', 3], [270, 120, '#2a9d8f', '#264653', 11], [120, 215, '#f77f00', '#d62828', 19], [285, 230, '#8338ec', '#3a86ff', 23]];
const gStep = (gs) => (s, m) => gs.map(([x, y, c1, c2, sd]) => dabs(x, y, c1, c2, sd) + goose(x, y, 1.15, m === 'new' ? '#d9b98a' : '#fff', m === 'new' ? 'stroke="#3a3f55" stroke-width="1.5"' : '')).join('');
const pRiopelleOies = mk({
  id: 'artistes-riopelle-oies', artist: 'riopelle', emoji: '🪿', level: 2, minutes: 30,
  title: T('Des oies au pochoir, à la manière de Riopelle', 'Stencilled geese, in the style of Riopelle'),
  materials: [M.papier, M.carton, M.ciseaux, M.crayon, M.eponge, M.gouache, M.assiette],
  layers: [
    { only: true, t: T('Sur un carton mince, dessine une oie qui vole, les ailes en l’air.', 'On thin cardboard, draw a flying goose with its wings up.'),
      d: (s) => R(90, 60, 220, 180, '#d9b98a', 'stroke="#a07a4a" stroke-width="3"', 8) + goose(200, 160, 2, 'none', 'stroke="#ff5d8f" stroke-width="3"') },
    { only: true, t: T('Découpe ton oie. Garde bien la forme, c’est ton pochoir!', 'Cut out your goose. Keep the shape, it is your stencil!'),
      d: () => goose(200, 160, 2, '#d9b98a', 'stroke="#ff5d8f" stroke-width="2.5" stroke-dasharray="5 4"') },
    { reset: true, t: T('Pose l’oie sur ta feuille. Tamponne de la peinture tout autour avec l’éponge.', 'Put the goose on your paper. Dab paint all around it with the sponge.'), d: gStep(GEESE.slice(0, 1)) },
    { t: T('Soulève le carton : une oie blanche apparaît! Recommence plus loin avec d’autres couleurs.', 'Lift the cardboard: a white goose appears! Do it again further along with other colours.'), d: gStep(GEESE.slice(1, 2)) },
    { t: T('Fais tout un voilier d’oies qui volent dans le même sens.', 'Make a whole flock of geese flying the same way.'), d: gStep(GEESE.slice(2)) },
    { t: T('Ajoute quelques traits de pinceau pour le vent.', 'Add a few brush strokes for the wind.'), z: 7,
      d: (s, m) => LN(m, 'M40 160Q80 150 120 160M200 60Q240 50 290 62M190 274Q230 262 260 270M330 170Q350 160 372 168', '#264653', 4) },
    END('Tes oies s’envolent, comme dans le grand tableau de Riopelle!', 'Your geese fly away, like in Riopelle’s big painting!'),
  ],
});

// ───────────────────────── Ferron : vitrail ─────────────────────────
const FERRON_A = [['#e63946', [[80, 50], [210, 50], [170, 150], [80, 170]]], ['#ffb703', [[190, 50], [320, 50], [320, 140], [230, 120]]], ['#219ebc', [[80, 160], [180, 130], [200, 250], [80, 250]]], ['#2a9d8f', [[210, 140], [320, 120], [320, 250], [230, 250]]]];
const FERRON_B = [['#8338ec', [[140, 100], [250, 80], [270, 180], [160, 200]]], ['#fb8500', [[100, 200], [200, 170], [230, 250], [110, 250]]], ['#90be6d', [[240, 60], [320, 90], [290, 170]]]];
const pFerron = mk({
  id: 'artistes-ferron-vitrail', artist: 'ferron', emoji: '🪟', level: 2, minutes: 35, adult: true,
  title: T('Un vitrail de lumière, à la manière de Marcelle Ferron', 'A window of light, in the style of Marcelle Ferron'),
  materials: [T('Carton noir', 'Black cardboard'), T('Papier collant transparent (papier contact)', 'Clear sticky paper (contact paper)'), T('Papiers de soie de couleur', 'Coloured tissue paper'), M.ciseaux, M.colle],
  layers: [
    { z: 8, t: T('Demande à un adulte de découper un grand cadre dans un carton noir.', 'Ask a grown-up to cut a big frame out of black cardboard.'),
      d: (s) => P('M60 30h280v240h-280zM80 50h240v200h-240z', '#222', `fill-rule="evenodd" ${s}`) },
    { only: true, t: T('Déchire des papiers de soie de toutes les couleurs en grands morceaux.', 'Tear coloured tissue paper into big pieces.'),
      d: (s) => [['#e63946', 110, 90], ['#ffb703', 200, 80], ['#219ebc', 290, 100], ['#8338ec', 130, 200], ['#2a9d8f', 220, 210], ['#fb8500', 290, 200]].map(([c, x, y], i) => PG([[x - 30, y - 20 + i * 2], [x + 28, y - 26], [x + 34, y + 18], [x - 6, y + 28], [x - 26, y + 14]], c, `opacity=".8" ${s}`)).join('') },
    { t: T('Colle le cadre sur le papier collant. Pose les grands morceaux dedans.', 'Stick the frame on the sticky paper. Lay the big pieces inside.'),
      d: (s, m) => FERRON_A.map(([c, p]) => PG(p, c, `opacity=".78" ${hl(s, m)}`)).join('') },
    { t: T('Fais chevaucher d’autres morceaux : les couleurs se mélangent!', 'Overlap more pieces: the colours mix!'),
      d: (s, m) => FERRON_B.map(([c, p]) => PG(p, c, `opacity=".6" ${hl(s, m)}`)).join('') },
    { z: 7, t: T('Ajoute de fines bandes de papier noir, comme les lignes d’un vitrail.', 'Add thin strips of black paper, like the lines of a stained-glass window.'),
      d: (s, m) => LN(m, 'M80 165Q170 140 320 130M200 50Q190 150 215 250M120 50Q150 120 110 250M260 140Q290 200 320 220', '#222', 6) },
    { only: true, t: T('Colle ton vitrail dans une fenêtre. La lumière passe à travers!', 'Stick your window art on a window. The light shines through!'),
      d: () => `<path d="M350 20l-30 30M368 50l-36 10M330 10l-10 34" stroke="#ffb703" stroke-width="5"/>` },
    END('Ton vitrail brille de mille couleurs, comme ceux de Marcelle Ferron!', 'Your window glows with colour, like Marcelle Ferron’s!'),
  ],
});

// ───────────────────────── Gagnon : village d’hiver ─────────────────────────
const HOUSES = [[60, 175, 40, 30, '#d62828', '#264653'], [115, 182, 34, 24, '#f4d35e', '#8d3b2f'], [165, 172, 44, 32, '#3a7d44', '#5c3b2e'], [300, 176, 38, 28, '#e76f51', '#264653'], [340, 184, 28, 22, '#4d7cc2', '#7a2e2e']];
const roof = (x, y, w, h) => [[x - 5, y], [x + w / 2, y - h * 0.7], [x + w + 5, y]];
const houseO = (s) => HOUSES.map(([x, y, w, h]) => R(x, y, w, h, 'none', s) + PG(roof(x, y, w, h), 'none', s)).join('') + R(222, 165, 40, 40, 'none', s) + R(234, 130, 16, 35, 'none', s) + PG([[230, 130], [242, 92], [254, 130]], 'none', s);
const MOUNT = 'M20 125Q70 85 130 115Q190 70 250 105Q310 80 380 110L380 150Q300 140 220 158Q120 140 20 160Z';
const pGagnon = mk({
  id: 'artistes-gagnon-village', artist: 'gagnon', emoji: '🏘️', level: 2, minutes: 30, season: 'hiver',
  title: T('Un village d’hiver, à la manière de Clarence Gagnon', 'A winter village, in the style of Clarence Gagnon'),
  materials: [M.papier, M.crayon, M.crayonsC, M.pastels], fin: `stroke="${D}" stroke-width="2"`,
  layers: [
    { t: T('Trace les montagnes au fond, puis une colline de neige devant.', 'Draw the mountains at the back, then a snowy hill in front.'),
      d: (s) => P('M20 125Q70 85 130 115Q190 70 250 105Q310 80 380 110M20 160Q120 140 220 158Q300 140 380 150M20 210Q140 190 260 205Q320 200 380 200', 'none', s) },
    { t: T('Dessine de petites maisons aux toits pointus, et une église avec un clocher.', 'Draw little houses with pointy roofs, and a church with a steeple.'), d: (s) => houseO(s) },
    { z: 4, t: T('Colorie les maisons de couleurs vives : rouge, jaune, vert.', 'Colour the houses in bright colours: red, yellow, green.'),
      d: (s, m) => HOUSES.map(([x, y, w, h, c, r]) => R(x, y, w, h, c, hl(s, m)) + PG(roof(x, y, w, h), r, hl(s, m)) + R(x + w * 0.2, y + h * 0.3, 7, 7, '#ffd166') + R(x + w * 0.6, y + h * 0.3, 7, 7, '#ffd166')).join('') + R(222, 165, 40, 40, '#f1e3c8', hl(s, m)) + R(234, 130, 16, 35, '#f1e3c8', hl(s, m)) + PG([[230, 130], [242, 92], [254, 130]], '#9aa5b1', hl(s, m)) + P('M236 205v-16a6 6 0 0 1 12 0v16z', '#7a4a2a') },
    { z: 1, t: T('Colorie les montagnes en bleu et en mauve.', 'Colour the mountains blue and purple.'),
      d: (s, m) => P(MOUNT, '#8e9ccc', hl(s, m)) + P('M60 112Q110 100 150 118Q200 92 250 115Q300 100 340 118', 'none', 'stroke="#b8a1d9" stroke-width="10"') },
    { z: 0, t: T('Le ciel du soir : du rose et du jaune pâle.', 'The evening sky: pink and pale yellow.'),
      d: (s, m) => R(20, 15, 360, 75, '#f6c6c6', hl(s, m)) + R(20, 88, 360, 60, '#fbe3b0', hl(s, m)) },
    { z: 3, t: T('Fais des ombres bleues dans la neige, et de la fumée qui sort des cheminées.', 'Make blue shadows in the snow, and smoke coming out of the chimneys.'),
      d: (s, m) => HOUSES.map(([x, y, w, h]) => E(x + w + 10, y + h + 3, 18, 4, '#a9c4e8') + R(x + w * 0.65, y - h * 0.55, 6, 12, '#5c3b2e')).join('') + E(270, 208, 22, 4, '#a9c4e8') + LN(m, HOUSES.map(([x, y, w, h]) => `M${f0(x + w * 0.65 + 3)} ${f0(y - h * 0.55)}q-7 -8 0 -15q7 -8 0 -15`).join(''), '#b7b7c9', 4) },
    END('Voilà ton village d’hiver, comme dans Charlevoix!', 'Here is your winter village, like in Charlevoix!'),
  ],
});

// ───────────────────────── Fortin : grand orme sur papier noir ─────────────────────────
const LEAVES_F = [[130, 85, 40, '#3fa34d'], [195, 62, 44, '#7cc94b'], [265, 80, 42, '#2d9d5a'], [98, 130, 30, '#a7d65f'], [302, 128, 32, '#7cc94b'], [165, 118, 30, '#2d9d5a'], [235, 116, 30, '#a7d65f']];
const TRUNK = 'M185 285Q195 230 192 200Q170 160 145 115L160 110Q185 150 200 185Q215 150 240 110L255 115Q230 160 208 200Q205 230 215 285Z';
const FK = 'stroke="#141414" stroke-width="6"';
const pFortin = mk({
  id: 'artistes-fortin-orme', artist: 'fortin', emoji: '🌳', level: 2, minutes: 30, theme: 'nature', season: 'ete',
  title: T('Un orme géant sur papier noir, à la manière de Marc-Aurèle Fortin', 'A giant elm on black paper, in the style of Marc-Aurèle Fortin'),
  materials: [M.noir, M.blanc, M.pastels], paper: '#141414', old: 'stroke="#e8e8e8" stroke-width="3"', fin: FK,
  layers: [
    { z: 6, t: T('Sur le papier noir, dessine au crayon blanc un gros tronc qui s’ouvre comme un vase.', 'On the black paper, draw with a white pencil a big trunk that opens like a vase.'),
      d: (s, m) => (m === 'fin' ? P(TRUNK, '#8a5a3c', FK) : P(TRUNK, 'none', s)) },
    { z: 6, t: T('Ajoute de grosses branches qui montent vers le ciel.', 'Add big branches that reach up to the sky.'),
      d: (s, m) => (m === 'fin' ? LN(m, 'M160 120L120 80M240 115L280 80M200 185V70', '#8a5a3c', 9) : P('M160 120L120 80M240 115L280 80M200 185V70', 'none', s)) },
    { z: 4, t: T('Dessine de grands nuages de feuilles tout ronds autour des branches.', 'Draw big round clouds of leaves around the branches.'),
      d: (s, m) => (m === 'fin' ? '' : LEAVES_F.map(([x, y, r]) => C(x, y, r, 'none', s)).join('')) },
    { z: 3, t: T('Colorie les feuilles avec des verts très vifs. Laisse un peu de noir autour de chaque forme.', 'Colour the leaves with very bright greens. Leave a little black around each shape.'),
      d: (s, m) => LEAVES_F.map(([x, y, r, c]) => C(x, y, r, c, m === 'new' ? s : FK)).join('') },
    { z: 5, t: T('Ajoute de petites maisons aux toits rouges sous l’arbre.', 'Add little houses with red roofs under the tree.'),
      d: (s, m) => [[40, 228, 50, 35, '#f2e8cf'], [300, 232, 55, 30, '#ffd166'], [100, 244, 34, 24, '#e9edc9']].map(([x, y, w, h, c]) => R(x, y, w, h, c, m === 'new' ? s : FK) + PG(roof(x, y, w, h), '#c1121f', m === 'new' ? s : FK)).join('') },
    { z: 1, t: T('Colorie des bouts de ciel bleu, des nuages blancs et l’herbe. Le noir fait comme un contour!', 'Colour bits of blue sky, white clouds and the grass. The black looks like an outline!'),
      d: (s, m) => P('M20 15h360v170q-60 -20 -120 0q-60 -20 -120 0q-60 -20 -120 0z', '#5fa8d3', m === 'new' ? s : FK) + E(70, 40, 34, 14, '#f8f9fa', FK) + E(330, 45, 38, 15, '#f8f9fa', FK) + P('M20 262Q120 250 200 262T380 258L380 285L20 285Z', '#4c956c', m === 'new' ? s : FK) },
    END('Les couleurs brillent sur le noir, comme les arbres de Fortin!', 'The colours glow on the black, like Fortin’s trees!'),
  ],
});

// ───────────────────────── Lemieux : grand paysage d’hiver ─────────────────────────
const pLemieux = mk({
  id: 'artistes-lemieux-hiver', artist: 'lemieux', emoji: '🧍', level: 1, minutes: 25, season: 'hiver',
  title: T('Un grand espace d’hiver, à la manière de Jean Paul Lemieux', 'A wide winter space, in the style of Jean Paul Lemieux'),
  materials: [M.papier, M.regle, M.crayon, M.gouache, M.pinceau], fin: NONE,
  layers: [
    { z: 6, t: T('Avec une règle, trace une longue ligne d’horizon, assez basse.', 'With a ruler, draw a long horizon line, quite low.'), d: (s, m) => (m === 'fin' ? '' : P('M20 185H380', 'none', s)) },
    { z: 0, t: T('Peins le ciel tout doux : du bleu pâle mélangé avec du blanc.', 'Paint a soft sky: pale blue mixed with white.'), d: (s, m) => R(20, 15, 360, 130, '#d3dee8', hl(s, m)) + R(20, 140, 360, 45, '#e8e1d8', hl(s, m)) },
    { z: 1, t: T('Peins la neige en blanc et en gris très pâle.', 'Paint the snow white and very pale grey.'), d: (s, m) => R(20, 185, 360, 100, '#f4f4f2', hl(s, m)) + R(20, 205, 360, 6, '#e3e7eb') + R(20, 240, 360, 8, '#e3e7eb') },
    { z: 3, t: T('Loin, tout petit, ajoute une rangée d’arbres et une clôture.', 'Far away, very small, add a row of trees and a fence.'),
      d: (s, m) => LN(m, 'M40 185v-8M52 185v-11M64 185v-7M76 185v-10M88 185v-8M120 186h80M130 186v-5M150 186v-5M170 186v-5M190 186v-5', '#4a4e69', 3) },
    { z: 5, t: T('Devant, dessine un personnage en manteau foncé et en tuque, qui nous regarde.', 'In front, draw a person in a dark coat and a toque, looking at us.'),
      d: (s, m) => P('M255 285Q258 215 300 205Q342 215 345 285Z', '#2f3e46', hl(s, m)) + R(286, 198, 28, 10, '#b5838d') + C(300, 180, 22, '#e8c4a0', hl(s, m)) + P('M277 176Q300 136 323 176Z', '#9d2b2b', hl(s, m)) + C(300, 148, 6, '#f1e3c8') },
    { z: 6, t: T('Ajoute un visage calme, et un petit traîneau très loin.', 'Add a calm face, and a little sled far away.'),
      d: (s, m) => DT(m, [[293, 182], [307, 182]], '#2f3e46', 4) + LN(m, 'M295 192h10M118 195h22M120 198h18', '#4a4e69', 3) },
    END('Beaucoup d’espace vide : ton tableau donne une impression de calme.', 'Lots of empty space: your painting feels calm and quiet.'),
  ],
});

// ───────────────────────── Carr : forêt qui danse ─────────────────────────
const CARR_X = [80, 170, 260, 340];
const arches = (k, col, sh = 0) => CARR_X.map((x, i) => [45, 85, 125, 165, 205].map((y) => { const w = (24 + (y / 285) * 34) * k, yy = y + sh + (i % 2) * 10; return `M${f0(x - w)} ${yy + 22}Q${x} ${yy - 28} ${f0(x + w)} ${yy + 22}Q${x} ${yy + 2} ${f0(x - w)} ${yy + 22}Z`; }).join('')).join('');
const pCarr = mk({
  id: 'artistes-carr-foret', artist: 'carr', emoji: '🌲', level: 2, minutes: 35, theme: 'nature',
  title: T('Une forêt qui danse, à la manière d’Emily Carr', 'A dancing forest, in the style of Emily Carr'),
  materials: [M.papier, M.crayon, M.gouache, M.pinceau, M.eau], fin: NONE,
  layers: [
    { z: 6, t: T('Dessine de grands troncs d’arbres, si hauts qu’ils touchent le haut de la feuille.', 'Draw tall tree trunks, so tall they touch the top of the paper.'),
      d: (s, m) => (m === 'fin' ? '' : P(CARR_X.map((x) => `M${x} 285Q${x - 6} 150 ${x} 18`).join(''), 'none', s)) },
    { z: 0, t: T('Peins le ciel en bleu pâle entre les arbres.', 'Paint the sky pale blue between the trees.'), d: (s, m) => R(20, 15, 360, 270, '#cde5e8', hl(s, m)) },
    { z: 3, t: T('Autour de chaque tronc, peins des vagues vertes, comme des rideaux qui ondulent.', 'Around each trunk, paint green waves, like rippling curtains.'), d: (s, m) => P(arches(1), '#1b4332', hl(s, m)) },
    { z: 4, t: T('Ajoute du vert pâle et du jaune : c’est la lumière dans la forêt.', 'Add pale green and yellow: it is the light in the forest.'), d: (s, m) => P(arches(0.55, 0, 8), '#74c69d', hl(s, m)) + P(arches(0.25, 0, 14), '#e9d985', hl(s, m)) },
    { z: 1, t: T('Peins le sol avec des vagues brunes et vertes.', 'Paint the ground with brown and green waves.'),
      d: (s, m) => P('M20 245Q80 220 140 245T260 245T380 240L380 285L20 285Z', '#6b4f2c', hl(s, m)) + P('M20 270Q90 252 160 270T300 268T380 265L380 285L20 285Z', '#2d6a4f', hl(s, m)) },
    { z: 2, t: T('Peins les troncs en brun foncé.', 'Paint the trunks dark brown.'), d: (s, m) => LN(m, CARR_X.map((x) => `M${x} 285Q${x - 6} 150 ${x} 18`).join(''), '#4a2f1d', 12) },
    END('Ta forêt bouge et danse, comme celles d’Emily Carr!', 'Your forest moves and dances, like Emily Carr’s!'),
  ],
});

// ───────────────────────── Morrisseau / style Woodland : contours épais ─────────────────────────
const FISH = 'M60 150Q130 60 240 115L330 70L315 150L330 230L240 185Q130 240 60 150Z';
const FISH_IN = [['M150 96Q185 50 225 108Z', '#2a9d8f'], ['M150 204Q185 250 225 192Z', '#2a9d8f'], ['M262 150L312 105L304 150L312 195Z', '#ffd166'], ['M219 150H250', ''], ['M150 108Q168 150 150 192', '']];
const pMorrisseau = mk({
  id: 'artistes-morrisseau-contours', artist: 'morrisseau', emoji: '🐟', level: 2, minutes: 30, theme: 'animaux',
  title: T('Un poisson aux contours épais, à la manière des Terres boisées', 'A bold-outlined fish, in the Woodland style'),
  materials: [M.papier, M.crayon, M.feutreNoir, M.feutres],
  layers: [
    { z: 2, t: T('Dessine au crayon un gros poisson, avec une queue.', 'With a pencil, draw a big fish with a tail.'), d: (s, m) => (m === 'fin' ? '' : P(FISH, 'none', s)) },
    { z: 2, t: T('À l’intérieur, dessine des formes : un œil rond, un grand rond, des nageoires, des lignes courbes.', 'Inside, draw shapes: a round eye, a big circle, fins, curved lines.'),
      d: (s, m) => (m === 'fin' ? '' : FISH_IN.map(([d]) => P(d, 'none', s)).join('') + C(110, 140, 15, 'none', s) + C(195, 150, 24, 'none', s)) },
    { z: 7, t: T('Repasse sur toutes les lignes avec un gros feutre noir. Les contours sont bien épais!', 'Go over every line with a thick black marker. The outlines are nice and thick!'),
      d: (s, m) => LN(m, FISH + FISH_IN.map(([d]) => d).join('') + 'M125 140a15 15 0 1 0 -30 0a15 15 0 1 0 30 0M219 150a24 24 0 1 0 -48 0a24 24 0 1 0 48 0', '#111', 8) + C(110, 140, 6, '#111') },
    { z: 1, t: T('Colorie chaque forme d’une couleur vive, sans dépasser.', 'Colour each shape with a bright colour, without going over the lines.'),
      d: (s, m) => P(FISH, '#f4a259', hl(s, m)) + FISH_IN.filter(([, c]) => c).map(([d, c]) => P(d, c)).join('') + C(110, 140, 15, '#fff') + C(195, 150, 24, '#e63946') },
    { z: 6, t: T('Ajoute des bulles rondes, avec un contour noir et une couleur dedans.', 'Add round bubbles with a black outline and a colour inside.'),
      d: (s, m) => [[42, 108, 10, '#8ecae6'], [34, 78, 7, '#c77dff'], [48, 50, 9, '#ffd166'], [350, 40, 8, '#8ecae6']].map(([x, y, r, c]) => C(x, y, r, c, m === 'new' ? s : 'stroke="#111" stroke-width="5"')).join('') },
    { z: 6, t: T('Dessine l’eau avec de grandes lignes courbes noires.', 'Draw the water with big curved black lines.'), d: (s, m) => LN(m, 'M30 262Q80 242 130 262T230 262T330 262T375 258M90 30Q140 14 190 30T290 30', '#111', 6) },
    END('Des contours noirs et des couleurs franches : ton poisson est très fort!', 'Black outlines and bold colours: your fish looks so strong!'),
  ],
});

// ───────────────────────── Kenojuak Ashevak : estampe de hibou ─────────────────────────
const OWL = 'M200 95C250 95 262 160 250 210C240 245 160 245 150 210C138 160 150 95 200 95ZM196 135a16 16 0 1 0 -32 0a16 16 0 1 0 32 0M236 135a16 16 0 1 0 -32 0a16 16 0 1 0 32 0M186 135a6 6 0 1 0 -12 0a6 6 0 1 0 12 0M226 135a6 6 0 1 0 -12 0a6 6 0 1 0 12 0M194 152L200 166L206 152ZM168 104L160 82L182 98M232 104L240 82L218 98M175 185Q200 200 225 185M178 207Q200 222 222 207M185 240v14M215 240v14';
const FEATH = Array.from({ length: 8 }, (_, i) => { const a = (-160 + i * (140 / 7)) * (Math.PI / 180); const [x1, y1] = pol(200, 165, 78, a), [x2, y2] = pol(200, 165, 126, a); return lens(x1, y1, x2, y2, 14) + `M${f0(x1)} ${f0(y1)}L${f0(x2)} ${f0(y2)}`; }).join('');
const pKenojuak = mk({
  id: 'artistes-kenojuak-estampe', artist: 'kenojuak', emoji: '🦉', level: 3, minutes: 40, adult: true, theme: 'animaux',
  title: T('Une estampe de hibou, à la manière de Kenojuak Ashevak', 'An owl print, in the style of Kenojuak Ashevak'),
  materials: [T('Barquette de styromousse propre', 'Clean foam tray'), M.crayon, T('Gouache épaisse', 'Thick poster paint'), T('Rouleau ou gros pinceau', 'Roller or big brush'), M.papier, M.ciseaux],
  layers: [
    { t: T('Demande à un adulte de couper les bords d’une barquette de styromousse. Tu as une plaque plate.', 'Ask a grown-up to cut the edges off a foam tray. Now you have a flat plate.'), d: (s) => R(70, 30, 260, 240, '#ece7da', s, 16) },
    { z: 6, t: T('Avec un crayon, dessine un hibou en appuyant fort. Tes lignes font des creux.', 'With a pencil, draw an owl, pressing hard. Your lines make grooves.'), d: (s, m) => LN(m, OWL, '#8a8577', 4) },
    { z: 6, t: T('Dessine de grandes plumes autour du hibou, comme les rayons d’un soleil.', 'Draw big feathers around the owl, like the rays of a sun.'), d: (s, m) => LN(m, FEATH, '#8a8577', 4) },
    { z: 7, t: T('Peins les plumes en orange et le hibou en bleu, avec de la gouache épaisse.', 'Paint the feathers orange and the owl blue, with thick paint.'),
      d: (s) => R(70, 30, 260, 240, '#f28c28', s, 16) + P('M200 95C250 95 262 160 250 210C240 245 160 245 150 210C138 160 150 95 200 95Z', '#1d4e89') + `<path d="${OWL}${FEATH}" stroke="#7d3f12" stroke-width="4"/>` },
    { only: true, t: T('Pose une feuille sur la plaque. Frotte bien partout avec ta main.', 'Lay a sheet of paper on the plate. Rub all over with your hand.'),
      d: (s) => R(60, 24, 280, 252, '#fff', s, 4) + arrow(130, 150, 180, 120) + arrow(270, 150, 220, 180) },
    { reset: true, t: T('Soulève doucement la feuille : ton hibou apparaît en lignes blanches!', 'Gently lift the paper: your owl appears in white lines!'),
      d: (s, m) => R(70, 30, 260, 240, '#f28c28', hl(s, m), 16) + `<g transform="translate(400 0) scale(-1 1)">${P('M200 95C250 95 262 160 250 210C240 245 160 245 150 210C138 160 150 95 200 95Z', '#1d4e89')}<path d="${OWL}${FEATH}" stroke="#fff" stroke-width="4"/></g>` },
    { t: T('Laisse sécher, puis signe ton estampe au crayon, en bas.', 'Let it dry, then sign your print in pencil at the bottom.'), d: (s, m) => LN(m, 'M250 283q8 -8 14 0t14 0t14 0', '#555', 2) },
  ],
});

// ───────────────────────── Christi Belcourt : fleurs en points ─────────────────────────
const STEMS = [[[120, 285], [100, 180], [150, 90]], [[210, 285], [232, 170], [200, 70]], [[300, 285], [322, 190], [282, 112]], [[110, 215], [55, 175], [70, 132]], [[318, 215], [372, 175], [350, 145]]];
const FLOW = [[150, 90, '#e63946', '#ffafcc'], [200, 70, '#3a86ff', '#bde0fe'], [282, 112, '#ff7b00', '#ffd166'], [70, 132, '#c77dff', '#ffafcc'], [350, 145, '#e63946', '#ffd166']];
const pBelcourt = mk({
  id: 'artistes-belcourt-points', artist: 'belcourt', emoji: '🌸', level: 2, minutes: 35, theme: 'nature',
  title: T('Des fleurs en points, à la manière de Christi Belcourt', 'Dotted flowers, in the style of Christi Belcourt'),
  materials: [M.noir, M.blanc, M.cotons, M.gouache, M.assiette], paper: '#111', old: 'stroke="#e8e8e8" stroke-width="2"', fin: NONE,
  layers: [
    { z: 2, t: T('Sur le papier noir, dessine au crayon blanc des tiges qui se courbent.', 'On the black paper, draw curving stems with a white pencil.'), d: (s, m) => (m === 'fin' ? '' : P(STEMS.map(([a, b, c]) => `M${a}Q${b} ${c}`).join(''), 'none', s)) },
    { t: T('Trempe un coton-tige dans la gouache verte. Fais des points tout le long des tiges.', 'Dip a cotton swab in green paint. Make dots all along the stems.'), d: (s, m) => DT(m, STEMS.flatMap(([a, b, c]) => sampleQ(a, b, c, 12).slice(0, -1)), '#52b788', 7) },
    { z: 6, t: T('Pour chaque fleur : un point au centre, puis des points en rond autour. Ce sont les pétales!', 'For each flower: one dot in the middle, then dots in a ring around it. Those are the petals!'),
      d: (s, m) => FLOW.map(([x, y, c1, c2]) => DT(m, [[x, y]], '#ffd166', 11) + DT(m, Array.from({ length: 8 }, (_, i) => pol(x, y, 11, (i * Math.PI) / 4)), c1, 9) + DT(m, Array.from({ length: 12 }, (_, i) => pol(x, y, 21, (i * Math.PI) / 6)), c2, 7)).join('') },
    { t: T('Fais des feuilles : le contour en petits points, puis remplis-les.', 'Make leaves: dot the outline, then fill them in.'),
      d: (s, m) => [[160, 210, 105, 185], [245, 200, 290, 168], [118, 250, 160, 235]].map(([x1, y1, x2, y2]) => { const o = []; for (let i = 0; i <= 6; i++) { const t = i / 6, w = Math.sin(t * Math.PI) * 11, l = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / l, ny = (x2 - x1) / l, x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t; o.push([x + nx * w, y + ny * w], [x - nx * w, y - ny * w]); } return DT(m, o, '#95d5b2', 6) + DT(m, sampleQ([x1, y1], [(x1 + x2) / 2, (y1 + y2) / 2], [x2, y2], 5), '#2d6a4f', 6); }).join('') },
    { t: T('Ajoute de petits fruits ronds avec de gros points.', 'Add little round berries with big dots.'), d: (s, m) => DT(m, [[248, 140], [258, 150], [244, 154], [92, 240], [100, 252], [330, 220], [340, 232]], '#9d4edd', 13) },
    { z: 7, t: T('Mets de minuscules points blancs un peu partout, comme des perles.', 'Put tiny white dots here and there, like beads.'),
      d: (s, m) => DT(m, [[150, 90], [200, 70], [282, 112], [70, 132], [350, 145], [60, 40], [330, 50], [250, 270], [40, 270], [370, 270]], '#fff', 4) },
    END('Tes fleurs brillent comme des perles, à la manière de Christi Belcourt!', 'Your flowers shine like beads, in the style of Christi Belcourt!'),
  ],
});

// ───────────────────────── Monet : nénuphars ─────────────────────────
const MON = (() => {
  const r = rnd(41), w = { '#4a6fa5': '', '#8e7cc3': '', '#5e9c8f': '' }, l = { '#eef3d2': '', '#ffffff': '' };
  for (let i = 0; i < 84; i++) { const c = Object.keys(w)[i % 3]; w[c] += `M${f0(25 + r() * 330)} ${f0(20 + r() * 260)}h${f0(10 + r() * 16)}`; }
  for (let i = 0; i < 30; i++) { const c = Object.keys(l)[i % 2]; l[c] += `M${f0(25 + r() * 330)} ${f0(20 + r() * 260)}h${f0(8 + r() * 12)}`; }
  return { w, l };
})();
const PADS = [[90, 80, 34], [250, 62, 28], [320, 140, 40], [150, 160, 46], [62, 220, 30], [240, 235, 44], [345, 252, 24]];
const pad = ([cx, cy, rx], i) => { const ry = rx * 0.5, a = 0.6 + i * 0.9, a0 = a + 0.3, a1 = a - 0.3; const [x0, y0] = [cx + rx * Math.cos(a0), cy + ry * Math.sin(a0)], [x1, y1] = [cx + rx * Math.cos(a1), cy + ry * Math.sin(a1)]; return `M${cx} ${cy}L${f0(x0)} ${f0(y0)}A${rx} ${f0(ry)} 0 1 1 ${f0(x1)} ${f0(y1)}Z`; };
const pMonet = mk({
  id: 'artistes-monet-nenuphars', artist: 'monet', emoji: '🪷', level: 2, minutes: 30, theme: 'nature', season: 'ete',
  title: T('Des nénuphars, à la manière de Monet', 'Water lilies, in the style of Monet'),
  materials: [M.papier, M.gouache, M.pinceau, M.eau, M.assiette], fin: NONE,
  layers: [
    { z: 0, t: T('Peins l’eau avec de petits coups de pinceau couchés : bleu, mauve et vert.', 'Paint the water with short, flat brush strokes: blue, purple and green.'),
      d: (s, m) => R(20, 15, 360, 270, '#7aa3c8', hl(s, m)) + Object.entries(MON.w).map(([c, d]) => `<path d="${d}" stroke="${c}" stroke-width="6"/>`).join('') },
    { z: 1, t: T('Ajoute des reflets clairs : du blanc et du jaune pâle.', 'Add light reflections: white and pale yellow.'), d: (s, m) => Object.entries(MON.l).map(([c, d]) => LN(m, d, c, 5)).join('') },
    { t: T('Peins des feuilles de nénuphar : des ovales verts avec une petite encoche.', 'Paint lily pads: green ovals with a little notch.'), d: (s, m) => PADS.map((p, i) => P(pad(p, i), ['#5a9e4b', '#7cb342', '#3d7a3a'][i % 3], hl(s, m))).join('') },
    { z: 6, t: T('Pose des fleurs : de petites taches roses et blanches sur les feuilles.', 'Add flowers: little pink and white dabs on the pads.'),
      d: (s, m) => [PADS[0], PADS[2], PADS[3], PADS[5]].map(([x, y]) => E(x - 6, y - 4, 8, 5, '#f7a1c4', hl(s, m)) + E(x + 6, y - 4, 8, 5, '#f7a1c4', hl(s, m)) + E(x, y - 8, 6, 6, '#fff', hl(s, m))).join('') },
    { z: 7, t: T('En haut, ajoute du vert foncé qui pend, comme les branches d’un saule.', 'At the top, add hanging dark green, like willow branches.'),
      d: (s, m) => LN(m, Array.from({ length: 26 }, (_, i) => `M${28 + i * 14} 16q${(i % 3) - 1} 20 ${(i % 2) * 4} ${30 + ((i * 17) % 40)}`).join(''), '#2f5d3a', 5) },
    END('Recule de quelques pas : de loin, l’eau brille comme chez Monet!', 'Step back a few steps: from far away, the water shimmers like Monet’s!'),
  ],
});

// ───────────────────────── Van Gogh : nuit tourbillonnante ─────────────────────────
const SEGS = [[[30, 120], [90, 70], [160, 150], [220, 100]], [[220, 100], [280, 50], [330, 90], [375, 80]], [[25, 170], [90, 140], [170, 195], [240, 160]], [[240, 160], [300, 130], [340, 170], [378, 150]]];
const VG = (() => {
  const o = ['', '', ''];
  let n = 0;
  for (const seg of SEGS) for (const off of [-14, 0, 14]) for (let i = 0; i < 9; i++) { const [x, y, dx, dy] = cubic(seg, 0.06 + i * 0.11), l = Math.hypot(dx, dy) || 1; o[n++ % 3] += `M${f0(x)} ${f0(y + off)}l${f0((dx / l) * 12)} ${f0((dy / l) * 12)}`; }
  return o;
})();
const SWIRL = SEGS.map(([a, b, c, d]) => `M${a}C${b} ${c} ${d}`).join('') + 'M124 60a6 6 0 1 1 12 0a12 12 0 1 1 -24 0a18 18 0 1 1 36 0';
const STARS = [[70, 45], [200, 38], [250, 125], [60, 95], [150, 120], [350, 135]];
const HILL = 'M20 215Q90 180 160 205T300 195T380 200L380 285L20 285Z';
const pVanGogh = mk({
  id: 'artistes-vangogh-nuit', artist: 'vangogh', emoji: '🌙', level: 2, minutes: 35, theme: 'nature',
  title: T('Une nuit qui tourbillonne, à la manière de Van Gogh', 'A swirling night, in the style of Van Gogh'),
  materials: [M.papier, M.crayon, M.pastels], fin: NONE,
  layers: [
    { z: 6, t: T('Dessine des collines qui ondulent et une petite maison.', 'Draw rolling hills and a little house.'),
      d: (s, m) => (m === 'fin' ? '' : P('M20 215Q90 180 160 205T300 195T380 200M250 210v-28h40v28M246 182l24 -18l24 18', 'none', s)) },
    { z: 6, t: T('Dessine une grosse lune et des étoiles, avec des cercles autour.', 'Draw a big moon and stars, with circles around them.'),
      d: (s, m) => (m === 'fin' ? '' : C(320, 55, 22, 'none', s) + C(320, 55, 34, 'none', s) + STARS.map(([x, y]) => C(x, y, 6, 'none', s) + C(x, y, 13, 'none', s)).join('')) },
    { z: 6, t: T('Dans le ciel, fais de grandes vagues et une spirale.', 'In the sky, make big waves and a spiral.'), d: (s, m) => (m === 'fin' ? `<path d="${SWIRL}" stroke="#cfe0f7" stroke-width="5"/>` : P(SWIRL, 'none', s)) },
    { z: 0, t: T('Colorie le ciel avec plein de petits traits bleus, dans le même sens que les vagues.', 'Colour the sky with lots of little blue strokes, going the same way as the waves.'),
      d: (s, m) => R(20, 15, 360, 210, '#1e3a78', hl(s, m)) + ['#6fa0e8', '#a9c8f0', '#3b64b5'].map((c, i) => `<path d="${VG[i]}" stroke="${c}" stroke-width="5"/>`).join('') },
    { z: 7, t: T('Colorie la lune et les étoiles en jaune, avec des cercles orange et blancs.', 'Colour the moon and stars yellow, with orange and white circles.'),
      d: (s, m) => C(320, 55, 34, 'none', 'stroke="#f4a52a" stroke-width="7"') + C(320, 55, 22, '#f9d84a', hl(s, m)) + STARS.map(([x, y]) => C(x, y, 12, 'none', 'stroke="#fff6c0" stroke-width="4"') + C(x, y, 6, '#f9d84a', hl(s, m))).join('') },
    { z: 3, t: T('Colorie les collines avec des traits verts, bleus et noirs.', 'Colour the hills with green, blue and black strokes.'),
      d: (s, m) => P(HILL, '#2d4a3e', hl(s, m)) + LN(m, 'M40 230l14 -4M80 240l14 -4M130 225l14 -4M180 250l14 -4M220 230l14 -4M300 240l14 -4M340 225l14 -4M60 265l14 -4M160 270l14 -4M260 268l14 -4', '#5b8a72', 5) },
    { z: 5, t: T('Colorie la maison, avec une fenêtre jaune allumée.', 'Colour the house, with a glowing yellow window.'),
      d: (s, m) => R(250, 182, 40, 28, '#e9c46a', hl(s, m)) + PG([[246, 182], [270, 164], [294, 182]], '#7a3e2b', hl(s, m)) + R(264, 190, 12, 10, '#ffd23f') },
    END('Ta nuit tourbillonne, comme le ciel de Van Gogh!', 'Your night swirls, like Van Gogh’s sky!'),
  ],
});

// ───────────────────────── Van Gogh : tournesols ─────────────────────────
const SUN = [[150, 95, 16], [205, 70, 18], [262, 100, 16], [118, 150, 14], [288, 155, 14], [200, 132, 15]];
const VASE = 'M165 255Q150 210 175 185H225Q250 210 235 255Z';
const pTournesols = mk({
  id: 'artistes-vangogh-tournesols', artist: 'vangogh', emoji: '🌻', level: 2, minutes: 35, theme: 'nature', season: 'ete',
  title: T('Un bouquet de tournesols, à la manière de Van Gogh', 'A bunch of sunflowers, in the style of Van Gogh'),
  materials: [M.papier, M.crayon, M.pastels, M.gouache, M.pinceau],
  layers: [
    { t: T('Dessine un vase posé sur une table.', 'Draw a vase on a table.'), d: (s, m) => OF(m, s, VASE, '#e9c46a') + (m === 'fin' ? '' : P('M20 255H380', 'none', s)) },
    { z: 6, t: T('Dessine des ronds pour le cœur des tournesols, au-dessus du vase.', 'Draw circles for the centres of the sunflowers, above the vase.'), d: (s, m) => SUN.map(([x, y, r]) => OF(m, s, `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`, '#7f4f24')).join('') },
    { z: 4, t: T('Autour de chaque rond, dessine des pétales pointus.', 'Around each circle, draw pointy petals.'), d: (s, m) => SUN.map(([x, y, r]) => PG(starPts(x, y, r * 2.1, r * 1.05, 12), m === 'fin' ? '#ffc300' : 'none', m === 'fin' ? 'stroke="#e85d04" stroke-width="2"' : s)).join('') },
    { z: 3, t: T('Ajoute les tiges et quelques feuilles.', 'Add the stems and a few leaves.'),
      d: (s, m) => (m === 'fin' ? LN(m, SUN.map(([x, y]) => `M${x} ${y}Q${(x + 200) / 2} ${y + 60} 200 188`).join(''), '#55a630', 4) + P(lens(175, 190, 130, 200, 10) + lens(225, 190, 270, 205, 10), '#2b9348') : P(SUN.map(([x, y]) => `M${x} ${y}Q${(x + 200) / 2} ${y + 60} 200 188`).join('') + lens(175, 190, 130, 200, 10) + lens(225, 190, 270, 205, 10), 'none', s)) },
    { z: 5, t: T('Colorie les pétales avec des traits jaunes et orange, bien épais.', 'Colour the petals with thick yellow and orange strokes.'),
      d: (s, m) => (m === 'fin' ? '' : SUN.map(([x, y, r]) => PG(starPts(x, y, r * 2.1, r * 1.05, 12), '#ffc300', s)).join('')) + LN(m, SUN.map(([x, y, r]) => Array.from({ length: 6 }, (_, i) => { const [a, b] = pol(x, y, r * 1.1, i * 1.05), [c, e] = pol(x, y, r * 1.8, i * 1.05); return `M${f0(a)} ${f0(b)}L${f0(c)} ${f0(e)}`; }).join('')).join(''), '#f77f00', 3) },
    { z: 7, t: T('Colorie le cœur en brun, avec de petits points foncés.', 'Colour the centres brown, with little dark dots.'),
      d: (s, m) => SUN.map(([x, y, r]) => C(x, y, r, '#7f4f24', hl(s, m))).join('') + DT(m, SUN.flatMap(([x, y, r]) => [[x - r / 3, y - r / 3], [x + r / 3, y], [x - r / 4, y + r / 3]]), '#3d2b1f', 5) },
    { z: 0, t: T('Fais le fond bleu avec de petits traits, et colorie la table et le vase. Tes tournesols brillent comme le soleil!', 'Make the background blue with little strokes, and colour the table and the vase. Your sunflowers shine like the sun!'),
      d: (s, m) => R(20, 15, 360, 240, '#5aa9c8', hl(s, m)) + `<path d="${Array.from({ length: 40 }, (_, i) => `M${30 + ((i * 53) % 340)} ${25 + ((i * 37) % 220)}l10 -6`).join('')}" stroke="#8ecae6" stroke-width="5"/>` + R(20, 255, 360, 30, '#d4a373', hl(s, m)) },
  ],
});

// ───────────────────────── Matisse : papiers découpés ─────────────────────────
const ALG = 'M-6 50C-14 30 4 22 -4 6C-12 -8 6 -22 0 -46C12 -34 18 -16 10 -2C22 -4 24 14 12 22C22 30 14 46 6 50Z';
const alg = (x, y, k, f, s = '') => `<path d="${ALG}" fill="${f}" ${s} transform="translate(${x} ${y}) scale(${k})"/>`;
const DROP = 'M0 -20Q16 2 0 14Q-16 2 0 -20Z';
const drop = (x, y, f, s = '') => `<path d="${DROP}" fill="${f}" ${s} transform="translate(${x} ${y}) scale(1.4)"/>`;
const MAT_A = [[90, 165, '#7ac74f', 1.6], [200, 145, '#ff8fab', 1.9], [310, 165, '#ffd166', 1.6]];
const MAT_S = [[70, 60, '#f4f1de'], [330, 62, '#ff6b35']], MAT_D = [[150, 250, '#f4f1de'], [255, 55, '#7ac74f'], [262, 248, '#ff6b35']];
const MAT_COMP = () => MAT_A.map(([x, y, c, k]) => alg(x, y, k, c)).join('') + MAT_S.map(([x, y, c]) => PG(starPts(x, y, 22, 10, 5), c)).join('') + MAT_D.map(([x, y, c]) => drop(x, y, c)).join('');
const pMatisse = mk({
  id: 'artistes-matisse-decoupage', artist: 'matisse', emoji: '✂️', level: 1, minutes: 25,
  title: T('Des formes découpées, à la manière de Matisse', 'Cut-out shapes, in the style of Matisse'),
  materials: [T('Grande feuille de couleur pour le fond', 'Big coloured sheet for the background'), M.papiersC, M.ciseaux, M.colle], paper: '#2b59c3', fin: NONE,
  layers: [
    { t: T('Choisis une grande feuille de couleur pour le fond.', 'Choose a big coloured sheet for the background.'), d: (s, m) => (m === 'new' ? R(20, 15, 360, 270, 'none', s, 4) : '') },
    { only: true, t: T('Sans dessiner avant, découpe des formes d’algues qui ondulent dans des papiers de couleur.', 'Without drawing first, cut wavy seaweed shapes out of coloured paper.'),
      d: () => MAT_A.map(([x, y, c, k]) => R(x - 45, y - 85, 90, 170, c) + alg(x, y, k, 'none', `stroke="${HL}" stroke-width="2.5" stroke-dasharray="6 5"`)).join('') },
    { only: true, t: T('Découpe aussi des étoiles et des gouttes.', 'Also cut out stars and drops.'),
      d: () => [[90, 150, '#f4f1de'], [200, 150, '#ff6b35'], [310, 150, '#7ac74f']].map(([x, y, c], i) => R(x - 50, y - 50, 100, 100, c) + (i % 2 ? drop(x, y, 'none', `stroke="${HL}" stroke-width="2.5" stroke-dasharray="5 4"`) : PG(starPts(x, y, 34, 15, 5), 'none', `stroke="${HL}" stroke-width="4" stroke-dasharray="8 6"`))).join('') },
    { t: T('Place tes formes sur le fond. Bouge-les jusqu’à ce que ce soit beau!', 'Place your shapes on the background. Move them around until it looks great!'),
      d: (s, m) => MAT_COMP() + (m === 'new' ? arrow(60, 110, 85, 135) + arrow(250, 105, 222, 128) + arrow(345, 110, 318, 135) : '') },
    { t: T('Colle chaque forme avec ton bâton de colle.', 'Glue each shape down with your glue stick.'), d: (s, m) => (m === 'new' ? DT(m, [[90, 165], [200, 145], [310, 165], [70, 60], [330, 62], [150, 250], [255, 55], [262, 248]], '#fff', 6) : '') },
    { t: T('Ajoute de petits carrés de couleur tout autour, comme un cadre.', 'Add little coloured squares all around, like a frame.'),
      d: (s, m) => { const sq = []; for (let x = 28; x <= 352; x += 24) sq.push([x, 22], [x, 264]); for (let y = 46; y <= 240; y += 24) sq.push([28, y], [352, y]); return HG(m, byCol(sq.map(([x, y], i) => [i % 2 ? '#f4f1de' : '#ff6b35', `M${x} ${y}h14v14h-14z`]))); } },
    END('Tes formes dansent sur le fond, comme les papiers découpés de Matisse!', 'Your shapes dance on the background, like Matisse’s paper cut-outs!'),
  ],
});

// ───────────────────────── Kandinsky : cercles concentriques ─────────────────────────
const KCOL = ['#e63946', '#f4a261', '#ffd166', '#2a9d8f', '#264653', '#8ecae6', '#9b5de5', '#f15bb5', '#00bbf9', '#00f5d4', '#1d3557', '#fb8500'];
const KAN = (() => {
  const r = rnd(5), cells = [];
  for (let j = 0; j < 3; j++) for (let i = 0; i < 4; i++) {
    const x0 = 20 + i * 90, y0 = 15 + j * 90, cx = x0 + 45 + (r() - 0.5) * 16, cy = y0 + 45 + (r() - 0.5) * 16;
    const cols = []; let last = -1;
    for (let k = 0; k < 5; k++) { let c; do c = Math.floor(r() * KCOL.length); while (c === last); cols.push(KCOL[c]); last = c; }
    cells.push({ x0, y0, cx, cy, cols });
  }
  return cells;
})();
const KR = [34, 25, 16, 8];
const circ = (x, y, r) => `M${f0(x - r)} ${f0(y)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const pKandinsky = mk({
  id: 'artistes-kandinsky-cercles', artist: 'kandinsky', emoji: '⭕', level: 1, minutes: 30,
  title: T('Des cercles dans des carrés, à la manière de Kandinsky', 'Circles in squares, in the style of Kandinsky'),
  materials: [M.papier, M.regle, M.crayon, M.pastels], fin: NONE,
  layers: [
    { z: 6, t: T('Avec une règle, partage ta feuille en 12 carrés.', 'With a ruler, divide your paper into 12 squares.'), d: (s, m) => (m === 'fin' ? '' : P('M110 15V285M200 15V285M290 15V285M20 105H380M20 195H380', 'none', s)) },
    { z: 6, t: T('Dans chaque carré, dessine un petit rond. Pas toujours au milieu!', 'In each square, draw a small circle. Not always in the middle!'), d: (s, m) => (m === 'fin' ? '' : P(KAN.map((c) => circ(c.cx, c.cy, 8)).join(''), 'none', s)) },
    { z: 6, t: T('Autour du petit rond, dessine des cercles de plus en plus grands.', 'Around the small circle, draw bigger and bigger circles.'), d: (s, m) => (m === 'fin' ? '' : P(KAN.map((c) => KR.slice(0, 3).map((r) => circ(c.cx, c.cy, r)).join('')).join(''), 'none', s)) },
    { z: 3, t: T('Colorie chaque anneau d’une couleur différente.', 'Colour each ring a different colour.'), d: (s, m) => KR.map((r, k) => byCol(KAN.map((c) => [c.cols[k + 1], circ(c.cx, c.cy, r)]), k ? '' : ' ' + hl(s, m))).join('') },
    { z: 1, t: T('Colorie le fond de chaque carré avec une autre couleur.', 'Colour the background of each square with another colour.'), d: (s, m) => byCol(KAN.map((c) => [c.cols[0], `M${c.x0} ${c.y0}h90v90h-90z`]), ' ' + hl(s, m)) },
    END('Chaque carré est différent, mais tous vont bien ensemble!', 'Every square is different, but they all go well together!'),
  ],
});

// ───────────────────────── Klee : château et soleil ─────────────────────────
const KLEE = (() => {
  const r = rnd(13), warm = ['#f4a261', '#e76f51', '#e9c46a', '#ffb4a2', '#d62828', '#f6bd60', '#e5989b'], cool = ['#3d5a80', '#5e548e', '#7d8cc4', '#98c1d9', '#4a4e69', '#6d597a'];
  const xs = [20, 70, 115, 170, 215, 265, 320, 380], ys = [15, 60, 100, 150, 195, 240, 285], bg = [];
  for (let j = 0; j < 6; j++) for (let i = 0; i < 7; i++) bg.push([cool[Math.floor(r() * cool.length)], `M${xs[i]} ${ys[j]}H${xs[i + 1]}V${ys[j + 1]}H${xs[i]}z`]);
  const cells = (x, y, w, h, cw, ch) => { const o = []; for (let yy = y; yy < y + h - 1; yy += ch) for (let xx = x; xx < x + w - 1; xx += cw) o.push([warm[Math.floor(r() * warm.length)], `M${xx} ${yy}h${Math.min(cw, x + w - xx)}v${Math.min(ch, y + h - yy)}h${-Math.min(cw, x + w - xx)}z`]); return o; };
  const castle = [...cells(150, 170, 100, 100, 25, 25), ...cells(110, 120, 40, 150, 20, 25), ...cells(250, 120, 40, 150, 20, 25), ...cells(175, 100, 50, 70, 25, 35)];
  return { bg, castle };
})();
const KLEE_O = 'M110 120h40v150h-40zM250 120h40v150h-40zM150 170h100v100h-100zM175 100h50v70h-50z';
const KLEE_R = [[[105, 120], [130, 80], [155, 120]], [[245, 120], [270, 80], [295, 120]], [[170, 100], [200, 62], [230, 100]]];
const pKlee = mk({
  id: 'artistes-klee-chateau', artist: 'klee', emoji: '🏰', level: 2, minutes: 35,
  title: T('Un château de formes, à la manière de Paul Klee', 'A castle of shapes, in the style of Paul Klee'),
  materials: [M.papier, M.regle, M.crayon, M.pastels, M.crayonsC], fin: `stroke="${D}" stroke-width="1.5"`,
  layers: [
    { z: 6, t: T('Avec une règle, dessine un château avec des rectangles : des tours et des murs.', 'With a ruler, draw a castle with rectangles: towers and walls.'), d: (s) => P(KLEE_O, 'none', s) },
    { z: 6, t: T('Ajoute des toits en triangles et une porte en demi-rond.', 'Add triangle roofs and a half-circle door.'),
      d: (s, m) => KLEE_R.map((p) => PG(p, m === 'fin' ? '#c1121f' : 'none', s)).join('') + P('M185 270V245A15 15 0 0 1 215 245V270Z', m === 'fin' ? '#3d2b1f' : 'none', s) },
    { z: 6, t: T('Dessine un soleil rond dans le ciel.', 'Draw a round sun in the sky.'), d: (s, m) => C(325, 55, 22, m === 'fin' ? '#d62828' : 'none', s) },
    { z: 2, t: T('Partage le fond en petits carrés et rectangles, avec la règle.', 'Divide the background into little squares and rectangles, with the ruler.'),
      d: (s, m) => (m === 'fin' ? '' : P('M70 15V285M115 15V285M170 15V285M215 15V285M265 15V285M320 15V285M20 60H380M20 100H380M20 150H380M20 195H380M20 240H380', 'none', m === 'new' ? s : 'stroke="#9aa0b5" stroke-width="2"')) },
    { z: 4, t: T('Colorie chaque petite forme du château d’une couleur chaude : orange, rouge, jaune, rose.', 'Colour each little shape of the castle a warm colour: orange, red, yellow, pink.'), d: (s, m) => HG(m, byCol(KLEE.castle)) },
    { z: 1, t: T('Colorie le fond avec des couleurs froides : bleu, mauve, gris.', 'Colour the background with cool colours: blue, purple, grey.'), d: (s, m) => HG(m, byCol(KLEE.bg)) },
    END('Ton château est fait de petits carrés de couleur, comme chez Paul Klee!', 'Your castle is made of little coloured squares, like Paul Klee’s!'),
  ],
});

// ───────────────────────── Mondrian : grille ─────────────────────────
const pMondrian = mk({
  id: 'artistes-mondrian-grille', artist: 'mondrian', emoji: '🟥', level: 1, minutes: 20,
  title: T('Une grille de couleurs, à la manière de Mondrian', 'A grid of colours, in the style of Mondrian'),
  materials: [M.papier, M.regle, M.feutreNoir, T('Feutres rouge, bleu et jaune', 'Red, blue and yellow markers')],
  layers: [
    { z: 6, t: T('Avec une règle et un feutre noir, trace quelques lignes droites de haut en bas.', 'With a ruler and a black marker, draw a few straight lines from top to bottom.'), d: (s, m) => LN(m, 'M120 15V285M250 15V285M330 100V285', '#111', m === 'fin' ? 9 : 4) },
    { z: 6, t: T('Trace des lignes de gauche à droite. Certaines s’arrêtent sur une autre ligne.', 'Draw lines from left to right. Some stop at another line.'), d: (s, m) => LN(m, 'M20 100H380M20 200H250M250 60H380M120 240H380', '#111', m === 'fin' ? 9 : 4) },
    { z: 1, t: T('Colorie un grand rectangle en rouge.', 'Colour a big rectangle red.'), d: (s, m) => R(120, 15, 130, 85, '#d62828', hl(s, m)) },
    { z: 1, t: T('Colorie un rectangle en bleu, et un petit en jaune.', 'Colour one rectangle blue, and a small one yellow.'), d: (s, m) => R(20, 200, 100, 85, '#1d4e89', hl(s, m)) + R(330, 240, 50, 45, '#fcbf49', hl(s, m)) },
    { z: 7, t: T('Laisse les autres rectangles blancs. Repasse les lignes noires pour qu’elles soient bien épaisses.', 'Leave the other rectangles white. Go over the black lines so they are nice and thick.'), d: (s, m) => (m === 'new' ? LN(m, 'M120 15V285M250 15V285M330 100V285M20 100H380M20 200H250M250 60H380M120 240H380', '#111', 9) : '') },
    END('Des lignes droites et trois couleurs : c’est tout simple et très beau!', 'Straight lines and three colours: very simple and very beautiful!'),
  ],
});

// ───────────────────────── Miró : créatures et étoiles ─────────────────────────
const AST = (x, y) => `M${x - 12} ${y}h24M${x} ${y - 12}v24M${x - 9} ${y - 9}l18 18M${x - 9} ${y + 9}l18 -18`;
const MI = { line: 'M60 235C40 180 90 150 110 180S150 240 180 205S200 125 240 150S300 215 320 172', st: AST(70, 55) + AST(205, 40) + AST(300, 90) + AST(255, 250) + AST(40, 130) };
const MIRO_SH = [['M335 158a14 14 0 1 0 -28 0a14 14 0 1 0 28 0', '#fcbf49'], ['M138 90a18 18 0 1 0 -36 0a18 18 0 1 0 36 0', '#fff'], ['M330 30A24 24 0 1 0 356 66A18 18 0 1 1 330 30Z', '#d62828'], ['M230 100L250 64L270 100Z', '#1d4e89'], ['M95 128Q110 150 95 160Q80 150 95 128Z', '#2a9d8f'], ['M180 262a12 12 0 1 0 -24 0a12 12 0 1 0 24 0', '#d62828']];
const MIRO_K = [['M327 158a6 6 0 1 0 -12 0a6 6 0 1 0 12 0'], ['M128 90a8 8 0 1 0 -16 0a8 8 0 1 0 16 0'], ['M290 122a9 9 0 1 0 -18 0a9 9 0 1 0 18 0'], ['M50 240h30l-15 -24z']];
const pMiro = mk({
  id: 'artistes-miro-creatures', artist: 'miro', emoji: '⭐', level: 1, minutes: 25,
  title: T('Des créatures et des étoiles, à la manière de Miró', 'Creatures and stars, in the style of Miró'),
  materials: [T('Feuille beige ou blanche', 'Beige or white paper'), T('Feutre noir fin', 'Thin black marker'), M.feutres], paper: '#f4ecd8', fin: 'stroke="#111" stroke-width="3"',
  layers: [
    { z: 6, t: T('Avec un feutre noir fin, dessine une drôle de créature : une longue ligne qui se tortille.', 'With a thin black marker, draw a funny creature: a long, wiggly line.'), d: (s, m) => LN(m, MI.line, '#111', 3) },
    { z: 6, t: T('Ajoute des yeux ronds, une lune et des étoiles comme de petits astérisques.', 'Add round eyes, a moon, and stars like little asterisks.'), d: (s, m) => LN(m, MI.st, '#111', 3) + MIRO_SH.slice(0, 3).map(([d]) => P(d, 'none', m === 'new' ? s : 'stroke="#111" stroke-width="3"')).join('') },
    { z: 6, t: T('Dessine de petites formes : des ronds, des triangles, des gouttes.', 'Draw little shapes: circles, triangles, drops.'), d: (s, m) => MIRO_SH.slice(3).map(([d]) => P(d, 'none', m === 'new' ? s : 'stroke="#111" stroke-width="3"')).join('') + MIRO_K.slice(2).map(([d]) => P(d, 'none', m === 'new' ? s : 'stroke="#111" stroke-width="3"')).join('') },
    { z: 3, t: T('Remplis quelques formes en rouge, jaune, bleu et vert.', 'Fill some shapes with red, yellow, blue and green.'), d: (s, m) => MIRO_SH.map(([d, c]) => P(d, c, hl(s, m))).join('') },
    { z: 7, t: T('Remplis aussi quelques formes en noir. Garde beaucoup de fond vide!', 'Fill a few shapes with black too. Keep lots of empty background!'), d: (s, m) => MIRO_K.map(([d]) => P(d, '#111', hl(s, m))).join('') },
    END('Ta créature flotte parmi les étoiles, comme dans un tableau de Miró!', 'Your creature floats among the stars, like in a Miró painting!'),
  ],
});

// ───────────────────────── Seurat : pointillisme ─────────────────────────
const SEU = (() => {
  const r = rnd(29), reg = { sky: [], water: [], grass: [], tree: [], boat: [] };
  const put = (k, x, y, cols) => reg[k].push([cols[Math.floor(r() * cols.length)], x + (r() - 0.5) * 5, y + (r() - 0.5) * 5]);
  for (let y = 24; y < 285; y += 17) for (let x = 28; x < 376; x += 17) { if (y < 122) put('sky', x, y, ['#7fb3e6', '#a8d0f0', '#f7c6d0', '#7fb3e6']); else if (y < 200) put('water', x, y, ['#2f6db5', '#4f93c9', '#5fae9e']); else put('grass', x, y, ['#4c9a2a', '#8bc34a', '#d4e157']); }
  for (let y = 40; y < 145; y += 12) for (let x = 52; x < 140; x += 12) if (((x - 95) / 45) ** 2 + ((y - 90) / 55) ** 2 < 1) put('tree', x, y, ['#1e5631', '#2e7d32', '#558b2f']);
  for (let y = 140; y < 220; y += 11) put('tree', 96, y, ['#6d4c41']);
  for (let y = 95; y < 160; y += 11) for (let x = 254; x < 300; x += 11) if ((x - 250) < (y - 90) * 0.8) put('boat', x, y, ['#ffffff', '#fff3c4']);
  for (let x = 240; x < 312; x += 11) { put('boat', x, 168, ['#c62828']); if (x > 248 && x < 304) put('boat', x, 178, ['#c62828', '#e53935']); }
  const draw = (m, k) => { const g = {}; for (const [c, x, y] of reg[k]) (g[c] ||= []).push([x, y]); return Object.entries(g).map(([c, a]) => DT(m, a, c, 13)).join(''); };
  return draw;
})();
const pSeurat = mk({
  id: 'artistes-seurat-points', artist: 'seurat', emoji: '🔵', level: 2, minutes: 40, theme: 'nature', season: 'ete',
  title: T('Un paysage en points, à la manière de Seurat', 'A landscape in dots, in the style of Seurat'),
  materials: [M.papier, M.crayon, M.cotons, M.gouache, M.assiette], fin: NONE,
  layers: [
    { z: 8, t: T('Dessine légèrement au crayon : une rive, un arbre et un petit voilier.', 'Lightly draw in pencil: a shore, a tree and a little sailboat.'),
      d: (s, m) => (m === 'fin' ? '' : P('M20 122H380M20 200Q200 195 380 205M96 220V140M250 90V160H300ZM238 168H312L302 182H248Z', 'none', s) + E(95, 90, 45, 55, 'none', s)) },
    { z: 1, t: T('Trempe un coton-tige dans le bleu. Fais des points serrés pour le ciel, avec un peu de blanc et de rose.', 'Dip a cotton swab in blue. Make close dots for the sky, with a little white and pink.'), d: (s, m) => SEU(m, 'sky') },
    { z: 1, t: T('Fais l’eau avec des points bleu foncé et des points verts.', 'Make the water with dark blue dots and green dots.'), d: (s, m) => SEU(m, 'water') },
    { z: 1, t: T('Fais l’herbe avec des points verts et jaunes.', 'Make the grass with green and yellow dots.'), d: (s, m) => SEU(m, 'grass') },
    { z: 2, t: T('Fais l’arbre : des points vert foncé, et un tronc brun.', 'Make the tree: dark green dots, and a brown trunk.'), d: (s, m) => SEU(m, 'tree') },
    { z: 3, t: T('Fais le voilier en points : une voile blanche et une coque rouge. De loin, les points se mélangent!', 'Make the sailboat in dots: a white sail and a red hull. From far away, the dots blend together!'), d: (s, m) => SEU(m, 'boat') },
  ],
});

// ───────────────────────── Frida Kahlo : autoportrait fleuri ─────────────────────────
const KAH = [
  [0, 'M110 285Q120 230 185 222H215Q280 230 290 285Z', '#2a9d8f'], [0, 'M185 195H215V225H185Z', '#d9a066'], [0, 'M152 140a48 60 0 1 0 96 0a48 60 0 1 0 -96 0', '#e0a96d'],
  [2, 'M150 140Q144 76 200 72Q256 76 250 140Q256 105 236 90Q200 70 164 90Q144 105 150 140Z', '#3b2a20'],
];
const KAH_LEAF = [[60, 60, 120, 140], [340, 60, 280, 140], [50, 210, 110, 160], [350, 210, 290, 160], [90, 28, 150, 78], [310, 28, 250, 78]];
const KAH_FL = [[162, 92, '#e63946'], [200, 74, '#ff70a6'], [238, 92, '#ffbe0b']];
const kahEl = (step) => (s, m) => KAH.filter((k) => k[0] === step).map(([, d, c]) => OF(m, s, d, c)).join('');
const pKahlo = mk({
  id: 'artistes-kahlo-autoportrait', artist: 'kahlo', emoji: '🌺', level: 2, minutes: 35, theme: 'personnages',
  title: T('Mon autoportrait fleuri, à la manière de Frida Kahlo', 'My flower self-portrait, in the style of Frida Kahlo'),
  materials: [M.papier, T('Un miroir', 'A mirror'), M.crayon, M.crayonsC, M.feutres],
  layers: [
    { z: 4, t: T('Regarde-toi dans un miroir. Dessine un ovale pour ton visage, puis ton cou et tes épaules.', 'Look in a mirror. Draw an oval for your face, then your neck and shoulders.'), d: kahEl(0) },
    { z: 6, t: T('Dessine tes yeux, tes sourcils, ton nez et ta bouche.', 'Draw your eyes, eyebrows, nose and mouth.'),
      d: (s, m) => { const k = m === 'fin' ? 'stroke="#3b2a20" stroke-width="3"' : s; return P('M172 132Q182 124 192 132Q182 140 172 132ZM208 132Q218 124 228 132Q218 140 208 132Z', m === 'fin' ? '#fff' : 'none', k) + (m === 'fin' ? C(182, 132, 4, '#3b2a20') + C(218, 132, 4, '#3b2a20') : '') + P('M170 118Q182 110 194 117M206 117Q218 110 230 118M200 140Q196 155 203 158M186 172Q200 180 214 172', 'none', k); } },
    { z: 5, t: T('Dessine tes cheveux.', 'Draw your hair.'), d: kahEl(2) },
    { z: 7, t: T('Fais une couronne de grosses fleurs sur ta tête.', 'Make a crown of big flowers on your head.'),
      d: (s, m) => KAH_FL.map(([x, y, c]) => Array.from({ length: 6 }, (_, i) => { const [a, b] = pol(x, y, 11, (i * Math.PI) / 3); return OF(m, s, `M${f0(a) - 9} ${f0(b)}a9 9 0 1 0 18 0a9 9 0 1 0 -18 0`, c); }).join('') + OF(m, s, `M${x - 6} ${y}a6 6 0 1 0 12 0a6 6 0 1 0 -12 0`, '#ffd166')).join('') },
    { z: 1, t: T('Derrière toi, dessine plein de grandes feuilles.', 'Behind you, draw lots of big leaves.'), d: (s, m) => KAH_LEAF.map(([a, b, c, e], i) => OF(m, s, lens(a, b, c, e, 26), ['#2d6a4f', '#40916c', '#52b788'][i % 3])).join('') },
    END('Colorie tout avec des couleurs vives. Ton autoportrait raconte qui tu es!', 'Colour everything with bright colours. Your self-portrait tells who you are!'),
  ],
});

// ───────────────────────── Kusama : citrouille à pois ─────────────────────────
const PUMP = 'M60 170a140 88 0 1 0 280 0a140 88 0 1 0 -280 0';
const ey = (x) => 88 * Math.sqrt(Math.max(0, 1 - ((x - 200) / 140) ** 2));
const RIBS = [-100, -60, -20, 20, 60, 100].map((o) => { const x = 200 + o; return `M${x} ${f0(170 - ey(x) + 2)}Q${f0(x + o * 0.35)} 170 ${x} ${f0(170 + ey(x) - 2)}`; }).join('');
const KDOTS = (() => { const o = []; for (const cx of [80, 120, 160, 200, 240, 280, 320]) { const h = ey(cx) - 10; for (let k = -2; k <= 2; k++) { const y = 170 + k * h * 0.38, r = 3 + 9 * (1 - Math.abs(cx - 200) / 170) * (1 - Math.abs(k) / 3.2); o.push([cx, y, r]); } } return o; })();
const pKusama = mk({
  id: 'artistes-kusama-citrouille', artist: 'kusama', emoji: '🎃', level: 1, minutes: 25, season: 'automne',
  title: T('Une citrouille à pois, à la manière de Yayoi Kusama', 'A polka-dot pumpkin, in the style of Yayoi Kusama'),
  materials: [M.papier, M.crayon, M.feutreNoir, M.feutres, M.pastels], fin: 'stroke="#111" stroke-width="4"',
  layers: [
    { z: 4, t: T('Dessine une grosse citrouille, un peu aplatie, avec une petite tige.', 'Draw a big pumpkin, a bit flat, with a little stem.'), d: (s, m) => OF(m, s, PUMP, '#ffd60a', 'stroke="#111" stroke-width="4"') + OF(m, s, 'M190 84Q186 64 196 52H208Q204 66 210 84Z', '#3a5a40', 'stroke="#111" stroke-width="4"') },
    { z: 5, t: T('Trace des côtes courbes de haut en bas, comme des quartiers.', 'Draw curved ribs from top to bottom, like segments.'), d: (s, m) => P(RIBS, 'none', m === 'fin' ? 'stroke="#111" stroke-width="4"' : s) },
    { z: 3, t: T('Colorie la citrouille en jaune vif.', 'Colour the pumpkin bright yellow.'), d: (s, m) => (m === 'fin' ? '' : P(PUMP, '#ffd60a', hl(s, m))) },
    { z: 6, t: T('Avec un feutre noir, fais des pois : gros au milieu de chaque côte, petits sur les bords.', 'With a black marker, make dots: big in the middle of each segment, small near the edges.'), d: (s, m) => KDOTS.map(([x, y, r]) => C(x, y, r, '#111', hl(s, m))).join('') },
    { z: 0, t: T('Colorie le fond en rouge, puis ajoute des pois blancs sur le fond aussi!', 'Colour the background red, then add white dots on the background too!'),
      d: (s, m) => { const a = []; for (let y = 32; y < 285; y += 34) for (let x = 36 + ((y / 34) % 2) * 17; x < 375; x += 34) if (((x - 200) / 150) ** 2 + ((y - 165) / 100) ** 2 > 1) a.push([x, y]); return R(20, 15, 360, 270, '#c1121f', hl(s, m)) + `<path d="${dotD(a)}" stroke="#fff" stroke-width="12"/>`; } },
    END('Des pois partout : ta citrouille est joyeuse, comme celles de Yayoi Kusama!', 'Dots everywhere: your pumpkin is cheerful, like Yayoi Kusama’s!'),
  ],
});

// ───────────────────────── Haring : bonshommes qui bougent ─────────────────────────
const FIG = [{ hx: 115, hy: 70, d: 'M115 92V165M115 112L80 80M115 112L150 95M115 165L90 222M115 165L145 212', c: '#e63946' }, { hx: 275, hy: 85, d: 'M275 107L270 170M272 125L235 142M272 125L312 104M270 170L240 210M270 170L308 202', c: '#3a86ff' }];
const fig = (f, inner, m) => (m === 'new' ? `<path d="${f.d}" stroke="${HL}" stroke-width="34"/>` + C(f.hx, f.hy, 25, HL) : '') + `<path d="${f.d}" stroke="#111" stroke-width="26"/><path d="${f.d}" stroke="${inner}" stroke-width="15"/>` + C(f.hx, f.hy, 19, inner, 'stroke="#111" stroke-width="6"');
const pHaring = mk({
  id: 'artistes-haring-bonshommes', artist: 'haring', emoji: '🕺', level: 1, minutes: 20, theme: 'personnages',
  title: T('Des bonshommes qui bougent, à la manière de Keith Haring', 'Moving figures, in the style of Keith Haring'),
  materials: [M.papier, M.feutreNoir, M.feutres],
  layers: [
    { t: T('Dessine un bonhomme qui danse, avec un gros contour noir. Pas besoin de visage!', 'Draw a dancing figure with a thick black outline. No face needed!'), d: (s, m) => fig(FIG[0], '#fff', m) },
    { t: T('Dessine un deuxième bonhomme qui saute.', 'Draw a second figure jumping.'), d: (s, m) => fig(FIG[1], '#fff', m) },
    { z: 6, t: T('Remplis les bonshommes de couleurs vives.', 'Fill the figures with bright colours.'), d: (s, m) => FIG.map((f) => `<path d="${f.d}" stroke="${f.c}" stroke-width="15"/>` + C(f.hx, f.hy, 16, f.c)).join('') },
    { z: 7, t: T('Ajoute de petits traits autour d’eux : ils bougent!', 'Add little lines around them: they are moving!'),
      d: (s, m) => LN(m, 'M75 55l-12 -8M70 78h-16M158 70l12 -8M165 92l14 -2M78 232l-8 10M152 226l8 8M240 70l-10 -8M232 92h-14M318 80l12 -8M326 100l14 -2M232 222l-8 10M314 214l8 8', '#111', 5) },
    { z: 0, t: T('Colorie le fond en jaune, avec un trait noir pour le sol.', 'Colour the background yellow, with a black line for the ground.'), d: (s, m) => R(20, 15, 360, 270, '#ffd23f', hl(s, m)) + LN(m, 'M30 262H370', '#111', 6) },
    END('Tes bonshommes dansent, comme ceux de Keith Haring!', 'Your figures are dancing, like Keith Haring’s!'),
  ],
});

// ───────────────────────── Warhol : quatre fois le même ─────────────────────────
const CELLS = [[110, 88], [290, 88], [110, 222], [290, 222]];
const WCOL = [['#ff4fa3', '#3a86ff', '#ffd60a', '#06d6a0'], ['#ffd60a', '#ff006e', '#8338ec', '#3a86ff'], ['#00bbf9', '#fb5607', '#ffbe0b', '#ff006e'], ['#06d6a0', '#ffbe0b', '#ff006e', '#8338ec']];
const CONE = 'M-22 0L0 50L22 0Z', SCOOP = 'M-30 0Q-34 -40 0 -42Q34 -40 30 0Q22 8 14 0Q8 12 0 2Q-8 12 -14 0Q-22 8 -30 0Z', CHERRY = 'M-7 -46a7 7 0 1 0 14 0a7 7 0 1 0 -14 0';
const ice = (x, y, a, b, c, s) => `<g transform="translate(${x} ${y})">${P(CONE, b, s)}${P(SCOOP, a, s)}${P(CHERRY, c, s)}</g>`;
const pWarhol = mk({
  id: 'artistes-warhol-quatre', artist: 'warhol', emoji: '🍦', level: 1, minutes: 25, theme: 'nourriture',
  title: T('Quatre cornets en couleurs, à la manière d’Andy Warhol', 'Four colourful cones, in the style of Andy Warhol'),
  materials: [M.papier, M.crayon, M.feutreNoir, M.feutres],
  layers: [
    { z: 6, t: T('Plie ta feuille en deux, puis encore en deux. Déplie : tu as 4 cases. Trace les plis.', 'Fold your paper in half, then in half again. Unfold: you have 4 boxes. Draw over the folds.'), d: (s, m) => (m === 'new' ? `<path d="M200 15V285M20 150H380" stroke="${HL}" stroke-width="5" stroke-dasharray="10 8"/>` : LN(m, 'M200 15V285M20 150H380', '#111', m === 'fin' ? 6 : 3)) },
    { z: 4, t: T('Dans chaque case, dessine le même cornet de crème glacée.', 'In each box, draw the same ice cream cone.'), d: (s, m) => (m === 'fin' ? '' : CELLS.map(([x, y]) => ice(x, y, 'none', 'none', 'none', s)).join('')) },
    { z: 5, t: T('Repasse les contours avec un feutre noir.', 'Go over the outlines with a black marker.'), d: (s, m) => (m === 'fin' ? '' : CELLS.map(([x, y]) => ice(x, y, 'none', 'none', 'none', m === 'new' ? s : 'stroke="#111" stroke-width="4"')).join('')) },
    { z: 1, t: T('Colorie le fond de chaque case d’une couleur différente, très vive.', 'Colour the background of each box a different, very bright colour.'), d: (s, m) => CELLS.map(([x], i) => R(x - 90, i > 1 ? 150 : 15, 180, 135, WCOL[i][0], hl(s, m))).join('') },
    { z: 3, t: T('Colorie les cornets avec des couleurs surprenantes : une boule bleue, un cornet mauve…', 'Colour the cones with surprising colours: a blue scoop, a purple cone…'), d: (s, m) => CELLS.map(([x, y], i) => ice(x, y, WCOL[i][1], WCOL[i][2], WCOL[i][3], m === 'new' ? s : 'stroke="#111" stroke-width="4"')).join('') },
    END('Le même dessin, quatre fois, en couleurs pop : comme Andy Warhol!', 'The same drawing four times in pop colours: just like Andy Warhol!'),
  ],
});

// ───────────────────────── Hokusai : la vague ─────────────────────────
const WAVE = 'M380 285V190Q340 130 260 115Q160 95 110 135Q80 165 100 195Q120 170 145 175Q125 205 150 235Q100 265 20 270V285Z';
const CLAWS = Array.from({ length: 13 }, (_, i) => { const t = i / 12, x = 255 - t * 155 + Math.sin(t * 3) * 6, y = 113 + Math.sin(t * Math.PI) * -6 + t * t * 55; return `M${f0(x)} ${f0(y)}q-6 -10 -13 -3`; }).join('');
const pHokusai = mk({
  id: 'artistes-hokusai-vague', artist: 'hokusai', emoji: '🌊', level: 2, minutes: 30, theme: 'nature',
  title: T('Une grande vague, à la manière d’Hokusai', 'A great wave, in the style of Hokusai'),
  materials: [T('Feuille beige ou blanche', 'Beige or white paper'), M.crayon, M.gouache, M.pinceau, M.cotons], paper: '#f3e9d2', fin: NONE,
  layers: [
    { z: 6, t: T('Dessine une grande vague qui monte et se courbe, comme une main avec des doigts.', 'Draw a big wave that rises and curls, like a hand with fingers.'), d: (s, m) => (m === 'fin' ? '' : P(WAVE, 'none', s)) },
    { z: 2, t: T('Au loin, tout petit, dessine une montagne pointue avec de la neige en haut.', 'Far away, very small, draw a pointy mountain with snow on top.'),
      d: (s, m) => PG([[25, 255], [55, 220], [85, 255]], m === 'fin' ? '#6b7f99' : 'none', m === 'fin' ? NONE : s) + PG([[47, 229], [55, 220], [63, 229], [58, 227], [55, 231], [51, 227]], '#fff', m === 'fin' ? NONE : s) },
    { z: 3, t: T('Peins la vague en bleu foncé. Laisse des bandes plus pâles à l’intérieur.', 'Paint the wave dark blue. Leave paler bands inside.'),
      d: (s, m) => P(WAVE, '#1d3f72', hl(s, m)) + `<path d="M370 200Q320 145 250 135M360 250Q300 180 215 165M375 275Q310 230 190 250" stroke="#5b8ec9" stroke-width="7"/>` },
    { z: 4, t: T('Peins l’écume en blanc : de petites griffes au bout de la vague.', 'Paint the foam white: little claws at the tip of the wave.'), d: (s, m) => LN(m, CLAWS + 'M260 115Q170 100 112 135', '#fff', 5) },
    { z: 5, t: T('Avec un coton-tige, fais des points blancs comme des gouttes d’eau.', 'With a cotton swab, make white dots like drops of water.'), d: (s, m) => DT(m, [[120, 105], [150, 92], [182, 85], [214, 84], [96, 120], [140, 80], [200, 70], [84, 150], [240, 92], [168, 70]], '#fff', 7) },
    { z: 1, t: T('Ajoute de longs nuages gris dans le ciel.', 'Add long grey clouds in the sky.'), d: (s, m) => LN(m, 'M40 50H170M70 66H200M240 40H350M260 56H370', '#cbbfa6', 9) },
    END('Ta vague est immense et puissante, à la manière d’Hokusai!', 'Your wave is huge and powerful, in the style of Hokusai!'),
  ],
});

// ───────────────────────── Arcimboldo : visage en fruits ─────────────────────────
const ARC = [
  [1, 'M200 122Q188 128 191 150Q182 170 200 176Q218 170 209 150Q212 128 200 122Z', '#c5d86d'], [1, 'M124 172a26 26 0 1 0 52 0a26 26 0 1 0 -52 0', '#e63946'], [1, 'M224 172a26 26 0 1 0 52 0a26 26 0 1 0 -52 0', '#e63946'],
  [2, 'M156 118a12 8 0 1 0 24 0a12 8 0 1 0 -24 0', '#6a4c93'], [2, 'M220 118a12 8 0 1 0 24 0a12 8 0 1 0 -24 0', '#6a4c93'], [2, 'M168 206Q200 240 232 206Z', '#ef476f'],
  [3, lens(110, 90, 160, 45, 18), '#55a630'], [3, lens(290, 90, 240, 45, 18), '#55a630'], [3, lens(170, 45, 230, 40, 14), '#80b918'],
  [3, [[150, 68], [164, 62], [178, 66], [158, 78], [172, 80]].map(([x, y]) => `M${x - 8} ${y}a8 8 0 1 0 16 0a8 8 0 1 0 -16 0`).join(''), '#7b2cbf'],
  [3, [[222, 66], [236, 62], [250, 68], [228, 80], [242, 80]].map(([x, y]) => `M${x - 8} ${y}a8 8 0 1 0 16 0a8 8 0 1 0 -16 0`).join(''), '#7b2cbf'],
  [4, [130, 155, 180, 205, 230, 255].map((x) => `M${x - 11} 252L${x + 11} 252L${x} 285Z`).join(''), '#f77f00'],
];
const arcEl = (step) => (s, m) => ARC.filter((a) => a[0] === step).map(([, d, c]) => OF(m, s, d, c)).join('');
const pArcimboldo = mk({
  id: 'artistes-arcimboldo-visage', artist: 'arcimboldo', emoji: '🍐', level: 2, minutes: 35, theme: 'nourriture',
  title: T('Un visage en fruits et légumes, à la manière d’Arcimboldo', 'A fruit and vegetable face, in the style of Arcimboldo'),
  materials: [M.papier, M.crayon, M.crayonsC, T('Circulaires d’épicerie (si tu veux coller)', 'Grocery flyers (if you want to glue)'), M.ciseaux, M.colle],
  layers: [
    { z: 1, t: T('Dessine légèrement au crayon un grand ovale pour la tête.', 'Lightly draw a big oval for the head.'), d: (s, m) => OF(m, s, 'M115 150a85 105 0 1 0 170 0a85 105 0 1 0 -170 0', '#efd9a0') },
    { t: T('Le nez : une poire. Les joues : deux pommes rouges.', 'The nose: a pear. The cheeks: two red apples.'), d: arcEl(1) },
    { t: T('Les yeux : deux raisins. La bouche : une tranche de melon d’eau.', 'The eyes: two grapes. The mouth: a slice of watermelon.'), d: arcEl(2) },
    { z: 6, t: T('Les cheveux : des feuilles de laitue et des grappes de raisins.', 'The hair: lettuce leaves and bunches of grapes.'), d: arcEl(3) },
    { z: 0, t: T('Le cou : une rangée de carottes.', 'The neck: a row of carrots.'), d: arcEl(4) },
    END('Colorie tout, ou colle des fruits découpés dans des circulaires. Quel drôle de visage!', 'Colour everything, or glue on fruit cut from flyers. What a funny face!'),
  ],
});

// ───────────────────────── Calder : mobile ─────────────────────────
const WIRE = (m) => (m === 'fin' ? '#222' : '#c9a227');
const pCalder = mk({
  id: 'artistes-calder-mobile', artist: 'calder', emoji: '🎐', level: 3, minutes: 40, adult: true,
  title: T('Un mobile qui bouge, à la manière de Calder', 'A moving mobile, in the style of Calder'),
  materials: [T('Carton de couleur : rouge, jaune, bleu, noir', 'Coloured card: red, yellow, blue, black'), T('Deux pailles ou deux bâtonnets', 'Two straws or two sticks'), M.ficelle, M.ruban, M.ciseaux],
  layers: [
    { only: true, t: T('Découpe des ronds et des ovales dans du carton de couleur.', 'Cut circles and ovals out of coloured card.'),
      d: () => [[90, 110, '#d62828'], [200, 110, '#1d4e89'], [310, 110, '#fcbf49'], [150, 220, '#111'], [260, 220, '#d62828']].map(([x, y, c], i) => R(x - 45, y - 45, 90, 90, c, '', 4) + (i === 2 ? E(x, y, 26, 34, 'none', `stroke="${HL}" stroke-width="4" stroke-dasharray="8 6"`) : C(x, y, 32, 'none', `stroke="${HL}" stroke-width="4" stroke-dasharray="8 6"`))).join('') },
    { reset: true, t: T('Attache une ficelle sur une paille. Ce sera le haut du mobile.', 'Tie a string onto a straw. This will be the top of the mobile.'), d: (s, m) => LN(m, 'M230 15V60', '#555', 2) + LN(m, 'M80 60H300', WIRE(m), 6) },
    { t: T('Accroche une forme rouge et une petite forme noire à la paille, avec de la ficelle et du ruban.', 'Hang a red shape and a small black shape from the straw, with string and tape.'),
      d: (s, m) => LN(m, 'M90 60V99M150 60V98', '#555', 2) + C(90, 125, 26, '#d62828', hl(s, m)) + C(150, 110, 12, '#111', hl(s, m)) },
    { t: T('Au bout de la paille, accroche une deuxième paille plus bas, avec deux autres formes.', 'At the end of the straw, hang a second straw lower down, with two more shapes.'),
      d: (s, m) => LN(m, 'M290 60V150M240 150V170M360 150V182', '#555', 2) + LN(m, 'M230 150H370', WIRE(m), 6) + C(240, 190, 20, '#1d4e89', hl(s, m)) + E(360, 200, 14, 18, '#fcbf49', hl(s, m)) },
    { t: T('Avec un adulte, glisse la ficelle du haut jusqu’à ce que tout soit en équilibre.', 'With a grown-up, slide the top string until everything balances.'), d: (s, m) => (m === 'new' ? arrow(230, 35, 200, 35) + arrow(230, 35, 262, 35) : '') },
    { t: T('Suspends ton mobile : il bouge au moindre souffle d’air!', 'Hang up your mobile: it moves with the smallest breath of air!'), d: (s, m) => LN(m, 'M52 110q-8 15 0 30M128 110q8 15 0 30M212 180q-8 12 0 24M388 190q-6 12 0 24', '#9aa0b5', 3) },
  ],
});

// ───────────────────────── Goldsworthy : mandala de nature ─────────────────────────
const ringLeaves = (R0, n, off = 0) => Array.from({ length: n }, (_, i) => { const a = (i / n) * 2 * Math.PI + off, cx = 200 + R0 * Math.cos(a), cy = 150 + R0 * Math.sin(a), tx = -Math.sin(a) * 13, ty = Math.cos(a) * 13; return lens(cx - tx, cy - ty, cx + tx, cy + ty, 8); }).join('');
const ringPts = (R0, n) => Array.from({ length: n }, (_, i) => pol(200, 150, R0, (i / n) * 2 * Math.PI));
const pGoldsworthy = mk({
  id: 'artistes-goldsworthy-mandala', artist: 'goldsworthy', emoji: '🍂', level: 1, minutes: 30, adult: true, theme: 'nature', season: 'automne',
  title: T('Un cercle de nature, à la manière d’Andy Goldsworthy', 'A nature circle, in the style of Andy Goldsworthy'),
  materials: [T('Feuilles de couleurs différentes', 'Leaves of different colours'), T('Petits cailloux', 'Small pebbles'), T('Brindilles', 'Twigs'), T('Un appareil photo (avec un adulte)', 'A camera (with a grown-up)')], paper: '#6f8f43',
  layers: [
    { only: true, t: T('Avec un adulte, va dehors. Ramasse des feuilles de couleurs différentes, des cailloux et des brindilles.', 'With a grown-up, go outside. Collect leaves of different colours, pebbles and twigs.'),
      d: (s) => [[90, 90, '#ffd60a'], [200, 80, '#f77f00'], [310, 90, '#c1121f']].map(([x, y, c]) => P(Array.from({ length: 6 }, (_, i) => lens(x - 20 + (i % 3) * 18, y - 8 + Math.floor(i / 3) * 18, x - 4 + (i % 3) * 18, y + 6 + Math.floor(i / 3) * 18, 7)).join(''), c, 'stroke="#ff5d8f" stroke-width="2"')).join('') + `<path d="${dotD([[110, 210], [125, 222], [140, 208], [118, 236], [135, 240]])}" stroke="#a6a6a6" stroke-width="14"/>` + LN('old', 'M250 200l60 30M255 225l55 -10M260 245l50 -25', '#6b4423', 5) },
    { reset: true, t: T('Pose un beau caillou au centre.', 'Place a nice pebble in the middle.'), d: (s, m) => C(200, 150, 16, '#9a9a9a', hl(s, m)) },
    { t: T('Fais un cercle de brindilles tout autour.', 'Make a circle of twigs all around.'), d: (s, m) => LN(m, Array.from({ length: 18 }, (_, i) => { const a = (i / 18) * 2 * Math.PI, [x1, y1] = pol(200, 150, 28, a), [x2, y2] = pol(200, 150, 42, a); return `M${f0(x1)} ${f0(y1)}L${f0(x2)} ${f0(y2)}`; }).join(''), '#6b4423', 4) },
    { t: T('Fais un cercle de feuilles jaunes.', 'Make a circle of yellow leaves.'), d: (s, m) => HG(m, P(ringLeaves(58, 13), '#ffd60a')) },
    { t: T('Puis un cercle de feuilles orange, et un autre de feuilles rouges.', 'Then a circle of orange leaves, and another of red leaves.'), d: (s, m) => HG(m, P(ringLeaves(80, 18, 0.15), '#f77f00') + P(ringLeaves(102, 23), '#c1121f')) },
    { t: T('Termine avec un cercle de petits cailloux. Prends une photo, puis laisse la nature reprendre ton œuvre.', 'Finish with a circle of small pebbles. Take a photo, then let nature take back your artwork.'),
      d: (s, m) => DT(m, ringPts(124, 34).filter((_, i) => i % 2), '#b5b0a5', 13) + DT(m, ringPts(124, 34).filter((_, i) => !(i % 2)), '#8d8d8d', 13) },
  ],
});

export const projects = [pRiopelle, pRiopelleOies, pFerron, pGagnon, pFortin, pLemieux, pCarr, pMorrisseau, pKenojuak, pBelcourt, pMonet, pVanGogh, pTournesols, pMatisse, pKandinsky, pKlee, pMondrian, pMiro, pSeurat, pKahlo, pKusama, pHaring, pWarhol, pHokusai, pArcimboldo, pCalder, pGoldsworthy];

// ───────────────────────── Artistes ─────────────────────────
// group: 'qc' Québec et Canada · 'pn' Premières Nations, Métis et Inuit · 'monde' Le monde
const A = (o) => ({ ...o, style: STYLE[o.projects[0]] });
export const artists = [
  A({
    id: 'riopelle', group: 'qc', name: 'Jean-Paul Riopelle', years: '1923–2002', country: T('Québec, Canada', 'Quebec, Canada'), flag: '🇨🇦',
    movement: T('Automatisme et art abstrait', 'Automatism and abstract art'),
    bio: [T('Jean-Paul Riopelle est né à Montréal.', 'Jean-Paul Riopelle was born in Montréal.'),
      T('Il peignait avec une spatule, comme un petit couteau, et mettait beaucoup de peinture épaisse.', 'He painted with a palette knife, like a little flat knife, and used lots of thick paint.'),
      T('Ses tableaux ressemblent à des mosaïques de mille couleurs.', 'His paintings look like mosaics with a thousand colours.'),
      T('Il aimait la nature, les oiseaux et surtout les oies sauvages.', 'He loved nature, birds and especially wild geese.')],
    look: [T('Combien de couleurs différentes vois-tu?', 'How many different colours can you see?'), T('Est-ce que tu reconnais quelque chose, ou seulement des formes?', 'Can you recognize something, or only shapes?'), T('Si tu touchais ce tableau, comment serait-il : lisse ou bosselé?', 'If you touched this painting, how would it feel: smooth or bumpy?')],
    famous: [{ title: T('L’Hommage à Rosa Luxemburg', 'Tribute to Rosa Luxemburg'), year: '1992', desc: T('Une immense œuvre de 40 mètres de long, faite de 30 tableaux. On y voit des silhouettes d’oies et d’objets, faites en vaporisant de la peinture autour.', 'A huge work 40 metres long, made of 30 panels. You can see shapes of geese and objects, made by spraying paint around them.') },
      { title: T('Pavane', 'Pavane'), year: '1954', desc: T('Un très grand tableau en trois parties, couvert de petites taches de couleur posées à la spatule.', 'A very big painting in three parts, covered with little patches of colour laid on with a palette knife.') }],
    quiz: [{ q: T('Avec quel outil Riopelle étalait-il souvent sa peinture?', 'What tool did Riopelle often use to spread his paint?'), choices: [T('Une spatule', 'A palette knife'), T('Une éponge de bain', 'A bath sponge'), T('Ses pieds', 'His feet')], answer: 0 },
      { q: T('Quels oiseaux voit-on dans son grand Hommage à Rosa Luxemburg?', 'Which birds can you see in his big Tribute to Rosa Luxemburg?'), choices: [T('Des perroquets', 'Parrots'), T('Des oies', 'Geese'), T('Des pingouins', 'Penguins')], answer: 1 }],
    projects: ['artistes-riopelle-mosaique', 'artistes-riopelle-oies'],
  }),
  A({
    id: 'ferron', group: 'qc', name: 'Marcelle Ferron', years: '1924–2001', country: T('Québec, Canada', 'Quebec, Canada'), flag: '🇨🇦',
    movement: T('Automatisme et vitrail', 'Automatism and stained glass'),
    bio: [T('Marcelle Ferron est née à Louiseville, au Québec.', 'Marcelle Ferron was born in Louiseville, Quebec.'),
      T('Elle peignait avec de grands gestes et des couleurs très vives.', 'She painted with big movements and very bright colours.'),
      T('Elle a fait de grandes fenêtres en verre de couleur, des verrières.', 'She made big windows of coloured glass.'),
      T('Quand le soleil passe à travers, les couleurs dansent sur le sol!', 'When the sun shines through, the colours dance on the floor!')],
    look: [T('Quelles couleurs se mélangent quand deux formes se touchent?', 'Which colours mix when two shapes touch?'), T('Est-ce que les formes sont droites ou libres?', 'Are the shapes straight or free?'), T('Comment te sentirais-tu dans une pièce éclairée par ces couleurs?', 'How would you feel in a room lit by these colours?')],
    famous: [{ title: T('Les verrières de la station de métro Champ-de-Mars', 'The stained-glass windows of Champ-de-Mars metro station'), year: T('années 1960', '1960s'), desc: T('À Montréal, de grands murs de verre aux couleurs vives laissent entrer la lumière dans le métro. Les formes sont libres, comme des taches de peinture.', 'In Montréal, big walls of brightly coloured glass let light into the metro. The shapes are free, like splashes of paint.') }],
    quiz: [{ q: T('Qu’est-ce que Marcelle Ferron a créé pour le métro de Montréal?', 'What did Marcelle Ferron create for the Montréal metro?'), choices: [T('Des verrières de couleur', 'Coloured glass windows'), T('Des wagons', 'Train cars'), T('Des escaliers', 'Stairs')], answer: 0 },
      { q: T('Qu’arrive-t-il quand le soleil passe à travers un vitrail?', 'What happens when the sun shines through stained glass?'), choices: [T('Tout devient noir', 'Everything turns black'), T('Les couleurs se projettent autour', 'The colours shine all around'), T('Le verre fond', 'The glass melts')], answer: 1 }],
    projects: ['artistes-ferron-vitrail'],
  }),
  A({
    id: 'gagnon', group: 'qc', name: 'Clarence Gagnon', years: '1881–1942', country: T('Québec, Canada', 'Quebec, Canada'), flag: '🇨🇦',
    movement: T('Paysage', 'Landscape painting'),
    bio: [T('Clarence Gagnon est né à Montréal.', 'Clarence Gagnon was born in Montréal.'),
      T('Il adorait l’hiver dans la région de Charlevoix.', 'He loved winter in the Charlevoix region.'),
      T('Il peignait de petits villages, des maisons colorées et la neige.', 'He painted little villages, colourful houses and snow.'),
      T('Dans ses tableaux, la neige a des ombres bleues et mauves.', 'In his paintings, the snow has blue and purple shadows.')],
    look: [T('De quelle couleur sont les ombres dans la neige?', 'What colour are the shadows in the snow?'), T('Est-ce que ce village a l’air froid ou chaleureux? Pourquoi?', 'Does this village look cold or cozy? Why?'), T('Quelle maison aimerais-tu habiter?', 'Which house would you like to live in?')],
    famous: [{ title: T('Les illustrations de Maria Chapdelaine', 'The illustrations for Maria Chapdelaine'), year: '1933', desc: T('Il a peint des dizaines de petites images pour un livre célèbre qui se passe au Québec : des champs, des maisons de bois, des traîneaux et beaucoup de neige.', 'He painted dozens of little pictures for a famous book set in Quebec: fields, wooden houses, sleds and lots of snow.') }],
    quiz: [{ q: T('Quelle saison Clarence Gagnon aimait-il peindre?', 'Which season did Clarence Gagnon love to paint?'), choices: [T('L’été', 'Summer'), T('L’hiver', 'Winter'), T('Aucune', 'None')], answer: 1 },
      { q: T('De quelle couleur sont souvent ses ombres dans la neige?', 'What colour are his shadows in the snow often?'), choices: [T('Bleues et mauves', 'Blue and purple'), T('Noires', 'Black'), T('Vertes', 'Green')], answer: 0 }],
    projects: ['artistes-gagnon-village'],
  }),
  A({
    id: 'fortin', group: 'qc', name: 'Marc-Aurèle Fortin', years: '1888–1970', country: T('Québec, Canada', 'Quebec, Canada'), flag: '🇨🇦',
    movement: T('Paysage', 'Landscape painting'),
    bio: [T('Marc-Aurèle Fortin est né à Sainte-Rose, qui fait aujourd’hui partie de Laval.', 'Marc-Aurèle Fortin was born in Sainte-Rose, which is now part of Laval.'),
      T('Il peignait des arbres géants, les ormes, avec des feuilles comme de gros nuages.', 'He painted giant elm trees, with leaves like big clouds.'),
      T('Sous les arbres, on voit de petites maisons et des villages.', 'Under the trees, you see little houses and villages.'),
      T('Parfois, il peignait sur un fond noir : les couleurs devenaient très brillantes.', 'Sometimes he painted on a black background: the colours became very bright.')],
    look: [T('Qu’est-ce qui est le plus grand : l’arbre ou les maisons?', 'What is bigger: the tree or the houses?'), T('Que fait le noir autour des couleurs?', 'What does the black do around the colours?'), T('Quels verts différents vois-tu?', 'How many different greens can you see?')],
    famous: [{ title: T('Les grands ormes', 'The great elms'), year: T('années 1920', '1920s'), desc: T('Des tableaux où d’énormes arbres en forme de vase touchent le ciel, au-dessus de petites maisons. Les nuages et les feuilles sont tout ronds.', 'Paintings where enormous vase-shaped trees touch the sky above little houses. The clouds and leaves are all round.') },
      { title: T('La « manière noire »', 'The “black manner”'), year: T('années 1930', '1930s'), desc: T('Il peignait d’abord sa toile en noir, puis il ajoutait les couleurs. Le noir qui reste fait comme un contour autour des formes.', 'He first painted his canvas black, then added the colours. The black left over looks like an outline around the shapes.') }],
    quiz: [{ q: T('Quels arbres Fortin aimait-il peindre?', 'Which trees did Fortin like to paint?'), choices: [T('Des palmiers', 'Palm trees'), T('Des ormes', 'Elm trees'), T('Des cactus', 'Cacti')], answer: 1 },
      { q: T('Dans sa « manière noire », de quelle couleur était le fond?', 'In his “black manner”, what colour was the background?'), choices: [T('Blanc', 'White'), T('Noir', 'Black'), T('Rose', 'Pink')], answer: 1 }],
    projects: ['artistes-fortin-orme'],
  }),
  A({
    id: 'lemieux', group: 'qc', name: 'Jean Paul Lemieux', years: '1904–1990', country: T('Québec, Canada', 'Quebec, Canada'), flag: '🇨🇦',
    movement: T('Art moderne', 'Modern art'),
    bio: [T('Jean Paul Lemieux est né à Québec.', 'Jean Paul Lemieux was born in Québec City.'),
      T('Il peignait de grands paysages presque vides, avec beaucoup de neige et de ciel.', 'He painted big, almost empty landscapes, with lots of snow and sky.'),
      T('Souvent, un personnage est debout tout seul et nous regarde.', 'Often, one person stands alone and looks at us.'),
      T('Ses tableaux sont calmes et silencieux, comme un matin d’hiver.', 'His paintings are calm and quiet, like a winter morning.')],
    look: [T('Qu’est-ce qui prend le plus de place : le ciel, la neige ou le personnage?', 'What takes up the most space: the sky, the snow or the person?'), T('À quoi pense ce personnage, selon toi?', 'What do you think this person is thinking about?'), T('Est-ce que ce tableau fait du bruit ou du silence?', 'Is this painting noisy or quiet?')],
    famous: [{ title: T('Le train de midi', 'The Noon Train'), year: '1956', desc: T('Un paysage très plat et très large. Tout au loin, un petit train traverse la plaine. Il y a beaucoup d’espace vide.', 'A very flat, very wide landscape. Far away, a little train crosses the plain. There is lots of empty space.') }],
    quiz: [{ q: T('Comment sont souvent les paysages de Lemieux?', 'What are Lemieux’s landscapes often like?'), choices: [T('Pleins de monde', 'Full of people'), T('Grands et presque vides', 'Big and almost empty'), T('Pleins de dinosaures', 'Full of dinosaurs')], answer: 1 },
      { q: T('Que voit-on tout au loin dans « Le train de midi »?', 'What do you see far away in “The Noon Train”?'), choices: [T('Un petit train', 'A little train'), T('Un avion', 'An airplane'), T('Un bateau', 'A boat')], answer: 0 }],
    projects: ['artistes-lemieux-hiver'],
  }),
  A({
    id: 'carr', group: 'qc', name: 'Emily Carr', years: '1871–1945', country: T('Colombie-Britannique, Canada', 'British Columbia, Canada'), flag: '🇨🇦',
    movement: T('Art moderne', 'Modern art'),
    bio: [T('Emily Carr est née à Victoria, en Colombie-Britannique.', 'Emily Carr was born in Victoria, British Columbia.'),
      T('Elle peignait les grandes forêts de la côte Ouest du Canada.', 'She painted the great forests of Canada’s West Coast.'),
      T('Dans ses tableaux, les arbres et le ciel semblent bouger et danser.', 'In her paintings, the trees and the sky seem to move and dance.'),
      T('Elle a aussi écrit des livres sur sa vie.', 'She also wrote books about her life.')],
    look: [T('Est-ce que les arbres sont immobiles, ou est-ce qu’ils bougent?', 'Are the trees still, or are they moving?'), T('Combien de verts différents vois-tu?', 'How many different greens can you see?'), T('Si tu entrais dans cette forêt, qu’entendrais-tu?', 'If you walked into this forest, what would you hear?')],
    famous: [{ title: T('Méprisé comme bois, aimé du ciel', 'Scorned as Timber, Beloved of the Sky'), year: '1935', desc: T('Un grand arbre mince et seul se dresse vers un ciel qui tourbillonne. Les autres arbres autour ont été coupés.', 'A tall, thin, lonely tree reaches up to a swirling sky. The other trees around it have been cut down.') }],
    quiz: [{ q: T('Qu’est-ce qu’Emily Carr aimait peindre?', 'What did Emily Carr love to paint?'), choices: [T('Les forêts de la côte Ouest', 'West Coast forests'), T('Les déserts', 'Deserts'), T('Les fusées', 'Rockets')], answer: 0 },
      { q: T('Dans ses tableaux, les arbres semblent…', 'In her paintings, the trees seem to…'), choices: [T('Dormir', 'Sleep'), T('Bouger et danser', 'Move and dance'), T('Fondre', 'Melt')], answer: 1 }],
    projects: ['artistes-carr-foret'],
  }),
  A({
    id: 'morrisseau', group: 'pn', name: 'Norval Morrisseau', years: '1932–2007', country: T('Anishinaabe, Ontario, Canada', 'Anishinaabe, Ontario, Canada'), flag: '🇨🇦',
    movement: T('Style des Terres boisées (Woodland)', 'Woodland style'),
    bio: [T('Norval Morrisseau était un artiste anishinaabe du nord de l’Ontario.', 'Norval Morrisseau was an Anishinaabe artist from northern Ontario.'),
      T('Son grand-père lui racontait les histoires et les légendes de son peuple.', 'His grandfather told him the stories and legends of his people.'),
      T('Il a inventé une façon de peindre : des contours noirs épais et des couleurs vives qui remplissent les formes.', 'He invented a way of painting: thick black outlines and bright colours filling the shapes.'),
      T('Beaucoup d’artistes autochtones ont peint à sa manière : on l’appelle le style des Terres boisées.', 'Many Indigenous artists painted his way: it is called the Woodland style.')],
    look: [T('Comment sont les lignes noires : fines ou épaisses?', 'What are the black lines like: thin or thick?'), T('Est-ce que les couleurs sont pâles ou franches?', 'Are the colours pale or bold?'), T('Quelles formes vois-tu à l’intérieur de l’animal?', 'What shapes do you see inside the animal?')],
    famous: [{ title: T('Androgynie', 'Androgyny'), year: '1983', desc: T('Une immense peinture faite de plusieurs panneaux. Des êtres et des animaux aux contours noirs sont reliés par des lignes, dans des couleurs très vives.', 'A huge painting made of several panels. Beings and animals with black outlines are joined by lines, in very bright colours.') }],
    quiz: [{ q: T('Qu’est-ce qu’on remarque tout de suite dans le style des Terres boisées?', 'What do you notice right away in the Woodland style?'), choices: [T('Des contours noirs épais', 'Thick black outlines'), T('Des photos', 'Photos'), T('Du gris partout', 'Grey everywhere')], answer: 0 },
      { q: T('Qui racontait des légendes à Norval Morrisseau quand il était petit?', 'Who told Norval Morrisseau legends when he was little?'), choices: [T('Son professeur de gym', 'His gym teacher'), T('Son grand-père', 'His grandfather'), T('Un robot', 'A robot')], answer: 1 }],
    projects: ['artistes-morrisseau-contours'],
  }),
  A({
    id: 'kenojuak', group: 'pn', name: 'Kenojuak Ashevak', years: '1927–2013', country: T('Inuk, Nunavut, Canada', 'Inuk, Nunavut, Canada'), flag: '🇨🇦',
    movement: T('Estampe inuite', 'Inuit printmaking'),
    bio: [T('Kenojuak Ashevak était une artiste inuk. Elle a vécu à Kinngait, au Nunavut.', 'Kenojuak Ashevak was an Inuk artist. She lived in Kinngait, Nunavut.'),
      T('Elle faisait des dessins, puis on les imprimait : ce sont des estampes.', 'She made drawings, and then they were printed: those are called prints.'),
      T('Elle aimait dessiner les hiboux et les oiseaux, avec de grandes plumes qui s’étalent.', 'She loved to draw owls and birds, with big spreading feathers.'),
      T('Ses formes sont simples, ses couleurs sont franches et joyeuses.', 'Her shapes are simple, and her colours are bold and joyful.')],
    look: [T('Comment sont les plumes : petites ou très grandes?', 'What are the feathers like: small or very big?'), T('Combien de couleurs y a-t-il?', 'How many colours are there?'), T('Est-ce que ce hibou a l’air content, fâché ou surpris?', 'Does this owl look happy, angry or surprised?')],
    famous: [{ title: T('Le hibou enchanté', 'The Enchanted Owl'), year: '1960', desc: T('Une estampe d’un hibou dont les longues plumes s’ouvrent derrière lui en rouge et en noir. Elle a même été imprimée sur un timbre canadien.', 'A print of an owl whose long feathers open up behind it in red and black. It was even printed on a Canadian stamp.') }],
    quiz: [{ q: T('Comment appelle-t-on une image imprimée à partir d’une plaque?', 'What do you call a picture printed from a plate?'), choices: [T('Une estampe', 'A print'), T('Une sculpture', 'A sculpture'), T('Un casse-tête', 'A puzzle')], answer: 0 },
      { q: T('Quel oiseau Kenojuak Ashevak a-t-elle rendu célèbre?', 'Which bird did Kenojuak Ashevak make famous?'), choices: [T('Un poulet', 'A chicken'), T('Un hibou', 'An owl'), T('Un flamant rose', 'A flamingo')], answer: 1 }],
    projects: ['artistes-kenojuak-estampe'],
  }),
  A({
    id: 'belcourt', group: 'pn', name: 'Christi Belcourt', years: T('née en 1966', 'born 1966'), country: T('Métisse, Canada', 'Métis, Canada'), flag: '🇨🇦',
    movement: T('Art métis inspiré du perlage', 'Métis art inspired by beadwork'),
    bio: [T('Christi Belcourt est une artiste métisse.', 'Christi Belcourt is a Métis artist.'),
      T('Elle peint des fleurs et des plantes avec des milliers de petits points.', 'She paints flowers and plants with thousands of little dots.'),
      T('Ses points ressemblent aux perles brodées par les femmes métisses.', 'Her dots look like the beads sewn by Métis women.'),
      T('Ses tableaux parlent de la nature et du respect de la Terre.', 'Her paintings are about nature and respect for the Earth.')],
    look: [T('Comment les fleurs sont-elles faites?', 'How are the flowers made?'), T('Est-ce que les points se touchent ou sont séparés?', 'Do the dots touch or are they apart?'), T('Pourquoi le fond noir rend-il les couleurs si brillantes?', 'Why does the black background make the colours so bright?')],
    famous: [{ title: T('La sagesse de l’univers', 'The Wisdom of the Universe'), year: '2014', desc: T('Un grand tableau au fond noir, rempli de fleurs, de plantes, d’oiseaux et d’insectes, tous peints en minuscules points de couleur.', 'A big painting with a black background, full of flowers, plants, birds and insects, all painted in tiny coloured dots.') }],
    quiz: [{ q: T('Avec quoi Christi Belcourt peint-elle ses fleurs?', 'What does Christi Belcourt paint her flowers with?'), choices: [T('Des milliers de petits points', 'Thousands of little dots'), T('Des lignes droites', 'Straight lines'), T('Des empreintes de mains', 'Hand prints')], answer: 0 },
      { q: T('À quoi ressemblent ses points?', 'What do her dots look like?'), choices: [T('À des perles brodées', 'Sewn beads'), T('À des flocons', 'Snowflakes'), T('À des roues', 'Wheels')], answer: 0 }],
    projects: ['artistes-belcourt-points'],
  }),
  A({
    id: 'monet', group: 'monde', name: 'Claude Monet', years: '1840–1926', country: T('France', 'France'), flag: '🇫🇷',
    movement: T('Impressionnisme', 'Impressionism'),
    bio: [T('Claude Monet est un peintre français.', 'Claude Monet was a French painter.'),
      T('Il aimait peindre dehors, pour voir la lumière changer.', 'He loved painting outdoors, to watch the light change.'),
      T('Il posait de petites touches de couleur, une à côté de l’autre.', 'He put little dabs of colour, one next to the other.'),
      T('Dans son jardin, il y avait un étang avec des nénuphars, qu’il a peint des centaines de fois.', 'In his garden there was a pond with water lilies, which he painted hundreds of times.')],
    look: [T('Est-ce le matin, le midi ou le soir? Comment le sais-tu?', 'Is it morning, noon or evening? How can you tell?'), T('Vois-tu des lignes nettes ou des petites touches?', 'Do you see sharp lines or little dabs?'), T('Recule un peu : est-ce que l’image change?', 'Step back a bit: does the picture change?')],
    famous: [{ title: T('Impression, soleil levant', 'Impression, Sunrise'), year: '1872', desc: T('Un port dans la brume du matin, avec un soleil orange et de petites barques. Ce tableau a donné son nom à l’impressionnisme.', 'A harbour in the morning mist, with an orange sun and little boats. This painting gave Impressionism its name.') },
      { title: T('Les Nymphéas', 'Water Lilies'), year: T('1897–1926', '1897–1926'), desc: T('Des dizaines de tableaux de son étang : de l’eau bleue et mauve, des reflets du ciel et des nénuphars roses.', 'Dozens of paintings of his pond: blue and purple water, reflections of the sky and pink water lilies.') }],
    quiz: [{ q: T('Où Monet aimait-il peindre?', 'Where did Monet like to paint?'), choices: [T('Dehors', 'Outdoors'), T('Dans une cave', 'In a basement'), T('Dans un avion', 'In an airplane')], answer: 0 },
      { q: T('Quelles fleurs a-t-il peintes des centaines de fois?', 'Which flowers did he paint hundreds of times?'), choices: [T('Des roses', 'Roses'), T('Des nénuphars', 'Water lilies'), T('Des pissenlits', 'Dandelions')], answer: 1 }],
    projects: ['artistes-monet-nenuphars'],
  }),
  A({
    id: 'vangogh', group: 'monde', name: 'Vincent van Gogh', years: '1853–1890', country: T('Pays-Bas', 'Netherlands'), flag: '🇳🇱',
    movement: T('Postimpressionnisme', 'Post-Impressionism'),
    bio: [T('Vincent van Gogh est né aux Pays-Bas. Il a beaucoup peint en France.', 'Vincent van Gogh was born in the Netherlands. He painted a lot in France.'),
      T('Il peignait avec de gros traits épais, qu’on peut presque toucher.', 'He painted with big thick strokes that you can almost touch.'),
      T('Ses ciels tourbillonnent et ses couleurs sont très fortes.', 'His skies swirl and his colours are very strong.'),
      T('Il a peint plus de 800 tableaux, mais il en a vendu très peu de son vivant.', 'He painted more than 800 paintings, but sold very few while he was alive.')],
    look: [T('Dans quel sens vont les traits du ciel?', 'Which way do the strokes in the sky go?'), T('Quelle couleur est la plus forte?', 'Which colour is the strongest?'), T('Est-ce une nuit calme ou une nuit qui bouge?', 'Is it a calm night or a moving night?')],
    famous: [{ title: T('La Nuit étoilée', 'The Starry Night'), year: '1889', desc: T('Un ciel de nuit qui tourbillonne, avec une lune et des étoiles entourées de cercles de lumière, au-dessus d’un petit village endormi.', 'A swirling night sky, with a moon and stars circled by rings of light, above a sleepy little village.') },
      { title: T('Les Tournesols', 'Sunflowers'), year: '1888', desc: T('Des tournesols dans un vase, peints avec des jaunes et des orange très épais.', 'Sunflowers in a vase, painted with very thick yellows and oranges.') }],
    quiz: [{ q: T('Comment sont les traits de peinture de Van Gogh?', 'What are Van Gogh’s paint strokes like?'), choices: [T('Épais et visibles', 'Thick and visible'), T('Invisibles', 'Invisible'), T('Tout carrés', 'All square')], answer: 0 },
      { q: T('Quelles fleurs jaunes a-t-il peintes dans un vase?', 'Which yellow flowers did he paint in a vase?'), choices: [T('Des tulipes', 'Tulips'), T('Des tournesols', 'Sunflowers'), T('Des marguerites', 'Daisies')], answer: 1 }],
    projects: ['artistes-vangogh-nuit', 'artistes-vangogh-tournesols'],
  }),
  A({
    id: 'matisse', group: 'monde', name: 'Henri Matisse', years: '1869–1954', country: T('France', 'France'), flag: '🇫🇷',
    movement: T('Fauvisme et papiers découpés', 'Fauvism and paper cut-outs'),
    bio: [T('Henri Matisse est un peintre français qui aimait les couleurs très vives.', 'Henri Matisse was a French painter who loved very bright colours.'),
      T('Quand il est devenu âgé et malade, il ne pouvait plus beaucoup peindre debout.', 'When he became old and sick, he could not paint standing up very much.'),
      T('Alors, il a « dessiné avec des ciseaux » : il découpait des formes dans du papier peint à la gouache.', 'So he “drew with scissors”: he cut shapes out of paper painted with gouache.'),
      T('Ses assistants collaient les formes là où il le voulait.', 'His assistants stuck the shapes where he wanted them.')],
    look: [T('Quelles formes reconnais-tu? Des feuilles, des algues, des étoiles?', 'Which shapes do you recognize? Leaves, seaweed, stars?'), T('Est-ce que les bords des formes sont droits ou ondulés?', 'Are the edges of the shapes straight or wavy?'), T('Quelle forme a l’air de danser?', 'Which shape looks like it is dancing?')],
    famous: [{ title: T('L’Escargot', 'The Snail'), year: '1953', desc: T('De grands morceaux de papier de couleur placés en spirale, comme la coquille d’un escargot.', 'Big pieces of coloured paper arranged in a spiral, like a snail’s shell.') },
      { title: T('Jazz', 'Jazz'), year: '1947', desc: T('Un livre plein d’images en papiers découpés : cirque, étoiles, formes qui sautent.', 'A book full of paper cut-out pictures: circus, stars, jumping shapes.') }],
    quiz: [{ q: T('Avec quel outil Matisse « dessinait-il » à la fin de sa vie?', 'What tool did Matisse “draw” with at the end of his life?'), choices: [T('Des ciseaux', 'Scissors'), T('Un marteau', 'A hammer'), T('Une fourchette', 'A fork')], answer: 0 },
      { q: T('Quelle forme voit-on dans « L’Escargot »?', 'What shape do you see in “The Snail”?'), choices: [T('Une spirale', 'A spiral'), T('Un carré parfait', 'A perfect square'), T('Une ligne droite', 'A straight line')], answer: 0 }],
    projects: ['artistes-matisse-decoupage'],
  }),
  A({
    id: 'kandinsky', group: 'monde', name: 'Wassily Kandinsky', years: '1866–1944', country: T('Russie', 'Russia'), flag: '🇷🇺',
    movement: T('Art abstrait', 'Abstract art'),
    bio: [T('Wassily Kandinsky est né à Moscou, en Russie.', 'Wassily Kandinsky was born in Moscow, Russia.'),
      T('Il est l’un des premiers à peindre des tableaux abstraits : des formes et des couleurs, sans objets.', 'He was one of the first to paint abstract pictures: shapes and colours, without objects.'),
      T('Il disait que les couleurs font de la musique, comme des notes.', 'He said colours make music, like notes.'),
      T('Il adorait les cercles, les lignes et les triangles.', 'He loved circles, lines and triangles.')],
    look: [T('Si ce tableau était une musique, serait-elle douce ou forte?', 'If this painting were music, would it be soft or loud?'), T('Quelles couleurs vont bien ensemble?', 'Which colours go well together?'), T('Quel carré préfères-tu? Pourquoi?', 'Which square do you like best? Why?')],
    famous: [{ title: T('Carrés avec cercles concentriques', 'Squares with Concentric Circles'), year: '1913', desc: T('Une petite étude de couleurs : des carrés, et dans chacun, des cercles de plus en plus grands, chaque anneau d’une couleur différente.', 'A small colour study: squares, and in each one, bigger and bigger circles, each ring a different colour.') }],
    quiz: [{ q: T('Qu’est-ce qu’un tableau abstrait?', 'What is an abstract painting?'), choices: [T('Des formes et des couleurs, sans objets à reconnaître', 'Shapes and colours, with no objects to recognize'), T('Une photo', 'A photo'), T('Un portrait de chat', 'A cat portrait')], answer: 0 },
      { q: T('Selon Kandinsky, les couleurs ressemblent à…', 'According to Kandinsky, colours are like…'), choices: [T('De la musique', 'Music'), T('Des cailloux', 'Pebbles'), T('De la soupe', 'Soup')], answer: 0 }],
    projects: ['artistes-kandinsky-cercles'],
  }),
  A({
    id: 'klee', group: 'monde', name: 'Paul Klee', years: '1879–1940', country: T('Suisse', 'Switzerland'), flag: '🇨🇭',
    movement: T('Art moderne', 'Modern art'),
    bio: [T('Paul Klee est né en Suisse. Il a aussi vécu en Allemagne.', 'Paul Klee was born in Switzerland. He also lived in Germany.'),
      T('Il jouait du violon et aimait autant la musique que la peinture.', 'He played the violin and loved music as much as painting.'),
      T('Il construisait ses images avec de petits carrés et des formes simples, comme un casse-tête.', 'He built his pictures with little squares and simple shapes, like a puzzle.'),
      T('Il disait que dessiner, c’est « emmener une ligne en promenade ».', 'He said that drawing is “taking a line for a walk”.')],
    look: [T('Combien de carrés et de triangles peux-tu compter?', 'How many squares and triangles can you count?'), T('Quelles couleurs sont chaudes, et lesquelles sont froides?', 'Which colours are warm, and which are cool?'), T('Qui pourrait habiter ce château?', 'Who might live in this castle?')],
    famous: [{ title: T('Château et soleil', 'Castle and Sun'), year: '1928', desc: T('Un château fait seulement de carrés, de rectangles et de triangles de couleurs chaudes, avec un soleil rouge tout rond.', 'A castle made only of warm-coloured squares, rectangles and triangles, with a round red sun.') },
      { title: T('Senecio', 'Senecio'), year: '1922', desc: T('Un visage tout rond, orange, fait de formes géométriques, avec de grands yeux.', 'A round orange face made of geometric shapes, with big eyes.') }],
    quiz: [{ q: T('Avec quoi Paul Klee construisait-il souvent ses images?', 'What did Paul Klee often build his pictures with?'), choices: [T('De petits carrés de couleur', 'Little coloured squares'), T('Des photos', 'Photos'), T('Du sable', 'Sand')], answer: 0 },
      { q: T('Quel instrument jouait-il?', 'What instrument did he play?'), choices: [T('Le tambour', 'The drum'), T('Le violon', 'The violin'), T('La trompette', 'The trumpet')], answer: 1 }],
    projects: ['artistes-klee-chateau'],
  }),
  A({
    id: 'mondrian', group: 'monde', name: 'Piet Mondrian', years: '1872–1944', country: T('Pays-Bas', 'Netherlands'), flag: '🇳🇱',
    movement: T('De Stijl (néoplasticisme)', 'De Stijl (Neoplasticism)'),
    bio: [T('Piet Mondrian est né aux Pays-Bas.', 'Piet Mondrian was born in the Netherlands.'),
      T('Au début, il peignait des arbres et des paysages.', 'At first, he painted trees and landscapes.'),
      T('Puis il a tout simplifié : des lignes noires droites et trois couleurs, le rouge, le jaune et le bleu.', 'Then he simplified everything: straight black lines and three colours, red, yellow and blue.'),
      T('Il aimait aussi beaucoup la musique jazz et la danse.', 'He also loved jazz music and dancing.')],
    look: [T('Quelles sont les trois couleurs?', 'What are the three colours?'), T('Est-ce que tous les rectangles ont la même taille?', 'Are all the rectangles the same size?'), T('Si tu enlevais le rouge, est-ce que ce serait aussi beau?', 'If you took away the red, would it still look as good?')],
    famous: [{ title: T('Composition en rouge, jaune et bleu', 'Composition with Red, Yellow and Blue'), year: '1930', desc: T('Un grand carré rouge, des lignes noires épaisses et de petits rectangles jaune et bleu dans les coins.', 'A big red square, thick black lines, and small yellow and blue rectangles in the corners.') },
      { title: T('Broadway Boogie-Woogie', 'Broadway Boogie Woogie'), year: '1942–1943', desc: T('Des lignes jaunes remplies de petits carrés de couleur, comme les rues et les lumières d’une grande ville.', 'Yellow lines full of little coloured squares, like the streets and lights of a big city.') }],
    quiz: [{ q: T('Quelles couleurs Mondrian utilisait-il avec le noir et le blanc?', 'Which colours did Mondrian use with black and white?'), choices: [T('Rouge, jaune et bleu', 'Red, yellow and blue'), T('Rose et brun', 'Pink and brown'), T('Vert et mauve', 'Green and purple')], answer: 0 },
      { q: T('Comment sont ses lignes?', 'What are his lines like?'), choices: [T('Droites', 'Straight'), T('En zigzag', 'Zigzag'), T('En spirale', 'Spiral')], answer: 0 }],
    projects: ['artistes-mondrian-grille'],
  }),
  A({
    id: 'miro', group: 'monde', name: 'Joan Miró', years: '1893–1983', country: T('Espagne (Catalogne)', 'Spain (Catalonia)'), flag: '🇪🇸',
    movement: T('Surréalisme', 'Surrealism'),
    bio: [T('Joan Miró est né à Barcelone, en Espagne.', 'Joan Miró was born in Barcelona, Spain.'),
      T('Il dessinait des créatures étranges, des étoiles, des lunes et des yeux.', 'He drew strange creatures, stars, moons and eyes.'),
      T('Ses lignes noires sont fines et ses couleurs sont vives : rouge, jaune, bleu, vert.', 'His black lines are thin and his colours are bright: red, yellow, blue, green.'),
      T('Ses tableaux ressemblent à des rêves joyeux.', 'His paintings look like happy dreams.')],
    look: [T('Quelles créatures imaginaires vois-tu?', 'What imaginary creatures can you see?'), T('Où sont les étoiles?', 'Where are the stars?'), T('Invente un nom pour ce tableau!', 'Make up a name for this painting!')],
    famous: [{ title: T('Le Carnaval d’Arlequin', 'The Harlequin’s Carnival'), year: '1924–1925', desc: T('Une fête pleine de petites créatures bizarres, de poissons, d’insectes et d’instruments de musique qui flottent partout.', 'A party full of funny little creatures, fish, insects and musical instruments floating everywhere.') }],
    quiz: [{ q: T('À quoi ressemblent les tableaux de Miró?', 'What do Miró’s paintings look like?'), choices: [T('À des rêves joyeux', 'Happy dreams'), T('À des photos de ville', 'City photos'), T('À des cartes routières', 'Road maps')], answer: 0 },
      { q: T('Qu’est-ce que Miró aimait dessiner?', 'What did Miró like to draw?'), choices: [T('Des étoiles et des créatures', 'Stars and creatures'), T('Des voitures de course', 'Race cars'), T('Des maisons réalistes', 'Realistic houses')], answer: 0 }],
    projects: ['artistes-miro-creatures'],
  }),
  A({
    id: 'seurat', group: 'monde', name: 'Georges Seurat', years: '1859–1891', country: T('France', 'France'), flag: '🇫🇷',
    movement: T('Pointillisme', 'Pointillism'),
    bio: [T('Georges Seurat est un peintre français.', 'Georges Seurat was a French painter.'),
      T('Il peignait avec des milliers de petits points de couleur pure.', 'He painted with thousands of little dots of pure colour.'),
      T('De près, on voit les points. De loin, nos yeux les mélangent!', 'Up close, you see the dots. From far away, your eyes mix them together!'),
      T('Cette façon de peindre s’appelle le pointillisme.', 'This way of painting is called pointillism.')],
    look: [T('Approche-toi, puis recule : que remarques-tu?', 'Come closer, then step back: what do you notice?'), T('Quelles couleurs vois-tu dans le ciel?', 'What colours do you see in the sky?'), T('Combien de temps faut-il pour faire tous ces points, selon toi?', 'How long do you think it takes to make all these dots?')],
    famous: [{ title: T('Un dimanche après-midi à l’île de la Grande Jatte', 'A Sunday Afternoon on the Island of La Grande Jatte'), year: '1884–1886', desc: T('Des gens se reposent au bord de l’eau, avec des parasols et des chapeaux. Tout le tableau est fait de petits points. Il a mis environ deux ans à le peindre.', 'People relax by the water, with parasols and hats. The whole painting is made of little dots. It took him about two years to paint.') }],
    quiz: [{ q: T('Avec quoi Seurat peignait-il?', 'What did Seurat paint with?'), choices: [T('Des petits points', 'Little dots'), T('De grandes vagues', 'Big waves'), T('Des lettres', 'Letters')], answer: 0 },
      { q: T('Comment s’appelle cette façon de peindre?', 'What is this way of painting called?'), choices: [T('Le pointillisme', 'Pointillism'), T('Le gribouillisme', 'Scribblism'), T('Le cubisme', 'Cubism')], answer: 0 }],
    projects: ['artistes-seurat-points'],
  }),
  A({
    id: 'kahlo', group: 'monde', name: 'Frida Kahlo', years: '1907–1954', country: T('Mexique', 'Mexico'), flag: '🇲🇽',
    movement: T('Art mexicain moderne', 'Modern Mexican art'),
    bio: [T('Frida Kahlo est une peintre mexicaine.', 'Frida Kahlo was a Mexican painter.'),
      T('Elle a peint beaucoup d’autoportraits : des tableaux d’elle-même.', 'She painted many self-portraits: pictures of herself.'),
      T('Elle portait souvent des fleurs dans les cheveux et des robes colorées de son pays.', 'She often wore flowers in her hair and colourful dresses from her country.'),
      T('Dans ses tableaux, il y a des plantes, des singes, des perroquets et des feuilles.', 'In her paintings there are plants, monkeys, parrots and leaves.')],
    look: [T('Qu’est-ce que les fleurs et les feuilles nous disent sur cette personne?', 'What do the flowers and leaves tell us about this person?'), T('Quelles couleurs vives vois-tu?', 'Which bright colours can you see?'), T('Si tu faisais ton portrait, quels objets mettrais-tu autour de toi?', 'If you made your portrait, what things would you put around you?')],
    famous: [{ title: T('Autoportrait au collier d’épines et colibri', 'Self-Portrait with Thorn Necklace and Hummingbird'), year: '1940', desc: T('Frida se peint de face, avec de grandes feuilles vertes derrière elle, un singe et un chat sur ses épaules, et des papillons dans les cheveux.', 'Frida paints herself facing us, with big green leaves behind her, a monkey and a cat on her shoulders, and butterflies in her hair.') }],
    quiz: [{ q: T('Comment appelle-t-on un portrait de soi-même?', 'What do you call a portrait of yourself?'), choices: [T('Un autoportrait', 'A self-portrait'), T('Un paysage', 'A landscape'), T('Une nature morte', 'A still life')], answer: 0 },
      { q: T('De quel pays venait Frida Kahlo?', 'Which country was Frida Kahlo from?'), choices: [T('Du Mexique', 'Mexico'), T('Du Japon', 'Japan'), T('De la Suisse', 'Switzerland')], answer: 0 }],
    projects: ['artistes-kahlo-autoportrait'],
  }),
  A({
    id: 'kusama', group: 'monde', name: 'Yayoi Kusama', years: T('née en 1929', 'born 1929'), country: T('Japon', 'Japan'), flag: '🇯🇵',
    movement: T('Art contemporain', 'Contemporary art'),
    bio: [T('Yayoi Kusama est une artiste japonaise.', 'Yayoi Kusama is a Japanese artist.'),
      T('Depuis qu’elle est petite, elle met des pois partout!', 'Ever since she was little, she has put polka dots everywhere!'),
      T('Elle a fait des citrouilles géantes à pois, et des salles pleines de miroirs et de lumières.', 'She has made giant polka-dot pumpkins, and rooms full of mirrors and lights.'),
      T('Elle continue de créer, même à plus de 90 ans.', 'She keeps creating, even past 90 years old.')],
    look: [T('Les pois sont-ils tous de la même taille?', 'Are all the dots the same size?'), T('Où sont les plus gros pois?', 'Where are the biggest dots?'), T('Comment te sens-tu en regardant tous ces pois?', 'How do you feel looking at all these dots?')],
    famous: [{ title: T('Citrouille', 'Pumpkin'), year: '1994', desc: T('Une grosse citrouille jaune à pois noirs, posée sur un quai au bord de la mer, sur une île au Japon.', 'A big yellow pumpkin with black dots, sitting on a pier by the sea, on an island in Japan.') }],
    quiz: [{ q: T('Qu’est-ce que Yayoi Kusama met partout?', 'What does Yayoi Kusama put everywhere?'), choices: [T('Des pois', 'Polka dots'), T('Des rayures', 'Stripes'), T('Des clous', 'Nails')], answer: 0 },
      { q: T('Quel légume géant a-t-elle rendu célèbre?', 'Which giant vegetable did she make famous?'), choices: [T('Une carotte', 'A carrot'), T('Une citrouille', 'A pumpkin'), T('Un brocoli', 'A broccoli')], answer: 1 }],
    projects: ['artistes-kusama-citrouille'],
  }),
  A({
    id: 'haring', group: 'monde', name: 'Keith Haring', years: '1958–1990', country: T('États-Unis', 'United States'), flag: '🇺🇸',
    movement: T('Pop art et art de rue', 'Pop art and street art'),
    bio: [T('Keith Haring est un artiste américain.', 'Keith Haring was an American artist.'),
      T('Il dessinait des bonshommes simples, avec de gros contours et sans visage.', 'He drew simple figures, with thick outlines and no faces.'),
      T('Ses bonshommes dansent, sautent et s’amusent, avec de petits traits pour montrer qu’ils bougent.', 'His figures dance, jump and play, with little lines to show they are moving.'),
      T('Il voulait que l’art soit pour tout le monde, alors il dessinait aussi dans la rue et le métro.', 'He wanted art to be for everyone, so he also drew in the street and the subway.')],
    look: [T('Qu’est-ce que les bonshommes sont en train de faire?', 'What are the figures doing?'), T('À quoi servent les petits traits autour d’eux?', 'What are the little lines around them for?'), T('Pourquoi n’ont-ils pas besoin de visage pour montrer leur joie?', 'Why don’t they need a face to show they are happy?')],
    famous: [{ title: T('Les dessins du métro', 'The subway drawings'), year: '1980–1985', desc: T('À New York, il dessinait à la craie blanche sur les grands panneaux noirs vides du métro : des bonshommes, des chiens et des bébés qui brillent.', 'In New York, he drew in white chalk on the empty black advertising panels in the subway: figures, dogs and glowing babies.') }],
    quiz: [{ q: T('Comment sont les bonshommes de Keith Haring?', 'What are Keith Haring’s figures like?'), choices: [T('Simples, avec de gros contours', 'Simple, with thick outlines'), T('Très détaillés', 'Very detailed'), T('Invisibles', 'Invisible')], answer: 0 },
      { q: T('Où dessinait-il à la craie?', 'Where did he draw in chalk?'), choices: [T('Dans le métro', 'In the subway'), T('Sur la lune', 'On the moon'), T('Sous l’eau', 'Under water')], answer: 0 }],
    projects: ['artistes-haring-bonshommes'],
  }),
  A({
    id: 'warhol', group: 'monde', name: 'Andy Warhol', years: '1928–1987', country: T('États-Unis', 'United States'), flag: '🇺🇸',
    movement: T('Pop art', 'Pop art'),
    bio: [T('Andy Warhol est un artiste américain.', 'Andy Warhol was an American artist.'),
      T('Il faisait de l’art avec des objets de tous les jours, comme des boîtes de soupe.', 'He made art out of everyday things, like soup cans.'),
      T('Il répétait souvent la même image plusieurs fois, avec des couleurs différentes.', 'He often repeated the same picture several times, in different colours.'),
      T('Ses couleurs sont « pop » : très vives et surprenantes.', 'His colours are “pop”: very bright and surprising.')],
    look: [T('Qu’est-ce qui est pareil dans chaque case? Qu’est-ce qui change?', 'What is the same in each box? What changes?'), T('Quelle case préfères-tu?', 'Which box do you like best?'), T('Est-ce que ces couleurs sont naturelles ou inventées?', 'Are these colours natural or made up?')],
    famous: [{ title: T('Les boîtes de soupe Campbell', 'Campbell’s Soup Cans'), year: '1962', desc: T('Trente-deux tableaux de boîtes de soupe, presque pareils, chacun avec une saveur différente.', 'Thirty-two paintings of soup cans, almost the same, each with a different flavour.') }],
    quiz: [{ q: T('Qu’est-ce que Warhol faisait souvent avec une image?', 'What did Warhol often do with a picture?'), choices: [T('Il la répétait en couleurs différentes', 'He repeated it in different colours'), T('Il la déchirait', 'He tore it up'), T('Il la cachait', 'He hid it')], answer: 0 },
      { q: T('Quel objet de tous les jours a-t-il peint?', 'Which everyday object did he paint?'), choices: [T('Des boîtes de soupe', 'Soup cans'), T('Des brosses à dents', 'Toothbrushes'), T('Des parapluies', 'Umbrellas')], answer: 0 }],
    projects: ['artistes-warhol-quatre'],
  }),
  A({
    id: 'hokusai', group: 'monde', name: 'Katsushika Hokusai', years: '1760–1849', country: T('Japon', 'Japan'), flag: '🇯🇵',
    movement: T('Ukiyo-e (estampe japonaise)', 'Ukiyo-e (Japanese woodblock prints)'),
    bio: [T('Hokusai est un artiste japonais qui a vécu il y a très longtemps.', 'Hokusai was a Japanese artist who lived a very long time ago.'),
      T('Il faisait des estampes : des images imprimées avec des planches de bois gravées.', 'He made prints: pictures printed with carved wooden blocks.'),
      T('Il a dessiné toute sa vie, des milliers d’images!', 'He drew his whole life, thousands of pictures!'),
      T('Il aimait beaucoup le mont Fuji, une grande montagne du Japon.', 'He loved Mount Fuji, a big mountain in Japan.')],
    look: [T('À quoi ressemble le bout de la vague?', 'What does the tip of the wave look like?'), T('Qu’est-ce qui est grand, et qu’est-ce qui est petit?', 'What is big, and what is small?'), T('Si tu étais dans ce paysage, aurais-tu peur?', 'If you were in this landscape, would you be scared?')],
    famous: [{ title: T('La Grande Vague de Kanagawa', 'The Great Wave off Kanagawa'), year: T('vers 1831', 'about 1831'), desc: T('Une immense vague bleue se courbe au-dessus de petits bateaux. Son écume ressemble à des griffes. Tout au fond, le mont Fuji paraît minuscule.', 'A huge blue wave curls over little boats. Its foam looks like claws. Far behind, Mount Fuji looks tiny.') }],
    quiz: [{ q: T('Avec quoi imprimait-on les estampes d’Hokusai?', 'What were Hokusai’s prints made with?'), choices: [T('Des planches de bois gravées', 'Carved wooden blocks'), T('Un ordinateur', 'A computer'), T('Des pommes de terre', 'Potatoes')], answer: 0 },
      { q: T('À quoi ressemble l’écume de sa grande vague?', 'What does the foam of his great wave look like?'), choices: [T('À des griffes', 'Claws'), T('À des fleurs', 'Flowers'), T('À des ballons', 'Balloons')], answer: 0 }],
    projects: ['artistes-hokusai-vague'],
  }),
  A({
    id: 'arcimboldo', group: 'monde', name: 'Giuseppe Arcimboldo', years: T('vers 1526–1593', 'about 1526–1593'), country: T('Italie', 'Italy'), flag: '🇮🇹',
    movement: T('Renaissance (maniérisme)', 'Renaissance (Mannerism)'),
    bio: [T('Giuseppe Arcimboldo est un peintre italien qui a vécu il y a plus de 400 ans.', 'Giuseppe Arcimboldo was an Italian painter who lived more than 400 years ago.'),
      T('Il travaillait pour des empereurs, à Vienne et à Prague.', 'He worked for emperors, in Vienna and Prague.'),
      T('Il peignait des visages faits de fruits, de légumes, de fleurs ou même de poissons!', 'He painted faces made of fruit, vegetables, flowers or even fish!'),
      T('De loin, on voit une tête. De près, on voit tout ce qu’il y a dedans.', 'From far away, you see a head. Up close, you see everything inside it.')],
    look: [T('Quel fruit fait le nez?', 'Which fruit makes the nose?'), T('Combien de fruits et légumes peux-tu nommer?', 'How many fruits and vegetables can you name?'), T('Est-ce que ce visage est drôle, étrange ou les deux?', 'Is this face funny, strange or both?')],
    famous: [{ title: T('Vertumne', 'Vertumnus'), year: '1590–1591', desc: T('Le portrait d’un empereur fait entièrement de fruits, de légumes et de fleurs : une poire pour le nez, des pommes pour les joues.', 'A portrait of an emperor made entirely of fruit, vegetables and flowers: a pear for the nose, apples for the cheeks.') },
      { title: T('Les Quatre Saisons', 'The Four Seasons'), year: '1563', desc: T('Quatre têtes, une pour chaque saison : l’été en fruits, l’hiver en bois et en racines.', 'Four heads, one for each season: summer made of fruit, winter of wood and roots.') }],
    quiz: [{ q: T('Avec quoi Arcimboldo faisait-il ses visages?', 'What did Arcimboldo make his faces out of?'), choices: [T('Des fruits et des légumes', 'Fruit and vegetables'), T('Des blocs de construction', 'Building blocks'), T('Des nuages', 'Clouds')], answer: 0 },
      { q: T('Que voit-on quand on regarde de très près?', 'What do you see when you look very closely?'), choices: [T('Tous les fruits et légumes', 'All the fruits and vegetables'), T('Rien du tout', 'Nothing at all'), T('Une carte du monde', 'A world map')], answer: 0 }],
    projects: ['artistes-arcimboldo-visage'],
  }),
  A({
    id: 'calder', group: 'monde', name: 'Alexander Calder', years: '1898–1976', country: T('États-Unis', 'United States'), flag: '🇺🇸',
    movement: T('Sculpture qui bouge (art cinétique)', 'Moving sculpture (kinetic art)'),
    bio: [T('Alexander Calder est un sculpteur américain.', 'Alexander Calder was an American sculptor.'),
      T('Il a inventé les mobiles : des sculptures suspendues qui bougent avec l’air.', 'He invented mobiles: hanging sculptures that move with the air.'),
      T('Il utilisait du fil de fer et des formes de métal peintes en rouge, noir, jaune et bleu.', 'He used wire and metal shapes painted red, black, yellow and blue.'),
      T('Il a aussi fait une grande sculpture pour l’Expo 67, à Montréal!', 'He also made a big sculpture for Expo 67 in Montréal!')],
    look: [T('Qu’est-ce qui tient tout en équilibre?', 'What keeps everything balanced?'), T('Si tu souffles, quelle forme bougera le plus?', 'If you blow, which shape will move the most?'), T('Est-ce que les formes sont grosses ou petites des deux côtés?', 'Are the shapes big or small on each side?')],
    famous: [{ title: T('L’Homme (Trois disques)', 'Man (Three Disks)'), year: '1967', desc: T('Une immense sculpture en acier, faite pour l’Expo 67. On peut encore la voir au parc Jean-Drapeau, à Montréal.', 'A huge steel sculpture made for Expo 67. You can still see it in Parc Jean-Drapeau in Montréal.') },
      { title: T('Le Cirque Calder', 'Calder’s Circus'), year: '1926–1931', desc: T('Un petit cirque fait de fil de fer, de bouts de tissu et de liège, avec des acrobates et des animaux qui bougent vraiment.', 'A little circus made of wire, bits of cloth and cork, with acrobats and animals that really move.') }],
    quiz: [{ q: T('Qu’est-ce qu’un mobile?', 'What is a mobile?'), choices: [T('Une sculpture suspendue qui bouge', 'A hanging sculpture that moves'), T('Un téléphone', 'A phone'), T('Une voiture', 'A car')], answer: 0 },
      { q: T('Dans quelle ville peut-on voir sa grande sculpture L’Homme?', 'In which city can you see his big sculpture Man?'), choices: [T('Montréal', 'Montréal'), T('Paris', 'Paris'), T('Tokyo', 'Tokyo')], answer: 0 }],
    projects: ['artistes-calder-mobile'],
  }),
  A({
    id: 'goldsworthy', group: 'monde', name: 'Andy Goldsworthy', years: T('né en 1956', 'born 1956'), country: T('Royaume-Uni', 'United Kingdom'), flag: '🇬🇧',
    movement: T('Land art (art avec la nature)', 'Land art (art with nature)'),
    bio: [T('Andy Goldsworthy est un artiste anglais qui vit en Écosse.', 'Andy Goldsworthy is an English artist who lives in Scotland.'),
      T('Il crée dehors, avec ce qu’il trouve : des feuilles, des cailloux, des branches, de la glace.', 'He creates outdoors, with what he finds: leaves, pebbles, branches, ice.'),
      T('Souvent, le vent, la pluie ou le soleil défont son œuvre. Ça fait partie de l’art!', 'Often the wind, rain or sun undo his work. That is part of the art!'),
      T('Il prend des photos pour se souvenir de ses créations.', 'He takes photos to remember his creations.')],
    look: [T('Quelles couleurs de feuilles vois-tu, du centre vers le bord?', 'Which leaf colours do you see, from the centre to the edge?'), T('Combien de temps cette œuvre restera-t-elle dehors, selon toi?', 'How long do you think this artwork will stay outside?'), T('Quels trésors de la nature trouverais-tu près de chez toi?', 'What nature treasures could you find near your home?')],
    famous: [{ title: T('Le mur de Storm King', 'Storm King Wall'), year: '1997–1998', desc: T('Un très long mur de pierres sèches qui serpente entre les arbres comme un serpent, puis entre dans un étang, aux États-Unis.', 'A very long dry-stone wall that winds between the trees like a snake, then goes into a pond, in the United States.') }],
    quiz: [{ q: T('Avec quoi Andy Goldsworthy fait-il ses œuvres?', 'What does Andy Goldsworthy make his works with?'), choices: [T('Avec la nature : feuilles, cailloux, glace', 'With nature: leaves, pebbles, ice'), T('Avec du plastique', 'With plastic'), T('Avec des écrans', 'With screens')], answer: 0 },
      { q: T('Pourquoi prend-il des photos de ses œuvres?', 'Why does he take photos of his works?'), choices: [T('Parce que la nature finit par les défaire', 'Because nature eventually undoes them'), T('Pour les vendre au marché', 'To sell them at the market'), T('Pour rien', 'For no reason')], answer: 0 }],
    projects: ['artistes-goldsworthy-mandala'],
  }),
];
