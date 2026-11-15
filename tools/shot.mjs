// Headless, muted iPad-size screenshots via Edge/Chrome DevTools protocol (no extra packages).
// node tools/shot.mjs <outDir> <url> <steps.json>
//   steps: [{ "eval": "js expression (may be async)", "wait": 600, "shot": "name" }, ...]
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const [outDir, url, stepsFile] = process.argv.slice(2);
const steps = JSON.parse(fs.readFileSync(stepsFile, 'utf8'));
const W = Number(process.env.W || 1180), H = Number(process.env.H || 820);
const exe = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find((p) => fs.existsSync(p));
const port = 9300 + Math.floor(Math.random() * 500);
const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'hibou-shot-'));
const proc = spawn(exe, ['--headless=new', '--mute-audio', '--disable-gpu', '--no-first-run', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 50 && !target; i++) {
  await sleep(200);
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0; const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } else if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') console.log('console.error', JSON.stringify(d.params.args.map((a) => a.value ?? a.description))); else if (d.method === 'Runtime.exceptionThrown') console.log('EXCEPTION', d.params.exceptionDetails.exception?.description ?? d.params.exceptionDetails.text); };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });

await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
await send('Page.enable');
await send('Page.navigate', { url });
await sleep(1500);
fs.mkdirSync(outDir, { recursive: true });
for (const s of steps) {
  if (s.eval) {
    const r = await send('Runtime.evaluate', { expression: `(async()=>{ ${s.eval} })()`, awaitPromise: true, returnByValue: true });
    const v = r.result?.result?.value ?? r.result?.exceptionDetails?.exception?.description;
    if (v !== undefined) console.log('eval:', typeof v === 'string' ? v : JSON.stringify(v));
  }
  await sleep(s.wait ?? 500);
  if (s.shot) {
    const r = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, s.shot + '.png'), Buffer.from(r.result.data, 'base64'));
    console.log('shot', s.shot);
  }
}
ws.close(); proc.kill();
await sleep(300);
try { fs.rmSync(prof, { recursive: true, force: true }); } catch {}
