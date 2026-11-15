// « Le jardin de Grand-papa Wen » — niveau 2
const O = 'class="k3"';
const O2 = 'class="k2"';
const svg = (s) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><style>.k3,.k2{stroke:#3a3f55;stroke-linejoin:round;stroke-linecap:round}.k3{stroke-width:3}.k2{stroke-width:2}.ln{fill:none;stroke-linecap:round}</style>${s}</svg>`;
const limb = (a, b, c, d, w, col) => `<path d="M${a} ${b}L${c} ${d}" class="ln" stroke="#3a3f55" stroke-width="${w + 4}"/><path d="M${a} ${b}L${c} ${d}" class="ln" stroke="${col}" stroke-width="${w}"/>`;

// ---------- visages et bras (communs) ----------
const face = (m) => {
  const cheeks = '<circle cx="-10" cy="5" r="3.2" fill="#f29a8f" opacity=".65"/><circle cx="10" cy="5" r="3.2" fill="#f29a8f" opacity=".65"/>';
  const eyes = (m === 'laugh')
    ? `<path d="M-9 -1 Q-6 -6 -3 -1 M3 -1 Q6 -6 9 -1" fill="none" ${O2}/>`
    : '<circle cx="-6" cy="-1" r="2.4" fill="#3a3f55"/><circle cx="6" cy="-1" r="2.4" fill="#3a3f55"/>';
  let mouth = `<path d="M-5 5 Q0 10 5 5" fill="none" ${O2}/>`;
  let brows = '';
  if (m === 'laugh') mouth = `<path d="M-6 4 Q0 16 6 4 Z" fill="#b0413e" ${O2}/>`;
  if (m === 'wow') { mouth = `<ellipse cx="0" cy="8" rx="3" ry="4" fill="#b0413e" ${O2}/>`; brows = `<path d="M-9 -8 Q-6 -11 -3 -8 M3 -8 Q6 -11 9 -8" fill="none" ${O2}/>`; }
  if (m === 'sad') { mouth = `<path d="M-5 10 Q0 5 5 10" fill="none" ${O2}/>`; brows = `<path d="M-9 -6 L-3 -9 M9 -6 L3 -9" fill="none" ${O2}/>`; }
  if (m === 'angry') { mouth = `<path d="M-5 9 Q0 6 5 9" fill="none" ${O2}/>`; brows = `<path d="M-10 -9 L-3 -5 M10 -9 L3 -5" fill="none" ${O2}/>`; }
  return cheeks + eyes + mouth + brows;
};
const ARM = {
  down: [[-14, -52, -19, -28], [14, -52, 19, -28]],
  up: [[-14, -52, -28, -82], [14, -52, 28, -82]],
  pointR: [[-14, -52, -19, -28], [14, -52, 42, -62]],
  hold: [[-14, -52, -8, -32], [14, -52, 8, -32]],
  reachR: [[-14, -52, -19, -28], [14, -52, 38, -44]],
};
const arms = (pose, col, skin = '#f6c9a0') => ARM[pose].map(([a, b, c, d]) => limb(a, b, c, d, 8, col) + `<circle cx="${c}" cy="${d}" r="4.5" fill="${skin}" ${O2}/>`).join('');

// ---------- personnages ----------
// Mei : manteau rouge, pantalon bleu, deux chignons noirs
const mei = (x, y, s = 1, mood = 'smile', pose = 'down') => `<g transform="translate(${x} ${y}) scale(${s})">
${limb(-6, -30, -6, -5, 9, '#4a6fa5')}${limb(6, -30, 6, -5, 9, '#4a6fa5')}
<ellipse cx="-7" cy="-2" rx="8" ry="4" fill="#d9534f" ${O2}/><ellipse cx="7" cy="-2" rx="8" ry="4" fill="#d9534f" ${O2}/>
<rect x="-14" y="-60" width="28" height="34" rx="9" fill="#e8604c" ${O}/>
<path d="M-14 -34 H14" stroke="#c94a3a" stroke-width="2.5"/>
${arms(pose, '#e8604c')}
<circle cx="-16" cy="-87" r="8" fill="#2b2b3a" ${O}/><circle cx="16" cy="-87" r="8" fill="#2b2b3a" ${O}/>
<circle cx="0" cy="-74" r="17" fill="#f6c9a0" ${O}/>
<path d="M-17 -76 Q-15 -94 0 -92 Q15 -94 17 -76 Q8 -85 0 -84 Q-8 -85 -17 -76Z" fill="#2b2b3a" ${O2}/>
<g transform="translate(0 -72)">${face(mood)}</g></g>`;

// Grand-papa Wen : gilet vert, pantalon brun, cheveux blancs, lunettes rondes, moustache
const papa = (x, y, s = 1, mood = 'smile', pose = 'down', hat = false) => `<g transform="translate(${x} ${y}) scale(${s})">
${limb(-7, -32, -7, -5, 10, '#8a6a4a')}${limb(7, -32, 7, -5, 10, '#8a6a4a')}
<ellipse cx="-8" cy="-2" rx="9" ry="4" fill="#4a3b32" ${O2}/><ellipse cx="8" cy="-2" rx="9" ry="4" fill="#4a3b32" ${O2}/>
<rect x="-16" y="-62" width="32" height="36" rx="9" fill="#fff1d6" ${O}/>
<path d="M-16 -54 Q-16 -62 -8 -62 L-3 -30 L-16 -28Z M16 -54 Q16 -62 8 -62 L3 -30 L16 -28Z" fill="#5a9e6f" ${O2}/>
${arms(pose, '#5a9e6f')}
<circle cx="-17" cy="-79" r="7" fill="#f4f4f4" ${O2}/><circle cx="17" cy="-79" r="7" fill="#f4f4f4" ${O2}/>
<circle cx="0" cy="-78" r="18" fill="#f2c394" ${O}/>
<path d="M-12 -92 Q0 -98 12 -92" fill="none" stroke="#f4f4f4" stroke-width="3"/>
<g transform="translate(0 -76)">${face(mood)}
<circle cx="-6" cy="-1" r="5.5" fill="none" ${O2}/><circle cx="6" cy="-1" r="5.5" fill="none" ${O2}/><path d="M-0.5 -1 h1" ${O2}/>
<path d="M-7 4 Q0 2 7 4 Q0 8 -7 4Z" fill="#f4f4f4" stroke="#3a3f55" stroke-width="1.5"/></g>
${hat ? `<ellipse cx="0" cy="-92" rx="27" ry="6" fill="#e8c46a" ${O}/><path d="M-14 -93 Q-14 -112 0 -112 Q14 -112 14 -93Z" fill="#f0d27e" ${O}/><path d="M-14 -96 H14" stroke="#c0392b" stroke-width="3"/>` : ''}
</g>`;

// Madame Roy, la voisine : cardigan mauve, chignon gris
const voisine = (x, y, s = 1, mood = 'laugh') => `<g transform="translate(${x} ${y}) scale(${s})">
${limb(-6, -30, -6, -5, 8, '#e9dcc9')}${limb(6, -30, 6, -5, 8, '#e9dcc9')}
<ellipse cx="-7" cy="-2" rx="8" ry="4" fill="#7b4a6e" ${O2}/><ellipse cx="7" cy="-2" rx="8" ry="4" fill="#7b4a6e" ${O2}/>
<path d="M-18 -26 L-15 -62 H15 L18 -26Z" fill="#9b6fb5" ${O}/><path d="M0 -62 V-26" stroke="#7b4a8e" stroke-width="2.5"/>
${limb(-14, -52, -26, -76, 8, '#9b6fb5')}${limb(14, -52, 26, -76, 8, '#9b6fb5')}
<circle cx="-26" cy="-76" r="4.5" fill="#f6d2b4" ${O2}/><circle cx="26" cy="-76" r="4.5" fill="#f6d2b4" ${O2}/>
<circle cx="0" cy="-90" r="8" fill="#b9b9c6" ${O}/>
<circle cx="0" cy="-74" r="17" fill="#f6d2b4" ${O}/>
<path d="M-17 -76 Q-14 -93 0 -91 Q14 -93 17 -76 Q8 -84 0 -83 Q-8 -84 -17 -76Z" fill="#b9b9c6" ${O2}/>
<g transform="translate(0 -72)">${face(mood)}</g></g>`;

// L'écureuil : fourrure rousse, queue touffue
const ecureuil = (x, y, s = 1, item = '', flip = false, stuffed = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
<path d="M-6 -8 C-42 -6 -40 -62 -14 -58 C-28 -46 -22 -28 -4 -24Z" fill="#c7793f" ${O}/>
<ellipse cx="0" cy="-20" rx="12" ry="16" fill="#c7793f" ${O}/><ellipse cx="3" cy="-17" rx="7" ry="11" fill="#f3d9b0"/>
<ellipse cx="2" cy="-3" rx="11" ry="4" fill="#b5652f" ${O2}/>
<path d="M0 -50 L-2 -62 L7 -53Z M11 -52 L16 -62 L18 -50Z" fill="#c7793f" ${O2}/>
<circle cx="7" cy="-42" r="11" fill="#c7793f" ${O}/>
${stuffed ? '<ellipse cx="14" cy="-37" rx="7" ry="6" fill="#d98c52" stroke="#3a3f55" stroke-width="2"/>' : ''}
<circle cx="10" cy="-45" r="2.2" fill="#3a3f55"/><circle cx="16.5" cy="-41" r="2" fill="#3a3f55"/>
${stuffed ? '' : `<path d="M11 -37 Q15 -34 18 -38" fill="none" stroke="#3a3f55" stroke-width="1.8"/>`}
${item === 'tomate' ? `<circle cx="15" cy="-27" r="7.5" fill="#e0452f" ${O2}/><path d="M11 -33 L15 -30 L19 -33" fill="none" stroke="#3b8a3e" stroke-width="2"/>` : ''}
${item === 'noix' ? `<ellipse cx="15" cy="-27" rx="5" ry="4" fill="#a9733a" ${O2}/>` : ''}
${item === 'noix' || item === 'tomate' ? `<circle cx="9" cy="-26" r="3" fill="#b5652f" ${O2}/>` : ''}
</g>`;

// ---------- décors ----------
const balcon = (saison = 'spring') => {
  const sky = { spring: '#c6e7f7', summer: '#8fd3f7', autumn: '#f4d9a6' }[saison];
  const sun = saison === 'summer'
    ? `<circle cx="340" cy="48" r="26" fill="#ffd84a" ${O2}/><path d="M340 10v-8M340 86v-8M302 48h-8M378 48h8M313 21l-6 -6M367 75l6 6M367 21l6 -6M313 75l-6 6" class="ln" stroke="#ffb703" stroke-width="3"/>`
    : `<ellipse cx="320" cy="50" rx="30" ry="12" fill="#fff" opacity=".9"/><ellipse cx="338" cy="42" rx="20" ry="11" fill="#fff" opacity=".9"/><ellipse cx="90" cy="40" rx="26" ry="10" fill="#fff" opacity=".85"/>`;
  const win = (x, y) => `M${x} ${y}h8v10h-8z`;
  return `<rect width="400" height="300" fill="${sky}"/>${sun}
<rect x="0" y="100" width="55" height="75" fill="#d7b8a8" ${O2}/><rect x="50" y="72" width="48" height="103" fill="#b9c3dd" ${O2}/><rect x="98" y="112" width="62" height="63" fill="#e3cfa0" ${O2}/><rect x="158" y="88" width="42" height="87" fill="#c9b5d6" ${O2}/><rect x="200" y="122" width="70" height="53" fill="#d7b8a8" ${O2}/><rect x="270" y="96" width="50" height="79" fill="#b9d3c3" ${O2}/><rect x="320" y="118" width="80" height="57" fill="#e3cfa0" ${O2}/>
<path fill="#fff6c9" d="${[[14,112],[14,135],[64,84],[82,84],[64,112],[120,124],[172,100],[172,128],[220,134],[284,108],[284,136],[340,130],[366,130]].map(([x, y]) => win(x, y)).join('')}"/>
<rect x="0" y="212" width="400" height="88" fill="#c79a6b"/>
<path d="M0 236H400M0 262H400M0 286H400" stroke="#a9794e" stroke-width="2"/>
<rect x="0" y="164" width="400" height="9" fill="#7a8aa0" ${O2}/><rect x="0" y="203" width="400" height="9" fill="#7a8aa0" ${O2}/>
<path d="M15 173v30M50 173v30M85 173v30M120 173v30M155 173v30M190 173v30M225 173v30M260 173v30M295 173v30M330 173v30M365 173v30M398 173v30" class="ln" stroke="#5f6e86" stroke-width="7"/>`;
};

const POTX = [165, 222, 279, 336];
const pot = (x) => `<path d="M${x - 18} 238 H${x + 18} L${x + 13} 266 H${x - 13}Z" fill="#d98a5a" ${O}/><rect x="${x - 20}" y="234" width="40" height="8" rx="3" fill="#e79a68" ${O2}/><ellipse cx="${x}" cy="240" rx="15" ry="3.5" fill="#6b4a36"/>`;
const pousse = (x, y, c = '#4fae5c') => `<path d="M${x} ${y} Q${x - 1} ${y - 8} ${x} ${y - 13}" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/><ellipse cx="${x - 6}" cy="${y - 14}" rx="6" ry="3.5" transform="rotate(-25 ${x - 6} ${y - 14})" fill="${c}" ${O2}/><ellipse cx="${x + 6}" cy="${y - 15}" rx="6" ry="3.5" transform="rotate(25 ${x + 6} ${y - 15})" fill="${c}" ${O2}/>`;
const leaf = (x, y, rot, c, rx = 8, ry = 5) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${x} ${y})" fill="${c}" ${O2}/>`;

const bokchoy = (x, y, st, au) => {
  const g = au ? '#a9a548' : '#4fae5c';
  if (st === 1) return pousse(x, y, g);
  if (st === 2) return leaf(x - 7, y - 14, -40, g, 9, 5) + leaf(x + 7, y - 14, 40, g, 9, 5) + leaf(x, y - 20, 90, g, 11, 6);
  if (st >= 3) return [-15, -8, 0, 8, 15].map((d) => limb(x, y, x + d * 0.8, y - 26, 6, '#e8f1c4')).join('') + [-15, -8, 0, 8, 15].map((d) => leaf(x + d * 1.2, y - 36, d * 3, g, 8, 13)).join('');
  return '';
};
const tomate = (x, y, st, ripe, au) => {
  const g = au ? '#a9a548' : '#4fae5c';
  if (st === 1) return pousse(x, y, g);
  if (st === 2) return limb(x, y, x, y - 36, 3, '#3b8a3e') + leaf(x - 8, y - 22, -30, g) + leaf(x + 8, y - 30, 30, g) + leaf(x, y - 40, 90, g, 7, 5);
  if (st >= 3) {
    const spots = [[-11, -36], [11, -50], [-7, -62], [12, -26]];
    return limb(x, y, x, y - 78, 3, '#8a6a4a') + limb(x, y, x, y - 70, 3, '#3b8a3e')
      + leaf(x - 12, y - 44, -25, g, 11, 6) + leaf(x + 12, y - 58, 25, g, 11, 6) + leaf(x - 10, y - 70, -35, g, 10, 6) + leaf(x + 9, y - 34, 20, g, 9, 5)
      + spots.map(([dx, dy], i) => `<circle cx="${x + dx}" cy="${y + dy + 8}" r="7.5" fill="${i < ripe ? '#e0452f' : '#8ccf6a'}" ${O2}/>`).join('');
  }
  return '';
};
const haricot = (x, y, st, au) => {
  const g = au ? '#b8a845' : '#4fae5c';
  if (st === 1) return pousse(x, y, g);
  if (st === 2) return limb(x, y, x, y - 50, 3, '#8a6a4a') + `<path d="M${x} ${y} Q${x - 8} ${y - 15} ${x} ${y - 25} Q${x + 8} ${y - 35} ${x} ${y - 45}" fill="none" stroke="${g}" stroke-width="3"/>` + leaf(x - 8, y - 28, -30, g) + leaf(x + 8, y - 40, 30, g);
  if (st >= 3) {
    return limb(x, y, x, y - 96, 3, '#8a6a4a')
      + `<path d="M${x} ${y} Q${x - 12} ${y - 18} ${x} ${y - 32} Q${x + 12} ${y - 48} ${x} ${y - 62} Q${x - 12} ${y - 76} ${x} ${y - 90}" fill="none" stroke="#3b8a3e" stroke-width="3"/>`
      + leaf(x - 11, y - 24, -30, g) + leaf(x + 11, y - 42, 30, g) + leaf(x - 11, y - 58, -30, g) + leaf(x + 11, y - 74, 30, g) + leaf(x, y - 94, 90, g, 8, 5)
      + [[-12, -34], [13, -52], [-11, -68]].map(([dx, dy]) => limb(x + dx, y + dy, x + dx + (dx < 0 ? 1 : -1), y + dy + 24, 5, '#7bc65a')).join('');
  }
  return '';
};
const tournesol = (x, y, st, au) => {
  const g = au ? '#a9a548' : '#4fae5c';
  if (st === 1) return pousse(x, y, g);
  if (st === 2) return limb(x, y, x, y - 50, 4, '#3b8a3e') + leaf(x - 10, y - 26, -30, g, 10, 6) + leaf(x + 10, y - 38, 30, g, 10, 6);
  if (st === 3) {
    const fy = y - 118;
    return limb(x, y, x, fy, 5, '#3b8a3e') + leaf(x - 13, y - 40, -30, g, 13, 7) + leaf(x + 13, y - 66, 30, g, 13, 7)
      + `<defs><ellipse id="pt" cx="${x}" cy="${fy - 20}" rx="6" ry="11" fill="#ffc933" ${O2}/></defs>` + Array.from({ length: 12 }, (_, i) => `<use href="#pt" transform="rotate(${i * 30} ${x} ${fy})"/>`).join('')
      + `<circle cx="${x}" cy="${fy}" r="13" fill="#7a4a2a" ${O}/><circle cx="${x - 4}" cy="${fy - 3}" r="2" fill="#a56a3e"/><circle cx="${x + 4}" cy="${fy + 3}" r="2" fill="#a56a3e"/>`;
  }
  if (st === 4) {
    const fx = x - 22, fy = y - 98;
    return `<path d="M${x} ${y} Q${x + 6} ${y - 70} ${fx + 4} ${fy + 10}" fill="none" stroke="#3a3f55" stroke-width="9" stroke-linecap="round"/><path d="M${x} ${y} Q${x + 6} ${y - 70} ${fx + 4} ${fy + 10}" fill="none" stroke="#8a9a3e" stroke-width="5" stroke-linecap="round"/>`
      + leaf(x + 12, y - 40, 30, g, 12, 6)
      + Array.from({ length: 8 }, (_, i) => `<ellipse cx="${fx}" cy="${fy - 20}" rx="5" ry="9" transform="rotate(${i * 45 + 20} ${fx} ${fy})" fill="#d9a62e" ${O2}/>`).join('')
      + `<circle cx="${fx}" cy="${fy}" r="18" fill="#6b4226" ${O}/>` + [[-7, -5], [5, -8], [-3, 4], [8, 3], [-9, 7], [2, 11], [11, -3]].map(([dx, dy]) => `<ellipse cx="${fx + dx}" cy="${fy + dy}" rx="2" ry="3" fill="#cfc5b0"/>`).join('');
  }
  return '';
};
const jardin = ({ b = 0, t = 0, h = 0, s = 0, ripe = 0, au = false, graines = false } = {}) => POTX.map((x, i) => pot(x)
  + (graines ? [-8, 0, 8].map((d) => `<circle cx="${x + d}" cy="${240 + (d === 0 ? 1 : 0)}" r="2" fill="#e8d7a0"/>`).join('') : '')
  + [bokchoy(x, 240, b, au), tomate(x, 240, t, ripe, au), haricot(x, 240, h, au), tournesol(x, 240, s, au)][i]).join('');

const bol = (x, y) => `<path d="M${x - 14} ${y - 8} H${x + 14} Q${x + 12} ${y + 6} ${x} ${y + 6} Q${x - 12} ${y + 6} ${x - 14} ${y - 8}Z" fill="#6aa5d9" ${O2}/>${[-8, -2, 5, 10, -4].map((d, i) => `<ellipse cx="${x + d}" cy="${y - 9 - (i % 2) * 3}" rx="5" ry="3.6" fill="#a9733a" ${O2}/>`).join('')}`;
const panier = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
<path d="M-24 -34 Q0 -66 24 -34" fill="none" ${O}/>
${leaf(-12, -34, -20, '#4fae5c', 11, 16)}${leaf(2, -38, 5, '#5fbe6a', 10, 17)}
<circle cx="14" cy="-30" r="8" fill="#e0452f" ${O2}/><circle cx="-2" cy="-27" r="8" fill="#e0452f" ${O2}/><circle cx="-18" cy="-28" r="7" fill="#d9381f" ${O2}/>
<path d="M-8 -30 q-4 -10 8 -16 M10 -30 q8 -8 18 -4" fill="none" stroke="#7bc65a" stroke-width="5" stroke-linecap="round"/>
<path d="M-28 -30 H28 L22 0 H-22Z" fill="#d6a56a" ${O}/><path d="M-26 -20 H26 M-24 -10 H24" stroke="#a9794e" stroke-width="2"/></g>`;
const packets = (x, y) => [[-12, -12, '#f4a259'], [0, -6, '#5fbe6a'], [12, -12, '#e8604c']].map(([dx, rot, c]) => `<g transform="translate(${x + dx} ${y}) rotate(${rot})"><rect x="-8" y="-14" width="16" height="24" rx="2" fill="${c}" ${O2}/><circle cx="0" cy="-2" r="4" fill="#fff6d8"/></g>`).join('');
const arrosoir = (x, y) => `<path d="M${x - 10} ${y - 10} H${x + 10} L${x + 8} ${y + 10} H${x - 8}Z" fill="#6aa5d9" ${O2}/><path d="M${x + 10} ${y - 4} L${x + 26} ${y - 14}" stroke="#3a3f55" stroke-width="7" stroke-linecap="round"/><path d="M${x + 10} ${y - 4} L${x + 26} ${y - 14}" stroke="#6aa5d9" stroke-width="4" stroke-linecap="round"/><path d="M${x - 10} ${y - 4} q-12 -4 -6 -14 q4 -2 8 2" fill="none" ${O2}/>${[[32, 4], [37, 10], [30, 12], [41, 3]].map(([dx, dy]) => `<path d="M${x + dx} ${y + dy - 6} q2 4 0 7 q-2 -3 0 -7Z" fill="#7cc8f5" stroke="#3a3f55" stroke-width="1.2"/>`).join('')}`;

// ---------- pages ----------
const couverture = svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 2 })}${ecureuil(122, 166, 0.7, 'noix')}${mei(48, 292, 1.1, 'laugh', 'up')}${papa(104, 292, 1.1, 'smile', 'down', true)}`);

export const book = {
  id: 'jardin-de-grand-papa',
  title: 'Le jardin de Grand-papa Wen',
  emoji: '🌻',
  level: 2,
  minutes: 8,
  cover: couverture,
  pages: [
    { svg: svg(`${balcon('spring')}${jardin()}${mei(48, 292, 1.1, 'smile', 'pointR')}${papa(104, 292, 1.1, 'smile')}`),
      text: 'Mei habite à Montréal, dans un petit appartement, avec son grand-papa Wen. Sur leur balcon, il y a quatre pots vides. « Ils attendent quelque chose », dit Mei.' },
    { svg: svg(`${balcon('spring')}${jardin()}${papa(104, 292, 1.1, 'laugh', 'reachR')}${packets(150, 232)}${mei(44, 292, 1.1, 'wow', 'up')}`),
      text: 'Un matin de printemps, Grand-papa arrive avec des sachets de graines. « Hǎo! Avec de la terre, de l\'eau et du soleil, tout peut pousser », dit-il. Mei ouvre de grands yeux.' },
    { svg: svg(`${balcon('spring')}${jardin({ graines: true })}<path d="M126 292 L128 262 H152 L154 292Z" fill="#8a5a36" ${O}/><path d="M126 268 Q140 258 154 268" fill="none" stroke="#a9794e" stroke-width="3"/>${mei(44, 292, 1.1, 'laugh', 'pointR')}${papa(98, 292, 1.1, 'smile', 'hold')}`),
      text: 'Ils mettent de la terre dans les pots. Mei dépose les graines de bok choy, de tomates, de haricots et de tournesol. Grand-papa les recouvre doucement.' },
    { svg: svg(`${balcon('spring')}${jardin()}${mei(82, 292, 1.1, 'sad', 'pointR')}${arrosoir(128, 222)}${papa(32, 292, 1.1, 'laugh', 'down')}`),
      text: 'Chaque matin, Mei arrose ses pots. Mais rien ne pousse! « Patience, ma petite fleur », dit Grand-papa en riant.' },
    { svg: svg(`${balcon('spring')}${jardin({ b: 1, t: 1, h: 1, s: 1 })}${mei(60, 280, 1.1, 'laugh', 'up')}${papa(112, 292, 1.1, 'laugh')}`),
      text: 'Un jour, quatre petites pousses vertes sortent de la terre! Mei saute de joie. Grand-papa sourit de toutes ses dents.' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 2 })}${mei(48, 292, 1.1, 'wow', 'pointR')}${papa(104, 292, 1.1, 'smile', 'down', true)}`),
      text: 'L\'été arrive avec un grand soleil. Le bok choy est large, les haricots grimpent et le tournesol est plus grand que Mei. Les tomates deviennent rouges.' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 1 })}${ecureuil(250, 167, 1.05, 'tomate', true)}${mei(48, 292, 1.1, 'wow', 'pointR')}${papa(104, 292, 1.1, 'wow', 'down', true)}`),
      text: 'Un matin, un écureuil saute sur la balustrade. Il attrape une belle tomate rouge et file avec!' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 1 })}${ecureuil(372, 167, 1, 'tomate', true)}${mei(48, 292, 1.1, 'angry', 'up')}${papa(104, 292, 1.1, 'laugh', 'down', true)}`),
      text: '« Mes tomates! » crie Mei, fâchée. « Il a faim, lui aussi », dit Grand-papa en riant. Mei réfléchit longtemps.' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 1 })}${bol(132, 160)}${mei(54, 292, 1.1, 'laugh', 'reachR')}${papa(104, 292, 1.1, 'smile', 'down', true)}`),
      text: 'Mei a une idée! Elle met un bol de noix sur la balustrade, loin des tomates. « Hǎo, hǎo! » dit Grand-papa.' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 2 })}${bol(132, 160)}${ecureuil(150, 163, 1, 'noix', false, true)}${mei(40, 292, 1.1, 'smile', 'down')}${papa(88, 292, 1.1, 'smile', 'down', true)}`),
      text: 'L\'écureuil revient et goûte les noix. Il remplit ses joues et ne touche plus aux tomates. Mei et Grand-papa le regardent sans faire de bruit.' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 2, t: 3, h: 3, s: 3, ripe: 0 })}${panier(150, 292, 1.5)}${mei(44, 292, 1.1, 'laugh', 'pointR')}${papa(96, 292, 1.1, 'laugh', 'hold', true)}`),
      text: 'À la fin de l\'été, le panier est plein : bok choy, tomates et haricots. Il y en a beaucoup trop pour deux! Mei a envie de partager.' },
    { svg: svg(`<rect width="400" height="300" fill="#fbe3b9"/><rect y="215" width="400" height="85" fill="#e9c58f"/>
<rect x="268" y="30" width="100" height="100" fill="#c6e7f7" ${O}/><path d="M268 80 H368 M318 30 V130" stroke="#3a3f55" stroke-width="3"/><rect x="290" y="90" width="22" height="40" fill="#d7b8a8"/><rect x="335" y="70" width="25" height="60" fill="#b9c3dd"/>
<rect x="20" y="40" width="90" height="10" fill="#a9794e" ${O2}/><ellipse cx="45" cy="30" rx="14" ry="10" fill="#e0452f" ${O2}/><circle cx="85" cy="32" r="10" fill="#5fbe6a" ${O2}/>
${mei(120, 292, 1.5, 'smile', 'hold')}${papa(215, 292, 1.5, 'laugh', 'hold')}
<g transform="translate(0 34)"><rect x="0" y="205" width="400" height="95" fill="#d9a066" ${O}/><rect x="0" y="205" width="400" height="14" fill="#e8b97f" ${O2}/>
<ellipse cx="50" cy="228" rx="34" ry="11" fill="#fff" ${O2}/>${[[-18, -1], [0, 1], [18, -1], [-8, -6], [10, -6]].map(([dx, dy]) => `<path d="M${50 + dx - 9} ${228 + dy} Q${50 + dx} ${228 + dy - 12} ${50 + dx + 9} ${228 + dy}Z" fill="#fff4dc" ${O2}/>`).join('')}
<circle cx="245" cy="230" r="14" fill="#fff4dc" ${O2}/><rect x="262" y="222" width="46" height="12" rx="6" fill="#d6a56a" ${O2}/>
<ellipse cx="345" cy="240" rx="34" ry="12" fill="#d6a56a" ${O}/><rect x="311" y="212" width="68" height="28" fill="#e6bd7e" ${O}/><ellipse cx="345" cy="212" rx="34" ry="11" fill="#c9954f" ${O}/>
<path d="M330 198 q-8 -10 0 -18 q8 -8 0 -18 M350 198 q-8 -10 0 -18 q8 -8 0 -18" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"/>
</g>`),
      text: 'Dans la cuisine, Grand-papa prépare la pâte et Mei plie les raviolis chinois. Ils les font cuire à la vapeur avec du bok choy. Ça sent tellement bon!' },
    { svg: svg(`<rect width="400" height="300" fill="#f5d6dc"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 50 + 10}" y="0" width="14" height="250" fill="#efc3cd"/>`).join('')}
