// Atelier — built-in colouring pages (original line art, viewBox 0 0 400 300).
// Lines only (fill="none"): the Atelier draws them on a TOP layer and the paint bucket uses them as walls.
// Keep shapes closed so every zone can be filled.
const wrap = (inner) => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="#3a3f55" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${inner}</g></svg>`;
const c = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}"/>`;
const e = (x, y, rx, ry, rot = 0, ox = x, oy = y) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"${rot ? ` transform="rotate(${rot} ${ox} ${oy})"` : ''}/>`;
const r = (x, y, w, h, rd = 0) => `<rect x="${x}" y="${y}" width="${w}" height="${h}"${rd ? ` rx="${rd}"` : ''}/>`;
const p = (d) => `<path d="${d}"/>`;
const ln = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
const f = (v) => Math.round(v * 10) / 10;
const pol = (cx, cy, rad, deg) => [f(cx + rad * Math.sin((deg * Math.PI) / 180)), f(cy - rad * Math.cos((deg * Math.PI) / 180))];
const ring = (n, fn) => Array.from({ length: n }, (_, i) => fn((360 / n) * i, i)).join('');

// ---------- mandala ----------
const mandala = wrap(
  c(200, 150, 20) + c(200, 150, 44) + c(200, 150, 82) + c(200, 150, 134) +
  ring(8, (a) => e(200, 87, 14, 18, a, 200, 150)) +
  ring(12, (a) => { const [x, y] = pol(200, 150, 100, a); return c(x, y, 12); }) +
  ring(12, (a) => { const b = a + 15; const [x1, y1] = pol(200, 150, 112, b - 11), [x2, y2] = pol(200, 150, 132, b), [x3, y3] = pol(200, 150, 112, b + 11); return p(`M${x1} ${y1}L${x2} ${y2}L${x3} ${y3}`); }) +
  ring(6, (a) => { const [x, y] = pol(200, 150, 32, a); return c(x, y, 5); }));

// ---------- hibou ----------
const hibou = wrap(
  e(200, 165, 80, 95) +
  p('M142 105L128 52L176 80') + p('M258 105L272 52L224 80') +
  c(165, 130, 28) + c(235, 130, 28) + c(168, 132, 10) + c(232, 132, 10) +
  p('M188 158L212 158L200 182Z') +
  e(200, 218, 46, 40) +
  p('M178 205q10 10 20 0') + p('M202 205q10 10 20 0') + p('M190 225q10 10 20 0') +
  p('M128 145Q98 195 136 240') + p('M272 145Q302 195 264 240') +
  r(40, 262, 320, 18, 9) +
  e(178, 262, 12, 7) + e(222, 262, 12, 7));

// ---------- poisson ----------
const poisson = wrap(
  p('M90 150Q170 60 280 150Q170 240 90 150Z') +
  p('M280 150L342 100L328 150L342 200Z') +
  c(128, 138, 10) +
  p('M150 118Q162 150 150 182') +
  p('M180 104Q200 66 236 112') + p('M188 196Q206 228 226 190') +
  p('M190 128q14 22 0 44') + p('M222 128q14 22 0 44') +
  c(60, 92, 10) + c(44, 60, 7) + c(66, 36, 5) +
  p('M362 290Q346 260 362 230Q378 200 362 170'));

// ---------- maison ----------
const maison = wrap(
  r(120, 135, 160, 135) + p('M100 138L200 52L300 138Z') +
  p('M246 92L246 56L270 56L270 113') +
  r(180, 196, 40, 74, 4) + c(212, 234, 3) +
  r(136, 158, 34, 34) + ln(153, 158, 153, 192) + ln(136, 175, 170, 175) +
  r(230, 158, 34, 34) + ln(247, 158, 247, 192) + ln(230, 175, 264, 175) +
  c(60, 60, 24) + ring(8, (a) => { const [x1, y1] = pol(60, 60, 32, a), [x2, y2] = pol(60, 60, 44, a); return ln(x1, y1, x2, y2); }) +
  p('M310 70q0-18 18-18q8-14 26-8q18 0 18 18q14 4 8 18h-62q-12-2-8-10z') +
  ln(16, 270, 384, 270) +
  c(60, 250, 8) + ln(60, 258, 60, 270) + c(340, 250, 8) + ln(340, 258, 340, 270));

// ---------- voiture ----------
const voiture = wrap(
  p('M60 212L60 172Q64 155 90 150L130 150L165 105L265 105L305 150L338 155Q356 160 356 182L356 212Z') +
  p('M176 116L148 150L210 150L210 116Z') + p('M220 116L220 150L290 150L260 116Z') +
  ln(215, 150, 215, 206) + ln(228, 168, 242, 168) +
  c(115, 215, 30) + c(115, 215, 12) + c(295, 215, 30) + c(295, 215, 12) +
  c(340, 176, 8) + r(60, 176, 16, 12, 4) +
  ln(16, 247, 384, 247));

// ---------- fleur ----------
const fleur = wrap(
  ring(8, (a) => e(200, 58, 17, 30, a, 200, 110)) +
  c(200, 110, 25) +
  p('M200 140Q188 210 200 286') +
  p('M196 214Q150 186 136 230Q170 244 196 226Z') + p('M200 250Q248 222 266 262Q228 274 200 262Z') +
  ln(16, 286, 384, 286) +
  p('M300 70q-14-16-28 0q14 16 28 0z') + p('M300 70q14-16 28 0q-14 16-28 0z') + ln(300, 62, 300, 78));

