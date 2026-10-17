// End-to-end UI test (Playwright) for the bookshelf PWA. Run via `npm test`. Screenshots → $SHOTS (default /tmp/mb-shots).
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE, CODE = process.env.CODE;
const OUT = process.env.SHOTS || '/tmp/mb-shots';
fs.mkdirSync(OUT, { recursive: true });
const exe = process.env.CHROME || (fs.existsSync(chromium.executablePath()) ? undefined : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome');
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('ui');

const jpg = (i, w = 1800, h = 1200) => sharp({ create: { width: w, height: h, channels: 3, background: ['#1F3A5F', '#C8402B', '#14C2A3', '#F5A000'][i % 4] } }).jpeg().toBuffer();
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
async function session(name, { width = 390, height = 844, scheme = 'light' } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, colorScheme: scheme });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/401|favicon|ERR_INTERNET_DISCONNECTED|Failed to fetch|Failed to load resource/.test(m.text())) errs.push(m.text()); });
  const shot = (n, full = true) => page.screenshot({ path: path.join(OUT, `${name}-${n}.png`), fullPage: full });
  const noHScroll = () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
  return { ctx, page, errs, shot, noHScroll };
}
async function login(page) {
  await page.goto(BASE + '/');
  await page.waitForSelector('#lf');
  await page.fill('#lcode', CODE); await page.fill('#lname', 'แม่'); await page.click('#lf button[type=submit]');
  await page.waitForSelector('.shelf');
}
const apiState = (page) => page.evaluate(async () => (await fetch('/api/b/state')).json());
const T = 'hk-macau-2026';

