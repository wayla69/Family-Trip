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
async function session(name, { width = 390, height = 844, scheme = 'light', logall = true } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2, colorScheme: scheme, reducedMotion: 'reduce' });   // stable screenshots
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
  ok(await page.locator('.hubgrid .tile').count() >= 14 && await page.locator('.hubgrid .tile.today').count() === 1 && /อีก|to go/.test(await page.textContent('.tile.today')), 'book menu: topic tiles, today on top with the countdown');
  // the tiles sit in three named groups; before the trip "get ready" leads, and every tile is in exactly one group
  ok(await page.locator('.hubpart').count() === 3 && /ready|เตรียม/.test(await page.locator('.hubpart').first().textContent()) && await page.locator('.hubpart + .hubgrid').count() === 3 && await page.locator('.hubgrid.hero .tile').count() === 1, 'book menu: three named groups, "get ready" first before the trip');
  { // a fresh phone: the record page shows tonight's three (photos, words, moods) and "day done", the rest folded under "more"
    const f = await session('fold', { logall: false }); await login(f.page);
    await f.page.goto(`${BASE}/#/t/${T}/log/0`); await f.page.waitForSelector('details.more');
    const y = (q) => f.page.evaluate((q) => document.querySelector(q).getBoundingClientRect().top, q);
    ok(await f.page.locator('details.planblk:not([open])').count() === 1 && (await y('#lgphotos')) - (await y('.logprog')) < 140, 'record page: with the plan folded, the photo box sits right under the strip');
    ok(!(await f.page.locator('details.more').evaluate((d) => d.open)) && (await y('#qtext')) < (await y('[data-a="done"]')) && (await y('[data-a="done"]')) < (await y('details.more')) && !(await f.page.locator('#favtext').isVisible()), 'record page: quotes → mood → day done above the fold; favourite/note/firsts folded on a fresh day');
    await f.page.click('details.more .linkbtn[data-a="logall"]'); await f.page.waitForSelector('#favtext');
    ok(await f.page.locator('#favtext').isVisible() && await f.page.evaluate(() => localStorage.getItem('mbs_logall') === '1'), 'record page: "keep open" shows every box and is remembered on this phone');
    await f.ctx.close();
  }
  ok(await page.locator('.tile[href$="/eat"]').count() === 1 && await page.locator('.tile[href$="/sos"]').count() === 1 && await page.locator('.tile[href$="/stays"]').count() === 1 && await page.locator('.tile.kid[data-a="kidmode"]').count() === 1, 'book menu: eat, emergency, stays, kid mode tiles');
  ok(await page.evaluate(() => [...document.querySelectorAll('.hubgrid .tile')].every((t) => t.scrollHeight <= t.clientHeight + 1)), 'book menu: no tile clips its text (the kid-mode button grows like the link tiles)');
  ok(await page.evaluate(() => [...document.querySelectorAll('.hubgrid .tile')].every((t) => getComputedStyle(t).marginTop === '0px' && getComputedStyle(t).marginBottom === '0px')), 'book menu: no tile carries its own margin, so a row lines up (the bookshelf tile used to pick up the shelf page’s 22 px)');
  ok(await page.locator('nav.bar .in > *').count() === 5 && await page.locator('nav.bar a[aria-current=page][href$="/hk-macau-2026"] i.pic img').count() === 1 && await page.locator('nav.bar .in > * i.pic img').count() === 5 && (await page.locator('nav.bar .in > *').first().boundingBox()).height >= 60, 'quick bar: five big stops with their pictures, menu highlighted');
  await page.click('.tile[href$="/today"]'); await page.waitForSelector('.day.today');
  ok(await page.locator('details.dmore:not([open])').count() === 1 && await page.locator('details.bag:not([open])').count() === 1 && await page.locator('.call.info.pre a[href$="/prep"]').count() === 1 && await page.locator('.call.info.pre a[href$="/offline"]').count() === 1 && await page.locator('.mission').count() === 0 && await page.evaluate(() => document.documentElement.scrollHeight < 1700), `today before the trip: countdown with “what to prepare” and “store the book”, the timeline, the rest of the day and the bag each folded to one line, no kids’ mission yet (${await page.evaluate(() => document.documentElement.scrollHeight)} px)`);
  await page.evaluate(() => { document.querySelector('details.dmore').open = true; });
  ok(await page.evaluate(() => { const rows = [...document.querySelectorAll('.cbox .dsheet>div')]; return rows.length > 0 && rows.every((r) => r.querySelector('dt').getBoundingClientRect().width <= r.getBoundingClientRect().width * 0.36); }), 'today: in the answer boxes the label column stays narrow and the answer gets the room');
  ok(await page.locator('.daystrip a').count() === 6 && await page.locator('.call.info').count() === 1 && await page.locator('.dsheet > div').count() >= 4 && await page.locator('.tl.plan.brief li').count() >= 4 && await page.locator('.reportbtn[href$="/today/0/full"]').count() === 1 && await page.locator('.top .ttl small', { hasText: /วันนี้|Today/ }).count() === 1, "today page: day strip, countdown banner, day 1 at a glance (short timeline + answer cards, full report one tap away), topic named in the top bar");
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
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('.daystrip');
  // the strip under the date: tonight's three, ✓ where the day holds something, ○ where it is still empty; a tap jumps to that box
  ok(await page.evaluate(() => { const cs = [...document.querySelectorAll('.logprog .lpc')], es = entriesOf('hk-macau-2026', 1);
    const want = { '#lgphotos': mediaOf('hk-macau-2026', 1).length > 0, '#lgquotes': es.some((e) => e.kind === 'quote'), '#lgmood': es.some((e) => e.kind === 'mood' && e.mood) };
    return cs.length === 3 && cs.every((c) => document.querySelector(c.dataset.v) && c.classList.contains('on') === want[c.dataset.v] && c.querySelector('i').textContent === (want[c.dataset.v] ? '✓' : '○')); }), 'record page: the strip under the date says which of photos · words · mood the day already holds');
  await page.click('.logprog .lpc[data-v="#lgmood"]'); await page.waitForFunction(() => Math.abs(document.querySelector('#lgmood').getBoundingClientRect().top) < 140);
  ok(true, 'record page: a tap on the strip scrolls to that box');
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('.daystrip');
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
  await page.goto(`${BASE}/#/t/${T}/log/2`); await page.waitForSelector('button[data-a="first"][data-v="mickey"][data-k="mimi"]');
  const fbtn = page.locator('button[data-a="first"][data-v="mickey"][data-k="mimi"]');
  ok(await fbtn.getAttribute('aria-pressed') === 'false' && /2/.test(await fbtn.locator('.fday').textContent()), 'firsts: another day shows the day it happened, not a tick');
  await fbtn.click(); await page.waitForTimeout(300);
  ok(await page.evaluate(() => S.entries.some((e) => e.kind === 'first' && e.first_key === 'mickey' && e.child === 'mimi' && e.day === 1)), 'firsts: a tap on another day never removes it from its own day');
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('button[data-a="first"][data-v="mickey"][data-k="mimi"][aria-pressed="true"]');
  // what we actually spent: category + amount + a word → a row and the day's total; the trip total appears underneath
  await page.click('button[data-a="spendcat"][data-v="transport"]');
  await page.fill('#spendamt', '120'); await page.fill('#spendnote', 'แท็กซี่ไปดิสนีย์'); await page.click('button[data-a="addspend"]');
  await page.waitForSelector('.spend .items li');
  ok(await page.locator('.spend .items li', { hasText: 'แท็กซี่ไปดิสนีย์' }).count() === 1 && /120/.test(await page.locator('.spend h3 .label').textContent()) && /120/.test(await page.locator('.spend p.lede').textContent()), 'spend: a row with its note, the day total and the trip total');
  ok(await page.locator('button[data-a="spendcat"] img.emi').count() === 6 && await page.locator('.spend .items li img.emi[src="/art/emoji/taxi.webp"]').count() === 1, 'spend: the categories and the row show the library pictures (🚕 = the taxi)');
  ok(await page.evaluate(() => { const box = document.createElement('div'); box.innerHTML = tagHtml('animals') + bagBlock(trip(location.hash.split('/')[2]), 1); return !!box.querySelector('img.emi[src="/art/emoji/koala.webp"]') && box.querySelectorAll('.bagl img.emi').length === box.querySelectorAll('.bagl li').length; }), 'photo tags and today’s bag draw the library pictures');
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
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('.spend p.lede');
  ok(/≈/.test(await page.textContent('.spend p.lede')) && await page.evaluate(() => (ls('fx') || {}).HKD) === 4.5, 'baht: the record page shows the trip total in baht too; the rate lives on this phone');
  // the home-screen icon shortcuts open today's record page with the box in view
  await page.goto(`${BASE}/#/go/quote`); await page.waitForSelector('#qtext');
  await page.waitForFunction(() => document.activeElement && document.activeElement.id === 'qtext', null, { timeout: 3000 }).catch(() => {});
  ok(/\/log\/\d+$/.test(await page.evaluate(() => location.hash)) && await page.evaluate(() => document.activeElement && document.activeElement.id === 'qtext'), 'shortcut "quote": today\'s record page, the cursor in the quote box');
  await page.goto(`${BASE}/#/go/photo`); await page.waitForSelector('.golit [data-a="pickphotos"]', { timeout: 3000 }).catch(() => {});
  ok(await page.locator('.golit [data-a="pickphotos"]').count() === 1, 'shortcut "photo": the photo box is lit up and in view');
  const man = await (await page.request.get(`${BASE}/manifest.webmanifest`)).json();
  ok(man.shortcuts.length === 4 && man.shortcuts.every((s) => s.url.startsWith('/#/go/') && s.name && s.short_name), 'manifest: four icon shortcuts to #/go/…');
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
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('#qtext');
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
  ok(hubPics.tiles >= 12 && hubPics.pics === hubPics.tiles && hubPics.ok, `book menu: all ${hubPics.tiles} cards show a glossy picture, every one loads`);
  // every icon the manifest names exists at its stated size; each shortcut has its own picture; iPhone gets a 180 px icon
  const icons = [...man.icons, ...man.shortcuts.flatMap((s) => s.icons)], sizes = [];
  for (const ic of icons) { const r = await page.request.get(BASE + ic.src); const m = r.ok() ? await sharp(await r.body()).metadata() : {}; sizes.push(`${m.width}x${m.height}` === ic.sizes); }
  const touch = await page.evaluate(() => document.querySelector('link[rel="apple-touch-icon"]').getAttribute('href'));
  const tm = await sharp(await (await page.request.get(BASE + touch)).body()).metadata();
  ok(sizes.every(Boolean) && new Set(man.shortcuts.map((s) => s.icons[0].src)).size === 4 && man.icons.some((i) => i.purpose === 'maskable') && tm.width === 180 && !tm.hasAlpha, 'app icons: every manifest icon at its size, four shortcut pictures, a maskable one, an opaque 180 px iPhone icon');
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('#qtext');
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
  await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('.clips audio');
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
  ok((await apiState(page)).media.filter((m) => !(m.mime || '').startsWith('audio/')).length === 3, '3 photos uploaded (the voice memo is not a photo)');
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
  ok(st.media.filter((m) => !(m.mime || '').startsWith('audio/')).length === 2 && st.media.some((m) => m.caption === 'ที่ท่าเรือ' && m.highlight), 'second tap deleted; caption + ⭐ saved');
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
  await page.goto(`${BASE}/#/t/${T}/today/1`); await page.waitForSelector('.day.today');
  const bagKeys = await page.$$eval('.bag input[data-ck]', (els) => els.map((e) => e.dataset.ck));
  ok(['kidpp', 'sun', 'pram', 'spare'].every((k) => bagKeys.includes(`${T}.bag.d1.${k}`)) && !bagKeys.includes(`${T}.bag.d1.passports`) && /\d\d:\d\d · /.test(await page.textContent('.bag')), "today page: today's bag lists what the day's plan needs, with the reason (and not the passports on a city day)");
  ok(await page.locator('details.bag:not([open])').count() === 1 && !/0\//.test(await page.textContent('.bag summary')), 'today page before the trip: the bag is one closed line and names how many things, never “0/n packed”');
  await page.click('.bag summary'); await page.check(`.bag input[data-ck="${T}.bag.d1.sun"]`); await page.reload(); await page.waitForSelector('.bag');
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
  const pickDd = await page.$$eval('.dsheet > div:not(.meal) > dd', (els) => els.map((e) => e.textContent));
  const seedPick = await page.evaluate(() => T(S.trips.find((x) => x.id === 'hk-macau-2026').days[1].plan.pick));
  ok(seedPick.length > 110 && pickDd.includes(seedPick), "today page: the local pick is shown whole (it was cut at 110 characters)");
  const seedWx = await page.evaluate(() => T(S.trips.find((x) => x.id === 'hk-macau-2026').days[1].wx));
  ok(seedWx.length > 110 && pickDd.includes(seedWx), 'today page: the weather is shown whole (it was cut to its first clause)');
  const seedMv = await page.evaluate(() => T(S.trips.find((x) => x.id === 'hk-macau-2026').days[1].plan.moving));
  ok(seedMv.length > 110 && pickDd.includes(seedMv), 'today page: getting around is shown whole');
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
  ok(await page.locator('.steps > li').count() === 8 && await page.locator('.steps > li.ok').count() === 1 && await page.locator('.steps > li').nth(1).locator('.when').textContent() === 'This week · early Oct' && await page.locator('.steps > li').nth(0).locator('.pts > li').count() === 6,
    'prep: the booking timeline is a list of steps — date chip, task, short points (the done one ticked)');
  { const vp = page.viewportSize(); await page.setViewportSize({ width: 1440, height: 900 }); await page.waitForTimeout(200);
    const xs = await page.$$eval('.steps > li', (ls) => [...new Set(ls.map((l) => Math.round(l.getBoundingClientRect().left)))]);
    await page.setViewportSize(vp);
    ok(xs.length === 2, `prep, wide screen: the booking steps read in two columns (${xs.join(' / ')})`); }
  ok(!/no booking|book Nov/.test(await page.locator('.steps').evaluate((e) => e.closest('details').querySelector('.lede').textContent)), 'prep: the booking timeline opens with its date line only (no shredded status list)');
  await page.goto(`${BASE}/#/t/${T}/learn/full`); await page.waitForSelector('.gcards');
  const gl = await page.$$eval('.gcard .pts > li', (els) => els.map((e) => e.textContent.trim()));
  ok(gl.length > 10 && gl.every((x) => !/^[a-z]+(?=[\s,:;]|$)/.test(x)) && await page.locator('.gcard summary b + .gsub').count() === 13, 'learn: guide cards put the headline first and no point starts mid-sentence ("book 3–5 days ahead" → "Book …")');
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
  ok(await page.locator('.mdays .chip').count() === 6 && await page.locator('.mfold[open]').count() === 1 && await page.locator('#m0 .mfold[open]').count() === 1 && await page.evaluate(() => document.documentElement.scrollHeight < 11000), `passport before the trip: day chips, only day 1's mission open (${await page.evaluate(() => document.documentElement.scrollHeight)} px)`);
  await page.click('.mdays [data-a="mday"][data-v="1"]'); await page.waitForSelector('#m1 .mfold[open]');
  ok(await page.locator('.mfold[open]').count() === 1 && await page.locator('.mdays .chip[aria-pressed="true"][data-v="1"]').count() === 1, 'a tap on day 2 opens its mission and folds day 1');
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
  ok(await page.locator('.cert:not(.earned)').count() === 1 && /last day/.test(await page.textContent('#cert')) && !/Tick \d|0\/|more in/.test(await page.textContent('.pp')),
    'play, not homework: before the trip the certificate simply waits for the last day; no "0/27" counters or "tick N more" anywhere');
  ok(/⭐\s*1/.test(await page.textContent('#m1 .spothd')), 'a found thing is celebrated (⭐ 1), nothing missing is counted');
  ok(await s.noHScroll(), 'passport: no horizontal scroll at 390 px');
  await s.shot('06-passport');
  await page.click('.ppkids a[role=tab][href^="#/passport/mika"]'); await page.waitForSelector('.pp.kid-mika');
  ok(await page.locator('.dstamp.new').count() === 0, 'passport: stamp animation plays once, not on every visit');
  ok(await page.locator('.bdg').count() === 0 && await page.locator('#lwords .lwl li').count() === 1 && await page.locator('.mission .tick.on').count() === 0, 'passport: Mika has her own ticks (none yet) and her own words');
  // the little one's edition (seed passport.little): point / touch / sound missions, no words-to-say or explorer list, a new-words page
  ok(await page.locator('#m1 .spot.little button[data-v="little.d1.castle"]').count() === 1 && await page.locator('#m1 .mquiz').count() === 0 && await page.locator('#pl-words, #pl-master, #decl').count() === 0 && await page.locator('#pl-dimsum').count() === 1,
    'little edition: Mika points at the castle; no quiz, no Cantonese words, no explorer list or customs form (the dim sum card stays)');
  ok(/bye-bye/.test(await page.getAttribute('#lw-mika', 'placeholder')), 'little edition: the word box shows its whole example (quotes do not cut it)');
  await page.fill('#lw-mika', 'บ๊ายบาย'); await page.click('[data-a="littleword"][data-k="mika"]');
  await page.waitForFunction(() => [...document.querySelectorAll('#lwords .lwl li')].some((li) => li.textContent.includes('บ๊ายบาย')), null, { timeout: 5000 });
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  ok((await apiState(page)).entries.some((e) => e.kind === 'quote' && e.child === 'mika' && e.text === 'บ๊ายบาย'), 'little edition: a new word is saved as Mika’s quote (book, PDF and story see it)');
  await page.click('button[data-a="tick"][data-v="little.d1.castle"]'); await page.waitForSelector('#m1 .tick.on');
  ok(/⭐\s*1/.test(await page.textContent('#m1 .spothd')) && !(await page.locator('#cert').getAttribute('class')).includes('earned'), 'little edition: a pointed-at castle gets a star; the certificate still just waits for the last day');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  await page.click('.ppkids a[href="#/passport/mika/big-hop-2027"]'); await page.waitForSelector('#m15');
  ok(await page.locator('.mission').count() === 16 && (await page.textContent('.guides')).includes('Ranger Roo'), 'passport: Australia — Ranger Roo, Kiki and 16 missions');
  ok(await page.locator('#m3 .spot.little button[data-v="little.d3.hop"]').count() === 1 && await page.locator('.mission .spot.little').count() === 16 && await page.locator('#pl-words, #pl-master, #decl').count() === 0 && await page.locator('#lwords').count() === 1,
    'Australia, little edition too: Mika hops like a kangaroo on day 4 — a point/touch/sound mission every day, her new-words page, no words-to-say, explorer list or customs form');
  await page.click('.ppkids a[role=tab][href="#/passport/mimi/big-hop-2027"]'); await page.waitForSelector('.pp.kid-mimi #pl-master');
  ok(await page.locator('.mission .spot.little').count() === 0 && await page.locator('#m3 button[data-v^="spot.d3."]').count() === 4, 'Australia: Mimi keeps her own find-these missions');
  await page.click('.ppkids a[role=tab][href="#/passport/mika/big-hop-2027"]'); await page.waitForSelector('.pp.kid-mika #lwords'); await page.waitForSelector('#m15 .spot.little', { state: 'attached' });   // (folded before the trip) Mika's page itself (#m15 alone also matches Mimi's page still on screen)
  await page.locator('.mapsec').screenshot({ path: path.join(OUT, 'phone-06b-map-au.png') });
  // kid mode: big buttons, locked until a grown-up holds the lock
  await page.evaluate(() => { window.__said = []; Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
    speak(u) { window.__said.push(`${u.text}|${u.lang}`); }, cancel() {}, onvoiceschanged: null,
    getVoices: () => ['zh-HK', 'th-TH', 'en-GB', 'pt-PT'].map((l) => ({ lang: l, name: l })) } }); });
  await page.clock.setFixedTime(new Date('2026-12-06T12:00:00+08:00'));   // day 2 of the Hong Kong trip (timers keep running)
  await page.goto(`${BASE}/#/t/${T}/today`); await page.waitForSelector('.day.today');
  ok(/Disneyland/.test(await page.textContent('.day.today h3')) && await page.locator('.daystrip a[aria-current="true"] .today').count() === 1 && await page.locator('.daystrip a').nth(1).getAttribute('aria-current') === 'true'
    && await page.locator('.day.today .tag').count() === 1 && await page.locator('.call.info').count() === 0 && await page.locator('.quick a[href$="/log/1"]').count() === 1 && await page.locator('details.dmore').count() === 0 && await page.locator('details.bag[open]').count() === 1 && await page.locator('.mission').count() === 1, 'HK on day 2: Today opens Disneyland day by itself, marked “Today” in the strip, no countdown banner, Record goes to day 2');
  await page.goto(`${BASE}/#/t/${T}`); await page.waitForSelector('.hubgrid');
  ok(/(Day 2 of 6|วันที่ 2)/.test(await page.textContent('.tile.today')), 'HK on day 2: the menu’s Today tile names day 2');
  await page.goto(`${BASE}/#/passport/mimi/${T}`); await page.waitForSelector('.kidgo');
  await page.click('.kidgo'); await page.waitForSelector('.kidwrap .kidtiles');
  ok(await page.locator('.kidtiles button').count() === 15 && await page.locator('.kidtiles button[data-v$="/map"], .kidtiles button[data-v$="/stickers"], .kidtiles button[data-v$="/trophies"]').count() === 0 && await page.locator('.kidbar button[data-v$="/map"]').count() === 1 && await page.locator('.kidtiles button[data-v$="/animals"]').count() === 1 && await page.locator('.kidtiles button[data-v$="/quiz"]').count() === 1 && await page.locator('nav.bar').count() === 0, 'kid mode on the trip: 11 big tiles (colour, draw, find, stamp, say, quiz, photos, match, mood, animals & friends, count — map, stickers and trophies only on the kid bar), no tab bar');
  ok(await page.evaluate(() => { const mm = window.matchMedia; window.matchMedia = () => ({ matches: false }); celebrate(); window.matchMedia = mm; const n = document.querySelectorAll('.confetti').length; return n === 36 && [...document.querySelectorAll('.confetti')].every((c) => getComputedStyle(c).position === 'fixed'); }), 'kid mode: the big celebration drops 36 pieces of confetti over the whole screen (stamp, surprise box, a finished game)');
  await page.goto(`${BASE}/#/kid/mimi/bubbles`); await page.waitForSelector('#bubblefield'); await page.waitForSelector('.bub');
  await page.locator('.bub').first().dispatchEvent('pointerdown');
  ok(await page.evaluate(() => document.querySelector('#bubscore').textContent === '1'), 'kid mode: bubbles float up and a tap pops one (the score counts the pops)');
  await page.goto(`${BASE}/#/kid/mimi/music`); await page.waitForSelector('.xylo');
  await page.click('.xylo button[data-v="4"]'); await page.click('.drums button[data-v="kick"]');
  ok(await page.locator('.xylo button').count() === 8 && await page.locator('.drums button').count() === 5 && await page.locator('.songs .kidbig').count() === 6 && await page.locator('.xylo button[data-v="4"].lit').count() === 1, 'kid mode: a xylophone of eight bars, five instruments and six songs; a tapped bar lights up');
  await page.goto(`${BASE}/#/kid/mimi/hideseek`); await page.waitForSelector('.hideboard');
  const wantTh = await page.evaluate(() => hs.targets[0][1]);
  await page.locator(`.hid[aria-label="${wantTh}"]`).dispatchEvent('click');   // Playwright's own hit test blames the board's veil; the browser's elementFromPoint (a real tap) returns the button
  ok(await page.locator('.hid').count() === 12 && await page.locator('.hid.found').count() === 1 && await page.evaluate(() => hs.found.length === 1), 'kid mode: I spy scatters twelve things; tapping the named one finds it');
  await page.goto(`${BASE}/#/kid/mimi/jigsaw`); await page.waitForSelector('.jigboard');
  await page.click('.jpiece[data-v="0"]'); await page.click('.jslot[data-v="0"]');
  ok(await page.locator('.jpiece').count() === 5 && await page.locator('.jslot.filled').count() === 1 && await page.locator('.jslot').count() === 6, 'kid mode: the jigsaw cuts the day picture into six; tap a piece, tap its slot');
  await page.click('.pixpick [data-g="jigsaw"][data-v="photo"]'); await page.waitForSelector('.jigboard');
  ok((await page.getAttribute('.jigboard', 'style')).includes('/media/') && await page.locator('.jpiece').count() === 6 && await page.locator('.pixpick [data-a="kidnewjig"]').count() === 1, 'jigsaw: “our photos” cuts one of the family’s photos instead, with a “new photo” button');
  await page.goto(`${BASE}/#/kid/mimi/hideseek`); await page.waitForSelector('.hideboard'); await page.click('.pixpick [data-g="hideseek"][data-v="photo"]'); await page.waitForSelector('.hideboard');
  ok((await page.getAttribute('.hideboard', 'style') || '').includes('/media/'), 'I spy: the things hide over a family photo');
  await page.goto(`${BASE}/#/kid/mimi/match`); await page.waitForSelector('.mgrid'); await page.click('.pixpick [data-g="match"][data-v="photo"]'); await page.waitForSelector('.mcard.ph');
  ok(await page.locator('.mcard.ph').count() >= 2 && await page.locator('.mcard').count() === 12, 'match: the pairs are the family’s photos (drawings fill the rest)');
  await page.evaluate(() => { localStorage.setItem('mbs_stars_mimi', '9'); star('mimi', 1); });
  await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('.kidtiles');
  ok(await page.locator('.starjar b').textContent() === '10' && await page.locator('.pets').count() === 1 && await page.locator('.kidhello .poke').count() === 1, 'kid mode: the star jar counts the stars; ten stars bring a new friend; the character can be poked');
  await page.locator('.starjar').dispatchEvent('pointerdown'); await page.waitForFunction(() => !JSON.parse(localStorage.getItem('mbs_stars_mimi') || 'null'), null, { timeout: 5000 });   // ls(k, null) stores "null"
  ok(await page.evaluate(() => !JSON.parse(localStorage.getItem('mbs_pets_mimi') || 'null') && document.querySelectorAll('.starjar').length === 0), 'kid mode: a grown-up holding the star jar 1.5 s empties it (stars and friends gone)');
  await page.goto(`${BASE}/#/kid/mimi/music`); await page.waitForSelector('.xylo'); await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('.kidtiles');   // away and back: a fresh view (the jar's clear re-rendered in place)
  ok(await page.locator('.kidwrap.enter').count() === 1, 'kid mode: a freshly opened page carries the enter class (the slide-in; a tap’s re-render does not)');
  ok(await page.locator('.kpage').count() === 4 && await page.locator('#kdots i').count() === 4 && (await page.locator('.kidtiles button').first().boundingBox()).height >= 150, 'kid home: three swipe pages of four huge tiles, with dots');
  await page.click('.kparrow.next'); await page.waitForFunction(() => document.querySelectorAll('#kdots i')[1].classList.contains('on'), null, { timeout: 5000 });
  ok(await page.locator('.kparrow.prev:not([hidden])').count() === 1, 'kid home: the arrow turns the page, the dots follow');
  await page.waitForTimeout(700);   // after the page's entrance animation
  ok(await page.evaluate(() => { const r = document.querySelector('.kidbar').getBoundingClientRect(); return Math.abs(r.bottom - innerHeight) <= 1; }), 'kid bar: stuck to the bottom of the screen, not to the end of the page (no transform left on the page by its entrance)');
  ok(await page.evaluate(() => [...document.querySelectorAll('.kidtiles button.pic img, .kidbar img.kbi')].length >= 8 && [...document.querySelectorAll('.kidtiles img, .kidbar img')].every((i) => i.complete && i.naturalWidth > 0)), 'kid mode: the picture tiles and bar icons load');
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
  const cached = async (urls) => page.evaluate(async (us) => { const out = {}; for (const k of await caches.keys()) { const c = await caches.open(k); for (const u of us) if (!out[u] && await c.match(u)) out[u] = true; } for (const u of us) out[u] = !!out[u]; return out; }, urls);
  const fave = st.media.find((m) => m.trip === T && m.highlight), plain = st.media.find((m) => m.trip === T && m.day === 2);
  const want = ['/', '/app.css', '/core.js', '/views.js', '/sheets.js', '/kid.js', '/art/guides/pinky.svg', '/art/crest/hk.svg', '/art/kids/mika-full.svg', '/art/colour/hk/day-3.svg', '/art/hk/day-6.svg',
    ...st.media.filter((m) => m.trip === T && !(m.mime || '').startsWith('audio/')).map((m) => `/media/${m.id}/t`), `/media/${fave.id}`];   // a voice memo has no thumbnail
  const have = await cached(want.concat(`/media/${plain.id}`));
  ok(want.every((u) => have[u]), 'service worker cache holds the shell, all art (precached at install), every thumbnail of the book and the full-size favourite' + want.filter((u) => !have[u]).map((u) => ' MISSING ' + u).join(''));
  ok(!have[`/media/${plain.id}`], 'a plain photo is kept as a thumbnail only (full size stays on the server until opened or "with all photos")');
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
    ok(await p.page.evaluate(() => getComputedStyle(document.body).backgroundColor) === 'rgb(27, 34, 48)', `${w}px: dark paper`);
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
  ok(await page.locator('.setlist.disp [data-a="lang"]').count() === 2 && await page.locator('.setlist.disp .fsseg').count() === 1 && await page.locator('.top [data-a="lang"], .top .fsb').count() === 0, 'viewer: relatives get the language and text-size card on the shelf too (and no controls in the top bar)');
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
  await page.click('.kidhear');   // 🔊 in the header: every kid page reads its own line aloud
  ok((await page.evaluate(() => window.__said)).some((x) => /7/.test(x) && /\|(th-TH|en-GB)$/.test(x)) && await page.locator('.kidhd .kidhear').count() === 1, 'kid home: the 🔊 button reads the greeting aloud');
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
  ok(/11:00/.test(p4) && /teamLab/.test(p4) && /Plan B/.test(p4) && /Money today/.test(p4) && /Local tip/.test(p4), 'itinerary: day 4 plan shows the timeline, local tip, plan B and money');
  await page.locator('.itin > li').nth(3).screenshot({ path: path.join(OUT, 'countdown-05-dayplan.png') });
  await page.goto(`${BASE}/#/t/${T}/log/3`); await page.waitForSelector('.planblk');
  ok(await page.locator('.planblk .dayplan').count() === 1 && (await page.textContent('.planblk')).includes('Wong Chi Kei') && await page.locator('details.planblk').count() === 1, 'record page: the plan sits at the top of the day in a fold (open on this phone: “keep open” is on)');
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
  { // the Australia memory book prints too: every section, a passport spread per child with all 16 stamp slots, and a real PDF
    await page.goto(`${BASE}/#/print/big-hop-2027`); await page.waitForSelector('.pg.back');
    const pgs = await page.locator('.pg').evaluateAll((els) => els.map((e) => e.className.replace('pg ', '').split(' ')[0]));
    ok(pgs[0] === 'cover' && pgs.includes('numbers') && pgs.includes('contents') && pgs.filter((c) => c === 'ppp').length === 2 && pgs[pgs.length - 1] === 'back'
      && await page.locator('.pg.ppp .dstamp').count() === 32 && await page.locator('.pg.cover .cvart .art').count() >= 6 && !s.errs.length, `Australia memory book: ${pgs.join(' · ')}`);
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
  ok(await page.locator('img[src="/art/kids/mimi-adventure-full.svg"]').count() >= 1 && await page.locator('img[src="/art/kids/mimi-full.svg"]').count() === 0, 'Australia book: the kids wear their adventure outfits');
  // glance first: each topic opens as a few answer cards; the manual-style report is one tap away
  await page.goto(`${BASE}/#/t/big-hop-2027/today`); await page.waitForSelector('.day.today');
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
  ok(await page.locator('.glg .glc').count() >= 6 && /\d+ things|\d+\/\d+ packed/.test(await page.textContent('.glg')), 'get-ready glance: a card per topic, the packing list named by its size (never “0/27 packed”)');
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
  ok(await page.locator('.eatc').count() === 294 && await page.locator('nav.bar a[aria-current=page][href$="/eat"] i.pic img').count() === 1, 'eat page: 294 places from the manual, tab highlighted');
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
    for (const [r, w] of [[`#/t/${T}/prep`, '.tp-prep, .glc'], [`#/passport/mika/big-hop-2027`, '.stkhd'], [`#/print/big-hop-2027`, '.facts'], [`#/t/big-hop-2027/log/12`, '#lgphotos'], ['#/kid/mika/stickers', '.stkhd'], ['#/kid/mika/trophies', '.trophies'], ['#/notebook', 'main h1'], ['#/family', '.famh3']]) {
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
    await page.goto(`${BASE}/#/t/${T}/log/1`); await page.waitForSelector('#spendamt'); await page.fill('#spendamt', '120'); await page.locator('#spendamt').blur();
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
  ok(await page.locator('.bookstart').count() === 0 && await page.locator('.letterblk').count() === 1 && await page.locator('a[data-a="pdf"]').count() === 1, 'a book with records: no “still empty” card; the letter box and the PDF button are there');
  ok(await page.locator('.bookmore .linkbtn[data-a="print"]').count() === 1 && await page.locator('.bookmore .linkbtn[data-a="copytext"]').count() === 1 && await page.locator('.btn[data-a="print"], .btn[data-a="copytext"]').count() === 0 && await page.evaluate(() => document.querySelector('.bookmore').getBoundingClientRect().top > document.querySelector('a[data-a="pdf"]').getBoundingClientRect().bottom), 'book page: print and copy are quiet text buttons under the PDF button, not two more buttons beside it');
  ok(await page.locator('.cover .line .nowrap').count() === 2 && await page.evaluate(() => [...document.querySelectorAll('.cover .line .nowrap')].every((e) => e.getClientRects().length === 1)), 'cover: each child\'s name and age sits on one line (Thai word breaking split a name)');
  // every control a parent taps is at least 44 px tall on the pages used during the trip
  const audit = `(sel) => [...document.querySelectorAll(sel)].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.height < 44 && !e.closest('details:not([open])'); }).map((e) => (e.textContent || e.className).trim().slice(0, 24) + ' ' + Math.round(e.getBoundingClientRect().height))`;
  const SEL = 'main .chip, main .btn.small, main .mini, main .seg button, main .linkbtn, a.maplink, .navb, .stayc .go, .eatday .go, .bag summary, .chk label, .remind .btn, .lpc, .dmore > summary';
  for (const [name, path, wait] of [['record', `/log/1`, '.daystrip'], ['today', `/today/1`, '.day.today'], ['eat', `/eat/d/1`, '.eatday'], ['sos', `/sos`, '.tp-sos']]) {
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
  ok(await page.locator('.privacy .pvsec').count() === 6 && await page.locator('.pverase').count() === 0 && await page.locator('#lcode').count() === 0, 'signed out: the privacy page reads in full, no erase box, no login form');
  await page.goto(`${BASE}/#/`); await page.waitForSelector('#lcode');
  ok(await page.locator('.login a[href="#/privacy"]').count() === 1, 'the login page links to it');
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
  const plainBg = await page.evaluate(() => getComputedStyle(document.querySelector('.hubgrid.tl-plain .tile.t-eat')).backgroundImage);
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
  ok(await page.locator('.tile.t-today, .tile.t-plan, .tile.t-eat, .tile.t-sos').count() >= 3 && await page.locator('.tripdel [data-a="tripdel"]').count() === 1 && await page.locator('.onbway[data-a="sample"], .addway[data-a="sample"]').count() === 0, 'sample: the menu has its tiles and a delete button at the foot; the offer is gone once it exists');
  await s.shot('06-sample-menu', false);
  await page.goto(`${BASE}/#/t/sakura-hop-2028/today/0`); await page.waitForSelector('.day.today');
  await s.shot('07-sample-today');
  await page.goto(`${BASE}/#/t/sakura-hop-2028/book`); await page.waitForSelector('.cover');
  ok(await page.locator('.bookstart a.btn[href*="/log/"]').count() === 1 && await page.locator('.foreblk, .letterblk, .coverpick').count() === 0 && await page.locator('a[data-a="pdf"]:visible').count() === 0 && await page.evaluate(() => document.querySelector('.bookstart').getBoundingClientRect().top < document.querySelector('.bookstart').getBoundingClientRect().height + 900), 'empty book: the way in (“record the first day”) comes right after the cover; the foreword, letter, cover choice and PDF wait for content');
  await page.goto(`${BASE}/#/passport/${st1.children[0].slug}/sakura-hop-2028`); await page.waitForSelector('.advc');
  ok(await page.locator('.advc img.crest').count() === 0 && await page.locator('.pp-page').count() >= 2, 'sample: today and the passport render without drawn art (no crest, the generic guides)');
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
  await page.goto(`${BASE}/#/passport/mimi/${T}`); await page.waitForSelector('#m2');
  ok(await page.evaluate(() => ['#m0', '#m1', '#m2', '#m3'].map((id) => document.querySelector(`${id} details.mfold`).open).join()) === 'false,false,true,false' && await page.locator('#m2.today').count() === 1,
    'passport during the trip: only today’s mission is open, the other days fold away');
  await page.click('#m4 summary'); await page.waitForFunction(() => document.querySelector('#m4 details.mfold').open);
  ok(await page.locator('#m4 .spot button[data-a="tick"]').first().isVisible(), 'passport during the trip: a tap opens another day');
  await page.goto(`${BASE}/#/kid/mika/spot`); await page.waitForSelector('.kidspots');
  ok(await page.locator('.kidspots.little button[data-v^="little.d2."]').count() === 3, 'kid mode: Mika’s "point it" page has her three missions of today');
  // the morning surprise box: on a trip day kid mode greets with a box; opening it gives a sticker and shows today's missions; once
  await page.goto(`${BASE}/#/kid/mimi`); await page.waitForSelector('.kidtiles');
  ok(await page.locator('.kidgift').count() === 1 && await page.locator('.kidnight').count() === 0, 'kid mode on a trip morning: a surprise box waits on the home page');
  await page.click('.kidgift'); await page.waitForSelector('.giftbox');
  await page.click('.giftbox'); await page.waitForSelector('.giftopen .gstk', { timeout: 5000 });
  ok(await page.locator('.gmiss span').count() === 4 && await page.locator('.giftopen [data-v$="/spot"]').count() === 1, 'surprise box: a new sticker, today’s four things to find, and a button to go and find them');
  await page.waitForFunction(() => queue.length === 0, null, { timeout: 15000 });
  ok((await apiState(page)).entries.some((e) => e.first_key === 'gift.d2' && e.child === 'mimi') && await page.evaluate(() => stickerSet(trip('hk-macau-2026'), 'mimi').some((x) => x.k === 'gift.d2' && x.got)), 'surprise box: opened once (saved), its sticker is in Mimi’s sticker tray');
  await page.click('.kidbar button[data-v="#/kid/mimi"]'); await page.waitForSelector('.kidtiles');
  ok(await page.locator('.kidgift').count() === 0, 'surprise box: gone from home once opened');
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
  for (const k of ['mimi', 'mika']) { await page.goto(`${BASE}/#/passport/${k}/${T}`); await page.reload(); await page.waitForSelector('#cert'); }
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
await browser.close();
console.log(failures ? `\n${failures} FAILED` : '\nALL PASSED');
process.exit(failures ? 1 : 0);
