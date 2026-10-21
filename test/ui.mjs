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
{
  const csp = (await fetch(BASE + '/')).headers.get('content-security-policy') || '';
  ok(/script-src 'self';/.test(csp) && /frame-ancestors 'none'/.test(csp), 'Content-Security-Policy: own scripts only, no framing');
}
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
async function session(name, { width = 390, height = 844, scheme = 'light' } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, colorScheme: scheme, reducedMotion: 'reduce' });   // stable screenshots
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
// the page re-renders after each sync; measure again if the element was just swapped
const boxOf = async (page, sel) => { for (let k = 0; k < 30; k++) { const b = await page.locator(sel).first().boundingBox().catch(() => null); if (b) return b; await page.waitForTimeout(100); } throw new Error('no box: ' + sel); };
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
  ok(await page.inputValue('#lcode') === '', 'wrong PIN clears the field');
  for (const d of CODE) await page.click(`.pinpad button[data-v="${d}"]`);   // tap the PIN on the number pad
  await page.click('.pinpad button[data-v="back"]'); await page.click(`.pinpad button[data-v="${CODE.at(-1)}"]`);
  ok(await page.inputValue('#lcode') === CODE, 'number pad types the PIN (⌫ works)');
  await page.click('button[data-a="who-login"][data-v="Mum"]');
  await page.click('#lf button[type=submit]');
  await page.waitForSelector('.shelf');
  ok(await page.evaluate(async () => (await (await fetch('/api/b/state')).json()).me.name) === 'Mum', 'who-is-this chip used as the name (optional)');
  ok(await page.locator('.spine:not(.add)').count() === 2 && await page.locator('.spine.add').count() === 1, 'shelf: 2 books + new book');
  ok((await page.locator('.spine').first().textContent()).includes('DOLPHIN'), 'HK spine shows the manual kicker');
  ok(await s.noHScroll(), 'shelf: no horizontal scroll at 390 px');
  await s.shot('02-shelf');

  await page.click(`.spine[href="#/t/${T}"]`); await page.waitForSelector('.hubgrid');
  // the book opens on its menu: a tile per topic, today first, the detail one tap away
  ok(await page.locator('.hubgrid .tile').count() >= 14 && await page.locator('.hubgrid .tile.today').count() === 1 && /อีก|to go/.test(await page.textContent('.tile.today')), 'book menu: topic tiles, today on top with the countdown');
  ok(await page.locator('.tile[href$="/eat"]').count() === 1 && await page.locator('.tile[href$="/sos"]').count() === 1 && await page.locator('.tile[href$="/stays"]').count() === 1 && await page.locator('.tile.kid[data-a="kidmode"]').count() === 1, 'book menu: eat, emergency, stays, kid mode tiles');
  ok(await page.evaluate(() => [...document.querySelectorAll('.hubgrid .tile')].every((t) => t.scrollHeight <= t.clientHeight + 1)), 'book menu: no tile clips its text (the kid-mode button grows like the link tiles)');
  ok(await page.evaluate(() => [...document.querySelectorAll('.hubgrid .tile')].every((t) => getComputedStyle(t).marginTop === '0px' && getComputedStyle(t).marginBottom === '0px')), 'book menu: no tile carries its own margin, so a row lines up (the bookshelf tile used to pick up the shelf page’s 22 px)');
  ok(await page.locator('nav.bar .in > *').count() === 5 && await page.locator('nav.bar a[aria-current=page][href$="/hk-macau-2026"] i svg.ic').count() === 1 && (await page.locator('nav.bar .in > *').first().boundingBox()).height >= 60, 'quick bar: five big stops, menu highlighted');
  await page.click('.tile[href$="/today"]'); await page.waitForSelector('.day.today');
  ok(await page.evaluate(() => { const rows = [...document.querySelectorAll('.cbox .dsheet>div')]; return rows.length > 0 && rows.every((r) => r.querySelector('dt').getBoundingClientRect().width <= r.getBoundingClientRect().width * 0.36); }), 'today: in the answer boxes the label column stays narrow and the answer gets the room');
  ok(await page.locator('.daystrip a').count() === 6 && await page.locator('.call.info').count() === 1 && await page.locator('.dsheet > div').count() >= 4 && await page.locator('.tl.plan.brief li').count() >= 4 && await page.locator('.reportbtn[href$="/today/0/full"]').count() === 1 && await page.locator('.top .ttl small', { hasText: /วันนี้|Today/ }).count() === 1, "today page: day strip, countdown banner, day 1 at a glance (short timeline + answer cards, full report one tap away), topic named in the top bar");
  await page.click('.daystrip a[href$="/today/3"]'); await page.waitForSelector('.daystrip a[aria-current=true][href$="/today/3"]');
  ok((await page.textContent('.day.today h3')).includes('Senado') || (await page.textContent('.day.today h3')).includes('แสง'), 'today page: the strip switches days');
  await page.click('.top .ibtn'); await page.waitForSelector('.hubgrid');
  ok(true, 'back arrow inside a topic returns to the menu');
  await page.click('.tile[href$="/book"]'); await page.waitForSelector('.cover');
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
  // let that save re-render the page first — a render landing mid-setInputFiles replaces the file input and drops the change
  await page.waitForFunction(() => queue.length === 0 && document.activeElement && document.activeElement.id !== 'favtext');
  await page.waitForTimeout(50);

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
  // travel notebook on the record page: rate the stay, tag it, the kids' verdicts, a note
  await page.waitForSelector('#notebook .rev');
  ok(await page.locator('#notebook .rev').count() === 4 && await page.locator('#notebook .rev[data-kind="stay"]').count() === 1, 'notebook: tonight\'s stay + the day\'s 3 planned stops are reviewable');
  const stay = page.locator('#notebook .rev[data-kind="stay"]');
  await stay.locator('summary').click();
  await stay.locator('.stars button[data-v="4"]').click();
  await page.waitForSelector('#notebook .rev[data-kind="stay"].has');
  await stay.locator('.rtags .chip[data-v="kidsleep"]').click(); await stay.locator('.rtags .chip[data-v="kidsleep"][aria-pressed="true"]').waitFor();   // each tap lands before the next (cards re-render)
  await stay.locator('.rkid .opts button[data-k="mimi"][data-v="love"]').click(); await stay.locator('.rkid .opts button[data-k="mimi"][data-v="love"][aria-pressed="true"]').waitFor();
  await stay.locator('.rkid.again button[data-v="1"]').click(); await stay.locator('.rkid.again button[data-v="1"][aria-pressed="true"]').waitFor();
  await stay.locator('.rnote').fill('ห้องมุม วิวสะพาน เด็กหลับสนิท'); await page.locator('#qtext').focus();
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  // poll the server for the whole row (not just the last fields): under full-suite load the last PUT can land seconds after the queue empties
  const fullReview = (r) => r && r.rating === 4 && r.tags.includes('kidsleep') && r.kids.mimi === 'love' && r.again === true && (r.note || '').includes('วิวสะพาน');
  let rvw;
  for (let k = 0; k < 120; k++) { st = await apiState(page); rvw = st.reviews.find((x) => x.kind === 'stay'); if (fullReview(rvw)) break; await page.waitForTimeout(250); }
  ok(fullReview(rvw) && st.reviews.filter((r) => r.kind === 'stay').length === 1, 'server: stay review — 4★, tag, Mimi 😍, again, note (one row, upserted)' + (fullReview(rvw) ? '' : ` — server has ${JSON.stringify(rvw)}, queue ${await page.evaluate(() => queue.length)}, toast "${await page.textContent('#toast')}"`));
  ok(await stay.locator('summary .st').textContent() === '★★★★☆' && await stay.locator('.stars button[aria-pressed=true]').count() === 1, 'review card shows the stars in its summary');
  await page.locator('#notebook').screenshot({ path: path.join(OUT, 'phone-03b-notebook.png') });
  await s.shot('03-record-day2');

  // the book now has a day 2 page in the manual layout
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('#d1');
  ok(await page.locator('.day').count() === 1, 'only days with content become pages');
  ok((await page.textContent('#d1 .no')).trim() === '02', 'day page numbered 02');
  ok(await page.locator('#d1 .route li.done').count() >= 1, 'route strip marks Disneyland visited');
  ok(await page.locator('#d1 .tl li').count() >= 2, 'timeline lists the quote and check-in');
  ok(await page.locator('.part', { hasText: '⭐' }).count() === 1 && await page.locator('.mosaic .star').count() >= 1 && await page.locator('.call.pick').count() >= 1, 'favourite moments ⭐ section (starred photo + quote)');
  ok(await page.locator('.first.got').count() === 1, 'firsts section');
  ok(await page.locator('.first.got .kid.drawn img[src="/art/kids/mimi.svg"]').count() === 1 && await page.locator('#d1 .pill img.face').count() >= 1, 'kid badges and mood pills use the drawn characters');
  ok(await page.locator('#d1 .foot3 h4').count() >= 2, 'day footer: favourite + firsts');
  ok(await s.noHScroll(), 'book: no horizontal scroll at 390 px');
  ok(await page.locator('.journey > *').count() === 6 && await page.locator('.journey > .on').count() === 1, 'book: illustrated route strip, the recorded day in full colour');
  ok(await page.locator('#d1 .hdart').count() === 1, 'day page shows its illustrated stamp');
  await s.shot('04-book');

  await page.goto(`${BASE}/#/t/${T}/plan/full`); await page.waitForSelector('.itin');
  ok(await page.locator('.itin > li').count() === 6 && await page.locator('.itin > li.has').count() === 1, 'whole-trip page: itinerary lists all 6 planned days, the recorded one marked');
  ok((await page.textContent('.itin')).includes('teamLab') && (await page.textContent('.itin')).includes('Taipa'), 'itinerary shows the planned stops (revised HK plan)');

  // every meal has a pick and a backup (manual EN-2); the park map is drawn
  await page.goto(`${BASE}/#/t/${T}/today/1`); await page.waitForSelector('.dsheet');
  ok(await page.locator('.remind [data-a="remind"]').count() === 1 && /30/.test(await page.textContent('.remind')), 'today page: grown-ups can switch on reminders 30 min before each step');
  const tlRows = await page.$$eval('.tl.plan.brief li div', (els) => els.map((e) => e.textContent));
  ok(tlRows.length > 0 && tlRows.every((x) => !x.endsWith('…')), 'today page: every timeline step is shown whole, never cut with …');
  const pickDd = await page.$$eval('.dsheet > div:not(.meal) > dd', (els) => els.map((e) => e.textContent));
  const seedPick = await page.evaluate(() => T(S.trips.find((x) => x.id === 'hk-macau-2026').days[1].plan.pick));
  ok(seedPick.length > 110 && pickDd.includes(seedPick), "today page: the local pick is shown whole (it was cut at 110 characters)");
  const seedWx = await page.evaluate(() => T(S.trips.find((x) => x.id === 'hk-macau-2026').days[1].wx));
  ok(seedWx.length > 110 && pickDd.includes(seedWx), 'today page: the weather is shown whole (it was cut to its first clause)');
  const seedMv = await page.evaluate(() => T(S.trips.find((x) => x.id === 'hk-macau-2026').days[1].plan.moving));
  ok(seedMv.length > 110 && pickDd.includes(seedMv), 'today page: getting around is shown whole');
  await page.evaluate(() => { ls('remind', 1); render(); });
  ok(await page.locator('.remind').count() === 0, 'today page: once reminders are on, the reminder box goes away');
  await page.goto(`${BASE}/#/t/${T}/offline`); await page.waitForSelector('.remind.on');
  ok(await page.locator('.remind [data-a="remindtest"]').count() === 1 && await page.locator('.remind [data-a="remind"]').count() === 1, 'offline page: reminders that are on can be tested or turned off there');
  await page.evaluate(() => { ls('remind', null); });
  const badge = await page.evaluate(async () => { const r = await fetch('/badge-96.png'); const sw = await (await fetch('/sw.js')).text(); return r.ok && /badge: '\/badge-96\.png'/.test(sw); });
  ok(badge, 'notifications use a transparent one-colour badge (Android shows an opaque icon as a white square)');
  // the owner: "make it easier to read, not long" — booking timeline as step cards, guide cards with short points
  await page.goto(`${BASE}/#/t/${T}/prep/full`); await page.waitForSelector('.steps');
  ok(await page.locator('.steps > li').count() === 8 && await page.locator('.steps > li.ok').count() === 1 && await page.locator('.steps > li').nth(1).locator('.when').textContent() === 'This week · early Oct' && await page.locator('.steps > li').nth(0).locator('.pts > li').count() === 6,
    'prep: the booking timeline is a list of steps — date chip, task, short points (the done one ticked)');
  { const vp = page.viewportSize(); await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForTimeout(200);
    const xs = await page.$$eval('.steps > li', (ls) => [...new Set(ls.map((l) => Math.round(l.getBoundingClientRect().left)))]);
    await page.setViewportSize(vp);
    ok(xs.length === 2, `prep, wide screen: the booking steps read in two columns (${xs.join(' / ')})`); }
  ok(!/no booking|book Nov/.test(await page.locator('.steps').evaluate((e) => e.closest('details').querySelector('.lede').textContent)), 'prep: the booking timeline opens with its date line only (no shredded status list)');
  await page.goto(`${BASE}/#/t/${T}/learn/full`); await page.waitForSelector('.gcards');
  const gl = await page.$$eval('.gcard .pts > li', (els) => els.map((e) => e.textContent.trim()));
  ok(gl.length > 10 && gl.every((x) => !/^[a-z]+(?=[\s,:;]|$)/.test(x)) && await page.locator('.gcard > b + .gsub').count() === 13, 'learn: guide cards put the headline first and no point starts mid-sentence ("book 3–5 days ahead" → "Book …")');
  ok(await page.evaluate(() => points('TG 638 ขาไป 5 ธ.ค. · Noah\'s Ark 5–7 ธ.ค.').join('|')) === 'TG 638 ขาไป 5 ธ.ค.|Noah\'s Ark 5–7 ธ.ค.', 'points keep the dot of a Thai month (ธ.ค.)');
  ok(await page.locator('.gcard ol.nums > li').count() === 5 && !(await page.locator('.gcard .pts > li').allTextContents()).some((x) => /^\d+$/.test(x.trim())), 'learn: "1 · … · 2 · …" is a numbered list — no number stands alone as its own point');
  ok(await page.$$eval('details.pg details.sub > summary .st b', (bs) => bs.length >= 6 && bs.every((b) => b.getClientRects().length === 1)), 'learn: “Day 3” never breaks over two lines in the day-by-day list');
  ok(await page.evaluate(() => { const d = document.createElement('div'); d.innerHTML = viewHub(trip('hk-macau-2026')); return [...d.querySelectorAll('.tile small')].every((x) => !/…\s*$/.test(x.textContent)); }), 'menu: no tile line ends in “…” (Kid mode said “map…”)');
  ok(await page.evaluate(() => { const s = document.querySelector('.pocket details.pg > summary'), en = getComputedStyle(s).fontFamily; document.documentElement.lang = 'th'; const th = getComputedStyle(s).fontFamily; document.documentElement.lang = 'en'; return /^"?Cormorant/.test(en) && /^"?KIRA Digits/.test(th); }), 'HK serif headings: on Thai pages digits and brackets come from KIRA UI (match the Thai), English keeps Cormorant');
  ok(await page.evaluate(() => cap1('teamLab at 11:00') + '|' + cap1('book Nov')) === 'teamLab at 11:00|Book Nov', 'a brand that starts lowercase (teamLab, eSIM) is left as it is');
  { const gap = await page.$$eval('.pocket details.pg > summary', (ss) => ss.map((s) => { const r = document.createRange(); r.selectNodeContents(s); return r.getClientRects()[0].left - s.closest('details').getBoundingClientRect().left; }));
    ok(gap.length >= 2 && gap.every((x) => x >= 12), `topic pages: every coloured section heading sits inside its frame, not on the edge (${Math.min(...gap).toFixed(0)} px)`); }
  // ---- search the whole book · text size · what is stored on the phone · teasers that end whole
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid');
  ok(await page.locator(`.hubsearch[href="#/t/${T}/search"]`).count() === 1 && await page.locator('.top .fsb').count() === 1 && await page.locator('.top a[href$="/search"]').count() === 0, 'menu: a big “Search the whole book” bar; the top bar has the text-size button but no second search icon');
  await page.goto(`${BASE}/#/t/${T}/sos`); await page.waitForSelector('.tp-sos');
  ok(await page.locator(`.top a[href="#/t/${T}/search"]`).count() === 1, 'inside a topic page the top bar carries a search icon');
  await page.click(`.top a[href="#/t/${T}/search"]`); await page.waitForSelector('#bookq');
  await page.fill('#bookq', 'doctor'); await page.waitForSelector('.sres li');
  ok(/hospital/i.test(await page.textContent('.sres')) && await page.locator('.sres li.k-sos').count() >= 1 && await page.locator('.sres mark').count() >= 1, 'search “doctor”: the emergency section with the hospital line, the hit marked');
  ok(await page.evaluate(() => [...document.querySelectorAll('.sres mark')].every((m) => !/^sick$/i.test(m.textContent))), 'search “doctor” does not drag in the word “sick” (sick bags ≠ a doctor)');
  await page.fill('#bookq', 'หมอ'); await page.waitForTimeout(150);
  ok(/hospital/i.test(await page.textContent('.sres')), 'a Thai word finds the English text (หมอ → hospital): both languages are searched');
  ok(await page.evaluate(() => { const r = [...document.querySelectorAll('.sres li')].map((x) => x.textContent); return r.every((x) => !/undefined|\[object/.test(x)); }), 'search results carry no raw data');
  ok(await page.evaluate(() => { const re = /หมอ(?![กนง])/; return [...document.querySelectorAll('.sres li')].every((li) => (re.test(li.textContent) || /hospital|doctor|clinic|แพทย์|โรงพยาบาล|คลินิก|ป่วย|ไม่สบาย|sick/i.test(li.textContent))); }), 'search “หมอ” never lands on หมอก (fog) or หมอน (pillow) alone');
  for (const [tid, name] of [[T, 'HK'], ['big-hop-2027', 'AU']]) {
    await page.goto(`${BASE}/#/t/${tid}/search`); await page.waitForSelector('#bookq');
    const counts = await page.evaluate(() => [...document.querySelectorAll('.chip[data-a=sq]')].map((c) => { c.click(); return [c.dataset.v, document.querySelectorAll('.sres li').length]; }));
    ok(counts.length === 10 && counts.every(([, n]) => n > 0), `${name}: every suggestion (doctor, taxi, toilet…) finds something — ${counts.map(([v, n]) => v + ' ' + n).join(', ')}`);
  }
  await page.goto(`${BASE}/#/t/${T}/search`); await page.waitForSelector('#bookq'); await page.fill('#bookq', 'Hoi Lin'); await page.waitForSelector('.sres a[data-a="eatgo"]');
  await page.click('.sres a[data-a="eatgo"]'); await page.waitForSelector('#eatq');
  ok(/hoi lin/i.test(await page.inputValue('#eatq')) && page.url().endsWith(`#/t/${T}/eat/all`), 'a place found by the search opens the eat list already filtered to it');
  await page.goto(`${BASE}/#/t/${T}/search`); await page.waitForSelector('#bookq'); await page.fill('#bookq', 'zzzzqq');
  ok(await page.locator('.sres li').count() === 0 && await page.locator('#bookres .empty').count() === 1, 'a word that is nowhere says so');
  // text size: Aa cycles 100 → 110 → 120 → 130 %, is remembered, and nothing overflows at the largest
  await page.goto(`${BASE}/#/t/${T}/today`); await page.waitForSelector('.dsheet');
  const z = async () => page.evaluate(() => getComputedStyle(document.querySelector('main.wrap')).zoom);
  const z0 = await z(); await page.click('.fsb'); const z1 = await z(); await page.click('.fsb'); await page.click('.fsb'); const z3 = await z();
  ok(z0 === '1' && z1 === '1.1' && z3 === '1.3' && await page.evaluate(() => document.documentElement.dataset.fs === '3' && localStorage.getItem('mbs_fs') === '3'), `text size: Aa cycles normal → 110 % → … → 130 % and is remembered (${z0} / ${z1} / ${z3})`);
  ok(await s.noHScroll(), 'text size 130 %: today does not overflow the phone');
  await page.goto(`${BASE}/#/t/${T}/prep/full`); await page.waitForSelector('.steps');
  ok(await s.noHScroll(), 'text size 130 %: the booking steps do not overflow');
  await page.click('.fsb'); ok(await z() === '1', 'a fourth tap returns to normal');
  // what this phone holds of the book: when, and how many new photos since
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid');
  await page.evaluate((id) => { ls('offline_' + id, { at: Date.now(), n: mediaOf(id).length, all: false }); render(); }, T);
  ok(/Stored on this phone · /.test(await page.textContent('.t-offline')) && await page.locator('.t-offline.warn').count() === 0, 'menu: the offline tile says when the book was stored');
  await page.evaluate((id) => { ls('offline_' + id, { at: Date.now(), n: mediaOf(id).length - 2, all: false }); render(); }, T);
  ok(/2 new photos/.test(await page.textContent('.t-offline')) && await page.locator('.t-offline.warn').count() === 1, 'menu: photos taken since the book was stored are counted and the tile asks for a top-up');
  await page.goto(`${BASE}/#/t/${T}/offline`); await page.waitForSelector('#offl');
  ok(/2 new photos since/.test(await page.textContent('#offl')), 'offline page: the same count, in words');
  await page.evaluate((id) => { ls('offline_' + id, null); render(); }, T);
  // teasers end on a whole phrase
  { const cut = []; for (const r of ['prep', 'learn', 'sos', 'stays']) { await page.goto(`${BASE}/#/t/${T}/${r}`); await page.waitForSelector('.glg'); cut.push(...await page.$$eval('.glc small', (els) => els.map((e) => e.textContent.trim()).filter((x) => /…$/.test(x)))); }
    ok(cut.length === 0, `HK glance cards: no subtitle ends with “…” ${cut.slice(0, 2).join(' | ')}`); }
  await page.goto(`${BASE}/#/t/${T}/today/1`); await page.waitForSelector('.dsheet');
  ok(await page.locator('.dsheet .meal').count() === 4 && /Hoi Lin Tea House/.test(await page.textContent('.cgrid')) && /Plaza Inn/.test(await page.locator('.dsheet .meal').nth(3).textContent()) && await page.locator('.dsheet a[href="/art/hk/disney-map.svg"]').count() === 1, 'HK today, Disney day: four meals each with a pick and a backup, and the park map');
  const vp0 = page.viewportSize(); await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForSelector('.cgrid.packed');
  const colH = await page.$$eval('.cgrid.packed > .ccol', (cs) => cs.map((c) => c.offsetHeight));
  ok(colH.length === 2 && Math.abs(colH[0] - colH[1]) < 260 && await page.locator('.cgrid .cbox').count() === 4, `HK today, wide screen: four boxes packed into two columns of near-equal height (${colH.join(' / ')})`);
  await page.setViewportSize(vp0); await page.waitForFunction(() => !document.querySelector('.cgrid.packed'));
  await page.goto(`${BASE}/#/t/${T}/eat/d/1`); await page.waitForSelector('.eatday');
  ok(await page.locator('.daytabs a').count() === 6 && await page.locator('.daytabs a[aria-current=page]').textContent().then((x) => x.includes('2')) && await page.locator('.emeal').count() === 4 && /Hoi Lin Tea House/.test(await page.locator('.emeal').first().textContent()) && await page.locator('.emeal .erow.bk').count() === 3, 'eat page, day by day: a tab per day, one box per meal with the pick and the backup');
  ok(await page.locator('.enear').count() > 0 && await page.locator('.eatday a.btn.wide[href$="/eat/all"]').count() === 1, 'eat page, day by day: places near the day, then a button to every place');
  await page.goto(`${BASE}/#/t/${T}/prep/full`); await page.waitForSelector('#pocket');
  ok(await page.locator('#pocket .mapimg img[src="/art/hk/disney-map.svg"]').count() === 1, 'get-ready page: the drawn Disneyland map');
  // the kids' adventure passports
  // parent mode: the bar holds the grown-ups' tools; firsts and passports are tiles on the menu
  ok(await page.locator('nav.bar .in > *').count() === 5 && await page.locator('nav.bar a[href$="/eat"]').count() === 1 && await page.locator('nav.bar button[data-a="kidmode"]').count() === 1 && await page.locator('nav.bar a[href="#/passport"]').count() === 0, 'parent bar: menu, today, record, eat, kid mode');
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid');
  await page.click('.tile[href="#/passport"]'); await page.waitForSelector('.pp .advc');
  ok(await page.locator('.ppkids a[role=tab]').count() === 2 && await page.locator('.ppkids a:not([role=tab])').count() === 2, 'passport: one per child, a page set per trip');
  ok(await page.locator('.advc .xbox img[src="/art/kids/mimi.svg"]').count() === 1 && await page.locator('.bio .photo img[src="/art/kids/mimi.svg"]').count() === 1, 'passport: Mimi drawn as her character on the cover and photo page');
  ok(await page.locator('.advc img.crest[src="/art/crest/hk.svg"]').count() === 1 && (await page.textContent('.advc')).includes('DOLPHIN-2026-MIMI'), 'passport cover as printed: crest, title, passport no. per child');
  ok(await page.evaluate(() => getComputedStyle(document.querySelector('#m1 header')).backgroundColor) === 'rgb(252, 231, 241)', 'day 2 mission in the printed pink (#FCE7F1)');
  ok((await page.textContent('.guides')).includes('Captain Pinky') && await page.locator('#pl-words .tick').count() === 10 && await page.locator('#pl-dimsum .stars').count() === 10, 'Captain Pinky, Say It Like a Local (10), Dim Sum Tasting Card (stars)');
  ok(await page.evaluate(() => Array.from(document.querySelectorAll('img[src^="/art/"]')).every((i) => i.complete && i.naturalWidth > 0)), 'character, guide and stamp drawings load');
  ok(await page.locator('.pp-page.visa').count() === 1 && await page.locator('.dstamp').count() === 6, 'passport: HK visa page, a stamp slot per day');
  ok(await page.locator('.dstamp.on').count() === 1 && await page.locator('.dstamp.new').count() === 1, 'passport: recorded day is stamped (with the stamp animation the first time)');
  { await page.click('.mapdays [data-v="3"]'); await page.waitForFunction(() => document.querySelector('.mapsec .kicker').textContent.includes('4'));
    await page.locator('.tmap .pin[data-v="senado"]').dispatchEvent('click'); await page.waitForSelector('#sheet:not([hidden]) .pinacts');
    const hrefs = await page.$$eval('#sheet a', (as) => as.map((a) => a.getAttribute('href')));
    ok(hrefs.some((h) => /maps\/search\/.*Senado%20Square%2C%20Macau/.test(h)) && hrefs.some((h) => /maps\/dir\//.test(h)) && hrefs.includes('#/t/hk-macau-2026/today/3') && await page.locator('.sleep ol a.maplink').count() === 6, 'passport map: day buttons move the kids; a pin opens the real place (Maps + directions + that day’s plan); the list names open Maps');
    { await page.locator('.tmap .pin[data-v="mawan"]').dispatchEvent('click'); await page.waitForSelector('#sheet:not([hidden]) .pinstay');
      ok(/Noah's Ark/.test(await page.textContent('#sheet .pinstays')) && await page.locator('#sheet .pinstay a[href*="maps/dir/"]').count() === 1, 'passport map: a pin lists the night’s stay with directions'); await page.click('#sheet [data-a="closesheet"]'); }
  }
  ok(await page.locator('.guides .bubble img.guide').count() === 2 && await page.locator('.mission').count() === 6, 'passport: two guides + a mission per day');
  ok(await page.locator('.sleep li').count() === 6, 'passport: where we go — 6 pins as printed');
  ok(await page.locator('.bdg').count() === 1 && (await page.textContent('.bdg')).includes('Mickey'), 'passport: Mimi’s first is a badge');
  ok(!(await page.textContent('#app')).match(/\b[A-Z]{1,2}\d{6,9}\b|e-ticket/), 'passport: nothing that looks like a real passport / ticket number');
  // tick a mission spot, a food (yum), an Explorer ID answer
  await page.click('#m1 button[data-a="tick"][data-v="spot.d1.tower"]');
  await page.click('#pl-dimsum button[data-v="dimsum.eggtart"][data-yum="3"]');
  await page.click('#pl-words button[data-v="words.mhgoi"]');
  await page.fill('.ppf[data-v="decl.eggtarts"]', '7'); await page.locator('.ppf[data-v="decl.eggtarts"]').blur();
  ok(await page.locator('.ppf').count() >= 4 && await page.locator('.ppf[placeholder]').count() === 0 && await page.locator('.unitd .unit').count() === 2, 'passport ID: blank boxes (no "e.g." hints), the height boxes show cm beside them');
  await page.fill('.ppf[data-v="superpower"]', 'วิ่งเร็วมาก'); await page.locator('.ppf[data-v="superpower"]').blur();
  await page.click('#m1 .felt button[data-v="🤩"]');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  st = await apiState(page);
  ok(st.entries.some((e) => e.id === `${'hk-macau-2026'}.tick.spot.d1.tower.mimi`) && st.entries.some((e) => e.first_key === 'dimsum.eggtart' && e.text === '3') && st.entries.some((e) => e.first_key === 'words.mhgoi'), 'server: mission spot, 3 stars for the egg tart, a word said — for Mimi');
  ok(st.entries.some((e) => e.kind === 'field' && e.first_key === 'decl.eggtarts' && e.text === '7'), 'server: customs declaration answer');
  ok(st.entries.some((e) => e.kind === 'field' && e.text === 'วิ่งเร็วมาก') && st.entries.some((e) => e.id === 'hk-macau-2026.mood.d1.mimi' && e.mood === '🤩'), 'server: superpower answer + “today I felt” (same mood as the record page)');
  ok(await page.locator('#m1 .tick.on').count() === 1 && await page.inputValue('.ppf[data-v="superpower"]') === 'วิ่งเร็วมาก', 'passport shows the ticks after saving');
  ok(await page.locator('.cert:not(.earned)').count() === 1, 'certificate locked until the Master Explorer goal');
  await page.evaluate(async () => { const t = trip('hk-macau-2026'), l = t.passport.lists.find((x) => x.certificate);
    for (const it of l.groups.flatMap((g) => g.items).slice(0, l.goal)) await putEntry(t, { day: null, kind: 'tick', child: 'mimi', first_key: `master.${it.k}`, text: '' }, `${t.id}.tick.master.${it.k}.mimi`); });
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 20000 });
  await page.waitForSelector('.cert.earned');
  ok((await page.textContent('#cert')).includes('Master Harbour Explorer'), 'certificate earned after 15 Master Explorer ticks');
  ok(await s.noHScroll(), 'passport: no horizontal scroll at 390 px');
  await s.shot('06-passport');
  await page.click('.ppkids a[role=tab][href^="#/passport/mika"]'); await page.waitForSelector('.pp.kid-mika');
  ok(await page.locator('.dstamp.new').count() === 0, 'passport: stamp animation plays once, not on every visit');
  ok(await page.locator('.bdg').count() === 0 && await page.locator('.pp .call:not(.calm)').count() === 1 && await page.locator('.mission .tick.on').count() === 0, 'passport: Mika has her own ticks (none yet) and her own words');
  await page.click('.ppkids a[href="#/passport/mika/big-hop-2027"]'); await page.waitForSelector('#m15');
  ok(await page.locator('.mission').count() === 16 && (await page.textContent('.guides')).includes('Ranger Roo'), 'passport: Australia — Ranger Roo, Kiki and 16 missions');
  await page.locator('.mapsec').screenshot({ path: path.join(OUT, 'phone-06b-map-au.png') });
  // kid mode: big buttons, locked until a grown-up holds the lock
  await page.evaluate(() => { window.__said = []; Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    speak(u) { window.__said.push(`${u.text}|${u.lang}`); }, cancel() {}, onvoiceschanged: null,
    getVoices: () => ['zh-HK', 'th-TH', 'en-GB', 'pt-PT'].map((l) => ({ lang: l, name: l })) } }); });
  await page.clock.setFixedTime(new Date('2026-12-06T12:00:00+08:00'));   // day 2 of the Hong Kong trip (timers keep running)
  await page.goto(`${BASE}/#/t/${T}/today`); await page.waitForSelector('.day.today');
  ok(/Disneyland/.test(await page.textContent('.day.today h3')) && await page.locator('.daystrip a[aria-current="true"] .today').count() === 1 && await page.locator('.daystrip a').nth(1).getAttribute('aria-current') === 'true'
    && await page.locator('.day.today .tag').count() === 1 && await page.locator('.call.info').count() === 0 && await page.locator('.quick a[href$="/log/1"]').count() === 1, 'HK on day 2: Today opens Disneyland day by itself, marked “Today” in the strip, no countdown banner, Record goes to day 2');
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid');
  ok(/(Day 2 of 6|วันที่ 2)/.test(await page.textContent('.tile.today')), 'HK on day 2: the menu’s Today tile names day 2');
  await page.goto(`${BASE}/#/passport/mimi/${T}`); await page.waitForSelector('.kidgo');
  await page.click('.kidgo'); await page.waitForSelector('.kidwrap .kidtiles');
  ok(await page.locator('.kidtiles button').count() === 14 && await page.locator('.kidtiles button[data-v$="/animals"]').count() === 1 && await page.locator('.kidtiles button[data-v$="/quiz"]').count() === 1 && await page.locator('nav.bar').count() === 0, 'kid mode on the trip: 14 big tiles (colour, draw, find, stamp, say, stickers, map, quiz, photos, match, mood, animals & friends, count, trophies), no tab bar');
  ok(await page.locator('.kpage').count() === 4 && await page.locator('#kdots i').count() === 4 && (await page.locator('.kidtiles button').first().boundingBox()).height >= 150, 'kid home: four swipe pages of four huge tiles, with dots');
  await page.click('.kparrow.next'); await page.waitForFunction(() => document.querySelectorAll('#kdots i')[1].classList.contains('on'), null, { timeout: 5000 });
  ok(await page.locator('.kparrow.prev:not([hidden])').count() === 1, 'kid home: the arrow turns the page, the dots follow');
  ok(await page.locator('.kidbar button').count() === 5 && await page.locator('.kidbar button[aria-current=page] span').textContent() === '🏠' && await page.locator('.kidbar button[data-v$="/trophies"]').count() === 1, "kid mode has its own bar: home, map, passport, stickers, trophies");
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.kidwrap');
  ok(page.url().includes('#/kid/mimi'), 'kid mode is locked: other pages lead back to it');
  await page.click('.kiddays button[data-v="1"]');
  await page.click('.kidtiles button[data-v$="/colour"]'); await page.waitForSelector('.colourpad svg [data-c]');
  const shapes = await page.locator('.colourpad [data-c]').count();
  await page.click('.palette button[data-v="#42A5F5"]');
  await page.locator('.colourpad [data-c]').nth(Math.min(2, shapes - 1)).click({ force: true });
  await page.waitForFunction(() => S.entries.some((e) => e.id === 'hk-macau-2026.field.colour.d1.mimi'), null, { timeout: 5000 });
  ok(shapes >= 3 && (await page.locator('.colourpad [fill="#42A5F5"]').count()) === 1, `colouring: ${shapes} tappable shapes, tapped one turns blue`);
  ok(await s.noHScroll(), 'kid colouring page fits the phone');
  await s.shot('08-kid-colour');
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/spot"]'); await page.waitForSelector('.kidspots button');
  await page.locator('.kidspots button').nth(1).click();
  await page.waitForSelector('.kidspots button.on');
  ok((await page.evaluate(() => window.__said)).some((x) => /parade|พาเหรด/.test(x)), 'find it: the card is read aloud and ticked');
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/stamp"]'); await page.waitForSelector('.stampbtn');
  await page.click('.stampbtn'); await page.waitForSelector('.kidstamp.done'); await page.waitForSelector('#kidcheer:not([hidden])');
  await s.shot('09-kid-stamp', false);
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/words"]'); await page.waitForSelector('.kw .hear');
  await page.locator('.kw .hear').nth(1).click();
  ok((await page.evaluate(() => window.__said)).includes('唔該|zh-HK'), 'say it: Cantonese word read with a Cantonese voice');
  await page.locator('.kw .said').nth(2).click();   // Dō jeh (M̀h gōi was ticked on the passport page already)
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  st = await apiState(page);
  ok(st.trips.find((x) => x.id === T).days[1].done_at && st.entries.some((e) => e.id === `${T}.tick.stamp.d1.mimi`), 'stamp ceremony: day 2 done + Mimi stamped it herself');
  ok(st.entries.some((e) => e.id === `${T}.field.colour.d1.mimi`) && st.entries.some((e) => e.id === `${T}.tick.words.dojeh.mimi`), 'server: colouring + word said saved');
  ok(await s.noHScroll(), 'kid mode fits the phone');
  // stickers: earned from missions, tapped or dragged onto the sticker page, dragged off to peel back
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/stickers"]'); await page.waitForSelector('#stkboard');
  const tray0 = await page.locator('#stktray .stk').count();
  ok(tray0 >= 4 && await page.locator('#stktray .stk.img').count() >= 1, `stickers: ${tray0} earned (stamps, spotted things, words)`);
  await page.locator('#stktray .stk').first().click();
  await page.waitForSelector('#stkboard .stk.on');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 10000 });
  const bb = await boxOf(page, '#stkboard'), src = await boxOf(page, '#stktray .stk');
  await page.mouse.move(src.x + src.width / 2, src.y + src.height / 2); await page.mouse.down();
  await page.mouse.move(bb.x + bb.width * 0.3, bb.y + bb.height * 0.5, { steps: 6 }); await page.mouse.move(bb.x + bb.width * 0.25, bb.y + bb.height * 0.5, { steps: 2 }); await page.mouse.up();
  await page.waitForFunction(() => document.querySelectorAll('#stkboard .stk.on').length === 2 && queue.length === 0, null, { timeout: 10000 });
  const placed = await page.evaluate(() => JSON.parse(fieldVal(trip('hk-macau-2026'), 'stickers', 'mimi')));
  ok(placed.length === 2 && Math.abs(placed[1][1] - 25) <= 2 && Math.abs(placed[1][2] - 50) <= 2 && await page.locator('#stktray .stk').count() === tray0 - 2, 'stickers: tap puts one on the page, drag drops one where the finger lets go');
  await s.shot('11-kid-stickers', false);
  const on = await boxOf(page, '#stkboard .stk.on');
  await page.mouse.move(on.x + on.width / 2, on.y + on.height / 2); await page.mouse.down();
  await page.mouse.move(src.x + 20, src.y + 20, { steps: 8 }); await page.mouse.up();
  await page.waitForFunction(() => document.querySelectorAll('#stkboard .stk.on').length === 1);
  ok(await page.locator('#stktray .stk').count() === tray0 - 1, 'stickers: dragging one off the page peels it back into the tray');
  // living map: the kids stand on today's stop; tapping a pin walks them there
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/map"]'); await page.waitForSelector('.tmap .walkers img');
  ok(await page.locator('.tmap .pin').count() === 7 && await page.locator('.tmap .pin.here[data-v="mawan"]').count() === 1 && await page.locator('.tmap .walkers img').count() === 2, 'map: 7 pins, Mimi and Mika at Ma Wan on day 2');
  ok(await page.locator('.tmap .hop.done').count() === 3, 'map: the path walked so far is solid (airport → Ma Wan → Disneyland → Ma Wan)');
  await page.click('.tmap .pin[data-v="taipa"]'); await page.waitForSelector('.tmap .pin.here[data-v="taipa"]');
  ok((await page.textContent('.kidday small')).includes('5') && (await page.evaluate(() => window.__said)).some((x) => x.startsWith('Taipa Village')), 'map: tapping Taipa walks there (day 5) and says its name');
  const wl = await boxOf(page, '.tmap .walkers'), pin = await boxOf(page, '.tmap .pin[data-v="taipa"]');
  ok(Math.abs(wl.x + wl.width / 2 - (pin.x + pin.width / 2)) < 12, 'map: the walkers stand on the pin');
  ok(await s.noHScroll(), 'map + stickers fit the phone');
  await s.shot('12-kid-map', false);
  // the new games: photos, pairs, my mood, counting, trophies
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/photos"]'); await page.waitForSelector('.kidphoto img');
  ok((await page.textContent('.kpn')).startsWith('1 / ') && await page.locator('.kidphoto img[src^="/media/"]').count() === 1, 'photos: a big viewer, the day\'s photos first');
  await page.click('.kpnav [data-a="kidphoto"][data-v="1"]'); await page.waitForFunction(() => document.querySelector('.kpn').textContent.startsWith('2 /'));
  ok(true, 'photos: next photo');
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/match"]'); await page.waitForSelector('.mcard');
  ok(await page.locator('.mcard').count() === 12 && await page.locator('.mcard.open').count() === 0, 'pairs: 12 cards face down');
  const deck = await page.evaluate(() => mg.cards.map((c) => c.k));
  await page.click('.mcard[data-v="0"]'); await page.click(`.mcard[data-v="${deck.findIndex((k, j) => j > 0 && k !== deck[0])}"]`);
  await page.waitForFunction(() => document.querySelectorAll('.mcard.open').length === 0, null, { timeout: 5000 });
  ok(await page.evaluate(() => mg.moves) === 1, 'pairs: two different cards turn back over');
  for (let n = 0; n < 12; n++) { const m = deck.indexOf(deck[n], n + 1); if (m > 0) { await page.click(`.mcard[data-v="${n}"]`); await page.click(`.mcard[data-v="${m}"]`); } }
  await page.waitForFunction(() => mg && mg.won, null, { timeout: 5000 });
  await page.waitForSelector('.mcard.done');
  ok(await page.locator('.mcard.done').count() === 12 && await page.evaluate(() => ls('match_mimi')) === 1 && (await page.evaluate(() => window.__said)).some((x) => /Brilliant|เก่งมาก/.test(x)), 'pairs: all found, a win counted and cheered');
  await page.click('[data-a="kidnewmatch"]'); await page.waitForFunction(() => document.querySelectorAll('.mcard.done').length === 0);
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/mood"]'); await page.waitForSelector('.moodgrid button');
  await page.click('.moodgrid button[data-v="🤩"]'); await page.waitForSelector('.moodgrid button[data-v="🤩"][aria-pressed="true"]');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 10000 });
  ok((await apiState(page)).entries.some((e) => e.id === `${T}.mood.d1.mimi` && e.mood === '🤩') && (await page.evaluate(() => window.__said)).some((x) => /excited|ตื่นเต้น/.test(x)), 'my mood: Mimi picks 🤩 herself — saved like the record page, said aloud');
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/numbers"]'); await page.waitForSelector('.cnt');
  const nc = await page.locator('.cnt').count();
  for (let k = 0; k < nc; k++) await page.click(`.cnt[data-v="${k}"]`);
  await page.waitForFunction((n) => document.querySelector('#bignum').textContent === String(n), nc, { timeout: 5000 });
  ok(nc >= 3 && nc <= 10 && await page.locator('.cnt.hit').count() === nc && (await page.evaluate(() => window.__said)).some((x) => /^(one|หนึ่ง)\|/.test(x)), `count: ${nc} to tap, each one numbered and said`);
  await page.click('.kidbar button[data-v$="/trophies"]'); await page.waitForSelector('.tro');
  ok(await page.locator('.tro.got').count() >= 3 && await page.locator('.tro.got.new').count() >= 3 && await page.locator('.tro:not(.got)').count() >= 3, 'trophies: first stamp, little painter, pair finder earned and celebrated; the rest locked');
  await s.shot('12b-kid-trophies', false);
  await page.reload(); await page.waitForSelector('.tro');
  ok(await page.locator('.tro.new').count() === 0, 'trophies: celebrated once, not on every visit');
  await page.click('.kidback'); await page.waitForSelector('.kidtiles');
  await s.shot('10-kid-home');
  const lock = await page.locator('#kidexit').boundingBox();
  await page.mouse.move(lock.x + lock.width / 2, lock.y + lock.height / 2); await page.mouse.down(); await page.waitForTimeout(300); await page.mouse.up();
  ok(page.url().includes('#/kid'), 'a quick tap on the lock does nothing (toddler-proof)');
  await page.mouse.down(); await page.waitForTimeout(1500); await page.mouse.up();
  await page.waitForSelector('.pp .advc');
  ok(page.url().includes('#/passport/mimi') && await page.locator('#m1 .colsvg.sm svg').count() === 1, 'holding the lock leaves kid mode; the passport shows the colouring');
  ok(await page.locator('.mapsec .tmap .pin').count() === 7 && await page.locator('.stkpage #stkboard .stk.on').count() === 1 && await page.locator('.stkpage #stktray').count() === 0, 'passport: the map, and the sticker page (read-only) Mimi made');
  await page.goto(BASE + '/'); await page.waitForSelector('.shelf');
  ok(await page.locator('.ppmini .ppc').count() === 2, 'shelf: passport covers for both kids');
  ok(/1 (รีวิว|review)/.test(await page.textContent('a.nbcard')), 'shelf: travel notebook card counts the review');
  // backup: never done on this phone → the card nags; one tap downloads the full zip, then it reads up to date
  ok(await page.locator('.nbcard.backup.warn').count() === 1 && /ยังไม่เคย|Never backed up/.test(await page.textContent('.nbcard.backup')), 'shelf: backup card warns that this phone never backed up');
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('.nbcard.backup')]);
  const dlPath = await dl.path();
  ok(/^memory-bookshelf-\d{4}-\d{2}-\d{2}\.zip$/.test(dl.suggestedFilename()) && fs.readFileSync(dlPath).subarray(0, 2).toString() === 'PK', 'backup: one tap downloads the full zip');
  await page.waitForSelector('.nbcard.backup:not(.warn)');
  ok(/ครบแล้ว|up to date/.test(await page.textContent('.nbcard.backup')) && await page.locator('.shelf').count() === 1, 'backup: the card reads up to date and the shelf stays open');
  await s.shot('15b-shelf-backup', false);
  await page.click('a.nbcard'); await page.waitForSelector('.nblist');
  ok(await page.locator('.nbrow').count() === 1 && (await page.textContent('.nbrow')).includes('★★★★☆') && /เด็กนอนดี|kids slept well/.test(await page.textContent('.nbsum')), 'notebook page: the stay with its stars; "what worked" lists the tag');
  ok(await s.noHScroll(), 'notebook page fits the phone');
  await s.shot('13-notebook');
  await page.goto(BASE + '/'); await page.waitForSelector('.shelf');
  ok(!(await page.evaluate(() => heroHtml() !== '')) || await page.locator('.hero .cast .who').count() === 2, 'shelf: Mimi and Mika stand in the hero as characters');
  ok(await page.locator(`.spine[href="#/t/${T}"] .polas img`).count() >= 1 && await page.locator('.spine .arts .art').count() >= 1, 'shelf: book with photos shows them, the other shows its day art');
  ok(await page.evaluate(() => (heroHtml() !== '') === !!document.querySelector('.hero')), 'shelf: next-adventure hero while a trip is ahead or on');
  ok(await s.noHScroll(), 'shelf: no horizontal scroll with hero + passports');
  await s.shot('07-shelf-after');
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('#d1');
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
  await page.waitForSelector('.items .tag'); await page.waitForTimeout(50);   // the save's re-render first (it replaces the file input)
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

  // keep the book on the phone: the service worker cache must then hold the shell, all art, every thumbnail and the favourites;
  // the page keeps the server state in IndexedDB. (Playwright's offline switch does not reach the service worker, so the
  // cache is checked directly and the no-network paths are exercised on the page: cached state, notice, photo fallback.)
  await page.goto(`${BASE}/#/t/${T}/offline`); await page.waitForSelector('#offl');
  await page.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller, null, { timeout: 15000 });
  await page.click('#offl [data-a="offline"]');
  await page.waitForFunction((tid) => !!ls('offline_' + tid), T, { timeout: 30000 });
  ok((await page.textContent('#offl')).includes('อยู่ในเครื่องแล้ว') && await page.evaluate(() => idb.get('state').then((s) => !!(s && s.trips.length && s.syncedAt))), 'offline pack stored; server state kept in IndexedDB with a sync time');
  const cached = async (urls) => page.evaluate(async (us) => { const ks = await caches.keys(); const c = await caches.open(ks.find((k) => k.startsWith('mbs-'))); const out = {}; for (const u of us) out[u] = !!(await c.match(u)); return out; }, urls);
  const fave = st.media.find((m) => m.trip === T && m.highlight), plain = st.media.find((m) => m.trip === T && m.day === 2);
  const want = ['/', '/app.css', '/core.js', '/views.js', '/sheets.js', '/kid.js', '/art/guides/pinky.svg', '/art/crest/hk.svg', '/art/kids/mika-full.svg', '/art/colour/hk/day-3.svg', '/art/hk/day-6.svg',
    ...st.media.filter((m) => m.trip === T).map((m) => `/media/${m.id}/t`), `/media/${fave.id}`];
  const have = await cached(want.concat(`/media/${plain.id}`));
  ok(want.every((u) => have[u]), 'service worker cache holds the shell, all art (precached at install), every thumbnail of the book and the full-size favourite' + want.filter((u) => !have[u]).map((u) => ' MISSING ' + u).join(''));
  ok(!have[`/media/${plain.id}`], 'a plain photo is kept as a thumbnail only (full size stays on the server until opened or "with all photos")');
  await page.click('#offl [data-a="offline"][data-v="all"]');
  await page.waitForFunction((tid) => (ls('offline_' + tid) || {}).all === true, T, { timeout: 30000 });
  ok((await cached([`/media/${plain.id}`]))[`/media/${plain.id}`], '"with all full-size photos" stores the rest too');
  // no network: the state comes from IndexedDB with a notice; a photo that is not on the phone falls back to its thumbnail, then to a placeholder
  await s.ctx.setOffline(true);
  await page.goto(`${BASE}/#/t/${T}/book`); await page.reload(); await page.waitForSelector('.cover', { timeout: 20000 });
  ok(await page.locator('.notice').count() === 1 && (await page.textContent('.notice')).includes('ข้อมูลล่าสุดเมื่อ'), 'no network: cached state renders the book, notice shows the last sync time');
  const fb = await page.evaluate(() => new Promise((res) => { const i = document.createElement('img'); i.src = '/media/ph-not-on-this-phone'; document.body.appendChild(i); const t = setInterval(() => { if (i.classList.contains('nophoto')) { clearInterval(t); res(i.getAttribute('src')); } }, 50); setTimeout(() => { clearInterval(t); res('timeout:' + i.getAttribute('src')); }, 8000); }));
  ok(fb === null, 'a photo that cannot be loaded tries its thumbnail, then shows a placeholder (no broken image)');
  await page.locator(`[data-a="lb"][data-v="${plain.id}"]`).first().click(); await page.waitForSelector('#lb:not([hidden]) img');
  await page.waitForFunction(() => { const i = document.querySelector('#lb .stage img'); return i && i.complete && i.naturalWidth > 0; }, null, { timeout: 10000 });
  ok(true, 'no network: a stored photo opens full size');
  await page.keyboard.press('Escape');
  await page.goto(`${BASE}/#/passport/mimi/${T}`); await page.waitForSelector('.pp .advc img.crest');
  await page.click('.kidgo'); await page.waitForSelector('.kidtiles');
  await page.click('.kidtiles button[data-v$="/colour"]'); await page.waitForSelector('.colourpad svg [data-c]', { timeout: 10000 });
  await page.locator('.colourpad [data-c]').nth(0).click({ force: true });
  await page.waitForFunction(() => queue.length >= 1, null, { timeout: 5000 });
  const lock2 = await boxOf(page, '#kidexit');
  await page.mouse.move(lock2.x + lock2.width / 2, lock2.y + lock2.height / 2); await page.mouse.down(); await page.waitForTimeout(1500); await page.mouse.up();
  await page.waitForSelector('.pp .advc');
  await s.ctx.setOffline(false);
  await page.evaluate(() => { offline = false; return flush(); });
  await page.waitForFunction(() => queue.length === 0 && !offline, null, { timeout: 20000 });
  await page.waitForSelector('.notice', { state: 'detached', timeout: 10000 }).catch(() => {});   // the re-render after load() is a tick later
  ok(await page.locator('.notice').count() === 0, 'back online: queued colouring sent, notice gone');
  await s.ctx.close();
}

