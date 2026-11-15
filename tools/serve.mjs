// Tiny static server. `node tools/serve.mjs [port]` — prints the URL to open on the iPad (same Wi-Fi).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { ttsConfig, ttsCached } from './tts.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.argv[2] || process.env.PORT || 5180);
const TYPES = { '.mp3': 'audio/mpeg', '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.md': 'text/plain' };

function printUrls(note = '') {
  console.log(`Petit Hibou${note}: http://localhost:${port}`);
  for (const list of Object.values(os.networkInterfaces()))
    for (const a of list) if (a.family === 'IPv4' && !a.internal && a.address.startsWith('192.168.')) console.log(`iPad (même Wi-Fi): http://${a.address}:${port}`);
}

const cacheDir = path.join(root, '.tts-cache');

const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  // Neural voice (Azure Speech) — the iPad falls back to its own voice when this is unavailable.
  if (u.pathname === '/tts/status') {
    res.writeHead(200, { 'content-type': 'application/json', 'cache-control': 'no-cache' }).end(JSON.stringify({ neural: !!ttsConfig() }));
    return;
  }
  if (u.pathname === '/tts') {
    const text = (u.searchParams.get('text') || '').slice(0, 1500);
    const lang = ['en-CA', 'zh-CN'].includes(u.searchParams.get('lang')) ? u.searchParams.get('lang') : 'fr-CA';
    const rate = Math.max(-50, Math.min(50, Number(u.searchParams.get('rate')) || 0));
    if (!text || !ttsConfig()) { res.writeHead(404).end(); return; }
    ttsCached(cacheDir, text, lang, rate)
      .then((buf) => res.writeHead(200, { 'content-type': 'audio/mpeg', 'cache-control': 'public, max-age=31536000' }).end(buf))
      .catch((e) => { console.log('tts:', e.message); res.writeHead(502).end(); });
    return;
  }
  let p = decodeURIComponent(u.pathname);
  if (p.split('/').some((seg) => seg.startsWith('.'))) { res.writeHead(403).end(); return; } // never serve .secrets / .tts-cache
  if (p.endsWith('/')) p += 'index.html';
  const file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404).end('not found'); return; }
    res.writeHead(200, { 'content-type': (TYPES[path.extname(file)] || 'application/octet-stream') + '; charset=utf-8', 'cache-control': 'no-cache' });
    res.end(data);
  });
});
server.on('error', (e) => {
  if (e.code !== 'EADDRINUSE') throw e;
  printUrls(' (déjà lancé / already running)');
  console.log(`Port ${port} est déjà utilisé — le jeu tourne déjà. Sinon: node tools/serve.mjs ${port + 1}`);
});
server.listen(port, '0.0.0.0', () => printUrls());
