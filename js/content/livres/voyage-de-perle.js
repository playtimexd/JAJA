// « Le voyage de Perle, la goutte d'eau » — niveau 3
const O = 'class="k3"';
const O2 = 'class="k2"';
const grad = (id, a, b, v = true) => `<linearGradient id="${id}" x1="0" y1="0" x2="${v ? 0 : 1}" y2="${v ? 1 : 0}"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;
const DEFS = `<defs>${grad('skyDay', '#62bdf0', '#e4f6fc')}${grad('skyHot', '#4fb0ec', '#f6f1d0')}${grad('skyCold', '#3f6fc4', '#b5dcf6')}${grad('skyStorm', '#6c7fae', '#cdd8ea')}${grad('skyNight', '#141c45', '#4a5f98')}${grad('skyDusk', '#ee8a54', '#fde5ab')}${grad('skyKitchen', '#fde9c3', '#f7d49c')}
${grad('lac', '#52b8ee', '#1f72bd')}${grad('lacDusk', '#e8895e', '#7a4f9a')}${grad('snow', '#ffffff', '#d6e6f7')}${grad('grass', '#7ccb6a', '#4e9f58')}${grad('earth', '#a47a52', '#6e4c32')}${grad('floorK', '#e8b97f', '#c9954f')}${grad('fishG', '#f8b25a', '#e8782e')}${grad('cloudG', '#ffffff', '#c9dff2')}${grad('rivG', '#6fcdf8', '#3a98dc')}${grad('glassG', '#ffffff', '#cfeaff')}
<radialGradient id="dropG" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#b9ecff"/><stop offset=".55" stop-color="#5ec3f5"/><stop offset="1" stop-color="#2b8fdc"/></radialGradient>
<radialGradient id="halo"><stop offset="0" stop-color="#ffffff" stop-opacity=".9"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
<radialGradient id="sunG"><stop offset="0" stop-color="#fff3a8" stop-opacity=".95"/><stop offset="1" stop-color="#fff3a8" stop-opacity="0"/></radialGradient>
<radialGradient id="skinL" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fbd9b8"/><stop offset="1" stop-color="#eeb98c"/></radialGradient>
<radialGradient id="moonG"><stop offset="0" stop-color="#fff6c9" stop-opacity=".8"/><stop offset="1" stop-color="#fff6c9" stop-opacity="0"/></radialGradient></defs>`;
const svg = (s) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${DEFS}<style>.k3,.k2{stroke:#3a3f55;stroke-linejoin:round;stroke-linecap:round}.k3{stroke-width:3}.k2{stroke-width:2}.ln{fill:none;stroke-linecap:round;stroke-linejoin:round}</style>${s}</svg>`;
const limb = (a, b, c, d, w, col) => `<path d="M${a} ${b}L${c} ${d}" class="ln" stroke="#3a3f55" stroke-width="${w + 4}"/><path d="M${a} ${b}L${c} ${d}" class="ln" stroke="${col}" stroke-width="${w}"/>`;
const sky = (id) => `<rect width="400" height="300" fill="url(#${id})"/>`;

// ---------- visages (Perle, Gaspard, Louis) ----------
const eye = (x, k = 1) => `<ellipse cx="${x}" cy="0" rx="3.6" ry="${(4.2 * k).toFixed(1)}" fill="#2f3248"/><circle cx="${x + 1.2}" cy="${(-1.6 * k).toFixed(1)}" r="1.5" fill="#fff"/><circle cx="${x - 1.3}" cy="${(1.9 * k).toFixed(1)}" r=".8" fill="#fff" opacity=".8"/>`;
const face = (m, brow = '#3a3f55') => {
  const ck = m === 'hot' ? 0.85 : 0.5;
  const cheeks = `<circle cx="-13.5" cy="7" r="4.2" fill="#f28b82" opacity="${ck}"/><circle cx="13.5" cy="7" r="4.2" fill="#f28b82" opacity="${ck}"/>`;
  const B = (d) => `<path d="${d}" fill="none" stroke="${brow}" stroke-width="2.2" stroke-linecap="round"/>`;
  let eyes = eye(-8) + eye(8), brows = B('M-12 -9 Q-8 -12 -4 -9 M4 -9 Q8 -12 12 -9'), mouth = `<path d="M-5.5 9.5 Q0 15 5.5 9.5" fill="none" ${O2}/>`, extra = '';
  const open = `<path d="M-7.5 8 Q0 22 7.5 8Z" fill="#8e2f3a" ${O2}/><ellipse cx="0" cy="13" rx="3.6" ry="2" fill="#e8737e"/>`;
  if (m === 'laugh') { eyes = `<path d="M-12.5 1 Q-8 -5.5 -3.5 1 M3.5 1 Q8 -5.5 12.5 1" fill="none" ${O2}/>`; brows = B('M-12 -9 Q-8 -13 -4 -10 M4 -10 Q8 -13 12 -9'); mouth = open; }
  if (m === 'joy') { eyes = eye(-8, 1.15) + eye(8, 1.15); brows = B('M-12 -10 Q-8 -14 -4 -11 M4 -11 Q8 -14 12 -10'); mouth = open; }
  if (m === 'wow') { eyes = eye(-8, 1.3) + eye(8, 1.3); brows = B('M-12 -12 Q-8 -16 -4 -12 M4 -12 Q8 -16 12 -12'); mouth = `<ellipse cx="0" cy="12.5" rx="3.6" ry="4.6" fill="#8e2f3a" ${O2}/>`; }
  if (m === 'sleepy') { eyes = `<path d="M-12.5 -1 Q-8 4 -3.5 -1 M3.5 -1 Q8 4 12.5 -1" fill="none" ${O2}/>`; brows = B('M-12 -7 Q-8 -9 -4 -7 M4 -7 Q8 -9 12 -7'); mouth = `<path d="M-3.5 10 Q0 12.5 3.5 10" fill="none" ${O2}/>`; }
  if (m === 'hot') { eyes = eye(-8, .85) + eye(8, .85); brows = B('M-12 -6 L-4 -9.5 M12 -6 L4 -9.5'); mouth = `<path d="M-5 13 Q-2 9 0 12 Q2 9 5 13" fill="none" ${O2}/>`; extra = '<path d="M17 -8 q3.5 5 0 8.5 q-3.5 -3.5 0 -8.5Z" fill="#8fd3f7" stroke="#3a3f55" stroke-width="1.3"/><path d="M-18 -2 q3 4 0 7 q-3 -3 0 -7Z" fill="#8fd3f7" stroke="#3a3f55" stroke-width="1.2"/>'; }
  if (m === 'scared') { eyes = eye(-8, 1.35) + eye(8, 1.35); brows = B('M-12 -9 L-4 -13 M12 -9 L4 -13'); mouth = `<path d="M-6 13 Q-3 9 0 12 Q3 9 6 13" fill="#8e2f3a" ${O2}/>`; extra = '<path d="M17 -6 q3 4 0 7 q-3 -3 0 -7Z" fill="#8fd3f7" stroke="#3a3f55" stroke-width="1.2"/>'; }
  if (m === 'drink') { eyes = `<path d="M-12.5 1 Q-8 -5 -3.5 1 M3.5 1 Q8 -5 12.5 1" fill="none" ${O2}/>`; brows = B('M-12 -8 Q-8 -11 -4 -8 M4 -8 Q8 -11 12 -8'); mouth = ''; }
  return cheeks + eyes + brows + mouth + extra;
};

