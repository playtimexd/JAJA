// « Le voyage de Perle, la goutte d'eau » — niveau 3
const O = 'class="k3"';
const O2 = 'class="k2"';
const svg = (s) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><style>.k3,.k2{stroke:#3a3f55;stroke-linejoin:round;stroke-linecap:round}.k3{stroke-width:3}.k2{stroke-width:2}.ln{fill:none;stroke-linecap:round;stroke-linejoin:round}</style>${s}</svg>`;
const limb = (a, b, c, d, w, col) => `<path d="M${a} ${b}L${c} ${d}" class="ln" stroke="#3a3f55" stroke-width="${w + 4}"/><path d="M${a} ${b}L${c} ${d}" class="ln" stroke="${col}" stroke-width="${w}"/>`;
const sky = (id, c1, c2) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="400" height="300" fill="url(#${id})"/>`;

// ---------- visages ----------
const face = (m) => {
  const cheeks = `<circle cx="-11" cy="5" r="${m === 'hot' ? 4.5 : 3.2}" fill="#f2877f" opacity=".7"/><circle cx="11" cy="5" r="${m === 'hot' ? 4.5 : 3.2}" fill="#f2877f" opacity=".7"/>`;
  let eyes = '<circle cx="-6" cy="-1" r="2.6" fill="#3a3f55"/><circle cx="6" cy="-1" r="2.6" fill="#3a3f55"/><circle cx="-5.2" cy="-2" r=".9" fill="#fff"/><circle cx="6.8" cy="-2" r=".9" fill="#fff"/>';
  let mouth = `<path d="M-5 5 Q0 10 5 5" fill="none" ${O2}/>`;
  let extra = '';
  if (m === 'laugh') { eyes = `<path d="M-9 0 Q-6 -5 -3 0 M3 0 Q6 -5 9 0" fill="none" ${O2}/>`; mouth = `<path d="M-6 4 Q0 16 6 4Z" fill="#b0413e" ${O2}/>`; }
  if (m === 'wow') { mouth = `<ellipse cx="0" cy="8" rx="3" ry="4" fill="#b0413e" ${O2}/>`; extra = `<path d="M-9 -8 Q-6 -11 -3 -8 M3 -8 Q6 -11 9 -8" fill="none" ${O2}/>`; }
  if (m === 'sleepy') { eyes = `<path d="M-9 -1 Q-6 3 -3 -1 M3 -1 Q6 3 9 -1" fill="none" ${O2}/>`; mouth = `<path d="M-3 7 Q0 9 3 7" fill="none" ${O2}/>`; }
  if (m === 'hot') { mouth = `<path d="M-4 7 Q0 10 4 7" fill="none" ${O2}/>`; extra = '<path d="M16 -6 q3 4 0 7 q-3 -3 0 -7Z" fill="#8fd3f7" stroke="#3a3f55" stroke-width="1.5"/>'; }
  if (m === 'scared') { mouth = `<path d="M-5 9 Q-2 6 0 9 Q2 6 5 9" fill="none" ${O2}/>`; extra = `<path d="M-9 -7 L-3 -9 M9 -7 L3 -9" fill="none" ${O2}/>`; }
  return cheeks + eyes + mouth + extra;
};

// ---------- Perle : une goutte, un nuage, de la vapeur ou un flocon (même visage) ----------
const perle = (x, y, s = 1, form = 'goutte', m = 'smile', rot = 0) => {
  const drop = 'M0 -30C6 -16 20 -6 20 8A20 20 0 0 1 -20 8C-20 -6 -6 -16 0 -30Z';
  let body;
  if (form === 'goutte') body = `<path d="${drop}" fill="#5ec3f5" ${O}/><path d="M-12 3Q-14 12 -8 18" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/><g transform="translate(0 8)">${face(m)}</g>`;
  else if (form === 'vapeur') body = `<path d="${drop}" fill="#d4eefc" fill-opacity=".7" stroke="#3a3f55" stroke-width="2.5" stroke-dasharray="5 4"/><g transform="translate(0 8)" opacity=".85">${face(m)}</g><path d="M-10 32q-5 5 0 10t0 10M0 34q-5 5 0 10t0 10M10 32q-5 5 0 10t0 10" class="ln" stroke="#a9d6f2" stroke-width="3" stroke-dasharray="1 6"/>`;
  else if (form === 'nuage') body = `<g ${O}><circle cx="-21" cy="8" r="15" fill="#fff"/><circle cx="21" cy="8" r="15" fill="#fff"/><circle cx="-7" cy="-4" r="19" fill="#fff"/><circle cx="12" cy="-2" r="16" fill="#fff"/><ellipse cx="0" cy="14" rx="30" ry="12" fill="#fff"/></g><g fill="#fff"><circle cx="-21" cy="8" r="13.5"/><circle cx="21" cy="8" r="13.5"/><circle cx="-7" cy="-4" r="17.5"/><circle cx="12" cy="-2" r="14.5"/><ellipse cx="0" cy="14" rx="28.5" ry="10.5"/></g><path d="M0 -38C3 -32 9 -29 9 -24A9 9 0 0 1 -9 -24C-9 -29 -3 -32 0 -38Z" fill="#5ec3f5" ${O2}/><g transform="translate(0 7) scale(.95)">${face(m)}</g>`;
  else body = `<g stroke-linecap="round"><path d="M0 -36V36M-8 -26L0 -18L8 -26M-8 26L0 18L8 26" stroke="#3a3f55" stroke-width="9" fill="none" transform="rotate(0)"/><path d="M0 -36V36M-8 -26L0 -18L8 -26M-8 26L0 18L8 26" stroke="#3a3f55" stroke-width="9" fill="none" transform="rotate(60)"/><path d="M0 -36V36M-8 -26L0 -18L8 -26M-8 26L0 18L8 26" stroke="#3a3f55" stroke-width="9" fill="none" transform="rotate(120)"/>
<path d="M0 -36V36M-8 -26L0 -18L8 -26M-8 26L0 18L8 26" stroke="#bfe9fb" stroke-width="5" fill="none"/><path d="M0 -36V36M-8 -26L0 -18L8 -26M-8 26L0 18L8 26" stroke="#bfe9fb" stroke-width="5" fill="none" transform="rotate(60)"/><path d="M0 -36V36M-8 -26L0 -18L8 -26M-8 26L0 18L8 26" stroke="#bfe9fb" stroke-width="5" fill="none" transform="rotate(120)"/></g><circle r="19" fill="#e8f7ff" ${O}/><g transform="translate(0 2)">${face(m)}</g>`;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${body}</g>`;
};
const petiteGoutte = (x, y, s = 0.5) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -30C6 -16 20 -6 20 8A20 20 0 0 1 -20 8C-20 -6 -6 -16 0 -30Z" fill="#8fd9fb" ${O}/><circle cx="-5" cy="8" r="2.4" fill="#3a3f55"/><circle cx="5" cy="8" r="2.4" fill="#3a3f55"/><path d="M-4 14Q0 18 4 14" fill="none" ${O2}/></g>`;

