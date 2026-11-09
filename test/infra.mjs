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
  const src = ['core', 'views', 'sheets', 'kid'].map((f) => fs.readFileSync(path.resolve(`public/${f}.js`), 'utf8')).join('\n') + fs.readFileSync(path.resolve('public/index.html'), 'utf8');
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
// served by the running app: a missing stock file is a 404 (never the app page), the index is not cached for long, nothing needs sign-in
if (process.env.BASE) {
  const r = await fetch(process.env.BASE + '/stock/jp/tokyo/nope.v1.svg');
  ok(r.status === 404 && !/<html/i.test(await r.text()), '/stock: a missing picture is a 404, not the app page');
  const ix = await fetch(process.env.BASE + '/stock/index.json');
  ok(ix.status === 200 && /no-cache/.test(ix.headers.get('cache-control') || '') && Array.isArray((await ix.json()).items), '/stock/index.json is served, revalidated each time');
}

console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
