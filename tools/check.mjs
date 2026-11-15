// Content validator: `node tools/check.mjs` — generates every unit × level many times and checks the schema.
import { makeRng } from '../js/util.js';

const subjects = process.argv[2] ? process.argv.slice(2) : ['math', 'francais', 'anglais', 'francais4'];
const N = 400;
let errors = 0, total = 0;
const txt = (x) => (x && typeof x === 'object' ? `${x.fr}|${x.en}` : String(x ?? ''));
const fail = (where, msg, q) => { if (errors++ < 40) console.log(`✗ ${where}: ${msg}\n   ${String(JSON.stringify(q) ?? "").slice(0, 220)}`); };

for (const s of subjects) {
  let mod;
  try { mod = await import(`../js/content/${s}.js`); } catch (e) { console.log(`– ${s}: not loadable (${e.message})`); errors++; continue; }
  const ids = new Set();
  for (const u of mod.units) {
    if (ids.has(u.id)) fail(u.id, 'duplicate unit id'); ids.add(u.id);
    if (!u.title?.fr || !u.title?.en || !u.icon || !u.pfeq) fail(u.id, 'missing title/icon/pfeq', u);
    const counts = [];
    for (const level of [1, 2, 3]) {
      const R = makeRng(1234 + level), keys = new Set();
      for (let i = 0; i < N; i++) {
        total++;
        const where = `${s}/${u.id}/L${level}`;
        let q;
        try { q = u.generate(level, R); } catch (e) { fail(where, 'throws ' + e.message); break; }
        if (typeof q.key !== 'string' || !q.key) fail(where, 'bad key', q);
        keys.add(q.key);
        if (!q.prompt) fail(where, 'no prompt', q);
        switch (q.type) {
          case 'choice': {
            if (!Array.isArray(q.options) || q.options.length < 2) { fail(where, 'options', q); break; }
            if (!(q.answer >= 0 && q.answer < q.options.length)) fail(where, 'answer index', q);
            const labels = q.options.map((o) => txt(o.text) + (o.emoji || '') + (o.svg || '') + (o.hz || '') + (o.hz ? '' : o.py || ''));
            if (new Set(labels).size !== labels.length) fail(where, 'duplicate options', q);
            if (q.options.some((o) => !o.text && !o.emoji && !o.svg && !o.hz && !o.py && o.text !== 0)) fail(where, 'empty option', q);
            for (const o of q.options) if (o.hz && o.py && !pyOk(o.hz, o.py)) fail(where, 'pinyin syllables ≠ characters', o);
            if (q.stimulus?.hz && q.stimulus.py && !pyOk(q.stimulus.hz, q.stimulus.py)) fail(where, 'stimulus pinyin ≠ characters', q.stimulus);
            break;
          }
          case 'sort':
            if (!(q.bins?.length >= 2 && q.bins.length <= 3)) fail(where, 'bins', q);
            if (!(q.items?.length >= 2)) fail(where, 'items', q);
            if (q.items?.some((it) => !(it.bin >= 0 && it.bin < q.bins.length))) fail(where, 'item bin', q);
            break;
          case 'order':
            if (!(q.tiles?.length >= 2) || q.tiles.some((x) => !(x?.hz || txt(x)))) fail(where, 'tiles', q);
            if (q.tiles?.some((x) => x?.hz && x.py && !pyOk(x.hz, x.py))) fail(where, 'tile pinyin ≠ characters', q);
            break;
          case 'keypad':
            if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 9999) fail(where, 'keypad answer', q);
            break;
          case 'base10':
            if (!Number.isInteger(q.answer) || q.answer < 1 || q.answer > 999) fail(where, 'base10 answer', q);
            break;
          case 'numberline':
            if ((q.answer - q.min) % q.step || q.answer < q.min || q.answer > q.max) fail(where, 'numberline answer', q);
            break;
          case 'write':
            if (typeof q.char !== 'string' || [...q.char].length !== 1 || !/\p{Script=Han}/u.test(q.char) || !q.py) fail(where, 'write needs one Han char + py', q);
            break;
          case 'hand':
            if (!['fr', 'en', 'zh'].includes(q.lang)) fail(where, 'hand lang', q);
            if (!['dictation', 'answer', 'sentence', 'composition'].includes(q.mode)) fail(where, 'hand mode', q);
            if (q.mode === 'dictation' && (!q.expected || !q.say?.text)) fail(where, 'dictation needs expected + say', q);
            if (q.say && (!q.say.text || !q.say.lang)) fail(where, 'say shape', q);
            if (q.stimulus?.hz && q.stimulus.py && !pyOk(q.stimulus.hz, q.stimulus.py)) fail(where, 'stimulus pinyin ≠ characters', q.stimulus);
            break;
          case 'hand': {
            if (!['fr', 'en'].includes(q.lang)) fail(where, 'hand lang', q);
            if (!['dictation', 'answer', 'sentence', 'composition'].includes(q.mode)) { fail(where, 'hand mode', q); break; }
            if (q.mode === 'dictation' && !(q.expected && q.say?.text && q.say?.lang)) fail(where, 'dictation needs expected + say', q);
            if (q.mode === 'answer' && !(q.answerKey && q.stimulus?.text)) fail(where, 'answer needs answerKey + stimulus.text', q);
            if ((q.mode === 'sentence' || q.mode === 'composition') && !(q.minWords > 0)) fail(where, 'needs minWords', q);
            if (q.lines != null && !(q.lines >= 1 && q.lines <= 8)) fail(where, 'lines 1–8', q);
            break;
          }
          default: fail(where, 'unknown type ' + q.type, q);
        }
      }
      counts.push(keys.size);
      if (keys.size < 10) fail(`${s}/${u.id}/L${level}`, `only ${keys.size} distinct questions`);
    }
    console.log(`  ${s.padEnd(9)} ${u.id.padEnd(4)} ${u.icon} distinct L1/L2/L3 = ${counts.join(' / ')}`);
  }
}
function pyOk(hz, py) { return [...hz].filter((c) => /\p{Script=Han}/u.test(c)).length === py.trim().split(/\s+/).length; }
console.log(errors ? `FAIL: ${errors} problem(s) in ${total} questions` : `PASS: ${total} questions OK`);
process.exit(errors ? 1 : 0);
