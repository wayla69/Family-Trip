// Bookshelf API against real Postgres (run via npm test with TEST_DATABASE_URL). Intent mirrors docs/handoff/ACCEPTANCE.md B, C, F, G.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { Pool } = require('pg');
const BS = require('../server/bookshelf.js');

const { BASE, CODE, DATA_DIR } = process.env;
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('bookshelf api');

const login = async () => (await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: CODE, name: 'แม่' }) })).headers.get('set-cookie').split(';')[0];
const ck = await login();
const vck = (await fetch(BASE + '/v/grandma', { redirect: 'manual' })).headers.get('set-cookie').split(';')[0];
const H = { 'x-mb': '1', cookie: ck, 'content-type': 'application/json' };
const put = (u, b, h = H) => fetch(BASE + u, { method: 'PUT', headers: h, body: JSON.stringify(b) });
const state = async (c = ck) => (await fetch(BASE + '/api/b/state', { headers: { cookie: c } })).json();
const T = 'hk-macau-2026';

// ---- seeds
let s = await state();
ok(s.trips.map((t) => t.slug).join() === 'hk-macau-2026,big-hop-2027', 'shelf: HK then Australia (chronological)');
const hk = s.trips[0];
ok(hk.days.length === 6 && hk.days[3].title.en === 'Rooms of light, Senado at dusk' && hk.days[4].title.en === 'Playground morning, a slow day', 'HK has 6 days; revised plan: teamLab + Senado Tue, playground Wed');
ok(hk.passport.days.length === 6 && hk.passport.guides.length === 2 && s.trips[1].passport.days.length === 16, 'kids’ adventure passport content for both trips (guides, a mission per day)');
ok(!JSON.stringify(s.trips.map((t) => t.passport)).match(/e-ticket|\b\d{3}-\d{10}\b|[A-Z]{2}\d{7}/), 'passport content has no ticket / passport numbers');
ok(hk.firsts.length === 10 && hk.theme.accent === '#1F3A5F' && hk.theme.kicker.includes('DOLPHIN'), 'HK firsts catalog + manual theme');
ok(s.trips[1].days.length === 16 && s.trips[1].theme.accent === '#2C5646', 'Australia 16 days + eucalyptus theme');
{ const age = (t, k) => t.theme.children.find((c) => c.slug === k).age;   // Mimi born Nov 2023, Mika May 2025 (only the month is kept)
  ok(age(hk, 'mimi').th === '3 ขวบ' && age(hk, 'mika').en === '1½' && age(s.trips[1], 'mimi').th === '3 ขวบ 4 เดือน' && age(s.trips[1], 'mika').en === '1 y 10 m', 'ages at each trip: HK Mimi 3 · Mika 1½; Australia Mimi 3 y 4 m · Mika 1 y 10 m');
  ok(!/Mimi \(3\.5\)|Mika \(1\.8\)|3\.5-year-old/.test(JSON.stringify(s.trips[1])), 'no stale ages left in the Australia book'); }
{ const n = hk.info, dp = hk.days.map((d) => d.plan || {});
  ok(n.visa && n.ifthen.rows.length === 10 && n.ifthen.book.rows.length === 8 && n.more.length >= 20 && n.more.every((m) => ['prep', 'sos', 'stays', 'learn'].includes(m.page) && m.title.th && m.title.en) && n.more.some((m) => /minute by minute/.test(m.title.en) && m.rows.length >= 10), 'HK manual in full: entry rules, 10 if-thens, booking timeline, Disneyland minute by minute and the other chapters');
  ok(dp.every((p) => (p.eat || []).length && p.eat.every((e) => e.q && e.note.th && e.note.en)) && dp.every((p) => p.money), 'HK: every day has its places to eat (with Maps) and money today'); }
