// End-to-end smoke test. Normally run via `npm test` (test/run.mjs starts a server). Standalone: BASE=http://localhost:3111 CODE=hop2027 node test/smoke.mjs
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:3111';
const CODE = process.env.CODE || 'hop2027';
const OUT = process.env.SHOTS || '/tmp/mb-shots';
fs.mkdirSync(OUT, { recursive: true });
// Browser: $CHROME, else Playwright's own Chromium (npx playwright install chromium), else the sandbox's preinstalled copy.
const exe = process.env.CHROME || (fs.existsSync(chromium.executablePath()) ? undefined : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome');
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };

async function img(i, label) {
  const hue = [[255, 138, 31], [224, 82, 156], [20, 194, 163], [61, 123, 255], [139, 92, 246]][i % 5];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200"><rect width="1600" height="1200" fill="rgb(${hue})"/><circle cx="1200" cy="300" r="140" fill="#FFE27A"/><rect y="800" width="1600" height="400" fill="rgba(0,0,0,.18)"/><text x="80" y="700" font-size="140" font-family="sans-serif" fill="#fff">${label}</text></svg>`;
  return sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toBuffer();
}
async function seed() {
  const r = await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: CODE, name: 'พ่อ' }) });
  const ck = r.headers.get('set-cookie').split(';')[0];
  const H = { 'x-mb': '1', cookie: ck };
  const J = { ...H, 'content-type': 'application/json' };
  const put = (u, b) => fetch(BASE + u, { method: 'PUT', headers: J, body: JSON.stringify(b) });
  const st = await (await fetch(BASE + '/api/state', { headers: { cookie: ck } })).json();
  if (st.memories.length) return;
  const T = 'bighop2027';
  const rows = [
    ['mseed0001', 2, ['mimi', 'mika'], { mimi: '😍', mika: '😋' }, 'มีมี่: “ปลานี้ใหญ่กว่าหนูอีก!”', 'Fish Vibes', 'food', 2],
    ['mseed0002', 2, ['mimi'], { mimi: '🤩' }, 'ครั้งแรกที่เห็นคลื่นใหญ่ขนาดนี้', 'Kiama Blowhole', 'place', 3],
    ['mseed0003', 5, ['mimi', 'mika'], { mika: '😴' }, 'มีก้าหลับในรถตั้งแต่ Katoomba', '', '', 1],
  ];
  for (const [id, day, kids, mood, text, sk, kind, np] of rows) {
    await put('/api/memories/' + id, { trip: T, day, kids, mood, text, stop: sk ? { key: sk, name: sk, kind } : null, at: Date.now() - (3 - np) * 3600e3 });
    for (let i = 0; i < np; i++) {
      await fetch(`${BASE}/api/photos/p${id}${i}?mem=${id}`, { method: 'PUT', headers: { ...H, 'content-type': 'image/jpeg' }, body: await img(i + day, 'Day ' + day) });
    }
  }
  await put('/api/checkins', { trip: T, key: 'Fish Vibes', day: 2, kind: 'food', name: 'Fish Vibes', done: true, at: Date.now() - 7200e3 });
  await put('/api/checkins', { trip: T, key: 'Kiama Blowhole', day: 2, kind: 'place', name: 'Kiama Blowhole', done: true, at: Date.now() - 6000e3 });
  await put('/api/stories', { trip: T, day: 2, lang: 'th', text: 'วันนี้เราขับรถเลียบทะเล มีมี่เห็นคลื่นใหญ่ที่สุดในชีวิต และกินปลาตัวโตที่ริมหาด' });
  await put('/api/tripkid', { trip: T, kid: 'mimi', age: '3 ปี 6 เดือน', height: '98', fav: 'จิงโจ้ ไอศกรีมมะม่วง', note: 'ชอบพูดว่า “เดี๋ยวหนูทำเอง”' });
  await put('/api/tripkid', { trip: T, kid: 'mika', age: '1 ปี 8 เดือน', height: '82', fav: 'กล้วย', note: 'เดินเตาะแตะ ชอบชี้ทุกอย่าง' });
  await put('/api/kids/mimi', { birth: '2023-04-10' });
  await put('/api/letters/lseed0001', { to: 'mimi', title: 'ถึงมีมี่ตอนอายุ 18', text: 'ลูกรัก ตอนที่หนูอ่านนี้ พ่อกับแม่อยากให้รู้ว่าทริปแรกของหนูสนุกที่สุด', open_at: '2041-04-10' });
}

