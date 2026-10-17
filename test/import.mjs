// Harbour Hop importer (ACCEPTANCE F) using docs/handoff/moments.sample.jsonl + a GPS-tagged asset + bad rows.
import sharp from 'sharp';
import archiver from 'archiver';
import fs from 'node:fs';

const { BASE, CODE } = process.env;
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('harbour hop import');

const sample = fs.readFileSync('docs/handoff/moments.sample.jsonl', 'utf8').trim().split('\n').map((l) => JSON.parse(l));
const moments = [...sample,
  { id: 'q2', trip: 'hk2026', k: 'quote', d: 3, who: 'mimi', text: 'สพันจ์บ็อบ!', hi: true, at: 1796700000000 },
  { id: 'fav_d1', trip: 'hk2026', k: 'fav', d: 1, text: 'ไอติมมิกกี้', at: 1796561100000 },
  { id: 'first_c1', trip: 'hk2026', k: 'first', key: 'custom', who: 'mika', d: 2, text: 'เดินเองบนเรือ', at: 1796600000000 },
  { id: 'story_all', trip: 'hk2026', k: 'story', d: -1, text: 'นิทานทั้งทริป', lang: 'th', at: 1796900000000 },
  { id: 'bad1', trip: 'hk2026', k: 'quote', d: 9, who: 'mimi', text: 'day out of range', at: 1 },
  { id: 'bad2', trip: 'hk2026', k: 'photo', d: 1, img: 'nothex', at: 1 },
  { id: 'bad3', trip: 'other', k: 'note', d: 1, text: 'x', at: 1 },
  { id: 'ph2', trip: 'hk2026', k: 'photo', d: 2, img: 'ffffffffffffffffffffffffffffffff', text: 'missing asset', at: 1796600000000 },
];
const visits = { p1_abc: { kind: 'p', en: 'Hong Kong Disneyland', th: 'ฮ่องกงดิสนีย์แลนด์', zh: '香港迪士尼樂園', d: 1, at: 1796558000000 }, r_def: { kind: 'r', en: 'Wong Chi Kei', th: 'Wong Chi Kei', d: 4, at: 1796800000000 } };
const days = [{ id: 'd0', done: true, at: 1796500000000 }, { id: 'd1', done: false }];
const gps = await sharp({ create: { width: 1600, height: 1200, channels: 3, background: '#FF5F45' } })
  .withExif({ IFD0: { Make: 'iPhone' }, IFD3: { GPSLatitudeRef: 'N', GPSLatitude: '22/1 18/1 0/1', GPSLongitudeRef: 'E', GPSLongitude: '114/1 2/1 0/1' } }).jpeg().toBuffer();
const zip = await new Promise((res, rej) => {
  const a = archiver('zip'); const p = []; a.on('data', (d) => p.push(d)); a.on('end', () => res(Buffer.concat(p))); a.on('error', rej);
  a.append(moments.map((m) => JSON.stringify(m)).join('\n'), { name: 'moments.jsonl' });
  a.append(JSON.stringify(visits), { name: 'visits.json' });
  a.append(JSON.stringify(days.map((d) => ({ id: d.id, data: d }))), { name: 'days.json' });
  a.append(gps, { name: 'assets/3fa85f64a1b24c0e9d2e7b1c8e4d5a60.jpg' });
  a.finalize();
});

const ck = (await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: CODE, name: 'แม่' }) })).headers.get('set-cookie').split(';')[0];
const post = (q, body = zip, cookie = ck) => fetch(`${BASE}/api/b/import/harbour-hop${q}`, { method: 'POST', headers: { 'x-mb': '1', cookie, 'content-type': 'application/zip' }, body });
const state = async () => (await fetch(BASE + '/api/b/state', { headers: { cookie: ck } })).json();

const dry = await (await post('?dry=1')).json();
ok(dry.dry && dry.read.photo === 2 && dry.read.quote === 2 && dry.read.story === 2 && dry.read.visit === 2, `dry run counts per type ${JSON.stringify(dry.read)}`);
ok(dry.invalid.length === 4 && ['bad1', 'bad2', 'bad3', 'ph2'].every((id) => dry.invalid.some((x) => x.id === id)), `invalid rows reported one by one: ${dry.invalid.map((x) => `${x.id} (${x.error})`).join('; ')}`);
ok(JSON.stringify(dry.before) === JSON.stringify({ photos: 0, quotes: 0, firsts: 0, places: 0 }) && JSON.stringify(dry.after) === JSON.stringify({ photos: 1, quotes: 2, firsts: 2, places: 2 }), `dry run before → after ${JSON.stringify(dry.before)} → ${JSON.stringify(dry.after)}`);
let s = await state();
ok(!s.entries.length && !s.media.length && !s.places.length, 'dry run wrote nothing');

const r1 = await (await post('')).json();
ok(!r1.dry && JSON.stringify(r1.after) === JSON.stringify(dry.after) && r1.photos.stored === 1, 'apply: same numbers as the dry run');
s = await state();
const T = 'hk-macau-2026';
ok(s.media.length === 1 && s.media[0].caption === 'ที่ท่าเรือ' && s.media[0].highlight && s.media[0].day === 1, 'photo imported with caption, ⭐, day');
const img = Buffer.from(await (await fetch(`${BASE}/media/${s.media[0].id}`, { headers: { cookie: ck } })).arrayBuffer());
const meta = await sharp(img).metadata();
ok(!meta.exif && !img.includes('iPhone'), 'imported photo has no EXIF/GPS, stored under a new key (not the asset id)');
ok(s.entries.some((e) => e.id === `${T}.mood.d1.mimi` && e.mood === '🤩'), 'mood uses the app\'s id → later edits merge');
ok(s.entries.some((e) => e.id === `${T}.first.mickey.mimi`) && s.entries.some((e) => e.kind === 'first' && e.first_key === 'custom' && e.text === 'เดินเองบนเรือ'), 'firsts (catalog + custom)');
ok(s.entries.some((e) => e.kind === 'story' && e.day === null && e.text === 'นิทานทั้งทริป'), 'whole-trip story (d = -1)');
ok(s.places.some((p) => p.key === 'Wong Chi Kei' && p.kind === 'food' && p.day === 4) && s.places.some((p) => p.name.zh === '香港迪士尼樂園'), 'visits → check-ins (restaurant = food, Chinese name kept)');
const hk = s.trips.find((t) => t.id === T);
ok(hk.days[0].done_at > 0 && !hk.days[1].done_at, 'days: Done carried over');

const r2 = await (await post('')).json();
ok(Object.keys(r2.imported).length === 0 && r2.photos.stored === 0 && JSON.stringify(r2.after) === JSON.stringify(r1.after), 'second import adds nothing (idempotent)');
const vck = (await fetch(BASE + '/v/grandma', { redirect: 'manual' })).headers.get('set-cookie').split(';')[0];
ok((await post('?dry=1', zip, vck)).status === 403, 'viewer cannot import');
ok((await post('?dry=1', Buffer.from('nope nope nope nope nope nope nope nope nope nope nope nope'))).status === 400, 'not a zip → 400');

console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