// ---------- Perle : une goutte, une vapeur, un nuage ou un flocon (même visage) ----------
const DROP = 'M0 -32C7 -17 22 -7 22 8A22 22 0 0 1 -22 8C-22 -7 -7 -17 0 -32Z';
const flakeArms = (w, col) => [0, 60, 120].map((r) => `<path d="M0 -38V38M-9 -27L0 -18L9 -27M-9 27L0 18L9 27M-7 -12L0 -5L7 -12M-7 12L0 5L7 12" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="rotate(${r})"/>`).join('');
const perle = (x, y, s = 1, form = 'goutte', m = 'smile', rot = 0) => {
  let body;
  if (form === 'goutte') body = `<path d="${DROP}" fill="url(#dropG)" ${O}/><path d="M-18 14Q0 31 18 14Q10 28 0 29Q-10 28 -18 14Z" fill="#1b6fc0" opacity=".25"/><path d="M-15 1Q-17 14 -10 21" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".95"/><circle cx="-12" cy="-6" r="2.6" fill="#fff"/><g transform="translate(0 7) scale(.86)">${face(m)}</g>`;
  else if (form === 'vapeur') body = `<circle cx="0" cy="0" r="52" fill="url(#halo)"/><path d="${DROP}" fill="#f7fcff" fill-opacity=".92" stroke="#5f8fbd" stroke-width="3.5" stroke-dasharray="7 4" stroke-linecap="round"/><path d="M-12 -4q6 -6 12 0t12 0M-14 20q7 -6 14 0t14 0" class="ln" stroke="#cfe6f8" stroke-width="3"/><g transform="translate(0 7) scale(.86)">${face(m)}</g>
${[[-14, -36, 0], [0, -44, 8], [14, -36, 0]].map(([dx, dy, o]) => `<path d="M${dx} ${dy}q-7 -8 0 -16t0 -16" class="ln" stroke="#8fb8da" stroke-width="7"/><path d="M${dx} ${dy}q-7 -8 0 -16t0 -16" class="ln" stroke="#fff" stroke-width="4"/>`).join('')}
<circle cx="-30" cy="-16" r="3" fill="#fff" stroke="#8fb8da" stroke-width="1.5"/><circle cx="32" cy="-6" r="4" fill="#fff" stroke="#8fb8da" stroke-width="1.5"/><circle cx="26" cy="22" r="2.5" fill="#fff" stroke="#8fb8da" stroke-width="1.5"/>`;
  else if (form === 'nuage') body = `<g ${O}><circle cx="-24" cy="8" r="16" fill="#e4effa"/><circle cx="24" cy="8" r="16" fill="#e4effa"/><circle cx="-8" cy="-6" r="21" fill="#f4f9fe"/><circle cx="14" cy="-3" r="17" fill="#f4f9fe"/><ellipse cx="0" cy="16" rx="34" ry="13" fill="#e4effa"/></g><g fill="url(#cloudG)"><circle cx="-24" cy="8" r="14.5"/><circle cx="24" cy="8" r="14.5"/><circle cx="-8" cy="-6" r="19.5"/><circle cx="14" cy="-3" r="15.5"/><ellipse cx="0" cy="16" rx="32" ry="11.5"/></g><path d="M-26 18Q0 30 26 18" fill="none" stroke="#a9c7e4" stroke-width="3" stroke-linecap="round" opacity=".7"/><path d="M0 -44C4 -37 11 -33 11 -27A11 11 0 0 1 -11 -27C-11 -33 -4 -37 0 -44Z" fill="url(#dropG)" ${O2}/><g transform="translate(0 6)">${face(m)}</g>`;
  else body = `<circle r="46" fill="url(#halo)"/>${flakeArms(11, '#3a3f55')}${flakeArms(6, '#d8f1ff')}<path d="M0 -26L22 -13L22 13L0 26L-22 13L-22 -13Z" fill="#f2faff" ${O}/><path d="M-18 -10L-6 -22" stroke="#fff" stroke-width="3" stroke-linecap="round"/><g transform="translate(0 2) scale(.85)">${face(m)}</g>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${body}</g>`;
};
const petiteGoutte = (x, y, s = 0.5, m = 'smile') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="${DROP}" fill="url(#dropG)" ${O}/><path d="M-14 2Q-16 13 -9 19" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><g transform="translate(0 7) scale(.86)">${face(m)}</g></g>`;

// ---------- Gaspard le poisson ----------
const poisson = (x, y, s = 1, flip = false, m = 'smile', rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${flip ? -s : s} ${s})">
<path d="M-24 0L-44 -16Q-40 0 -44 16Z" fill="#f08a3c" ${O}/><path d="M-34 0L-41 -8M-34 0L-41 8" stroke="#c8641f" stroke-width="1.6" fill="none"/>
<path d="M-6 -17Q2 -32 14 -16Z" fill="#f08a3c" ${O2}/><path d="M-2 14Q4 28 14 14Z" fill="#f08a3c" ${O2}/>
<ellipse cx="0" cy="0" rx="28" ry="18" fill="url(#fishG)" ${O}/><path d="M-14 -14Q-8 0 -14 14M-4 -17Q2 0 -4 17" fill="none" stroke="#e8602a" stroke-width="3" stroke-linecap="round" opacity=".6"/>
<ellipse cx="4" cy="8" rx="16" ry="7" fill="#ffe0a8" opacity=".7"/>
<circle cx="14" cy="-4" r="6.5" fill="#fff" ${O2}/><circle cx="15.5" cy="-4" r="3.2" fill="#2f3248"/><circle cx="16.5" cy="-5.4" r="1.2" fill="#fff"/>
${m === 'laugh' ? `<path d="M12 6 Q20 16 26 4Z" fill="#8e2f3a" ${O2}/>` : `<path d="M13 7 Q20 12 25 5" fill="none" ${O2}/>`}
<circle cx="8" cy="5" r="3" fill="#f28b82" opacity=".6"/></g>`;

// ---------- Louis le garçon ----------
const POSE = { down: [[-21, -44, -22, -27], [21, -44, 22, -27]], up: [[-30, -70, -32, -94], [30, -70, 32, -94]], reachR: [[-21, -44, -22, -27], [28, -48, 44, -44]], hold: [[-22, -44, -9, -38], [22, -44, 9, -38]] };
const arm = (sx, sy, ex, ey, hx, hy, col) => `<path d="M${sx} ${sy}L${ex} ${ey}L${hx} ${hy}" class="ln" stroke="#3a3f55" stroke-width="12"/><path d="M${sx} ${sy}L${ex} ${ey}L${hx} ${hy}" class="ln" stroke="${col}" stroke-width="8"/><circle cx="${hx}" cy="${hy}" r="5.2" fill="#f6c9a0" ${O2}/>`;
const louis = (x, y, s = 1, m = 'smile', pose = 'down', held = '', armsOn = true) => `<g transform="translate(${x} ${y}) scale(${s})">
<ellipse cx="0" cy="2" rx="30" ry="6" fill="#2b2b3a" opacity=".17"/>
${limb(-7, -32, -7, -6, 11, '#f6c9a0')}${limb(7, -32, 7, -6, 11, '#f6c9a0')}
<ellipse cx="-8.5" cy="-2" rx="9.5" ry="5" fill="#4a6fa5" ${O2}/><ellipse cx="8.5" cy="-2" rx="9.5" ry="5" fill="#4a6fa5" ${O2}/>
<path d="M-17 -40H17L16 -24Q0 -20 -16 -24Z" fill="#4aa56e" ${O}/>
<path d="M-19 -30Q-22 -48 -15 -64Q0 -69 15 -64Q22 -48 19 -30Q0 -26 -19 -30Z" fill="#f5c542" ${O}/><path d="M-10 -65Q0 -58 10 -65" fill="none" ${O2}/><path d="M-12 -52L-6 -46M10 -56L14 -50" stroke="#e8a82a" stroke-width="2.5" stroke-linecap="round"/>
${armsOn ? POSE[pose].map(([ex, ey, hx, hy], i) => arm(i ? 15 : -15, -58, ex, ey, hx, hy, '#f5c542')).join('') : ''}${held}
<path d="M-22 -80Q-26 -104 0 -102Q26 -104 22 -80Z" fill="#7a4a2a" ${O2}/>
<circle cx="0" cy="-82" r="22" fill="url(#skinL)" ${O}/>
<path d="M-22 -84Q-26 -108 0 -106Q26 -108 22 -84Q16 -96 6 -95Q-2 -90 -8 -97Q-16 -97 -22 -84Z" fill="#7a4a2a" ${O2}/><path d="M-12 -101Q-4 -105 5 -102" fill="none" stroke="#a9744a" stroke-width="2" stroke-linecap="round"/>
<g transform="translate(0 -80)">${face(m, '#5a3a22')}</g></g>`;