// ---------- Gaspard le poisson et Louis le garçon ----------
const poisson = (x, y, s = 1, flip = false) => `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><path d="M-22 0L-38 -12V12Z" fill="#f08a3c" ${O}/><ellipse cx="0" cy="0" rx="24" ry="15" fill="#f4a24a" ${O}/><path d="M-4 -14Q2 -24 10 -13" fill="#f08a3c" ${O2}/><path d="M-6 -8Q-3 0 -6 8" fill="none" stroke="#f08a3c" stroke-width="3"/><circle cx="12" cy="-3" r="4.5" fill="#fff" ${O2}/><circle cx="13" cy="-3" r="2" fill="#3a3f55"/><path d="M13 6Q18 9 21 4" fill="none" ${O2}/></g>`;
const ARM = { down: [[-14, -52, -19, -28], [14, -52, 19, -28]], up: [[-14, -52, -28, -82], [14, -52, 28, -82]], reachR: [[-14, -52, -19, -28], [14, -52, 38, -44]] };
const louis = (x, y, s = 1, m = 'smile', pose = 'down') => `<g transform="translate(${x} ${y}) scale(${s})">
${limb(-6, -30, -6, -6, 9, '#f6c9a0')}${limb(6, -30, 6, -6, 9, '#f6c9a0')}
<ellipse cx="-7" cy="-2" rx="8" ry="4" fill="#4a6fa5" ${O2}/><ellipse cx="7" cy="-2" rx="8" ry="4" fill="#4a6fa5" ${O2}/>
<rect x="-14" y="-40" width="28" height="16" rx="5" fill="#4aa56e" ${O}/>
<rect x="-14" y="-62" width="28" height="30" rx="9" fill="#f5c542" ${O}/>
${ARM[pose].map(([a, b, c, d]) => limb(a, b, c, d, 8, '#f5c542') + `<circle cx="${c}" cy="${d}" r="4.5" fill="#f6c9a0" ${O2}/>`).join('')}
<circle cx="0" cy="-76" r="17" fill="#f6c9a0" ${O}/>
<path d="M-17 -78Q-18 -96 0 -94Q18 -96 17 -78Q10 -88 0 -86Q-8 -88 -17 -78Z" fill="#7a4a2a" ${O2}/>
<g transform="translate(0 -74)">${face(m === 'drink' ? 'laugh' : m)}</g></g>`;