<rect y="248" width="400" height="52" fill="#a07a5c"/><rect y="244" width="400" height="8" fill="#7a5a44" ${O2}/>
<rect x="212" y="36" width="130" height="212" fill="#7a5a44" ${O}/><rect x="222" y="46" width="110" height="202" fill="#ffe9b8"/>
<rect x="232" y="70" width="34" height="42" fill="#fff" ${O2}/><circle cx="249" cy="88" r="10" fill="#8ccf6a" ${O2}/><path d="M300 248 v-50 h20 v50" fill="#d98a5a" ${O2}/><circle cx="310" cy="190" r="12" fill="#5fbe6a" ${O2}/>
<path d="M212 36 L172 52 V248 L212 248Z" fill="#9b6a44" ${O}/><circle cx="184" cy="150" r="4" fill="#ffd84a" ${O2}/>
${voisine(276, 250, 1.1, 'laugh')}
${mei(60, 288, 1.2, 'smile', 'pointR')}<ellipse cx="108" cy="218" rx="24" ry="8" fill="#fff" ${O2}/>${[-12, 0, 12].map((d) => `<path d="M${108 + d - 8} 217 Q${108 + d} 205 ${108 + d + 8} 217Z" fill="#fff4dc" ${O2}/>`).join('')}
${papa(142, 288, 1.2, 'smile', 'pointR', true)}${panier(190, 246, 0.8)}`),
      text: 'Ils frappent chez Madame Roy, leur voisine. Mei lui offre des raviolis chauds, et Grand-papa, des tomates et des haricots. Madame Roy est si contente qu\'elle les serre dans ses bras.' },
    { svg: svg(`${balcon('autumn')}${jardin({ b: 0, t: 3, h: 3, s: 4, ripe: 0, au: true })}${ecureuil(266, 167, 0.9, 'noix', true, true)}
