// `node tools/check-arts.mjs [cat...]` — validates the Arts plastiques library (docs/ARTS.md).
import fs from 'node:fs';
import { genSteps } from '../js/arts-gen.js';
import { ART_FILES, BIG_FILES } from '../js/content/arts/index.js';
const CATS = process.argv.slice(2).length ? process.argv.slice(2) : [...ART_FILES, ...BIG_FILES];
const GEN = { openmoji: 'om', quickdraw: 'qd' };   // big generated libraries: id prefix, steps built by js/arts-gen.js
const ids = new Set();
let errors = 0, total = 0, steps = 0;
const fail = (w, m) => { errors++; if (errors < 60) console.log(`✗ ${w}: ${m}`); };
const txt = (x) => x && typeof x.fr === 'string' && x.fr.trim() && typeof x.en === 'string' && x.en.trim();
for (const cat of CATS) {
  const f = new URL(`../js/content/arts/${cat}.js`, import.meta.url);
  if (!fs.existsSync(f)) { console.log(`– ${cat}: missing`); continue; }
  let mod;
  try { mod = await import(f.href); } catch (e) { fail(cat, 'not loadable ' + e.message); continue; }
  const list = mod.projects || [];
  const gen = GEN[cat]; const base = gen ? 'dessin' : cat.replace(/\d+$/, '');   // dessin2.js holds more 'dessin' projects
  const lv = [0, 0, 0, 0];
  for (const p of list) {
    const w = `${cat}/${p.id}`;
    total++;
    if (!p.id?.startsWith((gen || base) + '-')) fail(w, 'id must start with ' + (gen || base) + '-');
    if (ids.has(p.id)) fail(w, 'duplicate id'); ids.add(p.id);
    if (p.cat !== base) fail(w, 'cat mismatch');
    if (!p.emoji) fail(w, 'emoji');
    if (!txt(p.title)) fail(w, 'title');
    if (![1, 2, 3].includes(p.level)) fail(w, 'level'); else lv[p.level]++;
    if (!(p.minutes > 0)) fail(w, 'minutes');
    if (!Array.isArray(p.materials) || !p.materials.length || !p.materials.every(txt)) fail(w, 'materials');
    if (gen) {
      if (!['openmoji', 'quickdraw'].includes(p.source) || p.source !== cat) fail(w, 'source');
      if (p.gen !== (cat === 'openmoji' ? 'parts' : 'strokes')) fail(w, 'gen');
      if (cat === 'openmoji' && !(/^(<path[^>]*\/>)+$/.test(p.line || '') && typeof p.color === 'string' && p.color.length > 20)) fail(w, 'line/color missing or line not all <path>');
      if (cat === 'quickdraw' && !/^\d+,\d+( \d+,\d+)*(\|\d+,\d+( \d+,\d+)*)*$/.test(p.strokes || '')) fail(w, 'strokes format');
      if (cat === 'quickdraw' && !(p.strokes.split('|').length >= 4 && p.strokes.split('|').length <= 14)) fail(w, 'stroke count');
      try { p.steps = genSteps(p); } catch (e) { fail(w, 'generator threw ' + e.message); p.steps = []; }
    }
    if (!Array.isArray(p.steps) || p.steps.length < 3 || p.steps.length > 16) fail(w, `steps count ${p.steps?.length}`);
    for (const [i, s] of (p.steps || []).entries()) {
      steps++;
      const sw = `${w}#${i + 1}`;
      if (!txt(s.text)) fail(sw, 'text');
      const v = s.svg;
      if (typeof v !== 'string' || !v.trim().startsWith('<svg') || !v.trim().endsWith('</svg>')) { fail(sw, 'svg not <svg>…</svg>'); continue; }
      if (!/viewBox="0 0 400 300"/.test(v)) fail(sw, 'viewBox must be 0 0 400 300');
      if (/<script|\son\w+=|href="(?!#)|<image|<foreignObject/i.test(v)) fail(sw, 'forbidden content');
      if (/<text[\s>]/.test(v) && /<text[^>]*>[^<]*[A-Za-zÀ-ÿ]{2,}/.test(v)) fail(sw, 'words inside svg');
      if (/NaN|undefined|Infinity/.test(v)) fail(sw, 'bad number in svg');
      if (gen && i > 0 && v === p.steps[i - 1].svg) fail(sw, 'step adds nothing');
      if (v.length > (p.theme === 'scene' ? 16000 : gen ? 12000 : 6000)) fail(sw, `svg too big ${v.length}`);
      const tagsAll = v.match(/<[a-zA-Z][^>]*>/g) || [], self = tagsAll.filter((x) => x.endsWith('/>')).length, open = tagsAll.length - self, close = (v.match(/<\/[a-zA-Z]+>/g) || []).length;
      if (open !== close) fail(sw, `unbalanced tags open ${open} close ${close} self ${self}`);
    }
  }
  console.log(`${cat}: ${list.length} projets (facile ${lv[1]}, moyen ${lv[2]}, difficile ${lv[3]})`);
}
console.log(errors ? `FAIL ${errors} errors` : `OK ${total} projets, ${steps} étapes`);
process.exit(errors ? 1 : 0);
