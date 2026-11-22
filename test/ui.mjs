// End-to-end UI test (Playwright) for the bookshelf PWA. Run via `npm test`. Screenshots → $SHOTS (default /tmp/mb-shots).
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { todayLost } from './today-lost.mjs';

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
async function session(name, { width = 390, height = 844, scheme = 'light', logall = true, motion = false } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, colorScheme: scheme, reducedMotion: motion ? 'no-preference' : 'reduce' });   // stable screenshots
  if (logall) await ctx.addInitScript(() => localStorage.setItem('mbs_logall', '1'));   // the record page's "more" fold stays open (the parents' own "keep open" switch), so every box is on the page for the checks below
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/401|favicon|ERR_INTERNET_DISCONNECTED|Failed to fetch|Failed to load resource/.test(m.text())) errs.push(m.text()); });
  const shot = (n, full = true) => page.screenshot({ path: path.join(OUT, `${name}-${n}.png`), fullPage: full });
  const noHScroll = () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
  return { ctx, page, errs, shot, noHScroll };
}
// WCAG contrast, run in the page: (elements, el → the element whose background is the ground) → { worst, n }
const CONTRAST = `function (els, groundOf) {
  const rgb = (c) => { const m = c.match(/[\\d.]+/g).map(Number); return /^color\\(/.test(c) ? m.slice(0, 3).map((v) => v * 255) : m.slice(0, 3); };
  const lum = (c) => rgb(c).map((v) => v / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
  let worst = Infinity, n = 0;
  for (const el of els) { const a = lum(getComputedStyle(el).color), b = lum(getComputedStyle(groundOf(el)).backgroundColor); worst = Math.min(worst, (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)); n++; }
  return { worst, n };
}`;
async function login(page) {
  await page.goto(BASE + '/');
  await page.waitForSelector('#lf');
  await page.fill('#lname', 'แม่'); await page.fill('#lcode', CODE); await page.keyboard.press('Enter');   // the name first: the pad auto-submits at the last digit; Enter, never a click on the button (the shelf can render under the click, which then lands on a book)
  await page.waitForSelector('.shelf');
}
// the page re-renders after each sync; measure again if the element was just swapped
// the kids' passport is a book shown a page at a time (#/passport/<kid>/<trip>/<page>): open one page and wait for it
const ppOpen = async (page, kid, tid, key) => { await page.goto(`${BASE}/#/passport/${kid}/${tid}/${key}`); await page.waitForSelector(`.ppbook[data-page="${key}"][data-trip="${tid}"][data-kid="${kid}"]`); };   // the trip too: the same page of another book is still on screen for a moment
// the passport's ✏️ (a parent opens its boxes and ticks): switch it to the state asked for
const ppEdit = async (page, on) => { const b = page.locator('.ppedit'); if (await b.count() && (await b.getAttribute('aria-pressed')) !== String(on)) { await b.click(); await page.waitForSelector(`.ppedit[aria-pressed="${on}"]`); } };
const boxOf = async (page, sel) => { for (let k = 0; k < 30; k++) { const b = await page.locator(sel).first().boundingBox().catch(() => null); if (b) return b; await page.waitForTimeout(100); } throw new Error('no box: ' + sel); };
const apiState = (page) => page.evaluate(async () => (await fetch('/api/b/state')).json());
const T = 'hk-macau-2026';

// ---------- editor on a phone ----------
{
  const s = await session('phone');
  const { page } = s;
  await page.goto(BASE + '/'); await page.waitForSelector('#lf');
  await s.shot('01-login', false);
  await page.fill('#lcode', 'wrong'); await page.keyboard.press('Enter');
  await page.waitForFunction(() => document.querySelector('#lerr').textContent.length > 0);
  ok(true, 'wrong code shows an error');
  ok(await page.inputValue('#lcode') === '', 'wrong PIN clears the field');
  ok(JSON.stringify((await (await fetch(BASE + '/api/brand')).json()).pin) === JSON.stringify({ lens: [CODE.length], open: false }), 'the brand says only how long a code is (never a digit)');
  await page.click('button[data-a="who-login"][data-v="Mum"]');   // who first: the pad signs in by itself at the last digit
  ok(await page.locator('.pinpad button img[src^="/art/keypad/"]').count() === 12 && await page.evaluate(async () => (await Promise.all([...document.querySelectorAll('.pinpad img')].map((i) => fetch(i.src).then((r) => r.ok)))).every(Boolean))
    && await page.locator('.pinpad button[data-v="7"][aria-label="7"]').count() === 1, 'sign-in pad: the owner\'s twelve glossy keys, each named for a screen reader');
  ok(await page.locator('.lwho .chip.who img[src$="/art/hub/dad.webp"]').count() === 1 && await page.locator('.lwho .chip.who img[src$="/art/hub/mum.webp"]').count() === 1
    && await page.evaluate(() => [...document.querySelectorAll('.lwho .chip.who')].every((c) => c.getBoundingClientRect().height >= 44) && document.querySelector('#lname').getBoundingClientRect().width >= 80),
    'sign-in: the dad and mum chips carry their faces, 44 px tall, and the other-name box keeps its room');
  for (const d of CODE.slice(0, -1)) await page.click(`.pinpad button[data-v="${d}"]`);   // tap the PIN on the number pad
  await page.click('.pinpad button[data-v="back"]'); await page.click(`.pinpad button[data-v="${CODE.at(-2)}"]`);
  ok(await page.inputValue('#lcode') === CODE.slice(0, -1), 'number pad types the PIN (⌫ works); one digit short, nothing happens yet');
  await page.click(`.pinpad button[data-v="${CODE.at(-1)}"]`);   // the last digit: in without a button
  await page.waitForSelector('.shelf');
  ok(true, 'the last digit signs in by itself');
  ok(await page.evaluate(() => { const a = document.querySelector('.remind.ask'), h = document.querySelector('.hero'); return !!a && !!a.querySelector('[data-a="remind"]') && (!h || a.getBoundingClientRect().top < h.getBoundingClientRect().top); }), 'after signing in: reminders are offered first thing on the shelf');
  await page.click('.remind.ask [data-a="remindlater"]');
  ok(await page.locator('.remind.ask').count() === 0 && await page.evaluate(() => ls('remindLater') === 1), '"later" puts the offer away on this phone');
  ok(await page.evaluate(async () => (await (await fetch('/api/b/state')).json()).me.name) === 'Mum', 'who-is-this chip used as the name (optional)');
  ok(await page.locator('.spine:not(.add)').count() === 2 && await page.locator('.spine.add').count() === 1, 'shelf: 2 books + new book');
  const pdfOn = await page.evaluate(() => !!S.features.story);
  ok(await page.locator('.spine.add [data-a="newtrip"]').count() === 1 && await page.locator('.spine.add a[href="#/import"]').count() === (pdfOn ? 1 : 0) && await page.locator('a[href="#/import"]:not(.addway)').count() === 0
    && await page.locator('.setlist a[href="#/family"]').count() === 1 && await page.locator('.setlist a[href="#/viewers"]').count() === 1 && await page.locator('.setout [data-a="logout"]').count() === 1,
    'shelf: every way to a new book sits in the new-book tile; family and relatives in one settings list; sign out on its own');
  ok(await page.locator('.setlist > a .e.pic img').count() === await page.locator('.setlist > a').count() && await page.locator('.setlist a[href="#/family"] img[src$="/art/hub/family.webp"]').count() === 1
    && await page.locator('.setlist a[href="#/viewers"] img[src$="/art/hub/relatives.webp"]').count() === 1, 'settings list: each row has its own picture (family, emoji, relatives)');
  { // how to use the app (#/help): a card on the shelf for everyone, a card a job, the topics jump to their card
    ok(await page.locator('a.helpcard[href="#/help"]').count() === 1, 'shelf: a card for the guide');
    await page.goto(`${BASE}/#/help`); await page.waitForSelector('.helppg .helpc');
    const hp = await page.evaluate(() => ({ cards: document.querySelectorAll('.helpc').length, toc: document.querySelectorAll('.helptoc [data-a="jump"]').length, tag: document.querySelectorAll('.helpc .hwho').length, sx: document.documentElement.scrollWidth > innerWidth + 1 }));
    await page.click('.helptoc [data-v="#help-kid"]'); await page.waitForTimeout(300);
    const top = await page.evaluate(() => Math.round(document.querySelector('#help-kid').getBoundingClientRect().top));
    ok(hp.cards === 11 && hp.toc === 11 && hp.tag >= 4 && !hp.sx && top >= 0 && top < 200, `guide: eleven topics, the parents' jobs tagged, a topic chip jumps to its card (${JSON.stringify({ ...hp, top })})`);
    await page.goto(`${BASE}/#/`); await page.waitForSelector('.shelf'); }
  { // owner, Nov 2026: four rows wore the same gear — every settings row, shelf card and new-book way has a picture of its own
    const pics = await page.$$eval('.setlist:not(.disp) > a .e.pic img', (xs) => xs.map((x) => x.getAttribute('src')));
    const cards = await page.$$eval('a.nbcard .emb', (xs) => xs.map((x) => !!x.querySelector('img')));
    const ways = await page.$$eval('.spine.add .addway', (xs) => xs.map((x) => !!x.querySelector('.e.pic img')));
    ok(pics.length >= 4 && new Set(pics).size === pics.length && cards.length && cards.every(Boolean) && ways.length && ways.every(Boolean), `shelf: pictures of their own (settings ${pics.join(', ')} · cards ${cards} · ways ${ways})`); }
  ok((await page.locator('.spine').first().textContent()).includes('DOLPHIN'), 'HK spine shows the manual kicker');
  ok(await s.noHScroll(), 'shelf: no horizontal scroll at 390 px');
  await s.shot('02-shelf');
  { // the app asks for the lite state; on the next open it shows its own copy at once and the server answers 304, no guide text again
    const seen = []; const on = (r) => { const u = r.url(); if (/\/api\/b\/(state|seed)/.test(u)) seen.push(`${r.status()} ${u.replace(BASE, '')}`); };
    page.on('response', on);
    await page.reload(); await page.waitForSelector('.shelf'); await page.waitForTimeout(400);
    page.off('response', on);
    ok(seen.some((x) => /^304 \/api\/b\/state\?lite=1$/.test(x)) && !seen.some((x) => /seed/.test(x)), `reopen: the state comes back 304 and no seed is fetched again (${seen.join(' · ')})`);
    ok(await page.evaluate(() => S.trips.every((t) => t.info && t.passport && t.days.every((d) => 'plan' in d))), 'the app holds every book’s guide text (merged from its seeds)');
  }

  await page.click(`.spine[href="#/t/${T}"]`); await page.waitForSelector('.hubgrid');
  // the book opens on its menu: a tile per topic, today first, the detail one tap away
  ok(await page.locator('.hubgrid .tile').count() >= 8 && await page.locator('.hubgrid .tile.today').count() === 1 && /อีก|to go/.test(await page.textContent('.tile.today')), 'book menu: topic tiles, today on top with the countdown');
  // the tiles sit in three named groups; before the trip "get ready" leads, and every tile is in exactly one group
  ok(await page.locator('.hubpart').count() === 3 && /ready|เตรียม/.test(await page.locator('.hubpart').first().textContent()) && await page.locator('.hubpart + .hubgrid').count() === 3 && await page.locator('.hubgrid.lead .tile').count() === 1, 'book menu: three named groups, "get ready" first before the trip');
  { // a fresh phone: the record page shows tonight's three (photos, words, moods) and "day done", the rest folded under "more"
    const f = await session('fold', { logall: false }); await login(f.page);
    // a page a step (owner: "หน้า record ยาวมากเลย … แบบมีหลายหน้า"): the day's overview is tiles, a tile opens its step alone,
    // the step dots and next lead on, the whole day stays one link away
    await f.page.goto(`${BASE}/#/t/${T}/log/0`); await f.page.waitForSelector('.lgtiles');
    const ov = await f.page.evaluate(() => ({ tiles: document.querySelectorAll('.lgtile').length, blocks: document.querySelectorAll('.blk:not(.planblk)').length, all: !!document.querySelector('.lgallgo a[href$="/log/0/all"]'), h: document.documentElement.scrollHeight, small: [...document.querySelectorAll('.lgtile, .lgallgo a')].filter((e) => e.getBoundingClientRect().height < 44).length }));
    await f.page.click('.lgtile[href$="/log/0/words"]'); await f.page.waitForSelector('.lgstep[data-step="words"] #qtext');
    const st = await f.page.evaluate(() => ({ dots: document.querySelectorAll('.lgqs .plqd').length, now: (document.querySelector('.lgqs .plqd.now') || {}).textContent, photos: !!document.querySelector('#lgphotos'), strip: [...document.querySelectorAll('.daystrip a')].every((a) => /\/words$/.test(a.getAttribute('href'))) }));
    await f.page.click('.plnav .plnext'); await f.page.waitForSelector('.lgstep[data-step="feel"] #lgmood');
    ok(ov.tiles >= 6 && ov.blocks === 0 && ov.all && !ov.small && st.dots === ov.tiles && /2/.test(st.now) && !st.photos && st.strip,
      `record page, a page a step: ${ov.tiles} tiles and no long blocks on the overview (${ov.h} px), the words step alone with its dots, the day strip keeps the step, next goes on to the mood (${JSON.stringify({ ov, st })})`);
    await f.page.goto(`${BASE}/#/t/${T}/log/0/all`); await f.page.waitForSelector('details.more');
    const y = (q) => f.page.evaluate((q) => document.querySelector(q).getBoundingClientRect().top, q);
    ok(await f.page.locator('details.planblk:not([open])').count() === 1 && (await y('#lgphotos')) - (await y('.logprog')) < 140, `record page: with the plan folded, the photo box sits right under the strip (${(await y('#lgphotos')) - (await y('.logprog'))} px)`);
    ok(!(await f.page.locator('details.more').evaluate((d) => d.open)) && (await y('#qtext')) < (await y('[data-a="done"]')) && (await y('[data-a="done"]')) < (await y('details.more')) && !(await f.page.locator('#favtext').isVisible()), 'record page: quotes → mood → day done above the fold; favourite/note/firsts folded on a fresh day');
    await f.page.click('details.more .linkbtn[data-a="logall"]'); await f.page.waitForSelector('#favtext');
    ok(await f.page.locator('#favtext').isVisible() && await f.page.evaluate(() => localStorage.getItem('mbs_logall') === '1'), 'record page: "keep open" shows every box and is remembered on this phone');
    await f.ctx.close();
  }
  ok(await page.locator('.tile[href$="/eat"], .tile[href*="/log/"], .tile[href$="/firsts"]').count() === 0 && await page.locator('nav.bar a[href$="/eat"]').count() === 1 && await page.locator('.tile[href$="/sos"]').count() === 1 && await page.locator('.tile[href$="/stays"]').count() === 1 && await page.locator('.tile.kid, .tile.shelfgo, .tile.t-offline').count() === 0
    && await page.locator('.hubrow.t-offline[href$="/offline"]').count() === 1 && await page.locator('.hubrows .hubrow.shelfgo[href="#/"]').count() === 1 && await page.$$eval('.hubrow', (rs) => rs.every((r) => r.getBoundingClientRect().height >= 44)),
    'book menu: emergency and stays tiles, nothing the bar already carries (record, eat, kid mode) and no firsts tile; keeping the book on the phone and the bookshelf are rows of their own, kid mode lives on the bar only');
  ok(await page.evaluate(() => [...document.querySelectorAll('.hubgrid .tile')].every((t) => t.scrollHeight <= t.clientHeight + 1)), 'book menu: no tile clips its text (the kid-mode button grows like the link tiles)');
  ok(await page.evaluate(() => [...document.querySelectorAll('.hubgrid .tile')].every((t) => getComputedStyle(t).marginTop === '0px' && getComputedStyle(t).marginBottom === '0px')), 'book menu: no tile carries its own margin, so a row lines up (the bookshelf tile used to pick up the shelf page’s 22 px)');
  ok(await page.locator('nav.bar .in > *').count() === 5 && await page.locator('nav.bar a[aria-current=page][href$="/hk-macau-2026"] i.pic img').count() === 1 && await page.locator('nav.bar .in > * i.pic img').count() === 5 && (await page.locator('nav.bar .in > *').first().boundingBox()).height >= 60, 'quick bar: five big stops with their pictures, menu highlighted');
  await page.click('.tile[href$="/today"]'); await page.waitForSelector('.day.today');
  ok(await page.locator('details.dmore:not([open])').count() === 1 && await page.locator('details.bag:not([open])').count() === 1 && await page.locator('.call.info.pre').count() === 1 && await page.locator('.call.info.pre a, .call.info.pre button').count() === 0 && await page.locator('.mission').count() === 0 && await page.evaluate(() => document.documentElement.scrollHeight < 1700), `today before the trip: the countdown (no buttons that repeat the menu), the timeline, the rest of the day and the bag each folded to one line, no kids’ mission yet (${await page.evaluate(() => document.documentElement.scrollHeight)} px)`);
  await page.evaluate(() => { document.querySelector('details.dmore').open = true; });
  ok(await page.evaluate(() => { const rows = [...document.querySelectorAll('.cbox .dsheet>div')]; return rows.length > 0 && rows.every((r) => r.querySelector('dt').getBoundingClientRect().width <= r.getBoundingClientRect().width * 0.36); }), 'today: in the answer boxes the label column stays narrow and the answer gets the room');
  ok(await page.locator('.daystrip a').count() === 6 && await page.locator('.call.info').count() === 1 && await page.locator('.dsheet > div').count() >= 2 && await page.locator('.cbox.c-ind .dlegs > li').count() >= 3 && await page.locator('.tl.plan.brief li').count() >= 4 && await page.locator('.reportbtn').count() === 0 && await page.locator('.dayseg button[data-a="dayfull"]').count() === 2 && await page.locator('.dayseg button[data-v="0"][aria-pressed=true]').count() === 1 && await page.locator('.top .ttl small', { hasText: /วันนี้|Today/ }).count() === 1, "today page: day strip, countdown banner, day 1 at a glance (short timeline + answer cards), the short · full switch in place of a second page, topic named in the top bar");
  await page.click('.daystrip a[href$="/today/3"]'); await page.waitForSelector('.daystrip a[aria-current=true][href$="/today/3"]');
  ok((await page.textContent('.day.today h3')).includes('Senado') || (await page.textContent('.day.today h3')).includes('แสง'), 'today page: the strip switches days');
  await page.click('.top .ibtn'); await page.waitForSelector('.hubgrid');
  ok(true, 'back arrow inside a topic returns to the menu');
  await page.click('.tile[href$="/book"]'); await page.waitForSelector('.cover');
  ok(await page.locator('.cover .stamp.pending').count() === 1, 'stamp is dashed until earned');
  ok(await page.locator('.fact').count() === 0, 'cover: an empty book shows no counts (never a row of zeros)');
  ok(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim().toUpperCase()) === '#1F3A5F', 'book uses the HK navy theme');
  ok(await page.evaluate(() => getComputedStyle(document.querySelector('.cover h1')).fontFamily.includes('Cormorant')), 'HK title in Cormorant Garamond (as in the manual)');

  // record day 2
  await page.goto(`${BASE}/#/t/${T}/log/1/all`); await page.waitForSelector('.daystrip');
  // the strip under the date: tonight's three, ✓ where the day holds something, ○ where it is still empty; a tap jumps to that box
  ok(await page.evaluate(() => { const cs = [...document.querySelectorAll('.logprog .lpc')], es = entriesOf('hk-macau-2026', 1);
    const want = { '#lgphotos': mediaOf('hk-macau-2026', 1).length > 0, '#lgquotes': es.some((e) => e.kind === 'quote'), '#lgmood': es.some((e) => e.kind === 'mood' && e.mood) };
    return cs.length === 3 && cs.every((c) => document.querySelector(c.dataset.v) && c.classList.contains('on') === want[c.dataset.v] && c.querySelector('i').textContent === (want[c.dataset.v] ? '✓' : '○')); }), 'record page: the strip under the date says which of photos · words · mood the day already holds');
  await page.click('.logprog .lpc[data-v="#lgmood"]'); await page.waitForFunction(() => Math.abs(document.querySelector('#lgmood').getBoundingClientRect().top) < 140);
  ok(true, 'record page: a tap on the strip scrolls to that box');
  await page.goto(`${BASE}/#/t/${T}/log/1/all`); await page.waitForSelector('.daystrip');
  ok(await page.locator('.daystrip a').count() === 6, 'day strip shows 6 days');
  await page.fill('#qtext', 'ปลาอยู่ในน้ำเหมือนหนูเลย');
  await page.click('button[data-a="who"][data-v="mika"]');
  ok(await page.inputValue('#qtext') === 'ปลาอยู่ในน้ำเหมือนหนูเลย', 'typed quote survives switching speaker');
  // the emoji library: the button beside the box opens the grid, the one tapped goes in at the cursor, the box keeps the focus
  await page.click('[data-a="emopick"][data-for="qtext"]'); await page.waitForSelector('#emopop');
  ok(await page.locator('#emopop [data-a="emoput"]').count() === 71 && await page.locator('#emopop img.emi').count() === 71, 'emoji library: 71 pictures in the grid');
  await page.click('#emopop [data-a="emoput"][data-v="😍"]');
  ok(await page.inputValue('#qtext') === 'ปลาอยู่ในน้ำเหมือนหนูเลย😍' && await page.evaluate(() => document.activeElement.id) === 'qtext' && await page.locator('#emopop').count() === 0, 'emoji library: the pick goes in the box, the box keeps the focus, the grid closes');
  await page.fill('#qtext', 'ปลาอยู่ในน้ำเหมือนหนูเลย');
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
  await page.fill('#notetext', 'มีมี่ไม่กลัวเครื่องเล่นเลย'); await page.click('[data-a="emopick"][data-for="notetext"]'); await page.click('#emopop [data-a="emoput"][data-v="👍"]'); await page.locator('#notetext').blur();
  await page.waitForFunction(() => S.entries.some((e) => e.kind === 'note' && e.text === 'มีมี่ไม่กลัวเครื่องเล่นเลย👍'), null, { timeout: 5000 }).catch(() => {});
  ok(await page.evaluate(() => S.entries.some((e) => e.kind === 'note' && e.text === 'มีมี่ไม่กลัวเครื่องเล่นเลย👍')), 'emoji library: a box that saves when left saves the emoji too');
  await page.click('button[data-a="first"][data-v="mickey"][data-k="mimi"]');
  await page.click('button[data-a="place"][data-v="Hong Kong Disneyland"]');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  // a first belongs to its own day: day 3's page shows Mimi met Mickey on day 2 (not ticked there), and a tap there keeps it
  await page.goto(`${BASE}/#/t/${T}/log/2/all`); await page.waitForSelector('button[data-a="first"][data-v="mickey"][data-k="mimi"]');
  const fbtn = page.locator('button[data-a="first"][data-v="mickey"][data-k="mimi"]');
  ok(await fbtn.getAttribute('aria-pressed') === 'false' && /2/.test(await fbtn.locator('.fday').textContent()), 'firsts: another day shows the day it happened, not a tick');
  await fbtn.click(); await page.waitForTimeout(300);
  ok(await page.evaluate(() => S.entries.some((e) => e.kind === 'first' && e.first_key === 'mickey' && e.child === 'mimi' && e.day === 1)), 'firsts: a tap on another day never removes it from its own day');
  await page.goto(`${BASE}/#/t/${T}/log/1/all`); await page.waitForSelector('button[data-a="first"][data-v="mickey"][data-k="mimi"][aria-pressed="true"]');
  // what we actually spent: category + amount + a word → a row and the day's total; the trip total appears underneath
  await page.click('button[data-a="spendcat"][data-v="transport"]');
  await page.fill('#spendamt', '120'); await page.fill('#spendnote', 'แท็กซี่ไปดิสนีย์'); await page.click('button[data-a="addspend"]');
  await page.waitForSelector('.spend .items li');
  ok(await page.locator('.spend .items li', { hasText: 'แท็กซี่ไปดิสนีย์' }).count() === 1 && /120/.test(await page.locator('.spend h3 .label').textContent()) && /120/.test(await page.locator('.spend p.lede').textContent()), 'spend: a row with its note, the day total and the trip total');
  ok(await page.locator('button[data-a="spendcat"] img.emi').count() === 6 && await page.locator('.spend .items li img.emi[src="/art/emoji/taxi.webp"]').count() === 1, 'spend: the categories and the row show the library pictures (🚕 = the taxi)');
  ok(await page.evaluate(() => { const box = document.createElement('div'); box.innerHTML = tagHtml('animals') + bagBlock(trip(location.hash.split('/')[2]), 1); return !!box.querySelector('img.emi[src="/art/emoji/koala.webp"]') && box.querySelectorAll('.bagl img.emi').length === box.querySelectorAll('.bagl li').length; }), 'photo tags and today’s bag draw the library pictures');
  // the forecast adds rows (rain, warm, sun) only within 16 days of a trip, so check every thing the bag can hold, not just today's
  // (21 Nov 2026: the HK book came within the forecast's reach and its rain row ☂️ had no picture)
  { const miss = await page.evaluate(() => BAG.filter((b) => !emoOf(b[1])).map((b) => b[0]));
    ok(!miss.length, `every thing today's bag can hold has a library picture (${miss.join(', ') || 'all'})`); }
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  ok((await page.evaluate(async () => (await (await fetch('/api/b/state', { credentials: 'same-origin' })).json()).spend)).some((x) => x.amount === 120 && x.cur === 'HKD' && x.cat === 'transport'), 'spend: saved on the server in the book’s money (HKD)');
  // food: the day's places in a dropdown (plan picks first, then the route, the bed, the rest) — picking one writes the note; "other" leaves it free
  ok(await page.locator('.spendfood').isHidden(), 'spend: the place dropdown hides while the category is not food');
  await page.click('button[data-a="spendcat"][data-v="food"]');
  const grpLabels = await page.locator('#spendplace optgroup').evaluateAll((gs) => gs.map((g) => g.label));
  const firstPick = await page.locator('#spendplace optgroup:first-of-type option').first().getAttribute('value');
  await page.selectOption('#spendplace', firstPick);
  ok(await page.locator('.spendfood').isVisible() && grpLabels.length >= 2 && /plan/i.test(grpLabels[0]) && firstPick.length > 2 && (await page.inputValue('#spendnote')) === firstPick, `spend: food shows the day's places (${grpLabels.length} groups), picking "${firstPick}" fills the note`);
  await page.fill('#spendamt', '268'); await page.click('button[data-a="addspend"]'); await page.waitForTimeout(300);
  ok(await page.locator('.spend .items li', { hasText: firstPick }).count() === 1, 'spend: a second row for the meal at that place (several places a day are fine)');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  // roughly in baht: the rate is typed on the spending page (kept on the phone); the total updates while typing, the record page shows it too
  await page.goto(`${BASE}/#/t/${T}/spend`); await page.waitForSelector('.fxbox');
  ok(/HKD/.test(await page.textContent('#fxres')) && !/≈/.test(await page.textContent('#fxres')), 'baht: without a rate the page asks for one (no made-up rate)');
  await page.fill('.fxbox input[data-fx="HKD"]', '4.5');
  const fxTxt = await page.textContent('#fxres');
  ok(/≈/.test(fxTxt) && fxTxt.replace(/[^\d]/g, '').includes(String(Math.round((120 + 268) * 4.5))) && await page.evaluate(() => document.activeElement && document.activeElement.dataset.fx === 'HKD'), `baht: typing the rate shows the whole trip ≈ ฿${Math.round(388 * 4.5)} at once, the field keeps the cursor`);
  await page.goto(`${BASE}/#/t/${T}/log/1/all`); await page.waitForSelector('.spend p.lede');
  ok(/≈/.test(await page.textContent('.spend p.lede')) && await page.evaluate(() => (ls('fx') || {}).HKD) === 4.5, 'baht: the record page shows the trip total in baht too; the rate lives on this phone');
  // the home-screen icon shortcuts open today's record page with the box in view
  await page.goto(`${BASE}/#/go/quote`); await page.waitForSelector('#qtext');
  await page.waitForFunction(() => document.activeElement && document.activeElement.id === 'qtext', null, { timeout: 3000 }).catch(() => {});
  ok(/\/log\/\d+\/words$/.test(await page.evaluate(() => location.hash)) && await page.evaluate(() => document.activeElement && document.activeElement.id === 'qtext'), 'shortcut "quote": today\'s record page at its words step, the cursor in the quote box');
  await page.goto(`${BASE}/#/go/photo`); await page.waitForSelector('.golit .btn[data-a="pickphotos"]', { timeout: 3000 }).catch(() => {});
  ok(await page.locator('.golit .btn[data-a="pickphotos"]').count() === 1 && await page.locator('.golit .phstop').count() >= 3, 'shortcut "photo": the photo box is lit up and in view, with the day\'s places under the add button');
  const man = await (await page.request.get(`${BASE}/manifest.webmanifest`)).json();
  ok(man.shortcuts.length === 4 && man.shortcuts.every((s) => s.url.startsWith('/#/go/') && s.name && s.short_name), 'manifest: four icon shortcuts to #/go/…');
  // #/snaptest (docs/SNAP-BOOK.md P0): pick photos → the phone reads when and where on the spot, uploads nothing, shows no position
  {
    const sent = []; const watch = (r) => { if (r.method() !== 'GET') sent.push(r.url()); }; page.on('request', watch);
    await page.goto(`${BASE}/#/snaptest`); await page.waitForSelector('.snappicks');
    const fx = ['gps-ii.jpg', 'gps-mm.jpg', 'time-only.jpg', 'no-exif.jpg', 'gps.avif'].map((f) => path.resolve('test/fixtures/snap', f));
    const [fc] = await Promise.all([page.waitForEvent('filechooser'), page.click('[data-a="snappick"][data-v="photos"]')]);
    await fc.setFiles(fx);
    await page.waitForFunction(() => /Read in/.test(document.querySelector('#snapruns') ? document.querySelector('#snapruns').textContent : ''), null, { timeout: 8000 });
    const tx = await page.evaluate(() => document.querySelector('main').textContent);
    const rows = await page.$$eval('.snapsum:not(.devspeed) li', (ls) => ls.map((l) => l.textContent.replace(/\s+/g, ' ').trim()));
    ok(rows[0].includes('4 · 80%') && rows[2].includes('3 · 60%') && rows[3].endsWith('1'), `photo check: 5 photos → 4 with a time, 3 with a position, 1 HEIF (${rows.join(' | ')})`);
    ok(!/14\.4|101\.3/.test(tx) && await page.evaluate(() => !document.querySelector('#app #snapin-photos') && !!document.querySelector('body > #snapin-photos')), 'photo check: no position on the page; the file input lives outside the redrawn page');
    ok(!sent.some((u) => u.includes('/api/b/media') || u.includes('/api/b/photos')) && await s.noHScroll(), `photo check: nothing uploaded, no sideways scroll (${sent.length} writes)`);
    // the phone check (owner, Nov 2026: "ลองกับมือถือจริง"): the phone's own answers, each picked photo's preview and speed, the hand
    // checks the owner ticks — all in the text they copy; still nothing uploaded
    await page.waitForFunction(() => /A preview inside the file/.test(document.querySelector('#snapruns').textContent) && !document.querySelector('[data-a="devcheck"][disabled]'), null, { timeout: 15000 }).catch(() => {});
    const speed = await page.$$eval('.snapsum.devspeed li', (ls) => ls.map((l) => l.textContent.replace(/\s+/g, ' ').trim()));
    await page.click('[data-a="devcheck"]'); await page.waitForFunction(() => document.querySelectorAll('.devlist li').length >= 8, null, { timeout: 20000 }).catch(() => {});
    const dev = await page.$$eval('.devlist li', (ls) => ls.map((l) => [l.className, l.textContent.replace(/\s+/g, ' ').trim()]));
    await page.click('[data-a="devhand"][data-v="film"]'); await page.click('[data-a="devhand"][data-v="share"]'); await page.click('[data-a="devhand"][data-v="share"]');
    const copied = await page.evaluate(() => snapText());
    ok(speed.length === 4 && /jpeg \d+ · heif \d+/.test(speed[0]) && dev.length >= 8 && dev.some(([c, x]) => c === 'dv-ok' && /File print/.test(x)) && dev.some(([c, x]) => c === 'dv-ok' && /Quick small decodes/.test(x))
      && /✓ The trip film plays/.test(copied) && /✗ "Send to family"/.test(copied) && /File print/.test(copied) && /preview jpeg/.test(copied) && !/14\.4|101\.3/.test(copied),
      `phone check: the phone's own answers, each photo's preview and speed, the hand checks — all in the copied text, no position (${JSON.stringify({ speed, dev: dev.map((d) => d[0] + ' ' + d[1].slice(0, 30)) })})`);
    await s.shot('devcheck');
    ok(!sent.some((u) => u.includes('/api/b/media') || u.includes('/api/b/photos')), 'phone check: still nothing uploaded');
    page.off('request', watch);
  }
  // faces for the best photos (owner, Nov 2026: "เลือกรูปเด่นโดยดูหน้าเด็ก"): the face finder loads on the phone and, of two photos of
  // one afternoon, the one with a face gets the day's star — no photo leaves the phone
  { const sent = []; const watch = (r) => { if (r.method() !== 'GET') sent.push(r.url()); }; page.on('request', watch);
    const b64 = (f) => fs.readFileSync(path.resolve('test/fixtures/snap', f)).toString('base64');
    const r = await page.evaluate(async ([face, lake]) => {
      const mk = (b, n) => new File([Uint8Array.from(atob(b), (c) => c.charCodeAt(0))], n, { type: 'image/jpeg' });
      const list = [mk(lake, 'IMG_0001.jpg'), mk(face, 'IMG_0002.jpg')];
      const metas = [{ at: '2026-12-12T14:00:00', src: 'exif' }, { at: '2026-12-12T15:00:00', src: 'exif' }];
      const found = await faceLook(list[1]), none = await faceLook(list[0]);
      const sc = await snapScreen(list, metas, () => true);
      return { found: found && found.length, none: none && none.length, star: [...sc.star], faces: sc.sift.faces };
    }, [b64('face-made.jpg'), b64('lake-made.jpg')]);
    page.off('request', watch);
    ok(r.found === 1 && r.none === 0 && r.star.length === 1 && r.star[0] === 1 && r.faces === 1 && !sent.length,
      `best photos: the face finder runs on the phone, and of one afternoon's two photos the one with a face is starred; nothing sent (${JSON.stringify(r)})`); }
  // room and phone problems (#/health, server/errors.js): a script error on this phone reaches the parents' list once, with no data in it
  { const errs = []; const w = (r) => { if (r.url().endsWith('/api/b/err')) errs.push(r.postData() || ''); }; page.on('request', w);
    await page.evaluate(() => { for (let k = 0; k < 3; k++) setTimeout(() => { throw new TypeError("Cannot read properties of undefined (reading 'kids') for \"มีมี่ที่ทะเล\""); }, 10); });
    await page.waitForTimeout(800); page.off('request', w);
    for (let k = s.errs.length - 1; k >= 0; k--) if (/reading 'kids'/.test(s.errs[k])) s.errs.splice(k, 1);   // thrown on purpose: not a page error of the app
    await page.goto(`${BASE}/#/`); await page.waitForSelector('.setlist a[href="#/health"]'); await page.click('.setlist a[href="#/health"]');
    await page.waitForFunction(() => document.querySelectorAll('.herrs li').length >= 1 && document.querySelectorAll('.hbars .hbar, .hcard p.muted').length >= 1, null, { timeout: 10000 }).catch(() => {});
    const h = await page.evaluate(() => ({ errs: [...document.querySelectorAll('.herrs li b')].map((b) => b.textContent), page: document.querySelector('main').textContent }));
    await s.shot('health');
    ok(errs.length === 1 && h.errs.some((x) => /reading 'kids'/.test(x)) && !/มีมี่ที่ทะเล/.test(h.page + errs.join()) && /Room the books take/.test(h.page) && await s.noHScroll(),
      `room and phone problems: a script error is sent once (three throws), listed for the parents without the text it carried (${JSON.stringify({ sent: errs.length, h: h.errs })})`);
    await page.click('[data-a="healthclear"]'); await page.click('[data-a="healthclear"]'); await page.waitForFunction(() => /No phone reported/.test(document.querySelector('main').textContent), null, { timeout: 5000 }).catch(() => {});
    ok(/No phone reported/.test(await page.textContent('main')), 'room and phone problems: two taps clear the list'); }
  // the deep list, round three: search every book, the phones signed in, letters for the future, a book kept as one file, the kids telling a photo
  { await page.goto(`${BASE}/#/`); await page.click('.nbcard[href="#/find"]'); await page.waitForSelector('#findq');
    await page.fill('#findq', 'ปลา'); await page.waitForSelector('#findres .sres li, #findres .mosaic', { timeout: 5000 }).catch(() => {});
    const fr = await page.evaluate(() => ({ n: document.querySelectorAll('#findres .sres li').length, txt: (document.querySelector('#findres') || {}).textContent || '' }));
    await s.shot('find');
    ok(fr.n >= 1 && /ปลาอยู่ในน้ำ/.test(fr.txt) && /Words/.test(fr.txt) && await s.noHScroll(), `search every book: the kids' words found across the books, with when and in which book (${fr.n} hits)`);
    await page.fill('#findq', 'ปลาอยู่ในนำ'); await page.waitForTimeout(250);   // a tone mark missed: still found, said to be close
    const fz2 = await page.evaluate(() => ({ n: document.querySelectorAll('#findres .sres li').length, near: !!document.querySelector('#findres .fznear') }));
    ok(fz2.n >= 1 && fz2.near, `search every book: a missed tone mark still finds the words, marked as close (${JSON.stringify(fz2)})`);
    await page.goto(`${BASE}/#/devices`); await page.waitForSelector('.devs li', { timeout: 8000 }).catch(() => {});
    const dv = await page.evaluate(() => ({ me: document.querySelectorAll('.devs li.me').length, n: document.querySelectorAll('.devs li').length, head: !!document.querySelector('.phead .phpic img[src$="devices.webp"]'), cards: document.querySelectorAll('.pcard .pch .pcpic img').length }));
    await s.shot('devices');
    ok(dv.me === 1 && dv.n >= 1 && dv.head && dv.cards === 3 && await s.noHScroll(), `phones signed in: this phone is listed and marked (${JSON.stringify(dv)})`);
    await page.goto(`${BASE}/#/capsules`); await page.waitForSelector('#captext');
    await page.fill('#captext', 'Dear Mimi, the fish were huge.'); await page.fill('#capdate', `${new Date().getFullYear() + 15}-05-01`);
    await page.click('[data-a="capsave"]'); await page.waitForSelector('.caps li [data-a="capseal"]', { timeout: 8000 }).catch(() => {});
    await page.click('.caps li [data-a="capseal"]'); await page.click('.caps li [data-a="capseal"]');
    await page.waitForFunction(() => document.querySelector('.caps li.sealed'), null, { timeout: 8000 }).catch(() => {});
    const cp = await page.evaluate(() => ({ sealed: document.querySelectorAll('.caps li.sealed').length, text: (document.querySelector('.caps') || {}).textContent || '' }));
    await s.shot('capsules');
    // growing up, trip by trip — now the passport's Explorer ID (#/grow redirects there): the height is typed once, in the passport, and the line reads it
    await page.goto(`${BASE}/#/grow/mimi`); await page.waitForSelector('.ppbook[data-page="id"] .growl li');
    const redir = page.url().endsWith('#/passport/mimi/id');
    await ppEdit(page, true);
    await page.fill('.ppf[data-v="height_last"]', '96'); await page.locator('.ppf[data-v="height_last"]').blur();
    const other = (await page.getAttribute('.growl a.grgo', 'href')).split('/')[3];   // the other book's Explorer ID
    await page.click('.growl a.grgo'); await page.waitForSelector(`.ppbook[data-page="id"][data-trip="${other}"] .ppf[data-v="height_first"]`);
    await page.fill('.ppf[data-v="height_first"]', '1.035 ม.'); await page.locator('.ppf[data-v="height_first"]').blur();   // in metres, with the unit: read as 103.5 cm
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 }).catch(() => {});
    const saved = await page.evaluate(() => S.entries.filter((e) => /\.field\.height_(first|last)\.mimi$/.test(e.id)).map((e) => `${e.id.split('.field.')[0]}:${e.first_key}=${e.text}`));
    await ppOpen(page, 'mimi', 'big-hop-2027', 'id');   // drawn again from the saved state
    await page.waitForSelector('.grchart polyline', { timeout: 8000 }).catch(() => {});
    const gr = await page.evaluate(() => ({ saved: [], n: document.querySelectorAll('.growl li').length, art: document.querySelectorAll('.growl .grart img').length, age: document.querySelectorAll('.growl .grchip').length, chart: !!document.querySelector('.grchart polyline'), note: (document.querySelector('.pp-page.grow') || {}).textContent || '', ghinp: document.querySelectorAll('.ghinp').length }));
    await s.shot('grow');
    gr.saved = saved;
    ok(redir && saved.length === 2 && new Set(saved.map((x) => x.split(':')[0])).size === 2 && gr.n >= 2 && gr.art === gr.n && gr.chart && /7\.5|7,5/.test(gr.note) && !gr.ghinp && await s.noHScroll(), `growing up lives in the passport: each book with the character of its time; the heights typed in two books' Explorer IDs draw the line (${JSON.stringify({ redir, ...gr, note: gr.note.slice(-40) })})`);
    // clear both again (an empty box removes the answer): the printed book's checks below expect a passport page of stamps only
    for (const tid of [T, 'big-hop-2027']) { await ppOpen(page, 'mimi', tid, 'id');
      for (const k of ['height_first', 'height_last']) { await page.fill(`.ppf[data-v="${k}"]`, ''); await page.locator(`.ppf[data-v="${k}"]`).blur(); }
      await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 }).catch(() => {}); }
    await page.waitForFunction(() => queue.length === 0 && !S.entries.some((e) => /\.field\.height_(first|last)\.mimi$/.test(e.id)), null, { timeout: 10000 }).catch(() => {});
    ok(await page.evaluate(() => !S.entries.some((e) => /\.field\.height_(first|last)\.mimi$/.test(e.id))), 'Explorer ID: an emptied height box removes the height');
    await ppEdit(page, false);
    await page.goto(`${BASE}/#/`); await page.waitForSelector('.shelf');
    ok(await page.locator('a[href^="#/grow"]').count() === 0 && await page.locator('.ppmini .ppc').count() >= 1, 'shelf: the "Growing up" card is gone — the passport cards are the one door');
    ok(cp.sealed === 1 && !/fish were huge/.test(cp.text) && /🔒/.test(cp.text), `letters for the future: written, sealed with two taps, then only to whom and when shows (${cp.text.replace(/\s+/g, ' ').slice(0, 80)})`);
    const kp = await page.evaluate(() => { const t = trips()[0]; return t ? { keep: viewBook(t).includes('keepbtn'), tell: kidTell(t, { id: 'ph-any-0001', day: 0 }).includes('data-a="kidtell"') } : null; });
    ok(kp && kp.keep && kp.tell, `the book page offers "keep as one file"; the kids' photo viewer offers "tell its story" (${JSON.stringify(kp)})`);
    await page.goto(`${BASE}/#/health`); await page.waitForFunction(() => /Month by month/.test(document.body.textContent) && /Copies and alerts/.test(document.body.textContent), null, { timeout: 8000 }).catch(() => {});
    ok(/Month by month/.test(await page.textContent('main')) && /Copies and alerts/.test(await page.textContent('main')), 'room page: the copies and alerts, and month by month'); }
  // two parents, one text (migration 0032): the other phone changed a quote since this one read it — the sheet shows both, "keep mine" wins
  { const e0 = await page.evaluate(() => { const e = S.entries.find((x) => x.kind === 'quote' && x.text && x.v); return e && { id: e.id, trip: e.trip, day: e.day, child: e.child }; });
    const lg = await fetch(BASE + '/api/login', { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ code: CODE, name: 'พ่อ' }) }), ck2 = lg.headers.get('set-cookie').split(';')[0];
    const other = await fetch(`${BASE}/api/b/entries/${encodeURIComponent(e0.id)}`, { method: 'PUT', headers: { 'x-mb': '1', cookie: ck2, 'content-type': 'application/json' }, body: JSON.stringify({ trip: e0.trip, day: e0.day, kind: 'quote', child: e0.child, text: 'Daddy wrote this one' }) });
    await page.evaluate((id) => { const e = S.entries.find((x) => x.id === id); putEntry(trip(e.trip), { ...e, text: 'Mummy wrote this one' }, id); }, e0.id);
    await page.waitForSelector('#sheet .cflist', { timeout: 10000 }).catch(() => {});
    const sheet = await page.textContent('#sheet').catch(() => '');
    await s.shot('conflict');
    await page.click('[data-a="cfkeep"][data-v="mine"]').catch(() => {});
    await page.waitForFunction(() => queue.length === 0 && !conflicts.length, null, { timeout: 10000 }).catch(() => {});
    const now = (await apiState(page)).entries.find((x) => x.id === e0.id);
    ok(other.ok && /Daddy wrote this one/.test(sheet) && /Mummy wrote this one/.test(sheet) && /พ่อ/.test(sheet) && now.text === 'Mummy wrote this one',
      `two phones: the other parent's change is shown beside this phone's, and "keep this phone's" writes it (${JSON.stringify({ other: other.status, sheet: sheet.replace(/\s+/g, ' ').slice(0, 160), now: now && now.text })})`); }
  // the family map (server/famap.js, views.js viewFamMap): every book's towns on one drawn map; a pin tells where, when and how old
  { await page.goto(`${BASE}/#/`); await page.waitForSelector('.nbcard[href="#/map"]'); await page.click('.nbcard[href="#/map"]');
    await page.waitForFunction(() => document.querySelectorAll('.fmsvg .fmpin').length >= 2 && document.querySelector('.fmland') && document.querySelector('.fmland').getAttribute('d').length > 200, null, { timeout: 15000 }).catch(() => {});
    // the whole map: towns too close to tell apart are one numbered bubble; a tap zooms into them and their names show
    const g0 = await page.evaluate(() => ({ groups: [...document.querySelectorAll('.fmgrp .fmn')].map((x) => +x.textContent), land: (document.querySelector('.fmland') || { getAttribute: () => '' }).getAttribute('d').length, chips: document.querySelectorAll('.fmchips .chip').length }));
    await s.shot('family-map-all');
    for (let k = 0; k < 3 && await page.locator('.fmpin', { hasText: 'Macau' }).count() === 0 && await page.locator('.fmgrp[data-v*="hk-macau"]').count(); k++) await page.locator('.fmgrp[data-v*="hk-macau"]').first().click({ force: true });
    await page.waitForSelector('.fmout', { timeout: 3000 }).catch(() => {});
    const m0 = await page.evaluate(() => ({ pins: document.querySelectorAll('.fmsvg .fmpin').length, names: [...document.querySelectorAll('.fmpin text')].map((x) => x.textContent), out: !!document.querySelector('.fmout') }));
    Object.assign(m0, g0);
    await page.evaluate(() => { S.children.forEach((k, i) => { if (!k.birth_ym) k.birth_ym = ['2023-05', '2025-02'][i] || '2022-01'; }); });   // this test family has no birth months yet
    await page.locator('.fmpin', { hasText: 'Macau' }).first().click({ force: true }); await page.waitForSelector('#fmcard', { timeout: 5000 }).catch(() => {});
    const card = await page.textContent('#fmcard').catch(() => '');
    await s.shot('family-map');
    ok(m0.groups.length >= 1 && m0.groups.every((n) => n >= 2) && m0.out && m0.names.includes('Hong Kong') && m0.names.includes('Macau') && m0.land > 1000 && m0.chips >= 3 && /Macau/.test(card) && /Then: .*Mimi \d/.test(card) && await s.noHScroll(),
      `family map: every book's towns as pins on drawn land; a pin says the town, the book, when, and the children's ages then (${JSON.stringify({ ...m0, card })})`);
    await page.click('.fmout'); await page.click('.fmchips .chip:nth-child(3)');
    await page.waitForFunction(() => /#\/map\/./.test(location.hash) && document.querySelector('.fmsvg'), null, { timeout: 5000 }).catch(() => {}); await page.waitForTimeout(300);
    const one = await page.evaluate(() => { const tid = location.hash.split('/')[2]; return { n: [...document.querySelectorAll('.fmsvg .fmpin:not(.fmgrp)')].length + [...document.querySelectorAll('.fmgrp .fmn')].reduce((s, x) => s + +x.textContent, 0), all: famPins(tid).length, labels: document.querySelectorAll('.fmpin text:not(.fmn)').length }; });
    await s.shot('family-map-book');
    ok(one.n >= 3 && one.n === one.all && one.labels >= 2, `family map: a book's chip fits the map to that book's towns, every town a pin or in a bubble (${JSON.stringify(one)})`);
    const kidLine = await page.evaluate(() => { const p = famPins('').find((x) => x.name.en === 'Macau'); return p ? kidWorldLine(p, 'mimi') : ''; });
    ok(/^We went to Macau when Mimi was \d/.test(kidLine), `family map in kid mode: the line read aloud says where and how old (${kidLine})`); }
  // the year (views.js viewYear): every book of the year as one book, the children as they were on each trip; its PDF and its film
  { await page.goto(`${BASE}/#/`); await page.click('.nbcard[href^="#/year/"]'); await page.waitForSelector('.yrbook section.pg', { timeout: 10000 });
    const yb = await page.evaluate(() => ({ y: location.hash.split('/')[2], pages: document.querySelectorAll('.yrbook section.pg').length, trips: yearTrips(location.hash.split('/')[2]).length, grow: document.querySelectorAll('.ygrow img').length, facts: document.querySelectorAll('.yrnum .fact').length }));
    await s.shot('year');
    ok(yb.pages === yb.trips + 3 && yb.grow >= 2 && yb.facts >= 2 && await s.noHScroll(), `the year: a cover, the numbers with the children on each trip, a page per book and an end (${JSON.stringify(yb)})`);
    const pdf = await page.evaluate(async (y) => { const r = await fetch(`/api/b/pdf-year/${y}`); const b = new Uint8Array(await r.arrayBuffer()); return { s: r.status, t: r.headers.get('content-type'), head: String.fromCharCode(...b.slice(0, 5)), n: b.length }; }, yb.y);
    ok(pdf.s === 200 && pdf.t === 'application/pdf' && pdf.head === '%PDF-' && pdf.n > 20000, `the year: its book prints as one PDF (${JSON.stringify(pdf)})`);
    const fr = await page.evaluate(async (y) => (await fetch(`/api/b/reel-year/${y}`, { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ lang: 'en', mood: 'sleep' }) })).status, yb.y);
    let yj = null; for (let k = 0; k < 150 && fr === 202; k++) { yj = (await page.evaluate(async () => (await (await fetch('/api/b/reel')).json()).job)); if (!yj || yj.state !== 'run') break; await page.waitForTimeout(1000); }
    const yr = fr === 202 ? (await page.evaluate(async () => (await (await fetch('/api/b/reel-year')).json()).years)) : {};
    const got = yr[yb.y], vid = got ? await page.evaluate(async ([y, v]) => { const r = await fetch(`/media/reel-year/${y}?v=${v}`, { headers: { range: 'bytes=0-99' } }); return r.status; }, [yb.y, got.v]) : 0;
    ok((fr === 400) || (got && got.mood === 'sleep' && vid === 206 && yj && yj.state === 'done'), `the year: its film made from every book's best photos, played in ranges (${JSON.stringify({ fr, state: yj && yj.state, got, vid })})`); }
  // #/snap — a book from photos (docs/SNAP-BOOK.md P1): pick → read on the phone → days and places → make the book. Seven synthetic
  // photos: three on 12 Dec near Khao Yai (two JPEGs and a HEIF), one on 13 Dec with no position, one on 14 Dec with an empty 0,0 one,
  // one dated by its file only (today) and one in Sydney in April — the last two fall outside the trip and stay out
  {
    const bodies = []; const watch = (r) => { if (r.method() !== 'GET') bodies.push(r.url() + ' ' + (r.postData() || '')); }; page.on('request', watch);
    await page.goto(`${BASE}/#/`); await page.waitForSelector('.spine.add a.addway.main[href="#/snap"]');
    await page.click('.spine.add a.addway.main[href="#/snap"]'); await page.waitForSelector('.snapmode');
    ok(await page.locator('.snapmode .tpo[aria-pressed="true"][data-v="after"]').count() === 1 && /never the position/.test(await page.textContent('.snapwhere')) && await page.locator('.snapmode .tpo.pz .smpic img').count() === 2 && await page.locator('.snapwhere .ckrow input[data-a="snapgeoon"]').count() === 1 && await s.noHScroll(), 'book from photos: the new-book tile leads to it; "we\'re back" chosen, the privacy line said up front');
    await s.shot('snap-start');
    { // the online-names switch is a tick row in the place card: a tap turns it on, another off (this phone only)
      await page.click('.snapwhere .ckrow'); const on = await page.evaluate(() => [ls('geoOnline'), document.querySelector('.snapwhere input').checked]);
      await page.click('.snapwhere .ckrow'); const off = await page.evaluate(() => [ls('geoOnline'), document.querySelector('.snapwhere input').checked]);
      ok(on[0] && on[1] && !off[0] && !off[1], `book from photos: the place card's switch turns the online names on and off (${JSON.stringify({ on, off })})`); }
    const fx = ['gps-ii.jpg', 'gps-mm.jpg', 'gps.avif', 'time-only.jpg', 'gps-zero.jpg', 'no-exif.jpg', 'gps-south.jpg'].map((f) => path.resolve('test/fixtures/snap', f));
    const [fc] = await Promise.all([page.waitForEvent('filechooser'), page.click('[data-a="snappickbook"]')]);
    await fc.setFiles(fx);
    await page.waitForSelector('.snapsum', { timeout: 10000 });
    const sum = (await page.$$eval('.snapsum li', (ls) => ls.map((l) => l.textContent.replace(/\s+/g, ' ').trim()))).join(' | ');
    ok(/12 Dec – 14 Dec · 3 days/.test(sum) && /Know where\s*4/.test(sum) && /Outside the trip\s*2, left out/.test(sum) && !/14\.4|101\.3|-33\.8/.test(await page.textContent('main')), `book from photos: 7 photos read on the phone → 3 days, 4 placed, 2 outside the trip (${sum})`);
    await s.shot('snap-read');
    await page.click('.snapfoot a.btn'); await page.waitForSelector('.snapdays');
    // the three fixtures of day 1 are one synthetic picture with one camera second — a burst of the same shot: two are set aside (the
    // "set aside" fold of the day); a tap on each brings it back into the book, so the day keeps its three photos
    const asideN = await page.locator('.snapday:nth-child(1) .snapaside .sdpt').count();
    if (asideN) await page.click('.snapday:nth-child(1) .snapaside > summary');
    for (let k = 0; k < asideN; k++) await page.locator('.snapday:nth-child(1) .snapaside .sdpt').nth(k).click();
    ok(asideN === 2 && await page.locator('.snapday:nth-child(1) .snapaside .sdpt.kept').count() === 2, `book from photos: the same shot taken twice more in that second is set aside, and a tap brings each back (${asideN})`);
    const title = await page.inputValue('#snaptitle'), d1 = await page.textContent('.snapday:nth-child(1) .sdt'), d2 = await page.textContent('.snapday:nth-child(2) .sdt');
    const moms = await page.$$eval('.snapday:nth-child(1) .snapmoms li', (ls) => ls.map((l) => l.textContent.replace(/\s+/g, ' ').trim()));
    ok(title === 'Khao Yai, 3 days' && /Khao Yai · 3 photos/.test(d1) && /No place yet · 1 photos?/.test(d2) && moms.length === 1 && /^Morning · Khao Yai/.test(moms[0]), `book from photos: the days named from the place (${title}; ${d1.trim()} | ${d2.trim()} | ${moms.join(' / ')})`);
    await s.shot('snap-days');
    await page.click('.snapday:nth-child(2) > summary'); await page.fill('.snapday:nth-child(2) input[data-snapday="2025-12-13"]', 'Pak Chong');
    ok(await s.noHScroll() && await page.evaluate(() => [...document.querySelectorAll('.snapday > summary, .snapfoot .btn, .snapday input')].every((e) => e.getBoundingClientRect().height >= 44)), 'book from photos: no sideways scroll, every tap 44 px or taller');
    await page.click('[data-a="snapmake"]');
    await page.waitForFunction(() => /\/book$/.test(location.hash), null, { timeout: 15000 });
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 30000 });
    const st = await apiState(page), t = st.trips.find((x) => x.kind === 'snap');
    const ms = st.media.filter((m) => m.trip === (t && t.id)), d0 = ms.filter((m) => m.day === 0);
    ok(t && t.title.en === 'Khao Yai, 3 days' && t.days.length === 3 && t.days[0].place.en === 'Khao Yai' && t.days[1].place.en === 'Pak Chong' && t.days[2].place === null
      && ms.length === 5 && d0.length === 3 && d0.every((m) => m.place === 'Khao Yai National Park') && ms.find((m) => m.day === 1).place === 'Pak Chong'
      && d0.some((m) => m.at === Date.parse('2025-12-12T09:15:30+07:00')) && st.places.some((p) => p.trip === t.id && p.key === 'snap.th-khaoyai' && p.day === 0) && st.places.some((p) => p.trip === t.id && /^snap\.g\d+$/.test(p.key) && p.name.en === 'Khao Yai National Park'),
    `book from photos: the book is made from the dates — 3 days with their towns, 5 photos on their days with the time they were taken and the finer spot from the phone's list (the national park), the town and the spot checked in (${t && t.days.map((d) => d.place && d.place.en).join(',')}; ${ms.map((m) => m.day + ':' + m.place).join(' ')})`);
    ok(!bodies.some((b) => /14\.4\d|101\.3\d|33\.8\d|151\.2\d/.test(b)), `book from photos: no position in any request (${bodies.length} writes)`);
    page.off('request', watch);
    await s.shot('snap-book');
    await page.goto(`${BASE}/#/t/${t.id}`); await page.waitForSelector('.hubgrid'); await s.shot('snap-hub');
    await page.evaluate((id) => fetch('/api/b/trips/' + id, { method: 'DELETE', headers: { 'x-mb': '1' } }), t.id); await page.evaluate(() => load());
  }
  // two trips in one pick (docs/SNAP-BOOK.md edge journeys): the same seven photos plus three more in April — the read page says these look
  // like two trips, the parents pick April first, make it, and come back to the December trip with the other photos still on the phone
  {
    await page.goto(`${BASE}/#/snap`); await page.waitForSelector('.snapmode');
    const fx = ['gps-ii.jpg', 'gps-mm.jpg', 'gps.avif', 'time-only.jpg', 'gps-zero.jpg', 'no-exif.jpg', 'gps-south.jpg', 'trip2-a.jpg', 'trip2-b.jpg', 'trip2-c.jpg'].map((f) => path.resolve('test/fixtures/snap', f));
    const [fc] = await Promise.all([page.waitForEvent('filechooser'), page.click('[data-a="snappickbook"]')]);
    await fc.setFiles(fx);
    await page.waitForSelector('.snapsum', { timeout: 10000 });
    const cards = await page.$$eval('.snaptrips .tpo', (bs) => bs.map((b) => [b.dataset.v, b.getAttribute('aria-pressed'), b.textContent.replace(/\s+/g, ' ').trim()]));
    await page.click('.snaptrips .tpo[data-v="2026-04-03"]'); await page.waitForSelector('.snaptrips .tpo[data-v="2026-04-03"][aria-pressed="true"]');
    const sum = (await page.$$eval('.snapsum li', (ls) => ls.map((l) => l.textContent.replace(/\s+/g, ' ').trim()))).join(' | ');
    ok(cards.length === 2 && cards[1][1] === 'true' && /3 days · 3 photos/.test(cards[0][2]) && /2 days · 4 photos/.test(cards[1][2]) && /3 Apr – 4 Apr · 2 days/.test(sum) && /Other trips\s*4, not in this book/.test(sum) && await s.noHScroll(),
      `book from photos, two trips: the read page offers both (April first: December's two repeats are set aside, so it holds three), April shows its own dates, the other four photos (December and one dated only by its file) stay out of it (${JSON.stringify(cards)} · ${sum})`);
    await s.shot('snap-two-trips');
    await page.click('.snapfoot a.btn'); await page.waitForSelector('.snapdays');
    await page.click('[data-a="snapmake"]');
    await page.waitForFunction(() => /#\/snap\/read$/.test(location.hash) && !!document.querySelector('.notice a'), null, { timeout: 15000 });
    const after = await page.$$eval('.snaptrips .tpo', (bs) => bs.map((b) => [b.dataset.v, b.disabled, b.getAttribute('aria-pressed')]));
    await page.click('.snapfoot a.btn'); await page.waitForSelector('.snapdays');
    // B3, the place sheet: the day's photo places, the region's landmarks from the library, the library's towns; the search filters in place
    await page.click('.snapday:nth-child(1) [data-a="snapplace"]'); await page.waitForSelector('#sheet .pslist .psopt');
    const heads = await page.$$eval('#sheet .pslist .psh', (ls) => ls.map((l) => l.textContent));
    await s.shot('snap-place-sheet');
    await page.fill('#psq', 'gibbon');
    const shown = await page.$$eval('#sheet .pslist li:not([hidden]) .psopt', (bs) => bs.map((b) => b.textContent));
    const short = await page.evaluate(() => [...document.querySelectorAll('#sheet .psopt, #sheet [data-own], .snapplb')].filter((e) => e.offsetParent && e.getBoundingClientRect().height < 44).map((e) => e.className + ':' + Math.round(e.getBoundingClientRect().height))), tall = !short.length, hs = await s.noHScroll();
    await page.click('#sheet .pslist li:not([hidden]) .psopt');
    await page.waitForFunction(() => document.querySelector('#sheet').hidden && /gibbon/i.test((document.querySelector('input[data-snapday="2025-12-12"]') || {}).value || ''));
    ok(heads.some((h) => /From the day/.test(h)) && heads.some((h) => /^Around Khao Yai/.test(h)) && heads.some((h) => /Towns in the library/.test(h)) && shown.length === 1 && /gibbon/i.test(shown[0]) && tall && hs,
      `book from photos, the place sheet: the day's photo places, the region's landmarks and the library's towns; the search leaves one, a tap makes it the day's place (${heads.join(' / ')} · ${shown.join(', ')} · short ${short.join(' ') || 'none'} · sideways ${!hs})`);
    await page.click('[data-a="snapmake"]');
    await page.waitForFunction(() => /\/(book|draft)$/.test(location.hash), null, { timeout: 15000 });
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 30000 });
    const books = (await apiState(page)).trips.filter((x) => x.kind === 'snap').map((x) => [x.date_from, x.days.length]).sort();
    ok(JSON.stringify(after) === JSON.stringify([['2025-12-12', false, 'true'], ['2026-04-03', true, 'false']]) && JSON.stringify(books) === JSON.stringify([['2025-12-12', 3], ['2026-04-03', 2]]),
      `book from photos, two trips: after April is made the December trip is next and April is marked done; both books exist (${JSON.stringify(after)} · ${JSON.stringify(books)})`);
    for (const id of (await apiState(page)).trips.filter((x) => x.kind === 'snap').map((x) => x.id)) await page.evaluate((x) => fetch('/api/b/trips/' + x, { method: 'DELETE', headers: { 'x-mb': '1' } }), id);
    await page.evaluate(() => load());
  }
  // a book from photos during the trip (docs/SNAP-BOOK.md P2): "we're on the trip" → an open book with today → its own Today page:
  // where we are (a typed name, kept for today), four big actions, photos placed by their own position or by "now around", "we're home".
  // Its own browser session: the phone session's later kid-mode checks read the colouring page right after a tap and must not inherit this one's state
  {
    const s = await session('snaplive'); const { page } = s; await login(page);
    await page.goto(`${BASE}/#/snap`); await page.waitForSelector('.snapmode');
    await page.click('.snapmode .tpo[data-v="live"]'); await page.click('[data-a="snaplive"]');
    await page.waitForSelector('.snapacts', { timeout: 10000 });
    const id = await page.evaluate(() => decodeURIComponent(location.hash.split('/')[2]));
    let t = (await apiState(page)).trips.find((x) => x.id === id);
    ok(t && t.kind === 'snap' && t.open && t.days.length === 1 && await page.locator('.snapacts .snapact').count() === 4 && await page.locator('#snaphere').count() === 1
      && await s.noHScroll() && await page.evaluate(() => [...document.querySelectorAll('.snapact, .snapgps, #snaphere, [data-a="snapclose"]')].every((e) => e.getBoundingClientRect().height >= 44)),
    'on the trip: "start the book today" makes an open book and opens its day page — where we are, four big actions, taps 44 px or taller');
    await s.shot('snap-live');
    await page.fill('#snaphere', 'Bang Saen'); await page.press('#snaphere', 'Tab');
    const [fc] = await Promise.all([page.waitForEvent('filechooser'), page.click('[data-a="snapadd"]')]);
    await fc.setFiles(['gps-ii.jpg', 'no-exif.jpg'].map((f) => path.resolve('test/fixtures/snap', f)));
    await page.waitForFunction((tid) => S.media.filter((m) => m.trip === tid).length === 2, id, { timeout: 15000 });
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 30000 });
    const st = await apiState(page), ms = st.media.filter((m) => m.trip === id).map((m) => m.place).sort().join(',');
    ok(ms === 'Bang Saen,Khao Yai National Park' && st.places.some((p) => p.trip === id && p.key === 'snap.th-khaoyai'), `on the trip: a photo with a position takes its finer spot (the town checked in too), one without takes "now around" (${ms})`);
    // P4: the day took the photo's town as its place, so the book has the library's picture, crest and town — and the kids' side works
    await page.waitForFunction((tid) => { const x = trips().find((y) => y.id === tid); return x && x.days[0].place && (x.theme.artDays || [])[0]; }, id, { timeout: 10000 });
    const tk = (await apiState(page)).trips.find((x) => x.id === id);
    ok(tk.days[0].place.en === 'Khao Yai' && /^\/stock\//.test(tk.theme.artDays[0]) && /^\/stock\//.test(tk.passport.style.crest) && tk.passport.map.stops.length === 1,
      `book from photos, kids' side (P4): the day took its photo's town; a library picture, the crest and the town on the map (${tk.theme.artDays[0]})`);
    await page.goto(`${BASE}/#/passport/mimi/${id}`); await page.waitForSelector('.pp');
    const crestOk = await page.evaluate(() => [...document.querySelectorAll('.pp img')].some((i) => /\/stock\//.test(i.src)));
    await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('.kidtiles');
    await page.goto(`${BASE}/#/kid/mimi/quest`); await page.waitForSelector('.kidwrap');
    const questTx = await page.textContent('.kidwrap');
    const openKid = await page.evaluate((tid) => { const t = trip(tid); return { town: T((t.passport.days[0] || {}).title), stamp: (t.passport.days[0] || {}).stamp, cert: certEarned(t, 'mimi') }; }, id);
    ok(/Khao Yai/.test(questTx) && openKid.town === 'Khao Yai' && openKid.stamp === 'KHAO YAI' && !openKid.cert,
      `book from photos, kids' side: the adventure map calls the town by its place, its stamp says where, no certificate while the book is open (${JSON.stringify(openKid)})`);
    await page.goto(`${BASE}/#/print/${id}`); await page.waitForSelector('section.pg');
    const printOk = await page.evaluate(() => document.querySelectorAll('section.pg').length >= 3 && [...document.querySelectorAll('img')].some((i) => /\/stock\//.test(i.src)));
    await s.shot('snap-print');
    ok(crestOk && questTx.length > 20 && printOk && !s.errs.length, `book from photos, kids' side (P4): the passport shows the library crest, kid mode and the adventure map open, the printed book has its pages and the day picture; no page error (${s.errs.join(' | ')})`);
    await page.goto(`${BASE}/#/t/${id}/today`); await page.waitForSelector('.snapacts');
    await page.click('[data-a="snapclose"]'); await page.click('[data-a="snapclose"]');
    await page.waitForFunction(() => /\/book$/.test(location.hash), null, { timeout: 10000 });
    t = (await apiState(page)).trips.find((x) => x.id === id);
    await page.goto(`${BASE}/#/t/${id}`); await page.waitForSelector('.hubgrid');
    ok(t.open === false && await page.locator('.hubgrid a[href$="/today"]').count() === 0, 'on the trip: "we\'re home" (two taps) closes the book; a closed book from photos has no Today tile');
    ok(await page.evaluate((tid) => certEarned(trip(tid), 'mimi') && /Khao Yai/.test(T(trip(tid).passport.certificate.text)), id), 'book from photos: closing the book ("we\'re home") brings the certificate');
    // photos found later (owner, Nov 2026: "เพิ่มรูปทีหลัง"): from the closed book's menu, each to the day its camera wrote — the next
    // day adds that day after the last; a photo from long ago and one with no date are left out (never piled on day 1), and the page says so
    const nextDay = new Date(Date.parse(t.days[0].date + 'T00:00:00Z') + 864e5).toISOString().slice(0, 10);
    const exifJpg = (d) => sharp({ create: { width: 40, height: 30, channels: 3, background: '#3a7' } }).jpeg().withExif({ IFD0: { DateTime: d }, IFD2: { DateTimeOriginal: d } }).toBuffer();
    const later = [{ name: 'later.jpg', mimeType: 'image/jpeg', buffer: await exifJpg(nextDay.replace(/-/g, ':') + ' 10:30:00') },
      { name: 'old.jpg', mimeType: 'image/jpeg', buffer: await exifJpg('2019:03:02 09:00:00') },
      { name: 'nodate.jpg', mimeType: 'image/jpeg', buffer: await sharp({ create: { width: 40, height: 30, channels: 3, background: '#a37' } }).jpeg().toBuffer() }];
    ok(await page.locator('.snapmorego').count() === 1 && await page.evaluate(() => document.querySelector('.snapmorego').getBoundingClientRect().height >= 44), 'photos found later: the closed book\'s menu has its row');
    const [fm] = await Promise.all([page.waitForEvent('filechooser'), page.click('.snapmorego')]);
    await fm.setFiles(later);
    await page.waitForFunction((tid) => S.media.filter((m) => m.trip === tid).length === 3, id, { timeout: 15000 }).catch(() => {});
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 30000 }).catch(() => {});
    const tl = (await apiState(page)).trips.find((x) => x.id === id), ml = (await apiState(page)).media.filter((m) => m.trip === id);
    const toastTx = await page.evaluate(() => document.getElementById('toast').textContent);
    ok(tl.days.length === 2 && tl.days[1].date === nextDay && ml.length === 3 && ml.filter((m) => m.day === 1).length === 1 && /left out/.test(toastTx),
      `photos found later: the next day was added and holds its photo; the old and the undated ones left out, and said (days ${tl.days.map((d) => d.date)}, media ${ml.map((m) => m.day)}, toast "${toastTx}")`);
    // the same file picked again is skipped (owner, Nov 2026: "ไม่ให้รูปเดิมขึ้นซ้ำ"), and photos found later are screened like the first
    // build (owner: "แยกรูปซ้ำและใบเสร็จตอนเพิ่มรูปทีหลัง"): a café receipt waits in a sheet, unsent, until a tap brings it in
    { const { cameraJpeg, receiptSvg } = await import('./snap-jpeg.mjs'), wd = nextDay.replace(/-/g, ':');
      const again = [later[0], { name: 'IMG_RECEIPT2.jpg', mimeType: 'image/jpeg', buffer: (await cameraJpeg(receiptSvg('#30343a', 26, 5), wd + ' 13:10:00')).buffer },
        { name: 'more.jpg', mimeType: 'image/jpeg', buffer: await sharp({ create: { width: 40, height: 30, channels: 3, background: '#2a5' } }).jpeg().withExif({ IFD0: { DateTime: wd + ' 16:00:00' }, IFD2: { DateTimeOriginal: wd + ' 16:00:00' } }).toBuffer() }];
      const [fa] = await Promise.all([page.waitForEvent('filechooser'), page.click('.snapmorego')]);
      await fa.setFiles(again);
      await page.waitForSelector('#sheet .snapheld .sdpt', { timeout: 20000 }).catch(() => {});
      const held = await page.evaluate(() => ({ n: document.querySelectorAll('#sheet .snapheld .sdpt').length, sub: (document.querySelector('#sheet .sub') || {}).textContent || '', toast: document.getElementById('toast').textContent }));
      await page.waitForFunction(() => queue.length === 0, null, { timeout: 30000 }).catch(() => {});
      const m1 = (await apiState(page)).media.filter((m) => m.trip === id);
      ok(held.n === 1 && /Receipts and papers/.test(held.sub) && /1 already in the book/.test(held.toast) && m1.length === 4 && m1.filter((m) => m.fp).length === 4,
        `photos found later: the same file again is skipped, the receipt waits aside unsent, the new photo goes in — every one with its fingerprint (${JSON.stringify({ ...held, media: m1.length, fps: m1.filter((m) => m.fp).length })})`);
      await s.shot('snap-held-sheet');
      await page.click('#sheet .snapheld .sdpt'); await page.click('#snapheldgo');
      await page.waitForFunction((tid) => S.media.filter((m) => m.trip === tid).length === 5, id, { timeout: 15000 }).catch(() => {});
      await page.waitForFunction(() => queue.length === 0, null, { timeout: 30000 }).catch(() => {});
      // an iPhone's HEIC: the gate reads its own preview item (here an AVIF of the same layout, which Chromium decodes) — a receipt is
      // paper, a beach is not, and neither needed the whole photo
      { const { avifWithPreview } = await import('./snap-jpeg.mjs');
        const beach = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480"><rect width="640" height="480" fill="#87ceeb"/><rect y="300" width="640" height="180" fill="#e8d8a8"/><circle cx="250" cy="260" r="60" fill="#f2c39a"/></svg>';
        const g = await page.evaluate(async (bs) => Promise.all(bs.map(async (b64) => { const f = new File([Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))], 'IMG.heic', { type: 'image/avif' }), m = await snapMeta(f);
          return { blob: m.th instanceof Blob, gate: m.th ? await snapThumbGate(f, m.th) : null }; })), [(await avifWithPreview(receiptSvg())).buffer.toString('base64'), (await avifWithPreview(beach)).buffer.toString('base64')]);
        ok(g[0].blob && g[0].gate === true && g[1].blob && g[1].gate === false, `book from photos: an iPhone-style photo's own preview item is read by the receipt gate — paper yes, a beach no (${JSON.stringify(g)})`); }
      // the same picture again from another phone or over LINE (re-encoded, smaller — another file): it waits in a sheet beside the book's
      // photo it looks like, never sent unless a tap says it is not the same; a different picture goes straight in
      { const pic = (f) => sharp(fs.readFileSync(f), { density: 300 }).resize(1600, 1200, { fit: 'cover' }).flatten({ background: '#fff' }).jpeg({ quality: 90 }).toBuffer();
        const orig = await pic('public/stock/th/khaoyai/day-sunflowers.v1.svg'), copy = await sharp(orig).resize(900).jpeg({ quality: 55 }).toBuffer(), other = await pic('public/stock/th/khaoyai/day-park.v1.svg');
        const addB64 = (b64s, names) => page.evaluate(async ([tid, bs, ns]) => addPhotos(trip(tid), 0, bs.map((b, k) => new File([Uint8Array.from(atob(b), (c) => c.charCodeAt(0))], ns[k], { type: 'image/jpeg' }))), [id, b64s, names]);
        const n0 = (await apiState(page)).media.filter((m) => m.trip === id).length;
        await addB64([orig.toString('base64')], ['IMG_SUN.jpg']); await page.waitForFunction(() => queue.length === 0, null, { timeout: 30000 }).catch(() => {});
        const sent = await addB64([copy.toString('base64'), other.toString('base64')], ['LINE_SUN.jpg', 'IMG_PARK.jpg']);
        await page.waitForSelector('#sheet .nearlist .nearpair', { timeout: 10000 }).catch(() => {});
        const pairs = await page.locator('#sheet .nearpair').count();
        await page.waitForFunction(() => queue.length === 0, null, { timeout: 30000 }).catch(() => {});
        const n1 = (await apiState(page)).media.filter((m) => m.trip === id).length;
        await s.shot('near-sheet');
        await page.click('#sheet .nearpair'); await page.click('#neargo');
        await page.waitForFunction(() => queue.length === 0, null, { timeout: 30000 }).catch(() => {});
        const n2 = (await apiState(page)).media.filter((m) => m.trip === id).length;
        ok(sent === 1 && pairs === 1 && n1 === n0 + 2 && n2 === n0 + 3, `the same picture from another phone waits beside the book's photo it looks like; another picture goes in; a tap adds it anyway (sent ${sent}, pairs ${pairs}, photos ${n0} → ${n1} → ${n2})`); }
      // the record page's own picker skips it too (any page of the book: the print is the book's)
      const skipped = await page.evaluate(async ([tid, b64]) => addPhotos(trip(tid), 0, [new File([Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))], 'again.jpg', { type: 'image/jpeg' })]), [id, later[0].buffer.toString('base64')]);
      const m2 = (await apiState(page)).media.filter((m) => m.trip === id);
      ok(m2.length === 8 && skipped === 0, `photos found later: a tap brings the receipt in; the record page skips a file the book holds (${m2.length} photos, added ${skipped})`); }
    // the trip in a film (owner, Nov 2026: "คลิปสรุปทริป"; server/reel.js): made on our server from the book's photos — the cards are
    // the app's own page photographed by the PDF's Chromium — then played, shared and saved from the memory book page
    // v2 (owner, Nov 2026): a kid's words under a photo of that day, the day's voice memo over its photos, the music the parents pick
    { const { execFileSync: ex } = await import('node:child_process'), tone = path.join(OUT, 'voice-test.webm');
      ex('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'sine=frequency=330:duration=9', '-c:a', 'libopus', '-b:a', '48k', tone]);
      const day0 = await page.evaluate((tid) => Math.min(...mediaOf(tid).filter((m) => !isVideo(m) && !isAudio(m)).map((m) => m.day)), id);
      await page.evaluate(async ([tid, d, b64]) => {
        await putEntry(trip(tid), { day: d, kind: 'quote', child: children()[0].slug, text: 'Look, a giant sunflower!' }, `${tid}.q.reeltest`);
        await fetch(`/api/b/media/vc-reel-0001?trip=${tid}&day=${d}&kind=audio`, { method: 'PUT', headers: { 'x-mb': '1', 'content-type': 'audio/webm' }, body: Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)) });
        await load(); render();
      }, [id, day0, fs.readFileSync(tone).toString('base64')]);
      await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 }).catch(() => {}); }
    { await page.goto(`${BASE}/#/t/${id}/book`); await page.waitForSelector('[data-a="reelmake"]', { timeout: 15000 });
      await page.click('.reelmood [data-v="fun"]');
      const moodOn = await page.evaluate(() => [...document.querySelectorAll('.reelmood .tpo')].map((b) => b.dataset.v + ':' + b.getAttribute('aria-pressed')).join());
      const t0 = Date.now(); await page.click('[data-a="reelmake"]');
      await page.waitForSelector('#reelpct', { timeout: 10000 }).catch(() => {});
      const running = await page.locator('#reelpct').count();
      await page.waitForSelector('video.reelvid', { timeout: 240000 }).catch(() => {});
      const secs = Math.round((Date.now() - t0) / 1000), st = (await apiState(page)).trips.find((x) => x.id === id);
      const v = await page.evaluate(async (tid) => { const r = await fetch(`/media/reel/${tid}?v=${trip(tid).reel.v}`), b = new Uint8Array(await r.arrayBuffer());
        const rg = await fetch(`/media/reel/${tid}?v=${trip(tid).reel.v}`, { headers: { range: 'bytes=0-99' } });
        return { status: r.status, type: r.headers.get('content-type'), size: b.length, b64: btoa(Array.from(b, (c) => String.fromCharCode(c)).join('')), range: rg.status, rlen: (await rg.arrayBuffer()).byteLength }; }, id).catch((e) => ({ err: e.message }));
      const { execFileSync, spawnSync } = await import('node:child_process'), vf = path.join(OUT, 'reel.mp4');
      if (v.b64) fs.writeFileSync(vf, Buffer.from(v.b64, 'base64'));
      const pr = v.b64 ? JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration:format_tags:stream=codec_name,width,height:stream_tags', '-of', 'json', vf]).toString()) : {};
      const vs = (pr.streams || []).find((x) => x.codec_name === 'h264') || {}, as = (pr.streams || []).find((x) => x.codec_name === 'aac');
      const tags = JSON.stringify([(pr.format || {}).tags || {}, ...(pr.streams || []).map((x) => x.tags || {})]);
      // a frame from the title card and one from a photo: the card is the book's colour and words, not an empty frame
      if (v.b64) { execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', '1.2', '-i', vf, '-frames:v', '1', path.join(OUT, 'reel-title.png')]); execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-ss', '4.6', '-i', vf, '-frames:v', '1', path.join(OUT, 'reel-day.png')]); }
      const fs0 = v.b64 ? await sharp(path.join(OUT, 'reel-title.png')).stats() : null;
      // the voice memo is heard over the first day's card and photos (it starts 0.6 s into the day card, after the 3.2 s title)
      const vol = (a, b) => { try { const r = spawnSync('ffmpeg', ['-hide_banner', '-nostats', '-ss', String(a), '-t', String(b - a), '-i', vf, '-af', 'volumedetect', '-f', 'null', '-']); const m = /mean_volume: (-?[\d.]+) dB/.exec(String(r.stderr)); return m ? Number(m[1]) : -99; } catch (_) { return -99; } };
      const voiceDb = v.b64 ? vol(4.2, 7.5) : -99, titleDb = v.b64 ? vol(0.8, 2.6) : -99;
      // the kid's words: drawn as a bubble by the cards page for this book (what the server photographs)
      const capOk = await page.evaluate((tid) => { S.hearts.push({ id: 'h-reel-test', trip: tid, day: 0, child: 'both', emoji: '💗', text: 'Miss you both!', from: 'Grandma', at: Date.now() });
        const h = viewReelCards(trip(tid), [0], [`${tid}.q.reeltest`]); S.hearts.pop();
        return /class="rcap" data-id="[^"]+q\.reeltest"/.test(h) && /Look, a giant sunflower!/.test(h) && /1 heart from family/.test(h) && /Miss you both!.*Grandma/.test(h); }, id);
      ok(st.reel && st.reel.mood === 'fun' && /fun:true/.test(moodOn) && voiceDb > titleDb + 6 && capOk,
        `the trip film v2: the music the parents picked (${st.reel && st.reel.mood}), the day's voice memo heard over its photos (${voiceDb} dB against the title's ${titleDb} dB), the kid's words as a bubble (${capOk})`);
      ok(running === 1 && v.status === 200 && v.type === 'video/mp4' && v.range === 206 && v.rlen === 100 && vs.width === 720 && vs.height === 1280 && !!as
        && Number((pr.format || {}).duration) >= 8 && !/location|creation_time|com\.apple|make|model/i.test(tags) && st.reel && st.reel.n >= 3 && fs0 && fs0.channels.some((c) => c.stdev > 20),
        `the trip film: made in ${secs} s (${st.reel && st.reel.secs} s long, ${st.reel && st.reel.n} photos), portrait 720×1280 H.264/AAC, played in byte ranges, no metadata (${JSON.stringify({ running, status: v.status, type: v.type, range: v.range, w: vs.width, h: vs.height, aac: !!as, dur: (pr.format || {}).duration, tags, err: v.err })})`);
      await page.evaluate(() => document.getElementById('reelbox').scrollIntoView());
      await s.shot('reel-book');
      ok(await page.locator('[data-a="reelshare"]').count() === 1 && await page.locator('#reelbox a[download]').count() === 1 && await page.locator('[data-a="reelmake"]').count() === 1,
        'the trip film: the memory book plays it, sends it through the phone\'s share sheet, saves it, and the parents can make it again'); }
    // a book with fewer than three photos has no film to make yet
    { const r = await page.evaluate(async () => { const t = trips().find((x) => !mediaOf(x.id).length); return t ? (await fetch(`/api/b/reel/${t.id}`, { method: 'POST', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: '{}' })).json() : null; });
      ok(!r || r.error === 'few', `the trip film: a book with too few photos is told so (${JSON.stringify(r)})`); }
    // edit the book after it is made (owner, Nov 2026: "แก้เล่มหลังสร้างแล้ว"): the book's name, a day's name and place, saved on leaving
    // the box; a photo on the wrong day moves from its viewer
    await page.goto(`${BASE}/#/t/${id}`); await page.waitForSelector('.snapeditgo'); await page.click('.snapeditgo');
    await page.waitForSelector('#sebook');
    await page.fill('#sebook', 'ทะเลบางแสน'); await page.press('#sebook', 'Tab');
    await page.waitForFunction((tid) => trips().find((x) => x.id === tid).title.th === 'ทะเลบางแสน', id, { timeout: 8000 }).catch(() => {});
    await page.fill('.sedt[data-d="1"][data-k="title"]', 'Sandcastles'); await page.press('.sedt[data-d="1"][data-k="title"]', 'Tab');
    await page.waitForFunction((tid) => T(trips().find((x) => x.id === tid).days[1].title) === 'Sandcastles', id, { timeout: 8000 }).catch(() => {});
    await page.fill('.sedt[data-d="1"][data-k="place"]', 'Bang Saen'); await page.press('.sedt[data-d="1"][data-k="place"]', 'Tab');
    await page.waitForFunction((tid) => (trips().find((x) => x.id === tid).days[1].place || {}).en === 'Bang Saen', id, { timeout: 8000 }).catch(() => {});
    const te = (await apiState(page)).trips.find((x) => x.id === id), editTaps = await page.evaluate(() => [...document.querySelectorAll('.sedt, #sebook')].every((e) => e.getBoundingClientRect().height >= 44));
    ok(te.title.th === 'ทะเลบางแสน' && te.title.en === 'ทะเลบางแสน' && te.days[1].title.en === 'Sandcastles' && te.days[1].place.en === 'Bang Saen' && editTaps && await s.noHScroll(),
      `edit the book: its name, a day's name and its place are saved on leaving the box; boxes 44 px tall, no sideways scroll (${JSON.stringify({ title: te.title, d1: te.days[1] })})`);
    const mv = (await apiState(page)).media.find((m) => m.trip === id && m.day === 1);
    await page.goto(`${BASE}/#/t/${id}/book`); await page.waitForSelector(`[data-a="lb"][data-v="${mv.id}"]`);
    await page.click(`[data-a="lb"][data-v="${mv.id}"]`); await page.waitForSelector('#lbday');
    await page.selectOption('#lbday', '0');
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 }).catch(() => {});
    const moved = (await apiState(page)).media.find((m) => m.id === mv.id);
    ok(moved.day === 0, `a photo on the wrong day moves from its viewer (day ${moved.day})`);
    await page.keyboard.press('Escape'); await page.evaluate(() => { lbState = null; drawLb(); });
    // "go here again" (owner, Nov 2026): from the menu, a first date → a new book with the same towns day by day; it opens on its menu
    await page.goto(`${BASE}/#/t/${id}`); await page.waitForSelector('.snapagaingo');
    await page.click('.snapagaingo'); await page.waitForSelector('#againfrom');
    await page.fill('#againfrom', '2027-12-20'); await page.click('[data-a="snapagaingo"]');
    await page.waitForFunction((x) => /^#\/t\/snap-20271220-/.test(location.hash) && !location.hash.includes(x), id, { timeout: 15000 }).catch(() => {});
    const nid = await page.evaluate(() => decodeURIComponent((location.hash.split('/')[2] || '')));
    const nb = (await apiState(page)).trips.find((x) => x.id === nid);
    await page.waitForSelector('.hubhead');
    ok(!!nb && nb.days.length === tl.days.length && nb.days[0].place && nb.days[0].place.en === tl.days[0].place.en && await page.locator('.hubgrid a[href$="/today"]').count() === 0 && !s.errs.length,
      `go again: a new book with the same towns from the chosen date, on its menu (no Today tile before its dates); no page error (${nid} ${s.errs.join(' | ')})`);
    await page.evaluate((xs) => Promise.all(xs.map((x) => fetch('/api/b/trips/' + x, { method: 'DELETE', headers: { 'x-mb': '1' } }))), [id, nid]);
    // two trips in one pick, a burst of the same shot, a screenshot, the best photo of each day (owner, Nov 2026): the read page says "these
    // look like 2 trips" and what was set aside and starred; "a book each" makes two books; the burst sends one photo, the screenshot none,
    // each book has a ⭐ photo. Pictures are generated noise (never a real photo), each with its own camera time.
    {
      const shot = async (seed, when) => ({ name: `IMG_${seed}.jpg`, mimeType: 'image/jpeg', buffer: await sharp({ create: { width: 320, height: 240, channels: 3, noise: { type: 'gaussian', mean: 60 + (seed % 7) * 20, sigma: 40 + seed } } })
        .jpeg({ quality: 85 }).withExif({ IFD0: { DateTime: when }, IFD2: { DateTimeOriginal: when } }).toBuffer() });
      const files = [];
      for (let k = 0; k < 6; k++) files.push(await shot(k + 1, `2025:03:0${1 + (k % 2)} 1${k}:00:00`));
      const burst = await shot(50, '2025:03:01 15:00:00');
      files.push(burst, { ...burst, name: 'IMG_51.jpg', buffer: await sharp(burst.buffer).withExif({ IFD0: { DateTime: '2025:03:01 15:00:01' }, IFD2: { DateTimeOriginal: '2025:03:01 15:00:01' } }).toBuffer() });
      for (let k = 0; k < 5; k++) files.push(await shot(20 + k, `2025:05:1${k % 2} 0${k + 1}:30:00`));
      { const { execFile } = await import('node:child_process'), vf = path.join(OUT, 'snap-clip.mp4');   // a clip filmed on the first trip's first day (its own time)
        await new Promise((res, rej) => execFile('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'testsrc=size=320x240:rate=12', '-t', '2', '-metadata', 'creation_time=2025-03-01T12:00:00Z', '-c:v', 'libx264', '-preset', 'ultrafast', vf], (e) => (e ? rej(e) : res())));
        files.push({ name: 'VID_20250301.mp4', mimeType: 'video/mp4', buffer: fs.readFileSync(vf) }); }
      { const { cameraJpeg, receiptSvg } = await import('./snap-jpeg.mjs');   // with the camera's own preview, as a phone writes it
        files.push({ name: 'IMG_RECEIPT.jpg', mimeType: 'image/jpeg', buffer: (await cameraJpeg(receiptSvg(), '2025:03:01 13:30:00')).buffer }); }   // a café receipt on the first day: set aside, never sent
      files.push({ name: 'Screenshot_20250301.png', mimeType: 'image/png', buffer: await sharp({ create: { width: 200, height: 400, channels: 3, background: '#eee' } }).png().toBuffer() });
      await page.goto(`${BASE}/#/snap`); await page.waitForSelector('.snapmode');
      await page.click('.snapmode .tpo[data-v="after"]');
      const [fb] = await Promise.all([page.waitForEvent('filechooser'), page.click('[data-a="snappickbook"]')]);
      await fb.setFiles(files);
      await page.waitForSelector('.snapjoin', { timeout: 30000 }).catch(() => {});
      const rd = await page.evaluate(() => ({ two: document.querySelectorAll('.snaptrips .tpo').length, join: [...document.querySelectorAll('.snapjoin .tpo')].map((b) => b.dataset.v).join(), sum: document.querySelector('.snapsum') ? document.querySelector('.snapsum').textContent : '', aside: { ...snapS.aside }, sift: snapS.sift, stars: snapS.star.size }));
      ok(rd.two === 2 && rd.join === 'both' && /set aside/i.test(rd.sum) && /best photos/i.test(rd.sum) && Object.values(rd.aside).filter((v) => v === 'dup').length === 1 && Object.values(rd.aside).filter((v) => v === 'shot').length === 1 && Object.values(rd.aside).filter((v) => v === 'doc').length === 1 && rd.sift.preview >= 1 && rd.sift.read >= 1 && /receipts and papers/.test(rd.sum) && rd.stars >= 2,
        `two trips: the read page offers either trip or a book each (not one book: March to May is over 60 days); one of the burst, the screenshot and the café receipt set aside; a star a day (${JSON.stringify(rd)})`);
      await page.click('.snapjoin .tpo[data-v="both"]');
      await page.goto(`${BASE}/#/snap/days`); await page.waitForSelector('[data-a="snapmake"]');
      const daysOk = await page.evaluate(() => document.querySelectorAll('.sdpt.on').length >= 1 && document.querySelectorAll('.snapaside').length >= 1 && [...document.querySelectorAll('.sdpt')].every((e) => e.getBoundingClientRect().height >= 44));
      const before = (await apiState(page)).trips.filter((x) => x.kind === 'snap').map((x) => x.id);
      await page.click('[data-a="snapmake"]');
      await page.waitForFunction(() => location.hash === '#/', null, { timeout: 30000 }).catch(() => {});
      await page.waitForFunction(() => queue.length === 0, null, { timeout: 60000 }).catch(() => {});
      const st2 = await apiState(page), made = st2.trips.filter((x) => x.kind === 'snap' && !before.includes(x.id)).sort((a, b) => (a.date_from < b.date_from ? -1 : 1));
      const per = made.map((x) => { const ms = st2.media.filter((m) => m.trip === x.id); return { from: x.date_from, n: ms.filter((m) => !(m.mime || '').startsWith('video/')).length, clips: ms.filter((m) => (m.mime || '').startsWith('video/')).map((m) => m.day), stars: ms.filter((m) => m.highlight).length }; });
      ok(daysOk && made.length === 2 && per[0].from === '2025-03-01' && per[0].n === 7 && per[1].from === '2025-05-10' && per[1].n === 5 && per.every((x) => x.stars >= 1) && JSON.stringify(per[0].clips) === '[0]' && !per[1].clips.length,
        `two trips: "a book each" makes two books; the burst sends one photo, the screenshot and the receipt none; each book has its best photo starred; the clip goes to the first trip's first day (${JSON.stringify({ daysOk, per })})`);
      await page.evaluate((xs) => Promise.all(xs.map((x) => fetch('/api/b/trips/' + x, { method: 'DELETE', headers: { 'x-mb': '1' } }))), made.map((x) => x.id));
    }
    await s.ctx.close();
  }
  // #/family without the drawing helper: no character box, no server words, the birth row says what the month is for
  await page.goto(`${BASE}/#/family`); await page.waitForSelector('.famkid');
  const famTx = await page.evaluate(() => document.querySelector('main').textContent);
  ok(await page.locator('.famai').count() === 0 && !/OPENAI|API_KEY|OpenAI/.test(famTx) && await page.locator('.famrow2 .famagenow').count() === await page.locator('.famkid').count()
    && await page.evaluate(() => getComputedStyle(document.querySelector('.famsave')).backgroundColor !== 'rgba(0, 0, 0, 0)'), 'family page: no character box or server words without the drawing helper; a hint under each birth month; a solid save bar');
  // #/emoji: the library from the database — add one with a picture from the phone, it shows in the grid beside a text box, delete it (two taps)
  await page.goto(`${BASE}/#/emoji`); await page.waitForSelector('.emolist');
  ok(await page.locator('.emocard').count() === 71 && await page.locator('.setlist').count() === 0, 'emoji page: the 71 of the library');
  const pic = await sharp({ create: { width: 300, height: 300, channels: 4, background: { r: 30, g: 160, b: 90, alpha: 1 } } }).png().toBuffer();
  await page.setInputFiles('#emfile', { name: 'kanga.png', mimeType: 'image/png', buffer: pic }); await page.waitForSelector('#emprev');
  await page.fill('[data-emf="ch"]', '🦘'); await page.fill('[data-emf="th"]', 'จิงโจ้'); await page.fill('[data-emf="en"]', 'Kangaroo');
  await page.click('[data-a="emoadd"]');
  await page.waitForFunction(() => S.emoji.some((e) => e.ch === '🦘'), null, { timeout: 8000 }).catch(() => {});
  ok(await page.locator('.emocard').count() === 72 && (await page.textContent('.emolist')).includes('Kangaroo') && await page.inputValue('[data-emf="ch"]') === '', 'emoji page: a new one with its picture, the form cleared');
  await page.goto(`${BASE}/#/t/${T}/log/1/all`); await page.waitForSelector('#qtext');
  await page.click('[data-a="emopick"][data-for="qtext"]'); await page.waitForSelector('#emopop');
  ok(await page.locator('#emopop [data-a="emoput"][data-v="🦘"] img.emi[src^="/media/emoji/"]').count() === 1, 'emoji page: the new one is in the grid beside a text box');
  await page.keyboard.press('Escape'); await page.goto(`${BASE}/#/emoji`); await page.waitForSelector('.emolist');
  const kanga = page.locator('.emocard', { hasText: 'Kangaroo' }).locator('[data-a="emodel"]');
  await kanga.click(); await kanga.click();
  await page.waitForFunction(() => !S.emoji.some((e) => e.ch === '🦘'), null, { timeout: 8000 }).catch(() => {});
  ok(await page.locator('.emocard').count() === 71, 'emoji page: deleted with two taps');
  // the book's menu: every card shows the owner's glossy picture, and each picture is there
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.tile');
  const hubPics = await page.evaluate(async () => { const t = [...document.querySelectorAll('main .tile')]; const imgs = t.map((x) => x.querySelector('.e.pic img')).filter(Boolean);
    return { tiles: t.length, pics: imgs.length, ok: (await Promise.all(imgs.map((i) => fetch(i.src).then((r) => r.ok)))).every(Boolean) }; });
  ok(hubPics.tiles >= 8 && hubPics.pics === hubPics.tiles && hubPics.ok, `book menu: all ${hubPics.tiles} cards show a glossy picture, every one loads`);
  // every icon the manifest names exists at its stated size; each shortcut has its own picture; iPhone gets a 180 px icon
  const icons = [...man.icons, ...man.shortcuts.flatMap((s) => s.icons)], sizes = [];
  for (const ic of icons) { const r = await page.request.get(BASE + ic.src); const m = r.ok() ? await sharp(await r.body()).metadata() : {}; sizes.push(`${m.width}x${m.height}` === ic.sizes); }
  const touch = await page.evaluate(() => document.querySelector('link[rel="apple-touch-icon"]').getAttribute('href'));
  const tm = await sharp(await (await page.request.get(BASE + touch)).body()).metadata();
  ok(sizes.every(Boolean) && new Set(man.shortcuts.map((s) => s.icons[0].src)).size === 4 && man.icons.some((i) => i.purpose === 'maskable') && tm.width === 180 && !tm.hasAlpha, 'app icons: every manifest icon at its size, four shortcut pictures, a maskable one, an opaque 180 px iPhone icon');
  await page.goto(`${BASE}/#/t/${T}/log/1/all`); await page.waitForSelector('#qtext');
  // the day as a message for relatives: title line, the quotes in quotation marks, never a link; the button only where the phone can share
  const shTxt = await page.evaluate(() => shareText(trip('hk-macau-2026'), 1));
  ok(shTxt.split('\n').length >= 2 && /“.+”/.test(shTxt) && !/https?:/.test(shTxt) && !/undefined/.test(shTxt), 'share text: title + quotes, no link');
  ok((await page.locator('[data-a="share"]').count()) === (await page.evaluate(() => !!navigator.share) ? 1 : 0), 'share button only when navigator.share exists');
  // the kids' voices: a clip queued like a photo (a stand-in blob — headless has no microphone), uploaded, played on the record page and in the book, kept out of the photo count
  ok(await page.locator('[data-a="rec"]').count() === 1, 'record button on the record page');
  const photosBefore = await page.evaluate(() => stats(trip('hk-macau-2026')).photos);
  await page.evaluate(async () => { await addClip(trip('hk-macau-2026'), 1, new Blob([new Uint8Array(6000).fill(1)], { type: 'audio/webm' }), 4); });
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  await page.waitForSelector('.clips audio');
  const srvClip = (await page.evaluate(async () => (await (await fetch('/api/b/state', { credentials: 'same-origin' })).json()).media)).find((m) => (m.mime || '').startsWith('audio/'));
  ok(!!srvClip && srvClip.day === 1 && (await page.evaluate(() => stats(trip('hk-macau-2026')).photos)) === photosBefore, 'voice memo uploaded (audio/webm) and not counted as a photo');
  await page.fill('.clipcap', 'มีมี่ร้องเพลง'); await page.locator('.clipcap').blur(); await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('#d1');
  ok(await page.locator('.fact').count() >= 2 && await page.locator('.fact b').allTextContents().then((xs) => xs.every((x) => +x > 0)), 'cover: counts only for what the book now holds, none of them zero');
  ok(await page.locator('#d1 .clips audio').count() === 1 && /มีมี่ร้องเพลง/.test(await page.locator('#d1 .clips').textContent()) && await page.locator('#d1 .mosaic img').count() === await page.evaluate(() => mediaOf('hk-macau-2026', 1).length), 'book: the clip plays from the day page with its caption; the photo mosaic is photos only');
  // a video clip (owner, Nov 2026, ≤ 30 s): picked from the gallery, queued like a photo, made small on the server; it plays on the
  // record page and the book's day page with its poster, never counts as a photo, never prints; kid mode's photos page plays it too
  {
    const { execFile } = await import('node:child_process');
    const vf = path.join(OUT, 'clip-ui.mp4');
    await new Promise((res, rej) => execFile('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'testsrc=size=640x360:rate=12', '-f', 'lavfi', '-i', 'sine=frequency=330', '-t', '3', '-c:v', 'libx264', '-preset', 'ultrafast', '-c:a', 'aac', '-shortest', vf], (e) => (e ? rej(e) : res())));
    await page.goto(`${BASE}/#/t/${T}/log/1/all`); await page.waitForSelector('[data-a="pickvideo"]');
    const ph0 = await page.evaluate(() => stats(trip('hk-macau-2026')).photos);
    const [vc] = await Promise.all([page.waitForEvent('filechooser'), page.click('[data-a="pickvideo"]')]);
    await vc.setFiles(vf);
    await page.waitForFunction(() => S.media.some((m) => (m.mime || '').startsWith('video/')), null, { timeout: 15000 });
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 60000 });
    const sv = (await apiState(page)).media.find((m) => (m.mime || '').startsWith('video/'));
    await page.goto(`${BASE}/#/t/${T}/log/1/all`); await page.waitForSelector('.vclip video');
    const recOk = await page.evaluate(() => { const v = document.querySelector('.vclip video'); return !!v && /\/media\/.+\/t$/.test(v.getAttribute('poster') || '') && document.querySelector('.vclip .clipcap') && document.querySelector('.vclip [data-a="delclip"]').getBoundingClientRect().height >= 44; });
    await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('#d1');
    const bookOk = await page.locator('#d1 .vclips.noprint video').count() === 1;
    const posterOk = (await page.request.get(`${BASE}/media/${sv.id}/t`)).headers()['content-type'] === 'image/jpeg';
    ok(!!sv && sv.mime === 'video/mp4' && sv.day === 1 && recOk && bookOk && posterOk && (await page.evaluate(() => stats(trip('hk-macau-2026')).photos)) === ph0,
      `video clip: sent, made into an mp4, plays on the record page (poster, caption, delete) and in the book (not printed), not counted as a photo (${JSON.stringify({ sv: !!sv, recOk, bookOk, posterOk })})`);
  }
  await page.goto(`${BASE}/#/t/${T}/log/1/all`); await page.waitForSelector('.clips audio');
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
  ok((await apiState(page)).media.filter((m) => (m.mime || 'image/jpeg').startsWith('image/')).length === 3, '3 photos uploaded (the voice memo is not a photo)');
  await page.locator('.mosaic button').first().click(); await page.waitForSelector('#lb:not([hidden]) .stage img');
  ok((await page.textContent('#lb .grow')).trim() === '1 / 3', 'lightbox counter 1 / 3');
  await page.click('#lb [data-lb="next"]');
  ok((await page.textContent('#lb .grow')).trim() === '2 / 3', 'next → 2 / 3');
  await page.fill('#lbcap', 'ที่ท่าเรือ'); await page.locator('#lbcap').blur();
  await page.focus('#lbcap'); await page.keyboard.press('ArrowRight'); await page.keyboard.press('ArrowLeft');
  ok((await page.textContent('#lb .grow')).trim() === '2 / 3' && (await page.inputValue('#lbcap')) === 'ที่ท่าเรือ', 'lightbox: arrow keys inside the caption box move the cursor, never the photo (a caption landed on the next photo)');
  await page.locator('#lbcap').blur();
  await page.click('#lb [data-lb="star"]');
  await s.shot('05-lightbox', false);
  await page.click('#lb [data-lb="next"]');
  await page.click('#lb [data-lb="del"]');
  ok((await page.textContent('#lb [data-lb="del"]')).length > 3 && (await page.textContent('#lb .grow')).trim() === '3 / 3', 'first tap only arms delete');
  await page.click('#lb [data-lb="del"]');
  await page.click('#lb [data-lb="close"]');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  st = await apiState(page);
  ok(st.media.filter((m) => (m.mime || 'image/jpeg').startsWith('image/')).length === 2 && st.media.some((m) => m.caption === 'ที่ท่าเรือ' && m.highlight), 'second tap deleted; caption + ⭐ saved');
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
  // the day card: a 1080×1350 picture drawn on the phone from the day's photo, title, words — then shared or downloaded
  await page.locator('#d1 [data-a="daycard"]').click();
  await page.waitForFunction(() => typeof lastCard !== 'undefined' && lastCard, null, { timeout: 15000 });
  const card = await page.evaluate(async () => { const bm = await createImageBitmap(lastCard); return { w: bm.width, h: bm.height, size: lastCard.size, type: lastCard.type }; });
  ok(card.w === 1080 && card.h === 1350 && card.type === 'image/png' && card.size > 20000, `day card: 1080×1350 PNG drawn on the phone (${card.size} bytes)`);
  ok(await page.locator('.first.got .kid.drawn img[src^="/art/kids/mimi-"][src$="-face.webp"]').count() === 1 && await page.locator('#d1 .pill img.face').count() >= 1, 'kid badges and mood pills use the drawn characters');
  ok(await page.locator('#d1 .foot3 h4').count() >= 2, 'day footer: favourite + firsts');
  ok(await s.noHScroll(), 'book: no horizontal scroll at 390 px');
  ok(await page.locator('.journey > *').count() === 6 && await page.locator('.journey > .on').count() === 1, 'book: illustrated route strip, the recorded day in full colour');
  ok(await page.locator('#d1 .hdart').count() === 1, 'day page shows its illustrated stamp');
  await s.shot('04-book');

  await page.goto(`${BASE}/#/t/${T}/plan/full`); await page.waitForSelector('.itin');
  ok(await page.locator('.itin > li').count() === 6 && await page.locator('.itin > li.has').count() === 1, 'whole-trip page: itinerary lists all 6 planned days, the recorded one marked');
  ok((await page.textContent('.itin')).includes('teamLab') && (await page.textContent('.itin')).includes('Taipa'), 'itinerary shows the planned stops (revised HK plan)');

  // every meal has a pick and a backup (manual EN-2); the park map is drawn
  await page.goto(`${BASE}/#/t/${T}/today/1`); await page.waitForSelector('.day.today');
  const bagKeys = await page.$$eval('.bag input[data-ck]', (els) => els.map((e) => e.dataset.ck));
  ok(['kidpp', 'sun', 'pram', 'spare'].every((k) => bagKeys.includes(`${T}.bag.d1.${k}`)) && !bagKeys.includes(`${T}.bag.d1.passports`) && /\d\d:\d\d · /.test(await page.textContent('.bag')), "today page: today's bag lists what the day's plan needs, with the reason (and not the passports on a city day)");
  ok(await page.locator('details.bag:not([open])').count() === 1 && !/0\//.test(await page.textContent('.bag summary')), 'today page before the trip: the bag is one closed line and names how many things, never “0/n packed”');
  await page.click('.bag summary'); await page.check(`.bag input[data-ck="${T}.bag.d1.sun"]`); await page.reload(); await page.waitForSelector('.bag').catch(async (e) => { console.log('DEBUG after reload:', await page.evaluate(() => `${location.hash} · ${document.querySelectorAll('.bag').length} bag · ${(document.querySelector('main') || document.body).innerText.slice(0, 400).replace(/\s+/g, ' ')}`)); await page.screenshot({ path: `${OUT}/debug-bag.png` }); throw e; });
  ok(await page.isChecked(`.bag input[data-ck="${T}.bag.d1.sun"]`), "today page: a tick in today's bag stays after a reload");
  ok(await page.locator('.remind.line [data-a="remind"]').count() === 1 && await page.locator('.remind:not(.line)').count() === 0 && /30/.test(await page.textContent('.remind')), 'today page: one line with a “turn on” button — not a second reminder card (the ask lives on the shelf)');
  const tlRows = await page.$$eval('.tl.plan.brief li div', (els) => els.map((e) => e.textContent));
  ok(tlRows.length > 0 && tlRows.every((x) => !x.endsWith('…')), 'today page: every timeline step is shown whole, never cut with …');
  { const tl = '.tl.plan.brief > li:has(.tsub)';
    const sum = await page.$eval(tl, (li) => [[...li.querySelector('.tmt').childNodes].map((n) => (n.alt || n.textContent)).join('').trim(), getComputedStyle(li.querySelector('.tsub')).display, li.querySelector('[aria-expanded]').getAttribute('aria-expanded')]);
    await page.click(`${tl} .tm`);
    const op = await page.$eval(tl, (li) => [getComputedStyle(li.querySelector('.tsub')).display, li.querySelector('.tsub li').innerText.trim(), li.querySelector('[aria-expanded]').getAttribute('aria-expanded')]);
    ok(/^\p{Extended_Pictographic}/u.test(sum[0]) && sum[0].split(' ').length <= 8 && !sum[0].includes(' · ') && sum[1] === 'none' && sum[2] === 'false' && op[0] === 'block' && op[1].length > 0 && op[2] === 'true', `today page: a timeline step reads as a short summary and a tap opens its details below (${sum[0]} → ${op[1]})`);
    await page.click(`${tl} .tm`); }
  const pickDd = await page.$$eval('.dsheet > div:not(.meal) > dd', (els) => els.map((e) => e.textContent));   // the answer boxes' own rows (the weather must not be one of them, below)
  const pickLi = await page.$$eval('.cbox .tips > li.tk-local', (els) => els.map((e) => e.textContent)), pn = (x) => x.replace(/[\s:—–·.,;()]+/g, '');
  const seedPick = await page.evaluate(() => T(S.trips.find((x) => x.id === 'hk-macau-2026').days[1].plan.pick));
  ok(seedPick.length > 110 && pickLi.length === 1 && pn(pickLi[0]).includes(pn(seedPick)), `today page: the local tip is shown whole under "Good to know today" (it was once cut at 110 characters; ${pn(seedPick).length} letters)`);
  const seedWx = await page.evaluate(() => T(S.trips.find((x) => x.id === 'hk-macau-2026').days[1].wx));
  { // the weather is said once, in the day's header (it used to sit in an answer box too): every piece of the manual's line is there
    const facts = (await page.textContent('.dfacts')).replace(/\s+/g, ' ').toLowerCase();
    const lost = seedWx.split(' · ').map((x) => x.replace(/\s*\([^)]*\)\s*$/, '')).flatMap((x) => x.split(' — ')).filter((x) => { const y = x.trim().toLowerCase(), tm = y.match(/\d{1,2}[:.]\d{2}/); return !(facts.includes(y) || (/sunset|พระอาทิตย์ตก/.test(y) && tm && facts.includes(tm[0]))); });
    ok(seedWx.length > 110 && lost.length === 0 && !pickDd.includes(seedWx), `today page: the weather is whole in the header (no piece cut) and is not repeated in a box (${lost.join(' | ') || 'every piece there'})`); }
  const seedMv = await page.evaluate(() => T(S.trips.find((x) => x.id === 'hk-macau-2026').days[1].plan.moving));
  { // getting around: a long line reads as points (a blob in a narrow column was hard to read), and no piece of it is cut
    const mv = await page.evaluate((seed) => { const box = document.querySelector('.cbox.c-ind'), fold = box.querySelector('details.cmore'), norm = (x) => x.toLowerCase().replace(/\s+/g, ''), txt = norm(fold.textContent);
      const rows = [...box.querySelectorAll(':scope > .dlegs > li')];
      return { points: fold.querySelectorAll('.pts > li').length, lost: seed.split(/\s+·\s+/).filter((x) => !txt.includes(norm(x))), bullets: box.querySelectorAll(':scope > .dlegs .pts').length, rows: rows.length, pins: rows.filter((r) => { const a = r.querySelector('a.navb'); return a && a.getBoundingClientRect().height >= 44; }).length, bed: rows.some((r) => r.classList.contains('dlbed') && /Noah/.test(r.textContent)) }; }, seedMv);
    const walk = await page.evaluate(() => [legIcon('Walk (or a taxi with bags)'), legIcon('Taxi · about HK$130'), legIcon('50 min')].map((h) => (h.match(/alt="([^"]*)"/) || h.match(/>([^<]+)</) || ['', ''])[1]));
    ok(walk[0] !== walk[1] && walk[1] !== '' && walk[2] === '', `a leg's picture is the way of travel its words name first: a walk "or a taxi" is a walk, a taxi a car, a bare duration none (${walk.join(' | ')})`);
    ok(seedMv.length > 110 && mv.points >= 2 && mv.lost.length === 0 && mv.bullets === 0 && mv.rows >= 2 && mv.pins >= 2 && mv.bed,
      `today page: getting around reads like the other boxes — a row a leg with its navigate pin and tonight's bed (${mv.rows} rows, ${mv.pins} pins), no list of bullet points; the manual's whole line waits in the fold, a point a line (${mv.points} points${mv.lost.length ? '; missing: ' + mv.lost.join(' | ') : ''})`); }
  await page.evaluate(() => { ls('remind', 1); render(); });
  ok(await page.locator('.remind.line.on').count() === 1 && await page.locator('.remind [data-a="remind"]').count() === 0 && /✓/.test(await page.textContent('.remind.line.on')) && await page.locator(`.remind.line.on a[href="#/t/${T}/offline"]`).count() === 1, 'today page: once reminders are on, one line says “on ✓” and links to the no-signal page');
  await page.goto(`${BASE}/#/t/${T}/offline`); await page.waitForSelector('.remind.on');
  ok(await page.locator('.remind [data-a="remindtest"]').count() === 1 && await page.locator('.remind [data-a="remind"]').count() === 1, 'offline page: reminders that are on can be tested or turned off there');
  await page.evaluate(() => { ls('remind', null); render(); }); await page.waitForSelector('.remind.line');
  ok(await page.locator('.remind.line [data-a="remind"]').count() === 1 && await page.locator('.remind:not(.line)').count() === 0, 'offline page: when off, the same one line with a “turn on” button — not the card');
  await page.evaluate(() => { ls('remind', null); });
  const badge = await page.evaluate(async () => { const r = await fetch('/badge-96.png'); const sw = await (await fetch('/sw.js')).text(); return r.ok && /badge: '\/badge-96\.png'/.test(sw); });
  ok(badge, 'notifications use a transparent one-colour badge (Android shows an opaque icon as a white square)');
  // the owner: "make it easier to read, not long" — booking timeline as step cards, guide cards with short points
  await page.goto(`${BASE}/#/t/${T}/prep/full`); await page.waitForSelector('.steps');
  ok(await page.locator('.steps > li').count() === 8 && await page.locator('.steps > li.ok').count() === 1 && await page.locator('.steps > li').nth(1).locator('.when').textContent() === 'October · early Oct' && await page.locator('.steps > li').nth(0).locator('.pts > li').count() === 6,
    'prep: the booking timeline is a list of steps — date chip, task, short points (the done one ticked)');
  { const vp = page.viewportSize(); await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForTimeout(200);
    const xs = await page.$$eval('.steps > li', (ls) => [...new Set(ls.map((l) => Math.round(l.getBoundingClientRect().left)))]);
    await page.setViewportSize(vp);
    ok(xs.length === 2, `prep, wide screen: the booking steps read in two columns (${xs.join(' / ')})`); }
  ok(!/no booking|book Nov/.test(await page.locator('.steps').evaluate((e) => e.closest('details').querySelector('.lede').textContent)), 'prep: the booking timeline opens with its date line only (no shredded status list)');
  await page.goto(`${BASE}/#/t/${T}/learn/full`); await page.waitForSelector('.gcards');
  const gl = await page.$$eval('.gcard .pts > li', (els) => els.map((e) => e.textContent.trim()));
  ok(gl.length > 10 && gl.every((x) => !/^[a-z]+(?=[\s,:;]|$)/.test(x)) && await page.locator('.gcard summary b + .gsub').count() === 9, 'learn: guide cards put the headline first and no point starts mid-sentence ("book 3–5 days ahead" → "Book …")');
  { const g = page.locator('.gcard details.ifold').nth(1), body = g.locator('.fb');
    ok(!(await body.isVisible()) && (await g.locator('summary').click(), await body.isVisible()), 'learn: a guide card shows its headline and one-line fact; the explanation opens on a tap'); }
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
  ok(await page.locator(`.hubsearch[href="#/t/${T}/search"]`).count() === 1 && await page.locator('.top .fsb, .top .seg, .top [data-a="lang"]').count() === 0 && await page.locator('.top a[href$="/search"]').count() === 0, 'menu: a big “Search the whole book” bar; the top bar is back · title only — no text-size button, no language switch, no second search icon (owner’s review: six things at 320 px)');
  await page.goto(`${BASE}/#/t/${T}/sos`); await page.waitForSelector('.tp-sos');
  // the lost-child card: numbers kept on the phone, this morning's photo never uploaded, a 1080×1920 picture drawn here
  const reqs = []; page.on('request', (r) => { if (['PUT', 'POST', 'PATCH'].includes(r.method())) reqs.push(r.url()); });
  await page.fill('#lctel0', '+66 81 234 5678');
  await page.click('.lostcard [data-a="lckid"][data-v="mika"]'); await page.waitForSelector('.lostcard [data-a="lckid"][data-v="mika"][aria-pressed="true"]');
  ok(await page.inputValue('#lctel0') === '+66 81 234 5678', 'lost card: the typed number survives a redraw (kept on the phone)');
  await page.setInputFiles('#lcfile', [{ name: 'today.jpg', mimeType: 'image/jpeg', buffer: await jpg(1, 900, 1200) }]); await page.waitForSelector('.lcthumb');
  await page.evaluate(() => { lastCard = null; });
  await page.click('.lostcard [data-a="lostcard"]');
  await page.waitForFunction(() => lastCard, null, { timeout: 15000 }); await page.waitForSelector('#lcprev:not([hidden])');
  const lc = await page.evaluate(async () => { const bm = await createImageBitmap(lastCard); return { w: bm.width, h: bm.height, type: lastCard.type }; });
  ok(lc.w === 1080 && lc.h === 1920 && lc.type === 'image/png' && reqs.length === 0, `lost card: a 1080×1920 lock-screen PNG made on the phone, nothing sent (${reqs.length} uploads)`);
  ok(await page.evaluate(() => (ls('lostTel') || [])[0]) === '+66 81 234 5678' && /stay on this phone/.test(await page.textContent('.lostcard')), 'lost card: the numbers are stored only on this phone, and it says so');
  ok(await page.locator(`.top a[href="#/t/${T}/search"]`).count() === 1, 'inside a topic page the top bar carries a search icon');
  await page.click(`.top a[href="#/t/${T}/search"]`); await page.waitForSelector('#bookq');
  await page.fill('#bookq', 'doctor'); await page.waitForSelector('.sres li');
  ok(/hospital/i.test(await page.textContent('.sres')) && await page.locator('.sres li.k-sos').count() >= 1 && await page.locator('.sres mark').count() >= 1, 'search “doctor”: the emergency section with the hospital line, the hit marked');
  ok(await page.evaluate(() => [...document.querySelectorAll('.sres mark')].every((m) => !/^sick$/i.test(m.textContent))), 'search “doctor” does not drag in the word “sick” (sick bags ≠ a doctor)');
  ok(await page.evaluate(() => { const li = [...document.querySelectorAll('.sres li')]; return li.length > 0 && li.every((x) => x.querySelector('mark') && !/\s·\s\d+$/.test(x.querySelector('b').textContent)); }), 'search results: every card marks its hit, and no title ends in a bare count (“· 10”)');
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
  { // forgiving (owner: "อย่าตึงเกินไป"): nothing as typed → close matches, said so; a word that is found as typed shows no such line
    await page.fill('#bookq', 'disnyland'); await page.waitForTimeout(200);
    const fz = await page.evaluate(() => ({ n: document.querySelectorAll('#bookres .sres li').length, near: !!document.querySelector('#bookres .fznear'), mark: document.querySelectorAll('#bookres mark').length }));
    await page.fill('#bookq', 'senadosquare'); await page.waitForTimeout(200); const op = await page.locator('#bookres .sres li').count();
    await page.fill('#bookq', 'Disneyland'); await page.waitForTimeout(200); const ex = await page.locator('#bookres .fznear').count();
    const nums = await page.evaluate(() => [fzAmount('1,200'), fzAmount('๑๒๐๐'), fzAmount('1.2k'), fzAmount('฿300'), fzAmount('3 พัน'), fzAmount('HK$ 85.50'), fzHeight('1.05 ม.'), fzHeight('105ซม'), fzHeight('๑๐๕')].join());
    ok(fz.n > 0 && fz.near && fz.mark > 0 && op > 0 && ex === 0 && nums === '1200,1200,1200,300,3000,85.5,105,105,105',
      `search forgives a slip and spacing and says the results are close ones; money and heights read the way people type them (${JSON.stringify(fz)} · senadosquare ${op} · ${nums})`); }
  // English reader, Thai word: the snippets stay English; an "If… then…" hit is titled by its situation, not the section name
  await page.fill('#bookq', 'หมอ'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => [...document.querySelectorAll('.sres .ssnip')].every((x) => !/[\u0E00-\u0E7F]/.test(x.textContent))), 'English reader: every snippet is English even when a Thai word found it');
  await page.fill('#bookq', 'lost'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => { const b = [...document.querySelectorAll('.sres li.k-sos b')].map((x) => x.textContent); return b.length > 0 && !b.some((x) => /^If… then…/.test(x)) && b.some((x) => /lost/i.test(x)); }), 'an “If… then…” hit is titled by its situation (a lost child…), not the section name');
  // a lost child is not a lost passport: "เด็กหลง" never surfaces the passport row first (bare "lost" above still does find it)
  await page.fill('#bookq', 'เด็กหลง'); await page.waitForTimeout(150);
  ok(await page.evaluate(() => { const b = document.querySelector('.sres li b'); return !!b && !/passport|พาสปอร์ต/i.test(b.textContent); }), 'search “เด็กหลง”: first hit is the lost-child page, not the lost passport');
  // Enter opens the best hit, and that search comes back as a “recent” chip
  await page.fill('#bookq', 'taxi'); await page.waitForTimeout(150);
  const first = await page.getAttribute('.sres a', 'href'); await page.press('#bookq', 'Enter'); await page.waitForTimeout(300);
  ok(page.url().endsWith(first), `Enter in the search box opens the first hit (${first})`);
  await page.goto(`${BASE}/#/t/${T}/search`); await page.waitForSelector('#bookq');
  ok(await page.locator('.chips.recent .chip[data-v="taxi"]').count() === 1, 'the search that led somewhere is offered again as a recent chip');
  // text size and language live on the shelf's "language and text" card (and the sign-in page) — not in the top bar of every page
  await page.goto(`${BASE}/#/`); await page.waitForSelector('.setlist.disp');
  ok(await page.locator('.top .fsb, .top [data-a="lang"]').count() === 0 && await page.locator('.setlist.disp [data-a="lang"]').count() === 2 && await page.locator('.setlist.disp .fsseg [data-a="fs"]').count() === 4, 'shelf: one card holds ไทย/EN and four Aa of growing size; the top bar holds neither');
  const z = async () => page.evaluate(() => getComputedStyle(document.querySelector('main.wrap')).zoom);
  const z0 = await z(); await page.click('.fsseg [data-v="1"]'); const z1 = await z(); await page.click('.fsseg [data-v="3"]'); const z3 = await z();
  ok(z0 === '1' && z1 === '1.1' && z3 === '1.3' && await page.evaluate(() => document.documentElement.dataset.fs === '3' && localStorage.getItem('mbs_fs') === '3' && document.querySelector('.fsseg [data-v="3"]').getAttribute('aria-pressed') === 'true' && document.querySelector('#fsname').textContent === 'Largest'), `text size: the Aa row sets 110 % / 130 % at once, marks the chosen size and is remembered (${z0} / ${z1} / ${z3})`);
  await page.goto(`${BASE}/#/t/${T}/today`); await page.waitForSelector('.day.today');
  ok(await z() === '1.3' && await s.noHScroll(), 'text size 130 %: today keeps the size and does not overflow the phone');
  await page.goto(`${BASE}/#/t/${T}/prep/full`); await page.waitForSelector('.steps');
  ok(await s.noHScroll(), 'text size 130 %: the booking steps do not overflow');
  await page.goto(`${BASE}/#/`); await page.waitForSelector('.fsseg'); await page.click('.fsseg [data-v="0"]'); ok(await z() === '1', '“Normal” returns to 100 %');
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
  await page.goto(`${BASE}/#/t/${T}/today/1`); await page.waitForSelector('.day.today'); await page.evaluate(() => { const d = document.querySelector('details.dmore'); if (d) d.open = true; });
  ok(await page.locator('.dsheet .meal a.maplink').count() === 0 && await page.locator('.dsheet .meal a.navb[href*="maps/search"]').count() >= 4 && await page.locator('.dsheet .meal b').first().evaluate((b) => !b.querySelector('a') && getComputedStyle(b).textDecorationLine === 'none'), 'today: a meal’s name is plain text with a navigate pin beside it, not an underlined link (owner’s review)');
  { const pins = await page.evaluate(() => { const r = [...document.querySelectorAll('main .navb')].map((a) => a.getBoundingClientRect()).filter((x) => x.height); let over = 0, worst = 0, gap = 99;
      for (let a = 0; a < r.length; a++) for (let b = a + 1; b < r.length; b++) { const ox = Math.min(r[a].right, r[b].right) - Math.max(r[a].left, r[b].left), oy = Math.min(r[a].bottom, r[b].bottom) - Math.max(r[a].top, r[b].top); if (ox > 0 && oy > 0.5) { over++; worst = Math.max(worst, oy); } else if (ox > 0) gap = Math.min(gap, -oy); }
      return { n: r.length, over, worst: Math.round(worst), gap: Math.round(gap * 10) / 10, low: r.filter((x) => x.height < 43.5 || x.width < 43.5).length, two: document.querySelectorAll('.dsheet .meal .nmrow.two').length / 2 }; });
    ok(pins.two === 3 && pins.over === 0 && pins.gap >= 2 && pins.low === 0, `today: a meal and its backup each keep a whole 44 px navigate pin — no two pins on the page overlap (${pins.n} pins, ${pins.two} meals with a backup, ${pins.over} overlapping${pins.over ? ' by up to ' + pins.worst + ' px' : ''}, at least ${pins.gap} px apart)`); }
  { const tip = await page.evaluate(() => { const div = (h) => { const d = document.createElement('div'); d.innerHTML = h; return d; }, bad = []; let days = 0, withTip = 0;
      for (const t of S.trips.filter((x) => /^(hk-macau-2026|big-hop-2027)$/.test(x.id))) t.days.forEach((d, i) => { const pn = (x) => String(x).replace(/[\s:—–·.,;()]+/g, ''), pk = T((d.plan || {}).pick || ''), dom = div(viewToday(t, i, true)), key = pn(pk); days++; if (!pk) return; withTip++;
        const boxes = [...dom.querySelectorAll('.cbox')], meals = boxes.find((b) => b.querySelector('.meal') || /^(Meals|มื้ออาหาร)/.test((b.querySelector('.ch') || {}).textContent || '')), know = boxes.find((b) => /Good to know today|ควรรู้วันนี้/.test((b.querySelector('.ch') || {}).textContent || ''));
        const li = know && know.querySelector('.tips > li.tk-local'), n = know ? know.querySelectorAll('.tips > li').length : 0, said = know ? +((know.querySelector('.cs') || {}).textContent.match(/\d+/) || [0])[0] : 0;
        if ((meals && pn(meals.textContent).includes(key)) || !li || !/^Local tip/.test(li.textContent) || !pn(li.textContent).includes(key) || know.querySelector('.tips > li') !== li || said !== n || n !== ((d.plan || {}).tips || []).length + 1) bad.push(`${t.id} d${i + 1}`); });
      const bk = document.querySelector('.dsheet .meal small.bk'), cs = bk && getComputedStyle(bk);
      return { bad, days, withTip, row: [...document.querySelectorAll('.dsheet dt')].some((x) => /Local pick|ร้านเด็ด/.test(x.textContent)), op: cs && cs.opacity, pin: bk && getComputedStyle(bk.querySelector('.navb')).opacity }; });
    ok(tip.bad.length === 0 && tip.withTip >= 20 && !tip.row, `today: the manual's local tip of the day leads "Good to know today" under its own name and is counted there — never a row of the Meals box (${tip.withTip} of ${tip.days} days ${tip.bad.slice(0, 3).join(' | ') || 'all right'})`);
    ok(tip.op === '1' && tip.pin === '1', `today: a meal's backup line is a colour, not faded with opacity — its navigate pin is as strong as the pick's (opacity ${tip.op} / ${tip.pin})`); }
  ok(await page.locator('.dsheet .meal').count() === 4 && /Hoi Lin Tea House/.test(await page.textContent('.cgrid')) && /Plaza Inn/.test(await page.locator('.dsheet .meal').nth(3).textContent()) && await page.locator('.cgrid > .cbox.dmap:first-child .mapimg img[src="/art/hk/disney-map.svg"]').count() === 1 && await page.locator('.dmap .mapstops li').count() >= 9 && await page.evaluate(() => document.querySelector('.dmap img').getBoundingClientRect().width > 250), 'HK today, Disney day: four meals each with a pick and a backup, and the park map shown as a picture of its own (first box) with our numbered stops');
  await page.locator('.dmap').screenshot({ path: `${OUT}/hk-today-disney-map.png` }).catch(() => {});
  const vp0 = page.viewportSize(); await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForSelector('.cgrid.packed');
  const colH = await page.$$eval('.cgrid.packed > .ccol', (cs) => cs.map((c) => c.offsetHeight));
  ok(colH.length === 2 && Math.abs(colH[0] - colH[1]) < 260 && await page.locator('.cgrid .cbox').count() >= 5 && await page.locator('.cgrid .cbox.cone').count() >= 3, `HK today, wide screen: the boxes (four answer boxes and the one-line ones under them) packed into two columns of near-equal height (${colH.join(' / ')})`);
  { // the eat library: what makes a place easy with a little one is read from its own words and filters in place; a typed rate shows its price roughly in baht
    await page.evaluate(() => localStorage.setItem('mbs_fx', JSON.stringify({ JPY: 0.23 })));
    await page.goto(`${BASE}/#/eats/tokyo`); await page.waitForSelector('.eatc');
    const e0 = await page.evaluate(() => ({ all: document.querySelectorAll('.eatc').length, thb: document.querySelectorAll('.eatc .prthb').length, priced: [...document.querySelectorAll('.eatc')].filter((li) => /¥\s?\d/.test(li.textContent)).length, chips: [...document.querySelectorAll('.ektagbar .chip')].map((b) => b.dataset.v) }));
    await page.locator('.ektagbar .chip').first().click();
    const e1 = await page.evaluate((k) => { const shown = [...document.querySelectorAll('.eatc')].filter((li) => !li.hidden); return { n: shown.length, ok: shown.every((li) => li.dataset.t.split(' ').includes(k)), line: document.querySelector('#eatn').textContent }; }, e0.chips[0]);
    ok(e0.chips.length >= 1 && e1.n >= 1 && e1.n < e0.all && e1.ok && e1.line.includes(String(e1.n)) && e0.priced >= 5 && e0.thb >= e0.priced - 2, `eat library: a "easy with little ones" chip keeps only the places that say so, in place; every place with a yen price shows it roughly in baht from the rate typed on this phone — a place whose page gave no price says "Check the price" (${e0.chips.join(',')} · ${e0.all} → ${e1.n} · ${e0.thb} in baht of ${e0.priced} priced)`);
    await page.evaluate(() => localStorage.removeItem('mbs_fx')); }
  { // explore a town (#/explore, E3): the library's things to do with their ages, the rainy-day filter, a child's age, the wish list ♥ kept on the server, and the town's places to eat in a tab
    await page.goto(`${BASE}/#/explore`); await page.waitForSelector('.xptowns .plchip');
    await page.goto(`${BASE}/#/explore/tokyo`); await page.waitForSelector('.sightc');
    const x0 = await page.evaluate(() => ({ n: document.querySelectorAll('.sightc').length, ages: document.querySelectorAll('.sightc .sages .sa').length, back: (document.querySelector('header.top .ibtn') || {}).getAttribute('href'), sx: document.documentElement.scrollWidth - innerWidth }));
    await page.$eval('[data-a="sightf"][data-v="io"]', (e) => e.click()); await page.waitForFunction(() => document.querySelector('[data-a="sightf"][data-v="io"]').getAttribute('aria-pressed') === 'true');
    const x1 = await page.$$eval('.sightc', (l) => l.length);
    await page.$eval('[data-a="sightf"][data-v="io"]', (e) => e.click());
    const kid = await page.$('[data-a="sightkid"]'); let x2 = x0.n;
    if (kid) { await kid.evaluate((e) => e.click()); await page.waitForFunction(() => document.querySelector('[data-a="sightkid"]').getAttribute('aria-pressed') === 'true'); x2 = await page.$$eval('.sightc', (l) => l.length); await page.$eval('[data-a="sightkid"]', (e) => e.click()); }
    await page.fill('#sightq', 'zzzz-nothing'); const none = await page.evaluate(() => !document.querySelector('#sightnone').hidden && [...document.querySelectorAll('.sightc')].every((li) => li.hidden)); await page.fill('#sightq', ''); await page.evaluate(() => { document.querySelector('#sightq').dispatchEvent(new Event('input', { bubbles: true })); });
    const id = await page.$eval('.sightc .sheart', (b) => { b.click(); return b.dataset.v; });
    await page.waitForFunction((v) => document.querySelector(`.sheart[data-v="${v}"]`) && document.querySelector(`.sheart[data-v="${v}"]`).getAttribute('aria-pressed') === 'true', id);
    // the heart turns on before the server has it (the PUT is still on its way): wait for the server, never one look
    const kept = await page.waitForFunction(async (v) => { const r = await fetch('/api/b/sights?town=tokyo').then((x) => x.json()); return r.sights.find((x) => x.id === v).wish === true; }, id, { timeout: 8000, polling: 250 }).then(() => true, () => false);
    await page.$eval(`.sheart[data-v="${id}"]`, (b) => b.click()); await page.waitForFunction((v) => document.querySelector(`.sheart[data-v="${v}"]`).getAttribute('aria-pressed') === 'false', id);
    await page.goto(`${BASE}/#/explore/tokyo/eat`); await page.waitForSelector('.eatc:not([hidden])'); const eats = await page.$$eval('.eatc', (l) => l.length);
    ok(x0.n >= 15 && x0.ages === x0.n * 4 && x1 >= 3 && x1 < x0.n && x2 <= x0.n && none && kept === true && eats >= 5 && x0.back === '#/explore' && x0.sx <= 0, `explore Tokyo: ${x0.n} things to do with their ages, ${x1} indoors for a rainy day, ${x2} for one child, the search empties in place, ♥ kept on the server, ${eats} places to eat in the tab, back goes to every town (${JSON.stringify({ x0, none, kept })})`);
    await page.screenshot({ path: `${OUT}/explore-tokyo.png` }).catch(() => {});
    // plan a day: built on the phone from the library (a long sight, lunch, a shorter sight, dinner), then carried into the planner
    await page.goto(`${BASE}/#/explore/tokyo/day`); await page.waitForSelector('.bday li');
    const dr = await page.evaluate(() => ({ rows: document.querySelectorAll('.bday li').length, small: [...document.querySelectorAll('.bdayb .btn, .xptabs a')].filter((b) => b.getBoundingClientRect().height < 43.5).length, sx: document.documentElement.scrollWidth - innerWidth }));
    await page.click('[data-a="dayplan"]'); await page.waitForFunction(() => location.hash.startsWith('#/planner'));
    const dp = await page.evaluate(() => ({ dest: pln.a.dest, want: pln.a.want }));
    ok(dr.rows >= 3 && !dr.small && dr.sx <= 0 && /Tokyo|โตเกียว/.test(dp.dest) && dp.want.length > 3, `explore Tokyo, plan a day: ${dr.rows} rows built on the phone, taps 44 px, the day's sights become the plan's "must do" (${JSON.stringify(dp).slice(0, 140)})`); }
  { // today's bag reads the live forecast too: rain → umbrella, a cold morning → a jacket, a hot day → sunscreen, each with its own reason
    const bag = await page.evaluate(() => { const t = S.trips.find((x) => x.id === 'hk-macau-2026'), keep = WX[t.id]; WX[t.id] = { at: Date.now(), days: [null, null, { tmin: 11, tmax: 33, code: 61, pop: 70 }] };
      const r = dayBag(t, 2).filter((x) => ['rain', 'warm', 'sun'].includes(x.k)).map((x) => [x.k, x.why]); WX[t.id] = keep; return r; });
    const why = Object.fromEntries(bag);
    await page.goto(`${BASE}/#/t/hk-macau-2026/prep`); await page.waitForSelector('.docsck');
    await page.locator('.docsck input').first().check(); await page.reload(); await page.waitForSelector('.docsck');
    const dk = await page.evaluate(() => ({ n: document.querySelectorAll('.docsck li').length, on: document.querySelectorAll('.docsck input:checked').length, said: document.querySelector('.docsck summary .label').textContent }));
    ok(dk.n === 8 && dk.on === 1 && /1\/8/.test(dk.said), `prep: the papers to have ready are ticked on this phone and stay ticked (${dk.on}/${dk.n} · ${dk.said})`);
    await page.locator('.docsck input').first().uncheck();
    ok(bag.length === 3 && /70%/.test(why.rain) && /11°C/.test(why.warm) && /33°C/.test(why.sun), `today's bag: the live forecast adds an umbrella, a jacket and sunscreen, each saying why (${bag.map((x) => x.join(': ')).join(' · ')})`); }
  { // a fold opened on a wide screen: the boxes after it change sides so the columns stay near each other; the tapped fold and everything before it stay put
    await page.goto(`${BASE}/#/t/big-hop-2027/today/1`); await page.waitForSelector('details.dmore'); await page.evaluate(() => { document.querySelector('details.dmore').open = true; }); await page.waitForSelector('.cgrid.packed');
    const two = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(r, 60)))));
    const look = () => page.evaluate(() => { const cols = [...document.querySelectorAll('.cgrid.packed > .ccol')], name = (b) => (b.querySelector('.ch') || {}).textContent.trim().replace(/\s+/g, ' ').slice(0, 12), boxes = cols.flatMap((c, k) => [...c.children].map((b) => ({ o: b._o, side: k, h: b.offsetHeight, name: name(b) }))).sort((a, b) => a.o - b.o);
      const all = boxes.reduce((n, x) => n + x.h, 0), cost = (f) => { const r = boxes.reduce((n, x, i) => n + (f(x, i) ? x.h : 0), 0); return Math.max(r, all - r); }; let best = Infinity;
      for (let m = 0; m < 1 << boxes.length; m += 2) best = Math.min(best, cost((x, i) => m >> i & 1));
      const s = [...document.querySelectorAll('.cgrid .cbox details.cmore > summary')].find((x) => /What to order/.test(x.textContent)), r = s.getBoundingClientRect();
      return { sides: boxes.map((x) => x.side).join(''), names: boxes.map((x) => x.name), cost: cost((x) => x.side), best, h: boxes.map((x) => x.h), top: Math.round(r.top), focus: document.activeElement === s, order: cols.every((c) => [...c.children].every((b, i, a) => !i || a[i - 1]._o < b._o)) }; });
    const tap = () => page.evaluate(() => { const s = [...document.querySelectorAll('.cgrid .cbox details.cmore > summary')].find((x) => /What to order/.test(x.textContent)); s.scrollIntoView({ block: 'center' }); s.focus(); });
    await tap(); const a0 = await look();
    await page.evaluate(() => document.activeElement.click()); await two(); const a1 = await look();
    const k = a0.names.findIndex((x) => /^Meals/.test(x)), stay = a0.sides.slice(0, k + 1) === a1.sides.slice(0, k + 1), still = (() => { const r = a1.h.reduce((n, x, i) => n + (a0.sides[i] === '1' ? x : 0), 0); return Math.max(r, a1.h.reduce((n, x) => n + x, 0) - r); })();
    ok(k >= 0 && a1.sides !== a0.sides && stay && a1.top === a0.top && a1.focus && a1.order && still - a1.cost >= 100,
      `today, wide screen: a fold opened in "Meals" deals the boxes after it again (${a0.sides} → ${a1.sides}: the taller column ${still} → ${a1.cost} px); the boxes up to the tapped one keep their columns, the tapped fold does not move on the screen (${a0.top} → ${a1.top} px) and keeps the focus`);
    await page.evaluate(() => document.activeElement.click()); await two(); const a2 = await look();
    await page.evaluate(() => scrollTo(0, 0)); await page.click('.dayseg button[data-v="1"]'); await two(); const a3 = await look();
    await page.click('.dayseg button[data-v="0"]'); await page.evaluate(() => { document.querySelector('details.dmore').open = true; }); await two(); const a4 = await look();   // before the trip "Short" also closes the day's folded glance: open it again to look
    ok(a2.sides === a0.sides && a3.cost === a3.best && a3.sides !== a0.sides && a3.order && a4.sides === a0.sides && await s.noHScroll(),
      `today, wide screen: closing the fold puts the boxes back (${a2.sides}); "Full" deals them all by their open heights — the best split there is (${a3.sides}, taller column ${a3.cost} px of best ${a3.best}) — and "Short" returns to where it began (${a4.sides})`);
    // a big box written late (42 places to eat along the route): the boxes above it move to the other column and the page is scrolled by what the tapped fold moved
    // (in the Thai layout, where the meals box sits above it in its column — in the English one only two one-line boxes do, too little to move)
    await page.evaluate(() => { lang = 'th'; render(); document.querySelector('details.dmore').open = true; }); await page.waitForSelector('.cgrid.packed'); await two();
    const big = (press) => page.evaluate((go) => { const s = [...document.querySelectorAll('.cgrid .cbox.cone details.dfold > summary')].find((x) => /กินตามทาง/.test(x.textContent)); if (go === 1) s.scrollIntoView({ block: 'center' }); if (go === 2) s.click();
      const cols = [...document.querySelectorAll('.cgrid.packed > .ccol')], col = s.closest('.ccol'); return { top: Math.round(s.getBoundingClientRect().top), alone: col.children.length, h: cols.map((c) => c.offsetHeight), y: Math.round(scrollY) }; }, press);
    const b0 = await big(1); await big(2); await two(); const b1 = await big(0);
    await page.evaluate(() => { lang = 'en'; render(); });
    ok(b0.alone > 1 && b1.alone === 1 && Math.abs(b1.top - b0.top) <= 1 && Math.min(...b1.h) > Math.min(...b0.h) + 300 && b1.y < b0.y,
      `today, wide screen: "กินตามทางวันนี้" opened on its own takes a column for itself (${b0.alone} → ${b1.alone} box), the other column grows from ${Math.min(...b0.h)} to ${Math.min(...b1.h)} px, and the tapped fold stays where it was on the screen (${b0.top} → ${b1.top} px, the page scrolled ${b0.y} → ${b1.y})`);
  }
  await page.setViewportSize(vp0); await page.waitForFunction(() => !document.querySelector('.cgrid.packed'));
  await page.goto(`${BASE}/#/t/${T}/eat/d/1`); await page.waitForSelector('.eatday');
  ok(await page.locator('.eatday .daystrip a').count() === 6 && await page.locator('.eatday .daystrip a[aria-current=true]').textContent().then((x) => x.includes('02')) && await page.locator('.emeal').count() === 4 && /Hoi Lin Tea House/.test(await page.locator('.emeal').first().textContent()) && await page.locator('.emeal .erow.bk').count() === 3, 'eat page, day by day: a tab per day, one box per meal with the pick and the backup');
  ok(await page.locator('.enear').count() > 0 && await page.locator('.eatday a.btn.wide[href$="/eat/all"]').count() === 1, 'eat page, day by day: places near the day, then a button to every place');
  await page.goto(`${BASE}/#/t/${T}/prep/full`); await page.waitForSelector('#pocket');
  ok(await page.locator('#pocket .mapimg img[src="/art/hk/disney-map.svg"]').count() === 1, 'get-ready page: the drawn Disneyland map');
  // the kids' adventure passports
  // parent mode: the bar holds the grown-ups' tools; firsts and passports are tiles on the menu
  ok(await page.locator('nav.bar .in > *').count() === 5 && await page.locator('nav.bar a[href$="/eat"]').count() === 1 && await page.locator('nav.bar button[data-a="kidmode"]').count() === 1 && await page.locator('nav.bar a[href="#/passport"]').count() === 0, 'parent bar: menu, today, record, eat, kid mode');
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid');
  ok(await page.locator('.tile[href="#/passport"], .tile[href="#/notebook"]').count() === 0 && !(await page.textContent('header.top .ttl')).includes('Hong Kong') && (await page.textContent('.hubhead h1')).trim().length > 3,
    'book menu: the passports and the travel notebook live on the shelf only; the bar names the app, the book\'s name is said once, in the menu\'s heading');
  await page.goto(`${BASE}/#/t/${T}/offline`); await page.waitForSelector('#packbtn, [data-a="offline"]');
  ok(await page.locator('a[data-a="pdf"]').count() === 0 && await page.evaluate(() => { const h = document.querySelector('main h1'); return !!h && h.getBoundingClientRect().width <= 2 && /Offline|ไม่มีเน็ต/.test(document.querySelector('header.top .ttl').textContent); }),
    'no-signal page: the PDF button lives in the memory book only; the page\'s name is in the bar, not repeated as a heading');
  // one passport per child: a book shown a page at a time — cover · Explorer ID · a visa per trip · missions · map · lists · stickers · trophies · certificate
  // the shelf's card opens the child's cover: a passport a trip (owner, Nov 2026: "แยกเล่มได้ไหม … เป็นหน้าปกแล้วกดแยกเล่มได้")
  await page.goto(`${BASE}/#/passport`); await page.waitForSelector('.ppshelf .ppbk2');
  { const sh = await page.evaluate(() => ({ books: [...document.querySelectorAll('.ppshelf .ppbk2')].map((a) => a.getAttribute('href')), back: document.querySelector('header.top a.ibtn').getAttribute('href'), book: !!document.querySelector('.ppbook') }));
    ok(sh.books.join() === '#/passport/mimi/hk-macau-2026/cover,#/passport/mimi/big-hop-2027/cover' && sh.back === '#/' && !sh.book, `passport: the child's cover holds one passport a trip, oldest first (${JSON.stringify(sh)})`); }
  await page.click('.ppshelf .ppbk2[href*="hk-macau-2026"]'); await page.waitForSelector('.ppbook[data-page="cover"] .pp .advc');
  ok(await page.getAttribute('header.top a.ibtn', 'href') === '#/passport/mimi', 'passport: a book\'s back goes to the child\'s cover');
  { const hd = await page.evaluate(() => { const r = document.querySelector('.ppkids'), ch = [...r.children].map((c) => c.getBoundingClientRect().top); return { kids: r.querySelectorAll('a[role=tab]').length, kidgo: !!r.querySelector('.kidgo'), oneRow: ch.every((y) => Math.abs(y - ch[0]) < 2), print: !!document.querySelector('.ppbody .ppfoot a.ppprint[href^="/api/b/pdf/"]'), topPrint: !!r.querySelector('.ppprint, .ppall') }; });
    ok(hd.kids === 2 && hd.kidgo && hd.oneRow && hd.print && !hd.topPrint, `passport: the children and kid mode in one row above the book, print at the cover's foot (${JSON.stringify(hd)})`); }
  { const tabs = await page.$$eval('.pptabs .ppt', (as) => as.map((a) => a.getAttribute('href').split('/').pop()));
    ok(tabs.join() === 'cover,id,visa-hk-macau-2026,missions,map,lists,stickers,trophies,cert' && await page.locator('.ppbody .mission, .ppbody .pp-page.visa, .ppbody #cert').count() === 0 && await page.locator('.ppturn [data-dir="next"][href$="/id"]').count() === 1,
      `passport book: the pages in order — one trip a book, its own visa — and only one page on screen at a time (${tabs.join()})`); }
  ok(await page.locator('.advc .xbox img[src^="/art/kids/mimi-"][src$="-face.webp"]').count() === 1, 'passport: Mimi drawn as her character on the cover');
  ok(await page.locator('.advc img.crest[src="/art/crest/hk.svg"]').count() === 1 && (await page.textContent('.advc')).includes('DOLPHIN-2026-MIMI'), 'passport cover as printed: crest, title, passport no. per child');
  ok((await page.textContent('.guides')).includes('Captain Pinky') && await page.locator('.guides .bubble img.guide').count() === 2, 'passport cover: the two guides say hello (Captain Pinky)');
  { // a lazy picture loads only near the screen: bring each into view in turn, wait for every one, then name any that did not arrive
    await page.evaluate(async () => { for (const i of document.querySelectorAll('img[src^="/art/"]')) { i.scrollIntoView({ block: 'center' }); await new Promise((r) => setTimeout(r, 30)); } scrollTo(0, 0); });
    await page.waitForFunction(() => Array.from(document.querySelectorAll('img[src^="/art/"]')).every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 8000 }).catch(() => {});
    const bad = await page.evaluate(() => Array.from(document.querySelectorAll('img[src^="/art/"]')).filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')));
    ok(!bad.length, `character, guide and stamp drawings load${bad.length ? ` (not loaded: ${bad.slice(0, 5).join(', ')})` : ''}`); }
  ok(await s.noHScroll(), 'passport cover: no horizontal scroll at 390 px');
  await s.shot('06-passport');
  // the arrow keys turn the pages (a swipe does the same on a phone: sheets.js ppTurn)
  await page.keyboard.press('ArrowRight'); await page.waitForSelector('.ppbook[data-page="id"]');
  ok(await page.locator('.bio .photo img[src^="/art/kids/mimi-"][src$="-face.webp"]').count() === 1 && await page.locator('.ppbody .advc').count() === 0 && /#\/passport\/mimi\/hk-macau-2026\/id$/.test(page.url()), 'passport: → turns to the Explorer ID page (Mimi\'s character on the photo page)');
  await page.keyboard.press('ArrowLeft'); await page.waitForSelector('.ppbook[data-page="cover"]');
  await ppOpen(page, 'mika', 'big-hop-2027', 'cover');
  ok((await page.textContent('.advc')).includes('KOALA-2027-MIKA') && (await page.textContent('.guides')).includes('Ranger Roo'), 'Australia: a passport number per child (KOALA-2027-MIKA), Ranger Roo on the cover');
  await ppOpen(page, 'mimi', T, `visa-${T}`);
  ok(await page.locator('.pp-page.visa').count() === 1 && await page.locator('.dstamp').count() === 6, 'passport: HK visa page, a stamp slot per day');
  ok(await page.locator('.dstamp.on').count() === 1 && await page.locator('.dstamp.new').count() === 1, 'passport: recorded day is stamped (with the stamp animation the first time)');
  ok(await page.locator('.stampbtn').count() === 0, 'passport before the trip: no stamp button for a grown-up (the stamp is the kids\' ceremony on a trip day)');
  await ppOpen(page, 'mimi', T, 'map');
  { await page.click('.mapdays [data-v="3"]'); await page.waitForFunction(() => document.querySelector('.mapsec .kicker').textContent.includes('4'));
    await page.locator('.tmap .pin[data-v="senado"]').dispatchEvent('click'); await page.waitForSelector('#sheet:not([hidden]) .pinacts');
    const hrefs = await page.$$eval('#sheet a', (as) => as.map((a) => a.getAttribute('href')));
    ok(hrefs.some((h) => /maps\/search\/.*Senado%20Square%2C%20Macau/.test(h)) && hrefs.some((h) => /maps\/dir\//.test(h)) && hrefs.includes('#/t/hk-macau-2026/today/3') && await page.locator('.sleep ol a.maplink').count() === 6, 'passport map: day buttons move the kids; a pin opens the real place (Maps + directions + that day’s plan); the list names open Maps');
    { await page.locator('.tmap .pin[data-v="mawan"]').dispatchEvent('click'); await page.waitForSelector('#sheet:not([hidden]) .pinstay');
      ok(/Noah's Ark/.test(await page.textContent('#sheet .pinstays')) && await page.locator('#sheet .pinstay a[href*="maps/dir/"]').count() === 1, 'passport map: a pin lists the night’s stay with directions'); await page.click('#sheet [data-a="closesheet"]'); }
  }
  ok(await page.locator('.sleep li').count() === 6, 'passport: where we go — 6 pins as printed');
  await ppOpen(page, 'mimi', T, 'trophies');
  ok(await page.locator('.bdg').count() === 1 && (await page.textContent('.bdg')).includes('Mickey') && await page.locator('.ppbody .tro:not(.got)').count() === 0 && await page.locator('.ppbody .tro.new').count() === 0, 'passport: Mimi’s first is a badge; the grown-ups see only trophies earned — no wall of grey ones — and looking never takes the child\'s "new!"');
  ok(!(await page.textContent('#app')).match(/\b[A-Z]{1,2}\d{6,9}\b|e-ticket/), 'passport: nothing that looks like a real passport / ticket number');
  await ppOpen(page, 'mimi', T, 'missions');
  ok(await page.locator('.mission').count() === 6, 'passport: a mission per day');
  ok(await page.evaluate(() => getComputedStyle(document.querySelector('#m1 header')).backgroundColor) === 'rgb(252, 231, 241)', 'day 2 mission in the printed pink (#FCE7F1)');
  ok(await page.locator('.mdays .chip').count() === 6 && await page.locator('.mfold[open]').count() === 1 && await page.locator('#m0 .mfold[open]').count() === 1 && await page.evaluate(() => document.documentElement.scrollHeight < 11000), `passport before the trip: day chips, only day 1's mission open (${await page.evaluate(() => document.documentElement.scrollHeight)} px)`);
  await page.click('.mdays [data-a="mday"][data-v="1"]'); await page.waitForSelector('#m1 .mfold[open]');
  ok(await page.locator('.mfold[open]').count() === 1 && await page.locator('.mdays .chip[aria-pressed="true"][data-v="1"]').count() === 1, 'a tap on day 2 opens its mission and folds day 1');
  { // iPad (owner, Nov 2026): the open day takes the whole row, never half of it beside an empty column
    const vp = page.viewportSize(); await page.setViewportSize({ width: 1080, height: 810 }); await page.waitForTimeout(150);
    const w = await page.evaluate(() => [document.querySelector('#m1').getBoundingClientRect().width, document.querySelector('.missions').getBoundingClientRect().width, document.querySelector('#m2').getBoundingClientRect().width]);
    ok(Math.abs(w[0] - w[1]) < 2 && w[2] < w[1] * 0.7, `passport on a tablet: the open day fills the row, the folded ones stay a grid (${w.map(Math.round).join(' / ')})`);
    await page.setViewportSize(vp);
  }
  // the grown-ups' boxes and ticks wait behind ✏️ (parents only, never in kid mode)
  ok(await page.locator('#m1 button[data-a="tick"][data-v="spot.d1.tower"][aria-disabled="true"]').count() === 1 && await page.locator('#m1 .felt button[aria-disabled="true"]').count() === 3, 'passport: ticks are closed until a parent taps ✏️');
  await ppEdit(page, true);
  await page.click('#m1 button[data-a="tick"][data-v="spot.d1.tower"]');
  await page.click('#m1 .felt button[data-v="🤩"]');
  ok(/⭐\s*1/.test(await page.textContent('#m1 .spothd')), 'a found thing is celebrated (⭐ 1), nothing missing is counted');
  await ppOpen(page, 'mimi', T, 'lists');
  ok(await page.locator('#pl-words .tick').count() === 10 && await page.locator('#pl-dimsum .stars').count() === 10, 'lists: Say It Like a Local (10), Dim Sum Tasting Card (stars)');
  { const jr = await page.$$eval('.pljump button[data-a="jump"]', (bs) => bs.map((b) => [b.dataset.v, !!document.querySelector(b.dataset.v)])); ok(jr.some(([v]) => v === '#pl-dimsum') && jr.some(([v]) => v === '#decl') && jr.every(([, f]) => f), `lists: a row jumps to each list (${JSON.stringify(jr)})`); }
  { // a rated dish keeps its whole name on one line beside its picture; 🔊 and the stars go under it (owner's Samsung, Nov 2026: the stars squeezed the name to a word a line)
    const rt = await page.evaluate(() => [...document.querySelectorAll('#pl-dimsum .tick.rate')].map((r) => { const t = r.querySelector('.t').getBoundingClientRect(), st = r.querySelector('.stars').getBoundingClientRect(); return { w: Math.round(t.width / r.getBoundingClientRect().width * 100), below: st.top >= t.bottom - 2 }; }));
    ok(rt.length === 10 && rt.every((x) => x.w >= 60 && x.below), `tasting card: each dish's name takes the line, the stars sit under it (${JSON.stringify(rt.slice(0, 3))})`); }
  await page.click('#pl-dimsum button[data-v="dimsum.eggtart"][data-yum="3"]');
  await page.click('#pl-words button[data-v="words.mhgoi"]');
  await page.fill('.ppf[data-v="decl.eggtarts"]', '7'); await page.locator('.ppf[data-v="decl.eggtarts"]').blur();
  ok(!/Tick \d|0\/|more in/.test(await page.textContent('.ppbody')), 'lists: no "0/27" counters or "tick N more"');
  await ppOpen(page, 'mimi', T, 'id');
  ok(await page.locator('.ppf').count() === 4 && await page.locator('.ppf[placeholder]').count() === 0 && await page.locator('.unitd .unit').count() === 2, 'passport ID: blank boxes (no "e.g." hints), the height boxes show cm beside them');
  await page.fill('.ppf[data-v="superpower"]', 'วิ่งเร็วมาก'); await page.locator('.ppf[data-v="superpower"]').blur();
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  st = await apiState(page);
  ok(st.entries.some((e) => e.id === `${'hk-macau-2026'}.tick.spot.d1.tower.mimi`) && st.entries.some((e) => e.first_key === 'dimsum.eggtart' && e.text === '3') && st.entries.some((e) => e.first_key === 'words.mhgoi'), 'server: mission spot, 3 stars for the egg tart, a word said — for Mimi');
  ok(st.entries.some((e) => e.kind === 'field' && e.first_key === 'decl.eggtarts' && e.text === '7'), 'server: customs declaration answer');
  ok(st.entries.some((e) => e.kind === 'field' && e.text === 'วิ่งเร็วมาก') && st.entries.some((e) => e.id === 'hk-macau-2026.mood.d1.mimi' && e.mood === '🤩'), 'server: superpower answer + “today I felt” (same mood as the record page)');
  await ppEdit(page, false);
  ok(await page.locator('.ppf').count() === 0 && /วิ่งเร็วมาก/.test(await page.textContent('.bio')), 'passport ID: ✏️ off shows the answers as text');
  await ppOpen(page, 'mimi', T, 'missions');
  ok(await page.locator('#m1 .tick.on').count() === 1, 'passport shows the ticks after saving');
  await ppOpen(page, 'mimi', T, 'cert');
  ok(await page.locator('.cert:not(.earned)').count() === 1 && /last day/.test(await page.textContent('#cert')) && !/Tick \d|0\/|more in/.test(await page.textContent('.ppbody')),
    'play, not homework: before the trip the certificate simply waits for the last day');
  ok(await page.locator('.ppturn [data-dir="next"]').count() === 0 && await page.locator('.ppturn [data-dir="prev"][href$="/trophies"]').count() === 1, 'the certificate is the last page');
  for (const k of ['cover', 'id', `visa-${T}`, 'missions', 'map', 'lists', 'stickers', 'trophies', 'cert']) { await ppOpen(page, 'mimi', T, k); if (!(await s.noHScroll())) ok(false, `passport page ${k}: no horizontal scroll at 390 px`); }
  await ppOpen(page, 'mika', T, `visa-${T}`);
  ok(await page.locator('.dstamp.new').count() === 0, 'passport: stamp animation plays once, not on every visit');
  await ppOpen(page, 'mika', T, 'trophies'); ok(await page.locator('.bdg').count() === 0, 'passport: Mika has her own badges (none yet)');
  await ppOpen(page, 'mika', T, 'missions'); ok(await page.locator('.mission .tick.on').count() === 0, 'passport: Mika has her own ticks (none yet)');
  // the little one's edition (seed passport.little): point / touch / sound missions, no words-to-say or explorer list, a new-words page
  ok(await page.locator('#m1 .spot.little button[data-v="little.d1.castle"]').count() === 1 && await page.locator('#m1 .mquiz').count() === 0, 'little edition: Mika points at the castle; no quiz');
  await ppOpen(page, 'mika', T, 'lists');
  ok(await page.locator('#lwords .lwl li').count() === 1 && await page.locator('#pl-words, #pl-master, #decl').count() === 0 && await page.locator('#pl-dimsum').count() === 1,
    'little edition: her own words; no Cantonese words, no explorer list or customs form (the dim sum card stays)');
  await ppEdit(page, true);
  ok(/bye-bye/.test(await page.getAttribute('#lw-mika', 'placeholder')), 'little edition: the word box shows its whole example (quotes do not cut it)');
  await page.fill('#lw-mika', 'บ๊ายบาย'); await page.click('[data-a="littleword"][data-k="mika"]');
  await page.waitForFunction(() => [...document.querySelectorAll('#lwords .lwl li')].some((li) => li.textContent.includes('บ๊ายบาย')), null, { timeout: 5000 });
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  ok((await apiState(page)).entries.some((e) => e.kind === 'quote' && e.child === 'mika' && e.text === 'บ๊ายบาย'), 'little edition: a new word is saved as Mika’s quote (book, PDF and story see it)');
  await ppOpen(page, 'mika', T, 'missions');
  await page.click('button[data-a="tick"][data-v="little.d1.castle"]'); await page.waitForSelector('#m1 .tick.on');
  ok(/⭐\s*1/.test(await page.textContent('#m1 .spothd')), 'little edition: a pointed-at castle gets a star');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  await ppOpen(page, 'mika', T, 'cert'); ok(!(await page.locator('#cert').getAttribute('class')).includes('earned'), 'little edition: the certificate still just waits for the last day');
  await ppOpen(page, 'mika', 'big-hop-2027', 'missions');
  ok(await page.locator('.mission').count() === 16 && await page.locator('#m3 .spot.little button[data-v="little.d3.hop"]').count() === 1 && await page.locator('.mission .spot.little').count() === 16, 'Australia, little edition too: 16 missions, Mika hops like a kangaroo on day 4 — a point/touch/sound mission every day');
  await ppOpen(page, 'mika', 'big-hop-2027', 'lists');
  ok(await page.locator('#pl-words, #pl-master, #decl').count() === 0 && await page.locator('#lwords').count() === 1, 'Australia, little edition: her new-words page, no words-to-say, explorer list or customs form');
  await ppOpen(page, 'mimi', 'big-hop-2027', 'missions');
  ok(await page.locator('.mission .spot.little').count() === 0 && await page.locator('#m3 button[data-v^="spot.d3."]').count() === 4, 'Australia: Mimi keeps her own find-these missions');
  await ppOpen(page, 'mimi', 'big-hop-2027', 'lists'); await page.waitForSelector('.pp.kid-mimi #pl-master');
  {   // the tasting card draws each dish from the food library (owner, Nov 2026: "ต่อรูปใน การ์ดชิมอาหารในพาสปอร์ต"); a dish tasted is a sticker of its picture
    await page.waitForFunction(() => [...document.querySelectorAll('.ticks.food .tick .e img.ge')].every((i) => i.complete), null, { timeout: 8000 }).catch(() => {});
    const taste = await page.evaluate(() => { const t = trip('big-hop-2027'), l = kidLists(t, 'mimi').find((x) => x.yum || x.stars), rows = [...document.querySelectorAll(`#pl-${l.key} .tick`)];
      const pics = rows.filter((r) => { const i = r.querySelector('.e img.ge'); return i && i.naturalWidth > 0 && i.getBoundingClientRect().width >= 32; }).length, plain = rows.filter((r) => !r.querySelector('.e img')).map((r) => r.querySelector('.e').textContent).filter((e) => foodArt(e));   // a dish left as an emoji although the library has it
      const st = stickerSet(t, 'mimi').filter((x) => x.k.startsWith(l.key + '.'));
      const src = (k) => { const i = document.querySelector(`#pl-${l.key} .tick button[data-v="${l.key}.${k}"]`); const im = i && i.closest('.tick').querySelector('.e img.ge'); return im ? im.getAttribute('src') : ''; };
      return { lam: src('lamington'), pie: src('pie'), fish: foodArt('🐟'), snag: foodArt('🌭'), rows: rows.length, pics, plain, stickers: st.length, stickerArt: st.filter((x) => /^\/art\/(food|game)\//.test(x.img || '')).length, sx: document.documentElement.scrollWidth > innerWidth + 1 }; });
    ok(taste.rows >= 8 && taste.pics === taste.rows && /food\/lamington\.webp$/.test(taste.lam) && /food\/meatpie\.webp$/.test(taste.pie) && taste.plain.length === 0 && taste.stickerArt === taste.pics && !taste.sx && taste.fish === '' && /food\/hotdog/.test(taste.snag),
      `passport tasting card: every dish with a picture in the food library is drawn as that picture and its sticker carries it; a dish that names its own picture shows it (the lamington is the chocolate and coconut cube, the meat pie a savoury pie); an animal's picture never stands in for a dish (${JSON.stringify(taste)})`);
    await page.evaluate(() => { const l = kidLists(trip('big-hop-2027'), 'mimi').find((x) => x.yum || x.stars); document.querySelector(`#pl-${l.key}`).scrollIntoView({ block: 'start' }); window.scrollBy(0, -70); }); await s.shot('07c-passport-tasting', false);
  }
  await ppOpen(page, 'mika', 'big-hop-2027', 'map');
  await page.locator('.mapsec').screenshot({ path: path.join(OUT, 'phone-06b-map-au.png') });
  // kid mode: big buttons, locked until a grown-up holds the lock
  await page.evaluate(() => { window.__said = []; Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    speak(u) { window.__said.push(`${u.text}|${u.lang}`); }, cancel() {}, onvoiceschanged: null,
    getVoices: () => ['zh-HK', 'th-TH', 'en-GB', 'pt-PT'].map((l) => ({ lang: l, name: l })) } }); });
  await page.clock.setFixedTime(new Date('2026-12-06T12:00:00+08:00'));   // day 2 of the Hong Kong trip (timers keep running)
  await page.goto(`${BASE}/#/t/${T}/today`); await page.waitForSelector('.day.today');
  ok(/Disneyland/.test(await page.textContent('.day.today h3')) && await page.locator('.daystrip a[aria-current="true"] .today').count() === 1 && await page.locator('.daystrip a').nth(1).getAttribute('aria-current') === 'true'
    && await page.locator('.day.today .tag').count() === 1 && await page.locator('.call.info').count() === 0 && await page.locator('nav.bar a[href$="/log/1"]').count() === 1 && await page.locator('.quick a[href*="/log/"]').count() === 0 && await page.locator('details.dmore').count() === 0 && await page.locator('details.bag:not([open])').count() === 1 && await page.locator('.mission').count() === 1, 'HK on day 2: Today opens Disneyland day by itself, marked “Today” in the strip, no countdown banner, Record goes to day 2');
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid');
  ok(/(Day 2 of 6|วันที่ 2)/.test(await page.textContent('.tile.today')), 'HK on day 2: the menu’s Today tile names day 2');
  await page.goto(`${BASE}/#/passport/mimi/${T}`); await page.waitForSelector('.kidgo');
  { // owner's Samsung, Nov 2026: "จะพิมพ์แล้ว keyboard เด้งหาย" — the keyboard shrinks the screen's height, and the resize re-packed the
    // passport's pages, moving the box under the focused field, which closed the keyboard
    await ppOpen(page, 'mimi', T, 'id'); const vs = page.viewportSize(); await page.focus('input.ppf'); await page.setViewportSize({ width: vs.width, height: Math.round(vs.height * 0.55) }); await page.waitForTimeout(400);
    const kept = await page.evaluate(() => !!(document.activeElement && document.activeElement.matches('input.ppf')));
    await page.setViewportSize(vs); await page.waitForTimeout(300);
    ok(kept, `passport: a field keeps the focus when the keyboard shrinks the screen (focused: ${await page.evaluate(() => document.activeElement && document.activeElement.className)})`); }
  await page.click('.kidgo'); await page.waitForSelector('.kidwrap .kidtiles');
  ok(await page.locator('.kidtiles button').count() === 35 && await page.locator('.kidtiles button[data-v$="/dish"]').count() === 1 && await page.locator('.kidtiles button[data-v$="/wear"]').count() === 1 && await page.locator('.kidtiles button[data-v$="/map"], .kidtiles button[data-v$="/stickers"], .kidtiles button[data-v$="/trophies"]').count() === 0 && await page.locator('.kidbar button[data-v$="/map"]').count() === 1 && await page.locator('.kidtiles button[data-v$="/animals"]').count() === 1 && await page.locator('.kidtiles button[data-v$="/quiz"]').count() === 1 && await page.locator('nav.bar').count() === 0, 'kid mode on the trip: 35 big tiles (what dish is this, what comes first, what\'s missing, spot the difference, green light red light, dress up, colour, draw, find, stamp, say, quiz, photos, match, shadows, feed me, colours, animal sounds, bath time, big & small, maze, where, odd one out, what next, copy the tune, join the dots, how many, cake, mood, animals & friends, count… — map, stickers and trophies only on the kid bar), no tab bar');
  ok(await page.evaluate(() => { const mm = window.matchMedia; window.matchMedia = () => ({ matches: false }); celebrate(); window.matchMedia = mm; const n = document.querySelectorAll('.confetti').length; return n === 36 && [...document.querySelectorAll('.confetti')].every((c) => getComputedStyle(c).position === 'fixed'); }), 'kid mode: the big celebration drops 36 pieces of confetti over the whole screen (stamp, surprise box, a finished game)');
  await page.goto(`${BASE}/#/kid/mimi/bubbles`); await page.waitForSelector('#bubblefield'); await page.waitForSelector('.bub');
  await page.locator('.bub').first().dispatchEvent('pointerdown');
  ok(await page.evaluate(() => document.querySelector('#bubscore').textContent === '1'), 'kid mode: bubbles float up and a tap pops one (the score counts the pops)');
  // iPad owner, Nov 2026: leaving the bubbles another way (back gesture, browser back) and coming back left an empty field — bubbles must come back
  await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('.kidtiles');
  await page.goto(`${BASE}/#/kid/mimi/bubbles`); await page.waitForSelector('#bubblefield'); await page.waitForTimeout(1600);
  ok(await page.locator('.bub').count() > 0, 'bubbles: a second visit (left by the back gesture) blows bubbles again');
  // iPad owner, Nov 2026 (iPadOS 17): the field stayed empty — the CSS rise never played, so every bubble waited under the field. The rise is
  // a Web Animation in px now, and the bubbles must actually be inside the field to be seen
  ok(await page.waitForFunction(() => { const f = document.querySelector('#bubblefield').getBoundingClientRect(), bs = [...document.querySelectorAll('.bub:not(.pop)')];
    return bs.length > 0 && bs.every((b) => b.classList.contains('wa') && b.getAnimations().length === 1 && getComputedStyle(b).animationName === 'none') && bs.some((b) => { const r = b.getBoundingClientRect(); return r.top < f.bottom - 10 && r.bottom > f.top; }); }, null, { timeout: 5000 }).then(() => true, () => false),
  'bubbles: they rise by the Web Animations API (not the CSS keyframes iPad Safari left unplayed) and are seen inside the field');
  await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('.kidtiles');
  const lateBub = await page.evaluate(async () => {   // a field drawn a moment after the timer starts still gets bubbles
    clearInterval(bubT); bubT = 0; startBubbles(); await new Promise((r) => setTimeout(r, 900));
    const f = document.createElement('div'); f.id = 'bubblefield'; f.className = 'bubblefield'; document.querySelector('main, #app, body').appendChild(f);
    await new Promise((r) => setTimeout(r, 1000)); const n = f.querySelectorAll('.bub').length; clearInterval(bubT); bubT = 0; bubN = 0; f.remove(); return n; });
  ok(lateBub > 0, `bubbles: a field drawn late (after the timer's first tick) still fills with bubbles (${lateBub})`);
  // three quiet games (owner, Nov 2026): a wrong tap wobbles and keeps the round, the right ones play every round through to a win and two stars
  const gamePics = {};
  {   // set 6: every thing a game can show has the app's own picture — a round never mixes pictures and emoji
    const miss = await page.evaluate(() => { const E = /[\u{1F300}-\u{1FAFF}\u2600-\u27BF\u2B50]/gu, has = (e) => !!GAME_ART[String(e).replace(/\uFE0F/g, '')];
      const pools = { SHADOWS: SHADOWS.map((x) => x[0]), FEED_PALS: FEED_PALS.map((x) => x[0]), FOODS: FOODS.map((x) => x[0]), SORT: SORT_COLS.flatMap((c) => c.e), ODD: ODD_GROUPS.flatMap((g) => g.e), NEXT_E, HM_E, WHERE_E, HIDE: HIDE_POOL.map((x) => x[0]),
        MAZE: MAZE_PAIRS.flatMap((x) => [x[0], x[1]]), FARM: FARM.map((x) => x[0]), WASH: WASH.map((x) => x[0]), SIMON: SIMON.map((x) => x[1]), CAKE: CAKE_TOPS };
      return Object.entries(pools).flatMap(([k, v]) => v.filter((e) => !has(e)).map((e) => `${k}:${e}`)); });
    ok(miss.length === 0, `kid games: every animal, food and thing in the games' lists has its own picture (missing: ${miss.join(' ') || 'none'})`);
    const artBad = await page.evaluate(async () => { const out = []; for (const f of [...new Set(Object.values(GAME_ART))]) { const r = await fetch(`/art/${f}.webp`); if (!r.ok || !/image\/webp/.test(r.headers.get('content-type') || '')) out.push(f); } return out; });
    const foodLib = await page.evaluate(() => ({ n: Object.values(GAME_ART).filter((v) => v.startsWith('food/')).length, ramen: gE('🍜'), tea: gE('☕️'), plain: gE('🧿') }));
    ok(artBad.length === 0 && foodLib.n === 60 && /food\/noodles\.webp/.test(foodLib.ramen) && /food\/hotdrink\.webp/.test(foodLib.tea) && foodLib.plain === '🧿',
      `kid pictures: every picture the games name is served, the food library holds 60 dishes, a book's ramen and tea draw as pictures and an emoji without one stays an emoji (bad: ${artBad.join(' ') || 'none'}, ${foodLib.n})`);
    // a dish named in a book finds its own picture by its name (either language), and every such picture is served
    const dishes = await page.evaluate(async () => { const bad = []; for (const [, n] of DISH_ART) { const r = await fetch(`/art/food/${n}.webp`); if (!r.ok) bad.push(n); }
      return { bad, ramen: foodArt('🍜', '', 'Tempura เทมปุระ'), th: foodArt('🥘', '', 'ต็อกบกกี'), pho: foodArt('🍜', '', 'Phở bò'), photo: dishArt('Photo stop'), tart: dishArt('Egg tart 蛋撻'), rice: dishArt('ข้าวมันไก่'), own: foodArt('🍜', 'food/noodles', 'Ramen') }; });
    ok(!dishes.bad.length && /tempura\.webp/.test(dishes.ramen) && /pho\.webp/.test(dishes.pho) && /tteokbokki\.webp/.test(dishes.th) && dishes.photo === '' && dishes.tart === 'food/eggtart' && dishes.rice === 'food/chickenrice' && /noodles\.webp/.test(dishes.own),
      `dish pictures by name: Tempura → tempura, Phở → pho, ต็อกบกกี → tteokbokki, "Photo" is not phở, a book's own art wins (${JSON.stringify(dishes)})`);
  }
  for (const [gm, sel] of [['shadow', '.shbig'], ['feed', '.feedpal'], ['sort', '.baskets'], ['bigsmall', '.bsrow'], ['where', '.whereb'], ['odd', '.oddch'], ['next', '.nextrow'], ['howmany', '.hmbox']]) {
    await page.goto(`${BASE}/#/kid/mimi/${gm}`); await page.waitForSelector(sel);
    await page.waitForFunction(() => [...document.querySelectorAll('img.ge')].every((i) => i.complete), null, { timeout: 8000 }).catch(() => {});
    gamePics[gm] = await page.evaluate(() => { const im = [...document.querySelectorAll('.kidwrap img.ge')]; return [im.length, im.filter((i) => i.naturalWidth > 0 && i.getBoundingClientRect().width >= 20).length]; });
    await s.shot(`09-g-${gm}`, false);
    const st0 = await page.evaluate(() => stars('mimi'));
    const wrongV = await page.evaluate(() => { const right = kg.game === 'sort' ? kg.items[kg.n].k : kg.game === 'bigsmall' ? String(kg.r.right) : kg.game === 'where' ? String(kg.r.pos) : kg.game === 'odd' ? kg.r.one : kg.game === 'next' ? kg.r.answer : kg.game === 'howmany' ? String(kg.r.n) : kg.r.want[0]; const b = [...document.querySelectorAll('[data-a="kgpick"]')].find((x) => x.dataset.v !== right); return b && b.dataset.v; });
    await page.click(`[data-a="kgpick"][data-v="${wrongV}"]`);
    const kept = await page.evaluate(() => kg.n === 0 && !kg.got);
    for (let k = 0; k < 40 && !(await page.evaluate(() => kg.done)); k++) {
      const right = await page.evaluate(() => (kg.got ? null : kg.game === 'sort' ? kg.items[kg.n].k : kg.game === 'bigsmall' ? String(kg.r.right) : kg.game === 'where' ? String(kg.r.pos) : kg.game === 'odd' ? kg.r.one : kg.game === 'next' ? kg.r.answer : kg.game === 'howmany' ? String(kg.r.n) : kg.r.want[0]));
      if (right) await page.click(`[data-a="kgpick"][data-v="${right}"]`);
      await page.waitForTimeout(right && gm === 'sort' ? 60 : 250);
    }
    const end = await page.evaluate(() => ({ done: kg.done, again: !!document.querySelector('[data-a="kgagain"]') && !!document.querySelector('[data-a="kglv"].kidbig'), gained: stars('mimi') }));
    ok(kept && end.done && end.again && end.gained - st0 === 2, `kid game ${gm}: a wrong tap keeps the round, the right ones finish it with two stars and "play again" (${JSON.stringify({ kept, ...end, st0 })})`);
    if (gm === 'shadow') {   // levels (owner, Nov 2026: "ทำเกมส์เชาว์ให้มีหลายด่านขึ้น"): Mimi starts at level 2; winning it offers level 3, which asks with four pictures
      const nextBtn = page.locator('[data-a="kglv"][data-v="3"].kidbig');
      const hadNext = await nextBtn.count() === 1; if (hadNext) await nextBtn.click();
      await page.waitForSelector('.lvbar');
      const lv = await page.evaluate(() => ({ at: kg.at, opts: kg.r.opts.length, chips: document.querySelectorAll('.lvbar .lvc').length, on: document.querySelector('.lvc.on').dataset.v, won: document.querySelectorAll('.lvc i').length, l1: document.querySelector('.lvc[data-v="1"]').classList.contains('won') }));
      ok(hadNext && lv.at === 3 && lv.opts === 4 && lv.chips === 3 && lv.on === '3' && lv.won === 1 && lv.l1 === false, `kid levels: a won level opens the next (level 3: four pictures; three chips, a star only on level 2 — the one played and won; level 1, skipped by starting at 2, wears none) (${JSON.stringify({ hadNext, ...lv })})`);
      // the levels start again (owner, Nov 2026: "อันนี้จะล้างยังไง"): a tap on "Level" does nothing, a grown-up's 1.5 s hold goes back to the start
      const rb = await page.locator('.lvbar .lvreset').boundingBox();
      await page.mouse.click(rb.x + rb.width / 2, rb.y + rb.height / 2); await page.waitForTimeout(300);
      const tapKept = await page.evaluate(() => document.querySelectorAll('.lvbar .lvc').length === 3 && /press and hold|กดค้าง/i.test(document.getElementById('toast').textContent));   // a tap says how (owner: "ยังล้างไม่ได้เลย")
      await page.mouse.move(rb.x + rb.width / 2, rb.y + rb.height / 2); await page.mouse.down(); await page.waitForTimeout(1800); await page.mouse.up();
      await page.waitForFunction(() => kg && kg.at === 2, null, { timeout: 3000 }).catch(() => {});
      const rs = await page.evaluate(() => ({ at: kg.at, chips: document.querySelectorAll('.lvbar .lvc').length, saved: JSON.stringify((ls('lv_mimi') || {}).shadow || null) }));
      ok(tapKept && rs.at === 2 && rs.chips === 2 && /"at":2/.test(rs.saved), `kid levels: a tap on "Level" keeps them and says to press and hold, a grown-up's long press starts the game where a new player starts (level 2 for Mimi, two chips) (${JSON.stringify({ tapKept, ...rs })})`);
      // every game at once: the hold button at the foot of the adventure map (owner: "ล้างได้ทุกเกมพร้อมกันไหม")
      const lvKeep = await page.evaluate(() => ls('lv_mimi'));
      await page.evaluate(() => ls('lv_mimi', { shadow: { at: 4, best: 3 }, match: { at: 3, best: 2 } }));
      await page.goto(`${BASE}/#/kid/mimi/quest`); await page.waitForSelector('.lvreset[data-g="*"]');
      await page.locator('.lvreset[data-g="*"]').scrollIntoViewIfNeeded(); await page.waitForTimeout(200);
      const ab = await page.locator('.lvreset[data-g="*"]').boundingBox();
      await page.mouse.move(ab.x + ab.width / 2, ab.y + ab.height / 2); await page.mouse.down(); await page.waitForTimeout(1800); await page.mouse.up();
      await page.waitForFunction(() => !ls('lv_mimi') && !document.querySelector('.lvreset[data-g="*"]'), null, { timeout: 3000 }).catch(() => {});
      const ar = await page.evaluate(() => ({ lv: ls('lv_mimi'), btn: !!document.querySelector('.lvreset[data-g="*"]') }));
      ok(!ar.lv && !ar.btn, `kid levels: the adventure map's grown-up button starts every game's levels again at once (${JSON.stringify(ar)})`);
      await page.evaluate((v) => ls('lv_mimi', v), lvKeep);
      await page.goto(`${BASE}/#/kid/mimi/shadow`); await page.waitForSelector('.lvbar');
    }
  }
  // animal sounds (owner, Nov 2026: more games + scenes): every animal taps where it is drawn (a pressed kid button scales — the centring must not
  // live in transform), and all of them heard = one star; bath time: scrubbing the mud canvas clean shows "next friend"
  await page.goto(`${BASE}/#/kid/mimi/farm`); await page.waitForSelector('.farmfield .fa');
  const fs0 = await page.evaluate(() => stars('mimi'));
  for (let n = 0; n < 9; n++) await page.click(`.farmfield .fa[data-v="${n}"]`);
  await page.waitForFunction(() => farm && farm.done, null, { timeout: 4000 }).catch(() => {});
  const farmR = await page.evaluate(() => ({ heard: farm.heard.size, done: farm.done, scene: document.querySelector('.kidwrap').classList.contains('sc-farm') }));
  ok(farmR.heard === 9 && farmR.done && farmR.scene && await page.evaluate((s0) => stars('mimi') - s0, fs0) === 1, `kid game farm: every animal answers a tap on the farm scene, all nine heard = one star (${JSON.stringify(farmR)})`);
  await page.goto(`${BASE}/#/kid/mimi/wash`); await page.waitForSelector('#washbox canvas.mud');
  const mudBox = await page.locator('#washbox canvas.mud').boundingBox();
  for (let y = mudBox.y + 10; y < mudBox.y + mudBox.height && !(await page.evaluate(() => wash.clean)); y += 22) { await page.mouse.move(mudBox.x + 4, y); await page.mouse.down(); for (let x = mudBox.x + 4; x < mudBox.x + mudBox.width; x += 28) await page.mouse.move(x, y); await page.mouse.up(); }
  await page.waitForSelector('[data-a="washnext"]', { timeout: 3000 }).catch(() => {});
  ok(await page.evaluate(() => wash.clean) && await page.locator('[data-a="washnext"]').count() === 1 && await page.locator('#washbox canvas.mud').count() === 0, 'kid game wash: scrubbing the mud canvas cleans the animal and offers the next friend');
  // the maze (owner, Nov 2026: "ลากเส้นหาทางออก"): a wall stops the finger, the way out is drawn by dragging along it, a win opens level 3
  ok(Object.keys(gamePics).length === 8 && Object.values(gamePics).every(([n, okN]) => n > 0 && n === okN), `kid games: the pick games draw their things as loaded pictures (${JSON.stringify(gamePics)})`);
  await page.goto(`${BASE}/#/kid/mimi/maze`); await page.waitForSelector('#mazeb .mz');
  await page.waitForFunction(() => [...document.querySelectorAll('#mazeb img.ge')].every((i) => i.complete), null, { timeout: 8000 }).catch(() => {});
  ok(await page.evaluate(() => { const im = [...document.querySelectorAll('#mazeb img.ge')]; return im.length >= 2 && im.every((i) => i.naturalWidth > 0 && i.getBoundingClientRect().width >= 20); }), 'kid maze: the animal and its goal are pictures');
  await s.shot('09-g-maze', false);
  const route = await page.evaluate(() => { const n = mz.n, prev = { 0: -1 }, q = [0]; while (q.length) { const c = q.shift(); for (const d of [c - n, c + n, c - 1, c + 1]) if (d >= 0 && d < n * n && !(d in prev) && mazeOpen(c, d)) { prev[d] = c; q.push(d); } } const out = []; for (let c = n * n - 1; c !== -1; c = prev[c]) out.unshift(c); return out; });
  const wallStops = await page.evaluate(() => { const n = mz.n, shut = [1, n].find((d) => !mazeOpen(0, d)); if (shut === undefined) return true; mazeTry(shut); const kept = mz.path.length === 1; return kept; });
  const mzAt = async (i) => { const b = await page.locator(`#mazeb .mz[data-i="${i}"]`).boundingBox(); return [b.x + b.width / 2, b.y + b.height / 2]; };
  await page.locator('#mazeb').scrollIntoViewIfNeeded();
  let [mx, my] = await mzAt(route[0]); await page.mouse.move(mx, my); await page.mouse.down();
  for (const i of route.slice(1)) { [mx, my] = await mzAt(i); await page.mouse.move(mx, my, { steps: 3 }); }
  await page.mouse.up(); await page.waitForSelector('[data-a="kglv"].kidbig', { timeout: 3000 }).catch(() => {});
  ok(route.length > 1 && wallStops && await page.evaluate(() => mz.done && mz.n === 4) && await page.locator('[data-a="kglv"][data-v="3"].kidbig').count() === 1, `kid game maze: a wall stops the path, dragging along the way out wins the 4×4 maze and opens level 3 (${route.length} cells)`);
  // copy the tune, join the dots, decorate a cake (owner, Nov 2026: "ทำเกมส์เพิ่มอีก")
  await page.goto(`${BASE}/#/kid/mimi/simon`); await page.waitForSelector('#simonb .spad');
  await page.click('[data-a="simonplay"]'); await page.waitForFunction(() => sm.turn === 'you', null, { timeout: 15000 });
  const wrongPad = await page.evaluate(() => (sm.seq[0] + 1) % 4); await page.click(`#simonb .spad[data-v="${wrongPad}"]`);
  const replays = await page.evaluate(() => sm.turn !== 'you' && sm.n === 0);
  for (let round = 0; round < 6 && !(await page.evaluate(() => sm.done)); round++) {
    await page.waitForFunction(() => sm.turn === 'you' || sm.done, null, { timeout: 15000 }); if (await page.evaluate(() => sm.done)) break;
    for (const v of await page.evaluate(() => sm.seq.slice())) await page.click(`#simonb .spad[data-v="${v}"]`);
  }
  await page.waitForSelector('[data-a="kglv"].kidbig', { timeout: 5000 }).catch(() => {});
  ok(replays && await page.evaluate(() => sm.done && sm.lv.len === 3) && await page.locator('[data-a="kglv"][data-v="3"].kidbig').count() === 1, 'kid game simon: a wrong note plays the tune again; playing back three 3-note tunes wins level 2 and opens level 3');
  {   // the same note twice must read as two: the pad goes dark between notes and the row under the pads shows the animal twice
    await page.click('[data-a="simonagain"]'); await page.waitForSelector('#simtrack');
    await page.evaluate(() => { sm.seq = [2, 2, 1]; const el = document.querySelector('#simtrack'); el.outerHTML = simTrackHtml(3); });
    const darks = await page.evaluate(() => new Promise(res => { let seen = 0, wasLit = false; const p = document.querySelector('#simonb .spad[data-v="2"]'); const iv = setInterval(() => { const l = p.classList.contains('lit'); if (wasLit && !l) seen++; wasLit = l; }, 20); document.querySelector('[data-a="simonplay"]').click(); setTimeout(() => { clearInterval(iv); res(seen); }, 1900); }));
    await page.waitForFunction(() => sm.turn === 'you', null, { timeout: 8000 });
    await page.click('#simonb .spad[data-v="2"]'); await page.click('#simonb .spad[data-v="2"]');
    const row = await page.evaluate(() => [...document.querySelectorAll('#simtrack i')].map(i => (i.querySelector('img.ge') ? i.dataset.v : '')).join('|'));
    ok(darks >= 2 && /^(.+)\|\1\|$/.test(row), `kid game simon: a repeated note flashes twice and fills two slots (dark gaps ${darks}, row ${row})`);
    {   // set 5: the games' animals and foods are the app's own pictures, the size of the emoji they replace
      await page.waitForFunction(() => [...document.querySelectorAll('#simonb img.ge')].every((i) => i.complete), null, { timeout: 8000 }).catch(() => {});
      const pads = await page.evaluate(() => [...document.querySelectorAll('#simonb .spad img.ge')].map((i) => [i.naturalWidth > 0, Math.round(i.getBoundingClientRect().width)]));
      await page.goto(`${BASE}/#/kid/mimi/farm`); await page.waitForSelector('.farmfield .fa');
      await page.waitForFunction(() => [...document.querySelectorAll('.farmfield img.ge')].every((i) => i.complete), null, { timeout: 8000 }).catch(() => {});
      const farmPics = await page.evaluate(() => [...document.querySelectorAll('.farmfield .fa img.ge')].filter((i) => i.naturalWidth > 0 && i.getBoundingClientRect().width >= 50).length);
      await page.goto(`${BASE}/#/kid/mimi/feed`); await page.waitForSelector('.feedpal');
      await page.waitForFunction(() => [...document.querySelectorAll('.feedpal img.ge, .kgch img.ge')].every((i) => i.complete), null, { timeout: 8000 }).catch(() => {});
      const feed = await page.evaluate(() => ({ pal: !!document.querySelector('#kgpal img.ge'), want: !!document.querySelector('#kgwant img.ge'), opts: document.querySelectorAll('.kgch button').length, pics: [...document.querySelectorAll('.kgch button img.ge')].filter((i) => i.naturalWidth > 0).length }));
      await s.shot('09-kid-feed', false);
      await page.goto(`${BASE}/#/kid/mimi/farm`); await page.waitForSelector('.farmfield .fa'); await s.shot('09-kid-farm', false);
      await page.goto(`${BASE}/#/kid/mimi/wash`); await page.waitForSelector('.washbox .wa');
      const washPic = await page.evaluate(() => { const i = document.querySelector('.washbox .wa img.ge'); return i ? Math.round(i.getBoundingClientRect().width) : 0; });
      ok(pads.length === 4 && pads.every((x) => x[0] && x[1] >= 50) && farmPics === 9 && feed.pal && feed.want && feed.opts > 0 && feed.pics === feed.opts && washPic >= 150 && await s.noHScroll(),
        `kid games: the tune pads, the nine farm animals, the hungry animal with its wish and foods, and the bath's animal are the app's own pictures (${JSON.stringify({ pads, farmPics, feed, washPic })})`);
      await page.goto(`${BASE}/#/kid/mimi/simon`); await page.waitForSelector('#simonb');
    }
  }
  {   // the top levels (owner, Nov 2026: "ด่านเยอะขึ้น ยากขึ้น"): every game opens at its last level with its twist, fits the phone, and the chips show them all
    const saved = await page.evaluate(() => ls('lv_mimi'));
    const counts = await page.evaluate(() => { const o = {}; Object.keys(LV).forEach((g) => { o[g] = { at: LV[g].length, best: LV[g].length - 1 }; }); ls('lv_mimi', o); return Object.fromEntries(Object.keys(LV).map((g) => [g, LV[g].length])); });
    ok(Object.entries(counts).every(([g, n]) => n === (g === 'jigsaw' ? 9 : 10)), `kid levels: ten levels a game, nine for the jigsaw (${JSON.stringify(counts)})`);
    const CHECK = {
      shadow: () => kg.lv.half && !!document.querySelector('.shbig.half') && kg.r.opts.length >= 7,
      feed: () => kg.lv.mem && !!document.querySelector('.feedpal.mem #kgwant') && kg.r.opts.length === 9,
      sort: () => kg.cols.length === 6 && document.querySelectorAll('.basket').length === 6 && kg.items.length === 22,
      bigsmall: () => document.querySelectorAll('.bsrow button').length === 6,
      where: () => kg.r.mode === 'two' && kg.r.steps.length === 2 && !!document.querySelector('.wheretake'),
      odd: () => kg.r.opts.length === 9 && document.querySelectorAll('.oddch button').length === 9,
      next: () => kg.r.shown.length === 9 && kg.r.opts.length === 5,
      howmany: () => kg.r.n >= 13 && document.querySelectorAll('.hmi').length === kg.r.n && !!document.querySelector('.hmbox.many'),
      maze: () => mz.n === 10 && mz.star > 0 && !!document.querySelector('#mazeb .mzstar'),
      simon: () => sm.lv.len === 9 && !!sm.lv.fast,
      dots: () => dt.order.length === 5 && dt.order.every((k) => DOT_SHAPES[k]),
      match: () => mg.cards.length === 36 && document.querySelectorAll('.mgrid .mcard').length === 36,
    };
    const bad = [];
    for (const [gm, fn] of Object.entries(CHECK)) {
      await page.goto(`${BASE}/#/kid/mimi/${gm}`); await page.waitForSelector('.lvbar');
      const r = { ok: !!(await page.evaluate(fn).catch((e) => { bad.push(`${gm}: ${e.message.split('\n')[0]}`); return false; })), ...(await page.evaluate(() => ({ chips: document.querySelectorAll('.lvbar .lvc').length, fit: document.documentElement.scrollWidth <= innerWidth + 1 }))) };
      if (!r.ok || !r.fit || r.chips < 9) bad.push(`${gm}:${JSON.stringify(r)}`);
      if (gm === 'where') {   // one instruction, two things: the first placed, then the second, and the round is won
        for (const k of [0, 1]) { const pos = await page.evaluate((k) => kg.r.steps[k].pos, k); await page.click(`.whereb .wcell[data-v="${pos}"]`); }
        if (!(await page.evaluate(() => kg.got && Object.keys(kg.r.placed).length === 2))) bad.push('where: two steps did not finish the round');
      }
      if (gm === 'feed') await page.waitForFunction(() => document.querySelector('#kgwant.gone'), null, { timeout: 6000 }).catch(() => bad.push('feed: the wish never hid'));
      if (gm === 'maze') {   // the goal without the star does not finish the maze
        const ends = await page.evaluate(() => { const n = mz.n, prev = { 0: -1 }, q = [0]; while (q.length) { const c = q.shift(); [c - n, c + n, c - 1, c + 1].forEach((d) => { if (d >= 0 && d < n * n && !(d in prev) && mazeOpen(c, d)) { prev[d] = c; q.push(d); } }); } const route = []; for (let c = n * n - 1; c !== -1; c = prev[c]) route.unshift(c); route.slice(1).forEach((c) => mazeTry(c)); return { done: mz.done, onStar: route.includes(mz.star) }; });
        if (ends.done || ends.onStar) bad.push(`maze: ${JSON.stringify(ends)}`);
      }
      if (['shadow', 'where', 'howmany', 'maze', 'match', 'sort'].includes(gm)) await s.shot(`06-top-${gm}`, false);
    }
    await page.evaluate((v) => ls('lv_mimi', v), saved || {});
    ok(!bad.length, `kid levels: the last level of every game brings its twist and fits the phone (${bad.join(' | ') || 'all'})`);
  }
  {   // the adventure map (owner, Nov 2026: the highlight): a road of towns, three missions and a chest in each — one whole town played for real
    const lv0 = await page.evaluate(() => JSON.stringify(ls('lv_mimi') || {}));
    await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('.kidquest');
    await page.click('.kidquest'); await page.waitForSelector('.questpath');
    const road = await page.evaluate(() => ({ towns: document.querySelectorAll('.qtown').length, ahead: document.querySelectorAll('.qtown.ahead').length, here: document.querySelectorAll('.qtown.here').length, open: document.querySelectorAll('.qtown.open .qm').length, locks: /🔒/.test(document.querySelector('.questpath').textContent), zero: /\b0\/\d/.test(document.querySelector('.questpath').textContent), plan: questPlan(kidTrip('mimi'), 'mimi')[0].map((m) => m.game + m.lv).join(','), last: questPlan(kidTrip('mimi'), 'mimi')[5].map((m) => m.lv).join(','), little: questPlan(kidTrip('mika'), 'mika').map((d) => d[0].lv).join('') }));
    ok(road.towns === 6 && road.ahead === 5 && road.here === 1 && road.open === 3 && !road.locks && !road.zero && road.plan === 'shadow2,maze2,feed2' && road.last === '10,10,10' && road.little === '123345', `adventure map: six towns, the first open with three missions, the rest in the clouds (no locks, no 0/n); the road climbs 2 → 10, the little one 1 → 5 (${JSON.stringify(road)})`);
    {   // the map's own pictures (owner, Nov 2026: emoji differ by phone — the chest was a toolbox on a Samsung): every picture loads, no emoji stands in for chest or cloud
      await page.waitForFunction(() => [...document.querySelectorAll('.questpath img.qi, .kidquest img.qi')].every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 8000 }).catch(() => {});
      const pix = await page.evaluate(() => ({ n: document.querySelectorAll('.questpath img.qi').length, bad: [...document.querySelectorAll('.questpath img.qi')].filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')), chest: document.querySelector('.qchest img.qi').getAttribute('src'), clouds: document.querySelectorAll('.qcloud img.qi').length, emoji: /🧰|☁️/.test(document.querySelector('.questpath').textContent) }));
      ok(pix.n >= 6 && !pix.bad.length && pix.chest === '/art/quest/chest.webp' && pix.clouds === 5 && !pix.emoji && await page.evaluate(() => [...document.querySelectorAll('.qtown.open .qm img.qi')].map((i) => i.getAttribute('src')).join(',') === '/art/kidui/shadow.webp,/art/kidui/maze.webp,/art/kidui/feed.webp'), `adventure map: its own pictures — the chest and the five clouds are drawn, every picture loads, no stand-in emoji (${JSON.stringify(pix)})`);
    }
    await page.click('.qtown.ahead .qhead'); await page.click('.qchest');
    ok(await page.evaluate(() => document.querySelectorAll('.qtown.open').length === 1 && document.querySelector('.qtown.open').id === 'qt0' && !questTownDone(kidTrip('mimi'), 'mimi', 0)), 'adventure map: a town in the clouds does not open, a chest does not open before its three games');
    ok(await s.noHScroll(), 'adventure map fits the phone'); await s.shot('07-quest', false);
    const backToMap = async () => { await page.click('.kidbig[data-a="kidnav"][data-v$="/quest"]'); await page.waitForSelector('.questpath'); };
    const pickGame = async () => {   // shadow / feed: the right picture each round until the game is done
      for (let n = 0; n < 12 && !(await page.evaluate(() => kg.done)); n++) {
        await page.waitForFunction(() => kg.done || !kg.got, null, { timeout: 5000 }); if (await page.evaluate(() => kg.done)) break;
        await page.click(`[data-a="kgpick"][data-v="${await page.evaluate(() => kg.r.want[0])}"]`);
      }
      await page.waitForFunction(() => kg.done, null, { timeout: 5000 });
    };
    await page.click('.qtown.open .qm >> nth=0'); await page.waitForSelector('.shbig');
    const inGame = await page.evaluate(() => ({ bar: !!document.querySelector('.lvbar.qbar'), chips: document.querySelectorAll('.lvc').length, at: kg.at, back: document.querySelector('.kidback').dataset.v }));
    await pickGame(); await page.waitForSelector('.kidbig[data-a="kidnav"][data-v$="/quest"]');
    ok(inGame.bar && inGame.chips === 0 && inGame.at === 2 && /\/quest$/.test(inGame.back) && await page.locator('[data-a="kglv"]').count() === 0, `adventure map: a mission plays at the road's level with the town in its bar, no level chips, and ends with "back to the map" (${JSON.stringify(inGame)})`);
    await backToMap();
    await page.click('.qtown.open .qm >> nth=1'); await page.waitForSelector('#mazeb');
    await page.evaluate(() => { const n = mz.n, prev = { 0: -1 }, q = [0]; while (q.length) { const c = q.shift(); [c - n, c + n, c - 1, c + 1].forEach((d) => { if (d >= 0 && d < n * n && !(d in prev) && mazeOpen(c, d)) { prev[d] = c; q.push(d); } }); } const route = []; for (let c = n * n - 1; c !== -1; c = prev[c]) route.unshift(c); route.slice(1).forEach((c) => mazeTry(c)); });
    await page.waitForSelector('.kidbig[data-a="kidnav"][data-v$="/quest"]'); await backToMap();
    await page.click('.qtown.open .qm >> nth=2'); await page.waitForSelector('.feedpal');
    ok(await page.evaluate(() => { const f = questFoods(kidTrip('mimi')).map((x) => x[0]); return f.length >= 8 && kg.deck.every((x) => f.includes(x[0])) && /^some /.test(kg.deck[0][3]); }), 'adventure map: the feed mission serves the book’s own foods (the dim sum list)');
    await pickGame(); await page.waitForSelector('.kidbig[data-a="kidnav"][data-v$="/quest"]');
    {   // a won mission shows its buttons above the kid bar and goes back to the map by itself after five seconds (owner: the buttons hid under the bar on a tall phone)
      await page.waitForTimeout(1800);
      const vis = await page.evaluate(() => { const b = document.querySelector('.lvwin .kidbig').getBoundingClientRect(), bar = document.querySelector('.kidbar').getBoundingClientRect(); return { bottom: Math.round(b.bottom), bar: Math.round(bar.top), still: /\/feed$/.test(location.hash) }; });
      await page.waitForSelector('.questpath', { timeout: 9000 });
      ok(vis.bottom <= vis.bar && vis.still && await page.evaluate(() => /\/quest$/.test(location.hash) && !quest), `adventure map: a won mission shows "back to the map" above the kid bar and returns to the map by itself after five seconds (${JSON.stringify(vis)})`);
    }
    // the boss shows only now: one of the town's games a level up; the chest waits for it; three wrong taps make the right answer glow
    const bossUp = await page.evaluate(() => ({ boss: document.querySelectorAll('.qtown.open .qboss').length, ready: !!document.querySelector('.qchest.ready'), b: questBoss(kidTrip('mimi'), 'mimi', 0) }));
    await page.click('.qchest'); await page.click('.qboss'); await page.waitForSelector('.shbig');
    const wrongs = await page.evaluate(() => kg.r.opts.filter((o) => o !== kg.r.want).map((o) => o[0]));
    for (let n = 0; n < 3; n++) await page.click(`[data-a="kgpick"][data-v="${wrongs[n % wrongs.length]}"]`);
    const hint = await page.evaluate(() => ({ at: kg.at, n: document.querySelectorAll('[data-a="kgpick"].hint').length, right: (document.querySelector('[data-a="kgpick"].hint') || { dataset: {} }).dataset.v === kg.r.want[0], crown: /crown\.webp$/.test((document.querySelector('.qbar img.qi') || { getAttribute: () => '' }).getAttribute('src')) }));
    await pickGame(); await page.waitForSelector('.kidbig[data-a="kidnav"][data-v$="/quest"]'); await backToMap();
    ok(bossUp.boss === 1 && !bossUp.ready && bossUp.b.game === 'shadow' && bossUp.b.lv === 3 && hint.at === 3 && hint.n === 1 && hint.right && hint.crown && !(await page.evaluate(() => questTownDone(kidTrip('mimi'), 'mimi', 0))),
      `adventure map: the boss comes after the three games (shadows, a level up), the chest waits for it, and three wrong taps make the right answer glow (${JSON.stringify({ bossUp, hint })})`);
    const before = await page.evaluate(() => ({ got: document.querySelectorAll('.qtown.open .qm.got').length, ready: !!document.querySelector('.qchest.ready'), stars: stars('mimi') }));
    await page.click('.qchest.ready'); await page.waitForSelector('.qtreasure');
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
    const stq = (await apiState(page)).entries.filter((e) => /\.tick\.quest\./.test(e.id)).map((e) => `${e.first_key}:${e.child}:${e.day}`).sort().join(' ');
    const after = await page.evaluate((lv0) => ({ done: questTownDone(kidTrip('mimi'), 'mimi', 0), at: questAt(kidTrip('mimi'), 'mimi'), secret: (document.querySelector('.qtreasure p') || {}).textContent || '', gained: stars('mimi'), next: !!document.querySelector('[data-a="questnext"][data-v="1"]'), lvSame: JSON.stringify(ls('lv_mimi') || {}) === lv0, sticker: stickerSet(kidTrip('mimi'), 'mimi').some((x) => x.k === 'quest.d0.chest' && x.got), tro: trophies(kidTrip('mimi'), 'mimi').some((x) => x[0] === 'quest1' && x[3]) }), lv0);
    ok(before.got === 3 && before.ready && after.done && after.at === 1 && after.secret.length > 20 && after.gained - before.stars === 3 && after.next && after.lvSame && after.sticker && after.tro
      && stq === 'quest.d0.0:mimi:null quest.d0.1:mimi:null quest.d0.2:mimi:null quest.d0.3:mimi:null quest.d0.chest:mimi:null', `adventure map: three missions played, the chest opens with the town's secret, three stars, a sticker and a trophy; saved as five ticks; the child's own levels untouched (${JSON.stringify({ before, after, stq })})`);
    await page.click('[data-a="questnext"]');
    ok(await page.evaluate(() => document.querySelector('.qtown.open').id === 'qt1' && document.querySelector('#qt1').classList.contains('here') && document.querySelector('#qt0').classList.contains('done') && document.querySelectorAll('.qtown.ahead').length === 4 && !quest), 'adventure map: on to the next town — it is open, the first keeps its treasure, one more cloud has lifted');
    // the treasure picture has its first piece; the second town hides a secret mission (a game the town does not have), which is never needed for the chest
    const deep = await page.evaluate(() => { const t = kidTrip('mimi'), h = questBonus(t, 'mimi', 1); return { pieces: document.querySelectorAll('.qpicg i.on').length, cells: document.querySelectorAll('.qpicg i').length, hid: document.querySelectorAll('.qtown.open .qhid').length, none: questBonus(t, 'mimi', 0), fresh: !questPlan(t, 'mimi')[1].some((m) => m.game === h.game), boss: document.querySelectorAll('.qtown.open .qboss').length }; });
    ok(deep.pieces === 1 && deep.cells === 6 && deep.hid === 1 && deep.none === null && deep.fresh && deep.boss === 0, `adventure map: the treasure picture shows its first piece of six; town 2 hides a secret mission the town does not have; no boss before the three games (${JSON.stringify(deep)})`);
    await page.evaluate(() => document.querySelector('.qpic').scrollIntoView({ block: 'center' })); await s.shot('07-quest-picture', false); await page.evaluate(() => document.querySelector('#qt1').scrollIntoView({ block: 'start' }));   // scrolled inside the page in one step: a locator held across the redraw that follows a sync was detached on CI
    await s.shot('07-quest-town2', false);
    // a mission left unfinished twice comes back a level easier
    const lvA = await page.evaluate(() => questPlan(kidTrip('mimi'), 'mimi')[1][0].lv);
    for (let n = 0; n < 2; n++) { await page.click('.qtown.open .qm >> nth=0'); await page.waitForSelector('.lvbar.qbar'); await page.click('.kidback'); await page.waitForSelector('.questpath'); }
    await page.click('.qtown.open .qm >> nth=0'); await page.waitForSelector('.lvbar.qbar');
    const lvB = await page.evaluate(() => quest.lv); await page.click('.kidback'); await page.waitForSelector('.questpath');
    ok(lvA - lvB === 1, `adventure map: a mission left unfinished twice comes back one level easier (${lvA} → ${lvB})`);
    await page.goto(`${BASE}/#/kid/mimi/shadow`); await page.waitForSelector('.lvbar');
    ok(await page.evaluate(() => !quest && !document.querySelector('.qbar') && document.querySelectorAll('.lvc').length >= 2), 'adventure map: opening a game from the home tiles is free play again (its own level chips)');
  }
  await page.goto(`${BASE}/#/kid/mimi/dots`); await page.waitForSelector('#dotsb svg');
  await page.locator('#dotsb').scrollIntoViewIfNeeded();
  const skip = await page.evaluate(() => { const box = document.querySelector('#dotsb svg').getBoundingClientRect(), q = DOT_SHAPES[dt.order[0]].p[1]; return [box.left + q[0] / 100 * box.width, box.top + q[1] / 100 * box.height]; });
  await page.mouse.click(skip[0], skip[1]); const orderKept = await page.evaluate(() => dt.hit === 0);
  for (let k = 0; k < 6 && !(await page.evaluate(() => dt.done)); k++) {
    await page.waitForFunction(() => !dt.shown || dt.done, null, { timeout: 4000 }); if (await page.evaluate(() => dt.done)) break;   // the last picture stays shown when the level is won
    await page.locator('#dotsb').scrollIntoViewIfNeeded();
    const pts = await page.evaluate(() => { const box = document.querySelector('#dotsb svg').getBoundingClientRect(); return DOT_SHAPES[dt.order[dt.n]].p.map(([x, y]) => [box.left + x / 100 * box.width, box.top + y / 100 * box.height]); });
    await page.mouse.move(pts[0][0], pts[0][1]); await page.mouse.down(); for (const [x, y] of pts.slice(1)) await page.mouse.move(x, y, { steps: 4 }); await page.mouse.up();
    await page.waitForFunction(() => dt.shown || dt.done, null, { timeout: 4000 });
  }
  await page.waitForFunction(() => dt.done, null, { timeout: 6000 }).catch(() => {});
  ok(orderKept && await page.evaluate(() => dt.done), 'kid game dots: a dot out of order is not joined; dragging 1 → 2 → 3… through every picture of level 2 wins it');
  await page.goto(`${BASE}/#/kid/mimi/cake`); await page.waitForSelector('.cakebox');
  ok(await page.evaluate(() => document.querySelectorAll('.ctray button img.ge').length === CAKE_TOPS.length), 'kid cake: every topping on the tray is a picture');
  const ck0 = await page.evaluate(() => stars('mimi'));
  for (const e of ['🍓', '⭐', '🕯️']) await page.click(`[data-a="cakeadd"][data-v="${e}"]`);
  const cakePlaced = await page.locator('.cakebox .ctop').count(); await page.click('[data-a="cakeblow"]');
  ok(cakePlaced === 3 && await page.evaluate(() => ck.blown) && await page.locator('.ctop.candle.out').count() === 1 && await page.evaluate((s0) => stars('mimi') - s0, ck0) === 1, 'kid game cake: toppings and a candle go on the cake, blowing it out plays the birthday song and drops one star');
  // thinking games, part four (owner, Nov 2026: "ทำเลย" — sequencing, short-term memory, attention, self-control)
  await page.goto(`${BASE}/#/kid/mimi/order`); await page.waitForSelector('.ordtray .ocard');
  const ordWrong = await page.evaluate(() => kg.r.order.find((k) => k !== 0)); await page.click(`.ocard[data-v="${ordWrong}"]`);
  const ordKept = await page.evaluate(() => kg.r.placed.length === 0 && kg.r.steps.length === 3);
  for (let k = 0; k < 80 && !(await page.evaluate(() => kg.done)); k++) { const v = await page.evaluate(() => (kg.got ? null : kg.r.placed.length)); if (v !== null) await page.click(`.ocard[data-v="${v}"]`); await page.waitForTimeout(v === null ? 300 : 60); }
  ok(ordKept && await page.evaluate(() => kg.done) && await page.locator('[data-a="kglv"][data-v="3"].kidbig').count() === 1, 'kid game order: a card out of turn stays in the tray; tapping the steps in order through level 2 (three steps) wins it');
  await page.goto(`${BASE}/#/kid/mimi/missing`); await page.waitForSelector('[data-a="missask"]');
  const missLook = await page.evaluate(() => kg.r.phase === 'look' && document.querySelectorAll('.missb span').length === kg.r.items.length && !document.querySelector('.kgch'));
  await page.click('[data-a="missask"]'); await page.waitForSelector('.kgch [data-a="kgpick"]');
  const missWrong = await page.evaluate(() => kg.r.opts.find((x) => x !== kg.r.items[kg.r.gone])[0]); await page.click(`.kgch [data-a="kgpick"][data-v="${missWrong}"]`);
  const missKept = await page.evaluate(() => !kg.got && kg.n === 0 && !!document.querySelector('.missb .mq'));
  for (let k = 0; k < 60 && !(await page.evaluate(() => kg.done)); k++) {
    const ph = await page.evaluate(() => (kg.got ? 'wait' : kg.r.phase));
    if (ph === 'look') await page.click('[data-a="missask"]'); else if (ph === 'ask') { const v = await page.evaluate(() => kg.r.items[kg.r.gone][0]); await page.click(`.kgch [data-a="kgpick"][data-v="${v}"]`); }
    await page.waitForTimeout(250);
  }
  ok(missLook && missKept && await page.evaluate(() => kg.done), 'kid game missing: the things are shown with no answers yet; the curtain asks with a ❓ in the gap, a wrong pick keeps the round, the right ones win level 2');
  await page.goto(`${BASE}/#/kid/mimi/diff`); await page.waitForSelector('.diffb.r .dfi');
  const sameK = await page.evaluate(() => kg.r.items.findIndex((_, k) => !(k in kg.r.diffs))); await page.click(`.diffb.r .dfi[data-v="${sameK}"]`);
  const diffKept = await page.evaluate(() => kg.r.found.length === 0 && Object.keys(kg.r.diffs).length === 2);
  for (let k = 0; k < 80 && !(await page.evaluate(() => kg.done)); k++) { const v = await page.evaluate(() => (kg.got ? null : Object.keys(kg.r.diffs).find((x) => !kg.r.found.includes(+x)))); if (v != null) await page.click(`.diffb.r .dfi[data-v="${v}"]`); await page.waitForTimeout(v == null ? 300 : 60); }
  ok(diffKept && await page.evaluate(() => kg.done), 'kid game diff: tapping a thing that is the same does nothing; finding both differences in every picture of level 2 wins it');
  await page.goto(`${BASE}/#/kid/mimi/golight`); await page.waitForSelector('[data-a="glstart"]');
  const gl0 = await page.evaluate(() => stars('mimi')); await page.click('[data-a="glstart"]');
  let glNoTapped = false, glGoHit = false;
  for (let k = 0; k < 500 && !(await page.evaluate(() => gl.done)); k++) {
    const st = await page.evaluate(() => ({ k: gl.k, go: gl.k >= 0 && gl.seq[gl.k] ? (gl.rule === 'animal') === !!gl.seq[gl.k].animal : null, hit: !!gl.hit[gl.k] }));
    if (st.k >= 0 && st.go === false && !glNoTapped) { await page.click('.glit').catch(() => {}); glNoTapped = await page.evaluate((k) => !gl.hit[k], st.k); }
    else if (st.k >= 0 && st.go && !st.hit) { await page.click('.glit').catch(() => {}); glGoHit = glGoHit || await page.evaluate((k) => !!gl.hit[k], st.k); }
    await page.waitForTimeout(120);
  }
  ok(await page.evaluate(() => gl.done) && glGoHit && await page.evaluate((s0) => stars('mimi') - s0, gl0) === 2, `kid game golight: an animal tapped counts${glNoTapped ? ', a vehicle tapped does not' : ''}; the whole run of level 2 ends with two stars`);
  // every game with a scene draws its painting (public/art/scene, precached by the service worker's ART list, so it works with no signal)
  const scenes = {};
  for (const v of ['bubbles', 'music', 'shadow', 'feed', 'sort', 'bigsmall', 'wash']) { await page.goto(`${BASE}/#/kid/mimi/${v}`); await page.waitForSelector('.kidwrap'); scenes[v] = await page.evaluate(() => { const w = document.querySelector('.kidwrap'); return [...w.classList].find((c) => c.startsWith('sc-')) + ':' + /\/art\/scene\/\w+-[pl]\.webp/.test(getComputedStyle(w).backgroundImage); }); }
  ok(Object.values(scenes).every((x) => /^sc-\w+:true$/.test(x)) && (await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)) <= 1, `kid scenes: each game has its own backdrop (${JSON.stringify(scenes)})`);
  await page.goto(`${BASE}/#/kid/mimi/music`); await page.waitForSelector('.xylo');
  await page.evaluate(() => { navigator.audioSession = { type: 'auto' }; });   // Safari 16.4+ has it; Chromium does not
  await page.click('.xylo button[data-v="4"]');
  ok(await page.evaluate(() => navigator.audioSession.type) === 'playback', 'sounds: on an iPad/iPhone they play even with the silent switch on (audio session "playback")');
  // the read-aloud voice: never one of iPadOS's novelty/robot voices (they scared the kids), a warm natural one first
  ok(await page.evaluate(() => { const v = (name, l, extra) => ({ name, lang: l, voiceURI: `com.apple.voice.${extra || 'compact'}.${l}.${name}`, localService: true });
    const list = [v('Bad News', 'en-US'), v('Eddy (English (UK))', 'en-GB'), v('Trinoids', 'en-US'), v('Daniel', 'en-GB'), v('Samantha', 'en-US', 'enhanced'), v('Grandpa (Thai (Thailand))', 'th-TH'), v('Kanya', 'th-TH')];
    const real = speechSynthesis.getVoices; speechSynthesis.getVoices = () => list.slice();
    try { return [voiceFor('en-GB').name, voiceFor('th-TH').name].join('|'); } finally { speechSynthesis.getVoices = real; } }) === 'Samantha|Kanya', 'read aloud: a warm natural voice (Samantha, Kanya), never "Bad News", "Trinoids" or the robot "Eddy/Grandpa"'); await page.click('.drums button[data-v="kick"]');
  ok(await page.locator('.xylo button').count() === 8 && await page.locator('.drums button').count() === 5 && await page.locator('.songs .kidbig').count() === 6 && await page.locator('.xylo button[data-v="4"].lit').count() === 1, 'kid mode: a xylophone of eight bars, five instruments and six songs; a tapped bar lights up');
  // owner, Nov 2026: "เสียงเครื่องดนตรีไม่ค่อยดัง และเพลงให้ยาวกว่านี้อีกเท่านึง" — the whole verse, every sound through the limiter, no name cut short
  ok(await page.evaluate(() => SONGS.every((x) => x.seq.length >= 45 && x.seq.every((v) => v >= -1 && v < XYLO.length)) && !!outNode && outNode !== audioCtx.destination
    && [...document.querySelectorAll('.songs .kidbig')].every((b) => b.scrollWidth <= b.clientWidth + 1 && getComputedStyle(b).textOverflow !== 'ellipsis')),
  'kid music: every song plays its whole verse (45+ notes), the sounds go through one limiter, and no song name is cut with "…"');
  await page.goto(`${BASE}/#/kid/mimi/hideseek`); await page.waitForSelector('.hideboard');
  await page.waitForFunction(() => [...document.querySelectorAll('.hideboard img.ge')].every((i) => i.complete), null, { timeout: 8000 }).catch(() => {});
  ok(await page.evaluate(() => { const im = [...document.querySelectorAll('.hideboard .hid img.ge')]; return im.length === 12 && im.every((i) => i.naturalWidth > 0 && i.getBoundingClientRect().width >= 30) && !!document.querySelector('.hidetarget img.ge'); }), 'kid I spy: the twelve hidden things and the one to find are pictures');
  await s.shot('09-g-hideseek', false);
  const wantTh = await page.evaluate(() => hs.targets[0][1]);
  await page.locator(`.hid[aria-label="${wantTh}"]`).dispatchEvent('click');   // Playwright's own hit test blames the board's veil; the browser's elementFromPoint (a real tap) returns the button
  ok(await page.locator('.hid').count() === 12 && await page.locator('.hid.found').count() === 1 && await page.evaluate(() => hs.found.length === 1), 'kid mode: I spy scatters twelve things; tapping the named one finds it');
  await page.goto(`${BASE}/#/kid/mimi/jigsaw`); await page.waitForSelector('.jigboard');
  await page.click('.jpiece[data-v="0"]'); await page.click('.jslot[data-v="0"]');
  ok(await page.locator('.jpiece').count() === 5 && await page.locator('.jslot.filled').count() === 1 && await page.locator('.jslot').count() === 6, 'kid mode: the jigsaw cuts the day picture into six; tap a piece, tap its slot');
  // iPad owner, Nov 2026: the slots came out a different shape from the pieces, and small hands drag — every slot is a piece's shape, a drag places it
  const jshape = await page.evaluate(() => { const r = (q) => { const b = document.querySelector(q).getBoundingClientRect(); return b.width / b.height; }; return Math.abs(r('.jslot') - r('.jpiece')) < 0.02; });
  let jboxes = '';
  const jdrag = async (v, to) => {
    // both ends on screen: a press below the fold never reaches the piece (the redraw after a wrong drop can leave the tray under the fold on CI's fonts)
    await page.evaluate(([v, to]) => { const p = document.querySelector(`.jpiece[data-v="${v}"]`).getBoundingClientRect(), s = document.querySelector(`.jslot[data-v="${to}"]`).getBoundingClientRect();
      const top = Math.min(p.top, s.top), bot = Math.max(p.bottom, s.bottom); window.scrollBy(0, (top + bot) / 2 - innerHeight / 2); }, [v, to]);
    await page.waitForTimeout(150);
    const a = await page.locator(`.jpiece[data-v="${v}"]`).boundingBox(), b = await page.locator(`.jslot[data-v="${to}"]`).boundingBox();
    jboxes = JSON.stringify({ piece: [a.y, a.height].map(Math.round), slot: [b.y, b.height].map(Math.round) });
    await page.mouse.move(a.x + a.width / 2, a.y + a.height / 2); await page.mouse.down();
    for (let k = 1; k <= 6; k++) await page.mouse.move(a.x + a.width / 2 + (b.x + b.width / 2 - a.x - a.width / 2) * k / 6, a.y + a.height / 2 + (b.y + b.height / 2 - a.y - a.height / 2) * k / 6);
    await page.mouse.up(); await page.waitForTimeout(600); };
  await jdrag(1, 2);
  const wrongKept = await page.locator('.jpiece[data-v="1"]').count() === 1 && await page.locator('.jslot.filled').count() === 1 && await page.locator('.jghost').count() === 0;
  await jdrag(1, 1);
  // under a loaded CI box the board can still be settling from the wrong drop's shake when the second drag measures it: wait, then one more try
  if (!(await page.waitForFunction(() => document.querySelectorAll('.jslot.filled').length === 2, null, { timeout: 2000 }).then(() => true, () => false))) await jdrag(1, 1);
  const jfill = await page.locator('.jslot.filled').count(), jleft = await page.locator('.jpiece[data-v="1"]').count();
  ok(jshape && wrongKept && jfill === 2 && jleft === 0, `jigsaw: slots have the pieces' shape; dragging a piece onto its place puts it there, a wrong place keeps it in the tray (${JSON.stringify({ jshape, wrongKept, jfill, jleft, vh: page.viewportSize() })} ${jboxes})`);
  await page.click('.pixpick [data-g="jigsaw"][data-v="photo"]'); await page.waitForSelector('.jigboard');
  ok((await page.getAttribute('.jigboard', 'style')).includes('/media/') && await page.locator('.jpiece').count() === 6 && await page.locator('.pixpick [data-a="kidnewjig"]').count() === 1, 'jigsaw: “our photos” cuts one of the family’s photos instead, with a “new photo” button');
  await page.goto(`${BASE}/#/kid/mimi/hideseek`); await page.waitForSelector('.hideboard'); await page.click('.pixpick [data-g="hideseek"][data-v="photo"]'); await page.waitForSelector('.hideboard');
  ok((await page.getAttribute('.hideboard', 'style') || '').includes('/media/'), 'I spy: the things hide over a family photo');
  await page.goto(`${BASE}/#/kid/mimi/match`); await page.waitForSelector('.mgrid'); await page.click('.pixpick [data-g="match"][data-v="photo"]'); await page.waitForSelector('.mcard.ph');
  ok(await page.locator('.mcard.ph').count() >= 2 && await page.locator('.mcard').count() === 12, 'match: the pairs are the family’s photos (drawings fill the rest)');
  await page.evaluate(() => { localStorage.setItem('mbs_stars_mimi', '9'); star('mimi', 1); });
  await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('.kidtiles');
  ok(await page.locator('.starjar b').textContent() === '10' && await page.locator('.pets').count() === 1 && await page.locator('.pets img.ku[src="/art/kidui/pet-chick.webp"]').count() === 1 && await page.locator('.kidhello .poke').count() === 1, 'kid mode: the star jar counts the stars; ten stars bring a new friend; the character can be poked');
  await page.locator('.starjar').dispatchEvent('pointerdown'); await page.waitForFunction(() => !JSON.parse(localStorage.getItem('mbs_stars_mimi') || 'null'), null, { timeout: 5000 });   // ls(k, null) stores "null"
  ok(await page.evaluate(() => !JSON.parse(localStorage.getItem('mbs_pets_mimi') || 'null') && document.querySelectorAll('.starjar').length === 0), 'kid mode: a grown-up holding the star jar 1.5 s empties it (stars and friends gone)');
  await page.goto(`${BASE}/#/kid/mimi/music`); await page.waitForSelector('.xylo'); await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('.kidtiles');   // away and back: a fresh view (the jar's clear re-rendered in place)
  ok(await page.locator('.kidwrap.enter').count() === 1, 'kid mode: a freshly opened page carries the enter class (the slide-in; a tap’s re-render does not)');
  { const kp = await page.locator('.kpage').count(), kb = await page.locator('.kidtiles button').count();   // the pages follow the tiles (four a page): new games add a page, never a fifth tile on one
    ok(kp >= 4 && kp === Math.ceil(kb / 4) && await page.locator('#kdots i').count() === kp && (await page.locator('.kidtiles button').first().boundingBox()).height >= 150, `kid home: swipe pages of four huge tiles, with dots (${kp} pages, ${kb} tiles)`); }
  await page.click('.kparrow.next'); await page.waitForFunction(() => document.querySelectorAll('#kdots i')[1].classList.contains('on'), null, { timeout: 5000 });
  ok(await page.locator('.kparrow.prev:not([hidden])').count() === 1, 'kid home: the arrow turns the page, the dots follow');
  await page.waitForTimeout(700);   // after the page's entrance animation
  ok(await page.evaluate(() => { const r = document.querySelector('.kidbar').getBoundingClientRect(); return Math.abs(r.bottom - innerHeight) <= 1; }), 'kid bar: stuck to the bottom of the screen, not to the end of the page (no transform left on the page by its entrance)');
  ok(await page.evaluate(() => [...document.querySelectorAll('.kidtiles button.pic img, .kidbar img.kbi')].length >= 8 && [...document.querySelectorAll('.kidtiles img, .kidbar img')].every((i) => i.complete && i.naturalWidth > 0)), 'kid mode: the picture tiles and bar icons load');
  {   // every game tile has its own picture now (owner, Nov 2026: emoji differ by phone) — no home tile falls back to an emoji
    await page.waitForFunction(() => [...document.querySelectorAll('.kidtiles button.pic img')].every((i) => i.complete), null, { timeout: 8000 }).catch(() => {});
    const tl = await page.evaluate(() => ({ pics: document.querySelectorAll('.kidtiles button.pic img').length, emoji: [...document.querySelectorAll('.kidtiles button.pic > span')].map((x) => x.textContent), bad: [...document.querySelectorAll('.kidtiles button.pic img')].filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.getAttribute('src')), games: ['shadow', 'feed', 'sort', 'farm', 'wash', 'bigsmall', 'maze', 'where', 'odd', 'next', 'simon', 'dots', 'howmany', 'cake'].filter((g) => !document.querySelector(`.kidtiles button[data-v$="/${g}"] img[src="/art/kidui/${g}.webp"]`)) }));
    ok(tl.pics >= 27 && !tl.emoji.length && !tl.bad.length && !tl.games.length, `kid home: every game tile carries its own picture, none an emoji (${JSON.stringify(tl)})`);
  }
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
  { // undo and the sponge (owner, Nov 2026: "ทำให้ล้างได้หน่อย"): a slip goes back one tap at a time, the sponge washes the picture white, ↶ brings it back
    const filled = () => page.evaluate(() => [...document.querySelectorAll('.colourpad [data-c]')].filter((x) => x.getAttribute('fill').toLowerCase() !== '#ffffff').map((x) => x.getAttribute('fill')).join());
    const saved = () => page.evaluate(() => (S.entries.find((e) => e.id === 'hk-macau-2026.field.colour.d1.mimi') || {}).text);
    await page.waitForFunction(() => queue.length === 0 && document.querySelectorAll('.colourpad [data-c]').length > 0, null, { timeout: 8000 });   // the blue tap's save is back and the picture redrawn
    // every redraw empties the pad and fills its picture back from the SVG a moment later (kid.js hydrateColours): after the blue tap's save
    // the state refresh redraws, so wait for the shape to be on screen again before tapping (a CI failure of Nov 2026: "Element is not visible")
    const shape0 = page.locator('.colourpad [data-c]').nth(0);
    await page.click('.palette button[data-v="#EF5350"]'); await shape0.waitFor({ state: 'visible', timeout: 8000 }); await shape0.click({ force: true });
    // a redraw before the red tap is saved (a state refresh lands within the 500 ms the save waits): the red must stay on the picture
    await page.evaluate(() => render()); await page.waitForFunction(() => document.querySelectorAll('.colourpad [data-c]').length > 0, null, { timeout: 5000 });
    const two = await filled(), why = await page.evaluate(() => ({ pend: Object.values(colPend), fill: (document.querySelector('.colourpad') || {}).dataset.fill, saved: (S.entries.find((e) => e.id === 'hk-macau-2026.field.colour.d1.mimi') || {}).text, hist: colHist.length, q: queue.length }));
    await page.click('[data-a="kidcolundo"]'); const one = await filled();
    await page.click('[data-a="kidcolwipe"]'); const none = await filled(); await page.waitForFunction(() => (S.entries.find((e) => e.id === 'hk-macau-2026.field.colour.d1.mimi') || {}).text === '{}', null, { timeout: 5000 });
    await page.click('[data-a="kidcolundo"]'); const back = await filled(); await page.waitForFunction(() => /42A5F5/.test((S.entries.find((e) => e.id === 'hk-macau-2026.field.colour.d1.mimi') || {}).text || ''), null, { timeout: 5000 });
    const btn = await page.evaluate(() => [...document.querySelectorAll('.coltools button')].map((b) => Math.round(b.getBoundingClientRect().height)));
    ok(/EF5350/.test(two) && /42A5F5/.test(two) && one === '#42A5F5' && none === '' && back === '#42A5F5' && /42A5F5/.test(await saved()) && btn.length === 2 && btn.every((h) => h >= 48) && await s.noHScroll(),
      `colouring: ↶ takes back the last colour, the sponge washes the picture white (saved), ↶ brings the picture back (${JSON.stringify({ two, one, none, back, btn, ...(/EF5350/.test(two) ? {} : { why }) })})`);
  }
  { // more pictures (owner, Nov 2026: "ทำเกมระบายสีให้มีรูปเพิ่มอีก"): the book's other days and the place's own animals, landmarks and foods
    const api = await page.evaluate(async () => (await (await fetch('/api/b/colour/hk-macau-2026')).json()).pics || []);
    await page.waitForFunction(() => document.querySelectorAll('.colpics button').length > 12, null, { timeout: 8000 });
    const strip = await page.evaluate(() => { const bs = [...document.querySelectorAll('.colpics button')]; return { n: bs.length, first: bs[0].dataset.v, pressed: bs.findIndex((b) => b.getAttribute('aria-pressed') === 'true'), lib: bs.filter((b) => /^colour\.p\./.test(b.dataset.v)).length, h: Math.min(...bs.map((b) => b.getBoundingClientRect().height)), painted: bs[0].querySelector('i') ? 1 : 0 }; });
    await page.locator('.colpics button[data-v^="colour.p."]').first().click(); await page.waitForSelector('.colourpad[data-key^="colour.p."] svg [data-c]');
    const src = await page.getAttribute('.colourpad', 'data-src'), key = await page.getAttribute('.colourpad', 'data-key');
    await page.click('.palette button[data-v="#8BC34A"]'); await page.locator('.colourpad [data-c]').nth(0).waitFor({ state: 'visible', timeout: 8000 }); await page.locator('.colourpad [data-c]').nth(0).click({ force: true });
    await page.waitForFunction((k) => S.entries.some((e) => e.id === `hk-macau-2026.field.${k}.mimi` && /8BC34A/.test(e.text)), key, { timeout: 5000 });
    await page.locator('.colpics button[data-v="colour.d1"]').click(); await page.waitForSelector('.colourpad[data-key="colour.d1"] svg [data-c]');
    const dayKept = await page.evaluate(() => [...document.querySelectorAll('.colourpad [data-c]')].some((x) => x.getAttribute('fill') === '#42A5F5'));
    const own = api.filter((x) => /^(hk|mo)[.-]/.test(x.id)), others = api.filter((x) => !/^(hk|mo)[.-]/.test(x.id));
    ok(own.length >= 60 && api.slice(0, own.length - 2).every((x) => /^(hk|mo)[.-]/.test(x.id)) && others.length >= 60 && others.every((x) => /\.animal\.|^[tr]\.day\./.test(x.id)) && api.every((x) => /^\/stock\/.+\.svg$/.test(x.url)) && strip.first === 'colour.d1' && strip.pressed === 0 && strip.n >= 6 + 120 && strip.lib >= 120 && strip.h >= 64 && strip.painted === 1
      && /^\/stock\//.test(src) && dayKept && await s.noHScroll(),
      `colouring: more pictures — today's first, the book's other days, then ${own.length} of Hong Kong's and Macau's own, then scenes and animals from everywhere (${others.length}; never another country's landmark or food); each keeps its own colours (${JSON.stringify({ strip, src, key })})`);
  }
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
  await page.click('.kidback'); await page.click('.kidbar button[data-v$="/stickers"]'); await page.waitForSelector('#stkboard');
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
  await page.click('.kidback'); await page.click('.kidbar button[data-v$="/map"]'); await page.waitForSelector('.tmap .walkers img');
  ok(await page.locator('.tmap .pin').count() === 7 && await page.locator('.tmap .pin.here[data-v="mawan"]').count() === 1 && await page.locator('.tmap .walkers img').count() === 2, 'map: 7 pins, Mimi and Mika at Ma Wan on day 2');
  ok(await page.locator('.tmap .hop.done').count() === 3, 'map: the path walked so far is solid (airport → Ma Wan → Disneyland → Ma Wan)');
  await page.click('.tmap .pin[data-v="taipa"]'); await page.waitForSelector('.tmap .pin.here[data-v="taipa"]');
  ok((await page.textContent('.kidday small')).includes('5') && (await page.evaluate(() => window.__said)).some((x) => x.startsWith('Taipa Village')), 'map: tapping Taipa walks there (day 5) and says its name');
  const wl = await boxOf(page, '.tmap .walkers'), pin = await boxOf(page, '.tmap .pin[data-v="taipa"]');
  ok(Math.abs(wl.x + wl.width / 2 - (pin.x + pin.width / 2)) < 12, 'map: the walkers stand on the pin');
  {   // the place card (owner, Nov 2026: the map must be of real use): the stop's day — what we do, what to find, one thing to know — every line read aloud; ‹ › walk the journey
    const card = await page.evaluate(() => ({ name: document.querySelector('.mcname b').textContent, day: document.querySelector('.mcname small').textContent, doN: document.querySelectorAll('.mcdo button').length, first: document.querySelector('.mcdo b').textContent, find: document.querySelectorAll('.mcfind button').length, fact: (document.querySelector('.mcfact p') || {}).textContent || '', line: document.querySelector('.kidguide p').textContent, raw: /\d\d:\d\d| · /.test(document.querySelector('#mapcard').textContent) }));
    await page.evaluate(() => { window.__said.length = 0; }); await page.click('.mcdo button >> nth=0');
    const read = await page.evaluate(() => window.__said.slice());
    await page.click('.mcstep[data-v="1"]'); await page.waitForSelector('.tmap .pin.here[data-v="studio"]');
    const next = await page.evaluate(() => ({ name: document.querySelector('.mcname b').textContent, also: (document.querySelector('.mcalso') || {}).textContent || '', day: document.querySelector('.kidday small').textContent }));
    await page.click('.mcstep[data-v="-1"]'); await page.waitForSelector('.tmap .pin.here[data-v="taipa"]');
    ok(card.name === 'Taipa Village' && /Day 5/.test(card.day) && card.doN >= 3 && card.doN <= 6 && card.find === 4 && card.fact.length > 20 && /day 5 we go to Taipa Village/.test(card.line) && !card.raw
      && read.length === 1 && read[0].startsWith(card.first) && next.name === 'Studio City' && /Taipa Village/.test(next.also) && /5/.test(next.day),
      `map: the place card tells the stop's day (up to six plan headlines, four things to find, one fact, no clock times), reads a line aloud on a tap, and ‹ › walk the journey (${JSON.stringify({ card, read, next })})`);
    ok(await s.noHScroll(), 'map with its place card fits the phone');
    await page.evaluate(() => document.querySelector('#mapcard').scrollIntoView({ block: 'start' })); await s.shot('08-map-card', false);
    await page.click('[data-a="mapquest"]'); await page.waitForSelector('.questpath');
    ok(await page.evaluate(() => /\/quest$/.test(location.hash) && !!document.querySelector('.qtown.open')), 'map: the place card leads to the adventure map');
    await page.click('.kidbar button[data-v$="/map"]'); await page.waitForSelector('.tmap .walkers');
  }
  {   // kid mode follows the real trip (owner, Nov 2026): the day by the clock on the kid home, and the places really checked in on the kid map
    await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('#kidnow');
    const home = await page.evaluate(() => ({ now: document.querySelector('#kidnow b').textContent, lbl: document.querySelector('#kidnow small').textContent, tile: Math.round(document.querySelector('.kidtiles button').getBoundingClientRect().height), raw: /\d\d:\d\d/.test(document.querySelector('#kidnow').textContent) }));
    await s.shot('09-kid-now', false);
    await page.click('#kidnow'); await page.waitForSelector('.kday');
    const day = await page.evaluate(() => ({ rows: document.querySelectorAll('.kdrow').length, done: document.querySelectorAll('.kdrow.done').length, now: document.querySelector('.kdrow.now b').textContent, next: document.querySelector('.kdrow.next b').textContent, home: document.querySelector('.knhome b').textContent, head: document.querySelector('.kidday small').textContent, raw: /\d\d:\d\d/.test(document.querySelector('.kday').textContent) }));
    await s.shot('09-kid-day', false);
    await page.clock.setFixedTime(new Date('2026-12-06T07:00:00+08:00')); await page.evaluate(() => render());
    const early = await page.evaluate(() => ({ now: document.querySelectorAll('.kdrow.now').length, next: document.querySelector('.kdrow.next b').textContent, line: document.querySelector('.kidguide p').textContent }));
    await page.clock.setFixedTime(new Date('2026-12-06T12:00:00+08:00')); await page.evaluate(() => render());
    ok(home.now === 'Early lunch, beat the rush' && home.lbl === 'Now' && home.tile >= 120 && !home.raw && day.rows === 9 && day.done === 4 && day.now === home.now && /Sit-down show/.test(day.next) && day.home === '4 more sleeps until home' && /Day 2/.test(day.head) && !day.raw
      && early.now === 0 && early.next === 'Taxi to Tsuen Wan' && /^Soon/.test(early.line) && await s.noHScroll(),
      `kid mode follows the clock: the home says what we do now (12:00 → lunch) and keeps its big tiles; "my day" shows the steps done, now and next and the sleeps until home, never a clock time; at 07:00 the taxi is "soon" (${JSON.stringify({ home, day, early })})`);
    await page.evaluate(async () => { await fetch('/api/b/places', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ trip: 'hk-macau-2026', key: 'Hong Kong Disneyland', day: 1, kind: 'place', name: { en: 'Hong Kong Disneyland', th: 'ฮ่องกงดิสนีย์แลนด์' }, done: true, at: Date.now() }) }); await load(); render(); });
    await page.click('.kidbar button[data-v$="/map"]'); await page.waitForSelector('.tmap .pin.real');
    const real = await page.evaluate(() => ({ pins: [...document.querySelectorAll('.tmap .pin.real')].map((p) => p.dataset.v).join(','), flags: document.querySelectorAll('.tmap .pin .flag').length, sticker: stickerSet(kidTrip('mimi'), 'mimi').some((x) => x.k === 'been.disney' && x.got) }));
    await page.click('.tmap .pin[data-v="disney"]'); await page.waitForSelector('.tmap .pin.here[data-v="disney"]');
    const went = await page.evaluate(() => ({ list: [...document.querySelectorAll('.mcwent b')].map((b) => b.textContent).join('|'), line: document.querySelector('.kidguide p').textContent }));
    ok(real.pins === 'disney' && real.flags === 1 && real.sticker && went.list === 'Hong Kong Disneyland', `kid map: a place the parents checked in lights its pin (only that stop of the day), gives a sticker, and the card lists where we really went (${JSON.stringify({ real, went })})`);
    await page.evaluate(() => document.querySelector('.tmap').scrollIntoView({ block: 'start' })); await s.shot('09-map-real', false);
    await page.click('.tmap .pin[data-v="taipa"]'); await page.waitForSelector('.tmap .pin.here[data-v="taipa"]');   // back where the checks below expect the children (day 5)
  }
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
  {
    await page.waitForFunction(() => [...document.querySelectorAll('.tro img.ku')].every((i) => i.complete), null, { timeout: 8000 }).catch(() => {});
    const tp = await page.evaluate(() => ({ n: document.querySelectorAll('.tro').length, pics: [...document.querySelectorAll('.tro img.ku')].filter((i) => i.naturalWidth > 0).length, lock: /🔒/.test(document.querySelector('.trophies').textContent), dim: getComputedStyle(document.querySelector('.tro:not(.got) img.ku')).filter }));
    ok(tp.n > 0 && tp.pics === tp.n && !tp.lock && /grayscale/.test(tp.dim), `trophies: every trophy shows its own picture (no emoji, never a lock); one not earned yet is the same picture in grey (${JSON.stringify(tp)})`);
  }
  await s.shot('12b-kid-trophies', false);
  await page.reload(); await page.waitForSelector('.tro');
  ok(await page.locator('.tro.new').count() === 0, 'trophies: celebrated once, not on every visit');
  await page.click('.kidback'); await page.waitForSelector('.kidtiles');
  await s.shot('10-kid-home');
  const lock = await page.locator('#kidexit').boundingBox();
  await page.mouse.move(lock.x + lock.width / 2, lock.y + lock.height / 2); await page.mouse.down(); await page.waitForTimeout(300); await page.mouse.up();
  ok(page.url().includes('#/kid'), 'a quick tap on the lock does nothing (toddler-proof)');
  ok(await page.evaluate(() => { const b = document.querySelector('#kidexit'), i = b.querySelector('svg.klk'); if (!i || /🔒/.test(b.textContent)) return false; const r = b.getBoundingClientRect(), q = i.getBoundingClientRect();
    return Math.abs((r.left + r.width / 2) - (q.left + q.width / 2)) < 1 && Math.abs((r.top + r.height / 2) - (q.top + q.height / 2)) < 1; }), 'the lock is a drawn icon in the middle of its circle (the emoji sat off-centre in Safari)');
  ok(await page.evaluate(() => ['.kidhear', '.kidme'].every((q) => { const b = document.querySelector(q); if (!b) return true; const c = getComputedStyle(b); return c.display === 'grid' && c.paddingLeft === '0px' && c.paddingTop === '0px'; })), 'the kid header\'s round buttons centre what they hold (no default button padding)');
  await page.mouse.down(); await page.waitForTimeout(1500); await page.mouse.up();
  await page.waitForSelector('.ppshelf .ppbk2');
  ok(page.url().includes('#/passport/mimi') && await page.locator('.ppshelf .ppbk2').count() === 2, 'holding the lock leaves kid mode: Mimi\'s passports, the grown-ups\' door');
  await ppOpen(page, 'mimi', T, 'missions'); await page.waitForSelector('#m1 .colsvg.sm svg', { timeout: 5000 }).catch(() => {});
  ok(await page.locator('#m1 .colsvg.sm svg').count() === 1, 'the passport shows the colouring');
  await ppOpen(page, 'mimi', T, 'map'); const pins = await page.locator('.mapsec .tmap .pin').count();
  await ppOpen(page, 'mimi', T, 'stickers');
  ok(pins === 7 && await page.locator('.stkpage #stkboard .stk.on').count() === 1 && await page.locator('.stkpage #stktray').count() === 0, 'passport: the map, and the sticker page (read-only) Mimi made — the same page kid mode sticks them on');
  await page.goto(BASE + '/#/'); await page.waitForSelector('.shelf');
  ok(await page.locator('.ppmini .ppc').count() === 2, 'shelf: passport covers for both kids');
  ok(/1 (รีวิว|review)/.test(await page.textContent('a.nbcard[href="#/notebook"]')), 'shelf: travel notebook card counts the review');
  // backup: never done on this phone → the card nags; one tap downloads the full zip, then it reads up to date
  ok(await page.locator('.nbcard.backup.warn').count() === 1 && /ยังไม่เคย|Never backed up/.test(await page.textContent('.nbcard.backup')), 'shelf: backup card warns that this phone never backed up');
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('.nbcard.backup')]);
  const dlPath = await dl.path();
  ok(/^memory-bookshelf-\d{4}-\d{2}-\d{2}\.zip$/.test(dl.suggestedFilename()) && fs.readFileSync(dlPath).subarray(0, 2).toString() === 'PK', 'backup: one tap downloads the full zip');
  await page.waitForSelector('.nbcard.backup:not(.warn)');
  ok(/ครบแล้ว|up to date/.test(await page.textContent('.nbcard.backup')) && await page.locator('.shelf').count() === 1, 'backup: the card reads up to date and the shelf stays open');
  await s.shot('15b-shelf-backup', false);
  await page.click('a.nbcard[href="#/notebook"]'); await page.waitForSelector('.nblist');
  ok(await page.locator('.nbrow').count() === 1 && (await page.textContent('.nbrow')).includes('★★★★☆') && /เด็กนอนดี|kids slept well/.test(await page.textContent('.nbsum')), 'notebook page: the stay with its stars; "what worked" lists the tag');
  ok(await s.noHScroll(), 'notebook page fits the phone');
  await s.shot('13-notebook');
  await page.goto(BASE + '/#/'); await page.waitForSelector('.shelf');
  ok(!(await page.evaluate(() => heroHtml() !== '')) || await page.locator('.hero .cast .who').count() === 2, 'shelf: Mimi and Mika stand in the hero as characters');
  ok(await page.locator(`.spine[href="#/t/${T}"] .polas img`).count() >= 1 && await page.locator('.spine .arts .art').count() >= 1, 'shelf: book with photos shows them, the other shows its day art');
  ok(await page.evaluate(() => (heroHtml() !== '') === !!document.querySelector('.hero')), 'shelf: next-adventure hero while a trip is ahead or on');
  ok(await s.noHScroll(), 'shelf: no horizontal scroll with hero + passports');
  await s.shot('07-shelf-after');
  await page.goto(`${BASE}/#/`); await page.waitForSelector('.setlist.disp'); await page.click('.setlist.disp button[data-a="lang"][data-v="en"]');   // the language lives on the shelf's card (and the sign-in page), not in every top bar
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('#d1');
  await page.waitForSelector('text=Favourite moments');
  ok(true, 'language toggle to English (from the shelf) holds on the book page');
  await page.goto(`${BASE}/#/`); await page.waitForSelector('.setlist.disp'); await page.click('.setlist.disp button[data-a="lang"][data-v="th"]');
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('#d1');
  await page.pdf({ path: path.join(OUT, 'book-hk.pdf'), format: 'A4', printBackground: true });
  ok(fs.statSync(path.join(OUT, 'book-hk.pdf')).size > 20000, 'A4 print/PDF of the book renders');
  ok(s.errs.length === 0, 'no console errors: ' + s.errs.join(' | '));

  // offline capture → reconnect → drains once
  await page.goto(`${BASE}/#/t/${T}/log/2/all`); await page.waitForSelector('#qtext');
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
  const cached = async (urls) => page.evaluate(async (us) => { const out = {}; for (const k of await caches.keys()) { const c = await caches.open(k); for (const u of us) if (!out[u] && await c.match(u)) out[u] = true; } for (const u of us) out[u] = !!out[u]; return out; }, urls);
  const fave = st.media.find((m) => m.trip === T && m.highlight), plain = st.media.find((m) => m.trip === T && m.day === 2);
  const want = ['/', '/app.css', '/core.js', '/views.js', '/sheets.js', '/kid.js', '/art/guides/pinky.svg', '/art/crest/hk.svg', '/art/kids/mika-city.webp', '/art/kids/mika-dino-face.webp', '/art/colour/hk/day-3.svg', '/art/hk/day-6.svg',
    ...st.media.filter((m) => m.trip === T && !(m.mime || '').startsWith('audio/')).map((m) => `/media/${m.id}/t`), `/media/${fave.id}`];   // a voice memo has no thumbnail
  const have = await cached(want.concat(`/media/${plain.id}`));
  ok(want.every((u) => have[u]), 'service worker cache holds the shell, all art (precached at install), every thumbnail of the book and the full-size favourite' + want.filter((u) => !have[u]).map((u) => ' MISSING ' + u).join(''));
  ok(!have[`/media/${plain.id}`], 'a plain photo is kept as a thumbnail only (full size stays on the server until opened or "with all photos")');
  // a share from the gallery (manifest share_target, docs/SNAP-BOOK.md P0): the service worker keeps the photos on the phone, the
  // check page reads them once through the same reader and forgets them; the manifest offers the app in the share sheet
  {
    const fx = ['gps-ii.jpg', 'time-only.jpg', 'gps.avif'].map((f) => [f, [...fs.readFileSync(path.resolve('test/fixtures/snap', f))]]);
    const kept = await page.evaluate(async (list) => { const fd = new FormData(); for (const [n, b] of list) fd.append('photos', new File([new Uint8Array(b)], n, { type: n.endsWith('.avif') ? 'image/avif' : 'image/jpeg' }));
      const res = await fetch('/share', { method: 'POST', body: fd }); return { ok: res.ok, n: (await (await caches.open('mbs-share')).keys()).length }; }, fx);
    await page.goto(`${BASE}/#/snaptest?shared=3`);
    await page.waitForFunction(() => /Read in|อ่านเสร็จใน/.test((document.querySelector('#snapruns') || {}).textContent || ''), null, { timeout: 8000 });   // this session reads Thai
    const h = await page.textContent('#snapruns h2'), left = await page.evaluate(async () => (await (await caches.open('mbs-share')).keys()).length);
    const sum = await page.$$eval('.snapsum:not(.devspeed) li', (ls) => ls.map((l) => l.textContent.replace(/\s+/g, ' ').trim()));
    const man = await (await page.request.get(`${BASE}/manifest.webmanifest`)).json();
    ok(kept.ok && kept.n === 3 && /(Shared from the gallery|แชร์จากแกลเลอรี) · 3/.test(h) && sum[2].includes('2 ·') && left === 0 && await page.evaluate(() => location.hash) === '#/snaptest'
      && man.share_target && man.share_target.action === '/share' && man.share_target.params.files[0].name === 'photos', `share from the gallery: kept by the service worker (${kept.n}), read once on the check page (${h} · ${sum[2]}), then forgotten (${left} left)`);
    const noSw = await (await page.request.post(`${BASE}/share`, { maxRedirects: 0 })).headers();
    ok(/\/#\/snap\?shared=0$/.test(noSw.location || ''), 'share before the service worker is in place: the server sends the phone to the book-from-photos page');
    await page.goto(`${BASE}/#/t/${T}/offline`); await page.waitForSelector('#offl');   // back where the offline checks go on
  }
  ok(await page.evaluate(async (u) => (await caches.keys()).includes('mbs-media') && !!(await (await caches.open('mbs-media')).match(u)) && !(await (await caches.open((await caches.keys()).find((k) => /^mbs-v/.test(k)))).match(u)), `/media/${fave.id}/t`), 'photos live in their own cache, not the versioned shell cache — a deploy must never empty the offline pack');
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
  await page.locator('.colourpad [data-c]').nth(0).waitFor({ state: 'visible', timeout: 8000 }); await page.locator('.colourpad [data-c]').nth(0).click({ force: true });
  await page.waitForFunction(() => queue.length >= 1, null, { timeout: 5000 });
  const lock2 = await boxOf(page, '#kidexit');
  await page.mouse.move(lock2.x + lock2.width / 2, lock2.y + lock2.height / 2); await page.mouse.down(); await page.waitForTimeout(1500); await page.mouse.up();
  await page.waitForSelector('.ppshelf .ppbk2');
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
  ok((await s.page.locator('.hubgrid:not(.hero)').first().evaluate((g) => getComputedStyle(g).gridTemplateColumns.split(' ').length)) === 4, 'wide: the menu is four roomy tiles a row (six cramped ones left a stray seventh)');
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
  { const r5 = await s.page.request.get(`${BASE}/api/b/pdf/hk-macau-2026?size=a5`, { timeout: 120000 }), b5 = (await r5.body()).toString('latin1');
    const p5 = (b5.match(/\/Type\s*\/Page[^s]/g) || []).length, box = (b5.match(/\/MediaBox\s*\[\s*0 0 ([\d.]+) ([\d.]+)/) || []).slice(1).map(Number);
    ok(r5.status() === 200 && /-a5\.pdf/.test(r5.headers()['content-disposition'] || '') && Math.round(box[0]) === 420 && p5 === pdf.pages, `the A5 book: A4's pages scaled whole, none spill (${p5} pages vs ${pdf.pages}, ${box.join('×')} pt)`); }
  // help and play near where we sleep (views.js careBlock, server/care.js): Hong Kong's hospitals first, a pin each, no hours or phone
  await s.page.goto(`${BASE}/#/t/hk-macau-2026/sos`);
  await s.page.waitForSelector('#carelib:not([hidden]) .cfold[open] ul.carel li', { timeout: 20000 });
  { const c = await s.page.evaluate(() => { const b = document.getElementById('carelib'); return { first: b.querySelector('.cfold[open] h5').textContent, n: b.querySelectorAll('.cfold[open] li').length, pins: b.querySelectorAll('.cfold[open] li .navb').length, text: b.textContent }; });
    ok(/hospital|โรงพยาบาล/i.test(c.first) && c.n >= 3 && c.pins === c.n && !/24[- ]hour|\+852/.test(c.text), `SOS: hospitals and play near the stay (${c.n} places, the first group "${c.first.trim()}")`); }
  // a place the family knows (care_own): the town's "add" sheet, a kind chip, saved — it shows under its kind with "our own" and a pin
  await s.page.click('#carelib .cfold[open] [data-a="careadd"]');
  await s.page.fill('#coname', 'Our UI test playground');
  await s.page.click('[data-a="carekind"][data-v="play"]');
  await s.page.fill('#conote', 'Shady, soft ground');
  await s.page.click('[data-a="careaddgo"]');
  await s.page.waitForFunction(() => [...document.querySelectorAll('#carelib .cown')].some((li) => li.textContent.includes('Our UI test playground')), null, { timeout: 15000 });
  { const own = await s.page.evaluate(() => { const li = [...document.querySelectorAll('#carelib .cown')].find((x) => x.textContent.includes('Our UI test playground')); return { pin: !!li.querySelector('.navb'), del: !!li.querySelector('[data-a="caredel"]'), under: li.closest('ul').previousElementSibling.textContent }; });
    ok(own.pin && own.del && /play|เล่น/i.test(own.under), `SOS: a place we know is added under its kind with a pin and a remove button (${own.under.trim()})`); }
  // what dish is this? (kid.js dishFor): the book's tasting card, a right pick says the dish and its Cantonese name
  await s.page.goto(`${BASE}/#/kid/mimi/dish`); await s.page.waitForSelector('.dishpic', { timeout: 15000 });
  { const k = await s.page.evaluate(() => dsh.r.want.k); await s.page.click(`.dishopt[data-v="${k}"]`);
    const d = await s.page.evaluate(() => ({ got: dsh.got, opts: document.querySelectorAll('.dishopt').length, zh: [...document.querySelectorAll('.dishopt small')].map((x) => x.textContent) }));
    ok(d.got && d.opts >= 2 && d.zh.some((x) => /[\u4e00-\u9fff]/.test(x)), `kid mode: what dish is this — ${d.opts} names, the local word under them (${d.zh.join(' ')})`); }
  // the memory book preview on screen (what the PDF prints)
  await s.page.goto(`${BASE}/#/print/hk-macau-2026`); await s.page.waitForSelector('.pg.cover');
  const pgs = await s.page.locator('.pg').evaluateAll((els) => els.map((e) => e.className.replace('pg ', '').split(' ')[0]));
  ok(pgs[0] === 'cover' && pgs.includes('numbers') && pgs.includes('contents') && pgs.filter((c) => c === 'dayp').length >= 1 && pgs.filter((c) => c === 'ppp').length === 2 && pgs.includes('wordsp') && pgs.includes('firstsp') && pgs[pgs.length - 1] === 'back', `memory book pages: ${pgs.join(' · ')}`);
  ok(await s.page.locator('.pg.cover .cast .who').count() === 2 && await s.page.locator('.pg.cover .cvart .art').count() === 6 && await s.page.locator('.pg.numbers .pmap .pin').count() === 7, 'memory book cover: the kids, the six day stamps; numbers page: the route map');
  // the cover fills the page: by default the six day pictures as a grid (every book has them); the parents may switch to the ⭐ photo
  ok(await s.page.locator('.pg.cover .cv.art .cvart figure').count() === 6 && await s.page.locator('.pg.cover .cv.art .cvart figure small').first().textContent() !== '' && await s.page.locator('.pg.cover .cv.photo').count() === 0, 'cover default: a 3×2 grid of the day pictures with the date and the day\'s name, no photo');
  await s.page.goto(`${BASE}/#/t/hk-macau-2026/book`); await s.page.waitForSelector('.coverpick');
  ok(await s.page.locator('.coverpick button[data-v="art"][aria-pressed="true"]').count() === 1, 'book page: the printed-cover switch shows (a photo is starred), day pictures selected');
  await s.page.click('.coverpick button[data-v="photo"]'); await s.page.waitForSelector('.coverpick button[data-v="photo"][aria-pressed="true"]');
  await s.page.goto(`${BASE}/#/print/hk-macau-2026`); await s.page.waitForSelector('.pg.cover .cv.photo');
  ok(await s.page.locator('.pg.cover .cvph img.big').count() === 1 && await s.page.locator('.pg.cover .cvband h1').count() === 1 && await s.page.locator('.pg.cover .cvart.strip .art').count() === 6 && await s.page.locator('.pg.cover .cast .who').count() === 2, 'cover "photo": the ⭐ photo full width, the title on a band in the book\'s colour, the day strip, the kids');
  await s.page.screenshot({ path: path.join(OUT, 'wide-13b-cover-photo.png'), clip: { x: 0, y: 0, width: 1440, height: 1250 } });
  ok((await apiState(s.page)).entries.some((e) => e.id === 'hk-macau-2026.cover.all' && e.kind === 'cover' && e.text === 'photo' && e.day === null), 'server: the cover choice is one trip-wide entry (the PDF renders it too)');
  await s.page.goto(`${BASE}/#/t/hk-macau-2026/book`); await s.page.waitForSelector('.coverpick'); await s.page.click('.coverpick button[data-v="art"]'); await s.page.waitForSelector('.coverpick button[data-v="art"][aria-pressed="true"]');
  await s.page.goto(`${BASE}/#/print/hk-macau-2026`); await s.page.waitForSelector('.pg.cover .cv.art');
  ok(await s.page.locator('.pg.ppp .dstamp').count() === 12 && await s.page.locator('.pg.ppp .colsvg svg, .pg.ppp .colsvg').count() >= 1, 'passport spreads: 6 stamp slots per child, Mimi\'s colouring');
  ok(await s.page.locator('nav.bar, .top').count() === 0, 'memory book preview has no app chrome');
  // the printed book grows with the children (owner, Nov 2026): by the youngest child's age at the trip (HK: Mika 1½ → little ones),
  // a page of each child's own after their passport, and the parents may choose the style on the book page
  ok(await s.page.locator('.kbook.age-little').count() === 1 && await s.page.locator('.pg.mypage').count() === 2 && await s.page.locator('.pg.mypage .myact.hand .drawbox').count() === 2
    && await s.page.locator('.pghd .pge').count() >= 4, 'printed book: auto style for HK is "little ones" (Mika was 1½), each child has their own page with a handprint box, headings carry a picture');
  await s.page.goto(`${BASE}/#/t/hk-macau-2026/book`); await s.page.waitForSelector('.agepick');
  ok(await s.page.locator('.printset .agek .tpo').count() === 3 && await s.page.locator('.agek .tpo[data-age="little"][data-v="auto"][aria-pressed="true"] .psfit').count() === 1 && await s.page.locator('.printset .psi').count() === 3, 'book page: one card for the printed book — three age styles with the app\'s icons, the one that fits the youngest child chosen by default');
  await s.page.click('.agek .tpo[data-age="big"]'); await s.page.waitForSelector('.agek .tpo[data-age="big"][aria-pressed="true"]');
  await s.page.goto(`${BASE}/#/print/hk-macau-2026`); await s.page.waitForSelector('.kbook');
  ok(await s.page.locator('.kbook.age-big').count() === 1 && await s.page.locator('.pg.mypage .myact.journal .wlines i').count() >= 14
    && (await apiState(s.page)).entries.some((e) => e.id === 'hk-macau-2026.bookage.all' && e.kind === 'bookage' && e.text === 'big' && e.day === null), 'printed book: "big kids" chosen → the journal pages with writing lines; one trip-wide entry');
  await s.page.goto(`${BASE}/#/t/hk-macau-2026/book`); await s.page.waitForSelector('.agepick'); await s.page.click('.agek .tpo[data-v="auto"]'); await s.page.waitForSelector('.agek .tpo[data-age="little"][aria-pressed="true"]');
  await s.page.goto(`${BASE}/#/print/hk-macau-2026`); await s.page.waitForSelector('.kbook');
  await s.page.screenshot({ path: path.join(OUT, 'wide-13-memory-book.png'), fullPage: true });
  await s.shot('10-book-wide');
  await ppOpen(s.page, 'mimi', T, 'id'); await s.page.waitForSelector('.pp.packed');
  const pw = await s.page.evaluate(() => { const c = [...document.querySelectorAll('.pp.packed > .ccol')].map((x) => x.offsetHeight); return { cols: c.length, gap: Math.abs(c[0] - c[1]) }; });
  await ppOpen(s.page, 'mimi', T, `visa-${T}`); pw.st = await s.page.evaluate(() => document.querySelector('.dstamp .art').getBoundingClientRect().width);
  ok(pw.gap < 520, `wide passport: the two columns end close together (${pw.gap}px apart), no big hole beside the cover`);
  ok(pw.cols >= 2 && pw.st >= 56 && pw.st <= 90, `wide: passport pages side by side (${pw.cols} cols), stamps ${Math.round(pw.st)}px`);
  await s.shot('11-passport-wide');
  await s.page.goto(BASE + '/#/'); await s.page.waitForSelector('.shelf');
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
    ok(await p.page.evaluate(() => getComputedStyle(document.body).backgroundColor) === 'rgb(27, 34, 48)', `${w}px: dark paper`);
    await p.shot('book-dark');
    await p.page.goto(`${BASE}/#/t/${T}/log/1/all`); await p.page.waitForSelector('.daystrip');
    ok(await p.noHScroll(), `${w}px dark: record page fits`);
    await p.shot('record-dark');
    await ppOpen(p.page, 'mimi', T, `visa-${T}`);
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
  ok(await page.locator('.setlist.disp [data-a="lang"]').count() === 2 && await page.locator('.setlist.disp .fsseg').count() === 1 && await page.locator('.top [data-a="lang"], .top .fsb').count() === 0, 'viewer: relatives get the language and text-size card on the shelf too (and no controls in the top bar)');
  ok(await page.locator('nav.bar a[href*="/log/"]').count() === 0, 'viewer: no Record tab');
  ok(await page.locator('nav.bar a[href*="#/passport"]').count() === 0 && await page.locator('nav.bar .in > *').count() === 4 && await page.locator('nav.bar a[href$="/today"]').count() === 1, 'viewer: relatives get menu, today, book, firsts — the passports open from the shelf (one door for grown-ups)');
  await ppOpen(page, 'mimi', T, 'missions');
  ok(await page.locator('button[data-a="tick"]:not([disabled]):not([aria-disabled="true"])').count() === 0 && await page.locator('.ppf, .ppedit').count() === 0 && await page.locator('.mission .tick.on').count() >= 1, 'viewer: sees the passport ticks read-only (no ✏️)');
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid');
  ok(await page.locator('.tile[href*="/log/"], .tile[href$="/offline"], .tile.kid').count() === 0 && await page.locator('.tile[href$="/sos"]').count() === 1 && await page.locator('.tile[href$="/eat"]').count() === 1, 'viewer menu: no record, offline or kid-mode tiles; emergency numbers stay, and the eat tile (their bar has no eat button)');
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('#d1');
  ok(await page.locator(`a.firstsgo[href="#/t/${T}/firsts"]`).count() === 1 && (await page.locator('a.firstsgo').boundingBox()).height >= 44, 'memory book: one row leads to the firsts page (the menu has no firsts tile any more)');
  ok(await page.locator('a[href*="/log/"]').count() === 0, 'viewer: no edit links in the book');
  await page.locator('#d1 .mosaic button').first().click(); await page.waitForSelector('#lb:not([hidden]) img');
  ok(await page.locator('#lb [data-lb="del"]').count() === 0 && await page.locator('#lbcap').count() === 0, 'viewer: lightbox without delete/caption edit');
  { // a relative writes under the photo (comments, migration 0038): the line is theirs, with their name, and sent
    if (await page.locator('#lbfrom').count()) await page.fill('#lbfrom', 'ยาย');
    await page.fill('#lbcomm', 'คิดถึงจัง'); await page.keyboard.press('Enter');
    await page.waitForFunction(() => /คิดถึงจัง/.test((document.querySelector('#lb .lbcom ul') || {}).textContent || ''), null, { timeout: 5000 }).catch(() => {});
    const cm = await page.evaluate(() => ({ text: (document.querySelector('#lb .lbcom ul') || {}).textContent || '', mine: document.querySelectorAll('#lb .lbcom [data-lb="uncomment"]').length }));
    await page.waitForFunction(async () => (await (await fetch('/api/b/state?lite=1', { credentials: 'same-origin' })).json()).comments.some((c) => c.text === 'คิดถึงจัง'), null, { timeout: 8000 }).catch(() => {});
    const saved = await page.evaluate(async () => (await (await fetch('/api/b/state?lite=1', { credentials: 'same-origin' })).json()).comments.filter((c) => c.text === 'คิดถึงจัง').length);
    ok(/ยาย/.test(cm.text) && cm.mine === 1 && saved === 1, `viewer: writes a line under the photo, shown with the name and removable by its writer (${cm.text.slice(0, 40)} · ${saved})`);
    await page.click('#lb [data-lb="close"]');
    await page.evaluate(() => localStorage.removeItem('mbs_heartfrom')); }   // the hearts below ask for the sender's name afresh
  await page.goto(`${BASE}/#/t/${T}/log/1/all`); await page.waitForSelector('.cover');
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
  ok(await page.locator('[data-a="heartemo"]').count() === 6 && await page.locator('[data-a="heartemo"] img.emi').count() === 6
    && await page.evaluate(async () => (await Promise.all([...document.querySelectorAll('[data-a="heartemo"] img.emi')].map((i) => fetch(i.src).then((r) => r.ok)))).every(Boolean)), 'heart picker: the family\'s own emoji, every picture there');
  await page.click('[data-a="heartto"][data-v="mimi"]'); await page.click('[data-a="heartemo"][data-v="😍"]');
  ok((await page.innerHTML('[data-a="sendheart"]')).includes('/art/emoji/love.webp'), 'heart: the send button shows the picked emoji as its picture');
  await page.click('[data-a="sendheart"]');
  ok(await page.locator('.hlist li').count() === 0 && await page.evaluate(() => document.activeElement.id) === 'hfrom', 'heart: a sender name is asked for first');
  await page.fill('#hfrom', 'Grandma'); await page.fill('#htext', 'Big hug from Grandma!');
  await page.click('[data-a="sendheart"]');
  await page.waitForFunction(() => queue.length === 0 && S.hearts.some((h) => h.from === 'Grandma' && !h.pending), null, { timeout: 10000 });
  ok(await page.locator('.hlist li').count() === 1 && (await page.textContent('.hlist li')).includes('Big hug') && await page.locator('.hlist [data-a="delheart"]').count() === 1, 'heart: sent, listed in the book, grandma may take back her own');
  ok(await page.evaluate(() => ls('heartfrom')) === 'Grandma' && await page.inputValue('#hfrom') === 'Grandma' && await page.inputValue('#htext') === '', 'heart: name remembered on this phone, note cleared');
  await s.shot('21-viewer-heart');
  // grandma sends a photo for the book (server/inbox.js): it waits for the parents, who put it in from #/inbox
  { const [fc] = await Promise.all([page.waitForEvent('filechooser'), page.click('[data-a="inboxpick"]')]);
    await fc.setFiles([{ name: 'grandma.jpg', mimeType: 'image/jpeg', buffer: await jpg(2, 1600, 1200) }]);
    await page.waitForFunction(() => /1 waiting for the parents/.test((document.querySelector('.ibsend') || {}).textContent || ''), null, { timeout: 15000 }).catch(() => {});
    const waiting = await page.textContent('.ibsend').catch(() => '');
    await s.shot('21b-viewer-send-photo');
    ok(/1 waiting for the parents/.test(waiting) && !(await apiState(page)).media.some((m) => m.created_by === 'Grandma'), `relatives' photos: grandma sends one from the hearts box; it waits, not in the book (${waiting.replace(/\s+/g, ' ').trim()})`); }
  ok(s.errs.length === 0, 'viewer: no console errors ' + s.errs.join(' | '));
  await s.ctx.close();
  { const e = await session('inbox'); await login(e.page);
    await e.page.goto(`${BASE}/#/`); await e.page.waitForSelector('.ibcard', { timeout: 10000 }).catch(() => {});
    const card = await e.page.textContent('.ibcard').catch(() => '');
    await e.page.click('.ibcard'); await e.page.waitForSelector('.ibit');
    await e.shot('inbox');
    await e.page.click('.ibit [data-a="inboxok"]');
    await e.page.waitForFunction(() => !document.querySelector('.ibit') && S.media.some((m) => m.created_by === 'Grandma'), null, { timeout: 10000 }).catch(() => {});
    const st = await apiState(e.page);
    ok(/1 photo from the family/.test(card) && st.media.some((m) => m.created_by === 'Grandma') && await e.noHScroll(), `relatives' photos: the parents see "1 photo from the family", look, and put it in the book (${card.replace(/\s+/g, ' ').trim()})`);
    await e.ctx.close(); }
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
  { const hb = await page.evaluate(() => [...document.querySelectorAll('.hero .heroacts .hbtn')].map((x) => { const r = x.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.width)]; }));
    ok(hb.length === 2 && hb[0][0] === hb[1][0] && hb[0][1] === hb[1][1], `shelf: the hero's two buttons are one width, one under the other (owner's Samsung: two widths) (${JSON.stringify(hb)})`); }
  await page.click('.hero [data-a="kidmode"]'); await page.waitForSelector('.kidpick');
  ok(await page.evaluate(() => new Set([...document.querySelectorAll('.kidpick button')].map((b) => Math.round(b.getBoundingClientRect().width))).size === 1), 'kid picker: every child\'s card the same width (Mimi\'s wagon no longer widens hers)');
  await page.click('.kidpick button[data-v="mimi"]'); await page.waitForSelector('.kidtiles');
  const tiles = await page.locator('.kidtiles button').evaluateAll((bs) => bs.map((b) => b.dataset.v || b.dataset.a));
  ok(tiles.some((v) => v.endsWith('/count')) && tiles.some((v) => v.endsWith('/pack')) && !tiles.some((v) => /\/(stamp|spot)$/.test(v)), 'kid mode before the trip: surprise + pack tiles, no stamp/find yet');
  ok((await page.textContent('.kidhello p')).includes('7'), 'kid home counts down: 7 sleeps');
  await page.click('.kidhear');   // 🔊 in the header: every kid page reads its own line aloud
  ok((await page.evaluate(() => window.__said)).some((x) => /7/.test(x) && /\|(th-TH|en-GB)$/.test(x)) && await page.locator('.kidhd .kidhear').count() === 1, 'kid home: the 🔊 button reads the greeting aloud');
  ok(await page.locator('.kidhearts').count() === 1 && (await page.textContent('.kidhearts')).includes('Grandma'), "hearts: grandma's heart waits on Mimi's home screen");
  await s.shot('01-kid-countdown-home');
  {   // owner's Samsung (412×795 of page, Nov 2026): before the trip the home holds the adventure banner, the hello, the day strip — and the star jar once
      // a game was won — and the tiles ran under the kid bar with the dots behind it. Every phone height keeps the tiles and the dots above the bar.
    const fit = [];
    for (const jar of [0, 12]) {
      await page.evaluate((n) => { if (n) { ls('stars_mimi', n); ls('pets_mimi', ['🐣']); } else { localStorage.removeItem('mb.stars_mimi'); ls('stars_mimi', 0); ls('pets_mimi', []); } render(); }, jar);
      for (const [w, h] of [[412, 795], [390, 844], [390, 664], [360, 640], [412, 915], [375, 715], [360, 700]]) {   // 375×715: the Samsung at a bigger display size — a fixed tile height left a blank band above the bar
        await page.setViewportSize({ width: w, height: h }); await page.waitForTimeout(120);
        const m = await page.evaluate(() => { const bar = document.querySelector('.kidbar').getBoundingClientRect().top, d = document.querySelector('#kdots').getBoundingClientRect(), ts = [...document.querySelectorAll('.kpage')[0].querySelectorAll('button')].map((b) => b.getBoundingClientRect());
          const slack = Math.max(0, document.documentElement.scrollHeight - innerHeight);   // a short phone may scroll: what counts is where the dots end up
          return { bar: Math.round(bar), dots: Math.round(d.bottom - slack), slack: Math.round(slack), tiles: Math.round(Math.max(...ts.map((r) => r.bottom))), th: Math.round(Math.min(...ts.map((r) => r.height))), jar: !!document.querySelector('.starjar'), hello: !!document.querySelector('.kidhello p') && document.querySelector('.kidhello p').getBoundingClientRect().height > 0, quest: !!document.querySelector('.kidquest'), sx: document.documentElement.scrollWidth > innerWidth + 1 }; });
        if (!(m.dots <= m.bar && m.bar - m.dots <= 40 && (h < 720 || m.slack === 0) && m.tiles - m.slack < m.dots && m.th >= 96 && m.hello && m.quest && !m.sx && m.jar === !!jar)) fit.push(`${w}x${h} jar ${jar}: ${JSON.stringify(m)}`);
        if (w === 412 && h === 795 && jar) await s.shot('01b-kid-home-samsung', false);
      }
    }
    await page.setViewportSize({ width: 390, height: 844 }); await page.evaluate(() => { ls('stars_mimi', 0); ls('pets_mimi', []); render(); });
    ok(fit.length === 0, `kid home before the trip: the four tiles (96 px or taller) and the dots sit above the kid bar with the hello, the adventure banner and the star jar on the page — on one screen from 720 px of height, after a short scroll below that, and the tiles take the room there is: no blank band above the bar (${fit.join(' | ') || 'all fit'})`);
  }
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
  await page.click('.kidbig[data-a="kiddrawdone"]');
  ok((await page.evaluate(() => window.__said)).some((x) => /Draw something first/.test(x)) && page.url().endsWith('/draw'), 'draw: an empty board is not saved');
  const box = await page.locator('#kidcanvas').boundingBox();
  await page.click('.palette button[data-v="#EF5350"]');
  await page.mouse.move(box.x + 90, box.y + 90); await page.mouse.down();
  for (let k = 1; k <= 12; k++) await page.mouse.move(box.x + 90 + k * 20, box.y + 90 + Math.sin(k) * 30);
  await page.mouse.up();
  ok(!(await page.locator('#drawtray').isVisible()) && await page.locator('#drawcol').isVisible(), 'draw: the colour tray tucks away once the child draws; the colour dot on the paper stays');
  await page.click('#drawcol'); await page.waitForSelector('#drawtray', { state: 'visible' });
  await page.click('.palette button[data-v="#42A5F5"]'); await page.click('[data-a="kidpen"][data-v="48"]');
  await page.mouse.move(box.x + 100, box.y + 150); await page.mouse.down(); await page.mouse.move(box.x + 250, box.y + 200); await page.mouse.up();
  const red = await page.evaluate(() => { const d = document.querySelector('#kidcanvas').getContext('2d').getImageData(0, 0, 1200, 900).data; let n = 0; for (let k = 0; k < d.length; k += 4) if (d[k] > 200 && d[k + 1] < 120 && d[k + 2] < 120) n++; return n; });
  ok(red > 500, `draw: the finger paints on the canvas (${red} red pixels)`);
  ok(await s.noHScroll(), 'draw page fits the phone');
  await s.shot('03-kid-draw', false);
  {   // the paper fills the screen; one tap of the sponge wipes it and ↶ brings the picture back
    const before = await page.evaluate(() => JSON.stringify(pad.strokes.map((x) => x.pts)));
    await page.click('#drawfull');
    const r = await page.evaluate(() => { const cv = document.querySelector('#kidcanvas'), c = cv.getBoundingClientRect(), w = document.querySelector('#drawwrap').getBoundingClientRect(); return { w: Math.round(c.width), h: Math.round(c.height), vw: innerWidth, vh: innerHeight, wrap: [Math.round(w.left), Math.round(w.top), Math.round(w.width), Math.round(w.height)], attr: [cv.width, cv.height],
      top: document.elementFromPoint(c.left + c.width / 2, c.top + c.height / 2) === cv, bar: !!document.querySelector('.kidbar') && getComputedStyle(document.querySelector('.kidbar')).display !== 'none', save: getComputedStyle(document.querySelector('.dpsave')).display !== 'none', same: JSON.stringify(pad.strokes.map((x) => x.pts)) }; });
    await s.shot('03-kid-draw-full', false);
    const cover = Math.round(100 * r.w * r.h / (r.vw * r.vh));
    ok(r.w >= r.vw - 30 && r.top && await page.locator('#drawwrap.full').count() === 1 && cover >= 85 && r.wrap[0] === 0 && r.wrap[1] === 0 && r.wrap[2] === r.vw && r.wrap[3] === r.vh && !r.bar && r.save && r.same === before && Math.abs(r.attr[0] / r.attr[1] - r.w / r.h) < 0.02,
      `draw: the full-screen paper takes the screen's shape — ${cover}% of the screen (it was a 4:3 sheet, a third of a phone), over the whole screen, the kid bar away, a keep button on it, and what was drawn stays where it was (paper ${r.w}×${r.h} of ${r.vw}×${r.vh}, sheet ${r.attr.join('×')})`);
    { const c = await page.evaluate(() => { const b = document.querySelector('#kidcanvas').getBoundingClientRect(); return [b.left, b.top, b.width, b.height]; });
      await page.mouse.move(c[0] + c[2] * 0.5, c[1] + c[3] * 0.9); await page.mouse.down(); await page.mouse.move(c[0] + c[2] * 0.6, c[1] + c[3] * 0.95); await page.mouse.up();
      const pt = await page.evaluate(() => { const st = pad.strokes[pad.strokes.length - 1], cv = document.querySelector('#kidcanvas'); return [st.pts[0][0] / cv.width, st.pts[0][1] / cv.height]; });
      ok(Math.abs(pt[0] - 0.5) < 0.02 && Math.abs(pt[1] - 0.9) < 0.02, `draw: a finger near the foot of the tall paper lands where it touched (${pt.map((x) => x.toFixed(2)).join(', ')})`);
      await page.evaluate(() => { pad.strokes.pop(); redraw(document.querySelector('#kidcanvas')); }); }
    await page.click('#drawcol'); await page.click('[data-a="kidclear"]');
    const n0 = await page.evaluate(() => pad.strokes.length); await page.click('.dpundo'); const n1 = await page.evaluate(() => pad.strokes.length);
    ok(n0 === 0 && n1 === 2, `draw: one tap of the sponge wipes the paper, ↶ brings it back (${n0} → ${n1})`);
    await page.click('#drawfull');
    const sm = await page.evaluate(() => { const cv = document.querySelector('#kidcanvas'), c = cv.getBoundingClientRect(); return { ar: c.width / c.height, attr: cv.width / cv.height, h: Math.round(c.height), vh: innerHeight, bar: getComputedStyle(document.querySelector('.kidbar')).display !== 'none' }; });
    ok(await page.locator('#drawwrap.full').count() === 0 && Math.abs(sm.ar - sm.attr) < 0.02 && sm.h <= sm.vh * 0.62 && sm.bar && await s.noHScroll(), `draw: the full-screen paper closes again, the sheet keeps its shape undistorted and the page still fits (${sm.h}px of ${sm.vh})`);
  }
  {   // the small paper: ↶ and the sponge always under it, like the colouring page (the tray hides while the child draws)
    const n0 = await page.evaluate(() => pad.strokes.length);
    const row = await page.evaluate(() => [...document.querySelectorAll('.drawrow button')].map((b) => [b.dataset.a, Math.round(b.getBoundingClientRect().height), getComputedStyle(b).display]));
    await page.click('.drawrow [data-a="kidclear"]'); const n1 = await page.evaluate(() => pad.strokes.length);
    await page.click('.drawrow [data-a="kidundo"]'); const n2 = await page.evaluate(() => pad.strokes.length);
    ok(n0 > 0 && n1 === 0 && n2 === n0 && row.map((r) => r[0]).join() === 'kidundo,kidclear' && row.every((r) => r[1] >= 48 && r[2] !== 'none') && await page.locator('#drawwrap:not(.full) .dpundo:visible, #drawwrap:not(.full) .drawtray .dclear:visible').count() === 0 && await s.noHScroll(),
      `draw: under the paper ↶ and the sponge are always there — the sponge wipes, ↶ brings it back; the corner and tray copies only on the full-screen paper (${JSON.stringify({ n0, n1, n2, row })})`);
  }
  await page.click('.drawrow [data-a="kidundo"]');
  await page.click('.kidbig[data-a="kiddrawdone"]'); await page.waitForSelector('.kidtiles');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  let st = await apiState(page);
  const dr = st.media.find((m) => m.id.startsWith('dr-mimi-'));
  ok(dr && dr.day === null && dr.w === 1200 && dr.h > 2000 && dr.h <= 2560 && dr.caption.includes('Mimi'), `draw: saved as a private picture of the trip (no day before we go), in the tall shape the full-screen paper took (${dr && dr.w}×${dr && dr.h})`);
  ok(st.entries.some((e) => e.id === `${T}.tick.cd.4.mimi`) && st.entries.some((e) => e.id === `${T}.tick.pack.toy.mimi`), 'server: door 4 opened + toy packed, for Mimi only');
  ok((await page.evaluate(async (id) => (await fetch('/media/' + id)).headers.get('content-type'), dr.id)) === 'image/jpeg', 'draw: the drawing is served like a photo (signed-in only)');
  {   // a second drawing, then a grown-up deletes it from the drawing page by pressing and holding its picture; a tap does nothing
    await page.click('.kidtiles button[data-v$="/draw"]'); await page.waitForSelector('#kidcanvas');
    const b2 = await page.locator('#kidcanvas').boundingBox();
    await page.mouse.move(b2.x + 60, b2.y + 60); await page.mouse.down(); await page.mouse.move(b2.x + 200, b2.y + 120); await page.mouse.up();
    await page.click('.kidbig[data-a="kiddrawdone"]'); await page.waitForSelector('.kidtiles');
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
    await page.click('.kidtiles button[data-v$="/draw"]'); await page.waitForSelector('.drawn .drdel');
    const n0 = await page.locator('.drawn .drdel').count();
    await page.evaluate(() => document.querySelector('.drawn').scrollIntoView({ block: 'center' })); const tb = await page.locator('.drawn .drdel').last().boundingBox();
    await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await page.mouse.down(); await page.waitForTimeout(300); await page.mouse.up();
    const n1 = await page.locator('.drawn .drdel').count();
    const gone = await page.locator('.drawn .drdel').last().getAttribute('data-v');
    await page.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await page.mouse.down();
    await page.waitForFunction((n) => document.querySelectorAll('.drawn .drdel').length === n - 1, n0, { timeout: 5000 }).catch(() => {});
    await page.mouse.up();
    const n2 = await page.locator('.drawn .drdel').count();
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
    const st2 = await apiState(page), left = st2.media.filter((m) => m.id.startsWith('dr-mimi-')).map((m) => m.id);
    ok(n0 === 2 && n1 === 2 && n2 === 1 && !left.includes(gone) && left.includes(dr.id), `draw: a grown-up deletes a kept drawing by pressing and holding it; a short tap keeps it (${n0} → tap ${n1} → hold ${n2}, server keeps ${left.join(',')})`);
    await page.click('.kidbar button[data-v="#/kid/mimi"]'); await page.waitForSelector('.kidtiles');
  }

  // leave kid mode; the drawing is in the book, then a bedtime story read aloud with turning pages
  const lock = await page.locator('#kidexit').boundingBox();
  await page.mouse.move(lock.x + lock.width / 2, lock.y + lock.height / 2); await page.mouse.down(); await page.waitForTimeout(1500); await page.mouse.up();
  await page.waitForSelector('.ppshelf .ppbk2');
  await page.evaluate(async () => { await fetch('/api/b/entries/hk-macau-2026.story.all', { method: 'PUT', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ trip: 'hk-macau-2026', day: null, kind: 'story', text: 'Once upon a time Mimi and Mika flew to Hong Kong. The plane went whoosh!\n\nThey met Captain Pinky by the sea. Then they slept in a castle of lights.\n\nThe end.', lang: 'en' }) }); await load(); });
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('.cover');
  ok(await page.locator('.mosaic.drawings img').count() === 1, "book: the kids' drawings section");
  await page.goto(`${BASE}/#/t/${T}/plan/full`); await page.waitForSelector('.itin');
  // the day's plan from the manual: collapsed in the itinerary, open for today on the record page
  ok(await page.locator('.itin .dayplan').count() === 6 && await page.locator('.itin .dayplan[open]').count() === 0, 'itinerary: every HK day has a collapsed plan (not on the trip yet)');
  await page.locator('.itin > li').nth(3).locator('.dayplan > summary').first().click();
  const p4 = await page.locator('.itin > li').nth(3).locator('.dayplan').textContent();
  ok(/11:00/.test(p4) && /teamLab/.test(p4) && /Plan B/.test(p4) && /Money today/.test(p4) && /Local tip/.test(p4), 'itinerary: day 4 plan shows the timeline, local tip, plan B and money');
  await page.locator('.itin > li').nth(3).screenshot({ path: path.join(OUT, 'countdown-05-dayplan.png') });
  await page.goto(`${BASE}/#/t/${T}/log/3/all`); await page.waitForSelector('.planblk');
  ok(await page.locator('.planblk .dayplan').count() === 0 && await page.locator('.planblk details').count() === 0 && await page.locator('.planblk .pll > li').count() >= 4 && await page.$$eval('.planblk .pll > li', (ls) => ls.every((l) => l.querySelector('time').textContent.trim() && l.querySelector('span').textContent.trim().length > 3))
    && await page.locator(`.planblk a.learnlink[href="#/t/${T}/today/3/full"]`).count() === 1 && await page.locator('.planblk .plstay b').count() === 1 && !(await page.textContent('.planblk')).includes('Wong Chi Kei') && await s.noHScroll(),
    'record page: the plan is one fold and nothing folds inside it — a line a step (time + headline), tonight\'s bed, one link to the full plan (the manual page no longer sits in it)');
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
  ok((await page.textContent('.day.today h3')).includes('Grand Pacific') && await page.locator('nav.bar a[href*="/log/1"]').count() === 1 && await page.locator('.quick a[href*="maps/dir"]').count() === 1 && await page.locator('.dayplan').count() === 0 && await page.locator('.cbox details.dfold[open] .picks .pk').count() === 3 && await page.locator('.dayseg button[data-v="1"][aria-pressed=true]').count() === 1 && await page.locator('.top a.ibtn[href="#/t/big-hop-2027"]').count() === 1, "today page on the trip, opened in full by its address: day 2, the route button (record is on the bar), every fold open with the picks' details, and the back arrow goes to the book menu (it is the same page)");
  { // the Australia memory book prints too: every section, a passport spread per child with all 16 stamp slots, and a real PDF
    await page.goto(`${BASE}/#/print/big-hop-2027`); await page.waitForSelector('.pg.back');
    const pgs = await page.locator('.pg').evaluateAll((els) => els.map((e) => e.className.replace('pg ', '').split(' ')[0]));
    ok(pgs[0] === 'cover' && pgs.includes('numbers') && pgs.includes('contents') && pgs.filter((c) => c === 'ppp').length === 2 && pgs[pgs.length - 1] === 'back'
      && await page.locator('.pg.ppp .dstamp').count() === 32 && await page.locator('.pg.cover .cvart .art').count() >= 6 && !s.errs.length, `Australia memory book: ${pgs.join(' · ')}`);
    // owner's review, Nov 2026: the 16-day strip ran wider than the sheet and Chromium printed the whole book at 65%; and the book
    // never pastes the app: no review scores, booking sites or room types, no plan tips in a day's header
    const vpP = page.viewportSize(); await page.setViewportSize({ width: 1000, height: 1400 }); await page.emulateMedia({ media: 'print' });   // server/pdf.js prints at 1000 px
    const wide = await page.evaluate(() => [...document.querySelectorAll('.pg, .pg .journey, .pg .dstamps')].filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => e.className));
    const txt = await page.locator('.kbook').textContent();
    const backH = await page.evaluate(() => document.querySelector('.pg.back').getBoundingClientRect().height);
    await page.emulateMedia({ media: 'screen' }); await page.setViewportSize(vpP);
    ok(!wide.length && !/★|รีวิว|reviews|Airbnb|2-Bedroom|ห้องนอน/.test(txt) && await page.locator('.pg.numbers .beds .bed').count() === 8 && await page.locator('.pg.ppp.ppfull .dstamps.c4').count() === 2
      && !/nothing recorded|ไม่มีบันทึก/.test(txt) && await page.locator('.pg.numbers .proute .rt').count() >= 9 && await page.locator('.pg.numbers .journey').count() === 0 && backH > 900,
      `printed book: nothing wider than the sheet (${wide.join(', ')}), where we slept as 8 cards with no scores, the stamps fill their page`);
    const pr = await page.request.get(`${BASE}/api/b/pdf/big-hop-2027`, { timeout: 180000 }), pb = await pr.body();
    const pages = (pb.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    ok(pr.status() === 200 && pb.subarray(0, 5).toString('latin1') === '%PDF-' && pages >= pgs.length, `Australia server PDF: ${Math.round(pb.length / 1024)} KB, ${pages} A4 pages for ${pgs.length} book pages`);
  }
  await page.goto(`${BASE}/#/t/big-hop-2027/today`); await page.waitForSelector('.tl.plan');
  { const r = await page.evaluate(() => [...document.querySelectorAll('.tl.plan > li')].map((li) => [li.className, li.querySelector('time').textContent]));
    const nx = r.findIndex(([c]) => c === 'next'), tm = (x) => (x.match(/\d{1,2}:\d{2}/) || [''])[0].padStart(5, '0');
    ok(nx > 0 && r.filter(([c]) => c === 'next').length === 1 && tm(r[nx][1]) > '10:00' && r.slice(0, nx).every(([c, x]) => c === 'past' || !tm(x)) && (await page.textContent('.tl.plan li.next')).includes('Next'),
      `today at 10:00 on day 2: earlier steps fade, the next one is marked (${r.map(([c, x]) => `${x}${c ? ':' + c : ''}`).join(' ')})`); }
  await page.goto(`${BASE}/#/t/big-hop-2027/book`); await page.waitForSelector('.cover');
  ok(await page.locator('img[src="/art/kids/mimi-beach.webp"]').count() >= 1 && await page.locator('img[src^="/art/kids/mimi"][src$=".svg"]').count() === 0, 'Australia book on day 2, a beach day: the kids wear their beach clothes');
  // the wardrobe (owner, Nov 2026): Mimi and Mika dress for the day on the page; in kid mode a child may choose one of twenty outfits
  { const w = await page.evaluate(() => { const au = S.trips.find((x) => x.id === 'big-hop-2027'), hk = S.trips.find((x) => x.id === 'hk-macau-2026');
      return { au: au.days.map((d, i) => wearAuto(au, i)), hk: hk.days.map((d, i) => wearAuto(hk, i)), hkNone: wearAuto(hk, null), auNone: wearAuto(au, null), n: KID_WEAR.length }; });
    ok(w.n === 20 && w.au[0] === 'plane' && w.au[w.au.length - 1] === 'plane' && w.au[1] === 'beach' && w.hk[0] === 'plane' && w.hk[1] === 'park' && w.hkNone === 'city' && w.auNone === 'hike' && true,
      `the day's plan picks the outfit: a flight day the plane clothes, a beach day the beach, Disneyland the theme park; outside the trip the book's own (AU ${w.au.join(' ')} · HK ${w.hk.join(' ')})`);
    const miss = await page.evaluate(async () => { const out = []; for (const k of KID_STOCK) for (const o of KID_WEAR) for (const s of ['', '-face']) { const r = await fetch(`/art/kids/${k}-${o}${s}.webp`); if (!r.ok || !/webp/.test(r.headers.get('content-type') || '')) out.push(k + '-' + o + s); } return out; });
    ok(miss.length === 0, `every outfit of both children is served, the figure and the round face (${miss.join(' ') || 'all 80'})`);
    await page.evaluate(() => { ls('kidmode', 'mimi'); location.hash = '#/kid/mimi'; }); await page.waitForSelector('.kidwrap.home');
    const tile = await page.locator('.kidtiles button[data-v="#/kid/mimi/wear"]').count(), tileImg = await page.locator('.kidtiles button[data-v="#/kid/mimi/wear"] img').getAttribute('src');
    ok(tileImg === '/art/kidui/wear.webp', `the Dress up tile wears its own wardrobe icon, like every other tile (${tileImg})`);
    await page.evaluate(() => { location.hash = '#/kid/mimi/wear'; }); await page.waitForSelector('.wears');
    const cards = await page.evaluate(() => [...document.querySelectorAll('.wears button')].map((b) => [b.dataset.v, b.getAttribute('aria-pressed'), Math.round(b.getBoundingClientRect().height), b.querySelector('b').textContent.trim().length > 0]));
    await page.locator('.wears button[data-v=dino]').click(); await page.waitForSelector('.wears button[data-v=dino][aria-pressed=true]');
    await page.evaluate(() => { location.hash = '#/kid/mimi'; }); await page.waitForSelector('.kidwrap.home');
    const worn = await page.evaluate(() => [document.querySelector('.kidhello img').getAttribute('src'), document.querySelector('.kidme img').getAttribute('src'), kidArt('mika', true)]);
    await page.evaluate(() => { location.hash = '#/kid/mimi/wear'; }); await page.waitForSelector('.wears'); await page.locator('.wears button.auto').click(); await page.waitForSelector('.wears button.auto[aria-pressed=true]');
    const back = await page.evaluate(() => kidArt('mimi', true));
    ok(tile === 1 && cards.length === 21 && cards[0][0] === '' && cards[0][1] === 'true' && cards.every((c) => c[2] >= 44 && c[3]) && worn[0] === '/art/kids/mimi-dino.webp' && worn[1] === '/art/kids/mimi-dino-face.webp' && !/dino/.test(worn[2]) && !/dino/.test(back),
      `kid mode wardrobe: a Dress up tile, "today's outfit" + 20 cards with names, the dinosaur chosen is worn on the home page and the badge, only by that child, and "today's outfit" goes back to the trip's (${worn.join(' ')} → ${back})`);
    await page.evaluate(() => { ls('kidmode', null); ls('wear_mimi', ''); location.hash = '#/'; }); await page.waitForSelector('.shelf'); }
  // glance first: each topic opens as a few answer cards; the manual-style report is one tap away
  await page.goto(`${BASE}/#/t/big-hop-2027/today`); await page.waitForSelector('.day.today');
  ok(/Money today/.test(await page.textContent('.cgrid')) && /≈ A\$\d/.test(await page.textContent('.cbox .num')) && await page.locator('.dayplan').count() === 0 && await s.noHScroll(), 'today glance: answer cards (money shows the day total), no full plan until tapped');
  { // Today is one page (owner, Nov 2026): the second page is gone, its words sit one tap below the box they belong to, and "Short · Full" opens all of it in place
    const short = await page.evaluate(() => ({ h: document.documentElement.scrollHeight, folds: document.querySelectorAll('details.dfold').length, open: document.querySelectorAll('details.dfold[open]').length, li: document.querySelectorAll('.tl.plan.brief > li.open').length,
      taps: [...document.querySelectorAll('.dayseg button, .cbox details.dfold > summary, .cbox.cone > a.ch')].map((e) => Math.round(e.getBoundingClientRect().height)), notes: document.querySelectorAll('.tl.plan .tnote').length, one: [...document.querySelectorAll('.cbox.cone .ch .fs')].map((e) => e.textContent.trim().replace(/\s+/g, ' ')) }));
    await page.click('.dayseg button[data-v="1"]');
    const full = await page.evaluate(() => ({ h: document.documentElement.scrollHeight, closed: document.querySelectorAll('details.dfold:not([open])').length, li: document.querySelectorAll('.tl.plan.brief > li.open').length, rows: document.querySelectorAll('.tl.plan.brief > li > [aria-expanded]').length, hash: location.hash, strip: document.querySelector('.daystrip a').getAttribute('href'),
      txt: document.querySelector('main').textContent, sx: document.documentElement.scrollWidth > innerWidth + 1, legs: document.querySelectorAll('.dlegs > li').length, pins: [...document.querySelectorAll('.dlegs > li .navb')].filter((a) => /google\.[a-z.]+\/maps|maps\.app|maps\.google/.test(a.href) && a.getBoundingClientRect().height >= 44).length }));
    await page.click('.dayseg button[data-v="0"]');
    const back = await page.evaluate(() => ({ h: document.documentElement.scrollHeight, open: document.querySelectorAll('details.dfold[open]').length + document.querySelectorAll('.tl.plan.brief > li.open').length, hash: location.hash }));
    { const tag = await page.evaluate(() => { const e = document.querySelector('.tl.plan.brief li.next .nexttag'), r = e && e.getBoundingClientRect(), row = e && e.parentElement.getBoundingClientRect(); return e ? [Math.round(r.width), Math.round(row.width)] : null; });
      ok(tag && tag[0] < 90 && tag[0] < tag[1] / 2, `today: the "Next" tag on the timeline is a small pill, not a bar across the row (${tag && tag.join(' of ')} px)`); }
    ok(short.folds >= 4 && short.open === 0 && short.li === 0 && short.taps.every((x) => x >= 44) && short.notes >= 1 && short.one.some((x) => /^Money today ≈ A\$\d/.test(x)) && short.one.some((x) => /^Good to know today \d+ tips?$/.test(x)) && short.one.some((x) => /^Eat along today’s route \d+ places$/.test(x)) && short.one.some((x) => /^Today’s things to learn/.test(x)),
      `today, short view: every fold closed and 44 px or taller, money / good to know / eat along the route / learn each one line (${short.one.join(' | ')}; taps ${[...new Set(short.taps)].join(',')})`);
    ok(full.closed === 0 && full.li === full.rows && full.rows >= 5 && /\/today\/1\/full$/.test(full.hash) && /\/full$/.test(full.strip) && full.h > short.h * 1.5 && !full.sx && /Waldegrave/.test(full.txt) && full.legs >= 3 && full.pins === full.legs && /Fuel/.test(full.txt) && back.open === 0 && /\/today\/1$/.test(back.hash) && Math.abs(back.h - short.h) < 4,
      `today, "Full": every step and fold opens in place — a row a leg with its navigate pin (${full.legs}), tonight's address, the bill — the address says /full and the day strip keeps it; "Short" closes it all again (${short.h} → ${full.h} → ${back.h} px)`);
    // nothing the second page said is lost: every piece of the manual's full day is on Today (opened) or on the learn page it links to — all days, both books
    const lost = await page.evaluate(todayLost, ['hk-macau-2026', 'big-hop-2027']);
    ok(lost.length === 0, `today is one page and loses nothing: every piece of the old full plan of all 22 days is on Today or on the learn page it links to (${lost.slice(0, 4).join(' | ') || 'nothing missing'}${lost.length > 4 ? ` … ${lost.length}` : ''})`);
    await s.shot('au-02-today-one-page', false);
  }
  { // photos by spot (owner, Nov 2026): the record page's photo box lists the day's places; a tap adds photos that carry the place and checks it in
    await page.goto(`${BASE}/#/t/big-hop-2027/log/1/all`); await page.waitForSelector('#lgphotos .phstop');
    const read = () => page.$$eval('#lgphotos .phstop', (els) => els.map((e) => ({ place: e.dataset.place, kind: e.dataset.kind, key: e.dataset.key, h: Math.round(e.getBoundingClientRect().height), txt: e.textContent.trim(), shown: getComputedStyle(e).display !== 'none' })));
    const chips = await read(), vis = chips.filter((c) => c.shown);
    const plan = await page.evaluate(() => { const t = S.trips.find((x) => x.id === 'big-hop-2027'), d = t.days[1]; return { places: d.planned.filter((p) => p.kind !== 'food').map((p) => p.en), food: d.planned.filter((p) => p.kind === 'food').map((p) => p.en), bed: d.plan.stay.name, morning: t.days[0].plan.stay.name, was: S.places.filter((p) => p.trip === 'big-hop-2027').length }; });
    const more = await page.locator('#lgphotos .phmore').textContent();
    ok(vis.length === plan.places.length + 2 && vis.slice(0, plan.places.length).every((c, k) => c.place === plan.places[k] && c.kind === 'place') && vis[vis.length - 2].place === plan.morning && vis[vis.length - 1].place === plan.bed && vis.slice(-2).every((c) => c.kind === 'stay')
      && chips.filter((c) => !c.shown).length === plan.food.length && chips.filter((c) => !c.shown).every((c) => c.kind === 'food') && new RegExp(`Meals · ${plan.food.length}`).test(more) && vis.every((c) => c.h >= 44 && !/✓|\b0\b/.test(c.txt)) && await s.noHScroll(),
      `record page, photo suggestions: the ${plan.places.length} sights of the day, then the hotels (this morning's and tonight's), each 44 px or taller with no count until a photo is there; the ${plan.food.length} meals wait behind one chip (${vis.map((c) => c.place).join(' · ')} · [${more.trim()}])`);
    await page.click('#lgphotos .phmore');
    ok((await read()).every((c) => c.shown) && await page.locator('#lgphotos .phmore').count() === 0 && await s.noHScroll(), 'photo suggestions: the meals chip opens the meals in place and steps aside');
    { // a flight day leads with the airports the day names and "on the plane"; a day at Disneyland ("Toy Story Land") is not a flight day
      const sug = await page.evaluate(() => { const hk = S.trips.find((x) => x.id === 'hk-macau-2026'), au = S.trips.find((x) => x.id === 'big-hop-2027'), f = (t, i) => photoStops(t, i).map((x) => `${x.kind}:${x.name.en}`);
        return { hk1: f(hk, 0), hk2: f(hk, 1), hk3: f(hk, 2), au1: f(au, 0), au16: f(au, 15), th: photoStops(hk, 0).map((x) => x.name.th),
          aka: ['ดิสนีย์แลนด์: เครื่องเล่นและโชว์', 'hong kong disneyland rides and shows', 'Hong Kong Disneyland'].map((n) => (stopOf(hk, 1, n) || { name: {} }).name.en),
          twice: [hk, au].flatMap((t) => t.days.flatMap((d, i) => { const q = photoStops(t, i).map((x) => x.q).filter(Boolean); return q.filter((x, k) => q.indexOf(x) !== k).map((x) => `${t.id} d${i + 1}: ${x}`); })) }; });
      ok(sug.hk2.filter((x) => /Disneyland/.test(x)).join('|') === 'place:Hong Kong Disneyland' && sug.aka.every((x) => x === 'Hong Kong Disneyland') && sug.twice.length === 0 && sug.hk3.includes('place:HZMB Hong Kong Port') && sug.hk3.includes('place:HZMB Macau Port'),
        `photo suggestions: two planned stops at one map address are one chip that answers to both names (${sug.hk2.join(' · ')}; no address twice in any day of both books ${sug.twice.slice(0, 2).join(' | ')}), places that only share a word stay apart`);
      ok(sug.hk1.slice(0, 3).join('|') === 'air:Suvarnabhumi Airport|air:On the plane|air:Hong Kong airport' && sug.th[2] === 'สนามบินฮ่องกง' && sug.th[1] === 'บนเครื่องบิน' && sug.hk1.includes("stay:Noah's Ark Hotel") && !sug.hk2.some((x) => x.startsWith('air:')) && sug.hk2[sug.hk2.length - 1] === "stay:Noah's Ark Hotel & Resort"
        && sug.hk3.includes('stay:Studio City') && sug.hk3.includes("stay:Noah's Ark Hotel & Resort") && sug.hk3.includes('place:Studio City Water Park') && sug.au1.slice(0, 3).join('|') === 'air:Suvarnabhumi|air:On the plane|air:Sydney Airport' && sug.au16.slice(0, 2).join('|') === 'air:Airport|air:On the plane',
        `photo suggestions follow the day: a flight day → its airports and "on the plane" (${sug.hk1.slice(0, 3).join(' · ')}; the last day ${sug.au16.slice(0, 2).join(' · ')}), a park day → no airport, a move day → both hotels, and a sight in the hotel's town is still a sight`); }
    const [fc] = await Promise.all([page.waitForEvent('filechooser'), page.locator('#lgphotos .phstop').first().click()]);
    await fc.setFiles([{ name: 'spot.jpg', mimeType: 'image/jpeg', buffer: await jpg(2) }]);
    await page.waitForFunction(() => queue.length === 0 && S.media.some((m) => m.trip === 'big-hop-2027' && m.place), null, { timeout: 30000 });
    await page.waitForSelector('#lgphotos .phstop.has');
    const st = await apiState(page), ph = st.media.find((m) => m.trip === 'big-hop-2027' && m.place);
    const seen = await page.evaluate(() => ({ chip: document.querySelector('#lgphotos .phstop').textContent.trim(), grp: [...document.querySelectorAll('#lgphotos .phgrp .label')].map((e) => e.textContent.trim()), spent: document.querySelector('#fpick').dataset.place }));
    ok(ph && ph.place === plan.places[0] && ph.day === 1 && st.places.some((p) => p.trip === 'big-hop-2027' && p.key === chips[0].key) && st.places.filter((p) => p.trip === 'big-hop-2027').length === plan.was + 1 && /✓ 1$/.test(seen.chip) && seen.grp.some((x) => x.includes(plan.places[0])) && seen.spent === '',
      `photos by spot: the photo added from the "${plan.places[0]}" chip carries that place on the server, the place is checked in, the chip counts it (${seen.chip}) and the record page shows it under that stop`);
    await page.goto(`${BASE}/#/t/big-hop-2027/book/d/1`); await page.waitForSelector('#d1 .phgrp .label');
    const en = await page.$$eval('#d1 .phgrp .label', (els) => els.map((e) => e.textContent.trim()));
    await page.evaluate(() => { lang = 'th'; render(); }); const th = await page.$$eval('#d1 .phgrp .label', (els) => els.map((e) => e.textContent.trim())); await page.evaluate(() => { lang = 'en'; render(); });
    const thName = await page.evaluate(() => S.trips.find((x) => x.id === 'big-hop-2027').days[1].planned[0].th);
    ok(en.some((x) => x.includes(plan.places[0])) && th.some((x) => x.includes(thName)) && thName !== plan.places[0], `the book's day page shows the photo under its stop, named in the language on screen (${en.join(' | ')} → ${th.join(' | ')})`);
    // leave the Australia book as it was for the tests that follow
    await page.evaluate(async ({ id, key }) => { await fetch('/api/b/media/' + id, { method: 'DELETE', headers: { 'x-mb': '1' } }); await fetch('/api/b/places', { method: 'PUT', headers: { 'x-mb': '1', 'content-type': 'application/json' }, body: JSON.stringify({ trip: 'big-hop-2027', key, day: 1, kind: 'place', name: { en: key }, done: false }) }); await load(); render(); }, { id: ph.id, key: chips[0].key });
    const clean = await apiState(page);
    ok(!clean.media.some((m) => m.id === ph.id) && clean.places.filter((p) => p.trip === 'big-hop-2027').length === plan.was, 'photos by spot: the test photo and its check-in are removed again');
    await page.goto(`${BASE}/#/t/big-hop-2027/today`); await page.waitForSelector('.day.today');
  }
  { const cut = []; for (const r of ['prep', 'learn', 'sos', 'stays']) { await page.goto(`${BASE}/#/t/big-hop-2027/${r}`); await page.waitForSelector('.glg'); cut.push(...await page.$$eval('.glc small', (els) => els.map((e) => e.textContent.trim()).filter((x) => /…$/.test(x)))); }
    ok(cut.length === 0, `AU glance cards: no subtitle ends with “…” ${cut.slice(0, 2).join(' | ')}`); }
  await page.goto(`${BASE}/#/t/big-hop-2027/plan`); await page.waitForSelector('.drows');
  ok(await page.locator('.drows li').count() === 16 && await page.locator('.drows li.now a[href$="/today/1"]').count() === 1 && await s.noHScroll(), 'whole-trip glance: one tappable line per day, today marked, fits the phone');
  await page.goto(`${BASE}/#/t/big-hop-2027/stays`); await page.waitForSelector('.slist');
  ok(await page.locator('.sline').count() === 8 && await page.locator('.sline.now').count() === 1 && await page.locator('.sline [data-a="driver"]').count() === 8 && await s.noHScroll(), 'stays glance: night strip + one line per stay, tonight marked, driver button on each');
  await page.goto(`${BASE}/#/t/big-hop-2027/sos`); await page.waitForSelector('.calls');
  ok(await page.locator('.callb.main[href="tel:000"]').count() === 1 && await page.locator('.stayc.tonight').count() === 1 && await s.noHScroll(), 'emergency glance: big call buttons (000 first), tonight\'s address');
  await page.goto(`${BASE}/#/t/big-hop-2027/prep`); await page.waitForSelector('.glg');
  ok(await page.locator('.glg .glc').count() >= 6 && /\d+ things|\d+\/\d+ packed/.test(await page.textContent('.glg')), 'get-ready glance: a card per topic, the packing list named by its size (never “0/27 packed”)');
  { // the pocket guide in the book's look (owner, Nov 2026: "ส่วนของ Get Ready อ่านยากมาก"): every topic a picture card, a topic's page under a band with
    // its picture, a table's rows as cards with each label above its words
    const pics = await page.$$eval('.glg .glc', (cs) => cs.map((c) => (c.querySelector('.gpic img') || {}).src || ''));
    ok(pics.length >= 6 && pics.every(Boolean) && pics.some((x) => /\/van\.webp$/.test(x)), `get-ready glance: a picture on every topic card (the van has its own) (${pics.map((x) => x.split('/').pop()).join(' ')})`); }
  await page.locator('.glg .glc').nth(2).click(); await page.waitForSelector('#pocket');
  ok(/\/prep\/full\/2$/.test(page.url()) && await page.locator('#pocket details.pg').count() === 0 && await page.locator('.tp.one #pg-prep-2').count() === 1 && await page.locator('.repseg').count() === 0 && await page.locator('.tp.one details.ifold:not([open])').count() === 0
    && await page.locator('.pgnav a.pgn.prev[href$="/prep/full/1"]').count() === 1 && await page.locator('.pgnav a.pgn.next[href$="/prep/full/3"]').count() === 1 && (await page.textContent('.tp.one h1')).trim().length > 2
    && await page.locator('.backsum').count() === 0 && /\/prep$/.test(await page.getAttribute('header.top .ibtn', 'href')) && await s.noHScroll(), 'a glance card opens that topic alone: its title the heading, every detail open, no switch and nothing to unfold, ‹ › to the topics beside it; the top bar\'s back goes to the summary');
  { await page.goto(`${BASE}/#/t/${T}/prep/full/2`); await page.waitForSelector('.tp.one .tphead');
    const r = await page.evaluate(() => { const tr = document.querySelector('.tp.one .prices tbody tr'), td = tr.querySelector('td[data-h]'), b = td.getBoundingClientRect(), h = getComputedStyle(td, '::before');
      return { head: !!document.querySelector('.tp.one .tphead .phpic img'), card: getComputedStyle(tr).display, borderTop: parseFloat(getComputedStyle(tr).borderTopWidth), labelBlock: h.display, w: Math.round(b.width) }; });
    ok(r.head && r.card === 'grid' && r.borderTop >= 3 && r.labelBlock === 'block' && await s.noHScroll(), `get-ready topic page: a band with the topic's picture, each row of a table a card with its labels above the words (${JSON.stringify(r)})`); }
  { await page.goto(`${BASE}/#/t/${T}/prep`); await page.waitForSelector('.glg');
    ok(await page.locator('.glg').count() === 2 && await page.locator('.glg').nth(1).locator('.glc .gday').count() >= 5 && await page.locator('.glg').first().locator('.gday').count() === 0, 'HK get-ready summary: the whole-trip topics first, the chapters for one day under their own heading with the day as a chip');
    await page.goto(`${BASE}/#/t/${T}/prep/full/0`); await page.waitForSelector('.tp.one .steps');
    ok(await page.$$eval('.steps .pts b', (bs) => bs.length > 0 && bs.every((b) => getComputedStyle(b).display === 'inline')), 'booking timeline: a bold time or price stays inside its sentence (never a line of its own)');
    // numbered steps stay one numbered list (step 4's three short pieces once became bullets between the numbers), a map's stop reads as one line
    await page.goto(`${BASE}/#/t/${T}/prep/full/14`); await page.waitForSelector('.tp.one .tphead');
    const dep = await page.evaluate(() => ({ ol: document.querySelectorAll('.tp.one ol.tips.nums>li').length, ul: document.querySelectorAll('.tp.one ul.tips').length, num: /^\d+\.\s/.test(document.querySelector('.tp.one ol.tips.nums>li')?.textContent || '') }));
    ok(dep.ol === 6 && dep.ul === 0 && !dep.num, `departure routine: six numbered steps, no bullets among them, no "1." written twice (${JSON.stringify(dep)})`);
    await page.goto(`${BASE}/#/t/${T}/prep/full/8`); await page.waitForSelector('.mtl');
    ok(await page.locator('.mtl li ul, .mtl li .pts').count() === 0, 'park map stops: each stop one line, never a list inside a stop');
    // every inner page in one look (owner, Nov 2026: "ไม่เอา format ที่ไม่ตรงกับ app"): learn cards, if-then cases and notes are cards; a bold time stays in its sentence
    { // a long table cell reads as lines (owner, Nov 2026: "ยังอ่านยากเลย" on Getting around): one line a sentence or fare, bold labels and prices, no comma inside the bold
      await page.goto(`${BASE}/#/t/${T}/prep`); await page.waitForSelector('.glg');
      const links = await page.$$eval('.glg a.glc', (as) => as.map((a) => a.getAttribute('href')));
      const r = { li: 0, plain: 0, comma: 0 }; for (const h of links) { await page.goto(`${BASE}/${h}`); await page.waitForSelector('.tp.one');
        const q = await page.evaluate(() => ({ li: Math.max(0, ...[...document.querySelectorAll('.tp.one .prices td ul.cpts')].map((u) => u.children.length)), plain: [...document.querySelectorAll('.tp.one .prices td')].filter((x) => !x.querySelector('ul,li') && x.textContent.length > 160).length, comma: [...document.querySelectorAll('.tp.one b.kf')].filter((b) => /,$/.test(b.textContent)).length }));
        r.li = Math.max(r.li, q.li); r.plain += q.plain; r.comma += q.comma; }
      ok(r.li >= 3 && r.plain === 0 && r.comma === 0, `a long table cell is lines, not a paragraph; no bold price ends in a comma (${JSON.stringify(r)})`); }
      // the opening paragraph is a card; a row of several short pieces (Apps) is a list (owner, Nov 2026: "ทำ 1-4")
      await page.goto(`${BASE}/#/t/big-hop-2027/prep/full/4`); await page.waitForSelector('.tp.one .ledebox');
      const lb = await page.evaluate(() => { const e = document.querySelector('.tp.one .pg1>.ledebox'); const c = getComputedStyle(e); return { r: parseFloat(c.borderTopLeftRadius), bg: c.backgroundColor !== 'rgba(0, 0, 0, 0)', pts: e.querySelectorAll('.pts.lede>li').length, sum: getComputedStyle(e.querySelector('summary') || e).display }; });
      ok(lb.r >= 12 && lb.bg && lb.pts >= 2 && lb.sum === 'none', `a topic's opening paragraph and its points are one soft card (${JSON.stringify(lb)})`);
      // key facts in colour stay readable in dark mode inside every card (the learn page's cards once kept the light-mode navy on a dark card)
      await page.emulateMedia({ colorScheme: 'dark' }); await page.goto(`${BASE}/#/t/${T}/learn/full/0`); await page.waitForSelector('.tp.one .gcard b.kf');
      const lum = await page.$$eval('.tp.one .gcard b.kf', (bs) => bs.map((b) => { const n = (getComputedStyle(b).color.match(/[\d.]+/g) || []).map(Number); const v = n.slice(0, 3).map((x) => (x > 1 ? x / 255 : x)); return +(0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]).toFixed(2); }));
      await page.emulateMedia({ colorScheme: null });
      ok(lum.length && Math.min(...lum) >= 0.4, `dark mode: every coloured key fact in a learn card is light enough to read (${lum.slice(0, 8).join(' ')})`);
    await page.goto(`${BASE}/#/t/${T}/sos`); await page.waitForSelector('.glg');
    const sosLinks = await page.$$eval('.glg a.glc', (as) => as.map((a) => a.getAttribute('href').replace(/^#\/t\//, '')));
    let ift = null; for (const r of sosLinks) { await page.goto(`${BASE}/#/t/${r}`); await page.waitForSelector('.tp.one'); if (await page.locator('.tp.one .ifts details.ifold').count()) { ift = r; break; } }
    ok(!!ift, `an if-then page among the emergency topics (${sosLinks.join(' ')})`);
    for (const [r, sel] of [[`${T}/learn/full/0`, '.tp.one .gcard'], [`${T}/learn/full/1`, '.tp.one details.sub'], [ift, '.tp.one .ifts details.ifold'], ['big-hop-2027/prep/full/7', '.tp.one .pg1>.call.info']]) {
      await page.goto(`${BASE}/#/t/${r}`); await page.waitForSelector(sel, { state: 'attached' });
      const c = await page.$$eval(sel, (es) => es.map((e) => ({ top: parseFloat(getComputedStyle(e).borderTopWidth), r: parseFloat(getComputedStyle(e).borderTopLeftRadius), kf: [...e.querySelectorAll('b.kf')].every((b) => getComputedStyle(b).display === 'inline') })));
      ok(c.length && c.every((x) => x.top >= 3 && x.r >= 12 && x.kf), `${r}: every ${sel.split(' ').pop()} a card with a coloured top edge, bold times inside their sentence (${JSON.stringify(c.slice(0, 3))})`); }
    await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid .tile.today small');
    await page.evaluate(() => document.querySelectorAll('.hubgrid').forEach((g) => { g.className = g.className.replace(/tl-\w+/, 'tl-pastel'); }));   // the colourful look, whatever an earlier step chose
    const c = await page.evaluate(`(${CONTRAST})(document.querySelectorAll('.hubgrid .tile small'), (e) => { const g = document.createElement('i'); g.style.backgroundColor = getComputedStyle(e.closest('.tile')).borderTopColor; document.body.appendChild(g); return g; })`);
    ok(c.n >= 6 && c.worst >= 4.5, `book menu (light): every tile's second line reads on its pastel (worst ${c.worst.toFixed(2)}:1 of ${c.n}; the dark mode's pale grey once leaked here)`);
    await page.goto(`${BASE}/#/t/big-hop-2027/prep`); await page.waitForSelector('.glg'); }
  await page.goto(`${BASE}/#/t/big-hop-2027/plan/full`); await page.waitForSelector('.itin > li.now');
  ok(await page.locator('.itin > li.now .dayplan[open]').count() === 1 && (await page.textContent('.itin > li.now .dayplan')).includes('Bald Hill') && (await page.textContent('.itin > li.now .dayplan')).includes('Waldegrave'), "AU itinerary: today's plan is open, with the stay address");
  ok(((await page.textContent('.tp-plan')).match(/estimate from the manual/g) || []).length === 1, 'AU itinerary: the money note every day repeats is said once, at the foot of the page');
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
  ok(await page.locator('#pocket details.pg').count() >= 3 && await page.locator('.ifts').count() === 3 && await page.locator('table.ift').count() === 0 && await s.noHScroll(), 'emergency page: numbers, tonight\'s address, if-then + mishaps + who carries what; fits the phone');
  { const f = page.locator('.ifts details.ifold').first(), b = f.locator('.fb');
    ok(await page.locator('.ifts details.ifold').count() >= 30 && !(await b.isVisible()) && (await f.locator('summary').click(), await b.isVisible()) && (await f.locator('summary').boundingBox()).height >= 44,
      'emergency page: each “if” is one line; what to do opens under it on a tap (44 px)'); }
  { // two versions always (owner): the short report and the full one with every detail open, kept on the phone across a reload
    const all = page.locator('#pocket details.ifold'), open = () => page.$$eval('#pocket details.ifold', (ds) => ds.filter((d) => d.open).length);
    await page.locator('.repseg button[data-v="1"]').click();
    const n = await all.count(), fullOpen = await open();
    await page.reload(); await page.waitForSelector('#pocket');
    const kept = await open(), pressed = await page.locator('.repseg button[data-v="1"]').getAttribute('aria-pressed');
    await page.locator('.repseg button[data-v="0"]').click();
    ok(n >= 30 && fullOpen === n && kept === n && pressed === 'true' && await open() === 0 && (await page.locator('.repseg button').first().boundingBox()).height >= 44,
      `report: "full" opens every detail and stays after a reload, "short" folds them again (${fullOpen}/${kept}/${n})`); }
  { // the full report reads well on a phone (owner's review, Nov 2026): drive legs grouped by day, durations as docs/STYLE.md §5, short values on one line
    await page.goto(`${BASE}/#/t/big-hop-2027/prep/full`); await page.waitForSelector('#pocket');
    await page.evaluate(() => document.querySelectorAll('#pocket details').forEach((d) => (d.open = true)));
    const legs = await page.evaluate(() => { const t = document.querySelector('table.legs'); return t && { grp: t.querySelectorAll('tr.grp').length, rows: t.querySelectorAll('tbody tr').length, txt: t.textContent, short: t.querySelectorAll('td.s').length }; });
    ok(legs && legs.grp >= 8 && legs.rows - legs.grp >= 20 && !/ชม\. 00|\bh 00\b/.test(legs.txt) && legs.short > 20 && await s.noHScroll(),
      `full report: drive legs grouped under one heading a day, "1 h" not "1 h 00", short values on one line, no sideways scroll (${legs && legs.grp} days)`);
    await page.goto(`${BASE}/#/t/big-hop-2027/sos/full`); await page.waitForSelector('#pocket'); }   // back to the emergency page the next checks read
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
  ok(/Taxi card/.test(await page.textContent('#pocket')) && await page.locator('#pocket .ifts').count() === 1 && await s.noHScroll(), 'HK emergency page: the if-then cases and the Chinese taxi card');
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
  await ppOpen(page, 'mimi', 'big-hop-2027', 'missions');
  ok(await page.locator('#m1 .says li').count() >= 4 && await page.locator('#m1 .mquiz .qa').count() === 3, 'passport mission: the guide tells the facts + one line per stop; Kiki asks 3 quiz questions');
  await page.locator('#m1 .qa summary').first().click();
  ok(await page.locator('#m1 .qa[open] p').count() === 1, 'passport quiz: tap reveals the answer');
  await ppOpen(page, 'mimi', 'big-hop-2027', 'lists');
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
  ok(await page.locator('.eatc').count() === 294 && await page.locator('nav.bar a[aria-current=page][href$="/eat"] i.pic img').count() === 1, 'eat page: 294 places from the manual, tab highlighted');
  ok(await page.locator('.eatc a[href*="google.com/maps/search"]').count() === 588 && await page.locator('.eatc a[href*="maps/dir/"]').count() === 294, 'eat page: every place has a map link (name + button) and directions');
  await page.fill('#eatq', 'pie');
  const pies = await page.$$eval('.eatc', (els) => els.filter((e) => e.dataset.s.includes('pie')).length), shownPies = await page.locator('.eatc:visible').count();
  ok(shownPies === pies && pies > 10 && pies < 294 && await page.evaluate(() => document.activeElement.id) === 'eatq', `eat page: search filters in place and keeps the keyboard (${shownPies} pies)`);
  await page.fill('#eatq', 'noodel'); const ndl = await page.locator('.eatc:visible').count(), ndn = await page.textContent('#eatn');
  ok(ndl > 0 && ndl < 294 && /close|ใกล้เคียง/.test(ndn), `eat page: a slip ("noodel") still finds the noodles and says so (${ndl} · ${ndn})`);
  await page.fill('#eatq', ''); await page.click('[data-a="eatk"][data-v="2"]');
  ok(await page.locator('.eatc:visible').count() === 30, 'eat page: "cook it yourself" chip');
  await page.click('[data-a="eatk"][data-v="-1"]'); await page.click('[data-a="eatpick"]');
  ok(await page.locator('.eatc:visible').count() === 61 && (await page.textContent('#eatn')).includes('61'), 'eat page: picks in the plan');
  ok(await s.noHScroll(), 'eat page fits the phone');
  await s.shot('04-eat', false);
  await page.goto(`${BASE}/#/t/big-hop-2027/eat/d/0`); await page.waitForSelector('.eatday');
  ok(await page.locator('.eatday .daystrip a').count() === 16 && await page.locator('.emeal').count() === 1 && /Adina kitchen/.test(await page.locator('.emeal').first().textContent()), 'AU eat page: Day 1 dinner is the Adina kitchen or delivery');
  await page.goto(`${BASE}/#/t/big-hop-2027/eat/d/2`); await page.waitForSelector('.eatday .emeal');
  ok(await page.locator('.emeal').count() === 4 && await page.locator('.emeal .ealso .erow').count() >= 1 && /Jervis Bay/.test(await page.locator('.enears').textContent()), 'AU eat page, Day 3: four meals, more places that fit each meal, and what is near Jervis Bay');
  // the day's real radius: a Sydney day shows the places on its route first; the rest of the sixty fold away, never gone
  await page.goto(`${BASE}/#/t/big-hop-2027/eat/d/11`); await page.waitForSelector('.eatday .enears');
  const radius = await page.evaluate(() => { const t = trip('big-hop-2027'), { near, hot } = eatForDay(t, 11); return { all: near.reduce((a, g) => a + g.items.length, 0), hot: hot.size, open: document.querySelectorAll('.enears > .enear > .erows > li').length, folded: document.querySelectorAll('.emore .erows > li, .enearfar .erows > li').length }; });
  ok(radius.hot > 0 && radius.hot < radius.all / 2 && radius.open > 0 && radius.folded > radius.open, `AU eat page, Day 12: ${radius.hot} of ${radius.all} places on the route open first (${radius.open} rows), the rest folded (${radius.folded} rows)`);
  await page.goto(`${BASE}/#/t/big-hop-2027/eat/d/2`); await page.waitForSelector('.eatday .emeal');
  ok(await page.locator('.enear .ek').count() >= await page.locator('.enear').count() && /Cook it yourself/.test(await page.locator('.enears').textContent()), 'AU eat page: each nearby area says what kind of places it holds (same town, cafés vs cooking)');
  ok(await s.noHScroll(), 'eat day page fits the phone');
  await s.shot('04-eat-day', false);
  await page.goto(`${BASE}/#/t/hk-macau-2026/eat/all`); await page.waitForSelector('.eatc');
  ok(await page.locator('.eatc:visible').count() === 224 && await page.locator('[data-a="eatpick"][aria-pressed="false"]').count() === 1 && await page.locator('.eatc .zh').count() > 150, 'eat page (HK): 224 places from the manual with Chinese names; filters reset for another book');
  ok(s.errs.length === 0, 'AU: no console errors ' + s.errs.join(' | '));
  await s.ctx.close();
}

// every book's grey text reads on its cream panel and callout tints (Harbour Hop's #6D7480 was 4.2:1 on the panel)
{
  const lum = (h) => [0, 2, 4].map((i) => parseInt(h.slice(1 + i, 3 + i), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
  const cr = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  const css = fs.readFileSync('public/app.css', 'utf8'), root = (k) => css.match(new RegExp(`--${k}:(#[0-9A-Fa-f]{6})`))[1];
  const books = [['app default', { muted: root('muted'), panel: root('panel'), pick: root('pick'), warn: root('warn') }],
    ...fs.readdirSync('server/seeds').filter((f) => f.endsWith('.json')).map((f) => [f, JSON.parse(fs.readFileSync(`server/seeds/${f}`, 'utf8')).theme])];
  for (const [name, th] of books) {
    const worst = Math.min(...['panel', 'pick', 'warn', 'paper'].map((g) => cr(th.muted, th[g] || '#FFFFFF')));
    ok(worst >= 4.5, `${name}: muted text reads on paper, panel and callout tints (worst ${worst.toFixed(2)}:1)`);
  }
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
  await page.click('.kidback'); await page.click('.kidbar button[data-v$="/map"]'); await page.waitForSelector('.tmap .walkers');
  ok(await s.noHScroll(), 'map on a wide screen: no horizontal scroll');
  await s.shot('04-map', false);
  ok(s.errs.length === 0, 'kid wide: no console errors ' + s.errs.join(' | '));
  // sign out from the shelf: two taps → the login form; after a reload the cookie is gone, and the phone's offline copy with it
  await page.evaluate(() => ls('kidmode', null));
  // dark mode lightens the book's accent, so text on an accent fill turns dark (white on it was ~2.2:1)
  for (const tid of [T, 'big-hop-2027']) {
    await page.goto(`${BASE}/#/t/${tid}/today/1`); await page.waitForSelector('.day.today');
    const btn = await page.evaluate(`(${CONTRAST})(document.querySelectorAll('main .btn:not(.ghost):not(.danger):not(.confirm)'), (b) => b)`);
    ok(btn.n >= 1 && btn.worst >= 4.5, `${tid} dark: the accent button's label reads on it (${btn.n} buttons, worst ${btn.worst.toFixed(2)}:1)`);
    const dng = await page.evaluate(`(${CONTRAST})([(() => { const b = document.createElement('button'); b.className = 'btn danger'; b.textContent = 'x'; document.querySelector('main').appendChild(b); return b; })()], (b) => b)`);
    ok(dng.worst >= 4.5, `${tid} dark: a danger button (accent2 fill) reads (${dng.worst.toFixed(2)}:1)`);
  }
  await page.goto(`${BASE}/#/`); await page.waitForSelector('[data-a="logout"]');
  await page.click('[data-a="logout"]'); await page.click('[data-a="logout"]'); await page.waitForSelector('#lcode');
  await page.reload(); await page.waitForSelector('#lcode');
  ok((await page.evaluate(async () => (await idb.get('state')) == null)) && (await page.locator('[data-a="logout"]').count()) === 0, 'sign out: login form back, cookie gone after reload, offline copy cleared');
  await s.ctx.close();
}

// ---------- the adventure map on the owner's iPad size, the Australia book, with motion on (the owner's devices do not reduce motion) ----------
{
  const s = await session('quest-ipad', { width: 834, height: 1112, motion: true });
  const { page } = s;
  await page.clock.setFixedTime(new Date('2027-04-03T10:00:00+11:00'));   // day 2 of the Australia trip
  await login(page);
  await page.goto(`${BASE}/#/kid/mimi/quest`); await page.waitForSelector('.questpath');
  const au = await page.evaluate(() => { const t = kidTrip('mimi'), pl = questPlan(t, 'mimi'); return { id: t.id, towns: document.querySelectorAll('.qtown').length, lv: pl.map((d) => d[0].lv).join(','), same: pl.some((d, i) => i && d.some((m) => pl[i - 1].some((x) => x.game === m.game))), intro: document.querySelector('.kidguide p').textContent, tint: getComputedStyle(document.querySelector('#qt0 .qbody')).backgroundColor }; });
  ok(/big-hop/.test(au.id) && au.towns === 16 && au.lv === '2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10' && !au.same && /dropped the treasures/.test(au.intro) && au.tint !== 'rgb(250, 253, 255)' && await s.noHScroll(),
    `adventure map, Australia on an iPad: sixteen towns, the road climbs gently 2 → 10, neighbouring towns share no game, the guide opens the story, the town wears its own colour (${JSON.stringify(au)})`);
  await s.shot('01-road', false);
  // the first town's missions marked as played (the games themselves are played in the phone session), then the chest and the walk
  await page.evaluate(() => { const t = kidTrip('mimi'); [0, 1, 2, 3].forEach((k) => questMark(t, 'mimi', 0, k)); render(); });
  await page.click('.qchest.ready'); await page.waitForSelector('.qtreasure');
  const stay = await page.evaluate(() => ({ here: document.querySelector('.qtown.here').id, next: document.querySelector('#qt1').classList.contains('ahead'), at: questAt(kidTrip('mimi'), 'mimi') }));
  await page.click('[data-a="questnext"]');
  const walk = await page.evaluate(() => ({ ghost: document.querySelectorAll('.qwalk').length, walking: questWalking }));
  await page.waitForFunction(() => !questWalking && document.querySelector('#qt1.here.open'), null, { timeout: 8000 });
  const lifted = await page.evaluate(() => document.querySelectorAll('#qt1 .qcloud.lift').length);
  await page.waitForFunction(() => !document.querySelector('.qcloud.lift') && !document.querySelector('.qwalk'), null, { timeout: 5000 });
  ok(stay.here === 'qt0' && stay.next && stay.at === 1 && walk.ghost === 1 && walk.walking && lifted === 1 && await page.evaluate(() => document.querySelectorAll('#qt1 .qme').length === 1 && document.querySelectorAll('.qtown.ahead').length === 14),
    `adventure map: after the chest the child still stands in the town; "on to the next town" walks the character there, the cloud lifts, the town opens (${JSON.stringify({ stay, walk, lifted })})`);
  await s.shot('02-town2', false);
  await page.click('#qt1 .qm >> nth=0'); await page.waitForSelector('.lvbar.qbar');
  const worn = await page.evaluate(() => { const t = kidTrip('mimi'); return { small: document.querySelector('.kidday small').textContent, acc: document.querySelector('.kidwrap').style.getPropertyValue('--accent'), want: t.passport.days[1].acc || t.theme.accent, art: document.querySelector('.kidday .art').getAttribute('src') === dayArt(t, 1) }; });
  ok(/Town 2/.test(worn.small) && worn.acc === worn.want && worn.art, `adventure map: a mission page wears its town — the town's number, picture and colour in the header (${JSON.stringify(worn)})`);
  await page.click('.kidback'); await page.waitForSelector('.questpath');
  // a mission is made of its town: the day's things to spot, the trip's animals, the town's picture
  const things = await page.evaluate(() => ({ t1: questThings(kidTrip('mimi'), 1).map((x) => x[0]), an: questAnimals(kidTrip('mimi')).map((x) => x[0]), en: questThings(kidTrip('mimi'), 1).map((x) => x[2]).join('|') }));
  await page.click('#qt1 .qm >> nth=0'); await page.waitForSelector('.nextrow');
  const nx = await page.evaluate(() => kg.r.shown.slice());
  await page.click('.kidback'); await page.waitForSelector('.questpath');
  await page.click('#qt1 .qm >> nth=1'); await page.waitForSelector('.shbig');
  const sh = await page.evaluate(() => ({ deck: kg.deck.map((x) => x[0]), names: kg.deck.map((x) => x[2]).join('|'), uniq: new Set(kg.r.opts.map((o) => o[0])).size === kg.r.opts.length }));
  await page.click('.kidback'); await page.waitForSelector('.questpath');
  await page.click('#qt1 .qm >> nth=2'); await page.waitForSelector('#mazeb');
  const mzp = await page.evaluate(() => mz.pair.slice(0, 2));
  await page.click('.kidback'); await page.waitForSelector('.questpath');
  await page.click('#qt0 .qhead'); await page.waitForSelector('#qt0.open .qm'); await page.click('#qt0 .qm >> nth=2'); await page.waitForSelector('.jigboard');
  const jgs = await page.evaluate(() => ({ src: jg.src, want: dayArt(kidTrip('mimi'), 0), pix: document.querySelectorAll('.pixpick').length }));
  await page.click('.kidback'); await page.waitForSelector('.questpath');
  ok(things.t1.length === 4 && things.an.length >= 8 && /^hang-glider\|curvy bridge\|giant splash\|family van$/.test(things.en) && nx.every((e) => things.t1.includes(e)) && things.t1.every((e) => sh.deck.includes(e)) && sh.uniq
    && things.an.includes(mzp[0]) && things.t1.includes(mzp[1]) && jgs.src === jgs.want && jgs.pix === 0,
    `adventure map: a mission is made of its town — the pattern, the shadows and the maze use the day's things and the trip's animals, the jigsaw is the town's picture (${JSON.stringify({ things, nx, sh, mzp, jgs })})`);
  // the parents' line on the book's menu, and a fresh start behind two taps
  await page.goto(`${BASE}/#/t/big-hop-2027`); await page.waitForSelector('.questline');
  const pl = await page.evaluate(() => ({ rows: document.querySelectorAll('.questline li').length, text: document.querySelector('.questline li').textContent.replace(/\s+/g, ' ') }));
  await page.evaluate(() => document.querySelector('.questline').scrollIntoView({ block: 'center' })); await page.waitForTimeout(700); await s.shot('04-parents-line', false);
  await page.click('.questline [data-a="questreset"]');
  const still = await page.evaluate(() => questAt(trip('big-hop-2027'), 'mimi'));
  await page.click('.questline [data-a="questreset"]');
  await page.waitForFunction(() => queue.length === 0 && !document.querySelector('.questline'), null, { timeout: 15000 });
  const gone = (await apiState(page)).entries.filter((e) => /\.tick\.quest\./.test(e.id) && e.trip === 'big-hop-2027').length;
  ok(pl.rows === 1 && /Mimi is in town 2/.test(pl.text) && /1 treasure/.test(pl.text) && still === 1 && gone === 0, `adventure map: the book's menu tells the parents where the child is (only a child who has set off); "start again" takes two taps and clears the road (${JSON.stringify({ pl, still, gone })})`);
  await page.goto(`${BASE}/#/kid/mimi/quest`); await page.waitForSelector('.questpath');
  const noReset = await page.locator('#qreset').count();   // a road not started has nothing to reset
  await page.evaluate(() => { const t = kidTrip('mimi'); [0, 1, 2, 3, 'chest'].forEach((k) => questMark(t, 'mimi', 0, k)); render(); });
  await page.waitForSelector('#qreset'); await page.click('#qreset'); await page.waitForTimeout(300);
  const tapKeeps = await page.evaluate(() => questAt(kidTrip('mimi'), 'mimi'));   // a tap (a child's) does nothing
  await page.locator('#qreset').dispatchEvent('pointerdown'); await page.waitForFunction(() => questAt(kidTrip('mimi'), 'mimi') === 0 && !document.querySelector('#qreset'), null, { timeout: 6000 });
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  ok(noReset === 0 && tapKeeps === 1 && (await apiState(page)).entries.filter((e) => /\.tick\.quest\./.test(e.id) && e.trip === 'big-hop-2027').length === 0, 'adventure map: grown-ups start the road again from the map itself — press and hold (a tap does nothing); the button is there only once the road has begun');
  await page.evaluate(() => { const t = kidTrip('mimi'); [0, 1, 2, 3, 'chest'].forEach((k) => questMark(t, 'mimi', 0, k)); render(); });
  await page.setViewportSize({ width: 1112, height: 834 }); await page.waitForTimeout(200);
  ok(await s.noHScroll() && await page.evaluate(() => { const r = document.querySelector('.qtown.open .qms').getBoundingClientRect(); return r.width > 500 && r.right <= innerWidth; }), 'adventure map fits the iPad in landscape');
  await s.shot('03-landscape', false);
  ok(s.errs.length === 0, 'adventure map on the iPad: no console errors ' + s.errs.join(' | '));
  await s.ctx.close();
}

// ---------- the owner's UX review (Nov 2026), level 1: no sideways scroll at 320 px with the biggest text, 44 px taps, no zeros ----------
{
  const s = await session('lvl1', { width: 320, height: 568 });
  const { page } = s;
  await page.context().addInitScript(() => localStorage.setItem('mbs_fs', JSON.stringify(3)));
  await login(page); await page.reload(); await page.waitForSelector('.shelf');
  ok(await s.noHScroll(), '320 px at the biggest reading size: the shelf no longer scrolls sideways (its grid asked for 250 px columns)');
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid');
  ok(await s.noHScroll(), '320 px biggest text: the book menu fits');
  const zeros = await page.$$eval('.hubgrid small', (els) => els.map((e) => e.textContent).filter((x) => /(^|\s)0 (รูป|คำพูด|ครั้งแรก|รีวิว|ตรา)|\b0\/\d|ตรา 0\b/.test(x)));
  ok(zeros.length === 0, `menu tiles never show a zero or "0/6" (${zeros.join(' | ') || 'none'})`);
  // the same rule on every page a parent or a child reads before anything is recorded (a crawl of the app found these)
  { const Z = /(^|\s)0\/\d|(^|\s)0 (รูป|วัน|คำพูด|ครั้งแรก|ข้อความ|photos?|days?|quotes?|firsts?)\b/;
    for (const [r, w] of [[`#/t/${T}/prep`, '.tp-prep, .glc'], [`#/passport/mika/big-hop-2027/stickers`, '.stkhd'], [`#/print/big-hop-2027`, '.facts'], [`#/t/big-hop-2027/log/12/all`, '#lgphotos'], ['#/kid/mika/stickers', '.stkhd'], ['#/kid/mika/trophies', '.trophies'], ['#/notebook', 'main h1'], ['#/family', '.famh3']]) {
      await page.goto(`${BASE}/${r}`); await page.waitForSelector(w); const tx = await page.evaluate(() => (document.querySelector('main') || document.body).textContent.replace(/\s+/g, ' '));
      ok(!Z.test(tx), `${r}: no zero counter on the page (${(tx.match(Z) || [''])[0].trim() || 'none'})`); }
    // kid mode guards: a map with stops but no day that reaches one, two keys with one face in the match game, the words trophy, bubbles that survive a redraw, a child without a book
    const kidChecks = await page.evaluate(() => {
      const au = S.trips.find((t) => t.id === 'big-hop-2027'), t2 = JSON.parse(JSON.stringify(au)); t2.passport = { ...t2.passport, map: { stops: [{ k: 'a', x: 10, y: 10 }], days: [] } };
      const dupes = Array.from({ length: 40 }, () => matchDeck(au)).some((deck) => { const seen = new Map(); return deck.some((c) => c.e && seen.has(c.e) && seen.get(c.e) !== c.k || (c.e && seen.set(c.e, c.k) && false)); });
      const words = trophies(au, 'mimi').find((x) => x[0] === 'words');
      bubN = 7; bubT = setInterval(() => {}, 1e6); const field = document.createElement('div'); field.id = 'bubblefield'; document.body.appendChild(field); startBubbles(); const kept = bubN; clearInterval(bubT); bubT = null; bubN = 0; field.remove();
      S.children.push({ slug: 'nobody', name_th: 'ไม่มีใคร', name_en: 'Nobody', emoji: '🧸' }); const html = viewKid(['kid', 'nobody', 'home']); S.children.pop();
      return { map: mapModel(t2), dupes, words: typeof words[3] === 'boolean', kept, lock: html.includes('id="kidexit"') };
    });
    ok(kidChecks.map === null && !kidChecks.dupes && kidChecks.words && kidChecks.kept === 7 && kidChecks.lock, `kid mode: no walk → no map (${kidChecks.map}); one card per face (dupes ${kidChecks.dupes}); the words trophy counts (${kidChecks.words}); bubbles keep their score over a redraw (${kidChecks.kept}); a child without a book keeps the lock (${kidChecks.lock})`);
    // the record page: the spend amount and the day's summary are different drafts; the quote's child chip never redraws the page
    await page.goto(`${BASE}/#/t/${T}/log/1/all`); await page.waitForSelector('#spendamt'); await page.fill('#spendamt', '120'); await page.locator('#spendamt').blur();
    const dr = await page.evaluate(() => { const ks = Object.keys(drafts); document.querySelector('#app').dataset.mark = 'kept'; return { sa: ks.some((k) => k.startsWith('sa:')), s: ks.some((k) => k.startsWith('s:')), sum: document.querySelector('#sumtext').value }; });
    await page.click('[data-a="who"][data-v="mika"]');
    ok(dr.sa && !dr.s && dr.sum !== '120' && await page.evaluate(() => document.querySelector('#app').dataset.mark === 'kept' && document.querySelector('[data-a="who"][data-v="mika"]').getAttribute('aria-pressed') === 'true'), 'record page: a typed amount never lands in the summary box; the child chip switches in place');
    // the journey strip jumps to the day (its action took a selector, the strip passed a number)
    await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('.journey'); const errs0 = s.errs.length; await page.click('.journey a[data-a="jump"]'); await page.waitForTimeout(400);
    ok(s.errs.length === errs0 && await page.evaluate(() => window.scrollY > 100), 'book: the journey strip jumps to the day, without a script error');
    // what the parents type in #/family is text, never markup, wherever it lands (the kicker reaches the sign-in page before login)
    const kidsNow = await page.evaluate(() => S.children.map((k) => ({ slug: k.slug, name_th: k.name_th, name_en: k.name_en, emoji: k.emoji, birth_ym: k.birth_ym || '2023-01' })));   // a save needs every birth month
    await page.evaluate(async (kids) => api('PUT', '/api/b/family', { profile: { kicker: { th: 'ของ<b id="xss">x</b>', en: '<b id="xss">x</b>' } }, children: kids.map((k, i) => ({ ...k, name_en: i ? k.name_en : 'Mimi <i id="xss2">!</i>' })) }), kidsNow);
    await page.goto(`${BASE}/#/`); await page.reload(); await page.waitForSelector('.shelf'); await page.goto(`${BASE}/#/passport/mimi/${T}`); await page.waitForSelector('.pp-page');
    const xss = await page.evaluate(() => ({ a: !!document.querySelector('#xss, #xss2'), txt: document.body.textContent.includes('<i id="xss2">!</i>') }));
    await page.evaluate(async (kids) => api('PUT', '/api/b/family', { profile: {}, children: kids }), kidsNow);
    ok(!xss.a && xss.txt, 'a child\'s name and the kicker are shown as typed, never as markup (stored XSS)');
    await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid');
    // an imported book may carry an if-then table as {plans:{…}} and a visa without a step list: every info page still renders
    ok(await page.evaluate(() => { const t = JSON.parse(JSON.stringify(S.trips[0])); t.info = { ...t.info, ifthen: { plans: { head: { en: 'If' }, cols: [{ en: 'If' }, { en: 'Then' }], rows: [[{ en: 'Rain' }, { en: 'Museum' }]] } }, visa: { lede: { en: 'Visa-free' }, groups: [{ title: { en: 'Bring' }, items: [{ en: 'Passport' }] }] }, stays: undefined, more: [{ page: 'stays', title: { en: 'Where we sleep' }, text: { en: 'x' } }] }; try { return typeof infoBlocks(t) === 'object' && [viewHub(t), viewSearch(t), viewSos(t), viewPrep(t), viewStays(t), viewLearn(t), viewSos(t, true), viewPrep(t, true)].every((h) => typeof h === 'string' && h.length > 100); } catch (e) { return 'threw: ' + e.message; } }) === true, 'info pages render a book whose if-then table came as {plans}, whose visa has no steps and whose stays live only in a chapter');
  }
  await page.goto(`${BASE}/#/t/${T}/book`); await page.waitForSelector('.cover');
  ok(await page.locator('.bookstart').count() === 0 && await page.locator('.letterblk').count() === 1 && await page.locator('a[data-a="pdf"]:not(.linkbtn)').count() === 1 && await page.locator('.pdfsizes a[data-a="pdf"]').count() === 2, 'a book with records: no “still empty” card; the letter box and the PDF button are there');
  ok(await page.locator('.bookmore .linkbtn[data-a="print"]').count() === 1 && await page.locator('.bookmore .linkbtn[data-a="copytext"]').count() === 1 && await page.locator('.btn[data-a="print"], .btn[data-a="copytext"]').count() === 0 && await page.evaluate(() => document.querySelector('.bookmore').getBoundingClientRect().top > document.querySelector('a[data-a="pdf"]').getBoundingClientRect().bottom), 'book page: print and copy are quiet text buttons under the PDF button, not two more buttons beside it');
  ok(await page.locator('.cover .line .nowrap').count() === 2 && await page.evaluate(() => [...document.querySelectorAll('.cover .line .nowrap')].every((e) => e.getClientRects().length === 1)), 'cover: each child\'s name and age sits on one line (Thai word breaking split a name)');
  // every control a parent taps is at least 44 px tall on the pages used during the trip
  const audit = `(sel) => [...document.querySelectorAll(sel)].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 44 && !e.closest('details:not([open])'); }).map((e) => (e.textContent || e.className).trim().slice(0, 24) + ' ' + Math.round(e.getBoundingClientRect().height))`;
  const SEL = 'main .chip, main .btn.small, main .mini, main .seg button, main .linkbtn, a.maplink, .navb, .stayc .go, .eatday .go, .bag summary, .chk label, .remind .btn, .lpc, .dmore > summary';
  for (const [name, path, wait] of [['record', `/log/1/all`, '.daystrip'], ['today', `/today/1`, '.day.today'], ['eat', `/eat/d/1`, '.eatday'], ['sos', `/sos`, '.tp-sos']]) {
    await page.goto(`${BASE}/#/t/${T}${path}`); await page.waitForSelector(wait);
    const small = await page.evaluate(`(${audit})(${JSON.stringify(SEL)})`);
    ok(small.length === 0, `${name}: every tap target is 44 px or taller (${small.slice(0, 6).join(' | ') || 'all good'})`);
  }
  await s.shot('01-shelf-320-big');
  ok(s.errs.length === 0, 'level 1: no console errors ' + s.errs.join(' | '));
  await s.ctx.close();
}

// ---------- privacy and your data (#/privacy): before sign-in, and the erase box for editors ----------
{
  const s = await session('privacy', { width: 390, height: 844 });
  const { page } = s;
  await page.goto(`${BASE}/#/privacy`); await page.waitForSelector('.privacy');
  ok(await page.locator('.privacy .pvsec').count() === 7 && await page.locator('.pverase').count() === 0 && await page.locator('#lcode').count() === 0, 'signed out: the privacy page reads in full (seven sections, one crediting the pictures and sounds), no erase box, no login form');
  ok(await page.locator('.privacy .pvsec a[href*="Barking_of_a_dog"]').count() === 1 && await page.locator('.privacy .pvsec a[href*="by-sa/3.0"]').count() === 1, 'the privacy page credits the dog\'s bark (CC BY-SA: author, source and licence)');
  await page.goto(`${BASE}/#/`); await page.waitForSelector('#lcode');
  ok(await page.locator('.login a[href="#/privacy"]').count() === 1, 'the login page links to it');
  ok(await page.locator('.login a[href="#/help"]').count() === 1, 'the login page links to the guide');
  await page.goto(`${BASE}/#/help`); await page.waitForSelector('.helppg');
  ok(await page.locator('.helpc').count() === 11 && await page.locator('.helppg a.btn[href="#/"]').count() === 1 && await page.locator('#lcode').count() === 0, 'signed out: the guide reads in full, with a way back to sign in');
  await page.goto(`${BASE}/#/`); await page.waitForSelector('#lcode');
  await login(page);
  await page.goto(`${BASE}/#/privacy`); await page.waitForSelector('.pverase');
  ok(await page.locator('[data-a="erase"]').isDisabled() && await page.locator('.setlist a[href="#/privacy"]').count() === 0, 'editor: the erase box, its button off until the app name is typed');
  await page.fill('#erasetxt', await page.evaluate(() => appName()));
  ok(!(await page.locator('[data-a="erase"]').isDisabled()), 'typing the app name arms the button (the family test presses it)');
  await s.shot('01-privacy');
  await page.goto(`${BASE}/#/`); await page.waitForSelector('.setlist');
  ok(await page.locator('.setlist a[href="#/privacy"]').count() === 1, 'the shelf\'s settings list links to it');
  // the menu's colours are the family's choice: pastel (default) · the book's colour · plain; saved in the profile, the same on every phone
  await page.goto(`${BASE}/#/t/hk-macau-2026`); await page.waitForSelector('.tilepick');
  ok(await page.locator('.hubgrid.tl-pastel').count() >= 2 && await page.locator('.tilepick button[data-v="pastel"][aria-pressed="true"]').count() === 1, 'menu: pastel tiles by default, the switch at the foot');
  await page.click('.tilepick button[data-v="plain"]'); await page.waitForSelector('.hubgrid.tl-plain');
  const plainBg = await page.evaluate(() => getComputedStyle(document.querySelector('.hubgrid.tl-plain .tile.t-plan')).backgroundImage);
  ok(plainBg === 'none' && (await apiState(page)).family.tiles === 'plain', 'plain: white tiles (no pastel gradient), saved in the family profile');
  await page.click('.tilepick button[data-v="accent"]'); await page.waitForSelector('.hubgrid.tl-accent');
  ok((await apiState(page)).family.tiles === 'accent', 'the book\'s colour: saved too');
  await page.click('.tilepick button[data-v="pastel"]'); await page.waitForSelector('.hubgrid.tl-pastel');
  ok(s.errs.length === 0, 'privacy: no console errors ' + s.errs.join(' | '));
  await s.ctx.close();
}

// ---------- first run: the setup steps (#/start) ----------
{
  const s = await session('start', { width: 390, height: 844 });
  const { page } = s;
  await login(page);
  // a family with no children is sent to the steps from any page; "skip" ends that, the shelf's welcome card leads back
  await page.goto(`${BASE}/#/t/hk-macau-2026`); await page.waitForSelector('.hubgrid'); await page.evaluate(() => { S.children = []; ls('startDone', null); location.hash = '#/'; });
  await page.waitForSelector('.onb');
  ok(page.url().endsWith('#/start') && await page.locator('.onb .onbsteps li').count() === 4 && await page.locator('nav.bar').count() === 1 && await page.evaluate(() => getComputedStyle(document.querySelector('nav.bar')).display === 'none'), 'first run: no children → the shelf leads to the welcome step, four steps listed, no bottom bar');
  await s.shot('01-welcome', false);
  await page.click('[data-a="startskip"]'); await page.waitForSelector('.famwelcome');
  ok(page.url().endsWith('#/') && await page.locator('.famwelcome[href="#/start"]').count() === 1 && !!await page.evaluate(() => ls('startDone')), 'skip: back on the shelf, the welcome card leads to the steps again');
  await page.reload(); await page.waitForSelector('.shelf');   // the real family again
  // step 1 is the family form with a blank child when there is none; here the seeded family fills it
  await page.goto(`${BASE}/#/start/1`); await page.waitForSelector('.onb .famkid');
  ok(await page.locator('.onbdots span').count() === 4 && await page.locator('.onbdots span.on').count() === 1 && /ไปต่อ|continue/i.test(await page.textContent('[data-a="famsave"]')), 'step 1: the family form, dot 1 lit, the save button goes on');
  for (const [i, ym] of [['0', '2023-06'], ['1', '2025-04']]) if (!await page.inputValue(`input[data-fam="${i}:birth_ym"]`)) await page.fill(`input[data-fam="${i}:birth_ym"]`, ym);   // the seeded family carries no birth month; the form requires one
  await page.click('[data-a="famsave"]'); await page.waitForSelector('#vgpin');
  ok(page.url().endsWith('#/start/2') && await page.inputValue('#vgname') !== '' && await page.locator('.onbdots span.done').count() === 1, 'save → step 2: a relatives\' group named already, dot 1 done');
  await page.fill('#vgpin', '446688'); await page.click('.onb [data-a="vgsave"]'); await page.waitForSelector('.onb .vgjust');
  ok((await page.textContent('.onb .vgpin')).trim() === '446688' && (await page.evaluate(async () => (await (await fetch('/api/b/viewers')).json()).groups)).some((g) => g.pin && g.link), 'step 2: the PIN is shown once, the group exists with PIN + link');
  await s.shot('02-pin', false);
  await page.click('.onb a[href="#/start/3"]'); await page.waitForSelector('.onbicon');
  ok(await page.locator('.onb .onbsteps li').count() >= 1 && await page.locator('.onb a[href="#/start/4"]').count() === 2, 'step 3: Home-Screen steps for this device, an icon preview, done / later');
  await page.goto(`${BASE}/#/start/4`); await page.waitForSelector('.onbsteps.times');
  ok(await page.locator('.onbsteps.times li').count() === 4 && (await page.locator('.onb [data-a="remind"], .onb a[href="#/start/5"]').count()) >= 1, 'step 4: the four reminders and a way on');
  await page.goto(`${BASE}/#/start/5`); await page.waitForSelector('.onbways');
  ok(await page.locator('.onbway[data-a="newtrip"]').count() === 1 && await page.locator('.onbway[href="#/"]').count() === 1 && await page.locator('.onbsum li').count() === 4 && !!await page.evaluate(() => ls('startDone')), 'step 5: an empty book, the shelf, the summary; the steps are done');
  await s.shot('05-done', false);
  await page.evaluate(() => fetch('/api/b/viewers').then((r) => r.json()).then((j) => Promise.all(j.groups.filter((g) => /ญาติ|Relatives/.test(g.name)).map((g) => fetch('/api/b/viewers/' + g.id, { method: 'DELETE' })))));
  // the sample book: made for this family from the last step, its own children, every page of a seeded book; deleted from its menu
  await page.goto(`${BASE}/#/start/5`); await page.waitForSelector('.onbway[data-a="sample"]');
  await page.click('.onbway[data-a="sample"]'); await page.waitForSelector('.hubhead');
  const st1 = await apiState(page), sample = st1.trips.find((t) => t.id === 'sakura-hop-2028');
  ok(page.url().endsWith('#/t/sakura-hop-2028') && sample && sample.source === 'manual' && (sample.theme.children || []).map((k) => k.slug).join() === st1.children.map((k) => k.slug).join() && /Sakura/.test(await page.textContent('.hubhead h1')), 'sample: made on request as an app-made book with the family\'s own children, its menu opens');
  ok(await page.locator('.tile.t-today, .tile.t-plan, .tile.t-stays, .tile.t-sos').count() >= 3 && await page.locator('.tripdel [data-a="tripdel"]').count() === 1 && await page.locator('.onbway[data-a="sample"], .addway[data-a="sample"]').count() === 0, 'sample: the menu has its tiles and a delete button at the foot; the offer is gone once it exists');
  await s.shot('06-sample-menu', false);
  await page.goto(`${BASE}/#/t/sakura-hop-2028/today/0`); await page.waitForSelector('.day.today');
  ok(/¥9,000/.test(await page.textContent('main')), 'sample today: a money line written "today ≈" (lower case) shows its total — dayGlance\'s `pre` flag no longer hides the brief() teaser, which crashed the whole page');
  { const g = await page.evaluate(() => S.trips.find((x) => x.id === 'sakura-hop-2028').days.map((d) => ((d.plan || {}).plan || []).filter((r) => r.go).length));
    ok(g.length === 6 && g.every((n) => n === 1), `sample book: every day marks the step the family leaves on (go), one a day (${g.join(',')})`); }
  { const lost = await page.evaluate(todayLost, ['sakura-hop-2028']), n = await page.evaluate(() => S.trips.find((x) => x.id === 'sakura-hop-2028').days.length);
    ok(n >= 6 && lost.length === 0, `sample book: Today loses nothing of the old full plan either — every piece of all ${n} days of a book built by plan-to-seed is on Today or on the learn page (${lost.slice(0, 4).join(' | ') || 'nothing missing'}${lost.length > 4 ? ` … ${lost.length}` : ''})`); }
  await s.shot('07-sample-today');
  await page.goto(`${BASE}/#/t/sakura-hop-2028/book`); await page.waitForSelector('.cover');
  ok(await page.locator('.cover img[src^="/stock/"]').count() >= 1 || await page.locator('img[src^="/stock/"]').count() >= 1, 'sample: the book shows the library pictures');
  ok(await page.locator('.bookstart a.btn[href*="/log/"]').count() === 1 && await page.locator('.foreblk, .letterblk, .coverpick').count() === 0 && await page.locator('a[data-a="pdf"]:visible').count() === 0 && await page.evaluate(() => document.querySelector('.bookstart').getBoundingClientRect().top < document.querySelector('.bookstart').getBoundingClientRect().height + 900), 'empty book: the way in (“record the first day”) comes right after the cover; the foreword, letter, cover choice and PDF wait for content');
  await page.goto(`${BASE}/#/passport/${st1.children[0].slug}/sakura-hop-2028`); await page.waitForSelector('.advc');
  ok(/^\/stock\/jp\/stamp\.v\d+\.svg$/.test(await page.getAttribute('.advc img.crest', 'src')) && await page.locator('.pp-page').count() >= 1, 'sample: the passport takes the stock library\'s Japan stamp as its crest (no drawn art of its own, the generic guides)');
  { const ad = (sample.theme || {}).artDays || [], stamps = ((await page.evaluate(() => S.trips.find((t) => t.id === 'sakura-hop-2028').passport)) || {}).stamps || [];
    ok(ad.length === 6 && ad.every((u) => /^\/stock\/jp\/tokyo\/[a-z-]+\.v\d+\.svg$/.test(u)) && stamps.map((x) => x.art).join() === '/stock/jp/stamp.v1.svg,/stock/jp/tokyo/stamp.v1.svg',
      'sample: every Tokyo day has a stock library picture and the passport holds the Japan and Tokyo stamps (resolved by the server)');
    const r = await page.evaluate((u) => fetch(u).then((x) => [x.status, x.headers.get('content-type'), x.headers.get('cache-control')]), ad[0]);
    ok(r[0] === 200 && /svg/.test(r[1]) && /immutable/.test(r[2]), 'a stock picture is served as an immutable SVG'); }
  await page.goto(`${BASE}/#/t/hk-macau-2026`); await page.waitForSelector('.hubgrid');
  ok(await page.locator('[data-a="tripdel"]').count() === 0, 'a bundled book has no delete button');
  await page.goto(`${BASE}/#/t/sakura-hop-2028`); await page.waitForSelector('[data-a="tripdel"]');
  await page.click('[data-a="tripdel"]'); await page.click('[data-a="tripdel"]'); await page.waitForSelector('.shelf');
  ok(!(await apiState(page)).trips.some((t) => t.id === 'sakura-hop-2028') && await page.locator('.addway[data-a="sample"]').count() === 1, 'delete: two taps, the book is gone, the shelf offers the sample again');
  ok((await page.evaluate(async () => (await fetch('/api/b/trips/hk-macau-2026', { method: 'DELETE', headers: { 'x-mb': '1' } })).status)) === 409, 'the server refuses to delete a bundled book');
  ok(s.errs.length === 0, 'setup steps: no console errors ' + s.errs.join(' | '));
  await s.ctx.close();
}

// ---------- during the trip (the clock set to day 3 in Macau): the passport folds the other days; Mika's kid mode points ----------
{
  const s = await session('tripday');
  await s.page.clock.setFixedTime(new Date('2026-12-07T03:00:00Z'));   // 11:00 in Hong Kong / Macau, day 3 of the HK book
  await login(s.page);
  const page = s.page;
  await ppOpen(page, 'mimi', T, 'missions'); await page.waitForSelector('#m2');
  ok(await page.evaluate(() => ['#m0', '#m1', '#m2', '#m3'].map((id) => document.querySelector(`${id} details.mfold`).open).join()) === 'false,false,true,false' && await page.locator('#m2.today').count() === 1,
    'passport during the trip: only today’s mission is open, the other days fold away');
  await page.click('#m4 summary'); await page.waitForFunction(() => document.querySelector('#m4 details.mfold').open);
  ok(await page.locator('#m4 .spot button[data-a="tick"]').first().isVisible(), 'passport during the trip: a tap opens another day');
  await ppOpen(page, 'mimi', T, `visa-${T}`);
  ok(await page.locator('.ppstamp .stampbtn[data-d="2"]').count() === 1, 'passport during the trip: this trip\'s visa holds today\'s stamp button for a parent too');
  { // the kid door: the same book inside kid mode — locked, its pages turn by big buttons read aloud, no ✏️, no print
    await page.goto(`${BASE}/#/kid/mimi/stamp`); await page.waitForSelector(`.kidwrap .ppbook.inkid[data-page="visa-${T}"] .stampbtn[data-d="2"]`);
    const kd = await page.evaluate(() => ({ lock: !!document.querySelector('.kidwrap #kidexit'), tabs: document.querySelectorAll('.ppbook .pptabs button[data-a="kidnav"][data-say]').length, grown: document.querySelectorAll('.ppedit, .ppf, .ppprint, .ppkids, nav.bar').length,
      next: (document.querySelector('.ppturn [data-dir="next"]') || {}).dataset || {} }));
    ok(kd.lock && kd.tabs === 9 && kd.grown === 0 && kd.next.v === '#/kid/mimi/pass/missions', `kid door: this trip's visa with today's stamp, the book's nine pages as kid buttons, the lock, and nothing of the grown-ups' (${JSON.stringify(kd)})`);
    await page.click('.ppturn [data-dir="next"]'); await page.waitForSelector('.ppbook.inkid[data-page="missions"] .mission');
    ok(page.url().endsWith('#/kid/mimi/pass/missions') && await page.locator('.mission button[data-a="tick"]:not([disabled]):not([aria-disabled="true"])').count() === 0, 'kid door: ‹ › turn the pages inside kid mode; ticks stay with the grown-ups');
    await page.goto(`${BASE}/#/kid/mimi/pass/id`); await page.waitForSelector('.ppbook.inkid[data-page="id"] .bio');
    ok(await page.locator('.ppf').count() === 0 && await page.locator('.ppbook .growl li').count() === 2 && await page.locator('.kidbar').count() === 1, 'kid door: the Explorer ID with Mimi\'s trips, no boxes'); }
  await page.goto(`${BASE}/#/kid/mika/spot`); await page.waitForSelector('.kidspots');
  ok(await page.locator('.kidspots.little button[data-v^="little.d2."]').count() === 3, 'kid mode: Mika’s "point it" page has her three missions of today');
  // the morning surprise box: on a trip day kid mode greets with a box; opening it gives a sticker and shows today's missions; once
  await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('.kidtiles');
  ok(await page.locator('.kidgift').count() === 1 && await page.locator('.kidnight').count() === 0, 'kid mode on a trip morning: a surprise box waits on the home page');
  ok(await page.locator('.kidgift .box img.ku[src="/art/kidui/surprise.webp"]').count() === 1, 'kid home: the surprise-box banner shows the app\'s own picture, not an emoji');
  await page.click('.kidgift'); await page.waitForSelector('.giftbox');
  await page.click('.giftbox'); await page.waitForSelector('.giftopen .gstk', { timeout: 5000 });
  ok(await page.locator('.gmiss span').count() === 4 && await page.locator('.giftopen [data-v$="/spot"]').count() === 1, 'surprise box: a new sticker, today’s four things to find, and a button to go and find them');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  ok((await apiState(page)).entries.some((e) => e.first_key === 'gift.d2' && e.child === 'mimi') && await page.evaluate(() => stickerSet(trip('hk-macau-2026'), 'mimi').some((x) => x.k === 'gift.d2' && x.got)), 'surprise box: opened once (saved), its sticker is in Mimi’s sticker tray');
  await page.click('.kidbar button[data-v="#/kid/mimi"]'); await page.waitForSelector('.kidtiles');
  ok(await page.locator('.kidgift').count() === 0, 'surprise box: gone from home once opened');
  // every box's sticker is a picture of the library, never a bare emoji (owner, Nov 2026: "รูปการ์ดทำให้สวยขึ้นโดยใช้ไฟล์ในคลัง")
  { const bad = await page.evaluate(() => GIFT_E.map((e, i) => [e, giftArt(i)]).filter(([, a]) => !a).map(([e]) => e));
    const gone = await page.evaluate(async () => { const out = []; for (let i = 0; i < GIFT_E.length; i++) { const r = await fetch(giftArt(i)); if (!r.ok) out.push(giftArt(i)); } return out; });
    ok(!bad.length && !gone.length && await page.evaluate(() => stickerSet(trip('hk-macau-2026'), 'mimi').find((x) => x.k === 'gift.d2').img === giftArt(2)), `surprise box: all ${16} stickers are the library's pictures, in the sticker tray too (${bad.join(' ')} ${gone.join(' ')})`); }
  // every thing the books ask the children to find has a painted picture (owner, Nov 2026: 33 drawn with GPT from our prompts, public/art/spot)
  // WAIT = the two still to be painted (a waving hand, a pelican: sheet 10 of the owner's GPT prompts) — take them out of WAIT when they come
  { const r = await page.evaluate(async () => { const WAIT = /👋|🐦/u, out = { n: 0, miss: [], bad: [] }, seen = new Set();
      for (const t of S.trips.filter((x) => x.passport && (x.passport.days || []).length)) for (const kid of (t.theme.children || []).map((c) => c.slug)) t.days.forEach((_, i) => daySpots(t, i, kid).forEach((s) => { out.n++; const src = spotSrc(s.e, s); if (!src && !WAIT.test(s.e)) out.miss.push(s.e + ' ' + (s.en || '')); else if (src) seen.add(src); }));
      for (const src of seen) { const r = await fetch(src); if (!r.ok) out.bad.push(src); }
      out.castle = [spotSrc('🏰', { en: 'A sandcastle' }), spotSrc('🏰', { en: 'Point at the castle' }), spotSrc('⛪', { en: 'A church' })];
      return out; });
    ok(r.n > 40 && !r.miss.length && !r.bad.length && r.castle[0].endsWith('sandcastle.webp') && r.castle[1].endsWith('fairytale.webp') && !r.castle[2], `every thing to find has a picture, read by its name where an emoji means two things (${r.n} · ${r.miss.slice(0, 5).join(', ')} · ${r.bad.join(' ')} · ${r.castle.join(' ')})`); }
  // the parents close the boxes again for every child from the book's menu (owner: "ช่วยเคลียร์ surprise ให้ก่อนรอบนึงครับของสองคนเลย"), two taps
  { await page.evaluate(() => { ls('kidmode', null); location.hash = '#/t/hk-macau-2026'; }); await page.waitForSelector('.giftline [data-a="giftreset"]');
    await page.click('.giftline [data-a="giftreset"]'); await page.click('.giftline [data-a="giftreset"]');
    await page.waitForFunction(() => !S.entries.some((e) => /^gift\.d/.test(e.first_key || '')), null, { timeout: 5000 }).catch(() => {});
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
    const left = (await apiState(page)).entries.filter((e) => /^gift\.d/.test(e.first_key || '')).length;
    await page.evaluate(() => { ls('kidmode', 'mimi'); location.hash = '#/kid/mimi'; }); await page.waitForSelector('.kidtiles');
    ok(left === 0 && await page.locator('.giftline').count() === 0 && await page.locator('.kidgift').count() === 1, `surprise box: the parents close every box again, the morning box is back (${left} left)`);
    await page.click('.kidgift'); await page.waitForSelector('.giftbox'); await page.click('.giftbox'); await page.waitForSelector('.giftopen .gstk img', { timeout: 5000 });
    await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
    await page.click('.kidbar button[data-v="#/kid/mimi"]'); await page.waitForSelector('.kidtiles'); }
  // nowhere to get stuck (owner, Nov 2026: item 5 of the follow-ups): a locked tick in the passport says what to do, the lock says to hold
  { const toastIs = async (re) => page.waitForFunction((src) => [...document.querySelectorAll('.toast')].some((x) => new RegExp(src, 'i').test(x.textContent)), re.source, { timeout: 3000 }).then(() => true, () => false);
    await page.goto(`${BASE}/#/kid/mimi/pass/missions`); await page.waitForSelector('.mission.today .tick[aria-disabled="true"]');
    await page.click('.mission.today .tick[aria-disabled="true"] >> nth=0', { force: true });
    await page.waitForFunction(() => /\/kid\/mimi\/spot$/.test(location.hash), null, { timeout: 3000 }).catch(() => {});
    const toSpot = /\/kid\/mimi\/spot$/.test(await page.evaluate(() => location.hash));
    await page.locator('#kidexit').click(); const lockSays = await toastIs(/press and hold|กดแม่กุญแจ/);
    await page.evaluate(() => { ls('kidmode', null); location.hash = '#/passport/mimi/hk-macau-2026/missions'; }); await page.waitForSelector('.mission.today .tick[aria-disabled="true"]');
    await page.click('.mission.today .tick[aria-disabled="true"] >> nth=0', { force: true }); const editSays = await toastIs(/Edit|แก้ไข/);
    const lit = await page.locator('[data-a="ppedit"].golit').count();
    const pins = await page.evaluate(() => [...document.querySelectorAll('.mapdays .chip')].every((c) => c.getBoundingClientRect().height >= 44));
    ok(toSpot && lockSays && editSays && lit === 1 && pins, `nowhere to get stuck: a child's locked mission leads to today's things to find, the lock says to hold, a parent's locked tick points at ✏️, day chips are 44 px (${toSpot} · ${lockSays} · ${editSays} · ${lit} · ${pins})`);
    await page.evaluate(() => { ls('kidmode', 'mimi'); location.hash = '#/kid/mimi'; }); await page.waitForSelector('.kidtiles'); }
  // the evening: a "stamp today before bed" banner until the stamp is done
  await page.clock.setFixedTime(new Date('2026-12-07T11:00:00Z'));   // 19:00 in Macau
  await page.reload(); await page.waitForSelector('.kidtiles');
  ok(await page.locator('.kidnight').count() === 1, 'kid mode in the evening: "stamp today before bed!"');
  await page.click('.kidnight'); await page.waitForSelector('.stampbtn'); await page.click('.stampbtn');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  await page.click('.kidbar button[data-v="#/kid/mimi"]'); await page.waitForSelector('.kidtiles');
  ok(await page.locator('.kidnight').count() === 0, 'evening banner: gone once today is stamped');
  // the morning memory game: yesterday's questions (kind mquiz, written by Claude on the record page) as a 🧠 tile; no score
  await page.evaluate(async () => { await fetch('/api/b/entries/hk-macau-2026.mquiz.d1', { method: 'PUT', headers: { 'content-type': 'application/json', 'x-mb': '1' },
    body: JSON.stringify({ trip: 'hk-macau-2026', day: 1, kind: 'mquiz', text: JSON.stringify([{ q: 'Where does the fish live?', a: [{ e: '🌳', t: 'In a tree' }, { e: '💧', t: 'In the water' }, { e: '🚌', t: 'On a bus' }], ok: 1 }, { q: 'Where did we go?', a: [{ e: '🏰', t: 'Disneyland' }, { e: '🏖️', t: 'The beach' }], ok: 0 }]) }) }); });
  await page.reload(); await page.waitForSelector('.kidtiles button[data-v$="/memory"]', { state: 'attached' });
  await page.goto(`${BASE}/#/kid/mimi/memory`); await page.waitForSelector('.memq');
  await page.click('.mema button[data-ok="0"] >> nth=0'); await page.waitForTimeout(200);
  ok(await page.locator('.mema button.right').count() === 0 && await page.locator('[data-a="memnext"]').count() === 0, 'memory game: a wrong tap just says "try again" — no score, no lock');
  await page.click('.mema button[data-ok="1"]'); await page.waitForSelector('[data-a="memnext"]');
  ok(await page.locator('.mema button.right').count() === 1, 'memory game: the right picture lights up, then "next"');
  await page.click('[data-a="memnext"]'); await page.waitForFunction(() => document.querySelector('.memq b').textContent === 'Where did we go?');
  await page.click('.mema button[data-ok="1"]'); await page.click('[data-a="memnext"]'); await page.waitForSelector('[data-a="memagain"]');
  ok(true, 'memory game: two questions, then a well-done and "play again"');
  await page.evaluate(() => ls('kidmode', null));
  await page.clock.setFixedTime(new Date('2026-12-10T03:00:00Z'));   // the last day: the certificate comes by itself, for both
  for (const k of ['mimi', 'mika']) { await page.goto(`${BASE}/#/passport/${k}/${T}/cert`); await page.reload(); await page.waitForSelector('#cert').catch(async (e) => { console.log('DEBUG cert after reload:', await page.evaluate(() => `${location.hash} · ${document.querySelectorAll('#cert').length} cert · ${(document.querySelector('main') || document.body).innerText.slice(0, 400).replace(/\s+/g, ' ')}`)); await page.screenshot({ path: `${OUT}/debug-cert.png` }); throw e; }); }
  ok(await page.locator('#cert.earned').count() === 1 && (await page.textContent('#cert')).includes('pointed, touched'), 'on the last day the certificate is there without any ticking (Mika gets her own words)');
  await page.clock.setFixedTime(new Date('2026-12-07T03:00:00Z'));
  await page.goto(`${BASE}/#/kid/mimi/numbers`); await page.waitForSelector('.cnt');
  const cntPool = await page.evaluate(() => { const out = new Set(); for (let k = 0; k < 40; k++) { newCount(trip('hk-macau-2026'), 'mimi'); out.add(cnt.e); } return [...out]; });
  const todayE = await page.evaluate(() => daySpots(trip('hk-macau-2026'), 2, 'mimi').map((x) => x.e));
  ok(cntPool.some((e) => todayE.includes(e)), `kid mode counting: today's things to count (${cntPool.join(' ')})`);
  await page.goto(`${BASE}/#/kid/mimi/hearts`); await page.waitForSelector('.kidhearts-list');
  ok((await page.textContent('.kidhearts-list')).includes('soon') || await page.locator('.kidhearts-list button').count() > 0, 'kid mode hearts: a friendly line when none have come yet');
  await page.evaluate(() => ls('kidmode', null));
  await s.ctx.close();
}
{   // before the trip, in Thai: the countdown line keeps a space between "ไป" and the book's name
  const s = await session('pretrip');
  await login(s.page);
  await s.page.evaluate(() => { lang = 'th'; ls('lang', 'th'); });
  await s.page.goto(`${BASE}/#/kid/mimi`); await s.page.waitForSelector('.kidhello');
  ok(/อีก \d+ วัน เราจะไปฮ่องกง–มาเก๊ากัน!/.test(await s.page.textContent('.kidhello')), `kid mode countdown: a Thai sentence for a small child, the book's Thai name, no English (${(await s.page.textContent('.kidhello')).trim().slice(0, 40)})`);
  await s.page.evaluate(() => { ls('kidmode', null); ls('lang', null); });
  await s.ctx.close();
}
// ---------- a quick sign-in while the app's first ask is still on its way ----------
{
  const s = await session('slow-boot'); const { page } = s; let first = true;
  await page.route('**/api/b/state*', async (route) => {   // the boot's own ask (no session yet) answers late — after the sign-in has loaded the shelf
    if (first) { first = false; await new Promise((r) => setTimeout(r, 2500)); return route.fulfill({ status: 401, contentType: 'application/json', body: '{"error":"auth"}' }).catch(() => {}); }
    return route.continue(); });
  await page.goto(BASE + '/'); await page.waitForSelector('#lf');
  await page.fill('#lname', 'Mum'); await page.fill('#lcode', CODE); await page.keyboard.press('Enter'); await page.waitForSelector('.shelf');
  await page.waitForTimeout(3200);
  ok(await page.locator('.shelf').count() === 1 && await page.locator('#lf').count() === 0, 'a sign-in quicker than the app\'s first ask keeps the shelf: the late “not signed in” answer does not send the phone back to the sign-in page');
  await s.ctx.close();
}
// ---------- on the trip, a parent's phone: the app opens on Today, and Today opens with what is next ----------
{
  const s = await session('trip-today', { width: 412, height: 915 }); const { page } = s;
  await page.clock.setFixedTime(new Date('2026-12-06T12:00:00+08:00'));   // day 2 of the Hong Kong trip, noon
  await login(page);
  ok(!/\/today/.test(page.url()), 'right after signing in the shelf stays (the reminders ask, the books)');
  await page.goto(BASE + '/'); await page.waitForSelector('.nextc');
  ok(page.url().endsWith(`#/t/${T}/today`) && await page.locator('.daystrip a[aria-current="true"] .today').count() === 1, `on the trip the app opens on Today when the phone already holds the book and no page was asked for (${page.url()})`);
  const td = await page.evaluate(() => { const y = (q) => { const e = document.querySelector(q); return e ? e.getBoundingClientRect().top + scrollY : -1; };
    return { time: document.querySelector('.nextc time').textContent, head: document.querySelector('.nextc .nt b').textContent, then: (document.querySelector('.nextc .nt small') || {}).textContent || '', next: y('.nextc'), facts: y('.dfacts'), quick: y('.row.quick'), tl: y('#tlbox'), bag: y('details.bag'), mission: y('.call.mission'), ask: y('.ask'),
      rec: document.querySelectorAll('.row.quick a[href*="/log/"], .row.quick a[href*="/eat"]').length, h: document.querySelector('.nextc').getBoundingClientRect().height, qh: Math.min(...[...document.querySelectorAll('.row.quick .qlink')].map((a) => a.getBoundingClientRect().height)), rows: Math.min(...[...document.querySelectorAll('#tlbox li > div[role=button]')].map((a) => a.getBoundingClientRect().height)) }; });
  await s.shot('01-today-next', false);
  await page.click('.nextc'); await page.waitForFunction(() => Math.abs(document.querySelector('#tlbox').getBoundingClientRect().top) < 130);
  { // today's bag is the morning's job: open until the day is under way (two timed steps behind us) or everything is in; a tick counts in place
    const look = async (iso) => { await page.clock.setFixedTime(new Date(iso)); await page.evaluate(() => render()); return page.evaluate(() => ({ open: document.querySelector('details.bag').open, label: document.querySelector('.bag .bagn').textContent, past: document.querySelectorAll('#tlbox li.past').length, h: document.documentElement.scrollHeight })); };
    const noon = await look('2026-12-06T12:00:00+08:00'), early = await look('2026-12-06T07:20:00+08:00'), one = await look('2026-12-06T07:50:00+08:00'), two = await look('2026-12-06T08:05:00+08:00');
    await look('2026-12-06T07:20:00+08:00'); const was = await page.evaluate(() => ls('ck') || {}), n = await page.locator('.bag input[data-ck]').count(), seen = [];
    for (let k = 0; k < n; k++) { await page.locator('.bag input[data-ck]').nth(k).check(); seen.push(await page.textContent('.bag .bagn')); }
    await page.waitForFunction(() => !document.querySelector('details.bag').open, null, { timeout: 5000 }).catch(() => {});
    const done = await page.evaluate(() => ({ open: document.querySelector('details.bag').open, label: document.querySelector('.bag .bagn').textContent }));
    await page.evaluate((x) => ls('ck', x), was);
    // a step the plan marks as the one we leave on ("go") decides instead of the second step: Australia day 2 leaves at 10:30, the second step is 09:30
    const au = async (iso) => { await page.clock.setFixedTime(new Date(iso)); return page.evaluate(() => / open/.test(bagBlock(trip('big-hop-2027'), 1).slice(0, 60))); };
    const au945 = await au('2027-04-03T09:45:00+11:00'), au1035 = await au('2027-04-03T10:35:00+11:00');
    ok(au945 && !au1035, `Today's bag: where the plan marks the step we leave on, the bag stays open until then (Australia day 2: open at 09:45 with two steps gone ${au945}, folded at 10:35 ${!au1035})`);
    ok(!noon.open && noon.past >= 2 && early.open && early.past === 0 && !one.open && one.past === 1 && !two.open && two.past === 2 && early.h - one.h > 300 && !/\b0\//.test(noon.label + early.label)
      && seen[0] === `1/${n} packed` && seen[n - 1] === 'All packed ✓' && !done.open && done.label === 'All packed ✓',
      `Today on the trip: the bag is open in the morning (07:20) and one line from the step we leave on (the 07:40 taxi, marked "go": at 07:50 — ${early.h - one.h} px shorter — 08:05 and noon); a tick counts in place (${seen[0]} → ${seen[n - 1]}) and the last one folds it (${JSON.stringify({ noon, early, one, two, done })})`); }
  await page.clock.setFixedTime(new Date('2026-12-06T22:30:00+08:00')); await page.evaluate(() => render());
  const late = await page.evaluate(() => ({ done: document.querySelectorAll('a.nextc.done[href$="/log/1"]').length, past: document.querySelectorAll('#tlbox li.past').length, next: document.querySelectorAll('#tlbox li.next').length }));
  ok(td.time === '12:45' && /Sit-down show/.test(td.head) && /14:30/.test(td.then) && td.next > 0 && td.next < td.facts && td.facts < td.quick && td.quick < td.tl && td.tl < td.bag && td.bag < td.mission && (td.ask < 0 || td.mission < td.ask) && td.rec === 0 && td.h >= 60 && td.qh >= 44 && td.rows >= 44
    && late.done === 1 && late.past === 9 && late.next === 0 && await s.noHScroll(),
    `Today on the trip: the next step leads (12:00 → 12:45, then 14:30), then the day's facts, the two navigate pills, the timeline, the bag, the kids' mission, the helper last; nothing repeats the bar; after the last step the card leads to tonight's record (${JSON.stringify({ td, late })})`);
  // where to eat on the day itself: a meal behind us folds to one line, the one to eat now or next is ringed and tagged
  await page.goto(`${BASE}/#/t/${T}/eat`); await page.waitForSelector('.eatday .emeal');
  const eatAt = () => page.evaluate(() => ({ all: document.querySelectorAll('.emeal').length, past: [...document.querySelectorAll('details.emeal.pastm:not([open])')].map((m) => m.querySelector('.mtag').textContent), mark: [...document.querySelectorAll('.emeal.nextm')].map((m) => `${m.querySelector('.mtag').textContent} ${m.querySelector('.nexttag').textContent}`), sumH: Math.min(48, ...[...document.querySelectorAll('details.emeal > summary')].map((x) => x.getBoundingClientRect().height)) }));
  const eatLate = await eatAt();
  await page.clock.setFixedTime(new Date('2026-12-06T12:00:00+08:00')); await page.evaluate(() => render()); const eatNoon = await eatAt();
  await page.clock.setFixedTime(new Date('2026-12-06T10:00:00+08:00')); await page.evaluate(() => render()); const eatTen = await eatAt();
  await page.locator('details.emeal.pastm > summary').first().click();
  ok(eatNoon.all === 4 && eatNoon.past.join() === 'Breakfast' && eatNoon.mark.join() === 'Lunch Now' && eatTen.past.join() === 'Breakfast' && eatTen.mark.join() === 'Lunch Next' && eatLate.past.join() === 'Breakfast,Lunch,Dinner' && !eatLate.mark.length && eatNoon.sumH >= 44
    && await page.locator('details.emeal.pastm[open] .epick').count() === 1 && await s.noHScroll(),
    `eat page on the day: at 10:00 lunch is next, at 12:00 it is “now” and breakfast has folded to one line (a tap opens it), at 22:30 every timed meal has folded (${JSON.stringify({ eatTen, eatNoon, eatLate })})`);
  await page.goto(`${BASE}/#/t/big-hop-2027/stays`); await page.waitForSelector('.nstrip');
  const strip = await page.evaluate(() => ({ cut: [...document.querySelectorAll('.nstrip .nb')].filter((b) => b.scrollWidth > b.clientWidth + 1).map((b) => b.textContent), n: document.querySelectorAll('.nstrip .nb').length, scrolls: document.querySelector('.nstripw').scrollWidth > document.querySelector('.nstripw').clientWidth }));
  ok(strip.n >= 8 && !strip.cut.length && strip.scrolls && await s.noHScroll(), `night by night (Australia, nine stays): no stay's name is cut — the strip scrolls inside its own box, the page does not (${JSON.stringify(strip)})`);
  await page.goto(BASE + '/#/'); await page.waitForSelector('.shelf');
  ok(await page.locator('.spine:not(.add)').count() >= 2, 'the shelf is still one step away (asked for by name)');
  await page.clock.setFixedTime(new Date('2026-11-20T12:00:00+08:00')); await page.goto(BASE + '/'); await page.waitForSelector('.shelf');
  ok(!/\/today/.test(page.url()), 'before the trip the app opens on the shelf as always');
  await page.goto(`${BASE}/#/t/${T}/today`); await page.waitForSelector('#tlbox');
  ok(await page.locator('.nextc').count() === 0 && await page.evaluate(() => document.querySelector('#tlbox').getBoundingClientRect().top < document.querySelector('details.bag').getBoundingClientRect().top), 'before the trip: no “next” card, the timeline still comes before the bag');
  await page.goto(`${BASE}/#/t/${T}/eat/d/1`); await page.waitForSelector('.eatday .emeal');
  ok(await page.locator('.emeal.pastm, .emeal.nextm').count() === 0 && await page.locator('section.emeal').count() === 4, 'eat page before the trip: every meal open, none marked');
  await page.goto(`${BASE}/#/t/big-hop-2027/today/2`); await page.waitForSelector('#tlbox');
  await page.evaluate(() => { lang = 'en'; render(); });
  const words = await page.evaluate(() => [...document.querySelectorAll('#tlbox time')].map((x) => x.textContent));
  ok(words.includes('3 am') && !words.some((w) => /[\u0E00-\u0E7F]/.test(w)), `a time written in words reads in the page's language (${words.join(' ')})`);
  await s.ctx.close();
}
await browser.close();
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