ok(s.trips[1].firsts.length === 11 && s.trips[1].firsts.some((f) => f.key === 'koala' && f.label.th && f.label.en), 'Australia has its own firsts to record (kangaroo, koala, dolphins…)');
ok(s.children.map((k) => k.slug).join() === 'mimi,mika', 'children mimi, mika');
ok((await fetch(BASE + '/api/b/state')).status === 401, 'state needs login');
{ // the app's lite state: guide text left out and named by a hash, fetched once from /api/b/seed; 304 when nothing changed
  const r = await fetch(BASE + '/api/b/state?lite=1', { headers: { cookie: ck, 'accept-encoding': 'identity' } });
  const lite = await r.json(), tag = r.headers.get('etag'), full = JSON.stringify(s).length, small = JSON.stringify(lite).length;
  ok(lite.trips.every((t) => t.seed && t.info === undefined && t.passport === undefined && t.days.every((d) => !('plan' in d))) && small * 5 < full,
    `lite state leaves out each book's guide text (${Math.round(small / 1024)} KB vs ${Math.round(full / 1024)} KB)`);
  const g = await (await fetch(`${BASE}/api/b/seed/${T}/${lite.trips[0].seed}`, { headers: { cookie: ck } })).json();
  ok(JSON.stringify(g.info) === JSON.stringify(hk.info) && JSON.stringify(g.passport) === JSON.stringify(hk.passport) && JSON.stringify(g.plans) === JSON.stringify(hk.days.map((d) => d.plan)),
    'the seed by its hash is exactly the guide text the full state carries');
  const sr = await fetch(`${BASE}/api/b/seed/${T}/${lite.trips[0].seed}`, { headers: { cookie: ck } });
  ok(/immutable/.test(sr.headers.get('cache-control')) && /private/.test(sr.headers.get('cache-control')), 'a seed is cached for good, privately');
  ok((await fetch(`${BASE}/api/b/seed/${T}/nothash`, { headers: { cookie: ck } })).status === 409 && (await fetch(`${BASE}/api/b/seed/${T}/${lite.trips[0].seed}`)).status === 401
    && (await fetch(`${BASE}/api/b/seed/nope/${lite.trips[0].seed}`, { headers: { cookie: ck } })).status === 404, 'seed: stale hash 409, needs login, unknown trip 404');
  ok(tag && (await fetch(BASE + '/api/b/state?lite=1', { headers: { cookie: ck, 'if-none-match': tag } })).status === 304, 'same state again → 304 with no body');
  await put(`/api/b/days/${T}/5`, { done: true });
  const r2 = await fetch(BASE + '/api/b/state?lite=1', { headers: { cookie: ck, 'if-none-match': tag } });
  ok(r2.status === 200 && r2.headers.get('etag') !== tag, 'any change → a new etag and the full answer');
  await put(`/api/b/days/${T}/5`, { done: false });
}
{ const r = await fetch(BASE + '/sw.js'), t = await r.text();
  ok(/const V = 'mbs-v\d+-[0-9a-f]{10}'/.test(t) && /no-cache/.test(r.headers.get('cache-control')), 'sw.js cache name carries a hash of public/ (a changed shell file always ships a new service worker)'); }