// ---------- wide desktop + dark mode ----------
{
  const s = await session('wide', { width: 1440, height: 900 });
  await login(s.page);
  await s.page.goto(`${BASE}/#/t/${T}`); await s.page.waitForSelector('.hubgrid');
  ok((await s.page.locator('.hubgrid').evaluate((g) => getComputedStyle(g).gridTemplateColumns.split(' ').length)) >= 5, 'wide: the menu spreads into 5+ columns');
  await s.shot('10a-menu-wide', false);
  await s.page.goto(`${BASE}/#/t/${T}/book`); await s.page.waitForSelector('#d1');
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
  ok(pdf.pages >= 7 && pdf.size > 40000, 'memory book PDF: cover, numbers, contents, day pages, firsts, words, a passport spread per child, back cover');
  // the memory book preview on screen (what the PDF prints)
  await s.page.goto(`${BASE}/#/print/hk-macau-2026`); await s.page.waitForSelector('.pg.cover');
  const pgs = await s.page.locator('.pg').evaluateAll((els) => els.map((e) => e.className.replace('pg ', '').split(' ')[0]));
  ok(pgs[0] === 'cover' && pgs.includes('numbers') && pgs.includes('contents') && pgs.filter((c) => c === 'dayp').length >= 1 && pgs.filter((c) => c === 'ppp').length === 2 && pgs.includes('wordsp') && pgs.includes('firstsp') && pgs[pgs.length - 1] === 'back', `memory book pages: ${pgs.join(' · ')}`);
  ok(await s.page.locator('.pg.cover .cast .who').count() === 2 && await s.page.locator('.pg.cover .cvart .art').count() === 6 && await s.page.locator('.pg.numbers .pmap .pin').count() === 7, 'memory book cover: the kids, the six day stamps; numbers page: the route map');
  ok(await s.page.locator('.pg.ppp .dstamp').count() === 12 && await s.page.locator('.pg.ppp .colsvg svg, .pg.ppp .colsvg').count() >= 1, 'passport spreads: 6 stamp slots per child, Mimi\'s colouring');
  ok(await s.page.locator('nav.bar, .top').count() === 0, 'memory book preview has no app chrome');
  await s.page.screenshot({ path: path.join(OUT, 'wide-13-memory-book.png'), fullPage: true });
  await s.shot('10-book-wide');
  await s.page.goto(`${BASE}/#/passport/mimi`); await s.page.waitForSelector('.pp .dstamp');
  await s.page.waitForSelector('.pp.packed');
  const pw = await s.page.evaluate(() => { const c = [...document.querySelectorAll('.pp.packed > .ccol')].map((x) => x.offsetHeight); return { cols: c.length, gap: Math.abs(c[0] - c[1]), st: document.querySelector('.dstamp .art').getBoundingClientRect().width }; });
  ok(pw.gap < 520, `wide passport: the two columns end close together (${pw.gap}px apart), no big hole beside the cover`);
  ok(pw.cols >= 2 && pw.st >= 56 && pw.st <= 90, `wide: passport pages side by side (${pw.cols} cols), stamps ${Math.round(pw.st)}px`);
  await s.shot('11-passport-wide');
  await s.page.goto(BASE + '/'); await s.page.waitForSelector('.shelf');
  await s.shot('12-shelf-wide');
  await s.ctx.close();
  for (const w of [320, 375]) {
    const p = await session('w' + w, { width: w, scheme: 'dark' });
    await login(p.page);
    await p.page.goto(`${BASE}/#/t/${T}`); await p.page.waitForSelector('.hubgrid');
    ok(await p.noHScroll(), `${w}px dark: menu fits`);
    await p.shot('menu-dark');
    await p.page.goto(`${BASE}/#/t/${T}/book`); await p.page.waitForSelector('#d1');
    ok(await p.noHScroll(), `${w}px dark: no horizontal scroll`);
    ok(await p.page.evaluate(() => getComputedStyle(document.body).backgroundColor) === 'rgb(18, 22, 28)', `${w}px: dark paper`);
    await p.shot('book-dark');
    await p.page.goto(`${BASE}/#/t/${T}/log/1`); await p.page.waitForSelector('.daystrip');
    ok(await p.noHScroll(), `${w}px dark: record page fits`);
    await p.shot('record-dark');
    await p.page.goto(`${BASE}/#/passport/mimi`); await p.page.waitForSelector('.pp .dstamp');
    ok(await p.noHScroll(), `${w}px dark: passport fits`);
    await p.shot('passport-dark');
    await p.page.goto(BASE + '/'); await p.page.waitForSelector('.shelf');
    ok(await p.noHScroll(), `${w}px dark: shelf fits`);
    await p.shot('shelf-dark');
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
  ok(await page.locator('nav.bar a[href="#/passport"]').count() === 1 && await page.locator('nav.bar a[href$="/today"]').count() === 1, 'viewer: relatives get menu, today, book, firsts, passports');
  await page.goto(`${BASE}/#/passport/mimi`); await page.waitForSelector('.mission');
  ok(await page.locator('button[data-a="tick"]:not([disabled])').count() === 0 && await page.locator('.ppf').count() === 0 && await page.locator('.mission .tick.on').count() >= 1, 'viewer: sees the passport ticks read-only');
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid');
  ok(await page.locator('.tile[href*="/log/"], .tile[href$="/offline"], .tile.kid').count() === 0 && await page.locator('.tile[href$="/sos"]').count() === 1, 'viewer menu: no record, offline or kid-mode tiles; emergency numbers stay');
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('#d1');
  ok(await page.locator('a[href*="/log/"]').count() === 0, 'viewer: no edit links in the book');
  await page.locator('#d1 .mosaic button').first().click(); await page.waitForSelector('#lb:not([hidden]) img');
  ok(await page.locator('#lb [data-lb="del"]').count() === 0 && await page.locator('#lbcap').count() === 0, 'viewer: lightbox without delete/caption edit');
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('.cover');
  ok(true, 'viewer: record URL falls back to the book');
  const w = await page.evaluate(async () => (await fetch('/api/b/entries/q-hack-0001', { method: 'PUT', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ trip: 'hk-macau-2026', day: 0, kind: 'quote', child: 'mimi', text: 'x' }) })).status);
  ok(w === 403, 'viewer write → 403');
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('a[data-a="pdf"]');
  const [dl] = await Promise.all([page.waitForEvent('download', { timeout: 120000 }), page.click('a[data-a="pdf"]')]);
  ok(dl.suggestedFilename() === 'hk-macau-2026.pdf' && fs.readFileSync(await dl.path()).subarray(0, 5).toString('latin1') === '%PDF-', 'viewer (relatives): the memory book button saves the PDF');
  await page.route('**/api/b/pdf/**', (r) => r.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"pdf-unavailable"}' }));
  await page.click('a[data-a="pdf"]'); await page.waitForFunction(() => /PDF/.test(document.querySelector('#toast')?.textContent || '') && /ไม่สำเร็จ|Could not/.test(document.querySelector('#toast').textContent));
  ok(await page.locator('.cover').count() === 1, 'PDF failure: a message, the book stays on screen');
  await page.unroute('**/api/b/pdf/**');
  await page.goto(`${BASE}/#/print/${T}`); await page.waitForSelector('.pg.back');
  ok(await page.locator('.pg').count() >= 7 && await s.noHScroll(), 'viewer: memory book preview renders on a phone without horizontal scroll');
  await s.shot('20-viewer');
  // grandma sends Mimi a heart from the book
  await page.goto(`${BASE}/#/t/${T}/hearts`); await page.waitForSelector('#hearts .hform');
  await page.click('[data-a="heartto"][data-v="mimi"]'); await page.click('[data-a="heartemo"][data-v="🤗"]');
  await page.click('[data-a="sendheart"]');
  ok(await page.locator('.hlist li').count() === 0 && await page.evaluate(() => document.activeElement.id) === 'hfrom', 'heart: a sender name is asked for first');
  await page.fill('#hfrom', 'Grandma'); await page.fill('#htext', 'Big hug from Grandma!');
  await page.click('[data-a="sendheart"]');
  await page.waitForFunction(() => queue.length === 0 && S.hearts.some((h) => h.from === 'Grandma' && !h.pending), null, { timeout: 10000 });
  ok(await page.locator('.hlist li').count() === 1 && (await page.textContent('.hlist li')).includes('Big hug') && await page.locator('.hlist [data-a="delheart"]').count() === 1, 'heart: sent, listed in the book, grandma may take back her own');
  ok(await page.evaluate(() => ls('heartfrom')) === 'Grandma' && await page.inputValue('#hfrom') === 'Grandma' && await page.inputValue('#htext') === '', 'heart: name remembered on this phone, note cleared');
  await s.shot('21-viewer-heart');
  ok(s.errs.length === 0, 'viewer: no console errors ' + s.errs.join(' | '));
  await s.ctx.close();
}

