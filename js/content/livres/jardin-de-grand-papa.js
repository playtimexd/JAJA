// « Le jardin de Grand-papa Wen » — niveau 2
const O = 'class="k3"';
const O2 = 'class="k2"';
const DEFS = `<defs>
<linearGradient id="skyspring" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ccdf3"/><stop offset="1" stop-color="#e4f5fb"/></linearGradient>
<linearGradient id="skysummer" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55b6ee"/><stop offset="1" stop-color="#d5f0fb"/></linearGradient>
<linearGradient id="skyautumn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9b77d"/><stop offset="1" stop-color="#fbe9c4"/></linearGradient>
<radialGradient id="sunglow"><stop offset="0" stop-color="#fff3a8" stop-opacity=".9"/><stop offset="1" stop-color="#fff3a8" stop-opacity="0"/></radialGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bf8e58"/><stop offset="1" stop-color="#dcb07a"/></linearGradient>
<linearGradient id="coat" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f0725c"/><stop offset=".65" stop-color="#e45a46"/><stop offset="1" stop-color="#c94a3a"/></linearGradient>
<linearGradient id="vest" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6bb583"/><stop offset="1" stop-color="#4a8f63"/></linearGradient>
<linearGradient id="cardi" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ab82c4"/><stop offset="1" stop-color="#8a5fa6"/></linearGradient>
<radialGradient id="skinM" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fbd9b8"/><stop offset="1" stop-color="#eeb98c"/></radialGradient>
<radialGradient id="skinP" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#f6cfa4"/><stop offset="1" stop-color="#e2a876"/></radialGradient>
<radialGradient id="skinV" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fbdcc2"/><stop offset="1" stop-color="#ecb995"/></radialGradient>
<linearGradient id="fur" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d98c4c"/><stop offset="1" stop-color="#b8662f"/></linearGradient>
<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde9c3"/><stop offset="1" stop-color="#f7d49c"/></linearGradient>
<linearGradient id="hall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7d3dc"/><stop offset="1" stop-color="#f0bccb"/></linearGradient>
<radialGradient id="warm" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#fff0b8"/><stop offset="1" stop-color="#ffd890"/></radialGradient>
</defs>`;
const svg = (s) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${DEFS}<style>.k3,.k2{stroke:#3a3f55;stroke-linejoin:round;stroke-linecap:round}.k3{stroke-width:3}.k2{stroke-width:2}.ln{fill:none;stroke-linecap:round;stroke-linejoin:round}</style>${s}</svg>`;
const limb = (a, b, c, d, w, col) => `<path d="M${a} ${b}L${c} ${d}" class="ln" stroke="#3a3f55" stroke-width="${w + 4}"/><path d="M${a} ${b}L${c} ${d}" class="ln" stroke="${col}" stroke-width="${w}"/>`;
const arm = (sx, sy, ex, ey, hx, hy, col, skin) => `<path d="M${sx} ${sy}L${ex} ${ey}L${hx} ${hy}" class="ln" stroke="#3a3f55" stroke-width="12"/><path d="M${sx} ${sy}L${ex} ${ey}L${hx} ${hy}" class="ln" stroke="${col}" stroke-width="8"/><circle cx="${hx}" cy="${hy}" r="5.2" fill="${skin}" ${O2}/>`;

// ---------- visages ----------
const eye = (x, k = 1) => `<ellipse cx="${x}" cy="0" rx="3.6" ry="${(4.2 * k).toFixed(1)}" fill="#2f3248"/><circle cx="${x + 1.2}" cy="${(-1.6 * k).toFixed(1)}" r="1.5" fill="#fff"/><circle cx="${x - 1.3}" cy="${(1.9 * k).toFixed(1)}" r=".8" fill="#fff" opacity=".8"/>`;
const face = (m, brow = '#4a3a3a') => {
  const cheeks = `<circle cx="-13.5" cy="7" r="4.2" fill="#f28b82" opacity="${m === 'angry' ? '.8' : '.5'}"/><circle cx="13.5" cy="7" r="4.2" fill="#f28b82" opacity="${m === 'angry' ? '.8' : '.5'}"/>`;
  const nose = '<path d="M-1.8 5 Q0 7.4 1.8 5" fill="none" stroke="#c98a68" stroke-width="1.6" stroke-linecap="round"/>';
  const B = (d) => `<path d="${d}" fill="none" stroke="${brow}" stroke-width="2.2" stroke-linecap="round"/>`;
  let eyes = eye(-8) + eye(8), brows = B('M-12 -9 Q-8 -12 -4 -9 M4 -9 Q8 -12 12 -9'), mouth = `<path d="M-5.5 9.5 Q0 15 5.5 9.5" fill="none" ${O2}/>`;
  if (m === 'laugh') {
    eyes = `<path d="M-12.5 1 Q-8 -5.5 -3.5 1 M3.5 1 Q8 -5.5 12.5 1" fill="none" ${O2}/>`;
    brows = B('M-12 -9 Q-8 -13 -4 -10 M4 -10 Q8 -13 12 -9');
    mouth = `<path d="M-7.5 8 Q0 22 7.5 8Z" fill="#8e2f3a" ${O2}/><ellipse cx="0" cy="13" rx="3.6" ry="2" fill="#e8737e"/>`;
  }
  if (m === 'joy') {
    eyes = eye(-8, 1.15) + eye(8, 1.15);
    brows = B('M-12 -10 Q-8 -14 -4 -11 M4 -11 Q8 -14 12 -10');
    mouth = `<path d="M-7.5 8 Q0 22 7.5 8Z" fill="#8e2f3a" ${O2}/><ellipse cx="0" cy="13" rx="3.6" ry="2" fill="#e8737e"/>`;
  }
  if (m === 'wow') {
    eyes = eye(-8, 1.3) + eye(8, 1.3);
    brows = B('M-12 -12 Q-8 -16 -4 -12 M4 -12 Q8 -16 12 -12');
    mouth = `<ellipse cx="0" cy="12.5" rx="3.6" ry="4.6" fill="#8e2f3a" ${O2}/>`;
  }
  if (m === 'sad') {
    brows = B('M-12 -6 L-4 -10.5 M12 -6 L4 -10.5');
    mouth = `<path d="M-5.5 14 Q0 8.5 5.5 14" fill="none" ${O2}/><path d="M-10 6 q-2.2 4 0 6.5 q2.2 -2.5 0 -6.5Z" fill="#8fd3f7" stroke="#3a3f55" stroke-width="1"/>`;
  }
  if (m === 'angry') {
    brows = B('M-13 -11 L-4 -6 M13 -11 L4 -6');
    mouth = `<path d="M-6 13 Q0 8 6 13" fill="none" ${O2}/>`;
  }
  if (m === 'think') {
    brows = B('M-12 -8 Q-8 -10 -4 -8 M4 -12 Q8 -15 12 -11');
    mouth = `<path d="M-3 11 Q2 12 5.5 8.5" fill="none" ${O2}/>`;
  }
  return cheeks + eyes + brows + nose + mouth;
};

// poses : [bras gauche (écran), bras droit] = [coude x, coude y, main x, main y]
const POSE = {
  down: [[-21, -44, -22, -27], [21, -44, 22, -27]],
  up: [[-30, -70, -32, -94], [30, -70, 32, -94]],
  pointR: [[-21, -44, -22, -27], [30, -60, 50, -66]],
  reachR: [[-21, -44, -22, -27], [28, -48, 44, -44]],
  reachL: [[-28, -48, -44, -44], [21, -44, 22, -27]],
  hold: [[-22, -44, -9, -38], [22, -44, 9, -38]],
  wide: [[-32, -52, -46, -72], [32, -52, 46, -72]],
  hips: [[-26, -44, -14, -34], [26, -44, 14, -34]],
};
const arms = (pose, col, skin) => POSE[pose].map(([ex, ey, hx, hy], i) => arm(i ? 15 : -15, -58, ex, ey, hx, hy, col, skin)).join('');
const shoes = (c) => `<ellipse cx="-8.5" cy="-2" rx="9.5" ry="5" fill="${c}" ${O2}/><ellipse cx="8.5" cy="-2" rx="9.5" ry="5" fill="${c}" ${O2}/><path d="M-13 -4 q4 -2 8 0 M4 -4 q4 -2 8 0" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/>`;
const shadow = '<ellipse cx="0" cy="2" rx="32" ry="6" fill="#2b2b3a" opacity=".17"/>';

// ---------- personnages ----------
// Mei : manteau rouge, pantalon bleu, deux chignons noirs
const mei = (x, y, s = 1, mood = 'smile', pose = 'down', held = '') => `<g transform="translate(${x} ${y}) scale(${s})">${shadow}
${limb(-7, -32, -7, -6, 11, '#4a6fa5')}${limb(7, -32, 7, -6, 11, '#4a6fa5')}${shoes('#d9534f')}
<path d="M-19 -28 Q-22 -48 -15 -64 Q0 -69 15 -64 Q22 -48 19 -28 Q0 -23 -19 -28Z" fill="url(#coat)" ${O}/>
<path d="M-18 -33 Q0 -28 18 -33" fill="none" stroke="#b83f31" stroke-width="2"/><path d="M-9 -65 L0 -56 L9 -65" fill="#fff6e8" ${O2}/>
<circle cx="0" cy="-50" r="2.2" fill="#ffd84a" stroke="#3a3f55" stroke-width="1"/><circle cx="0" cy="-41" r="2.2" fill="#ffd84a" stroke="#3a3f55" stroke-width="1"/>
${arms(pose, '#e8604c', '#f6c9a0')}${held}
<circle cx="-19" cy="-100" r="9.5" fill="#2b2b3a" ${O}/><circle cx="19" cy="-100" r="9.5" fill="#2b2b3a" ${O}/><circle cx="-19" cy="-92" r="3" fill="#e0452f" ${O2}/><circle cx="19" cy="-92" r="3" fill="#e0452f" ${O2}/>
<circle cx="0" cy="-82" r="22" fill="url(#skinM)" ${O}/>
<path d="M-22 -84 Q-26 -109 0 -106 Q26 -109 22 -84 Q17 -97 8 -95 Q3 -90 -2 -94 Q-14 -97 -22 -84Z" fill="#2b2b3a" ${O2}/><path d="M-12 -101 Q-4 -105 4 -102" fill="none" stroke="#6a6a88" stroke-width="2" stroke-linecap="round"/>
<g transform="translate(0 -80)">${face(mood, '#2b2b3a')}</g></g>`;

// Grand-papa Wen : gilet vert, pantalon brun, cheveux blancs, lunettes rondes, moustache
const papa = (x, y, s = 1, mood = 'smile', pose = 'down', hat = false, held = '') => `<g transform="translate(${x} ${y}) scale(${s})">${shadow}
${limb(-8, -32, -8, -6, 12, '#8a6a4a')}${limb(8, -32, 8, -6, 12, '#8a6a4a')}${shoes('#4a3b32')}
<path d="M-20 -26 Q-22 -48 -17 -64 Q0 -69 17 -64 Q22 -48 20 -26 Q0 -22 -20 -26Z" fill="#fff1d6" ${O}/>
<path d="M-17 -64 Q-21 -62 -20 -26 L-4 -28 L-3 -55Z M17 -64 Q21 -62 20 -26 L4 -28 L3 -55Z" fill="url(#vest)" ${O2}/>
<circle cx="-9" cy="-44" r="1.8" fill="#ffd84a"/><circle cx="-9" cy="-35" r="1.8" fill="#ffd84a"/><path d="M-8 -66 L0 -54 L8 -66" fill="#fff" ${O2}/>
${arms(pose, '#5a9e6f', '#f2c394')}${held}
<circle cx="-21" cy="-82" r="8" fill="#f4f4f4" ${O2}/><circle cx="21" cy="-82" r="8" fill="#f4f4f4" ${O2}/>
<circle cx="-21" cy="-78" r="4" fill="#f2c394" ${O2}/><circle cx="21" cy="-78" r="4" fill="#f2c394" ${O2}/>
<circle cx="0" cy="-82" r="22" fill="url(#skinP)" ${O}/>
<path d="M-18 -92 Q0 -102 18 -92 Q10 -97 0 -96 Q-10 -97 -18 -92Z" fill="#f4f4f4" ${O2}/>
<g transform="translate(0 -80)">${face(mood, '#c9c9d4')}
<circle cx="-8" cy="0" r="7" fill="#fff" fill-opacity=".25" ${O2}/><circle cx="8" cy="0" r="7" fill="#fff" fill-opacity=".25" ${O2}/><path d="M-1 -1 h2" ${O2}/>
<path d="M-9 8 Q-4 4 0 6.5 Q4 4 9 8 Q4 11 0 9 Q-4 11 -9 8Z" fill="#f4f4f4" stroke="#3a3f55" stroke-width="1.6"/>
<path d="M-17 -6 q-2 2 0 4 M17 -6 q2 2 0 4" fill="none" stroke="#c98a68" stroke-width="1"/></g>
${hat ? `<ellipse cx="0" cy="-96" rx="33" ry="8" fill="#e8c46a" ${O}/><path d="M-17 -98 Q-17 -122 0 -122 Q17 -122 17 -98Z" fill="#f0d27e" ${O}/><path d="M-17 -101 Q0 -97 17 -101" fill="none" stroke="#c0392b" stroke-width="4"/><path d="M-26 -97 q10 3 20 0 M6 -97 q10 3 20 0" fill="none" stroke="#c9a14a" stroke-width="1.5"/>` : ''}
</g>`;

// Madame Roy, la voisine : cardigan mauve, chignon gris
const voisine = (x, y, s = 1, mood = 'laugh', pose = 'wide', held = '') => `<g transform="translate(${x} ${y}) scale(${s})">${shadow}
${limb(-6, -30, -6, -6, 10, '#e9dcc9')}${limb(6, -30, 6, -6, 10, '#e9dcc9')}${shoes('#7b4a6e')}
<path d="M-22 -24 L-17 -64 Q0 -70 17 -64 L22 -24 Q0 -20 -22 -24Z" fill="url(#cardi)" ${O}/><path d="M0 -62 V-24" stroke="#6d4a8e" stroke-width="2.5"/>
<circle cx="-4" cy="-52" r="1.8" fill="#f4e4a8"/><circle cx="-4" cy="-42" r="1.8" fill="#f4e4a8"/><circle cx="-4" cy="-33" r="1.8" fill="#f4e4a8"/>
<path d="M-9 -65 Q0 -56 9 -65" fill="none" stroke="#fff6e8" stroke-width="3"/>${[-6, -2, 2, 6].map((d) => `<circle cx="${d}" cy="${-59 + Math.abs(d) * 0.3}" r="1.6" fill="#fff6e8" stroke="#3a3f55" stroke-width=".6"/>`).join('')}
${arms(pose, '#9b6fb5', '#f6d2b4')}${held}
<circle cx="0" cy="-104" r="10" fill="#c4c4d2" ${O}/>
<circle cx="0" cy="-82" r="22" fill="url(#skinV)" ${O}/>
<path d="M-22 -84 Q-24 -106 0 -104 Q24 -106 22 -84 Q14 -94 0 -92 Q-14 -94 -22 -84Z" fill="#c4c4d2" ${O2}/>
<g transform="translate(0 -80)">${face(mood, '#9a9aa8')}
<circle cx="-8" cy="0" r="6.5" fill="#fff" fill-opacity=".25" ${O2}/><circle cx="8" cy="0" r="6.5" fill="#fff" fill-opacity=".25" ${O2}/><path d="M-1.5 -1 h3" ${O2}/></g></g>`;

// L'écureuil : fourrure rousse, queue touffue
const ecureuil = (x, y, s = 1, item = '', flip = false, stuffed = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})">
<ellipse cx="0" cy="1" rx="24" ry="3.5" fill="#2b2b3a" opacity=".16"/>
<path d="M-6 -6 C-50 0 -52 -76 -16 -66 C-34 -52 -28 -30 -4 -22Z" fill="url(#fur)" ${O}/>
<path d="M-24 -62 C-34 -50 -30 -34 -14 -26 M-34 -48 C-38 -34 -30 -16 -12 -14" fill="none" stroke="#f0b27a" stroke-width="2" stroke-linecap="round" opacity=".8"/>
<ellipse cx="0" cy="-20" rx="14" ry="19" fill="url(#fur)" ${O}/><ellipse cx="4" cy="-17" rx="8.5" ry="13" fill="#f7e3c0"/>
<ellipse cx="2" cy="-3" rx="13" ry="4.5" fill="#b5652f" ${O2}/>
<path d="M0 -52 L-3 -68 L9 -56Z M12 -55 L19 -69 L21 -53Z" fill="#c7793f" ${O2}/><path d="M-1 -56 L-2 -63 L4 -57Z M14 -57 L18 -64 L19 -56Z" fill="#f2b6a0"/>
<circle cx="8" cy="-44" r="13" fill="url(#fur)" ${O}/>
<ellipse cx="14" cy="-38" rx="8" ry="6" fill="#f7e3c0"/>
${stuffed ? '<ellipse cx="17" cy="-38" rx="8.5" ry="7.5" fill="#e6a266" stroke="#3a3f55" stroke-width="2"/>' : ''}
<circle cx="11" cy="-47" r="3" fill="#2f3248"/><circle cx="12" cy="-48.2" r="1.1" fill="#fff"/>
<ellipse cx="21" cy="-41" rx="2.4" ry="1.8" fill="#3a3f55"/>
${stuffed ? '' : '<path d="M14 -36 Q18 -33 22 -37" fill="none" stroke="#3a3f55" stroke-width="1.6" stroke-linecap="round"/>'}
<path d="M18 -42 l9 -2 M18 -40 l9 1" stroke="#3a3f55" stroke-width=".9" fill="none"/>
${item === 'tomate' ? `<circle cx="16" cy="-24" r="9" fill="#e0452f" ${O2}/><circle cx="13" cy="-27" r="2.4" fill="#fff" opacity=".6"/><path d="M11 -31 L16 -28 L21 -31" fill="none" stroke="#3b8a3e" stroke-width="2.2"/>` : ''}
${item === 'noix' ? `<ellipse cx="16" cy="-26" rx="6" ry="5" fill="#b27c3e" ${O2}/><path d="M12 -28 q4 3 8 0" fill="none" stroke="#7a5026" stroke-width="1.2"/>` : ''}
${item ? `<circle cx="9" cy="-24" r="3.6" fill="#c7793f" ${O2}/><circle cx="22" cy="-24" r="3.6" fill="#c7793f" ${O2}/>` : ''}
</g>`;

// ---------- décors ----------
const motes = (seed = 0) => Array.from({ length: 9 }, (_, i) => `<circle cx="${(i * 97 + seed * 41) % 380 + 10}" cy="${(i * 53 + seed * 29) % 110 + 20}" r="${1 + (i % 3) * 0.6}" fill="#fff" opacity=".6"/>`).join('');
const crown = (x, y, r, c1, c2) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c1}"/><circle cx="${x - r * 0.45}" cy="${y - r * 0.3}" r="${r * 0.62}" fill="${c2}"/><circle cx="${x + r * 0.5}" cy="${y + r * 0.1}" r="${r * 0.5}" fill="${c1}" opacity=".7"/>`;
const balcon = (saison = 'spring') => {
  const au = saison === 'autumn', su = saison === 'summer';
  const [t1, t2] = au ? ['#d9772f', '#eba646'] : su ? ['#3c9650', '#62b866'] : ['#69b87a', '#9ad39a'];
  const sun = su
    ? `<circle cx="338" cy="50" r="62" fill="url(#sunglow)"/><circle cx="338" cy="50" r="26" fill="#ffd84a" ${O2}/><circle cx="330" cy="42" r="8" fill="#fff3a8" opacity=".7"/>`
    : au ? `<circle cx="70" cy="60" r="48" fill="url(#sunglow)" opacity=".7"/><circle cx="70" cy="60" r="20" fill="#ffc46b" opacity=".9"/>`
      : `<ellipse cx="320" cy="48" rx="34" ry="13" fill="#fff" opacity=".95"/><ellipse cx="342" cy="38" rx="22" ry="12" fill="#fff" opacity=".95"/><ellipse cx="96" cy="38" rx="30" ry="11" fill="#fff" opacity=".9"/><ellipse cx="116" cy="30" rx="18" ry="9" fill="#fff" opacity=".9"/>`;
  const far = [[0, 120, 40], [38, 105, 36], [80, 118, 44], [128, 98, 38], [170, 112, 50], [224, 102, 40], [268, 120, 46], [318, 100, 40], [360, 114, 46]]
    .map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${176 - y}" fill="#a9bbd4" opacity=".55"/>`).join('');
  const win = (x, y) => `<rect x="${x}" y="${y}" width="9" height="12" rx="1" fill="#fff4c4" stroke="#3a3f55" stroke-width="1"/>`;
  const wins = [[10, 112], [10, 136], [64, 84], [82, 84], [64, 112], [82, 112], [64, 140], [112, 124], [132, 124], [168, 100], [168, 128], [220, 134], [244, 134], [284, 108], [284, 136], [300, 108], [340, 130], [366, 130]].map(([x, y]) => win(x, y)).join('');
  const bricks = Array.from({ length: 14 }, (_, i) => `<path d="M${(i * 31) % 360 + 6} ${108 + (i * 17) % 60} h14" stroke="#3a3f55" stroke-width="1" opacity=".18"/>`).join('');
  const leaves = au
    ? [[40, 30, 20], [140, 70, 40], [300, 20, 60], [360, 120, 25], [220, 90, 70]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3" transform="rotate(${r} ${x} ${y})" fill="#d9772f" opacity=".9"/>`).join('')
    : '';
  const ivy = `<path d="M400 0 Q372 22 380 50 Q386 72 366 88" fill="none" stroke="#3b8a3e" stroke-width="3"/>${[[392, 10, 20], [380, 24, -30], [384, 44, 25], [376, 62, -20], [366, 82, 30], [396, 30, 10]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="5.5" transform="rotate(${r} ${x} ${y})" fill="${au ? '#c9582e' : '#4fae5c'}" ${O2}/>`).join('')}`;
  return `<rect width="400" height="300" fill="url(#sky${saison})"/>${sun}${su ? '' : motes(1)}
