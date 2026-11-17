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
const sharp = require('sharp');

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

// every button the pages draw has an action behind it (data-a="x" → A.x in sheets.js / kid.js)
{
  const src = ['core', 'views', 'sheets', 'kid', 'snap'].map((f) => fs.readFileSync(path.resolve(`public/${f}.js`), 'utf8')).join('\n') + fs.readFileSync(path.resolve('public/index.html'), 'utf8');
  const acts = new Set([...src.matchAll(/data-a="([a-z-]+)"/g)].map((m) => m[1]));
  const defined = (a) => new RegExp(`^\\s+(?:async\\s+)?(?:'${a}'|${a.replace(/-/g, '_')})\\s*\\(`, 'm').test(src) || new RegExp(`['"]${a}['"]\\s*[:(]`).test(src);
  const missing = [...acts].filter((a) => !defined(a));
  ok(acts.size > 40 && !missing.length, `every data-a has a handler (${acts.size})` + (missing.length ? ` — missing: ${missing.join(', ')}` : ''));
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

// plan → book (docs/PLAN-TO-BOOK.md): the sample plan becomes a format-2 seed the loader accepts; private data is refused; every shipped seed passes --check
{
  const { execFileSync, spawnSync } = await import('node:child_process');
  const { syncSeeds } = require('../server/bookshelf.js');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-plan-')), out = path.join(dir, 'sakura-hop-2028.json');
  try {
    const log = execFileSync(process.execPath, ['scripts/plan-to-seed.mjs', 'docs/handoff/plan.sample.json', `--out=${out}`], { encoding: 'utf8' });
    const seed = JSON.parse(fs.readFileSync(out, 'utf8'));
    const d0 = seed.days[0], keys = seed.days.flatMap((d) => d.planned.map((s) => s.key));
    ok(seed.days[0].plan[0].h && seed.days[0].plan[0].h.en === '🛬 Hello Tokyo!' && seed.format === 2 && seed.days.length === 3 && seed.days[2].date === '2028-03-12' && d0.index === 0 && d0.planned[1].key === 'ueno-park' && d0.planned[1].q === 'Ueno Park, Tokyo' && d0.planned[0].key === 'hnd' && new Set(keys).size === keys.length, 'plan → seed: dated days, stop keys derived and unique, default Maps query');
    ok(seed.theme.accent === '#B8456B' && seed.theme.art === '/art/sakura-hop-2028/day-{n}.svg' && seed.children.length === 2 && seed.children[0].age_at_trip.en === '4' && seed.days[2].sleep.en === 'Home' && seed.days[1].stay && seed.info.stays.length === 1 && seed.info.stays[0].n === 2 && seed.info.restaurants.groups.length === 1, 'plan → seed: theme tokens, ages, Home day, stays built from the stay cards, restaurants');
    const pp = seed.passport;
    ok(pp.days.length === 3 && pp.days[0].spot.length === 4 && pp.days[0].stamp === 'BKK → HND' && pp.countdown.doors.length === 14 && pp.countdown.doors[0].e === '🌸' && pp.countdown.doors[13].e === '🚀' && pp.lists.map((l) => l.key).join() === 'words,food,master' && pp.lists[2].groups[0].items.length === 7 && pp.map.stops.length === 3 && pp.pins.items.length === 3 && /privacy: clean/.test(log) && /TODO left/.test(log), 'plan → seed: missions, 14 doors (plan\'s first, generic rest), words/food/master lists, map, pins, report');
    await syncSeeds(pool, dir);
    const rows = (await pool.query("SELECT (SELECT count(*)::int FROM trip_days WHERE trip_id='sakura-hop-2028') AS days, (SELECT info->'restaurants'->'groups'->0->'items'->0->>'name' FROM trips WHERE id='sakura-hop-2028') AS r, (SELECT plan->'legs'->0->>'to' FROM trip_days WHERE trip_id='sakura-hop-2028' AND day_index=0) AS leg")).rows[0];
    ok(rows.days === 3 && /Ramen/.test(rows.r) && rows.leg === 'Ueno', 'the seed loader accepts the converted book (days, restaurants, legs in trip_days.plan)');
    const bad = JSON.parse(fs.readFileSync(path.resolve('docs/handoff/plan.sample.json'), 'utf8'));
    bad.days[0].tips.push({ th: 'เลขจอง QX7P2K', en: 'Booking ref QX7P2K' }); bad.info.lost = { th: 'โทรแม่ 081-234-5678', en: 'Call mum on 081-234-5678' };
    fs.writeFileSync(path.join(dir, 'bad.json'), JSON.stringify(bad));
    const r = spawnSync(process.execPath, ['scripts/plan-to-seed.mjs', path.join(dir, 'bad.json'), `--out=${path.join(dir, 'bad-seed.json')}`], { encoding: 'utf8' });
    ok(r.status === 2 && /PRIVACY: \d+ hit/.test(r.stdout) && /booking reference/.test(r.stdout) && /Thai mobile/.test(r.stdout) && !fs.existsSync(path.join(dir, 'bad-seed.json')), 'a plan with a booking reference or a personal mobile is refused, nothing written');
    const sample = JSON.parse(fs.readFileSync(path.resolve('docs/handoff/plan.sample.json'), 'utf8'));
    fs.writeFileSync(path.join(dir, 'short.json'), JSON.stringify({ ...sample, days: sample.days.slice(0, 2) }));
    const r2 = spawnSync(process.execPath, ['scripts/plan-to-seed.mjs', path.join(dir, 'short.json'), `--out=${path.join(dir, 'short-seed.json')}`], { encoding: 'utf8' });
    ok(r2.status === 1 && /days: 2 given, 3 dates/.test(r2.stdout), 'a plan with fewer days than dates is not valid');
    fs.writeFileSync(path.join(dir, 'tz.json'), JSON.stringify({ ...sample, tz: 'Pacific/Sidney' }));
    const rtz = spawnSync(process.execPath, ['scripts/plan-to-seed.mjs', path.join(dir, 'tz.json'), `--out=${path.join(dir, 'tz-seed.json')}`], { encoding: 'utf8' });
    ok(rtz.status === 1 && /not a timezone the platform knows/.test(rtz.stdout) && !fs.existsSync(path.join(dir, 'tz-seed.json')), 'a plan whose timezone the platform does not know is refused (reminders would throw)');
    // the Thai check (owner's rule): English-only titles and the เช็ค spelling are named, never refused
    const eng = JSON.parse(JSON.stringify(sample)); eng.title.th = 'Tokyo'; eng.days[1].title.th = 'Sumida Aquarium'; eng.days[0].plan[0].h.th = '🛬 Haneda'; eng.days[0].tips.push({ th: 'เช็คอินตอนบ่าย', en: 'Check in in the afternoon' });
    fs.writeFileSync(path.join(dir, 'eng.json'), JSON.stringify(eng));
    const r3 = spawnSync(process.execPath, ['scripts/plan-to-seed.mjs', path.join(dir, 'eng.json'), `--out=${path.join(dir, 'eng-seed.json')}`], { encoding: 'utf8' });
    ok(r3.status === 0 && /title\.th "Tokyo" has no Thai/.test(r3.stdout) && /days\[1\]\.title\.th "Sumida Aquarium" has no Thai/.test(r3.stdout) && /days\[0\]\.plan\[0\]\.h\.th "🛬 Haneda" has no Thai/.test(r3.stdout) && /1 × "เช็ค"/.test(r3.stdout) && fs.existsSync(path.join(dir, 'eng-seed.json')),
      `plan-to-seed warns about a title, a day title or a headline with no Thai letters and about the เช็ค spelling, and still writes the book (${r3.stdout.split('\n').filter((l) => /warn/.test(l)).join(' | ')})`);
    // the rest of docs/STYLE.md §7: headline shape, British spelling, spacing, times/prices that agree, kids' lines, children's names in Thai
    const sty = JSON.parse(JSON.stringify(sample));
    sty.days[0].plan[1].h = { th: 'เช็กอิน พักแป๊บ', en: '🏨 A very long headline with far too many words' };
    sty.days[0].plan[2].h = { th: '🛝 สนามเด็กเล่น (ริมบึง) · ใหญ่', en: '🛝 Playground by the pond' };
    sty.days[0].tips.push({ th: 'ร้านเปิด 10:00 ราคา ¥800', en: 'Opens 11:00, ¥900 — the favorite  colors of the center' });
    sty.days[0].tips.push({ th: 'ของ Mimi เก็บไว้ในกระเป๋า', en: "Mimi's things in the bag" });
    fs.writeFileSync(path.join(dir, 'sty.json'), JSON.stringify(sty));
    const r4 = spawnSync(process.execPath, ['scripts/plan-to-seed.mjs', path.join(dir, 'sty.json'), `--out=${path.join(dir, 'sty-seed.json')}`], { encoding: 'utf8' });
    const w4 = r4.stdout.split('\n').filter((l) => /warn/.test(l)).join(' | ');
    ok(r4.status === 0 && /h\.th "เช็กอิน พักแป๊บ" — a headline starts with one emoji/.test(w4) && /9 words; a headline is 6 at most/.test(w4) && /no " · " or brackets in a headline/.test(w4)
      && /American spelling "favorite"/.test(w4) && /a double space/.test(w4) && /the times differ: th \[10:00\] en \[11:00\]/.test(w4) && /the prices differ/.test(w4) && /a child's name in Latin script/.test(w4),
      `plan-to-seed names a headline without its emoji, too long or with brackets, an American spelling, a double space, times and prices that differ between the languages, a child's name in Latin script in Thai (${w4.slice(0, 600)})`);
    // docs/STYLE.md §7.1 (the template for the next books): the full report reads on its own
    const rep = JSON.parse(JSON.stringify(sample));
    rep.days[0].tips.push({ th: 'การ์ดอยู่ใน Part 11 · ไป Day 3 ใช้เวลา 1 ชม. 00 นาที', en: 'The card is in Part 11 · Day 3 takes 1 h 00' });
    rep.info.more = [{ page: 'sos', title: { th: 'บัตรฉุกเฉิน', en: 'Emergency card' }, rows: [{ t: { th: 'ก', en: 'a' }, x: { th: '1', en: '1' } }] }];
    rep.days[0].eat = [{ name: 'Test Café', pr: '$$ · mains A$22–32' }, { name: 'Cheap Eats', pr: '$ · A$10–20' }];   // words in one language → warn; money only → fine
    fs.writeFileSync(path.join(dir, 'rep.json'), JSON.stringify(rep));
    const r5 = spawnSync(process.execPath, ['scripts/plan-to-seed.mjs', path.join(dir, 'rep.json'), `--out=${path.join(dir, 'rep-seed.json')}`], { encoding: 'utf8' });
    const w5 = r5.stdout.split('\n').filter((l) => /warn/.test(l)).join(' | ');
    ok(r5.status === 0 && /"Part 11" refers to the paper manual/.test(w5) && /"Day 3" in Thai text/.test(w5) && /a duration with ":00"/.test(w5) && /the app builds this section itself/.test(w5)
      && /"\$\$ · mains A\$22–32" — a price with words in one language/.test(w5) && !/"\$ · A\$10–20"/.test(w5),
      `plan-to-seed names a paper-manual reference, "Day N" in Thai, a ":00" duration, a chapter that repeats the emergency card and a price with words in one language (${w5.slice(0, 600)})`);
    for (const f of fs.readdirSync(path.resolve('server/seeds'))) {
      const c = spawnSync(process.execPath, ['scripts/plan-to-seed.mjs', '--check', path.resolve('server/seeds', f)], { encoding: 'utf8' });
      const rows = JSON.parse(fs.readFileSync(path.resolve('server/seeds', f), 'utf8')).days.flatMap((d) => d.plan || []), noH = rows.filter((r) => !(r.h && r.h.th && r.h.en && /^\p{Extended_Pictographic}/u.test(r.h.en) && !r.h.en.includes(' · ')));
      ok(rows.length > 0 && noH.length === 0, `${f}: every timeline step has its own short headline h (emoji first) for the Today page${noH.length ? ' — missing: ' + noH.slice(0, 3).map((r) => r.en).join(' | ') : ''}`);
      ok(c.status === 0 && /privacy: clean/.test(c.stdout) && !/ERROR/.test(c.stdout) && !/  warn: /.test(c.stdout), `${f} passes plan-to-seed --check (privacy, unique stop keys, and not one docs/STYLE.md warning)` + ` — ${c.stdout.split('\n').filter((l) => /ERROR|PRIVACY|warn: /.test(l)).slice(0, 5).join(' | ')}`);
    }
  } finally { fs.rmSync(dir, { recursive: true, force: true }); }
}
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

// running server: /healthz says ok with Postgres attached; ?full=1 also checks photo storage
if (process.env.BASE) {
  ok((await (await fetch(process.env.BASE + '/healthz')).text()) === 'ok', '/healthz ok with Postgres');
  ok((await (await fetch(process.env.BASE + '/healthz?full=1')).text()) === 'ok', '/healthz?full=1 ok with Postgres + storage');
}
// a storage outage must not fail Railway's deploy check (/healthz), only the full check the uptime alert reads
{ const { health } = require('../server/health.js');
  const pgUp = { query: async () => ({ rows: [] }) }, pgDown = { query: async () => { throw new Error('ECONNREFUSED'); } };
  const stUp = { ping: async () => {} }, stDown = { ping: async () => { throw new Error('NoSuchBucket'); } };
  const a = await health(pgUp, stDown, false), b = await health(pgUp, stDown, true), c = await health(pgDown, stUp, false), d = await health(pgUp, stUp, true);
  ok(a.ok && !b.ok && /storage/.test(b.why) && !c.ok && /postgres/.test(c.why) && d.ok, 'health: storage down → deploy check ok, full check fails; Postgres down → both fail'); }

// the stock art library (docs/STOCK-ART.md): the shipped index is clean, the lint catches what §6.3 says, stock: ids resolve only when approved
{ const STOCK = require('../server/stock.js');
  const errs = await STOCK.lint();
  ok(!errs.length, `stock library lint clean (${STOCK.read().items.length} pictures)` + (errs.length ? ' — ' + errs.slice(0, 8).join(' · ') : ''));
  const sw = fs.readFileSync(path.resolve('public/sw.js'), 'utf8');
  ok(/const STOCK = 'mbs-stock'/.test(sw) && /k !== STOCK/.test(sw) && !/'\/stock\//.test(sw.split('const SHELL_TIMEOUT')[0]),
    'sw.js: stock pictures have their own cache that a deploy keeps, and none is precached');

  const d = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-stock-'));
  const svg = (vb, extra = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}"><circle cx="100" cy="100" r="90" fill="#E4573D"/>${extra}</svg>`;
  fs.mkdirSync(path.join(d, 'jp/tokyo'), { recursive: true });
  fs.writeFileSync(path.join(d, 'jp/tokyo/stamp.v1.svg'), svg('0 0 200 200', '<text x="10" y="20">TOKYO</text>'));
  fs.writeFileSync(path.join(d, 'jp/tokyo/landmark-skytree.v1.svg'), svg('0 0 240 240'));
  fs.writeFileSync(path.join(d, 'jp/tokyo/landmark-bad.v1.svg'), svg('0 0 240 240', '<script>alert(1)</script>'));
  fs.writeFileSync(path.join(d, 'jp/tokyo/landmark-text.v1.svg'), svg('0 0 100 100', '<text>Hi</text>'));
  await sharp({ create: { width: 160, height: 160, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } }).webp().toFile(path.join(d, 'jp/food-ramen.v1.webp'));
  await sharp({ create: { width: 200, height: 200, channels: 3, background: '#fff' } }).webp().toFile(path.join(d, 'jp/food-sushi.v1.webp'));
  fs.writeFileSync(path.join(d, 'jp/stray.v1.svg'), svg('0 0 240 240'));
  const nm = (en) => ({ th: 'ไทย', en });
  const good = {
    v: 1,
    places: { 'jp-tokyo': { country: 'jp', wave: 1, name: nm('Tokyo'), tz: 'Asia/Tokyo', ll: [35.68, 139.76], alias: ['tokyo'], colors: { k1: '#E4573D', k2: '#2F5D8C', k3: '#F6C6D0' } } },
    items: [
      { id: 'jp-tokyo.stamp', cat: 'stamp', file: 'jp/tokyo/stamp.v1.svg', name: nm('Tokyo'), kw: ['tokyo', 'โตเกียว'], ok: '2026-11-09' },
      { id: 'jp-tokyo.landmark.skytree', cat: 'landmark', file: 'jp/tokyo/landmark-skytree.v1.svg', name: nm('Skytree'), kw: ['skytree', 'สกายทรี'] },
      { id: 'jp.food.ramen', cat: 'food', file: 'jp/food-ramen.v1.webp', name: nm('Ramen'), kw: ['ramen', 'ราเมน'], ok: '2026-11-09' },
    ],
  };
  const write = (idx) => fs.writeFileSync(path.join(d, 'index.json'), JSON.stringify(idx));
  write(good); fs.renameSync(path.join(d, 'jp/stray.v1.svg'), path.join(d, '..', path.basename(d) + '-stray.svg'));
  const keep = ['jp/tokyo/landmark-bad.v1.svg', 'jp/tokyo/landmark-text.v1.svg', 'jp/food-sushi.v1.webp'];
  for (const f of keep) fs.renameSync(path.join(d, f), path.join(d, '..', path.basename(d) + '-' + f.replace(/\//g, '_')));
  ok(!(await STOCK.lint(d)).length, 'stock lint: a well-formed library passes');
  for (const f of keep) fs.renameSync(path.join(d, '..', path.basename(d) + '-' + f.replace(/\//g, '_')), path.join(d, f));
  fs.renameSync(path.join(d, '..', path.basename(d) + '-stray.svg'), path.join(d, 'jp/stray.v1.svg'));
  write({ ...good, places: { ...good.places, 'Tokyo!': { country: 'JP', wave: 4, name: { th: '' }, tz: 'Mars/Base', alias: [] } }, items: [...good.items,
    { id: 'jp-tokyo.landmark.bad', cat: 'landmark', file: 'jp/tokyo/landmark-bad.v1.svg', name: nm('Bad'), kw: ['a', 'b'] },
    { id: 'jp-tokyo.landmark.text', cat: 'landmark', file: 'jp/tokyo/landmark-text.v1.svg', next: 'jp/tokyo/landmark-text.v2.svg', name: nm('Text'), kw: ['a', 'b'] },
    { id: 'jp.food.sushi', cat: 'food', file: 'jp/food-sushi.v1.webp', name: nm('Sushi'), kw: ['a', 'b'] },
    { id: 'jp.food.ramen', cat: 'food', file: 'jp/food-ramen.v1.webp', name: nm('Ramen'), kw: ['ramen', 'x'] },
    { id: 'jp-osaka.stamp', cat: 'stamp', file: 'jp/osaka/stamp.v1.svg', name: nm('Osaka'), kw: ['osaka'] },
    { id: 'jp.food.tea', cat: 'drink', file: 'jp/food-tea.v1.png', name: nm('Tea'), kw: ['a', 'b'] },
  ] });
  const e = (await STOCK.lint(d)).join('\n');
  const want = [/place Tokyo!: bad key/, /Tokyo!: country/, /Tokyo!: wave/, /unknown timezone/, /landmark-bad\.v1\.svg is not a safe SVG/, /landmark\.text: only a stamp may carry text/,
    /landmark\.text: viewBox must be "0 0 240 240"/, /food-sushi\.v1\.webp must be 160×160/, /food-sushi\.v1\.webp needs a transparent background/, /jp\.food\.ramen: duplicate id/,
    /jp-osaka\.stamp: city jp-osaka is not in places/, /jp-osaka\.stamp: needs at least two keywords/, /jp\.food\.tea: cat must be "food"/, /jp\.food\.tea: file must look like/, /file jp\/stray\.v1\.svg is not in index\.json/, /landmark-text\.v2\.svg is missing/];
  const miss = want.filter((re) => !re.test(e));
  ok(!miss.length, `stock lint catches bad keys, unsafe SVG, text, viewBox, size, alpha, duplicates, unknown city, keywords, category, file name, stray files, a missing redraw (next)` + (miss.length ? ' — missed: ' + miss.join(' ') : ''));
  write(good);
  const lib = STOCK.reload(d);
  ok(lib.size === 2 && STOCK.url('jp-tokyo.stamp') === '/stock/jp/tokyo/stamp.v1.svg' && STOCK.url('jp-tokyo.landmark.skytree') === '', 'stock: only approved pictures resolve');
  const theme = { accent: '#1F3A5F', art: '/art/hk/day-{n}.svg', artDays: ['stock:jp-tokyo.stamp', 'stock:jp-tokyo.landmark.skytree', 'stock:nope.x'] };
  const out = STOCK.maybe(theme);
  ok(out.artDays.join('|') === '/stock/jp/tokyo/stamp.v1.svg||' && out.art === theme.art && theme.artDays[0] === 'stock:jp-tokyo.stamp' && STOCK.maybe(null) === null && STOCK.maybe({ a: 'x' }).a === 'x',
    'stock: ids inside a book resolve to URLs (unapproved/unknown → empty), everything else untouched, the stored seed unchanged');
  write({ ...good, items: good.items.map((it) => (it.id === 'jp-tokyo.stamp' ? { ...it, file: 'jp/tokyo/stamp.v2.svg' } : it)) });
  fs.copyFileSync(path.join(d, 'jp/tokyo/stamp.v1.svg'), path.join(d, 'jp/tokyo/stamp.v2.svg'));
  const tag1 = lib.tag, lib2 = STOCK.reload(d);
  ok(lib2.tag !== tag1 && STOCK.url('jp-tokyo.stamp') === '/stock/jp/tokyo/stamp.v2.svg', 'stock: a redrawn picture (new file version) changes its URL and the library tag');
  STOCK.reload();
  fs.rmSync(d, { recursive: true, force: true });
}
// the stock matcher (docs/STOCK-ART.md §5.6): a book without its own drawings takes the library's pictures that fit its days
{ const C = await import('../scripts/lib/plan-to-seed-core.mjs');
  const plan = JSON.parse(fs.readFileSync(path.resolve('server/samples/sakura-hop-2028.plan.json'), 'utf8'));
  const idx = JSON.parse(fs.readFileSync(path.resolve('public/stock/index.json'), 'utf8'));
  const s = C.toSeed(plan, [], { art: false, stock: idx });
  ok(s.theme.artDays.join() === 'stock:jp-tokyo.day.skyline,stock:jp-tokyo.landmark.kaminarimon,stock:jp-tokyo.landmark.shibuya,stock:jp-tokyo.landmark.yamanote,stock:jp-tokyo.day.skyline,stock:jp-tokyo.day.skyline' && s.passport.style.crest === 'stock:jp.stamp'
    && JSON.stringify(s.passport.stamps) === JSON.stringify([{ art: 'stock:jp.stamp', day: 0 }, { art: 'stock:jp-tokyo.stamp', day: 0 }]) && s.stock.places.join() === 'jp-tokyo'
    && s.passport.guides.map((g) => g.art).join() === 'stock:jp.guide.hana,stock:jp.guide.momo' && /\{name\}/.test(s.passport.guides[0].hello.th),
    'stock match: the six Tokyo days get the skyline / the Senso-ji gate / Shibuya / the train / the skyline (a day the library has no landmark for) twice — never a place the day skips —, the Japan crest, Japan + Tokyo stamps, Japan\'s two guides');
  // a plan without a badge shows its cover emoji in the book's circle and trip stamp, never the 📖 placeholder (the live sample, Nov 2026)
  ok(s.theme.badge === plan.emoji && C.toSeed({ ...plan, badge: '🗼' }, [], { art: false }).theme.badge === '🗼',
    'plan-to-seed: the badge is the plan\'s own, else its cover emoji');
  // a day that names only its city gets the city's own scene, never one of its landmarks (a landmark's keywords may hold the city's
  // name — "tokyo" in the capsule toys — and that matched every Tokyo day; 39 cities did it before the matcher dropped the city's name)
  { const M = await import('../scripts/lib/stock-match.mjs');
    const wrong = Object.entries(idx.places).filter(([k]) => k.includes('-')).filter(([, p]) => {
      const id = (M.stockMatch([{ title: { en: p.alias[0], th: p.alias[1] } }], p.alias[0], idx).artDays[0] || '').replace('stock:', '');
      const it = idx.items.find((x) => x.id === id); return it && it.cat === 'landmark'; }).map(([k]) => k);
    ok(!wrong.length, 'stock match: a day that names only its city gets the city\'s scene, never a landmark picked by the city\'s name' + (wrong.length ? ' — ' + wrong.join(' ') : ''));
    // a place the library doesn't have (Nov 2026: the Sydney book took the Cotswolds, Interlaken, Plitvice, Tallinn and London):
    // "Bath, story, bed", "Zig Zag Railway", Thai อเมริกา / แอฟริกา / มาเล่น / เดลี่, and the stops' street addresses name no city
    const au = JSON.parse(fs.readFileSync(path.resolve('server/seeds/big-hop-2027.json'), 'utf8'));
    const mau = M.stockMatch(au.days, au.title, idx);
    ok(mau.places.every((k) => k.startsWith('au-')) && mau.artDays.every((a) => !a || /^stock:([tr]\.day\.|au-)/.test(a)),
      'stock match: a Sydney book gets Australia\'s pictures or landscape and route scenes, never another country\'s city (nor Bangkok, where it flies from)' + ' — ' + mau.places.join(' '));
    // home places (Thailand): a trip starts and ends in Bangkok, so a Thai city counts only when the book is about Thailand
    const hx = { ...idx, places: { ...idx.places, thx: { name: { en: 'Thailandx', th: 'ไทยx' }, alias: ['thailandx', 'ไทยx'], home: true },
      'thx-bkk': { country: 'thx', name: { en: 'Bangkokx', th: 'กรุงเทพx' }, alias: ['bangkokx', 'กรุงเทพx', 'BKKX'], home: true } },
      items: [...idx.items, { id: 'thx.stamp', cat: 'stamp', ok: '2026-11-11' }, { id: 'thx-bkk.stamp', cat: 'stamp', ok: '2026-11-11' }, { id: 'thx-bkk.day.river', cat: 'day', kw: ['bangkokx'], ok: '2026-11-11' }] };
    const hm = (place, ...days) => M.stockMatch(days.map((en) => ({ title: { en, th: en } })), { en: place, th: place }, hx);
    const away = hm('Tokyo 2027', 'Fly from Bangkokx (BKKX) to Tokyo', 'Ueno zoo', 'Home to Bangkokx'), here = hm('Bangkokx weekend', 'Boat on the river in Bangkokx'),
      land = hm('Thailandx', 'Bangkokx', 'Bangkokx again'), both = hm('Bangkokx to Tokyo', 'Bangkokx airport', 'Tokyo');
    ok(!away.places.includes('thx-bkk') && away.crest === 'stock:jp.stamp' && here.places.join() === 'thx-bkk' && here.crest === 'stock:thx.stamp'
      && land.places.join() === 'thx-bkk' && !both.places.includes('thx-bkk'),
      'stock match: a home place (Bangkok) counts only when the book\'s place is it or its country, and nowhere abroad — ' + [away, here, land, both].map((m) => m.places.join('+')).join(' | '));
    // wave 11 (Thailand, Australia, New Zealand): a place named in a city's display name keeps its keywords ("Sydney and the Blue
    // Mountains" → the Three Sisters); Thai words that are also place names (khanom = dessert, saphan = bridge, Nan = grandma) name nothing
    const wm = (place, ...days) => M.stockMatch(days.map((en) => ({ title: { en, th: en } })), { en: place, th: place }, idx);
    if (idx.places['au-sydney'] && idx.places['th-nan']) {
      const syd = wm('Sydney 2027', 'Fly from Suvarnabhumi to Sydney', 'Bondi', 'Blue Mountains'), thai = wm('เที่ยวไทย', 'กรุงเทพ', 'อยุธยา'),
        cm = wm('เชียงใหม่', 'บินจากดอนเมือง', 'ดอยสุเทพ'), words = wm('Japan', 'Try khanom krok', 'Saphan Taksin pier', 'Visit Nan');
      ok(syd.places.join() === 'au-sydney' && syd.artDays[2] === 'stock:au-sydney.landmark.threesisters' && thai.places.join() === 'th-bangkok,th-ayutthaya'
        && cm.places.join() === 'th-chiangmai' && words.places.length === 0,
        'stock match: Blue Mountains finds the Three Sisters; a Thai trip finds its Thai cities, a Chiang Mai book never Bangkok; khanom / saphan / Nan name no city — '
        + [syd, thai, cm, words].map((m) => m.places.join('+')).join(' | ') + ' ' + syd.artDays[2]);
    }
    // wave 12: a Paris book that changes planes in Dubai on day 1 keeps France's crest and guides; a Dubai book takes the UAE's
    if (idx.places['ae-dubai']) {
      const via = wm('Paris 2027', 'Transit in Dubai (DXB)', 'Eiffel Tower'), dxb = wm('Dubai', 'Burj Khalifa');
      ok(via.crest === 'stock:fr.stamp' && via.places.join() === 'ae-dubai,fr-paris' && dxb.crest === 'stock:ae.stamp',
        'stock match: the crest is the country the book is about, not the first transit — ' + via.crest + ' ' + dxb.crest);
    }
    // wave 13 (twelve more Thai places): Loei never answers to the everyday "เลย"; Trang answers in a Thai book, never in "Nha Trang"
    if (idx.places['th-loei']) {
      const lo = wm('เที่ยวไทย', 'ขับรถไปเลยจ้า', 'กินข้าวกันเลย'), ck = wm('เชียงคาน', 'เดินถนนคนเดินเชียงคาน'), nt = wm('Vietnam', 'Nha Trang beach'), tr = wm('ตรัง', 'เกาะมุก');
      ok(!lo.places.length && ck.places.join() === 'th-loei' && !nt.places.includes('th-trang') && tr.places.join() === 'th-trang',
        'stock match: "เลย" the word names no city, Chiang Khan is Loei, Nha Trang is not Trang — ' + [lo, ck, nt, tr].map((m) => m.places.join('+')).join(' | '));
    }
    const trap = (en, th, q) => M.stockMatch([{ title: { en, th }, planned: q ? [{ en: 'Café', th: 'คาเฟ่', q }] : [] }], { en: 'Our trip', th: 'ทริปของเรา' }, idx).places;
    ok([trap('A nice day, then a bath', 'แวะร้านเดลี่ แล้วมาเล่นที่สวน'), trap('Umbrella and the Zig Zag Railway', 'นักบินจากอเมริกาบินไปแอฟริกา'),
      trap('Brunch', 'บรันช์', '5 Whistler St, Manly NSW'), trap('First stop: the central market', 'ตลาดกลาง')].every((p) => p.length === 0),
      'stock match: everyday words, Thai words that hold a place\'s name, and street addresses name no city');
    ok(trap('Split, Croatia', 'สปลิต').join() === 'hr-dubrovnik' && trap('Flight BKK → ZAG to Croatia', 'บินไปซาเกร็บ').join() === 'hr-plitvice' && trap('Old town of Split', 'เมืองเก่า').join() === ''
      && trap('Day trip to Nice', 'ไปเที่ยวนีซ').join() === 'fr-nice' && trap('Shopping in New York', 'ช้อปปิ้งที่นิวยอร์ก').join() === 'us-newyork',
      'stock match: a place written with its capitals, an airport code in capitals and the longest name still find their city; a side name alone (Split, no Croatia) names nothing'); }
  const unapproved = { ...idx, items: idx.items.map((it) => ({ ...it, ok: undefined })) };
  const s2 = C.toSeed(plan, [], { art: false, stock: unapproved }), s3 = C.toSeed(plan, [], { art: false }), s4 = C.toSeed(plan, [], { stock: idx });
  ok(!s2.theme.artDays && !s2.passport.stamps && !s3.theme.artDays && s3.passport.style.crest === '' && !s4.theme.artDays && !s4.stock,
    'stock match: unapproved pictures are never picked; no index or a book with its own art → nothing from the library');
  const other = { ...plan, place: { th: 'อูซัวยา', en: 'Ushuaia' }, title: { th: 'อูซัวยา', en: 'Ushuaia' }, days: plan.days.map((d) => ({ ...d, title: { th: 'อูซัวยา', en: 'Ushuaia' }, sleep: { th: 'อูซัวยา', en: 'Ushuaia' }, planned: [], plan: [], moving: { th: '', en: '' } })) };
  const jpOnly = { ...idx, places: Object.fromEntries(Object.entries(idx.places).filter(([k]) => k.startsWith('jp'))), items: idx.items.filter((it) => it.id.startsWith('jp')) };   // a slice that stays true as the library grows
  ok(!C.toSeed(other, [], { art: false, stock: jpOnly }).theme.artDays, 'stock match: a city the library does not have gets nothing (no Tokyo pictures in an Ushuaia book)');
  // S4: a town the library has no set for still gets the landscape / route scene its day names; a day naming none stays empty
  const wild = { ...other, days: other.days.map((d, i) => ({ ...d, title: [{ th: 'เดินบนธารน้ำแข็ง', en: 'Walking on a glacier' }, { th: 'อูซัวยา', en: 'Ushuaia' }, { th: 'นั่งเรือเฟอร์รีข้ามไปเกาะ', en: 'The ferry to the island' }][i] || d.title })) };
  const wa = C.toSeed(wild, [], { art: false, stock: idx }).theme.artDays || [];
  ok(wa[0] === 'stock:t.day.glacier' && !wa[1] && wa[2] === 'stock:r.day.ferry', 'stock match: an unknown town gets the glacier / the ferry its days name, nothing for a day that names neither' + ` — got ${wa.join()}`);
  const withMap = { ...plan, passport: { ...(plan.passport || {}), map: { title: { th: 'แผนที่', en: 'Map' }, sea: { th: 'ทะเล', en: 'Sea' }, stops: [
    { k: 'tower', e: '🗼', th: 'โตเกียวทาวเวอร์', en: 'Tokyo Tower', x: 40, y: 40 }, { k: 'hotel', e: '🛏️', th: 'โรงแรม', en: 'Our hotel', x: 60, y: 60 },
    { k: 'own', e: '🏯', th: 'ปราสาท', en: 'A castle', x: 20, y: 20, art: '/art/x.svg' }], days: [['tower'], ['hotel'], ['own']] } } };
  const ms = C.toSeed(withMap, [], { art: false, stock: idx }).passport.map.stops;
  ok(ms[0].art === 'stock:jp-tokyo.landmark.tower' && !ms[1].art && ms[2].art === '/art/x.svg', 'stock match: a map pin named like a library landmark shows its picture; others keep their emoji; a pin\'s own art stays');
}
// served by the running app: a missing stock file is a 404 (never the app page), the index is not cached for long, nothing needs sign-in
if (process.env.BASE) {
  const r = await fetch(process.env.BASE + '/stock/jp/tokyo/nope.v1.svg');
  ok(r.status === 404 && !/<html/i.test(await r.text()), '/stock: a missing picture is a 404, not the app page');
  const ix = await fetch(process.env.BASE + '/stock/index.json');
  ok(ix.status === 200 && /no-cache/.test(ix.headers.get('cache-control') || '') && Array.isArray((await ix.json()).items), '/stock/index.json is served, revalidated each time');
}

// a book from photos (docs/SNAP-BOOK.md P0): public/snap.js reads when and where a photo was taken from the original file, on the phone.
// The fixtures are 64×48 synthetic pictures (never a real photo): Pillow wrote the little-endian JPEGs, sharp/libexif the big-endian
// JPEG and the AVIF (the same ISO-BMFF 'meta'/'iinf'/'iloc' layout an iPhone's HEIC uses).
{
  const vm = await import('node:vm');
  const ctx = { A: {}, Blob, File, DataView, Uint8Array, Promise, Math, String, Array, Object, Set, isFinite, navigator: {} };
  vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.resolve('public/snap.js'), 'utf8') + '\n;this.snapMeta = snapMeta; this.snapRead = snapRead; this.snapNearest = snapNearest; this.snapRound = snapRound; this.snapVidAt = snapVidAt; this.snapDocGate = snapDocGate; this.snapDocOf = snapDocOf;', ctx);
  const fx = (f, mod) => new File([fs.readFileSync(path.resolve('test/fixtures/snap', f))], f, { lastModified: mod || Date.UTC(2030, 0, 2, 3, 4, 5) });
  const near = (ll, a, b) => !!ll && Math.abs(ll[0] - a) < 1e-4 && Math.abs(ll[1] - b) < 1e-4;
  const m1 = await ctx.snapMeta(fx('gps-ii.jpg'));
  ok(m1.src === 'exif' && m1.at === '2025-12-12T09:15:30' && m1.tz === '+07:00' && near(m1.ll, 14.44, 101.37), `snap: little-endian JPEG → time, zone and position (${JSON.stringify(m1)})`);
  const m2 = await ctx.snapMeta(fx('gps-mm.jpg'));
  ok(m2.src === 'exif' && m2.at === '2025-12-12T09:15:30' && m2.tz === '+07:00' && near(m2.ll, 14.44, 101.37), `snap: big-endian JPEG (what iPhones write) → the same (${JSON.stringify(m2)})`);
  const m3 = await ctx.snapMeta(fx('gps.avif'));
  ok(m3.kind === 'heif' && m3.src === 'exif' && m3.at === '2025-12-12T09:15:30' && near(m3.ll, 14.44, 101.37), `snap: HEIF container (AVIF here, HEIC on an iPhone) → the Exif item through iinf/iloc (${JSON.stringify(m3)})`);
  const m4 = await ctx.snapMeta(fx('time-only.jpg'));
  ok(m4.at === '2025-12-13T17:40:05' && m4.ll === null && m4.tz === null, 'snap: a photo whose position was taken out keeps its time and says no position');
  const m5 = await ctx.snapMeta(fx('gps-zero.jpg'));
  ok(m5.at === '2025-12-14T08:00:00' && m5.ll === null, 'snap: an empty 0,0 position counts as none');
  const m6 = await ctx.snapMeta(fx('gps-south.jpg'));
  ok(m6.tz === '+11:00' && near(m6.ll, -33.86, 151.21), `snap: south of the equator is negative (${JSON.stringify(m6.ll)})`);
  const m7 = await ctx.snapMeta(fx('no-exif.jpg', new Date(2026, 11, 15, 20, 30, 0).getTime()));
  ok(m7.src === 'file' && m7.at === '2026-12-15T20:30:00' && m7.ll === null, 'snap: no EXIF → the file\'s own time, marked as such');
  const m8 = await ctx.snapMeta(new File([new Uint8Array([0xFF, 0xD8, 0xFF, 0xE1, 0xFF, 0xFF, 0x45, 0x78])], 'broken.jpg', { lastModified: Date.UTC(2026, 0, 1) }));
  const m9 = await ctx.snapMeta(new File([new Uint8Array(40)], 'x.bin', { lastModified: Date.UTC(2026, 0, 1) }));
  ok(m8.src === 'file' && m9.src === 'file' && m8.ll === null, 'snap: a cut or unknown file never throws');
  // HEIF layouts a phone may write that the AVIF above does not: the Exif item inside 'meta' ('idat', iloc method 1) with no offset
  // prefix, and the picture data ('mdat') before 'meta' with the Exif item 290 KB in (past the first read)
  {
    const tiff = Buffer.from(vm.runInContext('snapJpegTiff', ctx)(new Uint8Array(fs.readFileSync(path.resolve('test/fixtures/snap/gps-ii.jpg')))));
    const u16 = (v) => { const b = Buffer.alloc(2); b.writeUInt16BE(v); return b; }, u32 = (v) => { const b = Buffer.alloc(4); b.writeUInt32BE(v); return b; };
    const box = (t, ...p) => { const body = Buffer.concat(p); return Buffer.concat([u32(body.length + 8), Buffer.from(t, 'latin1'), body]); };
    const full = (t, v, ...p) => box(t, Buffer.from([v, 0, 0, 0]), ...p);
    const ftyp = box('ftyp', Buffer.from('heic', 'latin1'), u32(0), Buffer.from('mif1heic', 'latin1'));
    const iinf = full('iinf', 0, u16(1), full('infe', 2, u16(7), u16(0), Buffer.from('Exif\0', 'latin1')));
    const item1 = Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), tiff]);   // no 4-byte offset first
    const metaA = full('meta', 0, iinf, full('iloc', 1, Buffer.from([0x44, 0x00]), u16(1), u16(7), u16(1), u16(0), u16(1), u32(0), u32(item1.length)), box('idat', item1));
    const a = await ctx.snapMeta(new File([Buffer.concat([ftyp, metaA])], 'a.heic', { lastModified: Date.UTC(2030, 0, 1) }));
    ok(a.src === 'exif' && a.at === '2025-12-12T09:15:30' && near(a.ll, 14.44, 101.37), `snap: HEIF with the Exif item inside 'meta' (idat) and no offset prefix (${JSON.stringify(a)})`);
    const item2 = Buffer.concat([u32(6), Buffer.from('Exif\0\0', 'latin1'), tiff]), pad = 290000;
    const mdat = box('mdat', Buffer.alloc(pad), item2), at = ftyp.length + 8 + pad;
    const metaB = full('meta', 0, iinf, full('iloc', 0, Buffer.from([0x44, 0x00]), u16(1), u16(7), u16(0), u16(1), u32(at), u32(item2.length)));
    const b = await ctx.snapMeta(new File([Buffer.concat([ftyp, mdat, metaB])], 'b.heic', { lastModified: Date.UTC(2030, 0, 1) }));
    ok(b.src === 'exif' && near(b.ll, 14.44, 101.37), `snap: HEIF with the picture data before 'meta' (${JSON.stringify(b)})`);
    const c = await ctx.snapMeta(new File([Buffer.concat([ftyp, full('meta', 0, full('iinf', 0, u16(0)), full('iloc', 0, Buffer.from([0x44, 0]), u16(0)))])], 'c.heic', { lastModified: Date.UTC(2030, 0, 1) }));
    ok(c.src === 'file' && c.why === 'heif-noexif' && m4.why === 'nogps' && m7.why === 'jpeg-noexif' && m9.why === 'other', `snap: the check page is told why a time or a place is missing (${c.why}, ${m4.why}, ${m7.why}, ${m9.why})`);
  }
  const all = await ctx.snapRead(['gps-ii.jpg', 'time-only.jpg', 'no-exif.jpg', 'gps.avif'].map((f) => fx(f)), null, 2);
  ok(all.length === 4 && all.every(Boolean) && all.filter((m) => m.ll).length === 2, 'snap: many files read a few at a time, in order');
  const src = fs.readFileSync(path.resolve('public/snap.js'), 'utf8'), named = 'snapWhere([p.coords.latitude, p.coords.longitude], await snapGeo())';
  const sent = "api('POST', '/api/b/geo/near', { ll: snapRound(ll) })";
  ok(src.split(named).length === 2 && src.split(sent).length === 2 && !/m\.ll\[|\.ll\.join|ll\.toFixed|coords\.(latitude|longitude)/.test(src.replace(named, ''))
    && (src.match(/api\([^)]*\bll\b/g) || []).length === 1 && /if \(ls\('geoOnline'\)/.test(src),
    'snap: a position is never printed or kept — the one live read goes straight into snapWhere; the only position that ever leaves the phone is rounded (snapRound) and only with the family\'s switch on');
  // a clip's time (owner, Nov 2026: clips in a book from photos): the movie header's creation time, found by walking the boxes — a phone
  // writes the index ('moov') after the picture data, as ffmpeg does by default here; a clip with no time says so
  { const { execFileSync } = await import('node:child_process'), dir = fs.mkdtempSync(path.join(os.tmpdir(), 'mbv-')), mk = (f, extra) => { execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'testsrc=size=160x120:rate=10', '-t', '1', ...extra, '-c:v', 'libx264', '-preset', 'ultrafast', path.join(dir, f)]); return new File([fs.readFileSync(path.join(dir, f))], f, { type: f.endsWith('.mov') ? 'video/quicktime' : 'video/mp4' }); };
    const v1 = await ctx.snapVidAt(mk('a.mp4', ['-metadata', 'creation_time=2025-03-01T10:30:00Z'])), v2 = await ctx.snapVidAt(mk('b.mov', ['-metadata', 'creation_time=2024-07-09T23:05:00Z'])), v3 = await ctx.snapVidAt(mk('c.mp4', ['-fflags', '+bitexact']));
    fs.rmSync(dir, { recursive: true, force: true });
    ok(v1 && v1.ms === Date.parse('2025-03-01T10:30:00Z') && /^2025-03-0[12]T/.test(v1.at) && v2 && v2.ms === Date.parse('2024-07-09T23:05:00Z') && v3 === null,
      `snap: a clip's own time from its movie header, MP4 and QuickTime, the index after the picture data; none written → none (${JSON.stringify([v1, v2, v3])})`); }
  // receipts and papers (owner, Nov 2026: "ตรวจจับใบเสร็จ"): synthetic pictures drawn here — three receipts (on a table, straight, tilted
  // 12°, blurred) are papers; snow, a white facade with rows of windows, a big sign, a colourful scene, grey gravel, thin stripes and
  // polka dots are not. The gate reads 96 px, the lines of print 320 px, as on the phone.
  { const receipt = (bg, lines, tilt, wide) => { const words = ['TOTAL', 'Lamington x2', 'Flat white', 'Juice 300ml', 'Sub-total', 'Ice cream', 'VISA ****', 'Thank you!']; let t = '';
      for (let i = 0; i < lines; i++) t += `<text x="80" y="${90 + i * 22}" font-family="monospace" font-size="15" fill="#222">${words[i % words.length]}</text><text x="${10 + wide}" y="${90 + i * 22}" font-family="monospace" font-size="15" fill="#222">${((i * 7.31) % 40).toFixed(2)}</text>`;
      return `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="720"><rect width="480" height="720" fill="${bg}"/><g transform="rotate(${tilt} 240 360)"><rect x="60" y="40" width="${wide + 40}" height="${lines * 22 + 90}" fill="#f6f4ee"/><text x="120" y="70" font-family="sans-serif" font-size="22" font-weight="bold" fill="#111">CAFE EXAMPLE</text>${t}</g></svg>`; };
    const svg = (body, bg = '#f4f4f4') => `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="640" height="480" fill="${bg}"/>${body}</svg>`;
    let win = '', st = '', dots = ''; for (let r = 0; r < 7; r++) for (let c = 0; c < 6; c++) win += `<rect x="${60 + c * 90}" y="${50 + r * 60}" width="40" height="34" fill="#334"/>`;
    for (let i = 0; i < 40; i++) st += `<rect y="${i * 12}" width="640" height="5" fill="#222"/>`;
    for (let r = 0; r < 20; r++) for (let c = 0; c < 40; c++) dots += `<circle cx="${8 + c * 16}" cy="${10 + r * 24}" r="3" fill="#222"/>`;
    const cases = [
      ['receipt on a table', sharp(Buffer.from(receipt('#7a5a40', 26, 0, 280))), true],
      ['receipt held at 12°', sharp(Buffer.from(receipt('#3d6a8a', 22, 12, 240))).resize({ width: 3000 }), true],
      ['receipt blurred', sharp(await sharp(Buffer.from(receipt('#30343a', 30, 4, 280))).resize({ width: 1600 }).blur(3).jpeg({ quality: 70 }).toBuffer()), true],
      ['snow', sharp(Buffer.from(svg('<rect width="640" height="200" fill="#bcd4ee"/>' + [80, 200, 330, 470, 560].map((x) => `<polygon points="${x},120 ${x - 30},230 ${x + 30},230" fill="#2f4a3a"/>`).join('') + '<circle cx="300" cy="360" r="30" fill="#e44"/>', '#f2f4f6'))), false],
      ['facade of windows', sharp(Buffer.from(svg(win, '#f1f0ec'))), false],
      ['a big sign', sharp(Buffer.from(svg('<rect x="120" y="120" width="400" height="200" fill="#fafafa"/><text x="150" y="240" font-family="sans-serif" font-size="70" font-weight="bold" fill="#111">EXIT 3</text>', '#6a9a5a'))), false],
      ['a beach day', sharp(Buffer.from(svg('<rect y="300" width="640" height="180" fill="#e8d8a8"/><circle cx="250" cy="260" r="60" fill="#f2c39a"/><rect x="200" y="320" width="100" height="120" fill="#e05a8a"/>', '#87ceeb'))), false],
      ['grey gravel', sharp(await sharp({ create: { width: 800, height: 600, channels: 3, noise: { type: 'gaussian', mean: 175, sigma: 45 } } }).greyscale().png().toBuffer()), false],
      ['thin stripes', sharp(Buffer.from(svg(st))), false],
      ['polka dots', sharp(Buffer.from(svg(dots))), false]];
    const got = [];
    for (const [name, img, want] of cases) {
      const g = await img.clone().resize({ width: 96 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true }), d = await img.clone().resize({ width: 320 }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      const is = ctx.snapDocGate(g.data, g.info.width, g.info.height) && ctx.snapDocOf(d.data, d.info.width, d.info.height);
      got.push([name, is, want]);
    }
    // the camera's own preview inside the EXIF (IFD1), found where it sits in the file: the receipt gate reads it instead of the photo
    const { cameraJpeg, receiptSvg } = await import('./snap-jpeg.mjs'), cj = await cameraJpeg(receiptSvg(), '2025:03:01 13:30:00');
    const mt = await ctx.snapMeta(new File([cj.buffer], 'IMG_1.jpg')), tb = mt.th ? cj.buffer.subarray(mt.th[0], mt.th[0] + mt.th[1]) : null;
    ok(mt.at === '2025-03-01T13:30:00' && mt.src === 'exif' && mt.th && mt.th[0] === cj.thAt && mt.th[1] === cj.thLen && tb[0] === 0xFF && tb[1] === 0xD8 && tb[tb.length - 2] === 0xFF && tb[tb.length - 1] === 0xD9,
      `snap: the camera's small preview is found in the EXIF (IFD1) — where it sits and how long (${JSON.stringify({ at: mt.at, th: mt.th, want: [cj.thAt, cj.thLen] })})`);
    ok(!(await ctx.snapMeta(fx('gps-ii.jpg'))).th, 'snap: a JPEG with no preview says so (the photo itself is looked at)');
    // an iPhone's HEIC keeps its preview as an item of its own ('iref' 'thmb'): cut out and wrapped as a file of one picture that a
    // decoder opens as it is (here an AVIF of the same layout — libheif reads it back at the preview's own 160 px)
    { const { avifWithPreview } = await import('./snap-jpeg.mjs'), av = await avifWithPreview(receiptSvg());
      const mh = await ctx.snapMeta(new File([av.buffer], 'IMG_2.avif')), blob = mh.th && typeof mh.th.arrayBuffer === 'function' ? Buffer.from(await mh.th.arrayBuffer()) : null;
      const md = blob ? await sharp(blob).metadata().catch((e) => ({ err: e.message })) : null;
      ok(md && md.width === 160 && mh.th.type === 'image/avif' && blob.length < av.thumbBytes + 1200 && !(await ctx.snapMeta(fx('gps.avif'))).th,
        `snap: a HEIF's own preview item is cut out as a file of its own (decodes at 160 px, a few hundred bytes of boxes around it); one with no preview says so (${JSON.stringify({ w: md && md.width, h: md && md.height, err: md && md.err, size: blob && blob.length, thumb: av.thumbBytes })})`); }
    ok(got.every(([, is, want]) => is === want), `snap: a receipt is told from a photo on the phone — straight, tilted or blurred; not snow, windows, a sign, gravel, stripes or dots (${JSON.stringify(got.filter(([, is, want]) => is !== want))})`); }
  ok(JSON.stringify(ctx.snapRound([13.75049, 100.49171])) === '[13.75,100.49]', 'snap: what leaves the phone is rounded to two decimals (about a kilometre)');
  // the phone's own list of place names (public/geo/<cc>.json, GeoNames): the nearest spot inside its reach, else a town within 8 km
  const geoTh = JSON.parse(fs.readFileSync(path.resolve('public/geo/th.json'), 'utf8'));
  const gp = ctx.snapNearest([13.7502, 100.4913], geoTh), ap = ctx.snapNearest([13.6905, 100.7501], geoTh), sea = ctx.snapNearest([9.5, 97.2], geoTh);
  ok(gp && gp.en === 'Grand Palace' && gp.th === 'พระบรมมหาราชวัง' && ap && /Suvarnabhumi/.test(ap.en) && /สุวรรณภูมิ/.test(ap.th) && sea === null,
    `snap: finer names on the phone — the Grand Palace, the airport, nothing at sea (${JSON.stringify([gp, ap, sea])})`);
  const stockCcs = [...new Set(Object.values(JSON.parse(fs.readFileSync(path.resolve('public/stock/index.json'), 'utf8')).places).map((x) => x.country))];
  const geoBad = stockCcs.filter((cc) => { try { const g = JSON.parse(fs.readFileSync(path.resolve(`public/geo/${cc}.json`), 'utf8')); return !(g.v === 1 && g.cc === cc && Array.isArray(g.t) && Array.isArray(g.s) && g.t.length + g.s.length > 20 && fs.statSync(path.resolve(`public/geo/${cc}.json`)).size < 600e3 && g.s.every((x) => x.length === 6 && typeof x[3] === 'number' && (g.r || {})[x[5]] > 0)); } catch (_) { return true; } });
  ok(!geoBad.length, `snap: every country of the library has its list of place names, in shape and under 600 KB (${geoBad.join(' ') || 'all ' + stockCcs.length})`);
}
// the online place-name lookup (server/nearname.js, opt-in): the position rounded again, a generic User-Agent, the names in
// Thai and English, one request a second, an in-memory cache; bad input never reaches the network
{
  const http = await import('node:http'), seen = [];
  const mock = http.createServer((req, res) => { const u = new URL(req.url, 'http://x'); seen.push({ lat: u.searchParams.get('lat'), lon: u.searchParams.get('lon'), ua: req.headers['user-agent'] || '', cookie: req.headers.cookie || '' });
    res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ osm_type: 'way', osm_id: 123, namedetails: { name: 'วัดอรุณราชวราราม', 'name:en': 'Wat Arun', 'name:th': 'วัดอรุณฯ' }, address: { suburb: 'Bangkok Yai' } })); });
  await new Promise((r) => mock.listen(0, r));
  process.env.NOMINATIM_URL = `http://localhost:${mock.address().port}`;
  const NEAR = require('../server/nearname.js');
  const a = await NEAR.near([13.74371, 100.48881]), b = await NEAR.near([13.7441, 100.4851]), c = await NEAR.near(['x', 1]), d = await NEAR.near([200, 1]);
  ok(a && a.name.en === 'Wat Arun' && a.name.th === 'วัดอรุณฯ' && a.id === 'w123' && seen.length === 1 && seen[0].lat === '13.74' && seen[0].lon === '100.49'
    && !/lifebook|memory|mimi|mika/i.test(seen[0].ua) && !seen[0].cookie && b === a && c === null && d === null,
    `place names online: the position goes out rounded, a generic name for the app, no cookie; the same cell is answered from memory; bad input asks nothing (${JSON.stringify(seen)})`);
  mock.close(); delete process.env.NOMINATIM_URL;
}

