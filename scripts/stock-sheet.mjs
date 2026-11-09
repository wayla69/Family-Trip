#!/usr/bin/env node
// npm run stock:sheet -- <prefix> [outDir] — the review sheet for the stock art library (docs/STOCK-ART.md §6.1 step 5):
// every picture whose id starts with <prefix> (e.g. "jp-tokyo", "jp") at the size the app shows it, on the light and the dark page,
// as the colouring page sees it (fills lifted), with its name, keywords and approval state. Writes sheet.html + sheet.png (+ a 390 px phone shot).
// The owner ticks what passes; an approved picture gets `ok` in index.json (only then does a book see it).
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const STOCK = require('../server/stock.js');

const prefix = process.argv[2] || '';
const out = path.resolve(process.argv[3] || process.env.SHOTS || '/tmp/mb-shots');
fs.mkdirSync(out, { recursive: true });
const idx = STOCK.read();
const items = (idx.items || []).filter((it) => !prefix || it.id === prefix || it.id.startsWith(prefix + '.') || it.id.startsWith(prefix + '-'));
if (!items.length) { console.log(`no pictures start with "${prefix}"`); process.exit(1); }

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const dataUrl = (file) => {
  const buf = fs.readFileSync(path.join(STOCK.DIR, file));
  return `data:${file.endsWith('.svg') ? 'image/svg+xml' : 'image/webp'};base64,${buf.toString('base64')}`;
};
// what the colouring page does (kid.js lineArt): each shape's own fill turns white — except a dark one (an outline colour), 'none',
// and a shape with an opacity (the white halo round a landmark); strokes are kept
const lum = (hex) => { const m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex || ''); if (!m) return 1; let h = m[1]; if (h.length === 3) h = h.replace(/./g, '$&$&'); const n = parseInt(h, 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };
const lineArt = (file) => {
  if (!file.endsWith('.svg')) return '';
  const svg = fs.readFileSync(path.join(STOCK.DIR, file), 'utf8')
    .replace(/<(path|circle|rect|ellipse|polygon)\b([^>]*)>/g, (all, tag, attrs) => {
      const f = /\sfill="([^"]*)"/.exec(attrs);
      if (!f || f[1] === 'none' || lum(f[1]) < 0.3 || /\sopacity=/.test(attrs)) return all;
      return `<${tag}${attrs.replace(/\sfill="[^"]*"/, ' fill="#fff"')}>`;
    });
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
};
const places = idx.places || {};
const scopeOf = (id) => id.split('.')[0];
const row = (f, colour) => { const la = lineArt(f); return `<div class="row"><span class="lt"><img src="${dataUrl(f)}" alt=""></span><span class="dk"><img src="${dataUrl(f)}" alt=""></span>${la && colour ? `<span class="lt"><img src="${la}" alt=""></span>` : ''}</div>`; };
// a redraw waiting for review (`next`) shows under the live picture, so the two can be compared; the card stays "waiting" until it is promoted
const card = (it) => {
  const f = it.file, kb = (fs.statSync(path.join(STOCK.DIR, f)).size / 1024).toFixed(1);
  return `<figure class="c${it.ok && !it.next && !it.review ? ' ok' : ''}">
  ${it.next ? `<small>ตอนนี้ (${esc(f.split('.').slice(-2, -1)[0])})</small>` : ''}${row(f, it.colour)}${it.next ? `<small>แบบใหม่ (${esc(it.next.split('.').slice(-2, -1)[0])}) รอตรวจ</small>${row(it.next, it.colour)}` : ''}
  <figcaption><b>${esc(it.name.th)}</b> · ${esc(it.name.en)}<br><code>${esc(it.id)}</code> · ${kb} KB${it.colour ? ' · ระบายสีได้' : ''}
  <br><small>${esc((it.kw || []).join(', '))}</small>${it.spot ? `<br><small>ภารกิจ: ${esc(it.spot.th)}</small>` : ''}
  <br><span class="st">${it.next ? 'แบบใหม่รอตรวจ' : it.review ? `ใช้อยู่ · รอเจ้าของรีวิว (${esc(it.ok)})` : it.ok ? `✓ อนุมัติ ${esc(it.ok)}` : 'รอตรวจ'}</span></figcaption></figure>`;
};
const groups = [...new Set(items.map((it) => scopeOf(it.id)))];
const html = `<!doctype html><html lang="th"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Stock review · ${esc(prefix || 'all')}</title><style>
body{margin:0;padding:24px 16px;font:15px/1.45 system-ui,-apple-system,"Noto Sans Thai",sans-serif;background:#F7F4EE;color:#22213A}
h1{font-size:22px;margin:0 0 4px}h2{font-size:17px;margin:28px 0 10px}p.k{margin:0 0 6px;color:#5b6070}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:14px}
.c{margin:0;background:#fff;border:1px solid #e3ded4;border-radius:16px;padding:12px}.c.ok{border-color:#4CAF50;box-shadow:0 0 0 2px #4CAF5033}
.row{display:flex;gap:8px;flex-wrap:wrap}.row span{display:grid;place-items:center;width:84px;height:84px;border-radius:12px}
.lt{background:#FBF7F0}.dk{background:#1B2230}.row img{width:72px;height:72px}
figcaption{margin-top:8px;font-size:13px}code{font-size:12px;color:#2F5D8C}small{color:#6b7080}.st{font-weight:700;color:#B26A00}.ok .st{color:#2E7D32}
.big{display:flex;gap:16px;flex-wrap:wrap;margin-top:8px}.big img{width:160px;height:160px}
</style></head><body>
<h1>คลังภาพ · ${esc(prefix || 'ทั้งหมด')}</h1><p class="k">${items.length} ภาพ · อนุมัติแล้ว ${items.filter((i) => i.ok).length} · แต่ละการ์ด: บนพื้นสว่าง · บนพื้นมืด · หน้าระบายสี</p>
${groups.map((g) => `<h2>${esc((places[g] && places[g].name && places[g].name.th) || g)} <small>${esc(g)}</small></h2><div class="grid">${items.filter((it) => scopeOf(it.id) === g).map(card).join('')}</div>`).join('')}
<h2>ขนาดจริงในเล่ม (160 px)</h2><div class="big">${items.filter((it) => /^(stamp|day)$/.test(it.cat)).map((it) => `<img src="${dataUrl(it.file)}" alt="">`).join('')}</div>
</body></html>`;
const file = path.join(out, `stock-${prefix || 'all'}.html`);
fs.writeFileSync(file, html);
console.log('sheet:', file);

if (process.argv.includes('--no-shot')) process.exit(0);
const { chromium } = require('playwright-core');
const exe = process.env.CHROME || process.env.CHROMIUM_PATH || undefined;
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
for (const [w, tag] of [[1100, 'wide'], [390, 'phone']]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 }, deviceScaleFactor: tag === 'wide' ? 1 : 2 });
  await page.goto('file://' + file);
  const png = path.join(out, `stock-${prefix || 'all'}-${tag}.png`);
  await page.screenshot({ path: png, fullPage: true });
  console.log('shot: ', png);
  await page.close();
}
await browser.close();
