// Infrastructure checks: migrations + journal, storage adapters, /healthz with Postgres.
// Needs DATABASE_URL (a throw-away database — run.mjs creates one). S3 part runs when TEST_S3_ENDPOINT is set (MinIO).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { Pool } = require('pg');
const { migrate, readJournal } = require('../server/migrate.js');
const storage = require('../server/storage.js');

let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
const throws = async (fn, re) => { try { await fn(); return false; } catch (e) { return re.test(e.message); } };
console.log('infra');

// journal validation on a scratch copy
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-mig-'));
const copy = () => { fs.rmSync(tmp, { recursive: true, force: true }); fs.cpSync(path.resolve('migrations'), tmp, { recursive: true }); };
copy(); ok(readJournal(tmp).length >= 1, 'journal valid');
copy(); fs.writeFileSync(path.join(tmp, '0099_orphan.sql'), 'select 1;');
ok(await throws(() => readJournal(tmp), /not in journal\.json: 0099_orphan\.sql/), 'unjournaled file rejected');
copy(); {
  const j = JSON.parse(fs.readFileSync(path.join(tmp, 'journal.json'))), n = j.migrations.length;
  const gap = String(n + 2).padStart(4, '0');   // skips n+1
  j.migrations.push({ id: gap, file: `${gap}_gap.sql` }); fs.writeFileSync(path.join(tmp, 'journal.json'), JSON.stringify(j)); fs.writeFileSync(path.join(tmp, `${gap}_gap.sql`), 'select 1;');
  ok(await throws(() => readJournal(tmp), new RegExp(`expected ${String(n + 1).padStart(4, '0')}`)), 'numbering gap rejected');
}
copy(); fs.writeFileSync(path.join(tmp, '0002_Bad-Name.sql'), '');
ok(await throws(() => readJournal(tmp), /bad file name/), 'bad file name rejected');
fs.rmSync(tmp, { recursive: true, force: true });

// the service worker precaches every drawing, so kid mode and the passports open offline from the first visit
{
  const sw = fs.readFileSync(path.resolve('public/sw.js'), 'utf8');
  const listed = new Set([...sw.matchAll(/'(\/art\/[^']+)'/g)].map((m) => m[1]));
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
  const files = walk(path.resolve('public/art')).map((f) => '/' + path.relative(path.resolve('public'), f).split(path.sep).join('/'));
  const missing = files.filter((f) => !listed.has(f)), gone = [...listed].filter((f) => !files.includes(f));
  ok(!missing.length && !gone.length, `sw.js precaches all ${files.length} art files` + (missing.length ? ` — missing: ${missing.join(', ')}` : '') + (gone.length ? ` — not on disk: ${gone.join(', ')}` : ''));
  ok(/const V = 'mbs-v\d+'/.test(sw), 'sw.js has a cache version');
}

// the new-book scaffold (docs/NEW-BOOK.md) writes a complete format-2 seed that the seed loader accepts
{
  const { execFileSync } = await import('node:child_process');
  const seedPath = path.resolve('server/seeds/zz-scaffold-test.json');
  try {
    const log = execFileSync(process.execPath, ['scripts/new-book.mjs', '--slug=zz-scaffold-test', '--from=2028-03-10', '--to=2028-03-14', '--tz=Asia/Tokyo', '--title-th=ทดสอบ', '--title-en=Test', '--flag=🇯🇵'], { encoding: 'utf8' });
    const seed = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
    ok(seed.format === 2 && seed.days.length === 5 && seed.days[4].date === '2028-03-14' && seed.days[0].plan && seed.info.stays && seed.passport.countdown.doors.length === 14 && seed.passport.map && /checklist/.test(log), 'new-book scaffold: format 2, 5 dated days, plan/info/passport/countdown/map sections');
    ok(seed.children.find((c) => c.slug === 'mimi').age_at_trip.en.startsWith('4'), 'new-book scaffold: ages at the trip computed from birth months');
  } finally { fs.rmSync(seedPath, { force: true }); }
  for (const f of fs.readdirSync(path.resolve('server/seeds'))) { const s = JSON.parse(fs.readFileSync(path.resolve('server/seeds', f), 'utf8')); ok(s.format === 2, `${f} declares format 2`); }
}

// migrations against the real database
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const logs = [];
await migrate(pool, (m) => logs.push(m));
const n1 = (await pool.query('SELECT count(*)::int n FROM schema_migrations')).rows[0].n;
ok(n1 === readJournal().length, `all ${n1} migrations applied`);
await migrate(pool, (m) => logs.push('again ' + m));
ok(!logs.some((l) => l.startsWith('again')), 'second boot applies nothing (idempotent)');
const tables = (await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")).rows.map((r) => r.table_name);
ok(['families', 'children', 'trips', 'trip_days', 'firsts_catalog', 'entries', 'media', 'places'].every((t) => tables.includes(t)), 'bookshelf tables exist');
await pool.query("UPDATE schema_migrations SET sum='tampered' WHERE id='0001'");
ok(await throws(() => migrate(pool, () => {}), /was edited after it ran/), 'edited applied migration refused');
await pool.query('UPDATE schema_migrations SET sum=$1 WHERE id=$2', [readJournal()[0].sum, '0001']);
await pool.end();

// storage adapters
async function exercise(store, label) {
  await store.ping();
  const key = `test/${Date.now()}.jpg`, buf = Buffer.from('jpeg-bytes-' + label);
  await store.put(key, buf);
  ok(Buffer.compare(await store.get(key), buf) === 0, `${label}: put/get round trip`);
  await store.del(key);
  ok((await store.get(key)) === null, `${label}: deleted object reads as null`);
  ok(await throws(() => store.put('../escape.jpg', buf), /bad storage key/), `${label}: path traversal key rejected`);
}
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-media-'));
await exercise(storage.create({ DATA_DIR: dir }), 'fs');
fs.rmSync(dir, { recursive: true, force: true });
if (process.env.TEST_S3_ENDPOINT) {
  await exercise(storage.create({ BUCKET: process.env.TEST_S3_BUCKET || 'mb-test', ENDPOINT: process.env.TEST_S3_ENDPOINT, REGION: 'us-east-1', BUCKET_PATH_STYLE: '1',
    ACCESS_KEY_ID: process.env.TEST_S3_KEY || 'minioadmin', SECRET_ACCESS_KEY: process.env.TEST_S3_SECRET || 'minioadmin' }), 's3');
} else console.log('  skip  s3 adapter (TEST_S3_ENDPOINT not set)');

// running server: /healthz says ok with Postgres attached
if (process.env.BASE) ok((await (await fetch(process.env.BASE + '/healthz')).text()) === 'ok', '/healthz ok with Postgres + storage');

console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
