'use strict';
// "Ask the guide": find the parts of a book's own manual (seed guide text: trips.info + each day's plan) that answer a question,
// so Claude answers from the manual only. The seed is far too big to send whole (AU ≈ 750k characters), so it is cut into
// small chunks and the ones that share the most character pairs with the question are sent (works for Thai, which has no spaces).
// Only guide text travels — never the family's records, names of the children beyond the seed, or photos.

const SKIP = new Set(['art', 'img', 'svg', 'gradient', 'emoji', 'll', 'key', 'keys', 'url', 'href', 'map', 'tale', 'quiz', 'index', 'e', 'x', 'y', 'rot', 'k', 'id', 'slug', 'icon', 'color', 'colour']);

// the text of any seed value in one language: {th, en} pairs pick the language, arrays/objects are walked, keys in SKIP dropped
function textOf(v, lang, out = []) {
  if (v == null) return out;
  if (typeof v === 'string') { if (v.trim() && !/^https?:\/\//.test(v)) out.push(v.trim()); return out; }
  if (typeof v === 'number') { out.push(String(v)); return out; }
  if (Array.isArray(v)) { v.forEach((x) => textOf(x, lang, out)); return out; }
  if (typeof v === 'object') {
    if (typeof v.th === 'string' || typeof v.en === 'string') { const s = v[lang] || v.en || v.th; if (s) out.push(s.trim()); return out; }
    for (const [k, x] of Object.entries(v)) if (!SKIP.has(k)) textOf(x, lang, out);
  }
  return out;
}

const MAX_CHUNK = 1800;
// chunks: one per item of each info section (a restaurant, an if-then row…), one per key of each day's plan
function chunks(info, days, lang) {
  const out = [];
  const add = (tag, v) => {
    let s = textOf(v, lang).join(' · ').replace(/\s+/g, ' ').trim();
    while (s) { out.push({ tag, text: s.slice(0, MAX_CHUNK) }); s = s.slice(MAX_CHUNK); }
  };
  for (const [k, v] of Object.entries(info || {})) {
    if (Array.isArray(v)) v.forEach((x) => add(k, x));
    else if (v && typeof v === 'object' && (typeof v.th === 'string' || typeof v.en === 'string')) add(k, v);   // a {th, en} text
    else if (v && typeof v === 'object') for (const [k2, x] of Object.entries(v)) add(`${k}.${k2}`, x);
    else add(k, v);
  }
  for (const d of days) {
    const head = `${lang === 'en' ? 'Day' : 'วันที่'} ${d.day_index + 1} (${d.date})`;
    for (const [k, v] of Object.entries(d.plan || {})) if (!SKIP.has(k)) add(`${head} · ${k}`, v);
  }
  return out;
}

// character pairs, lower-cased, without spaces or punctuation: "where to eat" and "กินที่ไหน" both work
const pairs = (s) => { const t = String(s).toLowerCase().replace(/[\s\p{P}\p{S}]+/gu, ''), set = new Set(); for (let i = 0; i < t.length - 1; i++) set.add(t.slice(i, i + 2)); return set; };

// { stable, rest }: stable = the overview (days, where we sleep) + the asking day's own plan (≤ 8k chars) — identical for
// every question asked from that day, so it can be cached; rest = the best-matching chunks from the whole manual, in the
// manual's order, within what is left of the budget
const DAY_BUDGET = 8000;
function excerpt({ info, days, lang, q, day, budget = 16000 }) {
  const over = days.map((d) => `${lang === 'en' ? 'Day' : 'วันที่'} ${d.day_index + 1} (${d.date}): ${textOf(d.title, lang).join(' ')}${d.sleep ? ` — ${lang === 'en' ? 'sleep' : 'นอนที่'} ${textOf(d.sleep, lang).join(' ')}` : ''}`).join('\n');
  const all = chunks(info, days, lang), qp = pairs(q);
  const dayTag = day == null ? null : `${lang === 'en' ? 'Day' : 'วันที่'} ${day + 1} (`;
  const line = (c) => `[${c.tag}] ${c.text}`;
  const own = [], used = new Set();
  let dayLeft = DAY_BUDGET;
  if (dayTag) all.forEach((c, i) => { if (!c.tag.startsWith(dayTag)) return; const len = c.tag.length + c.text.length + 4; if (len > dayLeft) return; own.push(line(c)); used.add(i); dayLeft -= len; });
  const stable = `${over}${own.length ? `\n\n${own.join('\n')}` : ''}`;
  const scored = all.map((c, i) => {
    if (used.has(i)) return null;
    const cp = pairs(c.tag + ' ' + c.text); let hit = 0;
    for (const p of qp) if (cp.has(p)) hit++;
    return { i, c, score: hit / Math.sqrt(qp.size || 1) };
  }).filter((x) => x && x.score > 0).sort((a, b) => b.score - a.score || a.c.text.length - b.c.text.length);
  let left = budget - stable.length;
  const keep = [];
  for (const x of scored) { const len = x.c.tag.length + x.c.text.length + 4; if (len > left) continue; keep.push(x); left -= len; if (left < 200) break; }
  keep.sort((a, b) => a.i - b.i);   // in the manual's own order
  return { stable, rest: keep.map((x) => line(x.c)).join('\n') };
}

module.exports = { excerpt, chunks, textOf, pairs };
