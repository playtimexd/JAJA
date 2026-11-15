// `node tools/check-livres.mjs [id...]` — validates the storybooks (docs/LIVRES.md).
import fs from 'node:fs';
const dir = new URL('../js/content/livres/', import.meta.url);
const ids = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'index.js').map((f) => f.slice(0, -3));
let errors = 0;
const fail = (w, m) => { errors++; if (errors < 80) console.log(`✗ ${w}: ${m}`); };
const svgOk = (w, v) => {
  if (typeof v !== 'string' || !v.trim().startsWith('<svg') || !v.trim().endsWith('</svg>')) return fail(w, 'svg');
  if (!/viewBox="0 0 400 300"/.test(v)) fail(w, 'viewBox');
  if (/<script|\son\w+=|href="(?!#)|<image|<foreignObject/i.test(v)) fail(w, 'forbidden svg content');
  if (/<text[^>]*>[^<]*[A-Za-zÀ-ÿ]{2,}/.test(v)) fail(w, 'words in svg');
  if (v.length > 12000) fail(w, `svg too big ${v.length}`);
};
for (const id of ids) {
  let b;
  try { b = (await import(new URL(`${id}.js`, dir).href)).book; } catch (e) { fail(id, 'not loadable ' + e.message); continue; }
  if (!b || b.id !== id) { fail(id, 'export book with id = file name'); continue; }
  if (!b.title || !b.emoji || ![1, 2, 3].includes(b.level) || !(b.minutes > 0)) fail(id, 'title/emoji/level/minutes');
  svgOk(`${id}/cover`, b.cover);
  if (!Array.isArray(b.pages) || b.pages.length < 10 || b.pages.length > 16) fail(id, `pages ${b.pages?.length}`);
  (b.pages || []).forEach((p, i) => {
    svgOk(`${id}/p${i + 1}`, p.svg);
    const n = (p.text || '').split(/\s+/).filter(Boolean).length;
    if (!n || n > 45) fail(`${id}/p${i + 1}`, `text words ${n}`);
  });
  if (!Array.isArray(b.words) || b.words.length < 5) fail(id, 'words');
  (b.words || []).forEach((w) => { if (!w.word || !w.def) fail(id, 'word/def'); });
  if (!Array.isArray(b.quiz) || b.quiz.length < 5) fail(id, 'quiz ≥ 5');
  (b.quiz || []).forEach((q, i) => {
    if (!q.q || !Array.isArray(q.options) || q.options.length < 3 || !(q.answer >= 0 && q.answer < q.options.length)) fail(`${id}?${i + 1}`, 'quiz item');
    if (new Set(q.options).size !== q.options?.length) fail(`${id}?${i + 1}`, 'duplicate options');
  });
  console.log(`${id}: ${b.pages?.length} pages, ${b.quiz?.length} questions, niveau ${b.level}`);
}
console.log(errors ? `FAIL ${errors}` : `OK ${ids.length} livres`);
process.exit(errors ? 1 : 0);