// ---------- before the trip: countdown doors, packing, finger drawing, hearts, bedtime story ----------
{
  const s = await session('countdown');
  const { page } = s;
  await page.clock.setFixedTime(new Date('2026-11-28T09:00:00+08:00'));   // 7 days before Hong Kong
  await page.addInitScript(() => { window.__said = []; Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    speak(u) { window.__said.push(`${u.text}|${u.lang}`); if (u.onend) setTimeout(() => u.onend({}), 5); }, cancel() {}, onvoiceschanged: null,
    getVoices: () => ['zh-HK', 'th-TH', 'en-GB', 'pt-PT', 'en-AU'].map((l) => ({ lang: l, name: l })) } }); });
  await login(page);
  await page.click('button[data-a="lang"][data-v="en"]');
  ok(await page.locator('.hero [data-a="kidmode"]').count() === 1, "shelf: before the trip grown-ups get a “today's surprise” button");
  await page.click('.hero [data-a="kidmode"]'); await page.waitForSelector('.kidpick');
  await page.click('.kidpick button[data-v="mimi"]'); await page.waitForSelector('.kidtiles');
  const tiles = await page.locator('.kidtiles button').evaluateAll((bs) => bs.map((b) => b.dataset.v || b.dataset.a));
  ok(tiles.some((v) => v.endsWith('/count')) && tiles.some((v) => v.endsWith('/pack')) && !tiles.some((v) => /\/(stamp|spot)$/.test(v)), 'kid mode before the trip: surprise + pack tiles, no stamp/find yet');
  ok((await page.textContent('.kidhello p')).includes('7'), 'kid home counts down: 7 sleeps');
  ok(await page.locator('.kidhearts').count() === 1 && (await page.textContent('.kidhearts')).includes('Grandma'), "hearts: grandma's heart waits on Mimi's home screen");
  await s.shot('01-kid-countdown-home');
  await page.click('.kidhearts'); await page.waitForSelector('.kidhearts-list button');
  await page.locator('.kidhearts-list button').first().click();
  ok((await page.evaluate(() => window.__said)).some((x) => x.includes('Grandma') && x.includes('Big hug')), 'hearts: tapping reads the note aloud');
  await page.click('.kidback'); await page.waitForSelector('.kidtiles');
  ok(await page.locator('.kidhearts').count() === 0 && await page.locator('.kidtiles .love').count() === 1, 'hearts: once seen the banner becomes a quiet 💗 tile');

  // surprise doors: 8 of 14 open a week before (one a day), the rest locked
  await page.click('.kidtiles button[data-v$="/count"]'); await page.waitForSelector('.doors .door');
  ok(await page.locator('.door').count() === 14 && await page.locator('.door.ready').count() === 8 && await page.locator('.door.locked').count() === 6, 'countdown: 14 doors, 8 ready, 6 locked');
  await page.locator('.door.locked').first().click();
  ok((await page.evaluate(() => window.__said)).some((x) => /opens in 1 day/.test(x)), 'countdown: a locked door says when it opens');
  await page.locator('.door[data-v="3"]').click(); await page.waitForSelector('#doorcard');
  ok((await page.textContent('#doorcard')).includes('M̀h gōi') && await page.locator('#doorcard [data-a="kidword"][data-lang="zh-HK"]').count() === 1, 'countdown: door 4 teaches “M̀h gōi” with a Cantonese 🔊');
  await s.shot('02-kid-door', false);
  await page.click('[data-a="kiddoorclose"]'); await page.waitForSelector('.door.opened');
  ok(await page.locator('.door.opened').count() === 1, 'countdown: the opened door stays open');
  // help pack
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/pack"]'); await page.waitForSelector('.kidspots button');
  await page.locator('.kidspots button').first().click(); await page.waitForSelector('.kidspots button.on');
  ok(await page.locator('.kidspots button').count() === 10, 'pack: 10 big picture cards, tap = packed');
  for (let k = 1; k < 5; k++) { await page.locator('.kidspots button').nth(k).click(); await page.waitForSelector(`.kidspots button:nth-child(${k + 1}).on`); }
  // trophies before the trip: first door + packing helper earned, halfway not yet
  await page.click('.kidbar button[data-v$="/trophies"]'); await page.waitForSelector('.tro');
  // the five packing ticks are queued writes; give the page a moment to show them before reading the badges
  await page.waitForFunction(() => { const t = [...document.querySelectorAll('.tro')].slice(0, 2); return t.length === 2 && t.every((b) => b.classList.contains('got')); }, null, { timeout: 8000 }).catch(() => {});
  const pre = await page.locator('.tro').evaluateAll((bs) => bs.slice(0, 3).map((b) => b.classList.contains('got')));
  ok(pre.join() === 'true,true,false', 'trophies before the trip: first door and packing helper earned, halfway still locked' + (pre.join() === 'true,true,false' ? '' : ` — saw ${pre.join()}, ticks ${await page.evaluate(() => S.entries.filter((e) => e.kind === 'tick' && e.child === 'mimi').map((e) => e.first_key).join(' '))}`));
  ok(await s.noHScroll(), 'trophies page fits the phone');
  await s.shot('02b-kid-pretrip-trophies', false);
  await page.click('.kidbar button[data-v="#/kid/mimi"]'); await page.waitForSelector('.kidtiles'); await page.click('.kidtiles button[data-v$="/pack"]'); await page.waitForSelector('.kidspots button');
  // finger drawing → a private picture (no day before the trip)
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/draw"]'); await page.waitForSelector('#kidcanvas');
  await page.click('[data-a="kiddrawdone"]');
  ok((await page.evaluate(() => window.__said)).some((x) => /Draw something first/.test(x)) && page.url().endsWith('/draw'), 'draw: an empty board is not saved');
  const box = await page.locator('#kidcanvas').boundingBox();
  await page.click('.palette button[data-v="#EF5350"]');
  await page.mouse.move(box.x + 40, box.y + 40); await page.mouse.down();
  for (let k = 1; k <= 12; k++) await page.mouse.move(box.x + 40 + k * 20, box.y + 40 + Math.sin(k) * 30);
  await page.mouse.up();
  await page.click('.palette button[data-v="#42A5F5"]'); await page.click('[data-a="kidpen"][data-v="48"]');
  await page.mouse.move(box.x + 100, box.y + 150); await page.mouse.down(); await page.mouse.move(box.x + 250, box.y + 200); await page.mouse.up();
  const red = await page.evaluate(() => { const d = document.querySelector('#kidcanvas').getContext('2d').getImageData(0, 0, 1200, 900).data; let n = 0; for (let k = 0; k < d.length; k += 4) if (d[k] > 200 && d[k + 1] < 120 && d[k + 2] < 120) n++; return n; });
  ok(red > 500, `draw: the finger paints on the canvas (${red} red pixels)`);
  ok(await s.noHScroll(), 'draw page fits the phone');
  await s.shot('03-kid-draw', false);
  await page.click('[data-a="kidundo"]');
  await page.click('[data-a="kiddrawdone"]'); await page.waitForSelector('.kidtiles');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  let st = await apiState(page);
  const dr = st.media.find((m) => m.id.startsWith('dr-mimi-'));
  ok(dr && dr.day === null && dr.w === 1200 && dr.caption.includes('Mimi'), 'draw: saved as a private picture of the trip (no day before we go)');
  ok(st.entries.some((e) => e.id === `${T}.tick.cd.4.mimi`) && st.entries.some((e) => e.id === `${T}.tick.pack.toy.mimi`), 'server: door 4 opened + toy packed, for Mimi only');
  ok((await page.evaluate(async (id) => (await fetch('/media/' + id)).headers.get('content-type'), dr.id)) === 'image/jpeg', 'draw: the drawing is served like a photo (signed-in only)');

  // leave kid mode; the drawing is in the book, then a bedtime story read aloud with turning pages
  const lock = await page.locator('#kidexit').boundingBox();
  await page.mouse.move(lock.x + lock.width / 2, lock.y + lock.height / 2); await page.mouse.down(); await page.waitForTimeout(1500); await page.mouse.up();
  await page.waitForSelector('.pp .advc');
  await page.evaluate(async () => { await fetch('/api/b/entries/hk-macau-2026.story.all', { method: 'PUT', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ trip: 'hk-macau-2026', day: null, kind: 'story', text: 'Once upon a time Mimi and Mika flew to Hong Kong. The plane went whoosh!\n\nThey met Captain Pinky by the sea. Then they slept in a castle of lights.\n\nThe end.', lang: 'en' }) }); await load(); });
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('.cover');
  ok(await page.locator('.mosaic.drawings img').count() === 1, "book: the kids' drawings section");
  await page.goto(`${BASE}/#/t/${T}/plan/full`); await page.waitForSelector('.itin');
  // the day's plan from the manual: collapsed in the itinerary, open for today on the record page
  ok(await page.locator('.itin .dayplan').count() === 6 && await page.locator('.itin .dayplan[open]').count() === 0, 'itinerary: every HK day has a collapsed plan (not on the trip yet)');
  await page.locator('.itin > li').nth(3).locator('.dayplan > summary').first().click();
  const p4 = await page.locator('.itin > li').nth(3).locator('.dayplan').textContent();
  ok(/11:00/.test(p4) && /teamLab/.test(p4) && /Plan B/.test(p4) && /Money today/.test(p4) && /Local pick/.test(p4), 'itinerary: day 4 plan shows the timeline, local pick, plan B and money');
  await page.locator('.itin > li').nth(3).screenshot({ path: path.join(OUT, 'countdown-05-dayplan.png') });
  await page.goto(`${BASE}/#/t/${T}/log/3`); await page.waitForSelector('.planblk');
  ok(await page.locator('.planblk .dayplan').count() === 1 && (await page.textContent('.planblk')).includes('Wong Chi Kei'), 'record page: the plan sits at the top of the day');
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('.bedbtn');
  await page.locator('.bedbtn').first().click(); await page.waitForSelector('#bedtime .bttext');
  ok(await page.locator('#bedtime .btdots i').count() === 3, 'bedtime: one page per paragraph');
  await s.shot('04-bedtime', false);
  await page.waitForSelector('#bedtime .bttext.end', { timeout: 15000 });
  const said = await page.evaluate(() => window.__said);
  ok(said.includes('Once upon a time Mimi and Mika flew to Hong Kong. |en-GB') && said.some((x) => x.startsWith('They met Captain Pinky')), 'bedtime: read aloud sentence by sentence, pages turn by themselves to “The end”');
  await page.click('[data-a="btprev"]'); await page.click('[data-a="btclose"]');
  ok(await page.locator('#bedtime').count() === 0, 'bedtime: closes');
  ok(s.errs.length === 0, 'countdown: no console errors ' + s.errs.join(' | '));
  await s.ctx.close();
}
// ---------- Australia on the trip (clock in April 2027): pocket guide, day plan, quiz, Aussie words ----------
{
  const s = await session('au');
  const { page } = s;
  await page.clock.setFixedTime(new Date('2027-04-03T10:00:00+11:00'));   // day 2, Grand Pacific Drive
  await page.addInitScript(() => { window.__said = []; Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    speak(u) { window.__said.push(`${u.text}|${u.lang}`); }, cancel() {}, onvoiceschanged: null, getVoices: () => ['th-TH', 'en-GB', 'en-AU'].map((l) => ({ lang: l, name: l })) } }); });
  await login(page);
  await page.click('button[data-a="lang"][data-v="en"]');
  await page.goto(`${BASE}/#/t/big-hop-2027`); await page.waitForSelector('.hubgrid');
  ok(await page.locator('.tile.today.hi').count() === 1 && (await page.textContent('.tile.today')).includes('Day 2 of 16') && (await page.textContent('.tile[href$="/stays"]')).includes('By the Bay'), 'menu on the trip: today tile highlighted with the day, stays tile names tonight');
  await page.goto(`${BASE}/#/t/big-hop-2027/today/full`); await page.waitForSelector('.day.today');
  ok((await page.textContent('.day.today h3')).includes('Grand Pacific') && await page.locator('.quick a[href*="/log/1"]').count() === 1 && await page.locator('.quick a[href*="maps/dir"]').count() === 1 && await page.locator('.dayplan[open] .picks .pk').count() === 3, "today page on the trip: day 2, record + route buttons, the plan open with its picks");
  await page.goto(`${BASE}/#/t/big-hop-2027/book`); await page.waitForSelector('.cover');
  ok(await page.locator('img[src="/art/kids/mimi-adventure-full.svg"]').count() >= 1 && await page.locator('img[src="/art/kids/mimi-full.svg"]').count() === 0, 'Australia book: the kids wear their adventure outfits');
  // glance first: each topic opens as a few answer cards; the manual-style report is one tap away
  await page.goto(`${BASE}/#/t/big-hop-2027/today`); await page.waitForSelector('.dsheet');
  ok(/Money today/.test(await page.textContent('.cgrid')) && /≈ A\$\d/.test(await page.textContent('.dsheet .num')) && await page.locator('.dayplan').count() === 0 && await s.noHScroll(), 'today glance: answer cards (money shows the day total), no full plan until tapped');
  { const cut = []; for (const r of ['prep', 'learn', 'sos', 'stays']) { await page.goto(`${BASE}/#/t/big-hop-2027/${r}`); await page.waitForSelector('.glg'); cut.push(...await page.$$eval('.glc small', (els) => els.map((e) => e.textContent.trim()).filter((x) => /…$/.test(x)))); }
    ok(cut.length === 0, `AU glance cards: no subtitle ends with “…” ${cut.slice(0, 2).join(' | ')}`); }
  await page.goto(`${BASE}/#/t/big-hop-2027/plan`); await page.waitForSelector('.drows');
  ok(await page.locator('.drows li').count() === 16 && await page.locator('.drows li.now a[href$="/today/1"]').count() === 1 && await s.noHScroll(), 'whole-trip glance: one tappable line per day, today marked, fits the phone');
  await page.goto(`${BASE}/#/t/big-hop-2027/stays`); await page.waitForSelector('.slist');
  ok(await page.locator('.sline').count() === 8 && await page.locator('.sline.now').count() === 1 && await page.locator('.sline [data-a="driver"]').count() === 8 && await s.noHScroll(), 'stays glance: night strip + one line per stay, tonight marked, driver button on each');
  await page.goto(`${BASE}/#/t/big-hop-2027/sos`); await page.waitForSelector('.calls');
  ok(await page.locator('.callb.main[href="tel:000"]').count() === 1 && await page.locator('.stayc.tonight').count() === 1 && await s.noHScroll(), 'emergency glance: big call buttons (000 first), tonight\'s address');
  await page.goto(`${BASE}/#/t/big-hop-2027/prep`); await page.waitForSelector('.glg');
  ok(await page.locator('.glg .glc').count() >= 6 && /packed/.test(await page.textContent('.glg')), 'get-ready glance: a card per topic, packing progress');
  await page.locator('.glg .glc').nth(2).click(); await page.waitForSelector('#pocket');
  ok(/\/prep\/full\/2$/.test(page.url()) && await page.locator('#pocket details.pg[open]').count() === 1 && await page.locator('#pg-prep-2[open]').count() === 1 && await page.locator('.backsum').count() === 1, 'a glance card opens the report on its own section, with a way back');
  await page.goto(`${BASE}/#/t/big-hop-2027/plan/full`); await page.waitForSelector('.itin > li.now');
  ok(await page.locator('.itin > li.now .dayplan[open]').count() === 1 && (await page.textContent('.itin > li.now .dayplan')).includes('Bald Hill') && (await page.textContent('.itin > li.now .dayplan')).includes('Waldegrave'), "AU itinerary: today's plan is open, with the stay address");
  await page.locator('.itin > li.now .dayplan').screenshot({ path: path.join(OUT, 'au-01-dayplan.png') });
  await page.goto(`${BASE}/#/t/big-hop-2027/stays/full`); await page.waitForSelector('#pocket');
  ok(await page.locator('.nights li').count() === 15 && await page.locator('.nights a.maplink').count() === 15, 'stays page: night by night (the flight home is no night), each stay opens Maps');
  ok(await page.locator('#pocket .stayc').count() === 8 && await page.locator('#pocket .stayc a[href^="https://www.google.com/maps/search/"]').count() === 8 && await page.locator('#pocket .stayc a[href^="https://www.google.com/maps/dir/"]').count() === 8, 'pocket guide: 8 stays with addresses, map and directions links');
  await page.locator('#pocket [data-a="driver"]').nth(1).click(); await page.waitForSelector('.drivercard');
  ok((await page.textContent('.drivercard')).includes('24 Waldegrave Crescent, Vincentia NSW 2540'), 'show the driver: the full address in big print');
  await page.click('.sheet [data-a="closesheet"]'); await page.waitForSelector('#sheet', { state: 'hidden' });
  await page.goto(`${BASE}/#/t/big-hop-2027/plan/full`); await page.waitForSelector('.itin > li.now');
  const now = page.locator('.itin > li.now');
  ok(await now.locator('.stops a.maplink[target=_blank]').count() === 6 && await now.locator('.legs a[href*="/maps/dir/"]').count() === 3 && await now.locator('.picks .pk').count() === 3, "AU today: every stop opens Maps, 3 legs with directions, 3 meal picks");
  const pk = await now.locator('.picks .pk').first().evaluate((e) => ({ w: e.getBoundingClientRect().width, flex: getComputedStyle(e).display }));
  ok(pk.w > 250 && pk.flex !== 'flex', `itinerary: a meal pick card is full width on the phone (${Math.round(pk.w)} px), not squeezed into columns`);
  const hrefs = await page.$$eval('a[href*="google.com/maps"]', (as) => as.map((a) => a.href));
  ok(hrefs.length > 300 && hrefs.every((h) => { const u = new URL(h), q = u.searchParams.get('query') || u.searchParams.get('destination'); return q && q.length > 3 && !/undefined|null/.test(q); }), `every Google Maps link has a full query (${hrefs.length})`);
  await page.goto(`${BASE}/#/t/big-hop-2027/sos/full`); await page.waitForSelector('#pocket');
  ok(await page.locator('#pocket details.pg').count() >= 3 && await page.locator('table.ift').count() === 2 && await s.noHScroll(), 'emergency page: numbers, tonight\'s address, if-then + mishaps; fits the phone');
  ok(await page.locator('#pocket .ecard .emerg li.main a[href="tel:000"]').count() === 1 && await page.locator('#pocket .ecard .enights li').count() === 8 && await page.locator('#pocket .ecard .elost').count() === 1, 'emergency card like the manual: 000 first, every night\'s address (8 stays), the lost-child line');
  await page.goto(`${BASE}/#/t/big-hop-2027/prep/full`); await page.waitForSelector('#pocket');
  ok(await page.locator('#pocket details.pg').count() >= 6 && (await page.textContent('#pocket')).includes('Biosecurity'), 'get-ready page: packing, prices, visa, biosecurity, the van, drive legs, crowds, book-ahead');
  // HK: the manual's other chapters (info.more) land on the page they name, tables scroll inside their box
  await page.goto(`${BASE}/#/t/hk-macau-2026/prep/full`); await page.waitForSelector('#pocket');
  ok(await page.locator('#pocket details.pg').count() >= 18 && /Disneyland minute by minute/.test(await page.textContent('#pocket')) && await page.locator('#pocket table.prices').count() >= 4 && await s.noHScroll(), 'HK get-ready page: the manual\'s chapters (getting around, customs, Disneyland plan) render and fit the phone');
  await s.shot('02c-hk-prep', false);
  await page.evaluate(() => document.querySelectorAll('#pocket details.pg').forEach((d) => (d.open = true)));
  const ck = page.locator('#pocket .chk input').first(); await ck.check(); await page.evaluate(() => render());
  ok(await page.locator('#pocket .chk input').count() >= 20 && await page.locator('#pocket .chk input').first().isChecked() && await s.noHScroll(), 'get-ready page: packing and visa as tickable checklists; a tick survives a re-render (kept on this phone)');
  await page.goto(`${BASE}/#/t/hk-macau-2026/sos/full`); await page.waitForSelector('#pocket');
  ok(/Taxi card/.test(await page.textContent('#pocket')) && await page.locator('#pocket table.ift').count() === 1 && await s.noHScroll(), 'HK emergency page: if-then table and the Chinese taxi card');
  await page.goto(`${BASE}/#/t/big-hop-2027/learn/full`); await page.waitForSelector('#pocket');
  ok(await page.locator('#pocket details.sub:not(.tale)').count() === 16 && await page.locator('#pocket .qa').count() === 48 && await page.locator('#pocket details.tale .talebtn[data-a="saytale"]').count() === 16 && await page.locator('#pocket details.tale .scenes li').count() >= 48, 'learn page: a fold per day with its cards, quiz questions and the guide’s story (a picture book of scenes)');
  await page.evaluate(() => { const d = document.querySelector('#pocket details.sub:not(.tale)'); d.open = true; d.querySelector('details.tale').open = true; });
  await page.locator('#pocket details.tale .talebtn').first().click();
  const on = await page.evaluate(() => { const b = document.querySelector('#pocket .talebtn'); return b.classList.contains('on') && !!b.closest('.tale').querySelector('.scenes li.now'); });
  await page.locator('#pocket details.tale .talebtn').first().click();
  ok(on && await page.evaluate(() => !document.querySelector('.talebtn.on, .scenes li.now')), 'the guide’s story: Listen lights up the scene being read; a second tap stops');
  ok(await page.evaluate(() => !/&#\d|&amp;/.test(document.querySelector('#pocket').textContent) && /Cook's/.test(document.querySelector('#pocket').textContent)), 'the guide’s story: apostrophes read as apostrophes (numbers are highlighted before escaping)');
  await s.shot('02b-learn', false);
  await page.goto(`${BASE}/#/t/hk-macau-2026/learn/full`); await page.waitForSelector('#pocket');
  ok(await page.locator('#pocket details.sub').count() === 6 && await page.locator('#pocket .qa').count() === 18 && /Animals and characters we may meet/.test(await page.textContent('#pocket')) && /Mickey Mouse/.test(await page.textContent('#pocket')) && await s.noHScroll(), 'HK learn page: six days of cards + quiz, animals and Disney characters');
  await s.shot('02d-hk-learn', false);
  await page.goto(`${BASE}/#/t/big-hop-2027/sos/full`); await page.waitForSelector('#pocket');
  ok((await page.textContent('#pocket .emerg li.main')).includes('000') && await page.locator('#pocket .emerg a[href="tel:000"]').count() === 1, 'pocket guide: 000 is a tap-to-call link');
  await page.locator('#pocket').screenshot({ path: path.join(OUT, 'au-02-pocket.png') });
  ok(await s.noHScroll(), 'AU book with the pocket guide fits the phone');
  await page.goto(`${BASE}/#/passport/mimi/big-hop-2027`); await page.waitForSelector('#m1');
  ok(await page.locator('#m1 .says li').count() >= 4 && await page.locator('#m1 .mquiz .qa').count() === 3, 'passport mission: the guide tells the facts + one line per stop; Kiki asks 3 quiz questions');
  await page.locator('#m1 .qa summary').first().click();
  ok(await page.locator('#m1 .qa[open] p').count() === 1, 'passport quiz: tap reveals the answer');
  ok(await page.locator('#pl-words .sayrow .hearbtn[data-lang="en-AU"]').count() === 8, 'passport: 8 Aussie words with an en-AU 🔊');
  await page.click('.kidgo'); await page.waitForSelector('.kidtiles');
  ok(await page.locator('.kidtiles button[data-v$="/quiz"]').count() === 1 && await page.locator('.kidtiles button[data-v$="/words"]').count() === 1, 'kid mode (AU): quiz + say-it tiles');
  await page.click('.kidtiles button[data-v$="/quiz"]'); await page.waitForSelector('.qcard');
  await page.locator('.qcard').first().click();
  ok(await page.locator('.qcard[aria-pressed=true] .ans:not([hidden])').count() === 1 && (await page.evaluate(() => window.__said)).some((x) => /kites/i.test(x)), 'kid quiz: tapping a card shows and says the answer');
  await s.shot('03-kid-quiz', false);
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/words"]'); await page.waitForSelector('.kw .hear');
  await page.locator('.kw .hear').first().click();
  ok((await page.evaluate(() => window.__said)).includes("G'day|en-AU"), 'say it (AU): "G\'day" read with an Australian voice');
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/animals"]'); await page.waitForSelector('.animals .an');
  ok(await page.locator('.animals .an').count() === 10, 'animals (AU): the 10 animals from the guide as big cards');
  await page.locator('.animals .hear').first().click();
  ok((await page.evaluate(() => window.__said)).some((x) => /^Kangaroo\./.test(x)), 'animals: tapping one says its name and its fact');
  await page.locator('.animals .seen').first().click(); await page.waitForSelector('.animals .an.on');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 10000 });
  ok((await apiState(page)).entries.some((e) => e.id === 'big-hop-2027.tick.wild.0.mimi'), 'animals: "spotted" is a tick, saved');
  // all places to eat: the manual's "Where to eat", searchable, every card opens Maps
  await page.evaluate(() => localStorage.removeItem('mbs_kidmode'));   // a grown-up leaves kid mode
  await page.goto(`${BASE}/#/t/big-hop-2027/eat/all`); await page.waitForSelector('.eatc');
  ok(await page.locator('.eatc').count() === 294 && await page.locator('nav.bar a[aria-current=page][href$="/eat"] i svg.ic').count() === 1, 'eat page: 294 places from the manual, tab highlighted');
  ok(await page.locator('.eatc a[href*="google.com/maps/search"]').count() === 588 && await page.locator('.eatc a[href*="maps/dir/"]').count() === 294, 'eat page: every place has a map link (name + button) and directions');
  await page.fill('#eatq', 'pie');
  const pies = await page.$$eval('.eatc', (els) => els.filter((e) => e.dataset.s.includes('pie')).length), shownPies = await page.locator('.eatc:visible').count();
  ok(shownPies === pies && pies > 10 && pies < 294 && await page.evaluate(() => document.activeElement.id) === 'eatq', `eat page: search filters in place and keeps the keyboard (${shownPies} pies)`);
  await page.fill('#eatq', ''); await page.click('[data-a="eatk"][data-v="2"]');
  ok(await page.locator('.eatc:visible').count() === 30, 'eat page: "cook it yourself" chip');
  await page.click('[data-a="eatk"][data-v="-1"]'); await page.click('[data-a="eatpick"]');
  ok(await page.locator('.eatc:visible').count() === 61 && (await page.textContent('#eatn')).includes('61'), 'eat page: picks in the plan');
  ok(await s.noHScroll(), 'eat page fits the phone');
  await s.shot('04-eat', false);
  await page.goto(`${BASE}/#/t/big-hop-2027/eat/d/0`); await page.waitForSelector('.eatday');
  ok(await page.locator('.daytabs a').count() === 16 && await page.locator('.emeal').count() === 1 && /Adina kitchen/.test(await page.locator('.emeal').first().textContent()), 'AU eat page: Day 1 dinner is the Adina kitchen or delivery');
  await page.goto(`${BASE}/#/t/big-hop-2027/eat/d/2`); await page.waitForSelector('.eatday .emeal');
  ok(await page.locator('.emeal').count() === 4 && await page.locator('.emeal .ealso .erow').count() > 3 && /Jervis Bay/.test(await page.locator('.enears').textContent()), 'AU eat page, Day 3: four meals, more places that fit each meal, and what is near Jervis Bay');
  ok(await page.locator('.enear .ek').count() === await page.locator('.enear').count() && /Cook it yourself/.test(await page.locator('.enears').textContent()), 'AU eat page: each nearby area says what kind of places it holds (same town, cafés vs cooking)');
  ok(await s.noHScroll(), 'eat day page fits the phone');
  await s.shot('04-eat-day', false);
  await page.goto(`${BASE}/#/t/hk-macau-2026/eat/all`); await page.waitForSelector('.eatc');
  ok(await page.locator('.eatc:visible').count() === 223 && await page.locator('[data-a="eatpick"][aria-pressed="false"]').count() === 1 && await page.locator('.eatc .zh').count() > 150, 'eat page (HK): 223 places from the manual with Chinese names; filters reset for another book');
  ok(s.errs.length === 0, 'AU: no console errors ' + s.errs.join(' | '));
  await s.ctx.close();
}

// kid mode + bedtime player on a desktop, dark
{
  const s = await session('kid-wide', { width: 1440, height: 900, scheme: 'dark' });
  const { page } = s;
  await page.clock.setFixedTime(new Date('2026-12-07T19:30:00+08:00'));
  await login(page);
  await page.goto(`${BASE}/#/kid/mika`); await page.waitForSelector('.kidtiles');
  ok(await s.noHScroll(), 'kid mode on a wide screen: no horizontal scroll');
  await s.shot('01-kid-home', false);
  await page.click('.kidtiles .night'); await page.waitForSelector('#bedtime .bttext');
  await s.shot('02-bedtime', false);
  await page.keyboard.press('Escape');
  await page.click('.kidtiles button[data-v$="/draw"]'); await page.waitForSelector('#kidcanvas');
  await s.shot('03-draw', false);
  await page.click('.kidback'); await page.click('.kidtiles button[data-v$="/map"]'); await page.waitForSelector('.tmap .walkers');
  ok(await s.noHScroll(), 'map on a wide screen: no horizontal scroll');
  await s.shot('04-map', false);
  ok(s.errs.length === 0, 'kid wide: no console errors ' + s.errs.join(' | '));
  await s.ctx.close();
}
await browser.close();
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