// ---------- décors ----------
const soleil = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r * 2.6}" fill="url(#sunG)"/><path d="${Array.from({ length: 12 }, (_, i) => { const a = i * Math.PI / 6; return `M${(x + Math.cos(a) * (r + 6)).toFixed(1)} ${(y + Math.sin(a) * (r + 6)).toFixed(1)}L${(x + Math.cos(a) * (r + 15)).toFixed(1)} ${(y + Math.sin(a) * (r + 15)).toFixed(1)}`; }).join('')}" class="ln" stroke="#ffb703" stroke-width="4"/><circle cx="${x}" cy="${y}" r="${r}" fill="#ffd84a" ${O2}/><circle cx="${x - r * 0.3}" cy="${y - r * 0.3}" r="${r * 0.3}" fill="#fff3a8" opacity=".8"/>`;
const nuageG = (x, y, s, c = '#fff', c2 = '#d6e6f5') => `<g transform="translate(${x} ${y}) scale(${s})"><g ${O2}><circle cx="-24" cy="6" r="14" fill="${c2}"/><circle cx="24" cy="6" r="14" fill="${c2}"/><circle cx="-6" cy="-6" r="18" fill="${c}"/><circle cx="14" cy="-2" r="15" fill="${c}"/><ellipse cx="0" cy="12" rx="32" ry="10" fill="${c2}"/></g><g fill="${c}"><circle cx="-24" cy="6" r="12.5"/><circle cx="24" cy="6" r="12.5"/><circle cx="-6" cy="-6" r="16.5"/><circle cx="14" cy="-2" r="13.5"/><ellipse cx="0" cy="11" rx="30" ry="8"/></g></g>`;
const mont = (px, py, x1, x2, by, col, shade, snow = false) => `<path d="M${x1} ${by}L${px} ${py}L${x2} ${by}Z" fill="${col}" ${O2}/><path d="M${px} ${py}L${x2} ${by}L${px + (x2 - px) * 0.3} ${by}Z" fill="${shade}" opacity=".35"/><path d="M${px - (px - x1) * 0.25} ${py + (by - py) * 0.4}L${px - (px - x1) * 0.5} ${by}" stroke="${shade}" stroke-width="2" opacity=".35" fill="none"/>` + (snow ? `<path d="M${px} ${py}L${px - 24} ${py + 36}L${px - 12} ${py + 30}L${px - 2} ${py + 42}L${px + 8} ${py + 30}L${px + 24} ${py + 36}Z" fill="url(#snow)" ${O2}/>` : '');
const sapin = (x, y, s = 1, neige = false) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-8" width="8" height="12" fill="#7a5638" ${O2}/><path d="M0 -62L-18 -26H18Z" fill="#2f8f5a" ${O2}/><path d="M0 -44L-22 -8H22Z" fill="#37a066" ${O2}/><path d="M0 -62L18 -26L6 -26Z" fill="#1f6f46" opacity=".4"/>${neige ? '<path d="M0 -62L-9 -46L0 -50L9 -46Z M0 -44L-12 -25L0 -30L12 -25Z" fill="#fff"/>' : ''}</g>`;
const vagues = (y, c = '#fff', o = 0.9) => `<path d="M0 ${y}q12 -7 25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0" class="ln" stroke="${c}" stroke-width="3" opacity="${o}"/>`;
const ripple = (x, y, rx) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.28}" fill="none" stroke="#fff" stroke-width="2.5" opacity=".75"/><ellipse cx="${x}" cy="${y}" rx="${rx * 0.6}" ry="${rx * 0.17}" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>`;
const bulles = (pts) => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" fill-opacity=".35" stroke="#fff" stroke-width="1.6"/><circle cx="${x - r * 0.35}" cy="${y - r * 0.35}" r="${r * 0.28}" fill="#fff"/>`).join('');
const sparkle = (x, y, r = 6, c = '#fff') => `<path d="M${x} ${y - r}Q${x} ${y} ${x + r} ${y}Q${x} ${y} ${x} ${y + r}Q${x} ${y} ${x - r} ${y}Q${x} ${y} ${x} ${y - r}Z" fill="${c}" opacity=".95"/>`;
const flocon = (x, y, s = 1, r = 0) => `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})"><path d="M0 -10V10M-8.7 -5L8.7 5M-8.7 5L8.7 -5" stroke="#3a3f55" stroke-width="5" stroke-linecap="round"/><path d="M0 -10V10M-8.7 -5L8.7 5M-8.7 5L8.7 -5" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></g>`;
const maison = (x, y, s, wall, roof) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-14" y="-18" width="28" height="18" fill="${wall}" ${O2}/><path d="M-18 -18L0 -34L18 -18Z" fill="${roof}" ${O2}/><rect x="-4" y="-12" width="8" height="12" fill="#7a5638" ${O2}/><rect x="6" y="-14" width="6" height="6" fill="#fff4c4" stroke="#3a3f55" stroke-width="1"/></g>`;
const feuilleRoseau = (x, y, h) => `<path d="M${x} ${y}q-6 ${-h / 2} 2 ${-h}M${x + 8} ${y}q6 ${-h / 2} -2 ${-h * 0.8}" class="ln" stroke="#3a3f55" stroke-width="8"/><path d="M${x} ${y}q-6 ${-h / 2} 2 ${-h}M${x + 8} ${y}q6 ${-h / 2} -2 ${-h * 0.8}" class="ln" stroke="#3fa35a" stroke-width="4.5"/>`;
// grand lac au pied des montagnes
const lacScene = (skyId, hy, sunPos) => `${sky(skyId)}${sunPos ? soleil(...sunPos) : ''}${mont(250, 52, 90, 440, hy, '#9db3d8', '#6f86b8', true)}${mont(95, 68, -60, 250, hy, '#8aa1cf', '#5f78ae', true)}
<path d="M0 ${hy}Q60 ${hy - 14} 120 ${hy - 4}T250 ${hy - 6}T400 ${hy - 10}V${hy}Z" fill="#4e9f58" ${O2}/>${sapin(30, hy - 2, .55)}${sapin(52, hy - 1, .45)}${sapin(350, hy - 4, .5)}${sapin(372, hy - 2, .6)}
<rect y="${hy}" width="400" height="${300 - hy}" fill="url(#lac)"/>${vagues(hy + 2, '#bfe6fb', .8)}${vagues(hy + (300 - hy) * 0.35, '#8fd0f7', .8)}${vagues(hy + (300 - hy) * 0.65, '#7fc6f3', .7)}${vagues(hy + (300 - hy) * 0.88, '#6fbdf0', .7)}`;

const couverture = svg(`${lacScene('skyDay', 150, [340, 42, 20])}${poisson(78, 232, 1.3, true, 'laugh')}${perle(205, 185, 2.5, 'goutte', 'laugh')}${bulles([[310, 220, 7], [328, 196, 5], [296, 250, 6], [120, 190, 5]])}${petiteGoutte(300, 140, .6)}${petiteGoutte(350, 175, .5)}${sparkle(120, 168, 6)}${sparkle(285, 205, 5)}`);

