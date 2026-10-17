// Test runner: starts the server on a free port with a throw-away DATA_DIR (+ a throw-away Postgres database), runs the suites, then stops it.
//   npm test            (Playwright Chromium must be installed: npx playwright install chromium)
// Env: TEST_DATABASE_URL=postgres://user:pass@host:5432/postgres (admin connection; a temp database is created and dropped).
//      TEST_S3_ENDPOINT=http://localhost:9000 to also test the S3 adapter against MinIO.
//      CHROME=/path/to/chrome to use a specific browser binary; SHOTS=dir for screenshots (default /tmp/mb-shots).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = await new Promise((res) => { const s = net.createServer().listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
const data = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-test-'));
const env = { ...process.env, PORT: String(port), DATA_DIR: data, FAMILY_CODE: 'hop2027', VIEW_TOKEN: 'grandma', SESSION_SECRET: 'test-secret', BACKUP_TOKEN: 'test-backup-token-0123456789abcdef' };
delete env.ANTHROPIC_API_KEY; delete env.BUCKET; delete env.DATABASE_URL;

// throw-away database
let admin, dbName;
if (process.env.TEST_DATABASE_URL) {
  const { Client } = createRequire(import.meta.url)('pg');
  admin = new Client({ connectionString: process.env.TEST_DATABASE_URL });
  await admin.connect();
  dbName = 'mb_test_' + Date.now().toString(36);
  await admin.query(`CREATE DATABASE ${dbName}`);
  const u = new URL(process.env.TEST_DATABASE_URL); u.pathname = '/' + dbName;
  env.DATABASE_URL = u.toString();
} else console.log('TEST_DATABASE_URL not set — Postgres tests skipped');

const server = spawn(process.execPath, ['server/index.js'], { cwd: root, env, stdio: ['ignore', 'inherit', 'inherit'] });
let exited = false; server.on('exit', () => { exited = true; });
const base = `http://localhost:${port}`;
for (let i = 0; i < 60; i++) {
  if (exited) { console.error('server exited early'); process.exit(1); }
  try { if ((await fetch(base + '/healthz')).ok) break; } catch (_) {}
  await new Promise((r) => setTimeout(r, 250));
}

const run = (f) => new Promise((res) => spawn(process.execPath, [f], { cwd: root, env: { ...env, BASE: base, CODE: 'hop2027' }, stdio: 'inherit' }).on('exit', (c) => res(c || 0)));
const suites = ['test/smoke.mjs', 'test/backup.mjs'];
if (env.DATABASE_URL) suites.unshift('test/infra.mjs');
let code = 0;
for (const f of suites) code = code || await run(f);
server.kill();
await new Promise((r) => (exited ? r() : server.on('exit', r)));
fs.rmSync(data, { recursive: true, force: true });
if (admin) { await admin.query(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`); await admin.end(); }
process.exit(code);
