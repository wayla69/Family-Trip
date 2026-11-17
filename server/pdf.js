'use strict';
// Server-side A4 PDF of a book (docs/ADR.md ADR-5): headless Chromium opens the app's own book page and prints it.
// The image installs Playwright's chromium headless shell; CHROMIUM_PATH overrides (tests in sandboxes).
let browserP = null;
let busy = Promise.resolve();   // one PDF at a time keeps memory flat on a small Railway instance
// Chromium holds a few hundred MB while it lives: it is closed after two minutes with nothing to print (the next PDF starts it again, ~1 s)
let idleT = null, inUse = 0;
const IDLE_MS = +process.env.CHROMIUM_IDLE_MS || 120e3;
function idleLater() { clearTimeout(idleT); idleT = setTimeout(() => { if (!inUse) close().catch(() => {}); }, IDLE_MS); if (idleT.unref) idleT.unref(); }

function browser() {
  if (!browserP) {
    const { chromium } = require('playwright-core');
    // only ever renders our own page; signals are handled by server/index.js (graceful shutdown)
    browserP = chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'], handleSIGTERM: false, handleSIGINT: false, handleSIGHUP: false })
      .catch((e) => { browserP = null; throw e; });
  }
  return browserP;
}

// route: the page to print (default the book's #/print/<trip>; the year's book is printyear/<y>)
async function render({ base, cookie, trip, footer, route }) {
  const run = busy.then(async () => {
    inUse++; clearTimeout(idleT);
    const b = await browser();
    const ctx = await b.newContext({ viewport: { width: 1000, height: 1400 }, locale: 'th-TH' });
    try {
      const u = new URL(base);
      await ctx.addCookies([{ name: 'mb', value: cookie, domain: u.hostname, path: '/', httpOnly: true }]);
      const page = await ctx.newPage();
      await page.goto(`${base}/#/${route || `print/${encodeURIComponent(trip)}`}`, { waitUntil: 'networkidle', timeout: 60000 });   // the memory book's A4 pages
      await page.waitForSelector('.pg.cover', { timeout: 30000 });
      await page.waitForFunction(() => document.querySelectorAll('.colsvg').length === document.querySelectorAll('.colsvg svg').length, null, { timeout: 15000 }).catch(() => {});   // colouring pages load async
      await page.evaluate(() => document.querySelectorAll('img[loading]').forEach((i) => { i.loading = 'eager'; }));
      await page.waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, { timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      await page.emulateMedia({ media: 'print' });
      const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
      return await page.pdf({
        format: 'A4', printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true,
        headerTemplate: '<span></span>',
        footerTemplate: `<div style="width:100%;font:8px sans-serif;color:#666D79;padding:0 14mm;display:flex;justify-content:space-between"><span>${esc(footer)}</span><span>LifeBook · <span class="pageNumber"></span></span></div>`,
      });
    } finally { await ctx.close(); inUse--; idleLater(); }
  });
  busy = run.catch(() => {});
  return run;
}

// the cards of a book's film (server/reel.js): #/reelcards/<trip>/<lang>/<days> draws them 720×1280 each; each is photographed at 2×
// path = the cards page to photograph (default the book's #/reelcards/…; the year's film passes its own)
// caps = entry ids of the kids' words: each drawn as a bubble (.rcap) and photographed on its own, transparent around it
async function cards({ base, cookie, trip, lang, days, caps = [], path: at }) {
  const run = busy.then(async () => {
    inUse++; clearTimeout(idleT);
    const b = await browser();
    const ctx = await b.newContext({ viewport: { width: 720, height: 1280 }, deviceScaleFactor: 2, locale: lang === 'en' ? 'en-GB' : 'th-TH' });
    try {
      const u = new URL(base);
      await ctx.addCookies([{ name: 'mb', value: cookie, domain: u.hostname, path: '/', httpOnly: true }]);
      const page = await ctx.newPage();
      await page.goto(`${base}/#/${at || `reelcards/${encodeURIComponent(trip)}/${lang}/${days.join('.')}/${caps.map(encodeURIComponent).join('~')}`}`, { waitUntil: 'networkidle', timeout: 60000 });
      await page.waitForSelector('.rcard', { timeout: 30000 });
      await page.evaluate(() => document.querySelectorAll('img[loading]').forEach((i) => { i.loading = 'eager'; }));
      await page.waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, { timeout: 60000 });
      await page.evaluate(() => document.fonts.ready);
      const out = [], cap = {};
      for (const el of await page.$$('.rcard')) out.push(await el.screenshot({ type: 'png' }));
      for (const el of await page.$$('.rcap[data-id]')) cap[await el.getAttribute('data-id')] = await el.screenshot({ type: 'png', omitBackground: true });
      return { cards: out, caps: cap };
    } finally { await ctx.close(); inUse--; idleLater(); }
  });
  busy = run.catch(() => {});
  return run;
}

async function close() { if (browserP) { const b = await browserP.catch(() => null); browserP = null; if (b) await b.close().catch(() => {}); } }

module.exports = { render, cards, close };
