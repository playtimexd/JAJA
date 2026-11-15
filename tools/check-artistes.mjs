// `node tools/check-artistes.mjs` — validates js/content/arts/artistes.js (artist cards + style pictures),
// then runs `node tools/check-arts.mjs artistes` for the « à la manière de … » projects (docs/ARTS.md).
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { artists, projects } from '../js/content/arts/artistes.js';

let errors = 0;
const fail = (w, m) => { errors++; if (errors < 80) console.log(`✗ ${w}: ${m}`); };
const txt = (x) => x && typeof x.fr === 'string' && x.fr.trim() && typeof x.en === 'string' && x.en.trim();
const strOrTxt = (x) => (typeof x === 'string' && x.trim()) || txt(x);
const GROUPS = ['qc', 'pn', 'monde'];
const pids = new Set(projects.map((p) => p.id));
const used = new Set();
const ids = new Set();

function checkSvg(w, v) {
  if (typeof v !== 'string' || !v.trim().startsWith('<svg') || !v.trim().endsWith('</svg>')) return fail(w, 'svg not <svg>…</svg>');
  if (!/viewBox="0 0 400 300"/.test(v)) fail(w, 'viewBox must be 0 0 400 300');
  if (/<script/i.test(v)) fail(w, '<script>');
  if (/\son[a-z]+\s*=/i.test(v)) fail(w, 'on* event attribute');
  if (/(xlink:)?href\s*=\s*"(?!#)/i.test(v) || /url\((?!#)/i.test(v) || /<image|<foreignObject|<use/i.test(v)) fail(w, 'external reference / image');
  if (/<text[\s>]/i.test(v)) fail(w, '<text> not allowed');
  if (/NaN|undefined|Infinity/.test(v)) fail(w, 'bad number');
  if (v.length >= 6000) fail(w, `svg too big ${v.length}`);
  const tags = v.match(/<[a-zA-Z][^>]*>/g) || [], self = tags.filter((x) => x.endsWith('/>')).length, close = (v.match(/<\/[a-zA-Z]+>/g) || []).length;
  if (tags.length - self !== close) fail(w, 'unbalanced tags');
}

for (const a of artists) {
  const w = `artist/${a.id}`;
  if (!a.id || ids.has(a.id)) fail(w, 'missing or duplicate id'); ids.add(a.id);
  if (!GROUPS.includes(a.group)) fail(w, 'group');
  if (!a.name) fail(w, 'name');
  if (!strOrTxt(a.years) || !/\d{4}/.test(typeof a.years === 'string' ? a.years : a.years.fr)) fail(w, 'years');
  if (!txt(a.country)) fail(w, 'country');
  if (!a.flag || !/\p{Extended_Pictographic}|\p{Regional_Indicator}/u.test(a.flag)) fail(w, 'flag emoji');
  if (!txt(a.movement)) fail(w, 'movement');
  if (!Array.isArray(a.bio) || a.bio.length < 3 || a.bio.length > 4 || !a.bio.every(txt)) fail(w, 'bio: 3–4 sentences {fr,en}');
  if (!Array.isArray(a.look) || a.look.length !== 3 || !a.look.every(txt)) fail(w, 'look: 3 questions {fr,en}');
  if (!Array.isArray(a.famous) || a.famous.length < 1 || a.famous.length > 2) fail(w, 'famous: 1–2 works');
  for (const [i, f] of (a.famous || []).entries()) if (!txt(f.title) || !txt(f.desc) || !strOrTxt(f.year)) fail(`${w}/famous${i}`, 'title/year/desc');
  if (!Array.isArray(a.quiz) || a.quiz.length !== 2) fail(w, 'quiz: 2 questions');
  for (const [i, q] of (a.quiz || []).entries()) {
    if (!txt(q.q)) fail(`${w}/quiz${i}`, 'q');
    if (!Array.isArray(q.choices) || q.choices.length < 2 || !q.choices.every(txt)) fail(`${w}/quiz${i}`, 'choices');
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.choices?.length || 0)) fail(`${w}/quiz${i}`, 'answer index out of range');
  }
  if (!Array.isArray(a.projects) || !a.projects.length) fail(w, 'projects');
  for (const p of a.projects || []) { if (!pids.has(p)) fail(w, `unknown project ${p}`); used.add(p); }
  checkSvg(`${w}/style`, a.style);
}
for (const p of projects) {
  if (!used.has(p.id)) fail(`project/${p.id}`, 'not linked from any artist');
  if (p.artist && !ids.has(p.artist)) fail(`project/${p.id}`, `unknown artist ${p.artist}`);
  for (const [i, s] of (p.steps || []).entries()) checkSvg(`project/${p.id}#${i + 1}`, s.svg);
  if (p.steps.length < 4 || p.steps.length > 10) fail(`project/${p.id}`, `4–10 steps (has ${p.steps.length})`);
}
const by = (g) => artists.filter((a) => a.group === g).length;
console.log(`artistes: ${artists.length} artistes (Québec/Canada ${by('qc')}, Premières Nations/Métis/Inuit ${by('pn')}, monde ${by('monde')}), ${projects.length} projets`);
console.log(errors ? `FAIL ${errors} errors (artists)` : 'OK artists');

const r = spawnSync(process.execPath, [fileURLToPath(new URL('./check-arts.mjs', import.meta.url)), 'artistes'], { stdio: 'inherit' });
process.exit(errors || r.status ? 1 : 0);
