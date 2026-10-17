// Backup → restore round trip. Run via `npm test` (after smoke.mjs seeded data). Needs BASE, CODE, BACKUP_TOKEN.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import yauzl from 'yauzl';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const { BASE, CODE, BACKUP_TOKEN } = process.env;
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
const login = async (base) => (await fetch(base + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: CODE, name: 'แม่' }) })).headers.get('set-cookie').split(';')[0];
const state = async (base, ck) => (await fetch(base + '/api/state', { headers: { cookie: ck } })).json();
const readBackupJson = (buf) => new Promise((res, rej) => yauzl.fromBuffer(buf, { lazyEntries: true }, (e, z) => {
  if (e) return rej(e);
  z.on('entry', (en) => {
    if (en.fileName !== 'backup.json') return z.readEntry();
    z.openReadStream(en, (e2, s) => { const p = []; s.on('data', (d) => p.push(d)); s.on('end', () => res(JSON.parse(Buffer.concat(p).toString('utf8')))); });
  });
  z.on('end', () => rej(new Error('backup.json not in zip'))); z.readEntry();
}));
const counts = (s) => [s.memories.length, s.memories.reduce((n, m) => n + m.photos.length, 0), s.checkins.length, s.stories.length, s.tripkid.length, s.letters.length].join('/');

console.log('backup / restore');
ok((await fetch(BASE + '/api/backup.zip')).status === 401, 'backup.zip without token → 401');
ok((await fetch(BASE + '/api/backup.zip', { headers: { authorization: 'Bearer wrong-token-wrong-token-wrong' } })).status === 401, 'backup.zip wrong token → 401');
const zip = Buffer.from(await (await fetch(BASE + '/api/backup.zip', { headers: { authorization: 'Bearer ' + BACKUP_TOKEN } })).arrayBuffer());
ok(zip.subarray(0, 2).toString() === 'PK' && zip.includes('backup.json'), `backup.zip downloaded (${(zip.length / 1e6).toFixed(1)} MB)`);

const ck = await login(BASE);   // a different editor than the letter's author
const src = await state(BASE, ck);
ok(src.letters.some((l) => l.text === null), 'source has a sealed letter hidden from this editor');
const exp = Buffer.from(await (await fetch(BASE + '/api/export.zip', { headers: { cookie: ck } })).arrayBuffer());
const sealedIds = src.letters.filter((l) => l.text === null).map((l) => l.id);
const [full, part] = [await readBackupJson(zip), await readBackupJson(exp)];
ok(full.complete && sealedIds.every((id) => full.tables.letters.some((l) => l.id === id && l.text)), 'backup.zip includes sealed letters with text');
ok(!part.complete && sealedIds.every((id) => !part.tables.letters.some((l) => l.id === id)), 'editor export.zip keeps other people\'s sealed letters out');
ok((await fetch(BASE + '/api/import', { method: 'POST', headers: { cookie: ck }, body: zip })).status === 400, 'import without x-mb header → 400');

// fresh server, restore into it
const port = await new Promise((res) => { const s = net.createServer().listen(0, () => { const p = s.address().port; s.close(() => res(p)); }); });
const data = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-restore-'));
const srv = spawn(process.execPath, ['server/index.js'], { cwd: root, env: { ...process.env, PORT: String(port), DATA_DIR: data, VIEW_TOKEN: 'grandma2' }, stdio: ['ignore', 'ignore', 'inherit'] });
const B2 = `http://localhost:${port}`;
try {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(B2 + '/healthz')).ok) break; } catch (_) {} await new Promise((r) => setTimeout(r, 250)); }
  const ck2 = await login(B2);
  const vck = (await fetch(B2 + '/v/grandma2', { redirect: 'manual' })).headers.get('set-cookie').split(';')[0];
  ok((await fetch(B2 + '/api/import', { method: 'POST', headers: { 'x-mb': '1', cookie: vck }, body: zip })).status === 403, 'viewer cannot import (403)');
  const r1 = await (await fetch(B2 + '/api/import', { method: 'POST', headers: { 'x-mb': '1', cookie: ck2, 'content-type': 'application/zip' }, body: zip })).json();
  ok(r1.ok && r1.photos > 0, `restore: ${r1.photos} photos, rows ${JSON.stringify(r1.rows)}`);
  const dst = await state(B2, ck2);
  ok(counts(dst) === counts(src), `restored counts match (${counts(dst)})`);
  const pid = dst.memories.find((m) => m.photos.length).photos[0].id;
  const [f, t] = await Promise.all([fetch(`${B2}/img/${pid}`, { headers: { cookie: ck2 } }), fetch(`${B2}/img/${pid}/t`, { headers: { cookie: ck2 } })]);
  ok(f.status === 200 && t.status === 200, 'restored full + regenerated thumbnail served');
  ok(fs.readdirSync(path.join(data, 'photos')).length === r1.photos, 'photo files on disk');
  const r2 = await (await fetch(B2 + '/api/import', { method: 'POST', headers: { 'x-mb': '1', cookie: ck2 }, body: zip })).json();
  ok(r2.photos === 0 && Object.values(r2.rows).every((n) => n === 0) && counts(await state(B2, ck2)) === counts(src), 'second import is a no-op (idempotent)');
  const bad = await fetch(B2 + '/api/import', { method: 'POST', headers: { 'x-mb': '1', cookie: ck2 }, body: Buffer.from('not a zip at all, just text padding padding padding padding padding') });
  ok(bad.status === 400 && (await fetch(B2 + '/healthz')).ok, 'garbage upload → 400, server still up');
  ok(!fs.existsSync(path.join(data, 'tmp')) || fs.readdirSync(path.join(data, 'tmp')).length === 0, 'temp upload files cleaned up');
} finally { srv.kill(); fs.rmSync(data, { recursive: true, force: true }); }
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
