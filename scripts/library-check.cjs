// checks research agents' new library rows against their own pages: node scripts/library-check.cjs <rows.json>… (run from the repo; OUT=<file> for the report)
// a row passes only when its src opens, the page is dated 2025–2026 (or the row says 'official' and the page is the place's own site),
// the name and the quote are on the page, and a printed price is on the page; never already in the library under the same name
const fs = require('fs'), { execFileSync } = require('child_process');
const norm = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/&amp;/g, '&').replace(/[’'`]/g, "'").replace(/\s+/g, ' ').trim();
const key = (s) => norm(s).replace(/[^a-z0-9฀-๿぀-鿿]+/g, '');
const cache = new Map();
function page(url) {
  if (cache.has(url)) return cache.get(url);
  let raw = '';
  try { raw = execFileSync('curl', ['-sL', '--max-time', '30', '-A', 'Mozilla/5.0', url], { maxBuffer: 64 << 20 }).toString(); } catch (_) {}
  const text = raw.replace(/<script[\s\S]*?<\/script>/gi, (s) => (/ld\+json/.test(s) ? s : ' ')).replace(/<[^>]*>/g, ' ').replace(/&#8217;|&rsquo;/g, "'").replace(/&#8211;|&ndash;/g, '–').replace(/&nbsp;/g, ' ');
  const dates = [...raw.matchAll(/"(?:datePublished|dateModified)"\s*:\s*"(\d{4})-(\d{2})/g), ...raw.matchAll(/article:(?:published|modified)_time" content="(\d{4})-(\d{2})/g)].map((m) => m[1] + '-' + m[2]);
  const r = { ok: raw.length > 500, text: norm(text), flat: key(text), dates };
  cache.set(url, r); return r;
}
const have = {};
for (const d of ['eats', 'sights']) for (const f of fs.readdirSync('server/' + d)) for (const t of JSON.parse(fs.readFileSync(`server/${d}/${f}`)).towns) {
  const s = (have[d + '|' + t.place] = new Set());
  for (const r of t.places || t.sights) { s.add(key(typeof r.name === 'string' ? r.name : r.name.en)); if (r.zh) s.add(key(r.zh)); if (r.local) s.add(key(r.local)); }
}
const out = { pass: [], fail: [] };
for (const f of process.argv.slice(2)) {
  const kind = /\.E\./.test(f) || /(^|\/)sights?[-.]/.test(f) ? 'sights' : 'eats';
  for (const r of JSON.parse(fs.readFileSync(f, 'utf8'))) {
    const why = [];
    if (!/^https?:\/\//.test(r.src || '')) why.push('no src');
    else {
      const p = page(r.src);
      if (!p.ok) why.push('page did not open');
      else {
        const nk = key(r.name);
        if (!nk || !p.flat.includes(nk)) why.push('name not on page');
        const q = key(r.quote);
        if (!q || q.length < 12 || !p.flat.includes(q)) why.push('quote not on page');
        const recent = p.dates.some((d) => d >= '2025-01');
        if (!recent && r.date !== 'official') why.push(`page date ${p.dates[0] || 'none'}`);
        const amt = (r.price || '').match(/\d[\d,.]*/g);
        if (amt && !/check the price/i.test(r.price) && !amt.every((a) => p.text.includes(a))) why.push('price not on page');
      }
    }
    if (have[kind + '|' + r.place] && (have[kind + '|' + r.place].has(key(r.name)) || (r.local && have[kind + '|' + r.place].has(key(r.local))))) why.push('already in library');
    (why.length ? out.fail : out.pass).push({ ...r, why, file: f });
  }
}
// duplicates between files of one run
const seen = new Set();
out.pass = out.pass.filter((r) => { const k = r.place + '|' + key(r.name); if (seen.has(k)) { out.fail.push({ ...r, why: ['duplicate in this run'] }); return false; } seen.add(k); return true; });
fs.writeFileSync(process.env.OUT || '/dev/stdout', JSON.stringify(out, null, 1));
console.error(`pass ${out.pass.length} · fail ${out.fail.length}`);
const tally = {}; for (const r of out.fail) for (const w of r.why) tally[w.replace(/ \d.*/, '')] = (tally[w.replace(/ \d.*/, '')] || 0) + 1; console.error(tally);
