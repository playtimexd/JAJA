// la-tuque-magique — storybook (see docs/LIVRES.md)
const P = 'ltm';
// ---- shared picture helpers (flat picture-book style) ----
const O = '#3a3f55';
let _g = 0;
const uid = () => `${P}${++_g}`;
const svg = (b) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><g stroke="#3a3f55" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${b}</g></svg>`;
const sw_ = (sw) => (sw === 3 ? "" : sw ? ` stroke-width="${sw}"` : " stroke=\"none\"");
const sky = (a, b) => { const id = uid(); return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="400" height="300" fill="url(#${id})"/>`; };
const ell = (cx, cy, rx, ry, f, sw = 3, ex = "") => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"${sw_(sw)}${ex ? " " + ex : ""}/>`;
const circ = (cx, cy, r, f, sw = 3) => ell(cx, cy, r, r, f, sw);
const rect = (x, y, w, h, f, sw = 3, r = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"${r ? ` rx="${r}"` : ""} fill="${f}"${sw_(sw)}/>`;
const path = (d, f = "none", sw = 3, ex = "") => `<path d="${d}" fill="${f}"${sw_(sw)}${ex ? " " + ex : ""}/>`;
const line = (x1, y1, x2, y2, c = O, sw = 3) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${c === O ? "" : ` stroke="${c}"`}${sw_(sw)}/>`;
const G = (x, y, s, inner, flip = false, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})">${inner}</g>`;
const rnd = (i) => { const s = Math.sin(i * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
const cloud = (x, y, s = 1, c = '#fff') => G(x, y, s, `<g fill="${c}"><ellipse cx="0" cy="0" rx="32" ry="13"/><ellipse cx="-18" cy="-8" rx="15" ry="11"/><ellipse cx="8" cy="-13" rx="19" ry="15"/></g>`);
const sun = (x, y, r = 26) => path(Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6, k = Math.cos(a), n = Math.sin(a); return `M${Math.round(x + k * (r + 5))} ${Math.round(y + n * (r + 5))}L${Math.round(x + k * (r + 13))} ${Math.round(y + n * (r + 13))}`; }).join(""), "none", 4, "stroke=\"#f7b733\"") + circ(x, y, r, "#ffd84d");
const star = (x, y, r = 5, f = '#ffe58a') => `<path d="M${x} ${y - r} L${x + r * .3} ${y - r * .3} L${x + r} ${y} L${x + r * .3} ${y + r * .3} L${x} ${y + r} L${x - r * .3} ${y + r * .3} L${x - r} ${y} L${x - r * .3} ${y - r * .3}Z" fill="${f}"/>`;
const moon = (x, y, r = 22) => `<circle cx="${x}" cy="${y}" r="${r * 1.5}" fill="#fff6c8" opacity=".18"/>` + path(`M${x} ${y - r} A${r} ${r} 0 1 0 ${x} ${y + r} A${r * .65} ${r} 0 1 1 ${x} ${y - r}Z`, '#fff1a8', 3);
const tree = (x, y, s = 1, c = '#69b85f') => G(x, y, s, `${rect(-6, -34, 12, 34, '#8a5a3b', 3)}${circ(0, -58, 25, c)}${circ(-18, -42, 17, c)}${circ(18, -42, 17, c)}<g fill="${c}">${circ(0, -57, 23.5, c, 0)}${circ(-18, -42, 15.5, c, 0)}${circ(18, -42, 15.5, c, 0)}${rect(-14, -45, 28, 14, c, 0)}</g>`);
const pine = (x, y, s = 1, c = '#3f8f63', snow = false) => G(x, y, s, `${rect(-5, -22, 10, 22, '#7a5236', 3)}${path('M-30 -18 L0 -62 L30 -18Z', c)}${path('M-25 -48 L0 -92 L25 -48Z', c)}${path('M-19 -76 L0 -112 L19 -76Z', c)}${snow ? path('M-8 -100 L0 -112 L8 -100 Q0 -95 -8 -100Z', '#fff', 0) + path('M-14 -64 L0 -92 L14 -64 Q0 -57 -14 -64Z', '#fff', 0) + path('M-20 -36 L0 -62 L20 -36 Q0 -28 -20 -36Z', '#fff', 0) : ''}`);
const bush = (x, y, s = 1, c = '#58a84f') => G(x, y, s, `${circ(-14, -10, 14, c)}${circ(14, -10, 14, c)}${circ(0, -16, 17, c)}<g>${circ(-14, -10, 12.5, c, 0)}${circ(14, -10, 12.5, c, 0)}${circ(0, -16, 15.5, c, 0)}${rect(-14, -14, 28, 14, c, 0)}</g>`);
const flower = (x, y, c = '#ff7aa8') => `${line(x, y, x, y - 12, '#3f8f4f', 2.5)}${circ(x, y - 14, 4.5, c, 2)}${circ(x, y - 14, 1.8, '#ffe066', 0)}`;
const lawn = (y = 205, c1 = '#a6d982', c2 = '#86c862') => path(`M-5 ${y - 22} Q80 ${y - 52} 170 ${y - 28} Q260 ${y - 6} 330 ${y - 38} Q380 ${y - 52} 405 ${y - 32} L405 305 L-5 305Z`, c1) + rect(-5, y, 410, 110, c2, 3);
const day = (sx = 335) => sky('#8fd0f4', '#e8f8ff') + sun(sx, 52, 24) + cloud(sx < 150 ? 150 : 70, 58) + cloud(sx < 150 ? 290 : 225, 36, .8);
const wind = (x, y, n = 3, len = 60, c = '#fff') => Array.from({ length: n }, (_, i) => path(`M${x} ${y + i * 14} q${len / 3} -10 ${len / 2} 0 t${len / 2} 0`, 'none', 3.5, `stroke="${c}" opacity=".9"`).replace(`stroke="${O}"`, '')).join('');
const bits = (x, y, n, spread, c = '#e7c35d', len = 14, w = 3, seed = 1) => Array.from({ length: n }, (_, i) => { const a = rnd(i + seed) * 180, cx = x + (rnd(i + 50 + seed) - .5) * spread * 2, cy = y - rnd(i + 90 + seed) * spread * .8, dx = Math.cos(a * Math.PI / 180) * len / 2, dy = Math.sin(a * Math.PI / 180) * len / 2; return line((cx - dx).toFixed(1), (cy - dy).toFixed(1), (cx + dx).toFixed(1), (cy + dy).toFixed(1), c, w); }).join('');
const peek = (x, y, w, h, draw) => { const id = uid(); return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>${rect(x, y, w, h, '#bfe8ff', 0)}<g clip-path="url(#${id})">${draw}</g>${rect(x, y, w, h, 'none', 3)}`; };
// ---- end shared helpers ----

// ---- characters: Zoé (red knitted tuque, yellow parka, pigtails), Théo (green tuque, blue parka), Mamie Rose (grey bun, glasses, green coat) ----
const DARKM = '#8a2f45';
const PPL = {
  zoe: { skin: '#f3c9a0', hair: '#6b3f2a', coat: '#f5b82e', pants: '#3f5b9c', boot: '#2f3f6e', mitt: '#3b7dd8' },
  theo: { skin: '#c98e62', hair: '#2b2230', coat: '#3b7dd8', pants: '#4a4f66', boot: '#6b4a3a', mitt: '#e8504f' },
  rose: { skin: '#f1d0b0', hair: '#d6d6e2', coat: '#4a8a6a', pants: '#6b5a7a', boot: '#5a4036', mitt: '#a56bc9' },
};
const ARMS = {
  down: [[-30, -32], [30, -32]], up: [[-42, -94], [42, -94]], point: [[-30, -32], [56, -84]], pointup: [[-30, -32], [40, -124]],
  hold: [[-11, -44], [11, -44]], wave: [[-30, -32], [46, -98]], tuque: [[-27, -104], [27, -104]],
};
const limb = (x1, y1, x2, y2, c, w = 11) => line(x1, y1, x2, y2, O, w + 5) + line(x1, y1, x2, y2, c, w);
const eye4 = (cx, k) => k === 'wide' ? circ(cx, -88, 5, '#fff', 2) + circ(cx, -87.5, 2.2, O, 0) : k === 'closed' ? path(`M${cx - 4.5} -87 Q${cx} -93 ${cx + 4.5} -87`, 'none', 2.8) : ell(cx, -88, 3, 3.6, O, 0) + circ(cx - 1, -89.2, 1, '#fff', 0);
const personne = (x, y, s, who = 'zoe', face = 'happy', arms = 'down', o = {}) => {
  const p = PPL[who], [l, r] = typeof arms === 'string' ? ARMS[arms] : arms, coat = o.coat || p.coat, hat = o.hat === undefined ? who !== 'rose' : o.hat;
  const k = face === 'scared' || face === 'wow' ? 'wide' : face === 'cheer' || face === 'laugh' ? 'closed' : 'dot';
  const brows = face === 'scared' ? path('M-14 -98 L-4 -102 M14 -98 L4 -102', 'none', 2.5) : face === 'determined' ? path('M-14 -100 L-4 -96 M14 -100 L4 -96', 'none', 3) : face === 'wow' ? path('M-13 -100 L-4 -101 M13 -100 L4 -101', 'none', 2.5) : '';
  const mouth = { happy: path('M-7 -77 Q0 -70 7 -77', 'none', 2.8), cheer: path('M-9 -78 Q0 -64 9 -78Z', DARKM, 2.5), laugh: path('M-9 -78 Q0 -64 9 -78Z', DARKM, 2.5), wow: ell(0, -75, 4, 5, DARKM, 2), scared: path('M-6 -73 q3 -4 6 0 q3 4 6 0', 'none', 2.5), determined: path('M-6 -75 L6 -75', 'none', 3) }[face];
  const legs = o.sit ? rect(-8, -24, 38, 12, p.pants, 3, 5) + ell(34, -17, 8, 9, p.boot, 2.5) : rect(-13, -26, 11, 26, p.pants, 3) + rect(2, -26, 11, 26, p.pants, 3) + ell(-8, -3, 11, 5.5, p.boot, 2.5) + ell(8, -3, 11, 5.5, p.boot, 2.5);
  const tuque = hat ? (who === 'zoe'
    ? path('M-26 -92 Q-27 -126 0 -126 Q27 -126 26 -92Z', '#d9453f') + path('M-17 -104 L-17 -118 M-8 -104 L-8 -122 M2 -104 L2 -123 M12 -104 L12 -120 M20 -104 L20 -114', 'none', 2, 'stroke="#a82d2a"') + rect(-27, -101, 54, 12, '#fff', 3, 5) + circ(0, -129, 8, '#fff')
    : path('M-26 -92 Q-27 -122 0 -122 Q27 -122 26 -92Z', '#4caf63') + rect(-27, -101, 54, 12, '#fff', 3, 5) + circ(0, -125, 6, '#ffe45c')) : '';
  const hair = hat ? '' : who === 'zoe' ? path('M-23 -90 Q-25 -116 0 -114 Q25 -116 23 -90 Q12 -104 -2 -101 Q-14 -99 -23 -90Z', p.hair) : who === 'theo' ? path('M-23 -91 Q-24 -116 0 -114 Q24 -116 23 -91 Q10 -102 0 -100 Q-12 -102 -23 -91Z', p.hair) : path('M-23 -90 Q-24 -114 0 -112 Q24 -114 23 -90 Q12 -102 0 -100 Q-12 -102 -23 -90Z', p.hair) + circ(0, -120, 9, p.hair);
  return G(x, y, s,
    legs +
    rect(-22, -68, 44, who === 'rose' ? 60 : 46, coat, 3, 14) + line(0, -66, 0, who === 'rose' ? -12 : -24, O, 2.5) + (who === 'rose' ? rect(-22, -34, 44, 5, '#a56bc9', 2) : '') +
    limb(-20, -60, l[0], l[1], coat) + limb(20, -60, r[0], r[1], coat) + circ(l[0], l[1], 7, p.mitt, 2.5) + circ(r[0], r[1], 7, p.mitt, 2.5) +
    (who === 'zoe' ? ell(-27, -78, 6, 13, p.hair, 3) + ell(27, -78, 6, 13, p.hair, 3) + circ(-27, -88, 3.5, '#d9453f', 2) + circ(27, -88, 3.5, '#d9453f', 2) : '') +
    ell(0, -68, 19, 7, who === 'zoe' ? '#fff' : who === 'theo' ? '#e8504f' : '#f2a0c0', 3) +
    ell(0, -88, 23, 22, p.skin) + hair + tuque + (who === 'rose' ? circ(-9, -88, 10, 'none', 2.5) + circ(9, -88, 10, 'none', 2.5) + line(-1, -88, 1, -88, O, 2.5) : '') +
    circ(-15, -79, 4, '#ff9aa8', 0) + circ(15, -79, 4, '#ff9aa8', 0) + eye4(-8, k) + eye4(8, k) + brows + mouth +
    (face === 'scared' ? path('M24 -100 q-5 8 0 11 q5 -3 0 -11Z', '#9fdcff', 2) : ''),
    !!o.flip, o.rot || 0);
};
const tukObj = (x, y, s = 1, rot = 0) => G(x, y, s, path('M-24 0 Q-25 -34 0 -34 Q25 -34 24 0Z', '#d9453f') + path('M-15 -12 L-15 -26 M-6 -12 L-6 -30 M4 -12 L4 -31 M14 -12 L14 -26', 'none', 2, 'stroke="#a82d2a"') + rect(-26, -10, 52, 12, '#fff', 3, 5) + circ(0, -37, 8, '#fff'), false, rot);
const sled = (x, y, s = 1, rot = 0) => G(x, y, s, path('M-34 -10 L34 -10 Q46 -10 44 -20 L-34 -14Z', '#d94f4f') + rect(-32, -12, 64, 9, '#e8504f', 3, 4) + path('M-36 2 Q-40 2 -40 -8 M-36 2 L36 2 Q46 2 46 -10', 'none', 3.5, 'stroke="#7d8090"') + line(-6, 0, -6, -10, O, 3) + line(20, 0, 20, -10, O, 3), false, rot);
const sparks = (cx, cy, r = 40, n = 5) => Array.from({ length: n }, (_, i) => star(Math.round(cx + Math.cos(i * 1.4 + 1) * r * (.7 + rnd(i) * .5)), Math.round(cy + Math.sin(i * 1.4 + 1) * r * (.6 + rnd(i + 3) * .5)), 5 + (i % 3) * 2, '#ffe45c')).join('');
const flakes = (n = 30, seed = 1) => Array.from({ length: n }, (_, i) => `<circle cx="${Math.round(rnd(i + seed) * 400)}" cy="${Math.round(rnd(i + 30 + seed) * 280)}" r="${2 + Math.round(rnd(i + 60 + seed) * 2)}" fill="#fff" stroke="none"/>`).join('');
const snowSky = () => sky('#b4cfe9', '#f0f7fd');
const snowGround = (y = 215) => path(`M-5 ${y - 14} Q100 ${y - 40} 200 ${y - 20} Q300 ${y} 405 ${y - 28} L405 305 L-5 305Z`, '#f7faff') + rect(-5, y, 410, 100, '#e9f0fa', 3) + ell(70, y + 46, 50, 7, '#cfe0f3', 0) + ell(300, y + 70, 60, 8, '#cfe0f3', 0);
const spines = (y = 200) => pine(30, y + 12, 1.1, '#3f8f63', true) + pine(70, y + 22, .8, '#4d9a6a', true) + pine(375, y + 10, 1.2, '#3f8f63', true);
const room = () => rect(0, 0, 400, 240, '#f4e1c2', 0) + Array.from({ length: 9 }, (_, i) => rect(i * 48, 0, 20, 240, '#efd6b0', 0)).join('') + rect(0, 232, 400, 8, '#8a5a3b', 3, 0) + rect(0, 238, 400, 62, '#b98558', 0) + line(0, 270, 400, 270, '#a07046', 2) + line(0, 288, 400, 288, '#a07046', 2);
const win = (x, y, w, h, inner) => peek(x, y, w, h, inner) + line(x + w / 2, y, x + w / 2, y + h, O, 3) + line(x, y + h / 2, x + w, y + h / 2, O, 3) + rect(x - 6, y + h, w + 12, 8, '#8a5a3b', 3, 3);
const heart = (x, y, s = 1, c = '#ff5c7a') => G(x, y, s, path('M0 0 C-22 -18 -14 -36 0 -24 C14 -36 22 -18 0 0Z', c));

export const book = {
  id: 'la-tuque-magique',
  title: 'La tuque magique',
  emoji: '🧶',
  level: 2,
  minutes: 9,
  cover: svg(snowSky() + circ(70, 60, 22, '#fff6d8', 0) + flakes(30, 4) + pine(40, 238, 1.5, '#3f8f63', true) + pine(100, 250, 1.1, '#4d9a6a', true) + pine(360, 240, 1.6, '#3f8f63', true) + snowGround(222) + personne(200, 285, 1.75, 'zoe', 'cheer', 'up') + sparks(200, 90, 105, 6)),
  pages: [
    { text: 'Mamie Rose est assise dans son fauteuil. Clic, clac, ses aiguilles dansent. Elle tricote une tuque rouge et blanche pour Zoé.',
      svg: svg(room() + win(40, 40, 90, 100, sky('#c9d3de', '#e6ebf0') + path('M20 140 L30 70 M30 100 L10 80 M30 90 L55 70 M70 140 L74 60', 'none', 3, 'stroke="#6b5a4a"')) + rect(180, 120, 36, 105, '#8a5a3b', 3, 5) + ell(198, 118, 30, 14, '#ffe08a', 3) + rect(205, 196, 150, 70, '#c0587a') + personne(268, 268, 1.15, 'rose', 'happy', [[-14, -42], [14, -44]], { hat: false }) + rect(205, 226, 130, 40, '#d96b8e') + rect(200, 168, 12, 98, '#c0587a', 3, 5) + rect(342, 190, 12, 76, '#c0587a', 3, 5) + path('M232 232 Q268 218 304 232', 'none', 3, 'stroke="#8a2f5a"') + line(255, 210, 282, 232, '#c9966a', 3) + line(285, 210, 258, 232, '#c9966a', 3) + path('M268 228 q4 28 -6 40', 'none', 6, 'stroke="#d9453f"') + ell(160, 262, 15, 14, '#d9453f', 3) + path('M148 258 q12 -8 24 0 M146 266 q14 -6 28 0', 'none', 2, 'stroke="#fff"') + personne(95, 270, 1, 'zoe', 'happy', 'down', { hat: false, sit: true }) ) },
    { text: '« Voici ta tuque, ma belle! dit Mamie. Elle est magique. Quand tu la portes, tu deviens courageuse. » Zoé la serre contre son cœur.',
      svg: svg(room() + win(160, 40, 80, 90, sky('#c9d3de', '#e6ebf0')) + personne(112, 270, 1.05, 'zoe', 'wow', 'up', { hat: false }) + personne(290, 272, 1.3, 'rose', 'happy', [[-34, -76], [36, -40]], { hat: false, flip: true }) + tukObj(190, 190, 1.25, -8) + sparks(190, 160, 42, 6)) },
    { text: 'Le lendemain matin, Zoé court à la fenêtre. « Il neige! C’est la première neige de l’année! » Vite, elle met son manteau et ses bottes.',
      svg: svg(room() + win(110, 30, 180, 150, snowSky() + flakes(26, 6) + pine(50, 150, 1.1, '#3f8f63', true) + pine(150, 160, 1.4, '#4d9a6a', true) + rect(0, 120, 200, 30, '#f7faff', 0)) + rect(30, 120, 8, 30, '#8a5a3b', 3, 2) + tukObj(34, 136, .5) + rect(300, 130, 70, 100, '#c9966a', 3, 4) + personne(200, 272, 1.45, 'zoe', 'wow', 'up', { hat: false, coat: '#c9a0e8' }) + circ(355, 120, 10, '#fff', 0)) },
    { text: 'Au parc, Théo montre la grande butte. « Viens glisser avec moi! » Zoé regarde la butte et son ventre fait des nœuds.',
      svg: svg(snowSky() + flakes(24, 9) + spines(190) + path('M150 300 Q200 120 300 70 Q360 50 405 110 L405 300Z', '#f7faff') + path('M200 220 Q250 130 310 90', 'none', 6, 'stroke="#cfe0f3"') + snowGround(240) + sled(245, 278, 1) + personne(95, 280, 1.15, 'zoe', 'scared', 'hold', { hat: false }) + personne(175, 284, 1.2, 'theo', 'happy', 'point')) },
    { text: 'Zoé pense à la tuque magique. Elle l’enfonce bien sur sa tête et prend une grande respiration. « Je suis courageuse », murmure-t-elle.',
      svg: svg(snowSky() + circ(200, 130, 105, '#fff', 0).replace('/>', ' opacity=".55"/>') + flakes(18, 12) + pine(35, 240, 1.4, '#3f8f63', true) + pine(375, 240, 1.4, '#3f8f63', true) + snowGround(235) + personne(200, 292, 2, 'zoe', 'determined', 'tuque') + sparks(200, 70, 120, 7)) },
    { text: 'Zoé s’assoit sur la luge. Théo la pousse, et hop! Elle ferme les yeux et crie: « Wouhouuu! »',
      svg: svg(snowSky() + flakes(14, 15) + pine(370, 150, 1, '#3f8f63', true) + path('M-5 90 Q150 100 250 200 Q310 255 405 258 L405 305 L-5 305Z', '#f7faff') + path('M-5 150 Q120 150 210 230 Q290 290 405 285 L405 305 L-5 305Z', '#e9f0fa', 3) + personne(38, 112, .75, 'theo', 'cheer', 'up') + sled(210, 235, 1.1, 32) + personne(205, 224, .95, 'zoe', 'laugh', 'up', { sit: true, rot: 32 }) + ell(150, 210, 14, 9, '#fff', 0) + ell(125, 190, 10, 7, '#fff', 0) + path('M95 175 l-20 -6 M85 205 l-25 -4 M110 232 l-22 2', 'none', 3, 'stroke="#fff"')) },
    { text: 'En bas de la butte, Zoé rit aux éclats. « Tu l’as fait! » crie Théo en applaudissant.',
      svg: svg(snowSky() + flakes(18, 18) + spines(190) + path('M180 300 Q230 150 330 110 Q380 95 405 130 L405 300Z', '#f7faff') + snowGround(238) + sled(300, 270, .9, -8) + personne(130, 284, 1.3, 'zoe', 'laugh', 'up') + personne(225, 284, 1.2, 'theo', 'cheer', 'up') + sparks(130, 120, 70, 4) + ell(60, 290, 18, 7, '#fff', 0)) },
    { text: 'Soudain, un grand coup de vent arrive. Zip! La tuque s’envole et se coince dans un sapin.',
      svg: svg(snowSky() + flakes(24, 21) + pine(300, 268, 1.8, '#3f8f63', true) + snowGround(240) + wind(40, 90, 3, 90) + wind(180, 130, 2, 70) + tukObj(262, 186, .55, 20) + personne(105, 284, 1.15, 'zoe', 'wow', 'pointup', { hat: false }) + personne(185, 286, 1.1, 'theo', 'wow', 'down')) },
    { text: 'Zoé a peur. Sans sa tuque magique, est-elle encore courageuse? Son cœur bat très fort.',
      svg: svg(snowSky() + flakes(14, 24) + pine(340, 262, 1.8, '#3f8f63', true) + tukObj(298, 190, .5, 20) + snowGround(240) + personne(160, 290, 1.7, 'zoe', 'scared', 'hold', { hat: false }) + heart(178, 215, .6) + path('M148 200 q-10 -8 -2 -18 M205 200 q10 -8 2 -18', 'none', 3, 'stroke="#ff5c7a"')) },
    { text: 'Zoé respire fort. Elle prend un long bâton et touche la tuque. Plouf! La tuque tombe dans la neige.',
      svg: svg(snowSky() + flakes(14, 27) + pine(300, 268, 1.8, '#3f8f63', true) + snowGround(240) + personne(215, 286, 1.15, 'zoe', 'determined', [[-14, -62], [18, -104]], { hat: false }) + line(215, 205, 266, 125, '#8a5a3b', 5) + tukObj(272, 178, .55, 35) + path('M278 188 l8 12 M268 196 l2 14', 'none', 3, 'stroke="#fff"') + personne(95, 286, 1.1, 'theo', 'cheer', 'up') + sparks(270, 160, 40, 3)) },
    { text: 'Zoé tient sa tuque dans ses mains. Elle a réussi toute seule, sans la magie! Elle sourit, très surprise.',
      svg: svg(snowSky() + circ(200, 140, 110, '#fff6c8', 0).replace('/>', ' opacity=".5"/>') + flakes(12, 30) + pine(35, 240, 1.4, '#3f8f63', true) + pine(375, 240, 1.4, '#3f8f63', true) + snowGround(235) + personne(200, 292, 1.85, 'zoe', 'wow', 'hold', { hat: false }) + tukObj(200, 215, 1.1) + sparks(200, 80, 120, 6)) },
    { text: 'Mamie arrive sur le sentier. « Ma belle, la tuque n’a jamais été magique, dit-elle doucement. Le courage, c’est toi qui l’avais depuis le début. »',
      svg: svg(snowSky() + flakes(16, 33) + spines(190) + snowGround(236) + path('M150 305 Q190 260 250 245', 'none', 14, 'stroke="#d4e2f2"') + personne(135, 288, 1.25, 'zoe', 'happy', 'hold', { hat: false }) + tukObj(135, 240, .75) + personne(255, 290, 1.5, 'rose', 'happy', [[-34, -72], [26, -40]], { hat: false, flip: true }) + heart(135, 120, 1.2) + heart(180, 100, .7, '#ff9ab0') ) },
    { text: 'Zoé remet sa tuque parce qu’elle est chaude et douce. Elle glisse encore, les bras en l’air. Maintenant, elle sait: le courage est dans son cœur!',
      svg: svg(snowSky() + flakes(16, 36) + pine(375, 150, 1, '#3f8f63', true) + path('M-5 90 Q150 100 250 200 Q310 255 405 258 L405 305 L-5 305Z', '#f7faff') + path('M-5 150 Q120 150 210 230 Q290 290 405 285 L405 305 L-5 305Z', '#e9f0fa', 3) + sled(205, 232, 1.2, 32) + personne(200, 220, 1.05, 'zoe', 'laugh', 'up', { sit: true, rot: 32 }) + personne(330, 288, .95, 'rose', 'happy', 'wave', { hat: false }) + path('M110 170 l-22 -6 M100 200 l-26 -4 M120 228 l-22 2', 'none', 3, 'stroke="#fff"') + heart(120, 120, .9) + heart(300, 150, .6, '#ff9ab0') + sparks(200, 120, 70, 4)) },
  ],
  words: [
    { word: 'une tuque', emoji: '🧶', def: 'Un bonnet de laine chaud qu’on porte l’hiver, au Québec.' },
    { word: 'tricoter', emoji: '🧵', def: 'Faire un vêtement avec de la laine et des aiguilles.' },
    { word: 'magique', emoji: '✨', def: 'Qui a un pouvoir spécial, comme dans les contes.' },
    { word: 'courageuse', emoji: '💪', def: 'Qui fait une chose difficile même si elle a un peu peur.' },
    { word: 'la luge', emoji: '🛷', def: 'Une petite planche pour glisser sur la neige.' },
    { word: 'un sapin', emoji: '🌲', def: 'Un grand arbre qui garde ses aiguilles vertes l’hiver.' },
    { word: 'le vent', emoji: '💨', def: 'De l’air qui bouge et qui pousse les choses.' },
    { word: 'un sentier', emoji: '🥾', def: 'Un petit chemin pour marcher dans la nature.' },
  ],
  quiz: [
    { q: 'Qui a tricoté la tuque de Zoé?', options: ['Sa mère', 'Mamie Rose', 'Théo'], answer: 1 },
    { q: 'De quelle couleur est la tuque?', options: ['Bleue et jaune', 'Verte et noire', 'Rouge et blanche'], answer: 2 },
    { q: 'Que dit Mamie à propos de la tuque?', options: ['Elle est magique et rend courageuse', 'Elle est trop petite', 'Elle est très chère'], answer: 0 },
    { q: 'Pourquoi le ventre de Zoé fait-il des nœuds au parc?', options: ['Elle a faim', 'La grande butte lui fait peur', 'Elle a froid'], answer: 1 },
    { q: 'Que se passe-t-il avec la tuque après la glissade?', options: ['Le vent l’emporte dans un sapin', 'Théo la cache', 'Elle se déchire'], answer: 0 },
    { q: 'Comment Zoé fait-elle tomber sa tuque?', options: ['Elle grimpe dans l’arbre', 'Elle utilise un long bâton', 'Elle demande à Mamie'], answer: 1 },
    { q: 'Que veut dire « tricoter »?', options: ['Faire un vêtement avec de la laine et des aiguilles', 'Glisser sur la neige', 'Courir très vite'], answer: 0 },
    { q: 'Qu’est-ce que Zoé comprend à la fin?', options: ['Il faut toujours porter sa tuque', 'Le courage vient d’elle-même', 'Mamie est une magicienne'], answer: 1 },
  ],
};