// ---- entries
ok((await put('/api/b/entries/q-test-0001', { trip: T, day: 1, kind: 'quote', child: 'mika', text: 'ปลาอยู่ในน้ำเหมือนหนูเลย', at: Date.now() })).ok, 'quote saved');
ok((await put('/api/b/entries/q-test-0001', { trip: T, day: 1, kind: 'quote', child: 'mika', text: 'ปลาอยู่ในน้ำเหมือนหนูเลย', at: Date.now() })).ok, 'same quote retried (offline queue) → still one row');
await put(`/api/b/entries/${T}.mood.d1.mimi`, { trip: T, day: 1, kind: 'mood', child: 'mimi', mood: '😄' });
await put(`/api/b/entries/${T}.mood.d1.mimi`, { trip: T, day: 1, kind: 'mood', child: 'mimi', mood: '🤩' });
s = await state();
const moods = s.entries.filter((e) => e.kind === 'mood' && e.day === 1 && e.child === 'mimi');
ok(moods.length === 1 && moods[0].mood === '🤩', 'mood: one per child per day, last tap wins');
ok(s.entries.filter((e) => e.id === 'q-test-0001').length === 1 && s.entries.find((e) => e.id === 'q-test-0001').mine, 'quote stored once, marked mine');
ok((await fetch(BASE + `/api/b/entries/${T}.mood.d1.mimi`, { method: 'DELETE', headers: H })).ok && !(await state()).entries.some((e) => e.kind === 'mood'), 'tap again clears the mood');
ok((await put('/api/b/entries/story-all-01', { trip: T, day: null, kind: 'story', lang: 'th', text: 'กาลครั้งหนึ่ง…' })).ok, 'whole-trip story (day = null)');
// passport ticks (mission spots / checklists, per child) and Explorer ID answers
ok((await put(`/api/b/entries/${T}.tick.spot.d1.tower.mimi`, { trip: T, day: 1, kind: 'tick', child: 'mimi', first_key: 'spot.d1.tower' })).ok, 'tick: Mimi spotted the castle tower on day 2');
ok((await put(`/api/b/entries/${T}.tick.tucker.eggtart.mika`, { trip: T, day: null, kind: 'tick', child: 'mika', first_key: 'tucker.eggtart', text: 'yum' })).ok, 'tick: food list item, no day, YUM');
ok((await put(`/api/b/entries/${T}.field.superpower.mimi`, { trip: T, day: null, kind: 'field', child: 'mimi', first_key: 'superpower', text: 'วิ่งเร็วมาก' })).ok, 'field: Explorer ID answer saved');
ok((await put('/api/b/entries/tick-bad-0001', { trip: T, day: null, kind: 'tick', child: 'both', first_key: 'animals.cat' })).status === 400, 'tick needs one child (not "both")');
ok((await put(`/api/b/entries/${T}.tick.dimsum.hargau.mimi`, { trip: T, day: null, kind: 'tick', child: 'mimi', first_key: 'dimsum.hargau', text: '3' })).ok, 'tick: 3 stars on the dim sum card');
ok((await put('/api/b/entries/tick-bad-0004', { trip: T, day: null, kind: 'tick', child: 'mimi', first_key: 'dimsum.hargau', text: '4' })).status === 400, 'no 4th star');
ok((await put('/api/b/entries/tick-bad-0002', { trip: T, day: null, kind: 'tick', child: 'mimi', first_key: 'animals.cat', text: 'maybe' })).status === 400, 'tick text is only "", yum or yuck');
ok((await put('/api/b/entries/tick-bad-0003', { trip: T, day: null, kind: 'quote', child: 'mimi', text: 'x' })).status === 400, 'quotes still need a day');
s = await state();
ok(s.entries.filter((e) => e.kind === 'tick').length === 3 && s.entries.find((e) => e.kind === 'field').text === 'วิ่งเร็วมาก', 'state returns ticks + fields');
ok((await put('/api/b/entries/first-mickey-mimi',{ trip: T, day: 1, kind: 'first', child: 'mimi', first_key: 'mickey' })).ok, 'first: Mimi met Mickey');
ok((await put('/api/b/entries/bad-kind-01', { trip: T, day: 1, kind: 'photo' })).status === 400, 'unknown kind → 400');
ok((await put('/api/b/entries/bad-kid-01', { trip: T, day: 1, kind: 'quote', child: 'bob', text: 'x' })).status === 400, 'unknown child → 400');
ok((await put('/api/b/entries/bad-day-01', { trip: T, day: 6, kind: 'quote', child: 'mimi', text: 'x' })).status === 400, 'day outside the trip → 400');
ok((await put('/api/b/entries/bad-day-02', { trip: T, day: null, kind: 'quote', child: 'mimi', text: 'x' })).status === 400, 'only stories may skip the day');
ok((await put('/api/b/entries/bad-trip-01', { trip: 'nope', day: 0, kind: 'quote', child: 'mimi', text: 'x' })).status === 400, 'unknown trip → 400');
ok((await put('/api/b/entries/q-test-0001', { trip: T, day: 1, kind: 'note', text: 'hijack' })).status === 409, 'id reused for another kind → 409');
ok((await put('/api/b/entries/q-test-0002', { trip: T, day: 1, kind: 'quote', child: 'mimi', text: 'x' }, { cookie: ck, 'content-type': 'application/json' })).status === 400, 'write without x-mb header → 400');
ok((await put('/api/b/entries/q-view-0001', { trip: T, day: 1, kind: 'quote', child: 'mimi', text: 'x' }, { ...H, cookie: vck })).status === 403, 'viewer write → 403');
ok((await state(vck)).trips.length === 2, 'viewer can read the shelf');

// ---- photos
const raw = await sharp({ create: { width: 3200, height: 2400, channels: 3, background: '#3b82f6' } })
  .withExif({ IFD0: { Make: 'GPSCam' }, IFD3: { GPSLatitudeRef: 'N', GPSLatitude: '22/1 21/1 0/1', GPSLongitudeRef: 'E', GPSLongitude: '114/1 4/1 0/1' } }).jpeg().toBuffer();
