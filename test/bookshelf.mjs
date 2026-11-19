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
ok(hk.days.length === 6 && hk.days[3].title.en === 'Rooms of light, Senado at dusk' && hk.days[4].title.en === 'Playground morning, slow afternoon', 'HK has 6 days; revised plan: teamLab + Senado Tue, playground Wed');
ok(hk.passport.days.length === 6 && hk.passport.guides.length === 2 && s.trips[1].passport.days.length === 16, 'kids’ adventure passport content for both trips (guides, a mission per day)');
ok(!JSON.stringify(s.trips.map((t) => t.passport)).match(/e-ticket|\b\d{3}-\d{10}\b|[A-Z]{2}\d{7}/), 'passport content has no ticket / passport numbers');
ok(hk.firsts.length === 10 && hk.theme.accent === '#1F3A5F' && hk.theme.kicker.includes('DOLPHIN'), 'HK firsts catalog + manual theme');
ok(s.trips[1].days.length === 16 && s.trips[1].theme.accent === '#2C5646', 'Australia 16 days + eucalyptus theme');
{ const age = (t, k) => t.theme.children.find((c) => c.slug === k).age;   // Mimi born Nov 2023, Mika May 2025 (only the month is kept)
  ok(age(hk, 'mimi').th === '3 ขวบ' && age(hk, 'mika').en === '1½' && age(s.trips[1], 'mimi').th === '3 ขวบ 4 เดือน' && age(s.trips[1], 'mika').en === '1 y 10 m', 'ages at each trip: HK Mimi 3 · Mika 1½; Australia Mimi 3 y 4 m · Mika 1 y 10 m');
  ok(!/Mimi \(3\.5\)|Mika \(1\.8\)|3\.5-year-old/.test(JSON.stringify(s.trips[1])), 'no stale ages left in the Australia book'); }
{ const n = hk.info, dp = hk.days.map((d) => d.plan || {});
  ok(n.visa && n.ifthen.rows.length === 10 && n.ifthen.book.rows.length === 8 && n.more.length >= 19 && n.more.every((m) => ['prep', 'sos', 'stays', 'learn'].includes(m.page) && m.title.th && m.title.en) && n.more.some((m) => /minute by minute/.test(m.title.en) && m.rows.length >= 10), 'HK manual in full: entry rules, 10 if-thens, booking timeline, Disneyland minute by minute and the other chapters');
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
ok((await state()).features.photoAi === false && (await fetch(BASE + '/api/b/photos/ai', { method: 'POST', headers: H, body: JSON.stringify({ trip: T, day: 1 }) })).status === 501, 'photos never go to Claude unless PHOTO_AI is switched on (501)');
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
// a photo may arrive with its place (the record page's "where was it?" chips); a plain upload has none; an over-long one is cut
ok((await up('ph-test-spot', `trip=${T}&day=1&place=${encodeURIComponent('  Hong Kong Disneyland ')}`)).ok && (await up('ph-test-spot2', `trip=${T}&day=1&place=${'x'.repeat(300)}`)).ok, 'upload with a place');
{ const m = (await state()).media; ok(m.find((x) => x.id === 'ph-test-spot').place === 'Hong Kong Disneyland' && m.find((x) => x.id === 'ph-test-spot2').place.length === 120 && m.find((x) => x.id === 'ph-test-0001').place === '', 'the place a photo was added under is kept (trimmed, at most 120 characters); a plain upload has none');
  ok((await fetch(BASE + '/api/b/media/ph-test-spot', { method: 'DELETE', headers: H })).ok && (await fetch(BASE + '/api/b/media/ph-test-spot2', { method: 'DELETE', headers: H })).ok, 'the place test photos are removed'); }
s = await state();
ok(s.media.length === 1 && s.media[0].highlight && s.media[0].caption === 'ที่ท่าเรือ' && s.media[0].day === 1, 'photo listed with caption, ⭐ and day');
// voice memos: kept as recorded, served with byte ranges (Safari), no thumbnail, their mime in the state
const clipBuf = Buffer.alloc(4096, 7);
const upA = (id, type = 'audio/webm', h = { 'x-mb': '1', cookie: ck }) => fetch(`${BASE}/api/b/media/${id}?trip=${T}&day=1&kind=audio`, { method: 'PUT', headers: { ...h, 'content-type': type }, body: clipBuf });
ok((await (await upA('vc-test-0001')).json()).ok && (await state()).media.some((m) => m.id === 'vc-test-0001' && m.mime === 'audio/webm' && m.w === 0 && m.day === 1), 'voice memo uploaded (audio/webm), listed with its mime');
const ar = await fetch(BASE + '/media/vc-test-0001', { headers: { cookie: ck, range: 'bytes=0-1023' } });
ok(ar.status === 206 && (ar.headers.get('content-type') || '').startsWith('audio/webm') && ar.headers.get('content-range') === 'bytes 0-1023/4096' && (await ar.arrayBuffer()).byteLength === 1024, 'voice memo streams with byte ranges (206 + Content-Range)');
ok((await fetch(BASE + '/media/vc-test-0001', { headers: { cookie: ck } })).status === 200 && (await fetch(BASE + '/media/vc-test-0001/t', { headers: { cookie: ck } })).status === 404, 'whole clip → 200; a clip has no thumbnail');
{ // only the bytes asked for are read from storage (server/ranged.js): a middle piece, the last bytes, past the end
  const rg = async (range) => { const r = await fetch(BASE + '/media/vc-test-0001', { headers: { cookie: ck, range } }); return { s: r.status, cr: r.headers.get('content-range'), n: r.status === 416 ? 0 : (await r.arrayBuffer()).byteLength }; };
  const mid = await rg('bytes=1000-1999'), tail = await rg('bytes=-100'), open = await rg('bytes=4000-'), past = await rg('bytes=5000-6000');
  ok(mid.s === 206 && mid.cr === 'bytes 1000-1999/4096' && mid.n === 1000 && tail.cr === 'bytes 3996-4095/4096' && tail.n === 100 && open.n === 96 && past.s === 416 && past.cr === 'bytes */4096',
    `byte ranges: a middle piece, the last bytes, to the end, past the end → 416 (${JSON.stringify({ mid, tail, open, past })})`); }
ok((await upA('vc-bad-00001', 'text/plain')).status === 415 && (await upA('vc-view-0001', 'audio/webm', { 'x-mb': '1', cookie: vck })).status === 403, 'not an audio type → 415; viewer cannot record');
ok((await fetch(BASE + '/api/b/media/vc-test-0001', { method: 'DELETE', headers: H })).ok && !(await state()).media.some((m) => m.id === 'vc-test-0001') && (await fetch(BASE + '/media/vc-test-0001', { headers: { cookie: ck } })).status === 404, 'voice memo deleted, file gone');

// video clips (owner, Nov 2026: up to 30 s): re-encoded by ffmpeg — the first 30 s, ≤ 1280 px, every piece of metadata dropped
// (a phone writes where it was filmed: QuickTime/ISO 6709 location, make, model) — a poster frame as the thumbnail; byte ranges
// for Safari; never a photo (not counted, never sent to the helper); deleted with its poster
{
  const { execFile } = await import('node:child_process');
  // made without blocking this script (a long synchronous ffmpeg made the next fetch fail: the server dropped the idle socket — Gotchas)
  const ff = (cmd, args) => new Promise((ok2, no) => execFile(cmd, args, (e, out) => (e ? no(e) : ok2(out))));
  const vin = path.join(DATA_DIR, 'clip-in.mov');
  await ff('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'testsrc=size=1920x1080:rate=12', '-f', 'lavfi', '-i', 'sine=frequency=440',
    '-t', '33', '-metadata', 'location=+13.7563+100.5018/', '-metadata', 'com.apple.quicktime.location.ISO6709=+13.7563+100.5018/', '-metadata', 'make=PhoneMaker',
    '-c:v', 'libx264', '-preset', 'ultrafast', '-c:a', 'aac', '-shortest', vin]);
  const vbuf = fs.readFileSync(vin);
  ok(vbuf.includes('100.5018'), 'the test clip carries a place (as a phone writes it)');
  const upV = (id, type = 'video/quicktime', h = { 'x-mb': '1', cookie: ck }) => fetch(`${BASE}/api/b/media/${id}?trip=${T}&day=1&kind=video&caption=${encodeURIComponent('ม้าหมุน')}`, { method: 'PUT', headers: { ...h, 'content-type': type }, body: vbuf });
  const vr = await upV('vd-test-0001'), vj = await vr.json();
  ok(vr.ok && vj.mime === 'video/mp4' && vj.w === 1280 && vj.h === 720, `a clip is made into an mp4 at most 1280 px wide (${vr.status} ${JSON.stringify(vj)})`);
  const vm = (await state()).media.find((m) => m.id === 'vd-test-0001');
  ok(vm && vm.mime === 'video/mp4' && vm.caption === 'ม้าหมุน' && vm.day === 1, 'the clip is listed with its mime, caption and day');
  const vfull = Buffer.from(await (await fetch(BASE + '/media/vd-test-0001', { headers: { cookie: ck } })).arrayBuffer());
  fs.writeFileSync(path.join(DATA_DIR, 'clip-out.mp4'), vfull);
  const probe = await ff('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:format_tags:stream_tags', '-of', 'json', path.join(DATA_DIR, 'clip-out.mp4')]);
  const dur = Number(JSON.parse(probe).format.duration);
  ok(!vfull.includes('100.5018') && !vfull.includes('PhoneMaker') && !/location|ISO6709|make/i.test(probe) && dur > 29 && dur <= 30.1, `the kept clip has no place, no make and is cut to 30 s (${dur} s)`);
  const vth = await fetch(BASE + '/media/vd-test-0001/t', { headers: { cookie: ck } });
  ok(vth.ok && (await sharp(Buffer.from(await vth.arrayBuffer())).metadata()).format === 'jpeg', 'a clip\'s thumbnail is its poster frame (JPEG)');
  const vrg = await fetch(BASE + '/media/vd-test-0001', { headers: { cookie: ck, range: 'bytes=0-99' } });
  ok(vrg.status === 206 && (vrg.headers.get('content-type') || '').startsWith('video/mp4'), 'a clip streams with byte ranges (Safari)');
  ok((await upV('vd-bad-00001', 'text/plain')).status === 415 && (await upV('vd-view-0001', 'video/mp4', { 'x-mb': '1', cookie: vck })).status === 403, 'not a video type → 415; a relative cannot add a clip');
  ok((await (await upV('vd-test-0001')).json()).dup === true, 'the same clip sent again (the phone\'s queue retrying) is not made twice');
  ok((await fetch(BASE + '/api/b/media/vd-test-0001', { method: 'DELETE', headers: H })).ok && (await fetch(BASE + '/media/vd-test-0001', { headers: { cookie: ck } })).status === 404
    && !fs.existsSync(path.join(DATA_DIR, 'media', 'v', T, 'vd-test-0001.mp4')) && !fs.existsSync(path.join(DATA_DIR, 'media', 't', T, 'vd-test-0001.jpg')), 'a clip is deleted with its poster');
}

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
ok((await state(vck)).spend.length === 0 && (await state()).spend.length > 0, 'spending is the parents\' own ledger: a relative\'s state carries none of it');
ok((await fetch(BASE + '/api/b/trips', { method: 'POST', headers: H, body: JSON.stringify({ slug: 'tz-test-book', title: { th: 'ทดสอบ', en: 'Test' }, date_from: '2030-01-01', date_to: '2030-01-02', timezone: 'Pacific/Sidney' }) })).status === 400, 'a new book with a timezone the platform does not know is refused (reminders would stop for every book)');
ok((await fetch(BASE + `/api/b/spend/${T}.sp.0001`, { method: 'DELETE', headers: H })).ok && !(await state()).spend.length, 'spend deleted');
const nt = await fetch(BASE + '/api/b/trips', { method: 'POST', headers: H, body: JSON.stringify({ slug: 'chiang-mai-2027', title: { th: 'เชียงใหม่', en: 'Chiang Mai' }, date_from: '2027-08-10', date_to: '2027-08-13' }) });
s = await state();
ok(nt.ok && s.trips.find((t) => t.slug === 'chiang-mai-2027').days.length === 4, 'new trip from the app gets one page per day');
ok((await fetch(BASE + '/api/b/trips', { method: 'POST', headers: H, body: JSON.stringify({ slug: 'chiang-mai-2027', title: 'x', date_from: '2027-08-10', date_to: '2027-08-13' }) })).status === 409, 'duplicate trip slug → 409');
ok((await fetch(BASE + '/api/b/trips', { method: 'POST', headers: H, body: JSON.stringify({ slug: 'bad-dates', title: 'x', date_from: '2027-08-13', date_to: '2027-08-10' }) })).status === 400, 'end before start → 400');

