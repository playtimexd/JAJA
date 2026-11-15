// `node tools/vo-prune.mjs` — removes recorded clips whose sentence no longer exists in the content (after text rewrites).
import fs from 'node:fs';
import path from 'node:path';
import { collect } from './voice-texts.mjs';
const dir = path.resolve('audio/vo');
const keep = new Set((await collect()).keys());
const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'index.json'), 'utf8'));
let removed = 0;
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.mp3')) continue;
  const k = f.slice(0, -4);
  if (!keep.has(k)) { fs.unlinkSync(path.join(dir, f)); delete manifest[k]; removed++; }
}
fs.writeFileSync(path.join(dir, 'index.json'), JSON.stringify(manifest));
console.log(`removed ${removed} old clips, ${Object.keys(manifest).length} left`);
