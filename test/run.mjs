// Test runner: each group gets a throw-away Postgres database + DATA_DIR + server on a free port; suites in a group share them.
//   TEST_DATABASE_URL=postgres://postgres:pg@localhost:5432/postgres npm test     (admin connection; temp databases are created and dropped)
// Env: TEST_S3_ENDPOINT=http://localhost:4569 (+ TEST_S3_KEY/SECRET) also tests the S3 adapter (s3rver / MinIO).
//      CHROME=/path/to/chrome to use a specific browser; SHOTS=dir for screenshots (default /tmp/mb-shots).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (!process.env.TEST_DATABASE_URL) { console.error('TEST_DATABASE_URL is required (Postgres) — see CLAUDE.md'); process.exit(1); }
const { Client } = createRequire(import.meta.url)('pg');
const admin = new Client({ connectionString: process.env.TEST_DATABASE_URL });
await admin.connect();

const GROUPS = [['test/infra.mjs'], ['test/bookshelf.mjs', 'test/push.mjs'], ['test/import.mjs'], ['test/story.mjs'], ['test/weather.mjs'], ['test/auth.mjs'], ['test/ui.mjs', 'test/backup.mjs']]
  .filter((g) => !process.env.TEST_ONLY || g.some((f) => f.includes(process.env.TEST_ONLY)));   // e.g. TEST_ONLY=ui
const freePort = () => new Promise((res) => { const s = net.createServer().listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });

async function group(suites) {
  const dbName = 'mb_test_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  await admin.query(`CREATE DATABASE ${dbName}`);
  const u = new URL(process.env.TEST_DATABASE_URL); u.pathname = '/' + dbName;
  const data = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-test-'));
  const port = await freePort();
  const env = { ...process.env, PORT: String(port), DATA_DIR: data, DATABASE_URL: u.toString(), FAMILY_CODE: '271205', VIEW_TOKEN: 'grandma', VIEW_PIN: '835911', SESSION_SECRET: 'test-secret', BACKUP_TOKEN: 'test-backup-token-0123456789abcdef\n ' };
  delete env.ANTHROPIC_API_KEY; delete env.BUCKET;
  // server-side PDF: use Playwright's browser when installed, else the sandbox's preinstalled Chromium
  const { chromium } = createRequire(import.meta.url)('playwright-core');
  if (!env.CHROMIUM_PATH && !fs.existsSync(chromium.executablePath())) env.CHROMIUM_PATH = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
  const server = spawn(process.execPath, ['server/index.js'], { cwd: root, env, stdio: ['ignore', 'inherit', 'inherit'] });
  let exited = false; server.on('exit', () => { exited = true; });
  const base = `http://localhost:${port}`;
  let code = 0;
  try {
    for (let i = 0; i < 80; i++) {
      if (exited) throw new Error('server exited early');
      try { if ((await fetch(base + '/healthz')).ok) break; } catch (_) {}
      await new Promise((r) => setTimeout(r, 250));
    }
    for (const f of suites) {
      code = await new Promise((res) => spawn(process.execPath, [f], { cwd: root, env: { ...env, BASE: base, CODE: '271205' }, stdio: 'inherit' }).on('exit', (c) => res(c || 0)));
      if (code) break;
    }
  } catch (e) { console.error(e.message); code = 1; }
  server.kill();
  await new Promise((r) => (exited ? r() : server.on('exit', r)));
  fs.rmSync(data, { recursive: true, force: true });
  await admin.query(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`);
  return code;
}

let code = 0;
for (const g of GROUPS) { code = await group(g); if (code) break; }
await admin.end();
process.exit(code);