export const book = {
  id: 'voyage-de-perle',
  title: 'Le voyage de Perle, la goutte d\'eau',
  emoji: '💧',
  level: 3,
  minutes: 22,
  cover: couverture,
  pages: [
    // 1 — dans le lac
    { svg: svg(`${lacScene('skyDay', 105, [345, 36, 16])}
<path d="M300 105Q340 92 400 100V112H300Z" fill="#6fc06a" ${O2}/>${maison(356, 106, .6, '#e3cfa0', '#c75a4a')}
${feuilleRoseau(30, 300, 70)}${feuilleRoseau(52, 300, 52)}${feuilleRoseau(368, 300, 66)}
${[[70, 170], [96, 252], [235, 150], [335, 190], [330, 268], [250, 262], [40, 225], [185, 145]].map(([x, y], i) => petiteGoutte(x, y, 0.5 + (i % 3) * 0.05, i % 2 ? 'smile' : 'laugh')).join('')}
${poisson(300, 228, 1.5, true)}${perle(158, 200, 2.1, 'goutte', 'smile')}${bulles([[225, 160, 6], [238, 135, 4], [120, 270, 6], [350, 148, 5]])}${ripple(158, 262, 34)}`),
      text: "Perle est une petite goutte d’eau qui vit dans un grand lac, au pied des montagnes. Elle nage parmi des milliers d’autres gouttes, et elle joue souvent avec son ami Gaspard, un gros poisson argenté. Le lac est calme, joli et familier. Pourtant, chaque jour, Perle regarde la rive au loin et elle se demande ce qu’il peut bien y avoir au-delà. Un jour, se promet-elle, elle partira à la découverte du monde." },
    // 2 — le soleil réchauffe
    { svg: svg(`${lacScene('skyHot', 150, [320, 52, 30])}
<path d="M60 135q10 -10 0 -20t0 -20M130 138q10 -10 0 -20t0 -20M245 138q10 -10 0 -20t0 -20M200 134q10 -10 0 -20t0 -20" class="ln" stroke="#fff" stroke-width="3" opacity=".6"/>
<path d="M262 82l-40 40M284 98l-52 34M296 94l-34 46" class="ln" stroke="#ffb703" stroke-width="3" stroke-dasharray="2 9"/>
${ripple(170, 232, 44)}${poisson(78, 262, 1.2, false)}${perle(170, 185, 2.2, 'goutte', 'hot')}${bulles([[255, 220, 6], [270, 245, 4]])}${sparkle(120, 190, 6)}${sparkle(240, 175, 5)}`),
      text: "Un matin d’été, le soleil brille très fort dans un ciel sans nuages. Ses rayons chauffent l’eau du lac, et la surface se met à scintiller comme de la poussière d’or. Perle sent une drôle de chaleur monter en elle. Elle devient de plus en plus légère, comme une bulle de savon. Elle devient si chaude qu’elle en est étourdie, et elle a l’impression qu’elle va s’envoler d’un instant à l’autre!" },
    // 3 — évaporation
    { svg: svg(`${lacScene('skyDay', 190, [58, 48, 24])}
<path d="M120 188q-9 -9 0 -18t0 -18M170 188q-9 -9 0 -18t0 -18M270 188q-9 -9 0 -18t0 -18M330 190q-9 -9 0 -18t0 -18" class="ln" stroke="#3a3f55" stroke-width="7" opacity=".5"/><path d="M120 188q-9 -9 0 -18t0 -18M170 188q-9 -9 0 -18t0 -18M270 188q-9 -9 0 -18t0 -18M330 190q-9 -9 0 -18t0 -18" class="ln" stroke="#fff" stroke-width="4"/>
${ripple(95, 262, 40)}${poisson(95, 232, 1.4, false, 'laugh', -40)}${bulles([[60, 225, 5], [70, 205, 4]])}
${perle(222, 128, 2.0, 'vapeur', 'wow')}${sparkle(300, 70, 7)}${sparkle(140, 80, 6)}${sparkle(320, 120, 5)}
<path d="M120 118l8 -8M126 100l8 -4" class="ln" stroke="#3a3f55" stroke-width="2"/>`),
      text: "Perle s’évapore : elle se transforme en vapeur d’eau, un gaz invisible, et monte tout doucement dans les airs. Sa forme change, on ne la voit plus, mais c’est toujours elle! Elle n’a pas disparu, elle est seulement devenue très, très légère. « Au revoir, Gaspard! » crie-t-elle de toutes ses forces, en regardant le lac rapetisser sous elle. Le poisson, étonné, la salue avec sa nageoire avant de plonger." },
    // 4 — le nuage
    { svg: svg(`${sky('skyCold')}${sparkle(40, 40, 7)}${sparkle(350, 30, 6)}${sparkle(310, 150, 5)}${sparkle(80, 120, 5)}
${mont(110, 215, -60, 280, 300, '#9db3d8', '#6f86b8', true)}${mont(320, 235, 190, 460, 300, '#8aa1cf', '#5f78ae', true)}
${nuageG(60, 60, .8)}${nuageG(345, 75, .8)}
<path d="M95 160q40 -10 60 -20M305 165q-40 -10 -60 -20M120 225q40 -30 55 -45M285 225q-40 -30 -55 -45M200 250V205" class="ln" stroke="#fff" stroke-width="3" stroke-dasharray="2 8" opacity=".9"/>
${petiteGoutte(90, 165, .6, 'laugh')}${petiteGoutte(312, 170, .6, 'laugh')}${petiteGoutte(115, 232, .55, 'smile')}${petiteGoutte(285, 232, .55, 'smile')}${petiteGoutte(200, 262, .5, 'laugh')}
${perle(200, 128, 2.3, 'nuage', 'smile')}`),
      text: "Là-haut, l’air est beaucoup plus froid que près du lac. La vapeur d’eau se refroidit et redevient de minuscules gouttelettes, qu’on peut voir de nouveau. Perle retrouve ainsi des milliers d’amies, qui sont montées elles aussi depuis le lac, les rivières et les champs. Ensemble, serrées les unes contre les autres, elles forment un nuage tout blanc et moelleux, qui flotte dans le ciel comme un gros mouton." },
    // 5 — le vent
    { svg: svg(`${sky('skyDay')}${soleil(46, 40, 18)}${mont(320, 100, 200, 440, 230, '#9db3d8', '#6f86b8', true)}${mont(210, 150, 100, 320, 230, '#aebfe0', '#7d94c4', true)}
<path d="M0 232Q100 214 200 226T400 218V300H0Z" fill="url(#grass)" ${O2}/>
<path d="M-10 262L90 236L150 250L60 300H-10Z" fill="#e8c46a" ${O2}/><path d="M110 300L180 244L260 252L230 300Z" fill="#9fd36a" ${O2}/><path d="M270 300L330 246L420 256V300Z" fill="#e8c46a" ${O2}/>
<path d="M120 300Q160 262 220 250T330 236" class="ln" stroke="#3a3f55" stroke-width="12"/><path d="M120 300Q160 262 220 250T330 236" class="ln" stroke="#e9dcc0" stroke-width="7"/>
${[[34, 246], [56, 252], [76, 244]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#2f8f5a" ${O2}/>`).join('')}${maison(240, 248, .8, '#e3cfa0', '#c75a4a')}${maison(272, 240, .7, '#d7b8a8', '#7a93c2')}${maison(298, 238, .6, '#f4e7c8', '#c75a4a')}
<path d="M10 70q70 -16 110 2M0 105q56 -14 90 4M20 138q46 -10 70 2" class="ln" stroke="#fff" stroke-width="5" opacity=".95"/><path d="M26 82q20 -4 30 6" class="ln" stroke="#fff" stroke-width="4"/>
<path d="M310 28q10 -6 20 0q10 -6 20 0M345 52q8 -5 16 0q8 -5 16 0" class="ln" stroke="#3a3f55" stroke-width="3"/>
${perle(170, 108, 2.4, 'nuage', 'laugh')}`),
      text: "Le vent se met à souffler, et il pousse le nuage vers les montagnes. En dessous, Perle voit défiler des forêts, des villages et des routes minuscules, comme dans un jeu miniature. Les autos ressemblent à des fourmis, et les rivières à des rubans argentés. Perle n’en croit pas ses yeux, car elle n’a jamais vu autant de choses d’un seul coup. « Quel voyage extraordinaire! » s’exclame-t-elle." },
    // 6 — flocon
    { svg: svg(`${sky('skyStorm')}${mont(205, 140, 10, 400, 300, '#b3c0dc', '#8091b8', true)}<path d="M-20 300L60 222L120 250L200 214L300 246L420 206V300Z" fill="url(#snow)" ${O2}/>${sapin(60, 288, 1.1, true)}${sapin(340, 292, 1.2, true)}${sapin(300, 276, .8, true)}${sapin(100, 276, .7, true)}
${nuageG(95, 36, 1.5, '#aab3c9', '#8d97b2')}${nuageG(310, 40, 1.4, '#aab3c9', '#8d97b2')}
<path d="M10 130q60 -14 100 4M290 100q50 -10 100 6" class="ln" stroke="#fff" stroke-width="4" opacity=".8"/>
${flocon(58, 120, 1.4, 10)}${flocon(130, 160, 1.1, 30)}${flocon(310, 118, 1.5, 0)}${flocon(345, 178, 1.1, 20)}${flocon(80, 205, 1.1, 5)}${flocon(280, 195, 1.3, 40)}${flocon(250, 95, 1.0, 15)}${flocon(160, 100, 1.0, 50)}
${perle(205, 140, 2.1, 'flocon', 'wow', 15)}`),
      text: "Près des sommets, il fait glacial. Les gouttelettes se mettent à geler, l’une après l’autre, et elles deviennent des flocons de neige aux six branches, délicats comme de la dentelle. Perle devient un joli flocon, tout léger, qui se détache du nuage. Elle tombe lentement, en tournoyant sur elle-même, au milieu de milliers d’autres flocons. Elle trouve cela magnifique : on dirait qu’elle danse dans le ciel!" },
    // 7 — l'hiver
    { svg: svg(`${sky('skyNight')}<circle cx="320" cy="58" r="52" fill="url(#moonG)"/><circle cx="320" cy="58" r="24" fill="#fff6c9" ${O2}/><circle cx="312" cy="52" r="4" fill="#e8dca0"/><circle cx="330" cy="68" r="3" fill="#e8dca0"/>
${[[40, 40, 3], [100, 80, 2.5], [160, 30, 3], [230, 62, 2.5], [270, 22, 3], [375, 125, 3], [60, 130, 2.5], [190, 115, 2], [20, 90, 2]].map(([x, y, r]) => sparkle(x, y, r * 2.2, '#fff6c9')).join('')}
${mont(110, 115, -70, 300, 235, '#5f72a8', '#3f4f86', true)}${mont(330, 140, 200, 460, 235, '#6f82b8', '#3f4f86', true)}
<path d="M-10 300V230Q100 200 200 228T410 218V300Z" fill="#dce9fb" ${O2}/>${sapin(48, 246, 1.15, true)}${sapin(86, 240, .85, true)}${sapin(352, 244, 1.25, true)}${sapin(316, 236, .8, true)}
${perle(200, 218, 2.1, 'flocon', 'sleepy', -8)}
<path d="M-10 300V258Q60 236 130 250Q200 228 270 250Q340 236 410 256V300Z" fill="#fff" ${O2}/><path d="M130 250Q200 214 270 250Z" fill="#fff" ${O2}/><path d="M150 252q50 -22 100 0" fill="none" stroke="#d6e6f7" stroke-width="3"/><path d="M40 270h30M300 276h40M170 282h26" stroke="#d6e6f7" stroke-width="3" stroke-linecap="round"/>
${sparkle(100, 262, 5)}${sparkle(330, 270, 4)}
<circle cx="252" cy="172" r="4" fill="#fff" ${O2}/><circle cx="262" cy="150" r="7" fill="#fff" ${O2}/>
<g transform="translate(300 118)"><ellipse cx="0" cy="0" rx="46" ry="30" fill="#fff" ${O2}/><circle cx="-12" cy="2" r="10" fill="#ffd84a" ${O2}/><path d="M-12 -14v-4M-12 18v4M-26 2h-4M2 2h4" class="ln" stroke="#ffb703" stroke-width="2.5"/><path d="M16 12v-14M16 -2q-8 -6 -4 -12M16 -2q8 -6 4 -12" class="ln" stroke="#3a8f4a" stroke-width="2.5"/><circle cx="16" cy="-16" r="5" fill="#f28fb0" ${O2}/></g>`),
      text: "Tout l’hiver, Perle dort sous une épaisse couverture de neige, bien au chaud, au creux de la montagne. Au-dessus d’elle, la lune brille la nuit, et les sapins craquent de froid dans le silence. Perle ne s’ennuie pas : elle fait de beaux rêves en attendant le printemps. Dans ses rêves, elle revoit le lac, Gaspard et le soleil. Elle sait que ce long sommeil ne durera pas toujours." },
    // 8 — fonte
    { svg: svg(`${sky('skyDay')}${soleil(335, 45, 24)}${mont(110, 78, -60, 280, 205, '#9fb2d6', '#6f86b8', false)}<path d="M110 78L84 118L97 110L110 126L124 110L138 118Z" fill="url(#snow)" ${O2}/>
<path d="M-10 300V205Q90 178 180 210Q260 240 410 224V300Z" fill="url(#grass)" ${O2}/>
<path d="M-10 205Q90 178 180 210L212 262Q100 232 -10 262Z" fill="url(#snow)" ${O2}/><path d="M20 238q-3 14 0 22M70 226q-3 12 0 20M130 222q-3 12 0 20M175 236q-3 12 0 20" class="ln" stroke="#6ccbff" stroke-width="4"/>
<path d="M150 218Q210 245 240 300" class="ln" stroke="#3a3f55" stroke-width="22"/><path d="M150 218Q210 245 240 300" class="ln" stroke="#6ccbff" stroke-width="16"/>
${[[284, 270], [330, 282], [360, 262], [262, 292], [310, 252]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M0 0V-16" class="ln" stroke="#3a8f4a" stroke-width="3"/><path d="M-7 -16Q-9 -30 0 -32Q9 -30 7 -16Q0 -12 -7 -16Z" fill="#a87be0" ${O2}/><path d="M0 -30V-18" stroke="#ffd84a" stroke-width="2"/></g>`).join('')}
${sapin(380, 232, .8)}${sapin(350, 236, .6)}
${perle(205, 190, 2.1, 'goutte', 'laugh', 18)}${petiteGoutte(60, 270, .45)}${sparkle(260, 195, 6)}${sparkle(150, 170, 5)}`),
      text: "Au printemps, le soleil revient et il réchauffe la montagne. La neige commence à fondre doucement, et de petites gouttes brillantes apparaissent partout. Perle se réveille, elle s’étire et redevient une goutte d’eau. Elle glisse en riant sur la pente, entraînée par les autres. Déjà, tout autour d’elle, des crocus violets sortent de la terre. Elle comprend que la neige qui fond nourrit le sol, et que la vie recommence partout." },
    // 9 — ruisseau
    { svg: svg(`${sky('skyDay')}${mont(120, 70, -40, 300, 200, '#b9c6d9', '#8091b8', true)}${mont(330, 90, 190, 460, 200, '#a1b5d8', '#6f86b8', true)}
<path d="M0 200Q100 186 200 198T400 192V300H0Z" fill="url(#grass)" ${O2}/>${sapin(30, 222, 1.2)}${sapin(380, 224, 1.2)}${sapin(355, 230, .85)}${sapin(60, 230, .8)}
<path d="M168 120Q214 160 176 210Q130 250 96 300H318Q270 250 258 210Q240 160 222 120Z" fill="#3a3f55"/>
<path d="M172 124Q216 162 181 208Q136 247 104 296H312Q268 247 254 208Q236 162 218 124Z" fill="url(#rivG)"/>
<path d="M195 150q-6 20 6 40M170 240q20 -10 30 6M230 250q16 -12 26 0M150 275q30 -6 50 4" class="ln" stroke="#fff" stroke-width="3" opacity=".85"/>
<g fill="#9a9aa8" ${O2}><ellipse cx="62" cy="170" rx="22" ry="14"/><ellipse cx="270" cy="150" rx="22" ry="14"/><ellipse cx="82" cy="274" rx="28" ry="16"/><ellipse cx="344" cy="272" rx="30" ry="17"/><ellipse cx="256" cy="226" rx="14" ry="9"/><ellipse cx="150" cy="224" rx="12" ry="8"/></g><g fill="#fff" opacity=".7"><ellipse cx="62" cy="163" rx="12" ry="4"/><ellipse cx="344" cy="263" rx="14" ry="4"/></g>
<path d="M162 232h42M146 262h60" class="ln" stroke="#fff" stroke-width="5" opacity=".9"/>
${perle(205, 190, 1.9, 'goutte', 'wow', 22)}${petiteGoutte(150, 130, .5)}${petiteGoutte(232, 128, .45)}${petiteGoutte(120, 250, .5)}${petiteGoutte(290, 250, .5)}${bulles([[235, 170, 5], [250, 200, 4], [170, 150, 4]])}
<path d="M150 218q-6 -14 -14 -14M270 238q8 -14 16 -12M180 280q-6 -10 -14 -8" class="ln" stroke="#fff" stroke-width="3"/>`),
      text: "Perle dévale la montagne dans un ruisseau, entre les cailloux et les petites cascades. L’eau frise et rebondit, et elle se sent comme dans un grand toboggan. D’autres gouttes la rejoignent à chaque tournant, et le ruisseau grossit, grossit, grossit. Éclaboussée de partout, Perle crie de joie en filant à toute vitesse. Elle a l’impression de voler, elle qui s’est tellement demandé ce qu’il y avait au-delà du lac." },
    // 10 — rivière
    { svg: svg(`${sky('skyDay')}${nuageG(80, 40, .7)}${nuageG(300, 30, .6)}
<path d="M0 118Q80 96 170 112T400 104V160H0Z" fill="#8fcf74" ${O2}/>
<path d="M0 118Q80 96 170 112T400 104" fill="none" stroke="#6fb85a" stroke-width="2"/>
${maison(250, 126, 1.1, '#e3cfa0', '#c75a4a')}${maison(300, 128, 1.0, '#d7b8a8', '#7a93c2')}${maison(344, 124, .9, '#f4e7c8', '#c75a4a')}<g ${O2}><rect x="206" y="92" width="16" height="36" fill="#f4e7c8"/><path d="M203 92L214 68L225 92Z" fill="#7a93c2"/></g>${sapin(40, 130, .8)}${sapin(66, 134, .6)}${sapin(130, 120, .6)}
<rect y="158" width="400" height="142" fill="url(#rivG)"/>${vagues(166, '#bfe6fb', .8)}${vagues(205, '#8fd0f7')}${vagues(245, '#8fd0f7')}${vagues(280, '#8fd0f7')}
<path d="M30 160Q120 96 210 160V190Q120 134 30 190Z" fill="#c9b79a" ${O}/><path d="M30 190Q120 134 210 190V200Q120 146 30 200Z" fill="#8a7a62" opacity=".6"/><path d="M62 150v-18M96 138v-14M130 138v-14M164 150v-18" stroke="#3a3f55" stroke-width="2"/>
<path d="M-10 300Q40 280 70 300Z" fill="#4e9f58" ${O2}/>${feuilleRoseau(366, 300, 70)}${feuilleRoseau(384, 300, 50)}
<g transform="translate(318 238)"><ellipse cx="0" cy="8" rx="24" ry="11" fill="#f8d548" ${O2}/><path d="M-22 4q-8 -4 -8 -12q6 2 10 6" fill="#f8d548" ${O2}/><circle cx="18" cy="-8" r="12" fill="#f8d548" ${O2}/><path d="M27 -8l12 3l-12 4Z" fill="#f08a3c" ${O2}/><circle cx="20" cy="-11" r="2.6" fill="#2f3248"/><circle cx="21" cy="-12" r="1" fill="#fff"/><path d="M-4 6q8 6 16 0" fill="none" stroke="#e8b923" stroke-width="2"/></g>${ripple(318, 252, 34)}
<g transform="translate(190 256) rotate(-6)"><path d="M-52 0Q-28 -26 0 -18Q34 -26 56 2Q30 22 0 14Q-30 22 -52 0Z" fill="#5fbe6a" ${O}/><path d="M-44 0Q0 -4 48 2" fill="none" stroke="#3a8f4a" stroke-width="2.5"/></g>
${perle(190, 218, 1.8, 'goutte', 'smile')}${ripple(190, 275, 56)}`),
      text: "Le ruisseau devient une rivière large et calme. Perle traverse des champs verts, passe sous un vieux pont de pierre et croise un canard curieux, qui lui lance un petit « coin! ». Installée sur une feuille, elle se laisse bercer en regardant le village au loin, avec ses toits rouges et ses cheminées qui fument. Elle voudrait presque que ce moment ne s’arrête jamais." },
    // 11 — usine et tuyaux
    { svg: svg(`${sky('skyDay')}${nuageG(300, 30, .6)}
<rect y="112" width="400" height="188" fill="url(#earth)"/><path d="M0 112Q100 106 200 112T400 108V124H0Z" fill="url(#grass)" ${O2}/>
${[[30, 160], [90, 142], [170, 150], [300, 160], [370, 148], [40, 275], [130, 280], [250, 285], [330, 270]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="#8a6a4a" stroke="#5a3e28" stroke-width="1.5"/>`).join('')}
<path d="M200 150q10 -6 16 4M60 150q8 -6 14 2" class="ln" stroke="#c9a77c" stroke-width="3"/>
<g ${O2}><rect x="12" y="52" width="96" height="62" fill="#c9d2e0"/><rect x="32" y="20" width="26" height="32" fill="#aab8cc"/><path d="M12 52L60 32L108 52Z" fill="#9fb4c7"/><rect x="24" y="68" width="22" height="18" fill="#bfe9fb"/><rect x="62" y="68" width="22" height="18" fill="#bfe9fb"/><rect x="118" y="60" width="38" height="54" rx="4" fill="#b9c8da"/><rect x="124" y="70" width="26" height="30" fill="#7fd0fa"/><path d="M124 80h26M124 90h26" stroke="#e8c46a" stroke-width="4"/><rect x="164" y="72" width="34" height="42" rx="4" fill="#b9c8da"/><rect x="170" y="80" width="22" height="26" fill="#7fd0fa"/><path d="M170 90h22" stroke="#e8c46a" stroke-width="4"/></g>
<path d="M44 12q-6 -8 0 -14M52 8q-6 -8 0 -14" class="ln" stroke="#fff" stroke-width="5" opacity=".9"/>
${maison(284, 112, 1.5, '#e3cfa0', '#c75a4a')}${maison(350, 112, 1.2, '#d7b8a8', '#7a93c2')}
<path d="M30 205H330V114" class="ln" stroke="#3a3f55" stroke-width="72"/><path d="M30 205H330V114" class="ln" stroke="#a9bacd" stroke-width="66"/><path d="M30 205H330V114" class="ln" stroke="url(#rivG)" stroke-width="52"/><path d="M40 190H320" class="ln" stroke="#fff" stroke-width="3" opacity=".6"/>
<path d="M0 205H34M138 112V172M154 112V172" class="ln" stroke="#3a3f55" stroke-width="14"/><path d="M0 205H34M138 112V172M154 112V172" class="ln" stroke="#a9bacd" stroke-width="9"/>
<rect x="100" y="168" width="14" height="74" fill="#8a97a8" ${O2}/><rect x="290" y="168" width="14" height="74" fill="#8a97a8" ${O2}/>
${perle(215, 205, 1.2, 'goutte', 'wow')}${bulles([[130, 192, 5], [160, 215, 4], [270, 195, 4]])}
<path d="M300 126l10 -8l10 8M310 118v-6" class="ln" stroke="#fff" stroke-width="3"/>
<path d="M60 262q20 -10 40 0t40 0" class="ln" stroke="#5a3e28" stroke-width="3"/><g transform="translate(250 262)"><path d="M0 0q8 -8 16 0t14 0" class="ln" stroke="#e8a0a0" stroke-width="5"/></g>`),
      text: "Près de la ville, une usine de traitement nettoie l’eau de la rivière avec de grands filtres, qui retiennent les saletés. Perle en ressort propre et claire comme du cristal. Ensuite, elle s’engage dans des tuyaux cachés sous la terre, longs et sombres, où l’on n’entend que le murmure de l’eau. Ils la mènent jusque dans les maisons, les écoles et les immeubles de la ville." },
    // 12 — le robinet
    { svg: svg(`${sky('skyKitchen')}${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 54 + 20} 0V232" stroke="#f0c985" stroke-width="12" opacity=".45"/>`).join('')}
<rect x="262" y="26" width="112" height="96" fill="#bfe4f6" ${O}/><path d="M318 26V122M262 74H374" stroke="#3a3f55" stroke-width="3"/><path d="M270 110q20 -30 40 -8" fill="#69b87a"/><path d="M256 20Q268 70 258 126M380 20Q368 70 378 126" fill="none" stroke="#e8604c" stroke-width="12" opacity=".85"/>
<rect x="18" y="40" width="96" height="9" fill="#a9794e" ${O2}/><path d="M32 40v-22q0 -6 6 -6h12q6 0 6 6v22Z" fill="#e8604c" ${O2}/><path d="M72 40v-18q0 -6 6 -6h12q6 0 6 6v18Z" fill="#6aa5d9" ${O2}/>
<rect x="0" y="232" width="400" height="68" fill="url(#floorK)" ${O}/><rect x="0" y="232" width="400" height="12" fill="#f0c98e" ${O2}/><path d="M60 244V300M200 244V300M330 244V300" stroke="#a9794e" stroke-width="2"/>
<path d="M330 232V126Q330 112 316 112H222Q206 112 206 128V150" class="ln" stroke="#3a3f55" stroke-width="22"/><path d="M330 232V126Q330 112 316 112H222Q206 112 206 128V150" class="ln" stroke="#d9e2ec" stroke-width="15"/><path d="M322 120V226" class="ln" stroke="#fff" stroke-width="3" opacity=".6"/>
<rect x="198" y="146" width="16" height="12" rx="3" fill="#aab8cc" ${O2}/>
<path d="M262 112V90" class="ln" stroke="#3a3f55" stroke-width="12"/><path d="M262 112V90" class="ln" stroke="#d9e2ec" stroke-width="7"/><path d="M246 86L282 78" class="ln" stroke="#3a3f55" stroke-width="10"/><path d="M246 86L282 78" class="ln" stroke="#e8604c" stroke-width="5"/>
<path d="M200 158V196" class="ln" stroke="#7fd0fa" stroke-width="9" opacity=".85"/><path d="M196 164V190M204 160V186" class="ln" stroke="#fff" stroke-width="2"/>
${perle(206, 175, .85, 'goutte', 'wow')}
<g transform="translate(206 232)"><ellipse cx="0" cy="0" rx="26" ry="5" fill="#2b2b3a" opacity=".2"/><path d="M-19 -42L-15 -2H15L19 -42Z" fill="url(#glassG)" fill-opacity=".85" ${O}/><path d="M-17 -16L-14 -4H14L17 -16Z" fill="#7fd0fa"/><path d="M-14 -38L-12 -14" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>
${louis(96, 298, 2.1, 'laugh', 'reachR', '', true)}
<rect x="0" y="236" width="400" height="64" fill="url(#floorK)" ${O}/><rect x="0" y="236" width="400" height="14" fill="#f0c98e" ${O2}/><path d="M70 250V300M180 250V300M290 250V300M370 250V300" stroke="#a9794e" stroke-width="2"/>
<path d="M130 220q8 -6 16 0" class="ln" stroke="#fff" stroke-width="3" opacity=".0"/>`),
      text: "Perle arrive dans un robinet! Elle attend un moment, puis Louis tourne la poignée, et l’eau se met à couler dans son verre. Plouf! Perle tombe en faisant des bulles, très surprise de se retrouver dans une cuisine après avoir traversé tant de montagnes, de nuages et de rivières. Elle regarde autour d’elle les murs jaunes, la table, les chaises, et tout lui semble gigantesque." },
    // 13 — Louis boit
    { svg: svg(`${sky('skyKitchen')}${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 54 + 20} 0V232" stroke="#f0c985" stroke-width="12" opacity=".45"/>`).join('')}
<rect x="264" y="24" width="110" height="94" fill="#bfe4f6" ${O}/><path d="M319 24V118M264 71H374" stroke="#3a3f55" stroke-width="3"/><path d="M256 18Q268 68 258 124M382 18Q370 68 380 124" fill="none" stroke="#e8604c" stroke-width="12" opacity=".85"/>
<rect x="0" y="232" width="400" height="68" fill="url(#floorK)" ${O}/><rect x="0" y="232" width="400" height="14" fill="#f0c98e" ${O2}/>
<g transform="translate(110 308) scale(2.35)">
<ellipse cx="0" cy="2" rx="30" ry="6" fill="#2b2b3a" opacity=".17"/>
${limb(-7, -32, -7, -6, 11, '#f6c9a0')}${limb(7, -32, 7, -6, 11, '#f6c9a0')}<ellipse cx="-8.5" cy="-2" rx="9.5" ry="5" fill="#4a6fa5" ${O2}/><ellipse cx="8.5" cy="-2" rx="9.5" ry="5" fill="#4a6fa5" ${O2}/>
<path d="M-17 -40H17L16 -24Q0 -20 -16 -24Z" fill="#4aa56e" ${O}/>
<path d="M-19 -30Q-22 -48 -15 -64Q0 -69 15 -64Q22 -48 19 -30Q0 -26 -19 -30Z" fill="#f5c542" ${O}/><path d="M-10 -65Q0 -58 10 -65" fill="none" ${O2}/>
${arm(-15, -58, -21, -44, -22, -27, '#f5c542')}
<g transform="rotate(-9 0 -66)">
<path d="M-22 -80Q-26 -104 0 -102Q26 -104 22 -80Z" fill="#7a4a2a" ${O2}/>
<circle cx="0" cy="-82" r="22" fill="url(#skinL)" ${O}/>
<path d="M-22 -84Q-26 -108 0 -106Q26 -108 22 -84Q16 -96 6 -95Q-2 -90 -8 -97Q-16 -97 -22 -84Z" fill="#7a4a2a" ${O2}/>
<g transform="translate(0 -80)">${face('drink', '#5a3a22')}</g>
<g transform="translate(2 -69) rotate(-22)"><path d="M-12 -14L-9 15H9L12 -14Z" fill="url(#glassG)" fill-opacity=".85" ${O}/><path d="M-10.5 2L-8.5 13H8.5L10.5 2Z" fill="#7fd0fa"/><path d="M-9 -9L-7.5 8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></g></g>
<path d="M15 -58L30 -46L19 -68" class="ln" stroke="#3a3f55" stroke-width="12"/><path d="M15 -58L30 -46L19 -68" class="ln" stroke="#f5c542" stroke-width="8"/>
<g transform="translate(19 -70)"><circle r="5.5" fill="#f6c9a0" ${O2}/><path d="M-4 -3q-2 -4 1 -5M0 -4q0 -5 3 -5M4 -2q2 -4 4 -3" class="ln" stroke="#3a3f55" stroke-width="1.6"/></g>
</g>
<g transform="translate(272 236)"><ellipse cx="0" cy="2" rx="40" ry="6" fill="#2b2b3a" opacity=".16"/><path d="M-36 0Q-30 -8 -20 -4Q0 -8 20 -4Q30 -8 36 0Q30 6 0 4Q-30 6 -36 0Z" fill="#9fd9fa" ${O2}/><path d="M-22 -2q10 -5 20 0" class="ln" stroke="#fff" stroke-width="3"/></g>
${perle(272, 222, 1.5, 'goutte', 'laugh')}
<path d="M300 180q10 -6 20 0" class="ln" stroke="#fff" stroke-width="0"/>${sparkle(236, 190, 6, '#fff3a8')}${sparkle(320, 195, 5, '#fff3a8')}`),
      text: "Louis a soif après avoir joué dehors. Glou, glou, glou! Il boit toute l’eau de son verre d’un seul trait. L’eau désaltère son corps, qui en a besoin pour grandir, pour jouer et pour penser. Un peu plus tard, Perle ressort de la maison par les tuyaux et repart vers une autre usine qui la nettoiera. Elle ne s’en inquiète pas : elle sait qu’elle fait partie d’un grand cycle qui continue." },
    // 14 — retour au lac
    { svg: svg(`${lacScene('skyDay', 140, [60, 45, 22])}
<path d="M400 205Q340 180 290 204T215 240" class="ln" stroke="#3a3f55" stroke-width="42"/><path d="M400 205Q340 180 290 204T215 240" class="ln" stroke="#6ccbff" stroke-width="36"/><path d="M380 200Q340 190 296 208" class="ln" stroke="#fff" stroke-width="3" stroke-dasharray="10 12"/>
${feuilleRoseau(22, 300, 66)}${feuilleRoseau(44, 300, 46)}
${poisson(108, 178, 1.7, true, 'laugh', -28)}${ripple(104, 232, 50)}<path d="M62 148q8 -16 24 -10M90 128l-4 -12M114 134l6 -12M140 162q6 -12 18 -10" class="ln" stroke="#fff" stroke-width="3"/>
${perle(262, 210, 1.9, 'goutte', 'laugh')}${petiteGoutte(150, 255, .55)}${petiteGoutte(190, 215, .5)}${petiteGoutte(340, 250, .5)}${bulles([[215, 180, 6], [135, 245, 5]])}${sparkle(180, 170, 6)}${sparkle(310, 175, 5)}`),
      text: "Après un dernier nettoyage, Perle est rendue à la rivière, qui la ramène tout droit vers le lac. Les montagnes réapparaissent à l’horizon, familières. Perle reconnaît la rive, les roseaux, et surtout son vieil ami Gaspard. Le poisson saute hors de l’eau pour l’accueillir, et fait mille éclaboussures de joie. « Perle! s’écrie-t-il. Où étais-tu passée? » Perle éclate de rire : elle a tant d’histoires à raconter!" },
    // 15 — fin
    { svg: svg(`${sky('skyDusk')}<circle cx="200" cy="150" r="70" fill="url(#sunG)"/>${mont(110, 70, -50, 290, 150, '#c98d9a', '#8a5f86', true)}${mont(310, 62, 190, 440, 150, '#b87b93', '#7a4f7e', true)}<circle cx="200" cy="150" r="42" fill="#ffd84a" ${O2}/>
<rect y="150" width="400" height="150" fill="url(#lacDusk)"/><rect x="170" y="152" width="60" height="148" fill="#ffd84a" opacity=".35"/>${vagues(152, '#ffe0a8')}${vagues(190, '#ffd9a0')}${vagues(232, '#f5b98a')}${vagues(276, '#e89a86')}
<g transform="translate(200 78) scale(.82)"><circle r="58" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="3 9" opacity=".85" stroke-linecap="round"/>
<g transform="translate(-58 0)">${nuageG(0, 0, .42)}</g><g transform="translate(0 -58)">${flocon(0, 0, 1.4)}</g><g transform="translate(58 0) scale(.6)">${soleil(0, 0, 14)}</g><g transform="translate(0 58)"><path d="${DROP}" transform="scale(.42)" fill="url(#dropG)" ${O}/></g></g>
${poisson(82, 250, 1.4, false, 'laugh')}${perle(205, 215, 2.2, 'goutte', 'smile')}${petiteGoutte(320, 240, .55)}${petiteGoutte(345, 200, .45)}${ripple(205, 275, 60)}${sparkle(300, 190, 6, '#fff3a8')}${sparkle(110, 205, 5, '#fff3a8')}${sparkle(260, 175, 5, '#fff3a8')}`),
      text: "Perle est de retour chez elle, mais elle n’a plus peur du voyage. Elle a compris un grand secret de la nature : rien ne se perd. L’eau voyage sans cesse, de lac en nuage, de neige en rivière, de robinet en verre, puis de nouveau vers le lac. Elle a fait le tour du monde sans jamais disparaître. Demain, peut-être, quand le soleil sera chaud, elle repartira encore!" },
  ],
  words: [
    {"word":"une goutte","emoji":"💧","def":"Une toute petite quantité de liquide qui tombe en forme de perle."},
    {"word":"la rive","emoji":"🏞️","def":"Le bord d’un lac ou d’une rivière."},
    {"word":"s’évaporer","emoji":"♨️","def":"Se transformer en vapeur et monter dans l’air, quand il fait chaud."},
    {"word":"la vapeur d’eau","emoji":"☁️","def":"De l’eau sous forme de gaz invisible."},
    {"word":"geler","emoji":"🧊","def":"Devenir de la glace ou de la neige à cause du froid."},
    {"word":"un flocon","emoji":"❄️","def":"Un petit morceau de neige qui tombe du ciel."},
    {"word":"un ruisseau","emoji":"🏞️","def":"Une petite rivière qui descend d’une colline."},
    {"word":"une usine","emoji":"🏭","def":"Un grand bâtiment où l’on fabrique ou nettoie quelque chose."},
    {"word":"désaltérer","emoji":"🥤","def":"Faire passer la soif en buvant."},
    {"word":"un cycle","emoji":"🔄","def":"Une suite d’étapes qui recommence toujours."},
  ],
  quiz: [
    {"q":"Que fait Perle quand le soleil réchauffe le lac?","options":["Elle gèle tout de suite","Elle tombe au fond du lac","Elle s’évapore et devient de la vapeur d’eau"],"answer":2},
    {"q":"Pourquoi la vapeur d’eau redevient-elle des gouttelettes en haut?","options":["L’air y est très froid","Le vent la repousse","Elle veut retrouver ses amies"],"answer":0},
    {"q":"Quelle est la bonne suite des étapes du voyage de Perle?","options":["Lac, neige, nuage, rivière, ruisseau, robinet","Lac, nuage, neige, ruisseau, rivière, robinet","Lac, rivière, nuage, neige, robinet, ruisseau"],"answer":1},
    {"q":"Que veut dire « s’évaporer »?","options":["Tomber en pluie","Se mélanger à la boue","Se transformer en vapeur et monter dans l’air"],"answer":2},
    {"q":"Pourquoi Perle devient-elle un flocon de neige?","options":["Il fait glacial près des sommets","Elle veut dormir plus longtemps","Le vent l’a poussée sur un glacier"],"answer":0},
    {"q":"À quoi sert l’usine près de la ville?","options":["Elle chauffe l’eau du lac","Elle nettoie l’eau de la rivière","Elle fabrique des nuages"],"answer":1},
    {"q":"Comment sait-on que Perle n’a pas peur du voyage à la fin?","options":["Elle refuse de quitter le lac","Elle pleure en voyant Gaspard","Elle se dit que demain elle repartira peut-être encore"],"answer":2},
    {"q":"Pourquoi peut-on dire que Perle n’a pas disparu quand elle devient vapeur d’eau?","options":["Parce que l’eau change de forme mais reste de l’eau","Parce qu’elle est invisible pour toujours","Parce qu’elle s’est cachée derrière un nuage"],"answer":0},
  ],
};
