// Backup → restore round trip on the data the UI test created. Restores into a fresh server with its own database.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import yauzl from 'yauzl';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { BASE, CODE, BACKUP_TOKEN } = process.env;
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
const login = async (base) => (await fetch(base + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: CODE, name: 'พ่อ' }) })).headers.get('set-cookie').split(';')[0];
const state = async (base, ck) => (await fetch(base + '/api/b/state', { headers: { cookie: ck } })).json();
const counts = (s) => [s.entries.length, s.media.length, s.places.length, s.trips.length, s.trips.flatMap((t) => t.days).filter((d) => d.done_at).length].join('/');
const zipList = (buf) => new Promise((res, rej) => yauzl.fromBuffer(buf, { lazyEntries: true }, (e, z) => {
  if (e) return rej(e);
  const names = []; let json = null;
  z.on('entry', (en) => {
    names.push(en.fileName);
    if (en.fileName !== 'backup.json') return z.readEntry();
    z.openReadStream(en, (e2, s) => { const p = []; s.on('data', (d) => p.push(d)); s.on('end', () => { json = JSON.parse(Buffer.concat(p).toString('utf8')); z.readEntry(); }); });
  });
  z.on('end', () => res({ names, json })); z.readEntry();
}));

console.log('backup / restore');
ok((await fetch(BASE + '/api/backup.zip')).status === 401, 'backup.zip without token → 401');
ok((await fetch(BASE + '/api/backup.zip', { headers: { authorization: 'Bearer wrong-token-wrong-token-wrong' } })).status === 401, 'backup.zip wrong token → 401');
const zip = Buffer.from(await (await fetch(BASE + '/api/backup.zip', { headers: { authorization: 'Bearer ' + BACKUP_TOKEN } })).arrayBuffer());
const ck = await login(BASE), src = await state(BASE, ck);
const { names, json } = await zipList(zip);
ok(json.complete && json.tables.entries.length === src.entries.length, `backup.zip: all ${src.entries.length} entries`);
ok(names.filter((n) => n.startsWith('photos/')).length === src.media.length && src.media.length >= 3, `backup.zip: all ${src.media.length} full-size photos`);
const vck = (await fetch(BASE + '/v/grandma', { redirect: 'manual' })).headers.get('set-cookie').split(';')[0];
ok((await fetch(BASE + '/api/export.zip', { headers: { cookie: vck } })).status === 403, 'viewer cannot download the export');
ok((await zipList(Buffer.from(await (await fetch(BASE + '/api/export.zip', { headers: { cookie: ck } })).arrayBuffer()))).json.complete, 'editor export.zip = complete backup');

// fresh server + database, restore into it
const { Client } = createRequire(import.meta.url)('pg');
const admin = new Client({ connectionString: process.env.TEST_DATABASE_URL }); await admin.connect();
const dbName = 'mb_restore_' + Date.now().toString(36); await admin.query(`CREATE DATABASE ${dbName}`);
const u = new URL(process.env.TEST_DATABASE_URL); u.pathname = '/' + dbName;
const port = await new Promise((res) => { const s = net.createServer().listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
const data = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-restore-'));
const srv = spawn(process.execPath, ['server/index.js'], { cwd: root, env: { ...process.env, PORT: String(port), DATA_DIR: data, DATABASE_URL: u.toString(), VIEW_TOKEN: 'grandma2' }, stdio: ['ignore', 'ignore', 'inherit'] });
const B2 = `http://localhost:${port}`;
try {
  for (let i = 0; i < 80; i++) { try { if ((await fetch(B2 + '/healthz')).ok) break; } catch (_) {} await new Promise((r) => setTimeout(r, 250)); }
  const ck2 = await login(B2);
  const v2 = (await fetch(B2 + '/v/grandma2', { redirect: 'manual' })).headers.get('set-cookie').split(';')[0];
  ok((await fetch(B2 + '/api/import', { method: 'POST', headers: { 'x-mb': '1', cookie: v2 }, body: zip })).status === 403, 'viewer cannot import (403)');
  ok((await fetch(B2 + '/api/import', { method: 'POST', headers: { cookie: ck2 }, body: zip })).status === 400, 'import without x-mb header → 400');
  const r1 = await (await fetch(B2 + '/api/import', { method: 'POST', headers: { 'x-mb': '1', cookie: ck2, 'content-type': 'application/zip' }, body: zip })).json();
  ok(r1.ok && r1.photos === src.media.length, `restore: ${r1.photos} photos, rows ${JSON.stringify(r1.rows)}`);
  const dst = await state(B2, ck2);
  ok(counts(dst) === counts(src), `restored counts match: entries/photos/places/trips/done = ${counts(dst)}`);
  ok(JSON.stringify(dst.entries.map((e) => [e.id, e.text, e.highlight]).sort()) === JSON.stringify(src.entries.map((e) => [e.id, e.text, e.highlight]).sort()), 'restored entries identical (text, ⭐)');
  const pid = dst.media[0].id;
  const [f, t] = await Promise.all([fetch(`${B2}/media/${pid}`, { headers: { cookie: ck2 } }), fetch(`${B2}/media/${pid}/t`, { headers: { cookie: ck2 } })]);
  ok(f.status === 200 && t.status === 200, 'restored photo + regenerated thumbnail served');
  const r2 = await (await fetch(B2 + '/api/import', { method: 'POST', headers: { 'x-mb': '1', cookie: ck2 }, body: zip })).json();
  ok(r2.photos === 0 && Object.values(r2.rows).every((n) => n === 0) && counts(await state(B2, ck2)) === counts(src), 'second import is a no-op (idempotent)');
  const bad = await fetch(B2 + '/api/import', { method: 'POST', headers: { 'x-mb': '1', cookie: ck2 }, body: Buffer.from('not a zip at all, just text padding padding padding padding padding') });
  ok(bad.status === 400 && (await fetch(B2 + '/healthz')).ok, 'garbage upload → 400, server still up');
  ok(!fs.existsSync(path.join(data, 'tmp')) || fs.readdirSync(path.join(data, 'tmp')).length === 0, 'temp upload files cleaned up');
} finally {
  srv.kill(); await new Promise((r) => srv.on('exit', r));
  fs.rmSync(data, { recursive: true, force: true });
  await admin.query(`DROP DATABASE IF EXISTS ${dbName} WITH (FORCE)`); await admin.end();
}
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