// ---- a book from photos (docs/SNAP-BOOK.md P1): the days are the photos' dates (a gap stays a gap), each with its place in words
{
  const post = (u, b, m = 'POST') => fetch(BASE + u, { method: m, headers: H, body: JSON.stringify(b) });
  const geo = await (await fetch(BASE + '/api/b/geo', { headers: { cookie: ck } })).json();
  const ky = geo.places.find((p) => p.id === 'th-khaoyai');
  ok(geo.places.length > 150 && ky && ky.ll.length === 2 && ky.name.th && ky.tz === 'Asia/Bangkok' && ky.home && geo.countries.some((c) => c.cc === 'jp' && c.name.en) && !JSON.stringify(geo).includes('"items"'), `geo: the library's cities with their centres for the phone (${geo.places.length}), no pictures`);
  ok((await fetch(BASE + '/api/b/geo')).status === 401, 'geo: signed in only');
  const days = [{ date: '2026-12-12', place: { th: 'ปากช่อง', en: 'Pak Chong' } }, { date: '2026-12-14', place: 'เขาใหญ่', title: { th: 'ทุ่งทานตะวัน', en: 'Sunflowers' } }, { date: '2026-12-13' }];
  const r1 = await post('/api/b/snap', { title: { th: 'เขาใหญ่ 3 วัน', en: 'Khao Yai, 3 days' }, days, places: ['th-khaoyai', 'BAD id!'] });
  const id = (await r1.json()).id;
  let t = (await state()).trips.find((x) => x.id === id);
  ok(r1.ok && /^snap-20261212-[0-9a-f]{6}$/.test(id) && t.kind === 'snap' && t.open === false && t.source === 'manual' && t.date_from === '2026-12-12' && t.date_to === '2026-12-14'
    && t.days.map((d) => d.date).join() === '2026-12-12,2026-12-13,2026-12-14' && t.days[0].place.th === 'ปากช่อง' && t.days[1].place === null && t.days[2].place.en === 'เขาใหญ่'
    && t.days[2].title.en === 'Sunflowers' && t.days[1].title.th === 'วันที่ 2' && JSON.stringify(t.theme.snap.places) === '["th-khaoyai"]', 'snap: a book made from the photos\' dates, in date order, each day with its place; bad place ids dropped');
  { const pp = t.passport || {}, art = (t.theme.artDays || []).filter(Boolean);
    ok(art.length === 3 && art.every((u) => u.startsWith('/stock/')) && String((pp.style || {}).crest).startsWith('/stock/') && (pp.stamps || []).length >= 1
      && (pp.days || []).length === 3 && pp.days[0].facts[0].th.includes('ปากช่อง') && pp.days.every((d) => d.acc && d.tint) && t.theme.accent !== '#2C5646'
      && pp.map && pp.map.stops.length === 2 && pp.map.days[0].length === 1 && pp.map.days[1].length === 0 && pp.map.stops.every((s) => s.x >= 0 && s.x <= 100),
    `snap pictures (P4): every day a library picture, the crest and stamps, the town's colours, a passport day each with a line about the town, a map of the towns visited (${art.length} pictures, crest ${(pp.style || {}).crest}, ${(pp.stamps || []).length} stamps, ${pp.map && pp.map.stops.length} map stops)`); }
  { // the kids' side, second pass: never the same picture twice while the town has more, a trip at home wears its town's own stamp,
    // a day with no name is called by its place (and its stamp says where), the chest's secret tells what the day's picture shows, a certificate
    const pp = t.passport || {}, art = (t.theme.artDays || []).filter(Boolean);
    ok(new Set(art).size === art.length && /\/stock\/th\/khaoyai\/stamp\./.test(pp.style.crest) && pp.days[0].title.en === 'Pak Chong' && pp.days[0].stamp === 'PAK CHONG'
      && pp.days[1].title.en === 'Khao Yai' && pp.days[2].title.en === 'Sunflowers' && / you can see /.test(pp.days[0].facts[0].en) && (pp.days[0].facts[0].en.match(/Pak Chong/g) || []).length <= 1 && (pp.days[0].facts[0].th.match(/ปากช่อง/g) || []).length <= 1 && pp.certificate && pp.certificate.text.en.includes('Khao Yai, 3 days'),
    `snap kids' side: three different pictures, the Khao Yai stamp as the crest, days called by their place, a secret from the picture, a certificate (${art.join(' ')} · ${pp.style.crest} · ${pp.days.map((d) => d.title.en + '/' + d.stamp).join(' ')} · ${pp.days[0].facts[0].en})`);
    const far = await (await post('/api/b/snap', { days: [{ date: '2026-10-01', place: { th: 'ฟาร์มของยาย', en: "Grandma's farm" } }] })).json();
    let f = (await state()).trips.find((x) => x.id === far.id), fp = f.passport || {};
    ok((f.theme.artDays || []).every((u) => !u || u.startsWith('/stock/t/')) && !fp.style.crest && fp.days[0].title.th === 'ฟาร์มของยาย' && fp.days[0].facts.length === 1,
      `snap kids' side: a place the library lacks gets at most a landscape scene its name says, no crest (${JSON.stringify(f.theme.artDays || null)})`);
    await post('/api/b/places', { trip: far.id, key: 'snap.jp-tokyo', day: 0, name: { th: 'โตเกียว', en: 'Tokyo' } }, 'PUT');
    for (let k = 0; k < 40 && !/\/stock\/jp\//.test(JSON.stringify(((await state()).trips.find((x) => x.id === far.id).passport || {}).style)); k++) await new Promise((r) => setTimeout(r, 100));
    f = (await state()).trips.find((x) => x.id === far.id); fp = f.passport;
    ok(/\/stock\/jp\/stamp\./.test(fp.style.crest) && (fp.guides || []).every((g) => g.art.startsWith('/stock/jp/')) && (f.theme.artDays || [])[0].startsWith('/stock/jp/tokyo/'),
      `snap kids' side: a library place checked in later brings its picture, the country's crest and guides (${fp.style.crest} · ${(f.theme.artDays || [])[0]})`);
    await post(`/api/b/trips/${far.id}`, {}, 'DELETE');
  }
  ok((await post('/api/b/snap', { days: [{ date: '2026-12-01' }, { date: '2027-03-01' }] })).status === 400 && (await post('/api/b/snap', { days: [{ date: '2026-02-30' }] })).status === 400
    && (await post('/api/b/snap', { days: [{ date: '2026-12-01' }], timezone: 'Mars/Base' })).status === 400, 'snap: more than 60 days, an impossible date or an unknown zone is refused');
  const live = await (await post('/api/b/snap', { open: true, timezone: 'Asia/Bangkok' })).json();
  t = (await state()).trips.find((x) => x.id === live.id);
  ok(t.open === true && t.days.length === 1 && t.days[0].date === new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Bangkok' }) && t.title.th, 'snap: a book started on the trip has today and stays open');
  // more days: after the last one always; before it only while the book holds nothing
  const r2 = await (await post(`/api/b/snap/${id}/days`, { days: [{ date: '2026-12-15', place: 'Korat' }, { date: '2026-12-14' }] })).json();
  t = (await state()).trips.find((x) => x.id === id);
  ok(r2.added === 1 && t.days.length === 4 && t.days[3].date === '2026-12-15' && t.days[3].place.th === 'Korat' && t.date_to === '2026-12-15', 'snap: a later date adds a day at the end; a date it has is left alone');
  const r3 = await (await post(`/api/b/snap/${id}/days`, { days: [{ date: '2026-12-10' }] })).json();
  t = (await state()).trips.find((x) => x.id === id);
  ok(r3.added === 1 && t.days[0].date === '2026-12-10' && t.days[1].place.th === 'ปากช่อง' && t.days[3].title.en === 'Sunflowers' && t.days[0].title.th === 'วันที่ 1' && t.days[2].title.th === 'วันที่ 3' && t.date_from === '2026-12-10', 'snap: an earlier date on an empty book lays the days out again, each keeping its own name and place');
  // an earlier date once the book holds memories (owner, Nov 2026: "เพิ่มรูปก่อนวันแรกของเล่ม"): everything a day holds moves with it —
  // its entries (and the day number inside their ids and keys), photos, check-ins; a day called by its number takes its new number
  await put(`/api/b/entries/${id}.q.0001`, { trip: id, day: 1, kind: 'quote', child: 'mimi', text: 'ลมแรงมาก' });
  await put(`/api/b/entries/${id}.sum.d1`, { trip: id, day: 1, kind: 'sum', text: 'วันที่ลมแรง' });
  await put(`/api/b/entries/${id}.tick.stamp.d1.mimi`, { trip: id, day: 1, kind: 'tick', child: 'mimi', first_key: 'stamp.d1', text: '' });
  await put(`/api/b/entries/${id}.tick.quest.d0.chest.mimi`, { trip: id, day: null, kind: 'tick', child: 'mimi', first_key: 'quest.d0.chest', text: '' });
  await put('/api/b/places', { trip: id, key: 'snap.test-spot', day: 1, kind: 'place', name: { th: 'ชายหาด', en: 'The beach' } });
  const jp0 = await sharp({ create: { width: 40, height: 30, channels: 3, background: '#668844' } }).jpeg().toBuffer();
  await fetch(`${BASE}/api/b/media/ph-snap-renum?trip=${id}&day=1`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: jp0 });
  const rb = await post(`/api/b/snap/${id}/days`, { days: [{ date: '2026-12-09' }] });
  { const s2 = await state(), tt = s2.trips.find((x) => x.id === id), es = s2.entries.filter((e) => e.trip === id);
    const q = es.find((e) => e.text === 'ลมแรงมาก'), sm = es.find((e) => e.kind === 'sum'), st = es.find((e) => e.first_key && e.first_key.startsWith('stamp.')), qu = es.find((e) => e.first_key && e.first_key.startsWith('quest.'));
    const ph = s2.media.find((m) => m.id === 'ph-snap-renum'), pl = s2.places.find((p) => p.trip === id && p.key === 'snap.test-spot');
    ok(rb.ok && tt.days.length === 6 && tt.days[0].date === '2026-12-09' && tt.days[0].title.th === 'วันที่ 1' && tt.days[1].title.th === 'วันที่ 2' && tt.days[2].place.th === 'ปากช่อง'
      && q.day === 2 && sm.id === `${id}.sum.d2` && sm.day === 2 && st.first_key === 'stamp.d2' && st.id === `${id}.tick.stamp.d2.mimi` && st.day === 2 && qu.first_key === 'quest.d1.chest' && qu.id === `${id}.tick.quest.d1.chest.mimi`
      && ph.day === 2 && pl.day === 2 && !es.some((e) => e.id.startsWith('~renum~')),
    `snap: an earlier date on a book with memories lays the days out again — every entry, id, key, photo and check-in moves with its day (${JSON.stringify({ status: rb.status, days: tt.days.map((d) => [d.date, d.title.th]), q: q && q.day, sm: sm && sm.id, st: st && st.id, qu: qu && qu.id, ph: ph && ph.day, pl: pl && pl.day })})`); }
  await fetch(`${BASE}/api/b/media/ph-snap-renum`, { method: 'DELETE', headers: H });
  ok((await post(`/api/b/snap/${T}/days`, { days: [{ date: '2026-12-20' }] })).status === 404, 'snap: a planned book takes no snap days');
  // the parents name a day, its place, the book, and close it
  ok((await post(`/api/b/days/${id}/0`, { title: { th: 'ออกเดินทาง', en: 'Setting off' }, place: { th: 'บ้าน', en: 'Home' }, emoji: '🚗' }, 'PATCH')).ok
    && (await post(`/api/b/days/${id}/1`, { place: '' }, 'PATCH')).ok && (await post(`/api/b/days/${T}/0`, { title: 'x' }, 'PATCH')).status === 409
    && (await post(`/api/b/days/${id}/9`, { title: 'x' }, 'PATCH')).status === 404 && (await post(`/api/b/days/${id}/0`, { title: '' }, 'PATCH')).status === 400, 'snap: a day\'s name, place and picture are the parents\' to type (never a bundled book\'s day)');
  ok((await post(`/api/b/trips/${live.id}`, { title: 'ทะเลวันเดียว', open: false }, 'PATCH')).ok && (await post(`/api/b/trips/${T}`, { open: true }, 'PATCH')).status === 409, 'snap: "we\'re home" closes the book; a bundled book cannot be renamed');
  ok(!(await (await fetch(BASE + '/api/b/reel', { headers: { cookie: ck } })).json()).job, 'snap: "we\'re home" on a book with no photos makes no film');
  // "we're home" on a book with photos (owner, Nov 2026: "ทำคลิปให้อัตโนมัติตอนกด ถึงบ้านแล้ว"): its film makes itself
  { const home = await (await post('/api/b/snap', { open: true, timezone: 'Asia/Bangkok' })).json();
    for (let k = 0; k < 3; k++) await fetch(`${BASE}/api/b/media/home-ph-000${k}?trip=${home.id}&day=0`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: await sharp({ create: { width: 900, height: 600, channels: 3, background: ['#c84', '#48c', '#4c8'][k] } }).jpeg().toBuffer() });
    await post(`/api/b/trips/${home.id}`, { open: false }, 'PATCH');
    let job = (await (await fetch(BASE + '/api/b/reel', { headers: { cookie: ck } })).json()).job;
    const started = !!(job && job.trip === home.id && job.auto);
    for (let k = 0; k < 120 && job && job.state === 'run'; k++) { await new Promise((r) => setTimeout(r, 1000)); job = (await (await fetch(BASE + '/api/b/reel', { headers: { cookie: ck } })).json()).job; }
    const made = (await state()).trips.find((x) => x.id === home.id).reel;
    ok(started && job.state === 'done' && made && made.v && made.mood === 'warm', `snap: "we're home" on a book with photos makes its film by itself (${JSON.stringify({ started, state: job && job.state, made })})`);
    // the year's film (server/reel.js startYear): every book of 2026 — here the one just made — its best photos, the year's cards
    const yr0 = await fetch(`${BASE}/api/b/reel-year/${new Date().getFullYear()}`, { method: 'POST', headers: H, body: JSON.stringify({ mood: 'fun' }) });
    let yj = (await (await fetch(BASE + '/api/b/reel', { headers: { cookie: ck } })).json()).job;
    for (let k = 0; k < 120 && yj && yj.state === 'run'; k++) { await new Promise((r) => setTimeout(r, 1000)); yj = (await (await fetch(BASE + '/api/b/reel', { headers: { cookie: ck } })).json()).job; }
    const ys = (await (await fetch(BASE + '/api/b/reel-year', { headers: { cookie: ck } })).json()).years, yv = ys[new Date().getFullYear()];
    const yrg = yv ? await fetch(`${BASE}/media/reel-year/${new Date().getFullYear()}?v=${yv.v}`, { headers: { cookie: ck, range: 'bytes=0-99' } }) : null;
    ok(yr0.status === 202 && yj && yj.state === 'done' && yv && yv.mood === 'fun' && yv.n >= 3 && yrg && yrg.status === 206
      && (await fetch(`${BASE}/media/reel-year/${new Date().getFullYear()}?v=${yv.v}`, { headers: { cookie: vck } })).status === 403 && (await fetch(`${BASE}/api/b/reel-year/1999`, { method: 'POST', headers: H, body: '{}' })).status === 400,
      `the year's film: made from the year's books, played in ranges; relatives cannot fetch it; a year with no photos is told so (${JSON.stringify({ s: yr0.status, state: yj && yj.state, yv })})`);
    await fetch(`${BASE}/api/b/trips/${home.id}`, { method: 'DELETE', headers: H }); }   // out of the way of the counts below
  t = (await state()).trips.find((x) => x.id === id); const l2 = (await state()).trips.find((x) => x.id === live.id);
  ok(t.days[0].title.en === 'Setting off' && t.days[0].place.en === 'Home' && t.days[0].emoji === '🚗' && t.days[1].place === null && l2.open === false && l2.title.th === 'ทะเลวันเดียว', 'snap: the edits are in the state');
  // a photo moves to another day of its book (never past the last)
  const jp = await sharp({ create: { width: 40, height: 30, channels: 3, background: '#88aa66' } }).jpeg().toBuffer();
  const upS = await fetch(`${BASE}/api/b/media/ph-snap-0001?trip=${id}&day=1`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: jp });
  ok((await post('/api/b/media/ph-snap-0001', { day: 3 }, 'PATCH')).ok && (await state()).media.find((m) => m.id === 'ph-snap-0001').day === 3
    && (await post('/api/b/media/ph-snap-0001', { day: 6 }, 'PATCH')).status === 404 && (await post('/api/b/media/ph-snap-0001', { day: -1 }, 'PATCH')).status === 400, `snap: a photo moves to another day of its book, never past its last day (upload ${upS.status})`);
  // the original file's fingerprint (migration 0027): kept and sent back, so the phone never sends the same file twice; a mangled one is dropped
  const upF = await fetch(`${BASE}/api/b/media/ph-snap-fp01?trip=${id}&day=0&fp=0123456789abcdef01234567`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: jp });
  const upG = await fetch(`${BASE}/api/b/media/ph-snap-fp02?trip=${id}&day=0&fp=${encodeURIComponent("x'); drop table media;--")}`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: jp });
  { const sm = (await state()).media; ok(upF.ok && upG.ok && sm.find((m) => m.id === 'ph-snap-fp01').fp === '0123456789abcdef01234567' && sm.find((m) => m.id === 'ph-snap-fp02').fp === null && sm.find((m) => m.id === 'ph-snap-0001').fp === null,
    'snap: a photo keeps the fingerprint of the file it came from (none sent → none; a mangled one is dropped)'); }
  // the same picture from another phone or over LINE (migration 0029): the server keeps what each photo looks like and says which of the
  // phone's photos look like one the book holds — a re-encoded, smaller copy yes; another picture, a frame a moment later or a flat one no
  { const IMG = createRequire(import.meta.url)('../server/images.js');
    const pic = (f, extra = {}) => sharp(fs.readFileSync(f), { density: 300 }).resize(1600, 1200, { fit: 'cover' }).flatten({ background: '#fff' }).jpeg({ quality: 90, ...extra }).toBuffer();
    const orig = await pic('public/stock/th/khaoyai/day-sunflowers.v1.svg'), other = await pic('public/stock/th/khaoyai/day-park.v1.svg');
    const copy = await sharp(orig).resize(900).jpeg({ quality: 55 }).toBuffer(), burst = await sharp(orig).extract({ left: 90, top: 60, width: 1510, height: 1140 }).resize(1600, 1200).jpeg().toBuffer();
    const up = await fetch(`${BASE}/api/b/media/ph-near-0001?trip=${id}&day=0`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: orig });
    const phs = [await IMG.phOf(copy), await IMG.phOf(other), await IMG.phOf(burst), await IMG.phOf(jp), 'not-a-print'];
    const r = await (await post('/api/b/media/near', { trip: id, ph: phs })).json();
    ok(up.ok && Array.isArray(r.near) && r.near.length === 1 && r.near[0].i === 0 && r.near[0].id === 'ph-near-0001' && r.near[0].c >= IMG.NEAR,
      `snap: "already in the book?" — the LINE copy of a photo yes, another picture, a frame a moment later, a flat picture and a mangled print no (${JSON.stringify(r)})`);
    ok((await fetch(BASE + '/api/b/media/near', { method: 'POST', headers: { ...H, cookie: vck }, body: JSON.stringify({ trip: id, ph: phs }) })).status === 403, 'snap: relatives cannot ask what photos look like');
    // photos sent before migration 0029: filled in from their thumbnails once the server is up; one whose thumbnail is gone gets ''
    { const pool = new Pool({ connectionString: process.env.DATABASE_URL }), thumb = await sharp(orig).resize(520).jpeg().toBuffer();
      await pool.query("UPDATE media SET ph=NULL WHERE id IN ('ph-near-0001','ph-snap-0001')");
      const n = await BS.backfillPh(pool, { get: async (k) => (k.endsWith('/ph-near-0001.jpg') ? thumb : null) });
      const rows = (await pool.query("SELECT id, ph FROM media WHERE id IN ('ph-near-0001','ph-snap-0001') ORDER BY id")).rows; await pool.end();
      ok(n >= 2 && /^[0-9a-f]{512}$/.test(rows.find((x) => x.id === 'ph-near-0001').ph) && rows.find((x) => x.id === 'ph-snap-0001').ph === '',
        `snap: older photos get their look-alike print from their thumbnail once; a missing thumbnail is not tried again (${n} filled)`); } }
  ok((await fetch(BASE + `/api/b/snap`, { method: 'POST', headers: { ...H, cookie: vck }, body: '{}' })).status === 403, 'snap: relatives cannot make a book');
  // "go again" (owner, Nov 2026): a new empty book from this one — the same towns day by day from a new first date (gaps kept),
  // each day's name, place and emoji, the library's pictures and the kids' side; no photo, word or tick of the old trip
  const src = (await state()).trips.find((x) => x.id === id);
  const ra = await post(`/api/b/snap/${id}/again`, { date_from: '2027-12-20' }), aid = (await ra.json()).id;
  const ag = (await state()).trips.find((x) => x.id === aid);
  const sameDays = ag && ag.days.length === src.days.length && ag.days.every((d, k) => (d.place || {}).th === (src.days[k].place || {}).th && d.emoji === src.days[k].emoji
    && (/^วันที่ \d+$/.test(src.days[k].title.th) ? d.title.th === `วันที่ ${k + 1}` : d.title.th === src.days[k].title.th));
  ok(ra.ok && ag && ag.kind === 'snap' && ag.open === false && ag.date_from === '2027-12-20' && ag.days.every((d, k) => (Date.parse(d.date) - Date.parse(ag.days[0].date)) === (Date.parse(src.days[k].date) - Date.parse(src.days[0].date))) && sameDays
    && /อีกครั้ง$/.test(ag.title.th) && / again$/.test(ag.title.en) && !(await state()).media.some((m) => m.trip === aid) && !(await state()).entries.some((e) => e.trip === aid)
    && (ag.theme.artDays || []).filter(Boolean).length === (src.theme.artDays || []).filter(Boolean).length,
  `go again: a new book from ${src.days.length} days (gaps kept, ${ag && ag.days.map((d) => d.date)}), the days' names and places, the library's pictures; nothing recorded is copied (${JSON.stringify({ st: ra.status, same: sameDays, open: ag && ag.open, title: ag && ag.title, art: [(ag && ag.theme.artDays || []).filter(Boolean).length, (src.theme.artDays || []).filter(Boolean).length] })})`);
  ok((await post(`/api/b/snap/${id}/again`, { date_from: 'soon' })).status === 400 && (await post(`/api/b/snap/${T}/again`, { date_from: '2027-01-01' })).status === 404
    && (await fetch(BASE + `/api/b/snap/${id}/again`, { method: 'POST', headers: { ...H, cookie: vck }, body: JSON.stringify({ date_from: '2027-01-01' }) })).status === 403, 'go again: a bad date → 400, a planned book → 404, relatives → 403');
  for (const x of [id, live.id, aid]) await fetch(BASE + `/api/b/trips/${x}`, { method: 'DELETE', headers: H });
}

