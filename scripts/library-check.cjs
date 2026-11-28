// checks research agents' new library rows against their own pages: node scripts/library-check.cjs <rows.json>… (run from the repo; OUT=<file> for the report)
// a row passes only when its src opens, the page is dated 2025–2026 (or the row says 'official' and the page is the place's own site),
// the name and the quote are on the page, and a printed price is on the page; never already in the library under the same name
const fs = require('fs'), { execFileSync } = require('child_process');
const norm = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/&amp;/g, '&').replace(/[’'`]/g, "'").replace(/\s+/g, ' ').trim();
const key = (s) => norm(s).replace(/[^a-z0-9\u0e00-\u0e7f\u3040-\u9fff\u1100-\u11ff\uac00-\ud7af]+/g, '')   // Hangul: NFKD splits a syllable into its jamo (U+1100–11FF);
const cache = new Map();
// only a public https page: an agent's row must never make this script reach the machine it runs on or a private network
const PRIVATE = /^(localhost|.*\.local|.*\.internal|0\.|10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|\[|::)/i;
function safeUrl(u) {
  try { const x = new URL(u); return x.protocol === 'https:' && !x.username && !x.password && !PRIVATE.test(x.hostname) && !/^\d+\.\d+\.\d+\.\d+$/.test(x.hostname) ? x.href : null; } catch (_) { return null; }
}
function page(url) {
  if (cache.has(url)) return cache.get(url);
  let raw = '';
  const safe = safeUrl(url);
  if (safe) try { raw = execFileSync('curl', ['-sL', '--proto', '=https', '--proto-redir', '=https', '--max-time', '30', '-A', 'Mozilla/5.0', '--', safe], { maxBuffer: 64 << 20 }).toString(); } catch (_) {}
  // the text only feeds a substring check, never a page: script blocks are blanked (closing tags in any spacing), JSON-LD kept for dates and names
  const text = raw.replace(/<script\b[^>]*>[\s\S]*?<\/script[^>]*>/gi, (s) => (/ld\+json/.test(s) ? s : ' ')).replace(/<[^>]*>/g, ' ').replace(/&rsquo;|&lsquo;/g, "'").replace(/&ndash;/g, '–').replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&quot;/g, '"');   // '&#x26;' = '&' (Wongnai)
  const dates = [...raw.replace(/\\"/g, '"').matchAll(/"(?:datePublished|dateModified|dateCreated|publishTime|updateTime|updatedAt|publishedAt|createdAt|dateSchemaPublish|dateSchemaModify|publishDate|updateDate)"\s*:\s*"(\d{4})[-/.](\d{2})/g), ...raw.matchAll(/article:(?:published|modified)_time" content="(\d{4})-(\d{2})/g)].map((m) => m[1] + '-' + m[2]);
  // a post's time in epoch milliseconds (Trip.com moments: "publishTime":1758034525000)
  for (const m of raw.matchAll(/"(?:publishTime|updateTime|publishedAt|updatedAt)"\s*:\s*(1[6-9]\d{11})\b/g)) dates.push(new Date(+m[1]).toISOString().slice(0, 7));
  // a Thai page's printed date in the Buddhist year: "อัพเดทเมื่อ 21 มี.ค. 2568" (Wongnai), "อัปเดตล่าสุด 9 พ.ค. 2568"
  const TMON = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  for (const m of text.matchAll(/(?:อัพเดท|อัปเดต)(?:เมื่อ|ล่าสุด)?\s*:?\s*\d{1,2}\s+([ก-๙]{1,3}\.[ก-๙]{1,2}\.)\s*(25\d\d)/g)) {
    const i = TMON.indexOf(m[1]);
    if (i >= 0) dates.push(`${+m[2] - 543}-${String(i + 1).padStart(2, '0')}`);
  }
  // a Chinese page's printed date: 发布时间：2026-03-16 · 日期：2026年3月16日
  for (const m of text.matchAll(/(?:发布时间|发布日期|发布于|更新时间|日期|时间)\s*[:：]?\s*(20\d\d)\s*[-年/.]\s*(\d{1,2})/g)) dates.push(`${m[1]}-${m[2].padStart(2, '0')}`);
  // a <meta> tag that carries the page's date, either attribute order (government pages: <meta name="PubDate" content="2026-03-16 …">)
  for (const m of raw.matchAll(/<meta\b[^>]*>/gi)) {
    const t = m[0];
    if (!/(?:name|property|itemprop)\s*=\s*["'][^"']*(?:date|publish|modified|updated)[^"']*["']/i.test(t)) continue;
    const c = /content\s*=\s*["'](\d{4})[-/.](\d{2})/i.exec(t);
    if (c) dates.push(`${c[1]}-${c[2]}`);
  }
  // a date the page prints as words: "Updated Nov 2, 2026", "updated 2 November 2026", "Last checked 29 September 2026" (Wanderlog, bkkfamilies)
  const MON = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
  // a weekday may come first: "Last updated on Fri  2 Oct 2026" (City of Melbourne)
  for (const m of text.matchAll(/\b(?:updated|last (?:updated|checked)|published|as of)\s*(?:on|in)?\s*:?\s*(?:(?:mon|tue|wed|thu|fri|sat|sun)[a-z]*\.?,?\s+)?(?:(\d{1,2})(?:st|nd|rd|th)?\s+(?:of\s+)?([a-z]{3})[a-z]*\.?,?\s+(\d{4})|([a-z]{3})[a-z]*\.?\s+(?:(\d{1,2})(?:st|nd|rd|th)?,?\s+)?(\d{4}))/gi)) {   // also 'updated in July 2026'
    const mon = MON[(m[2] || m[4] || '').toLowerCase()], y = m[3] || m[6];
    if (mon && y) dates.push(`${y}-${mon}`);
  }
  // a byline with its date: "By: Flora James, 16 October 2026" (Ella's List)
  for (const m of text.matchAll(/\bby:?\s+[^\n,]{2,60},\s+(\d{1,2})\s+([a-z]{3})[a-z]*\.?,?\s+(\d{4})\b/gi)) {
    const mon = MON[m[2].toLowerCase()];
    if (mon) dates.push(`${m[3]}-${mon}`);
  }
  // day/month/year in numbers, only after a word that says it is the page's date ("Ngày đăng: 30/05/2026", "Updated 30/05/2026")
  for (const m of text.matchAll(/\b(?:updated|published|posted|date|ngày(?: đăng| cập nhật)?|更新|发布)\s*(?:on\s*)?:?\s*(\d{1,2})[/.-](\d{1,2})[/.-](20\d\d)\b/gi)) {
    const mon = +m[2];   // day first (the European and Vietnamese order)
    if (mon >= 1 && mon <= 12) dates.push(`${m[3]}-${String(mon).padStart(2, '0')}`);
  }
  // places the page itself marks closed (Wanderlog embeds Google's status: "name":"…","businessStatus":"CLOSED_PERMANENTLY")
  const closed = new Set();
  for (const m of raw.matchAll(/"name":"((?:[^"\\]|\\.){1,120})"[^{}]{0,600}?"businessStatus":"CLOSED_(?:PERMANENTLY|TEMPORARILY)"/g)) closed.add(key(m[1]));
  const r ={ ok: raw.length > 500, text: norm(text), flat: key(text), dates, closed };
  cache.set(url, r); return r;
}
const have = {};
for (const d of ['eats', 'sights']) for (const f of fs.readdirSync('server/' + d)) for (const t of JSON.parse(fs.readFileSync(`server/${d}/${f}`)).towns) {
  const s = (have[d + '|' + t.place] = new Set());
  for (const r of t.places || t.sights) { for (const k of [key(typeof r.name === 'string' ? r.name : r.name.en), key(r.zh), key(r.local)]) if (k) s.add(k); }   // an empty key (a script the key drops) must never match
}
const out = { pass: [], fail: [] };
for (const f of process.argv.slice(2)) {
  const kind = /\.E\./.test(f) || /(^|\/)sights?[-.]/.test(f) ? 'sights' : 'eats';
  for (const r of JSON.parse(fs.readFileSync(f, 'utf8'))) {
    const fails = [];
    if (!/^https?:\/\//.test(r.src || '')) fails.push('no src');
    else {
      const p = page(r.src);
      if (!p.ok) fails.push('page did not open');
      else {
        const nk = key(r.name);
        if (!nk || !p.flat.includes(nk)) fails.push('name not on page');
        if (nk && [...p.closed].some((c) => c && (c.includes(nk) || nk.includes(c)))) fails.push('page marks it closed');
        const q = key(r.quote);
        if (!q || q.length < 12 || !p.flat.includes(q)) fails.push('quote not on page');
        const recent = p.dates.some((d) => d >= '2025-01');
        if (!recent && r.date !== 'official') fails.push(`page date ${p.dates[0] || 'none'}`);
        const amt = (r.price || '').match(/\d[\d,.]*/g);
        if (amt && !/check the price/i.test(r.price) && !amt.every((a) => p.text.includes(a))) fails.push('price not on page');
      }
    }
    if (have[kind + '|' + r.place] && (have[kind + '|' + r.place].has(key(r.name)) || (r.local && have[kind + '|' + r.place].has(key(r.local))))) fails.push('already in library');
    (fails.length ? out.fail : out.pass).push({ ...r, fails, file: f });
  }
}
// duplicates between files of one run
const seen = new Set();
out.pass = out.pass.filter((r) => { const k = r.place + '|' + key(r.name); if (seen.has(k)) { out.fail.push({ ...r, fails: ['duplicate in this run'] }); return false; } seen.add(k); return true; });
fs.writeFileSync(process.env.OUT || '/dev/stdout', JSON.stringify(out, null, 1));
console.error(`pass ${out.pass.length} · fail ${out.fail.length}`);
const tally = {}; for (const r of out.fail) for (const w of r.fails) tally[w.replace(/ \d.*/, '')] = (tally[w.replace(/ \d.*/, '')] || 0) + 1; console.error(tally);
