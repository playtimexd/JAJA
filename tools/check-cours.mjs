// `node tools/check-cours.mjs` — validates « Mon cours d’arts » (js/content/arts/cours.js, UI js/arts-cours.js),
// then runs `node tools/check-arts.mjs cours` for the projects (docs/ARTS.md).
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { lessons, projects, paints, mixOf } from '../js/content/arts/cours.js';

let errors = 0;
const fail = (w, m) => { errors++; if (errors < 80) console.log(`✗ ${w}: ${m}`); };
const txt = (x) => x && typeof x.fr === 'string' && x.fr.trim() && typeof x.en === 'string' && x.en.trim();
const TYPES = ['sort', 'quiz', 'mix', 'pattern', 'symmetry', 'spot'];
let svgs = 0;
const checkSvg = (w, v, { big = false, max = 4096 } = {}) => {
  svgs++;
  if (typeof v !== 'string' || !v.trim().startsWith('<svg') || !v.trim().endsWith('</svg>')) return fail(w, 'svg not <svg>…</svg>');
  if (big && !/viewBox="0 0 400 300"/.test(v)) fail(w, 'viewBox must be 0 0 400 300');
  if (!/viewBox="[\d.]+ [\d.]+ [\d.]+ [\d.]+"/.test(v)) fail(w, 'missing viewBox');
  if (/<script/i.test(v)) fail(w, '<script>');
  if (/\son[a-z]+\s*=/i.test(v)) fail(w, 'event attribute');
  if (/(xlink:)?href\s*=\s*"(?!#)/i.test(v) || /<image|<foreignObject|url\((?!#)/i.test(v)) fail(w, 'external reference');
  if (/<text[\s>]/.test(v)) fail(w, '<text> element');
  if (/NaN|undefined|Infinity/.test(v)) fail(w, 'bad number');
  if (v.length >= max) fail(w, `svg too big ${v.length}`);
  const tags = v.match(/<[a-zA-Z][^>]*>/g) || [], self = tags.filter((x) => x.endsWith('/>')).length, close = (v.match(/<\/[a-zA-Z]+>/g) || []).length;
  if (tags.length - self !== close) fail(w, 'unbalanced tags');
};

const pids = new Set(projects.map((p) => p.id));
const ids = new Set();
const types = new Set();
if (lessons.length < 15) fail('lessons', `only ${lessons.length}`);
for (const [n, l] of lessons.entries()) {
  const w = `#${n + 1} ${l.id}`;
  if (!l.id || ids.has(l.id)) fail(w, 'missing or duplicate id'); ids.add(l.id);
  if (!l.icon) fail(w, 'icon');
  if (!txt(l.title)) fail(w, 'title fr/en');
  if (!txt(l.goal)) fail(w, 'goal fr/en');
  else if (!/^Je vais apprendre à /.test(l.goal.fr)) fail(w, 'goal.fr must start with « Je vais apprendre à »');
  if (!Array.isArray(l.vocab) || l.vocab.length < 3 || l.vocab.length > 5) fail(w, `vocab count ${l.vocab?.length}`);
  for (const [i, v] of (l.vocab || []).entries()) if (!txt(v.word) || !txt(v.def)) fail(`${w} vocab ${i}`, 'word/def fr/en');
  if (!Array.isArray(l.teach) || l.teach.length < 3 || l.teach.length > 6) fail(w, `teach count ${l.teach?.length}`);
  for (const [i, s] of (l.teach || []).entries()) { if (!txt(s.text)) fail(`${w} slide ${i + 1}`, 'text fr/en'); checkSvg(`${w} slide ${i + 1}`, s.svg, { big: true }); }
  if (!Array.isArray(l.retour) || l.retour.length < 2 || l.retour.length > 3 || !l.retour.every(txt)) fail(w, 'retour: 2–3 questions fr/en');
  if (!pids.has(l.project)) fail(w, `project ${l.project} missing`);
  const g = l.game || {}, gw = `${w} game ${g.type}`;
  types.add(g.type);
  if (!TYPES.includes(g.type)) { fail(gw, 'unknown game type'); continue; }
  if (g.type === 'quiz') {
    if (!g.rounds?.length) fail(gw, 'rounds');
    for (const [i, r] of (g.rounds || []).entries()) {
      if (!txt(r.q)) fail(`${gw} r${i}`, 'q fr/en');
      if (r.pic) checkSvg(`${gw} r${i} pic`, r.pic, { big: true });
      if (!(r.opts?.length >= 2) || r.opts.filter((o) => o.ok).length !== 1) fail(`${gw} r${i}`, 'need ≥2 options and exactly 1 ok');
      for (const [j, o] of (r.opts || []).entries()) { if (!o.svg && !txt(o.label)) fail(`${gw} r${i} o${j}`, 'svg or label'); if (o.svg) checkSvg(`${gw} r${i} o${j}`, o.svg); if (o.label && !txt(o.label)) fail(`${gw} r${i} o${j}`, 'label fr/en'); }
    }
  } else if (g.type === 'sort') {
    if (!txt(g.q)) fail(gw, 'q fr/en');
    if (!(g.bins?.length >= 2 && g.bins.length <= 3)) fail(gw, '2–3 bins');
    const bids = new Set((g.bins || []).map((b) => b.id));
    for (const b of g.bins || []) { if (!txt(b.label)) fail(gw, `bin ${b.id} label`); if (b.icon) checkSvg(`${gw} bin ${b.id}`, b.icon); }
    if (!(g.items?.length >= 4)) fail(gw, 'items');
    for (const [i, it] of (g.items || []).entries()) { if (!bids.has(it.bin)) fail(`${gw} item ${i}`, 'bad bin'); checkSvg(`${gw} item ${i}`, it.svg); }
    for (const b of bids) if (!(g.items || []).some((it) => it.bin === b)) fail(gw, `empty bin ${b}`);
  } else if (g.type === 'mix') {
    if (!txt(g.q)) fail(gw, 'q fr/en');
    for (const id of [...(g.pots || []), ...(g.targets || [])]) if (!paints.colors[id] || !txt(paints.colors[id].name)) fail(gw, `unknown colour ${id}`);
    for (const t of g.targets || []) {
      const ok = (g.pots || []).some((a) => (g.pots || []).some((b) => mixOf(a, b) === t));
      if (!ok) fail(gw, `target ${t} cannot be made from pots`);
    }
  } else if (g.type === 'pattern') {
    if (!txt(g.q)) fail(gw, 'q fr/en');
    for (const [k, v] of Object.entries(g.tokens || {})) checkSvg(`${gw} token ${k}`, v);
    for (const [i, r] of (g.rounds || []).entries()) {
      if (!r.unit || ![...r.unit].every((k) => g.tokens?.[k])) fail(`${gw} r${i}`, 'unit uses unknown token');
      if (!(r.shown >= r.unit.length) || !(r.ask >= 1)) fail(`${gw} r${i}`, 'shown/ask');
    }
  } else if (g.type === 'symmetry') {
    if (!txt(g.q)) fail(gw, 'q fr/en');
    for (const [i, p] of (g.puzzles || []).entries()) {
      if (!p.rows?.length || !p.rows.every((s) => /^[01]+$/.test(s) && s.length === p.rows[0].length)) fail(`${gw} p${i}`, 'rows must be equal 0/1 strings');
      if (!p.rows?.some((s) => s.includes('1'))) fail(`${gw} p${i}`, 'empty puzzle');
      if (!/^#[0-9a-f]{3,6}$/i.test(p.color || '')) fail(`${gw} p${i}`, 'color');
    }
  } else if (g.type === 'spot') {
    for (const [i, r] of (g.rounds || []).entries()) {
      if (!txt(r.q)) fail(`${gw} r${i}`, 'q fr/en');
      checkSvg(`${gw} r${i}`, r.svg, { big: true });
      if (!r.targets?.length) fail(`${gw} r${i}`, 'targets');
      for (const t of r.targets || []) {
        const okC = Array.isArray(t) && t.length === 3 && t.every(Number.isFinite) && t[0] >= 0 && t[0] <= 400 && t[1] >= 0 && t[1] <= 300;
        const okR = !Array.isArray(t) && [t.x, t.y, t.w, t.h].every(Number.isFinite);
        if (!okC && !okR) fail(`${gw} r${i}`, `bad target ${JSON.stringify(t)}`);
      }
    }
  }
}
for (const p of projects) if (!p.id.startsWith('cours-') || p.cat !== 'cours') fail(p.id, 'project id must start with cours- and cat must be cours');
for (const p of projects) if (![...ids].some((id) => 'cours-' + id === p.id)) fail(p.id, 'project not used by any lesson');
if (types.size < 5) fail('games', `only ${types.size} game types used`);
console.log(`cours: ${lessons.length} leçons, ${svgs} images, jeux : ${[...types].join(', ')}`);
console.log(errors ? `FAIL ${errors} errors` : 'OK leçons');

const r = spawnSync(process.execPath, [fileURLToPath(new URL('./check-arts.mjs', import.meta.url)), 'cours'], { stdio: 'inherit' });
process.exit(errors || r.status ? 1 : 0);