// older iPads (iPadOS 15 on an iPad mini 4 / Air 2, early iPadOS 16): Safari before 16.4 refuses a whole script over one regex lookbehind,
// and before 16.2 drops every colour written with color-mix() — no lookbehind in the client, and a resolved stylesheet for those
for (const f of ['core.js', 'views.js', 'sheets.js', 'kid.js', 'snap.js', 'sw.js']) ok(!/\(\?<[=!]/.test(fs.readFileSync(path.join('public', f), 'utf8')), `old Safari: no regex lookbehind in public/${f} (it would stop the whole file on iPadOS 15)`);
{ const { legacy, pick } = require('../server/legacycss.js');
  ok(pick('in srgb, var(--leaf) 55%, var(--rule)') === 'var(--leaf)' && pick('in srgb,var(--accent) 22%,var(--paper)') === 'var(--paper)' && pick('in srgb, 30% red, blue') === 'blue' && pick('in oklab, red, blue') === 'red', 'legacy css: each color-mix() becomes its stronger colour');
  const css = fs.readFileSync(path.join('public', 'app.css'), 'utf8'), old = legacy(css);
  ok(!old.includes('color-mix(') && (old.match(/\{/g) || []).length === (css.match(/\{/g) || []).length, 'legacy css: no color-mix() left, every rule kept');
  ok(fs.readFileSync(path.join('public', 'core.js'), 'utf8').includes("CSS.supports('color', 'color-mix(") && /'\/app-legacy\.css'/.test(fs.readFileSync(path.join('public', 'sw.js'), 'utf8')), 'legacy css: core.js swaps it in where color-mix() is missing; the service worker keeps it for offline'); }
// a dark-mode rule with several selectors must scope every one of them: ":root[data-theme=dark] .a,.b{…}" sends .b to light mode too
// (Nov 2026: the book menu's second lines turned pale grey on the pastel tiles, the passport's group headings faded)
{ const css = fs.readFileSync(path.join('public', 'app.css'), 'utf8'), bad = [];
  const split = (x) => { const out = []; let d = 0, cur = ''; for (const ch of x) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && !d) { out.push(cur); cur = ''; } else cur += ch; } out.push(cur); return out.map((y) => y.trim()); };
  for (const m of css.matchAll(/(?:^|[{}])\s*([^{}@]*(?::root\[data-theme=dark\]|:root:not\(\[data-theme=light\]\))[^{}]*)\{/g)) bad.push(...split(m[1]).filter((x) => !/^:root(\[data-theme=dark\]|:not\(\[data-theme=light\]\))/.test(x)));
  ok(!bad.length, `app.css: every selector of a dark-mode rule carries the dark scope${bad.length ? ' — ' + bad.slice(0, 3).join(' | ') : ''}`); }
if (process.env.BASE) { const r = await fetch(process.env.BASE + '/app-legacy.css'); ok(r.ok && /text\/css/.test(r.headers.get('content-type')) && !(await r.text()).includes('color-mix('), '/app-legacy.css is served, resolved'); }

console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
