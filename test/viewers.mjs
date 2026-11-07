// Relatives in groups: each group its own view-only PIN and/or link, and only the books ticked for it — everywhere a relative
// can reach (state, guide text, photos, PDF, weather, hearts). Deleting a group signs its phones out; a new link kills the old.
import fs from 'node:fs';
import { createRequire } from 'node:module';
import { chromium } from 'playwright';
const sharp = createRequire(import.meta.url)('sharp');
const { BASE, CODE } = process.env;
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('relatives in groups');
const HK = 'hk-macau-2026', AU = 'big-hop-2027';
const login = (code, name) => fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code, ...(name ? { name } : {}) }) });
const cookie = (r) => (r.headers.get('set-cookie') || '').split(';')[0];
const ck = cookie(await login(CODE));
const H = { 'x-mb': '1', cookie: ck, 'content-type': 'application/json' };
const put = (u, b, h = H) => fetch(BASE + u, { method: 'PUT', headers: h, body: JSON.stringify(b) });
const get = (u, c) => fetch(BASE + u, { headers: { cookie: c } });
const state = async (c) => (await get('/api/b/state', c)).json();

// a photo in each book, and a quote in each
const raw = await sharp({ create: { width: 64, height: 48, channels: 3, background: '#3b82f6' } }).jpeg().toBuffer();
for (const [id, t] of [['vg-ph-hk-01', HK], ['vg-ph-au-01', AU]]) await fetch(`${BASE}/api/b/media/${id}?trip=${t}&day=0`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck, 'content-type': 'image/jpeg' }, body: raw });
await put('/api/b/entries/vg-q-hk-01', { trip: HK, day: 0, kind: 'quote', child: 'mimi', text: 'hk words' });
await put('/api/b/entries/vg-q-au-01', { trip: AU, day: 0, kind: 'quote', child: 'mimi', text: 'au words' });

// ---- editors make groups
const g1 = await put('/api/b/viewers/vg-yai-001', { name: 'ฝั่งคุณยาย', pin: '112233', trips: [HK], link: false });
const g1j = await g1.json();
ok(g1.ok && g1j.group.pin === true && g1j.group.link === null && !JSON.stringify(g1j).includes('112233'), 'a PIN group is made; the PIN never comes back');
const g2 = await (await put('/api/b/viewers/vg-friends-01', { name: 'เพื่อน', trips: [AU], link: true })).json();
ok(/^\/v\/[A-Za-z0-9_-]{24,}$/.test(g2.group.link), 'a link-only group gets its own link');
ok((await put('/api/b/viewers/vg-x-000001', { name: 'x', pin: CODE, trips: [HK] })).status === 409, "the family's PIN cannot be a group PIN");
ok((await put('/api/b/viewers/vg-x-000001', { name: 'x', pin: '835911', trips: [HK] })).status === 409, "the old shared view PIN cannot be a group PIN");
ok((await put('/api/b/viewers/vg-x-000001', { name: 'x', pin: '112233', trips: [HK] })).status === 409, "another group's PIN cannot be reused");
ok((await put('/api/b/viewers/vg-x-000001', { name: 'x', pin: '12ab', trips: [HK] })).status === 400 && (await put('/api/b/viewers/vg-x-000001', { name: 'x', pin: '12345', trips: [HK] })).status === 400, 'a PIN must be 6–12 digits');
ok((await put('/api/b/viewers/vg-x-000001', { name: 'x', trips: [HK], link: false })).status === 400, 'a group needs a PIN or a link');
const { Client } = createRequire(import.meta.url)('pg');
const db = new Client({ connectionString: process.env.DATABASE_URL }); await db.connect();
const row = (await db.query("SELECT pin_hash, pin_len FROM viewer_groups WHERE id='vg-yai-001'")).rows[0];
ok(row && row.pin_hash.length === 64 && !row.pin_hash.includes('112233'), 'only a keyed hash of the PIN is stored');
ok(row.pin_len === 6 && (await (await fetch(BASE + '/api/brand')).json()).pin.lens.includes(6) && !JSON.stringify(await (await fetch(BASE + '/api/brand')).json()).includes('112233'), "the group PIN's length is kept beside the hash and offered to the sign-in pad (no digit of it)");

