// `node tools/check-why.mjs [cat...]` — validates the « Pourquoi? 十万个为什么 » library (schema: docs/WHY.md).
import fs from 'node:fs';
import { CATS, MOVED } from '../js/content/why/groups.js';
import { sentences, slideReading } from '../js/why-text.js';

const only = process.argv.slice(2);
const han = (s) => [...s].filter((c) => /\p{Script=Han}/u.test(c)).length;
const ids = new Set();
let errors = 0, total = 0;
const fail = (w, m) => { errors++; if (errors < 100) console.log(`✗ ${w}: ${m}`); };
const str = (w, x, what) => { if (typeof x !== 'string' || !x.trim()) fail(w, `${what}: empty or missing`); else if (x !== x.trim()) fail(w, `${what}: leading/trailing space`); };
const zh = (w, x, what) => {
  if (!x || typeof x !== 'object') return fail(w, `${what}.zh missing`);
  str(w, x.hz, `${what}.zh.hz`);
  if (typeof x.hz !== 'string') return;
  if (/[A-Za-z]/.test(x.hz)) fail(w, `${what}.zh: Latin letters in « ${x.hz} »`);
  const n = x.py?.trim().split(/\s+/).filter(Boolean).length ?? 0;
  if (typeof x.py !== 'string' || n !== han(x.hz)) fail(w, `${what}.zh: pinyin syllables (${n}) ≠ characters (${han(x.hz)}) in « ${x.hz} »`);
  if (/[^a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü ]/.test(x.py || '')) fail(w, `${what}.zh: pinyin has other characters « ${x.py} »`);
  if (!Array.isArray(x.w) || x.w.some((k) => !(Number.isInteger(k) && k > 0)) || x.w.reduce((a, b) => a + b, 0) !== [...x.hz].length) fail(w, `${what}.zh: word lengths w do not cover « ${x.hz} »`);
};
const tri = (w, x, what) => { if (!x) return fail(w, `${what} missing`); str(w, x.fr, `${what}.fr`); str(w, x.en, `${what}.en`); zh(w, x.zh, what); };
const svgOk = (w, v) => {
  if (typeof v !== 'string' || !v.trim().startsWith('<svg') || !v.trim().endsWith('</svg>')) return fail(w, 'svg');
  if (!/viewBox="0 0 400 300"/.test(v)) fail(w, 'viewBox');
  if (/<script|\son\w+=|href="(?!#)|<image|<foreignObject/i.test(v)) fail(w, 'forbidden svg content');
};

for (const c of CATS) {
  const cat = c.id;
  if (only.length && !only.includes(cat)) continue;
  str(cat, c.t.fr, 'title'); zh(cat, c.t.zh, 'title');
  const f = new URL(`../js/content/why/${cat}.js`, import.meta.url);
  if (!fs.existsSync(f)) { fail(cat, 'file missing'); continue; }
  const { topics } = await import(f.href);
  try { topics.push(...(await import(new URL(`../js/content/why/g3-${cat}.js`, import.meta.url).href)).topics); } catch (e) { if (e.code !== 'ERR_MODULE_NOT_FOUND') throw e; }
  const { PICS } = await import(new URL(`../js/content/why/${cat}-pics.js`, import.meta.url).href);
  const shelves = new Set(c.shelves.map((s) => s.id));
  for (const s of c.shelves) { str(cat, s.t.fr, 'shelf'); str(cat, s.t.en, 'shelf'); zh(cat, s.t.zh, 'shelf'); }
  const lv = [0, 0, 0, 0], kinds = { explain: 0, fact: 0, try: 0, words: 0 };
  let slides = 0;
  for (const t of topics) {
    const w = `${cat}/${t.id}`;
    total++;
    if (!t.id?.startsWith(cat + '-')) fail(w, 'id prefix');
    if (ids.has(t.id)) fail(w, 'duplicate id'); ids.add(t.id);
    if (t.cat !== cat) fail(w, 'cat');
    if (!shelves.has(t.shelf)) fail(w, `shelf « ${t.shelf} » not in groups.js`);
    if (!t.emoji) fail(w, 'emoji');
    if (t.shelf === 'g3' && t.grade !== 3) fail(w, 'g3 shelf needs grade: 3');
    if (![1, 2, 3].includes(t.level)) fail(w, 'level'); else lv[t.level]++;
    tri(w, t.q, 'q');
    if (!Array.isArray(t.slides) || t.slides.length < 5 || t.slides.length > 8) fail(w, `slides 5–8 (has ${t.slides?.length})`);
    const k = { explain: 0, fact: 0, try: 0, words: 0 };
    (t.slides || []).forEach((s, i) => {
      const sw = `${w}#${i + 1}`;
      slides++;
      if (!(s.kind in k)) return fail(sw, `kind « ${s.kind} »`);
      k[s.kind]++; kinds[s.kind]++;
      if (!s.emoji) fail(sw, 'emoji');
      if (s.pic != null) { const v = PICS[t.id]?.[s.pic]; if (!v) fail(sw, `pic ${s.pic} missing in ${cat}-pics.js`); else svgOk(sw, v); }
      if (s.kind === 'words') {
        if (!Array.isArray(s.words) || s.words.length < 2 || s.words.length > 4) fail(sw, 'words 2–4');
        for (const [j, x] of (s.words || []).entries()) {
          for (const l of ['fr', 'en']) { str(`${sw}.w${j + 1}`, x[l]?.t, `${l}.t`); str(`${sw}.w${j + 1}`, x[l]?.d, `${l}.d`); }
          zh(`${sw}.w${j + 1}`, x.zh?.t, 'term'); zh(`${sw}.w${j + 1}`, x.zh?.d, 'definition');
        }
      } else tri(sw, s, 'slide');
      // what is read aloud must be non-empty sentences
      for (const l of ['fr', 'en', 'zh']) { try { for (const u of slideReading(t, i, l)) if (!u.text?.trim()) fail(sw, `empty reading unit (${l})`); } catch (e) { fail(sw, `reading ${l}: ${e.message}`); } }
    });
    if (k.explain < 3) fail(w, '≥ 3 explain slides');
    if (k.fact < 1) fail(w, '≥ 1 fact slide');
    if (k.words !== 1) fail(w, 'exactly 1 words slide');
    if (!Array.isArray(t.quiz) || t.quiz.length < 4 || t.quiz.length > 5) fail(w, `quiz 4–5 (has ${t.quiz?.length})`);
    (t.quiz || []).forEach((q, i) => {
      const qw = `${w}?${i + 1}`;
      tri(qw, q, 'question');
      if (!Array.isArray(q.options) || q.options.length < 3 || q.options.length > 4) fail(qw, 'options 3–4');
      (q.options || []).forEach((o, j) => tri(`${qw}.${j + 1}`, o, 'option'));
      for (const l of ['fr', 'en']) if (new Set((q.options || []).map((o) => o[l])).size !== (q.options || []).length) fail(qw, `duplicate ${l} options`);
      if (new Set((q.options || []).map((o) => o.zh?.hz)).size !== (q.options || []).length) fail(qw, 'duplicate zh options');
      if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < (q.options || []).length)) fail(qw, 'answer out of range');
    });
  }
  console.log(`${cat}: ${topics.length} topics (L1 ${lv[1]}, L2 ${lv[2]}, L3 ${lv[3]}) · ${slides} slides (${Object.entries(kinds).map(([a, b]) => `${a} ${b}`).join(', ')})`);
}
if (!only.length) for (const [a, b] of Object.entries(MOVED)) if (!ids.has(b)) fail('MOVED', `${a} → ${b}: unknown topic`);
// sentence splitting sanity (used for highlighting and voice clips)
if (sentences('Il fait 110 km/h. Mais pas longtemps!', 'fr').length !== 2 || sentences('猎豹很快。它会累！', 'zh').length !== 2) fail('why-text', 'sentences()');
console.log(errors ? `FAIL ${errors}` : `OK ${total} topics`);
process.exit(errors ? 1 : 0);
