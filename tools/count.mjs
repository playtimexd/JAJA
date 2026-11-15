// `node tools/count.mjs [subject...]` — counts distinct questions per unit × level (no audio, no window).
import { makeRng } from '../js/util.js';
const subs = process.argv.slice(2).length ? process.argv.slice(2) : ['math', 'francais', 'anglais'];
for (const s of subs) {
  const mod = await import(`../js/content/${s}.js`);
  const units = mod.default?.units || mod.units;
  let tot = 0;
  for (const u of units) {
    const row = [];
    for (const L of [1, 2, 3]) {
      const R = makeRng(99 + L), set = new Set();
      for (let i = 0; i < 20000; i++) { const q = { ...u.generate(L, R) }; delete q.id; set.add(JSON.stringify(q)); }
      row.push(set.size); tot += set.size;
    }
    console.log(`${u.id.padEnd(4)} ${row.map((n) => String(n).padStart(6)).join(' ')}  ${u.title?.fr ?? ''}`);
  }
  console.log(`${s} TOTAL ${tot}\n`);
}
