// « Le robot de la bibliothèque » — niveau 3
const O = 'class="k3"';
const O2 = 'class="k2"';
const BC = ['#e8604c', '#4a8fd0', '#f5c542', '#6fbf73', '#9b6fb5', '#d9548a', '#f08a3c', '#3fa7a0'];

// une étagère garnie de livres (définie une seule fois, réutilisée avec <use>)
const spines = (x, base, w, seed) => {
  let cx = x, i = seed, out = '';
  while (cx < x + w - 14) {
    const bw = 13 + ((i * 7) % 7), h = 26 + ((i * 11) % 17), c = BC[(i * 5) % BC.length];
    if (i % 9 === 4) { out += `<g transform="rotate(-14 ${cx + bw} ${base})"><rect x="${cx}" y="${base - h}" width="${bw}" height="${h}" rx="1.5" fill="${c}" stroke="#3a3f55" stroke-width="1.4"/></g>`; cx += bw + 7; i++; continue; }
    out += `<rect x="${cx}" y="${base - h}" width="${bw}" height="${h}" rx="1.5" fill="${c}" stroke="#3a3f55" stroke-width="1.4"/><path d="M${cx} ${base - h + 5}h${bw}M${cx} ${base - 6}h${bw}" stroke="#fff" stroke-opacity=".55" stroke-width="1.4"/>`;
    cx += bw + 1; i++;
  }
  // pile couchée au bout de la rangée
  out += `<rect x="${x + w - 38}" y="${base - 7}" width="30" height="7" rx="1.5" fill="${BC[(seed + 2) % 8]}" stroke="#3a3f55" stroke-width="1.4"/><rect x="${x + w - 34}" y="${base - 14}" width="26" height="7" rx="1.5" fill="${BC[(seed + 5) % 8]}" stroke="#3a3f55" stroke-width="1.4"/>`;
  return out;
};
const unit = (x, w, seed) => `<rect x="${x}" y="40" width="${w}" height="176" rx="3" fill="#b9864f" ${O}/>` + [0, 1, 2].map((r) => `<rect x="${x + 5}" y="${48 + r * 55}" width="${w - 10}" height="48" fill="#6e4a28"/><rect x="${x + 5}" y="${48 + r * 55}" width="${w - 10}" height="6" fill="#000" opacity=".18"/>${spines(x + 8, 96 + r * 55, w - 16, seed + r * 4)}<rect x="${x + 2}" y="${96 + r * 55}" width="${w - 4}" height="6" fill="#c9955a" ${O2}/>`).join('');
const DEFS = `<defs>
<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbeac4"/><stop offset="1" stop-color="#f1d3a0"/></linearGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98652"/><stop offset="1" stop-color="#dcb07a"/></linearGradient>
<linearGradient id="metal" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8d7e6"/><stop offset=".6" stop-color="#9fb4c7"/><stop offset="1" stop-color="#7f95ab"/></linearGradient>
<linearGradient id="metalH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d4e0ec"/><stop offset=".6" stop-color="#b0c2d4"/><stop offset="1" stop-color="#8da3b8"/></linearGradient>
<linearGradient id="screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a5a6a"/><stop offset="1" stop-color="#12303c"/></linearGradient>
<linearGradient id="board" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b8068"/><stop offset="1" stop-color="#2a6450"/></linearGradient>
<radialGradient id="skinA" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fbd9b8"/><stop offset="1" stop-color="#eeb98c"/></radialGradient>
<radialGradient id="skinB" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#d9a074"/><stop offset="1" stop-color="#b57d52"/></radialGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#fff3b0" stop-opacity=".95"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0"/></radialGradient>
<radialGradient id="eyeglow"><stop offset="0" stop-color="#7fffe0" stop-opacity=".9"/><stop offset="1" stop-color="#7fffe0" stop-opacity="0"/></radialGradient>
<g id="shelves">${unit(-6, 142, 1)}${unit(264, 142, 7)}<circle cx="52" cy="24" r="16" fill="#6aa5d9" stroke="#3a3f55" stroke-width="2"/><path d="M38 18q8 -4 14 4t-8 12M58 12q6 8 -2 14" fill="#6fbf73" stroke="#3a3f55" stroke-width="1.4"/><rect x="48" y="38" width="8" height="4" fill="#9b6a3c"/><path d="M330 40v-10h20v10Z" fill="#d98a5a" stroke="#3a3f55" stroke-width="2"/><path d="M340 30q-14 -10 -8 -22M340 30q14 -12 10 -24M340 30v-24" fill="none" stroke="#3a3f55" stroke-width="6" stroke-linecap="round"/><path d="M340 30q-14 -10 -8 -22M340 30q14 -12 10 -24M340 30v-24" fill="none" stroke="#5fbe6a" stroke-width="3" stroke-linecap="round"/></g>
<g id="room"><rect width="400" height="300" fill="url(#wall)"/>${Array.from({ length: 14 }, (_, i) => `<rect x="${i * 30 + 6}" y="0" width="12" height="216" fill="#e8c88e" opacity=".35"/>`).join('')}</g>
<g id="plancher"><rect y="216" width="400" height="84" fill="url(#floor)"/><path d="M0 240H400M0 264H400M0 286H400M60 216V240M180 216V240M320 216V240M120 240V264M260 240V264M30 264V286M200 264V286M350 264V286" stroke="#a9794e" stroke-width="2"/><path d="M20 228h26M130 252h34M290 230h22M80 276h30M240 294h30M350 272h28" stroke="#8a5f38" stroke-width="1.5" opacity=".45" stroke-linecap="round"/><rect y="210" width="400" height="9" fill="#a9794e" stroke="#3a3f55" stroke-width="2"/><rect y="219" width="400" height="8" fill="#6e4a28" opacity=".22"/></g>
</defs>`;
const svg = (s) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${DEFS}<style>.k3,.k2{stroke:#3a3f55;stroke-linejoin:round;stroke-linecap:round}.k3{stroke-width:3}.k2{stroke-width:2}.ln{fill:none;stroke-linecap:round;stroke-linejoin:round}.lt{font-family:Arial,sans-serif;font-weight:700;text-anchor:middle}</style>${s}</svg>`;
const limb = (a, b, c, d, w, col) => `<path d="M${a} ${b}L${c} ${d}" class="ln" stroke="#3a3f55" stroke-width="${w + 4}"/><path d="M${a} ${b}L${c} ${d}" class="ln" stroke="${col}" stroke-width="${w}"/>`;

// ---------- visages d'enfants ----------
const eye = (x, k = 1) => `<ellipse cx="${x}" cy="0" rx="3.6" ry="${(4.2 * k).toFixed(1)}" fill="#2f3248"/><circle cx="${x + 1.2}" cy="${(-1.6 * k).toFixed(1)}" r="1.5" fill="#fff"/><circle cx="${x - 1.3}" cy="${(1.9 * k).toFixed(1)}" r=".8" fill="#fff" opacity=".8"/>`;
const face = (m, brow = '#4a3a3a') => {
  const ck = m === 'shy' || m === 'sad' ? 0.8 : 0.5;
  const cheeks = `<circle cx="-13.5" cy="7" r="4.4" fill="#f28b82" opacity="${ck}"/><circle cx="13.5" cy="7" r="4.4" fill="#f28b82" opacity="${ck}"/>`;
  const nose = '<path d="M-1.8 5 Q0 7.4 1.8 5" fill="none" stroke="#c98a68" stroke-width="1.6" stroke-linecap="round"/>';
  const B = (d) => `<path d="${d}" fill="none" stroke="${brow}" stroke-width="2.2" stroke-linecap="round"/>`;
  const open = `<path d="M-7.5 8 Q0 22 7.5 8Z" fill="#8e2f3a" ${O2}/><ellipse cx="0" cy="13" rx="3.6" ry="2" fill="#e8737e"/>`;
  let eyes = eye(-8) + eye(8), brows = B('M-12 -9 Q-8 -12 -4 -9 M4 -9 Q8 -12 12 -9'), mouth = `<path d="M-5.5 9.5 Q0 15 5.5 9.5" fill="none" ${O2}/>`;
  if (m === 'laugh') { eyes = `<path d="M-12.5 1 Q-8 -5.5 -3.5 1 M3.5 1 Q8 -5.5 12.5 1" fill="none" ${O2}/>`; brows = B('M-12 -9 Q-8 -13 -4 -10 M4 -10 Q8 -13 12 -9'); mouth = open; }
  if (m === 'joy') { eyes = eye(-8, 1.15) + eye(8, 1.15); brows = B('M-12 -10 Q-8 -14 -4 -11 M4 -11 Q8 -14 12 -10'); mouth = open; }
  if (m === 'wow') { eyes = eye(-8, 1.3) + eye(8, 1.3); brows = B('M-12 -12 Q-8 -16 -4 -12 M4 -12 Q8 -16 12 -12'); mouth = `<ellipse cx="0" cy="12.5" rx="3.6" ry="4.6" fill="#8e2f3a" ${O2}/>`; }
  if (m === 'sad') { brows = B('M-12 -6 L-4 -10.5 M12 -6 L4 -10.5'); mouth = `<path d="M-5.5 14 Q0 8.5 5.5 14" fill="none" ${O2}/>`; }
  if (m === 'shy') { eyes = `<ellipse cx="-6.5" cy="1" rx="3.4" ry="4" fill="#2f3248"/><circle cx="-5.5" cy="-.4" r="1.4" fill="#fff"/><ellipse cx="9.5" cy="1" rx="3.4" ry="4" fill="#2f3248"/><circle cx="10.5" cy="-.4" r="1.4" fill="#fff"/>`; brows = B('M-12 -7 Q-8 -11 -4 -8 M5 -8 Q9 -11 13 -7'); mouth = `<path d="M-4 11 Q-1 9 1 11 T6 10" fill="none" ${O2}/>`; }
  return cheeks + eyes + brows + nose + mouth;
};
const POSE = {
  down: [[-21, -44, -22, -27], [21, -44, 22, -27]],
  up: [[-30, -70, -32, -94], [30, -70, 32, -94]],
  pointR: [[-21, -44, -22, -27], [30, -60, 50, -66]],
  reachR: [[-21, -44, -22, -27], [28, -48, 44, -44]],
  reachL: [[-28, -48, -44, -44], [21, -44, 22, -27]],
  hold: [[-22, -44, -9, -38], [22, -44, 9, -38]],
  clap: [[-22, -54, -5, -56], [22, -54, 5, -56]],
  throat: [[-21, -44, -22, -27], [20, -52, 6, -62]],
  wave: [[-21, -44, -22, -27], [30, -64, 34, -88]],
};
const arm = (sx, sy, ex, ey, hx, hy, col, skin) => `<path d="M${sx} ${sy}L${ex} ${ey}L${hx} ${hy}" class="ln" stroke="#3a3f55" stroke-width="12"/><path d="M${sx} ${sy}L${ex} ${ey}L${hx} ${hy}" class="ln" stroke="${col}" stroke-width="8"/><circle cx="${hx}" cy="${hy}" r="5.2" fill="${skin}" ${O2}/>`;

// ---------- les enfants (un seul modèle, quatre styles) ----------
const FELIX = { shirt: '#3f9a78', shade: '#2f7a5c', hair: '#d2682e', hair2: '#f09a58', skin: 'url(#skinA)', hand: '#f6c9a0', pants: '#6b5a4a', shoes: '#d9534f', style: 'felix', freckles: true };
const K1 = { shirt: '#e8604c', shade: '#c94a3a', hair: '#2b2b3a', hair2: '#6a6a88', skin: 'url(#skinA)', hand: '#f6c9a0', pants: '#4a6fa5', shoes: '#f5c542', style: 'bob' };
const K2 = { shirt: '#f5c542', shade: '#d9a82a', hair: '#5a3a22', hair2: '#8a5f3a', skin: 'url(#skinB)', hand: '#c98e62', pants: '#4a6fa5', shoes: '#e8604c', style: 'spiky' };
const K3 = { shirt: '#9b6fb5', shade: '#7b4f95', hair: '#f0c060', hair2: '#ffe08a', skin: 'url(#skinA)', hand: '#f6c9a0', pants: '#5a6a8a', shoes: '#4a8fd0', style: 'curl' };
const K4 = { shirt: '#4a8fd0', shade: '#2f6ea8', hair: '#7a4a2a', hair2: '#a9744a', skin: 'url(#skinB)', hand: '#c98e62', pants: '#6b5a4a', shoes: '#f08a3c', style: 'bob' };
const hairBack = (c) => ({ bob: `<path d="M-24 -82Q-26 -108 0 -106Q26 -108 24 -82L25 -62Q18 -58 17 -68L-17 -68Q-18 -58 -25 -62Z" fill="${c.hair}" ${O2}/>`, curl: `<circle cx="-18" cy="-98" r="11" fill="${c.hair}" ${O2}/><circle cx="18" cy="-98" r="11" fill="${c.hair}" ${O2}/><circle cx="0" cy="-104" r="12" fill="${c.hair}" ${O2}/>`, spiky: '', felix: '' }[c.style]);
const hairFront = (c) => ({
  bob: `<path d="M-22 -84Q-26 -108 0 -106Q26 -108 22 -84Q17 -95 7 -94Q0 -90 -4 -95Q-14 -96 -22 -84Z" fill="${c.hair}" ${O2}/><path d="M-12 -101Q-4 -105 4 -102" fill="none" stroke="${c.hair2}" stroke-width="2" stroke-linecap="round"/>`,
  spiky: `<path d="M-22 -84L-20 -100L-12 -94L-8 -110L-1 -97L6 -112L10 -98L18 -108L20 -94L24 -88L22 -84Q12 -92 0 -91Q-12 -92 -22 -84Z" fill="${c.hair}" ${O2}/><path d="M-6 -103L-4 -98" stroke="${c.hair2}" stroke-width="2" stroke-linecap="round"/>`,
  curl: `<path d="M-22 -84Q-20 -98 -6 -98Q4 -92 14 -98Q22 -96 22 -84Q12 -90 0 -89Q-12 -90 -22 -84Z" fill="${c.hair}" ${O2}/><circle cx="-8" cy="-100" r="6" fill="${c.hair}" ${O2}/><circle cx="8" cy="-101" r="6" fill="${c.hair}" ${O2}/>`,
  felix: `<path d="M-22 -80Q-26 -106 -2 -106Q8 -112 14 -104Q28 -102 22 -80Q18 -90 8 -90Q-6 -86 -22 -80Z" fill="${c.hair}" ${O2}/><path d="M-4 -106Q0 -116 8 -112" fill="none" stroke="#3a3f55" stroke-width="2"/><path d="M-4 -106Q0 -114 6 -112" fill="none" stroke="${c.hair}" stroke-width="5" stroke-linecap="round"/><path d="M-14 -98Q-6 -103 2 -100" fill="none" stroke="${c.hair2}" stroke-width="2" stroke-linecap="round"/>`,
}[c.style]);
const enfant = (x, y, s, c, m = 'smile', pose = 'down', held = '', seated = false) => `<g transform="translate(${x} ${y}) scale(${s})">
<ellipse cx="0" cy="2" rx="32" ry="6" fill="#2b2b3a" opacity="${seated ? .2 : .17}"/>
${seated
    ? `<ellipse cx="0" cy="-12" rx="30" ry="14" fill="${c.pants}" ${O}/><ellipse cx="-14" cy="-6" rx="11" ry="6" fill="${c.shoes}" ${O2}/><ellipse cx="14" cy="-6" rx="11" ry="6" fill="${c.shoes}" ${O2}/>`
    : `${limb(-7, -32, -7, -6, 11, c.pants)}${limb(7, -32, 7, -6, 11, c.pants)}<ellipse cx="-8.5" cy="-2" rx="9.5" ry="5" fill="${c.shoes}" ${O2}/><ellipse cx="8.5" cy="-2" rx="9.5" ry="5" fill="${c.shoes}" ${O2}/>`}
${hairBack(c)}
<path d="M-19 -26Q-22 -48 -15 -64Q0 -69 15 -64Q22 -48 19 -26Q0 -22 -19 -26Z" fill="${c.shirt}" ${O}/><path d="M3 -66Q16 -66 15 -64Q22 -48 19 -26Q10 -24 3 -24Z" fill="#000" opacity=".1"/>
<path d="M-18 -42Q0 -38 18 -42M-19 -34Q0 -30 19 -34" fill="none" stroke="${c.shade}" stroke-width="3" stroke-linecap="round"/><path d="M-9 -65Q0 -57 9 -65" fill="none" stroke="${c.shade}" stroke-width="3"/>
${POSE[pose].map(([ex, ey, hx, hy], i) => arm(i ? 15 : -15, -58, ex, ey, hx, hy, c.shirt, c.hand)).join('')}${held}
<circle cx="0" cy="-82" r="22" fill="${c.skin}" ${O}/>
${hairFront(c)}
<g transform="translate(0 -80)">${face(m, c.style === 'felix' ? '#a9501f' : c.hair === '#f0c060' ? '#b08a3a' : '#3a2a22')}${c.freckles ? '<path d="M-16 6h1.5M-13 9h1.5M-9 7h1.5M9 7h1.5M13 9h1.5M16 6h1.5" stroke="#c9733f" stroke-width="1.8" stroke-linecap="round"/>' : ''}</g></g>`;
const felix = (x, y, s, m, pose, held) => enfant(x, y, s, FELIX, m, pose, held);

// ---------- Bobine : vieux robot bleu-gris, écran-visage, antenne, roues ----------
const EY = -98;
const yeux = {
  normal: `<circle cx="-8" cy="${EY}" r="4.6" fill="#7fffe0"/><circle cx="8" cy="${EY}" r="4.6" fill="#7fffe0"/><circle cx="-6.6" cy="${EY - 1.6}" r="1.5" fill="#fff"/><circle cx="9.4" cy="${EY - 1.6}" r="1.5" fill="#fff"/>`,
  wide: `<circle cx="-8" cy="${EY}" r="7" fill="#7fffe0"/><circle cx="8" cy="${EY}" r="7" fill="#7fffe0"/><circle cx="-8" cy="${EY}" r="2.6" fill="#12303c"/><circle cx="8" cy="${EY}" r="2.6" fill="#12303c"/><circle cx="-6.4" cy="${EY - 2.4}" r="1.4" fill="#fff"/><circle cx="9.6" cy="${EY - 2.4}" r="1.4" fill="#fff"/>`,
  moon: `<circle cx="-8" cy="${EY}" r="9" fill="#7fffe0"/><circle cx="8" cy="${EY}" r="9" fill="#7fffe0"/><circle cx="-8" cy="${EY}" r="4" fill="#c8fff2"/><circle cx="8" cy="${EY}" r="4" fill="#c8fff2"/><circle cx="-5.4" cy="${EY - 3}" r="2" fill="#fff"/><circle cx="10.6" cy="${EY - 3}" r="2" fill="#fff"/>`,
  happy: `<path d="M-13 ${EY + 2}Q-8 ${EY - 8} -3 ${EY + 2}M3 ${EY + 2}Q8 ${EY - 8} 13 ${EY + 2}" class="ln" stroke="#7fffe0" stroke-width="3.5"/>`,
  sad: `<circle cx="-8" cy="${EY + 1}" r="4" fill="#7fffe0"/><circle cx="8" cy="${EY + 1}" r="4" fill="#7fffe0"/><circle cx="-6.8" cy="${EY - .4}" r="1.3" fill="#fff"/><circle cx="9.2" cy="${EY - .4}" r="1.3" fill="#fff"/><path d="M-14 ${EY - 6}L-4 ${EY - 9}M14 ${EY - 6}L4 ${EY - 9}" class="ln" stroke="#7fffe0" stroke-width="2.5"/>`,
  dizzy: `<g class="ln" stroke="#7fffe0" stroke-width="2.2"><path d="M-8 ${EY}m-6 0a6 6 0 1 1 3 5m-2 -4a3.5 3.5 0 1 1 2 3"/><path d="M8 ${EY}m-6 0a6 6 0 1 1 3 5m-2 -4a3.5 3.5 0 1 1 2 3"/></g>`,
  sparkle: `<path d="M-8 ${EY - 8}L-5.5 ${EY - 2}L1 ${EY}L-5.5 ${EY + 2}L-8 ${EY + 8}L-10.5 ${EY + 2}L-17 ${EY}L-10.5 ${EY - 2}ZM8 ${EY - 8}L10.5 ${EY - 2}L17 ${EY}L10.5 ${EY + 2}L8 ${EY + 8}L5.5 ${EY + 2}L-1 ${EY}L5.5 ${EY - 2}Z" fill="#fff6a0"/>`,
  off: `<path d="M-13 ${EY}h10M3 ${EY}h10" class="ln" stroke="#4a7a80" stroke-width="3"/>`,
};
const claw = (x, y, a = 0) => `<g transform="translate(${x} ${y}) rotate(${a})"><circle r="6" fill="#7f95ab" ${O2}/><path d="M-5 4L-7 11M5 4L7 11" class="ln" stroke="#3a3f55" stroke-width="5"/><path d="M-5 4L-7 11M5 4L7 11" class="ln" stroke="#9fb4c7" stroke-width="2.5"/></g>`;
const BARM = {
  down: [[-38, -50, -38, -30], [38, -50, 38, -30]],
  up: [[-42, -82, -40, -106], [42, -82, 40, -106]],
  hold: [[-38, -52, -14, -44], [38, -52, 14, -44]],
  reachL: [[-40, -56, -60, -52], [38, -50, 38, -30]],
  reachR: [[-38, -50, -38, -30], [40, -56, 60, -52]],
  pointR: [[-38, -50, -38, -30], [42, -66, 60, -86]],
};
const bobine = (x, y, s = 1, e = 'normal', pose = 'down', opt = {}) => {
  const A = BARM[pose];
  const on = e !== 'off';
  const mouth = opt.talk ? '<ellipse cx="0" cy="-87" rx="5" ry="3.4" fill="#7fffe0"/>' : (e === 'happy' || e === 'sparkle') ? '<path d="M-6 -88Q0 -82 6 -88" class="ln" stroke="#7fffe0" stroke-width="3"/>' : e === 'sad' ? '<path d="M-5 -85Q0 -90 5 -85" class="ln" stroke="#7fffe0" stroke-width="3"/>' : e === 'off' ? '' : '<path d="M-5 -87h10" class="ln" stroke="#7fffe0" stroke-width="3"/>';
  return `<g transform="translate(${x} ${y}) scale(${s})">
<ellipse cx="0" cy="2" rx="38" ry="6" fill="#2b2b3a" opacity=".2"/>
<rect x="-30" y="-14" width="60" height="12" rx="5" fill="#6f8aa3" ${O}/><circle cx="-18" cy="-9" r="10" fill="#4a5568" ${O}/><circle cx="18" cy="-9" r="10" fill="#4a5568" ${O}/><circle cx="-18" cy="-9" r="3.5" fill="#9fb4c7"/><circle cx="18" cy="-9" r="3.5" fill="#9fb4c7"/>
<rect x="-26" y="-72" width="52" height="60" rx="10" fill="url(#metal)" ${O}/>
<path d="M-26 -50H26M-26 -30H26" stroke="#3a3f55" stroke-width="1.5" opacity=".35"/>
<circle cx="-19" cy="-65" r="2.2" fill="#6f8aa3" stroke="#3a3f55" stroke-width="1"/><circle cx="19" cy="-65" r="2.2" fill="#6f8aa3" stroke="#3a3f55" stroke-width="1"/><circle cx="-19" cy="-19" r="2.2" fill="#6f8aa3" stroke="#3a3f55" stroke-width="1"/><circle cx="19" cy="-19" r="2.2" fill="#6f8aa3" stroke="#3a3f55" stroke-width="1"/>
<path d="M-24 -30q6 -6 10 2q-4 6 -10 -2Z M12 -62q8 -4 10 4q-6 4 -10 -4Z" fill="#b8693a" opacity=".85"/><circle cx="-16" cy="-60" r="3" fill="#b8693a" opacity=".8"/>
<rect x="-14" y="-62" width="28" height="18" rx="4" fill="#5d7690" ${O2}/><circle cx="-7" cy="-53" r="3" fill="${on ? '#ff7a59' : '#7a6a62'}"/><circle cx="1" cy="-53" r="3" fill="${on ? '#ffd84a' : '#7a7a62'}"/><circle cx="9" cy="-53" r="3" fill="${on ? '#5fe0a0' : '#627a6e'}"/>
<g><rect x="-13" y="-38" width="26" height="12" rx="2" fill="#a8693a" ${O2}/><path d="M-9 -34h7M-9 -30h12M3 -34h5" class="ln" stroke="#6e3e1e" stroke-width="1.6"/></g>
${A.map(([ex, ey, hx, hy], i) => `<path d="M${i ? 26 : -26} -62L${ex} ${ey}L${hx} ${hy}" class="ln" stroke="#3a3f55" stroke-width="12"/><path d="M${i ? 26 : -26} -62L${ex} ${ey}L${hx} ${hy}" class="ln" stroke="#8da3b8" stroke-width="8"/><circle cx="${ex}" cy="${ey}" r="5" fill="#6f8aa3" ${O2}/>${claw(hx, hy)}`).join('')}${opt.held || ''}
<rect x="-8" y="-80" width="16" height="10" fill="#6f8aa3" ${O2}/>
<circle cx="-30" cy="-98" r="7" fill="#7f95ab" ${O}/><circle cx="30" cy="-98" r="7" fill="#7f95ab" ${O}/><path d="M-32 -102h4M-32 -98h4M-32 -94h4M28 -102h4M28 -98h4M28 -94h4" stroke="#3a3f55" stroke-width="1.2"/>
<rect x="-26" y="-120" width="52" height="42" rx="13" fill="url(#metalH)" ${O}/>
<rect x="-20" y="-114" width="40" height="30" rx="8" fill="url(#screen)" ${O2}/>${on ? '<rect x="-20" y="-114" width="40" height="30" rx="8" fill="#7fffe0" opacity=".1"/>' : ''}
${on ? `<circle cx="-8" cy="${EY}" r="14" fill="url(#eyeglow)"/><circle cx="8" cy="${EY}" r="14" fill="url(#eyeglow)"/>` : ''}
${yeux[e]}${mouth}${opt.lunettes ? `<g class="ln" stroke="#ffd84a" stroke-width="2.5"><circle cx="-8" cy="${EY}" r="10"/><circle cx="8" cy="${EY}" r="10"/><path d="M-1 ${EY}h2"/></g>` : ''}
<path d="M-17 -112Q-8 -116 0 -113" fill="none" stroke="#fff" stroke-opacity=".6" stroke-width="2.5" stroke-linecap="round"/>
${e === 'sad' ? `<path d="M0 -120Q4 -128 12 -128" class="ln" stroke="#3a3f55" stroke-width="3.5"/><circle cx="14" cy="-128" r="5" fill="#d9704a" ${O2}/>` : `<path d="M0 -120V-132" class="ln" stroke="#3a3f55" stroke-width="3.5"/><circle cx="0" cy="-135" r="6" fill="${e === 'off' ? '#8a8f9f' : '#ff7a59'}" ${O2}/>${e === 'off' ? '' : '<circle cx="-2" cy="-137" r="1.8" fill="#fff"/><path d="M-12 -142l-5 -4M12 -142l5 -4M0 -146v-6" class="ln" stroke="#ffb703" stroke-width="2.5"/>'}`}
${opt.sueur ? '<path d="M34 -112q5 8 0 12q-5 -4 0 -12Z" fill="#8fd3f7" stroke="#3a3f55" stroke-width="1.5"/><path d="M-36 -108q4 7 0 10q-4 -3 0 -10Z" fill="#8fd3f7" stroke="#3a3f55" stroke-width="1.5"/>' : ''}
${opt.toiles ? '<path d="M-26 -120L-6 -150M-26 -120L-14 -134M-26 -120L-30 -146M-26 -120L-2 -130" class="ln" stroke="#d9d5e3" stroke-width="1.3"/><path d="M-22 -128Q-14 -132 -10 -142M-18 -124Q-10 -128 -6 -134" class="ln" stroke="#d9d5e3" stroke-width="1"/><path d="M-30 -74L-40 -40M-30 -74L-20 -52M-36 -60Q-28 -56 -24 -62" class="ln" stroke="#d9d5e3" stroke-width="1.3"/><path d="M26 -72L38 -44M26 -72L40 -66" class="ln" stroke="#d9d5e3" stroke-width="1.3"/>' : ''}</g>`;
};

// ---------- décors et objets ----------
const motes = (n, seed = 0) => Array.from({ length: n }, (_, i) => `<circle cx="${(i * 83 + seed * 37) % 380 + 10}" cy="${(i * 61 + seed * 23) % 190 + 20}" r="${1 + (i % 3) * 0.5}" fill="#fff" opacity=".7"/>`).join('');
const fenetre = (kind = 'day') => {
  const skyc = { day: '#a8dcf7', sunset: '#f59e5b', night: '#1f2a55', dim: '#7f9fc0' }[kind];
  const deco = kind === 'night'
    ? '<circle cx="224" cy="62" r="13" fill="#fff6c9"/><circle cx="231" cy="57" r="11" fill="#1f2a55"/><path d="M170 50l3 6l6 0l-5 4l2 6l-6 -4l-6 4l2 -6l-5 -4l6 0Z" fill="#fff6c9"/><circle cx="168" cy="90" r="2" fill="#fff6c9"/><circle cx="196" cy="70" r="1.8" fill="#fff6c9"/><circle cx="238" cy="96" r="2" fill="#fff6c9"/>'
    : kind === 'sunset' ? '<circle cx="200" cy="116" r="26" fill="#ffd84a"/><path d="M148 100H252V124H148Z" fill="#d9825f" opacity=".7"/><ellipse cx="170" cy="62" rx="16" ry="6" fill="#fde3a8" opacity=".8"/>'
      : '<ellipse cx="172" cy="58" rx="18" ry="7" fill="#fff" opacity=".9"/><ellipse cx="184" cy="52" rx="12" ry="6" fill="#fff" opacity=".9"/><ellipse cx="232" cy="88" rx="14" ry="5" fill="#fff" opacity=".85"/><path d="M148 124V108Q168 96 188 108Q210 96 252 110V124Z" fill="#6fbf73" opacity=".8"/>';
  const ray = kind === 'night' ? '' : `<path d="M150 134L84 232H316L250 134Z" fill="${kind === 'sunset' ? '#ffb86b' : '#fff6c9'}" opacity="${kind === 'dim' ? .15 : .3}"/>`;
  return `<path d="M148 124V62Q148 26 200 26Q252 26 252 62V124Z" fill="${skyc}" ${O}/>${deco}<path d="M200 26V124M148 76H252" stroke="#3a3f55" stroke-width="3"/><path d="M148 124V62Q148 26 200 26Q252 26 252 62V124Z" fill="none" stroke="#b9864f" stroke-width="5"/><rect x="140" y="122" width="120" height="10" rx="2" fill="#c9955a" ${O2}/>
<path d="M150 22Q164 70 152 126L130 126Q140 70 128 22Z" fill="#d9548a" ${O2}/><path d="M250 22Q236 70 248 126L270 126Q260 70 272 22Z" fill="#d9548a" ${O2}/><path d="M140 40Q146 80 142 120M260 40Q254 80 258 120" class="ln" stroke="#a83a6a" stroke-width="2"/>${ray}`;
};
const lampes = (g = 0.2) => [118, 282].map((x) => `<path d="M${x} 0V22" stroke="#3a3f55" stroke-width="2"/><path d="M${x - 16} 40Q${x} 12 ${x + 16} 40Z" fill="#f5c542" ${O2}/><ellipse cx="${x}" cy="41" rx="16" ry="3" fill="#fff3a8"/><path d="M${x - 16} 42L${x - 52} 120H${x + 52}L${x + 16} 42Z" fill="#fff3a8" opacity="${g}"/>`).join('');
const tapisR = (cx = 200, cy = 268, rx = 160, ry = 28) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#d9548a" ${O2}/><ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.82}" ry="${ry * 0.74}" fill="none" stroke="#f9d36b" stroke-width="3" stroke-dasharray="9 6"/><ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.55}" ry="${ry * 0.48}" fill="#e8749e" opacity=".7"/>`;
const biblio = ({ win = 'day', tapis = true, sombre = false, lampe = true, tapisPos } = {}) => `<use href="#room"/>${win ? fenetre(win) : ''}<use href="#shelves"/><use href="#plancher"/>${tapis ? tapisR(...(tapisPos || [])) : ''}${lampe ? lampes(sombre ? 0.1 : 0.2) : ''}${sombre ? '<rect width="400" height="300" fill="#2b2250" opacity=".34"/>' : motes(8, 2)}`;
const carte = (x, y, l, col, w = 36, h = 48, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="4" fill="#fffdf4" ${O2}/><rect x="${-w / 2 + 3}" y="${-h + 3}" width="${w - 6}" height="${h - 6}" rx="3" fill="none" stroke="${col}" stroke-width="1.5" opacity=".6"/><text class="lt" x="0" y="${-h * 0.22}" font-size="${Math.round(h * 0.7)}" fill="${col}">${l}</text></g>`;
const bloc = (x, y, l, col) => `<g transform="translate(${x} ${y})"><rect x="-14" y="-28" width="28" height="28" rx="4" fill="${col}" ${O2}/><path d="M-14 -22Q0 -26 14 -22" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="2"/><text class="lt" x="0" y="-6" font-size="21" fill="#fff">${l}</text></g>`;
const tableBasse = (x, y, w) => `<ellipse cx="${x + w / 2}" cy="290" rx="${w / 2 + 6}" ry="5" fill="#2b2b3a" opacity=".16"/><rect x="${x + 10}" y="${y + 14}" width="10" height="${288 - y - 14}" fill="#a9794e" ${O2}/><rect x="${x + w - 20}" y="${y + 14}" width="10" height="${288 - y - 14}" fill="#a9794e" ${O2}/><rect x="${x}" y="${y}" width="${w}" height="16" rx="4" fill="#e0a96b" ${O}/><rect x="${x + 4}" y="${y + 2}" width="${w - 8}" height="4" rx="2" fill="#fff" opacity=".28"/>`;
const tableauNoir = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="url(#board)" stroke="#9b6a3c" stroke-width="7"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="none" stroke="#3a3f55" stroke-width="2"/><path d="M${x + 12} ${y + h - 10}q20 -4 40 0M${x + w - 50} ${y + 14}q16 4 30 0" class="ln" stroke="#fff" stroke-width="2" opacity=".25"/><rect x="${x + 12}" y="${y + h + 2}" width="${w - 24}" height="7" fill="#9b6a3c" ${O2}/><rect x="${x + w - 52}" y="${y + h - 4}" width="16" height="6" rx="1.5" fill="#fff" stroke="#3a3f55" stroke-width="1.5"/><rect x="${x + w - 30}" y="${y + h - 6}" width="14" height="8" rx="2" fill="#c9804a" ${O2}/>`;
const arbre = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-4" width="8" height="20" fill="#8a5a36" stroke="#3a3f55" stroke-width="1.5"/><circle cx="0" cy="-18" r="17" fill="#6fbf73" stroke="#3a3f55" stroke-width="2"/><circle cx="-6" cy="-23" r="6" fill="#8fd493" opacity=".8"/><circle cx="8" cy="-14" r="3" fill="#e8604c"/><circle cx="-8" cy="-12" r="3" fill="#e8604c"/></g>`;
const livre = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-19" y="-26" width="38" height="52" rx="3" fill="#e8604c" ${O}/><rect x="-19" y="-26" width="8" height="52" rx="2" fill="#c94a3a" ${O2}/><rect x="-8" y="-20" width="24" height="40" rx="2" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="1.5"/><g transform="translate(4 8) scale(.55)">${arbre(0, 4)}</g></g>`;
const livreOuvert = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M-34 -16Q-16 -24 0 -15Q16 -24 34 -16V17Q16 10 0 19Q-16 10 -34 17Z" fill="#fffdf4" ${O}/><path d="M-34 17Q-16 10 0 19Q16 10 34 17V22Q16 15 0 24Q-16 15 -34 22Z" fill="#e8c88e" ${O2}/><path d="M0 -15V19" stroke="#3a3f55" stroke-width="2"/><path d="M-27 -8Q-16 -12 -6 -7M-27 0Q-16 -4 -6 1M-27 8Q-16 4 -6 9M6 -7Q16 -12 27 -8M6 1Q16 -4 27 0M6 9Q16 4 27 8" class="ln" stroke="#9aa0b8" stroke-width="2"/></g>`;
const etoiles = (pts) => pts.map(([x, y, r]) => `<path d="M${x} ${y - r}L${x + r * .3} ${y - r * .3}L${x + r} ${y}L${x + r * .3} ${y + r * .3}L${x} ${y + r}L${x - r * .3} ${y + r * .3}L${x - r} ${y}L${x - r * .3} ${y - r * .3}Z" fill="#ffd84a" ${O2}/>`).join('');
const sons = (x, y, f = 1) => `<path d="M${x} ${y - 10}q${8 * f} 10 0 20M${x + 9 * f} ${y - 17}q${12 * f} 17 0 34M${x + 18 * f} ${y - 24}q${16 * f} 24 0 48" class="ln" stroke="#3a3f55" stroke-width="3"/>`;
const coeur = (x, y, s = 1, c = '#ff5a7a') => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 8C-14 -2 -12 -14 -5 -14Q0 -14 0 -8Q0 -14 5 -14C12 -14 14 -2 0 8Z" fill="${c}" ${O2}/>`;
const bulleDeReve = (x, y, w, h, fx = -1) => `<circle cx="${x + fx * (w - 4)}" cy="${y + h + 22}" r="3.5" fill="#fff" ${O2}/><circle cx="${x + fx * (w - 12)}" cy="${y + h + 10}" r="6" fill="#fff" ${O2}/><ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="#fff9e6" ${O2}/>`;

const couverture = svg(`${biblio({ win: 'day' })}${felix(112, 296, 1.65, 'laugh', 'reachR')}${bobine(290, 296, 1.5, 'happy', 'reachL')}${livreOuvert(200, 196, 1.3)}${etoiles([[200, 150, 9], [240, 120, 6], [158, 128, 6]])}<g transform="translate(200 104)"><path d="M-30 -14l-8 -4" stroke="#3a3f55"/></g>${carte(170, 120, 'A', '#e8604c', 26, 34, -10)}${carte(205, 106, 'B', '#4a8fd0', 26, 34, 4)}${carte(240, 120, 'C', '#2f9a62', 26, 34, 12)}`);

export const book = {
  id: 'robot-de-la-bibliotheque',
  title: 'Le robot de la bibliothèque',
  emoji: '🤖',
  level: 3,
  minutes: 10,
  cover: couverture,
  pages: [
    // 1
    { svg: svg(`${biblio({ win: 'day', tapis: false })}
${tableBasse(212, 232, 188)}
${enfant(252, 262, 1.15, K1, 'laugh', 'up')}${enfant(318, 264, 1.15, K2, 'laugh', 'clap')}${enfant(372, 262, 1.1, K3, 'joy', 'up')}
${tableBasse(212, 232, 188).replace(/<ellipse[^>]*\/>/, '')}
${[[240, 236, '#e8604c'], [270, 236, '#4a8fd0'], [336, 236, '#f5c542']].map(([x, y, c]) => `<rect x="${x}" y="${y - 12}" width="16" height="12" rx="2" fill="${c}" ${O2}/>`).join('')}
<path d="M236 160q6 -10 12 0M300 146q6 -10 12 0M352 158q6 -10 12 0" class="ln" stroke="#3a3f55" stroke-width="3"/>
${felix(88, 298, 1.7, 'shy', 'hold', livre(0, -42, .7))}`),
      text: 'Félix est un garçon timide. Quand il y a trop de monde, ses mots se cachent au fond de sa gorge. Il aime donc la bibliothèque, où tout est silencieux. Pendant que les autres rient autour d\'une table, il cherche un livre tout seul.' },
    // 2
    { svg: svg(`${biblio({ win: 'dim', tapis: false, sombre: true, lampe: false })}
<path d="M300 118L255 292H345Z" fill="#fff6c9" opacity=".22"/>${motes(14, 5)}
${bobine(305, 296, 1.45, 'off', 'down', { toiles: true })}
<g transform="translate(305 296) scale(1.45)"><path d="M-14 -40q-3 8 0 14M-4 -40q3 10 0 16" class="ln" stroke="#d9d5e3" stroke-width="1.2" opacity=".6"/></g>
<g fill="#d9d5e3" opacity=".8"><circle cx="250" cy="270" r="4"/><circle cx="262" cy="282" r="3"/><circle cx="352" cy="276" r="4"/><ellipse cx="305" cy="296" rx="52" ry="4" opacity=".4"/></g>
${felix(98, 298, 1.6, 'wow', 'pointR')}`),
      text: 'Un mardi, derrière la dernière étagère, Félix découvre un vieux robot couvert de poussière. Des toiles d\'araignée pendent à ses oreilles. Sur sa poitrine, une plaque rouillée dit : « Bobine, bibliothécaire ».' },
    // 3
    { svg: svg(`${biblio({ win: 'day' })}${felix(100, 298, 1.6, 'shy', 'wave')}${bobine(282, 298, 1.45, 'wide', 'hold', { talk: true, held: livre(0, -52, 1, 180).replace('<g transform="translate(0 0)', '<g') })}<g transform="translate(282 298) scale(1.45)">${livre(0, -52, 1, 180)}</g>
${sons(338, 220, 1)}${etoiles([[340, 110, 6], [214, 150, 5]])}<path d="M196 150l-8 -6M206 140l-6 -10M222 138l2 -10" class="ln" stroke="#ffb703" stroke-width="3"/>`),
      text: '« Bonjour », murmure Félix. Les yeux du robot s\'allument en grinçant. — Bonjour, petit, dit-il. Je suis Bobine. Mais regarde, je tiens mon livre à l\'envers : je ne sais plus lire!' },
    // 4
    { svg: svg(`${biblio({ win: 'dim', tapis: false })}${felix(96, 298, 1.6, 'sad', 'throat')}${bobine(250, 298, 1.35, 'sad', 'down')}
${bulleDeReve(318, 88, 78, 52, -1)}<ellipse cx="318" cy="88" rx="70" ry="44" fill="#ffe9b8" opacity=".6"/><ellipse cx="318" cy="132" rx="52" ry="6" fill="#d9548a" opacity=".8"/>
${bobine(318, 128, .42, 'happy', 'hold', { talk: true })}${enfant(276, 130, .46, K1, 'smile', 'down', '', true)}${enfant(360, 130, .46, K2, 'smile', 'down', '', true)}${enfant(296, 126, .38, K3, 'laugh', 'down', '', true)}${enfant(344, 126, .38, K4, 'smile', 'down', '', true)}${livreOuvert(318, 104, .34)}`),
      text: 'Bobine baisse la tête. — Je me suis endormi pendant des années. À mon réveil, j\'avais oublié les lettres. Autrefois, les enfants s\'assoyaient autour de moi pour écouter des histoires. Félix sent son cœur se serrer.' },
    // 5
    { svg: svg(`${biblio({ win: 'day' })}${tableBasse(150, 236, 130)}${carte(180, 236, 'A', '#e8604c', 34, 46, -6)}${carte(215, 236, 'B', '#4a8fd0', 34, 46)}${carte(250, 236, 'C', '#2f9a62', 34, 46, 6)}${felix(84, 298, 1.65, 'laugh', 'up')}${bobine(330, 298, 1.45, 'moon', 'down', { talk: true })}${etoiles([[330, 90, 8], [150, 110, 6], [300, 70, 5]])}${sons(268, 150, -1).replace(/M2/, 'M2')}`),
      text: 'Félix hésite, puis il prend une grande respiration. — Moi, je peux t\'apprendre! dit-il, d\'une voix plus forte qu\'il ne le croyait. Les yeux de Bobine s\'agrandissent comme deux lunes.' },
    // 6
    { svg: svg(`${biblio({ win: null, tapis: false })}${tableauNoir(118, 44, 164, 134)}<text class="lt" x="170" y="150" font-size="96" fill="#fff">A</text>${arbre(238, 160, 1.7)}${felix(78, 298, 1.6, 'smile', 'pointR')}${bobine(334, 298, 1.45, 'sparkle', 'down', { talk: true })}${sons(300, 190, -1)}`),
      text: 'Ils commencent par la lettre A. — Cette lettre fait le son « a », comme dans arbre, explique Félix. — Aaaa, répète Bobine. Il est si content que son antenne se met à clignoter.' },
    // 7
    { svg: svg(`${biblio({ win: null, tapis: false })}${tableauNoir(96, 44, 208, 134)}<text class="lt" x="165" y="150" font-size="96" fill="#f9d36b">M</text><text class="lt" x="242" y="150" font-size="96" fill="#fff">A</text><path d="M122 164Q200 196 280 164" class="ln" stroke="#ff7a59" stroke-width="4"/>${felix(60, 298, 1.6, 'laugh', 'pointR')}${bobine(338, 298, 1.45, 'sparkle', 'up', { talk: true })}${sons(308, 210, -1)}`),
      text: 'Le lendemain, Félix colle un M et un A l\'un contre l\'autre. — Mmm… aaa… ma! lit Bobine. Il vient de lire sa première syllabe!' },
    // 8
    { svg: svg(`${biblio({ win: 'sunset', tapis: false })}
<g transform="translate(336 48) scale(.85)"><rect x="-44" y="-30" width="88" height="82" rx="4" fill="#fffdf4" ${O}/><rect x="-44" y="-30" width="88" height="14" rx="4" fill="#e8604c" ${O2}/><circle cx="-24" cy="-32" r="3" fill="#3a3f55"/><circle cx="24" cy="-32" r="3" fill="#3a3f55"/>${[0, 1, 2, 3, 4].map((c) => [0, 1, 2].map((r) => `<rect x="${-38 + c * 16}" y="${-10 + r * 20}" width="14" height="17" fill="none" stroke="#c9ccd8"/>`).join('')).join('')}${[[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [0, 1], [1, 1], [2, 1], [3, 1]].map(([c, r]) => `<path d="M${-36 + c * 16} ${-8 + r * 20}l10 13M${-26 + c * 16} ${-8 + r * 20}l-10 13" class="ln" stroke="#e03a3a" stroke-width="2.4"/>`).join('')}</g>
${tableBasse(120, 236, 190)}${bloc(150, 236, 'B', '#4a8fd0')}${bloc(182, 236, 'O', '#e8604c')}${bloc(214, 236, 'N', '#2f9a62')}${bloc(250, 236, 'S', '#9b6fb5')}${bloc(284, 236, 'R', '#f08a3c')}

${felix(64, 298, 1.6, 'laugh', 'up')}${bobine(352, 298, 1.4, 'happy', 'down')}`),
      text: 'Les jours passent, et chaque après-midi, après l\'école, la leçon recommence. Bobine apprend les lettres, les sons et les syllabes. Sur le calendrier, Félix coche chaque journée avec un crayon rouge.' },
    // 9
    { svg: svg(`${biblio({ win: 'day' })}${tableBasse(120, 236, 160)}${carte(168, 236, 'b', '#4a8fd0', 50, 66)}${carte(238, 236, 'd', '#e8604c', 50, 66)}<path d="M150 172V200M222 172V200" class="ln" stroke="#ffd84a" stroke-width="0"/>${felix(74, 298, 1.6, 'laugh', 'pointR')}${bobine(336, 298, 1.45, 'dizzy', 'up')}<g transform="translate(336 160)"><circle cx="0" cy="0" r="30" fill="none" stroke="#ffd84a" stroke-width="2.5" stroke-dasharray="3 8" stroke-linecap="round"/>${etoiles([[-30, 0, 6], [24, -16, 5], [10, 26, 5]])}</g>`),
      text: 'Un jour, Bobine mélange le b et le d. Ses yeux tournent comme des toupies! — Regarde, lui dit Félix en riant doucement, le b a son bâton à gauche et son ventre à droite. Bobine essaie, essaie encore, et finit par comprendre.' },
    // 10
    { svg: svg(`${biblio({ win: 'day' })}${tableBasse(110, 236, 190)}${bloc(142, 236, 'C', '#e8604c')}${bloc(174, 236, 'H', '#4a8fd0')}${bloc(206, 236, 'A', '#2f9a62')}${bloc(238, 236, 'T', '#9b6fb5')}
<g transform="translate(278 236)"><rect x="-20" y="-56" width="40" height="56" rx="4" fill="#fffdf4" ${O2}/><circle cx="0" cy="-30" r="13" fill="#f5a84a" ${O2}/><path d="M-11 -38L-13 -52L-4 -43M11 -38L13 -52L4 -43Z" fill="#f5a84a" ${O2}/><circle cx="-5" cy="-32" r="1.8" fill="#3a3f55"/><circle cx="5" cy="-32" r="1.8" fill="#3a3f55"/><path d="M-4 -25Q0 -22 4 -25" fill="none" stroke="#3a3f55" stroke-width="1.5"/><path d="M-12 -28h-8M12 -28h8" stroke="#3a3f55" stroke-width="1"/></g>
${felix(64, 298, 1.6, 'joy', 'up')}${bobine(342, 298, 1.45, 'sparkle', 'up', { talk: true })}${etoiles([[300, 100, 8], [366, 118, 6], [96, 100, 6], [220, 90, 5]])}`),
      text: 'Quelques semaines plus tard, Félix aligne quatre blocs : C, H, A, T. Bobine les lit lentement, puis plus vite. — Chat! s\'écrie-t-il, les yeux brillants comme des étoiles. Il vient de lire son premier mot!' },
    // 11
    { svg: svg(`${biblio({ win: 'night', tapis: true })}${bobine(262, 298, 1.45, 'normal', 'hold', { lunettes: true, held: livreOuvert(0, -46, .7) })}
${felix(120, 298, 1.6, 'joy', 'clap', '<circle cx="-5" cy="-56" r="6.5" fill="#ff6a4a" class="k2"/><circle cx="5" cy="-56" r="6.5" fill="#ff6a4a" class="k2"/><path d="M-16 -68l-7 -6M0 -72v-9M16 -68l7 -6" class="ln" stroke="#ffb703" stroke-width="3"/>')}
${etoiles([[330, 130, 7], [196, 120, 6], [60, 130, 5]])}${sons(160, 200, 0).replace(/./, '')}`),
      text: 'Peu à peu, les mots deviennent des phrases, et les phrases, des pages. Un soir, Bobine ouvre un petit album et le lit jusqu\'à la fin, sans se tromper. Félix applaudit si fort que ses mains rougissent.' },
    // 12
    { svg: svg(`${biblio({ win: 'day', tapis: true, tapisPos: [200, 262, 190, 34] })}
${enfant(160, 236, .9, K1, 'smile', 'down', '', true)}${enfant(262, 234, .9, K3, 'smile', 'down', '', true)}
${enfant(124, 284, 1.15, K3, 'smile', 'down', '', true)}${enfant(200, 292, 1.2, K4, 'laugh', 'down', '', true)}${enfant(272, 288, 1.15, K2, 'smile', 'down', '', true)}
${felix(44, 298, 1.4, 'shy', 'throat')}${bobine(352, 298, 1.35, 'wide', 'hold', { sueur: true, held: livre(0, -50, 1) })}`),
      text: 'Le samedi, c\'est l\'heure du conte. Les enfants arrivent en grand nombre et s\'installent sur le tapis. Bobine panique : — Et si je me trompais devant tout le monde? Félix, lui, a la gorge serrée à cause de tous ces regards.' },
    // 13
    { svg: svg(`${biblio({ win: 'dim', tapis: false })}${felix(112, 298, 1.9, 'smile', 'reachR')}${bobine(290, 298, 1.7, 'sad', 'reachL')}<circle cx="200" cy="208" r="26" fill="url(#glow)"/>${etoiles([[200, 160, 7]])}${coeur(200, 168, .9)}`),
      text: 'Félix prend la pince froide du robot dans sa main. — Moi aussi, j\'ai peur, avoue-t-il. Mais tu es prêt, Bobine, et je reste à côté de toi. Le robot respire un grand coup, et son antenne cesse de trembler.' },
    // 14
    { svg: svg(`${biblio({ win: 'day', tapis: true, tapisPos: [200, 270, 170, 26] })}
<g transform="translate(200 250)"><path d="M-62 0V-38Q-62 -56 -44 -56H44Q62 -56 62 -38V0Z" fill="#9b6fb5" ${O}/><rect x="-70" y="-30" width="22" height="34" rx="9" fill="#8a5fa6" ${O}/><rect x="48" y="-30" width="22" height="34" rx="9" fill="#8a5fa6" ${O}/><rect x="-64" y="-8" width="128" height="14" rx="5" fill="#a97fc0" ${O}/></g>
${bobine(200, 250, 1.3, 'happy', 'hold', { talk: true, held: livreOuvert(0, -46, .75) })}
<g transform="translate(110 116)"><ellipse rx="14" ry="10" fill="#c9ccd8" ${O2}/><circle cx="-8" cy="-9" r="6" fill="#c9ccd8" ${O2}/><circle cx="8" cy="-9" r="6" fill="#c9ccd8" ${O2}/><circle cx="-4" cy="-2" r="1.6" fill="#3a3f55"/><circle cx="5" cy="-2" r="1.6" fill="#3a3f55"/><path d="M14 4q14 6 20 -4" class="ln" stroke="#3a3f55" stroke-width="2"/></g>
<g transform="translate(292 118)"><path d="M0 -16Q14 -4 8 24H-8Q-14 -4 0 -16Z" fill="#fff" ${O2}/><circle cx="0" cy="-2" r="5" fill="#6aa5d9" ${O2}/><path d="M-8 24L-16 34L-6 28M8 24L16 34L6 28" fill="#e8604c" ${O2}/></g>
<g transform="translate(200 78)"><circle r="15" fill="#f5a84a" ${O2}/><path d="M-10 -10L-12 -22L-3 -14M10 -10L12 -22L3 -14Z" fill="#f5a84a" ${O2}/><circle cx="-5" cy="-3" r="2" fill="#3a3f55"/><circle cx="5" cy="-3" r="2" fill="#3a3f55"/><path d="M-4 4Q0 7 4 4" fill="none" stroke="#3a3f55" stroke-width="1.6"/></g>
${etoiles([[150, 90, 5], [250, 96, 5], [330, 80, 5]])}
${enfant(62, 292, 1.2, K1, 'laugh', 'up', '', true)}${enfant(134, 296, 1.2, K2, 'wow', 'down', '', true)}${enfant(268, 296, 1.2, K3, 'laugh', 'clap', '', true)}${enfant(344, 292, 1.2, K4, 'joy', 'up', '', true)}`),
      text: 'Bobine ouvre le livre et lit l\'histoire d\'une souris qui voulait aller sur la lune. Il fait la voix de la souris, puis celle du chat, puis celle de la fusée. Les enfants rient aux éclats, et personne ne bouge.' },
    // 15
    { svg: svg(`${biblio({ win: 'sunset', tapis: true, tapisPos: [200, 266, 170, 26] })}
${bobine(200, 232, 1.15, 'happy', 'up')}${enfant(58, 246, 1.0, K1, 'laugh', 'clap')}${enfant(112, 240, 1.0, K2, 'joy', 'up')}${enfant(290, 240, 1.0, K3, 'laugh', 'clap')}${enfant(344, 246, 1.0, K4, 'joy', 'up')}
${etoiles([[160, 70, 8], [245, 80, 7], [200, 52, 6], [326, 110, 6], [78, 108, 6]])}${coeur(200, 40, 1.3)}
<g transform="translate(300 150)"><ellipse rx="26" ry="20" fill="#fff" ${O2}/><circle cx="-8" cy="-2" r="4" fill="#ffd84a"/><circle cx="6" cy="-2" r="4" fill="#ff7a59"/><path d="M-14 22L-22 32L-4 22Z" fill="#fff" ${O2}/></g>
${felix(110, 300, 1.55, 'laugh', 'pointR')}${enfant(268, 300, 1.55, K4, 'laugh', 'wave')}${coeur(190, 188, .9, '#ff8fa8')}`),
      text: 'Quand le robot referme le livre, toute la salle applaudit. — Merci, Félix, dit Bobine. Tu m\'as rendu les mots. Ce soir-là, Félix bavarde sans rougir avec un nouvel ami, et il découvre que ses mots ne se cachent plus.' },
  ],
  words: [
    { word: 'la bibliothèque', emoji: '📚', def: 'Un endroit calme où l\'on peut lire et emprunter des livres.' },
    { word: 'timide', emoji: '😳', def: 'Quelqu\'un qui a de la difficulté à parler devant les autres.' },
    { word: 'la poussière', emoji: '🌫️', def: 'De minuscules saletés grises qui se posent sur les objets oubliés.' },
    { word: 'rouillé', emoji: '🔩', def: 'Couvert de rouille, la tache brune qui ronge le métal.' },
    { word: 'une syllabe', emoji: '🔤', def: 'Un petit morceau de mot qu\'on dit d\'un seul coup, comme « ma ».' },
    { word: 'hésiter', emoji: '🤔', def: 'Prendre du temps avant de se décider, parce qu\'on n\'est pas sûr.' },
    { word: 'autrefois', emoji: '⏳', def: 'Dans le passé, il y a longtemps.' },
    { word: 'l\'heure du conte', emoji: '📖', def: 'Le moment où l\'on lit une histoire à voix haute aux enfants.' },
    { word: 'applaudir', emoji: '👏', def: 'Frapper dans ses mains pour dire bravo.' },
  ],
  quiz: [
    { q: 'Pourquoi Félix aime-t-il la bibliothèque?', options: ['Parce qu\'on y joue', 'Parce que tout y est silencieux', 'Parce qu\'on y mange'], answer: 1 },
    { q: 'Comment s\'appelle le robot?', options: ['Bobine', 'Gadget', 'Rouli'], answer: 0 },
    { q: 'Pourquoi Bobine ne sait-il plus lire?', options: ['Il n\'a jamais appris', 'Il a oublié après avoir dormi longtemps', 'Son livre est trop petit'], answer: 1 },
    { q: 'Quelle est la première lettre que Félix enseigne à Bobine?', options: ['M', 'C', 'A'], answer: 2 },
    { q: 'Quelles lettres Bobine mélange-t-il?', options: ['Le b et le d', 'Le m et le a', 'Le c et le h'], answer: 0 },
    { q: 'Quel est le premier mot que Bobine lit en entier?', options: ['Chat', 'Livre', 'Lune'], answer: 0 },
    { q: 'Pourquoi Bobine panique-t-il le samedi?', options: ['Il a perdu son livre', 'Il a peur de se tromper devant les enfants', 'Il est fâché contre Félix'], answer: 1 },
    { q: 'Comment Félix a-t-il changé à la fin de l\'histoire?', options: ['Il parle plus facilement, même avec un nouvel ami', 'Il déteste la bibliothèque', 'Il n\'aime plus lire'], answer: 0 },
  ],
};