// ---------- editor on a phone ----------
{
  const s = await session('phone');
  const { page } = s;
  await page.goto(BASE + '/'); await page.waitForSelector('#lf');
  await s.shot('01-login', false);
  await page.fill('#lcode', 'wrong'); await page.click('#lf button[type=submit]');
  await page.waitForFunction(() => document.querySelector('#lerr').textContent.length > 0);
  ok(true, 'wrong code shows an error');
  await page.fill('#lcode', CODE); await page.fill('#lname', 'แม่'); await page.click('#lf button[type=submit]');
  await page.waitForSelector('.shelf');
  ok(await page.locator('.spine:not(.add)').count() === 2 && await page.locator('.spine.add').count() === 1, 'shelf: 2 books + new book');
  ok((await page.locator('.spine').first().textContent()).includes('DOLPHIN'), 'HK spine shows the manual kicker');
  ok(await s.noHScroll(), 'shelf: no horizontal scroll at 390 px');
  await s.shot('02-shelf');

  await page.click(`.spine[href="#/t/${T}"]`); await page.waitForSelector('.cover');
  ok(await page.locator('.cover .stamp.pending').count() === 1, 'stamp is dashed until earned');
  ok(await page.locator('.fact').count() === 4, 'cover: 4 stats (photos, quotes, firsts, places)');
  ok(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().toUpperCase()) === '#1F3A5F', 'book uses the HK navy theme');
  ok(await page.evaluate(() => getComputedStyle(document.querySelector('.cover h1')).fontFamily.includes('Cormorant')), 'HK title in Cormorant Garamond (as in the manual)');

  // record day 2
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('.daystrip');
  ok(await page.locator('.daystrip a').count() === 6, 'day strip shows 6 days');
  await page.fill('#qtext', 'ปลาอยู่ในน้ำเหมือนหนูเลย');
  await page.click('button[data-a="who"][data-v="mika"]');
  ok(await page.inputValue('#qtext') === 'ปลาอยู่ในน้ำเหมือนหนูเลย', 'typed quote survives switching speaker');
  await page.click('button[data-a="savequote"]');
  await page.waitForFunction(() => document.querySelectorAll('.items li').length === 1);
  ok(await page.inputValue('#qtext') === '', 'quote saved and box cleared');
  await page.click('button[data-a="hiq"]');
  await page.click('button[data-a="mood"][data-k="mimi"][data-v="🤩"]');
  await page.waitForSelector('button[data-a="mood"][data-k="mimi"][data-v="🤩"][aria-pressed="true"]');
  await page.click('button[data-a="mood"][data-k="mimi"][data-v="🤩"]');
  await page.waitForSelector('button[data-a="mood"][data-k="mimi"][data-v="🤩"][aria-pressed="false"]');
  ok(true, 'mood: tap sets, tap again clears');
  await page.click('button[data-a="mood"][data-k="mika"][data-v="😋"]');
  await page.fill('#favtext', 'ไอติมมิกกี้'); await page.locator('#favtext').blur();
  await page.fill('#notetext', 'มีมี่ไม่กลัวเครื่องเล่นเลย'); await page.locator('#notetext').blur();
  await page.click('button[data-a="first"][data-v="mickey"][data-k="mimi"]');
  await page.click('button[data-a="place"][data-v="Hong Kong Disneyland"]');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  let st = await apiState(page);
  const es = st.entries.filter((e) => e.trip === 'hk-macau-2026' && e.day === 1);
  ok(es.filter((e) => e.kind === 'quote' && e.child === 'mika' && e.highlight).length === 1, 'server: one ⭐ quote by Mika');
  ok(es.filter((e) => e.kind === 'mood').length === 1 && es.find((e) => e.kind === 'mood').child === 'mika', 'server: cleared mood gone, Mika’s mood kept');
  ok(es.some((e) => e.kind === 'fav' && e.text === 'ไอติมมิกกี้') && es.some((e) => e.kind === 'note'), 'server: favourite + parents’ note saved on leaving the box'
    + (es.some((e) => e.kind === 'note') && es.some((e) => e.kind === 'fav') ? '' : ` — got ${JSON.stringify(es.map((e) => [e.kind, e.text]))}`));
  ok(es.some((e) => e.kind === 'first' && e.first_key === 'mickey' && e.child === 'mimi'), 'server: first ticked');
  ok(st.places.some((p) => p.key === 'Hong Kong Disneyland' && p.day === 1), 'server: checked in at Disneyland');
  await page.fill('#favtext', ''); await page.locator('#favtext').blur();
  await page.waitForFunction(() => queue.length === 0);
  ok(!(await apiState(page)).entries.some((e) => e.kind === 'fav'), 'emptying the favourite deletes it');
  await page.fill('#favtext', 'ไอติมมิกกี้'); await page.locator('#favtext').blur();

  // photos: several at once, progress, lightbox
  await page.setInputFiles('#fpick', await Promise.all([0, 1, 2].map(async (i) => ({ name: `p${i}.jpg`, mimeType: 'image/jpeg', buffer: await jpg(i) }))));
  await page.waitForFunction(() => document.querySelectorAll('.mosaic button').length === 3);
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 30000 });
  ok((await apiState(page)).media.length === 3, '3 photos uploaded');
  await page.locator('.mosaic button').first().click(); await page.waitForSelector('#lb:not([hidden]) .stage img');
  ok((await page.textContent('#lb .grow')).trim() === '1 / 3', 'lightbox counter 1 / 3');
  await page.click('#lb [data-lb="next"]');
  ok((await page.textContent('#lb .grow')).trim() === '2 / 3', 'next → 2 / 3');
  await page.fill('#lbcap', 'ที่ท่าเรือ'); await page.locator('#lbcap').blur();
  await page.click('#lb [data-lb="star"]');
  await s.shot('05-lightbox', false);
  await page.click('#lb [data-lb="next"]');
  await page.click('#lb [data-lb="del"]');
  ok((await page.textContent('#lb [data-lb="del"]')).length > 3 && (await page.textContent('#lb .grow')).trim() === '3 / 3', 'first tap only arms delete');
  await page.click('#lb [data-lb="del"]');
  await page.click('#lb [data-lb="close"]');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  st = await apiState(page);
  ok(st.media.length === 2 && st.media.some((m) => m.caption === 'ที่ท่าเรือ' && m.highlight), 'second tap deleted; caption + ⭐ saved');
  ok(await s.noHScroll(), 'record page: no horizontal scroll');
  await s.shot('03-record-day2');

  // the book now has a day 2 page in the manual layout
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('#d1');
  ok(await page.locator('.day').count() === 1, 'only days with content become pages');
  ok((await page.textContent('#d1 .no')).trim() === '02', 'day page numbered 02');
  ok(await page.locator('#d1 .route li.done').count() >= 1, 'route strip marks Disneyland visited');
  ok(await page.locator('#d1 .tl li').count() >= 2, 'timeline lists the quote and check-in');
  ok(await page.locator('.part', { hasText: '⭐' }).count() === 1 && await page.locator('.mosaic .star').count() >= 1 && await page.locator('.call.pick').count() >= 1, 'favourite moments ⭐ section (starred photo + quote)');
  ok(await page.locator('.first.got').count() === 1, 'firsts section');
  ok(await page.locator('#d1 .foot3 h4').count() >= 2, 'day footer: favourite + firsts');
  ok(await s.noHScroll(), 'book: no horizontal scroll at 390 px');
  await s.shot('04-book');
  await page.click('button[data-a="lang"][data-v="en"]');
  await page.waitForSelector('text=Favourite moments');
  ok(true, 'language toggle to English');
  await page.click('button[data-a="lang"][data-v="th"]');
  await page.pdf({ path: path.join(OUT, 'book-hk.pdf'), format: 'A4', printBackground: true });
  ok(fs.statSync(path.join(OUT, 'book-hk.pdf')).size > 20000, 'A4 print/PDF of the book renders');
  ok(s.errs.length === 0, 'no console errors: ' + s.errs.join(' | '));

  // offline capture → reconnect → drains once
  await page.goto(`${BASE}/#/t/${T}/log/2`); await page.waitForSelector('#qtext');
  await s.ctx.setOffline(true);
  await page.fill('#qtext', 'ออฟไลน์บนสะพาน'); await page.click('button[data-a="savequote"]');
  await page.setInputFiles('#fpick', [{ name: 'off.jpg', mimeType: 'image/jpeg', buffer: await jpg(3) }]);
  await page.waitForFunction(() => document.querySelectorAll('.mosaic button').length === 1);
  ok(await page.locator('.items .tag').count() === 1, 'offline quote shown with ⏳');
  ok(await page.evaluate(() => idb.all().then((a) => a.length)) === 2, 'quote + photo queued in IndexedDB');
  await s.ctx.setOffline(false);
  await page.evaluate(() => { offline = false; return flush(); });
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 20000 });
  await page.evaluate(() => flush());   // a second flush must not duplicate
  st = await apiState(page);
  ok(st.entries.filter((e) => e.text === 'ออฟไลน์บนสะพาน').length === 1 && st.media.filter((m) => m.day === 2).length === 1, 'reconnect: queue drained once, no duplicates');
  await s.ctx.close();
}

