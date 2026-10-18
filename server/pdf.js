'use strict';
// Server-side A4 PDF of a book (docs/ADR.md ADR-5): headless Chromium opens the app's own book page and prints it.
// The image installs Playwright's chromium headless shell; CHROMIUM_PATH overrides (tests in sandboxes).
let browserP = null;
let busy = Promise.resolve();   // one PDF at a time keeps memory flat on a small Railway instance

function browser() {
  if (!browserP) {
    const { chromium } = require('playwright-core');
    // only ever renders our own page; signals are handled by server/index.js (graceful shutdown)
    browserP = chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--no-sandbox'], handleSIGTERM: false, handleSIGINT: false, handleSIGHUP: false })
      .catch((e) => { browserP = null; throw e; });
  }
  return browserP;
}

async function render({ base, cookie, trip, footer }) {
  const run = busy.then(async () => {
    const b = await browser();
    const ctx = await b.newContext({ viewport: { width: 1000, height: 1400 }, locale: 'th-TH' });
    try {
      const u = new URL(base);
      await ctx.addCookies([{ name: 'mb', value: cookie, domain: u.hostname, path: '/', httpOnly: true }]);
      const page = await ctx.newPage();
      await page.goto(`${base}/#/print/${encodeURIComponent(trip)}`, { waitUntil: 'networkidle', timeout: 60000 });   // the memory book's A4 pages
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
        footerTemplate: `<div style="width:100%;font:8px sans-serif;color:#6D7480;padding:0 14mm;display:flex;justify-content:space-between"><span>${esc(footer)}</span><span>Memory Bookshelf · <span class="pageNumber"></span></span></div>`,
      });
    } finally { await ctx.close(); }
  });
  busy = run.catch(() => {});
  return run;
}

async function close() { if (browserP) { const b = await browserP.catch(() => null); browserP = null; if (b) await b.close().catch(() => {}); } }

module.exports = { render, close };