${far}
${crown(25, 160, 30, t1, t2)}${crown(120, 158, 34, t1, t2)}${crown(215, 162, 30, t1, t2)}${crown(300, 156, 36, t1, t2)}${crown(385, 160, 32, t1, t2)}
<rect x="0" y="100" width="55" height="75" fill="#d7b8a8" ${O2}/><rect x="50" y="72" width="48" height="103" fill="#b9c3dd" ${O2}/><rect x="98" y="112" width="62" height="63" fill="#e3cfa0" ${O2}/><rect x="158" y="88" width="42" height="87" fill="#c9b5d6" ${O2}/><rect x="200" y="122" width="70" height="53" fill="#d7b8a8" ${O2}/><rect x="270" y="96" width="50" height="79" fill="#b9d3c3" ${O2}/><rect x="320" y="118" width="80" height="57" fill="#e3cfa0" ${O2}/>
<rect x="64" y="66" width="8" height="8" fill="#a9794e" ${O2}/><rect x="282" y="90" width="8" height="8" fill="#a9794e" ${O2}/>
${bricks}${wins}${leaves}
<rect x="0" y="212" width="400" height="88" fill="url(#floor)"/>
<path d="M0 236H400M0 262H400M0 286H400" stroke="#a9794e" stroke-width="2"/><path d="M70 212V236M200 236V262M330 212V236M130 262V286M280 262V286M40 236V262M360 236V262" stroke="#a9794e" stroke-width="2"/>
<path d="M20 224h24M150 248h30M300 226h22M90 274h26M250 296h30M350 270h26" stroke="#8a5f38" stroke-width="1.5" opacity=".5" stroke-linecap="round"/>
<rect x="0" y="212" width="400" height="10" fill="#8a5f38" opacity=".25"/>
<rect x="0" y="164" width="400" height="9" fill="#7a8aa0" ${O2}/><rect x="0" y="203" width="400" height="9" fill="#7a8aa0" ${O2}/><rect x="0" y="165" width="400" height="3" fill="#aab8cc"/>
<path d="M15 173v30M50 173v30M85 173v30M120 173v30M155 173v30M190 173v30M225 173v30M260 173v30M295 173v30M330 173v30M365 173v30M398 173v30" class="ln" stroke="#5f6e86" stroke-width="7"/>
${ivy}`;
};

const POTX = [165, 222, 279, 336];
const pot = (x, wet = false) => `<ellipse cx="${x}" cy="268" rx="26" ry="5" fill="#2b2b3a" opacity=".18"/><path d="M${x - 18} 238 H${x + 18} L${x + 13} 266 H${x - 13}Z" fill="#d98a5a" ${O}/><path d="M${x + 6} 240 L${x + 4} 264 H${x + 12} L${x + 15} 240Z" fill="#b8683a" opacity=".5"/><rect x="${x - 21}" y="233" width="42" height="9" rx="3" fill="#ec9f6c" ${O2}/><path d="M${x - 15} 236 H${x - 4}" stroke="#fff" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/><ellipse cx="${x}" cy="239" rx="16" ry="3.6" fill="${wet ? '#4a3425' : '#6b4a36'}"/>${wet ? `<path d="M${x - 8} 239 q4 -2 8 0" stroke="#7a5a44" stroke-width="1" fill="none"/>` : ''}`;
const pousse = (x, y, c = '#4fae5c') => `<path d="M${x} ${y} Q${x - 1} ${y - 9} ${x} ${y - 15}" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/><ellipse cx="${x - 7}" cy="${y - 16}" rx="7" ry="4.2" transform="rotate(-25 ${x - 7} ${y - 16})" fill="${c}" ${O2}/><ellipse cx="${x + 7}" cy="${y - 17}" rx="7" ry="4.2" transform="rotate(25 ${x + 7} ${y - 17})" fill="${c}" ${O2}/>`;
const leaf = (x, y, rot, c, rx = 8, ry = 5) => `<g transform="rotate(${rot} ${x} ${y})"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}" ${O2}/><path d="M${x - rx * 0.75} ${y}H${x + rx * 0.75}" stroke="#fff" stroke-opacity=".45" stroke-width="1.2" fill="none"/><ellipse cx="${x - rx * 0.2}" cy="${y - ry * 0.35}" rx="${rx * 0.5}" ry="${ry * 0.25}" fill="#fff" opacity=".18"/></g>`;

