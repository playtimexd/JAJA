// `node tools/check-why.mjs [cat...]` — validates the « Pourquoi? 十万个为什么 » library (docs/WHY.md).
import fs from 'node:fs';
const CATS = process.argv.slice(2).length ? process.argv.slice(2) : ['animaux', 'corps', 'ciel', 'science'];
const han = (s) => [...s].filter((c) => /\p{Script=Han}/u.test(c)).length;
const ids = new Set();
let errors = 0, total = 0;
const fail = (w, m) => { errors++; if (errors < 80) console.log(`✗ ${w}: ${m}`); };
const tri = (w, x, what) => {
  if (!x || typeof x.zh !== 'string' || !x.zh || typeof x.fr !== 'string' || !x.fr) return fail(w, `${what}: zh/fr missing`);
  if (typeof x.py !== 'string' || han(x.zh) !== x.py.trim().split(/\s+/).filter(Boolean).length) fail(w, `${what}: pinyin syllables (${x.py?.trim().split(/\s+/).length}) ≠ characters (${han(x.zh)}) in « ${x.zh} »`);
};
const svgOk = (w, v) => {
  if (typeof v !== 'string' || !v.trim().startsWith('<svg') || !v.trim().endsWith('</svg>')) return fail(w, 'svg');
  if (!/viewBox="0 0 400 300"/.test(v)) fail(w, 'viewBox');
  if (/<script|\son\w+=|href="(?!#)|<image|<foreignObject/i.test(v)) fail(w, 'forbidden svg content');
  if (v.length > 6000) fail(w, `svg too big ${v.length}`);
};
for (const cat of CATS) {
  const f = new URL(`../js/content/why/${cat}.js`, import.meta.url);
  if (!fs.existsSync(f)) { console.log(`– ${cat}: missing`); continue; }
  let mod;
  try { mod = await import(f.href); } catch (e) { fail(cat, 'not loadable ' + e.message); continue; }
  const lv = [0, 0, 0, 0];
  for (const t of mod.topics || []) {
    const w = `${cat}/${t.id}`;
    total++;
    if (!t.id?.startsWith(cat + '-')) fail(w, 'id prefix');
    if (ids.has(t.id)) fail(w, 'duplicate id'); ids.add(t.id);
    if (t.cat !== cat) fail(w, 'cat');
    if (!t.emoji) fail(w, 'emoji');
    if (![1, 2, 3].includes(t.level)) fail(w, 'level'); else lv[t.level]++;
    tri(w, t.q, 'q');
    if (!Array.isArray(t.slides) || t.slides.length < 2 || t.slides.length > 4) fail(w, 'slides 2–4');
    (t.slides || []).forEach((s, i) => { tri(`${w}#${i + 1}`, s, 'slide'); if (s.svg) svgOk(`${w}#${i + 1}`, s.svg); });
    if (t.fact) tri(w, t.fact, 'fact');
    if (!Array.isArray(t.quiz) || t.quiz.length < 2 || t.quiz.length > 3) fail(w, 'quiz 2–3');
    (t.quiz || []).forEach((q, i) => {
      tri(`${w}?${i + 1}`, q, 'quiz q');
      if (!Array.isArray(q.options) || q.options.length < 3 || q.options.length > 4) fail(`${w}?${i + 1}`, 'options 3–4');
      (q.options || []).forEach((o) => tri(`${w}?${i + 1}`, o, 'option'));
      if (new Set((q.options || []).map((o) => o.zh)).size !== (q.options || []).length) fail(`${w}?${i + 1}`, 'duplicate options');
      if (!(q.answer >= 0 && q.answer < (q.options || []).length)) fail(`${w}?${i + 1}`, 'answer');
    });
  }
  console.log(`${cat}: ${(mod.topics || []).length} topics (L1 ${lv[1]}, L2 ${lv[2]}, L3 ${lv[3]})`);
}
console.log(errors ? `FAIL ${errors}` : `OK ${total} topics`);
process.exit(errors ? 1 : 0);
