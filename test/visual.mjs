// How the pages look, compared with the last approved look (owner, Nov 2026: "ทดสอบหน้าตาอัตโนมัติ — เทียบภาพหน้าจอก่อนและหลังแก้"):
// a few pages a parent sees most, on a 390 px phone with a fixed clock, are photographed and compared with test/visual/<name>.png.
// The comparison is about layout and colour, not single pixels (CI's browser is another build of Chromium, its text antialiasing
// differs a little): both pictures are shrunk to a quarter and blurred, then a cell counts as changed when its grey level moved by more
// than 10 %; a page fails when more than LIMIT of its cells changed. A failing page leaves <name>.now.png and <name>.diff.png in $SHOTS.
// After an intended change: UPDATE_VISUAL=1 npm test (TEST_ONLY=visual) writes the new pictures; look at them before committing.
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const { BASE, CODE } = process.env;
const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'visual');
const OUT = process.env.SHOTS || '/tmp/mb-shots';
const UPDATE = process.env.UPDATE_VISUAL === '1', LIMIT = 0.05;
fs.mkdirSync(DIR, { recursive: true }); fs.mkdirSync(OUT, { recursive: true });
const exe = process.env.CHROME || (fs.existsSync(chromium.executablePath()) ? undefined : '/opt/pw-browsers/chromium-1194/chrome-linux/chrome');
let failures = 0;
const ok = (c, m) => { if (!c) { failures++; console.log('  FAIL', m); } else console.log('  ok  ', m); };
console.log('visual');

const W = 390, H = 844, SW = Math.round(W / 4), SH = Math.round(H / 4);
const small = (buf) => sharp(buf).resize(SW, SH, { fit: 'fill' }).greyscale().blur(1.2).raw().toBuffer();
async function look(page, name) {
  await page.waitForTimeout(400);
  await page.evaluate(() => document.fonts && document.fonts.ready);
  const shot = await page.screenshot({ fullPage: false });
  const base = path.join(DIR, `${name}.png`);
  if (UPDATE || !fs.existsSync(base)) { await sharp(shot).png().toFile(base); console.log(`  new   ${name} (written to test/visual — look at it before committing)`); return; }
  const [a, b] = await Promise.all([small(fs.readFileSync(base)), small(shot)]);
  let changed = 0; const diff = Buffer.alloc(a.length);
  for (let i = 0; i < a.length; i++) { const d = Math.abs(a[i] - b[i]); if (d > 25) { changed++; diff[i] = 255; } }
  const share = changed / a.length;
  if (share > LIMIT) {
    fs.writeFileSync(path.join(OUT, `${name}.now.png`), shot);
    await sharp(diff, { raw: { width: SW, height: SH, channels: 1 } }).resize(W, H, { kernel: 'nearest' }).png().toFile(path.join(OUT, `${name}.diff.png`));
  }
  ok(share <= LIMIT, `${name}: looks as approved (${(share * 100).toFixed(1)} % of the page changed, at most ${LIMIT * 100} %)`);
}

const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox', '--font-render-hinting=none'] });
for (const scheme of ['light', 'dark']) {
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1, colorScheme: scheme, reducedMotion: 'reduce', locale: 'th-TH', timezoneId: 'Asia/Bangkok', serviceWorkers: 'block' });
  const page = await ctx.newPage();
  await page.clock.install({ time: new Date('2026-11-20T10:00:00+07:00') });   // two weeks before the Hong Kong book: every page shows the same day
  await page.goto(BASE + '/#/'); await page.waitForSelector('#lf');
  await page.evaluate(() => { localStorage.setItem('mbs_lang', JSON.stringify('th')); });
  await page.reload(); await page.waitForSelector('#lf');
  if (scheme === 'light') await look(page, 'login');
  await page.fill('#lname', 'แม่'); await page.fill('#lcode', CODE); await page.keyboard.press('Enter'); await page.waitForSelector('.shelf');
  await page.evaluate(() => { localStorage.setItem('mbs_remindLater', '1'); });
  await page.goto(BASE + '/#/'); await page.waitForSelector('.shelf');
  await look(page, `shelf-${scheme}`);
  if (scheme === 'dark') break;
  await page.goto(BASE + '/#/t/hk-macau-2026'); await page.waitForSelector('.hubhead');
  await look(page, 'book-menu');
  await page.goto(BASE + '/#/t/hk-macau-2026/today/0'); await page.waitForSelector('#tlbox');
  await look(page, 'today');
  await page.goto(BASE + '/#/t/hk-macau-2026/book'); await page.waitForSelector('.bookstart, .cover');
  await look(page, 'memory-book');
  await page.goto(BASE + '/#/privacy'); await page.waitForSelector('.privacy .phead');
  await look(page, 'privacy');
  await ctx.close();
}
await browser.close();
console.log(failures ? `${failures} failed` : 'visual: all passed');
process.exit(failures ? 1 : 0);