${mei(48, 292, 1.1, 'laugh', 'up')}${papa(104, 292, 1.1, 'smile', 'down', false)}`),
      text: 'En automne, le tournesol baisse la tête, rempli de graines. Mei et Grand-papa en gardent pour le printemps et en laissent à l\'écureuil. « L\'an prochain, on plante encore! » dit Mei.' },
  ],
  words: [
    { word: 'la graine', emoji: '🌰', def: 'Une petite chose dure qu\'on met dans la terre pour faire pousser une plante.' },
    { word: 'la pousse', emoji: '🌱', def: 'La toute petite plante qui sort de la terre.' },
    { word: 'le bok choy', emoji: '🥬', def: 'Un légume chinois aux tiges blanches et aux feuilles vertes.' },
    { word: 'arroser', emoji: '💦', def: 'Verser de l\'eau sur une plante pour qu\'elle ne soit pas assoiffée.' },
    { word: 'la balustrade', emoji: '🚧', def: 'La barrière du balcon, qui empêche de tomber.' },
    { word: 'le tournesol', emoji: '🌻', def: 'Une grande fleur jaune qui tourne vers le soleil.' },
    { word: 'partager', emoji: '🤝', def: 'Donner une partie de ce qu\'on a aux autres.' },
    { word: 'la voisine', emoji: '👵', def: 'La dame qui habite tout près de chez nous.' },
    { word: 'la vapeur', emoji: '♨️', def: 'La fumée chaude et mouillée qui monte de l\'eau bouillante.' },
  ],
  quiz: [
    { q: 'Avec qui Mei habite-t-elle?', options: ['Avec son grand-papa Wen', 'Avec sa tante', 'Avec Madame Roy'], answer: 0 },
    { q: 'Où est le jardin de Mei et de Grand-papa?', options: ['Dans un parc', 'Sur un balcon', 'Dans la cour de l\'école'], answer: 1 },
    { q: 'Que fait Mei chaque matin au printemps?', options: ['Elle cueille des tomates', 'Elle joue avec l\'écureuil', 'Elle arrose ses pots'], answer: 2 },
    { q: 'Qui vole une tomate rouge?', options: ['Un écureuil', 'Un oiseau', 'Un chat'], answer: 0 },
    { q: 'Que veut dire « patience »? ', options: ['Courir très vite', 'Attendre calmement', 'Manger beaucoup'], answer: 1 },
    { q: 'Comment Mei règle-t-elle le problème de l\'écureuil?', options: ['Elle cache les tomates', 'Elle met un filet sur les pots', 'Elle lui donne un bol de noix'], answer: 2 },
    { q: 'Que font Mei et Grand-papa avec les légumes en trop?', options: ['Ils les partagent avec leur voisine', 'Ils les jettent', 'Ils les vendent au marché'], answer: 0 },
    { q: 'Qu\'est-ce que Mei ressent quand l\'écureuil prend la tomate?', options: ['Elle est fâchée', 'Elle a peur', 'Elle est endormie'], answer: 0 },
  ],
};