// re-sync seeds (= every boot): keeps Done, never touches app-made trips
await BS.syncSeeds(pool);
s = await state();
ok(s.trips[0].days[0].done_at > 0 && s.trips.some((t) => t.slug === 'chiang-mai-2027'), 'seed re-sync keeps Done and app-made trips');

// ---- the day's plan from the seed (manual's day card) is in the state, never bookings
{
  const hk = (await state()).trips.find((t) => t.id === T), p3 = hk.days[3].plan;
  ok(p3.plan.length === 10 && p3.plan[2].t === '11:00' && /teamLab/.test(p3.plan[2].en) && p3.pick && p3.planB && /teamLab ×4 \(3 adults \+ Mimi\) MOP 1,072/.test(p3.money.en), 'day 4 plan (manual card): 10 timed steps, teamLab at 11:00, local pick, plan B, money');
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

// ---- a line under a photo (migration 0038): a relative writes one, sees it as theirs; a parent removes any; never on a clip; it goes with its photo
{ const cm = { media: 'ph-test-0001', from: 'ยาย', text: 'น่ารักมาก "Mimi" 💗' };
  const a = await put('/api/b/comments/cm-test-0001', cm, VH), dup = await put('/api/b/comments/cm-test-0001', cm, VH);
  const noFrom = await put('/api/b/comments/cm-test-0002', { ...cm, from: ' ' }, VH), noText = await put('/api/b/comments/cm-test-0002', { ...cm, text: ' ' }, VH);
  const noMedia = await put('/api/b/comments/cm-test-0002', { ...cm, media: 'nope-0001' }, VH), csrf = await put('/api/b/comments/cm-test-0002', cm, { ...VH, 'x-mb': '' });
  const c1 = (await state(vck)).comments.find((c) => c.id === 'cm-test-0001'), c2 = (await state()).comments.find((c) => c.id === 'cm-test-0001');
  ok(a.ok && (await dup.json()).dup === true && [noFrom, noText, noMedia, csrf].every((r) => r.status === 400) && c1 && c1.mine === true && c1.media === 'ph-test-0001' && c1.from === 'ยาย' && !('created_uid' in c1) && c2 && c2.mine === false,
    `comments: a relative writes under a photo (name and text needed, a photo the book has), it is theirs in the state; the parents see it too (${[a.status, noFrom.status, noText.status, noMedia.status, csrf.status].join(' ')})`);
  ok((await put('/api/b/comments/cm-test-0003', { ...cm, text: 'x'.repeat(500) })).ok && (await state()).comments.find((c) => c.id === 'cm-test-0003').text.length === 200, 'comments: a parent writes too; a line is at most 200 letters');
  const vck3 = (await fetch(BASE + '/v/grandma', { redirect: 'manual' })).headers.get('set-cookie').split(';')[0];
  ok((await fetch(BASE + '/api/b/comments/cm-test-0001', { method: 'DELETE', headers: { ...VH, cookie: vck3 } })).status === 404 && (await fetch(BASE + '/api/b/comments/cm-test-0003', { method: 'DELETE', headers: H })).ok,
    "comments: another relative's phone cannot remove grandma's line; a parent removes any"); }

// ---- PDPA export + real delete
const ex = await (await fetch(BASE + '/api/b/export.json', { headers: { cookie: ck } })).json();
ok(ex.hearts.length >= 41 && ex.reviews.length === 1, 'export includes the hearts and the reviews');
ok(ex.entries.length >= 3 && ex.media.length === 1 && !ex.media.some((m) => m.family_id === 'other'), 'export has only this family\'s data');
ok((await fetch(BASE + '/api/b/export.json', { headers: { cookie: vck } })).status === 403, 'viewer cannot export');
const stored = path.join(DATA_DIR, 'media', 'p', T, 'ph-test-0001.jpg');
ok(fs.existsSync(stored), 'photo object in storage');
ok((await fetch(BASE + '/api/b/media/ph-test-0001', { method: 'DELETE', headers: H })).ok && !fs.existsSync(stored)
  && !fs.existsSync(path.join(DATA_DIR, 'media', 't', T, 'ph-test-0001.jpg')), 'deleting a photo removes the stored files too');
ok(!(await state()).comments.some((c) => c.media === 'ph-test-0001'), 'a photo deleted takes its lines with it');

// ---- the owner's alerts and the month-by-month page (server/alerts.js, server/errors.js costs)
{ const rep = (body, auth = 'Bearer test-backup-token-0123456789abcdef') => fetch(BASE + '/api/backup/report', { method: 'POST', headers: { authorization: auth, 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const noAuth = await rep({ ok: true }, 'Bearer wrong'), bad = await rep({ ok: false, drill: 'skipped' });
  const al1 = await (await fetch(BASE + '/api/b/health/alerts', { headers: { cookie: ck } })).json();
  const good = await rep({ ok: true, drill: 'failed' }), al2 = await (await fetch(BASE + '/api/b/health/alerts', { headers: { cookie: ck } })).json();
  ok(noAuth.status === 401 && bad.ok && al1.backup.ok === false && al1.log.some((x) => x.kind === 'backup') && good.ok && al2.backup.ok === true && al2.backup.drill === 'failed' && al2.log.length >= 2 && al2.disk && al2.disk.total > 0
    && (await fetch(BASE + '/api/b/health/alerts', { headers: { cookie: vck } })).status === 403,
    `owner alerts: the Backup workflow reports each run; a failed copy and a failed restore drill are told and listed; the disk is watched (${JSON.stringify({ b1: al1.backup, log: al2.log.length })})`);
  const cs = await (await fetch(BASE + '/api/b/health/costs', { headers: { cookie: ck } })).json(), last = cs.months[cs.months.length - 1];
  ok(cs.months.length === 12 && last.stored >= 0 && cs.priced && cs.priced.ai === false && last.usdAi === null, `month by month: twelve months of room and helper use, no money unless the owner set prices (${JSON.stringify(last)})`); }
// ---- the server's own problems (server/watch.js, migration 0036): a failed answer is counted by the kind of request, every id masked
{ const express = require('express'), WATCH = require('../server/watch.js');
  const pool2 = new Pool({ connectionString: process.env.DATABASE_URL });
  const w = WATCH.create({ pool: pool2, A: { requireEditor: (q, s, n) => n() } }), app = express();
  app.use(w.mw);
  app.get('/api/b/media/:id', () => { throw new Error('boom near "Mimi at the beach" 0812345678'); });
  app.use((err, _req, res, _next) => { w.error(err, res); res.status(500).json({ error: 'server' }); });
  const srv = app.listen(0); await new Promise((r) => srv.once('listening', r));
  const r5 = await fetch(`http://localhost:${srv.address().port}/api/b/media/ph-secret-0001?trip=hk`);
  await new Promise((r) => setTimeout(r, 300)); srv.close();
  const ev = (await (await fetch(BASE + '/api/b/health/server', { headers: { cookie: ck } })).json()).events.find((x) => x.kind === 'error');
  ok(r5.status === 500 && ev && ev.route === 'GET /api/b/media/:' && ev.status === 500 && /boom near/.test(ev.msg) && !/Mimi|0812345678|ph-secret|hk/.test(JSON.stringify(ev))
    && (await fetch(BASE + '/api/b/health/server', { headers: { cookie: vck } })).status === 403,
  `server problems: a 500 is kept by the kind of request, the id, the query, a quoted text and a phone number masked; relatives may not read it (${JSON.stringify(ev)})`);
  const del = await fetch(BASE + '/api/b/health/server', { method: 'DELETE', headers: H });
  ok(del.ok && !(await (await fetch(BASE + '/api/b/health/server', { headers: { cookie: ck } })).json()).events.length, 'server problems: the list clears');
  ok(WATCH.label('PUT', '/api/b/trips/hk-macau-2026/days') === 'PUT /api/b/trips/:' && WATCH.label('GET', '/v/token123') === 'GET /v/:' && WATCH.label('GET', '/app.css') === 'GET static', 'server problems: the path keeps its kind and loses every id');
  await pool2.end(); }
// ---- stray files (server/orphans.js): a file in the photo folders that no row names and is over two days old goes; a fresh one stays
{ const dir = path.join(DATA_DIR, 'media', 'p', T); fs.mkdirSync(dir, { recursive: true });
  const old = path.join(dir, 'stray-old-0001.jpg'), fresh = path.join(dir, 'stray-new-0001.jpg'), oldT = new Date(Date.now() - 3 * 864e5);
  fs.writeFileSync(old, Buffer.alloc(5000, 1)); fs.utimesSync(old, oldT, oldT); fs.writeFileSync(fresh, Buffer.alloc(3000, 1));
  const owned = fs.readdirSync(dir).filter((f) => !/^stray-/.test(f));
  for (const f of owned) fs.utimesSync(path.join(dir, f), oldT, oldT);   // the book's own photos are old too, and must stay
  const pool3 = new Pool({ connectionString: process.env.DATABASE_URL }); await pool3.query("DELETE FROM settings WHERE key='orphans_last'"); await pool3.end();
  const g = await (await fetch(BASE + '/api/b/health/orphans', { headers: { cookie: ck } })).json();
  const p = await (await fetch(BASE + '/api/b/health/orphans', { method: 'POST', headers: H, body: '{}' })).json();
  ok(g.n === 1 && g.bytes === 5000 && p.removed === 1 && p.n === 0 && !fs.existsSync(old) && fs.existsSync(fresh) && owned.every((f) => fs.existsSync(path.join(dir, f)))
    && (await fetch(BASE + '/api/b/health/orphans', { headers: { cookie: vck } })).status === 403,
  `stray files: counted, then removed — only the old one no row names; the fresh one and the book's own photos stay (${JSON.stringify({ g, p, owned: owned.length })})`);
  fs.rmSync(fresh, { force: true }); }
// ---- the lite state's hash follows the guide text: a changed guide gives a new hash, and that hash serves the new text
{ const pool4 = new Pool({ connectionString: process.env.DATABASE_URL });
  const lite = async () => (await (await fetch(BASE + '/api/b/state?lite=1', { headers: { cookie: ck } })).json()).trips.find((t) => t.id === T).seed;
  const h1 = await lite();
  await pool4.query("UPDATE trips SET info = jsonb_set(info, '{zzTest}', '\"one\"') WHERE id=$1", [T]);
  const h2 = await lite(), g2 = await (await fetch(`${BASE}/api/b/seed/${T}/${h2}`, { headers: { cookie: ck } })).json();
  await pool4.query("UPDATE trips SET info = info - 'zzTest' WHERE id=$1", [T]); await pool4.end();
  const h3 = await lite();
  ok(h1 && h2 && h2 !== h1 && g2.info && g2.info.zzTest === 'one' && h3 === h1, `the lite state's hash moves with the guide text and comes back with it (${[h1, h2, h3].map((x) => String(x).slice(0, 6)).join(' → ')})`); }
// ---- letters for the future (server/capsule.js, migration 0034): sealed, the text stays on the server until its day
{ const put = (id, body, c = ck) => fetch(`${BASE}/api/b/capsules/${id}`, { method: 'PUT', headers: { ...H, cookie: c }, body: JSON.stringify(body) });
  const get = async () => (await (await fetch(BASE + '/api/b/capsules', { headers: { cookie: ck } })).json());
  const future = `${new Date().getFullYear() + 15}-05-01`;
  const past = await put('cap-test-0001', { child: 'mimi', text: 'x', open_on: '2001-01-01' });
  const a = await put('cap-test-0001', { child: 'mimi', title: 'For your 18th', text: 'Dear Mimi, you loved the big fish.', open_on: future });
  const l0 = (await get()).list.find((c) => c.id === 'cap-test-0001');
  const seal = await fetch(`${BASE}/api/b/capsules/cap-test-0001/seal`, { method: 'POST', headers: H });
  const l1 = (await get()).list.find((c) => c.id === 'cap-test-0001'), raw = JSON.stringify(await get());
  const again = await put('cap-test-0001', { child: 'mimi', text: 'changed', open_on: future });
  ok(past.status === 400 && a.ok && l0.text.startsWith('Dear Mimi') && !l0.sealed && seal.ok && l1.sealed && l1.text === undefined && !raw.includes('big fish') && again.status === 409
    && (await fetch(BASE + '/api/b/capsules', { headers: { cookie: vck } })).status === 403,
    'letters for the future: written and changed while open; sealed, its text never leaves the server before its day; relatives see none');
  await pool.query("UPDATE capsules SET open_on = (now() AT TIME ZONE 'Asia/Bangkok')::date WHERE id='cap-test-0001'");
  const l2 = (await get()).list.find((c) => c.id === 'cap-test-0001');
  ok(l2.open && l2.text.startsWith('Dear Mimi'), 'letters for the future: on its day it opens');
  await fetch(`${BASE}/api/b/capsules/cap-test-0001`, { method: 'DELETE', headers: H }); }
// ---- a book to keep for ever (server/keep.js): one HTML file with everything inside, nothing to fetch, no script
{ await fetch(`${BASE}/api/b/media/ph-keep-0001?trip=${T}&day=1&caption=${encodeURIComponent('ที่ท่าเรือ')}`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: await sharp({ create: { width: 2000, height: 1500, channels: 3, background: '#4a8' } }).jpeg().toBuffer() });
  await fetch(`${BASE}/api/b/entries/${T}.q.keep`, { method: 'PUT', headers: H, body: JSON.stringify({ trip: T, day: 1, kind: 'quote', child: 'mimi', text: 'Look, <b>a ship</b>!' }) });
  const r = await fetch(`${BASE}/api/b/keep/${T}?lang=en`, { headers: { cookie: ck } }), html = await r.text();
  const pics = (html.match(/<img[^>]+src="data:image\/jpeg;base64,/g) || []).length, outside = html.match(/(src|href)="(?!data:)[^"]*"/g) || [];
  ok(r.ok && /attachment; filename=".+-en\.html"/.test(r.headers.get('content-disposition')) && pics >= 1 && html.includes('Look, &lt;b&gt;a ship&lt;/b&gt;!') && html.includes('ที่ท่าเรือ') && !outside.length && !/<script/i.test(html),
    `a book to keep: one HTML file — the photos and pictures inside it, the words escaped, nothing fetched from outside, no script (${pics} photos, ${Math.round(html.length / 1024)} KB, outside: ${outside.slice(0, 3).join(' ')})`);
  ok((await fetch(`${BASE}/api/b/keep/${T}`, { headers: { cookie: vck } })).ok && (await fetch(`${BASE}/api/b/keep/${T}`)).status === 401, 'a book to keep: a relative may keep it too; a stranger may not');
  await fetch(`${BASE}/api/b/media/ph-keep-0001`, { method: 'DELETE', headers: H }); await fetch(`${BASE}/api/b/entries/${T}.q.keep`, { method: 'DELETE', headers: H }); }
// ---- two parents, one text (migration 0032): a change from the other phone since this one started editing is told, never written over
{ const ck2 = await login(), put = (c, body) => fetch(`${BASE}/api/b/entries/${T}.q.conflict`, { method: 'PUT', headers: { ...H, cookie: c }, body: JSON.stringify({ trip: T, day: 1, kind: 'quote', child: 'mimi', ...body }) });
  const ent = async () => (await state()).entries.find((e) => e.id === `${T}.q.conflict`);
  await put(ck, { text: 'Big fish!' }); const v0 = (await ent()).v;
  const b1 = await put(ck2, { text: 'Big fish, Daddy!', base: v0 });          // the other parent edits from the same version: fine
  const a2 = await put(ck, { text: 'Huge fish!', base: v0 });                  // this phone, still on the old version: told
  const a2j = await a2.json();
  const b2 = await put(ck2, { text: 'Big fish, Daddy!!', base: v0 });         // the same phone again, from its own old version: no conflict with itself
  const a3 = await put(ck, { text: 'Huge fish!', base: v0, force: true });     // "keep mine"
  ok(b1.ok && a2.status === 409 && a2j.error === 'conflict' && a2j.current.text === 'Big fish, Daddy!' && b2.ok && a3.ok && (await ent()).text === 'Huge fish!',
    `two phones: the other parent's change is told (409 with their text), a phone never conflicts with itself, "keep mine" writes (${JSON.stringify({ b1: b1.status, a2: a2.status, cur: a2j.current, b2: b2.status, a3: a3.status })})`);
  const tick = await fetch(`${BASE}/api/b/entries/${T}.tick.conflict.mimi`, { method: 'PUT', headers: H, body: JSON.stringify({ trip: T, day: 1, kind: 'tick', child: 'mimi', first_key: 'x', text: '1', base: 1 }) });
  ok(tick.ok, 'two phones: a tick or a colour (not a text) never asks — the last tap wins');
  // a caption the same way
  await fetch(`${BASE}/api/b/media/ph-conf-0001?trip=${T}&day=1`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: await sharp({ create: { width: 300, height: 200, channels: 3, background: '#a85' } }).jpeg().toBuffer() });
  const pm = (c, body) => fetch(`${BASE}/api/b/media/ph-conf-0001`, { method: 'PATCH', headers: { ...H, cookie: c }, body: JSON.stringify(body) });
  await pm(ck, { caption: 'At the pier' }); const mv = (await state()).media.find((m) => m.id === 'ph-conf-0001').v;
  const c1 = await pm(ck2, { caption: 'At the pier at sunset', base: mv }), c2 = await pm(ck, { caption: 'Pier!', base: mv }), c2j = await c2.json();
  ok(mv && c1.ok && c2.status === 409 && c2j.current.text === 'At the pier at sunset', `two phones: a photo's caption too (${JSON.stringify({ mv: !!mv, c1: c1.status, c2: c2.status })})`);
  await fetch(`${BASE}/api/b/media/ph-conf-0001`, { method: 'DELETE', headers: H });
  await fetch(`${BASE}/api/b/entries/${T}.q.conflict`, { method: 'DELETE', headers: H }); await fetch(`${BASE}/api/b/entries/${T}.tick.conflict.mimi`, { method: 'DELETE', headers: H }); }   // out of the way of the counts below
// ---- photos from the relatives (server/inbox.js, migration 0031): they wait apart until a parent puts one in or turns it away
{ const pic = await sharp({ create: { width: 1200, height: 900, channels: 3, background: '#7a9' } }).jpeg().withExif({ IFD0: { Make: 'PhoneCo', Model: 'X1' }, GPS: { GPSLatitudeRef: 'N', GPSLatitude: '13/1 45/1 0/1', GPSLongitudeRef: 'E', GPSLongitude: '100/1 30/1 0/1' } }).toBuffer();
  const send = (id, c, q = `trip=${T}&day=1&from=${encodeURIComponent('ยาย')}`) => fetch(`${BASE}/api/b/inbox/${id}?${q}`, { method: 'PUT', headers: { 'x-mb': '1', cookie: c, 'content-type': 'image/jpeg' }, body: pic });
  const a = await send('ib-test-0001', vck), b2 = await send('ib-test-0002', vck), noname = await send('ib-test-0003', vck, `trip=${T}&day=1`);
  const st0 = await state(), mineV = (await (await fetch(BASE + '/api/b/inbox', { headers: { cookie: vck } })).json()).items, allE = (await (await fetch(BASE + '/api/b/inbox', { headers: { cookie: ck } })).json()).items;
  ok(a.ok && b2.ok && noname.status === 400 && !st0.media.some((m) => /^ib-test/.test(m.id)) && mineV.length === 2 && allE.length === 2 && allE[0].from === 'ยาย' && allE[0].day === 1,
    `relatives' photos: a relative sends two (a name is needed); they wait apart — not in the book's state — the sender and the parents see them (${JSON.stringify({ a: a.status, n: noname.status, mineV: mineV.length, allE: allE.length })})`);
  const stored = path.join(DATA_DIR, 'media', 'i', T, 'ib-test-0001.jpg'), meta = await sharp(fs.readFileSync(stored)).metadata();
  ok(!meta.exif && fs.existsSync(path.join(DATA_DIR, 'media', 'i', T, 't', 'ib-test-0001.jpg')) && (await fetch(BASE + '/media/inbox/ib-test-0001/t', { headers: { cookie: vck } })).status === 200,
    'relatives\' photos: kept with no metadata or position, a thumbnail beside it; the sender can look at their own');
  ok((await fetch(BASE + '/api/b/inbox/ib-test-0001/ok', { method: 'POST', headers: { ...H, cookie: vck }, body: '{}' })).status === 403, 'relatives\' photos: a relative cannot put one in the book');
  const okr = await (await fetch(BASE + '/api/b/inbox/ib-test-0001/ok', { method: 'POST', headers: H, body: JSON.stringify({ day: 0 }) })).json();
  const st1 = await state(), m1 = st1.media.find((m) => m.id === 'ib-test-0001');
  ok(okr.ok && m1 && m1.day === 0 && (await fetch(BASE + '/media/ib-test-0001', { headers: { cookie: ck } })).status === 200 && !fs.existsSync(stored),
    `relatives' photos: a parent puts one in the day they pick — a photo of the book like any other, the waiting copy gone (${JSON.stringify(m1 && { day: m1.day, by: m1.created_by })})`);
  const del = await fetch(BASE + '/api/b/inbox/ib-test-0002', { method: 'DELETE', headers: H });
  ok(del.ok && !fs.existsSync(path.join(DATA_DIR, 'media', 'i', T, 'ib-test-0002.jpg')) && !(await (await fetch(BASE + '/api/b/inbox', { headers: { cookie: ck } })).json()).items.length,
    'relatives\' photos: turned away, its files are deleted at once');
  await fetch(BASE + '/api/b/media/ib-test-0001', { method: 'DELETE', headers: H }); }   // out of the way of the counts below
// ---- what went wrong on the phones (server/errors.js, migration 0030): scrubbed, counted once a day, editors read and clear
{ const err = (b, c = ck) => fetch(BASE + '/api/b/err', { method: 'POST', headers: { ...H, cookie: c }, body: JSON.stringify(b) });
  const one = { msg: `TypeError: Cannot read properties of undefined (reading 'title') "มีมี่ไปทะเล" mail@example.com 0812345678 https://x.example/views.js?v=1#/kid/mimi`, src: '/views.js', line: 812, col: 9, ver: 'mbs-v239-abcd12', route: 'kid/colour', device: 'ipad safari 17 app' };
  const r1 = await err(one), r2 = await err(one, vck), r3 = await err({ ...one, src: 'https://evil.example/x.js', route: '#/t/hk/log/2', device: 'Mimi’s iPad', ver: '<b>' });
  ok(r1.ok && r2.ok && r3.ok && (await err({ msg: '' })).status === 400 && (await fetch(BASE + '/api/b/err', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify(one) })).status === 401,
    'phone problems: a signed-in phone (a parent or a relative) reports one; an empty one is refused, a signed-out one too');
  const list = await (await fetch(BASE + '/api/b/health/errors', { headers: { cookie: ck } })).json(), e = list.errors.find((x) => x.src === '/views.js'), odd = list.errors.find((x) => x.src === '');
  const blob = JSON.stringify(list);
  ok(e && e.n === 2 && e.line === 812 && e.route === 'kid/colour' && e.device === 'ipad safari 17 app' && /reading 'title'/.test(e.msg) && odd && odd.route === '' && odd.ver === '' && odd.device === 'other other 0'
    && !/มีมี่|mail@|0812345678|example|mimi|Mimi|evil|<b>/.test(blob),
    `phone problems: the same one twice is one row counted twice; a name, a text, an address, a number, a URL and a foreign file never stored (${blob.slice(0, 400)})`);
  ok((await fetch(BASE + '/api/b/health/errors', { headers: { cookie: vck } })).status === 403 && (await fetch(BASE + '/api/b/health/storage', { headers: { cookie: vck } })).status === 403, 'phone problems and room: relatives cannot read them');
  await fetch(`${BASE}/api/b/media/vc-room-0001?trip=${T}&day=1&kind=audio`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'audio/webm' }, body: Buffer.alloc(5000, 3) });
  const room = await (await fetch(BASE + '/api/b/health/storage', { headers: { cookie: ck } })).json();
  const bk = room.books.find((b) => b.id === T);
  ok(bk && bk.kinds.voices && bk.kinds.voices.n === 1 && bk.kinds.voices.bytes === 5000 && bk.total >= 5000 && room.total === room.books.reduce((s, b) => s + b.total, 0) && room.total > 0,
    `room: each book's photos, clips and voice memos counted in bytes, the family's total adds up (${JSON.stringify(bk && bk.kinds)})`);
  ok((await fetch(BASE + '/api/b/health/errors', { method: 'DELETE', headers: H })).ok && !(await (await fetch(BASE + '/api/b/health/errors', { headers: { cookie: ck } })).json()).errors.length, 'phone problems: the parents can clear the list');
  let slow = 0; for (let k = 0; k < 25; k++) if ((await err({ ...one, line: 1000 + k })).status === 429) slow++;
  ok(slow >= 1, `phone problems: a phone sending in a loop is slowed (${slow} of 25 refused)`); }
// the library of places to eat with the app's built-in list (server/eats): the towns carry their country; a built-in place says so;
// a place of our own book wins over a built-in one of the same name
{ const lib = await (await fetch(BASE + '/api/b/eatlib', { headers: { cookie: ck } })).json();
  const tok = (lib.towns || []).find((t) => t.tkey === 'tokyo'), mac = (lib.towns || []).find((t) => t.tkey === 'macau');
  ok(lib.towns.length > 100 && tok && tok.n >= 12 && !tok.own && tok.country && tok.country.cc === 'jp' && mac && mac.own > 100 && mac.n >= mac.own, `eat library: the built-in list fills the towns of the picture library, each with its country; our own books' towns count their own (${lib.towns.length} towns · Tokyo ${tok && tok.n} · Macau ${mac && mac.n}/${mac && mac.own} ours)`);
  const tk = (await (await fetch(BASE + '/api/b/eatlib?town=tokyo', { headers: { cookie: ck } })).json()).places;
  // a built-in place is marked as one; only a row whose file says a web search confirmed it ("ok": "YYYY-MM") carries "open" and that month
  const E0 = createRequire(import.meta.url)('../server/eatlib.js'), idx0 = JSON.parse(fs.readFileSync('public/stock/index.json', 'utf8'));
  const okNames = new Set(E0.starterFiles().flatMap((f) => E0.starterRows(f, idx0)).filter((x) => x.tkey === 'tokyo' && x.st === 'open').map((x) => x.name));
  ok(tk.every((x) => x.src === 'starter' && x.what && x.pr && x.q && (okNames.has(x.name) ? x.st === 'open' && /^20\d\d-\d\d-01$/.test(x.checked) : !x.st && !x.checked)),
    `eat library: a built-in place is marked as one — not checked, unless its file says a web search confirmed it (${okNames.size} of ${tk.length} in Tokyo confirmed)`);
  const dup = (await pool.query("SELECT name, count(*)::int n FROM eat_lib WHERE tkey='macau' GROUP BY nkey, name HAVING count(*) > 1")).rows;
  // the names our Hong Kong–Macau book and the built-in Macau file both hold: each is one row, and it is the book's
  const E = createRequire(import.meta.url)('../server/eatlib.js'), idx = JSON.parse(fs.readFileSync('public/stock/index.json', 'utf8')), seed = JSON.parse(fs.readFileSync('server/seeds/hk-macau-2026.json', 'utf8'));
  const mine = new Set(E.rowsOfBook(seed.info.restaurants, idx).filter((x) => x.tkey === 'macau').map((x) => x.nkey)), shared = E.starterRows('mo-1.json', idx).filter((x) => mine.has(x.nkey)).map((x) => x.nkey);
  const both = shared.length ? (await pool.query("SELECT src FROM eat_lib WHERE tkey='macau' AND nkey = ANY($1)", [shared])).rows : [];
  ok(!dup.length && both.length === shared.length && both.every((x) => x.src === 'book'), `eat library: a place in both our book and the built-in list is kept once, as the book's (${shared.length} shared: ${shared.slice(0, 4).join(', ')})`);
  // a built-in place the files no longer hold leaves the library on the next read of the files; one the parents took out keeps its mark
  const fam = (await pool.query("SELECT family_id FROM eat_lib LIMIT 1")).rows[0].family_id, mk = (name) => ({ ...E.starterRows('jp-1.json', idx)[0], name, nkey: E.norm(name) });
  await E.put(pool, fam, [mk('Closed Last Year Diner'), mk('Parents Took This Out')], 'starter', null);
  await pool.query("UPDATE eat_lib SET gone = true WHERE nkey = $1", [E.norm('Parents Took This Out')]);
  const nBefore = (await pool.query("SELECT count(*)::int n FROM eat_lib WHERE NOT gone")).rows[0].n;
  await pool.query("DELETE FROM settings WHERE key='eat_starter'"); await E.syncStarter(pool, fam, idx);
  const left = (await pool.query("SELECT nkey, gone FROM eat_lib WHERE nkey = ANY($1)", [[E.norm('Closed Last Year Diner'), E.norm('Parents Took This Out')]])).rows;
  const nAfter = (await pool.query("SELECT count(*)::int n FROM eat_lib WHERE NOT gone")).rows[0].n, ours = (await pool.query("SELECT count(*)::int n FROM eat_lib WHERE src='book'")).rows[0].n;
  ok(left.length === 1 && left[0].gone && nAfter === nBefore - 1 && ours > 400, `eat library: a built-in place no longer in the files leaves the library; the parents' removal and our books' places stay (${nBefore} → ${nAfter}, ${ours} from books, left ${JSON.stringify(left)})`); }
await pool.end();

console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