const up = (id, q = `trip=${T}&day=1`, h = { 'x-mb': '1', cookie: ck }) => fetch(`${BASE}/api/b/media/${id}?${q}`, { method: 'PUT', headers: { ...h, 'content-type': 'image/jpeg' }, body: raw });
const r1 = await (await up('ph-test-0001')).json();
ok(r1.ok && r1.w === 2560, 'photo uploaded and resized to 2560 px');
ok((await (await up('ph-test-0001')).json()).dup === true, 'same photo id retried → dup, not stored twice');
ok((await up('ph-view-0001', `trip=${T}&day=1`, { 'x-mb': '1', cookie: vck })).status === 403, 'viewer cannot upload');
ok((await up('ph-bad-00001', 'trip=nope&day=1')).status === 400, 'upload to unknown trip → 400');
const full = Buffer.from(await (await fetch(BASE + '/media/ph-test-0001', { headers: { cookie: ck } })).arrayBuffer());
const thumb = Buffer.from(await (await fetch(BASE + '/media/ph-test-0001/t', { headers: { cookie: vck } })).arrayBuffer());
const fm = await sharp(full).metadata(), tm = await sharp(thumb).metadata();
ok(fm.width === 2560 && tm.width === 520, 'full + thumbnail served (viewer can see photos)');
ok(!fm.exif && !tm.exif && !full.includes('GPSCam'), 'no EXIF/GPS in stored photo');
ok((await fetch(BASE + '/media/ph-test-0001')).status === 401, 'photo needs login');
ok((await fetch(BASE + '/media/ph-nope-0001', { headers: { cookie: ck } })).status === 404, 'unknown photo → 404');
ok((await fetch(BASE + '/api/b/media/ph-test-0001', { method: 'PATCH', headers: H, body: JSON.stringify({ caption: 'ที่ท่าเรือ', highlight: true }) })).ok, 'caption + ⭐');
s = await state();
ok(s.media.length === 1 && s.media[0].highlight && s.media[0].caption === 'ที่ท่าเรือ' && s.media[0].day === 1, 'photo listed with caption, ⭐ and day');
// voice memos: kept as recorded, served with byte ranges (Safari), no thumbnail, their mime in the state
const clipBuf = Buffer.alloc(4096, 7);
const upA = (id, type = 'audio/webm', h = { 'x-mb': '1', cookie: ck }) => fetch(`${BASE}/api/b/media/${id}?trip=${T}&day=1&kind=audio`, { method: 'PUT', headers: { ...h, 'content-type': type }, body: clipBuf });
ok((await (await upA('vc-test-0001')).json()).ok && (await state()).media.some((m) => m.id === 'vc-test-0001' && m.mime === 'audio/webm' && m.w === 0 && m.day === 1), 'voice memo uploaded (audio/webm), listed with its mime');
const ar = await fetch(BASE + '/media/vc-test-0001', { headers: { cookie: ck, range: 'bytes=0-1023' } });
ok(ar.status === 206 && (ar.headers.get('content-type') || '').startsWith('audio/webm') && ar.headers.get('content-range') === 'bytes 0-1023/4096' && (await ar.arrayBuffer()).byteLength === 1024, 'voice memo streams with byte ranges (206 + Content-Range)');
ok((await fetch(BASE + '/media/vc-test-0001', { headers: { cookie: ck } })).status === 200 && (await fetch(BASE + '/media/vc-test-0001/t', { headers: { cookie: ck } })).status === 404, 'whole clip → 200; a clip has no thumbnail');
ok((await upA('vc-bad-00001', 'text/plain')).status === 415 && (await upA('vc-view-0001', 'audio/webm', { 'x-mb': '1', cookie: vck })).status === 403, 'not an audio type → 415; viewer cannot record');
ok((await fetch(BASE + '/api/b/media/vc-test-0001', { method: 'DELETE', headers: H })).ok && !(await state()).media.some((m) => m.id === 'vc-test-0001') && (await fetch(BASE + '/media/vc-test-0001', { headers: { cookie: ck } })).status === 404, 'voice memo deleted, file gone');

// IDOR: a photo row of another family is never served
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
await pool.query("INSERT INTO families (id, name) VALUES ('other', 'Other') ON CONFLICT DO NOTHING");
await pool.query("INSERT INTO trips (id, family_id, slug, title, date_from, date_to) VALUES ('other-trip', 'other', 'other-trip', '{}', '2026-01-01', '2026-01-02') ON CONFLICT DO NOTHING");
await pool.query("INSERT INTO media (id, family_id, trip_id, storage_key) VALUES ('ph-other-001', 'other', 'other-trip', 'p/other-trip/ph-other-001.jpg')");
// the object really exists where our own lookup would find it, so a 404 proves the family check — not a missing file
fs.mkdirSync(path.join(DATA_DIR, 'media', 'p', 'other-trip'), { recursive: true });
fs.writeFileSync(path.join(DATA_DIR, 'media', 'p', 'other-trip', 'ph-other-001.jpg'), full);
ok((await fetch(BASE + '/media/ph-other-001', { headers: { cookie: ck } })).status === 404, "another family's photo id → 404 (IDOR)");
ok((await up('ph-other-001')).status === 409, "can't overwrite another family's photo id");