const bokchoy = (x, y, st, au) => {
  const g = au ? '#a9a548' : '#4fae5c';
  if (st === 1) return pousse(x, y, g);
  if (st === 2) return leaf(x - 8, y - 15, -40, g, 10, 5.5) + leaf(x + 8, y - 15, 40, g, 10, 5.5) + leaf(x, y - 22, 90, g, 12, 6.5);
  if (st >= 3) return [-16, -8, 0, 8, 16].map((d) => limb(x, y, x + d * 0.8, y - 26, 7, '#eef5cf')).join('') + [-16, -8, 0, 8, 16].map((d) => leaf(x + d * 1.2, y - 38, d * 3, g, 9, 15)).join('');
  return '';
};
const tomate = (x, y, st, ripe, au) => {
  const g = au ? '#a9a548' : '#4fae5c';
  if (st === 1) return pousse(x, y, g);
  if (st === 2) return limb(x, y, x, y - 36, 3, '#3b8a3e') + leaf(x - 8, y - 22, -30, g) + leaf(x + 8, y - 30, 30, g) + leaf(x, y - 40, 90, g, 7, 5);
  if (st >= 3) {
    const spots = [[-12, -36], [12, -50], [-8, -62], [12, -26]];
    return limb(x, y, x, y - 78, 3, '#8a6a4a') + limb(x, y, x, y - 70, 3, '#3b8a3e')
      + leaf(x - 13, y - 44, -25, g, 12, 6.5) + leaf(x + 13, y - 58, 25, g, 12, 6.5) + leaf(x - 11, y - 70, -35, g, 11, 6.5) + leaf(x + 10, y - 34, 20, g, 10, 5.5)
      + spots.map(([dx, dy], i) => `<circle cx="${x + dx}" cy="${y + dy + 8}" r="8" fill="${i < ripe ? '#e0452f' : '#8ccf6a'}" ${O2}/><circle cx="${x + dx - 2.5}" cy="${y + dy + 5}" r="2" fill="#fff" opacity=".55"/><path d="M${x + dx - 3} ${y + dy} l3 2 l3 -2" fill="none" stroke="#2e7d3a" stroke-width="1.6"/>`).join('');
  }
  return '';
};
const haricot = (x, y, st, au) => {
  const g = au ? '#b8a845' : '#4fae5c';
  if (st === 1) return pousse(x, y, g);
  if (st === 2) return limb(x, y, x, y - 50, 3, '#8a6a4a') + `<path d="M${x} ${y} Q${x - 8} ${y - 15} ${x} ${y - 25} Q${x + 8} ${y - 35} ${x} ${y - 45}" fill="none" stroke="${g}" stroke-width="3"/>` + leaf(x - 8, y - 28, -30, g) + leaf(x + 8, y - 40, 30, g);
  if (st >= 3) {
    return limb(x, y, x, y - 98, 3, '#8a6a4a')
      + `<path d="M${x} ${y} Q${x - 12} ${y - 18} ${x} ${y - 32} Q${x + 12} ${y - 48} ${x} ${y - 62} Q${x - 12} ${y - 76} ${x} ${y - 90}" fill="none" stroke="#3b8a3e" stroke-width="3"/>`
      + leaf(x - 12, y - 24, -30, g, 10, 6) + leaf(x + 12, y - 42, 30, g, 10, 6) + leaf(x - 12, y - 58, -30, g, 10, 6) + leaf(x + 12, y - 74, 30, g, 10, 6) + leaf(x, y - 95, 90, g, 9, 5.5)
      + [[-13, -34], [14, -52], [-12, -68]].map(([dx, dy]) => `<path d="M${x + dx} ${y + dy} q${dx < 0 ? 3 : -3} 12 ${dx < 0 ? 1 : -1} 26" class="ln" stroke="#3a3f55" stroke-width="7"/><path d="M${x + dx} ${y + dy} q${dx < 0 ? 3 : -3} 12 ${dx < 0 ? 1 : -1} 26" class="ln" stroke="#86d062" stroke-width="4"/>`).join('');
  }
  return '';
};
const petals = (fx, fy, n, rx, ry, dist, c, rot0 = 0) => Array.from({ length: n }, (_, i) => `<ellipse cx="${fx}" cy="${fy - dist}" rx="${rx}" ry="${ry}" transform="rotate(${i * 360 / n + rot0} ${fx} ${fy})" fill="${c}" ${O2}/>`).join('');
const tournesol = (x, y, st, au) => {
  const g = au ? '#a9a548' : '#4fae5c';
  if (st === 1) return pousse(x, y, g);
  if (st === 2) return limb(x, y, x, y - 50, 5, '#3b8a3e') + leaf(x - 11, y - 26, -30, g, 11, 6.5) + leaf(x + 11, y - 38, 30, g, 11, 6.5);
  if (st === 3) {
    const fy = y - 118;
    return limb(x, y, x, fy, 6, '#3b8a3e') + leaf(x - 15, y - 40, -30, g, 15, 8) + leaf(x + 15, y - 66, 30, g, 15, 8)
      + petals(x, fy, 14, 6.5, 12, 22, '#ee9d1a', 12) + petals(x, fy, 14, 6.5, 12, 20, '#ffcb2e')
      + `<circle cx="${x}" cy="${fy}" r="14" fill="#7a4a2a" ${O}/><circle cx="${x}" cy="${fy}" r="8" fill="#5a3418"/>${[[-4, -3], [4, 3], [-3, 4], [5, -4], [0, 0]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${fy + dy}" r="1.3" fill="#b07a46"/>`).join('')}`;
  }
  if (st === 4) {
    const fx = x - 24, fy = y - 96;
    return `<path d="M${x} ${y} Q${x + 8} ${y - 70} ${fx + 4} ${fy + 12}" fill="none" stroke="#3a3f55" stroke-width="10" stroke-linecap="round"/><path d="M${x} ${y} Q${x + 8} ${y - 70} ${fx + 4} ${fy + 12}" fill="none" stroke="#8a9a3e" stroke-width="6" stroke-linecap="round"/>`
      + leaf(x + 14, y - 40, 30, g, 13, 7)
      + petals(fx, fy, 12, 5, 10, 22, '#c9962a', 10)
      + `<circle cx="${fx}" cy="${fy}" r="19" fill="#6b4226" ${O}/>` + [[-8, -6], [6, -9], [-3, 5], [9, 4], [-10, 8], [2, 12], [12, -3], [-1, -3], [-12, -2]].map(([dx, dy]) => `<ellipse cx="${fx + dx}" cy="${fy + dy}" rx="2.2" ry="3.2" fill="#dcd2bc" stroke="#3a3f55" stroke-width=".8"/>`).join('');
  }
  return '';
};
const jardin = ({ b = 0, t = 0, h = 0, s = 0, ripe = 0, au = false, graines = false, soil = false } = {}) => POTX.map((x, i) => pot(x, soil)
  + (graines ? [-8, 0, 8].map((d) => `<circle cx="${x + d}" cy="${239 + (d === 0 ? 1 : 0)}" r="2.3" fill="#f0dfa4" stroke="#3a3f55" stroke-width=".8"/>`).join('') : '')
  + [bokchoy(x, 240, b, au), tomate(x, 240, t, ripe, au), haricot(x, 240, h, au), tournesol(x, 240, s, au)][i]).join('');

const bol = (x, y) => `<ellipse cx="${x}" cy="${y + 7}" rx="18" ry="3" fill="#2b2b3a" opacity=".18"/><path d="M${x - 17} ${y - 8} H${x + 17} Q${x + 14} ${y + 8} ${x} ${y + 8} Q${x - 14} ${y + 8} ${x - 17} ${y - 8}Z" fill="#6aa5d9" ${O2}/><path d="M${x - 13} ${y - 3} H${x + 13}" stroke="#fff" stroke-opacity=".5" stroke-width="2"/>${[-10, -3, 5, 11, -5, 3].map((d, i) => `<ellipse cx="${x + d}" cy="${y - 9 - (i % 2) * 3}" rx="5.5" ry="4" fill="#b27c3e" ${O2}/><path d="M${x + d - 3} ${y - 9 - (i % 2) * 3} q3 2 6 0" stroke="#7a5026" stroke-width="1" fill="none"/>`).join('')}`;
const panier = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="30" ry="5" fill="#2b2b3a" opacity=".17"/>
<path d="M-26 -34 Q0 -72 26 -34" fill="none" ${O}/>
${leaf(-14, -38, -20, '#4fae5c', 12, 18)}${leaf(2, -44, 5, '#5fbe6a', 11, 19)}${leaf(16, -38, 25, '#4fae5c', 10, 15)}
<circle cx="14" cy="-30" r="9" fill="#e0452f" ${O2}/><circle cx="-3" cy="-27" r="9" fill="#e0452f" ${O2}/><circle cx="-19" cy="-28" r="8" fill="#d9381f" ${O2}/><circle cx="11" cy="-33" r="2.2" fill="#fff" opacity=".55"/><circle cx="-6" cy="-30" r="2.2" fill="#fff" opacity=".55"/>
<path d="M-8 -30 q-5 -12 9 -18 M10 -30 q8 -9 20 -4 M2 -34 q10 -10 22 -14" fill="none" stroke="#3a3f55" stroke-width="8" stroke-linecap="round"/><path d="M-8 -30 q-5 -12 9 -18 M10 -30 q8 -9 20 -4 M2 -34 q10 -10 22 -14" fill="none" stroke="#86d062" stroke-width="5" stroke-linecap="round"/>
<path d="M-30 -30 H30 L24 0 H-24Z" fill="#d6a56a" ${O}/><path d="M-28 -20 H28 M-26 -10 H26 M-12 -30 L-10 0 M0 -30 V0 M12 -30 L10 0" stroke="#a9794e" stroke-width="2" fill="none"/></g>`;
const packets = (x, y) => [[-13, -14, '#f4a259'], [0, -4, '#5fbe6a'], [13, 10, '#e8604c']].map(([dx, rot, c]) => `<g transform="translate(${x + dx} ${y}) rotate(${rot})"><rect x="-9" y="-15" width="18" height="26" rx="2" fill="${c}" ${O2}/><path d="M-9 -9 h18" stroke="#3a3f55" stroke-width="1.5"/><circle cx="0" cy="1" r="5" fill="#fff6d8"/><path d="M-2 1 q2 -4 4 0 q-2 3 -4 0Z" fill="${c}"/></g>`).join('');
const arrosoir = (x, y) => `<path d="M${x + 12} ${y - 4} L${x + 32} ${y - 14}" stroke="#3a3f55" stroke-width="8" stroke-linecap="round"/><path d="M${x + 12} ${y - 4} L${x + 32} ${y - 14}" stroke="#6aa5d9" stroke-width="5" stroke-linecap="round"/><path d="M${x + 30} ${y - 22} L${x + 40} ${y - 10}Z" fill="#4a85b9" ${O2}/>
<path d="M${x - 12} ${y - 14} H${x + 12} L${x + 10} ${y + 10} H${x - 10}Z" fill="#6aa5d9" ${O2}/><path d="M${x - 8} ${y - 8} V${y + 6}" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><path d="M${x - 12} ${y - 8} q-14 -6 -6 -20 q6 -4 12 4" fill="none" ${O2}/>
${[[38, 0], [34, 10], [42, 12], [38, 22], [32, 28]].map(([dx, dy]) => `<path d="M${x + dx} ${y + dy - 6} q3 5 0 8 q-3 -3 0 -8Z" fill="#8fd9ff" stroke="#3a3f55" stroke-width="1.2"/>`).join('')}`;
const sparkle = (x, y, r = 6) => `<path d="M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z" fill="#fff3a8" stroke="#e8b923" stroke-width="1.5"/>`;
const ravioli = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-12 2 Q-12 -14 0 -14 Q12 -14 12 2 Q0 6 -12 2Z" fill="#fff6e4" ${O2}/><path d="M-9 -8 q2 -4 4 0 M-3 -11 q2 -4 4 0 M3 -10 q2 -4 4 0" fill="none" stroke="#d9b98a" stroke-width="1.5"/><path d="M-10 -2 Q0 1 10 -2" fill="none" stroke="#e8d3ad" stroke-width="1.5"/></g>`;
const farine = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="26" ry="8" fill="#fff" opacity=".7"/>`;

// ---------- pages ----------
const couverture = svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 2 })}${ecureuil(236, 167, 1.0, 'noix')}${mei(48, 294, 1.45, 'laugh', 'up')}${papa(120, 294, 1.45, 'smile', 'down', true)}`);