// ---- a group PIN sees only its books, everywhere
const yr = await login('112233');
const yck = cookie(yr), ys = await state(yck);
ok(yr.ok && (await yr.json()).role === 'viewer' && ys.me.role === 'viewer' && ys.me.group === 'ฝั่งคุณยาย' && ys.me.name === 'ฝั่งคุณยาย', 'the group PIN signs in read-only, named after the group');
ok(ys.trips.length === 1 && ys.trips[0].id === HK, 'the group sees only its book on the shelf');
ok(ys.entries.every((e) => e.trip === HK) && ys.entries.some((e) => e.text === 'hk words') && ys.media.every((m) => m.trip === HK), "no quote or photo from another book reaches the group's phone");
const aus = (await state(ck)).trips.find((t) => t.id === AU);
const lite = (await (await get('/api/b/state?lite=1', ck)).json()).trips.find((t) => t.id === AU);
ok((await get(`/api/b/seed/${AU}/${lite.seed}`, yck)).status === 404 && aus, "another book's guide text → 404");
ok((await get('/media/vg-ph-au-01/t', yck)).status === 404 && (await get('/media/vg-ph-hk-01/t', yck)).status === 200, "another book's photo → 404, its own book's photo → 200");
ok((await get(`/api/b/pdf/${AU}`, yck)).status === 404 && (await get(`/api/b/wx/${AU}`, yck)).status === 404, "another book's PDF and weather → 404");
const heart = (t, c) => fetch(BASE + '/api/b/hearts/vg-heart-' + t.slice(0, 2), { method: 'PUT', headers: { 'x-mb': '1', cookie: c, 'content-type': 'application/json' }, body: JSON.stringify({ trip: t, day: 0, child: 'mimi', emoji: '💗', from: 'ยาย', text: '' }) });
ok((await heart(AU, yck)).status === 400 && (await heart(HK, yck)).ok, 'a heart only into its own book');
ok((await put('/api/b/entries/vg-q-yai-01', { trip: HK, day: 0, kind: 'quote', child: 'mimi', text: 'x' }, { ...H, cookie: yck })).status === 403, 'a group is read-only');
ok((await get('/api/b/viewers', yck)).status === 403, 'a relative cannot list the groups');

// ---- a group link
const lr = await fetch(BASE + g2.group.link, { redirect: 'manual' });
const lck = cookie(lr), ls = await state(lck);
ok(lr.status === 302 && ls.trips.length === 1 && ls.trips[0].id === AU && ls.me.name === 'เพื่อน', "the group's link opens only its book");
const g2b = await (await put('/api/b/viewers/vg-friends-01', { name: 'เพื่อน', trips: [AU], link: 'new' })).json();
ok(g2b.group.link !== g2.group.link && (await fetch(BASE + g2.group.link, { redirect: 'manual' })).status === 404 && (await fetch(BASE + g2b.group.link, { redirect: 'manual' })).status === 302, 'a new link stops the old one');

// ---- editors change the books / delete a group
await put('/api/b/viewers/vg-yai-001', { name: 'ฝั่งคุณยาย', trips: [HK, AU] });
ok((await state(yck)).trips.length === 2 && (await login('112233')).ok, 'ticking another book shows it at once; the PIN is kept when left empty');
ok((await (await fetch(BASE + '/api/b/viewers/vg-yai-001', { method: 'DELETE', headers: { 'x-mb': '1', cookie: ck } })).json()).ok, 'an editor deletes a group');
ok((await get('/api/b/state', yck)).status === 401 && (await login('112233')).status === 401, "a deleted group's phones are signed out and its PIN stops working");

// ---- the family and the old shared PIN/link still see everything
ok((await state(cookie(await login('835911')))).trips.length === 2 && (await state(ck)).trips.length === 2, 'the family and the old shared view PIN still see every book');

// ---- the editor page
const exe = process.env.CHROME || (fs.existsSync(chromium.executablePath()) ? undefined : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome');
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
try {
  const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  const errs = []; page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(BASE + '/'); await page.fill('#lcode', CODE); await page.click('#lf button[type=submit]'); await page.waitForSelector('.shelf');
  await page.click('a[href="#/viewers"]'); await page.waitForSelector('.vgform');
  await page.fill('#vgname', 'ฝั่งคุณย่า'); await page.fill('#vgpin', '445566');
  await page.locator(`.vgchecks input[data-v="${AU}"]`).uncheck();
  await page.click('[data-a="vgsave"]'); await page.waitForSelector('.vgjust');
  ok((await page.textContent('.vgpin')) === '445566' && await page.locator('.vgcard', { hasText: 'ฝั่งคุณย่า' }).count() === 1, 'browser: a new group shows its PIN once and appears in the list');
  const ys2 = await state(cookie(await login('445566')));
  ok(ys2.trips.length === 1 && ys2.trips[0].id === HK, 'browser: the unticked book is hidden from that group');
  await page.reload(); await page.waitForSelector('.vgcard');
  ok(await page.locator('.vgjust').count() === 0, 'the PIN is not shown again');
  ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no sideways scroll at 390 px');
  ok(errs.length === 0, 'no page errors ' + errs.join(' | '));
} finally { await browser.close(); await db.end(); }

console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
