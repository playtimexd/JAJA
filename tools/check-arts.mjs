// `node tools/check-arts.mjs [cat...]` — validates the Arts plastiques library (docs/ARTS.md).
import fs from 'node:fs';
const CATS = process.argv.slice(2).length ? process.argv.slice(2) : ['dessin', 'dessin2', 'dessin3', 'pliage', 'recup', 'fetes'];
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
  const base = cat.replace(/\d+$/, '');   // dessin2.js holds more 'dessin' projects
  const lv = [0, 0, 0, 0];
  for (const p of list) {
    const w = `${cat}/${p.id}`;
    total++;
    if (!p.id?.startsWith(base + '-')) fail(w, 'id must start with ' + base + '-');
    if (ids.has(p.id)) fail(w, 'duplicate id'); ids.add(p.id);
    if (p.cat !== base) fail(w, 'cat mismatch');
    if (!p.emoji) fail(w, 'emoji');
    if (!txt(p.title)) fail(w, 'title');
    if (![1, 2, 3].includes(p.level)) fail(w, 'level'); else lv[p.level]++;
    if (!(p.minutes > 0)) fail(w, 'minutes');
    if (!Array.isArray(p.materials) || !p.materials.length || !p.materials.every(txt)) fail(w, 'materials');
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
      if (v.length > (p.theme === 'scene' ? 16000 : 6000)) fail(sw, `svg too big ${v.length}`);
      const open = (v.match(/<(?!\/)(?!\?)[a-zA-Z]+[^>]*[^/]>/g) || []).length, self = (v.match(/<[a-zA-Z][^>]*\/>/g) || []).length, close = (v.match(/<\/[a-zA-Z]+>/g) || []).length;
      if (open !== close) fail(sw, `unbalanced tags open ${open} close ${close} self ${self}`);
    }
  }
  console.log(`${cat}: ${list.length} projets (facile ${lv[1]}, moyen ${lv[2]}, difficile ${lv[3]})`);
}
console.log(errors ? `FAIL ${errors} errors` : `OK ${total} projets, ${steps} étapes`);
process.exit(errors ? 1 : 0);