// ---- check-ins, days, firsts, trips
ok((await put('/api/b/places', { trip: T, key: 'Hong Kong Disneyland', day: 1, kind: 'place', name: { en: 'Hong Kong Disneyland', th: 'ฮ่องกงดิสนีย์แลนด์' } })).ok, 'check in at Disneyland');
await put('/api/b/places', { trip: T, key: 'Hong Kong Disneyland', day: 1 });
ok((await state()).places.filter((p) => p.key === 'Hong Kong Disneyland').length === 1, 'check-in is idempotent');
await put('/api/b/places', { trip: T, key: 'Hong Kong Disneyland', done: false });
ok(!(await state()).places.length, 'check-in can be undone');
ok((await put(`/api/b/days/${T}/0`, { done: true })).ok && (await state()).trips[0].days[0].done_at > 0, 'day 1 marked Done');
// what we actually spent: a row per thing, typed in on the record page (editors), idempotent by id, validated, deletable
const sp = { trip: T, day: 1, amount: 268, cur: 'mop', cat: 'tickets', note: 'Nickelodeon Town' };
ok((await put(`/api/b/spend/${T}.sp.0001`, sp)).ok && (await state()).spend.some((x) => x.id === `${T}.sp.0001` && x.amount === 268 && x.cur === 'MOP' && x.cat === 'tickets' && x.note === 'Nickelodeon Town' && x.day === 1), 'spend saved (amount, currency upper-cased, category, note)');
ok((await put(`/api/b/spend/${T}.sp.0001`, { ...sp, amount: 300.5 })).ok && (await state()).spend.filter((x) => x.id === `${T}.sp.0001`).map((x) => x.amount).join() === '300.5', 'same id → updated, not duplicated');
ok((await put(`/api/b/spend/${T}.sp.bad1`, { ...sp, cat: 'casino' })).status === 400 && (await put(`/api/b/spend/${T}.sp.bad2`, { ...sp, amount: -5 })).status === 400
  && (await put(`/api/b/spend/${T}.sp.bad3`, { ...sp, cur: 'dollars' })).status === 400 && (await put(`/api/b/spend/${T}.sp.bad4`, { ...sp, day: 99 })).status === 400, 'spend: unknown category, negative amount, bad currency or day → 400');
ok((await fetch(BASE + `/api/b/spend/${T}.sp.0001`, { method: 'DELETE', headers: H })).ok && !(await state()).spend.length, 'spend deleted');
const nt = await fetch(BASE + '/api/b/trips', { method: 'POST', headers: H, body: JSON.stringify({ slug: 'chiang-mai-2027', title: { th: 'เชียงใหม่', en: 'Chiang Mai' }, date_from: '2027-08-10', date_to: '2027-08-13' }) });
s = await state();
ok(nt.ok && s.trips.find((t) => t.slug === 'chiang-mai-2027').days.length === 4, 'new trip from the app gets one page per day');
ok((await fetch(BASE + '/api/b/trips', { method: 'POST', headers: H, body: JSON.stringify({ slug: 'chiang-mai-2027', title: 'x', date_from: '2027-08-10', date_to: '2027-08-13' }) })).status === 409, 'duplicate trip slug → 409');
ok((await fetch(BASE + '/api/b/trips', { method: 'POST', headers: H, body: JSON.stringify({ slug: 'bad-dates', title: 'x', date_from: '2027-08-13', date_to: '2027-08-10' }) })).status === 400, 'end before start → 400');

// re-sync seeds (= every boot): keeps Done, never touches app-made trips
await BS.syncSeeds(pool);
s = await state();
ok(s.trips[0].days[0].done_at > 0 && s.trips.some((t) => t.slug === 'chiang-mai-2027'), 'seed re-sync keeps Done and app-made trips');