const sacTerre = (x, y) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="2" rx="26" ry="5" fill="#2b2b3a" opacity=".2"/><path d="M-22 0 Q-26 -26 -16 -40 Q0 -46 16 -40 Q26 -26 22 0Z" fill="#8a5a36" ${O}/><path d="M-16 -40 Q0 -30 16 -40" fill="#6b4226" ${O2}/><path d="M-14 -24 H14 M-12 -14 H12" stroke="#a9794e" stroke-width="2"/><circle cx="0" cy="-17" r="6" fill="#d9b98a" ${O2}/><path d="M-12 -44 q4 -10 12 -4 q8 -6 12 4Z" fill="#5a3a22" ${O2}/></g>`;

export const book = {
  id: 'jardin-de-grand-papa',
  title: 'Le jardin de Grand-papa Wen',
  emoji: '🌻',
  level: 2,
  minutes: 8,
  cover: couverture,
  pages: [
    { svg: svg(`${balcon('spring')}${jardin()}${mei(50, 294, 1.45, 'think', 'pointR')}${papa(118, 294, 1.45, 'smile')}`),
      text: 'Mei habite à Montréal, dans un petit appartement, avec son grand-papa Wen. Sur leur balcon, il y a quatre pots vides. « Ils attendent quelque chose », dit Mei.' },
    { svg: svg(`${balcon('spring')}${jardin()}${papa(112, 294, 1.45, 'laugh', 'reachR', false, packets(46, -50))}${mei(40, 294, 1.45, 'wow', 'up')}`),
      text: 'Un matin de printemps, Grand-papa arrive avec des sachets de graines. « Hǎo! Avec de la terre, de l\'eau et du soleil, tout peut pousser », dit-il. Mei ouvre de grands yeux.' },
    { svg: svg(`${balcon('spring')}${jardin({ graines: true, soil: true })}${sacTerre(136, 292)}${mei(40, 294, 1.4, 'laugh', 'pointR')}${papa(94, 294, 1.4, 'smile', 'hold', false, `<path d="M-14 -36 q14 10 28 0 q-4 10 -14 10 q-10 0 -14 -10Z" fill="#6b4226" ${O2}/><circle cx="-5" cy="-40" r="2" fill="#f0dfa4"/><circle cx="3" cy="-41" r="2" fill="#f0dfa4"/>`)}`),
      text: 'Ils mettent de la terre dans les pots. Mei dépose les graines de bok choy, de tomates, de haricots et de tournesol. Grand-papa les recouvre doucement.' },
    { svg: svg(`${balcon('spring')}${jardin({ soil: true })}${papa(40, 294, 1.4, 'laugh', 'hips')}${mei(100, 294, 1.45, 'sad', 'reachR', arrosoir(46, -52))}`),
      text: 'Chaque matin, Mei arrose ses pots. Mais rien ne pousse! « Patience, ma petite fleur », dit Grand-papa en riant.' },
    { svg: svg(`${balcon('spring')}${jardin({ b: 1, t: 1, h: 1, s: 1, soil: true })}${sparkle(168, 200, 7)}${sparkle(226, 196, 6)}${sparkle(282, 202, 7)}${sparkle(338, 198, 6)}${mei(66, 270, 1.45, 'joy', 'up')}${papa(128, 294, 1.45, 'laugh', 'hips')}`),
      text: 'Un jour, quatre petites pousses vertes sortent de la terre! Mei saute de joie. Grand-papa sourit de toutes ses dents.' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 2 })}${mei(46, 294, 1.45, 'wow', 'pointR')}${papa(116, 294, 1.45, 'smile', 'down', true)}`),
      text: 'L\'été arrive avec un grand soleil. Le bok choy est large, les haricots grimpent et le tournesol est plus grand que Mei. Les tomates deviennent rouges.' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 1 })}${ecureuil(304, 168, 1.35, 'tomate', false)}<path d="M268 150 q-10 -4 -14 4 M262 138 q-10 -2 -12 6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".8"/>${mei(46, 294, 1.45, 'wow', 'pointR')}${papa(116, 294, 1.45, 'wow', 'down', true)}`),
      text: 'Un matin, un écureuil saute sur la balustrade. Il attrape une belle tomate rouge et file avec!' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 1 })}${ecureuil(362, 168, 1.15, 'tomate', false)}${mei(46, 294, 1.45, 'angry', 'up')}${papa(116, 294, 1.45, 'laugh', 'hips', true)}`),
      text: '« Mes tomates! » crie Mei, fâchée. « Il a faim, lui aussi », dit Grand-papa en riant. Mei réfléchit longtemps.' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 1 })}${bol(372, 160)}${sparkle(372, 128, 7)}${mei(58, 294, 1.45, 'joy', 'pointR')}${papa(124, 294, 1.45, 'smile', 'hips', true)}`),
      text: 'Mei a une idée! Elle met un bol de noix sur la balustrade, loin des tomates. « Hǎo, hǎo! » dit Grand-papa.' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 3, t: 3, h: 3, s: 3, ripe: 2 })}${bol(358, 160)}${ecureuil(384, 164, 1.0, 'noix', false, true)}${mei(40, 294, 1.45, 'smile', 'down')}${papa(104, 294, 1.45, 'smile', 'down', true)}`),
      text: 'L\'écureuil revient et goûte les noix. Il remplit ses joues et ne touche plus aux tomates. Mei et Grand-papa le regardent sans faire de bruit.' },
    { svg: svg(`${balcon('summer')}${jardin({ b: 2, t: 3, h: 3, s: 3, ripe: 0 })}${panier(168, 294, 1.5)}${mei(44, 294, 1.4, 'laugh', 'pointR')}${papa(106, 294, 1.4, 'laugh', 'hips', true)}`),
      text: 'À la fin de l\'été, le panier est plein : bok choy, tomates et haricots. Il y en a beaucoup trop pour deux! Mei a envie de partager.' },
    { svg: svg(`<rect width="400" height="300" fill="url(#wall)"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 54 + 20} 0 V214" stroke="#f0c985" stroke-width="12" opacity=".45"/>`).join('')}