// ---------- décors ----------
const soleil = (x, y, r) => `<path d="M${x} ${y - r - 6}v-9M${x} ${y + r + 6}v9M${x - r - 6} ${y}h-9M${x + r + 6} ${y}h9M${x - Math.round(r * .8) - 4} ${y - Math.round(r * .8) - 4}l-6 -6M${x + Math.round(r * .8) + 4} ${y + Math.round(r * .8) + 4}l6 6M${x + Math.round(r * .8) + 4} ${y - Math.round(r * .8) - 4}l6 -6M${x - Math.round(r * .8) - 4} ${y + Math.round(r * .8) + 4}l-6 6" class="ln" stroke="#ffb703" stroke-width="4"/><circle cx="${x}" cy="${y}" r="${r}" fill="#ffd84a" ${O2}/>`;
const nuageGris = (x, y, s, c = '#fff') => `<g transform="translate(${x} ${y}) scale(${s})"><g ${O2}><circle cx="-24" cy="6" r="14" fill="${c}"/><circle cx="24" cy="6" r="14" fill="${c}"/><circle cx="-6" cy="-6" r="18" fill="${c}"/><circle cx="14" cy="-2" r="15" fill="${c}"/><ellipse cx="0" cy="12" rx="32" ry="10" fill="${c}"/></g><g fill="${c}"><circle cx="-24" cy="6" r="12.5"/><circle cx="24" cy="6" r="12.5"/><circle cx="-6" cy="-6" r="16.5"/><circle cx="14" cy="-2" r="13.5"/><ellipse cx="0" cy="12" rx="30" ry="8.5"/></g></g>`;
const montagne = (px, py, bx1, bx2, by, col, neige) => `<path d="M${bx1} ${by}L${px} ${py}L${bx2} ${by}Z" fill="${col}" ${O2}/>` + (neige ? `<path d="M${px} ${py}L${px - 22} ${py + 34}L${px - 10} ${py + 28}L${px} ${py + 38}L${px + 10} ${py + 28}L${px + 22} ${py + 34}Z" fill="#fff" ${O2}/>` : '');
const sapin = (x, y, s = 1, neige = false) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-4" y="-8" width="8" height="12" fill="#7a5638" ${O2}/><path d="M0 -62L-18 -26H18Z" fill="#2f8f5a" ${O2}/><path d="M0 -42L-22 -8H22Z" fill="#37a066" ${O2}/>${neige ? '<path d="M0 -62L-8 -46L0 -50L8 -46Z M0 -42L-10 -24L0 -29L10 -24Z" fill="#fff"/>' : ''}</g>`;
const vagues = (y, c = '#fff') => `<path d="M0 ${y}q12 -8 25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0t25 0" class="ln" stroke="${c}" stroke-width="3"/>`;
const eau = (y, id) => `${sky(id, '#4fb3ea', '#2f7fc4')}`;
const bulles = (pts) => pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" fill-opacity=".5" stroke="#fff" stroke-width="1.5"/>`).join('');
const sourisFlocon = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -10V10M-9 -5L9 5M-9 5L9 -5" class="ln" stroke="#fff" stroke-width="3"/></g>`;
const paysageLac = (id, ciel1, ciel2, eauY = 130) => `${sky(id, ciel1, ciel2)}${montagne(90, 60, -30, 220, eauY, '#8da3cf', true)}${montagne(270, 40, 130, 420, eauY, '#7a93c2', true)}`;

const couverture = svg(`${paysageLac('c1', '#a8dcf7', '#dff2fb', 150)}${soleil(340, 40, 22)}<rect y="150" width="400" height="150" fill="#3f9fe0"/>${vagues(150)}${vagues(190, '#8fd0f7')}${vagues(240, '#8fd0f7')}${poisson(80, 225, 1, true)}${perle(210, 165, 2.1, 'goutte', 'laugh')}${bulles([[300, 215, 6], [316, 195, 4], [290, 240, 5]])}`);