const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
async function session(scheme, name) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: scheme, permissions: [] });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/favicon|401/.test(m.text())) errs.push(m.text()); });
  return { ctx, page, errs, shot: (n) => page.screenshot({ path: path.join(OUT, `${name}-${n}.png`) }), full: (n) => page.screenshot({ path: path.join(OUT, `${name}-${n}.png`), fullPage: true }) };
}

await seed();

// ---- light mode: login + capture flow
{
  const s = await session('light', 'light');
  const { page } = s;
  await page.goto(BASE + '/');
  await page.waitForSelector('#lf');
  await s.shot('01-login');
  await page.fill('#lcode', 'wrong'); await page.fill('#lname', 'แม่'); await page.click('#lf button');
  await page.waitForFunction(() => document.querySelector('#lerr').textContent.length > 0);
  ok(true, 'wrong code shows error');
  await page.fill('#lcode', CODE); await page.click('#lf button');
  await page.waitForSelector('.shelf');
  await s.full('02-shelf');
  ok(await page.locator('.cover').count() >= 3, 'shelf has two bundled trips + add card');
  ok(await page.locator('.cover[href="#/trip/harbourhop2026"]').count() === 1, 'Harbour Hop (HK) on shelf');
  ok((await page.locator('nav.bar').count()) === 1, 'tab bar present');

  await page.click('.cover[href="#/trip/bighop2027"]');
  await page.waitForSelector('.pc');
  await s.full('03-trip');
  ok(await page.locator('.pc').count() >= 2, 'postcards for days with content');
  ok(await page.locator('.mos img').count() >= 3, 'photo mosaic shows thumbnails');
  const broken = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length);
  ok(broken === 0, 'no broken images (' + broken + ')');

  // lightbox
  await page.click('.mos button >> nth=0');
  await page.waitForSelector('#lb img');
  await s.shot('04-lightbox');
  await page.keyboard.press('Escape');

  // capture a new memory with 2 photos
  await page.click('nav.bar button.cap');
  await page.waitForSelector('#ctext');
  await page.selectOption('#cday', '3');
  await page.selectOption('#cstop', { index: 1 });
  await page.setInputFiles('#fpick', [{ name: 'a.jpg', mimeType: 'image/jpeg', buffer: await img(1, 'New A') }, { name: 'b.jpg', mimeType: 'image/jpeg', buffer: await img(2, 'New B') }]);
  await page.waitForSelector('.prev img >> nth=1');
  await page.click('button[data-a="cmood"][data-k="mimi"][data-v="🤩"]');
  await page.fill('#ctext', 'ทดสอบ: มีมี่ร้องว้าวตอนเห็นวาฬ');
  await s.full('05-capture-sheet');
  await page.click('#csave');
  await page.waitForFunction(() => document.querySelector('#sheet').hidden);
  await page.waitForFunction(() => !document.querySelector('.mom .tag.warn') && document.body.innerText.includes('ร้องว้าวตอนเห็นวาฬ'), null, { timeout: 15000 });
  ok(true, 'memory saved and uploaded');
  const st = await page.evaluate(async () => (await fetch('/api/state')).json());
  const mine = st.memories.find((m) => m.text.includes('วาฬ'));
  ok(mine && mine.photos.length === 2 && mine.day === 3, 'server has memory with 2 photos on day 3');
  ok(st.checkins.length >= 3, 'stamp collected via capture (' + st.checkins.length + ')');
  await s.full('06-trip-after');

  // stamps
  await page.click('nav.bar a[href="#/stamps"]'); await page.waitForSelector('.stamps');
  await s.full('07-stamps');
  ok(await page.locator('.stamp').count() >= 3, 'stamps rendered');
  // kids
  await page.click('nav.bar a[href="#/kids"]'); await page.waitForSelector('.kcard');
  await s.full('08-kids');
  // letters
  await page.click('nav.bar a[href="#/letters"]'); await page.waitForSelector('.letter');
  await s.full('09-letters');
  ok(await page.locator('.letter.sealed').count() >= 1, 'sealed letter shown');
  const lt = await page.evaluate(async () => (await (await fetch('/api/state')).json()).letters.map((l) => l.text));
  ok(lt.every((t) => t === null || t.length > 0), 'letters API ok');
  // new letter sheet
  await page.click('button[data-a="newletter"]'); await page.waitForSelector('#ltext');
  await s.full('10-letter-sheet');
  await page.keyboard.press('Escape');
  // book
  await page.goto(BASE + '/#/book/bighop2027/mimi'); await page.waitForSelector('.page');
  await s.full('11-book');
  ok(await page.locator('.page').count() >= 3, 'book has cover + day pages');
  await page.pdf({ path: path.join(OUT, 'book-mimi.pdf'), format: 'A5', printBackground: true });
  // english
  await page.goto(BASE + '/#/'); await page.waitForSelector('.shelf');
  await page.click('button[data-v="en"]'); await page.waitForSelector('text=The shelf');
  await s.shot('12-shelf-en');
  ok(s.errs.length === 0, 'no console errors: ' + s.errs.join(' | '));
  await s.ctx.close();
}