// ---- the day's plan from the seed (manual's day card) is in the state, never bookings
{
  const hk = (await state()).trips.find((t) => t.id === T), p3 = hk.days[3].plan;
  ok(p3.plan.length === 10 && p3.plan[2].t === '11:00' && /teamLab/.test(p3.plan[2].en) && p3.pick && p3.planB && /MOP 784/.test(p3.money.en), 'day 4 plan (manual card): 10 timed steps, teamLab at 11:00, local pick, plan B, money');
  ok(hk.days.every((d) => d.plan && d.plan.plan && d.plan.plan.length) && hk.days.every((d) => !/(booking|PNR|confirmation)[^"]{0,20}\b(?=[A-Z]*\d)[A-Z0-9]{6}\b|\b(?=[A-Z]*\d)[A-Z0-9]{6}\b[^"]{0,20}(booking|PNR|confirmation)/i.test(JSON.stringify(d.plan))), 'every HK day has a plan; no booking references');
  ok(hk.days[0].plan.stay && /Pak Yan Road/.test(hk.days[0].plan.stay.addr) && hk.info.emergency[0].tel === '999' && hk.info.stays.length === 2 && hk.info.prices.rows.length >= 5, 'HK: tonight\'s stay with address, pocket guide (999, 2 stays, prices)');
  // Australia, imported from the owner's trip artifact: every day planned, nearby food, learn cards, quiz, pocket guide, Aussie words
  const au = (await state()).trips.find((t) => t.id === 'big-hop-2027'), a2 = au.days[1].plan;
  ok(au.days.every((d) => d.plan.plan.length >= 4) && a2.plan.length === 9 && a2.plan[3].t === '11:20' && /Bald Hill/.test(a2.plan[3].en) && a2.plan[3].note, 'AU: 16 timed days; day 2 has 9 steps with notes');
  { const whole = (t) => t.days.every((d) => { const x = d.plan.tale; return x && x.scenes.length >= 3 && x.scenes.every((s) => s.e && s.h.th && s.h.en) && x.scenes.map((s) => s.en).join(' ') === x.en && x.scenes.map((s) => s.th).join(' ').replace(/\s+/g, ' ') === x.th.replace(/\s+/g, ' '); });
    ok(whole(au) && whole(hk), 'both books: a guide’s story every day, cut into scenes (emoji + heading) that keep the story’s own words'); }
  ok(/Waldegrave/.test(a2.stay.addr) && /google\.com\/maps/.test(a2.route) && a2.eat.length === 26 && a2.learn.length >= 3 && a2.quiz.length === 3 && a2.moving.en === '2 h 55 in 3 legs', 'AU day 2: stay + address, maps route, 26 places to eat, learn cards, 3 quiz questions, moving summary');
  // nothing abbreviated: every leg with its directions link, the meal picks with what to order + a backup, the food along the route by stop
  ok(a2.legs.length === 3 && a2.legs[0].from === 'Sydney Airport' && a2.legs[0].to === 'Bald Hill Lookout' && a2.legs[0].min === 50 && /maps\/dir\/.*travelmode=driving/.test(a2.legs[0].url), 'AU day 2: 3 drive legs, each with Google Maps directions');
  ok(a2.picks.length === 3 && a2.picks[0].name === 'Fish Vibes' && /barramundi/.test(a2.picks[0].what.en) && a2.picks[0].alt.q.includes('Kiama') && a2.food.length === 6 && a2.food.every((f) => f.items.every((x) => x.q && x.what.en)), 'AU day 2: 3 meal picks (what + backup) and food by stop, every place with a maps query');
  ok(au.days.slice(1, 15).every((d) => d.plan.picks.length >= 3 && d.plan.food.length >= 2) && au.days.every((d) => d.plan.legs.length && d.plan.legs.every((g) => g.url || /TG /.test(g.by.en))), 'AU: picks + food every touring day; every non-flight leg has directions');
  ok([...au.days, ...hk.days].every((d) => d.planned.every((p) => p.q && p.q.length > 6)), 'every planned stop and meal in both books has a full Google Maps query');
  ok(hk.days.every((d) => d.plan.legs.length && d.plan.legs.every((g) => /maps\/dir\//.test(g.url) || (!g.url && /TG 63[89]/.test(JSON.stringify(g.by))))) && /香港馬灣/.test(hk.info.stays[0].addr) && /挪亞方舟度假酒店/.test(hk.info.stays[0].addr), 'HK: every leg has directions (flights excepted); stays carry the Chinese name and address for drivers');
  const n = au.info;
  ok(n.drive.legs.length === 28 && n.car.rows.length >= 8 && n.kit.rows.length === 8 && n.ifthen.rows.length === 11 && n.ifthen.mishap.rows.length === 9 && n.ifthen.carry.rows.length === 10 && n.ifthen.crowd.rows.length === 11 && n.ifthen.book.rows.length === 13 && n.visa.groups.length === 4 && n.bio.groups.length === 2 && n.eatRules.rules.length === 4,
    'AU pocket guide complete: 28 drive legs, the van, kitchens, if-then + mishaps + who carries what + crowds + book-ahead, visa, biosecurity, eating rules');
  ok(/AUD 1,375/.test(JSON.stringify(n.car)) && !/฿|THB/.test(JSON.stringify(n.car)), 'AU van: the rental price in AUD (owner\'s call, 18 Oct 2026), never in baht');
  const rs = n.restaurants, rItems = rs.groups.flatMap((g) => g.items);
  ok(rs.groups.length === 26 && rItems.length === 294 && rs.kinds.length === 3 && rItems.every((x) => x.q && x.name && x.what.th && x.what.en) && rItems.filter((x) => x.pick).length === 61, 'AU "Where to eat": 26 areas, 294 places (3 kinds), each with Thai + English and a maps query; 61 picks');
  ok(hk.info.restaurants.groups.length === 21 && hk.info.restaurants.groups.flatMap((g) => g.items).length === 224 && hk.info.restaurants.groups.flatMap((g) => g.items).every((x) => x.q && x.what.th && x.what.en && [0, 1, 2].includes(x.kind)), 'HK manual Part 12 "Restaurant guide": 21 sections, 223 places, Thai + English, a maps query each');
  ok(hk.days.every((d) => d.wx && (d.plan.learn || []).length >= 2 && (d.plan.quiz || []).length >= 3 && /^https:\/\/www\.google\.com\/maps\/dir\/\?api=1&origin=.+&destination=.+&travelmode=driving$/.test(d.plan.route)) && hk.info.wild.length >= 10 && hk.info.wild.some((w) => /Mickey/.test(w.name.en)) && hk.info.wildLabel.short.th, 'HK: weather, learn cards, quiz and a whole-day route every day; animals + Disney characters under their own label');
  ok(au.days.every((d) => d.plan.money && /A\$/.test(d.plan.money.en) && !/฿|THB|baht/i.test(JSON.stringify(d.plan.money)) && d.plan.pick) && au.passport.declaration.counts.length === 6, 'AU: money today in AUD (never baht) and a local pick on all 16 days; kids\' customs declaration in the passport');
  ok(au.info.emergency.some((e) => e.tel === '000' && e.main) && au.info.stays.length === 8 && au.info.pack.length === 4 && au.info.general.length === 4 && au.info.wild.length === 10 && au.info.prices.rows.length === 9 && au.info.more.some((m) => /Budget/.test(m.title.en) && m.table.rows.length >= 10), 'AU pocket guide: 000, 8 stays, packing, learn-in-the-car, animals, prices, AUD budget');
  ok(au.passport.lists[0].key === 'words' && au.passport.lists[0].said && au.passport.lists[0].groups[0].items.length === 8 && au.passport.lists[0].groups[0].items[0].speak.lang === 'en-AU', 'AU passport: "Say It Like an Aussie" words list (en-AU)');
  const all = JSON.stringify(await state());
  const KNOWN = new Set(['434fc7c1d7b2fc33', '331e521aaaa8230a', '003c189251bbdfec']);   // SHA-256 prefixes of the real references (same list as scripts/plan-to-seed.mjs) — the values never sit in this public repo
  const h16 = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
  ok(!(all.match(/\b[A-Z0-9]{6,16}\b/g) || []).some((m) => KNOWN.has(h16(m))) && !/"conf"|booking ref|฿/.test(all) && !/______/.test(all), 'privacy: no booking refs, confirmation numbers, costs or blank passport fields anywhere in the state');
}

// ---- travel notebook: one review per stay / restaurant / place per trip
const rev = { trip: T, day: 3, kind: 'food', key: 'Wong Chi Kei, Senado Square', name: { th: 'Wong Chi Kei', en: 'Wong Chi Kei' }, rating: 5, tags: ['kidsate', 'fast', 'bogus tag!'], kids: { mimi: 'love', mika: 'ok' }, again: true, note: 'บะหมี่เกี๊ยว เด็กกินหมดชาม' };
ok((await put('/api/b/reviews/hk-macau-2026.rev.food.wong-chi-kei', rev)).ok, 'review saved (food, 5 stars, tags, kids, again, note)');
let rv = (await state()).reviews.find((r) => r.id === 'hk-macau-2026.rev.food.wong-chi-kei');
ok(rv && rv.rating === 5 && rv.tags.join() === 'kidsate,fast' && rv.kids.mimi === 'love' && rv.again === true && rv.day === 3 && rv.at > 0, 'review in the state; a malformed tag is dropped');
ok((await put('/api/b/reviews/hk-macau-2026.rev.food.wong-chi-kei', { ...rev, rating: 2, again: false, note: 'คิวยาว' })).ok && (await state()).reviews.filter((r) => r.key === rev.key).length === 1 && (await state()).reviews.find((r) => r.key === rev.key).rating === 2, 'same id again = update, not a second row');
ok((await put('/api/b/reviews/hk-macau-2026.rev.food.other-id', rev)).status === 409, 'same trip + kind + key under another id → 409');
ok((await put('/api/b/reviews/hk-macau-2026.rev.food.bad', { ...rev, key: 'x', rating: 7 })).status === 400 && (await put('/api/b/reviews/hk-macau-2026.rev.food.bad2', { ...rev, key: 'y', kind: 'hotel' })).status === 400 && (await put('/api/b/reviews/hk-macau-2026.rev.food.bad3', { ...rev, key: 'z', kids: { nobody: 'love' } })).status === 400, 'rating 1–5, kind stay/food/place, kids must exist');
ok((await put('/api/b/reviews/hk-macau-2026.rev.stay.x', { ...rev, kind: 'stay', key: 'Studio City Hotel', rating: null, tags: [], kids: {}, again: null, note: '' })).ok, 'a review may hold just a name (rating null) — filled in later');
ok((await put('/api/b/reviews/v-rev-0001', rev, { 'x-mb': '1', cookie: vck, 'content-type': 'application/json' })).status === 403, 'viewers cannot review');
ok((await fetch(BASE + '/api/b/reviews/hk-macau-2026.rev.stay.x', { method: 'DELETE', headers: H })).ok && !(await state()).reviews.some((r) => r.id === 'hk-macau-2026.rev.stay.x'), 'review deleted');

// ---- hearts from the family: relatives on the view link may send one (text only), not edit anything else
const VH = { 'x-mb': '1', cookie: vck, 'content-type': 'application/json' };
const heart = { trip: T, day: null, child: 'mimi', emoji: '💗', text: 'คิดถึงนะ', from: 'ยาย' };
ok((await put('/api/b/hearts/h-test-0001', heart, VH)).ok, 'viewer (grandma) sends Mimi a heart');
ok((await put('/api/b/hearts/h-test-0001', heart, VH)).ok && (await state(vck)).hearts.length === 1, 'sending the same heart again is a no-op (offline retry)');
const hs = (await state(vck)).hearts[0];
ok(hs.from === 'ยาย' && hs.child === 'mimi' && hs.mine === true && hs.at > 0 && !('created_uid' in hs), 'heart in the state, marked as mine, no sender id leaked');
ok((await put('/api/b/hearts/h-test-0002', { ...heart, emoji: '<script>' }, VH)).status === 400, 'only the six heart emoji');
ok((await put('/api/b/hearts/h-test-0002', { ...heart, from: '  ' }, VH)).status === 400, 'a sender name is required');
ok((await put('/api/b/hearts/h-test-0002', { ...heart, child: 'nobody' }, VH)).status === 400, 'unknown child → 400');
ok((await put('/api/b/hearts/h-test-0002', heart, { ...VH, 'x-mb': '' })).status === 400, 'heart without the x-mb header → 400 (CSRF)');
ok((await put('/api/b/hearts/h-test-0003', { ...heart, child: 'both', text: 'x'.repeat(500) }, VH)).ok && (await state()).hearts.find((h) => h.id === 'h-test-0003').text.length === 140, 'long notes are cut to 140 characters');
ok((await put('/api/b/entries/v-try-0001', { trip: T, day: 0, kind: 'quote', child: 'mimi', text: 'x' }, VH)).status === 403, 'viewers still cannot write anything else');
ok((await fetch(BASE + '/api/b/hearts/h-test-0003', { method: 'DELETE', headers: H })).ok, 'grown-ups may remove any heart');
const vck2 = (await fetch(BASE + '/v/grandma', { redirect: 'manual' })).headers.get('set-cookie').split(';')[0];
ok((await fetch(BASE + '/api/b/hearts/h-test-0001', { method: 'DELETE', headers: { ...VH, cookie: vck2 } })).status === 404, "another relative's phone cannot remove grandma's heart");
let capped = 0;
for (let n = 0; n < 41 && !capped; n++) { const r = await put(`/api/b/hearts/h-cap-${String(n).padStart(4, '0')}`, heart, { ...VH, cookie: vck2 }); if (r.status === 429) capped = n; }
ok(capped === 40, 'one phone can send 40 hearts a day, then 429');

// ---- PDPA export + real delete
const ex = await (await fetch(BASE + '/api/b/export.json', { headers: { cookie: ck } })).json();
ok(ex.hearts.length >= 41 && ex.reviews.length === 1, 'export includes the hearts and the reviews');
ok(ex.entries.length >= 3 && ex.media.length === 1 && !ex.media.some((m) => m.family_id === 'other'), 'export has only this family\'s data');
ok((await fetch(BASE + '/api/b/export.json', { headers: { cookie: vck } })).status === 403, 'viewer cannot export');
const stored = path.join(DATA_DIR, 'media', 'p', T, 'ph-test-0001.jpg');
ok(fs.existsSync(stored), 'photo object in storage');
ok((await fetch(BASE + '/api/b/media/ph-test-0001', { method: 'DELETE', headers: H })).ok && !fs.existsSync(stored)
  && !fs.existsSync(path.join(DATA_DIR, 'media', 't', T, 'ph-test-0001.jpg')), 'deleting a photo removes the stored files too');
await pool.end();

console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
