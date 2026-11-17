'use strict';
/* A book to keep for ever (owner, Nov 2026: "เล่มเก็บได้ตลอดไป … เปิดดูได้ในเบราว์เซอร์โดยไม่ต้องมีแอปหรือเซิร์ฟเวอร์"): one HTML file that
   holds the whole book — its name and dates, the children, each day's picture, words, notes, summary, firsts and photos (made 1024 px,
   or 640 px with ?size=small), the voice memos, the foreword, the letter and the family's hearts — with nothing to fetch: every picture
   and sound is inside the file, the styles too, no script. Double-click it on any computer in twenty years. Clips are left out (too
   big for one file; they are in the family's copy, the backup zip).
   GET /api/b/keep/:trip?lang=th|en&size=small — anyone who may see the book; streamed photo by photo, never held whole in memory. */
const express = require('express');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const PUB = path.join(__dirname, '..', 'public');
const AUDIO = { 'audio/webm': 'audio/webm', 'audio/mp4': 'audio/mp4', 'audio/aac': 'audio/aac', 'audio/ogg': 'audio/ogg', 'audio/mpeg': 'audio/mpeg' };

function router({ pool, media, A, family, stock }) {
  const r = express.Router(), q = async (s, a) => (await pool.query(s, a)).rows;
  r.get('/api/b/keep/:trip', A.requireUser, async (req, res, next) => {
    try {
      if (!A.canSee(req.user, req.params.trip)) return res.status(404).json({ error: 'trip' });
      const t = (await q("SELECT id, slug, title, sub, to_char(date_from,'YYYY-MM-DD') date_from, to_char(date_to,'YYYY-MM-DD') date_to, theme FROM trips WHERE id=$1 AND family_id=$2", [req.params.trip, family]))[0];
      if (!t) return res.status(404).json({ error: 'trip' });
      const en = req.query.lang === 'en', T = (x) => (x && typeof x === 'object' ? (en ? x.en || x.th : x.th || x.en) : x) || '', Lx = (th, e) => (en ? e : th);
      const W = req.query.size === 'small' ? 640 : 1024;
      const days = await q("SELECT day_index, to_char(date,'YYYY-MM-DD') date, title, place, emoji FROM trip_days WHERE trip_id=$1 ORDER BY day_index", [t.id]);
      const ents = await q("SELECT id, day_index, kind, child, text, mood, first_key, highlight, occurred_at FROM entries WHERE trip_id=$1 AND family_id=$2 AND kind IN ('quote','note','fav','first','sum','story','fore','letter','mood') ORDER BY occurred_at", [t.id, family]);
      const firsts = await q('SELECT key, emoji, label FROM firsts_catalog WHERE trip_id=$1', [t.id]);
      const rows = await q('SELECT id, day_index, mime, caption, highlight, taken_at, storage_key FROM media WHERE trip_id=$1 AND family_id=$2 ORDER BY taken_at, pos', [t.id, family]);
      const hearts = await q('SELECT emoji, text, from_name, created_at FROM hearts WHERE trip_id=$1 AND family_id=$2 ORDER BY created_at', [t.id, family]);
      const kids = await q('SELECT slug, name_th, name_en FROM children WHERE family_id=$1 ORDER BY pos', [family]);
      const kidName = (s) => { const k = kids.find((x) => x.slug === s); return k ? (en ? k.name_en : k.name_th) : ''; };
      const fmt = (d) => new Date(d + 'T00:00:00').toLocaleDateString(en ? 'en-GB' : 'th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
      const theme = t.theme || {}, accent = /^#[0-9a-f]{6}$/i.test(theme.accent || '') ? theme.accent : '#2F7FE0';
      // a day's picture, inside the file: the library's or the book's own SVG from public/ (never a fetch)
      const artOf = (i) => {
        let u = Array.isArray(theme.artDays) && theme.artDays[i] ? theme.artDays[i] : theme.art ? String(theme.art).replace('{n}', i + 1) : '';
        if (/^stock:/.test(u) && stock) u = stock.url(u.slice(6)) || '';
        if (!/^\/(art|stock)\/[A-Za-z0-9/._-]+\.(svg|webp)$/.test(u) || u.includes('..')) return '';
        try { const b = fs.readFileSync(path.join(PUB, u)); return `data:${u.endsWith('.svg') ? 'image/svg+xml' : 'image/webp'};base64,${b.toString('base64')}`; } catch (_) { return ''; }
      };
      const name = String(t.slug || t.id).replace(/[^A-Za-z0-9_-]/g, '') || 'book';
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${name}-${en ? 'en' : 'th'}.html"`);
      res.setHeader('Cache-Control', 'no-store');
      const w = (s) => new Promise((ok) => (res.write(s) ? ok() : res.once('drain', ok)));
      await w(`<!doctype html><html lang="${en ? 'en' : 'th'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(T(t.title))}</title>
<style>:root{--a:${accent}}*{box-sizing:border-box}body{margin:0;background:#FBF8F2;color:#1F2A3A;font:17px/1.6 system-ui,-apple-system,"Segoe UI","Noto Sans Thai","Sarabun",sans-serif}
main{max-width:860px;margin:0 auto;padding:24px 16px 64px}header.cv{text-align:center;padding:40px 0 24px;border-bottom:4px solid var(--a)}header.cv h1{font-size:40px;line-height:1.15;margin:0 0 6px}
.kids{font-weight:600;color:#59616D}section.day{margin:36px 0;padding-top:20px;border-top:1px solid #E2DACB}section.day h2{margin:0;font-size:26px}
.dh{display:flex;gap:14px;align-items:center}.dh img{width:84px;height:84px;border-radius:50%;border:4px solid var(--a);background:#fff;flex:none}.date{color:#59616D;font-size:15px}
.sum{background:#fff;border-left:5px solid var(--a);padding:10px 14px;border-radius:10px;margin:12px 0}.ph{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr));gap:12px;margin:14px 0}
figure{margin:0;background:#fff;padding:8px 8px 6px;border-radius:6px;box-shadow:0 4px 14px -8px rgba(0,0,0,.35)}figure img{width:100%;height:auto;display:block;border-radius:3px}figcaption{font-size:14px;color:#3A4352;padding-top:4px}
.q{background:#fff;border-radius:22px;padding:10px 16px;margin:8px 0;font-weight:600}.q small{display:block;font-weight:400;color:#59616D}.note{font-style:italic;color:#3A4352}
.firsts{display:flex;flex-wrap:wrap;gap:8px}.firsts span{background:#FFF1C9;border-radius:999px;padding:4px 12px;font-weight:600}audio{width:100%;margin:6px 0}
.letter,.fore{background:#fff;border:1px solid #E2DACB;border-radius:14px;padding:16px 18px;white-space:pre-wrap;margin:24px 0}.hearts li{margin:4px 0}footer{margin-top:48px;text-align:center;color:#59616D;font-size:14px}
@media print{body{background:#fff}section.day{break-inside:avoid-page}}</style></head><body><main>
<header class="cv"><h1>${esc(T(t.title))}</h1>${t.sub ? `<p>${esc(T(t.sub))}</p>` : ''}<p class="date">${esc(fmt(t.date_from))}${t.date_to && t.date_to !== t.date_from ? ' – ' + esc(fmt(t.date_to)) : ''}</p><p class="kids">${esc(kids.map((k) => (en ? k.name_en : k.name_th)).filter(Boolean).join(en ? ' & ' : ' และ '))}</p></header>\n`);
      const fore = ents.find((e) => e.kind === 'fore' && e.text);
      if (fore) await w(`<div class="fore">${esc(fore.text)}</div>\n`);
      let sent = 0;
      for (const d of days) {
        const de = ents.filter((e) => e.day_index === d.day_index), dm = rows.filter((m) => m.day_index === d.day_index);
        if (!de.length && !dm.length) continue;
        const art = artOf(d.day_index);
        await w(`<section class="day"><div class="dh">${art ? `<img src="${art}" alt="">` : ''}<div><h2>${esc(T(d.title) || Lx(`วันที่ ${d.day_index + 1}`, `Day ${d.day_index + 1}`))}</h2><div class="date">${esc(Lx(`วันที่ ${d.day_index + 1}`, `Day ${d.day_index + 1}`))} · ${esc(fmt(d.date))}${d.place ? ' · ' + esc(T(d.place)) : ''}</div></div></div>\n`);
        const sum = de.find((e) => e.kind === 'sum' && e.text); if (sum) await w(`<div class="sum">${esc(sum.text)}</div>\n`);
        for (const e of de.filter((x) => x.kind === 'quote' && x.text)) await w(`<div class="q">“${esc(e.text)}”${e.child ? `<small>— ${esc(e.child === 'both' ? Lx('ทั้งคู่', 'both') : kidName(e.child))}</small>` : ''}</div>\n`);
        const fs1 = de.filter((x) => x.kind === 'first');
        if (fs1.length) await w(`<div class="firsts">${fs1.map((e) => { const f = firsts.find((x) => x.key === e.first_key); return `<span>${esc(f ? f.emoji : '⭐')} ${esc(e.text || (f ? T(f.label) : ''))}</span>`; }).join('')}</div>\n`);
        for (const e of de.filter((x) => (x.kind === 'note' || x.kind === 'fav') && x.text)) await w(`<p class="note">${esc(e.text)}</p>\n`);
        const pics = dm.filter((m) => /^image\//.test(m.mime || 'image/jpeg'));
        if (pics.length) {
          await w('<div class="ph">');
          for (const m of pics) {
            const buf = await media.get(m.storage_key).catch(() => null); if (!buf) continue;
            const jpg = await sharp(buf, { failOn: 'none' }).rotate().resize({ width: W, height: W, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toBuffer().catch(() => null);
            if (!jpg) continue;
            await w(`<figure><img loading="lazy" src="data:image/jpeg;base64,${jpg.toString('base64')}" alt="">${m.caption ? `<figcaption>${m.highlight ? '⭐ ' : ''}${esc(m.caption)}</figcaption>` : m.highlight ? '<figcaption>⭐</figcaption>' : ''}</figure>`);
            sent++;
          }
          await w('</div>\n');
        }
        for (const m of dm.filter((x) => AUDIO[String(x.mime || '').split(';')[0]])) {
          const buf = await media.get(m.storage_key).catch(() => null); if (!buf || buf.length > 8e6) continue;
          await w(`<audio controls preload="none" src="data:${AUDIO[String(m.mime).split(';')[0]]};base64,${buf.toString('base64')}"></audio>${m.caption ? `<div class="date">${esc(m.caption)}</div>` : ''}\n`);
        }
        await w('</section>\n');
      }
      const story = ents.find((e) => e.kind === 'story' && e.day_index === null && e.text);
      if (story) await w(`<h2>${esc(Lx('นิทานของทริปนี้', 'The story of this trip'))}</h2><div class="fore">${esc(story.text)}</div>\n`);
      if (hearts.length) await w(`<h2>${esc(Lx('หัวใจจากญาติ', 'Hearts from the family'))}</h2><ul class="hearts">${hearts.map((h) => `<li>${esc(h.emoji)} ${h.text ? `“${esc(h.text)}” ` : ''}<b>— ${esc(h.from_name)}</b></li>`).join('')}</ul>\n`);
      const letter = ents.find((e) => e.kind === 'letter' && e.text);
      if (letter) await w(`<h2>${esc(Lx('จดหมายถึงลูก', 'A letter to the children'))}</h2><div class="letter">${esc(letter.text)}</div>\n`);
      await w(`<footer>${esc(Lx('เก็บไว้จากแอปสมุดความทรงจำของครอบครัว', 'Kept from the family’s memory book app'))} · ${esc(new Date().toISOString().slice(0, 10))} · ${sent} ${esc(Lx('รูป', 'photos'))}</footer></main></body></html>\n`);
      res.end();
    } catch (e) { if (!res.headersSent) next(e); else res.destroy(); }
  });
  return r;
}
module.exports = { router };
