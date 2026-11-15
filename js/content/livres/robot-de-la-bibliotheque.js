// « Le robot de la bibliothèque » — niveau 3
const O = 'class="k3"';
const O2 = 'class="k2"';
const svg = (s) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><style>.k3,.k2{stroke:#3a3f55;stroke-linejoin:round;stroke-linecap:round}.k3{stroke-width:3}.k2{stroke-width:2}.ln{fill:none;stroke-linecap:round;stroke-linejoin:round}.lt{font-family:Arial,sans-serif;font-weight:700;text-anchor:middle}</style>${s}</svg>`;
const limb = (a, b, c, d, w, col) => `<path d="M${a} ${b}L${c} ${d}" class="ln" stroke="#3a3f55" stroke-width="${w + 4}"/><path d="M${a} ${b}L${c} ${d}" class="ln" stroke="${col}" stroke-width="${w}"/>`;

const jambes = (c) => `<path d="M-6 -30V-8M6 -30V-8" class="ln" stroke="#3a3f55" stroke-width="13"/><path d="M-6 -30V-8M6 -30V-8" class="ln" stroke="${c}" stroke-width="9"/><path d="M-15 -2H-1M1 -2H15" class="ln" stroke="#3a3f55" stroke-width="9"/><path d="M-15 -2H-1M1 -2H15" class="ln" stroke="#d9534f" stroke-width="5"/>`;
// ---------- visages d'enfants ----------
const face = (m) => {
  const cheeks = `<circle cx="-10" cy="5" r="${m === 'shy' ? 4.2 : 3.2}" fill="#f29a8f" opacity=".7"/><circle cx="10" cy="5" r="${m === 'shy' ? 4.2 : 3.2}" fill="#f29a8f" opacity=".7"/>`;
  let eyes = '<circle cx="-6" cy="-1" r="2.4" fill="#3a3f55"/><circle cx="6" cy="-1" r="2.4" fill="#3a3f55"/>';
  let mouth = `<path d="M-5 5Q0 10 5 5" fill="none" ${O2}/>`;
  let extra = '';
  if (m === 'laugh') { eyes = `<path d="M-9 -1Q-6 -6 -3 -1M3 -1Q6 -6 9 -1" fill="none" ${O2}/>`; mouth = `<path d="M-6 4Q0 16 6 4Z" fill="#b0413e" ${O2}/>`; }
  if (m === 'wow') { mouth = `<ellipse cx="0" cy="8" rx="3" ry="4" fill="#b0413e" ${O2}/>`; extra = `<path d="M-9 -8Q-6 -11 -3 -8M3 -8Q6 -11 9 -8" fill="none" ${O2}/>`; }
  if (m === 'sad') { mouth = `<path d="M-5 10Q0 5 5 10" fill="none" ${O2}/>`; extra = `<path d="M-9 -6L-3 -9M9 -6L3 -9" fill="none" ${O2}/>`; }
  if (m === 'shy') { eyes = '<circle cx="-7" cy="0" r="2.4" fill="#3a3f55"/><circle cx="5" cy="0" r="2.4" fill="#3a3f55"/>'; mouth = `<path d="M-4 7Q-1 5 1 7T5 6" fill="none" ${O2}/>`; extra = `<path d="M-10 -6Q-7 -8 -4 -6M2 -6Q5 -8 8 -6" fill="none" ${O2}/>`; }
  if (m === 'drink') { eyes = `<path d="M-9 0Q-6 3 -3 0M3 0Q6 3 9 0" fill="none" ${O2}/>`; }
  return cheeks + eyes + mouth + extra;
};
const ARM = {
  down: [[-14, -52, -19, -28], [14, -52, 19, -28]],
  up: [[-14, -52, -28, -82], [14, -52, 28, -82]],
  pointR: [[-14, -52, -19, -28], [14, -52, 42, -62]],
  hold: [[-14, -52, -8, -32], [14, -52, 8, -32]],
  reachR: [[-14, -52, -19, -28], [14, -52, 38, -44]],
  clap: [[-14, -52, -4, -50], [14, -52, 4, -50]],
};
const arms = (pose, col, skin) => ARM[pose].map(([a, b, c, d]) => limb(a, b, c, d, 8, col) + `<circle cx="${c}" cy="${d}" r="4.5" fill="${skin}" ${O2}/>`).join('');
const cheveux = { bob: 'M-18 -76Q-20 -98 0 -96Q20 -98 18 -76L18 -64Q14 -66 14 -74Q6 -84 -6 -80Q-14 -76 -14 -64Q-18 -64 -18 -76Z', spiky: 'M-17 -78L-14 -92L-8 -86L-3 -98L3 -88L9 -97L13 -86L18 -92L17 -78Q8 -84 0 -83Q-8 -84 -17 -78Z', curl: 'M-18 -76Q-24 -92 -8 -94Q0 -102 10 -94Q24 -92 18 -76Q8 -84 0 -83Q-8 -84 -18 -76Z' };

// ---------- Félix : cheveux roux, chandail vert, taches de rousseur ----------
const felix = (x, y, s = 1, m = 'smile', pose = 'down') => `<g transform="translate(${x} ${y}) scale(${s})">
${jambes('#6b5a4a')}
<rect x="-14" y="-62" width="28" height="36" rx="9" fill="#3f9a78" ${O}/><path d="M-14 -40H14" stroke="#2f7a5c" stroke-width="3"/>
${arms(pose, '#3f9a78', '#f6c9a0')}
<circle cx="0" cy="-76" r="17" fill="#f6c9a0" ${O}/>
<path d="M-18 -76Q-20 -98 0 -96Q20 -98 18 -76Q12 -86 4 -84Q-4 -78 -12 -82Q-16 -80 -18 -76Z" fill="#d2682e" ${O2}/>
<g transform="translate(0 -74)">${face(m)}<path d="M-12 2h2M-9 4h2M9 4h2M12 2h2" stroke="#c97a4a" stroke-width="1.5" stroke-linecap="round"/></g></g>`;

// ---------- Enfants (même construction, couleurs variables) ----------
const enfant = (x, y, s, shirt, hair, skin, style, m = 'smile', pose = 'down') => `<g transform="translate(${x} ${y}) scale(${s})">
${jambes('#4a6fa5')}
<rect x="-14" y="-62" width="28" height="36" rx="9" fill="${shirt}" ${O}/>
${arms(pose, shirt, skin)}
<circle cx="0" cy="-76" r="17" fill="${skin}" ${O}/><path d="${cheveux[style]}" fill="${hair}" ${O2}/>
<g transform="translate(0 -74)">${face(m)}</g></g>`;

// ---------- Bobine : vieux robot bleu-gris, écran-visage, antenne, roues ----------
const yeux = {
  normal: '<circle cx="-7" cy="-92" r="3.5" fill="#7fffe0"/><circle cx="7" cy="-92" r="3.5" fill="#7fffe0"/>',
  wide: '<circle cx="-7" cy="-92" r="5.5" fill="#7fffe0"/><circle cx="7" cy="-92" r="5.5" fill="#7fffe0"/><circle cx="-7" cy="-92" r="2" fill="#1f3b4d"/><circle cx="7" cy="-92" r="2" fill="#1f3b4d"/>',
  happy: '<path d="M-11 -90Q-7 -97 -3 -90M3 -90Q7 -97 11 -90" class="ln" stroke="#7fffe0" stroke-width="3"/>',
  sad: '<circle cx="-7" cy="-90" r="3" fill="#7fffe0"/><circle cx="7" cy="-90" r="3" fill="#7fffe0"/><path d="M-12 -95L-3 -98M12 -95L3 -98" class="ln" stroke="#7fffe0" stroke-width="2"/>',
  dizzy: '<g class="ln" stroke="#7fffe0" stroke-width="2"><circle cx="-7" cy="-92" r="5"/><circle cx="-7" cy="-92" r="2"/><circle cx="7" cy="-92" r="5"/><circle cx="7" cy="-92" r="2"/></g>',
  sparkle: '<path d="M-7 -99L-5 -93L1 -92L-5 -90L-7 -84L-9 -90L-15 -92L-9 -93ZM7 -99L9 -93L15 -92L9 -90L7 -84L5 -90L-1 -92L5 -93Z" fill="#fff6a0"/>',
  off: '<path d="M-11 -92h8M3 -92h8" class="ln" stroke="#4a7a80" stroke-width="2.5"/>',
};
const bobine = (x, y, s = 1, e = 'normal', pose = 'down', opt = {}) => {
  const A = { down: [[-30, -34], [30, -34]], up: [[-36, -88], [36, -88]], hold: [[-18, -40], [18, -40]], reachL: [[-46, -48], [30, -34]], reachR: [[-30, -34], [46, -48]], pointR: [[-30, -34], [46, -72]] }[pose];
  const mouth = opt.talk ? '<ellipse cx="0" cy="-82" rx="4" ry="3" fill="#7fffe0"/>' : (e === 'happy' || e === 'sparkle') ? '<path d="M-5 -83Q0 -78 5 -83" class="ln" stroke="#7fffe0" stroke-width="2.5"/>' : e === 'sad' ? '<path d="M-4 -80Q0 -84 4 -80" class="ln" stroke="#7fffe0" stroke-width="2.5"/>' : '<path d="M-4 -82h8" class="ln" stroke="#7fffe0" stroke-width="2.5"/>';
  return `<g transform="translate(${x} ${y}) scale(${s})">
<circle cx="-13" cy="-9" r="9" fill="#4a5568" ${O}/><circle cx="13" cy="-9" r="9" fill="#4a5568" ${O}/><circle cx="-13" cy="-9" r="3" fill="#9fb4c7"/><circle cx="13" cy="-9" r="3" fill="#9fb4c7"/>
<rect x="-22" y="-70" width="44" height="52" rx="9" fill="#9fb4c7" ${O}/>
<circle cx="-12" cy="-30" r="5" fill="#c9804a" opacity=".8"/><circle cx="14" cy="-60" r="4" fill="#c9804a" opacity=".8"/><circle cx="-14" cy="-60" r="3" fill="#c9804a" opacity=".7"/>
<rect x="-11" y="-58" width="22" height="16" rx="3" fill="#6f8aa3" ${O2}/><circle cx="-5" cy="-50" r="2.5" fill="#ff7a59"/><circle cx="2" cy="-50" r="2.5" fill="#ffd84a"/><circle cx="8" cy="-50" r="2.5" fill="#5fe0a0"/>
${A.map(([c, d], i) => limb(i ? 22 : -22, -58, c, d, 8, '#8396ab') + `<circle cx="${c}" cy="${d}" r="5.5" fill="#6f8aa3" ${O2}/>`).join('')}
<line x1="0" y1="-70" x2="0" y2="-74" stroke="#3a3f55" stroke-width="5"/>
<rect x="-23" y="-110" width="46" height="38" rx="11" fill="#b4c4d4" ${O}/><rect x="-18" y="-105" width="36" height="28" rx="8" fill="#1f3b4d" ${O2}/>
${yeux[e]}${mouth}${opt.lunettes ? `<g class="ln" stroke="#ffd84a" stroke-width="2.5"><circle cx="-7" cy="-92" r="7.5"/><circle cx="7" cy="-92" r="7.5"/><path d="M0 -92h0"/></g>` : ''}
${e === 'sad' ? `<path d="M0 -110Q4 -118 10 -118" class="ln" stroke="#3a3f55" stroke-width="3"/><circle cx="12" cy="-118" r="4" fill="#ff7a59" ${O2}/>` : `<path d="M0 -110V-120" class="ln" stroke="#3a3f55" stroke-width="3"/><circle cx="0" cy="-122" r="4.5" fill="${e === 'off' ? '#8a8f9f' : '#ff7a59'}" ${O2}/>`}
${opt.sueur ? '<path d="M28 -100q4 7 0 10q-4 -3 0 -10Z" fill="#8fd3f7" stroke="#3a3f55" stroke-width="1.5"/>' : ''}</g>`;
};

// ---------- décors et objets ----------
const rangee = (x, y, w, cols) => {
  const g = {};
  let cx = x, i = 0;
  while (cx < x + w - 8) { const c = cols[i % cols.length]; const bw = 11 + (i * 3) % 5; const h = 24 + (i * 7) % 12; (g[c] = g[c] || []).push(`M${cx} ${y}h${bw}v-${h}h-${bw}z`); cx += bw + 1; i++; }
  return Object.entries(g).map(([c, d]) => `<path d="${d.join('')}" fill="${c}" ${O2}/>`).join('');
};
const etagere = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="170" fill="#b9864f" ${O}/>${[0, 1, 2].map((r) => `<rect x="${x + 4}" y="${y + 8 + r * 54}" width="${w - 8}" height="46" fill="#8a5d33"/>${rangee(x + 6, y + 53 + r * 54, w - 12, r % 2 ? ['#e8604c', '#4a8fd0', '#f5c542', '#6fbf73', '#9b6fb5'] : ['#4a8fd0', '#e8604c', '#6fbf73', '#f5c542', '#d9548a'])}<rect x="${x + 2}" y="${y + 53 + r * 54}" width="${w - 4}" height="5" fill="#b9864f" ${O2}/>`).join('')}`;
const biblio = ({ fenetre = true, tapis = true, sombre = false } = {}) => `<rect width="400" height="300" fill="#f7e2b8"/>
${fenetre ? `<rect x="150" y="32" width="100" height="84" fill="${sombre ? '#8fb0d0' : '#a8dcf7'}" ${O}/><path d="M200 32V116M150 74H250" stroke="#3a3f55" stroke-width="3"/><path d="M165 112q15 -26 30 0M215 112q10 -20 25 0" fill="#fff" opacity=".6"/>` : ''}
<rect y="215" width="400" height="85" fill="#c79a6b"/><path d="M0 238H400M0 262H400M0 286H400" stroke="#a9794e" stroke-width="2"/><rect y="211" width="400" height="8" fill="#a9794e" ${O2}/>
${etagere(-6, 40, 140)}${etagere(266, 40, 140)}
${tapis ? '<ellipse cx="200" cy="262" rx="150" ry="28" fill="#d9548a" opacity=".85" stroke="#3a3f55" stroke-width="2"/><ellipse cx="200" cy="262" rx="120" ry="20" fill="none" stroke="#f9d36b" stroke-width="3" stroke-dasharray="8 6"/>' : ''}
${sombre ? '<rect width="400" height="300" fill="#2b2250" opacity=".28"/>' : ''}`;
const carte = (x, y, l, col, w = 36, h = 48, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="4" fill="#fff" ${O2}/><text class="lt" x="0" y="${-h * 0.22}" font-size="${Math.round(h * 0.7)}" fill="${col}">${l}</text></g>`;
const bloc = (x, y, l, col) => `<g transform="translate(${x} ${y})"><rect x="-13" y="-26" width="26" height="26" rx="4" fill="${col}" ${O2}/><text class="lt" x="0" y="-6" font-size="20" fill="#fff">${l}</text></g>`;
const tableBasse = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="14" rx="3" fill="#d9a066" ${O}/><rect x="${x + 10}" y="${y + 14}" width="10" height="${290 - y - 14}" fill="#b9864f" ${O2}/><rect x="${x + w - 20}" y="${y + 14}" width="10" height="${290 - y - 14}" fill="#b9864f" ${O2}/>`;
const tableauNoir = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="#2f6b57" stroke="#9b6a3c" stroke-width="6"/>`;
const arbre = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-4" width="8" height="18" fill="#8a5a36"/><circle cx="0" cy="-16" r="16" fill="#6fbf73" stroke="#fff" stroke-width="2"/></g>`;
const livre = (x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-17" y="-24" width="34" height="48" rx="3" fill="#e8604c" ${O}/><rect x="-17" y="-24" width="7" height="48" fill="#c94a3a" ${O2}/><g transform="translate(4 0) scale(.5)">${arbre(0, 4)}</g></g>`;
const livreOuvert = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 -16Q-14 -22 0 -14Q14 -22 30 -16V16Q14 10 0 18Q-14 10 -30 16Z" fill="#fffdf4" ${O}/><path d="M0 -14V18" stroke="#3a3f55" stroke-width="2"/><path d="M-24 -8Q-14 -11 -6 -7M-24 0Q-14 -3 -6 1M6 -7Q14 -11 24 -8M6 1Q14 -3 24 0" class="ln" stroke="#9aa0b8" stroke-width="2"/></g>`;
const etoiles = (pts) => pts.map(([x, y, r]) => `<path d="M${x} ${y - r}L${x + r * .3} ${y - r * .3}L${x + r} ${y}L${x + r * .3} ${y + r * .3}L${x} ${y + r}L${x - r * .3} ${y + r * .3}L${x - r} ${y}L${x - r * .3} ${y - r * .3}Z" fill="#ffd84a" ${O2}/>`).join('');
const sons = (x, y) => `<path d="M${x} ${y - 10}q8 10 0 20M${x + 9} ${y - 16}q12 16 0 32" class="ln" stroke="#3a3f55" stroke-width="3"/>`;
const bulleDeReve = (x, y, w, h) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="#fff" ${O2}/><circle cx="${x - w + 10}" cy="${y + h + 8}" r="6" fill="#fff" ${O2}/><circle cx="${x - w + 2}" cy="${y + h + 22}" r="3.5" fill="#fff" ${O2}/>`;

const couverture = svg(`${biblio()}${felix(130, 292, 1.5, 'laugh', 'reachR')}${bobine(235, 292, 1.5, 'happy', 'reachL')}${etoiles([[190, 120, 8], [290, 110, 6], [100, 100, 6]])}${livreOuvert(190, 175, 1.2)}`);

export const book = {
  id: 'robot-de-la-bibliotheque',
  title: 'Le robot de la bibliothèque',
  emoji: '🤖',
  level: 3,
  minutes: 10,
  cover: couverture,
  pages: [
    // 1
    { svg: svg(`${biblio({ tapis: false })}${tableBasse(230, 218, 160)}${enfant(255, 222, .62, '#e8604c', '#2b2b3a', '#f6c9a0', 'bob', 'laugh')}${enfant(310, 222, .62, '#f5c542', '#7a4a2a', '#c98e62', 'spiky', 'laugh')}${enfant(365, 222, .62, '#9b6fb5', '#f0c060', '#f6c9a0', 'curl', 'wow')}${tableBasse(230, 218, 160).replace(/<rect x="2[0-9]+" y="23[0-9]"[^>]*>/g, '')}${felix(92, 292, 1.4, 'shy', 'hold')}${livre(94, 214, 0.75)}`),
      text: 'Félix est un garçon timide. Quand il y a trop de monde, ses mots se cachent au fond de sa gorge. Il aime donc la bibliothèque, où tout est silencieux. Pendant que les autres rient autour d\'une table, il cherche un livre tout seul.' },
    // 2
    { svg: svg(`${biblio({ sombre: true, tapis: false })}<path d="M150 116L100 215H300L250 116Z" fill="#fff6c9" opacity=".28"/>
<path d="M300 60L400 60M300 60L400 110M300 60L360 150M300 60L330 150" class="ln" stroke="#fff" stroke-width="1.5" opacity=".8"/><g fill="#d9d5e3" opacity=".7"><circle cx="270" cy="270" r="6"/><circle cx="292" cy="278" r="4"/><circle cx="240" cy="280" r="5"/></g>
${bobine(300, 292, 1.5, 'off', 'down')}${felix(110, 292, 1.4, 'wow', 'pointR')}`),
      text: 'Un mardi, derrière la dernière étagère, Félix découvre un vieux robot couvert de poussière. Des toiles d\'araignée pendent à ses oreilles. Sur sa poitrine, une plaque rouillée dit : « Bobine, bibliothécaire ».' },
    // 3
    { svg: svg(`${biblio()}${felix(100, 292, 1.4, 'shy', 'reachR')}${bobine(270, 292, 1.5, 'wide', 'hold', { talk: true })}${livre(270, 218, 1, 180)}<path d="M330 150q10 -12 22 0q8 -14 22 0" class="ln" stroke="#3a3f55" stroke-width="3" opacity="0"/>`),
      text: '« Bonjour », murmure Félix. Les yeux du robot s\'allument en grinçant. — Bonjour, petit, dit-il. Je suis Bobine. Mais regarde, je tiens mon livre à l\'envers : je ne sais plus lire!' },
    // 4
    { svg: svg(`${biblio({ tapis: false })}${felix(105, 292, 1.4, 'sad', 'down')}${bobine(270, 292, 1.5, 'sad', 'down')}${bulleDeReve(335, 90, 52, 34)}${livreOuvert(335, 92, .8)}${enfant(310, 112, .38, '#e8604c', '#2b2b3a', '#f6c9a0', 'bob', 'laugh')}${enfant(360, 112, .38, '#4a8fd0', '#7a4a2a', '#c98e62', 'spiky', 'laugh')}`),
      text: 'Bobine baisse la tête. — Je me suis endormi pendant des années. À mon réveil, j\'avais oublié les lettres. Autrefois, les enfants s\'assoyaient autour de moi pour écouter des histoires. Félix sent son cœur se serrer.' },
    // 5
    { svg: svg(`${biblio()}${tableBasse(160, 232, 130)}${carte(185, 232, 'A', '#e8604c', 32, 44, -6)}${carte(225, 232, 'B', '#4a8fd0', 32, 44)}${carte(265, 232, 'C', '#2f9a62', 32, 44, 6)}${felix(88, 292, 1.4, 'laugh', 'up')}${bobine(335, 292, 1.5, 'wide', 'down', { talk: true })}${etoiles([[330, 120, 8], [120, 90, 6]])}`),
      text: 'Félix hésite, puis il prend une grande respiration. — Moi, je peux t\'apprendre! dit-il, d\'une voix plus forte qu\'il ne le croyait. Les yeux de Bobine s\'agrandissent comme deux lunes.' },
    // 6
    { svg: svg(`${biblio({ fenetre: false })}${tableauNoir(130, 56, 140, 126)}<text class="lt" x="175" y="150" font-size="84" fill="#fff">A</text>${arbre(235, 160, 1.5)}${felix(92, 292, 1.4, 'smile', 'pointR')}${bobine(320, 292, 1.5, 'sparkle', 'down', { talk: true })}${sons(268, 205)}`),
      text: 'Ils commencent par la lettre A. — Cette lettre fait le son « a », comme dans arbre, explique Félix. — Aaaa, répète Bobine. Il est si content que son antenne se met à clignoter.' },
    // 7
    { svg: svg(`${biblio({ fenetre: false })}${tableauNoir(110, 56, 180, 126)}<text class="lt" x="170" y="150" font-size="84" fill="#f9d36b">M</text><text class="lt" x="235" y="150" font-size="84" fill="#fff">A</text><path d="M138 162Q200 190 268 162" class="ln" stroke="#ff7a59" stroke-width="4"/>${felix(76, 292, 1.4, 'laugh', 'pointR')}${bobine(335, 292, 1.5, 'sparkle', 'up', { talk: true })}${sons(305, 215)}`),
      text: 'Le lendemain, Félix colle un M et un A l\'un contre l\'autre. — Mmm… aaa… ma! lit Bobine. Il vient de lire sa première syllabe!' },
    // 8
    { svg: svg(`${biblio({ fenetre: false })}<rect x="150" y="34" width="100" height="84" fill="#f59e5b" ${O}/><circle cx="200" cy="108" r="22" fill="#ffd84a"/><rect x="150" y="100" width="100" height="18" fill="#d9825f"/><path d="M200 34V118M150 74H250" stroke="#3a3f55" stroke-width="3"/>
<rect x="275" y="56" width="90" height="76" fill="#fffdf4" ${O}/>${[0, 1, 2, 3, 4].map((c) => [0, 1, 2].map((r) => `<rect x="${281 + c * 16}" y="${64 + r * 22}" width="14" height="18" fill="none" stroke="#c9ccd8"/>`).join('')).join('')}<path d="M284 70l8 10M292 70l-8 10M300 70l8 10M308 70l-8 10M316 70l8 10M324 70l-8 10M284 92l8 10M292 92l-8 10M300 92l8 10M308 92l-8 10" class="ln" stroke="#e03a3a" stroke-width="2.5"/>
${tableBasse(130, 232, 180)}${bloc(160, 232, 'B', '#4a8fd0')}${bloc(188, 232, 'O', '#e8604c')}${bloc(216, 232, 'N', '#2f9a62')}${bloc(250, 232, 'S', '#9b6fb5')}${bloc(280, 232, 'R', '#f08a3c')}
${felix(68, 292, 1.4, 'laugh', 'up')}${bobine(345, 292, 1.5, 'happy', 'down')}`),
      text: 'Les jours passent, et chaque après-midi, après l\'école, la leçon recommence. Bobine apprend les lettres, les sons et les syllabes. Sur le calendrier, Félix coche chaque journée avec un crayon rouge.' },
    // 9
    { svg: svg(`${biblio()}${tableBasse(130, 232, 150)}${carte(175, 232, 'b', '#4a8fd0', 48, 62)}${carte(235, 232, 'd', '#e8604c', 48, 62)}${felix(78, 292, 1.4, 'laugh', 'pointR')}${bobine(335, 292, 1.5, 'dizzy', 'up')}<path d="M300 130q8 -10 16 0q8 -10 16 0" class="ln" stroke="#3a3f55" stroke-width="3"/>`),
      text: 'Un jour, Bobine mélange le b et le d. Ses yeux tournent comme des toupies! — Regarde, lui dit Félix en riant doucement, le b a son bâton à gauche et son ventre à droite. Bobine essaie, essaie encore, et finit par comprendre.' },
    // 10
    { svg: svg(`${biblio()}${tableBasse(120, 232, 170)}${bloc(150, 232, 'C', '#e8604c')}${bloc(180, 232, 'H', '#4a8fd0')}${bloc(210, 232, 'A', '#2f9a62')}${bloc(240, 232, 'T', '#9b6fb5')}
<g transform="translate(272 232)"><rect x="-18" y="-50" width="36" height="50" rx="4" fill="#fff" ${O2}/><circle cx="0" cy="-26" r="12" fill="#f5a84a" ${O2}/><path d="M-10 -34L-12 -46L-4 -38M10 -34L12 -46L4 -38" fill="#f5a84a" ${O2}/><circle cx="-4" cy="-28" r="1.6" fill="#3a3f55"/><circle cx="4" cy="-28" r="1.6" fill="#3a3f55"/><path d="M-3 -22Q0 -19 3 -22" fill="none" stroke="#3a3f55" stroke-width="1.5"/></g>
${felix(70, 292, 1.4, 'laugh', 'up')}${bobine(335, 292, 1.5, 'sparkle', 'up', { talk: true })}${etoiles([[310, 110, 8], [358, 125, 6], [95, 105, 6]])}`),
      text: 'Quelques semaines plus tard, Félix aligne quatre blocs : C, H, A, T. Bobine les lit lentement, puis plus vite. — Chat! s\'écrie-t-il, les yeux brillants comme des étoiles. Il vient de lire son premier mot!' },
    // 11
    { svg: svg(`${biblio({ tapis: false })}<ellipse cx="200" cy="268" rx="150" ry="22" fill="#d9548a" opacity=".85" stroke="#3a3f55" stroke-width="2"/>${bobine(245, 288, 1.6, 'normal', 'hold', { lunettes: true })}${livreOuvert(245, 222, .85)}${felix(130, 292, 1.4, 'smile', 'hold')}${etoiles([[190, 120, 7], [320, 120, 7], [60, 150, 5]])}`),
      text: 'Peu à peu, les mots deviennent des phrases, et les phrases, des pages. Un soir, Bobine ouvre un petit album et le lit jusqu\'à la fin, sans se tromper. Félix applaudit si fort que ses mains rougissent.' },
    // 12
    { svg: svg(`${biblio({ fenetre: false })}
${enfant(130, 270, .9, '#e8604c', '#2b2b3a', '#f6c9a0', 'bob', 'smile')}${enfant(180, 278, .9, '#f5c542', '#7a4a2a', '#c98e62', 'spiky', 'wow')}${enfant(235, 272, .9, '#9b6fb5', '#f0c060', '#f6c9a0', 'curl', 'smile')}
${felix(55, 292, 1.35, 'shy', 'down')}${bobine(335, 292, 1.5, 'wide', 'hold', { sueur: true })}${livre(335, 222, .75)}`),
      text: 'Le samedi, c\'est l\'heure du conte. Les enfants arrivent en grand nombre et s\'installent sur le tapis. Bobine panique : — Et si je me trompais devant tout le monde? Félix, lui, a la gorge serrée à cause de tous ces regards.' },
    // 13
    { svg: svg(`${biblio({ tapis: false })}${felix(115, 300, 1.9, 'smile', 'reachR')}${bobine(280, 300, 1.9, 'sad', 'reachL')}${etoiles([[200, 70, 7]])}`),
      text: 'Félix prend la pince froide du robot dans sa main. — Moi aussi, j\'ai peur, avoue-t-il. Mais tu es prêt, Bobine, et je reste à côté de toi. Le robot respire un grand coup, et son antenne cesse de trembler.' },
    // 14
    { svg: svg(`${biblio({ fenetre: false })}<rect x="150" y="100" width="100" height="120" rx="14" fill="#9b6fb5" ${O}/>${bobine(200, 235, 1.4, 'happy', 'hold', { talk: true })}${livreOuvert(200, 172, .8)}${sons(255, 140)}${sons(138, 140).replace(/q8 10 0 20/, 'q-8 10 0 20')}
${enfant(70, 292, 1.05, '#e8604c', '#2b2b3a', '#f6c9a0', 'bob', 'laugh', 'up')}${enfant(135, 296, 1.05, '#f5c542', '#7a4a2a', '#c98e62', 'spiky', 'wow')}${felix(275, 296, 1.15, 'laugh', 'down')}${enfant(340, 292, 1.05, '#4a8fd0', '#f0c060', '#f6c9a0', 'curl', 'laugh', 'up')}`),
      text: 'Bobine ouvre le livre et lit l\'histoire d\'une souris qui voulait aller sur la lune. Il fait la voix de la souris, puis celle du chat, puis celle de la fusée. Les enfants rient aux éclats, et personne ne bouge.' },
    // 15
    { svg: svg(`${biblio()}${enfant(60, 292, 1.15, '#e8604c', '#2b2b3a', '#f6c9a0', 'bob', 'laugh', 'clap')}${enfant(125, 296, 1.15, '#f5c542', '#7a4a2a', '#c98e62', 'spiky', 'laugh', 'up')}${bobine(200, 290, 1.6, 'happy', 'up')}${felix(290, 296, 1.3, 'laugh', 'pointR')}${enfant(350, 292, 1.15, '#9b6fb5', '#f0c060', '#f6c9a0', 'curl', 'smile', 'clap')}
${etoiles([[160, 70, 8], [245, 80, 7], [200, 50, 6], [320, 110, 6], [85, 110, 6]])}<path d="M200 36q-10 -12 -4 -18q6 -4 4 4q-2 -8 4 -4q6 6 -4 18Z" fill="#ff5a7a" ${O2}/>`),
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