// ---------- castor ----------
const castor = wrap(
  p('M70 240Q40 228 30 208Q60 196 112 214Q130 226 116 240Q96 252 70 240Z') +
  ln(48, 214, 98, 240) + ln(66, 206, 110, 230) + ln(46, 230, 70, 210) + ln(66, 240, 92, 214) +
  e(190, 190, 85, 65) +
  c(250, 98, 12) + c(296, 100, 12) +
  c(272, 136, 45) +
  c(286, 124, 6) + e(312, 140, 10, 7) +
  p('M294 160L294 178L312 178L312 160') + ln(303, 160, 303, 178) +
  p('M250 186Q274 204 256 222') +
  e(160, 256, 24, 10) + e(232, 256, 24, 10) +
  ln(16, 268, 384, 268));

// ---------- érable ----------
const erable = wrap(
  p('M200 28L215 74L240 60L232 114L276 88L270 110L312 104L290 134L322 150L266 186L276 212L214 200L206 258L194 258L186 200L124 212L134 186L78 150L110 134L88 104L130 110L124 88L168 114L160 60L185 74Z') +
  ln(200, 258, 200, 292) +
  ln(200, 250, 200, 64) + ln(200, 176, 288, 128) + ln(200, 176, 112, 128) + ln(200, 200, 256, 194) + ln(200, 200, 144, 194));

// ---------- flocon ----------
const flocon = wrap(
  ring(6, (a) => {
    const [x1, y1] = pol(200, 150, 22, a), [x2, y2] = pol(200, 150, 128, a);
    let s = ln(x1, y1, x2, y2);
    for (const [d, len] of [[62, 26], [96, 20]]) {
      const [bx, by] = pol(200, 150, d, a);
      const [lx, ly] = pol(bx, by, len, a - 45), [rx, ry] = pol(bx, by, len, a + 45);
      s += p(`M${lx} ${ly}L${bx} ${by}L${rx} ${ry}`);
    }
    const [tx, ty] = pol(200, 150, 128, a);
    return s + c(tx, ty, 6);
  }) +
  `<polygon points="${ring(6, (a) => pol(200, 150, 22, a + 30).join(',') + ' ').trim()}"/>`);

// ---------- dinosaure ----------
const dinosaure = wrap(
  r(140, 220, 26, 50, 10) + r(178, 224, 26, 46, 10) + r(228, 224, 26, 46, 10) + r(262, 220, 26, 50, 10) +
  e(205, 188, 92, 56) +
  p('M118 172Q62 166 26 214Q76 196 122 212') +
  p('M262 152Q288 112 290 80') + p('M290 176Q318 124 322 86') +
  e(312, 70, 32, 19) +
  c(320, 63, 4) + p('M324 78Q332 82 340 74') +
  p('M148 142L160 118L174 137') + p('M182 135L194 112L208 133') + p('M216 134L228 112L240 137') +
  ln(16, 270, 384, 270));

// ---------- papillon ----------
const papillon = wrap(
  p('M194 118Q122 22 70 66Q46 132 194 152Z') + p('M206 118Q278 22 330 66Q354 132 206 152Z') +
  p('M194 160Q90 158 100 228Q140 270 196 186Z') + p('M206 160Q310 158 300 228Q260 270 204 186Z') +
  c(120, 88, 15) + c(280, 88, 15) + c(138, 206, 12) + c(262, 206, 12) +
  e(200, 152, 10, 62) + c(200, 80, 14) +
  p('M194 68Q180 40 164 34') + p('M206 68Q220 40 236 34') + c(160, 32, 5) + c(240, 32, 5));

// ---------- château ----------
const chateau = wrap(
  p('M110 270L110 104L130 104L130 118L150 118L150 104L170 104L170 118L190 118L190 104L210 104L210 118L230 118L230 104L250 104L250 118L270 118L270 104L290 104L290 270') +
  r(60, 90, 60, 180) + r(280, 90, 60, 180) +
  p('M54 92L90 34L126 92Z') + p('M274 92L310 34L346 92Z') +
  p('M90 34L90 12L112 19L90 26') + p('M310 34L310 12L332 19L310 26') +
  p('M170 270L170 214Q200 176 230 214L230 270Z') + ln(200, 194, 200, 270) +
  r(80, 128, 20, 32, 10) + r(300, 128, 20, 32, 10) + c(200, 152, 15) +
  ln(16, 270, 384, 270));

export const pages = [
  { id: 'col-mandala', title: { fr: 'Mandala', en: 'Mandala' }, svg: mandala },
  { id: 'col-hibou', title: { fr: 'Le hibou', en: 'The owl' }, svg: hibou },
  { id: 'col-poisson', title: { fr: 'Le poisson', en: 'The fish' }, svg: poisson },
  { id: 'col-maison', title: { fr: 'La maison', en: 'The house' }, svg: maison },
  { id: 'col-voiture', title: { fr: 'La voiture', en: 'The car' }, svg: voiture },
  { id: 'col-fleur', title: { fr: 'La fleur', en: 'The flower' }, svg: fleur },
  { id: 'col-castor', title: { fr: 'Le castor', en: 'The beaver' }, svg: castor },
  { id: 'col-erable', title: { fr: 'La feuille d’érable', en: 'The maple leaf' }, svg: erable },
  { id: 'col-flocon', title: { fr: 'Le flocon', en: 'The snowflake' }, svg: flocon },
  { id: 'col-dinosaure', title: { fr: 'Le dinosaure', en: 'The dinosaur' }, svg: dinosaure },
  { id: 'col-papillon', title: { fr: 'Le papillon', en: 'The butterfly' }, svg: papillon },
  { id: 'col-chateau', title: { fr: 'Le château', en: 'The castle' }, svg: chateau },
];