export const book = {
  id: 'voyage-de-perle',
  title: 'Le voyage de Perle, la goutte d\'eau',
  emoji: '💧',
  level: 3,
  minutes: 9,
  cover: couverture,
  pages: [
    // 1 — dans le lac
    { svg: svg(`${paysageLac('a1', '#b9e3f7', '#e6f5fb', 105)}${soleil(345, 36, 18)}<rect y="105" width="400" height="195" fill="#3f9fe0"/>${vagues(105)}${vagues(160, '#6fc0f0')}
<path d="M30 300q-6 -30 4 -50q-8 -10 2 -24M60 300q8 -26 -2 -44q8 -8 0 -22M360 300q-8 -30 2 -48q-6 -10 2 -22" class="ln" stroke="#2f8f5a" stroke-width="7"/><ellipse cx="200" cy="300" rx="120" ry="12" fill="#c7a56a" ${O2}/>
${poisson(300, 205, 1.1, true)}${perle(170, 195, 1.7, 'goutte', 'smile')}${petiteGoutte(90, 220, .5)}${petiteGoutte(110, 160, .45)}${petiteGoutte(250, 150, .45)}${bulles([[225, 150, 5], [235, 128, 3], [120, 250, 5], [350, 150, 5]])}`),
      text: 'Perle est une petite goutte d\'eau qui vit dans un grand lac, au pied des montagnes. Elle nage avec des milliers d\'autres gouttes et avec son ami Gaspard, le poisson. Chaque jour, elle se demande ce qu\'il y a au-delà de la rive.' },
    // 2 — le soleil réchauffe
    { svg: svg(`${paysageLac('a2', '#9fd8f6', '#e6f5fb', 140)}${soleil(325, 50, 30)}<rect y="140" width="400" height="160" fill="#3f9fe0"/>${vagues(140)}${vagues(195, '#6fc0f0')}${perle(190, 112, 1.7, 'goutte', 'hot')}<rect y="140" width="400" height="160" fill="#3f9fe0" fill-opacity=".55"/>${vagues(140)}
<path d="M262 80l-30 32M284 95l-40 28M300 90l-28 40" class="ln" stroke="#ffb703" stroke-width="3" stroke-dasharray="2 8"/>${bulles([[110, 190, 5], [90, 220, 3]])}${poisson(90, 250, 1, false)}`),
      text: 'Un matin d\'été, le soleil brille très fort. Il réchauffe l\'eau du lac, et Perle se sent toute légère. Elle devient si chaude qu\'elle en est étourdie!' },
    // 3 — évaporation
    { svg: svg(`${paysageLac('a3', '#8fd2f5', '#e6f5fb', 165)}${soleil(60, 45, 24)}<rect y="165" width="400" height="135" fill="#3f9fe0"/>${vagues(165)}${vagues(215, '#6fc0f0')}${poisson(90, 255, 1, true)}
<path d="M150 160q-8 -8 0 -16t0 -16M250 160q-8 -8 0 -16t0 -16M300 165q-8 -8 0 -16t0 -16M110 162q-6 -7 0 -14" class="ln" stroke="#fff" stroke-width="4" stroke-dasharray="1 7"/>
<g fill="#d4eefc" fill-opacity=".7" stroke="#3a3f55" stroke-width="2" stroke-dasharray="4 3"><circle cx="300" cy="105" r="7"/><circle cx="130" cy="95" r="6"/><circle cx="330" cy="70" r="5"/></g>
${perle(200, 85, 1.5, 'vapeur', 'wow')}<path d="M200 135v-6M196 130l4 -4l4 4" class="ln" stroke="#3a3f55" stroke-width="3"/>`),
      text: 'Perle s\'évapore : elle se transforme en vapeur d\'eau, un gaz invisible, et monte dans les airs. Sa forme change, mais c\'est toujours elle! « Au revoir, Gaspard! » crie-t-elle.' },
    // 4 — le nuage
    { svg: svg(`${sky('a4', '#4a7fd0', '#a9d4f5')}${montagne(110, 215, -40, 260, 300, '#8da3cf', true)}<rect y="262" width="400" height="38" fill="#3f9fe0"/>
${nuageGris(70, 60, .8)}${nuageGris(340, 85, .9)}${nuageGris(330, 200, .6)}
${perle(200, 120, 2.5, 'nuage', 'smile')}${petiteGoutte(95, 150, .5)}${petiteGoutte(300, 155, .5)}${petiteGoutte(120, 195, .45)}${petiteGoutte(265, 200, .45)}`),
      text: 'Là-haut, l\'air est froid. La vapeur d\'eau se refroidit et redevient de minuscules gouttelettes. Perle retrouve ses amies, et ensemble elles forment un nuage tout blanc.' },
    // 5 — le vent
    { svg: svg(`${sky('a5', '#7fc4f2', '#dff2fb')}${soleil(60, 45, 20)}${montagne(310, 120, 200, 440, 300, '#8da3cf', true)}${montagne(190, 170, 90, 300, 300, '#a1b5d8', true)}<rect y="262" width="400" height="38" fill="#4aa56e" ${O2}/>${sapin(60, 292, .8)}${sapin(95, 292, .7)}
<path d="M20 120q60 -14 100 0M30 150q50 -10 80 6M10 175q40 -10 60 0" class="ln" stroke="#fff" stroke-width="4"/>
${nuageGris(60, 215, .4)}${perle(175, 120, 2.2, 'nuage', 'laugh')}<path d="M300 40q10 -6 20 0q10 -6 20 0M340 62q8 -5 16 0q8 -5 16 0" class="ln" stroke="#3a3f55" stroke-width="3"/>`),
      text: 'Le vent pousse le nuage vers les montagnes. En dessous, Perle voit des forêts, des villages et des routes minuscules. Quel voyage!' },
    // 6 — flocon
    { svg: svg(`${sky('a6', '#6f86b8', '#c3d4ee')}${montagne(200, 130, 20, 400, 300, '#aab9d6', true)}<path d="M-20 300L60 215L120 245L200 205L300 240L420 200V300Z" fill="#fff" ${O2}/>${sapin(60, 280, 1, true)}${sapin(340, 285, 1.1, true)}${sapin(300, 270, .8, true)}
${nuageGris(100, 40, 1.4, '#a7aec4')}${nuageGris(300, 45, 1.3, '#a7aec4')}
${sourisFlocon(60, 120, 1.2)}${sourisFlocon(130, 150, 1)}${sourisFlocon(300, 110, 1.3)}${sourisFlocon(340, 170, 1)}${sourisFlocon(90, 200, 1)}${sourisFlocon(270, 190, 1.2)}
${perle(205, 135, 1.5, 'flocon', 'wow', 15)}`),
      text: 'Près des sommets, il fait glacial. Les gouttelettes gèlent et deviennent des flocons de neige aux six branches. Perle est devenue un joli flocon, et elle tombe doucement en tournoyant.' },
    // 7 — l'hiver
    { svg: svg(`${sky('a7', '#1f2a55', '#46598f')}<circle cx="320" cy="60" r="24" fill="#fff6c9" ${O2}/><circle cx="330" cy="54" r="20" fill="#3b4a80"/>
<g fill="#fff6c9">${[[40, 40], [100, 80], [160, 30], [230, 70], [270, 25], [370, 120], [60, 130], [190, 120]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5"/>`).join('')}</g>
${montagne(120, 110, -60, 300, 230, '#6f82b3', true)}<path d="M-10 300V215Q100 190 200 215T410 205V300Z" fill="#eaf4ff" ${O2}/>${sapin(60, 235, 1, true)}${sapin(345, 235, 1.2, true)}
${perle(200, 235, 1.6, 'flocon', 'sleepy', -10)}<path d="M-10 300V262Q100 240 200 262T410 258V300Z" fill="#fff" ${O2}/><path d="M150 262Q200 232 250 262Z" fill="#fff" ${O2}/>
<path d="M250 195h10l-10 11h10M274 172h14l-14 15h14" class="ln" stroke="#fff6c9" stroke-width="3"/>`),
      text: 'Tout l\'hiver, Perle dort sous une épaisse couverture de neige. Au-dessus d\'elle, la lune brille et les sapins craquent de froid. Elle fait de beaux rêves en attendant le printemps.' },
    // 8 — fonte
    { svg: svg(`${sky('a8', '#8fd2f5', '#e8f6fb')}${soleil(335, 45, 24)}${montagne(120, 80, -50, 290, 220, '#9fb2d6', false)}<path d="M120 80L96 118L108 112L120 124L134 112L146 118Z" fill="#fff" ${O2}/>
<path d="M-10 300V200Q80 170 170 205Q250 235 410 215V300Z" fill="#6fc06a" ${O2}/><path d="M-10 200Q80 170 170 205L190 245Q90 220 -10 250Z" fill="#fff" ${O2}/>
<path d="M30 215v14M62 205v12M100 210v14" class="ln" stroke="#8fd3f7" stroke-width="3"/><path d="M296 250q4 -14 8 0M330 262q4 -14 8 0" class="ln" stroke="#8a5fc6" stroke-width="3"/><g fill="#a87be0" ${O2}><circle cx="300" cy="244" r="5"/><circle cx="334" cy="256" r="5"/><circle cx="270" cy="270" r="5"/></g>
${perle(195, 218, 1.6, 'goutte', 'laugh', 18)}${petiteGoutte(60, 245, .4)}`),
      text: 'Au printemps, le soleil réchauffe la montagne et la neige commence à fondre. Perle redevient une goutte d\'eau et glisse en riant sur la pente. Déjà, des crocus violets sortent de la terre.' },
    // 9 — ruisseau
    { svg: svg(`${sky('a9', '#a8dcf7', '#e6f5fb')}<path d="M-20 300L120 80L260 300Z" fill="#b9c6d9" ${O2}/><path d="M200 300L340 90L440 300Z" fill="#a1b5d8" ${O2}/>${sapin(30, 215, 1.1)}${sapin(380, 215, 1.1)}${sapin(350, 225, .8)}
<path d="M110 0Q230 90 150 180T300 300" class="ln" stroke="#3a3f55" stroke-width="86"/><path d="M110 0Q230 90 150 180T300 300" class="ln" stroke="#7fd0fa" stroke-width="80"/><path d="M110 20Q215 90 145 180T290 290" class="ln" stroke="#fff" stroke-width="3" stroke-dasharray="14 18"/>
<g fill="#9a9aa8" ${O2}><ellipse cx="60" cy="150" rx="20" ry="13"/><ellipse cx="255" cy="130" rx="22" ry="14"/><ellipse cx="85" cy="270" rx="26" ry="15"/><ellipse cx="340" cy="270" rx="28" ry="16"/><ellipse cx="260" cy="215" rx="14" ry="9"/></g>
${perle(195, 170, 1.4, 'goutte', 'wow', 25)}${petiteGoutte(150, 90, .45)}${petiteGoutte(215, 80, .4)}${petiteGoutte(135, 230, .45)}${bulles([[225, 150, 5], [245, 180, 4], [170, 120, 4]])}`),
      text: 'Perle dévale la montagne dans un ruisseau, entre les cailloux et les petites cascades. D\'autres gouttes la rejoignent, et le ruisseau grossit, grossit. Éclaboussée de partout, Perle crie de joie.' },
    // 10 — rivière
    { svg: svg(`${sky('a10', '#9fd8f6', '#e6f5fb')}<path d="M0 150Q100 110 200 140T400 120V190H0Z" fill="#8fcf74" ${O2}/>
<g ${O2}><rect x="260" y="105" width="30" height="30" fill="#e3cfa0"/><path d="M255 105L275 85L295 105Z" fill="#c75a4a"/><rect x="310" y="112" width="26" height="26" fill="#d7b8a8"/><path d="M306 112L323 94L340 112Z" fill="#7a93c2"/><rect x="225" y="98" width="16" height="40" fill="#f4e7c8"/><path d="M222 98L233 76L244 98Z" fill="#7a93c2"/></g>
<rect y="175" width="400" height="125" fill="#3f9fe0"/>${vagues(175)}${vagues(240, '#8fd0f7')}${vagues(278, '#8fd0f7')}
<path d="M40 175Q120 120 200 175V196Q120 150 40 196Z" fill="#c9b79a" ${O}/><path d="M70 192v-18M110 180v-26M150 180v-26" stroke="#3a3f55" stroke-width="2"/>
<ellipse cx="190" cy="232" rx="38" ry="12" fill="#5fbe6a" ${O}/>${perle(190, 208, 1.1, 'goutte', 'smile')}
<g transform="translate(310 218)"><ellipse cx="0" cy="8" rx="20" ry="9" fill="#f5c542" ${O2}/><circle cx="16" cy="-6" r="10" fill="#f5c542" ${O2}/><path d="M24 -6l10 3l-10 3Z" fill="#f08a3c" ${O2}/><circle cx="18" cy="-9" r="2" fill="#3a3f55"/></g>
<path d="M360 300q-4 -50 4 -70M375 300q4 -44 -2 -60" class="ln" stroke="#2f8f5a" stroke-width="5"/>`),
      text: 'Le ruisseau devient une rivière large et calme. Perle traverse des champs, passe sous un pont et croise un canard curieux. Installée sur une feuille, elle se laisse bercer en regardant le village au loin.' },
    // 11 — usine et tuyaux
    { svg: svg(`${sky('a11', '#b9e3f7', '#e6f5fb')}<rect y="110" width="400" height="190" fill="#8a6a4a"/><path d="M0 110H400V122H0Z" fill="#6fc06a" ${O2}/>
<g ${O2}><rect x="20" y="62" width="70" height="48" fill="#c9d2e0"/><rect x="40" y="30" width="30" height="32" fill="#aab8cc"/><ellipse cx="115" cy="85" rx="24" ry="8" fill="#9fb4c7"/><rect x="91" y="85" width="48" height="25" fill="#b9c8da"/><ellipse cx="115" cy="85" rx="24" ry="8" fill="#d0dbea"/></g>
<g ${O2}><rect x="270" y="78" width="36" height="32" fill="#e3cfa0"/><path d="M264 78L288 54L312 78Z" fill="#c75a4a"/><rect x="326" y="84" width="34" height="26" fill="#d7b8a8"/><path d="M320 84L343 64L366 84Z" fill="#7a93c2"/></g>
<path d="M-5 205H330V118" class="ln" stroke="#3a3f55" stroke-width="58"/><path d="M-5 205H330V118" class="ln" stroke="#9fb4c7" stroke-width="52"/><path d="M-5 205H330V118" class="ln" stroke="#5ec3f5" stroke-width="40"/>
<path d="M118 185V225M130 185V225M142 185V225M154 185V225" stroke="#3a3f55" stroke-width="3"/>
<g fill="#7a5a3a" opacity=".5"><circle cx="40" cy="270" r="6"/><circle cx="140" cy="262" r="8"/><circle cx="280" cy="270" r="7"/></g>
${perle(235, 205, .9, 'goutte', 'wow')}<path d="M38 150q-4 14 0 28M70 150q-4 14 0 28" class="ln" stroke="#5ec3f5" stroke-width="4"/><path d="M20 190l4 8l8 -2M40 215l4 -8l8 2" class="ln" stroke="#8a5fc6" stroke-width="3"/>`),
      text: 'Près de la ville, une usine nettoie l\'eau de la rivière avec de grands filtres. Ensuite, Perle s\'engage dans des tuyaux cachés sous la terre. Ils la mènent jusque dans les maisons.' },
    // 12 — le robinet
    { svg: svg(`<rect width="400" height="300" fill="#fbe3b9"/><path d="M0 200H400M0 230H400" stroke="#f2cf92" stroke-width="2"/><g ${O2}><rect x="250" y="30" width="110" height="90" fill="#c6e7f7"/></g><path d="M305 30V120M250 75H360" stroke="#3a3f55" stroke-width="3"/>
<rect x="130" y="240" width="270" height="60" fill="#d9a066" ${O}/><rect x="130" y="240" width="270" height="12" fill="#e8b97f" ${O2}/>
<path d="M300 150V110Q300 100 285 100H190V128" class="ln" stroke="#3a3f55" stroke-width="18"/><path d="M300 150V110Q300 100 285 100H190V128" class="ln" stroke="#cfd8e3" stroke-width="12"/>
<rect x="184" y="128" width="12" height="76" fill="#7fd0fa" opacity=".75"/>
${perle(190, 160, .75, 'goutte', 'wow')}
<path d="M154 205L158 250H210L214 205Z" fill="#dff4ff" fill-opacity=".8" ${O}/><path d="M160 232H208L206 248H162Z" fill="#7fd0fa"/>
${louis(110, 288, 1.5, 'laugh', 'reachR')}<path d="M168 205h28" stroke="#fff" stroke-width="3" class="ln"/>`),
      text: 'Perle arrive dans un robinet! Louis tourne la poignée et l\'eau coule dans son verre. Plouf! Perle tombe en faisant des bulles, très surprise de se retrouver dans une cuisine.' },
    // 13 — Louis boit
    { svg: svg(`<rect width="400" height="300" fill="#fbe3b9"/><rect y="230" width="400" height="70" fill="#e9c58f"/><g ${O2}><rect x="270" y="30" width="100" height="90" fill="#c6e7f7"/></g><path d="M320 30V120M270 75H370" stroke="#3a3f55" stroke-width="3"/>
${louis(130, 300, 2, 'drink', 'up')}
<g transform="translate(180 150) rotate(-28) scale(.9)"><path d="M-22 -34L-16 40H16L22 -34Z" fill="#dff4ff" fill-opacity=".85" ${O}/><path d="M-19 -6L-15 38H15L19 -6Z" fill="#7fd0fa"/>${perle(0, 4, .62, 'goutte', 'scared')}</g>
<path d="M290 190q10 -10 0 -20M310 200q10 -10 0 -20" class="ln" stroke="#f08a3c" stroke-width="3" stroke-dasharray="1 6"/>`),
      text: 'Louis a soif. Glou, glou, glou! L\'eau désaltère son corps, qui en a besoin pour grandir et pour jouer. Puis Perle ressort et repart vers une autre usine qui la nettoiera.' },
    // 14 — retour au lac
    { svg: svg(`${paysageLac('a14', '#9fd8f6', '#e6f5fb', 140)}${soleil(60, 45, 22)}<rect y="140" width="400" height="160" fill="#3f9fe0"/>${vagues(140)}${vagues(200, '#8fd0f7')}${vagues(262, '#8fd0f7')}
<path d="M400 190Q330 175 280 200T200 240" class="ln" stroke="#3a3f55" stroke-width="40"/><path d="M400 190Q330 175 280 200T200 240" class="ln" stroke="#6ccbff" stroke-width="34"/>
<path d="M20 275q-4 -26 4 -40M45 280q4 -22 -2 -36" class="ln" stroke="#2f8f5a" stroke-width="6"/>
<g transform="translate(95 180) rotate(-20)">${poisson(0, 0, 1.2, true)}</g><path d="M60 150q10 -14 25 -8M80 140l-3 -10M100 144l4 -10" class="ln" stroke="#fff" stroke-width="3"/>
${perle(260, 205, 1.3, 'goutte', 'laugh')}${petiteGoutte(150, 235, .5)}${petiteGoutte(185, 205, .45)}${bulles([[215, 175, 5], [125, 225, 4]])}`),
      text: 'Après un dernier nettoyage, Perle est rendue à la rivière, qui la ramène tout droit vers le lac. Elle reconnaît les montagnes et son vieil ami Gaspard. Il saute hors de l\'eau pour l\'accueillir.' },
    // 15 — fin
    { svg: svg(`${sky('a15', '#f59e5b', '#fde3a8')}${montagne(110, 80, -40, 280, 150, '#c98d9a', true)}${montagne(300, 70, 190, 420, 150, '#b87b93', true)}<circle cx="200" cy="150" r="40" fill="#ffd84a" ${O2}/><rect y="150" width="400" height="150" fill="#d9825f"/><rect y="150" width="400" height="150" fill="#3f9fe0" fill-opacity=".6"/>${vagues(150, '#ffd9a0')}${vagues(205, '#ffd9a0')}${vagues(265, '#ffd9a0')}
${poisson(80, 245, 1, false)}${perle(200, 190, 1.8, 'goutte', 'smile')}
<g ${O2} fill="#fff"><circle cx="262" cy="150" r="5"/><circle cx="282" cy="124" r="8"/><circle cx="330" cy="70" r="38" fill-opacity=".95"/></g>
<circle cx="316" cy="62" r="9" fill="#ffd84a" ${O2}/><g transform="translate(340 88) scale(.5)"><path d="M0 -20V20M-17 -10L17 10M-17 10L17 -10" class="ln" stroke="#8fd0f7" stroke-width="5"/></g><g transform="translate(354 56) scale(.5)">${nuageGris(0, 0, 1, '#dff4ff')}</g>`),
      text: 'Perle est de retour chez elle, mais elle n\'a plus peur du voyage. Rien ne se perd : l\'eau voyage sans cesse, de lac en nuage, de neige en rivière. Demain, peut-être, elle repartira encore!' },
  ],
  words: [
    { word: 's\'évaporer', emoji: '💨', def: 'Quand l\'eau chauffée se transforme en vapeur et monte dans l\'air.' },
    { word: 'la vapeur d\'eau', emoji: '♨️', def: 'De l\'eau sous forme de gaz, qu\'on ne voit pas.' },
    { word: 'un nuage', emoji: '☁️', def: 'Un amas de millions de minuscules gouttelettes dans le ciel.' },
    { word: 'un flocon', emoji: '❄️', def: 'Un petit cristal de glace qui tombe du ciel en hiver.' },
    { word: 'fondre', emoji: '🫠', def: 'Passer de la glace ou de la neige à l\'eau, quand il fait plus chaud.' },
    { word: 'un sommet', emoji: '🏔️', def: 'Le point le plus haut d\'une montagne.' },
    { word: 'un ruisseau', emoji: '🏞️', def: 'Un tout petit cours d\'eau qui descend la montagne.' },
    { word: 'une usine', emoji: '🏭', def: 'Un grand bâtiment où l\'on fabrique ou transforme quelque chose.' },
    { word: 'désaltérer', emoji: '🥤', def: 'Faire passer la soif en buvant.' },
  ],
  quiz: [
    { q: 'Où Perle habite-t-elle au début de l\'histoire?', options: ['Dans un grand lac', 'Dans une rivière', 'Dans un nuage'], answer: 0 },
    { q: 'Que fait le soleil à Perle?', options: ['Il la gèle', 'Il la réchauffe et elle devient vapeur', 'Il la fait tomber'], answer: 1 },
    { q: 'Pourquoi la vapeur d\'eau redevient-elle des gouttelettes là-haut?', options: ['Parce que l\'air y est froid', 'Parce que le soleil est plus chaud', 'Parce que Gaspard la rappelle'], answer: 0 },
    { q: 'Que devient Perle près des sommets glacés?', options: ['Une bulle', 'Un flocon de neige', 'Un caillou'], answer: 1 },
    { q: 'Quel est le bon ordre du voyage de Perle?', options: ['Lac, nuage, neige, ruisseau, rivière', 'Neige, lac, rivière, nuage, ruisseau', 'Rivière, nuage, lac, neige, ruisseau'], answer: 0 },
    { q: 'Que veut dire « fondre » quand la neige fond au printemps?', options: ['Elle devient de l\'eau', 'Elle devient plus froide', 'Elle monte au ciel'], answer: 0 },
    { q: 'Pourquoi une usine nettoie-t-elle l\'eau de la rivière?', options: ['Pour la colorer', 'Pour qu\'elle soit propre à boire dans les maisons', 'Pour la garder dans un nuage'], answer: 1 },
    { q: 'Pourquoi peut-on dire que Perle n\'a pas disparu quand elle devient vapeur?', options: ['Elle a seulement changé de forme', 'Elle est tombée dans le lac', 'Elle est devenue un poisson'], answer: 0 },
  ],
};
