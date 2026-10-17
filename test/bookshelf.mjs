// Bookshelf API against real Postgres (run via npm test with TEST_DATABASE_URL). Intent mirrors docs/handoff/ACCEPTANCE.md B, C, F, G.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
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
ok(hk.days.length === 6 && hk.days[3].title.en === 'Playground morning, rooms of light', 'HK has 6 days; day 4 = Nickelodeon + teamLab (swapped plan)');
ok(hk.firsts.length === 10 && hk.theme.accent === '#1F3A5F' && hk.theme.kicker.includes('DOLPHIN'), 'HK firsts catalog + manual theme');
ok(s.trips[1].days.length === 16 && s.trips[1].theme.accent === '#2C5646', 'Australia 16 days + eucalyptus theme');
ok(s.children.map((k) => k.slug).join() === 'mimi,mika', 'children mimi, mika');
ok((await fetch(BASE + '/api/b/state')).status === 401, 'state needs login');

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
ok((await put('/api/b/entries/first-mickey-mimi', { trip: T, day: 1, kind: 'first', child: 'mimi', first_key: 'mickey' })).ok, 'first: Mimi met Mickey');
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
ok((await put('/api/b/firsts/hk-macau-2026/shoes', { emoji: '👟', label: { th: 'ใส่รองเท้าเองครั้งแรก', en: 'Put on own shoes' } })).ok
  && (await state()).trips[0].firsts.some((f) => f.key === 'shoes'), 'custom first added to this trip');
const nt = await fetch(BASE + '/api/b/trips', { method: 'POST', headers: H, body: JSON.stringify({ slug: 'chiang-mai-2027', title: { th: 'เชียงใหม่', en: 'Chiang Mai' }, date_from: '2027-08-10', date_to: '2027-08-13' }) });
s = await state();
ok(nt.ok && s.trips.find((t) => t.slug === 'chiang-mai-2027').days.length === 4, 'new trip from the app gets one page per day');
ok((await fetch(BASE + '/api/b/trips', { method: 'POST', headers: H, body: JSON.stringify({ slug: 'chiang-mai-2027', title: 'x', date_from: '2027-08-10', date_to: '2027-08-13' }) })).status === 409, 'duplicate trip slug → 409');
ok((await fetch(BASE + '/api/b/trips', { method: 'POST', headers: H, body: JSON.stringify({ slug: 'bad-dates', title: 'x', date_from: '2027-08-13', date_to: '2027-08-10' }) })).status === 400, 'end before start → 400');

// re-sync seeds (= every boot): keeps Done, never touches app-made trips
await BS.syncSeeds(pool);
s = await state();
ok(s.trips[0].days[0].done_at > 0 && s.trips.some((t) => t.slug === 'chiang-mai-2027'), 'seed re-sync keeps Done and app-made trips');

// ---- PDPA export + real delete
const ex = await (await fetch(BASE + '/api/b/export.json', { headers: { cookie: ck } })).json();
ok(ex.entries.length >= 3 && ex.media.length === 1 && !ex.media.some((m) => m.family_id === 'other'), 'export has only this family\'s data');
ok((await fetch(BASE + '/api/b/export.json', { headers: { cookie: vck } })).status === 403, 'viewer cannot export');
const stored = path.join(DATA_DIR, 'media', 'p', T, 'ph-test-0001.jpg');
ok(fs.existsSync(stored), 'photo object in storage');
ok((await fetch(BASE + '/api/b/media/ph-test-0001', { method: 'DELETE', headers: H })).ok && !fs.existsSync(stored)
  && !fs.existsSync(path.join(DATA_DIR, 'media', 't', T, 'ph-test-0001.jpg')), 'deleting a photo removes the stored files too');
await pool.end();

console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