<rect x="0" y="214" width="400" height="86" fill="url(#floor)"/><path d="M0 242H400M0 270H400M80 214V242M220 242V270M330 214V242M150 270V300" stroke="#a9794e" stroke-width="2"/>
<rect x="268" y="26" width="108" height="100" fill="#bfe4f6" ${O}/><path d="M268 76 H376 M322 26 V126" stroke="#3a3f55" stroke-width="3"/><rect x="288" y="92" width="22" height="34" fill="#d7b8a8"/><rect x="336" y="72" width="26" height="54" fill="#b9c3dd"/>${crown(350, 40, 12, '#69b87a', '#9ad39a')}<path d="M260 22 Q272 70 262 128 M384 22 Q372 70 382 128" fill="none" stroke="#e8604c" stroke-width="12" opacity=".85"/>
<rect x="14" y="48" width="104" height="9" fill="#a9794e" ${O2}/><rect x="14" y="98" width="104" height="9" fill="#a9794e" ${O2}/>
${[[30, 20, '#e0452f'], [58, 20, '#5fbe6a'], [88, 20, '#f4a259']].map(([x, , c]) => `<path d="M${x - 11} 48 v-24 q0 -6 6 -6 h10 q6 0 6 6 v24Z" fill="${c}" ${O2}/><rect x="${x - 8}" y="14" width="16" height="5" rx="2" fill="#d9b98a" ${O2}/>`).join('')}
${[[28, '#6aa5d9'], [58, '#f4d35e'], [90, '#e8604c']].map(([x, c]) => `<ellipse cx="${x}" cy="90" rx="13" ry="7" fill="${c}" ${O2}/>`).join('')}
<path d="M150 14 V40 M170 14 V36 M190 14 V42" stroke="#7a8aa0" stroke-width="3"/><circle cx="150" cy="46" r="7" fill="none" ${O2}/><path d="M164 36 q6 12 12 0Z" fill="#c9954f" ${O2}/><path d="M188 40 l4 14 h-8Z" fill="#9aa8bc" ${O2}/>
<g><rect x="258" y="152" width="124" height="62" fill="#9b6a44" ${O}/><rect x="258" y="152" width="124" height="8" fill="#b88458" ${O2}/><path d="M290 160 V214 M350 160 V214" stroke="#7a5a44" stroke-width="2"/>
<rect x="296" y="116" width="54" height="36" rx="3" fill="#7a8aa0" ${O}/><circle cx="312" cy="134" r="7" fill="#5f6e86" ${O2}/><circle cx="336" cy="134" r="7" fill="#5f6e86" ${O2}/>
<ellipse cx="323" cy="108" rx="30" ry="8" fill="#e8b97f" ${O}/><rect x="293" y="86" width="60" height="22" fill="#e6bd7e" ${O}/><ellipse cx="323" cy="86" rx="30" ry="8" fill="#c9954f" ${O}/><path d="M293 96 H353" stroke="#a9794e" stroke-width="2"/><ellipse cx="323" cy="64" rx="30" ry="8" fill="#e8b97f" ${O}/><rect x="293" y="62" width="60" height="24" fill="#e6bd7e" ${O}/><ellipse cx="323" cy="62" rx="30" ry="8" fill="#c9954f" ${O}/>
<path d="M306 52 q-10 -10 0 -20 q10 -10 0 -22 M326 52 q-10 -10 0 -20 q10 -10 0 -22 M344 52 q-10 -10 0 -20 q10 -10 0 -22" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".9"/></g>
<g><rect x="150" y="226" width="116" height="10" rx="3" fill="#e0a96b" ${O}/><path d="M158 236 V288 M258 236 V288" stroke="#3a3f55" stroke-width="12" stroke-linecap="round"/><path d="M158 236 V288 M258 236 V288" stroke="#c98f55" stroke-width="7" stroke-linecap="round"/>
${farine(206, 224)}<ellipse cx="206" cy="223" rx="40" ry="8" fill="#f4e4c0" ${O2}/>${[-26, -10, 8, 24].map((d, i) => ravioli(206 + d, 224 - (i % 2) * 3, 0.9)).join('')}
<path d="M164 226 h20 M168 220 h12" stroke="#fff" stroke-width="3" opacity=".7"/>
<g transform="translate(238 216)"><path d="M-14 0 Q-14 -12 0 -12 Q14 -12 14 0Z" fill="#fff" ${O2}/><path d="M-5 -12 q-3 -8 -1 -14 M5 -12 q3 -8 1 -14" fill="none" stroke="#5fbe6a" stroke-width="5" stroke-linecap="round"/></g></g>
${mei(96, 296, 1.4, 'laugh', 'hold', ravioli(0, -36, 1.2))}
${papa(318, 296, 1.4, 'smile', 'hold', false, `<path d="M-30 -38 H30" class="ln" stroke="#3a3f55" stroke-width="9"/><path d="M-30 -38 H30" class="ln" stroke="#d9a066" stroke-width="5"/><circle cx="-31" cy="-38" r="5" fill="#c98f55" ${O2}/><circle cx="31" cy="-38" r="5" fill="#c98f55" ${O2}/>`)}
`),
      text: 'Dans la cuisine, Grand-papa prépare la pâte et Mei plie les raviolis chinois. Ils les font cuire à la vapeur avec du bok choy. Ça sent tellement bon!' },
    { svg: svg(`<rect width="400" height="300" fill="url(#hall)"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${i * 50 + 10}" y="0" width="14" height="250" fill="#efc3cd" opacity=".7"/>`).join('')}