// ---------- wide desktop + dark mode ----------
{
  const s = await session('wide', { width: 1440, height: 900 });
  await login(s.page);
  await s.page.goto(`${BASE}/#/t/${T}`); await s.page.waitForSelector('#d1');
  const m = await s.page.evaluate(() => ({
    h1: parseFloat(getComputedStyle(document.querySelector('.cover h1')).fontSize),
    body: parseFloat(getComputedStyle(document.body).fontSize),
    img: Math.max(...Array.from(document.querySelectorAll('.mosaic img')).map((i) => i.getBoundingClientRect().width)),
    main: document.querySelector('main').getBoundingClientRect().width,
    cols: getComputedStyle(document.querySelector('#d1 .body')).gridTemplateColumns.split(' ').length,
  }));
  ok(m.h1 >= 56 && m.body >= 15, `wide: title ${m.h1}px, body ${m.body}px — readable`);
  ok(m.img > 120 && m.img < 420 && m.main <= 960, `wide: photos ${Math.round(m.img)}px in a ${Math.round(m.main)}px page — not stretched`);
  ok(m.cols === 2, 'wide: route strip beside the timeline (like the manual)');
  // server-side A4 PDF with photos
  const pr = await s.page.request.get(`${BASE}/api/b/pdf/hk-macau-2026`, { timeout: 120000 });
  const pb = await pr.body();
  fs.writeFileSync(path.join(OUT, 'server-book-hk.pdf'), pb);
  const pdf = { status: pr.status(), type: pr.headers()['content-type'], head: pb.subarray(0, 5).toString('latin1'), size: pb.length,
    pages: (pb.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length };
  ok(pdf.status === 200 && pdf.type === 'application/pdf' && pdf.head === '%PDF-', `server PDF: ${Math.round(pdf.size / 1024)} KB, ${pdf.pages} A4 pages`);
  ok(pdf.pages >= 3 && pdf.size > 40000, 'PDF has the cover + one page per recorded day, with photos');
  await s.shot('10-book-wide');
  await s.ctx.close();
  for (const w of [320, 375]) {
    const p = await session('w' + w, { width: w, scheme: 'dark' });
    await login(p.page);
    await p.page.goto(`${BASE}/#/t/${T}`); await p.page.waitForSelector('#d1');
    ok(await p.noHScroll(), `${w}px dark: no horizontal scroll`);
    ok(await p.page.evaluate(() => getComputedStyle(document.body).backgroundColor) === 'rgb(18, 22, 28)', `${w}px: dark paper`);
    await p.shot('book-dark');
    await p.page.goto(`${BASE}/#/t/${T}/log/1`); await p.page.waitForSelector('.daystrip');
    ok(await p.noHScroll(), `${w}px dark: record page fits`);
    await p.shot('record-dark');
    ok(p.errs.length === 0, `${w}px: no console errors ` + p.errs.join(' | '));
    await p.ctx.close();
  }
}

// ---------- relatives' read-only link ----------
{
  const s = await session('viewer');
  const { page } = s;
  await page.goto(BASE + '/v/grandma'); await page.waitForSelector('.shelf');
  ok(await page.locator('.spine.add').count() === 0, 'viewer: no "new book"');
  ok(await page.locator('nav.bar a[href*="/log/"]').count() === 0, 'viewer: no Record tab');
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('#d1');
  ok(await page.locator('a[href*="/log/"]').count() === 0, 'viewer: no edit links in the book');
  await page.locator('#d1 .mosaic button').first().click(); await page.waitForSelector('#lb:not([hidden]) img');
  ok(await page.locator('#lb [data-lb="del"]').count() === 0 && await page.locator('#lbcap').count() === 0, 'viewer: lightbox without delete/caption edit');
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('.cover');
  ok(true, 'viewer: record URL falls back to the book');
  const w = await page.evaluate(async () => (await fetch('/api/b/entries/q-hack-0001', { method: 'PUT', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ trip: 'hk-macau-2026', day: 0, kind: 'quote', child: 'mimi', text: 'x' }) })).status);
  ok(w === 403, 'viewer write → 403');
  ok(await page.evaluate(async () => (await fetch('/api/b/pdf/hk-macau-2026')).headers.get('content-type')) === 'application/pdf', 'viewer (relatives) can download the PDF');
  await s.shot('20-viewer');
  ok(s.errs.length === 0, 'viewer: no console errors ' + s.errs.join(' | '));
  await s.ctx.close();
}
await browser.close();
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
