// Test runner: starts the server on a free port with a throw-away DATA_DIR, runs the e2e smoke test, then stops it.
//   npm test            (Playwright Chromium must be installed: npx playwright install chromium)
// Env: CHROME=/path/to/chrome to use a specific browser binary; SHOTS=dir for screenshots (default /tmp/mb-shots).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = await new Promise((res) => { const s = net.createServer().listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
const data = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-test-'));
const env = { ...process.env, PORT: String(port), DATA_DIR: data, FAMILY_CODE: 'hop2027', VIEW_TOKEN: 'grandma', SESSION_SECRET: 'test-secret', BACKUP_TOKEN: 'test-backup-token-0123456789abcdef' };
delete env.ANTHROPIC_API_KEY;

const server = spawn(process.execPath, ['server/index.js'], { cwd: root, env, stdio: ['ignore', 'inherit', 'inherit'] });
let exited = false; server.on('exit', () => { exited = true; });
const base = `http://localhost:${port}`;
for (let i = 0; i < 60; i++) {
  if (exited) { console.error('server exited early'); process.exit(1); }
  try { if ((await fetch(base + '/healthz')).ok) break; } catch (_) {}
  await new Promise((r) => setTimeout(r, 250));
}

const run = (f) => new Promise((res) => spawn(process.execPath, [f], { cwd: root, env: { ...env, BASE: base, CODE: 'hop2027' }, stdio: 'inherit' }).on('exit', (c) => res(c || 0)));
let code = 0;
for (const f of ['test/smoke.mjs', 'test/backup.mjs']) code = code || await run(f);
server.kill(); fs.rmSync(data, { recursive: true, force: true }); process.exit(code);