<rect y="248" width="400" height="52" fill="#a07a5c"/><path d="M0 266H400M0 284H400M90 248V266M240 266V284M330 248V266" stroke="#7a5a44" stroke-width="2"/><rect y="244" width="400" height="8" fill="#7a5a44" ${O2}/>
<rect x="208" y="34" width="150" height="214" fill="#7a5a44" ${O}/><rect x="218" y="44" width="130" height="204" fill="url(#warm)"/>
<rect x="232" y="64" width="40" height="50" fill="#fff" ${O2}/><circle cx="252" cy="86" r="11" fill="#8ccf6a" ${O2}/><circle cx="248" cy="82" r="3" fill="#fff" opacity=".6"/><rect x="296" y="120" width="42" height="70" rx="3" fill="#c9954f" ${O2}/><rect x="300" y="126" width="34" height="14" fill="#e8b97f" ${O2}/>
<path d="M208 34 L166 52 V250 L208 250Z" fill="#9b6a44" ${O}/><circle cx="178" cy="150" r="4.5" fill="#ffd84a" ${O2}/>
<ellipse cx="270" cy="252" rx="40" ry="6" fill="#d9534f" ${O2}/><path d="M240 252 h60" stroke="#fff" stroke-width="2" opacity=".6"/>
${voisine(290, 296, 1.45, 'joy', 'wide')}
${papa(146, 296, 1.35, 'laugh', 'hold', true, panier(0, -30, 0.55))}
${mei(68, 296, 1.35, 'smile', 'hold', `<ellipse cx="0" cy="-36" rx="25" ry="7" fill="#fff" ${O2}/>${[-14, 0, 14].map((d, i) => ravioli(d, -40 - (i % 2) * 2, 0.95)).join('')}<path d="M-8 -52 q-4 -8 0 -12 M6 -52 q-4 -8 0 -12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".9"/>`)}`),
      text: 'Ils frappent chez Madame Roy, leur voisine. Mei lui offre des raviolis chauds, et Grand-papa, des tomates et des haricots. Madame Roy est si contente qu\'elle les serre dans ses bras.' },
    { svg: svg(`${balcon('autumn')}${jardin({ b: 0, t: 3, h: 3, s: 4, ripe: 0, au: true })}${ecureuil(376, 168, 1.1, 'noix', true, true)}
${mei(48, 294, 1.45, 'joy', 'up')}${papa(116, 294, 1.45, 'smile', 'down', false)}`),
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