// ---- offline queue
{
  const s = await session('light', 'offline');
  const { page, ctx } = s;
  await page.goto(BASE + '/');
  await page.waitForSelector('#lf, .shelf');   // boot is async: wait for login form or shelf before deciding
  if (await page.locator('#lf').count()) { await page.fill('#lcode', CODE); await page.fill('#lname', 'พ่อ'); await page.click('#lf button'); }
  await page.waitForSelector('.shelf');
  await page.goto(BASE + '/#/trip/bighop2027'); await page.waitForSelector('.pc');
  await ctx.setOffline(true);
  await page.click('nav.bar button.cap'); await page.waitForSelector('#ctext');
  await page.setInputFiles('#fpick', [{ name: 'o.jpg', mimeType: 'image/jpeg', buffer: await img(3, 'Offline') }]);
  await page.waitForSelector('.prev img');
  await page.fill('#ctext', 'ออฟไลน์: เก็บในเครื่องก่อน');
  await page.click('#csave');
  await page.waitForFunction(() => document.body.innerText.includes('ออฟไลน์: เก็บในเครื่องก่อน'));
  const pendingShown = await page.locator('.tag.warn').count();
  ok(pendingShown >= 1, 'pending memory shown with ⏳ while offline');
  await s.shot('13-offline-pending');
  const q = await page.evaluate(() => idb.all().then((a) => a.length));
  ok(q === 1, 'queued in IndexedDB (' + q + ')');
  await ctx.setOffline(false);
  await page.evaluate(() => flush());
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  const st2 = await page.evaluate(async () => (await fetch('/api/state')).json());
  ok(st2.memories.some((m) => m.text.includes('ออฟไลน์') && m.photos.length === 1), 'queued memory uploaded after reconnect');
  await ctx.close();
}

// ---- dark mode + viewer
{
  const s = await session('dark', 'dark');
  const { page } = s;
  await page.goto(BASE + '/');
  await page.fill('#lcode', CODE); await page.fill('#lname', 'พ่อ'); await page.click('#lf button');
  await page.waitForSelector('.shelf');
  await s.full('20-shelf-dark');
  await page.goto(BASE + '/#/trip/bighop2027'); await page.waitForSelector('.pc');
  await s.full('21-trip-dark');
  await page.goto(BASE + '/#/stamps'); await page.waitForSelector('.stamps');
  await s.full('22-stamps-dark');
  await page.click('nav.bar button.cap'); await page.waitForSelector('#ctext');
  await s.full('23-capture-dark');
  ok(s.errs.length === 0, 'no console errors (dark): ' + s.errs.join(' | '));
  await s.ctx.close();
}
{
  const s = await session('light', 'viewer');
  const { page } = s;
  await page.goto(BASE + '/v/grandma');
  await page.waitForSelector('.shelf');
  ok((await page.locator('nav.bar button.cap').count()) === 0, 'viewer has no capture button');
  ok((await page.locator('button[data-a="addtrip"]').count()) === 0, 'viewer cannot add trips');
  await page.goto(BASE + '/#/trip/bighop2027'); await page.waitForSelector('.pc');
  ok((await page.locator('.pc .dayact, .pc .add').count()) === 0, 'viewer sees no edit controls');
  const w = await page.evaluate(async () => (await fetch('/api/memories/mhack0001', { method: 'PUT', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: '{}' })).status);
  ok(w === 403, 'viewer write rejected (403)');
  await s.shot('30-viewer-trip');
  await s.ctx.close();
}
await browser.close();
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
